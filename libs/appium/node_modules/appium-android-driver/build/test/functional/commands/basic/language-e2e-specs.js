'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var _ = require('../../../..');

var _2 = _interopRequireDefault(_);

var _desired = require('../../desired');

var _desired2 = _interopRequireDefault(_desired);

var _helpers = require('../../helpers');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('Localization - locale @skip-ci @skip-real-device', function () {
  this.timeout(_helpers.MOCHA_TIMEOUT);

  var initialLocale = undefined;

  before(function callee$1$0() {
    var adb;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          if (!process.env.TRAVIS) {
            context$2$0.next = 2;
            break;
          }

          return context$2$0.abrupt('return', this.skip());

        case 2:
          adb = new _appiumAdb2['default']();
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(adb.getApiLevel());

        case 5:
          context$2$0.t0 = context$2$0.sent;

          if (!(context$2$0.t0 > 23)) {
            context$2$0.next = 8;
            break;
          }

          return context$2$0.abrupt('return', this.skip());

        case 8:
          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(getLocale(adb));

        case 10:
          initialLocale = context$2$0.sent;

        case 11:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  var driver = undefined;
  beforeEach(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          driver = new _2['default']();

        case 1:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  after(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          if (!driver) {
            context$2$0.next = 5;
            break;
          }

          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.adb.setDeviceCountry(initialLocale));

        case 3:
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.deleteSession());

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  function getLocale(adb) {
    return _regeneratorRuntime.async(function getLocale$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.getApiLevel());

        case 2:
          context$2$0.t0 = context$2$0.sent;

          if (!(context$2$0.t0 < 23)) {
            context$2$0.next = 9;
            break;
          }

          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(adb.getDeviceCountry());

        case 6:
          return context$2$0.abrupt('return', context$2$0.sent);

        case 9:
          context$2$0.next = 11;
          return _regeneratorRuntime.awrap(adb.getDeviceLocale());

        case 11:
          return context$2$0.abrupt('return', context$2$0.sent);

        case 12:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  }

  it('should start as FR', function callee$1$0() {
    var frCaps;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          frCaps = _Object$assign({}, _desired2['default'], { locale: 'FR' });
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.createSession(frCaps));

        case 3:
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(getLocale(driver.adb).should.eventually.equal('FR'));

        case 5:
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
          usCaps = _Object$assign({}, _desired2['default'], { locale: 'US' });
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.createSession(usCaps));

        case 3:
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(getLocale(driver.adb).should.eventually.equal('US'));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});
//eslint-disable-line curly

// restarting doesn't work on Android 7
//eslint-disable-line curly
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9iYXNpYy9sYW5ndWFnZS1lMmUtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O3lCQUM3QixZQUFZOzs7O2dCQUNGLGFBQWE7Ozs7dUJBQ2QsZUFBZTs7Ozt1QkFDVixlQUFlOztBQUc3QyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLFFBQVEsQ0FBQyxrREFBa0QsRUFBRSxZQUFZO0FBQ3ZFLE1BQUksQ0FBQyxPQUFPLHdCQUFlLENBQUM7O0FBRTVCLE1BQUksYUFBYSxZQUFBLENBQUM7O0FBRWxCLFFBQU0sQ0FBQztRQUlELEdBQUc7Ozs7ZUFISCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU07Ozs7OzhDQUFTLElBQUksQ0FBQyxJQUFJLEVBQUU7OztBQUd0QyxhQUFHLEdBQUcsNEJBQVM7OzJDQUNULEdBQUcsQ0FBQyxXQUFXLEVBQUU7Ozs7O2lDQUFHLEVBQUU7Ozs7OzhDQUFTLElBQUksQ0FBQyxJQUFJLEVBQUU7Ozs7MkNBRTlCLFNBQVMsQ0FBQyxHQUFHLENBQUM7OztBQUFwQyx1QkFBYTs7Ozs7OztHQUNkLENBQUMsQ0FBQzs7QUFFSCxNQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsWUFBVSxDQUFDOzs7O0FBQ1QsZ0JBQU0sR0FBRyxtQkFBbUIsQ0FBQzs7Ozs7OztHQUM5QixDQUFDLENBQUM7QUFDSCxPQUFLLENBQUM7Ozs7ZUFDQSxNQUFNOzs7Ozs7MkNBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUM7Ozs7MkNBRTFDLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7R0FFL0IsQ0FBQyxDQUFDOztBQUVILFdBQWUsU0FBUyxDQUFFLEdBQUc7Ozs7OzJDQUNqQixHQUFHLENBQUMsV0FBVyxFQUFFOzs7OztpQ0FBRyxFQUFFOzs7Ozs7MkNBQ2pCLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTs7Ozs7OzsyQ0FFdEIsR0FBRyxDQUFDLGVBQWUsRUFBRTs7Ozs7Ozs7OztHQUVyQzs7QUFFRCxJQUFFLENBQUMsb0JBQW9CLEVBQUU7UUFDbkIsTUFBTTs7OztBQUFOLGdCQUFNLEdBQUcsZUFBYyxFQUFFLHdCQUFnQixFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQzs7MkNBQ3RELE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDOzs7OzJDQUM1QixTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzs7Ozs7OztHQUMxRCxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsb0JBQW9CLEVBQUU7UUFDbkIsTUFBTTs7OztBQUFOLGdCQUFNLEdBQUcsZUFBYyxFQUFFLHdCQUFnQixFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQzs7MkNBQ3RELE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDOzs7OzJDQUM1QixTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzs7Ozs7OztHQUMxRCxDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2NvbW1hbmRzL2Jhc2ljL2xhbmd1YWdlLWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IEFEQiBmcm9tICdhcHBpdW0tYWRiJztcbmltcG9ydCBBbmRyb2lkRHJpdmVyIGZyb20gJy4uLy4uLy4uLy4uJztcbmltcG9ydCBERUZBVUxUX0NBUFMgZnJvbSAnLi4vLi4vZGVzaXJlZCc7XG5pbXBvcnQgeyBNT0NIQV9USU1FT1VUIH0gZnJvbSAnLi4vLi4vaGVscGVycyc7XG5cblxuY2hhaS5zaG91bGQoKTtcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcblxuZGVzY3JpYmUoJ0xvY2FsaXphdGlvbiAtIGxvY2FsZSBAc2tpcC1jaSBAc2tpcC1yZWFsLWRldmljZScsIGZ1bmN0aW9uICgpIHtcbiAgdGhpcy50aW1lb3V0KE1PQ0hBX1RJTUVPVVQpO1xuXG4gIGxldCBpbml0aWFsTG9jYWxlO1xuXG4gIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52LlRSQVZJUykgcmV0dXJuIHRoaXMuc2tpcCgpOyAvL2VzbGludC1kaXNhYmxlLWxpbmUgY3VybHlcblxuICAgIC8vIHJlc3RhcnRpbmcgZG9lc24ndCB3b3JrIG9uIEFuZHJvaWQgN1xuICAgIGxldCBhZGIgPSBuZXcgQURCKCk7XG4gICAgaWYgKGF3YWl0IGFkYi5nZXRBcGlMZXZlbCgpID4gMjMpIHJldHVybiB0aGlzLnNraXAoKTsgLy9lc2xpbnQtZGlzYWJsZS1saW5lIGN1cmx5XG5cbiAgICBpbml0aWFsTG9jYWxlID0gYXdhaXQgZ2V0TG9jYWxlKGFkYik7XG4gIH0pO1xuXG4gIGxldCBkcml2ZXI7XG4gIGJlZm9yZUVhY2goYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gIH0pO1xuICBhZnRlcihhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGRyaXZlcikge1xuICAgICAgYXdhaXQgZHJpdmVyLmFkYi5zZXREZXZpY2VDb3VudHJ5KGluaXRpYWxMb2NhbGUpO1xuXG4gICAgICBhd2FpdCBkcml2ZXIuZGVsZXRlU2Vzc2lvbigpO1xuICAgIH1cbiAgfSk7XG5cbiAgYXN5bmMgZnVuY3Rpb24gZ2V0TG9jYWxlIChhZGIpIHtcbiAgICBpZiAoYXdhaXQgYWRiLmdldEFwaUxldmVsKCkgPCAyMykge1xuICAgICAgcmV0dXJuIGF3YWl0IGFkYi5nZXREZXZpY2VDb3VudHJ5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBhd2FpdCBhZGIuZ2V0RGV2aWNlTG9jYWxlKCk7XG4gICAgfVxuICB9XG5cbiAgaXQoJ3Nob3VsZCBzdGFydCBhcyBGUicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgZnJDYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9DQVBTLCB7bG9jYWxlOiAnRlInfSk7XG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oZnJDYXBzKTtcbiAgICBhd2FpdCBnZXRMb2NhbGUoZHJpdmVyLmFkYikuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwoJ0ZSJyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHN0YXJ0IGFzIFVTJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCB1c0NhcHMgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX0NBUFMsIHtsb2NhbGU6ICdVUyd9KTtcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbih1c0NhcHMpO1xuICAgIGF3YWl0IGdldExvY2FsZShkcml2ZXIuYWRiKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCgnVVMnKTtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vLi4ifQ==
