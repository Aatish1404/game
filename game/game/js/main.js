
let ball = document.querySelector(".ball"); 
let distanceToMove = 20;
let jumpHeight = 150;
let isJumping = false;
let coinCollected = false;
let coinElements = document.querySelectorAll(".coin"); 
let score = 0;
let scoreValueElement = document.querySelector("#score-value");

// on load
window.addEventListener("load", () => {
  ball.style.position = "absolute";
  ball.style.left = "100px";
  ball.style.bottom = "143px";
  scoreValueElement.textContent = score; 
});

window.addEventListener("keydown", (event) => {
  const key = event.key;

  // Arrows
  const keyMap = {
    ArrowRight: "left",
    ArrowLeft: "left",
    ArrowUp: "jump",
  };

  const direction = keyMap[key];

  if (direction === "jump" && !isJumping) {
    // jump
    isJumping = true;
    const originalBottom = parseInt(ball.style.bottom);
    ball.style.bottom = (originalBottom + jumpHeight) + "px";

    // Diamonds
    for (const coinElement of coinElements) {
      const ballRect = ball.getBoundingClientRect();
      const coinRect = coinElement.getBoundingClientRect();

      if (isRectangularCollision(ballRect, coinRect) && !coinCollected) {
        // scores
        coinElement.style.display = "none";
        coinCollected = true;
        score += 100;
        scoreValueElement.textContent = score; 
      }
    }

    // return ball
    setTimeout(() => {
      ball.style.bottom = originalBottom + "px";
      isJumping = false; 
      coinCollected = false; 
    }, 500); 
  } else if (direction) {
    
    ball.style[direction] =
      parseInt(ball.style[direction]) +
      (key === "ArrowRight" || key === "ArrowUp" ? distanceToMove : -distanceToMove) +
      "px";
  }
});

function isRectangularCollision(rect1, rect2) {
  return !(
    rect1.top > rect2.bottom ||
    rect1.right < rect2.left ||
    rect1.bottom < rect2.top ||
    rect1.left > rect2.right
  );
}



