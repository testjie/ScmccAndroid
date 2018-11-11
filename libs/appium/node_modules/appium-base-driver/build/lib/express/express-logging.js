'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

require('colors');

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

// Copied the morgan compile function over so that cooler formats
// may be configured
function compile(fmt) {
  // escape quotes
  fmt = fmt.replace(/"/g, '\\"');
  fmt = fmt.replace(/:([-\w]{2,})(?:\[([^\]]+)\])?/g, function (_, name, arg) {
    return '"\n    + (tokens["' + name + '"](req, res, "' + arg + '") || "-") + "';
  });
  var js = '  return "' + fmt + '";';
  return new Function('tokens, req, res', js);
}

function requestEndLoggingFormat(tokens, req, res) {
  var status = res.statusCode;
  var statusStr = ':status';
  if (status >= 500) {
    statusStr = statusStr.red;
  } else if (status >= 400) {
    statusStr = statusStr.yellow;
  } else if (status >= 300) {
    statusStr = statusStr.cyan;
  } else {
    statusStr = statusStr.green;
  }
  var fn = compile('' + '<-- :method :url '.white + statusStr + ' ' + ':response-time ms - :res[content-length]'.grey);
  return fn(tokens, req, res);
}

var endLogFormatter = (0, _morgan2['default'])(function (tokens, req, res) {
  _logger2['default'].info(requestEndLoggingFormat(tokens, req, res), (res.jsonResp || '').grey);
});

var requestStartLoggingFormat = compile('-->'.white + ' ' + ':method'.white + ' ' + ':url'.white);

var startLogFormatter = (0, _morgan2['default'])(function (tokens, req, res) {
  // morgan output is redirected straight to winston
  var data = '';
  try {
    if (req.body) {
      data = JSON.stringify(req.body).substring(0, 1000);
    }
  } catch (ign) {}
  _logger2['default'].info(requestStartLoggingFormat(tokens, req, res), data.grey);
}, { immediate: true });

