'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _asyncbox = require('asyncbox');

var NATIVE_WIN = "NATIVE_APP";
var WEBVIEW_WIN = "WEBVIEW";
var WEBVIEW_BASE = WEBVIEW_WIN + '_';
var WEBVIEW_REGEXP = new RegExp('@?webview_devtools_remote_(\\d+)');
var WEBVIEW_PID_REGEXP = new RegExp(WEBVIEW_BASE + '(\\d+)');
var CHROMIUM_WIN = "CHROMIUM";
var CROSSWALK_SOCKET_SUFFIX = "_devtools_remote";
var CROSSWALK_REGEXP_STRING = '(\\S*)' + CROSSWALK_SOCKET_SUFFIX;
var CROSSWALK_REGEXP = new RegExp('@' + CROSSWALK_REGEXP_STRING);
var CROSSWALK_PROCESS_REGEXP = new RegExp(WEBVIEW_BASE + CROSSWALK_REGEXP_STRING);

var helpers = {};

// This function gets a list of android system processes and returns ones
// that look like webviews, with the appropriate webview prefix and their PID.
// If we pass in a deviceSocket, we only attempt to find webviews which match
// that socket name (this is for apps which embed Chromium, which isn't the
// same as chrome-backed webviews)
// TODO: some of this function belongs in appium-adb
function webviewsFromProcs(adb, deviceSocket) {
  var webviews, out, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, line, webviewPid, crosswalkWebviewSocket;

  return _regeneratorRuntime.async(function webviewsFromProcs$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        webviews = [];
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(adb.shell(["cat", "/proc/net/unix"]));

      case 3:
        out = context$1$0.sent;
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 7;
        _iterator = _getIterator(out.split("\n"));

      case 9:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 23;
          break;
        }

        line = _step.value;

        line = line.trim();

        if (!deviceSocket) {
          context$1$0.next = 17;
          break;
        }

        if (!(line.indexOf('@' + deviceSocket) === line.length - deviceSocket.length - 1)) {
          context$1$0.next = 17;
          break;
        }

        if (!(deviceSocket === "chrome_devtools_remote")) {
          context$1$0.next = 17;
          break;
        }

        webviews.push(CHROMIUM_WIN);
        return context$1$0.abrupt('continue', 20);

      case 17:
        webviewPid = undefined;
        crosswalkWebviewSocket = undefined;

        if (webviewPid = line.match(WEBVIEW_REGEXP)) {
          // for multiple webviews a list of 'WEBVIEW_<index>' will be returned
          // where <index> is zero based (same is in selendroid)
          webviews.push('' + WEBVIEW_BASE + webviewPid[1]);
        } else if (crosswalkWebviewSocket = line.match(CROSSWALK_REGEXP)) {
          if (deviceSocket) {
            if (crosswalkWebviewSocket[0].slice(1) === deviceSocket) {
              webviews.push('' + WEBVIEW_BASE + crosswalkWebviewSocket[1]);
            }
          } else {
            webviews.push('' + WEBVIEW_BASE + crosswalkWebviewSocket[1] + CROSSWALK_SOCKET_SUFFIX);
          }
        }

      case 20:
        _iteratorNormalCompletion = true;
        context$1$0.next = 9;
        break;

      case 23:
        context$1$0.next = 29;
        break;

      case 25:
        context$1$0.prev = 25;
        context$1$0.t0 = context$1$0['catch'](7);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 29:
        context$1$0.prev = 29;
        context$1$0.prev = 30;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 32:
        context$1$0.prev = 32;

        if (!_didIteratorError) {
          context$1$0.next = 35;
          break;
        }

        throw _iteratorError;

      case 35:
        return context$1$0.finish(32);

      case 36:
        return context$1$0.finish(29);

      case 37:
        return context$1$0.abrupt('return', _lodash2['default'].uniq(webviews));

      case 38:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[7, 25, 29, 37], [30,, 32, 36]]);
}

