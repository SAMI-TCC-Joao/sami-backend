/* Used to UPDATE/SYNCHRONIZE the database. It is a quick(in most cases better) alternative to migrations.
/* Every database change (column add, delete) is performed when this file is required.
/* Use with caution (changes to the same database could be) */

import './syncSami';
import { sequelize } from '../app/model';
import helper from '../lib/helper';
import stopwords from '../lib/stopwords_portuguese.json';

const args = process.argv.slice(2);
const { capitalize } = helper;

let model,
  removeStaleColumn = false;
if (args.length) {
  const { models = {} } = sequelize;
  const index = args[0] === '--npm' ? 1 : 0;
  model = args[index] && (models[capitalize(args[index])] || models[args[index]]);
  removeStaleColumn = !!args[index + 1] && args[index + 1].toLowerCase() === 'true';
}
const databaseOrModel = model || sequelize;

const table = 'searches';
const column = 'textSearch';

const startSync = executeOnly => {
  // dictionary unaccent config for portuguese named: uportuguese
  const uportugueseTextSearchCfg = sequelize.query(`
do $$
  BEGIN
CREATE TEXT SEARCH CONFIGURATION uportuguese ( COPY = portuguese );
ALTER TEXT SEARCH CONFIGURATION uportuguese
ALTER MAPPING FOR hword, hword_part, word
WITH unaccent, portuguese_stem;
EXCEPTION
WHEN unique_violation THEN
NULL;  -- ignore error
END;$$;
`);
  //
  // dictionary unaccent config for simple named: usimple
  const simpleTextSearchCfg = sequelize.query(`
do $$
  BEGIN
CREATE TEXT SEARCH CONFIGURATION usimple ( COPY = simple );
ALTER TEXT SEARCH CONFIGURATION usimple
ALTER MAPPING FOR hword, hword_part, word
WITH unaccent, simple;
EXCEPTION
WHEN unique_violation THEN
NULL;  -- ignore error
END;$$;
`);

  //EXTENSIONS FOR  PG_SQL
  const unaccent = sequelize.query('CREATE EXTENSION IF NOT EXISTS unaccent');
  const trigram = sequelize.query('CREATE EXTENSION IF NOT EXISTS pg_trgm');
  const fuzzystrmatch = sequelize.query('CREATE EXTENSION IF NOT EXISTS fuzzystrmatch');
  //
  const dropColumnIfExists = sequelize.query(`ALTER TABLE ${table} DROP COLUMN IF EXISTS "${column}"`, { raw: true });
  const dropColumnCrawlNameULCategories = sequelize.query(
    `ALTER TABLE IF EXISTS categories DROP COLUMN IF EXISTS "crawlNameUL"`,
    {
      raw: true
    }
  );
  const dropColumnCrawlNameULMappingCategories = sequelize.query(
    `ALTER TABLE IF EXISTS "mappingCategories" DROP COLUMN IF EXISTS "crawlNameUL"`,
    { raw: true }
  );
  //
  const uniqueWordsMaterializedView = sequelize.query(`create MATERIALIZED VIEW IF NOT EXISTS unique_words as
SELECT word,ndoc,nentry FROM ts_stat('SELECT 
        ts_delete(to_tsvector(''simple'', unaccent(name)), array [${stopwords}] ) 
 ||     ts_delete(to_tsvector(''simple'', unaccent(description)), array [ ${stopwords}, ''tudo'',''construir'',''decorar'',''reformar'',''telhanorte'', ''compre'']) 
 ||     to_tsvector(''simple'', unaccent(brand)) from searches') where length(word) >= 3 and word ~* '^[a-z/-]+$' is true;`);
  const uniqueWordsIndex = sequelize.query(
    `CREATE INDEX IF NOT EXISTS words_idx  ON unique_words USING gin(word gin_trgm_ops);`
  );

  const generateColumnForCategories = () =>
    sequelize.query(`ALTER TABLE IF EXISTS categories ADD COLUMN IF NOT EXISTS "crawlNameUL" varchar
GENERATED ALWAYS AS(
  lower(
    TRANSLATE(
      categories.name,
      N'ÁÀÂÃÄÅàáâãäåĀāąĄæÆÇçćĆčČ¢©đĐďĎÈÉÊËèéêëěĚĒēęĘÌÍÎÏìíîïĪīłŁ£ÑñňŇńŃÒÓÔÕÕÖØòóôõöøŌōřŘ®ŠšśŚßťŤÙÚÛÜùúûüůŮŪūµ×¥ŸÿýÝŽžżŻźŹ',
  N'aaaaaaaaaaaaaaaaaaccccccccddddeeeeeeeeeeeeeeiiiiiiiiiilllnnnnnooooooooooooooooorrsssssttuuuuuuuuuuuuuxyyyyyzzzzzz'
)))  STORED;`);
  const generateColumnForMappingCategories = () =>
    sequelize.query(`ALTER TABLE IF EXISTS "mappingCategories" ADD COLUMN IF NOT EXISTS "crawlNameUL" varchar
GENERATED ALWAYS AS(
  lower(
    TRANSLATE(
      "mappingCategories"."crawlCategoryName",
  N'ÁÀÂÃÄÅàáâãäåĀāąĄæÆÇçćĆčČ¢©đĐďĎÈÉÊËèéêëěĚĒēęĘÌÍÎÏìíîïĪīłŁ£ÑñňŇńŃÒÓÔÕÕÖØòóôõöøŌōřŘ®ŠšśŚßťŤÙÚÛÜùúûüůŮŪūµ×¥ŸÿýÝŽžżŻźŹ',
  N'aaaaaaaaaaaaaaaaaaccccccccddddeeeeeeeeeeeeeeiiiiiiiiiilllnnnnnooooooooooooooooorrsssssttuuuuuuuuuuuuuxyyyyyzzzzzz'
)))  STORED;`);

  const mappingCategoryIndex = () =>
    sequelize.query(
      `CREATE INDEX IF NOT EXISTS mappingCategory_idx ON  "mappingCategories" ("categoryName", "crawlNameUL")`
    );

  const refreshUniqueWords = sequelize.query(`REFRESH MATERIALIZED VIEW unique_words;`);

  console.log('[ENVIRONMENT DB]', process.env.NODE_ENV);

  return Promise.all([
    unaccent,
    trigram,
    fuzzystrmatch,
    dropColumnIfExists,
    dropColumnCrawlNameULCategories,
    dropColumnCrawlNameULMappingCategories,
    uniqueWordsMaterializedView
  ])
    .then(() => uniqueWordsIndex)
    .then(() => uportugueseTextSearchCfg)
    .then(() => simpleTextSearchCfg)

    .then(() =>
      databaseOrModel
        .sync({
          alter: true,
          logging: true,
          /* property: removeStaleColumn
  /* @feature (default: true), forbid removal of columns from table
  /* when they are not longer represented in the schema */
          removeStaleColumn
        })

        .then(() => generateColumnForMappingCategories())
        .then(() => generateColumnForCategories())
        .then(() => mappingCategoryIndex())
        .then(async status => {
          console.log('AFTER SYNC... PLEASE WAIT: CREATING COLUMN "TEXTSEARCH"...');
          const { models: { search = {} } = {}, query = () => {} } = sequelize;
          const queryFn = query.bind(sequelize);
          await search.customSync[0](queryFn);
          await search.customSync[1](queryFn);
          if (status) console.dir(status.models, { depth: 0 });
          if (executeOnly) return process.exit(0);
        })
    )
    .catch(async error => {
      console.log(`An error ocurred. Applying default configurations.`);
      const { models: { search = {} } = {}, query = () => {} } = sequelize;
      const queryFn = query.bind(sequelize);
      await search.customSync[0](queryFn);
      await search.customSync[1](queryFn);
      await generateColumnForMappingCategories();
      await generateColumnForCategories();
      await mappingCategoryIndex();
      console.log(error);
      return process.exit(1);
    });
};

// called via npm script at package.json
if (args[0] === '--npm') startSync(true).then(() => {});

export default startSync;
