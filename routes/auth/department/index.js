module.exports = function(app,authRouter,config,M,sequelize,middleware){
    var utils = app.get('utils');

    authRouter.post('/deparment', middleware, function(req, res) {

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

        // Check email/username
        M.Department.findOne({ where:
            {
                name: name
            }
        }).then(department => {
            if (department) {
                res.status(400).send({
                    success: false,
                    message: 'department already exist!'
                });
            } else {
                M.Department.create({
                    name: name,
                    description: description
                }).then(function (department) {
                    if (department) {
                        res.status(200).send({
                            success: true,
                            message: 'Successfully!'
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
};
