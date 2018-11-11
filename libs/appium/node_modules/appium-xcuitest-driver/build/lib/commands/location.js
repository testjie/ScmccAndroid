'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _teen_process = require('teen_process');

var _appiumSupport = require('appium-support');

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var IDEVICELOCATION = 'idevicelocation';

var commands = {};

function formatLocationArg(value) {
  value = ('' + value).trim();
  // Negative coordinate values should be properly formatted
  if (value.startsWith('-')) {
    return ['--', value];
  }
  return [value];
}

commands.setGeoLocation = function callee$0$0(location) {
  var latitude, longitude, args;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        latitude = location.latitude;
        longitude = location.longitude;

        if (!_appiumSupport.util.hasValue(latitude) || !_appiumSupport.util.hasValue(longitude)) {
          _logger2['default'].errorAndThrow('Both latitude and longitude should be set');
        }

        if (!this.isSimulator()) {
          context$1$0.next = 7;
          break;
        }

        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.opts.device.setGeolocation('' + latitude, '' + longitude));

      case 6:
        return context$1$0.abrupt('return');

      case 7:
        context$1$0.prev = 7;
        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.which(IDEVICELOCATION));

      case 10:
        context$1$0.next = 15;
        break;

      case 12:
        context$1$0.prev = 12;
        context$1$0.t0 = context$1$0['catch'](7);

        _logger2['default'].errorAndThrow(IDEVICELOCATION + ' doesn\'t exist on the host. ' + 'Check https://github.com/JonGabilondoAngulo/idevicelocation on how to install the tool.');

      case 15:
        args = ['-u', this.opts.udid];

        args.push.apply(args, _toConsumableArray(formatLocationArg(latitude)));
        args.push.apply(args, _toConsumableArray(formatLocationArg(longitude)));
        context$1$0.prev = 18;
        context$1$0.next = 21;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(IDEVICELOCATION, args));

      case 21:
        context$1$0.next = 26;
        break;

      case 23:
        context$1$0.prev = 23;
        context$1$0.t1 = context$1$0['catch'](18);

        _logger2['default'].errorAndThrow('Can\'t set the location on device \'' + this.opts.udid + '\'. Original error: ' + context$1$0.t1.message);

      case 26:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[7, 12], [18, 23]]);
};

