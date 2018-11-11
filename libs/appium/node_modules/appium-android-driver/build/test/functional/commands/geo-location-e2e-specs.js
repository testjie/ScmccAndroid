'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _asyncbox = require('asyncbox');

var _ = require('../../..');

var _2 = _interopRequireDefault(_);

var _desired = require('../desired');

var _desired2 = _interopRequireDefault(_desired);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe.skip("geo-location", function () {
  var driver = undefined;
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          driver = new _2['default']();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.createSession(_desired2['default']));

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

  it('should set geo location @skip-ci', function callee$1$0() {
    var getText, latitude, longitude, text;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      var _this = this;

      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          getText = function getText() {
            var els;
            return _regeneratorRuntime.async(function getText$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(driver.findElements('class name', 'android.widget.TextView'));

                case 2:
                  els = context$3$0.sent;
                  context$3$0.next = 5;
                  return _regeneratorRuntime.awrap(driver.getText(els[1].ELEMENT));

                case 5:
                  return context$3$0.abrupt('return', context$3$0.sent);

                case 6:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          };

          latitude = '27.17';
          longitude = '78.04';
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(getText());

        case 5:
          text = context$2$0.sent;

          text.should.not.include('Latitude: ' + latitude);
          text.should.not.include('Longitude: ' + longitude);

          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(driver.setGeoLocation({ latitude: latitude, longitude: longitude }));

        case 10:
          context$2$0.next = 12;
          return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(6, 1000, function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(getText());

                case 2:
                  context$3$0.t0 = context$3$0.sent;

                  if (!(context$3$0.t0 === 'GPS Tutorial')) {
                    context$3$0.next = 5;
                    break;
                  }

                  throw new Error('Location not set yet. Retry.');

                case 5:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          }));

        case 12:
          context$2$0.next = 14;
          return _regeneratorRuntime.awrap(getText());

        case 14:
          text = context$2$0.sent;

          text.should.include('Latitude: ' + latitude);
          text.should.include('Longitude: ' + longitude);

        case 17:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});

