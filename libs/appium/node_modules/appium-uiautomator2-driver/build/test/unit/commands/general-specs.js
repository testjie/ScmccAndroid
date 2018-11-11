'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _ = require('../../..');

var _2 = _interopRequireDefault(_);

var driver = undefined;
var sandbox = _sinon2['default'].createSandbox();
_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('General', function () {
  describe('getWindowRect', function () {
    beforeEach(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _2['default']();

          case 1:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    afterEach(function () {
      sandbox.restore();
    });

    it('should get window size', function callee$2$0() {
      var result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getWindowSize').withArgs().returns({ width: 300, height: 400 });
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getWindowRect());

          case 3:
            result = context$3$0.sent;

            result.width.should.be.equal(300);
            result.height.should.be.equal(400);
            result.x.should.be.equal(0);
            result.y.should.be.equal(0);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9jb21tYW5kcy9nZW5lcmFsLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7cUJBQzNCLE9BQU87Ozs7Z0JBQ2EsVUFBVTs7OztBQUVoRCxJQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsSUFBSSxPQUFPLEdBQUcsbUJBQU0sYUFBYSxFQUFFLENBQUM7QUFDcEMsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixRQUFRLENBQUMsU0FBUyxFQUFFLFlBQVk7QUFDOUIsVUFBUSxDQUFDLGVBQWUsRUFBRSxZQUFZO0FBQ3BDLGNBQVUsQ0FBQzs7OztBQUNULGtCQUFNLEdBQUcsbUJBQStCLENBQUM7Ozs7Ozs7S0FDMUMsQ0FBQyxDQUFDO0FBQ0gsYUFBUyxDQUFDLFlBQVk7QUFDcEIsYUFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQ25CLENBQUMsQ0FBQzs7QUFFSCxNQUFFLENBQUMsd0JBQXdCLEVBQUU7VUFHckIsTUFBTTs7OztBQUZaLG1CQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxlQUFlLENBQUMsQ0FDaEMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFDLENBQUMsQ0FBQzs7NkNBQzlCLE1BQU0sQ0FBQyxhQUFhLEVBQUU7OztBQUFyQyxrQkFBTTs7QUFDWixrQkFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNsQyxrQkFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNuQyxrQkFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM1QixrQkFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7OztLQUM3QixDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC91bml0L2NvbW1hbmRzL2dlbmVyYWwtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCBzaW5vbiBmcm9tICdzaW5vbic7XG5pbXBvcnQgQW5kcm9pZFVpYXV0b21hdG9yMkRyaXZlciBmcm9tICcuLi8uLi8uLic7XG5cbmxldCBkcml2ZXI7XG5sZXQgc2FuZGJveCA9IHNpbm9uLmNyZWF0ZVNhbmRib3goKTtcbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmRlc2NyaWJlKCdHZW5lcmFsJywgZnVuY3Rpb24gKCkge1xuICBkZXNjcmliZSgnZ2V0V2luZG93UmVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICBiZWZvcmVFYWNoKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkVWlhdXRvbWF0b3IyRHJpdmVyKCk7XG4gICAgfSk7XG4gICAgYWZ0ZXJFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHNhbmRib3gucmVzdG9yZSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBnZXQgd2luZG93IHNpemUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnZ2V0V2luZG93U2l6ZScpXG4gICAgICAgICAgLndpdGhBcmdzKCkucmV0dXJucyh7d2lkdGg6IDMwMCwgaGVpZ2h0OiA0MDB9KTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRyaXZlci5nZXRXaW5kb3dSZWN0KCk7XG4gICAgICByZXN1bHQud2lkdGguc2hvdWxkLmJlLmVxdWFsKDMwMCk7XG4gICAgICByZXN1bHQuaGVpZ2h0LnNob3VsZC5iZS5lcXVhbCg0MDApO1xuICAgICAgcmVzdWx0Lnguc2hvdWxkLmJlLmVxdWFsKDApO1xuICAgICAgcmVzdWx0Lnkuc2hvdWxkLmJlLmVxdWFsKDApO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLiJ9
