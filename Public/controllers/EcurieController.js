let model = require('../models/ecurie.js');

// //////////////////////// L I S T E R  E C U R I E S //////////////////

module.exports.DescEcurie = 	function(request, response){
  response.title = " Écuries du grand prix";
  let data = request.params.num;

  async.parallel ([
    function (callback) {
      model.getListeEcurie( function (err, result) {
        callback(null, result) });
    }, // result[0] : liste ecurie
    function(callback) {
      model.getDetEcurie(data, function (err, result) {
        callback(null, result) });
    }, // result[1] : details circuit
    function(callback) {
      model.getPiloteEcurie(data, function (err, result) {
        callback(null, result) });
    }, // result[2] : pilote
    function(callback) {
      model.getPhotoEcurie(data, function (err, result) {
        callback(null, result) });
    }, // result[3] : voiture
  ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }

      response.listeEcurie = result[0];
      response.detailsEcurie = result[1][0];
      response.pilotes = result[2];
      response.voiture = result[3];
      response.render('detailsEcurie', response);
    }
  ); //fin async
};
