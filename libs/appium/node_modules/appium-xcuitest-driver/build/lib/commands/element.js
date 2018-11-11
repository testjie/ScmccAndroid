'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumBaseDriver = require('appium-base-driver');

var _appiumIosDriver = require('appium-ios-driver');

var _appiumSupport = require('appium-support');

var _asyncbox = require('asyncbox');

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var commands = {},
    extensions = {};

// pull in all the element commands and helpers from ios-driver,
// then override anything we want below
_Object$assign(extensions, _appiumIosDriver.iosCommands.element);

commands.getAttribute = function callee$0$0(attribute, el) {
  var value, atomsElement;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        el = _appiumSupport.util.unwrapElement(el);

        if (this.isWebContext()) {
          context$1$0.next = 11;
          break;
        }

        if (!(attribute === "contentSize")) {
          context$1$0.next = 6;
          break;
        }

        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.getContentSize(el));

      case 5:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 6:
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.proxyCommand('/element/' + el + '/attribute/' + attribute, 'GET'));

      case 8:
        value = context$1$0.sent;

        // Transform the result for the case when WDA returns an integer representation for a boolean value
        if ([0, 1].indexOf(value) !== -1) {
          value = !!value;
        }
        // The returned value must be of type string according to https://www.w3.org/TR/webdriver/#get-element-attribute
        return context$1$0.abrupt('return', _lodash2['default'].isNull(value) || _lodash2['default'].isString(value) ? value : JSON.stringify(value));

      case 11:
        atomsElement = this.getAtomsElement(el);

        if (!_lodash2['default'].isNull(atomsElement)) {
          context$1$0.next = 14;
          break;
        }

        throw new _appiumBaseDriver.errors.UnknownError('Error converting element ID for using in WD atoms: \'' + el);

      case 14:
        context$1$0.next = 16;
        return _regeneratorRuntime.awrap(this.executeAtom('get_attribute_value', [atomsElement, attribute]));

      case 16:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 17:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getText = function callee$0$0(el) {
  var atomsElement;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        el = _appiumSupport.util.unwrapElement(el);

        if (this.isWebContext()) {
          context$1$0.next = 5;
          break;
        }

        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.proxyCommand('/element/' + el + '/text', 'GET'));

      case 4:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 5:
        atomsElement = this.useAtomsElement(el);
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.executeAtom('get_text', [atomsElement]));

      case 8:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getRect = function callee$0$0(el) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        el = _appiumSupport.util.unwrapElement(el);

        if (!this.isWebContext()) {
          context$1$0.next = 3;
          break;
        }

        throw new _appiumBaseDriver.errors.NotYetImplementedError('Support for getRect for webcontext is not yet implemented. Please contact an Appium dev');

      case 3:
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.getNativeRect(el));

      case 5:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

extensions.getNativeRect = function callee$0$0(el) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.proxyCommand('/element/' + el + '/rect', 'GET'));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getLocation = function callee$0$0(el) {
  var atomsElement, loc, script, _ref, _ref2, xOffset, yOffset, rect;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        el = el.ELEMENT ? el.ELEMENT : el;

        if (!this.isWebContext()) {
          context$1$0.next = 21;
          break;
        }

        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.useAtomsElement(el));

      case 4:
        atomsElement = context$1$0.sent;
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.executeAtom('get_top_left_coordinates', [atomsElement]));

      case 7:
        loc = context$1$0.sent;

        if (!this.opts.absoluteWebLocations) {
          context$1$0.next = 18;
          break;
        }

        script = 'return [document.body.scrollLeft, document.body.scrollTop];';
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(this.execute(script));

      case 12:
        _ref = context$1$0.sent;
        _ref2 = _slicedToArray(_ref, 2);
        xOffset = _ref2[0];
        yOffset = _ref2[1];

        loc.x += xOffset;
        loc.y += yOffset;

      case 18:
        return context$1$0.abrupt('return', loc);

      case 21:
        context$1$0.next = 23;
        return _regeneratorRuntime.awrap(this.getRect(el));

      case 23:
        rect = context$1$0.sent;
        return context$1$0.abrupt('return', { x: rect.x, y: rect.y });

      case 25:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getLocationInView = function callee$0$0(el) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getLocation(el));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getSize = function callee$0$0(el) {
  var atomsElement, rect;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        el = el.ELEMENT ? el.ELEMENT : el;

        if (!this.isWebContext()) {
          context$1$0.next = 12;
          break;
        }

        atomsElement = this.getAtomsElement(el);

        if (!(atomsElement === null)) {
          context$1$0.next = 7;
          break;
        }

        throw new _appiumBaseDriver.errors.UnknownError('Error converting element ID for using in WD atoms: \'' + el + '\'');

      case 7:
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(this.executeAtom('get_size', [atomsElement]));

      case 9:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 10:
        context$1$0.next = 16;
        break;

      case 12:
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(this.getRect(el));

      case 14:
        rect = context$1$0.sent;
        return context$1$0.abrupt('return', { width: rect.width, height: rect.height });

      case 16:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

function hasSpecialKeys(keys) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(keys), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var char = _step.value;

      if (isSpecialKey(char)) {
        return true;
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

  return false;
}

function isSpecialKey(k) {
  if (k === '' || k === '') {
    // BACKSPACE or DELETE
    return true;
  } else if (k === '' || k === '') {
    // RETURN or ENTER
    return true;
  }
  return false;
}

function translateKey(k) {
  if (k === '' || k === '') {
    // RETURN or ENTER
    return '\n';
  } else if (k === '' || k === '') {
    // BACKSPACE or DELETE
    return '\b';
  }
  return k;
}

extensions.bringUpKeyboard = function callee$0$0(element) {
  var implicitWaitMs;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        implicitWaitMs = this.implicitWaitMs;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.setImplicitWait(0));

      case 3:
        context$1$0.prev = 3;
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(10, 10, function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.prev = 0;
                context$2$0.next = 3;
                return _regeneratorRuntime.awrap(this.findNativeElementOrElements('class name', 'XCUIElementTypeKeyboard', false));

              case 3:
                _logger2['default'].debug('Keyboard found. Continuing with text input.');
                context$2$0.next = 13;
                break;

              case 6:
                context$2$0.prev = 6;
                context$2$0.t0 = context$2$0['catch'](0);

                // no keyboard found
                _logger2['default'].debug('No keyboard found. Clicking element to open it.');
                context$2$0.next = 11;
                return _regeneratorRuntime.awrap(this.nativeClick(element));

              case 11:
                context$2$0.next = 13;
                return _regeneratorRuntime.awrap(this.findNativeElementOrElements('class name', 'XCUIElementTypeKeyboard', false));

              case 13:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this, [[0, 6]]);
        }));

      case 6:
        context$1$0.prev = 6;
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(this.setImplicitWait(implicitWaitMs));

      case 9:
        return context$1$0.finish(6);

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[3,, 6, 10]]);
};

