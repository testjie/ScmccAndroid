'use strict';

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _desired = require('../../desired');

var _helpersSession = require('../../helpers/session');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var driver = undefined;
var caps = _Object$assign({}, _desired.BROWSER_CAPS);

describe('setUrl @skip-ci', function () {
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          if (process.env.TESTOBJECT_E2E_TESTS) {
            this.skip();
          }
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(caps));

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
          return _regeneratorRuntime.awrap(driver.elementById('com.android.chrome:id/terms_accept'));

        case 4:
          btn = context$2$0.sent;
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(btn.click());

        case 7:
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(driver.elementById('com.android.chrome:id/negative_button'));

        case 9:
          btn = context$2$0.sent;
          context$2$0.next = 12;
          return _regeneratorRuntime.awrap(btn.click());

        case 12:
          context$2$0.next = 16;
          break;

        case 14:
          context$2$0.prev = 14;
          context$2$0.t0 = context$2$0['catch'](1);

        case 16:
          context$2$0.next = 18;
          return _regeneratorRuntime.awrap(driver.get('http://saucelabs.com'));

        case 18:
          context$2$0.next = 20;
          return _regeneratorRuntime.awrap(driver.waitForElementByTagName("title"));

        case 20:
          context$2$0.next = 22;
          return _regeneratorRuntime.awrap(driver.elementByTagName("title"));

        case 22:
          el = context$2$0.sent;
          context$2$0.next = 25;
          return _regeneratorRuntime.awrap(el.getAttribute("innerHTML").should.eventually.include('Sauce Labs'));

        case 25:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this, [[1, 14]]);
  });
});

// on some chrome systems, we always get the terms and conditions page
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9nZW5lcmFsL3VybC1lMmUtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O3VCQUNoQixlQUFlOzs4QkFDakIsdUJBQXVCOztBQUVsRCxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLElBQUksTUFBTSxZQUFBLENBQUM7QUFDWCxJQUFJLElBQUksR0FBRyxlQUFjLEVBQUUsd0JBQWUsQ0FBQzs7QUFFM0MsUUFBUSxDQUFDLGlCQUFpQixFQUFFLFlBQVk7QUFDdEMsUUFBTSxDQUFDOzs7O0FBQ0wsY0FBSSxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFO0FBQ3BDLGdCQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7V0FDYjs7MkNBQ2MsZ0NBQVcsSUFBSSxDQUFDOzs7QUFBL0IsZ0JBQU07Ozs7Ozs7R0FDUCxDQUFDLENBQUM7QUFDSCxPQUFLLENBQUM7Ozs7ZUFDQSxNQUFNOzs7Ozs7MkNBQ0YsTUFBTSxDQUFDLElBQUksRUFBRTs7Ozs7OztHQUV0QixDQUFDLENBQUM7O0FBRUgsSUFBRSxDQUFDLCtDQUErQyxFQUFFO1FBSTFDLEdBQUcsRUFXUCxFQUFFOzs7O2dCQWRGLElBQUksQ0FBQyxXQUFXLEtBQUssUUFBUSxDQUFBOzs7Ozs7OzJDQUdiLE1BQU0sQ0FBQyxXQUFXLENBQUMsb0NBQW9DLENBQUM7OztBQUFwRSxhQUFHOzsyQ0FDRCxHQUFHLENBQUMsS0FBSyxFQUFFOzs7OzJDQUVMLE1BQU0sQ0FBQyxXQUFXLENBQUMsdUNBQXVDLENBQUM7OztBQUF2RSxhQUFHOzsyQ0FDRyxHQUFHLENBQUMsS0FBSyxFQUFFOzs7Ozs7Ozs7Ozs7MkNBSWYsTUFBTSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQzs7OzsyQ0FFbEMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sQ0FBQzs7OzsyQ0FDOUIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQzs7O0FBQTNDLFlBQUU7OzJDQUNBLEVBQUUsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDOzs7Ozs7O0dBQzNFLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvY29tbWFuZHMvZ2VuZXJhbC91cmwtZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgeyBCUk9XU0VSX0NBUFMgfSBmcm9tICcuLi8uLi9kZXNpcmVkJztcbmltcG9ydCB7IGluaXREcml2ZXIgfSBmcm9tICcuLi8uLi9oZWxwZXJzL3Nlc3Npb24nO1xuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5sZXQgZHJpdmVyO1xubGV0IGNhcHMgPSBPYmplY3QuYXNzaWduKHt9LCBCUk9XU0VSX0NBUFMpO1xuXG5kZXNjcmliZSgnc2V0VXJsIEBza2lwLWNpJywgZnVuY3Rpb24gKCkge1xuICBiZWZvcmUoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGlmIChwcm9jZXNzLmVudi5URVNUT0JKRUNUX0UyRV9URVNUUykge1xuICAgICAgdGhpcy5za2lwKCk7XG4gICAgfVxuICAgIGRyaXZlciA9IGF3YWl0IGluaXREcml2ZXIoY2Fwcyk7XG4gIH0pO1xuICBhZnRlcihhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGRyaXZlcikge1xuICAgICAgYXdhaXQgZHJpdmVyLnF1aXQoKTtcbiAgICB9XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgYmUgYWJsZSB0byBzdGFydCBhIGRhdGEgdXJpIHZpYSBzZXRVcmwnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGNhcHMuYnJvd3Nlck5hbWUgPT09ICdDaHJvbWUnKSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBvbiBzb21lIGNocm9tZSBzeXN0ZW1zLCB3ZSBhbHdheXMgZ2V0IHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyBwYWdlXG4gICAgICAgIGxldCBidG4gPSBhd2FpdCBkcml2ZXIuZWxlbWVudEJ5SWQoJ2NvbS5hbmRyb2lkLmNocm9tZTppZC90ZXJtc19hY2NlcHQnKTtcbiAgICAgICAgYXdhaXQgYnRuLmNsaWNrKCk7XG5cbiAgICAgICAgYnRuID0gYXdhaXQgZHJpdmVyLmVsZW1lbnRCeUlkKCdjb20uYW5kcm9pZC5jaHJvbWU6aWQvbmVnYXRpdmVfYnV0dG9uJyk7XG4gICAgICAgIGF3YWl0IGJ0bi5jbGljaygpO1xuICAgICAgfSBjYXRjaCAoaWduKSB7fVxuICAgIH1cblxuICAgIGF3YWl0IGRyaXZlci5nZXQoJ2h0dHA6Ly9zYXVjZWxhYnMuY29tJyk7XG5cbiAgICBhd2FpdCBkcml2ZXIud2FpdEZvckVsZW1lbnRCeVRhZ05hbWUoXCJ0aXRsZVwiKTtcbiAgICBsZXQgZWwgPSBhd2FpdCBkcml2ZXIuZWxlbWVudEJ5VGFnTmFtZShcInRpdGxlXCIpO1xuICAgIGF3YWl0IGVsLmdldEF0dHJpYnV0ZShcImlubmVySFRNTFwiKS5zaG91bGQuZXZlbnR1YWxseS5pbmNsdWRlKCdTYXVjZSBMYWJzJyk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uIn0=
