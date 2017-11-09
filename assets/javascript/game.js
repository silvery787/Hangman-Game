    const MAX_GUESSES = 12;
    const MAX_GAMES = 3;

    var score = 0;
    var nGame = 1;

    var guesses = MAX_GUESSES;

    var correct_letters = [];
    var wrong_letters = [];
    var curr_word = "";
    //var curr_image = "";
    //var curr_audio = "";

    var quiz = {
      q1 : ["sabrina", "img", "audio"],
      q2 : ["madonna", "img", "audio"],
      q3 : ["sandra", "img", "audio"],
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

    // function drawText(text){
    //   $("#"+text).text(text);
    // }
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