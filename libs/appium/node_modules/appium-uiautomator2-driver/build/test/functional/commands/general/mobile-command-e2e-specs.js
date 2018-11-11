'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

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

describe('mobile', function () {
  var driver = undefined;
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          delete _desired.APIDEMOS_CAPS.app;
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(_extends({}, _desired.APIDEMOS_CAPS, {

            // For deeplinking to work, it has to run a session in a native
            // context but it doesn't matter what native app is run so just
            // run io.appium.settings for simplicity
            appPackage: 'io.appium.settings',
            appActivity: '.Settings'
          })));

        case 3:
          driver = context$2$0.sent;

        case 4:
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
          return _regeneratorRuntime.awrap(driver.quit());

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  describe('mobile:shell', function () {
    it('should call execute command without proxy error, but require relaxed security flag', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.prev = 0;
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.execute('mobile: shell', { command: 'echo', args: ['hello'] }));

          case 3:
            context$3$0.next = 8;
            break;

          case 5:
            context$3$0.prev = 5;
            context$3$0.t0 = context$3$0['catch'](0);

            context$3$0.t0.message.should.match(/Original error: Appium server must have relaxed security flag set in order to run any shell commands/);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this, [[0, 5]]);
    });
  });
  describe('mobile:deepLink', function () {
    it('should be able to launch apps using Instant Apps', function callee$2$0() {
      var btn;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.prev = 0;
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.execute("mobile: deepLink", { url: 'https://www.realtor.com/realestateandhomes-search/San-Jose_CA', 'package': 'com.move.realtor' }));

          case 3:
            context$3$0.next = 9;
            break;

          case 5:
            context$3$0.prev = 5;
            context$3$0.t0 = context$3$0['catch'](0);

            // Note: Currently no emulators have this feature enabled so for this test to make it past this try-catch
            // block it has to be run on a local emulator/device that has Instant Apps enabled
            // (https://developer.android.com/topic/instant-apps/getting-started/setup.html)
            context$3$0.t0.message.should.match(/unable to resolve intent/i);
            return context$3$0.abrupt('return');

          case 9:
            context$3$0.next = 11;
            return _regeneratorRuntime.awrap(driver.source().should.eventually.match(/com\.move\.realtor/));

          case 11:
            context$3$0.next = 13;
            return _regeneratorRuntime.awrap(driver.elementsByXPath('//android.widget.Button'));

          case 13:
            btn = context$3$0.sent;

            btn.length.should.be.above(0);
            context$3$0.next = 17;
            return _regeneratorRuntime.awrap(btn[0].click());

          case 17:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this, [[0, 5]]);
    });
  });
  describe('mobile:batteryInfo', function () {
    it('should get battery info', function callee$2$0() {
      var _ref, level, state;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.execute('mobile: batteryInfo', {}));

          case 2:
            _ref = context$3$0.sent;
            level = _ref.level;
            state = _ref.state;

            level.should.be.greaterThan(0.0);
            state.should.be.greaterThan(1);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});

// Check that the source has the package name somewhere

// Check that we can find a native element and interact with it
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9nZW5lcmFsL21vYmlsZS1jb21tYW5kLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7dUJBQ2YsZUFBZTs7OEJBQ2xCLHVCQUF1Qjs7QUFFbEQsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixRQUFRLENBQUMsUUFBUSxFQUFFLFlBQVk7QUFDN0IsTUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLFFBQU0sQ0FBQzs7OztBQUNMLGlCQUFPLHVCQUFjLEdBQUcsQ0FBQzs7MkNBQ1Y7Ozs7O0FBTWIsc0JBQVUsRUFBRSxvQkFBb0I7QUFDaEMsdUJBQVcsRUFBRSxXQUFXO2FBQ3hCOzs7QUFSRixnQkFBTTs7Ozs7OztHQVNQLENBQUMsQ0FBQztBQUNILE9BQUssQ0FBQzs7Ozs7MkNBQ0UsTUFBTSxDQUFDLElBQUksRUFBRTs7Ozs7OztHQUNwQixDQUFDLENBQUM7QUFDSCxVQUFRLENBQUMsY0FBYyxFQUFFLFlBQVk7QUFDbkMsTUFBRSxDQUFDLG9GQUFvRixFQUFFOzs7Ozs7NkNBRS9FLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLEVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBQyxDQUFDOzs7Ozs7Ozs7O0FBRXpFLDJCQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHNHQUFzRyxDQUFDLENBQUM7Ozs7Ozs7S0FFbEksQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0FBQ0gsVUFBUSxDQUFDLGlCQUFpQixFQUFFLFlBQVk7QUFDdEMsTUFBRSxDQUFDLGtEQUFrRCxFQUFFO1VBZS9DLEdBQUc7Ozs7Ozs2Q0FiRCxNQUFNLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLEVBQUMsR0FBRyxFQUFFLCtEQUErRCxFQUFFLFdBQVMsa0JBQWtCLEVBQUMsQ0FBQzs7Ozs7Ozs7Ozs7OztBQUs3SSwyQkFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDOzs7Ozs2Q0FLaEQsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDOzs7OzZDQUdqRCxNQUFNLENBQUMsZUFBZSxDQUFDLHlCQUF5QixDQUFDOzs7QUFBN0QsZUFBRzs7QUFDVCxlQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs2Q0FDeEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRTs7Ozs7OztLQUNyQixDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7QUFDSCxVQUFRLENBQUMsb0JBQW9CLEVBQUUsWUFBWTtBQUN6QyxNQUFFLENBQUMseUJBQXlCLEVBQUU7Z0JBQ3JCLEtBQUssRUFBRSxLQUFLOzs7Ozs7NkNBQVUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxFQUFFLENBQUM7Ozs7QUFBL0QsaUJBQUssUUFBTCxLQUFLO0FBQUUsaUJBQUssUUFBTCxLQUFLOztBQUNuQixpQkFBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2pDLGlCQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7S0FDaEMsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9nZW5lcmFsL21vYmlsZS1jb21tYW5kLWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IHsgQVBJREVNT1NfQ0FQUyB9IGZyb20gJy4uLy4uL2Rlc2lyZWQnO1xuaW1wb3J0IHsgaW5pdERyaXZlciB9IGZyb20gJy4uLy4uL2hlbHBlcnMvc2Vzc2lvbic7XG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmRlc2NyaWJlKCdtb2JpbGUnLCBmdW5jdGlvbiAoKSB7XG4gIGxldCBkcml2ZXI7XG4gIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgZGVsZXRlIEFQSURFTU9TX0NBUFMuYXBwO1xuICAgIGRyaXZlciA9IGF3YWl0IGluaXREcml2ZXIoe1xuICAgICAgLi4uQVBJREVNT1NfQ0FQUyxcblxuICAgICAgLy8gRm9yIGRlZXBsaW5raW5nIHRvIHdvcmssIGl0IGhhcyB0byBydW4gYSBzZXNzaW9uIGluIGEgbmF0aXZlXG4gICAgICAvLyBjb250ZXh0IGJ1dCBpdCBkb2Vzbid0IG1hdHRlciB3aGF0IG5hdGl2ZSBhcHAgaXMgcnVuIHNvIGp1c3RcbiAgICAgIC8vIHJ1biBpby5hcHBpdW0uc2V0dGluZ3MgZm9yIHNpbXBsaWNpdHlcbiAgICAgIGFwcFBhY2thZ2U6ICdpby5hcHBpdW0uc2V0dGluZ3MnLFxuICAgICAgYXBwQWN0aXZpdHk6ICcuU2V0dGluZ3MnLFxuICAgIH0pO1xuICB9KTtcbiAgYWZ0ZXIoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5xdWl0KCk7XG4gIH0pO1xuICBkZXNjcmliZSgnbW9iaWxlOnNoZWxsJywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdzaG91bGQgY2FsbCBleGVjdXRlIGNvbW1hbmQgd2l0aG91dCBwcm94eSBlcnJvciwgYnV0IHJlcXVpcmUgcmVsYXhlZCBzZWN1cml0eSBmbGFnJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgZHJpdmVyLmV4ZWN1dGUoJ21vYmlsZTogc2hlbGwnLCB7Y29tbWFuZDogJ2VjaG8nLCBhcmdzOiBbJ2hlbGxvJ119KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgZS5tZXNzYWdlLnNob3VsZC5tYXRjaCgvT3JpZ2luYWwgZXJyb3I6IEFwcGl1bSBzZXJ2ZXIgbXVzdCBoYXZlIHJlbGF4ZWQgc2VjdXJpdHkgZmxhZyBzZXQgaW4gb3JkZXIgdG8gcnVuIGFueSBzaGVsbCBjb21tYW5kcy8pO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgZGVzY3JpYmUoJ21vYmlsZTpkZWVwTGluaycsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gbGF1bmNoIGFwcHMgdXNpbmcgSW5zdGFudCBBcHBzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgZHJpdmVyLmV4ZWN1dGUoXCJtb2JpbGU6IGRlZXBMaW5rXCIsIHt1cmw6ICdodHRwczovL3d3dy5yZWFsdG9yLmNvbS9yZWFsZXN0YXRlYW5kaG9tZXMtc2VhcmNoL1Nhbi1Kb3NlX0NBJywgcGFja2FnZTogJ2NvbS5tb3ZlLnJlYWx0b3InfSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIE5vdGU6IEN1cnJlbnRseSBubyBlbXVsYXRvcnMgaGF2ZSB0aGlzIGZlYXR1cmUgZW5hYmxlZCBzbyBmb3IgdGhpcyB0ZXN0IHRvIG1ha2UgaXQgcGFzdCB0aGlzIHRyeS1jYXRjaFxuICAgICAgICAvLyBibG9jayBpdCBoYXMgdG8gYmUgcnVuIG9uIGEgbG9jYWwgZW11bGF0b3IvZGV2aWNlIHRoYXQgaGFzIEluc3RhbnQgQXBwcyBlbmFibGVkXG4gICAgICAgIC8vIChodHRwczovL2RldmVsb3Blci5hbmRyb2lkLmNvbS90b3BpYy9pbnN0YW50LWFwcHMvZ2V0dGluZy1zdGFydGVkL3NldHVwLmh0bWwpXG4gICAgICAgIGUubWVzc2FnZS5zaG91bGQubWF0Y2goL3VuYWJsZSB0byByZXNvbHZlIGludGVudC9pKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBDaGVjayB0aGF0IHRoZSBzb3VyY2UgaGFzIHRoZSBwYWNrYWdlIG5hbWUgc29tZXdoZXJlXG4gICAgICBhd2FpdCBkcml2ZXIuc291cmNlKCkuc2hvdWxkLmV2ZW50dWFsbHkubWF0Y2goL2NvbVxcLm1vdmVcXC5yZWFsdG9yLyk7XG5cbiAgICAgIC8vIENoZWNrIHRoYXQgd2UgY2FuIGZpbmQgYSBuYXRpdmUgZWxlbWVudCBhbmQgaW50ZXJhY3Qgd2l0aCBpdFxuICAgICAgY29uc3QgYnRuID0gYXdhaXQgZHJpdmVyLmVsZW1lbnRzQnlYUGF0aCgnLy9hbmRyb2lkLndpZGdldC5CdXR0b24nKTtcbiAgICAgIGJ0bi5sZW5ndGguc2hvdWxkLmJlLmFib3ZlKDApO1xuICAgICAgYXdhaXQgYnRuWzBdLmNsaWNrKCk7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgnbW9iaWxlOmJhdHRlcnlJbmZvJywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdzaG91bGQgZ2V0IGJhdHRlcnkgaW5mbycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IHtsZXZlbCwgc3RhdGV9ID0gYXdhaXQgZHJpdmVyLmV4ZWN1dGUoJ21vYmlsZTogYmF0dGVyeUluZm8nLCB7fSk7XG4gICAgICBsZXZlbC5zaG91bGQuYmUuZ3JlYXRlclRoYW4oMC4wKTtcbiAgICAgIHN0YXRlLnNob3VsZC5iZS5ncmVhdGVyVGhhbigxKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vLi4ifQ==
