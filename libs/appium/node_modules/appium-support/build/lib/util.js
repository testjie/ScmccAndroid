'use strict';

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.hasContent = hasContent;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function hasContent(val) {
  return _lodash2['default'].isString(val) && val !== "";
}

// return true if the the value is not undefined, null, or NaN.
function hasValue(val) {
  var hasVal = false;
  // avoid incorrectly evaluating `0` as false
  if (_lodash2['default'].isNumber(val)) {
    hasVal = !_lodash2['default'].isNaN(val);
  } else {
    hasVal = !_lodash2['default'].isUndefined(val) && !_lodash2['default'].isNull(val);
  }

  return hasVal;
}

// escape spaces in string, for commandline calls
function escapeSpace(str) {
  return str.split(/ /).join('\\ ');
}

function escapeSpecialChars(str, quoteEscape) {
  if (typeof str !== "string") {
    return str;
  }
  if (typeof quoteEscape === "undefined") {
    quoteEscape = false;
  }
  str = str.replace(/[\\]/g, '\\\\').replace(/[\/]/g, '\\/').replace(/[\b]/g, '\\b').replace(/[\f]/g, '\\f').replace(/[\n]/g, '\\n').replace(/[\r]/g, '\\r').replace(/[\t]/g, '\\t').replace(/[\"]/g, '\\"').replace(/\\'/g, "\\'");
  if (quoteEscape) {
    var re = new RegExp(quoteEscape, "g");
    str = str.replace(re, '\\' + quoteEscape);
  }
  return str;
}

function localIp() {
  var ip = _lodash2['default'].chain(_os2['default'].networkInterfaces()).values().flatten().filter(function (val) {
    return val.family === 'IPv4' && val.internal === false;
  }).map('address').first().value();
  return ip;
}

/*
 * Creates a promise that is cancellable, and will timeout
 * after `ms` delay
 */
function cancellableDelay(ms) {
  var timer = undefined;
  return new _bluebird2['default'].Promise(function (resolve) {
    timer = setTimeout(function () {
      resolve();
    }, ms);
  }).cancellable()['catch'](_bluebird2['default'].CancellationError, function (err) {
    // eslint-disable-line promise/prefer-await-to-callbacks
    clearTimeout(timer);
    throw err;
  });
}

function multiResolve(roots) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return roots.map(function (root) {
    return _path2['default'].resolve.apply(_path2['default'], [root].concat(args));
  });
}

/*
 * Parses an object if possible. Otherwise returns the object without parsing.
 */
function safeJsonParse(obj) {
  try {
    obj = JSON.parse(obj);
  } catch (ign) {
    // ignore: this is not json parsable
  }
  return obj;
}

/*
 * Removes the wrapper from element, if it exists.
 *   { ELEMENT: 4 } becomes 4
 */
function unwrapElement(el) {
  if (typeof el === 'object' && el.ELEMENT) {
    return el.ELEMENT;
  }
  return el;
}

/*
 * Returns object consisting of all properties in the original element
 * which were truthy given the predicate.
 * If the predicate is
 *   * missing - it will remove all properties whose values are `undefined`
 *   * a scalar - it will test all properties' values against that value
 *   * a function - it will pass each value and the original object into the function
 */
