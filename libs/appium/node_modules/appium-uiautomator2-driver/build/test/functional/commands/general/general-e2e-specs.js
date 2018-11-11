'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _desired = require('../../desired');

var _helpersSession = require('../../helpers/session');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('general', function () {

  var driver = undefined;
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(_desired.APIDEMOS_CAPS));

        case 2:
          driver = context$2$0.sent;

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
          if (!driver) {
            context$2$0.next = 3;
            break;
          }

          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.quit());

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  describe('startActivity', function () {
    it('should launch a new package and activity', function callee$2$0() {
      var appPackage, appActivity, startAppPackage, startAppActivity, newAppPackage, newAppActivity;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.getCurrentPackage());

          case 2:
            appPackage = context$3$0.sent;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.getCurrentActivity());

          case 5:
            appActivity = context$3$0.sent;

            appPackage.should.equal('io.appium.android.apis');
            appActivity.should.equal('.ApiDemos');

            startAppPackage = 'io.appium.android.apis';
            startAppActivity = '.view.SplitTouchView';
            context$3$0.next = 12;
            return _regeneratorRuntime.awrap(driver.startActivity({ appPackage: startAppPackage, appActivity: startAppActivity }));

          case 12:
            context$3$0.next = 14;
            return _regeneratorRuntime.awrap(driver.getCurrentPackage());

          case 14:
            newAppPackage = context$3$0.sent;
            context$3$0.next = 17;
            return _regeneratorRuntime.awrap(driver.getCurrentActivity());

          case 17:
            newAppActivity = context$3$0.sent;

            newAppPackage.should.equal(startAppPackage);
            newAppActivity.should.equal(startAppActivity);

          case 20:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should be able to launch activity with custom intent parameter category', function callee$2$0() {
      var startAppPackage, startAppActivity, startIntentCategory, appActivity;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            startAppPackage = 'io.appium.android.apis';
            startAppActivity = 'io.appium.android.apis.app.HelloWorld';
            startIntentCategory = 'appium.android.intent.category.SAMPLE_CODE';
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.startActivity({ appPackage: startAppPackage, appActivity: startAppActivity, intentCategory: startIntentCategory }));

          case 5:
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(driver.getCurrentActivity());

          case 7:
            appActivity = context$3$0.sent;

            appActivity.should.include('HelloWorld');

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should be able to launch activity with dontStopAppOnReset = true', function callee$2$0() {
      var startAppPackage, startAppActivity, appPackage, appActivity;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            startAppPackage = 'io.appium.android.apis';
            startAppActivity = '.os.MorseCode';
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.startActivity({ appPackage: startAppPackage, appActivity: startAppActivity }));

          case 4:
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(driver.getCurrentPackage());

          case 6:
            appPackage = context$3$0.sent;
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(driver.getCurrentActivity());

          case 9:
            appActivity = context$3$0.sent;

            appPackage.should.equal(startAppPackage);
            appActivity.should.equal(startAppActivity);

          case 12:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should be able to launch activity with dontStopAppOnReset = false', function callee$2$0() {
      var startAppPackage, startAppActivity, appPackage, appActivity;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            startAppPackage = 'io.appium.android.apis';
            startAppActivity = '.os.MorseCode';
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.startActivity({ appPackage: startAppPackage, appActivity: startAppActivity }));

          case 4:
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(driver.getCurrentPackage());

          case 6:
            appPackage = context$3$0.sent;
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(driver.getCurrentActivity());

          case 9:
            appActivity = context$3$0.sent;

            appPackage.should.equal(startAppPackage);
            appActivity.should.equal(startAppActivity);

          case 12:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9nZW5lcmFsL2dlbmVyYWwtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7dUJBQ2YsZUFBZTs7OEJBQ2xCLHVCQUF1Qjs7QUFFbEQsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixRQUFRLENBQUMsU0FBUyxFQUFFLFlBQVk7O0FBRTlCLE1BQUksTUFBTSxZQUFBLENBQUM7QUFDWCxRQUFNLENBQUM7Ozs7OzJDQUNVLHVEQUF5Qjs7O0FBQXhDLGdCQUFNOzs7Ozs7O0dBQ1AsQ0FBQyxDQUFDO0FBQ0gsT0FBSyxDQUFDOzs7O2VBQ0EsTUFBTTs7Ozs7OzJDQUNGLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Ozs7Ozs7R0FFdEIsQ0FBQyxDQUFDOztBQUVILFVBQVEsQ0FBQyxlQUFlLEVBQUUsWUFBWTtBQUNwQyxNQUFFLENBQUMsMENBQTBDLEVBQUU7VUFDekMsVUFBVSxFQUNWLFdBQVcsRUFJWCxlQUFlLEVBQ2YsZ0JBQWdCLEVBSWhCLGFBQWEsRUFDYixjQUFjOzs7Ozs2Q0FYTSxNQUFNLENBQUMsaUJBQWlCLEVBQUU7OztBQUE5QyxzQkFBVTs7NkNBQ1csTUFBTSxDQUFDLGtCQUFrQixFQUFFOzs7QUFBaEQsdUJBQVc7O0FBQ2Ysc0JBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDbEQsdUJBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDOztBQUVsQywyQkFBZSxHQUFHLHdCQUF3QjtBQUMxQyw0QkFBZ0IsR0FBRyxzQkFBc0I7OzZDQUV2QyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUMsVUFBVSxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUMsQ0FBQzs7Ozs2Q0FFN0QsTUFBTSxDQUFDLGlCQUFpQixFQUFFOzs7QUFBakQseUJBQWE7OzZDQUNXLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRTs7O0FBQW5ELDBCQUFjOztBQUNsQix5QkFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDNUMsMEJBQWMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7Ozs7Ozs7S0FDL0MsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLHlFQUF5RSxFQUFFO1VBQ3hFLGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIsbUJBQW1CLEVBSW5CLFdBQVc7Ozs7QUFOWCwyQkFBZSxHQUFHLHdCQUF3QjtBQUMxQyw0QkFBZ0IsR0FBRyx1Q0FBdUM7QUFDMUQsK0JBQW1CLEdBQUcsNENBQTRDOzs2Q0FFaEUsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFDLFVBQVUsRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxtQkFBbUIsRUFBQyxDQUFDOzs7OzZDQUVwRyxNQUFNLENBQUMsa0JBQWtCLEVBQUU7OztBQUFoRCx1QkFBVzs7QUFDZix1QkFBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7Ozs7Ozs7S0FDMUMsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLGtFQUFrRSxFQUFFO1VBQ2pFLGVBQWUsRUFDZixnQkFBZ0IsRUFHaEIsVUFBVSxFQUNWLFdBQVc7Ozs7QUFMWCwyQkFBZSxHQUFHLHdCQUF3QjtBQUMxQyw0QkFBZ0IsR0FBRyxlQUFlOzs2Q0FDaEMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFDLFVBQVUsRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFDLENBQUM7Ozs7NkNBRWhFLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRTs7O0FBQTlDLHNCQUFVOzs2Q0FDVyxNQUFNLENBQUMsa0JBQWtCLEVBQUU7OztBQUFoRCx1QkFBVzs7QUFDZixzQkFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDekMsdUJBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7Ozs7Ozs7S0FDNUMsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLG1FQUFtRSxFQUFFO1VBQ2xFLGVBQWUsRUFDZixnQkFBZ0IsRUFHaEIsVUFBVSxFQUNWLFdBQVc7Ozs7QUFMWCwyQkFBZSxHQUFHLHdCQUF3QjtBQUMxQyw0QkFBZ0IsR0FBRyxlQUFlOzs2Q0FDaEMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFDLFVBQVUsRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFDLENBQUM7Ozs7NkNBRWpFLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRTs7O0FBQTdDLHNCQUFVOzs2Q0FDVSxNQUFNLENBQUMsa0JBQWtCLEVBQUU7OztBQUEvQyx1QkFBVzs7QUFDZixzQkFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDekMsdUJBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7Ozs7Ozs7S0FDNUMsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9nZW5lcmFsL2dlbmVyYWwtZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgeyBBUElERU1PU19DQVBTIH0gZnJvbSAnLi4vLi4vZGVzaXJlZCc7XG5pbXBvcnQgeyBpbml0RHJpdmVyIH0gZnJvbSAnLi4vLi4vaGVscGVycy9zZXNzaW9uJztcblxuY2hhaS5zaG91bGQoKTtcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcblxuZGVzY3JpYmUoJ2dlbmVyYWwnLCBmdW5jdGlvbiAoKSB7XG5cbiAgbGV0IGRyaXZlcjtcbiAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBkcml2ZXIgPSBhd2FpdCBpbml0RHJpdmVyKEFQSURFTU9TX0NBUFMpO1xuICB9KTtcbiAgYWZ0ZXIoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGlmIChkcml2ZXIpIHtcbiAgICAgIGF3YWl0IGRyaXZlci5xdWl0KCk7XG4gICAgfVxuICB9KTtcblxuICBkZXNjcmliZSgnc3RhcnRBY3Rpdml0eScsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIGxhdW5jaCBhIG5ldyBwYWNrYWdlIGFuZCBhY3Rpdml0eScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBhcHBQYWNrYWdlID0gIGF3YWl0IGRyaXZlci5nZXRDdXJyZW50UGFja2FnZSgpO1xuICAgICAgbGV0IGFwcEFjdGl2aXR5ID0gIGF3YWl0IGRyaXZlci5nZXRDdXJyZW50QWN0aXZpdHkoKTtcbiAgICAgIGFwcFBhY2thZ2Uuc2hvdWxkLmVxdWFsKCdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJyk7XG4gICAgICBhcHBBY3Rpdml0eS5zaG91bGQuZXF1YWwoJy5BcGlEZW1vcycpO1xuXG4gICAgICBsZXQgc3RhcnRBcHBQYWNrYWdlID0gJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnO1xuICAgICAgbGV0IHN0YXJ0QXBwQWN0aXZpdHkgPSAnLnZpZXcuU3BsaXRUb3VjaFZpZXcnO1xuXG4gICAgICBhd2FpdCBkcml2ZXIuc3RhcnRBY3Rpdml0eSh7YXBwUGFja2FnZTogc3RhcnRBcHBQYWNrYWdlLCBhcHBBY3Rpdml0eTogc3RhcnRBcHBBY3Rpdml0eX0pO1xuXG4gICAgICBsZXQgbmV3QXBwUGFja2FnZSA9ICBhd2FpdCBkcml2ZXIuZ2V0Q3VycmVudFBhY2thZ2UoKTtcbiAgICAgIGxldCBuZXdBcHBBY3Rpdml0eSA9ICBhd2FpdCBkcml2ZXIuZ2V0Q3VycmVudEFjdGl2aXR5KCk7XG4gICAgICBuZXdBcHBQYWNrYWdlLnNob3VsZC5lcXVhbChzdGFydEFwcFBhY2thZ2UpO1xuICAgICAgbmV3QXBwQWN0aXZpdHkuc2hvdWxkLmVxdWFsKHN0YXJ0QXBwQWN0aXZpdHkpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byBsYXVuY2ggYWN0aXZpdHkgd2l0aCBjdXN0b20gaW50ZW50IHBhcmFtZXRlciBjYXRlZ29yeScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBzdGFydEFwcFBhY2thZ2UgPSAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcyc7XG4gICAgICBsZXQgc3RhcnRBcHBBY3Rpdml0eSA9ICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzLmFwcC5IZWxsb1dvcmxkJztcbiAgICAgIGxldCBzdGFydEludGVudENhdGVnb3J5ID0gJ2FwcGl1bS5hbmRyb2lkLmludGVudC5jYXRlZ29yeS5TQU1QTEVfQ09ERSc7XG5cbiAgICAgIGF3YWl0IGRyaXZlci5zdGFydEFjdGl2aXR5KHthcHBQYWNrYWdlOiBzdGFydEFwcFBhY2thZ2UsIGFwcEFjdGl2aXR5OiBzdGFydEFwcEFjdGl2aXR5LCBpbnRlbnRDYXRlZ29yeTogc3RhcnRJbnRlbnRDYXRlZ29yeX0pO1xuXG4gICAgICBsZXQgYXBwQWN0aXZpdHkgPSAgYXdhaXQgZHJpdmVyLmdldEN1cnJlbnRBY3Rpdml0eSgpO1xuICAgICAgYXBwQWN0aXZpdHkuc2hvdWxkLmluY2x1ZGUoJ0hlbGxvV29ybGQnKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gbGF1bmNoIGFjdGl2aXR5IHdpdGggZG9udFN0b3BBcHBPblJlc2V0ID0gdHJ1ZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBzdGFydEFwcFBhY2thZ2UgPSAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcyc7XG4gICAgICBsZXQgc3RhcnRBcHBBY3Rpdml0eSA9ICcub3MuTW9yc2VDb2RlJztcbiAgICAgIGF3YWl0IGRyaXZlci5zdGFydEFjdGl2aXR5KHthcHBQYWNrYWdlOiBzdGFydEFwcFBhY2thZ2UsIGFwcEFjdGl2aXR5OiBzdGFydEFwcEFjdGl2aXR5fSk7XG5cbiAgICAgIGxldCBhcHBQYWNrYWdlID0gIGF3YWl0IGRyaXZlci5nZXRDdXJyZW50UGFja2FnZSgpO1xuICAgICAgbGV0IGFwcEFjdGl2aXR5ID0gIGF3YWl0IGRyaXZlci5nZXRDdXJyZW50QWN0aXZpdHkoKTtcbiAgICAgIGFwcFBhY2thZ2Uuc2hvdWxkLmVxdWFsKHN0YXJ0QXBwUGFja2FnZSk7XG4gICAgICBhcHBBY3Rpdml0eS5zaG91bGQuZXF1YWwoc3RhcnRBcHBBY3Rpdml0eSk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGxhdW5jaCBhY3Rpdml0eSB3aXRoIGRvbnRTdG9wQXBwT25SZXNldCA9IGZhbHNlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IHN0YXJ0QXBwUGFja2FnZSA9ICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJztcbiAgICAgIGxldCBzdGFydEFwcEFjdGl2aXR5ID0gJy5vcy5Nb3JzZUNvZGUnO1xuICAgICAgYXdhaXQgZHJpdmVyLnN0YXJ0QWN0aXZpdHkoe2FwcFBhY2thZ2U6IHN0YXJ0QXBwUGFja2FnZSwgYXBwQWN0aXZpdHk6IHN0YXJ0QXBwQWN0aXZpdHl9KTtcblxuICAgICAgbGV0IGFwcFBhY2thZ2UgPSBhd2FpdCBkcml2ZXIuZ2V0Q3VycmVudFBhY2thZ2UoKTtcbiAgICAgIGxldCBhcHBBY3Rpdml0eSA9IGF3YWl0IGRyaXZlci5nZXRDdXJyZW50QWN0aXZpdHkoKTtcbiAgICAgIGFwcFBhY2thZ2Uuc2hvdWxkLmVxdWFsKHN0YXJ0QXBwUGFja2FnZSk7XG4gICAgICBhcHBBY3Rpdml0eS5zaG91bGQuZXF1YWwoc3RhcnRBcHBBY3Rpdml0eSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uIn0=
