const session = (sequelize, DataTypes) => {
  const Session = sequelize.define(
    'session',
    {
      sid: {
        type: DataTypes.STRING(36),
        primaryKey: true,
      },
      data: DataTypes.TEXT,
      connectionId: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      expires: DataTypes.DATE,
    },
    {
      paranoid: true,
    }
  );

  return Session;
};

export default session;
