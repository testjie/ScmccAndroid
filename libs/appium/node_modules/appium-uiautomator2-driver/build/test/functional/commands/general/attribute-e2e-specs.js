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

var driver = undefined;
var animationEl = undefined;

describe('apidemo - attributes', function () {
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(_desired.APIDEMOS_CAPS));

        case 2:
          driver = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.waitForElementByAccessibilityId('Animation'));

        case 5:
          animationEl = context$2$0.sent;

        case 6:
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
  it('should be able to find resourceId attribute', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(animationEl.getAttribute('resourceId').should.eventually.become('android:id/text1'));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should be able to find text attribute', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(animationEl.getAttribute('text').should.eventually.become('Animation'));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should be able to find name attribute', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(animationEl.getAttribute('name').should.eventually.become('Animation'));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should be able to find name attribute, falling back to text', function callee$1$0() {
    var textViewEl;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(animationEl.click());

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.waitForElementByAccessibilityId('Bouncing Balls'));

        case 4:
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.elementByAccessibilityId('Bouncing Balls'));

        case 6:
          textViewEl = context$2$0.sent;
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(textViewEl.getAttribute('name'));

        case 9:
          context$2$0.next = 11;
          return _regeneratorRuntime.awrap(driver.back());

        case 11:
          context$2$0.next = 13;
          return _regeneratorRuntime.awrap(driver.waitForElementByAccessibilityId('Animation'));

        case 13:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should be able to find content description attribute', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(animationEl.getAttribute('contentDescription').should.eventually.become("Animation"));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should be able to find displayed attribute', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(animationEl.getAttribute('displayed').should.eventually.become('true'));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should be able to find enabled attribute', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(animationEl.getAttribute('enabled').should.eventually.become('true'));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should be able to find displayed attribute through normal func', function callee$1$0() {
    var displayed;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(animationEl.isDisplayed());

        case 2:
          displayed = context$2$0.sent;

          (displayed + '').should.equal('true');

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should be able to get element location using getLocation', function callee$1$0() {
    var location;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(animationEl.getLocation());

        case 2:
          location = context$2$0.sent;

          location.x.should.be.at.least(0);
          location.y.should.be.at.least(0);

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should be able to get element location using getLocationInView', function callee$1$0() {
    var location;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(animationEl.getLocationInView());

        case 2:
          location = context$2$0.sent;

          location.x.should.be.at.least(0);
          location.y.should.be.at.least(0);

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should be able to get element size', function callee$1$0() {
    var size;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(animationEl.getSize());

        case 2:
          size = context$2$0.sent;

          size.width.should.be.at.least(0);
          size.height.should.be.at.least(0);

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});

