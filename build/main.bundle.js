/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.p = exports.two = undefined;

var _player = __webpack_require__(3);

var _physics = __webpack_require__(2);

var _render = __webpack_require__(4);

var _input = __webpack_require__(1);

var _stage = __webpack_require__(9);

// setting up renderer
var elem = document.getElementById("game");
var params = { fullscreen: true };
var two = exports.two = new Two(params).appendTo(elem);

// build stage
(0, _stage.buildStage)();
// setting up player
var p = exports.p = new _player.player();

// setting up other variables
var playing = false;
var startPrompt = document.getElementById("startPrompt");
var pauseScreen = document.getElementById("pause");

// always handy to have this ready to inspect
console.log(navigator.getGamepads());

// defining the game logic loop
function gameLoop() {
  // get current input
  p.input.updateInput();
  // if hit start, pause/unpause
  if (p.input.s[0] && !p.input.s[1]) {
    playing ^= true;
    pauseScreen.style.display = playing ? "none" : "block";
  }
  if (playing) {
    (0, _physics.physics)(p);
    (0, _stage.updateStage)();
    (0, _render.updateRenderObjects)(p);
  }
  setTimeout(function () {
    gameLoop();
  }, 16.666667);
}

// when page is loaded and it asks for input
function start() {
  if (!playing) {
    if ((0, _input.findInput)(p)) {
      // start game logic and render loops
      playing = true;
      startPrompt.remove();
      gameLoop();
      two.play();
    }
    setTimeout(function () {
      start();
    }, 16.6666667);
  }
}

// overriding keyboard events to disable unwanted events and store properly
document.onkeydown = _input.overrideKeyboardEvent;
document.onkeyup = _input.overrideKeyboardEvent;

start();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.input = input;
exports.findInput = findInput;
exports.overrideKeyboardEvent = overrideKeyboardEvent;
function input() {
  this.controllerIndex = -1;
  this.lStickX = [0];
  this.lStickY = [0];
  this.lTrigger = [0];
  this.rTrigger = [0];
  this.lBumper = [false];
  this.rBumper = [false];
  this.a = [false];
  this.s = [false];

  this.angle = [0];
  this.magnitude = [0];

  this.updateInput = function () {
    // push inputs back a frame in history
    for (var i = 4; i > 0; i--) {
      this.lStickX[i] = this.lStickX[i - 1];
      this.lStickY[i] = this.lStickY[i - 1];
      this.a[i] = this.a[i - 1];
      this.lTrigger[i] = this.lTrigger[i - 1];
      this.rTrigger[i] = this.rTrigger[i - 1];
      this.lBumper[i] = this.lBumper[i - 1];
      this.rBumper[i] = this.rBumper[i - 1];
      this.s[i] = this.s[i - 1];
      this.angle[i] = this.angle[i - 1];
      this.magnitude[i] = this.magnitude[i - 1];
    }

    // if using keyboard
    if (this.controllerIndex === -1) {
      this.lStickX[0] = (keys[68] || keys[39] ? 1 : 0) + (keys[65] || keys[37] ? -1 : 0);
      this.lStickY[0] = (keys[87] || keys[38] ? 1 : 0) + (keys[83] || keys[40] ? -1 : 0);
      this.a[0] = keys[32] || keys[90];
      this.s[0] = keys[13] || keys[80];
    }
    // else if using a gamepad
    else {
        var gamepads = navigator.getGamepads();
        var gamepad = gamepads[this.controllerIndex];
        // if gamepad is unplugged or removed. change to keyboard
        if (gamepad === null || gamepad === undefined) {
          this.controllerIndex = -1;
        } else {
          this.lStickX[0] = gamepad.axes[0];
          this.lStickY[0] = gamepad.axes[1] * -1;
          if (Math.abs(this.lStickY[0]) < 0.3 && Math.abs(this.lStickX[0]) < 0.3) {
            this.lStickX[0] = 0;
            this.lStickY[0] = 0;
          }
          this.a[0] = gamepad.buttons[0].pressed;
          this.lTrigger[0] = gamepad.buttons[6].value;
          this.rTrigger[0] = gamepad.buttons[7].value;
          this.lBumper[0] = gamepad.buttons[4].pressed;
          this.rBumper[0] = gamepad.buttons[5].pressed;
          this.s[0] = gamepad.buttons[9].pressed;
        }
      }

    // calculate new inputs
    this.angle[0] = Math.atan2(this.lStickY[0], this.lStickX[0]);
    this.magnitude[0] = Math.min(1, Math.sqrt(Math.pow(this.lStickX[0], 2) + Math.pow(this.lStickY[0], 2)));
  };
}

