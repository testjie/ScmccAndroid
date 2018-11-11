'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _desired = require('../../desired');

var _helpersSession = require('../../helpers/session');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var unicodeImeId = 'io.appium.android.ime/.UnicodeIME';

describe('apidemo - IME', function () {
  var driver = undefined;
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(_Object$assign({}, _desired.APIDEMOS_CAPS, { unicodeKeyboard: true, resetKeyboard: true })));

        case 2:
          driver = context$2$0.sent;

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  beforeEach(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.startActivity({ appPackage: 'io.appium.android.apis', appActivity: 'io.appium.android.apis.ApiDemos' }));

        case 2:
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
          return _regeneratorRuntime.awrap(driver.quit());

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should get the default (enabled) input method', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.activeIMEEngine().should.eventually.equal(unicodeImeId));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should activate an installed input method', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.activateIMEEngine(unicodeImeId).should.not.be.rejected);

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should fail to activate an uninstalled input method', function callee$1$0() {
    var invalidImeId;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          invalidImeId = 'sdf.wer.gdasdfsf/.OsdfEfgd';
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.activateIMEEngine(invalidImeId).should.eventually.be.rejectedWith(/not available/));

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should deactivate the current input method', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.activateIMEEngine(unicodeImeId));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.activeIMEEngine().should.eventually.equal(unicodeImeId));

        case 4:
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.deactivateIMEEngine());

        case 6:
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(driver.activeIMEEngine().should.eventually.not.equal(unicodeImeId));

        case 8:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9nZW5lcmFsL2ltZS1lMmUtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O3VCQUNmLGVBQWU7OzhCQUNsQix1QkFBdUI7O0FBR2xELGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsSUFBTSxZQUFZLEdBQUcsbUNBQW1DLENBQUM7O0FBRXpELFFBQVEsQ0FBQyxlQUFlLEVBQUUsWUFBWTtBQUNwQyxNQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsUUFBTSxDQUFDOzs7OzsyQ0FDVSxnQ0FBVyxlQUFjLEVBQUUsMEJBQWlCLEVBQUMsZUFBZSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQzs7O0FBQXpHLGdCQUFNOzs7Ozs7O0dBQ1AsQ0FBQyxDQUFDO0FBQ0gsWUFBVSxDQUFDOzs7OzsyQ0FDSCxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUMsVUFBVSxFQUFFLHdCQUF3QixFQUFFLFdBQVcsRUFBRSxpQ0FBaUMsRUFBQyxDQUFDOzs7Ozs7O0dBQ25ILENBQUMsQ0FBQztBQUNILE9BQUssQ0FBQzs7Ozs7MkNBQ0UsTUFBTSxDQUFDLElBQUksRUFBRTs7Ozs7OztHQUNwQixDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsK0NBQStDLEVBQUU7Ozs7OzJDQUM1QyxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDOzs7Ozs7O0dBQ3JFLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQywyQ0FBMkMsRUFBRTs7Ozs7MkNBQ3hDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxRQUFROzs7Ozs7O0dBQ3BFLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyxxREFBcUQsRUFBRTtRQUNwRCxZQUFZOzs7O0FBQVosc0JBQVksR0FBRyw0QkFBNEI7OzJDQUN6QyxNQUFNLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQzs7Ozs7OztHQUNoRyxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsNENBQTRDLEVBQUU7Ozs7OzJDQUN6QyxNQUFNLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDOzs7OzJDQUN0QyxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDOzs7OzJDQUM5RCxNQUFNLENBQUMsbUJBQW1CLEVBQUU7Ozs7MkNBQzVCLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDOzs7Ozs7O0dBQ3pFLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvY29tbWFuZHMvZ2VuZXJhbC9pbWUtZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgeyBBUElERU1PU19DQVBTIH0gZnJvbSAnLi4vLi4vZGVzaXJlZCc7XG5pbXBvcnQgeyBpbml0RHJpdmVyIH0gZnJvbSAnLi4vLi4vaGVscGVycy9zZXNzaW9uJztcblxuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5jb25zdCB1bmljb2RlSW1lSWQgPSAnaW8uYXBwaXVtLmFuZHJvaWQuaW1lLy5Vbmljb2RlSU1FJztcblxuZGVzY3JpYmUoJ2FwaWRlbW8gLSBJTUUnLCBmdW5jdGlvbiAoKSB7XG4gIGxldCBkcml2ZXI7XG4gIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgZHJpdmVyID0gYXdhaXQgaW5pdERyaXZlcihPYmplY3QuYXNzaWduKHt9LCBBUElERU1PU19DQVBTLCB7dW5pY29kZUtleWJvYXJkOiB0cnVlLCByZXNldEtleWJvYXJkOiB0cnVlfSkpO1xuICB9KTtcbiAgYmVmb3JlRWFjaChhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLnN0YXJ0QWN0aXZpdHkoe2FwcFBhY2thZ2U6ICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJywgYXBwQWN0aXZpdHk6ICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzLkFwaURlbW9zJ30pO1xuICB9KTtcbiAgYWZ0ZXIoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5xdWl0KCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGdldCB0aGUgZGVmYXVsdCAoZW5hYmxlZCkgaW5wdXQgbWV0aG9kJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5hY3RpdmVJTUVFbmdpbmUoKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCh1bmljb2RlSW1lSWQpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBhY3RpdmF0ZSBhbiBpbnN0YWxsZWQgaW5wdXQgbWV0aG9kJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5hY3RpdmF0ZUlNRUVuZ2luZSh1bmljb2RlSW1lSWQpLnNob3VsZC5ub3QuYmUucmVqZWN0ZWQ7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZhaWwgdG8gYWN0aXZhdGUgYW4gdW5pbnN0YWxsZWQgaW5wdXQgbWV0aG9kJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBpbnZhbGlkSW1lSWQgPSAnc2RmLndlci5nZGFzZGZzZi8uT3NkZkVmZ2QnO1xuICAgIGF3YWl0IGRyaXZlci5hY3RpdmF0ZUlNRUVuZ2luZShpbnZhbGlkSW1lSWQpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgvbm90IGF2YWlsYWJsZS8pO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBkZWFjdGl2YXRlIHRoZSBjdXJyZW50IGlucHV0IG1ldGhvZCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIuYWN0aXZhdGVJTUVFbmdpbmUodW5pY29kZUltZUlkKTtcbiAgICBhd2FpdCBkcml2ZXIuYWN0aXZlSU1FRW5naW5lKCkuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwodW5pY29kZUltZUlkKTtcbiAgICBhd2FpdCBkcml2ZXIuZGVhY3RpdmF0ZUlNRUVuZ2luZSgpO1xuICAgIGF3YWl0IGRyaXZlci5hY3RpdmVJTUVFbmdpbmUoKS5zaG91bGQuZXZlbnR1YWxseS5ub3QuZXF1YWwodW5pY29kZUltZUlkKTtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vLi4ifQ==
