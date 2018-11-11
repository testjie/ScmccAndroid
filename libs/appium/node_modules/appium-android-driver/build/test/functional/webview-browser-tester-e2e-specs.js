'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _2 = require('../..');

var _helpers = require('./helpers');

var _desired = require('./desired');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumSupport = require('appium-support');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var AVD_ANDROID_24_WITHOUT_GMS = process.env.ANDROID_24_NO_GMS_AVD || 'Nexus_5_API_24';
var CHROMEDRIVER_2_20_EXECUTABLE = process.env.CHROME_2_20_EXECUTABLE;

// for reasons that remain unclear, this particular webview-based browser
// will not connect to localhost/loopback, even on emulators
var HOST = _appiumSupport.util.localIp();
var PORT = 4723;

describe('Android 7 Webview Browser tester', function () {
  var driver = undefined;
  var server = undefined;

  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          if (!process.env.REAL_DEVICE) {
            context$2$0.next = 2;
            break;
          }

          return context$2$0.abrupt('return', this.skip());

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap((0, _helpers.ensureAVDExists)(this, AVD_ANDROID_24_WITHOUT_GMS));

        case 4:
          if (context$2$0.sent) {
            context$2$0.next = 6;
            break;
          }

          return context$2$0.abrupt('return');

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  beforeEach(function callee$1$0() {
    var capabilities;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.t0 = _lodash2['default'];
          context$2$0.t1 = AVD_ANDROID_24_WITHOUT_GMS;
          context$2$0.t2 = CHROMEDRIVER_2_20_EXECUTABLE;

          if (context$2$0.t2) {
            context$2$0.next = 7;
            break;
          }

          context$2$0.next = 6;
          return _regeneratorRuntime.awrap((0, _helpers.getChromedriver220Asset)());

        case 6:
          context$2$0.t2 = context$2$0.sent;

        case 7:
          context$2$0.t3 = context$2$0.t2;
          context$2$0.t4 = {
            browserName: 'chromium-webview',
            avd: context$2$0.t1,
            platformVersion: '7.0',
            chromedriverExecutable: context$2$0.t3
          };
          context$2$0.t5 = _desired.CHROME_CAPS;
          capabilities = context$2$0.t0.defaults.call(context$2$0.t0, context$2$0.t4, context$2$0.t5);

          driver = new _2.AndroidDriver();
          context$2$0.next = 14;
          return _regeneratorRuntime.awrap(driver.createSession(capabilities));

        case 14:
          context$2$0.next = 16;
          return _regeneratorRuntime.awrap((0, _2.startServer)(PORT, HOST));

        case 16:
          server = context$2$0.sent;

        case 17:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  afterEach(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          if (!driver) {
            context$2$0.next = 3;
            break;
          }

          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.deleteSession());

        case 3:
          if (!server) {
            context$2$0.next = 6;
            break;
          }

          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(server.close());

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should start android session using webview browser tester', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.setUrl('http://' + HOST + ':' + PORT + '/test/guinea-pig'));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.getCurrentContext().should.eventually.eql("CHROMIUM"));

        case 4:
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.findElement('id', 'i am a link'));

        case 6:
          el = context$2$0.sent;
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(driver.click(el.ELEMENT));

        case 9:
          context$2$0.next = 11;
          return _regeneratorRuntime.awrap(driver.findElement('id', 'I am another page title'));

        case 11:
          el = context$2$0.sent;

          el.should.exist;

        case 13:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});

// await driver.setUrl('http://google.com');

// make sure we are in the right context
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC93ZWJ2aWV3LWJyb3dzZXItdGVzdGVyLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O2lCQUNGLE9BQU87O3VCQUNPLFdBQVc7O3VCQUN4QyxXQUFXOztzQkFDekIsUUFBUTs7Ozs2QkFDRCxnQkFBZ0I7O0FBR3JDLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsSUFBTSwwQkFBMEIsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixJQUFJLGdCQUFnQixDQUFDO0FBQ3pGLElBQU0sNEJBQTRCLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQzs7OztBQUl4RSxJQUFNLElBQUksR0FBRyxvQkFBSyxPQUFPLEVBQUUsQ0FBQztBQUM1QixJQUFNLElBQUksR0FBRyxJQUFJLENBQUM7O0FBRWxCLFFBQVEsQ0FBQyxrQ0FBa0MsRUFBRSxZQUFZO0FBQ3ZELE1BQUksTUFBTSxZQUFBLENBQUM7QUFDWCxNQUFJLE1BQU0sWUFBQSxDQUFDOztBQUVYLFFBQU0sQ0FBQzs7OztlQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVzs7Ozs7OENBQ2xCLElBQUksQ0FBQyxJQUFJLEVBQUU7Ozs7MkNBRVQsOEJBQWdCLElBQUksRUFBRSwwQkFBMEIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0dBRzdELENBQUMsQ0FBQztBQUNILFlBQVUsQ0FBQztRQUNILFlBQVk7Ozs7OzJCQUVYLDBCQUEwQjsyQkFFUCw0QkFBNEI7Ozs7Ozs7OzJDQUFVLHVDQUF5Qjs7Ozs7Ozs7QUFIdkYsdUJBQVcsRUFBRSxrQkFBa0I7QUFDL0IsZUFBRztBQUNILDJCQUFlLEVBQUUsS0FBSztBQUN0QixrQ0FBc0I7OztBQUpsQixzQkFBWSxrQkFBSyxRQUFROztBQU8vQixnQkFBTSxHQUFHLHNCQUFtQixDQUFDOzsyQ0FDdkIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7Ozs7MkNBQ3pCLG9CQUFZLElBQUksRUFBRSxJQUFJLENBQUM7OztBQUF0QyxnQkFBTTs7Ozs7OztHQUNQLENBQUMsQ0FBQztBQUNILFdBQVMsQ0FBQzs7OztlQUNKLE1BQU07Ozs7OzsyQ0FDRixNQUFNLENBQUMsYUFBYSxFQUFFOzs7ZUFFMUIsTUFBTTs7Ozs7OzJDQUNGLE1BQU0sQ0FBQyxLQUFLLEVBQUU7Ozs7Ozs7R0FFdkIsQ0FBQyxDQUFDOztBQUVILElBQUUsQ0FBQywyREFBMkQsRUFBRTtRQU8xRCxFQUFFOzs7OzsyQ0FMQSxNQUFNLENBQUMsTUFBTSxhQUFXLElBQUksU0FBSSxJQUFJLHNCQUFtQjs7OzsyQ0FHdkQsTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDOzs7OzJDQUVuRCxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxhQUFhLENBQUM7OztBQUFsRCxZQUFFOzsyQ0FDQSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7Ozs7MkNBRW5CLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLHlCQUF5QixDQUFDOzs7QUFBOUQsWUFBRTs7QUFDRixZQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzs7Ozs7OztHQUNqQixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL3dlYnZpZXctYnJvd3Nlci10ZXN0ZXItZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgeyBBbmRyb2lkRHJpdmVyLCBzdGFydFNlcnZlciB9IGZyb20gJy4uLy4uJztcbmltcG9ydCB7IGVuc3VyZUFWREV4aXN0cywgZ2V0Q2hyb21lZHJpdmVyMjIwQXNzZXQgfSBmcm9tICcuL2hlbHBlcnMnO1xuaW1wb3J0IHsgQ0hST01FX0NBUFMgfSBmcm9tICcuL2Rlc2lyZWQnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IHV0aWwgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XG5cblxuY2hhaS5zaG91bGQoKTtcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcblxuY29uc3QgQVZEX0FORFJPSURfMjRfV0lUSE9VVF9HTVMgPSBwcm9jZXNzLmVudi5BTkRST0lEXzI0X05PX0dNU19BVkQgfHwgJ05leHVzXzVfQVBJXzI0JztcbmNvbnN0IENIUk9NRURSSVZFUl8yXzIwX0VYRUNVVEFCTEUgPSBwcm9jZXNzLmVudi5DSFJPTUVfMl8yMF9FWEVDVVRBQkxFO1xuXG4vLyBmb3IgcmVhc29ucyB0aGF0IHJlbWFpbiB1bmNsZWFyLCB0aGlzIHBhcnRpY3VsYXIgd2Vidmlldy1iYXNlZCBicm93c2VyXG4vLyB3aWxsIG5vdCBjb25uZWN0IHRvIGxvY2FsaG9zdC9sb29wYmFjaywgZXZlbiBvbiBlbXVsYXRvcnNcbmNvbnN0IEhPU1QgPSB1dGlsLmxvY2FsSXAoKTtcbmNvbnN0IFBPUlQgPSA0NzIzO1xuXG5kZXNjcmliZSgnQW5kcm9pZCA3IFdlYnZpZXcgQnJvd3NlciB0ZXN0ZXInLCBmdW5jdGlvbiAoKSB7XG4gIGxldCBkcml2ZXI7XG4gIGxldCBzZXJ2ZXI7XG5cbiAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuUkVBTF9ERVZJQ0UpIHtcbiAgICAgIHJldHVybiB0aGlzLnNraXAoKTtcbiAgICB9XG4gICAgaWYgKCFhd2FpdCBlbnN1cmVBVkRFeGlzdHModGhpcywgQVZEX0FORFJPSURfMjRfV0lUSE9VVF9HTVMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9KTtcbiAgYmVmb3JlRWFjaChhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgY2FwYWJpbGl0aWVzID0gXy5kZWZhdWx0cyh7XG4gICAgICBicm93c2VyTmFtZTogJ2Nocm9taXVtLXdlYnZpZXcnLFxuICAgICAgYXZkOiBBVkRfQU5EUk9JRF8yNF9XSVRIT1VUX0dNUyxcbiAgICAgIHBsYXRmb3JtVmVyc2lvbjogJzcuMCcsXG4gICAgICBjaHJvbWVkcml2ZXJFeGVjdXRhYmxlOiBDSFJPTUVEUklWRVJfMl8yMF9FWEVDVVRBQkxFIHx8IGF3YWl0IGdldENocm9tZWRyaXZlcjIyMEFzc2V0KCksXG4gICAgfSwgQ0hST01FX0NBUFMpO1xuXG4gICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihjYXBhYmlsaXRpZXMpO1xuICAgIHNlcnZlciA9IGF3YWl0IHN0YXJ0U2VydmVyKFBPUlQsIEhPU1QpO1xuICB9KTtcbiAgYWZ0ZXJFYWNoKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoZHJpdmVyKSB7XG4gICAgICBhd2FpdCBkcml2ZXIuZGVsZXRlU2Vzc2lvbigpO1xuICAgIH1cbiAgICBpZiAoc2VydmVyKSB7XG4gICAgICBhd2FpdCBzZXJ2ZXIuY2xvc2UoKTtcbiAgICB9XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgc3RhcnQgYW5kcm9pZCBzZXNzaW9uIHVzaW5nIHdlYnZpZXcgYnJvd3NlciB0ZXN0ZXInLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgLy8gYXdhaXQgZHJpdmVyLnNldFVybCgnaHR0cDovL2dvb2dsZS5jb20nKTtcbiAgICBhd2FpdCBkcml2ZXIuc2V0VXJsKGBodHRwOi8vJHtIT1NUfToke1BPUlR9L3Rlc3QvZ3VpbmVhLXBpZ2ApO1xuXG4gICAgLy8gbWFrZSBzdXJlIHdlIGFyZSBpbiB0aGUgcmlnaHQgY29udGV4dFxuICAgIGF3YWl0IGRyaXZlci5nZXRDdXJyZW50Q29udGV4dCgpLnNob3VsZC5ldmVudHVhbGx5LmVxbChcIkNIUk9NSVVNXCIpO1xuXG4gICAgbGV0IGVsID0gYXdhaXQgZHJpdmVyLmZpbmRFbGVtZW50KCdpZCcsICdpIGFtIGEgbGluaycpO1xuICAgIGF3YWl0IGRyaXZlci5jbGljayhlbC5FTEVNRU5UKTtcblxuICAgIGVsID0gYXdhaXQgZHJpdmVyLmZpbmRFbGVtZW50KCdpZCcsICdJIGFtIGFub3RoZXIgcGFnZSB0aXRsZScpO1xuICAgIGVsLnNob3VsZC5leGlzdDtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4ifQ==
