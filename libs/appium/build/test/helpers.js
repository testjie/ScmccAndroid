'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _wd = require('wd');

var _wd2 = _interopRequireDefault(_wd);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _libUtils = require('../lib/utils');

var TEST_HOST = 'localhost';
var TEST_PORT = 4723;
var TEST_FAKE_APP = _path2['default'].resolve(__dirname, "..", "..", "node_modules", "appium-fake-driver", "test", "fixtures", "app.xml");

function initSession(caps) {
  var resolve = function resolve() {};
  var driver = undefined;
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          driver = _wd2['default'].promiseChainRemote({ host: TEST_HOST, port: TEST_PORT });
          resolve(driver);
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.init(caps));

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  after(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.quit());

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  return new _bluebird2['default'](function (_resolve) {
    resolve = _resolve;
  });
}

var BASE_CAPS = { platformName: 'Fake', deviceName: 'Fake', app: TEST_FAKE_APP };
var W3C_PREFIXED_CAPS = _extends({}, (0, _libUtils.insertAppiumPrefixes)(BASE_CAPS));
var W3C_CAPS = {
  alwaysMatch: _extends({}, W3C_PREFIXED_CAPS),
  firstMatch: [{}]
};

exports.initSession = initSession;
exports.TEST_FAKE_APP = TEST_FAKE_APP;
exports.TEST_HOST = TEST_HOST;
exports.TEST_PORT = TEST_PORT;
exports.BASE_CAPS = BASE_CAPS;
exports.W3C_PREFIXED_CAPS = W3C_PREFIXED_CAPS;
exports.W3C_CAPS = W3C_CAPS;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvaGVscGVycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7b0JBQWlCLE1BQU07Ozs7a0JBQ1IsSUFBSTs7Ozt3QkFDTCxVQUFVOzs7O3dCQUNXLGNBQWM7O0FBRWpELElBQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQztBQUM5QixJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUM7QUFDdkIsSUFBTSxhQUFhLEdBQUcsa0JBQUssT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFDckMsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFDeEMsU0FBUyxDQUFDLENBQUM7O0FBRTlDLFNBQVMsV0FBVyxDQUFFLElBQUksRUFBRTtBQUMxQixNQUFJLE9BQU8sR0FBRyxtQkFBTSxFQUFFLENBQUM7QUFDdkIsTUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLFFBQU0sQ0FBQzs7OztBQUNMLGdCQUFNLEdBQUcsZ0JBQUcsa0JBQWtCLENBQUMsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFDO0FBQ25FLGlCQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7OzJDQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7O0dBQ3hCLENBQUMsQ0FBQztBQUNILE9BQUssQ0FBQzs7Ozs7MkNBQ0UsTUFBTSxDQUFDLElBQUksRUFBRTs7Ozs7OztHQUNwQixDQUFDLENBQUM7QUFDSCxTQUFPLDBCQUFNLFVBQUMsUUFBUSxFQUFLO0FBQ3pCLFdBQU8sR0FBRyxRQUFRLENBQUM7R0FDcEIsQ0FBQyxDQUFDO0NBQ0o7O0FBRUQsSUFBTSxTQUFTLEdBQUcsRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLGFBQWEsRUFBQyxDQUFDO0FBQ2pGLElBQU0saUJBQWlCLGdCQUFPLG9DQUFxQixTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQy9ELElBQU0sUUFBUSxHQUFHO0FBQ2YsYUFBVyxlQUFLLGlCQUFpQixDQUFDO0FBQ2xDLFlBQVUsRUFBRSxDQUFDLEVBQUUsQ0FBQztDQUNqQixDQUFDOztRQUVPLFdBQVcsR0FBWCxXQUFXO1FBQUUsYUFBYSxHQUFiLGFBQWE7UUFBRSxTQUFTLEdBQVQsU0FBUztRQUFFLFNBQVMsR0FBVCxTQUFTO1FBQUUsU0FBUyxHQUFULFNBQVM7UUFBRSxpQkFBaUIsR0FBakIsaUJBQWlCO1FBQUUsUUFBUSxHQUFSLFFBQVEiLCJmaWxlIjoidGVzdC9oZWxwZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgd2QgZnJvbSAnd2QnO1xuaW1wb3J0IEIgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHtpbnNlcnRBcHBpdW1QcmVmaXhlc30gZnJvbSAnLi4vbGliL3V0aWxzJztcblxuY29uc3QgVEVTVF9IT1NUID0gJ2xvY2FsaG9zdCc7XG5jb25zdCBURVNUX1BPUlQgPSA0NzIzO1xuY29uc3QgVEVTVF9GQUtFX0FQUCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi5cIiwgXCIuLlwiLCBcIm5vZGVfbW9kdWxlc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFwcGl1bS1mYWtlLWRyaXZlclwiLCBcInRlc3RcIiwgXCJmaXh0dXJlc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFwcC54bWxcIik7XG5cbmZ1bmN0aW9uIGluaXRTZXNzaW9uIChjYXBzKSB7XG4gIGxldCByZXNvbHZlID0gKCkgPT4ge307XG4gIGxldCBkcml2ZXI7XG4gIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgZHJpdmVyID0gd2QucHJvbWlzZUNoYWluUmVtb3RlKHtob3N0OiBURVNUX0hPU1QsIHBvcnQ6IFRFU1RfUE9SVH0pO1xuICAgIHJlc29sdmUoZHJpdmVyKTtcbiAgICBhd2FpdCBkcml2ZXIuaW5pdChjYXBzKTtcbiAgfSk7XG4gIGFmdGVyKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIucXVpdCgpO1xuICB9KTtcbiAgcmV0dXJuIG5ldyBCKChfcmVzb2x2ZSkgPT4ge1xuICAgIHJlc29sdmUgPSBfcmVzb2x2ZTtcbiAgfSk7XG59XG5cbmNvbnN0IEJBU0VfQ0FQUyA9IHtwbGF0Zm9ybU5hbWU6ICdGYWtlJywgZGV2aWNlTmFtZTogJ0Zha2UnLCBhcHA6IFRFU1RfRkFLRV9BUFB9O1xuY29uc3QgVzNDX1BSRUZJWEVEX0NBUFMgPSB7Li4uaW5zZXJ0QXBwaXVtUHJlZml4ZXMoQkFTRV9DQVBTKX07XG5jb25zdCBXM0NfQ0FQUyA9IHtcbiAgYWx3YXlzTWF0Y2g6ey4uLlczQ19QUkVGSVhFRF9DQVBTfSxcbiAgZmlyc3RNYXRjaDogW3t9XSxcbn07XG5cbmV4cG9ydCB7IGluaXRTZXNzaW9uLCBURVNUX0ZBS0VfQVBQLCBURVNUX0hPU1QsIFRFU1RfUE9SVCwgQkFTRV9DQVBTLCBXM0NfUFJFRklYRURfQ0FQUywgVzNDX0NBUFMgfTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