commands.setValueImmediate = function callee$0$0(value, el) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        // WDA does not provide no way to set the value directly
        _logger2['default'].info('There is currently no way to bypass typing using XCUITest. Setting value through keyboard');
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.setValue(value, el));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.setValue = function callee$0$0(value, el) {
  var atomsElement, setFormattedValue, buffer, isFirstChar, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, k, char;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this2 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        el = _appiumSupport.util.unwrapElement(el);

        if (!this.isWebContext()) {
          context$1$0.next = 9;
          break;
        }

        atomsElement = this.useAtomsElement(el);
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.executeAtom('click', [atomsElement]));

      case 5:
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.executeAtom('type', [atomsElement, value]));

      case 7:
        context$1$0.next = 56;
        break;

      case 9:
        setFormattedValue = function setFormattedValue(input, isKeyboardPresenceCheckEnabled) {
          return _regeneratorRuntime.async(function setFormattedValue$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                if (typeof input !== 'string' && !(input instanceof Array)) {
                  input = input.toString().split('');
                }
                context$2$0.prev = 1;
                context$2$0.next = 4;
                return _regeneratorRuntime.awrap(this.proxyCommand('/element/' + el + '/value', 'POST', { value: input }));

              case 4:
                context$2$0.next = 23;
                break;

              case 6:
                context$2$0.prev = 6;
                context$2$0.t0 = context$2$0['catch'](1);
                context$2$0.t1 = isKeyboardPresenceCheckEnabled;

                if (!context$2$0.t1) {
                  context$2$0.next = 14;
                  break;
                }

                context$2$0.next = 12;
                return _regeneratorRuntime.awrap(this.getAttribute('type', el));

              case 12:
                context$2$0.t2 = context$2$0.sent;
                context$2$0.t1 = context$2$0.t2 === 'XCUIElementTypeTextField';

              case 14:
                if (!context$2$0.t1) {
                  context$2$0.next = 22;
                  break;
                }

                _logger2['default'].info('Cannot type in the text field because of ' + context$2$0.t0 + '.\nTrying to apply a workaround...');
                context$2$0.next = 18;
                return _regeneratorRuntime.awrap(this.bringUpKeyboard(el));

              case 18:
                context$2$0.next = 20;
                return _regeneratorRuntime.awrap(this.proxyCommand('/element/' + el + '/value', 'POST', { value: input }));

              case 20:
                context$2$0.next = 23;
                break;

              case 22:
                throw context$2$0.t0;

              case 23:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this2, [[1, 6]]);
        };

        if (!(_lodash2['default'].isNull(value) || _lodash2['default'].isUndefined(value) || _lodash2['default'].isPlainObject(value))) {
          context$1$0.next = 12;
          break;
        }

        throw new Error('Only strings and arrays of strings are supported as input arguments. Received: \'' + JSON.stringify(value) + '\'');

      case 12:
        if (_lodash2['default'].isArray(value)) {
          // make sure that all the strings inside are a single character long
          value = _lodash2['default'].flatMap(value, function (v) {
            return (_lodash2['default'].isString(v) ? v : JSON.stringify(v)).split('');
          });
        } else {
          // make it into an array of characters
          value = (value || '').toString().split('');
        }

        if (hasSpecialKeys(value)) {
          context$1$0.next = 17;
          break;
        }

        context$1$0.next = 16;
        return _regeneratorRuntime.awrap(setFormattedValue(value, true));

      case 16:
        return context$1$0.abrupt('return');

      case 17:
        buffer = [];
        isFirstChar = true;
        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = undefined;
        context$1$0.prev = 22;
        _iterator2 = _getIterator(value);

      case 24:
        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
          context$1$0.next = 39;
          break;
        }

        k = _step2.value;
        char = translateKey(k);

        if (!(char === k)) {
          context$1$0.next = 30;
          break;
        }

        buffer.push(char);
        return context$1$0.abrupt('continue', 36);

      case 30:
        context$1$0.next = 32;
        return _regeneratorRuntime.awrap(setFormattedValue(buffer, isFirstChar));

      case 32:
        isFirstChar = false;
        buffer = [];

        // write the character
        context$1$0.next = 36;
        return _regeneratorRuntime.awrap(setFormattedValue([char], isFirstChar));

      case 36:
        _iteratorNormalCompletion2 = true;
        context$1$0.next = 24;
        break;

      case 39:
        context$1$0.next = 45;
        break;

      case 41:
        context$1$0.prev = 41;
        context$1$0.t0 = context$1$0['catch'](22);
        _didIteratorError2 = true;
        _iteratorError2 = context$1$0.t0;

      case 45:
        context$1$0.prev = 45;
        context$1$0.prev = 46;

        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }

      case 48:
        context$1$0.prev = 48;

        if (!_didIteratorError2) {
          context$1$0.next = 51;
          break;
        }

        throw _iteratorError2;

      case 51:
        return context$1$0.finish(48);

      case 52:
        return context$1$0.finish(45);

      case 53:
        if (!buffer.length) {
          context$1$0.next = 56;
          break;
        }

        context$1$0.next = 56;
        return _regeneratorRuntime.awrap(setFormattedValue(buffer, false));

      case 56:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[22, 41, 45, 53], [46,, 48, 52]]);
};

commands.keys = function callee$0$0(value) {
  var buffer, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, k, char;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (_lodash2['default'].isArray(value)) {
          // concatenate any individual strings
          value = value.join('');
        }
        if (_lodash2['default'].isString(value)) {
          // split into component characters
          value = value.split('');
        }

        buffer = [];
        _iteratorNormalCompletion3 = true;
        _didIteratorError3 = false;
        _iteratorError3 = undefined;
        context$1$0.prev = 6;

        for (_iterator3 = _getIterator(value); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          k = _step3.value;
          char = translateKey(k);

          buffer.push(char);
        }
        context$1$0.next = 14;
        break;

      case 10:
        context$1$0.prev = 10;
        context$1$0.t0 = context$1$0['catch'](6);
        _didIteratorError3 = true;
        _iteratorError3 = context$1$0.t0;

      case 14:
        context$1$0.prev = 14;
        context$1$0.prev = 15;

        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
          _iterator3['return']();
        }

      case 17:
        context$1$0.prev = 17;

        if (!_didIteratorError3) {
          context$1$0.next = 20;
          break;
        }

        throw _iteratorError3;

      case 20:
        return context$1$0.finish(17);

      case 21:
        return context$1$0.finish(14);

      case 22:
        context$1$0.next = 24;
        return _regeneratorRuntime.awrap(this.proxyCommand('/wda/keys', 'POST', { value: buffer }));

      case 24:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[6, 10, 14, 22], [15,, 17, 21]]);
};

