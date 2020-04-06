let model = require('../models/ecurie.js');

var async = require('async');

// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S

module.exports.Ecurie = 	function(request, response){

   model.getListeEcurie( function (err, result) {
       if (err) {
           // gestion de l'erreur
           console.log(err);
           return;
       }
       response.listeEcurie = result;
       //console.log(result);
       response.render('listerEcurie', response);
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
    model.getListeEcurie( function (err, result) {
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
    response.listeEcurie = result[1];
    response.render('ajouterEcurie', response);
  }
); //fin async
};


module.exports.Ajout = 	function(request, response){

  let data = request.body;

  let image = request.files.image;
  //////// ajout de l'adresse de l'image dans data //////
  data.ecuadresseimage = image.name;

  ////////////////////// Ajout de l'image///////////////////
  image.mv('./public/image/ecurie/' + image.name , function(err) {
   if (err)
     console.log(err);
   });
   image.mv('../public/public/image/ecurie/' + image.name , function(err) {
    if (err)
      console.log(err);
   });

  async.parallel ([
    function (callback) {
      model.ajouterEcurie(data, function (err, result) {
        callback(null, result) });
    }, // ajout du pilote dans la bd
    function(callback) {
      model.getListeEcurie( function (err, result) {
        callback(null, result) });
    }, //result[1] : listePilote
  ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }

      response.listeEcurie = result[1];
      response.est_ajoute = true;
      response.render('listerEcurie', response);
    }
  ); //fin async
};

module.exports.Modifier = function(request, response){
  let data = request.params.num;

  async.parallel ([
    function (callback) {
      model.getPays( function (err, result) {
        callback(null, result) });
    }, //result[0] : nationalite
    function(callback) {
      model.getEcurie(data, function (err, result) {
        callback(null, result) });
    }, //result[2] : pilote
  ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      response.pays = result[0];
      response.ecurie = result[1][0];
      response.render('modifierEcurie', response);
});
};

module.exports.Modifie = function(request, response){
  let data = request.body;

  async.parallel ([
    function(callback) {
      model.modifierEcurie(data, function (err, result) {
        callback(null, result) });
    }, // modification du pilote
    function(callback) {
      model.getListeEcurie( function (err, result) {
        callback(null, result) });
    }, //result[1] : listePilote
  ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      response.listeEcurie= result[1];
      response.est_modifie = true;
      response.render('listerEcurie', response);
});
};

module.exports.Supprimer = 	function(request, response){

//Tu récupère le numéro passé dans l'adresse
let data = request.params.num;

async.parallel ([
  function (callback) {
    // le 'data' correspond donc à ton numéro que tu passe dans la fonction
    model.supEcu(data, function (err, result) {
      callback(null, result) });
  },
  function (callback) {
    // j'explique en dessus pourquoi je met la fonction getListeEcurie
    model.getListeEcurie( function (err, result) {
      callback(null, result) });
  },
],
  function (err, result){
    if (err) {
        // gestion de l'erreur
        console.log(err);
        return;
    }

    response.listeEcurie = result[1];

    response.est_supprime = true;

    response.render('listerEcurie', response);
  }
); //fin async
};
