'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _xmldom = require('xmldom');

var _xpath = require('xpath');

var _xpath2 = _interopRequireDefault(_xpath);

var _desired = require('../../desired');

var _helpersSession = require('../../helpers/session');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var assertSource = function assertSource(source) {
  var dom, nodes;
  return _regeneratorRuntime.async(function assertSource$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        source.should.exist;
        dom = new _xmldom.DOMParser().parseFromString(source);
        nodes = _xpath2['default'].select('//hierarchy', dom);

        nodes.length.should.equal(1);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this);
};

describe('apidemo - source', function () {
  var driver = undefined;
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(_desired.APIDEMOS_CAPS));

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
  it('should return the page source', function callee$1$0() {
    var source;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.source());

        case 2:
          source = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(assertSource(source));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should get less source when compression is enabled', function callee$1$0() {
    var getSourceWithoutCompression, getSourceWithCompression, sourceWithoutCompression, sourceWithCompression;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      var _this2 = this;

      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          getSourceWithoutCompression = function getSourceWithoutCompression() {
            return _regeneratorRuntime.async(function getSourceWithoutCompression$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(driver.updateSettings({ 'ignoreUnimportantViews': false }));

                case 2:
                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap(driver.source());

                case 4:
                  return context$3$0.abrupt('return', context$3$0.sent);

                case 5:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this2);
          };

          getSourceWithCompression = function getSourceWithCompression() {
            return _regeneratorRuntime.async(function getSourceWithCompression$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(driver.updateSettings({ "ignoreUnimportantViews": true }));

                case 2:
                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap(driver.source());

                case 4:
                  return context$3$0.abrupt('return', context$3$0.sent);

                case 5:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this2);
          };

          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(getSourceWithoutCompression());

        case 4:
          sourceWithoutCompression = context$2$0.sent;
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(getSourceWithCompression());

        case 7:
          sourceWithCompression = context$2$0.sent;

          sourceWithoutCompression.length.should.be.greaterThan(sourceWithCompression.length);
          context$2$0.next = 11;
          return _regeneratorRuntime.awrap(getSourceWithoutCompression().should.eventually.eql(sourceWithoutCompression));

        case 11:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9nZW5lcmFsL3NvdXJjZS1lMmUtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O3NCQUNuQixRQUFROztxQkFDaEIsT0FBTzs7Ozt1QkFDSyxlQUFlOzs4QkFDbEIsdUJBQXVCOztBQUdsRCxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLElBQUksWUFBWSxHQUFHLFNBQWYsWUFBWSxDQUFVLE1BQU07TUFFMUIsR0FBRyxFQUNILEtBQUs7Ozs7QUFGVCxjQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUNoQixXQUFHLEdBQUcsdUJBQWUsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDO0FBQzdDLGFBQUssR0FBRyxtQkFBTSxNQUFNLENBQUMsYUFBYSxFQUFFLEdBQUcsQ0FBQzs7QUFDNUMsYUFBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7O0NBQzlCLENBQUM7O0FBRUYsUUFBUSxDQUFDLGtCQUFrQixFQUFFLFlBQVk7QUFDdkMsTUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLFFBQU0sQ0FBQzs7Ozs7MkNBQ1UsdURBQXlCOzs7QUFBeEMsZ0JBQU07Ozs7Ozs7R0FDUCxDQUFDLENBQUM7QUFDSCxPQUFLLENBQUM7Ozs7OzJDQUNFLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Ozs7Ozs7R0FDcEIsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLCtCQUErQixFQUFFO1FBQzlCLE1BQU07Ozs7OzJDQUFTLE1BQU0sQ0FBQyxNQUFNLEVBQUU7OztBQUE5QixnQkFBTTs7MkNBQ0osWUFBWSxDQUFDLE1BQU0sQ0FBQzs7Ozs7OztHQUMzQixDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsb0RBQW9ELEVBQUU7UUFDbkQsMkJBQTJCLEVBSTNCLHdCQUF3QixFQUl4Qix3QkFBd0IsRUFDeEIscUJBQXFCOzs7Ozs7QUFUckIscUNBQTJCLEdBQUcsU0FBOUIsMkJBQTJCOzs7OzttREFDdkIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFDLHdCQUF3QixFQUFFLEtBQUssRUFBQyxDQUFDOzs7O21EQUNqRCxNQUFNLENBQUMsTUFBTSxFQUFFOzs7Ozs7Ozs7O1dBQzdCOztBQUNHLGtDQUF3QixHQUFHLFNBQTNCLHdCQUF3Qjs7Ozs7bURBQ3BCLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBQyx3QkFBd0IsRUFBRSxJQUFJLEVBQUMsQ0FBQzs7OzttREFDaEQsTUFBTSxDQUFDLE1BQU0sRUFBRTs7Ozs7Ozs7OztXQUM3Qjs7OzJDQUNvQywyQkFBMkIsRUFBRTs7O0FBQTlELGtDQUF3Qjs7MkNBQ00sd0JBQXdCLEVBQUU7OztBQUF4RCwrQkFBcUI7O0FBQ3pCLGtDQUF3QixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7MkNBQzlFLDJCQUEyQixFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUM7Ozs7Ozs7R0FDcEYsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9nZW5lcmFsL3NvdXJjZS1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCB7IERPTVBhcnNlciB9IGZyb20gJ3htbGRvbSc7XG5pbXBvcnQgeHBhdGggZnJvbSAneHBhdGgnO1xuaW1wb3J0IHsgQVBJREVNT1NfQ0FQUyB9IGZyb20gJy4uLy4uL2Rlc2lyZWQnO1xuaW1wb3J0IHsgaW5pdERyaXZlciB9IGZyb20gJy4uLy4uL2hlbHBlcnMvc2Vzc2lvbic7XG5cblxuY2hhaS5zaG91bGQoKTtcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcblxubGV0IGFzc2VydFNvdXJjZSA9IGFzeW5jIChzb3VyY2UpID0+IHtcbiAgc291cmNlLnNob3VsZC5leGlzdDtcbiAgbGV0IGRvbSA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoc291cmNlKTtcbiAgbGV0IG5vZGVzID0geHBhdGguc2VsZWN0KCcvL2hpZXJhcmNoeScsIGRvbSk7XG4gIG5vZGVzLmxlbmd0aC5zaG91bGQuZXF1YWwoMSk7XG59O1xuXG5kZXNjcmliZSgnYXBpZGVtbyAtIHNvdXJjZScsIGZ1bmN0aW9uICgpIHtcbiAgbGV0IGRyaXZlcjtcbiAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBkcml2ZXIgPSBhd2FpdCBpbml0RHJpdmVyKEFQSURFTU9TX0NBUFMpO1xuICB9KTtcbiAgYWZ0ZXIoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5xdWl0KCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHJldHVybiB0aGUgcGFnZSBzb3VyY2UnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHNvdXJjZSA9IGF3YWl0IGRyaXZlci5zb3VyY2UoKTtcbiAgICBhd2FpdCBhc3NlcnRTb3VyY2Uoc291cmNlKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZ2V0IGxlc3Mgc291cmNlIHdoZW4gY29tcHJlc3Npb24gaXMgZW5hYmxlZCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgZ2V0U291cmNlV2l0aG91dENvbXByZXNzaW9uID0gYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgZHJpdmVyLnVwZGF0ZVNldHRpbmdzKHsnaWdub3JlVW5pbXBvcnRhbnRWaWV3cyc6IGZhbHNlfSk7XG4gICAgICByZXR1cm4gYXdhaXQgZHJpdmVyLnNvdXJjZSgpO1xuICAgIH07XG4gICAgbGV0IGdldFNvdXJjZVdpdGhDb21wcmVzc2lvbiA9IGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IGRyaXZlci51cGRhdGVTZXR0aW5ncyh7XCJpZ25vcmVVbmltcG9ydGFudFZpZXdzXCI6IHRydWV9KTtcbiAgICAgIHJldHVybiBhd2FpdCBkcml2ZXIuc291cmNlKCk7XG4gICAgfTtcbiAgICBsZXQgc291cmNlV2l0aG91dENvbXByZXNzaW9uID0gYXdhaXQgZ2V0U291cmNlV2l0aG91dENvbXByZXNzaW9uKCk7XG4gICAgbGV0IHNvdXJjZVdpdGhDb21wcmVzc2lvbiA9IGF3YWl0IGdldFNvdXJjZVdpdGhDb21wcmVzc2lvbigpO1xuICAgIHNvdXJjZVdpdGhvdXRDb21wcmVzc2lvbi5sZW5ndGguc2hvdWxkLmJlLmdyZWF0ZXJUaGFuKHNvdXJjZVdpdGhDb21wcmVzc2lvbi5sZW5ndGgpO1xuICAgIGF3YWl0IGdldFNvdXJjZVdpdGhvdXRDb21wcmVzc2lvbigpLnNob3VsZC5ldmVudHVhbGx5LmVxbChzb3VyY2VXaXRob3V0Q29tcHJlc3Npb24pO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi8uLiJ9
