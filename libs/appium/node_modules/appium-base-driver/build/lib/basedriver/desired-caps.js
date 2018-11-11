'use strict';

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _validateJs = require('validate.js');

var _validateJs2 = _interopRequireDefault(_validateJs);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _automationNames = require('./automation-names');

var desiredCapabilityConstraints = {
  platformName: {
    presence: true,
    isString: true,
    inclusionCaseInsensitive: ['iOS', 'Android', 'FirefoxOS', 'Windows', 'Mac', 'Fake']
  },
  deviceName: {
    presence: true,
    isString: true
  },
  platformVersion: {},
  newCommandTimeout: {
    isNumber: true
  },
  automationName: {
    inclusionCaseInsensitive: _lodash2['default'].values(_automationNames.automationNames)
  },
  autoLaunch: {
    isBoolean: true
  },
  udid: {
    isString: true
  },
  orientation: {
    inclusion: ['LANDSCAPE', 'PORTRAIT']
  },
  autoWebview: {
    isBoolean: true
  },
  noReset: {
    isBoolean: true
  },
  fullReset: {
    isBoolean: true
  },
  language: {
    isString: true
  },
  locale: {
    isString: true
  },
  eventTimings: {
    isBoolean: true
  },
  printPageSourceOnFindFailure: {
    isBoolean: true
  }
};

