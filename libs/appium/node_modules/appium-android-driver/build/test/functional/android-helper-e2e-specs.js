'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _asyncbox = require('asyncbox');

var _libAndroidHelpers = require('../../lib/android-helpers');

var _libAndroidHelpers2 = _interopRequireDefault(_libAndroidHelpers);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var _desired = require('./desired');

var _helpers = require('./helpers');

var _teen_process = require('teen_process');

var _appiumUnlock = require('appium-unlock');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var opts = {
  app: _desired.app,
  appPackage: 'io.appium.android.apis',
  androidInstallTimeout: 90000
};

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('android-helpers e2e', function () {
  var adb = undefined;
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(_appiumAdb2['default'].createADB());

        case 2:
          adb = context$2$0.sent;

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  describe('installApk', function () {
    it('installs an apk by pushing it to the device then installing it from within', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            this.timeout(_helpers.MOCHA_TIMEOUT);

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(10, 500, function callee$3$0() {
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    context$4$0.next = 2;
                    return _regeneratorRuntime.awrap(adb.isAppInstalled(opts.appPackage));

                  case 2:
                    if (!context$4$0.sent) {
                      context$4$0.next = 5;
                      break;
                    }

                    context$4$0.next = 5;
                    return _regeneratorRuntime.awrap(adb.uninstallApk(opts.appPackage));

                  case 5:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, this);
            }));

          case 3:
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(adb.isAppInstalled(opts.appPackage).should.eventually.be['false']);

          case 5:
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].installApk(adb, opts));

          case 7:
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(adb.isAppInstalled(opts.appPackage).should.eventually.be['true']);

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('ensureDeviceLocale @skip-ci', function () {
    after(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].ensureDeviceLocale(adb, 'en', 'US'));

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should set device language and country', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].ensureDeviceLocale(adb, 'fr', 'FR'));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(adb.getApiLevel());

          case 4:
            context$3$0.t0 = context$3$0.sent;

            if (!(context$3$0.t0 < 23)) {
              context$3$0.next = 12;
              break;
            }

            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(adb.getDeviceLanguage().should.eventually.equal('fr'));

          case 8:
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(adb.getDeviceCountry().should.eventually.equal('FR'));

          case 10:
            context$3$0.next = 14;
            break;

          case 12:
            context$3$0.next = 14;
            return _regeneratorRuntime.awrap(adb.getDeviceLocale().should.eventually.equal('fr-FR'));

          case 14:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('pushSettingsApp', function () {
    var settingsPkg = 'io.appium.settings';
    it('should be able to upgrade from settings v1 to latest', function callee$2$0() {
      var settingsApkPath;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(adb.uninstallApk(settingsPkg));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap((0, _teen_process.exec)('npm', ['install', settingsPkg + '@2.0.0']));

          case 4:
            settingsApkPath = _path2['default'].resolve(__dirname, '..', '..', '..', 'node_modules', 'io.appium.settings', 'bin', 'settings_apk-debug.apk');
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(adb.install(settingsApkPath));

          case 7:
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap((0, _teen_process.exec)('npm', ['uninstall', settingsPkg]));

          case 9:
            context$3$0.next = 11;
            return _regeneratorRuntime.awrap((0, _teen_process.exec)('npm', ['install', settingsPkg]));

          case 11:
            context$3$0.next = 13;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].pushSettingsApp(adb, true));

          case 13:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('pushUnlock', function () {
    var unlockPkg = 'appium-unlock';
    var unlockBundle = 'io.appium.unlock';
    it('should be able to upgrade from unlock v0.0.1 to latest', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(adb.uninstallApk(unlockBundle));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap((0, _teen_process.exec)('npm', ['install', unlockPkg + '@0.0.1']));

          case 4:
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(adb.install(_appiumUnlock.path));

          case 6:
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap((0, _teen_process.exec)('npm', ['uninstall', unlockPkg]));

          case 8:
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap((0, _teen_process.exec)('npm', ['install', unlockPkg]));

          case 10:
            context$3$0.next = 12;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].pushUnlock(adb));

          case 12:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});

// this sometimes times out on Travis, so retry

// get and install old version of settings app

// old version has a different apk path, so manually enter
// otherwise pushing the app will fail because import will have the old
// path cached

// get latest version of settings app

// get and install old version of settings app

// get latest version of settings app
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9hbmRyb2lkLWhlbHBlci1lMmUtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7Ozt3QkFDZixVQUFVOztpQ0FDcEIsMkJBQTJCOzs7O3lCQUMvQixZQUFZOzs7O3VCQUNSLFdBQVc7O3VCQUNELFdBQVc7OzRCQUNwQixjQUFjOzs0QkFDRyxlQUFlOztvQkFDcEMsTUFBTTs7OztBQUd2QixJQUFJLElBQUksR0FBRztBQUNULEtBQUcsY0FBQTtBQUNILFlBQVUsRUFBRyx3QkFBd0I7QUFDckMsdUJBQXFCLEVBQUcsS0FBSztDQUM5QixDQUFDOztBQUVGLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsUUFBUSxDQUFDLHFCQUFxQixFQUFFLFlBQVk7QUFDMUMsTUFBSSxHQUFHLFlBQUEsQ0FBQztBQUNSLFFBQU0sQ0FBQzs7Ozs7MkNBQ08sdUJBQUksU0FBUyxFQUFFOzs7QUFBM0IsYUFBRzs7Ozs7OztHQUNKLENBQUMsQ0FBQztBQUNILFVBQVEsQ0FBQyxZQUFZLEVBQUUsWUFBWTtBQUNqQyxNQUFFLENBQUMsNEVBQTRFLEVBQUU7Ozs7QUFDL0UsZ0JBQUksQ0FBQyxPQUFPLHdCQUFlLENBQUM7Ozs2Q0FFdEIsNkJBQWMsRUFBRSxFQUFFLEdBQUcsRUFBRTs7Ozs7cURBQ2pCLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzs7Ozs7Ozs7O3FEQUVyQyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7Ozs7Ozs7YUFFMUMsQ0FBQzs7Ozs2Q0FDSSxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsU0FBTTs7Ozs2Q0FDOUQsK0JBQVEsVUFBVSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7Ozs7NkNBQzdCLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxRQUFLOzs7Ozs7O0tBQ3BFLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztBQUNILFVBQVEsQ0FBQyw2QkFBNkIsRUFBRSxZQUFZO0FBQ2xELFNBQUssQ0FBQzs7Ozs7NkNBQ0UsK0JBQVEsa0JBQWtCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7Ozs7Ozs7S0FDbEQsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLHdDQUF3QyxFQUFFOzs7Ozs2Q0FDckMsK0JBQVEsa0JBQWtCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7Ozs7NkNBRXZDLEdBQUcsQ0FBQyxXQUFXLEVBQUU7Ozs7O21DQUFHLEVBQUU7Ozs7Ozs2Q0FDeEIsR0FBRyxDQUFDLGlCQUFpQixFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDOzs7OzZDQUNyRCxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7OzZDQUVwRCxHQUFHLENBQUMsZUFBZSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDOzs7Ozs7O0tBRS9ELENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztBQUNILFVBQVEsQ0FBQyxpQkFBaUIsRUFBRSxZQUFZO0FBQ3RDLFFBQU0sV0FBVyxHQUFHLG9CQUFvQixDQUFDO0FBQ3pDLE1BQUUsQ0FBQyxzREFBc0QsRUFBRTtVQVFuRCxlQUFlOzs7Ozs2Q0FQZixHQUFHLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQzs7Ozs2Q0FHN0Isd0JBQUssS0FBSyxFQUFFLENBQUMsU0FBUyxFQUFLLFdBQVcsWUFBUyxDQUFDOzs7QUFJaEQsMkJBQWUsR0FBRyxrQkFBSyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUM5RCxjQUFjLEVBQUUsb0JBQW9CLEVBQUUsS0FBSyxFQUFFLHdCQUF3QixDQUFDOzs2Q0FFbEUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUM7Ozs7NkNBRzVCLHdCQUFLLEtBQUssRUFBRSxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQzs7Ozs2Q0FDdkMsd0JBQUssS0FBSyxFQUFFLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDOzs7OzZDQUVyQywrQkFBUSxlQUFlLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQzs7Ozs7OztLQUN6QyxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7QUFDSCxVQUFRLENBQUMsWUFBWSxFQUFFLFlBQVk7QUFDakMsUUFBTSxTQUFTLEdBQUcsZUFBZSxDQUFDO0FBQ2xDLFFBQU0sWUFBWSxHQUFHLGtCQUFrQixDQUFDO0FBQ3hDLE1BQUUsQ0FBQyx3REFBd0QsRUFBRTs7Ozs7NkNBQ3JELEdBQUcsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDOzs7OzZDQUc5Qix3QkFBSyxLQUFLLEVBQUUsQ0FBQyxTQUFTLEVBQUssU0FBUyxZQUFTLENBQUM7Ozs7NkNBQzlDLEdBQUcsQ0FBQyxPQUFPLG9CQUFlOzs7OzZDQUcxQix3QkFBSyxLQUFLLEVBQUUsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7Ozs7NkNBQ3JDLHdCQUFLLEtBQUssRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQzs7Ozs2Q0FFbkMsK0JBQVEsVUFBVSxDQUFDLEdBQUcsQ0FBQzs7Ozs7OztLQUM5QixDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2FuZHJvaWQtaGVscGVyLWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IHsgcmV0cnlJbnRlcnZhbCB9IGZyb20gJ2FzeW5jYm94JztcbmltcG9ydCBoZWxwZXJzIGZyb20gJy4uLy4uL2xpYi9hbmRyb2lkLWhlbHBlcnMnO1xuaW1wb3J0IEFEQiBmcm9tICdhcHBpdW0tYWRiJztcbmltcG9ydCB7IGFwcCB9IGZyb20gJy4vZGVzaXJlZCc7XG5pbXBvcnQgeyBNT0NIQV9USU1FT1VUIH0gZnJvbSAnLi9oZWxwZXJzJztcbmltcG9ydCB7IGV4ZWMgfSBmcm9tICd0ZWVuX3Byb2Nlc3MnO1xuaW1wb3J0IHsgcGF0aCBhcyB1bmxvY2tBcGtQYXRoIH0gZnJvbSAnYXBwaXVtLXVubG9jayc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuXG5sZXQgb3B0cyA9IHtcbiAgYXBwLFxuICBhcHBQYWNrYWdlIDogJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnLFxuICBhbmRyb2lkSW5zdGFsbFRpbWVvdXQgOiA5MDAwMFxufTtcblxuY2hhaS5zaG91bGQoKTtcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcblxuZGVzY3JpYmUoJ2FuZHJvaWQtaGVscGVycyBlMmUnLCBmdW5jdGlvbiAoKSB7XG4gIGxldCBhZGI7XG4gIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYWRiID0gYXdhaXQgQURCLmNyZWF0ZUFEQigpO1xuICB9KTtcbiAgZGVzY3JpYmUoJ2luc3RhbGxBcGsnLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ2luc3RhbGxzIGFuIGFwayBieSBwdXNoaW5nIGl0IHRvIHRoZSBkZXZpY2UgdGhlbiBpbnN0YWxsaW5nIGl0IGZyb20gd2l0aGluJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy50aW1lb3V0KE1PQ0hBX1RJTUVPVVQpO1xuXG4gICAgICBhd2FpdCByZXRyeUludGVydmFsKDEwLCA1MDAsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGF3YWl0IGFkYi5pc0FwcEluc3RhbGxlZChvcHRzLmFwcFBhY2thZ2UpKSB7XG4gICAgICAgICAgLy8gdGhpcyBzb21ldGltZXMgdGltZXMgb3V0IG9uIFRyYXZpcywgc28gcmV0cnlcbiAgICAgICAgICBhd2FpdCBhZGIudW5pbnN0YWxsQXBrKG9wdHMuYXBwUGFja2FnZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgYXdhaXQgYWRiLmlzQXBwSW5zdGFsbGVkKG9wdHMuYXBwUGFja2FnZSkuc2hvdWxkLmV2ZW50dWFsbHkuYmUuZmFsc2U7XG4gICAgICBhd2FpdCBoZWxwZXJzLmluc3RhbGxBcGsoYWRiLCBvcHRzKTtcbiAgICAgIGF3YWl0IGFkYi5pc0FwcEluc3RhbGxlZChvcHRzLmFwcFBhY2thZ2UpLnNob3VsZC5ldmVudHVhbGx5LmJlLnRydWU7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgnZW5zdXJlRGV2aWNlTG9jYWxlIEBza2lwLWNpJywgZnVuY3Rpb24gKCkge1xuICAgIGFmdGVyKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGF3YWl0IGhlbHBlcnMuZW5zdXJlRGV2aWNlTG9jYWxlKGFkYiwgJ2VuJywgJ1VTJyk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBzZXQgZGV2aWNlIGxhbmd1YWdlIGFuZCBjb3VudHJ5JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgYXdhaXQgaGVscGVycy5lbnN1cmVEZXZpY2VMb2NhbGUoYWRiLCAnZnInLCAnRlInKTtcblxuICAgICAgaWYgKGF3YWl0IGFkYi5nZXRBcGlMZXZlbCgpIDwgMjMpIHtcbiAgICAgICAgYXdhaXQgYWRiLmdldERldmljZUxhbmd1YWdlKCkuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwoJ2ZyJyk7XG4gICAgICAgIGF3YWl0IGFkYi5nZXREZXZpY2VDb3VudHJ5KCkuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwoJ0ZSJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhd2FpdCBhZGIuZ2V0RGV2aWNlTG9jYWxlKCkuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwoJ2ZyLUZSJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgncHVzaFNldHRpbmdzQXBwJywgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHNldHRpbmdzUGtnID0gJ2lvLmFwcGl1bS5zZXR0aW5ncyc7XG4gICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIHVwZ3JhZGUgZnJvbSBzZXR0aW5ncyB2MSB0byBsYXRlc3QnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBhd2FpdCBhZGIudW5pbnN0YWxsQXBrKHNldHRpbmdzUGtnKTtcblxuICAgICAgLy8gZ2V0IGFuZCBpbnN0YWxsIG9sZCB2ZXJzaW9uIG9mIHNldHRpbmdzIGFwcFxuICAgICAgYXdhaXQgZXhlYygnbnBtJywgWydpbnN0YWxsJywgYCR7c2V0dGluZ3NQa2d9QDIuMC4wYF0pO1xuICAgICAgLy8gb2xkIHZlcnNpb24gaGFzIGEgZGlmZmVyZW50IGFwayBwYXRoLCBzbyBtYW51YWxseSBlbnRlclxuICAgICAgLy8gb3RoZXJ3aXNlIHB1c2hpbmcgdGhlIGFwcCB3aWxsIGZhaWwgYmVjYXVzZSBpbXBvcnQgd2lsbCBoYXZlIHRoZSBvbGRcbiAgICAgIC8vIHBhdGggY2FjaGVkXG4gICAgICBjb25zdCBzZXR0aW5nc0Fwa1BhdGggPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4nLCAnLi4nLCAnLi4nLFxuICAgICAgICAnbm9kZV9tb2R1bGVzJywgJ2lvLmFwcGl1bS5zZXR0aW5ncycsICdiaW4nLCAnc2V0dGluZ3NfYXBrLWRlYnVnLmFwaycpO1xuXG4gICAgICBhd2FpdCBhZGIuaW5zdGFsbChzZXR0aW5nc0Fwa1BhdGgpO1xuXG4gICAgICAvLyBnZXQgbGF0ZXN0IHZlcnNpb24gb2Ygc2V0dGluZ3MgYXBwXG4gICAgICBhd2FpdCBleGVjKCducG0nLCBbJ3VuaW5zdGFsbCcsIHNldHRpbmdzUGtnXSk7XG4gICAgICBhd2FpdCBleGVjKCducG0nLCBbJ2luc3RhbGwnLCBzZXR0aW5nc1BrZ10pO1xuXG4gICAgICBhd2FpdCBoZWxwZXJzLnB1c2hTZXR0aW5nc0FwcChhZGIsIHRydWUpO1xuICAgIH0pO1xuICB9KTtcbiAgZGVzY3JpYmUoJ3B1c2hVbmxvY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgdW5sb2NrUGtnID0gJ2FwcGl1bS11bmxvY2snO1xuICAgIGNvbnN0IHVubG9ja0J1bmRsZSA9ICdpby5hcHBpdW0udW5sb2NrJztcbiAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gdXBncmFkZSBmcm9tIHVubG9jayB2MC4wLjEgdG8gbGF0ZXN0JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgYXdhaXQgYWRiLnVuaW5zdGFsbEFwayh1bmxvY2tCdW5kbGUpO1xuXG4gICAgICAvLyBnZXQgYW5kIGluc3RhbGwgb2xkIHZlcnNpb24gb2Ygc2V0dGluZ3MgYXBwXG4gICAgICBhd2FpdCBleGVjKCducG0nLCBbJ2luc3RhbGwnLCBgJHt1bmxvY2tQa2d9QDAuMC4xYF0pO1xuICAgICAgYXdhaXQgYWRiLmluc3RhbGwodW5sb2NrQXBrUGF0aCk7XG5cbiAgICAgIC8vIGdldCBsYXRlc3QgdmVyc2lvbiBvZiBzZXR0aW5ncyBhcHBcbiAgICAgIGF3YWl0IGV4ZWMoJ25wbScsIFsndW5pbnN0YWxsJywgdW5sb2NrUGtnXSk7XG4gICAgICBhd2FpdCBleGVjKCducG0nLCBbJ2luc3RhbGwnLCB1bmxvY2tQa2ddKTtcblxuICAgICAgYXdhaXQgaGVscGVycy5wdXNoVW5sb2NrKGFkYik7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uIn0=
