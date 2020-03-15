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

   model.getListeEcurie( function (err, result) {
       if (err) {
           // gestion de l'erreur
           console.log(err);
           return;
       }
       response.listeEcurie = result;
       //console.log(result);
       response.render('ajouterEcurie', response);
});
};

module.exports.Modifier = 	function(request, response){

   model.getListeEcurie( function (err, result) {
       if (err) {
           // gestion de l'erreur
           console.log(err);
           return;
       }
       response.listeEcurie = result;
       //console.log(result);
       response.render('modifierEcurie', response);
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
    //console.log(result);

    //Pas besoin t'as pas d'infos utile à mettre sur ta page que renvoie cette requête
    //response.supEcurie = result;

    //Par contre t'as besoin des infos que renvoie getListeEcurie
    response.listeEcurie = result[1];

    // tu verra à quoi ça sert dans la page listerEcurie.handlebars
    response.est_supprime = true;

    //response.render('supprimerEcurie', response);
    //Reviens plutôt sur ta page qui liste les écurie, tu vas donc avoir besoin de getListeEcurie
    response.render('listerEcurie', response);
  }
); //fin async
};
