'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _2 = require('../..');

var _3 = _interopRequireDefault(_2);

var _desired = require('./desired');

var _desired2 = _interopRequireDefault(_desired);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var defaultCaps = _lodash2['default'].defaults({
  androidInstallTimeout: 90000
}, _desired2['default']);

var AVD_ANDROID_19_PIN_UNLOCK = "ANDROID_API_19_PIN_UNLOCK";
var AVD_ANDROID_23_PIN_UNLOCK = "ANDROID_API_23_PIN_UNLOCK";
var AVD_ANDROID_19_PASSWORD_UNLOCK = "ANDROID_API_19_PASSWORD_UNLOCK";
var AVD_ANDROID_23_PASSWORD_UNLOCK = "ANDROID_API_23_PASSWORD_UNLOCK";
var AVD_ANDROID_19_PATTERN_UNLOCK = "ANDROID_API_19_PATTERN_UNLOCK";
var AVD_ANDROID_23_PATTERN_UNLOCK = "ANDROID_API_23_PATTERN_UNLOCK";
var AVD_ANDROID_23_FINGERPRINT_UNLOCK = "ANDROID_API_23_FINGERPRINT_UNLOCK";

describe('unlock tests', function () {
  var driver = undefined;

  describe.skip('functional', function () {
    before(function () {
      driver = new _3['default']();
    });
    afterEach(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.deleteSession());

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should unlock an Android 19 device using a PIN', function callee$2$0() {
      var caps, isLock;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = _lodash2['default'].extend(defaultCaps, { unlockType: "pin", unlockKey: "1111", avd: AVD_ANDROID_19_PIN_UNLOCK });
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.createSession(caps));

          case 3:
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.adb.isScreenLocked());

          case 5:
            isLock = context$3$0.sent;

            isLock.should.equal(false);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should unlock an Android 23 device using a PIN', function callee$2$0() {
      var caps, isLock;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = _lodash2['default'].extend(defaultCaps, { unlockType: "pin", unlockKey: "1111", avd: AVD_ANDROID_23_PIN_UNLOCK });
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.createSession(caps));

          case 3:
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.adb.isScreenLocked());

          case 5:
            isLock = context$3$0.sent;

            isLock.should.equal(false);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should unlock an Android 19 device using a PASSWORD', function callee$2$0() {
      var caps, isLock;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = _lodash2['default'].extend(defaultCaps, { unlockType: "password", unlockKey: "appium", avd: AVD_ANDROID_19_PASSWORD_UNLOCK });
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.createSession(caps));

          case 3:
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.adb.isScreenLocked());

          case 5:
            isLock = context$3$0.sent;

            isLock.should.equal(false);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should unlock an Android 23 device using a PASSWORD', function callee$2$0() {
      var caps, isLock;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = _lodash2['default'].extend(defaultCaps, { unlockType: "password", unlockKey: "appium", avd: AVD_ANDROID_23_PASSWORD_UNLOCK });
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.createSession(caps));

          case 3:
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.adb.isScreenLocked());

          case 5:
            isLock = context$3$0.sent;

            isLock.should.equal(false);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should unlock an Android 19 device using a PATTERN', function callee$2$0() {
      var caps, isLock;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = _lodash2['default'].extend(defaultCaps, { unlockType: "pattern", unlockKey: "729856143", avd: AVD_ANDROID_19_PATTERN_UNLOCK });
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.createSession(caps));

          case 3:
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.adb.isScreenLocked());

          case 5:
            isLock = context$3$0.sent;

            isLock.should.equal(false);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should unlock an Android 23 device using a PATTERN', function callee$2$0() {
      var caps, isLock;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = _lodash2['default'].extend(defaultCaps, { unlockType: "pattern", unlockKey: "729856143", avd: AVD_ANDROID_23_PATTERN_UNLOCK });
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.createSession(caps));

          case 3:
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.adb.isScreenLocked());

          case 5:
            isLock = context$3$0.sent;

            isLock.should.equal(false);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should unlock an Android 23 device using FINGERPRINT', function callee$2$0() {
      var caps, isLock;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = _lodash2['default'].extend(defaultCaps, { unlockType: "pattern", unlockKey: "729856143", avd: AVD_ANDROID_23_FINGERPRINT_UNLOCK });
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.createSession(caps));

          case 3:
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.adb.isScreenLocked());

          case 5:
            isLock = context$3$0.sent;

            isLock.should.equal(false);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC91bmxvY2tlci1lMmUtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztzQkFDL0IsUUFBUTs7OztpQkFDSSxPQUFPOzs7O3VCQUNSLFdBQVc7Ozs7QUFFcEMsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixJQUFJLFdBQVcsR0FBRyxvQkFBRSxRQUFRLENBQUM7QUFDM0IsdUJBQXFCLEVBQUUsS0FBSztDQUM3Qix1QkFBZSxDQUFDOztBQUVqQixJQUFNLHlCQUF5QixHQUFHLDJCQUEyQixDQUFDO0FBQzlELElBQU0seUJBQXlCLEdBQUcsMkJBQTJCLENBQUM7QUFDOUQsSUFBTSw4QkFBOEIsR0FBRyxnQ0FBZ0MsQ0FBQztBQUN4RSxJQUFNLDhCQUE4QixHQUFHLGdDQUFnQyxDQUFDO0FBQ3hFLElBQU0sNkJBQTZCLEdBQUcsK0JBQStCLENBQUM7QUFDdEUsSUFBTSw2QkFBNkIsR0FBRywrQkFBK0IsQ0FBQztBQUN0RSxJQUFNLGlDQUFpQyxHQUFHLG1DQUFtQyxDQUFDOztBQUU5RSxRQUFRLENBQUMsY0FBYyxFQUFFLFlBQVk7QUFDbkMsTUFBSSxNQUFNLFlBQUEsQ0FBQzs7QUFFWCxVQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxZQUFZO0FBQ3RDLFVBQU0sQ0FBQyxZQUFZO0FBQ2pCLFlBQU0sR0FBRyxtQkFBbUIsQ0FBQztLQUM5QixDQUFDLENBQUM7QUFDSCxhQUFTLENBQUM7Ozs7OzZDQUNGLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7S0FDN0IsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLGdEQUFnRCxFQUFFO1VBQy9DLElBQUksRUFFSixNQUFNOzs7O0FBRk4sZ0JBQUksR0FBRyxvQkFBRSxNQUFNLENBQUMsV0FBVyxFQUFFLEVBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxTQUFT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LE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7S0FDNUIsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLHNEQUFzRCxFQUFFO1VBQ3JELElBQUksRUFFSixNQUFNOzs7O0FBRk4sZ0JBQUksR0FBRyxvQkFBRSxNQUFNLENBQUMsV0FBVyxFQUFFLEVBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBRSxpQ0FBaUMsRUFBQyxDQUFDOzs2Q0FDbkgsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7Ozs7NkNBQ2IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUU7OztBQUExQyxrQkFBTTs7QUFDVixrQkFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7S0FDNUIsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC91bmxvY2tlci1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLic7XG5pbXBvcnQgREVGQVVMVF9DQVBTIGZyb20gJy4vZGVzaXJlZCc7XG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmxldCBkZWZhdWx0Q2FwcyA9IF8uZGVmYXVsdHMoe1xuICBhbmRyb2lkSW5zdGFsbFRpbWVvdXQ6IDkwMDAwXG59LCBERUZBVUxUX0NBUFMpO1xuXG5jb25zdCBBVkRfQU5EUk9JRF8xOV9QSU5fVU5MT0NLID0gXCJBTkRST0lEX0FQSV8xOV9QSU5fVU5MT0NLXCI7XG5jb25zdCBBVkRfQU5EUk9JRF8yM19QSU5fVU5MT0NLID0gXCJBTkRST0lEX0FQSV8yM19QSU5fVU5MT0NLXCI7XG5jb25zdCBBVkRfQU5EUk9JRF8xOV9QQVNTV09SRF9VTkxPQ0sgPSBcIkFORFJPSURfQVBJXzE5X1BBU1NXT1JEX1VOTE9DS1wiO1xuY29uc3QgQVZEX0FORFJPSURfMjNfUEFTU1dPUkRfVU5MT0NLID0gXCJBTkRST0lEX0FQSV8yM19QQVNTV09SRF9VTkxPQ0tcIjtcbmNvbnN0IEFWRF9BTkRST0lEXzE5X1BBVFRFUk5fVU5MT0NLID0gXCJBTkRST0lEX0FQSV8xOV9QQVRURVJOX1VOTE9DS1wiO1xuY29uc3QgQVZEX0FORFJPSURfMjNfUEFUVEVSTl9VTkxPQ0sgPSBcIkFORFJPSURfQVBJXzIzX1BBVFRFUk5fVU5MT0NLXCI7XG5jb25zdCBBVkRfQU5EUk9JRF8yM19GSU5HRVJQUklOVF9VTkxPQ0sgPSBcIkFORFJPSURfQVBJXzIzX0ZJTkdFUlBSSU5UX1VOTE9DS1wiO1xuXG5kZXNjcmliZSgndW5sb2NrIHRlc3RzJywgZnVuY3Rpb24gKCkge1xuICBsZXQgZHJpdmVyO1xuXG4gIGRlc2NyaWJlLnNraXAoJ2Z1bmN0aW9uYWwnLCBmdW5jdGlvbiAoKSB7XG4gICAgYmVmb3JlKGZ1bmN0aW9uICgpIHtcbiAgICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gICAgfSk7XG4gICAgYWZ0ZXJFYWNoKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCB1bmxvY2sgYW4gQW5kcm9pZCAxOSBkZXZpY2UgdXNpbmcgYSBQSU4nLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgY2FwcyA9IF8uZXh0ZW5kKGRlZmF1bHRDYXBzLCB7dW5sb2NrVHlwZTogXCJwaW5cIiwgdW5sb2NrS2V5OiBcIjExMTFcIiwgYXZkOiBBVkRfQU5EUk9JRF8xOV9QSU5fVU5MT0NLfSk7XG4gICAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihjYXBzKTtcbiAgICAgIGxldCBpc0xvY2sgPSBhd2FpdCBkcml2ZXIuYWRiLmlzU2NyZWVuTG9ja2VkKCk7XG4gICAgICBpc0xvY2suc2hvdWxkLmVxdWFsKGZhbHNlKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHVubG9jayBhbiBBbmRyb2lkIDIzIGRldmljZSB1c2luZyBhIFBJTicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBjYXBzID0gXy5leHRlbmQoZGVmYXVsdENhcHMsIHt1bmxvY2tUeXBlOiBcInBpblwiLCB1bmxvY2tLZXk6IFwiMTExMVwiLCBhdmQ6IEFWRF9BTkRST0lEXzIzX1BJTl9VTkxPQ0t9KTtcbiAgICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGNhcHMpO1xuICAgICAgbGV0IGlzTG9jayA9IGF3YWl0IGRyaXZlci5hZGIuaXNTY3JlZW5Mb2NrZWQoKTtcbiAgICAgIGlzTG9jay5zaG91bGQuZXF1YWwoZmFsc2UpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgdW5sb2NrIGFuIEFuZHJvaWQgMTkgZGV2aWNlIHVzaW5nIGEgUEFTU1dPUkQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgY2FwcyA9IF8uZXh0ZW5kKGRlZmF1bHRDYXBzLCB7dW5sb2NrVHlwZTogXCJwYXNzd29yZFwiLCB1bmxvY2tLZXk6IFwiYXBwaXVtXCIsIGF2ZDogQVZEX0FORFJPSURfMTlfUEFTU1dPUkRfVU5MT0NLfSk7XG4gICAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihjYXBzKTtcbiAgICAgIGxldCBpc0xvY2sgPSBhd2FpdCBkcml2ZXIuYWRiLmlzU2NyZWVuTG9ja2VkKCk7XG4gICAgICBpc0xvY2suc2hvdWxkLmVxdWFsKGZhbHNlKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHVubG9jayBhbiBBbmRyb2lkIDIzIGRldmljZSB1c2luZyBhIFBBU1NXT1JEJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGNhcHMgPSBfLmV4dGVuZChkZWZhdWx0Q2Fwcywge3VubG9ja1R5cGU6IFwicGFzc3dvcmRcIiwgdW5sb2NrS2V5OiBcImFwcGl1bVwiLCBhdmQ6IEFWRF9BTkRST0lEXzIzX1BBU1NXT1JEX1VOTE9DS30pO1xuICAgICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oY2Fwcyk7XG4gICAgICBsZXQgaXNMb2NrID0gYXdhaXQgZHJpdmVyLmFkYi5pc1NjcmVlbkxvY2tlZCgpO1xuICAgICAgaXNMb2NrLnNob3VsZC5lcXVhbChmYWxzZSk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCB1bmxvY2sgYW4gQW5kcm9pZCAxOSBkZXZpY2UgdXNpbmcgYSBQQVRURVJOJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGNhcHMgPSBfLmV4dGVuZChkZWZhdWx0Q2Fwcywge3VubG9ja1R5cGU6IFwicGF0dGVyblwiLCB1bmxvY2tLZXk6IFwiNzI5ODU2MTQzXCIsIGF2ZDogQVZEX0FORFJPSURfMTlfUEFUVEVSTl9VTkxPQ0t9KTtcbiAgICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGNhcHMpO1xuICAgICAgbGV0IGlzTG9jayA9IGF3YWl0IGRyaXZlci5hZGIuaXNTY3JlZW5Mb2NrZWQoKTtcbiAgICAgIGlzTG9jay5zaG91bGQuZXF1YWwoZmFsc2UpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgdW5sb2NrIGFuIEFuZHJvaWQgMjMgZGV2aWNlIHVzaW5nIGEgUEFUVEVSTicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBjYXBzID0gXy5leHRlbmQoZGVmYXVsdENhcHMsIHt1bmxvY2tUeXBlOiBcInBhdHRlcm5cIiwgdW5sb2NrS2V5OiBcIjcyOTg1NjE0M1wiLCBhdmQ6IEFWRF9BTkRST0lEXzIzX1BBVFRFUk5fVU5MT0NLfSk7XG4gICAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihjYXBzKTtcbiAgICAgIGxldCBpc0xvY2sgPSBhd2FpdCBkcml2ZXIuYWRiLmlzU2NyZWVuTG9ja2VkKCk7XG4gICAgICBpc0xvY2suc2hvdWxkLmVxdWFsKGZhbHNlKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHVubG9jayBhbiBBbmRyb2lkIDIzIGRldmljZSB1c2luZyBGSU5HRVJQUklOVCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBjYXBzID0gXy5leHRlbmQoZGVmYXVsdENhcHMsIHt1bmxvY2tUeXBlOiBcInBhdHRlcm5cIiwgdW5sb2NrS2V5OiBcIjcyOTg1NjE0M1wiLCBhdmQ6IEFWRF9BTkRST0lEXzIzX0ZJTkdFUlBSSU5UX1VOTE9DS30pO1xuICAgICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oY2Fwcyk7XG4gICAgICBsZXQgaXNMb2NrID0gYXdhaXQgZHJpdmVyLmFkYi5pc1NjcmVlbkxvY2tlZCgpO1xuICAgICAgaXNMb2NrLnNob3VsZC5lcXVhbChmYWxzZSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uIn0=
