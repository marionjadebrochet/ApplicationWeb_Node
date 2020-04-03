/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*
*/

let db = require('../configDb');


module.exports.getListeCircuit = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT c.CIRNUM as num, p.payadrdrap as drapeau, c.CIRNOM as nom FROM circuit c INNER JOIN pays p ON p.PAYNUM = c.PAYNUM ORDER BY `nom` ASC ";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getDetCircuit = function (data,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT c.CIRNOM as nom, c.CIRLONGUEUR as lon, c.CIRNBSPECTATEURS as nombre, p.PAYNOM as pays, c.CIRTEXT as texte, c.CIRADRESSEIMAGE as img FROM circuit c INNER JOIN pays p ON p.PAYNUM = c.PAYNUM WHERE CIRNOM like \'" + data + "\'";
						console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};
