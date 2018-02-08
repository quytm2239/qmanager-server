module.exports = function(app,authRouter,config,M,sequelize){
    var errcode = app.get('errcode');
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
    authRouter.post('/role', middleware, function(req, res) {

        var utils = app.get('utils');

        var deparment_id = req.body.deparment_id;
        var name 	 = req.body.name;
        var description = req.body.description;

        if (utils.isNullorUndefined(deparment_id) || isNaN(deparment_id))
        return res.status(400).send({
            success: false,
            message: 'deparment_id is not valid, role can not go individualy!'
        });

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

        // Check email/username
        M.Role.findOne({ where:
            {
                { name: name }
            }
        }).then(role => {
            if (role) {
                res.status(400).send({
                    success: false,
                    message: 'role already exist!'
                });
            } else {
                M.Role.create({
                    deparment_id: deparment_id,
                    name: name,
                    description: description
                }).then(function (role) {
                    if (role) {
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
    authRouter.get('/role-by-id', middleware, function(req, res) {

        var utils = app.get('utils');
        var id = req.body.id;
        if (utils.isNullorUndefined(id) || isNaN(id))
        return res.status(400).send({
            success: false,
            message: 'role_id is not valid(number)!'
        });

        M.Role.find({ where:
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
    authRouter.get('/role-by-department', middleware, function(req, res) {

        var utils = app.get('utils');
        var deparment_id = req.body.deparment_id;

        if (utils.isNullorUndefined(deparment_id) || isNaN(deparment_id))
        return res.status(400).send({
            success: false,
            message: 'deparment_id is not valid(number)!'
        });

        M.Role.find({ where:
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
    authRouter.get('/all-role', middleware, function(req, res) {

        M.Role.findAll().then(roles => {
            res.status(200).send({
                success: true,
                message: errcode.errorMessage(errcode.code_success);
                data: roles ? roles : []
            });
        });
    });
    authRouter.put('/role', middleware, function(req, res) {

        var utils = app.get('utils');

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

        M.Role.findOne({ where:
            {
                { name: name }
            }
        }).then(role => {
            if (role) {
                role.update({
                  name: name,
                  description: description
                }).then(role => {
                    return res.status(200).send({
                        success: false,
                        message: errcode.errorMessage(errcode.code_success),
                        data: [role]
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
                    message: 'This role does not exist!'
                });
            }
        });
    });
    authRouter.delete('/role', middleware, function(req, res) {

        var utils = app.get('utils');

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

        M.Role.findOne({ where:
            {
                { name: name }
            }
        }).then(role => {
            if (role) {
                role.destroy()
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
                    message: 'This role does not exist!'
                });
            }
        });
    });
};
