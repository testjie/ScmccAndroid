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

describe('Find - basic', function () {
  var driver = undefined;
  var singleResourceId = 'decor_content_parent';
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
  it('should find a single element by content-description', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementByAccessibilityId('Animation'));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(el.text().should.eventually.equal('Animation'));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find an element by class name', function callee$1$0() {
    var el, text;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementByClassName('android.widget.TextView'));

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
  it('should find multiple elements by class name', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementsByClassName('android.widget.TextView').should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should not find multiple elements that doesnt exist', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementsByClassName('blargimarg').should.eventually.have.length(0));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should fail on empty locator', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementsByClassName('').should.be.rejectedWith(/selector/));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find a single element by resource-id', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementById('android:id/' + singleResourceId).should.eventually.exist);

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find multiple elements by resource-id', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementsById('android:id/text1').should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find multiple elements by resource-id even when theres just one', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementsById('android:id/' + singleResourceId).should.eventually.have.length(1));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  describe('implicit wait', function () {
    var implicitWaitTimeout = 5000;
    before(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.setImplicitWaitTimeout(implicitWaitTimeout));

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should respect implicit wait with multiple elements', function callee$2$0() {
      var beforeMs, afterMs;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            beforeMs = Date.now();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.elementsById('there_is_nothing_called_this').should.eventually.have.length(0));

          case 3:
            afterMs = Date.now();

            (afterMs - beforeMs).should.be.below(implicitWaitTimeout * 2);

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9maW5kL2ZpbmQtYmFzaWMtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7dUJBQ2YsZUFBZTs7OEJBQ2xCLHVCQUF1Qjs7QUFHbEQsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixRQUFRLENBQUMsY0FBYyxFQUFFLFlBQVk7QUFDbkMsTUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLE1BQUksZ0JBQWdCLEdBQUcsc0JBQXNCLENBQUM7QUFDOUMsUUFBTSxDQUFDOzs7OzsyQ0FDVSx1REFBeUI7OztBQUF4QyxnQkFBTTs7Ozs7OztHQUNQLENBQUMsQ0FBQztBQUNILE9BQUssQ0FBQzs7Ozs7MkNBQ0UsTUFBTSxDQUFDLElBQUksRUFBRTs7Ozs7OztHQUNwQixDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMscURBQXFELEVBQUU7UUFDcEQsRUFBRTs7Ozs7MkNBQVMsTUFBTSxDQUFDLHdCQUF3QixDQUFDLFdBQVcsQ0FBQzs7O0FBQXZELFlBQUU7OzJDQUNBLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7Ozs7Ozs7R0FDckQsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLHNDQUFzQyxFQUFFO1FBQ3JDLEVBQUUsRUFDQSxJQUFJOzs7OzsyQ0FESyxNQUFNLENBQUMsa0JBQWtCLENBQUMseUJBQXlCLENBQUM7OztBQUEvRCxZQUFFOzsyQ0FDYSxFQUFFLENBQUMsSUFBSSxFQUFFOzs7QUFBdEIsY0FBSTs7QUFDVixjQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQzs7Ozs7OztHQUM5QyxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsNkNBQTZDLEVBQUU7Ozs7OzJDQUMxQyxNQUFNLENBQUMsbUJBQW1CLENBQUMseUJBQXlCLENBQUMsQ0FDeEQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDOzs7Ozs7O0dBQzlDLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyxxREFBcUQsRUFBRTs7Ozs7MkNBQ2xELE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsQ0FDM0MsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7Ozs7OztHQUNwQyxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsOEJBQThCLEVBQUU7Ozs7OzJDQUMzQixNQUFNLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDOzs7Ozs7O0dBQ3hFLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyw2Q0FBNkMsRUFBRTs7Ozs7MkNBQzFDLE1BQU0sQ0FBQyxXQUFXLGlCQUFlLGdCQUFnQixDQUFHLENBQ3ZELE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSzs7Ozs7OztHQUMzQixDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsOENBQThDLEVBQUU7Ozs7OzJDQUMzQyxNQUFNLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLENBQzFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQzs7Ozs7OztHQUM5QyxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsd0VBQXdFLEVBQUU7Ozs7OzJDQUNyRSxNQUFNLENBQUMsWUFBWSxpQkFBZSxnQkFBZ0IsQ0FBRyxDQUN4RCxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOzs7Ozs7O0dBQ3BDLENBQUMsQ0FBQzs7QUFFSCxVQUFRLENBQUMsZUFBZSxFQUFFLFlBQVk7QUFDcEMsUUFBSSxtQkFBbUIsR0FBRyxJQUFJLENBQUM7QUFDL0IsVUFBTSxDQUFDOzs7Ozs2Q0FDQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsbUJBQW1CLENBQUM7Ozs7Ozs7S0FDekQsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLHFEQUFxRCxFQUFFO1VBQ3BELFFBQVEsRUFHUixPQUFPOzs7O0FBSFAsb0JBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFOzs2Q0FDbkIsTUFBTSxDQUFDLFlBQVksQ0FBQyw4QkFBOEIsQ0FBQyxDQUN0RCxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOzs7QUFDL0IsbUJBQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFOztBQUN4QixhQUFDLE9BQU8sR0FBRyxRQUFRLENBQUEsQ0FBRSxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLENBQUMsQ0FBQzs7Ozs7OztLQUMvRCxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2NvbW1hbmRzL2ZpbmQvZmluZC1iYXNpYy1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCB7IEFQSURFTU9TX0NBUFMgfSBmcm9tICcuLi8uLi9kZXNpcmVkJztcbmltcG9ydCB7IGluaXREcml2ZXIgfSBmcm9tICcuLi8uLi9oZWxwZXJzL3Nlc3Npb24nO1xuXG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmRlc2NyaWJlKCdGaW5kIC0gYmFzaWMnLCBmdW5jdGlvbiAoKSB7XG4gIGxldCBkcml2ZXI7XG4gIGxldCBzaW5nbGVSZXNvdXJjZUlkID0gJ2RlY29yX2NvbnRlbnRfcGFyZW50JztcbiAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBkcml2ZXIgPSBhd2FpdCBpbml0RHJpdmVyKEFQSURFTU9TX0NBUFMpO1xuICB9KTtcbiAgYWZ0ZXIoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5xdWl0KCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgYSBzaW5nbGUgZWxlbWVudCBieSBjb250ZW50LWRlc2NyaXB0aW9uJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBlbCA9IGF3YWl0IGRyaXZlci5lbGVtZW50QnlBY2Nlc3NpYmlsaXR5SWQoJ0FuaW1hdGlvbicpO1xuICAgIGF3YWl0IGVsLnRleHQoKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCgnQW5pbWF0aW9uJyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgYW4gZWxlbWVudCBieSBjbGFzcyBuYW1lJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBlbCA9IGF3YWl0IGRyaXZlci5lbGVtZW50QnlDbGFzc05hbWUoJ2FuZHJvaWQud2lkZ2V0LlRleHRWaWV3Jyk7XG4gICAgY29uc3QgdGV4dCA9IGF3YWl0IGVsLnRleHQoKTtcbiAgICB0ZXh0LnRvTG93ZXJDYXNlKCkuc2hvdWxkLmVxdWFsKCdhcGkgZGVtb3MnKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCBtdWx0aXBsZSBlbGVtZW50cyBieSBjbGFzcyBuYW1lJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5lbGVtZW50c0J5Q2xhc3NOYW1lKCdhbmRyb2lkLndpZGdldC5UZXh0VmlldycpXG4gICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuaGF2ZS5sZW5ndGguYXQubGVhc3QoMTApO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBub3QgZmluZCBtdWx0aXBsZSBlbGVtZW50cyB0aGF0IGRvZXNudCBleGlzdCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIuZWxlbWVudHNCeUNsYXNzTmFtZSgnYmxhcmdpbWFyZycpXG4gICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuaGF2ZS5sZW5ndGgoMCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZhaWwgb24gZW1wdHkgbG9jYXRvcicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIuZWxlbWVudHNCeUNsYXNzTmFtZSgnJykuc2hvdWxkLmJlLnJlamVjdGVkV2l0aCgvc2VsZWN0b3IvKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCBhIHNpbmdsZSBlbGVtZW50IGJ5IHJlc291cmNlLWlkJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5lbGVtZW50QnlJZChgYW5kcm9pZDppZC8ke3NpbmdsZVJlc291cmNlSWR9YClcbiAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5leGlzdDtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCBtdWx0aXBsZSBlbGVtZW50cyBieSByZXNvdXJjZS1pZCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIuZWxlbWVudHNCeUlkKCdhbmRyb2lkOmlkL3RleHQxJylcbiAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5oYXZlLmxlbmd0aC5hdC5sZWFzdCgxMCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgbXVsdGlwbGUgZWxlbWVudHMgYnkgcmVzb3VyY2UtaWQgZXZlbiB3aGVuIHRoZXJlcyBqdXN0IG9uZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIuZWxlbWVudHNCeUlkKGBhbmRyb2lkOmlkLyR7c2luZ2xlUmVzb3VyY2VJZH1gKVxuICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmhhdmUubGVuZ3RoKDEpO1xuICB9KTtcblxuICBkZXNjcmliZSgnaW1wbGljaXQgd2FpdCcsIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgaW1wbGljaXRXYWl0VGltZW91dCA9IDUwMDA7XG4gICAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGF3YWl0IGRyaXZlci5zZXRJbXBsaWNpdFdhaXRUaW1lb3V0KGltcGxpY2l0V2FpdFRpbWVvdXQpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgcmVzcGVjdCBpbXBsaWNpdCB3YWl0IHdpdGggbXVsdGlwbGUgZWxlbWVudHMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgYmVmb3JlTXMgPSBEYXRlLm5vdygpO1xuICAgICAgYXdhaXQgZHJpdmVyLmVsZW1lbnRzQnlJZCgndGhlcmVfaXNfbm90aGluZ19jYWxsZWRfdGhpcycpXG4gICAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5oYXZlLmxlbmd0aCgwKTtcbiAgICAgIGxldCBhZnRlck1zID0gRGF0ZS5ub3coKTtcbiAgICAgIChhZnRlck1zIC0gYmVmb3JlTXMpLnNob3VsZC5iZS5iZWxvdyhpbXBsaWNpdFdhaXRUaW1lb3V0ICogMik7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uIn0=
