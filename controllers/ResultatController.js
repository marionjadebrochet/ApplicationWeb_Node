let model = require('../models/resultat.js');
var async = require('async');
  // //////////////////////////L I S T E R    R E S U L T A T S

module.exports.DescResultat = 	function(request, response){
let data = request.params.num;
async.parallel ([
  function (callback) {
    model.getListeRes( function (err, result) {
      callback(null, result) });
  },
  function(callback) {
    model.getPiloteTemps(data, function (err, result) {
      callback(null, result) });
  },
	function(callback) {
		model.getPlacePilote(data, function (err, result) {
			callback(null, result) });
	},
],
  function (err, result){
    if (err) {
        // gestion de l'erreur
        console.log(err);
        return;
    }
    console.log(result);
    response.listeGrandPrix = result[0];
    response.piloteEtTemps = result[1];
		response.placeEtPoint = result[2];
    response.render('listerResultats', response);
  }
); //fin async
};
