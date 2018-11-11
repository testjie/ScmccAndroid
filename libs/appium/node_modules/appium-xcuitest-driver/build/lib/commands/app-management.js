'use strict';

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumSupport = require('appium-support');

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var commands = {};

function extractMandatoryOptions(opts, keys) {
  if (opts === undefined) opts = {};

  var result = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(keys), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      var value = opts[key];
      if (!_lodash2['default'].isString(value) || _lodash2['default'].isEmpty(value)) {
        _logger2['default'].errorAndThrow('\'' + key + '\' is expected to be a valid string. \'' + value + '\' is given instead');
      }
      result[key] = value;
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

  return result;
}

commands.mobileInstallApp = function callee$0$0() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _extractMandatoryOptions, app, dstPath;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _extractMandatoryOptions = extractMandatoryOptions(opts, ['app']);
        app = _extractMandatoryOptions.app;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.helpers.configureApp(app, '.app'));

      case 4:
        dstPath = context$1$0.sent;

        _logger2['default'].info('Installing \'' + dstPath + '\' to the ' + (this.isRealDevice() ? 'real device' : 'Simulator') + ' ' + ('with UDID ' + this.opts.device.udid));
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(dstPath));

      case 8:
        if (context$1$0.sent) {
          context$1$0.next = 10;
          break;
        }

        _logger2['default'].errorAndThrow('The application at \'' + dstPath + '\' does not exist or is not accessible');

      case 10:
        context$1$0.prev = 10;
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(this.opts.device.installApp(dstPath));

      case 13:
        _logger2['default'].info('Installation of \'' + dstPath + '\' succeeded');

      case 14:
        context$1$0.prev = 14;

        if (!(dstPath !== app)) {
          context$1$0.next = 18;
          break;
        }

        context$1$0.next = 18;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.rimraf(dstPath));

      case 18:
        return context$1$0.finish(14);

      case 19:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[10,, 14, 19]]);
};

commands.mobileIsAppInstalled = function callee$0$0() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _extractMandatoryOptions2, bundleId, installed;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _extractMandatoryOptions2 = extractMandatoryOptions(opts, ['bundleId']);
        bundleId = _extractMandatoryOptions2.bundleId;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.opts.device.isAppInstalled(bundleId));

      case 4:
        installed = context$1$0.sent;

        _logger2['default'].info('App \'' + bundleId + '\' is' + (installed ? '' : ' not') + ' installed');
        return context$1$0.abrupt('return', installed);

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.mobileRemoveApp = function callee$0$0() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _extractMandatoryOptions3, bundleId;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _extractMandatoryOptions3 = extractMandatoryOptions(opts, ['bundleId']);
        bundleId = _extractMandatoryOptions3.bundleId;

        _logger2['default'].info('Uninstalling the application with bundle identifier \'' + bundleId + '\' ' + ('from the ' + (this.isRealDevice() ? 'real device' : 'Simulator') + ' with UDID ' + this.opts.device.udid));
        context$1$0.prev = 3;
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.opts.device.removeApp(bundleId));

      case 6:
        _logger2['default'].info('Removal of \'' + bundleId + '\' succeeded');
        return context$1$0.abrupt('return', true);

      case 10:
        context$1$0.prev = 10;
        context$1$0.t0 = context$1$0['catch'](3);

        _logger2['default'].warn('Cannot remove \'' + bundleId + '\'. Original error: ' + context$1$0.t0.message);
        return context$1$0.abrupt('return', false);

      case 14:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[3, 10]]);
};

commands.mobileLaunchApp = function callee$0$0() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var wdaOpts;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        wdaOpts = extractMandatoryOptions(opts, ['bundleId']);

        if (opts.arguments) {
          wdaOpts.arguments = _lodash2['default'].isArray(opts.arguments) ? opts.arguments : [opts.arguments];
        }
        if (opts.environment) {
          wdaOpts.environment = opts.environment;
        }
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.proxyCommand('/wda/apps/launch', 'POST', wdaOpts));

      case 5:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.mobileTerminateApp = function callee$0$0() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.proxyCommand('/wda/apps/terminate', 'POST', extractMandatoryOptions(opts, ['bundleId'])));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.mobileActivateApp = function callee$0$0() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.proxyCommand('/wda/apps/activate', 'POST', extractMandatoryOptions(opts, ['bundleId'])));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Returns the current application state
 *
 * @param {Object} opts - Options set, which must contain `bundleId` property
 * @returns {number} The actual application state code. See
 * https://developer.apple.com/documentation/xctest/xcuiapplicationstate?language=objc
 * to get the list of possible values.
 */
