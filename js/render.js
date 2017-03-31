import {two, tail} from "./main";

export function updateRenderObjects(p) {
  p.group.translation.set(two.width/2 + p.pos[0].x, two.height/2 + p.pos[0].y * -1);
  p.tailGroup.translation.set(two.width/2, two.height/2);
  p.group.rotation = -p.renderAngle;
  p.group.fill = p.colours[0];
  for (let i=0;i<p.tailLength-1;i++) {
    p.tail[i].vertices[0].x = p.pos[i].x;
    p.tail[i].vertices[0].y = p.pos[i].y * -1;
    if (p.wrapped[i]) {
      p.tail[i].vertices[1].x = p.pos[i].x;
      p.tail[i].vertices[1].y = p.pos[i].y * -1;
    }
    else {
      p.tail[i].vertices[1].x = p.pos[i+1].x;
      p.tail[i].vertices[1].y = p.pos[i+1].y * -1;
    }
    p.tail[i].stroke = p.colours[i+1];
  }
}