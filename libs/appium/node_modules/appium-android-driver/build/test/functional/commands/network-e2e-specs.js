// This currently does not work reliably in CI
// Further, our CI does not respect skip or @skip-ci
// investigate and reinstate

'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _2 = require('../../..');

var _3 = _interopRequireDefault(_2);

var _desired = require('../desired');

var _desired2 = _interopRequireDefault(_desired);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var driver = undefined;
var caps = _lodash2['default'].defaults({
  appActivity: '.view.TextFields'
}, _desired2['default']);

describe.skip('network connection', function () {
  this.timeout(120000);
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          driver = new _3['default']();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.createSession(caps));

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
  describe('setNetworkConnection @skip-ci', function () {
    function test(value) {
      it('should be able to set to ' + value, function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.setNetworkConnection(value));

            case 2:
              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(driver.getNetworkConnection().should.eventually.equal(value));

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
    }
    var _arr = [1, 2, 4, 6];
    for (var _i = 0; _i < _arr.length; _i++) {
      var value = _arr[_i];
      test(value);
    }
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9uZXR3b3JrLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O29CQUlpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztzQkFDL0IsUUFBUTs7OztpQkFDSSxVQUFVOzs7O3VCQUNYLFlBQVk7Ozs7QUFHckMsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixJQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsSUFBSSxJQUFJLEdBQUcsb0JBQUUsUUFBUSxDQUFDO0FBQ3BCLGFBQVcsRUFBRSxrQkFBa0I7Q0FDaEMsdUJBQWUsQ0FBQzs7QUFFakIsUUFBUSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxZQUFZO0FBQzlDLE1BQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDckIsUUFBTSxDQUFDOzs7O0FBQ0wsZ0JBQU0sR0FBRyxtQkFBbUIsQ0FBQzs7MkNBQ3ZCLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDOzs7Ozs7O0dBQ2pDLENBQUMsQ0FBQztBQUNILE9BQUssQ0FBQzs7Ozs7MkNBQ0UsTUFBTSxDQUFDLGFBQWEsRUFBRTs7Ozs7OztHQUM3QixDQUFDLENBQUM7QUFDSCxVQUFRLENBQUMsK0JBQStCLEVBQUUsWUFBWTtBQUNwRCxhQUFTLElBQUksQ0FBRSxLQUFLLEVBQUU7QUFDcEIsUUFBRSwrQkFBNkIsS0FBSyxFQUFJOzs7OzsrQ0FDaEMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQzs7OzsrQ0FDbEMsTUFBTSxDQUFDLG9CQUFvQixFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDOzs7Ozs7O09BQ25FLENBQUMsQ0FBQztLQUNKO2VBQ2lCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQTlCLDZDQUFnQztBQUEzQixVQUFJLEtBQUssV0FBQSxDQUFBO0FBQ1osVUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2I7R0FDRixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2NvbW1hbmRzL25ldHdvcmstZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhpcyBjdXJyZW50bHkgZG9lcyBub3Qgd29yayByZWxpYWJseSBpbiBDSVxuLy8gRnVydGhlciwgb3VyIENJIGRvZXMgbm90IHJlc3BlY3Qgc2tpcCBvciBAc2tpcC1jaVxuLy8gaW52ZXN0aWdhdGUgYW5kIHJlaW5zdGF0ZVxuXG5pbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLi8uLic7XG5pbXBvcnQgREVGQVVMVF9DQVBTIGZyb20gJy4uL2Rlc2lyZWQnO1xuXG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmxldCBkcml2ZXI7XG5sZXQgY2FwcyA9IF8uZGVmYXVsdHMoe1xuICBhcHBBY3Rpdml0eTogJy52aWV3LlRleHRGaWVsZHMnXG59LCBERUZBVUxUX0NBUFMpO1xuXG5kZXNjcmliZS5za2lwKCduZXR3b3JrIGNvbm5lY3Rpb24nLCBmdW5jdGlvbiAoKSB7XG4gIHRoaXMudGltZW91dCgxMjAwMDApO1xuICBiZWZvcmUoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oY2Fwcyk7XG4gIH0pO1xuICBhZnRlcihhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdzZXROZXR3b3JrQ29ubmVjdGlvbiBAc2tpcC1jaScsIGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiB0ZXN0ICh2YWx1ZSkge1xuICAgICAgaXQoYHNob3VsZCBiZSBhYmxlIHRvIHNldCB0byAke3ZhbHVlfWAsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYXdhaXQgZHJpdmVyLnNldE5ldHdvcmtDb25uZWN0aW9uKHZhbHVlKTtcbiAgICAgICAgYXdhaXQgZHJpdmVyLmdldE5ldHdvcmtDb25uZWN0aW9uKCkuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwodmFsdWUpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGZvciAobGV0IHZhbHVlIG9mIFsxLCAyLCA0LCA2XSkge1xuICAgICAgdGVzdCh2YWx1ZSk7XG4gICAgfVxuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLiJ9
