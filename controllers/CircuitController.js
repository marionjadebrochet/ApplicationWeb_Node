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
       response.listeCircuit = result;
       //console.log(result);
       response.render('ajouterCircuit', response);
});
};

module.exports.Modifier = 	function(request, response){

   model.getListeCircuit( function (err, result) {
       if (err) {
           // gestion de l'erreur
           console.log(err);
           return;
       }
       response.listeCircuit = result;
       //console.log(result);
       response.render('modifierCircuit', response);
});
};
