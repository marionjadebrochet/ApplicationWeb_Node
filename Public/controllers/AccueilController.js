let model = require('../models/accueil.js');

  // //////////////////////////P O U R    A C C U E I L
module.exports.GrandPrixDate = function(request, response){
	model.getGrandPrix( function (err, result) {
			if (err) {
					// gestion de l'erreur
					console.log(err);
					return;
			}
			response.listeGrandPrix = result;
			//console.log(result);
	response.render('home', response);
});
}
