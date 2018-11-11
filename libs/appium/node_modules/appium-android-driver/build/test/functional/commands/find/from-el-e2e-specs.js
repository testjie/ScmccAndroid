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

var _appiumSupport = require('appium-support');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var atv = 'android.widget.TextView';
var alv = 'android.widget.ListView';

describe('Find - from element', function () {
  var driver = undefined;
  var parentEl = undefined;

  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          driver = new _2['default']();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.createSession(_desired2['default']));

        case 3:
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.findElement('class name', alv));

        case 5:
          parentEl = context$2$0.sent;

          parentEl = _appiumSupport.util.unwrapElement(parentEl);

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
  it('should find a single element by tag name', function callee$1$0() {
    var innerEl;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElementFromElement('class name', atv, parentEl));

        case 2:
          innerEl = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.getText(innerEl.ELEMENT).should.eventually.equal("Access'ibility"));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find multiple elements by tag name', function callee$1$0() {
    var innerEl;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElementsFromElement('class name', atv, parentEl));

        case 2:
          innerEl = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.getText(innerEl[0].ELEMENT).should.eventually.have.length.above(10));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should not find an element that does not exist', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElementFromElement('class name', 'blargimarg', parentEl).should.be.rejectedWith(/could not be located/));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should not find multiple elements that do not exist', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElementFromElement('class name', 'blargimarg', parentEl).should.be.rejectedWith(/could not be located/));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9maW5kL2Zyb20tZWwtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQ25CLGFBQWE7Ozs7dUJBQ2QsZUFBZTs7Ozs2QkFDbkIsZ0JBQWdCOztBQUdyQyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLElBQU0sR0FBRyxHQUFHLHlCQUF5QixDQUFDO0FBQ3RDLElBQU0sR0FBRyxHQUFHLHlCQUF5QixDQUFDOztBQUV0QyxRQUFRLENBQUMscUJBQXFCLEVBQUUsWUFBWTtBQUMxQyxNQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsTUFBSSxRQUFRLFlBQUEsQ0FBQzs7QUFFYixRQUFNLENBQUM7Ozs7QUFDTCxnQkFBTSxHQUFHLG1CQUFtQixDQUFDOzsyQ0FDdkIsTUFBTSxDQUFDLGFBQWEsc0JBQWM7Ozs7MkNBQ3ZCLE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQzs7O0FBQXRELGtCQUFROztBQUNSLGtCQUFRLEdBQUcsb0JBQUssYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7Ozs7O0dBQ3pDLENBQUMsQ0FBQztBQUNILE9BQUssQ0FBQzs7Ozs7MkNBQ0UsTUFBTSxDQUFDLGFBQWEsRUFBRTs7Ozs7OztHQUM3QixDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsMENBQTBDLEVBQUU7UUFDekMsT0FBTzs7Ozs7MkNBQVMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDOzs7QUFBMUUsaUJBQU87OzJDQUNMLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDOzs7Ozs7O0dBQ2hGLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQywyQ0FBMkMsRUFBRTtRQUMxQyxPQUFPOzs7OzsyQ0FBUyxNQUFNLENBQUMsdUJBQXVCLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUM7OztBQUEzRSxpQkFBTzs7MkNBQ0wsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7Ozs7Ozs7R0FDakYsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLGdEQUFnRCxFQUFFOzs7OzsyQ0FDN0MsTUFBTSxDQUFDLHNCQUFzQixDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQ3RFLE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUFDOzs7Ozs7O0dBQ2xELENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyxxREFBcUQsRUFBRTs7Ozs7MkNBQ2xELE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUN0RSxNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQzs7Ozs7OztHQUNsRCxDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2NvbW1hbmRzL2ZpbmQvZnJvbS1lbC1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCBBbmRyb2lkRHJpdmVyIGZyb20gJy4uLy4uLy4uLy4uJztcbmltcG9ydCBERUZBVUxUX0NBUFMgZnJvbSAnLi4vLi4vZGVzaXJlZCc7XG5pbXBvcnQgeyB1dGlsIH0gZnJvbSAnYXBwaXVtLXN1cHBvcnQnO1xuXG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmNvbnN0IGF0diA9ICdhbmRyb2lkLndpZGdldC5UZXh0Vmlldyc7XG5jb25zdCBhbHYgPSAnYW5kcm9pZC53aWRnZXQuTGlzdFZpZXcnO1xuXG5kZXNjcmliZSgnRmluZCAtIGZyb20gZWxlbWVudCcsIGZ1bmN0aW9uICgpIHtcbiAgbGV0IGRyaXZlcjtcbiAgbGV0IHBhcmVudEVsO1xuXG4gIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihERUZBVUxUX0NBUFMpO1xuICAgIHBhcmVudEVsID0gYXdhaXQgZHJpdmVyLmZpbmRFbGVtZW50KCdjbGFzcyBuYW1lJywgYWx2KTtcbiAgICBwYXJlbnRFbCA9IHV0aWwudW53cmFwRWxlbWVudChwYXJlbnRFbCk7XG4gIH0pO1xuICBhZnRlcihhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCBhIHNpbmdsZSBlbGVtZW50IGJ5IHRhZyBuYW1lJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBpbm5lckVsID0gYXdhaXQgZHJpdmVyLmZpbmRFbGVtZW50RnJvbUVsZW1lbnQoJ2NsYXNzIG5hbWUnLCBhdHYsIHBhcmVudEVsKTtcbiAgICBhd2FpdCBkcml2ZXIuZ2V0VGV4dChpbm5lckVsLkVMRU1FTlQpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKFwiQWNjZXNzJ2liaWxpdHlcIik7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgbXVsdGlwbGUgZWxlbWVudHMgYnkgdGFnIG5hbWUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGlubmVyRWwgPSBhd2FpdCBkcml2ZXIuZmluZEVsZW1lbnRzRnJvbUVsZW1lbnQoJ2NsYXNzIG5hbWUnLCBhdHYsIHBhcmVudEVsKTtcbiAgICBhd2FpdCBkcml2ZXIuZ2V0VGV4dChpbm5lckVsWzBdLkVMRU1FTlQpLnNob3VsZC5ldmVudHVhbGx5LmhhdmUubGVuZ3RoLmFib3ZlKDEwKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgbm90IGZpbmQgYW4gZWxlbWVudCB0aGF0IGRvZXMgbm90IGV4aXN0JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5maW5kRWxlbWVudEZyb21FbGVtZW50KCdjbGFzcyBuYW1lJywgJ2JsYXJnaW1hcmcnLCBwYXJlbnRFbClcbiAgICAgIC5zaG91bGQuYmUucmVqZWN0ZWRXaXRoKC9jb3VsZCBub3QgYmUgbG9jYXRlZC8pO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBub3QgZmluZCBtdWx0aXBsZSBlbGVtZW50cyB0aGF0IGRvIG5vdCBleGlzdCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIuZmluZEVsZW1lbnRGcm9tRWxlbWVudCgnY2xhc3MgbmFtZScsICdibGFyZ2ltYXJnJywgcGFyZW50RWwpXG4gICAgICAuc2hvdWxkLmJlLnJlamVjdGVkV2l0aCgvY291bGQgbm90IGJlIGxvY2F0ZWQvKTtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vLi4ifQ==
