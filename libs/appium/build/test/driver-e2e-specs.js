require('source-map-support').install();

'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _wd = require('wd');

var _wd2 = _interopRequireDefault(_wd);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _libMain = require('../lib/main');

var _helpers = require('./helpers');

var _appiumBaseDriver = require('appium-base-driver');

var _appiumFakeDriver = require('appium-fake-driver');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

_chai2['default'].use(_chaiAsPromised2['default']);

var should = _chai2['default'].should();
var shouldStartServer = process.env.USE_RUNNING_SERVER !== "0";
var caps = { platformName: "Fake", deviceName: "Fake", app: _helpers.TEST_FAKE_APP };

describe('FakeDriver - via HTTP', function () {
  var server = null;
  var baseUrl = 'http://' + _helpers.TEST_HOST + ':' + _helpers.TEST_PORT + '/wd/hub/session';
  before(function callee$1$0() {
    var args;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          if (!shouldStartServer) {
            context$2$0.next = 5;
            break;
          }

          args = { port: _helpers.TEST_PORT, host: _helpers.TEST_HOST };
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap((0, _libMain.main)(args));

        case 4:
          server = context$2$0.sent;

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  after(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          if (!server) {
            context$2$0.next = 3;
            break;
          }

          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(server.close());

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  describe('session handling', function () {
    it('should start and stop a session', function callee$2$0() {
      var driver, _ref, _ref2, sessionId;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = _wd2['default'].promiseChainRemote(_helpers.TEST_HOST, _helpers.TEST_PORT);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.init(caps));

          case 3:
            _ref = context$3$0.sent;
            _ref2 = _slicedToArray(_ref, 1);
            sessionId = _ref2[0];

            should.exist(sessionId);
            sessionId.should.be.a('string');
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(driver.quit());

          case 10:
            context$3$0.next = 12;
            return _regeneratorRuntime.awrap(driver.title().should.eventually.be.rejectedWith(/terminated/));

          case 12:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('should be able to run two FakeDriver sessions simultaneously', function callee$2$0() {
      var driver1, _ref3, _ref32, sessionId1, driver2, _ref4, _ref42, sessionId2;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver1 = _wd2['default'].promiseChainRemote(_helpers.TEST_HOST, _helpers.TEST_PORT);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver1.init(caps));

          case 3:
            _ref3 = context$3$0.sent;
            _ref32 = _slicedToArray(_ref3, 1);
            sessionId1 = _ref32[0];

            should.exist(sessionId1);
            sessionId1.should.be.a('string');
            driver2 = _wd2['default'].promiseChainRemote(_helpers.TEST_HOST, _helpers.TEST_PORT);
            context$3$0.next = 11;
            return _regeneratorRuntime.awrap(driver2.init(caps));

          case 11:
            _ref4 = context$3$0.sent;
            _ref42 = _slicedToArray(_ref4, 1);
            sessionId2 = _ref42[0];

            should.exist(sessionId2);
            sessionId2.should.be.a('string');
            sessionId1.should.not.equal(sessionId2);
            context$3$0.next = 19;
            return _regeneratorRuntime.awrap(driver1.quit());

          case 19:
            context$3$0.next = 21;
            return _regeneratorRuntime.awrap(driver2.quit());

          case 21:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('should not be able to run two FakeDriver sessions simultaneously when one is unique', function callee$2$0() {
      var uniqueCaps, driver1, _ref5, _ref52, sessionId1, driver2;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            uniqueCaps = _lodash2['default'].clone(caps);

            uniqueCaps.uniqueApp = true;
            driver1 = _wd2['default'].promiseChainRemote(_helpers.TEST_HOST, _helpers.TEST_PORT);
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver1.init(uniqueCaps));

          case 5:
            _ref5 = context$3$0.sent;
            _ref52 = _slicedToArray(_ref5, 1);
            sessionId1 = _ref52[0];

            should.exist(sessionId1);
            sessionId1.should.be.a('string');
            driver2 = _wd2['default'].promiseChainRemote(_helpers.TEST_HOST, _helpers.TEST_PORT);
            context$3$0.next = 13;
            return _regeneratorRuntime.awrap(driver2.init(caps).should.eventually.be.rejected);

          case 13:
            context$3$0.next = 15;
            return _regeneratorRuntime.awrap(driver1.quit());

          case 15:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('should use the newCommandTimeout of the inner Driver on session creation', function callee$2$0() {
      var driver, _ref6, _ref62, sessionId;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = _wd2['default'].promiseChainRemote(_helpers.TEST_HOST, _helpers.TEST_PORT);

            caps.newCommandTimeout = 0.25;

            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.init(caps));

          case 4:
            _ref6 = context$3$0.sent;
            _ref62 = _slicedToArray(_ref6, 1);
            sessionId = _ref62[0];

            should.exist(sessionId);

            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(_bluebird2['default'].delay(250));

          case 10:
            context$3$0.next = 12;
            return _regeneratorRuntime.awrap(driver.source().should.eventually.be.rejectedWith(/terminated/));

          case 12:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('should accept valid W3C capabilities and start a W3C session', function callee$2$0() {
      var w3cCaps, _ref7,

      // Create the session
      status, value, sessionId, _ref8, screenshotStatus, screenshotValue, _ref9,

      // Now use that sessionID to call an arbitrary W3C-only endpoint that isn't implemented to see if it responds with correct error
      statusCode, error, _error$value, errorMessage, message, stacktrace;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            w3cCaps = {
              capabilities: {
                alwaysMatch: { platformName: 'Fake' },
                firstMatch: [{ 'appium:deviceName': 'Fake', 'appium:app': _helpers.TEST_FAKE_APP }]
              }
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_requestPromise2['default'].post({ url: baseUrl, json: w3cCaps }));

          case 3:
            _ref7 = context$3$0.sent;
            status = _ref7.status;
            value = _ref7.value;
            sessionId = _ref7.sessionId;

            should.not.exist(status); // Test that it's a W3C session by checking that 'status' is not in the response
            should.not.exist(sessionId);
            value.sessionId.should.be.a.string;
            value.should.exist;
            value.capabilities.should.deep.equal({
              platformName: 'Fake',
              deviceName: 'Fake',
              app: _helpers.TEST_FAKE_APP
            });

            // Now use that sessionId to call /screenshot
            context$3$0.next = 14;
            return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({ url: baseUrl + '/' + value.sessionId + '/screenshot', json: true }));

          case 14:
            _ref8 = context$3$0.sent;
            screenshotStatus = _ref8.status;
            screenshotValue = _ref8.value;

            should.not.exist(screenshotStatus);
            screenshotValue.should.equal('hahahanotreallyascreenshot');context$3$0.next = 21;
            return _regeneratorRuntime.awrap(_requestPromise2['default'].post({ url: baseUrl + '/' + value.sessionId + '/execute/async', json: { script: '', args: ['a'] } }).should.eventually.be.rejected);

          case 21:
            _ref9 = context$3$0.sent;
            statusCode = _ref9.statusCode;
            error = _ref9.error;

            statusCode.should.equal(404);
            _error$value = error.value;
            errorMessage = _error$value.error;
            message = _error$value.message;
            stacktrace = _error$value.stacktrace;

            errorMessage.should.match(/unknown method/);
            message.should.match(/Method has not yet been implemented/);
            stacktrace.should.match(/FakeDriver.executeCommand/);

            // End session
            context$3$0.next = 34;
            return _regeneratorRuntime.awrap(_requestPromise2['default']['delete']({ url: baseUrl + '/' + value.sessionId }));

          case 34:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('should reject invalid W3C capabilities and respond with a 400 Bad Parameters error', function callee$2$0() {
      var badW3Ccaps, _ref10, statusCode, error;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            badW3Ccaps = {
              capabilities: {
                alwaysMatch: {},
                firstMatch: [{ 'appium:deviceName': 'Fake', 'appium:app': _helpers.TEST_FAKE_APP }]
              }
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_requestPromise2['default'].post({ url: baseUrl, json: badW3Ccaps }).should.eventually.be.rejected);

          case 3:
            _ref10 = context$3$0.sent;
            statusCode = _ref10.statusCode;
            error = _ref10.error;

            statusCode.should.equal(400);
            error.value.message.should.match(/can't be blank/);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('should accept a combo of W3C and JSONWP capabilities but default to W3C', function callee$2$0() {
      var combinedCaps, _ref11, status, value, sessionId;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            combinedCaps = {
              "desiredCapabilities": _extends({}, caps),
              "capabilities": {
                "alwaysMatch": _extends({}, caps),
                "firstMatch": [{
                  w3cParam: 'w3cParam'
                }]
              }
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_requestPromise2['default'].post({ url: baseUrl, json: combinedCaps }));

          case 3:
            _ref11 = context$3$0.sent;
            status = _ref11.status;
            value = _ref11.value;
            sessionId = _ref11.sessionId;

            should.not.exist(status); // If it's a W3C session, should not respond with 'status'
            should.not.exist(sessionId);
            value.sessionId.should.exist;
            value.capabilities.should.deep.equal(_extends({}, caps, {
              w3cParam: 'w3cParam'
            }));

            // End session
            context$3$0.next = 13;
            return _regeneratorRuntime.awrap(_requestPromise2['default']['delete']({ url: baseUrl + '/' + value.sessionId }));

          case 13:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('should accept a combo of W3C and JSONWP but use JSONWP if desiredCapabilities contains extraneous keys', function callee$2$0() {
      var combinedCaps, _ref12, sessionId, status, value;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            combinedCaps = {
              "desiredCapabilities": _extends({}, caps, {
                automationName: 'Fake',
                anotherParam: 'Hello'
              }),
              "capabilities": {
                "alwaysMatch": _extends({}, caps),
                "firstMatch": [{
                  w3cParam: 'w3cParam'
                }]
              }
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_requestPromise2['default'].post({ url: baseUrl, json: combinedCaps }));

          case 3:
            _ref12 = context$3$0.sent;
            sessionId = _ref12.sessionId;
            status = _ref12.status;
            value = _ref12.value;

            status.should.exist;
            sessionId.should.exist;
            should.not.exist(value.sessionId);
            value.should.deep.equal(_extends({}, caps, {
              automationName: 'Fake',
              anotherParam: 'Hello'
            }));

            // End session
            context$3$0.next = 13;
            return _regeneratorRuntime.awrap(_requestPromise2['default']['delete']({ url: baseUrl + '/' + sessionId }));

          case 13:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('should reject bad W3C capabilities with a BadParametersError (400)', function callee$2$0() {
      var w3cCaps, _ref13, error, statusCode, response, message;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            w3cCaps = {
              "capabilities": {
                "alwaysMatch": _extends({}, caps, {
                  "automationName": "BadAutomationName"
                })
              }
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_requestPromise2['default'].post({ url: baseUrl, json: w3cCaps }).should.eventually.be.rejected);

          case 3:
            _ref13 = context$3$0.sent;
            error = _ref13.error;
            statusCode = _ref13.statusCode;
            response = _ref13.response;

            response.headers['content-type'].should.match(/application\/json/);
            message = error.value.message;

            message.should.match(/BadAutomationName not part of/);
            statusCode.should.equal(400);

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('should accept capabilities that are provided in the firstMatch array', function callee$2$0() {
      var w3cCaps, _ref14, value, sessionId, status;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            w3cCaps = {
              "capabilities": {
                "alwaysMatch": {},
                "firstMatch": [{}, _extends({}, caps)]
              }
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_requestPromise2['default'].post({ url: baseUrl, json: w3cCaps }));

          case 3:
            _ref14 = context$3$0.sent;
            value = _ref14.value;
            sessionId = _ref14.sessionId;
            status = _ref14.status;

            should.not.exist(status);
            should.not.exist(sessionId);
            value.capabilities.should.deep.equal(caps);

            // End session
            context$3$0.next = 12;
            return _regeneratorRuntime.awrap(_requestPromise2['default']['delete']({ url: baseUrl + '/' + value.sessionId }));

          case 12:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('should fall back to MJSONWP if w3c caps are invalid', function callee$2$0() {
      var combinedCaps, _ref15, value, sessionId, status;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            combinedCaps = {
              "desiredCapabilities": _extends({}, caps),
              "capabilities": {
                "alwaysMatch": {},
                "firstMatch": [{}, _extends({}, caps, {
                  deviceName: null
                })]
              }
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_requestPromise2['default'].post({ url: baseUrl, json: combinedCaps }));

          case 3:
            _ref15 = context$3$0.sent;
            value = _ref15.value;
            sessionId = _ref15.sessionId;
            status = _ref15.status;

            status.should.exist;
            sessionId.should.exist;
            value.should.deep.equal(caps);

            // End session
            context$3$0.next = 12;
            return _regeneratorRuntime.awrap(_requestPromise2['default']['delete']({ url: baseUrl + '/' + sessionId }));

          case 12:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('should fall back to MJSONWP if Inner Driver is not ready for W3C', function callee$2$0() {
      var combinedCaps, createSessionStub, _ref16, value, sessionId, status;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            combinedCaps = {
              "desiredCapabilities": _extends({}, caps),
              "capabilities": {
                "alwaysMatch": _extends({}, caps, {
                  deviceName: null
                })
              }
            };
            createSessionStub = _sinon2['default'].stub(_appiumFakeDriver.FakeDriver.prototype, 'createSession').callsFake(function callee$3$0(jsonwpCaps) {
              var res;
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    context$4$0.next = 2;
                    return _regeneratorRuntime.awrap(_appiumBaseDriver.BaseDriver.prototype.createSession.call(this, jsonwpCaps));

                  case 2:
                    res = context$4$0.sent;

                    this.protocol.should.equal('MJSONWP');
                    return context$4$0.abrupt('return', res);

                  case 5:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, this);
            });
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_requestPromise2['default'].post({ url: baseUrl, json: combinedCaps }));

          case 4:
            _ref16 = context$3$0.sent;
            value = _ref16.value;
            sessionId = _ref16.sessionId;
            status = _ref16.status;

            status.should.exist;
            sessionId.should.exist;
            value.should.deep.equal(caps);

            createSessionStub.restore();

          case 12:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('should handle concurrent MJSONWP and W3C sessions', function callee$2$0() {
      var combinedCaps, _ref17, mjsonwpSessId, mjsonwpValue, status, _ref18, value, w3cSessId, mjsonwpPayload, w3cPayload;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            combinedCaps = {
              "desiredCapabilities": _extends({}, caps),
              "capabilities": {
                "alwaysMatch": _extends({}, caps)
              }
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_requestPromise2['default'].post({ url: baseUrl, json: _lodash2['default'].omit(combinedCaps, 'capabilities') }));

          case 3:
            _ref17 = context$3$0.sent;
            mjsonwpSessId = _ref17.sessionId;
            mjsonwpValue = _ref17.value;
            status = _ref17.status;
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(_requestPromise2['default'].post({ url: baseUrl, json: _lodash2['default'].omit(combinedCaps, 'desiredCapabilities') }));

          case 9:
            _ref18 = context$3$0.sent;
            value = _ref18.value;
            w3cSessId = value.sessionId;

            status.should.exist;
            mjsonwpValue.should.eql(caps);
            mjsonwpSessId.should.exist;
            value.sessionId.should.exist;
            value.capabilities.should.eql(caps);

            // Test that both return the proper payload based on their protocol
            context$3$0.next = 19;
            return _regeneratorRuntime.awrap((0, _requestPromise2['default'])(baseUrl + '/' + mjsonwpSessId, { json: true }));

          case 19:
            mjsonwpPayload = context$3$0.sent;
            context$3$0.next = 22;
            return _regeneratorRuntime.awrap((0, _requestPromise2['default'])(baseUrl + '/' + w3cSessId, { json: true }));

          case 22:
            w3cPayload = context$3$0.sent;

            // Test that the payloads are MJSONWP and W3C
            mjsonwpPayload.sessionId.should.exist;
            mjsonwpPayload.status.should.exist;
            mjsonwpPayload.value.should.eql(caps);
            should.not.exist(w3cPayload.sessionId);
            should.not.exist(w3cPayload.status);
            w3cPayload.value.should.eql(caps);

            // End session
            context$3$0.next = 31;
            return _regeneratorRuntime.awrap(_requestPromise2['default']['delete']({ url: baseUrl + '/' + mjsonwpSessId }));

          case 31:
            context$3$0.next = 33;
            return _regeneratorRuntime.awrap(_requestPromise2['default']['delete']({ url: baseUrl + '/' + w3cSessId }));

          case 33:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});

describe('Logsink', function () {
  var server = null;
  var logs = [];
  var logHandler = function logHandler(level, message) {
    logs.push([level, message]);
  };
  var args = { port: _helpers.TEST_PORT, host: _helpers.TEST_HOST, logHandler: logHandler };

  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap((0, _libMain.main)(args));

        case 2:
          server = context$2$0.sent;

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  after(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(server.close());

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should send logs to a logHandler passed in by a parent package', function callee$1$0() {
    var welcomeIndex;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          logs.length.should.be.above(1);
          welcomeIndex = logs[0][1].includes('versions of node') ? 1 : 0;

          logs[welcomeIndex].length.should.equal(2);
          logs[welcomeIndex][1].should.include("Welcome to Appium");

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});

// Try with valid capabilities and check that it returns a session ID

// Have an MJSONWP and W3C session running concurrently
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZHJpdmVyLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7c0JBRWMsUUFBUTs7Ozt3QkFDUixVQUFVOzs7O29CQUNQLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O2tCQUM5QixJQUFJOzs7OzhCQUNDLGlCQUFpQjs7Ozt1QkFDQSxhQUFhOzt1QkFDRSxXQUFXOztnQ0FDcEMsb0JBQW9COztnQ0FDcEIsb0JBQW9COztxQkFDN0IsT0FBTzs7OztBQUV6QixrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixJQUFNLE1BQU0sR0FBRyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUM3QixJQUFNLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEtBQUssR0FBRyxDQUFDO0FBQ2pFLElBQU0sSUFBSSxHQUFHLEVBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsd0JBQWUsRUFBQyxDQUFDOztBQUU1RSxRQUFRLENBQUMsdUJBQXVCLEVBQUUsWUFBWTtBQUM1QyxNQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDbEIsTUFBTSxPQUFPLGdGQUFvRCxDQUFDO0FBQ2xFLFFBQU0sQ0FBQztRQUVDLElBQUk7Ozs7ZUFETixpQkFBaUI7Ozs7O0FBQ2YsY0FBSSxHQUFHLEVBQUMsSUFBSSxvQkFBVyxFQUFFLElBQUksb0JBQVcsRUFBQzs7MkNBQzlCLG1CQUFhLElBQUksQ0FBQzs7O0FBQWpDLGdCQUFNOzs7Ozs7O0dBRVQsQ0FBQyxDQUFDO0FBQ0gsT0FBSyxDQUFDOzs7O2VBQ0EsTUFBTTs7Ozs7OzJDQUNGLE1BQU0sQ0FBQyxLQUFLLEVBQUU7Ozs7Ozs7R0FFdkIsQ0FBQyxDQUFDOztBQUVILFVBQVEsQ0FBQyxrQkFBa0IsRUFBRSxZQUFZO0FBQ3ZDLE1BQUUsQ0FBQyxpQ0FBaUMsRUFBRTtVQUNoQyxNQUFNLGVBQ0wsU0FBUzs7Ozs7QUFEVixrQkFBTSxHQUFH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QUFDLENBQUM7O0FBRUgsT0FBSyxDQUFDOzs7OzsyQ0FDRSxNQUFNLENBQUMsS0FBSyxFQUFFOzs7Ozs7O0dBQ3JCLENBQUMsQ0FBQzs7QUFFSCxJQUFFLENBQUMsZ0VBQWdFLEVBQUU7UUFFL0QsWUFBWTs7OztBQURoQixjQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzNCLHNCQUFZLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDOztBQUNsRSxjQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUMsY0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQzs7Ozs7OztHQUMzRCxDQUFDLENBQUM7Q0FFSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9kcml2ZXItZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHJhbnNwaWxlOm1vY2hhXG5cbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgQiBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCB3ZCBmcm9tICd3ZCc7XG5pbXBvcnQgcmVxdWVzdCBmcm9tICdyZXF1ZXN0LXByb21pc2UnO1xuaW1wb3J0IHsgbWFpbiBhcyBhcHBpdW1TZXJ2ZXIgfSBmcm9tICcuLi9saWIvbWFpbic7XG5pbXBvcnQgeyBURVNUX0ZBS0VfQVBQLCBURVNUX0hPU1QsIFRFU1RfUE9SVCB9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQgeyBCYXNlRHJpdmVyIH0gZnJvbSAnYXBwaXVtLWJhc2UtZHJpdmVyJztcbmltcG9ydCB7IEZha2VEcml2ZXIgfSBmcm9tICdhcHBpdW0tZmFrZS1kcml2ZXInO1xuaW1wb3J0IHNpbm9uIGZyb20gJ3Npbm9uJztcblxuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5jb25zdCBzaG91bGQgPSBjaGFpLnNob3VsZCgpO1xuY29uc3Qgc2hvdWxkU3RhcnRTZXJ2ZXIgPSBwcm9jZXNzLmVudi5VU0VfUlVOTklOR19TRVJWRVIgIT09IFwiMFwiO1xuY29uc3QgY2FwcyA9IHtwbGF0Zm9ybU5hbWU6IFwiRmFrZVwiLCBkZXZpY2VOYW1lOiBcIkZha2VcIiwgYXBwOiBURVNUX0ZBS0VfQVBQfTtcblxuZGVzY3JpYmUoJ0Zha2VEcml2ZXIgLSB2aWEgSFRUUCcsIGZ1bmN0aW9uICgpIHtcbiAgbGV0IHNlcnZlciA9IG51bGw7XG4gIGNvbnN0IGJhc2VVcmwgPSBgaHR0cDovLyR7VEVTVF9IT1NUfToke1RFU1RfUE9SVH0vd2QvaHViL3Nlc3Npb25gO1xuICBiZWZvcmUoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGlmIChzaG91bGRTdGFydFNlcnZlcikge1xuICAgICAgbGV0IGFyZ3MgPSB7cG9ydDogVEVTVF9QT1JULCBob3N0OiBURVNUX0hPU1R9O1xuICAgICAgc2VydmVyID0gYXdhaXQgYXBwaXVtU2VydmVyKGFyZ3MpO1xuICAgIH1cbiAgfSk7XG4gIGFmdGVyKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoc2VydmVyKSB7XG4gICAgICBhd2FpdCBzZXJ2ZXIuY2xvc2UoKTtcbiAgICB9XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdzZXNzaW9uIGhhbmRsaW5nJywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdzaG91bGQgc3RhcnQgYW5kIHN0b3AgYSBzZXNzaW9uJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGRyaXZlciA9IHdkLnByb21pc2VDaGFpblJlbW90ZShURVNUX0hPU1QsIFRFU1RfUE9SVCk7XG4gICAgICBsZXQgW3Nlc3Npb25JZF0gPSBhd2FpdCBkcml2ZXIuaW5pdChjYXBzKTtcbiAgICAgIHNob3VsZC5leGlzdChzZXNzaW9uSWQpO1xuICAgICAgc2Vzc2lvbklkLnNob3VsZC5iZS5hKCdzdHJpbmcnKTtcbiAgICAgIGF3YWl0IGRyaXZlci5xdWl0KCk7XG4gICAgICBhd2FpdCBkcml2ZXIudGl0bGUoKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoL3Rlcm1pbmF0ZWQvKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byBydW4gdHdvIEZha2VEcml2ZXIgc2Vzc2lvbnMgc2ltdWx0YW5lb3VzbHknLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgZHJpdmVyMSA9IHdkLnByb21pc2VDaGFpblJlbW90ZShURVNUX0hPU1QsIFRFU1RfUE9SVCk7XG4gICAgICBsZXQgW3Nlc3Npb25JZDFdID0gYXdhaXQgZHJpdmVyMS5pbml0KGNhcHMpO1xuICAgICAgc2hvdWxkLmV4aXN0KHNlc3Npb25JZDEpO1xuICAgICAgc2Vzc2lvbklkMS5zaG91bGQuYmUuYSgnc3RyaW5nJyk7XG4gICAgICBsZXQgZHJpdmVyMiA9IHdkLnByb21pc2VDaGFpblJlbW90ZShURVNUX0hPU1QsIFRFU1RfUE9SVCk7XG4gICAgICBsZXQgW3Nlc3Npb25JZDJdID0gYXdhaXQgZHJpdmVyMi5pbml0KGNhcHMpO1xuICAgICAgc2hvdWxkLmV4aXN0KHNlc3Npb25JZDIpO1xuICAgICAgc2Vzc2lvbklkMi5zaG91bGQuYmUuYSgnc3RyaW5nJyk7XG4gICAgICBzZXNzaW9uSWQxLnNob3VsZC5ub3QuZXF1YWwoc2Vzc2lvbklkMik7XG4gICAgICBhd2FpdCBkcml2ZXIxLnF1aXQoKTtcbiAgICAgIGF3YWl0IGRyaXZlcjIucXVpdCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBub3QgYmUgYWJsZSB0byBydW4gdHdvIEZha2VEcml2ZXIgc2Vzc2lvbnMgc2ltdWx0YW5lb3VzbHkgd2hlbiBvbmUgaXMgdW5pcXVlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IHVuaXF1ZUNhcHMgPSBfLmNsb25lKGNhcHMpO1xuICAgICAgdW5pcXVlQ2Fwcy51bmlxdWVBcHAgPSB0cnVlO1xuICAgICAgbGV0IGRyaXZlcjEgPSB3ZC5wcm9taXNlQ2hhaW5SZW1vdGUoVEVTVF9IT1NULCBURVNUX1BPUlQpO1xuICAgICAgbGV0IFtzZXNzaW9uSWQxXSA9IGF3YWl0IGRyaXZlcjEuaW5pdCh1bmlxdWVDYXBzKTtcbiAgICAgIHNob3VsZC5leGlzdChzZXNzaW9uSWQxKTtcbiAgICAgIHNlc3Npb25JZDEuc2hvdWxkLmJlLmEoJ3N0cmluZycpO1xuICAgICAgbGV0IGRyaXZlcjIgPSB3ZC5wcm9taXNlQ2hhaW5SZW1vdGUoVEVTVF9IT1NULCBURVNUX1BPUlQpO1xuICAgICAgYXdhaXQgZHJpdmVyMi5pbml0KGNhcHMpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkO1xuICAgICAgYXdhaXQgZHJpdmVyMS5xdWl0KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHVzZSB0aGUgbmV3Q29tbWFuZFRpbWVvdXQgb2YgdGhlIGlubmVyIERyaXZlciBvbiBzZXNzaW9uIGNyZWF0aW9uJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGRyaXZlciA9IHdkLnByb21pc2VDaGFpblJlbW90ZShURVNUX0hPU1QsIFRFU1RfUE9SVCk7XG5cbiAgICAgIGNhcHMubmV3Q29tbWFuZFRpbWVvdXQgPSAwLjI1O1xuXG4gICAgICBsZXQgW3Nlc3Npb25JZF0gPSBhd2FpdCBkcml2ZXIuaW5pdChjYXBzKTtcbiAgICAgIHNob3VsZC5leGlzdChzZXNzaW9uSWQpO1xuXG4gICAgICBhd2FpdCBCLmRlbGF5KDI1MCk7XG4gICAgICBhd2FpdCBkcml2ZXIuc291cmNlKCkuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKC90ZXJtaW5hdGVkLyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGFjY2VwdCB2YWxpZCBXM0MgY2FwYWJpbGl0aWVzIGFuZCBzdGFydCBhIFczQyBzZXNzaW9uJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgLy8gVHJ5IHdpdGggdmFsaWQgY2FwYWJpbGl0aWVzIGFuZCBjaGVjayB0aGF0IGl0IHJldHVybnMgYSBzZXNzaW9uIElEXG4gICAgICBjb25zdCB3M2NDYXBzID0ge1xuICAgICAgICBjYXBhYmlsaXRpZXM6IHtcbiAgICAgICAgICBhbHdheXNNYXRjaDoge3BsYXRmb3JtTmFtZTogJ0Zha2UnfSxcbiAgICAgICAgICBmaXJzdE1hdGNoOiBbeydhcHBpdW06ZGV2aWNlTmFtZSc6ICdGYWtlJywgJ2FwcGl1bTphcHAnOiBURVNUX0ZBS0VfQVBQfV0sXG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8vIENyZWF0ZSB0aGUgc2Vzc2lvblxuICAgICAgY29uc3Qge3N0YXR1cywgdmFsdWUsIHNlc3Npb25JZH0gPSBhd2FpdCByZXF1ZXN0LnBvc3Qoe3VybDogYmFzZVVybCwganNvbjogdzNjQ2Fwc30pO1xuICAgICAgc2hvdWxkLm5vdC5leGlzdChzdGF0dXMpOyAvLyBUZXN0IHRoYXQgaXQncyBhIFczQyBzZXNzaW9uIGJ5IGNoZWNraW5nIHRoYXQgJ3N0YXR1cycgaXMgbm90IGluIHRoZSByZXNwb25zZVxuICAgICAgc2hvdWxkLm5vdC5leGlzdChzZXNzaW9uSWQpO1xuICAgICAgdmFsdWUuc2Vzc2lvbklkLnNob3VsZC5iZS5hLnN0cmluZztcbiAgICAgIHZhbHVlLnNob3VsZC5leGlzdDtcbiAgICAgIHZhbHVlLmNhcGFiaWxpdGllcy5zaG91bGQuZGVlcC5lcXVhbCh7XG4gICAgICAgIHBsYXRmb3JtTmFtZTogJ0Zha2UnLFxuICAgICAgICBkZXZpY2VOYW1lOiAnRmFrZScsXG4gICAgICAgIGFwcDogVEVTVF9GQUtFX0FQUCxcbiAgICAgIH0pO1xuXG4gICAgICAvLyBOb3cgdXNlIHRoYXQgc2Vzc2lvbklkIHRvIGNhbGwgL3NjcmVlbnNob3RcbiAgICAgIGNvbnN0IHtzdGF0dXM6c2NyZWVuc2hvdFN0YXR1cywgdmFsdWU6c2NyZWVuc2hvdFZhbHVlfSA9IGF3YWl0IHJlcXVlc3Qoe3VybDogYCR7YmFzZVVybH0vJHt2YWx1ZS5zZXNzaW9uSWR9L3NjcmVlbnNob3RgLCBqc29uOiB0cnVlfSk7XG4gICAgICBzaG91bGQubm90LmV4aXN0KHNjcmVlbnNob3RTdGF0dXMpO1xuICAgICAgc2NyZWVuc2hvdFZhbHVlLnNob3VsZC5lcXVhbCgnaGFoYWhhbm90cmVhbGx5YXNjcmVlbnNob3QnKTtcblxuICAgICAgLy8gTm93IHVzZSB0aGF0IHNlc3Npb25JRCB0byBjYWxsIGFuIGFyYml0cmFyeSBXM0Mtb25seSBlbmRwb2ludCB0aGF0IGlzbid0IGltcGxlbWVudGVkIHRvIHNlZSBpZiBpdCByZXNwb25kcyB3aXRoIGNvcnJlY3QgZXJyb3JcbiAgICAgIGNvbnN0IHtzdGF0dXNDb2RlLCBlcnJvcn0gPSBhd2FpdCByZXF1ZXN0LnBvc3Qoe3VybDogYCR7YmFzZVVybH0vJHt2YWx1ZS5zZXNzaW9uSWR9L2V4ZWN1dGUvYXN5bmNgLCBqc29uOiB7c2NyaXB0OiAnJywgYXJnczogWydhJ119fSkuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWQ7XG4gICAgICBzdGF0dXNDb2RlLnNob3VsZC5lcXVhbCg0MDQpO1xuICAgICAgY29uc3Qge2Vycm9yOmVycm9yTWVzc2FnZSwgbWVzc2FnZSwgc3RhY2t0cmFjZX0gPSBlcnJvci52YWx1ZTtcbiAgICAgIGVycm9yTWVzc2FnZS5zaG91bGQubWF0Y2goL3Vua25vd24gbWV0aG9kLyk7XG4gICAgICBtZXNzYWdlLnNob3VsZC5tYXRjaCgvTWV0aG9kIGhhcyBub3QgeWV0IGJlZW4gaW1wbGVtZW50ZWQvKTtcbiAgICAgIHN0YWNrdHJhY2Uuc2hvdWxkLm1hdGNoKC9GYWtlRHJpdmVyLmV4ZWN1dGVDb21tYW5kLyk7XG5cbiAgICAgIC8vIEVuZCBzZXNzaW9uXG4gICAgICBhd2FpdCByZXF1ZXN0LmRlbGV0ZSh7dXJsOiBgJHtiYXNlVXJsfS8ke3ZhbHVlLnNlc3Npb25JZH1gfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJlamVjdCBpbnZhbGlkIFczQyBjYXBhYmlsaXRpZXMgYW5kIHJlc3BvbmQgd2l0aCBhIDQwMCBCYWQgUGFyYW1ldGVycyBlcnJvcicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IGJhZFczQ2NhcHMgPSB7XG4gICAgICAgIGNhcGFiaWxpdGllczoge1xuICAgICAgICAgIGFsd2F5c01hdGNoOiB7fSxcbiAgICAgICAgICBmaXJzdE1hdGNoOiBbeydhcHBpdW06ZGV2aWNlTmFtZSc6ICdGYWtlJywgJ2FwcGl1bTphcHAnOiBURVNUX0ZBS0VfQVBQfV0sXG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHtzdGF0dXNDb2RlLCBlcnJvcn0gPSBhd2FpdCByZXF1ZXN0LnBvc3Qoe3VybDogYmFzZVVybCwganNvbjogYmFkVzNDY2Fwc30pLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkO1xuICAgICAgc3RhdHVzQ29kZS5zaG91bGQuZXF1YWwoNDAwKTtcbiAgICAgIGVycm9yLnZhbHVlLm1lc3NhZ2Uuc2hvdWxkLm1hdGNoKC9jYW4ndCBiZSBibGFuay8pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBhY2NlcHQgYSBjb21ibyBvZiBXM0MgYW5kIEpTT05XUCBjYXBhYmlsaXRpZXMgYnV0IGRlZmF1bHQgdG8gVzNDJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgY29tYmluZWRDYXBzID0ge1xuICAgICAgICBcImRlc2lyZWRDYXBhYmlsaXRpZXNcIjoge1xuICAgICAgICAgIC4uLmNhcHMsXG4gICAgICAgIH0sXG4gICAgICAgIFwiY2FwYWJpbGl0aWVzXCI6IHtcbiAgICAgICAgICBcImFsd2F5c01hdGNoXCI6IHsuLi5jYXBzfSxcbiAgICAgICAgICBcImZpcnN0TWF0Y2hcIjogW3tcbiAgICAgICAgICAgIHczY1BhcmFtOiAndzNjUGFyYW0nLFxuICAgICAgICAgIH1dLFxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCB7c3RhdHVzLCB2YWx1ZSwgc2Vzc2lvbklkfSA9IGF3YWl0IHJlcXVlc3QucG9zdCh7dXJsOiBiYXNlVXJsLCBqc29uOiBjb21iaW5lZENhcHN9KTtcbiAgICAgIHNob3VsZC5ub3QuZXhpc3Qoc3RhdHVzKTsgLy8gSWYgaXQncyBhIFczQyBzZXNzaW9uLCBzaG91bGQgbm90IHJlc3BvbmQgd2l0aCAnc3RhdHVzJ1xuICAgICAgc2hvdWxkLm5vdC5leGlzdChzZXNzaW9uSWQpO1xuICAgICAgdmFsdWUuc2Vzc2lvbklkLnNob3VsZC5leGlzdDtcbiAgICAgIHZhbHVlLmNhcGFiaWxpdGllcy5zaG91bGQuZGVlcC5lcXVhbCh7XG4gICAgICAgIC4uLmNhcHMsXG4gICAgICAgIHczY1BhcmFtOiAndzNjUGFyYW0nLFxuICAgICAgfSk7XG5cbiAgICAgIC8vIEVuZCBzZXNzaW9uXG4gICAgICBhd2FpdCByZXF1ZXN0LmRlbGV0ZSh7IHVybDogYCR7YmFzZVVybH0vJHt2YWx1ZS5zZXNzaW9uSWR9YCB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgYWNjZXB0IGEgY29tYm8gb2YgVzNDIGFuZCBKU09OV1AgYnV0IHVzZSBKU09OV1AgaWYgZGVzaXJlZENhcGFiaWxpdGllcyBjb250YWlucyBleHRyYW5lb3VzIGtleXMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBjb21iaW5lZENhcHMgPSB7XG4gICAgICAgIFwiZGVzaXJlZENhcGFiaWxpdGllc1wiOiB7XG4gICAgICAgICAgLi4uY2FwcyxcbiAgICAgICAgICBhdXRvbWF0aW9uTmFtZTogJ0Zha2UnLFxuICAgICAgICAgIGFub3RoZXJQYXJhbTogJ0hlbGxvJyxcbiAgICAgICAgfSxcbiAgICAgICAgXCJjYXBhYmlsaXRpZXNcIjoge1xuICAgICAgICAgIFwiYWx3YXlzTWF0Y2hcIjogey4uLmNhcHN9LFxuICAgICAgICAgIFwiZmlyc3RNYXRjaFwiOiBbe1xuICAgICAgICAgICAgdzNjUGFyYW06ICd3M2NQYXJhbScsXG4gICAgICAgICAgfV0sXG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHtzZXNzaW9uSWQsIHN0YXR1cywgdmFsdWV9ID0gYXdhaXQgcmVxdWVzdC5wb3N0KHt1cmw6IGJhc2VVcmwsIGpzb246IGNvbWJpbmVkQ2Fwc30pO1xuICAgICAgc3RhdHVzLnNob3VsZC5leGlzdDtcbiAgICAgIHNlc3Npb25JZC5zaG91bGQuZXhpc3Q7XG4gICAgICBzaG91bGQubm90LmV4aXN0KHZhbHVlLnNlc3Npb25JZCk7XG4gICAgICB2YWx1ZS5zaG91bGQuZGVlcC5lcXVhbCh7XG4gICAgICAgIC4uLmNhcHMsXG4gICAgICAgIGF1dG9tYXRpb25OYW1lOiAnRmFrZScsXG4gICAgICAgIGFub3RoZXJQYXJhbTogJ0hlbGxvJyxcbiAgICAgIH0pO1xuXG4gICAgICAvLyBFbmQgc2Vzc2lvblxuICAgICAgYXdhaXQgcmVxdWVzdC5kZWxldGUoeyB1cmw6IGAke2Jhc2VVcmx9LyR7c2Vzc2lvbklkfWAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJlamVjdCBiYWQgVzNDIGNhcGFiaWxpdGllcyB3aXRoIGEgQmFkUGFyYW1ldGVyc0Vycm9yICg0MDApJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgdzNjQ2FwcyA9IHtcbiAgICAgICAgXCJjYXBhYmlsaXRpZXNcIjoge1xuICAgICAgICAgIFwiYWx3YXlzTWF0Y2hcIjoge1xuICAgICAgICAgICAgLi4uY2FwcyxcbiAgICAgICAgICAgIFwiYXV0b21hdGlvbk5hbWVcIjogXCJCYWRBdXRvbWF0aW9uTmFtZVwiLFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBjb25zdCB7ZXJyb3IsIHN0YXR1c0NvZGUsIHJlc3BvbnNlfSA9IGF3YWl0IHJlcXVlc3QucG9zdCh7dXJsOiBiYXNlVXJsLCBqc29uOiB3M2NDYXBzfSkuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWQ7XG4gICAgICByZXNwb25zZS5oZWFkZXJzWydjb250ZW50LXR5cGUnXS5zaG91bGQubWF0Y2goL2FwcGxpY2F0aW9uXFwvanNvbi8pO1xuICAgICAgY29uc3Qge21lc3NhZ2V9ID0gZXJyb3IudmFsdWU7XG4gICAgICBtZXNzYWdlLnNob3VsZC5tYXRjaCgvQmFkQXV0b21hdGlvbk5hbWUgbm90IHBhcnQgb2YvKTtcbiAgICAgIHN0YXR1c0NvZGUuc2hvdWxkLmVxdWFsKDQwMCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGFjY2VwdCBjYXBhYmlsaXRpZXMgdGhhdCBhcmUgcHJvdmlkZWQgaW4gdGhlIGZpcnN0TWF0Y2ggYXJyYXknLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCB3M2NDYXBzID0ge1xuICAgICAgICBcImNhcGFiaWxpdGllc1wiOiB7XG4gICAgICAgICAgXCJhbHdheXNNYXRjaFwiOiB7fSxcbiAgICAgICAgICBcImZpcnN0TWF0Y2hcIjogW3t9LCB7XG4gICAgICAgICAgICAuLi5jYXBzXG4gICAgICAgICAgfV0sXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgICAgY29uc3Qge3ZhbHVlLCBzZXNzaW9uSWQsIHN0YXR1c30gPSBhd2FpdCByZXF1ZXN0LnBvc3Qoe3VybDogYmFzZVVybCwganNvbjogdzNjQ2Fwc30pO1xuICAgICAgc2hvdWxkLm5vdC5leGlzdChzdGF0dXMpO1xuICAgICAgc2hvdWxkLm5vdC5leGlzdChzZXNzaW9uSWQpO1xuICAgICAgdmFsdWUuY2FwYWJpbGl0aWVzLnNob3VsZC5kZWVwLmVxdWFsKGNhcHMpO1xuXG4gICAgICAvLyBFbmQgc2Vzc2lvblxuICAgICAgYXdhaXQgcmVxdWVzdC5kZWxldGUoeyB1cmw6IGAke2Jhc2VVcmx9LyR7dmFsdWUuc2Vzc2lvbklkfWAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGZhbGwgYmFjayB0byBNSlNPTldQIGlmIHczYyBjYXBzIGFyZSBpbnZhbGlkJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgY29tYmluZWRDYXBzID0ge1xuICAgICAgICBcImRlc2lyZWRDYXBhYmlsaXRpZXNcIjoge1xuICAgICAgICAgIC4uLmNhcHMsXG4gICAgICAgIH0sXG4gICAgICAgIFwiY2FwYWJpbGl0aWVzXCI6IHtcbiAgICAgICAgICBcImFsd2F5c01hdGNoXCI6IHt9LFxuICAgICAgICAgIFwiZmlyc3RNYXRjaFwiOiBbe30sIHtcbiAgICAgICAgICAgIC4uLmNhcHMsXG4gICAgICAgICAgICBkZXZpY2VOYW1lOiBudWxsLFxuICAgICAgICAgIH1dLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHt2YWx1ZSwgc2Vzc2lvbklkLCBzdGF0dXN9ID0gYXdhaXQgcmVxdWVzdC5wb3N0KHt1cmw6IGJhc2VVcmwsIGpzb246IGNvbWJpbmVkQ2Fwc30pO1xuICAgICAgc3RhdHVzLnNob3VsZC5leGlzdDtcbiAgICAgIHNlc3Npb25JZC5zaG91bGQuZXhpc3Q7XG4gICAgICB2YWx1ZS5zaG91bGQuZGVlcC5lcXVhbChjYXBzKTtcblxuICAgICAgLy8gRW5kIHNlc3Npb25cbiAgICAgIGF3YWl0IHJlcXVlc3QuZGVsZXRlKHsgdXJsOiBgJHtiYXNlVXJsfS8ke3Nlc3Npb25JZH1gIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBmYWxsIGJhY2sgdG8gTUpTT05XUCBpZiBJbm5lciBEcml2ZXIgaXMgbm90IHJlYWR5IGZvciBXM0MnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBjb21iaW5lZENhcHMgPSB7XG4gICAgICAgIFwiZGVzaXJlZENhcGFiaWxpdGllc1wiOiB7XG4gICAgICAgICAgLi4uY2FwcyxcbiAgICAgICAgfSxcbiAgICAgICAgXCJjYXBhYmlsaXRpZXNcIjoge1xuICAgICAgICAgIFwiYWx3YXlzTWF0Y2hcIjoge1xuICAgICAgICAgICAgLi4uY2FwcyxcbiAgICAgICAgICAgIGRldmljZU5hbWU6IG51bGwsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBjb25zdCBjcmVhdGVTZXNzaW9uU3R1YiA9IHNpbm9uLnN0dWIoRmFrZURyaXZlci5wcm90b3R5cGUsICdjcmVhdGVTZXNzaW9uJykuY2FsbHNGYWtlKGFzeW5jIGZ1bmN0aW9uIChqc29ud3BDYXBzKSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IEJhc2VEcml2ZXIucHJvdG90eXBlLmNyZWF0ZVNlc3Npb24uY2FsbCh0aGlzLCBqc29ud3BDYXBzKTtcbiAgICAgICAgdGhpcy5wcm90b2NvbC5zaG91bGQuZXF1YWwoJ01KU09OV1AnKTtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCB7dmFsdWUsIHNlc3Npb25JZCwgc3RhdHVzfSA9IGF3YWl0IHJlcXVlc3QucG9zdCh7dXJsOiBiYXNlVXJsLCBqc29uOiBjb21iaW5lZENhcHN9KTtcbiAgICAgIHN0YXR1cy5zaG91bGQuZXhpc3Q7XG4gICAgICBzZXNzaW9uSWQuc2hvdWxkLmV4aXN0O1xuICAgICAgdmFsdWUuc2hvdWxkLmRlZXAuZXF1YWwoY2Fwcyk7XG5cbiAgICAgIGNyZWF0ZVNlc3Npb25TdHViLnJlc3RvcmUoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgaGFuZGxlIGNvbmN1cnJlbnQgTUpTT05XUCBhbmQgVzNDIHNlc3Npb25zJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgY29tYmluZWRDYXBzID0ge1xuICAgICAgICBcImRlc2lyZWRDYXBhYmlsaXRpZXNcIjoge1xuICAgICAgICAgIC4uLmNhcHMsXG4gICAgICAgIH0sXG4gICAgICAgIFwiY2FwYWJpbGl0aWVzXCI6IHtcbiAgICAgICAgICBcImFsd2F5c01hdGNoXCI6IHtcbiAgICAgICAgICAgIC4uLmNhcHMsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIC8vIEhhdmUgYW4gTUpTT05XUCBhbmQgVzNDIHNlc3Npb24gcnVubmluZyBjb25jdXJyZW50bHlcbiAgICAgIGNvbnN0IHtzZXNzaW9uSWQ6bWpzb253cFNlc3NJZCwgdmFsdWU6bWpzb253cFZhbHVlLCBzdGF0dXN9ID0gYXdhaXQgcmVxdWVzdC5wb3N0KHt1cmw6IGJhc2VVcmwsIGpzb246IF8ub21pdChjb21iaW5lZENhcHMsICdjYXBhYmlsaXRpZXMnKX0pO1xuICAgICAgY29uc3Qge3ZhbHVlfSA9IGF3YWl0IHJlcXVlc3QucG9zdCh7dXJsOiBiYXNlVXJsLCBqc29uOiBfLm9taXQoY29tYmluZWRDYXBzLCAnZGVzaXJlZENhcGFiaWxpdGllcycpfSk7XG4gICAgICBjb25zdCB3M2NTZXNzSWQgPSB2YWx1ZS5zZXNzaW9uSWQ7XG5cbiAgICAgIHN0YXR1cy5zaG91bGQuZXhpc3Q7XG4gICAgICBtanNvbndwVmFsdWUuc2hvdWxkLmVxbChjYXBzKTtcbiAgICAgIG1qc29ud3BTZXNzSWQuc2hvdWxkLmV4aXN0O1xuICAgICAgdmFsdWUuc2Vzc2lvbklkLnNob3VsZC5leGlzdDtcbiAgICAgIHZhbHVlLmNhcGFiaWxpdGllcy5zaG91bGQuZXFsKGNhcHMpO1xuXG4gICAgICAvLyBUZXN0IHRoYXQgYm90aCByZXR1cm4gdGhlIHByb3BlciBwYXlsb2FkIGJhc2VkIG9uIHRoZWlyIHByb3RvY29sXG4gICAgICBjb25zdCBtanNvbndwUGF5bG9hZCA9IGF3YWl0IHJlcXVlc3QoYCR7YmFzZVVybH0vJHttanNvbndwU2Vzc0lkfWAsIHtqc29uOiB0cnVlfSk7XG4gICAgICBjb25zdCB3M2NQYXlsb2FkID0gYXdhaXQgcmVxdWVzdChgJHtiYXNlVXJsfS8ke3czY1Nlc3NJZH1gLCB7anNvbjogdHJ1ZX0pO1xuXG4gICAgICAvLyBUZXN0IHRoYXQgdGhlIHBheWxvYWRzIGFyZSBNSlNPTldQIGFuZCBXM0NcbiAgICAgIG1qc29ud3BQYXlsb2FkLnNlc3Npb25JZC5zaG91bGQuZXhpc3Q7XG4gICAgICBtanNvbndwUGF5bG9hZC5zdGF0dXMuc2hvdWxkLmV4aXN0O1xuICAgICAgbWpzb253cFBheWxvYWQudmFsdWUuc2hvdWxkLmVxbChjYXBzKTtcbiAgICAgIHNob3VsZC5ub3QuZXhpc3QodzNjUGF5bG9hZC5zZXNzaW9uSWQpO1xuICAgICAgc2hvdWxkLm5vdC5leGlzdCh3M2NQYXlsb2FkLnN0YXR1cyk7XG4gICAgICB3M2NQYXlsb2FkLnZhbHVlLnNob3VsZC5lcWwoY2Fwcyk7XG5cbiAgICAgIC8vIEVuZCBzZXNzaW9uXG4gICAgICBhd2FpdCByZXF1ZXN0LmRlbGV0ZSh7dXJsOiBgJHtiYXNlVXJsfS8ke21qc29ud3BTZXNzSWR9YH0pO1xuICAgICAgYXdhaXQgcmVxdWVzdC5kZWxldGUoe3VybDogYCR7YmFzZVVybH0vJHt3M2NTZXNzSWR9YH0pO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuXG5kZXNjcmliZSgnTG9nc2luaycsIGZ1bmN0aW9uICgpIHtcbiAgbGV0IHNlcnZlciA9IG51bGw7XG4gIGxldCBsb2dzID0gW107XG4gIGxldCBsb2dIYW5kbGVyID0gZnVuY3Rpb24gKGxldmVsLCBtZXNzYWdlKSB7XG4gICAgbG9ncy5wdXNoKFtsZXZlbCwgbWVzc2FnZV0pO1xuICB9O1xuICBsZXQgYXJncyA9IHtwb3J0OiBURVNUX1BPUlQsIGhvc3Q6IFRFU1RfSE9TVCwgbG9nSGFuZGxlcn07XG5cbiAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBzZXJ2ZXIgPSBhd2FpdCBhcHBpdW1TZXJ2ZXIoYXJncyk7XG4gIH0pO1xuXG4gIGFmdGVyKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBzZXJ2ZXIuY2xvc2UoKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBzZW5kIGxvZ3MgdG8gYSBsb2dIYW5kbGVyIHBhc3NlZCBpbiBieSBhIHBhcmVudCBwYWNrYWdlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxvZ3MubGVuZ3RoLnNob3VsZC5iZS5hYm92ZSgxKTtcbiAgICBsZXQgd2VsY29tZUluZGV4ID0gbG9nc1swXVsxXS5pbmNsdWRlcygndmVyc2lvbnMgb2Ygbm9kZScpID8gMSA6IDA7XG4gICAgbG9nc1t3ZWxjb21lSW5kZXhdLmxlbmd0aC5zaG91bGQuZXF1YWwoMik7XG4gICAgbG9nc1t3ZWxjb21lSW5kZXhdWzFdLnNob3VsZC5pbmNsdWRlKFwiV2VsY29tZSB0byBBcHBpdW1cIik7XG4gIH0pO1xuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
