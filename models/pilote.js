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
module.exports.getListePilote = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT p.PILNUM as num, p.PILNOM as nom, p.PILPRENOM as prenom, p.PILDATENAIS as dateNai FROM pilote p ORDER BY `nom` ASC";

            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getNationalite = function (callback) {

	db.getConnection(function(err, connexion){
		if(!err){

			let sql = "SELECT paynum, paynat FROM pays ORDER BY paynat";

			connexion.query(sql, callback);

			connexion.release();
		}
	});
};

module.exports.ajouterPilote = function (data, callback) {

	db.getConnection(function(err, connexion){
		if(!err){
			let sql = "insert into pilote set "
			 	 			+ "paynum=" + connexion.escape(data.natio)
						 	+ ", pilnom=" + connexion.escape(data.nom)
							+ ", pilprenom=" + connexion.escape(data.prenom);
							if (data.ecurie != '')
								sql = sql + ", ecunum=" + connexion.escape(data.ecurie);
							if (data.point != '')
								sql = sql + ", pilpoints=" + connexion.escape(data.point);
							sql = sql + ", piltaille=" + connexion.escape(data.taille)
							+ ", pilpoids=" + connexion.escape(data.poids)
							+ ", piltexte=" + connexion.escape(data.desc)
							+ ", pildatenais=" + connexion.escape(data.jour);


			connexion.query(sql, callback);

			connexion.release();
		}
	});
};
