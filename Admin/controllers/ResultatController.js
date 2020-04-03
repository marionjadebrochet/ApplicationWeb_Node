let model = require('../models/resultat.js');
var async = require('async');
  // //////////////////////////L I S T E R    R E S U L T A T S


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

module.exports.Resultat = 	function(request, response){
let data = request.body.gp;
async.parallel ([
  function(callback) {
    model.getPiloteTemps(data, function (err, result) {
      callback(null, result) });
  },
  function(callback) {
    model.getPilotes(data, function (err, result) {
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
    console.log(data);
    response.piloteEtTemps = result[0];
    response.gpnum = result[0][0].gpnum;
    response.pilotes = result[1];
    response.render('detailsResultats', response);
  }
); //fin async
};

module.exports.Ajouter = 	function(request, response){
let data = request.body;

async.series ([
  function (callback) {
    model.ajouter(data, function (err, result) {
      callback(null, result) });
  },
  function (callback) {
    model.updatePoints(data, function (err, result) {
      callback(null, result) });
  },
  function(callback) {
    model.getPiloteTemps(data.gpnum, function (err, result) {
      callback(null, result) });
  },
  function(callback) {
    model.getPilotes(data.gpnum, function (err, result) {
      callback(null, result) });
  },
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

module.exports.Supprimer = 	function(request, response){
let data = request.params;

async.series ([
  function (callback) {
    model.supprimer(data, function (err, result) {
      callback(null, result) });
  },
  function (callback) {
    model.updatePoints(data, function (err, result) {
      callback(null, result) });
  },
  function(callback) {
    model.getPiloteTemps(data.gpnum, function (err, result) {
      callback(null, result) });
  },
  function(callback) {
    model.getPilotes(data.gpnum, function (err, result) {
      callback(null, result) });
  },
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
