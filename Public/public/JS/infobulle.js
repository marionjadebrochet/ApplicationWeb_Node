this.zoom_image = function(){
  xOffset = 10;
  yOffset = 30;
  var texte;
  $(".infobulle").hover(
    function(e){
      var pilnum = $(this).attr('value');
      var idPhoto = "#phoadresseZoom" + pilnum;
      var idTexte = "#piltexteZoom" + pilnum;
      var legende = "<h2>"+$(this).text()+ "</h2>" + "<br/>" + $(idTexte).text().substr(0,100) + " ...";

      $("#contenu").append("<div id='zoom'><img src='/image/pilote/"+ $(idPhoto).text() +"' alt='"+$(this).text()+"' /> <div class='textInfobulle'>" + legende+"</div></div>");
      $("#zoom")
      .css("top",(e.pageY - xOffset) + "px")
      .css("left",(e.pageX + yOffset) + "px")
      .css("display","flex")
      .css("flex-direction","row")
      .fadeIn("slow");
    },
    function(){
      $("#zoom").remove();
    }
  );

  $("a.infobulle").mousemove(function(e){
    $("#zoom")
    .css("top",(e.pageY - xOffset) + "px")
    .css("left",(e.pageX + yOffset) + "px");
  });
};

$(document).ready(function(){
  zoom_image();
});
