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

	async.parallel ([
		function(callback) {
	    model.getPiloteTemps(data, function (err, result) {
	      callback(null, result) });
	  },
	  function (callback) {
	    model.getListeRes( function (err, result) {
	      callback(null, result) });
	  },
	],
	  function (err, result){
	    if (err) {
	        // gestion de l'erreur
	        console.log(err);
	        return;
	    }

	    response.piloteEtTemps = result[0]
			response.date = result[0][0].gpdate;
			response.gpnom = result[0][0].gpnom;
			response.detail = result[0][0].gpcommentaire;
			response.listeGrandPrix = result[1];
			;
	    response.render('detailsResultat', response);
	  }
	); //fin async
};
