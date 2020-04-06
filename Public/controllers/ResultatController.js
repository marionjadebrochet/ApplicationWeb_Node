let model = require('../models/resultat.js');

  // //////////////////////////L I S T E R    R E S U L T A T S
module.exports.ListerResultat = function(request, response){
	response.title = 'Liste des résulats des grands prix';
	model.getListeRes( function (err, result) {
			if (err) {
					// gestion de l'erreur
					console.log(err);
					return;
			}
			response.listeGrandPrix = result;
			//console.log(result);
	response.render('listerResultat', response);
});
}

// ////////////////////// D E T A I l    N O M    P R E N O M    T E M P S

// module.exports.DescResultat = 	function(request, response){
// let data = request.params.nom;
// async.parallel ([
//   function (callback) {
//     model.getListeRes( function (err, result) {
//       callback(null, result) });
//   },
//   function(callback) {
//     model.getPiloteTemps(data, function (err, result) {
//       callback(null, result) });
//   },
// ],
//   function (err, result){
//     if (err) {
//         // gestion de l'erreur
//         console.log(err);
//         return;
//     }
//     console.log(result);
//     response.listeGrandPrix = result[0];
//     response.piloteEtTemps = result[1];
//     response.render('detailsResultat', response);
//   }
// ); //fin async
// };
//
//
// // ////////////////////// A J O U T    P L A C E
//
// module.exports.DescResultat = 	function(request, response){
// let data = request.params.nom;
// async.parallel ([
//   function (callback) {
//     model.getListeRes( function (err, result) {
//       callback(null, result) });
//   },
//   function(callback) {
//     model.getPiloteTemps(data, function (err, result) {
//       callback(null, result) });
//   },
// 	function(callback) {
// 		model.getPlacePilote(data, function (err, result) {
// 			callback(null, result) });
// 	},
// ],
//   function (err, result){
//     if (err) {
//         // gestion de l'erreur
//         console.log(err);
//         return;
//     }
//     console.log(result);
//     response.listeGrandPrix = result[0];
//     response.piloteEtTemps = result[1];
// 		response.placeEtPoint = result[2];
//     response.render('detailsResultat', response);
//   }
// ); //fin async
// };
//
//
// // ////////////////////// A J O U T    P L A C E    E T    D E T A I L
//
// module.exports.DescResultat = 	function(request, response){
// let data = request.params.num;
// async.parallel ([
//   function (callback) {
//     model.getListeRes( function (err, result) {
//       callback(null, result) });
//   },
//   function(callback) {
//     model.getPiloteTemps(data, function (err, result) {
//       callback(null, result) });
//   },
// 	function(callback) {
// 		model.getPlacePilote(data, function (err, result) {
// 			callback(null, result) });
// 	},
// 	function(callback) {
// 		model.getDescriptionGP(data, function (err, result) {
// 			callback(null, result) });
// 	},
// ],
//   function (err, result){
//     if (err) {
//         // gestion de l'erreur
//         console.log(err);
//         return;
//     }
//     console.log(result);
//     response.listeGrandPrix = result[0];
//     response.piloteEtTemps = result[1];
// 		response.placeEtPoint = result[2];
// 		response.details = result[3];
//     response.render('detailsResultat', response);
//   }
// ); //fin async
// };

module.exports.DescResultat = 	function(request, response){
response.title = 'Liste des résulats des grands prix';
let data = request.params.num;

async.parallel ([
	function(callback) {
    model.getPiloteTemps(data, function (err, result) {
      callback(null, result) });
  },
  function (callback) {
    model.getListeRes( function (err, result) {
      callback(null, result) });
  },
],
  function (err, result){
    if (err) {
        // gestion de l'erreur
        console.log(err);
        return;
    }

    response.piloteEtTemps = result[0]
		response.date = result[0][0].gpdate;
		response.gpnom = result[0][0].gpnom;
		response.detail = result[0][0].gpcommentaire;
		response.listeGrandPrix = result[1];
		;
    response.render('detailsResultat', response);
  }
); //fin async
};