commands.mobileQueryAppState = function callee$0$0() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.proxyCommand('/wda/apps/state', 'POST', extractMandatoryOptions(opts, ['bundleId'])));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.installApp = function callee$0$0(appPath) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.mobileInstallApp({ app: appPath }));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.activateApp = function callee$0$0(bundleId) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.mobileLaunchApp(_Object$assign({}, opts, { bundleId: bundleId })));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.isAppInstalled = function callee$0$0(bundleId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.mobileIsAppInstalled({ bundleId: bundleId }));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.terminateApp = function callee$0$0(bundleId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.mobileTerminateApp({ bundleId: bundleId }));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.queryAppState = function callee$0$0(bundleId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.mobileQueryAppState({ bundleId: bundleId }));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

exports['default'] = commands;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9hcHAtbWFuYWdlbWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztzQkFBYyxRQUFROzs7OzZCQUNILGdCQUFnQjs7c0JBQ25CLFdBQVc7Ozs7QUFFM0IsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDOztBQUVsQixTQUFTLHVCQUF1QixDQUFFLElBQUksRUFBTyxJQUFJLEVBQUU7TUFBakIsSUFBSSxnQkFBSixJQUFJLEdBQUcsRUFBRTs7QUFDekMsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDOzs7Ozs7QUFDbEIsc0NBQWtCLElBQUksNEdBQUU7VUFBYixHQUFHOztBQUNaLFVBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN4QixVQUFJLENBQUMsb0JBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLG9CQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUMxQyw0QkFBSSxhQUFhLFFBQUssR0FBRywrQ0FBd0MsS0FBSyx5QkFBcUIsQ0FBQztPQUM3RjtBQUNELFlBQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7S0FDckI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDRCxTQUFPLE1BQU0sQ0FBQztDQUNmOztBQUVELFFBQVEsQ0FBQyxnQkFBZ0IsR0FBRztNQUFnQixJQUFJLHlEQUFHLEVBQUU7O2dDQUM1QyxHQUFHLEVBQ0osT0FBTzs7Ozs7bUNBREMsdUJBQXVCLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7QUFBN0MsV0FBRyw0QkFBSCxHQUFHOzt5Q0FDWSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDOzs7QUFBdEQsZUFBTzs7QUFDYiw0QkFBSSxJQUFJLENBQUMsa0JBQWUsT0FBTyxtQkFBWSxJQUFJLENBQUMsWUFBWSxFQUFFLEdBQUcsYUFBYSxHQUFHLFdBQVcsQ0FBQSx5QkFDdEUsSUFBSSxDQUFD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Ozs7Ozs7OztDQUNsRCxDQUFDOztxQkFFYSxRQUFRIiwiZmlsZSI6ImxpYi9jb21tYW5kcy9hcHAtbWFuYWdlbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBmcyB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCBsb2cgZnJvbSAnLi4vbG9nZ2VyJztcblxubGV0IGNvbW1hbmRzID0ge307XG5cbmZ1bmN0aW9uIGV4dHJhY3RNYW5kYXRvcnlPcHRpb25zIChvcHRzID0ge30sIGtleXMpIHtcbiAgY29uc3QgcmVzdWx0ID0ge307XG4gIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICBjb25zdCB2YWx1ZSA9IG9wdHNba2V5XTtcbiAgICBpZiAoIV8uaXNTdHJpbmcodmFsdWUpIHx8IF8uaXNFbXB0eSh2YWx1ZSkpIHtcbiAgICAgIGxvZy5lcnJvckFuZFRocm93KGAnJHtrZXl9JyBpcyBleHBlY3RlZCB0byBiZSBhIHZhbGlkIHN0cmluZy4gJyR7dmFsdWV9JyBpcyBnaXZlbiBpbnN0ZWFkYCk7XG4gICAgfVxuICAgIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuY29tbWFuZHMubW9iaWxlSW5zdGFsbEFwcCA9IGFzeW5jIGZ1bmN0aW9uIChvcHRzID0ge30pIHtcbiAgY29uc3Qge2FwcH0gPSBleHRyYWN0TWFuZGF0b3J5T3B0aW9ucyhvcHRzLCBbJ2FwcCddKTtcbiAgY29uc3QgZHN0UGF0aCA9IGF3YWl0IHRoaXMuaGVscGVycy5jb25maWd1cmVBcHAoYXBwLCAnLmFwcCcpO1xuICBsb2cuaW5mbyhgSW5zdGFsbGluZyAnJHtkc3RQYXRofScgdG8gdGhlICR7dGhpcy5pc1JlYWxEZXZpY2UoKSA/ICdyZWFsIGRldmljZScgOiAnU2ltdWxhdG9yJ30gYCArXG4gICAgICAgICAgIGB3aXRoIFVESUQgJHt0aGlzLm9wdHMuZGV2aWNlLnVkaWR9YCk7XG4gIGlmICghYXdhaXQgZnMuZXhpc3RzKGRzdFBhdGgpKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coYFRoZSBhcHBsaWNhdGlvbiBhdCAnJHtkc3RQYXRofScgZG9lcyBub3QgZXhpc3Qgb3IgaXMgbm90IGFjY2Vzc2libGVgKTtcbiAgfVxuICB0cnkge1xuICAgIGF3YWl0IHRoaXMub3B0cy5kZXZpY2UuaW5zdGFsbEFwcChkc3RQYXRoKTtcbiAgICBsb2cuaW5mbyhgSW5zdGFsbGF0aW9uIG9mICcke2RzdFBhdGh9JyBzdWNjZWVkZWRgKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBpZiAoZHN0UGF0aCAhPT0gYXBwKSB7XG4gICAgICBhd2FpdCBmcy5yaW1yYWYoZHN0UGF0aCk7XG4gICAgfVxuICB9XG59O1xuXG5jb21tYW5kcy5tb2JpbGVJc0FwcEluc3RhbGxlZCA9IGFzeW5jIGZ1bmN0aW9uIChvcHRzID0ge30pIHtcbiAgY29uc3Qge2J1bmRsZUlkfSA9IGV4dHJhY3RNYW5kYXRvcnlPcHRpb25zKG9wdHMsIFsnYnVuZGxlSWQnXSk7XG4gIGNvbnN0IGluc3RhbGxlZCA9IGF3YWl0IHRoaXMub3B0cy5kZXZpY2UuaXNBcHBJbnN0YWxsZWQoYnVuZGxlSWQpO1xuICBsb2cuaW5mbyhgQXBwICcke2J1bmRsZUlkfScgaXMke2luc3RhbGxlZCA/ICcnIDogJyBub3QnfSBpbnN0YWxsZWRgKTtcbiAgcmV0dXJuIGluc3RhbGxlZDtcbn07XG5cbmNvbW1hbmRzLm1vYmlsZVJlbW92ZUFwcCA9IGFzeW5jIGZ1bmN0aW9uIChvcHRzID0ge30pIHtcbiAgY29uc3Qge2J1bmRsZUlkfSA9IGV4dHJhY3RNYW5kYXRvcnlPcHRpb25zKG9wdHMsIFsnYnVuZGxlSWQnXSk7XG4gIGxvZy5pbmZvKGBVbmluc3RhbGxpbmcgdGhlIGFwcGxpY2F0aW9uIHdpdGggYnVuZGxlIGlkZW50aWZpZXIgJyR7YnVuZGxlSWR9JyBgICtcbiAgICBgZnJvbSB0aGUgJHt0aGlzLmlzUmVhbERldmljZSgpID8gJ3JlYWwgZGV2aWNlJyA6ICdTaW11bGF0b3InfSB3aXRoIFVESUQgJHt0aGlzLm9wdHMuZGV2aWNlLnVkaWR9YCk7XG4gIHRyeSB7XG4gICAgYXdhaXQgdGhpcy5vcHRzLmRldmljZS5yZW1vdmVBcHAoYnVuZGxlSWQpO1xuICAgIGxvZy5pbmZvKGBSZW1vdmFsIG9mICcke2J1bmRsZUlkfScgc3VjY2VlZGVkYCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZy53YXJuKGBDYW5ub3QgcmVtb3ZlICcke2J1bmRsZUlkfScuIE9yaWdpbmFsIGVycm9yOiAke2Vyci5tZXNzYWdlfWApO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuY29tbWFuZHMubW9iaWxlTGF1bmNoQXBwID0gYXN5bmMgZnVuY3Rpb24gKG9wdHMgPSB7fSkge1xuICBjb25zdCB3ZGFPcHRzID0gZXh0cmFjdE1hbmRhdG9yeU9wdGlvbnMob3B0cywgWydidW5kbGVJZCddKTtcbiAgaWYgKG9wdHMuYXJndW1lbnRzKSB7XG4gICAgd2RhT3B0cy5hcmd1bWVudHMgPSBfLmlzQXJyYXkob3B0cy5hcmd1bWVudHMpID8gb3B0cy5hcmd1bWVudHMgOiBbb3B0cy5hcmd1bWVudHNdO1xuICB9XG4gIGlmIChvcHRzLmVudmlyb25tZW50KSB7XG4gICAgd2RhT3B0cy5lbnZpcm9ubWVudCA9IG9wdHMuZW52aXJvbm1lbnQ7XG4gIH1cbiAgcmV0dXJuIGF3YWl0IHRoaXMucHJveHlDb21tYW5kKCcvd2RhL2FwcHMvbGF1bmNoJywgJ1BPU1QnLCB3ZGFPcHRzKTtcbn07XG5cbmNvbW1hbmRzLm1vYmlsZVRlcm1pbmF0ZUFwcCA9IGFzeW5jIGZ1bmN0aW9uIChvcHRzID0ge30pIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMucHJveHlDb21tYW5kKCcvd2RhL2FwcHMvdGVybWluYXRlJywgJ1BPU1QnLCBleHRyYWN0TWFuZGF0b3J5T3B0aW9ucyhvcHRzLCBbJ2J1bmRsZUlkJ10pKTtcbn07XG5cbmNvbW1hbmRzLm1vYmlsZUFjdGl2YXRlQXBwID0gYXN5bmMgZnVuY3Rpb24gKG9wdHMgPSB7fSkge1xuICByZXR1cm4gYXdhaXQgdGhpcy5wcm94eUNvbW1hbmQoJy93ZGEvYXBwcy9hY3RpdmF0ZScsICdQT1NUJywgZXh0cmFjdE1hbmRhdG9yeU9wdGlvbnMob3B0cywgWydidW5kbGVJZCddKSk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGN1cnJlbnQgYXBwbGljYXRpb24gc3RhdGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIE9wdGlvbnMgc2V0LCB3aGljaCBtdXN0IGNvbnRhaW4gYGJ1bmRsZUlkYCBwcm9wZXJ0eVxuICogQHJldHVybnMge251bWJlcn0gVGhlIGFjdHVhbCBhcHBsaWNhdGlvbiBzdGF0ZSBjb2RlLiBTZWVcbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9kb2N1bWVudGF0aW9uL3hjdGVzdC94Y3VpYXBwbGljYXRpb25zdGF0ZT9sYW5ndWFnZT1vYmpjXG4gKiB0byBnZXQgdGhlIGxpc3Qgb2YgcG9zc2libGUgdmFsdWVzLlxuICovXG5jb21tYW5kcy5tb2JpbGVRdWVyeUFwcFN0YXRlID0gYXN5bmMgZnVuY3Rpb24gKG9wdHMgPSB7fSkge1xuICByZXR1cm4gYXdhaXQgdGhpcy5wcm94eUNvbW1hbmQoJy93ZGEvYXBwcy9zdGF0ZScsICdQT1NUJywgZXh0cmFjdE1hbmRhdG9yeU9wdGlvbnMob3B0cywgWydidW5kbGVJZCddKSk7XG59O1xuXG5jb21tYW5kcy5pbnN0YWxsQXBwID0gYXN5bmMgZnVuY3Rpb24gKGFwcFBhdGgpIHtcbiAgYXdhaXQgdGhpcy5tb2JpbGVJbnN0YWxsQXBwKHthcHA6IGFwcFBhdGh9KTtcbn07XG5cbmNvbW1hbmRzLmFjdGl2YXRlQXBwID0gYXN5bmMgZnVuY3Rpb24gKGJ1bmRsZUlkLCBvcHRzID0ge30pIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMubW9iaWxlTGF1bmNoQXBwKE9iamVjdC5hc3NpZ24oe30sIG9wdHMsIHtidW5kbGVJZH0pKTtcbn07XG5cbmNvbW1hbmRzLmlzQXBwSW5zdGFsbGVkID0gYXN5bmMgZnVuY3Rpb24gKGJ1bmRsZUlkKSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLm1vYmlsZUlzQXBwSW5zdGFsbGVkKHtidW5kbGVJZH0pO1xufTtcblxuY29tbWFuZHMudGVybWluYXRlQXBwID0gYXN5bmMgZnVuY3Rpb24gKGJ1bmRsZUlkKSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLm1vYmlsZVRlcm1pbmF0ZUFwcCh7YnVuZGxlSWR9KTtcbn07XG5cbmNvbW1hbmRzLnF1ZXJ5QXBwU3RhdGUgPSBhc3luYyBmdW5jdGlvbiAoYnVuZGxlSWQpIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMubW9iaWxlUXVlcnlBcHBTdGF0ZSh7YnVuZGxlSWR9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbW1hbmRzO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLiJ9
