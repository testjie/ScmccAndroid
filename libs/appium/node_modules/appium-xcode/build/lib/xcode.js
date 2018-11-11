'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _appiumSupport = require('appium-support');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _asyncbox = require('asyncbox');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _plist = require('plist');

var _teen_process = require('teen_process');

var env = process.env;

var XCRUN_TIMEOUT = 15000;
var XCODE_SUBDIR = "/Contents/Developer";
var DEFAULT_NUMBER_OF_RETRIES = 3;

var log = _appiumSupport.logger.getLogger('Xcode');

function hasExpectedSubDir(path) {
  return path.substring(path.length - XCODE_SUBDIR.length) === XCODE_SUBDIR;
}

function runXcrunCommand(args) {
  var timeout = arguments.length <= 1 || arguments[1] === undefined ? XCRUN_TIMEOUT : arguments[1];
  return _regeneratorRuntime.async(function runXcrunCommand$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)('xcrun', args, { timeout: timeout }));

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 6:
        context$1$0.prev = 6;
        context$1$0.t0 = context$1$0['catch'](0);

        // the true error can be hidden within the stderr
        if (context$1$0.t0.stderr) {
          context$1$0.t0.message = context$1$0.t0.message + ': ' + context$1$0.t0.stderr;
        }

        throw context$1$0.t0;

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 6]]);
}

function getPathFromSymlink(failMessage) {
  var symlinkPath, legacySymlinkPath, xcodePath, customPath, mesg, msg;
  return _regeneratorRuntime.async(function getPathFromSymlink$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        // Node's invocation of xcode-select sometimes flakes and returns an empty string.
        // Not clear why. As a workaround, Appium can reliably deduce the version in use by checking
        // the locations xcode-select uses to store the selected version's path. This should be 100%
        // reliable so long as the link locations remain the same. However, since we're relying on
        // hardcoded paths, this approach will break the next time Apple changes the symlink location.
        log.warn('Finding XcodePath by symlink because ' + failMessage);

        symlinkPath = "/var/db/xcode_select_link";
        legacySymlinkPath = "/usr/share/xcode-select/xcode_dir_link";
        xcodePath = null;

        if (!_appiumSupport.util.hasContent(env.DEVELOPER_DIR)) {
          context$1$0.next = 17;
          break;
        }

        customPath = hasExpectedSubDir(env.DEVELOPER_DIR) ? env.DEVELOPER_DIR : env.DEVELOPER_DIR + XCODE_SUBDIR;
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(customPath));

      case 8:
        if (!context$1$0.sent) {
          context$1$0.next = 12;
          break;
        }

        xcodePath = customPath;
        context$1$0.next = 15;
        break;

      case 12:
        mesg = 'Could not find path to Xcode, environment variable ' + ('DEVELOPER_DIR set to: ' + env.DEVELOPER_DIR + ' ') + 'but no Xcode found';

        log.warn(mesg);
        throw new Error(mesg);

      case 15:
        context$1$0.next = 31;
        break;

      case 17:
        context$1$0.next = 19;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(symlinkPath));

      case 19:
        if (!context$1$0.sent) {
          context$1$0.next = 25;
          break;
        }

        context$1$0.next = 22;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.readlink(symlinkPath));

      case 22:
        xcodePath = context$1$0.sent;
        context$1$0.next = 31;
        break;

      case 25:
        context$1$0.next = 27;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(legacySymlinkPath));

      case 27:
        if (!context$1$0.sent) {
          context$1$0.next = 31;
          break;
        }

        context$1$0.next = 30;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.readlink(legacySymlinkPath));

      case 30:
        xcodePath = context$1$0.sent;

      case 31:
        if (!xcodePath) {
          context$1$0.next = 33;
          break;
        }

        return context$1$0.abrupt('return', xcodePath.replace(new RegExp("/$"), "").trim());

      case 33:
        msg = 'Could not find path to Xcode by symlinks located in ' + symlinkPath + ', or ' + legacySymlinkPath;

        log.warn(msg);
        throw new Error(msg);

      case 36:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function getPathFromXcodeSelect() {
  var timeout = arguments.length <= 0 || arguments[0] === undefined ? XCRUN_TIMEOUT : arguments[0];

  var _ref, stdout, xcodeFolderPath, msg;

  return _regeneratorRuntime.async(function getPathFromXcodeSelect$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)('xcode-select', ['--print-path'], { timeout: timeout }));

      case 2:
        _ref = context$1$0.sent;
        stdout = _ref.stdout;
        xcodeFolderPath = stdout.replace(/\/$/, '').trim();

        if (!_appiumSupport.util.hasContent(xcodeFolderPath)) {
          log.errorAndThrow('xcode-select returned an empty string');
        }

        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(xcodeFolderPath));

      case 8:
        if (!context$1$0.sent) {
          context$1$0.next = 12;
          break;
        }

        return context$1$0.abrupt('return', xcodeFolderPath);

      case 12:
        msg = 'xcode-select could not find xcode. Path \'' + xcodeFolderPath + '\' does not exist.';

        log.errorAndThrow(msg);

      case 14:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

var getPath = _lodash2['default'].memoize(function () {
  var timeout = arguments.length <= 0 || arguments[0] === undefined ? XCRUN_TIMEOUT : arguments[0];

  // first we try using xcode-select to find the path
  // then we try using the symlinks that Apple has by default
  return getPathFromXcodeSelect(timeout)['catch'](getPathFromSymlink);
});

