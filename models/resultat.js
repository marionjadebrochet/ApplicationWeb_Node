/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*
*/

let db = require('../configDb');

/*
* Récupérer l'intégralité les écuries avec l'adresse de la photo du pays de l'écurie
* @return Un tableau qui contient le N°, le nom de l'écurie et le nom de la photo du drapeau du pays
*/
module.exports.getListeRes = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT gp.GPNUM as num, gp.GPNOM as nom FROM "
						+ "grandprix gp ORDER BY `gp`.`GPNOM` ASC";
						//console.log (sql);
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getPiloteTemps = function (data, callback) {
	console.log(data);
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "Select place, pilnom, tempscourse, ptnbpointsplace, gpnum, pilnum"
								+ " from ("
									+ " select @n := @n + 1 place, pilnom, tempscourse, gp.gpnum, p.pilnum"
    							+ " from pilote p join (SELECT @n := 0)t"
    							+ " JOIN course c ON c.pilnum = p.pilnum"
    							+ " JOIN grandprix gp ON c.gpnum = gp.gpnum"
									+ " WHERE gp.gpnum =" + connexion.escape(data)
    							+ " order by tempscourse)tab"
								+ " join points on points.PTPLACE=tab.place";

            connexion.query(sql, callback);
            connexion.release();
        }
    })
};

module.exports.getPilotes = function (data, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT p1.pilnom, p1.pilnum"
									+ " FROM pilote p1 WHERE p1.pilnum NOT IN"
									+ " (SELECT p2.pilnum FROM pilote p2"
									+ " JOIN course c ON c.pilnum = p2.pilnum"
									+ " JOIN grandprix gp ON c.gpnum = gp.gpnum"
									+ " WHERE gp.gpnum =" + connexion.escape(data)
									+ ") ORDER BY p1.pilnom";

            connexion.query(sql, callback);
            connexion.release();
        }
    })
};

module.exports.ajouter = function (data, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "insert into course set"
										+ " gpnum = " + connexion.escape(data.gpnum)
										+ ", pilnum = " + connexion.escape(data.pilnum)
										+ ", tempscourse = " + connexion.escape(data.heure+':'+data.minute+':'+data.seconde);

            connexion.query(sql, callback);
            connexion.release();
        }
    })
};

module.exports.supprimer = function (data, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "delete from course"
										+ " where gpnum = " + connexion.escape(data.gpnum)
										+ "and pilnum = " + connexion.escape(data.pilnum);
						let sql1 = "update pilote set pilpoints = NULL"
						 				+ " where pilnum = " + connexion.escape(data.pilnum);
									console.log(sql);
						connexion.query(sql);
            connexion.query(sql1, callback);
            connexion.release();
        }
    })
};
