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

// setting up renderer
var elem = document.getElementById("game");
var params = { fullscreen: true };
var two = exports.two = new Two(params).appendTo(elem);

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
    (0, _render.updateRenderObjects)();
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

  for (var i = p.tailLength - 1; i > 0; i--) {
    p.pos[i].x = p.pos[i - 1].x;
    p.pos[i].y = p.pos[i - 1].y;
    p.colours[i] = p.colours[i - 1];
    p.wrapped[i] = p.wrapped[i - 1];
  }

  p.pos[0].x += p.vel.x;
  p.pos[0].y += p.vel.y;

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

var _main = __webpack_require__(0);

var _input = __webpack_require__(1);

function player() {
  this.pos = [];
  this.colours = [];

  this.tailLength = 60;

  for (var i = 0; i < this.tailLength; i++) {
    this.pos[i] = new _Vec.Vec();
    this.colours[i] = "rgb(255,255,0)";
  }
  this.vel = new _Vec.Vec();
  this.angle = Math.PI / 2;
  this.speed = 5;
  this.minSpeed = 2;
  this.maxSpeed = 10;
  this.normalSpeed = 5;
  this.acceleration = 0;
  this.friction = 0.1;

  this.ease = 0.2;
  this.rotation = 0.1;

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

  //this.head = two.makeCircle(0, 0, 10);
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

function updateRenderObjects() {
  _main.p.group.translation.set(_main.two.width / 2 + _main.p.pos[0].x, _main.two.height / 2 + _main.p.pos[0].y * -1);
  _main.p.group.rotation = -_main.p.angle;
  _main.p.group.fill = _main.p.colours[0];
  for (var i = 0; i < _main.p.tailLength - 1; i++) {
    _main.p.tail[i].vertices[0].x = _main.p.pos[i].x;
    _main.p.tail[i].vertices[0].y = _main.p.pos[i].y * -1;
    if (_main.p.wrapped[i]) {
      _main.p.tail[i].vertices[1].x = _main.p.pos[i].x;
      _main.p.tail[i].vertices[1].y = _main.p.pos[i].y * -1;
    } else {
      _main.p.tail[i].vertices[1].x = _main.p.pos[i + 1].x;
      _main.p.tail[i].vertices[1].y = _main.p.pos[i + 1].y * -1;
    }
    _main.p.tail[i].stroke = _main.p.colours[i + 1];
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
}

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map