commands.clear = function callee$0$0(el) {
  var atomsElement;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        el = _appiumSupport.util.unwrapElement(el);

        if (!this.isWebContext()) {
          context$1$0.next = 6;
          break;
        }

        atomsElement = this.useAtomsElement(el);
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.executeAtom('clear', [atomsElement]));

      case 5:
        return context$1$0.abrupt('return');

      case 6:
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap((0, _asyncbox.retry)(5, this.proxyCommand.bind(this), '/element/' + el + '/clear', 'POST'));

      case 8:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getContentSize = function callee$0$0(el) {
  var type, locator, contentHeight, children, rect, firstRect, lastRect, elsInRow, initialRects, i, spaceBetweenEls, numRows, size, origin;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.isWebContext()) {
          context$1$0.next = 2;
          break;
        }

        throw new _appiumBaseDriver.errors.NotYetImplementedError('Support for getContentSize for webcontext is not yet implemented. Please contact an Appium dev');

      case 2:
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.getAttribute('type', el));

      case 4:
        type = context$1$0.sent;

        if (!(type !== "XCUIElementTypeTable" && type !== "XCUIElementTypeCollectionView")) {
          context$1$0.next = 7;
          break;
        }

        throw new Error('Can\'t get content size for type \'' + type + '\', only for ' + 'tables and collection views');

      case 7:
        locator = "*";

        if (type === "XCUIElementTypeTable") {
          // only find table cells, not just any children
          locator = "XCUIElementTypeCell";
        }

        contentHeight = 0;
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(this.findElOrEls('class chain', locator, true, el));

      case 12:
        children = context$1$0.sent;

        if (!(children.length === 1)) {
          context$1$0.next = 20;
          break;
        }

        context$1$0.next = 16;
        return _regeneratorRuntime.awrap(this.getRect(_lodash2['default'].head(children)));

      case 16:
        rect = context$1$0.sent;

        contentHeight = rect.height;
        context$1$0.next = 54;
        break;

      case 20:
        if (!children.length) {
          context$1$0.next = 54;
          break;
        }

        context$1$0.t0 = type;
        context$1$0.next = context$1$0.t0 === "XCUIElementTypeTable" ? 24 : context$1$0.t0 === "XCUIElementTypeCollectionView" ? 32 : 53;
        break;

      case 24:
        context$1$0.next = 26;
        return _regeneratorRuntime.awrap(this.getRect(_lodash2['default'].head(children)));

      case 26:
        firstRect = context$1$0.sent;
        context$1$0.next = 29;
        return _regeneratorRuntime.awrap(this.getRect(_lodash2['default'].last(children)));

      case 29:
        lastRect = context$1$0.sent;

        contentHeight = lastRect.y + lastRect.height - firstRect.y;
        return context$1$0.abrupt('break', 54);

      case 32:
        elsInRow = 1;
        context$1$0.next = 35;
        return _regeneratorRuntime.awrap(this.getRect(_lodash2['default'].head(children)));

      case 35:
        firstRect = context$1$0.sent;
        initialRects = [firstRect];
        i = 1;

      case 38:
        if (!(i < children.length)) {
          context$1$0.next = 49;
          break;
        }

        context$1$0.next = 41;
        return _regeneratorRuntime.awrap(this.getRect(children[i]));

      case 41:
        rect = context$1$0.sent;

        initialRects.push(rect);

        if (!(rect.y !== firstRect.y)) {
          context$1$0.next = 46;
          break;
        }

        elsInRow = i;
        return context$1$0.abrupt('break', 49);

      case 46:
        i++;
        context$1$0.next = 38;
        break;

      case 49:
        spaceBetweenEls = initialRects[elsInRow].y - initialRects[elsInRow - 1].y - initialRects[elsInRow - 1].height;
        numRows = Math.ceil(children.length / elsInRow);

        // assume all cells are the same height
        contentHeight = numRows * firstRect.height + spaceBetweenEls * (numRows - 1);
        return context$1$0.abrupt('break', 54);

      case 53:
        throw new Error('Programming error: type \'' + type + '\' was not ' + 'valid but should have already been rejected');

      case 54:
        context$1$0.next = 56;
        return _regeneratorRuntime.awrap(this.getSize(el));

      case 56:
        size = context$1$0.sent;
        context$1$0.next = 59;
        return _regeneratorRuntime.awrap(this.getLocationInView(el));

      case 59:
        origin = context$1$0.sent;
        return context$1$0.abrupt('return', JSON.stringify({
          width: size.width,
          height: size.height,
          top: origin.y,
          left: origin.x,
          scrollableOffset: contentHeight
        }));

      case 61:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.isKeyboardShown = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.findNativeElementOrElements('class name', 'XCUIElementTypeKeyboard', false));

      case 3:
        return context$1$0.abrupt('return', true);

      case 6:
        context$1$0.prev = 6;
        context$1$0.t0 = context$1$0['catch'](0);
        return context$1$0.abrupt('return', false);

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 6]]);
};

_Object$assign(extensions, commands);
exports.commands = commands;
exports['default'] = extensions;

// don't proxy requests for the content size of a scrollable element

// otherwise let WDA handle attribute requests

// sometimes input is attempted before we have a keyboard. Try to bring one up
// but we want to handle the retries on find

// no matter what we do, make sure we have the implicit wait set up correctly

// make sure there is a keyboard if this is a text field

// possible values of `value`:
//   ['some text']
//   ['s', 'o', 'm', 'e', ' ', 't', 'e', 'x', 't']
//   'some text'

// nothing special, so just send it in

// if there are special characters, go through the value until we get to one,
// and then print it individually
// currently only supporting return, enter, backspace, and delete

// write and clear the buffer

// finally, send anything that might be left

// if we know there's only one element, we can optimize to make just one
// call to WDA

// otherwise if we have multiple elements, logic differs based on element
// type
// we know there must be at least one element in the row

