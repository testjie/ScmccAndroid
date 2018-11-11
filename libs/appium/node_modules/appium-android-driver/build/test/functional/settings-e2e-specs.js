'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _2 = require('../..');

var _3 = _interopRequireDefault(_2);

var _desired = require('./desired');

var _desired2 = _interopRequireDefault(_desired);

var _asyncbox = require('asyncbox');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var defaultCaps = _lodash2['default'].defaults({
  androidInstallTimeout: 90000,
  browserName: 'chrome'
}, _desired2['default']);

describe('toggle wifi tests', function () {
  var driver = undefined;

  describe('functional', function () {
    before(function () {
      if (process.env.TRAVIS) {
        return this.skip();
      }
      if (!process.env.REAL_DEVICE) {
        return this.skip();
      }
      driver = new _3['default']();
    });
    afterEach(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.deleteSession());

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should toggle wifi on real devices', function callee$2$0() {
      var isWifiOn;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.createSession(defaultCaps));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.isWifiOn());

          case 4:
            isWifiOn = context$3$0.sent;

            if (!isWifiOn) {
              context$3$0.next = 16;
              break;
            }

            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(driver.setWifiState(0, false));

          case 8:
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(500));

          case 10:
            context$3$0.next = 12;
            return _regeneratorRuntime.awrap(driver.isWifiOn());

          case 12:
            isWifiOn = context$3$0.sent;

            isWifiOn.should.be['false'];
            context$3$0.next = 24;
            break;

          case 16:
            context$3$0.next = 18;
            return _regeneratorRuntime.awrap(driver.setWifiState(1, false));

          case 18:
            context$3$0.next = 20;
            return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(2500));

          case 20:
            context$3$0.next = 22;
            return _regeneratorRuntime.awrap(driver.isWifiOn());

          case 22:
            isWifiOn = context$3$0.sent;

            isWifiOn.should.be['true'];

          case 24:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});

// enabling wifi takes time
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9zZXR0aW5ncy1lMmUtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztzQkFDL0IsUUFBUTs7OztpQkFDSSxPQUFPOzs7O3VCQUNSLFdBQVc7Ozs7d0JBQ2QsVUFBVTs7QUFFaEMsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixJQUFJLFdBQVcsR0FBRyxvQkFBRSxRQUFRLENBQUM7QUFDM0IsdUJBQXFCLEVBQUUsS0FBSztBQUM1QixhQUFXLEVBQUUsUUFBUTtDQUN0Qix1QkFBZSxDQUFDOztBQUVqQixRQUFRLENBQUMsbUJBQW1CLEVBQUUsWUFBWTtBQUN4QyxNQUFJLE1BQU0sWUFBQSxDQUFDOztBQUVYLFVBQVEsQ0FBQyxZQUFZLEVBQUUsWUFBWTtBQUNqQyxVQUFNLENBQUMsWUFBWTtBQUNqQixVQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFO0FBQ3RCLGVBQU8sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO09BQ3BCO0FBQ0QsVUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFO0FBQzVCLGVBQU8sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO09BQ3BCO0FBQ0QsWUFBTSxHQUFHLG1CQUFtQixDQUFDO0tBQzlCLENBQUMsQ0FBQztBQUNILGFBQVMsQ0FBQzs7Ozs7NkNBQ0YsTUFBTSxDQUFDLGFBQWEsRUFBRTs7Ozs7OztLQUM3QixDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsb0NBQW9DLEVBQUU7VUFFbkMsUUFBUTs7Ozs7NkNBRE4sTUFBTSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7Ozs7NkNBQ2xCLE1BQU0sQ0FBQyxRQUFRLEVBQUU7OztBQUFsQyxvQkFBUTs7aUJBQ1IsUUFBUTs7Ozs7OzZDQUNKLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQzs7Ozs2Q0FDN0IscUJBQU0sR0FBRyxDQUFDOzs7OzZDQUNDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7OztBQUFsQyxvQkFBUTs7QUFDUixvQkFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFNBQU0sQ0FBQzs7Ozs7OzZDQUVuQixNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUM7Ozs7NkNBRTdCLHFCQUFNLElBQUksQ0FBQzs7Ozs2Q0FDQSxNQUFNLENBQUMsUUFBUSxFQUFFOzs7QUFBbEMsb0JBQVE7O0FBQ1Isb0JBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFLLENBQUM7Ozs7Ozs7S0FFM0IsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9zZXR0aW5ncy1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLic7XG5pbXBvcnQgREVGQVVMVF9DQVBTIGZyb20gJy4vZGVzaXJlZCc7XG5pbXBvcnQgeyBzbGVlcCB9IGZyb20gJ2FzeW5jYm94JztcblxuY2hhaS5zaG91bGQoKTtcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcblxubGV0IGRlZmF1bHRDYXBzID0gXy5kZWZhdWx0cyh7XG4gIGFuZHJvaWRJbnN0YWxsVGltZW91dDogOTAwMDAsXG4gIGJyb3dzZXJOYW1lOiAnY2hyb21lJ1xufSwgREVGQVVMVF9DQVBTKTtcblxuZGVzY3JpYmUoJ3RvZ2dsZSB3aWZpIHRlc3RzJywgZnVuY3Rpb24gKCkge1xuICBsZXQgZHJpdmVyO1xuXG4gIGRlc2NyaWJlKCdmdW5jdGlvbmFsJywgZnVuY3Rpb24gKCkge1xuICAgIGJlZm9yZShmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuVFJBVklTKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNraXAoKTtcbiAgICAgIH1cbiAgICAgIGlmICghcHJvY2Vzcy5lbnYuUkVBTF9ERVZJQ0UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2tpcCgpO1xuICAgICAgfVxuICAgICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgICB9KTtcbiAgICBhZnRlckVhY2goYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHRvZ2dsZSB3aWZpIG9uIHJlYWwgZGV2aWNlcycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGRlZmF1bHRDYXBzKTtcbiAgICAgIGxldCBpc1dpZmlPbiA9IGF3YWl0IGRyaXZlci5pc1dpZmlPbigpO1xuICAgICAgaWYgKGlzV2lmaU9uKSB7XG4gICAgICAgIGF3YWl0IGRyaXZlci5zZXRXaWZpU3RhdGUoMCwgZmFsc2UpO1xuICAgICAgICBhd2FpdCBzbGVlcCg1MDApO1xuICAgICAgICBpc1dpZmlPbiA9IGF3YWl0IGRyaXZlci5pc1dpZmlPbigpO1xuICAgICAgICBpc1dpZmlPbi5zaG91bGQuYmUuZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhd2FpdCBkcml2ZXIuc2V0V2lmaVN0YXRlKDEsIGZhbHNlKTtcbiAgICAgICAgLy8gZW5hYmxpbmcgd2lmaSB0YWtlcyB0aW1lXG4gICAgICAgIGF3YWl0IHNsZWVwKDI1MDApO1xuICAgICAgICBpc1dpZmlPbiA9IGF3YWl0IGRyaXZlci5pc1dpZmlPbigpO1xuICAgICAgICBpc1dpZmlPbi5zaG91bGQuYmUudHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4ifQ==
