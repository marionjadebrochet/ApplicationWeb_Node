function chooseFile() {
  $('#inputAjoutImgEcu').click();
  $('#buttonImgEcu').remove();
}
function inputFile() {
  $('#inputAjoutImgEcu').click();
}
function agrandire() {
  $('#imageAjoutEcu').hover(function() {
    $('#imageAjoutEcu').animate({'height': '70px'}, 'medium');
  },
  function () {
    $('#imageAjoutEcu').animate({'height': '60px'}, 'medium');
  });
}
function changeImage() {
  $('.err').remove();
  $('#imageAjoutEcu').attr('style','height: 60px;');
  var image = document.getElementById('imageAjoutEcu');
   image.src = URL.createObjectURL(event.target.files[0]);
}
function verif() {
  //affiche un message d'erreur si pas de photo ajoutée
  if($('#buttonImgEcu')) {
    $('#divImageEcu').append('<p class="err">Vous devez ajouter une image</p>');
  }
}
$(document).ready(function() {
  agrandire();
});
