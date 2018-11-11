require('source-map-support').install();

'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _libLogsink = require('../lib/logsink');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _appiumSupport = require('appium-support');

// temporarily turn on logging to stdio, so we can catch and query
var forceLogs = process.env._FORCE_LOGS;
process.env._FORCE_LOGS = 1;
var log = _appiumSupport.logger.getLogger('Appium');

describe('logging', function () {
  var stderrSpy = undefined;
  var stdoutSpy = undefined;
  beforeEach(function () {
    stderrSpy = _sinon2['default'].spy(process.stderr, 'write');
    stdoutSpy = _sinon2['default'].spy(process.stdout, 'write');
    (0, _libLogsink.clear)();
  });
  afterEach(function () {
    stderrSpy.restore();
    stdoutSpy.restore();
  });
  after(function () {
    process.env._FORCE_LOGS = forceLogs;
  });

  var errorMsg = 'some error';
  var warnMsg = 'some warning';
  var debugMsg = 'some debug';

  function doLogging() {
    log.error(errorMsg);
    log.warn(warnMsg);
    log.debug(debugMsg);
  }

  it('should send error, info and debug when loglevel is debug', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap((0, _libLogsink.init)({ loglevel: 'debug' }));

        case 2:

          doLogging();

          stderrSpy.callCount.should.equal(1);
          stderrSpy.args[0][0].should.include(errorMsg);

          stdoutSpy.callCount.should.equal(2);
          stdoutSpy.args[0][0].should.include(warnMsg);
          stdoutSpy.args[1][0].should.include(debugMsg);

        case 8:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should send error and info when loglevel is info', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap((0, _libLogsink.init)({ loglevel: 'info' }));

        case 2:

          doLogging();

          stderrSpy.callCount.should.equal(1);
          stderrSpy.args[0][0].should.include(errorMsg);

          stdoutSpy.callCount.should.equal(1);
          stdoutSpy.args[0][0].should.include(warnMsg);

        case 7:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should send error when loglevel is error', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap((0, _libLogsink.init)({ loglevel: 'error' }));

        case 2:

          doLogging();

          stderrSpy.callCount.should.equal(1);
          stderrSpy.args[0][0].should.include(errorMsg);

          stdoutSpy.callCount.should.equal(0);

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,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LENBQUM7QUFDcEMsbUJBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQzs7Ozs7OztHQUM5QyxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsMENBQTBDLEVBQUU7Ozs7OzJDQUN2QyxzQkFBWSxFQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUMsQ0FBQzs7OztBQUV0QyxtQkFBUyxFQUFFLENBQUM7O0FBRVosbUJBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwQyxtQkFBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDOztBQUU5QyxtQkFBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7O0dBQ3JDLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2xvZ2dlci1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRyYW5zcGlsZTptb2NoYVxuXG5pbXBvcnQgeyBpbml0IGFzIGxvZ3NpbmtJbml0LCBjbGVhciBhcyBsb2dzaW5rQ2xlYXIgfSBmcm9tICcuLi9saWIvbG9nc2luayc7XG5pbXBvcnQgc2lub24gZnJvbSAnc2lub24nO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnYXBwaXVtLXN1cHBvcnQnO1xuXG5cbi8vIHRlbXBvcmFyaWx5IHR1cm4gb24gbG9nZ2luZyB0byBzdGRpbywgc28gd2UgY2FuIGNhdGNoIGFuZCBxdWVyeVxubGV0IGZvcmNlTG9ncyA9IHByb2Nlc3MuZW52Ll9GT1JDRV9MT0dTO1xucHJvY2Vzcy5lbnYuX0ZPUkNFX0xPR1MgPSAxO1xubGV0IGxvZyA9IGxvZ2dlci5nZXRMb2dnZXIoJ0FwcGl1bScpO1xuXG5kZXNjcmliZSgnbG9nZ2luZycsIGZ1bmN0aW9uICgpIHtcbiAgbGV0IHN0ZGVyclNweTtcbiAgbGV0IHN0ZG91dFNweTtcbiAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgc3RkZXJyU3B5ID0gc2lub24uc3B5KHByb2Nlc3Muc3RkZXJyLCAnd3JpdGUnKTtcbiAgICBzdGRvdXRTcHkgPSBzaW5vbi5zcHkocHJvY2Vzcy5zdGRvdXQsICd3cml0ZScpO1xuICAgIGxvZ3NpbmtDbGVhcigpO1xuICB9KTtcbiAgYWZ0ZXJFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICBzdGRlcnJTcHkucmVzdG9yZSgpO1xuICAgIHN0ZG91dFNweS5yZXN0b3JlKCk7XG4gIH0pO1xuICBhZnRlcihmdW5jdGlvbiAoKSB7XG4gICAgcHJvY2Vzcy5lbnYuX0ZPUkNFX0xPR1MgPSBmb3JjZUxvZ3M7XG4gIH0pO1xuXG4gIGNvbnN0IGVycm9yTXNnID0gJ3NvbWUgZXJyb3InO1xuICBjb25zdCB3YXJuTXNnID0gJ3NvbWUgd2FybmluZyc7XG4gIGNvbnN0IGRlYnVnTXNnID0gJ3NvbWUgZGVidWcnO1xuXG4gIGZ1bmN0aW9uIGRvTG9nZ2luZyAoKSB7XG4gICAgbG9nLmVycm9yKGVycm9yTXNnKTtcbiAgICBsb2cud2Fybih3YXJuTXNnKTtcbiAgICBsb2cuZGVidWcoZGVidWdNc2cpO1xuICB9XG5cbiAgaXQoJ3Nob3VsZCBzZW5kIGVycm9yLCBpbmZvIGFuZCBkZWJ1ZyB3aGVuIGxvZ2xldmVsIGlzIGRlYnVnJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGxvZ3NpbmtJbml0KHtsb2dsZXZlbDogJ2RlYnVnJ30pO1xuXG4gICAgZG9Mb2dnaW5nKCk7XG5cbiAgICBzdGRlcnJTcHkuY2FsbENvdW50LnNob3VsZC5lcXVhbCgxKTtcbiAgICBzdGRlcnJTcHkuYXJnc1swXVswXS5zaG91bGQuaW5jbHVkZShlcnJvck1zZyk7XG5cbiAgICBzdGRvdXRTcHkuY2FsbENvdW50LnNob3VsZC5lcXVhbCgyKTtcbiAgICBzdGRvdXRTcHkuYXJnc1swXVswXS5zaG91bGQuaW5jbHVkZSh3YXJuTXNnKTtcbiAgICBzdGRvdXRTcHkuYXJnc1sxXVswXS5zaG91bGQuaW5jbHVkZShkZWJ1Z01zZyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHNlbmQgZXJyb3IgYW5kIGluZm8gd2hlbiBsb2dsZXZlbCBpcyBpbmZvJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGxvZ3NpbmtJbml0KHtsb2dsZXZlbDogJ2luZm8nfSk7XG5cbiAgICBkb0xvZ2dpbmcoKTtcblxuICAgIHN0ZGVyclNweS5jYWxsQ291bnQuc2hvdWxkLmVxdWFsKDEpO1xuICAgIHN0ZGVyclNweS5hcmdzWzBdWzBdLnNob3VsZC5pbmNsdWRlKGVycm9yTXNnKTtcblxuICAgIHN0ZG91dFNweS5jYWxsQ291bnQuc2hvdWxkLmVxdWFsKDEpO1xuICAgIHN0ZG91dFNweS5hcmdzWzBdWzBdLnNob3VsZC5pbmNsdWRlKHdhcm5Nc2cpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBzZW5kIGVycm9yIHdoZW4gbG9nbGV2ZWwgaXMgZXJyb3InLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgbG9nc2lua0luaXQoe2xvZ2xldmVsOiAnZXJyb3InfSk7XG5cbiAgICBkb0xvZ2dpbmcoKTtcblxuICAgIHN0ZGVyclNweS5jYWxsQ291bnQuc2hvdWxkLmVxdWFsKDEpO1xuICAgIHN0ZGVyclNweS5hcmdzWzBdWzBdLnNob3VsZC5pbmNsdWRlKGVycm9yTXNnKTtcblxuICAgIHN0ZG91dFNweS5jYWxsQ291bnQuc2hvdWxkLmVxdWFsKDApO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9
