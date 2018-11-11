'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../../../..');

var _2 = _interopRequireDefault(_);

var _desired = require('../../desired');

var _desired2 = _interopRequireDefault(_desired);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('apidemo - attributes', function () {
  var driver = undefined;
  var animationEl = undefined;

  before(function callee$1$0() {
    var animation;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          driver = new _2['default']();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.createSession(_desired2['default']));

        case 3:
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.findElement('accessibility id', 'Animation'));

        case 5:
          animation = context$2$0.sent;

          animationEl = animation.ELEMENT;

        case 7:
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
  it('should be able to find resourceId attribute', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.getAttribute('resourceId', animationEl).should.eventually.become('android:id/text1'));

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
          return _regeneratorRuntime.awrap(driver.getAttribute('text', animationEl).should.eventually.become('Animation'));

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
          return _regeneratorRuntime.awrap(driver.getAttribute('name', animationEl).should.eventually.become('Animation'));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should be able to find name attribute, falling back to text', function callee$1$0() {
    var textView, textViewEl;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.click(animationEl));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.findElements('class name', 'android.widget.TextView'));

        case 4:
          textView = context$2$0.sent;
          textViewEl = textView[1].ELEMENT;
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(driver.getAttribute('name', textViewEl).should.eventually.become('Bouncing Balls'));

        case 8:
          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(driver.back());

        case 10:
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
          return _regeneratorRuntime.awrap(driver.getAttribute('contentDescription', animationEl).should.eventually.become("Animation"));

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
          return _regeneratorRuntime.awrap(driver.getAttribute('displayed', animationEl).should.eventually.become('true'));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should be able to find displayed attribute through normal func', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementDisplayed(animationEl).should.eventually.become(true));

        case 2:
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
          return _regeneratorRuntime.awrap(driver.getLocation(animationEl));

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
          return _regeneratorRuntime.awrap(driver.getLocationInView(animationEl));

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
          return _regeneratorRuntime.awrap(driver.getSize(animationEl));

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9iYXNpYy9hdHRyaWJ1dGUtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQ25CLGFBQWE7Ozs7dUJBQ2QsZUFBZTs7OztBQUd4QyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxZQUFZO0FBQzNDLE1BQUksTUFBTSxZQUFBLENBQUM7QUFDWCxNQUFJLFdBQVcsWUFBQSxDQUFDOztBQUVoQixRQUFNLENBQUM7UUFHRCxTQUFTOzs7O0FBRmIsZ0JBQU0sR0FBRyxtQkFBbUIsQ0FBQzs7MkNBQ3ZCLE1BQU0sQ0FBQyxhQUFhLHNCQUFjOzs7OzJDQUNsQixNQUFNLENBQUMsV0FBVyxDQUFDLGtCQUFrQixFQUFFLFdBQVcsQ0FBQzs7O0FBQXJFLG1CQUFTOztBQUNiLHFCQUFXLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQzs7Ozs7OztHQUNqQyxDQUFDLENBQUM7QUFDSCxPQUFLLENBQUM7Ozs7OzJDQUNFLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7R0FDN0IsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLDZDQUE2QyxFQUFFOzs7OzsyQ0FDMUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUM7Ozs7Ozs7R0FDbEcsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLHVDQUF1QyxFQUFFOzs7OzsyQ0FDcEMsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDOzs7Ozs7O0dBQ3JGLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyx1Q0FB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MmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCBBbmRyb2lkRHJpdmVyIGZyb20gJy4uLy4uLy4uLy4uJztcbmltcG9ydCBERUZBVUxUX0NBUFMgZnJvbSAnLi4vLi4vZGVzaXJlZCc7XG5cblxuY2hhaS5zaG91bGQoKTtcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcblxuZGVzY3JpYmUoJ2FwaWRlbW8gLSBhdHRyaWJ1dGVzJywgZnVuY3Rpb24gKCkge1xuICBsZXQgZHJpdmVyO1xuICBsZXQgYW5pbWF0aW9uRWw7XG5cbiAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKERFRkFVTFRfQ0FQUyk7XG4gICAgbGV0IGFuaW1hdGlvbiA9IGF3YWl0IGRyaXZlci5maW5kRWxlbWVudCgnYWNjZXNzaWJpbGl0eSBpZCcsICdBbmltYXRpb24nKTtcbiAgICBhbmltYXRpb25FbCA9IGFuaW1hdGlvbi5FTEVNRU5UO1xuICB9KTtcbiAgYWZ0ZXIoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gZmluZCByZXNvdXJjZUlkIGF0dHJpYnV0ZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIuZ2V0QXR0cmlidXRlKCdyZXNvdXJjZUlkJywgYW5pbWF0aW9uRWwpLnNob3VsZC5ldmVudHVhbGx5LmJlY29tZSgnYW5kcm9pZDppZC90ZXh0MScpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGZpbmQgdGV4dCBhdHRyaWJ1dGUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLmdldEF0dHJpYnV0ZSgndGV4dCcsIGFuaW1hdGlvbkVsKS5zaG91bGQuZXZlbnR1YWxseS5iZWNvbWUoJ0FuaW1hdGlvbicpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGZpbmQgbmFtZSBhdHRyaWJ1dGUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLmdldEF0dHJpYnV0ZSgnbmFtZScsIGFuaW1hdGlvbkVsKS5zaG91bGQuZXZlbnR1YWxseS5iZWNvbWUoJ0FuaW1hdGlvbicpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGZpbmQgbmFtZSBhdHRyaWJ1dGUsIGZhbGxpbmcgYmFjayB0byB0ZXh0JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5jbGljayhhbmltYXRpb25FbCk7XG4gICAgbGV0IHRleHRWaWV3ID0gYXdhaXQgZHJpdmVyLmZpbmRFbGVtZW50cygnY2xhc3MgbmFtZScsICdhbmRyb2lkLndpZGdldC5UZXh0VmlldycpO1xuICAgIGxldCB0ZXh0Vmlld0VsID0gdGV4dFZpZXdbMV0uRUxFTUVOVDtcbiAgICBhd2FpdCBkcml2ZXIuZ2V0QXR0cmlidXRlKCduYW1lJywgdGV4dFZpZXdFbCkuc2hvdWxkLmV2ZW50dWFsbHkuYmVjb21lKCdCb3VuY2luZyBCYWxscycpO1xuICAgIGF3YWl0IGRyaXZlci5iYWNrKCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gZmluZCBjb250ZW50IGRlc2NyaXB0aW9uIGF0dHJpYnV0ZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIuZ2V0QXR0cmlidXRlKCdjb250ZW50RGVzY3JpcHRpb24nLCBhbmltYXRpb25FbCkuc2hvdWxkLmV2ZW50dWFsbHkuYmVjb21lKFwiQW5pbWF0aW9uXCIpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGZpbmQgZGlzcGxheWVkIGF0dHJpYnV0ZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIuZ2V0QXR0cmlidXRlKCdkaXNwbGF5ZWQnLCBhbmltYXRpb25FbCkuc2hvdWxkLmV2ZW50dWFsbHkuYmVjb21lKCd0cnVlJyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gZmluZCBkaXNwbGF5ZWQgYXR0cmlidXRlIHRocm91Z2ggbm9ybWFsIGZ1bmMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLmVsZW1lbnREaXNwbGF5ZWQoYW5pbWF0aW9uRWwpLnNob3VsZC5ldmVudHVhbGx5LmJlY29tZSh0cnVlKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgYmUgYWJsZSB0byBnZXQgZWxlbWVudCBsb2NhdGlvbiB1c2luZyBnZXRMb2NhdGlvbicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgbG9jYXRpb24gPSBhd2FpdCBkcml2ZXIuZ2V0TG9jYXRpb24oYW5pbWF0aW9uRWwpO1xuICAgIGxvY2F0aW9uLnguc2hvdWxkLmJlLmF0LmxlYXN0KDApO1xuICAgIGxvY2F0aW9uLnkuc2hvdWxkLmJlLmF0LmxlYXN0KDApO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGdldCBlbGVtZW50IGxvY2F0aW9uIHVzaW5nIGdldExvY2F0aW9uSW5WaWV3JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBsb2NhdGlvbiA9IGF3YWl0IGRyaXZlci5nZXRMb2NhdGlvbkluVmlldyhhbmltYXRpb25FbCk7XG4gICAgbG9jYXRpb24ueC5zaG91bGQuYmUuYXQubGVhc3QoMCk7XG4gICAgbG9jYXRpb24ueS5zaG91bGQuYmUuYXQubGVhc3QoMCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gZ2V0IGVsZW1lbnQgc2l6ZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgc2l6ZSA9IGF3YWl0IGRyaXZlci5nZXRTaXplKGFuaW1hdGlvbkVsKTtcbiAgICBzaXplLndpZHRoLnNob3VsZC5iZS5hdC5sZWFzdCgwKTtcbiAgICBzaXplLmhlaWdodC5zaG91bGQuYmUuYXQubGVhc3QoMCk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uIn0=
