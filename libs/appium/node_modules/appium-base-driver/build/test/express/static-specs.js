require('source-map-support').install();

'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _libExpressStatic = require('../../lib/express/static');

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('welcome', function () {
  it('should fill the template', function callee$1$0() {
    var res;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          res = {
            send: _sinon2['default'].spy()
          };
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap((0, _libExpressStatic.welcome)({}, res));

        case 3:

          res.send.calledOnce.should.be['true'];
          res.send.args[0][0].should.include('Let\'s browse!');

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZXhwcmVzcy9zdGF0aWMtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Z0NBRXdCLDBCQUEwQjs7b0JBQ2pDLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O3FCQUMzQixPQUFPOzs7O0FBR3pCLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsUUFBUSxDQUFDLFNBQVMsRUFBRSxZQUFZO0FBQzlCLElBQUUsQ0FBQywwQkFBMEIsRUFBRTtRQUN6QixHQUFHOzs7O0FBQUgsYUFBRyxHQUFHO0FBQ1IsZ0JBQUksRUFBRSxtQkFBTSxHQUFHLEVBQUU7V0FDbEI7OzJDQUNLLCtCQUFRLEVBQUUsRUFBRSxHQUFHLENBQUM7Ozs7QUFFdEIsYUFBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBSyxDQUFDO0FBQ25DLGFBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7Ozs7OztHQUN0RCxDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9leHByZXNzL3N0YXRpYy1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRyYW5zcGlsZTptb2NoYVxuXG5pbXBvcnQgeyB3ZWxjb21lIH0gZnJvbSAnLi4vLi4vbGliL2V4cHJlc3Mvc3RhdGljJztcbmltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IHNpbm9uIGZyb20gJ3Npbm9uJztcblxuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5kZXNjcmliZSgnd2VsY29tZScsIGZ1bmN0aW9uICgpIHtcbiAgaXQoJ3Nob3VsZCBmaWxsIHRoZSB0ZW1wbGF0ZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgcmVzID0ge1xuICAgICAgc2VuZDogc2lub24uc3B5KClcbiAgICB9O1xuICAgIGF3YWl0IHdlbGNvbWUoe30sIHJlcyk7XG5cbiAgICByZXMuc2VuZC5jYWxsZWRPbmNlLnNob3VsZC5iZS50cnVlO1xuICAgIHJlcy5zZW5kLmFyZ3NbMF1bMF0uc2hvdWxkLmluY2x1ZGUoJ0xldFxcJ3MgYnJvd3NlIScpO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLiJ9