// TODO: 'getLocationInView' is returning a 404 not found error
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9nZW5lcmFsL2F0dHJpYnV0ZS1lMmUtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7Ozt1QkFDZixlQUFlOzs4QkFDbEIsdUJBQXVCOztBQUVsRCxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLElBQUksTUFBTSxZQUFBLENBQUM7QUFDWCxJQUFJLFdBQVcsWUFBQSxDQUFDOztBQUVoQixRQUFRLENBQUMsc0JBQXNCLEVBQUUsWUFBWTtBQUMzQyxRQUFNLENBQUM7Ozs7OzJDQUNVLHVEQUF5Qjs7O0FBQXhDLGdCQUFNOzsyQ0FDYyxNQUFNLENBQUMsK0JBQStCLENBQUMsV0FBVyxDQUFDOzs7QUFBdkUscUJBQVc7Ozs7Ozs7R0FDWixDQUFDLENBQUM7QUFDSCxPQUFLLENBQUM7Ozs7OzJDQUNFLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Ozs7Ozs7R0FDcEIsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLDZDQUE2QyxFQUFFOzs7OzsyQ0FDMUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQzs7Ozs7OztHQUMxRixDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsdUNBQXVDLEVBQUU7Ozs7OzJDQUNwQyxXQUFXLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQzs7Ozs7OztHQUM3RSxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsdUNBQXVDLEVBQUU7Ozs7OzJDQUNwQyxXQUFXLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQzs7Ozs7OztHQUM3RSxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsNkRBQTZELEVBQUU7UUFHNUQsVUFBVTs7Ozs7MkNBRlIsV0FBVyxDQUFDLEtBQUssRUFBRTs7OzsyQ0FDbkIsTUFBTSxDQUFDLCtCQUErQixDQUFDLGdCQUFnQixDQUFDOzs7OzJDQUN2QyxNQUFNLENBQUMsd0JBQXdCLENBQUMsZ0JBQWdCLENBQUM7OztBQUFwRSxvQkFBVTs7MkNBQ1IsVUFBVSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7Ozs7MkNBQy9CLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Ozs7MkNBQ2IsTUFBTSxDQUFDLCtCQUErQixDQUFDLFdBQVcsQ0FBQzs7Ozs7OztHQUMxRCxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsc0RBQXNELEVBQUU7Ozs7OzJDQUNuRCxXQUFXLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDOzs7Ozs7O0dBQzNGLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyw0Q0FBNEMsRUFBRTs7Ozs7MkNBQ3pDLFdBQVcsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDOzs7Ozs7O0dBQzdFLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQywwQ0FBMEMsRUFBRTs7Ozs7MkNBQ3ZDLFdBQVcsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDOzs7Ozs7O0dBQzNFLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyxnRUFBZ0UsRUFBRTtRQUM3RCxTQUFTOzs7OzsyQ0FBUyxXQUFXLENBQUMsV0FBVyxFQUFFOzs7QUFBM0MsbUJBQVM7O0FBQ2YsV0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFBLENBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7OztHQUN2QyxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsMERBQTBELEVBQUU7UUFDekQsUUFBUTs7Ozs7MkNBQVMsV0FBVyxDQUFDLFdBQVcsRUFBRTs7O0FBQTFDLGtCQUFROztBQUNaLGtCQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqQyxrQkFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7R0FDbEMsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLGdFQUFnRSxFQUFFO1FBRS9ELFFBQVE7Ozs7OzJDQUFTLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRTs7O0FBQWhELGtCQUFROztBQUNaLGtCQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqQyxrQkFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7R0FDbEMsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLG9DQUFvQyxFQUFFO1FBQ25DLElBQUk7Ozs7OzJDQUFTLFdBQVcsQ0FBQyxPQUFPLEVBQUU7OztBQUFsQyxjQUFJOztBQUNSLGNBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pDLGNBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7O0dBQ25DLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvY29tbWFuZHMvZ2VuZXJhbC9hdHRyaWJ1dGUtZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgeyBBUElERU1PU19DQVBTIH0gZnJvbSAnLi4vLi4vZGVzaXJlZCc7XG5pbXBvcnQgeyBpbml0RHJpdmVyIH0gZnJvbSAnLi4vLi4vaGVscGVycy9zZXNzaW9uJztcblxuY2hhaS5zaG91bGQoKTtcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcblxubGV0IGRyaXZlcjtcbmxldCBhbmltYXRpb25FbDtcblxuZGVzY3JpYmUoJ2FwaWRlbW8gLSBhdHRyaWJ1dGVzJywgZnVuY3Rpb24gKCkge1xuICBiZWZvcmUoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGRyaXZlciA9IGF3YWl0IGluaXREcml2ZXIoQVBJREVNT1NfQ0FQUyk7XG4gICAgYW5pbWF0aW9uRWwgPSBhd2FpdCBkcml2ZXIud2FpdEZvckVsZW1lbnRCeUFjY2Vzc2liaWxpdHlJZCgnQW5pbWF0aW9uJyk7XG4gIH0pO1xuICBhZnRlcihhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLnF1aXQoKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgYmUgYWJsZSB0byBmaW5kIHJlc291cmNlSWQgYXR0cmlidXRlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGFuaW1hdGlvbkVsLmdldEF0dHJpYnV0ZSgncmVzb3VyY2VJZCcpLnNob3VsZC5ldmVudHVhbGx5LmJlY29tZSgnYW5kcm9pZDppZC90ZXh0MScpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGZpbmQgdGV4dCBhdHRyaWJ1dGUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgYW5pbWF0aW9uRWwuZ2V0QXR0cmlidXRlKCd0ZXh0Jykuc2hvdWxkLmV2ZW50dWFsbHkuYmVjb21lKCdBbmltYXRpb24nKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgYmUgYWJsZSB0byBmaW5kIG5hbWUgYXR0cmlidXRlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGFuaW1hdGlvbkVsLmdldEF0dHJpYnV0ZSgnbmFtZScpLnNob3VsZC5ldmVudHVhbGx5LmJlY29tZSgnQW5pbWF0aW9uJyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gZmluZCBuYW1lIGF0dHJpYnV0ZSwgZmFsbGluZyBiYWNrIHRvIHRleHQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgYW5pbWF0aW9uRWwuY2xpY2soKTtcbiAgICBhd2FpdCBkcml2ZXIud2FpdEZvckVsZW1lbnRCeUFjY2Vzc2liaWxpdHlJZCgnQm91bmNpbmcgQmFsbHMnKTtcbiAgICBsZXQgdGV4dFZpZXdFbCA9IGF3YWl0IGRyaXZlci5lbGVtZW50QnlBY2Nlc3NpYmlsaXR5SWQoJ0JvdW5jaW5nIEJhbGxzJyk7XG4gICAgYXdhaXQgdGV4dFZpZXdFbC5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcbiAgICBhd2FpdCBkcml2ZXIuYmFjaygpO1xuICAgIGF3YWl0IGRyaXZlci53YWl0Rm9yRWxlbWVudEJ5QWNjZXNzaWJpbGl0eUlkKCdBbmltYXRpb24nKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgYmUgYWJsZSB0byBmaW5kIGNvbnRlbnQgZGVzY3JpcHRpb24gYXR0cmlidXRlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGFuaW1hdGlvbkVsLmdldEF0dHJpYnV0ZSgnY29udGVudERlc2NyaXB0aW9uJykuc2hvdWxkLmV2ZW50dWFsbHkuYmVjb21lKFwiQW5pbWF0aW9uXCIpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGZpbmQgZGlzcGxheWVkIGF0dHJpYnV0ZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBhbmltYXRpb25FbC5nZXRBdHRyaWJ1dGUoJ2Rpc3BsYXllZCcpLnNob3VsZC5ldmVudHVhbGx5LmJlY29tZSgndHJ1ZScpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGZpbmQgZW5hYmxlZCBhdHRyaWJ1dGUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgYW5pbWF0aW9uRWwuZ2V0QXR0cmlidXRlKCdlbmFibGVkJykuc2hvdWxkLmV2ZW50dWFsbHkuYmVjb21lKCd0cnVlJyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gZmluZCBkaXNwbGF5ZWQgYXR0cmlidXRlIHRocm91Z2ggbm9ybWFsIGZ1bmMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgZGlzcGxheWVkID0gYXdhaXQgYW5pbWF0aW9uRWwuaXNEaXNwbGF5ZWQoKTtcbiAgICAoZGlzcGxheWVkICsgJycpLnNob3VsZC5lcXVhbCgndHJ1ZScpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGdldCBlbGVtZW50IGxvY2F0aW9uIHVzaW5nIGdldExvY2F0aW9uJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBsb2NhdGlvbiA9IGF3YWl0IGFuaW1hdGlvbkVsLmdldExvY2F0aW9uKCk7XG4gICAgbG9jYXRpb24ueC5zaG91bGQuYmUuYXQubGVhc3QoMCk7XG4gICAgbG9jYXRpb24ueS5zaG91bGQuYmUuYXQubGVhc3QoMCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gZ2V0IGVsZW1lbnQgbG9jYXRpb24gdXNpbmcgZ2V0TG9jYXRpb25JblZpZXcnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgLy8gVE9ETzogJ2dldExvY2F0aW9uSW5WaWV3JyBpcyByZXR1cm5pbmcgYSA0MDQgbm90IGZvdW5kIGVycm9yXG4gICAgbGV0IGxvY2F0aW9uID0gYXdhaXQgYW5pbWF0aW9uRWwuZ2V0TG9jYXRpb25JblZpZXcoKTtcbiAgICBsb2NhdGlvbi54LnNob3VsZC5iZS5hdC5sZWFzdCgwKTtcbiAgICBsb2NhdGlvbi55LnNob3VsZC5iZS5hdC5sZWFzdCgwKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgYmUgYWJsZSB0byBnZXQgZWxlbWVudCBzaXplJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBzaXplID0gYXdhaXQgYW5pbWF0aW9uRWwuZ2V0U2l6ZSgpO1xuICAgIHNpemUud2lkdGguc2hvdWxkLmJlLmF0LmxlYXN0KDApO1xuICAgIHNpemUuaGVpZ2h0LnNob3VsZC5iZS5hdC5sZWFzdCgwKTtcbiAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uIn0=
