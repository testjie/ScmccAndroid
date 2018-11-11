'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _appiumBaseDriver = require('appium-base-driver');

var _appiumSupport = require('appium-support');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var commands = {},
    helpers = {},
    extensions = {};

commands.getAlertText = function callee$0$0() {
  var _alert;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.proxyCommand('/alert/text', 'GET'));

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 6:
        context$1$0.prev = 6;
        context$1$0.t0 = context$1$0['catch'](0);

        if (!this.isWebContext()) {
          context$1$0.next = 15;
          break;
        }

        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(this.getAlert());

      case 11:
        _alert = context$1$0.sent;
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(_alert.getText());

      case 14:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 15:
        throw context$1$0.t0;

      case 16:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 6]]);
};

commands.setAlertText = function callee$0$0(value) {
  var _alert2;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (_lodash2['default'].isString(value)) {
          value = value.split('');
        }
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.proxyCommand('/alert/text', 'POST', { value: value }));

      case 4:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 7:
        context$1$0.prev = 7;
        context$1$0.t0 = context$1$0['catch'](1);

        if (!this.isWebContext()) {
          context$1$0.next = 16;
          break;
        }

        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(this.getAlert());

      case 12:
        _alert2 = context$1$0.sent;
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap(_alert2.setText(value));

      case 15:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 16:
        throw context$1$0.t0;

      case 17:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 7]]);
};

commands.postAcceptAlert = function callee$0$0() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var params, _alert3;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        params = {};

        if (opts.buttonLabel) {
          params.name = opts.buttonLabel;
        }
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.proxyCommand('/alert/accept', 'POST', params));

      case 5:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 8:
        context$1$0.prev = 8;
        context$1$0.t0 = context$1$0['catch'](0);

        if (this.isWebContext()) {
          context$1$0.next = 12;
          break;
        }

        throw new _appiumBaseDriver.errors.NoAlertOpenError(context$1$0.t0.message);

      case 12:
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(this.getAlert());

      case 14:
        _alert3 = context$1$0.sent;

        if (!_alert3.close) {
          context$1$0.next = 19;
          break;
        }

        context$1$0.next = 18;
        return _regeneratorRuntime.awrap(_alert3.close());

      case 18:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 19:
        context$1$0.next = 21;
        return _regeneratorRuntime.awrap(_alert3.ok());

      case 21:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 8]]);
};

commands.postDismissAlert = function callee$0$0() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var params, _alert4;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        params = {};

        if (opts.buttonLabel) {
          params.name = opts.buttonLabel;
        }
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.proxyCommand('/alert/dismiss', 'POST', params));

      case 5:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 8:
        context$1$0.prev = 8;
        context$1$0.t0 = context$1$0['catch'](0);

        if (this.isWebContext()) {
          context$1$0.next = 12;
          break;
        }

        throw new _appiumBaseDriver.errors.NoAlertOpenError(context$1$0.t0.message);

      case 12:
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(this.getAlert());

      case 14:
        _alert4 = context$1$0.sent;

        if (!_alert4.close) {
          context$1$0.next = 19;
          break;
        }

        context$1$0.next = 18;
        return _regeneratorRuntime.awrap(_alert4.close());

      case 18:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 19:
        context$1$0.next = 21;
        return _regeneratorRuntime.awrap(_alert4.cancel());

      case 21:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 8]]);
};

commands.getAlertButtons = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.proxyCommand('/wda/alert/buttons', 'GET'));

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 6:
        context$1$0.prev = 6;
        context$1$0.t0 = context$1$0['catch'](0);
        throw new _appiumBaseDriver.errors.NoAlertOpenError(context$1$0.t0.message);

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 6]]);
};

