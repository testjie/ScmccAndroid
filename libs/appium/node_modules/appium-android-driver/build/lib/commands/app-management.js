'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _asyncbox = require('asyncbox');

var _appiumSupport = require('appium-support');

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var APP_EXTENSION = '.apk';
// These constants are in sync with
// https://developer.apple.com/documentation/xctest/xcuiapplicationstate/xcuiapplicationstaterunningbackground?language=objc
var APP_STATE_NOT_INSTALLED = 0;
var APP_STATE_NOT_RUNNING = 1;
var APP_STATE_RUNNING_IN_BACKGROUND = 3;
var APP_STATE_RUNNING_IN_FOREGROUND = 4;

var commands = {};

/**
 * Verify whether an application is installed or not
 *
 * @param {string} appId - Application package identifier
 * @returns {boolean} true if the app is installed
 */
commands.isAppInstalled = function callee$0$0(appId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.isAppInstalled(appId));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Queries the current state of the app.
 *
 * @param {string} appId - Application package identifier
 * @returns {number} The corresponding constant, which describes
 *                   the current application state:
 * 0 - is the app is not installed
 * 1 - if the app is installed, but is not running
 * 3 - if the app is running in the background
 * 4 - if the app is running in the foreground
 */
commands.queryAppState = function callee$0$0(appId) {
  var output, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, line;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].info('Querying the state of \'' + appId + '\'');
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.isAppInstalled(appId));

      case 3:
        if (context$1$0.sent) {
          context$1$0.next = 5;
          break;
        }

        return context$1$0.abrupt('return', APP_STATE_NOT_INSTALLED);

      case 5:
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.adb.processExists(appId));

      case 7:
        if (context$1$0.sent) {
          context$1$0.next = 9;
          break;
        }

        return context$1$0.abrupt('return', APP_STATE_NOT_RUNNING);

      case 9:
        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(this.adb.shell(['dumpsys', 'window', 'windows']));

      case 11:
        output = context$1$0.sent;
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 15;
        _iterator = _getIterator(output.split('\n'));

      case 17:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 24;
          break;
        }

        line = _step.value;

        if (!(line.includes(appId) && (line.includes('mCurrentFocus') || line.includes('mFocusedApp')))) {
          context$1$0.next = 21;
          break;
        }

        return context$1$0.abrupt('return', APP_STATE_RUNNING_IN_FOREGROUND);

      case 21:
        _iteratorNormalCompletion = true;
        context$1$0.next = 17;
        break;

      case 24:
        context$1$0.next = 30;
        break;

      case 26:
        context$1$0.prev = 26;
        context$1$0.t0 = context$1$0['catch'](15);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 30:
        context$1$0.prev = 30;
        context$1$0.prev = 31;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 33:
        context$1$0.prev = 33;

        if (!_didIteratorError) {
          context$1$0.next = 36;
          break;
        }

        throw _iteratorError;

      case 36:
        return context$1$0.finish(33);

      case 37:
        return context$1$0.finish(30);

      case 38:
        return context$1$0.abrupt('return', APP_STATE_RUNNING_IN_BACKGROUND);

      case 39:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[15, 26, 30, 38], [31,, 33, 37]]);
};

/**
 * Activates the given application or launches it if necessary.
 * The action is done with monkey tool and literally simulates
 * clicking the corresponding application icon on the dashboard.
 *
 * @param {string} appId - Application package identifier
 */
commands.activateApp = function callee$0$0(appId) {
  var cmd, output;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        cmd = ['monkey', '-p', appId, '-c', 'android.intent.category.LAUNCHER', '1'];
        output = '';
        context$1$0.prev = 2;

        _logger2['default'].debug('Activating \'' + appId + '\' with \'adb shell ' + cmd.join(' ') + '\' command');
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.adb.shell(cmd));

      case 6:
        output = context$1$0.sent;

        _logger2['default'].debug('Command stdout: ' + output);
        context$1$0.next = 13;
        break;

      case 10:
        context$1$0.prev = 10;
        context$1$0.t0 = context$1$0['catch'](2);

        _logger2['default'].errorAndThrow('Cannot activate \'' + appId + '\'. Original error: ' + context$1$0.t0.message);

      case 13:
        if (output.includes('monkey aborted')) {
          _logger2['default'].errorAndThrow('Cannot activate \'' + appId + '\'. Are you sure it is installed?');
        }

      case 14:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[2, 10]]);
};

