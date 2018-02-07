module.exports = function(app,authRouter,config,M,sequelize){
    require('./register')(app,authRouter,config,M,sequelize);
};
