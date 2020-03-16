let model = require('../models/circuit.js');

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
       response.render('listerCircuit', response);
});
};

module.exports.Ajouter = 	function(request, response){

   model.getListeCircuit( function (err, result) {
       if (err) {
           // gestion de l'erreur
           console.log(err);
           return;
       }
       response.listeSponsor = result;
       //console.log(result);
       response.render('AjouterCircuit', response);
});
};

module.exports.Modifier = 	function(request, response){

   model.getListeCircuit( function (err, result) {
       if (err) {
           // gestion de l'erreur
           console.log(err);
           return;
       }
       response.listeSponsor = result;
       //console.log(result);
       response.render('ModifierCircuit', response);
});
};

module.exports.Supprimer = 	function(request, response){

let data = request.params.num;

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

    response.render('listerCircuit', response);
  }
); //fin async
};
