import "./style.css";

const bird = document.getElementById("bird");
let position = 0;
let speed = 80;
const gravityVal = 40;
bird.style.bottom = `${position}px`;

let isSpacePressed = false;

// Bird flying on space bar
window.addEventListener("keydown", (event) => {
  if (event.code === "Space" && !isSpacePressed) {
    isSpacePressed = true;
    if (position <= 420) {
      position += speed;

      bird.style.bottom = `${position}px`;
    }
  }
});

window.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    isSpacePressed = false;
  }
});

function gravity() {
  collide();
  if (position > 0) {
    position -= gravityVal;
    bird.style.bottom = `${position}px`;
  } else {
    position = 0;
    bird.style.bottom = `${position}px`;
  }
}

// background
const landscape = document.querySelector(".landscape");
const blockCount = 100;

function createBlock(i) {
  const block = document.createElement("div");
  block.classList.add("block");
  block.setAttribute("data-index", i);
  return block;
}

function renderBlock() {
  for (let i = 0; i < blockCount; i++) {
    const block = createBlock(i);

    block.style.left = `${(i + 1) * 100 + 500}px`;
    if (i % 2 == 0) {
      block.style.top = `0px`;
    } else {
      block.style.bottom = `0px`;
    }
    landscape.appendChild(block);
  }
}

//collision
function collide() {
  const birdRect = bird.getBoundingClientRect();
  const allBlocks = document.querySelectorAll(".block");

  allBlocks.forEach((block) => {
    const rect = block.getBoundingClientRect();

    if (
      birdRect.left <= rect.right &&
      birdRect.right >= rect.left &&
      birdRect.top <= rect.bottom &&
      birdRect.bottom >= rect.top
    ) {
      endGame();
    }
  });
}

// EndGame
function endGame() {
  clearInterval(gameInterval);
  landscape.innerHTML = "";
  // alert("Game Over");
}

gravity();
renderBlock();
const gameInterval = setInterval(gravity, 150);
