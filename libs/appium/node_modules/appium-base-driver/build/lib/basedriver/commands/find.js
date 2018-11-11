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
    helpers = {},
    extensions = {};

// Override the following function for your own driver, and the rest is taken
// care of!

//helpers.findElOrEls = async function (strategy, selector, mult, context) {}
// strategy: locator strategy
// selector: the actual selector for finding an element
// mult: multiple elements or just one?
// context: finding an element from the root context? or starting from another element
//
// Returns an object which adheres to the way the JSON Wire Protocol represents elements:
// { ELEMENT: # }    eg: { ELEMENT: 3 }  or { ELEMENT: 1.023 }

helpers.findElOrElsWithProcessing = function callee$0$0(strategy, selector, mult, context) {
  var src;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        this.validateLocatorStrategy(strategy);
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.findElOrEls(strategy, selector, mult, context));

      case 4:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 7:
        context$1$0.prev = 7;
        context$1$0.t0 = context$1$0['catch'](1);

        if (!this.opts.printPageSourceOnFindFailure) {
          context$1$0.next = 16;
          break;
        }

        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(this.getPageSource());

      case 12:
        src = context$1$0.sent;

        _logger2['default'].debug('Error finding element' + (mult ? 's' : '') + ': ' + context$1$0.t0.message);
        _logger2['default'].debug('Page source requested through \'printPageSourceOnFindFailure\':');
        _logger2['default'].debug(src);

      case 16:
        throw context$1$0.t0;

      case 17:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 7]]);
};

commands.findElement = function callee$0$0(strategy, selector) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.findElOrElsWithProcessing(strategy, selector, false));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.findElements = function callee$0$0(strategy, selector) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.findElOrElsWithProcessing(strategy, selector, true));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.findElementFromElement = function callee$0$0(strategy, selector, elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.findElOrElsWithProcessing(strategy, selector, false, elementId));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.findElementsFromElement = function callee$0$0(strategy, selector, elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.findElOrElsWithProcessing(strategy, selector, true, elementId));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

_Object$assign(extensions, commands, helpers);
exports.commands = commands;
exports.helpers = helpers;
exports['default'] = extensions;

