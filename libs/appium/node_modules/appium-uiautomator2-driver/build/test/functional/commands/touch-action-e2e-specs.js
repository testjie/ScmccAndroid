'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _wd = require('wd');

var _wd2 = _interopRequireDefault(_wd);

var _desired = require('../desired');

var _helpersSession = require('../helpers/session');

var _helpersHelpers = require('../helpers/helpers');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('apidemo - touch', function () {

  function assertElementPresent(driver) {
    var present = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
    var text = arguments.length <= 2 || arguments[2] === undefined ? 'Abertam' : arguments[2];
    var els;
    return _regeneratorRuntime.async(function assertElementPresent$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementsByXPath('//*[@text=\'' + text + '\']'));

        case 2:
          els = context$2$0.sent;

          els.should.be.an['instanceof'](Array);
          els.should.have.length(present ? 1 : 0);

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  }

  describe('multi-actions', function () {
    var driver = undefined;
    before(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(_Object$assign({}, _desired.APIDEMOS_CAPS, {
              appPackage: 'io.appium.android.apis',
              appActivity: '.view.SplitTouchView'
            })));

          case 2:
            driver = context$3$0.sent;

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    after(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.quit());

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('should scroll two different lists', function callee$2$0() {
      var _ref, _ref2, leftEl, rightEl, leftGesture, rightGesture, multiAction;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.elementsByClassName('android.widget.ListView'));

          case 2:
            _ref = context$3$0.sent;
            _ref2 = _slicedToArray(_ref, 2);
            leftEl = _ref2[0];
            rightEl = _ref2[1];
            leftGesture = new _wd2['default'].TouchAction().press({ element: leftEl }).moveTo({ element: leftEl, x: 10, y: 0 }).moveTo({ element: leftEl, x: 10, y: -75 }).moveTo({ element: leftEl, x: 10, y: -150 });
            rightGesture = new _wd2['default'].TouchAction().press({ element: rightEl }).moveTo({ element: rightEl, x: 10, y: 0 }).moveTo({ element: rightEl, x: 10, y: -75 }).moveTo({ element: rightEl, x: 10, y: -150 });
            multiAction = new _wd2['default'].MultiAction();

            multiAction.add(leftGesture, rightGesture);

            context$3$0.next = 12;
            return _regeneratorRuntime.awrap(driver.performMultiAction(multiAction));

          case 12:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('swipe-action', function () {
    var driver = undefined;
    before(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(_Object$assign({}, _desired.APIDEMOS_CAPS, {
              appPackage: 'io.appium.android.apis',
              appActivity: '.view.List1'
            })));

          case 2:
            driver = context$3$0.sent;

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    after(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.quit());

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('should swipe', function callee$2$0() {
      var action, el;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(assertElementPresent(driver, true));

          case 2:
            action = new _wd2['default'].TouchAction();
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.elementByXPath("//*[@text='Abertam']"));

          case 5:
            el = context$3$0.sent;

            action.press({ element: el }).wait(300).moveTo({ element: el, x: 0, y: -1500 }).release();
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(driver.performTouchAction(action));

          case 9:
            context$3$0.next = 11;
            return _regeneratorRuntime.awrap(assertElementPresent(driver, false));

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('mobile: scrollBackTo', function () {
    var driver = undefined;
    before(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap((0, _helpersHelpers.isArmEmu)());

          case 2:
            if (!context$3$0.sent) {
              context$3$0.next = 4;
              break;
            }

            // on slower emus like arm emus, this test fails due to
            // https://github.com/appium/appium/issues/9328, so quarantine until
            // that is fixed
            this.skip();

          case 4:
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(_Object$assign({}, _desired.APIDEMOS_CAPS, {
              appPackage: 'io.appium.android.apis',
              appActivity: '.view.List1'
            })));

          case 6:
            driver = context$3$0.sent;

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    after(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            if (!driver) {
              context$3$0.next = 3;
              break;
            }

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.quit());

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('should scroll to an element', function callee$2$0() {
      var cheeseForScroll, scrollableContainer, scrollToEl, action, isFound;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            cheeseForScroll = 'Abertam';
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.elementByXPath("//*[@scrollable='true']"));

          case 3:
            scrollableContainer = context$3$0.sent;
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(driver.elementByAndroidUIAutomator('new UiSelector().text("' + cheeseForScroll + '")'));

          case 6:
            scrollToEl = context$3$0.sent;
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(assertElementPresent(driver, true));

          case 9:
            action = new _wd2['default'].TouchAction();

            action.press({ element: scrollToEl }).wait(300).moveTo({ element: scrollToEl, x: 0, y: -1500 }).release();
            context$3$0.next = 13;
            return _regeneratorRuntime.awrap(driver.performTouchAction(action));

          case 13:
            context$3$0.next = 15;
            return _regeneratorRuntime.awrap(assertElementPresent(driver, false, cheeseForScroll));

          case 15:
            context$3$0.next = 17;
            return _regeneratorRuntime.awrap(driver.execute("mobile: scrollBackTo", {
              elementId: scrollableContainer.value,
              elementToId: scrollToEl.value
            }));

          case 17:
            isFound = context$3$0.sent;

            isFound.should.be['true'];
            context$3$0.next = 21;
            return _regeneratorRuntime.awrap(assertElementPresent(driver, true, cheeseForScroll));

          case 21:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});

// first find the scrolling container

// then find the element we will scroll back to

// verify the element exists, then use a touchaction to scroll it out of
// view

// verify the element no longer exists

// finally, use scrollBackTo to intelligently scroll back to a point
// where the element is visible, and verify the result
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy90b3VjaC1hY3Rpb24tZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O2tCQUM5QixJQUFJOzs7O3VCQUNXLFlBQVk7OzhCQUNmLG9CQUFvQjs7OEJBQ3RCLG9CQUFvQjs7QUFHN0Msa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixRQUFRLENBQUMsaUJBQWlCLEVBQUUsWUFBWTs7QUFFdEMsV0FBZSxvQkFBb0IsQ0FBRSxNQUFNO1FBQUUsT0FBTyx5REFBRyxJQUFJO1FBQUUsSUFBSSx5REFBRyxTQUFTO1FBQ3ZFLEdBQUc7Ozs7OzJDQUFTLE1BQU0sQ0FBQyxlQUFlLGtCQUFlLElBQUksU0FBSzs7O0FBQTFELGFBQUc7O0FBQ1AsYUFBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxjQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbkMsYUFBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7R0FDekM7O0FBRUQsVUFBUSxDQUFDLGVBQWUsRUFBRSxZQUFZO0FBQ3BDLFFBQUksTUFBTSxZQUFBLENBQUM7QUFDWCxVQUFNLENBQUM7Ozs7OzZDQUNVLGdDQUFXLGVBQWMsRUFBRSwwQkFBaUI7QUFDekQsd0JBQVUsRUFBRSx3QkFBd0I7QUFDcEMseUJBQVcsRUFBRSxzQkFBc0I7YUFDcEMsQ0FBQyxDQUFDOzs7QUFISCxrQkFBTTs7Ozs7OztLQUlQLENBQUMsQ0FBQztBQUNILFNBQUssQ0FBQzs7Ozs7NkNBQ0UsTUFBTSxDQUFDLElBQUksRUFBRTs7Ozs7OztLQUNwQixDQUFDLENBQUM7O0FBRUgsTUFBRSxDQUFDLG1DQUFtQyxFQUFFO3VCQUNqQyxNQUFNLEVBQUUsT0FB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QUU7QUFDekQsdUJBQVMsRUFBRSxtQkFBbUIsQ0FBQyxLQUFLO0FBQ3BDLHlCQUFXLEVBQUUsVUFBVSxDQUFDLEtBQUs7YUFDOUIsQ0FBQzs7O0FBSEUsbUJBQU87O0FBSVgsbUJBQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFLLENBQUM7OzZDQUNqQixvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLGVBQWUsQ0FBQzs7Ozs7OztLQUMxRCxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2NvbW1hbmRzL3RvdWNoLWFjdGlvbi1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCB3ZCBmcm9tICd3ZCc7XG5pbXBvcnQgeyBBUElERU1PU19DQVBTIH0gZnJvbSAnLi4vZGVzaXJlZCc7XG5pbXBvcnQgeyBpbml0RHJpdmVyIH0gZnJvbSAnLi4vaGVscGVycy9zZXNzaW9uJztcbmltcG9ydCB7IGlzQXJtRW11IH0gZnJvbSAnLi4vaGVscGVycy9oZWxwZXJzJztcblxuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5kZXNjcmliZSgnYXBpZGVtbyAtIHRvdWNoJywgZnVuY3Rpb24gKCkge1xuXG4gIGFzeW5jIGZ1bmN0aW9uIGFzc2VydEVsZW1lbnRQcmVzZW50IChkcml2ZXIsIHByZXNlbnQgPSB0cnVlLCB0ZXh0ID0gJ0FiZXJ0YW0nKSB7XG4gICAgbGV0IGVscyA9IGF3YWl0IGRyaXZlci5lbGVtZW50c0J5WFBhdGgoYC8vKltAdGV4dD0nJHt0ZXh0fSddYCk7XG4gICAgZWxzLnNob3VsZC5iZS5hbi5pbnN0YW5jZW9mKEFycmF5KTtcbiAgICBlbHMuc2hvdWxkLmhhdmUubGVuZ3RoKHByZXNlbnQgPyAxIDogMCk7XG4gIH1cblxuICBkZXNjcmliZSgnbXVsdGktYWN0aW9ucycsIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgZHJpdmVyO1xuICAgIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBkcml2ZXIgPSBhd2FpdCBpbml0RHJpdmVyKE9iamVjdC5hc3NpZ24oe30sIEFQSURFTU9TX0NBUFMsIHtcbiAgICAgICAgYXBwUGFja2FnZTogJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnLFxuICAgICAgICBhcHBBY3Rpdml0eTogJy52aWV3LlNwbGl0VG91Y2hWaWV3JyxcbiAgICAgIH0pKTtcbiAgICB9KTtcbiAgICBhZnRlcihhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBhd2FpdCBkcml2ZXIucXVpdCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBzY3JvbGwgdHdvIGRpZmZlcmVudCBsaXN0cycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBbbGVmdEVsLCByaWdodEVsXSA9IGF3YWl0IGRyaXZlci5lbGVtZW50c0J5Q2xhc3NOYW1lKCdhbmRyb2lkLndpZGdldC5MaXN0VmlldycpO1xuXG4gICAgICBjb25zdCBsZWZ0R2VzdHVyZSA9IG5ldyB3ZC5Ub3VjaEFjdGlvbigpXG4gICAgICAgIC5wcmVzcyh7ZWxlbWVudDogbGVmdEVsfSlcbiAgICAgICAgLm1vdmVUbyh7ZWxlbWVudDogbGVmdEVsLCB4OiAxMCwgeTogMH0pXG4gICAgICAgIC5tb3ZlVG8oe2VsZW1lbnQ6IGxlZnRFbCwgeDogMTAsIHk6IC03NX0pXG4gICAgICAgIC5tb3ZlVG8oe2VsZW1lbnQ6IGxlZnRFbCwgeDogMTAsIHk6IC0xNTB9KTtcblxuICAgICAgY29uc3QgcmlnaHRHZXN0dXJlID0gbmV3IHdkLlRvdWNoQWN0aW9uKClcbiAgICAgICAgLnByZXNzKHtlbGVtZW50OiByaWdodEVsfSlcbiAgICAgICAgLm1vdmVUbyh7ZWxlbWVudDogcmlnaHRFbCwgeDogMTAsIHk6IDB9KVxuICAgICAgICAubW92ZVRvKHtlbGVtZW50OiByaWdodEVsLCB4OiAxMCwgeTogLTc1fSlcbiAgICAgICAgLm1vdmVUbyh7ZWxlbWVudDogcmlnaHRFbCwgeDogMTAsIHk6IC0xNTB9KTtcblxuICAgICAgY29uc3QgbXVsdGlBY3Rpb24gPSBuZXcgd2QuTXVsdGlBY3Rpb24oKTtcbiAgICAgIG11bHRpQWN0aW9uLmFkZChsZWZ0R2VzdHVyZSwgcmlnaHRHZXN0dXJlKTtcblxuICAgICAgYXdhaXQgZHJpdmVyLnBlcmZvcm1NdWx0aUFjdGlvbihtdWx0aUFjdGlvbik7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdzd2lwZS1hY3Rpb24nLCBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGRyaXZlcjtcbiAgICBiZWZvcmUoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgZHJpdmVyID0gYXdhaXQgaW5pdERyaXZlcihPYmplY3QuYXNzaWduKHt9LCBBUElERU1PU19DQVBTLCB7XG4gICAgICAgIGFwcFBhY2thZ2U6ICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJyxcbiAgICAgICAgYXBwQWN0aXZpdHk6ICcudmlldy5MaXN0MScsXG4gICAgICB9KSk7XG4gICAgfSk7XG4gICAgYWZ0ZXIoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgYXdhaXQgZHJpdmVyLnF1aXQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgc3dpcGUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBhd2FpdCBhc3NlcnRFbGVtZW50UHJlc2VudChkcml2ZXIsIHRydWUpO1xuICAgICAgY29uc3QgYWN0aW9uID0gbmV3IHdkLlRvdWNoQWN0aW9uKCk7XG4gICAgICBsZXQgZWwgPSBhd2FpdCBkcml2ZXIuZWxlbWVudEJ5WFBhdGgoXCIvLypbQHRleHQ9J0FiZXJ0YW0nXVwiKTtcbiAgICAgIGFjdGlvbi5wcmVzcyh7ZWxlbWVudDogZWx9KVxuICAgICAgICAud2FpdCgzMDApXG4gICAgICAgIC5tb3ZlVG8oe2VsZW1lbnQ6IGVsLCB4OiAwLCB5OiAtMTUwMH0pXG4gICAgICAgIC5yZWxlYXNlKCk7XG4gICAgICBhd2FpdCBkcml2ZXIucGVyZm9ybVRvdWNoQWN0aW9uKGFjdGlvbik7XG4gICAgICBhd2FpdCBhc3NlcnRFbGVtZW50UHJlc2VudChkcml2ZXIsIGZhbHNlKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ21vYmlsZTogc2Nyb2xsQmFja1RvJywgZnVuY3Rpb24gKCkge1xuICAgIGxldCBkcml2ZXI7XG4gICAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChhd2FpdCBpc0FybUVtdSgpKSB7XG4gICAgICAgIC8vIG9uIHNsb3dlciBlbXVzIGxpa2UgYXJtIGVtdXMsIHRoaXMgdGVzdCBmYWlscyBkdWUgdG9cbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FwcGl1bS9hcHBpdW0vaXNzdWVzLzkzMjgsIHNvIHF1YXJhbnRpbmUgdW50aWxcbiAgICAgICAgLy8gdGhhdCBpcyBmaXhlZFxuICAgICAgICB0aGlzLnNraXAoKTtcbiAgICAgIH1cbiAgICAgIGRyaXZlciA9IGF3YWl0IGluaXREcml2ZXIoT2JqZWN0LmFzc2lnbih7fSwgQVBJREVNT1NfQ0FQUywge1xuICAgICAgICBhcHBQYWNrYWdlOiAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcycsXG4gICAgICAgIGFwcEFjdGl2aXR5OiAnLnZpZXcuTGlzdDEnLFxuICAgICAgfSkpO1xuICAgIH0pO1xuICAgIGFmdGVyKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChkcml2ZXIpIHtcbiAgICAgICAgYXdhaXQgZHJpdmVyLnF1aXQoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgc2Nyb2xsIHRvIGFuIGVsZW1lbnQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBjaGVlc2VGb3JTY3JvbGwgPSAnQWJlcnRhbSc7XG4gICAgICAvLyBmaXJzdCBmaW5kIHRoZSBzY3JvbGxpbmcgY29udGFpbmVyXG4gICAgICBsZXQgc2Nyb2xsYWJsZUNvbnRhaW5lciA9IGF3YWl0IGRyaXZlci5lbGVtZW50QnlYUGF0aChcIi8vKltAc2Nyb2xsYWJsZT0ndHJ1ZSddXCIpO1xuICAgICAgLy8gdGhlbiBmaW5kIHRoZSBlbGVtZW50IHdlIHdpbGwgc2Nyb2xsIGJhY2sgdG9cbiAgICAgIGxldCBzY3JvbGxUb0VsID0gYXdhaXQgZHJpdmVyLmVsZW1lbnRCeUFuZHJvaWRVSUF1dG9tYXRvcihgbmV3IFVpU2VsZWN0b3IoKS50ZXh0KFwiJHtjaGVlc2VGb3JTY3JvbGx9XCIpYCk7XG4gICAgICAvLyB2ZXJpZnkgdGhlIGVsZW1lbnQgZXhpc3RzLCB0aGVuIHVzZSBhIHRvdWNoYWN0aW9uIHRvIHNjcm9sbCBpdCBvdXQgb2ZcbiAgICAgIC8vIHZpZXdcbiAgICAgIGF3YWl0IGFzc2VydEVsZW1lbnRQcmVzZW50KGRyaXZlciwgdHJ1ZSk7XG4gICAgICBjb25zdCBhY3Rpb24gPSBuZXcgd2QuVG91Y2hBY3Rpb24oKTtcbiAgICAgIGFjdGlvbi5wcmVzcyh7ZWxlbWVudDogc2Nyb2xsVG9FbH0pXG4gICAgICAgIC53YWl0KDMwMClcbiAgICAgICAgLm1vdmVUbyh7ZWxlbWVudDogc2Nyb2xsVG9FbCwgeDogMCwgeTogLTE1MDB9KVxuICAgICAgICAucmVsZWFzZSgpO1xuICAgICAgYXdhaXQgZHJpdmVyLnBlcmZvcm1Ub3VjaEFjdGlvbihhY3Rpb24pO1xuICAgICAgLy8gdmVyaWZ5IHRoZSBlbGVtZW50IG5vIGxvbmdlciBleGlzdHNcbiAgICAgIGF3YWl0IGFzc2VydEVsZW1lbnRQcmVzZW50KGRyaXZlciwgZmFsc2UsIGNoZWVzZUZvclNjcm9sbCk7XG4gICAgICAvLyBmaW5hbGx5LCB1c2Ugc2Nyb2xsQmFja1RvIHRvIGludGVsbGlnZW50bHkgc2Nyb2xsIGJhY2sgdG8gYSBwb2ludFxuICAgICAgLy8gd2hlcmUgdGhlIGVsZW1lbnQgaXMgdmlzaWJsZSwgYW5kIHZlcmlmeSB0aGUgcmVzdWx0XG4gICAgICBsZXQgaXNGb3VuZCA9IGF3YWl0IGRyaXZlci5leGVjdXRlKFwibW9iaWxlOiBzY3JvbGxCYWNrVG9cIiwge1xuICAgICAgICBlbGVtZW50SWQ6IHNjcm9sbGFibGVDb250YWluZXIudmFsdWUsXG4gICAgICAgIGVsZW1lbnRUb0lkOiBzY3JvbGxUb0VsLnZhbHVlLFxuICAgICAgfSk7XG4gICAgICBpc0ZvdW5kLnNob3VsZC5iZS50cnVlO1xuICAgICAgYXdhaXQgYXNzZXJ0RWxlbWVudFByZXNlbnQoZHJpdmVyLCB0cnVlLCBjaGVlc2VGb3JTY3JvbGwpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLiJ9