function findInput(p) {
  // if enter or space is hit
  if (keys[13] || keys[32]) {
    p.input.controllerIndex = -1;
    return true;
  }
  // else look for a button press on a gamepad
  else {
      var gamepads = navigator.getGamepads();
      for (var i = 0; i < gamepads.length; i++) {
        if (gamepads[i] !== null && gamepads[i] !== undefined) {
          for (var j = 0; j < gamepads[i].buttons.length; j++) {
            if (gamepads[i].buttons[j].pressed) {
              p.input.controllerIndex = i;
              return true;
            }
          }
        }
      }
    }
  return false;
}

var keys = exports.keys = {};

function overrideKeyboardEvent(e) {
  // do this for all keys except f5 and f11
  if (e.keyCode != 122 && e.keyCode != 116) {
    switch (e.type) {
      case "keydown":
        if (!keys[e.keyCode]) {
          keys[e.keyCode] = true;
        }
        break;
      case "keyup":
        delete keys[e.keyCode];
        break;
    }
    disabledEventPropagation(e);
    e.preventDefault();
    return false;
  } else {
    return true;
  }
}

function disabledEventPropagation(e) {
  if (e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else if (event) {
      event.cancelBubble = true;
    }
  }
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.physics = physics;
function physics(p) {

  // current acceleration is throttle (rTrigger) plus negative brake (lTrigger), then scaled down to be more intuitive
  p.acceleration = p.input.rTrigger[0] + p.input.lTrigger[0] * -1;

  // use acceleration as a multiplier for a limit in slow or fast speed for the current frame
  var limit = p.acceleration < 0 ? p.normalSpeed + (p.minSpeed - p.normalSpeed) * -p.acceleration : p.normalSpeed + (p.maxSpeed - p.normalSpeed) * p.acceleration;

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
        } else {
          p.speed = Math.min(p.speed + p.acceleration, limit);
        }
      }
  } else if (p.acceleration < 0) {
    // if below current limit, conform to limit by friction
    if (p.speed < limit) {
      p.speed = Math.min(p.speed + p.friction, limit);
    }
    // else decelerate down to limit
    else {
        // if going faster than normal speed, decel by friction as well
        if (p.speed > p.normalSpeed) {
          p.speed = Math.max(p.speed + p.acceleration - p.friction, limit);
        } else {
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
      } else {
        p.speed += p.friction;
        if (p.speed > p.normalSpeed) {
          p.speed = p.normalSpeed;
        }
      }
    }

  // find distance between target angle and current angle
  var angDiff = p.input.angle[0] - p.angle;

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

  for (var i = p.tailLength - 1; i > 0; i--) {
    p.pos[i].x = p.pos[i - 1].x;
    p.pos[i].y = p.pos[i - 1].y;
    p.colours[i] = p.colours[i - 1];
    p.wrapped[i] = p.wrapped[i - 1];
  }

  p.rotatedBumperSpeed.x = Math.cos(p.angle - Math.PI / 2) * p.bumperSpeed;
  p.rotatedBumperSpeed.y = Math.sin(p.angle - Math.PI / 2) * p.bumperSpeed;

  p.pos[0].x += p.vel.x + p.rotatedBumperSpeed.x;
  p.pos[0].y += p.vel.y + p.rotatedBumperSpeed.y;

  p.renderAngle = Math.atan2(p.vel.y + p.rotatedBumperSpeed.y, p.vel.x + p.rotatedBumperSpeed.x);

  // blastzone wrapping
  var w = document.body.clientWidth + 20;
  var h = document.body.clientHeight + 20;
  p.wrapped[0] = false;
  if (p.pos[0].x > w / 2) {
    p.pos[0].x -= w;
    p.wrapped[0] = true;
  } else if (p.pos[0].x < -w / 2) {
    p.pos[0].x += w;
    p.wrapped[0] = true;
  }
  if (p.pos[0].y > h / 2) {
    p.pos[0].y -= h;
    p.wrapped[0] = true;
  } else if (p.pos[0].y < -h / 2) {
    p.pos[0].y += h;
    p.wrapped[0] = true;
  }

  // calculating colour between green and red for current frame according to speed
  p.colours[0] = "rgb(" + Math.round(Math.max(0, Math.min(255, (p.maxSpeed - p.speed) / (p.maxSpeed - p.normalSpeed) * 255))) + "," + Math.round(Math.max(0, Math.min(255, (p.speed - p.minSpeed) / (p.normalSpeed - p.minSpeed) * 255))) + ",0)";

  p.collider.line.p1.x = p.pos[0].x;
  p.collider.line.p1.y = p.pos[0].y;
  if (p.wrapped[0]) {
    p.collider.line.p2.x = p.pos[0].x;
    p.collider.line.p2.y = p.pos[0].y;
  } else {
    p.collider.line.p2.x = p.pos[1].x;
    p.collider.line.p2.y = p.pos[1].y;
  }
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.player = player;

var _Vec = __webpack_require__(5);

var _LineCollider = __webpack_require__(7);

var _main = __webpack_require__(0);

var _input = __webpack_require__(1);

function player() {
  this.pos = [];
  this.colours = [];

  this.tailLength = 94;

  for (var i = 0; i < this.tailLength; i++) {
    this.pos[i] = new _Vec.Vec();
    this.colours[i] = "rgb(255,255,0)";
  }
  this.vel = new _Vec.Vec();
  this.angle = Math.PI / 2;
  this.renderAngle = Math.PI / 2;
  this.speed = 5;
  this.minSpeed = 2;
  this.maxSpeed = 10;
  this.normalSpeed = 5;
  this.bumperSpeed = 0;
  this.rotatedBumperSpeed = new _Vec.Vec();
  this.maxBumperSpeed = 15;
  this.setBumperSpeed = 10;
  this.bumperFriction = 5;
  this.bumperTimer = 0;
  this.acceleration = 0;
  this.friction = 0.1;

  this.ease = 0.2;
  this.rotation = 0.1;

  this.collider = new _LineCollider.LineCollider();

  this.input = new _input.input();

  // this is for a tail as a singular path
  /*this.tail = [];
  for (let i=0;i<this.tailLength-1;i++) {
    this.tail[i] = new Two.Anchor(0, 0, 0, 0, 0, 0, Two.Commands.line);
  }
    this.tailPath = new Two.Path(this.tail, false, false);
  this.tailGroup = two.makeGroup(this.tailPath);
  this.tailGroup.translation.set(two.width/2, two.height/2);
  this.tailGroup.linewidth = 5;
  this.tailGroup.noFill();*/

  // this is for a tail with many connected but seperate lines
  this.tail = [];
  this.wrapped = [];
  for (var _i = 0; _i < this.tailLength - 1; _i++) {
    this.tail[_i] = new Two.Line(0, 0, 0, 0);
    this.tail[_i].stroke = "rgb(255,255,0)";
    this.wrapped[_i] = false;
  }
  this.tailGroup = _main.two.makeGroup(this.tail);
  this.tailGroup.translation.set(_main.two.width / 2, _main.two.height / 2);
  this.tailGroup.linewidth = 5;
  this.tailGroup.noFill();

  this.head = _main.two.makePath(20, 0, 0, 10, -20, 0, 0, -10, false);

  this.group = _main.two.makeGroup(this.head);
  this.group.translation.set(_main.two.width / 2, _main.two.height / 2);
  this.group.rotation = 0;
  this.group.noStroke();
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateRenderObjects = updateRenderObjects;

var _main = __webpack_require__(0);

function updateRenderObjects(p) {
  p.group.translation.set(_main.two.width / 2 + p.pos[0].x, _main.two.height / 2 + p.pos[0].y * -1);
  p.tailGroup.translation.set(_main.two.width / 2, _main.two.height / 2);
  p.group.rotation = -p.renderAngle;
  p.group.fill = p.colours[0];
  for (var i = 0; i < p.tailLength - 1; i++) {
    p.tail[i].vertices[0].x = p.pos[i].x;
    p.tail[i].vertices[0].y = p.pos[i].y * -1;
    if (p.wrapped[i]) {
      p.tail[i].vertices[1].x = p.pos[i].x;
      p.tail[i].vertices[1].y = p.pos[i].y * -1;
    } else {
      p.tail[i].vertices[1].x = p.pos[i + 1].x;
      p.tail[i].vertices[1].y = p.pos[i + 1].y * -1;
    }
    p.tail[i].stroke = p.colours[i + 1];
  }
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vec = Vec;
function Vec() {
  var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  this.x = x;
  this.y = y;

  this.Dot = function (vec) {
    return this.x * vec.x + this.y * vec.y;
  };
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Line = Line;

var _Vec = __webpack_require__(5);

function Line() {
  var p1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _Vec.Vec();
  var p2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _Vec.Vec();

  this.p1 = p1;
  this.p2 = p2;
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineCollider = LineCollider;

var _Line = __webpack_require__(6);

function LineCollider() {
  var line = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _Line.Line();

  this.line = line;
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Point = Point;
function Point() {
  var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  this.x = x;
  this.y = y;
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stage = undefined;
exports.buildStage = buildStage;
exports.updateStage = updateStage;

var _steppingStone = __webpack_require__(10);

var _Point = __webpack_require__(8);

var stage = exports.stage = {
  steppingStones: []
};

function buildStage() {
  var angle = 0;
  for (var i = 0; i < 12; i++) {
    stage.steppingStones[i] = new _steppingStone.steppingStone(new _Point.Point(200 * Math.cos(angle), 200 * Math.sin(angle)), 25);
    angle += 2 * Math.PI / 12;
  }
}

function updateStage() {
  for (var i = 0; i < stage.steppingStones.length; i++) {
    stage.steppingStones[i].update();
  }
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.steppingStone = steppingStone;

var _CircleCollider = __webpack_require__(11);

var _main = __webpack_require__(0);

var _LineVsCircle = __webpack_require__(12);

function steppingStone() {
  var center = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Point();
  var radius = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  this.center = center;
  this.radius = radius;
  // if changing center/radius, remember to change collider props
  this.circleCollider = new _CircleCollider.CircleCollider(this.radius, this.center);

  this.opacity = 0.2;
  this.colour = "rgba(255,255,255,0.2)";

  this.switch = false;

  this.steppedOnLastFrame = false;

  this.circleRender = _main.two.makeCircle(this.center.x, this.center.y, this.radius);
  this.circleRender.fill = this.colour;
  this.circleRender.noStroke();
  this.circleRender.translation.set(this.center.x + _main.two.width / 2, this.center.y * -1 + _main.two.height / 2);

  this.update = function () {
    if ((0, _LineVsCircle.LineVsCircle)(_main.p.collider, this.circleCollider)) {
      if (!this.steppedOnLastFrame) {
        this.onStep();
      }
      this.steppedOnLastFrame = true;
    } else {
      this.steppedOnLastFrame = false;
    }

    this.opacity = this.switch ? Math.min(0.8, this.opacity + 0.02) : Math.max(0.2, this.opacity - 0.02);
    this.colour = "rgba(255,255,255," + this.opacity + ")";
    this.circleRender.fill = this.colour;
  };

  this.onStep = function () {
    this.switch ^= true;
  };
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CircleCollider = CircleCollider;

var _Point = __webpack_require__(8);

function CircleCollider() {
  var radius = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var point = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _Point.Point();

  this.radius = radius;
  this.point = point;
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineVsCircle = LineVsCircle;

var _Vec = __webpack_require__(5);

function LineVsCircle(lineC, circleC) {
  var d = new _Vec.Vec(lineC.line.p2.x - lineC.line.p1.x, lineC.line.p2.y - lineC.line.p1.y);
  var f = new _Vec.Vec(lineC.line.p1.x - circleC.point.x, lineC.line.p1.y - circleC.point.y);

  var a = d.Dot(d);
  var b = 2 * f.Dot(d);
  var c = f.Dot(f) - circleC.radius * circleC.radius;

  var discriminant = b * b - 4 * a * c;
  if (discriminant < 0) {
    // no intersection
  } else {
    // ray didn't totally miss sphere,
    // so there is a solution to
    // the equation.

    discriminant = Math.sqrt(discriminant);

    // either solution may be on or off the ray so need to test both
    // t1 is always the smaller value, because BOTH discriminant and
    // a are nonnegative.
    var t1 = (-b - discriminant) / (2 * a);
    var t2 = (-b + discriminant) / (2 * a);

    // 3x HIT cases:
    //          -o->             --|-->  |            |  --|->
    // Impale(t1 hit,t2 hit), Poke(t1 hit,t2>1), ExitWound(t1<0, t2 hit), 

    // 3x MISS cases:
    //       ->  o                     o ->              | -> |
    // FallShort (t1>1,t2>1), Past (t1<0,t2<0), CompletelyInside(t1<0, t2>1)

    if (t1 >= 0 && t1 <= 1) {
      // t1 is the intersection, and it's closer than t2
      // (since t1 uses -b - discriminant)
      // Impale, Poke
      return true;
    }

    // here t1 didn't intersect so we are either started
    // inside the sphere or completely past it
    if (t2 >= 0 && t2 <= 1) {
      // ExitWound
      return true;
    }

    if (t1 < 0 && t2 > 1) {
      return true;
    }

    // no intn: FallShort, Past, CompletelyInside
    return false;
  }
}

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map