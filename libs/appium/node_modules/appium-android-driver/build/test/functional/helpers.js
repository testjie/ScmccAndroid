'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _appiumSupport = require('appium-support');

var MOCHA_TIMEOUT = process.env.MOCHA_TIMEOUT ? process.env.MOCHA_TIMEOUT : process.env.TRAVIS ? 120000 : 15000;

var CHROMEDRIVER_2_20_ASSET_MAP = {
  windows: ['windows', 'chromedriver.exe'],
  mac: ['mac', 'chromedriver'],
  linux32: ['linux-32', 'chromedriver'],
  linux64: ['linux-64', 'chromedriver']
};

function getChromedriver220Asset() {
  var basePath, dir, cmd, _CHROMEDRIVER_2_20_ASSET_MAP$windows, _CHROMEDRIVER_2_20_ASSET_MAP$mac, _CHROMEDRIVER_2_20_ASSET_MAP;

  return _regeneratorRuntime.async(function getChromedriver220Asset$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        basePath = _path2['default'].resolve(__dirname, '..', '..', '..', 'test', 'assets', 'chromedriver-2.20');
        dir = undefined;
        cmd = undefined;

        if (!_appiumSupport.system.isWindows()) {
          context$1$0.next = 9;
          break;
        }

        _CHROMEDRIVER_2_20_ASSET_MAP$windows = _slicedToArray(CHROMEDRIVER_2_20_ASSET_MAP.windows, 2);
        dir = _CHROMEDRIVER_2_20_ASSET_MAP$windows[0];
        cmd = _CHROMEDRIVER_2_20_ASSET_MAP$windows[1];
        context$1$0.next = 23;
        break;

      case 9:
        if (!_appiumSupport.system.isMac()) {
          context$1$0.next = 15;
          break;
        }

        _CHROMEDRIVER_2_20_ASSET_MAP$mac = _slicedToArray(CHROMEDRIVER_2_20_ASSET_MAP.mac, 2);
        dir = _CHROMEDRIVER_2_20_ASSET_MAP$mac[0];
        cmd = _CHROMEDRIVER_2_20_ASSET_MAP$mac[1];
        context$1$0.next = 23;
        break;

      case 15:
        context$1$0.next = 17;
        return _regeneratorRuntime.awrap(_appiumSupport.system.arch());

      case 17:
        context$1$0.t0 = context$1$0.sent;
        context$1$0.t1 = 'linux' + context$1$0.t0;
        context$1$0.t2 = CHROMEDRIVER_2_20_ASSET_MAP[context$1$0.t1];
        _CHROMEDRIVER_2_20_ASSET_MAP = _slicedToArray(context$1$0.t2, 2);
        dir = _CHROMEDRIVER_2_20_ASSET_MAP[0];
        cmd = _CHROMEDRIVER_2_20_ASSET_MAP[1];

      case 23:
        return context$1$0.abrupt('return', _path2['default'].resolve(basePath, dir, cmd));

      case 24:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function ensureAVDExists(mochaContext, avdName) {
  var adb;
  return _regeneratorRuntime.async(function ensureAVDExists$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(_appiumAdb2['default'].createADB());

      case 2:
        adb = context$1$0.sent;
        context$1$0.prev = 3;
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(adb.checkAvdExist(avdName));

      case 6:
        context$1$0.next = 12;
        break;

      case 8:
        context$1$0.prev = 8;
        context$1$0.t0 = context$1$0['catch'](3);

        mochaContext.skip();
        return context$1$0.abrupt('return', false);

      case 12:
        return context$1$0.abrupt('return', true);

      case 13:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[3, 8]]);
}

exports.MOCHA_TIMEOUT = MOCHA_TIMEOUT;
exports.ensureAVDExists = ensureAVDExists;
exports.getChromedriver220Asset = getChromedriver220Asset;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9oZWxwZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozt5QkFBZ0IsWUFBWTs7OztvQkFDWCxNQUFNOzs7OzZCQUNBLGdCQUFnQjs7QUFHdkMsSUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxHQUFHLEtBQUssQUFBQyxDQUFDOztBQUVwSCxJQUFNLDJCQUEyQixHQUFHO0FBQ2xDLFNBQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQztBQUN4QyxLQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsY0FBYyxDQUFDO0FBQzVCLFNBQU8sRUFBRSxDQUFDLFVBQVUsRUFBRSxjQUFjLENBQUM7QUFDckMsU0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQztDQUN0QyxDQUFDOztBQUVGLFNBQWUsdUJBQXVCO01BQ2hDLFFBQVEsRUFDUixHQUFHLEVBQ0gsR0FBRzs7Ozs7QUFGSCxnQkFBUSxHQUFHLGtCQUFLLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxtQkFBbUIsQ0FBQztBQUMzRixXQUFHO0FBQ0gsV0FBRzs7YUFDSCxzQkFBTyxTQUFTLEVBQUU7Ozs7OzhEQUNQLDJCQUEyQixDQUFDLE9BQU87QUFBL0MsV0FBRztBQUFFLFdBQUc7Ozs7O2FBQ0Esc0JBQU8sS0FBSyxFQUFFOzs7OzswREFDViwyQkFBMkIsQ0FBQyxHQUFHO0FBQTNDLFdBQUc7QUFBRSxXQUFHOzs7Ozs7eUNBRThDLHNCQUFPLElBQUksRUFBRTs7Ozs7eUJBQXZELDJCQUEyQjs7QUFBdkMsV0FBRztBQUFFLFdBQUc7Ozs0Q0FFSixrQkFBSyxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7Ozs7Ozs7Q0FDeEM7O0FBRUQsU0FBZSxlQUFlLENBQUUsWUFBWSxFQUFFLE9BQU87TUFDL0MsR0FBRzs7Ozs7eUNBQVMsdUJBQUksU0FBUyxFQUFFOzs7QUFBM0IsV0FBRzs7O3lDQUVDLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDOzs7Ozs7Ozs7O0FBRWhDLG9CQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7NENBQ2IsS0FBSzs7OzRDQUVQLElBQUk7Ozs7Ozs7Q0FDWjs7UUFHUSxhQUFhLEdBQWIsYUFBYTtRQUFFLGVBQWUsR0FBZixlQUFlO1FBQUUsdUJBQXVCLEdBQXZCLHVCQUF1QiIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvaGVscGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBREIgZnJvbSAnYXBwaXVtLWFkYic7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IHN5c3RlbSB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcblxuXG5jb25zdCBNT0NIQV9USU1FT1VUID0gcHJvY2Vzcy5lbnYuTU9DSEFfVElNRU9VVCA/IHByb2Nlc3MuZW52Lk1PQ0hBX1RJTUVPVVQgOiAocHJvY2Vzcy5lbnYuVFJBVklTID8gMTIwMDAwIDogMTUwMDApO1xuXG5jb25zdCBDSFJPTUVEUklWRVJfMl8yMF9BU1NFVF9NQVAgPSB7XG4gIHdpbmRvd3M6IFsnd2luZG93cycsICdjaHJvbWVkcml2ZXIuZXhlJ10sXG4gIG1hYzogWydtYWMnLCAnY2hyb21lZHJpdmVyJ10sXG4gIGxpbnV4MzI6IFsnbGludXgtMzInLCAnY2hyb21lZHJpdmVyJ10sXG4gIGxpbnV4NjQ6IFsnbGludXgtNjQnLCAnY2hyb21lZHJpdmVyJ10sXG59O1xuXG5hc3luYyBmdW5jdGlvbiBnZXRDaHJvbWVkcml2ZXIyMjBBc3NldCAoKSB7XG4gIGxldCBiYXNlUGF0aCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLicsICcuLicsICcuLicsICd0ZXN0JywgJ2Fzc2V0cycsICdjaHJvbWVkcml2ZXItMi4yMCcpO1xuICBsZXQgZGlyO1xuICBsZXQgY21kO1xuICBpZiAoc3lzdGVtLmlzV2luZG93cygpKSB7XG4gICAgW2RpciwgY21kXSA9IENIUk9NRURSSVZFUl8yXzIwX0FTU0VUX01BUC53aW5kb3dzO1xuICB9IGVsc2UgaWYgKHN5c3RlbS5pc01hYygpKSB7XG4gICAgW2RpciwgY21kXSA9IENIUk9NRURSSVZFUl8yXzIwX0FTU0VUX01BUC5tYWM7XG4gIH0gZWxzZSB7XG4gICAgW2RpciwgY21kXSA9IENIUk9NRURSSVZFUl8yXzIwX0FTU0VUX01BUFtgbGludXgke2F3YWl0IHN5c3RlbS5hcmNoKCl9YF07XG4gIH1cbiAgcmV0dXJuIHBhdGgucmVzb2x2ZShiYXNlUGF0aCwgZGlyLCBjbWQpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBlbnN1cmVBVkRFeGlzdHMgKG1vY2hhQ29udGV4dCwgYXZkTmFtZSkge1xuICBsZXQgYWRiID0gYXdhaXQgQURCLmNyZWF0ZUFEQigpO1xuICB0cnkge1xuICAgIGF3YWl0IGFkYi5jaGVja0F2ZEV4aXN0KGF2ZE5hbWUpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBtb2NoYUNvbnRleHQuc2tpcCgpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuXG5leHBvcnQgeyBNT0NIQV9USU1FT1VULCBlbnN1cmVBVkRFeGlzdHMsIGdldENocm9tZWRyaXZlcjIyMEFzc2V0IH07XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uIn0=