function filterObject(obj, predicate) {
  var newObj = _lodash2['default'].clone(obj);
  if (_lodash2['default'].isUndefined(predicate)) {
    // remove any element from the object whose value is undefined
    predicate = function (v) {
      return !_lodash2['default'].isUndefined(v);
    };
  } else if (!_lodash2['default'].isFunction(predicate)) {
    (function () {
      // make predicate into a function
      var valuePredicate = predicate;
      predicate = function (v) {
        return v === valuePredicate;
      };
    })();
  }
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(_Object$keys(obj)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      if (!predicate(obj[key], obj)) {
        delete newObj[key];
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

  return newObj;
}

/**
 * Converts number of bytes to a readable size string.
 *
 * @param {number|string} bytes - The actual number of bytes.
 * @returns {string} The actual string representation, for example
 *                   '1.00 KB' for '1024 B'
 * @throws {Error} If bytes count cannot be converted to an integer or
 *                 if it is less than zero.
 */
function toReadableSizeString(bytes) {
  var intBytes = parseInt(bytes, 10);
  if (isNaN(intBytes) || intBytes < 0) {
    throw new Error('Cannot convert \'' + bytes + '\' to a readable size format');
  }
  if (intBytes >= 1024 * 1024 * 1024) {
    return parseFloat(intBytes / (1024 * 1024 * 1024.0)).toFixed(2) + ' GB';
  } else if (intBytes >= 1024 * 1024) {
    return parseFloat(intBytes / (1024 * 1024.0)).toFixed(2) + ' MB';
  } else if (intBytes >= 1024) {
    return parseFloat(intBytes / 1024.0).toFixed(2) + ' KB';
  }
  return intBytes + ' B';
}

exports.hasValue = hasValue;
exports.escapeSpace = escapeSpace;
exports.escapeSpecialChars = escapeSpecialChars;
exports.localIp = localIp;
exports.cancellableDelay = cancellableDelay;
exports.multiResolve = multiResolve;
exports.safeJsonParse = safeJsonParse;
exports.unwrapElement = unwrapElement;
exports.filterObject = filterObject;
exports.toReadableSizeString = toReadableSizeString;
//# sourceMappingURL=data:application/json;charset=utf8;base64,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QyxTQUFNO0dBQ3pEO0FBQ0QsU0FBVSxRQUFRLFFBQUs7Q0FDeEI7O1FBRVEsUUFBUSxHQUFSLFFBQVE7UUFBRSxXQUFXLEdBQVgsV0FBVztRQUFFLGtCQUFrQixHQUFsQixrQkFBa0I7UUFBRSxPQUFPLEdBQVAsT0FBTztRQUFFLGdCQUFnQixHQUFoQixnQkFBZ0I7UUFDcEUsWUFBWSxHQUFaLFlBQVk7UUFBRSxhQUFhLEdBQWIsYUFBYTtRQUFFLGFBQWEsR0FBYixhQUFhO1FBQUUsWUFBWSxHQUFaLFlBQVk7UUFDeEQsb0JBQW9CLEdBQXBCLG9CQUFvQiIsImZpbGUiOiJsaWIvdXRpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgb3MgZnJvbSAnb3MnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNDb250ZW50ICh2YWwpIHtcbiAgcmV0dXJuIF8uaXNTdHJpbmcodmFsKSAmJiB2YWwgIT09IFwiXCI7XG59XG5cbi8vIHJldHVybiB0cnVlIGlmIHRoZSB0aGUgdmFsdWUgaXMgbm90IHVuZGVmaW5lZCwgbnVsbCwgb3IgTmFOLlxuZnVuY3Rpb24gaGFzVmFsdWUgKHZhbCkge1xuICBsZXQgaGFzVmFsID0gZmFsc2U7XG4gIC8vIGF2b2lkIGluY29ycmVjdGx5IGV2YWx1YXRpbmcgYDBgIGFzIGZhbHNlXG4gIGlmIChfLmlzTnVtYmVyKHZhbCkpIHtcbiAgICBoYXNWYWwgPSAhXy5pc05hTih2YWwpO1xuICB9IGVsc2Uge1xuICAgIGhhc1ZhbCA9ICFfLmlzVW5kZWZpbmVkKHZhbCkgJiYgIV8uaXNOdWxsKHZhbCk7XG4gIH1cblxuICByZXR1cm4gaGFzVmFsO1xufVxuXG4vLyBlc2NhcGUgc3BhY2VzIGluIHN0cmluZywgZm9yIGNvbW1hbmRsaW5lIGNhbGxzXG5mdW5jdGlvbiBlc2NhcGVTcGFjZSAoc3RyKSB7XG4gIHJldHVybiBzdHIuc3BsaXQoLyAvKS5qb2luKCdcXFxcICcpO1xufVxuXG5mdW5jdGlvbiBlc2NhcGVTcGVjaWFsQ2hhcnMgKHN0ciwgcXVvdGVFc2NhcGUpIHtcbiAgaWYgKHR5cGVvZiBzdHIgIT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG4gIGlmICh0eXBlb2YgcXVvdGVFc2NhcGUgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBxdW90ZUVzY2FwZSA9IGZhbHNlO1xuICB9XG4gIHN0ciA9IHN0clxuICAgICAgICAucmVwbGFjZSgvW1xcXFxdL2csICdcXFxcXFxcXCcpXG4gICAgICAgIC5yZXBsYWNlKC9bXFwvXS9nLCAnXFxcXC8nKVxuICAgICAgICAucmVwbGFjZSgvW1xcYl0vZywgJ1xcXFxiJylcbiAgICAgICAgLnJlcGxhY2UoL1tcXGZdL2csICdcXFxcZicpXG4gICAgICAgIC5yZXBsYWNlKC9bXFxuXS9nLCAnXFxcXG4nKVxuICAgICAgICAucmVwbGFjZSgvW1xccl0vZywgJ1xcXFxyJylcbiAgICAgICAgLnJlcGxhY2UoL1tcXHRdL2csICdcXFxcdCcpXG4gICAgICAgIC5yZXBsYWNlKC9bXFxcIl0vZywgJ1xcXFxcIicpXG4gICAgICAgIC5yZXBsYWNlKC9cXFxcJy9nLCBcIlxcXFwnXCIpO1xuICBpZiAocXVvdGVFc2NhcGUpIHtcbiAgICBsZXQgcmUgPSBuZXcgUmVnRXhwKHF1b3RlRXNjYXBlLCBcImdcIik7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UocmUsIGBcXFxcJHtxdW90ZUVzY2FwZX1gKTtcbiAgfVxuICByZXR1cm4gc3RyO1xufVxuXG5mdW5jdGlvbiBsb2NhbElwICgpIHtcbiAgbGV0IGlwID0gXy5jaGFpbihvcy5uZXR3b3JrSW50ZXJmYWNlcygpKVxuICAgIC52YWx1ZXMoKVxuICAgIC5mbGF0dGVuKClcbiAgICAuZmlsdGVyKGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgIHJldHVybiAodmFsLmZhbWlseSA9PT0gJ0lQdjQnICYmIHZhbC5pbnRlcm5hbCA9PT0gZmFsc2UpO1xuICAgIH0pXG4gICAgLm1hcCgnYWRkcmVzcycpXG4gICAgLmZpcnN0KClcbiAgICAudmFsdWUoKTtcbiAgcmV0dXJuIGlwO1xufVxuXG4vKlxuICogQ3JlYXRlcyBhIHByb21pc2UgdGhhdCBpcyBjYW5jZWxsYWJsZSwgYW5kIHdpbGwgdGltZW91dFxuICogYWZ0ZXIgYG1zYCBkZWxheVxuICovXG5mdW5jdGlvbiBjYW5jZWxsYWJsZURlbGF5IChtcykge1xuICBsZXQgdGltZXI7XG4gIHJldHVybiBuZXcgQi5Qcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9LCBtcyk7XG4gIH0pXG4gIC5jYW5jZWxsYWJsZSgpXG4gIC5jYXRjaChCLkNhbmNlbGxhdGlvbkVycm9yLCAoZXJyKSA9PiB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcHJvbWlzZS9wcmVmZXItYXdhaXQtdG8tY2FsbGJhY2tzXG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICB0aHJvdyBlcnI7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBtdWx0aVJlc29sdmUgKHJvb3RzLCAuLi5hcmdzKSB7XG4gIHJldHVybiByb290cy5tYXAoKHJvb3QpID0+IHtcbiAgICByZXR1cm4gcGF0aC5yZXNvbHZlKHJvb3QsIC4uLmFyZ3MpO1xuICB9KTtcbn1cblxuLypcbiAqIFBhcnNlcyBhbiBvYmplY3QgaWYgcG9zc2libGUuIE90aGVyd2lzZSByZXR1cm5zIHRoZSBvYmplY3Qgd2l0aG91dCBwYXJzaW5nLlxuICovXG5mdW5jdGlvbiBzYWZlSnNvblBhcnNlIChvYmopIHtcbiAgdHJ5IHtcbiAgICBvYmogPSBKU09OLnBhcnNlKG9iaik7XG4gIH0gY2F0Y2ggKGlnbikge1xuICAgIC8vIGlnbm9yZTogdGhpcyBpcyBub3QganNvbiBwYXJzYWJsZVxuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qXG4gKiBSZW1vdmVzIHRoZSB3cmFwcGVyIGZyb20gZWxlbWVudCwgaWYgaXQgZXhpc3RzLlxuICogICB7IEVMRU1FTlQ6IDQgfSBiZWNvbWVzIDRcbiAqL1xuZnVuY3Rpb24gdW53cmFwRWxlbWVudCAoZWwpIHtcbiAgaWYgKHR5cGVvZiBlbCA9PT0gJ29iamVjdCcgJiYgZWwuRUxFTUVOVCkge1xuICAgIHJldHVybiBlbC5FTEVNRU5UO1xuICB9XG4gIHJldHVybiBlbDtcbn1cblxuLypcbiAqIFJldHVybnMgb2JqZWN0IGNvbnNpc3Rpbmcgb2YgYWxsIHByb3BlcnRpZXMgaW4gdGhlIG9yaWdpbmFsIGVsZW1lbnRcbiAqIHdoaWNoIHdlcmUgdHJ1dGh5IGdpdmVuIHRoZSBwcmVkaWNhdGUuXG4gKiBJZiB0aGUgcHJlZGljYXRlIGlzXG4gKiAgICogbWlzc2luZyAtIGl0IHdpbGwgcmVtb3ZlIGFsbCBwcm9wZXJ0aWVzIHdob3NlIHZhbHVlcyBhcmUgYHVuZGVmaW5lZGBcbiAqICAgKiBhIHNjYWxhciAtIGl0IHdpbGwgdGVzdCBhbGwgcHJvcGVydGllcycgdmFsdWVzIGFnYWluc3QgdGhhdCB2YWx1ZVxuICogICAqIGEgZnVuY3Rpb24gLSBpdCB3aWxsIHBhc3MgZWFjaCB2YWx1ZSBhbmQgdGhlIG9yaWdpbmFsIG9iamVjdCBpbnRvIHRoZSBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBmaWx0ZXJPYmplY3QgKG9iaiwgcHJlZGljYXRlKSB7XG4gIGxldCBuZXdPYmogPSBfLmNsb25lKG9iaik7XG4gIGlmIChfLmlzVW5kZWZpbmVkKHByZWRpY2F0ZSkpIHtcbiAgICAvLyByZW1vdmUgYW55IGVsZW1lbnQgZnJvbSB0aGUgb2JqZWN0IHdob3NlIHZhbHVlIGlzIHVuZGVmaW5lZFxuICAgIHByZWRpY2F0ZSA9ICh2KSA9PiAhXy5pc1VuZGVmaW5lZCh2KTtcbiAgfSBlbHNlIGlmICghXy5pc0Z1bmN0aW9uKHByZWRpY2F0ZSkpIHtcbiAgICAvLyBtYWtlIHByZWRpY2F0ZSBpbnRvIGEgZnVuY3Rpb25cbiAgICBjb25zdCB2YWx1ZVByZWRpY2F0ZSA9IHByZWRpY2F0ZTtcbiAgICBwcmVkaWNhdGUgPSAodikgPT4gdiA9PT0gdmFsdWVQcmVkaWNhdGU7XG4gIH1cbiAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMob2JqKSkge1xuICAgIGlmICghcHJlZGljYXRlKG9ialtrZXldLCBvYmopKSB7XG4gICAgICBkZWxldGUgbmV3T2JqW2tleV07XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXdPYmo7XG59XG5cbi8qKlxuICogQ29udmVydHMgbnVtYmVyIG9mIGJ5dGVzIHRvIGEgcmVhZGFibGUgc2l6ZSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBieXRlcyAtIFRoZSBhY3R1YWwgbnVtYmVyIG9mIGJ5dGVzLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGFjdHVhbCBzdHJpbmcgcmVwcmVzZW50YXRpb24sIGZvciBleGFtcGxlXG4gKiAgICAgICAgICAgICAgICAgICAnMS4wMCBLQicgZm9yICcxMDI0IEInXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgYnl0ZXMgY291bnQgY2Fubm90IGJlIGNvbnZlcnRlZCB0byBhbiBpbnRlZ2VyIG9yXG4gKiAgICAgICAgICAgICAgICAgaWYgaXQgaXMgbGVzcyB0aGFuIHplcm8uXG4gKi9cbmZ1bmN0aW9uIHRvUmVhZGFibGVTaXplU3RyaW5nIChieXRlcykge1xuICBjb25zdCBpbnRCeXRlcyA9IHBhcnNlSW50KGJ5dGVzLCAxMCk7XG4gIGlmIChpc05hTihpbnRCeXRlcykgfHwgaW50Qnl0ZXMgPCAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgY29udmVydCAnJHtieXRlc30nIHRvIGEgcmVhZGFibGUgc2l6ZSBmb3JtYXRgKTtcbiAgfVxuICBpZiAoaW50Qnl0ZXMgPj0gMTAyNCAqIDEwMjQgKiAxMDI0KSB7XG4gICAgcmV0dXJuIGAke3BhcnNlRmxvYXQoaW50Qnl0ZXMgLyAoMTAyNCAqIDEwMjQgKiAxMDI0LjApKS50b0ZpeGVkKDIpfSBHQmA7XG4gIH0gZWxzZSBpZiAoaW50Qnl0ZXMgPj0gMTAyNCAqIDEwMjQpIHtcbiAgICByZXR1cm4gYCR7cGFyc2VGbG9hdChpbnRCeXRlcyAvICgxMDI0ICogMTAyNC4wKSkudG9GaXhlZCgyKX0gTUJgO1xuICB9IGVsc2UgaWYgKGludEJ5dGVzID49IDEwMjQpIHtcbiAgICByZXR1cm4gYCR7cGFyc2VGbG9hdChpbnRCeXRlcyAvIDEwMjQuMCkudG9GaXhlZCgyKX0gS0JgO1xuICB9XG4gIHJldHVybiBgJHtpbnRCeXRlc30gQmA7XG59XG5cbmV4cG9ydCB7IGhhc1ZhbHVlLCBlc2NhcGVTcGFjZSwgZXNjYXBlU3BlY2lhbENoYXJzLCBsb2NhbElwLCBjYW5jZWxsYWJsZURlbGF5LFxuICAgICAgICAgbXVsdGlSZXNvbHZlLCBzYWZlSnNvblBhcnNlLCB1bndyYXBFbGVtZW50LCBmaWx0ZXJPYmplY3QsXG4gICAgICAgICB0b1JlYWRhYmxlU2l6ZVN0cmluZyB9O1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9