function getVersionWithoutRetry() {
  var timeout = arguments.length <= 0 || arguments[0] === undefined ? XCRUN_TIMEOUT : arguments[0];
  var xcodePath, plistPath, version, versionPattern, match;
  return _regeneratorRuntime.async(function getVersionWithoutRetry$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(getPath(timeout));

      case 2:
        xcodePath = context$1$0.sent;
        plistPath = _path2['default'].resolve(xcodePath, "..", "Info.plist");
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(plistPath));

      case 6:
        if (context$1$0.sent) {
          context$1$0.next = 8;
          break;
        }

        throw new Error('Could not get Xcode version. ' + plistPath + ' does not exist on disk.');

      case 8:
        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(_appiumSupport.plist.parsePlistFile(plistPath));

      case 10:
        version = context$1$0.sent;

        version = version.CFBundleShortVersionString;

        versionPattern = /\d\.\d\.*\d*/;
        match = version.match(versionPattern);

        if (match === null || !_appiumSupport.util.hasContent(match[0])) {
          log.errorAndThrow('Could not parse Xcode version. xcodebuild output was: ' + version);
        }

        return context$1$0.abrupt('return', match[0]);

      case 16:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

var getVersionMemoized = _lodash2['default'].memoize(function () {
  var retries = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT_NUMBER_OF_RETRIES : arguments[0];
  var timeout = arguments.length <= 1 || arguments[1] === undefined ? XCRUN_TIMEOUT : arguments[1];

  return (0, _asyncbox.retry)(retries, getVersionWithoutRetry, timeout);
});

function getVersion() {
  var parse = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
  var retries = arguments.length <= 1 || arguments[1] === undefined ? DEFAULT_NUMBER_OF_RETRIES : arguments[1];
  var timeout = arguments.length <= 2 || arguments[2] === undefined ? XCRUN_TIMEOUT : arguments[2];
  var version, match;
  return _regeneratorRuntime.async(function getVersion$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(getVersionMemoized(retries, timeout));

      case 2:
        version = context$1$0.sent;

        if (parse) {
          context$1$0.next = 5;
          break;
        }

        return context$1$0.abrupt('return', version);

      case 5:
        match = /^(\d+)\.(\d+)(\.(\d+))?$/.exec(version);
        return context$1$0.abrupt('return', {
          versionString: version,
          versionFloat: parseFloat(match[1] + '.' + match[2]),
          major: parseInt(match[1], 10),
          minor: parseInt(match[2], 10),
          patch: match[4] ? parseInt(match[4], 10) : undefined
        });

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function getCommandLineToolsVersion() {
  var getVersionFunctions, stdout, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _getVersion, match;

  return _regeneratorRuntime.async(function getCommandLineToolsVersion$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        getVersionFunctions = [function callee$1$0() {
          var pkg;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap((0, _teen_process.exec)('pkgutil', ['--pkgs=com.apple.pkg.DevSDK_.*']));

              case 2:
                pkg = context$2$0.sent.stdout;
                context$2$0.next = 5;
                return _regeneratorRuntime.awrap((0, _teen_process.exec)('pkgutil', ['--pkg-info=' + pkg.trim()]));

              case 5:
                return context$2$0.abrupt('return', context$2$0.sent.stdout);

              case 6:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        }, function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap((0, _teen_process.exec)('pkgutil', ['--pkg-info=com.apple.pkg.CLTools_Executables']));

              case 2:
                return context$2$0.abrupt('return', context$2$0.sent.stdout);

              case 3:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        }, function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap((0, _teen_process.exec)('pkgutil', ['--pkg-info=com.apple.pkg.DeveloperToolsCLI']));

              case 2:
                return context$2$0.abrupt('return', context$2$0.sent.stdout);

              case 3:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        }];
        stdout = undefined;
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 5;
        _iterator = _getIterator(getVersionFunctions);

      case 7:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 22;
          break;
        }

        _getVersion = _step.value;
        context$1$0.prev = 9;
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(_getVersion());

      case 12:
        stdout = context$1$0.sent;
        return context$1$0.abrupt('break', 22);

      case 16:
        context$1$0.prev = 16;
        context$1$0.t0 = context$1$0['catch'](9);

        stdout = '';

      case 19:
        _iteratorNormalCompletion = true;
        context$1$0.next = 7;
        break;

      case 22:
        context$1$0.next = 28;
        break;

      case 24:
        context$1$0.prev = 24;
        context$1$0.t1 = context$1$0['catch'](5);
        _didIteratorError = true;
        _iteratorError = context$1$0.t1;

      case 28:
        context$1$0.prev = 28;
        context$1$0.prev = 29;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 31:
        context$1$0.prev = 31;

        if (!_didIteratorError) {
          context$1$0.next = 34;
          break;
        }

        throw _iteratorError;

      case 34:
        return context$1$0.finish(31);

      case 35:
        return context$1$0.finish(28);

      case 36:
        match = /^version: (.+)$/m.exec(stdout);
        return context$1$0.abrupt('return', match ? match[1] : undefined);

      case 38:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[5, 24, 28, 36], [9, 16], [29,, 31, 35]]);
}

function getAutomationTraceTemplatePathWithoutRetry() {
  var timeout = arguments.length <= 0 || arguments[0] === undefined ? XCRUN_TIMEOUT : arguments[0];
  var xcodePath, extensions, pathPrefix, pathSuffix, automationTraceTemplatePaths, msg;
  return _regeneratorRuntime.async(function getAutomationTraceTemplatePathWithoutRetry$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(getPath(timeout));

      case 2:
        xcodePath = context$1$0.sent;
        extensions = ['xrplugin', 'bundle'];
        pathPrefix = _path2['default'].resolve(xcodePath, "../Applications/Instruments.app/Contents/PlugIns");
        pathSuffix = "Contents/Resources/Automation.tracetemplate";
        automationTraceTemplatePaths = [_path2['default'].resolve(pathPrefix, 'AutomationInstrument.' + extensions[0], pathSuffix), _path2['default'].resolve(pathPrefix, 'AutomationInstrument.' + extensions[1], pathSuffix)];
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(automationTraceTemplatePaths[0]));

      case 9:
        if (!context$1$0.sent) {
          context$1$0.next = 11;
          break;
        }

        return context$1$0.abrupt('return', automationTraceTemplatePaths[0]);

      case 11:
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(automationTraceTemplatePaths[1]));

      case 13:
        if (!context$1$0.sent) {
          context$1$0.next = 15;
          break;
        }

        return context$1$0.abrupt('return', automationTraceTemplatePaths[1]);

      case 15:
        msg = "Could not find Automation.tracetemplate in any of the following" + ('locations ' + automationTraceTemplatePaths.toString());

        log.error(msg);
        throw new Error(msg);

      case 18:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

var getAutomationTraceTemplatePath = _lodash2['default'].memoize(function () {
  var retries = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT_NUMBER_OF_RETRIES : arguments[0];
  var timeout = arguments.length <= 1 || arguments[1] === undefined ? XCRUN_TIMEOUT : arguments[1];

  return (0, _asyncbox.retry)(retries, getAutomationTraceTemplatePathWithoutRetry, timeout);
});

