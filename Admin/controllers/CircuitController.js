let model = require('../models/circuit.js');

var async = require('async');

// ///////////////////////// L I S T E   D E S   C I R C U I T S /////////////

module.exports.Circuit = 	function(request, response){
  response.title = 'Circuits';
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

//////////// P A G E   A J O U T E R   C I R C U I T ////////////////

module.exports.Ajouter = 	function(request, response){
response.title = 'Ajouter un circuit';
let data = request.params.num;

async.parallel ([
  function (callback) {
    model.getPays(function (err, result) {
      callback(null, result) });
  }, // result[0] : pays
  function (callback) {
    model.getListeCircuit( function (err, result) {
      callback(null, result) });
  }, // result[0] : liste circuit
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

/////////////// A J O U T E R   C I R C U I T  //////////////////
module.exports.Ajout = 	function(request, response){
  response.title = 'Circuits';
  let data = request.body;
  //////// si pas de données : on supprime /////
  if(data.cirnom == '')
    delete data.cirnom;
  if(data.cirnbspectateurs == '')
    delete data.cirnbspectateurs;
  if(data.cirlongueur == '')
    delete data.cirlongueur;

  let image = request.files.image;
  //////// ajout de l'adresse de l'image dans data //////
  data.ciradresseimage = image.name;

  ////////////////////// Ajout de l'image///////////////////
  image.mv('./public/image/circuit/' + image.name , function(err) {
   if (err)
     console.log(err);
   }); // ajout partie admin
   image.mv('../public/public/image/circuit/' + image.name , function(err) {
    if (err)
      console.log(err);
    }); // ajout partie public

  async.parallel ([
    function (callback) {
      model.ajouterCircuit(data, function (err, result) {
        callback(null, result) });
    }, // ajout du circuit dans la bd
    function(callback) {
      model.getListeCircuit( function (err, result) {
        callback(null, result) });
    }, //result[1] : liste Circuits
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

//////////////// P A G E   M O D I F I E R   C I R C U I T ///////
module.exports.Modifier = function(request, response){
  response.title = 'Modifier circuits';
  let data = request.params.num;

  async.parallel ([
    function(callback) {
      model.getPays(function (err, result) {
        callback(null, result) });
    }, // result[0] : pays
    function(callback) {
      model.getCircuit(data, function (err, result) {
        callback(null, result) });
    }, // result[1] : circuit
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

//////////// M O D I F I E R   C U R C U I T /////////////////
module.exports.Modifie = function(request, response){
  response.title = 'Circuits';
  let data = request.body;
// Si pas de données : on supprime
  if(data.cirnom == '')
    delete data.cirnom;
  if(data.cirnbspectateurs == '')
    delete data.cirnbspectateurs;
  if(data.cirlongueur == '')
    delete data.cirlongueur;

  if(request.files) { //si l'image est changée

    let image = request.files.image;
    //////// ajout de l'adresse de l'image dans data //////
    data.ciradresseimage = image.name;

    ////////////////////// Ajout de l'image///////////////////
    image.mv('./public/image/circuit/' + image.name , function(err) {
     if (err)
       console.log(err);
     }); // ajout partie admin
     image.mv('../public/public/image/circuit/' + image.name , function(err) {
      if (err)
        console.log(err);
      }); // ajout partie public
  } else {
    delete data.ciradresseimage;
  }

  async.parallel ([
    function(callback) {
      model.modifierCircuit(data, function (err, result) {
        callback(null, result) });
    }, // modifier le circuit
    function(callback) {
      model.getListeCircuit( function (err, result) {
        callback(null, result) });
    }, // result[1] : liste circuits
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

//////////// S U P P R I M E R   C I R C U I T /////////////
module.exports.Supprimer = 	function(request, response){
response.title = 'Circuits';
let data = request.params;

async.parallel ([
  function (callback) {
    model.supCir(data, function (err, result) {
      callback(null, result) });
  }, // supprimer circuit
  function (callback) {
    model.getListeCircuit( function (err, result) {
      callback(null, result) });
  }, // result[1] : liste circuits
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

//////////////// S U P P R I M E R   C I R C U I T si pas de grand prix ///////////
module.exports.SupprimerSansGP = 	function(request, response){
response.title = 'Circuits';
let data = request.params.num;

async.parallel ([
  function (callback) {
    model.supCirSansGP(data, function (err, result) {
      callback(null, result) });
  }, // supprimer circuit
  function (callback) {
    model.getListeCircuit( function (err, result) {
      callback(null, result) });
  }, // result[1] : liste circuit
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
