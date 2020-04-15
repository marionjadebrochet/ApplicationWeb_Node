let model = require('../models/pilote.js'),
    modelEcurie = require('../models/ecurie.js');

var async = require('async');

// ///////////////////// R E P E R T O I R E    D E S    P I L O T E S //////

module.exports.Pilote = 	function(request, response){
  response.title = 'Pilotes';
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

////////////////// P A G E   A J O U T E R   P I L O T E ////////////////////
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

/////////////// A J O U T   D U   P I L O T E ///////////////////
module.exports.Ajout = 	function(request, response){
  response.title = 'Pilotes';
  let data = request.body;
  let dataImage = {};
  // supression des données si pas renseigner
  // pour qu'elles soient mises à null dans la bd
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
    if(request.files) { // si photo ajoutée
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
       }); // ajout partie admin
       image.mv('../public/public/image/pilote/' + image.name , function(err) {
        if (err)
          console.log(err);
       }); // ajout partie public
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

/////////////// P A G E   M O D I F I E R   P I L O T E  //////////////
module.exports.Modifier = function(request, response){
  response.title = 'Modifier un pilote';
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

//////////////// M O D I F I E R   P I L O T E //////////////
module.exports.Modifie = function(request, response){
  response.title = 'Pilotes';
  let data = request.body;
  let dataImage = {};

// suppression des données si pas renseignées
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
  if(request.files) { // si nouvelle photo

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
     }); // ajout partie admin
     image.mv('../public/public/image/pilote/' + image.name , function(err) {
      if (err)
        console.log(err);
     }); // ajout partie public
  } else {
    if (data.phocommentaire) {
      // si uniquement commentaire modifié
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

/////////////////// S U P P R E S S I O N   D U   P I L O T E ////////////////
module.exports.Supprimer = 	function(request, response){
response.title = 'Pilotes';
let data = request.params.num;

async.parallel ([
  function (callback) {
    model.supprimerPi(data, function (err, result) {
      callback(null, result) });
  }, // suppression du pilote
  function (callback) {
    model.getListePilote( function (err, result) {
      callback(null, result) });
  }, // result[1] : liste pilote
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
