'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var commands = {};

commands.lock = function callee$0$0(seconds) {
  var floatSeconds;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.proxyCommand('/wda/lock', 'POST'));

      case 2:
        if (!isNaN(seconds)) {
          context$1$0.next = 4;
          break;
        }

        return context$1$0.abrupt('return');

      case 4:
        floatSeconds = parseFloat(seconds);

        if (!(floatSeconds <= 0)) {
          context$1$0.next = 7;
          break;
        }

        return context$1$0.abrupt('return');

      case 7:
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(_bluebird2['default'].delay(floatSeconds * 1000));

      case 9:
        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(this.proxyCommand('/wda/unlock', 'POST'));

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.unlock = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.proxyCommand('/wda/unlock', 'POST'));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.isLocked = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.proxyCommand('/wda/locked', 'GET'));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

exports.commands = commands;
exports['default'] = commands;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9sb2NrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7d0JBQWMsVUFBVTs7OztBQUV4QixJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7O0FBRWxCLFFBQVEsQ0FBQyxJQUFJLEdBQUcsb0JBQWdCLE9BQU87TUFNL0IsWUFBWTs7Ozs7eUNBTFosSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDOzs7YUFDeEMsS0FBSyxDQUFDLE9BQU8sQ0FBQzs7Ozs7Ozs7QUFJWixvQkFBWSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUM7O2NBQ3BDLFlBQVksSUFBSSxDQUFDLENBQUE7Ozs7Ozs7Ozt5Q0FJZixzQkFBRSxLQUFLLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQzs7Ozt5Q0FDNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDOzs7Ozs7O0NBQy9DLENBQUM7O0FBRUYsUUFBUSxDQUFDLE1BQU0sR0FBRzs7Ozs7eUNBQ1YsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDOzs7Ozs7O0NBQy9DLENBQUM7O0FBRUYsUUFBUSxDQUFDLFFBQVEsR0FBRzs7Ozs7eUNBQ0wsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDOzs7Ozs7Ozs7O0NBQ3JELENBQUM7O1FBRU8sUUFBUSxHQUFSLFFBQVE7cUJBQ0YsUUFBUSIsImZpbGUiOiJsaWIvY29tbWFuZHMvbG9jay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCIGZyb20gJ2JsdWViaXJkJztcblxubGV0IGNvbW1hbmRzID0ge307XG5cbmNvbW1hbmRzLmxvY2sgPSBhc3luYyBmdW5jdGlvbiAoc2Vjb25kcykge1xuICBhd2FpdCB0aGlzLnByb3h5Q29tbWFuZCgnL3dkYS9sb2NrJywgJ1BPU1QnKTtcbiAgaWYgKGlzTmFOKHNlY29uZHMpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgZmxvYXRTZWNvbmRzID0gcGFyc2VGbG9hdChzZWNvbmRzKTtcbiAgaWYgKGZsb2F0U2Vjb25kcyA8PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgYXdhaXQgQi5kZWxheShmbG9hdFNlY29uZHMgKiAxMDAwKTtcbiAgYXdhaXQgdGhpcy5wcm94eUNvbW1hbmQoJy93ZGEvdW5sb2NrJywgJ1BPU1QnKTtcbn07XG5cbmNvbW1hbmRzLnVubG9jayA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgYXdhaXQgdGhpcy5wcm94eUNvbW1hbmQoJy93ZGEvdW5sb2NrJywgJ1BPU1QnKTtcbn07XG5cbmNvbW1hbmRzLmlzTG9ja2VkID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gYXdhaXQgdGhpcy5wcm94eUNvbW1hbmQoJy93ZGEvbG9ja2VkJywgJ0dFVCcpO1xufTtcblxuZXhwb3J0IHsgY29tbWFuZHMgfTtcbmV4cG9ydCBkZWZhdWx0IGNvbW1hbmRzO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLiJ9
