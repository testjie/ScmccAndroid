'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _teen_process = require('teen_process');

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var SUPPORTED_OSX_VERSIONS = ['10.8', '10.9', '10.10', '10.11', '10.12', '10.13'];

function isWindows() {
  return _os2['default'].type() === 'Windows_NT';
}

function isMac() {
  return _os2['default'].type() === 'Darwin';
}

function isLinux() {
  return !isWindows() && !isMac();
}

function isOSWin64() {
  return process.arch === 'x64' || process.env.hasOwnProperty('PROCESSOR_ARCHITEW6432');
}

function arch() {
  var _ref, stdout, is64;

  return _regeneratorRuntime.async(function arch$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(isLinux() || isMac())) {
          context$1$0.next = 8;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)('uname', ['-m']));

      case 3:
        _ref = context$1$0.sent;
        stdout = _ref.stdout;
        return context$1$0.abrupt('return', stdout.trim() === 'i686' ? '32' : '64');

      case 8:
        if (!isWindows()) {
          context$1$0.next = 11;
          break;
        }

        is64 = this.isOSWin64();
        return context$1$0.abrupt('return', is64 ? '64' : '32');

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function macOsxVersion() {
  var stdout, ver;
  return _regeneratorRuntime.async(function macOsxVersion$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        stdout = undefined;
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)('sw_vers', ['-productVersion']));

      case 4:
        stdout = context$1$0.sent.stdout.trim();
        context$1$0.next = 10;
        break;

      case 7:
        context$1$0.prev = 7;
        context$1$0.t0 = context$1$0['catch'](1);
        throw new Error('Could not detect Mac OS X Version: ' + context$1$0.t0);

      case 10:
        ver = SUPPORTED_OSX_VERSIONS.find(function (v) {
          return stdout.startsWith(v);
        });

        if (ver) {
          context$1$0.next = 13;
          break;
        }

        throw new Error('Could not detect Mac OS X Version from sw_vers output: \'' + stdout + '\'');

      case 13:
        return context$1$0.abrupt('return', ver);

      case 14:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 7]]);
}

