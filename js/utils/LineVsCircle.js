import {Vec} from "./Vec";

export function LineVsCircle(lineC, circleC) {
  const d = new Vec(lineC.line.p2.x - lineC.line.p1.x, lineC.line.p2.y - lineC.line.p1.y);
  const f = new Vec(lineC.line.p1.x - circleC.point.x, lineC.line.p1.y - circleC.point.y);

  const a = d.Dot(d);
  const b = 2 * f.Dot(d);
  const c = f.Dot(f) - circleC.radius*circleC.radius;

  let discriminant = b*b-4*a*c;
  if( discriminant < 0 )
  {
    // no intersection
  }
  else
  {
    // ray didn't totally miss sphere,
    // so there is a solution to
    // the equation.

    discriminant = Math.sqrt( discriminant );

    // either solution may be on or off the ray so need to test both
    // t1 is always the smaller value, because BOTH discriminant and
    // a are nonnegative.
    const t1 = (-b - discriminant)/(2*a);
    const t2 = (-b + discriminant)/(2*a);

    // 3x HIT cases:
    //          -o->             --|-->  |            |  --|->
    // Impale(t1 hit,t2 hit), Poke(t1 hit,t2>1), ExitWound(t1<0, t2 hit), 

    // 3x MISS cases:
    //       ->  o                     o ->              | -> |
    // FallShort (t1>1,t2>1), Past (t1<0,t2<0), CompletelyInside(t1<0, t2>1)

    if( t1 >= 0 && t1 <= 1 )
    {
      // t1 is the intersection, and it's closer than t2
      // (since t1 uses -b - discriminant)
      // Impale, Poke
      return true ;
    }

    // here t1 didn't intersect so we are either started
    // inside the sphere or completely past it
    if( t2 >= 0 && t2 <= 1 )
    {
      // ExitWound
      return true ;
    }

    if (t1 < 0 && t2 > 1) {
      return true;
    }

    // no intn: FallShort, Past, CompletelyInside
    return false ;
  }
}