import {Point} from "./Point";

export function CircleCollider(radius = 0, point = new Point()) {
  this.radius = radius;
  this.point = point;
}