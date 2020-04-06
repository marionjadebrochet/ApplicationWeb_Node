let model = require('../models/resultat.js');

  // //////////////////////////L I S T E R    R E S U L T A T S
module.exports.ListerResultat = function(request, response){
	response.title = 'Liste des résulats des grands prix';
	model.getListeRes( function (err, result) {
			if (err) {
					// gestion de l'erreur
					console.log(err);
					return;
			}
			response.listeGrandPrix = result;
			//console.log(result);
	response.render('listerResultat', response);
});
}

module.exports.DescResultat = 	function(request, response){
response.title = 'Liste des résulats des grands prix';
let data = request.params.num;

model.getPiloteTemps(data, function (err, result) {
		if (err) {
				// gestion de l'erreur
				console.log(err);
				return;
		}

    response.piloteEtTemps = result
		response.date = result[0].gpdate;
		response.gpnom = result[0].gpnom;
		response.detail = result[0].gpcommentaire;
		;
    response.render('detailsResultat', response);
  }
); //fin async
};