exports.commands = commands;
exports['default'] = commands;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9sb2NhdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7NEJBQXFCLGNBQWM7OzZCQUNWLGdCQUFnQjs7c0JBQ3pCLFdBQVc7Ozs7QUFFM0IsSUFBTSxlQUFlLEdBQUcsaUJBQWlCLENBQUM7O0FBRTFDLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQzs7QUFFbEIsU0FBUyxpQkFBaUIsQ0FBRSxLQUFLLEVBQUU7QUFDakMsT0FBSyxHQUFHLE1BQUcsS0FBSyxFQUFHLElBQUksRUFBRSxDQUFDOztBQUUxQixNQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDekIsV0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztHQUN0QjtBQUNELFNBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUNoQjs7QUFFRCxRQUFRLENBQUMsY0FBYyxHQUFHLG9CQUFnQixRQUFRO01BQzNDLFFBQVEsRUFBRSxTQUFTLEVBaUJsQixJQUFJOzs7O0FBakJMLGdCQUFRLEdBQWUsUUFBUSxDQUEvQixRQUFRO0FBQUUsaUJBQVMsR0FBSSxRQUFRLENBQXJCLFNBQVM7O0FBRXhCLFlBQUksQ0FBQyxvQkFBSyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxvQkFBSyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7QUFDekQsOEJBQUksYUFBYSw2Q0FBNkMsQ0FBQztTQUNoRTs7YUFFRyxJQUFJLENBQUMsV0FBVyxFQUFFOzs7Ozs7eUNBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxNQUFJLFFBQVEsT0FBTyxTQUFTLENBQUc7Ozs7Ozs7O3lDQUs5RCxrQkFBRyxLQUFLLENBQUMsZUFBZSxDQUFDOzs7Ozs7Ozs7O0FBRS9CLDRCQUFJLGFBQWEsQ0FBQyxBQUFHLGVBQWUscUNBQ2xCLHlGQUF5RixDQUFDLENBQUM7OztBQUV6RyxZQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7O0FBQ25DLFlBQUksQ0FBQyxJQUFJLE1BQUEsQ0FBVCxJQUFJLHFCQUFTLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxFQUFDLENBQUM7QUFDMUMsWUFBSSxDQUFDLElBQUksTUFBQSxDQUFULElBQUkscUJBQVMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLEVBQUMsQ0FBQzs7O3lDQUVuQyx3QkFBSyxlQUFlLEVBQUUsSUFBSSxDQUFDOzs7Ozs7Ozs7O0FBRWpDLDRCQUFJLGFBQWEsMENBQXNDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSw0QkFBc0IsZUFBRSxPQUFPLENBQUcsQ0FBQzs7Ozs7OztDQUUzRyxDQUFDOztRQUVPLFFBQVEsR0FBUixRQUFRO3FCQUNGLFFBQVEiLCJmaWxlIjoibGliL2NvbW1hbmRzL2xvY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXhlYyB9IGZyb20gJ3RlZW5fcHJvY2Vzcyc7XG5pbXBvcnQgeyBmcywgdXRpbCB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCBsb2cgZnJvbSAnLi4vbG9nZ2VyJztcblxuY29uc3QgSURFVklDRUxPQ0FUSU9OID0gJ2lkZXZpY2Vsb2NhdGlvbic7XG5cbmxldCBjb21tYW5kcyA9IHt9O1xuXG5mdW5jdGlvbiBmb3JtYXRMb2NhdGlvbkFyZyAodmFsdWUpIHtcbiAgdmFsdWUgPSBgJHt2YWx1ZX1gLnRyaW0oKTtcbiAgLy8gTmVnYXRpdmUgY29vcmRpbmF0ZSB2YWx1ZXMgc2hvdWxkIGJlIHByb3Blcmx5IGZvcm1hdHRlZFxuICBpZiAodmFsdWUuc3RhcnRzV2l0aCgnLScpKSB7XG4gICAgcmV0dXJuIFsnLS0nLCB2YWx1ZV07XG4gIH1cbiAgcmV0dXJuIFt2YWx1ZV07XG59XG5cbmNvbW1hbmRzLnNldEdlb0xvY2F0aW9uID0gYXN5bmMgZnVuY3Rpb24gKGxvY2F0aW9uKSB7XG4gIGxldCB7bGF0aXR1ZGUsIGxvbmdpdHVkZX0gPSBsb2NhdGlvbjtcblxuICBpZiAoIXV0aWwuaGFzVmFsdWUobGF0aXR1ZGUpIHx8ICF1dGlsLmhhc1ZhbHVlKGxvbmdpdHVkZSkpIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgQm90aCBsYXRpdHVkZSBhbmQgbG9uZ2l0dWRlIHNob3VsZCBiZSBzZXRgKTtcbiAgfVxuXG4gIGlmICh0aGlzLmlzU2ltdWxhdG9yKCkpIHtcbiAgICBhd2FpdCB0aGlzLm9wdHMuZGV2aWNlLnNldEdlb2xvY2F0aW9uKGAke2xhdGl0dWRlfWAsIGAke2xvbmdpdHVkZX1gKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB0cnkge1xuICAgIGF3YWl0IGZzLndoaWNoKElERVZJQ0VMT0NBVElPTik7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgJHtJREVWSUNFTE9DQVRJT059IGRvZXNuJ3QgZXhpc3Qgb24gdGhlIGhvc3QuIGAgK1xuICAgICAgICAgICAgICAgICAgICAgICdDaGVjayBodHRwczovL2dpdGh1Yi5jb20vSm9uR2FiaWxvbmRvQW5ndWxvL2lkZXZpY2Vsb2NhdGlvbiBvbiBob3cgdG8gaW5zdGFsbCB0aGUgdG9vbC4nKTtcbiAgfVxuICBjb25zdCBhcmdzID0gWyctdScsIHRoaXMub3B0cy51ZGlkXTtcbiAgYXJncy5wdXNoKC4uLmZvcm1hdExvY2F0aW9uQXJnKGxhdGl0dWRlKSk7XG4gIGFyZ3MucHVzaCguLi5mb3JtYXRMb2NhdGlvbkFyZyhsb25naXR1ZGUpKTtcbiAgdHJ5IHtcbiAgICBhd2FpdCBleGVjKElERVZJQ0VMT0NBVElPTiwgYXJncyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgQ2FuJ3Qgc2V0IHRoZSBsb2NhdGlvbiBvbiBkZXZpY2UgJyR7dGhpcy5vcHRzLnVkaWR9Jy4gT3JpZ2luYWwgZXJyb3I6ICR7ZS5tZXNzYWdlfWApO1xuICB9XG59O1xuXG5leHBvcnQgeyBjb21tYW5kcyB9O1xuZXhwb3J0IGRlZmF1bHQgY29tbWFuZHM7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uIn0=
