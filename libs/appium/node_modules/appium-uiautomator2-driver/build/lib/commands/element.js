'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var commands = {},
    helpers = {},
    extensions = {};

function toBool(s) {
  return _lodash2['default'].isString(s) ? s.toLowerCase() === 'true' : !!s;
}

commands.getAttribute = function callee$0$0(attribute, elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/element/' + elementId + '/attribute/' + attribute, 'GET', {}));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.elementDisplayed = function callee$0$0(elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getAttribute("displayed", elementId));

      case 2:
        context$1$0.t0 = context$1$0.sent;
        return context$1$0.abrupt('return', toBool(context$1$0.t0));

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.elementEnabled = function callee$0$0(elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getAttribute("enabled", elementId));

      case 2:
        context$1$0.t0 = context$1$0.sent;
        return context$1$0.abrupt('return', toBool(context$1$0.t0));

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.elementSelected = function callee$0$0(elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getAttribute("selected", elementId));

      case 2:
        context$1$0.t0 = context$1$0.sent;
        return context$1$0.abrupt('return', toBool(context$1$0.t0));

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getName = function callee$0$0(elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/element/' + elementId + '/name', 'GET', {}));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getLocation = function callee$0$0(elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].info('calling get location: ' + elementId);
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/element/' + elementId + '/location', 'GET', {}));

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getSize = function callee$0$0(elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/element/' + elementId + '/size', 'GET', {}));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.touchLongClick = function callee$0$0(element, x, y, duration) {
  var params;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        params = { element: element, x: x, y: y, duration: duration };
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/touch/longclick', 'POST', { params: params }));

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.touchDown = function callee$0$0(element, x, y) {
  var params;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        params = { element: element, x: x, y: y };
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/touch/down', 'POST', { params: params }));

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.touchUp = function callee$0$0(element, x, y) {
  var params;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        params = { element: element, x: x, y: y };
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/touch/up', 'POST', { params: params }));

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.touchMove = function callee$0$0(element, x, y) {
  var params;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        params = { element: element, x: x, y: y };
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/touch/move', 'POST', { params: params }));

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.doSetElementValue = function callee$0$0(params) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/element/' + params.elementId + '/value', 'POST', params));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.setValueImmediate = function callee$0$0(keys, elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/element/' + elementId + '/value', 'POST', {
          elementId: elementId,
          text: _lodash2['default'].isArray(keys) ? keys.join('') : keys,
          replace: false,
          unicodeKeyboard: this.opts.unicodeKeyboard
        }));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getText = function callee$0$0(elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/element/' + elementId + '/text', 'GET', {}));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.click = function callee$0$0(element) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/element/' + element + '/click', 'POST', { element: element }));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getElementScreenshot = function callee$0$0(element) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/element/' + element + '/screenshot', 'GET', {}));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.tap = function callee$0$0(element) {
  var x = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
  var y = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
  var count = arguments.length <= 3 || arguments[3] === undefined ? 1 : arguments[3];
  var i, params;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        i = 0;

      case 1:
        if (!(i < count)) {
          context$1$0.next = 14;
          break;
        }

        if (!element) {
          context$1$0.next = 9;
          break;
        }

        params = { element: element };

        if (x !== 0 || y !== 0) {
          params.x = x;
          params.y = y;
        }
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/element/' + element + '/click', 'POST', params));

      case 7:
        context$1$0.next = 11;
        break;

      case 9:
        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/appium/tap', 'POST', { x: x, y: y }));

      case 11:
        i++;
        context$1$0.next = 1;
        break;

      case 14:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.clear = function callee$0$0(elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/element/' + elementId + '/clear', 'POST', { elementId: elementId }));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

_Object$assign(extensions, commands, helpers);
exports.commands = commands;
exports.helpers = helpers;
exports['default'] = extensions;

// we are either tapping on the default location of the element
// or an offset from the top left corner
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9lbGVtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztzQkFBZ0IsV0FBVzs7OztzQkFDYixRQUFROzs7O0FBRXRCLElBQUksUUFBUSxHQUFHLEVBQUU7SUFBRSxPQUFPLEdBQUcsRUFBRTtJQUFFLFVBQVUsR0FBRyxFQUFFLENBQUM7O0FBRWpELFNBQVMsTUFBTSxDQUFFLENBQUMsRUFBRTtBQUNsQixTQUFPLG9CQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBSSxDQUFDLENBQUMsV0FBVyxFQUFFLEtBQUssTUFBTSxHQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDM0Q7O0FBRUQsUUFBUSxDQUFDLFlBQVksR0FBRyxvQkFBZ0IsU0FBUyxFQUFFLFNBQVM7Ozs7O3lDQUM3QyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLGVBQWEsU0FBUyxtQkFBYyxTQUFTLEVBQUksS0FBSyxFQUFFLEVBQUUsQ0FBQzs7Ozs7Ozs7OztDQUMxRyxDQUFDOztBQUVGLFFBQVEsQ0FBQyxnQkFBZ0IsR0FBRyxvQkFBZ0IsU0FBUzs7Ozs7eUNBQy9CLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQzs7Ozs0Q0FBdEQsTUFBTTs7Ozs7OztDQUNkLENBQUM7O0FBRUYsUUFBUSxDQUFDLGNBQWMsR0FBRyxvQkFBZ0IsU0FBUzs7Ozs7eUNBQzdCLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQzs7Ozs0Q0FBcEQsTUFBTTs7Ozs7OztDQUNkLENBQUM7O0FBRUYsUUFBUSxDQUFDLGVBQWUsR0FBRyxvQkFBZ0IsU0FBUzs7Ozs7eUNBQzlCLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQzs7Ozs0Q0FBckQsTUFBTTs7Ozs7OztDQUNkLENBQUM7O0FBRUYsUUFBUSxDQUFDLE9BQU8sR0FBRyxvQkFBZ0IsU0FBUzs7Ozs7eUNBQzdCLElBQUksQ0FB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LENBQUM7QUFDYixnQkFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDZDs7eUNBQ0ssSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxlQUFhLE9BQU8sYUFBVSxNQUFNLEVBQUUsTUFBTSxDQUFDOzs7Ozs7Ozt5Q0FFOUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxnQkFBZ0IsTUFBTSxFQUFFLEVBQUMsQ0FBQyxFQUFELENBQUMsRUFBRSxDQUFDLEVBQUQsQ0FBQyxFQUFDLENBQUM7OztBQVgvQyxTQUFDLEVBQUU7Ozs7Ozs7OztDQWMvQixDQUFDOztBQUVGLFFBQVEsQ0FBQyxLQUFLLEdBQUcsb0JBQWdCLFNBQVM7Ozs7O3lDQUMzQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLGVBQWEsU0FBUyxhQUFVLE1BQU0sRUFBRSxFQUFDLFNBQVMsRUFBVCxTQUFTLEVBQUMsQ0FBQzs7Ozs7Ozs7OztDQUNuRyxDQUFDOztBQUVGLGVBQWMsVUFBVSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwQyxRQUFRLEdBQVIsUUFBUTtRQUFFLE9BQU8sR0FBUCxPQUFPO3FCQUNYLFVBQVUiLCJmaWxlIjoibGliL2NvbW1hbmRzL2VsZW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbG9nIGZyb20gJy4uL2xvZ2dlcic7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuXG5sZXQgY29tbWFuZHMgPSB7fSwgaGVscGVycyA9IHt9LCBleHRlbnNpb25zID0ge307XG5cbmZ1bmN0aW9uIHRvQm9vbCAocykge1xuICByZXR1cm4gXy5pc1N0cmluZyhzKSA/IChzLnRvTG93ZXJDYXNlKCkgPT09ICd0cnVlJykgOiAhIXM7XG59XG5cbmNvbW1hbmRzLmdldEF0dHJpYnV0ZSA9IGFzeW5jIGZ1bmN0aW9uIChhdHRyaWJ1dGUsIGVsZW1lbnRJZCkge1xuICByZXR1cm4gYXdhaXQgdGhpcy51aWF1dG9tYXRvcjIuandwcm94eS5jb21tYW5kKGAvZWxlbWVudC8ke2VsZW1lbnRJZH0vYXR0cmlidXRlLyR7YXR0cmlidXRlfWAsICdHRVQnLCB7fSk7XG59O1xuXG5jb21tYW5kcy5lbGVtZW50RGlzcGxheWVkID0gYXN5bmMgZnVuY3Rpb24gKGVsZW1lbnRJZCkge1xuICByZXR1cm4gdG9Cb29sKGF3YWl0IHRoaXMuZ2V0QXR0cmlidXRlKFwiZGlzcGxheWVkXCIsIGVsZW1lbnRJZCkpO1xufTtcblxuY29tbWFuZHMuZWxlbWVudEVuYWJsZWQgPSBhc3luYyBmdW5jdGlvbiAoZWxlbWVudElkKSB7XG4gIHJldHVybiB0b0Jvb2woYXdhaXQgdGhpcy5nZXRBdHRyaWJ1dGUoXCJlbmFibGVkXCIsIGVsZW1lbnRJZCkpO1xufTtcblxuY29tbWFuZHMuZWxlbWVudFNlbGVjdGVkID0gYXN5bmMgZnVuY3Rpb24gKGVsZW1lbnRJZCkge1xuICByZXR1cm4gdG9Cb29sKGF3YWl0IHRoaXMuZ2V0QXR0cmlidXRlKFwic2VsZWN0ZWRcIiwgZWxlbWVudElkKSk7XG59O1xuXG5jb21tYW5kcy5nZXROYW1lID0gYXN5bmMgZnVuY3Rpb24gKGVsZW1lbnRJZCkge1xuICByZXR1cm4gYXdhaXQgdGhpcy51aWF1dG9tYXRvcjIuandwcm94eS5jb21tYW5kKGAvZWxlbWVudC8ke2VsZW1lbnRJZH0vbmFtZWAsICdHRVQnLCB7fSk7XG59O1xuXG5jb21tYW5kcy5nZXRMb2NhdGlvbiA9IGFzeW5jIGZ1bmN0aW9uIChlbGVtZW50SWQpIHtcbiAgbG9nLmluZm8oYGNhbGxpbmcgZ2V0IGxvY2F0aW9uOiAke2VsZW1lbnRJZH1gKTtcbiAgcmV0dXJuIGF3YWl0IHRoaXMudWlhdXRvbWF0b3IyLmp3cHJveHkuY29tbWFuZChgL2VsZW1lbnQvJHtlbGVtZW50SWR9L2xvY2F0aW9uYCwgJ0dFVCcsIHt9KTtcbn07XG5cbmNvbW1hbmRzLmdldFNpemUgPSBhc3luYyBmdW5jdGlvbiAoZWxlbWVudElkKSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLnVpYXV0b21hdG9yMi5qd3Byb3h5LmNvbW1hbmQoYC9lbGVtZW50LyR7ZWxlbWVudElkfS9zaXplYCwgJ0dFVCcsIHt9KTtcbn07XG5cbmNvbW1hbmRzLnRvdWNoTG9uZ0NsaWNrID0gYXN5bmMgZnVuY3Rpb24gKGVsZW1lbnQsIHgsIHksIGR1cmF0aW9uKSB7XG4gIGxldCBwYXJhbXMgPSB7ZWxlbWVudCwgeCwgeSwgZHVyYXRpb259O1xuICByZXR1cm4gYXdhaXQgdGhpcy51aWF1dG9tYXRvcjIuandwcm94eS5jb21tYW5kKGAvdG91Y2gvbG9uZ2NsaWNrYCwgJ1BPU1QnLCB7cGFyYW1zfSk7XG59O1xuXG5jb21tYW5kcy50b3VjaERvd24gPSBhc3luYyBmdW5jdGlvbiAoZWxlbWVudCwgeCwgeSkge1xuICBsZXQgcGFyYW1zID0ge2VsZW1lbnQsIHgsIHl9O1xuICByZXR1cm4gYXdhaXQgdGhpcy51aWF1dG9tYXRvcjIuandwcm94eS5jb21tYW5kKGAvdG91Y2gvZG93bmAsICdQT1NUJywge3BhcmFtc30pO1xufTtcblxuY29tbWFuZHMudG91Y2hVcCA9IGFzeW5jIGZ1bmN0aW9uIChlbGVtZW50LCB4LCB5KSB7XG4gIGxldCBwYXJhbXMgPSB7ZWxlbWVudCwgeCwgeX07XG4gIHJldHVybiBhd2FpdCB0aGlzLnVpYXV0b21hdG9yMi5qd3Byb3h5LmNvbW1hbmQoYC90b3VjaC91cGAsICdQT1NUJywge3BhcmFtc30pO1xufTtcblxuY29tbWFuZHMudG91Y2hNb3ZlID0gYXN5bmMgZnVuY3Rpb24gKGVsZW1lbnQsIHgsIHkpIHtcbiAgbGV0IHBhcmFtcyA9IHtlbGVtZW50LCB4LCB5fTtcbiAgcmV0dXJuIGF3YWl0IHRoaXMudWlhdXRvbWF0b3IyLmp3cHJveHkuY29tbWFuZChgL3RvdWNoL21vdmVgLCAnUE9TVCcsIHtwYXJhbXN9KTtcbn07XG5cbmhlbHBlcnMuZG9TZXRFbGVtZW50VmFsdWUgPSBhc3luYyBmdW5jdGlvbiAocGFyYW1zKSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLnVpYXV0b21hdG9yMi5qd3Byb3h5LmNvbW1hbmQoYC9lbGVtZW50LyR7cGFyYW1zLmVsZW1lbnRJZH0vdmFsdWVgLCAnUE9TVCcsIHBhcmFtcyk7XG59O1xuXG5jb21tYW5kcy5zZXRWYWx1ZUltbWVkaWF0ZSA9IGFzeW5jIGZ1bmN0aW9uIChrZXlzLCBlbGVtZW50SWQpIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMudWlhdXRvbWF0b3IyLmp3cHJveHkuY29tbWFuZChgL2VsZW1lbnQvJHtlbGVtZW50SWR9L3ZhbHVlYCwgJ1BPU1QnLCB7XG4gICAgZWxlbWVudElkLFxuICAgIHRleHQ6IF8uaXNBcnJheShrZXlzKSA/IGtleXMuam9pbignJykgOiBrZXlzLFxuICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgIHVuaWNvZGVLZXlib2FyZDogdGhpcy5vcHRzLnVuaWNvZGVLZXlib2FyZCxcbiAgfSk7XG59O1xuXG5jb21tYW5kcy5nZXRUZXh0ID0gYXN5bmMgZnVuY3Rpb24gKGVsZW1lbnRJZCkge1xuICByZXR1cm4gYXdhaXQgdGhpcy51aWF1dG9tYXRvcjIuandwcm94eS5jb21tYW5kKGAvZWxlbWVudC8ke2VsZW1lbnRJZH0vdGV4dGAsICdHRVQnLCB7fSk7XG59O1xuXG5jb21tYW5kcy5jbGljayA9IGFzeW5jIGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLnVpYXV0b21hdG9yMi5qd3Byb3h5LmNvbW1hbmQoYC9lbGVtZW50LyR7ZWxlbWVudH0vY2xpY2tgLCAnUE9TVCcsIHtlbGVtZW50fSk7XG59O1xuXG5jb21tYW5kcy5nZXRFbGVtZW50U2NyZWVuc2hvdCA9IGFzeW5jIGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLnVpYXV0b21hdG9yMi5qd3Byb3h5LmNvbW1hbmQoYC9lbGVtZW50LyR7ZWxlbWVudH0vc2NyZWVuc2hvdGAsICdHRVQnLCB7fSk7XG59O1xuXG5jb21tYW5kcy50YXAgPSBhc3luYyBmdW5jdGlvbiAoZWxlbWVudCwgeCA9IDAsIHkgPSAwLCBjb3VudCA9IDEpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIC8vIHdlIGFyZSBlaXRoZXIgdGFwcGluZyBvbiB0aGUgZGVmYXVsdCBsb2NhdGlvbiBvZiB0aGUgZWxlbWVudFxuICAgICAgLy8gb3IgYW4gb2Zmc2V0IGZyb20gdGhlIHRvcCBsZWZ0IGNvcm5lclxuICAgICAgbGV0IHBhcmFtcyA9IHtlbGVtZW50fTtcbiAgICAgIGlmICh4ICE9PSAwIHx8IHkgIT09IDApIHtcbiAgICAgICAgcGFyYW1zLnggPSB4O1xuICAgICAgICBwYXJhbXMueSA9IHk7XG4gICAgICB9XG4gICAgICBhd2FpdCB0aGlzLnVpYXV0b21hdG9yMi5qd3Byb3h5LmNvbW1hbmQoYC9lbGVtZW50LyR7ZWxlbWVudH0vY2xpY2tgLCAnUE9TVCcsIHBhcmFtcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF3YWl0IHRoaXMudWlhdXRvbWF0b3IyLmp3cHJveHkuY29tbWFuZChgL2FwcGl1bS90YXBgLCAnUE9TVCcsIHt4LCB5fSk7XG4gICAgfVxuICB9XG59O1xuXG5jb21tYW5kcy5jbGVhciA9IGFzeW5jIGZ1bmN0aW9uIChlbGVtZW50SWQpIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMudWlhdXRvbWF0b3IyLmp3cHJveHkuY29tbWFuZChgL2VsZW1lbnQvJHtlbGVtZW50SWR9L2NsZWFyYCwgJ1BPU1QnLCB7ZWxlbWVudElkfSk7XG59O1xuXG5PYmplY3QuYXNzaWduKGV4dGVuc2lvbnMsIGNvbW1hbmRzLCBoZWxwZXJzKTtcbmV4cG9ydCB7IGNvbW1hbmRzLCBoZWxwZXJzIH07XG5leHBvcnQgZGVmYXVsdCBleHRlbnNpb25zO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLiJ9
