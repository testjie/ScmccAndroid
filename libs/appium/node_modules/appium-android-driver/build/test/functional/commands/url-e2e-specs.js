'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../../..');

var _2 = _interopRequireDefault(_);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var driver = undefined;
var caps = {
  browserName: 'Browser',
  deviceName: 'Android',
  platformName: 'Android'
};

describe('setUrl', function () {
  var urlId = 'com.android.browser:id/url';
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
          return _regeneratorRuntime.awrap(adb.isAppInstalled('com.android.browser'));

        case 5:
          if (context$2$0.sent) {
            context$2$0.next = 12;
            break;
          }

          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(adb.isAppInstalled('com.android.chrome'));

        case 8:
          if (context$2$0.sent) {
            context$2$0.next = 10;
            break;
          }

          throw new Error('Neither default browser nor chrome available');

        case 10:
          // `browser` is not available, so use `Chrome`
          caps.browserName = 'Chrome';
          urlId = 'com.android.chrome:id/url_bar';

        case 12:

          driver = new _2['default']();
          context$2$0.next = 15;
          return _regeneratorRuntime.awrap(driver.createSession(caps));

        case 15:
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
            context$2$0.next = 3;
            break;
          }

          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.deleteSession());

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should be able to start a data uri via setUrl', function callee$1$0() {
    var btn, el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          if (!(caps.browserName === 'Chrome')) {
            context$2$0.next = 16;
            break;
          }

          context$2$0.prev = 1;
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.findElement('id', 'com.android.chrome:id/terms_accept'));

        case 4:
          btn = context$2$0.sent;
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(driver.click(btn.ELEMENT));

        case 7:
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(driver.findElement('id', 'com.android.chrome:id/negative_button'));

        case 9:
          btn = context$2$0.sent;
          context$2$0.next = 12;
          return _regeneratorRuntime.awrap(driver.click(btn.ELEMENT));

        case 12:
          context$2$0.next = 16;
          break;

        case 14:
          context$2$0.prev = 14;
          context$2$0.t0 = context$2$0['catch'](1);

        case 16:
          context$2$0.next = 18;
          return _regeneratorRuntime.awrap(driver.setUrl('http://saucelabs.com'));

        case 18:
          context$2$0.next = 20;
          return _regeneratorRuntime.awrap(driver.findElement('id', urlId));

        case 20:
          el = context$2$0.sent;
          context$2$0.next = 23;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.include('saucelabs.com'));

        case 23:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this, [[1, 14]]);
  });
});
// eslint-disable-line curly

