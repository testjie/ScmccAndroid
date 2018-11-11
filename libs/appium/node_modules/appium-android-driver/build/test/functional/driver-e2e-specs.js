'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var _2 = require('../..');

var _3 = _interopRequireDefault(_2);

var _desired = require('./desired');

var _desired2 = _interopRequireDefault(_desired);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);
var expect = _chai2['default'].expect;

var defaultCaps = _lodash2['default'].defaults({
  androidInstallTimeout: 90000
}, _desired2['default']);

describe('createSession', function () {
  var driver = undefined;
  before(function () {
    driver = new _3['default']();
  });
  afterEach(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.deleteSession());

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  function getPackageAndActivity(driver) {
    var appPackage, appActivity;
    return _regeneratorRuntime.async(function getPackageAndActivity$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.getCurrentPackage());

        case 2:
          appPackage = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.getCurrentActivity());

        case 5:
          appActivity = context$2$0.sent;
          return context$2$0.abrupt('return', { appPackage: appPackage, appActivity: appActivity });

        case 7:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  }

  it('should start android session focusing on default pkg and act', function callee$1$0() {
    var _ref, appPackage, appActivity;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.createSession(defaultCaps));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(getPackageAndActivity(driver));

        case 4:
          _ref = context$2$0.sent;
          appPackage = _ref.appPackage;
          appActivity = _ref.appActivity;

          appPackage.should.equal('io.appium.android.apis');
          appActivity.should.equal('.ApiDemos');

        case 9:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should start android session focusing on custom pkg and act', function callee$1$0() {
    var caps, _ref2, appPackage, appActivity;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.appPackage = 'io.appium.android.apis';
          caps.appActivity = '.view.SplitTouchView';
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.createSession(caps));

        case 5:
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(getPackageAndActivity(driver));

        case 7:
          _ref2 = context$2$0.sent;
          appPackage = _ref2.appPackage;
          appActivity = _ref2.appActivity;

          appPackage.should.equal(caps.appPackage);
          appActivity.should.equal(caps.appActivity);

        case 12:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should error out for not apk extention', function callee$1$0() {
    var caps;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.app = 'foo';
          caps.appPackage = 'io.appium.android.apis';
          caps.appActivity = '.view.SplitTouchView';
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.createSession(caps).should.eventually.be.rejectedWith(/does not exist or is not accessible/));

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should error out if neither an app or a browser is defined', function callee$1$0() {
    var caps;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.app = '';
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.createSession(caps).should.eventually.be.rejectedWith(/include/));

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should error out for invalid app path', function callee$1$0() {
    var caps;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.app = 'foo.apk';
          caps.appPackage = 'io.appium.android.apis';
          caps.appActivity = '.view.SplitTouchView';
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.createSession(caps).should.eventually.be.rejectedWith(/Could not find/));

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should be able to start session without launching or installing app', function callee$1$0() {
    var caps, _ref3, appPackage, appActivity;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.appPackage = 'io.appium.android.apis';
          caps.appActivity = '.view.SplitTouchView';
          caps.autoLaunch = false;
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.createSession(caps));

        case 6:
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(getPackageAndActivity(driver));

        case 8:
          _ref3 = context$2$0.sent;
          appPackage = _ref3.appPackage;
          appActivity = _ref3.appActivity;

          expect(appPackage).to.not.equal(caps.appPackage);
          expect(appActivity).to.not.equal(caps.appActivity);

        case 13:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should be able to launch activity with custom intent parameter category', function callee$1$0() {
    var caps, appActivity;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.appPackage = 'io.appium.android.apis';
          caps.appActivity = 'io.appium.android.apis.app.HelloWorld';
          caps.intentCategory = 'appium.android.intent.category.SAMPLE_CODE';
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.createSession(caps));

        case 6:
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(driver.getCurrentActivity());

        case 8:
          appActivity = context$2$0.sent;

          appActivity.should.include('HelloWorld');

        case 10:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should be able to load an app via package', function callee$1$0() {
    var caps, appPackage;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.app = '';
          caps.appPackage = 'io.appium.android.apis';
          caps.appActivity = '.ApiDemos';
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.createSession(caps));

        case 6:
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(driver.getCurrentPackage());

        case 8:
          appPackage = context$2$0.sent;

          appPackage.should.include('io.appium.android.apis');

        case 10:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should error out if package is not on the device', function callee$1$0() {
    var caps;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.app = '';
          caps.appPackage = 'sipa.diordna.muippa.oi';
          caps.appActivity = '.ApiDemos';
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.createSession(caps).should.eventually.be.rejectedWith(/Could not find/));

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should get updated capabilities', function callee$1$0() {
    var caps, serverCaps;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.appPackage = 'io.appium.android.apis';
          caps.appActivity = '.view.SplitTouchView';
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.createSession(caps));

        case 5:
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(driver.getSession());

        case 7:
          serverCaps = context$2$0.sent;

          serverCaps.takesScreenshot.should.exist;

        case 9:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should get device name, udid, model, manufacturer and screen size in session details', function callee$1$0() {
    var caps, session, serverCaps;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.appPackage = 'io.appium.android.apis';
          caps.appActivity = '.view.SplitTouchView';
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.createSession(caps));

        case 5:
          session = context$2$0.sent;

          session[1].deviceName.should.exist;
          session[1].deviceUDID.should.exist;

          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(driver.getSession());

        case 10:
          serverCaps = context$2$0.sent;

          serverCaps.deviceName.should.exist;
          serverCaps.deviceUDID.should.exist;
          serverCaps.deviceScreenSize.should.exist;
          serverCaps.deviceModel.should.exist;
          serverCaps.deviceManufacturer.should.exist;

        case 16:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should error out for activity that fails to load after app wait activity timeout', function callee$1$0() {
    var caps;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.appWaitActivity = 'non.existent.activity';
          caps.appWaitDuration = 1000; // 1 second
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.createSession(caps).should.eventually.be.rejectedWith(/never started/));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should be able to grant permissions', function callee$1$0() {
    var adb, apiLevel, caps;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          adb = new _appiumAdb2['default']();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(adb.getApiLevel());

        case 3:
          apiLevel = context$2$0.sent;

          if (!(apiLevel < 23)) {
            context$2$0.next = 6;
            break;
          }

          return context$2$0.abrupt('return', this.skip());

        case 6:
          caps = _Object$assign({}, defaultCaps);

          caps.appPackage = 'io.appium.android.apis';
          caps.appActivity = 'io.appium.android.apis.app.HelloWorld';
          caps.intentCategory = 'appium.android.intent.category.SAMPLE_CODE';
          caps.autoGrantPermissions = true;
          context$2$0.next = 13;
          return _regeneratorRuntime.awrap(driver.createSession(caps));

        case 13:
          context$2$0.next = 15;
          return _regeneratorRuntime.awrap(driver.adb.getGrantedPermissions('io.appium.android.apis'));

        case 15:
          context$2$0.t0 = context$2$0.sent;
          context$2$0.t1 = ['android.permission.RECEIVE_SMS'];
          expect(context$2$0.t0).to.include.members(context$2$0.t1);

        case 18:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  describe('W3C compliance', function () {
    it('should accept W3C parameters', function callee$2$0() {
      var _ref4, _ref42, sessionId, caps;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.createSession(null, null, {
              alwaysMatch: _Object$assign({}, defaultCaps),
              firstMatch: [{}]
            }));

          case 2:
            _ref4 = context$3$0.sent;
            _ref42 = _slicedToArray(_ref4, 2);
            sessionId = _ref42[0];
            caps = _ref42[1];

            sessionId.should.exist;
            caps.should.exist;

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});

describe('close', function () {
  var driver = undefined;
  before(function () {
    driver = new _3['default']();
  });
  afterEach(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.deleteSession());

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should close application', function callee$1$0() {
    var appPackage;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.createSession(defaultCaps));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.closeApp());

        case 4:
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.getCurrentPackage());

        case 6:
          appPackage = context$2$0.sent;

          if (appPackage) {
            appPackage.should.not.equal("io.appium.android.apis");
          }

        case 8:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});

