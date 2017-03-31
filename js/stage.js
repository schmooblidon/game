import {steppingStone} from "./gameObjects/steppingStone";
import {Point} from "./utils/Point";

export let stage = {
  steppingStones : []
}

export function buildStage() {
  let angle = 0;
  for (let i=0;i<12;i++) {
    stage.steppingStones[i] = new steppingStone(new Point(200*Math.cos(angle), 200*Math.sin(angle)), 25);
    angle += 2*Math.PI/12;
  }
}

export function updateStage() {
  for (let i=0;i<stage.steppingStones.length;i++) {
    stage.steppingStones[i].update();
  }
}