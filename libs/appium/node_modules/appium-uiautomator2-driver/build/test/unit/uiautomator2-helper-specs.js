'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _libHelpers = require('../../lib/helpers');

var helpers = _interopRequireWildcard(_libHelpers);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var _appiumTestSupport = require('appium-test-support');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('UiAutomator2 Driver Helpers', function () {
  var adb = new _appiumAdb2['default']();

  describe('ensureInternetPermissionForApp', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    var app = '/path/to/app.apk';
    afterEach(function () {
      mocks.verify();
    });
    it('should do nothing if app has internet perms', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('hasInternetPermissionFromManifest').once().withExactArgs(app).returns(true);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(helpers.ensureInternetPermissionForApp(adb, app));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should throw an error if app does not have internet perms', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('hasInternetPermissionFromManifest').once().withExactArgs(app).returns(false);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(helpers.ensureInternetPermissionForApp(adb, app).should.be.rejectedWith(/INTERNET/));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  }));
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC91aWF1dG9tYXRvcjItaGVscGVyLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OzswQkFDcEIsbUJBQW1COztJQUFoQyxPQUFPOzt5QkFDSCxZQUFZOzs7O2lDQUNGLHFCQUFxQjs7QUFHL0Msa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixRQUFRLENBQUMsNkJBQTZCLEVBQUUsWUFBWTtBQUNsRCxNQUFNLEdBQUcsR0FBRyw0QkFBUyxDQUFDOztBQUV0QixVQUFRLENBQUMsZ0NBQWdDLEVBQUUsa0NBQVUsRUFBQyxHQUFHLEVBQUgsR0FBRyxFQUFDLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDckUsUUFBTSxHQUFHLEdBQUcsa0JBQWtCLENBQUM7QUFDL0IsYUFBUyxDQUFDLFlBQVk7QUFDcEIsV0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ2hCLENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQyw2Q0FBNkMsRUFBRTs7OztBQUNoRCxpQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsbUNBQW1DLENBQUMsQ0FDbkQsSUFBSSxFQUFFLENBQ04sYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7OzZDQUNYLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDOzs7Ozs7O0tBQ3ZELENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQywyREFBMkQsRUFBRTs7OztBQUM5RCxpQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsbUNBQW1DLENBQUMsQ0FDbkQsSUFBSSxFQUFFLENBQ04sYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUNsQixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7OzZDQUNaLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQ25ELE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQzs7Ozs7OztLQUN0QyxDQUFDLENBQUM7R0FDSixDQUFDLENBQUMsQ0FBQztDQUNMLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3VuaXQvdWlhdXRvbWF0b3IyLWhlbHBlci1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0ICogYXMgaGVscGVycyBmcm9tICcuLi8uLi9saWIvaGVscGVycyc7XG5pbXBvcnQgQURCIGZyb20gJ2FwcGl1bS1hZGInO1xuaW1wb3J0IHsgd2l0aE1vY2tzIH0gZnJvbSAnYXBwaXVtLXRlc3Qtc3VwcG9ydCc7XG5cblxuY2hhaS5zaG91bGQoKTtcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcblxuZGVzY3JpYmUoJ1VpQXV0b21hdG9yMiBEcml2ZXIgSGVscGVycycsIGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgYWRiID0gbmV3IEFEQigpO1xuXG4gIGRlc2NyaWJlKCdlbnN1cmVJbnRlcm5ldFBlcm1pc3Npb25Gb3JBcHAnLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xuICAgIGNvbnN0IGFwcCA9ICcvcGF0aC90by9hcHAuYXBrJztcbiAgICBhZnRlckVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgbW9ja3MudmVyaWZ5KCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBkbyBub3RoaW5nIGlmIGFwcCBoYXMgaW50ZXJuZXQgcGVybXMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnaGFzSW50ZXJuZXRQZXJtaXNzaW9uRnJvbU1hbmlmZXN0JylcbiAgICAgICAgLm9uY2UoKVxuICAgICAgICAud2l0aEV4YWN0QXJncyhhcHApXG4gICAgICAgIC5yZXR1cm5zKHRydWUpO1xuICAgICAgYXdhaXQgaGVscGVycy5lbnN1cmVJbnRlcm5ldFBlcm1pc3Npb25Gb3JBcHAoYWRiLCBhcHApO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgdGhyb3cgYW4gZXJyb3IgaWYgYXBwIGRvZXMgbm90IGhhdmUgaW50ZXJuZXQgcGVybXMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnaGFzSW50ZXJuZXRQZXJtaXNzaW9uRnJvbU1hbmlmZXN0JylcbiAgICAgICAgLm9uY2UoKVxuICAgICAgICAud2l0aEV4YWN0QXJncyhhcHApXG4gICAgICAgIC5yZXR1cm5zKGZhbHNlKTtcbiAgICAgIGF3YWl0IGhlbHBlcnMuZW5zdXJlSW50ZXJuZXRQZXJtaXNzaW9uRm9yQXBwKGFkYiwgYXBwKVxuICAgICAgICAuc2hvdWxkLmJlLnJlamVjdGVkV2l0aCgvSU5URVJORVQvKTtcbiAgICB9KTtcbiAgfSkpO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uIn0=
