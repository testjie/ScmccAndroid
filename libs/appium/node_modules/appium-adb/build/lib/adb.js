'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _toolsIndexJs = require('./tools/index.js');

var _toolsIndexJs2 = _interopRequireDefault(_toolsIndexJs);

var _helpers = require('./helpers');

var DEFAULT_ADB_PORT = 5037;
var JAR_PATH = _path2['default'].resolve(_helpers.rootDir, 'jars');
var DEFAULT_OPTS = {
  sdkRoot: null,
  udid: null,
  appDeviceReadyTimeout: null,
  useKeystore: null,
  keystorePath: null,
  keystorePassword: null,
  keyAlias: null,
  keyPassword: null,
  executable: { path: "adb", defaultArgs: [] },
  tmpDir: _os2['default'].tmpdir(),
  curDeviceId: null,
  emulatorPort: null,
  logcat: null,
  binaries: {},
  instrumentProc: null,
  javaVersion: null,
  suppressKillServer: null,
  jars: {},
  helperJarPath: JAR_PATH,
  adbPort: DEFAULT_ADB_PORT
};

var ADB = (function () {
  function ADB() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, ADB);

    if (typeof opts.sdkRoot === "undefined") {
      opts.sdkRoot = process.env.ANDROID_HOME || '';
    }

    _Object$assign(this, opts);
    _lodash2['default'].defaultsDeep(this, _lodash2['default'].cloneDeep(DEFAULT_OPTS));

    if (opts.remoteAdbHost) {
      this.executable.defaultArgs.push("-H", opts.remoteAdbHost);
    }
    // TODO figure out why we have this option as it does not appear to be
    // used anywhere. Probably deprecate in favor of simple opts.adbPort
    if (opts.remoteAdbPort) {
      this.adbPort = opts.remoteAdbPort;
    }
    this.executable.defaultArgs.push("-P", this.adbPort);

    this.initJars();
  }

  _createClass(ADB, [{
    key: 'initJars',
    value: function initJars() {
      var tempJars = ['move_manifest.jar', 'sign.jar', 'appium_apk_tools.jar', 'unsign.jar', 'verify.jar'];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _getIterator(tempJars), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var jarName = _step.value;

          this.jars[jarName] = _path2['default'].resolve(JAR_PATH, jarName);
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
    }
  }]);

  return ADB;
})();

