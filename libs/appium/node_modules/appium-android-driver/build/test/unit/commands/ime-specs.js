'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _ = require('../../..');

var _2 = _interopRequireDefault(_);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var _appiumBaseDriver = require('appium-base-driver');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('IME', function () {
  var driver = undefined;
  var sandbox = _sinon2['default'].sandbox.create();
  beforeEach(function () {
    driver = new _2['default']();
    driver.adb = new _appiumAdb2['default']();
  });
  afterEach(function () {
    sandbox.restore();
  });
  describe('isIMEActivated', function () {
    it('should allways return true', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.isIMEActivated().should.eventually.be['true']);

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('availableIMEEngines', function () {
    it('should return available IMEEngines', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'availableIMEs').returns(['IME1', 'IME2']);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.availableIMEEngines().should.eventually.be.deep.equal(['IME1', 'IME2']));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('getActiveIMEEngine', function () {
    it('should return active IME engine', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'defaultIME').returns('default_ime_engine');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getActiveIMEEngine().should.become('default_ime_engine'));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('activateIMEEngine', function () {
    it('should activate IME engine', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'availableIMEs').returns(['IME1', 'IME2']);
            sandbox.stub(driver.adb, 'enableIME');
            sandbox.stub(driver.adb, 'setIME');
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.activateIMEEngine('IME2').should.be.fulfilled);

          case 5:
            driver.adb.enableIME.calledWithExactly('IME2').should.be['true'];
            driver.adb.setIME.calledWithExactly('IME2').should.be['true'];

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should throws error if IME not found', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'availableIMEs').returns(['IME1', 'IME2']);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.activateIMEEngine('IME3').should.be.rejectedWith(_appiumBaseDriver.errors.IMENotAvailableError));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('deactivateIMEEngine', function () {
    it('should deactivate IME engine', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getActiveIMEEngine').returns('active_ime_engine');
            sandbox.stub(driver.adb, 'disableIME');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.deactivateIMEEngine().should.be.fulfilled);

          case 4:
            driver.adb.disableIME.calledWithExactly('active_ime_engine');

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9jb21tYW5kcy9pbWUtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztxQkFDM0IsT0FBTzs7OztnQkFDQyxVQUFVOzs7O3lCQUNwQixZQUFZOzs7O2dDQUNMLG9CQUFvQjs7QUFFM0Msa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixRQUFRLENBQUMsS0FBSyxFQUFFLFlBQVk7QUFDMUIsTUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLE1BQUksT0FBTyxHQUFHLG1CQUFNLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNyQyxZQUFVLENBQUMsWUFBWTtBQUNyQixVQUFNLEdBQUcsbUJBQW1CLENBQUM7QUFDN0IsVUFBTSxDQUFDLEdBQUcsR0FBRyw0QkFBUyxDQUFDO0dBQ3hCLENBQUMsQ0FBQztBQUNILFdBQVMsQ0FBQyxZQUFZO0FBQ3BCLFdBQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztHQUNuQixDQUFDLENBQUM7QUFDSCxVQUFRLENBQUMsZ0JBQWdCLEVBQUUsWUFBWTtBQUNyQyxNQUFFLENBQUMsNEJBQTRCLEVBQUU7Ozs7OzZDQUN6QixNQUFNLENBQUMsY0FBYyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFFBQUs7Ozs7Ozs7S0FDeEQsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0FBQ0gsVUFBUSxDQUFDLHFCQUFxQixFQUFFLFlBQVk7QUFDMUMsTUFBRSxDQUFDLG9DQUFvQyxFQUFFOzs7O0FBQ3ZDLG1CQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7OzZDQUM5RCxNQUFNLENBQUMsbUJBQW1CLEVBQUUsQ0FDL0IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQzs7Ozs7OztLQUNyRCxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7QUFDSCxVQUFRLENBQUMsb0JBQW9CLEVBQUUsWUFBWTtBQUN6QyxNQUFFLENBQUMsaUNBQWlDLEVBQUU7Ozs7QUFDcEMsbUJBQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQzs7NkNBQy9ELE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUM7Ozs7Ozs7S0FDdEUsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0FBQ0gsVUFBUSxDQUFDLG1CQUFtQixFQUFFLFlBQVk7QUFDeEMsTUFBRSxDQUFDLDRCQUE0QixFQUFFOzs7O0FBQy9CLG1CQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDcEUsbUJBQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUN0QyxtQkFBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDOzs2Q0FDN0IsTUFBTSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsU0FBUzs7O0FBQzFELGtCQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFLLENBQUM7QUFDOUQsa0JBQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQUssQ0FBQzs7Ozs7OztLQUM1RCxDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsc0NBQXNDLEVBQUU7Ozs7QUFDekMsbUJBQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQzs7NkNBQzlELE1BQU0sQ0FBQyxpQkFBaUIsQ0FBRSxNQUFNLENBQUMsQ0FDcEMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMseUJBQU8sb0JBQW9CLENBQUM7Ozs7Ozs7S0FDdkQsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0FBQ0gsVUFBUSxDQUFDLHFCQUFxQixFQUFFLFlBQVk7QUFDMUMsTUFBRSxDQUFDLDhCQUE4QixFQUFFOzs7O0FBQ2pDLG1CQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ3hFLG1CQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLENBQUM7OzZDQUNqQyxNQUFNLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVM7OztBQUN0RCxrQkFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsbUJBQW1CLENBQUMsQ0FBQzs7Ozs7OztLQUM5RCxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC91bml0L2NvbW1hbmRzL2ltZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IHNpbm9uIGZyb20gJ3Npbm9uJztcbmltcG9ydCBBbmRyb2lkRHJpdmVyIGZyb20gJy4uLy4uLy4uJztcbmltcG9ydCBBREIgZnJvbSAnYXBwaXVtLWFkYic7XG5pbXBvcnQgeyBlcnJvcnMgfSBmcm9tICdhcHBpdW0tYmFzZS1kcml2ZXInO1xuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5kZXNjcmliZSgnSU1FJywgZnVuY3Rpb24gKCkge1xuICBsZXQgZHJpdmVyO1xuICBsZXQgc2FuZGJveCA9IHNpbm9uLnNhbmRib3guY3JlYXRlKCk7XG4gIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gICAgZHJpdmVyLmFkYiA9IG5ldyBBREIoKTtcbiAgfSk7XG4gIGFmdGVyRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgc2FuZGJveC5yZXN0b3JlKCk7XG4gIH0pO1xuICBkZXNjcmliZSgnaXNJTUVBY3RpdmF0ZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ3Nob3VsZCBhbGx3YXlzIHJldHVybiB0cnVlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgYXdhaXQgZHJpdmVyLmlzSU1FQWN0aXZhdGVkKCkuc2hvdWxkLmV2ZW50dWFsbHkuYmUudHJ1ZTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdhdmFpbGFibGVJTUVFbmdpbmVzJywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIGF2YWlsYWJsZSBJTUVFbmdpbmVzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdhdmFpbGFibGVJTUVzJykucmV0dXJucyhbJ0lNRTEnLCAnSU1FMiddKTtcbiAgICAgIGF3YWl0IGRyaXZlci5hdmFpbGFibGVJTUVFbmdpbmVzKClcbiAgICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmJlLmRlZXAuZXF1YWwoWydJTUUxJywgJ0lNRTInXSk7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgnZ2V0QWN0aXZlSU1FRW5naW5lJywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIGFjdGl2ZSBJTUUgZW5naW5lJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdkZWZhdWx0SU1FJykucmV0dXJucygnZGVmYXVsdF9pbWVfZW5naW5lJyk7XG4gICAgICBhd2FpdCBkcml2ZXIuZ2V0QWN0aXZlSU1FRW5naW5lKCkuc2hvdWxkLmJlY29tZSgnZGVmYXVsdF9pbWVfZW5naW5lJyk7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgnYWN0aXZhdGVJTUVFbmdpbmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ3Nob3VsZCBhY3RpdmF0ZSBJTUUgZW5naW5lJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdhdmFpbGFibGVJTUVzJykucmV0dXJucyhbJ0lNRTEnLCAnSU1FMiddKTtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAnZW5hYmxlSU1FJyk7XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ3NldElNRScpO1xuICAgICAgYXdhaXQgZHJpdmVyLmFjdGl2YXRlSU1FRW5naW5lKCdJTUUyJykuc2hvdWxkLmJlLmZ1bGZpbGxlZDtcbiAgICAgIGRyaXZlci5hZGIuZW5hYmxlSU1FLmNhbGxlZFdpdGhFeGFjdGx5KCdJTUUyJykuc2hvdWxkLmJlLnRydWU7XG4gICAgICBkcml2ZXIuYWRiLnNldElNRS5jYWxsZWRXaXRoRXhhY3RseSgnSU1FMicpLnNob3VsZC5iZS50cnVlO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgdGhyb3dzIGVycm9yIGlmIElNRSBub3QgZm91bmQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ2F2YWlsYWJsZUlNRXMnKS5yZXR1cm5zKFsnSU1FMScsICdJTUUyJ10pO1xuICAgICAgYXdhaXQgZHJpdmVyLmFjdGl2YXRlSU1FRW5naW5lICgnSU1FMycpXG4gICAgICAgIC5zaG91bGQuYmUucmVqZWN0ZWRXaXRoKGVycm9ycy5JTUVOb3RBdmFpbGFibGVFcnJvcik7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgnZGVhY3RpdmF0ZUlNRUVuZ2luZScsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIGRlYWN0aXZhdGUgSU1FIGVuZ2luZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdnZXRBY3RpdmVJTUVFbmdpbmUnKS5yZXR1cm5zKCdhY3RpdmVfaW1lX2VuZ2luZScpO1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdkaXNhYmxlSU1FJyk7XG4gICAgICBhd2FpdCBkcml2ZXIuZGVhY3RpdmF0ZUlNRUVuZ2luZSgpLnNob3VsZC5iZS5mdWxmaWxsZWQ7XG4gICAgICBkcml2ZXIuYWRiLmRpc2FibGVJTUUuY2FsbGVkV2l0aEV4YWN0bHkoJ2FjdGl2ZV9pbWVfZW5naW5lJyk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uIn0=
