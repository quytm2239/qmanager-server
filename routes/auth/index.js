module.exports = function(app,authRouter,config,M,sequelize){
    require('./register')(app,authRouter,config,M,sequelize);
    require('./department')(app,authRouter,config,M,sequelize);
    require('./role')(app,authRouter,config,M,sequelize);
    require('./permission')(app,authRouter,config,M,sequelize);
};
