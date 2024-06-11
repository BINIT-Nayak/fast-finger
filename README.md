# Fast Fingers 
A simple typing game app built with React. The app allows users to practice typing and see their words per minute score.

Features
Displays a random word for the user to type
Stores high scores locally using local storage
Clean and simple UI with color change on word match
Built With
React - Front-end framework
CSS - Styling
Reat Vite - Boilerplate/tooling
Usage
To run the app locally:

## MVP Requirement

1. Ask player to enter his/her name before starting the game.

   - Do not ask player to enter his/her name again if he plays the game again in the same session.
   - Show proper error message if player doesn't enter his/her name and clicks on `START GAME`.

2. Set Default difficulty level to `EASY`. User should be able to change the difficulty level using dropdown.
3. Start the game on `START GAME` button click.

4. Show random word from dictionary and an input box on game screen.

- For `EASY` difficulty level, word length should be less than or equal to 4.
- For `MEDIUM` difficulty level, word length should be between 5-8(noth numbers included).
- For `HARD` difficulty level, word length should be greater than 8.

5. As soon as the typed word matches the word shown on screen, it should we considered submitted (pressing "ENTER" button shall not be required to submit a word). Empty the input box after a successful attempt.

6. A timer shall be shown on the screen for every word and the maximum time that an user is allowed to type a word will depend on the difficulty factor. Refer to the formula provided below to calculate the maximum time allowed :

Timer value = (Number of letters in the word) / (Difficulty factor)

Round the timer value to nearest integer bigger than the value.

Initially the difficulty factor would be 1 and it will keep increasing as the player progresses in the game and the timer value is guaranteed to be greater than or equal to 2 seconds that means a player must get at least 2 seconds to type a word. So whenever the calculated value is found to be less than 2 seconds, it should be rounded off to 2 seconds always.

7. There are three levels in game: EASY, MEDIUM and HARD

Difficulty factor for easy level: 1

Difficulty factor for medium level: 1.5

Difficulty factor for hard level: 2

8. Increase difficulty factor by 0.01 after every successful word attempt.

9. Change the game level if difficulty factor crosses particular levels difficulty factor.

10. Player should be able to stop the game by clicking on `STOP GAME` button
11. **Game score for the player is the total time player was able to remain in the game before game gets over either because his/her time runs out for a particular word or player Stops the game**.
12. Show previous games score for player in a sidebar

13. Show best score for player
14. Application UI should closely match with the provided UI design mocks.

npm install
Installs required dependencies

npm start
Runs the app in development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.

Customizing Words
The app fetches random words from the given json dataset

Deployment:
You can access my website here: https://binit-nayak.netlify.app/
