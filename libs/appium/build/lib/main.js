#!/usr/bin/env node

require('source-map-support').install();

'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _logsink = require('./logsink');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

// logger needs to remain first of imports

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumBaseDriver = require('appium-base-driver');

var _asyncbox = require('asyncbox');

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

var _config = require('./config');

var _appium = require('./appium');

var _gridRegister = require('./grid-register');

var _gridRegister2 = _interopRequireDefault(_gridRegister);

var _utils = require('./utils');

function preflightChecks(parser, args) {
  var throwInsteadOfExit = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
  return _regeneratorRuntime.async(function preflightChecks$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;

        (0, _config.checkNodeOk)();
        if (args.asyncTrace) {
          require('longjohn').async_trace_limit = -1;
        }

        if (!args.showConfig) {
          context$1$0.next = 7;
          break;
        }

        context$1$0.next = 6;
        return _regeneratorRuntime.awrap((0, _config.showConfig)());

      case 6:
        process.exit(0);

      case 7:
        (0, _config.warnNodeDeprecations)();
        (0, _config.validateServerArgs)(parser, args);

        if (!args.tmpDir) {
          context$1$0.next = 12;
          break;
        }

        context$1$0.next = 12;
        return _regeneratorRuntime.awrap((0, _config.validateTmpDir)(args.tmpDir));

      case 12:
        context$1$0.next = 20;
        break;

      case 14:
        context$1$0.prev = 14;
        context$1$0.t0 = context$1$0['catch'](0);

        _logger2['default'].error(context$1$0.t0.message.red);

        if (!throwInsteadOfExit) {
          context$1$0.next = 19;
          break;
        }

        throw context$1$0.t0;

      case 19:

        process.exit(1);

      case 20:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 14]]);
}

function logDeprecationWarning(deprecatedArgs) {
  _logger2['default'].warn('Deprecated server args:');
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(_lodash2['default'].toPairs(deprecatedArgs)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2);

      var arg = _step$value[0];
      var realArg = _step$value[1];

      _logger2['default'].warn('  ' + arg.red + ' => ' + realArg);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

function logNonDefaultArgsWarning(args) {
  _logger2['default'].info('Non-default server args:');
  (0, _utils.inspectObject)(args);
}

function logDefaultCapabilitiesWarning(caps) {
  _logger2['default'].info('Default capabilities, which will be added to each request ' + 'unless overridden by desired capabilities:');
  (0, _utils.inspectObject)(caps);
}

function logStartupInfo(parser, args) {
  var welcome, appiumRev, showArgs, deprecatedArgs;
  return _regeneratorRuntime.async(function logStartupInfo$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        welcome = 'Welcome to Appium v' + _config.APPIUM_VER;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap((0, _config.getGitRev)());

      case 3:
        appiumRev = context$1$0.sent;

        if (appiumRev) {
          welcome += ' (REV ' + appiumRev + ')';
        }
        _logger2['default'].info(welcome);

        showArgs = (0, _config.getNonDefaultArgs)(parser, args);

        if (_lodash2['default'].size(showArgs)) {
          logNonDefaultArgsWarning(showArgs);
        }
        deprecatedArgs = (0, _config.getDeprecatedArgs)(parser, args);

        if (_lodash2['default'].size(deprecatedArgs)) {
          logDeprecationWarning(deprecatedArgs);
        }
        if (!_lodash2['default'].isEmpty(args.defaultCapabilities)) {
          logDefaultCapabilitiesWarning(args.defaultCapabilities);
        }
        // TODO: bring back loglevel reporting below once logger is flushed out
        //logger.info('Console LogLevel: ' + logger.transports.console.level);
        //if (logger.transports.file) {
        //logger.info('File LogLevel: ' + logger.transports.file.level);
        //}

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function logServerPort(address, port) {
  var logMessage = 'Appium REST http interface listener started on ' + (address + ':' + port);
  _logger2['default'].info(logMessage);
}

function initHeapdump(args) {
  if (args.heapdumpEnabled) {
    require('heapdump');
  }
}

function main() {
  var args = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
  var parser, throwInsteadOfExit, appiumDriver, router, server;
  return _regeneratorRuntime.async(function main$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        parser = (0, _parser2['default'])();
        throwInsteadOfExit = false;

        if (args) {
          // a containing package passed in their own args, let's fill them out
          // with defaults
          args = _Object$assign({}, (0, _parser.getDefaultArgs)(), args);

          // if we have a containing package instead of running as a CLI process,
          // that package might not appreciate us calling 'process.exit' willy-
          // nilly, so give it the option to have us throw instead of exit
          if (args.throwInsteadOfExit) {
            throwInsteadOfExit = true;
            // but remove it since it's not a real server arg per se
            delete args.throwInsteadOfExit;
          }
        } else {
          // otherwise parse from CLI
          args = parser.parseArgs();
        }
        initHeapdump(args);
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap((0, _logsink.init)(args));

      case 6:
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(preflightChecks(parser, args, throwInsteadOfExit));

      case 8:
        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(logStartupInfo(parser, args));

      case 10:
        appiumDriver = new _appium.AppiumDriver(args);
        router = (0, _appiumBaseDriver.routeConfiguringFunction)(appiumDriver);
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap((0, _appiumBaseDriver.server)(router, args.port, args.address));

      case 14:
        server = context$1$0.sent;

        appiumDriver.server = server;
        context$1$0.prev = 16;

        if (!(args.nodeconfig !== null)) {
          context$1$0.next = 20;
          break;
        }

        context$1$0.next = 20;
        return _regeneratorRuntime.awrap((0, _gridRegister2['default'])(args.nodeconfig, args.address, args.port));

      case 20:
        context$1$0.next = 27;
        break;

      case 22:
        context$1$0.prev = 22;
        context$1$0.t0 = context$1$0['catch'](16);
        context$1$0.next = 26;
        return _regeneratorRuntime.awrap(server.close());

      case 26:
        throw context$1$0.t0;

      case 27:

        process.once('SIGINT', function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                _logger2['default'].info('Received SIGINT - shutting down');
                context$2$0.next = 3;
                return _regeneratorRuntime.awrap(server.close());

              case 3:
              case 'end':
                return context$2$0.stop();
            }
          }, null, this);
        });

        process.once('SIGTERM', function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                _logger2['default'].info('Received SIGTERM - shutting down');
                context$2$0.next = 3;
                return _regeneratorRuntime.awrap(server.close());

              case 3:
              case 'end':
                return context$2$0.stop();
            }
          }, null, this);
        });

        logServerPort(args.address, args.port);

        return context$1$0.abrupt('return', server);

      case 31:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[16, 22]]);
}

