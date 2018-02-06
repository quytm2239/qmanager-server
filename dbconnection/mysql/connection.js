var Sequelize = require('sequelize');

const sequelize = new Sequelize('moneyself', 'moneyself', '123456', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 100, // max pool size, concurrency connection
    min: 0,
    idle: 10000 // will close after 10000 miliseconds if not being used
  },

});

// test connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection to ' + sequelize.config.host + ':' + sequelize.config.port + ' has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


module.exports = sequelize;
