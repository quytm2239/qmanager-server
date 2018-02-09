module.exports = {
    PERMISSION : {
        ACCESS_DENIED               : 0,
        VIEW                        : 1,
        VIEW_INSERT                 : 2,
        VIEW_INSERT_UPDATE          : 3,
        VIEW_INSERT_UPDATE_DELETE   : 4,
        isValidPermission: function(enteredPermission) {
            switch (enteredPermission) {
                case module.exports.ROLE.ACCESS_DENIED:
                case module.exports.ROLE.VIEW:
                case module.exports.ROLE.VIEW_INSERT:
                case module.exports.ROLE.VIEW_INSERT_UPDATE:
                case module.exports.ROLE.VIEW_INSERT_UPDATE_DELETE:
                    return true;
                    break;
                default:
                return false;
            }
        }
    }
};
