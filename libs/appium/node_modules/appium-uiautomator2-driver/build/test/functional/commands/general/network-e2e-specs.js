'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _desired = require('../../desired');

var _helpersSession = require('../../helpers/session');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('wifi @skip-ci', function () {
  var driver = undefined;
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(_Object$assign({}, _desired.APIDEMOS_CAPS, { appActivity: '.view.TextFields' })));

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
  it.skip('should enable WIFI', function callee$1$0() {
    var WIFI;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          WIFI = 2;
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.setNetworkConnection(WIFI));

        case 3:
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.isWifiOn().should.eventually.equal(true));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});

// TODO: This is returning Permission Denial: not allowed to send broadcast android.intent.action.AIRPLANE_MODE from pid=25928, uid=2000; also isWifiOn is not a method
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9nZW5lcmFsL25ldHdvcmstZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7Ozt1QkFDZixlQUFlOzs4QkFDbEIsdUJBQXVCOztBQUdsRCxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLFFBQVEsQ0FBQyxlQUFlLEVBQUUsWUFBWTtBQUNwQyxNQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsUUFBTSxDQUFDOzs7OzsyQ0FDVSxnQ0FBVyxlQUFjLEVBQUUsMEJBQWlCLEVBQUMsV0FBVyxFQUFFLGtCQUFrQixFQUFDLENBQUMsQ0FBQzs7O0FBQTlGLGdCQUFNOzs7Ozs7O0dBQ1AsQ0FBQyxDQUFDO0FBQ0gsT0FBSyxDQUFDOzs7OzsyQ0FDRSxNQUFNLENBQUMsSUFBSSxFQUFFOzs7Ozs7O0dBQ3BCLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUU7UUFFeEIsSUFBSTs7OztBQUFKLGNBQUksR0FBRyxDQUFDOzsyQ0FDTixNQUFNLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDOzs7OzJDQUNqQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDOzs7Ozs7O0dBQ3RELENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvY29tbWFuZHMvZ2VuZXJhbC9uZXR3b3JrLWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IHsgQVBJREVNT1NfQ0FQUyB9IGZyb20gJy4uLy4uL2Rlc2lyZWQnO1xuaW1wb3J0IHsgaW5pdERyaXZlciB9IGZyb20gJy4uLy4uL2hlbHBlcnMvc2Vzc2lvbic7XG5cblxuY2hhaS5zaG91bGQoKTtcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcblxuZGVzY3JpYmUoJ3dpZmkgQHNraXAtY2knLCBmdW5jdGlvbiAoKSB7XG4gIGxldCBkcml2ZXI7XG4gIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgZHJpdmVyID0gYXdhaXQgaW5pdERyaXZlcihPYmplY3QuYXNzaWduKHt9LCBBUElERU1PU19DQVBTLCB7YXBwQWN0aXZpdHk6ICcudmlldy5UZXh0RmllbGRzJ30pKTtcbiAgfSk7XG4gIGFmdGVyKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIucXVpdCgpO1xuICB9KTtcbiAgaXQuc2tpcCgnc2hvdWxkIGVuYWJsZSBXSUZJJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIC8vIFRPRE86IFRoaXMgaXMgcmV0dXJuaW5nIFBlcm1pc3Npb24gRGVuaWFsOiBub3QgYWxsb3dlZCB0byBzZW5kIGJyb2FkY2FzdCBhbmRyb2lkLmludGVudC5hY3Rpb24uQUlSUExBTkVfTU9ERSBmcm9tIHBpZD0yNTkyOCwgdWlkPTIwMDA7IGFsc28gaXNXaWZpT24gaXMgbm90IGEgbWV0aG9kXG4gICAgbGV0IFdJRkkgPSAyO1xuICAgIGF3YWl0IGRyaXZlci5zZXROZXR3b3JrQ29ubmVjdGlvbihXSUZJKTtcbiAgICBhd2FpdCBkcml2ZXIuaXNXaWZpT24oKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCh0cnVlKTtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vLi4ifQ==
