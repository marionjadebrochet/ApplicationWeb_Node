let db = require('../configDb');
/////////////// liste 1ere lettre noms des pilotes ////////////////
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

/////////// pilotes en fonction de la 1ere lettre de leur nom ///////////////
module.exports.getPiloteParLettre = function (data, callback) {

	db.getConnection(function(err, connexion){
		        if(!err){
		        	  // s'il n'y a pas d'erreur de connexion
		        	  // execution de la requête SQL
								let sql ="SELECT p.pilnum, PILNOM as nom, PILPRENOM as prenom, ph.PHOADRESSE as img, phocommentaire"
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
///////////////////////////// détails pilote ////////////////////////////
module.exports.getDescPilote = function (data, callback) {

	db.getConnection(function(err, connexion){
		        if(!err){
		        	  // s'il n'y a pas d'erreur de connexion
		        	  // execution de la requête SQL
								let sql = "SELECT DISTINCT PILNOM as nom, PILPRENOM as prenom, PILDATENAIS as date,"
											+ " PILPOIDS as poids, PILTAILLE as taille, PILTEXTE as texte, pa.PAYNOM as nation,"
											+ " e.ECUNOM as ecurie, ph.PHOADRESSE as img, phocommentaire"
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

///////////////////////// sponors du pilote /////////////////////////
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
/////////////////// images du pilote (!= photo d'identité) /////////////////////
module.exports.getImages = function (data, callback) {

	db.getConnection(function(err, connexion){
		        if(!err){
		        	  // s'il n'y a pas d'erreur de connexion
		        	  // execution de la requête SQL
								let sql = "SELECT p.PILNOM as nom, ph.PHOADRESSE as imgs, phocommentaire"
											+ " FROM pilote p JOIN photo ph ON p.PILNUM = ph.PILNUM"
											+ " WHERE ph.PHONUM != 1 AND p.pilnum= " + connexion.escape(data);
		            connexion.query(sql, callback);
		            // la connexion retourne dans le pool
		            connexion.release();
		         }
		   });
};
