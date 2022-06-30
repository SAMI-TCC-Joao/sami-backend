import Sequelize from 'sequelize';
import loadModels from './models';

const MAX_CONNECTIONS = 165;

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DIALECT,
    associations: {
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    },
    pool: {
      max: MAX_CONNECTIONS,
      acquire: 60000,
      idle: 20000,
      evict: 5000,
    },
    minifyAliases: true,
    benchmark: true,
    // eslint-disable-next-line no-console
    logging: console.log,
    define: {
      hooks: null,
    },
  }
);

sequelize.DataTypes = Sequelize.DataTypes;

const models = loadModels(sequelize);

models.Sequelize = Sequelize;

export { sequelize, Sequelize };
export default models;
