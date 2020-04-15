let db = require('../configDb');

//////////////////// liste écurie //////////////////////////
module.exports.getListeEcurie = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT ecunum as num, ecunom as nom, ecunomdir as dir, ecupoints as point "
										+ "FROM ecurie"
										+ " order by ecunom asc";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

////////////////////////// supprimer écurie ////////////////////////
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


/////////////////////// récupérer les pays ///////////////////////////
module.exports.getPays = function (callback) {

	db.getConnection(function(err, connexion){
		if(!err){

			let sql = "SELECT paynum, paynom FROM pays ORDER BY paynom";

			connexion.query(sql, callback);

			connexion.release();
		}
	});
};


//////////////////////// détails écurie ///////////////////////////////
module.exports.getEcurie = function (data, callback) {

	db.getConnection(function(err, connexion){
        if(!err){

						let sql ="SELECT ecunum, ecunom, ecunomdir, ecuadrsiege, ecupoints, ecuadresseimage, p.paynum, paynom"
								+ " FROM ecurie e"
								+ " LEFT JOIN pays p on p.paynum=e.paynum"
								+ " WHERE ecunum = " + connexion.escape(data);

            connexion.query(sql, callback);

            connexion.release();
         }
      });
};

////////////////////// ajouter écurie ////////////////////////////////
module.exports.ajouterEcurie = function (data, callback) {

	db.getConnection(function(err, connexion){
		if(!err){
			let sql = "insert into ecurie set ?";
			connexion.query(sql, data, callback);

			connexion.release();
		}
	});
};

///////////////////////// modifier écurie ///////////////////////////////
module.exports.modifierEcurie = function (data, callback) {

	db.getConnection(function(err, connexion){
        if(!err){

						let sql ="update ecurie set ? where ecunum = "
									+ connexion.escape(data.ecunum);

            connexion.query(sql, data, callback);

            connexion.release();
         }
      });
};
