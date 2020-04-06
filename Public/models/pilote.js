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
module.exports.getListeLettre = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="select distinct substr(pilnom, 1, 1) as lettre"
									+ " from pilote order by pilnom";

            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
}

module.exports.getPiloteParLettre = function (data, callback) {

	db.getConnection(function(err, connexion){
		        if(!err){
		        	  // s'il n'y a pas d'erreur de connexion
		        	  // execution de la requête SQL
								let sql ="SELECT p.pilnum, PILNOM as nom, PILPRENOM as prenom, ph.PHOADRESSE as img"
											+ " FROM pilote p left JOIN photo ph on p.PILNUM = ph.PILNUM"
											+ " where PILNOM like " + connexion.escape(data + '%')
											+ " and (ph.PHONUM = 1 or phonum is null)";

		            //console.log (sql);
		            connexion.query(sql, callback);

		            // la connexion retourne dans le pool
		            connexion.release();
		         }
		   });
};

module.exports.getDescPilote = function (data, callback) {

	db.getConnection(function(err, connexion){
		        if(!err){
		        	  // s'il n'y a pas d'erreur de connexion
		        	  // execution de la requête SQL
								let sql = "SELECT DISTINCT PILNOM as nom, PILPRENOM as prenom, PILDATENAIS as date,"
											+ " PILPOIDS as poids, PILTAILLE as taille, PILTEXTE as texte, pa.PAYNOM as nation,"
											+ " e.ECUNOM as ecurie, ph.PHOADRESSE as img"
											+ " FROM pilote p JOIN pays pa ON p.PAYNUM = pa.PAYNUM"
											+ " LEFT JOIN ecurie e ON p.ECUNUM = e.ECUNUM"
											+ " left JOIN photo ph ON p.PILNUM = ph.PILNUM"
											+ " WHERE p.pilnum = " + connexion.escape(data)
											+ " AND (ph.PHONUM = 1 or phonum is null)";
		            connexion.query(sql, callback);

		            // la connexion retourne dans le pool
		            connexion.release();
		         }
		   });
};

module.exports.getSponsors = function (data, callback) {

	db.getConnection(function(err, connexion){
		        if(!err){
		        	  // s'il n'y a pas d'erreur de connexion
		        	  // execution de la requête SQL
								let sql = "SELECT PILNOM as nom, PILPRENOM as prenom, sp.SPONOM as nomspon, sp.SPOSECTACTIVITE as type"
											+ " FROM pilote p JOIN sponsorise s ON p.PILNUM = s.PILNUM"
											+ " JOIN sponsor sp ON s.SPONUM = sp.SPONUM"
											+ " WHERE p.pilnum = " + connexion.escape(data);
		            connexion.query(sql, callback);
		            // la connexion retourne dans le pool
		            connexion.release();
		         }
		   });
};

module.exports.getImages = function (data, callback) {

	db.getConnection(function(err, connexion){
		        if(!err){
		        	  // s'il n'y a pas d'erreur de connexion
		        	  // execution de la requête SQL
								let sql = "SELECT p.PILNOM as nom, ph.PHOADRESSE as imgs"
											+ " FROM pilote p JOIN photo ph ON p.PILNUM = ph.PILNUM"
											+ " WHERE ph.PHONUM != 1 AND p.pilnum= " + connexion.escape(data);
		            connexion.query(sql, callback);
		            // la connexion retourne dans le pool
		            connexion.release();
		         }
		   });
};
