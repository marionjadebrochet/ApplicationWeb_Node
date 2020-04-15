let model = require('../models/resultat.js');
var async = require('async');

  // ///////////////////////L I S T E R    R E S U L T A T S //////////
  module.exports.Desc = 	function(request, response){

  async.parallel ([
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

      response.listeGrandPrix = result[0];
      response.render('listerResultats', response);
    }
  ); //fin async
  };


///////////////// T A B L E A U   R E S U L T A T S /////////////////////
module.exports.Resultat = 	function(request, response){
let data = request.body.gp;

async.parallel ([
  function(callback) {
    model.getPiloteTemps(data, function (err, result) {
      callback(null, result) });
  }, // result[0] : resultat
  function(callback) {
    model.getPilotes(data, function (err, result) {
      callback(null, result) });
  }, // result[1] : pilote
],
  function (err, result){
    if (err) {
        // gestion de l'erreur
        console.log(err);
        return;
    }

    response.piloteEtTemps = result[0];
    response.gpnum = result[0][0].gpnum;
    response.pilotes = result[1];
    response.render('detailsResultats', response);
  }
); //fin async
};

////////////// A J O U T E R   R E S U L T A T //////////////
module.exports.Ajouter = 	function(request, response){
let data = request.body;

async.series ([
  function (callback) {
    model.ajouter(data, function (err, result) {
      callback(null, result) });
  }, // ajout du resultat
  function (callback) {
    model.updatePoints(data, function (err, result) {
      callback(null, result) });
  }, // maj des points des pilotes/écuries
  function(callback) {
    model.getPiloteTemps(data.gpnum, function (err, result) {
      callback(null, result) });
  }, // result[2] : resultat
  function(callback) {
    model.getPilotes(data.gpnum, function (err, result) {
      callback(null, result) });
  }, // result[3] : pilotes
],
  function (err, result){
    if (err) {
        // gestion de l'erreur
        console.log(err);
        return;
    }

    response.piloteEtTemps = result[2];
    response.gpnum = result[2][0].gpnum;
    response.pilotes = result[3];
    response.render('detailsResultats', response);
  }
); //fin async
};

///////////////// S U P P R I M E R   R E S U L T A T //////////////
module.exports.Supprimer = 	function(request, response){
let data = request.params;

async.series ([
  function (callback) {
    model.supprimer(data, function (err, result) {
      callback(null, result) });
  }, // suppression du résultat
  function (callback) {
    model.updatePoints(data, function (err, result) {
      callback(null, result) });
  }, // maj des points des pilotes/écuries
  function(callback) {
    model.getPiloteTemps(data.gpnum, function (err, result) {
      callback(null, result) });
  }, // result[2] : resultat
  function(callback) {
    model.getPilotes(data.gpnum, function (err, result) {
      callback(null, result) });
  }, // result[3] : pilotes
],
  function (err, result){
    if (err) {
        // gestion de l'erreur
        console.log(err);
        return;
    }

    response.piloteEtTemps = result[2];
    response.gpnum = result[2][0].gpnum;
    response.pilotes = result[3];
    response.render('detailsResultats', response);
  }
); //fin async
};
