/*
 * Word Guessing Game - Template
 *
 */
'use strict';
//Define a container for the game, its variables and its methods.
var game = {
    state: 0,       // current position in the wordlist
    display: '',   // the current dash display
    wrong: '',     // the wrong letters guessed so far 
    answer: '',    // the correct answer for this round
    wrongCount: 0, // the number of wrong guesses so far
	playing: true,
    wordList: [    // list of words to cycle through
        'JavaScript',
        'document',
        'element',
        'object',
        'property',
        'event',
        'propagation',
        'listener',
        'transition',
        'animation'
    ]
};

game.check = function () {
    /*
     * Checks all occurrences of the letter guessed against the answer. 
     * Returns true if the guess is correct and false otherwise. 
     * Updates the game dash display variable if applicable.
     */
    // You may use snippets of code from questions 11 and 12 in assignment 1 here.
	var guessedCorrectly = false;
	var guess = document.getElementById('guess').value;
	if (guess === '')
		return true;
	for (var i = 0; i < game.answer.length; i++) {
		if (guess === game.answer[i]) {
			guessedCorrectly = true;
			game.display = game.display.substring(0, i) + guess + game.display.substring(i + 1);
		}
	}
	return guessedCorrectly;

}

game.restart = function () {
    // Initialize the game at the beginning or after restart
    // Enter your code here
	game.playing = true;
    game.state++;
	if (game.state >= game.wordList.length)
		game.state = 0;
		
	game.answer = game.wordList[game.state];
	game.wrong = '';
	game.wrongCount = 0;
	game.display = game.dashes(game.answer.length);
	document.getElementById('indicator').value = game.wrongCount;
	document.getElementById('display').textContent = game.display;
	document.getElementById('wrong').textContent = game.wrong;
    // The focus method invoked on an input allows the user to type in that input without having to click it.
	//$('#guessbutton').click(game.play);
	document.getElementById('guess').value = '';
    $('#guess').focus();
	
};

game.dashes = function (number) {
    // you may use your function definition from question 4 in assignment 2 here.
	var result = "";

	  for (var i = 0; i < number; i++)

	    result += "-";

	return result;
}

game.play = function () {
    // Invoked when the user clicks on GUESS
	if (game.playing) {
		var check = game.check();
		if (!check) {
			game.wrong += document.getElementById('guess').value;
			game.wrongCount++;
			document.getElementById('wrong').textContent = game.wrong;
			document.getElementById('indicator').value = game.wrongCount;
		}
		document.getElementById('display').textContent = game.display;
		document.getElementById('guess').value = '';
		$('#guess').focus();
		game.outcome();
	}
};

game.outcome = function () {
    // check if the game is won or lost
	if (game.wrongCount >= 10) {
		document.getElementById('wrong').textContent = 'No more guesses left - The answer was ' + game.answer;
		$('#guessbutton').click(function(){});
		game.playing = false;
	}
	else if (document.getElementById('display').textContent === game.answer){
		document.getElementById('wrong').textContent = 'You guessed the word!';
		game.playing = false;
	}
};

// Main program starts here
$(document).ready(function () {
    game.restart();
    $('#guessbutton').click(game.play);
    $('#restart').click(game.restart);
});