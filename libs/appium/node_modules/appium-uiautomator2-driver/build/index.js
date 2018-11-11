require('source-map-support').install();

'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _asyncbox = require('asyncbox');

var _libDriver = require('./lib/driver');

var _libDriver2 = _interopRequireDefault(_libDriver);

var _libServer = require('./lib/server');

var _libServer2 = _interopRequireDefault(_libServer);

var DEFAULT_HOST = "localhost";
exports.DEFAULT_HOST = DEFAULT_HOST;
var DEFAULT_PORT = process.env.TESTOBJECT_E2E_TESTS ? 4723 : 4884;

exports.DEFAULT_PORT = DEFAULT_PORT;
function main() {
  var port, host;
  return _regeneratorRuntime.async(function main$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        port = _yargs2['default'].argv.port || DEFAULT_PORT;
        host = _yargs2['default'].argv.host || _yargs2['default'].argv.address || DEFAULT_HOST;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap((0, _libServer2['default'])(port, host));

      case 4:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

if (require.main === module) {
  (0, _asyncbox.asyncify)(main);
}

exports.AndroidUiautomator2Driver = _libDriver2['default'];
exports.startServer = _libServer2['default'];
exports['default'] = _libDriver2['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztxQkFFa0IsT0FBTzs7Ozt3QkFDQSxVQUFVOzt5QkFDRyxjQUFjOzs7O3lCQUM1QixjQUFjOzs7O0FBRy9CLElBQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQzs7QUFDakMsSUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDOzs7QUFFM0UsU0FBZSxJQUFJO01BQ2IsSUFBSSxFQUNKLElBQUk7Ozs7QUFESixZQUFJLEdBQUcsbUJBQU0sSUFBSSxDQUFDLElBQUksSUFBSSxZQUFZO0FBQ3RDLFlBQUksR0FBRyxtQkFBTSxJQUFJLENBQUMsSUFBSSxJQUFJLG1CQUFNLElBQUksQ0FBQyxPQUFPLElBQUksWUFBWTs7eUNBQ25ELDRCQUFZLElBQUksRUFBRSxJQUFJLENBQUM7Ozs7Ozs7Ozs7Q0FDckM7O0FBRUQsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtBQUMzQiwwQkFBUyxJQUFJLENBQUMsQ0FBQztDQUNoQjs7UUFFUSx5QkFBeUI7UUFBRSxXQUFXIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHJhbnNwaWxlOm1haW5cblxuaW1wb3J0IHlhcmdzIGZyb20gJ3lhcmdzJztcbmltcG9ydCB7IGFzeW5jaWZ5IH0gZnJvbSAnYXN5bmNib3gnO1xuaW1wb3J0IEFuZHJvaWRVaWF1dG9tYXRvcjJEcml2ZXIgZnJvbSAnLi9saWIvZHJpdmVyJztcbmltcG9ydCBzdGFydFNlcnZlciBmcm9tICcuL2xpYi9zZXJ2ZXInO1xuXG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0hPU1QgPSBcImxvY2FsaG9zdFwiO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfUE9SVCA9IHByb2Nlc3MuZW52LlRFU1RPQkpFQ1RfRTJFX1RFU1RTID8gNDcyMyA6IDQ4ODQ7XG5cbmFzeW5jIGZ1bmN0aW9uIG1haW4gKCkge1xuICBsZXQgcG9ydCA9IHlhcmdzLmFyZ3YucG9ydCB8fCBERUZBVUxUX1BPUlQ7XG4gIGxldCBob3N0ID0geWFyZ3MuYXJndi5ob3N0IHx8IHlhcmdzLmFyZ3YuYWRkcmVzcyB8fCBERUZBVUxUX0hPU1Q7XG4gIHJldHVybiBhd2FpdCBzdGFydFNlcnZlcihwb3J0LCBob3N0KTtcbn1cblxuaWYgKHJlcXVpcmUubWFpbiA9PT0gbW9kdWxlKSB7XG4gIGFzeW5jaWZ5KG1haW4pO1xufVxuXG5leHBvcnQgeyBBbmRyb2lkVWlhdXRvbWF0b3IyRHJpdmVyLCBzdGFydFNlcnZlciB9O1xuZXhwb3J0IGRlZmF1bHQgQW5kcm9pZFVpYXV0b21hdG9yMkRyaXZlcjtcblxuIl0sInNvdXJjZVJvb3QiOiIuLiJ9
