let model       = require('../models/connexion.js');

//var async = require('async');

   // //////////////////////// METTRE UN TITRE

module.exports.Connexion = function(request, response){
   response.title = 'Connexion';
   response.render('connexion', response);
};

module.exports.VerifConnexion = function(request, response){
   response.title = 'Bienvenue sur le site de WROOM (IUT du Limousin).';
   let login = request.body.login,
      mdp = request.body.mdp;

    model.verifLogin(login, function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        //// dechiffrage du mot de passe récupéré dans la bd ////
        var Cryptr = require('cryptr');
        let cryptr = new Cryptr('MaSuperCléDeChiffrementDeouF'); //clé de chiffrement ne surtout pas modifier

        // S'il y a plusieurs login pareils ça va tester pour tous, si le mot de passe correspond
        result.forEach( function(log, index) {
          let decryptedString = cryptr.decrypt(log.passwd);

          if (log.login == login && decryptedString == mdp) {
            request.session.login = login;
            console.log('Connection autorisée pour ' + login);
          } else {
            console.log('Connection refusée ...')
          }
        });
response.render('home', response);
});

};

module.exports.deconnexion = function(request, response){
   response.title = 'connexion';
   var login = request.session.login;
   // destruction de la varible de session
   request.session.destroy(function(err) {
    if (err) {
      console.log(err);
      return;
    }
  });
  console.log(login + " c'est déconnecté");
  response.render('home', response);
};
