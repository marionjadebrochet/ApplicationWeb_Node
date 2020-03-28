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
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT gp.GPNUM as num, gp.GPNOM as nomGP, gp.GPDATE as date, p.PILNOM as nom, p.PILPRENOM as prenom, c.TEMPSCOURSE as temps FROM Pilote p LEFT JOIN course c ON c.PILNUM = p.PILNUM LEFT JOIN grandprix gp ON c.GPNUM = gp.GPNUM WHERE gp.GPNUM like \'" + connexion.escape(data) + "\' ORDER BY `temps` ASC ";
            connexion.query(sql, callback);
            connexion.release();
        }
    })
};

module.exports.getPlacePilote = function (callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT PTPLACE as place, PTNBPOINTSPLACE as point FROM points";
            connexion.query(sql, callback);
            connexion.release();
        }
    })
};
