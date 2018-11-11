'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../../../..');

var _2 = _interopRequireDefault(_);

var _xmldom = require('xmldom');

var _xpath = require('xpath');

var _xpath2 = _interopRequireDefault(_xpath);

var _desired = require('../../desired');

var _desired2 = _interopRequireDefault(_desired);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var assertSource = function assertSource(source) {
  var dom, nodes;
  return _regeneratorRuntime.async(function assertSource$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        source.should.exist;
        dom = new _xmldom.DOMParser().parseFromString(source);
        nodes = _xpath2['default'].select('//android.widget.TextView[@content-desc="App"]', dom);

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
  it('should return the page source', function callee$1$0() {
    var source;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.getPageSource());

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
                  return _regeneratorRuntime.awrap(driver.updateSettings({ ignoreUnimportantViews: false }));

                case 2:
                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap(driver.getPageSource());

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
                  return _regeneratorRuntime.awrap(driver.updateSettings({ ignoreUnimportantViews: true }));

                case 2:
                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap(driver.getPageSource());

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

        case 9:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9iYXNpYy9zb3VyY2UtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztnQkFDbkIsYUFBYTs7OztzQkFDYixRQUFROztxQkFDaEIsT0FBTzs7Ozt1QkFDQSxlQUFlOzs7O0FBR3hDLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsSUFBSSxZQUFZLEdBQUcsU0FBZixZQUFZLENBQVUsTUFBTTtNQUUxQixHQUFHLEVBQ0gsS0FBSzs7OztBQUZULGNBQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ2hCLFdBQUcsR0FBRyx1QkFBZSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUM7QUFDN0MsYUFBSyxHQUFHLG1CQUFNLE1BQU0sQ0FBQyxnREFBZ0QsRUFBRSxHQUFHLENBQUM7O0FBQy9FLGFBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7OztDQUM5QixDQUFDOztBQUVGLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxZQUFZO0FBQ3ZDLE1BQUksTUFBTSxZQUFBLENBQUM7QUFDWCxRQUFNLENBQUM7Ozs7QUFDTCxnQkFBTSxHQUFHLG1CQUFtQixDQUFDOzsyQ0FDdkIsTUFBTSxDQUFDLGFBQWEsc0JBQWM7Ozs7Ozs7R0FDekMsQ0FBQyxDQUFDO0FBQ0gsT0FBSyxDQUFDOzs7OzsyQ0FDRSxNQUFNLENBQUMsYUFBYSxFQUFFOzs7Ozs7O0dBQzdCLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQywrQkFBK0IsRUFBRTtRQUM5QixNQUFNOzs7OzsyQ0FBUyxNQUFNLENBQUMsYUFBYSxFQUFFOzs7QUFBckMsZ0JBQU07OzJDQUNKLFlBQVksQ0FBQyxNQUFNLENBQUM7Ozs7Ozs7R0FDM0IsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLG9EQUFvRCxFQUFFO1FBQ25ELDJCQUEyQixFQUkzQix3QkFBd0IsRUFJeEIsd0JBQXdCLEVBQ3hCLHFCQUFxQjs7Ozs7O0FBVHJCLHFDQUEyQixHQUFHLFNBQTlCLDJCQUEyQjs7Ozs7bURBQ3ZCLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBQyxzQkFBc0IsRUFBRSxLQUFLLEVBQUMsQ0FBQzs7OzttREFDL0MsTUFBTSxDQUFDLGFBQWEsRUFBRTs7Ozs7Ozs7OztXQUNwQzs7QUFDRyxrQ0FBd0IsR0FBRyxTQUEzQix3QkFBd0I7Ozs7O21EQUNwQixNQUFNLENBQUMsY0FBYyxDQUFDLEVBQUMsc0JBQXNCLEVBQUUsSUFBSSxFQUFDLENBQUM7Ozs7bURBQzlDLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7Ozs7V0FDcEM7OzsyQ0FDb0MsMkJBQTJCLEVBQUU7OztBQUE5RCxrQ0FBd0I7OzJDQUNNLHdCQUF3QixFQUFFOzs7QUFBeEQsK0JBQXFCOztBQUN6QixrQ0FBd0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7Ozs7R0FDckYsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9iYXNpYy9zb3VyY2UtZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLi8uLi8uLic7XG5pbXBvcnQgeyBET01QYXJzZXIgfSBmcm9tICd4bWxkb20nO1xuaW1wb3J0IHhwYXRoIGZyb20gJ3hwYXRoJztcbmltcG9ydCBERUZBVUxUX0NBUFMgZnJvbSAnLi4vLi4vZGVzaXJlZCc7XG5cblxuY2hhaS5zaG91bGQoKTtcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcblxubGV0IGFzc2VydFNvdXJjZSA9IGFzeW5jIChzb3VyY2UpID0+IHtcbiAgc291cmNlLnNob3VsZC5leGlzdDtcbiAgbGV0IGRvbSA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoc291cmNlKTtcbiAgbGV0IG5vZGVzID0geHBhdGguc2VsZWN0KCcvL2FuZHJvaWQud2lkZ2V0LlRleHRWaWV3W0Bjb250ZW50LWRlc2M9XCJBcHBcIl0nLCBkb20pO1xuICBub2Rlcy5sZW5ndGguc2hvdWxkLmVxdWFsKDEpO1xufTtcblxuZGVzY3JpYmUoJ2FwaWRlbW8gLSBzb3VyY2UnLCBmdW5jdGlvbiAoKSB7XG4gIGxldCBkcml2ZXI7XG4gIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihERUZBVUxUX0NBUFMpO1xuICB9KTtcbiAgYWZ0ZXIoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHJldHVybiB0aGUgcGFnZSBzb3VyY2UnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHNvdXJjZSA9IGF3YWl0IGRyaXZlci5nZXRQYWdlU291cmNlKCk7XG4gICAgYXdhaXQgYXNzZXJ0U291cmNlKHNvdXJjZSk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGdldCBsZXNzIHNvdXJjZSB3aGVuIGNvbXByZXNzaW9uIGlzIGVuYWJsZWQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGdldFNvdXJjZVdpdGhvdXRDb21wcmVzc2lvbiA9IGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IGRyaXZlci51cGRhdGVTZXR0aW5ncyh7aWdub3JlVW5pbXBvcnRhbnRWaWV3czogZmFsc2V9KTtcbiAgICAgIHJldHVybiBhd2FpdCBkcml2ZXIuZ2V0UGFnZVNvdXJjZSgpO1xuICAgIH07XG4gICAgbGV0IGdldFNvdXJjZVdpdGhDb21wcmVzc2lvbiA9IGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IGRyaXZlci51cGRhdGVTZXR0aW5ncyh7aWdub3JlVW5pbXBvcnRhbnRWaWV3czogdHJ1ZX0pO1xuICAgICAgcmV0dXJuIGF3YWl0IGRyaXZlci5nZXRQYWdlU291cmNlKCk7XG4gICAgfTtcbiAgICBsZXQgc291cmNlV2l0aG91dENvbXByZXNzaW9uID0gYXdhaXQgZ2V0U291cmNlV2l0aG91dENvbXByZXNzaW9uKCk7XG4gICAgbGV0IHNvdXJjZVdpdGhDb21wcmVzc2lvbiA9IGF3YWl0IGdldFNvdXJjZVdpdGhDb21wcmVzc2lvbigpO1xuICAgIHNvdXJjZVdpdGhvdXRDb21wcmVzc2lvbi5sZW5ndGguc2hvdWxkLmJlLmdyZWF0ZXJUaGFuKHNvdXJjZVdpdGhDb21wcmVzc2lvbi5sZW5ndGgpO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi8uLiJ9
