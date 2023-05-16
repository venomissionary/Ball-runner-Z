let config = {
    type: Phaser.CANVAS,
    width: 840,
    height: 580,
    physics: {
      default: 'arcade', 
      arcade: {
        gravity: {y: 200},
        debug: false
      },
    },
    scene: [mainMenu, Credits, Tutorial, Play]

  }
  let game = new Phaser.Game(config);


  /* For this game, i wanted to make a straightfoward endless runner. The ball is the player for this game.
 the directions are to make sure you last long enough against the super deadly walls that come in your way 
 You are shown a score bar on the top of the screen as your high score, and also would mesure how long you have lasted
 in the session.

 okay, so what impletmented in the game was to increase the rate of time that the game is running, at every 30 seconds the 
 speed of the game increases and the player must use their drop down ability and jump of course to get over each wall. 
 Also, the walls do come in random at different points and come in different sizes which is the randomness here at certain timings.
 Three sound effects for death, jumping and clicking the menu buttons. 
 I used multiple scene classes for the Tutorial, Credits, and the play button but however the death menu comes in with the play
 scene instead in the death function so the player doesn't have to reload the main menu and back to play. 
Controls are demonstrated in the tutorial menu with the approprite keys for the game. 
Background and floor are featured in the game as moving tilesprites. 
collison was made in the play scene as well. Use the debug tool blow the create method to view the collisions if nneeded.
also used the Arcade Physics above.
Music is added to the play scene too.
the challenge is that the game speeds up and the player can look at their score in the death menu and try to beat it for 
accomplisment. 
the game is endless till you hit the walls. 
credits are located in the main menu. 

- the art part was something i wish i spent more time on but i'd rather have it work than 
look good. I used procreate/gimp to edit both tilesprites and draw the ball and boxes. 

things i couldnt add. 

- no animated sprites in the game. loss track of time . 
 
 
 */
