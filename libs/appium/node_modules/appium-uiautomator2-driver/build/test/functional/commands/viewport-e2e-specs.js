'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _pngjs = require('pngjs');

var _desired = require('../desired');

var _helpersSession = require('../helpers/session');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var driver = undefined;

describe('testViewportCommands', function () {
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(_desired.SCROLL_CAPS));

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

  it('should get device pixel ratio, status bar height, and viewport rect', function callee$1$0() {
    var _ref, viewportRect, statBarHeight, pixelRatio;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.sessionCapabilities());

        case 2:
          _ref = context$2$0.sent;
          viewportRect = _ref.viewportRect;
          statBarHeight = _ref.statBarHeight;
          pixelRatio = _ref.pixelRatio;

          pixelRatio.should.exist;
          pixelRatio.should.not.equal(0);
          statBarHeight.should.exist;
          statBarHeight.should.not.equal(0);
          viewportRect.should.exist;
          viewportRect.left.should.exist;
          viewportRect.top.should.exist;
          viewportRect.width.should.exist;
          viewportRect.height.should.exist;

        case 15:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should get scrollable element', function callee$1$0() {
    var scrollableEl;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementByXPath('//*[@scrollable="true"]'));

        case 2:
          scrollableEl = context$2$0.sent;

          scrollableEl.should.exist;

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should get content size from scrollable element found as uiobject', function callee$1$0() {
    var scrollableEl, contentSize;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementByXPath('//*[@scrollable="true"]'));

        case 2:
          scrollableEl = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(scrollableEl.getAttribute("contentSize"));

        case 5:
          contentSize = context$2$0.sent;

          contentSize.should.exist;
          JSON.parse(contentSize).scrollableOffset.should.exist;

        case 8:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should get content size from scrollable element found as uiobject2', function callee$1$0() {
    var scrollableEl, contentSize;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementByXPath('//android.widget.ScrollView'));

        case 2:
          scrollableEl = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(scrollableEl.getAttribute("contentSize"));

        case 5:
          contentSize = context$2$0.sent;

          contentSize.should.exist;
          JSON.parse(contentSize).scrollableOffset.should.exist;

        case 8:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should get first element from scrollable element', function callee$1$0() {
    var scrollableEl, element;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementByXPath('//*[@scrollable="true"]'));

        case 2:
          scrollableEl = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(scrollableEl.elementByXPath('/*[@firstVisible="true"]'));

        case 5:
          element = context$2$0.sent;

          element.should.exist;

        case 7:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should get a cropped screenshot of the viewport without statusbar', function callee$1$0() {
    var _ref2, viewportRect, statBarHeight, fullScreen, viewScreen, fullB64, viewB64, fullImg, viewImg;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          if (!process.env.CI) {
            context$2$0.next = 2;
            break;
          }

          return context$2$0.abrupt('return', this.skip());

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.sessionCapabilities());

        case 4:
          _ref2 = context$2$0.sent;
          viewportRect = _ref2.viewportRect;
          statBarHeight = _ref2.statBarHeight;
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(driver.takeScreenshot());

        case 9:
          fullScreen = context$2$0.sent;
          context$2$0.next = 12;
          return _regeneratorRuntime.awrap(driver.execute("mobile: viewportScreenshot"));

        case 12:
          viewScreen = context$2$0.sent;
          fullB64 = new Buffer(fullScreen, 'base64');
          viewB64 = new Buffer(viewScreen, 'base64');
          fullImg = new _pngjs.PNG({ filterType: 4 });
          context$2$0.next = 18;
          return _regeneratorRuntime.awrap(_bluebird2['default'].promisify(fullImg.parse).call(fullImg, fullB64));

        case 18:
          viewImg = new _pngjs.PNG({ filterType: 4 });
          context$2$0.next = 21;
          return _regeneratorRuntime.awrap(_bluebird2['default'].promisify(viewImg.parse).call(viewImg, viewB64));

        case 21:
          viewportRect.top.should.eql(statBarHeight);
          viewImg.height.should.eql(viewportRect.height);
          viewImg.width.should.eql(fullImg.width);
          fullImg.height.should.be.above(viewImg.height);

        case 25:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});

