'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _desiredCaps = require('./desired-caps');

var _appiumSupport = require('appium-support');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _protocolErrors = require('../protocol/errors');

// Takes primary caps object and merges it into a secondary caps object.
// (see https://www.w3.org/TR/webdriver/#dfn-merging-capabilities)
function mergeCaps() {
  var primary = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var secondary = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var result = _Object$assign({}, primary);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(_lodash2['default'].toPairs(secondary)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2);

      var _name = _step$value[0];
      var value = _step$value[1];

      // Overwriting is not allowed. Primary and secondary must have different properties (w3c rule 4.4)
      if (!_lodash2['default'].isUndefined(primary[_name])) {
        throw new _protocolErrors.errors.InvalidArgumentError('property \'' + _name + '\' should not exist on both primary (' + JSON.stringify(primary) + ') and secondary (' + JSON.stringify(secondary) + ') object');
      }
      result[_name] = value;
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

  return result;
}

// Validates caps against a set of constraints
function validateCaps(caps) {
  var constraints = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
  var skipPresenceConstraint = opts.skipPresenceConstraint;

  if (!_lodash2['default'].isPlainObject(caps)) {
    throw new _protocolErrors.errors.InvalidArgumentError('must be a JSON object');
  }

  constraints = _lodash2['default'].cloneDeep(constraints); // Defensive copy

  if (skipPresenceConstraint) {
    // Remove the 'presence' constraint if we're not checking for it
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = _getIterator(_lodash2['default'].keys(constraints)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var key = _step2.value;

        delete constraints[key].presence;
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

  var validationErrors = _desiredCaps.validator.validate(_lodash2['default'].pickBy(caps, _appiumSupport.util.hasValue), constraints, { fullMessages: false });

  if (validationErrors) {
    var message = [];
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = _getIterator(_lodash2['default'].toPairs(validationErrors)), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _step3$value = _slicedToArray(_step3.value, 2);

        var attribute = _step3$value[0];
        var reasons = _step3$value[1];
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = _getIterator(reasons), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var reason = _step4.value;

            message.push('\'' + attribute + '\' ' + reason);
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

    throw new _protocolErrors.errors.InvalidArgumentError(message.join('; '));
  }

  // Return caps
  return caps;
}

// Standard, non-prefixed capabilities (see https://www.w3.org/TR/webdriver/#dfn-table-of-standard-capabilities)
var STANDARD_CAPS = ['browserName', 'browserVersion', 'platformName', 'acceptInsecureCerts', 'pageLoadStrategy', 'proxy', 'setWindowRect', 'timeouts', 'unhandledPromptBehavior'];

function isStandardCap(cap) {
  return !!_lodash2['default'].find(STANDARD_CAPS, function (standardCap) {
    return standardCap.toLowerCase() === ('' + cap).toLowerCase();
  });
}

// If the 'appium:' prefix was provided and it's a valid capability, strip out the prefix (see https://www.w3.org/TR/webdriver/#dfn-extension-capabilities)
// (NOTE: Method is destructive and mutates contents of caps)
function stripAppiumPrefixes(caps) {
  var prefix = 'appium:';
  var prefixedCaps = _lodash2['default'].filter(_lodash2['default'].keys(caps), function (cap) {
    return ('' + cap).startsWith(prefix);
  });
  var badPrefixedCaps = [];

  // Strip out the 'appium:' prefix
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = _getIterator(prefixedCaps), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var prefixedCap = _step5.value;

      var strippedCapName = prefixedCap.substr(prefix.length);

      // If it's standard capability that was prefixed, add it to an array of incorrectly prefixed capabilities
      if (isStandardCap(strippedCapName)) {
        badPrefixedCaps.push(strippedCapName);
      }

      // Strip out the prefix
      caps[strippedCapName] = caps[prefixedCap];
      delete caps[prefixedCap];
    }

    // If we found standard caps that were incorrectly prefixed, throw an exception (e.g.: don't accept 'appium:platformName', only accept just 'platformName')
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5['return']) {
        _iterator5['return']();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  if (badPrefixedCaps.length > 0) {
    throw new _protocolErrors.errors.InvalidArgumentError('The capabilities ' + JSON.stringify(badPrefixedCaps) + ' are standard capabilities and should not have the "appium:" prefix');
  }
}

/**
 * Get an array of all the unprefixed caps that are being used in 'alwaysMatch' and all of the 'firstMatch' object
 * @param {Object} caps A capabilities object
 */
function findNonPrefixedCaps(_ref) {
  var _ref$alwaysMatch = _ref.alwaysMatch;
  var alwaysMatch = _ref$alwaysMatch === undefined ? {} : _ref$alwaysMatch;
  var _ref$firstMatch = _ref.firstMatch;
  var firstMatch = _ref$firstMatch === undefined ? [] : _ref$firstMatch;

  return _lodash2['default'].chain([alwaysMatch].concat(_toConsumableArray(firstMatch))).reduce(function (unprefixedCaps, caps) {
    return [].concat(_toConsumableArray(unprefixedCaps), _toConsumableArray((0, _lodash2['default'])(caps).keys().filter(function (cap) {
      return !cap.includes(':') && !isStandardCap(cap);
    })));
  }, []).uniq().value();
}

// Parse capabilities (based on https://www.w3.org/TR/webdriver/#processing-capabilities)
function parseCaps(caps) {
  var constraints = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var shouldValidateCaps = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

  // If capabilities request is not an object, return error (#1.1)
  if (!_lodash2['default'].isPlainObject(caps)) {
    throw new _protocolErrors.errors.InvalidArgumentError('The capabilities argument was not valid for the following reason(s): "capabilities" must be a JSON object.');
  }

  // Let 'requiredCaps' be property named 'alwaysMatch' from capabilities request (#2) and 'allFirstMatchCaps' be property named 'firstMatch from capabilities request (#3)
  var _caps$alwaysMatch = // If 'firstMatch' is undefined set it to a singleton list with one empty object (#3.1)
  caps.alwaysMatch;
  var requiredCaps = _caps$alwaysMatch === undefined ? {} : _caps$alwaysMatch;
  var _caps$firstMatch = caps.firstMatch;
  var allFirstMatchCaps = _caps$firstMatch === undefined ? [{}] : _caps$firstMatch;

  // Reject 'firstMatch' argument if it's not an array (#3.2)
  if (!_lodash2['default'].isArray(allFirstMatchCaps)) {
    throw new _protocolErrors.errors.InvalidArgumentError('The capabilities.firstMatch argument was not valid for the following reason(s): "capabilities.firstMatch" must be a JSON array or undefined');
  }

  // If an empty array as provided, we'll be forgiving and make it an array of one empty object
  if (allFirstMatchCaps.length === 0) {
    allFirstMatchCaps.push({});
  }

  // Check for non-prefixed, non-standard capabilities and log warnings if they are found
  var nonPrefixedCaps = findNonPrefixedCaps(caps);
  if (!_lodash2['default'].isEmpty(nonPrefixedCaps)) {
    _logger2['default'].warn('The capabilities ' + JSON.stringify(nonPrefixedCaps) + ' are not standard capabilities and should have an extension prefix');
  }

  // Strip out the 'appium:' prefix from all
  stripAppiumPrefixes(requiredCaps);
  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (var _iterator6 = _getIterator(allFirstMatchCaps), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      var firstMatchCaps = _step6.value;

      stripAppiumPrefixes(firstMatchCaps);
    }

    // Validate the requiredCaps. But don't validate 'presence' because if that constraint fails on 'alwaysMatch' it could still pass on one of the 'firstMatch' keys
  } catch (err) {
    _didIteratorError6 = true;
    _iteratorError6 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion6 && _iterator6['return']) {
        _iterator6['return']();
      }
    } finally {
      if (_didIteratorError6) {
        throw _iteratorError6;
      }
    }
  }

  if (shouldValidateCaps) {
    requiredCaps = validateCaps(requiredCaps, constraints, { skipPresenceConstraint: true });
  }

  // Remove the 'presence' constraint for any keys that are already present in 'requiredCaps'
  // since we know that this constraint has already passed
  var filteredConstraints = _extends({}, constraints);
  var requiredCapsKeys = _lodash2['default'].keys(requiredCaps);
  var _iteratorNormalCompletion7 = true;
  var _didIteratorError7 = false;
  var _iteratorError7 = undefined;

  try {
    for (var _iterator7 = _getIterator(_lodash2['default'].keys(filteredConstraints)), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
      var key = _step7.value;

      if (requiredCapsKeys.includes(key)) {
        delete filteredConstraints[key];
      }
    }

    // Validate all of the first match capabilities and return an array with only the valid caps (see spec #5)
  } catch (err) {
    _didIteratorError7 = true;
    _iteratorError7 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion7 && _iterator7['return']) {
        _iterator7['return']();
      }
    } finally {
      if (_didIteratorError7) {
        throw _iteratorError7;
      }
    }
  }

  var validationErrors = [];
  var validatedFirstMatchCaps = allFirstMatchCaps.map(function (firstMatchCaps) {
    try {
      // Validate firstMatch caps
      return shouldValidateCaps ? validateCaps(firstMatchCaps, filteredConstraints) : firstMatchCaps;
    } catch (e) {
      validationErrors.push(e.message);
      return null;
    }
  }).filter(function (caps) {
    return !_lodash2['default'].isNull(caps);
  });

  // Try to merge requiredCaps with first match capabilities, break once it finds its first match (see spec #6)
  var matchedCaps = null;
  var _iteratorNormalCompletion8 = true;
  var _didIteratorError8 = false;
  var _iteratorError8 = undefined;

  try {
    for (var _iterator8 = _getIterator(validatedFirstMatchCaps), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
      var firstMatchCaps = _step8.value;

      try {
        matchedCaps = mergeCaps(requiredCaps, firstMatchCaps);
        if (matchedCaps) {
          break;
        }
      } catch (ign) {}
    }

    // Returns variables for testing purposes
  } catch (err) {
    _didIteratorError8 = true;
    _iteratorError8 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion8 && _iterator8['return']) {
        _iterator8['return']();
      }
    } finally {
      if (_didIteratorError8) {
        throw _iteratorError8;
      }
    }
  }

  return { requiredCaps: requiredCaps, allFirstMatchCaps: allFirstMatchCaps, validatedFirstMatchCaps: validatedFirstMatchCaps, matchedCaps: matchedCaps, validationErrors: validationErrors };
}

