'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumBaseDriver = require('appium-base-driver');

var _appiumSupport = require('appium-support');

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

// we override the xpath search for this first-visible-child selector, which
// looks like /*[@firstVisible="true"]
var MAGIC_FIRST_VIS_CHILD_SEL = /\/\*\[@firstVisible\s*=\s*('|")true\1\]/;

// we likewise override xpath search to provide a shortcut for finding all
// scrollable elements
var MAGIC_SCROLLABLE_SEL = /\/\/\*\[@scrollable\s*=\s*('|")true\1\]/;

var WDA_CLASS_CHAIN_STRATEGY = 'class chain';

var helpers = {},
    commands = {},
    extensions = {};

helpers.findElOrEls = function callee$0$0(strategy, selector, mult, context) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.isWebview()) {
          context$1$0.next = 6;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.findWebElementOrElements(strategy, selector, mult, context));

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 6:
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.findNativeElementOrElements(strategy, selector, mult, context));

      case 8:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.findNativeElementOrElements = function callee$0$0(strategy, selector, mult, context) {
  var initSelector, rewroteSelector, stripViewFromSelector, _rewriteMagicScrollable, _rewriteMagicScrollable2;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        stripViewFromSelector = function stripViewFromSelector(selector) {
          // Don't strip it out if it's one of these 4 element types
          // (see https://github.com/facebook/WebDriverAgent/blob/master/WebDriverAgentLib/Utilities/FBElementTypeTransformer.m for reference)
          var keepView = ['XCUIElementTypeScrollView', 'XCUIElementTypeCollectionView', 'XCUIElementTypeTextView', 'XCUIElementTypeWebView'].indexOf(selector) >= 0;

          if (!keepView && selector.indexOf('View') === selector.length - 4) {
            return selector.substr(0, selector.length - 4);
          } else {
            return selector;
          }
        };

        initSelector = selector;
        rewroteSelector = false;

        if (strategy === '-ios predicate string') {
          // WebDriverAgent uses 'predicate string'
          strategy = 'predicate string';
        } else if (strategy === '-ios class chain') {
          // WebDriverAgent uses 'class chain'
          strategy = WDA_CLASS_CHAIN_STRATEGY;
        }

        // Check if the word 'View' is appended to selector and if it is, strip it out

        if (strategy === 'class name') {
          // XCUITest classes have `XCUIElementType` prepended
          // first check if there is the old `UIA` prefix
          if (selector.indexOf('UIA') === 0) {
            selector = selector.substring(3);
          }
          // now check if we need to add `XCUIElementType`
          if (selector.indexOf('XCUIElementType') !== 0) {
            selector = stripViewFromSelector('XCUIElementType' + selector);
            rewroteSelector = true;
          }
        }

        if (!(strategy === 'xpath' && MAGIC_FIRST_VIS_CHILD_SEL.test(selector))) {
          context$1$0.next = 11;
          break;
        }

        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.getFirstVisibleChild(mult, context));

      case 8:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 11:
        if (strategy === 'xpath' && MAGIC_SCROLLABLE_SEL.test(selector)) {
          _rewriteMagicScrollable = rewriteMagicScrollable(mult);
          _rewriteMagicScrollable2 = _slicedToArray(_rewriteMagicScrollable, 2);
          strategy = _rewriteMagicScrollable2[0];
          selector = _rewriteMagicScrollable2[1];
        } else if (strategy === 'xpath') {
          // Replace UIA if it comes after a forward slash or is at the beginning of the string
          selector = selector.replace(/(^|\/)(UIA)([^\[\/]+)/g, function (str, g1, g2, g3) {
            rewroteSelector = true;
            return g1 + stripViewFromSelector('XCUIElementType' + g3);
          });
        }

      case 12:
        if (rewroteSelector) {
          _logger2['default'].info('Rewrote incoming selector from \'' + initSelector + '\' to ' + ('\'' + selector + '\' to match XCUI type. You should consider ') + 'updating your tests to use the new selectors directly');
        }

        context$1$0.next = 15;
        return _regeneratorRuntime.awrap(this.doNativeFind(strategy, selector, mult, context));

      case 15:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 16:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.doNativeFind = function callee$0$0(strategy, selector, mult, context) {
  var endpoint, body, method, els;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context = _appiumSupport.util.unwrapElement(context);

        endpoint = '/element' + (context ? '/' + context + '/element' : '') + (mult ? 's' : '');
        body = {
          using: strategy,
          value: selector
        };
        method = 'POST';
        els = undefined;
        context$1$0.prev = 5;
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.implicitWaitForCondition(function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.prev = 0;
                context$2$0.next = 3;
                return _regeneratorRuntime.awrap(this.proxyCommand(endpoint, method, body));

              case 3:
                els = context$2$0.sent;

                if (!mult) {
                  context$2$0.next = 8;
                  break;
                }

                return context$2$0.abrupt('return', els && els.length);

              case 8:
                return context$2$0.abrupt('return', !els.status || els.status === 0);

              case 9:
                context$2$0.next = 15;
                break;

              case 11:
                context$2$0.prev = 11;
                context$2$0.t0 = context$2$0['catch'](0);

                els = undefined;
                return context$2$0.abrupt('return', false);

              case 15:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this, [[0, 11]]);
        }));

      case 8:
        context$1$0.next = 17;
        break;

      case 10:
        context$1$0.prev = 10;
        context$1$0.t0 = context$1$0['catch'](5);

        if (!(context$1$0.t0.message && context$1$0.t0.message.match(/Condition unmet/))) {
          context$1$0.next = 16;
          break;
        }

        // condition was not met setting res to empty array
        els = [];
        context$1$0.next = 17;
        break;

      case 16:
        throw context$1$0.t0;

      case 17:
        if (!mult) {
          context$1$0.next = 21;
          break;
        }

        return context$1$0.abrupt('return', els);

      case 21:
        if (!(!els || _lodash2['default'].size(els) === 0)) {
          context$1$0.next = 23;
          break;
        }

        throw new _appiumBaseDriver.errors.NoSuchElementError();

      case 23:
        return context$1$0.abrupt('return', els);

      case 24:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[5, 10]]);
};

