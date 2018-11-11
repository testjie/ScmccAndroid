'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _helpersSession = require('../../helpers/session');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var driver = undefined;
var defaultCaps = {
  appPackage: 'com.android.settings',
  appActivity: '.Settings',
  deviceName: 'Android',
  platformName: 'Android'
};

describe('Find - android ui elements @skip-ci', function () {
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          if (process.env.TESTOBJECT_E2E_TESTS) {
            this.skip();
          }
          // TODO: why does travis fail on this?

          context$2$0.next = 3;
          return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(defaultCaps));

        case 3:
          driver = context$2$0.sent;

        case 4:
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
          return _regeneratorRuntime.awrap(driver.quit());

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should not find statusBarBackground element via xpath', function callee$1$0() {
    var statusBar, statusBarWithInvisibleEl;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementsByXPath('//*[@resource-id=\'android:id/statusBarBackground\']'));

        case 2:
          statusBar = context$2$0.sent;
          //check server (NPE) if allowInvisibleElements is unset on server side
          statusBar.length.should.be.equal(0);
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.updateSettings({ "allowInvisibleElements": false }));

        case 6:
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(driver.elementsByXPath('//*[@resource-id=\'android:id/statusBarBackground\']'));

        case 8:
          statusBarWithInvisibleEl = context$2$0.sent;

          statusBarWithInvisibleEl.length.should.be.equal(0);

        case 10:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find statusBarBackground element via xpath', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.updateSettings({ "allowInvisibleElements": true }));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.elementByXPath('//*[@resource-id=\'android:id/statusBarBackground\']').should.eventually.exist);

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9maW5kL2ZpbmQtc3lzdGVtLXVpLWVsLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7OzhCQUNsQix1QkFBdUI7O0FBR2xELGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsSUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLElBQUksV0FBVyxHQUFHO0FBQ2hCLFlBQVUsRUFBRSxzQkFBc0I7QUFDbEMsYUFBVyxFQUFFLFdBQVc7QUFDeEIsWUFBVSxFQUFFLFNBQVM7QUFDckIsY0FBWSxFQUFFLFNBQVM7Q0FDeEIsQ0FBQzs7QUFFRixRQUFRLENBQUMscUNBQXFDLEVBQUUsWUFBWTtBQUMxRCxRQUFNLENBQUM7Ozs7QUFDTCxjQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUU7QUFDcEMsZ0JBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztXQUNiOzs7OzJDQUdjLGdDQUFXLFdBQVcsQ0FBQzs7O0FBQXRDLGdCQUFNOzs7Ozs7O0dBQ1AsQ0FBQyxDQUFDO0FBQ0gsT0FBSyxDQUFDOzs7O2VBQ0EsTUFBTTs7Ozs7OzJDQUNGLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Ozs7Ozs7R0FFdEIsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLHVEQUF1RCxFQUFFO1FBQ3RELFNBQVMsRUFHVCx3QkFBd0I7Ozs7OzJDQUhOLE1BQU0sQ0FBQyxlQUFlLHdEQUFzRDs7O0FBQTlGLG1CQUFTOztBQUNiLG1CQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzsyQ0FDOUIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFDLHdCQUF3QixFQUFFLEtBQUssRUFBQyxDQUFDOzs7OzJDQUN6QixNQUFNLENBQUMsZUFBZSx3REFBc0Q7OztBQUE3RyxrQ0FBd0I7O0FBQzVCLGtDQUF3QixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7OztHQUNwRCxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsbURBQW1ELEVBQUU7Ozs7OzJDQUNoRCxNQUFNLENBQUMsY0FBYyxDQUFDLEVBQUMsd0JBQXdCLEVBQUUsSUFBSSxFQUFDLENBQUM7Ozs7MkNBQ3ZELE1BQU0sQ0FBQyxjQUFjLHdEQUFzRCxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSzs7Ozs7OztHQUMxRyxDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2NvbW1hbmRzL2ZpbmQvZmluZC1zeXN0ZW0tdWktZWwtZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgeyBpbml0RHJpdmVyIH0gZnJvbSAnLi4vLi4vaGVscGVycy9zZXNzaW9uJztcblxuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5sZXQgZHJpdmVyO1xubGV0IGRlZmF1bHRDYXBzID0ge1xuICBhcHBQYWNrYWdlOiAnY29tLmFuZHJvaWQuc2V0dGluZ3MnLFxuICBhcHBBY3Rpdml0eTogJy5TZXR0aW5ncycsXG4gIGRldmljZU5hbWU6ICdBbmRyb2lkJyxcbiAgcGxhdGZvcm1OYW1lOiAnQW5kcm9pZCdcbn07XG5cbmRlc2NyaWJlKCdGaW5kIC0gYW5kcm9pZCB1aSBlbGVtZW50cyBAc2tpcC1jaScsIGZ1bmN0aW9uICgpIHtcbiAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuVEVTVE9CSkVDVF9FMkVfVEVTVFMpIHtcbiAgICAgIHRoaXMuc2tpcCgpO1xuICAgIH1cbiAgICAvLyBUT0RPOiB3aHkgZG9lcyB0cmF2aXMgZmFpbCBvbiB0aGlzP1xuXG4gICAgZHJpdmVyID0gYXdhaXQgaW5pdERyaXZlcihkZWZhdWx0Q2Fwcyk7XG4gIH0pO1xuICBhZnRlcihhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGRyaXZlcikge1xuICAgICAgYXdhaXQgZHJpdmVyLnF1aXQoKTtcbiAgICB9XG4gIH0pO1xuICBpdCgnc2hvdWxkIG5vdCBmaW5kIHN0YXR1c0JhckJhY2tncm91bmQgZWxlbWVudCB2aWEgeHBhdGgnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHN0YXR1c0JhciA9IGF3YWl0IGRyaXZlci5lbGVtZW50c0J5WFBhdGgoYC8vKltAcmVzb3VyY2UtaWQ9J2FuZHJvaWQ6aWQvc3RhdHVzQmFyQmFja2dyb3VuZCddYCk7IC8vY2hlY2sgc2VydmVyIChOUEUpIGlmIGFsbG93SW52aXNpYmxlRWxlbWVudHMgaXMgdW5zZXQgb24gc2VydmVyIHNpZGVcbiAgICBzdGF0dXNCYXIubGVuZ3RoLnNob3VsZC5iZS5lcXVhbCgwKTtcbiAgICBhd2FpdCBkcml2ZXIudXBkYXRlU2V0dGluZ3Moe1wiYWxsb3dJbnZpc2libGVFbGVtZW50c1wiOiBmYWxzZX0pO1xuICAgIGxldCBzdGF0dXNCYXJXaXRoSW52aXNpYmxlRWwgPSBhd2FpdCBkcml2ZXIuZWxlbWVudHNCeVhQYXRoKGAvLypbQHJlc291cmNlLWlkPSdhbmRyb2lkOmlkL3N0YXR1c0JhckJhY2tncm91bmQnXWApO1xuICAgIHN0YXR1c0JhcldpdGhJbnZpc2libGVFbC5sZW5ndGguc2hvdWxkLmJlLmVxdWFsKDApO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBmaW5kIHN0YXR1c0JhckJhY2tncm91bmQgZWxlbWVudCB2aWEgeHBhdGgnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLnVwZGF0ZVNldHRpbmdzKHtcImFsbG93SW52aXNpYmxlRWxlbWVudHNcIjogdHJ1ZX0pO1xuICAgIGF3YWl0IGRyaXZlci5lbGVtZW50QnlYUGF0aChgLy8qW0ByZXNvdXJjZS1pZD0nYW5kcm9pZDppZC9zdGF0dXNCYXJCYWNrZ3JvdW5kJ11gKS5zaG91bGQuZXZlbnR1YWxseS5leGlzdDtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vLi4ifQ==
