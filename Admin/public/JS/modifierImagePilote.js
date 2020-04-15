function inputFile() {
  $('#inputModifImgPil').click();
}
function chooseFile() {
  $('#inputModifImgPil').click();
  $('#buttonImgPil').remove();
  $('#comImgModif').append('<label class="auto" for="commentaire">Commentaire photo d\'identité</label><textarea class="auto" name="phocommentaire" rows="2" cols="60" ></textarea>');
}
function agrandire() {
  $('#imageModifPil').hover(function() {
    $('#imageModifPil').animate({'height': '70px'}, 'medium');
  },
  function () {
    $('#imageModifPil').animate({'height': '60px'}, 'medium');
  });
}
function changeImage() {
  $('#imageModifPil').attr('style','height: 60px;');
  var image = document.getElementById('imageModifPil');
   image.src = URL.createObjectURL(event.target.files[0]);
}
$(document).ready(function() {
  agrandire();
});
