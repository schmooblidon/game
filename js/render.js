import {p, two, tail} from "./main";

export function updateRenderObjects() {
  two.bind('update', function(frameCount) {
    p.group.translation.set(two.width/2 + p.pos[0].x, two.height/2 + p.pos[0].y * -1);
    p.tailgroup.translation.set(two.width/2, two.height/2)
    for (let i=0;i<29;i++) {
      p.tail[i].translation.set(p.pos[i+1].x, p.pos[i+1].y * -1);
    }
  });

}