// Take a webview name like WEBVIEW_4296 and use 'adb shell ps' to figure out
// which app package is associated with that webview. One of the reasons we
// want to do this is to make sure we're listing webviews for the actual AUT,
// not some other running app
// TODO: this should be called procFromPid and exist in appium-adb
helpers.procFromWebview = function callee$0$0(adb, webview) {
  var processName, pid, out, pkg, lines, fullHeader, header, pidColumn, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, line, entries, pidEntry;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(webview.match(WEBVIEW_PID_REGEXP) === null)) {
          context$1$0.next = 5;
          break;
        }

        processName = webview.match(CROSSWALK_PROCESS_REGEXP);

        if (!(processName === null)) {
          context$1$0.next = 4;
          break;
        }

        throw new Error('Could not find process name for webview ' + webview);

      case 4:
        return context$1$0.abrupt('return', processName[1]);

      case 5:
        pid = webview.match(/\d+$/);

        if (pid) {
          context$1$0.next = 8;
          break;
        }

        throw new Error('Could not find PID for webview ' + webview);

      case 8:
        pid = pid[0];
        _logger2['default'].debug(webview + ' mapped to pid ' + pid);
        _logger2['default'].debug("Getting process name for webview");
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(adb.shell("ps"));

      case 13:
        out = context$1$0.sent;
        pkg = "unknown";
        lines = out.split(/\r?\n/);
        fullHeader = lines[0].trim();
        header = fullHeader.split(/\s+/);
        pidColumn = header.indexOf('PID');
        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = undefined;
        context$1$0.prev = 22;
        _iterator2 = _getIterator(lines);

      case 24:
        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
          context$1$0.next = 37;
          break;
        }

        line = _step2.value;
        entries = line.trim().split(/\s+/);
        pidEntry = entries[pidColumn];

        if (!(pidEntry === pid)) {
          context$1$0.next = 34;
          break;
        }

        pkg = _lodash2['default'].last(entries);
        _logger2['default'].debug('Parsed pid: \'' + pidEntry + '\' pkg: \'' + pkg + '\' from');
        _logger2['default'].debug('    ' + fullHeader);
        _logger2['default'].debug('    ' + line);

        return context$1$0.abrupt('break', 37);

      case 34:
        _iteratorNormalCompletion2 = true;
        context$1$0.next = 24;
        break;

      case 37:
        context$1$0.next = 43;
        break;

      case 39:
        context$1$0.prev = 39;
        context$1$0.t0 = context$1$0['catch'](22);
        _didIteratorError2 = true;
        _iteratorError2 = context$1$0.t0;

      case 43:
        context$1$0.prev = 43;
        context$1$0.prev = 44;

        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }

      case 46:
        context$1$0.prev = 46;

        if (!_didIteratorError2) {
          context$1$0.next = 49;
          break;
        }

        throw _iteratorError2;

      case 49:
        return context$1$0.finish(46);

      case 50:
        return context$1$0.finish(43);

      case 51:

        _logger2['default'].debug('Returning process name: \'' + pkg + '\'');
        return context$1$0.abrupt('return', pkg);

      case 53:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[22, 39, 43, 51], [44,, 46, 50]]);
};

