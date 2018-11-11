'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _asyncbox = require('asyncbox');

var _2 = require('../../../..');

var _3 = _interopRequireDefault(_2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _desired = require('../../desired');

var _desired2 = _interopRequireDefault(_desired);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var BUTTON_CLASS = 'android.widget.Button';
var EDITTEXT_CLASS = 'android.widget.EditText';
var TEXTVIEW_CLASS = 'android.widget.TextView';

var PACKAGE = 'io.appium.android.apis';
var TEXTFIELD_ACTIVITY = '.view.TextFields';
var KEYEVENT_ACTIVITY = '.text.KeyEventText';

var defaultAsciiCaps = _lodash2['default'].defaults({
  newCommandTimeout: 90,
  appPackage: PACKAGE,
  appActivity: TEXTFIELD_ACTIVITY
}, _desired2['default']);

var defaultUnicodeCaps = _lodash2['default'].defaults({
  unicodeKeyboard: true,
  resetKeyboard: true
}, defaultAsciiCaps);

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
        return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(10, 1000, function callee$1$0() {
          var el;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.t0 = _lodash2['default'];
                context$2$0.next = 3;
                return _regeneratorRuntime.awrap(driver.findElements('class name', className));

              case 3:
                context$2$0.t1 = context$2$0.sent;
                el = context$2$0.t0.last.call(context$2$0.t0, context$2$0.t1);
                return context$2$0.abrupt('return', el.ELEMENT);

              case 6:
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

function runTextEditTest(driver, testText) {
  var keys = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
  var el, text;
  return _regeneratorRuntime.async(function runTextEditTest$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(getElement(driver, EDITTEXT_CLASS));

      case 2:
        el = context$1$0.sent;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(driver.clear(el));

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
        return _regeneratorRuntime.awrap(driver.setValue(testText, el));

      case 12:
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(driver.getText(el));

      case 14:
        text = context$1$0.sent;

        deSamsungify(text).should.be.equal(testText);

        return context$1$0.abrupt('return', el);

      case 17:
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

        driver.click(el);

        // wait a moment for the clearing to occur, lest we too quickly try to enter more text
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(_bluebird2['default'].delay(500));

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function runCombinationKeyEventTest(driver) {
  var runTest, text;
  return _regeneratorRuntime.async(function runCombinationKeyEventTest$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        runTest = function runTest() {
          var el;
          return _regeneratorRuntime.async(function runTest$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(driver.pressKeyCode(29, 193));

              case 2:
                context$2$0.next = 4;
                return _regeneratorRuntime.awrap(getElement(driver, TEXTVIEW_CLASS));

              case 4:
                el = context$2$0.sent;
                context$2$0.next = 7;
                return _regeneratorRuntime.awrap(driver.getText(el));

              case 7:
                return context$2$0.abrupt('return', context$2$0.sent);

              case 8:
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

        if (!(text === '')) {
          context$1$0.next = 10;
          break;
        }

        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(runTest());

      case 9:
        text = context$1$0.sent;

      case 10:
        text.should.include('keyCode=KEYCODE_A');
        text.should.include('metaState=META_SHIFT_ON');

      case 12:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function runKeyEventTest(driver) {
  var runTest, text;
  return _regeneratorRuntime.async(function runKeyEventTest$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        runTest = function runTest() {
          var el;
          return _regeneratorRuntime.async(function runTest$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(driver.pressKeyCode(82));

              case 2:
                context$2$0.next = 4;
                return _regeneratorRuntime.awrap(getElement(driver, TEXTVIEW_CLASS));

              case 4:
                el = context$2$0.sent;
                context$2$0.next = 7;
                return _regeneratorRuntime.awrap(driver.getText(el));

              case 7:
                return context$2$0.abrupt('return', context$2$0.sent);

              case 8:
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

        if (!(text === '')) {
          context$1$0.next = 10;
          break;
        }

        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(runTest());

      case 9:
        text = context$1$0.sent;

      case 10:
        text.should.include('[keycode=82]');
        text.should.include('keyCode=KEYCODE_MENU');

      case 12:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

var tests = [{ label: 'editing a text field', text: 'Life, the Universe and Everything.' }, { label: 'sending \'&-\'', text: '&-' }, { label: 'sending \'&\' and \'-\' in other text', text: 'In the mid-1990s he ate fish & chips as mayor-elect.' }, { label: 'sending \'-\' in text', text: 'Super-test.' }, { label: 'sending numbers', text: '0123456789' }];

var unicodeTests = [{ label: 'should be able to send \'-\' in unicode text', text: 'परीक्षा-परीक्षण' }, { label: 'should be able to send \'&\' in text', text: 'Fish & chips' }, { label: 'should be able to send \'&\' in unicode text', text: 'Mīna & chips' }, { label: 'should be able to send roman characters with diacritics', text: 'Áé Œ ù ḍ' }, { label: 'should be able to send a \'u\' with an umlaut', text: 'ü' }];

var languageTests = [{ label: 'should be able to send Tamil', text: 'சோதனை' }, { label: 'should be able to send Chinese', text: '测试' }, { label: 'should be able to send Arabic', text: 'تجريب' }, { label: 'should be able to send Hebrew', text: 'בדיקות' }];

describe('keyboard', function () {
  describe('ascii', function () {
    var driver = undefined;
    before(function callee$2$0() {
      var engines, selectedEngine, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, engine;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _3['default']();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.createSession(defaultAsciiCaps));

          case 3:
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.availableIMEEngines());

          case 5:
            engines = context$3$0.sent;
            selectedEngine = _lodash2['default'].head(engines);
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            context$3$0.prev = 10;

            for (_iterator = _getIterator(engines); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              engine = _step.value;

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
            _didIteratorError = true;
            _iteratorError = context$3$0.t0;

          case 18:
            context$3$0.prev = 18;
            context$3$0.prev = 19;

            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }

          case 21:
            context$3$0.prev = 21;

            if (!_didIteratorError) {
              context$3$0.next = 24;
              break;
            }

            throw _iteratorError;

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
            return _regeneratorRuntime.awrap(driver.deleteSession());

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    describe('editing a text field', function () {
      before(function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.startActivity(PACKAGE, TEXTFIELD_ACTIVITY));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        var _loop = function () {
          var test = _step2.value;

          describe(test.label, function () {
            it('should work with setValue: \'' + test.text + '\'', function callee$5$0() {
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
            it('should work with keys: \'' + test.text + '\'', function callee$5$0() {
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

        for (var _iterator2 = _getIterator(tests), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          _loop();
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

      it('should be able to clear a password field', function callee$3$0() {
        var els, el, textEl, text;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.findElements('class name', EDITTEXT_CLASS));

            case 2:
              els = context$4$0.sent;
              el = els[1].ELEMENT;
              context$4$0.next = 6;
              return _regeneratorRuntime.awrap(driver.setValue('super-duper password', el));

            case 6:
              context$4$0.next = 8;
              return _regeneratorRuntime.awrap(driver.findElement('id', 'edit1Text'));

            case 8:
              textEl = context$4$0.sent;
              context$4$0.next = 11;
              return _regeneratorRuntime.awrap(driver.getText(textEl.ELEMENT));

            case 11:
              text = context$4$0.sent;

              text.should.eql('super-duper password');

              context$4$0.next = 15;
              return _regeneratorRuntime.awrap(driver.clear(el));

            case 15:
              context$4$0.next = 17;
              return _regeneratorRuntime.awrap(driver.getText(textEl.ELEMENT));

            case 17:
              text = context$4$0.sent;

              text.should.eql('');

            case 19:
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
              return _regeneratorRuntime.awrap(driver.startActivity(PACKAGE, KEYEVENT_ACTIVITY));

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
    var driver = undefined;
    before(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _3['default']();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.createSession(defaultUnicodeCaps));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    after(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.deleteSession());

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    describe('editing a text field', function () {
      before(function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.startActivity(PACKAGE, TEXTFIELD_ACTIVITY));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });

      var _arr = [tests, unicodeTests, languageTests];
      for (var _i = 0; _i < _arr.length; _i++) {
        var testSet = _arr[_i];var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          var _loop2 = function () {
            var test = _step3.value;

            describe(test.label, function () {
              it('should work with setValue: \'' + test.text + '\'', function callee$5$0() {
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
              it('should work with keys: \'' + test.text + '\'', function callee$5$0() {
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

          for (var _iterator3 = _getIterator(testSet), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            _loop2();
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
    });

    describe('sending a key event', function () {
      before(function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.startActivity(PACKAGE, KEYEVENT_ACTIVITY));

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

// the test is flakey... try again

// the test is flakey... try again

// sometimes the default ime is not what we are using

// the text is printed into a text field, so we can retrieve and assert
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9rZXlib2FyZC9rZXlib2FyZC1lMmUtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O3NCQUMvQixRQUFROzs7O3dCQUNRLFVBQVU7O2lCQUNkLGFBQWE7Ozs7d0JBQ3pCLFVBQVU7Ozs7dUJBQ0MsZUFBZTs7OztBQUd4QyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLElBQU0sWUFBWSxHQUFHLHVCQUF1QixDQUFDO0FBQzdDLElBQU0sY0FBYyxHQUFHLHlCQUF5QixDQUFDO0FBQ2pELElBQU0sY0FBYyxHQUFHLHlCQUF5QixDQUFDOztBQUVqRCxJQUFNLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQztBQUN6QyxJQUFNLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO0FBQzlDLElBQU0saUJBQWlCLEdBQUcsb0JBQW9CLENBQUM7O0FBRS9DLElBQUksZ0JBQWdCLEdBQUcsb0JBQUUsUUFBUSxDQUFDO0FBQ2hDLG1CQUFpQixFQUFFLEVBQUU7QUFDckIsWUFBVSxFQUFFLE9BQU87QUFDbkIsYUFBVyxFQUFFLGtCQUFrQjtDQUNoQyx1QkFBZSxDQUFDOztBQUVqQixJQUFJLGtCQUFrQixHQUFHLG9CQUFFLFFBQVEsQ0FBQztBQUNsQyxpQkFBZSxFQUFFLElBQUk7QUFDckIsZUFBYSxFQUFFLElBQUk7Q0FDcEIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDOztBQUVyQixTQUFTLFlBQVksQ0FBRSxJQUFJLEVBQUU7O0FBRTNCLFNBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7Q0FDdkM7O0FBRUQsU0FBZSxVQUFVLENBQUUsTUFBTSxFQUFFLFNBQVM7Ozs7Ozs7eUNBQzdCLDZCQUFjLEVBQUUsRUFBRSxJQUFJLEVBQUU7Y0FDL0IsRUFBRTs7Ozs7O2lEQUFn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WTtBQUMxQyxZQUFNLENBQUM7Ozs7OytDQUNDLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLGlCQUFpQixDQUFDOzs7Ozs7O09BQ3ZELENBQUMsQ0FBQzs7QUFFSCxRQUFFLENBQUMsOENBQThDLEVBQUU7Ozs7OytDQUMzQywwQkFBMEIsQ0FBQyxNQUFNLENBQUM7Ozs7Ozs7T0FDekMsQ0FBQyxDQUFDO0FBQ0gsUUFBRSxDQUFDLGtDQUFrQyxFQUFFOzs7OzsrQ0FDL0IsZUFBZSxDQUFDLE1BQU0sQ0FBQzs7Ozs7OztPQUM5QixDQUFDLENBQUM7S0FDSixDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2NvbW1hbmRzL2tleWJvYXJkL2tleWJvYXJkLWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IHJldHJ5SW50ZXJ2YWwgfSBmcm9tICdhc3luY2JveCc7XG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLi8uLi8uLic7XG5pbXBvcnQgQiBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgREVGQVVMVF9DQVBTIGZyb20gJy4uLy4uL2Rlc2lyZWQnO1xuXG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmNvbnN0IEJVVFRPTl9DTEFTUyA9ICdhbmRyb2lkLndpZGdldC5CdXR0b24nO1xuY29uc3QgRURJVFRFWFRfQ0xBU1MgPSAnYW5kcm9pZC53aWRnZXQuRWRpdFRleHQnO1xuY29uc3QgVEVYVFZJRVdfQ0xBU1MgPSAnYW5kcm9pZC53aWRnZXQuVGV4dFZpZXcnO1xuXG5jb25zdCBQQUNLQUdFID0gJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnO1xuY29uc3QgVEVYVEZJRUxEX0FDVElWSVRZID0gJy52aWV3LlRleHRGaWVsZHMnO1xuY29uc3QgS0VZRVZFTlRfQUNUSVZJVFkgPSAnLnRleHQuS2V5RXZlbnRUZXh0JztcblxubGV0IGRlZmF1bHRBc2NpaUNhcHMgPSBfLmRlZmF1bHRzKHtcbiAgbmV3Q29tbWFuZFRpbWVvdXQ6IDkwLFxuICBhcHBQYWNrYWdlOiBQQUNLQUdFLFxuICBhcHBBY3Rpdml0eTogVEVYVEZJRUxEX0FDVElWSVRZLFxufSwgREVGQVVMVF9DQVBTKTtcblxubGV0IGRlZmF1bHRVbmljb2RlQ2FwcyA9IF8uZGVmYXVsdHMoe1xuICB1bmljb2RlS2V5Ym9hcmQ6IHRydWUsXG4gIHJlc2V0S2V5Ym9hcmQ6IHRydWVcbn0sIGRlZmF1bHRBc2NpaUNhcHMpO1xuXG5mdW5jdGlvbiBkZVNhbXN1bmdpZnkgKHRleHQpIHtcbiAgLy8gRm9yIHNhbXN1bmcgUzUgdGV4dCBpcyBhcHBlbmRlZCB3aXRoIFwiLiBFZGl0aW5nLlwiXG4gIHJldHVybiB0ZXh0LnJlcGxhY2UoXCIuIEVkaXRpbmcuXCIsIFwiXCIpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRFbGVtZW50IChkcml2ZXIsIGNsYXNzTmFtZSkge1xuICByZXR1cm4gYXdhaXQgcmV0cnlJbnRlcnZhbCgxMCwgMTAwMCwgYXN5bmMgKCkgPT4ge1xuICAgIGxldCBlbCA9IF8ubGFzdChhd2FpdCBkcml2ZXIuZmluZEVsZW1lbnRzKCdjbGFzcyBuYW1lJywgY2xhc3NOYW1lKSk7XG4gICAgcmV0dXJuIGVsLkVMRU1FTlQ7XG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBydW5UZXh0RWRpdFRlc3QgKGRyaXZlciwgdGVzdFRleHQsIGtleXMgPSBmYWxzZSkge1xuICBsZXQgZWwgPSBhd2FpdCBnZXRFbGVtZW50KGRyaXZlciwgRURJVFRFWFRfQ0xBU1MpO1xuICBhd2FpdCBkcml2ZXIuY2xlYXIoZWwpO1xuXG4gIGlmIChrZXlzKSB7XG4gICAgYXdhaXQgZHJpdmVyLmtleXMoW3Rlc3RUZXh0XSk7XG4gIH0gZWxzZSB7XG4gICAgYXdhaXQgZHJpdmVyLnNldFZhbHVlKHRlc3RUZXh0LCBlbCk7XG4gIH1cblxuICBsZXQgdGV4dCA9IGF3YWl0IGRyaXZlci5nZXRUZXh0KGVsKTtcbiAgZGVTYW1zdW5naWZ5KHRleHQpLnNob3VsZC5iZS5lcXVhbCh0ZXN0VGV4dCk7XG5cbiAgcmV0dXJuIGVsO1xufVxuXG4vKlxuICogVGhlIGtleSBldmVudCBwYWdlIG5lZWRzIHRvIGJlIGNsZWFyZWQgYmV0d2VlbiBydW5zLCBvciBlbHNlIHdlIGdldCBmYWxzZVxuICogcG9zaXRpdmVzIGZyb20gcHJldmlvdXNseSBydW4gdGVzdHMuIFRoZSBwYWdlIGhhcyBhIHNpbmdsZSBidXR0b24gdGhhdFxuICogcmVtb3ZlcyBhbGwgdGV4dCBmcm9tIHdpdGhpbiB0aGUgbWFpbiBUZXh0Vmlldy5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gY2xlYXJLZXlFdmVudHMgKGRyaXZlcikge1xuICBsZXQgZWwgPSBhd2FpdCBnZXRFbGVtZW50KGRyaXZlciwgQlVUVE9OX0NMQVNTKTtcbiAgZHJpdmVyLmNsaWNrKGVsKTtcblxuICAvLyB3YWl0IGEgbW9tZW50IGZvciB0aGUgY2xlYXJpbmcgdG8gb2NjdXIsIGxlc3Qgd2UgdG9vIHF1aWNrbHkgdHJ5IHRvIGVudGVyIG1vcmUgdGV4dFxuICBhd2FpdCBCLmRlbGF5KDUwMCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJ1bkNvbWJpbmF0aW9uS2V5RXZlbnRUZXN0IChkcml2ZXIpIHtcbiAgbGV0IHJ1blRlc3QgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLnByZXNzS2V5Q29kZSgyOSwgMTkzKTtcbiAgICBsZXQgZWwgPSBhd2FpdCBnZXRFbGVtZW50KGRyaXZlciwgVEVYVFZJRVdfQ0xBU1MpO1xuICAgIHJldHVybiBhd2FpdCBkcml2ZXIuZ2V0VGV4dChlbCk7XG4gIH07XG5cbiAgYXdhaXQgY2xlYXJLZXlFdmVudHMoZHJpdmVyKTtcblxuICBsZXQgdGV4dCA9IGF3YWl0IHJ1blRlc3QoKTtcbiAgaWYgKHRleHQgPT09ICcnKSB7XG4gICAgLy8gdGhlIHRlc3QgaXMgZmxha2V5Li4uIHRyeSBhZ2FpblxuICAgIHRleHQgPSBhd2FpdCBydW5UZXN0KCk7XG4gIH1cbiAgdGV4dC5zaG91bGQuaW5jbHVkZSgna2V5Q29kZT1LRVlDT0RFX0EnKTtcbiAgdGV4dC5zaG91bGQuaW5jbHVkZSgnbWV0YVN0YXRlPU1FVEFfU0hJRlRfT04nKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcnVuS2V5RXZlbnRUZXN0IChkcml2ZXIpIHtcbiAgbGV0IHJ1blRlc3QgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLnByZXNzS2V5Q29kZSg4Mik7XG4gICAgbGV0IGVsID0gYXdhaXQgZ2V0RWxlbWVudChkcml2ZXIsIFRFWFRWSUVXX0NMQVNTKTtcbiAgICByZXR1cm4gYXdhaXQgZHJpdmVyLmdldFRleHQoZWwpO1xuICB9O1xuXG4gIGF3YWl0IGNsZWFyS2V5RXZlbnRzKGRyaXZlcik7XG5cbiAgbGV0IHRleHQgPSBhd2FpdCBydW5UZXN0KCk7XG4gIGlmICh0ZXh0ID09PSAnJykge1xuICAgIC8vIHRoZSB0ZXN0IGlzIGZsYWtleS4uLiB0cnkgYWdhaW5cbiAgICB0ZXh0ID0gYXdhaXQgcnVuVGVzdCgpO1xuICB9XG4gIHRleHQuc2hvdWxkLmluY2x1ZGUoJ1trZXljb2RlPTgyXScpO1xuICB0ZXh0LnNob3VsZC5pbmNsdWRlKCdrZXlDb2RlPUtFWUNPREVfTUVOVScpO1xufVxuXG5sZXQgdGVzdHMgPSBbXG4gIHtsYWJlbDogJ2VkaXRpbmcgYSB0ZXh0IGZpZWxkJywgdGV4dDogJ0xpZmUsIHRoZSBVbml2ZXJzZSBhbmQgRXZlcnl0aGluZy4nfSxcbiAge2xhYmVsOiAnc2VuZGluZyBcXCcmLVxcJycsIHRleHQ6ICcmLSd9LFxuICB7bGFiZWw6ICdzZW5kaW5nIFxcJyZcXCcgYW5kIFxcJy1cXCcgaW4gb3RoZXIgdGV4dCcsIHRleHQ6ICdJbiB0aGUgbWlkLTE5OTBzIGhlIGF0ZSBmaXNoICYgY2hpcHMgYXMgbWF5b3ItZWxlY3QuJ30sXG4gIHtsYWJlbDogJ3NlbmRpbmcgXFwnLVxcJyBpbiB0ZXh0JywgdGV4dDogJ1N1cGVyLXRlc3QuJ30sXG4gIHtsYWJlbDogJ3NlbmRpbmcgbnVtYmVycycsIHRleHQ6ICcwMTIzNDU2Nzg5J30sXG5dO1xuXG5sZXQgdW5pY29kZVRlc3RzID0gW1xuICB7bGFiZWw6ICdzaG91bGQgYmUgYWJsZSB0byBzZW5kIFxcJy1cXCcgaW4gdW5pY29kZSB0ZXh0JywgdGV4dDogJ+CkquCksOClgOCkleCljeCkt+Ckvi3gpKrgpLDgpYDgpJXgpY3gpLfgpKMnfSxcbiAge2xhYmVsOiAnc2hvdWxkIGJlIGFibGUgdG8gc2VuZCBcXCcmXFwnIGluIHRleHQnLCB0ZXh0OiAnRmlzaCAmIGNoaXBzJ30sXG4gIHtsYWJlbDogJ3Nob3VsZCBiZSBhYmxlIHRvIHNlbmQgXFwnJlxcJyBpbiB1bmljb2RlIHRleHQnLCB0ZXh0OiAnTcSrbmEgJiBjaGlwcyd9LFxuICB7bGFiZWw6ICdzaG91bGQgYmUgYWJsZSB0byBzZW5kIHJvbWFuIGNoYXJhY3RlcnMgd2l0aCBkaWFjcml0aWNzJywgdGV4dDogJ8OBw6kgxZIgw7kg4biNJ30sXG4gIHtsYWJlbDogJ3Nob3VsZCBiZSBhYmxlIHRvIHNlbmQgYSBcXCd1XFwnIHdpdGggYW4gdW1sYXV0JywgdGV4dDogJ8O8J30sXG5dO1xuXG5sZXQgbGFuZ3VhZ2VUZXN0cyA9IFtcbiAge2xhYmVsOiAnc2hvdWxkIGJlIGFibGUgdG8gc2VuZCBUYW1pbCcsIHRleHQ6ICfgrprgr4fgrr7grqTgrqngr4gnfSxcbiAge2xhYmVsOiAnc2hvdWxkIGJlIGFibGUgdG8gc2VuZCBDaGluZXNlJywgdGV4dDogJ+a1i+ivlSd9LFxuICB7bGFiZWw6ICdzaG91bGQgYmUgYWJsZSB0byBzZW5kIEFyYWJpYycsIHRleHQ6ICfYqtis2LHZitioJ30sXG4gIHtsYWJlbDogJ3Nob3VsZCBiZSBhYmxlIHRvIHNlbmQgSGVicmV3JywgdGV4dDogJ9eR15PXmden15XXqid9LFxuXTtcblxuZGVzY3JpYmUoJ2tleWJvYXJkJywgZnVuY3Rpb24gKCkge1xuICBkZXNjcmliZSgnYXNjaWknLCBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGRyaXZlcjtcbiAgICBiZWZvcmUoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGRlZmF1bHRBc2NpaUNhcHMpO1xuXG4gICAgICAvLyBzb21ldGltZXMgdGhlIGRlZmF1bHQgaW1lIGlzIG5vdCB3aGF0IHdlIGFyZSB1c2luZ1xuICAgICAgbGV0IGVuZ2luZXMgPSBhd2FpdCBkcml2ZXIuYXZhaWxhYmxlSU1FRW5naW5lcygpO1xuICAgICAgbGV0IHNlbGVjdGVkRW5naW5lID0gXy5oZWFkKGVuZ2luZXMpO1xuICAgICAgZm9yIChsZXQgZW5naW5lIG9mIGVuZ2luZXMpIHtcbiAgICAgICAgLy8gaXQgc2VlbXMgdGhhdCB0aGUgbGF0aW4gaW1lIGhhcyBgYW5kcm9pZC5pbnB1dG1ldGhvZGAgaW4gaXRzIHBhY2thZ2UgbmFtZVxuICAgICAgICBpZiAoZW5naW5lLmluZGV4T2YoJ2FuZHJvaWQuaW5wdXRtZXRob2QnKSAhPT0gLTEpIHtcbiAgICAgICAgICBzZWxlY3RlZEVuZ2luZSA9IGVuZ2luZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYXdhaXQgZHJpdmVyLmFjdGl2YXRlSU1FRW5naW5lKHNlbGVjdGVkRW5naW5lKTtcbiAgICB9KTtcbiAgICBhZnRlcihhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBhd2FpdCBkcml2ZXIuZGVsZXRlU2Vzc2lvbigpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2VkaXRpbmcgYSB0ZXh0IGZpZWxkJywgZnVuY3Rpb24gKCkge1xuICAgICAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYXdhaXQgZHJpdmVyLnN0YXJ0QWN0aXZpdHkoUEFDS0FHRSwgVEVYVEZJRUxEX0FDVElWSVRZKTtcbiAgICAgIH0pO1xuXG4gICAgICBmb3IgKGxldCB0ZXN0IG9mIHRlc3RzKSB7XG4gICAgICAgIGRlc2NyaWJlKHRlc3QubGFiZWwsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpdChgc2hvdWxkIHdvcmsgd2l0aCBzZXRWYWx1ZTogJyR7dGVzdC50ZXh0fSdgLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBhd2FpdCBydW5UZXh0RWRpdFRlc3QoZHJpdmVyLCB0ZXN0LnRleHQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGl0KGBzaG91bGQgd29yayB3aXRoIGtleXM6ICcke3Rlc3QudGV4dH0nYCwgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYXdhaXQgcnVuVGV4dEVkaXRUZXN0KGRyaXZlciwgdGVzdC50ZXh0LCB0cnVlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byBjbGVhciBhIHBhc3N3b3JkIGZpZWxkJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgZWxzID0gYXdhaXQgZHJpdmVyLmZpbmRFbGVtZW50cygnY2xhc3MgbmFtZScsIEVESVRURVhUX0NMQVNTKTtcbiAgICAgICAgbGV0IGVsID0gZWxzWzFdLkVMRU1FTlQ7XG5cbiAgICAgICAgYXdhaXQgZHJpdmVyLnNldFZhbHVlKCdzdXBlci1kdXBlciBwYXNzd29yZCcsIGVsKTtcblxuICAgICAgICAvLyB0aGUgdGV4dCBpcyBwcmludGVkIGludG8gYSB0ZXh0IGZpZWxkLCBzbyB3ZSBjYW4gcmV0cmlldmUgYW5kIGFzc2VydFxuICAgICAgICBsZXQgdGV4dEVsID0gYXdhaXQgZHJpdmVyLmZpbmRFbGVtZW50KCdpZCcsICdlZGl0MVRleHQnKTtcbiAgICAgICAgbGV0IHRleHQgPSBhd2FpdCBkcml2ZXIuZ2V0VGV4dCh0ZXh0RWwuRUxFTUVOVCk7XG4gICAgICAgIHRleHQuc2hvdWxkLmVxbCgnc3VwZXItZHVwZXIgcGFzc3dvcmQnKTtcblxuICAgICAgICBhd2FpdCBkcml2ZXIuY2xlYXIoZWwpO1xuXG4gICAgICAgIHRleHQgPSBhd2FpdCBkcml2ZXIuZ2V0VGV4dCh0ZXh0RWwuRUxFTUVOVCk7XG4gICAgICAgIHRleHQuc2hvdWxkLmVxbCgnJyk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzZW5kaW5nIGEga2V5IGV2ZW50JywgZnVuY3Rpb24gKCkge1xuICAgICAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYXdhaXQgZHJpdmVyLnN0YXJ0QWN0aXZpdHkoUEFDS0FHRSwgS0VZRVZFTlRfQUNUSVZJVFkpO1xuICAgICAgICBhd2FpdCBCLmRlbGF5KDUwMCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIHNlbmQgY29tYmluYXRpb24ga2V5ZXZlbnRzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICBhd2FpdCBydW5Db21iaW5hdGlvbktleUV2ZW50VGVzdChkcml2ZXIpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gc2VuZCBrZXlldmVudHMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGF3YWl0IHJ1bktleUV2ZW50VGVzdChkcml2ZXIpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCd1bmljb2RlJywgZnVuY3Rpb24gKCkge1xuICAgIGxldCBkcml2ZXI7XG4gICAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gICAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihkZWZhdWx0VW5pY29kZUNhcHMpO1xuICAgIH0pO1xuICAgIGFmdGVyKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZWRpdGluZyBhIHRleHQgZmllbGQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBiZWZvcmUoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICBhd2FpdCBkcml2ZXIuc3RhcnRBY3Rpdml0eShQQUNLQUdFLCBURVhURklFTERfQUNUSVZJVFkpO1xuICAgICAgfSk7XG5cbiAgICAgIGZvciAobGV0IHRlc3RTZXQgb2YgW3Rlc3RzLCB1bmljb2RlVGVzdHMsIGxhbmd1YWdlVGVzdHNdKSB7XG4gICAgICAgIGZvciAobGV0IHRlc3Qgb2YgdGVzdFNldCkge1xuICAgICAgICAgIGRlc2NyaWJlKHRlc3QubGFiZWwsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGl0KGBzaG91bGQgd29yayB3aXRoIHNldFZhbHVlOiAnJHt0ZXN0LnRleHR9J2AsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgYXdhaXQgcnVuVGV4dEVkaXRUZXN0KGRyaXZlciwgdGVzdC50ZXh0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaXQoYHNob3VsZCB3b3JrIHdpdGgga2V5czogJyR7dGVzdC50ZXh0fSdgLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGF3YWl0IHJ1blRleHRFZGl0VGVzdChkcml2ZXIsIHRlc3QudGV4dCwgdHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3NlbmRpbmcgYSBrZXkgZXZlbnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBiZWZvcmUoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICBhd2FpdCBkcml2ZXIuc3RhcnRBY3Rpdml0eShQQUNLQUdFLCBLRVlFVkVOVF9BQ1RJVklUWSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIHNlbmQgY29tYmluYXRpb24ga2V5ZXZlbnRzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICBhd2FpdCBydW5Db21iaW5hdGlvbktleUV2ZW50VGVzdChkcml2ZXIpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gc2VuZCBrZXlldmVudHMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGF3YWl0IHJ1bktleUV2ZW50VGVzdChkcml2ZXIpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uIn0=
