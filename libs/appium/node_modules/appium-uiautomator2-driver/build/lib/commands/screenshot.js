'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
var commands = {};

commands.getScreenshot = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/screenshot', 'GET'));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

exports['default'] = commands;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9zY3JlZW5zaG90LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7O0FBRWxCLFFBQVEsQ0FBQyxhQUFhLEdBQUc7Ozs7O3lDQUNWLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDOzs7Ozs7Ozs7O0NBQ3JFLENBQUM7O3FCQUVhLFFBQVEiLCJmaWxlIjoibGliL2NvbW1hbmRzL3NjcmVlbnNob3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgY29tbWFuZHMgPSB7fTtcblxuY29tbWFuZHMuZ2V0U2NyZWVuc2hvdCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMudWlhdXRvbWF0b3IyLmp3cHJveHkuY29tbWFuZCgnL3NjcmVlbnNob3QnLCAnR0VUJyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb21tYW5kcztcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4ifQ==
