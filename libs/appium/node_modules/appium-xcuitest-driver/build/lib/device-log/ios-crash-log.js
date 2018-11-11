'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _appiumIosDriver = require('appium-ios-driver');

var _appiumSupport = require('appium-support');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _teen_process = require('teen_process');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var IOSCrashLog = (function (_IOSDriverIOSCrashLog) {
  _inherits(IOSCrashLog, _IOSDriverIOSCrashLog);

  function IOSCrashLog() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, IOSCrashLog);

    _get(Object.getPrototypeOf(IOSCrashLog.prototype), 'constructor', this).call(this, opts.udid ? _path2['default'].resolve(process.env.HOME, 'Library', 'Logs', 'CrashReporter', 'MobileDevice') : _path2['default'].resolve(process.env.HOME, 'Library', 'Logs', 'DiagnosticReports'));
    this.udid = opts.udid;
    this.phoneName = null;
    this.sim = opts.sim;
  }

  _createClass(IOSCrashLog, [{
    key: 'getCrashes',
    value: function getCrashes() {
      var crashLogsRoot, _ref, stdout, foundFiles;

      return _regeneratorRuntime.async(function getCrashes$(context$2$0) {
        var _this = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            crashLogsRoot = this.logDir;

            if (!this.udid) {
              context$2$0.next = 16;
              break;
            }

            if (this.phoneName) {
              context$2$0.next = 15;
              break;
            }

            context$2$0.prev = 3;
            context$2$0.next = 6;
            return _regeneratorRuntime.awrap((0, _teen_process.exec)('idevicename', ['-u', this.udid]));

          case 6:
            _ref = context$2$0.sent;
            stdout = _ref.stdout;

            this.phoneName = stdout.trim();
            context$2$0.next = 15;
            break;

          case 11:
            context$2$0.prev = 11;
            context$2$0.t0 = context$2$0['catch'](3);

            _logger2['default'].warn('Cannot get the name of the crashes folder for the device with udid \'' + this.udid + '\'. ' + ('Original error: ' + context$2$0.t0.message));
            return context$2$0.abrupt('return', []);

          case 15:
            if (this.phoneName) {
              crashLogsRoot = _path2['default'].resolve(crashLogsRoot, this.phoneName);
            }

          case 16:
            context$2$0.next = 18;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(crashLogsRoot));

          case 18:
            if (context$2$0.sent) {
              context$2$0.next = 21;
              break;
            }

            _logger2['default'].debug('Crash reports root \'' + crashLogsRoot + '\' does not exist. Got nothing to gather.');
            return context$2$0.abrupt('return', []);

          case 21:
            context$2$0.next = 23;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.glob(crashLogsRoot + '/**/*.crash'));

          case 23:
            foundFiles = context$2$0.sent;

            if (!this.udid) {
              context$2$0.next = 26;
              break;
            }

            return context$2$0.abrupt('return', foundFiles);

          case 26:
            context$2$0.next = 28;
            return _regeneratorRuntime.awrap(_bluebird2['default'].filter(foundFiles, function callee$2$0(x) {
              var content;
              return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                while (1) switch (context$3$0.prev = context$3$0.next) {
                  case 0:
                    context$3$0.prev = 0;
                    context$3$0.next = 3;
                    return _regeneratorRuntime.awrap(_appiumSupport.fs.readFile(x, 'utf8'));

                  case 3:
                    content = context$3$0.sent;
                    return context$3$0.abrupt('return', content.toUpperCase().includes(this.sim.udid.toUpperCase()));

                  case 7:
                    context$3$0.prev = 7;
                    context$3$0.t0 = context$3$0['catch'](0);
                    return context$3$0.abrupt('return', false);

                  case 10:
                  case 'end':
                    return context$3$0.stop();
                }
              }, null, _this, [[0, 7]]);
            }));

          case 28:
            return context$2$0.abrupt('return', context$2$0.sent);

          case 29:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[3, 11]]);
    }
  }, {
    key: 'filesToJSON',
    value: function filesToJSON(paths) {
      return _regeneratorRuntime.async(function filesToJSON$(context$2$0) {
        var _this2 = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(_bluebird2['default'].map(paths, function callee$2$0(fullPath) {
              var stat;
              return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                while (1) switch (context$3$0.prev = context$3$0.next) {
                  case 0:
                    context$3$0.next = 2;
                    return _regeneratorRuntime.awrap(_appiumSupport.fs.stat(fullPath));

                  case 2:
                    stat = context$3$0.sent;
                    context$3$0.t0 = stat.ctime.getTime();
                    context$3$0.next = 6;
                    return _regeneratorRuntime.awrap(_appiumSupport.fs.readFile(fullPath, 'utf8'));

                  case 6:
                    context$3$0.t1 = context$3$0.sent;
                    return context$3$0.abrupt('return', {
                      timestamp: context$3$0.t0,
                      level: 'ALL',
                      message: context$3$0.t1
                    });

                  case 8:
                  case 'end':
                    return context$3$0.stop();
                }
              }, null, _this2);
            }));

          case 2:
            return context$2$0.abrupt('return', context$2$0.sent);

          case 3:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }]);

  return IOSCrashLog;
})(_appiumIosDriver.IOSCrashLog);

