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
  $('#imageAjoutEcu').attr('style','height: 60px;');
  var image = document.getElementById('imageAjoutEcu');
   image.src = URL.createObjectURL(event.target.files[0]);
}
$(document).ready(function() {
  agrandire();
});
