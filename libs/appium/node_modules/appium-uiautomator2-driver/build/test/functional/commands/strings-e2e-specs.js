'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _desired = require('../desired');

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var _helpersSession = require('../helpers/session');

var _helpersHelpers = require('../helpers/helpers');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumAndroidDriver = require('appium-android-driver');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('strings', function () {
  var driver = undefined;

  describe('specific language', function () {
    before(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            // Don't run these tests on TestObject. On TO, we don't have access to the .apk
            // which is necessary for extracting the app strings
            if (process.env.TESTOBJECT_E2E_TESTS) {
              this.skip();
            }
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(_desired.APIDEMOS_CAPS));

          case 3:
            driver = context$3$0.sent;

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    after(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            if (process.env.TESTOBJECT_E2E_TESTS) {
              context$3$0.next = 3;
              break;
            }

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.quit());

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('should return app strings', function callee$2$0() {
      var strings;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.getAppStrings('en'));

          case 2:
            strings = context$3$0.sent;

            strings.hello_world.should.equal('Hello, World!');

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('should return app strings for different language', function callee$2$0() {
      var strings;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.getAppStrings('fr'));

          case 2:
            strings = context$3$0.sent;

            strings.hello_world.should.equal('Bonjour, Monde!');

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('device language', function () {
    var initialLocale = undefined;
    var adb = undefined;
    before(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            // Don't test ADB on test object
            if (process.env.TESTOBJECT_E2E_TESTS) {
              this.skip();
            }
            // restarting doesn't work on Android 7+
            adb = new _appiumAdb2['default']();
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap((0, _helpersHelpers.getLocale)(adb));

          case 4:
            initialLocale = context$3$0.sent;

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    afterEach(function callee$2$0() {
      var _initialLocale$split, _initialLocale$split2, language, country;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            if (!driver) {
              context$3$0.next = 17;
              break;
            }

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.getApiLevel());

          case 3:
            context$3$0.t0 = context$3$0.sent;

            if (!(context$3$0.t0 > 23)) {
              context$3$0.next = 13;
              break;
            }

            _initialLocale$split = initialLocale.split("-");
            _initialLocale$split2 = _slicedToArray(_initialLocale$split, 2);
            language = _initialLocale$split2[0];
            country = _initialLocale$split2[1];
            context$3$0.next = 11;
            return _regeneratorRuntime.awrap(_appiumAndroidDriver.androidHelpers.ensureDeviceLocale(adb, language, country));

          case 11:
            context$3$0.next = 15;
            break;

          case 13:
            context$3$0.next = 15;
            return _regeneratorRuntime.awrap(_appiumAndroidDriver.androidHelpers.ensureDeviceLocale(adb, null, initialLocale));

          case 15:
            context$3$0.next = 17;
            return _regeneratorRuntime.awrap(driver.quit());

          case 17:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('should return app strings with default locale/language', function callee$2$0() {
      var strings;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(_desired.APIDEMOS_CAPS));

          case 2:
            driver = context$3$0.sent;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.getAppStrings());

          case 5:
            strings = context$3$0.sent;

            strings.hello_world.should.equal('Hello, World!');

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should return app strings when language/locale set @skip-ci', function callee$2$0() {
      var strings;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            if (process.env.TESTOBJECT_E2E_TESTS) {
              this.skip();
            }
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(_lodash2['default'].defaults({
              language: 'fr',
              locale: 'CA'
            }, _desired.APIDEMOS_CAPS)));

          case 3:
            driver = context$3$0.sent;
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(driver.getAppStrings());

          case 6:
            strings = context$3$0.sent;

            strings.hello_world.should.equal('Bonjour, Monde!');

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9zdHJpbmdzLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7dUJBQ2YsWUFBWTs7eUJBQzFCLFlBQVk7Ozs7OEJBQ0Qsb0JBQW9COzs4QkFDckIsb0JBQW9COztzQkFDaEMsUUFBUTs7OzttQ0FDUyx1QkFBdUI7O0FBR3RELGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsUUFBUSxDQUFDLFNBQVMsRUFBRSxZQUFZO0FBQzlCLE1BQUksTUFBTSxZQUFBLENBQUM7O0FBRVgsVUFBUSxDQUFDLG1CQUFtQixFQUFFLFlBQVk7QUFDeEMsVUFBTSxDQUFDOzs7Ozs7QUFHTCxnQkFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFO0FBQ3BDLGtCQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDYjs7NkNBQ2MsdURBQXlCOzs7QUFBeEMsa0JBQU07Ozs7Ozs7S0FDUCxDQUFDLENBQUM7QUFDSCxTQUFLLENBQUM7Ozs7Z0JBQ0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0I7Ozs7Ozs2Q0FDN0IsTUFBTSxDQUFDLElBQUksRUFBRTs7Ozs7OztLQUV0QixDQUFDLENBQUM7O0FBRUgsTUFBRSxDQUFDLDJCQUEyQixFQUFFO1VBQzFCLE9BQU87Ozs7OzZDQUFTLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDOzs7QUFBMUMsbUJBQU87O0FBQ1gsbUJBQU8sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQzs7Ozs7OztLQUNuRCxDQUFDLENBQUM7O0FBRUgsTUFBRSxDQUFDLGtEQUFrRCxFQUFFO1VBQ2pELE9BQU87Ozs7OzZDQUFTLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDOzs7QUFBMUMsbUJBQU87O0FBQ1gsbUJBQU8sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDOzs7Ozs7O0tBQ3JELENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQzs7QUFFSCxVQUFRLENBQUMsaUJBQWlCLEVBQUUsWUFBWTtBQUN0QyxRQUFJLGFBQWEsWUFBQSxDQUFDO0FBQ2xCLFFBQUksR0FBRyxZQUFBLENBQUM7QUFDUixVQUFNLENBQUM7Ozs7O0FBRUwsZ0JBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRTtBQUNwQyxrQkFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2I7O0FBRUQsZUFBRyxHQUFHLDRCQUFTLENBQUM7OzZDQUNNLCtCQUFVLEdBQUcsQ0FBQzs7O0FBQXBDLHlCQUFhOzs7Ozs7O0tBQ2QsQ0FBQyxDQUFDO0FBQ0gsYUFBUyxDQUFDO3VEQUdDLFFBQVEsRUFBRSxPQUFPOzs7OztpQkFGdEIsTUFBTTs7Ozs7OzZDQUNFLEdBQUcsQ0FBQyxXQUFXLEVBQUU7Ozs7O21DQUFHLEVBQUU7Ozs7O21DQUNKLGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDOztBQUE3QyxvQkFBUTtBQUFFLG1CQUFPOzs2Q0FDaEIsb0NBQWUsa0JBQWtCLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUM7Ozs7Ozs7OzZDQUV6RCxvQ0FBZSxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQzs7Ozs2Q0FHN0QsTUFBTSxDQUFDLElBQUksRUFBRTs7Ozs7OztLQUV0QixDQUFDLENBQUM7O0FBRUgsTUFBRSxDQUFDLHdEQUF3RCxFQUFFO1VBR3ZELE9BQU87Ozs7OzZDQUZJLHVEQUF5Qjs7O0FBQXhDLGtCQUFNOzs2Q0FFYyxNQUFNLENBQUMsYUFBYSxFQUFFOzs7QUFBdEMsbUJBQU87O0FBQ1gsbUJBQU8sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQzs7Ozs7OztLQUNuRCxDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsNkRBQTZELEVBQUU7VUFTNUQsT0FBTzs7OztBQVJYLGdCQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUU7QUFDcEMsa0JBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNiOzs2Q0FDYyxnQ0FBVyxvQkFBRSxRQUFRLENBQUM7QUFDbkMsc0JBQVEsRUFBRSxJQUFJO0FBQ2Qsb0JBQU0sRUFBRSxJQUFJO2FBQ2IseUJBQWdCLENBQUM7OztBQUhsQixrQkFBTTs7NkNBS2MsTUFBTSxDQUFDLGFBQWEsRUFBRTs7O0FBQXRDLG1CQUFPOztBQUNYLG1CQUFPLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQzs7Ozs7OztLQUNyRCxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2NvbW1hbmRzL3N0cmluZ3MtZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgeyBBUElERU1PU19DQVBTIH0gZnJvbSAnLi4vZGVzaXJlZCc7XG5pbXBvcnQgQURCIGZyb20gJ2FwcGl1bS1hZGInO1xuaW1wb3J0IHsgaW5pdERyaXZlciB9IGZyb20gJy4uL2hlbHBlcnMvc2Vzc2lvbic7XG5pbXBvcnQgeyBnZXRMb2NhbGUgfSBmcm9tICcuLi9oZWxwZXJzL2hlbHBlcnMnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IGFuZHJvaWRIZWxwZXJzIH0gZnJvbSAnYXBwaXVtLWFuZHJvaWQtZHJpdmVyJztcblxuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5kZXNjcmliZSgnc3RyaW5ncycsIGZ1bmN0aW9uICgpIHtcbiAgbGV0IGRyaXZlcjtcblxuICBkZXNjcmliZSgnc3BlY2lmaWMgbGFuZ3VhZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIERvbid0IHJ1biB0aGVzZSB0ZXN0cyBvbiBUZXN0T2JqZWN0LiBPbiBUTywgd2UgZG9uJ3QgaGF2ZSBhY2Nlc3MgdG8gdGhlIC5hcGtcbiAgICAgIC8vIHdoaWNoIGlzIG5lY2Vzc2FyeSBmb3IgZXh0cmFjdGluZyB0aGUgYXBwIHN0cmluZ3NcbiAgICAgIGlmIChwcm9jZXNzLmVudi5URVNUT0JKRUNUX0UyRV9URVNUUykge1xuICAgICAgICB0aGlzLnNraXAoKTtcbiAgICAgIH1cbiAgICAgIGRyaXZlciA9IGF3YWl0IGluaXREcml2ZXIoQVBJREVNT1NfQ0FQUyk7XG4gICAgfSk7XG4gICAgYWZ0ZXIoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCFwcm9jZXNzLmVudi5URVNUT0JKRUNUX0UyRV9URVNUUykge1xuICAgICAgICBhd2FpdCBkcml2ZXIucXVpdCgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gYXBwIHN0cmluZ3MnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgc3RyaW5ncyA9IGF3YWl0IGRyaXZlci5nZXRBcHBTdHJpbmdzKCdlbicpO1xuICAgICAgc3RyaW5ncy5oZWxsb193b3JsZC5zaG91bGQuZXF1YWwoJ0hlbGxvLCBXb3JsZCEnKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGFwcCBzdHJpbmdzIGZvciBkaWZmZXJlbnQgbGFuZ3VhZ2UnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgc3RyaW5ncyA9IGF3YWl0IGRyaXZlci5nZXRBcHBTdHJpbmdzKCdmcicpO1xuICAgICAgc3RyaW5ncy5oZWxsb193b3JsZC5zaG91bGQuZXF1YWwoJ0JvbmpvdXIsIE1vbmRlIScpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnZGV2aWNlIGxhbmd1YWdlJywgZnVuY3Rpb24gKCkge1xuICAgIGxldCBpbml0aWFsTG9jYWxlO1xuICAgIGxldCBhZGI7XG4gICAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIERvbid0IHRlc3QgQURCIG9uIHRlc3Qgb2JqZWN0XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuVEVTVE9CSkVDVF9FMkVfVEVTVFMpIHtcbiAgICAgICAgdGhpcy5za2lwKCk7XG4gICAgICB9XG4gICAgICAvLyByZXN0YXJ0aW5nIGRvZXNuJ3Qgd29yayBvbiBBbmRyb2lkIDcrXG4gICAgICBhZGIgPSBuZXcgQURCKCk7XG4gICAgICBpbml0aWFsTG9jYWxlID0gYXdhaXQgZ2V0TG9jYWxlKGFkYik7XG4gICAgfSk7XG4gICAgYWZ0ZXJFYWNoKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChkcml2ZXIpIHtcbiAgICAgICAgaWYgKGF3YWl0IGFkYi5nZXRBcGlMZXZlbCgpID4gMjMpIHtcbiAgICAgICAgICBsZXQgW2xhbmd1YWdlLCBjb3VudHJ5XSA9IGluaXRpYWxMb2NhbGUuc3BsaXQoXCItXCIpO1xuICAgICAgICAgIGF3YWl0IGFuZHJvaWRIZWxwZXJzLmVuc3VyZURldmljZUxvY2FsZShhZGIsIGxhbmd1YWdlLCBjb3VudHJ5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhd2FpdCBhbmRyb2lkSGVscGVycy5lbnN1cmVEZXZpY2VMb2NhbGUoYWRiLCBudWxsLCBpbml0aWFsTG9jYWxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IGRyaXZlci5xdWl0KCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBhcHAgc3RyaW5ncyB3aXRoIGRlZmF1bHQgbG9jYWxlL2xhbmd1YWdlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgZHJpdmVyID0gYXdhaXQgaW5pdERyaXZlcihBUElERU1PU19DQVBTKTtcblxuICAgICAgbGV0IHN0cmluZ3MgPSBhd2FpdCBkcml2ZXIuZ2V0QXBwU3RyaW5ncygpO1xuICAgICAgc3RyaW5ncy5oZWxsb193b3JsZC5zaG91bGQuZXF1YWwoJ0hlbGxvLCBXb3JsZCEnKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHJldHVybiBhcHAgc3RyaW5ncyB3aGVuIGxhbmd1YWdlL2xvY2FsZSBzZXQgQHNraXAtY2knLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuVEVTVE9CSkVDVF9FMkVfVEVTVFMpIHtcbiAgICAgICAgdGhpcy5za2lwKCk7XG4gICAgICB9XG4gICAgICBkcml2ZXIgPSBhd2FpdCBpbml0RHJpdmVyKF8uZGVmYXVsdHMoe1xuICAgICAgICBsYW5ndWFnZTogJ2ZyJyxcbiAgICAgICAgbG9jYWxlOiAnQ0EnLFxuICAgICAgfSwgQVBJREVNT1NfQ0FQUykpO1xuXG4gICAgICBsZXQgc3RyaW5ncyA9IGF3YWl0IGRyaXZlci5nZXRBcHBTdHJpbmdzKCk7XG4gICAgICBzdHJpbmdzLmhlbGxvX3dvcmxkLnNob3VsZC5lcXVhbCgnQm9uam91ciwgTW9uZGUhJyk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uIn0=