// TODO: why is there no entry for 5.1?
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9kcml2ZXItZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O3NCQUMvQixRQUFROzs7O3lCQUNOLFlBQVk7Ozs7aUJBQ0YsT0FBTzs7Ozt1QkFDUixXQUFXOzs7O0FBR3BDLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQztBQUN6QixJQUFJLE1BQU0sR0FBRyxrQkFBSyxNQUFNLENBQUM7O0FBRXpCLElBQUksV0FBVyxHQUFHLG9CQUFFLFFBQVEsQ0FBQztBQUMzQix1QkFBcUIsRUFBRSxLQUFLO0NBQzdCLHVCQUFlLENBQUM7O0FBRWpCLFFBQVEsQ0FBQyxlQUFlLEVBQUUsWUFBWTtBQUNwQyxNQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsUUFBTSxDQUFDLFlBQVk7QUFDakIsVUFBTSxHQUFHLG1CQUFtQixDQUFDO0dBQzlCLENBQUMsQ0FBQztBQUNILFdBQVMsQ0FBQzs7Ozs7MkNBQ0YsTUFBTSxDQUFDLGFBQWEsRUFBRTs7Ozs7OztHQUM3QixDQUFDLENBQUM7O0FBRUgsV0FBZSxxQkFBcUIsQ0FBRSxNQUFNO1FBQ3RDLFVBQVUsRUFDVixXQUFXOzs7OzsyQ0FEUSxNQUFNLENBQUMsaUJBQWlCLEVBQUU7OztBQUE3QyxvQkFBVTs7MkNBQ1UsTUFBTSxDQUFDLGtCQUFrQixFQUFFOzs7QUFBL0MscUJBQVc7OENBQ1IsRUFBQyxVQUFVLEVBQVYsVUFBVSxFQUFFLFdBQVcsRUFBWCxXQUFXLEVBQUM7Ozs7Ozs7R0FDakM7O0FBRUQsSUFBRSxDQUFDLDhEQUE4RCxFQUFFO2NBRTVELFVBQVUsRUFBRSxXQUFXOzs7Ozs7MkNBRHRCLE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDOzs7OzJDQUNELHFCQUFxQixDQUFDLE1BQU0sQ0FBQzs7OztBQUE5RCxvQkFBVSxRQUFWLFVBQVU7QUFBRSxxQkFBVyxRQUFYLFdBQVc7O0FBQzVCLG9CQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQ2xELHFCQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQzs7Ozs7OztHQUN2QyxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsNkRBQTZELEVBQUU7UUFDNUQsSUFBSSxTQUlILFVBQVUsRUFBRSxXQUFXOzs7OztBQUp4QixjQUFJLEdBQUcsZUFBYyxFQUFFLEVBQUUsV0FBVyxDQUFDOztBQUN6QyxjQUFJLENBQUMsVUFBVSxHQUFHLHdCQUF3QixDQUFDO0FBQzNDLGNBQUksQ0FBQyxXQUFXLEdBQUcsc0JBQXNCLENBQUM7OzJDQUNwQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQzs7OzsyQ0FDTSxxQkFBcUIsQ0FBQyxNQUFNLENBQUM7Ozs7QUFBOUQsb0JBQVUsU0FBVixVQUFVO0FBQUUscUJBQVcsU0FBWCxXQUFXOztBQUM1QixvQkFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3pDLHFCQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Ozs7Ozs7R0FDNUMsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLHdDQUF3QyxFQUFFO1FBQ3ZDLElBQUk7Ozs7QUFBSixjQUFJLEdBQUcsZUFBYyxFQUFFLEVBQUUsV0FBVyxDQUFDOztBQUN6QyxjQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQztBQUNqQixjQUFJLENBQUMsVUFBVSxHQUFHLHdCQUF3QixDQUFDO0FBQzNDLGNBQUksQ0FBQyxXQUFXLEdBQUcsc0JBQXNCLENBQUM7OzJDQUNwQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxxQ0FBcUMsQ0FBQzs7Ozs7OztHQUMxRyxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsNERBQTRELEVBQUU7UUFDM0QsSUFBSTs7OztBQUFKLGNBQUksR0FBRyxlQUFjLEVBQUUsRUFBRSxXQUFXLENBQUM7O0FBQ3pDLGNBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDOzsyQ0FDUixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUM7Ozs7Ozs7R0FDOUUsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLHVDQUF1QyxFQUFFO1FBQ3RDLElBQUk7Ozs7QUFBSixjQUFJLEdBQUcsZUFBYyxFQUFFLEVBQUUsV0FBVyxDQUFDOztBQUN6QyxjQUFJLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQztBQUNyQixjQUFJLENBQUMsVUFBVSxHQUFHLHdCQUF3QixDQUFDO0FBQzNDLGNBQUksQ0FBQyxXQUFXLEdBQUcsc0JBQXNCLENBQUM7OzJDQUNwQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQzs7Ozs7OztHQUNyRixDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMscUVBQXFFLEVBQUU7UUFDcEUsSUFBSSxTQUtILFVBQVUsRUFBRSxXQUFXOzs7OztBQUx4QixjQUFJLEdBQUcsZUFBYyxFQUFFLEVBQUUsV0FBVyxDQUFDOztBQUN6QyxjQUFJLENBQUMsVUFBVSxHQUFHLHdCQUF3QixDQUFDO0FBQzNDLGNBQUksQ0FBQyxXQUFXLEdBQUcsc0JBQXNCLENBQUM7QUFDMUMsY0FBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7OzJDQUNsQixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQzs7OzsyQ0FDTSxxQkFBcUIsQ0FBQyxNQUFNLENBQUM7Ozs7QUFBOUQsb0JBQVUsU0FBVixVQUFVO0FBQUUscUJBQVcsU0FBWCxXQUFXOztBQUM1QixnQkFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNqRCxnQkFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzs7Ozs7OztHQUNwRCxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMseUVBQXlFLEVBQUU7UUFDeEUsSUFBSSxFQUtKLFdBQVc7Ozs7QUFMWCxjQUFJLEdBQUcsZUFBYyxFQUFFLEVBQUUsV0FBVyxDQUFDOztBQUN6QyxjQUFJLENBQUMsVUFBVSxHQUFHLHdCQUF3QixDQUFDO0FBQzNDLGNBQUksQ0FBQyxXQUFXLEdBQUcsdUNBQXVDLENBQUM7QUFDM0QsY0FBSSxDQUFDLGNBQWMsR0FBRyw0Q0FBNEMsQ0FBQzs7MkNBQzdELE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDOzs7OzJDQUNSLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRTs7O0FBQS9DLHFCQUFXOztBQUNmLHFCQUFXLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzs7Ozs7OztHQUMxQyxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsMkNBQTJDLEVBQUU7UUFDMUMsSUFBSSxFQUtKLFVBQVU7Ozs7QUFMVixjQUFJLEdBQUcsZUFBYyxFQUFFLEVBQUUsV0FBVyxDQUFDOztBQUN6QyxjQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUNkLGNBQUksQ0FBQyxVQUFVLEdBQUcsd0JBQXdCLENBQUM7QUFDM0MsY0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7OzJDQUN6QixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQzs7OzsyQ0FDVCxNQUFNLENBQUMsaUJBQWlCLEVBQUU7OztBQUE3QyxvQkFBVTs7QUFDZCxvQkFBVSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQzs7Ozs7OztHQUNyRCxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsa0RBQWtELEVBQUU7UUFDakQsSUFBSTs7OztBQUFKLGNBQUksR0FBRyxlQUFjLEVBQUUsRUFBRSxXQUFXLENBQUM7O0FBQ3pDLGNBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ2QsY0FBSSxDQUFDLFVBQVUsR0FBRyx3QkFBd0IsQ0FBQztBQUMzQyxjQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQzs7MkNBQ3pCLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDOzs7Ozs7O0dBQ3JGLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyxpQ0FBaUMsRUFBRTtRQUNoQyxJQUFJLEVBSUosVUFBVTs7OztBQUpWLGNBQUksR0FBRyxlQUFjLEVBQUUsRUFBRSxXQUFXLENBQUM7O0FBQ3pDLGNBQUksQ0FBQyxVQUFVLEdBQUcsd0JBQXdCLENBQUM7QUFDM0MsY0FBSSxDQUFDLFdBQVcsR0FBRyxzQkFBc0IsQ0FBQzs7MkNBQ3BDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDOzs7OzJDQUNULE1BQU0sQ0FBQyxVQUFVLEVBQUU7OztBQUF0QyxvQkFBVTs7QUFDZCxvQkFBVSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDOzs7Ozs7O0dBQ3pDLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyxzRkFBc0YsRUFBRTtRQUNyRixJQUFJLEVBR0osT0FBTyxFQUlQLFVBQVU7Ozs7QUFQVixjQUFJLEdBQUcsZUFBYyxFQUFFLEVBQUUsV0FBVyxDQUFDOztBQUN6QyxjQUFJLENBQUMsVUFBVSxHQUFHLHdCQUF3QixDQUFDO0FBQzNDLGNBQUksQ0FBQyxXQUFXLEdBQUcsc0JBQXNCLENBQUM7OzJDQUN0QixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQzs7O0FBQTFDLGlCQUFPOztBQUNYLGlCQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDbkMsaUJBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzs7OzJDQUVaLE1BQU0sQ0FBQyxVQUFVLEVBQUU7OztBQUF0QyxvQkFBVTs7QUFDZCxvQkFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ25DLG9CQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDbkMsb0JBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ3pDLG9CQUFVLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDcEMsb0JBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDOzs7Ozs7O0dBQzVDLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyxrRkFBa0YsRUFBRTtRQUNqRixJQUFJOzs7O0FBQUosY0FBSSxHQUFHLGVBQWMsRUFBRSxFQUFFLFdBQVcsQ0FBQzs7QUFDekMsY0FBSSxDQUFDLGVBQWUsR0FBRyx1QkFBdUIsQ0FBQztBQUMvQyxjQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQzs7MkNBQ3RCLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQzs7Ozs7OztHQUNwRixDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMscUNBQXFDLEVBQUU7UUFFcEMsR0FBRyxFQUNILFFBQVEsRUFJUixJQUFJOzs7O0FBTEosYUFBRyxHQUFHLDRCQUFTOzsyQ0FDRSxHQUFHLENBQUMsV0FBVyxFQUFFOzs7QUFBbEMsa0JBQVE7O2dCQUNSLFFBQVEsR0FBRyxFQUFFLENBQUE7Ozs7OzhDQUNSLElBQUksQ0FBQyxJQUFJLEVBQUU7OztBQUVoQixjQUFJLEdBQUcsZUFBYyxFQUFFLEVBQUUsV0FBVyxDQUFDOztBQUN6QyxjQUFJLENBQUMsVUFBVSxHQUFHLHdCQUF3QixDQUFDO0FBQzNDLGNBQUksQ0FBQyxXQUFXLEdBQUcsdUNBQXVDLENBQUM7QUFDM0QsY0FBSSxDQUFDLGNBQWMsR0FBRyw0Q0FBNEMsQ0FBQztBQUNuRSxjQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDOzsyQ0FDM0IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7Ozs7MkNBQ25CLE1BQU0sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsd0JBQXdCLENBQUM7Ozs7MkJBQXFCLENBQUMsZ0NBQWdDLENBQUM7QUFBOUgsZ0JBQU0saUJBQW1FLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTzs7Ozs7OztHQUM1RixDQUFDLENBQUM7QUFDSCxVQUFRLENBQUMsZ0JBQWdCLEVBQUUsWUFBWTtBQUNyQyxNQUFFLENBQUMsOEJBQThCLEVBQUU7eUJBQzFCLFNBQVMsRUFBRSxJQUFJOzs7Ozs7NkNBQVUsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFO0FBQy9ELHlCQUFXLEVBQUUsZUFBYyxFQUFFLEVBQUUsV0FBVyxDQUFDO0FBQzNDLHdCQUFVLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDakIsQ0FBQzs7Ozs7QUFISyxxQkFBUztBQUFFLGdCQUFJOztBQUl0QixxQkFBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDdkIsZ0JBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDOzs7Ozs7O0tBQ25CLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQzs7QUFFSCxRQUFRLENBQUMsT0FBTyxFQUFFLFlBQVk7QUFDNUIsTUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLFFBQU0sQ0FBQyxZQUFZO0FBQ2pCLFVBQU0sR0FBRyxtQkFBbUIsQ0FBQztHQUM5QixDQUFDLENBQUM7QUFDSCxXQUFTLENBQUM7Ozs7OzJDQUNGLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7R0FDN0IsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLDBCQUEwQixFQUFFO1FBR3pCLFVBQVU7Ozs7OzJDQUZSLE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDOzs7OzJDQUNqQyxNQUFNLENBQUMsUUFBUSxFQUFFOzs7OzJDQUNBLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRTs7O0FBQTdDLG9CQUFVOztBQUNkLGNBQUksVUFBVSxFQUFFO0FBQ2Qsc0JBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1dBQ3ZEOzs7Ozs7O0dBQ0YsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9kcml2ZXItZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IEFEQiBmcm9tICdhcHBpdW0tYWRiJztcbmltcG9ydCBBbmRyb2lkRHJpdmVyIGZyb20gJy4uLy4uJztcbmltcG9ydCBERUZBVUxUX0NBUFMgZnJvbSAnLi9kZXNpcmVkJztcblxuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xubGV0IGV4cGVjdCA9IGNoYWkuZXhwZWN0O1xuXG5sZXQgZGVmYXVsdENhcHMgPSBfLmRlZmF1bHRzKHtcbiAgYW5kcm9pZEluc3RhbGxUaW1lb3V0OiA5MDAwMFxufSwgREVGQVVMVF9DQVBTKTtcblxuZGVzY3JpYmUoJ2NyZWF0ZVNlc3Npb24nLCBmdW5jdGlvbiAoKSB7XG4gIGxldCBkcml2ZXI7XG4gIGJlZm9yZShmdW5jdGlvbiAoKSB7XG4gICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgfSk7XG4gIGFmdGVyRWFjaChhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcbiAgfSk7XG5cbiAgYXN5bmMgZnVuY3Rpb24gZ2V0UGFja2FnZUFuZEFjdGl2aXR5IChkcml2ZXIpIHtcbiAgICBsZXQgYXBwUGFja2FnZSA9IGF3YWl0IGRyaXZlci5nZXRDdXJyZW50UGFja2FnZSgpO1xuICAgIGxldCBhcHBBY3Rpdml0eSA9IGF3YWl0IGRyaXZlci5nZXRDdXJyZW50QWN0aXZpdHkoKTtcbiAgICByZXR1cm4ge2FwcFBhY2thZ2UsIGFwcEFjdGl2aXR5fTtcbiAgfVxuXG4gIGl0KCdzaG91bGQgc3RhcnQgYW5kcm9pZCBzZXNzaW9uIGZvY3VzaW5nIG9uIGRlZmF1bHQgcGtnIGFuZCBhY3QnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oZGVmYXVsdENhcHMpO1xuICAgIGxldCB7YXBwUGFja2FnZSwgYXBwQWN0aXZpdHl9ID0gYXdhaXQgZ2V0UGFja2FnZUFuZEFjdGl2aXR5KGRyaXZlcik7XG4gICAgYXBwUGFja2FnZS5zaG91bGQuZXF1YWwoJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnKTtcbiAgICBhcHBBY3Rpdml0eS5zaG91bGQuZXF1YWwoJy5BcGlEZW1vcycpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBzdGFydCBhbmRyb2lkIHNlc3Npb24gZm9jdXNpbmcgb24gY3VzdG9tIHBrZyBhbmQgYWN0JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBjYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdENhcHMpO1xuICAgIGNhcHMuYXBwUGFja2FnZSA9ICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJztcbiAgICBjYXBzLmFwcEFjdGl2aXR5ID0gJy52aWV3LlNwbGl0VG91Y2hWaWV3JztcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihjYXBzKTtcbiAgICBsZXQge2FwcFBhY2thZ2UsIGFwcEFjdGl2aXR5fSA9IGF3YWl0IGdldFBhY2thZ2VBbmRBY3Rpdml0eShkcml2ZXIpO1xuICAgIGFwcFBhY2thZ2Uuc2hvdWxkLmVxdWFsKGNhcHMuYXBwUGFja2FnZSk7XG4gICAgYXBwQWN0aXZpdHkuc2hvdWxkLmVxdWFsKGNhcHMuYXBwQWN0aXZpdHkpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBlcnJvciBvdXQgZm9yIG5vdCBhcGsgZXh0ZW50aW9uJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBjYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdENhcHMpO1xuICAgIGNhcHMuYXBwID0gJ2Zvbyc7XG4gICAgY2Fwcy5hcHBQYWNrYWdlID0gJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnO1xuICAgIGNhcHMuYXBwQWN0aXZpdHkgPSAnLnZpZXcuU3BsaXRUb3VjaFZpZXcnO1xuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGNhcHMpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgvZG9lcyBub3QgZXhpc3Qgb3IgaXMgbm90IGFjY2Vzc2libGUvKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZXJyb3Igb3V0IGlmIG5laXRoZXIgYW4gYXBwIG9yIGEgYnJvd3NlciBpcyBkZWZpbmVkJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBjYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdENhcHMpO1xuICAgIGNhcHMuYXBwID0gJyc7XG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oY2Fwcykuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKC9pbmNsdWRlLyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGVycm9yIG91dCBmb3IgaW52YWxpZCBhcHAgcGF0aCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgY2FwcyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRDYXBzKTtcbiAgICBjYXBzLmFwcCA9ICdmb28uYXBrJztcbiAgICBjYXBzLmFwcFBhY2thZ2UgPSAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcyc7XG4gICAgY2Fwcy5hcHBBY3Rpdml0eSA9ICcudmlldy5TcGxpdFRvdWNoVmlldyc7XG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oY2Fwcykuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKC9Db3VsZCBub3QgZmluZC8pO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIHN0YXJ0IHNlc3Npb24gd2l0aG91dCBsYXVuY2hpbmcgb3IgaW5zdGFsbGluZyBhcHAnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGNhcHMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0Q2Fwcyk7XG4gICAgY2Fwcy5hcHBQYWNrYWdlID0gJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnO1xuICAgIGNhcHMuYXBwQWN0aXZpdHkgPSAnLnZpZXcuU3BsaXRUb3VjaFZpZXcnO1xuICAgIGNhcHMuYXV0b0xhdW5jaCA9IGZhbHNlO1xuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGNhcHMpO1xuICAgIGxldCB7YXBwUGFja2FnZSwgYXBwQWN0aXZpdHl9ID0gYXdhaXQgZ2V0UGFja2FnZUFuZEFjdGl2aXR5KGRyaXZlcik7XG4gICAgZXhwZWN0KGFwcFBhY2thZ2UpLnRvLm5vdC5lcXVhbChjYXBzLmFwcFBhY2thZ2UpO1xuICAgIGV4cGVjdChhcHBBY3Rpdml0eSkudG8ubm90LmVxdWFsKGNhcHMuYXBwQWN0aXZpdHkpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGxhdW5jaCBhY3Rpdml0eSB3aXRoIGN1c3RvbSBpbnRlbnQgcGFyYW1ldGVyIGNhdGVnb3J5JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBjYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdENhcHMpO1xuICAgIGNhcHMuYXBwUGFja2FnZSA9ICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJztcbiAgICBjYXBzLmFwcEFjdGl2aXR5ID0gJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMuYXBwLkhlbGxvV29ybGQnO1xuICAgIGNhcHMuaW50ZW50Q2F0ZWdvcnkgPSAnYXBwaXVtLmFuZHJvaWQuaW50ZW50LmNhdGVnb3J5LlNBTVBMRV9DT0RFJztcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihjYXBzKTtcbiAgICBsZXQgYXBwQWN0aXZpdHkgPSBhd2FpdCBkcml2ZXIuZ2V0Q3VycmVudEFjdGl2aXR5KCk7XG4gICAgYXBwQWN0aXZpdHkuc2hvdWxkLmluY2x1ZGUoJ0hlbGxvV29ybGQnKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgYmUgYWJsZSB0byBsb2FkIGFuIGFwcCB2aWEgcGFja2FnZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgY2FwcyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRDYXBzKTtcbiAgICBjYXBzLmFwcCA9ICcnO1xuICAgIGNhcHMuYXBwUGFja2FnZSA9ICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJztcbiAgICBjYXBzLmFwcEFjdGl2aXR5ID0gJy5BcGlEZW1vcyc7XG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oY2Fwcyk7XG4gICAgbGV0IGFwcFBhY2thZ2UgPSBhd2FpdCBkcml2ZXIuZ2V0Q3VycmVudFBhY2thZ2UoKTtcbiAgICBhcHBQYWNrYWdlLnNob3VsZC5pbmNsdWRlKCdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGVycm9yIG91dCBpZiBwYWNrYWdlIGlzIG5vdCBvbiB0aGUgZGV2aWNlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBjYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdENhcHMpO1xuICAgIGNhcHMuYXBwID0gJyc7XG4gICAgY2Fwcy5hcHBQYWNrYWdlID0gJ3NpcGEuZGlvcmRuYS5tdWlwcGEub2knO1xuICAgIGNhcHMuYXBwQWN0aXZpdHkgPSAnLkFwaURlbW9zJztcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihjYXBzKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoL0NvdWxkIG5vdCBmaW5kLyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGdldCB1cGRhdGVkIGNhcGFiaWxpdGllcycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgY2FwcyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRDYXBzKTtcbiAgICBjYXBzLmFwcFBhY2thZ2UgPSAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcyc7XG4gICAgY2Fwcy5hcHBBY3Rpdml0eSA9ICcudmlldy5TcGxpdFRvdWNoVmlldyc7XG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oY2Fwcyk7XG4gICAgbGV0IHNlcnZlckNhcHMgPSBhd2FpdCBkcml2ZXIuZ2V0U2Vzc2lvbigpO1xuICAgIHNlcnZlckNhcHMudGFrZXNTY3JlZW5zaG90LnNob3VsZC5leGlzdDtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZ2V0IGRldmljZSBuYW1lLCB1ZGlkLCBtb2RlbCwgbWFudWZhY3R1cmVyIGFuZCBzY3JlZW4gc2l6ZSBpbiBzZXNzaW9uIGRldGFpbHMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGNhcHMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0Q2Fwcyk7XG4gICAgY2Fwcy5hcHBQYWNrYWdlID0gJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnO1xuICAgIGNhcHMuYXBwQWN0aXZpdHkgPSAnLnZpZXcuU3BsaXRUb3VjaFZpZXcnO1xuICAgIGxldCBzZXNzaW9uID0gYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oY2Fwcyk7XG4gICAgc2Vzc2lvblsxXS5kZXZpY2VOYW1lLnNob3VsZC5leGlzdDtcbiAgICBzZXNzaW9uWzFdLmRldmljZVVESUQuc2hvdWxkLmV4aXN0O1xuXG4gICAgbGV0IHNlcnZlckNhcHMgPSBhd2FpdCBkcml2ZXIuZ2V0U2Vzc2lvbigpO1xuICAgIHNlcnZlckNhcHMuZGV2aWNlTmFtZS5zaG91bGQuZXhpc3Q7XG4gICAgc2VydmVyQ2Fwcy5kZXZpY2VVRElELnNob3VsZC5leGlzdDtcbiAgICBzZXJ2ZXJDYXBzLmRldmljZVNjcmVlblNpemUuc2hvdWxkLmV4aXN0O1xuICAgIHNlcnZlckNhcHMuZGV2aWNlTW9kZWwuc2hvdWxkLmV4aXN0O1xuICAgIHNlcnZlckNhcHMuZGV2aWNlTWFudWZhY3R1cmVyLnNob3VsZC5leGlzdDtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZXJyb3Igb3V0IGZvciBhY3Rpdml0eSB0aGF0IGZhaWxzIHRvIGxvYWQgYWZ0ZXIgYXBwIHdhaXQgYWN0aXZpdHkgdGltZW91dCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgY2FwcyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRDYXBzKTtcbiAgICBjYXBzLmFwcFdhaXRBY3Rpdml0eSA9ICdub24uZXhpc3RlbnQuYWN0aXZpdHknO1xuICAgIGNhcHMuYXBwV2FpdER1cmF0aW9uID0gMTAwMDsgLy8gMSBzZWNvbmRcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihjYXBzKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoL25ldmVyIHN0YXJ0ZWQvKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgYmUgYWJsZSB0byBncmFudCBwZXJtaXNzaW9ucycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAvLyBUT0RPOiB3aHkgaXMgdGhlcmUgbm8gZW50cnkgZm9yIDUuMT9cbiAgICBsZXQgYWRiID0gbmV3IEFEQigpO1xuICAgIGxldCBhcGlMZXZlbCA9IGF3YWl0IGFkYi5nZXRBcGlMZXZlbCgpO1xuICAgIGlmIChhcGlMZXZlbCA8IDIzKSB7XG4gICAgICByZXR1cm4gdGhpcy5za2lwKCk7XG4gICAgfVxuICAgIGxldCBjYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdENhcHMpO1xuICAgIGNhcHMuYXBwUGFja2FnZSA9ICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJztcbiAgICBjYXBzLmFwcEFjdGl2aXR5ID0gJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMuYXBwLkhlbGxvV29ybGQnO1xuICAgIGNhcHMuaW50ZW50Q2F0ZWdvcnkgPSAnYXBwaXVtLmFuZHJvaWQuaW50ZW50LmNhdGVnb3J5LlNBTVBMRV9DT0RFJztcbiAgICBjYXBzLmF1dG9HcmFudFBlcm1pc3Npb25zID0gdHJ1ZTtcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihjYXBzKTtcbiAgICBleHBlY3QoYXdhaXQgZHJpdmVyLmFkYi5nZXRHcmFudGVkUGVybWlzc2lvbnMoJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnKSkudG8uaW5jbHVkZS5tZW1iZXJzKFsnYW5kcm9pZC5wZXJtaXNzaW9uLlJFQ0VJVkVfU01TJ10pO1xuICB9KTtcbiAgZGVzY3JpYmUoJ1czQyBjb21wbGlhbmNlJywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdzaG91bGQgYWNjZXB0IFczQyBwYXJhbWV0ZXJzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgW3Nlc3Npb25JZCwgY2Fwc10gPSBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihudWxsLCBudWxsLCB7XG4gICAgICAgIGFsd2F5c01hdGNoOiBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0Q2FwcyksXG4gICAgICAgIGZpcnN0TWF0Y2g6IFt7fV0sXG4gICAgICB9KTtcbiAgICAgIHNlc3Npb25JZC5zaG91bGQuZXhpc3Q7XG4gICAgICBjYXBzLnNob3VsZC5leGlzdDtcbiAgICB9KTtcbiAgfSk7XG59KTtcblxuZGVzY3JpYmUoJ2Nsb3NlJywgZnVuY3Rpb24gKCkge1xuICBsZXQgZHJpdmVyO1xuICBiZWZvcmUoZnVuY3Rpb24gKCkge1xuICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gIH0pO1xuICBhZnRlckVhY2goYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGNsb3NlIGFwcGxpY2F0aW9uJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGRlZmF1bHRDYXBzKTtcbiAgICBhd2FpdCBkcml2ZXIuY2xvc2VBcHAoKTtcbiAgICBsZXQgYXBwUGFja2FnZSA9IGF3YWl0IGRyaXZlci5nZXRDdXJyZW50UGFja2FnZSgpO1xuICAgIGlmIChhcHBQYWNrYWdlKSB7XG4gICAgICBhcHBQYWNrYWdlLnNob3VsZC5ub3QuZXF1YWwoXCJpby5hcHBpdW0uYW5kcm9pZC5hcGlzXCIpO1xuICAgIH1cbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4ifQ==
