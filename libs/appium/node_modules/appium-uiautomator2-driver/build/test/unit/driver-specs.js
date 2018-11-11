'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../..');

var _2 = _interopRequireDefault(_);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

function defaultStub(driver) {
  _sinon2['default'].stub(driver, 'fillDeviceDetails');
}

describe('driver.js', function () {
  describe('constructor', function () {
    it('calls BaseDriver constructor with opts', function () {
      var driver = new _2['default']({ foo: 'bar' });
      driver.should.exist;
      driver.opts.foo.should.equal('bar');
    });
  });

  describe('createSession', function () {
    it('should throw an error if app can not be found', function callee$2$0() {
      var driver;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _2['default']({}, false);

            defaultStub(driver);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.createSession({ app: 'foo.apk' }).should.be.rejectedWith('does not exist or is not accessible'));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('should set sessionId', function callee$2$0() {
      var driver;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _2['default']({}, false);

            defaultStub(driver);
            _sinon2['default'].mock(driver).expects('checkAppPresent').once().returns(_bluebird2['default'].resolve());
            _sinon2['default'].mock(driver).expects('startUiAutomator2Session').once().returns(_bluebird2['default'].resolve());
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(driver.createSession({ cap: 'foo' }));

          case 6:

            driver.sessionId.should.exist;
            driver.caps.cap.should.equal('foo');

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('should set the default context', function callee$2$0() {
      var driver;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _2['default']({}, false);

            defaultStub(driver);
            _sinon2['default'].mock(driver).expects('checkAppPresent').returns(_bluebird2['default'].resolve());
            _sinon2['default'].mock(driver).expects('startUiAutomator2Session').returns(_bluebird2['default'].resolve());
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(driver.createSession({}));

          case 6:
            driver.curContext.should.equal('NATIVE_APP');

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('checkAppPresent', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          it('should resolve if app present', function callee$2$0() {
            var driver, app;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  driver = new _2['default']({}, false);

                  defaultStub(driver);
                  app = _path2['default'].resolve('.');

                  _sinon2['default'].mock(driver).expects('startUiAutomator2Session').returns(_bluebird2['default'].resolve());
                  _sinon2['default'].mock(driver.helpers).expects('configureApp').returns(app);

                  context$3$0.next = 7;
                  return _regeneratorRuntime.awrap(driver.createSession({ app: app }));

                case 7:
                  context$3$0.next = 9;
                  return _regeneratorRuntime.awrap(driver.checkAppPresent());

                case 9:
                  // should not error

                  // configureApp is shared between the two,
                  // so restore mock or the next test will fail
                  driver.helpers.configureApp.restore();

                case 10:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });

          it('should reject if app not present', function callee$2$0() {
            var driver, app;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  driver = new _2['default']({}, false);

                  defaultStub(driver);
                  app = _path2['default'].resolve('asdfasdf');

                  _sinon2['default'].mock(driver).expects('checkAppPresent').returns(_bluebird2['default'].resolve());
                  _sinon2['default'].mock(driver).expects('startUiAutomator2Session').returns(_bluebird2['default'].resolve());
                  _sinon2['default'].mock(driver.helpers).expects('configureApp').returns(app);

                  context$3$0.next = 8;
                  return _regeneratorRuntime.awrap(driver.createSession({ app: app }));

                case 8:

                  driver.checkAppPresent.restore();
                  context$3$0.next = 11;
                  return _regeneratorRuntime.awrap(driver.checkAppPresent().should.eventually.be.rejectedWith('Could not find'));

                case 11:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  describe('proxying', function () {
    var driver = undefined;
    before(function () {
      driver = new _2['default']({}, false);
      defaultStub(driver);
      driver.sessionId = 'abc';
    });
    describe('#proxyActive', function () {
      it('should exist', function () {
        driver.proxyActive.should.be.an['instanceof'](Function);
      });
      it('should return true', function () {
        driver.proxyActive('abc').should.be['true'];
      });
      it('should throw an error if session id is wrong', function () {
        (function () {
          driver.proxyActive('aaa');
        }).should['throw'];
      });
    });

    describe('#getProxyAvoidList', function () {
      it('should exist', function () {
        driver.getProxyAvoidList.should.be.an['instanceof'](Function);
      });
      it('should return jwpProxyAvoid array', function () {
        var avoidList = driver.getProxyAvoidList('abc');
        avoidList.should.be.an['instanceof'](Array);
        avoidList.should.eql(driver.jwpProxyAvoid);
      });
      it('should throw an error if session id is wrong', function () {
        (function () {
          driver.getProxyAvoidList('aaa');
        }).should['throw'];
      });
      describe('nativeWebScreenshot', function () {
        var proxyAvoidList = undefined;
        var nativeWebScreenshotFilter = function nativeWebScreenshotFilter(item) {
          return item[0] === "GET" && item[1].test('/session/xxx/screenshot/');
        };
        beforeEach(function () {
          driver = new _2['default']({}, false);
          defaultStub(driver);
          _sinon2['default'].mock(driver).expects('checkAppPresent').once().returns(_bluebird2['default'].resolve());
          _sinon2['default'].mock(driver).expects('startUiAutomator2Session').once().returns(_bluebird2['default'].resolve());
        });

        describe('on webview mode', function () {
          beforeEach(function () {
            driver.chromedriver = true;
          });
          it('should proxy screenshot if nativeWebScreenshot is off on chromedriver mode', function callee$5$0() {
            return _regeneratorRuntime.async(function callee$5$0$(context$6$0) {
              while (1) switch (context$6$0.prev = context$6$0.next) {
                case 0:
                  context$6$0.next = 2;
                  return _regeneratorRuntime.awrap(driver.createSession({ platformName: 'Android', deviceName: 'device', browserName: 'chrome', nativeWebScreenshot: false }));

                case 2:
                  proxyAvoidList = driver.getProxyAvoidList().filter(nativeWebScreenshotFilter);
                  proxyAvoidList.should.be.empty;

                case 4:
                case 'end':
                  return context$6$0.stop();
              }
            }, null, this);
          });
          it('should not proxy screenshot if nativeWebScreenshot is on on chromedriver mode', function callee$5$0() {
            return _regeneratorRuntime.async(function callee$5$0$(context$6$0) {
              while (1) switch (context$6$0.prev = context$6$0.next) {
                case 0:
                  context$6$0.next = 2;
                  return _regeneratorRuntime.awrap(driver.createSession({ platformName: 'Android', deviceName: 'device', browserName: 'chrome', nativeWebScreenshot: true }));

                case 2:
                  proxyAvoidList = driver.getProxyAvoidList().filter(nativeWebScreenshotFilter);
                  proxyAvoidList.should.not.be.empty;

                case 4:
                case 'end':
                  return context$6$0.stop();
              }
            }, null, this);
          });
        });

        describe('on native mode', function () {
          it('should never proxy screenshot regardless of nativeWebScreenshot setting (on)', function callee$5$0() {
            return _regeneratorRuntime.async(function callee$5$0$(context$6$0) {
              while (1) switch (context$6$0.prev = context$6$0.next) {
                case 0:
                  context$6$0.next = 2;
                  return _regeneratorRuntime.awrap(driver.createSession({ platformName: 'Android', deviceName: 'device', browserName: 'chrome', nativeWebScreenshot: true }));

                case 2:
                  proxyAvoidList = driver.getProxyAvoidList().filter(nativeWebScreenshotFilter);
                  proxyAvoidList.should.not.be.empty;

                case 4:
                case 'end':
                  return context$6$0.stop();
              }
            }, null, this);
          });

          it('should never proxy screenshot regardless of nativeWebScreenshot setting (off)', function callee$5$0() {
            return _regeneratorRuntime.async(function callee$5$0$(context$6$0) {
              while (1) switch (context$6$0.prev = context$6$0.next) {
                case 0:
                  context$6$0.next = 2;
                  return _regeneratorRuntime.awrap(driver.createSession({ platformName: 'Android', deviceName: 'device', browserName: 'chrome', nativeWebScreenshot: false }));

                case 2:
                  proxyAvoidList = driver.getProxyAvoidList().filter(nativeWebScreenshotFilter);
                  proxyAvoidList.should.not.be.empty;

                case 4:
                case 'end':
                  return context$6$0.stop();
              }
            }, null, this);
          });
        });
      });
    });

    describe('#canProxy', function () {
      it('should exist', function () {
        driver.canProxy.should.be.an['instanceof'](Function);
      });
      it('should return true', function () {
        driver.canProxy('abc').should.be['true'];
      });
      it('should throw an error if session id is wrong', function () {
        (function () {
          driver.canProxy('aaa');
        }).should['throw'];
      });
    });
  });

  describe('magic first visible child xpath', function () {
    var driver = new _2['default']({}, false);
    it('should trap and proxy to special uia2 server endpoint', function callee$2$0() {
      var proxySpy;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            defaultStub(driver);
            driver.uiautomator2 = { jwproxy: { command: function command() {} } };
            proxySpy = _sinon2['default'].stub(driver.uiautomator2.jwproxy, 'command');
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.doFindElementOrEls({ strategy: 'xpath', selector: '/*[@firstVisible="true"]', context: 'foo' }));

          case 5:
            proxySpy.firstCall.args.should.eql(['/appium/element/foo/first_visible', 'GET', {}]);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('magic scrollable view xpath', function () {
    var driver = new _2['default']({}, false);
    it('should trap and rewrite as uiautomator locator', function callee$2$0() {
      var proxySpy;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            defaultStub(driver);
            driver.uiautomator2 = { jwproxy: { command: function command() {} } };
            proxySpy = _sinon2['default'].stub(driver.uiautomator2.jwproxy, 'command');
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.doFindElementOrEls({ strategy: 'xpath', selector: '//*[@scrollable="true"]', context: 'foo' }));

          case 5:
            proxySpy.firstCall.args.should.eql(['/element', 'POST', {
              context: 'foo',
              strategy: '-android uiautomator',
              selector: 'new UiSelector().scrollable(true)'
            }]);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});

// nativeWebScreenshot on

// nativeWebScreenshot off
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9kcml2ZXItc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztnQkFDUCxPQUFPOzs7O3FCQUMzQixPQUFPOzs7O29CQUNSLE1BQU07Ozs7d0JBQ1QsVUFBVTs7OztBQUd4QixrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLFNBQVMsV0FBVyxDQUFFLE1BQU0sRUFBRTtBQUM1QixxQkFBTSxJQUFJLENBQUMsTUFBTSxFQUFFLG1CQUFtQixDQUFDLENBQUM7Q0FDekM7O0FBRUQsUUFBUSxDQUFDLFdBQVcsRUFBRSxZQUFZO0FBQ2hDLFVBQVEsQ0FBQyxhQUFhLEVBQUUsWUFBWTtBQUNsQyxNQUFFLENBQUMsd0NBQXdDLEVBQUUsWUFBWTtBQUN2RCxVQUFJLE1BQU0sR0FBRyxrQkFBOEIsRUFBQyxHQUFHLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztBQUN6RCxZQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUNwQixZQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3JDLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQzs7QUFFSCxVQUFRLENBQUMsZUFBZSxFQUFFLFlBQVk7QUFDcEMsTUFBRSxDQUFDLCtDQUErQyxFQUFFO1VBQzlDLE1BQU07Ozs7QUFBTixrQkFBTSxHQUFHLGtCQUE4QixFQUFFLEVBQUUsS0FBSyxDQUFDOztBQUNyRCx1QkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs2Q0FDZCxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUMsR0FBRyxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMscUNBQXFDLENBQUM7Ozs7Ozs7S0FDM0csQ0FBQyxDQUFDOztBQUVILE1BQUUsQ0FBQyxz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S0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7S0FDdEYsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDOztBQUVILFVBQVEsQ0FBQyw2QkFBNkIsRUFBRSxZQUFZO0FBQ2xELFFBQUksTUFBTSxHQUFHLGtCQUE4QixFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDdEQsTUFBRSxDQUFDLGdEQUFnRCxFQUFFO1VBRy9DLFFBQVE7Ozs7QUFGWix1QkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3BCLGtCQUFNLENBQUMsWUFBWSxHQUFHLEVBQUMsT0FBTyxFQUFFLEVBQUMsT0FBTyxFQUFFLG1CQUFNLEVBQUUsRUFBQyxFQUFDLENBQUM7QUFDakQsb0JBQVEsR0FBRyxtQkFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDOzs2Q0FDM0QsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEVBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUseUJBQXlCLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBQyxDQUFDOzs7QUFDekcsb0JBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFO0FBQ3RELHFCQUFPLEVBQUUsS0FBSztBQUNkLHNCQUFRLEVBQUUsc0JBQXNCO0FBQ2hDLHNCQUFRLEVBQUUsbUNBQW1DO2FBQzlDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7O0tBQ0wsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0NBR0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvdW5pdC9kcml2ZXItc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCBBbmRyb2lkVWlhdXRvbWF0b3IyRHJpdmVyIGZyb20gJy4uLy4uJztcbmltcG9ydCBzaW5vbiBmcm9tICdzaW5vbic7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBCIGZyb20gJ2JsdWViaXJkJztcblxuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5mdW5jdGlvbiBkZWZhdWx0U3R1YiAoZHJpdmVyKSB7XG4gIHNpbm9uLnN0dWIoZHJpdmVyLCAnZmlsbERldmljZURldGFpbHMnKTtcbn1cblxuZGVzY3JpYmUoJ2RyaXZlci5qcycsIGZ1bmN0aW9uICgpIHtcbiAgZGVzY3JpYmUoJ2NvbnN0cnVjdG9yJywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdjYWxscyBCYXNlRHJpdmVyIGNvbnN0cnVjdG9yIHdpdGggb3B0cycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBkcml2ZXIgPSBuZXcgQW5kcm9pZFVpYXV0b21hdG9yMkRyaXZlcih7Zm9vOiAnYmFyJ30pO1xuICAgICAgZHJpdmVyLnNob3VsZC5leGlzdDtcbiAgICAgIGRyaXZlci5vcHRzLmZvby5zaG91bGQuZXF1YWwoJ2JhcicpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnY3JlYXRlU2Vzc2lvbicsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIHRocm93IGFuIGVycm9yIGlmIGFwcCBjYW4gbm90IGJlIGZvdW5kJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGRyaXZlciA9IG5ldyBBbmRyb2lkVWlhdXRvbWF0b3IyRHJpdmVyKHt9LCBmYWxzZSk7XG4gICAgICBkZWZhdWx0U3R1Yihkcml2ZXIpO1xuICAgICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oe2FwcDogJ2Zvby5hcGsnfSkuc2hvdWxkLmJlLnJlamVjdGVkV2l0aCgnZG9lcyBub3QgZXhpc3Qgb3IgaXMgbm90IGFjY2Vzc2libGUnKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgc2V0IHNlc3Npb25JZCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBkcml2ZXIgPSBuZXcgQW5kcm9pZFVpYXV0b21hdG9yMkRyaXZlcih7fSwgZmFsc2UpO1xuICAgICAgZGVmYXVsdFN0dWIoZHJpdmVyKTtcbiAgICAgIHNpbm9uLm1vY2soZHJpdmVyKS5leHBlY3RzKCdjaGVja0FwcFByZXNlbnQnKVxuICAgICAgICAgIC5vbmNlKClcbiAgICAgICAgICAucmV0dXJucyhCLnJlc29sdmUoKSk7XG4gICAgICBzaW5vbi5tb2NrKGRyaXZlcikuZXhwZWN0cygnc3RhcnRVaUF1dG9tYXRvcjJTZXNzaW9uJylcbiAgICAgICAgICAub25jZSgpXG4gICAgICAgICAgLnJldHVybnMoQi5yZXNvbHZlKCkpO1xuICAgICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oe2NhcDogJ2Zvbyd9KTtcblxuICAgICAgZHJpdmVyLnNlc3Npb25JZC5zaG91bGQuZXhpc3Q7XG4gICAgICBkcml2ZXIuY2Fwcy5jYXAuc2hvdWxkLmVxdWFsKCdmb28nKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgc2V0IHRoZSBkZWZhdWx0IGNvbnRleHQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgZHJpdmVyID0gbmV3IEFuZHJvaWRVaWF1dG9tYXRvcjJEcml2ZXIoe30sIGZhbHNlKTtcbiAgICAgIGRlZmF1bHRTdHViKGRyaXZlcik7XG4gICAgICBzaW5vbi5tb2NrKGRyaXZlcikuZXhwZWN0cygnY2hlY2tBcHBQcmVzZW50JylcbiAgICAgICAgICAucmV0dXJucyhCLnJlc29sdmUoKSk7XG4gICAgICBzaW5vbi5tb2NrKGRyaXZlcikuZXhwZWN0cygnc3RhcnRVaUF1dG9tYXRvcjJTZXNzaW9uJylcbiAgICAgICAgICAucmV0dXJucyhCLnJlc29sdmUoKSk7XG4gICAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbih7fSk7XG4gICAgICBkcml2ZXIuY3VyQ29udGV4dC5zaG91bGQuZXF1YWwoJ05BVElWRV9BUFAnKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2NoZWNrQXBwUHJlc2VudCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIHJlc29sdmUgaWYgYXBwIHByZXNlbnQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgZHJpdmVyID0gbmV3IEFuZHJvaWRVaWF1dG9tYXRvcjJEcml2ZXIoe30sIGZhbHNlKTtcbiAgICAgIGRlZmF1bHRTdHViKGRyaXZlcik7XG4gICAgICBsZXQgYXBwID0gcGF0aC5yZXNvbHZlKCcuJyk7XG4gICAgICBzaW5vbi5tb2NrKGRyaXZlcikuZXhwZWN0cygnc3RhcnRVaUF1dG9tYXRvcjJTZXNzaW9uJylcbiAgICAgICAgICAucmV0dXJucyhCLnJlc29sdmUoKSk7XG4gICAgICBzaW5vbi5tb2NrKGRyaXZlci5oZWxwZXJzKS5leHBlY3RzKCdjb25maWd1cmVBcHAnKVxuICAgICAgICAgIC5yZXR1cm5zKGFwcCk7XG5cbiAgICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKHthcHB9KTtcblxuICAgICAgYXdhaXQgZHJpdmVyLmNoZWNrQXBwUHJlc2VudCgpOyAvLyBzaG91bGQgbm90IGVycm9yXG5cbiAgICAgIC8vIGNvbmZpZ3VyZUFwcCBpcyBzaGFyZWQgYmV0d2VlbiB0aGUgdHdvLFxuICAgICAgLy8gc28gcmVzdG9yZSBtb2NrIG9yIHRoZSBuZXh0IHRlc3Qgd2lsbCBmYWlsXG4gICAgICBkcml2ZXIuaGVscGVycy5jb25maWd1cmVBcHAucmVzdG9yZSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZWplY3QgaWYgYXBwIG5vdCBwcmVzZW50JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGRyaXZlciA9IG5ldyBBbmRyb2lkVWlhdXRvbWF0b3IyRHJpdmVyKHt9LCBmYWxzZSk7XG4gICAgICBkZWZhdWx0U3R1Yihkcml2ZXIpO1xuICAgICAgbGV0IGFwcCA9IHBhdGgucmVzb2x2ZSgnYXNkZmFzZGYnKTtcbiAgICAgIHNpbm9uLm1vY2soZHJpdmVyKS5leHBlY3RzKCdjaGVja0FwcFByZXNlbnQnKVxuICAgICAgICAgIC5yZXR1cm5zKEIucmVzb2x2ZSgpKTtcbiAgICAgIHNpbm9uLm1vY2soZHJpdmVyKS5leHBlY3RzKCdzdGFydFVpQXV0b21hdG9yMlNlc3Npb24nKVxuICAgICAgICAgIC5yZXR1cm5zKEIucmVzb2x2ZSgpKTtcbiAgICAgIHNpbm9uLm1vY2soZHJpdmVyLmhlbHBlcnMpLmV4cGVjdHMoJ2NvbmZpZ3VyZUFwcCcpXG4gICAgICAgICAgLnJldHVybnMoYXBwKTtcblxuICAgICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oe2FwcH0pO1xuXG4gICAgICBkcml2ZXIuY2hlY2tBcHBQcmVzZW50LnJlc3RvcmUoKTtcbiAgICAgIGF3YWl0IGRyaXZlci5jaGVja0FwcFByZXNlbnQoKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoJ0NvdWxkIG5vdCBmaW5kJyk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdwcm94eWluZycsIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgZHJpdmVyO1xuICAgIGJlZm9yZShmdW5jdGlvbiAoKSB7XG4gICAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZFVpYXV0b21hdG9yMkRyaXZlcih7fSwgZmFsc2UpO1xuICAgICAgZGVmYXVsdFN0dWIoZHJpdmVyKTtcbiAgICAgIGRyaXZlci5zZXNzaW9uSWQgPSAnYWJjJztcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnI3Byb3h5QWN0aXZlJywgZnVuY3Rpb24gKCkge1xuICAgICAgaXQoJ3Nob3VsZCBleGlzdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZHJpdmVyLnByb3h5QWN0aXZlLnNob3VsZC5iZS5hbi5pbnN0YW5jZW9mKEZ1bmN0aW9uKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZHJpdmVyLnByb3h5QWN0aXZlKCdhYmMnKS5zaG91bGQuYmUudHJ1ZTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCB0aHJvdyBhbiBlcnJvciBpZiBzZXNzaW9uIGlkIGlzIHdyb25nJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIGRyaXZlci5wcm94eUFjdGl2ZSgnYWFhJyk7XG4gICAgICAgIH0pLnNob3VsZC50aHJvdztcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJyNnZXRQcm94eUF2b2lkTGlzdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGl0KCdzaG91bGQgZXhpc3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRyaXZlci5nZXRQcm94eUF2b2lkTGlzdC5zaG91bGQuYmUuYW4uaW5zdGFuY2VvZihGdW5jdGlvbik7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGp3cFByb3h5QXZvaWQgYXJyYXknLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBhdm9pZExpc3QgPSBkcml2ZXIuZ2V0UHJveHlBdm9pZExpc3QoJ2FiYycpO1xuICAgICAgICBhdm9pZExpc3Quc2hvdWxkLmJlLmFuLmluc3RhbmNlb2YoQXJyYXkpO1xuICAgICAgICBhdm9pZExpc3Quc2hvdWxkLmVxbChkcml2ZXIuandwUHJveHlBdm9pZCk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgdGhyb3cgYW4gZXJyb3IgaWYgc2Vzc2lvbiBpZCBpcyB3cm9uZycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBkcml2ZXIuZ2V0UHJveHlBdm9pZExpc3QoJ2FhYScpO1xuICAgICAgICB9KS5zaG91bGQudGhyb3c7XG4gICAgICB9KTtcbiAgICAgIGRlc2NyaWJlKCduYXRpdmVXZWJTY3JlZW5zaG90JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgcHJveHlBdm9pZExpc3Q7XG4gICAgICAgIGxldCBuYXRpdmVXZWJTY3JlZW5zaG90RmlsdGVyID0gKGl0ZW0pID0+IGl0ZW1bMF0gPT09IFwiR0VUXCIgJiYgaXRlbVsxXS50ZXN0KCcvc2Vzc2lvbi94eHgvc2NyZWVuc2hvdC8nKTtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZHJpdmVyID0gbmV3IEFuZHJvaWRVaWF1dG9tYXRvcjJEcml2ZXIoe30sIGZhbHNlKTtcbiAgICAgICAgICBkZWZhdWx0U3R1Yihkcml2ZXIpO1xuICAgICAgICAgIHNpbm9uLm1vY2soZHJpdmVyKS5leHBlY3RzKCdjaGVja0FwcFByZXNlbnQnKVxuICAgICAgICAgICAgICAub25jZSgpXG4gICAgICAgICAgICAgIC5yZXR1cm5zKEIucmVzb2x2ZSgpKTtcbiAgICAgICAgICBzaW5vbi5tb2NrKGRyaXZlcikuZXhwZWN0cygnc3RhcnRVaUF1dG9tYXRvcjJTZXNzaW9uJylcbiAgICAgICAgICAgICAgLm9uY2UoKVxuICAgICAgICAgICAgICAucmV0dXJucyhCLnJlc29sdmUoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCdvbiB3ZWJ2aWV3IG1vZGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkcml2ZXIuY2hyb21lZHJpdmVyID0gdHJ1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpdCgnc2hvdWxkIHByb3h5IHNjcmVlbnNob3QgaWYgbmF0aXZlV2ViU2NyZWVuc2hvdCBpcyBvZmYgb24gY2hyb21lZHJpdmVyIG1vZGUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbih7cGxhdGZvcm1OYW1lOiAnQW5kcm9pZCcsIGRldmljZU5hbWU6ICdkZXZpY2UnLCBicm93c2VyTmFtZTogJ2Nocm9tZScsIG5hdGl2ZVdlYlNjcmVlbnNob3Q6IGZhbHNlfSk7XG4gICAgICAgICAgICBwcm94eUF2b2lkTGlzdCA9IGRyaXZlci5nZXRQcm94eUF2b2lkTGlzdCgpLmZpbHRlcihuYXRpdmVXZWJTY3JlZW5zaG90RmlsdGVyKTtcbiAgICAgICAgICAgIHByb3h5QXZvaWRMaXN0LnNob3VsZC5iZS5lbXB0eTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpdCgnc2hvdWxkIG5vdCBwcm94eSBzY3JlZW5zaG90IGlmIG5hdGl2ZVdlYlNjcmVlbnNob3QgaXMgb24gb24gY2hyb21lZHJpdmVyIG1vZGUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbih7cGxhdGZvcm1OYW1lOiAnQW5kcm9pZCcsIGRldmljZU5hbWU6ICdkZXZpY2UnLCBicm93c2VyTmFtZTogJ2Nocm9tZScsIG5hdGl2ZVdlYlNjcmVlbnNob3Q6IHRydWV9KTtcbiAgICAgICAgICAgIHByb3h5QXZvaWRMaXN0ID0gZHJpdmVyLmdldFByb3h5QXZvaWRMaXN0KCkuZmlsdGVyKG5hdGl2ZVdlYlNjcmVlbnNob3RGaWx0ZXIpO1xuICAgICAgICAgICAgcHJveHlBdm9pZExpc3Quc2hvdWxkLm5vdC5iZS5lbXB0eTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVzY3JpYmUoJ29uIG5hdGl2ZSBtb2RlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGl0KCdzaG91bGQgbmV2ZXIgcHJveHkgc2NyZWVuc2hvdCByZWdhcmRsZXNzIG9mIG5hdGl2ZVdlYlNjcmVlbnNob3Qgc2V0dGluZyAob24pJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gbmF0aXZlV2ViU2NyZWVuc2hvdCBvblxuICAgICAgICAgICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oe3BsYXRmb3JtTmFtZTogJ0FuZHJvaWQnLCBkZXZpY2VOYW1lOiAnZGV2aWNlJywgYnJvd3Nlck5hbWU6ICdjaHJvbWUnLCBuYXRpdmVXZWJTY3JlZW5zaG90OiB0cnVlfSk7XG4gICAgICAgICAgICBwcm94eUF2b2lkTGlzdCA9IGRyaXZlci5nZXRQcm94eUF2b2lkTGlzdCgpLmZpbHRlcihuYXRpdmVXZWJTY3JlZW5zaG90RmlsdGVyKTtcbiAgICAgICAgICAgIHByb3h5QXZvaWRMaXN0LnNob3VsZC5ub3QuYmUuZW1wdHk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpdCgnc2hvdWxkIG5ldmVyIHByb3h5IHNjcmVlbnNob3QgcmVnYXJkbGVzcyBvZiBuYXRpdmVXZWJTY3JlZW5zaG90IHNldHRpbmcgKG9mZiknLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBuYXRpdmVXZWJTY3JlZW5zaG90IG9mZlxuICAgICAgICAgICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oe3BsYXRmb3JtTmFtZTogJ0FuZHJvaWQnLCBkZXZpY2VOYW1lOiAnZGV2aWNlJywgYnJvd3Nlck5hbWU6ICdjaHJvbWUnLCBuYXRpdmVXZWJTY3JlZW5zaG90OiBmYWxzZX0pO1xuICAgICAgICAgICAgcHJveHlBdm9pZExpc3QgPSBkcml2ZXIuZ2V0UHJveHlBdm9pZExpc3QoKS5maWx0ZXIobmF0aXZlV2ViU2NyZWVuc2hvdEZpbHRlcik7XG4gICAgICAgICAgICBwcm94eUF2b2lkTGlzdC5zaG91bGQubm90LmJlLmVtcHR5O1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJyNjYW5Qcm94eScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGl0KCdzaG91bGQgZXhpc3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRyaXZlci5jYW5Qcm94eS5zaG91bGQuYmUuYW4uaW5zdGFuY2VvZihGdW5jdGlvbik7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRyaXZlci5jYW5Qcm94eSgnYWJjJykuc2hvdWxkLmJlLnRydWU7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgdGhyb3cgYW4gZXJyb3IgaWYgc2Vzc2lvbiBpZCBpcyB3cm9uZycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBkcml2ZXIuY2FuUHJveHkoJ2FhYScpO1xuICAgICAgICB9KS5zaG91bGQudGhyb3c7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ21hZ2ljIGZpcnN0IHZpc2libGUgY2hpbGQgeHBhdGgnLCBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGRyaXZlciA9IG5ldyBBbmRyb2lkVWlhdXRvbWF0b3IyRHJpdmVyKHt9LCBmYWxzZSk7XG4gICAgaXQoJ3Nob3VsZCB0cmFwIGFuZCBwcm94eSB0byBzcGVjaWFsIHVpYTIgc2VydmVyIGVuZHBvaW50JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgZGVmYXVsdFN0dWIoZHJpdmVyKTtcbiAgICAgIGRyaXZlci51aWF1dG9tYXRvcjIgPSB7andwcm94eToge2NvbW1hbmQ6ICgpID0+IHt9fX07XG4gICAgICBsZXQgcHJveHlTcHkgPSBzaW5vbi5zdHViKGRyaXZlci51aWF1dG9tYXRvcjIuandwcm94eSwgJ2NvbW1hbmQnKTtcbiAgICAgIGF3YWl0IGRyaXZlci5kb0ZpbmRFbGVtZW50T3JFbHMoe3N0cmF0ZWd5OiAneHBhdGgnLCBzZWxlY3RvcjogJy8qW0BmaXJzdFZpc2libGU9XCJ0cnVlXCJdJywgY29udGV4dDogJ2Zvbyd9KTtcbiAgICAgIHByb3h5U3B5LmZpcnN0Q2FsbC5hcmdzLnNob3VsZC5lcWwoW2AvYXBwaXVtL2VsZW1lbnQvZm9vL2ZpcnN0X3Zpc2libGVgLCAnR0VUJywge31dKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ21hZ2ljIHNjcm9sbGFibGUgdmlldyB4cGF0aCcsIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgZHJpdmVyID0gbmV3IEFuZHJvaWRVaWF1dG9tYXRvcjJEcml2ZXIoe30sIGZhbHNlKTtcbiAgICBpdCgnc2hvdWxkIHRyYXAgYW5kIHJld3JpdGUgYXMgdWlhdXRvbWF0b3IgbG9jYXRvcicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGRlZmF1bHRTdHViKGRyaXZlcik7XG4gICAgICBkcml2ZXIudWlhdXRvbWF0b3IyID0ge2p3cHJveHk6IHtjb21tYW5kOiAoKSA9PiB7fX19O1xuICAgICAgbGV0IHByb3h5U3B5ID0gc2lub24uc3R1Yihkcml2ZXIudWlhdXRvbWF0b3IyLmp3cHJveHksICdjb21tYW5kJyk7XG4gICAgICBhd2FpdCBkcml2ZXIuZG9GaW5kRWxlbWVudE9yRWxzKHtzdHJhdGVneTogJ3hwYXRoJywgc2VsZWN0b3I6ICcvLypbQHNjcm9sbGFibGU9XCJ0cnVlXCJdJywgY29udGV4dDogJ2Zvbyd9KTtcbiAgICAgIHByb3h5U3B5LmZpcnN0Q2FsbC5hcmdzLnNob3VsZC5lcWwoWycvZWxlbWVudCcsICdQT1NUJywge1xuICAgICAgICBjb250ZXh0OiAnZm9vJyxcbiAgICAgICAgc3RyYXRlZ3k6ICctYW5kcm9pZCB1aWF1dG9tYXRvcicsXG4gICAgICAgIHNlbGVjdG9yOiAnbmV3IFVpU2VsZWN0b3IoKS5zY3JvbGxhYmxlKHRydWUpJyxcbiAgICAgIH1dKTtcbiAgICB9KTtcbiAgfSk7XG5cblxufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uIn0=