exports.endLogFormatter = endLogFormatter;
exports.startLogFormatter = startLogFormatter;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9leHByZXNzL2V4cHJlc3MtbG9nZ2luZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztRQUFPLFFBQVE7O3NCQUNJLFFBQVE7Ozs7c0JBQ1gsVUFBVTs7Ozs7O0FBSzFCLFNBQVMsT0FBTyxDQUFFLEdBQUcsRUFBRTs7QUFFckIsS0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQy9CLEtBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLGdDQUFnQyxFQUNoRCxVQUFVLENBQUMsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFO0FBQ3RCLGtDQUE0QixJQUFJLHNCQUFpQixHQUFHLG9CQUFpQjtHQUN0RSxDQUFDLENBQUM7QUFDTCxNQUFJLEVBQUUsa0JBQWdCLEdBQUcsT0FBSSxDQUFDO0FBQzlCLFNBQU8sSUFBSSxRQUFRLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxDQUFDLENBQUM7Q0FDN0M7O0FBRUQsU0FBUyx1QkFBdUIsQ0FBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUNsRCxNQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDO0FBQzVCLE1BQUksU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUMxQixNQUFJLE1BQU0sSUFBSSxHQUFHLEVBQUU7QUFDakIsYUFBUyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUM7R0FDM0IsTUFBTSxJQUFJLE1BQU0sSUFBSSxHQUFHLEVBQUU7QUFDeEIsYUFBUyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7R0FDOUIsTUFBTSxJQUFJLE1BQU0sSUFBSSxHQUFHLEVBQUU7QUFDeEIsYUFBUyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7R0FDNUIsTUFBTTtBQUNMLGFBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDO0dBQzdCO0FBQ0QsTUFBSSxFQUFFLEdBQUcsT0FBTyxNQUFJLG1CQUFtQixDQUFDLEtBQUssR0FBRyxTQUFTLFNBQUksMENBQTBDLENBQUMsSUFBSSxDQUFHLENBQUM7QUFDaEgsU0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztDQUM3Qjs7QUFFRCxJQUFNLGVBQWUsR0FBRyx5QkFBTyxVQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFLO0FBQ25ELHNCQUFJLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUNoRCxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFBLENBQUUsSUFBSSxDQUFDLENBQUM7Q0FDOUIsQ0FBQyxDQUFDOztBQUVILElBQU0seUJBQXlCLEdBQUcsT0FBTyxDQUFJLEtBQUssQ0FBQyxLQUFLLFNBQUksU0FBUyxDQUFDLEtBQUssU0FBSSxNQUFNLENBQUMsS0FBSyxDQUFHLENBQUM7O0FBRS9GLElBQU0saUJBQWlCLEdBQUcseUJBQU8sVUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBSzs7QUFFckQsTUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2QsTUFBSTtBQUNGLFFBQUksR0FBRyxDQUFDLElBQUksRUFBRTtBQUNaLFVBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ3BEO0dBQ0YsQ0FBQyxPQUFPLEdBQUcsRUFBRSxFQUFFO0FBQ2hCLHNCQUFJLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUNsRSxFQUFFLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7O1FBRWIsZUFBZSxHQUFmLGVBQWU7UUFBRSxpQkFBaUIsR0FBakIsaUJBQWlCIiwiZmlsZSI6ImxpYi9leHByZXNzL2V4cHJlc3MtbG9nZ2luZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnY29sb3JzJztcbmltcG9ydCBtb3JnYW4gZnJvbSAnbW9yZ2FuJztcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2dnZXInO1xuXG5cbi8vIENvcGllZCB0aGUgbW9yZ2FuIGNvbXBpbGUgZnVuY3Rpb24gb3ZlciBzbyB0aGF0IGNvb2xlciBmb3JtYXRzXG4vLyBtYXkgYmUgY29uZmlndXJlZFxuZnVuY3Rpb24gY29tcGlsZSAoZm10KSB7XG4gIC8vIGVzY2FwZSBxdW90ZXNcbiAgZm10ID0gZm10LnJlcGxhY2UoL1wiL2csICdcXFxcXCInKTtcbiAgZm10ID0gZm10LnJlcGxhY2UoLzooWy1cXHddezIsfSkoPzpcXFsoW15cXF1dKylcXF0pPy9nLFxuICAgIGZ1bmN0aW9uIChfLCBuYW1lLCBhcmcpIHtcbiAgICAgIHJldHVybiBgXCJcXG4gICAgKyAodG9rZW5zW1wiJHtuYW1lfVwiXShyZXEsIHJlcywgXCIke2FyZ31cIikgfHwgXCItXCIpICsgXCJgO1xuICAgIH0pO1xuICBsZXQganMgPSBgICByZXR1cm4gXCIke2ZtdH1cIjtgO1xuICByZXR1cm4gbmV3IEZ1bmN0aW9uKCd0b2tlbnMsIHJlcSwgcmVzJywganMpO1xufVxuXG5mdW5jdGlvbiByZXF1ZXN0RW5kTG9nZ2luZ0Zvcm1hdCAodG9rZW5zLCByZXEsIHJlcykge1xuICBsZXQgc3RhdHVzID0gcmVzLnN0YXR1c0NvZGU7XG4gIGxldCBzdGF0dXNTdHIgPSAnOnN0YXR1cyc7XG4gIGlmIChzdGF0dXMgPj0gNTAwKSB7XG4gICAgc3RhdHVzU3RyID0gc3RhdHVzU3RyLnJlZDtcbiAgfSBlbHNlIGlmIChzdGF0dXMgPj0gNDAwKSB7XG4gICAgc3RhdHVzU3RyID0gc3RhdHVzU3RyLnllbGxvdztcbiAgfSBlbHNlIGlmIChzdGF0dXMgPj0gMzAwKSB7XG4gICAgc3RhdHVzU3RyID0gc3RhdHVzU3RyLmN5YW47XG4gIH0gZWxzZSB7XG4gICAgc3RhdHVzU3RyID0gc3RhdHVzU3RyLmdyZWVuO1xuICB9XG4gIGxldCBmbiA9IGNvbXBpbGUoYCR7JzwtLSA6bWV0aG9kIDp1cmwgJy53aGl0ZX0ke3N0YXR1c1N0cn0gJHsnOnJlc3BvbnNlLXRpbWUgbXMgLSA6cmVzW2NvbnRlbnQtbGVuZ3RoXScuZ3JleX1gKTtcbiAgcmV0dXJuIGZuKHRva2VucywgcmVxLCByZXMpO1xufVxuXG5jb25zdCBlbmRMb2dGb3JtYXR0ZXIgPSBtb3JnYW4oKHRva2VucywgcmVxLCByZXMpID0+IHtcbiAgbG9nLmluZm8ocmVxdWVzdEVuZExvZ2dpbmdGb3JtYXQodG9rZW5zLCByZXEsIHJlcyksXG4gICAgKHJlcy5qc29uUmVzcCB8fCAnJykuZ3JleSk7XG59KTtcblxuY29uc3QgcmVxdWVzdFN0YXJ0TG9nZ2luZ0Zvcm1hdCA9IGNvbXBpbGUoYCR7Jy0tPicud2hpdGV9ICR7JzptZXRob2QnLndoaXRlfSAkeyc6dXJsJy53aGl0ZX1gKTtcblxuY29uc3Qgc3RhcnRMb2dGb3JtYXR0ZXIgPSBtb3JnYW4oKHRva2VucywgcmVxLCByZXMpID0+IHtcbiAgLy8gbW9yZ2FuIG91dHB1dCBpcyByZWRpcmVjdGVkIHN0cmFpZ2h0IHRvIHdpbnN0b25cbiAgbGV0IGRhdGEgPSAnJztcbiAgdHJ5IHtcbiAgICBpZiAocmVxLmJvZHkpIHtcbiAgICAgIGRhdGEgPSBKU09OLnN0cmluZ2lmeShyZXEuYm9keSkuc3Vic3RyaW5nKDAsIDEwMDApO1xuICAgIH1cbiAgfSBjYXRjaCAoaWduKSB7fVxuICBsb2cuaW5mbyhyZXF1ZXN0U3RhcnRMb2dnaW5nRm9ybWF0KHRva2VucywgcmVxLCByZXMpLCBkYXRhLmdyZXkpO1xufSwge2ltbWVkaWF0ZTogdHJ1ZX0pO1xuXG5leHBvcnQgeyBlbmRMb2dGb3JtYXR0ZXIsIHN0YXJ0TG9nRm9ybWF0dGVyIH07XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uIn0=
