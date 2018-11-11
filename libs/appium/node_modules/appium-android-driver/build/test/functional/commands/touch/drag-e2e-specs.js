'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _asyncbox = require('asyncbox');

var _2 = require('../../../..');

var _3 = _interopRequireDefault(_2);

var _desired = require('../../desired');

var _desired2 = _interopRequireDefault(_desired);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var caps = _lodash2['default'].defaults({
  appPackage: 'io.appium.android.apis',
  appActivity: '.view.DragAndDropDemo'
}, _desired2['default']);

describe('apidemo - touch', function () {
  var driver = undefined;
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
  afterEach(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.startActivity(caps.appPackage, caps.appActivity));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  describe('drag', function () {
    it('should drag by element', function callee$2$0() {
      var dot3, dot2, gestures, results;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.findElement('id', 'io.appium.android.apis:id/drag_dot_3'));

          case 2:
            dot3 = context$3$0.sent;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.findElement('id', 'io.appium.android.apis:id/drag_dot_2'));

          case 5:
            dot2 = context$3$0.sent;
            gestures = [{ options: { element: dot3.ELEMENT } }, { options: { element: dot2.ELEMENT } }];
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(driver.doTouchDrag(gestures));

          case 9:
            context$3$0.next = 11;
            return _regeneratorRuntime.awrap(driver.findElement('id', 'io.appium.android.apis:id/drag_result_text'));

          case 11:
            results = context$3$0.sent;
            context$3$0.next = 14;
            return _regeneratorRuntime.awrap(driver.getText(results.ELEMENT).should.eventually.include('Dropped'));

          case 14:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should drag by element with an offset', function callee$2$0() {
      var dot3, dot2, gestures, results;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.findElement('id', 'io.appium.android.apis:id/drag_dot_3'));

          case 2:
            dot3 = context$3$0.sent;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.findElement('id', 'io.appium.android.apis:id/drag_dot_2'));

          case 5:
            dot2 = context$3$0.sent;
            gestures = [{ options: { element: dot3.ELEMENT, x: 5, y: 5 } }, { options: { element: dot2.ELEMENT, x: 5, y: 5 } }];
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(driver.doTouchDrag(gestures));

          case 9:
            context$3$0.next = 11;
            return _regeneratorRuntime.awrap(driver.findElement('id', 'io.appium.android.apis:id/drag_result_text'));

          case 11:
            results = context$3$0.sent;
            context$3$0.next = 14;
            return _regeneratorRuntime.awrap(driver.getText(results.ELEMENT).should.eventually.include('Dropped'));

          case 14:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('performTouch', function () {
    it('should drag by element', function callee$2$0() {
      var startEle, endEle, gestures, resultEle;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.findElement("id", "io.appium.android.apis:id/drag_dot_3"));

          case 2:
            startEle = context$3$0.sent;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.findElement("id", "io.appium.android.apis:id/drag_dot_2"));

          case 5:
            endEle = context$3$0.sent;
            gestures = [{ action: "longPress", options: { element: startEle.ELEMENT } }, { action: "moveTo", options: { element: endEle.ELEMENT } }, { action: "release", options: {} }];
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(driver.performTouch(gestures));

          case 9:
            context$3$0.next = 11;
            return _regeneratorRuntime.awrap(driver.findElement("id", "io.appium.android.apis:id/drag_result_text"));

          case 11:
            resultEle = context$3$0.sent;
            context$3$0.next = 14;
            return _regeneratorRuntime.awrap(driver.getText(resultEle.ELEMENT).should.eventually.equal("Dropped!"));

          case 14:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should drag by element by offset', function callee$2$0() {
      var startEle, endEle, gestures;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        var _this = this;

        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.findElement("id", "io.appium.android.apis:id/drag_dot_3"));

          case 2:
            startEle = context$3$0.sent;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.findElement("id", "io.appium.android.apis:id/drag_dot_2"));

          case 5:
            endEle = context$3$0.sent;
            gestures = [{ action: "longPress",
              options: { element: startEle.ELEMENT, x: 5, y: 5 } }, { action: "moveTo", options: { element: endEle.ELEMENT, x: 5, y: 5 } }, { action: "release", options: {} }];
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(driver.performTouch(gestures));

          case 9:
            context$3$0.next = 11;
            return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(3, 500, function callee$3$0() {
              var el;
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    context$4$0.next = 2;
                    return _regeneratorRuntime.awrap(driver.findElement("id", "io.appium.android.apis:id/drag_result_text"));

                  case 2:
                    el = context$4$0.sent;
                    context$4$0.next = 5;
                    return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT));

                  case 5:
                    context$4$0.sent.should.eql('Dropped!');

                  case 6:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, _this);
            }));

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should drag by absolute position', function callee$2$0() {
      var startEle, startLoc, startSize, endEle, endLoc, endSize, gestures, resultEle;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.findElement("id", "io.appium.android.apis:id/drag_dot_3"));

          case 2:
            startEle = context$3$0.sent;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.getLocationInView(startEle.ELEMENT));

          case 5:
            startLoc = context$3$0.sent;
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(driver.getSize(startEle.ELEMENT));

          case 8:
            startSize = context$3$0.sent;
            context$3$0.next = 11;
            return _regeneratorRuntime.awrap(driver.findElement("id", "io.appium.android.apis:id/drag_dot_2"));

          case 11:
            endEle = context$3$0.sent;
            context$3$0.next = 14;
            return _regeneratorRuntime.awrap(driver.getLocationInView(endEle.ELEMENT));

          case 14:
            endLoc = context$3$0.sent;
            context$3$0.next = 17;
            return _regeneratorRuntime.awrap(driver.getSize(endEle.ELEMENT));

          case 17:
            endSize = context$3$0.sent;
            gestures = [{ action: "longPress",
              options: { x: startLoc.x + startSize.width / 2,
                y: startLoc.y + startSize.height / 2 } }, { action: "moveTo",
              options: { x: endLoc.x + endSize.width / 2,
                y: endLoc.y + endSize.height / 2 } }, { action: "release", options: {} }];
            context$3$0.next = 21;
            return _regeneratorRuntime.awrap(driver.performTouch(gestures));

          case 21:
            context$3$0.next = 23;
            return _regeneratorRuntime.awrap(driver.findElement("id", "io.appium.android.apis:id/drag_result_text"));

          case 23:
            resultEle = context$3$0.sent;
            context$3$0.next = 26;
            return _regeneratorRuntime.awrap(driver.getText(resultEle.ELEMENT).should.eventually.equal("Dropped!"));

          case 26:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});

