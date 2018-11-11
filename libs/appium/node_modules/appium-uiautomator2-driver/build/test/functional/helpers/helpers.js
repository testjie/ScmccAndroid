'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _teen_process = require('teen_process');

function getLocale(adb) {
  return _regeneratorRuntime.async(function getLocale$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(adb.getApiLevel());

      case 2:
        context$1$0.t0 = context$1$0.sent;

        if (!(context$1$0.t0 < 23)) {
          context$1$0.next = 9;
          break;
        }

        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(adb.getDeviceCountry());

      case 6:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 9:
        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(adb.getDeviceLocale());

      case 11:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 12:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function isArmEmu() {
  var archCmd, serialCmd, _ref, arch, _ref2, serial;

  return _regeneratorRuntime.async(function isArmEmu$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        archCmd = ['adb', 'shell getprop ro.product.cpu.abi'.split(" ")];
        serialCmd = ['adb', ['get-serialno']];
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(_teen_process.exec.apply(undefined, archCmd));

      case 4:
        _ref = context$1$0.sent;
        arch = _ref.stdout;
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(_teen_process.exec.apply(undefined, serialCmd));

      case 8:
        _ref2 = context$1$0.sent;
        serial = _ref2.stdout;

        if (!(arch.indexOf('arm') !== -1 && serial.indexOf('emulator') === 0)) {
          context$1$0.next = 12;
          break;
        }

        return context$1$0.abrupt('return', true);

      case 12:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

exports.getLocale = getLocale;
exports.isArmEmu = isArmEmu;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9oZWxwZXJzL2hlbHBlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7NEJBQXFCLGNBQWM7O0FBRW5DLFNBQWUsU0FBUyxDQUFFLEdBQUc7Ozs7O3lDQUNqQixHQUFHLENBQUMsV0FBVyxFQUFFOzs7OzsrQkFBRyxFQUFFOzs7Ozs7eUNBQ2pCLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTs7Ozs7Ozt5Q0FFdEIsR0FBRyxDQUFDLGVBQWUsRUFBRTs7Ozs7Ozs7OztDQUVyQzs7QUFFRCxTQUFlLFFBQVE7TUFDZixPQUFPLEVBQ1AsU0FBUyxRQUNBLElBQUksU0FDSixNQUFNOzs7OztBQUhmLGVBQU8sR0FBRyxDQUFDLEtBQUssRUFBRSxrQ0FBa0MsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDaEUsaUJBQVMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDOzt5Q0FDZCxvQ0FBUSxPQUFPLENBQUM7Ozs7QUFBOUIsWUFBSSxRQUFaLE1BQU07O3lDQUNrQixvQ0FBUSxTQUFTLENBQUM7Ozs7QUFBbEMsY0FBTSxTQUFkLE1BQU07O2NBQ1QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTs7Ozs7NENBQ3pELElBQUk7Ozs7Ozs7Q0FFZDs7UUFFUSxTQUFTLEdBQVQsU0FBUztRQUFFLFFBQVEsR0FBUixRQUFRIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9oZWxwZXJzL2hlbHBlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleGVjIH0gZnJvbSAndGVlbl9wcm9jZXNzJztcblxuYXN5bmMgZnVuY3Rpb24gZ2V0TG9jYWxlIChhZGIpIHtcbiAgaWYgKGF3YWl0IGFkYi5nZXRBcGlMZXZlbCgpIDwgMjMpIHtcbiAgICByZXR1cm4gYXdhaXQgYWRiLmdldERldmljZUNvdW50cnkoKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYXdhaXQgYWRiLmdldERldmljZUxvY2FsZSgpO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGlzQXJtRW11ICgpIHtcbiAgY29uc3QgYXJjaENtZCA9IFsnYWRiJywgJ3NoZWxsIGdldHByb3Agcm8ucHJvZHVjdC5jcHUuYWJpJy5zcGxpdChcIiBcIildO1xuICBjb25zdCBzZXJpYWxDbWQgPSBbJ2FkYicsIFsnZ2V0LXNlcmlhbG5vJ11dO1xuICBjb25zdCB7c3Rkb3V0OiBhcmNofSA9IGF3YWl0IGV4ZWMoLi4uYXJjaENtZCk7XG4gIGNvbnN0IHtzdGRvdXQ6IHNlcmlhbH0gPSBhd2FpdCBleGVjKC4uLnNlcmlhbENtZCk7XG4gIGlmIChhcmNoLmluZGV4T2YoJ2FybScpICE9PSAtMSAmJiBzZXJpYWwuaW5kZXhPZignZW11bGF0b3InKSA9PT0gMCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cbmV4cG9ydCB7IGdldExvY2FsZSwgaXNBcm1FbXUgfTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4ifQ==
