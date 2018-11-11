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

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('Touch', function () {
  var adb = new _appiumAdb2['default']();
  var driver = new _2['default']();
  driver.adb = adb;

  describe('#parseTouch', function () {
    describe('given a touch sequence with absolute coordinates', function () {
      it('should use absolutes for moveTo', function callee$3$0() {
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
});

// let driver = new AndroidDriver({foo: 'bar'});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9jb21tYW5kcy90b3VjaC1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQ1AsVUFBVTs7Ozt5QkFDaEMsWUFBWTs7OztBQUc1QixrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLFFBQVEsQ0FBQyxPQUFPLEVBQUUsWUFBWTtBQUM1QixNQUFJLEdBQUcsR0FBRyw0QkFBUyxDQUFDO0FBQ3BCLE1BQUksTUFBTSxHQUFHLG1CQUErQixDQUFDO0FBQzdDLFFBQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDOztBQUVqQixVQUFRLENBQUMsYUFBYSxFQUFFLFlBQVk7QUFDbEMsWUFBUSxDQUFDLGtEQUFrRCxFQUFFLFlBQVk7QUFDdkUsUUFBRSxDQUFDLGlDQUFpQyxFQUFFO1lBRWhDLE9BQU8sRUFPUCxXQUFXLEVBRVgsYUFBYSxFQU9iLEtBQUssa0ZBQ0EsS0FBSzs7Ozs7QUFqQlYscUJBQU8sR0FBRyxDQUNaLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUMsRUFBQyxFQUM1QyxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFDLEVBQUMsRUFDM0MsRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUMsRUFBQyxFQUNyQyxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQyxFQUFDLEVBQzdDLEVBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFDLENBQ2pDOzsrQ0FDdUIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDOzs7QUFBckQseUJBQVc7O0FBQ2YseUJBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQiwyQkFBYSxHQUFHLENBQ2xCLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUMsRUFDakMsRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBQyxFQUNoQyxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFDLEVBQzlCLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDLEVBQ2xDLEVBQUMsTUFBTSxFQUFFLFNBQVMsRUFBQyxDQUNwQjtBQUNHLG1CQUFLLEdBQUcsQ0FBQzs7Ozs7O0FBQ2IsNENBQWtCLFdBQVcscUdBQUU7QUFBdEIscUJBQUs7O0FBQ1oscUJBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDdkQsb0JBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7QUFDdkMsdUJBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3JELHVCQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDdEQ7QUFDRCxxQkFBSyxFQUFFLENBQUM7ZUFDVDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BQ0YsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvdW5pdC9jb21tYW5kcy90b3VjaC1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IEFuZHJvaWRVaWF1dG9tYXRvcjJEcml2ZXIgZnJvbSAnLi4vLi4vLi4nO1xuaW1wb3J0IEFEQiBmcm9tICdhcHBpdW0tYWRiJztcblxuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5kZXNjcmliZSgnVG91Y2gnLCBmdW5jdGlvbiAoKSB7XG4gIGxldCBhZGIgPSBuZXcgQURCKCk7XG4gIGxldCBkcml2ZXIgPSBuZXcgQW5kcm9pZFVpYXV0b21hdG9yMkRyaXZlcigpO1xuICBkcml2ZXIuYWRiID0gYWRiO1xuXG4gIGRlc2NyaWJlKCcjcGFyc2VUb3VjaCcsIGZ1bmN0aW9uICgpIHtcbiAgICBkZXNjcmliZSgnZ2l2ZW4gYSB0b3VjaCBzZXF1ZW5jZSB3aXRoIGFic29sdXRlIGNvb3JkaW5hdGVzJywgZnVuY3Rpb24gKCkge1xuICAgICAgaXQoJ3Nob3VsZCB1c2UgYWJzb2x1dGVzIGZvciBtb3ZlVG8nLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIGxldCBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcih7Zm9vOiAnYmFyJ30pO1xuICAgICAgICBsZXQgYWN0aW9ucyA9IFtcbiAgICAgICAgICB7YWN0aW9uOiAncHJlc3MnLCBvcHRpb25zOiB7eDogMTAwLCB5OiAxMDF9fSxcbiAgICAgICAgICB7YWN0aW9uOiAnbW92ZVRvJywgb3B0aW9uczoge3g6IDUwLCB5OiA1MX19LFxuICAgICAgICAgIHthY3Rpb246ICd3YWl0Jywgb3B0aW9uczoge21zOiA1MDAwfX0sXG4gICAgICAgICAge2FjdGlvbjogJ21vdmVUbycsIG9wdGlvbnM6IHt4OiAtNDAsIHk6IC00MX19LFxuICAgICAgICAgIHthY3Rpb246ICdyZWxlYXNlJywgb3B0aW9uczoge319XG4gICAgICAgIF07XG4gICAgICAgIGxldCB0b3VjaFN0YXRlcyA9IGF3YWl0IGRyaXZlci5wYXJzZVRvdWNoKGFjdGlvbnMsIGZhbHNlKTtcbiAgICAgICAgdG91Y2hTdGF0ZXMubGVuZ3RoLnNob3VsZC5lcXVhbCg1KTtcbiAgICAgICAgbGV0IHBhcnNlZEFjdGlvbnMgPSBbXG4gICAgICAgICAge2FjdGlvbjogJ3ByZXNzJywgeDogMTAwLCB5OiAxMDF9LFxuICAgICAgICAgIHthY3Rpb246ICdtb3ZlVG8nLCB4OiA1MCwgeTogNTF9LFxuICAgICAgICAgIHthY3Rpb246ICd3YWl0JywgeDogNTAsIHk6IDUxfSxcbiAgICAgICAgICB7YWN0aW9uOiAnbW92ZVRvJywgeDogLTQwLCB5OiAtNDF9LFxuICAgICAgICAgIHthY3Rpb246ICdyZWxlYXNlJ31cbiAgICAgICAgXTtcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgZm9yIChsZXQgc3RhdGUgb2YgdG91Y2hTdGF0ZXMpIHtcbiAgICAgICAgICBzdGF0ZS5hY3Rpb24uc2hvdWxkLmVxdWFsKHBhcnNlZEFjdGlvbnNbaW5kZXhdLmFjdGlvbik7XG4gICAgICAgICAgaWYgKGFjdGlvbnNbaW5kZXhdLmFjdGlvbiAhPT0gJ3JlbGVhc2UnKSB7XG4gICAgICAgICAgICBzdGF0ZS5vcHRpb25zLnguc2hvdWxkLmVxdWFsKHBhcnNlZEFjdGlvbnNbaW5kZXhdLngpO1xuICAgICAgICAgICAgc3RhdGUub3B0aW9ucy55LnNob3VsZC5lcXVhbChwYXJzZWRBY3Rpb25zW2luZGV4XS55KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uIn0=