exports.IOSCrashLog = IOSCrashLog;
exports['default'] = IOSCrashLog;

// For Simulator only include files, that contain current UDID
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9kZXZpY2UtbG9nL2lvcy1jcmFzaC1sb2cuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OytCQUFvRCxtQkFBbUI7OzZCQUNwRCxnQkFBZ0I7O3dCQUNyQixVQUFVOzs7O3NCQUNSLFdBQVc7Ozs7NEJBQ04sY0FBYzs7b0JBQ2xCLE1BQU07Ozs7SUFFakIsV0FBVztZQUFYLFdBQVc7O0FBQ0gsV0FEUixXQUFXLEdBQ1M7UUFBWCxJQUFJLHlEQUFHLEVBQUU7OzBCQURsQixXQUFXOztBQUViLCtCQUZFLFdBQVcsNkNBRVAsSUFBSSxDQUFDLElBQUksR0FDYixrQkFBSyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsY0FBYyxDQUFDLEdBQ2xGLGtCQUFLLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLG1CQUFtQixDQUFDLEVBQUU7QUFDMUUsUUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQ3RCLFFBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0FBQ3RCLFFBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztHQUNyQjs7ZUFSRyxXQUFXOztXQVVFO1VBQ1gsYUFBYSxRQUlKLE1BQU0sRUFnQmIsVUFBVTs7Ozs7OztBQXBCWix5QkFBYSxHQUFHLElBQUksQ0FBQyxNQUFNOztpQkFDM0IsSUFBSSxDQUFDLElBQUk7Ozs7O2dCQUNOLElBQUksQ0FBQyxTQUFTOzs7Ozs7OzZDQUVRLHdCQUFLLGFBQWEsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7QUFBdEQsa0JBQU0sUUFBTixNQUFNOztBQUNiLGdCQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7Ozs7Ozs7QUFFL0IsZ0NBQUksSUFBSSxDQUFDLDBFQUF1RSxJQUFJLENBQUMsSUFBSSxrQ0FDcEUsZUFBRSxPQUFPLENBQUUsQ0FBQyxDQUFDO2dEQUMzQixFQUFFOzs7QUFHYixnQkFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO0FBQ2xCLDJCQUFhLEdBQUcsa0JBQUssT0FBTyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDN0Q7Ozs7NkNBRVEsa0JBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQzs7Ozs7Ozs7QUFDakMsZ0NBQUksS0FBSywyQkFBd0IsYUFBYSwrQ0FBMkMsQ0FBQztnREFDbkYsRUFBRTs7Ozs2Q0FFYyxrQkFBRyxJQUFJLENBQUksYUFBYSxpQkFBYzs7O0FBQXpELHNCQUFVOztpQkFDWixJQUFJLENBQUMsSUFBSTs7Ozs7Z0RBQ0osVUFBVTs7Ozs2Q0FHTixzQkFBRSxNQUFNLENBQUMsVUFBVSxFQUFFLG9CQUFPLENBQUM7a0JBRWhDLE9BQU87Ozs7OztxREFBUyxrQkFBRyxRQUFRLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQzs7O0FBQXRDLDJCQUFPO3dEQUNOLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Ozs7O3dEQUUzRCxLQUFLOzs7Ozs7O2FBRWYsQ0FBQzs7Ozs7Ozs7OztLQUNIOzs7V0FFaUIscUJBQUMsS0FBSzs7Ozs7Ozs2Q0FDVCxzQkFBRSxHQUFHLENBQUMsS0FBSyxFQUFFLG9CQUFPLFFBQVE7a0JBQ2pDLElBQUk7Ozs7O3FEQUFTLGtCQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7OztBQUE5Qix3QkFBSTtxQ0FFRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTs7cURBRWhCLGtCQUFHLFFBQVEsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDOzs7OztBQUY1QywrQkFBUztBQUNULDJCQUFLLEVBQUUsS0FBSztBQUNaLDZCQUFPOzs7Ozs7OzthQUVWLENBQUM7Ozs7Ozs7Ozs7S0FDSDs7O1NBdkRHLFdBQVc7OztRQTBEUixXQUFXLEdBQVgsV0FBVztxQkFDTCxXQUFXIiwiZmlsZSI6ImxpYi9kZXZpY2UtbG9nL2lvcy1jcmFzaC1sb2cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJT1NDcmFzaExvZyBhcyBJT1NEcml2ZXJJT1NDcmFzaExvZyB9IGZyb20gJ2FwcGl1bS1pb3MtZHJpdmVyJztcbmltcG9ydCB7IGZzIH0gZnJvbSAnYXBwaXVtLXN1cHBvcnQnO1xuaW1wb3J0IEIgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IGxvZyBmcm9tICcuLi9sb2dnZXInO1xuaW1wb3J0IHsgZXhlYyB9IGZyb20gJ3RlZW5fcHJvY2Vzcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuY2xhc3MgSU9TQ3Jhc2hMb2cgZXh0ZW5kcyBJT1NEcml2ZXJJT1NDcmFzaExvZyB7XG4gIGNvbnN0cnVjdG9yIChvcHRzID0ge30pIHtcbiAgICBzdXBlcihvcHRzLnVkaWQgP1xuICAgICAgcGF0aC5yZXNvbHZlKHByb2Nlc3MuZW52LkhPTUUsICdMaWJyYXJ5JywgJ0xvZ3MnLCAnQ3Jhc2hSZXBvcnRlcicsICdNb2JpbGVEZXZpY2UnKSA6XG4gICAgICBwYXRoLnJlc29sdmUocHJvY2Vzcy5lbnYuSE9NRSwgJ0xpYnJhcnknLCAnTG9ncycsICdEaWFnbm9zdGljUmVwb3J0cycpKTtcbiAgICB0aGlzLnVkaWQgPSBvcHRzLnVkaWQ7XG4gICAgdGhpcy5waG9uZU5hbWUgPSBudWxsO1xuICAgIHRoaXMuc2ltID0gb3B0cy5zaW07XG4gIH1cblxuICBhc3luYyBnZXRDcmFzaGVzICgpIHtcbiAgICBsZXQgY3Jhc2hMb2dzUm9vdCA9IHRoaXMubG9nRGlyO1xuICAgIGlmICh0aGlzLnVkaWQpIHtcbiAgICAgIGlmICghdGhpcy5waG9uZU5hbWUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCB7c3Rkb3V0fSA9IGF3YWl0IGV4ZWMoJ2lkZXZpY2VuYW1lJywgWyctdScsIHRoaXMudWRpZF0pO1xuICAgICAgICAgIHRoaXMucGhvbmVOYW1lID0gc3Rkb3V0LnRyaW0oKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGxvZy53YXJuKGBDYW5ub3QgZ2V0IHRoZSBuYW1lIG9mIHRoZSBjcmFzaGVzIGZvbGRlciBmb3IgdGhlIGRldmljZSB3aXRoIHVkaWQgJyR7dGhpcy51ZGlkfScuIGAgK1xuICAgICAgICAgICAgYE9yaWdpbmFsIGVycm9yOiAke2UubWVzc2FnZX1gKTtcbiAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnBob25lTmFtZSkge1xuICAgICAgICBjcmFzaExvZ3NSb290ID0gcGF0aC5yZXNvbHZlKGNyYXNoTG9nc1Jvb3QsIHRoaXMucGhvbmVOYW1lKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFhd2FpdCBmcy5leGlzdHMoY3Jhc2hMb2dzUm9vdCkpIHtcbiAgICAgIGxvZy5kZWJ1ZyhgQ3Jhc2ggcmVwb3J0cyByb290ICcke2NyYXNoTG9nc1Jvb3R9JyBkb2VzIG5vdCBleGlzdC4gR290IG5vdGhpbmcgdG8gZ2F0aGVyLmApO1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICBjb25zdCBmb3VuZEZpbGVzID0gYXdhaXQgZnMuZ2xvYihgJHtjcmFzaExvZ3NSb290fS8qKi8qLmNyYXNoYCk7XG4gICAgaWYgKHRoaXMudWRpZCkge1xuICAgICAgcmV0dXJuIGZvdW5kRmlsZXM7XG4gICAgfVxuICAgIC8vIEZvciBTaW11bGF0b3Igb25seSBpbmNsdWRlIGZpbGVzLCB0aGF0IGNvbnRhaW4gY3VycmVudCBVRElEXG4gICAgcmV0dXJuIGF3YWl0IEIuZmlsdGVyKGZvdW5kRmlsZXMsIGFzeW5jICh4KSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgZnMucmVhZEZpbGUoeCwgJ3V0ZjgnKTtcbiAgICAgICAgcmV0dXJuIGNvbnRlbnQudG9VcHBlckNhc2UoKS5pbmNsdWRlcyh0aGlzLnNpbS51ZGlkLnRvVXBwZXJDYXNlKCkpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGZpbGVzVG9KU09OIChwYXRocykge1xuICAgIHJldHVybiBhd2FpdCBCLm1hcChwYXRocywgYXN5bmMgKGZ1bGxQYXRoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ID0gYXdhaXQgZnMuc3RhdChmdWxsUGF0aCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0aW1lc3RhbXA6IHN0YXQuY3RpbWUuZ2V0VGltZSgpLFxuICAgICAgICBsZXZlbDogJ0FMTCcsXG4gICAgICAgIG1lc3NhZ2U6IGF3YWl0IGZzLnJlYWRGaWxlKGZ1bGxQYXRoLCAndXRmOCcpXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCB7IElPU0NyYXNoTG9nIH07XG5leHBvcnQgZGVmYXVsdCBJT1NDcmFzaExvZztcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4ifQ==