// attributes have to be strings, so stringify this up
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9lbGVtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7c0JBQWMsUUFBUTs7OztnQ0FDQyxvQkFBb0I7OytCQUNmLG1CQUFtQjs7NkJBQzFCLGdCQUFnQjs7d0JBQ0EsVUFBVTs7c0JBQy9CLFdBQVc7Ozs7QUFHM0IsSUFBSSxRQUFRLEdBQUcsRUFBRTtJQUFFLFVBQVUsR0FBRyxFQUFFLENBQUM7Ozs7QUFJbkMsZUFBYyxVQUFVLEVBQUUsNkJBQVksT0FBTyxDQUFDLENBQUM7O0FBRS9DLFFBQVEsQ0FBQyxZQUFZLEdBQUcsb0JBQWdCLFNBQVMsRUFBRSxFQUFFO01BUzdDLEtBQUssRUFRUCxZQUFZOzs7O0FBaEJoQixVQUFFLEdBQUcsb0JBQUssYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDOztZQUN2QixJQUFJLENBQUMsWUFBWSxFQUFFOzs7OztjQUNsQixTQUFTLEtBQUssYUFBYSxDQUFBOzs7Ozs7eUNBRWhCLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDOzs7Ozs7O3lDQUlwQixJQUFJLENBQUMsWUFBWSxlQUFhLEVBQUUsbUJBQWMsU0FBUyxFQUFJLEtBQUssQ0FBQzs7O0FBQS9FLGFBQUs7OztBQUVULFlBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO0FBQ2hDLGVBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQ2pCOzs0Q0FFTSxBQUFDLG9CQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxvQkFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDOzs7QUFFM0Usb0JBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQzs7YUFDdkMsb0JBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQzs7Ozs7Y0FDbEIsSUFB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QUM7QUFDYixjQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDZCwwQkFBZ0IsRUFBRSxhQUFhO1NBQ2hDLENBQUM7Ozs7Ozs7Q0FDSCxDQUFDOztBQUVGLFFBQVEsQ0FBQyxlQUFlLEdBQUc7Ozs7Ozt5Q0FFakIsSUFBSSxDQUFDLDJCQUEyQixDQUFDLFlBQVksRUFBRSx5QkFBeUIsRUFBRSxLQUFLLENBQUM7Ozs0Q0FDL0UsSUFBSTs7Ozs7NENBRUosS0FBSzs7Ozs7OztDQUVmLENBQUM7O0FBRUYsZUFBYyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDM0IsUUFBUSxHQUFSLFFBQVE7cUJBQ0YsVUFBVSIsImZpbGUiOiJsaWIvY29tbWFuZHMvZWxlbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBlcnJvcnMgfSBmcm9tICdhcHBpdW0tYmFzZS1kcml2ZXInO1xuaW1wb3J0IHsgaW9zQ29tbWFuZHMgfSBmcm9tICdhcHBpdW0taW9zLWRyaXZlcic7XG5pbXBvcnQgeyB1dGlsIH0gZnJvbSAnYXBwaXVtLXN1cHBvcnQnO1xuaW1wb3J0IHsgcmV0cnlJbnRlcnZhbCwgcmV0cnkgfSBmcm9tICdhc3luY2JveCc7XG5pbXBvcnQgbG9nIGZyb20gJy4uL2xvZ2dlcic7XG5cblxubGV0IGNvbW1hbmRzID0ge30sIGV4dGVuc2lvbnMgPSB7fTtcblxuLy8gcHVsbCBpbiBhbGwgdGhlIGVsZW1lbnQgY29tbWFuZHMgYW5kIGhlbHBlcnMgZnJvbSBpb3MtZHJpdmVyLFxuLy8gdGhlbiBvdmVycmlkZSBhbnl0aGluZyB3ZSB3YW50IGJlbG93XG5PYmplY3QuYXNzaWduKGV4dGVuc2lvbnMsIGlvc0NvbW1hbmRzLmVsZW1lbnQpO1xuXG5jb21tYW5kcy5nZXRBdHRyaWJ1dGUgPSBhc3luYyBmdW5jdGlvbiAoYXR0cmlidXRlLCBlbCkge1xuICBlbCA9IHV0aWwudW53cmFwRWxlbWVudChlbCk7XG4gIGlmICghdGhpcy5pc1dlYkNvbnRleHQoKSkge1xuICAgIGlmIChhdHRyaWJ1dGUgPT09IFwiY29udGVudFNpemVcIikge1xuICAgICAgLy8gZG9uJ3QgcHJveHkgcmVxdWVzdHMgZm9yIHRoZSBjb250ZW50IHNpemUgb2YgYSBzY3JvbGxhYmxlIGVsZW1lbnRcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLmdldENvbnRlbnRTaXplKGVsKTtcbiAgICB9XG5cbiAgICAvLyBvdGhlcndpc2UgbGV0IFdEQSBoYW5kbGUgYXR0cmlidXRlIHJlcXVlc3RzXG4gICAgbGV0IHZhbHVlID0gYXdhaXQgdGhpcy5wcm94eUNvbW1hbmQoYC9lbGVtZW50LyR7ZWx9L2F0dHJpYnV0ZS8ke2F0dHJpYnV0ZX1gLCAnR0VUJyk7XG4gICAgLy8gVHJhbnNmb3JtIHRoZSByZXN1bHQgZm9yIHRoZSBjYXNlIHdoZW4gV0RBIHJldHVybnMgYW4gaW50ZWdlciByZXByZXNlbnRhdGlvbiBmb3IgYSBib29sZWFuIHZhbHVlXG4gICAgaWYgKFswLCAxXS5pbmRleE9mKHZhbHVlKSAhPT0gLTEpIHtcbiAgICAgIHZhbHVlID0gISF2YWx1ZTtcbiAgICB9XG4gICAgLy8gVGhlIHJldHVybmVkIHZhbHVlIG11c3QgYmUgb2YgdHlwZSBzdHJpbmcgYWNjb3JkaW5nIHRvIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93ZWJkcml2ZXIvI2dldC1lbGVtZW50LWF0dHJpYnV0ZVxuICAgIHJldHVybiAoXy5pc051bGwodmFsdWUpIHx8IF8uaXNTdHJpbmcodmFsdWUpKSA/IHZhbHVlIDogSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICB9XG4gIGxldCBhdG9tc0VsZW1lbnQgPSB0aGlzLmdldEF0b21zRWxlbWVudChlbCk7XG4gIGlmIChfLmlzTnVsbChhdG9tc0VsZW1lbnQpKSB7XG4gICAgdGhyb3cgbmV3IGVycm9ycy5Vbmtub3duRXJyb3IoYEVycm9yIGNvbnZlcnRpbmcgZWxlbWVudCBJRCBmb3IgdXNpbmcgaW4gV0QgYXRvbXM6ICcke2VsfWApO1xuICB9XG4gIHJldHVybiBhd2FpdCB0aGlzLmV4ZWN1dGVBdG9tKCdnZXRfYXR0cmlidXRlX3ZhbHVlJywgW2F0b21zRWxlbWVudCwgYXR0cmlidXRlXSk7XG59O1xuXG5jb21tYW5kcy5nZXRUZXh0ID0gYXN5bmMgZnVuY3Rpb24gKGVsKSB7XG4gIGVsID0gdXRpbC51bndyYXBFbGVtZW50KGVsKTtcbiAgaWYgKCF0aGlzLmlzV2ViQ29udGV4dCgpKSB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMucHJveHlDb21tYW5kKGAvZWxlbWVudC8ke2VsfS90ZXh0YCwgJ0dFVCcpO1xuICB9XG4gIGxldCBhdG9tc0VsZW1lbnQgPSB0aGlzLnVzZUF0b21zRWxlbWVudChlbCk7XG4gIHJldHVybiBhd2FpdCB0aGlzLmV4ZWN1dGVBdG9tKCdnZXRfdGV4dCcsIFthdG9tc0VsZW1lbnRdKTtcbn07XG5cbmNvbW1hbmRzLmdldFJlY3QgPSBhc3luYyBmdW5jdGlvbiAoZWwpIHtcbiAgZWwgPSB1dGlsLnVud3JhcEVsZW1lbnQoZWwpO1xuICBpZiAodGhpcy5pc1dlYkNvbnRleHQoKSkge1xuICAgIHRocm93IG5ldyBlcnJvcnMuTm90WWV0SW1wbGVtZW50ZWRFcnJvcignU3VwcG9ydCBmb3IgZ2V0UmVjdCBmb3Igd2ViY29udGV4dCBpcyBub3QgeWV0IGltcGxlbWVudGVkLiBQbGVhc2UgY29udGFjdCBhbiBBcHBpdW0gZGV2Jyk7XG4gIH1cblxuICByZXR1cm4gYXdhaXQgdGhpcy5nZXROYXRpdmVSZWN0KGVsKTtcbn07XG5cbmV4dGVuc2lvbnMuZ2V0TmF0aXZlUmVjdCA9IGFzeW5jIGZ1bmN0aW9uIChlbCkge1xuICByZXR1cm4gYXdhaXQgdGhpcy5wcm94eUNvbW1hbmQoYC9lbGVtZW50LyR7ZWx9L3JlY3RgLCAnR0VUJyk7XG59O1xuXG5jb21tYW5kcy5nZXRMb2NhdGlvbiA9IGFzeW5jIGZ1bmN0aW9uIChlbCkge1xuICBlbCA9IGVsLkVMRU1FTlQgPyBlbC5FTEVNRU5UIDogZWw7XG4gIGlmICh0aGlzLmlzV2ViQ29udGV4dCgpKSB7XG4gICAgY29uc3QgYXRvbXNFbGVtZW50ID0gYXdhaXQgdGhpcy51c2VBdG9tc0VsZW1lbnQoZWwpO1xuICAgIGxldCBsb2MgPSBhd2FpdCB0aGlzLmV4ZWN1dGVBdG9tKCdnZXRfdG9wX2xlZnRfY29vcmRpbmF0ZXMnLCBbYXRvbXNFbGVtZW50XSk7XG4gICAgaWYgKHRoaXMub3B0cy5hYnNvbHV0ZVdlYkxvY2F0aW9ucykge1xuICAgICAgY29uc3Qgc2NyaXB0ID0gJ3JldHVybiBbZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0LCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcF07JztcbiAgICAgIGNvbnN0IFt4T2Zmc2V0LCB5T2Zmc2V0XSA9IGF3YWl0IHRoaXMuZXhlY3V0ZShzY3JpcHQpO1xuICAgICAgbG9jLnggKz0geE9mZnNldDtcbiAgICAgIGxvYy55ICs9IHlPZmZzZXQ7XG4gICAgfVxuICAgIHJldHVybiBsb2M7XG4gIH0gZWxzZSB7XG4gICAgbGV0IHJlY3QgPSBhd2FpdCB0aGlzLmdldFJlY3QoZWwpO1xuICAgIHJldHVybiB7eDogcmVjdC54LCB5OiByZWN0Lnl9O1xuICB9XG59O1xuXG5jb21tYW5kcy5nZXRMb2NhdGlvbkluVmlldyA9IGFzeW5jIGZ1bmN0aW9uIChlbCkge1xuICByZXR1cm4gYXdhaXQgdGhpcy5nZXRMb2NhdGlvbihlbCk7XG59O1xuXG5jb21tYW5kcy5nZXRTaXplID0gYXN5bmMgZnVuY3Rpb24gKGVsKSB7XG4gIGVsID0gZWwuRUxFTUVOVCA/IGVsLkVMRU1FTlQgOiBlbDtcbiAgaWYgKHRoaXMuaXNXZWJDb250ZXh0KCkpIHtcbiAgICBsZXQgYXRvbXNFbGVtZW50ID0gdGhpcy5nZXRBdG9tc0VsZW1lbnQoZWwpO1xuICAgIGlmIChhdG9tc0VsZW1lbnQgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBlcnJvcnMuVW5rbm93bkVycm9yKGBFcnJvciBjb252ZXJ0aW5nIGVsZW1lbnQgSUQgZm9yIHVzaW5nIGluIFdEIGF0b21zOiAnJHtlbH0nYCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLmV4ZWN1dGVBdG9tKCdnZXRfc2l6ZScsIFthdG9tc0VsZW1lbnRdKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgbGV0IHJlY3QgPSBhd2FpdCB0aGlzLmdldFJlY3QoZWwpO1xuICAgIHJldHVybiB7d2lkdGg6IHJlY3Qud2lkdGgsIGhlaWdodDogcmVjdC5oZWlnaHR9O1xuICB9XG59O1xuXG5mdW5jdGlvbiBoYXNTcGVjaWFsS2V5cyAoa2V5cykge1xuICBmb3IgKGxldCBjaGFyIG9mIGtleXMpIHtcbiAgICBpZiAoaXNTcGVjaWFsS2V5KGNoYXIpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBpc1NwZWNpYWxLZXkgKGspIHtcbiAgaWYgKGsgPT09ICdcXHVFMDAzJyB8fCBrID09PSAnXFx1ZTAxNycpIHsgLy8gQkFDS1NQQUNFIG9yIERFTEVURVxuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2UgaWYgKGsgPT09ICdcXHVFMDA2JyB8fCBrID09PSAnXFx1RTAwNycpIHsgLy8gUkVUVVJOIG9yIEVOVEVSXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiB0cmFuc2xhdGVLZXkgKGspIHtcbiAgaWYgKGsgPT09ICdcXHVFMDA2JyB8fCBrID09PSAnXFx1RTAwNycpIHsgLy8gUkVUVVJOIG9yIEVOVEVSXG4gICAgcmV0dXJuICdcXG4nO1xuICB9IGVsc2UgaWYgKGsgPT09ICdcXHVFMDAzJyB8fCBrID09PSAnXFx1ZTAxNycpIHsgLy8gQkFDS1NQQUNFIG9yIERFTEVURVxuICAgIHJldHVybiAnXFxiJztcbiAgfVxuICByZXR1cm4gaztcbn1cblxuZXh0ZW5zaW9ucy5icmluZ1VwS2V5Ym9hcmQgPSBhc3luYyBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAvLyBzb21ldGltZXMgaW5wdXQgaXMgYXR0ZW1wdGVkIGJlZm9yZSB3ZSBoYXZlIGEga2V5Ym9hcmQuIFRyeSB0byBicmluZyBvbmUgdXBcbiAgLy8gYnV0IHdlIHdhbnQgdG8gaGFuZGxlIHRoZSByZXRyaWVzIG9uIGZpbmRcbiAgbGV0IGltcGxpY2l0V2FpdE1zID0gdGhpcy5pbXBsaWNpdFdhaXRNcztcbiAgYXdhaXQgdGhpcy5zZXRJbXBsaWNpdFdhaXQoMCk7XG4gIHRyeSB7XG4gICAgYXdhaXQgcmV0cnlJbnRlcnZhbCgxMCwgMTAsIGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHRoaXMuZmluZE5hdGl2ZUVsZW1lbnRPckVsZW1lbnRzKCdjbGFzcyBuYW1lJywgJ1hDVUlFbGVtZW50VHlwZUtleWJvYXJkJywgZmFsc2UpO1xuICAgICAgICBsb2cuZGVidWcoJ0tleWJvYXJkIGZvdW5kLiBDb250aW51aW5nIHdpdGggdGV4dCBpbnB1dC4nKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAvLyBubyBrZXlib2FyZCBmb3VuZFxuICAgICAgICBsb2cuZGVidWcoJ05vIGtleWJvYXJkIGZvdW5kLiBDbGlja2luZyBlbGVtZW50IHRvIG9wZW4gaXQuJyk7XG4gICAgICAgIGF3YWl0IHRoaXMubmF0aXZlQ2xpY2soZWxlbWVudCk7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5maW5kTmF0aXZlRWxlbWVudE9yRWxlbWVudHMoJ2NsYXNzIG5hbWUnLCAnWENVSUVsZW1lbnRUeXBlS2V5Ym9hcmQnLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0gZmluYWxseSB7XG4gICAgLy8gbm8gbWF0dGVyIHdoYXQgd2UgZG8sIG1ha2Ugc3VyZSB3ZSBoYXZlIHRoZSBpbXBsaWNpdCB3YWl0IHNldCB1cCBjb3JyZWN0bHlcbiAgICBhd2FpdCB0aGlzLnNldEltcGxpY2l0V2FpdChpbXBsaWNpdFdhaXRNcyk7XG4gIH1cbn07XG5cbmNvbW1hbmRzLnNldFZhbHVlSW1tZWRpYXRlID0gYXN5bmMgZnVuY3Rpb24gKHZhbHVlLCBlbCkge1xuICAvLyBXREEgZG9lcyBub3QgcHJvdmlkZSBubyB3YXkgdG8gc2V0IHRoZSB2YWx1ZSBkaXJlY3RseVxuICBsb2cuaW5mbygnVGhlcmUgaXMgY3VycmVudGx5IG5vIHdheSB0byBieXBhc3MgdHlwaW5nIHVzaW5nIFhDVUlUZXN0LiBTZXR0aW5nIHZhbHVlIHRocm91Z2gga2V5Ym9hcmQnKTtcbiAgYXdhaXQgdGhpcy5zZXRWYWx1ZSh2YWx1ZSwgZWwpO1xufTtcblxuY29tbWFuZHMuc2V0VmFsdWUgPSBhc3luYyBmdW5jdGlvbiAodmFsdWUsIGVsKSB7XG4gIGVsID0gdXRpbC51bndyYXBFbGVtZW50KGVsKTtcbiAgaWYgKHRoaXMuaXNXZWJDb250ZXh0KCkpIHtcbiAgICBsZXQgYXRvbXNFbGVtZW50ID0gdGhpcy51c2VBdG9tc0VsZW1lbnQoZWwpO1xuICAgIGF3YWl0IHRoaXMuZXhlY3V0ZUF0b20oJ2NsaWNrJywgW2F0b21zRWxlbWVudF0pO1xuICAgIGF3YWl0IHRoaXMuZXhlY3V0ZUF0b20oJ3R5cGUnLCBbYXRvbXNFbGVtZW50LCB2YWx1ZV0pO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IHNldEZvcm1hdHRlZFZhbHVlID0gYXN5bmMgKGlucHV0LCBpc0tleWJvYXJkUHJlc2VuY2VDaGVja0VuYWJsZWQpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgaW5wdXQgIT09ICdzdHJpbmcnICYmICEoaW5wdXQgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgaW5wdXQgPSBpbnB1dC50b1N0cmluZygpLnNwbGl0KCcnKTtcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHRoaXMucHJveHlDb21tYW5kKGAvZWxlbWVudC8ke2VsfS92YWx1ZWAsICdQT1NUJywge3ZhbHVlOiBpbnB1dH0pO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIC8vIG1ha2Ugc3VyZSB0aGVyZSBpcyBhIGtleWJvYXJkIGlmIHRoaXMgaXMgYSB0ZXh0IGZpZWxkXG4gICAgICAgIGlmIChpc0tleWJvYXJkUHJlc2VuY2VDaGVja0VuYWJsZWQgJiYgYXdhaXQgdGhpcy5nZXRBdHRyaWJ1dGUoJ3R5cGUnLCBlbCkgPT09ICdYQ1VJRWxlbWVudFR5cGVUZXh0RmllbGQnKSB7XG4gICAgICAgICAgbG9nLmluZm8oYENhbm5vdCB0eXBlIGluIHRoZSB0ZXh0IGZpZWxkIGJlY2F1c2Ugb2YgJHtlcnJ9LlxcblRyeWluZyB0byBhcHBseSBhIHdvcmthcm91bmQuLi5gKTtcbiAgICAgICAgICBhd2FpdCB0aGlzLmJyaW5nVXBLZXlib2FyZChlbCk7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wcm94eUNvbW1hbmQoYC9lbGVtZW50LyR7ZWx9L3ZhbHVlYCwgJ1BPU1QnLCB7dmFsdWU6IGlucHV0fSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIHBvc3NpYmxlIHZhbHVlcyBvZiBgdmFsdWVgOlxuICAgIC8vICAgWydzb21lIHRleHQnXVxuICAgIC8vICAgWydzJywgJ28nLCAnbScsICdlJywgJyAnLCAndCcsICdlJywgJ3gnLCAndCddXG4gICAgLy8gICAnc29tZSB0ZXh0J1xuICAgIGlmIChfLmlzTnVsbCh2YWx1ZSkgfHwgXy5pc1VuZGVmaW5lZCh2YWx1ZSkgfHwgXy5pc1BsYWluT2JqZWN0KHZhbHVlKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBPbmx5IHN0cmluZ3MgYW5kIGFycmF5cyBvZiBzdHJpbmdzIGFyZSBzdXBwb3J0ZWQgYXMgaW5wdXQgYXJndW1lbnRzLiBSZWNlaXZlZDogJyR7SlNPTi5zdHJpbmdpZnkodmFsdWUpfSdgKTtcbiAgICB9XG4gICAgaWYgKF8uaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIC8vIG1ha2Ugc3VyZSB0aGF0IGFsbCB0aGUgc3RyaW5ncyBpbnNpZGUgYXJlIGEgc2luZ2xlIGNoYXJhY3RlciBsb25nXG4gICAgICB2YWx1ZSA9IF8uZmxhdE1hcCh2YWx1ZSwgKHYpID0+IChfLmlzU3RyaW5nKHYpID8gdiA6IEpTT04uc3RyaW5naWZ5KHYpKS5zcGxpdCgnJykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBtYWtlIGl0IGludG8gYW4gYXJyYXkgb2YgY2hhcmFjdGVyc1xuICAgICAgdmFsdWUgPSAodmFsdWUgfHwgJycpLnRvU3RyaW5nKCkuc3BsaXQoJycpO1xuICAgIH1cblxuICAgIGlmICghaGFzU3BlY2lhbEtleXModmFsdWUpKSB7XG4gICAgICAvLyBub3RoaW5nIHNwZWNpYWwsIHNvIGp1c3Qgc2VuZCBpdCBpblxuICAgICAgYXdhaXQgc2V0Rm9ybWF0dGVkVmFsdWUodmFsdWUsIHRydWUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGlmIHRoZXJlIGFyZSBzcGVjaWFsIGNoYXJhY3RlcnMsIGdvIHRocm91Z2ggdGhlIHZhbHVlIHVudGlsIHdlIGdldCB0byBvbmUsXG4gICAgLy8gYW5kIHRoZW4gcHJpbnQgaXQgaW5kaXZpZHVhbGx5XG4gICAgLy8gY3VycmVudGx5IG9ubHkgc3VwcG9ydGluZyByZXR1cm4sIGVudGVyLCBiYWNrc3BhY2UsIGFuZCBkZWxldGVcbiAgICBsZXQgYnVmZmVyID0gW107XG4gICAgbGV0IGlzRmlyc3RDaGFyID0gdHJ1ZTtcbiAgICBmb3IgKGxldCBrIG9mIHZhbHVlKSB7XG4gICAgICBsZXQgY2hhciA9IHRyYW5zbGF0ZUtleShrKTtcblxuICAgICAgaWYgKGNoYXIgPT09IGspIHtcbiAgICAgICAgYnVmZmVyLnB1c2goY2hhcik7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyB3cml0ZSBhbmQgY2xlYXIgdGhlIGJ1ZmZlclxuICAgICAgYXdhaXQgc2V0Rm9ybWF0dGVkVmFsdWUoYnVmZmVyLCBpc0ZpcnN0Q2hhcik7XG4gICAgICBpc0ZpcnN0Q2hhciA9IGZhbHNlO1xuICAgICAgYnVmZmVyID0gW107XG5cbiAgICAgIC8vIHdyaXRlIHRoZSBjaGFyYWN0ZXJcbiAgICAgIGF3YWl0IHNldEZvcm1hdHRlZFZhbHVlKFtjaGFyXSwgaXNGaXJzdENoYXIpO1xuICAgIH1cbiAgICAvLyBmaW5hbGx5LCBzZW5kIGFueXRoaW5nIHRoYXQgbWlnaHQgYmUgbGVmdFxuICAgIGlmIChidWZmZXIubGVuZ3RoKSB7XG4gICAgICBhd2FpdCBzZXRGb3JtYXR0ZWRWYWx1ZShidWZmZXIsIGZhbHNlKTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbW1hbmRzLmtleXMgPSBhc3luYyBmdW5jdGlvbiAodmFsdWUpIHtcbiAgaWYgKF8uaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAvLyBjb25jYXRlbmF0ZSBhbnkgaW5kaXZpZHVhbCBzdHJpbmdzXG4gICAgdmFsdWUgPSB2YWx1ZS5qb2luKCcnKTtcbiAgfVxuICBpZiAoXy5pc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAvLyBzcGxpdCBpbnRvIGNvbXBvbmVudCBjaGFyYWN0ZXJzXG4gICAgdmFsdWUgPSB2YWx1ZS5zcGxpdCgnJyk7XG4gIH1cblxuICBsZXQgYnVmZmVyID0gW107XG4gIGZvciAobGV0IGsgb2YgdmFsdWUpIHtcbiAgICBsZXQgY2hhciA9IHRyYW5zbGF0ZUtleShrKTtcblxuICAgIGJ1ZmZlci5wdXNoKGNoYXIpO1xuICB9XG4gIGF3YWl0IHRoaXMucHJveHlDb21tYW5kKCcvd2RhL2tleXMnLCAnUE9TVCcsIHt2YWx1ZTogYnVmZmVyfSk7XG59O1xuXG5jb21tYW5kcy5jbGVhciA9IGFzeW5jIGZ1bmN0aW9uIChlbCkge1xuICBlbCA9IHV0aWwudW53cmFwRWxlbWVudChlbCk7XG4gIGlmICh0aGlzLmlzV2ViQ29udGV4dCgpKSB7XG4gICAgbGV0IGF0b21zRWxlbWVudCA9IHRoaXMudXNlQXRvbXNFbGVtZW50KGVsKTtcbiAgICBhd2FpdCB0aGlzLmV4ZWN1dGVBdG9tKCdjbGVhcicsIFthdG9tc0VsZW1lbnRdKTtcbiAgICByZXR1cm47XG4gIH1cbiAgYXdhaXQgcmV0cnkoNSwgdGhpcy5wcm94eUNvbW1hbmQuYmluZCh0aGlzKSwgYC9lbGVtZW50LyR7ZWx9L2NsZWFyYCwgJ1BPU1QnKTtcbn07XG5cbmNvbW1hbmRzLmdldENvbnRlbnRTaXplID0gYXN5bmMgZnVuY3Rpb24gKGVsKSB7XG4gIGlmICh0aGlzLmlzV2ViQ29udGV4dCgpKSB7XG4gICAgdGhyb3cgbmV3IGVycm9ycy5Ob3RZZXRJbXBsZW1lbnRlZEVycm9yKCdTdXBwb3J0IGZvciBnZXRDb250ZW50U2l6ZSBmb3Igd2ViY29udGV4dCBpcyBub3QgeWV0IGltcGxlbWVudGVkLiBQbGVhc2UgY29udGFjdCBhbiBBcHBpdW0gZGV2Jyk7XG4gIH1cblxuICBjb25zdCB0eXBlID0gYXdhaXQgdGhpcy5nZXRBdHRyaWJ1dGUoJ3R5cGUnLCBlbCk7XG5cbiAgaWYgKHR5cGUgIT09IFwiWENVSUVsZW1lbnRUeXBlVGFibGVcIiAmJlxuICAgICAgdHlwZSAhPT0gXCJYQ1VJRWxlbWVudFR5cGVDb2xsZWN0aW9uVmlld1wiKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBDYW4ndCBnZXQgY29udGVudCBzaXplIGZvciB0eXBlICcke3R5cGV9Jywgb25seSBmb3IgYCArXG4gICAgICAgICAgICAgICAgICAgIGB0YWJsZXMgYW5kIGNvbGxlY3Rpb24gdmlld3NgKTtcbiAgfVxuICBsZXQgbG9jYXRvciA9IFwiKlwiO1xuICBpZiAodHlwZSA9PT0gXCJYQ1VJRWxlbWVudFR5cGVUYWJsZVwiKSB7XG4gICAgLy8gb25seSBmaW5kIHRhYmxlIGNlbGxzLCBub3QganVzdCBhbnkgY2hpbGRyZW5cbiAgICBsb2NhdG9yID0gXCJYQ1VJRWxlbWVudFR5cGVDZWxsXCI7XG4gIH1cblxuICBsZXQgY29udGVudEhlaWdodCA9IDA7XG4gIGxldCBjaGlsZHJlbiA9IGF3YWl0IHRoaXMuZmluZEVsT3JFbHMoYGNsYXNzIGNoYWluYCwgbG9jYXRvciwgdHJ1ZSwgZWwpO1xuICBpZiAoY2hpbGRyZW4ubGVuZ3RoID09PSAxKSB7XG4gICAgLy8gaWYgd2Uga25vdyB0aGVyZSdzIG9ubHkgb25lIGVsZW1lbnQsIHdlIGNhbiBvcHRpbWl6ZSB0byBtYWtlIGp1c3Qgb25lXG4gICAgLy8gY2FsbCB0byBXREFcbiAgICBjb25zdCByZWN0ID0gYXdhaXQgdGhpcy5nZXRSZWN0KF8uaGVhZChjaGlsZHJlbikpO1xuICAgIGNvbnRlbnRIZWlnaHQgPSByZWN0LmhlaWdodDtcbiAgfSBlbHNlIGlmIChjaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAvLyBvdGhlcndpc2UgaWYgd2UgaGF2ZSBtdWx0aXBsZSBlbGVtZW50cywgbG9naWMgZGlmZmVycyBiYXNlZCBvbiBlbGVtZW50XG4gICAgLy8gdHlwZVxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBcIlhDVUlFbGVtZW50VHlwZVRhYmxlXCI6IHtcbiAgICAgICAgY29uc3QgZmlyc3RSZWN0ID0gYXdhaXQgdGhpcy5nZXRSZWN0KF8uaGVhZChjaGlsZHJlbikpO1xuICAgICAgICBjb25zdCBsYXN0UmVjdCA9IGF3YWl0IHRoaXMuZ2V0UmVjdChfLmxhc3QoY2hpbGRyZW4pKTtcbiAgICAgICAgY29udGVudEhlaWdodCA9IGxhc3RSZWN0LnkgKyBsYXN0UmVjdC5oZWlnaHQgLSBmaXJzdFJlY3QueTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIFwiWENVSUVsZW1lbnRUeXBlQ29sbGVjdGlvblZpZXdcIjoge1xuICAgICAgICBsZXQgZWxzSW5Sb3cgPSAxOyAvLyB3ZSBrbm93IHRoZXJlIG11c3QgYmUgYXQgbGVhc3Qgb25lIGVsZW1lbnQgaW4gdGhlIHJvd1xuICAgICAgICBsZXQgZmlyc3RSZWN0ID0gYXdhaXQgdGhpcy5nZXRSZWN0KF8uaGVhZChjaGlsZHJlbikpO1xuICAgICAgICBsZXQgaW5pdGlhbFJlY3RzID0gW2ZpcnN0UmVjdF07XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCByZWN0ID0gYXdhaXQgdGhpcy5nZXRSZWN0KGNoaWxkcmVuW2ldKTtcbiAgICAgICAgICBpbml0aWFsUmVjdHMucHVzaChyZWN0KTtcbiAgICAgICAgICBpZiAocmVjdC55ICE9PSBmaXJzdFJlY3QueSkge1xuICAgICAgICAgICAgZWxzSW5Sb3cgPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNwYWNlQmV0d2VlbkVscyA9IGluaXRpYWxSZWN0c1tlbHNJblJvd10ueSAtIGluaXRpYWxSZWN0c1tlbHNJblJvdyAtIDFdLnkgLSBpbml0aWFsUmVjdHNbZWxzSW5Sb3cgLSAxXS5oZWlnaHQ7XG4gICAgICAgIGNvbnN0IG51bVJvd3MgPSBNYXRoLmNlaWwoY2hpbGRyZW4ubGVuZ3RoIC8gZWxzSW5Sb3cpO1xuXG4gICAgICAgIC8vIGFzc3VtZSBhbGwgY2VsbHMgYXJlIHRoZSBzYW1lIGhlaWdodFxuICAgICAgICBjb250ZW50SGVpZ2h0ID0gKG51bVJvd3MgKiBmaXJzdFJlY3QuaGVpZ2h0KSArIChzcGFjZUJldHdlZW5FbHMgKiAobnVtUm93cyAtIDEpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoYFByb2dyYW1taW5nIGVycm9yOiB0eXBlICcke3R5cGV9JyB3YXMgbm90IGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGB2YWxpZCBidXQgc2hvdWxkIGhhdmUgYWxyZWFkeSBiZWVuIHJlamVjdGVkYCk7XG4gICAgfVxuICB9XG4gIGNvbnN0IHNpemUgPSBhd2FpdCB0aGlzLmdldFNpemUoZWwpO1xuICBjb25zdCBvcmlnaW4gPSBhd2FpdCB0aGlzLmdldExvY2F0aW9uSW5WaWV3KGVsKTtcbiAgLy8gYXR0cmlidXRlcyBoYXZlIHRvIGJlIHN0cmluZ3MsIHNvIHN0cmluZ2lmeSB0aGlzIHVwXG4gIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XG4gICAgd2lkdGg6IHNpemUud2lkdGgsXG4gICAgaGVpZ2h0OiBzaXplLmhlaWdodCxcbiAgICB0b3A6IG9yaWdpbi55LFxuICAgIGxlZnQ6IG9yaWdpbi54LFxuICAgIHNjcm9sbGFibGVPZmZzZXQ6IGNvbnRlbnRIZWlnaHRcbiAgfSk7XG59O1xuXG5jb21tYW5kcy5pc0tleWJvYXJkU2hvd24gPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgYXdhaXQgdGhpcy5maW5kTmF0aXZlRWxlbWVudE9yRWxlbWVudHMoJ2NsYXNzIG5hbWUnLCAnWENVSUVsZW1lbnRUeXBlS2V5Ym9hcmQnLCBmYWxzZSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGlnbikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuT2JqZWN0LmFzc2lnbihleHRlbnNpb25zLCBjb21tYW5kcyk7XG5leHBvcnQgeyBjb21tYW5kcyB9O1xuZXhwb3J0IGRlZmF1bHQgZXh0ZW5zaW9ucztcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4ifQ==
