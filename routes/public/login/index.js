module.exports = function(app,publicRouter,config,M,sequelize){
    publicRouter.post('/login',function (req, res) {
        var utils = app.get('utils');
        var passwordHash = require('password-hash');
        var username = req.body.username;
        var password = req.body.password;
        if (utils.isNullorUndefined(username) || utils.isNullorUndefined(password)) {
            res.status(400).send({
                success: false,
                message: 'Username or password does not exist!'
            });
            return;
        }
        var hashedPassword = passwordHash.generate(password);
        M.Account.find({
            where:{
                username: username,
                password: hashedPassword
            }
        }).then(account => {
            if (account) {
                var token = jwt.sign(
                {
                    'account': account.dataValues,
                },
                config.super_secret,
                {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).send({
                    success: true,
                    message: 'ok',
                    token: token
                });
            } else {
                res.status(400).send({
                    success: false,
                    message: 'Username or password does not exist!'
                });
            }
        });
    });
};