// TODO: fails on CI with a `Does the current view have 'secure' flag set?` error
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy92aWV3cG9ydC1lMmUtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7Ozt3QkFDL0IsVUFBVTs7OztxQkFDSixPQUFPOzt1QkFDQyxZQUFZOzs4QkFDYixvQkFBb0I7O0FBRS9DLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsSUFBSSxNQUFNLFlBQUEsQ0FBQzs7QUFFWCxRQUFRLENBQUMsc0JBQXNCLEVBQUUsWUFBWTtBQUMzQyxRQUFNLENBQUM7Ozs7OzJDQUNVLHFEQUF1Qjs7O0FBQXRDLGdCQUFNOzs7Ozs7O0dBQ1AsQ0FBQyxDQUFDO0FBQ0gsT0FBSyxDQUFDOzs7O2VBQ0EsTUFBTTs7Ozs7OzJDQUNGLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Ozs7Ozs7R0FFdEIsQ0FBQyxDQUFDOztBQUVILElBQUUsQ0FBQyxxRUFBcUUsRUFBRTtjQUNqRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFVBQVU7Ozs7OzsyQ0FBVSxNQUFNLENBQUMsbUJBQW1CLEVBQUU7Ozs7QUFBN0Usc0JBQVksUUFBWixZQUFZO0FBQUUsdUJBQWEsUUFBYixhQUFhO0FBQUUsb0JBQVUsUUFBVixVQUFVOztBQUM5QyxvQkFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDeEIsb0JBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQix1QkFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDM0IsdUJBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsQyxzQkFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDMUIsc0JBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUMvQixz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TyxFQUFFLE9BQU8sQ0FBQzs7O0FBQ3ZELHNCQUFZLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDM0MsaUJBQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDL0MsaUJBQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDeEMsaUJBQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7Ozs7O0dBQ2hELENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvY29tbWFuZHMvdmlld3BvcnQtZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgQiBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgeyBQTkcgfSBmcm9tICdwbmdqcyc7XG5pbXBvcnQgeyBTQ1JPTExfQ0FQUyB9IGZyb20gJy4uL2Rlc2lyZWQnO1xuaW1wb3J0IHsgaW5pdERyaXZlciB9IGZyb20gJy4uL2hlbHBlcnMvc2Vzc2lvbic7XG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmxldCBkcml2ZXI7XG5cbmRlc2NyaWJlKCd0ZXN0Vmlld3BvcnRDb21tYW5kcycsIGZ1bmN0aW9uICgpIHtcbiAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBkcml2ZXIgPSBhd2FpdCBpbml0RHJpdmVyKFNDUk9MTF9DQVBTKTtcbiAgfSk7XG4gIGFmdGVyKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoZHJpdmVyKSB7XG4gICAgICBhd2FpdCBkcml2ZXIucXVpdCgpO1xuICAgIH1cbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBnZXQgZGV2aWNlIHBpeGVsIHJhdGlvLCBzdGF0dXMgYmFyIGhlaWdodCwgYW5kIHZpZXdwb3J0IHJlY3QnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3Qge3ZpZXdwb3J0UmVjdCwgc3RhdEJhckhlaWdodCwgcGl4ZWxSYXRpb30gPSBhd2FpdCBkcml2ZXIuc2Vzc2lvbkNhcGFiaWxpdGllcygpO1xuICAgIHBpeGVsUmF0aW8uc2hvdWxkLmV4aXN0O1xuICAgIHBpeGVsUmF0aW8uc2hvdWxkLm5vdC5lcXVhbCgwKTtcbiAgICBzdGF0QmFySGVpZ2h0LnNob3VsZC5leGlzdDtcbiAgICBzdGF0QmFySGVpZ2h0LnNob3VsZC5ub3QuZXF1YWwoMCk7XG4gICAgdmlld3BvcnRSZWN0LnNob3VsZC5leGlzdDtcbiAgICB2aWV3cG9ydFJlY3QubGVmdC5zaG91bGQuZXhpc3Q7XG4gICAgdmlld3BvcnRSZWN0LnRvcC5zaG91bGQuZXhpc3Q7XG4gICAgdmlld3BvcnRSZWN0LndpZHRoLnNob3VsZC5leGlzdDtcbiAgICB2aWV3cG9ydFJlY3QuaGVpZ2h0LnNob3VsZC5leGlzdDtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBnZXQgc2Nyb2xsYWJsZSBlbGVtZW50JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBzY3JvbGxhYmxlRWwgPSBhd2FpdCBkcml2ZXIuZWxlbWVudEJ5WFBhdGgoJy8vKltAc2Nyb2xsYWJsZT1cInRydWVcIl0nKTtcbiAgICBzY3JvbGxhYmxlRWwuc2hvdWxkLmV4aXN0O1xuICB9KTtcblxuICBpdCgnc2hvdWxkIGdldCBjb250ZW50IHNpemUgZnJvbSBzY3JvbGxhYmxlIGVsZW1lbnQgZm91bmQgYXMgdWlvYmplY3QnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHNjcm9sbGFibGVFbCA9IGF3YWl0IGRyaXZlci5lbGVtZW50QnlYUGF0aCgnLy8qW0BzY3JvbGxhYmxlPVwidHJ1ZVwiXScpO1xuICAgIGxldCBjb250ZW50U2l6ZSA9IGF3YWl0IHNjcm9sbGFibGVFbC5nZXRBdHRyaWJ1dGUoXCJjb250ZW50U2l6ZVwiKTtcbiAgICBjb250ZW50U2l6ZS5zaG91bGQuZXhpc3Q7XG4gICAgSlNPTi5wYXJzZShjb250ZW50U2l6ZSkuc2Nyb2xsYWJsZU9mZnNldC5zaG91bGQuZXhpc3Q7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgZ2V0IGNvbnRlbnQgc2l6ZSBmcm9tIHNjcm9sbGFibGUgZWxlbWVudCBmb3VuZCBhcyB1aW9iamVjdDInLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHNjcm9sbGFibGVFbCA9IGF3YWl0IGRyaXZlci5lbGVtZW50QnlYUGF0aCgnLy9hbmRyb2lkLndpZGdldC5TY3JvbGxWaWV3Jyk7XG4gICAgbGV0IGNvbnRlbnRTaXplID0gYXdhaXQgc2Nyb2xsYWJsZUVsLmdldEF0dHJpYnV0ZShcImNvbnRlbnRTaXplXCIpO1xuICAgIGNvbnRlbnRTaXplLnNob3VsZC5leGlzdDtcbiAgICBKU09OLnBhcnNlKGNvbnRlbnRTaXplKS5zY3JvbGxhYmxlT2Zmc2V0LnNob3VsZC5leGlzdDtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBnZXQgZmlyc3QgZWxlbWVudCBmcm9tIHNjcm9sbGFibGUgZWxlbWVudCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgc2Nyb2xsYWJsZUVsID0gYXdhaXQgZHJpdmVyLmVsZW1lbnRCeVhQYXRoKCcvLypbQHNjcm9sbGFibGU9XCJ0cnVlXCJdJyk7XG4gICAgbGV0IGVsZW1lbnQgPSBhd2FpdCBzY3JvbGxhYmxlRWwuZWxlbWVudEJ5WFBhdGgoJy8qW0BmaXJzdFZpc2libGU9XCJ0cnVlXCJdJyk7XG4gICAgZWxlbWVudC5zaG91bGQuZXhpc3Q7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgZ2V0IGEgY3JvcHBlZCBzY3JlZW5zaG90IG9mIHRoZSB2aWV3cG9ydCB3aXRob3V0IHN0YXR1c2JhcicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAvLyBUT0RPOiBmYWlscyBvbiBDSSB3aXRoIGEgYERvZXMgdGhlIGN1cnJlbnQgdmlldyBoYXZlICdzZWN1cmUnIGZsYWcgc2V0P2AgZXJyb3JcbiAgICBpZiAocHJvY2Vzcy5lbnYuQ0kpIHtcbiAgICAgIHJldHVybiB0aGlzLnNraXAoKTtcbiAgICB9XG4gICAgY29uc3Qge3ZpZXdwb3J0UmVjdCwgc3RhdEJhckhlaWdodH0gPSBhd2FpdCBkcml2ZXIuc2Vzc2lvbkNhcGFiaWxpdGllcygpO1xuICAgIGNvbnN0IGZ1bGxTY3JlZW4gPSBhd2FpdCBkcml2ZXIudGFrZVNjcmVlbnNob3QoKTtcbiAgICBjb25zdCB2aWV3U2NyZWVuID0gYXdhaXQgZHJpdmVyLmV4ZWN1dGUoXCJtb2JpbGU6IHZpZXdwb3J0U2NyZWVuc2hvdFwiKTtcbiAgICBjb25zdCBmdWxsQjY0ID0gbmV3IEJ1ZmZlcihmdWxsU2NyZWVuLCAnYmFzZTY0Jyk7XG4gICAgY29uc3Qgdmlld0I2NCA9IG5ldyBCdWZmZXIodmlld1NjcmVlbiwgJ2Jhc2U2NCcpO1xuICAgIGNvbnN0IGZ1bGxJbWcgPSBuZXcgUE5HKHtmaWx0ZXJUeXBlOiA0fSk7XG4gICAgYXdhaXQgQi5wcm9taXNpZnkoZnVsbEltZy5wYXJzZSkuY2FsbChmdWxsSW1nLCBmdWxsQjY0KTtcbiAgICBjb25zdCB2aWV3SW1nID0gbmV3IFBORyh7ZmlsdGVyVHlwZTogNH0pO1xuICAgIGF3YWl0IEIucHJvbWlzaWZ5KHZpZXdJbWcucGFyc2UpLmNhbGwodmlld0ltZywgdmlld0I2NCk7XG4gICAgdmlld3BvcnRSZWN0LnRvcC5zaG91bGQuZXFsKHN0YXRCYXJIZWlnaHQpO1xuICAgIHZpZXdJbWcuaGVpZ2h0LnNob3VsZC5lcWwodmlld3BvcnRSZWN0LmhlaWdodCk7XG4gICAgdmlld0ltZy53aWR0aC5zaG91bGQuZXFsKGZ1bGxJbWcud2lkdGgpO1xuICAgIGZ1bGxJbWcuaGVpZ2h0LnNob3VsZC5iZS5hYm92ZSh2aWV3SW1nLmhlaWdodCk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uIn0=
