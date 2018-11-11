'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _2 = require('../../..');

var _3 = _interopRequireDefault(_2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var _asyncbox = require('asyncbox');

var _desired = require('../desired');

var _desired2 = _interopRequireDefault(_desired);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var driver = undefined;
var defaultCaps = _lodash2['default'].defaults({
  appActivity: '.app.StatusBarNotifications'
}, _desired2['default']);

describe('apidemo - notifications', function () {
  before(function callee$1$0() {
    var adb, apiLevel;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          adb = new _appiumAdb2['default']();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(adb.getApiLevel());

        case 3:
          apiLevel = context$2$0.sent;

          if (!([21, 22].indexOf(apiLevel) >= 0)) {
            context$2$0.next = 6;
            break;
          }

          return context$2$0.abrupt('return', this.skip());

        case 6:
          driver = new _3['default']();
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(driver.createSession(defaultCaps));

        case 9:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  after(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          if (!driver) {
            context$2$0.next = 3;
            break;
          }

          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.deleteSession());

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should open the notification shade @skip-ci', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      var _this = this;

      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElement('accessibility id', ':-|'));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.click(el.ELEMENT));

        case 5:
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(_bluebird2['default'].delay(1000));

        case 7:
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(driver.openNotifications());

        case 9:
          context$2$0.next = 11;
          return _regeneratorRuntime.awrap((0, _asyncbox.retry)(4, function callee$2$0() {
            var textViews, text, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, view;

            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(driver.findElements('class name', 'android.widget.TextView'));

                case 2:
                  textViews = context$3$0.sent;
                  text = [];
                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  context$3$0.prev = 7;
                  _iterator = _getIterator(textViews);

                case 9:
                  if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                    context$3$0.next = 19;
                    break;
                  }

                  view = _step.value;
                  context$3$0.t0 = text;
                  context$3$0.next = 14;
                  return _regeneratorRuntime.awrap(driver.getText(view.ELEMENT));

                case 14:
                  context$3$0.t1 = context$3$0.sent;
                  context$3$0.t0.push.call(context$3$0.t0, context$3$0.t1);

                case 16:
                  _iteratorNormalCompletion = true;
                  context$3$0.next = 9;
                  break;

                case 19:
                  context$3$0.next = 25;
                  break;

                case 21:
                  context$3$0.prev = 21;
                  context$3$0.t2 = context$3$0['catch'](7);
                  _didIteratorError = true;
                  _iteratorError = context$3$0.t2;

                case 25:
                  context$3$0.prev = 25;
                  context$3$0.prev = 26;

                  if (!_iteratorNormalCompletion && _iterator['return']) {
                    _iterator['return']();
                  }

                case 28:
                  context$3$0.prev = 28;

                  if (!_didIteratorError) {
                    context$3$0.next = 31;
                    break;
                  }

                  throw _iteratorError;

                case 31:
                  return context$3$0.finish(28);

                case 32:
                  return context$3$0.finish(25);

                case 33:
                  text.should.include('Mood ring');

                case 34:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this, [[7, 21, 25, 33], [26,, 28, 32]]);
          }));

        case 11:
          context$2$0.next = 13;
          return _regeneratorRuntime.awrap(driver.keyevent(4));

        case 13:
          context$2$0.next = 15;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.become(':-|'));

        case 15:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});

// TODO: why does this fail?

// give the app a second to catch up before opening notifications

