import {Vec} from "./utils/Vec";
import {LineCollider} from "./utils/LineCollider";
import {two} from "./main";
import {input} from "./input";

export function player() {
  this.pos = [];
  this.colours = [];

  this.tailLength = 94;

  for (let i=0;i<this.tailLength;i++) {
    this.pos[i] = new Vec();
    this.colours[i] = "rgb(255,255,0)";
  }
  this.vel = new Vec();
  this.angle = Math.PI/2;
  this.renderAngle = Math.PI/2;
  this.speed = 5;
  this.minSpeed = 2;
  this.maxSpeed = 10;
  this.normalSpeed = 5;
  this.bumperSpeed = 0;
  this.rotatedBumperSpeed = new Vec();
  this.maxBumperSpeed = 15;
  this.setBumperSpeed = 10;
  this.bumperFriction = 5;
  this.bumperTimer = 0;
  this.acceleration = 0;
  this.friction = 0.1;

  this.ease = 0.2;
  this.rotation = 0.1;

  this.collider = new LineCollider();

  this.input = new input();

  // this is for a tail as a singular path
  /*this.tail = [];
  for (let i=0;i<this.tailLength-1;i++) {
    this.tail[i] = new Two.Anchor(0, 0, 0, 0, 0, 0, Two.Commands.line);
  }

  this.tailPath = new Two.Path(this.tail, false, false);
  this.tailGroup = two.makeGroup(this.tailPath);
  this.tailGroup.translation.set(two.width/2, two.height/2);
  this.tailGroup.linewidth = 5;
  this.tailGroup.noFill();*/

  // this is for a tail with many connected but seperate lines
  this.tail = [];
  this.wrapped = [];
  for (let i=0;i<this.tailLength-1;i++) {
    this.tail[i] = new Two.Line(0, 0, 0, 0);
    this.tail[i].stroke = "rgb(255,255,0)";
    this.wrapped[i] = false;
  }
  this.tailGroup = two.makeGroup(this.tail);
  this.tailGroup.translation.set(two.width/2, two.height/2);
  this.tailGroup.linewidth = 5;
  this.tailGroup.noFill();

  this.head = two.makePath(20,0,0,10,-20,0,0,-10,false);

  this.group = two.makeGroup(this.head);
  this.group.translation.set(two.width/2, two.height/2);
  this.group.rotation = 0;
  this.group.noStroke();
}