// Get a list of available webviews by introspecting processes with adb, where
// webviews are listed. It's possible to pass in a 'deviceSocket' arg, which
// limits the webview possibilities to the one running on the Chromium devtools
// socket we're interested in (see note on webviewsFromProcs)
helpers.getWebviews = function callee$0$0(adb, deviceSocket) {
  var webviews;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].debug("Getting a list of available webviews");
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(webviewsFromProcs(adb, deviceSocket));

      case 3:
        webviews = context$1$0.sent;

        if (!deviceSocket) {
          context$1$0.next = 6;
          break;
        }

        return context$1$0.abrupt('return', webviews);

      case 6:
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap((0, _asyncbox.asyncmap)(webviews, function callee$1$0(webviewName) {
          var pkg;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(helpers.procFromWebview(adb, webviewName));

              case 2:
                pkg = context$2$0.sent;
                return context$2$0.abrupt('return', WEBVIEW_BASE + pkg);

              case 4:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        }));

      case 8:
        webviews = context$1$0.sent;

        _logger2['default'].debug('Found webviews: ' + JSON.stringify(webviews));
        return context$1$0.abrupt('return', webviews);

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.decorateChromeOptions = function (caps, opts, deviceId) {
  // add options from appium session caps
  if (opts.chromeOptions) {
    if (opts.chromeOptions.Arguments) {
      // merge `Arguments` and `args`
      opts.chromeOptions.args = [].concat(_toConsumableArray(opts.chromeOptions.args || []), _toConsumableArray(opts.chromeOptions.Arguments));
      delete opts.chromeOptions.Arguments;
    }
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = _getIterator(_lodash2['default'].toPairs(opts.chromeOptions)), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _step3$value = _slicedToArray(_step3.value, 2);

        var opt = _step3$value[0];
        var val = _step3$value[1];

        if (_lodash2['default'].isUndefined(caps.chromeOptions[opt])) {
          caps.chromeOptions[opt] = val;
        } else {
          _logger2['default'].warn('Cannot pass option ' + caps.chromeOptions[opt] + ' because ' + "Appium needs it to make chromeDriver work");
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
  }

  // add device id from adb
  caps.chromeOptions.androidDeviceSerial = deviceId;
  return caps;
};

exports['default'] = helpers;
exports.helpers = helpers;
exports.NATIVE_WIN = NATIVE_WIN;
exports.WEBVIEW_WIN = WEBVIEW_WIN;
exports.WEBVIEW_BASE = WEBVIEW_BASE;
exports.CHROMIUM_WIN = CHROMIUM_WIN;

// webview_devtools_remote_4296 => 4296

/* Output of ps is like:
 USER       PID  PPID  VSIZE  RSS   WCHAN    PC         NAME  _or_
 USER       PID  PPID  VSZ    RSS   WCHAN    ADDR     S NAME
 u0_a136   6248  179   946000 48144 ffffffff 4005903e R com.example.test
 u0_a136   6249  179   946000 48144 ffffffff          R com.example.test
*/
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi93ZWJ2aWV3LWhlbHBlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztzQkFBYyxRQUFROzs7O3NCQUNILFVBQVU7Ozs7d0JBQ0osVUFBVTs7QUFFbkMsSUFBTSxVQUFVLEdBQUcsWUFBWSxDQUFDO0FBQ2hDLElBQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQztBQUM5QixJQUFNLFlBQVksR0FBTSxXQUFXLE1BQUcsQ0FBQztBQUN2QyxJQUFNLGNBQWMsR0FBRyxJQUFJLE1BQU0sb0NBQW9DLENBQUM7QUFDdEUsSUFBTSxrQkFBa0IsR0FBRyxJQUFJLE1BQU0sQ0FBSSxZQUFZLFlBQVMsQ0FBQztBQUMvRCxJQUFNLFlBQVksR0FBRyxVQUFVLENBQUM7QUFDaEMsSUFBTSx1QkFBdUIsR0FBRyxrQkFBa0IsQ0FBQztBQUNuRCxJQUFNLHVCQUF1QixjQUFZLHVCQUF1QixBQUFFLENBQUM7QUFDbkUsSUFBTSxnQkFBZ0IsR0FBRyxJQUFJLE1BQU0sT0FBSyx1QkFBdUIsQ0FBRyxDQUFDO0FBQ25FLElBQU0sd0JBQXdCLEdBQUcsSUFBSSxNQUFNLENBQUMsWUFBWSxHQUFHLHVCQUF1QixDQUFDLENBQUM7O0FBR3BGLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7QUFRakIsU0FBZSxpQkFBaUIsQ0FBRSxHQUFHLEVBQUUsWUFBWTtNQUM3QyxRQUFRLEVBQ1IsR0FBRyxrRkFDRSxJQUFJLEVBWVAsVUFBVSxFQUNWLHNCQUFzQjs7Ozs7QUFmeEIsZ0JBQVEsR0FBRyxFQUFFOzt5Q0FDRCxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLGdCQUFnQixDQUFDLENBQUM7OztBQUFoRCxXQUFHOzs7OztpQ0FDVSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7QUFBdkIsWUFBSTs7QUFDWCxZQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDOzthQUVmLFlBQVk7Ozs7O2NBQ1YsSUFB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QWEsQ0FBQyxTQUFTLEVBQUMsQ0FBQztBQUNoRyxhQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDO0tBQ3JDOzs7Ozs7QUFDRCx5Q0FBdUIsb0JBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsaUhBQUU7OztZQUE1QyxHQUFHO1lBQUUsR0FBRzs7QUFDaEIsWUFBSSxvQkFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO0FBQzFDLGNBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1NBQy9CLE1BQU07QUFDTCw4QkFBTyxJQUFJLENBQUMsd0JBQXNCLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLGlCQUM3QywyQ0FBMkMsQ0FBQyxDQUFDO1NBQzFEO09BQ0Y7Ozs7Ozs7Ozs7Ozs7OztHQUNGOzs7QUFHRCxNQUFJLENBQUMsYUFBYSxDQUFDLG1CQUFtQixHQUFHLFFBQVEsQ0FBQztBQUNsRCxTQUFPLElBQUksQ0FBQztDQUNiLENBQUM7O3FCQUVhLE9BQU87UUFDYixPQUFPLEdBQVAsT0FBTztRQUFFLFVBQVUsR0FBVixVQUFVO1FBQUUsV0FBVyxHQUFYLFdBQVc7UUFBRSxZQUFZLEdBQVosWUFBWTtRQUFFLFlBQVksR0FBWixZQUFZIiwiZmlsZSI6ImxpYi93ZWJ2aWV3LWhlbHBlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgeyBhc3luY21hcCB9IGZyb20gJ2FzeW5jYm94JztcblxuY29uc3QgTkFUSVZFX1dJTiA9IFwiTkFUSVZFX0FQUFwiO1xuY29uc3QgV0VCVklFV19XSU4gPSBcIldFQlZJRVdcIjtcbmNvbnN0IFdFQlZJRVdfQkFTRSA9IGAke1dFQlZJRVdfV0lOfV9gO1xuY29uc3QgV0VCVklFV19SRUdFWFAgPSBuZXcgUmVnRXhwKGBAP3dlYnZpZXdfZGV2dG9vbHNfcmVtb3RlXyhcXFxcZCspYCk7XG5jb25zdCBXRUJWSUVXX1BJRF9SRUdFWFAgPSBuZXcgUmVnRXhwKGAke1dFQlZJRVdfQkFTRX0oXFxcXGQrKWApO1xuY29uc3QgQ0hST01JVU1fV0lOID0gXCJDSFJPTUlVTVwiO1xuY29uc3QgQ1JPU1NXQUxLX1NPQ0tFVF9TVUZGSVggPSBcIl9kZXZ0b29sc19yZW1vdGVcIjtcbmNvbnN0IENST1NTV0FMS19SRUdFWFBfU1RSSU5HID0gYChcXFxcUyopJHtDUk9TU1dBTEtfU09DS0VUX1NVRkZJWH1gO1xuY29uc3QgQ1JPU1NXQUxLX1JFR0VYUCA9IG5ldyBSZWdFeHAoYEAke0NST1NTV0FMS19SRUdFWFBfU1RSSU5HfWApO1xuY29uc3QgQ1JPU1NXQUxLX1BST0NFU1NfUkVHRVhQID0gbmV3IFJlZ0V4cChXRUJWSUVXX0JBU0UgKyBDUk9TU1dBTEtfUkVHRVhQX1NUUklORyk7XG5cblxubGV0IGhlbHBlcnMgPSB7fTtcblxuLy8gVGhpcyBmdW5jdGlvbiBnZXRzIGEgbGlzdCBvZiBhbmRyb2lkIHN5c3RlbSBwcm9jZXNzZXMgYW5kIHJldHVybnMgb25lc1xuLy8gdGhhdCBsb29rIGxpa2Ugd2Vidmlld3MsIHdpdGggdGhlIGFwcHJvcHJpYXRlIHdlYnZpZXcgcHJlZml4IGFuZCB0aGVpciBQSUQuXG4vLyBJZiB3ZSBwYXNzIGluIGEgZGV2aWNlU29ja2V0LCB3ZSBvbmx5IGF0dGVtcHQgdG8gZmluZCB3ZWJ2aWV3cyB3aGljaCBtYXRjaFxuLy8gdGhhdCBzb2NrZXQgbmFtZSAodGhpcyBpcyBmb3IgYXBwcyB3aGljaCBlbWJlZCBDaHJvbWl1bSwgd2hpY2ggaXNuJ3QgdGhlXG4vLyBzYW1lIGFzIGNocm9tZS1iYWNrZWQgd2Vidmlld3MpXG4vLyBUT0RPOiBzb21lIG9mIHRoaXMgZnVuY3Rpb24gYmVsb25ncyBpbiBhcHBpdW0tYWRiXG5hc3luYyBmdW5jdGlvbiB3ZWJ2aWV3c0Zyb21Qcm9jcyAoYWRiLCBkZXZpY2VTb2NrZXQpIHtcbiAgbGV0IHdlYnZpZXdzID0gW107XG4gIGxldCBvdXQgPSBhd2FpdCBhZGIuc2hlbGwoW1wiY2F0XCIsIFwiL3Byb2MvbmV0L3VuaXhcIl0pO1xuICBmb3IgKGxldCBsaW5lIG9mIG91dC5zcGxpdChcIlxcblwiKSkge1xuICAgIGxpbmUgPSBsaW5lLnRyaW0oKTtcblxuICAgIGlmIChkZXZpY2VTb2NrZXQpIHtcbiAgICAgIGlmIChsaW5lLmluZGV4T2YoYEAke2RldmljZVNvY2tldH1gKSA9PT0gbGluZS5sZW5ndGggLSBkZXZpY2VTb2NrZXQubGVuZ3RoIC0gMSkge1xuICAgICAgICBpZiAoZGV2aWNlU29ja2V0ID09PSBcImNocm9tZV9kZXZ0b29sc19yZW1vdGVcIikge1xuICAgICAgICAgIHdlYnZpZXdzLnB1c2goQ0hST01JVU1fV0lOKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCB3ZWJ2aWV3UGlkO1xuICAgIGxldCBjcm9zc3dhbGtXZWJ2aWV3U29ja2V0O1xuICAgIGlmICgod2Vidmlld1BpZCA9IGxpbmUubWF0Y2goV0VCVklFV19SRUdFWFApKSkge1xuICAgICAgLy8gZm9yIG11bHRpcGxlIHdlYnZpZXdzIGEgbGlzdCBvZiAnV0VCVklFV188aW5kZXg+JyB3aWxsIGJlIHJldHVybmVkXG4gICAgICAvLyB3aGVyZSA8aW5kZXg+IGlzIHplcm8gYmFzZWQgKHNhbWUgaXMgaW4gc2VsZW5kcm9pZClcbiAgICAgIHdlYnZpZXdzLnB1c2goYCR7V0VCVklFV19CQVNFfSR7d2Vidmlld1BpZFsxXX1gKTtcbiAgICB9IGVsc2UgaWYgKChjcm9zc3dhbGtXZWJ2aWV3U29ja2V0ID0gbGluZS5tYXRjaChDUk9TU1dBTEtfUkVHRVhQKSkpIHtcbiAgICAgIGlmIChkZXZpY2VTb2NrZXQpIHtcbiAgICAgICAgaWYgKGNyb3Nzd2Fsa1dlYnZpZXdTb2NrZXRbMF0uc2xpY2UoMSkgPT09IGRldmljZVNvY2tldCkge1xuICAgICAgICAgIHdlYnZpZXdzLnB1c2goYCR7V0VCVklFV19CQVNFfSR7Y3Jvc3N3YWxrV2Vidmlld1NvY2tldFsxXX1gKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2Vidmlld3MucHVzaChgJHtXRUJWSUVXX0JBU0V9JHtjcm9zc3dhbGtXZWJ2aWV3U29ja2V0WzFdfSR7Q1JPU1NXQUxLX1NPQ0tFVF9TVUZGSVh9YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBfLnVuaXEod2Vidmlld3MpO1xufVxuXG4vLyBUYWtlIGEgd2VidmlldyBuYW1lIGxpa2UgV0VCVklFV180Mjk2IGFuZCB1c2UgJ2FkYiBzaGVsbCBwcycgdG8gZmlndXJlIG91dFxuLy8gd2hpY2ggYXBwIHBhY2thZ2UgaXMgYXNzb2NpYXRlZCB3aXRoIHRoYXQgd2Vidmlldy4gT25lIG9mIHRoZSByZWFzb25zIHdlXG4vLyB3YW50IHRvIGRvIHRoaXMgaXMgdG8gbWFrZSBzdXJlIHdlJ3JlIGxpc3Rpbmcgd2Vidmlld3MgZm9yIHRoZSBhY3R1YWwgQVVULFxuLy8gbm90IHNvbWUgb3RoZXIgcnVubmluZyBhcHBcbi8vIFRPRE86IHRoaXMgc2hvdWxkIGJlIGNhbGxlZCBwcm9jRnJvbVBpZCBhbmQgZXhpc3QgaW4gYXBwaXVtLWFkYlxuaGVscGVycy5wcm9jRnJvbVdlYnZpZXcgPSBhc3luYyBmdW5jdGlvbiAoYWRiLCB3ZWJ2aWV3KSB7XG4gIGlmICh3ZWJ2aWV3Lm1hdGNoKFdFQlZJRVdfUElEX1JFR0VYUCkgPT09IG51bGwpIHtcbiAgICBsZXQgcHJvY2Vzc05hbWUgPSB3ZWJ2aWV3Lm1hdGNoKENST1NTV0FMS19QUk9DRVNTX1JFR0VYUCk7XG4gICAgaWYgKHByb2Nlc3NOYW1lID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kIHByb2Nlc3MgbmFtZSBmb3Igd2VidmlldyAke3dlYnZpZXd9YCk7XG4gICAgfVxuICAgIHJldHVybiBwcm9jZXNzTmFtZVsxXTtcbiAgfVxuXG4gIC8vIHdlYnZpZXdfZGV2dG9vbHNfcmVtb3RlXzQyOTYgPT4gNDI5NlxuICBsZXQgcGlkID0gd2Vidmlldy5tYXRjaCgvXFxkKyQvKTtcbiAgaWYgKCFwaWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kIFBJRCBmb3Igd2VidmlldyAke3dlYnZpZXd9YCk7XG4gIH1cbiAgcGlkID0gcGlkWzBdO1xuICBsb2dnZXIuZGVidWcoYCR7d2Vidmlld30gbWFwcGVkIHRvIHBpZCAke3BpZH1gKTtcbiAgbG9nZ2VyLmRlYnVnKFwiR2V0dGluZyBwcm9jZXNzIG5hbWUgZm9yIHdlYnZpZXdcIik7XG4gIGxldCBvdXQgPSBhd2FpdCBhZGIuc2hlbGwoXCJwc1wiKTtcbiAgbGV0IHBrZyA9IFwidW5rbm93blwiO1xuICBsZXQgbGluZXMgPSBvdXQuc3BsaXQoL1xccj9cXG4vKTtcblxuICAvKiBPdXRwdXQgb2YgcHMgaXMgbGlrZTpcbiAgIFVTRVIgICAgICAgUElEICBQUElEICBWU0laRSAgUlNTICAgV0NIQU4gICAgUEMgICAgICAgICBOQU1FICBfb3JfXG4gICBVU0VSICAgICAgIFBJRCAgUFBJRCAgVlNaICAgIFJTUyAgIFdDSEFOICAgIEFERFIgICAgIFMgTkFNRVxuICAgdTBfYTEzNiAgIDYyNDggIDE3OSAgIDk0NjAwMCA0ODE0NCBmZmZmZmZmZiA0MDA1OTAzZSBSIGNvbS5leGFtcGxlLnRlc3RcbiAgIHUwX2ExMzYgICA2MjQ5ICAxNzkgICA5NDYwMDAgNDgxNDQgZmZmZmZmZmYgICAgICAgICAgUiBjb20uZXhhbXBsZS50ZXN0XG4gICovXG4gIGNvbnN0IGZ1bGxIZWFkZXIgPSBsaW5lc1swXS50cmltKCk7XG4gIGNvbnN0IGhlYWRlciA9IGZ1bGxIZWFkZXIuc3BsaXQoL1xccysvKTtcbiAgY29uc3QgcGlkQ29sdW1uID0gaGVhZGVyLmluZGV4T2YoJ1BJRCcpO1xuXG4gIGZvciAobGV0IGxpbmUgb2YgbGluZXMpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gbGluZS50cmltKCkuc3BsaXQoL1xccysvKTtcbiAgICBjb25zdCBwaWRFbnRyeSA9IGVudHJpZXNbcGlkQ29sdW1uXTtcbiAgICBpZiAocGlkRW50cnkgPT09IHBpZCkge1xuICAgICAgcGtnID0gXy5sYXN0KGVudHJpZXMpO1xuICAgICAgbG9nZ2VyLmRlYnVnKGBQYXJzZWQgcGlkOiAnJHtwaWRFbnRyeX0nIHBrZzogJyR7cGtnfScgZnJvbWApO1xuICAgICAgbG9nZ2VyLmRlYnVnKGAgICAgJHtmdWxsSGVhZGVyfWApO1xuICAgICAgbG9nZ2VyLmRlYnVnKGAgICAgJHtsaW5lfWApO1xuXG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBsb2dnZXIuZGVidWcoYFJldHVybmluZyBwcm9jZXNzIG5hbWU6ICcke3BrZ30nYCk7XG4gIHJldHVybiBwa2c7XG59O1xuXG4vLyBHZXQgYSBsaXN0IG9mIGF2YWlsYWJsZSB3ZWJ2aWV3cyBieSBpbnRyb3NwZWN0aW5nIHByb2Nlc3NlcyB3aXRoIGFkYiwgd2hlcmVcbi8vIHdlYnZpZXdzIGFyZSBsaXN0ZWQuIEl0J3MgcG9zc2libGUgdG8gcGFzcyBpbiBhICdkZXZpY2VTb2NrZXQnIGFyZywgd2hpY2hcbi8vIGxpbWl0cyB0aGUgd2VidmlldyBwb3NzaWJpbGl0aWVzIHRvIHRoZSBvbmUgcnVubmluZyBvbiB0aGUgQ2hyb21pdW0gZGV2dG9vbHNcbi8vIHNvY2tldCB3ZSdyZSBpbnRlcmVzdGVkIGluIChzZWUgbm90ZSBvbiB3ZWJ2aWV3c0Zyb21Qcm9jcylcbmhlbHBlcnMuZ2V0V2Vidmlld3MgPSBhc3luYyBmdW5jdGlvbiAoYWRiLCBkZXZpY2VTb2NrZXQpIHtcbiAgbG9nZ2VyLmRlYnVnKFwiR2V0dGluZyBhIGxpc3Qgb2YgYXZhaWxhYmxlIHdlYnZpZXdzXCIpO1xuICBsZXQgd2Vidmlld3MgPSBhd2FpdCB3ZWJ2aWV3c0Zyb21Qcm9jcyhhZGIsIGRldmljZVNvY2tldCk7XG5cbiAgaWYgKGRldmljZVNvY2tldCkge1xuICAgIHJldHVybiB3ZWJ2aWV3cztcbiAgfVxuXG4gIHdlYnZpZXdzID0gYXdhaXQgYXN5bmNtYXAod2Vidmlld3MsIGFzeW5jICh3ZWJ2aWV3TmFtZSkgPT4ge1xuICAgIGxldCBwa2cgPSBhd2FpdCBoZWxwZXJzLnByb2NGcm9tV2VidmlldyhhZGIsIHdlYnZpZXdOYW1lKTtcbiAgICByZXR1cm4gV0VCVklFV19CQVNFICsgcGtnO1xuICB9KTtcbiAgbG9nZ2VyLmRlYnVnKGBGb3VuZCB3ZWJ2aWV3czogJHtKU09OLnN0cmluZ2lmeSh3ZWJ2aWV3cyl9YCk7XG4gIHJldHVybiB3ZWJ2aWV3cztcbn07XG5cbmhlbHBlcnMuZGVjb3JhdGVDaHJvbWVPcHRpb25zID0gZnVuY3Rpb24gKGNhcHMsIG9wdHMsIGRldmljZUlkKSB7XG4gIC8vIGFkZCBvcHRpb25zIGZyb20gYXBwaXVtIHNlc3Npb24gY2Fwc1xuICBpZiAob3B0cy5jaHJvbWVPcHRpb25zKSB7XG4gICAgaWYgKG9wdHMuY2hyb21lT3B0aW9ucy5Bcmd1bWVudHMpIHtcbiAgICAgIC8vIG1lcmdlIGBBcmd1bWVudHNgIGFuZCBgYXJnc2BcbiAgICAgIG9wdHMuY2hyb21lT3B0aW9ucy5hcmdzID0gWy4uLihvcHRzLmNocm9tZU9wdGlvbnMuYXJncyB8fCBbXSksIC4uLm9wdHMuY2hyb21lT3B0aW9ucy5Bcmd1bWVudHNdO1xuICAgICAgZGVsZXRlIG9wdHMuY2hyb21lT3B0aW9ucy5Bcmd1bWVudHM7XG4gICAgfVxuICAgIGZvciAobGV0IFtvcHQsIHZhbF0gb2YgXy50b1BhaXJzKG9wdHMuY2hyb21lT3B0aW9ucykpIHtcbiAgICAgIGlmIChfLmlzVW5kZWZpbmVkKGNhcHMuY2hyb21lT3B0aW9uc1tvcHRdKSkge1xuICAgICAgICBjYXBzLmNocm9tZU9wdGlvbnNbb3B0XSA9IHZhbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvZ2dlci53YXJuKGBDYW5ub3QgcGFzcyBvcHRpb24gJHtjYXBzLmNocm9tZU9wdGlvbnNbb3B0XX0gYmVjYXVzZSBgICtcbiAgICAgICAgICAgICAgICAgICAgXCJBcHBpdW0gbmVlZHMgaXQgdG8gbWFrZSBjaHJvbWVEcml2ZXIgd29ya1wiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBhZGQgZGV2aWNlIGlkIGZyb20gYWRiXG4gIGNhcHMuY2hyb21lT3B0aW9ucy5hbmRyb2lkRGV2aWNlU2VyaWFsID0gZGV2aWNlSWQ7XG4gIHJldHVybiBjYXBzO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgaGVscGVycztcbmV4cG9ydCB7IGhlbHBlcnMsIE5BVElWRV9XSU4sIFdFQlZJRVdfV0lOLCBXRUJWSUVXX0JBU0UsIENIUk9NSVVNX1dJTiB9O1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9
