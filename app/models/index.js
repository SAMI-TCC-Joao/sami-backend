import Session from './session';
import User from './user';

const loadModels = (sequelize) => {
  const Models = {
    Session: Session(sequelize, sequelize.DataTypes),
    User: User(sequelize, sequelize.DataTypes),
  };

  Object.keys(Models).forEach((key) => {
    if ('associate' in Models[key]) {
      Models[key].associate(Models);
    }
  });

  return Models;
};

export default loadModels;
