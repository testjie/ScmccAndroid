'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumSupport = require('appium-support');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var STATIC_DIR = _path2['default'].resolve(__dirname, '..', '..', '..', 'static');
if (_lodash2['default'].isNull(_path2['default'].resolve(__dirname).match(/build[\/\\]lib[\/\\]express$/))) {
  // in some contexts we are not in the build directory,
  // so we don't want to go back the extra level
  exports.STATIC_DIR = STATIC_DIR = _path2['default'].resolve(__dirname, '..', '..', 'static');
}

function guineaPigTemplate(req, res, page) {
  var delay, throwError, params;
  return _regeneratorRuntime.async(function guineaPigTemplate$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        delay = parseInt(req.params.delay || req.query.delay || 0, 10);
        throwError = req.params.throwError || req.query.throwError || '';
        params = {
          throwError: throwError,
          serverTime: parseInt(Date.now() / 1000, 10),
          userAgent: req.headers['user-agent'],
          comment: 'None'
        };

        if (req.method === 'POST') {
          params.comment = req.body.comments || params.comment;
        }
        _logger2['default'].debug('Sending guinea pig response with params: ' + JSON.stringify(params));

        if (!delay) {
          context$1$0.next = 9;
          break;
        }

        _logger2['default'].debug('Waiting ' + delay + 'ms before responding');
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(_bluebird2['default'].delay(delay));

      case 9:
        res.set('Content-Type', 'text/html');
        res.cookie('guineacookie1', 'i am a cookie value', { path: '/' });
        res.cookie('guineacookie2', 'cookié2', { path: '/' });
        res.cookie('guineacookie3', 'cant access this', {
          domain: '.blargimarg.com',
          path: '/'
        });
        context$1$0.t0 = res;
        context$1$0.next = 16;
        return _regeneratorRuntime.awrap(getTemplate(page));

      case 16:
        context$1$0.t1 = params;
        context$1$0.t2 = (0, context$1$0.sent)(context$1$0.t1);
        context$1$0.t0.send.call(context$1$0.t0, context$1$0.t2);

      case 19:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

/*
 * Dynamic page mapped to /test/guinea-pig
 */
function guineaPig(req, res) {
  return _regeneratorRuntime.async(function guineaPig$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(guineaPigTemplate(req, res, 'guinea-pig.html'));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

/*
 * Dynamic page mapped to /test/guinea-pig-scrollable
 */
function guineaPigScrollable(req, res) {
  return _regeneratorRuntime.async(function guineaPigScrollable$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(guineaPigTemplate(req, res, 'guinea-pig-scrollable.html'));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

/*
 * Dynamic page mapped to /test/guinea-pig-app-banner
 */
function guineaPigAppBanner(req, res) {
  return _regeneratorRuntime.async(function guineaPigAppBanner$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(guineaPigTemplate(req, res, 'guinea-pig-app-banner.html'));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

/*
 * Dynamic page mapped to /welcome
 */
function welcome(req, res) {
  var params;
  return _regeneratorRuntime.async(function welcome$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        params = { message: 'Let\'s browse!' };

        _logger2['default'].debug('Sending welcome response with params: ' + JSON.stringify(params));
        context$1$0.t0 = res;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(getTemplate('welcome.html'));

      case 5:
        context$1$0.t1 = params;
        context$1$0.t2 = (0, context$1$0.sent)(context$1$0.t1);
        context$1$0.t0.send.call(context$1$0.t0, context$1$0.t2);

      case 8:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function getTemplate(templateName) {
  var content;
  return _regeneratorRuntime.async(function getTemplate$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.readFile(_path2['default'].resolve(STATIC_DIR, 'test', templateName)));

      case 2:
        content = context$1$0.sent;
        return context$1$0.abrupt('return', _lodash2['default'].template(content.toString()));

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

exports.guineaPig = guineaPig;
exports.guineaPigScrollable = guineaPigScrollable;
exports.guineaPigAppBanner = guineaPigAppBanner;
exports.welcome = welcome;
exports.STATIC_DIR = STATIC_DIR;
//# sourceMappingURL=data:application/json;charset=utf8;base64,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LGtCQUFrQixDQUFFLEdBQUcsRUFBRSxHQUFHOzs7Ozt5Q0FDNUIsaUJBQWlCLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSw0QkFBNEIsQ0FBQzs7Ozs7Ozs7OztDQUN2RTs7Ozs7QUFLRCxTQUFlLE9BQU8sQ0FBRSxHQUFHLEVBQUUsR0FBRztNQUMxQixNQUFNOzs7O0FBQU4sY0FBTSxHQUFHLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFDOztBQUN4Qyw0QkFBSSxLQUFLLDRDQUEwQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFHLENBQUM7eUJBQzdFLEdBQUc7O3lDQUFhLFdBQVcsQ0FBQyxjQUFjLENBQUM7Ozt5QkFBRSxNQUFNOzt1QkFBL0MsSUFBSTs7Ozs7OztDQUNUOztBQUVELFNBQWUsV0FBVyxDQUFFLFlBQVk7TUFDbEMsT0FBTzs7Ozs7eUNBQVMsa0JBQUcsUUFBUSxDQUFDLGtCQUFLLE9BQU8sQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDOzs7QUFBM0UsZUFBTzs0Q0FDSixvQkFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDOzs7Ozs7O0NBQ3RDOztRQUVRLFNBQVMsR0FBVCxTQUFTO1FBQUUsbUJBQW1CLEdBQW5CLG1CQUFtQjtRQUFFLGtCQUFrQixHQUFsQixrQkFBa0I7UUFBRSxPQUFPLEdBQVAsT0FBTztRQUFFLFVBQVUsR0FBVixVQUFVIiwiZmlsZSI6ImxpYi9leHByZXNzL3N0YXRpYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgZnMgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XG5pbXBvcnQgQiBmcm9tICdibHVlYmlyZCc7XG5cblxubGV0IFNUQVRJQ19ESVIgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4nLCAnLi4nLCAnLi4nLCAnc3RhdGljJyk7XG5pZiAoXy5pc051bGwocGF0aC5yZXNvbHZlKF9fZGlybmFtZSkubWF0Y2goL2J1aWxkW1xcL1xcXFxdbGliW1xcL1xcXFxdZXhwcmVzcyQvKSkpIHtcbiAgLy8gaW4gc29tZSBjb250ZXh0cyB3ZSBhcmUgbm90IGluIHRoZSBidWlsZCBkaXJlY3RvcnksXG4gIC8vIHNvIHdlIGRvbid0IHdhbnQgdG8gZ28gYmFjayB0aGUgZXh0cmEgbGV2ZWxcbiAgU1RBVElDX0RJUiA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLicsICcuLicsICdzdGF0aWMnKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ3VpbmVhUGlnVGVtcGxhdGUgKHJlcSwgcmVzLCBwYWdlKSB7XG4gIGxldCBkZWxheSA9IHBhcnNlSW50KHJlcS5wYXJhbXMuZGVsYXkgfHwgcmVxLnF1ZXJ5LmRlbGF5IHx8IDAsIDEwKTtcbiAgbGV0IHRocm93RXJyb3IgPSByZXEucGFyYW1zLnRocm93RXJyb3IgfHwgcmVxLnF1ZXJ5LnRocm93RXJyb3IgfHwgJyc7XG4gIGxldCBwYXJhbXMgPSB7XG4gICAgdGhyb3dFcnJvcixcbiAgICBzZXJ2ZXJUaW1lOiBwYXJzZUludChEYXRlLm5vdygpIC8gMTAwMCwgMTApLFxuICAgIHVzZXJBZ2VudDogcmVxLmhlYWRlcnNbJ3VzZXItYWdlbnQnXSxcbiAgICBjb21tZW50OiAnTm9uZSdcbiAgfTtcbiAgaWYgKHJlcS5tZXRob2QgPT09ICdQT1NUJykge1xuICAgIHBhcmFtcy5jb21tZW50ID0gcmVxLmJvZHkuY29tbWVudHMgfHwgcGFyYW1zLmNvbW1lbnQ7XG4gIH1cbiAgbG9nLmRlYnVnKGBTZW5kaW5nIGd1aW5lYSBwaWcgcmVzcG9uc2Ugd2l0aCBwYXJhbXM6ICR7SlNPTi5zdHJpbmdpZnkocGFyYW1zKX1gKTtcbiAgaWYgKGRlbGF5KSB7XG4gICAgbG9nLmRlYnVnKGBXYWl0aW5nICR7ZGVsYXl9bXMgYmVmb3JlIHJlc3BvbmRpbmdgKTtcbiAgICBhd2FpdCBCLmRlbGF5KGRlbGF5KTtcbiAgfVxuICByZXMuc2V0KCdDb250ZW50LVR5cGUnLCAndGV4dC9odG1sJyk7XG4gIHJlcy5jb29raWUoJ2d1aW5lYWNvb2tpZTEnLCAnaSBhbSBhIGNvb2tpZSB2YWx1ZScsIHtwYXRoOiAnLyd9KTtcbiAgcmVzLmNvb2tpZSgnZ3VpbmVhY29va2llMicsICdjb29racOpMicsIHtwYXRoOiAnLyd9KTtcbiAgcmVzLmNvb2tpZSgnZ3VpbmVhY29va2llMycsICdjYW50IGFjY2VzcyB0aGlzJywge1xuICAgIGRvbWFpbjogJy5ibGFyZ2ltYXJnLmNvbScsXG4gICAgcGF0aDogJy8nXG4gIH0pO1xuICByZXMuc2VuZCgoYXdhaXQgZ2V0VGVtcGxhdGUocGFnZSkpKHBhcmFtcykpO1xufVxuXG4vKlxuICogRHluYW1pYyBwYWdlIG1hcHBlZCB0byAvdGVzdC9ndWluZWEtcGlnXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGd1aW5lYVBpZyAocmVxLCByZXMpIHtcbiAgcmV0dXJuIGF3YWl0IGd1aW5lYVBpZ1RlbXBsYXRlKHJlcSwgcmVzLCAnZ3VpbmVhLXBpZy5odG1sJyk7XG59XG5cbi8qXG4gKiBEeW5hbWljIHBhZ2UgbWFwcGVkIHRvIC90ZXN0L2d1aW5lYS1waWctc2Nyb2xsYWJsZVxuICovXG5hc3luYyBmdW5jdGlvbiBndWluZWFQaWdTY3JvbGxhYmxlIChyZXEsIHJlcykge1xuICByZXR1cm4gYXdhaXQgZ3VpbmVhUGlnVGVtcGxhdGUocmVxLCByZXMsICdndWluZWEtcGlnLXNjcm9sbGFibGUuaHRtbCcpO1xufVxuXG4vKlxuICogRHluYW1pYyBwYWdlIG1hcHBlZCB0byAvdGVzdC9ndWluZWEtcGlnLWFwcC1iYW5uZXJcbiAqL1xuYXN5bmMgZnVuY3Rpb24gZ3VpbmVhUGlnQXBwQmFubmVyIChyZXEsIHJlcykge1xuICByZXR1cm4gYXdhaXQgZ3VpbmVhUGlnVGVtcGxhdGUocmVxLCByZXMsICdndWluZWEtcGlnLWFwcC1iYW5uZXIuaHRtbCcpO1xufVxuXG4vKlxuICogRHluYW1pYyBwYWdlIG1hcHBlZCB0byAvd2VsY29tZVxuICovXG5hc3luYyBmdW5jdGlvbiB3ZWxjb21lIChyZXEsIHJlcykge1xuICBsZXQgcGFyYW1zID0ge21lc3NhZ2U6ICdMZXRcXCdzIGJyb3dzZSEnfTtcbiAgbG9nLmRlYnVnKGBTZW5kaW5nIHdlbGNvbWUgcmVzcG9uc2Ugd2l0aCBwYXJhbXM6ICR7SlNPTi5zdHJpbmdpZnkocGFyYW1zKX1gKTtcbiAgcmVzLnNlbmQoKGF3YWl0IGdldFRlbXBsYXRlKCd3ZWxjb21lLmh0bWwnKSkocGFyYW1zKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFRlbXBsYXRlICh0ZW1wbGF0ZU5hbWUpIHtcbiAgbGV0IGNvbnRlbnQgPSBhd2FpdCBmcy5yZWFkRmlsZShwYXRoLnJlc29sdmUoU1RBVElDX0RJUiwgJ3Rlc3QnLCB0ZW1wbGF0ZU5hbWUpKTtcbiAgcmV0dXJuIF8udGVtcGxhdGUoY29udGVudC50b1N0cmluZygpKTtcbn1cblxuZXhwb3J0IHsgZ3VpbmVhUGlnLCBndWluZWFQaWdTY3JvbGxhYmxlLCBndWluZWFQaWdBcHBCYW5uZXIsIHdlbGNvbWUsIFNUQVRJQ19ESVIgfTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4ifQ==
