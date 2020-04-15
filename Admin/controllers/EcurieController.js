let model = require('../models/ecurie.js');

var async = require('async');

// ///////////////////////// L I S T E   D E S   E C U R I E S ///////////////////////

module.exports.Ecurie = 	function(request, response){
response.title = 'Écuries';
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

////////////// P A G E   A J O U T E R   E C U R I E ///////////////
module.exports.Ajouter = 	function(request, response){
response.title = 'Ajouter un écurie';
let data = request.params.num;

async.parallel ([
  function (callback) {
    model.getPays(function (err, result) {
      callback(null, result) });
  }, // result[0] : pays
  function (callback) {
    model.getListeEcurie( function (err, result) {
      callback(null, result) });
  }, // result[1] : liste écuries
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

/////////////// A J O U T E R   E C U R I E //////////////////
module.exports.Ajout = 	function(request, response){
response.title = 'Écuries';
  let data = request.body;

  /// suppression des données si pas renseignées///
  if(data.ecunom == '')
    delete data.ecunom;
  if(data.ecunomdir == '')
    delete data.ecunomdir;
  if(data.ecuadrsiege == '')
    delete data.ecuadrsiege;
  if(data.ecupoints == '')
    delete data.ecupoints;
  if(data.paynum == '')
    delete data.paynum;

  let image = request.files.image;
  //////// ajout de l'adresse de l'image dans data //////
  data.ecuadresseimage = image.name;

  ////////////////////// Ajout de l'image///////////////////
  image.mv('./public/image/ecurie/' + image.name , function(err) {
   if (err)
     console.log(err);
   }); // ajout partie admin
   image.mv('../public/public/image/ecurie/' + image.name , function(err) {
    if (err)
      console.log(err);
   }); // ajout partie public

  async.parallel ([
    function (callback) {
      model.ajouterEcurie(data, function (err, result) {
        callback(null, result) });
    }, // ajout de l'écurie dans la bd
    function(callback) {
      model.getListeEcurie( function (err, result) {
        callback(null, result) });
    }, //result[1] : liste ecurie
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

//////////////// P A G E   M O D I F I E R   E C U R I E ////////////////
module.exports.Modifier = function(request, response){
  response.title = 'Modifier écurie';
  let data = request.params.num;

  async.parallel ([
    function (callback) {
      model.getPays( function (err, result) {
        callback(null, result) });
    }, //result[0] : pays
    function(callback) {
      model.getEcurie(data, function (err, result) {
        callback(null, result) });
    }, //result[2] : ecurie
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

////////////////// M O D I F I E R   E C U R I E ////////////////
module.exports.Modifie = function(request, response){
  response.title = 'Écuries';
  let data = request.body;

/// suppression des données si pas renseignées///
  if(data.ecunom == '')
    delete data.ecunom;
  if(data.ecunomdir == '')
    delete data.ecunomdir;
  if(data.ecuadrsiege == '')
    delete data.ecuadrsiege;
  if(data.ecupoints == '')
    delete data.ecupoints;
  if(data.paynum == '')
    delete data.paynum;

  if(request.files) { //si l'image est changée
    let image = request.files.image;
    //////// ajout de l'adresse de l'image dans data //////
    data.ecuadresseimage = image.name;

    ////////////////////// Ajout de l'image///////////////////
    image.mv('./public/image/ecurie/' + image.name , function(err) {
     if (err)
       console.log(err);
     }); // ajout partie admin
     image.mv('../public/public/image/ecurie/' + image.name , function(err) {
      if (err)
        console.log(err);
      }); // ajout partie public
  } else {
    delete data.ecuadresseimage;
  }

  async.parallel ([
    function(callback) {
      model.modifierEcurie(data, function (err, result) {
        callback(null, result) });
    }, // modification de l'écurie
    function(callback) {
      model.getListeEcurie( function (err, result) {
        callback(null, result) });
    }, //result[1] : liste ecuries
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

//////////////// S U P P R I M E R   E C U R I E ////////////
module.exports.Supprimer = 	function(request, response){
  response.title = 'Écuries';
let data = request.params.num;

async.parallel ([
  function (callback) {
    model.supEcu(data, function (err, result) {
      callback(null, result) });
  }, // result[0] : supprimer écurie
  function (callback) {
    model.getListeEcurie( function (err, result) {
      callback(null, result) });
  }, // result[1] : liste écurie
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
