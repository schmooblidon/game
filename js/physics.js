export function physics(p) {

  // current acceleration is throttle (rTrigger) plus negative brake (lTrigger), then scaled down to be more intuitive
  p.acceleration = p.input.rTrigger[0] + p.input.lTrigger[0] * -1;

  // use acceleration as a multiplier for a limit in slow or fast speed for the current frame
  let limit = (p.acceleration < 0) ? p.normalSpeed + (p.minSpeed - p.normalSpeed) * -p.acceleration : p.normalSpeed + (p.maxSpeed - p.normalSpeed) * p.acceleration;

  // apply realistic scale to acceleration
  p.acceleration *= 0.05;

  // if accelerating or decelerating. apply acceleration up to calculated min/max speeds
  if (p.acceleration > 0) {
    // if above current limit, conform to limit by friction
    if (p.speed > limit) {
      p.speed = Math.max(p.speed - p.friction, limit);
    }
    // else accelerate up to limit
    else {
      // if going slower than normal speed, accel by friction as well
      if (p.speed < p.normalSpeed) {
        p.speed = Math.min(p.speed + p.acceleration + p.friction, limit);
      }
      else {
        p.speed = Math.min(p.speed + p.acceleration, limit);
      }
    }
  }
  else if (p.acceleration < 0) {
    // if below current limit, conform to limit by friction
    if (p.speed < limit) {
      p.speed = Math.min(p.speed + p.friction, limit);
    }
    // else decelerate down to limit
    else {
      // if going faster than normal speed, decel by friction as well
      if (p.speed > p.normalSpeed) {
        p.speed = Math.max(p.speed + p.acceleration - p.friction, limit);
      }
      else {
        p.speed = Math.max(p.speed + p.acceleration, limit);
      } 
    } 
  }
  // else, check if above/below normalSpeed and move towards it according to friction
  else {
    if (p.speed > p.normalSpeed) {
      p.speed -= p.friction;
      if (p.speed < p.normalSpeed) {
        p.speed = p.normalSpeed;
      }
    }
    else {
      p.speed += p.friction;
      if (p.speed > p.normalSpeed) {
        p.speed = p.normalSpeed;
      }
    }
  }

  // find distance between target angle and current angle
  let angDiff = (p.input.angle[0] - p.angle);
 
  // make sure distance uses shortest path (check going through -pi / pi breakpoint)
  angDiff = Math.atan2(Math.sin(angDiff), Math.cos(angDiff));

  // move current angle towards target according to distance with multipliers

  // this method eases towards the angle, sharp start slow finish
  //p.angle += angDiff * p.ease * p.input.magnitude[0];

  // this method moves towards the angle at a constant rate, great for circles
  p.angle += Math.sign(angDiff) * Math.min(Math.abs(angDiff), p.rotation) * p.input.magnitude[0];

  p.vel.x = Math.cos(p.angle) * p.speed;
  p.vel.y = Math.sin(p.angle) * p.speed;

  /*if (p.bumperSpeed > 0) {
    p.bumperSpeed -= p.bumperFriction;
    if (p.bumperSpeed < 0) {
      p.bumperSpeed = 0;
    }
  }
  else {
    p.bumperSpeed += p.bumperFriction;
    if (p.bumperSpeed > 0) {
      p.bumperSpeed = 0;
    }
  }*/
  if (p.bumperTimer > 0) {
    p.bumperTimer--;
    if (p.bumperTimer <= 0) {
      p.bumperSpeed = 0;
    }
  }

  if (p.input.lBumper[0] && !p.input.lBumper[1]) {
    p.bumperSpeed = Math.max(-p.maxBumperSpeed, p.bumperSpeed - p.setBumperSpeed);
    p.bumperTimer = 5;
  }
  if (p.input.rBumper[0] && !p.input.rBumper[1]) {
    p.bumperSpeed = Math.min(p.maxBumperSpeed, p.bumperSpeed + p.setBumperSpeed);
    p.bumperTimer = 5;
  }

  for (let i=p.tailLength-1;i>0;i--) {
    p.pos[i].x = p.pos[i-1].x;
    p.pos[i].y = p.pos[i-1].y;
    p.colours[i] = p.colours[i-1];
    p.wrapped[i] = p.wrapped[i-1];
  }

  p.rotatedBumperSpeed.x = Math.cos(p.angle-Math.PI/2) * p.bumperSpeed;
  p.rotatedBumperSpeed.y = Math.sin(p.angle-Math.PI/2) * p.bumperSpeed;

  p.pos[0].x += p.vel.x + p.rotatedBumperSpeed.x;
  p.pos[0].y += p.vel.y + p.rotatedBumperSpeed.y;

  p.renderAngle = Math.atan2(p.vel.y + p.rotatedBumperSpeed.y, p.vel.x + p.rotatedBumperSpeed.x);

  // blastzone wrapping
  const w = document.body.clientWidth + 20;
  const h = document.body.clientHeight + 20;
  p.wrapped[0] = false;
  if (p.pos[0].x > w/2) {
    p.pos[0].x -= w;
    p.wrapped[0] = true;
  }
  else if (p.pos[0].x < -w/2) {
    p.pos[0].x += w;
    p.wrapped[0] = true;
  }
  if (p.pos[0].y > h/2) {
    p.pos[0].y -= h;
    p.wrapped[0] = true;
  }
  else if (p.pos[0].y < -h/2) {
    p.pos[0].y += h;
    p.wrapped[0] = true;
  }

  // calculating colour between green and red for current frame according to speed
  p.colours[0] = "rgb("+Math.round(Math.max(0, Math.min(255, ((p.maxSpeed-p.speed)/(p.maxSpeed - p.normalSpeed))*255)))+","+Math.round(Math.max(0, Math.min(255, ((p.speed-p.minSpeed)/(p.normalSpeed - p.minSpeed))*255)))+",0)";

  p.collider.line.p1.x = p.pos[0].x;
  p.collider.line.p1.y = p.pos[0].y;
  if (p.wrapped[0]) {
    p.collider.line.p2.x = p.pos[0].x;
    p.collider.line.p2.y = p.pos[0].y;
  }
  else {
    p.collider.line.p2.x = p.pos[1].x;
    p.collider.line.p2.y = p.pos[1].y;
  }
  
}