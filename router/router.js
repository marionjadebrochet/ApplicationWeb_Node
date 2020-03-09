
let HomeController = require('./../controllers/HomeController');
let ResultatController = require('./../controllers/ResultatController');
let EcurieController = require('./../controllers/EcurieController');
let PiloteController = require('./../controllers/PiloteController');
let CircuitController = require('./../controllers/CircuitController');
let SponsorsController = require('./../controllers/SponsorsController');

// Routes
module.exports = function(app){

// Main Routes
    app.get('/', HomeController.Index);
    app.get('/accueil', HomeController.Index);

// connexion
    app.get('/connexion', ConnexionController.Connexion);
    app.get('/seConnecter', ConnexionController.VerifConnexion);

// pilotes
    app.get('/listerPilote', PiloteController.Pilote);

 // circuits
   app.get('/listerCircuits', CircuitController.Circuit);

// Ecuries
   app.get('/listerEcurie', EcurieController.Ecurie);

 //Résultats
   app.get('/listerResultats', ResultatController.DescResultat);

//Sponsors
   app.get('/sponsors', SponsorsController.Sponsor);

// tout le reste
app.get('*', HomeController.NotFound);
app.post('*', HomeController.NotFound);

};