exports.isWindows = isWindows;
exports.isMac = isMac;
exports.isLinux = isLinux;
exports.isOSWin64 = isOSWin64;
exports.arch = arch;
exports.macOsxVersion = macOsxVersion;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9zeXN0ZW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs0QkFBcUIsY0FBYzs7a0JBQ3BCLElBQUk7Ozs7QUFHbkIsSUFBTSxzQkFBc0IsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7O0FBRXBGLFNBQVMsU0FBUyxHQUFJO0FBQ3BCLFNBQU8sZ0JBQUcsSUFBSSxFQUFFLEtBQUssWUFBWSxDQUFDO0NBQ25DOztBQUVELFNBQVMsS0FBSyxHQUFJO0FBQ2hCLFNBQU8sZ0JBQUcsSUFBSSxFQUFFLEtBQUssUUFBUSxDQUFDO0NBQy9COztBQUVELFNBQVMsT0FBTyxHQUFJO0FBQ2xCLFNBQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0NBQ2pDOztBQUVELFNBQVMsU0FBUyxHQUFJO0FBQ3BCLFNBQU8sT0FBTyxDQUFDLElBQUksS0FBSyxLQUFLLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsd0JBQXdCLENBQUMsQ0FBQztDQUN2Rjs7QUFFRCxTQUFlLElBQUk7WUFFVixNQUFNLEVBR1AsSUFBSTs7Ozs7Y0FKTixPQUFPLEVBQUUsSUFBSSxLQUFLLEVBQUUsQ0FBQTs7Ozs7O3lDQUNELHdCQUFLLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7O0FBQXJDLGNBQU0sUUFBTixNQUFNOzRDQUNKLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxNQUFNLEdBQUcsSUFBSSxHQUFHLElBQUk7OzthQUNwQyxTQUFTLEVBQUU7Ozs7O0FBQ2hCLFlBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFOzRDQUNwQixJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUk7Ozs7Ozs7Q0FFNUI7O0FBRUQsU0FBZSxhQUFhO01BQ3RCLE1BQU0sRUFPSixHQUFHOzs7O0FBUEwsY0FBTTs7O3lDQUVRLHdCQUFLLFNBQVMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLENBQUM7OztBQUFwRCxjQUFNLG9CQUFnRCxNQUFNLENBQUMsSUFBSTs7Ozs7OztjQUUzRCxJQUFJLEtBQUssd0RBQTZDOzs7QUFHeEQsV0FBRyxHQUFHLHNCQUFzQixDQUFDLElBQUksQ0FBQyxVQUFDLENBQUM7aUJBQUssTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7U0FBQSxDQUFDOztZQUMvRCxHQUFHOzs7OztjQUNBLElBQUksS0FBSywrREFBNEQsTUFBTSxRQUFJOzs7NENBR2hGLEdBQUc7Ozs7Ozs7Q0FDWDs7UUFFUSxTQUFTLEdBQVQsU0FBUztRQUFFLEtBQUssR0FBTCxLQUFLO1FBQUUsT0FBTyxHQUFQLE9BQU87UUFBRSxTQUFTLEdBQVQsU0FBUztRQUFFLElBQUksR0FBSixJQUFJO1FBQUUsYUFBYSxHQUFiLGFBQWEiLCJmaWxlIjoibGliL3N5c3RlbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV4ZWMgfSBmcm9tICd0ZWVuX3Byb2Nlc3MnO1xuaW1wb3J0IG9zIGZyb20gJ29zJztcblxuXG5jb25zdCBTVVBQT1JURURfT1NYX1ZFUlNJT05TID0gWycxMC44JywgJzEwLjknLCAnMTAuMTAnLCAnMTAuMTEnLCAnMTAuMTInLCAnMTAuMTMnXTtcblxuZnVuY3Rpb24gaXNXaW5kb3dzICgpIHtcbiAgcmV0dXJuIG9zLnR5cGUoKSA9PT0gJ1dpbmRvd3NfTlQnO1xufVxuXG5mdW5jdGlvbiBpc01hYyAoKSB7XG4gIHJldHVybiBvcy50eXBlKCkgPT09ICdEYXJ3aW4nO1xufVxuXG5mdW5jdGlvbiBpc0xpbnV4ICgpIHtcbiAgcmV0dXJuICFpc1dpbmRvd3MoKSAmJiAhaXNNYWMoKTtcbn1cblxuZnVuY3Rpb24gaXNPU1dpbjY0ICgpIHtcbiAgcmV0dXJuIHByb2Nlc3MuYXJjaCA9PT0gJ3g2NCcgfHwgcHJvY2Vzcy5lbnYuaGFzT3duUHJvcGVydHkoJ1BST0NFU1NPUl9BUkNISVRFVzY0MzInKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gYXJjaCAoKSB7XG4gIGlmIChpc0xpbnV4KCkgfHwgaXNNYWMoKSkge1xuICAgIGxldCB7c3Rkb3V0fSA9IGF3YWl0IGV4ZWMoJ3VuYW1lJywgWyctbSddKTtcbiAgICByZXR1cm4gc3Rkb3V0LnRyaW0oKSA9PT0gJ2k2ODYnID8gJzMyJyA6ICc2NCc7XG4gIH0gZWxzZSBpZiAoaXNXaW5kb3dzKCkpIHtcbiAgICBsZXQgaXM2NCA9IHRoaXMuaXNPU1dpbjY0KCk7XG4gICAgcmV0dXJuIGlzNjQgPyAnNjQnIDogJzMyJztcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBtYWNPc3hWZXJzaW9uICgpIHtcbiAgbGV0IHN0ZG91dDtcbiAgdHJ5IHtcbiAgICBzdGRvdXQgPSAoYXdhaXQgZXhlYygnc3dfdmVycycsIFsnLXByb2R1Y3RWZXJzaW9uJ10pKS5zdGRvdXQudHJpbSgpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBkZXRlY3QgTWFjIE9TIFggVmVyc2lvbjogJHtlcnJ9YCk7XG4gIH1cblxuICBjb25zdCB2ZXIgPSBTVVBQT1JURURfT1NYX1ZFUlNJT05TLmZpbmQoKHYpID0+IHN0ZG91dC5zdGFydHNXaXRoKHYpKTtcbiAgaWYgKCF2ZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBkZXRlY3QgTWFjIE9TIFggVmVyc2lvbiBmcm9tIHN3X3ZlcnMgb3V0cHV0OiAnJHtzdGRvdXR9J2ApO1xuICB9XG5cbiAgcmV0dXJuIHZlcjtcbn1cblxuZXhwb3J0IHsgaXNXaW5kb3dzLCBpc01hYywgaXNMaW51eCwgaXNPU1dpbjY0LCBhcmNoLCBtYWNPc3hWZXJzaW9uIH07XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uIn0=
