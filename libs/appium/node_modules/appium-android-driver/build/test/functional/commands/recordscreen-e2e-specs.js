'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _2 = require('../../..');

var _3 = _interopRequireDefault(_2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _desired = require('../desired');

var _desired2 = _interopRequireDefault(_desired);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var driver = undefined;
var caps = _lodash2['default'].defaults({
  appPackage: 'io.appium.android.apis',
  appActivity: '.view.TextFields'
}, _desired2['default']);

describe('recording the screen', function () {
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

  it('should start and stop recording the screen', function callee$1$0() {
    var el, text;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.isEmulator());

        case 2:
          context$2$0.t0 = context$2$0.sent;

          if (context$2$0.t0) {
            context$2$0.next = 8;
            break;
          }

          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.adb.getApiLevel());

        case 6:
          context$2$0.t1 = context$2$0.sent;
          context$2$0.t0 = context$2$0.t1 < 19;

        case 8:
          if (!context$2$0.t0) {
            context$2$0.next = 10;
            break;
          }

          return context$2$0.abrupt('return', this.skip());

        case 10:
          context$2$0.next = 12;
          return _regeneratorRuntime.awrap(driver.startRecordingScreen());

        case 12:
          context$2$0.next = 14;
          return _regeneratorRuntime.awrap(driver.findElement('class name', 'android.widget.EditText'));

        case 14:
          el = context$2$0.sent;

          el = el.ELEMENT;
          context$2$0.next = 18;
          return _regeneratorRuntime.awrap(driver.setValue('Recording the screen!', el));

        case 18:
          context$2$0.next = 20;
          return _regeneratorRuntime.awrap(driver.getText(el));

        case 20:
          text = context$2$0.sent;

          text.should.eql('Recording the screen!');

          context$2$0.next = 24;
          return _regeneratorRuntime.awrap(driver.stopRecordingScreen());

        case 24:
          context$2$0.sent.should.not.be.empty;

        case 25:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});

// do some interacting, to take some time
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9yZWNvcmRzY3JlZW4tZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7aUJBQ25CLFVBQVU7Ozs7c0JBQ3RCLFFBQVE7Ozs7dUJBQ0csWUFBWTs7OztBQUdyQyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLElBQUksTUFBTSxZQUFBLENBQUM7QUFDWCxJQUFJLElBQUksR0FBRyxvQkFBRSxRQUFRLENBQUM7QUFDcEIsWUFBVSxFQUFFLHdCQUF3QjtBQUNwQyxhQUFXLEVBQUUsa0JBQWtCO0NBQ2hDLHVCQUFlLENBQUM7O0FBRWpCLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxZQUFZO0FBQzNDLFFBQU0sQ0FBQzs7OztBQUNMLGdCQUFNLEdBQUcsbUJBQW1CLENBQUM7OzJDQUN2QixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQzs7Ozs7OztHQUNqQyxDQUFDLENBQUM7O0FBRUgsT0FBSyxDQUFDOzs7OzsyQ0FDRSxNQUFNLENBQUMsYUFBYSxFQUFFOzs7Ozs7O0dBQzdCLENBQUMsQ0FBQzs7QUFFSCxJQUFFLENBQUMsNENBQTRDLEVBQUU7UUFRM0MsRUFBRSxFQUdGLElBQUk7Ozs7OzJDQVZFLE1BQU0sQ0FBQyxVQUFVLEVBQUU7Ozs7Ozs7Ozs7OzJDQUFVLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFOzs7OzRDQUFHLEVBQUU7Ozs7Ozs7OzhDQUMzRCxJQUFJLENBQUMsSUFBSSxFQUFFOzs7OzJDQUdkLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRTs7OzsyQ0FHcEIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUseUJBQXlCLENBQUM7OztBQUF0RSxZQUFFOztBQUNOLFlBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDOzsyQ0FDVixNQUFNLENBQUMsUUFBUSxDQUFDLHVCQUF1QixFQUFFLEVBQUUsQ0FBQzs7OzsyQ0FDakMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7OztBQUEvQixjQUFJOztBQUNSLGNBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7OzsyQ0FFbEMsTUFBTSxDQUFDLG1CQUFtQixFQUFFOzs7MkJBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSzs7Ozs7OztHQUN6RCxDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2NvbW1hbmRzL3JlY29yZHNjcmVlbi1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCBBbmRyb2lkRHJpdmVyIGZyb20gJy4uLy4uLy4uJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgREVGQVVMVF9DQVBTIGZyb20gJy4uL2Rlc2lyZWQnO1xuXG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmxldCBkcml2ZXI7XG5sZXQgY2FwcyA9IF8uZGVmYXVsdHMoe1xuICBhcHBQYWNrYWdlOiAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcycsXG4gIGFwcEFjdGl2aXR5OiAnLnZpZXcuVGV4dEZpZWxkcydcbn0sIERFRkFVTFRfQ0FQUyk7XG5cbmRlc2NyaWJlKCdyZWNvcmRpbmcgdGhlIHNjcmVlbicsIGZ1bmN0aW9uICgpIHtcbiAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGNhcHMpO1xuICB9KTtcblxuICBhZnRlcihhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBzdGFydCBhbmQgc3RvcCByZWNvcmRpbmcgdGhlIHNjcmVlbicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoYXdhaXQgZHJpdmVyLmlzRW11bGF0b3IoKSB8fCBhd2FpdCBkcml2ZXIuYWRiLmdldEFwaUxldmVsKCkgPCAxOSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2tpcCgpO1xuICAgIH1cblxuICAgIGF3YWl0IGRyaXZlci5zdGFydFJlY29yZGluZ1NjcmVlbigpO1xuXG4gICAgLy8gZG8gc29tZSBpbnRlcmFjdGluZywgdG8gdGFrZSBzb21lIHRpbWVcbiAgICBsZXQgZWwgPSBhd2FpdCBkcml2ZXIuZmluZEVsZW1lbnQoJ2NsYXNzIG5hbWUnLCAnYW5kcm9pZC53aWRnZXQuRWRpdFRleHQnKTtcbiAgICBlbCA9IGVsLkVMRU1FTlQ7XG4gICAgYXdhaXQgZHJpdmVyLnNldFZhbHVlKCdSZWNvcmRpbmcgdGhlIHNjcmVlbiEnLCBlbCk7XG4gICAgbGV0IHRleHQgPSBhd2FpdCBkcml2ZXIuZ2V0VGV4dChlbCk7XG4gICAgdGV4dC5zaG91bGQuZXFsKCdSZWNvcmRpbmcgdGhlIHNjcmVlbiEnKTtcblxuICAgIChhd2FpdCBkcml2ZXIuc3RvcFJlY29yZGluZ1NjcmVlbigpKS5zaG91bGQubm90LmJlLmVtcHR5O1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLiJ9
