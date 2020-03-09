let model = require('../models/ecurie.js');

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
