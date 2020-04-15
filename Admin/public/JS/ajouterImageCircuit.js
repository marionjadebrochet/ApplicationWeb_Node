function chooseFile() {
  $('#inputAjoutImgCir').click();
  // clique sur l'input
  $('#buttonImgCircuit').remove();
  // supprime le boutton, il y aura l'image à la place
}
function inputFile() {
  $('#inputAjoutImgCir').click();
  // clique qur l'input
}
// change la taille de l'image quand on passe dessus
function agrandire() {
  $('#imageAjoutCircuit').hover(function() {
    $('#imageAjoutCircuit').animate({'height': '70px'}, 'medium');
  },
  function () {
    $('#imageAjoutCircuit').animate({'height': '60px'}, 'medium');
  });
}
// remplace le boutton/image quand on choisi une nouvelle image
function changeImage() {
  $('.err').remove();
  $('#imageAjoutCircuit').attr('style','height: 60px;');
  var image = document.getElementById('imageAjoutCircuit');
   image.src = URL.createObjectURL(event.target.files[0]);
}
function verif() {
  //affiche un message d'erreur si pas de photo ajoutée
  if($('#buttonImgCircuit')) {
    $('#divImageCircuit').append('<p class="err">Vous devez ajouter une image</p>');
  }
}
$(document).ready(function() {
  agrandire();
});
