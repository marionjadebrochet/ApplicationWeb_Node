let db = require('../configDb');

//////////////// liste circuits //////////////////////
module.exports.getListeCircuit = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT c.cirnum as num, c.CIRNOM as nom, c.CIRLONGUEUR as longu, "
								+ "c.CIRNBSPECTATEURS as nbrSpec, gpnum "
								+ "FROM circuit c "
								+ "LEFT JOIN grandprix g ON g.cirnum=c.cirnum "
								+ "ORDER BY `nom` ASC ";

            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

///////////////////// supprimer ciruit //////////////////////////
			module.exports.supCir = function (data, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql1 ="delete from course where gpnum =" + connexion.escape(data.gp);
            let sql2 = "delete from essais where gpnum =" + connexion.escape(data.gp);
						 let sql3 = "delete from grandprix where gpnum =" + connexion.escape(data.gp);
						 let sql4 = "delete from circuit where cirnum =" + connexion.escape(data.num);
            connexion.query(sql1);
            connexion.query(sql2);
            connexion.query(sql3);
            connexion.query(sql4, callback);
            connexion.release();

        }
    });
}

//////////////////// supprimer circuit sans grand prix /////////////////
module.exports.supCirSansGP = function (data, callback) {
db.getConnection(function (err, connexion) {
	if (!err) {
			 let sql1 = "delete from circuit where cirnum =" + connexion.escape(data);
			connexion.query(sql1, callback);
			connexion.release();

	}
});
}
 //////////////////// récupérer les pays ///////////////////
module.exports.getPays = function (callback) {

	db.getConnection(function(err, connexion){
		if(!err){

			let sql = "SELECT paynum, paynom FROM pays ORDER BY paynom";

			connexion.query(sql, callback);

			connexion.release();
		}
	});
};


////////////// ajouter un circuit /////////////////////
module.exports.ajouterCircuit = function (data, callback) {

	db.getConnection(function(err, connexion){
		if(!err){
			let sql = "insert into circuit set ?";
			connexion.query(sql, data, callback);

			connexion.release();
		}
	});
};


//////////////// détails circuit ///////////////////////
module.exports.getCircuit = function (data, callback) {

	db.getConnection(function(err, connexion){
				if(!err){

						let sql ="SELECT cirnum, cirnom, CIRLONGUEUR, CIRNBSPECTATEURS, cirtext, ciradresseimage, p.paynum, paynom"
								+ " FROM Circuit c"
								+ " join pays p on c.paynum=p.paynum"
								+ " WHERE cirnum = " + connexion.escape(data);

						connexion.query(sql, callback);
						connexion.release();
				 }
			});
};


////////////////// modifier circuit ///////////////////////
module.exports.modifierCircuit= function (data, callback) {

	db.getConnection(function(err, connexion){
        if(!err){

						let sql ="update circuit set ? where cirnum = "
									+ connexion.escape(data.cirnum);

            connexion.query(sql, data, callback);

            connexion.release();
         }
      });
};