_validateJs2['default'].validators.isString = function (value) {
  if (typeof value === 'string') {
    return null;
  }

  if (typeof value === 'undefined') {
    return null;
  }

  return 'must be of type string';
};
_validateJs2['default'].validators.isNumber = function (value) {
  if (typeof value === 'number') {
    return null;
  }

  if (typeof value === 'undefined') {
    return null;
  }

  return 'must be of type number';
};
_validateJs2['default'].validators.isBoolean = function (value) {
  if (typeof value === 'boolean') {
    return null;
  }

  // allow a string value
  if (typeof value === 'string' && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false' || value === '')) {
    _logger2['default'].warn('Boolean capability passed in as string. Functionality may be compromised.');
    return null;
  }

  if (typeof value === 'undefined') {
    return null;
  }

  return 'must be of type boolean';
};
_validateJs2['default'].validators.isObject = function (value) {
  if (typeof value === 'object') {
    return null;
  }

  if (typeof value === 'undefined') {
    return null;
  }

  return 'must be of type object';
};
_validateJs2['default'].validators.deprecated = function (value, options, key) {
  if (options) {
    _logger2['default'].warn(key + ' is a deprecated capability');
  }
  return null;
};
_validateJs2['default'].validators.inclusionCaseInsensitive = function (value, options) {
  if (typeof value === 'undefined') {
    return null;
  } else if (typeof value !== 'string') {
    return 'unrecognised';
  }
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(options), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var option = _step.value;

      if (option.toLowerCase() === value.toLowerCase()) {
        return null;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return value + ' not part of ' + options.toString();
};

_validateJs2['default'].promise = _bluebird2['default'];
_validateJs2['default'].prettify = function (val) {
  return val;
};

exports.desiredCapabilityConstraints = desiredCapabilityConstraints;
exports.validator = _validateJs2['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9iYXNlZHJpdmVyL2Rlc2lyZWQtY2Fwcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O3NCQUFnQixVQUFVOzs7O3NCQUNaLFFBQVE7Ozs7MEJBQ0EsYUFBYTs7Ozt3QkFDckIsVUFBVTs7OzsrQkFDUSxvQkFBb0I7O0FBR3BELElBQUksNEJBQTRCLEdBQUc7QUFDakMsY0FBWSxFQUFFO0FBQ1osWUFBUSxFQUFFLElBQUk7QUFDZCxZQUFRLEVBQUUsSUFBSTtBQUNkLDRCQUF3QixFQUFFLENBQ3hCLEtBQUssRUFDTCxTQUFTLEVBQ1QsV0FBVyxFQUNYLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxDQUNQO0dBQ0Y7QUFDRCxZQUFVLEVBQUU7QUFDVixZQUFRLEVBQUUsSUFBSTtBQUNkLFlBQVEsRUFBRSxJQUFJO0dBQ2Y7QUFDRCxpQkFBZSxFQUFFLEVBQUU7QUFDbkIsbUJBQWlCLEVBQUU7QUFDakIsWUFBUSxFQUFFLElBQUk7R0FDZjtBQUNELGdCQUFjLEVBQUU7QUFDZCw0QkFBd0IsRUFBRSxvQkFBRSxNQUFNLGtDQUFpQjtHQUNwRDtBQUNELFlBQVUsRUFBRTtBQUNWLGFBQVMsRUFBRSxJQUFJO0dBQ2hCO0FBQ0QsTUFBSSxFQUFFO0FBQ0osWUFBUSxFQUFFLElBQUk7R0FDZjtBQUNELGFBQVcsRUFBRTtBQUNYLGFBQVMsRUFBRSxDQUNULFdBQVcsRUFDWCxVQUFVLENBQ1g7R0FDRjtBQUNELGFBQVcsRUFBRTtBQUNYLGFBQVMsRUFBRSxJQUFJO0dBQ2hCO0FBQ0QsU0FBTyxFQUFFO0FBQ1AsYUFBUyxFQUFFLElBQUk7R0FDaEI7QUFDRCxXQUFTLEVBQUU7QUFDVCxhQUFTLEVBQUUsSUFBSTtHQUNoQjtBQUNELFVBQVEsRUFBRTtBQUNSLFlBQVEsRUFBRSxJQUFJO0dBQ2Y7QUFDRCxRQUFNLEVBQUU7QUFDTixZQUFRLEVBQUUsSUFBSTtHQUNmO0FBQ0QsY0FBWSxFQUFFO0FBQ1osYUFBUyxFQUFFLElBQUk7R0FDaEI7QUFD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dXJjZXNDb250ZW50IjpbImltcG9ydCBsb2cgZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB2YWxpZGF0b3IgZnJvbSAndmFsaWRhdGUuanMnO1xuaW1wb3J0IEIgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHsgYXV0b21hdGlvbk5hbWVzIH0gZnJvbSAnLi9hdXRvbWF0aW9uLW5hbWVzJztcblxuXG5sZXQgZGVzaXJlZENhcGFiaWxpdHlDb25zdHJhaW50cyA9IHtcbiAgcGxhdGZvcm1OYW1lOiB7XG4gICAgcHJlc2VuY2U6IHRydWUsXG4gICAgaXNTdHJpbmc6IHRydWUsXG4gICAgaW5jbHVzaW9uQ2FzZUluc2Vuc2l0aXZlOiBbXG4gICAgICAnaU9TJyxcbiAgICAgICdBbmRyb2lkJyxcbiAgICAgICdGaXJlZm94T1MnLFxuICAgICAgJ1dpbmRvd3MnLFxuICAgICAgJ01hYycsXG4gICAgICAnRmFrZSdcbiAgICBdXG4gIH0sXG4gIGRldmljZU5hbWU6IHtcbiAgICBwcmVzZW5jZTogdHJ1ZSxcbiAgICBpc1N0cmluZzogdHJ1ZVxuICB9LFxuICBwbGF0Zm9ybVZlcnNpb246IHt9LFxuICBuZXdDb21tYW5kVGltZW91dDoge1xuICAgIGlzTnVtYmVyOiB0cnVlXG4gIH0sXG4gIGF1dG9tYXRpb25OYW1lOiB7XG4gICAgaW5jbHVzaW9uQ2FzZUluc2Vuc2l0aXZlOiBfLnZhbHVlcyhhdXRvbWF0aW9uTmFtZXMpXG4gIH0sXG4gIGF1dG9MYXVuY2g6IHtcbiAgICBpc0Jvb2xlYW46IHRydWVcbiAgfSxcbiAgdWRpZDoge1xuICAgIGlzU3RyaW5nOiB0cnVlXG4gIH0sXG4gIG9yaWVudGF0aW9uOiB7XG4gICAgaW5jbHVzaW9uOiBbXG4gICAgICAnTEFORFNDQVBFJyxcbiAgICAgICdQT1JUUkFJVCdcbiAgICBdXG4gIH0sXG4gIGF1dG9XZWJ2aWV3OiB7XG4gICAgaXNCb29sZWFuOiB0cnVlXG4gIH0sXG4gIG5vUmVzZXQ6IHtcbiAgICBpc0Jvb2xlYW46IHRydWVcbiAgfSxcbiAgZnVsbFJlc2V0OiB7XG4gICAgaXNCb29sZWFuOiB0cnVlXG4gIH0sXG4gIGxhbmd1YWdlOiB7XG4gICAgaXNTdHJpbmc6IHRydWVcbiAgfSxcbiAgbG9jYWxlOiB7XG4gICAgaXNTdHJpbmc6IHRydWVcbiAgfSxcbiAgZXZlbnRUaW1pbmdzOiB7XG4gICAgaXNCb29sZWFuOiB0cnVlXG4gIH0sXG4gIHByaW50UGFnZVNvdXJjZU9uRmluZEZhaWx1cmU6IHtcbiAgICBpc0Jvb2xlYW46IHRydWVcbiAgfSxcbn07XG5cbnZhbGlkYXRvci52YWxpZGF0b3JzLmlzU3RyaW5nID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuICdtdXN0IGJlIG9mIHR5cGUgc3RyaW5nJztcbn07XG52YWxpZGF0b3IudmFsaWRhdG9ycy5pc051bWJlciA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiAnbXVzdCBiZSBvZiB0eXBlIG51bWJlcic7XG59O1xudmFsaWRhdG9yLnZhbGlkYXRvcnMuaXNCb29sZWFuID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gYWxsb3cgYSBzdHJpbmcgdmFsdWVcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiZcbiAgICAgICgodmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gJ3RydWUnIHx8IHZhbHVlLnRvTG93ZXJDYXNlKCkgPT09ICdmYWxzZScpIHx8XG4gICAgICAgKHZhbHVlID09PSAnJykpKSB7XG4gICAgbG9nLndhcm4oJ0Jvb2xlYW4gY2FwYWJpbGl0eSBwYXNzZWQgaW4gYXMgc3RyaW5nLiBGdW5jdGlvbmFsaXR5IG1heSBiZSBjb21wcm9taXNlZC4nKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gJ211c3QgYmUgb2YgdHlwZSBib29sZWFuJztcbn07XG52YWxpZGF0b3IudmFsaWRhdG9ycy5pc09iamVjdCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiAnbXVzdCBiZSBvZiB0eXBlIG9iamVjdCc7XG59O1xudmFsaWRhdG9yLnZhbGlkYXRvcnMuZGVwcmVjYXRlZCA9IGZ1bmN0aW9uICh2YWx1ZSwgb3B0aW9ucywga2V5KSB7XG4gIGlmIChvcHRpb25zKSB7XG4gICAgbG9nLndhcm4oYCR7a2V5fSBpcyBhIGRlcHJlY2F0ZWQgY2FwYWJpbGl0eWApO1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcbnZhbGlkYXRvci52YWxpZGF0b3JzLmluY2x1c2lvbkNhc2VJbnNlbnNpdGl2ZSA9IGZ1bmN0aW9uICh2YWx1ZSwgb3B0aW9ucykge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBudWxsO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gJ3VucmVjb2duaXNlZCc7XG4gIH1cbiAgZm9yIChsZXQgb3B0aW9uIG9mIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9uLnRvTG93ZXJDYXNlKCkgPT09IHZhbHVlLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYCR7dmFsdWV9IG5vdCBwYXJ0IG9mICR7b3B0aW9ucy50b1N0cmluZygpfWA7XG59O1xuXG52YWxpZGF0b3IucHJvbWlzZSA9IEI7XG52YWxpZGF0b3IucHJldHRpZnkgPSAodmFsKSA9PiB7IHJldHVybiB2YWw7IH07XG5cblxuZXhwb3J0IHsgZGVzaXJlZENhcGFiaWxpdHlDb25zdHJhaW50cywgdmFsaWRhdG9yIH07XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uIn0=