helpers.getFirstVisibleChild = function callee$0$0(mult, context) {
  var index, strategy, selector, nthChild, visible;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].info('Getting first visible child');

        if (!mult) {
          context$1$0.next = 3;
          break;
        }

        throw new Error("Cannot get multiple first visible children!");

      case 3:
        if (context) {
          context$1$0.next = 5;
          break;
        }

        throw new Error("Cannot get first visible child without a context element");

      case 5:
        index = 1;

      case 6:
        if (!true) {
          context$1$0.next = 21;
          break;
        }

        strategy = WDA_CLASS_CHAIN_STRATEGY;
        selector = '*[' + index + ']';
        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(this.doNativeFind(strategy, selector, false, context));

      case 11:
        nthChild = context$1$0.sent;
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(this.getAttribute('visible', nthChild));

      case 14:
        visible = context$1$0.sent;

        if (!(visible === "true")) {
          context$1$0.next = 18;
          break;
        }

        _logger2['default'].info('Found first visible child at position ' + index);
        return context$1$0.abrupt('return', nthChild);

      case 18:
        index++;
        context$1$0.next = 6;
        break;

      case 21:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

function rewriteMagicScrollable(mult) {
  var types = ['ScrollView', 'Table', 'CollectionView', 'WebView'].map(function (t) {
    return 'XCUIElementType' + t;
  });
  var pred = types.map(function (t) {
    return 'type == "' + t + '"';
  }).join(" OR ");
  var strategy = WDA_CLASS_CHAIN_STRATEGY;
  var selector = '**/*[`' + pred + '`]';
  if (!mult) {
    selector += '[1]';
  }
  _logger2['default'].info("Rewrote request for scrollable descendants to class chain " + ('format with selector \'' + selector + '\''));
  return [strategy, selector];
}

_Object$assign(extensions, commands, helpers);
exports.commands = commands;
exports.helpers = helpers;
exports['default'] = extensions;

// we succeed if we get some elements

// we may not get any status, which means success

