module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {}, { underscored: true });
  Client.associate = (models) => {
    Client.belongsTo(models.User, {
      foreignKey: 'userId',
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Client;
};