function getMaxIOSSDKWithoutRetry() {
  var timeout = arguments.length <= 0 || arguments[0] === undefined ? XCRUN_TIMEOUT : arguments[0];

  var version, args, _ref2, stdout, sdkVersion, match;

  return _regeneratorRuntime.async(function getMaxIOSSDKWithoutRetry$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(getVersion(false, DEFAULT_NUMBER_OF_RETRIES, timeout));

      case 2:
        version = context$1$0.sent;

        if (!(version[0] === '4')) {
          context$1$0.next = 5;
          break;
        }

        return context$1$0.abrupt('return', '6.1');

      case 5:
        args = ['--sdk', 'iphonesimulator', '--show-sdk-version'];
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(runXcrunCommand(args, timeout));

      case 8:
        _ref2 = context$1$0.sent;
        stdout = _ref2.stdout;
        sdkVersion = stdout.trim();
        match = /\d.\d/.exec(stdout);

        if (match) {
          context$1$0.next = 14;
          break;
        }

        throw new Error('xcrun returned a non-numeric iOS SDK version: \'' + sdkVersion + '\'');

      case 14:
        return context$1$0.abrupt('return', sdkVersion);

      case 15:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

var getMaxIOSSDK = _lodash2['default'].memoize(function () {
  var retries = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT_NUMBER_OF_RETRIES : arguments[0];
  var timeout = arguments.length <= 1 || arguments[1] === undefined ? XCRUN_TIMEOUT : arguments[1];

  return (0, _asyncbox.retry)(retries, getMaxIOSSDKWithoutRetry, timeout);
});

function getMaxTVOSSDKWithoutRetry() {
  var timeout = arguments.length <= 0 || arguments[0] === undefined ? XCRUN_TIMEOUT : arguments[0];

  var args, _ref3, stdout, sdkVersion;

  return _regeneratorRuntime.async(function getMaxTVOSSDKWithoutRetry$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        args = ['--sdk', 'appletvsimulator', '--show-sdk-version'];
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(runXcrunCommand(args, timeout));

      case 3:
        _ref3 = context$1$0.sent;
        stdout = _ref3.stdout;
        sdkVersion = stdout.trim();

        if (!isNaN(parseFloat(sdkVersion))) {
          context$1$0.next = 8;
          break;
        }

        throw new Error('xcrun returned a non-numeric tvOS SDK version: \'' + sdkVersion + '\'');

      case 8:
        return context$1$0.abrupt('return', sdkVersion);

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

var getMaxTVOSSDK = _lodash2['default'].memoize(function () {
  var retries = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT_NUMBER_OF_RETRIES : arguments[0];
  var timeout = arguments.length <= 1 || arguments[1] === undefined ? XCRUN_TIMEOUT : arguments[1];

  return (0, _asyncbox.retry)(retries, getMaxTVOSSDKWithoutRetry, timeout);
});

function getConnectedDevices() {
  var timeout = arguments.length <= 0 || arguments[0] === undefined ? XCRUN_TIMEOUT : arguments[0];

  var cmd, args, _ref4, stdout, plistContent, devicesFound, entriesToSearch, currentEntry, deviceInfo;

  return _regeneratorRuntime.async(function getConnectedDevices$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        cmd = '/usr/sbin/system_profiler';
        args = ['-xml', 'SPUSBDataType'];
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(cmd, args, { timeout: timeout }));

      case 4:
        _ref4 = context$1$0.sent;
        stdout = _ref4.stdout;
        plistContent = (0, _plist.parse)(stdout);
        devicesFound = [];
        entriesToSearch = [plistContent[0]];

        while (entriesToSearch.length > 0) {
          currentEntry = entriesToSearch.pop();

          if (currentEntry instanceof Array) {
            entriesToSearch = entriesToSearch.concat(currentEntry);
          } else if (currentEntry._name && currentEntry._name.substring(0, 4) === "iPad" || currentEntry._name && currentEntry._name.substring(0, 6) === "iPhone" || currentEntry._name && _lodash2['default'].includes(currentEntry._name, "Apple TV")) {
            deviceInfo = {
              name: currentEntry._name,
              udid: currentEntry.serial_num,
              productId: currentEntry.product_id,
              deviceVersion: currentEntry.bcd_device
            };

            devicesFound.push(deviceInfo);
          } else if (currentEntry._items) {
            entriesToSearch = entriesToSearch.concat(currentEntry._items);
          }
        }
        return context$1$0.abrupt('return', devicesFound);

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function getInstrumentsPathWithoutRetry() {
  var timeout = arguments.length <= 0 || arguments[0] === undefined ? XCRUN_TIMEOUT : arguments[0];

  var args, _ref5, stdout, instrumentsPath;

  return _regeneratorRuntime.async(function getInstrumentsPathWithoutRetry$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        args = ['-find', 'instruments'];
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(runXcrunCommand(args, timeout));

      case 3:
        _ref5 = context$1$0.sent;
        stdout = _ref5.stdout;

        if (!stdout) {
          stdout = "";
        }

        instrumentsPath = stdout.trim();

        if (instrumentsPath) {
          context$1$0.next = 9;
          break;
        }

        throw new Error('Could not find path to instruments binary using \'xcrun ' + args.join(' ') + '\'');

      case 9:
        return context$1$0.abrupt('return', instrumentsPath);

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

var getInstrumentsPath = _lodash2['default'].memoize(function () {
  var retries = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT_NUMBER_OF_RETRIES : arguments[0];
  var timeout = arguments.length <= 1 || arguments[1] === undefined ? XCRUN_TIMEOUT : arguments[1];

  return (0, _asyncbox.retry)(retries, getInstrumentsPathWithoutRetry, timeout);
});

function clearInternalCache() {

  // memoized functions
  var memoized = [getPath, getVersionMemoized, getAutomationTraceTemplatePath, getMaxIOSSDK, getMaxTVOSSDK, getInstrumentsPath];

  memoized.forEach(function (f) {
    if (f.cache) {
      f.cache = new _lodash2['default'].memoize.Cache();
    }
  });
}

exports['default'] = { getPath: getPath, getVersion: getVersion, getAutomationTraceTemplatePath: getAutomationTraceTemplatePath, getMaxIOSSDK: getMaxIOSSDK,
  getAutomationTraceTemplatePathWithoutRetry: getAutomationTraceTemplatePathWithoutRetry, getMaxIOSSDKWithoutRetry: getMaxIOSSDKWithoutRetry,
  getConnectedDevices: getConnectedDevices, clearInternalCache: clearInternalCache, getInstrumentsPath: getInstrumentsPath,
  getCommandLineToolsVersion: getCommandLineToolsVersion, getMaxTVOSSDK: getMaxTVOSSDK, getMaxTVOSSDKWithoutRetry: getMaxTVOSSDKWithoutRetry };
module.exports = exports['default'];
//  Xcode < 5.x

// xcode-select allows users to override its settings with the DEVELOPER_DIR env var,
// so check that first

// We should only get here is we failed to capture xcode-select's stdout and our
// other checks failed. Either Apple has moved the symlink to a new location or the user
// is not using the default install. 99.999% chance it's the latter, so issue a warning
// should we ever hit the edge case.

// trim and remove trailing slash

// we want to read the CFBundleShortVersionString from Xcode's plist.
// It should be in /[root]/XCode.app/Contents/

// need to use string#match here; previous code used regexp#exec, which does not return null

// match should be an array, either of
//     [ '7.0', '7', '0', undefined, undefined, index: 0, input: '7.0' ]
//     [ '7.0.1', '7', '0', '.1', '1', index: 0, input: '7.0.1' ]

// there are a number of different ways that the CLI tools version has been
// represented. Try them from most reliable to least, falling down the chain

// stdout should have a line like `version: 8.0.0.0.1.1472435881`
// https://regex101.com/r/HV3x4d/1

// for ios 8 and up, the file extension for AutiomationInstrument changed.
// rather than waste time getting the iOSSDKVersion, just get both paths and see which one exists
//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFFLGtCQUFrQixDQUFDLENBQUM7O0FBRW5FLFVBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDLEVBQUs7QUFDdEIsUUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFO0FBQ1gsT0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLG9CQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUNqQztHQUNGLENBQUMsQ0FBQztDQUNKOztxQkFFYyxFQUFFLE9BQU8sRUFBUCxPQUFPLEVBQUUsVUFBVSxFQUFWLFVBQVUsRUFBRSw4QkFBOEIsRUFBOUIsOEJBQThCLEVBQUUsWUFBWSxFQUFaLFlBQVk7QUFDekUsNENBQTBDLEVBQTFDLDBDQUEwQyxFQUFFLHdCQUF3QixFQUF4Qix3QkFBd0I7QUFDcEUscUJBQW1CLEVBQW5CLG1CQUFtQixFQUFFLGtCQUFrQixFQUFsQixrQkFBa0IsRUFBRSxrQkFBa0IsRUFBbEIsa0JBQWtCO0FBQzNELDRCQUEwQixFQUExQiwwQkFBMEIsRUFBRSxhQUFhLEVBQWIsYUFBYSxFQUFFLHlCQUF5QixFQUF6Qix5QkFBeUIsRUFBRSIsImZpbGUiOiJsaWIveGNvZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1dGlsLCBmcywgcGxpc3QsIGxvZ2dlciB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgcmV0cnkgfSBmcm9tICdhc3luY2JveCc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgcGFyc2UgYXMgcGFyc2VQbGlzdERhdGEgfSBmcm9tICdwbGlzdCc7XG5pbXBvcnQgeyBleGVjIH0gZnJvbSAndGVlbl9wcm9jZXNzJztcblxuXG5jb25zdCBlbnYgPSBwcm9jZXNzLmVudjtcblxuY29uc3QgWENSVU5fVElNRU9VVCA9IDE1MDAwO1xuY29uc3QgWENPREVfU1VCRElSID0gXCIvQ29udGVudHMvRGV2ZWxvcGVyXCI7XG5jb25zdCBERUZBVUxUX05VTUJFUl9PRl9SRVRSSUVTID0gMztcblxuY29uc3QgbG9nID0gbG9nZ2VyLmdldExvZ2dlcignWGNvZGUnKTtcblxuXG5mdW5jdGlvbiBoYXNFeHBlY3RlZFN1YkRpciAocGF0aCkge1xuICByZXR1cm4gcGF0aC5zdWJzdHJpbmcocGF0aC5sZW5ndGggLSBYQ09ERV9TVUJESVIubGVuZ3RoKSA9PT0gWENPREVfU1VCRElSO1xufVxuXG5hc3luYyBmdW5jdGlvbiBydW5YY3J1bkNvbW1hbmQgKGFyZ3MsIHRpbWVvdXQgPSBYQ1JVTl9USU1FT1VUKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGF3YWl0IGV4ZWMoJ3hjcnVuJywgYXJncywge3RpbWVvdXR9KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgLy8gdGhlIHRydWUgZXJyb3IgY2FuIGJlIGhpZGRlbiB3aXRoaW4gdGhlIHN0ZGVyclxuICAgIGlmIChlcnIuc3RkZXJyKSB7XG4gICAgICBlcnIubWVzc2FnZSA9IGAke2Vyci5tZXNzYWdlfTogJHtlcnIuc3RkZXJyfWA7XG4gICAgfVxuXG4gICAgdGhyb3cgZXJyO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFBhdGhGcm9tU3ltbGluayAoZmFpbE1lc3NhZ2UpIHtcbiAgLy8gTm9kZSdzIGludm9jYXRpb24gb2YgeGNvZGUtc2VsZWN0IHNvbWV0aW1lcyBmbGFrZXMgYW5kIHJldHVybnMgYW4gZW1wdHkgc3RyaW5nLlxuICAvLyBOb3QgY2xlYXIgd2h5LiBBcyBhIHdvcmthcm91bmQsIEFwcGl1bSBjYW4gcmVsaWFibHkgZGVkdWNlIHRoZSB2ZXJzaW9uIGluIHVzZSBieSBjaGVja2luZ1xuICAvLyB0aGUgbG9jYXRpb25zIHhjb2RlLXNlbGVjdCB1c2VzIHRvIHN0b3JlIHRoZSBzZWxlY3RlZCB2ZXJzaW9uJ3MgcGF0aC4gVGhpcyBzaG91bGQgYmUgMTAwJVxuICAvLyByZWxpYWJsZSBzbyBsb25nIGFzIHRoZSBsaW5rIGxvY2F0aW9ucyByZW1haW4gdGhlIHNhbWUuIEhvd2V2ZXIsIHNpbmNlIHdlJ3JlIHJlbHlpbmcgb25cbiAgLy8gaGFyZGNvZGVkIHBhdGhzLCB0aGlzIGFwcHJvYWNoIHdpbGwgYnJlYWsgdGhlIG5leHQgdGltZSBBcHBsZSBjaGFuZ2VzIHRoZSBzeW1saW5rIGxvY2F0aW9uLlxuICBsb2cud2FybihgRmluZGluZyBYY29kZVBhdGggYnkgc3ltbGluayBiZWNhdXNlICR7ZmFpbE1lc3NhZ2V9YCk7XG5cbiAgY29uc3Qgc3ltbGlua1BhdGggPSBcIi92YXIvZGIveGNvZGVfc2VsZWN0X2xpbmtcIjtcbiAgY29uc3QgbGVnYWN5U3ltbGlua1BhdGggPSBcIi91c3Ivc2hhcmUveGNvZGUtc2VsZWN0L3hjb2RlX2Rpcl9saW5rXCI7IC8vICBYY29kZSA8IDUueFxuICBsZXQgeGNvZGVQYXRoID0gbnVsbDtcblxuICAvLyB4Y29kZS1zZWxlY3QgYWxsb3dzIHVzZXJzIHRvIG92ZXJyaWRlIGl0cyBzZXR0aW5ncyB3aXRoIHRoZSBERVZFTE9QRVJfRElSIGVudiB2YXIsXG4gIC8vIHNvIGNoZWNrIHRoYXQgZmlyc3RcbiAgaWYgKHV0aWwuaGFzQ29udGVudChlbnYuREVWRUxPUEVSX0RJUikpIHtcbiAgICBjb25zdCBjdXN0b21QYXRoID0gaGFzRXhwZWN0ZWRTdWJEaXIoZW52LkRFVkVMT1BFUl9ESVIpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW52LkRFVkVMT1BFUl9ESVIgIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW52LkRFVkVMT1BFUl9ESVIgKyBYQ09ERV9TVUJESVI7XG5cbiAgICBpZiAoYXdhaXQgZnMuZXhpc3RzKGN1c3RvbVBhdGgpKSB7XG4gICAgICB4Y29kZVBhdGggPSBjdXN0b21QYXRoO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgbWVzZyA9IGBDb3VsZCBub3QgZmluZCBwYXRoIHRvIFhjb2RlLCBlbnZpcm9ubWVudCB2YXJpYWJsZSBgICtcbiAgICAgICAgICAgICAgICAgYERFVkVMT1BFUl9ESVIgc2V0IHRvOiAke2Vudi5ERVZFTE9QRVJfRElSfSBgICtcbiAgICAgICAgICAgICAgICAgYGJ1dCBubyBYY29kZSBmb3VuZGA7XG4gICAgICBsb2cud2FybihtZXNnKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNnKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoYXdhaXQgZnMuZXhpc3RzKHN5bWxpbmtQYXRoKSkge1xuICAgIHhjb2RlUGF0aCA9IGF3YWl0IGZzLnJlYWRsaW5rKHN5bWxpbmtQYXRoKTtcbiAgfSBlbHNlIGlmIChhd2FpdCBmcy5leGlzdHMobGVnYWN5U3ltbGlua1BhdGgpKSB7XG4gICAgeGNvZGVQYXRoID0gYXdhaXQgZnMucmVhZGxpbmsobGVnYWN5U3ltbGlua1BhdGgpO1xuICB9XG5cbiAgaWYgKHhjb2RlUGF0aCkge1xuICAgIHJldHVybiB4Y29kZVBhdGgucmVwbGFjZShuZXcgUmVnRXhwKFwiLyRcIiksIFwiXCIpLnRyaW0oKTtcbiAgfVxuXG4gIC8vIFdlIHNob3VsZCBvbmx5IGdldCBoZXJlIGlzIHdlIGZhaWxlZCB0byBjYXB0dXJlIHhjb2RlLXNlbGVjdCdzIHN0ZG91dCBhbmQgb3VyXG4gIC8vIG90aGVyIGNoZWNrcyBmYWlsZWQuIEVpdGhlciBBcHBsZSBoYXMgbW92ZWQgdGhlIHN5bWxpbmsgdG8gYSBuZXcgbG9jYXRpb24gb3IgdGhlIHVzZXJcbiAgLy8gaXMgbm90IHVzaW5nIHRoZSBkZWZhdWx0IGluc3RhbGwuIDk5Ljk5OSUgY2hhbmNlIGl0J3MgdGhlIGxhdHRlciwgc28gaXNzdWUgYSB3YXJuaW5nXG4gIC8vIHNob3VsZCB3ZSBldmVyIGhpdCB0aGUgZWRnZSBjYXNlLlxuICBsZXQgbXNnID0gYENvdWxkIG5vdCBmaW5kIHBhdGggdG8gWGNvZGUgYnkgc3ltbGlua3MgbG9jYXRlZCBpbiAke3N5bWxpbmtQYXRofSwgb3IgJHtsZWdhY3lTeW1saW5rUGF0aH1gO1xuICBsb2cud2Fybihtc2cpO1xuICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0UGF0aEZyb21YY29kZVNlbGVjdCAodGltZW91dCA9IFhDUlVOX1RJTUVPVVQpIHtcbiAgbGV0IHtzdGRvdXR9ID0gYXdhaXQgZXhlYygneGNvZGUtc2VsZWN0JywgWyctLXByaW50LXBhdGgnXSwge3RpbWVvdXR9KTtcblxuICAvLyB0cmltIGFuZCByZW1vdmUgdHJhaWxpbmcgc2xhc2hcbiAgY29uc3QgeGNvZGVGb2xkZXJQYXRoID0gc3Rkb3V0LnJlcGxhY2UoL1xcLyQvLCAnJykudHJpbSgpO1xuXG4gIGlmICghdXRpbC5oYXNDb250ZW50KHhjb2RlRm9sZGVyUGF0aCkpIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdygneGNvZGUtc2VsZWN0IHJldHVybmVkIGFuIGVtcHR5IHN0cmluZycpO1xuICB9XG5cbiAgaWYgKGF3YWl0IGZzLmV4aXN0cyh4Y29kZUZvbGRlclBhdGgpKSB7XG4gICAgcmV0dXJuIHhjb2RlRm9sZGVyUGF0aDtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBtc2cgPSBgeGNvZGUtc2VsZWN0IGNvdWxkIG5vdCBmaW5kIHhjb2RlLiBQYXRoICcke3hjb2RlRm9sZGVyUGF0aH0nIGRvZXMgbm90IGV4aXN0LmA7XG4gICAgbG9nLmVycm9yQW5kVGhyb3cobXNnKTtcbiAgfVxufVxuXG5jb25zdCBnZXRQYXRoID0gXy5tZW1vaXplKGZ1bmN0aW9uICh0aW1lb3V0ID0gWENSVU5fVElNRU9VVCkge1xuICAvLyBmaXJzdCB3ZSB0cnkgdXNpbmcgeGNvZGUtc2VsZWN0IHRvIGZpbmQgdGhlIHBhdGhcbiAgLy8gdGhlbiB3ZSB0cnkgdXNpbmcgdGhlIHN5bWxpbmtzIHRoYXQgQXBwbGUgaGFzIGJ5IGRlZmF1bHRcbiAgcmV0dXJuIGdldFBhdGhGcm9tWGNvZGVTZWxlY3QodGltZW91dCkuY2F0Y2goZ2V0UGF0aEZyb21TeW1saW5rKTtcbn0pO1xuXG5cblxuYXN5bmMgZnVuY3Rpb24gZ2V0VmVyc2lvbldpdGhvdXRSZXRyeSAodGltZW91dCA9IFhDUlVOX1RJTUVPVVQpIHtcbiAgbGV0IHhjb2RlUGF0aCA9IGF3YWl0IGdldFBhdGgodGltZW91dCk7XG5cbiAgLy8gd2Ugd2FudCB0byByZWFkIHRoZSBDRkJ1bmRsZVNob3J0VmVyc2lvblN0cmluZyBmcm9tIFhjb2RlJ3MgcGxpc3QuXG4gIC8vIEl0IHNob3VsZCBiZSBpbiAvW3Jvb3RdL1hDb2RlLmFwcC9Db250ZW50cy9cbiAgY29uc3QgcGxpc3RQYXRoID0gcGF0aC5yZXNvbHZlKHhjb2RlUGF0aCwgXCIuLlwiLCBcIkluZm8ucGxpc3RcIik7XG5cbiAgaWYgKCFhd2FpdCBmcy5leGlzdHMocGxpc3RQYXRoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGdldCBYY29kZSB2ZXJzaW9uLiAke3BsaXN0UGF0aH0gZG9lcyBub3QgZXhpc3Qgb24gZGlzay5gKTtcbiAgfVxuXG4gIGxldCB2ZXJzaW9uID0gYXdhaXQgcGxpc3QucGFyc2VQbGlzdEZpbGUocGxpc3RQYXRoKTtcbiAgdmVyc2lvbiA9IHZlcnNpb24uQ0ZCdW5kbGVTaG9ydFZlcnNpb25TdHJpbmc7XG5cbiAgbGV0IHZlcnNpb25QYXR0ZXJuID0gL1xcZFxcLlxcZFxcLipcXGQqLztcbiAgLy8gbmVlZCB0byB1c2Ugc3RyaW5nI21hdGNoIGhlcmU7IHByZXZpb3VzIGNvZGUgdXNlZCByZWdleHAjZXhlYywgd2hpY2ggZG9lcyBub3QgcmV0dXJuIG51bGxcbiAgbGV0IG1hdGNoID0gdmVyc2lvbi5tYXRjaCh2ZXJzaW9uUGF0dGVybik7XG4gIGlmIChtYXRjaCA9PT0gbnVsbCB8fCAhdXRpbC5oYXNDb250ZW50KG1hdGNoWzBdKSkge1xuICAgIGxvZy5lcnJvckFuZFRocm93KGBDb3VsZCBub3QgcGFyc2UgWGNvZGUgdmVyc2lvbi4geGNvZGVidWlsZCBvdXRwdXQgd2FzOiAke3ZlcnNpb259YCk7XG4gIH1cblxuICByZXR1cm4gbWF0Y2hbMF07XG59XG5cbmNvbnN0IGdldFZlcnNpb25NZW1vaXplZCA9IF8ubWVtb2l6ZShcbiAgZnVuY3Rpb24gKHJldHJpZXMgPSBERUZBVUxUX05VTUJFUl9PRl9SRVRSSUVTLCB0aW1lb3V0ID0gWENSVU5fVElNRU9VVCkge1xuICAgIHJldHVybiByZXRyeShyZXRyaWVzLCBnZXRWZXJzaW9uV2l0aG91dFJldHJ5LCB0aW1lb3V0KTtcbiAgfVxuKTtcblxuYXN5bmMgZnVuY3Rpb24gZ2V0VmVyc2lvbiAocGFyc2UgPSBmYWxzZSwgcmV0cmllcyA9IERFRkFVTFRfTlVNQkVSX09GX1JFVFJJRVMsIHRpbWVvdXQgPSBYQ1JVTl9USU1FT1VUKSB7XG4gIGxldCB2ZXJzaW9uID0gYXdhaXQgZ2V0VmVyc2lvbk1lbW9pemVkKHJldHJpZXMsIHRpbWVvdXQpO1xuICBpZiAoIXBhcnNlKSB7XG4gICAgcmV0dXJuIHZlcnNpb247XG4gIH1cbiAgbGV0IG1hdGNoID0gL14oXFxkKylcXC4oXFxkKykoXFwuKFxcZCspKT8kLy5leGVjKHZlcnNpb24pO1xuICAvLyBtYXRjaCBzaG91bGQgYmUgYW4gYXJyYXksIGVpdGhlciBvZlxuICAvLyAgICAgWyAnNy4wJywgJzcnLCAnMCcsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBpbmRleDogMCwgaW5wdXQ6ICc3LjAnIF1cbiAgLy8gICAgIFsgJzcuMC4xJywgJzcnLCAnMCcsICcuMScsICcxJywgaW5kZXg6IDAsIGlucHV0OiAnNy4wLjEnIF1cbiAgcmV0dXJuIHtcbiAgICB2ZXJzaW9uU3RyaW5nOiB2ZXJzaW9uLFxuICAgIHZlcnNpb25GbG9hdDogcGFyc2VGbG9hdChgJHttYXRjaFsxXX0uJHttYXRjaFsyXX1gKSxcbiAgICBtYWpvcjogcGFyc2VJbnQobWF0Y2hbMV0sIDEwKSxcbiAgICBtaW5vcjogcGFyc2VJbnQobWF0Y2hbMl0sIDEwKSxcbiAgICBwYXRjaDogbWF0Y2hbNF0gPyBwYXJzZUludChtYXRjaFs0XSwgMTApIDogdW5kZWZpbmVkXG4gIH07XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldENvbW1hbmRMaW5lVG9vbHNWZXJzaW9uICgpIHtcbiAgLy8gdGhlcmUgYXJlIGEgbnVtYmVyIG9mIGRpZmZlcmVudCB3YXlzIHRoYXQgdGhlIENMSSB0b29scyB2ZXJzaW9uIGhhcyBiZWVuXG4gIC8vIHJlcHJlc2VudGVkLiBUcnkgdGhlbSBmcm9tIG1vc3QgcmVsaWFibGUgdG8gbGVhc3QsIGZhbGxpbmcgZG93biB0aGUgY2hhaW5cbiAgY29uc3QgZ2V0VmVyc2lvbkZ1bmN0aW9ucyA9IFtcbiAgICBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgcGtnID0gKGF3YWl0IGV4ZWMoJ3BrZ3V0aWwnLCBbJy0tcGtncz1jb20uYXBwbGUucGtnLkRldlNES18uKiddKSkuc3Rkb3V0O1xuICAgICAgcmV0dXJuIChhd2FpdCBleGVjKCdwa2d1dGlsJywgW2AtLXBrZy1pbmZvPSR7cGtnLnRyaW0oKX1gXSkpLnN0ZG91dDtcbiAgICB9LFxuICAgIGFzeW5jICgpID0+IChhd2FpdCBleGVjKCdwa2d1dGlsJywgW2AtLXBrZy1pbmZvPWNvbS5hcHBsZS5wa2cuQ0xUb29sc19FeGVjdXRhYmxlc2BdKSkuc3Rkb3V0LFxuICAgIGFzeW5jICgpID0+IChhd2FpdCBleGVjKCdwa2d1dGlsJywgW2AtLXBrZy1pbmZvPWNvbS5hcHBsZS5wa2cuRGV2ZWxvcGVyVG9vbHNDTElgXSkpLnN0ZG91dCxcbiAgXTtcbiAgbGV0IHN0ZG91dDtcbiAgZm9yIChsZXQgZ2V0VmVyc2lvbiBvZiBnZXRWZXJzaW9uRnVuY3Rpb25zKSB7XG4gICAgdHJ5IHtcbiAgICAgIHN0ZG91dCA9IGF3YWl0IGdldFZlcnNpb24oKTtcbiAgICAgIGJyZWFrO1xuICAgIH0gY2F0Y2ggKGlnbikge1xuICAgICAgc3Rkb3V0ID0gJyc7XG4gICAgfVxuICB9XG5cbiAgLy8gc3Rkb3V0IHNob3VsZCBoYXZlIGEgbGluZSBsaWtlIGB2ZXJzaW9uOiA4LjAuMC4wLjEuMTQ3MjQzNTg4MWBcbiAgbGV0IG1hdGNoID0gL152ZXJzaW9uOiAoLispJC9tLmV4ZWMoc3Rkb3V0KTsgLy8gaHR0cHM6Ly9yZWdleDEwMS5jb20vci9IVjN4NGQvMVxuICByZXR1cm4gbWF0Y2ggPyBtYXRjaFsxXSA6IHVuZGVmaW5lZDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0QXV0b21hdGlvblRyYWNlVGVtcGxhdGVQYXRoV2l0aG91dFJldHJ5ICh0aW1lb3V0ID0gWENSVU5fVElNRU9VVCkge1xuICBjb25zdCB4Y29kZVBhdGggPSBhd2FpdCBnZXRQYXRoKHRpbWVvdXQpO1xuXG4gIC8vIGZvciBpb3MgOCBhbmQgdXAsIHRoZSBmaWxlIGV4dGVuc2lvbiBmb3IgQXV0aW9tYXRpb25JbnN0cnVtZW50IGNoYW5nZWQuXG4gIC8vIHJhdGhlciB0aGFuIHdhc3RlIHRpbWUgZ2V0dGluZyB0aGUgaU9TU0RLVmVyc2lvbiwganVzdCBnZXQgYm90aCBwYXRocyBhbmQgc2VlIHdoaWNoIG9uZSBleGlzdHNcbiAgY29uc3QgZXh0ZW5zaW9ucyA9IFsneHJwbHVnaW4nLCAnYnVuZGxlJ107XG4gIGNvbnN0IHBhdGhQcmVmaXggPSBwYXRoLnJlc29sdmUoeGNvZGVQYXRoLCBcIi4uL0FwcGxpY2F0aW9ucy9JbnN0cnVtZW50cy5hcHAvQ29udGVudHMvUGx1Z0luc1wiKTtcbiAgY29uc3QgcGF0aFN1ZmZpeCA9IFwiQ29udGVudHMvUmVzb3VyY2VzL0F1dG9tYXRpb24udHJhY2V0ZW1wbGF0ZVwiO1xuICBsZXQgYXV0b21hdGlvblRyYWNlVGVtcGxhdGVQYXRocyA9IFtcbiAgICBwYXRoLnJlc29sdmUocGF0aFByZWZpeCwgYEF1dG9tYXRpb25JbnN0cnVtZW50LiR7ZXh0ZW5zaW9uc1swXX1gLCBwYXRoU3VmZml4KSxcbiAgICBwYXRoLnJlc29sdmUocGF0aFByZWZpeCwgYEF1dG9tYXRpb25JbnN0cnVtZW50LiR7ZXh0ZW5zaW9uc1sxXX1gLCBwYXRoU3VmZml4KVxuICBdO1xuXG4gIGlmIChhd2FpdCBmcy5leGlzdHMoYXV0b21hdGlvblRyYWNlVGVtcGxhdGVQYXRoc1swXSkpIHtcbiAgICByZXR1cm4gYXV0b21hdGlvblRyYWNlVGVtcGxhdGVQYXRoc1swXTtcbiAgfVxuXG4gIGlmIChhd2FpdCBmcy5leGlzdHMoYXV0b21hdGlvblRyYWNlVGVtcGxhdGVQYXRoc1sxXSkpIHtcbiAgICByZXR1cm4gYXV0b21hdGlvblRyYWNlVGVtcGxhdGVQYXRoc1sxXTtcbiAgfVxuXG4gIGNvbnN0IG1zZyA9IFwiQ291bGQgbm90IGZpbmQgQXV0b21hdGlvbi50cmFjZXRlbXBsYXRlIGluIGFueSBvZiB0aGUgZm9sbG93aW5nXCIgK1xuICAgICAgICAgICAgICBgbG9jYXRpb25zICR7YXV0b21hdGlvblRyYWNlVGVtcGxhdGVQYXRocy50b1N0cmluZygpfWA7XG4gIGxvZy5lcnJvcihtc2cpO1xuICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcblxufVxuXG5jb25zdCBnZXRBdXRvbWF0aW9uVHJhY2VUZW1wbGF0ZVBhdGggPSBfLm1lbW9pemUoXG4gIGZ1bmN0aW9uIChyZXRyaWVzID0gREVGQVVMVF9OVU1CRVJfT0ZfUkVUUklFUywgdGltZW91dCA9IFhDUlVOX1RJTUVPVVQpIHtcbiAgICByZXR1cm4gcmV0cnkocmV0cmllcywgZ2V0QXV0b21hdGlvblRyYWNlVGVtcGxhdGVQYXRoV2l0aG91dFJldHJ5LCB0aW1lb3V0KTtcbiAgfVxuKTtcblxuYXN5bmMgZnVuY3Rpb24gZ2V0TWF4SU9TU0RLV2l0aG91dFJldHJ5ICh0aW1lb3V0ID0gWENSVU5fVElNRU9VVCkge1xuICBjb25zdCB2ZXJzaW9uID0gYXdhaXQgZ2V0VmVyc2lvbihmYWxzZSwgREVGQVVMVF9OVU1CRVJfT0ZfUkVUUklFUywgdGltZW91dCk7XG4gIGlmICh2ZXJzaW9uWzBdID09PSAnNCcpIHtcbiAgICByZXR1cm4gJzYuMSc7XG4gIH1cblxuICBjb25zdCBhcmdzID0gWyctLXNkaycsICAnaXBob25lc2ltdWxhdG9yJywgICctLXNob3ctc2RrLXZlcnNpb24nXTtcbiAgY29uc3Qge3N0ZG91dH0gPSBhd2FpdCBydW5YY3J1bkNvbW1hbmQoYXJncywgdGltZW91dCk7XG5cbiAgY29uc3Qgc2RrVmVyc2lvbiA9IHN0ZG91dC50cmltKCk7XG4gIGNvbnN0IG1hdGNoID0gL1xcZC5cXGQvLmV4ZWMoc3Rkb3V0KTtcblxuICBpZiAoIW1hdGNoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGB4Y3J1biByZXR1cm5lZCBhIG5vbi1udW1lcmljIGlPUyBTREsgdmVyc2lvbjogJyR7c2RrVmVyc2lvbn0nYCk7XG4gIH1cblxuICByZXR1cm4gc2RrVmVyc2lvbjtcbn1cblxuY29uc3QgZ2V0TWF4SU9TU0RLID0gXy5tZW1vaXplKFxuICBmdW5jdGlvbiAocmV0cmllcyA9IERFRkFVTFRfTlVNQkVSX09GX1JFVFJJRVMsIHRpbWVvdXQgPSBYQ1JVTl9USU1FT1VUKSB7XG4gICAgcmV0dXJuIHJldHJ5KHJldHJpZXMsIGdldE1heElPU1NES1dpdGhvdXRSZXRyeSwgdGltZW91dCk7XG4gIH1cbik7XG5cbmFzeW5jIGZ1bmN0aW9uIGdldE1heFRWT1NTREtXaXRob3V0UmV0cnkgKHRpbWVvdXQgPSBYQ1JVTl9USU1FT1VUKSB7XG4gIGNvbnN0IGFyZ3MgPSBbJy0tc2RrJywgICdhcHBsZXR2c2ltdWxhdG9yJywgICctLXNob3ctc2RrLXZlcnNpb24nXTtcbiAgY29uc3Qge3N0ZG91dH0gPSBhd2FpdCBydW5YY3J1bkNvbW1hbmQoYXJncywgdGltZW91dCk7XG5cbiAgY29uc3Qgc2RrVmVyc2lvbiA9IHN0ZG91dC50cmltKCk7XG5cbiAgaWYgKGlzTmFOKHBhcnNlRmxvYXQoc2RrVmVyc2lvbikpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGB4Y3J1biByZXR1cm5lZCBhIG5vbi1udW1lcmljIHR2T1MgU0RLIHZlcnNpb246ICcke3Nka1ZlcnNpb259J2ApO1xuICB9XG5cbiAgcmV0dXJuIHNka1ZlcnNpb247XG59XG5cbmNvbnN0IGdldE1heFRWT1NTREsgPSBfLm1lbW9pemUoXG4gIGZ1bmN0aW9uIChyZXRyaWVzID0gREVGQVVMVF9OVU1CRVJfT0ZfUkVUUklFUywgdGltZW91dCA9IFhDUlVOX1RJTUVPVVQpIHtcbiAgICByZXR1cm4gcmV0cnkocmV0cmllcywgZ2V0TWF4VFZPU1NES1dpdGhvdXRSZXRyeSwgdGltZW91dCk7XG4gIH1cbik7XG5cbmFzeW5jIGZ1bmN0aW9uIGdldENvbm5lY3RlZERldmljZXMgKHRpbWVvdXQgPSBYQ1JVTl9USU1FT1VUKSB7XG4gIGNvbnN0IGNtZCA9ICcvdXNyL3NiaW4vc3lzdGVtX3Byb2ZpbGVyJztcbiAgY29uc3QgYXJncyA9IFsnLXhtbCcsICdTUFVTQkRhdGFUeXBlJ107XG4gIGxldCB7c3Rkb3V0fSA9IGF3YWl0IGV4ZWMoY21kLCBhcmdzLCB7dGltZW91dH0pO1xuICBsZXQgcGxpc3RDb250ZW50ID0gcGFyc2VQbGlzdERhdGEoc3Rkb3V0KTtcblxuICBsZXQgZGV2aWNlc0ZvdW5kID0gW107XG4gIGxldCBlbnRyaWVzVG9TZWFyY2ggPSBbcGxpc3RDb250ZW50WzBdXTtcbiAgd2hpbGUgKGVudHJpZXNUb1NlYXJjaC5sZW5ndGggPiAwKSB7XG4gICAgbGV0IGN1cnJlbnRFbnRyeSA9IGVudHJpZXNUb1NlYXJjaC5wb3AoKTtcbiAgICBpZiAoY3VycmVudEVudHJ5IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIGVudHJpZXNUb1NlYXJjaCA9IGVudHJpZXNUb1NlYXJjaC5jb25jYXQoY3VycmVudEVudHJ5KTtcbiAgICB9IGVsc2UgaWYgKChjdXJyZW50RW50cnkuX25hbWUgJiZcbiAgICAgICAgICAgICAgICBjdXJyZW50RW50cnkuX25hbWUuc3Vic3RyaW5nKDAsIDQpID09PSBcImlQYWRcIikgfHxcbiAgICAgICAgICAgICAgIChjdXJyZW50RW50cnkuX25hbWUgJiZcbiAgICAgICAgICAgICAgICBjdXJyZW50RW50cnkuX25hbWUuc3Vic3RyaW5nKDAsIDYpID09PSBcImlQaG9uZVwiKSB8fFxuICAgICAgICAgICAgICAgKGN1cnJlbnRFbnRyeS5fbmFtZSAmJiBfLmluY2x1ZGVzKGN1cnJlbnRFbnRyeS5fbmFtZSwgXCJBcHBsZSBUVlwiKSkpIHtcbiAgICAgIGxldCBkZXZpY2VJbmZvID0ge1xuICAgICAgICBuYW1lOiBjdXJyZW50RW50cnkuX25hbWUsXG4gICAgICAgIHVkaWQ6IGN1cnJlbnRFbnRyeS5zZXJpYWxfbnVtLFxuICAgICAgICBwcm9kdWN0SWQ6IGN1cnJlbnRFbnRyeS5wcm9kdWN0X2lkLFxuICAgICAgICBkZXZpY2VWZXJzaW9uOiBjdXJyZW50RW50cnkuYmNkX2RldmljZVxuICAgICAgfTtcbiAgICAgIGRldmljZXNGb3VuZC5wdXNoKGRldmljZUluZm8pO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudEVudHJ5Ll9pdGVtcykge1xuICAgICAgZW50cmllc1RvU2VhcmNoID0gZW50cmllc1RvU2VhcmNoLmNvbmNhdChjdXJyZW50RW50cnkuX2l0ZW1zKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRldmljZXNGb3VuZDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0SW5zdHJ1bWVudHNQYXRoV2l0aG91dFJldHJ5ICh0aW1lb3V0ID0gWENSVU5fVElNRU9VVCkge1xuICBjb25zdCBhcmdzID0gWyctZmluZCcsICdpbnN0cnVtZW50cyddO1xuICBsZXQge3N0ZG91dH0gPSBhd2FpdCBydW5YY3J1bkNvbW1hbmQoYXJncywgdGltZW91dCk7XG5cbiAgaWYgKCFzdGRvdXQpIHtcbiAgICBzdGRvdXQgPSBcIlwiO1xuICB9XG5cbiAgbGV0IGluc3RydW1lbnRzUGF0aCA9IHN0ZG91dC50cmltKCk7XG5cbiAgaWYgKCFpbnN0cnVtZW50c1BhdGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kIHBhdGggdG8gaW5zdHJ1bWVudHMgYmluYXJ5IHVzaW5nICd4Y3J1biAke2FyZ3Muam9pbignICcpfSdgKTtcbiAgfVxuXG4gIHJldHVybiBpbnN0cnVtZW50c1BhdGg7XG59XG5cbmNvbnN0IGdldEluc3RydW1lbnRzUGF0aCA9IF8ubWVtb2l6ZShcbiAgZnVuY3Rpb24gKHJldHJpZXMgPSBERUZBVUxUX05VTUJFUl9PRl9SRVRSSUVTLCB0aW1lb3V0ID0gWENSVU5fVElNRU9VVCkge1xuICAgIHJldHVybiByZXRyeShyZXRyaWVzLCBnZXRJbnN0cnVtZW50c1BhdGhXaXRob3V0UmV0cnksIHRpbWVvdXQpO1xuICB9XG4pO1xuXG5mdW5jdGlvbiBjbGVhckludGVybmFsQ2FjaGUgKCkge1xuXG4gIC8vIG1lbW9pemVkIGZ1bmN0aW9uc1xuICBjb25zdCBtZW1vaXplZCA9IFtnZXRQYXRoLCBnZXRWZXJzaW9uTWVtb2l6ZWQsIGdldEF1dG9tYXRpb25UcmFjZVRlbXBsYXRlUGF0aCxcbiAgICAgICAgICAgICAgICAgICAgZ2V0TWF4SU9TU0RLLCBnZXRNYXhUVk9TU0RLLCBnZXRJbnN0cnVtZW50c1BhdGhdO1xuXG4gIG1lbW9pemVkLmZvckVhY2goKGYpID0+IHtcbiAgICBpZiAoZi5jYWNoZSkge1xuICAgICAgZi5jYWNoZSA9IG5ldyBfLm1lbW9pemUuQ2FjaGUoKTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7IGdldFBhdGgsIGdldFZlcnNpb24sIGdldEF1dG9tYXRpb25UcmFjZVRlbXBsYXRlUGF0aCwgZ2V0TWF4SU9TU0RLLFxuICAgICAgICAgZ2V0QXV0b21hdGlvblRyYWNlVGVtcGxhdGVQYXRoV2l0aG91dFJldHJ5LCBnZXRNYXhJT1NTREtXaXRob3V0UmV0cnksXG4gICAgICAgICBnZXRDb25uZWN0ZWREZXZpY2VzLCBjbGVhckludGVybmFsQ2FjaGUsIGdldEluc3RydW1lbnRzUGF0aCxcbiAgICAgICAgIGdldENvbW1hbmRMaW5lVG9vbHNWZXJzaW9uLCBnZXRNYXhUVk9TU0RLLCBnZXRNYXhUVk9TU0RLV2l0aG91dFJldHJ5IH07XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uIn0=
