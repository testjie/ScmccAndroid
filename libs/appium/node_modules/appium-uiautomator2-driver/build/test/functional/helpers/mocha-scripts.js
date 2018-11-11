/**
 * This script needs to be run before other e2e mocha scripts
 *
 * This script starts the server or if it's TestObject, runs the tests on TO server
 */
'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _appiumTestSupport = require('appium-test-support');

var _wd = require('wd');

var _wd2 = _interopRequireDefault(_wd);

var _ = require('../../..');

var _libLogger = require('../../../lib/logger');

var _libLogger2 = _interopRequireDefault(_libLogger);

if (process.env.TESTOBJECT_E2E_TESTS) {
  (function () {
    _libLogger2['default'].debug('Running tests on TestObject');

    var wdObject = undefined;
    before(function callee$1$0() {
      var commit;
      return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            commit = process.env.COMMIT_HASH || process.env.APPVEYOR_REPO_COMMIT || process.env.TRAVIS_COMMIT;

            if (commit) {
              context$2$0.next = 3;
              break;
            }

            throw new Error('A commit must be provided in $COMMIT_HASH');

          case 3:
            context$2$0.next = 5;
            return _regeneratorRuntime.awrap((0, _appiumTestSupport.enableTestObject)(_wd2['default'], 'appium-uiautomator2-driver', 'https://github.com/appium/appium-uiautomator2-driver.git', commit));

          case 5:
            wdObject = context$2$0.sent;

            // Don't proceed with tests on first build (AppVeyor only runs for 1 hour).
            // The first build is solely for installing, zipping and uploading Appium to S3
            if (process.env.FIRST_BUILD) {
              process.exit();
            }

          case 7:
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
            return _regeneratorRuntime.awrap((0, _appiumTestSupport.disableTestObject)(wdObject));

          case 2:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    });
  })();
} else {
  before(function callee$0$0() {
    return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.next = 2;
          return _regeneratorRuntime.awrap((0, _.startServer)(_.DEFAULT_PORT, 'localhost'));

        case 2:
        case 'end':
          return context$1$0.stop();
      }
    }, null, this);
  });
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9oZWxwZXJzL21vY2hhLXNjcmlwdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7aUNBS29ELHFCQUFxQjs7a0JBQzFELElBQUk7Ozs7Z0JBQ3VCLFVBQVU7O3lCQUNqQyxxQkFBcUI7Ozs7QUFFeEMsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFOztBQUNwQywyQkFBTyxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQzs7QUFFNUMsUUFBSSxRQUFRLFlBQUEsQ0FBQztBQUNiLFVBQU0sQ0FBQztVQUNDLE1BQU07Ozs7QUFBTixrQkFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhOztnQkFDbEcsTUFBTTs7Ozs7a0JBQ0gsSUFBSSxLQUFLLDZDQUE2Qzs7Ozs2Q0FFN0MsMERBQXFCLDRCQUE0Qiw4REFBOEQsTUFBTSxDQUFDOzs7QUFBdkksb0JBQVE7Ozs7QUFJUixnQkFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRTtBQUMzQixxQkFBTyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2hCOzs7Ozs7O0tBQ0YsQ0FBQyxDQUFDO0FBQ0gsU0FBSyxDQUFDOzs7Ozs2Q0FDRSwwQ0FBa0IsUUFBUSxDQUFDOzs7Ozs7O0tBQ2xDLENBQUMsQ0FBQzs7Q0FFSixNQUFNO0FBQ0wsUUFBTSxDQUFDOzs7OzsyQ0FDQyxtQ0FBMEIsV0FBVyxDQUFDOzs7Ozs7O0dBQzdDLENBQUMsQ0FBQztDQUNKIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9oZWxwZXJzL21vY2hhLXNjcmlwdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRoaXMgc2NyaXB0IG5lZWRzIHRvIGJlIHJ1biBiZWZvcmUgb3RoZXIgZTJlIG1vY2hhIHNjcmlwdHNcbiAqXG4gKiBUaGlzIHNjcmlwdCBzdGFydHMgdGhlIHNlcnZlciBvciBpZiBpdCdzIFRlc3RPYmplY3QsIHJ1bnMgdGhlIHRlc3RzIG9uIFRPIHNlcnZlclxuICovXG5pbXBvcnQgeyBlbmFibGVUZXN0T2JqZWN0LCBkaXNhYmxlVGVzdE9iamVjdCB9IGZyb20gJ2FwcGl1bS10ZXN0LXN1cHBvcnQnO1xuaW1wb3J0IHdkIGZyb20gJ3dkJztcbmltcG9ydCB7IHN0YXJ0U2VydmVyLCBERUZBVUxUX1BPUlQgfSBmcm9tICcuLi8uLi8uLic7XG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4uLy4uLy4uL2xpYi9sb2dnZXInO1xuXG5pZiAocHJvY2Vzcy5lbnYuVEVTVE9CSkVDVF9FMkVfVEVTVFMpIHtcbiAgbG9nZ2VyLmRlYnVnKCdSdW5uaW5nIHRlc3RzIG9uIFRlc3RPYmplY3QnKTtcblxuICBsZXQgd2RPYmplY3Q7XG4gIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgY29tbWl0ID0gcHJvY2Vzcy5lbnYuQ09NTUlUX0hBU0ggfHwgcHJvY2Vzcy5lbnYuQVBQVkVZT1JfUkVQT19DT01NSVQgfHwgcHJvY2Vzcy5lbnYuVFJBVklTX0NPTU1JVDtcbiAgICBpZiAoIWNvbW1pdCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBBIGNvbW1pdCBtdXN0IGJlIHByb3ZpZGVkIGluICRDT01NSVRfSEFTSGApO1xuICAgIH1cbiAgICB3ZE9iamVjdCA9IGF3YWl0IGVuYWJsZVRlc3RPYmplY3Qod2QsICdhcHBpdW0tdWlhdXRvbWF0b3IyLWRyaXZlcicsIGBodHRwczovL2dpdGh1Yi5jb20vYXBwaXVtL2FwcGl1bS11aWF1dG9tYXRvcjItZHJpdmVyLmdpdGAsIGNvbW1pdCk7XG5cbiAgICAvLyBEb24ndCBwcm9jZWVkIHdpdGggdGVzdHMgb24gZmlyc3QgYnVpbGQgKEFwcFZleW9yIG9ubHkgcnVucyBmb3IgMSBob3VyKS5cbiAgICAvLyBUaGUgZmlyc3QgYnVpbGQgaXMgc29sZWx5IGZvciBpbnN0YWxsaW5nLCB6aXBwaW5nIGFuZCB1cGxvYWRpbmcgQXBwaXVtIHRvIFMzXG4gICAgaWYgKHByb2Nlc3MuZW52LkZJUlNUX0JVSUxEKSB7XG4gICAgICBwcm9jZXNzLmV4aXQoKTtcbiAgICB9XG4gIH0pO1xuICBhZnRlcihhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZGlzYWJsZVRlc3RPYmplY3Qod2RPYmplY3QpO1xuICB9KTtcblxufSBlbHNlIHtcbiAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBzdGFydFNlcnZlcihERUZBVUxUX1BPUlQsICdsb2NhbGhvc3QnKTtcbiAgfSk7XG59XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uIn0=
