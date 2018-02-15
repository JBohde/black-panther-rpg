$(document).ready(function() {
	// Creates variables for the character divs
	var blackPanther = $("#blackPanther");
	var nakia = $("#nakia");
	var shuri = $("#shuri");
	var killmonger = $("#killmonger");
	var character;
	var characterPicked;
	var enemy;
	var enemyPicked;
	// Creates variables for selectors for each player's health
	var pantherHealth = $("#pantherHealth");
	var nakiaHealth = $("#nakiaHealth");
	var shuriHealth = $("#shuriHealth");
	var killmongerHealth = $("#killmongerHealth");
	var characterHealth;
	var enemyHealth;
	// Creates variables to set value to player's health
	var playerHealthNumber;
	var characterHealthNumber;
	var enemyHealthNumber;
	var characterAttack;
	var enemyAttack;
	// Creates variables for game play.
	var isCharacterPicked = false;
	var characterPicked;
	var isEnemyPicked = false;
	var enemyPicked;
	var enemiesRemaining = 3;
	// Gameplay audio file
	var myAudio = new Audio("assets/audio/Black_Panther_Theme.mp3");
	var results = document.querySelector(".results");
	// Sets variable values for in game messages
	var beginGame = "<p> The struggle for Wakanda has begun!" + "<br>" + " Pick a character!</p>";
	var opponentChoice = "<p> Choose your first opponent!" + "<br>" + " Press ATTACK to start the battle!</p>";

	// Disables the attack button
	$('.attack').attr('disabled','disabled');
	// Displays the opening game message
	results.innerHTML = beginGame;

	// Sets the parameters for gameplay
	function initializeGame() {
	  // Resets variables for gameplay
	   playerHealthNumber = 150;
	   characterHealthNumber = 150;
	   enemyHealthNumber = 150;	
	   isCharacterPicked = false;
	   isEnemyPicked = false;
	   enemiesRemaining = 3;
 	  // Prints players health to their profile image
	  $(".health").text(playerHealthNumber);
	  // Displays opening sequence status
	  results.innerHTML = beginGame;
	}

	 // Starts the music and moves unselected characters to the "enemies" class and changes their background color
	function characterPush(x,y,z) {
	  myAudio.loop = true;
	  myAudio.play();
	  (x).css("background-color", "#0a043f");
	  (y).css("background-color", "#0a043f");
		(z).css("background-color", "#0a043f");
	  $(".enemies").append(x,y,z);
	}

	 // Moves selected enemy to the "arena" class
	function enemyPush(i) {
	  $(".arena").append(i);
	  (i).css("background-color", "#94041b");
	}	

	 // Randomly picks an attack value between 17 and 21
	function characterAttackGenerator() {
	  return Math.floor(Math.random() * 5 + 17);
	}

	 // Randomly picks an attack value between 16 and 20
	function enemyAttackGenerator() {
	  return Math.floor(Math.random() * 5 + 16);
	}

		// *******CHARACTER SELECTION*******//
	  // Add an on click listener for all elements that have "characters" class.
	  $(".character").on("click touchstart", function(event) {
			console.log("NUMBER ONE!");
	  	enemyHealthNumber = 150;
		characterHealthNumber = 150;
	 	if (isCharacterPicked) return;
		isCharacterPicked = true;
		character = event.currentTarget.id;
		results.innerHTML = opponentChoice;
		
	   // When you pick Black Panther
	    if (character === "blackPanther") {
		  characterPush(nakia, shuri, killmonger);
		  characterHealth = pantherHealth;
		}
	   // When you pick Nakia
	    else if (character === "nakia") {
		  characterPush(blackPanther, shuri, killmonger);
		  characterHealth = nakiaHealth;
	    }
	    // When you pick Shuri
	    else if (character === "shuri") {
		  characterPush(blackPanther, nakia, killmonger);
		  characterHealth = shuriHealth;
	    }
	    // When you pick Killmonger
	    else if (character === "killmonger") {
		  characterPush(blackPanther, nakia, shuri);
		  characterHealth = killmongerHealth;
	    }
	  });

		// *******ENEMY SELECTION*******//
	   // Add an on click listener to all elements that have an "enemies" class
	  $(".character").on("click touchstart", function(event) {
			console.log("HELLO!");
	  	if (!isCharacterPicked || isEnemyPicked) return;
		enemy = event.currentTarget.id;
		characterHealth.text(characterHealthNumber);
		
	      // When you pick Black Panther
	    if (character !== "blackPanther" && enemy === "blackPanther"){
		   enemyPush(blackPanther);
		   enemyHealth = pantherHealth;
		   enemyPicked = blackPanther
		   isEnemyPicked = true;
		   $('.attack').removeAttr('disabled');
	    }
	      // When you pick Nakia
	    else if (character !== "nakia" && enemy === "nakia") {
		   enemyPush(nakia);
		   enemyHealth = nakiaHealth;
		   enemyPicked = nakia;
		   isEnemyPicked = true;
		   $('.attack').removeAttr('disabled');
	    }
	      // When you pick Shuri
	    else if (character !== "shuri" && enemy === "shuri") {
		   enemyPush(shuri);
		   enemyHealth = shuriHealth;
		   enemyPicked = shuri;
		   isEnemyPicked = true;
		   $('.attack').removeAttr('disabled');
	    }
	      // When you pick Killmonger
	    else if (character !== "killmonger" && enemy === "killmonger") {
		   enemyPush(killmonger);
		   enemyHealth = killmongerHealth;
		   enemyPicked = killmonger;
		   isEnemyPicked = true;
		   $('.attack').removeAttr('disabled');
	      }
	  });


		// *******FIGHT ARENA*******//
	   // Add an on click listener to the attack button to start the fight
	  $(".attack").on("touchstart click", function(event) {

		characterAttack = characterAttackGenerator();
		enemyAttack = enemyAttackGenerator();

	  	characterHealthNumber = characterHealthNumber - enemyAttack;
	  	enemyHealthNumber = enemyHealthNumber - characterAttack;

	  	characterHealth.text(characterHealthNumber);
	  	enemyHealth.text(enemyHealthNumber);

	  	var battleStatus = "<p>You attacked " + enemy + " for " + characterAttack + " points!" + "<br>" + enemy + " attacked you for " + enemyAttack + " points!</p>";
		var battleResult = "<p>You have vanquished " + enemy + " !" + "<br>" + "Choose your next opponent!</p>";
		var battleWin = "<p>You have vanquished all of your enemies!!" + "<br>" + "You have saved Wakanda!</p>";
		var battleLoss = "<p>" + enemy + " has defeated you!" + "<br>" + "You have failed Wakanda!" + "<br>" +"Press RESET to try again!</p>";

	  	if (characterHealthNumber > 0 && enemyHealthNumber > 0 && enemiesRemaining > 0) {
	  		results.innerHTML = battleStatus;

	  	} else if (enemyHealthNumber <= 0) {
	  	  	enemyPicked.hide();
	  		enemiesRemaining--;
	  		$('.attack').attr('disabled','disabled');
	  		isEnemyPicked = false;
	  		results.innerHTML = battleResult;
		};

		if (enemiesRemaining === 0) {
	  		results.innerHTML = battleWin;
		};

		if(characterHealthNumber <= 0) {
			isEnemyPicked = true;
	  		results.innerHTML = battleLoss;
	  		return;
		};
	  }); 

	  $(".reset").on("click", function(event) {
	  	// Reveals defeated characters for replay
	  	$(".character").show();
	   	// Positions characters in the character section and resets their status color
  	  	$(".characters").append(blackPanther, nakia, shuri, killmonger);
	  	$(".character").css("background-color", "#2e2d36");
	  	initializeGame();
	  	myAudio.pause();
	  });

	  initializeGame();
});

