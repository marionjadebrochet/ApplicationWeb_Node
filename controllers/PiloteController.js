let model = require('../models/pilote.js');

// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S

module.exports.Pilote = 	function(request, response){

   model.getListePilote( function (err, result) {
       if (err) {
           // gestion de l'erreur
           console.log(err);
           return;
       }
       response.listePilote = result;
       //console.log(result);
       response.render('listerPilote', response);
});
};
