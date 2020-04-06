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

//le 'data' de t'as fonction contiens donc le num passé dans l'adresse
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

module.exports.supCirSansGP = function (data, callback) {
db.getConnection(function (err, connexion) {
	if (!err) {
			 let sql1 = "delete from circuit where cirnum =" + connexion.escape(data);
			connexion.query(sql1, callback);
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

module.exports.ajouterCircuit = function (data, callback) {

	db.getConnection(function(err, connexion){
		if(!err){
			let sql = "insert into circuit set ?";
			connexion.query(sql, data, callback);

			connexion.release();
		}
	});
};

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
