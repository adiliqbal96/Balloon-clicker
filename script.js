const startScreen = document.getElementById("start-screen");
const gameScreen = document.querySelector(".game-screen");
const instructionsScreen = document.getElementById("instructions");
const playBtn = document.getElementById("play-btn");
const howToPlayBtn = document.getElementById("how-to-play-btn");
const closeInstructionsBtn = document.getElementById("close-instructions-btn");
const backBtn = document.getElementById("back-btn");
const gameOverScreen = document.getElementById("game-over-screen");

backBtn.addEventListener("click", () => {
  gameScreen.style.display = "none";
  instructionsScreen.style.display = "none";
  startScreen.style.display = "block";
  // reset the positions of the buttons
  playBtn.style.top = "50%";
  howToPlayBtn.style.top = "60%";
});

playBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  gameScreen.style.display = "block";
});

howToPlayBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  instructionsScreen.style.display = "block";
});

const backBtnGame = document.getElementById("back-btn-game");
backBtnGame.addEventListener("click", function () {
  gameScreen.style.display = "none";
  instructions.style.display = "none";
  startScreen.style.display = "block";
});

//array that spawns different pictures on click
const popPictures = [
  ["img/pop1.png", "img/pop5.png", "img/pop3.png"],
  ["img/pop2.png", "img/pop4.png", "img/pop1.png"],
  ["img/pop3.png", "img/pop2.png", "img/pop5.png"],
  ["img/pop4.png", "img/pop2.png", "img/pop1.png"],
  ["img/pop5.png", "img/pop1.png", "img/pop2.png"],
];

// function to select a random pop picture
const getRandomPopPicture = () => {
  const randomIndex = Math.floor(Math.random() * popPictures.length);
  const randomPopPictures = popPictures[randomIndex];
  const randomPopPictureIndex = Math.floor(
    Math.random() * randomPopPictures.length
  );
  return randomPopPictures[randomPopPictureIndex];
};

// function to add pop animation to a balloon
const popBalloon = (balloon) => {
  // add pop animation to the balloon
  balloon.classList.add("pop");

  // select a random pop picture
  const popPicture = getRandomPopPicture();

  // set the background image of the balloon to the selected pop picture
  balloon.style.backgroundImage = `url(${popPicture})`;

  // hide the balloon after the pop animation is complete
  setTimeout(() => {
    balloon.classList.remove("pop");
    balloon.style.display = "none";
    balloon.style.backgroundImage = "";
    setTimeout(() => {
      balloon.style.display = "block";
    }, 0);
  }, 1000);
};

// add event listener to balloon container
const balloonContainer = document.querySelector(".game-screen");
balloonContainer.addEventListener("click", (event) => {
  const clickedElement = event.target;

  // check if the clicked element is a balloon
  if (clickedElement.classList.contains("balloon")) {
    // add pop animation to the balloon
    popBalloon(clickedElement);
  }
});

// function to add new balloon after a certain delay
const addBalloon = () => {
  const balloons = getBalloons();
  if (balloons.length <= 5) {
    // change 5 to the number of balloons you want on the screen at once
    const newBalloon = document.createElement("div");
    newBalloon.className = "balloon";
    newBalloon.id = Date.now();
    document.querySelector(".game-screen").appendChild(newBalloon);

    // add event listener to the new balloon to remove the pop animation and respawn the balloon
    newBalloon.addEventListener("animationend", () => {
      newBalloon.classList.remove("pop");
      newBalloon.style.display = "none";
      newBalloon.style.backgroundImage = "";
      setTimeout(() => {
        newBalloon.style.display = "block";
      }, 1000);
      document.querySelector(".game-screen").appendChild(newBalloon);
    });
  }
};

//plane dissapear with explosions
window.onload = function () {
  // set the initial score and lives
  let score = 0;

  // add event listeners for balloons
  const balloons = document.querySelectorAll(".balloon");
  balloons.forEach((balloon) => {
    balloon.addEventListener("click", () => {
      // add to the score and update the display
      score++;
      document.getElementById("score").textContent = `Score: ${score}`;

      // hide the balloon from the screen
      balloon.style.display = "none";

      // show the balloon again after a random delay
      setTimeout(() => {
        balloon.style.display = "block";
      }, Math.random() * 1000);
    });
  });
  window.onload = () => {
    // set up variables
    const startTime = Date.now();
    const totalTime = 60 * 1000; // 60 seconds
    let intervalId;

    // start the game
    startGame();

    function startGame() {
      // start the timer
      intervalId = setInterval(updateBar, 1000);
    }
  };
};
//plane dissapear with explosions
window.onload = function () {
  // your JavaScript code here

  // set the initial score and lives
  let score = 0;

  // add event listeners for balloons
  const balloons = document.querySelectorAll(".balloon");
  balloons.forEach((balloon) => {
    balloon.addEventListener("click", () => {
      // add to the score and update the display
      score++;
      document.getElementById("score").textContent = `Score: ${score}`;

      // hide the balloon from the screen
      balloon.style.display = "none";

      // show the balloon again after a random delay
      setTimeout(() => {
        balloon.style.display = "block";
      }, Math.random() * 1000);
    });
  });

  // set up variables
  const startTime = Date.now();
  const totalTime = 60 * 1000; // 60 seconds
  let intervalId;

  // start the game
  startGame();

  function startGame() {
    // start the timer
    intervalId = setInterval(updateBar, 1000);

    // add event listeners for planes
    const planes = document.querySelectorAll(".plane");
    planes.forEach((plane) => {
      plane.addEventListener("click", (event) => {
        console.log("plane clicked");

        // subtract from the lives and update the display
        const hearts = document.querySelectorAll(".heart");
        if (hearts.length > 0) {
          hearts[hearts.length - 1].remove();
        }

        // check if the player has lost all their lives
        if (hearts.length === 0) {
          // change to game over screen
          const gameScreen = document.querySelector(".game-screen");
          gameScreen.style.display = "none";
          const gameOverScreen = document.getElementById("game-over-screen");
          gameOverScreen.style.display = "block";
          clearInterval(intervalId);
        }

        // add explosion animation
        const explosion = document.createElement("div");
        explosion.id = "explosion";
        explosion.style.position = "absolute";
        explosion.style.left = `${event.clientX - 25}px`;
        explosion.style.top = `${event.clientY - 95}px`;
        document.querySelector(".game-screen").appendChild(explosion);

        // remove explosion animation after it finishes
        explosion.addEventListener("animationend", () => {
          explosion.parentNode.removeChild(explosion);
        });

        // hide the plane from the screen
        plane.style.display = "none";
      });
    });
  }

  function updateBar() {
    // Calculate the new width of the bar based on the elapsed time
    const timeElapsed = Date.now() - startTime;
    const newWidth = Math.max(0, 60 - (timeElapsed / totalTime) * 60);

    // Update the width of the bar
    const bar = document.getElementById("bar");
    bar.style.width = newWidth + "%";

    // Check if the bar has reached 0% and trigger the game over prompt
    const hearts = document.querySelectorAll(".heart");
    if (newWidth <= 0 || hearts.length === 0) {
      clearInterval(intervalId);
      // change to game over screen
      const gameScreen = document.querySelector(".game-screen");
      gameScreen.style.display = "none";
      const gameOverScreen = document.getElementById("game-over-screen");
      gameOverScreen.style.display = "block";
    }
  }
};
