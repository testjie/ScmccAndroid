require('source-map-support').install();

'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _libProtocolValidators = require('../../lib/protocol/validators');

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _libBasedriverDriver = require("../../lib/basedriver/driver");

var _libBasedriverDriver2 = _interopRequireDefault(_libBasedriverDriver);

_chai2['default'].should();

describe('Protocol', function () {
  describe('direct to driver', function () {

    describe('setUrl', function () {
      it('should fail when no url passed', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.setUrl();
              }).should['throw'](/url/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should fail when given invalid url', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.setUrl('foo');
              }).should['throw'](/url/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should succeed when given url starting with http', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.setUrl('http://appium.io');
              }).should.not['throw']();

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should succeed when given an android-like scheme', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.setUrl('content://contacts/people/1');
              }).should.not['throw']();

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should succeed with hyphens dots and plus chars in the scheme', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.setUrl('my-app.a+b://login');
              }).should.not['throw']();

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should succeed when given an about scheme', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.setUrl('about:blank');
              }).should.not['throw']();

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should succeed when given a data scheme', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.setUrl('data:text/html,<html></html>');
              }).should.not['throw']();

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
    });
    describe('implicitWait', function () {
      it('should fail when given no ms', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.implicitWait();
              }).should['throw'](/ms/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should fail when given a non-numeric ms', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.implicitWait("five");
              }).should['throw'](/ms/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should fail when given a negative ms', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.implicitWait(-1);
              }).should['throw'](/ms/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should succeed when given an ms of 0', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.implicitWait(0);
              }).should.not['throw']();

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should succeed when given an ms greater than 0', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.implicitWait(100);
              }).should.not['throw']();

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
    });
    describe('asyncScriptTimeout', function () {
      it('should fail when given no ms', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.asyncScriptTimeout();
              }).should['throw'](/ms/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should fail when given a non-numeric ms', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.asyncScriptTimeout("five");
              }).should['throw'](/ms/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should fail when given a negative ms', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.asyncScriptTimeout(-1);
              }).should['throw'](/ms/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should succeed when given an ms of 0', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.asyncScriptTimeout(0);
              }).should.not['throw']();

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should succeed when given an ms greater than 0', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.asyncScriptTimeout(100);
              }).should.not['throw']();

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
    });
    describe('timeouts', function () {
      it('should fail when given no ms', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.timeouts({ protocol: _libBasedriverDriver2['default'].DRIVER_PROTOCOL.MJSONWP, type: 'page load', ms: undefined });
              }).should['throw'](/ms/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should fail when given a non-numeric ms', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.timeouts({ protocol: _libBasedriverDriver2['default'].DRIVER_PROTOCOL.MJSONWP, type: 'page load', ms: 'five' });
              }).should['throw'](/ms/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should fail when given a negative ms', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.timeouts({ protocol: _libBasedriverDriver2['default'].DRIVER_PROTOCOL.MJSONWP, type: 'page load', ms: -1 });
              }).should['throw'](/ms/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should succeed when given an ms of 0', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.timeouts({ protocol: _libBasedriverDriver2['default'].DRIVER_PROTOCOL.MJSONWP, type: 'page load', ms: 0 });
              }).should.not['throw']();

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should succeed when given an ms greater than 0', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.timeouts({ protocol: _libBasedriverDriver2['default'].DRIVER_PROTOCOL.MJSONWP, type: 'page load', ms: 100 });
              }).should.not['throw']();

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should not allow an invalid timeout type', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.timeouts({ protocol: _libBasedriverDriver2['default'].DRIVER_PROTOCOL.MJSONWP, type: 'foofoo', ms: 100 });
              }).should['throw'](/'foofoo'/);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should fail when given a non-numeric scriptDuration', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.timeouts({ protocol: _libBasedriverDriver2['default'].DRIVER_PROTOCOL.W3C, script: 'one', pageLoad: undefined, implicit: undefined });
              }).should['throw'](/ms/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should fail when given a non-numeric pageLoadDuration', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.timeouts({ protocol: _libBasedriverDriver2['default'].DRIVER_PROTOCOL.W3C, script: undefined, pageLoad: 'one', implicit: undefined });
              }).should['throw'](/ms/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should fail when given a non-numeric implicitDuration', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.timeouts({ protocol: _libBasedriverDriver2['default'].DRIVER_PROTOCOL.W3C, script: undefined, pageLoad: undefined, implicit: 'one' });
              }).should['throw'](/ms/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should fail when given a negative scriptDuration', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.timeouts({ protocol: _libBasedriverDriver2['default'].DRIVER_PROTOCOL.W3C, script: -1, pageLoad: undefined, implicit: undefined });
              }).should['throw'](/ms/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should fail when given a negative pageLoadDuration', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.timeouts({ protocol: _libBasedriverDriver2['default'].DRIVER_PROTOCOL.W3C, script: undefined, pageLoad: -1, implicit: undefined });
              }).should['throw'](/ms/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should fail when given a negative implicitDuration', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.timeouts({ protocol: _libBasedriverDriver2['default'].DRIVER_PROTOCOL.W3C, script: undefined, pageLoad: undefined, implicit: -1 });
              }).should['throw'](/ms/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should succeed when given scriptDuration of 0', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.timeouts({ protocol: _libBasedriverDriver2['default'].DRIVER_PROTOCOL.W3C, script: 0, pageLoad: undefined, implicit: undefined });
              }).should.not['throw'](/ms/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should succeed when given pageLoadDuration of 0', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.timeouts({ protocol: _libBasedriverDriver2['default'].DRIVER_PROTOCOL.W3C, script: undefined, pageLoad: 0, implicit: undefined });
              }).should.not['throw'](/ms/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should succeed when given implicitDuration of 0', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.timeouts({ protocol: _libBasedriverDriver2['default'].DRIVER_PROTOCOL.W3C, script: undefined, pageLoad: undefined, implicit: 0 });
              }).should.not['throw'](/ms/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should succeed when given scriptDuration greater than 0', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.timeouts({ protocol: _libBasedriverDriver2['default'].DRIVER_PROTOCOL.W3C, script: 1, pageLoad: undefined, implicit: undefined });
              }).should.not['throw'](/ms/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should succeed when given pageLoadDuration greater than 0', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.timeouts({ protocol: _libBasedriverDriver2['default'].DRIVER_PROTOCOL.W3C, script: undefined, pageLoad: 1, implicit: undefined });
              }).should.not['throw'](/ms/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should succeed when given implicitDuration greater than 0', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.timeouts({ protocol: _libBasedriverDriver2['default'].DRIVER_PROTOCOL.W3C, script: undefined, pageLoad: undefined, implicit: 1 });
              }).should.not['throw'](/ms/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should succeed when given scriptDuration, pageLoadDuration and implicitDuration greater than 0', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.timeouts({ protocol: _libBasedriverDriver2['default'].DRIVER_PROTOCOL.W3C, script: 1, pageLoad: 1, implicit: 1 });
              }).should.not['throw'](/ms/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
    });
    describe('clickCurrent', function () {
      it('should fail when given an invalid button', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.clickCurrent(4);
              }).should['throw'](/0, 1, or 2/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should succeed when given a valid button', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.clickCurrent(0);
              }).should.not['throw']();
              (function () {
                _libProtocolValidators.validators.clickCurrent(1);
              }).should.not['throw']();
              (function () {
                _libProtocolValidators.validators.clickCurrent(2);
              }).should.not['throw']();

            case 3:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
    });
    describe('setNetworkConnection', function () {
      it('should fail when given no type', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.setNetworkConnection();
              }).should['throw'](/0, 1, 2, 4, 6/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should fail when given an invalid type', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.setNetworkConnection(8);
              }).should['throw'](/0, 1, 2, 4, 6/i);

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should succeed when given a valid type', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              (function () {
                _libProtocolValidators.validators.setNetworkConnection(0);
              }).should.not['throw']();
              (function () {
                _libProtocolValidators.validators.setNetworkConnection(1);
              }).should.not['throw']();
              (function () {
                _libProtocolValidators.validators.setNetworkConnection(2);
              }).should.not['throw']();
              (function () {
                _libProtocolValidators.validators.setNetworkConnection(4);
              }).should.not['throw']();
              (function () {
                _libProtocolValidators.validators.setNetworkConnection(6);
              }).should.not['throw']();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcHJvdG9jb2wvdmFsaWRhdG9yLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O3FDQUUyQiwrQkFBK0I7O29CQUN6QyxNQUFNOzs7O21DQUNBLDZCQUE2Qjs7OztBQUdwRCxrQkFBSyxNQUFNLEVBQUUsQ0FBQzs7QUFFZCxRQUFRLENBQUMsVUFBVSxFQUFFLFlBQVk7QUFDL0IsVUFBUSxDQUFDLGtCQUFrQixFQUFFLFlBQVk7O0FBRXZDLFlBQVEsQ0FBQyxRQUFRLEVBQUUsWUFBWTtBQUM3QixRQUFFLENBQUMsZ0NBQWdDLEVBQUU7Ozs7QUFDbkMsZUFBQyxZQUFNO0FBQUMsa0RBQVcsTUFBTSxFQUFFLENBQUM7ZUFBQyxDQUFBLENBQUUsTUFBTSxTQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7Ozs7T0FDckQsQ0FBQyxDQUFDO0FBQ0gsUUFBRSxDQUFDLG9DQUFvQyxFQUFFOzs7O0FBQ3ZDLGVBQUMsWUFBTTtBQUFDLGtEQUFXLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztlQUFDLENBQUEsQ0FBRSxNQUFNLFNBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7OztPQUMxRCxDQUFDLENBQUM7QUFDSCxRQUFFLENBQUMsa0RBQWtELEVBQUU7Ozs7QUFDckQsZUFBQyxZQUFNO0FBQUMsa0RBQVcsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7ZUFBQyxDQUFBLENBQUUsTUFBTSxDQUFDLEdBQUcsU0FBTSxFQUFFLENBQUM7Ozs7Ozs7T0FDckUsQ0FBQyxDQUFDO0FBQ0gsUUFBRSxDQUFDLGtEQUFrRCxFQUFFOzs7O0FBQ3JELGVBQUMsWUFBTTtBQUFDLGtEQUFXLE1BQU0sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO2VBQUMsQ0FBQSxDQUFFLE1BQU0sQ0FBQyxHQUFHLFNBQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ2hGLENBQUMsQ0FBQztBQUNILFFBQUUsQ0FBQywrREFBK0QsRUFBRTs7OztBQUNsRSxlQUFDLFlBQU07QUFB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SCxDQUFDLENBQUM7QUFDSCxRQUFFLENBQUMsc0NBQXNDLEVBQUU7Ozs7QUFDekMsZUFBQyxZQUFNO0FBQUMsa0RBQVcsUUFBUSxDQUFDLEVBQUMsUUFBUSxFQUFFLGlDQUFXLGVBQWUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztlQUFDLENBQUEsQ0FBRSxNQUFNLENBQUMsR0FBRyxTQUFNLEVBQUUsQ0FBQzs7Ozs7OztPQUM3SCxDQUFDLENBQUM7QUFDSCxRQUFFLENBQUMsZ0RBQWdELEVBQUU7Ozs7QUFDbkQsZUFBQyxZQUFNO0FBQUMsa0RBQVcsUUFBUSxDQUFDLEVBQUMsUUFBUSxFQUFFLGlDQUFXLGVBQWUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFDLENBQUMsQ0FBQztlQUFDLENBQUEsQ0FBRSxNQUFNLENBQUMsR0FBRyxTQUFNLEVBQUUsQ0FBQzs7Ozs7OztPQUMvSCxDQUFDLENBQUM7QUFDSCxRQUFFLENBQUMsMENBQTBDLEVBQUU7Ozs7QUFDN0MsZUFBQyxZQUFNO0FBQUMsa0RBQVcsUUFBUSxDQUFDLEVBQUMsUUFBUSxFQUFFLGlDQUFXLGVBQWUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFDLENBQUMsQ0FBQztlQUFDLENBQUEsQ0FBRSxNQUFNLFNBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQzs7Ozs7OztPQUNsSSxDQUFDLENBQUM7QUFDSCxRQUFFLENBQUMscURBQXFELEVBQUU7Ozs7QUFDeEQsZUFBQyxZQUFNO0FBQUMsa0RBQVcsUUFBUSxDQUFDLEVBQUMsUUFBUSxFQUFFLGlDQUFXLGVBQWUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFDO2VBQUMsQ0FBQSxDQUFFLE1BQU0sU0FBTSxDQUFDLEtBQUss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QWlELEVBQUU7Ozs7QUFDcEQsZUFBQyxZQUFNO0FBQUMsa0RBQVcsUUFBUSxDQUFDLEVBQUMsUUFBUSxFQUFFLGlDQUFXLGVBQWUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO2VBQUMsQ0FBQSxDQUFFLE1BQU0sQ0FBQyxHQUFHLFNBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7OztPQUN6SixDQUFDLENBQUM7QUFDSCxRQUFFLENBQUMseURBQXlELEVBQUU7Ozs7QUFDNUQsZUFBQyxZQUFNO0FBQUMsa0RBQVcsUUFBUSxDQUFDLEVBQUMsUUFBUSxFQUFFLGlDQUFXLGVBQWUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFDO2VBQUMsQ0FBQSxDQUFFLE1BQU0sQ0FBQyxHQUFHLFNBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7OztPQUN6SixDQUFDLENBQUM7QUFDSCxRQUFFLENBQUMsMkRBQTJELEVBQUU7Ozs7QUFDOUQsZUFBQyxZQUFNO0FBQUMsa0RBQVcsUUFBUSxDQUFDLEVBQUMsUUFBUSxFQUFFLGlDQUFXLGVBQWUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFDO2VBQUMsQ0FBQSxDQUFFLE1BQU0sQ0FBQyxHQUFHLFNBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7OztPQUN6SixDQUFDLENBQUM7QUFDSCxRQUFFLENBQUMsMkRBQTJELEVBQUU7Ozs7QUFDOUQsZUFBQyxZQUFNO0FBQUMsa0RBQVcsUUFBUSxDQUFDLEVBQUMsUUFBUSxFQUFFLGlDQUFXLGVBQWUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFFBQVEs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O0dBQ0osQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvcHJvdG9jb2wvdmFsaWRhdG9yLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHJhbnNwaWxlOm1vY2hhXG5cbmltcG9ydCB7IHZhbGlkYXRvcnMgfSBmcm9tICcuLi8uLi9saWIvcHJvdG9jb2wvdmFsaWRhdG9ycyc7XG5pbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBCYXNlRHJpdmVyIGZyb20gXCIuLi8uLi9saWIvYmFzZWRyaXZlci9kcml2ZXJcIjtcblxuXG5jaGFpLnNob3VsZCgpO1xuXG5kZXNjcmliZSgnUHJvdG9jb2wnLCBmdW5jdGlvbiAoKSB7XG4gIGRlc2NyaWJlKCdkaXJlY3QgdG8gZHJpdmVyJywgZnVuY3Rpb24gKCkge1xuXG4gICAgZGVzY3JpYmUoJ3NldFVybCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGl0KCdzaG91bGQgZmFpbCB3aGVuIG5vIHVybCBwYXNzZWQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICgoKSA9PiB7dmFsaWRhdG9ycy5zZXRVcmwoKTt9KS5zaG91bGQudGhyb3coL3VybC9pKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCBmYWlsIHdoZW4gZ2l2ZW4gaW52YWxpZCB1cmwnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICgoKSA9PiB7dmFsaWRhdG9ycy5zZXRVcmwoJ2ZvbycpO30pLnNob3VsZC50aHJvdygvdXJsL2kpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIHN1Y2NlZWQgd2hlbiBnaXZlbiB1cmwgc3RhcnRpbmcgd2l0aCBodHRwJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAoKCkgPT4ge3ZhbGlkYXRvcnMuc2V0VXJsKCdodHRwOi8vYXBwaXVtLmlvJyk7fSkuc2hvdWxkLm5vdC50aHJvdygpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIHN1Y2NlZWQgd2hlbiBnaXZlbiBhbiBhbmRyb2lkLWxpa2Ugc2NoZW1lJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAoKCkgPT4ge3ZhbGlkYXRvcnMuc2V0VXJsKCdjb250ZW50Oi8vY29udGFjdHMvcGVvcGxlLzEnKTt9KS5zaG91bGQubm90LnRocm93KCk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgc3VjY2VlZCB3aXRoIGh5cGhlbnMgZG90cyBhbmQgcGx1cyBjaGFycyBpbiB0aGUgc2NoZW1lJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAoKCkgPT4ge3ZhbGlkYXRvcnMuc2V0VXJsKCdteS1hcHAuYStiOi8vbG9naW4nKTt9KS5zaG91bGQubm90LnRocm93KCk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgc3VjY2VlZCB3aGVuIGdpdmVuIGFuIGFib3V0IHNjaGVtZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgKCgpID0+IHt2YWxpZGF0b3JzLnNldFVybCgnYWJvdXQ6YmxhbmsnKTt9KS5zaG91bGQubm90LnRocm93KCk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgc3VjY2VlZCB3aGVuIGdpdmVuIGEgZGF0YSBzY2hlbWUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICgoKSA9PiB7dmFsaWRhdG9ycy5zZXRVcmwoJ2RhdGE6dGV4dC9odG1sLDxodG1sPjwvaHRtbD4nKTt9KS5zaG91bGQubm90LnRocm93KCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnaW1wbGljaXRXYWl0JywgZnVuY3Rpb24gKCkge1xuICAgICAgaXQoJ3Nob3VsZCBmYWlsIHdoZW4gZ2l2ZW4gbm8gbXMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICgoKSA9PiB7dmFsaWRhdG9ycy5pbXBsaWNpdFdhaXQoKTt9KS5zaG91bGQudGhyb3coL21zL2kpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIGZhaWwgd2hlbiBnaXZlbiBhIG5vbi1udW1lcmljIG1zJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAoKCkgPT4ge3ZhbGlkYXRvcnMuaW1wbGljaXRXYWl0KFwiZml2ZVwiKTt9KS5zaG91bGQudGhyb3coL21zL2kpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIGZhaWwgd2hlbiBnaXZlbiBhIG5lZ2F0aXZlIG1zJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAoKCkgPT4ge3ZhbGlkYXRvcnMuaW1wbGljaXRXYWl0KC0xKTt9KS5zaG91bGQudGhyb3coL21zL2kpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIHN1Y2NlZWQgd2hlbiBnaXZlbiBhbiBtcyBvZiAwJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAoKCkgPT4ge3ZhbGlkYXRvcnMuaW1wbGljaXRXYWl0KDApO30pLnNob3VsZC5ub3QudGhyb3coKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCBzdWNjZWVkIHdoZW4gZ2l2ZW4gYW4gbXMgZ3JlYXRlciB0aGFuIDAnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICgoKSA9PiB7dmFsaWRhdG9ycy5pbXBsaWNpdFdhaXQoMTAwKTt9KS5zaG91bGQubm90LnRocm93KCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnYXN5bmNTY3JpcHRUaW1lb3V0JywgZnVuY3Rpb24gKCkge1xuICAgICAgaXQoJ3Nob3VsZCBmYWlsIHdoZW4gZ2l2ZW4gbm8gbXMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICgoKSA9PiB7dmFsaWRhdG9ycy5hc3luY1NjcmlwdFRpbWVvdXQoKTt9KS5zaG91bGQudGhyb3coL21zL2kpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIGZhaWwgd2hlbiBnaXZlbiBhIG5vbi1udW1lcmljIG1zJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAoKCkgPT4ge3ZhbGlkYXRvcnMuYXN5bmNTY3JpcHRUaW1lb3V0KFwiZml2ZVwiKTt9KS5zaG91bGQudGhyb3coL21zL2kpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIGZhaWwgd2hlbiBnaXZlbiBhIG5lZ2F0aXZlIG1zJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAoKCkgPT4ge3ZhbGlkYXRvcnMuYXN5bmNTY3JpcHRUaW1lb3V0KC0xKTt9KS5zaG91bGQudGhyb3coL21zL2kpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIHN1Y2NlZWQgd2hlbiBnaXZlbiBhbiBtcyBvZiAwJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAoKCkgPT4ge3ZhbGlkYXRvcnMuYXN5bmNTY3JpcHRUaW1lb3V0KDApO30pLnNob3VsZC5ub3QudGhyb3coKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCBzdWNjZWVkIHdoZW4gZ2l2ZW4gYW4gbXMgZ3JlYXRlciB0aGFuIDAnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICgoKSA9PiB7dmFsaWRhdG9ycy5hc3luY1NjcmlwdFRpbWVvdXQoMTAwKTt9KS5zaG91bGQubm90LnRocm93KCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgndGltZW91dHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpdCgnc2hvdWxkIGZhaWwgd2hlbiBnaXZlbiBubyBtcycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgKCgpID0+IHt2YWxpZGF0b3JzLnRpbWVvdXRzKHtwcm90b2NvbDogQmFzZURyaXZlci5EUklWRVJfUFJPVE9DT0wuTUpTT05XUCwgdHlwZTogJ3BhZ2UgbG9hZCcsIG1zOiB1bmRlZmluZWR9KTt9KS5zaG91bGQudGhyb3coL21zL2kpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIGZhaWwgd2hlbiBnaXZlbiBhIG5vbi1udW1lcmljIG1zJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAoKCkgPT4ge3ZhbGlkYXRvcnMudGltZW91dHMoe3Byb3RvY29sOiBCYXNlRHJpdmVyLkRSSVZFUl9QUk9UT0NPTC5NSlNPTldQLCB0eXBlOiAncGFnZSBsb2FkJywgbXM6ICdmaXZlJ30pO30pLnNob3VsZC50aHJvdygvbXMvaSk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgZmFpbCB3aGVuIGdpdmVuIGEgbmVnYXRpdmUgbXMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICgoKSA9PiB7dmFsaWRhdG9ycy50aW1lb3V0cyh7cHJvdG9jb2w6IEJhc2VEcml2ZXIuRFJJVkVSX1BST1RPQ09MLk1KU09OV1AsIHR5cGU6ICdwYWdlIGxvYWQnLCBtczogLTF9KTt9KS5zaG91bGQudGhyb3coL21zL2kpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIHN1Y2NlZWQgd2hlbiBnaXZlbiBhbiBtcyBvZiAwJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAoKCkgPT4ge3ZhbGlkYXRvcnMudGltZW91dHMoe3Byb3RvY29sOiBCYXNlRHJpdmVyLkRSSVZFUl9QUk9UT0NPTC5NSlNPTldQLCB0eXBlOiAncGFnZSBsb2FkJywgbXM6IDB9KTt9KS5zaG91bGQubm90LnRocm93KCk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgc3VjY2VlZCB3aGVuIGdpdmVuIGFuIG1zIGdyZWF0ZXIgdGhhbiAwJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAoKCkgPT4ge3ZhbGlkYXRvcnMudGltZW91dHMoe3Byb3RvY29sOiBCYXNlRHJpdmVyLkRSSVZFUl9QUk9UT0NPTC5NSlNPTldQLCB0eXBlOiAncGFnZSBsb2FkJywgbXM6IDEwMH0pO30pLnNob3VsZC5ub3QudGhyb3coKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCBub3QgYWxsb3cgYW4gaW52YWxpZCB0aW1lb3V0IHR5cGUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICgoKSA9PiB7dmFsaWRhdG9ycy50aW1lb3V0cyh7cHJvdG9jb2w6IEJhc2VEcml2ZXIuRFJJVkVSX1BST1RPQ09MLk1KU09OV1AsIHR5cGU6ICdmb29mb28nLCBtczogMTAwfSk7fSkuc2hvdWxkLnRocm93KC8nZm9vZm9vJy8pO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIGZhaWwgd2hlbiBnaXZlbiBhIG5vbi1udW1lcmljIHNjcmlwdER1cmF0aW9uJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAoKCkgPT4ge3ZhbGlkYXRvcnMudGltZW91dHMoe3Byb3RvY29sOiBCYXNlRHJpdmVyLkRSSVZFUl9QUk9UT0NPTC5XM0MsIHNjcmlwdDogJ29uZScsIHBhZ2VMb2FkOiB1bmRlZmluZWQsIGltcGxpY2l0OiB1bmRlZmluZWR9KTt9KS5zaG91bGQudGhyb3coL21zL2kpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIGZhaWwgd2hlbiBnaXZlbiBhIG5vbi1udW1lcmljIHBhZ2VMb2FkRHVyYXRpb24nLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICgoKSA9PiB7dmFsaWRhdG9ycy50aW1lb3V0cyh7cHJvdG9jb2w6IEJhc2VEcml2ZXIuRFJJVkVSX1BST1RPQ09MLlczQywgc2NyaXB0OiB1bmRlZmluZWQsIHBhZ2VMb2FkOiAnb25lJywgaW1wbGljaXQ6IHVuZGVmaW5lZH0pO30pLnNob3VsZC50aHJvdygvbXMvaSk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgZmFpbCB3aGVuIGdpdmVuIGEgbm9uLW51bWVyaWMgaW1wbGljaXREdXJhdGlvbicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgKCgpID0+IHt2YWxpZGF0b3JzLnRpbWVvdXRzKHtwcm90b2NvbDogQmFzZURyaXZlci5EUklWRVJfUFJPVE9DT0wuVzNDLCBzY3JpcHQ6IHVuZGVmaW5lZCwgcGFnZUxvYWQ6IHVuZGVmaW5lZCwgaW1wbGljaXQ6ICdvbmUnfSk7fSkuc2hvdWxkLnRocm93KC9tcy9pKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCBmYWlsIHdoZW4gZ2l2ZW4gYSBuZWdhdGl2ZSBzY3JpcHREdXJhdGlvbicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgKCgpID0+IHt2YWxpZGF0b3JzLnRpbWVvdXRzKHtwcm90b2NvbDogQmFzZURyaXZlci5EUklWRVJfUFJPVE9DT0wuVzNDLCBzY3JpcHQ6IC0xLCBwYWdlTG9hZDogdW5kZWZpbmVkLCBpbXBsaWNpdDogdW5kZWZpbmVkfSk7fSkuc2hvdWxkLnRocm93KC9tcy9pKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCBmYWlsIHdoZW4gZ2l2ZW4gYSBuZWdhdGl2ZSBwYWdlTG9hZER1cmF0aW9uJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAoKCkgPT4ge3ZhbGlkYXRvcnMudGltZW91dHMoe3Byb3RvY29sOiBCYXNlRHJpdmVyLkRSSVZFUl9QUk9UT0NPTC5XM0MsIHNjcmlwdDogdW5kZWZpbmVkLCBwYWdlTG9hZDogLTEsIGltcGxpY2l0OiB1bmRlZmluZWR9KTt9KS5zaG91bGQudGhyb3coL21zL2kpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIGZhaWwgd2hlbiBnaXZlbiBhIG5lZ2F0aXZlIGltcGxpY2l0RHVyYXRpb24nLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICgoKSA9PiB7dmFsaWRhdG9ycy50aW1lb3V0cyh7cHJvdG9jb2w6IEJhc2VEcml2ZXIuRFJJVkVSX1BST1RPQ09MLlczQywgc2NyaXB0OiB1bmRlZmluZWQsIHBhZ2VMb2FkOiB1bmRlZmluZWQsIGltcGxpY2l0OiAtMX0pO30pLnNob3VsZC50aHJvdygvbXMvaSk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgc3VjY2VlZCB3aGVuIGdpdmVuIHNjcmlwdER1cmF0aW9uIG9mIDAnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICgoKSA9PiB7dmFsaWRhdG9ycy50aW1lb3V0cyh7cHJvdG9jb2w6IEJhc2VEcml2ZXIuRFJJVkVSX1BST1RPQ09MLlczQywgc2NyaXB0OiAwLCBwYWdlTG9hZDogdW5kZWZpbmVkLCBpbXBsaWNpdDogdW5kZWZpbmVkfSk7fSkuc2hvdWxkLm5vdC50aHJvdygvbXMvaSk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgc3VjY2VlZCB3aGVuIGdpdmVuIHBhZ2VMb2FkRHVyYXRpb24gb2YgMCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgKCgpID0+IHt2YWxpZGF0b3JzLnRpbWVvdXRzKHtwcm90b2NvbDogQmFzZURyaXZlci5EUklWRVJfUFJPVE9DT0wuVzNDLCBzY3JpcHQ6IHVuZGVmaW5lZCwgcGFnZUxvYWQ6IDAsIGltcGxpY2l0OiB1bmRlZmluZWR9KTt9KS5zaG91bGQubm90LnRocm93KC9tcy9pKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCBzdWNjZWVkIHdoZW4gZ2l2ZW4gaW1wbGljaXREdXJhdGlvbiBvZiAwJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAoKCkgPT4ge3ZhbGlkYXRvcnMudGltZW91dHMoe3Byb3RvY29sOiBCYXNlRHJpdmVyLkRSSVZFUl9QUk9UT0NPTC5XM0MsIHNjcmlwdDogdW5kZWZpbmVkLCBwYWdlTG9hZDogdW5kZWZpbmVkLCBpbXBsaWNpdDogMH0pO30pLnNob3VsZC5ub3QudGhyb3coL21zL2kpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIHN1Y2NlZWQgd2hlbiBnaXZlbiBzY3JpcHREdXJhdGlvbiBncmVhdGVyIHRoYW4gMCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgKCgpID0+IHt2YWxpZGF0b3JzLnRpbWVvdXRzKHtwcm90b2NvbDogQmFzZURyaXZlci5EUklWRVJfUFJPVE9DT0wuVzNDLCBzY3JpcHQ6IDEsIHBhZ2VMb2FkOiB1bmRlZmluZWQsIGltcGxpY2l0OiB1bmRlZmluZWR9KTt9KS5zaG91bGQubm90LnRocm93KC9tcy9pKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCBzdWNjZWVkIHdoZW4gZ2l2ZW4gcGFnZUxvYWREdXJhdGlvbiBncmVhdGVyIHRoYW4gMCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgKCgpID0+IHt2YWxpZGF0b3JzLnRpbWVvdXRzKHtwcm90b2NvbDogQmFzZURyaXZlci5EUklWRVJfUFJPVE9DT0wuVzNDLCBzY3JpcHQ6IHVuZGVmaW5lZCwgcGFnZUxvYWQ6IDEsIGltcGxpY2l0OiB1bmRlZmluZWR9KTt9KS5zaG91bGQubm90LnRocm93KC9tcy9pKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCBzdWNjZWVkIHdoZW4gZ2l2ZW4gaW1wbGljaXREdXJhdGlvbiBncmVhdGVyIHRoYW4gMCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgKCgpID0+IHt2YWxpZGF0b3JzLnRpbWVvdXRzKHtwcm90b2NvbDogQmFzZURyaXZlci5EUklWRVJfUFJPVE9DT0wuVzNDLCBzY3JpcHQ6IHVuZGVmaW5lZCwgcGFnZUxvYWQ6IHVuZGVmaW5lZCwgaW1wbGljaXQ6IDF9KTt9KS5zaG91bGQubm90LnRocm93KC9tcy9pKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCBzdWNjZWVkIHdoZW4gZ2l2ZW4gc2NyaXB0RHVyYXRpb24sIHBhZ2VMb2FkRHVyYXRpb24gYW5kIGltcGxpY2l0RHVyYXRpb24gZ3JlYXRlciB0aGFuIDAnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICgoKSA9PiB7dmFsaWRhdG9ycy50aW1lb3V0cyh7cHJvdG9jb2w6IEJhc2VEcml2ZXIuRFJJVkVSX1BST1RPQ09MLlczQywgc2NyaXB0OiAxLCBwYWdlTG9hZDogMSwgaW1wbGljaXQ6IDF9KTt9KS5zaG91bGQubm90LnRocm93KC9tcy9pKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdjbGlja0N1cnJlbnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpdCgnc2hvdWxkIGZhaWwgd2hlbiBnaXZlbiBhbiBpbnZhbGlkIGJ1dHRvbicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgKCgpID0+IHt2YWxpZGF0b3JzLmNsaWNrQ3VycmVudCg0KTt9KS5zaG91bGQudGhyb3coLzAsIDEsIG9yIDIvaSk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgc3VjY2VlZCB3aGVuIGdpdmVuIGEgdmFsaWQgYnV0dG9uJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAoKCkgPT4ge3ZhbGlkYXRvcnMuY2xpY2tDdXJyZW50KDApO30pLnNob3VsZC5ub3QudGhyb3coKTtcbiAgICAgICAgKCgpID0+IHt2YWxpZGF0b3JzLmNsaWNrQ3VycmVudCgxKTt9KS5zaG91bGQubm90LnRocm93KCk7XG4gICAgICAgICgoKSA9PiB7dmFsaWRhdG9ycy5jbGlja0N1cnJlbnQoMik7fSkuc2hvdWxkLm5vdC50aHJvdygpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ3NldE5ldHdvcmtDb25uZWN0aW9uJywgZnVuY3Rpb24gKCkge1xuICAgICAgaXQoJ3Nob3VsZCBmYWlsIHdoZW4gZ2l2ZW4gbm8gdHlwZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgKCgpID0+IHt2YWxpZGF0b3JzLnNldE5ldHdvcmtDb25uZWN0aW9uKCk7fSkuc2hvdWxkLnRocm93KC8wLCAxLCAyLCA0LCA2L2kpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIGZhaWwgd2hlbiBnaXZlbiBhbiBpbnZhbGlkIHR5cGUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICgoKSA9PiB7dmFsaWRhdG9ycy5zZXROZXR3b3JrQ29ubmVjdGlvbig4KTt9KS5zaG91bGQudGhyb3coLzAsIDEsIDIsIDQsIDYvaSk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgc3VjY2VlZCB3aGVuIGdpdmVuIGEgdmFsaWQgdHlwZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgKCgpID0+IHt2YWxpZGF0b3JzLnNldE5ldHdvcmtDb25uZWN0aW9uKDApO30pLnNob3VsZC5ub3QudGhyb3coKTtcbiAgICAgICAgKCgpID0+IHt2YWxpZGF0b3JzLnNldE5ldHdvcmtDb25uZWN0aW9uKDEpO30pLnNob3VsZC5ub3QudGhyb3coKTtcbiAgICAgICAgKCgpID0+IHt2YWxpZGF0b3JzLnNldE5ldHdvcmtDb25uZWN0aW9uKDIpO30pLnNob3VsZC5ub3QudGhyb3coKTtcbiAgICAgICAgKCgpID0+IHt2YWxpZGF0b3JzLnNldE5ldHdvcmtDb25uZWN0aW9uKDQpO30pLnNob3VsZC5ub3QudGhyb3coKTtcbiAgICAgICAgKCgpID0+IHt2YWxpZGF0b3JzLnNldE5ldHdvcmtDb25uZWN0aW9uKDYpO30pLnNob3VsZC5ub3QudGhyb3coKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLiJ9
