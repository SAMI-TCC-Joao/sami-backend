import { error } from '../errorHandlers/customErrorList';

const user = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: error.BAD_REQUEST.uniqueEmail.message,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      userType: {
        type: DataTypes.STRING,
        defaultValue: 'provider',
      },
      passwordToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastModifiedBy: {
        type: DataTypes.JSON,
      },
    },
    {
      paranoid: true,
      defaultScope: {
        returning: true,
        individualHooks: true,
      },
    }
  );

  return User;
};

export default user;
