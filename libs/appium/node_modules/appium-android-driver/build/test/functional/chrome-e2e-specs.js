'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _2 = require('../..');

var _3 = _interopRequireDefault(_2);

var _helpers = require('./helpers');

var _desired = require('./desired');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var avd = process.env.ANDROID_25_AVD || 'Nexus_5_API_25';
var capabilities = _lodash2['default'].defaults({
  avd: avd,
  platformVersion: "7.1",
  chromeOptions: {
    args: ["--no-first-run"]
  }
}, _desired.CHROME_CAPS);

describe('createSession', function () {
  var driver = undefined;
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap((0, _helpers.ensureAVDExists)(this, capabilities.avd));

        case 2:
          if (context$2$0.sent) {
            context$2$0.next = 4;
            break;
          }

          return context$2$0.abrupt('return');

        case 4:

          driver = new _3['default']();

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  afterEach(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.deleteSession());

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should start chrome and dismiss the welcome dialog', function callee$1$0() {
    var appActivity;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.createSession(capabilities));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.getCurrentActivity());

        case 4:
          appActivity = context$2$0.sent;

          appActivity.should.not.equal("org.chromium.chrome.browser.firstrun.FirstRunActivity");

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jaHJvbWUtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7aUJBQ25CLE9BQU87Ozs7dUJBQ0QsV0FBVzs7dUJBQ2YsV0FBVzs7c0JBQ3pCLFFBQVE7Ozs7QUFHdEIsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixJQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsSUFBSSxnQkFBZ0IsQ0FBQztBQUMzRCxJQUFNLFlBQVksR0FBRyxvQkFBRSxRQUFRLENBQUM7QUFDOUIsS0FBRyxFQUFILEdBQUc7QUFDSCxpQkFBZSxFQUFFLEtBQUs7QUFDdEIsZUFBYSxFQUFFO0FBQ2IsUUFBSSxFQUFFLENBQUMsZ0JBQWdCLENBQUM7R0FDekI7Q0FDRix1QkFBYyxDQUFDOztBQUVoQixRQUFRLENBQUMsZUFBZSxFQUFFLFlBQVk7QUFDcEMsTUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLFFBQU0sQ0FBQzs7Ozs7MkNBQ00sOEJBQWdCLElBQUksRUFBRSxZQUFZLENBQUMsR0FBRyxDQUFDOzs7Ozs7Ozs7Ozs7QUFJbEQsZ0JBQU0sR0FBRyxtQkFBbUIsQ0FBQzs7Ozs7OztHQUM5QixDQUFDLENBQUM7QUFDSCxXQUFTLENBQUM7Ozs7OzJDQUNGLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7R0FDN0IsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLG9EQUFvRCxFQUFFO1FBRW5ELFdBQVc7Ozs7OzJDQURULE1BQU0sQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDOzs7OzJDQUNoQixNQUFNLENBQUMsa0JBQWtCLEVBQUU7OztBQUEvQyxxQkFBVzs7QUFDZixxQkFBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLHVEQUF1RCxDQUFDLENBQUM7Ozs7Ozs7R0FDdkYsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9jaHJvbWUtZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLic7XG5pbXBvcnQgeyBlbnN1cmVBVkRFeGlzdHMgfSBmcm9tICcuL2hlbHBlcnMnO1xuaW1wb3J0IHsgQ0hST01FX0NBUFMgfSBmcm9tICcuL2Rlc2lyZWQnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5jb25zdCBhdmQgPSBwcm9jZXNzLmVudi5BTkRST0lEXzI1X0FWRCB8fCAnTmV4dXNfNV9BUElfMjUnO1xuY29uc3QgY2FwYWJpbGl0aWVzID0gXy5kZWZhdWx0cyh7XG4gIGF2ZCxcbiAgcGxhdGZvcm1WZXJzaW9uOiBcIjcuMVwiLFxuICBjaHJvbWVPcHRpb25zOiB7XG4gICAgYXJnczogW1wiLS1uby1maXJzdC1ydW5cIl1cbiAgfVxufSwgQ0hST01FX0NBUFMpO1xuXG5kZXNjcmliZSgnY3JlYXRlU2Vzc2lvbicsIGZ1bmN0aW9uICgpIHtcbiAgbGV0IGRyaXZlcjtcbiAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIWF3YWl0IGVuc3VyZUFWREV4aXN0cyh0aGlzLCBjYXBhYmlsaXRpZXMuYXZkKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gIH0pO1xuICBhZnRlckVhY2goYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHN0YXJ0IGNocm9tZSBhbmQgZGlzbWlzcyB0aGUgd2VsY29tZSBkaWFsb2cnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oY2FwYWJpbGl0aWVzKTtcbiAgICBsZXQgYXBwQWN0aXZpdHkgPSBhd2FpdCBkcml2ZXIuZ2V0Q3VycmVudEFjdGl2aXR5KCk7XG4gICAgYXBwQWN0aXZpdHkuc2hvdWxkLm5vdC5lcXVhbChcIm9yZy5jaHJvbWl1bS5jaHJvbWUuYnJvd3Nlci5maXJzdHJ1bi5GaXJzdFJ1bkFjdGl2aXR5XCIpO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLiJ9
