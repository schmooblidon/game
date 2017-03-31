export function Vec(x = 0, y = 0){
  this.x = x;
  this.y = y;

  this.Dot = function(vec) {
    return this.x*vec.x + this.y*vec.y;
  }
}