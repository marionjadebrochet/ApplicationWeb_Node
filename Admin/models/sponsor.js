let db = require('../configDb');


////////////////////// liste sponsor ///////////////////////
module.exports.getListeSponsor = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT s.SPONOM as nom, s.SPONUM as num, s.SPOSECTACTIVITE as act"
									+ " FROM sponsor s ORDER BY `nom` ASC ";

            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
		};

///////////////// suppression sponsor ///////////////////////
					module.exports.supSponsor = function (data, callback) {
		    db.getConnection(function (err, connexion) {
		        if (!err) {

		            let sql1 ="delete from finance where SPONUM =" + connexion.escape(data);
		            let sql2 = "delete from sponsorise where SPONUM =" + connexion.escape(data);
		            let sql3 = "delete from `sponsor` where `sponsor`.`SPONUM` = " + connexion.escape(data);
		            connexion.query(sql1);
		            connexion.query(sql2);
		            connexion.query(sql3, callback);


		            connexion.release();

		        }
		    });
		}

////////////////////// ajouter sponsor ///////////////////////
		module.exports.ajouterSponsors = function (data, callback) {

			db.getConnection(function(err, connexion){
				if(!err){
					let sql1 = "insert into sponsor set "
								 	+ " sponom=" + connexion.escape(data.sponom)
									+ ", SPOSECTACTIVITE=" + connexion.escape(data.sposectactivite);

					connexion.query(sql1, function(err, result) {
						let sql2 = "insert into finance set"
											+ " sponum = ("
											+ " select sponum from sponsor"
											+ " where sponum >=all (select sponum from sponsor))"
											+ ", ecunum=" + connexion.escape(data.ecunum);

						connexion.query(sql2, callback);
					});

					connexion.release();
				}
			});
		};

//////////////////// récupérer un sponsor ///////////////////
		module.exports.getSponsor = function (data, callback) {

			db.getConnection(function(err, connexion){
		        if(!err){

								let sql ="SELECT sponum, sponom, sposectactivite"
										+ " FROM sponsor"
										+ " WHERE sponum = " + connexion.escape(data);

		            connexion.query(sql, callback);
		            connexion.release();
		         }
		      });
		};

/////////////////////// liste écurie d'un sponsor //////////////////////
		module.exports.getEcuSpo = function (data, callback) {

			db.getConnection(function(err, connexion){
		        if(!err){
								let sql ="SELECT f.ECUNUM as fecunum, f.SPONUM as fsponum, e.ECUNOM as eecunom"
										+ " FROM finance f INNER JOIN ecurie e ON f.ecunum = e.ecunum"
										+ " WHERE sponum = " + connexion.escape(data);

		            connexion.query(sql, callback);
		            connexion.release();
		         }
		      });
		};

//////////////////////// modifier sponsor ///////////////////////////
		module.exports.modifierSponsors = function (data, callback) {

			db.getConnection(function(err, connexion){
		        if(!err){

								let sql1 ="update sponsor set"
								 				+ " sponom =" + connexion.escape(data.sponom)
												+ ", sposectactivite =" + connexion.escape(data.sposectactivite)
												+ " where sponum = " + connexion.escape(data.sponum);
								let sql2 = "delete from finance where sponum = " + connexion.escape(data.sponum);
								let sql3 = "insert into finance set sponum = " + connexion.escape(data.sponum)
													+ ", ecunum = " + connexion.escape(data.ecunum);

								connexion.query(sql1);
								connexion.query(sql2);
								connexion.query(sql3, callback);

		            connexion.release();
		         }
		      });
		};
