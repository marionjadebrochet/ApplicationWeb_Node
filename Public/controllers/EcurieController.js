let model = require('../models/ecurie.js');

// //////////////////////// L I S T E R  E C U R I E S

module.exports.DescEcurie = 	function(request, response){
let data = request.params.nom;
console.log('descecurie');
async.parallel ([
  function (callback) {
    model.getListeEcurie( function (err, result) {
      callback(null, result) });
  },
  function(callback) {
    model.getDetEcurie(data, function (err, result) {
      callback(null, result) });
  },
  function(callback) {
    model.getPiloteEcurie(data, function (err, result) {
      callback(null, result) });
  },
  function(callback) {
    model.getPhotoEcurie(data, function (err, result) {
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
    response.listeEcurie = result[0];
    response.detailsEcurie = result[1];
    response.pilotes = result[2];
    response.voiture = result[3];
    response.render('detailsEcurie', response);
  }
); //fin async
};
