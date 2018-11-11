'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var commands = {},
    helpers = {},
    extensions = {};

commands.pressKeyCode = function callee$0$0(keycode) {
  var metastate = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
  var flags = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/appium/device/press_keycode', 'POST', {
          keycode: keycode,
          metastate: metastate,
          flags: flags
        }));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.longPressKeyCode = function callee$0$0(keycode) {
  var metastate = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
  var flags = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/appium/device/long_press_keycode', 'POST', {
          keycode: keycode,
          metastate: metastate,
          flags: flags
        }));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.doSwipe = function callee$0$0(swipeOpts) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/touch/perform', 'POST', swipeOpts));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.doDrag = function callee$0$0(dragOpts) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/touch/drag', 'POST', dragOpts));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getOrientation = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/orientation', 'GET', {}));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.setOrientation = function callee$0$0(orientation) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        orientation = orientation.toUpperCase();
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/orientation', 'POST', { orientation: orientation }));

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

_Object$assign(extensions, commands, helpers);
exports.commands = commands;
exports.helpers = helpers;
exports['default'] = extensions;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9hY3Rpb25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSxJQUFJLFFBQVEsR0FBRyxFQUFFO0lBQUUsT0FBTyxHQUFHLEVBQUU7SUFBRSxVQUFVLEdBQUcsRUFBRSxDQUFDOztBQUVqRCxRQUFRLENBQUMsWUFBWSxHQUFHLG9CQUFnQixPQUFPO01BQUUsU0FBUyx5REFBRyxJQUFJO01BQUUsS0FBSyx5REFBRyxJQUFJOzs7Ozt5Q0FDaEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLDhCQUE4QixFQUFFLE1BQU0sRUFBRTtBQUNyRixpQkFBTyxFQUFQLE9BQU87QUFDUCxtQkFBUyxFQUFULFNBQVM7QUFDVCxlQUFLLEVBQUwsS0FBSztTQUNOLENBQUM7Ozs7Ozs7Ozs7Q0FDSCxDQUFDOztBQUVGLFFBQVEsQ0FBQyxnQkFBZ0IsR0FBRyxvQkFBZ0IsT0FBTztNQUFFLFNBQVMseURBQUcsSUFBSTtNQUFFLEtBQUsseURBQUcsSUFBSTs7Ozs7eUNBQ3BFLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxtQ0FBbUMsRUFBRSxNQUFNLEVBQUU7QUFDMUYsaUJBQU8sRUFBUCxPQUFPO0FBQ1AsbUJBQVMsRUFBVCxTQUFTO0FBQ1QsZUFBSyxFQUFMLEtBQUs7U0FDTixDQUFDOzs7Ozs7Ozs7O0NBQ0gsQ0FBQzs7QUFFRixRQUFRLENBQUMsT0FBTyxHQUFHLG9CQUFnQixTQUFTOzs7Ozt5Q0FDN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxtQkFBbUIsTUFBTSxFQUFFLFNBQVMsQ0FBQzs7Ozs7Ozs7OztDQUNwRixDQUFDOztBQUVGLFFBQVEsQ0FBQyxNQUFNLEdBQUcsb0JBQWdCLFFBQVE7Ozs7O3lDQUMzQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLGdCQUFnQixNQUFNLEVBQUUsUUFBUSxDQUFDOzs7Ozs7Ozs7O0NBQ2hGLENBQUM7O0FBRUYsUUFBUSxDQUFDLGNBQWMsR0FBRzs7Ozs7eUNBQ1gsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxpQkFBaUIsS0FBSyxFQUFFLEVBQUUsQ0FBQzs7Ozs7Ozs7OztDQUMxRSxDQUFDOztBQUVGLFFBQVEsQ0FBQyxjQUFjLEdBQUcsb0JBQWdCLFdBQVc7Ozs7QUFDbkQsbUJBQVcsR0FBRyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7O3lDQUMzQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLGlCQUFpQixNQUFNLEVBQUUsRUFBQyxXQUFXLEVBQVgsV0FBVyxFQUFDLENBQUM7Ozs7Ozs7Ozs7Q0FDdEYsQ0FBQzs7QUFFRixlQUFjLFVBQVUsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEMsUUFBUSxHQUFSLFFBQVE7UUFBRSxPQUFPLEdBQVAsT0FBTztxQkFDWCxVQUFVIiwiZmlsZSI6ImxpYi9jb21tYW5kcy9hY3Rpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmxldCBjb21tYW5kcyA9IHt9LCBoZWxwZXJzID0ge30sIGV4dGVuc2lvbnMgPSB7fTtcblxuY29tbWFuZHMucHJlc3NLZXlDb2RlID0gYXN5bmMgZnVuY3Rpb24gKGtleWNvZGUsIG1ldGFzdGF0ZSA9IG51bGwsIGZsYWdzID0gbnVsbCkge1xuICByZXR1cm4gYXdhaXQgdGhpcy51aWF1dG9tYXRvcjIuandwcm94eS5jb21tYW5kKCcvYXBwaXVtL2RldmljZS9wcmVzc19rZXljb2RlJywgJ1BPU1QnLCB7XG4gICAga2V5Y29kZSxcbiAgICBtZXRhc3RhdGUsXG4gICAgZmxhZ3MsXG4gIH0pO1xufTtcblxuY29tbWFuZHMubG9uZ1ByZXNzS2V5Q29kZSA9IGFzeW5jIGZ1bmN0aW9uIChrZXljb2RlLCBtZXRhc3RhdGUgPSBudWxsLCBmbGFncyA9IG51bGwpIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMudWlhdXRvbWF0b3IyLmp3cHJveHkuY29tbWFuZCgnL2FwcGl1bS9kZXZpY2UvbG9uZ19wcmVzc19rZXljb2RlJywgJ1BPU1QnLCB7XG4gICAga2V5Y29kZSxcbiAgICBtZXRhc3RhdGUsXG4gICAgZmxhZ3NcbiAgfSk7XG59O1xuXG5jb21tYW5kcy5kb1N3aXBlID0gYXN5bmMgZnVuY3Rpb24gKHN3aXBlT3B0cykge1xuICByZXR1cm4gYXdhaXQgdGhpcy51aWF1dG9tYXRvcjIuandwcm94eS5jb21tYW5kKGAvdG91Y2gvcGVyZm9ybWAsICdQT1NUJywgc3dpcGVPcHRzKTtcbn07XG5cbmNvbW1hbmRzLmRvRHJhZyA9IGFzeW5jIGZ1bmN0aW9uIChkcmFnT3B0cykge1xuICByZXR1cm4gYXdhaXQgdGhpcy51aWF1dG9tYXRvcjIuandwcm94eS5jb21tYW5kKGAvdG91Y2gvZHJhZ2AsICdQT1NUJywgZHJhZ09wdHMpO1xufTtcblxuY29tbWFuZHMuZ2V0T3JpZW50YXRpb24gPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLnVpYXV0b21hdG9yMi5qd3Byb3h5LmNvbW1hbmQoYC9vcmllbnRhdGlvbmAsICdHRVQnLCB7fSk7XG59O1xuXG5jb21tYW5kcy5zZXRPcmllbnRhdGlvbiA9IGFzeW5jIGZ1bmN0aW9uIChvcmllbnRhdGlvbikge1xuICBvcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uLnRvVXBwZXJDYXNlKCk7XG4gIHJldHVybiBhd2FpdCB0aGlzLnVpYXV0b21hdG9yMi5qd3Byb3h5LmNvbW1hbmQoYC9vcmllbnRhdGlvbmAsICdQT1NUJywge29yaWVudGF0aW9ufSk7XG59O1xuXG5PYmplY3QuYXNzaWduKGV4dGVuc2lvbnMsIGNvbW1hbmRzLCBoZWxwZXJzKTtcbmV4cG9ydCB7IGNvbW1hbmRzLCBoZWxwZXJzIH07XG5leHBvcnQgZGVmYXVsdCBleHRlbnNpb25zO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLiJ9
