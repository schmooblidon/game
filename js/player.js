import {Vec} from "./utils/Vec";
import {two} from "./main";
import {input} from "./input";

export function player() {
  this.pos = [];
  for (let i=0;i<30;i++) {
    this.pos[i] = new Vec();
  }
  this.vel = new Vec();
  this.angle = Math.PI/2;
  this.speed = 5;

  this.input = new input();

  this.tail = [];
  for (let i=0;i<29;i++) {
    this.tail[i] = two.makeCircle(i, i, 5);
    this.tail[i].fill = "#ff8000"
  }
  this.tailgroup = two.makeGroup(this.tail);
  this.tailgroup.translation.set(two.width/2, two.height/2);
  this.tailgroup.noStroke();

  this.head = two.makeCircle(0, 0, 10);
  this.head.fill = "#ff8000";

  this.group = two.makeGroup(this.head);
  this.group.translation.set(two.width/2, two.height/2);
  this.group.noStroke();
}