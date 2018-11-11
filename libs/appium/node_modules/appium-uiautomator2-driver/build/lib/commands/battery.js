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
 *                             -1 is returned if the actual value cannot be
 *                            retrieved from the system.
 * @property {number} state - Battery state. The following values are possible:
 *   BATTERY_STATUS_UNKNOWN = 1
 *   BATTERY_STATUS_CHARGING = 2
 *   BATTERY_STATUS_DISCHARGING = 3
 *   BATTERY_STATUS_NOT_CHARGING = 4
 *   BATTERY_STATUS_FULL = 5
 *   -1 is returned if the actual value cannot be retrieved from the system.
 */

/**
 * Reads the battery information from the device under test.
 *
 * @returns {BatteryInfo} The actual battery info
 */
commands.mobileGetBatteryInfo = function callee$0$0() {
  var result;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/appium/device/battery_info', 'GET', {}));

      case 2:
        result = context$1$0.sent;

        // Give it the same name as in iOS
        result.state = result.status;
        delete result.status;
        return context$1$0.abrupt('return', result);

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

_Object$assign(extensions, commands);
exports.commands = commands;
exports['default'] = extensions;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9iYXR0ZXJ5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLElBQUksVUFBVSxHQUFHLEVBQUU7SUFBRSxRQUFRLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCbkMsUUFBUSxDQUFDLG9CQUFvQixHQUFHO01BQ3hCLE1BQU07Ozs7O3lDQUFTLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyw2QkFBNkIsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDOzs7QUFBMUYsY0FBTTs7O0FBRVosY0FBTSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0FBQzdCLGVBQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQzs0Q0FDZCxNQUFNOzs7Ozs7O0NBQ2QsQ0FBQzs7QUFFRixlQUFjLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMzQixRQUFRLEdBQVIsUUFBUTtxQkFDRixVQUFVIiwiZmlsZSI6ImxpYi9jb21tYW5kcy9iYXR0ZXJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IGV4dGVuc2lvbnMgPSB7fSwgY29tbWFuZHMgPSB7fTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBCYXR0ZXJ5SW5mb1xuICpcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBsZXZlbCAtIEJhdHRlcnkgbGV2ZWwgaW4gcmFuZ2UgWzAuMCwgMS4wXSwgd2hlcmVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIDEuMCBtZWFucyAxMDAlIGNoYXJnZS5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtMSBpcyByZXR1cm5lZCBpZiB0aGUgYWN0dWFsIHZhbHVlIGNhbm5vdCBiZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0cmlldmVkIGZyb20gdGhlIHN5c3RlbS5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzdGF0ZSAtIEJhdHRlcnkgc3RhdGUuIFRoZSBmb2xsb3dpbmcgdmFsdWVzIGFyZSBwb3NzaWJsZTpcbiAqICAgQkFUVEVSWV9TVEFUVVNfVU5LTk9XTiA9IDFcbiAqICAgQkFUVEVSWV9TVEFUVVNfQ0hBUkdJTkcgPSAyXG4gKiAgIEJBVFRFUllfU1RBVFVTX0RJU0NIQVJHSU5HID0gM1xuICogICBCQVRURVJZX1NUQVRVU19OT1RfQ0hBUkdJTkcgPSA0XG4gKiAgIEJBVFRFUllfU1RBVFVTX0ZVTEwgPSA1XG4gKiAgIC0xIGlzIHJldHVybmVkIGlmIHRoZSBhY3R1YWwgdmFsdWUgY2Fubm90IGJlIHJldHJpZXZlZCBmcm9tIHRoZSBzeXN0ZW0uXG4gKi9cblxuLyoqXG4gKiBSZWFkcyB0aGUgYmF0dGVyeSBpbmZvcm1hdGlvbiBmcm9tIHRoZSBkZXZpY2UgdW5kZXIgdGVzdC5cbiAqXG4gKiBAcmV0dXJucyB7QmF0dGVyeUluZm99IFRoZSBhY3R1YWwgYmF0dGVyeSBpbmZvXG4gKi9cbmNvbW1hbmRzLm1vYmlsZUdldEJhdHRlcnlJbmZvID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLnVpYXV0b21hdG9yMi5qd3Byb3h5LmNvbW1hbmQoJy9hcHBpdW0vZGV2aWNlL2JhdHRlcnlfaW5mbycsICdHRVQnLCB7fSk7XG4gIC8vIEdpdmUgaXQgdGhlIHNhbWUgbmFtZSBhcyBpbiBpT1NcbiAgcmVzdWx0LnN0YXRlID0gcmVzdWx0LnN0YXR1cztcbiAgZGVsZXRlIHJlc3VsdC5zdGF0dXM7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5PYmplY3QuYXNzaWduKGV4dGVuc2lvbnMsIGNvbW1hbmRzKTtcbmV4cG9ydCB7IGNvbW1hbmRzIH07XG5leHBvcnQgZGVmYXVsdCBleHRlbnNpb25zO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLiJ9
