'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _2 = require('../../../..');

var _3 = _interopRequireDefault(_2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _desired = require('../../desired');

var _desired2 = _interopRequireDefault(_desired);

var _asyncbox = require('asyncbox');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var driver = undefined;
var caps = _lodash2['default'].defaults({
  appActivity: '.view.TextFields'
}, _desired2['default']);

describe('element', function () {
  var el = undefined;
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          driver = new _3['default']();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.createSession(caps));

        case 3:
          context$2$0.t0 = _lodash2['default'];
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.findElements('class name', 'android.widget.EditText'));

        case 6:
          context$2$0.t1 = context$2$0.sent;
          el = context$2$0.t0.last.call(context$2$0.t0, context$2$0.t1);

          el.should.exist;

        case 9:
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
  afterEach(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.clear(el.ELEMENT));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  describe('setValueImmediate', function () {
    it('should set the text on the element', function callee$2$0() {
      var retries;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        var _this = this;

        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            retries = process.env.TRAVIS ? 10 : 1;
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(retries, 1000, function callee$3$0() {
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    context$4$0.next = 2;
                    return _regeneratorRuntime.awrap(driver.clear(el.ELEMENT));

                  case 2:
                    context$4$0.next = 4;
                    return _regeneratorRuntime.awrap(driver.setValueImmediate('original value', el.ELEMENT));

                  case 4:
                    context$4$0.next = 6;
                    return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('original value'));

                  case 6:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, _this);
            }));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('setValue', function () {
    it('should set the text on the element', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.setValue('original value', el.ELEMENT));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('original value'));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9iYXNpYy9lbGVtZW50LWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O2lCQUNuQixhQUFhOzs7O3NCQUN6QixRQUFROzs7O3VCQUNHLGVBQWU7Ozs7d0JBQ1YsVUFBVTs7QUFHeEMsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixJQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsSUFBSSxJQUFJLEdBQUcsb0JBQUUsUUFBUSxDQUFDO0FBQ3BCLGFBQVcsRUFBRSxrQkFBa0I7Q0FDaEMsdUJBQWUsQ0FBQzs7QUFFakIsUUFBUSxDQUFDLFNBQVMsRUFBRSxZQUFZO0FBQzlCLE1BQUksRUFBRSxZQUFBLENBQUM7QUFDUCxRQUFNLENBQUM7Ozs7QUFDTCxnQkFBTSxHQUFHLG1CQUFtQixDQUFDOzsyQ0FDdkIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7Ozs7OzJDQUNkLE1BQU0sQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLHlCQUF5QixDQUFDOzs7O0FBQTlFLFlBQUUsa0JBQUssSUFBSTs7QUFDWCxZQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzs7Ozs7OztHQUNqQixDQUFDLENBQUM7QUFDSCxPQUFLLENBQUM7Ozs7OzJDQUNFLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7R0FDN0IsQ0FBQyxDQUFDO0FBQ0gsV0FBUyxDQUFDOzs7OzsyQ0FDRixNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7Ozs7Ozs7R0FDL0IsQ0FBQyxDQUFDOztBQUVILFVBQVEsQ0FBQyxtQkFBbUIsRUFBRSxZQUFZO0FBQ3hDLE1BQUUsQ0FBQyxvQ0FBb0MsRUFBRTtVQUNuQyxPQUFPOzs7Ozs7QUFBUCxtQkFBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLEVBQUUsR0FBRyxDQUFDOzs2Q0FDbkMsNkJBQWMsT0FBTyxFQUFFLElBQUksRUFBRTs7Ozs7cURBQzNCLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQzs7OztxREFDeEIsTUFBTSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUM7Ozs7cURBQ3RELE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDOzs7Ozs7O2FBQzNFLENBQUM7Ozs7Ozs7S0FDSCxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7QUFDSCxVQUFRLENBQUMsVUFBVSxFQUFFLFlBQVk7QUFDL0IsTUFBRSxDQUFDLG9DQUFvQyxFQUFFOzs7Ozs2Q0FDakMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDOzs7OzZDQUM3QyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQzs7Ozs7OztLQUMzRSxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2NvbW1hbmRzL2Jhc2ljL2VsZW1lbnQtZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLi8uLi8uLic7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IERFRkFVTFRfQ0FQUyBmcm9tICcuLi8uLi9kZXNpcmVkJztcbmltcG9ydCB7IHJldHJ5SW50ZXJ2YWwgfSBmcm9tICdhc3luY2JveCc7XG5cblxuY2hhaS5zaG91bGQoKTtcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcblxubGV0IGRyaXZlcjtcbmxldCBjYXBzID0gXy5kZWZhdWx0cyh7XG4gIGFwcEFjdGl2aXR5OiAnLnZpZXcuVGV4dEZpZWxkcydcbn0sIERFRkFVTFRfQ0FQUyk7XG5cbmRlc2NyaWJlKCdlbGVtZW50JywgZnVuY3Rpb24gKCkge1xuICBsZXQgZWw7XG4gIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihjYXBzKTtcbiAgICBlbCA9IF8ubGFzdChhd2FpdCBkcml2ZXIuZmluZEVsZW1lbnRzKCdjbGFzcyBuYW1lJywgJ2FuZHJvaWQud2lkZ2V0LkVkaXRUZXh0JykpO1xuICAgIGVsLnNob3VsZC5leGlzdDtcbiAgfSk7XG4gIGFmdGVyKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIuZGVsZXRlU2Vzc2lvbigpO1xuICB9KTtcbiAgYWZ0ZXJFYWNoKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIuY2xlYXIoZWwuRUxFTUVOVCk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdzZXRWYWx1ZUltbWVkaWF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIHNldCB0aGUgdGV4dCBvbiB0aGUgZWxlbWVudCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCByZXRyaWVzID0gcHJvY2Vzcy5lbnYuVFJBVklTID8gMTAgOiAxO1xuICAgICAgYXdhaXQgcmV0cnlJbnRlcnZhbChyZXRyaWVzLCAxMDAwLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IGRyaXZlci5jbGVhcihlbC5FTEVNRU5UKTtcbiAgICAgICAgYXdhaXQgZHJpdmVyLnNldFZhbHVlSW1tZWRpYXRlKCdvcmlnaW5hbCB2YWx1ZScsIGVsLkVMRU1FTlQpO1xuICAgICAgICBhd2FpdCBkcml2ZXIuZ2V0VGV4dChlbC5FTEVNRU5UKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCgnb3JpZ2luYWwgdmFsdWUnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbiAgZGVzY3JpYmUoJ3NldFZhbHVlJywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdzaG91bGQgc2V0IHRoZSB0ZXh0IG9uIHRoZSBlbGVtZW50JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgYXdhaXQgZHJpdmVyLnNldFZhbHVlKCdvcmlnaW5hbCB2YWx1ZScsIGVsLkVMRU1FTlQpO1xuICAgICAgYXdhaXQgZHJpdmVyLmdldFRleHQoZWwuRUxFTUVOVCkuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwoJ29yaWdpbmFsIHZhbHVlJyk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uIn0=
