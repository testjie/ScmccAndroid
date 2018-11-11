'use strict';

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

var atv = 'android.widget.TextView';
var f = "android.widget.FrameLayout";

describe('Find - xpath', function () {
  var driver = undefined;
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(_desired.APIDEMOS_CAPS));

        case 2:
          driver = context$2$0.sent;

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
          return _regeneratorRuntime.awrap(driver.quit());

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find element by type', function callee$1$0() {
    var el, text;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementByXPath('//' + atv));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(el.text());

        case 5:
          text = context$2$0.sent;

          text.toLowerCase().should.equal('api demos');

        case 7:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find element by text', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementByXPath('//' + atv + '[@text=\'Accessibility\']'));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(el.text().should.eventually.equal('Accessibility'));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find element by attribute', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementsByXPath('//*[@enabled=\'true\' and @focused=\'true\']').should.eventually.have.length(1));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find exactly one element via elementsByXPath', function callee$1$0() {
    var els;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementsByXPath('//' + atv + '[@text=\'Accessibility\']'));

        case 2:
          els = context$2$0.sent;

          els.length.should.equal(1);
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(els[0].text().should.eventually.equal('Accessibility'));

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find element by partial text', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementByXPath('//' + atv + '[contains(@text, \'Accessibility\')]'));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(el.text().should.eventually.equal('Accessibility'));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find the last element', function callee$1$0() {
    var el, text;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementByXPath('(//' + atv + ')[last()]'));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(el.text());

        case 5:
          text = context$2$0.sent;

          ["OS", "Text", "Views", "Preference"].should.include(text);

        case 7:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find element by index and embedded desc', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementByXPath('//' + f + '//' + atv + '[5]'));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(el.text().should.eventually.equal('Content'));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find all elements', function callee$1$0() {
    var els;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementsByXPath('//*'));

        case 2:
          els = context$2$0.sent;

          els.length.should.be.above(2);

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find the first element when searching for all elements', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementByXPath('//*'));

        case 2:
          el = context$2$0.sent;

          el.should.exist;

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find less elements with compression turned on', function callee$1$0() {
    var elementsWithoutCompression, elementsWithCompression;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.updateSettings({ "ignoreUnimportantViews": false }));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.elementsByXPath('//*'));

        case 4:
          elementsWithoutCompression = context$2$0.sent;
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(driver.updateSettings({ "ignoreUnimportantViews": true }));

        case 7:
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(driver.elementsByXPath('//*'));

        case 9:
          elementsWithCompression = context$2$0.sent;

          elementsWithoutCompression.length.should.be.greaterThan(elementsWithCompression.length);

        case 11:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find toast message element by text @skip-ci', function callee$1$0() {
    var popUpEl, searchEl, addEl;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          // skip on travis, as it is too slow and the message is removed before
          // we can find it
          if (process.env.TESTOBJECT_E2E_TESTS) {
            this.skip();
          }

          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.startActivity({ appPackage: 'io.appium.android.apis', appActivity: '.view.PopupMenu1' }));

        case 3:
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.waitForElementByAccessibilityId('Make a Popup!'));

        case 5:
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(driver.elementByAccessibilityId('Make a Popup!'));

        case 7:
          popUpEl = context$2$0.sent;
          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(popUpEl.click());

        case 10:
          context$2$0.next = 12;
          return _regeneratorRuntime.awrap(driver.waitForElementByXPath('.//*[@text=\'Search\']'));

        case 12:
          context$2$0.next = 14;
          return _regeneratorRuntime.awrap(driver.elementByXPath('.//*[@text=\'Search\']'));

        case 14:
          searchEl = context$2$0.sent;
          context$2$0.next = 17;
          return _regeneratorRuntime.awrap(searchEl.click());

        case 17:
          context$2$0.next = 19;
          return _regeneratorRuntime.awrap(driver.elementByXPath('//*[@text=\'Clicked popup menu item Search\']').should.eventually.exist);

        case 19:
          context$2$0.next = 21;
          return _regeneratorRuntime.awrap(popUpEl.click());

        case 21:
          context$2$0.next = 23;
          return _regeneratorRuntime.awrap(driver.waitForElementByXPath('.//*[@text=\'Add\']'));

        case 23:
          context$2$0.next = 25;
          return _regeneratorRuntime.awrap(driver.elementByXPath('.//*[@text=\'Add\']'));

        case 25:
          addEl = context$2$0.sent;
          context$2$0.next = 28;
          return _regeneratorRuntime.awrap(addEl.click());

        case 28:
          context$2$0.next = 30;
          return _regeneratorRuntime.awrap(driver.elementByXPath('//*[@text=\'Clicked popup menu item Add\']').should.eventually.exist);

        case 30:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9maW5kL2J5LXhwYXRoLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O3VCQUNmLGVBQWU7OzhCQUNsQix1QkFBdUI7O0FBR2xELGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsSUFBTSxHQUFHLEdBQUcseUJBQXlCLENBQUM7QUFDdEMsSUFBTSxDQUFDLEdBQUcsNEJBQTRCLENBQUM7O0FBRXZDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsWUFBWTtBQUNuQyxNQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsUUFBTSxDQUFDOzs7OzsyQ0FDVSx1REFBeUI7OztBQUF4QyxnQkFBTTs7Ozs7OztHQUNQLENBQUMsQ0FBQztBQUNILE9BQUssQ0FBQzs7Ozs7MkNBQ0UsTUFBTSxDQUFDLElBQUksRUFBRTs7Ozs7OztHQUNwQixDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsNkJBQTZCLEVBQUU7UUFDNUIsRUFBRSxFQUNBLElBQUk7Ozs7OzJDQURLLE1BQU0sQ0FBQyxjQUFjLFFBQU0sR0FBRyxDQUFHOzs7QUFBNUMsWUFBRTs7MkNBQ2EsRUFBRSxDQUFDLElBQUksRUFBRTs7O0FBQXRCLGNBQUk7O0FBQ1YsY0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7Ozs7Ozs7R0FDOUMsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLDZCQUE2QixFQUFFO1FBQzVCLEVBQUU7Ozs7OzJDQUFTLE1BQU0sQ0FBQyxjQUFjLFFBQU0sR0FBRywrQkFBMEI7OztBQUFuRSxZQUFFOzsyQ0FDQSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDOzs7Ozs7O0dBQ3pELENBQUMsQ0FBQztBQUNI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Q0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUU7QUFDcEMsZ0JBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztXQUNiOzs7MkNBRUssTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFDLFVBQVUsRUFBRSx3QkFBd0IsRUFBRSxXQUFXLEVBQUUsa0JBQWtCLEVBQUMsQ0FBQzs7OzsyQ0FDN0YsTUFBTSxDQUFDLCtCQUErQixDQUFDLGVBQWUsQ0FBQzs7OzsyQ0FDekMsTUFBTSxDQUFDLHdCQUF3QixDQUFDLGVBQWUsQ0FBQzs7O0FBQWhFLGlCQUFPOzsyQ0FFTCxPQUFPLENBQUMsS0FBSyxFQUFFOzs7OzJDQUNmLE1BQU0sQ0FBQyxxQkFBcUIsMEJBQXdCOzs7OzJDQUNyQyxNQUFNLENBQUMsY0FBYywwQkFBd0I7OztBQUE5RCxrQkFBUTs7MkNBQ04sUUFBUSxDQUFDLEtBQUssRUFBRTs7OzsyQ0FDaEIsTUFBTSxDQUFDLGNBQWMsaURBQStDLENBQ3JFLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSzs7OzsyQ0FFdEIsT0FBTyxDQUFDLEtBQUssRUFBRTs7OzsyQ0FDZixNQUFNLENBQUMscUJBQXFCLHVCQUFxQjs7OzsyQ0FDckMsTUFBTSxDQUFDLGNBQWMsdUJBQXFCOzs7QUFBeEQsZUFBSzs7MkNBQ0gsS0FBSyxDQUFDLEtBQUssRUFBRTs7OzsyQ0FDYixNQUFNLENBQUMsY0FBYyw4Q0FBNEMsQ0FDbEUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLOzs7Ozs7O0dBQzdCLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvY29tbWFuZHMvZmluZC9ieS14cGF0aC1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCB7IEFQSURFTU9TX0NBUFMgfSBmcm9tICcuLi8uLi9kZXNpcmVkJztcbmltcG9ydCB7IGluaXREcml2ZXIgfSBmcm9tICcuLi8uLi9oZWxwZXJzL3Nlc3Npb24nO1xuXG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmNvbnN0IGF0diA9ICdhbmRyb2lkLndpZGdldC5UZXh0Vmlldyc7XG5jb25zdCBmID0gXCJhbmRyb2lkLndpZGdldC5GcmFtZUxheW91dFwiO1xuXG5kZXNjcmliZSgnRmluZCAtIHhwYXRoJywgZnVuY3Rpb24gKCkge1xuICBsZXQgZHJpdmVyO1xuICBiZWZvcmUoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGRyaXZlciA9IGF3YWl0IGluaXREcml2ZXIoQVBJREVNT1NfQ0FQUyk7XG4gIH0pO1xuICBhZnRlcihhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLnF1aXQoKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCBlbGVtZW50IGJ5IHR5cGUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGVsID0gYXdhaXQgZHJpdmVyLmVsZW1lbnRCeVhQYXRoKGAvLyR7YXR2fWApO1xuICAgIGNvbnN0IHRleHQgPSBhd2FpdCBlbC50ZXh0KCk7XG4gICAgdGV4dC50b0xvd2VyQ2FzZSgpLnNob3VsZC5lcXVhbCgnYXBpIGRlbW9zJyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgZWxlbWVudCBieSB0ZXh0JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBlbCA9IGF3YWl0IGRyaXZlci5lbGVtZW50QnlYUGF0aChgLy8ke2F0dn1bQHRleHQ9J0FjY2Vzc2liaWxpdHknXWApO1xuICAgIGF3YWl0IGVsLnRleHQoKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCgnQWNjZXNzaWJpbGl0eScpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBmaW5kIGVsZW1lbnQgYnkgYXR0cmlidXRlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5lbGVtZW50c0J5WFBhdGgoYC8vKltAZW5hYmxlZD0ndHJ1ZScgYW5kIEBmb2N1c2VkPSd0cnVlJ11gKVxuICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmhhdmUubGVuZ3RoKDEpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBmaW5kIGV4YWN0bHkgb25lIGVsZW1lbnQgdmlhIGVsZW1lbnRzQnlYUGF0aCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgZWxzID0gYXdhaXQgZHJpdmVyLmVsZW1lbnRzQnlYUGF0aChgLy8ke2F0dn1bQHRleHQ9J0FjY2Vzc2liaWxpdHknXWApO1xuICAgIGVscy5sZW5ndGguc2hvdWxkLmVxdWFsKDEpO1xuICAgIGF3YWl0IGVsc1swXS50ZXh0KCkuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwoJ0FjY2Vzc2liaWxpdHknKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCBlbGVtZW50IGJ5IHBhcnRpYWwgdGV4dCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgZWwgPSBhd2FpdCBkcml2ZXIuZWxlbWVudEJ5WFBhdGgoYC8vJHthdHZ9W2NvbnRhaW5zKEB0ZXh0LCAnQWNjZXNzaWJpbGl0eScpXWApO1xuICAgIGF3YWl0IGVsLnRleHQoKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCgnQWNjZXNzaWJpbGl0eScpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBmaW5kIHRoZSBsYXN0IGVsZW1lbnQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGVsID0gYXdhaXQgZHJpdmVyLmVsZW1lbnRCeVhQYXRoKGAoLy8ke2F0dn0pW2xhc3QoKV1gKTtcbiAgICBsZXQgdGV4dCA9IGF3YWl0IGVsLnRleHQoKTtcbiAgICBbXCJPU1wiLCBcIlRleHRcIiwgXCJWaWV3c1wiLCBcIlByZWZlcmVuY2VcIl0uc2hvdWxkLmluY2x1ZGUodGV4dCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgZWxlbWVudCBieSBpbmRleCBhbmQgZW1iZWRkZWQgZGVzYycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgZWwgPSBhd2FpdCBkcml2ZXIuZWxlbWVudEJ5WFBhdGgoYC8vJHtmfS8vJHthdHZ9WzVdYCk7XG4gICAgYXdhaXQgZWwudGV4dCgpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdDb250ZW50Jyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgYWxsIGVsZW1lbnRzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBlbHMgPSBhd2FpdCBkcml2ZXIuZWxlbWVudHNCeVhQYXRoKGAvLypgKTtcbiAgICBlbHMubGVuZ3RoLnNob3VsZC5iZS5hYm92ZSgyKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCB0aGUgZmlyc3QgZWxlbWVudCB3aGVuIHNlYXJjaGluZyBmb3IgYWxsIGVsZW1lbnRzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBlbCA9IGF3YWl0IGRyaXZlci5lbGVtZW50QnlYUGF0aChgLy8qYCk7XG4gICAgZWwuc2hvdWxkLmV4aXN0O1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBmaW5kIGxlc3MgZWxlbWVudHMgd2l0aCBjb21wcmVzc2lvbiB0dXJuZWQgb24nLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLnVwZGF0ZVNldHRpbmdzKHtcImlnbm9yZVVuaW1wb3J0YW50Vmlld3NcIjogZmFsc2V9KTtcbiAgICBsZXQgZWxlbWVudHNXaXRob3V0Q29tcHJlc3Npb24gPSBhd2FpdCBkcml2ZXIuZWxlbWVudHNCeVhQYXRoKGAvLypgKTtcbiAgICBhd2FpdCBkcml2ZXIudXBkYXRlU2V0dGluZ3Moe1wiaWdub3JlVW5pbXBvcnRhbnRWaWV3c1wiOiB0cnVlfSk7XG4gICAgbGV0IGVsZW1lbnRzV2l0aENvbXByZXNzaW9uID0gYXdhaXQgZHJpdmVyLmVsZW1lbnRzQnlYUGF0aChgLy8qYCk7XG4gICAgZWxlbWVudHNXaXRob3V0Q29tcHJlc3Npb24ubGVuZ3RoLnNob3VsZC5iZS5ncmVhdGVyVGhhbihlbGVtZW50c1dpdGhDb21wcmVzc2lvbi5sZW5ndGgpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBmaW5kIHRvYXN0IG1lc3NhZ2UgZWxlbWVudCBieSB0ZXh0IEBza2lwLWNpJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIC8vIHNraXAgb24gdHJhdmlzLCBhcyBpdCBpcyB0b28gc2xvdyBhbmQgdGhlIG1lc3NhZ2UgaXMgcmVtb3ZlZCBiZWZvcmVcbiAgICAvLyB3ZSBjYW4gZmluZCBpdFxuICAgIGlmIChwcm9jZXNzLmVudi5URVNUT0JKRUNUX0UyRV9URVNUUykge1xuICAgICAgdGhpcy5za2lwKCk7XG4gICAgfVxuXG4gICAgYXdhaXQgZHJpdmVyLnN0YXJ0QWN0aXZpdHkoe2FwcFBhY2thZ2U6ICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJywgYXBwQWN0aXZpdHk6ICcudmlldy5Qb3B1cE1lbnUxJ30pO1xuICAgIGF3YWl0IGRyaXZlci53YWl0Rm9yRWxlbWVudEJ5QWNjZXNzaWJpbGl0eUlkKCdNYWtlIGEgUG9wdXAhJyk7XG4gICAgbGV0IHBvcFVwRWwgPSBhd2FpdCBkcml2ZXIuZWxlbWVudEJ5QWNjZXNzaWJpbGl0eUlkKCdNYWtlIGEgUG9wdXAhJyk7XG5cbiAgICBhd2FpdCBwb3BVcEVsLmNsaWNrKCk7XG4gICAgYXdhaXQgZHJpdmVyLndhaXRGb3JFbGVtZW50QnlYUGF0aChgLi8vKltAdGV4dD0nU2VhcmNoJ11gKTtcbiAgICBsZXQgc2VhcmNoRWwgPSBhd2FpdCBkcml2ZXIuZWxlbWVudEJ5WFBhdGgoYC4vLypbQHRleHQ9J1NlYXJjaCddYCk7XG4gICAgYXdhaXQgc2VhcmNoRWwuY2xpY2soKTtcbiAgICBhd2FpdCBkcml2ZXIuZWxlbWVudEJ5WFBhdGgoYC8vKltAdGV4dD0nQ2xpY2tlZCBwb3B1cCBtZW51IGl0ZW0gU2VhcmNoJ11gKVxuICAgICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuZXhpc3Q7XG5cbiAgICBhd2FpdCBwb3BVcEVsLmNsaWNrKCk7XG4gICAgYXdhaXQgZHJpdmVyLndhaXRGb3JFbGVtZW50QnlYUGF0aChgLi8vKltAdGV4dD0nQWRkJ11gKTtcbiAgICBsZXQgYWRkRWwgPSBhd2FpdCBkcml2ZXIuZWxlbWVudEJ5WFBhdGgoYC4vLypbQHRleHQ9J0FkZCddYCk7XG4gICAgYXdhaXQgYWRkRWwuY2xpY2soKTtcbiAgICBhd2FpdCBkcml2ZXIuZWxlbWVudEJ5WFBhdGgoYC8vKltAdGV4dD0nQ2xpY2tlZCBwb3B1cCBtZW51IGl0ZW0gQWRkJ11gKVxuICAgICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuZXhpc3Q7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uIn0=
