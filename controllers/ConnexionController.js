let model       = require('../models/connexion.js');

//var async = require('async');

   // //////////////////////// METTRE UN TITRE

module.exports.Connexion = function(request, response){
   response.title = 'Connexion';
//
//     model.VerifLogin(function (err, result) {
//         if (err) {
//             // gestion de l'erreur
//             console.log(err);
//             return;
//         }
//         response.listeEcurie = result;
//         //console.log(result);
   response.render('connexion', response);
// });
};

module.exports.VerifConnexion = function(request, response){
   response.title = 'Connexion';
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
        let decryptedString = cryptr.decrypt(result[0].passwd);
        console.log(decryptedString);
        if (result[0].login == login && decryptedString == mdp) {
          response.estConnecter = true;
          request.session.login = login;
        } else {
          response.estConnecter = false;
        }
response.render('connexion', response);
});
};
