let db = require('../configDb');

//////////////////// récupérer mdp en fonction du login ////////////
module.exports.verifLogin = function (login, callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT login, passwd FROM login"
            + " WHERE login = " + connexion.escape(login);

            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
}
