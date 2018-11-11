'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _appiumIosDriver = require('appium-ios-driver');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _appiumSupport = require('appium-support');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _teen_process = require('teen_process');

var IOSLog = (function (_IOSDriverIOSLog) {
  _inherits(IOSLog, _IOSDriverIOSLog);

  function IOSLog() {
    _classCallCheck(this, IOSLog);

    _get(Object.getPrototypeOf(IOSLog.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(IOSLog, [{
    key: 'startCaptureSimulator',
    value: function startCaptureSimulator() {
      var tool, args, systemLogPath;
      return _regeneratorRuntime.async(function startCaptureSimulator$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (!_lodash2['default'].isUndefined(this.sim.udid)) {
              context$2$0.next = 2;
              break;
            }

            throw new Error('Log capture requires a sim udid');

          case 2:
            tool = undefined, args = undefined;

            if (!(this.xcodeVersion.major < 9)) {
              context$2$0.next = 14;
              break;
            }

            systemLogPath = _path2['default'].resolve(this.sim.getLogDir(), 'system.log');
            context$2$0.next = 7;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(systemLogPath));

          case 7:
            if (context$2$0.sent) {
              context$2$0.next = 9;
              break;
            }

            throw new Error('No logs could be found at ' + systemLogPath);

          case 9:
            _logger2['default'].debug('System log path: ' + systemLogPath);
            tool = 'tail';
            args = ['-f', '-n', '1', systemLogPath];
            context$2$0.next = 20;
            break;

          case 14:
            context$2$0.next = 16;
            return _regeneratorRuntime.awrap(this.sim.isRunning());

          case 16:
            if (context$2$0.sent) {
              context$2$0.next = 18;
              break;
            }

            throw new Error('iOS Simulator with udid ' + this.sim.udid + ' is not running');

          case 18:
            tool = 'xcrun';
            args = ['simctl', 'spawn', this.sim.udid, 'log', 'stream', '--style', 'compact'];

          case 20:
            _logger2['default'].debug('Starting log capture for iOS Simulator with udid \'' + this.sim.udid + '\', ' + ('using \'' + tool + ' ' + args.join(' ') + '\''));
            context$2$0.prev = 21;
            context$2$0.next = 24;
            return _regeneratorRuntime.awrap((0, _teen_process.exec)('pkill', ['-xf', [tool].concat(_toConsumableArray(args)).join(' ')]));

          case 24:
            context$2$0.next = 28;
            break;

          case 26:
            context$2$0.prev = 26;
            context$2$0.t0 = context$2$0['catch'](21);

          case 28:
            context$2$0.prev = 28;

            this.proc = new _teen_process.SubProcess(tool, args);
            context$2$0.next = 32;
            return _regeneratorRuntime.awrap(this.finishStartingLogCapture());

          case 32:
            context$2$0.next = 37;
            break;

          case 34:
            context$2$0.prev = 34;
            context$2$0.t1 = context$2$0['catch'](28);
            throw new Error('Simulator log capture failed. Original error: ' + context$2$0.t1.message);

          case 37:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[21, 26], [28, 34]]);
    }
  }, {
    key: 'isCapturing',
    get: function get() {
      return !!(this.proc && this.proc.isRunning);
    }
  }]);

  return IOSLog;
})(_appiumIosDriver.IOSLog);

exports.IOSLog = IOSLog;
exports['default'] = IOSLog;

// cleanup existing listeners if the previous session has not been terminated properly
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9kZXZpY2UtbG9nL2lvcy1sb2cuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7K0JBQTBDLG1CQUFtQjs7b0JBQzVDLE1BQU07Ozs7NkJBQ0osZ0JBQWdCOztzQkFDckIsUUFBUTs7OztzQkFDTixXQUFXOzs7OzRCQUNNLGNBQWM7O0lBR3pDLE1BQU07WUFBTixNQUFNOztXQUFOLE1BQU07MEJBQU4sTUFBTTs7K0JBQU4sTUFBTTs7O2VBQU4sTUFBTTs7V0FDa0I7VUFLdEIsSUFBSSxFQUFFLElBQUksRUFFTixhQUFhOzs7O2lCQU5qQixvQkFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7Ozs7O2tCQUN4QixJQUFJLEtBQUssbUNBQW1DOzs7QUFHaEQsZ0JBQUksY0FBRSxJQUFJOztrQkFDVixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUE7Ozs7O0FBQ3ZCLHlCQUFhLEdBQUcsa0JBQUssT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUUsWUFBWSxDQUFDOzs2Q0FDM0Qsa0JBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQzs7Ozs7Ozs7a0JBQzNCLElBQUksS0FBSyxnQ0FBOEIsYUFBYSxDQUFHOzs7QUFFL0QsZ0NBQUksS0FBSyx1QkFBcUIsYUFBYSxDQUFHLENBQUM7QUFDL0MsZ0JBQUksR0FBRyxNQUFNLENBQUM7QUFDZCxnQkFBSSxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUM7Ozs7Ozs2Q0FFN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUU7Ozs7Ozs7O2tCQUN2QixJQUFJLEtBQUssOEJBQTRCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxxQkFBa0I7OztBQUU1RSxnQkFBSSxHQUFHLE9BQU8sQ0FBQztBQUNmLGdCQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDOzs7QUFFbkYsZ0NBQUksS0FBSyxDQUFDLHdEQUFxRCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksMEJBQ3hELElBQUksU0FBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFHLENBQUMsQ0FBQzs7OzZDQUd2Qyx3QkFBSyxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLDRCQUFLLElBQUksR0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7OztBQUd2RCxnQkFBSSxDQUFDLElBQUksR0FBRyw2QkFBZSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7OzZDQUNqQyxJQUFJLENBQUMsd0JBQXdCLEVBQUU7Ozs7Ozs7OztrQkFFL0IsSUFBSSxLQUFLLG9EQUFrRCxlQUFFLE9BQU8sQ0FBRzs7Ozs7OztLQUVoRjs7O1NBRWUsZUFBRztBQUNqQixhQUFPLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFBLEFBQUMsQ0FBQztLQUM3Qzs7O1NBdENHLE1BQU07OztRQXlDSCxNQUFNLEdBQU4sTUFBTTtxQkFDQSxNQUFNIiwiZmlsZSI6ImxpYi9kZXZpY2UtbG9nL2lvcy1sb2cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJT1NMb2cgYXMgSU9TRHJpdmVySU9TTG9nIH0gZnJvbSAnYXBwaXVtLWlvcy1kcml2ZXInO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBmcyB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgbG9nIGZyb20gJy4uL2xvZ2dlcic7XG5pbXBvcnQgeyBTdWJQcm9jZXNzLCBleGVjIH0gZnJvbSAndGVlbl9wcm9jZXNzJztcblxuXG5jbGFzcyBJT1NMb2cgZXh0ZW5kcyBJT1NEcml2ZXJJT1NMb2cge1xuICBhc3luYyBzdGFydENhcHR1cmVTaW11bGF0b3IgKCkge1xuICAgIGlmIChfLmlzVW5kZWZpbmVkKHRoaXMuc2ltLnVkaWQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYExvZyBjYXB0dXJlIHJlcXVpcmVzIGEgc2ltIHVkaWRgKTtcbiAgICB9XG5cbiAgICBsZXQgdG9vbCwgYXJncztcbiAgICBpZiAodGhpcy54Y29kZVZlcnNpb24ubWFqb3IgPCA5KSB7XG4gICAgICBjb25zdCBzeXN0ZW1Mb2dQYXRoID0gcGF0aC5yZXNvbHZlKHRoaXMuc2ltLmdldExvZ0RpcigpLCAnc3lzdGVtLmxvZycpO1xuICAgICAgaWYgKCFhd2FpdCBmcy5leGlzdHMoc3lzdGVtTG9nUGF0aCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBsb2dzIGNvdWxkIGJlIGZvdW5kIGF0ICR7c3lzdGVtTG9nUGF0aH1gKTtcbiAgICAgIH1cbiAgICAgIGxvZy5kZWJ1ZyhgU3lzdGVtIGxvZyBwYXRoOiAke3N5c3RlbUxvZ1BhdGh9YCk7XG4gICAgICB0b29sID0gJ3RhaWwnO1xuICAgICAgYXJncyA9IFsnLWYnLCAnLW4nLCAnMScsIHN5c3RlbUxvZ1BhdGhdO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIWF3YWl0IHRoaXMuc2ltLmlzUnVubmluZygpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgaU9TIFNpbXVsYXRvciB3aXRoIHVkaWQgJHt0aGlzLnNpbS51ZGlkfSBpcyBub3QgcnVubmluZ2ApO1xuICAgICAgfVxuICAgICAgdG9vbCA9ICd4Y3J1bic7XG4gICAgICBhcmdzID0gWydzaW1jdGwnLCAnc3Bhd24nLCB0aGlzLnNpbS51ZGlkLCAnbG9nJywgJ3N0cmVhbScsICctLXN0eWxlJywgJ2NvbXBhY3QnXTtcbiAgICB9XG4gICAgbG9nLmRlYnVnKGBTdGFydGluZyBsb2cgY2FwdHVyZSBmb3IgaU9TIFNpbXVsYXRvciB3aXRoIHVkaWQgJyR7dGhpcy5zaW0udWRpZH0nLCBgICtcbiAgICAgICAgICAgICAgYHVzaW5nICcke3Rvb2x9ICR7YXJncy5qb2luKCcgJyl9J2ApO1xuICAgIHRyeSB7XG4gICAgICAvLyBjbGVhbnVwIGV4aXN0aW5nIGxpc3RlbmVycyBpZiB0aGUgcHJldmlvdXMgc2Vzc2lvbiBoYXMgbm90IGJlZW4gdGVybWluYXRlZCBwcm9wZXJseVxuICAgICAgYXdhaXQgZXhlYygncGtpbGwnLCBbJy14ZicsIFt0b29sLCAuLi5hcmdzXS5qb2luKCcgJyldKTtcbiAgICB9IGNhdGNoIChpZ24pIHt9XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMucHJvYyA9IG5ldyBTdWJQcm9jZXNzKHRvb2wsIGFyZ3MpO1xuICAgICAgYXdhaXQgdGhpcy5maW5pc2hTdGFydGluZ0xvZ0NhcHR1cmUoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFNpbXVsYXRvciBsb2cgY2FwdHVyZSBmYWlsZWQuIE9yaWdpbmFsIGVycm9yOiAke2UubWVzc2FnZX1gKTtcbiAgICB9XG4gIH1cblxuICBnZXQgaXNDYXB0dXJpbmcgKCkge1xuICAgIHJldHVybiAhISh0aGlzLnByb2MgJiYgdGhpcy5wcm9jLmlzUnVubmluZyk7XG4gIH1cbn1cblxuZXhwb3J0IHsgSU9TTG9nIH07XG5leHBvcnQgZGVmYXVsdCBJT1NMb2c7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uIn0=