commands.mobileHandleAlert = function callee$0$0() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.t0 = opts.action;
        context$1$0.next = context$1$0.t0 === 'accept' ? 3 : context$1$0.t0 === 'dismiss' ? 6 : context$1$0.t0 === 'getButtons' ? 9 : 12;
        break;

      case 3:
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.postAcceptAlert(opts));

      case 5:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 6:
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.postDismissAlert(opts));

      case 8:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 9:
        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(this.getAlertButtons());

      case 11:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 12:
        throw new Error('The \'action\' value should be either \'accept\', \'dismiss\' or \'getButtons\'. ' + ('\'' + opts.action + '\' is provided instead.'));

      case 13:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.getAlert = function callee$0$0() {
  var possibleAlert, possibleAlertButtons, assertButtonName, alert;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.findNativeElementOrElements('class name', 'XCUIElementTypeScrollView', true));

      case 2:
        possibleAlert = context$1$0.sent;

        if (!(possibleAlert.length !== 1)) {
          context$1$0.next = 5;
          break;
        }

        throw new _appiumBaseDriver.errors.NoAlertOpenError();

      case 5:
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.findNativeElementOrElements('class name', 'XCUIElementTypeButton', true, possibleAlert[0].ELEMENT));

      case 7:
        possibleAlertButtons = context$1$0.sent;

        if (!(possibleAlertButtons.length < 1 || possibleAlertButtons.length > 2)) {
          context$1$0.next = 10;
          break;
        }

        throw new _appiumBaseDriver.errors.NoAlertOpenError();

      case 10:
        assertButtonName = function assertButtonName(button, expectedName) {
          var name;
          return _regeneratorRuntime.async(function assertButtonName$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                button = button.ELEMENT ? button.ELEMENT : button;
                context$2$0.next = 3;
                return _regeneratorRuntime.awrap(this.proxyCommand('/element/' + button + '/attribute/name', 'GET'));

              case 3:
                name = context$2$0.sent;

                if (!(name.toLowerCase() !== expectedName)) {
                  context$2$0.next = 6;
                  break;
                }

                throw new _appiumBaseDriver.errors.NoAlertOpenError();

              case 6:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        };

        alert = possibleAlert[0];

        if (!(possibleAlertButtons.length === 1)) {
          context$1$0.next = 17;
          break;
        }

        context$1$0.next = 15;
        return _regeneratorRuntime.awrap((function callee$1$0() {
          var closeButton;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            var _this2 = this;

            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                closeButton = possibleAlertButtons[0];
                context$2$0.next = 3;
                return _regeneratorRuntime.awrap(assertButtonName(closeButton, 'close'));

              case 3:

                alert.close = function callee$2$0() {
                  return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                      case 0:
                        context$3$0.next = 2;
                        return _regeneratorRuntime.awrap(this.proxyCommand('/element/' + closeButton.ELEMENT + '/click', 'POST'));

                      case 2:
                      case 'end':
                        return context$3$0.stop();
                    }
                  }, null, _this2);
                };

              case 4:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        })());

      case 15:
        context$1$0.next = 19;
        break;

      case 17:
        context$1$0.next = 19;
        return _regeneratorRuntime.awrap((function callee$1$0() {
          var cancelButton, okButton;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            var _this3 = this;

            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                cancelButton = possibleAlertButtons[0];
                context$2$0.next = 3;
                return _regeneratorRuntime.awrap(assertButtonName(cancelButton, 'cancel'));

              case 3:
                okButton = possibleAlertButtons[1];
                context$2$0.next = 6;
                return _regeneratorRuntime.awrap(assertButtonName(okButton, 'ok'));

              case 6:

                alert.cancel = function callee$2$0() {
                  return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                      case 0:
                        context$3$0.next = 2;
                        return _regeneratorRuntime.awrap(this.proxyCommand('/element/' + cancelButton.ELEMENT + '/click', 'POST'));

                      case 2:
                      case 'end':
                        return context$3$0.stop();
                    }
                  }, null, _this3);
                };
                alert.ok = function callee$2$0() {
                  return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                      case 0:
                        context$3$0.next = 2;
                        return _regeneratorRuntime.awrap(this.proxyCommand('/element/' + okButton.ELEMENT + '/click', 'POST'));

                      case 2:
                      case 'end':
                        return context$3$0.stop();
                    }
                  }, null, _this3);
                };

              case 8:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        })());

      case 19:

        alert.getText = function callee$1$0() {
          var textView;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(this.findNativeElementOrElements('class name', 'XCUIElementTypeTextView', false, _appiumSupport.util.unwrapElement(alert)));

              case 2:
                textView = context$2$0.sent;
                context$2$0.next = 5;
                return _regeneratorRuntime.awrap(this.proxyCommand('/element/' + textView.ELEMENT + '/attribute/value', 'GET'));

              case 5:
                return context$2$0.abrupt('return', context$2$0.sent);

              case 6:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        };
        alert.setText = function callee$1$0(value) {
          var textView;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.prev = 0;
                context$2$0.next = 3;
                return _regeneratorRuntime.awrap(this.findNativeElementOrElements('class name', 'XCUIElementTypeTextField', false, _appiumSupport.util.unwrapElement(alert)));

              case 3:
                textView = context$2$0.sent;
                context$2$0.next = 6;
                return _regeneratorRuntime.awrap(this.proxyCommand('/element/' + textView.ELEMENT + '/value ', 'POST', { value: value }));

              case 6:
                context$2$0.next = 13;
                break;

              case 8:
                context$2$0.prev = 8;
                context$2$0.t0 = context$2$0['catch'](0);

                if (!(0, _appiumBaseDriver.isErrorType)(context$2$0.t0, _appiumBaseDriver.errors.NoSuchElementError)) {
                  context$2$0.next = 12;
                  break;
                }

                throw new Error('Tried to set text of an alert that was not a prompt');

              case 12:
                throw context$2$0.t0;

              case 13:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this, [[0, 8]]);
        };

        return context$1$0.abrupt('return', alert);

      case 22:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

