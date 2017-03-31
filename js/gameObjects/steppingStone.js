import {CircleCollider} from "../utils/CircleCollider";
import {two, p} from "../main";
import {LineVsCircle} from "../utils/LineVsCircle";

export function steppingStone(center = new Point(), radius = 0) {
  this.center = center;
  this.radius = radius;
  // if changing center/radius, remember to change collider props
  this.circleCollider = new CircleCollider(this.radius, this.center);

  this.opacity = 0.2;
  this.colour = "rgba(255,255,255,0.2)";

  this.switch = false;

  this.steppedOnLastFrame = false;

  this.circleRender = two.makeCircle(this.center.x, this.center.y, this.radius);
  this.circleRender.fill = this.colour;
  this.circleRender.noStroke();
  this.circleRender.translation.set(this.center.x + two.width/2, this.center.y * -1 + two.height/2)

  this.update = function() {
    if (LineVsCircle(p.collider, this.circleCollider)) {
      if (!this.steppedOnLastFrame) {
        this.onStep();
      }
      this.steppedOnLastFrame = true;
    }
    else {
      this.steppedOnLastFrame = false;
    }

    this.opacity = this.switch ? Math.min(0.8, this.opacity+0.02) : Math.max(0.2, this.opacity-0.02);
    this.colour = "rgba(255,255,255,"+this.opacity+")";
    this.circleRender.fill = this.colour;
  }

  this.onStep = function(){
    this.switch ^= true;
  }
}