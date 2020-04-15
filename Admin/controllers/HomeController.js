
  // ////////////////////////////////////////////// A C C U E I L
module.exports.Index = function(request, response){
    response.title = "Bienvenue sur l'admin de WROOM (IUT du Limousin).";
    response.render('home', response);
};
module.exports.NotFound = function(request, response){
    response.title = "Bienvenue sur l'admin de WROOM (IUT du Limousin).";
    response.render('notFound', response);
};
