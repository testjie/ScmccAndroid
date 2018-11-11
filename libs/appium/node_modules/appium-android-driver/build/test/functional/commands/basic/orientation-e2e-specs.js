'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../../../..');

var _2 = _interopRequireDefault(_);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _desired = require('../../desired');

var _desired2 = _interopRequireDefault(_desired);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('apidemo - orientation -', function () {
  var driver = undefined;

  describe('initial -', function () {
    beforeEach(function () {
      driver = new _2['default']();
    });
    afterEach(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.setOrientation('PORTRAIT'));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.deleteSession());

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should have portrait orientation if requested', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.createSession(_Object$assign({}, _desired2['default'], {
              appActivity: '.view.TextFields',
              orientation: 'PORTRAIT'
            })));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.getOrientation().should.eventually.eql('PORTRAIT'));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should have landscape orientation if requested', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.createSession(_Object$assign({}, _desired2['default'], {
              appActivity: '.view.TextFields',
              orientation: 'LANDSCAPE'
            })));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.getOrientation().should.eventually.eql('LANDSCAPE'));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should have portrait orientation if nothing requested', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.createSession(_Object$assign({}, _desired2['default'], {
              appActivity: '.view.TextFields'
            })));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.getOrientation().should.eventually.eql('PORTRAIT'));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('setting -', function () {
    before(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _2['default']();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.createSession(_Object$assign({}, _desired2['default'], {
              appActivity: '.view.TextFields'
            })));

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
            return _regeneratorRuntime.awrap(driver.deleteSession());

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should rotate screen to landscape', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.setOrientation('PORTRAIT'));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_bluebird2['default'].delay(3000));

          case 4:
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(driver.setOrientation('LANDSCAPE'));

          case 6:
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(_bluebird2['default'].delay(3000));

          case 8:
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(driver.getOrientation().should.eventually.become('LANDSCAPE'));

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should rotate screen to landscape', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.setOrientation('LANDSCAPE'));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_bluebird2['default'].delay(3000));

          case 4:
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(driver.setOrientation('PORTRAIT'));

          case 6:
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(_bluebird2['default'].delay(3000));

          case 8:
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(driver.getOrientation().should.eventually.become('PORTRAIT'));

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should not error when trying to rotate to portrait again', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.setOrientation('PORTRAIT'));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_bluebird2['default'].delay(3000));

          case 4:
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(driver.setOrientation('PORTRAIT'));

          case 6:
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(_bluebird2['default'].delay(3000));

          case 8:
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(driver.getOrientation().should.eventually.become('PORTRAIT'));

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9iYXNpYy9vcmllbnRhdGlvbi1lMmUtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O2dCQUNuQixhQUFhOzs7O3dCQUN6QixVQUFVOzs7O3VCQUNDLGVBQWU7Ozs7QUFHeEMsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixRQUFRLENBQUMseUJBQXlCLEVBQUUsWUFBWTtBQUM5QyxNQUFJLE1BQU0sWUFBQSxDQUFDOztBQUVYLFVBQVEsQ0FBQyxXQUFXLEVBQUUsWUFBWTtBQUNoQyxjQUFVLENBQUMsWUFBWTtBQUNyQixZQUFNLEdBQUcsbUJBQW1CLENBQUM7S0FDOUIsQ0FBQyxDQUFDO0FBQ0gsYUFBUyxDQUFDOzs7Ozs2Q0FDRixNQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQzs7Ozs2Q0FDakMsTUFBTSxDQUFDLGFBQWEsRUFBRTs7Ozs7OztLQUM3QixDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsK0NBQStDLEVBQUU7Ozs7OzZDQUM1QyxNQUFNLENBQUMsYUFBYSxDQUFDLGVBQWMsRUFBRSx3QkFBZ0I7QUFDekQseUJBQVcsRUFBRSxrQkFBa0I7QUFDL0IseUJBQVcsRUFBRSxVQUFVO2FBQ3hCLENBQUMsQ0FBQzs7Ozs2Q0FDRyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDOzs7Ozs7O0tBQ2hFLENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQyxnREFBZ0QsRUFBRTs7Ozs7NkNBQzdDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZUFBYyxFQUFFLHdCQUFnQjtBQUN6RCx5QkFBVyxFQUFFLGtCQUFrQjtBQUMvQix5QkFBVyxFQUFFLFdBQVc7YUFDekIsQ0FBQyxDQUFDOzs7OzZDQUNHLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7Ozs7Ozs7S0FDakUsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLHVEQUF1RCxFQUFFOzs7Ozs2Q0FDcEQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxlQUFjLEVBQUUsd0JBQWdCO0FBQ3pELHlCQUFXLEVBQUUsa0JBQWtCO2FBQ2hDLENBQUMsQ0FBQzs7Ozs2Q0FDRyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDOzs7Ozs7O0tBQ2hFLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztBQUNILFVBQVEsQ0FBQyxXQUFXLEVBQUUsWUFBWTtBQUNoQyxVQUFNLENBQUM7Ozs7QUFDTCxrQkFBTSxHQUFHLG1CQUFtQixDQUFDOzs2Q0FDdkIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxlQUFjLEVBQUUsd0JBQWdCO0FBQ3pELHlCQUFXLEVBQUUsa0JBQWtCO2FBQ2hDLENBQUMsQ0FBQzs7Ozs7OztLQUNKLENBQUMsQ0FBQztBQUNILFNBQUssQ0FBQzs7Ozs7NkNBQ0UsTUFBTSxDQUFDLGFBQWEsRUFBRTs7Ozs7OztLQUM3QixDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsbUNBQW1DLEVBQUU7Ozs7OzZDQUNoQyxNQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQzs7Ozs2Q0FDakMsc0JBQUUsS0FBSyxDQUFDLElBQUksQ0FBQzs7Ozs2Q0FDYixNQUFNLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQzs7Ozs2Q0FDbEMsc0JBQUUsS0FBSyxDQUFDLElBQUksQ0FBQzs7Ozs2Q0FDYixNQUFNLENBQUMsY0FBYyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDOzs7Ozs7O0tBQ3BFLENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQyxtQ0FBbUMsRUFBRTs7Ozs7NkNBQ2hDLE1BQU0sQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDOzs7OzZDQUNsQyxzQkFBRSxLQUFLLENBQUMsSUFBSSxDQUFDOzs7OzZDQUNiLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDOzs7OzZDQUNqQyxzQkFBRSxLQUFLLENBQUMsSUFBSSxDQUFDOzs7OzZDQUNiLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7Ozs7Ozs7S0FDbkUsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLDBEQUEwRCxFQUFFOzs7Ozs2Q0FDdkQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUM7Ozs7NkNBQ2pDLHNCQUFFLEtBQUssQ0FBQyxJQUFJLENBQUM7Ozs7NkNBQ2IsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUM7Ozs7NkNBQ2pDLHNCQUFFLEtBQUssQ0FBQyxJQUFJLENBQUM7Ozs7NkNBQ2IsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQzs7Ozs7OztLQUNuRSxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2NvbW1hbmRzL2Jhc2ljL29yaWVudGF0aW9uLWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4vLi4vLi4nO1xuaW1wb3J0IEIgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IERFRkFVTFRfQ0FQUyBmcm9tICcuLi8uLi9kZXNpcmVkJztcblxuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5kZXNjcmliZSgnYXBpZGVtbyAtIG9yaWVudGF0aW9uIC0nLCBmdW5jdGlvbiAoKSB7XG4gIGxldCBkcml2ZXI7XG5cbiAgZGVzY3JpYmUoJ2luaXRpYWwgLScsIGZ1bmN0aW9uICgpIHtcbiAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gICAgfSk7XG4gICAgYWZ0ZXJFYWNoKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGF3YWl0IGRyaXZlci5zZXRPcmllbnRhdGlvbignUE9SVFJBSVQnKTtcbiAgICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBoYXZlIHBvcnRyYWl0IG9yaWVudGF0aW9uIGlmIHJlcXVlc3RlZCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfQ0FQUywge1xuICAgICAgICBhcHBBY3Rpdml0eTogJy52aWV3LlRleHRGaWVsZHMnLFxuICAgICAgICBvcmllbnRhdGlvbjogJ1BPUlRSQUlUJyxcbiAgICAgIH0pKTtcbiAgICAgIGF3YWl0IGRyaXZlci5nZXRPcmllbnRhdGlvbigpLnNob3VsZC5ldmVudHVhbGx5LmVxbCgnUE9SVFJBSVQnKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGhhdmUgbGFuZHNjYXBlIG9yaWVudGF0aW9uIGlmIHJlcXVlc3RlZCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfQ0FQUywge1xuICAgICAgICBhcHBBY3Rpdml0eTogJy52aWV3LlRleHRGaWVsZHMnLFxuICAgICAgICBvcmllbnRhdGlvbjogJ0xBTkRTQ0FQRScsXG4gICAgICB9KSk7XG4gICAgICBhd2FpdCBkcml2ZXIuZ2V0T3JpZW50YXRpb24oKS5zaG91bGQuZXZlbnR1YWxseS5lcWwoJ0xBTkRTQ0FQRScpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgaGF2ZSBwb3J0cmFpdCBvcmllbnRhdGlvbiBpZiBub3RoaW5nIHJlcXVlc3RlZCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfQ0FQUywge1xuICAgICAgICBhcHBBY3Rpdml0eTogJy52aWV3LlRleHRGaWVsZHMnLFxuICAgICAgfSkpO1xuICAgICAgYXdhaXQgZHJpdmVyLmdldE9yaWVudGF0aW9uKCkuc2hvdWxkLmV2ZW50dWFsbHkuZXFsKCdQT1JUUkFJVCcpO1xuICAgIH0pO1xuICB9KTtcbiAgZGVzY3JpYmUoJ3NldHRpbmcgLScsIGZ1bmN0aW9uICgpIHtcbiAgICBiZWZvcmUoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfQ0FQUywge1xuICAgICAgICBhcHBBY3Rpdml0eTogJy52aWV3LlRleHRGaWVsZHMnXG4gICAgICB9KSk7XG4gICAgfSk7XG4gICAgYWZ0ZXIoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHJvdGF0ZSBzY3JlZW4gdG8gbGFuZHNjYXBlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgYXdhaXQgZHJpdmVyLnNldE9yaWVudGF0aW9uKCdQT1JUUkFJVCcpO1xuICAgICAgYXdhaXQgQi5kZWxheSgzMDAwKTtcbiAgICAgIGF3YWl0IGRyaXZlci5zZXRPcmllbnRhdGlvbignTEFORFNDQVBFJyk7XG4gICAgICBhd2FpdCBCLmRlbGF5KDMwMDApO1xuICAgICAgYXdhaXQgZHJpdmVyLmdldE9yaWVudGF0aW9uKCkuc2hvdWxkLmV2ZW50dWFsbHkuYmVjb21lKCdMQU5EU0NBUEUnKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHJvdGF0ZSBzY3JlZW4gdG8gbGFuZHNjYXBlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgYXdhaXQgZHJpdmVyLnNldE9yaWVudGF0aW9uKCdMQU5EU0NBUEUnKTtcbiAgICAgIGF3YWl0IEIuZGVsYXkoMzAwMCk7XG4gICAgICBhd2FpdCBkcml2ZXIuc2V0T3JpZW50YXRpb24oJ1BPUlRSQUlUJyk7XG4gICAgICBhd2FpdCBCLmRlbGF5KDMwMDApO1xuICAgICAgYXdhaXQgZHJpdmVyLmdldE9yaWVudGF0aW9uKCkuc2hvdWxkLmV2ZW50dWFsbHkuYmVjb21lKCdQT1JUUkFJVCcpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgbm90IGVycm9yIHdoZW4gdHJ5aW5nIHRvIHJvdGF0ZSB0byBwb3J0cmFpdCBhZ2FpbicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGF3YWl0IGRyaXZlci5zZXRPcmllbnRhdGlvbignUE9SVFJBSVQnKTtcbiAgICAgIGF3YWl0IEIuZGVsYXkoMzAwMCk7XG4gICAgICBhd2FpdCBkcml2ZXIuc2V0T3JpZW50YXRpb24oJ1BPUlRSQUlUJyk7XG4gICAgICBhd2FpdCBCLmRlbGF5KDMwMDApO1xuICAgICAgYXdhaXQgZHJpdmVyLmdldE9yaWVudGF0aW9uKCkuc2hvdWxkLmV2ZW50dWFsbHkuYmVjb21lKCdQT1JUUkFJVCcpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi8uLiJ9
