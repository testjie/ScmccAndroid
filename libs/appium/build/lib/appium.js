'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _config = require('./config');

var _appiumBaseDriver = require('appium-base-driver');

var _appiumFakeDriver = require('appium-fake-driver');

var _appiumAndroidDriver = require('appium-android-driver');

var _appiumIosDriver = require('appium-ios-driver');

var _appiumUiautomator2Driver = require('appium-uiautomator2-driver');

var _appiumSelendroidDriver = require('appium-selendroid-driver');

var _appiumXcuitestDriver = require('appium-xcuitest-driver');

var _appiumYouiengineDriver = require('appium-youiengine-driver');

var _appiumWindowsDriver = require('appium-windows-driver');

var _appiumMacDriver = require('appium-mac-driver');

var _appiumEspressoDriver = require('appium-espresso-driver');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _asyncLock = require('async-lock');

var _asyncLock2 = _interopRequireDefault(_asyncLock);

var _utils = require('./utils');

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

var sessionsListGuard = new _asyncLock2['default']();
var pendingDriversGuard = new _asyncLock2['default']();

var AppiumDriver = (function (_BaseDriver) {
  _inherits(AppiumDriver, _BaseDriver);

  function AppiumDriver(args) {
    _classCallCheck(this, AppiumDriver);

    _get(Object.getPrototypeOf(AppiumDriver.prototype), 'constructor', this).call(this);

    // the main Appium Driver has no new command timeout
    this.newCommandTimeoutMs = 0;

    this.args = _Object$assign({}, args);

    // Access to sessions list must be guarded with a Semaphore, because
    // it might be changed by other async calls at any time
    // It is not recommended to access this property directly from the outside
    this.sessions = {};

    // Access to pending drivers list must be guarded with a Semaphore, because
    // it might be changed by other async calls at any time
    // It is not recommended to access this property directly from the outside
    this.pendingDrivers = {};
  }

  // help decide which commands should be proxied to sub-drivers and which
  // should be handled by this, our umbrella driver

  /**
   * Cancel commands queueing for the umbrella Appium driver
   */

  _createClass(AppiumDriver, [{
    key: 'sessionExists',
    value: function sessionExists(sessionId) {
      var dstSession = this.sessions[sessionId];
      return dstSession && dstSession.sessionId !== null;
    }
  }, {
    key: 'driverForSession',
    value: function driverForSession(sessionId) {
      return this.sessions[sessionId];
    }
  }, {
    key: 'getDriverForCaps',
    value: function getDriverForCaps(caps) {
      // TODO if this logic ever becomes complex, should probably factor out
      // into its own file
      if (!caps.platformName || !_lodash2['default'].isString(caps.platformName)) {
        throw new Error("You must include a platformName capability");
      }

      // we don't necessarily have an `automationName` capability,
      if (caps.automationName) {
        if (caps.automationName.toLowerCase() === this.validAutomations.SELENDROID.toLowerCase()) {
          // but if we do and it is 'Selendroid', act on it
          return _appiumSelendroidDriver.SelendroidDriver;
        } else if (caps.automationName.toLowerCase() === this.validAutomations.UIAUTOMATOR2.toLowerCase()) {
          // but if we do and it is 'Uiautomator2', act on it
          return _appiumUiautomator2Driver.AndroidUiautomator2Driver;
        } else if (caps.automationName.toLowerCase() === this.validAutomations.XCUITEST.toLowerCase()) {
          // but if we do and it is 'XCUITest', act on it
          return _appiumXcuitestDriver.XCUITestDriver;
        } else if (caps.automationName.toLowerCase() === this.validAutomations.YOUIENGINE.toLowerCase()) {
          // but if we do and it is 'YouiEngine', act on it
          return _appiumYouiengineDriver.YouiEngineDriver;
        } else if (caps.automationName.toLowerCase() === this.validAutomations.ESPRESSO.toLowerCase()) {
          _logger2['default'].warn('The Appium Espresso driver is currently in early beta and meant only for experimental usage. Its API is not yet complete or guaranteed to work. Please report bugs to the Appium team on GitHub.');
          return _appiumEspressoDriver.EspressoDriver;
        }
      }

      if (caps.platformName.toLowerCase() === "fake") {
        return _appiumFakeDriver.FakeDriver;
      }

      if (caps.platformName.toLowerCase() === 'android') {
        var platformVersion = _semver2['default'].valid(_semver2['default'].coerce(caps.platformVersion));
        if (platformVersion && _semver2['default'].satisfies(platformVersion, '>=6.0.0')) {
          _logger2['default'].warn("Consider setting 'automationName' capability to " + ('\'' + this.validAutomations.UIAUTOMATOR2.toLowerCase() + '\' ') + "on Android >= 6, since UIAutomator framework " + "is not maintained anymore by the OS vendor.");
        }

        return _appiumAndroidDriver.AndroidDriver;
      }

      if (caps.platformName.toLowerCase() === 'ios') {
        var platformVersion = _semver2['default'].valid(_semver2['default'].coerce(caps.platformVersion));
        if (platformVersion && _semver2['default'].satisfies(platformVersion, '>=10.0.0')) {
          _logger2['default'].info("Requested iOS support with version >= 10, " + ('using \'' + this.validAutomations.XCUITEST.toLowerCase() + '\' ') + "driver instead of UIAutomation-based driver, since the " + "latter is unsupported on iOS 10 and up.");
          return _appiumXcuitestDriver.XCUITestDriver;
        }

        return _appiumIosDriver.IosDriver;
      }

      if (caps.platformName.toLowerCase() === 'windows') {
        return _appiumWindowsDriver.WindowsDriver;
      }

      if (caps.platformName.toLowerCase() === 'mac') {
        return _appiumMacDriver.MacDriver;
      }

      var msg = undefined;
      if (caps.automationName) {
        msg = 'Could not find a driver for automationName \'' + caps.automationName + '\' and platformName ' + ('\'' + caps.platformName + '\'.');
      } else {
        msg = 'Could not find a driver for platformName \'' + caps.platformName + '\'.';
      }
      throw new Error(msg + ' Please check your desired capabilities.');
    }
  }, {
    key: 'getDriverVersion',
    value: function getDriverVersion(driver) {
      var NAME_DRIVER_MAP = {
        SelendroidDriver: 'appium-selendroid-driver',
        AndroidUiautomator2Driver: 'appium-uiautomator2-driver',
        XCUITestDriver: 'appium-xcuitest-driver',
        YouiEngineDriver: 'appium-youiengine-driver',
        FakeDriver: 'appium-fake-driver',
        AndroidDriver: 'appium-android-driver',
        IosDriver: 'appium-ios-driver',
        WindowsDriver: 'appium-windows-driver',
        MacDriver: 'appium-mac-driver'
      };
      if (!NAME_DRIVER_MAP[driver.name]) {
        _logger2['default'].warn('Unable to get version of driver \'' + driver.name + '\'');
        return;
      }

      var _require = require(NAME_DRIVER_MAP[driver.name] + '/package.json');

      var version = _require.version;

      return version;
    }
  }, {
    key: 'getStatus',
    value: function getStatus() {
      var config, gitSha, status;
      return _regeneratorRuntime.async(function getStatus$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap((0, _config.getAppiumConfig)());

          case 2:
            config = context$2$0.sent;
            gitSha = config['git-sha'];
            status = { build: { version: config.version } };

            if (typeof gitSha !== "undefined") {
              status.build.revision = gitSha;
            }
            return context$2$0.abrupt('return', status);

          case 7:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'getSessions',
    value: function getSessions() {
      var sessions;
      return _regeneratorRuntime.async(function getSessions$(context$2$0) {
        var _this = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(sessionsListGuard.acquire(AppiumDriver.name, function () {
              return _this.sessions;
            }));

          case 2:
            sessions = context$2$0.sent;
            return context$2$0.abrupt('return', _lodash2['default'].toPairs(sessions).map(function (_ref) {
              var _ref2 = _slicedToArray(_ref, 2);

              var id = _ref2[0];
              var driver = _ref2[1];

              return { id: id, capabilities: driver.caps };
            }));

          case 4:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'printNewSessionAnnouncement',
    value: function printNewSessionAnnouncement(driver, caps) {
      var driverVersion = this.getDriverVersion(driver);
      var introString = driverVersion ? 'Creating new ' + driver.name + ' (v' + driverVersion + ') session' : 'Creating new ' + driver.name + ' session';
      _logger2['default'].info(introString);
      _logger2['default'].info('Capabilities:');
      (0, _utils.inspectObject)(caps);
    }

    /**
     * Create a new session
     * @param {Object} jsonwpCaps JSONWP formatted desired capabilities
     * @param {Object} reqCaps Required capabilities (JSONWP standard)
     * @param {Object} w3cCapabilities W3C capabilities
     * @return {Array} Unique session ID and capabilities
     */
  }, {
    key: 'createSession',
    value: function createSession(jsonwpCaps, reqCaps, w3cCapabilities) {
      var defaultCapabilities, protocol, innerSessionId, dCaps;
      return _regeneratorRuntime.async(function createSession$(context$2$0) {
        var _this3 = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            defaultCapabilities = this.args.defaultCapabilities;
            protocol = undefined;
            innerSessionId = undefined, dCaps = undefined;
            context$2$0.prev = 3;
            context$2$0.next = 6;
            return _regeneratorRuntime.awrap((function callee$2$0() {
              var parsedCaps, desiredCaps, processedJsonwpCapabilities, processedW3CCapabilities, error, InnerDriver, sessionIdsToDelete, runningDriversData, otherPendingDriversData, d, _ref3, _ref32;

              return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                var _this2 = this;

                while (1) switch (context$3$0.prev = context$3$0.next) {
                  case 0:
                    parsedCaps = (0, _utils.parseCapsForInnerDriver)(jsonwpCaps, w3cCapabilities, this.desiredCapConstraints, defaultCapabilities);
                    desiredCaps = parsedCaps.desiredCaps;
                    processedJsonwpCapabilities = parsedCaps.processedJsonwpCapabilities;
                    processedW3CCapabilities = parsedCaps.processedW3CCapabilities;
                    error = parsedCaps.error;

                    protocol = parsedCaps.protocol;

                    // If the parsing of the caps produced an error, throw it in here

                    if (!error) {
                      context$3$0.next = 8;
                      break;
                    }

                    throw error;

                  case 8:
                    InnerDriver = this.getDriverForCaps(desiredCaps);

                    this.printNewSessionAnnouncement(InnerDriver, desiredCaps);

                    if (!this.args.sessionOverride) {
                      context$3$0.next = 23;
                      break;
                    }

                    context$3$0.next = 13;
                    return _regeneratorRuntime.awrap(sessionsListGuard.acquire(AppiumDriver.name, function () {
                      return _lodash2['default'].keys(_this2.sessions);
                    }));

                  case 13:
                    sessionIdsToDelete = context$3$0.sent;

                    if (!sessionIdsToDelete.length) {
                      context$3$0.next = 23;
                      break;
                    }

                    _logger2['default'].info('Session override is on. Deleting other ' + sessionIdsToDelete.length + ' active session' + (sessionIdsToDelete.length ? '' : 's') + '.');
                    context$3$0.prev = 16;
                    context$3$0.next = 19;
                    return _regeneratorRuntime.awrap(_bluebird2['default'].map(sessionIdsToDelete, function (id) {
                      return _this2.deleteSession(id);
                    }));

                  case 19:
                    context$3$0.next = 23;
                    break;

                  case 21:
                    context$3$0.prev = 21;
                    context$3$0.t0 = context$3$0['catch'](16);

                  case 23:
                    runningDriversData = undefined, otherPendingDriversData = undefined;
                    d = new InnerDriver(this.args);

                    if (this.args.relaxedSecurityEnabled) {
                      _logger2['default'].info('Applying relaxed security to ' + InnerDriver.name + ' as per server command line argument');
                      d.relaxedSecurityEnabled = true;
                    }
                    // This assignment is required for correct web sockets functionality inside the driver
                    d.server = this.server;
                    context$3$0.prev = 27;
                    context$3$0.next = 30;
                    return _regeneratorRuntime.awrap(this.curSessionDataForDriver(InnerDriver));

                  case 30:
                    runningDriversData = context$3$0.sent;
                    context$3$0.next = 36;
                    break;

                  case 33:
                    context$3$0.prev = 33;
                    context$3$0.t1 = context$3$0['catch'](27);
                    throw new _appiumBaseDriver.errors.SessionNotCreatedError(context$3$0.t1.message);

                  case 36:
                    context$3$0.next = 38;
                    return _regeneratorRuntime.awrap(pendingDriversGuard.acquire(AppiumDriver.name, function () {
                      _this2.pendingDrivers[InnerDriver.name] = _this2.pendingDrivers[InnerDriver.name] || [];
                      otherPendingDriversData = _this2.pendingDrivers[InnerDriver.name].map(function (drv) {
                        return drv.driverData;
                      });
                      _this2.pendingDrivers[InnerDriver.name].push(d);
                    }));

                  case 38:
                    context$3$0.prev = 38;
                    context$3$0.next = 41;
                    return _regeneratorRuntime.awrap(d.createSession(processedJsonwpCapabilities, reqCaps, processedW3CCapabilities, [].concat(_toConsumableArray(runningDriversData), _toConsumableArray(otherPendingDriversData))));

                  case 41:
                    _ref3 = context$3$0.sent;
                    _ref32 = _slicedToArray(_ref3, 2);
                    innerSessionId = _ref32[0];
                    dCaps = _ref32[1];

                    protocol = d.protocol;
                    context$3$0.next = 48;
                    return _regeneratorRuntime.awrap(sessionsListGuard.acquire(AppiumDriver.name, function () {
                      _this2.sessions[innerSessionId] = d;
                    }));

                  case 48:
                    context$3$0.prev = 48;
                    context$3$0.next = 51;
                    return _regeneratorRuntime.awrap(pendingDriversGuard.acquire(AppiumDriver.name, function () {
                      _lodash2['default'].pull(_this2.pendingDrivers[InnerDriver.name], d);
                    }));

                  case 51:
                    return context$3$0.finish(48);

                  case 52:

                    // this is an async function but we don't await it because it handles
                    // an out-of-band promise which is fulfilled if the inner driver
                    // unexpectedly shuts down
                    this.attachUnexpectedShutdownHandler(d, innerSessionId);

                    _logger2['default'].info('New ' + InnerDriver.name + ' session created successfully, session ' + (innerSessionId + ' added to master session list'));

                    // set the New Command Timeout for the inner driver
                    d.startNewCommandTimeout();

                  case 55:
                  case 'end':
                    return context$3$0.stop();
                }
              }, null, _this3, [[16, 21], [27, 33], [38,, 48, 52]]);
            })());

          case 6:
            context$2$0.next = 11;
            break;

          case 8:
            context$2$0.prev = 8;
            context$2$0.t0 = context$2$0['catch'](3);
            return context$2$0.abrupt('return', {
              protocol: protocol,
              error: context$2$0.t0
            });

          case 11:
            return context$2$0.abrupt('return', {
              protocol: protocol,
              value: [innerSessionId, dCaps, protocol]
            });

          case 12:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[3, 8]]);
    }
  }, {
    key: 'attachUnexpectedShutdownHandler',
    value: function attachUnexpectedShutdownHandler(driver, innerSessionId) {
      return _regeneratorRuntime.async(function attachUnexpectedShutdownHandler$(context$2$0) {
        var _this4 = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.prev = 0;
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(driver.onUnexpectedShutdown);

          case 3:
            throw new Error('Unexpected shutdown');

          case 6:
            context$2$0.prev = 6;
            context$2$0.t0 = context$2$0['catch'](0);

            if (!(context$2$0.t0 instanceof _bluebird2['default'].CancellationError)) {
              context$2$0.next = 10;
              break;
            }

            return context$2$0.abrupt('return');

          case 10:
            _logger2['default'].warn('Closing session, cause was \'' + context$2$0.t0.message + '\'');
            _logger2['default'].info('Removing session ' + innerSessionId + ' from our master session list');
            context$2$0.next = 14;
            return _regeneratorRuntime.awrap(sessionsListGuard.acquire(AppiumDriver.name, function () {
              delete _this4.sessions[innerSessionId];
            }));

          case 14:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[0, 6]]);
    }
  }, {
    key: 'curSessionDataForDriver',
    value: function curSessionDataForDriver(InnerDriver) {
      var sessions, data, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, datum;

      return _regeneratorRuntime.async(function curSessionDataForDriver$(context$2$0) {
        var _this5 = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(sessionsListGuard.acquire(AppiumDriver.name, function () {
              return _this5.sessions;
            }));

          case 2:
            sessions = context$2$0.sent;
            data = _lodash2['default'].values(sessions).filter(function (s) {
              return s.constructor.name === InnerDriver.name;
            }).map(function (s) {
              return s.driverData;
            });
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            context$2$0.prev = 7;
            _iterator = _getIterator(data);

          case 9:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              context$2$0.next = 16;
              break;
            }

            datum = _step.value;

            if (datum) {
              context$2$0.next = 13;
              break;
            }

            throw new Error('Problem getting session data for driver type ' + (InnerDriver.name + '; does it implement \'get ') + 'driverData\'?');

          case 13:
            _iteratorNormalCompletion = true;
            context$2$0.next = 9;
            break;

          case 16:
            context$2$0.next = 22;
            break;

          case 18:
            context$2$0.prev = 18;
            context$2$0.t0 = context$2$0['catch'](7);
            _didIteratorError = true;
            _iteratorError = context$2$0.t0;

          case 22:
            context$2$0.prev = 22;
            context$2$0.prev = 23;

            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }

          case 25:
            context$2$0.prev = 25;

            if (!_didIteratorError) {
              context$2$0.next = 28;
              break;
            }

            throw _iteratorError;

          case 28:
            return context$2$0.finish(25);

          case 29:
            return context$2$0.finish(22);

          case 30:
            return context$2$0.abrupt('return', data);

          case 31:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[7, 18, 22, 30], [23,, 25, 29]]);
    }
  }, {
    key: 'deleteSession',
    value: function deleteSession(sessionId) {
      var protocol, _ret2;

      return _regeneratorRuntime.async(function deleteSession$(context$2$0) {
        var _this7 = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            protocol = undefined;
            context$2$0.prev = 1;
            context$2$0.next = 4;
            return _regeneratorRuntime.awrap((function callee$2$0() {
              var otherSessionsData, dstSession;
              return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                var _this6 = this;

                while (1) switch (context$3$0.prev = context$3$0.next) {
                  case 0:
                    otherSessionsData = null;
                    dstSession = null;
                    context$3$0.next = 4;
                    return _regeneratorRuntime.awrap(sessionsListGuard.acquire(AppiumDriver.name, function () {
                      if (!_this6.sessions[sessionId]) {
                        return;
                      }
                      var curConstructorName = _this6.sessions[sessionId].constructor.name;
                      otherSessionsData = _lodash2['default'].toPairs(_this6.sessions).filter(function (_ref4) {
                        var _ref42 = _slicedToArray(_ref4, 2);

                        var key = _ref42[0];
                        var value = _ref42[1];
                        return value.constructor.name === curConstructorName && key !== sessionId;
                      }).map(function (_ref5) {
                        var _ref52 = _slicedToArray(_ref5, 2);

                        var value = _ref52[1];
                        return value.driverData;
                      });
                      dstSession = _this6.sessions[sessionId];
                      protocol = dstSession.protocol;
                      _logger2['default'].info('Removing session ' + sessionId + ' from our master session list');
                      // regardless of whether the deleteSession completes successfully or not
                      // make the session unavailable, because who knows what state it might
                      // be in otherwise
                      delete _this6.sessions[sessionId];
                    }));

                  case 4:
                    context$3$0.t0 = protocol;
                    context$3$0.next = 7;
                    return _regeneratorRuntime.awrap(dstSession.deleteSession(sessionId, otherSessionsData));

                  case 7:
                    context$3$0.t1 = context$3$0.sent;
                    context$3$0.t2 = {
                      protocol: context$3$0.t0,
                      value: context$3$0.t1
                    };
                    return context$3$0.abrupt('return', {
                      v: context$3$0.t2
                    });

                  case 10:
                  case 'end':
                    return context$3$0.stop();
                }
              }, null, _this7);
            })());

          case 4:
            _ret2 = context$2$0.sent;

            if (!(typeof _ret2 === 'object')) {
              context$2$0.next = 7;
              break;
            }

            return context$2$0.abrupt('return', _ret2.v);

          case 7:
            context$2$0.next = 13;
            break;

          case 9:
            context$2$0.prev = 9;
            context$2$0.t0 = context$2$0['catch'](1);

            _logger2['default'].error('Had trouble ending session ' + sessionId + ': ' + context$2$0.t0.message);
            return context$2$0.abrupt('return', {
              protocol: protocol,
              error: context$2$0.t0
            });

          case 13:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[1, 9]]);
    }
  }, {
    key: 'executeCommand',
    value: function executeCommand(cmd) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var _get2, sessionId, dstSession, res;

      return _regeneratorRuntime.async(function executeCommand$(context$2$0) {
        var _this8 = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (!(cmd === 'getStatus')) {
              context$2$0.next = 4;
              break;
            }

            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(this.getStatus());

          case 3:
            return context$2$0.abrupt('return', context$2$0.sent);

          case 4:
            if (!isAppiumDriverCommand(cmd)) {
              context$2$0.next = 8;
              break;
            }

            context$2$0.next = 7;
            return _regeneratorRuntime.awrap((_get2 = _get(Object.getPrototypeOf(AppiumDriver.prototype), 'executeCommand', this)).call.apply(_get2, [this, cmd].concat(args)));

          case 7:
            return context$2$0.abrupt('return', context$2$0.sent);

          case 8:
            sessionId = _lodash2['default'].last(args);
            context$2$0.next = 11;
            return _regeneratorRuntime.awrap(sessionsListGuard.acquire(AppiumDriver.name, function () {
              return _this8.sessions[sessionId];
            }));

          case 11:
            dstSession = context$2$0.sent;

            if (dstSession) {
              context$2$0.next = 14;
              break;
            }

            throw new Error('The session with id \'' + sessionId + '\' does not exist');

          case 14:
            res = {
              protocol: dstSession.protocol
            };
            context$2$0.prev = 15;
            context$2$0.next = 18;
            return _regeneratorRuntime.awrap(dstSession.executeCommand.apply(dstSession, [cmd].concat(args)));

          case 18:
            res.value = context$2$0.sent;
            context$2$0.next = 24;
            break;

          case 21:
            context$2$0.prev = 21;
            context$2$0.t0 = context$2$0['catch'](15);

            res.error = context$2$0.t0;

          case 24:
            return context$2$0.abrupt('return', res);

          case 25:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[15, 21]]);
    }
  }, {
    key: 'proxyActive',
    value: function proxyActive(sessionId) {
      var dstSession = this.sessions[sessionId];
      return dstSession && _lodash2['default'].isFunction(dstSession.proxyActive) && dstSession.proxyActive(sessionId);
    }
  }, {
    key: 'getProxyAvoidList',
    value: function getProxyAvoidList(sessionId) {
      var dstSession = this.sessions[sessionId];
      return dstSession ? dstSession.getProxyAvoidList() : [];
    }
  }, {
    key: 'canProxy',
    value: function canProxy(sessionId) {
      var dstSession = this.sessions[sessionId];
      return dstSession && dstSession.canProxy(sessionId);
    }
  }, {
    key: 'isCommandsQueueEnabled',
    get: function get() {
      return false;
    }
  }]);

  return AppiumDriver;
})(_appiumBaseDriver.BaseDriver);