if (require.main === module) {
  (0, _asyncbox.asyncify)(main);
}

exports.main = main;

// TODO prelaunch if args.launch is set
// TODO: startAlertSocket(server, appiumServer);

// configure as node on grid, if necessary
//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzs7O2NBTXZCLElBQUksQ0FBQyxVQUFVLEtBQUssSUFBSSxDQUFBOzs7Ozs7eUNBQ3BCLCtCQUFhLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7O3lDQUd4RCxNQUFNLENBQUMsS0FBSyxFQUFFOzs7Ozs7O0FBSXRCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7O0FBQ3JCLG9DQUFPLElBQUksbUNBQW1DLENBQUM7O2lEQUN6QyxNQUFNLENBQUMsS0FBSyxFQUFFOzs7Ozs7O1NBQ3JCLENBQUMsQ0FBQzs7QUFFSCxlQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTs7OztBQUN0QixvQ0FBTyxJQUFJLG9DQUFvQyxDQUFDOztpREFDMUMsTUFBTSxDQUFDLEtBQUssRUFBRTs7Ozs7OztTQUNyQixDQUFDLENBQUM7O0FBRUgscUJBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7NENBRWhDLE1BQU07Ozs7Ozs7Q0FDZDs7QUFFRCxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO0FBQzNCLDBCQUFTLElBQUksQ0FBQyxDQUFDO0NBQ2hCOztRQUVRLElBQUksR0FBSixJQUFJIiwiZmlsZSI6ImxpYi9tYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vLyB0cmFuc3BpbGU6bWFpblxuXG5pbXBvcnQgeyBpbml0IGFzIGxvZ3NpbmtJbml0IH0gZnJvbSAnLi9sb2dzaW5rJztcbmltcG9ydCBsb2dnZXIgZnJvbSAnLi9sb2dnZXInOyAvLyBsb2dnZXIgbmVlZHMgdG8gcmVtYWluIGZpcnN0IG9mIGltcG9ydHNcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBzZXJ2ZXIgYXMgYmFzZVNlcnZlciwgcm91dGVDb25maWd1cmluZ0Z1bmN0aW9uIH0gZnJvbSAnYXBwaXVtLWJhc2UtZHJpdmVyJztcbmltcG9ydCB7IGFzeW5jaWZ5IH0gZnJvbSAnYXN5bmNib3gnO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBnZXRQYXJzZXIsIGdldERlZmF1bHRBcmdzIH0gZnJvbSAnLi9wYXJzZXInO1xuaW1wb3J0IHsgc2hvd0NvbmZpZywgY2hlY2tOb2RlT2ssIHZhbGlkYXRlU2VydmVyQXJncyxcbiAgICAgICAgIHdhcm5Ob2RlRGVwcmVjYXRpb25zLCB2YWxpZGF0ZVRtcERpciwgZ2V0Tm9uRGVmYXVsdEFyZ3MsXG4gICAgICAgICBnZXREZXByZWNhdGVkQXJncywgZ2V0R2l0UmV2LCBBUFBJVU1fVkVSIH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHsgQXBwaXVtRHJpdmVyIH0gZnJvbSAnLi9hcHBpdW0nO1xuaW1wb3J0IHJlZ2lzdGVyTm9kZSBmcm9tICcuL2dyaWQtcmVnaXN0ZXInO1xuaW1wb3J0IHsgaW5zcGVjdE9iamVjdCB9IGZyb20gJy4vdXRpbHMnO1xuXG5cbmFzeW5jIGZ1bmN0aW9uIHByZWZsaWdodENoZWNrcyAocGFyc2VyLCBhcmdzLCB0aHJvd0luc3RlYWRPZkV4aXQgPSBmYWxzZSkge1xuICB0cnkge1xuICAgIGNoZWNrTm9kZU9rKCk7XG4gICAgaWYgKGFyZ3MuYXN5bmNUcmFjZSkge1xuICAgICAgcmVxdWlyZSgnbG9uZ2pvaG4nKS5hc3luY190cmFjZV9saW1pdCA9IC0xO1xuICAgIH1cbiAgICBpZiAoYXJncy5zaG93Q29uZmlnKSB7XG4gICAgICBhd2FpdCBzaG93Q29uZmlnKCk7XG4gICAgICBwcm9jZXNzLmV4aXQoMCk7XG4gICAgfVxuICAgIHdhcm5Ob2RlRGVwcmVjYXRpb25zKCk7XG4gICAgdmFsaWRhdGVTZXJ2ZXJBcmdzKHBhcnNlciwgYXJncyk7XG4gICAgaWYgKGFyZ3MudG1wRGlyKSB7XG4gICAgICBhd2FpdCB2YWxpZGF0ZVRtcERpcihhcmdzLnRtcERpcik7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2dnZXIuZXJyb3IoZXJyLm1lc3NhZ2UucmVkKTtcbiAgICBpZiAodGhyb3dJbnN0ZWFkT2ZFeGl0KSB7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuXG4gICAgcHJvY2Vzcy5leGl0KDEpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGxvZ0RlcHJlY2F0aW9uV2FybmluZyAoZGVwcmVjYXRlZEFyZ3MpIHtcbiAgbG9nZ2VyLndhcm4oJ0RlcHJlY2F0ZWQgc2VydmVyIGFyZ3M6Jyk7XG4gIGZvciAobGV0IFthcmcsIHJlYWxBcmddIG9mIF8udG9QYWlycyhkZXByZWNhdGVkQXJncykpIHtcbiAgICBsb2dnZXIud2FybihgICAke2FyZy5yZWR9ID0+ICR7cmVhbEFyZ31gKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBsb2dOb25EZWZhdWx0QXJnc1dhcm5pbmcgKGFyZ3MpIHtcbiAgbG9nZ2VyLmluZm8oJ05vbi1kZWZhdWx0IHNlcnZlciBhcmdzOicpO1xuICBpbnNwZWN0T2JqZWN0KGFyZ3MpO1xufVxuXG5mdW5jdGlvbiBsb2dEZWZhdWx0Q2FwYWJpbGl0aWVzV2FybmluZyAoY2Fwcykge1xuICBsb2dnZXIuaW5mbygnRGVmYXVsdCBjYXBhYmlsaXRpZXMsIHdoaWNoIHdpbGwgYmUgYWRkZWQgdG8gZWFjaCByZXF1ZXN0ICcgK1xuICAgICAgICAgICAgICAndW5sZXNzIG92ZXJyaWRkZW4gYnkgZGVzaXJlZCBjYXBhYmlsaXRpZXM6Jyk7XG4gIGluc3BlY3RPYmplY3QoY2Fwcyk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGxvZ1N0YXJ0dXBJbmZvIChwYXJzZXIsIGFyZ3MpIHtcbiAgbGV0IHdlbGNvbWUgPSBgV2VsY29tZSB0byBBcHBpdW0gdiR7QVBQSVVNX1ZFUn1gO1xuICBsZXQgYXBwaXVtUmV2ID0gYXdhaXQgZ2V0R2l0UmV2KCk7XG4gIGlmIChhcHBpdW1SZXYpIHtcbiAgICB3ZWxjb21lICs9IGAgKFJFViAke2FwcGl1bVJldn0pYDtcbiAgfVxuICBsb2dnZXIuaW5mbyh3ZWxjb21lKTtcblxuICBsZXQgc2hvd0FyZ3MgPSBnZXROb25EZWZhdWx0QXJncyhwYXJzZXIsIGFyZ3MpO1xuICBpZiAoXy5zaXplKHNob3dBcmdzKSkge1xuICAgIGxvZ05vbkRlZmF1bHRBcmdzV2FybmluZyhzaG93QXJncyk7XG4gIH1cbiAgbGV0IGRlcHJlY2F0ZWRBcmdzID0gZ2V0RGVwcmVjYXRlZEFyZ3MocGFyc2VyLCBhcmdzKTtcbiAgaWYgKF8uc2l6ZShkZXByZWNhdGVkQXJncykpIHtcbiAgICBsb2dEZXByZWNhdGlvbldhcm5pbmcoZGVwcmVjYXRlZEFyZ3MpO1xuICB9XG4gIGlmICghXy5pc0VtcHR5KGFyZ3MuZGVmYXVsdENhcGFiaWxpdGllcykpIHtcbiAgICBsb2dEZWZhdWx0Q2FwYWJpbGl0aWVzV2FybmluZyhhcmdzLmRlZmF1bHRDYXBhYmlsaXRpZXMpO1xuICB9XG4gIC8vIFRPRE86IGJyaW5nIGJhY2sgbG9nbGV2ZWwgcmVwb3J0aW5nIGJlbG93IG9uY2UgbG9nZ2VyIGlzIGZsdXNoZWQgb3V0XG4gIC8vbG9nZ2VyLmluZm8oJ0NvbnNvbGUgTG9nTGV2ZWw6ICcgKyBsb2dnZXIudHJhbnNwb3J0cy5jb25zb2xlLmxldmVsKTtcbiAgLy9pZiAobG9nZ2VyLnRyYW5zcG9ydHMuZmlsZSkge1xuICAgIC8vbG9nZ2VyLmluZm8oJ0ZpbGUgTG9nTGV2ZWw6ICcgKyBsb2dnZXIudHJhbnNwb3J0cy5maWxlLmxldmVsKTtcbiAgLy99XG59XG5cbmZ1bmN0aW9uIGxvZ1NlcnZlclBvcnQgKGFkZHJlc3MsIHBvcnQpIHtcbiAgbGV0IGxvZ01lc3NhZ2UgPSBgQXBwaXVtIFJFU1QgaHR0cCBpbnRlcmZhY2UgbGlzdGVuZXIgc3RhcnRlZCBvbiBgICtcbiAgICAgICAgICAgICAgICAgICBgJHthZGRyZXNzfToke3BvcnR9YDtcbiAgbG9nZ2VyLmluZm8obG9nTWVzc2FnZSk7XG59XG5cbmZ1bmN0aW9uIGluaXRIZWFwZHVtcCAoYXJncykge1xuICBpZiAoYXJncy5oZWFwZHVtcEVuYWJsZWQpIHtcbiAgICByZXF1aXJlKCdoZWFwZHVtcCcpO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG1haW4gKGFyZ3MgPSBudWxsKSB7XG4gIGxldCBwYXJzZXIgPSBnZXRQYXJzZXIoKTtcbiAgbGV0IHRocm93SW5zdGVhZE9mRXhpdCA9IGZhbHNlO1xuICBpZiAoYXJncykge1xuICAgIC8vIGEgY29udGFpbmluZyBwYWNrYWdlIHBhc3NlZCBpbiB0aGVpciBvd24gYXJncywgbGV0J3MgZmlsbCB0aGVtIG91dFxuICAgIC8vIHdpdGggZGVmYXVsdHNcbiAgICBhcmdzID0gT2JqZWN0LmFzc2lnbih7fSwgZ2V0RGVmYXVsdEFyZ3MoKSwgYXJncyk7XG5cbiAgICAvLyBpZiB3ZSBoYXZlIGEgY29udGFpbmluZyBwYWNrYWdlIGluc3RlYWQgb2YgcnVubmluZyBhcyBhIENMSSBwcm9jZXNzLFxuICAgIC8vIHRoYXQgcGFja2FnZSBtaWdodCBub3QgYXBwcmVjaWF0ZSB1cyBjYWxsaW5nICdwcm9jZXNzLmV4aXQnIHdpbGx5LVxuICAgIC8vIG5pbGx5LCBzbyBnaXZlIGl0IHRoZSBvcHRpb24gdG8gaGF2ZSB1cyB0aHJvdyBpbnN0ZWFkIG9mIGV4aXRcbiAgICBpZiAoYXJncy50aHJvd0luc3RlYWRPZkV4aXQpIHtcbiAgICAgIHRocm93SW5zdGVhZE9mRXhpdCA9IHRydWU7XG4gICAgICAvLyBidXQgcmVtb3ZlIGl0IHNpbmNlIGl0J3Mgbm90IGEgcmVhbCBzZXJ2ZXIgYXJnIHBlciBzZVxuICAgICAgZGVsZXRlIGFyZ3MudGhyb3dJbnN0ZWFkT2ZFeGl0O1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBvdGhlcndpc2UgcGFyc2UgZnJvbSBDTElcbiAgICBhcmdzID0gcGFyc2VyLnBhcnNlQXJncygpO1xuICB9XG4gIGluaXRIZWFwZHVtcChhcmdzKTtcbiAgYXdhaXQgbG9nc2lua0luaXQoYXJncyk7XG4gIGF3YWl0IHByZWZsaWdodENoZWNrcyhwYXJzZXIsIGFyZ3MsIHRocm93SW5zdGVhZE9mRXhpdCk7XG4gIGF3YWl0IGxvZ1N0YXJ0dXBJbmZvKHBhcnNlciwgYXJncyk7XG4gIGxldCBhcHBpdW1Ecml2ZXIgPSBuZXcgQXBwaXVtRHJpdmVyKGFyZ3MpO1xuICBsZXQgcm91dGVyID0gcm91dGVDb25maWd1cmluZ0Z1bmN0aW9uKGFwcGl1bURyaXZlcik7XG4gIGxldCBzZXJ2ZXIgPSBhd2FpdCBiYXNlU2VydmVyKHJvdXRlciwgYXJncy5wb3J0LCBhcmdzLmFkZHJlc3MpO1xuICBhcHBpdW1Ecml2ZXIuc2VydmVyID0gc2VydmVyO1xuICB0cnkge1xuICAgIC8vIFRPRE8gcHJlbGF1bmNoIGlmIGFyZ3MubGF1bmNoIGlzIHNldFxuICAgIC8vIFRPRE86IHN0YXJ0QWxlcnRTb2NrZXQoc2VydmVyLCBhcHBpdW1TZXJ2ZXIpO1xuXG4gICAgLy8gY29uZmlndXJlIGFzIG5vZGUgb24gZ3JpZCwgaWYgbmVjZXNzYXJ5XG4gICAgaWYgKGFyZ3Mubm9kZWNvbmZpZyAhPT0gbnVsbCkge1xuICAgICAgYXdhaXQgcmVnaXN0ZXJOb2RlKGFyZ3Mubm9kZWNvbmZpZywgYXJncy5hZGRyZXNzLCBhcmdzLnBvcnQpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgYXdhaXQgc2VydmVyLmNsb3NlKCk7XG4gICAgdGhyb3cgZXJyO1xuICB9XG5cbiAgcHJvY2Vzcy5vbmNlKCdTSUdJTlQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbG9nZ2VyLmluZm8oYFJlY2VpdmVkIFNJR0lOVCAtIHNodXR0aW5nIGRvd25gKTtcbiAgICBhd2FpdCBzZXJ2ZXIuY2xvc2UoKTtcbiAgfSk7XG5cbiAgcHJvY2Vzcy5vbmNlKCdTSUdURVJNJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxvZ2dlci5pbmZvKGBSZWNlaXZlZCBTSUdURVJNIC0gc2h1dHRpbmcgZG93bmApO1xuICAgIGF3YWl0IHNlcnZlci5jbG9zZSgpO1xuICB9KTtcblxuICBsb2dTZXJ2ZXJQb3J0KGFyZ3MuYWRkcmVzcywgYXJncy5wb3J0KTtcblxuICByZXR1cm4gc2VydmVyO1xufVxuXG5pZiAocmVxdWlyZS5tYWluID09PSBtb2R1bGUpIHtcbiAgYXN5bmNpZnkobWFpbik7XG59XG5cbmV4cG9ydCB7IG1haW4gfTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
