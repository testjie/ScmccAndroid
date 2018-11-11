'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.createProxyServer = createProxyServer;
exports.addHandler = addHandler;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function createProxyServer(sessionId, port) {
  // Start an express server for proxying
  var app = new _express2['default']();
  app.use(_bodyParser2['default'].json());
  var server = app.listen(port);
  return { app: app, server: server };
}

var handlers = {
  post: {},
  get: {},
  'delete': {},
  put: {}
};

function addHandler(app, method, url, handler) {
  var _this = this;

  method = method.toLowerCase();
  if (!handlers[method][url]) {
    app[method](url, function (req, res) {
      return handlers[method][url].call(_this, req, res);
    });
  }
  handlers[method][url] = handler;
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcHJvdG9jb2wvaGVscGVycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O3VCQUFvQixTQUFTOzs7OzBCQUNOLGFBQWE7Ozs7QUFFN0IsU0FBUyxpQkFBaUIsQ0FBRSxTQUFTLEVBQUUsSUFBSSxFQUFFOztBQUVsRCxNQUFJLEdBQUcsR0FBRywwQkFBYSxDQUFDO0FBQ3hCLEtBQUcsQ0FBQyxHQUFHLENBQUMsd0JBQVcsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUMzQixNQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzlCLFNBQU8sRUFBQyxHQUFHLEVBQUgsR0FBRyxFQUFFLE1BQU0sRUFBTixNQUFNLEVBQUMsQ0FBQztDQUN0Qjs7QUFFRCxJQUFJLFFBQVEsR0FBRztBQUNiLE1BQUksRUFBRSxFQUFFO0FBQ1IsS0FBRyxFQUFFLEVBQUU7QUFDUCxZQUFRLEVBQUU7QUFDVixLQUFHLEVBQUUsRUFBRTtDQUNSLENBQUM7O0FBRUssU0FBUyxVQUFVLENBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFOzs7QUFDckQsUUFBTSxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUM5QixNQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQzFCLE9BQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsVUFBQyxHQUFHLEVBQUUsR0FBRzthQUFLLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLFFBQU8sR0FBRyxFQUFFLEdBQUcsQ0FBQztLQUFBLENBQUMsQ0FBQztHQUM1RTtBQUNELFVBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUM7Q0FDakMiLCJmaWxlIjoidGVzdC9wcm90b2NvbC9oZWxwZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcm94eVNlcnZlciAoc2Vzc2lvbklkLCBwb3J0KSB7XG4gIC8vIFN0YXJ0IGFuIGV4cHJlc3Mgc2VydmVyIGZvciBwcm94eWluZ1xuICBsZXQgYXBwID0gbmV3IEV4cHJlc3MoKTtcbiAgYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG4gIGxldCBzZXJ2ZXIgPSBhcHAubGlzdGVuKHBvcnQpO1xuICByZXR1cm4ge2FwcCwgc2VydmVyfTtcbn1cblxubGV0IGhhbmRsZXJzID0ge1xuICBwb3N0OiB7fSxcbiAgZ2V0OiB7fSxcbiAgZGVsZXRlOiB7fSxcbiAgcHV0OiB7fSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRIYW5kbGVyIChhcHAsIG1ldGhvZCwgdXJsLCBoYW5kbGVyKSB7XG4gIG1ldGhvZCA9IG1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuICBpZiAoIWhhbmRsZXJzW21ldGhvZF1bdXJsXSkge1xuICAgIGFwcFttZXRob2RdKHVybCwgKHJlcSwgcmVzKSA9PiBoYW5kbGVyc1ttZXRob2RdW3VybF0uY2FsbCh0aGlzLCByZXEsIHJlcykpO1xuICB9XG4gIGhhbmRsZXJzW21ldGhvZF1bdXJsXSA9IGhhbmRsZXI7XG59Il0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLiJ9
