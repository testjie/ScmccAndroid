'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _asyncbox = require('asyncbox');

var _desired = require('../desired');

var _helpersSession = require('../helpers/session');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('geo-location -', function () {
  var driver = undefined;
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(_desired.GPS_DEMO_CAPS));

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

  it('should set geo location', function callee$1$0() {
    var getText, latitude, longitude, text;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      var _this = this;

      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          getText = function getText() {
            return _regeneratorRuntime.async(function getText$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(5, 1000, function callee$3$0() {
                    var textViews;
                    return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                      while (1) switch (context$4$0.prev = context$4$0.next) {
                        case 0:
                          context$4$0.next = 2;
                          return _regeneratorRuntime.awrap(driver.elementsByClassName('android.widget.TextView'));

                        case 2:
                          textViews = context$4$0.sent;

                          textViews.length.should.be.at.least(2);
                          context$4$0.next = 6;
                          return _regeneratorRuntime.awrap(textViews[1].text());

                        case 6:
                          return context$4$0.abrupt('return', context$4$0.sent);

                        case 7:
                        case 'end':
                          return context$4$0.stop();
                      }
                    }, null, this);
                  }));

                case 2:
                  return context$3$0.abrupt('return', context$3$0.sent);

                case 3:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this);
          };

          latitude = '27.1';
          longitude = '78.0';
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(getText());

        case 5:
          text = context$2$0.sent;

          text.should.not.include('Latitude: ' + latitude);
          text.should.not.include('Longitude: ' + longitude);

          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(driver.setGeoLocation(latitude, longitude));

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9nZW8tbG9jYXRpb24tZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7d0JBQ2YsVUFBVTs7dUJBQ1YsWUFBWTs7OEJBQ2Ysb0JBQW9COztBQUcvQyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxZQUFZO0FBQ3JDLE1BQUksTUFBTSxZQUFBLENBQUM7QUFDWCxRQUFNLENBQUM7Ozs7OzJDQUNVLHVEQUF5Qjs7O0FBQXhDLGdCQUFNOzs7Ozs7O0dBQ1AsQ0FBQyxDQUFDO0FBQ0gsT0FBSyxDQUFDOzs7OzsyQ0FDRSxNQUFNLENBQUMsSUFBSSxFQUFFOzs7Ozs7O0dBQ3BCLENBQUMsQ0FBQzs7QUFFSCxJQUFFLENBQUMseUJBQXlCLEVBQUU7UUFDeEIsT0FBTyxFQVFQLFFBQVEsRUFDUixTQUFTLEVBRVQsSUFBSTs7Ozs7O0FBWEosaUJBQU8sR0FBRyxTQUFWLE9BQU87Ozs7O21EQUNJLDZCQUFjLENBQUMsRUFBRSxJQUFJLEVBQUU7d0JBQzVCLFNBQVM7Ozs7OzJEQUFTLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyx5QkFBeUIsQ0FBQzs7O0FBQXZFLG1DQUFTOztBQUNmLG1DQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7MkRBQzFCLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUU7Ozs7Ozs7Ozs7bUJBQ2pDLENBQUM7Ozs7Ozs7Ozs7V0FDSDs7QUFFRyxrQkFBUSxHQUFHLE1BQU07QUFDakIsbUJBQVMsR0FBRyxNQUFNOzsyQ0FFTCxPQUFPLEVBQUU7OztBQUF0QixjQUFJOztBQUNSLGNBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sZ0JBQWMsUUFBUSxDQUFHLENBQUM7QUFDakQsY0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxpQkFBZSxTQUFTLENBQUcsQ0FBQzs7OzJDQUU3QyxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUM7Ozs7MkNBRzFDLDZCQUFjLENBQUMsRUFBRSxJQUFJLEVBQUU7Ozs7O21EQUNqQixPQUFPLEVBQUU7Ozs7OzJDQUFLLGNBQWM7Ozs7O3dCQUM5QixJQUFJLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQzs7Ozs7OztXQUVsRCxDQUFDOzs7OzJDQUVXLE9BQU8sRUFBRTs7O0FBQXRCLGNBQUk7O0FBQ0osY0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLGdCQUFjLFFBQVEsQ0FBRyxDQUFDO0FBQzdDLGNBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxpQkFBZSxTQUFTLENBQUcsQ0FBQzs7Ozs7OztHQUNoRCxDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2NvbW1hbmRzL2dlby1sb2NhdGlvbi1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCB7IHJldHJ5SW50ZXJ2YWwgfSBmcm9tICdhc3luY2JveCc7XG5pbXBvcnQgeyBHUFNfREVNT19DQVBTIH0gZnJvbSAnLi4vZGVzaXJlZCc7XG5pbXBvcnQgeyBpbml0RHJpdmVyIH0gZnJvbSAnLi4vaGVscGVycy9zZXNzaW9uJztcblxuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5kZXNjcmliZSgnZ2VvLWxvY2F0aW9uIC0nLCBmdW5jdGlvbiAoKSB7XG4gIGxldCBkcml2ZXI7XG4gIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgZHJpdmVyID0gYXdhaXQgaW5pdERyaXZlcihHUFNfREVNT19DQVBTKTtcbiAgfSk7XG4gIGFmdGVyKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIucXVpdCgpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHNldCBnZW8gbG9jYXRpb24nLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGdldFRleHQgPSBhc3luYyAoKSA9PiB7XG4gICAgICByZXR1cm4gYXdhaXQgcmV0cnlJbnRlcnZhbCg1LCAxMDAwLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IHRleHRWaWV3cyA9IGF3YWl0IGRyaXZlci5lbGVtZW50c0J5Q2xhc3NOYW1lKCdhbmRyb2lkLndpZGdldC5UZXh0VmlldycpO1xuICAgICAgICB0ZXh0Vmlld3MubGVuZ3RoLnNob3VsZC5iZS5hdC5sZWFzdCgyKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRleHRWaWV3c1sxXS50ZXh0KCk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgbGV0IGxhdGl0dWRlID0gJzI3LjEnO1xuICAgIGxldCBsb25naXR1ZGUgPSAnNzguMCc7XG5cbiAgICBsZXQgdGV4dCA9IGF3YWl0IGdldFRleHQoKTtcbiAgICB0ZXh0LnNob3VsZC5ub3QuaW5jbHVkZShgTGF0aXR1ZGU6ICR7bGF0aXR1ZGV9YCk7XG4gICAgdGV4dC5zaG91bGQubm90LmluY2x1ZGUoYExvbmdpdHVkZTogJHtsb25naXR1ZGV9YCk7XG5cbiAgICBhd2FpdCBkcml2ZXIuc2V0R2VvTG9jYXRpb24obGF0aXR1ZGUsIGxvbmdpdHVkZSk7XG5cbiAgICAvLyB3YWl0IGZvciB0aGUgdGV4dCB0byBjaGFuZ2VcbiAgICBhd2FpdCByZXRyeUludGVydmFsKDYsIDEwMDAsIGFzeW5jICgpID0+IHtcbiAgICAgIGlmIChhd2FpdCBnZXRUZXh0KCkgPT09ICdHUFMgVHV0b3JpYWwnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTG9jYXRpb24gbm90IHNldCB5ZXQuIFJldHJ5LicpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGV4dCA9IGF3YWl0IGdldFRleHQoKTtcbiAgICB0ZXh0LnNob3VsZC5pbmNsdWRlKGBMYXRpdHVkZTogJHtsYXRpdHVkZX1gKTtcbiAgICB0ZXh0LnNob3VsZC5pbmNsdWRlKGBMb25naXR1ZGU6ICR7bG9uZ2l0dWRlfWApO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLiJ9
