'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _appiumBaseDriver = require('appium-base-driver');

function inspectObject(args) {
  function getValueArray(obj) {
    var indent = arguments.length <= 1 || arguments[1] === undefined ? '  ' : arguments[1];

    if (!_lodash2['default'].isObject(obj)) {
      return [obj];
    }

    var strArr = ['{'];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _getIterator(_lodash2['default'].toPairs(obj)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = _slicedToArray(_step.value, 2);

        var arg = _step$value[0];
        var value = _step$value[1];

        if (!_lodash2['default'].isObject(value)) {
          strArr.push(indent + '  ' + arg + ': ' + value);
        } else {
          value = getValueArray(value, indent + '  ');
          strArr.push(indent + '  ' + arg + ': ' + value.shift());
          strArr.push.apply(strArr, _toConsumableArray(value));
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

    strArr.push(indent + '}');
    return strArr;
  }
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = _getIterator(_lodash2['default'].toPairs(args)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _step2$value = _slicedToArray(_step2.value, 2);

      var arg = _step2$value[0];
      var value = _step2$value[1];

      value = getValueArray(value);
      _logger2['default'].info('  ' + arg + ': ' + value.shift());
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = _getIterator(value), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var val = _step3.value;

          _logger2['default'].info(val);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3['return']) {
            _iterator3['return']();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2['return']) {
        _iterator2['return']();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
}

/**
 * Takes the caps that were provided in the request and translates them
 * into caps that can be used by the inner drivers.
 * @param {Object} jsonwpCaps
 * @param {Object} w3cCapabilities
 * @param {Object} constraints
 * @param {Object} defaultCapabilities
 */
function parseCapsForInnerDriver(jsonwpCaps, w3cCapabilities) {
  var constraints = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
  var defaultCapabilities = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

  // Check if the caller sent JSONWP caps, W3C caps, or both
  var hasW3CCaps = _lodash2['default'].isPlainObject(w3cCapabilities);
  var hasJSONWPCaps = _lodash2['default'].isPlainObject(jsonwpCaps);

  var protocol = undefined;

  var _BaseDriver$DRIVER_PROTOCOL = _appiumBaseDriver.BaseDriver.DRIVER_PROTOCOL;
  var W3C = _BaseDriver$DRIVER_PROTOCOL.W3C;
  var MJSONWP = _BaseDriver$DRIVER_PROTOCOL.MJSONWP;

  // Make copies of the capabilities that include the default capabilities
  if (hasW3CCaps) {
    w3cCapabilities = _extends({}, w3cCapabilities, {
      alwaysMatch: _extends({}, defaultCapabilities, w3cCapabilities.alwaysMatch)
    });
  }

  if (hasJSONWPCaps) {
    jsonwpCaps = _extends({}, defaultCapabilities, jsonwpCaps);
  }

  // Get MJSONWP caps
  var desiredCaps = {};
  var processedJsonwpCapabilities = null;
  if (hasJSONWPCaps) {
    protocol = MJSONWP;
    desiredCaps = jsonwpCaps;
    processedJsonwpCapabilities = _extends({}, desiredCaps);
  }

  // Get W3C caps
  var processedW3CCapabilities = null;
  var error = undefined;
  if (hasW3CCaps) {
    protocol = W3C;
    // Call the process capabilities algorithm to find matching caps on the W3C
    // (see: https://github.com/jlipps/simple-wd-spec#processing-capabilities)
    var matchingW3CCaps = undefined;
    try {
      matchingW3CCaps = (0, _appiumBaseDriver.processCapabilities)(w3cCapabilities, constraints, true);
    } catch (err) {
      if (jsonwpCaps) {
        _logger2['default'].warn('Could not parse W3C capabilities: ' + err.message + '. Falling back to JSONWP protocol.');
        protocol = MJSONWP;
      } else {
        error = err;
      }
    }

    desiredCaps = matchingW3CCaps;

    // Create a new w3c capabilities payload that contains only the matching caps in `alwaysMatch`
    processedW3CCapabilities = {
      alwaysMatch: _extends({}, insertAppiumPrefixes(desiredCaps)),
      firstMatch: [{}]
    };

    // If we found extraneuous keys in JSONWP caps, fall back to JSONWP
    if (hasJSONWPCaps) {
      var differingKeys = _lodash2['default'].difference(_lodash2['default'].keys(jsonwpCaps), _lodash2['default'].keys(matchingW3CCaps));
      if (!_lodash2['default'].isEmpty(differingKeys)) {
        _logger2['default'].warn('The following capabilities were provided in the JSONWP desired capabilities that are missing ' + ('in W3C capabilities: ' + JSON.stringify(differingKeys) + '. Falling back to JSONWP protocol.'));
        protocol = MJSONWP;
        desiredCaps = jsonwpCaps;
        return { desiredCaps: desiredCaps, processedJsonwpCapabilities: processedJsonwpCapabilities, processedW3CCapabilities: null, protocol: protocol };
      }
    }
  }

  return { desiredCaps: desiredCaps, processedJsonwpCapabilities: processedJsonwpCapabilities, processedW3CCapabilities: processedW3CCapabilities, protocol: protocol, error: error };
}

/**
 * Takes a capabilities objects and prefixes capabilities with `appium:`
 * @param {Object} caps Desired capabilities object
 */
function insertAppiumPrefixes(caps) {

  // Standard, non-prefixed capabilities (see https://www.w3.org/TR/webdriver/#dfn-table-of-standard-capabilities)
  var STANDARD_CAPS = ['browserName', 'browserVersion', 'platformName', 'acceptInsecureCerts', 'pageLoadStrategy', 'proxy', 'setWindowRect', 'timeouts', 'unhandledPromptBehavior'];

  var prefixedCaps = {};
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = _getIterator(_lodash2['default'].toPairs(caps)), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var _step4$value = _slicedToArray(_step4.value, 2);

      var _name = _step4$value[0];
      var value = _step4$value[1];

      if (STANDARD_CAPS.includes(_name) || _name.includes(':')) {
        prefixedCaps[_name] = value;
      } else {
        prefixedCaps['appium:' + _name] = value;
      }
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4['return']) {
        _iterator4['return']();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  return prefixedCaps;
}

exports.inspectObject = inspectObject;
exports.parseCapsForInnerDriver = parseCapsForInnerDriver;
exports.insertAppiumPrefixes = insertAppiumPrefixes;
//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFYLFdBQVcsRUFBRSwyQkFBMkIsRUFBM0IsMkJBQTJCLEVBQUUsd0JBQXdCLEVBQXhCLHdCQUF3QixFQUFFLFFBQVEsRUFBUixRQUFRLEVBQUUsS0FBSyxFQUFMLEtBQUssRUFBQyxDQUFDO0NBQzlGOzs7Ozs7QUFPRCxTQUFTLG9CQUFvQixDQUFFLElBQUksRUFBRTs7O0FBR25DLE1BQU0sYUFBYSxHQUFHLENBQ3BCLGFBQWEsRUFDYixnQkFBZ0IsRUFDaEIsY0FBYyxFQUNkLHFCQUFxQixFQUNyQixrQkFBa0IsRUFDbEIsT0FBTyxFQUNQLGVBQWUsRUFDZixVQUFVLEVBQ1YseUJBQXlCLENBQzFCLENBQUM7O0FBRUYsTUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDOzs7Ozs7QUFDdEIsdUNBQTBCLG9CQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUhBQUU7OztVQUFqQyxLQUFJO1VBQUUsS0FBSzs7QUFDbkIsVUFBSSxhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxJQUFJLEtBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDdEQsb0JBQVksQ0FBQyxLQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7T0FDNUIsTUFBTTtBQUNMLG9CQUFZLGFBQVcsS0FBSSxDQUFHLEdBQUcsS0FBSyxDQUFDO09BQ3hDO0tBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDRCxTQUFPLFlBQVksQ0FBQztDQUNyQjs7UUFFUSxhQUFhLEdBQWIsYUFBYTtRQUFFLHVCQUF1QixHQUF2Qix1QkFBdUI7UUFBRSxvQkFBb0IsR0FBcEIsb0JBQW9CIiwiZmlsZSI6ImxpYi91dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7IHByb2Nlc3NDYXBhYmlsaXRpZXMsIEJhc2VEcml2ZXIgfSBmcm9tICdhcHBpdW0tYmFzZS1kcml2ZXInO1xuXG5cbmZ1bmN0aW9uIGluc3BlY3RPYmplY3QgKGFyZ3MpIHtcbiAgZnVuY3Rpb24gZ2V0VmFsdWVBcnJheSAob2JqLCBpbmRlbnQgPSAnICAnKSB7XG4gICAgaWYgKCFfLmlzT2JqZWN0KG9iaikpIHtcbiAgICAgIHJldHVybiBbb2JqXTtcbiAgICB9XG5cbiAgICBsZXQgc3RyQXJyID0gWyd7J107XG4gICAgZm9yIChsZXQgW2FyZywgdmFsdWVdIG9mIF8udG9QYWlycyhvYmopKSB7XG4gICAgICBpZiAoIV8uaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgIHN0ckFyci5wdXNoKGAke2luZGVudH0gICR7YXJnfTogJHt2YWx1ZX1gKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gZ2V0VmFsdWVBcnJheSh2YWx1ZSwgYCR7aW5kZW50fSAgYCk7XG4gICAgICAgIHN0ckFyci5wdXNoKGAke2luZGVudH0gICR7YXJnfTogJHt2YWx1ZS5zaGlmdCgpfWApO1xuICAgICAgICBzdHJBcnIucHVzaCguLi52YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHN0ckFyci5wdXNoKGAke2luZGVudH19YCk7XG4gICAgcmV0dXJuIHN0ckFycjtcbiAgfVxuICBmb3IgKGxldCBbYXJnLCB2YWx1ZV0gb2YgXy50b1BhaXJzKGFyZ3MpKSB7XG4gICAgdmFsdWUgPSBnZXRWYWx1ZUFycmF5KHZhbHVlKTtcbiAgICBsb2dnZXIuaW5mbyhgICAke2FyZ306ICR7dmFsdWUuc2hpZnQoKX1gKTtcbiAgICBmb3IgKGxldCB2YWwgb2YgdmFsdWUpIHtcbiAgICAgIGxvZ2dlci5pbmZvKHZhbCk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogVGFrZXMgdGhlIGNhcHMgdGhhdCB3ZXJlIHByb3ZpZGVkIGluIHRoZSByZXF1ZXN0IGFuZCB0cmFuc2xhdGVzIHRoZW1cbiAqIGludG8gY2FwcyB0aGF0IGNhbiBiZSB1c2VkIGJ5IHRoZSBpbm5lciBkcml2ZXJzLlxuICogQHBhcmFtIHtPYmplY3R9IGpzb253cENhcHNcbiAqIEBwYXJhbSB7T2JqZWN0fSB3M2NDYXBhYmlsaXRpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25zdHJhaW50c1xuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDYXBhYmlsaXRpZXNcbiAqL1xuZnVuY3Rpb24gcGFyc2VDYXBzRm9ySW5uZXJEcml2ZXIgKGpzb253cENhcHMsIHczY0NhcGFiaWxpdGllcywgY29uc3RyYWludHM9e30sIGRlZmF1bHRDYXBhYmlsaXRpZXM9e30pIHtcbiAgLy8gQ2hlY2sgaWYgdGhlIGNhbGxlciBzZW50IEpTT05XUCBjYXBzLCBXM0MgY2Fwcywgb3IgYm90aFxuICBjb25zdCBoYXNXM0NDYXBzID0gXy5pc1BsYWluT2JqZWN0KHczY0NhcGFiaWxpdGllcyk7XG4gIGNvbnN0IGhhc0pTT05XUENhcHMgPSBfLmlzUGxhaW5PYmplY3QoanNvbndwQ2Fwcyk7XG5cbiAgbGV0IHByb3RvY29sO1xuXG4gIGNvbnN0IHtXM0MsIE1KU09OV1B9ID0gQmFzZURyaXZlci5EUklWRVJfUFJPVE9DT0w7XG5cbiAgLy8gTWFrZSBjb3BpZXMgb2YgdGhlIGNhcGFiaWxpdGllcyB0aGF0IGluY2x1ZGUgdGhlIGRlZmF1bHQgY2FwYWJpbGl0aWVzXG4gIGlmIChoYXNXM0NDYXBzKSB7XG4gICAgdzNjQ2FwYWJpbGl0aWVzID0ge1xuICAgICAgLi4udzNjQ2FwYWJpbGl0aWVzLFxuICAgICAgYWx3YXlzTWF0Y2g6IHtcbiAgICAgICAgLi4uZGVmYXVsdENhcGFiaWxpdGllcyxcbiAgICAgICAgLi4udzNjQ2FwYWJpbGl0aWVzLmFsd2F5c01hdGNoLFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgaWYgKGhhc0pTT05XUENhcHMpIHtcbiAgICBqc29ud3BDYXBzID0ge1xuICAgICAgLi4uZGVmYXVsdENhcGFiaWxpdGllcyxcbiAgICAgIC4uLmpzb253cENhcHMsXG4gICAgfTtcbiAgfVxuXG4gIC8vIEdldCBNSlNPTldQIGNhcHNcbiAgbGV0IGRlc2lyZWRDYXBzID0ge307XG4gIGxldCBwcm9jZXNzZWRKc29ud3BDYXBhYmlsaXRpZXMgPSBudWxsO1xuICBpZiAoaGFzSlNPTldQQ2Fwcykge1xuICAgIHByb3RvY29sID0gTUpTT05XUDtcbiAgICBkZXNpcmVkQ2FwcyA9IGpzb253cENhcHM7XG4gICAgcHJvY2Vzc2VkSnNvbndwQ2FwYWJpbGl0aWVzID0gey4uLmRlc2lyZWRDYXBzfTtcbiAgfVxuXG4gIC8vIEdldCBXM0MgY2Fwc1xuICBsZXQgcHJvY2Vzc2VkVzNDQ2FwYWJpbGl0aWVzID0gbnVsbDtcbiAgbGV0IGVycm9yO1xuICBpZiAoaGFzVzNDQ2Fwcykge1xuICAgIHByb3RvY29sID0gVzNDO1xuICAgIC8vIENhbGwgdGhlIHByb2Nlc3MgY2FwYWJpbGl0aWVzIGFsZ29yaXRobSB0byBmaW5kIG1hdGNoaW5nIGNhcHMgb24gdGhlIFczQ1xuICAgIC8vIChzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9qbGlwcHMvc2ltcGxlLXdkLXNwZWMjcHJvY2Vzc2luZy1jYXBhYmlsaXRpZXMpXG4gICAgbGV0IG1hdGNoaW5nVzNDQ2FwcztcbiAgICB0cnkge1xuICAgICAgbWF0Y2hpbmdXM0NDYXBzID0gcHJvY2Vzc0NhcGFiaWxpdGllcyh3M2NDYXBhYmlsaXRpZXMsIGNvbnN0cmFpbnRzLCB0cnVlKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmIChqc29ud3BDYXBzKSB7XG4gICAgICAgIGxvZ2dlci53YXJuKGBDb3VsZCBub3QgcGFyc2UgVzNDIGNhcGFiaWxpdGllczogJHtlcnIubWVzc2FnZX0uIEZhbGxpbmcgYmFjayB0byBKU09OV1AgcHJvdG9jb2wuYCk7XG4gICAgICAgIHByb3RvY29sID0gTUpTT05XUDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVycm9yID0gZXJyO1xuICAgICAgfVxuICAgIH1cblxuICAgIGRlc2lyZWRDYXBzID0gbWF0Y2hpbmdXM0NDYXBzO1xuXG4gICAgLy8gQ3JlYXRlIGEgbmV3IHczYyBjYXBhYmlsaXRpZXMgcGF5bG9hZCB0aGF0IGNvbnRhaW5zIG9ubHkgdGhlIG1hdGNoaW5nIGNhcHMgaW4gYGFsd2F5c01hdGNoYFxuICAgIHByb2Nlc3NlZFczQ0NhcGFiaWxpdGllcyA9IHtcbiAgICAgIGFsd2F5c01hdGNoOiB7Li4uaW5zZXJ0QXBwaXVtUHJlZml4ZXMoZGVzaXJlZENhcHMpfSxcbiAgICAgIGZpcnN0TWF0Y2g6IFt7fV0sXG4gICAgfTtcblxuICAgIC8vIElmIHdlIGZvdW5kIGV4dHJhbmV1b3VzIGtleXMgaW4gSlNPTldQIGNhcHMsIGZhbGwgYmFjayB0byBKU09OV1BcbiAgICBpZiAoaGFzSlNPTldQQ2Fwcykge1xuICAgICAgbGV0IGRpZmZlcmluZ0tleXMgPSBfLmRpZmZlcmVuY2UoXy5rZXlzKGpzb253cENhcHMpLCBfLmtleXMobWF0Y2hpbmdXM0NDYXBzKSk7XG4gICAgICBpZiAoIV8uaXNFbXB0eShkaWZmZXJpbmdLZXlzKSkge1xuICAgICAgICBsb2dnZXIud2FybihgVGhlIGZvbGxvd2luZyBjYXBhYmlsaXRpZXMgd2VyZSBwcm92aWRlZCBpbiB0aGUgSlNPTldQIGRlc2lyZWQgY2FwYWJpbGl0aWVzIHRoYXQgYXJlIG1pc3NpbmcgYCArXG4gICAgICAgICAgYGluIFczQyBjYXBhYmlsaXRpZXM6ICR7SlNPTi5zdHJpbmdpZnkoZGlmZmVyaW5nS2V5cyl9LiBGYWxsaW5nIGJhY2sgdG8gSlNPTldQIHByb3RvY29sLmApO1xuICAgICAgICBwcm90b2NvbCA9IE1KU09OV1A7XG4gICAgICAgIGRlc2lyZWRDYXBzID0ganNvbndwQ2FwcztcbiAgICAgICAgcmV0dXJuIHtkZXNpcmVkQ2FwcywgcHJvY2Vzc2VkSnNvbndwQ2FwYWJpbGl0aWVzLCBwcm9jZXNzZWRXM0NDYXBhYmlsaXRpZXM6IG51bGwsIHByb3RvY29sfTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge2Rlc2lyZWRDYXBzLCBwcm9jZXNzZWRKc29ud3BDYXBhYmlsaXRpZXMsIHByb2Nlc3NlZFczQ0NhcGFiaWxpdGllcywgcHJvdG9jb2wsIGVycm9yfTtcbn1cblxuXG4vKipcbiAqIFRha2VzIGEgY2FwYWJpbGl0aWVzIG9iamVjdHMgYW5kIHByZWZpeGVzIGNhcGFiaWxpdGllcyB3aXRoIGBhcHBpdW06YFxuICogQHBhcmFtIHtPYmplY3R9IGNhcHMgRGVzaXJlZCBjYXBhYmlsaXRpZXMgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGluc2VydEFwcGl1bVByZWZpeGVzIChjYXBzKSB7XG5cbiAgLy8gU3RhbmRhcmQsIG5vbi1wcmVmaXhlZCBjYXBhYmlsaXRpZXMgKHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2ViZHJpdmVyLyNkZm4tdGFibGUtb2Ytc3RhbmRhcmQtY2FwYWJpbGl0aWVzKVxuICBjb25zdCBTVEFOREFSRF9DQVBTID0gW1xuICAgICdicm93c2VyTmFtZScsXG4gICAgJ2Jyb3dzZXJWZXJzaW9uJyxcbiAgICAncGxhdGZvcm1OYW1lJyxcbiAgICAnYWNjZXB0SW5zZWN1cmVDZXJ0cycsXG4gICAgJ3BhZ2VMb2FkU3RyYXRlZ3knLFxuICAgICdwcm94eScsXG4gICAgJ3NldFdpbmRvd1JlY3QnLFxuICAgICd0aW1lb3V0cycsXG4gICAgJ3VuaGFuZGxlZFByb21wdEJlaGF2aW9yJ1xuICBdO1xuXG4gIGxldCBwcmVmaXhlZENhcHMgPSB7fTtcbiAgZm9yIChsZXQgW25hbWUsIHZhbHVlXSBvZiBfLnRvUGFpcnMoY2FwcykpIHtcbiAgICBpZiAoU1RBTkRBUkRfQ0FQUy5pbmNsdWRlcyhuYW1lKSB8fCBuYW1lLmluY2x1ZGVzKCc6JykpIHtcbiAgICAgIHByZWZpeGVkQ2Fwc1tuYW1lXSA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcmVmaXhlZENhcHNbYGFwcGl1bToke25hbWV9YF0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHByZWZpeGVkQ2Fwcztcbn1cblxuZXhwb3J0IHsgaW5zcGVjdE9iamVjdCwgcGFyc2VDYXBzRm9ySW5uZXJEcml2ZXIsIGluc2VydEFwcGl1bVByZWZpeGVzIH07XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uIn0=
