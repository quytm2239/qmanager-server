module.exports = function(app,config,M,sequelize,express) {
    var publicRouter = express.Router();
    app.use('/public',publicRouter);
    require('./public')(app,publicRouter,config,M,sequelize);

    app.use(require('./../middleware/check_token'));

    var authRouter = express.Router();
    app.use('/auth',authRouter);
    require('./auth')(app,authRouter,config,M,sequelize);
};
