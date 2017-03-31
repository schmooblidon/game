import {Vec} from "./Vec";

export function Line(p1 = new Vec(), p2 = new Vec()){
  this.p1 = p1;
  this.p2 = p2;
}