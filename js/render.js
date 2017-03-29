import {p, two} from "./main";

export function updateRenderObjects() {
  p.group.translation.set(two.width/2 + p.pos.x, two.height/2 + p.pos.y * -1);
}