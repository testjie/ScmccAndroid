'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _2 = require('../../..');

var _3 = _interopRequireDefault(_2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _desired = require('../desired');

var _desired2 = _interopRequireDefault(_desired);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var driver = undefined;
var caps = _lodash2['default'].defaults({
  appPackage: 'io.appium.android.apis',
  appActivity: '.view.TextFields'
}, _desired2['default']);

describe('execute', function () {
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          driver = new _3['default']();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.createSession(caps));

        case 3:
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
          return _regeneratorRuntime.awrap(driver.deleteSession());

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should fail if one tries to execute non-mobile command in native context', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.execute('blabla').should.eventually.be.rejected);

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should fail if one tries to execute an unknown mobile command in native context', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.execute('mobile: blabla').should.eventually.be.rejectedWith(/Unknown mobile command/));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should fail if one tries to execute a shell command without relaxed security flag set', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.execute('mobile: shell', { command: 'pm', args: ['list'] }).should.eventually.be.rejectedWith(/must have relaxed security flag set/));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should fail if no command argument is provided to shell call', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          driver.relaxedSecurityEnabled = true;
          context$2$0.prev = 1;
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.execute('mobile: shell', { comand: 'pm', args: ['list'] }).should.eventually.be.rejectedWith(/argument is mandatory/));

        case 4:
          context$2$0.prev = 4;

          driver.relaxedSecurityEnabled = undefined;
          return context$2$0.finish(4);

        case 7:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this, [[1,, 4, 7]]);
  });

  it('should return a result if correct shell command is provided', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          driver.relaxedSecurityEnabled = true;
          context$2$0.prev = 1;
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.execute('mobile: shell', { command: 'echo', args: 'hello' }));

        case 4:
          context$2$0.sent.should.not.be.empty;

        case 5:
          context$2$0.prev = 5;

          driver.relaxedSecurityEnabled = undefined;
          return context$2$0.finish(5);

        case 8:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this, [[1,, 5, 8]]);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9leGVjdXRlLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O2lCQUNuQixVQUFVOzs7O3NCQUN0QixRQUFROzs7O3VCQUNHLFlBQVk7Ozs7QUFHckMsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixJQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsSUFBSSxJQUFJLEdBQUcsb0JBQUUsUUFBUSxDQUFDO0FBQ3BCLFlBQVUsRUFBRSx3QkFBd0I7QUFDcEMsYUFBVyxFQUFFLGtCQUFrQjtDQUNoQyx1QkFBZSxDQUFDOztBQUVqQixRQUFRLENBQUMsU0FBUyxFQUFFLFlBQVk7QUFDOUIsUUFBTSxDQUFDOzs7O0FBQ0wsZ0JBQU0sR0FBRyxtQkFBbUIsQ0FBQzs7MkNBQ3ZCLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDOzs7Ozs7O0dBQ2pDLENBQUMsQ0FBQztBQUNILE9BQUssQ0FBQzs7Ozs7MkNBQ0UsTUFBTSxDQUFDLGFBQWEsRUFBRTs7Ozs7OztHQUM3QixDQUFDLENBQUM7O0FBRUgsSUFBRSxDQUFDLDBFQUEwRSxFQUFFOzs7OzsyQ0FDdkUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxRQUFROzs7Ozs7O0dBQzdELENBQUMsQ0FBQzs7QUFFSCxJQUFFLENBQUMsaUZBQWlGLEVBQUU7Ozs7OzJDQUM5RSxNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLHdCQUF3QixDQUFDOzs7Ozs7O0dBQ25HLENBQUMsQ0FBQzs7QUFFSCxJQUFFLENBQUMsdUZBQXVGLEVBQUU7Ozs7OzJDQUNwRixNQUFNLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxDQUNuRSxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMscUNBQXFDLENBQUM7Ozs7Ozs7R0FDNUUsQ0FBQyxDQUFDOztBQUVILElBQUUsQ0FBQyw4REFBOEQsRUFBRTs7OztBQUNqRSxnQkFBTSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQzs7OzJDQUU3QixNQUFNLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxDQUNsRSxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsdUJBQXVCLENBQUM7Ozs7O0FBRTdELGdCQUFNLENBQUMsc0JBQXNCLEdBQUcsU0FBUyxDQUFDOzs7Ozs7OztHQUU3QyxDQUFDLENBQUM7O0FBRUgsSUFBRSxDQUFDLDZEQUE2RCxFQUFFOzs7O0FBQ2hFLGdCQUFNLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDOzs7MkNBRTVCLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLEVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFDLENBQUM7OzsyQkFDckUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSzs7Ozs7QUFFdEIsZ0JBQU0sQ0FBQyxzQkFBc0IsR0FBRyxTQUFTLENBQUM7Ozs7Ozs7O0dBRTdDLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvY29tbWFuZHMvZXhlY3V0ZS1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCBBbmRyb2lkRHJpdmVyIGZyb20gJy4uLy4uLy4uJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgREVGQVVMVF9DQVBTIGZyb20gJy4uL2Rlc2lyZWQnO1xuXG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmxldCBkcml2ZXI7XG5sZXQgY2FwcyA9IF8uZGVmYXVsdHMoe1xuICBhcHBQYWNrYWdlOiAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcycsXG4gIGFwcEFjdGl2aXR5OiAnLnZpZXcuVGV4dEZpZWxkcydcbn0sIERFRkFVTFRfQ0FQUyk7XG5cbmRlc2NyaWJlKCdleGVjdXRlJywgZnVuY3Rpb24gKCkge1xuICBiZWZvcmUoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oY2Fwcyk7XG4gIH0pO1xuICBhZnRlcihhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBmYWlsIGlmIG9uZSB0cmllcyB0byBleGVjdXRlIG5vbi1tb2JpbGUgY29tbWFuZCBpbiBuYXRpdmUgY29udGV4dCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIuZXhlY3V0ZSgnYmxhYmxhJykuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWQ7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgZmFpbCBpZiBvbmUgdHJpZXMgdG8gZXhlY3V0ZSBhbiB1bmtub3duIG1vYmlsZSBjb21tYW5kIGluIG5hdGl2ZSBjb250ZXh0JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5leGVjdXRlKCdtb2JpbGU6IGJsYWJsYScpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgvVW5rbm93biBtb2JpbGUgY29tbWFuZC8pO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIGZhaWwgaWYgb25lIHRyaWVzIHRvIGV4ZWN1dGUgYSBzaGVsbCBjb21tYW5kIHdpdGhvdXQgcmVsYXhlZCBzZWN1cml0eSBmbGFnIHNldCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIuZXhlY3V0ZSgnbW9iaWxlOiBzaGVsbCcsIHtjb21tYW5kOiAncG0nLCBhcmdzOiBbJ2xpc3QnXX0pXG4gICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKC9tdXN0IGhhdmUgcmVsYXhlZCBzZWN1cml0eSBmbGFnIHNldC8pO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIGZhaWwgaWYgbm8gY29tbWFuZCBhcmd1bWVudCBpcyBwcm92aWRlZCB0byBzaGVsbCBjYWxsJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGRyaXZlci5yZWxheGVkU2VjdXJpdHlFbmFibGVkID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgZHJpdmVyLmV4ZWN1dGUoJ21vYmlsZTogc2hlbGwnLCB7Y29tYW5kOiAncG0nLCBhcmdzOiBbJ2xpc3QnXX0pXG4gICAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoL2FyZ3VtZW50IGlzIG1hbmRhdG9yeS8pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBkcml2ZXIucmVsYXhlZFNlY3VyaXR5RW5hYmxlZCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgcmV0dXJuIGEgcmVzdWx0IGlmIGNvcnJlY3Qgc2hlbGwgY29tbWFuZCBpcyBwcm92aWRlZCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBkcml2ZXIucmVsYXhlZFNlY3VyaXR5RW5hYmxlZCA9IHRydWU7XG4gICAgdHJ5IHtcbiAgICAgIChhd2FpdCBkcml2ZXIuZXhlY3V0ZSgnbW9iaWxlOiBzaGVsbCcsIHtjb21tYW5kOiAnZWNobycsIGFyZ3M6ICdoZWxsbyd9KSlcbiAgICAgICAgLnNob3VsZC5ub3QuYmUuZW1wdHk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGRyaXZlci5yZWxheGVkU2VjdXJpdHlFbmFibGVkID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4ifQ==