// reset the view by restarting the activity
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy90b3VjaC9kcmFnLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O3NCQUMvQixRQUFROzs7O3dCQUNRLFVBQVU7O2lCQUNkLGFBQWE7Ozs7dUJBQ2QsZUFBZTs7OztBQUd4QyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLElBQUksSUFBSSxHQUFHLG9CQUFFLFFBQVEsQ0FBQztBQUNwQixZQUFVLEVBQUUsd0JBQXdCO0FBQ3BDLGFBQVcsRUFBRSx1QkFBdUI7Q0FDckMsdUJBQWUsQ0FBQzs7QUFFakIsUUFBUSxDQUFDLGlCQUFpQixFQUFFLFlBQVk7QUFDdEMsTUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLFFBQU0sQ0FBQzs7OztBQUNMLGdCQUFNLEdBQUcsbUJBQW1CLENBQUM7OzJDQUN2QixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQzs7Ozs7OztHQUNqQyxDQUFDLENBQUM7QUFDSCxPQUFLLENBQUM7Ozs7OzJDQUNFLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7R0FDN0IsQ0FBQyxDQUFDO0FBQ0gsV0FBUyxDQUFDOzs7OzsyQ0FFRixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQzs7Ozs7OztHQUM5RCxDQUFDLENBQUM7QUFDSCxVQUFRLENBQUMsTUFBTSxFQUFFLFlBQVk7QUFDM0IsTUFBRSxDQUFDLHdCQUF3QixFQUFFO1VBQ3ZCLElBQUksRUFDSixJQUFJLEVBQ0osUUFBUSxFQU1SLE9BQU87Ozs7OzZDQVJNLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLHNDQUFzQyxDQUFDOzs7QUFBN0UsZ0JBQUk7OzZDQUNTLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLHNDQUFzQyxDQUFD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Ozs7OztLQUM1RSxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2NvbW1hbmRzL3RvdWNoL2RyYWctZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgcmV0cnlJbnRlcnZhbCB9IGZyb20gJ2FzeW5jYm94JztcbmltcG9ydCBBbmRyb2lkRHJpdmVyIGZyb20gJy4uLy4uLy4uLy4uJztcbmltcG9ydCBERUZBVUxUX0NBUFMgZnJvbSAnLi4vLi4vZGVzaXJlZCc7XG5cblxuY2hhaS5zaG91bGQoKTtcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcblxubGV0IGNhcHMgPSBfLmRlZmF1bHRzKHtcbiAgYXBwUGFja2FnZTogJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnLFxuICBhcHBBY3Rpdml0eTogJy52aWV3LkRyYWdBbmREcm9wRGVtbydcbn0sIERFRkFVTFRfQ0FQUyk7XG5cbmRlc2NyaWJlKCdhcGlkZW1vIC0gdG91Y2gnLCBmdW5jdGlvbiAoKSB7XG4gIGxldCBkcml2ZXI7XG4gIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihjYXBzKTtcbiAgfSk7XG4gIGFmdGVyKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIuZGVsZXRlU2Vzc2lvbigpO1xuICB9KTtcbiAgYWZ0ZXJFYWNoKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAvLyByZXNldCB0aGUgdmlldyBieSByZXN0YXJ0aW5nIHRoZSBhY3Rpdml0eVxuICAgIGF3YWl0IGRyaXZlci5zdGFydEFjdGl2aXR5KGNhcHMuYXBwUGFja2FnZSwgY2Fwcy5hcHBBY3Rpdml0eSk7XG4gIH0pO1xuICBkZXNjcmliZSgnZHJhZycsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIGRyYWcgYnkgZWxlbWVudCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBkb3QzID0gYXdhaXQgZHJpdmVyLmZpbmRFbGVtZW50KCdpZCcsICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzOmlkL2RyYWdfZG90XzMnKTtcbiAgICAgIGxldCBkb3QyID0gYXdhaXQgZHJpdmVyLmZpbmRFbGVtZW50KCdpZCcsICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzOmlkL2RyYWdfZG90XzInKTtcbiAgICAgIGxldCBnZXN0dXJlcyA9IFtcbiAgICAgICAge29wdGlvbnM6IHtlbGVtZW50OiBkb3QzLkVMRU1FTlR9fSxcbiAgICAgICAge29wdGlvbnM6IHtlbGVtZW50OiBkb3QyLkVMRU1FTlR9fVxuICAgICAgXTtcbiAgICAgIGF3YWl0IGRyaXZlci5kb1RvdWNoRHJhZyhnZXN0dXJlcyk7XG5cbiAgICAgIGxldCByZXN1bHRzID0gYXdhaXQgZHJpdmVyLmZpbmRFbGVtZW50KCdpZCcsICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzOmlkL2RyYWdfcmVzdWx0X3RleHQnKTtcbiAgICAgIGF3YWl0IGRyaXZlci5nZXRUZXh0KHJlc3VsdHMuRUxFTUVOVCkuc2hvdWxkLmV2ZW50dWFsbHkuaW5jbHVkZSgnRHJvcHBlZCcpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgZHJhZyBieSBlbGVtZW50IHdpdGggYW4gb2Zmc2V0JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGRvdDMgPSBhd2FpdCBkcml2ZXIuZmluZEVsZW1lbnQoJ2lkJywgJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXM6aWQvZHJhZ19kb3RfMycpO1xuICAgICAgbGV0IGRvdDIgPSBhd2FpdCBkcml2ZXIuZmluZEVsZW1lbnQoJ2lkJywgJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXM6aWQvZHJhZ19kb3RfMicpO1xuICAgICAgbGV0IGdlc3R1cmVzID0gW1xuICAgICAgICB7b3B0aW9uczoge2VsZW1lbnQ6IGRvdDMuRUxFTUVOVCwgeDogNSwgeTogNX19LFxuICAgICAgICB7b3B0aW9uczoge2VsZW1lbnQ6IGRvdDIuRUxFTUVOVCwgeDogNSwgeTogNX19XG4gICAgICBdO1xuICAgICAgYXdhaXQgZHJpdmVyLmRvVG91Y2hEcmFnKGdlc3R1cmVzKTtcbiAgICAgIGxldCByZXN1bHRzID0gYXdhaXQgZHJpdmVyLmZpbmRFbGVtZW50KCdpZCcsICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzOmlkL2RyYWdfcmVzdWx0X3RleHQnKTtcbiAgICAgIGF3YWl0IGRyaXZlci5nZXRUZXh0KHJlc3VsdHMuRUxFTUVOVCkuc2hvdWxkLmV2ZW50dWFsbHkuaW5jbHVkZSgnRHJvcHBlZCcpO1xuICAgIH0pO1xuICB9KTtcbiAgZGVzY3JpYmUoJ3BlcmZvcm1Ub3VjaCcsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIGRyYWcgYnkgZWxlbWVudCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBzdGFydEVsZSA9IGF3YWl0IGRyaXZlci5maW5kRWxlbWVudChcImlkXCIsIFwiaW8uYXBwaXVtLmFuZHJvaWQuYXBpczppZC9kcmFnX2RvdF8zXCIpO1xuICAgICAgbGV0IGVuZEVsZSA9IGF3YWl0IGRyaXZlci5maW5kRWxlbWVudChcImlkXCIsIFwiaW8uYXBwaXVtLmFuZHJvaWQuYXBpczppZC9kcmFnX2RvdF8yXCIpO1xuICAgICAgbGV0IGdlc3R1cmVzID0gW3thY3Rpb246IFwibG9uZ1ByZXNzXCIsIG9wdGlvbnM6IHtlbGVtZW50OiBzdGFydEVsZS5FTEVNRU5UfX0sXG4gICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjogXCJtb3ZlVG9cIiwgb3B0aW9uczoge2VsZW1lbnQ6IGVuZEVsZS5FTEVNRU5UfX0sXG4gICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjogXCJyZWxlYXNlXCIsIG9wdGlvbnM6IHt9fV07XG4gICAgICBhd2FpdCBkcml2ZXIucGVyZm9ybVRvdWNoKGdlc3R1cmVzKTtcbiAgICAgIGxldCByZXN1bHRFbGUgPSBhd2FpdCBkcml2ZXIuZmluZEVsZW1lbnQoXCJpZFwiLCBcImlvLmFwcGl1bS5hbmRyb2lkLmFwaXM6aWQvZHJhZ19yZXN1bHRfdGV4dFwiKTtcbiAgICAgIGF3YWl0IGRyaXZlci5nZXRUZXh0KHJlc3VsdEVsZS5FTEVNRU5UKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbChcIkRyb3BwZWQhXCIpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgZHJhZyBieSBlbGVtZW50IGJ5IG9mZnNldCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBzdGFydEVsZSA9IGF3YWl0IGRyaXZlci5maW5kRWxlbWVudChcImlkXCIsIFwiaW8uYXBwaXVtLmFuZHJvaWQuYXBpczppZC9kcmFnX2RvdF8zXCIpO1xuICAgICAgbGV0IGVuZEVsZSA9IGF3YWl0IGRyaXZlci5maW5kRWxlbWVudChcImlkXCIsIFwiaW8uYXBwaXVtLmFuZHJvaWQuYXBpczppZC9kcmFnX2RvdF8yXCIpO1xuICAgICAgbGV0IGdlc3R1cmVzID0gW3thY3Rpb246IFwibG9uZ1ByZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtlbGVtZW50OiBzdGFydEVsZS5FTEVNRU5ULCB4OiA1LCB5OiA1fX0sXG4gICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjogXCJtb3ZlVG9cIiwgb3B0aW9uczpcbiAgICAgICAgICAgICAgICAgICAgICB7ZWxlbWVudDogZW5kRWxlLkVMRU1FTlQsIHg6IDUsIHk6IDV9fSxcbiAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOiBcInJlbGVhc2VcIiwgb3B0aW9uczoge319XTtcbiAgICAgIGF3YWl0IGRyaXZlci5wZXJmb3JtVG91Y2goZ2VzdHVyZXMpO1xuICAgICAgYXdhaXQgcmV0cnlJbnRlcnZhbCgzLCA1MDAsIGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgZWwgPSBhd2FpdCBkcml2ZXIuZmluZEVsZW1lbnQoXCJpZFwiLCBcImlvLmFwcGl1bS5hbmRyb2lkLmFwaXM6aWQvZHJhZ19yZXN1bHRfdGV4dFwiKTtcbiAgICAgICAgKGF3YWl0IGRyaXZlci5nZXRUZXh0KGVsLkVMRU1FTlQpKS5zaG91bGQuZXFsKCdEcm9wcGVkIScpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBkcmFnIGJ5IGFic29sdXRlIHBvc2l0aW9uJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IHN0YXJ0RWxlID0gYXdhaXQgZHJpdmVyLmZpbmRFbGVtZW50KFwiaWRcIiwgXCJpby5hcHBpdW0uYW5kcm9pZC5hcGlzOmlkL2RyYWdfZG90XzNcIik7XG4gICAgICBsZXQgc3RhcnRMb2MgPSBhd2FpdCBkcml2ZXIuZ2V0TG9jYXRpb25JblZpZXcoc3RhcnRFbGUuRUxFTUVOVCk7XG4gICAgICBsZXQgc3RhcnRTaXplID0gYXdhaXQgZHJpdmVyLmdldFNpemUoc3RhcnRFbGUuRUxFTUVOVCk7XG4gICAgICBsZXQgZW5kRWxlID0gYXdhaXQgZHJpdmVyLmZpbmRFbGVtZW50KFwiaWRcIiwgXCJpby5hcHBpdW0uYW5kcm9pZC5hcGlzOmlkL2RyYWdfZG90XzJcIik7XG4gICAgICBsZXQgZW5kTG9jID0gYXdhaXQgZHJpdmVyLmdldExvY2F0aW9uSW5WaWV3KGVuZEVsZS5FTEVNRU5UKTtcbiAgICAgIGxldCBlbmRTaXplID0gYXdhaXQgZHJpdmVyLmdldFNpemUoZW5kRWxlLkVMRU1FTlQpO1xuICAgICAgbGV0IGdlc3R1cmVzID0gW3thY3Rpb246IFwibG9uZ1ByZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHt4OiBzdGFydExvYy54ICsgKHN0YXJ0U2l6ZS53aWR0aCAvIDIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogc3RhcnRMb2MueSArIChzdGFydFNpemUuaGVpZ2h0IC8gMil9fSxcbiAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOiBcIm1vdmVUb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB7eDogZW5kTG9jLnggKyAoZW5kU2l6ZS53aWR0aCAvIDIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogZW5kTG9jLnkgKyAoZW5kU2l6ZS5oZWlnaHQgLyAyKX19LFxuICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246IFwicmVsZWFzZVwiLCBvcHRpb25zOiB7fX1dO1xuICAgICAgYXdhaXQgZHJpdmVyLnBlcmZvcm1Ub3VjaChnZXN0dXJlcyk7XG4gICAgICBsZXQgcmVzdWx0RWxlID0gYXdhaXQgZHJpdmVyLmZpbmRFbGVtZW50KFwiaWRcIiwgXCJpby5hcHBpdW0uYW5kcm9pZC5hcGlzOmlkL2RyYWdfcmVzdWx0X3RleHRcIik7XG4gICAgICBhd2FpdCBkcml2ZXIuZ2V0VGV4dChyZXN1bHRFbGUuRUxFTUVOVCkuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwoXCJEcm9wcGVkIVwiKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vLi4ifQ==
