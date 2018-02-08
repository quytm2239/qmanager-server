module.exports = function(app,authRouter,config,M,sequelize){
    var middleware = function (req, res, next) {
        if (req.decoded.account.role_id != 777) {
            return res.status(403).send({
                success: false,
                message: 'Your current logged-in account is not allowed to do this action!'
            });
        } else {
            next();
        }
    };
    require('./register')(app,authRouter,config,M,sequelize,middleware);
    require('./department')(app,authRouter,config,M,sequelize,middleware);
    require('./role')(app,authRouter,config,M,sequelize,middleware);
    require('./permission')(app,authRouter,config,M,sequelize,middleware);
};
