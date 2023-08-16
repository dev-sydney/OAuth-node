const { DataTypes } = require('sequelize');
const sequelize = require('./../DBInstance');

const User = sequelize.define('user', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email_address: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  user_password: {
    type: DataTypes.STRING,
  },
  picture: {
    type: DataTypes.STRING,
  },
});

User.sync({ alter: true })
  .then(() => console.log('Users Table & Model synced succesully'))
  .catch(err => {
    console.log('Failed to sync table & model:❌❌❌', err);
  });
module.exports = User;
