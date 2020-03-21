let model = require('../models/sponsor.js');

var async = require('async');

// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S

module.exports.Sponsor = 	function(request, response){

   model.getListeSponsor( function (err, result) {
       if (err) {
           // gestion de l'erreur
           console.log(err);
           return;
       }
       response.listeSponsor = result;
       //console.log(result);
       response.render('listerSponsors', response);
});
};

module.exports.Ajouter = 	function(request, response){

  model.getListeSponsor( function (err, result) {
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      response.listeSponsor = result;
      //console.log(result);
      response.render('ajouterSponsors', response);
    }
  ); //fin async
};

module.exports.Ajout = 	function(request, response){

  let data = request.body;

  async.parallel ([
    function (callback) {
      model.ajouterSponsors(data, function (err, result) {
        callback(null, result) });
    },
    function(callback) {
      model.getListeSponsor( function (err, result) {
        callback(null, result) });
    },
  ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }

      response.listeSponsor = result[1];
      response.est_ajoute = true;
      response.render('listerSponsors', response);
    }
  ); //fin async
};


module.exports.Modifier = 	function(request, response){

   model.getListeSponsor( function (err, result) {
       if (err) {
           // gestion de l'erreur
           console.log(err);
           return;
       }
       response.listeSponsor = result;
       //console.log(result);
       response.render('ModifierSponsors', response);
});
};

module.exports.Supprimer = 	function(request, response){

let data = request.params.num;

async.parallel ([
  function (callback) {


    model.supSponsor(data, function (err, result) {
      callback(null, result) });

  },
  function (callback) {
    model.getListeSponsor( function (err, result) {
      callback(null, result) });
      console.log('cinq');

  },
],
  function (err, result){
    if (err) {
        // gestion de l'erreur
        console.log(err);
        return;
    }

    response.listeSponsor = result[1];
    response.est_supprime = true;

    response.render('listerSponsors', response);
  }
); //fin async
};
