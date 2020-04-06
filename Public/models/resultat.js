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
						let sql ="SELECT gp.GPNUM as num, gp.GPNOM as nom, p.PAYADRDRAP as img FROM " +
                            "grandprix gp INNER JOIN circuit c " +
                            "ON gp.CIRNUM = c.CIRNUM INNER JOIN " +
                            "PAYS p ON c.PAYNUM = p.PAYNUM ORDER BY `gp`.`GPNOM` ASC";
						//console.log (sql);
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

// module.exports.getPiloteTemps = function (data, callback) {
//     db.getConnection(function (err, connexion) {
//         if (!err) {
//             let sql = "SELECT gp.GPNUM as num, gp.GPNOM as nomGP, gp.GPDATE as date, p.PILNOM as nom, p.PILPRENOM as prenom, c.TEMPSCOURSE as temps FROM Pilote p LEFT JOIN course c ON c.PILNUM = p.PILNUM LEFT JOIN grandprix gp ON c.GPNUM = gp.GPNUM WHERE gp.GPNUM like \'" + data + "\' ORDER BY `temps` ASC ";
//             connexion.query(sql, callback);
//             connexion.release();
//         }
//     })
// };
//
// module.exports.getPlacePilote = function (data, callback) {
//     db.getConnection(function (err, connexion) {
//         if (!err) {
//             let sql = "SELECT PTPLACE as place, PTNBPOINTSPLACE as point FROM points";
//             connexion.query(sql, callback);
//             connexion.release();
//         }
//     })
// };
//
// module.exports.getDescriptionGP = function (data, callback) {
//     db.getConnection(function (err, connexion) {
//         if (!err) {
//             let sql = "SELECT GPCOMMENTAIRE as detail from grandprix WHERE GPNUM like \'" + data + "\'";
//             connexion.query(sql, callback);
//             connexion.release();
//         }
//     })
// };

module.exports.getPiloteTemps = function (data, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
					let sql = "Select place, pilnom, tempscourse, ptnbpointsplace, gpnum, gpdate, gpnom, gpcommentaire, pilnum"
							+ " from ("
								+ " select @n := @n + 1 place, pilnom, tempscourse, gp.gpnum, gpdate, gpnom, gpcommentaire, p.pilnum"
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