_Object$assign(extensions, commands, helpers);
exports.commands = commands;
exports.helpers = helpers;
exports['default'] = extensions;

// make sure the button is 'Close'

// ensure the buttons are 'Cancel' and 'OK'
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9hbGVydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Z0NBQW9DLG9CQUFvQjs7NkJBQ25DLGdCQUFnQjs7c0JBQ3ZCLFFBQVE7Ozs7QUFFdEIsSUFBSSxRQUFRLEdBQUcsRUFBRTtJQUFFLE9BQU8sR0FBRyxFQUFFO0lBQUUsVUFBVSxHQUFHLEVBQUUsQ0FBQzs7QUFFakQsUUFBUSxDQUFDLFlBQVksR0FBRztNQUtaLE1BQUs7Ozs7Ozs7eUNBSEEsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDOzs7Ozs7Ozs7YUFFaEQsSUFBSSxDQUFDLFlBQVksRUFBRTs7Ozs7O3lDQUNELElBQUksQ0FBQyxRQUFRLEVBQUU7OztBQUE3QixjQUFLOzt5Q0FDRSxNQUFLLENBQUMsT0FBTyxFQUFFOzs7Ozs7Ozs7Ozs7O0NBSWpDLENBQUM7O0FBRUYsUUFBUSxDQUFDLFlBQVksR0FBRyxvQkFBZ0IsS0FBSztNQVFqQyxPQUFLOzs7OztBQVBmLFlBQUksb0JBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ3JCLGVBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3pCOzs7eUNBRWMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsTUFBTSxFQUFFLEVBQUMsS0FBSyxFQUFMLEtBQUssRUFBQyxDQUFDOzs7Ozs7Ozs7YUFFMUQsSUFBSSxDQUFDLFlBQVksRUFBRTs7Ozs7O3lDQUNELElBQUksQ0FBQyxRQUFRLEVBQUU7OztBQUE3QixlQUFLOzt5Q0FDRSxPQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQzs7Ozs7Ozs7Ozs7OztDQUl0QyxDQUFDOztBQUVGLFFBQVEsQ0FBQyxlQUFlLEdBQUc7TUFBZ0IsSUFBSSx5REFBRyxFQUFFOztNQUU1QyxNQUFNLEVBVU4sT0FBSzs7Ozs7O0FBVkwsY0FBTSxHQUFHLEVBQUU7O0FBQ2YsWUFBSSxJQUFJLENBQUMs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SyxDQUFDLE9BQU8sR0FBRztjQUNWLFFBQVE7Ozs7O2lEQUFTLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxZQUFZLEVBQUUseUJBQXlCLEVBQUUsS0FBSyxFQUFFLG9CQUFLLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7O0FBQTVILHdCQUFROztpREFDQyxJQUFJLENBQUMsWUFBWSxlQUFhLFFBQVEsQ0FBQyxPQUFPLHVCQUFvQixLQUFLLENBQUM7Ozs7Ozs7Ozs7U0FDdEYsQ0FBQztBQUNGLGFBQUssQ0FBQyxPQUFPLEdBQUcsb0JBQU8sS0FBSztjQUVwQixRQUFROzs7Ozs7aURBQVMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLFlBQVksRUFBRSwwQkFBMEIsRUFBRSxLQUFLLEVBQUUsb0JBQUssYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7QUFBN0gsd0JBQVE7O2lEQUNOLElBQUksQ0FBQyxZQUFZLGVBQWEsUUFBUSxDQUFDLE9BQU8sY0FBVyxNQUFNLEVBQUUsRUFBQyxLQUFLLEVBQUwsS0FBSyxFQUFDLENBQUM7Ozs7Ozs7Ozs7cUJBRTNFLG1EQUFpQix5QkFBTyxrQkFBa0IsQ0FBQzs7Ozs7c0JBQ3ZDLElBQUksS0FBSyxDQUFDLHFEQUFxRCxDQUFDOzs7Ozs7Ozs7O1NBSTNFLENBQUM7OzRDQUVLLEtBQUs7Ozs7Ozs7Q0FDYixDQUFDOztBQUdGLGVBQWMsVUFBVSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwQyxRQUFRLEdBQVIsUUFBUTtRQUFFLE9BQU8sR0FBUCxPQUFPO3FCQUNYLFVBQVUiLCJmaWxlIjoibGliL2NvbW1hbmRzL2FsZXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXJyb3JzLCBpc0Vycm9yVHlwZSB9IGZyb20gJ2FwcGl1bS1iYXNlLWRyaXZlcic7XG5pbXBvcnQgeyB1dGlsIH0gZnJvbSAnYXBwaXVtLXN1cHBvcnQnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxubGV0IGNvbW1hbmRzID0ge30sIGhlbHBlcnMgPSB7fSwgZXh0ZW5zaW9ucyA9IHt9O1xuXG5jb21tYW5kcy5nZXRBbGVydFRleHQgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMucHJveHlDb21tYW5kKCcvYWxlcnQvdGV4dCcsICdHRVQnKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgaWYgKHRoaXMuaXNXZWJDb250ZXh0KCkpIHtcbiAgICAgIGNvbnN0IGFsZXJ0ID0gYXdhaXQgdGhpcy5nZXRBbGVydCgpO1xuICAgICAgcmV0dXJuIGF3YWl0IGFsZXJ0LmdldFRleHQoKTtcbiAgICB9XG4gICAgdGhyb3cgZXJyO1xuICB9XG59O1xuXG5jb21tYW5kcy5zZXRBbGVydFRleHQgPSBhc3luYyBmdW5jdGlvbiAodmFsdWUpIHtcbiAgaWYgKF8uaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgdmFsdWUgPSB2YWx1ZS5zcGxpdCgnJyk7XG4gIH1cbiAgdHJ5IHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5wcm94eUNvbW1hbmQoJy9hbGVydC90ZXh0JywgJ1BPU1QnLCB7dmFsdWV9KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgaWYgKHRoaXMuaXNXZWJDb250ZXh0KCkpIHtcbiAgICAgIGNvbnN0IGFsZXJ0ID0gYXdhaXQgdGhpcy5nZXRBbGVydCgpO1xuICAgICAgcmV0dXJuIGF3YWl0IGFsZXJ0LnNldFRleHQodmFsdWUpO1xuICAgIH1cbiAgICB0aHJvdyBlcnI7XG4gIH1cbn07XG5cbmNvbW1hbmRzLnBvc3RBY2NlcHRBbGVydCA9IGFzeW5jIGZ1bmN0aW9uIChvcHRzID0ge30pIHtcbiAgdHJ5IHtcbiAgICBsZXQgcGFyYW1zID0ge307XG4gICAgaWYgKG9wdHMuYnV0dG9uTGFiZWwpIHtcbiAgICAgIHBhcmFtcy5uYW1lID0gb3B0cy5idXR0b25MYWJlbDtcbiAgICB9XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMucHJveHlDb21tYW5kKCcvYWxlcnQvYWNjZXB0JywgJ1BPU1QnLCBwYXJhbXMpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBpZiAoIXRoaXMuaXNXZWJDb250ZXh0KCkpIHtcbiAgICAgIHRocm93IG5ldyBlcnJvcnMuTm9BbGVydE9wZW5FcnJvcihlcnIubWVzc2FnZSk7XG4gICAgfVxuXG4gICAgbGV0IGFsZXJ0ID0gYXdhaXQgdGhpcy5nZXRBbGVydCgpO1xuICAgIGlmIChhbGVydC5jbG9zZSkge1xuICAgICAgcmV0dXJuIGF3YWl0IGFsZXJ0LmNsb3NlKCk7XG4gICAgfVxuICAgIGF3YWl0IGFsZXJ0Lm9rKCk7XG4gIH1cbn07XG5cbmNvbW1hbmRzLnBvc3REaXNtaXNzQWxlcnQgPSBhc3luYyBmdW5jdGlvbiAob3B0cyA9IHt9KSB7XG4gIHRyeSB7XG4gICAgbGV0IHBhcmFtcyA9IHt9O1xuICAgIGlmIChvcHRzLmJ1dHRvbkxhYmVsKSB7XG4gICAgICBwYXJhbXMubmFtZSA9IG9wdHMuYnV0dG9uTGFiZWw7XG4gICAgfVxuICAgIHJldHVybiBhd2FpdCB0aGlzLnByb3h5Q29tbWFuZCgnL2FsZXJ0L2Rpc21pc3MnLCAnUE9TVCcsIHBhcmFtcyk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGlmICghdGhpcy5pc1dlYkNvbnRleHQoKSkge1xuICAgICAgdGhyb3cgbmV3IGVycm9ycy5Ob0FsZXJ0T3BlbkVycm9yKGVyci5tZXNzYWdlKTtcbiAgICB9XG5cbiAgICBsZXQgYWxlcnQgPSBhd2FpdCB0aGlzLmdldEFsZXJ0KCk7XG4gICAgaWYgKGFsZXJ0LmNsb3NlKSB7XG4gICAgICByZXR1cm4gYXdhaXQgYWxlcnQuY2xvc2UoKTtcbiAgICB9XG4gICAgYXdhaXQgYWxlcnQuY2FuY2VsKCk7XG4gIH1cbn07XG5cbmNvbW1hbmRzLmdldEFsZXJ0QnV0dG9ucyA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5wcm94eUNvbW1hbmQoJy93ZGEvYWxlcnQvYnV0dG9ucycsICdHRVQnKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgdGhyb3cgbmV3IGVycm9ycy5Ob0FsZXJ0T3BlbkVycm9yKGVyci5tZXNzYWdlKTtcbiAgfVxufTtcblxuY29tbWFuZHMubW9iaWxlSGFuZGxlQWxlcnQgPSBhc3luYyBmdW5jdGlvbiAob3B0cyA9IHt9KSB7XG4gIHN3aXRjaCAob3B0cy5hY3Rpb24pIHtcbiAgICBjYXNlICdhY2NlcHQnOlxuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucG9zdEFjY2VwdEFsZXJ0KG9wdHMpO1xuICAgIGNhc2UgJ2Rpc21pc3MnOlxuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucG9zdERpc21pc3NBbGVydChvcHRzKTtcbiAgICBjYXNlICdnZXRCdXR0b25zJzpcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLmdldEFsZXJ0QnV0dG9ucygpO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSAnYWN0aW9uJyB2YWx1ZSBzaG91bGQgYmUgZWl0aGVyICdhY2NlcHQnLCAnZGlzbWlzcycgb3IgJ2dldEJ1dHRvbnMnLiBgICtcbiAgICAgICAgICAgICAgICAgICAgICBgJyR7b3B0cy5hY3Rpb259JyBpcyBwcm92aWRlZCBpbnN0ZWFkLmApO1xuICB9XG59O1xuXG5oZWxwZXJzLmdldEFsZXJ0ID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBsZXQgcG9zc2libGVBbGVydCA9IGF3YWl0IHRoaXMuZmluZE5hdGl2ZUVsZW1lbnRPckVsZW1lbnRzKCdjbGFzcyBuYW1lJywgJ1hDVUlFbGVtZW50VHlwZVNjcm9sbFZpZXcnLCB0cnVlKTtcbiAgaWYgKHBvc3NpYmxlQWxlcnQubGVuZ3RoICE9PSAxKSB7XG4gICAgdGhyb3cgbmV3IGVycm9ycy5Ob0FsZXJ0T3BlbkVycm9yKCk7XG4gIH1cblxuICBsZXQgcG9zc2libGVBbGVydEJ1dHRvbnMgPSBhd2FpdCB0aGlzLmZpbmROYXRpdmVFbGVtZW50T3JFbGVtZW50cygnY2xhc3MgbmFtZScsICdYQ1VJRWxlbWVudFR5cGVCdXR0b24nLCB0cnVlLCBwb3NzaWJsZUFsZXJ0WzBdLkVMRU1FTlQpO1xuICBpZiAocG9zc2libGVBbGVydEJ1dHRvbnMubGVuZ3RoICA8IDEgfHwgcG9zc2libGVBbGVydEJ1dHRvbnMubGVuZ3RoID4gMikge1xuICAgIHRocm93IG5ldyBlcnJvcnMuTm9BbGVydE9wZW5FcnJvcigpO1xuICB9XG5cbiAgbGV0IGFzc2VydEJ1dHRvbk5hbWUgPSBhc3luYyAoYnV0dG9uLCBleHBlY3RlZE5hbWUpID0+IHtcbiAgICBidXR0b24gPSBidXR0b24uRUxFTUVOVCA/IGJ1dHRvbi5FTEVNRU5UIDogYnV0dG9uO1xuICAgIGxldCBuYW1lID0gYXdhaXQgdGhpcy5wcm94eUNvbW1hbmQoYC9lbGVtZW50LyR7YnV0dG9ufS9hdHRyaWJ1dGUvbmFtZWAsICdHRVQnKTtcbiAgICBpZiAobmFtZS50b0xvd2VyQ2FzZSgpICE9PSBleHBlY3RlZE5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBlcnJvcnMuTm9BbGVydE9wZW5FcnJvcigpO1xuICAgIH1cbiAgfTtcblxuICBsZXQgYWxlcnQgPSBwb3NzaWJsZUFsZXJ0WzBdO1xuICBpZiAocG9zc2libGVBbGVydEJ1dHRvbnMubGVuZ3RoID09PSAxKSB7XG4gICAgLy8gbWFrZSBzdXJlIHRoZSBidXR0b24gaXMgJ0Nsb3NlJ1xuICAgIGxldCBjbG9zZUJ1dHRvbiA9IHBvc3NpYmxlQWxlcnRCdXR0b25zWzBdO1xuICAgIGF3YWl0IGFzc2VydEJ1dHRvbk5hbWUoY2xvc2VCdXR0b24sICdjbG9zZScpO1xuXG4gICAgYWxlcnQuY2xvc2UgPSBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLnByb3h5Q29tbWFuZChgL2VsZW1lbnQvJHtjbG9zZUJ1dHRvbi5FTEVNRU5UfS9jbGlja2AsICdQT1NUJyk7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICAvLyBlbnN1cmUgdGhlIGJ1dHRvbnMgYXJlICdDYW5jZWwnIGFuZCAnT0snXG4gICAgbGV0IGNhbmNlbEJ1dHRvbiA9IHBvc3NpYmxlQWxlcnRCdXR0b25zWzBdO1xuICAgIGF3YWl0IGFzc2VydEJ1dHRvbk5hbWUoY2FuY2VsQnV0dG9uLCAnY2FuY2VsJyk7XG4gICAgbGV0IG9rQnV0dG9uID0gcG9zc2libGVBbGVydEJ1dHRvbnNbMV07XG4gICAgYXdhaXQgYXNzZXJ0QnV0dG9uTmFtZShva0J1dHRvbiwgJ29rJyk7XG5cbiAgICBhbGVydC5jYW5jZWwgPSBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLnByb3h5Q29tbWFuZChgL2VsZW1lbnQvJHtjYW5jZWxCdXR0b24uRUxFTUVOVH0vY2xpY2tgLCAnUE9TVCcpO1xuICAgIH07XG4gICAgYWxlcnQub2sgPSBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLnByb3h5Q29tbWFuZChgL2VsZW1lbnQvJHtva0J1dHRvbi5FTEVNRU5UfS9jbGlja2AsICdQT1NUJyk7XG4gICAgfTtcbiAgfVxuXG4gIGFsZXJ0LmdldFRleHQgPSBhc3luYyAoKSA9PiB7XG4gICAgbGV0IHRleHRWaWV3ID0gYXdhaXQgdGhpcy5maW5kTmF0aXZlRWxlbWVudE9yRWxlbWVudHMoJ2NsYXNzIG5hbWUnLCAnWENVSUVsZW1lbnRUeXBlVGV4dFZpZXcnLCBmYWxzZSwgdXRpbC51bndyYXBFbGVtZW50KGFsZXJ0KSk7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMucHJveHlDb21tYW5kKGAvZWxlbWVudC8ke3RleHRWaWV3LkVMRU1FTlR9L2F0dHJpYnV0ZS92YWx1ZWAsICdHRVQnKTtcbiAgfTtcbiAgYWxlcnQuc2V0VGV4dCA9IGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQgdGV4dFZpZXcgPSBhd2FpdCB0aGlzLmZpbmROYXRpdmVFbGVtZW50T3JFbGVtZW50cygnY2xhc3MgbmFtZScsICdYQ1VJRWxlbWVudFR5cGVUZXh0RmllbGQnLCBmYWxzZSwgdXRpbC51bndyYXBFbGVtZW50KGFsZXJ0KSk7XG4gICAgICBhd2FpdCB0aGlzLnByb3h5Q29tbWFuZChgL2VsZW1lbnQvJHt0ZXh0Vmlldy5FTEVNRU5UfS92YWx1ZSBgLCAnUE9TVCcsIHt2YWx1ZX0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKGlzRXJyb3JUeXBlKGVyciwgZXJyb3JzLk5vU3VjaEVsZW1lbnRFcnJvcikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcmllZCB0byBzZXQgdGV4dCBvZiBhbiBhbGVydCB0aGF0IHdhcyBub3QgYSBwcm9tcHQnKTtcbiAgICAgIH1cbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGFsZXJ0O1xufTtcblxuXG5PYmplY3QuYXNzaWduKGV4dGVuc2lvbnMsIGNvbW1hbmRzLCBoZWxwZXJzKTtcbmV4cG9ydCB7IGNvbW1hbmRzLCBoZWxwZXJzIH07XG5leHBvcnQgZGVmYXVsdCBleHRlbnNpb25zO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLiJ9
