'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var commands = {},
    extensions = {};

commands.doPerformMultiAction = function callee$0$0(elementId, states) {
  var opts;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        opts = undefined;

        if (!elementId) {
          context$1$0.next = 8;
          break;
        }

        opts = {
          elementId: elementId,
          actions: states
        };

        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/touch/multi/perform', 'POST', opts));

      case 5:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 8:
        opts = {
          actions: states
        };
        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/touch/multi/perform', 'POST', opts));

      case 11:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 12:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.performActions = function callee$0$0(actions) {
  var preprocessedActions;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].debug('Received the following W3C actions: ' + JSON.stringify(actions, null, '  '));
        // This is mandatory, since Selenium API uses MOUSE as the default pointer type
        preprocessedActions = actions.map(function (action) {
          return _Object$assign({}, action, action.type === 'pointer' ? {
            parameters: {
              pointerType: 'touch'
            }
          } : {});
        });

        _logger2['default'].debug('Preprocessed actions: ' + JSON.stringify(preprocessedActions, null, '  '));
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/actions', 'POST', { actions: actions }));

      case 5:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

_Object$assign(extensions, commands);
exports['default'] = extensions;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy90b3VjaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7c0JBQWdCLFdBQVc7Ozs7QUFFM0IsSUFBSSxRQUFRLEdBQUcsRUFBRTtJQUFFLFVBQVUsR0FBRyxFQUFFLENBQUM7O0FBRW5DLFFBQVEsQ0FBQyxvQkFBb0IsR0FBRyxvQkFBZ0IsU0FBUyxFQUFFLE1BQU07TUFDM0QsSUFBSTs7OztBQUFKLFlBQUk7O2FBQ0osU0FBUzs7Ozs7QUFDWCxZQUFJLEdBQUc7QUFDTCxtQkFBUyxFQUFULFNBQVM7QUFDVCxpQkFBTyxFQUFFLE1BQU07U0FDaEIsQ0FBQzs7O3lDQUVXLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDOzs7Ozs7QUFFcEYsWUFBSSxHQUFHO0FBQ0wsaUJBQU8sRUFBRSxNQUFNO1NBQ2hCLENBQUM7O3lDQUNXLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDOzs7Ozs7Ozs7O0NBRXZGLENBQUM7O0FBRUYsUUFBUSxDQUFDLGNBQWMsR0FBRyxvQkFBZ0IsT0FBTztNQUd6QyxtQkFBbUI7Ozs7QUFGekIsNEJBQUksS0FBSywwQ0FBd0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFHLENBQUM7O0FBRWxGLDJCQUFtQixHQUFHLE9BQU8sQ0FDaEMsR0FBRyxDQUFDLFVBQUMsTUFBTTtpQkFBSyxlQUFjLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksS0FBSyxTQUFTLEdBQUc7QUFDckUsc0JBQVUsRUFBRTtBQUNWLHlCQUFXLEVBQUUsT0FBTzthQUNyQjtXQUNGLEdBQUcsRUFBRSxDQUFDO1NBQUEsQ0FBQzs7QUFDViw0QkFBSSxLQUFLLDRCQUEwQixJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBRyxDQUFDOzt5Q0FDekUsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsRUFBQyxPQUFPLEVBQVAsT0FBTyxFQUFDLENBQUM7Ozs7Ozs7Ozs7Q0FDOUUsQ0FBQzs7QUFFRixlQUFjLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztxQkFDckIsVUFBVSIsImZpbGUiOiJsaWIvY29tbWFuZHMvdG91Y2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbG9nIGZyb20gJy4uL2xvZ2dlcic7XG5cbmxldCBjb21tYW5kcyA9IHt9LCBleHRlbnNpb25zID0ge307XG5cbmNvbW1hbmRzLmRvUGVyZm9ybU11bHRpQWN0aW9uID0gYXN5bmMgZnVuY3Rpb24gKGVsZW1lbnRJZCwgc3RhdGVzKSB7XG4gIGxldCBvcHRzO1xuICBpZiAoZWxlbWVudElkKSB7XG4gICAgb3B0cyA9IHtcbiAgICAgIGVsZW1lbnRJZCxcbiAgICAgIGFjdGlvbnM6IHN0YXRlc1xuICAgIH07XG5cbiAgICByZXR1cm4gYXdhaXQgdGhpcy51aWF1dG9tYXRvcjIuandwcm94eS5jb21tYW5kKCcvdG91Y2gvbXVsdGkvcGVyZm9ybScsICdQT1NUJywgb3B0cyk7XG4gIH0gZWxzZSB7XG4gICAgb3B0cyA9IHtcbiAgICAgIGFjdGlvbnM6IHN0YXRlc1xuICAgIH07XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMudWlhdXRvbWF0b3IyLmp3cHJveHkuY29tbWFuZCgnL3RvdWNoL211bHRpL3BlcmZvcm0nLCAnUE9TVCcsIG9wdHMpO1xuICB9XG59O1xuXG5jb21tYW5kcy5wZXJmb3JtQWN0aW9ucyA9IGFzeW5jIGZ1bmN0aW9uIChhY3Rpb25zKSB7XG4gIGxvZy5kZWJ1ZyhgUmVjZWl2ZWQgdGhlIGZvbGxvd2luZyBXM0MgYWN0aW9uczogJHtKU09OLnN0cmluZ2lmeShhY3Rpb25zLCBudWxsLCAnICAnKX1gKTtcbiAgLy8gVGhpcyBpcyBtYW5kYXRvcnksIHNpbmNlIFNlbGVuaXVtIEFQSSB1c2VzIE1PVVNFIGFzIHRoZSBkZWZhdWx0IHBvaW50ZXIgdHlwZVxuICBjb25zdCBwcmVwcm9jZXNzZWRBY3Rpb25zID0gYWN0aW9uc1xuICAgIC5tYXAoKGFjdGlvbikgPT4gT2JqZWN0LmFzc2lnbih7fSwgYWN0aW9uLCBhY3Rpb24udHlwZSA9PT0gJ3BvaW50ZXInID8ge1xuICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICBwb2ludGVyVHlwZTogJ3RvdWNoJ1xuICAgICAgfVxuICAgIH0gOiB7fSkpO1xuICBsb2cuZGVidWcoYFByZXByb2Nlc3NlZCBhY3Rpb25zOiAke0pTT04uc3RyaW5naWZ5KHByZXByb2Nlc3NlZEFjdGlvbnMsIG51bGwsICcgICcpfWApO1xuICByZXR1cm4gYXdhaXQgdGhpcy51aWF1dG9tYXRvcjIuandwcm94eS5jb21tYW5kKCcvYWN0aW9ucycsICdQT1NUJywge2FjdGlvbnN9KTtcbn07XG5cbk9iamVjdC5hc3NpZ24oZXh0ZW5zaW9ucywgY29tbWFuZHMpO1xuZXhwb3J0IGRlZmF1bHQgZXh0ZW5zaW9ucztcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4ifQ==
