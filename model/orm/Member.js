var sequelize = require('./../../dbconnection/mysql/connection');
var Sequelize = require('sequelize');
//Create Item Table Structure
var Member = sequelize.define('Member', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    account: Sequelize.INTEGER, // ref to which account
    fullname: Sequelize.STRING,
    gender: Sequelize.STRING,
    total: Sequelize.STRING // total spent amount
});

// force: true will drop the table if it already exists
Member.sync({force: false}).then(() => {
});

module.exports = Member;
