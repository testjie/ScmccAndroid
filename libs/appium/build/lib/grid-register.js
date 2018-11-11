'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _appiumSupport = require('appium-support');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var hubUri = function hubUri(config) {
  var protocol = config.hubProtocol || 'http';
  return protocol + '://' + config.hubHost + ':' + config.hubPort;
};

function registerNode(configFile, addr, port) {
  var data;
  return _regeneratorRuntime.async(function registerNode$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        data = undefined;
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.readFile(configFile, 'utf-8'));

      case 4:
        data = context$1$0.sent;
        context$1$0.next = 11;
        break;

      case 7:
        context$1$0.prev = 7;
        context$1$0.t0 = context$1$0['catch'](1);

        _logger2['default'].error('Unable to load node configuration file to register with grid: ' + context$1$0.t0.message);
        return context$1$0.abrupt('return');

      case 11:
        if (data) {
          context$1$0.next = 14;
          break;
        }

        _logger2['default'].error('No data found in the node configuration file to send to the grid');
        return context$1$0.abrupt('return');

      case 14:
        context$1$0.next = 16;
        return _regeneratorRuntime.awrap(postRequest(data, addr, port));

      case 16:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 7]]);
}

function registerToGrid(options_post, jsonObject) {
  var response, logMessage;
  return _regeneratorRuntime.async(function registerToGrid$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap((0, _requestPromise2['default'])(options_post));

      case 3:
        response = context$1$0.sent;

        if (!(response === undefined || response.statusCode !== 200)) {
          context$1$0.next = 6;
          break;
        }

        throw new Error('Request failed');

      case 6:
        logMessage = 'Appium successfully registered with the grid on ' + hubUri(jsonObject.configuration);

        _logger2['default'].debug(logMessage);
        context$1$0.next = 13;
        break;

      case 10:
        context$1$0.prev = 10;
        context$1$0.t0 = context$1$0['catch'](0);

        _logger2['default'].error('Request to register with grid was unsuccessful: ' + context$1$0.t0.message);

      case 13:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 10]]);
}

