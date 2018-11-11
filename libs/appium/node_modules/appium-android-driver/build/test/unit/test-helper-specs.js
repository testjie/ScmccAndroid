'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _appiumTestSupport = require('appium-test-support');

var _appiumSupport = require('appium-support');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _functionalHelpers = require('../functional/helpers');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('test helpers', function () {
  describe('getChromedriver220Asset', (0, _appiumTestSupport.withMocks)({ system: _appiumSupport.system }, function (mocks) {
    var basePath = _path2['default'].resolve(__dirname, '..', '..', '..');

    it('should get the correct path for Windows', function callee$2$0() {
      var cdPath;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.system.expects('isWindows').once().returns(true);
            context$3$0.t0 = _path2['default'];
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap((0, _functionalHelpers.getChromedriver220Asset)());

          case 4:
            context$3$0.t1 = context$3$0.sent;
            cdPath = context$3$0.t0.normalize.call(context$3$0.t0, context$3$0.t1);

            cdPath.should.eql(_path2['default'].normalize(basePath + '/test/assets/chromedriver-2.20/windows/chromedriver.exe'));
            mocks.system.verify();

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should get the correct path for Mac', function callee$2$0() {
      var cdPath;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.system.expects('isWindows').once().returns(false);
            mocks.system.expects('isMac').once().returns(true);
            context$3$0.t0 = _path2['default'];
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap((0, _functionalHelpers.getChromedriver220Asset)());

          case 5:
            context$3$0.t1 = context$3$0.sent;
            cdPath = context$3$0.t0.normalize.call(context$3$0.t0, context$3$0.t1);

            cdPath.should.eql(_path2['default'].normalize(basePath + '/test/assets/chromedriver-2.20/mac/chromedriver'));
            mocks.system.verify();

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should get the correct path for Unix 32-bit', function callee$2$0() {
      var cdPath;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.system.expects('isWindows').once().returns(false);
            mocks.system.expects('isMac').once().returns(false);
            mocks.system.expects('arch').once().returns('32');
            context$3$0.t0 = _path2['default'];
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap((0, _functionalHelpers.getChromedriver220Asset)());

          case 6:
            context$3$0.t1 = context$3$0.sent;
            cdPath = context$3$0.t0.normalize.call(context$3$0.t0, context$3$0.t1);

            cdPath.should.eql(_path2['default'].normalize(basePath + '/test/assets/chromedriver-2.20/linux-32/chromedriver'));
            mocks.system.verify();

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should get the correct path for Unix 64-bit', function callee$2$0() {
      var cdPath;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.system.expects('isWindows').once().returns(false);
            mocks.system.expects('isMac').once().returns(false);
            mocks.system.expects('arch').once().returns('64');
            context$3$0.t0 = _path2['default'];
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap((0, _functionalHelpers.getChromedriver220Asset)());

          case 6:
            context$3$0.t1 = context$3$0.sent;
            cdPath = context$3$0.t0.normalize.call(context$3$0.t0, context$3$0.t1);

            cdPath.should.eql(_path2['default'].normalize(basePath + '/test/assets/chromedriver-2.20/linux-64/chromedriver'));
            mocks.system.verify();

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  }));
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC90ZXN0LWhlbHBlci1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O2lDQUNuQixxQkFBcUI7OzZCQUN4QixnQkFBZ0I7O29CQUN0QixNQUFNOzs7O2lDQUNpQix1QkFBdUI7O0FBRy9ELGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsUUFBUSxDQUFDLGNBQWMsRUFBRSxZQUFZO0FBQ25DLFVBQVEsQ0FBQyx5QkFBeUIsRUFBRSxrQ0FBVSxFQUFDLE1BQU0sdUJBQUEsRUFBQyxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQ2pFLFFBQUksUUFBUSxHQUFHLGtCQUFLLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzs7QUFFekQsTUFBRSxDQUFDLHlDQUF5QyxFQUFFO1VBRXhDLE1BQU07Ozs7QUFEVixpQkFBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOzs7NkNBQ3JCLGlEQUF5Qjs7OztBQUF2RCxrQkFBTSxrQkFBUSxTQUFTOztBQUMzQixrQkFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsa0JBQUssU0FBUyxDQUFJLFFBQVEsNkRBQTBELENBQUMsQ0FBQztBQUN4RyxpQkFBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztLQUN2QixDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMscUNBQXFDLEVBQUU7VUFHcEMsTUFBTTs7OztBQUZWLGlCQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDeEQsaUJBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7OzZDQUNqQixpREFBeUI7Ozs7QUFBdkQsa0JBQU0sa0JBQVEsU0FBUzs7QUFDM0Isa0JBQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGtCQUFLLFNBQVMsQ0FBSSxRQUFRLHFEQUFrRCxDQUFDLENBQUM7QUFDaEcsaUJBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7S0FDdkIsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLDZDQUE2QyxFQUFFO1VBSTVDLE1BQU07Ozs7QUFIVixpQkFBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3hELGlCQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEQsaUJBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7OzZDQUNoQixpREFBeUI7Ozs7QUFBdkQsa0JBQU0sa0JBQVEsU0FBUzs7QUFDM0Isa0JBQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGtCQUFLLFNBQVMsQ0FBSSxRQUFRLDBEQUF1RCxDQUFDLENBQUM7QUFDckcsaUJBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7S0FDdkIsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLDZDQUE2QyxFQUFFO1VBSTVDLE1BQU07Ozs7QUFIVixpQkFBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3hELGlCQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEQsaUJBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7OzZDQUNoQixpREFBeUI7Ozs7QUFBdkQsa0JBQU0sa0JBQVEsU0FBUzs7QUFDM0Isa0JBQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGtCQUFLLFNBQVMsQ0FBSSxRQUFRLDBEQUF1RCxDQUFDLENBQUM7QUFDckcsaUJBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7S0FDdkIsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDLENBQUM7Q0FDTCxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC91bml0L3Rlc3QtaGVscGVyLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgeyB3aXRoTW9ja3MgfSBmcm9tICdhcHBpdW0tdGVzdC1zdXBwb3J0JztcbmltcG9ydCB7IHN5c3RlbSB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgZ2V0Q2hyb21lZHJpdmVyMjIwQXNzZXQgfSBmcm9tICcuLi9mdW5jdGlvbmFsL2hlbHBlcnMnO1xuXG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmRlc2NyaWJlKCd0ZXN0IGhlbHBlcnMnLCBmdW5jdGlvbiAoKSB7XG4gIGRlc2NyaWJlKCdnZXRDaHJvbWVkcml2ZXIyMjBBc3NldCcsIHdpdGhNb2Nrcyh7c3lzdGVtfSwgKG1vY2tzKSA9PiB7XG4gICAgbGV0IGJhc2VQYXRoID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uJywgJy4uJywgJy4uJyk7XG5cbiAgICBpdCgnc2hvdWxkIGdldCB0aGUgY29ycmVjdCBwYXRoIGZvciBXaW5kb3dzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbW9ja3Muc3lzdGVtLmV4cGVjdHMoJ2lzV2luZG93cycpLm9uY2UoKS5yZXR1cm5zKHRydWUpO1xuICAgICAgbGV0IGNkUGF0aCA9IHBhdGgubm9ybWFsaXplKGF3YWl0IGdldENocm9tZWRyaXZlcjIyMEFzc2V0KCkpO1xuICAgICAgY2RQYXRoLnNob3VsZC5lcWwocGF0aC5ub3JtYWxpemUoYCR7YmFzZVBhdGh9L3Rlc3QvYXNzZXRzL2Nocm9tZWRyaXZlci0yLjIwL3dpbmRvd3MvY2hyb21lZHJpdmVyLmV4ZWApKTtcbiAgICAgIG1vY2tzLnN5c3RlbS52ZXJpZnkoKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGdldCB0aGUgY29ycmVjdCBwYXRoIGZvciBNYWMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBtb2Nrcy5zeXN0ZW0uZXhwZWN0cygnaXNXaW5kb3dzJykub25jZSgpLnJldHVybnMoZmFsc2UpO1xuICAgICAgbW9ja3Muc3lzdGVtLmV4cGVjdHMoJ2lzTWFjJykub25jZSgpLnJldHVybnModHJ1ZSk7XG4gICAgICBsZXQgY2RQYXRoID0gcGF0aC5ub3JtYWxpemUoYXdhaXQgZ2V0Q2hyb21lZHJpdmVyMjIwQXNzZXQoKSk7XG4gICAgICBjZFBhdGguc2hvdWxkLmVxbChwYXRoLm5vcm1hbGl6ZShgJHtiYXNlUGF0aH0vdGVzdC9hc3NldHMvY2hyb21lZHJpdmVyLTIuMjAvbWFjL2Nocm9tZWRyaXZlcmApKTtcbiAgICAgIG1vY2tzLnN5c3RlbS52ZXJpZnkoKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGdldCB0aGUgY29ycmVjdCBwYXRoIGZvciBVbml4IDMyLWJpdCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIG1vY2tzLnN5c3RlbS5leHBlY3RzKCdpc1dpbmRvd3MnKS5vbmNlKCkucmV0dXJucyhmYWxzZSk7XG4gICAgICBtb2Nrcy5zeXN0ZW0uZXhwZWN0cygnaXNNYWMnKS5vbmNlKCkucmV0dXJucyhmYWxzZSk7XG4gICAgICBtb2Nrcy5zeXN0ZW0uZXhwZWN0cygnYXJjaCcpLm9uY2UoKS5yZXR1cm5zKCczMicpO1xuICAgICAgbGV0IGNkUGF0aCA9IHBhdGgubm9ybWFsaXplKGF3YWl0IGdldENocm9tZWRyaXZlcjIyMEFzc2V0KCkpO1xuICAgICAgY2RQYXRoLnNob3VsZC5lcWwocGF0aC5ub3JtYWxpemUoYCR7YmFzZVBhdGh9L3Rlc3QvYXNzZXRzL2Nocm9tZWRyaXZlci0yLjIwL2xpbnV4LTMyL2Nocm9tZWRyaXZlcmApKTtcbiAgICAgIG1vY2tzLnN5c3RlbS52ZXJpZnkoKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGdldCB0aGUgY29ycmVjdCBwYXRoIGZvciBVbml4IDY0LWJpdCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIG1vY2tzLnN5c3RlbS5leHBlY3RzKCdpc1dpbmRvd3MnKS5vbmNlKCkucmV0dXJucyhmYWxzZSk7XG4gICAgICBtb2Nrcy5zeXN0ZW0uZXhwZWN0cygnaXNNYWMnKS5vbmNlKCkucmV0dXJucyhmYWxzZSk7XG4gICAgICBtb2Nrcy5zeXN0ZW0uZXhwZWN0cygnYXJjaCcpLm9uY2UoKS5yZXR1cm5zKCc2NCcpO1xuICAgICAgbGV0IGNkUGF0aCA9IHBhdGgubm9ybWFsaXplKGF3YWl0IGdldENocm9tZWRyaXZlcjIyMEFzc2V0KCkpO1xuICAgICAgY2RQYXRoLnNob3VsZC5lcWwocGF0aC5ub3JtYWxpemUoYCR7YmFzZVBhdGh9L3Rlc3QvYXNzZXRzL2Nocm9tZWRyaXZlci0yLjIwL2xpbnV4LTY0L2Nocm9tZWRyaXZlcmApKTtcbiAgICAgIG1vY2tzLnN5c3RlbS52ZXJpZnkoKTtcbiAgICB9KTtcbiAgfSkpO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uIn0=
