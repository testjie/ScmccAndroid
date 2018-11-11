'use strict';

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _asyncbox = require('asyncbox');

var _desired = require('../../desired');

var _helpersSession = require('../../helpers/session');

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var BUTTON_CLASS = 'android.widget.Button';
var EDITTEXT_CLASS = 'android.widget.EditText';

var PACKAGE = 'io.appium.android.apis';
var TEXTFIELD_ACTIVITY = '.view.TextFields';
var KEYEVENT_ACTIVITY = '.text.KeyEventText';

var defaultAsciiCaps = _Object$assign({}, _desired.APIDEMOS_CAPS, {
  newCommandTimeout: 90,
  appPackage: PACKAGE,
  appActivity: TEXTFIELD_ACTIVITY
});

var defaultUnicodeCaps = _Object$assign({}, defaultAsciiCaps, {
  unicodeKeyboard: true,
  resetKeyboard: true
});

function deSamsungify(text) {
  // For samsung S5 text is appended with ". Editing."
  return text.replace(". Editing.", "");
}

function getElement(driver, className) {
  return _regeneratorRuntime.async(function getElement$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(process.env.TESTOBJECT_E2E_TESTS ? 100 : 10, 1000, function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(driver.elementByClassName(className));

              case 2:
                return context$2$0.abrupt('return', context$2$0.sent);

              case 3:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        }));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function waitForText(element, expectedText) {
  return _regeneratorRuntime.async(function waitForText$(context$1$0) {
    var _this2 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(process.env.TESTOBJECT_E2E_TESTS ? 100 : 10, 1000, function callee$1$0() {
          var text;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(element.text());

              case 2:
                text = context$2$0.sent;

                if (!(text !== expectedText)) {
                  context$2$0.next = 5;
                  break;
                }

                throw new Error('Unexpected element text. Actual: "' + text + '". Expected: "' + expectedText + '"');

              case 5:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this2);
        }));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function runTextEditTest(driver, testText) {
  var keys = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
  var el;
  return _regeneratorRuntime.async(function runTextEditTest$(context$1$0) {
    var _this3 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(getElement(driver, EDITTEXT_CLASS));

      case 2:
        el = context$1$0.sent;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(el.clear());

      case 5:
        if (!keys) {
          context$1$0.next = 10;
          break;
        }

        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(driver.keys([testText]));

      case 8:
        context$1$0.next = 12;
        break;

      case 10:
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(el.sendKeys(testText));

      case 12:
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(process.env.TESTOBJECT_E2E_TESTS ? 100 : 10, 1000, function callee$1$0() {
          var text;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(el.text());

              case 2:
                text = context$2$0.sent;

                deSamsungify(text).should.be.equal(testText);

              case 4:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this3);
        }));

      case 14:
        return context$1$0.abrupt('return', el);

      case 15:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

/*
 * The key event page needs to be cleared between runs, or else we get false
 * positives from previously run tests. The page has a single button that
 * removes all text from within the main TextView.
 */
function clearKeyEvents(driver) {
  var el;
  return _regeneratorRuntime.async(function clearKeyEvents$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(getElement(driver, BUTTON_CLASS));

      case 2:
        el = context$1$0.sent;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(el.click());

      case 5:
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(_bluebird2['default'].delay(500));

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function keyEventTest(driver, keyCode, metaState, expectedTextArray) {
  var runTest, text, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, expectedText;

  return _regeneratorRuntime.async(function keyEventTest$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        runTest = function runTest() {
          var el;
          return _regeneratorRuntime.async(function runTest$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(driver.pressKeycode(keyCode, metaState));

              case 2:
                el = driver.elementById('io.appium.android.apis:id/text');
                context$2$0.next = 5;
                return _regeneratorRuntime.awrap(el.text());

              case 5:
                return context$2$0.abrupt('return', context$2$0.sent);

              case 6:
              case 'end':
                return context$2$0.stop();
            }
          }, null, this);
        };

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(clearKeyEvents(driver));

      case 3:
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(runTest());

      case 5:
        text = context$1$0.sent;

        if (text) {
          context$1$0.next = 10;
          break;
        }

        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(runTest());

      case 9:
        text = context$1$0.sent;

      case 10:
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 13;

        for (_iterator = _getIterator(expectedTextArray); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          expectedText = _step.value;

          text.should.include(expectedText);
        }
        context$1$0.next = 21;
        break;

      case 17:
        context$1$0.prev = 17;
        context$1$0.t0 = context$1$0['catch'](13);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 21:
        context$1$0.prev = 21;
        context$1$0.prev = 22;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 24:
        context$1$0.prev = 24;

        if (!_didIteratorError) {
          context$1$0.next = 27;
          break;
        }

        throw _iteratorError;

      case 27:
        return context$1$0.finish(24);

      case 28:
        return context$1$0.finish(21);

      case 29:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[13, 17, 21, 29], [22,, 24, 28]]);
}

function runCombinationKeyEventTest(driver) {
  return _regeneratorRuntime.async(function runCombinationKeyEventTest$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(keyEventTest(driver, 29, 193, ['keyCode=KEYCODE_A', 'metaState=META_SHIFT_ON']));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function runKeyEventTest(driver) {
  return _regeneratorRuntime.async(function runKeyEventTest$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(keyEventTest(driver, 82, undefined, ['[keycode=82]', 'keyCode=KEYCODE_MENU']));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

var tests = [{ label: 'editing a text field', text: 'Life, the Universe and Everything.' }, { label: 'sending \'&-\'', text: '&-' }, { label: 'sending \'&\' and \'-\' in other text', text: 'In the mid-1990s he ate fish & chips as mayor-elect.' }, { label: 'sending \'-\' in text', text: 'Super-test.' }, { label: 'sending numbers', text: '0123456789' }];

var unicodeTests = [{ label: 'should be able to send \'-\' in unicode text', text: 'परीक्षा-परीक्षण' }, { label: 'should be able to send \'&\' in text', text: 'Fish & chips' }, { label: 'should be able to send \'&\' in unicode text', text: 'Mīna & chips' }, { label: 'should be able to send roman characters with diacritics', text: 'Áé Œ ù ḍ' }, { label: 'should be able to send a \'u\' with an umlaut', text: 'ü' }];

var languageTests = [{ label: 'should be able to send Tamil', text: 'சோதனை' }, { label: 'should be able to send Gujarati', text: 'પરીક્ષણ' }, { label: 'should be able to send Chinese', text: '测试' }, { label: 'should be able to send Russian', text: 'тестирование' }, { label: 'should be able to send Arabic', text: 'تجريب' }, { label: 'should be able to send Hebrew', text: 'בדיקות' }];

describe('keyboard', function () {
  describe('ascii', function () {
    var driver = undefined;
    before(function callee$2$0() {
      var engines, selectedEngine, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, engine;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(defaultAsciiCaps));

          case 2:
            driver = context$3$0.sent;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.availableIMEEngines());

          case 5:
            engines = context$3$0.sent;
            selectedEngine = _lodash2['default'].first(engines);
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            context$3$0.prev = 10;

            for (_iterator2 = _getIterator(engines); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              engine = _step2.value;

              // it seems that the latin ime has `android.inputmethod` in its package name
              if (engine.indexOf('android.inputmethod') !== -1) {
                selectedEngine = engine;
              }
            }
            context$3$0.next = 18;
            break;

          case 14:
            context$3$0.prev = 14;
            context$3$0.t0 = context$3$0['catch'](10);
            _didIteratorError2 = true;
            _iteratorError2 = context$3$0.t0;

          case 18:
            context$3$0.prev = 18;
            context$3$0.prev = 19;

            if (!_iteratorNormalCompletion2 && _iterator2['return']) {
              _iterator2['return']();
            }

          case 21:
            context$3$0.prev = 21;

            if (!_didIteratorError2) {
              context$3$0.next = 24;
              break;
            }

            throw _iteratorError2;

          case 24:
            return context$3$0.finish(21);

          case 25:
            return context$3$0.finish(18);

          case 26:
            context$3$0.next = 28;
            return _regeneratorRuntime.awrap(driver.activateIMEEngine(selectedEngine));

          case 28:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this, [[10, 14, 18, 26], [19,, 21, 25]]);
    });
    after(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.quit());

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    describe('editing a text field', function () {
      var els = undefined;
      beforeEach(function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(5, 1000, function callee$4$0() {
                var els;
                return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
                  while (1) switch (context$5$0.prev = context$5$0.next) {
                    case 0:
                      context$5$0.next = 2;
                      return _regeneratorRuntime.awrap(driver.elementsByClassName(EDITTEXT_CLASS));

                    case 2:
                      els = context$5$0.sent;

                      els.should.have.length.at.least(1);
                      return context$5$0.abrupt('return', els);

                    case 5:
                    case 'end':
                      return context$5$0.stop();
                  }
                }, null, this);
              }));

            case 2:
              els = context$4$0.sent;

            case 3:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        var _loop = function () {
          var test = _step3.value;

          describe(test.label, function () {
            it('should work with setValue', function callee$5$0() {
              return _regeneratorRuntime.async(function callee$5$0$(context$6$0) {
                while (1) switch (context$6$0.prev = context$6$0.next) {
                  case 0:
                    context$6$0.next = 2;
                    return _regeneratorRuntime.awrap(runTextEditTest(driver, test.text));

                  case 2:
                  case 'end':
                    return context$6$0.stop();
                }
              }, null, this);
            });
            it('should work with keys', function callee$5$0() {
              return _regeneratorRuntime.async(function callee$5$0$(context$6$0) {
                while (1) switch (context$6$0.prev = context$6$0.next) {
                  case 0:
                    context$6$0.next = 2;
                    return _regeneratorRuntime.awrap(runTextEditTest(driver, test.text, true));

                  case 2:
                  case 'end':
                    return context$6$0.stop();
                }
              }, null, this);
            });
          });
        };

        for (var _iterator3 = _getIterator(tests), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          _loop();
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

      it('should be able to clear a password field', function callee$3$0() {
        var password, passwordTextField, passwordOutput;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              password = 'super-duper password';
              passwordTextField = els[1];
              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(driver.elementById('io.appium.android.apis:id/edit1Text'));

            case 4:
              passwordOutput = context$4$0.sent;
              context$4$0.next = 7;
              return _regeneratorRuntime.awrap(passwordTextField.sendKeys(password));

            case 7:
              context$4$0.next = 9;
              return _regeneratorRuntime.awrap(waitForText(passwordOutput, password));

            case 9:
              context$4$0.next = 11;
              return _regeneratorRuntime.awrap(passwordTextField.clear());

            case 11:
              context$4$0.next = 13;
              return _regeneratorRuntime.awrap(waitForText(passwordOutput, ''));

            case 13:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });

      it('should be able to type in length-limited field', function callee$3$0() {
        var adb, el, text;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              if (process.env.TESTOBJECT_E2E_TESTS) {
                context$4$0.next = 8;
                break;
              }

              adb = new _appiumAdb2['default']();
              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(adb.getApiLevel());

            case 4:
              context$4$0.t0 = context$4$0.sent;
              context$4$0.t1 = parseInt(context$4$0.t0, 10);

              if (!(context$4$0.t1 < 24)) {
                context$4$0.next = 8;
                break;
              }

              return context$4$0.abrupt('return', this.skip());

            case 8:
              el = els[3];
              context$4$0.next = 11;
              return _regeneratorRuntime.awrap(el.setImmediateValue('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'));

            case 11:
              context$4$0.next = 13;
              return _regeneratorRuntime.awrap(el.text());

            case 13:
              text = context$4$0.sent;

              text.should.eql('0123456789a');

            case 15:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
    });

    describe('sending a key event', function () {
      before(function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.startActivity({ appPackage: PACKAGE, appActivity: KEYEVENT_ACTIVITY }));

            case 2:
              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(_bluebird2['default'].delay(500));

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });

      it('should be able to send combination keyevents', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(runCombinationKeyEventTest(driver));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should be able to send keyevents', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(runKeyEventTest(driver));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
    });
  });

  describe('unicode', function () {
    var adb = undefined;
    if (!process.env.TESTOBJECT_E2E_TESTS) {
      adb = new _appiumAdb2['default']();
    }
    var initialIME = undefined;
    var driver = undefined;
    before(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            if (!adb) {
              context$3$0.next = 5;
              break;
            }

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.defaultIME());

          case 3:
            initialIME = context$3$0.sent;

            initialIME.should.not.eql('io.appium.android.ime/.UnicodeIME');

          case 5:
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(defaultUnicodeCaps));

          case 7:
            driver = context$3$0.sent;

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    after(function callee$2$0() {
      var ime;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.quit());

          case 2:
            if (!adb) {
              context$3$0.next = 8;
              break;
            }

            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(adb.defaultIME());

          case 5:
            ime = context$3$0.sent;

            ime.should.eql(initialIME);
            ime.should.not.eql('io.appium.android.ime/.UnicodeIME');

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    describe('editing a text field', function () {
      var _arr = [tests, unicodeTests, languageTests];

      for (var _i = 0; _i < _arr.length; _i++) {
        var testSet = _arr[_i];var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          var _loop2 = function () {
            var test = _step4.value;

            describe(test.label, function () {
              it('should work with setValue', function callee$5$0() {
                return _regeneratorRuntime.async(function callee$5$0$(context$6$0) {
                  while (1) switch (context$6$0.prev = context$6$0.next) {
                    case 0:
                      context$6$0.next = 2;
                      return _regeneratorRuntime.awrap(runTextEditTest(driver, test.text));

                    case 2:
                    case 'end':
                      return context$6$0.stop();
                  }
                }, null, this);
              });
              it('should work with keys', function callee$5$0() {
                return _regeneratorRuntime.async(function callee$5$0$(context$6$0) {
                  while (1) switch (context$6$0.prev = context$6$0.next) {
                    case 0:
                      context$6$0.next = 2;
                      return _regeneratorRuntime.awrap(runTextEditTest(driver, test.text, true));

                    case 2:
                    case 'end':
                      return context$6$0.stop();
                  }
                }, null, this);
              });
            });
          };

          for (var _iterator4 = _getIterator(testSet), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            _loop2();
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
    });

    describe('sending a key event', function () {
      before(function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.startActivity({ appPackage: PACKAGE, appActivity: KEYEVENT_ACTIVITY }));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });

      it('should be able to send combination keyevents', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(runCombinationKeyEventTest(driver));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
      it('should be able to send keyevents', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(runKeyEventTest(driver));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
    });
  });
});

// wait a moment for the clearing to occur, lest we too quickly try to enter more text

// the test is flakey... try again

// sometimes the default ime is not what we are using

// there is currently no way to directly assert anything about the contents
// of a password field, since there is no way to access the contents

// below Android 7.0 (API level 24) typing too many characters in a
// length-limited field will either throw a NullPointerException or
// crash the app

// expect first 11 characters (limit of the field) to be in the field

// save the initial ime so we can make sure it is restored

// make sure the IME has been restored
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9rZXlib2FyZC9rZXlib2FyZC1lMmUtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7c0JBQy9CLFFBQVE7Ozs7d0JBQ1IsVUFBVTs7Ozt3QkFDTSxVQUFVOzt1QkFDVixlQUFlOzs4QkFDbEIsdUJBQXVCOzt5QkFDbEMsWUFBWTs7OztBQUc1QixrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLElBQU0sWUFBWSxHQUFHLHVCQUF1QixDQUFDO0FBQzdDLElBQU0sY0FBYyxHQUFHLHlCQUF5QixDQUFDOztBQUVqRCxJQUFNLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQztBQUN6QyxJQUFNLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO0FBQzlDLElBQU0saUJBQWlCLEdBQUcsb0JBQW9CLENBQUM7O0FBRS9DLElBQUksZ0JBQWdCLEdBQUcsZUFBYyxFQUFFLDBCQUFpQjtBQUN0RCxtQkFBaUIsRUFBRSxFQUFFO0FBQ3JCLFlBQVUsRUFBRSxPQUFPO0FBQ25CLGFBQVcsRUFBRSxrQkFBa0I7Q0FDaEMsQ0FBQyxDQUFDOztBQUVILElBQUksa0JBQWtCLEdBQUcsZUFBYyxFQUFFLEVBQUUsZ0JBQWdCLEVBQUU7QUFDM0QsaUJBQWUsRUFBRSxJQUFJO0FBQ3JCLGVBQWEsRUFBRSxJQUFJO0NBQ3BCLENBQUMsQ0FBQzs7QUFFSCxTQUFTLFlBQVksQ0FBRSxJQUFJLEVBQUU7O0FBRTNCLFNBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7Q0FDdkM7O0FBRUQsU0FBZSxVQUFVLENBQUUsTUFBTSxFQUFFLFNBQVM7Ozs7Ozs7eUNBQzdCLDZCQUFjLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEdBQUcsR0FBRyxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUU7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QyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUMsQ0FBQzs7Ozs7OztPQUNsRixDQUFDLENBQUM7O0FBRUgsUUFBRSxDQUFDLDhDQUE4QyxFQUFFOzs7OzsrQ0FDM0MsMEJBQTBCLENBQUMsTUFBTSxDQUFDOzs7Ozs7O09BQ3pDLENBQUMsQ0FBQztBQUNILFFBQUUsQ0FBQyxrQ0FBa0MsRUFBRTs7Ozs7K0NBQy9CLGVBQWUsQ0FBQyxNQUFNLENBQUM7Ozs7Ozs7T0FDOUIsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9rZXlib2FyZC9rZXlib2FyZC1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgQiBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgeyByZXRyeUludGVydmFsIH0gZnJvbSAnYXN5bmNib3gnO1xuaW1wb3J0IHsgQVBJREVNT1NfQ0FQUyB9IGZyb20gJy4uLy4uL2Rlc2lyZWQnO1xuaW1wb3J0IHsgaW5pdERyaXZlciB9IGZyb20gJy4uLy4uL2hlbHBlcnMvc2Vzc2lvbic7XG5pbXBvcnQgQURCIGZyb20gJ2FwcGl1bS1hZGInO1xuXG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmNvbnN0IEJVVFRPTl9DTEFTUyA9ICdhbmRyb2lkLndpZGdldC5CdXR0b24nO1xuY29uc3QgRURJVFRFWFRfQ0xBU1MgPSAnYW5kcm9pZC53aWRnZXQuRWRpdFRleHQnO1xuXG5jb25zdCBQQUNLQUdFID0gJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnO1xuY29uc3QgVEVYVEZJRUxEX0FDVElWSVRZID0gJy52aWV3LlRleHRGaWVsZHMnO1xuY29uc3QgS0VZRVZFTlRfQUNUSVZJVFkgPSAnLnRleHQuS2V5RXZlbnRUZXh0JztcblxubGV0IGRlZmF1bHRBc2NpaUNhcHMgPSBPYmplY3QuYXNzaWduKHt9LCBBUElERU1PU19DQVBTLCB7XG4gIG5ld0NvbW1hbmRUaW1lb3V0OiA5MCxcbiAgYXBwUGFja2FnZTogUEFDS0FHRSxcbiAgYXBwQWN0aXZpdHk6IFRFWFRGSUVMRF9BQ1RJVklUWVxufSk7XG5cbmxldCBkZWZhdWx0VW5pY29kZUNhcHMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0QXNjaWlDYXBzLCB7XG4gIHVuaWNvZGVLZXlib2FyZDogdHJ1ZSxcbiAgcmVzZXRLZXlib2FyZDogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIGRlU2Ftc3VuZ2lmeSAodGV4dCkge1xuICAvLyBGb3Igc2Ftc3VuZyBTNSB0ZXh0IGlzIGFwcGVuZGVkIHdpdGggXCIuIEVkaXRpbmcuXCJcbiAgcmV0dXJuIHRleHQucmVwbGFjZShcIi4gRWRpdGluZy5cIiwgXCJcIik7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEVsZW1lbnQgKGRyaXZlciwgY2xhc3NOYW1lKSB7XG4gIHJldHVybiBhd2FpdCByZXRyeUludGVydmFsKHByb2Nlc3MuZW52LlRFU1RPQkpFQ1RfRTJFX1RFU1RTID8gMTAwIDogMTAsIDEwMDAsIGFzeW5jICgpID0+IHtcbiAgICByZXR1cm4gYXdhaXQgZHJpdmVyLmVsZW1lbnRCeUNsYXNzTmFtZShjbGFzc05hbWUpO1xuICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gd2FpdEZvclRleHQgKGVsZW1lbnQsIGV4cGVjdGVkVGV4dCkge1xuICByZXR1cm4gYXdhaXQgcmV0cnlJbnRlcnZhbChwcm9jZXNzLmVudi5URVNUT0JKRUNUX0UyRV9URVNUUyA/IDEwMCA6IDEwLCAxMDAwLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgdGV4dCA9IGF3YWl0IGVsZW1lbnQudGV4dCgpO1xuICAgIGlmICh0ZXh0ICE9PSBleHBlY3RlZFRleHQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCBlbGVtZW50IHRleHQuIEFjdHVhbDogXCIke3RleHR9XCIuIEV4cGVjdGVkOiBcIiR7ZXhwZWN0ZWRUZXh0fVwiYCk7XG4gICAgfVxuICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcnVuVGV4dEVkaXRUZXN0IChkcml2ZXIsIHRlc3RUZXh0LCBrZXlzID0gZmFsc2UpIHtcbiAgbGV0IGVsID0gYXdhaXQgZ2V0RWxlbWVudChkcml2ZXIsIEVESVRURVhUX0NMQVNTKTtcbiAgYXdhaXQgZWwuY2xlYXIoKTtcblxuICBpZiAoa2V5cykge1xuICAgIGF3YWl0IGRyaXZlci5rZXlzKFt0ZXN0VGV4dF0pO1xuICB9IGVsc2Uge1xuICAgIGF3YWl0IGVsLnNlbmRLZXlzKHRlc3RUZXh0KTtcbiAgfVxuXG4gIGF3YWl0IHJldHJ5SW50ZXJ2YWwocHJvY2Vzcy5lbnYuVEVTVE9CSkVDVF9FMkVfVEVTVFMgPyAxMDAgOiAxMCwgMTAwMCwgYXN5bmMgKCkgPT4ge1xuICAgIGxldCB0ZXh0ID0gYXdhaXQgZWwudGV4dCgpO1xuICAgIGRlU2Ftc3VuZ2lmeSh0ZXh0KS5zaG91bGQuYmUuZXF1YWwodGVzdFRleHQpO1xuICB9KTtcblxuICByZXR1cm4gZWw7XG59XG5cbi8qXG4gKiBUaGUga2V5IGV2ZW50IHBhZ2UgbmVlZHMgdG8gYmUgY2xlYXJlZCBiZXR3ZWVuIHJ1bnMsIG9yIGVsc2Ugd2UgZ2V0IGZhbHNlXG4gKiBwb3NpdGl2ZXMgZnJvbSBwcmV2aW91c2x5IHJ1biB0ZXN0cy4gVGhlIHBhZ2UgaGFzIGEgc2luZ2xlIGJ1dHRvbiB0aGF0XG4gKiByZW1vdmVzIGFsbCB0ZXh0IGZyb20gd2l0aGluIHRoZSBtYWluIFRleHRWaWV3LlxuICovXG5hc3luYyBmdW5jdGlvbiBjbGVhcktleUV2ZW50cyAoZHJpdmVyKSB7XG4gIGxldCBlbCA9IGF3YWl0IGdldEVsZW1lbnQoZHJpdmVyLCBCVVRUT05fQ0xBU1MpO1xuICBhd2FpdCBlbC5jbGljaygpO1xuXG4gIC8vIHdhaXQgYSBtb21lbnQgZm9yIHRoZSBjbGVhcmluZyB0byBvY2N1ciwgbGVzdCB3ZSB0b28gcXVpY2tseSB0cnkgdG8gZW50ZXIgbW9yZSB0ZXh0XG4gIGF3YWl0IEIuZGVsYXkoNTAwKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24ga2V5RXZlbnRUZXN0IChkcml2ZXIsIGtleUNvZGUsIG1ldGFTdGF0ZSwgZXhwZWN0ZWRUZXh0QXJyYXkpIHtcbiAgbGV0IHJ1blRlc3QgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLnByZXNzS2V5Y29kZShrZXlDb2RlLCBtZXRhU3RhdGUpO1xuICAgIGxldCBlbCA9IGRyaXZlci5lbGVtZW50QnlJZCgnaW8uYXBwaXVtLmFuZHJvaWQuYXBpczppZC90ZXh0Jyk7XG4gICAgcmV0dXJuIGF3YWl0IGVsLnRleHQoKTtcbiAgfTtcblxuICBhd2FpdCBjbGVhcktleUV2ZW50cyhkcml2ZXIpO1xuXG4gIGxldCB0ZXh0ID0gYXdhaXQgcnVuVGVzdCgpO1xuICBpZiAoIXRleHQpIHtcbiAgICAvLyB0aGUgdGVzdCBpcyBmbGFrZXkuLi4gdHJ5IGFnYWluXG4gICAgdGV4dCA9IGF3YWl0IHJ1blRlc3QoKTtcbiAgfVxuICBmb3IgKGxldCBleHBlY3RlZFRleHQgb2YgZXhwZWN0ZWRUZXh0QXJyYXkpIHtcbiAgICB0ZXh0LnNob3VsZC5pbmNsdWRlKGV4cGVjdGVkVGV4dCk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gcnVuQ29tYmluYXRpb25LZXlFdmVudFRlc3QgKGRyaXZlcikge1xuICBhd2FpdCBrZXlFdmVudFRlc3QoZHJpdmVyLCAyOSwgMTkzLCBbJ2tleUNvZGU9S0VZQ09ERV9BJywgJ21ldGFTdGF0ZT1NRVRBX1NISUZUX09OJ10pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBydW5LZXlFdmVudFRlc3QgKGRyaXZlcikge1xuICBhd2FpdCBrZXlFdmVudFRlc3QoZHJpdmVyLCA4MiwgdW5kZWZpbmVkLCBbJ1trZXljb2RlPTgyXScsICdrZXlDb2RlPUtFWUNPREVfTUVOVSddKTtcbn1cblxubGV0IHRlc3RzID0gW1xuICB7IGxhYmVsOiAnZWRpdGluZyBhIHRleHQgZmllbGQnLCB0ZXh0OiAnTGlmZSwgdGhlIFVuaXZlcnNlIGFuZCBFdmVyeXRoaW5nLicgfSxcbiAgeyBsYWJlbDogJ3NlbmRpbmcgXFwnJi1cXCcnLCB0ZXh0OiAnJi0nIH0sXG4gIHsgbGFiZWw6ICdzZW5kaW5nIFxcJyZcXCcgYW5kIFxcJy1cXCcgaW4gb3RoZXIgdGV4dCcsIHRleHQ6ICdJbiB0aGUgbWlkLTE5OTBzIGhlIGF0ZSBmaXNoICYgY2hpcHMgYXMgbWF5b3ItZWxlY3QuJyB9LFxuICB7IGxhYmVsOiAnc2VuZGluZyBcXCctXFwnIGluIHRleHQnLCB0ZXh0OiAnU3VwZXItdGVzdC4nIH0sXG4gIHsgbGFiZWw6ICdzZW5kaW5nIG51bWJlcnMnLCB0ZXh0OiAnMDEyMzQ1Njc4OSd9LFxuXTtcblxubGV0IHVuaWNvZGVUZXN0cyA9IFtcbiAgeyBsYWJlbDogJ3Nob3VsZCBiZSBhYmxlIHRvIHNlbmQgXFwnLVxcJyBpbiB1bmljb2RlIHRleHQnLCB0ZXh0OiAn4KSq4KSw4KWA4KSV4KWN4KS34KS+LeCkquCksOClgOCkleCljeCkt+CkoycgfSxcbiAgeyBsYWJlbDogJ3Nob3VsZCBiZSBhYmxlIHRvIHNlbmQgXFwnJlxcJyBpbiB0ZXh0JywgdGV4dDogJ0Zpc2ggJiBjaGlwcycgfSxcbiAgeyBsYWJlbDogJ3Nob3VsZCBiZSBhYmxlIHRvIHNlbmQgXFwnJlxcJyBpbiB1bmljb2RlIHRleHQnLCB0ZXh0OiAnTcSrbmEgJiBjaGlwcycgfSxcbiAgeyBsYWJlbDogJ3Nob3VsZCBiZSBhYmxlIHRvIHNlbmQgcm9tYW4gY2hhcmFjdGVycyB3aXRoIGRpYWNyaXRpY3MnLCB0ZXh0OiAnw4HDqSDFkiDDuSDhuI0nIH0sXG4gIHsgbGFiZWw6ICdzaG91bGQgYmUgYWJsZSB0byBzZW5kIGEgXFwndVxcJyB3aXRoIGFuIHVtbGF1dCcsIHRleHQ6ICfDvCcgfSxcbl07XG5cbmxldCBsYW5ndWFnZVRlc3RzID0gW1xuICB7IGxhYmVsOiAnc2hvdWxkIGJlIGFibGUgdG8gc2VuZCBUYW1pbCcsIHRleHQ6ICfgrprgr4fgrr7grqTgrqngr4gnIH0sXG4gIHsgbGFiZWw6ICdzaG91bGQgYmUgYWJsZSB0byBzZW5kIEd1amFyYXRpJywgdGV4dDogJ+CqquCqsOCrgOCqleCrjeCqt+CqoycgfSxcbiAgeyBsYWJlbDogJ3Nob3VsZCBiZSBhYmxlIHRvIHNlbmQgQ2hpbmVzZScsIHRleHQ6ICfmtYvor5UnIH0sXG4gIHsgbGFiZWw6ICdzaG91bGQgYmUgYWJsZSB0byBzZW5kIFJ1c3NpYW4nLCB0ZXh0OiAn0YLQtdGB0YLQuNGA0L7QstCw0L3QuNC1JyB9LFxuICB7IGxhYmVsOiAnc2hvdWxkIGJlIGFibGUgdG8gc2VuZCBBcmFiaWMnLCB0ZXh0OiAn2KrYrNix2YrYqCcgfSxcbiAgeyBsYWJlbDogJ3Nob3VsZCBiZSBhYmxlIHRvIHNlbmQgSGVicmV3JywgdGV4dDogJ9eR15PXmden15XXqicgfSxcbl07XG5cbmRlc2NyaWJlKCdrZXlib2FyZCcsIGZ1bmN0aW9uICgpIHtcbiAgZGVzY3JpYmUoJ2FzY2lpJywgZnVuY3Rpb24gKCkge1xuICAgIGxldCBkcml2ZXI7XG4gICAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGRyaXZlciA9IGF3YWl0IGluaXREcml2ZXIoZGVmYXVsdEFzY2lpQ2Fwcyk7XG5cbiAgICAgIC8vIHNvbWV0aW1lcyB0aGUgZGVmYXVsdCBpbWUgaXMgbm90IHdoYXQgd2UgYXJlIHVzaW5nXG4gICAgICBsZXQgZW5naW5lcyA9IGF3YWl0IGRyaXZlci5hdmFpbGFibGVJTUVFbmdpbmVzKCk7XG4gICAgICBsZXQgc2VsZWN0ZWRFbmdpbmUgPSBfLmZpcnN0KGVuZ2luZXMpO1xuICAgICAgZm9yIChsZXQgZW5naW5lIG9mIGVuZ2luZXMpIHtcbiAgICAgICAgLy8gaXQgc2VlbXMgdGhhdCB0aGUgbGF0aW4gaW1lIGhhcyBgYW5kcm9pZC5pbnB1dG1ldGhvZGAgaW4gaXRzIHBhY2thZ2UgbmFtZVxuICAgICAgICBpZiAoZW5naW5lLmluZGV4T2YoJ2FuZHJvaWQuaW5wdXRtZXRob2QnKSAhPT0gLTEpIHtcbiAgICAgICAgICBzZWxlY3RlZEVuZ2luZSA9IGVuZ2luZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYXdhaXQgZHJpdmVyLmFjdGl2YXRlSU1FRW5naW5lKHNlbGVjdGVkRW5naW5lKTtcbiAgICB9KTtcbiAgICBhZnRlcihhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBhd2FpdCBkcml2ZXIucXVpdCgpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2VkaXRpbmcgYSB0ZXh0IGZpZWxkJywgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGVscztcbiAgICAgIGJlZm9yZUVhY2goYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICBlbHMgPSBhd2FpdCByZXRyeUludGVydmFsKDUsIDEwMDAsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjb25zdCBlbHMgPSBhd2FpdCBkcml2ZXIuZWxlbWVudHNCeUNsYXNzTmFtZShFRElUVEVYVF9DTEFTUyk7XG4gICAgICAgICAgZWxzLnNob3VsZC5oYXZlLmxlbmd0aC5hdC5sZWFzdCgxKTtcbiAgICAgICAgICByZXR1cm4gZWxzO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgZm9yIChsZXQgdGVzdCBvZiB0ZXN0cykge1xuICAgICAgICBkZXNjcmliZSh0ZXN0LmxhYmVsLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaXQoJ3Nob3VsZCB3b3JrIHdpdGggc2V0VmFsdWUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBhd2FpdCBydW5UZXh0RWRpdFRlc3QoZHJpdmVyLCB0ZXN0LnRleHQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGl0KCdzaG91bGQgd29yayB3aXRoIGtleXMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBhd2FpdCBydW5UZXh0RWRpdFRlc3QoZHJpdmVyLCB0ZXN0LnRleHQsIHRydWUpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGNsZWFyIGEgcGFzc3dvcmQgZmllbGQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHRoZXJlIGlzIGN1cnJlbnRseSBubyB3YXkgdG8gZGlyZWN0bHkgYXNzZXJ0IGFueXRoaW5nIGFib3V0IHRoZSBjb250ZW50c1xuICAgICAgICAvLyBvZiBhIHBhc3N3b3JkIGZpZWxkLCBzaW5jZSB0aGVyZSBpcyBubyB3YXkgdG8gYWNjZXNzIHRoZSBjb250ZW50c1xuICAgICAgICBjb25zdCBwYXNzd29yZCA9ICdzdXBlci1kdXBlciBwYXNzd29yZCc7XG4gICAgICAgIGxldCBwYXNzd29yZFRleHRGaWVsZCA9IGVsc1sxXTtcbiAgICAgICAgbGV0IHBhc3N3b3JkT3V0cHV0ID0gYXdhaXQgZHJpdmVyLmVsZW1lbnRCeUlkKCdpby5hcHBpdW0uYW5kcm9pZC5hcGlzOmlkL2VkaXQxVGV4dCcpO1xuICAgICAgICBhd2FpdCBwYXNzd29yZFRleHRGaWVsZC5zZW5kS2V5cyhwYXNzd29yZCk7XG4gICAgICAgIGF3YWl0IHdhaXRGb3JUZXh0KHBhc3N3b3JkT3V0cHV0LCBwYXNzd29yZCk7XG4gICAgICAgIGF3YWl0IHBhc3N3b3JkVGV4dEZpZWxkLmNsZWFyKCk7XG4gICAgICAgIGF3YWl0IHdhaXRGb3JUZXh0KHBhc3N3b3JkT3V0cHV0LCAnJyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIHR5cGUgaW4gbGVuZ3RoLWxpbWl0ZWQgZmllbGQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghcHJvY2Vzcy5lbnYuVEVTVE9CSkVDVF9FMkVfVEVTVFMpIHtcbiAgICAgICAgICBsZXQgYWRiID0gbmV3IEFEQigpO1xuICAgICAgICAgIGlmIChwYXJzZUludChhd2FpdCBhZGIuZ2V0QXBpTGV2ZWwoKSwgMTApIDwgMjQpIHtcbiAgICAgICAgICAgIC8vIGJlbG93IEFuZHJvaWQgNy4wIChBUEkgbGV2ZWwgMjQpIHR5cGluZyB0b28gbWFueSBjaGFyYWN0ZXJzIGluIGFcbiAgICAgICAgICAgIC8vIGxlbmd0aC1saW1pdGVkIGZpZWxkIHdpbGwgZWl0aGVyIHRocm93IGEgTnVsbFBvaW50ZXJFeGNlcHRpb24gb3JcbiAgICAgICAgICAgIC8vIGNyYXNoIHRoZSBhcHBcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNraXAoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGVsID0gZWxzWzNdO1xuICAgICAgICBhd2FpdCBlbC5zZXRJbW1lZGlhdGVWYWx1ZSgnMDEyMzQ1Njc4OWFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVonKTtcblxuICAgICAgICAvLyBleHBlY3QgZmlyc3QgMTEgY2hhcmFjdGVycyAobGltaXQgb2YgdGhlIGZpZWxkKSB0byBiZSBpbiB0aGUgZmllbGRcbiAgICAgICAgbGV0IHRleHQgPSBhd2FpdCBlbC50ZXh0KCk7XG4gICAgICAgIHRleHQuc2hvdWxkLmVxbCgnMDEyMzQ1Njc4OWEnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3NlbmRpbmcgYSBrZXkgZXZlbnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBiZWZvcmUoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICBhd2FpdCBkcml2ZXIuc3RhcnRBY3Rpdml0eSh7YXBwUGFja2FnZTogUEFDS0FHRSwgYXBwQWN0aXZpdHk6IEtFWUVWRU5UX0FDVElWSVRZfSk7XG4gICAgICAgIGF3YWl0IEIuZGVsYXkoNTAwKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gc2VuZCBjb21iaW5hdGlvbiBrZXlldmVudHMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGF3YWl0IHJ1bkNvbWJpbmF0aW9uS2V5RXZlbnRUZXN0KGRyaXZlcik7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byBzZW5kIGtleWV2ZW50cycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYXdhaXQgcnVuS2V5RXZlbnRUZXN0KGRyaXZlcik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3VuaWNvZGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFkYjtcbiAgICBpZiAoIXByb2Nlc3MuZW52LlRFU1RPQkpFQ1RfRTJFX1RFU1RTKSB7XG4gICAgICBhZGIgPSBuZXcgQURCKCk7XG4gICAgfVxuICAgIGxldCBpbml0aWFsSU1FO1xuICAgIGxldCBkcml2ZXI7XG4gICAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIHNhdmUgdGhlIGluaXRpYWwgaW1lIHNvIHdlIGNhbiBtYWtlIHN1cmUgaXQgaXMgcmVzdG9yZWRcbiAgICAgIGlmIChhZGIpIHtcbiAgICAgICAgaW5pdGlhbElNRSA9IGF3YWl0IGFkYi5kZWZhdWx0SU1FKCk7XG4gICAgICAgIGluaXRpYWxJTUUuc2hvdWxkLm5vdC5lcWwoJ2lvLmFwcGl1bS5hbmRyb2lkLmltZS8uVW5pY29kZUlNRScpO1xuICAgICAgfVxuXG4gICAgICBkcml2ZXIgPSBhd2FpdCBpbml0RHJpdmVyKGRlZmF1bHRVbmljb2RlQ2Fwcyk7XG4gICAgfSk7XG4gICAgYWZ0ZXIoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgYXdhaXQgZHJpdmVyLnF1aXQoKTtcblxuICAgICAgLy8gbWFrZSBzdXJlIHRoZSBJTUUgaGFzIGJlZW4gcmVzdG9yZWRcbiAgICAgIGlmIChhZGIpIHtcbiAgICAgICAgbGV0IGltZSA9IGF3YWl0IGFkYi5kZWZhdWx0SU1FKCk7XG4gICAgICAgIGltZS5zaG91bGQuZXFsKGluaXRpYWxJTUUpO1xuICAgICAgICBpbWUuc2hvdWxkLm5vdC5lcWwoJ2lvLmFwcGl1bS5hbmRyb2lkLmltZS8uVW5pY29kZUlNRScpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2VkaXRpbmcgYSB0ZXh0IGZpZWxkJywgZnVuY3Rpb24gKCkge1xuICAgICAgZm9yIChsZXQgdGVzdFNldCBvZiBbdGVzdHMsIHVuaWNvZGVUZXN0cywgbGFuZ3VhZ2VUZXN0c10pIHtcbiAgICAgICAgZm9yIChsZXQgdGVzdCBvZiB0ZXN0U2V0KSB7XG4gICAgICAgICAgZGVzY3JpYmUodGVzdC5sYWJlbCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaXQoJ3Nob3VsZCB3b3JrIHdpdGggc2V0VmFsdWUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGF3YWl0IHJ1blRleHRFZGl0VGVzdChkcml2ZXIsIHRlc3QudGV4dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGl0KCdzaG91bGQgd29yayB3aXRoIGtleXMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGF3YWl0IHJ1blRleHRFZGl0VGVzdChkcml2ZXIsIHRlc3QudGV4dCwgdHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3NlbmRpbmcgYSBrZXkgZXZlbnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBiZWZvcmUoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICBhd2FpdCBkcml2ZXIuc3RhcnRBY3Rpdml0eSh7YXBwUGFja2FnZTogUEFDS0FHRSwgYXBwQWN0aXZpdHk6IEtFWUVWRU5UX0FDVElWSVRZfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIHNlbmQgY29tYmluYXRpb24ga2V5ZXZlbnRzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICBhd2FpdCBydW5Db21iaW5hdGlvbktleUV2ZW50VGVzdChkcml2ZXIpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gc2VuZCBrZXlldmVudHMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGF3YWl0IHJ1bktleUV2ZW50VGVzdChkcml2ZXIpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uIn0=
