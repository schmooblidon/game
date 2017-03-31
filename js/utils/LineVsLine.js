import {Vec} from "./Vec";

export function LineVsLine(lineC1, lineC2) {
  let s1, s2;
  s1 = new Vec(lineC1.line.p2.x - lineC1.line.p1.x, lineC1.line.p2.y - lineC1.line.p1.y);
  s2 = new Vec(lineC2.line.p2.x - lineC2.line.p1.x, lineC2.line.p2.y - lineC2.line.p1.y)

  let s, t;
  s = (-s1.y * (lineC1.line.p1.x - lineC2.line.p1.x) + s1.x * (lineC1.line.p1.y - lineC2.line.p1.y)) / (-s2.x * s1.y + s1.x * s2.y);
  t = ( s2.x * (lineC1.line.p1.y - lineC2.line.p1.y) - s2.y * (lineC1.line.p1.x - p2.x)) / (-s2.x * s1.y + s1.x * s2.y);

  if (s >= 0 && s <= 1 && t >= 0 && t <= 1)
  {
    // Collision detected
    return [true, new Vec(lineC1.line.p1.x + (t * s1.x), lineC1.line.p1.y + (t * s1.y))];
  }

  return [false,0]; // No collision
}