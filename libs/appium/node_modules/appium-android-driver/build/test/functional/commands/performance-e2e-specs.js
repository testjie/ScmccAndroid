'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _2 = require('../../..');

var _3 = _interopRequireDefault(_2);

var _libCommandsPerformance = require('../../../lib/commands/performance');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _desired = require('../desired');

var _desired2 = _interopRequireDefault(_desired);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var driver = undefined;
var caps = _lodash2['default'].defaults({
  appPackage: 'io.appium.android.apis',
  appActivity: '.view.TextFields'
}, _desired2['default']);

describe('performance', function () {
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          driver = new _3['default']();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.createSession(caps));

        case 3:
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
          return _regeneratorRuntime.awrap(driver.deleteSession());

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  describe('getPerformanceData', function () {
    it('should get the performancedata', function callee$2$0() {
      var capability;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.getPerformanceDataTypes());

          case 2:
            capability = context$3$0.sent;

            capability.should.eql(_lodash2['default'].keys(_libCommandsPerformance.SUPPORTED_PERFORMANCE_DATA_TYPES));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('should throw an Error for unsupported capability data type ', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.getPerformanceData(caps.appPackage, 'randominfo', 2).should.be.rejected);

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('should get the amount of cpu by user and kernel process', function callee$2$0() {
      var apiLevel, cpu, i;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.adb.getApiLevel());

          case 2:
            apiLevel = context$3$0.sent;

            if (!([21, 24, 25].indexOf(apiLevel) >= 0)) {
              context$3$0.next = 5;
              break;
            }

            return context$3$0.abrupt('return', this.skip());

          case 5:
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(driver.getPerformanceData(caps.appPackage, 'cpuinfo', 50));

          case 7:
            cpu = context$3$0.sent;

            Array.isArray(cpu).should.be['true'];
            cpu.length.should.be.above(1);
            cpu[0].should.eql(_libCommandsPerformance.CPU_KEYS);
            if (cpu.length > 1) {
              for (i = 1; i < cpu.length; i++) {
                cpu[0].length.should.equal(cpu[i].length);
              }
            }

          case 12:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should get the amount of memory used by the process', function callee$2$0() {
      var memory, i;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.getPerformanceData(caps.appPackage, 'memoryinfo', 2));

          case 2:
            memory = context$3$0.sent;

            Array.isArray(memory).should.be['true'];
            memory.length.should.be.above(1);
            memory[0].should.eql(_libCommandsPerformance.MEMORY_KEYS);
            if (memory.length > 1) {
              for (i = 1; i < memory.length; i++) {
                memory[0].length.should.equal(memory[i].length);
              }
            }

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should get the remaining battery power', function callee$2$0() {
      var battery, i;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.getPerformanceData(caps.appPackage, 'batteryinfo', 2));

          case 2:
            battery = context$3$0.sent;

            Array.isArray(battery).should.be['true'];
            battery.length.should.be.above(1);
            battery[0].should.eql(_libCommandsPerformance.BATTERY_KEYS);
            if (battery.length > 1) {
              for (i = 1; i < battery.length; i++) {
                battery[0].length.should.equal(battery[i].length);
              }
            }

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should get the network statistics', function callee$2$0() {
      var network, compare, j, i;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.adb.getApiLevel());

          case 2:
            context$3$0.t0 = context$3$0.sent;

            if (!(context$3$0.t0 === 22)) {
              context$3$0.next = 5;
              break;
            }

            return context$3$0.abrupt('return', this.skip());

          case 5:
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(driver.getPerformanceData(caps.appPackage, 'networkinfo', 2));

          case 7:
            network = context$3$0.sent;

            Array.isArray(network).should.be['true'];
            network.length.should.be.above(1);

            compare = false;

            for (j = 0; j < _libCommandsPerformance.NETWORK_KEYS.length; ++j) {
              if (_lodash2['default'].isEqual(_libCommandsPerformance.NETWORK_KEYS[j], network[0])) {
                compare = true;
              }
            }

            compare.should.equal(true);

            if (network.length > 1) {
              for (i = 1; i < network.length; ++i) {
                network[0].length.should.equal(network[i].length);
              }
            }

          case 14:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});

// TODO: why does this fail?