/**
 * @typedef {Object} UninstallOptions
 * @property {number} timeout [20000] - The count of milliseconds to wait until the
 *                                      app is uninstalled.
 * @property {boolean} keepData [false] - Set to true in order to keep the
 *                                        application data and cache folders after uninstall.
 */

/**
 * Remove the corresponding application if is installed.
 * The call is ignored if the app is not installed.
 *
 * @param {string} appId - Application package identifier
 * @param {?UninstallOptions} options - The set of removal options
 * @returns {boolean} True if the package was found on the device and
 *                    successfully uninstalled.
 */
commands.removeApp = function callee$0$0(appId) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.uninstallApk(appId, options));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * @typedef {Object} TerminateOptions
 * @property {number|string} timeout [500] - The count of milliseconds to wait until the
 *                                           app is terminated.
 */

/**
 * Terminates the app if it is running.
 *
 * @param {string} appId - Application package identifier
 * @param {?TerminateOptions} options - The set of application termination options
 * @returns {boolean} True if the app has been successfully terminated.
 * @throws {Error} if the app has not been terminated within the given timeout.
 */
commands.terminateApp = function callee$0$0(appId) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var timeout;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].info('Terminating \'' + appId + '\'');
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.processExists(appId));

      case 3:
        if (context$1$0.sent) {
          context$1$0.next = 6;
          break;
        }

        _logger2['default'].info('The app \'' + appId + '\' is not running');
        return context$1$0.abrupt('return', false);

      case 6:
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.adb.forceStop(appId));

      case 8:
        timeout = _appiumSupport.util.hasValue(options.timeout) && !isNaN(options.timeout) ? parseInt(options.timeout, 10) : 500;
        context$1$0.prev = 9;
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap((0, _asyncbox.waitForCondition)(function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(this.queryAppState(appId));

              case 2:
                context$2$0.t0 = context$2$0.sent;
                context$2$0.t1 = APP_STATE_NOT_RUNNING;
                return context$2$0.abrupt('return', context$2$0.t0 <= context$2$0.t1);

              case 5:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        }, { waitMs: timeout, intervalMs: 100 }));

      case 12:
        context$1$0.next = 17;
        break;

      case 14:
        context$1$0.prev = 14;
        context$1$0.t0 = context$1$0['catch'](9);

        _logger2['default'].errorAndThrow('\'' + appId + '\' is still running after ' + timeout + 'ms timeout');

      case 17:
        _logger2['default'].info('\'' + appId + '\' has been successfully terminated');
        return context$1$0.abrupt('return', true);

      case 19:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[9, 14]]);
};

/**
 * @typedef {Object} InstallOptions
 * @property {number} timeout [60000] - The count of milliseconds to wait until the
 *                                      app is installed.
 * @property {boolean} allowTestPackages [false] - Set to true in order to allow test
 *                                                 packages installation.
 * @property {boolean} useSdcard [false] - Set to true to install the app on sdcard
 *                                         instead of the device memory.
 * @property {boolean} grantPermissions [false] - Set to true in order to grant all the
 *                                                permissions requested in the application's manifest
 *                                                automatically after the installation is completed
 *                                                under Android 6+.
 * @property {boolean} replace [true] - Set it to false if you don't want
 *                                      the application to be upgraded/reinstalled
 *                                      if it is already present on the device.
 */

/**
 * Installs the given application to the device under test
 *
 * @param {string} appPath - The local apk path or a remote url
 * @param {?InstallOptions} options - The set of installation options
 * @throws {Error} if the given apk does not exist or is not reachable
 */
