'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _appiumBaseDriver = require('appium-base-driver');

var _driver = require('./driver');

var _driver2 = _interopRequireDefault(_driver);

function startServer() {
  var port = arguments.length <= 0 || arguments[0] === undefined ? 4884 : arguments[0];
  var host = arguments.length <= 1 || arguments[1] === undefined ? 'localhost' : arguments[1];
  var d, router, server;
  return _regeneratorRuntime.async(function startServer$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        d = new _driver2['default']({ port: port, host: host });
        router = (0, _appiumBaseDriver.routeConfiguringFunction)(d);
        server = (0, _appiumBaseDriver.server)(router, port, host);

        _logger2['default'].info('Android Uiautomator2 server listening on http://' + host + ':' + port);
        d.server = server;
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(server);

      case 7:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 8:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

exports['default'] = startServer;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9zZXJ2ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztzQkFBZ0IsVUFBVTs7OztnQ0FDcUMsb0JBQW9COztzQkFDN0MsVUFBVTs7OztBQUdoRCxTQUFlLFdBQVc7TUFBRSxJQUFJLHlEQUFDLElBQUk7TUFBRSxJQUFJLHlEQUFDLFdBQVc7TUFDakQsQ0FBQyxFQUNELE1BQU0sRUFDTixNQUFNOzs7O0FBRk4sU0FBQyxHQUFHLHdCQUE4QixFQUFDLElBQUksRUFBSixJQUFJLEVBQUUsSUFBSSxFQUFKLElBQUksRUFBQyxDQUFDO0FBQy9DLGNBQU0sR0FBRyxnREFBeUIsQ0FBQyxDQUFDO0FBQ3BDLGNBQU0sR0FBRyw4QkFBVyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQzs7QUFDM0MsNEJBQUksSUFBSSxzREFBb0QsSUFBSSxTQUFJLElBQUksQ0FBRyxDQUFDO0FBQzVFLFNBQUMsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDOzt5Q0FDTCxNQUFNOzs7Ozs7Ozs7O0NBQ3BCOztxQkFFYyxXQUFXIiwiZmlsZSI6ImxpYi9zZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbG9nIGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7IHNlcnZlciBhcyBiYXNlU2VydmVyLCByb3V0ZUNvbmZpZ3VyaW5nRnVuY3Rpb24gfSBmcm9tICdhcHBpdW0tYmFzZS1kcml2ZXInO1xuaW1wb3J0IEFuZHJvaWRVaWF1dG9tYXRvcjJEcml2ZXIgZnJvbSAnLi9kcml2ZXInO1xuXG5cbmFzeW5jIGZ1bmN0aW9uIHN0YXJ0U2VydmVyIChwb3J0PTQ4ODQsIGhvc3Q9J2xvY2FsaG9zdCcpIHtcbiAgbGV0IGQgPSBuZXcgQW5kcm9pZFVpYXV0b21hdG9yMkRyaXZlcih7cG9ydCwgaG9zdH0pO1xuICBsZXQgcm91dGVyID0gcm91dGVDb25maWd1cmluZ0Z1bmN0aW9uKGQpO1xuICBsZXQgc2VydmVyID0gYmFzZVNlcnZlcihyb3V0ZXIsIHBvcnQsIGhvc3QpO1xuICBsb2cuaW5mbyhgQW5kcm9pZCBVaWF1dG9tYXRvcjIgc2VydmVyIGxpc3RlbmluZyBvbiBodHRwOi8vJHtob3N0fToke3BvcnR9YCk7XG4gIGQuc2VydmVyID0gc2VydmVyO1xuICByZXR1cm4gYXdhaXQgc2VydmVyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdGFydFNlcnZlcjsiXSwic291cmNlUm9vdCI6Ii4uLy4uIn0=