function postRequest(data, addr, port) {
  var jsonObject, configuration, property, post_headers, post_options, registerCycleTime;
  return _regeneratorRuntime.async(function postRequest$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        jsonObject = undefined;

        try {
          jsonObject = JSON.parse(data);
        } catch (err) {
          _logger2['default'].errorAndThrow('Syntax error in node configuration file: ' + err.message);
        }

        // Move Selenium 3 configuration properties to configuration object
        if (!jsonObject.hasOwnProperty('configuration')) {
          configuration = {};

          for (property in jsonObject) {
            if (jsonObject.hasOwnProperty(property) && property !== 'capabilities') {
              configuration[property] = jsonObject[property];
              delete jsonObject[property];
            }
          }
          jsonObject.configuration = configuration;
        }

        // if the node config does not have the appium/webdriver url, host, and port,
        // automatically add it based on how appium was initialized
        // otherwise, we will take whatever the user setup
        // because we will always set localhost/127.0.0.1. this won't work if your
        // node and grid aren't in the same place
        if (!jsonObject.configuration.url || !jsonObject.configuration.host || !jsonObject.configuration.port) {
          jsonObject.configuration.url = 'http://' + addr + ':' + port + '/wd/hub';
          jsonObject.configuration.host = addr;
          jsonObject.configuration.port = port;
        }
        // if the node config does not have id automatically add it
        if (!jsonObject.configuration.id) {
          jsonObject.configuration.id = 'http://' + jsonObject.configuration.host + ':' + jsonObject.configuration.port;
        }

        // re-serialize the configuration with the auto populated data
        data = JSON.stringify(jsonObject);

        // prepare the header
        post_headers = {
          'Content-Type': 'application/json',
          'Content-Length': data.length
        };
        post_options = {
          url: hubUri(jsonObject.configuration) + '/grid/register',
          method: 'POST',
          body: data,
          headers: post_headers,
          resolveWithFullResponse: true // return the full response, not just the body
        };

        if (!(jsonObject.configuration.register !== true)) {
          context$1$0.next = 11;
          break;
        }

        _logger2['default'].debug('No registration sent (' + jsonObject.configuration.register + ' = false)');
        return context$1$0.abrupt('return');

      case 11:
        registerCycleTime = jsonObject.configuration.registerCycle;

        if (registerCycleTime !== null && registerCycleTime > 0) {
          (function () {
            // initiate a new Thread
            var first = true;
            _logger2['default'].debug('Starting auto register thread for grid. Will try to register every ' + registerCycleTime + ' ms.');
            setInterval(function callee$2$0() {
              var isRegistered;
              return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                while (1) switch (context$3$0.prev = context$3$0.next) {
                  case 0:
                    if (!(first !== true)) {
                      context$3$0.next = 9;
                      break;
                    }

                    context$3$0.next = 3;
                    return _regeneratorRuntime.awrap(isAlreadyRegistered(jsonObject));

                  case 3:
                    isRegistered = context$3$0.sent;

                    if (!(isRegistered !== null && isRegistered !== true)) {
                      context$3$0.next = 7;
                      break;
                    }

                    context$3$0.next = 7;
                    return _regeneratorRuntime.awrap(registerToGrid(post_options, jsonObject));

                  case 7:
                    context$3$0.next = 12;
                    break;

                  case 9:
                    first = false;
                    context$3$0.next = 12;
                    return _regeneratorRuntime.awrap(registerToGrid(post_options, jsonObject));

                  case 12:
                  case 'end':
                    return context$3$0.stop();
                }
              }, null, this);
            }, registerCycleTime);
          })();
        }

      case 13:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function isAlreadyRegistered(jsonObject) {
  var id, response, responseData;
  return _regeneratorRuntime.async(function isAlreadyRegistered$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        id = jsonObject.configuration.id;
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
          uri: hubUri(jsonObject.configuration) + '/grid/api/proxy?id=' + id,
          method: 'GET',
          timeout: 10000,
          resolveWithFullResponse: true // return the full response, not just the body
        }));

      case 4:
        response = context$1$0.sent;

        if (!(response === undefined || response.statusCode !== 200)) {
          context$1$0.next = 7;
          break;
        }

        throw new Error('Request failed');

      case 7:
        responseData = JSON.parse(response.body);

        if (responseData.success !== true) {
          // if register fail, print the debug msg
          _logger2['default'].debug('Grid registration error: ' + responseData.msg);
        }
        return context$1$0.abrupt('return', responseData.success);

      case 12:
        context$1$0.prev = 12;
        context$1$0.t0 = context$1$0['catch'](1);

        _logger2['default'].debug('Hub down or not responding: ' + context$1$0.t0.message);

      case 15:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 12]]);
}

exports['default'] = registerNode;
module.exports = exports['default'];

// Check presence of data before posting  it to the selenium grid

// parse json to get hub host and port

// the post options

// make the http POST to the grid for registration

