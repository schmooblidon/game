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

console.log(navigator.getGamepads());

// defining the game logic loop
function gameLoop() {
  p.input.updateInput();
  (0, _physics.physics)(p);

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
      (0, _render.updateRenderObjects)();
      two.play();
    }
    setTimeout(function () {
      start();
    }, 16.6666667);
  }
}
/*export let tail = [];
export let tailgroup = [];
for (let i=0;i<29;i++) {
  tail[i] = two.makeCircle(0, 0, 10);
  tail[i].fill = "#ff8000";
  tail[i].translation.set(two.width/2 + i, two.height/2 + i);
}*/

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
  this.a = [false];

  this.angle = [0];
  this.magnitude = [0];

  this.updateInput = function () {
    // push inputs back a frame in history
    for (var i = 4; i > 0; i--) {
      this.lStickX[i] = this.lStickX[i - 1];
      this.lStickY[i] = this.lStickY[i - 1];
      this.a[i] = this.a[i - 1];
      this.angle[i] = this.angle[i - 1];
      this.magnitude[i] = this.magnitude[i - 1];
    }

    // if using keyboard
    if (this.controllerIndex === -1) {
      this.lStickX[0] = (keys[68] || keys[39] ? 1 : 0) + (keys[65] || keys[37] ? -1 : 0);
      this.lStickY[0] = (keys[87] || keys[38] ? 1 : 0) + (keys[83] || keys[40] ? -1 : 0);
      this.a[0] = keys[32] || keys[90];
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
        for (var j = 0; j < gamepads[i].buttons.length; j++) {
          if (gamepads[i].buttons[j].pressed) {
            p.input.controllerIndex = i;
            return true;
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

  // find distance between target angle and current angle
  var angDiff = p.input.angle[0] - p.angle;

  // make sure distance uses shortest path (check going through -pi / pi breakpoint)
  angDiff = Math.atan2(Math.sin(angDiff), Math.cos(angDiff));

  // move current angle towards target according to distance with multipliers
  //p.angle += angDiff * 0.2 * p.input.magnitude[0];
  p.angle += Math.sign(angDiff) * Math.min(Math.abs(angDiff), 0.1) * p.input.magnitude[0];

  p.vel.x = Math.cos(p.angle) * p.speed;
  p.vel.y = Math.sin(p.angle) * p.speed;

  for (var i = 29; i > 0; i--) {
    p.pos[i].x = p.pos[i - 1].x;
    p.pos[i].y = p.pos[i - 1].y;
  }

  p.pos[0].x += p.vel.x;
  p.pos[0].y += p.vel.y;
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
  for (var i = 0; i < 30; i++) {
    this.pos[i] = new _Vec.Vec();
  }
  this.vel = new _Vec.Vec();
  this.angle = Math.PI / 2;
  this.speed = 5;

  this.input = new _input.input();

  this.tail = [];
  for (var _i = 0; _i < 29; _i++) {
    this.tail[_i] = _main.two.makeCircle(_i, _i, 5);
    this.tail[_i].fill = "#ff8000";
  }
  this.tailgroup = _main.two.makeGroup(this.tail);
  this.tailgroup.translation.set(_main.two.width / 2, _main.two.height / 2);
  this.tailgroup.noStroke();

  this.head = _main.two.makeCircle(0, 0, 10);
  this.head.fill = "#ff8000";

  this.group = _main.two.makeGroup(this.head);
  this.group.translation.set(_main.two.width / 2, _main.two.height / 2);
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
  _main.two.bind('update', function (frameCount) {
    _main.p.group.translation.set(_main.two.width / 2 + _main.p.pos[0].x, _main.two.height / 2 + _main.p.pos[0].y * -1);
    _main.p.tailgroup.translation.set(_main.two.width / 2, _main.two.height / 2);
    for (var i = 0; i < 29; i++) {
      _main.p.tail[i].translation.set(_main.p.pos[i + 1].x, _main.p.pos[i + 1].y * -1);
    }
  });
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