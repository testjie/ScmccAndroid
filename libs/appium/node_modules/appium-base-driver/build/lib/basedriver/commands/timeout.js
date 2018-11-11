'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _asyncbox = require('asyncbox');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumSupport = require('appium-support');

var _protocol = require('../../protocol');

var _driver = require("../driver");

var _driver2 = _interopRequireDefault(_driver);

var commands = {},
    helpers = {},
    extensions = {};

var MIN_TIMEOUT = 0;

// If we define `commands.timeouts` instead of `commands.timeoutsW3C`, the command `timeouts` will be called
// from other dirver's timeouts. See https://github.com/appium/appium-base-driver/pull/164
// Arguments will be: [{"protocol":"W3C","implicit":30000}, "1dcfe021-8fc8-49bd-8dac-e986d3091b97", ...]
// eslint-disable-next-line no-unused-vars
commands.timeouts = function callee$0$0(timeoutsObj) {
  var script, pageLoad, implicit, type, ms;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(timeoutsObj.protocol === _driver2['default'].DRIVER_PROTOCOL.W3C)) {
          context$1$0.next = 16;
          break;
        }

        script = timeoutsObj.script;
        pageLoad = timeoutsObj.pageLoad;
        implicit = timeoutsObj.implicit;

        _logger2['default'].debug('script: ' + script + ', pageLoad: ' + pageLoad + ', implicit: ' + implicit);

        if (!_appiumSupport.util.hasValue(script)) {
          context$1$0.next = 8;
          break;
        }

        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.scriptTimeoutW3C(script));

      case 8:
        if (!_appiumSupport.util.hasValue(pageLoad)) {
          context$1$0.next = 11;
          break;
        }

        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(this.pageLoadTimeoutW3C(pageLoad));

      case 11:
        if (!_appiumSupport.util.hasValue(implicit)) {
          context$1$0.next = 14;
          break;
        }

        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(this.implicitWaitW3C(implicit));

      case 14:
        context$1$0.next = 35;
        break;

      case 16:
        type = timeoutsObj.type;
        ms = timeoutsObj.ms;

        _logger2['default'].debug('type: ' + type + ', ms: ' + ms);

        context$1$0.t0 = type;
        context$1$0.next = context$1$0.t0 === 'command' ? 22 : context$1$0.t0 === 'implicit' ? 25 : context$1$0.t0 === 'page load' ? 28 : context$1$0.t0 === 'script' ? 31 : 34;
        break;

      case 22:
        context$1$0.next = 24;
        return _regeneratorRuntime.awrap(this.newCommandTimeout(ms));

      case 24:
        return context$1$0.abrupt('break', 35);

      case 25:
        context$1$0.next = 27;
        return _regeneratorRuntime.awrap(this.implicitWaitMJSONWP(ms));

      case 27:
        return context$1$0.abrupt('break', 35);

      case 28:
        context$1$0.next = 30;
        return _regeneratorRuntime.awrap(this.pageLoadTimeoutMJSONWP(ms));

      case 30:
        return context$1$0.abrupt('break', 35);

      case 31:
        context$1$0.next = 33;
        return _regeneratorRuntime.awrap(this.scriptTimeoutMJSONWP(ms));

      case 33:
        return context$1$0.abrupt('break', 35);

      case 34:
        throw new Error('\'' + type + '\' is not supported');

      case 35:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getTimeouts = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        return context$1$0.abrupt('return', {
          command: this.newCommandTimeoutMs,
          implicit: this.implicitWaitMs
        });

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// implicit
commands.implicitWaitW3C = function callee$0$0(ms) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.implicitWait(ms));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.implicitWaitMJSONWP = function callee$0$0(ms) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.implicitWait(ms));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.implicitWait = function callee$0$0(ms) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.setImplicitWait(this.parseTimeoutArgument(ms)));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.setImplicitWait = function (ms) {
  this.implicitWaitMs = ms;
  _logger2['default'].debug('Set implicit wait to ' + ms + 'ms');
  if (this.managedDrivers && this.managedDrivers.length) {
    _logger2['default'].debug('Setting implicit wait on managed drivers');
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _getIterator(this.managedDrivers), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var driver = _step.value;

        if (_lodash2['default'].isFunction(driver.setImplicitWait)) {
          driver.setImplicitWait(ms);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
};

// pageLoad
// eslint-disable-next-line no-unused-vars
commands.pageLoadTimeoutW3C = function callee$0$0(ms) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        throw new _protocol.errors.NotImplementedError('Not implemented yet for pageLoad.');

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// eslint-disable-next-line no-unused-vars
commands.pageLoadTimeoutMJSONWP = function callee$0$0(ms) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        throw new _protocol.errors.NotImplementedError('Not implemented yet for pageLoad.');

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// script
// eslint-disable-next-line no-unused-vars
commands.scriptTimeoutW3C = function callee$0$0(ms) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        throw new _protocol.errors.NotImplementedError('Not implemented yet for script.');

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// eslint-disable-next-line no-unused-vars
commands.scriptTimeoutMJSONWP = function callee$0$0(ms) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        throw new _protocol.errors.NotImplementedError('Not implemented yet for script.');

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// command
commands.newCommandTimeout = function callee$0$0(ms) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        this.setNewCommandTimeout(this.parseTimeoutArgument(ms));

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.setNewCommandTimeout = function (ms) {
  this.newCommandTimeoutMs = ms;
  _logger2['default'].debug('Set new command timeout to ' + ms + 'ms');
  if (this.managedDrivers && this.managedDrivers.length) {
    _logger2['default'].debug('Setting new command timeout on managed drivers');
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = _getIterator(this.managedDrivers), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var driver = _step2.value;

        if (_lodash2['default'].isFunction(driver.setNewCommandTimeout)) {
          driver.setNewCommandTimeout(ms);
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }
};

helpers.clearNewCommandTimeout = function () {
  if (this.noCommandTimer) {
    this.noCommandTimer.cancel();
    this.noCommandTimer = null;
  }
};

helpers.startNewCommandTimeout = function () {
  var _this = this;

  // make sure there are no rogue timeouts
  this.clearNewCommandTimeout();

  // if command timeout is 0, it is disabled
  if (!this.newCommandTimeoutMs) return; // eslint-disable-line curly

  this.noCommandTimer = _appiumSupport.util.cancellableDelay(this.newCommandTimeoutMs);
  this.noCommandTimer.then(function callee$1$0() {
    var errorMessage;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          // eslint-disable-line promise/prefer-await-to-then
          _logger2['default'].warn('Shutting down because we waited ' + (this.newCommandTimeoutMs / 1000 + ' seconds for a command'));
          errorMessage = 'New Command Timeout of ' + (this.newCommandTimeoutMs / 1000 + ' seconds ') + 'expired. Try customizing the timeout using the ' + '\'newCommandTimeout\' desired capability';
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(this.startUnexpectedShutdown(new Error(errorMessage)));

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  })['catch'](_bluebird2['default'].CancellationError, function () /*err*/{
    // ignore
  });
};

helpers.implicitWaitForCondition = function callee$0$0(condFn) {
  var wrappedCondFn;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _arguments = arguments,
        _this2 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].debug('Waiting up to ' + this.implicitWaitMs + ' ms for condition');

        wrappedCondFn = function wrappedCondFn() {
          var args$2$0 = _arguments;
          return _regeneratorRuntime.async(function wrappedCondFn$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                // reset command timeout
                this.clearNewCommandTimeout();

                context$2$0.next = 3;
                return _regeneratorRuntime.awrap(condFn.apply(undefined, args$2$0));

              case 3:
                return context$2$0.abrupt('return', context$2$0.sent);

              case 4:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this2);
        };

        context$1$0.next = 4;
        return _regeneratorRuntime.awrap((0, _asyncbox.waitForCondition)(wrappedCondFn, {
          waitMs: this.implicitWaitMs, intervalMs: 500, logger: _logger2['default']
        }));

      case 4:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.parseTimeoutArgument = function (ms) {
  var duration = parseInt(ms, 10);
  if (_lodash2['default'].isNaN(duration) || duration < MIN_TIMEOUT) {
    throw new _protocol.errors.UnknownError('Invalid timeout value \'' + ms + '\'');
  }
  return duration;
};

_Object$assign(extensions, commands, helpers);
exports.commands = commands;
exports.helpers = helpers;
exports['default'] = extensions;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9iYXNlZHJpdmVyL2NvbW1hbmRzL3RpbWVvdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7c0JBQWdCLFdBQVc7Ozs7d0JBQ00sVUFBVTs7d0JBQzdCLFVBQVU7Ozs7c0JBQ1YsUUFBUTs7Ozs2QkFDRCxnQkFBZ0I7O3dCQUNkLGdCQUFnQjs7c0JBQ2hCLFdBQVc7Ozs7QUFHbEMsSUFBSSxRQUFRLEdBQUcsRUFBRTtJQUFFLE9BQU8sR0FBRyxFQUFFO0lBQUUsVUFBVSxHQUFHLEVBQUUsQ0FBQzs7QUFFakQsSUFBTSxXQUFXLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7QUFNdEIsUUFBUSxDQUFDLFFBQVEsR0FBRyxvQkFBZ0IsV0FBVztNQUVwQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFlMUIsSUFBSSxFQUFFLEVBQUU7Ozs7Y0FoQmIsV0FBVyxDQUFDLFFBQVEsS0FBSyxvQkFBVyxlQUFlLENBQUMsR0FBRyxDQUFBOzs7OztBQUNsRCxjQUFNLEdBQXdCLFdBQVcsQ0FBekMsTUFBTTtBQUFFLGdCQUFRLEdBQWMsV0FBVyxDQUFqQyxRQUFRO0FBQUUsZ0JBQVEsR0FBSSxXQUFXLENBQXZCLFFBQVE7O0FBQ2pDLDRCQUFJLEtBQUssY0FBWSxNQUFNLG9CQUFlLFFBQVEsb0JBQWUsUUFBUSxDQUFHLENBQUM7O2FBRXpFLG9CQUFLLFFBQVEsQ0FBQyxNQUFNLENBQUM7Ozs7Ozt5Q0FDakIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQzs7O2FBR2pDLG9CQUFLLFFBQVEsQ0FBQyxRQUFRLENBQUM7Ozs7Ozt5Q0FDbkIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQzs7O2FBR3JDLG9CQUFLLFFBQVEsQ0FBQyxRQUFRLENBQUM7Ozs7Ozt5Q0FDbkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUM7Ozs7Ozs7QUFHL0IsWUFBSSxHQUFRLFdBQVcsQ0FBdkIsSUFBSTtBQUFFLFVBQUUsR0FBSSxXQUFX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SUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7Ozs7Ozs7R0FDNUQsQ0FBQyxTQUNJLENBQUMsc0JBQUUsaUJBQWlCLEVBQUUsbUJBQWE7O0dBRXhDLENBQUMsQ0FBQztDQUNOLENBQUM7O0FBRUYsT0FBTyxDQUFDLHdCQUF3QixHQUFHLG9CQUFnQixNQUFNO01BRW5ELGFBQWE7Ozs7Ozs7QUFEakIsNEJBQUksS0FBSyxvQkFBa0IsSUFBSSxDQUFDLGNBQWMsdUJBQW9CLENBQUM7O0FBQy9ELHFCQUFhLEdBQUcsU0FBaEIsYUFBYTs7Ozs7O0FBRWYsb0JBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDOzs7aURBRWpCLE1BQU0sMkJBQVM7Ozs7Ozs7Ozs7U0FDN0I7Ozt5Q0FDWSxnQ0FBaUIsYUFBYSxFQUFFO0FBQzNDLGdCQUFNLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLE1BQU0scUJBQUs7U0FDMUQsQ0FBQzs7Ozs7Ozs7OztDQUNILENBQUM7O0FBRUYsT0FBTyxDQUFDLG9CQUFvQixHQUFHLFVBQVUsRUFBRSxFQUFFO0FBQzNDLE1BQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDaEMsTUFBSSxvQkFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksUUFBUSxHQUFHLFdBQVcsRUFBRTtBQUMvQyxVQUFNLElBQUksaUJBQU8sWUFBWSw4QkFBMkIsRUFBRSxRQUFJLENBQUM7R0FDaEU7QUFDRCxTQUFPLFFBQVEsQ0FBQztDQUNqQixDQUFDOztBQUVGLGVBQWMsVUFBVSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwQyxRQUFRLEdBQVIsUUFBUTtRQUFFLE9BQU8sR0FBUCxPQUFPO3FCQUNYLFVBQVUiLCJmaWxlIjoibGliL2Jhc2Vkcml2ZXIvY29tbWFuZHMvdGltZW91dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBsb2cgZnJvbSAnLi4vbG9nZ2VyJztcbmltcG9ydCB7IHdhaXRGb3JDb25kaXRpb24gfSBmcm9tICdhc3luY2JveCc7XG5pbXBvcnQgQiBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgdXRpbCB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCB7IGVycm9ycyB9IGZyb20gJy4uLy4uL3Byb3RvY29sJztcbmltcG9ydCBCYXNlRHJpdmVyIGZyb20gXCIuLi9kcml2ZXJcIjtcblxuXG5sZXQgY29tbWFuZHMgPSB7fSwgaGVscGVycyA9IHt9LCBleHRlbnNpb25zID0ge307XG5cbmNvbnN0IE1JTl9USU1FT1VUID0gMDtcblxuLy8gSWYgd2UgZGVmaW5lIGBjb21tYW5kcy50aW1lb3V0c2AgaW5zdGVhZCBvZiBgY29tbWFuZHMudGltZW91dHNXM0NgLCB0aGUgY29tbWFuZCBgdGltZW91dHNgIHdpbGwgYmUgY2FsbGVkXG4vLyBmcm9tIG90aGVyIGRpcnZlcidzIHRpbWVvdXRzLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2FwcGl1bS9hcHBpdW0tYmFzZS1kcml2ZXIvcHVsbC8xNjRcbi8vIEFyZ3VtZW50cyB3aWxsIGJlOiBbe1wicHJvdG9jb2xcIjpcIlczQ1wiLFwiaW1wbGljaXRcIjozMDAwMH0sIFwiMWRjZmUwMjEtOGZjOC00OWJkLThkYWMtZTk4NmQzMDkxYjk3XCIsIC4uLl1cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuY29tbWFuZHMudGltZW91dHMgPSBhc3luYyBmdW5jdGlvbiAodGltZW91dHNPYmopIHtcbiAgaWYgKHRpbWVvdXRzT2JqLnByb3RvY29sID09PSBCYXNlRHJpdmVyLkRSSVZFUl9QUk9UT0NPTC5XM0MpIHtcbiAgICBjb25zdCB7c2NyaXB0LCBwYWdlTG9hZCwgaW1wbGljaXR9ID0gdGltZW91dHNPYmo7XG4gICAgbG9nLmRlYnVnKGBzY3JpcHQ6ICR7c2NyaXB0fSwgcGFnZUxvYWQ6ICR7cGFnZUxvYWR9LCBpbXBsaWNpdDogJHtpbXBsaWNpdH1gKTtcblxuICAgIGlmICh1dGlsLmhhc1ZhbHVlKHNjcmlwdCkpIHtcbiAgICAgIGF3YWl0IHRoaXMuc2NyaXB0VGltZW91dFczQyhzY3JpcHQpO1xuICAgIH1cblxuICAgIGlmICh1dGlsLmhhc1ZhbHVlKHBhZ2VMb2FkKSkge1xuICAgICAgYXdhaXQgdGhpcy5wYWdlTG9hZFRpbWVvdXRXM0MocGFnZUxvYWQpO1xuICAgIH1cblxuICAgIGlmICh1dGlsLmhhc1ZhbHVlKGltcGxpY2l0KSkge1xuICAgICAgYXdhaXQgdGhpcy5pbXBsaWNpdFdhaXRXM0MoaW1wbGljaXQpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb25zdCB7dHlwZSwgbXN9ID0gdGltZW91dHNPYmo7XG4gICAgbG9nLmRlYnVnKGB0eXBlOiAke3R5cGV9LCBtczogJHttc31gKTtcblxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnY29tbWFuZCc6XG4gICAgICAgIGF3YWl0IHRoaXMubmV3Q29tbWFuZFRpbWVvdXQobXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2ltcGxpY2l0JzpcbiAgICAgICAgYXdhaXQgdGhpcy5pbXBsaWNpdFdhaXRNSlNPTldQKG1zKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdwYWdlIGxvYWQnOlxuICAgICAgICBhd2FpdCB0aGlzLnBhZ2VMb2FkVGltZW91dE1KU09OV1AobXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3NjcmlwdCc6XG4gICAgICAgIGF3YWl0IHRoaXMuc2NyaXB0VGltZW91dE1KU09OV1AobXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgJyR7dHlwZX0nIGlzIG5vdCBzdXBwb3J0ZWRgKTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbW1hbmRzLmdldFRpbWVvdXRzID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICByZXR1cm4ge1xuICAgIGNvbW1hbmQ6IHRoaXMubmV3Q29tbWFuZFRpbWVvdXRNcyxcbiAgICBpbXBsaWNpdDogdGhpcy5pbXBsaWNpdFdhaXRNcyxcbiAgfTtcbn07XG5cbi8vIGltcGxpY2l0XG5jb21tYW5kcy5pbXBsaWNpdFdhaXRXM0MgPSBhc3luYyBmdW5jdGlvbiAobXMpIHtcbiAgYXdhaXQgdGhpcy5pbXBsaWNpdFdhaXQobXMpO1xufTtcblxuY29tbWFuZHMuaW1wbGljaXRXYWl0TUpTT05XUCA9IGFzeW5jIGZ1bmN0aW9uIChtcykge1xuICBhd2FpdCB0aGlzLmltcGxpY2l0V2FpdChtcyk7XG59O1xuXG5jb21tYW5kcy5pbXBsaWNpdFdhaXQgPSBhc3luYyBmdW5jdGlvbiAobXMpIHtcbiAgYXdhaXQgdGhpcy5zZXRJbXBsaWNpdFdhaXQodGhpcy5wYXJzZVRpbWVvdXRBcmd1bWVudChtcykpO1xufTtcblxuaGVscGVycy5zZXRJbXBsaWNpdFdhaXQgPSBmdW5jdGlvbiAobXMpIHtcbiAgdGhpcy5pbXBsaWNpdFdhaXRNcyA9IG1zO1xuICBsb2cuZGVidWcoYFNldCBpbXBsaWNpdCB3YWl0IHRvICR7bXN9bXNgKTtcbiAgaWYgKHRoaXMubWFuYWdlZERyaXZlcnMgJiYgdGhpcy5tYW5hZ2VkRHJpdmVycy5sZW5ndGgpIHtcbiAgICBsb2cuZGVidWcoJ1NldHRpbmcgaW1wbGljaXQgd2FpdCBvbiBtYW5hZ2VkIGRyaXZlcnMnKTtcbiAgICBmb3IgKGxldCBkcml2ZXIgb2YgdGhpcy5tYW5hZ2VkRHJpdmVycykge1xuICAgICAgaWYgKF8uaXNGdW5jdGlvbihkcml2ZXIuc2V0SW1wbGljaXRXYWl0KSkge1xuICAgICAgICBkcml2ZXIuc2V0SW1wbGljaXRXYWl0KG1zKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbi8vIHBhZ2VMb2FkXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbmNvbW1hbmRzLnBhZ2VMb2FkVGltZW91dFczQyA9IGFzeW5jIGZ1bmN0aW9uIChtcykge1xuICB0aHJvdyBuZXcgZXJyb3JzLk5vdEltcGxlbWVudGVkRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCB5ZXQgZm9yIHBhZ2VMb2FkLicpO1xufTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5jb21tYW5kcy5wYWdlTG9hZFRpbWVvdXRNSlNPTldQID0gYXN5bmMgZnVuY3Rpb24gKG1zKSB7XG4gIHRocm93IG5ldyBlcnJvcnMuTm90SW1wbGVtZW50ZWRFcnJvcignTm90IGltcGxlbWVudGVkIHlldCBmb3IgcGFnZUxvYWQuJyk7XG59O1xuXG4vLyBzY3JpcHRcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuY29tbWFuZHMuc2NyaXB0VGltZW91dFczQyA9IGFzeW5jIGZ1bmN0aW9uIChtcykge1xuICB0aHJvdyBuZXcgZXJyb3JzLk5vdEltcGxlbWVudGVkRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCB5ZXQgZm9yIHNjcmlwdC4nKTtcbn07XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuY29tbWFuZHMuc2NyaXB0VGltZW91dE1KU09OV1AgPSBhc3luYyBmdW5jdGlvbiAobXMpIHtcbiAgdGhyb3cgbmV3IGVycm9ycy5Ob3RJbXBsZW1lbnRlZEVycm9yKCdOb3QgaW1wbGVtZW50ZWQgeWV0IGZvciBzY3JpcHQuJyk7XG59O1xuXG4vLyBjb21tYW5kXG5jb21tYW5kcy5uZXdDb21tYW5kVGltZW91dCA9IGFzeW5jIGZ1bmN0aW9uIChtcykge1xuICB0aGlzLnNldE5ld0NvbW1hbmRUaW1lb3V0KHRoaXMucGFyc2VUaW1lb3V0QXJndW1lbnQobXMpKTtcbn07XG5cbmhlbHBlcnMuc2V0TmV3Q29tbWFuZFRpbWVvdXQgPSBmdW5jdGlvbiAobXMpIHtcbiAgdGhpcy5uZXdDb21tYW5kVGltZW91dE1zID0gbXM7XG4gIGxvZy5kZWJ1ZyhgU2V0IG5ldyBjb21tYW5kIHRpbWVvdXQgdG8gJHttc31tc2ApO1xuICBpZiAodGhpcy5tYW5hZ2VkRHJpdmVycyAmJiB0aGlzLm1hbmFnZWREcml2ZXJzLmxlbmd0aCkge1xuICAgIGxvZy5kZWJ1ZygnU2V0dGluZyBuZXcgY29tbWFuZCB0aW1lb3V0IG9uIG1hbmFnZWQgZHJpdmVycycpO1xuICAgIGZvciAobGV0IGRyaXZlciBvZiB0aGlzLm1hbmFnZWREcml2ZXJzKSB7XG4gICAgICBpZiAoXy5pc0Z1bmN0aW9uKGRyaXZlci5zZXROZXdDb21tYW5kVGltZW91dCkpIHtcbiAgICAgICAgZHJpdmVyLnNldE5ld0NvbW1hbmRUaW1lb3V0KG1zKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmhlbHBlcnMuY2xlYXJOZXdDb21tYW5kVGltZW91dCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMubm9Db21tYW5kVGltZXIpIHtcbiAgICB0aGlzLm5vQ29tbWFuZFRpbWVyLmNhbmNlbCgpO1xuICAgIHRoaXMubm9Db21tYW5kVGltZXIgPSBudWxsO1xuICB9XG59O1xuXG5oZWxwZXJzLnN0YXJ0TmV3Q29tbWFuZFRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIG1ha2Ugc3VyZSB0aGVyZSBhcmUgbm8gcm9ndWUgdGltZW91dHNcbiAgdGhpcy5jbGVhck5ld0NvbW1hbmRUaW1lb3V0KCk7XG5cbiAgLy8gaWYgY29tbWFuZCB0aW1lb3V0IGlzIDAsIGl0IGlzIGRpc2FibGVkXG4gIGlmICghdGhpcy5uZXdDb21tYW5kVGltZW91dE1zKSByZXR1cm47IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY3VybHlcblxuICB0aGlzLm5vQ29tbWFuZFRpbWVyID0gdXRpbC5jYW5jZWxsYWJsZURlbGF5KHRoaXMubmV3Q29tbWFuZFRpbWVvdXRNcyk7XG4gIHRoaXMubm9Db21tYW5kVGltZXJcbiAgICAudGhlbihhc3luYyAoKSA9PiB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcHJvbWlzZS9wcmVmZXItYXdhaXQtdG8tdGhlblxuICAgICAgbG9nLndhcm4oYFNodXR0aW5nIGRvd24gYmVjYXVzZSB3ZSB3YWl0ZWQgYCArXG4gICAgICAgICAgICAgICBgJHt0aGlzLm5ld0NvbW1hbmRUaW1lb3V0TXMgLyAxMDAwfSBzZWNvbmRzIGZvciBhIGNvbW1hbmRgKTtcbiAgICAgIGxldCBlcnJvck1lc3NhZ2UgPSBgTmV3IENvbW1hbmQgVGltZW91dCBvZiBgICtcbiAgICAgICAgICAgICAgIGAke3RoaXMubmV3Q29tbWFuZFRpbWVvdXRNcyAvIDEwMDB9IHNlY29uZHMgYCArXG4gICAgICAgICAgICAgICBgZXhwaXJlZC4gVHJ5IGN1c3RvbWl6aW5nIHRoZSB0aW1lb3V0IHVzaW5nIHRoZSBgICtcbiAgICAgICAgICAgICAgIGAnbmV3Q29tbWFuZFRpbWVvdXQnIGRlc2lyZWQgY2FwYWJpbGl0eWA7XG4gICAgICBhd2FpdCB0aGlzLnN0YXJ0VW5leHBlY3RlZFNodXRkb3duKG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpKTtcbiAgICB9KVxuICAgIC5jYXRjaChCLkNhbmNlbGxhdGlvbkVycm9yLCAoLyplcnIqLykgPT4ge1xuICAgICAgLy8gaWdub3JlXG4gICAgfSk7XG59O1xuXG5oZWxwZXJzLmltcGxpY2l0V2FpdEZvckNvbmRpdGlvbiA9IGFzeW5jIGZ1bmN0aW9uIChjb25kRm4pIHtcbiAgbG9nLmRlYnVnKGBXYWl0aW5nIHVwIHRvICR7dGhpcy5pbXBsaWNpdFdhaXRNc30gbXMgZm9yIGNvbmRpdGlvbmApO1xuICBsZXQgd3JhcHBlZENvbmRGbiA9IGFzeW5jICguLi5hcmdzKSA9PiB7XG4gICAgLy8gcmVzZXQgY29tbWFuZCB0aW1lb3V0XG4gICAgdGhpcy5jbGVhck5ld0NvbW1hbmRUaW1lb3V0KCk7XG5cbiAgICByZXR1cm4gYXdhaXQgY29uZEZuKC4uLmFyZ3MpO1xuICB9O1xuICByZXR1cm4gYXdhaXQgd2FpdEZvckNvbmRpdGlvbih3cmFwcGVkQ29uZEZuLCB7XG4gICAgd2FpdE1zOiB0aGlzLmltcGxpY2l0V2FpdE1zLCBpbnRlcnZhbE1zOiA1MDAsIGxvZ2dlcjogbG9nXG4gIH0pO1xufTtcblxuaGVscGVycy5wYXJzZVRpbWVvdXRBcmd1bWVudCA9IGZ1bmN0aW9uIChtcykge1xuICBsZXQgZHVyYXRpb24gPSBwYXJzZUludChtcywgMTApO1xuICBpZiAoXy5pc05hTihkdXJhdGlvbikgfHwgZHVyYXRpb24gPCBNSU5fVElNRU9VVCkge1xuICAgIHRocm93IG5ldyBlcnJvcnMuVW5rbm93bkVycm9yKGBJbnZhbGlkIHRpbWVvdXQgdmFsdWUgJyR7bXN9J2ApO1xuICB9XG4gIHJldHVybiBkdXJhdGlvbjtcbn07XG5cbk9iamVjdC5hc3NpZ24oZXh0ZW5zaW9ucywgY29tbWFuZHMsIGhlbHBlcnMpO1xuZXhwb3J0IHsgY29tbWFuZHMsIGhlbHBlcnMgfTtcbmV4cG9ydCBkZWZhdWx0IGV4dGVuc2lvbnM7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uIn0=