//check if node is already registered
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9ncmlkLXJlZ2lzdGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OEJBQW9CLGlCQUFpQjs7Ozs2QkFDbEIsZ0JBQWdCOztzQkFDaEIsVUFBVTs7OztBQUU3QixJQUFNLE1BQU0sR0FBRyxTQUFULE1BQU0sQ0FBSSxNQUFNLEVBQUs7QUFDekIsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFdBQVcsSUFBSSxNQUFNLENBQUM7QUFDOUMsU0FBVSxRQUFRLFdBQU0sTUFBTSxDQUFDLE9BQU8sU0FBSSxNQUFNLENBQUMsT0FBTyxDQUFHO0NBQzVELENBQUM7O0FBRUYsU0FBZSxZQUFZLENBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxJQUFJO01BQzdDLElBQUk7Ozs7QUFBSixZQUFJOzs7eUNBRU8sa0JBQUcsUUFBUSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUM7OztBQUE3QyxZQUFJOzs7Ozs7OztBQUVKLDRCQUFPLEtBQUssb0VBQWtFLGVBQUksT0FBTyxDQUFHLENBQUM7Ozs7WUFLMUYsSUFBSTs7Ozs7QUFDUCw0QkFBTyxLQUFLLENBQUMsa0VBQWtFLENBQUMsQ0FBQzs7Ozs7eUNBRzdFLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQzs7Ozs7OztDQUNwQzs7QUFFRCxTQUFlLGNBQWMsQ0FBRSxZQUFZLEVBQUUsVUFBVTtNQUUvQyxRQUFRLEVBSVIsVUFBVTs7Ozs7O3lDQUpPLGlDQUFRLFlBQVksQ0FBQzs7O0FBQXRDLGdCQUFROztjQUNSLFFBQVEsS0FBSyxTQUFTLElBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxHQUFHLENBQUE7Ozs7O2NBQ2pELElBQUksS0FBSyxDQUFDLGdCQUFnQixDQUFDOzs7QUFFL0Isa0JBQVUsd0RBQXNELE1BQU0sQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDOztBQUNwRyw0QkFBTyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7Ozs7Ozs7O0FBRXpCLDRCQUFPLEtBQUssc0RB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QUUxQyxjQUFjLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQzs7Ozs7OztBQUdoRCx5QkFBSyxHQUFHLEtBQUssQ0FBQzs7cURBQ1IsY0FBYyxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUM7Ozs7Ozs7YUFFakQsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDOztTQUN2Qjs7Ozs7OztDQUNGOztBQUVELFNBQWUsbUJBQW1CLENBQUUsVUFBVTtNQUV4QyxFQUFFLEVBRUEsUUFBUSxFQVNSLFlBQVk7Ozs7QUFYZCxVQUFFLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFFOzs7eUNBRWIsaUNBQVE7QUFDM0IsYUFBRyxFQUFLLE1BQU0sQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLDJCQUFzQixFQUFFLEFBQUU7QUFDbEUsZ0JBQU0sRUFBSSxLQUFLO0FBQ2YsaUJBQU8sRUFBRyxLQUFLO0FBQ2YsaUNBQXVCLEVBQUUsSUFBSTtTQUM5QixDQUFDOzs7QUFMRSxnQkFBUTs7Y0FNUixRQUFRLEtBQUssU0FBUyxJQUFJLFFBQVEsQ0FBQyxVQUFVLEtBQUssR0FBRyxDQUFBOzs7OztjQUNqRCxJQUFJLEtBQUssa0JBQWtCOzs7QUFFL0Isb0JBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7O0FBQzVDLFlBQUksWUFBWSxDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUU7O0FBRWpDLDhCQUFPLEtBQUssK0JBQTZCLFlBQVksQ0FBQyxHQUFHLENBQUcsQ0FBQztTQUM5RDs0Q0FDTSxZQUFZLENBQUMsT0FBTzs7Ozs7O0FBRTNCLDRCQUFPLEtBQUssa0NBQWdDLGVBQUksT0FBTyxDQUFHLENBQUM7Ozs7Ozs7Q0FFOUQ7O3FCQUdjLFlBQVkiLCJmaWxlIjoibGliL2dyaWQtcmVnaXN0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmVxdWVzdCBmcm9tICdyZXF1ZXN0LXByb21pc2UnO1xuaW1wb3J0IHsgZnMgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4vbG9nZ2VyJztcblxuY29uc3QgaHViVXJpID0gKGNvbmZpZykgPT4ge1xuICBjb25zdCBwcm90b2NvbCA9IGNvbmZpZy5odWJQcm90b2NvbCB8fCAnaHR0cCc7XG4gIHJldHVybiBgJHtwcm90b2NvbH06Ly8ke2NvbmZpZy5odWJIb3N0fToke2NvbmZpZy5odWJQb3J0fWA7XG59O1xuXG5hc3luYyBmdW5jdGlvbiByZWdpc3Rlck5vZGUgKGNvbmZpZ0ZpbGUsIGFkZHIsIHBvcnQpIHtcbiAgbGV0IGRhdGE7XG4gIHRyeSB7XG4gICAgZGF0YSA9IGF3YWl0IGZzLnJlYWRGaWxlKGNvbmZpZ0ZpbGUsICd1dGYtOCcpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZXJyb3IoYFVuYWJsZSB0byBsb2FkIG5vZGUgY29uZmlndXJhdGlvbiBmaWxlIHRvIHJlZ2lzdGVyIHdpdGggZ3JpZDogJHtlcnIubWVzc2FnZX1gKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBDaGVjayBwcmVzZW5jZSBvZiBkYXRhIGJlZm9yZSBwb3N0aW5nICBpdCB0byB0aGUgc2VsZW5pdW0gZ3JpZFxuICBpZiAoIWRhdGEpIHtcbiAgICBsb2dnZXIuZXJyb3IoJ05vIGRhdGEgZm91bmQgaW4gdGhlIG5vZGUgY29uZmlndXJhdGlvbiBmaWxlIHRvIHNlbmQgdG8gdGhlIGdyaWQnKTtcbiAgICByZXR1cm47XG4gIH1cbiAgYXdhaXQgcG9zdFJlcXVlc3QoZGF0YSwgYWRkciwgcG9ydCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlZ2lzdGVyVG9HcmlkIChvcHRpb25zX3Bvc3QsIGpzb25PYmplY3QpIHtcbiAgdHJ5IHtcbiAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0KG9wdGlvbnNfcG9zdCk7XG4gICAgaWYgKHJlc3BvbnNlID09PSB1bmRlZmluZWQgfHwgcmVzcG9uc2Uuc3RhdHVzQ29kZSAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlcXVlc3QgZmFpbGVkJyk7XG4gICAgfVxuICAgIGxldCBsb2dNZXNzYWdlID0gYEFwcGl1bSBzdWNjZXNzZnVsbHkgcmVnaXN0ZXJlZCB3aXRoIHRoZSBncmlkIG9uICR7aHViVXJpKGpzb25PYmplY3QuY29uZmlndXJhdGlvbil9YDtcbiAgICBsb2dnZXIuZGVidWcobG9nTWVzc2FnZSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZ2dlci5lcnJvcihgUmVxdWVzdCB0byByZWdpc3RlciB3aXRoIGdyaWQgd2FzIHVuc3VjY2Vzc2Z1bDogJHtlcnIubWVzc2FnZX1gKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBwb3N0UmVxdWVzdCAoZGF0YSwgYWRkciwgcG9ydCkge1xuICAvLyBwYXJzZSBqc29uIHRvIGdldCBodWIgaG9zdCBhbmQgcG9ydFxuICBsZXQganNvbk9iamVjdDtcbiAgdHJ5IHtcbiAgICBqc29uT2JqZWN0ID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nZ2VyLmVycm9yQW5kVGhyb3coYFN5bnRheCBlcnJvciBpbiBub2RlIGNvbmZpZ3VyYXRpb24gZmlsZTogJHtlcnIubWVzc2FnZX1gKTtcbiAgfVxuXG4gIC8vIE1vdmUgU2VsZW5pdW0gMyBjb25maWd1cmF0aW9uIHByb3BlcnRpZXMgdG8gY29uZmlndXJhdGlvbiBvYmplY3RcbiAgaWYgKCFqc29uT2JqZWN0Lmhhc093blByb3BlcnR5KCdjb25maWd1cmF0aW9uJykpIHtcbiAgICBsZXQgY29uZmlndXJhdGlvbiA9IHt9O1xuICAgIGZvciAobGV0IHByb3BlcnR5IGluIGpzb25PYmplY3QpIHtcbiAgICAgIGlmIChqc29uT2JqZWN0Lmhhc093blByb3BlcnR5KHByb3BlcnR5KSAmJiBwcm9wZXJ0eSAhPT0gJ2NhcGFiaWxpdGllcycpIHtcbiAgICAgICAgY29uZmlndXJhdGlvbltwcm9wZXJ0eV0gPSBqc29uT2JqZWN0W3Byb3BlcnR5XTtcbiAgICAgICAgZGVsZXRlIGpzb25PYmplY3RbcHJvcGVydHldO1xuICAgICAgfVxuICAgIH1cbiAgICBqc29uT2JqZWN0LmNvbmZpZ3VyYXRpb24gPSBjb25maWd1cmF0aW9uO1xuICB9XG5cbiAgLy8gaWYgdGhlIG5vZGUgY29uZmlnIGRvZXMgbm90IGhhdmUgdGhlIGFwcGl1bS93ZWJkcml2ZXIgdXJsLCBob3N0LCBhbmQgcG9ydCxcbiAgLy8gYXV0b21hdGljYWxseSBhZGQgaXQgYmFzZWQgb24gaG93IGFwcGl1bSB3YXMgaW5pdGlhbGl6ZWRcbiAgLy8gb3RoZXJ3aXNlLCB3ZSB3aWxsIHRha2Ugd2hhdGV2ZXIgdGhlIHVzZXIgc2V0dXBcbiAgLy8gYmVjYXVzZSB3ZSB3aWxsIGFsd2F5cyBzZXQgbG9jYWxob3N0LzEyNy4wLjAuMS4gdGhpcyB3b24ndCB3b3JrIGlmIHlvdXJcbiAgLy8gbm9kZSBhbmQgZ3JpZCBhcmVuJ3QgaW4gdGhlIHNhbWUgcGxhY2VcbiAgaWYgKCFqc29uT2JqZWN0LmNvbmZpZ3VyYXRpb24udXJsIHx8ICFqc29uT2JqZWN0LmNvbmZpZ3VyYXRpb24uaG9zdCB8fCAhanNvbk9iamVjdC5jb25maWd1cmF0aW9uLnBvcnQpIHtcbiAgICBqc29uT2JqZWN0LmNvbmZpZ3VyYXRpb24udXJsID0gYGh0dHA6Ly8ke2FkZHJ9OiR7cG9ydH0vd2QvaHViYDtcbiAgICBqc29uT2JqZWN0LmNvbmZpZ3VyYXRpb24uaG9zdCA9IGFkZHI7XG4gICAganNvbk9iamVjdC5jb25maWd1cmF0aW9uLnBvcnQgPSBwb3J0O1xuICB9XG4gIC8vIGlmIHRoZSBub2RlIGNvbmZpZyBkb2VzIG5vdCBoYXZlIGlkIGF1dG9tYXRpY2FsbHkgYWRkIGl0XG4gIGlmICghanNvbk9iamVjdC5jb25maWd1cmF0aW9uLmlkKSB7XG4gICAganNvbk9iamVjdC5jb25maWd1cmF0aW9uLmlkID0gYGh0dHA6Ly8ke2pzb25PYmplY3QuY29uZmlndXJhdGlvbi5ob3N0fToke2pzb25PYmplY3QuY29uZmlndXJhdGlvbi5wb3J0fWA7XG4gIH1cblxuICAvLyByZS1zZXJpYWxpemUgdGhlIGNvbmZpZ3VyYXRpb24gd2l0aCB0aGUgYXV0byBwb3B1bGF0ZWQgZGF0YVxuICBkYXRhID0gSlNPTi5zdHJpbmdpZnkoanNvbk9iamVjdCk7XG5cbiAgLy8gcHJlcGFyZSB0aGUgaGVhZGVyXG4gIGxldCBwb3N0X2hlYWRlcnMgPSB7XG4gICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAnQ29udGVudC1MZW5ndGgnOiBkYXRhLmxlbmd0aFxuICB9O1xuICAvLyB0aGUgcG9zdCBvcHRpb25zXG4gIGxldCBwb3N0X29wdGlvbnMgPSB7XG4gICAgdXJsOiBgJHtodWJVcmkoanNvbk9iamVjdC5jb25maWd1cmF0aW9uKX0vZ3JpZC9yZWdpc3RlcmAsXG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgYm9keTogZGF0YSxcbiAgICBoZWFkZXJzOiBwb3N0X2hlYWRlcnMsXG4gICAgcmVzb2x2ZVdpdGhGdWxsUmVzcG9uc2U6IHRydWUgLy8gcmV0dXJuIHRoZSBmdWxsIHJlc3BvbnNlLCBub3QganVzdCB0aGUgYm9keVxuICB9O1xuXG4gIGlmIChqc29uT2JqZWN0LmNvbmZpZ3VyYXRpb24ucmVnaXN0ZXIgIT09IHRydWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYE5vIHJlZ2lzdHJhdGlvbiBzZW50ICgke2pzb25PYmplY3QuY29uZmlndXJhdGlvbi5yZWdpc3Rlcn0gPSBmYWxzZSlgKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgcmVnaXN0ZXJDeWNsZVRpbWUgPSBqc29uT2JqZWN0LmNvbmZpZ3VyYXRpb24ucmVnaXN0ZXJDeWNsZTtcbiAgaWYgKHJlZ2lzdGVyQ3ljbGVUaW1lICE9PSBudWxsICYmIHJlZ2lzdGVyQ3ljbGVUaW1lID4gMCkge1xuICAgIC8vIGluaXRpYXRlIGEgbmV3IFRocmVhZFxuICAgIGxldCBmaXJzdCA9IHRydWU7XG4gICAgbG9nZ2VyLmRlYnVnKGBTdGFydGluZyBhdXRvIHJlZ2lzdGVyIHRocmVhZCBmb3IgZ3JpZC4gV2lsbCB0cnkgdG8gcmVnaXN0ZXIgZXZlcnkgJHtyZWdpc3RlckN5Y2xlVGltZX0gbXMuYCk7XG4gICAgc2V0SW50ZXJ2YWwoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGZpcnN0ICE9PSB0cnVlKSB7XG4gICAgICAgIGxldCBpc1JlZ2lzdGVyZWQgPSBhd2FpdCBpc0FscmVhZHlSZWdpc3RlcmVkKGpzb25PYmplY3QpO1xuICAgICAgICBpZiAoaXNSZWdpc3RlcmVkICE9PSBudWxsICYmIGlzUmVnaXN0ZXJlZCAhPT0gdHJ1ZSkge1xuICAgICAgICAgIC8vIG1ha2UgdGhlIGh0dHAgUE9TVCB0byB0aGUgZ3JpZCBmb3IgcmVnaXN0cmF0aW9uXG4gICAgICAgICAgYXdhaXQgcmVnaXN0ZXJUb0dyaWQocG9zdF9vcHRpb25zLCBqc29uT2JqZWN0KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmlyc3QgPSBmYWxzZTtcbiAgICAgICAgYXdhaXQgcmVnaXN0ZXJUb0dyaWQocG9zdF9vcHRpb25zLCBqc29uT2JqZWN0KTtcbiAgICAgIH1cbiAgICB9LCByZWdpc3RlckN5Y2xlVGltZSk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gaXNBbHJlYWR5UmVnaXN0ZXJlZCAoanNvbk9iamVjdCkge1xuICAvL2NoZWNrIGlmIG5vZGUgaXMgYWxyZWFkeSByZWdpc3RlcmVkXG4gIGxldCBpZCA9IGpzb25PYmplY3QuY29uZmlndXJhdGlvbi5pZDtcbiAgdHJ5IHtcbiAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0KHtcbiAgICAgIHVyaTogYCR7aHViVXJpKGpzb25PYmplY3QuY29uZmlndXJhdGlvbil9L2dyaWQvYXBpL3Byb3h5P2lkPSR7aWR9YCxcbiAgICAgIG1ldGhvZCAgOiAnR0VUJyxcbiAgICAgIHRpbWVvdXQgOiAxMDAwMCxcbiAgICAgIHJlc29sdmVXaXRoRnVsbFJlc3BvbnNlOiB0cnVlIC8vIHJldHVybiB0aGUgZnVsbCByZXNwb25zZSwgbm90IGp1c3QgdGhlIGJvZHlcbiAgICB9KTtcbiAgICBpZiAocmVzcG9uc2UgPT09IHVuZGVmaW5lZCB8fCByZXNwb25zZS5zdGF0dXNDb2RlICE9PSAyMDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUmVxdWVzdCBmYWlsZWRgKTtcbiAgICB9XG4gICAgbGV0IHJlc3BvbnNlRGF0YSA9IEpTT04ucGFyc2UocmVzcG9uc2UuYm9keSk7XG4gICAgaWYgKHJlc3BvbnNlRGF0YS5zdWNjZXNzICE9PSB0cnVlKSB7XG4gICAgICAvLyBpZiByZWdpc3RlciBmYWlsLCBwcmludCB0aGUgZGVidWcgbXNnXG4gICAgICBsb2dnZXIuZGVidWcoYEdyaWQgcmVnaXN0cmF0aW9uIGVycm9yOiAke3Jlc3BvbnNlRGF0YS5tc2d9YCk7XG4gICAgfVxuICAgIHJldHVybiByZXNwb25zZURhdGEuc3VjY2VzcztcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBIdWIgZG93biBvciBub3QgcmVzcG9uZGluZzogJHtlcnIubWVzc2FnZX1gKTtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IHJlZ2lzdGVyTm9kZTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
