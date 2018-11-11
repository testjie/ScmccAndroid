require('source-map-support').install();

/* global describe:true, it:true */

'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _ = require('../..');

var _mockRequest = require('./mock-request');

var _mockRequest2 = _interopRequireDefault(_mockRequest);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var should = _chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

function buildReqRes(url, method, body) {
  var req = { originalUrl: url, method: method, body: body };
  var res = {};
  res.headers = {};
  res.set = function (k, v) {
    res[k] = v;
  };
  res.status = function (code) {
    res.sentCode = code;
    return res;
  };
  res.send = function (body) {
    try {
      body = JSON.parse(body);
    } catch (e) {}
    res.sentBody = body;
  };
  return [req, res];
}

function mockProxy() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var proxy = new _.JWProxy(opts);
  proxy.request = function callee$1$0() {
    var args$2$0 = arguments;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(_mockRequest2['default'].apply(undefined, args$2$0));

        case 2:
          return context$2$0.abrupt('return', context$2$0.sent);

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  };
  return proxy;
}

describe('proxy', function () {
  it('should override default params', function () {
    var j = mockProxy({ server: '127.0.0.2' });
    j.server.should.equal('127.0.0.2');
    j.port.should.equal(4444);
  });
  it('should save session id on session creation', function callee$1$0() {
    var j, _ref, _ref2, res, body;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          j = mockProxy();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(j.proxy('/session', 'POST', { desiredCapabilities: {} }));

        case 3:
          _ref = context$2$0.sent;
          _ref2 = _slicedToArray(_ref, 2);
          res = _ref2[0];
          body = _ref2[1];

          res.statusCode.should.equal(200);
          body.should.eql({ status: 0, sessionId: '123', value: { browserName: 'boo' } });
          j.sessionId.should.equal('123');

        case 10:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should save session id on session creation with 303', function callee$1$0() {
    var j, _ref3, _ref32, res, body;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          j = mockProxy();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(j.proxy('/session', 'POST', { desiredCapabilities: { redirect: true } }));

        case 3:
          _ref3 = context$2$0.sent;
          _ref32 = _slicedToArray(_ref3, 2);
          res = _ref32[0];
          body = _ref32[1];

          res.statusCode.should.equal(303);
          body.should.eql('http://localhost:4444/wd/hub/session/123');
          j.sessionId.should.equal('123');

        case 10:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  describe('getUrlForProxy', function () {
    it('should modify session id, host, and port', function callee$2$0() {
      var j;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            j = mockProxy({ sessionId: '123' });

            j.getUrlForProxy('http://host.com:1234/wd/hub/session/456/element/200/value').should.eql('http://localhost:4444/wd/hub/session/123/element/200/value');

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should prepend scheme, host and port if not provided', function callee$2$0() {
      var j;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            j = mockProxy({ sessionId: '123' });

            j.getUrlForProxy('/wd/hub/session/456/element/200/value').should.eql('http://localhost:4444/wd/hub/session/123/element/200/value');

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should work with urls which do not have session ids', function callee$2$0() {
      var j, newUrl;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            j = mockProxy({ sessionId: '123' });

            j.getUrlForProxy('http://host.com:1234/wd/hub/session').should.eql('http://localhost:4444/wd/hub/session');

            newUrl = j.getUrlForProxy('/wd/hub/session');

            newUrl.should.eql('http://localhost:4444/wd/hub/session');

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should throw an error if url requires a sessionId but its null', function callee$2$0() {
      var j, e;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            j = mockProxy();
            e = undefined;

            try {
              j.getUrlForProxy('/wd/hub/session/456/element/200/value');
            } catch (err) {
              e = err;
            }
            should.exist(e);
            e.message.should.contain('without session id');

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should not throw an error if url does not require a session id and its null', function callee$2$0() {
      var j, newUrl;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            j = mockProxy();
            newUrl = j.getUrlForProxy('/wd/hub/status');

            should.exist(newUrl);

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('straight proxy', function () {
    it('should successfully proxy straight', function callee$2$0() {
      var j, _ref4, _ref42, res, body;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            j = mockProxy();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(j.proxy('/status', 'GET'));

          case 3:
            _ref4 = context$3$0.sent;
            _ref42 = _slicedToArray(_ref4, 2);
            res = _ref42[0];
            body = _ref42[1];

            res.statusCode.should.equal(200);
            body.should.eql({ status: 0, value: { foo: 'bar' } });

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should pass along request errors', function callee$2$0() {
      var j;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            j = mockProxy({ sessionId: '123' });

            j.proxy('/badurl', 'GET').should.eventually.be.rejectedWith("Could not proxy");

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should proxy error responses and codes', function callee$2$0() {
      var j, _ref5, _ref52, res, body;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            j = mockProxy({ sessionId: '123' });
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(j.proxy('/element/bad/text', 'GET'));

          case 3:
            _ref5 = context$3$0.sent;
            _ref52 = _slicedToArray(_ref5, 2);
            res = _ref52[0];
            body = _ref52[1];

            res.statusCode.should.equal(500);
            body.should.eql({ status: 11, value: { message: 'Invisible element' } });

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('command proxy', function () {
    it('should successfully proxy command', function callee$2$0() {
      var j, res;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            j = mockProxy();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(j.command('/status', 'GET'));

          case 3:
            res = context$3$0.sent;

            res.should.eql({ foo: 'bar' });

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should pass along request errors', function callee$2$0() {
      var j;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            j = mockProxy({ sessionId: '123' });

            j.command('/badurl', 'GET').should.eventually.be.rejectedWith("Could not proxy");

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should throw when a command fails', function callee$2$0() {
      var j, e;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            j = mockProxy({ sessionId: '123' });
            e = null;
            context$3$0.prev = 2;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(j.command('/element/bad/text', 'GET'));

          case 5:
            context$3$0.next = 10;
            break;

          case 7:
            context$3$0.prev = 7;
            context$3$0.t0 = context$3$0['catch'](2);

            e = context$3$0.t0;

          case 10:
            should.exist(e);
            e.message.should.contain('Original error: Invisible element');
            e.value.should.eql({ message: 'Invisible element' });
            e.status.should.equal(11);

          case 14:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this, [[2, 7]]);
    });
    it('should throw when a command fails with a 200 because the status is not 0', function callee$2$0() {
      var j, e;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            j = mockProxy({ sessionId: '123' });
            e = null;
            context$3$0.prev = 2;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(j.command('/element/200/text', 'GET'));

          case 5:
            context$3$0.next = 10;
            break;

          case 7:
            context$3$0.prev = 7;
            context$3$0.t0 = context$3$0['catch'](2);

            e = context$3$0.t0;

          case 10:
            should.exist(e);
            e.message.should.contain('Original error: Invisible element');
            e.value.should.eql({ message: 'Invisible element' });
            e.status.should.equal(11);

          case 14:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this, [[2, 7]]);
    });
    it('should throw when a command fails with a 100', function callee$2$0() {
      var j, e;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            j = mockProxy({ sessionId: '123' });
            e = null;
            context$3$0.prev = 2;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(j.command('/session/badchrome/nochrome', 'GET'));

          case 5:
            context$3$0.next = 10;
            break;

          case 7:
            context$3$0.prev = 7;
            context$3$0.t0 = context$3$0['catch'](2);

            e = context$3$0.t0;

          case 10:
            should.exist(e);
            e.message.should.contain('Original error: chrome not reachable');
            e.value.should.eql({ message: 'chrome not reachable' });
            e.status.should.equal(0);

          case 14:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this, [[2, 7]]);
    });
  });
  describe('req/res proxy', function () {
    it('should successfully proxy via req and send to res', function callee$2$0() {
      var j, _buildReqRes, _buildReqRes2, req, res;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            j = mockProxy();
            _buildReqRes = buildReqRes('/status', 'GET');
            _buildReqRes2 = _slicedToArray(_buildReqRes, 2);
            req = _buildReqRes2[0];
            res = _buildReqRes2[1];
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(j.proxyReqRes(req, res));

          case 7:
            res.headers['Content-type'].should.equal('application/json');
            res.sentCode.should.equal(200);
            res.sentBody.should.eql({ status: 0, value: { foo: 'bar' } });

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should rewrite the inner session id so it doesnt change', function callee$2$0() {
      var j, _buildReqRes3, _buildReqRes32, req, res;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            j = mockProxy({ sessionId: '123' });
            _buildReqRes3 = buildReqRes('/element/200/value', 'GET');
            _buildReqRes32 = _slicedToArray(_buildReqRes3, 2);
            req = _buildReqRes32[0];
            res = _buildReqRes32[1];
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(j.proxyReqRes(req, res));

          case 7:
            res.sentBody.should.eql({ status: 0, value: 'foobar', sessionId: '123' });

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should rewrite the inner session id with sessionId in url', function callee$2$0() {
      var j, _buildReqRes4, _buildReqRes42, req, res;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            j = mockProxy({ sessionId: '123' });
            _buildReqRes4 = buildReqRes('/wd/hub/session/456/element/200/value', 'POST');
            _buildReqRes42 = _slicedToArray(_buildReqRes4, 2);
            req = _buildReqRes42[0];
            res = _buildReqRes42[1];
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(j.proxyReqRes(req, res));

          case 7:
            res.sentBody.should.eql({ status: 0, value: 'foobar', sessionId: '456' });

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should pass through urls that do not require session IDs', function callee$2$0() {
      var j, _buildReqRes5, _buildReqRes52, req, res;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            j = mockProxy({ sessionId: '123' });
            _buildReqRes5 = buildReqRes('/wd/hub/status', 'GET');
            _buildReqRes52 = _slicedToArray(_buildReqRes5, 2);
            req = _buildReqRes52[0];
            res = _buildReqRes52[1];
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(j.proxyReqRes(req, res));

          case 7:
            res.sentBody.should.eql({ status: 0, value: { 'foo': 'bar' } });

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should proxy strange responses', function callee$2$0() {
      var j, _buildReqRes6, _buildReqRes62, req, res;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            j = mockProxy({ sessionId: '123' });
            _buildReqRes6 = buildReqRes('/nochrome', 'GET');
            _buildReqRes62 = _slicedToArray(_buildReqRes6, 2);
            req = _buildReqRes62[0];
            res = _buildReqRes62[1];
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(j.proxyReqRes(req, res));

          case 7:
            res.sentCode.should.equal(100);
            res.sentBody.should.eql({ status: 0, value: { message: 'chrome not reachable' } });

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvanNvbndwLXByb3h5L3Byb3h5LXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O2dCQUd3QixPQUFPOzsyQkFDWCxnQkFBZ0I7Ozs7b0JBQ25CLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O0FBRzdDLElBQU0sTUFBTSxHQUFHLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQzdCLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLFNBQVMsV0FBVyxDQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0FBQ3ZDLE1BQUksR0FBRyxHQUFHLEVBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQU4sTUFBTSxFQUFFLElBQUksRUFBSixJQUFJLEVBQUMsQ0FBQztBQUMzQyxNQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDYixLQUFHLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUNqQixLQUFHLENBQUMsR0FBRyxHQUFHLFVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBSztBQUFFLE9BQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7R0FBRSxDQUFDO0FBQ3BDLEtBQUcsQ0FBQyxNQUFNLEdBQUcsVUFBQyxJQUFJLEVBQUs7QUFDckIsT0FBRyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFDcEIsV0FBTyxHQUFHLENBQUM7R0FDWixDQUFDO0FBQ0YsS0FBRyxDQUFDLElBQUksR0FBRyxVQUFDLElBQUksRUFBSztBQUNuQixRQUFJO0FBQ0YsVUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDekIsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFO0FBQ2QsT0FBRyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7R0FDckIsQ0FBQztBQUNGLFNBQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7Q0FDbkI7O0FBRUQsU0FBUyxTQUFTLEdBQWE7TUFBWCxJQUFJLHlE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Ozs7O0FBRFQsYUFBQyxHQUFHLFNBQVMsQ0FBQyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsQ0FBQzs0QkFDcEIsV0FBVyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUM7O0FBQTNDLGVBQUc7QUFBRSxlQUFHOzs2Q0FDUCxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7OztBQUM3QixlQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDL0IsZUFBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUMsRUFBQyxDQUFDLENBQUM7Ozs7Ozs7S0FDaEYsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvanNvbndwLXByb3h5L3Byb3h5LXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHJhbnNwaWxlOm1vY2hhXHJcbi8qIGdsb2JhbCBkZXNjcmliZTp0cnVlLCBpdDp0cnVlICovXHJcblxyXG5pbXBvcnQgeyBKV1Byb3h5IH0gZnJvbSAnLi4vLi4nO1xyXG5pbXBvcnQgcmVxdWVzdCBmcm9tICcuL21vY2stcmVxdWVzdCc7XHJcbmltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xyXG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XHJcblxyXG5cclxuY29uc3Qgc2hvdWxkID0gY2hhaS5zaG91bGQoKTtcclxuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xyXG5cclxuZnVuY3Rpb24gYnVpbGRSZXFSZXMgKHVybCwgbWV0aG9kLCBib2R5KSB7XHJcbiAgbGV0IHJlcSA9IHtvcmlnaW5hbFVybDogdXJsLCBtZXRob2QsIGJvZHl9O1xyXG4gIGxldCByZXMgPSB7fTtcclxuICByZXMuaGVhZGVycyA9IHt9O1xyXG4gIHJlcy5zZXQgPSAoaywgdikgPT4geyByZXNba10gPSB2OyB9O1xyXG4gIHJlcy5zdGF0dXMgPSAoY29kZSkgPT4ge1xyXG4gICAgcmVzLnNlbnRDb2RlID0gY29kZTtcclxuICAgIHJldHVybiByZXM7XHJcbiAgfTtcclxuICByZXMuc2VuZCA9IChib2R5KSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBib2R5ID0gSlNPTi5wYXJzZShib2R5KTtcclxuICAgIH0gY2F0Y2ggKGUpIHt9XHJcbiAgICByZXMuc2VudEJvZHkgPSBib2R5O1xyXG4gIH07XHJcbiAgcmV0dXJuIFtyZXEsIHJlc107XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1vY2tQcm94eSAob3B0cyA9IHt9KSB7XHJcbiAgbGV0IHByb3h5ID0gbmV3IEpXUHJveHkob3B0cyk7XHJcbiAgcHJveHkucmVxdWVzdCA9IGFzeW5jIGZ1bmN0aW9uICguLi5hcmdzKSB7XHJcbiAgICByZXR1cm4gYXdhaXQgcmVxdWVzdCguLi5hcmdzKTtcclxuICB9O1xyXG4gIHJldHVybiBwcm94eTtcclxufVxyXG5cclxuZGVzY3JpYmUoJ3Byb3h5JywgZnVuY3Rpb24gKCkge1xyXG4gIGl0KCdzaG91bGQgb3ZlcnJpZGUgZGVmYXVsdCBwYXJhbXMnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgaiA9IG1vY2tQcm94eSh7c2VydmVyOiAnMTI3LjAuMC4yJ30pO1xyXG4gICAgai5zZXJ2ZXIuc2hvdWxkLmVxdWFsKCcxMjcuMC4wLjInKTtcclxuICAgIGoucG9ydC5zaG91bGQuZXF1YWwoNDQ0NCk7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBzYXZlIHNlc3Npb24gaWQgb24gc2Vzc2lvbiBjcmVhdGlvbicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBqID0gbW9ja1Byb3h5KCk7XHJcbiAgICBsZXQgW3JlcywgYm9keV0gPSBhd2FpdCBqLnByb3h5KCcvc2Vzc2lvbicsICdQT1NUJywge2Rlc2lyZWRDYXBhYmlsaXRpZXM6IHt9fSk7XHJcbiAgICByZXMuc3RhdHVzQ29kZS5zaG91bGQuZXF1YWwoMjAwKTtcclxuICAgIGJvZHkuc2hvdWxkLmVxbCh7c3RhdHVzOiAwLCBzZXNzaW9uSWQ6ICcxMjMnLCB2YWx1ZToge2Jyb3dzZXJOYW1lOiAnYm9vJ319KTtcclxuICAgIGouc2Vzc2lvbklkLnNob3VsZC5lcXVhbCgnMTIzJyk7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBzYXZlIHNlc3Npb24gaWQgb24gc2Vzc2lvbiBjcmVhdGlvbiB3aXRoIDMwMycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBqID0gbW9ja1Byb3h5KCk7XHJcbiAgICBsZXQgW3JlcywgYm9keV0gPSBhd2FpdCBqLnByb3h5KCcvc2Vzc2lvbicsICdQT1NUJywge2Rlc2lyZWRDYXBhYmlsaXRpZXM6IHtyZWRpcmVjdDogdHJ1ZX19KTtcclxuICAgIHJlcy5zdGF0dXNDb2RlLnNob3VsZC5lcXVhbCgzMDMpO1xyXG4gICAgYm9keS5zaG91bGQuZXFsKCdodHRwOi8vbG9jYWxob3N0OjQ0NDQvd2QvaHViL3Nlc3Npb24vMTIzJyk7XHJcbiAgICBqLnNlc3Npb25JZC5zaG91bGQuZXF1YWwoJzEyMycpO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdnZXRVcmxGb3JQcm94eScsIGZ1bmN0aW9uICgpIHtcclxuICAgIGl0KCdzaG91bGQgbW9kaWZ5IHNlc3Npb24gaWQsIGhvc3QsIGFuZCBwb3J0JywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgaiA9IG1vY2tQcm94eSh7c2Vzc2lvbklkOiAnMTIzJ30pO1xyXG4gICAgICBqLmdldFVybEZvclByb3h5KCdodHRwOi8vaG9zdC5jb206MTIzNC93ZC9odWIvc2Vzc2lvbi80NTYvZWxlbWVudC8yMDAvdmFsdWUnKVxyXG4gICAgICAgLnNob3VsZC5lcWwoJ2h0dHA6Ly9sb2NhbGhvc3Q6NDQ0NC93ZC9odWIvc2Vzc2lvbi8xMjMvZWxlbWVudC8yMDAvdmFsdWUnKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBwcmVwZW5kIHNjaGVtZSwgaG9zdCBhbmQgcG9ydCBpZiBub3QgcHJvdmlkZWQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGxldCBqID0gbW9ja1Byb3h5KHtzZXNzaW9uSWQ6ICcxMjMnfSk7XHJcbiAgICAgIGouZ2V0VXJsRm9yUHJveHkoJy93ZC9odWIvc2Vzc2lvbi80NTYvZWxlbWVudC8yMDAvdmFsdWUnKVxyXG4gICAgICAgLnNob3VsZC5lcWwoJ2h0dHA6Ly9sb2NhbGhvc3Q6NDQ0NC93ZC9odWIvc2Vzc2lvbi8xMjMvZWxlbWVudC8yMDAvdmFsdWUnKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCB3b3JrIHdpdGggdXJscyB3aGljaCBkbyBub3QgaGF2ZSBzZXNzaW9uIGlkcycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgbGV0IGogPSBtb2NrUHJveHkoe3Nlc3Npb25JZDogJzEyMyd9KTtcclxuICAgICAgai5nZXRVcmxGb3JQcm94eSgnaHR0cDovL2hvc3QuY29tOjEyMzQvd2QvaHViL3Nlc3Npb24nKVxyXG4gICAgICAgLnNob3VsZC5lcWwoJ2h0dHA6Ly9sb2NhbGhvc3Q6NDQ0NC93ZC9odWIvc2Vzc2lvbicpO1xyXG5cclxuICAgICAgbGV0IG5ld1VybCA9IGouZ2V0VXJsRm9yUHJveHkoJy93ZC9odWIvc2Vzc2lvbicpO1xyXG4gICAgICBuZXdVcmwuc2hvdWxkLmVxbCgnaHR0cDovL2xvY2FsaG9zdDo0NDQ0L3dkL2h1Yi9zZXNzaW9uJyk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgdGhyb3cgYW4gZXJyb3IgaWYgdXJsIHJlcXVpcmVzIGEgc2Vzc2lvbklkIGJ1dCBpdHMgbnVsbCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgbGV0IGogPSBtb2NrUHJveHkoKTtcclxuICAgICAgbGV0IGU7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgai5nZXRVcmxGb3JQcm94eSgnL3dkL2h1Yi9zZXNzaW9uLzQ1Ni9lbGVtZW50LzIwMC92YWx1ZScpO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBlID0gZXJyO1xyXG4gICAgICB9XHJcbiAgICAgIHNob3VsZC5leGlzdChlKTtcclxuICAgICAgZS5tZXNzYWdlLnNob3VsZC5jb250YWluKCd3aXRob3V0IHNlc3Npb24gaWQnKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBub3QgdGhyb3cgYW4gZXJyb3IgaWYgdXJsIGRvZXMgbm90IHJlcXVpcmUgYSBzZXNzaW9uIGlkIGFuZCBpdHMgbnVsbCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgbGV0IGogPSBtb2NrUHJveHkoKTtcclxuICAgICAgbGV0IG5ld1VybCA9IGouZ2V0VXJsRm9yUHJveHkoJy93ZC9odWIvc3RhdHVzJyk7XHJcblxyXG4gICAgICBzaG91bGQuZXhpc3QobmV3VXJsKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdzdHJhaWdodCBwcm94eScsIGZ1bmN0aW9uICgpIHtcclxuICAgIGl0KCdzaG91bGQgc3VjY2Vzc2Z1bGx5IHByb3h5IHN0cmFpZ2h0JywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgaiA9IG1vY2tQcm94eSgpO1xyXG4gICAgICBsZXQgW3JlcywgYm9keV0gPSBhd2FpdCBqLnByb3h5KCcvc3RhdHVzJywgJ0dFVCcpO1xyXG4gICAgICByZXMuc3RhdHVzQ29kZS5zaG91bGQuZXF1YWwoMjAwKTtcclxuICAgICAgYm9keS5zaG91bGQuZXFsKHtzdGF0dXM6IDAsIHZhbHVlOiB7Zm9vOiAnYmFyJ319KTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBwYXNzIGFsb25nIHJlcXVlc3QgZXJyb3JzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgaiA9IG1vY2tQcm94eSh7c2Vzc2lvbklkOiAnMTIzJ30pO1xyXG4gICAgICBqLnByb3h5KCcvYmFkdXJsJywgJ0dFVCcpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aChcIkNvdWxkIG5vdCBwcm94eVwiKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBwcm94eSBlcnJvciByZXNwb25zZXMgYW5kIGNvZGVzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgaiA9IG1vY2tQcm94eSh7c2Vzc2lvbklkOiAnMTIzJ30pO1xyXG4gICAgICBsZXQgW3JlcywgYm9keV0gPSBhd2FpdCBqLnByb3h5KCcvZWxlbWVudC9iYWQvdGV4dCcsICdHRVQnKTtcclxuICAgICAgcmVzLnN0YXR1c0NvZGUuc2hvdWxkLmVxdWFsKDUwMCk7XHJcbiAgICAgIGJvZHkuc2hvdWxkLmVxbCh7c3RhdHVzOiAxMSwgdmFsdWU6IHttZXNzYWdlOiAnSW52aXNpYmxlIGVsZW1lbnQnfX0pO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ2NvbW1hbmQgcHJveHknLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpdCgnc2hvdWxkIHN1Y2Nlc3NmdWxseSBwcm94eSBjb21tYW5kJywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgaiA9IG1vY2tQcm94eSgpO1xyXG4gICAgICBsZXQgcmVzID0gYXdhaXQgai5jb21tYW5kKCcvc3RhdHVzJywgJ0dFVCcpO1xyXG4gICAgICByZXMuc2hvdWxkLmVxbCh7Zm9vOiAnYmFyJ30pO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHBhc3MgYWxvbmcgcmVxdWVzdCBlcnJvcnMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGxldCBqID0gbW9ja1Byb3h5KHtzZXNzaW9uSWQ6ICcxMjMnfSk7XHJcbiAgICAgIGouY29tbWFuZCgnL2JhZHVybCcsICdHRVQnKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoXCJDb3VsZCBub3QgcHJveHlcIik7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgdGhyb3cgd2hlbiBhIGNvbW1hbmQgZmFpbHMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGxldCBqID0gbW9ja1Byb3h5KHtzZXNzaW9uSWQ6ICcxMjMnfSk7XHJcbiAgICAgIGxldCBlID0gbnVsbDtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBhd2FpdCBqLmNvbW1hbmQoJy9lbGVtZW50L2JhZC90ZXh0JywgJ0dFVCcpO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBlID0gZXJyO1xyXG4gICAgICB9XHJcbiAgICAgIHNob3VsZC5leGlzdChlKTtcclxuICAgICAgZS5tZXNzYWdlLnNob3VsZC5jb250YWluKCdPcmlnaW5hbCBlcnJvcjogSW52aXNpYmxlIGVsZW1lbnQnKTtcclxuICAgICAgZS52YWx1ZS5zaG91bGQuZXFsKHttZXNzYWdlOiAnSW52aXNpYmxlIGVsZW1lbnQnfSk7XHJcbiAgICAgIGUuc3RhdHVzLnNob3VsZC5lcXVhbCgxMSk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgdGhyb3cgd2hlbiBhIGNvbW1hbmQgZmFpbHMgd2l0aCBhIDIwMCBiZWNhdXNlIHRoZSBzdGF0dXMgaXMgbm90IDAnLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGxldCBqID0gbW9ja1Byb3h5KHtzZXNzaW9uSWQ6ICcxMjMnfSk7XHJcbiAgICAgIGxldCBlID0gbnVsbDtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBhd2FpdCBqLmNvbW1hbmQoJy9lbGVtZW50LzIwMC90ZXh0JywgJ0dFVCcpO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBlID0gZXJyO1xyXG4gICAgICB9XHJcbiAgICAgIHNob3VsZC5leGlzdChlKTtcclxuICAgICAgZS5tZXNzYWdlLnNob3VsZC5jb250YWluKCdPcmlnaW5hbCBlcnJvcjogSW52aXNpYmxlIGVsZW1lbnQnKTtcclxuICAgICAgZS52YWx1ZS5zaG91bGQuZXFsKHttZXNzYWdlOiAnSW52aXNpYmxlIGVsZW1lbnQnfSk7XHJcbiAgICAgIGUuc3RhdHVzLnNob3VsZC5lcXVhbCgxMSk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgdGhyb3cgd2hlbiBhIGNvbW1hbmQgZmFpbHMgd2l0aCBhIDEwMCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgbGV0IGogPSBtb2NrUHJveHkoe3Nlc3Npb25JZDogJzEyMyd9KTtcclxuICAgICAgbGV0IGUgPSBudWxsO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGF3YWl0IGouY29tbWFuZCgnL3Nlc3Npb24vYmFkY2hyb21lL25vY2hyb21lJywgJ0dFVCcpO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBlID0gZXJyO1xyXG4gICAgICB9XHJcbiAgICAgIHNob3VsZC5leGlzdChlKTtcclxuICAgICAgZS5tZXNzYWdlLnNob3VsZC5jb250YWluKCdPcmlnaW5hbCBlcnJvcjogY2hyb21lIG5vdCByZWFjaGFibGUnKTtcclxuICAgICAgZS52YWx1ZS5zaG91bGQuZXFsKHttZXNzYWdlOiAnY2hyb21lIG5vdCByZWFjaGFibGUnfSk7XHJcbiAgICAgIGUuc3RhdHVzLnNob3VsZC5lcXVhbCgwKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdyZXEvcmVzIHByb3h5JywgZnVuY3Rpb24gKCkge1xyXG4gICAgaXQoJ3Nob3VsZCBzdWNjZXNzZnVsbHkgcHJveHkgdmlhIHJlcSBhbmQgc2VuZCB0byByZXMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGxldCBqID0gbW9ja1Byb3h5KCk7XHJcbiAgICAgIGxldCBbcmVxLCByZXNdID0gYnVpbGRSZXFSZXMoJy9zdGF0dXMnLCAnR0VUJyk7XHJcbiAgICAgIGF3YWl0IGoucHJveHlSZXFSZXMocmVxLCByZXMpO1xyXG4gICAgICByZXMuaGVhZGVyc1snQ29udGVudC10eXBlJ10uc2hvdWxkLmVxdWFsKCdhcHBsaWNhdGlvbi9qc29uJyk7XHJcbiAgICAgIHJlcy5zZW50Q29kZS5zaG91bGQuZXF1YWwoMjAwKTtcclxuICAgICAgcmVzLnNlbnRCb2R5LnNob3VsZC5lcWwoe3N0YXR1czogMCwgdmFsdWU6IHtmb286ICdiYXInfX0pO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHJld3JpdGUgdGhlIGlubmVyIHNlc3Npb24gaWQgc28gaXQgZG9lc250IGNoYW5nZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgbGV0IGogPSBtb2NrUHJveHkoe3Nlc3Npb25JZDogJzEyMyd9KTtcclxuICAgICAgbGV0IFtyZXEsIHJlc10gPSBidWlsZFJlcVJlcygnL2VsZW1lbnQvMjAwL3ZhbHVlJywgJ0dFVCcpO1xyXG4gICAgICBhd2FpdCBqLnByb3h5UmVxUmVzKHJlcSwgcmVzKTtcclxuICAgICAgcmVzLnNlbnRCb2R5LnNob3VsZC5lcWwoe3N0YXR1czogMCwgdmFsdWU6ICdmb29iYXInLCBzZXNzaW9uSWQ6ICcxMjMnfSk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgcmV3cml0ZSB0aGUgaW5uZXIgc2Vzc2lvbiBpZCB3aXRoIHNlc3Npb25JZCBpbiB1cmwnLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGxldCBqID0gbW9ja1Byb3h5KHtzZXNzaW9uSWQ6ICcxMjMnfSk7XHJcbiAgICAgIGxldCBbcmVxLCByZXNdID0gYnVpbGRSZXFSZXMoJy93ZC9odWIvc2Vzc2lvbi80NTYvZWxlbWVudC8yMDAvdmFsdWUnLCAnUE9TVCcpO1xyXG4gICAgICBhd2FpdCBqLnByb3h5UmVxUmVzKHJlcSwgcmVzKTtcclxuICAgICAgcmVzLnNlbnRCb2R5LnNob3VsZC5lcWwoe3N0YXR1czogMCwgdmFsdWU6ICdmb29iYXInLCBzZXNzaW9uSWQ6ICc0NTYnfSk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgcGFzcyB0aHJvdWdoIHVybHMgdGhhdCBkbyBub3QgcmVxdWlyZSBzZXNzaW9uIElEcycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgbGV0IGogPSBtb2NrUHJveHkoe3Nlc3Npb25JZDogJzEyMyd9KTtcclxuICAgICAgbGV0IFtyZXEsIHJlc10gPSBidWlsZFJlcVJlcygnL3dkL2h1Yi9zdGF0dXMnLCAnR0VUJyk7XHJcbiAgICAgIGF3YWl0IGoucHJveHlSZXFSZXMocmVxLCByZXMpO1xyXG4gICAgICByZXMuc2VudEJvZHkuc2hvdWxkLmVxbCh7c3RhdHVzOiAwLCB2YWx1ZTogeydmb28nOidiYXInfX0pO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHByb3h5IHN0cmFuZ2UgcmVzcG9uc2VzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgaiA9IG1vY2tQcm94eSh7c2Vzc2lvbklkOiAnMTIzJ30pO1xyXG4gICAgICBsZXQgW3JlcSwgcmVzXSA9IGJ1aWxkUmVxUmVzKCcvbm9jaHJvbWUnLCAnR0VUJyk7XHJcbiAgICAgIGF3YWl0IGoucHJveHlSZXFSZXMocmVxLCByZXMpO1xyXG4gICAgICByZXMuc2VudENvZGUuc2hvdWxkLmVxdWFsKDEwMCk7XHJcbiAgICAgIHJlcy5zZW50Qm9keS5zaG91bGQuZXFsKHtzdGF0dXM6IDAsIHZhbHVlOiB7bWVzc2FnZTogJ2Nocm9tZSBub3QgcmVhY2hhYmxlJ319KTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLiJ9
