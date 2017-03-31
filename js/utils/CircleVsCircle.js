export function CircleVsCircle(c1, c2) {
  let distance = Math.sqrt(Math.pow(c2.point.x - c1.point.x, 2) + Math.pow(c2.point.y - c1.point.y, 2));
  return distance <= c1.radius + c2.radius;
}