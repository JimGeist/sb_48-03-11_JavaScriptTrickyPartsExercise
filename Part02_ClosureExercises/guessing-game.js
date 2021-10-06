/**
 * guessingGame generates a random number and returns a function that is used to evaluate the 
 *  guess.
 * @returns function that accepts a guess as a parameter and compares the guess with the random
 *  number generated in the guessingGame function. The returned function returns either '## is too high!',
 *  '## is too low!', or 'You win! You found ## in y guesses.'
 */
function guessingGame() {
	const nbrRand = Math.floor(Math.random() * 100);
	let nbrGuesses = 0;
	let gameOver = false;
	// console.log("nbrRand=", nbrRand);

	return guess => {
		if (!(gameOver)) {
			nbrGuesses++;
			if (guess === nbrRand) {
				gameOver = true;
				return `You win! You found ${nbrRand} in ${nbrGuesses} guesses.`;
			} else {
				if (guess > nbrRand) {
					return `${guess} is too high!`;
				} else {
					return `${guess} is too low!`;
				}
			}
		} else {
			return "The game is over, you already won!";
		}

	}

};

module.exports = { guessingGame };
