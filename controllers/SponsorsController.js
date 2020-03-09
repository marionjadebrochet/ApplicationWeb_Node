let model = require('../models/sponsor.js');

// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S

module.exports.Sponsor = 	function(request, response){

   model.getListeSponsor( function (err, result) {
       if (err) {
           // gestion de l'erreur
           console.log(err);
           return;
       }
       response.listeSponsor = result;
       //console.log(result);
       response.render('ListerSponsor', response);
});
};

module.exports.Ajouter = 	function(request, response){

   model.getListeSponsor( function (err, result) {
       if (err) {
           // gestion de l'erreur
           console.log(err);
           return;
       }
       response.listeSponsor = result;
       //console.log(result);
       response.render('AjouterSponsors', response);
});
};

module.exports.Modifier = 	function(request, response){

   model.getListeSponsor( function (err, result) {
       if (err) {
           // gestion de l'erreur
           console.log(err);
           return;
       }
       response.listeSponsor = result;
       //console.log(result);
       response.render('ModifierSponsors', response);
});
};