ADB.createADB = function callee$0$0(opts) {
  var adb;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        adb = new ADB(opts);
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(adb.getAdbWithCorrectAdbPath());

      case 3:
        return context$1$0.abrupt('return', adb);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// add all the methods to the ADB prototype
var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
  for (var _iterator2 = _getIterator(_lodash2['default'].toPairs(_toolsIndexJs2['default'])), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    var _step2$value = _slicedToArray(_step2.value, 2);

    var fnName = _step2$value[0];
    var fn = _step2$value[1];

    ADB.prototype[fnName] = fn;
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

exports['default'] = ADB;
exports.DEFAULT_ADB_PORT = DEFAULT_ADB_PORT;
//# sourceMappingURL=data:application/json;charset=utf8;base64,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RSxPQUFPLDJCQUFTLGlIQUFFOzs7UUFBbkMsTUFBTTtRQUFFLEVBQUU7O0FBQ2xCLE9BQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO0dBQzVCOzs7Ozs7Ozs7Ozs7Ozs7O3FCQUVjLEdBQUc7UUFDVCxnQkFBZ0IsR0FBaEIsZ0JBQWdCIiwiZmlsZSI6ImxpYi9hZGIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IG9zIGZyb20gJ29zJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IG1ldGhvZHMgZnJvbSAnLi90b29scy9pbmRleC5qcyc7XG5pbXBvcnQgeyByb290RGlyIH0gZnJvbSAnLi9oZWxwZXJzJztcblxuY29uc3QgREVGQVVMVF9BREJfUE9SVCA9IDUwMzc7XG5jb25zdCBKQVJfUEFUSCA9IHBhdGgucmVzb2x2ZShyb290RGlyLCAnamFycycpO1xuY29uc3QgREVGQVVMVF9PUFRTID0ge1xuICBzZGtSb290OiBudWxsLFxuICB1ZGlkOiBudWxsLFxuICBhcHBEZXZpY2VSZWFkeVRpbWVvdXQ6IG51bGwsXG4gIHVzZUtleXN0b3JlOiBudWxsLFxuICBrZXlzdG9yZVBhdGg6IG51bGwsXG4gIGtleXN0b3JlUGFzc3dvcmQ6IG51bGwsXG4gIGtleUFsaWFzOiBudWxsLFxuICBrZXlQYXNzd29yZDogbnVsbCxcbiAgZXhlY3V0YWJsZToge3BhdGg6IFwiYWRiXCIsIGRlZmF1bHRBcmdzOiBbXX0sXG4gIHRtcERpcjogb3MudG1wZGlyKCksXG4gIGN1ckRldmljZUlkOiBudWxsLFxuICBlbXVsYXRvclBvcnQgOiBudWxsLFxuICBsb2djYXQ6IG51bGwsXG4gIGJpbmFyaWVzOiB7fSxcbiAgaW5zdHJ1bWVudFByb2M6IG51bGwsXG4gIGphdmFWZXJzaW9uOiBudWxsLFxuICBzdXBwcmVzc0tpbGxTZXJ2ZXI6IG51bGwsXG4gIGphcnM6IHt9LFxuICBoZWxwZXJKYXJQYXRoOiBKQVJfUEFUSCxcbiAgYWRiUG9ydDogREVGQVVMVF9BREJfUE9SVFxufTtcblxuY2xhc3MgQURCIHtcbiAgY29uc3RydWN0b3IgKG9wdHMgPSB7fSkge1xuICAgIGlmICh0eXBlb2Ygb3B0cy5zZGtSb290ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBvcHRzLnNka1Jvb3QgPSBwcm9jZXNzLmVudi5BTkRST0lEX0hPTUUgfHwgJyc7XG4gICAgfVxuXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvcHRzKTtcbiAgICBfLmRlZmF1bHRzRGVlcCh0aGlzLCBfLmNsb25lRGVlcChERUZBVUxUX09QVFMpKTtcblxuICAgIGlmIChvcHRzLnJlbW90ZUFkYkhvc3QpIHtcbiAgICAgIHRoaXMuZXhlY3V0YWJsZS5kZWZhdWx0QXJncy5wdXNoKFwiLUhcIiwgb3B0cy5yZW1vdGVBZGJIb3N0KTtcbiAgICB9XG4gICAgLy8gVE9ETyBmaWd1cmUgb3V0IHdoeSB3ZSBoYXZlIHRoaXMgb3B0aW9uIGFzIGl0IGRvZXMgbm90IGFwcGVhciB0byBiZVxuICAgIC8vIHVzZWQgYW55d2hlcmUuIFByb2JhYmx5IGRlcHJlY2F0ZSBpbiBmYXZvciBvZiBzaW1wbGUgb3B0cy5hZGJQb3J0XG4gICAgaWYgKG9wdHMucmVtb3RlQWRiUG9ydCkge1xuICAgICAgdGhpcy5hZGJQb3J0ID0gb3B0cy5yZW1vdGVBZGJQb3J0O1xuICAgIH1cbiAgICB0aGlzLmV4ZWN1dGFibGUuZGVmYXVsdEFyZ3MucHVzaChcIi1QXCIsIHRoaXMuYWRiUG9ydCk7XG5cbiAgICB0aGlzLmluaXRKYXJzKCk7XG4gIH1cblxuICBpbml0SmFycyAoKSB7XG4gICAgbGV0IHRlbXBKYXJzID0gWydtb3ZlX21hbmlmZXN0LmphcicsICdzaWduLmphcicsICdhcHBpdW1fYXBrX3Rvb2xzLmphcicsXG4gICAgICAgICAgICAgICAgICAgICd1bnNpZ24uamFyJywgJ3ZlcmlmeS5qYXInXTtcbiAgICBmb3IgKGxldCBqYXJOYW1lIG9mIHRlbXBKYXJzKSB7XG4gICAgICB0aGlzLmphcnNbamFyTmFtZV0gPSBwYXRoLnJlc29sdmUoSkFSX1BBVEgsIGphck5hbWUpO1xuICAgIH1cbiAgfVxufVxuXG5BREIuY3JlYXRlQURCID0gYXN5bmMgZnVuY3Rpb24gKG9wdHMpIHtcbiAgbGV0IGFkYiA9IG5ldyBBREIob3B0cyk7XG4gIGF3YWl0IGFkYi5nZXRBZGJXaXRoQ29ycmVjdEFkYlBhdGgoKTtcbiAgcmV0dXJuIGFkYjtcbn07XG5cbi8vIGFkZCBhbGwgdGhlIG1ldGhvZHMgdG8gdGhlIEFEQiBwcm90b3R5cGVcbmZvciAobGV0IFtmbk5hbWUsIGZuXSBvZiBfLnRvUGFpcnMobWV0aG9kcykpIHtcbiAgQURCLnByb3RvdHlwZVtmbk5hbWVdID0gZm47XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFEQjtcbmV4cG9ydCB7IERFRkFVTFRfQURCX1BPUlQgfTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
