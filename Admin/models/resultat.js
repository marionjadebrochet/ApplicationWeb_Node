let db = require('../configDb');

/////////////////////////// liste résultats ////////////////////
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

///////////////////// tableau résulat /////////////////////////
module.exports.getPiloteTemps = function (data, callback) {

    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "Select place, pilnom, tempscourse, ptnbpointsplace, gpnum, pilnum"
								+ " from ("
									+ " select @n := @n + 1 place, pilnom, tempscourse, gp.gpnum, p.pilnum"
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

////////////////////// pilotes n'ayant pas participés au grand prix ////////////////////////////
module.exports.getPilotes = function (data, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT p1.pilnom, p1.pilnum"
									+ " FROM pilote p1 WHERE p1.pilnum NOT IN"
									+ " (SELECT p2.pilnum FROM pilote p2"
									+ " JOIN course c ON c.pilnum = p2.pilnum"
									+ " JOIN grandprix gp ON c.gpnum = gp.gpnum"
									+ " WHERE gp.gpnum =" + connexion.escape(data)
									+ ") ORDER BY p1.pilnom";

            connexion.query(sql, callback);
            connexion.release();
        }
    })
};

/////////////////// ajouter résultat ////////////////////////
module.exports.ajouter = function (data, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "insert into course set"
										+ " gpnum = " + connexion.escape(data.gpnum)
										+ ", pilnum = " + connexion.escape(data.pilnum)
										+ ", tempscourse = " + connexion.escape(data.heure+':'+data.minute+':'+data.seconde);

            connexion.query(sql, callback);
            connexion.release();
        }
    })
};

///////////////////// supprimer résultat /////////////////////////
module.exports.supprimer = function (data, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "delete from course"
										+ " where gpnum = " + connexion.escape(data.gpnum)
										+ "and pilnum = " + connexion.escape(data.pilnum);
						let sql1 = "update pilote set pilpoints = NULL"
						 				+ " where pilnum = " + connexion.escape(data.pilnum);

										connexion.query(sql);
				            connexion.query(sql1, callback);

            connexion.release();
        }
    })
};

////////////// maj des points des écurie/pilotes /////////////////////
module.exports.updatePoints = function (data, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {

					////////// maj point pilote ///////////
					let sql2 = "Select ptnbpointsplace, pilnum"
							+ " from ("
								+ " select @n := @n + 1 place, p.pilnum"
								+ " from pilote p join (SELECT @n := 0)t"
								+ " JOIN course c ON c.pilnum = p.pilnum"
								+ " JOIN grandprix gp ON c.gpnum = gp.gpnum"
								+ " WHERE gp.gpnum =" + connexion.escape(data.gpnum)
								+ " order by tempscourse)tab"
							+ " left join points on points.PTPLACE=tab.place";

					connexion.query(sql2, function(err, result) {

					let sql3 ="";
					result.forEach( function(point, index) {
						sql3 = "update pilote set"
										+ " pilpoints =" + point.ptnbpointsplace
										+ " where pilnum=" + point.pilnum;
						connexion.query(sql3);
					});

					/////////////////// Récupération nb par écurie //////////
					let sql4 = "select sum(pilpoints) as ptecurie, ecunum"
									+ " from pilote"
									+ " group by ecunum";
					connexion.query(sql4, function(err, result) {

					let sql5 ="";
					//////////////// maj points écurie ////////////
					result.forEach( function(point, index) {
						sql5 = "update ecurie set"
									+ " ecupoints =" + point.ptecurie
									+ " where ecunum=" + point.ecunum;
						connexion.query(sql5);
						});
						callback(null, result);
					});
				});
				connexion.release();
			}
		})
	};