// on some chrome systems, we always get the terms and conditions page
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy91cmwtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQ25CLFVBQVU7Ozs7eUJBQ3BCLFlBQVk7Ozs7QUFHNUIsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixJQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsSUFBSSxJQUFJLEdBQUc7QUFDVCxhQUFXLEVBQUUsU0FBUztBQUN0QixZQUFVLEVBQUUsU0FBUztBQUNyQixjQUFZLEVBQUUsU0FBUztDQUN4QixDQUFDOztBQUVGLFFBQVEsQ0FBQyxRQUFRLEVBQUUsWUFBWTtBQUM3QixNQUFJLEtBQUssR0FBRyw0QkFBNEIsQ0FBQztBQUN6QyxRQUFNLENBQUM7UUFHRCxHQUFHOzs7O2VBRkgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNOzs7Ozs4Q0FBUyxJQUFJLENBQUMsSUFBSSxFQUFFOzs7QUFFdEMsYUFBRyxHQUFHLDRCQUFTOzsyQ0FDUixHQUFHLENBQUMsY0FBYyxDQUFDLHFCQUFxQixDQUFDOzs7Ozs7Ozs7MkNBQ3ZDLEdBQUcsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUM7Ozs7Ozs7O2dCQUMzQyxJQUFJLEtBQUssQ0FBQyw4Q0FBOEMsQ0FBQzs7OztBQUdqRSxjQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQztBQUM1QixlQUFLLEdBQUcsK0JBQStCLENBQUM7Ozs7QUFHMUMsZ0JBQU0sR0FBRyxtQkFBbUIsQ0FBQzs7MkNBQ3ZCLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDOzs7Ozs7O0dBQ2pDLENBQUMsQ0FBQztBQUNILE9BQUssQ0FBQzs7OztlQUNBLE1BQU07Ozs7OzsyQ0FDRixNQUFNLENBQUMsYUFBYSxFQUFFOzs7Ozs7O0dBRS9CLENBQUMsQ0FBQzs7QUFFSCxJQUFFLENBQUMsK0NBQStDLEVBQUU7UUFJMUMsR0FBRyxFQVVQLEVBQUU7Ozs7Z0JBYkYsSUFBSSxDQUFDLFdBQVcsS0FBSyxRQUFRLENBQUE7Ozs7Ozs7MkNBR2IsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsb0NBQW9DLENBQUM7OztBQUExRSxhQUFHOzsyQ0FDRCxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7Ozs7MkNBRW5CLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLHVDQUF1QyxDQUFDOzs7QUFBN0UsYUFBRzs7MkNBQ0csTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDOzs7Ozs7Ozs7Ozs7MkNBSTdCLE1BQU0sQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUM7Ozs7MkNBRTVCLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQzs7O0FBQTFDLFlBQUU7OzJDQUNBLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQzs7Ozs7OztHQUM1RSxDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2NvbW1hbmRzL3VybC1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCBBbmRyb2lkRHJpdmVyIGZyb20gJy4uLy4uLy4uJztcbmltcG9ydCBBREIgZnJvbSAnYXBwaXVtLWFkYic7XG5cblxuY2hhaS5zaG91bGQoKTtcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcblxubGV0IGRyaXZlcjtcbmxldCBjYXBzID0ge1xuICBicm93c2VyTmFtZTogJ0Jyb3dzZXInLFxuICBkZXZpY2VOYW1lOiAnQW5kcm9pZCcsXG4gIHBsYXRmb3JtTmFtZTogJ0FuZHJvaWQnXG59O1xuXG5kZXNjcmliZSgnc2V0VXJsJywgZnVuY3Rpb24gKCkge1xuICBsZXQgdXJsSWQgPSAnY29tLmFuZHJvaWQuYnJvd3NlcjppZC91cmwnO1xuICBiZWZvcmUoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGlmIChwcm9jZXNzLmVudi5UUkFWSVMpIHJldHVybiB0aGlzLnNraXAoKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjdXJseVxuXG4gICAgbGV0IGFkYiA9IG5ldyBBREIoKTtcbiAgICBpZiAoIWF3YWl0IGFkYi5pc0FwcEluc3RhbGxlZCgnY29tLmFuZHJvaWQuYnJvd3NlcicpKSB7XG4gICAgICBpZiAoIWF3YWl0IGFkYi5pc0FwcEluc3RhbGxlZCgnY29tLmFuZHJvaWQuY2hyb21lJykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZWl0aGVyIGRlZmF1bHQgYnJvd3NlciBub3IgY2hyb21lIGF2YWlsYWJsZScpO1xuICAgICAgfVxuICAgICAgLy8gYGJyb3dzZXJgIGlzIG5vdCBhdmFpbGFibGUsIHNvIHVzZSBgQ2hyb21lYFxuICAgICAgY2Fwcy5icm93c2VyTmFtZSA9ICdDaHJvbWUnO1xuICAgICAgdXJsSWQgPSAnY29tLmFuZHJvaWQuY2hyb21lOmlkL3VybF9iYXInO1xuICAgIH1cblxuICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oY2Fwcyk7XG4gIH0pO1xuICBhZnRlcihhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGRyaXZlcikge1xuICAgICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcbiAgICB9XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgYmUgYWJsZSB0byBzdGFydCBhIGRhdGEgdXJpIHZpYSBzZXRVcmwnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGNhcHMuYnJvd3Nlck5hbWUgPT09ICdDaHJvbWUnKSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBvbiBzb21lIGNocm9tZSBzeXN0ZW1zLCB3ZSBhbHdheXMgZ2V0IHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyBwYWdlXG4gICAgICAgIGxldCBidG4gPSBhd2FpdCBkcml2ZXIuZmluZEVsZW1lbnQoJ2lkJywgJ2NvbS5hbmRyb2lkLmNocm9tZTppZC90ZXJtc19hY2NlcHQnKTtcbiAgICAgICAgYXdhaXQgZHJpdmVyLmNsaWNrKGJ0bi5FTEVNRU5UKTtcblxuICAgICAgICBidG4gPSBhd2FpdCBkcml2ZXIuZmluZEVsZW1lbnQoJ2lkJywgJ2NvbS5hbmRyb2lkLmNocm9tZTppZC9uZWdhdGl2ZV9idXR0b24nKTtcbiAgICAgICAgYXdhaXQgZHJpdmVyLmNsaWNrKGJ0bi5FTEVNRU5UKTtcbiAgICAgIH0gY2F0Y2ggKGlnbikge31cbiAgICB9XG5cbiAgICBhd2FpdCBkcml2ZXIuc2V0VXJsKCdodHRwOi8vc2F1Y2VsYWJzLmNvbScpO1xuXG4gICAgbGV0IGVsID0gYXdhaXQgZHJpdmVyLmZpbmRFbGVtZW50KCdpZCcsIHVybElkKTtcbiAgICBhd2FpdCBkcml2ZXIuZ2V0VGV4dChlbC5FTEVNRU5UKS5zaG91bGQuZXZlbnR1YWxseS5pbmNsdWRlKCdzYXVjZWxhYnMuY29tJyk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uIn0=
