'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var _helpersSession = require('../helpers/session');

var _desired = require('../desired');

var _appiumAndroidDriver = require('appium-android-driver');

var _helpersHelpers = require('../helpers/helpers');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

// Skip ci since the command restart emulator when the test device's API is 22-.
describe('Localization - locale @skip-ci @skip-real-device', function () {
  var initialLocale = undefined;
  var adb = undefined;

  before(function callee$1$0() {
    var adb;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          if (process.env.TESTOBJECT_E2E_TESTS) {
            this.skip();
          }

          // restarting doesn't work on Android 7+
          adb = new _appiumAdb2['default']();
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(adb.getApiLevel());

        case 4:
          context$2$0.t0 = context$2$0.sent;

          if (!(context$2$0.t0 > 23)) {
            context$2$0.next = 7;
            break;
          }

          return context$2$0.abrupt('return', this.skip());

        case 7:
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap((0, _helpersHelpers.getLocale)(adb));

        case 9:
          initialLocale = context$2$0.sent;

        case 10:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  var driver = undefined;
  after(function callee$1$0() {
    var _initialLocale$split, _initialLocale$split2, language, country;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          if (!driver) {
            context$2$0.next = 17;
            break;
          }

          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(adb.getApiLevel());

        case 3:
          context$2$0.t0 = context$2$0.sent;

          if (!(context$2$0.t0 > 23)) {
            context$2$0.next = 13;
            break;
          }

          _initialLocale$split = initialLocale.split("-");
          _initialLocale$split2 = _slicedToArray(_initialLocale$split, 2);
          language = _initialLocale$split2[0];
          country = _initialLocale$split2[1];
          context$2$0.next = 11;
          return _regeneratorRuntime.awrap(_appiumAndroidDriver.androidHelpers.ensureDeviceLocale(driver.adb, language, country));

        case 11:
          context$2$0.next = 15;
          break;

        case 13:
          context$2$0.next = 15;
          return _regeneratorRuntime.awrap(_appiumAndroidDriver.androidHelpers.ensureDeviceLocale(driver.adb, null, initialLocale));

        case 15:
          context$2$0.next = 17;
          return _regeneratorRuntime.awrap(driver.quit());

        case 17:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should start as FR', function callee$1$0() {
    var frCaps;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          frCaps = _Object$assign({}, _desired.APIDEMOS_CAPS, {
            language: 'fr',
            locale: 'FR'
          });
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(frCaps));

        case 3:
          driver = context$2$0.sent;
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap((0, _helpersHelpers.getLocale)(driver.adb).should.eventually.equal('fr-FR'));

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should start as US', function callee$1$0() {
    var usCaps;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          usCaps = _Object$assign({}, _desired.APIDEMOS_CAPS, {
            language: 'en',
            locale: 'US'
          });
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(usCaps));

        case 3:
          driver = context$2$0.sent;
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap((0, _helpersHelpers.getLocale)(driver.adb).should.eventually.equal('en-US'));

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});
//eslint-disable-line curly
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9sYW5ndWFnZS1lMmUtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7eUJBQzdCLFlBQVk7Ozs7OEJBQ0Qsb0JBQW9COzt1QkFDakIsWUFBWTs7bUNBQ1gsdUJBQXVCOzs4QkFDNUIsb0JBQW9COztBQUc5QyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7OztBQUd6QixRQUFRLENBQUMsa0RBQWtELEVBQUUsWUFBWTtBQUN2RSxNQUFJLGFBQWEsWUFBQSxDQUFDO0FBQ2xCLE1BQUksR0FBRyxZQUFBLENBQUM7O0FBRVIsUUFBTSxDQUFDO1FBTUQsR0FBRzs7OztBQUxQLGNBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRTtBQUNwQyxnQkFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1dBQ2I7OztBQUdHLGFBQUcsR0FBRyw0QkFBUzs7MkNBQ1QsR0FBRyxDQUFDLFdBQVcsRUFBRTs7Ozs7aUNBQUcsRUFBRTs7Ozs7OENBQVMsSUFBSSxDQUFDLElBQUksRUFBRTs7OzsyQ0FFOUIsK0JBQVUsR0FBRyxDQUFDOzs7QUFBcEMsdUJBQWE7Ozs7Ozs7R0FDZCxDQUFDLENBQUM7O0FBRUgsTUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLE9BQUssQ0FBQztxREFHSyxRQUFRLEVBQUUsT0FBTzs7Ozs7ZUFGdEIsTUFBTTs7Ozs7OzJDQUNFLEdBQUcsQ0FBQyxXQUFXLEVBQUU7Ozs7O2lDQUFHLEVBQUU7Ozs7O2lDQUNKLGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDOztBQUE3QyxrQkFBUTtBQUFFLGlCQUFPOzsyQ0FDaEIsb0NBQWUsa0JBQWtCLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDOzs7Ozs7OzsyQ0FFaEUsb0NBQWUsa0JBQWtCLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDOzs7OzJDQUVwRSxNQUFNLENBQUMsSUFBSSxFQUFFOzs7Ozs7O0dBRXRCLENBQUMsQ0FBQzs7QUFFSCxJQUFFLENBQUMsb0JBQW9CLEVBQUU7UUFDbkIsTUFBTTs7OztBQUFOLGdCQUFNLEdBQUcsZUFBYyxFQUFFLDBCQUFpQjtBQUM1QyxvQkFBUSxFQUFFLElBQUk7QUFDZCxrQkFBTSxFQUFFLElBQUk7V0FDYixDQUFDOzsyQ0FDYSxnQ0FBVyxNQUFNLENBQUM7OztBQUFqQyxnQkFBTTs7MkNBQ0EsK0JBQVUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQzs7Ozs7OztHQUM3RCxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsb0JBQW9CLEVBQUU7UUFDbkIsTUFBTTs7OztBQUFOLGdCQUFNLEdBQUcsZUFBYyxFQUFFLDBCQUFpQjtBQUM1QyxvQkFBUSxFQUFFLElBQUk7QUFDZCxrQkFBTSxFQUFFLElBQUk7V0FDYixDQUFDOzsyQ0FDYSxnQ0FBVyxNQUFNLENBQUM7OztBQUFqQyxnQkFBTTs7MkNBQ0EsK0JBQVUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQzs7Ozs7OztHQUM3RCxDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2NvbW1hbmRzL2xhbmd1YWdlLWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IEFEQiBmcm9tICdhcHBpdW0tYWRiJztcbmltcG9ydCB7IGluaXREcml2ZXIgfSBmcm9tICcuLi9oZWxwZXJzL3Nlc3Npb24nO1xuaW1wb3J0IHsgQVBJREVNT1NfQ0FQUyB9IGZyb20gJy4uL2Rlc2lyZWQnO1xuaW1wb3J0IHsgYW5kcm9pZEhlbHBlcnMgfSBmcm9tICdhcHBpdW0tYW5kcm9pZC1kcml2ZXInO1xuaW1wb3J0IHsgZ2V0TG9jYWxlIH0gZnJvbSAnLi4vaGVscGVycy9oZWxwZXJzJztcblxuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG4vLyBTa2lwIGNpIHNpbmNlIHRoZSBjb21tYW5kIHJlc3RhcnQgZW11bGF0b3Igd2hlbiB0aGUgdGVzdCBkZXZpY2UncyBBUEkgaXMgMjItLlxuZGVzY3JpYmUoJ0xvY2FsaXphdGlvbiAtIGxvY2FsZSBAc2tpcC1jaSBAc2tpcC1yZWFsLWRldmljZScsIGZ1bmN0aW9uICgpIHtcbiAgbGV0IGluaXRpYWxMb2NhbGU7XG4gIGxldCBhZGI7XG5cbiAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuVEVTVE9CSkVDVF9FMkVfVEVTVFMpIHtcbiAgICAgIHRoaXMuc2tpcCgpO1xuICAgIH1cblxuICAgIC8vIHJlc3RhcnRpbmcgZG9lc24ndCB3b3JrIG9uIEFuZHJvaWQgNytcbiAgICBsZXQgYWRiID0gbmV3IEFEQigpO1xuICAgIGlmIChhd2FpdCBhZGIuZ2V0QXBpTGV2ZWwoKSA+IDIzKSByZXR1cm4gdGhpcy5za2lwKCk7IC8vZXNsaW50LWRpc2FibGUtbGluZSBjdXJseVxuXG4gICAgaW5pdGlhbExvY2FsZSA9IGF3YWl0IGdldExvY2FsZShhZGIpO1xuICB9KTtcblxuICBsZXQgZHJpdmVyO1xuICBhZnRlcihhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGRyaXZlcikge1xuICAgICAgaWYgKGF3YWl0IGFkYi5nZXRBcGlMZXZlbCgpID4gMjMpIHtcbiAgICAgICAgbGV0IFtsYW5ndWFnZSwgY291bnRyeV0gPSBpbml0aWFsTG9jYWxlLnNwbGl0KFwiLVwiKTtcbiAgICAgICAgYXdhaXQgYW5kcm9pZEhlbHBlcnMuZW5zdXJlRGV2aWNlTG9jYWxlKGRyaXZlci5hZGIsIGxhbmd1YWdlLCBjb3VudHJ5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF3YWl0IGFuZHJvaWRIZWxwZXJzLmVuc3VyZURldmljZUxvY2FsZShkcml2ZXIuYWRiLCBudWxsLCBpbml0aWFsTG9jYWxlKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IGRyaXZlci5xdWl0KCk7XG4gICAgfVxuICB9KTtcblxuICBpdCgnc2hvdWxkIHN0YXJ0IGFzIEZSJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBmckNhcHMgPSBPYmplY3QuYXNzaWduKHt9LCBBUElERU1PU19DQVBTLCB7XG4gICAgICBsYW5ndWFnZTogJ2ZyJyxcbiAgICAgIGxvY2FsZTogJ0ZSJyxcbiAgICB9KTtcbiAgICBkcml2ZXIgPSBhd2FpdCBpbml0RHJpdmVyKGZyQ2Fwcyk7XG4gICAgYXdhaXQgZ2V0TG9jYWxlKGRyaXZlci5hZGIpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdmci1GUicpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBzdGFydCBhcyBVUycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgdXNDYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgQVBJREVNT1NfQ0FQUywge1xuICAgICAgbGFuZ3VhZ2U6ICdlbicsXG4gICAgICBsb2NhbGU6ICdVUycsXG4gICAgfSk7XG4gICAgZHJpdmVyID0gYXdhaXQgaW5pdERyaXZlcih1c0NhcHMpO1xuICAgIGF3YWl0IGdldExvY2FsZShkcml2ZXIuYWRiKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCgnZW4tVVMnKTtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4ifQ==
