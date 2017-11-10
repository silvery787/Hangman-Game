const MAX_GUESSES = 12;
const MAX_GAMES = 9;

var score = 0;
var nGame = 1;

var guesses = MAX_GUESSES;

var correct_letters = [];
var wrong_letters = [];
var curr_word = "";
//var curr_image = "";
//var curr_audio = "";

var quiz = {
  q1 : ["frodo", "Frodo Baggins", "Frodo.jpg", "audio"],
  q2 : ["gandalf", "Gandalf the White (Grey)", "Gandalf.jpg", "uyB6yMnh0Ic"],
  q3 : ["legolas", "Legolas", "Legolas.jpg", "audio"],
  q4 : ["aragorn", "Aragorn the Strider", "Aragorn.jpg", "audio"],
  q5 : ["gimli", "Gimli", "Gimli.jpeg", "audio"],
  q6 : ["boromir","Boromir", "Boromir.jpg", "audio"],
  q7 : ["meriadoc", "Meriadoc 'Merry' Brandybuck", "Merry.jpg", "audio"],
  q8 : ["samwise", "Samwise 'Sam' Gamgee", "Sam.jpg", "audio"],
  q9 : ["peregrin", "Peregrin 'Pippin' Took", "Pippin.jpg", "audio"]
};

//------------------

function drawPattern(word, letter_arr){
  var text = "";
  var dashes = 0;
  for(var i=0; i < word.length; i++){
    if( letter_arr.indexOf(word[i]) >= 0 ){
      text = text + word[i].toUpperCase();
    } 
    else{
      text = text + " _ ";
      dashes++;
    }
  }
  $("#curr_pattern").text(text);

  if(dashes==0) return true;
  else return false;
}

function drawTriedLetters(letters){
  $("#tried_letters").text( letters.join(", ").toUpperCase() );
}

function drawScore(score){
  $("#score").text(score);
}
function drawGuesses(num){
  $("#guesses").text(num);
}

function drawAnswer(text, image){
  $("#answer").text(text);
  $("#game_picture").attr("src", "assets/images/"+image);
}
//-----------------------

function isInWord(word, letter){
  for(var i=0; i<word.length; i++){
    if( word[i] === letter ) return true;
  }
  return false;
}

function isNew(letter, wrong_arr, correct_arr){

  for(var i=0; i<wrong_arr.length; i++){
    if(wrong_arr[i] === letter) return false;
  }
  for(var i=0; i<correct_arr.length; i++){
    if(correct_arr[i] === letter) return false;
  }
  return true;
}

function isLetter(k_code){
  return ( (k_code > 64 && k_code <91) || (k_code >96 && k_code < 122) );
}

function newGame(n){

  correct_letters = [];
  wrong_letters = [];
  guesses = MAX_GUESSES;

  curr_word = quiz["q"+n][0];
  //curr_image = quiz["q"+n][1];
  //curr_audio = quiz["q"+n][2];

  drawPattern(curr_word, correct_letters);
  drawTriedLetters(wrong_letters);
  drawGuesses(guesses);

}

function finishGame(n){
  var game_title = curr_word = quiz["q"+n][1];
  var game_image = curr_word = quiz["q"+n][2];
  drawAnswer(game_title, game_image);
}

function playSound(type){
  var audio = $("<audio>");
  
  $("#audio_div").find("audio").remove();
  $("#audio_div").append(audio);

  var audio_src = "assets/audio/";

  switch(type){
    case "win" : 
      audio.attr("src", audio_src+"cheer.wav");
      audio.attr("id", "win_sound");
      break;
    case "loose" : 
      audio.attr("src", audio_src+"loose.wav");
      audio.attr("id", "loose_sound"); 
      break;
  }
  audio.attr("autoplay","true");

}
//-------------------

$(document).ready(function() {

  newGame(nGame);

  $(document).on("keyup", function(event) {

    var new_letter = (event.key).toLowerCase();

    if( isLetter(event.keyCode) && isNew(new_letter, wrong_letters, correct_letters) ){

      if( isInWord(curr_word, new_letter) ){

        correct_letters.push(new_letter);

        var completed = drawPattern(curr_word, correct_letters); 
        if( completed ) {
          drawScore(++score);
          playSound("win");
          finishGame(nGame);
          nGame++;
          if( nGame <= MAX_GAMES ){
            newGame(nGame);
          }
          else{
            $(document).off("keyup");
            $("#finish").text("GAME OVER");
          }
        }
      }
      else {
        
        wrong_letters.push(new_letter);

        drawTriedLetters(wrong_letters);            
        drawGuesses(--guesses);
        
        if( guesses <= 0 ){
          playSound("loose");
          finishGame(nGame);
          nGame++;
          if( nGame <= MAX_GAMES ){
            newGame(nGame);
          }
          else{
            $(document).off("keyup");
            $("#finish").text("GAME OVER");
          }
        }
      } 
    }
  });

});

//document.getElementById('yourAudioTag').play();