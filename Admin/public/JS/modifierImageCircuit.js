function inputFile() {
  $('#inputModifImgCir').click();
}
function agrandire() {
  $('#imageModifCircuit').hover(function() {
    $('#imageModifCircuit').animate({'height': '70px'}, 'medium');
  },
  function () {
    $('#imageModifCircuit').animate({'height': '60px'}, 'medium');
  });
}
function changeImage() {
  var image = document.getElementById('imageModifCircuit');
   image.src = URL.createObjectURL(event.target.files[0]);
}
$(document).ready(function() {
  agrandire();
});
