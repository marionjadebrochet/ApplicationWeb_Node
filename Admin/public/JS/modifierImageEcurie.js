function inputFile() {
  $('#inputModifImgEcu').click();
}
function agrandire() {
  $('#imageModifEcu').hover(function() {
    $('#imageModifEcu').animate({'height': '70px'}, 'medium');
  },
  function () {
    $('#imageModifEcu').animate({'height': '60px'}, 'medium');
  });
}
function changeImage() {
  var image = document.getElementById('imageModifEcu');
   image.src = URL.createObjectURL(event.target.files[0]);
}
$(document).ready(function() {
  agrandire();
});
