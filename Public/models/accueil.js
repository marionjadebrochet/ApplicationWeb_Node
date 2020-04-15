let db = require('../configDb');
///////////// dernier grand prix ///////////////////
module.exports.getGrandPrix = function (callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT gp.GPNUM as num, gp.GPNOM as nom, gp.GPDATE as date, gp.GPDATEMAJ as maj"
                + " FROM grandprix gp"
                + " ORDER BY `date` DESC LIMIT 1";
            connexion.query(sql, callback);
            connexion.release();
        }
    })
};
