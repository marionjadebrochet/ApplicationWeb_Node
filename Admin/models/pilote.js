let db = require('../configDb');


//////////////////// liste pilotes //////////////////////////////
module.exports.getListePilote = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT p.PILNUM as num, p.PILNOM as nom, p.PILPRENOM as prenom, p.PILDATENAIS as dateNai"
									+ " FROM pilote p ORDER BY `nom` ASC";

            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};


///////////////// récupérer nationnalités ///////////////////
module.exports.getNationalite = function (callback) {

	db.getConnection(function(err, connexion){
		if(!err){

			let sql = "SELECT paynum, paynat FROM pays ORDER BY paynat";

			connexion.query(sql, callback);

			connexion.release();
		}
	});
};

/////////////////////// ajouter pilote /////////////////////////////
module.exports.ajouterPilote = function (data, dataImage, callback) {

	db.getConnection(function(err, connexion){
		if(!err){
			let sql = "insert into pilote set ?";

////// ajout photo d'identité ////////////
			if (dataImage.phoadresse) {
				connexion.query(sql, data);

				let sql1 = "select pilnum from pilote"
							+ " where pilnum >= all ("
							+ " select pilnum from pilote)";

				connexion.query(sql1, function(err, result) {
					dataImage.pilnum = result[0].pilnum;
					let sql2 = "insert into photo set ?";

					connexion.query(sql2, dataImage, callback);
				})
			} else {
				connexion.query(sql, data, callback);
			}

			connexion.release();
		}
	});
};

///////////////////////// détails pilote ///////////////////////
module.exports.getPilote = function (data, callback) {

	db.getConnection(function(err, connexion){
        if(!err){

						let sql ="SELECT p.pilnum, pilnom, pilprenom, pildatenais, piltaille, pilpoids, phoadresse, phocommentaire,"
								+ " pilpoints, piltexte, p.paynum, paynat, p.ecunum, ecunom"
								+ " FROM pilote p"
								+ "	LEFT JOIN ecurie e ON p.ecunum=e.ecunum"
								+ " left join photo ph on p.pilnum=ph.pilnum"
								+ " JOIN pays ON pays.paynum=p.paynum"
								+ " WHERE p.pilnum = " + connexion.escape(data);

            connexion.query(sql, callback);

            connexion.release();
         }
      });
};


////////////////////////// modifier un pilote /////////////////////////
module.exports.modifierPilote = function (data, dataImage, callback) {
console.log(dataImage);
	db.getConnection(function(err, connexion){
        if(!err){

						let sql ="update pilote set ? where pilnum = "
									+ connexion.escape(data.pilnum);

		////// ajout photo d'identité ////////////
					if (dataImage.phoadresse) { //si photo ajoutée ou modifiée
						connexion.query(sql, data);

						let sql1 = "delete from photo"
									+ " where pilnum=" + connexion.escape(data.pilnum)
									+ " and phonum = 1";
						let sql2 = "insert into photo set ?";
							connexion.query(sql1);
							connexion.query(sql2, dataImage, callback);
					} else { // si uniquement commentaire modifié
						if (dataImage.phocommentaire) {

							connexion.query(sql, data);
							let sql3 = "update photo set ? "
										+ " were phonum = 1"
										+ " and pilnum ="	+ connexion.escape(data.pilnum);
							connexion.query(sql3, dataImage, callback);
						} else { // si rien est modifié

						connexion.query(sql, data, callback);
						}
					}

          connexion.release();
       }
  });
};


///////////////////// supprimer un pilote //////////////////////////
module.exports.supprimerPi = function (data, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
					  let sql1 = "delete from sponsorise where pilnum =" + connexion.escape(data);
            let sql2 = "delete from photo where pilnum =" + connexion.escape(data);
						let sql3 = "delete from course where pilnum =" + connexion.escape(data);
            let sql4 = "delete from pilote  where pilnum =" + connexion.escape(data);
            connexion.query(sql1);
            connexion.query(sql2);
            connexion.query(sql3);
            connexion.query(sql4, callback);
            connexion.release();
        }
    });
}