// TODO: why does adb fail with a null pointer exception on 5.1
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9wZXJmb3JtYW5jZS1lMmUtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztpQkFDbkIsVUFBVTs7OztzQ0FDZ0UsbUNBQW1DOztzQkFDekgsUUFBUTs7Ozt1QkFDRyxZQUFZOzs7O0FBR3JDLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsSUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLElBQUksSUFBSSxHQUFHLG9CQUFFLFFBQVEsQ0FBQztBQUNwQixZQUFVLEVBQUUsd0JBQXdCO0FBQ3BDLGFBQVcsRUFBRSxrQkFBa0I7Q0FDaEMsdUJBQWUsQ0FBQzs7QUFFakIsUUFBUSxDQUFDLGFBQWEsRUFBRSxZQUFZO0FBQ2xDLFFBQU0sQ0FBQzs7OztBQUNMLGdCQUFNLEdBQUcsbUJBQW1CLENBQUM7OzJDQUN2QixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQzs7Ozs7OztHQUNqQyxDQUFDLENBQUM7QUFDSCxPQUFLLENBQUM7Ozs7OzJDQUNFLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7R0FDN0IsQ0FBQyxDQUFDOztBQUVILFVBQVEsQ0FBQyxvQkFBb0IsRUFBRSxZQUFZO0FBQ3pDLE1BQUUsQ0FBQyxnQ0FBZ0MsRUFBRTtVQUMvQixVQUFVOzs7Ozs2Q0FBUyxNQUFNLENBQUMsdUJBQXVCLEVBQUU7OztBQUFuRCxzQkFBVTs7QUFDZCxzQkFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsb0JBQUUsSUFBSSwwREFBa0MsQ0FBQyxDQUFDOzs7Ozs7O0tBQ2pFLENBQUMsQ0FBQzs7QUFFSCxNQUFFLENBQUMsNkRBQTZELEVBQUU7Ozs7OzZDQUMxRCxNQUFNLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxD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TyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRTtBQUN2Qyx1QkFBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztlQUNuRDthQUNGOzs7Ozs7O0tBQ0YsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9wZXJmb3JtYW5jZS1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCBBbmRyb2lkRHJpdmVyIGZyb20gJy4uLy4uLy4uJztcbmltcG9ydCB7IFNVUFBPUlRFRF9QRVJGT1JNQU5DRV9EQVRBX1RZUEVTLCBDUFVfS0VZUywgTUVNT1JZX0tFWVMsIEJBVFRFUllfS0VZUywgTkVUV09SS19LRVlTIH0gZnJvbSAnLi4vLi4vLi4vbGliL2NvbW1hbmRzL3BlcmZvcm1hbmNlJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgREVGQVVMVF9DQVBTIGZyb20gJy4uL2Rlc2lyZWQnO1xuXG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmxldCBkcml2ZXI7XG5sZXQgY2FwcyA9IF8uZGVmYXVsdHMoe1xuICBhcHBQYWNrYWdlOiAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcycsXG4gIGFwcEFjdGl2aXR5OiAnLnZpZXcuVGV4dEZpZWxkcydcbn0sIERFRkFVTFRfQ0FQUyk7XG5cbmRlc2NyaWJlKCdwZXJmb3JtYW5jZScsIGZ1bmN0aW9uICgpIHtcbiAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGNhcHMpO1xuICB9KTtcbiAgYWZ0ZXIoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdnZXRQZXJmb3JtYW5jZURhdGEnLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ3Nob3VsZCBnZXQgdGhlIHBlcmZvcm1hbmNlZGF0YScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBjYXBhYmlsaXR5ID0gYXdhaXQgZHJpdmVyLmdldFBlcmZvcm1hbmNlRGF0YVR5cGVzKCk7XG4gICAgICBjYXBhYmlsaXR5LnNob3VsZC5lcWwoXy5rZXlzKFNVUFBPUlRFRF9QRVJGT1JNQU5DRV9EQVRBX1RZUEVTKSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHRocm93IGFuIEVycm9yIGZvciB1bnN1cHBvcnRlZCBjYXBhYmlsaXR5IGRhdGEgdHlwZSAnLCBhc3luYyBmdW5jdGlvbiAgKCkge1xuICAgICAgYXdhaXQgZHJpdmVyLmdldFBlcmZvcm1hbmNlRGF0YShjYXBzLmFwcFBhY2thZ2UsICdyYW5kb21pbmZvJywgMikuc2hvdWxkLmJlLnJlamVjdGVkO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBnZXQgdGhlIGFtb3VudCBvZiBjcHUgYnkgdXNlciBhbmQga2VybmVsIHByb2Nlc3MnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBUT0RPOiB3aHkgZG9lcyB0aGlzIGZhaWw/XG4gICAgICBsZXQgYXBpTGV2ZWwgPSBhd2FpdCBkcml2ZXIuYWRiLmdldEFwaUxldmVsKCk7XG4gICAgICBpZiAoWzIxLCAyNCwgMjVdLmluZGV4T2YoYXBpTGV2ZWwpID49IDApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2tpcCgpO1xuICAgICAgfVxuICAgICAgbGV0IGNwdSA9IGF3YWl0IGRyaXZlci5nZXRQZXJmb3JtYW5jZURhdGEoY2Fwcy5hcHBQYWNrYWdlLCAnY3B1aW5mbycsIDUwKTtcblxuICAgICAgQXJyYXkuaXNBcnJheShjcHUpLnNob3VsZC5iZS50cnVlO1xuICAgICAgY3B1Lmxlbmd0aC5zaG91bGQuYmUuYWJvdmUoMSk7XG4gICAgICBjcHVbMF0uc2hvdWxkLmVxbChDUFVfS0VZUyk7XG4gICAgICBpZiAoY3B1Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBjcHUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjcHVbMF0ubGVuZ3RoLnNob3VsZC5lcXVhbChjcHVbaV0ubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgZ2V0IHRoZSBhbW91bnQgb2YgbWVtb3J5IHVzZWQgYnkgdGhlIHByb2Nlc3MnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgbWVtb3J5ID0gYXdhaXQgZHJpdmVyLmdldFBlcmZvcm1hbmNlRGF0YShjYXBzLmFwcFBhY2thZ2UsICdtZW1vcnlpbmZvJywgMik7XG5cbiAgICAgIEFycmF5LmlzQXJyYXkobWVtb3J5KS5zaG91bGQuYmUudHJ1ZTtcbiAgICAgIG1lbW9yeS5sZW5ndGguc2hvdWxkLmJlLmFib3ZlKDEpO1xuICAgICAgbWVtb3J5WzBdLnNob3VsZC5lcWwoTUVNT1JZX0tFWVMpO1xuICAgICAgaWYgKG1lbW9yeS5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbWVtb3J5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgbWVtb3J5WzBdLmxlbmd0aC5zaG91bGQuZXF1YWwobWVtb3J5W2ldLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGdldCB0aGUgcmVtYWluaW5nIGJhdHRlcnkgcG93ZXInLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgYmF0dGVyeSA9IGF3YWl0IGRyaXZlci5nZXRQZXJmb3JtYW5jZURhdGEoY2Fwcy5hcHBQYWNrYWdlLCAnYmF0dGVyeWluZm8nLCAyKTtcblxuICAgICAgQXJyYXkuaXNBcnJheShiYXR0ZXJ5KS5zaG91bGQuYmUudHJ1ZTtcbiAgICAgIGJhdHRlcnkubGVuZ3RoLnNob3VsZC5iZS5hYm92ZSgxKTtcbiAgICAgIGJhdHRlcnlbMF0uc2hvdWxkLmVxbChCQVRURVJZX0tFWVMpO1xuICAgICAgaWYgKGJhdHRlcnkubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGJhdHRlcnkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBiYXR0ZXJ5WzBdLmxlbmd0aC5zaG91bGQuZXF1YWwoYmF0dGVyeVtpXS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBnZXQgdGhlIG5ldHdvcmsgc3RhdGlzdGljcycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIFRPRE86IHdoeSBkb2VzIGFkYiBmYWlsIHdpdGggYSBudWxsIHBvaW50ZXIgZXhjZXB0aW9uIG9uIDUuMVxuICAgICAgaWYgKGF3YWl0IGRyaXZlci5hZGIuZ2V0QXBpTGV2ZWwoKSA9PT0gMjIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2tpcCgpO1xuICAgICAgfVxuICAgICAgbGV0IG5ldHdvcmsgPSBhd2FpdCBkcml2ZXIuZ2V0UGVyZm9ybWFuY2VEYXRhKGNhcHMuYXBwUGFja2FnZSwgJ25ldHdvcmtpbmZvJywgMik7XG5cbiAgICAgIEFycmF5LmlzQXJyYXkobmV0d29yaykuc2hvdWxkLmJlLnRydWU7XG4gICAgICBuZXR3b3JrLmxlbmd0aC5zaG91bGQuYmUuYWJvdmUoMSk7XG5cbiAgICAgIGxldCBjb21wYXJlID0gZmFsc2U7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IE5FVFdPUktfS0VZUy5sZW5ndGg7ICsraikge1xuICAgICAgICBpZiAoXy5pc0VxdWFsKE5FVFdPUktfS0VZU1tqXSwgbmV0d29ya1swXSkpIHtcbiAgICAgICAgICBjb21wYXJlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb21wYXJlLnNob3VsZC5lcXVhbCh0cnVlKTtcblxuICAgICAgaWYgKG5ldHdvcmsubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IG5ldHdvcmsubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBuZXR3b3JrWzBdLmxlbmd0aC5zaG91bGQuZXF1YWwobmV0d29ya1tpXS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uIn0=