// loop through children via class-chain finds, until we run out of children
// or we find a visible one. This loop looks infinite but its not, because at
// some point the call to doNativeFind will throw with an Element Not Found
// error, when the index gets higher than the number of child elements. This
// is what we want because that error will halt the loop and make it all the
// way to the client.
// eslint-disable-line no-constant-condition
//# sourceMappingURL=data:application/json;charset=utf8;base64,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Q0FDcEQsUUFBUTs7O0FBRWpCLGFBQUssRUFBRSxDQUFDOzs7Ozs7Ozs7Q0FFWCxDQUFDOztBQUVGLFNBQVMsc0JBQXNCLENBQUUsSUFBSSxFQUFFO0FBQ3JDLE1BQU0sS0FBSyxHQUFHLENBQ1osWUFBWSxFQUNaLE9BQU8sRUFDUCxnQkFBZ0IsRUFDaEIsU0FBUyxDQUNWLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQzsrQkFBc0IsQ0FBQztHQUFFLENBQUMsQ0FBQztBQUNsQyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQzt5QkFBZ0IsQ0FBQztHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDM0QsTUFBTSxRQUFRLEdBQUcsd0JBQXdCLENBQUM7QUFDMUMsTUFBSSxRQUFRLEdBQUcsUUFBUSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7QUFDdEMsTUFBSSxDQUFDLElBQUksRUFBRTtBQUNULFlBQVEsSUFBSSxLQUFLLENBQUM7R0FDbkI7QUFDRCxzQkFBSSxJQUFJLENBQUMsNERBQTRELGdDQUNuQyxRQUFRLFFBQUcsQ0FBQyxDQUFDO0FBQy9DLFNBQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7Q0FDN0I7O0FBR0QsZUFBYyxVQUFVLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLFFBQVEsR0FBUixRQUFRO1FBQUUsT0FBTyxHQUFQLE9BQU87cUJBQ1gsVUFBVSIsImZpbGUiOiJsaWIvY29tbWFuZHMvZmluZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBlcnJvcnMgfSBmcm9tICdhcHBpdW0tYmFzZS1kcml2ZXInO1xuaW1wb3J0IHsgdXRpbCB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCBsb2cgZnJvbSAnLi4vbG9nZ2VyJztcblxuLy8gd2Ugb3ZlcnJpZGUgdGhlIHhwYXRoIHNlYXJjaCBmb3IgdGhpcyBmaXJzdC12aXNpYmxlLWNoaWxkIHNlbGVjdG9yLCB3aGljaFxuLy8gbG9va3MgbGlrZSAvKltAZmlyc3RWaXNpYmxlPVwidHJ1ZVwiXVxuY29uc3QgTUFHSUNfRklSU1RfVklTX0NISUxEX1NFTCA9IC9cXC9cXCpcXFtAZmlyc3RWaXNpYmxlXFxzKj1cXHMqKCd8XCIpdHJ1ZVxcMVxcXS87XG5cbi8vIHdlIGxpa2V3aXNlIG92ZXJyaWRlIHhwYXRoIHNlYXJjaCB0byBwcm92aWRlIGEgc2hvcnRjdXQgZm9yIGZpbmRpbmcgYWxsXG4vLyBzY3JvbGxhYmxlIGVsZW1lbnRzXG5jb25zdCBNQUdJQ19TQ1JPTExBQkxFX1NFTCA9IC9cXC9cXC9cXCpcXFtAc2Nyb2xsYWJsZVxccyo9XFxzKignfFwiKXRydWVcXDFcXF0vO1xuXG5jb25zdCBXREFfQ0xBU1NfQ0hBSU5fU1RSQVRFR1kgPSAnY2xhc3MgY2hhaW4nO1xuXG5sZXQgaGVscGVycyA9IHt9LCBjb21tYW5kcyA9IHt9LCBleHRlbnNpb25zID0ge307XG5cbmhlbHBlcnMuZmluZEVsT3JFbHMgPSBhc3luYyBmdW5jdGlvbiAoc3RyYXRlZ3ksIHNlbGVjdG9yLCBtdWx0LCBjb250ZXh0KSB7XG4gIGlmICh0aGlzLmlzV2VidmlldygpKSB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuZmluZFdlYkVsZW1lbnRPckVsZW1lbnRzKHN0cmF0ZWd5LCBzZWxlY3RvciwgbXVsdCwgY29udGV4dCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuZmluZE5hdGl2ZUVsZW1lbnRPckVsZW1lbnRzKHN0cmF0ZWd5LCBzZWxlY3RvciwgbXVsdCwgY29udGV4dCk7XG4gIH1cbn07XG5cbmhlbHBlcnMuZmluZE5hdGl2ZUVsZW1lbnRPckVsZW1lbnRzID0gYXN5bmMgZnVuY3Rpb24gKHN0cmF0ZWd5LCBzZWxlY3RvciwgbXVsdCwgY29udGV4dCkge1xuICBjb25zdCBpbml0U2VsZWN0b3IgPSBzZWxlY3RvcjtcbiAgbGV0IHJld3JvdGVTZWxlY3RvciA9IGZhbHNlO1xuICBpZiAoc3RyYXRlZ3kgPT09ICctaW9zIHByZWRpY2F0ZSBzdHJpbmcnKSB7XG4gICAgLy8gV2ViRHJpdmVyQWdlbnQgdXNlcyAncHJlZGljYXRlIHN0cmluZydcbiAgICBzdHJhdGVneSA9ICdwcmVkaWNhdGUgc3RyaW5nJztcbiAgfSBlbHNlIGlmIChzdHJhdGVneSA9PT0gJy1pb3MgY2xhc3MgY2hhaW4nKSB7XG4gICAgLy8gV2ViRHJpdmVyQWdlbnQgdXNlcyAnY2xhc3MgY2hhaW4nXG4gICAgc3RyYXRlZ3kgPSBXREFfQ0xBU1NfQ0hBSU5fU1RSQVRFR1k7XG4gIH1cblxuICAvLyBDaGVjayBpZiB0aGUgd29yZCAnVmlldycgaXMgYXBwZW5kZWQgdG8gc2VsZWN0b3IgYW5kIGlmIGl0IGlzLCBzdHJpcCBpdCBvdXRcbiAgZnVuY3Rpb24gc3RyaXBWaWV3RnJvbVNlbGVjdG9yIChzZWxlY3Rvcikge1xuICAgIC8vIERvbid0IHN0cmlwIGl0IG91dCBpZiBpdCdzIG9uZSBvZiB0aGVzZSA0IGVsZW1lbnQgdHlwZXNcbiAgICAvLyAoc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9XZWJEcml2ZXJBZ2VudC9ibG9iL21hc3Rlci9XZWJEcml2ZXJBZ2VudExpYi9VdGlsaXRpZXMvRkJFbGVtZW50VHlwZVRyYW5zZm9ybWVyLm0gZm9yIHJlZmVyZW5jZSlcbiAgICBsZXQga2VlcFZpZXcgPSBbXG4gICAgICAnWENVSUVsZW1lbnRUeXBlU2Nyb2xsVmlldycsXG4gICAgICAnWENVSUVsZW1lbnRUeXBlQ29sbGVjdGlvblZpZXcnLFxuICAgICAgJ1hDVUlFbGVtZW50VHlwZVRleHRWaWV3JyxcbiAgICAgICdYQ1VJRWxlbWVudFR5cGVXZWJWaWV3JyxcbiAgICBdLmluZGV4T2Yoc2VsZWN0b3IpID49IDA7XG5cbiAgICBpZiAoIWtlZXBWaWV3ICYmIHNlbGVjdG9yLmluZGV4T2YoJ1ZpZXcnKSA9PT0gc2VsZWN0b3IubGVuZ3RoIC0gNCkge1xuICAgICAgcmV0dXJuIHNlbGVjdG9yLnN1YnN0cigwLCBzZWxlY3Rvci5sZW5ndGggLSA0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHNlbGVjdG9yO1xuICAgIH1cbiAgfVxuXG4gIGlmIChzdHJhdGVneSA9PT0gJ2NsYXNzIG5hbWUnKSB7XG4gICAgLy8gWENVSVRlc3QgY2xhc3NlcyBoYXZlIGBYQ1VJRWxlbWVudFR5cGVgIHByZXBlbmRlZFxuICAgIC8vIGZpcnN0IGNoZWNrIGlmIHRoZXJlIGlzIHRoZSBvbGQgYFVJQWAgcHJlZml4XG4gICAgaWYgKHNlbGVjdG9yLmluZGV4T2YoJ1VJQScpID09PSAwKSB7XG4gICAgICBzZWxlY3RvciA9IHNlbGVjdG9yLnN1YnN0cmluZygzKTtcbiAgICB9XG4gICAgLy8gbm93IGNoZWNrIGlmIHdlIG5lZWQgdG8gYWRkIGBYQ1VJRWxlbWVudFR5cGVgXG4gICAgaWYgKHNlbGVjdG9yLmluZGV4T2YoJ1hDVUlFbGVtZW50VHlwZScpICE9PSAwKSB7XG4gICAgICBzZWxlY3RvciA9IHN0cmlwVmlld0Zyb21TZWxlY3RvcihgWENVSUVsZW1lbnRUeXBlJHtzZWxlY3Rvcn1gKTtcbiAgICAgIHJld3JvdGVTZWxlY3RvciA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgaWYgKHN0cmF0ZWd5ID09PSAneHBhdGgnICYmIE1BR0lDX0ZJUlNUX1ZJU19DSElMRF9TRUwudGVzdChzZWxlY3RvcikpIHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5nZXRGaXJzdFZpc2libGVDaGlsZChtdWx0LCBjb250ZXh0KTtcbiAgfSBlbHNlIGlmIChzdHJhdGVneSA9PT0gJ3hwYXRoJyAmJiBNQUdJQ19TQ1JPTExBQkxFX1NFTC50ZXN0KHNlbGVjdG9yKSkge1xuICAgIFtzdHJhdGVneSwgc2VsZWN0b3JdID0gcmV3cml0ZU1hZ2ljU2Nyb2xsYWJsZShtdWx0KTtcbiAgfSBlbHNlIGlmIChzdHJhdGVneSA9PT0gJ3hwYXRoJykge1xuICAgIC8vIFJlcGxhY2UgVUlBIGlmIGl0IGNvbWVzIGFmdGVyIGEgZm9yd2FyZCBzbGFzaCBvciBpcyBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBzdHJpbmdcbiAgICBzZWxlY3RvciA9IHNlbGVjdG9yLnJlcGxhY2UoLyhefFxcLykoVUlBKShbXlxcW1xcL10rKS9nLCAoc3RyLCBnMSwgZzIsIGczKSA9PiB7XG4gICAgICByZXdyb3RlU2VsZWN0b3IgPSB0cnVlO1xuICAgICAgcmV0dXJuIGcxICsgc3RyaXBWaWV3RnJvbVNlbGVjdG9yKGBYQ1VJRWxlbWVudFR5cGUke2czfWApO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKHJld3JvdGVTZWxlY3Rvcikge1xuICAgIGxvZy5pbmZvKGBSZXdyb3RlIGluY29taW5nIHNlbGVjdG9yIGZyb20gJyR7aW5pdFNlbGVjdG9yfScgdG8gYCArXG4gICAgICAgICAgICAgYCcke3NlbGVjdG9yfScgdG8gbWF0Y2ggWENVSSB0eXBlLiBZb3Ugc2hvdWxkIGNvbnNpZGVyIGAgK1xuICAgICAgICAgICAgIGB1cGRhdGluZyB5b3VyIHRlc3RzIHRvIHVzZSB0aGUgbmV3IHNlbGVjdG9ycyBkaXJlY3RseWApO1xuICB9XG5cbiAgcmV0dXJuIGF3YWl0IHRoaXMuZG9OYXRpdmVGaW5kKHN0cmF0ZWd5LCBzZWxlY3RvciwgbXVsdCwgY29udGV4dCk7XG59O1xuXG5oZWxwZXJzLmRvTmF0aXZlRmluZCA9IGFzeW5jIGZ1bmN0aW9uIChzdHJhdGVneSwgc2VsZWN0b3IsIG11bHQsIGNvbnRleHQpIHtcbiAgY29udGV4dCA9IHV0aWwudW53cmFwRWxlbWVudChjb250ZXh0KTtcblxuICBsZXQgZW5kcG9pbnQgPSBgL2VsZW1lbnQke2NvbnRleHQgPyBgLyR7Y29udGV4dH0vZWxlbWVudGAgOiAnJ30ke211bHQgPyAncycgOiAnJ31gO1xuXG4gIGxldCBib2R5ID0ge1xuICAgIHVzaW5nOiBzdHJhdGVneSxcbiAgICB2YWx1ZTogc2VsZWN0b3JcbiAgfTtcblxuICBsZXQgbWV0aG9kID0gJ1BPU1QnO1xuXG4gIGxldCBlbHM7XG4gIHRyeSB7XG4gICAgYXdhaXQgdGhpcy5pbXBsaWNpdFdhaXRGb3JDb25kaXRpb24oYXN5bmMgKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZWxzID0gYXdhaXQgdGhpcy5wcm94eUNvbW1hbmQoZW5kcG9pbnQsIG1ldGhvZCwgYm9keSk7XG4gICAgICAgIGlmIChtdWx0KSB7XG4gICAgICAgICAgLy8gd2Ugc3VjY2VlZCBpZiB3ZSBnZXQgc29tZSBlbGVtZW50c1xuICAgICAgICAgIHJldHVybiBlbHMgJiYgZWxzLmxlbmd0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyB3ZSBtYXkgbm90IGdldCBhbnkgc3RhdHVzLCB3aGljaCBtZWFucyBzdWNjZXNzXG4gICAgICAgICAgcmV0dXJuICFlbHMuc3RhdHVzIHx8IGVscy5zdGF0dXMgPT09IDA7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBlbHMgPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgaWYgKGVyci5tZXNzYWdlICYmIGVyci5tZXNzYWdlLm1hdGNoKC9Db25kaXRpb24gdW5tZXQvKSkge1xuICAgICAgLy8gY29uZGl0aW9uIHdhcyBub3QgbWV0IHNldHRpbmcgcmVzIHRvIGVtcHR5IGFycmF5XG4gICAgICBlbHMgPSBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfVxuICBpZiAobXVsdCkge1xuICAgIHJldHVybiBlbHM7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCFlbHMgfHwgXy5zaXplKGVscykgPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBlcnJvcnMuTm9TdWNoRWxlbWVudEVycm9yKCk7XG4gICAgfVxuICAgIHJldHVybiBlbHM7XG4gIH1cbn07XG5cbmhlbHBlcnMuZ2V0Rmlyc3RWaXNpYmxlQ2hpbGQgPSBhc3luYyBmdW5jdGlvbiAobXVsdCwgY29udGV4dCkge1xuICBsb2cuaW5mbyhgR2V0dGluZyBmaXJzdCB2aXNpYmxlIGNoaWxkYCk7XG4gIGlmIChtdWx0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGdldCBtdWx0aXBsZSBmaXJzdCB2aXNpYmxlIGNoaWxkcmVuIVwiKTtcbiAgfVxuICBpZiAoIWNvbnRleHQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZ2V0IGZpcnN0IHZpc2libGUgY2hpbGQgd2l0aG91dCBhIGNvbnRleHQgZWxlbWVudFwiKTtcbiAgfVxuICBsZXQgaW5kZXggPSAxO1xuICAvLyBsb29wIHRocm91Z2ggY2hpbGRyZW4gdmlhIGNsYXNzLWNoYWluIGZpbmRzLCB1bnRpbCB3ZSBydW4gb3V0IG9mIGNoaWxkcmVuXG4gIC8vIG9yIHdlIGZpbmQgYSB2aXNpYmxlIG9uZS4gVGhpcyBsb29wIGxvb2tzIGluZmluaXRlIGJ1dCBpdHMgbm90LCBiZWNhdXNlIGF0XG4gIC8vIHNvbWUgcG9pbnQgdGhlIGNhbGwgdG8gZG9OYXRpdmVGaW5kIHdpbGwgdGhyb3cgd2l0aCBhbiBFbGVtZW50IE5vdCBGb3VuZFxuICAvLyBlcnJvciwgd2hlbiB0aGUgaW5kZXggZ2V0cyBoaWdoZXIgdGhhbiB0aGUgbnVtYmVyIG9mIGNoaWxkIGVsZW1lbnRzLiBUaGlzXG4gIC8vIGlzIHdoYXQgd2Ugd2FudCBiZWNhdXNlIHRoYXQgZXJyb3Igd2lsbCBoYWx0IHRoZSBsb29wIGFuZCBtYWtlIGl0IGFsbCB0aGVcbiAgLy8gd2F5IHRvIHRoZSBjbGllbnQuXG4gIHdoaWxlICh0cnVlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc3RhbnQtY29uZGl0aW9uXG4gICAgY29uc3Qgc3RyYXRlZ3kgPSBXREFfQ0xBU1NfQ0hBSU5fU1RSQVRFR1k7XG4gICAgY29uc3Qgc2VsZWN0b3IgPSBgKlske2luZGV4fV1gO1xuICAgIGNvbnN0IG50aENoaWxkID0gYXdhaXQgdGhpcy5kb05hdGl2ZUZpbmQoc3RyYXRlZ3ksIHNlbGVjdG9yLCBmYWxzZSwgY29udGV4dCk7XG4gICAgY29uc3QgdmlzaWJsZSA9IGF3YWl0IHRoaXMuZ2V0QXR0cmlidXRlKCd2aXNpYmxlJywgbnRoQ2hpbGQpO1xuICAgIGlmICh2aXNpYmxlID09PSBcInRydWVcIikge1xuICAgICAgbG9nLmluZm8oYEZvdW5kIGZpcnN0IHZpc2libGUgY2hpbGQgYXQgcG9zaXRpb24gJHtpbmRleH1gKTtcbiAgICAgIHJldHVybiBudGhDaGlsZDtcbiAgICB9XG4gICAgaW5kZXgrKztcbiAgfVxufTtcblxuZnVuY3Rpb24gcmV3cml0ZU1hZ2ljU2Nyb2xsYWJsZSAobXVsdCkge1xuICBjb25zdCB0eXBlcyA9IFtcbiAgICAnU2Nyb2xsVmlldycsXG4gICAgJ1RhYmxlJyxcbiAgICAnQ29sbGVjdGlvblZpZXcnLFxuICAgICdXZWJWaWV3J1xuICBdLm1hcCh0ID0+IGBYQ1VJRWxlbWVudFR5cGUke3R9YCk7XG4gIGNvbnN0IHByZWQgPSB0eXBlcy5tYXAodCA9PiBgdHlwZSA9PSBcIiR7dH1cImApLmpvaW4oXCIgT1IgXCIpO1xuICBjb25zdCBzdHJhdGVneSA9IFdEQV9DTEFTU19DSEFJTl9TVFJBVEVHWTtcbiAgbGV0IHNlbGVjdG9yID0gJyoqLypbYCcgKyBwcmVkICsgJ2BdJztcbiAgaWYgKCFtdWx0KSB7XG4gICAgc2VsZWN0b3IgKz0gJ1sxXSc7XG4gIH1cbiAgbG9nLmluZm8oXCJSZXdyb3RlIHJlcXVlc3QgZm9yIHNjcm9sbGFibGUgZGVzY2VuZGFudHMgdG8gY2xhc3MgY2hhaW4gXCIgK1xuICAgICAgICAgICBgZm9ybWF0IHdpdGggc2VsZWN0b3IgJyR7c2VsZWN0b3J9J2ApO1xuICByZXR1cm4gW3N0cmF0ZWd5LCBzZWxlY3Rvcl07XG59XG5cblxuT2JqZWN0LmFzc2lnbihleHRlbnNpb25zLCBjb21tYW5kcywgaGVscGVycyk7XG5leHBvcnQgeyBjb21tYW5kcywgaGVscGVyc307XG5leHBvcnQgZGVmYXVsdCBleHRlbnNpb25zO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLiJ9
