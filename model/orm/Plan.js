var sequelize = require('./../../dbconnection/mysql/connection');
var Sequelize = require('sequelize');
//Create Item Table Structure
var Plan = sequelize.define('Plan', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    account: Sequelize.INTEGER, // ref to which account
    content: Sequelize.STRING,
    total: Sequelize.STRING, // total spent amount
    members: Sequelize.STRING, // all members who join this plan
    begin: Sequelize.STRING, // plan's begin date
    end: Sequelize.STRING, // plan's end date
    real_spent: Sequelize.STRING // real spent amount
});

// force: true will drop the table if it already exists
Plan.sync({force: false}).then(() => {
});

module.exports = Plan;