// still want the error to occur
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9iYXNlZHJpdmVyL2NvbW1hbmRzL2ZpbmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O3NCQUFnQixXQUFXOzs7O0FBRzNCLElBQU0sUUFBUSxHQUFHLEVBQUU7SUFBRSxPQUFPLEdBQUcsRUFBRTtJQUFFLFVBQVUsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FBY25ELE9BQU8sQ0FBQyx5QkFBeUIsR0FBRyxvQkFBZ0IsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTztNQU16RSxHQUFHOzs7O0FBTGIsWUFBSSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7eUNBRXhCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDOzs7Ozs7Ozs7YUFFNUQsSUFBSSxDQUFDLElBQUksQ0FBQyw0QkFBNEI7Ozs7Ozt5Q0FDdEIsSUFBSSxDQUFDLGFBQWEsRUFBRTs7O0FBQWhDLFdBQUc7O0FBQ1QsNEJBQUksS0FBSyw0QkFBeUIsSUFBSSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUEsVUFBSyxlQUFJLE9BQU8sQ0FBRyxDQUFDO0FBQ3JFLDRCQUFJLEtBQUssbUVBQWlFLENBQUM7QUFDM0UsNEJBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0NBS3BCLENBQUM7O0FBRUYsUUFBUSxDQUFDLFdBQVcsR0FBRyxvQkFBZ0IsUUFBUSxFQUFFLFFBQVE7Ozs7O3lDQUMxQyxJQUFJLENBQUMseUJBQXlCLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUM7Ozs7Ozs7Ozs7Q0FDdkUsQ0FBQzs7QUFFRixRQUFRLENBQUMsWUFBWSxHQUFHLG9CQUFnQixRQUFRLEVBQUUsUUFBUTs7Ozs7eUNBQzNDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQzs7Ozs7Ozs7OztDQUN0RSxDQUFDOztBQUVGLFFBQVEsQ0FBQyxzQkFBc0IsR0FBRyxvQkFBZ0IsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTOzs7Ozt5Q0FDaEUsSUFBSSxDQUFDLHlCQUF5QixDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQzs7Ozs7Ozs7OztDQUNsRixDQUFDOztBQUVGLFFBQVEsQ0FBQyx1QkFBdUIsR0FBRyxvQkFBZ0IsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTOzs7Ozt5Q0FDakUsSUFBSSxDQUFDLHlCQUF5QixDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQzs7Ozs7Ozs7OztDQUNqRixDQUFDOztBQUVGLGVBQWMsVUFBVSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwQyxRQUFRLEdBQVIsUUFBUTtRQUFFLE9BQU8sR0FBUCxPQUFPO3FCQUNYLFVBQVUiLCJmaWxlIjoibGliL2Jhc2Vkcml2ZXIvY29tbWFuZHMvZmluZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBsb2cgZnJvbSAnLi4vbG9nZ2VyJztcblxuXG5jb25zdCBjb21tYW5kcyA9IHt9LCBoZWxwZXJzID0ge30sIGV4dGVuc2lvbnMgPSB7fTtcblxuLy8gT3ZlcnJpZGUgdGhlIGZvbGxvd2luZyBmdW5jdGlvbiBmb3IgeW91ciBvd24gZHJpdmVyLCBhbmQgdGhlIHJlc3QgaXMgdGFrZW5cbi8vIGNhcmUgb2YhXG5cbi8vaGVscGVycy5maW5kRWxPckVscyA9IGFzeW5jIGZ1bmN0aW9uIChzdHJhdGVneSwgc2VsZWN0b3IsIG11bHQsIGNvbnRleHQpIHt9XG4vLyBzdHJhdGVneTogbG9jYXRvciBzdHJhdGVneVxuLy8gc2VsZWN0b3I6IHRoZSBhY3R1YWwgc2VsZWN0b3IgZm9yIGZpbmRpbmcgYW4gZWxlbWVudFxuLy8gbXVsdDogbXVsdGlwbGUgZWxlbWVudHMgb3IganVzdCBvbmU/XG4vLyBjb250ZXh0OiBmaW5kaW5nIGFuIGVsZW1lbnQgZnJvbSB0aGUgcm9vdCBjb250ZXh0PyBvciBzdGFydGluZyBmcm9tIGFub3RoZXIgZWxlbWVudFxuLy9cbi8vIFJldHVybnMgYW4gb2JqZWN0IHdoaWNoIGFkaGVyZXMgdG8gdGhlIHdheSB0aGUgSlNPTiBXaXJlIFByb3RvY29sIHJlcHJlc2VudHMgZWxlbWVudHM6XG4vLyB7IEVMRU1FTlQ6ICMgfSAgICBlZzogeyBFTEVNRU5UOiAzIH0gIG9yIHsgRUxFTUVOVDogMS4wMjMgfVxuXG5oZWxwZXJzLmZpbmRFbE9yRWxzV2l0aFByb2Nlc3NpbmcgPSBhc3luYyBmdW5jdGlvbiAoc3RyYXRlZ3ksIHNlbGVjdG9yLCBtdWx0LCBjb250ZXh0KSB7XG4gIHRoaXMudmFsaWRhdGVMb2NhdG9yU3RyYXRlZ3koc3RyYXRlZ3kpO1xuICB0cnkge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLmZpbmRFbE9yRWxzKHN0cmF0ZWd5LCBzZWxlY3RvciwgbXVsdCwgY29udGV4dCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGlmICh0aGlzLm9wdHMucHJpbnRQYWdlU291cmNlT25GaW5kRmFpbHVyZSkge1xuICAgICAgY29uc3Qgc3JjID0gYXdhaXQgdGhpcy5nZXRQYWdlU291cmNlKCk7XG4gICAgICBsb2cuZGVidWcoYEVycm9yIGZpbmRpbmcgZWxlbWVudCR7bXVsdCA/ICdzJyA6ICcnfTogJHtlcnIubWVzc2FnZX1gKTtcbiAgICAgIGxvZy5kZWJ1ZyhgUGFnZSBzb3VyY2UgcmVxdWVzdGVkIHRocm91Z2ggJ3ByaW50UGFnZVNvdXJjZU9uRmluZEZhaWx1cmUnOmApO1xuICAgICAgbG9nLmRlYnVnKHNyYyk7XG4gICAgfVxuICAgIC8vIHN0aWxsIHdhbnQgdGhlIGVycm9yIHRvIG9jY3VyXG4gICAgdGhyb3cgZXJyO1xuICB9XG59O1xuXG5jb21tYW5kcy5maW5kRWxlbWVudCA9IGFzeW5jIGZ1bmN0aW9uIChzdHJhdGVneSwgc2VsZWN0b3IpIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuZmluZEVsT3JFbHNXaXRoUHJvY2Vzc2luZyhzdHJhdGVneSwgc2VsZWN0b3IsIGZhbHNlKTtcbn07XG5cbmNvbW1hbmRzLmZpbmRFbGVtZW50cyA9IGFzeW5jIGZ1bmN0aW9uIChzdHJhdGVneSwgc2VsZWN0b3IpIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuZmluZEVsT3JFbHNXaXRoUHJvY2Vzc2luZyhzdHJhdGVneSwgc2VsZWN0b3IsIHRydWUpO1xufTtcblxuY29tbWFuZHMuZmluZEVsZW1lbnRGcm9tRWxlbWVudCA9IGFzeW5jIGZ1bmN0aW9uIChzdHJhdGVneSwgc2VsZWN0b3IsIGVsZW1lbnRJZCkge1xuICByZXR1cm4gYXdhaXQgdGhpcy5maW5kRWxPckVsc1dpdGhQcm9jZXNzaW5nKHN0cmF0ZWd5LCBzZWxlY3RvciwgZmFsc2UsIGVsZW1lbnRJZCk7XG59O1xuXG5jb21tYW5kcy5maW5kRWxlbWVudHNGcm9tRWxlbWVudCA9IGFzeW5jIGZ1bmN0aW9uIChzdHJhdGVneSwgc2VsZWN0b3IsIGVsZW1lbnRJZCkge1xuICByZXR1cm4gYXdhaXQgdGhpcy5maW5kRWxPckVsc1dpdGhQcm9jZXNzaW5nKHN0cmF0ZWd5LCBzZWxlY3RvciwgdHJ1ZSwgZWxlbWVudElkKTtcbn07XG5cbk9iamVjdC5hc3NpZ24oZXh0ZW5zaW9ucywgY29tbWFuZHMsIGhlbHBlcnMpO1xuZXhwb3J0IHsgY29tbWFuZHMsIGhlbHBlcnN9O1xuZXhwb3J0IGRlZmF1bHQgZXh0ZW5zaW9ucztcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4ifQ==
