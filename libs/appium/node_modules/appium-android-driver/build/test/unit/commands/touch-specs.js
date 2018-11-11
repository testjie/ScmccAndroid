'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../../..');

var _2 = _interopRequireDefault(_);

var _appiumTestSupport = require('appium-test-support');

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('Touch', function () {
  var _this = this;

  var adb = new _appiumAdb2['default']();
  var driver = new _2['default']();
  driver.adb = adb;

  describe('#parseTouch', function () {
    describe('given a touch sequence with absolute coordinates', function () {
      it('should use offsets for moveTo', function callee$3$0() {
        var actions, touchStates, parsedActions, index, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, state;

        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              actions = [{ action: 'press', options: { x: 100, y: 101 } }, { action: 'moveTo', options: { x: 50, y: 51 } }, { action: 'wait', options: { ms: 5000 } }, { action: 'moveTo', options: { x: -40, y: -41 } }, { action: 'release', options: {} }];
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(driver.parseTouch(actions, false));

            case 3:
              touchStates = context$4$0.sent;

              touchStates.length.should.equal(5);
              parsedActions = [{ action: 'press', x: 100, y: 101 }, { action: 'moveTo', x: 50, y: 51 }, { action: 'wait', x: 50, y: 51 }, { action: 'moveTo', x: -40, y: -41 }, { action: 'release' }];
              index = 0;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              context$4$0.prev = 10;

              for (_iterator = _getIterator(touchStates); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                state = _step.value;

                state.action.should.equal(parsedActions[index].action);
                if (actions[index].action !== 'release') {
                  state.options.x.should.equal(parsedActions[index].x);
                  state.options.y.should.equal(parsedActions[index].y);
                }
                index++;
              }
              context$4$0.next = 18;
              break;

            case 14:
              context$4$0.prev = 14;
              context$4$0.t0 = context$4$0['catch'](10);
              _didIteratorError = true;
              _iteratorError = context$4$0.t0;

            case 18:
              context$4$0.prev = 18;
              context$4$0.prev = 19;

              if (!_iteratorNormalCompletion && _iterator['return']) {
                _iterator['return']();
              }

            case 21:
              context$4$0.prev = 21;

              if (!_didIteratorError) {
                context$4$0.next = 24;
                break;
              }

              throw _iteratorError;

            case 24:
              return context$4$0.finish(21);

            case 25:
              return context$4$0.finish(18);

            case 26:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this, [[10, 14, 18, 26], [19,, 21, 25]]);
      });
    });
  });

  describe('fixRelease', (0, _appiumTestSupport.withMocks)({ driver: driver, adb: adb }, function (mocks) {
    it('should be able to get the correct release coordinates', function callee$2$0() {
      var actions, release;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            actions = [{ action: 'press', options: { x: 20, y: 21 } }, { action: 'moveTo', options: { x: 10, y: 11 } }, { action: 'release' }];
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.fixRelease(actions, false));

          case 3:
            release = context$3$0.sent;

            release.options.should.eql({ x: 10, y: 11 });

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should be able to get the correct element release offset', function callee$2$0() {
      var actions, release;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.driver.expects('getLocationInView').withExactArgs(2).returns({ x: 100, y: 101 });
            actions = [{ action: 'press', options: { element: 1, x: 20, y: 21 } }, { action: 'moveTo', options: { element: 2, x: 10, y: 11 } }, { action: 'release' }];
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.fixRelease(actions, false));

          case 4:
            release = context$3$0.sent;

            release.options.should.eql({ x: 110, y: 112 });

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should be able to get the correct element release', function callee$2$0() {
      var actions, release;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.driver.expects('getLocationInView').withExactArgs(2).returns({ x: 100, y: 101 });
            mocks.driver.expects('getSize').withExactArgs(2).returns({ width: 5, height: 6 });
            actions = [{ action: 'press', options: { element: 1, x: 20, y: 21 } }, { action: 'moveTo', options: { element: 2 } }, { action: 'release' }];
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.fixRelease(actions, false));

          case 5:
            release = context$3$0.sent;

            release.options.should.eql({ x: 102.5, y: 104 });

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  }));

  describe('doTouchDrag', (0, _appiumTestSupport.withMocks)({ driver: driver, adb: adb }, function (mocks) {
    var tests = function tests(apiLevel, defaultDuration) {
      return _regeneratorRuntime.async(function tests$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            it('should handle longPress not having duration', function callee$3$0() {
              var expectedDuration, actions;
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    expectedDuration = defaultDuration;
                    actions = [{ action: 'longPress', options: { x: 100, y: 101 } }, { action: 'moveTo', options: { x: 50, y: 51 } }, { action: 'release', options: {} }];

                    mocks.driver.expects('drag').withExactArgs(actions[0].options.x, actions[0].options.y, actions[1].options.x, actions[1].options.y, expectedDuration, 1, undefined, undefined).returns('');
                    context$4$0.next = 5;
                    return _regeneratorRuntime.awrap(driver.doTouchDrag(actions));

                  case 5:

                    mocks.driver.verify();

                  case 6:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, this);
            });
            it('should handle longPress having duration', function callee$3$0() {
              var expectedDuration, actions;
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    expectedDuration = 4;
                    actions = [{ action: 'longPress', options: { x: 100, y: 101, duration: expectedDuration * 1000 } }, { action: 'moveTo', options: { x: 50, y: 51 } }, { action: 'release', options: {} }];

                    mocks.driver.expects('drag').withExactArgs(actions[0].options.x, actions[0].options.y, actions[1].options.x, actions[1].options.y, expectedDuration, 1, undefined, undefined).returns('');
                    context$4$0.next = 5;
                    return _regeneratorRuntime.awrap(driver.doTouchDrag(actions));

                  case 5:

                    mocks.driver.verify();

                  case 6:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, this);
            });
            it('should handle longPress having duration less than minimum', function callee$3$0() {
              var expectedDuration, actions;
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    expectedDuration = defaultDuration;
                    actions = [{ action: 'longPress', options: { x: 100, y: 101, duration: 500 } }, { action: 'moveTo', options: { x: 50, y: 51 } }, { action: 'release', options: {} }];

                    mocks.driver.expects('drag').withExactArgs(actions[0].options.x, actions[0].options.y, actions[1].options.x, actions[1].options.y, expectedDuration, 1, undefined, undefined).returns('');
                    context$4$0.next = 5;
                    return _regeneratorRuntime.awrap(driver.doTouchDrag(actions));

                  case 5:

                    mocks.driver.verify();

                  case 6:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, this);
            });

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    };

    describe('android >5', function () {
      beforeEach(function () {
        mocks.adb.expects('getApiLevel').returns(5);
      });
      afterEach(function () {
        mocks.adb.verify();
        mocks.adb.restore();
      });
      tests(5, 2);
    });
    describe('android <5', function () {
      beforeEach(function () {
        mocks.adb.expects('getApiLevel').returns(4.4);
      });
      afterEach(function () {
        mocks.adb.verify();
        mocks.adb.restore();
      });
      tests(4.4, 1);
    });
  }));

  describe('parseTouch', function () {
    it('should handle actions starting with wait', function callee$2$0() {
      var actions, touchStateObject;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            actions = [{ action: 'wait', options: { ms: 500 } }, { action: 'tap', options: { x: 100, y: 101 } }];
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.parseTouch(actions, true));

          case 3:
            touchStateObject = context$3$0.sent;

            touchStateObject.should.eql([{
              action: 'wait',
              time: 0.5
            }, {
              action: 'tap',
              touch: { x: 100, y: 101 },
              time: 0.505
            }]);

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});

// let driver = new AndroidDriver({foo: 'bar'});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9jb21tYW5kcy90b3VjaC1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQ25CLFVBQVU7Ozs7aUNBQ1YscUJBQXFCOzt5QkFDL0IsWUFBWTs7OztBQUc1QixrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLFFBQVEsQ0FBQyxPQUFPLEVBQUUsWUFBWTs7O0FBQzVCLE1BQUksR0FBRyxHQUFHLDRCQUFTLENBQUM7QUFDcEIsTUFBSSxNQUFNLEdBQUcsbUJBQW1CLENBQUM7QUFDakMsUUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7O0FBRWpCLFVBQVEsQ0FBQyxhQUFhLEVBQUUsWUFBWTtBQUNsQyxZQUFRLENBQUMsa0RBQWtELEVBQUUsWUFBWTtBQUN2RSxRQUFFLENBQUMsK0JBQStCLEVBQUU7WUFFOUIsT0FBTyxFQUtQLFdBQVcsRUFFWCxhQUFhLEVBS2IsS0FBSyxrRkFDQSxLQUFLOzs7OztBQWJWLHFCQUFPLEdBQUcsQ0FBQyxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFDLEVBQUMsRUFDNUMsRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBQyxFQUFDLEVBQzNDLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBQyxFQUFFLEVBQUUsSUFBSSxFQUFDLEVBQUMsRUFDckMsRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUMsRUFBQyxFQUM3QyxFQUFDLE1BQU0sRUFBRSxTQUFT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LEVBQUMsRUFBRSxFQUFFLEdBQUcsRUFBQyxFQUFDLEVBQ3BDLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUMsRUFBQyxDQUFDOzs2Q0FFN0IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDOzs7QUFBekQsNEJBQWdCOztBQUNwQiw0QkFBZ0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDM0Isb0JBQU0sRUFBRSxNQUFNO0FBQ2Qsa0JBQUksRUFBRSxHQUFHO2FBQ1YsRUFBRTtBQUNELG9CQUFNLEVBQUUsS0FBSztBQUNiLG1CQUFLLEVBQUUsRUFBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUM7QUFDdkIsa0JBQUksRUFBRSxLQUFLO2FBQ1osQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7S0FDTCxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC91bml0L2NvbW1hbmRzL3RvdWNoLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLi8uLic7XG5pbXBvcnQgeyB3aXRoTW9ja3MgfSBmcm9tICdhcHBpdW0tdGVzdC1zdXBwb3J0JztcbmltcG9ydCBBREIgZnJvbSAnYXBwaXVtLWFkYic7XG5cblxuY2hhaS5zaG91bGQoKTtcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcblxuZGVzY3JpYmUoJ1RvdWNoJywgZnVuY3Rpb24gKCkge1xuICBsZXQgYWRiID0gbmV3IEFEQigpO1xuICBsZXQgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgZHJpdmVyLmFkYiA9IGFkYjtcblxuICBkZXNjcmliZSgnI3BhcnNlVG91Y2gnLCBmdW5jdGlvbiAoKSB7XG4gICAgZGVzY3JpYmUoJ2dpdmVuIGEgdG91Y2ggc2VxdWVuY2Ugd2l0aCBhYnNvbHV0ZSBjb29yZGluYXRlcycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGl0KCdzaG91bGQgdXNlIG9mZnNldHMgZm9yIG1vdmVUbycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gbGV0IGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKHtmb286ICdiYXInfSk7XG4gICAgICAgIGxldCBhY3Rpb25zID0gW3thY3Rpb246ICdwcmVzcycsIG9wdGlvbnM6IHt4OiAxMDAsIHk6IDEwMX19LFxuICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOiAnbW92ZVRvJywgb3B0aW9uczoge3g6IDUwLCB5OiA1MX19LFxuICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOiAnd2FpdCcsIG9wdGlvbnM6IHttczogNTAwMH19LFxuICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOiAnbW92ZVRvJywgb3B0aW9uczoge3g6IC00MCwgeTogLTQxfX0sXG4gICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246ICdyZWxlYXNlJywgb3B0aW9uczoge319XTtcbiAgICAgICAgbGV0IHRvdWNoU3RhdGVzID0gYXdhaXQgZHJpdmVyLnBhcnNlVG91Y2goYWN0aW9ucywgZmFsc2UpO1xuICAgICAgICB0b3VjaFN0YXRlcy5sZW5ndGguc2hvdWxkLmVxdWFsKDUpO1xuICAgICAgICBsZXQgcGFyc2VkQWN0aW9ucyA9IFt7YWN0aW9uOiAncHJlc3MnLCB4OiAxMDAsIHk6IDEwMX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246ICdtb3ZlVG8nLCB4OiA1MCwgeTogNTF9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOiAnd2FpdCcsIHg6IDUwLCB5OiA1MX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246ICdtb3ZlVG8nLCB4OiAtNDAsIHk6IC00MX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246ICdyZWxlYXNlJ31dO1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICBmb3IgKGxldCBzdGF0ZSBvZiB0b3VjaFN0YXRlcykge1xuICAgICAgICAgIHN0YXRlLmFjdGlvbi5zaG91bGQuZXF1YWwocGFyc2VkQWN0aW9uc1tpbmRleF0uYWN0aW9uKTtcbiAgICAgICAgICBpZiAoYWN0aW9uc1tpbmRleF0uYWN0aW9uICE9PSAncmVsZWFzZScpIHtcbiAgICAgICAgICAgIHN0YXRlLm9wdGlvbnMueC5zaG91bGQuZXF1YWwocGFyc2VkQWN0aW9uc1tpbmRleF0ueCk7XG4gICAgICAgICAgICBzdGF0ZS5vcHRpb25zLnkuc2hvdWxkLmVxdWFsKHBhcnNlZEFjdGlvbnNbaW5kZXhdLnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpbmRleCsrO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2ZpeFJlbGVhc2UnLCB3aXRoTW9ja3Moe2RyaXZlciwgYWRifSwgKG1vY2tzKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGdldCB0aGUgY29ycmVjdCByZWxlYXNlIGNvb3JkaW5hdGVzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGFjdGlvbnMgPSBbe2FjdGlvbjogJ3ByZXNzJywgb3B0aW9uczoge3g6IDIwLCB5OiAyMX19LFxuICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjogJ21vdmVUbycsIG9wdGlvbnM6IHt4OiAxMCwgeTogMTF9fSxcbiAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246ICdyZWxlYXNlJ31dO1xuICAgICAgbGV0IHJlbGVhc2UgPSBhd2FpdCBkcml2ZXIuZml4UmVsZWFzZShhY3Rpb25zLCBmYWxzZSk7XG4gICAgICByZWxlYXNlLm9wdGlvbnMuc2hvdWxkLmVxbCh7eDogMTAsIHk6IDExfSk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGdldCB0aGUgY29ycmVjdCBlbGVtZW50IHJlbGVhc2Ugb2Zmc2V0JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbW9ja3MuZHJpdmVyLmV4cGVjdHMoJ2dldExvY2F0aW9uSW5WaWV3JylcbiAgICAgICAgLndpdGhFeGFjdEFyZ3MoMilcbiAgICAgICAgLnJldHVybnMoe3g6IDEwMCwgeTogMTAxfSk7XG4gICAgICBsZXQgYWN0aW9ucyA9IFt7YWN0aW9uOiAncHJlc3MnLCBvcHRpb25zOiB7ZWxlbWVudDogMSwgeDogMjAsIHk6IDIxfX0sXG4gICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOiAnbW92ZVRvJywgb3B0aW9uczoge2VsZW1lbnQ6IDIsIHg6IDEwLCB5OiAxMX19LFxuICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjogJ3JlbGVhc2UnfV07XG4gICAgICBsZXQgcmVsZWFzZSA9IGF3YWl0IGRyaXZlci5maXhSZWxlYXNlKGFjdGlvbnMsIGZhbHNlKTtcbiAgICAgIHJlbGVhc2Uub3B0aW9ucy5zaG91bGQuZXFsKHt4OiAxMTAsIHk6IDExMn0pO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byBnZXQgdGhlIGNvcnJlY3QgZWxlbWVudCByZWxlYXNlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbW9ja3MuZHJpdmVyLmV4cGVjdHMoJ2dldExvY2F0aW9uSW5WaWV3JylcbiAgICAgICAgLndpdGhFeGFjdEFyZ3MoMilcbiAgICAgICAgLnJldHVybnMoe3g6IDEwMCwgeTogMTAxfSk7XG4gICAgICBtb2Nrcy5kcml2ZXIuZXhwZWN0cygnZ2V0U2l6ZScpXG4gICAgICAgIC53aXRoRXhhY3RBcmdzKDIpXG4gICAgICAgIC5yZXR1cm5zKHt3aWR0aDogNSwgaGVpZ2h0OiA2fSk7XG4gICAgICBsZXQgYWN0aW9ucyA9IFt7YWN0aW9uOiAncHJlc3MnLCBvcHRpb25zOiB7ZWxlbWVudDogMSwgeDogMjAsIHk6IDIxfX0sXG4gICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOiAnbW92ZVRvJywgb3B0aW9uczoge2VsZW1lbnQ6IDJ9fSxcbiAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246ICdyZWxlYXNlJ31dO1xuICAgICAgbGV0IHJlbGVhc2UgPSBhd2FpdCBkcml2ZXIuZml4UmVsZWFzZShhY3Rpb25zLCBmYWxzZSk7XG4gICAgICByZWxlYXNlLm9wdGlvbnMuc2hvdWxkLmVxbCh7eDogMTAyLjUsIHk6IDEwNH0pO1xuICAgIH0pO1xuICB9KSk7XG5cbiAgZGVzY3JpYmUoJ2RvVG91Y2hEcmFnJywgd2l0aE1vY2tzKHtkcml2ZXIsIGFkYn0sIChtb2NrcykgPT4ge1xuICAgIGxldCB0ZXN0cyA9IGFzeW5jIChhcGlMZXZlbCwgZGVmYXVsdER1cmF0aW9uKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIGhhbmRsZSBsb25nUHJlc3Mgbm90IGhhdmluZyBkdXJhdGlvbicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IGV4cGVjdGVkRHVyYXRpb24gPSBkZWZhdWx0RHVyYXRpb247XG4gICAgICAgIGxldCBhY3Rpb25zID0gW3thY3Rpb246ICdsb25nUHJlc3MnLCBvcHRpb25zOiB7eDogMTAwLCB5OiAxMDF9fSxcbiAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjogJ21vdmVUbycsIG9wdGlvbnM6IHt4OiA1MCwgeTogNTF9fSxcbiAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjogJ3JlbGVhc2UnLCBvcHRpb25zOiB7fX1dO1xuXG4gICAgICAgIG1vY2tzLmRyaXZlci5leHBlY3RzKCdkcmFnJylcbiAgICAgICAgICAud2l0aEV4YWN0QXJncyhhY3Rpb25zWzBdLm9wdGlvbnMueCwgYWN0aW9uc1swXS5vcHRpb25zLnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uc1sxXS5vcHRpb25zLngsIGFjdGlvbnNbMV0ub3B0aW9ucy55LFxuICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGVjdGVkRHVyYXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgMSwgdW5kZWZpbmVkLCB1bmRlZmluZWQpXG4gICAgICAgICAgLnJldHVybnMoJycpO1xuICAgICAgICBhd2FpdCBkcml2ZXIuZG9Ub3VjaERyYWcoYWN0aW9ucyk7XG5cbiAgICAgICAgbW9ja3MuZHJpdmVyLnZlcmlmeSgpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIGhhbmRsZSBsb25nUHJlc3MgaGF2aW5nIGR1cmF0aW9uJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgZXhwZWN0ZWREdXJhdGlvbiA9IDQ7XG4gICAgICAgIGxldCBhY3Rpb25zID0gW3thY3Rpb246ICdsb25nUHJlc3MnLCBvcHRpb25zOiB7eDogMTAwLCB5OiAxMDEsIGR1cmF0aW9uOiBleHBlY3RlZER1cmF0aW9uICogMTAwMH19LFxuICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOiAnbW92ZVRvJywgb3B0aW9uczoge3g6IDUwLCB5OiA1MX19LFxuICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOiAncmVsZWFzZScsIG9wdGlvbnM6IHt9fV07XG5cbiAgICAgICAgbW9ja3MuZHJpdmVyLmV4cGVjdHMoJ2RyYWcnKVxuICAgICAgICAgIC53aXRoRXhhY3RBcmdzKGFjdGlvbnNbMF0ub3B0aW9ucy54LCBhY3Rpb25zWzBdLm9wdGlvbnMueSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25zWzFdLm9wdGlvbnMueCwgYWN0aW9uc1sxXS5vcHRpb25zLnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgZXhwZWN0ZWREdXJhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAxLCB1bmRlZmluZWQsIHVuZGVmaW5lZClcbiAgICAgICAgICAucmV0dXJucygnJyk7XG4gICAgICAgIGF3YWl0IGRyaXZlci5kb1RvdWNoRHJhZyhhY3Rpb25zKTtcblxuICAgICAgICBtb2Nrcy5kcml2ZXIudmVyaWZ5KCk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgaGFuZGxlIGxvbmdQcmVzcyBoYXZpbmcgZHVyYXRpb24gbGVzcyB0aGFuIG1pbmltdW0nLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBleHBlY3RlZER1cmF0aW9uID0gZGVmYXVsdER1cmF0aW9uO1xuICAgICAgICBsZXQgYWN0aW9ucyA9IFt7YWN0aW9uOiAnbG9uZ1ByZXNzJywgb3B0aW9uczoge3g6IDEwMCwgeTogMTAxLCBkdXJhdGlvbjogNTAwfX0sXG4gICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246ICdtb3ZlVG8nLCBvcHRpb25zOiB7eDogNTAsIHk6IDUxfX0sXG4gICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246ICdyZWxlYXNlJywgb3B0aW9uczoge319XTtcblxuICAgICAgICBtb2Nrcy5kcml2ZXIuZXhwZWN0cygnZHJhZycpXG4gICAgICAgICAgLndpdGhFeGFjdEFyZ3MoYWN0aW9uc1swXS5vcHRpb25zLngsIGFjdGlvbnNbMF0ub3B0aW9ucy55LFxuICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbnNbMV0ub3B0aW9ucy54LCBhY3Rpb25zWzFdLm9wdGlvbnMueSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBleHBlY3RlZER1cmF0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgIDEsIHVuZGVmaW5lZCwgdW5kZWZpbmVkKVxuICAgICAgICAgIC5yZXR1cm5zKCcnKTtcbiAgICAgICAgYXdhaXQgZHJpdmVyLmRvVG91Y2hEcmFnKGFjdGlvbnMpO1xuXG4gICAgICAgIG1vY2tzLmRyaXZlci52ZXJpZnkoKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBkZXNjcmliZSgnYW5kcm9pZCA+NScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0QXBpTGV2ZWwnKVxuICAgICAgICAgIC5yZXR1cm5zKDUpO1xuICAgICAgfSk7XG4gICAgICBhZnRlckVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgICAgIG1vY2tzLmFkYi5yZXN0b3JlKCk7XG4gICAgICB9KTtcbiAgICAgIHRlc3RzKDUsIDIpO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdhbmRyb2lkIDw1JywgZnVuY3Rpb24gKCkge1xuICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXRBcGlMZXZlbCcpXG4gICAgICAgICAgLnJldHVybnMoNC40KTtcbiAgICAgIH0pO1xuICAgICAgYWZ0ZXJFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgICAgICBtb2Nrcy5hZGIucmVzdG9yZSgpO1xuICAgICAgfSk7XG4gICAgICB0ZXN0cyg0LjQsIDEpO1xuICAgIH0pO1xuICB9KSk7XG5cbiAgZGVzY3JpYmUoJ3BhcnNlVG91Y2gnLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ3Nob3VsZCBoYW5kbGUgYWN0aW9ucyBzdGFydGluZyB3aXRoIHdhaXQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgYWN0aW9ucyA9IFt7YWN0aW9uOiAnd2FpdCcsIG9wdGlvbnM6IHttczogNTAwfX0sXG4gICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOiAndGFwJywgb3B0aW9uczoge3g6IDEwMCwgeTogMTAxfX1dO1xuXG4gICAgICBsZXQgdG91Y2hTdGF0ZU9iamVjdCA9IGF3YWl0IGRyaXZlci5wYXJzZVRvdWNoKGFjdGlvbnMsIHRydWUpO1xuICAgICAgdG91Y2hTdGF0ZU9iamVjdC5zaG91bGQuZXFsKFt7XG4gICAgICAgIGFjdGlvbjogJ3dhaXQnLFxuICAgICAgICB0aW1lOiAwLjUsXG4gICAgICB9LCB7XG4gICAgICAgIGFjdGlvbjogJ3RhcCcsXG4gICAgICAgIHRvdWNoOiB7eDogMTAwLCB5OiAxMDF9LFxuICAgICAgICB0aW1lOiAwLjUwNSxcbiAgICAgIH1dKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4ifQ==
