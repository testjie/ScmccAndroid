'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _protocol = require('../protocol');

function allowCrossDomain(req, res, next) {
  try {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS,DELETE');
    res.header('Access-Control-Allow-Headers', 'origin, content-type, accept');

    // need to respond 200 to OPTIONS
    if ('OPTIONS' === req.method) {
      res.sendStatus(200);
    } else {
      next();
    }
  } catch (err) {
    _logger2['default'].error('Unexpected error: ' + err.stack);
    next();
  }
}

function fixPythonContentType(req, res, next) {
  // hack because python client library gives us wrong content-type
  if (/^\/wd/.test(req.path) && /^Python/.test(req.headers['user-agent'])) {
    if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
      req.headers['content-type'] = 'application/json';
    }
  }
  next();
}

function defaultToJSONContentType(req, res, next) {
  if (!req.headers['content-type']) {
    req.headers['content-type'] = 'application/json';
  }
  next();
}

function catchAllHandler(err, req, res, next) {
  _logger2['default'].error('Uncaught error: ' + err.message);
  _logger2['default'].error('Sending generic error response');
  try {
    res.status(500).send({
      status: _protocol.errors.UnknownError.code(),
      value: 'ERROR running Appium command: ' + err.message
    });
    _logger2['default'].error(err);
  } catch (ign) {
    next(ign);
  }
}

function catch4XXHandler(err, req, res, next) {
  if (err.status >= 400 && err.status < 500) {
    // set the content type to `text/plain`
    // https://code.google.com/p/selenium/wiki/JsonWireProtocol#Responses
    _logger2['default'].debug('Setting content type to \'text/plain\' for HTTP status \'' + err.status + '\'');
    res.set('Content-Type', 'text/plain');
    res.status(err.status).send('Unable to process request: ' + err.message);
  } else {
    next(err);
  }
}

function catch404Handler(req, res) {
  // set the content type to `text/plain`
  // https://code.google.com/p/selenium/wiki/JsonWireProtocol#Responses
  _logger2['default'].debug('No route found. Setting content type to \'text/plain\'');
  res.set('Content-Type', 'text/plain');
  res.status(404).send('The URL \'' + req.originalUrl + '\' did not map to a valid resource');
}

