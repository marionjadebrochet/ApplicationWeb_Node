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
   let login = request.body.mdp,
      mdp = request.body.login;
 //// Gestion du mot de passe ////


    model.verifLogin(login, mdp, function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.estConnecter = result;
        //console.log(result);
response.render('connexion', response);
});
};
