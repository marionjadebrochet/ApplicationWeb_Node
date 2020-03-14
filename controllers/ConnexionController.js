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

        result.forEach( function(log, index) {
          let decryptedString = cryptr.decrypt(log.passwd);

          if (log.login == login && decryptedString == mdp)
            request.session.login = login;
        });
response.render('home', response);
});

};

module.exports.deconnexion = function(request, response){
   response.title = 'connexion';
   // destruction de la varible de session
   request.session.destroy(function(err) {
    if (err) {
      console.log(err);
      return;
    }
  });
  response.render('connexion', response);
};
