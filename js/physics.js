export function physics(p) {

  p.vel.x = p.input.lStickX[0] * 5;
  p.vel.y = p.input.lStickY[0] * 5;

  p.pos.x += p.vel.x;
  p.pos.y += p.vel.y;
}