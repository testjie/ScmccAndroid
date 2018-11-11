require('source-map-support').install();

/* global describe:true, it:true, before:true, after:true */

'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _ = require('../..');

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _asyncbox = require('asyncbox');

var _chromedriver = require('chromedriver');

var _chromedriver2 = _interopRequireDefault(_chromedriver);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var should = _chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('proxy', function () {
  var cdProc = null;
  var j = new _.JWProxy();
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          cdProc = _child_process2['default'].spawn(_chromedriver2['default'].path, ['--url-base=/wd/hub', '--port=4444']);
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(1000));

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  after(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          cdProc.kill();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(500));

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should proxy status straight', function callee$1$0() {
    var _ref, _ref2, res, resBody;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(j.proxy('/status', 'GET'));

        case 2:
          _ref = context$2$0.sent;
          _ref2 = _slicedToArray(_ref, 2);
          res = _ref2[0];
          resBody = _ref2[1];

          resBody = JSON.parse(resBody);
          res.statusCode.should.equal(200);
          resBody.status.should.equal(0);
          resBody.value.should.have.property('build');

        case 10:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should proxy status as command', function callee$1$0() {
    var res;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(j.command('/status', 'GET'));

        case 2:
          res = context$2$0.sent;

          res.should.have.property('build');

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should start a new session', function callee$1$0() {
    var caps, res;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = { browserName: 'chrome' };
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(j.command('/session', 'POST', { desiredCapabilities: caps }));

        case 3:
          res = context$2$0.sent;

          res.should.have.property('browserName');
          j.sessionId.should.have.length(32);

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should quit a session', function callee$1$0() {
    var res;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(j.command('', 'DELETE'));

        case 2:
          res = context$2$0.sent;

          should.not.exist(res);

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvanNvbndwLXByb3h5L3Byb3h5LWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztnQkFHd0IsT0FBTzs7NkJBQ2hCLGVBQWU7Ozs7b0JBQ2IsTUFBTTs7Ozt3QkFDRCxVQUFVOzs0QkFDUCxjQUFjOzs7OzhCQUNaLGtCQUFrQjs7OztBQUc3QyxJQUFJLE1BQU0sR0FBRyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUMzQixrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixRQUFRLENBQUMsT0FBTyxFQUFFLFlBQVk7QUFDNUIsTUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLE1BQUksQ0FBQyxHQUFHLGVBQWEsQ0FBQztBQUN0QixRQUFNLENBQUM7Ozs7QUFDTCxnQkFBTSxHQUFHLDJCQUFHLEtBQUssQ0FBQywwQkFBYSxJQUFJLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDOzsyQ0FDdEUscUJBQU0sSUFBSSxDQUFDOzs7Ozs7O0dBQ2xCLENBQUMsQ0FBQztBQUNILE9BQUssQ0FBQzs7OztBQUNKLGdCQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7OzJDQUNSLHFCQUFNLEdBQUcsQ0FBQzs7Ozs7OztHQUNqQixDQUFDLENBQUM7O0FBRUgsSUFBRSxDQUFDLDhCQUE4QixFQUFFO3FCQUM1QixHQUFHLEVBQUUsT0FBTzs7Ozs7OzJDQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQzs7Ozs7QUFBL0MsYUFBRztBQUFFLGlCQUFPOztBQUNqQixpQkFBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDOUIsYUFBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2pDLGlCQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0IsaUJBQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7Ozs7R0FDN0MsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLGdDQUFnQyxFQUFFO1FBQy9CLEdBQUc7Ozs7OzJDQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQzs7O0FBQXZDLGFBQUc7O0FBQ1AsYUFBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzs7Ozs7O0dBQ25DLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyw0QkFBNEIsRUFBRTtRQUMzQixJQUFJLEVBQ0osR0FBRzs7OztBQURILGNBQUksR0FBRyxFQUFDLFdBQVcsRUFBRSxRQUFRLEVBQUM7OzJDQUNsQixDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsRUFBQyxtQkFBbUIsRUFBRSxJQUFJLEVBQUMsQ0FBQzs7O0FBQXRFLGFBQUc7O0FBQ1AsYUFBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ3hDLFdBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7Ozs7Ozs7R0FDcEMsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLHVCQUF1QixFQUFFO1FBQ3RCLEdBQUc7Ozs7OzJDQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQzs7O0FBQW5DLGFBQUc7O0FBQ1AsZ0JBQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7O0dBQ3ZCLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2pzb253cC1wcm94eS9wcm94eS1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0cmFuc3BpbGU6bW9jaGFcbi8qIGdsb2JhbCBkZXNjcmliZTp0cnVlLCBpdDp0cnVlLCBiZWZvcmU6dHJ1ZSwgYWZ0ZXI6dHJ1ZSAqL1xuXG5pbXBvcnQgeyBKV1Byb3h5IH0gZnJvbSAnLi4vLi4nO1xuaW1wb3J0IGNwIGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xuaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgeyBzbGVlcCB9IGZyb20gJ2FzeW5jYm94JztcbmltcG9ydCBjaHJvbWVkcml2ZXIgZnJvbSAnY2hyb21lZHJpdmVyJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcblxuXG5sZXQgc2hvdWxkID0gY2hhaS5zaG91bGQoKTtcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcblxuZGVzY3JpYmUoJ3Byb3h5JywgZnVuY3Rpb24gKCkge1xuICBsZXQgY2RQcm9jID0gbnVsbDtcbiAgbGV0IGogPSBuZXcgSldQcm94eSgpO1xuICBiZWZvcmUoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGNkUHJvYyA9IGNwLnNwYXduKGNocm9tZWRyaXZlci5wYXRoLCBbJy0tdXJsLWJhc2U9L3dkL2h1YicsICctLXBvcnQ9NDQ0NCddKTtcbiAgICBhd2FpdCBzbGVlcCgxMDAwKTtcbiAgfSk7XG4gIGFmdGVyKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBjZFByb2Mua2lsbCgpO1xuICAgIGF3YWl0IHNsZWVwKDUwMCk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgcHJveHkgc3RhdHVzIHN0cmFpZ2h0JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBbcmVzLCByZXNCb2R5XSA9IGF3YWl0IGoucHJveHkoJy9zdGF0dXMnLCAnR0VUJyk7XG4gICAgcmVzQm9keSA9IEpTT04ucGFyc2UocmVzQm9keSk7XG4gICAgcmVzLnN0YXR1c0NvZGUuc2hvdWxkLmVxdWFsKDIwMCk7XG4gICAgcmVzQm9keS5zdGF0dXMuc2hvdWxkLmVxdWFsKDApO1xuICAgIHJlc0JvZHkudmFsdWUuc2hvdWxkLmhhdmUucHJvcGVydHkoJ2J1aWxkJyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHByb3h5IHN0YXR1cyBhcyBjb21tYW5kJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCByZXMgPSBhd2FpdCBqLmNvbW1hbmQoJy9zdGF0dXMnLCAnR0VUJyk7XG4gICAgcmVzLnNob3VsZC5oYXZlLnByb3BlcnR5KCdidWlsZCcpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBzdGFydCBhIG5ldyBzZXNzaW9uJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBjYXBzID0ge2Jyb3dzZXJOYW1lOiAnY2hyb21lJ307XG4gICAgbGV0IHJlcyA9IGF3YWl0IGouY29tbWFuZCgnL3Nlc3Npb24nLCAnUE9TVCcsIHtkZXNpcmVkQ2FwYWJpbGl0aWVzOiBjYXBzfSk7XG4gICAgcmVzLnNob3VsZC5oYXZlLnByb3BlcnR5KCdicm93c2VyTmFtZScpO1xuICAgIGouc2Vzc2lvbklkLnNob3VsZC5oYXZlLmxlbmd0aCgzMik7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHF1aXQgYSBzZXNzaW9uJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCByZXMgPSBhd2FpdCBqLmNvbW1hbmQoJycsICdERUxFVEUnKTtcbiAgICBzaG91bGQubm90LmV4aXN0KHJlcyk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uIn0=
