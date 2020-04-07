let model = require('../models/pilote.js'),
    modelEcurie = require('../models/ecurie.js');

var async = require('async');

// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S

module.exports.Pilote = 	function(request, response){
  response.title = 'Pilote';
   model.getListePilote( function (err, result) {
       if (err) {
           // gestion de l'erreur
           console.log(err);
           return;
       }
       response.listePilote = result;
       //console.log(result);
       response.render('listerPilote', response);
});
};

module.exports.Ajouter = 	function(request, response){
  response.title = 'Ajouter un pilote';

  async.parallel ([
    function (callback) {
      model.getNationalite( function (err, result) {
        callback(null, result) });
    }, //result[0] : nationalite
    function(callback) {
      modelEcurie.getListeEcurie( function (err, result) {
        callback(null, result) });
    }, //result[1] : ecurie
  ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      response.nationalite = result[0];
      response.nomEcurie = result[1];
      response.render('ajouterPilote', response);
    }
  ); //fin async
};

module.exports.Ajout = 	function(request, response){
  response.title = 'Pilote';
  let data = request.body;
  let dataImage = {};
  // supression de pilpoints et ecunum si pas renseigner
  // pour qu'il soit mis à null dans la bd
  if(data.pilpoints == '')
    delete data.pilpoints;
  if(data.ecunum == '')
    delete data.ecunum;
  if(data.pilpoids == '')
    delete data.pilpoids;
  if(data.piltaille == '')
    delete data.piltaille;
  if(data.pildatenais == '')
    delete data.pildatenais;

/////////// ajout photo d'indentité /////////////////
    if(request.files) {
      let image = request.files.image;
      //////// ajout de l'adresse de l'image dans data //////
      dataImage.phoadresse = image.name;
      dataImage.phosujet = 'Photo identité';
      dataImage.phonum = 1;
      dataImage.phocommentaire = data.phocommentaire;
      delete data.phocommentaire;

      ////////////////////// Ajout de l'image///////////////////
      image.mv('./public/image/pilote/' + image.name , function(err) {
       if (err)
         console.log(err);
       });
       image.mv('../public/public/image/pilote/' + image.name , function(err) {
        if (err)
          console.log(err);
       });
    }

  async.parallel ([
    function (callback) {
      model.ajouterPilote(data, dataImage, function (err, result) {
        callback(null, result) });
    }, // ajout du pilote dans la bd
    function(callback) {
      model.getListePilote( function (err, result) {
        callback(null, result) });
    }, //result[1] : listePilote
  ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }

      response.listePilote = result[1];
      response.est_ajoute = true;
      response.render('listerPilote', response);
    }
  ); //fin async
};


module.exports.Modifier = function(request, response){
  response.title = 'Pilote';
  let data = request.params.num;

  async.parallel ([
    function (callback) {
      model.getNationalite( function (err, result) {
        callback(null, result) });
    }, //result[0] : nationalite
    function(callback) {
      modelEcurie.getListeEcurie( function (err, result) {
        callback(null, result) });
    }, //result[1] : ecurie
    function(callback) {
      model.getPilote(data, function (err, result) {
        callback(null, result) });
    }, //result[2] : pilote
  ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      response.nationalite = result[0];
      response.nomEcurie = result[1];
      response.pilote = result[2][0];
      response.render('modifierPilote', response);
});
};

module.exports.Modifie = function(request, response){
  response.title = 'Pilote';
  let data = request.body;
  let dataImage = {};

  if(data.pilpoints == '')
    delete data.pilpoints;
  if(data.ecunum == '')
    delete data.ecunum;
  if(data.pilpoids == '')
    delete data.pilpoids;
  if(data.piltaille == '')
    delete data.piltaille;
  if(data.pildatenais == '')
    delete data.pildatenais;

/////////// ajout photo d'indentité /////////////////
  if(request.files) {

    let image = request.files.image;
    //////// ajout de l'adresse de l'image dans data //////
    dataImage.phoadresse = image.name;
    dataImage.pilnum = data.pilnum;
    dataImage.phosujet = 'Photo identité';
    dataImage.phonum = 1;
    dataImage.phocommentaire = data.phocommentaire;
    delete data.phocommentaire;

    ////////////////////// Ajout de l'image///////////////////
    image.mv('./public/image/pilote/' + image.name , function(err) {
     if (err)
       console.log(err);
     });
     image.mv('../public/public/image/pilote/' + image.name , function(err) {
      if (err)
        console.log(err);
     });
  } else {
    if (data.phocommentaire) {

      dataImage.phocommentaire = data.phocommentaire;
      delete data.phocommentaire;
    }
  }

  async.parallel ([
    function(callback) {
      model.modifierPilote(data, dataImage, function (err, result) {
        callback(null, result) });
    }, // modification du pilote
    function(callback) {
      model.getListePilote( function (err, result) {
        callback(null, result) });
    }, //result[1] : listePilote
  ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      response.listePilote = result[1];
      response.est_modifie = true;
      response.render('listerPilote', response);
});
};

module.exports.Supprimer = 	function(request, response){

let data = request.params.num;

async.parallel ([
  function (callback) {

    model.supprimerPi(data, function (err, result) {
      callback(null, result) });

  },
  function (callback) {
    model.getListePilote( function (err, result) {
      callback(null, result) });

  },
],
  function (err, result){
    if (err) {
        // gestion de l'erreur
        console.log(err);
        return;
    }

    response.listePilote = result[1];
    response.est_supprime = true;

    response.render('listerPilote', response);
  }
); //fin async
};
