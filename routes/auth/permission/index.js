module.exports = function(app,authRouter,config,M,sequelize){
    var errcode = app.get('errcode');
    var utils = app.get('utils');

    var middleware = function (req, res, next) {
        if (req.decoded.account.role_id != 777) {
            return res.status(403).send({
                success: false,
                message: 'Your current logged-in account is not allowed to do this action!'
            });
        } else {
            next();
        }
    }
    authRouter.post('/permission', middleware, function(req, res) {
        
        var permissionEnum = app.get('enum').PERMISSION;

        var function_id = req.body.function_id;
        var deparment_id = req.body.deparment_id;
        var role_id 	 = req.body.role_id;
        var permission = req.body.permission;

        if (utils.isNullorUndefined(function_id) || isNaN(function_id))
        return res.status(400).send({
            success: false,
            message: 'function_id is not valid(number)!'
        });

        if (utils.isNullorUndefined(deparment_id) || isNaN(deparment_id))
        return res.status(400).send({
            success: false,
            message: 'deparment_id is not valid(number)!'
        });

        if (utils.isNullorUndefined(role_id) || isNaN(role_id))
        return res.status(400).send({
            success: false,
            message: 'role_id is not valid(number)!'
        });

        if (utils.isNullorUndefined(permission) || isNaN(permission) || permissionEnum.isValidPermission(permission))
        return res.status(400).send({
            success: false,
            message: 'permission is not valid(number, from 0 to 4)!'
        });

        // Check email/username
        M.Permission.findOne({ where:
            {
                { name: name }
            }
        }).then(permission => {
            if (permission) {
                res.status(400).send({
                    success: false,
                    message: 'permission already exist!'
                });
            } else {
                M.Permission.create({
                    deparment_id: deparment_id,
                    function_id: function_id,
                    role_id: role_id,
                    permission: permission
                }).then(function (permission) {
                    if (permission) {
                        res.status(200).send({
                            success: true,
                            message: errcode.errorMessage(errcode.code_success);
                        });
                    } else {
                        res.status(500).send({
                            success: false,
                            message: 'Internal error!'
                        });
                    }
                });
            }
        });
    });
    authRouter.get('/permission-by-id', middleware, function(req, res) {

        if (req.decoded.account.role_id != 777) {
            return res.status(403).send({
                success: false,
                message: 'Your current logged-in account is not allowed to do this action!'
            });
        }


        var id = req.body.id;
        if (utils.isNullorUndefined(id) || isNaN(id))
        return res.status(400).send({
            success: false,
            message: 'role_id is not valid(number)!'
        });

        M.Permission.find({ where:
            {
                { id: id }
            }
        }).then(roles => {
            res.status(200).send({
                success: true,
                message: errcode.errorMessage(errcode.code_success);
                data: roles ? roles : []
            });
        });
    });
    authRouter.get('/permission-by-department', middleware, function(req, res) {

        if (req.decoded.account.role_id != 777) {
            return res.status(403).send({
                success: false,
                message: 'Your current logged-in account is not allowed to do this action!'
            });
        }


        var deparment_id = req.body.deparment_id;

        if (utils.isNullorUndefined(deparment_id) || isNaN(deparment_id))
        return res.status(400).send({
            success: false,
            message: 'deparment_id is not valid(number)!'
        });

        M.Permission.find({ where:
            {
                { deparment_id: deparment_id }
            }
        }).then(roles => {
            res.status(200).send({
                success: true,
                message: errcode.errorMessage(errcode.code_success);
                data: roles ? roles : []
            });
        });
    });
    authRouter.get('/all-permission', middleware, function(req, res) {

        if (req.decoded.account.role_id != 777) {
            return res.status(403).send({
                success: false,
                message: 'Your current logged-in account is not allowed to do this action!'
            });
        }

        M.Permission.findAll().then(roles => {
            res.status(200).send({
                success: true,
                message: errcode.errorMessage(errcode.code_success);
                data: roles ? roles : []
            });
        });
    });
    authRouter.put('/permission', middleware, function(req, res) {



        var name 	 = req.body.name;
        var description = req.body.description;

        if (utils.isNullorUndefined(name) || name.length == 0)
        return res.status(400).send({
            success: false,
            message: 'name is not valid!'
        });

        if (utils.isNullorUndefined(description) || description.length == 0)
        return res.status(400).send({
            success: false,
            message: 'description is not valid!'
        });

        M.Permission.findOne({ where:
            {
                { name: name }
            }
        }).then(permission => {
            if (permission) {
                permission.update({
                  name: name,
                  description: description
                }).then(permission => {
                    return res.status(200).send({
                        success: false,
                        message: errcode.errorMessage(errcode.code_success),
                        data: [permission]
                    });
                }).error(() => {
                    return res.status(500).send({
                        success: false,
                        message: 'Internal error!'
                    });
                });
            } else {
                return res.status(400).send({
                    success: false,
                    message: 'This permission does not exist!'
                });
            }
        });
    });
    authRouter.delete('/permission', middleware, function(req, res) {



        var name 	 = req.body.name;
        var description = req.body.description;

        if (utils.isNullorUndefined(name) || name.length == 0)
        return res.status(400).send({
            success: false,
            message: 'name is not valid!'
        });

        if (utils.isNullorUndefined(description) || description.length == 0)
        return res.status(400).send({
            success: false,
            message: 'description is not valid!'
        });

        M.Permission.findOne({ where:
            {
                { name: name }
            }
        }).then(permission => {
            if (permission) {
                permission.destroy()
                .then(() => {
                    return res.status(200).send({
                        success: false,
                        message: errcode.errorMessage(errcode.code_success),
                    });
                }).error(() => {
                    return res.status(500).send({
                        success: false,
                        message: 'Internal error!'
                    });
                });
            } else {
                return res.status(400).send({
                    success: false,
                    message: 'This permission does not exist!'
                });
            }
        });
    });
};
