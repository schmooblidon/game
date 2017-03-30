import {player} from "./player";
import {physics} from "./physics";
import {updateRenderObjects} from "./render";
import {overrideKeyboardEvent, findInput} from "./input";

// setting up renderer
const elem = document.getElementById("game");
const params = {fullscreen : true};
export const two = new Two(params).appendTo(elem);

// setting up player
export const p = new player();



// setting up other variables
let playing = false;
const startPrompt = document.getElementById("startPrompt");

console.log(navigator.getGamepads());

// defining the game logic loop
function gameLoop() {
  p.input.updateInput();
  physics(p);
  
  setTimeout(function(){gameLoop()}, 16.666667);
}

// when page is loaded and it asks for input
function start() {
  if (!playing) {
    if (findInput(p)){
      // start game logic and render loops
      playing = true;
      startPrompt.remove();
      gameLoop();
      updateRenderObjects();
      two.play();
    }
    setTimeout(function(){start()}, 16.6666667);
  }
}
/*export let tail = [];
export let tailgroup = [];
for (let i=0;i<29;i++) {
  tail[i] = two.makeCircle(0, 0, 10);
  tail[i].fill = "#ff8000";
  tail[i].translation.set(two.width/2 + i, two.height/2 + i);
}*/

// overriding keyboard events to disable unwanted events and store properly
document.onkeydown = overrideKeyboardEvent;
document.onkeyup = overrideKeyboardEvent;

start();