// go back to the app
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9ub3RpZmljYXRpb25zLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7aUJBQ25CLFVBQVU7Ozs7d0JBQ3RCLFVBQVU7Ozs7c0JBQ1YsUUFBUTs7Ozt5QkFDTixZQUFZOzs7O3dCQUNOLFVBQVU7O3VCQUNQLFlBQVk7Ozs7QUFHckMsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixJQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsSUFBSSxXQUFXLEdBQUcsb0JBQUUsUUFBUSxDQUFDO0FBQzNCLGFBQVcsRUFBRSw2QkFBNkI7Q0FDM0MsdUJBQWUsQ0FBQzs7QUFFakIsUUFBUSxDQUFDLHlCQUF5QixFQUFFLFlBQVk7QUFDOUMsUUFBTSxDQUFDO1FBRUQsR0FBRyxFQUNILFFBQVE7Ozs7QUFEUixhQUFHLEdBQUcsNEJBQVM7OzJDQUNFLEdBQUcsQ0FBQyxXQUFXLEVBQUU7OztBQUFsQyxrQkFBUTs7Z0JBQ1IsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTs7Ozs7OENBQzFCLElBQUksQ0FBQyxJQUFJLEVBQUU7OztBQUVwQixnQkFBTSxHQUFHLG1CQUFtQixDQUFDOzsyQ0FDdkIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7Ozs7Ozs7R0FDeEMsQ0FBQyxDQUFDO0FBQ0gsT0FBSyxDQUFDOzs7O2VBQ0EsTUFBTTs7Ozs7OzJDQUNGLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7R0FFL0IsQ0FBQyxDQUFDOztBQUVILElBQUUsQ0FBQyw2Q0FBNkMsRUFBRTtRQUM1QyxFQUFFOzs7Ozs7OzJDQUFTLE1BQU0sQ0FBQyxXQUFXLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDOzs7QUFBeEQsWUFBRTs7MkNBQ0EsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDOzs7OzJDQUd4QixzQkFBRSxLQUFLLENBQUMsSUFBSSxDQUFDOzs7OzJDQUNiLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRTs7OzsyQ0FFMUIscUJBQU0sQ0FBQyxFQUFFO2dCQUNULFNBQVMsRUFDVCxJQUFJLGtGQUNDLElBQUk7Ozs7OzttREFGUyxNQUFNLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSx5QkFBeUIsQ0FBQzs7O0FBQTlFLDJCQUFTO0FBQ1Qsc0JBQUksR0FBRyxFQUFFOzs7OzsyQ0FDSSxTQUFTOzs7Ozs7OztBQUFqQixzQkFBSTttQ0FDWCxJQUFJOzttREFBWSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7Ozs7aUNBQXZDLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVYLHNCQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQzs7Ozs7OztXQUNsQyxDQUFDOzs7OzJDQUdJLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOzs7OzJDQUNsQixNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzs7Ozs7OztHQUN0RCxDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2NvbW1hbmRzL25vdGlmaWNhdGlvbnMtZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLi8uLic7XG5pbXBvcnQgQiBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IEFEQiBmcm9tICdhcHBpdW0tYWRiJztcbmltcG9ydCB7IHJldHJ5IH0gZnJvbSAnYXN5bmNib3gnO1xuaW1wb3J0IERFRkFVTFRfQ0FQUyBmcm9tICcuLi9kZXNpcmVkJztcblxuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5sZXQgZHJpdmVyO1xubGV0IGRlZmF1bHRDYXBzID0gXy5kZWZhdWx0cyh7XG4gIGFwcEFjdGl2aXR5OiAnLmFwcC5TdGF0dXNCYXJOb3RpZmljYXRpb25zJ1xufSwgREVGQVVMVF9DQVBTKTtcblxuZGVzY3JpYmUoJ2FwaWRlbW8gLSBub3RpZmljYXRpb25zJywgZnVuY3Rpb24gKCkge1xuICBiZWZvcmUoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIC8vIFRPRE86IHdoeSBkb2VzIHRoaXMgZmFpbD9cbiAgICBsZXQgYWRiID0gbmV3IEFEQigpO1xuICAgIGxldCBhcGlMZXZlbCA9IGF3YWl0IGFkYi5nZXRBcGlMZXZlbCgpO1xuICAgIGlmIChbMjEsIDIyXS5pbmRleE9mKGFwaUxldmVsKSA+PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5za2lwKCk7XG4gICAgfVxuICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oZGVmYXVsdENhcHMpO1xuICB9KTtcbiAgYWZ0ZXIoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGlmIChkcml2ZXIpIHtcbiAgICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XG4gICAgfVxuICB9KTtcblxuICBpdCgnc2hvdWxkIG9wZW4gdGhlIG5vdGlmaWNhdGlvbiBzaGFkZSBAc2tpcC1jaScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgZWwgPSBhd2FpdCBkcml2ZXIuZmluZEVsZW1lbnQoJ2FjY2Vzc2liaWxpdHkgaWQnLCAnOi18Jyk7XG4gICAgYXdhaXQgZHJpdmVyLmNsaWNrKGVsLkVMRU1FTlQpO1xuXG4gICAgLy8gZ2l2ZSB0aGUgYXBwIGEgc2Vjb25kIHRvIGNhdGNoIHVwIGJlZm9yZSBvcGVuaW5nIG5vdGlmaWNhdGlvbnNcbiAgICBhd2FpdCBCLmRlbGF5KDEwMDApO1xuICAgIGF3YWl0IGRyaXZlci5vcGVuTm90aWZpY2F0aW9ucygpO1xuXG4gICAgYXdhaXQgcmV0cnkoNCwgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IHRleHRWaWV3cyA9IGF3YWl0IGRyaXZlci5maW5kRWxlbWVudHMoJ2NsYXNzIG5hbWUnLCAnYW5kcm9pZC53aWRnZXQuVGV4dFZpZXcnKTtcbiAgICAgIGxldCB0ZXh0ID0gW107XG4gICAgICBmb3IgKGxldCB2aWV3IG9mIHRleHRWaWV3cykge1xuICAgICAgICB0ZXh0LnB1c2goYXdhaXQgZHJpdmVyLmdldFRleHQodmlldy5FTEVNRU5UKSk7XG4gICAgICB9XG4gICAgICB0ZXh0LnNob3VsZC5pbmNsdWRlKCdNb29kIHJpbmcnKTtcbiAgICB9KTtcblxuICAgIC8vIGdvIGJhY2sgdG8gdGhlIGFwcFxuICAgIGF3YWl0IGRyaXZlci5rZXlldmVudCg0KTtcbiAgICBhd2FpdCBkcml2ZXIuZ2V0VGV4dChlbC5FTEVNRU5UKS5zaG91bGQuYmVjb21lKCc6LXwnKTtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4ifQ==