// wait for the text to change
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9nZW8tbG9jYXRpb24tZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7d0JBQ2YsVUFBVTs7Z0JBQ2QsVUFBVTs7Ozt1QkFDWCxZQUFZOzs7O0FBR3JDLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsWUFBWTtBQUN4QyxNQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsUUFBTSxDQUFDOzs7O0FBQ0wsZ0JBQU0sR0FBRyxtQkFBbUIsQ0FBQzs7MkNBQ3ZCLE1BQU0sQ0FBQyxhQUFhLHNCQUFjOzs7Ozs7O0dBQ3pDLENBQUMsQ0FBQztBQUNILE9BQUssQ0FBQzs7Ozs7MkNBQ0UsTUFBTSxDQUFDLGFBQWEsRUFBRTs7Ozs7OztHQUM3QixDQUFDLENBQUM7O0FBRUgsSUFBRSxDQUFDLGtDQUFrQyxFQUFFO1FBQ2pDLE9BQU8sRUFLUCxRQUFRLEVBQ1IsU0FBUyxFQUVULElBQUk7Ozs7OztBQVJKLGlCQUFPLEdBQUcsU0FBVixPQUFPO2dCQUNMLEdBQUc7Ozs7O21EQUFTLE1BQU0sQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLHlCQUF5QixDQUFDOzs7QUFBeEUscUJBQUc7O21EQUNNLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQzs7Ozs7Ozs7OztXQUM1Qzs7QUFFRyxrQkFBUSxHQUFHLE9BQU87QUFDbEIsbUJBQVMsR0FBRyxPQUFPOzsyQ0FFTixPQUFPLEVBQUU7OztBQUF0QixjQUFJOztBQUNSLGNBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sZ0JBQWMsUUFBUSxDQUFHLENBQUM7QUFDakQsY0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxpQkFBZSxTQUFTLENBQUcsQ0FBQzs7OzJDQUU3QyxNQUFNLENBQUMsY0FBYyxDQUFDLEVBQUMsUUFBUSxFQUFSLFFBQVEsRUFBRSxTQUFTLEVBQVQsU0FBUyxFQUFDLENBQUM7Ozs7MkNBRzVDLDZCQUFjLENBQUMsRUFBRSxJQUFJLEVBQUU7Ozs7O21EQUNqQixPQUFPLEVBQUU7Ozs7OzJDQUFLLGNBQWM7Ozs7O3dCQUM5QixJQUFJLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQzs7Ozs7OztXQUVsRCxDQUFDOzs7OzJDQUVXLE9BQU8sRUFBRTs7O0FBQXRCLGNBQUk7O0FBQ0osY0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLGdCQUFjLFFBQVEsQ0FBRyxDQUFDO0FBQzdDLGNBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxpQkFBZSxTQUFTLENBQUcsQ0FBQzs7Ozs7OztHQUNoRCxDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2NvbW1hbmRzL2dlby1sb2NhdGlvbi1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCB7IHJldHJ5SW50ZXJ2YWwgfSBmcm9tICdhc3luY2JveCc7XG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLi8uLic7XG5pbXBvcnQgREVGQVVMVF9DQVBTIGZyb20gJy4uL2Rlc2lyZWQnO1xuXG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmRlc2NyaWJlLnNraXAoXCJnZW8tbG9jYXRpb25cIiwgZnVuY3Rpb24gKCkge1xuICBsZXQgZHJpdmVyO1xuICBiZWZvcmUoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oREVGQVVMVF9DQVBTKTtcbiAgfSk7XG4gIGFmdGVyKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIuZGVsZXRlU2Vzc2lvbigpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHNldCBnZW8gbG9jYXRpb24gQHNraXAtY2knLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGdldFRleHQgPSBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgZWxzID0gYXdhaXQgZHJpdmVyLmZpbmRFbGVtZW50cygnY2xhc3MgbmFtZScsICdhbmRyb2lkLndpZGdldC5UZXh0VmlldycpO1xuICAgICAgcmV0dXJuIGF3YWl0IGRyaXZlci5nZXRUZXh0KGVsc1sxXS5FTEVNRU5UKTtcbiAgICB9O1xuXG4gICAgbGV0IGxhdGl0dWRlID0gJzI3LjE3JztcbiAgICBsZXQgbG9uZ2l0dWRlID0gJzc4LjA0JztcblxuICAgIGxldCB0ZXh0ID0gYXdhaXQgZ2V0VGV4dCgpO1xuICAgIHRleHQuc2hvdWxkLm5vdC5pbmNsdWRlKGBMYXRpdHVkZTogJHtsYXRpdHVkZX1gKTtcbiAgICB0ZXh0LnNob3VsZC5ub3QuaW5jbHVkZShgTG9uZ2l0dWRlOiAke2xvbmdpdHVkZX1gKTtcblxuICAgIGF3YWl0IGRyaXZlci5zZXRHZW9Mb2NhdGlvbih7bGF0aXR1ZGUsIGxvbmdpdHVkZX0pO1xuXG4gICAgLy8gd2FpdCBmb3IgdGhlIHRleHQgdG8gY2hhbmdlXG4gICAgYXdhaXQgcmV0cnlJbnRlcnZhbCg2LCAxMDAwLCBhc3luYyAoKSA9PiB7XG4gICAgICBpZiAoYXdhaXQgZ2V0VGV4dCgpID09PSAnR1BTIFR1dG9yaWFsJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0xvY2F0aW9uIG5vdCBzZXQgeWV0LiBSZXRyeS4nKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRleHQgPSBhd2FpdCBnZXRUZXh0KCk7XG4gICAgdGV4dC5zaG91bGQuaW5jbHVkZShgTGF0aXR1ZGU6ICR7bGF0aXR1ZGV9YCk7XG4gICAgdGV4dC5zaG91bGQuaW5jbHVkZShgTG9uZ2l0dWRlOiAke2xvbmdpdHVkZX1gKTtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4ifQ==
