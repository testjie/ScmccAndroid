'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _desired = require('../desired');

var _helpersSession = require('../helpers/session');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('apidemo - orientation -', function () {
  var driver = undefined;

  describe('initial -', function () {
    afterEach(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.setOrientation('PORTRAIT'));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.quit());

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
            return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(_Object$assign({}, _desired.APIDEMOS_CAPS, {
              appActivity: '.view.TextFields',
              orientation: 'PORTRAIT'
            })));

          case 2:
            driver = context$3$0.sent;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.getOrientation().should.eventually.eql('PORTRAIT'));

          case 5:
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
            return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(_Object$assign({}, _desired.APIDEMOS_CAPS, {
              appActivity: '.view.TextFields',
              orientation: 'LANDSCAPE'
            })));

          case 2:
            driver = context$3$0.sent;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.getOrientation().should.eventually.eql('LANDSCAPE'));

          case 5:
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
            return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(_Object$assign({}, _desired.APIDEMOS_CAPS, {
              appActivity: '.view.TextFields'
            })));

          case 2:
            driver = context$3$0.sent;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.getOrientation().should.eventually.eql('PORTRAIT'));

          case 5:
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
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(_Object$assign({}, _desired.APIDEMOS_CAPS, {
              appActivity: '.view.TextFields'
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9vcmllbnRhdGlvbi1lMmUtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O3dCQUMvQixVQUFVOzs7O3VCQUNNLFlBQVk7OzhCQUNmLG9CQUFvQjs7QUFHL0Msa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixRQUFRLENBQUMseUJBQXlCLEVBQUUsWUFBWTtBQUM5QyxNQUFJLE1BQU0sWUFBQSxDQUFDOztBQUVYLFVBQVEsQ0FBQyxXQUFXLEVBQUUsWUFBWTtBQUNoQyxhQUFTLENBQUM7Ozs7OzZDQUNGLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDOzs7OzZDQUNqQyxNQUFNLENBQUMsSUFBSSxFQUFFOzs7Ozs7O0tBQ3BCLENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQywrQ0FBK0MsRUFBRTs7Ozs7NkNBQ25DLGdDQUFXLGVBQWMsRUFBRSwwQkFBaUI7QUFDekQseUJBQVcsRUFBRSxrQkFBa0I7QUFDL0IseUJBQVcsRUFBRSxVQUFVO2FBQ3hCLENBQUMsQ0FBQzs7O0FBSEgsa0JBQU07OzZDQUlBLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7Ozs7Ozs7S0FDaEUsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLGdEQUFnRCxFQUFFOzs7Ozs2Q0FDcEMsZ0NBQVcsZUFBYyxFQUFFLDBCQUFpQjtBQUN6RCx5QkFBVyxFQUFFLGtCQUFrQjtBQUMvQix5QkFBVyxFQUFFLFdBQVc7YUFDekIsQ0FBQyxDQUFDOzs7QUFISCxrQkFBTTs7NkNBSUEsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQzs7Ozs7OztLQUNqRSxDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsdURBQXVELEVBQUU7Ozs7OzZDQUMzQyxnQ0FBVyxlQUFjLEVBQUUsMEJBQWlCO0FBQ3pELHlCQUFXLEVBQUUsa0JBQWtCO2FBQ2hDLENBQUMsQ0FBQzs7O0FBRkgsa0JBQU07OzZDQUdBLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7Ozs7Ozs7S0FDaEUsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0FBQ0gsVUFBUSxDQUFDLFdBQVcsRUFBRSxZQUFZO0FBQ2hDLFVBQU0sQ0FBQzs7Ozs7NkNBQ1UsZ0NBQVcsZUFBYyxFQUFFLDBCQUFpQjtBQUN6RCx5QkFBVyxFQUFFLGtCQUFrQjthQUNoQyxDQUFDLENBQUM7OztBQUZILGtCQUFNOzs7Ozs7O0tBR1AsQ0FBQyxDQUFDO0FBQ0gsU0FBSyxDQUFDOzs7Ozs2Q0FDRSxNQUFNLENBQUMsSUFBSSxFQUFFOzs7Ozs7O0tBQ3BCLENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQyxtQ0FBbUMsRUFBRTs7Ozs7NkNBQ2hDLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDOzs7OzZDQUNqQyxzQkFBRSxLQUFLLENBQUMsSUFBSSxDQUFDOzs7OzZDQUNiLE1BQU0sQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDOzs7OzZDQUNsQyxzQkFBRSxLQUFLLENBQUMsSUFBSSxDQUFDOzs7OzZDQUNiLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7Ozs7Ozs7S0FDcEUsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLG1DQUFtQyxFQUFFOzs7Ozs2Q0FDaEMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUM7Ozs7NkNBQ2xDLHNCQUFFLEtBQUssQ0FBQyxJQUFJLENBQUM7Ozs7NkNBQ2IsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUM7Ozs7NkNBQ2pDLHNCQUFFLEtBQUssQ0FBQyxJQUFJLENBQUM7Ozs7NkNBQ2IsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQzs7Ozs7OztLQUNuRSxDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsMERBQTBELEVBQUU7Ozs7OzZDQUN2RCxNQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQzs7Ozs2Q0FDakMsc0JBQUUsS0FBSyxDQUFDLElBQUksQ0FBQzs7Ozs2Q0FDYixNQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQzs7Ozs2Q0FDakMsc0JBQUUsS0FBSyxDQUFDLElBQUksQ0FBQzs7Ozs2Q0FDYixNQUFNLENBQUMsY0FBYyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDOzs7Ozs7O0tBQ25FLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvY29tbWFuZHMvb3JpZW50YXRpb24tZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgQiBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgeyBBUElERU1PU19DQVBTIH0gZnJvbSAnLi4vZGVzaXJlZCc7XG5pbXBvcnQgeyBpbml0RHJpdmVyIH0gZnJvbSAnLi4vaGVscGVycy9zZXNzaW9uJztcblxuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5kZXNjcmliZSgnYXBpZGVtbyAtIG9yaWVudGF0aW9uIC0nLCBmdW5jdGlvbiAoKSB7XG4gIGxldCBkcml2ZXI7XG5cbiAgZGVzY3JpYmUoJ2luaXRpYWwgLScsIGZ1bmN0aW9uICgpIHtcbiAgICBhZnRlckVhY2goYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgYXdhaXQgZHJpdmVyLnNldE9yaWVudGF0aW9uKCdQT1JUUkFJVCcpO1xuICAgICAgYXdhaXQgZHJpdmVyLnF1aXQoKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGhhdmUgcG9ydHJhaXQgb3JpZW50YXRpb24gaWYgcmVxdWVzdGVkJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgZHJpdmVyID0gYXdhaXQgaW5pdERyaXZlcihPYmplY3QuYXNzaWduKHt9LCBBUElERU1PU19DQVBTLCB7XG4gICAgICAgIGFwcEFjdGl2aXR5OiAnLnZpZXcuVGV4dEZpZWxkcycsXG4gICAgICAgIG9yaWVudGF0aW9uOiAnUE9SVFJBSVQnLFxuICAgICAgfSkpO1xuICAgICAgYXdhaXQgZHJpdmVyLmdldE9yaWVudGF0aW9uKCkuc2hvdWxkLmV2ZW50dWFsbHkuZXFsKCdQT1JUUkFJVCcpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgaGF2ZSBsYW5kc2NhcGUgb3JpZW50YXRpb24gaWYgcmVxdWVzdGVkJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgZHJpdmVyID0gYXdhaXQgaW5pdERyaXZlcihPYmplY3QuYXNzaWduKHt9LCBBUElERU1PU19DQVBTLCB7XG4gICAgICAgIGFwcEFjdGl2aXR5OiAnLnZpZXcuVGV4dEZpZWxkcycsXG4gICAgICAgIG9yaWVudGF0aW9uOiAnTEFORFNDQVBFJyxcbiAgICAgIH0pKTtcbiAgICAgIGF3YWl0IGRyaXZlci5nZXRPcmllbnRhdGlvbigpLnNob3VsZC5ldmVudHVhbGx5LmVxbCgnTEFORFNDQVBFJyk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBoYXZlIHBvcnRyYWl0IG9yaWVudGF0aW9uIGlmIG5vdGhpbmcgcmVxdWVzdGVkJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgZHJpdmVyID0gYXdhaXQgaW5pdERyaXZlcihPYmplY3QuYXNzaWduKHt9LCBBUElERU1PU19DQVBTLCB7XG4gICAgICAgIGFwcEFjdGl2aXR5OiAnLnZpZXcuVGV4dEZpZWxkcycsXG4gICAgICB9KSk7XG4gICAgICBhd2FpdCBkcml2ZXIuZ2V0T3JpZW50YXRpb24oKS5zaG91bGQuZXZlbnR1YWxseS5lcWwoJ1BPUlRSQUlUJyk7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgnc2V0dGluZyAtJywgZnVuY3Rpb24gKCkge1xuICAgIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBkcml2ZXIgPSBhd2FpdCBpbml0RHJpdmVyKE9iamVjdC5hc3NpZ24oe30sIEFQSURFTU9TX0NBUFMsIHtcbiAgICAgICAgYXBwQWN0aXZpdHk6ICcudmlldy5UZXh0RmllbGRzJ1xuICAgICAgfSkpO1xuICAgIH0pO1xuICAgIGFmdGVyKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGF3YWl0IGRyaXZlci5xdWl0KCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCByb3RhdGUgc2NyZWVuIHRvIGxhbmRzY2FwZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGF3YWl0IGRyaXZlci5zZXRPcmllbnRhdGlvbignUE9SVFJBSVQnKTtcbiAgICAgIGF3YWl0IEIuZGVsYXkoMzAwMCk7XG4gICAgICBhd2FpdCBkcml2ZXIuc2V0T3JpZW50YXRpb24oJ0xBTkRTQ0FQRScpO1xuICAgICAgYXdhaXQgQi5kZWxheSgzMDAwKTtcbiAgICAgIGF3YWl0IGRyaXZlci5nZXRPcmllbnRhdGlvbigpLnNob3VsZC5ldmVudHVhbGx5LmJlY29tZSgnTEFORFNDQVBFJyk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCByb3RhdGUgc2NyZWVuIHRvIGxhbmRzY2FwZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGF3YWl0IGRyaXZlci5zZXRPcmllbnRhdGlvbignTEFORFNDQVBFJyk7XG4gICAgICBhd2FpdCBCLmRlbGF5KDMwMDApO1xuICAgICAgYXdhaXQgZHJpdmVyLnNldE9yaWVudGF0aW9uKCdQT1JUUkFJVCcpO1xuICAgICAgYXdhaXQgQi5kZWxheSgzMDAwKTtcbiAgICAgIGF3YWl0IGRyaXZlci5nZXRPcmllbnRhdGlvbigpLnNob3VsZC5ldmVudHVhbGx5LmJlY29tZSgnUE9SVFJBSVQnKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIG5vdCBlcnJvciB3aGVuIHRyeWluZyB0byByb3RhdGUgdG8gcG9ydHJhaXQgYWdhaW4nLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBhd2FpdCBkcml2ZXIuc2V0T3JpZW50YXRpb24oJ1BPUlRSQUlUJyk7XG4gICAgICBhd2FpdCBCLmRlbGF5KDMwMDApO1xuICAgICAgYXdhaXQgZHJpdmVyLnNldE9yaWVudGF0aW9uKCdQT1JUUkFJVCcpO1xuICAgICAgYXdhaXQgQi5kZWxheSgzMDAwKTtcbiAgICAgIGF3YWl0IGRyaXZlci5nZXRPcmllbnRhdGlvbigpLnNob3VsZC5ldmVudHVhbGx5LmJlY29tZSgnUE9SVFJBSVQnKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4ifQ==
