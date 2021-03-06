let db = require('../configDb');
//////////////////////// liste grand prix //////////////////////////
module.exports.getListeRes = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT gp.GPNUM as num, gp.GPNOM as nom, p.PAYADRDRAP as img FROM " +
                            "grandprix gp INNER JOIN circuit c " +
                            "ON gp.CIRNUM = c.CIRNUM INNER JOIN " +
                            "PAYS p ON c.PAYNUM = p.PAYNUM ORDER BY `gp`.`GPNOM` ASC";
						//console.log (sql);
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};
//////////////////////////// resultats ///////////////////////////////////
module.exports.getPiloteTemps = function (data, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
					let sql = "Select place, pilnom, tempscourse, ptnbpointsplace, gpnum, gpdate, gpnom, gpcommentaire, pilnum"
							+ " from ("
								+ " select @n := @n + 1 place, pilnom, tempscourse, gp.gpnum, gpdate, gpnom, gpcommentaire, p.pilnum"
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
