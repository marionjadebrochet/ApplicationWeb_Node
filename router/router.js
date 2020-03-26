
let HomeController = require('./../controllers/HomeController');
let ResultatController = require('./../controllers/ResultatController');
let EcurieController = require('./../controllers/EcurieController');
let PiloteController = require('./../controllers/PiloteController');
let CircuitController = require('./../controllers/CircuitController');
let SponsorsController = require('./../controllers/SponsorsController');
let ConnexionController = require('./../controllers/ConnexionController');

// Routes
module.exports = function(app){

// Main Routes
    app.get('/', HomeController.Index);
    app.get('/accueil', HomeController.Index);

// connexion
    //app.get('/connexion', ConnexionController.Connexion);
    app.post('/accueil', ConnexionController.VerifConnexion);
    app.get('/deconnexion', ConnexionController.deconnexion);

// pilotes
    app.get('/listerPilote', PiloteController.Pilote);
    app.get('/ajouterPilote', PiloteController.Ajouter);
    app.get('/modifierPilote/:num', PiloteController.Modifier);
    app.post('/listerPilote', PiloteController.Ajout);
    app.post('/piloteModifie', PiloteController.Modifie);
    app.get('/supprimerPilote/:num', PiloteController.Supprimer);


 // circuits
   app.get('/listerCircuits', CircuitController.Circuit);
   app.get('/ajouterCircuit', CircuitController.Ajouter);
   app.get('/modifierCircuit', CircuitController.Modifier);
   app.get('/supprimerCircuit/:num/:gp', CircuitController.Supprimer);
   app.get('/supprimerCircuit/:num', CircuitController.SupprimerSansGP);


// Ecuries
   app.get('/listerEcurie', EcurieController.Ecurie);
   app.get('/ajouterEcurie', EcurieController.Ajouter);
   app.get('/modifierEcurie', EcurieController.Modifier);
   app.get('/supprimerEcurie/:num', EcurieController.Supprimer);

 //Résultats
   app.get('/listerResultats', ResultatController.Desc);
   app.get('/detailsResultats/:num', ResultatController.Resultat);
//Sponsors
   app.get('/listerSponsors', SponsorsController.Sponsor);
   app.get('/ajouterSponsors', SponsorsController.Ajouter);
   app.post('/listerSponsors', SponsorsController.Ajout);
   app.get('/modifierSponsors/:num', SponsorsController.Modifier);
   app.post('/sponsorModifie', SponsorsController.Modifie);
   app.get('/supprimerSponsor/:num', SponsorsController.Supprimer);


// tout le reste
app.get('*', HomeController.NotFound);
app.post('*', HomeController.NotFound);

};
