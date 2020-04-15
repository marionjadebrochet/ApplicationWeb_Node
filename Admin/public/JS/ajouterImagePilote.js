function agrandire() {
  $('#imageAjoutPil').hover(function() {
    $('#imageAjoutPil').animate({'height': '70px'}, 'medium');
  },
  function () {
    $('#imageAjoutPil').animate({'height': '60px'}, 'medium');
  });
}
function inputFile() {
  $('#inputAjoutImgPil').click();
}
function chooseFile() {
  $('#inputAjoutImgPil').click();
  $('#buttonImgPil').remove();
  $('#comImg').append('<label class="auto" for="commentaire">Commentaire photo d\'identité</label><textarea class="auto" name="phocommentaire" rows="2" cols="60" ></textarea>');
}
function changeImage() {
  $('#imageAjoutPil').attr('style','height: 60px;');
  var image = document.getElementById('imageAjoutPil');
  image.src = URL.createObjectURL(event.target.files[0]);
}
$(document).ready(function() {
  agrandire();
});
