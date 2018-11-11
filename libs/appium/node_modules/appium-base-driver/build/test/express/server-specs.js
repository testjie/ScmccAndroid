require('source-map-support').install();

'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _2 = require('../..');

var _libExpressServer = require('../../lib/express/server');

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('server configuration', function () {
  it('should actually use the middleware', function () {
    var app = { use: _sinon2['default'].spy(), all: _sinon2['default'].spy() };
    var configureRoutes = function configureRoutes() {};
    (0, _libExpressServer.configureServer)(app, configureRoutes);
    app.use.callCount.should.equal(15);
    app.all.callCount.should.equal(4);
  });

  it('should reject if error thrown in configureRoutes parameter', function callee$1$0() {
    var configureRoutes;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          configureRoutes = function configureRoutes() {
            throw new Error('I am Mr. MeeSeeks look at me!');
          };

          context$2$0.next = 3;
          return _regeneratorRuntime.awrap((0, _2.server)(configureRoutes, 8181).should.be.rejectedWith('MeeSeeks'));

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});
describe('server', function () {
  var hwServer = undefined;
  var errorStub = undefined;
  before(function callee$1$0() {
    var configureRoutes;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          configureRoutes = function configureRoutes(app) {
            var _this = this;

            app.get('/', function (req, res) {
              res.header['content-type'] = 'text/html';
              res.status(200).send('Hello World!');
            });
            app.get('/wd/hub/python', function (req, res) {
              res.status(200).send(req.headers['content-type']);
            });
            app.get('/error', function () {
              throw new Error('hahaha');
            });
            app.get('/pause', function callee$3$0(req, res) {
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    res.header['content-type'] = 'text/html';
                    context$4$0.next = 3;
                    return _regeneratorRuntime.awrap(_bluebird2['default'].delay(1000));

                  case 3:
                    res.status(200).send('We have waited!');

                  case 4:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, _this);
            });
          };

          errorStub = _sinon2['default'].stub(console, 'error');
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap((0, _2.server)(configureRoutes, 8181));

        case 4:
          hwServer = context$2$0.sent;

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  after(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(hwServer.close());

        case 2:
          errorStub.restore();

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should start up with our middleware', function callee$1$0() {
    var body;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap((0, _requestPromise2['default'])('http://localhost:8181/'));

        case 2:
          body = context$2$0.sent;

          body.should.eql('Hello World!');

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should fix broken context type', function callee$1$0() {
    var body;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap((0, _requestPromise2['default'])({
            url: 'http://localhost:8181/wd/hub/python',
            headers: {
              'user-agent': 'Python',
              'content-type': 'application/x-www-form-urlencoded'
            }
          }));

        case 2:
          body = context$2$0.sent;

          body.should.eql('application/json');

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should catch errors in the catchall', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap((0, _requestPromise2['default'])('http://localhost:8181/error').should.be.rejectedWith(/hahaha/));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should error if we try to start again on a port that is used', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap((0, _2.server)(function () {}, 8181).should.be.rejectedWith(/EADDRINUSE/));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should error if we try to start on a bad hostname', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap((0, _2.server)(_lodash2['default'].noop, 8181, 'lolcathost').should.be.rejectedWith(/ENOTFOUND|EADDRNOTAVAIL/));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap((0, _2.server)(_lodash2['default'].noop, 8181, '1.1.1.1').should.be.rejectedWith(/EADDRNOTAVAIL/));

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should wait for the server close connections before finishing closing', function callee$1$0() {
    var bodyPromise, before;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          bodyPromise = (0, _requestPromise2['default'])('http://localhost:8181/pause');
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(_bluebird2['default'].delay(100));

        case 3:
          before = Date.now();
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(hwServer.close());

        case 6:
          // expect slightly less than the request waited, since we paused above
          (Date.now() - before).should.be.above(900);

          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(bodyPromise);

        case 9:
          context$2$0.sent.should.equal('We have waited!');

        case 10:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});

// relinquish control so that we don't close before the request is received
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZXhwcmVzcy9zZXJ2ZXItc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7aUJBRXVCLE9BQU87O2dDQUNFLDBCQUEwQjs7OEJBQ3RDLGlCQUFpQjs7OztvQkFDcEIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7cUJBQzNCLE9BQU87Ozs7d0JBQ1gsVUFBVTs7OztzQkFDVixRQUFROzs7O0FBR3RCLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsUUFBUSxDQUFDLHNCQUFzQixFQUFFLFlBQVk7QUFDM0MsSUFBRSxDQUFDLG9DQUFvQyxFQUFFLFlBQVk7QUFDbkQsUUFBSSxHQUFHLEdBQUcsRUFBQyxHQUFHLEVBQUUsbUJBQU0sR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLG1CQUFNLEdBQUcsRUFBRSxFQUFDLENBQUM7QUFDL0MsUUFBSSxlQUFlLEdBQUcsU0FBbEIsZUFBZSxHQUFTLEVBQUUsQ0FBQztBQUMvQiwyQ0FBZ0IsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBQ3RDLE9BQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDbkMsT0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztHQUNuQyxDQUFDLENBQUM7O0FBRUgsSUFBRSxDQUFDLDREQUE0RCxFQUFFO1FBQzNELGVBQWU7Ozs7QUFBZix5QkFBZSxHQUFHLFNBQWxCLGVBQWUsR0FBUztBQUMxQixrQkFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1dBQ2xEOzs7MkNBQ0ssZUFBTyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDOzs7Ozs7O0dBQ3ZFLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FB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QUksRUFBRSxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyx5QkFBeUIsQ0FBQzs7OzsyQ0FDcEYsZUFBTyxvQkFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQzs7Ozs7OztHQUM5RSxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsdUVBQXVFLEVBQUU7UUFDdEUsV0FBVyxFQUtYLE1BQU07Ozs7QUFMTixxQkFBVyxHQUFHLGlDQUFRLDZCQUE2QixDQUFDOzsyQ0FHbEQsc0JBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQzs7O0FBRWQsZ0JBQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFOzsyQ0FDakIsUUFBUSxDQUFDLEtBQUssRUFBRTs7OztBQUV0QixXQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUEsQ0FBRSxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzs7OzJDQUVwQyxXQUFXOzs7MkJBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxpQkFBaUI7Ozs7Ozs7R0FDbkQsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZXhwcmVzcy9zZXJ2ZXItc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0cmFuc3BpbGU6bW9jaGFcblxuaW1wb3J0IHsgc2VydmVyIH0gZnJvbSAnLi4vLi4nO1xuaW1wb3J0IHsgY29uZmlndXJlU2VydmVyIH0gZnJvbSAnLi4vLi4vbGliL2V4cHJlc3Mvc2VydmVyJztcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3JlcXVlc3QtcHJvbWlzZSc7XG5pbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCBzaW5vbiBmcm9tICdzaW5vbic7XG5pbXBvcnQgQiBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuXG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmRlc2NyaWJlKCdzZXJ2ZXIgY29uZmlndXJhdGlvbicsIGZ1bmN0aW9uICgpIHtcbiAgaXQoJ3Nob3VsZCBhY3R1YWxseSB1c2UgdGhlIG1pZGRsZXdhcmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IHt1c2U6IHNpbm9uLnNweSgpLCBhbGw6IHNpbm9uLnNweSgpfTtcbiAgICBsZXQgY29uZmlndXJlUm91dGVzID0gKCkgPT4ge307XG4gICAgY29uZmlndXJlU2VydmVyKGFwcCwgY29uZmlndXJlUm91dGVzKTtcbiAgICBhcHAudXNlLmNhbGxDb3VudC5zaG91bGQuZXF1YWwoMTUpO1xuICAgIGFwcC5hbGwuY2FsbENvdW50LnNob3VsZC5lcXVhbCg0KTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCByZWplY3QgaWYgZXJyb3IgdGhyb3duIGluIGNvbmZpZ3VyZVJvdXRlcyBwYXJhbWV0ZXInLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGNvbmZpZ3VyZVJvdXRlcyA9ICgpID0+IHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSSBhbSBNci4gTWVlU2Vla3MgbG9vayBhdCBtZSEnKTtcbiAgICB9O1xuICAgIGF3YWl0IHNlcnZlcihjb25maWd1cmVSb3V0ZXMsIDgxODEpLnNob3VsZC5iZS5yZWplY3RlZFdpdGgoJ01lZVNlZWtzJyk7XG4gIH0pO1xufSk7XG5kZXNjcmliZSgnc2VydmVyJywgZnVuY3Rpb24gKCkge1xuICBsZXQgaHdTZXJ2ZXI7XG4gIGxldCBlcnJvclN0dWI7XG4gIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgZXJyb3JTdHViID0gc2lub24uc3R1Yihjb25zb2xlLCAnZXJyb3InKTtcbiAgICBmdW5jdGlvbiBjb25maWd1cmVSb3V0ZXMgKGFwcCkge1xuICAgICAgYXBwLmdldCgnLycsIChyZXEsIHJlcykgPT4ge1xuICAgICAgICByZXMuaGVhZGVyWydjb250ZW50LXR5cGUnXSA9ICd0ZXh0L2h0bWwnO1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZCgnSGVsbG8gV29ybGQhJyk7XG4gICAgICB9KTtcbiAgICAgIGFwcC5nZXQoJy93ZC9odWIvcHl0aG9uJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHJlcS5oZWFkZXJzWydjb250ZW50LXR5cGUnXSk7XG4gICAgICB9KTtcbiAgICAgIGFwcC5nZXQoJy9lcnJvcicsICgpID0+IHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdoYWhhaGEnKTtcbiAgICAgIH0pO1xuICAgICAgYXBwLmdldCgnL3BhdXNlJywgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gICAgICAgIHJlcy5oZWFkZXJbJ2NvbnRlbnQtdHlwZSddID0gJ3RleHQvaHRtbCc7XG4gICAgICAgIGF3YWl0IEIuZGVsYXkoMTAwMCk7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKCdXZSBoYXZlIHdhaXRlZCEnKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBod1NlcnZlciA9IGF3YWl0IHNlcnZlcihjb25maWd1cmVSb3V0ZXMsIDgxODEpO1xuICB9KTtcbiAgYWZ0ZXIoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGh3U2VydmVyLmNsb3NlKCk7XG4gICAgZXJyb3JTdHViLnJlc3RvcmUoKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBzdGFydCB1cCB3aXRoIG91ciBtaWRkbGV3YXJlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBib2R5ID0gYXdhaXQgcmVxdWVzdCgnaHR0cDovL2xvY2FsaG9zdDo4MTgxLycpO1xuICAgIGJvZHkuc2hvdWxkLmVxbCgnSGVsbG8gV29ybGQhJyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpeCBicm9rZW4gY29udGV4dCB0eXBlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBib2R5ID0gYXdhaXQgcmVxdWVzdCh7XG4gICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgxODEvd2QvaHViL3B5dGhvbicsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICd1c2VyLWFnZW50JzogJ1B5dGhvbicsXG4gICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuICAgICAgfVxuICAgIH0pO1xuICAgIGJvZHkuc2hvdWxkLmVxbCgnYXBwbGljYXRpb24vanNvbicpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBjYXRjaCBlcnJvcnMgaW4gdGhlIGNhdGNoYWxsJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IHJlcXVlc3QoJ2h0dHA6Ly9sb2NhbGhvc3Q6ODE4MS9lcnJvcicpXG4gICAgICAuc2hvdWxkLmJlLnJlamVjdGVkV2l0aCgvaGFoYWhhLyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGVycm9yIGlmIHdlIHRyeSB0byBzdGFydCBhZ2FpbiBvbiBhIHBvcnQgdGhhdCBpcyB1c2VkJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IHNlcnZlcigoKSA9PiB7fSwgODE4MSkuc2hvdWxkLmJlLnJlamVjdGVkV2l0aCgvRUFERFJJTlVTRS8pO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBlcnJvciBpZiB3ZSB0cnkgdG8gc3RhcnQgb24gYSBiYWQgaG9zdG5hbWUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgc2VydmVyKF8ubm9vcCwgODE4MSwgJ2xvbGNhdGhvc3QnKS5zaG91bGQuYmUucmVqZWN0ZWRXaXRoKC9FTk9URk9VTkR8RUFERFJOT1RBVkFJTC8pO1xuICAgIGF3YWl0IHNlcnZlcihfLm5vb3AsIDgxODEsICcxLjEuMS4xJykuc2hvdWxkLmJlLnJlamVjdGVkV2l0aCgvRUFERFJOT1RBVkFJTC8pO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCB3YWl0IGZvciB0aGUgc2VydmVyIGNsb3NlIGNvbm5lY3Rpb25zIGJlZm9yZSBmaW5pc2hpbmcgY2xvc2luZycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYm9keVByb21pc2UgPSByZXF1ZXN0KCdodHRwOi8vbG9jYWxob3N0OjgxODEvcGF1c2UnKTtcblxuICAgIC8vIHJlbGlucXVpc2ggY29udHJvbCBzbyB0aGF0IHdlIGRvbid0IGNsb3NlIGJlZm9yZSB0aGUgcmVxdWVzdCBpcyByZWNlaXZlZFxuICAgIGF3YWl0IEIuZGVsYXkoMTAwKTtcblxuICAgIGxldCBiZWZvcmUgPSBEYXRlLm5vdygpO1xuICAgIGF3YWl0IGh3U2VydmVyLmNsb3NlKCk7XG4gICAgLy8gZXhwZWN0IHNsaWdodGx5IGxlc3MgdGhhbiB0aGUgcmVxdWVzdCB3YWl0ZWQsIHNpbmNlIHdlIHBhdXNlZCBhYm92ZVxuICAgIChEYXRlLm5vdygpIC0gYmVmb3JlKS5zaG91bGQuYmUuYWJvdmUoOTAwKTtcblxuICAgIChhd2FpdCBib2R5UHJvbWlzZSkuc2hvdWxkLmVxdWFsKCdXZSBoYXZlIHdhaXRlZCEnKTtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4ifQ==
