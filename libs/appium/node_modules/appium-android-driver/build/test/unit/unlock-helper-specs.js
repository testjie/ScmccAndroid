'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _appiumTestSupport = require('appium-test-support');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _libUnlockHelpers = require('../../lib/unlock-helpers');

var _libUnlockHelpers2 = _interopRequireDefault(_libUnlockHelpers);

var _libDriver = require('../../lib/driver');

var _libDriver2 = _interopRequireDefault(_libDriver);

var _asyncbox = require('asyncbox');

var asyncbox = _interopRequireWildcard(_asyncbox);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var KEYCODE_NUMPAD_ENTER = "66";
var INPUT_KEYS_WAIT_TIME = 100;
var HIDE_KEYBOARD_WAIT_TIME = 100;
var UNLOCK_WAIT_TIME = 100;

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('Unlock Helpers', function () {
  var adb = new _appiumAdb2['default']();
  var driver = new _libDriver2['default']();
  var sandbox = _sinon2['default'].sandbox.create();
  var expect = _chai2['default'].expect;
  describe('isValidUnlockType', function () {
    it('should verify the unlock types', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            _libUnlockHelpers2['default'].isValidUnlockType('pin').should.equal(true);
            _libUnlockHelpers2['default'].isValidUnlockType('pattern').should.equal(true);
            _libUnlockHelpers2['default'].isValidUnlockType('password').should.equal(true);
            _libUnlockHelpers2['default'].isValidUnlockType('fingerprint').should.equal(true);
            _libUnlockHelpers2['default'].isValidUnlockType('telepathy').should.equal(false);

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('isValidKey', function () {
    it('should verify the unlock keys for each type', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            _libUnlockHelpers2['default'].isValidKey('pin').should.equal(false);
            _libUnlockHelpers2['default'].isValidKey('pin', ' ').should.equal(false);
            _libUnlockHelpers2['default'].isValidKey('pin', '1111').should.equal(true);
            _libUnlockHelpers2['default'].isValidKey('pin', '1abc').should.equal(false);
            _libUnlockHelpers2['default'].isValidKey('fingerprint').should.equal(false);
            _libUnlockHelpers2['default'].isValidKey('fingerprint', ' ').should.equal(false);
            _libUnlockHelpers2['default'].isValidKey('fingerprint', '1111').should.equal(true);
            _libUnlockHelpers2['default'].isValidKey('fingerprint', '1abc').should.equal(false);
            _libUnlockHelpers2['default'].isValidKey('pattern', '1').should.equal(false);
            _libUnlockHelpers2['default'].isValidKey('pattern', '1234').should.equal(true);
            _libUnlockHelpers2['default'].isValidKey('pattern', '123456789').should.equal(true);
            _libUnlockHelpers2['default'].isValidKey('pattern', '01234').should.equal(false);
            _libUnlockHelpers2['default'].isValidKey('pattern').should.equal(false);
            _libUnlockHelpers2['default'].isValidKey('pattern', ' ').should.equal(false);
            _libUnlockHelpers2['default'].isValidKey('pattern', '1abc').should.equal(false);
            _libUnlockHelpers2['default'].isValidKey('pattern', '1213').should.equal(false);
            _libUnlockHelpers2['default'].isValidKey('password', '121c3').should.equal(true);
            _libUnlockHelpers2['default'].isValidKey('password', 'appium').should.equal(true);
            _libUnlockHelpers2['default'].isValidKey('password', 'appium-android-driver').should.equal(true);
            _libUnlockHelpers2['default'].isValidKey('password', '@#$%&-+()*"\':;!?,_ ./~`|={}\\[]').should.equal(true);
            _libUnlockHelpers2['default'].isValidKey('password', '123').should.equal(false);
            _libUnlockHelpers2['default'].isValidKey('password').should.equal(false);
            _libUnlockHelpers2['default'].isValidKey('password', '   ').should.equal(false);

          case 23:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should throw error if unlock type is invalid', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            expect(function () {
              return _libUnlockHelpers2['default'].isValidKey('invalid_unlock_type', '1');
            }).to['throw']('Invalid unlock type');

          case 1:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('dismissKeyguard', (0, _appiumTestSupport.withMocks)({ driver: driver, adb: adb, asyncbox: asyncbox, helpers: _libUnlockHelpers2['default'] }, function (mocks) {
    it('should hide keyboard if keyboard is snown', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.driver.expects('isKeyboardShown').returns(true);
            mocks.driver.expects('hideKeyboard').once();
            mocks.asyncbox.expects('sleep').withExactArgs(HIDE_KEYBOARD_WAIT_TIME).once();
            mocks.adb.expects('shell').once();
            mocks.adb.expects('back').once();
            mocks.adb.expects('getApiLevel').returns(20);
            mocks.helpers.expects('swipeUp').once();
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(_libUnlockHelpers2['default'].dismissKeyguard(driver, adb));

          case 9:
            mocks.driver.verify();
            mocks.asyncbox.verify();
            mocks.helpers.verify();

          case 12:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should dismiss notifications and dissmiss keyguard via swipping up', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.driver.expects('isKeyboardShown').returns(false);
            mocks.adb.expects('shell').withExactArgs(["service", "call", "notification", "1"]).once();
            mocks.adb.expects('back').once();
            mocks.adb.expects('getApiLevel').returns(21);
            mocks.helpers.expects('swipeUp').withExactArgs(driver).once();
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(_libUnlockHelpers2['default'].dismissKeyguard(driver, adb));

          case 7:
            mocks.driver.verify();
            mocks.adb.verify();
            mocks.helpers.verify();

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should dissmiss keyguard via dismiss-keyguard shell command if API level > 21', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.driver.expects('isKeyboardShown').returns(false);
            mocks.adb.expects('shell').onCall(0).returns('');
            mocks.adb.expects('back').once();
            mocks.adb.expects('getApiLevel').returns(22);
            mocks.adb.expects('shell').withExactArgs(["wm", "dismiss-keyguard"]).once();
            mocks.helpers.expects('swipeUp').never();
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(_libUnlockHelpers2['default'].dismissKeyguard(driver, adb));

          case 8:
            mocks.driver.verify();
            mocks.adb.verify();
            mocks.helpers.verify();

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  }));
  describe('swipeUp', (0, _appiumTestSupport.withMocks)({ driver: driver, helpers: _libUnlockHelpers2['default'] }, function (mocks) {
    it('should perform swipe up touch action', function callee$2$0() {
      var windowSize, actions;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            windowSize = { x: 475, y: 800 };
            actions = [{ action: 'press', options: { element: null, x: 237, y: 790 } }, { action: 'moveTo', options: { element: null, x: 237, y: 100 } }, { action: 'release' }];

            mocks.driver.expects('getWindowSize').returns(windowSize);
            mocks.driver.expects('performTouch').withExactArgs(actions).once;
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(_libUnlockHelpers2['default'].swipeUp(driver));

          case 6:
            mocks.driver.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  }));
  describe('encodePassword', function () {
    it('should verify the password with blank space is encoded', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            _libUnlockHelpers2['default'].encodePassword('a p p i u m').should.equal("a%sp%sp%si%su%sm");
            _libUnlockHelpers2['default'].encodePassword('   ').should.equal("%s%s%s");

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('stringKeyToArr', function () {
    it('should cast string keys to array', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            _libUnlockHelpers2['default'].stringKeyToArr('1234').should.eql(['1', '2', '3', '4']);
            _libUnlockHelpers2['default'].stringKeyToArr(' 1234 ').should.eql(['1', '2', '3', '4']);
            _libUnlockHelpers2['default'].stringKeyToArr('1 2 3 4').should.eql(['1', '2', '3', '4']);
            _libUnlockHelpers2['default'].stringKeyToArr('1  2  3  4').should.eql(['1', '2', '3', '4']);

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('fingerprintUnlock', (0, _appiumTestSupport.withMocks)({ adb: adb, asyncbox: asyncbox }, function (mocks) {
    it('should be able to unlock device via fingerprint if API level >= 23', function callee$2$0() {
      var caps;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = { unlockKey: '123' };

            mocks.adb.expects('getApiLevel').returns(23);
            mocks.adb.expects('fingerprint').withExactArgs(caps.unlockKey).once();
            mocks.asyncbox.expects('sleep').withExactArgs(UNLOCK_WAIT_TIME).once();
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(_libUnlockHelpers2['default'].fingerprintUnlock(adb, driver, caps).should.be.fulfilled);

          case 6:
            mocks.adb.verify();
            mocks.asyncbox.verify();

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should throw error if API level < 23', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getApiLevel').returns(22);
            mocks.adb.expects('fingerprint').never();
            mocks.asyncbox.expects('sleep').never();
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(_libUnlockHelpers2['default'].fingerprintUnlock(adb).should.eventually.be.rejectedWith('only works for Android 6+'));

          case 5:
            mocks.adb.verify();
            mocks.asyncbox.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  }));
  describe('pinUnlock', (0, _appiumTestSupport.withMocks)({ adb: adb, helpers: _libUnlockHelpers2['default'], driver: driver, asyncbox: asyncbox }, function (mocks) {
    var caps = { unlockKey: '13579' };
    var keys = ['1', '3', '5', '7', '9'];
    var els = [{ ELEMENT: 1 }, { ELEMENT: 2 }, { ELEMENT: 3 }, { ELEMENT: 4 }, { ELEMENT: 5 }, { ELEMENT: 6 }, { ELEMENT: 7 }, { ELEMENT: 8 }, { ELEMENT: 9 }];
    afterEach(function () {
      sandbox.restore();
    });
    it('should be able to unlock device using pin (API level >= 21)', function callee$2$0() {
      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, e;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.helpers.expects('dismissKeyguard').once();
            mocks.helpers.expects('stringKeyToArr').returns(keys);
            mocks.adb.expects('getApiLevel').returns(21);
            mocks.driver.expects('findElOrEls').withExactArgs("id", "com.android.systemui:id/digit_text", true).returns(els);
            mocks.driver.expects('findElOrEls').withExactArgs("id", "com.android.systemui:id/key_enter", false).returns({ ELEMENT: 100 });
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            context$3$0.prev = 8;
            for (_iterator = _getIterator(els); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              e = _step.value;

              mocks.driver.expects('getAttribute').withExactArgs('text', e.ELEMENT).returns(e.ELEMENT.toString());
            }
            context$3$0.next = 16;
            break;

          case 12:
            context$3$0.prev = 12;
            context$3$0.t0 = context$3$0['catch'](8);
            _didIteratorError = true;
            _iteratorError = context$3$0.t0;

          case 16:
            context$3$0.prev = 16;
            context$3$0.prev = 17;

            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }

          case 19:
            context$3$0.prev = 19;

            if (!_didIteratorError) {
              context$3$0.next = 22;
              break;
            }

            throw _iteratorError;

          case 22:
            return context$3$0.finish(19);

          case 23:
            return context$3$0.finish(16);

          case 24:
            mocks.asyncbox.expects('sleep').withExactArgs(UNLOCK_WAIT_TIME).once();
            sandbox.stub(driver, 'click');

            context$3$0.next = 28;
            return _regeneratorRuntime.awrap(_libUnlockHelpers2['default'].pinUnlock(adb, driver, caps));

          case 28:

            driver.click.getCall(0).args[0].should.equal(1);
            driver.click.getCall(1).args[0].should.equal(3);
            driver.click.getCall(2).args[0].should.equal(5);
            driver.click.getCall(3).args[0].should.equal(7);
            driver.click.getCall(4).args[0].should.equal(9);
            driver.click.getCall(5).args[0].should.equal(100);

            mocks.helpers.verify();
            mocks.driver.verify();
            mocks.adb.verify();
            mocks.asyncbox.verify();

          case 38:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this, [[8, 12, 16, 24], [17,, 19, 23]]);
    });
    it('should be able to unlock device using pin (API level < 21)', function callee$2$0() {
      var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, pin;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.helpers.expects('dismissKeyguard').once();
            mocks.helpers.expects('stringKeyToArr').returns(keys);
            mocks.adb.expects('getApiLevel').returns(20);
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            context$3$0.prev = 6;
            for (_iterator2 = _getIterator(keys); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              pin = _step2.value;

              mocks.driver.expects('findElOrEls').withExactArgs("id", 'com.android.keyguard:id/key' + pin, false).returns({ ELEMENT: parseInt(pin, 10) });
            }
            context$3$0.next = 14;
            break;

          case 10:
            context$3$0.prev = 10;
            context$3$0.t0 = context$3$0['catch'](6);
            _didIteratorError2 = true;
            _iteratorError2 = context$3$0.t0;

          case 14:
            context$3$0.prev = 14;
            context$3$0.prev = 15;

            if (!_iteratorNormalCompletion2 && _iterator2['return']) {
              _iterator2['return']();
            }

          case 17:
            context$3$0.prev = 17;

            if (!_didIteratorError2) {
              context$3$0.next = 20;
              break;
            }

            throw _iteratorError2;

          case 20:
            return context$3$0.finish(17);

          case 21:
            return context$3$0.finish(14);

          case 22:
            mocks.driver.expects('findElOrEls').withExactArgs("id", "com.android.keyguard:id/key_enter", false).returns({ ELEMENT: 100 });
            mocks.asyncbox.expects('sleep').withExactArgs(UNLOCK_WAIT_TIME).once();
            sandbox.stub(driver, 'click');

            context$3$0.next = 27;
            return _regeneratorRuntime.awrap(_libUnlockHelpers2['default'].pinUnlock(adb, driver, caps));

          case 27:

            driver.click.getCall(0).args[0].should.equal(1);
            driver.click.getCall(1).args[0].should.equal(3);
            driver.click.getCall(2).args[0].should.equal(5);
            driver.click.getCall(3).args[0].should.equal(7);
            driver.click.getCall(4).args[0].should.equal(9);
            driver.click.getCall(5).args[0].should.equal(100);

            mocks.helpers.verify();
            mocks.driver.verify();
            mocks.adb.verify();
            mocks.asyncbox.verify();

          case 37:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this, [[6, 10, 14, 22], [15,, 17, 21]]);
    });
    it('should throw error if pin buttons does not exist (API level >= 21)', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.helpers.expects('dismissKeyguard').once();
            mocks.helpers.expects('stringKeyToArr').once();
            mocks.adb.expects('getApiLevel').returns(21);
            mocks.driver.expects('findElOrEls').returns(null);
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(_libUnlockHelpers2['default'].pinUnlock(adb, driver, caps).should.eventually.be.rejectedWith('Error finding unlock pin buttons!'));

          case 6:
            mocks.helpers.verify();
            mocks.driver.verify();
            mocks.adb.verify();

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should throw error if pin buttons does not exist (API level < 21)', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.helpers.expects('dismissKeyguard').once();
            mocks.helpers.expects('stringKeyToArr').returns(keys);
            mocks.adb.expects('getApiLevel').returns(20);
            mocks.driver.expects('findElOrEls').withExactArgs('id', 'com.android.keyguard:id/key1', false).returns(null);
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(_libUnlockHelpers2['default'].pinUnlock(adb, driver, caps).should.eventually.be.rejectedWith('Error finding unlock pin \'1\' button!'));

          case 6:
            mocks.helpers.verify();
            mocks.driver.verify();
            mocks.adb.verify();

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  }));
  describe('passwordUnlock', (0, _appiumTestSupport.withMocks)({ adb: adb, helpers: _libUnlockHelpers2['default'], asyncbox: asyncbox }, function (mocks) {
    it('should be able to unlock device using password', function callee$2$0() {
      var caps;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = { unlockKey: 'psswrd' };

            mocks.helpers.expects('dismissKeyguard').withExactArgs(driver, adb).once();
            mocks.helpers.expects('encodePassword').withExactArgs(caps.unlockKey).returns(caps.unlockKey);
            mocks.adb.expects('shell').withExactArgs(['input', 'text', caps.unlockKey]).once();
            mocks.asyncbox.expects('sleep').withExactArgs(INPUT_KEYS_WAIT_TIME).once();
            mocks.adb.expects('shell').withExactArgs(['input', 'keyevent', KEYCODE_NUMPAD_ENTER]);
            mocks.asyncbox.expects('sleep').withExactArgs(UNLOCK_WAIT_TIME).once();
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(_libUnlockHelpers2['default'].passwordUnlock(adb, driver, caps));

          case 9:
            mocks.helpers.verify();
            mocks.adb.verify();
            mocks.asyncbox.verify();

          case 12:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  }));
  describe('getPatternKeyPosition', function () {
    it('should verify pattern pin is aproximatelly to its position', function callee$2$0() {
      var pins, cols, rows;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            pins = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (pin) {
              return _libUnlockHelpers2['default'].getPatternKeyPosition(pin, { x: 33, y: 323 }, 137.6);
            });
            cols = [101, 238, 375];
            rows = [391, 528, 665];

            expect(pins[0].x).to.be.within(cols[0] - 5, cols[0] + 5);
            expect(pins[1].x).to.be.within(cols[1] - 5, cols[1] + 5);
            expect(pins[2].x).to.be.within(cols[2] - 5, cols[2] + 5);
            expect(pins[3].x).to.be.within(cols[0] - 5, cols[0] + 5);
            expect(pins[4].x).to.be.within(cols[1] - 5, cols[1] + 5);
            expect(pins[5].x).to.be.within(cols[2] - 5, cols[2] + 5);
            expect(pins[6].x).to.be.within(cols[0] - 5, cols[0] + 5);
            expect(pins[7].x).to.be.within(cols[1] - 5, cols[1] + 5);
            expect(pins[8].x).to.be.within(cols[2] - 5, cols[2] + 5);
            expect(pins[0].y).to.be.within(rows[0] - 5, rows[0] + 5);
            expect(pins[1].y).to.be.within(rows[0] - 5, rows[0] + 5);
            expect(pins[2].y).to.be.within(rows[0] - 5, rows[0] + 5);
            expect(pins[3].y).to.be.within(rows[1] - 5, rows[1] + 5);
            expect(pins[4].y).to.be.within(rows[1] - 5, rows[1] + 5);
            expect(pins[5].y).to.be.within(rows[1] - 5, rows[1] + 5);
            expect(pins[6].y).to.be.within(rows[2] - 5, rows[2] + 5);
            expect(pins[7].y).to.be.within(rows[2] - 5, rows[2] + 5);
            expect(pins[8].y).to.be.within(rows[2] - 5, rows[2] + 5);

          case 21:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('getPatternActions', function () {
    it('should generate press, moveTo, relase gesture scheme to unlock by pattern', function callee$2$0() {
      var keys, actions;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
            actions = _libUnlockHelpers2['default'].getPatternActions(keys, { x: 0, y: 0 }, 1);

            actions.map(function (action, i) {
              if (i === 0) {
                action.action.should.equal('press');
              } else if (i === keys.length) {
                action.action.should.equal('release');
              } else {
                action.action.should.equal('moveTo');
              }
            });

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should verify pattern gestures moves to non consecutives pins', function callee$2$0() {
      var keys, actions;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            keys = ["7", "2", "9", "8", "5", "6", "1", "4", "3"];
            actions = _libUnlockHelpers2['default'].getPatternActions(keys, { x: 0, y: 0 }, 1);

            // Move from pin 7 to pin 2
            actions[1].options.x.should.equal(1);
            actions[1].options.y.should.equal(-2);
            // Move from pin 2 to pin 9
            actions[2].options.x.should.equal(1);
            actions[2].options.y.should.equal(2);
            // Move from pin 9 to pin 8
            actions[3].options.x.should.equal(-1);
            actions[3].options.y.should.equal(0);
            // Move from pin 8 to pin 5
            actions[4].options.x.should.equal(0);
            actions[4].options.y.should.equal(-1);
            // Move from pin 5 to pin 6
            actions[5].options.x.should.equal(1);
            actions[5].options.y.should.equal(0);
            // Move from pin 6 to pin 1
            actions[6].options.x.should.equal(-2);
            actions[6].options.y.should.equal(-1);
            // Move from pin 1 to pin 4
            actions[7].options.x.should.equal(0);
            actions[7].options.y.should.equal(1);
            // Move from pin 4 to pin 3
            actions[8].options.x.should.equal(2);
            actions[8].options.y.should.equal(-1);

          case 18:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('patternUnlock', (0, _appiumTestSupport.withMocks)({ driver: driver, helpers: _libUnlockHelpers2['default'], adb: adb, asyncbox: asyncbox }, function (mocks) {
    var el = { ELEMENT: 1 };
    var pos = { x: 10, y: 20 };
    var size = { width: 300 };
    var keys = ['1', '3', '5', '7', '9'];
    var caps = { unlockKey: '13579' };
    beforeEach(function () {
      mocks.helpers.expects('dismissKeyguard').withExactArgs(driver, adb).once();
      mocks.helpers.expects('stringKeyToArr').returns(keys);
      mocks.driver.expects('getLocation').withExactArgs(el.ELEMENT).returns(pos);
      mocks.driver.expects('getSize').withExactArgs(el.ELEMENT).returns(size);
      mocks.helpers.expects('getPatternActions').withExactArgs(keys, pos, 100).returns('actions');
      mocks.driver.expects('performTouch').withExactArgs('actions').once();
      mocks.asyncbox.expects('sleep').withExactArgs(UNLOCK_WAIT_TIME).once();
    });
    it('should be able to unlock device using pattern (API level >= 21)', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getApiLevel').returns(21);
            mocks.driver.expects('findElOrEls').withExactArgs('id', 'com.android.systemui:id/lockPatternView', false).returns(el);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libUnlockHelpers2['default'].patternUnlock(adb, driver, caps));

          case 4:
            mocks.helpers.verify();
            mocks.driver.verify();
            mocks.asyncbox.verify();
            mocks.adb.verify();

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should be able to unlock device using pattern (API level < 21)', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getApiLevel').returns(20);
            mocks.driver.expects('findElOrEls').withExactArgs('id', 'com.android.keyguard:id/lockPatternView', false).returns(el);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libUnlockHelpers2['default'].patternUnlock(adb, driver, caps));

          case 4:
            mocks.helpers.verify();
            mocks.driver.verify();
            mocks.asyncbox.verify();
            mocks.adb.verify();

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  }));
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC91bmxvY2staGVscGVyLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O2lDQUNuQixxQkFBcUI7O3FCQUM3QixPQUFPOzs7O2dDQUNMLDBCQUEwQjs7Ozt5QkFDcEIsa0JBQWtCOzs7O3dCQUNsQixVQUFVOztJQUF4QixRQUFROzt5QkFDSixZQUFZOzs7O0FBRTVCLElBQU0sb0JBQW9CLEdBQUcsSUFBSSxDQUFDO0FBQ2xDLElBQU0sb0JBQW9CLEdBQUcsR0FBRyxDQUFDO0FBQ2pDLElBQU0sdUJBQXVCLEdBQUcsR0FBRyxDQUFDO0FBQ3BDLElBQU0sZ0JBQWdCLEdBQUcsR0FBRyxDQUFDOztBQUU3QixrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxZQUFZO0FBQ3JDLE1BQUksR0FBRyxHQUFHLDRCQUFTLENBQUM7QUFDcEIsTUFBSSxNQUFNLEdBQUcsNEJBQW1CLENBQUM7QUFDakMsTUFBSSxPQUFPLEdBQUcsbUJBQU0sT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3JDLE1BQUksTUFBTSxHQUFHLGtCQUFLLE1BQU0sQ0FBQztBQUN6QixVQUFRLENBQUMsbUJBQW1CLEVBQUUsWUFBWTtBQUN4QyxNQUFFLENBQUMsZ0NBQWdDLEVBQUU7Ozs7QUFDbkMsMENBQVEsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwRCwwQ0FBUSxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3hELDBDQUFRLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekQsMENBQVEsaUJBQWlCLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM1RCwwQ0FBUSxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7O0tBQzVELENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztBQUNILFVBQVEsQ0FBQyxZQUFZLEVBQUcsWUFBWTtBQUNsQyxNQUFFLENBQUMsNkNBQTZDLEVBQUU7Ozs7QUFDaEQsMENBQVEsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDOUMsMENBQVEsVUFBVSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ25ELDBDQUFRLFVBQVUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyRCwwQ0FBUSxVQUFVLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdEQsMENBQVEsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdEQsMENBQVEsVUFBVSxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzNELDBDQUFRLFVBQVUsQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM3RCwwQ0FBUSxVQUFVLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDOUQsMENBQVEsVUFBVSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3ZELDBDQUFRLFVBQVUsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6RCwwQ0FBUSxVQUFVLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDOUQsMENBQVEsVUFBVSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzNELDBDQUFRLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2xELDBDQUFRLFVBQVUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN2RCwwQ0FBUSxVQUFVLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDMUQsMENBQVEsVUFBVSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzFELDBDQUFRLFVBQVUsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMzRCwwQ0FBUSxVQUFVLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDNUQsMENBQVEsVUFBVSxDQUFDLFVBQVUsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDM0UsMENBQVEsVUFBVSxDQUFDLFVBQVUsRUFBRSxrQ0FB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QUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3pELGtCQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3pELGtCQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3pELGtCQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3pELGtCQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3pELGtCQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3pELGtCQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3pELGtCQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3pELGtCQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3pELGtCQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3pELGtCQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3pELGtCQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3pELGtCQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3pELGtCQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3pELGtCQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3pELGtCQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3pELGtCQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOzs7Ozs7O0tBQzFELENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztBQUNILFVBQVEsQ0FBQyxtQkFBbUIsRUFBRSxZQUFZO0FBQ3hDLE1BQUUsQ0FBQywyRUFBMkUsRUFBRTtVQUMxRSxJQUFJLEVBQ0osT0FBTzs7OztBQURQLGdCQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztBQUNwRCxtQkFBTyxHQUFHLDhCQUFRLGlCQUFpQixDQUFDLElBQUksRUFBRSxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQzs7QUFDN0QsbUJBQU8sQ0FBQyxHQUFHLENBQUMsVUFBQyxNQUFNLEVBQUUsQ0FBQyxFQUFLO0FBQ3pCLGtCQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDWCxzQkFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2VBQ3JDLE1BQU0sSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUM1QixzQkFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2VBQ3ZDLE1BQU07QUFDTCxzQkFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2VBQ3RDO2FBQ0YsQ0FBQyxDQUFDOzs7Ozs7O0tBQ0osQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLCtEQUErRCxFQUFFO1VBQzlELElBQUksRUFDSixPQUFPOzs7O0FBRFAsZ0JBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO0FBQ3BELG1CQUFPLEdBQUcsOEJBQVEsaUJBQWlCLENBQUMsSUFBSSxFQUFFLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDOzs7QUFFN0QsbUJBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckMsbUJBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFdEMsbUJBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckMsbUJBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRXJDLG1CQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEMsbUJBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRXJDLG1CQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3JDLG1CQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRXRDLG1CQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FB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LENBQUM7QUFDdEIsaUJBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDeEIsaUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7S0FDcEIsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDLENBQUM7Q0FDTCxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC91bml0L3VubG9jay1oZWxwZXItc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCB7IHdpdGhNb2NrcyB9IGZyb20gJ2FwcGl1bS10ZXN0LXN1cHBvcnQnO1xuaW1wb3J0IHNpbm9uIGZyb20gJ3Npbm9uJztcbmltcG9ydCBoZWxwZXJzIGZyb20gJy4uLy4uL2xpYi91bmxvY2staGVscGVycyc7XG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLi9saWIvZHJpdmVyJztcbmltcG9ydCAqIGFzIGFzeW5jYm94IGZyb20gJ2FzeW5jYm94JztcbmltcG9ydCBBREIgZnJvbSAnYXBwaXVtLWFkYic7XG5cbmNvbnN0IEtFWUNPREVfTlVNUEFEX0VOVEVSID0gXCI2NlwiO1xuY29uc3QgSU5QVVRfS0VZU19XQUlUX1RJTUUgPSAxMDA7XG5jb25zdCBISURFX0tFWUJPQVJEX1dBSVRfVElNRSA9IDEwMDtcbmNvbnN0IFVOTE9DS19XQUlUX1RJTUUgPSAxMDA7XG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmRlc2NyaWJlKCdVbmxvY2sgSGVscGVycycsIGZ1bmN0aW9uICgpIHtcbiAgbGV0IGFkYiA9IG5ldyBBREIoKTtcbiAgbGV0IGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gIGxldCBzYW5kYm94ID0gc2lub24uc2FuZGJveC5jcmVhdGUoKTtcbiAgbGV0IGV4cGVjdCA9IGNoYWkuZXhwZWN0O1xuICBkZXNjcmliZSgnaXNWYWxpZFVubG9ja1R5cGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ3Nob3VsZCB2ZXJpZnkgdGhlIHVubG9jayB0eXBlcycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGhlbHBlcnMuaXNWYWxpZFVubG9ja1R5cGUoJ3BpbicpLnNob3VsZC5lcXVhbCh0cnVlKTtcbiAgICAgIGhlbHBlcnMuaXNWYWxpZFVubG9ja1R5cGUoJ3BhdHRlcm4nKS5zaG91bGQuZXF1YWwodHJ1ZSk7XG4gICAgICBoZWxwZXJzLmlzVmFsaWRVbmxvY2tUeXBlKCdwYXNzd29yZCcpLnNob3VsZC5lcXVhbCh0cnVlKTtcbiAgICAgIGhlbHBlcnMuaXNWYWxpZFVubG9ja1R5cGUoJ2ZpbmdlcnByaW50Jykuc2hvdWxkLmVxdWFsKHRydWUpO1xuICAgICAgaGVscGVycy5pc1ZhbGlkVW5sb2NrVHlwZSgndGVsZXBhdGh5Jykuc2hvdWxkLmVxdWFsKGZhbHNlKTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdpc1ZhbGlkS2V5JywgIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIHZlcmlmeSB0aGUgdW5sb2NrIGtleXMgZm9yIGVhY2ggdHlwZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGhlbHBlcnMuaXNWYWxpZEtleSgncGluJykuc2hvdWxkLmVxdWFsKGZhbHNlKTtcbiAgICAgIGhlbHBlcnMuaXNWYWxpZEtleSgncGluJywgJyAnKS5zaG91bGQuZXF1YWwoZmFsc2UpO1xuICAgICAgaGVscGVycy5pc1ZhbGlkS2V5KCdwaW4nLCAnMTExMScpLnNob3VsZC5lcXVhbCh0cnVlKTtcbiAgICAgIGhlbHBlcnMuaXNWYWxpZEtleSgncGluJywgJzFhYmMnKS5zaG91bGQuZXF1YWwoZmFsc2UpO1xuICAgICAgaGVscGVycy5pc1ZhbGlkS2V5KCdmaW5nZXJwcmludCcpLnNob3VsZC5lcXVhbChmYWxzZSk7XG4gICAgICBoZWxwZXJzLmlzVmFsaWRLZXkoJ2ZpbmdlcnByaW50JywgJyAnKS5zaG91bGQuZXF1YWwoZmFsc2UpO1xuICAgICAgaGVscGVycy5pc1ZhbGlkS2V5KCdmaW5nZXJwcmludCcsICcxMTExJykuc2hvdWxkLmVxdWFsKHRydWUpO1xuICAgICAgaGVscGVycy5pc1ZhbGlkS2V5KCdmaW5nZXJwcmludCcsICcxYWJjJykuc2hvdWxkLmVxdWFsKGZhbHNlKTtcbiAgICAgIGhlbHBlcnMuaXNWYWxpZEtleSgncGF0dGVybicsICcxJykuc2hvdWxkLmVxdWFsKGZhbHNlKTtcbiAgICAgIGhlbHBlcnMuaXNWYWxpZEtleSgncGF0dGVybicsICcxMjM0Jykuc2hvdWxkLmVxdWFsKHRydWUpO1xuICAgICAgaGVscGVycy5pc1ZhbGlkS2V5KCdwYXR0ZXJuJywgJzEyMzQ1Njc4OScpLnNob3VsZC5lcXVhbCh0cnVlKTtcbiAgICAgIGhlbHBlcnMuaXNWYWxpZEtleSgncGF0dGVybicsICcwMTIzNCcpLnNob3VsZC5lcXVhbChmYWxzZSk7XG4gICAgICBoZWxwZXJzLmlzVmFsaWRLZXkoJ3BhdHRlcm4nKS5zaG91bGQuZXF1YWwoZmFsc2UpO1xuICAgICAgaGVscGVycy5pc1ZhbGlkS2V5KCdwYXR0ZXJuJywgJyAnKS5zaG91bGQuZXF1YWwoZmFsc2UpO1xuICAgICAgaGVscGVycy5pc1ZhbGlkS2V5KCdwYXR0ZXJuJywgJzFhYmMnKS5zaG91bGQuZXF1YWwoZmFsc2UpO1xuICAgICAgaGVscGVycy5pc1ZhbGlkS2V5KCdwYXR0ZXJuJywgJzEyMTMnKS5zaG91bGQuZXF1YWwoZmFsc2UpO1xuICAgICAgaGVscGVycy5pc1ZhbGlkS2V5KCdwYXNzd29yZCcsICcxMjFjMycpLnNob3VsZC5lcXVhbCh0cnVlKTtcbiAgICAgIGhlbHBlcnMuaXNWYWxpZEtleSgncGFzc3dvcmQnLCAnYXBwaXVtJykuc2hvdWxkLmVxdWFsKHRydWUpO1xuICAgICAgaGVscGVycy5pc1ZhbGlkS2V5KCdwYXNzd29yZCcsICdhcHBpdW0tYW5kcm9pZC1kcml2ZXInKS5zaG91bGQuZXF1YWwodHJ1ZSk7XG4gICAgICBoZWxwZXJzLmlzVmFsaWRLZXkoJ3Bhc3N3b3JkJywgJ0AjJCUmLSsoKSpcIlxcJzo7IT8sXyAuL35gfD17fVxcXFxbXScpLnNob3VsZC5lcXVhbCh0cnVlKTtcbiAgICAgIGhlbHBlcnMuaXNWYWxpZEtleSgncGFzc3dvcmQnLCAnMTIzJykuc2hvdWxkLmVxdWFsKGZhbHNlKTtcbiAgICAgIGhlbHBlcnMuaXNWYWxpZEtleSgncGFzc3dvcmQnKS5zaG91bGQuZXF1YWwoZmFsc2UpO1xuICAgICAgaGVscGVycy5pc1ZhbGlkS2V5KCdwYXNzd29yZCcsICcgICAnKS5zaG91bGQuZXF1YWwoZmFsc2UpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgdGhyb3cgZXJyb3IgaWYgdW5sb2NrIHR5cGUgaXMgaW52YWxpZCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGV4cGVjdCgoKSA9PiBoZWxwZXJzLmlzVmFsaWRLZXkoJ2ludmFsaWRfdW5sb2NrX3R5cGUnLCAnMScpKVxuICAgICAgICAudG8udGhyb3coJ0ludmFsaWQgdW5sb2NrIHR5cGUnKTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdkaXNtaXNzS2V5Z3VhcmQnLCB3aXRoTW9ja3Moe2RyaXZlciwgIGFkYiwgYXN5bmNib3gsIGhlbHBlcnN9LCAobW9ja3MpID0+IHtcbiAgICBpdCgnc2hvdWxkIGhpZGUga2V5Ym9hcmQgaWYga2V5Ym9hcmQgaXMgc25vd24nLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBtb2Nrcy5kcml2ZXIuZXhwZWN0cygnaXNLZXlib2FyZFNob3duJykucmV0dXJucyh0cnVlKTtcbiAgICAgIG1vY2tzLmRyaXZlci5leHBlY3RzKCdoaWRlS2V5Ym9hcmQnKS5vbmNlKCk7XG4gICAgICBtb2Nrcy5hc3luY2JveC5leHBlY3RzKCdzbGVlcCcpLndpdGhFeGFjdEFyZ3MoSElERV9LRVlCT0FSRF9XQUlUX1RJTUUpLm9uY2UoKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpLm9uY2UoKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdiYWNrJykub25jZSgpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldEFwaUxldmVsJykucmV0dXJucygyMCk7XG4gICAgICBtb2Nrcy5oZWxwZXJzLmV4cGVjdHMoJ3N3aXBlVXAnKS5vbmNlKCk7XG4gICAgICBhd2FpdCBoZWxwZXJzLmRpc21pc3NLZXlndWFyZChkcml2ZXIsIGFkYik7XG4gICAgICBtb2Nrcy5kcml2ZXIudmVyaWZ5KCk7XG4gICAgICBtb2Nrcy5hc3luY2JveC52ZXJpZnkoKTtcbiAgICAgIG1vY2tzLmhlbHBlcnMudmVyaWZ5KCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBkaXNtaXNzIG5vdGlmaWNhdGlvbnMgYW5kIGRpc3NtaXNzIGtleWd1YXJkIHZpYSBzd2lwcGluZyB1cCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIG1vY2tzLmRyaXZlci5leHBlY3RzKCdpc0tleWJvYXJkU2hvd24nKS5yZXR1cm5zKGZhbHNlKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpXG4gICAgICAgIC53aXRoRXhhY3RBcmdzKFtcInNlcnZpY2VcIiwgXCJjYWxsXCIsIFwibm90aWZpY2F0aW9uXCIsIFwiMVwiXSkub25jZSgpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2JhY2snKS5vbmNlKCk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0QXBpTGV2ZWwnKS5yZXR1cm5zKDIxKTtcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cygnc3dpcGVVcCcpLndpdGhFeGFjdEFyZ3MoZHJpdmVyKS5vbmNlKCk7XG4gICAgICBhd2FpdCBoZWxwZXJzLmRpc21pc3NLZXlndWFyZChkcml2ZXIsIGFkYik7XG4gICAgICBtb2Nrcy5kcml2ZXIudmVyaWZ5KCk7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgICBtb2Nrcy5oZWxwZXJzLnZlcmlmeSgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgZGlzc21pc3Mga2V5Z3VhcmQgdmlhIGRpc21pc3Mta2V5Z3VhcmQgc2hlbGwgY29tbWFuZCBpZiBBUEkgbGV2ZWwgPiAyMScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIG1vY2tzLmRyaXZlci5leHBlY3RzKCdpc0tleWJvYXJkU2hvd24nKS5yZXR1cm5zKGZhbHNlKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpLm9uQ2FsbCgwKS5yZXR1cm5zKCcnKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdiYWNrJykub25jZSgpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldEFwaUxldmVsJykucmV0dXJucygyMik7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2hlbGwnKS53aXRoRXhhY3RBcmdzKFtcIndtXCIsIFwiZGlzbWlzcy1rZXlndWFyZFwiXSkub25jZSgpO1xuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKCdzd2lwZVVwJykubmV2ZXIoKTtcbiAgICAgIGF3YWl0IGhlbHBlcnMuZGlzbWlzc0tleWd1YXJkKGRyaXZlciwgYWRiKTtcbiAgICAgIG1vY2tzLmRyaXZlci52ZXJpZnkoKTtcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICAgIG1vY2tzLmhlbHBlcnMudmVyaWZ5KCk7XG4gICAgfSk7XG4gIH0pKTtcbiAgZGVzY3JpYmUoJ3N3aXBlVXAnLCB3aXRoTW9ja3Moe2RyaXZlciwgaGVscGVyc30sIChtb2NrcykgPT4ge1xuICAgIGl0KCdzaG91bGQgcGVyZm9ybSBzd2lwZSB1cCB0b3VjaCBhY3Rpb24nLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgd2luZG93U2l6ZSA9IHt4OiA0NzUsIHk6IDgwMH07XG4gICAgICBsZXQgYWN0aW9ucyA9IFtcbiAgICAgICAge2FjdGlvbjogJ3ByZXNzJywgb3B0aW9uczoge2VsZW1lbnQ6IG51bGwsIHg6IDIzNywgeTogNzkwfX0sXG4gICAgICAgIHthY3Rpb246ICdtb3ZlVG8nLCBvcHRpb25zOiB7ZWxlbWVudDogbnVsbCwgeDogMjM3LCB5OiAxMDB9fSxcbiAgICAgICAge2FjdGlvbjogJ3JlbGVhc2UnfVxuICAgICAgXTtcbiAgICAgIG1vY2tzLmRyaXZlci5leHBlY3RzKCdnZXRXaW5kb3dTaXplJykucmV0dXJucyh3aW5kb3dTaXplKTtcbiAgICAgIG1vY2tzLmRyaXZlci5leHBlY3RzKCdwZXJmb3JtVG91Y2gnKS53aXRoRXhhY3RBcmdzKGFjdGlvbnMpLm9uY2U7XG4gICAgICBhd2FpdCBoZWxwZXJzLnN3aXBlVXAoZHJpdmVyKTtcbiAgICAgIG1vY2tzLmRyaXZlci52ZXJpZnkoKTtcbiAgICB9KTtcbiAgfSkpO1xuICBkZXNjcmliZSgnZW5jb2RlUGFzc3dvcmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ3Nob3VsZCB2ZXJpZnkgdGhlIHBhc3N3b3JkIHdpdGggYmxhbmsgc3BhY2UgaXMgZW5jb2RlZCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGhlbHBlcnMuZW5jb2RlUGFzc3dvcmQoJ2EgcCBwIGkgdSBtJykuc2hvdWxkLmVxdWFsKFwiYSVzcCVzcCVzaSVzdSVzbVwiKTtcbiAgICAgIGhlbHBlcnMuZW5jb2RlUGFzc3dvcmQoJyAgICcpLnNob3VsZC5lcXVhbChcIiVzJXMlc1wiKTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdzdHJpbmdLZXlUb0FycicsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIGNhc3Qgc3RyaW5nIGtleXMgdG8gYXJyYXknLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBoZWxwZXJzLnN0cmluZ0tleVRvQXJyKCcxMjM0Jykuc2hvdWxkLmVxbChbJzEnLCAnMicsICczJywgJzQnXSk7XG4gICAgICBoZWxwZXJzLnN0cmluZ0tleVRvQXJyKCcgMTIzNCAnKS5zaG91bGQuZXFsKFsnMScsICcyJywgJzMnLCAnNCddKTtcbiAgICAgIGhlbHBlcnMuc3RyaW5nS2V5VG9BcnIoJzEgMiAzIDQnKS5zaG91bGQuZXFsKFsnMScsICcyJywgJzMnLCAnNCddKTtcbiAgICAgIGhlbHBlcnMuc3RyaW5nS2V5VG9BcnIoJzEgIDIgIDMgIDQnKS5zaG91bGQuZXFsKFsnMScsICcyJywgJzMnLCAnNCddKTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdmaW5nZXJwcmludFVubG9jaycsIHdpdGhNb2Nrcyh7YWRiLCBhc3luY2JveH0sIChtb2NrcykgPT4ge1xuICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byB1bmxvY2sgZGV2aWNlIHZpYSBmaW5nZXJwcmludCBpZiBBUEkgbGV2ZWwgPj0gMjMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgY2FwcyA9IHt1bmxvY2tLZXk6ICcxMjMnfTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXRBcGlMZXZlbCcpLnJldHVybnMoMjMpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2ZpbmdlcnByaW50Jykud2l0aEV4YWN0QXJncyhjYXBzLnVubG9ja0tleSkub25jZSgpO1xuICAgICAgbW9ja3MuYXN5bmNib3guZXhwZWN0cygnc2xlZXAnKS53aXRoRXhhY3RBcmdzKFVOTE9DS19XQUlUX1RJTUUpLm9uY2UoKTtcbiAgICAgIGF3YWl0IGhlbHBlcnMuZmluZ2VycHJpbnRVbmxvY2soYWRiLCBkcml2ZXIsIGNhcHMpLnNob3VsZC5iZS5mdWxmaWxsZWQ7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgICBtb2Nrcy5hc3luY2JveC52ZXJpZnkoKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHRocm93IGVycm9yIGlmIEFQSSBsZXZlbCA8IDIzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldEFwaUxldmVsJykucmV0dXJucygyMik7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZmluZ2VycHJpbnQnKS5uZXZlcigpO1xuICAgICAgbW9ja3MuYXN5bmNib3guZXhwZWN0cygnc2xlZXAnKS5uZXZlcigpO1xuICAgICAgYXdhaXQgaGVscGVycy5maW5nZXJwcmludFVubG9jayhhZGIpXG4gICAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoJ29ubHkgd29ya3MgZm9yIEFuZHJvaWQgNisnKTtcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICAgIG1vY2tzLmFzeW5jYm94LnZlcmlmeSgpO1xuICAgIH0pO1xuICB9KSk7XG4gIGRlc2NyaWJlKCdwaW5VbmxvY2snLCB3aXRoTW9ja3Moe2FkYiwgaGVscGVycywgZHJpdmVyLCBhc3luY2JveH0sIChtb2NrcykgPT4ge1xuICAgIGNvbnN0IGNhcHMgPSB7dW5sb2NrS2V5OiAnMTM1NzknfTtcbiAgICBjb25zdCBrZXlzID0gWycxJywgJzMnLCAnNScsICc3JywgJzknXTtcbiAgICBjb25zdCBlbHMgPSBbe0VMRU1FTlQ6IDF9LCB7RUxFTUVOVDogMn0sIHtFTEVNRU5UOiAzfSxcbiAgICAgICAgICAgICAgICAge0VMRU1FTlQ6IDR9LCB7RUxFTUVOVDogNX0sIHtFTEVNRU5UOiA2fSxcbiAgICAgICAgICAgICAgICAge0VMRU1FTlQ6IDd9LCB7RUxFTUVOVDogOH0sIHtFTEVNRU5UOiA5fV07XG4gICAgYWZ0ZXJFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHNhbmRib3gucmVzdG9yZSgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byB1bmxvY2sgZGV2aWNlIHVzaW5nIHBpbiAoQVBJIGxldmVsID49IDIxKScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cygnZGlzbWlzc0tleWd1YXJkJykub25jZSgpO1xuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKCdzdHJpbmdLZXlUb0FycicpLnJldHVybnMoa2V5cyk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0QXBpTGV2ZWwnKS5yZXR1cm5zKDIxKTtcbiAgICAgIG1vY2tzLmRyaXZlci5leHBlY3RzKCdmaW5kRWxPckVscycpXG4gICAgICAgIC53aXRoRXhhY3RBcmdzKFwiaWRcIiwgXCJjb20uYW5kcm9pZC5zeXN0ZW11aTppZC9kaWdpdF90ZXh0XCIsIHRydWUpXG4gICAgICAgIC5yZXR1cm5zKGVscyk7XG4gICAgICBtb2Nrcy5kcml2ZXIuZXhwZWN0cygnZmluZEVsT3JFbHMnKVxuICAgICAgICAud2l0aEV4YWN0QXJncyhcImlkXCIsIFwiY29tLmFuZHJvaWQuc3lzdGVtdWk6aWQva2V5X2VudGVyXCIsIGZhbHNlKVxuICAgICAgICAucmV0dXJucyh7RUxFTUVOVDogMTAwfSk7XG4gICAgICBmb3IgKGxldCBlIG9mIGVscykge1xuICAgICAgICBtb2Nrcy5kcml2ZXIuZXhwZWN0cygnZ2V0QXR0cmlidXRlJykud2l0aEV4YWN0QXJncygndGV4dCcsIGUuRUxFTUVOVClcbiAgICAgICAgICAucmV0dXJucyhlLkVMRU1FTlQudG9TdHJpbmcoKSk7XG4gICAgICB9XG4gICAgICBtb2Nrcy5hc3luY2JveC5leHBlY3RzKCdzbGVlcCcpLndpdGhFeGFjdEFyZ3MoVU5MT0NLX1dBSVRfVElNRSkub25jZSgpO1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2NsaWNrJyk7XG5cbiAgICAgIGF3YWl0IGhlbHBlcnMucGluVW5sb2NrKGFkYiwgZHJpdmVyLCBjYXBzKTtcblxuICAgICAgZHJpdmVyLmNsaWNrLmdldENhbGwoMCkuYXJnc1swXS5zaG91bGQuZXF1YWwoMSk7XG4gICAgICBkcml2ZXIuY2xpY2suZ2V0Q2FsbCgxKS5hcmdzWzBdLnNob3VsZC5lcXVhbCgzKTtcbiAgICAgIGRyaXZlci5jbGljay5nZXRDYWxsKDIpLmFyZ3NbMF0uc2hvdWxkLmVxdWFsKDUpO1xuICAgICAgZHJpdmVyLmNsaWNrLmdldENhbGwoMykuYXJnc1swXS5zaG91bGQuZXF1YWwoNyk7XG4gICAgICBkcml2ZXIuY2xpY2suZ2V0Q2FsbCg0KS5hcmdzWzBdLnNob3VsZC5lcXVhbCg5KTtcbiAgICAgIGRyaXZlci5jbGljay5nZXRDYWxsKDUpLmFyZ3NbMF0uc2hvdWxkLmVxdWFsKDEwMCk7XG5cbiAgICAgIG1vY2tzLmhlbHBlcnMudmVyaWZ5KCk7XG4gICAgICBtb2Nrcy5kcml2ZXIudmVyaWZ5KCk7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgICBtb2Nrcy5hc3luY2JveC52ZXJpZnkoKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gdW5sb2NrIGRldmljZSB1c2luZyBwaW4gKEFQSSBsZXZlbCA8IDIxKScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cygnZGlzbWlzc0tleWd1YXJkJykub25jZSgpO1xuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKCdzdHJpbmdLZXlUb0FycicpLnJldHVybnMoa2V5cyk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0QXBpTGV2ZWwnKS5yZXR1cm5zKDIwKTtcbiAgICAgIGZvciAobGV0IHBpbiBvZiBrZXlzKSB7XG4gICAgICAgIG1vY2tzLmRyaXZlci5leHBlY3RzKCdmaW5kRWxPckVscycpXG4gICAgICAgICAgLndpdGhFeGFjdEFyZ3MoXCJpZFwiLCBgY29tLmFuZHJvaWQua2V5Z3VhcmQ6aWQva2V5JHtwaW59YCwgZmFsc2UpXG4gICAgICAgICAgLnJldHVybnMoe0VMRU1FTlQ6IHBhcnNlSW50KHBpbiwgMTApfSk7XG4gICAgICB9XG4gICAgICBtb2Nrcy5kcml2ZXIuZXhwZWN0cygnZmluZEVsT3JFbHMnKVxuICAgICAgICAud2l0aEV4YWN0QXJncyhcImlkXCIsIFwiY29tLmFuZHJvaWQua2V5Z3VhcmQ6aWQva2V5X2VudGVyXCIsIGZhbHNlKVxuICAgICAgICAucmV0dXJucyh7RUxFTUVOVDogMTAwfSk7XG4gICAgICBtb2Nrcy5hc3luY2JveC5leHBlY3RzKCdzbGVlcCcpLndpdGhFeGFjdEFyZ3MoVU5MT0NLX1dBSVRfVElNRSkub25jZSgpO1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2NsaWNrJyk7XG5cbiAgICAgIGF3YWl0IGhlbHBlcnMucGluVW5sb2NrKGFkYiwgZHJpdmVyLCBjYXBzKTtcblxuICAgICAgZHJpdmVyLmNsaWNrLmdldENhbGwoMCkuYXJnc1swXS5zaG91bGQuZXF1YWwoMSk7XG4gICAgICBkcml2ZXIuY2xpY2suZ2V0Q2FsbCgxKS5hcmdzWzBdLnNob3VsZC5lcXVhbCgzKTtcbiAgICAgIGRyaXZlci5jbGljay5nZXRDYWxsKDIpLmFyZ3NbMF0uc2hvdWxkLmVxdWFsKDUpO1xuICAgICAgZHJpdmVyLmNsaWNrLmdldENhbGwoMykuYXJnc1swXS5zaG91bGQuZXF1YWwoNyk7XG4gICAgICBkcml2ZXIuY2xpY2suZ2V0Q2FsbCg0KS5hcmdzWzBdLnNob3VsZC5lcXVhbCg5KTtcbiAgICAgIGRyaXZlci5jbGljay5nZXRDYWxsKDUpLmFyZ3NbMF0uc2hvdWxkLmVxdWFsKDEwMCk7XG5cbiAgICAgIG1vY2tzLmhlbHBlcnMudmVyaWZ5KCk7XG4gICAgICBtb2Nrcy5kcml2ZXIudmVyaWZ5KCk7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgICBtb2Nrcy5hc3luY2JveC52ZXJpZnkoKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHRocm93IGVycm9yIGlmIHBpbiBidXR0b25zIGRvZXMgbm90IGV4aXN0IChBUEkgbGV2ZWwgPj0gMjEpJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKCdkaXNtaXNzS2V5Z3VhcmQnKS5vbmNlKCk7XG4gICAgICBtb2Nrcy5oZWxwZXJzLmV4cGVjdHMoJ3N0cmluZ0tleVRvQXJyJykub25jZSgpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldEFwaUxldmVsJykucmV0dXJucygyMSk7XG4gICAgICBtb2Nrcy5kcml2ZXIuZXhwZWN0cygnZmluZEVsT3JFbHMnKS5yZXR1cm5zKG51bGwpO1xuICAgICAgYXdhaXQgaGVscGVycy5waW5VbmxvY2soYWRiLCBkcml2ZXIsIGNhcHMpLnNob3VsZC5ldmVudHVhbGx5LmJlXG4gICAgICAgIC5yZWplY3RlZFdpdGgoJ0Vycm9yIGZpbmRpbmcgdW5sb2NrIHBpbiBidXR0b25zIScpO1xuICAgICAgbW9ja3MuaGVscGVycy52ZXJpZnkoKTtcbiAgICAgIG1vY2tzLmRyaXZlci52ZXJpZnkoKTtcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHRocm93IGVycm9yIGlmIHBpbiBidXR0b25zIGRvZXMgbm90IGV4aXN0IChBUEkgbGV2ZWwgPCAyMSknLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBtb2Nrcy5oZWxwZXJzLmV4cGVjdHMoJ2Rpc21pc3NLZXlndWFyZCcpLm9uY2UoKTtcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cygnc3RyaW5nS2V5VG9BcnInKS5yZXR1cm5zKGtleXMpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldEFwaUxldmVsJykucmV0dXJucygyMCk7XG4gICAgICBtb2Nrcy5kcml2ZXIuZXhwZWN0cygnZmluZEVsT3JFbHMnKVxuICAgICAgICAud2l0aEV4YWN0QXJncygnaWQnLCAnY29tLmFuZHJvaWQua2V5Z3VhcmQ6aWQva2V5MScsIGZhbHNlKVxuICAgICAgICAucmV0dXJucyhudWxsKTtcbiAgICAgIGF3YWl0IGhlbHBlcnMucGluVW5sb2NrKGFkYiwgZHJpdmVyLCBjYXBzKS5zaG91bGQuZXZlbnR1YWxseS5iZVxuICAgICAgICAucmVqZWN0ZWRXaXRoKGBFcnJvciBmaW5kaW5nIHVubG9jayBwaW4gJzEnIGJ1dHRvbiFgKTtcbiAgICAgIG1vY2tzLmhlbHBlcnMudmVyaWZ5KCk7XG4gICAgICBtb2Nrcy5kcml2ZXIudmVyaWZ5KCk7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgfSk7XG4gIH0pKTtcbiAgZGVzY3JpYmUoJ3Bhc3N3b3JkVW5sb2NrJywgd2l0aE1vY2tzKHthZGIsIGhlbHBlcnMsIGFzeW5jYm94fSwgKG1vY2tzKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIHVubG9jayBkZXZpY2UgdXNpbmcgcGFzc3dvcmQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgY2FwcyA9IHt1bmxvY2tLZXk6ICdwc3N3cmQnfTtcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cygnZGlzbWlzc0tleWd1YXJkJykud2l0aEV4YWN0QXJncyhkcml2ZXIsIGFkYikub25jZSgpO1xuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKCdlbmNvZGVQYXNzd29yZCcpLndpdGhFeGFjdEFyZ3MoY2Fwcy51bmxvY2tLZXkpLnJldHVybnMoY2Fwcy51bmxvY2tLZXkpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NoZWxsJykud2l0aEV4YWN0QXJncyhbJ2lucHV0JywgJ3RleHQnLCBjYXBzLnVubG9ja0tleV0pLm9uY2UoKTtcbiAgICAgIG1vY2tzLmFzeW5jYm94LmV4cGVjdHMoJ3NsZWVwJykud2l0aEV4YWN0QXJncyhJTlBVVF9LRVlTX1dBSVRfVElNRSkub25jZSgpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NoZWxsJykud2l0aEV4YWN0QXJncyhbJ2lucHV0JywgJ2tleWV2ZW50JywgS0VZQ09ERV9OVU1QQURfRU5URVJdKTtcbiAgICAgIG1vY2tzLmFzeW5jYm94LmV4cGVjdHMoJ3NsZWVwJykud2l0aEV4YWN0QXJncyhVTkxPQ0tfV0FJVF9USU1FKS5vbmNlKCk7XG4gICAgICBhd2FpdCBoZWxwZXJzLnBhc3N3b3JkVW5sb2NrKGFkYiwgZHJpdmVyLCBjYXBzKTtcbiAgICAgIG1vY2tzLmhlbHBlcnMudmVyaWZ5KCk7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgICBtb2Nrcy5hc3luY2JveC52ZXJpZnkoKTtcbiAgICB9KTtcbiAgfSkpO1xuICBkZXNjcmliZSgnZ2V0UGF0dGVybktleVBvc2l0aW9uJywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdzaG91bGQgdmVyaWZ5IHBhdHRlcm4gcGluIGlzIGFwcm94aW1hdGVsbHkgdG8gaXRzIHBvc2l0aW9uJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IHBpbnMgPSBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOV0ubWFwKChwaW4pID0+IHtcbiAgICAgICAgcmV0dXJuIGhlbHBlcnMuZ2V0UGF0dGVybktleVBvc2l0aW9uKHBpbiwge3g6IDMzLCB5OjMyM30sIDEzNy42KTtcbiAgICAgIH0pO1xuICAgICAgbGV0IGNvbHMgPSBbMTAxLCAyMzgsIDM3NV07XG4gICAgICBsZXQgcm93cyA9IFszOTEsIDUyOCwgNjY1XTtcbiAgICAgIGV4cGVjdChwaW5zWzBdLngpLnRvLmJlLndpdGhpbihjb2xzWzBdIC0gNSwgY29sc1swXSArIDUpO1xuICAgICAgZXhwZWN0KHBpbnNbMV0ueCkudG8uYmUud2l0aGluKGNvbHNbMV0gLSA1LCBjb2xzWzFdICsgNSk7XG4gICAgICBleHBlY3QocGluc1syXS54KS50by5iZS53aXRoaW4oY29sc1syXSAtIDUsIGNvbHNbMl0gKyA1KTtcbiAgICAgIGV4cGVjdChwaW5zWzNdLngpLnRvLmJlLndpdGhpbihjb2xzWzBdIC0gNSwgY29sc1swXSArIDUpO1xuICAgICAgZXhwZWN0KHBpbnNbNF0ueCkudG8uYmUud2l0aGluKGNvbHNbMV0gLSA1LCBjb2xzWzFdICsgNSk7XG4gICAgICBleHBlY3QocGluc1s1XS54KS50by5iZS53aXRoaW4oY29sc1syXSAtIDUsIGNvbHNbMl0gKyA1KTtcbiAgICAgIGV4cGVjdChwaW5zWzZdLngpLnRvLmJlLndpdGhpbihjb2xzWzBdIC0gNSwgY29sc1swXSArIDUpO1xuICAgICAgZXhwZWN0KHBpbnNbN10ueCkudG8uYmUud2l0aGluKGNvbHNbMV0gLSA1LCBjb2xzWzFdICsgNSk7XG4gICAgICBleHBlY3QocGluc1s4XS54KS50by5iZS53aXRoaW4oY29sc1syXSAtIDUsIGNvbHNbMl0gKyA1KTtcbiAgICAgIGV4cGVjdChwaW5zWzBdLnkpLnRvLmJlLndpdGhpbihyb3dzWzBdIC0gNSwgcm93c1swXSArIDUpO1xuICAgICAgZXhwZWN0KHBpbnNbMV0ueSkudG8uYmUud2l0aGluKHJvd3NbMF0gLSA1LCByb3dzWzBdICsgNSk7XG4gICAgICBleHBlY3QocGluc1syXS55KS50by5iZS53aXRoaW4ocm93c1swXSAtIDUsIHJvd3NbMF0gKyA1KTtcbiAgICAgIGV4cGVjdChwaW5zWzNdLnkpLnRvLmJlLndpdGhpbihyb3dzWzFdIC0gNSwgcm93c1sxXSArIDUpO1xuICAgICAgZXhwZWN0KHBpbnNbNF0ueSkudG8uYmUud2l0aGluKHJvd3NbMV0gLSA1LCByb3dzWzFdICsgNSk7XG4gICAgICBleHBlY3QocGluc1s1XS55KS50by5iZS53aXRoaW4ocm93c1sxXSAtIDUsIHJvd3NbMV0gKyA1KTtcbiAgICAgIGV4cGVjdChwaW5zWzZdLnkpLnRvLmJlLndpdGhpbihyb3dzWzJdIC0gNSwgcm93c1syXSArIDUpO1xuICAgICAgZXhwZWN0KHBpbnNbN10ueSkudG8uYmUud2l0aGluKHJvd3NbMl0gLSA1LCByb3dzWzJdICsgNSk7XG4gICAgICBleHBlY3QocGluc1s4XS55KS50by5iZS53aXRoaW4ocm93c1syXSAtIDUsIHJvd3NbMl0gKyA1KTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdnZXRQYXR0ZXJuQWN0aW9ucycsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIGdlbmVyYXRlIHByZXNzLCBtb3ZlVG8sIHJlbGFzZSBnZXN0dXJlIHNjaGVtZSB0byB1bmxvY2sgYnkgcGF0dGVybicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBrZXlzID0gW1wiMVwiLCBcIjJcIiwgXCIzXCIsIFwiNFwiLCBcIjVcIiwgXCI2XCIsIFwiN1wiLCBcIjhcIiwgXCI5XCJdO1xuICAgICAgbGV0IGFjdGlvbnMgPSBoZWxwZXJzLmdldFBhdHRlcm5BY3Rpb25zKGtleXMsIHt4OiAwLCB5OjB9LCAxKTtcbiAgICAgIGFjdGlvbnMubWFwKChhY3Rpb24sIGkpID0+IHtcbiAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICBhY3Rpb24uYWN0aW9uLnNob3VsZC5lcXVhbCgncHJlc3MnKTtcbiAgICAgICAgfSBlbHNlIGlmIChpID09PSBrZXlzLmxlbmd0aCkge1xuICAgICAgICAgIGFjdGlvbi5hY3Rpb24uc2hvdWxkLmVxdWFsKCdyZWxlYXNlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWN0aW9uLmFjdGlvbi5zaG91bGQuZXF1YWwoJ21vdmVUbycpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHZlcmlmeSBwYXR0ZXJuIGdlc3R1cmVzIG1vdmVzIHRvIG5vbiBjb25zZWN1dGl2ZXMgcGlucycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBrZXlzID0gW1wiN1wiLCBcIjJcIiwgXCI5XCIsIFwiOFwiLCBcIjVcIiwgXCI2XCIsIFwiMVwiLCBcIjRcIiwgXCIzXCJdO1xuICAgICAgbGV0IGFjdGlvbnMgPSBoZWxwZXJzLmdldFBhdHRlcm5BY3Rpb25zKGtleXMsIHt4OiAwLCB5OjB9LCAxKTtcbiAgICAgIC8vIE1vdmUgZnJvbSBwaW4gNyB0byBwaW4gMlxuICAgICAgYWN0aW9uc1sxXS5vcHRpb25zLnguc2hvdWxkLmVxdWFsKDEpO1xuICAgICAgYWN0aW9uc1sxXS5vcHRpb25zLnkuc2hvdWxkLmVxdWFsKC0yKTtcbiAgICAgIC8vIE1vdmUgZnJvbSBwaW4gMiB0byBwaW4gOVxuICAgICAgYWN0aW9uc1syXS5vcHRpb25zLnguc2hvdWxkLmVxdWFsKDEpO1xuICAgICAgYWN0aW9uc1syXS5vcHRpb25zLnkuc2hvdWxkLmVxdWFsKDIpO1xuICAgICAgLy8gTW92ZSBmcm9tIHBpbiA5IHRvIHBpbiA4XG4gICAgICBhY3Rpb25zWzNdLm9wdGlvbnMueC5zaG91bGQuZXF1YWwoLTEpO1xuICAgICAgYWN0aW9uc1szXS5vcHRpb25zLnkuc2hvdWxkLmVxdWFsKDApO1xuICAgICAgLy8gTW92ZSBmcm9tIHBpbiA4IHRvIHBpbiA1XG4gICAgICBhY3Rpb25zWzRdLm9wdGlvbnMueC5zaG91bGQuZXF1YWwoMCk7XG4gICAgICBhY3Rpb25zWzRdLm9wdGlvbnMueS5zaG91bGQuZXF1YWwoLTEpO1xuICAgICAgLy8gTW92ZSBmcm9tIHBpbiA1IHRvIHBpbiA2XG4gICAgICBhY3Rpb25zWzVdLm9wdGlvbnMueC5zaG91bGQuZXF1YWwoMSk7XG4gICAgICBhY3Rpb25zWzVdLm9wdGlvbnMueS5zaG91bGQuZXF1YWwoMCk7XG4gICAgICAvLyBNb3ZlIGZyb20gcGluIDYgdG8gcGluIDFcbiAgICAgIGFjdGlvbnNbNl0ub3B0aW9ucy54LnNob3VsZC5lcXVhbCgtMik7XG4gICAgICBhY3Rpb25zWzZdLm9wdGlvbnMueS5zaG91bGQuZXF1YWwoLTEpO1xuICAgICAgLy8gTW92ZSBmcm9tIHBpbiAxIHRvIHBpbiA0XG4gICAgICBhY3Rpb25zWzddLm9wdGlvbnMueC5zaG91bGQuZXF1YWwoMCk7XG4gICAgICBhY3Rpb25zWzddLm9wdGlvbnMueS5zaG91bGQuZXF1YWwoMSk7XG4gICAgICAvLyBNb3ZlIGZyb20gcGluIDQgdG8gcGluIDNcbiAgICAgIGFjdGlvbnNbOF0ub3B0aW9ucy54LnNob3VsZC5lcXVhbCgyKTtcbiAgICAgIGFjdGlvbnNbOF0ub3B0aW9ucy55LnNob3VsZC5lcXVhbCgtMSk7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgncGF0dGVyblVubG9jaycsIHdpdGhNb2Nrcyh7ZHJpdmVyLCBoZWxwZXJzLCBhZGIsIGFzeW5jYm94fSwgKG1vY2tzKSA9PiB7XG4gICAgY29uc3QgZWwgPSB7RUxFTUVOVDogMX07XG4gICAgY29uc3QgcG9zID0ge3g6IDEwLCB5OiAyMH07XG4gICAgY29uc3Qgc2l6ZSA9IHt3aWR0aDogMzAwfTtcbiAgICBjb25zdCBrZXlzID0gWycxJywgJzMnLCAnNScsICc3JywgJzknXTtcbiAgICBjb25zdCBjYXBzID0ge3VubG9ja0tleTogJzEzNTc5J307XG4gICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBtb2Nrcy5oZWxwZXJzLmV4cGVjdHMoJ2Rpc21pc3NLZXlndWFyZCcpLndpdGhFeGFjdEFyZ3MoZHJpdmVyLCBhZGIpLm9uY2UoKTtcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cygnc3RyaW5nS2V5VG9BcnInKS5yZXR1cm5zKGtleXMpO1xuICAgICAgbW9ja3MuZHJpdmVyLmV4cGVjdHMoJ2dldExvY2F0aW9uJykud2l0aEV4YWN0QXJncyhlbC5FTEVNRU5UKS5yZXR1cm5zKHBvcyk7XG4gICAgICBtb2Nrcy5kcml2ZXIuZXhwZWN0cygnZ2V0U2l6ZScpLndpdGhFeGFjdEFyZ3MoZWwuRUxFTUVOVCkucmV0dXJucyhzaXplKTtcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cygnZ2V0UGF0dGVybkFjdGlvbnMnKVxuICAgICAgICAud2l0aEV4YWN0QXJncyhrZXlzLCBwb3MsIDEwMCkucmV0dXJucygnYWN0aW9ucycpO1xuICAgICAgbW9ja3MuZHJpdmVyLmV4cGVjdHMoJ3BlcmZvcm1Ub3VjaCcpLndpdGhFeGFjdEFyZ3MoJ2FjdGlvbnMnKS5vbmNlKCk7XG4gICAgICBtb2Nrcy5hc3luY2JveC5leHBlY3RzKCdzbGVlcCcpLndpdGhFeGFjdEFyZ3MoVU5MT0NLX1dBSVRfVElNRSkub25jZSgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byB1bmxvY2sgZGV2aWNlIHVzaW5nIHBhdHRlcm4gKEFQSSBsZXZlbCA+PSAyMSknLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0QXBpTGV2ZWwnKS5yZXR1cm5zKDIxKTtcbiAgICAgIG1vY2tzLmRyaXZlci5leHBlY3RzKCdmaW5kRWxPckVscycpXG4gICAgICAgIC53aXRoRXhhY3RBcmdzKCdpZCcsICdjb20uYW5kcm9pZC5zeXN0ZW11aTppZC9sb2NrUGF0dGVyblZpZXcnLCBmYWxzZSlcbiAgICAgICAgLnJldHVybnMoZWwpO1xuICAgICAgYXdhaXQgaGVscGVycy5wYXR0ZXJuVW5sb2NrKGFkYiwgZHJpdmVyLCBjYXBzKTtcbiAgICAgIG1vY2tzLmhlbHBlcnMudmVyaWZ5KCk7XG4gICAgICBtb2Nrcy5kcml2ZXIudmVyaWZ5KCk7XG4gICAgICBtb2Nrcy5hc3luY2JveC52ZXJpZnkoKTtcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gdW5sb2NrIGRldmljZSB1c2luZyBwYXR0ZXJuIChBUEkgbGV2ZWwgPCAyMSknLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0QXBpTGV2ZWwnKS5yZXR1cm5zKDIwKTtcbiAgICAgIG1vY2tzLmRyaXZlci5leHBlY3RzKCdmaW5kRWxPckVscycpXG4gICAgICAgIC53aXRoRXhhY3RBcmdzKCdpZCcsICdjb20uYW5kcm9pZC5rZXlndWFyZDppZC9sb2NrUGF0dGVyblZpZXcnLCBmYWxzZSlcbiAgICAgICAgLnJldHVybnMoZWwpO1xuICAgICAgYXdhaXQgaGVscGVycy5wYXR0ZXJuVW5sb2NrKGFkYiwgZHJpdmVyLCBjYXBzKTtcbiAgICAgIG1vY2tzLmhlbHBlcnMudmVyaWZ5KCk7XG4gICAgICBtb2Nrcy5kcml2ZXIudmVyaWZ5KCk7XG4gICAgICBtb2Nrcy5hc3luY2JveC52ZXJpZnkoKTtcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICB9KTtcbiAgfSkpO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uIn0=
