const { DataTypes } = require('sequelize');
const sequelize = require('./../DBInstance');

const Session = sequelize.define('session', {
  session_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isValid: {
    type: DataTypes.BOOLEAN,
    default: true,
  },
  user_agent: {
    type: DataTypes.STRING,
  },
});

Session.sync({ alter: true })
  .then(() => console.log('Sessions Table & Model synced succesully'))
  .catch(err => {
    console.log('Failed to sync sessions table & model:❌❌❌', err);
  });
module.exports = Session;