exports.allowCrossDomain = allowCrossDomain;
exports.fixPythonContentType = fixPythonContentType;
exports.defaultToJSONContentType = defaultToJSONContentType;
exports.catchAllHandler = catchAllHandler;
exports.catch404Handler = catch404Handler;
exports.catch4XXHandler = catch4XXHandler;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9leHByZXNzL21pZGRsZXdhcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7c0JBQWdCLFVBQVU7Ozs7d0JBQ0gsYUFBYTs7QUFHcEMsU0FBUyxnQkFBZ0IsQ0FBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtBQUN6QyxNQUFJO0FBQ0YsT0FBRyxDQUFDLE1BQU0sQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUMvQyxPQUFHLENBQUMsTUFBTSxDQUFDLDhCQUE4QixFQUFFLDZCQUE2QixDQUFDLENBQUM7QUFDMUUsT0FBRyxDQUFDLE1BQU0sQ0FBQyw4QkFBOEIsRUFBRSw4QkFBOEIsQ0FBQyxDQUFDOzs7QUFHM0UsUUFBSSxTQUFTLEtBQUssR0FBRyxDQUFDLE1BQU0sRUFBRTtBQUM1QixTQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3JCLE1BQU07QUFDTCxVQUFJLEVBQUUsQ0FBQztLQUNSO0dBQ0YsQ0FBQyxPQUFPLEdBQUcsRUFBRTtBQUNaLHdCQUFJLEtBQUssd0JBQXNCLEdBQUcsQ0FBQyxLQUFLLENBQUcsQ0FBQztBQUM1QyxRQUFJLEVBQUUsQ0FBQztHQUNSO0NBQ0Y7O0FBRUQsU0FBUyxvQkFBb0IsQ0FBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTs7QUFFN0MsTUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRTtBQUN2RSxRQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssbUNBQW1DLEVBQUU7QUFDdkUsU0FBRyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsR0FBRyxrQkFBa0IsQ0FBQztLQUNsRDtHQUNGO0FBQ0QsTUFBSSxFQUFFLENBQUM7Q0FDUjs7QUFFRCxTQUFTLHdCQUF3QixDQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFO0FBQ2pELE1BQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxFQUFFO0FBQ2hDLE9BQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsa0JBQWtCLENBQUM7R0FDbEQ7QUFDRCxNQUFJLEVBQUUsQ0FBQztDQUNSOztBQUVELFNBQVMsZUFBZSxDQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtBQUM3QyxzQkFBSSxLQUFLLHNCQUFvQixHQUFHLENBQUMsT0FBTyxDQUFHLENBQUM7QUFDNUMsc0JBQUksS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7QUFDNUMsTUFBSTtBQUNGLE9BQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ25CLFlBQU0sRUFBRSxpQkFBTyxZQUFZLENBQUMsSUFBSSxFQUFFO0FBQ2xDLFdBQUsscUNBQW1DLEdBQUcsQ0FBQyxPQUFPLEFBQUU7S0FDdEQsQ0FBQyxDQUFDO0FBQ0gsd0JBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0dBQ2hCLENBQUMsT0FBTyxHQUFHLEVBQUU7QUFDWixRQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7R0FDWDtDQUNGOztBQUVELFNBQVMsZUFBZSxDQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtBQUM3QyxNQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFOzs7QUFHekMsd0JBQUksS0FBSywrREFBMEQsR0FBRyxDQUFDLE1BQU0sUUFBSSxDQUFDO0FBQ2xGLE9BQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQ3RDLE9BQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksaUNBQStCLEdBQUcsQ0FBQyxPQUFPLENBQUcsQ0FBQztHQUMxRSxNQUFNO0FBQ0wsUUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0dBQ1g7Q0FDRjs7QUFFRCxTQUFTLGVBQWUsQ0FBRSxHQUFHLEVBQUUsR0FBRyxFQUFFOzs7QUFHbEMsc0JBQUksS0FBSyxDQUFDLHdEQUF3RCxDQUFDLENBQUM7QUFDcEUsS0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDdEMsS0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLGdCQUFhLEdBQUcsQ0FBQyxXQUFXLHdDQUFvQyxDQUFDO0NBQ3RGOztRQUVRLGdCQUFnQixHQUFoQixnQkFBZ0I7UUFBRSxvQkFBb0IsR0FBcEIsb0JBQW9CO1FBQUUsd0JBQXdCLEdBQXhCLHdCQUF3QjtRQUFFLGVBQWUsR0FBZixlQUFlO1FBQUUsZUFBZSxHQUFmLGVBQWU7UUFBRSxlQUFlLEdBQWYsZUFBZSIsImZpbGUiOiJsaWIvZXhwcmVzcy9taWRkbGV3YXJlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGxvZyBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgeyBlcnJvcnMgfSBmcm9tICcuLi9wcm90b2NvbCc7XG5cblxuZnVuY3Rpb24gYWxsb3dDcm9zc0RvbWFpbiAocmVxLCByZXMsIG5leHQpIHtcbiAgdHJ5IHtcbiAgICByZXMuaGVhZGVyKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nLCAnKicpO1xuICAgIHJlcy5oZWFkZXIoJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnLCAnR0VULFBPU1QsUFVULE9QVElPTlMsREVMRVRFJyk7XG4gICAgcmVzLmhlYWRlcignQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycycsICdvcmlnaW4sIGNvbnRlbnQtdHlwZSwgYWNjZXB0Jyk7XG5cbiAgICAvLyBuZWVkIHRvIHJlc3BvbmQgMjAwIHRvIE9QVElPTlNcbiAgICBpZiAoJ09QVElPTlMnID09PSByZXEubWV0aG9kKSB7XG4gICAgICByZXMuc2VuZFN0YXR1cygyMDApO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0KCk7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2cuZXJyb3IoYFVuZXhwZWN0ZWQgZXJyb3I6ICR7ZXJyLnN0YWNrfWApO1xuICAgIG5leHQoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmaXhQeXRob25Db250ZW50VHlwZSAocmVxLCByZXMsIG5leHQpIHtcbiAgLy8gaGFjayBiZWNhdXNlIHB5dGhvbiBjbGllbnQgbGlicmFyeSBnaXZlcyB1cyB3cm9uZyBjb250ZW50LXR5cGVcbiAgaWYgKC9eXFwvd2QvLnRlc3QocmVxLnBhdGgpICYmIC9eUHl0aG9uLy50ZXN0KHJlcS5oZWFkZXJzWyd1c2VyLWFnZW50J10pKSB7XG4gICAgaWYgKHJlcS5oZWFkZXJzWydjb250ZW50LXR5cGUnXSA9PT0gJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpIHtcbiAgICAgIHJlcS5oZWFkZXJzWydjb250ZW50LXR5cGUnXSA9ICdhcHBsaWNhdGlvbi9qc29uJztcbiAgICB9XG4gIH1cbiAgbmV4dCgpO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0VG9KU09OQ29udGVudFR5cGUgKHJlcSwgcmVzLCBuZXh0KSB7XG4gIGlmICghcmVxLmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddKSB7XG4gICAgcmVxLmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xuICB9XG4gIG5leHQoKTtcbn1cblxuZnVuY3Rpb24gY2F0Y2hBbGxIYW5kbGVyIChlcnIsIHJlcSwgcmVzLCBuZXh0KSB7XG4gIGxvZy5lcnJvcihgVW5jYXVnaHQgZXJyb3I6ICR7ZXJyLm1lc3NhZ2V9YCk7XG4gIGxvZy5lcnJvcignU2VuZGluZyBnZW5lcmljIGVycm9yIHJlc3BvbnNlJyk7XG4gIHRyeSB7XG4gICAgcmVzLnN0YXR1cyg1MDApLnNlbmQoe1xuICAgICAgc3RhdHVzOiBlcnJvcnMuVW5rbm93bkVycm9yLmNvZGUoKSxcbiAgICAgIHZhbHVlOiBgRVJST1IgcnVubmluZyBBcHBpdW0gY29tbWFuZDogJHtlcnIubWVzc2FnZX1gXG4gICAgfSk7XG4gICAgbG9nLmVycm9yKGVycik7XG4gIH0gY2F0Y2ggKGlnbikge1xuICAgIG5leHQoaWduKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjYXRjaDRYWEhhbmRsZXIgKGVyciwgcmVxLCByZXMsIG5leHQpIHtcbiAgaWYgKGVyci5zdGF0dXMgPj0gNDAwICYmIGVyci5zdGF0dXMgPCA1MDApIHtcbiAgICAvLyBzZXQgdGhlIGNvbnRlbnQgdHlwZSB0byBgdGV4dC9wbGFpbmBcbiAgICAvLyBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3NlbGVuaXVtL3dpa2kvSnNvbldpcmVQcm90b2NvbCNSZXNwb25zZXNcbiAgICBsb2cuZGVidWcoYFNldHRpbmcgY29udGVudCB0eXBlIHRvICd0ZXh0L3BsYWluJyBmb3IgSFRUUCBzdGF0dXMgJyR7ZXJyLnN0YXR1c30nYCk7XG4gICAgcmVzLnNldCgnQ29udGVudC1UeXBlJywgJ3RleHQvcGxhaW4nKTtcbiAgICByZXMuc3RhdHVzKGVyci5zdGF0dXMpLnNlbmQoYFVuYWJsZSB0byBwcm9jZXNzIHJlcXVlc3Q6ICR7ZXJyLm1lc3NhZ2V9YCk7XG4gIH0gZWxzZSB7XG4gICAgbmV4dChlcnIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNhdGNoNDA0SGFuZGxlciAocmVxLCByZXMpIHtcbiAgLy8gc2V0IHRoZSBjb250ZW50IHR5cGUgdG8gYHRleHQvcGxhaW5gXG4gIC8vIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3Avc2VsZW5pdW0vd2lraS9Kc29uV2lyZVByb3RvY29sI1Jlc3BvbnNlc1xuICBsb2cuZGVidWcoJ05vIHJvdXRlIGZvdW5kLiBTZXR0aW5nIGNvbnRlbnQgdHlwZSB0byBcXCd0ZXh0L3BsYWluXFwnJyk7XG4gIHJlcy5zZXQoJ0NvbnRlbnQtVHlwZScsICd0ZXh0L3BsYWluJyk7XG4gIHJlcy5zdGF0dXMoNDA0KS5zZW5kKGBUaGUgVVJMICcke3JlcS5vcmlnaW5hbFVybH0nIGRpZCBub3QgbWFwIHRvIGEgdmFsaWQgcmVzb3VyY2VgKTtcbn1cblxuZXhwb3J0IHsgYWxsb3dDcm9zc0RvbWFpbiwgZml4UHl0aG9uQ29udGVudFR5cGUsIGRlZmF1bHRUb0pTT05Db250ZW50VHlwZSwgY2F0Y2hBbGxIYW5kbGVyLCBjYXRjaDQwNEhhbmRsZXIsIGNhdGNoNFhYSGFuZGxlciB9O1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLiJ9
