let model       = require('../models/connexion.js');

// ///////////////////// C O N N E X I O N ///////////////

module.exports.Connexion = function(request, response){
   response.title = 'Connexion';
   response.render('connexion', response);
};

/////////////////// V E R I F I E R   L O G I N //////////////////
module.exports.VerifConnexion = function(request, response){
   response.title = 'Bienvenue sur l\'admin de WROOM (IUT du Limousin).';
   let login = request.body.login,
      mdp = request.body.mdp;

    model.verifLogin(login, function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        } // récupération du mdp en fonction du pseudo

        //// Initialisation de module de chiffrage/déchiffrage ////
        var Cryptr = require('cryptr');
        let cryptr = new Cryptr('MaSuperCléDeChiffrementDeouF');
        // S'il y a plusieurs login pareils ça va tester pour tous, si le mot de passe correspond
        result.forEach( function(log, index) {
          let decryptedString = cryptr.decrypt(log.passwd); // déchiffrage du mdp

          if (log.login == login && decryptedString == mdp) { // si mdp bon
            request.session.login = login;
            console.log('Connection autorisée pour ' + login);
          } else { // si mdp incorrecte
            console.log('Connection refusée ...')
            response.err = login; // pour pré-remplir le login dans le formulaire
          }
        });
response.render('home', response);
});

};
////////////////// D E C O N N E X I O N /////////////////
module.exports.deconnexion = function(request, response){
   response.title = 'Bienvenue sur l\'admin de WROOM (IUT du Limousin).';
   var login = request.session.login;
   // destruction de la varible de session
   request.session.destroy(function(err) {
    if (err) {
      console.log(err);
      return;
    }
  });
  console.log(login + " c'est déconnecté");
  response.render('deconnexion', response);
};