function isAppiumDriverCommand(cmd) {
  return !(0, _appiumBaseDriver.isSessionCommand)(cmd) || cmd === "deleteSession";
}

exports.AppiumDriver = AppiumDriver;

// Parse the caps into a format that the InnerDriver will accept

// Remove the session on unexpected shutdown, so that we are in a position
// to open another session later on.
// TODO: this should be removed and replaced by a onShutdown callback.
// this is a cancellable promise
// if we get here, we've had an unexpected shutdown, so error

// if we cancelled the unexpected shutdown promise, that means we
// no longer care about it, and can safely ignore it

// getStatus command should not be put into queue. If we do it as part of super.executeCommand, it will be added to queue.
// There will be lot of status commands in queue during createSession command, as createSession can take up to or more than a minute.
//# sourceMappingURL=data:application/json;charset=utf8;base64,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IjoibGliL2FwcGl1bS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgbG9nIGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7IGdldEFwcGl1bUNvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IEJhc2VEcml2ZXIsIGVycm9ycywgaXNTZXNzaW9uQ29tbWFuZCB9IGZyb20gJ2FwcGl1bS1iYXNlLWRyaXZlcic7XG5pbXBvcnQgeyBGYWtlRHJpdmVyIH0gZnJvbSAnYXBwaXVtLWZha2UtZHJpdmVyJztcbmltcG9ydCB7IEFuZHJvaWREcml2ZXIgfSBmcm9tICdhcHBpdW0tYW5kcm9pZC1kcml2ZXInO1xuaW1wb3J0IHsgSW9zRHJpdmVyIH0gZnJvbSAnYXBwaXVtLWlvcy1kcml2ZXInO1xuaW1wb3J0IHsgQW5kcm9pZFVpYXV0b21hdG9yMkRyaXZlciB9IGZyb20gJ2FwcGl1bS11aWF1dG9tYXRvcjItZHJpdmVyJztcbmltcG9ydCB7IFNlbGVuZHJvaWREcml2ZXIgfSBmcm9tICdhcHBpdW0tc2VsZW5kcm9pZC1kcml2ZXInO1xuaW1wb3J0IHsgWENVSVRlc3REcml2ZXIgfSBmcm9tICdhcHBpdW0teGN1aXRlc3QtZHJpdmVyJztcbmltcG9ydCB7IFlvdWlFbmdpbmVEcml2ZXIgfSBmcm9tICdhcHBpdW0teW91aWVuZ2luZS1kcml2ZXInO1xuaW1wb3J0IHsgV2luZG93c0RyaXZlciB9IGZyb20gJ2FwcGl1bS13aW5kb3dzLWRyaXZlcic7XG5pbXBvcnQgeyBNYWNEcml2ZXIgfSBmcm9tICdhcHBpdW0tbWFjLWRyaXZlcic7XG5pbXBvcnQgeyBFc3ByZXNzb0RyaXZlciB9IGZyb20gJ2FwcGl1bS1lc3ByZXNzby1kcml2ZXInO1xuaW1wb3J0IEIgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IEFzeW5jTG9jayBmcm9tICdhc3luYy1sb2NrJztcbmltcG9ydCB7IGluc3BlY3RPYmplY3QsIHBhcnNlQ2Fwc0ZvcklubmVyRHJpdmVyIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgc2VtdmVyIGZyb20gJ3NlbXZlcic7XG5cbmNvbnN0IHNlc3Npb25zTGlzdEd1YXJkID0gbmV3IEFzeW5jTG9jaygpO1xuY29uc3QgcGVuZGluZ0RyaXZlcnNHdWFyZCA9IG5ldyBBc3luY0xvY2soKTtcblxuY2xhc3MgQXBwaXVtRHJpdmVyIGV4dGVuZHMgQmFzZURyaXZlciB7XG4gIGNvbnN0cnVjdG9yIChhcmdzKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIC8vIHRoZSBtYWluIEFwcGl1bSBEcml2ZXIgaGFzIG5vIG5ldyBjb21tYW5kIHRpbWVvdXRcbiAgICB0aGlzLm5ld0NvbW1hbmRUaW1lb3V0TXMgPSAwO1xuXG4gICAgdGhpcy5hcmdzID0gT2JqZWN0LmFzc2lnbih7fSwgYXJncyk7XG5cbiAgICAvLyBBY2Nlc3MgdG8gc2Vzc2lvbnMgbGlzdCBtdXN0IGJlIGd1YXJkZWQgd2l0aCBhIFNlbWFwaG9yZSwgYmVjYXVzZVxuICAgIC8vIGl0IG1pZ2h0IGJlIGNoYW5nZWQgYnkgb3RoZXIgYXN5bmMgY2FsbHMgYXQgYW55IHRpbWVcbiAgICAvLyBJdCBpcyBub3QgcmVjb21tZW5kZWQgdG8gYWNjZXNzIHRoaXMgcHJvcGVydHkgZGlyZWN0bHkgZnJvbSB0aGUgb3V0c2lkZVxuICAgIHRoaXMuc2Vzc2lvbnMgPSB7fTtcblxuICAgIC8vIEFjY2VzcyB0byBwZW5kaW5nIGRyaXZlcnMgbGlzdCBtdXN0IGJlIGd1YXJkZWQgd2l0aCBhIFNlbWFwaG9yZSwgYmVjYXVzZVxuICAgIC8vIGl0IG1pZ2h0IGJlIGNoYW5nZWQgYnkgb3RoZXIgYXN5bmMgY2FsbHMgYXQgYW55IHRpbWVcbiAgICAvLyBJdCBpcyBub3QgcmVjb21tZW5kZWQgdG8gYWNjZXNzIHRoaXMgcHJvcGVydHkgZGlyZWN0bHkgZnJvbSB0aGUgb3V0c2lkZVxuICAgIHRoaXMucGVuZGluZ0RyaXZlcnMgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYW5jZWwgY29tbWFuZHMgcXVldWVpbmcgZm9yIHRoZSB1bWJyZWxsYSBBcHBpdW0gZHJpdmVyXG4gICAqL1xuICBnZXQgaXNDb21tYW5kc1F1ZXVlRW5hYmxlZCAoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc2Vzc2lvbkV4aXN0cyAoc2Vzc2lvbklkKSB7XG4gICAgY29uc3QgZHN0U2Vzc2lvbiA9IHRoaXMuc2Vzc2lvbnNbc2Vzc2lvbklkXTtcbiAgICByZXR1cm4gZHN0U2Vzc2lvbiAmJiBkc3RTZXNzaW9uLnNlc3Npb25JZCAhPT0gbnVsbDtcbiAgfVxuXG4gIGRyaXZlckZvclNlc3Npb24gKHNlc3Npb25JZCkge1xuICAgIHJldHVybiB0aGlzLnNlc3Npb25zW3Nlc3Npb25JZF07XG4gIH1cblxuICBnZXREcml2ZXJGb3JDYXBzIChjYXBzKSB7XG4gICAgLy8gVE9ETyBpZiB0aGlzIGxvZ2ljIGV2ZXIgYmVjb21lcyBjb21wbGV4LCBzaG91bGQgcHJvYmFibHkgZmFjdG9yIG91dFxuICAgIC8vIGludG8gaXRzIG93biBmaWxlXG4gICAgaWYgKCFjYXBzLnBsYXRmb3JtTmFtZSB8fCAhXy5pc1N0cmluZyhjYXBzLnBsYXRmb3JtTmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIllvdSBtdXN0IGluY2x1ZGUgYSBwbGF0Zm9ybU5hbWUgY2FwYWJpbGl0eVwiKTtcbiAgICB9XG5cbiAgICAvLyB3ZSBkb24ndCBuZWNlc3NhcmlseSBoYXZlIGFuIGBhdXRvbWF0aW9uTmFtZWAgY2FwYWJpbGl0eSxcbiAgICBpZiAoY2Fwcy5hdXRvbWF0aW9uTmFtZSkge1xuICAgICAgaWYgKGNhcHMuYXV0b21hdGlvbk5hbWUudG9Mb3dlckNhc2UoKSA9PT0gdGhpcy52YWxpZEF1dG9tYXRpb25zLlNFTEVORFJPSUQudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAvLyBidXQgaWYgd2UgZG8gYW5kIGl0IGlzICdTZWxlbmRyb2lkJywgYWN0IG9uIGl0XG4gICAgICAgIHJldHVybiBTZWxlbmRyb2lkRHJpdmVyO1xuICAgICAgfSBlbHNlIGlmIChjYXBzLmF1dG9tYXRpb25OYW1lLnRvTG93ZXJDYXNlKCkgPT09IHRoaXMudmFsaWRBdXRvbWF0aW9ucy5VSUFVVE9NQVRPUjIudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAvLyBidXQgaWYgd2UgZG8gYW5kIGl0IGlzICdVaWF1dG9tYXRvcjInLCBhY3Qgb24gaXRcbiAgICAgICAgcmV0dXJuIEFuZHJvaWRVaWF1dG9tYXRvcjJEcml2ZXI7XG4gICAgICB9IGVsc2UgaWYgKGNhcHMuYXV0b21hdGlvbk5hbWUudG9Mb3dlckNhc2UoKSA9PT0gdGhpcy52YWxpZEF1dG9tYXRpb25zLlhDVUlURVNULnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgLy8gYnV0IGlmIHdlIGRvIGFuZCBpdCBpcyAnWENVSVRlc3QnLCBhY3Qgb24gaXRcbiAgICAgICAgcmV0dXJuIFhDVUlUZXN0RHJpdmVyO1xuICAgICAgfSBlbHNlIGlmIChjYXBzLmF1dG9tYXRpb25OYW1lLnRvTG93ZXJDYXNlKCkgPT09IHRoaXMudmFsaWRBdXRvbWF0aW9ucy5ZT1VJRU5HSU5FLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgLy8gYnV0IGlmIHdlIGRvIGFuZCBpdCBpcyAnWW91aUVuZ2luZScsIGFjdCBvbiBpdFxuICAgICAgICByZXR1cm4gWW91aUVuZ2luZURyaXZlcjtcbiAgICAgIH0gZWxzZSBpZiAoY2Fwcy5hdXRvbWF0aW9uTmFtZS50b0xvd2VyQ2FzZSgpID09PSB0aGlzLnZhbGlkQXV0b21hdGlvbnMuRVNQUkVTU08udG9Mb3dlckNhc2UoKSkge1xuICAgICAgICBsb2cud2FybignVGhlIEFwcGl1bSBFc3ByZXNzbyBkcml2ZXIgaXMgY3VycmVudGx5IGluIGVhcmx5IGJldGEgYW5kIG1lYW50IG9ubHkgZm9yIGV4cGVyaW1lbnRhbCB1c2FnZS4gSXRzIEFQSSBpcyBub3QgeWV0IGNvbXBsZXRlIG9yIGd1YXJhbnRlZWQgdG8gd29yay4gUGxlYXNlIHJlcG9ydCBidWdzIHRvIHRoZSBBcHBpdW0gdGVhbSBvbiBHaXRIdWIuJyk7XG4gICAgICAgIHJldHVybiBFc3ByZXNzb0RyaXZlcjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY2Fwcy5wbGF0Zm9ybU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJmYWtlXCIpIHtcbiAgICAgIHJldHVybiBGYWtlRHJpdmVyO1xuICAgIH1cblxuICAgIGlmIChjYXBzLnBsYXRmb3JtTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnYW5kcm9pZCcpIHtcbiAgICAgIGNvbnN0IHBsYXRmb3JtVmVyc2lvbiA9IHNlbXZlci52YWxpZChzZW12ZXIuY29lcmNlKGNhcHMucGxhdGZvcm1WZXJzaW9uKSk7XG4gICAgICBpZiAocGxhdGZvcm1WZXJzaW9uICYmIHNlbXZlci5zYXRpc2ZpZXMocGxhdGZvcm1WZXJzaW9uLCAnPj02LjAuMCcpKSB7XG4gICAgICAgIGxvZy53YXJuKFwiQ29uc2lkZXIgc2V0dGluZyAnYXV0b21hdGlvbk5hbWUnIGNhcGFiaWxpdHkgdG8gXCIgK1xuICAgICAgICAgICAgICAgICBgJyR7dGhpcy52YWxpZEF1dG9tYXRpb25zLlVJQVVUT01BVE9SMi50b0xvd2VyQ2FzZSgpfScgYCArXG4gICAgICAgICAgICAgICAgIFwib24gQW5kcm9pZCA+PSA2LCBzaW5jZSBVSUF1dG9tYXRvciBmcmFtZXdvcmsgXCIgK1xuICAgICAgICAgICAgICAgICBcImlzIG5vdCBtYWludGFpbmVkIGFueW1vcmUgYnkgdGhlIE9TIHZlbmRvci5cIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBBbmRyb2lkRHJpdmVyO1xuICAgIH1cblxuICAgIGlmIChjYXBzLnBsYXRmb3JtTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaW9zJykge1xuICAgICAgY29uc3QgcGxhdGZvcm1WZXJzaW9uID0gc2VtdmVyLnZhbGlkKHNlbXZlci5jb2VyY2UoY2Fwcy5wbGF0Zm9ybVZlcnNpb24pKTtcbiAgICAgIGlmIChwbGF0Zm9ybVZlcnNpb24gJiYgc2VtdmVyLnNhdGlzZmllcyhwbGF0Zm9ybVZlcnNpb24sICc+PTEwLjAuMCcpKSB7XG4gICAgICAgIGxvZy5pbmZvKFwiUmVxdWVzdGVkIGlPUyBzdXBwb3J0IHdpdGggdmVyc2lvbiA+PSAxMCwgXCIgK1xuICAgICAgICAgICAgICAgICBgdXNpbmcgJyR7dGhpcy52YWxpZEF1dG9tYXRpb25zLlhDVUlURVNULnRvTG93ZXJDYXNlKCl9JyBgICtcbiAgICAgICAgICAgICAgICAgXCJkcml2ZXIgaW5zdGVhZCBvZiBVSUF1dG9tYXRpb24tYmFzZWQgZHJpdmVyLCBzaW5jZSB0aGUgXCIgK1xuICAgICAgICAgICAgICAgICBcImxhdHRlciBpcyB1bnN1cHBvcnRlZCBvbiBpT1MgMTAgYW5kIHVwLlwiKTtcbiAgICAgICAgcmV0dXJuIFhDVUlUZXN0RHJpdmVyO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gSW9zRHJpdmVyO1xuICAgIH1cblxuICAgIGlmIChjYXBzLnBsYXRmb3JtTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnd2luZG93cycpIHtcbiAgICAgIHJldHVybiBXaW5kb3dzRHJpdmVyO1xuICAgIH1cblxuICAgIGlmIChjYXBzLnBsYXRmb3JtTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnbWFjJykge1xuICAgICAgcmV0dXJuIE1hY0RyaXZlcjtcbiAgICB9XG5cbiAgICBsZXQgbXNnO1xuICAgIGlmIChjYXBzLmF1dG9tYXRpb25OYW1lKSB7XG4gICAgICBtc2cgPSBgQ291bGQgbm90IGZpbmQgYSBkcml2ZXIgZm9yIGF1dG9tYXRpb25OYW1lICcke2NhcHMuYXV0b21hdGlvbk5hbWV9JyBhbmQgcGxhdGZvcm1OYW1lIGAgK1xuICAgICAgICAgICAgYCcke2NhcHMucGxhdGZvcm1OYW1lfScuYDtcbiAgICB9IGVsc2Uge1xuICAgICAgbXNnID0gYENvdWxkIG5vdCBmaW5kIGEgZHJpdmVyIGZvciBwbGF0Zm9ybU5hbWUgJyR7Y2Fwcy5wbGF0Zm9ybU5hbWV9Jy5gO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7bXNnfSBQbGVhc2UgY2hlY2sgeW91ciBkZXNpcmVkIGNhcGFiaWxpdGllcy5gKTtcbiAgfVxuXG4gIGdldERyaXZlclZlcnNpb24gKGRyaXZlcikge1xuICAgIGNvbnN0IE5BTUVfRFJJVkVSX01BUCA9IHtcbiAgICAgIFNlbGVuZHJvaWREcml2ZXI6ICdhcHBpdW0tc2VsZW5kcm9pZC1kcml2ZXInLFxuICAgICAgQW5kcm9pZFVpYXV0b21hdG9yMkRyaXZlcjogJ2FwcGl1bS11aWF1dG9tYXRvcjItZHJpdmVyJyxcbiAgICAgIFhDVUlUZXN0RHJpdmVyOiAnYXBwaXVtLXhjdWl0ZXN0LWRyaXZlcicsXG4gICAgICBZb3VpRW5naW5lRHJpdmVyOiAnYXBwaXVtLXlvdWllbmdpbmUtZHJpdmVyJyxcbiAgICAgIEZha2VEcml2ZXI6ICdhcHBpdW0tZmFrZS1kcml2ZXInLFxuICAgICAgQW5kcm9pZERyaXZlcjogJ2FwcGl1bS1hbmRyb2lkLWRyaXZlcicsXG4gICAgICBJb3NEcml2ZXI6ICdhcHBpdW0taW9zLWRyaXZlcicsXG4gICAgICBXaW5kb3dzRHJpdmVyOiAnYXBwaXVtLXdpbmRvd3MtZHJpdmVyJyxcbiAgICAgIE1hY0RyaXZlcjogJ2FwcGl1bS1tYWMtZHJpdmVyJyxcbiAgICB9O1xuICAgIGlmICghTkFNRV9EUklWRVJfTUFQW2RyaXZlci5uYW1lXSkge1xuICAgICAgbG9nLndhcm4oYFVuYWJsZSB0byBnZXQgdmVyc2lvbiBvZiBkcml2ZXIgJyR7ZHJpdmVyLm5hbWV9J2ApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQge3ZlcnNpb259ID0gcmVxdWlyZShgJHtOQU1FX0RSSVZFUl9NQVBbZHJpdmVyLm5hbWVdfS9wYWNrYWdlLmpzb25gKTtcbiAgICByZXR1cm4gdmVyc2lvbjtcbiAgfVxuXG4gIGFzeW5jIGdldFN0YXR1cyAoKSB7XG4gICAgbGV0IGNvbmZpZyA9IGF3YWl0IGdldEFwcGl1bUNvbmZpZygpO1xuICAgIGxldCBnaXRTaGEgPSBjb25maWdbJ2dpdC1zaGEnXTtcbiAgICBsZXQgc3RhdHVzID0ge2J1aWxkOiB7dmVyc2lvbjogY29uZmlnLnZlcnNpb259fTtcbiAgICBpZiAodHlwZW9mIGdpdFNoYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgc3RhdHVzLmJ1aWxkLnJldmlzaW9uID0gZ2l0U2hhO1xuICAgIH1cbiAgICByZXR1cm4gc3RhdHVzO1xuICB9XG5cbiAgYXN5bmMgZ2V0U2Vzc2lvbnMgKCkge1xuICAgIGNvbnN0IHNlc3Npb25zID0gYXdhaXQgc2Vzc2lvbnNMaXN0R3VhcmQuYWNxdWlyZShBcHBpdW1Ecml2ZXIubmFtZSwgKCkgPT4gdGhpcy5zZXNzaW9ucyk7XG4gICAgcmV0dXJuIF8udG9QYWlycyhzZXNzaW9ucylcbiAgICAgICAgLm1hcCgoW2lkLCBkcml2ZXJdKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtpZCwgY2FwYWJpbGl0aWVzOiBkcml2ZXIuY2Fwc307XG4gICAgICAgIH0pO1xuICB9XG5cbiAgcHJpbnROZXdTZXNzaW9uQW5ub3VuY2VtZW50IChkcml2ZXIsIGNhcHMpIHtcbiAgICBsZXQgZHJpdmVyVmVyc2lvbiA9IHRoaXMuZ2V0RHJpdmVyVmVyc2lvbihkcml2ZXIpO1xuICAgIGxldCBpbnRyb1N0cmluZyA9IGRyaXZlclZlcnNpb24gP1xuICAgICAgYENyZWF0aW5nIG5ldyAke2RyaXZlci5uYW1lfSAodiR7ZHJpdmVyVmVyc2lvbn0pIHNlc3Npb25gIDpcbiAgICAgIGBDcmVhdGluZyBuZXcgJHtkcml2ZXIubmFtZX0gc2Vzc2lvbmA7XG4gICAgbG9nLmluZm8oaW50cm9TdHJpbmcpO1xuICAgIGxvZy5pbmZvKCdDYXBhYmlsaXRpZXM6Jyk7XG4gICAgaW5zcGVjdE9iamVjdChjYXBzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgc2Vzc2lvblxuICAgKiBAcGFyYW0ge09iamVjdH0ganNvbndwQ2FwcyBKU09OV1AgZm9ybWF0dGVkIGRlc2lyZWQgY2FwYWJpbGl0aWVzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXFDYXBzIFJlcXVpcmVkIGNhcGFiaWxpdGllcyAoSlNPTldQIHN0YW5kYXJkKVxuICAgKiBAcGFyYW0ge09iamVjdH0gdzNjQ2FwYWJpbGl0aWVzIFczQyBjYXBhYmlsaXRpZXNcbiAgICogQHJldHVybiB7QXJyYXl9IFVuaXF1ZSBzZXNzaW9uIElEIGFuZCBjYXBhYmlsaXRpZXNcbiAgICovXG4gIGFzeW5jIGNyZWF0ZVNlc3Npb24gKGpzb253cENhcHMsIHJlcUNhcHMsIHczY0NhcGFiaWxpdGllcykge1xuICAgIGxldCB7ZGVmYXVsdENhcGFiaWxpdGllc30gPSB0aGlzLmFyZ3M7XG4gICAgbGV0IHByb3RvY29sO1xuICAgIGxldCBpbm5lclNlc3Npb25JZCwgZENhcHM7XG5cblxuICAgIHRyeSB7XG4gICAgICAvLyBQYXJzZSB0aGUgY2FwcyBpbnRvIGEgZm9ybWF0IHRoYXQgdGhlIElubmVyRHJpdmVyIHdpbGwgYWNjZXB0XG4gICAgICBjb25zdCBwYXJzZWRDYXBzID0gcGFyc2VDYXBzRm9ySW5uZXJEcml2ZXIoXG4gICAgICAgIGpzb253cENhcHMsXG4gICAgICAgIHczY0NhcGFiaWxpdGllcyxcbiAgICAgICAgdGhpcy5kZXNpcmVkQ2FwQ29uc3RyYWludHMsXG4gICAgICAgIGRlZmF1bHRDYXBhYmlsaXRpZXNcbiAgICAgICk7XG5cbiAgICAgIGxldCB7ZGVzaXJlZENhcHMsIHByb2Nlc3NlZEpzb253cENhcGFiaWxpdGllcywgcHJvY2Vzc2VkVzNDQ2FwYWJpbGl0aWVzLCBlcnJvcn0gPSBwYXJzZWRDYXBzO1xuICAgICAgcHJvdG9jb2wgPSBwYXJzZWRDYXBzLnByb3RvY29sO1xuXG4gICAgICAvLyBJZiB0aGUgcGFyc2luZyBvZiB0aGUgY2FwcyBwcm9kdWNlZCBhbiBlcnJvciwgdGhyb3cgaXQgaW4gaGVyZVxuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuXG4gICAgICBsZXQgSW5uZXJEcml2ZXIgPSB0aGlzLmdldERyaXZlckZvckNhcHMoZGVzaXJlZENhcHMpO1xuICAgICAgdGhpcy5wcmludE5ld1Nlc3Npb25Bbm5vdW5jZW1lbnQoSW5uZXJEcml2ZXIsIGRlc2lyZWRDYXBzKTtcblxuICAgICAgaWYgKHRoaXMuYXJncy5zZXNzaW9uT3ZlcnJpZGUpIHtcbiAgICAgICAgY29uc3Qgc2Vzc2lvbklkc1RvRGVsZXRlID0gYXdhaXQgc2Vzc2lvbnNMaXN0R3VhcmQuYWNxdWlyZShBcHBpdW1Ecml2ZXIubmFtZSwgKCkgPT4gXy5rZXlzKHRoaXMuc2Vzc2lvbnMpKTtcbiAgICAgICAgaWYgKHNlc3Npb25JZHNUb0RlbGV0ZS5sZW5ndGgpIHtcbiAgICAgICAgICBsb2cuaW5mbyhgU2Vzc2lvbiBvdmVycmlkZSBpcyBvbi4gRGVsZXRpbmcgb3RoZXIgJHtzZXNzaW9uSWRzVG9EZWxldGUubGVuZ3RofSBhY3RpdmUgc2Vzc2lvbiR7c2Vzc2lvbklkc1RvRGVsZXRlLmxlbmd0aCA/ICcnIDogJ3MnfS5gKTtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgQi5tYXAoc2Vzc2lvbklkc1RvRGVsZXRlLCAoaWQpID0+IHRoaXMuZGVsZXRlU2Vzc2lvbihpZCkpO1xuICAgICAgICAgIH0gY2F0Y2ggKGlnbikge31cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsZXQgcnVubmluZ0RyaXZlcnNEYXRhLCBvdGhlclBlbmRpbmdEcml2ZXJzRGF0YTtcbiAgICAgIGxldCBkID0gbmV3IElubmVyRHJpdmVyKHRoaXMuYXJncyk7XG4gICAgICBpZiAodGhpcy5hcmdzLnJlbGF4ZWRTZWN1cml0eUVuYWJsZWQpIHtcbiAgICAgICAgbG9nLmluZm8oYEFwcGx5aW5nIHJlbGF4ZWQgc2VjdXJpdHkgdG8gJHtJbm5lckRyaXZlci5uYW1lfSBhcyBwZXIgc2VydmVyIGNvbW1hbmQgbGluZSBhcmd1bWVudGApO1xuICAgICAgICBkLnJlbGF4ZWRTZWN1cml0eUVuYWJsZWQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgLy8gVGhpcyBhc3NpZ25tZW50IGlzIHJlcXVpcmVkIGZvciBjb3JyZWN0IHdlYiBzb2NrZXRzIGZ1bmN0aW9uYWxpdHkgaW5zaWRlIHRoZSBkcml2ZXJcbiAgICAgIGQuc2VydmVyID0gdGhpcy5zZXJ2ZXI7XG4gICAgICB0cnkge1xuICAgICAgICBydW5uaW5nRHJpdmVyc0RhdGEgPSBhd2FpdCB0aGlzLmN1clNlc3Npb25EYXRhRm9yRHJpdmVyKElubmVyRHJpdmVyKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IGVycm9ycy5TZXNzaW9uTm90Q3JlYXRlZEVycm9yKGUubWVzc2FnZSk7XG4gICAgICB9XG4gICAgICBhd2FpdCBwZW5kaW5nRHJpdmVyc0d1YXJkLmFjcXVpcmUoQXBwaXVtRHJpdmVyLm5hbWUsICgpID0+IHtcbiAgICAgICAgdGhpcy5wZW5kaW5nRHJpdmVyc1tJbm5lckRyaXZlci5uYW1lXSA9IHRoaXMucGVuZGluZ0RyaXZlcnNbSW5uZXJEcml2ZXIubmFtZV0gfHwgW107XG4gICAgICAgIG90aGVyUGVuZGluZ0RyaXZlcnNEYXRhID0gdGhpcy5wZW5kaW5nRHJpdmVyc1tJbm5lckRyaXZlci5uYW1lXS5tYXAoKGRydikgPT4gZHJ2LmRyaXZlckRhdGEpO1xuICAgICAgICB0aGlzLnBlbmRpbmdEcml2ZXJzW0lubmVyRHJpdmVyLm5hbWVdLnB1c2goZCk7XG4gICAgICB9KTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgW2lubmVyU2Vzc2lvbklkLCBkQ2Fwc10gPSBhd2FpdCBkLmNyZWF0ZVNlc3Npb24oXG4gICAgICAgICAgcHJvY2Vzc2VkSnNvbndwQ2FwYWJpbGl0aWVzLFxuICAgICAgICAgIHJlcUNhcHMsXG4gICAgICAgICAgcHJvY2Vzc2VkVzNDQ2FwYWJpbGl0aWVzLFxuICAgICAgICAgIFsuLi5ydW5uaW5nRHJpdmVyc0RhdGEsIC4uLm90aGVyUGVuZGluZ0RyaXZlcnNEYXRhXVxuICAgICAgICApO1xuICAgICAgICBwcm90b2NvbCA9IGQucHJvdG9jb2w7XG4gICAgICAgIGF3YWl0IHNlc3Npb25zTGlzdEd1YXJkLmFjcXVpcmUoQXBwaXVtRHJpdmVyLm5hbWUsICgpID0+IHtcbiAgICAgICAgICB0aGlzLnNlc3Npb25zW2lubmVyU2Vzc2lvbklkXSA9IGQ7XG4gICAgICAgIH0pO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgYXdhaXQgcGVuZGluZ0RyaXZlcnNHdWFyZC5hY3F1aXJlKEFwcGl1bURyaXZlci5uYW1lLCAoKSA9PiB7XG4gICAgICAgICAgXy5wdWxsKHRoaXMucGVuZGluZ0RyaXZlcnNbSW5uZXJEcml2ZXIubmFtZV0sIGQpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gdGhpcyBpcyBhbiBhc3luYyBmdW5jdGlvbiBidXQgd2UgZG9uJ3QgYXdhaXQgaXQgYmVjYXVzZSBpdCBoYW5kbGVzXG4gICAgICAvLyBhbiBvdXQtb2YtYmFuZCBwcm9taXNlIHdoaWNoIGlzIGZ1bGZpbGxlZCBpZiB0aGUgaW5uZXIgZHJpdmVyXG4gICAgICAvLyB1bmV4cGVjdGVkbHkgc2h1dHMgZG93blxuICAgICAgdGhpcy5hdHRhY2hVbmV4cGVjdGVkU2h1dGRvd25IYW5kbGVyKGQsIGlubmVyU2Vzc2lvbklkKTtcblxuXG4gICAgICBsb2cuaW5mbyhgTmV3ICR7SW5uZXJEcml2ZXIubmFtZX0gc2Vzc2lvbiBjcmVhdGVkIHN1Y2Nlc3NmdWxseSwgc2Vzc2lvbiBgICtcbiAgICAgICAgICAgICAgYCR7aW5uZXJTZXNzaW9uSWR9IGFkZGVkIHRvIG1hc3RlciBzZXNzaW9uIGxpc3RgKTtcblxuICAgICAgLy8gc2V0IHRoZSBOZXcgQ29tbWFuZCBUaW1lb3V0IGZvciB0aGUgaW5uZXIgZHJpdmVyXG4gICAgICBkLnN0YXJ0TmV3Q29tbWFuZFRpbWVvdXQoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcHJvdG9jb2wsXG4gICAgICAgIGVycm9yLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcHJvdG9jb2wsXG4gICAgICB2YWx1ZTogW2lubmVyU2Vzc2lvbklkLCBkQ2FwcywgcHJvdG9jb2xdXG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGF0dGFjaFVuZXhwZWN0ZWRTaHV0ZG93bkhhbmRsZXIgKGRyaXZlciwgaW5uZXJTZXNzaW9uSWQpIHtcbiAgICAvLyBSZW1vdmUgdGhlIHNlc3Npb24gb24gdW5leHBlY3RlZCBzaHV0ZG93biwgc28gdGhhdCB3ZSBhcmUgaW4gYSBwb3NpdGlvblxuICAgIC8vIHRvIG9wZW4gYW5vdGhlciBzZXNzaW9uIGxhdGVyIG9uLlxuICAgIC8vIFRPRE86IHRoaXMgc2hvdWxkIGJlIHJlbW92ZWQgYW5kIHJlcGxhY2VkIGJ5IGEgb25TaHV0ZG93biBjYWxsYmFjay5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgZHJpdmVyLm9uVW5leHBlY3RlZFNodXRkb3duOyAvLyB0aGlzIGlzIGEgY2FuY2VsbGFibGUgcHJvbWlzZVxuICAgICAgLy8gaWYgd2UgZ2V0IGhlcmUsIHdlJ3ZlIGhhZCBhbiB1bmV4cGVjdGVkIHNodXRkb3duLCBzbyBlcnJvclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmV4cGVjdGVkIHNodXRkb3duJyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUgaW5zdGFuY2VvZiBCLkNhbmNlbGxhdGlvbkVycm9yKSB7XG4gICAgICAgIC8vIGlmIHdlIGNhbmNlbGxlZCB0aGUgdW5leHBlY3RlZCBzaHV0ZG93biBwcm9taXNlLCB0aGF0IG1lYW5zIHdlXG4gICAgICAgIC8vIG5vIGxvbmdlciBjYXJlIGFib3V0IGl0LCBhbmQgY2FuIHNhZmVseSBpZ25vcmUgaXRcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgbG9nLndhcm4oYENsb3Npbmcgc2Vzc2lvbiwgY2F1c2Ugd2FzICcke2UubWVzc2FnZX0nYCk7XG4gICAgICBsb2cuaW5mbyhgUmVtb3Zpbmcgc2Vzc2lvbiAke2lubmVyU2Vzc2lvbklkfSBmcm9tIG91ciBtYXN0ZXIgc2Vzc2lvbiBsaXN0YCk7XG4gICAgICBhd2FpdCBzZXNzaW9uc0xpc3RHdWFyZC5hY3F1aXJlKEFwcGl1bURyaXZlci5uYW1lLCAoKSA9PiB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLnNlc3Npb25zW2lubmVyU2Vzc2lvbklkXTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGN1clNlc3Npb25EYXRhRm9yRHJpdmVyIChJbm5lckRyaXZlcikge1xuICAgIGNvbnN0IHNlc3Npb25zID0gYXdhaXQgc2Vzc2lvbnNMaXN0R3VhcmQuYWNxdWlyZShBcHBpdW1Ecml2ZXIubmFtZSwgKCkgPT4gdGhpcy5zZXNzaW9ucyk7XG4gICAgY29uc3QgZGF0YSA9IF8udmFsdWVzKHNlc3Npb25zKVxuICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKHMpID0+IHMuY29uc3RydWN0b3IubmFtZSA9PT0gSW5uZXJEcml2ZXIubmFtZSlcbiAgICAgICAgICAgICAgICAgICAubWFwKChzKSA9PiBzLmRyaXZlckRhdGEpO1xuICAgIGZvciAobGV0IGRhdHVtIG9mIGRhdGEpIHtcbiAgICAgIGlmICghZGF0dW0pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBQcm9ibGVtIGdldHRpbmcgc2Vzc2lvbiBkYXRhIGZvciBkcml2ZXIgdHlwZSBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGAke0lubmVyRHJpdmVyLm5hbWV9OyBkb2VzIGl0IGltcGxlbWVudCAnZ2V0IGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgYGRyaXZlckRhdGEnP2ApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGFzeW5jIGRlbGV0ZVNlc3Npb24gKHNlc3Npb25JZCkge1xuICAgIGxldCBwcm90b2NvbDtcbiAgICB0cnkge1xuICAgICAgbGV0IG90aGVyU2Vzc2lvbnNEYXRhID0gbnVsbDtcbiAgICAgIGxldCBkc3RTZXNzaW9uID0gbnVsbDtcbiAgICAgIGF3YWl0IHNlc3Npb25zTGlzdEd1YXJkLmFjcXVpcmUoQXBwaXVtRHJpdmVyLm5hbWUsICgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLnNlc3Npb25zW3Nlc3Npb25JZF0pIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY3VyQ29uc3RydWN0b3JOYW1lID0gdGhpcy5zZXNzaW9uc1tzZXNzaW9uSWRdLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICAgIG90aGVyU2Vzc2lvbnNEYXRhID0gXy50b1BhaXJzKHRoaXMuc2Vzc2lvbnMpXG4gICAgICAgICAgICAgIC5maWx0ZXIoKFtrZXksIHZhbHVlXSkgPT4gdmFsdWUuY29uc3RydWN0b3IubmFtZSA9PT0gY3VyQ29uc3RydWN0b3JOYW1lICYmIGtleSAhPT0gc2Vzc2lvbklkKVxuICAgICAgICAgICAgICAubWFwKChbLCB2YWx1ZV0pID0+IHZhbHVlLmRyaXZlckRhdGEpO1xuICAgICAgICBkc3RTZXNzaW9uID0gdGhpcy5zZXNzaW9uc1tzZXNzaW9uSWRdO1xuICAgICAgICBwcm90b2NvbCA9IGRzdFNlc3Npb24ucHJvdG9jb2w7XG4gICAgICAgIGxvZy5pbmZvKGBSZW1vdmluZyBzZXNzaW9uICR7c2Vzc2lvbklkfSBmcm9tIG91ciBtYXN0ZXIgc2Vzc2lvbiBsaXN0YCk7XG4gICAgICAgIC8vIHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGUgZGVsZXRlU2Vzc2lvbiBjb21wbGV0ZXMgc3VjY2Vzc2Z1bGx5IG9yIG5vdFxuICAgICAgICAvLyBtYWtlIHRoZSBzZXNzaW9uIHVuYXZhaWxhYmxlLCBiZWNhdXNlIHdobyBrbm93cyB3aGF0IHN0YXRlIGl0IG1pZ2h0XG4gICAgICAgIC8vIGJlIGluIG90aGVyd2lzZVxuICAgICAgICBkZWxldGUgdGhpcy5zZXNzaW9uc1tzZXNzaW9uSWRdO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwcm90b2NvbCxcbiAgICAgICAgdmFsdWU6IGF3YWl0IGRzdFNlc3Npb24uZGVsZXRlU2Vzc2lvbihzZXNzaW9uSWQsIG90aGVyU2Vzc2lvbnNEYXRhKSxcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgbG9nLmVycm9yKGBIYWQgdHJvdWJsZSBlbmRpbmcgc2Vzc2lvbiAke3Nlc3Npb25JZH06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcHJvdG9jb2wsXG4gICAgICAgIGVycm9yOiBlLFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBleGVjdXRlQ29tbWFuZCAoY21kLCAuLi5hcmdzKSB7XG4gICAgLy8gZ2V0U3RhdHVzIGNvbW1hbmQgc2hvdWxkIG5vdCBiZSBwdXQgaW50byBxdWV1ZS4gSWYgd2UgZG8gaXQgYXMgcGFydCBvZiBzdXBlci5leGVjdXRlQ29tbWFuZCwgaXQgd2lsbCBiZSBhZGRlZCB0byBxdWV1ZS5cbiAgICAvLyBUaGVyZSB3aWxsIGJlIGxvdCBvZiBzdGF0dXMgY29tbWFuZHMgaW4gcXVldWUgZHVyaW5nIGNyZWF0ZVNlc3Npb24gY29tbWFuZCwgYXMgY3JlYXRlU2Vzc2lvbiBjYW4gdGFrZSB1cCB0byBvciBtb3JlIHRoYW4gYSBtaW51dGUuXG4gICAgaWYgKGNtZCA9PT0gJ2dldFN0YXR1cycpIHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLmdldFN0YXR1cygpO1xuICAgIH1cblxuICAgIGlmIChpc0FwcGl1bURyaXZlckNvbW1hbmQoY21kKSkge1xuICAgICAgcmV0dXJuIGF3YWl0IHN1cGVyLmV4ZWN1dGVDb21tYW5kKGNtZCwgLi4uYXJncyk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2Vzc2lvbklkID0gXy5sYXN0KGFyZ3MpO1xuICAgIGNvbnN0IGRzdFNlc3Npb24gPSBhd2FpdCBzZXNzaW9uc0xpc3RHdWFyZC5hY3F1aXJlKEFwcGl1bURyaXZlci5uYW1lLCAoKSA9PiB0aGlzLnNlc3Npb25zW3Nlc3Npb25JZF0pO1xuICAgIGlmICghZHN0U2Vzc2lvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgc2Vzc2lvbiB3aXRoIGlkICcke3Nlc3Npb25JZH0nIGRvZXMgbm90IGV4aXN0YCk7XG4gICAgfVxuXG4gICAgbGV0IHJlcyA9IHtcbiAgICAgIHByb3RvY29sOiBkc3RTZXNzaW9uLnByb3RvY29sXG4gICAgfTtcblxuICAgIHRyeSB7XG4gICAgICByZXMudmFsdWUgPSBhd2FpdCBkc3RTZXNzaW9uLmV4ZWN1dGVDb21tYW5kKGNtZCwgLi4uYXJncyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmVzLmVycm9yID0gZTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIHByb3h5QWN0aXZlIChzZXNzaW9uSWQpIHtcbiAgICBjb25zdCBkc3RTZXNzaW9uID0gdGhpcy5zZXNzaW9uc1tzZXNzaW9uSWRdO1xuICAgIHJldHVybiBkc3RTZXNzaW9uICYmIF8uaXNGdW5jdGlvbihkc3RTZXNzaW9uLnByb3h5QWN0aXZlKSAmJiBkc3RTZXNzaW9uLnByb3h5QWN0aXZlKHNlc3Npb25JZCk7XG4gIH1cblxuICBnZXRQcm94eUF2b2lkTGlzdCAoc2Vzc2lvbklkKSB7XG4gICAgY29uc3QgZHN0U2Vzc2lvbiA9IHRoaXMuc2Vzc2lvbnNbc2Vzc2lvbklkXTtcbiAgICByZXR1cm4gZHN0U2Vzc2lvbiA/IGRzdFNlc3Npb24uZ2V0UHJveHlBdm9pZExpc3QoKSA6IFtdO1xuICB9XG5cbiAgY2FuUHJveHkgKHNlc3Npb25JZCkge1xuICAgIGNvbnN0IGRzdFNlc3Npb24gPSB0aGlzLnNlc3Npb25zW3Nlc3Npb25JZF07XG4gICAgcmV0dXJuIGRzdFNlc3Npb24gJiYgZHN0U2Vzc2lvbi5jYW5Qcm94eShzZXNzaW9uSWQpO1xuICB9XG59XG5cbi8vIGhlbHAgZGVjaWRlIHdoaWNoIGNvbW1hbmRzIHNob3VsZCBiZSBwcm94aWVkIHRvIHN1Yi1kcml2ZXJzIGFuZCB3aGljaFxuLy8gc2hvdWxkIGJlIGhhbmRsZWQgYnkgdGhpcywgb3VyIHVtYnJlbGxhIGRyaXZlclxuZnVuY3Rpb24gaXNBcHBpdW1Ecml2ZXJDb21tYW5kIChjbWQpIHtcbiAgcmV0dXJuICFpc1Nlc3Npb25Db21tYW5kKGNtZCkgfHwgY21kID09PSBcImRlbGV0ZVNlc3Npb25cIjtcbn1cblxuZXhwb3J0IHsgQXBwaXVtRHJpdmVyIH07XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uIn0=
