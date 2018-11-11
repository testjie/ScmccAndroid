'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
var extensions = {},
    commands = {};

/**
 * @typedef {Object} BatteryInfo
 *
 * @property {number} level - Battery level in range [0.0, 1.0], where
 *                            1.0 means 100% charge.
 * @property {number} state - Battery state. The following values are possible:
 *   UIDeviceBatteryStateUnknown = 0
 *   UIDeviceBatteryStateUnplugged = 1  // on battery, discharging
 *   UIDeviceBatteryStateCharging = 2   // plugged in, less than 100%
 *   UIDeviceBatteryStateFull = 3       // plugged in, at 100%
 */

/**
 * Reads the battery information from the device under test.
 * This endpoint only returns reliable result on real devices.
 *
 * @returns {BatteryInfo} The actual battery info
 */
commands.mobileGetBatteryInfo = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.proxyCommand('/wda/batteryInfo', 'GET'));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

_Object$assign(extensions, commands);
exports.commands = commands;
exports['default'] = extensions;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9iYXR0ZXJ5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLElBQUksVUFBVSxHQUFHLEVBQUU7SUFBRSxRQUFRLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CbkMsUUFBUSxDQUFDLG9CQUFvQixHQUFHOzs7Ozt5Q0FDakIsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLENBQUM7Ozs7Ozs7Ozs7Q0FDMUQsQ0FBQzs7QUFFRixlQUFjLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMzQixRQUFRLEdBQVIsUUFBUTtxQkFDRixVQUFVIiwiZmlsZSI6ImxpYi9jb21tYW5kcy9iYXR0ZXJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IGV4dGVuc2lvbnMgPSB7fSwgY29tbWFuZHMgPSB7fTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBCYXR0ZXJ5SW5mb1xuICpcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBsZXZlbCAtIEJhdHRlcnkgbGV2ZWwgaW4gcmFuZ2UgWzAuMCwgMS4wXSwgd2hlcmVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIDEuMCBtZWFucyAxMDAlIGNoYXJnZS5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzdGF0ZSAtIEJhdHRlcnkgc3RhdGUuIFRoZSBmb2xsb3dpbmcgdmFsdWVzIGFyZSBwb3NzaWJsZTpcbiAqICAgVUlEZXZpY2VCYXR0ZXJ5U3RhdGVVbmtub3duID0gMFxuICogICBVSURldmljZUJhdHRlcnlTdGF0ZVVucGx1Z2dlZCA9IDEgIC8vIG9uIGJhdHRlcnksIGRpc2NoYXJnaW5nXG4gKiAgIFVJRGV2aWNlQmF0dGVyeVN0YXRlQ2hhcmdpbmcgPSAyICAgLy8gcGx1Z2dlZCBpbiwgbGVzcyB0aGFuIDEwMCVcbiAqICAgVUlEZXZpY2VCYXR0ZXJ5U3RhdGVGdWxsID0gMyAgICAgICAvLyBwbHVnZ2VkIGluLCBhdCAxMDAlXG4gKi9cblxuLyoqXG4gKiBSZWFkcyB0aGUgYmF0dGVyeSBpbmZvcm1hdGlvbiBmcm9tIHRoZSBkZXZpY2UgdW5kZXIgdGVzdC5cbiAqIFRoaXMgZW5kcG9pbnQgb25seSByZXR1cm5zIHJlbGlhYmxlIHJlc3VsdCBvbiByZWFsIGRldmljZXMuXG4gKlxuICogQHJldHVybnMge0JhdHRlcnlJbmZvfSBUaGUgYWN0dWFsIGJhdHRlcnkgaW5mb1xuICovXG5jb21tYW5kcy5tb2JpbGVHZXRCYXR0ZXJ5SW5mbyA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMucHJveHlDb21tYW5kKCcvd2RhL2JhdHRlcnlJbmZvJywgJ0dFVCcpO1xufTtcblxuT2JqZWN0LmFzc2lnbihleHRlbnNpb25zLCBjb21tYW5kcyk7XG5leHBvcnQgeyBjb21tYW5kcyB9O1xuZXhwb3J0IGRlZmF1bHQgZXh0ZW5zaW9ucztcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4ifQ==