commands.installApp = function callee$0$0(appPath) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var localPath;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.helpers.configureApp(appPath, APP_EXTENSION));

      case 2:
        localPath = context$1$0.sent;
        context$1$0.prev = 3;
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.adb.install(localPath, options));

      case 6:
        context$1$0.prev = 6;

        if (!(localPath !== appPath)) {
          context$1$0.next = 10;
          break;
        }

        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.rimraf(localPath));

      case 10:
        return context$1$0.finish(6);

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[3,, 6, 11]]);
};

exports.commands = commands;
exports['default'] = commands;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9hcHAtbWFuYWdlbWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7d0JBQWlDLFVBQVU7OzZCQUNsQixnQkFBZ0I7O3NCQUN6QixXQUFXOzs7O0FBRTNCLElBQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQzs7O0FBRzdCLElBQU0sdUJBQXVCLEdBQUcsQ0FBQyxDQUFDO0FBQ2xDLElBQU0scUJBQXFCLEdBQUcsQ0FBQyxDQUFDO0FBQ2hDLElBQU0sK0JBQStCLEdBQUcsQ0FBQyxDQUFDO0FBQzFDLElBQU0sK0JBQStCLEdBQUcsQ0FBQyxDQUFDOztBQUUxQyxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7O0FBUWxCLFFBQVEsQ0FBQyxjQUFjLEdBQUcsb0JBQWdCLEtBQUs7Ozs7O3lDQUNoQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUM7Ozs7Ozs7Ozs7Q0FDNUMsQ0FBQzs7Ozs7Ozs7Ozs7OztBQWFGLFFBQVEsQ0FBQyxhQUFhLEdBQUcsb0JBQWdCLEtBQUs7TUFRdEMsTUFBTSxrRkFDRCxJQUFJOzs7OztBQVJmLDRCQUFJLElBQUksOEJBQTJCLEtBQUssUUFBSSxDQUFDOzt5Q0FDbEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDOzs7Ozs7Ozs0Q0FDaEMsdUJBQXVCOzs7O3lDQUVyQixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7Ozs7Ozs7OzRDQUMvQixxQkFBcUI7Ozs7eUNBRVQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDOzs7QUFBL0QsY0FBTTs7Ozs7aUNBQ08sTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7O0FBQTFCLFlBQUk7O2NBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLENB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QTs7Ozs7O3lDQUNqQixrQkFBRyxNQUFNLENBQUMsU0FBUyxDQUFDOzs7Ozs7Ozs7O0NBRy9CLENBQUM7O1FBR08sUUFBUSxHQUFSLFFBQVE7cUJBQ0YsUUFBUSIsImZpbGUiOiJsaWIvY29tbWFuZHMvYXBwLW1hbmFnZW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB3YWl0Rm9yQ29uZGl0aW9uIH0gZnJvbSAnYXN5bmNib3gnO1xuaW1wb3J0IHsgZnMsIHV0aWwgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XG5pbXBvcnQgbG9nIGZyb20gJy4uL2xvZ2dlcic7XG5cbmNvbnN0IEFQUF9FWFRFTlNJT04gPSAnLmFwayc7XG4vLyBUaGVzZSBjb25zdGFudHMgYXJlIGluIHN5bmMgd2l0aFxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2RvY3VtZW50YXRpb24veGN0ZXN0L3hjdWlhcHBsaWNhdGlvbnN0YXRlL3hjdWlhcHBsaWNhdGlvbnN0YXRlcnVubmluZ2JhY2tncm91bmQ/bGFuZ3VhZ2U9b2JqY1xuY29uc3QgQVBQX1NUQVRFX05PVF9JTlNUQUxMRUQgPSAwO1xuY29uc3QgQVBQX1NUQVRFX05PVF9SVU5OSU5HID0gMTtcbmNvbnN0IEFQUF9TVEFURV9SVU5OSU5HX0lOX0JBQ0tHUk9VTkQgPSAzO1xuY29uc3QgQVBQX1NUQVRFX1JVTk5JTkdfSU5fRk9SRUdST1VORCA9IDQ7XG5cbmxldCBjb21tYW5kcyA9IHt9O1xuXG4vKipcbiAqIFZlcmlmeSB3aGV0aGVyIGFuIGFwcGxpY2F0aW9uIGlzIGluc3RhbGxlZCBvciBub3RcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYXBwSWQgLSBBcHBsaWNhdGlvbiBwYWNrYWdlIGlkZW50aWZpZXJcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIHRoZSBhcHAgaXMgaW5zdGFsbGVkXG4gKi9cbmNvbW1hbmRzLmlzQXBwSW5zdGFsbGVkID0gYXN5bmMgZnVuY3Rpb24gKGFwcElkKSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLmFkYi5pc0FwcEluc3RhbGxlZChhcHBJZCk7XG59O1xuXG4vKipcbiAqIFF1ZXJpZXMgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIGFwcC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYXBwSWQgLSBBcHBsaWNhdGlvbiBwYWNrYWdlIGlkZW50aWZpZXJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBjb3JyZXNwb25kaW5nIGNvbnN0YW50LCB3aGljaCBkZXNjcmliZXNcbiAqICAgICAgICAgICAgICAgICAgIHRoZSBjdXJyZW50IGFwcGxpY2F0aW9uIHN0YXRlOlxuICogMCAtIGlzIHRoZSBhcHAgaXMgbm90IGluc3RhbGxlZFxuICogMSAtIGlmIHRoZSBhcHAgaXMgaW5zdGFsbGVkLCBidXQgaXMgbm90IHJ1bm5pbmdcbiAqIDMgLSBpZiB0aGUgYXBwIGlzIHJ1bm5pbmcgaW4gdGhlIGJhY2tncm91bmRcbiAqIDQgLSBpZiB0aGUgYXBwIGlzIHJ1bm5pbmcgaW4gdGhlIGZvcmVncm91bmRcbiAqL1xuY29tbWFuZHMucXVlcnlBcHBTdGF0ZSA9IGFzeW5jIGZ1bmN0aW9uIChhcHBJZCkge1xuICBsb2cuaW5mbyhgUXVlcnlpbmcgdGhlIHN0YXRlIG9mICcke2FwcElkfSdgKTtcbiAgaWYgKCFhd2FpdCB0aGlzLmFkYi5pc0FwcEluc3RhbGxlZChhcHBJZCkpIHtcbiAgICByZXR1cm4gQVBQX1NUQVRFX05PVF9JTlNUQUxMRUQ7XG4gIH1cbiAgaWYgKCFhd2FpdCB0aGlzLmFkYi5wcm9jZXNzRXhpc3RzKGFwcElkKSkge1xuICAgIHJldHVybiBBUFBfU1RBVEVfTk9UX1JVTk5JTkc7XG4gIH1cbiAgY29uc3Qgb3V0cHV0ID0gYXdhaXQgdGhpcy5hZGIuc2hlbGwoWydkdW1wc3lzJywgJ3dpbmRvdycsICd3aW5kb3dzJ10pO1xuICBmb3IgKGNvbnN0IGxpbmUgb2Ygb3V0cHV0LnNwbGl0KCdcXG4nKSkge1xuICAgIGlmIChsaW5lLmluY2x1ZGVzKGFwcElkKSAmJiAobGluZS5pbmNsdWRlcygnbUN1cnJlbnRGb2N1cycpIHx8IGxpbmUuaW5jbHVkZXMoJ21Gb2N1c2VkQXBwJykpKSB7XG4gICAgICByZXR1cm4gQVBQX1NUQVRFX1JVTk5JTkdfSU5fRk9SRUdST1VORDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIEFQUF9TVEFURV9SVU5OSU5HX0lOX0JBQ0tHUk9VTkQ7XG59O1xuXG4vKipcbiAqIEFjdGl2YXRlcyB0aGUgZ2l2ZW4gYXBwbGljYXRpb24gb3IgbGF1bmNoZXMgaXQgaWYgbmVjZXNzYXJ5LlxuICogVGhlIGFjdGlvbiBpcyBkb25lIHdpdGggbW9ua2V5IHRvb2wgYW5kIGxpdGVyYWxseSBzaW11bGF0ZXNcbiAqIGNsaWNraW5nIHRoZSBjb3JyZXNwb25kaW5nIGFwcGxpY2F0aW9uIGljb24gb24gdGhlIGRhc2hib2FyZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYXBwSWQgLSBBcHBsaWNhdGlvbiBwYWNrYWdlIGlkZW50aWZpZXJcbiAqL1xuY29tbWFuZHMuYWN0aXZhdGVBcHAgPSBhc3luYyBmdW5jdGlvbiAoYXBwSWQpIHtcbiAgY29uc3QgY21kICA9IFsnbW9ua2V5JyxcbiAgICAnLXAnLCBhcHBJZCxcbiAgICAnLWMnLCAnYW5kcm9pZC5pbnRlbnQuY2F0ZWdvcnkuTEFVTkNIRVInLFxuICAgICcxJ107XG4gIGxldCBvdXRwdXQgPSAnJztcbiAgdHJ5IHtcbiAgICBsb2cuZGVidWcoYEFjdGl2YXRpbmcgJyR7YXBwSWR9JyB3aXRoICdhZGIgc2hlbGwgJHtjbWQuam9pbignICcpfScgY29tbWFuZGApO1xuICAgIG91dHB1dCA9IGF3YWl0IHRoaXMuYWRiLnNoZWxsKGNtZCk7XG4gICAgbG9nLmRlYnVnKGBDb21tYW5kIHN0ZG91dDogJHtvdXRwdXR9YCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgQ2Fubm90IGFjdGl2YXRlICcke2FwcElkfScuIE9yaWdpbmFsIGVycm9yOiAke2UubWVzc2FnZX1gKTtcbiAgfVxuICBpZiAob3V0cHV0LmluY2x1ZGVzKCdtb25rZXkgYWJvcnRlZCcpKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coYENhbm5vdCBhY3RpdmF0ZSAnJHthcHBJZH0nLiBBcmUgeW91IHN1cmUgaXQgaXMgaW5zdGFsbGVkP2ApO1xuICB9XG59O1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFVuaW5zdGFsbE9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB0aW1lb3V0IFsyMDAwMF0gLSBUaGUgY291bnQgb2YgbWlsbGlzZWNvbmRzIHRvIHdhaXQgdW50aWwgdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwIGlzIHVuaW5zdGFsbGVkLlxuICogQHByb3BlcnR5IHtib29sZWFufSBrZWVwRGF0YSBbZmFsc2VdIC0gU2V0IHRvIHRydWUgaW4gb3JkZXIgdG8ga2VlcCB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uIGRhdGEgYW5kIGNhY2hlIGZvbGRlcnMgYWZ0ZXIgdW5pbnN0YWxsLlxuICovXG5cbi8qKlxuICogUmVtb3ZlIHRoZSBjb3JyZXNwb25kaW5nIGFwcGxpY2F0aW9uIGlmIGlzIGluc3RhbGxlZC5cbiAqIFRoZSBjYWxsIGlzIGlnbm9yZWQgaWYgdGhlIGFwcCBpcyBub3QgaW5zdGFsbGVkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBhcHBJZCAtIEFwcGxpY2F0aW9uIHBhY2thZ2UgaWRlbnRpZmllclxuICogQHBhcmFtIHs/VW5pbnN0YWxsT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBzZXQgb2YgcmVtb3ZhbCBvcHRpb25zXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgcGFja2FnZSB3YXMgZm91bmQgb24gdGhlIGRldmljZSBhbmRcbiAqICAgICAgICAgICAgICAgICAgICBzdWNjZXNzZnVsbHkgdW5pbnN0YWxsZWQuXG4gKi9cbmNvbW1hbmRzLnJlbW92ZUFwcCA9IGFzeW5jIGZ1bmN0aW9uIChhcHBJZCwgb3B0aW9ucyA9IHt9KSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLmFkYi51bmluc3RhbGxBcGsoYXBwSWQsIG9wdGlvbnMpO1xufTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBUZXJtaW5hdGVPcHRpb25zXG4gKiBAcHJvcGVydHkge251bWJlcnxzdHJpbmd9IHRpbWVvdXQgWzUwMF0gLSBUaGUgY291bnQgb2YgbWlsbGlzZWNvbmRzIHRvIHdhaXQgdW50aWwgdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHAgaXMgdGVybWluYXRlZC5cbiAqL1xuXG4vKipcbiAqIFRlcm1pbmF0ZXMgdGhlIGFwcCBpZiBpdCBpcyBydW5uaW5nLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBhcHBJZCAtIEFwcGxpY2F0aW9uIHBhY2thZ2UgaWRlbnRpZmllclxuICogQHBhcmFtIHs/VGVybWluYXRlT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBzZXQgb2YgYXBwbGljYXRpb24gdGVybWluYXRpb24gb3B0aW9uc1xuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIGFwcCBoYXMgYmVlbiBzdWNjZXNzZnVsbHkgdGVybWluYXRlZC5cbiAqIEB0aHJvd3Mge0Vycm9yfSBpZiB0aGUgYXBwIGhhcyBub3QgYmVlbiB0ZXJtaW5hdGVkIHdpdGhpbiB0aGUgZ2l2ZW4gdGltZW91dC5cbiAqL1xuY29tbWFuZHMudGVybWluYXRlQXBwID0gYXN5bmMgZnVuY3Rpb24gKGFwcElkLCBvcHRpb25zID0ge30pIHtcbiAgbG9nLmluZm8oYFRlcm1pbmF0aW5nICcke2FwcElkfSdgKTtcbiAgaWYgKCEoYXdhaXQgdGhpcy5hZGIucHJvY2Vzc0V4aXN0cyhhcHBJZCkpKSB7XG4gICAgbG9nLmluZm8oYFRoZSBhcHAgJyR7YXBwSWR9JyBpcyBub3QgcnVubmluZ2ApO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBhd2FpdCB0aGlzLmFkYi5mb3JjZVN0b3AoYXBwSWQpO1xuICBjb25zdCB0aW1lb3V0ID0gdXRpbC5oYXNWYWx1ZShvcHRpb25zLnRpbWVvdXQpICYmICFpc05hTihvcHRpb25zLnRpbWVvdXQpID8gcGFyc2VJbnQob3B0aW9ucy50aW1lb3V0LCAxMCkgOiA1MDA7XG4gIHRyeSB7XG4gICAgYXdhaXQgd2FpdEZvckNvbmRpdGlvbihhc3luYyAoKSA9PiBhd2FpdCB0aGlzLnF1ZXJ5QXBwU3RhdGUoYXBwSWQpIDw9IEFQUF9TVEFURV9OT1RfUlVOTklORyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHt3YWl0TXM6IHRpbWVvdXQsIGludGVydmFsTXM6IDEwMH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coYCcke2FwcElkfScgaXMgc3RpbGwgcnVubmluZyBhZnRlciAke3RpbWVvdXR9bXMgdGltZW91dGApO1xuICB9XG4gIGxvZy5pbmZvKGAnJHthcHBJZH0nIGhhcyBiZWVuIHN1Y2Nlc3NmdWxseSB0ZXJtaW5hdGVkYCk7XG4gIHJldHVybiB0cnVlO1xufTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBJbnN0YWxsT3B0aW9uc1xuICogQHByb3BlcnR5IHtudW1iZXJ9IHRpbWVvdXQgWzYwMDAwXSAtIFRoZSBjb3VudCBvZiBtaWxsaXNlY29uZHMgdG8gd2FpdCB1bnRpbCB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHAgaXMgaW5zdGFsbGVkLlxuICogQHByb3BlcnR5IHtib29sZWFufSBhbGxvd1Rlc3RQYWNrYWdlcyBbZmFsc2VdIC0gU2V0IHRvIHRydWUgaW4gb3JkZXIgdG8gYWxsb3cgdGVzdFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFja2FnZXMgaW5zdGFsbGF0aW9uLlxuICogQHByb3BlcnR5IHtib29sZWFufSB1c2VTZGNhcmQgW2ZhbHNlXSAtIFNldCB0byB0cnVlIHRvIGluc3RhbGwgdGhlIGFwcCBvbiBzZGNhcmRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0ZWFkIG9mIHRoZSBkZXZpY2UgbWVtb3J5LlxuICogQHByb3BlcnR5IHtib29sZWFufSBncmFudFBlcm1pc3Npb25zIFtmYWxzZV0gLSBTZXQgdG8gdHJ1ZSBpbiBvcmRlciB0byBncmFudCBhbGwgdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb25zIHJlcXVlc3RlZCBpbiB0aGUgYXBwbGljYXRpb24ncyBtYW5pZmVzdFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvbWF0aWNhbGx5IGFmdGVyIHRoZSBpbnN0YWxsYXRpb24gaXMgY29tcGxldGVkXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVyIEFuZHJvaWQgNisuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHJlcGxhY2UgW3RydWVdIC0gU2V0IGl0IHRvIGZhbHNlIGlmIHlvdSBkb24ndCB3YW50XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIGFwcGxpY2F0aW9uIHRvIGJlIHVwZ3JhZGVkL3JlaW5zdGFsbGVkXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgaXQgaXMgYWxyZWFkeSBwcmVzZW50IG9uIHRoZSBkZXZpY2UuXG4gKi9cblxuLyoqXG4gKiBJbnN0YWxscyB0aGUgZ2l2ZW4gYXBwbGljYXRpb24gdG8gdGhlIGRldmljZSB1bmRlciB0ZXN0XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGFwcFBhdGggLSBUaGUgbG9jYWwgYXBrIHBhdGggb3IgYSByZW1vdGUgdXJsXG4gKiBAcGFyYW0gez9JbnN0YWxsT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBzZXQgb2YgaW5zdGFsbGF0aW9uIG9wdGlvbnNcbiAqIEB0aHJvd3Mge0Vycm9yfSBpZiB0aGUgZ2l2ZW4gYXBrIGRvZXMgbm90IGV4aXN0IG9yIGlzIG5vdCByZWFjaGFibGVcbiAqL1xuY29tbWFuZHMuaW5zdGFsbEFwcCA9IGFzeW5jIGZ1bmN0aW9uIChhcHBQYXRoLCBvcHRpb25zID0ge30pIHtcbiAgY29uc3QgbG9jYWxQYXRoID0gYXdhaXQgdGhpcy5oZWxwZXJzLmNvbmZpZ3VyZUFwcChhcHBQYXRoLCBBUFBfRVhURU5TSU9OKTtcbiAgdHJ5IHtcbiAgICBhd2FpdCB0aGlzLmFkYi5pbnN0YWxsKGxvY2FsUGF0aCwgb3B0aW9ucyk7XG4gIH0gZmluYWxseSB7XG4gICAgaWYgKGxvY2FsUGF0aCAhPT0gYXBwUGF0aCkge1xuICAgICAgYXdhaXQgZnMucmltcmFmKGxvY2FsUGF0aCk7XG4gICAgfVxuICB9XG59O1xuXG5cbmV4cG9ydCB7IGNvbW1hbmRzIH07XG5leHBvcnQgZGVmYXVsdCBjb21tYW5kcztcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4ifQ==
