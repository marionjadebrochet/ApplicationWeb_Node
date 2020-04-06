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
module.exports.getListeEcurie = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT ecunum as num, ecunom as nom, ecunomdir as dir, ecupoints as point "
										+ "FROM ecurie";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.supEcu = function (data, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql1 ="update pilote set ecunum = NULL where ecunum =" + connexion.escape(data);
            let sql2 = "delete from  voiture where ecunum =" + connexion.escape(data);
            let sql3 = "delete from  finance  where ecunum =" + connexion.escape(data);
            let sql4 = "delete from  ecurie  where ecunum =" + connexion.escape(data);
            connexion.query(sql1);
            connexion.query(sql2);
            connexion.query(sql3);
            connexion.query(sql4, callback);
            connexion.release();

        }
    });
}

module.exports.getPays = function (callback) {

	db.getConnection(function(err, connexion){
		if(!err){

			let sql = "SELECT paynum, paynom FROM pays ORDER BY paynom";

			connexion.query(sql, callback);

			connexion.release();
		}
	});
};

module.exports.getEcurie = function (data, callback) {

	db.getConnection(function(err, connexion){
        if(!err){

						let sql ="SELECT ecunum, ecunom, ecunomdir, ecuadrsiege, ecupoints, ecuadresseimage, p.paynum, paynom"
								+ " FROM ecurie e"
								+ " JOIN pays p on p.paynum=e.paynum"
								+ " WHERE ecunum = " + connexion.escape(data);

            connexion.query(sql, callback);

            connexion.release();
         }
      });
};

module.exports.ajouterEcurie = function (data, callback) {

	db.getConnection(function(err, connexion){
		if(!err){
			let sql = "insert into ecurie set ?";
			connexion.query(sql, data, callback);

			connexion.release();
		}
	});
};


module.exports.modifierEcurie = function (data, callback) {

	db.getConnection(function(err, connexion){
        if(!err){

						let sql ="update ecurie set ? where ecunum = "
									+ connexion.escape(data.ecunum);
								console.log(sql);
								console.log(data);
            connexion.query(sql, data, callback);

            connexion.release();
         }
      });
};
