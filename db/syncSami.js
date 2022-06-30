import Model from 'sequelize/lib/model';

console.log(`\n`, `@HomeHero sync YEAAAH`, `\n`);

/**
 HomeHero version of  Sequelize SYNC
 (it copies the same approach and uses the same underlying API but it will
 change  a few configurations)

 Goals:
 Rewrite some of the functionalities of Sequelize (make SYNC BETTER)
 Add better handling
 Try to break imperative code style in favor of declarative

 **/

Model.sync = async function (options) {
  options = { ...this.options, ...options };
  options.hooks = options.hooks === undefined ? true : !!options.hooks;

  const attributes = this.tableAttributes;
  const rawAttributes = this.fieldRawAttributesMap;

  if (options.hooks) {
    await this.runHooks('beforeSync', options);
  }
  if (options.force) {
    await this.drop(options);
  }

  const tableName = this.getTableName(options);

  await this.queryInterface.createTable(tableName, attributes, options, this);

  if (options.alter) {
    const tableInfos = await Promise.all([
      this.queryInterface.describeTable(tableName, options),
      this.queryInterface.getForeignKeyReferencesForTable(tableName, options)
    ]);
    const columns = tableInfos[0];
    // Use for alter foreign keys
    const foreignKeyReferences = tableInfos[1];
    const removedConstraints = {};

    for (const columnName in attributes) {
      if (!Object.prototype.hasOwnProperty.call(attributes, columnName)) continue;
      if (!columns[columnName] && !columns[attributes[columnName].field]) {
        await this.queryInterface.addColumn(
          tableName,
          attributes[columnName].field || columnName,
          attributes[columnName],
          options
        );
      }
    }

    if (options.alter === true || (typeof options.alter === 'object' && options.alter.drop !== false)) {
      for (const columnName in columns) {
        if (!Object.prototype.hasOwnProperty.call(columns, columnName)) continue;
        const currentAttribute = rawAttributes[columnName];
        const { removeStaleColumn = true } = options;
        if (!currentAttribute) {
          if (removeStaleColumn) await this.queryInterface.removeColumn(tableName, columnName, options);
          continue;
        }
        if (currentAttribute.primaryKey) continue;
        // Check foreign keys. If it's a foreign key, it should remove constraint first.
        const references = currentAttribute.references;
        if (currentAttribute.references) {
          const database = this.sequelize.config.database;
          const schema = this.sequelize.config.schema;
          // Find existed foreign keys
          for (const foreignKeyReference of foreignKeyReferences) {
            const constraintName = foreignKeyReference.constraintName;
            if (
              !!constraintName &&
              foreignKeyReference.tableCatalog === database &&
              (schema ? foreignKeyReference.tableSchema === schema : true) &&
              foreignKeyReference.referencedTableName === references.model &&
              foreignKeyReference.referencedColumnName === references.key &&
              (schema ? foreignKeyReference.referencedTableSchema === schema : true) &&
              !removedConstraints[constraintName]
            ) {
              // Remove constraint on foreign keys.
              await this.queryInterface.removeConstraint(tableName, constraintName, options);
              removedConstraints[constraintName] = true;
            }
          }
        }
        await this.queryInterface.changeColumn(tableName, columnName, currentAttribute, options);
      }
    }
  }
  let indexes = await this.queryInterface.showIndex(tableName, options);
  indexes = this._indexes
    .filter(item1 => !indexes.some(item2 => item1.name === item2.name))
    .sort((index1, index2) => {
      if (this.sequelize.options.dialect === 'postgres') {
        // move concurrent indexes to the bottom to avoid weird deadlocks
        if (index1.concurrently === true) return 1;
        if (index2.concurrently === true) return -1;
      }

      return 0;
    });

  for (const index of indexes) {
    await this.queryInterface.addIndex(tableName, { ...options, ...index });
  }

  if (options.hooks) {
    await this.runHooks('afterSync', options);
  }

  return this;
};
