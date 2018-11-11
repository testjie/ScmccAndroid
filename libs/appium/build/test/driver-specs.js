require('source-map-support').install();

'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _libAppium = require('../lib/appium');

var _appiumFakeDriver = require('appium-fake-driver');

var _helpers = require('./helpers');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _appiumXcuitestDriver = require('appium-xcuitest-driver');

var _appiumIosDriver = require('appium-ios-driver');

var _asyncbox = require('asyncbox');

var _libUtils = require('../lib/utils');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var SESSION_ID = 1;

describe('AppiumDriver', function () {
  describe('AppiumDriver', function () {
    function getDriverAndFakeDriver() {
      var appium = new _libAppium.AppiumDriver({});
      var fakeDriver = new _appiumFakeDriver.FakeDriver();
      var mockFakeDriver = _sinon2['default'].mock(fakeDriver);
      appium.getDriverForCaps = function () /*args*/{
        return function () {
          return fakeDriver;
        };
      };
      return [appium, mockFakeDriver];
    }
    describe('createSession', function () {
      var appium = undefined;
      var mockFakeDriver = undefined;
      beforeEach(function () {
        var _getDriverAndFakeDriver = getDriverAndFakeDriver();

        var _getDriverAndFakeDriver2 = _slicedToArray(_getDriverAndFakeDriver, 2);

        appium = _getDriverAndFakeDriver2[0];
        mockFakeDriver = _getDriverAndFakeDriver2[1];
      });
      afterEach(function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mockFakeDriver.restore();
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(appium.deleteSession(SESSION_ID));

            case 3:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });

      it('should call inner driver\'s createSession with desired capabilities', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mockFakeDriver.expects("createSession").once().withExactArgs(_helpers.BASE_CAPS, undefined, null, []).returns([SESSION_ID, _helpers.BASE_CAPS]);
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(appium.createSession(_helpers.BASE_CAPS));

            case 3:
              mockFakeDriver.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should call inner driver\'s createSession with desired and default capabilities', function callee$3$0() {
        var defaultCaps, allCaps;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              defaultCaps = { deviceName: 'Emulator' }, allCaps = _lodash2['default'].extend(_lodash2['default'].clone(defaultCaps), _helpers.BASE_CAPS);

              appium.args.defaultCapabilities = defaultCaps;
              mockFakeDriver.expects("createSession").once().withArgs(allCaps).returns([SESSION_ID, allCaps]);
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(appium.createSession(_helpers.BASE_CAPS));

            case 5:
              mockFakeDriver.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should call inner driver\'s createSession with desired and default capabilities without overriding caps', function callee$3$0() {
        var defaultCaps;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              defaultCaps = { platformName: 'Ersatz' };

              appium.args.defaultCapabilities = defaultCaps;
              mockFakeDriver.expects("createSession").once().withArgs(_helpers.BASE_CAPS).returns([SESSION_ID, _helpers.BASE_CAPS]);
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(appium.createSession(_helpers.BASE_CAPS));

            case 5:
              mockFakeDriver.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should kill all other sessions if sessionOverride is on', function callee$3$0() {
        var fakeDrivers, mockFakeDrivers, sessions, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, mfd;

        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              appium.args.sessionOverride = true;

              // mock three sessions that should be removed when the new one is created
              fakeDrivers = [new _appiumFakeDriver.FakeDriver(), new _appiumFakeDriver.FakeDriver(), new _appiumFakeDriver.FakeDriver()];
              mockFakeDrivers = _lodash2['default'].map(fakeDrivers, function (fd) {
                return _sinon2['default'].mock(fd);
              });

              mockFakeDrivers[0].expects('deleteSession').once();
              mockFakeDrivers[1].expects('deleteSession').once().throws('Cannot shut down Android driver; it has already shut down');
              mockFakeDrivers[2].expects('deleteSession').once();
              appium.sessions['abc-123-xyz'] = fakeDrivers[0];
              appium.sessions['xyz-321-abc'] = fakeDrivers[1];
              appium.sessions['123-abc-xyz'] = fakeDrivers[2];

              context$4$0.next = 11;
              return _regeneratorRuntime.awrap(appium.getSessions());

            case 11:
              sessions = context$4$0.sent;

              sessions.should.have.length(3);

              mockFakeDriver.expects("createSession").once().withExactArgs(_helpers.BASE_CAPS, undefined, null, []).returns([SESSION_ID, _helpers.BASE_CAPS]);
              context$4$0.next = 16;
              return _regeneratorRuntime.awrap(appium.createSession(_helpers.BASE_CAPS));

            case 16:
              context$4$0.next = 18;
              return _regeneratorRuntime.awrap(appium.getSessions());

            case 18:
              sessions = context$4$0.sent;

              sessions.should.have.length(1);

              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              context$4$0.prev = 23;
              for (_iterator = _getIterator(mockFakeDrivers); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                mfd = _step.value;

                mfd.verify();
              }
              context$4$0.next = 31;
              break;

            case 27:
              context$4$0.prev = 27;
              context$4$0.t0 = context$4$0['catch'](23);
              _didIteratorError = true;
              _iteratorError = context$4$0.t0;

            case 31:
              context$4$0.prev = 31;
              context$4$0.prev = 32;

              if (!_iteratorNormalCompletion && _iterator['return']) {
                _iterator['return']();
              }

            case 34:
              context$4$0.prev = 34;

              if (!_didIteratorError) {
                context$4$0.next = 37;
                break;
              }

              throw _iteratorError;

            case 37:
              return context$4$0.finish(34);

            case 38:
              return context$4$0.finish(31);

            case 39:
              mockFakeDriver.verify();

            case 40:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this, [[23, 27, 31, 39], [32,, 34, 38]]);
      });
      it('should call "createSession" with W3C capabilities argument, if provided', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mockFakeDriver.expects("createSession").once().withArgs(null, undefined, _helpers.W3C_CAPS).returns([SESSION_ID, _helpers.BASE_CAPS]);
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(appium.createSession(undefined, undefined, _helpers.W3C_CAPS));

            case 3:
              mockFakeDriver.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should call "createSession" with W3C capabilities argument with additional provided parameters', function callee$3$0() {
        var w3cCaps;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              w3cCaps = _extends({}, _helpers.W3C_CAPS, {
                alwaysMatch: _extends({}, _helpers.W3C_CAPS.alwaysMatch, {
                  'appium:someOtherParm': 'someOtherParm'
                })
              });

              mockFakeDriver.expects("createSession").once().withArgs(null, undefined, {
                alwaysMatch: _extends({}, w3cCaps.alwaysMatch, {
                  'appium:someOtherParm': 'someOtherParm'
                }),
                firstMatch: [{}]
              }).returns([SESSION_ID, (0, _libUtils.insertAppiumPrefixes)(_helpers.BASE_CAPS)]);

              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(appium.createSession(undefined, undefined, w3cCaps));

            case 4:
              mockFakeDriver.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should call "createSession" with JSONWP capabilities if W3C has incomplete capabilities', function callee$3$0() {
        var w3cCaps, jsonwpCaps;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              w3cCaps = _extends({}, _helpers.W3C_CAPS, {
                alwaysMatch: _extends({}, _helpers.W3C_CAPS.alwaysMatch, {
                  'appium:someOtherParm': 'someOtherParm'
                })
              });
              jsonwpCaps = _extends({}, _helpers.BASE_CAPS, {
                automationName: 'Fake',
                someOtherParam: 'someOtherParam'
              });

              mockFakeDriver.expects("createSession").once().withArgs(jsonwpCaps, undefined, null).returns([SESSION_ID, jsonwpCaps]);

              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(appium.createSession(jsonwpCaps, undefined, w3cCaps));

            case 5:
              mockFakeDriver.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
    });
    describe('deleteSession', function () {
      var appium = undefined;
      var mockFakeDriver = undefined;
      beforeEach(function () {
        var _getDriverAndFakeDriver3 = getDriverAndFakeDriver();

        var _getDriverAndFakeDriver32 = _slicedToArray(_getDriverAndFakeDriver3, 2);

        appium = _getDriverAndFakeDriver32[0];
        mockFakeDriver = _getDriverAndFakeDriver32[1];
      });
      afterEach(function () {
        mockFakeDriver.restore();
      });
      it('should remove the session if it is found', function callee$3$0() {
        var _value, sessionId, sessions;

        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(appium.createSession(_helpers.BASE_CAPS));

            case 2:
              context$4$0.t0 = context$4$0.sent.value;
              _value = _slicedToArray(context$4$0.t0, 1);
              sessionId = _value[0];
              context$4$0.next = 7;
              return _regeneratorRuntime.awrap(appium.getSessions());

            case 7:
              sessions = context$4$0.sent;

              sessions.should.have.length(1);
              context$4$0.next = 11;
              return _regeneratorRuntime.awrap(appium.deleteSession(sessionId));

            case 11:
              context$4$0.next = 13;
              return _regeneratorRuntime.awrap(appium.getSessions());

            case 13:
              sessions = context$4$0.sent;

              sessions.should.have.length(0);

            case 15:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should call inner driver\'s deleteSession method', function callee$3$0() {
        var _value2, sessionId;

        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(appium.createSession(_helpers.BASE_CAPS));

            case 2:
              context$4$0.t0 = context$4$0.sent.value;
              _value2 = _slicedToArray(context$4$0.t0, 1);
              sessionId = _value2[0];

              mockFakeDriver.expects("deleteSession").once().withExactArgs(sessionId, []).returns();
              context$4$0.next = 8;
              return _regeneratorRuntime.awrap(appium.deleteSession(sessionId));

            case 8:
              mockFakeDriver.verify();

              // cleanup, since we faked the delete session call
              context$4$0.next = 11;
              return _regeneratorRuntime.awrap(mockFakeDriver.object.deleteSession());

            case 11:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
    });
    describe('getSessions', function () {
      var appium = undefined;
      var sessions = undefined;
      before(function () {
        appium = new _libAppium.AppiumDriver({});
      });
      afterEach(function callee$3$0() {
        var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, session;

        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              context$4$0.prev = 3;
              _iterator2 = _getIterator(sessions);

            case 5:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                context$4$0.next = 12;
                break;
              }

              session = _step2.value;
              context$4$0.next = 9;
              return _regeneratorRuntime.awrap(appium.deleteSession(session.id));

            case 9:
              _iteratorNormalCompletion2 = true;
              context$4$0.next = 5;
              break;

            case 12:
              context$4$0.next = 18;
              break;

            case 14:
              context$4$0.prev = 14;
              context$4$0.t0 = context$4$0['catch'](3);
              _didIteratorError2 = true;
              _iteratorError2 = context$4$0.t0;

            case 18:
              context$4$0.prev = 18;
              context$4$0.prev = 19;

              if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                _iterator2['return']();
              }

            case 21:
              context$4$0.prev = 21;

              if (!_didIteratorError2) {
                context$4$0.next = 24;
                break;
              }

              throw _iteratorError2;

            case 24:
              return context$4$0.finish(21);

            case 25:
              return context$4$0.finish(18);

            case 26:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this, [[3, 14, 18, 26], [19,, 21, 25]]);
      });
      it('should return an empty array of sessions', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(appium.getSessions());

            case 2:
              sessions = context$4$0.sent;

              sessions.should.be.an('array');
              sessions.should.be.empty;

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should return sessions created', function callee$3$0() {
        var session1, session2;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(appium.createSession(_lodash2['default'].extend(_lodash2['default'].clone(_helpers.BASE_CAPS), { cap: 'value' })));

            case 2:
              session1 = context$4$0.sent.value;
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(appium.createSession(_lodash2['default'].extend(_lodash2['default'].clone(_helpers.BASE_CAPS), { cap: 'other value' })));

            case 5:
              session2 = context$4$0.sent.value;
              context$4$0.next = 8;
              return _regeneratorRuntime.awrap(appium.getSessions());

            case 8:
              sessions = context$4$0.sent;

              sessions.should.be.an('array');
              sessions.should.have.length(2);
              sessions[0].id.should.equal(session1[0]);
              sessions[0].capabilities.should.eql(session1[1]);
              sessions[1].id.should.equal(session2[0]);
              sessions[1].capabilities.should.eql(session2[1]);

            case 15:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
    });
    describe('getStatus', function () {
      var appium = undefined;
      before(function () {
        appium = new _libAppium.AppiumDriver({});
      });
      it('should return a status', function callee$3$0() {
        var status;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(appium.getStatus());

            case 2:
              status = context$4$0.sent;

              status.build.should.exist;
              status.build.version.should.exist;

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
    });
    describe('sessionExists', function () {});
    describe('attachUnexpectedShutdownHandler', function () {
      var appium = undefined,
          mockFakeDriver = undefined;
      beforeEach(function () {
        var _getDriverAndFakeDriver4 = getDriverAndFakeDriver();

        var _getDriverAndFakeDriver42 = _slicedToArray(_getDriverAndFakeDriver4, 2);

        appium = _getDriverAndFakeDriver42[0];
        mockFakeDriver = _getDriverAndFakeDriver42[1];
      });
      afterEach(function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(mockFakeDriver.object.deleteSession());

            case 2:
              mockFakeDriver.restore();
              appium.args.defaultCapabilities = {};

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });

      it('should remove session if inner driver unexpectedly exits with an error', function callee$3$0() {
        var _value3, sessionId;

        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(appium.createSession(_lodash2['default'].clone(_helpers.BASE_CAPS)));

            case 2:
              context$4$0.t0 = context$4$0.sent.value;
              _value3 = _slicedToArray(context$4$0.t0, 1);
              sessionId = _value3[0];
              // eslint-disable-line comma-spacing
              _lodash2['default'].keys(appium.sessions).should.contain(sessionId);
              appium.sessions[sessionId].unexpectedShutdownDeferred.reject(new Error("Oops"));
              // let event loop spin so rejection is handled
              context$4$0.next = 9;
              return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(1));

            case 9:
              _lodash2['default'].keys(appium.sessions).should.not.contain(sessionId);

            case 10:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should remove session if inner driver unexpectedly exits with no error', function callee$3$0() {
        var _value4, sessionId;

        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(appium.createSession(_lodash2['default'].clone(_helpers.BASE_CAPS)));

            case 2:
              context$4$0.t0 = context$4$0.sent.value;
              _value4 = _slicedToArray(context$4$0.t0, 1);
              sessionId = _value4[0];
              // eslint-disable-line comma-spacing
              _lodash2['default'].keys(appium.sessions).should.contain(sessionId);
              appium.sessions[sessionId].unexpectedShutdownDeferred.resolve();
              // let event loop spin so rejection is handled
              context$4$0.next = 9;
              return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(1));

            case 9:
              _lodash2['default'].keys(appium.sessions).should.not.contain(sessionId);

            case 10:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should not remove session if inner driver cancels unexpected exit', function callee$3$0() {
        var _value5, sessionId;

        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(appium.createSession(_lodash2['default'].clone(_helpers.BASE_CAPS)));

            case 2:
              context$4$0.t0 = context$4$0.sent.value;
              _value5 = _slicedToArray(context$4$0.t0, 1);
              sessionId = _value5[0];
              // eslint-disable-line comma-spacing
              _lodash2['default'].keys(appium.sessions).should.contain(sessionId);
              appium.sessions[sessionId].onUnexpectedShutdown.cancel();
              // let event loop spin so rejection is handled
              context$4$0.next = 9;
              return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(1));

            case 9:
              _lodash2['default'].keys(appium.sessions).should.contain(sessionId);

            case 10:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
    });
    describe('getDriverForCaps', function () {
      it('should not blow up if user does not provide platformName', function () {
        var appium = new _libAppium.AppiumDriver({});
        (function () {
          appium.getDriverForCaps({});
        }).should['throw'](/platformName/);
      });
      it('should get XCUITestDriver driver for automationName of XCUITest', function () {
        var appium = new _libAppium.AppiumDriver({});
        var driver = appium.getDriverForCaps({
          platformName: 'iOS',
          automationName: 'XCUITest'
        });
        driver.should.be.an['instanceof'](Function);
        driver.should.equal(_appiumXcuitestDriver.XCUITestDriver);
      });
      it('should get iosdriver for ios < 10', function () {
        var appium = new _libAppium.AppiumDriver({});
        var caps = {
          platformName: 'iOS',
          platformVersion: '8.0'
        };
        var driver = appium.getDriverForCaps(caps);
        driver.should.be.an['instanceof'](Function);
        driver.should.equal(_appiumIosDriver.IosDriver);

        caps.platformVersion = '8.1';
        driver = appium.getDriverForCaps(caps);
        driver.should.equal(_appiumIosDriver.IosDriver);

        caps.platformVersion = '9.4';
        driver = appium.getDriverForCaps(caps);
        driver.should.equal(_appiumIosDriver.IosDriver);

        caps.platformVersion = '';
        driver = appium.getDriverForCaps(caps);
        driver.should.equal(_appiumIosDriver.IosDriver);

        caps.platformVersion = 'foo';
        driver = appium.getDriverForCaps(caps);
        driver.should.equal(_appiumIosDriver.IosDriver);

        delete caps.platformVersion;
        driver = appium.getDriverForCaps(caps);
        driver.should.equal(_appiumIosDriver.IosDriver);
      });
      it('should get xcuitestdriver for ios >= 10', function () {
        var appium = new _libAppium.AppiumDriver({});
        var caps = {
          platformName: 'iOS',
          platformVersion: '10'
        };
        var driver = appium.getDriverForCaps(caps);
        driver.should.be.an['instanceof'](Function);
        driver.should.equal(_appiumXcuitestDriver.XCUITestDriver);

        caps.platformVersion = '10.0';
        driver = appium.getDriverForCaps(caps);
        driver.should.equal(_appiumXcuitestDriver.XCUITestDriver);

        caps.platformVersion = '10.1';
        driver = appium.getDriverForCaps(caps);
        driver.should.equal(_appiumXcuitestDriver.XCUITestDriver);

        caps.platformVersion = '12.14';
        driver = appium.getDriverForCaps(caps);
        driver.should.equal(_appiumXcuitestDriver.XCUITestDriver);
      });
    });
  });
});

// a default capability with the same key as a desired capability
// should do nothing
//# sourceMappingURL=data:application/json;charset=utf8;base64,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LGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZDLGNBQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxzQ0FBZ0IsQ0FBQzs7QUFFcEMsWUFBSSxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUM7QUFDL0IsY0FBTSxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN2QyxjQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssc0NBQWdCLENBQUM7T0FDckMsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZHJpdmVyLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHJhbnNwaWxlOm1vY2hhXG5cbmltcG9ydCB7IEFwcGl1bURyaXZlciB9IGZyb20gJy4uL2xpYi9hcHBpdW0nO1xuaW1wb3J0IHsgRmFrZURyaXZlciB9IGZyb20gJ2FwcGl1bS1mYWtlLWRyaXZlcic7XG5pbXBvcnQgeyBCQVNFX0NBUFMsIFczQ19DQVBTIH0gZnJvbSAnLi9oZWxwZXJzJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgc2lub24gZnJvbSAnc2lub24nO1xuaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgeyBYQ1VJVGVzdERyaXZlciB9IGZyb20gJ2FwcGl1bS14Y3VpdGVzdC1kcml2ZXInO1xuaW1wb3J0IHsgSW9zRHJpdmVyIH0gZnJvbSAnYXBwaXVtLWlvcy1kcml2ZXInO1xuaW1wb3J0IHsgc2xlZXAgfSBmcm9tICdhc3luY2JveCc7XG5pbXBvcnQgeyBpbnNlcnRBcHBpdW1QcmVmaXhlcyB9IGZyb20gJy4uL2xpYi91dGlscyc7XG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmNvbnN0IFNFU1NJT05fSUQgPSAxO1xuXG5kZXNjcmliZSgnQXBwaXVtRHJpdmVyJywgZnVuY3Rpb24gKCkge1xuICBkZXNjcmliZSgnQXBwaXVtRHJpdmVyJywgZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIGdldERyaXZlckFuZEZha2VEcml2ZXIgKCkge1xuICAgICAgbGV0IGFwcGl1bSA9IG5ldyBBcHBpdW1Ecml2ZXIoe30pO1xuICAgICAgbGV0IGZha2VEcml2ZXIgPSBuZXcgRmFrZURyaXZlcigpO1xuICAgICAgbGV0IG1vY2tGYWtlRHJpdmVyID0gc2lub24ubW9jayhmYWtlRHJpdmVyKTtcbiAgICAgIGFwcGl1bS5nZXREcml2ZXJGb3JDYXBzID0gZnVuY3Rpb24gKC8qYXJncyovKSB7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGZha2VEcml2ZXI7XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgICAgcmV0dXJuIFthcHBpdW0sIG1vY2tGYWtlRHJpdmVyXTtcbiAgICB9XG4gICAgZGVzY3JpYmUoJ2NyZWF0ZVNlc3Npb24nLCBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgYXBwaXVtO1xuICAgICAgbGV0IG1vY2tGYWtlRHJpdmVyO1xuICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIFthcHBpdW0sIG1vY2tGYWtlRHJpdmVyXSA9IGdldERyaXZlckFuZEZha2VEcml2ZXIoKTtcbiAgICAgIH0pO1xuICAgICAgYWZ0ZXJFYWNoKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbW9ja0Zha2VEcml2ZXIucmVzdG9yZSgpO1xuICAgICAgICBhd2FpdCBhcHBpdW0uZGVsZXRlU2Vzc2lvbihTRVNTSU9OX0lEKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIGNhbGwgaW5uZXIgZHJpdmVyXFwncyBjcmVhdGVTZXNzaW9uIHdpdGggZGVzaXJlZCBjYXBhYmlsaXRpZXMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG1vY2tGYWtlRHJpdmVyLmV4cGVjdHMoXCJjcmVhdGVTZXNzaW9uXCIpXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKEJBU0VfQ0FQUywgdW5kZWZpbmVkLCBudWxsLCBbXSlcbiAgICAgICAgICAucmV0dXJucyhbU0VTU0lPTl9JRCwgQkFTRV9DQVBTXSk7XG4gICAgICAgIGF3YWl0IGFwcGl1bS5jcmVhdGVTZXNzaW9uKEJBU0VfQ0FQUyk7XG4gICAgICAgIG1vY2tGYWtlRHJpdmVyLnZlcmlmeSgpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIGNhbGwgaW5uZXIgZHJpdmVyXFwncyBjcmVhdGVTZXNzaW9uIHdpdGggZGVzaXJlZCBhbmQgZGVmYXVsdCBjYXBhYmlsaXRpZXMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBkZWZhdWx0Q2FwcyA9IHtkZXZpY2VOYW1lOiAnRW11bGF0b3InfVxuICAgICAgICAgICwgYWxsQ2FwcyA9IF8uZXh0ZW5kKF8uY2xvbmUoZGVmYXVsdENhcHMpLCBCQVNFX0NBUFMpO1xuICAgICAgICBhcHBpdW0uYXJncy5kZWZhdWx0Q2FwYWJpbGl0aWVzID0gZGVmYXVsdENhcHM7XG4gICAgICAgIG1vY2tGYWtlRHJpdmVyLmV4cGVjdHMoXCJjcmVhdGVTZXNzaW9uXCIpXG4gICAgICAgICAgLm9uY2UoKS53aXRoQXJncyhhbGxDYXBzKVxuICAgICAgICAgIC5yZXR1cm5zKFtTRVNTSU9OX0lELCBhbGxDYXBzXSk7XG4gICAgICAgIGF3YWl0IGFwcGl1bS5jcmVhdGVTZXNzaW9uKEJBU0VfQ0FQUyk7XG4gICAgICAgIG1vY2tGYWtlRHJpdmVyLnZlcmlmeSgpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIGNhbGwgaW5uZXIgZHJpdmVyXFwncyBjcmVhdGVTZXNzaW9uIHdpdGggZGVzaXJlZCBhbmQgZGVmYXVsdCBjYXBhYmlsaXRpZXMgd2l0aG91dCBvdmVycmlkaW5nIGNhcHMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIGEgZGVmYXVsdCBjYXBhYmlsaXR5IHdpdGggdGhlIHNhbWUga2V5IGFzIGEgZGVzaXJlZCBjYXBhYmlsaXR5XG4gICAgICAgIC8vIHNob3VsZCBkbyBub3RoaW5nXG4gICAgICAgIGxldCBkZWZhdWx0Q2FwcyA9IHtwbGF0Zm9ybU5hbWU6ICdFcnNhdHonfTtcbiAgICAgICAgYXBwaXVtLmFyZ3MuZGVmYXVsdENhcGFiaWxpdGllcyA9IGRlZmF1bHRDYXBzO1xuICAgICAgICBtb2NrRmFrZURyaXZlci5leHBlY3RzKFwiY3JlYXRlU2Vzc2lvblwiKVxuICAgICAgICAgIC5vbmNlKCkud2l0aEFyZ3MoQkFTRV9DQVBTKVxuICAgICAgICAgIC5yZXR1cm5zKFtTRVNTSU9OX0lELCBCQVNFX0NBUFNdKTtcbiAgICAgICAgYXdhaXQgYXBwaXVtLmNyZWF0ZVNlc3Npb24oQkFTRV9DQVBTKTtcbiAgICAgICAgbW9ja0Zha2VEcml2ZXIudmVyaWZ5KCk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQga2lsbCBhbGwgb3RoZXIgc2Vzc2lvbnMgaWYgc2Vzc2lvbk92ZXJyaWRlIGlzIG9uJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICBhcHBpdW0uYXJncy5zZXNzaW9uT3ZlcnJpZGUgPSB0cnVlO1xuXG4gICAgICAgIC8vIG1vY2sgdGhyZWUgc2Vzc2lvbnMgdGhhdCBzaG91bGQgYmUgcmVtb3ZlZCB3aGVuIHRoZSBuZXcgb25lIGlzIGNyZWF0ZWRcbiAgICAgICAgbGV0IGZha2VEcml2ZXJzID0gW25ldyBGYWtlRHJpdmVyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgRmFrZURyaXZlcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEZha2VEcml2ZXIoKV07XG4gICAgICAgIGxldCBtb2NrRmFrZURyaXZlcnMgPSBfLm1hcChmYWtlRHJpdmVycywgKGZkKSA9PiB7cmV0dXJuIHNpbm9uLm1vY2soZmQpO30pO1xuICAgICAgICBtb2NrRmFrZURyaXZlcnNbMF0uZXhwZWN0cygnZGVsZXRlU2Vzc2lvbicpXG4gICAgICAgICAgLm9uY2UoKTtcbiAgICAgICAgbW9ja0Zha2VEcml2ZXJzWzFdLmV4cGVjdHMoJ2RlbGV0ZVNlc3Npb24nKVxuICAgICAgICAgIC5vbmNlKClcbiAgICAgICAgICAudGhyb3dzKCdDYW5ub3Qgc2h1dCBkb3duIEFuZHJvaWQgZHJpdmVyOyBpdCBoYXMgYWxyZWFkeSBzaHV0IGRvd24nKTtcbiAgICAgICAgbW9ja0Zha2VEcml2ZXJzWzJdLmV4cGVjdHMoJ2RlbGV0ZVNlc3Npb24nKVxuICAgICAgICAgIC5vbmNlKCk7XG4gICAgICAgIGFwcGl1bS5zZXNzaW9uc1snYWJjLTEyMy14eXonXSA9IGZha2VEcml2ZXJzWzBdO1xuICAgICAgICBhcHBpdW0uc2Vzc2lvbnNbJ3h5ei0zMjEtYWJjJ10gPSBmYWtlRHJpdmVyc1sxXTtcbiAgICAgICAgYXBwaXVtLnNlc3Npb25zWycxMjMtYWJjLXh5eiddID0gZmFrZURyaXZlcnNbMl07XG5cbiAgICAgICAgbGV0IHNlc3Npb25zID0gYXdhaXQgYXBwaXVtLmdldFNlc3Npb25zKCk7XG4gICAgICAgIHNlc3Npb25zLnNob3VsZC5oYXZlLmxlbmd0aCgzKTtcblxuICAgICAgICBtb2NrRmFrZURyaXZlci5leHBlY3RzKFwiY3JlYXRlU2Vzc2lvblwiKVxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhCQVNFX0NBUFMsIHVuZGVmaW5lZCwgbnVsbCwgW10pXG4gICAgICAgICAgLnJldHVybnMoW1NFU1NJT05fSUQsIEJBU0VfQ0FQU10pO1xuICAgICAgICBhd2FpdCBhcHBpdW0uY3JlYXRlU2Vzc2lvbihCQVNFX0NBUFMpO1xuXG4gICAgICAgIHNlc3Npb25zID0gYXdhaXQgYXBwaXVtLmdldFNlc3Npb25zKCk7XG4gICAgICAgIHNlc3Npb25zLnNob3VsZC5oYXZlLmxlbmd0aCgxKTtcblxuICAgICAgICBmb3IgKGxldCBtZmQgb2YgbW9ja0Zha2VEcml2ZXJzKSB7XG4gICAgICAgICAgbWZkLnZlcmlmeSgpO1xuICAgICAgICB9XG4gICAgICAgIG1vY2tGYWtlRHJpdmVyLnZlcmlmeSgpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIGNhbGwgXCJjcmVhdGVTZXNzaW9uXCIgd2l0aCBXM0MgY2FwYWJpbGl0aWVzIGFyZ3VtZW50LCBpZiBwcm92aWRlZCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbW9ja0Zha2VEcml2ZXIuZXhwZWN0cyhcImNyZWF0ZVNlc3Npb25cIilcbiAgICAgICAgICAub25jZSgpLndpdGhBcmdzKG51bGwsIHVuZGVmaW5lZCwgVzNDX0NBUFMpXG4gICAgICAgICAgLnJldHVybnMoW1NFU1NJT05fSUQsIEJBU0VfQ0FQU10pO1xuICAgICAgICBhd2FpdCBhcHBpdW0uY3JlYXRlU2Vzc2lvbih1bmRlZmluZWQsIHVuZGVmaW5lZCwgVzNDX0NBUFMpO1xuICAgICAgICBtb2NrRmFrZURyaXZlci52ZXJpZnkoKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCBjYWxsIFwiY3JlYXRlU2Vzc2lvblwiIHdpdGggVzNDIGNhcGFiaWxpdGllcyBhcmd1bWVudCB3aXRoIGFkZGl0aW9uYWwgcHJvdmlkZWQgcGFyYW1ldGVycycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IHczY0NhcHMgPSB7XG4gICAgICAgICAgLi4uVzNDX0NBUFMsXG4gICAgICAgICAgYWx3YXlzTWF0Y2g6IHtcbiAgICAgICAgICAgIC4uLlczQ19DQVBTLmFsd2F5c01hdGNoLFxuICAgICAgICAgICAgJ2FwcGl1bTpzb21lT3RoZXJQYXJtJzogJ3NvbWVPdGhlclBhcm0nLFxuICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIG1vY2tGYWtlRHJpdmVyLmV4cGVjdHMoXCJjcmVhdGVTZXNzaW9uXCIpXG4gICAgICAgICAgLm9uY2UoKS53aXRoQXJncyhudWxsLCB1bmRlZmluZWQsIHtcbiAgICAgICAgICAgIGFsd2F5c01hdGNoOiB7XG4gICAgICAgICAgICAgIC4uLnczY0NhcHMuYWx3YXlzTWF0Y2gsXG4gICAgICAgICAgICAgICdhcHBpdW06c29tZU90aGVyUGFybSc6ICdzb21lT3RoZXJQYXJtJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaXJzdE1hdGNoOiBbe31dLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnJldHVybnMoW1NFU1NJT05fSUQsIGluc2VydEFwcGl1bVByZWZpeGVzKEJBU0VfQ0FQUyldKTtcblxuICAgICAgICBhd2FpdCBhcHBpdW0uY3JlYXRlU2Vzc2lvbih1bmRlZmluZWQsIHVuZGVmaW5lZCwgdzNjQ2Fwcyk7XG4gICAgICAgIG1vY2tGYWtlRHJpdmVyLnZlcmlmeSgpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIGNhbGwgXCJjcmVhdGVTZXNzaW9uXCIgd2l0aCBKU09OV1AgY2FwYWJpbGl0aWVzIGlmIFczQyBoYXMgaW5jb21wbGV0ZSBjYXBhYmlsaXRpZXMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCB3M2NDYXBzID0ge1xuICAgICAgICAgIC4uLlczQ19DQVBTLFxuICAgICAgICAgIGFsd2F5c01hdGNoOiB7XG4gICAgICAgICAgICAuLi5XM0NfQ0FQUy5hbHdheXNNYXRjaCxcbiAgICAgICAgICAgICdhcHBpdW06c29tZU90aGVyUGFybSc6ICdzb21lT3RoZXJQYXJtJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIGxldCBqc29ud3BDYXBzID0ge1xuICAgICAgICAgIC4uLkJBU0VfQ0FQUyxcbiAgICAgICAgICBhdXRvbWF0aW9uTmFtZTogJ0Zha2UnLFxuICAgICAgICAgIHNvbWVPdGhlclBhcmFtOiAnc29tZU90aGVyUGFyYW0nLFxuICAgICAgICB9O1xuXG4gICAgICAgIG1vY2tGYWtlRHJpdmVyLmV4cGVjdHMoXCJjcmVhdGVTZXNzaW9uXCIpXG4gICAgICAgICAgLm9uY2UoKS53aXRoQXJncyhqc29ud3BDYXBzLCB1bmRlZmluZWQsIG51bGwpXG4gICAgICAgICAgLnJldHVybnMoW1NFU1NJT05fSUQsIGpzb253cENhcHNdKTtcblxuICAgICAgICBhd2FpdCBhcHBpdW0uY3JlYXRlU2Vzc2lvbihqc29ud3BDYXBzLCB1bmRlZmluZWQsIHczY0NhcHMpO1xuICAgICAgICBtb2NrRmFrZURyaXZlci52ZXJpZnkoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdkZWxldGVTZXNzaW9uJywgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGFwcGl1bTtcbiAgICAgIGxldCBtb2NrRmFrZURyaXZlcjtcbiAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBbYXBwaXVtLCBtb2NrRmFrZURyaXZlcl0gPSBnZXREcml2ZXJBbmRGYWtlRHJpdmVyKCk7XG4gICAgICB9KTtcbiAgICAgIGFmdGVyRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIG1vY2tGYWtlRHJpdmVyLnJlc3RvcmUoKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCByZW1vdmUgdGhlIHNlc3Npb24gaWYgaXQgaXMgZm91bmQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBbc2Vzc2lvbklkXSA9IChhd2FpdCBhcHBpdW0uY3JlYXRlU2Vzc2lvbihCQVNFX0NBUFMpKS52YWx1ZTtcbiAgICAgICAgbGV0IHNlc3Npb25zID0gYXdhaXQgYXBwaXVtLmdldFNlc3Npb25zKCk7XG4gICAgICAgIHNlc3Npb25zLnNob3VsZC5oYXZlLmxlbmd0aCgxKTtcbiAgICAgICAgYXdhaXQgYXBwaXVtLmRlbGV0ZVNlc3Npb24oc2Vzc2lvbklkKTtcbiAgICAgICAgc2Vzc2lvbnMgPSBhd2FpdCBhcHBpdW0uZ2V0U2Vzc2lvbnMoKTtcbiAgICAgICAgc2Vzc2lvbnMuc2hvdWxkLmhhdmUubGVuZ3RoKDApO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIGNhbGwgaW5uZXIgZHJpdmVyXFwncyBkZWxldGVTZXNzaW9uIG1ldGhvZCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgW3Nlc3Npb25JZF0gPSAgKGF3YWl0IGFwcGl1bS5jcmVhdGVTZXNzaW9uKEJBU0VfQ0FQUykpLnZhbHVlO1xuICAgICAgICBtb2NrRmFrZURyaXZlci5leHBlY3RzKFwiZGVsZXRlU2Vzc2lvblwiKVxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhzZXNzaW9uSWQsIFtdKVxuICAgICAgICAgIC5yZXR1cm5zKCk7XG4gICAgICAgIGF3YWl0IGFwcGl1bS5kZWxldGVTZXNzaW9uKHNlc3Npb25JZCk7XG4gICAgICAgIG1vY2tGYWtlRHJpdmVyLnZlcmlmeSgpO1xuXG4gICAgICAgIC8vIGNsZWFudXAsIHNpbmNlIHdlIGZha2VkIHRoZSBkZWxldGUgc2Vzc2lvbiBjYWxsXG4gICAgICAgIGF3YWl0IG1vY2tGYWtlRHJpdmVyLm9iamVjdC5kZWxldGVTZXNzaW9uKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnZ2V0U2Vzc2lvbnMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgYXBwaXVtO1xuICAgICAgbGV0IHNlc3Npb25zO1xuICAgICAgYmVmb3JlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYXBwaXVtID0gbmV3IEFwcGl1bURyaXZlcih7fSk7XG4gICAgICB9KTtcbiAgICAgIGFmdGVyRWFjaChhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAobGV0IHNlc3Npb24gb2Ygc2Vzc2lvbnMpIHtcbiAgICAgICAgICBhd2FpdCBhcHBpdW0uZGVsZXRlU2Vzc2lvbihzZXNzaW9uLmlkKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIHJldHVybiBhbiBlbXB0eSBhcnJheSBvZiBzZXNzaW9ucycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2Vzc2lvbnMgPSBhd2FpdCBhcHBpdW0uZ2V0U2Vzc2lvbnMoKTtcbiAgICAgICAgc2Vzc2lvbnMuc2hvdWxkLmJlLmFuKCdhcnJheScpO1xuICAgICAgICBzZXNzaW9ucy5zaG91bGQuYmUuZW1wdHk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHNlc3Npb25zIGNyZWF0ZWQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBzZXNzaW9uMSA9IChhd2FpdCBhcHBpdW0uY3JlYXRlU2Vzc2lvbihfLmV4dGVuZChfLmNsb25lKEJBU0VfQ0FQUyksIHtjYXA6ICd2YWx1ZSd9KSkpLnZhbHVlO1xuICAgICAgICBsZXQgc2Vzc2lvbjIgPSAoYXdhaXQgYXBwaXVtLmNyZWF0ZVNlc3Npb24oXy5leHRlbmQoXy5jbG9uZShCQVNFX0NBUFMpLCB7Y2FwOiAnb3RoZXIgdmFsdWUnfSkpKS52YWx1ZTtcblxuICAgICAgICBzZXNzaW9ucyA9IGF3YWl0IGFwcGl1bS5nZXRTZXNzaW9ucygpO1xuICAgICAgICBzZXNzaW9ucy5zaG91bGQuYmUuYW4oJ2FycmF5Jyk7XG4gICAgICAgIHNlc3Npb25zLnNob3VsZC5oYXZlLmxlbmd0aCgyKTtcbiAgICAgICAgc2Vzc2lvbnNbMF0uaWQuc2hvdWxkLmVxdWFsKHNlc3Npb24xWzBdKTtcbiAgICAgICAgc2Vzc2lvbnNbMF0uY2FwYWJpbGl0aWVzLnNob3VsZC5lcWwoc2Vzc2lvbjFbMV0pO1xuICAgICAgICBzZXNzaW9uc1sxXS5pZC5zaG91bGQuZXF1YWwoc2Vzc2lvbjJbMF0pO1xuICAgICAgICBzZXNzaW9uc1sxXS5jYXBhYmlsaXRpZXMuc2hvdWxkLmVxbChzZXNzaW9uMlsxXSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnZ2V0U3RhdHVzJywgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGFwcGl1bTtcbiAgICAgIGJlZm9yZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGFwcGl1bSA9IG5ldyBBcHBpdW1Ecml2ZXIoe30pO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIHJldHVybiBhIHN0YXR1cycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IHN0YXR1cyA9IGF3YWl0IGFwcGl1bS5nZXRTdGF0dXMoKTtcbiAgICAgICAgc3RhdHVzLmJ1aWxkLnNob3VsZC5leGlzdDtcbiAgICAgICAgc3RhdHVzLmJ1aWxkLnZlcnNpb24uc2hvdWxkLmV4aXN0O1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ3Nlc3Npb25FeGlzdHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ2F0dGFjaFVuZXhwZWN0ZWRTaHV0ZG93bkhhbmRsZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgYXBwaXVtXG4gICAgICAgICwgbW9ja0Zha2VEcml2ZXI7XG4gICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgW2FwcGl1bSwgbW9ja0Zha2VEcml2ZXJdID0gZ2V0RHJpdmVyQW5kRmFrZURyaXZlcigpO1xuICAgICAgfSk7XG4gICAgICBhZnRlckVhY2goYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICBhd2FpdCBtb2NrRmFrZURyaXZlci5vYmplY3QuZGVsZXRlU2Vzc2lvbigpO1xuICAgICAgICBtb2NrRmFrZURyaXZlci5yZXN0b3JlKCk7XG4gICAgICAgIGFwcGl1bS5hcmdzLmRlZmF1bHRDYXBhYmlsaXRpZXMgPSB7fTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIHJlbW92ZSBzZXNzaW9uIGlmIGlubmVyIGRyaXZlciB1bmV4cGVjdGVkbHkgZXhpdHMgd2l0aCBhbiBlcnJvcicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IFtzZXNzaW9uSWQsXSA9IChhd2FpdCBhcHBpdW0uY3JlYXRlU2Vzc2lvbihfLmNsb25lKEJBU0VfQ0FQUykpKS52YWx1ZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjb21tYS1zcGFjaW5nXG4gICAgICAgIF8ua2V5cyhhcHBpdW0uc2Vzc2lvbnMpLnNob3VsZC5jb250YWluKHNlc3Npb25JZCk7XG4gICAgICAgIGFwcGl1bS5zZXNzaW9uc1tzZXNzaW9uSWRdLnVuZXhwZWN0ZWRTaHV0ZG93bkRlZmVycmVkLnJlamVjdChuZXcgRXJyb3IoXCJPb3BzXCIpKTtcbiAgICAgICAgLy8gbGV0IGV2ZW50IGxvb3Agc3BpbiBzbyByZWplY3Rpb24gaXMgaGFuZGxlZFxuICAgICAgICBhd2FpdCBzbGVlcCgxKTtcbiAgICAgICAgXy5rZXlzKGFwcGl1bS5zZXNzaW9ucykuc2hvdWxkLm5vdC5jb250YWluKHNlc3Npb25JZCk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgcmVtb3ZlIHNlc3Npb24gaWYgaW5uZXIgZHJpdmVyIHVuZXhwZWN0ZWRseSBleGl0cyB3aXRoIG5vIGVycm9yJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgW3Nlc3Npb25JZCxdID0gKGF3YWl0IGFwcGl1bS5jcmVhdGVTZXNzaW9uKF8uY2xvbmUoQkFTRV9DQVBTKSkpLnZhbHVlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNvbW1hLXNwYWNpbmdcbiAgICAgICAgXy5rZXlzKGFwcGl1bS5zZXNzaW9ucykuc2hvdWxkLmNvbnRhaW4oc2Vzc2lvbklkKTtcbiAgICAgICAgYXBwaXVtLnNlc3Npb25zW3Nlc3Npb25JZF0udW5leHBlY3RlZFNodXRkb3duRGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAvLyBsZXQgZXZlbnQgbG9vcCBzcGluIHNvIHJlamVjdGlvbiBpcyBoYW5kbGVkXG4gICAgICAgIGF3YWl0IHNsZWVwKDEpO1xuICAgICAgICBfLmtleXMoYXBwaXVtLnNlc3Npb25zKS5zaG91bGQubm90LmNvbnRhaW4oc2Vzc2lvbklkKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCBub3QgcmVtb3ZlIHNlc3Npb24gaWYgaW5uZXIgZHJpdmVyIGNhbmNlbHMgdW5leHBlY3RlZCBleGl0JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgW3Nlc3Npb25JZCxdID0gKGF3YWl0IGFwcGl1bS5jcmVhdGVTZXNzaW9uKF8uY2xvbmUoQkFTRV9DQVBTKSkpLnZhbHVlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNvbW1hLXNwYWNpbmdcbiAgICAgICAgXy5rZXlzKGFwcGl1bS5zZXNzaW9ucykuc2hvdWxkLmNvbnRhaW4oc2Vzc2lvbklkKTtcbiAgICAgICAgYXBwaXVtLnNlc3Npb25zW3Nlc3Npb25JZF0ub25VbmV4cGVjdGVkU2h1dGRvd24uY2FuY2VsKCk7XG4gICAgICAgIC8vIGxldCBldmVudCBsb29wIHNwaW4gc28gcmVqZWN0aW9uIGlzIGhhbmRsZWRcbiAgICAgICAgYXdhaXQgc2xlZXAoMSk7XG4gICAgICAgIF8ua2V5cyhhcHBpdW0uc2Vzc2lvbnMpLnNob3VsZC5jb250YWluKHNlc3Npb25JZCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnZ2V0RHJpdmVyRm9yQ2FwcycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGl0KCdzaG91bGQgbm90IGJsb3cgdXAgaWYgdXNlciBkb2VzIG5vdCBwcm92aWRlIHBsYXRmb3JtTmFtZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IGFwcGl1bSA9IG5ldyBBcHBpdW1Ecml2ZXIoe30pO1xuICAgICAgICAoKCkgPT4geyBhcHBpdW0uZ2V0RHJpdmVyRm9yQ2Fwcyh7fSk7IH0pLnNob3VsZC50aHJvdygvcGxhdGZvcm1OYW1lLyk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgZ2V0IFhDVUlUZXN0RHJpdmVyIGRyaXZlciBmb3IgYXV0b21hdGlvbk5hbWUgb2YgWENVSVRlc3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBhcHBpdW0gPSBuZXcgQXBwaXVtRHJpdmVyKHt9KTtcbiAgICAgICAgbGV0IGRyaXZlciA9IGFwcGl1bS5nZXREcml2ZXJGb3JDYXBzKHtcbiAgICAgICAgICBwbGF0Zm9ybU5hbWU6ICdpT1MnLFxuICAgICAgICAgIGF1dG9tYXRpb25OYW1lOiAnWENVSVRlc3QnXG4gICAgICAgIH0pO1xuICAgICAgICBkcml2ZXIuc2hvdWxkLmJlLmFuLmluc3RhbmNlb2YoRnVuY3Rpb24pO1xuICAgICAgICBkcml2ZXIuc2hvdWxkLmVxdWFsKFhDVUlUZXN0RHJpdmVyKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCBnZXQgaW9zZHJpdmVyIGZvciBpb3MgPCAxMCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IGFwcGl1bSA9IG5ldyBBcHBpdW1Ecml2ZXIoe30pO1xuICAgICAgICBsZXQgY2FwcyA9IHtcbiAgICAgICAgICBwbGF0Zm9ybU5hbWU6ICdpT1MnLFxuICAgICAgICAgIHBsYXRmb3JtVmVyc2lvbjogJzguMCcsXG4gICAgICAgIH07XG4gICAgICAgIGxldCBkcml2ZXIgPSBhcHBpdW0uZ2V0RHJpdmVyRm9yQ2FwcyhjYXBzKTtcbiAgICAgICAgZHJpdmVyLnNob3VsZC5iZS5hbi5pbnN0YW5jZW9mKEZ1bmN0aW9uKTtcbiAgICAgICAgZHJpdmVyLnNob3VsZC5lcXVhbChJb3NEcml2ZXIpO1xuXG4gICAgICAgIGNhcHMucGxhdGZvcm1WZXJzaW9uID0gJzguMSc7XG4gICAgICAgIGRyaXZlciA9IGFwcGl1bS5nZXREcml2ZXJGb3JDYXBzKGNhcHMpO1xuICAgICAgICBkcml2ZXIuc2hvdWxkLmVxdWFsKElvc0RyaXZlcik7XG5cbiAgICAgICAgY2Fwcy5wbGF0Zm9ybVZlcnNpb24gPSAnOS40JztcbiAgICAgICAgZHJpdmVyID0gYXBwaXVtLmdldERyaXZlckZvckNhcHMoY2Fwcyk7XG4gICAgICAgIGRyaXZlci5zaG91bGQuZXF1YWwoSW9zRHJpdmVyKTtcblxuICAgICAgICBjYXBzLnBsYXRmb3JtVmVyc2lvbiA9ICcnO1xuICAgICAgICBkcml2ZXIgPSBhcHBpdW0uZ2V0RHJpdmVyRm9yQ2FwcyhjYXBzKTtcbiAgICAgICAgZHJpdmVyLnNob3VsZC5lcXVhbChJb3NEcml2ZXIpO1xuXG4gICAgICAgIGNhcHMucGxhdGZvcm1WZXJzaW9uID0gJ2Zvbyc7XG4gICAgICAgIGRyaXZlciA9IGFwcGl1bS5nZXREcml2ZXJGb3JDYXBzKGNhcHMpO1xuICAgICAgICBkcml2ZXIuc2hvdWxkLmVxdWFsKElvc0RyaXZlcik7XG5cbiAgICAgICAgZGVsZXRlIGNhcHMucGxhdGZvcm1WZXJzaW9uO1xuICAgICAgICBkcml2ZXIgPSBhcHBpdW0uZ2V0RHJpdmVyRm9yQ2FwcyhjYXBzKTtcbiAgICAgICAgZHJpdmVyLnNob3VsZC5lcXVhbChJb3NEcml2ZXIpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIGdldCB4Y3VpdGVzdGRyaXZlciBmb3IgaW9zID49IDEwJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgYXBwaXVtID0gbmV3IEFwcGl1bURyaXZlcih7fSk7XG4gICAgICAgIGxldCBjYXBzID0ge1xuICAgICAgICAgIHBsYXRmb3JtTmFtZTogJ2lPUycsXG4gICAgICAgICAgcGxhdGZvcm1WZXJzaW9uOiAnMTAnLFxuICAgICAgICB9O1xuICAgICAgICBsZXQgZHJpdmVyID0gYXBwaXVtLmdldERyaXZlckZvckNhcHMoY2Fwcyk7XG4gICAgICAgIGRyaXZlci5zaG91bGQuYmUuYW4uaW5zdGFuY2VvZihGdW5jdGlvbik7XG4gICAgICAgIGRyaXZlci5zaG91bGQuZXF1YWwoWENVSVRlc3REcml2ZXIpO1xuXG4gICAgICAgIGNhcHMucGxhdGZvcm1WZXJzaW9uID0gJzEwLjAnO1xuICAgICAgICBkcml2ZXIgPSBhcHBpdW0uZ2V0RHJpdmVyRm9yQ2FwcyhjYXBzKTtcbiAgICAgICAgZHJpdmVyLnNob3VsZC5lcXVhbChYQ1VJVGVzdERyaXZlcik7XG5cbiAgICAgICAgY2Fwcy5wbGF0Zm9ybVZlcnNpb24gPSAnMTAuMSc7XG4gICAgICAgIGRyaXZlciA9IGFwcGl1bS5nZXREcml2ZXJGb3JDYXBzKGNhcHMpO1xuICAgICAgICBkcml2ZXIuc2hvdWxkLmVxdWFsKFhDVUlUZXN0RHJpdmVyKTtcblxuICAgICAgICBjYXBzLnBsYXRmb3JtVmVyc2lvbiA9ICcxMi4xNCc7XG4gICAgICAgIGRyaXZlciA9IGFwcGl1bS5nZXREcml2ZXJGb3JDYXBzKGNhcHMpO1xuICAgICAgICBkcml2ZXIuc2hvdWxkLmVxdWFsKFhDVUlUZXN0RHJpdmVyKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9