// Calls parseCaps and just returns the matchedCaps variable
function processCapabilities(caps) {
  var constraints = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var shouldValidateCaps = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

  var _parseCaps = parseCaps(caps, constraints, shouldValidateCaps);

  var matchedCaps = _parseCaps.matchedCaps;
  var validationErrors = _parseCaps.validationErrors;

  // If we found an error throw an exception
  if (_lodash2['default'].isNull(matchedCaps)) {
    if (_lodash2['default'].isArray(caps.firstMatch) && caps.firstMatch.length > 1) {
      // If there was more than one 'firstMatch' cap, indicate that we couldn't find a matching capabilities set and show all the errors
      throw new _protocolErrors.errors.InvalidArgumentError('Could not find matching capabilities from ' + JSON.stringify(caps) + ':\n ' + validationErrors.join('\n'));
    } else {
      // Otherwise, just show the singular error message
      throw new _protocolErrors.errors.InvalidArgumentError(validationErrors[0]);
    }
  }

  return matchedCaps;
}

exports['default'] = { parseCaps: parseCaps, processCapabilities: processCapabilities, validateCaps: validateCaps, mergeCaps: mergeCaps, findNonPrefixedCaps: findNonPrefixedCaps };
module.exports = exports['default'];
// If 'requiredCaps' is undefined, set it to an empty JSON object (#2.1)
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9iYXNlZHJpdmVyL2NhcGFiaWxpdGllcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7c0JBQWMsUUFBUTs7OzsyQkFDSSxnQkFBZ0I7OzZCQUNyQixnQkFBZ0I7O3NCQUNyQixVQUFVOzs7OzhCQUNILG9CQUFvQjs7OztBQUkzQyxTQUFTLFNBQVMsR0FBZ0M7TUFBOUIsT0FBTyx5REFBRyxFQUFFO01BQUUsU0FBUyx5REFBRyxFQUFFOztBQUM5QyxNQUFJLE1BQU0sR0FBRyxlQUFjLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQzs7Ozs7OztBQUV4QyxzQ0FBMEIsb0JBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyw0R0FBRTs7O1VBQXRDLEtBQUk7VUFBRSxLQUFLOzs7QUFFbkIsVUFBSSxDQUFDLG9CQUFFLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSSxDQUFDLENBQUMsRUFBRTtBQUNqQyxjQUFNLElBQUksdUJBQU8sb0JBQW9CLGlCQUFjLEtBQUksNkNBQXVDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLHlCQUFvQixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxjQUFXLENBQUM7T0FDL0s7QUFDRCxZQUFNLENBQUMsS0FBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO0tBQ3RCOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUQsU0FBTyxNQUFNLENBQUM7Q0FDZjs7O0FBR0QsU0FBUyxZQUFZLENBQUUsSUFBSSxFQUErQjtNQUE3QixXQUFXLHlEQUFHLEVBQUU7TUFBRSxJQUFJLHlEQUFHLEVBQUU7TUFFaEQsc0JBQXNCLEdBQUksSUFBSSxDQUE5QixzQkFBc0I7O0FBRTVCLE1BQUksQ0FBQyxvQkFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDMUIsVUFBTSxJQUFJLHVCQUFPLG9CQUFvQix5QkFBeUIsQ0FBQztHQUNoRTs7QUFFRCxhQUFXLEdBQUcsb0JBQUUsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDOztB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LEVBQUUsU0FBUyxFQUFULFNBQVMsRUFBRSxtQkFBbUIsRUFBbkIsbUJBQW1CLEVBQUUsWUFBWSxFQUFaLFlBQVksRUFBRSxTQUFTLEVBQVQsU0FBUyxFQUFFLG1CQUFtQixFQUFuQixtQkFBbUIsRUFBRSIsImZpbGUiOiJsaWIvYmFzZWRyaXZlci9jYXBhYmlsaXRpZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgdmFsaWRhdG9yIH0gZnJvbSAnLi9kZXNpcmVkLWNhcHMnO1xuaW1wb3J0IHsgdXRpbCB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IHsgZXJyb3JzIH0gZnJvbSAnLi4vcHJvdG9jb2wvZXJyb3JzJztcblxuLy8gVGFrZXMgcHJpbWFyeSBjYXBzIG9iamVjdCBhbmQgbWVyZ2VzIGl0IGludG8gYSBzZWNvbmRhcnkgY2FwcyBvYmplY3QuXG4vLyAoc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93ZWJkcml2ZXIvI2Rmbi1tZXJnaW5nLWNhcGFiaWxpdGllcylcbmZ1bmN0aW9uIG1lcmdlQ2FwcyAocHJpbWFyeSA9IHt9LCBzZWNvbmRhcnkgPSB7fSkge1xuICBsZXQgcmVzdWx0ID0gT2JqZWN0LmFzc2lnbih7fSwgcHJpbWFyeSk7XG5cbiAgZm9yIChsZXQgW25hbWUsIHZhbHVlXSBvZiBfLnRvUGFpcnMoc2Vjb25kYXJ5KSkge1xuICAgIC8vIE92ZXJ3cml0aW5nIGlzIG5vdCBhbGxvd2VkLiBQcmltYXJ5IGFuZCBzZWNvbmRhcnkgbXVzdCBoYXZlIGRpZmZlcmVudCBwcm9wZXJ0aWVzICh3M2MgcnVsZSA0LjQpXG4gICAgaWYgKCFfLmlzVW5kZWZpbmVkKHByaW1hcnlbbmFtZV0pKSB7XG4gICAgICB0aHJvdyBuZXcgZXJyb3JzLkludmFsaWRBcmd1bWVudEVycm9yKGBwcm9wZXJ0eSAnJHtuYW1lfScgc2hvdWxkIG5vdCBleGlzdCBvbiBib3RoIHByaW1hcnkgKCR7SlNPTi5zdHJpbmdpZnkocHJpbWFyeSl9KSBhbmQgc2Vjb25kYXJ5ICgke0pTT04uc3RyaW5naWZ5KHNlY29uZGFyeSl9KSBvYmplY3RgKTtcbiAgICB9XG4gICAgcmVzdWx0W25hbWVdID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vLyBWYWxpZGF0ZXMgY2FwcyBhZ2FpbnN0IGEgc2V0IG9mIGNvbnN0cmFpbnRzXG5mdW5jdGlvbiB2YWxpZGF0ZUNhcHMgKGNhcHMsIGNvbnN0cmFpbnRzID0ge30sIG9wdHMgPSB7fSkge1xuXG4gIGxldCAge3NraXBQcmVzZW5jZUNvbnN0cmFpbnR9ID0gb3B0cztcblxuICBpZiAoIV8uaXNQbGFpbk9iamVjdChjYXBzKSkge1xuICAgIHRocm93IG5ldyBlcnJvcnMuSW52YWxpZEFyZ3VtZW50RXJyb3IoYG11c3QgYmUgYSBKU09OIG9iamVjdGApO1xuICB9XG5cbiAgY29uc3RyYWludHMgPSBfLmNsb25lRGVlcChjb25zdHJhaW50cyk7IC8vIERlZmVuc2l2ZSBjb3B5XG5cbiAgaWYgKHNraXBQcmVzZW5jZUNvbnN0cmFpbnQpIHtcbiAgICAvLyBSZW1vdmUgdGhlICdwcmVzZW5jZScgY29uc3RyYWludCBpZiB3ZSdyZSBub3QgY2hlY2tpbmcgZm9yIGl0XG4gICAgZm9yIChsZXQga2V5IG9mIF8ua2V5cyhjb25zdHJhaW50cykpIHtcbiAgICAgIGRlbGV0ZSBjb25zdHJhaW50c1trZXldLnByZXNlbmNlO1xuICAgIH1cbiAgfVxuXG4gIGxldCB2YWxpZGF0aW9uRXJyb3JzID0gdmFsaWRhdG9yLnZhbGlkYXRlKF8ucGlja0J5KGNhcHMsIHV0aWwuaGFzVmFsdWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0cmFpbnRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtmdWxsTWVzc2FnZXM6IGZhbHNlfSk7XG5cbiAgaWYgKHZhbGlkYXRpb25FcnJvcnMpIHtcbiAgICBsZXQgbWVzc2FnZSA9IFtdO1xuICAgIGZvciAobGV0IFthdHRyaWJ1dGUsIHJlYXNvbnNdIG9mIF8udG9QYWlycyh2YWxpZGF0aW9uRXJyb3JzKSkge1xuICAgICAgZm9yIChsZXQgcmVhc29uIG9mIHJlYXNvbnMpIHtcbiAgICAgICAgbWVzc2FnZS5wdXNoKGAnJHthdHRyaWJ1dGV9JyAke3JlYXNvbn1gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgbmV3IGVycm9ycy5JbnZhbGlkQXJndW1lbnRFcnJvcihtZXNzYWdlLmpvaW4oJzsgJykpO1xuICB9XG5cbiAgLy8gUmV0dXJuIGNhcHNcbiAgcmV0dXJuIGNhcHM7XG59XG5cbi8vIFN0YW5kYXJkLCBub24tcHJlZml4ZWQgY2FwYWJpbGl0aWVzIChzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dlYmRyaXZlci8jZGZuLXRhYmxlLW9mLXN0YW5kYXJkLWNhcGFiaWxpdGllcylcbmNvbnN0IFNUQU5EQVJEX0NBUFMgPSBbXG4gICdicm93c2VyTmFtZScsXG4gICdicm93c2VyVmVyc2lvbicsXG4gICdwbGF0Zm9ybU5hbWUnLFxuICAnYWNjZXB0SW5zZWN1cmVDZXJ0cycsXG4gICdwYWdlTG9hZFN0cmF0ZWd5JyxcbiAgJ3Byb3h5JyxcbiAgJ3NldFdpbmRvd1JlY3QnLFxuICAndGltZW91dHMnLFxuICAndW5oYW5kbGVkUHJvbXB0QmVoYXZpb3InXG5dO1xuXG5mdW5jdGlvbiBpc1N0YW5kYXJkQ2FwIChjYXApIHtcbiAgcmV0dXJuICEhXy5maW5kKFNUQU5EQVJEX0NBUFMsIChzdGFuZGFyZENhcCkgPT4gc3RhbmRhcmRDYXAudG9Mb3dlckNhc2UoKSA9PT0gYCR7Y2FwfWAudG9Mb3dlckNhc2UoKSk7XG59XG5cbi8vIElmIHRoZSAnYXBwaXVtOicgcHJlZml4IHdhcyBwcm92aWRlZCBhbmQgaXQncyBhIHZhbGlkIGNhcGFiaWxpdHksIHN0cmlwIG91dCB0aGUgcHJlZml4IChzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dlYmRyaXZlci8jZGZuLWV4dGVuc2lvbi1jYXBhYmlsaXRpZXMpXG4vLyAoTk9URTogTWV0aG9kIGlzIGRlc3RydWN0aXZlIGFuZCBtdXRhdGVzIGNvbnRlbnRzIG9mIGNhcHMpXG5mdW5jdGlvbiBzdHJpcEFwcGl1bVByZWZpeGVzIChjYXBzKSB7XG4gIGNvbnN0IHByZWZpeCA9ICdhcHBpdW06JztcbiAgY29uc3QgcHJlZml4ZWRDYXBzID0gXy5maWx0ZXIoXy5rZXlzKGNhcHMpLCBjYXAgPT4gYCR7Y2FwfWAuc3RhcnRzV2l0aChwcmVmaXgpKTtcbiAgY29uc3QgYmFkUHJlZml4ZWRDYXBzID0gW107XG5cbiAgLy8gU3RyaXAgb3V0IHRoZSAnYXBwaXVtOicgcHJlZml4XG4gIGZvciAobGV0IHByZWZpeGVkQ2FwIG9mIHByZWZpeGVkQ2Fwcykge1xuICAgIGNvbnN0IHN0cmlwcGVkQ2FwTmFtZSA9IHByZWZpeGVkQ2FwLnN1YnN0cihwcmVmaXgubGVuZ3RoKTtcblxuICAgIC8vIElmIGl0J3Mgc3RhbmRhcmQgY2FwYWJpbGl0eSB0aGF0IHdhcyBwcmVmaXhlZCwgYWRkIGl0IHRvIGFuIGFycmF5IG9mIGluY29ycmVjdGx5IHByZWZpeGVkIGNhcGFiaWxpdGllc1xuICAgIGlmIChpc1N0YW5kYXJkQ2FwKHN0cmlwcGVkQ2FwTmFtZSkpIHtcbiAgICAgIGJhZFByZWZpeGVkQ2Fwcy5wdXNoKHN0cmlwcGVkQ2FwTmFtZSk7XG4gICAgfVxuXG4gICAgLy8gU3RyaXAgb3V0IHRoZSBwcmVmaXhcbiAgICBjYXBzW3N0cmlwcGVkQ2FwTmFtZV0gPSBjYXBzW3ByZWZpeGVkQ2FwXTtcbiAgICBkZWxldGUgY2Fwc1twcmVmaXhlZENhcF07XG4gIH1cblxuICAvLyBJZiB3ZSBmb3VuZCBzdGFuZGFyZCBjYXBzIHRoYXQgd2VyZSBpbmNvcnJlY3RseSBwcmVmaXhlZCwgdGhyb3cgYW4gZXhjZXB0aW9uIChlLmcuOiBkb24ndCBhY2NlcHQgJ2FwcGl1bTpwbGF0Zm9ybU5hbWUnLCBvbmx5IGFjY2VwdCBqdXN0ICdwbGF0Zm9ybU5hbWUnKVxuICBpZiAoYmFkUHJlZml4ZWRDYXBzLmxlbmd0aCA+IDApIHtcbiAgICB0aHJvdyBuZXcgZXJyb3JzLkludmFsaWRBcmd1bWVudEVycm9yKGBUaGUgY2FwYWJpbGl0aWVzICR7SlNPTi5zdHJpbmdpZnkoYmFkUHJlZml4ZWRDYXBzKX0gYXJlIHN0YW5kYXJkIGNhcGFiaWxpdGllcyBhbmQgc2hvdWxkIG5vdCBoYXZlIHRoZSBcImFwcGl1bTpcIiBwcmVmaXhgKTtcbiAgfVxufVxuXG4vKipcbiAqIEdldCBhbiBhcnJheSBvZiBhbGwgdGhlIHVucHJlZml4ZWQgY2FwcyB0aGF0IGFyZSBiZWluZyB1c2VkIGluICdhbHdheXNNYXRjaCcgYW5kIGFsbCBvZiB0aGUgJ2ZpcnN0TWF0Y2gnIG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IGNhcHMgQSBjYXBhYmlsaXRpZXMgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGZpbmROb25QcmVmaXhlZENhcHMgKHthbHdheXNNYXRjaD17fSwgZmlyc3RNYXRjaD1bXX0pIHtcbiAgcmV0dXJuIF8uY2hhaW4oW2Fsd2F5c01hdGNoLCAuLi5maXJzdE1hdGNoXSlcbiAgICAucmVkdWNlKCh1bnByZWZpeGVkQ2FwcywgY2FwcykgPT4gW1xuICAgICAgLi4udW5wcmVmaXhlZENhcHMsXG4gICAgICAuLi5fKGNhcHMpLmtleXMoKS5maWx0ZXIoKGNhcCkgPT4gIWNhcC5pbmNsdWRlcygnOicpICYmICFpc1N0YW5kYXJkQ2FwKGNhcCkpLFxuICAgIF0sIFtdKVxuICAgIC51bmlxKClcbiAgICAudmFsdWUoKTtcbn1cblxuLy8gUGFyc2UgY2FwYWJpbGl0aWVzIChiYXNlZCBvbiBodHRwczovL3d3dy53My5vcmcvVFIvd2ViZHJpdmVyLyNwcm9jZXNzaW5nLWNhcGFiaWxpdGllcylcbmZ1bmN0aW9uIHBhcnNlQ2FwcyAoY2FwcywgY29uc3RyYWludHMgPSB7fSwgc2hvdWxkVmFsaWRhdGVDYXBzID0gdHJ1ZSkge1xuICAvLyBJZiBjYXBhYmlsaXRpZXMgcmVxdWVzdCBpcyBub3QgYW4gb2JqZWN0LCByZXR1cm4gZXJyb3IgKCMxLjEpXG4gIGlmICghXy5pc1BsYWluT2JqZWN0KGNhcHMpKSB7XG4gICAgdGhyb3cgbmV3IGVycm9ycy5JbnZhbGlkQXJndW1lbnRFcnJvcignVGhlIGNhcGFiaWxpdGllcyBhcmd1bWVudCB3YXMgbm90IHZhbGlkIGZvciB0aGUgZm9sbG93aW5nIHJlYXNvbihzKTogXCJjYXBhYmlsaXRpZXNcIiBtdXN0IGJlIGEgSlNPTiBvYmplY3QuJyk7XG4gIH1cblxuICAvLyBMZXQgJ3JlcXVpcmVkQ2FwcycgYmUgcHJvcGVydHkgbmFtZWQgJ2Fsd2F5c01hdGNoJyBmcm9tIGNhcGFiaWxpdGllcyByZXF1ZXN0ICgjMikgYW5kICdhbGxGaXJzdE1hdGNoQ2FwcycgYmUgcHJvcGVydHkgbmFtZWQgJ2ZpcnN0TWF0Y2ggZnJvbSBjYXBhYmlsaXRpZXMgcmVxdWVzdCAoIzMpXG4gIGxldCB7XG4gICAgYWx3YXlzTWF0Y2g6IHJlcXVpcmVkQ2FwcyA9IHt9LCAvLyBJZiAncmVxdWlyZWRDYXBzJyBpcyB1bmRlZmluZWQsIHNldCBpdCB0byBhbiBlbXB0eSBKU09OIG9iamVjdCAoIzIuMSlcbiAgICBmaXJzdE1hdGNoOiBhbGxGaXJzdE1hdGNoQ2FwcyA9IFt7fV0sIC8vIElmICdmaXJzdE1hdGNoJyBpcyB1bmRlZmluZWQgc2V0IGl0IHRvIGEgc2luZ2xldG9uIGxpc3Qgd2l0aCBvbmUgZW1wdHkgb2JqZWN0ICgjMy4xKVxuICB9ID0gY2FwcztcblxuICAvLyBSZWplY3QgJ2ZpcnN0TWF0Y2gnIGFyZ3VtZW50IGlmIGl0J3Mgbm90IGFuIGFycmF5ICgjMy4yKVxuICBpZiAoIV8uaXNBcnJheShhbGxGaXJzdE1hdGNoQ2FwcykpIHtcbiAgICB0aHJvdyBuZXcgZXJyb3JzLkludmFsaWRBcmd1bWVudEVycm9yKCdUaGUgY2FwYWJpbGl0aWVzLmZpcnN0TWF0Y2ggYXJndW1lbnQgd2FzIG5vdCB2YWxpZCBmb3IgdGhlIGZvbGxvd2luZyByZWFzb24ocyk6IFwiY2FwYWJpbGl0aWVzLmZpcnN0TWF0Y2hcIiBtdXN0IGJlIGEgSlNPTiBhcnJheSBvciB1bmRlZmluZWQnKTtcbiAgfVxuXG4gIC8vIElmIGFuIGVtcHR5IGFycmF5IGFzIHByb3ZpZGVkLCB3ZSdsbCBiZSBmb3JnaXZpbmcgYW5kIG1ha2UgaXQgYW4gYXJyYXkgb2Ygb25lIGVtcHR5IG9iamVjdFxuICBpZiAoYWxsRmlyc3RNYXRjaENhcHMubGVuZ3RoID09PSAwKSB7XG4gICAgYWxsRmlyc3RNYXRjaENhcHMucHVzaCh7fSk7XG4gIH1cblxuICAvLyBDaGVjayBmb3Igbm9uLXByZWZpeGVkLCBub24tc3RhbmRhcmQgY2FwYWJpbGl0aWVzIGFuZCBsb2cgd2FybmluZ3MgaWYgdGhleSBhcmUgZm91bmRcbiAgbGV0IG5vblByZWZpeGVkQ2FwcyA9IGZpbmROb25QcmVmaXhlZENhcHMoY2Fwcyk7XG4gIGlmICghXy5pc0VtcHR5KG5vblByZWZpeGVkQ2FwcykpIHtcbiAgICBsb2cud2FybihgVGhlIGNhcGFiaWxpdGllcyAke0pTT04uc3RyaW5naWZ5KG5vblByZWZpeGVkQ2Fwcyl9IGFyZSBub3Qgc3RhbmRhcmQgY2FwYWJpbGl0aWVzIGFuZCBzaG91bGQgaGF2ZSBhbiBleHRlbnNpb24gcHJlZml4YCk7XG4gIH1cblxuICAvLyBTdHJpcCBvdXQgdGhlICdhcHBpdW06JyBwcmVmaXggZnJvbSBhbGxcbiAgc3RyaXBBcHBpdW1QcmVmaXhlcyhyZXF1aXJlZENhcHMpO1xuICBmb3IgKGxldCBmaXJzdE1hdGNoQ2FwcyBvZiBhbGxGaXJzdE1hdGNoQ2Fwcykge1xuICAgIHN0cmlwQXBwaXVtUHJlZml4ZXMoZmlyc3RNYXRjaENhcHMpO1xuICB9XG5cbiAgLy8gVmFsaWRhdGUgdGhlIHJlcXVpcmVkQ2Fwcy4gQnV0IGRvbid0IHZhbGlkYXRlICdwcmVzZW5jZScgYmVjYXVzZSBpZiB0aGF0IGNvbnN0cmFpbnQgZmFpbHMgb24gJ2Fsd2F5c01hdGNoJyBpdCBjb3VsZCBzdGlsbCBwYXNzIG9uIG9uZSBvZiB0aGUgJ2ZpcnN0TWF0Y2gnIGtleXNcbiAgaWYgKHNob3VsZFZhbGlkYXRlQ2Fwcykge1xuICAgIHJlcXVpcmVkQ2FwcyA9IHZhbGlkYXRlQ2FwcyhyZXF1aXJlZENhcHMsIGNvbnN0cmFpbnRzLCB7c2tpcFByZXNlbmNlQ29uc3RyYWludDogdHJ1ZX0pO1xuICB9XG5cblxuICAvLyBSZW1vdmUgdGhlICdwcmVzZW5jZScgY29uc3RyYWludCBmb3IgYW55IGtleXMgdGhhdCBhcmUgYWxyZWFkeSBwcmVzZW50IGluICdyZXF1aXJlZENhcHMnXG4gIC8vIHNpbmNlIHdlIGtub3cgdGhhdCB0aGlzIGNvbnN0cmFpbnQgaGFzIGFscmVhZHkgcGFzc2VkXG4gIGxldCBmaWx0ZXJlZENvbnN0cmFpbnRzID0gey4uLmNvbnN0cmFpbnRzfTtcbiAgbGV0IHJlcXVpcmVkQ2Fwc0tleXMgPSBfLmtleXMocmVxdWlyZWRDYXBzKTtcbiAgZm9yIChsZXQga2V5IG9mIF8ua2V5cyhmaWx0ZXJlZENvbnN0cmFpbnRzKSkge1xuICAgIGlmIChyZXF1aXJlZENhcHNLZXlzLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgIGRlbGV0ZSBmaWx0ZXJlZENvbnN0cmFpbnRzW2tleV07XG4gICAgfVxuICB9XG5cbiAgLy8gVmFsaWRhdGUgYWxsIG9mIHRoZSBmaXJzdCBtYXRjaCBjYXBhYmlsaXRpZXMgYW5kIHJldHVybiBhbiBhcnJheSB3aXRoIG9ubHkgdGhlIHZhbGlkIGNhcHMgKHNlZSBzcGVjICM1KVxuICBsZXQgdmFsaWRhdGlvbkVycm9ycyA9IFtdO1xuICBsZXQgdmFsaWRhdGVkRmlyc3RNYXRjaENhcHMgPSBhbGxGaXJzdE1hdGNoQ2Fwcy5tYXAoKGZpcnN0TWF0Y2hDYXBzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIFZhbGlkYXRlIGZpcnN0TWF0Y2ggY2Fwc1xuICAgICAgcmV0dXJuIHNob3VsZFZhbGlkYXRlQ2FwcyA/IHZhbGlkYXRlQ2FwcyhmaXJzdE1hdGNoQ2FwcywgZmlsdGVyZWRDb25zdHJhaW50cykgOiBmaXJzdE1hdGNoQ2FwcztcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB2YWxpZGF0aW9uRXJyb3JzLnB1c2goZS5tZXNzYWdlKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfSkuZmlsdGVyKChjYXBzKSA9PiAhXy5pc051bGwoY2FwcykpO1xuXG4gIC8vIFRyeSB0byBtZXJnZSByZXF1aXJlZENhcHMgd2l0aCBmaXJzdCBtYXRjaCBjYXBhYmlsaXRpZXMsIGJyZWFrIG9uY2UgaXQgZmluZHMgaXRzIGZpcnN0IG1hdGNoIChzZWUgc3BlYyAjNilcbiAgbGV0IG1hdGNoZWRDYXBzID0gbnVsbDtcbiAgZm9yIChsZXQgZmlyc3RNYXRjaENhcHMgb2YgdmFsaWRhdGVkRmlyc3RNYXRjaENhcHMpIHtcbiAgICB0cnkge1xuICAgICAgbWF0Y2hlZENhcHMgPSBtZXJnZUNhcHMocmVxdWlyZWRDYXBzLCBmaXJzdE1hdGNoQ2Fwcyk7XG4gICAgICBpZiAobWF0Y2hlZENhcHMpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoaWduKSB7IH1cbiAgfVxuXG4gIC8vIFJldHVybnMgdmFyaWFibGVzIGZvciB0ZXN0aW5nIHB1cnBvc2VzXG4gIHJldHVybiB7cmVxdWlyZWRDYXBzLCBhbGxGaXJzdE1hdGNoQ2FwcywgdmFsaWRhdGVkRmlyc3RNYXRjaENhcHMsIG1hdGNoZWRDYXBzLCB2YWxpZGF0aW9uRXJyb3JzfTtcbn1cblxuLy8gQ2FsbHMgcGFyc2VDYXBzIGFuZCBqdXN0IHJldHVybnMgdGhlIG1hdGNoZWRDYXBzIHZhcmlhYmxlXG5mdW5jdGlvbiBwcm9jZXNzQ2FwYWJpbGl0aWVzIChjYXBzLCBjb25zdHJhaW50cyA9IHt9LCBzaG91bGRWYWxpZGF0ZUNhcHMgPSB0cnVlKSB7XG4gIGNvbnN0IHttYXRjaGVkQ2FwcywgdmFsaWRhdGlvbkVycm9yc30gPSBwYXJzZUNhcHMoY2FwcywgY29uc3RyYWludHMsIHNob3VsZFZhbGlkYXRlQ2Fwcyk7XG5cbiAgLy8gSWYgd2UgZm91bmQgYW4gZXJyb3IgdGhyb3cgYW4gZXhjZXB0aW9uXG4gIGlmIChfLmlzTnVsbChtYXRjaGVkQ2FwcykpIHtcbiAgICBpZiAoXy5pc0FycmF5KGNhcHMuZmlyc3RNYXRjaCkgJiYgY2Fwcy5maXJzdE1hdGNoLmxlbmd0aCA+IDEpIHtcbiAgICAgIC8vIElmIHRoZXJlIHdhcyBtb3JlIHRoYW4gb25lICdmaXJzdE1hdGNoJyBjYXAsIGluZGljYXRlIHRoYXQgd2UgY291bGRuJ3QgZmluZCBhIG1hdGNoaW5nIGNhcGFiaWxpdGllcyBzZXQgYW5kIHNob3cgYWxsIHRoZSBlcnJvcnNcbiAgICAgIHRocm93IG5ldyBlcnJvcnMuSW52YWxpZEFyZ3VtZW50RXJyb3IoYENvdWxkIG5vdCBmaW5kIG1hdGNoaW5nIGNhcGFiaWxpdGllcyBmcm9tICR7SlNPTi5zdHJpbmdpZnkoY2Fwcyl9OlxcbiAke3ZhbGlkYXRpb25FcnJvcnMuam9pbignXFxuJyl9YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE90aGVyd2lzZSwganVzdCBzaG93IHRoZSBzaW5ndWxhciBlcnJvciBtZXNzYWdlXG4gICAgICB0aHJvdyBuZXcgZXJyb3JzLkludmFsaWRBcmd1bWVudEVycm9yKHZhbGlkYXRpb25FcnJvcnNbMF0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBtYXRjaGVkQ2Fwcztcbn1cblxuXG5leHBvcnQgZGVmYXVsdCB7IHBhcnNlQ2FwcywgcHJvY2Vzc0NhcGFiaWxpdGllcywgdmFsaWRhdGVDYXBzLCBtZXJnZUNhcHMsIGZpbmROb25QcmVmaXhlZENhcHMgfTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4ifQ==
