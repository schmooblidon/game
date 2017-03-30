export function physics(p) {

  // find distance between target angle and current angle
  let angDiff = (p.input.angle[0] - p.angle);
 
  // make sure distance uses shortest path (check going through -pi / pi breakpoint)
  angDiff = Math.atan2(Math.sin(angDiff), Math.cos(angDiff));

  // move current angle towards target according to distance with multipliers
  //p.angle += angDiff * 0.2 * p.input.magnitude[0];
  p.angle += Math.sign(angDiff) * Math.min(Math.abs(angDiff), 0.1) * p.input.magnitude[0];

  p.vel.x = Math.cos(p.angle) * p.speed;
  p.vel.y = Math.sin(p.angle) * p.speed;

  for (let i=29;i>0;i--) {
    p.pos[i].x = p.pos[i-1].x;
    p.pos[i].y = p.pos[i-1].y;
  }

  p.pos[0].x += p.vel.x;
  p.pos[0].y += p.vel.y;
}