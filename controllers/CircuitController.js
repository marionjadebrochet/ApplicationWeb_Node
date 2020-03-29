let model = require('../models/circuit.js');

var async = require('async');

// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S

module.exports.Circuit = 	function(request, response){

   model.getListeCircuit( function (err, result) {
       if (err) {
           // gestion de l'erreur
           console.log(err);
           return;
       }
       response.listeCircuit = result;
       //console.log(result);
       response.render('listerCircuits', response);
});
};



module.exports.Ajouter = 	function(request, response){

let data = request.params.num;

async.parallel ([
  function (callback) {
    model.getPays(function (err, result) {
      callback(null, result) });
  },
  function (callback) {
    model.getListeCircuit( function (err, result) {
      callback(null, result) });
  },
],
  function (err, result){
    if (err) {
        // gestion de l'erreur
        console.log(err);
        return;
    }

    response.pays = result[0];
    response.listeCircuit= result[1];
    response.render('AjouterCircuit', response);
  }
); //fin async
};


module.exports.Ajout = 	function(request, response){

  let data = request.body;

  async.parallel ([
    function (callback) {
      model.ajouterCircuit(data, function (err, result) {
        callback(null, result) });
    }, // ajout du pilote dans la bd
    function(callback) {
      model.getListeCircuit( function (err, result) {
        callback(null, result) });
    }, //result[1] : listePilote
  ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }

      response.listeCircuit = result[1];
      response.est_ajoute = true;
      response.render('listerCircuits', response);
    }
  ); //fin async
};

module.exports.Modifier = function(request, response){
  let data = request.params.num;

  async.parallel ([
    function(callback) {
      model.getPays(function (err, result) {
        callback(null, result) });
    },
    function(callback) {
      model.getCircuit(data, function (err, result) {
        callback(null, result) });
    },
  ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }

      response.pays = result[0];
      response.circuit = result[1][0];
      response.render('modifierCircuit', response);
});
};

module.exports.Modifie = function(request, response){
  let data = request.body;

  async.parallel ([
    function(callback) {
      model.modifierCircuit(data, function (err, result) {
        callback(null, result) });
    },
    function(callback) {
      model.getListeCircuit( function (err, result) {
        callback(null, result) });
    },
  ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      response.listeCircuit = result[1];
      response.est_modifie = true;
      response.render('listerCircuits', response);
});
};


module.exports.Supprimer = 	function(request, response){

let data = request.params;

async.parallel ([
  function (callback) {
    model.supCir(data, function (err, result) {
      callback(null, result) });
  },
  function (callback) {
    model.getListeCircuit( function (err, result) {
      callback(null, result) });
  },
],
  function (err, result){
    if (err) {
        // gestion de l'erreur
        console.log(err);
        return;
    }

    response.listeCircuit = result[1];

    response.est_supprime = true;

    response.render('listerCircuits', response);
  }
); //fin async
};

module.exports.SupprimerSansGP = 	function(request, response){

let data = request.params.num;

async.parallel ([
  function (callback) {
    model.supCirSansGP(data, function (err, result) {
      callback(null, result) });
  },
  function (callback) {
    model.getListeCircuit( function (err, result) {
      callback(null, result) });
  },
],
  function (err, result){
    if (err) {
        // gestion de l'erreur
        console.log(err);
        return;
    }

    response.listeCircuit = result[1];

    response.est_supprime = true;

    response.render('listerCircuits', response);
  }
); //fin async
};
