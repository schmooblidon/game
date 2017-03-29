function start() {
  var elem = document.getElementById("game");
  var params = {fullscreen : true};
  var two = new Two(params).appendTo(elem);

  var circle = two.makeCircle(-70, 0, 50);
  var rect = two.makeRectangle(70, 0, 100, 100);

  circle.fill = "#ff8000";
  rect.fill = "rgba(0, 200, 255, 0.75)";

  var group = two.makeGroup(circle, rect);

  group.translation.set(two.width / 2, two.height / 2);
  group.scale = 0;
  group.noStroke();

  two.bind("update", function(frameCount) {
    if (group.scale > 0.9999) {
      group.scale = group.rotation = 0;
    }
    var t = (1 - group.scale) * 0.125;
    group.scale += t;
    group.rotation += t * 4 * Math.PI;
  }).play();
}