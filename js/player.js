import {Vec} from "./utils/Vec";
import {two} from "./main";
import {input} from "./input";

export function player() {
  this.pos = new Vec();
  this.vel = new Vec();

  this.input = new input();

  this.head = two.makeCircle(0, 0, 20);
  this.head.fill = "#ff8000";
  this.group = two.makeGroup(this.head);
  this.group.translation.set(two.width/2, two.height/2);
}