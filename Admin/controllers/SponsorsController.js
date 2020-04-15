let model = require('../models/sponsor.js');
let modelEcurie = require('../models/ecurie.js');

var async = require('async');

// //////////////////// L I S T E   D E S   S P O N S O R ////////

module.exports.Sponsor = 	function(request, response){
response.title = 'Sponsors';
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

//////////////////// P A G E   A J O U T E R   S P O N S O R ////////
module.exports.Ajouter = 	function(request, response){
response.title = 'Ajouter un sponsors';
  async.parallel ([
    function(callback) {
      model.getListeSponsor( function (err, result) {
        callback(null, result) });
    },// result[0] : liste sponsors
    function(callback) {
      modelEcurie.getListeEcurie( function (err, result) {
        callback(null, result) });
    }, // result[1] : ecuries
  ],
  function (err, result){
    if (err) {
        // gestion de l'erreur
        console.log(err);
        return;
    }

    response.listeSponsor = result[0];
    response.nomEcurie= result[1];
      response.render('ajouterSponsors', response);
    }
  ); //fin async
};

//////////////////// A J O U T E R   S P O N S O R ////////
module.exports.Ajout = 	function(request, response){
response.title = 'Sponsors';
  let data = request.body;
// supprression de l'écunum si pas renseigné
  if(data.ecunum == '')
    delete data.ecunum;

  async.parallel ([
    function (callback) {
      model.ajouterSponsors(data, function (err, result) {
        callback(null, result) });
    }, // ajouter sponsor
    function(callback) {
      model.getListeSponsor( function (err, result) {
        callback(null, result) });
    }, // result[1] : liste sponsor
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

//////////////////// P A G E   M O D I F I E R   S P O N S O R ////////
module.exports.Modifier = function(request, response){
  response.title = 'Modifier un sponsors';
  let data = request.params.num;

  async.parallel ([
    function(callback) {
      model.getEcuSpo(data, function (err, result) {
        callback(null, result) });
    }, // result[0] : ecurie
    function(callback) {
      modelEcurie.getListeEcurie( function (err, result) {
        callback(null, result) });
    }, // result[0] : ecuries
    function(callback) {
      model.getSponsor(data, function (err, result) {
        callback(null, result) });
    }, // result[0] : sponsor
  ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }

      response.finance = result[0][0];
      response.nomEcurie = result[1];
      response.sponsor = result[2][0];
      response.render('modifierSponsors', response);
});
};

//////////////////// M O D I F I E R   S P O N S O R ////////
module.exports.Modifie = function(request, response){
  response.title = 'Sponsors';
  let data = request.body;
// suppression de ecunum si pas renseigné
  if(data.ecunum == '')
    delete data.ecunum;

  async.parallel ([
    function(callback) {
      model.modifierSponsors(data, function (err, result) {
        callback(null, result) });
    }, // modifier sponsor
    function(callback) {
      model.getListeSponsor( function (err, result) {
        callback(null, result) });
    }, // result[1] : liste sponsor
  ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      response.listeSponsor = result[1];
      response.est_modifie = true;
      response.render('listerSponsors', response);
});
};

//////////////////// S U P P R I M E R   S P O N S O R ////////
module.exports.Supprimer = 	function(request, response){
response.title = 'Sponsors';
let data = request.params.num;

async.parallel ([
  function (callback) {
    model.supSponsor(data, function (err, result) {
      callback(null, result) });
  }, // suppression du sponsor
  function (callback) {
    model.getListeSponsor( function (err, result) {
      callback(null, result) });
  }, // result[1] : liste sponsor
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
