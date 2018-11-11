'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../../../..');

var _2 = _interopRequireDefault(_);

var _desired = require('../../desired');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('general', function () {
  var driver = undefined;
  describe('startActivity', function () {
    before(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _2['default']();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.createSession(_desired.DEFAULT_CAPS));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    after(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.deleteSession());

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('should launch a new package and activity', function callee$2$0() {
      var _ref, appPackage, appActivity, startAppPackage, startAppActivity, _ref2, newAppPackage, newAppActivity;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.adb.getFocusedPackageAndActivity());

          case 2:
            _ref = context$3$0.sent;
            appPackage = _ref.appPackage;
            appActivity = _ref.appActivity;

            appPackage.should.equal('io.appium.android.apis');
            appActivity.should.equal('.ApiDemos');

            startAppPackage = 'io.appium.android.apis';
            startAppActivity = '.view.SplitTouchView';
            context$3$0.next = 11;
            return _regeneratorRuntime.awrap(driver.startActivity(startAppPackage, startAppActivity));

          case 11:
            context$3$0.next = 13;
            return _regeneratorRuntime.awrap(driver.adb.getFocusedPackageAndActivity());

          case 13:
            _ref2 = context$3$0.sent;
            newAppPackage = _ref2.appPackage;
            newAppActivity = _ref2.appActivity;

            newAppPackage.should.equal(startAppPackage);
            newAppActivity.should.equal(startAppActivity);

          case 18:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should be able to launch activity with custom intent parameter category', function callee$2$0() {
      var startAppPackage, startAppActivity, startIntentCategory, _ref3, appActivity;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            startAppPackage = 'io.appium.android.apis';
            startAppActivity = 'io.appium.android.apis.app.HelloWorld';
            startIntentCategory = 'appium.android.intent.category.SAMPLE_CODE';
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.startActivity(startAppPackage, startAppActivity, undefined, undefined, startIntentCategory));

          case 5:
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(driver.adb.getFocusedPackageAndActivity());

          case 7:
            _ref3 = context$3$0.sent;
            appActivity = _ref3.appActivity;

            appActivity.should.include('HelloWorld');

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should be able to launch activity with dontStopAppOnReset = true', function callee$2$0() {
      var startAppPackage, startAppActivity, _ref4, appPackage, appActivity;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            startAppPackage = 'io.appium.android.apis';
            startAppActivity = '.os.MorseCode';
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.startActivity(startAppPackage, startAppActivity, startAppPackage, startAppActivity, undefined, undefined, undefined, undefined, true));

          case 4:
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(driver.adb.getFocusedPackageAndActivity());

          case 6:
            _ref4 = context$3$0.sent;
            appPackage = _ref4.appPackage;
            appActivity = _ref4.appActivity;

            appPackage.should.equal(startAppPackage);
            appActivity.should.equal(startAppActivity);

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should be able to launch activity with dontStopAppOnReset = false', function callee$2$0() {
      var startAppPackage, startAppActivity, _ref5, appPackage, appActivity;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            startAppPackage = 'io.appium.android.apis';
            startAppActivity = '.os.MorseCode';
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.startActivity(startAppPackage, startAppActivity, startAppPackage, startAppActivity, undefined, undefined, undefined, undefined, false));

          case 4:
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(driver.adb.getFocusedPackageAndActivity());

          case 6:
            _ref5 = context$3$0.sent;
            appPackage = _ref5.appPackage;
            appActivity = _ref5.appActivity;

            appPackage.should.equal(startAppPackage);
            appActivity.should.equal(startAppActivity);

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('getStrings', function () {
    before(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _2['default']();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.createSession(_desired.CONTACT_MANAGER_CAPS));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    after(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.deleteSession());

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('should return app strings', function callee$2$0() {
      var strings;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.getStrings('en'));

          case 2:
            strings = context$3$0.sent;

            strings.save.should.equal('Save');

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should return app strings for the device language', function callee$2$0() {
      var strings;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.getStrings());

          case 2:
            strings = context$3$0.sent;

            strings.save.should.equal('Save');

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9iYXNpYy9nZW5lcmFsLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O2dCQUNuQixhQUFhOzs7O3VCQUNZLGVBQWU7O0FBR2xFLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsUUFBUSxDQUFDLFNBQVMsRUFBRSxZQUFZO0FBQzlCLE1BQUksTUFBTSxZQUFBLENBQUM7QUFDWCxVQUFRLENBQUMsZUFBZSxFQUFFLFlBQVk7QUFDcEMsVUFBTSxDQUFDOzs7O0FBQ0wsa0JBQU0sR0FBRyxtQkFBbUIsQ0FBQzs7NkNBQ3ZCLE1BQU0sQ0FBQyxhQUFhLHVCQUFjOzs7Ozs7O0tBQ3pDLENBQUMsQ0FBQztBQUNILFNBQUssQ0FBQzs7Ozs7NkNBQ0UsTUFBTSxDQUFDLGFBQWEsRUFBRTs7Ozs7OztLQUM3QixDQUFDLENBQUM7O0FBRUgsTUFBRSxDQUFDLDBDQUEwQyxFQUFFO2dCQUN4QyxVQUFVLEVBQUUsV0FBVyxFQUl4QixlQUFlLEVBQ2YsZ0JBQWdCLFNBSUgsYUFBYSxFQUFlLGNBQWM7Ozs7Ozs2Q0FUckIsTUFBTSxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRTs7OztBQUExRSxzQkFBVSxRQUFWLFVBQVU7QUFBRSx1QkFBVyxRQUFYLFdBQVc7O0FBQzVCLHNCQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQ2xELHVCQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQzs7QUFFbEMsMkJBQWUsR0FBRyx3QkFBd0I7QUFDMUMsNEJBQWdCLEdBQUcsc0JBQXNCOzs2Q0FFdkMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxlQUFlLEVBQUUsZ0JBQWdCLENBQUM7Ozs7NkNBRVEsTUFBTSxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIs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Q0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7OztLQUNuQyxDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsbURBQW1ELEVBQUU7VUFDbEQsT0FBTzs7Ozs7NkNBQVMsTUFBTSxDQUFDLFVBQVUsRUFBRTs7O0FBQW5DLG1CQUFPOztBQUNYLG1CQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7Ozs7S0FDbkMsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9iYXNpYy9nZW5lcmFsLWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4vLi4vLi4nO1xuaW1wb3J0IHsgREVGQVVMVF9DQVBTLCBDT05UQUNUX01BTkFHRVJfQ0FQUyB9IGZyb20gJy4uLy4uL2Rlc2lyZWQnO1xuXG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmRlc2NyaWJlKCdnZW5lcmFsJywgZnVuY3Rpb24gKCkge1xuICBsZXQgZHJpdmVyO1xuICBkZXNjcmliZSgnc3RhcnRBY3Rpdml0eScsIGZ1bmN0aW9uICgpIHtcbiAgICBiZWZvcmUoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKERFRkFVTFRfQ0FQUyk7XG4gICAgfSk7XG4gICAgYWZ0ZXIoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbGF1bmNoIGEgbmV3IHBhY2thZ2UgYW5kIGFjdGl2aXR5JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IHthcHBQYWNrYWdlLCBhcHBBY3Rpdml0eX0gPSBhd2FpdCBkcml2ZXIuYWRiLmdldEZvY3VzZWRQYWNrYWdlQW5kQWN0aXZpdHkoKTtcbiAgICAgIGFwcFBhY2thZ2Uuc2hvdWxkLmVxdWFsKCdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJyk7XG4gICAgICBhcHBBY3Rpdml0eS5zaG91bGQuZXF1YWwoJy5BcGlEZW1vcycpO1xuXG4gICAgICBsZXQgc3RhcnRBcHBQYWNrYWdlID0gJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnO1xuICAgICAgbGV0IHN0YXJ0QXBwQWN0aXZpdHkgPSAnLnZpZXcuU3BsaXRUb3VjaFZpZXcnO1xuXG4gICAgICBhd2FpdCBkcml2ZXIuc3RhcnRBY3Rpdml0eShzdGFydEFwcFBhY2thZ2UsIHN0YXJ0QXBwQWN0aXZpdHkpO1xuXG4gICAgICBsZXQge2FwcFBhY2thZ2U6IG5ld0FwcFBhY2thZ2UsIGFwcEFjdGl2aXR5OiBuZXdBcHBBY3Rpdml0eX0gPSBhd2FpdCBkcml2ZXIuYWRiLmdldEZvY3VzZWRQYWNrYWdlQW5kQWN0aXZpdHkoKTtcbiAgICAgIG5ld0FwcFBhY2thZ2Uuc2hvdWxkLmVxdWFsKHN0YXJ0QXBwUGFja2FnZSk7XG4gICAgICBuZXdBcHBBY3Rpdml0eS5zaG91bGQuZXF1YWwoc3RhcnRBcHBBY3Rpdml0eSk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGxhdW5jaCBhY3Rpdml0eSB3aXRoIGN1c3RvbSBpbnRlbnQgcGFyYW1ldGVyIGNhdGVnb3J5JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IHN0YXJ0QXBwUGFja2FnZSA9ICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJztcbiAgICAgIGxldCBzdGFydEFwcEFjdGl2aXR5ID0gJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMuYXBwLkhlbGxvV29ybGQnO1xuICAgICAgbGV0IHN0YXJ0SW50ZW50Q2F0ZWdvcnkgPSAnYXBwaXVtLmFuZHJvaWQuaW50ZW50LmNhdGVnb3J5LlNBTVBMRV9DT0RFJztcblxuICAgICAgYXdhaXQgZHJpdmVyLnN0YXJ0QWN0aXZpdHkoc3RhcnRBcHBQYWNrYWdlLCBzdGFydEFwcEFjdGl2aXR5LCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgc3RhcnRJbnRlbnRDYXRlZ29yeSk7XG5cbiAgICAgIGxldCB7YXBwQWN0aXZpdHl9ID0gYXdhaXQgZHJpdmVyLmFkYi5nZXRGb2N1c2VkUGFja2FnZUFuZEFjdGl2aXR5KCk7XG4gICAgICBhcHBBY3Rpdml0eS5zaG91bGQuaW5jbHVkZSgnSGVsbG9Xb3JsZCcpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byBsYXVuY2ggYWN0aXZpdHkgd2l0aCBkb250U3RvcEFwcE9uUmVzZXQgPSB0cnVlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IHN0YXJ0QXBwUGFja2FnZSA9ICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJztcbiAgICAgIGxldCBzdGFydEFwcEFjdGl2aXR5ID0gJy5vcy5Nb3JzZUNvZGUnO1xuICAgICAgYXdhaXQgZHJpdmVyLnN0YXJ0QWN0aXZpdHkoc3RhcnRBcHBQYWNrYWdlLCBzdGFydEFwcEFjdGl2aXR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRBcHBQYWNrYWdlLCBzdGFydEFwcEFjdGl2aXR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkLCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQsIHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWUpO1xuICAgICAgbGV0IHthcHBQYWNrYWdlLCBhcHBBY3Rpdml0eX0gPSBhd2FpdCBkcml2ZXIuYWRiLmdldEZvY3VzZWRQYWNrYWdlQW5kQWN0aXZpdHkoKTtcbiAgICAgIGFwcFBhY2thZ2Uuc2hvdWxkLmVxdWFsKHN0YXJ0QXBwUGFja2FnZSk7XG4gICAgICBhcHBBY3Rpdml0eS5zaG91bGQuZXF1YWwoc3RhcnRBcHBBY3Rpdml0eSk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGxhdW5jaCBhY3Rpdml0eSB3aXRoIGRvbnRTdG9wQXBwT25SZXNldCA9IGZhbHNlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IHN0YXJ0QXBwUGFja2FnZSA9ICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJztcbiAgICAgIGxldCBzdGFydEFwcEFjdGl2aXR5ID0gJy5vcy5Nb3JzZUNvZGUnO1xuICAgICAgYXdhaXQgZHJpdmVyLnN0YXJ0QWN0aXZpdHkoc3RhcnRBcHBQYWNrYWdlLCBzdGFydEFwcEFjdGl2aXR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRBcHBQYWNrYWdlLCBzdGFydEFwcEFjdGl2aXR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkLCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQsIHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlKTtcbiAgICAgIGxldCB7YXBwUGFja2FnZSwgYXBwQWN0aXZpdHl9ID0gYXdhaXQgZHJpdmVyLmFkYi5nZXRGb2N1c2VkUGFja2FnZUFuZEFjdGl2aXR5KCk7XG4gICAgICBhcHBQYWNrYWdlLnNob3VsZC5lcXVhbChzdGFydEFwcFBhY2thZ2UpO1xuICAgICAgYXBwQWN0aXZpdHkuc2hvdWxkLmVxdWFsKHN0YXJ0QXBwQWN0aXZpdHkpO1xuICAgIH0pO1xuICB9KTtcbiAgZGVzY3JpYmUoJ2dldFN0cmluZ3MnLCBmdW5jdGlvbiAoKSB7XG4gICAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gICAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihDT05UQUNUX01BTkFHRVJfQ0FQUyk7XG4gICAgfSk7XG4gICAgYWZ0ZXIoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGFwcCBzdHJpbmdzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IHN0cmluZ3MgPSBhd2FpdCBkcml2ZXIuZ2V0U3RyaW5ncygnZW4nKTtcbiAgICAgIHN0cmluZ3Muc2F2ZS5zaG91bGQuZXF1YWwoJ1NhdmUnKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHJldHVybiBhcHAgc3RyaW5ncyBmb3IgdGhlIGRldmljZSBsYW5ndWFnZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBzdHJpbmdzID0gYXdhaXQgZHJpdmVyLmdldFN0cmluZ3MoKTtcbiAgICAgIHN0cmluZ3Muc2F2ZS5zaG91bGQuZXF1YWwoJ1NhdmUnKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vLi4ifQ==
