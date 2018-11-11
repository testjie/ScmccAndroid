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

describe('Find - uiautomator', function () {
  var driver = undefined;
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(_desired.APIDEMOS_CAPS));

        case 2:
          driver = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.updateSettings({ 'enableNotificationListener': false }));

        case 5:
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(driver.setImplicitWaitTimeout(20000));

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
          return _regeneratorRuntime.awrap(driver.quit());

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find elements with a boolean argument', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementsByAndroidUIAutomator('new UiSelector().clickable(true)').should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find elements within the context of another element', function callee$1$0() {
    var els;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementsByAndroidUIAutomator('new UiSelector().className("android.widget.TextView")'));

        case 2:
          els = context$2$0.sent;

          els.length.should.be.above(8);
          els.length.should.be.below(14);

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find elements without prepending "new UiSelector()"', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementsByAndroidUIAutomator('.clickable(true)').should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find elements without prepending "new UiSelector()"', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementsByAndroidUIAutomator('clickable(true)').should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find elements without prepending "new "', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementsByAndroidUIAutomator('UiSelector().clickable(true)').should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should ignore trailing semicolons', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementsByAndroidUIAutomator('new UiSelector().clickable(true);').should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find an element with an int argument', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementByAndroidUIAutomator('new UiSelector().index(0)'));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(el.getAttribute('className').should.eventually.equal('android.widget.FrameLayout'));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find an element with a string argument', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementByAndroidUIAutomator('new UiSelector().description("Animation")').should.eventually.exist);

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find an element with an overloaded method argument', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementsByAndroidUIAutomator('new UiSelector().className("android.widget.TextView")').should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find an element with a Class<T> method argument', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementsByAndroidUIAutomator('new UiSelector().className(android.widget.TextView)').should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find an element with a long chain of methods', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementByAndroidUIAutomator('new UiSelector().clickable(true).className(android.widget.TextView).index(1)'));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(el.text().should.eventually.equal('Accessibility'));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find an element with recursive UiSelectors', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementsByAndroidUIAutomator('new UiSelector().childSelector(new UiSelector().clickable(true)).focused(true)').should.eventually.have.length(1));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should not find an element which does not exist', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.setImplicitWaitTimeout(1000));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.elementsByAndroidUIAutomator('new UiSelector().description("chuckwudi")').should.eventually.have.length(0));

        case 4:
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.setImplicitWaitTimeout(20000));

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  // restore implicit wait
  it('should allow multiple selector statements and return the Union of the two sets', function callee$1$0() {
    var clickableEls, notClickableEls, both;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementsByAndroidUIAutomator('new UiSelector().clickable(true)'));

        case 2:
          clickableEls = context$2$0.sent;

          clickableEls.length.should.be.above(0);
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.elementsByAndroidUIAutomator('new UiSelector().clickable(false)'));

        case 6:
          notClickableEls = context$2$0.sent;

          notClickableEls.length.should.be.above(0);
          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(driver.elementsByAndroidUIAutomator('new UiSelector().clickable(true); new UiSelector().clickable(false);'));

        case 10:
          both = context$2$0.sent;

          both.should.have.length(clickableEls.length + notClickableEls.length);

        case 12:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should allow multiple selector statements and return the Union of the two sets', function callee$1$0() {
    var clickableEls, clickableClickableEl;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementsByAndroidUIAutomator('new UiSelector().clickable(true)'));

        case 2:
          clickableEls = context$2$0.sent;

          clickableEls.length.should.be.above(0);
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.elementsByAndroidUIAutomator('new UiSelector().clickable(true); new UiSelector().clickable(true);'));

        case 6:
          clickableClickableEl = context$2$0.sent;

          clickableClickableEl.length.should.be.above(0);
          clickableClickableEl.should.have.length(clickableEls.length);

        case 9:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find an element in the second selector if the first finds no elements (when finding multiple elements)', function callee$1$0() {
    var selector, els;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          selector = 'new UiSelector().className("not.a.class"); new UiSelector().className("android.widget.TextView")';
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.elementsByAndroidUIAutomator(selector));

        case 3:
          els = context$2$0.sent;

          els.length.should.be.above(0);

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it.skip('should find an element in the second selector if the first finds no elements (when finding a single element)', function callee$1$0() {
    var selector;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          selector = 'new UiSelector().className("not.a.class"); new UiSelector().className("android.widget.TextView")';
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.elementByAndroidUIAutomator(selector).should.eventually.exist);

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should scroll to, and return elements using UiScrollable', function callee$1$0() {
    var selector, el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.startActivity({ appPackage: 'io.appium.android.apis', appActivity: '.view.List1' }));

        case 2:
          selector = 'new UiScrollable(new UiSelector().scrollable(true).instance(0)).scrollIntoView(new UiSelector().text("Beer Cheese").instance(0))';
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.elementByAndroidUIAutomator(selector));

        case 5:
          el = context$2$0.sent;
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(el.text().should.eventually.equal('Beer Cheese'));

        case 8:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should allow chaining UiScrollable methods', function callee$1$0() {
    var selector, el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.startActivity({ appPackage: 'io.appium.android.apis', appActivity: '.view.List1' }));

        case 2:
          selector = 'new UiScrollable(new UiSelector().scrollable(true).instance(0)).setMaxSearchSwipes(11).scrollIntoView(new UiSelector().text("Beer Cheese").instance(0))';
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.elementByAndroidUIAutomator(selector));

        case 5:
          el = context$2$0.sent;
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(el.text().should.eventually.equal('Beer Cheese'));

        case 8:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should allow UiScrollable scrollIntoView', function callee$1$0() {
    var selector, el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.startActivity({ appPackage: 'io.appium.android.apis', appActivity: '.view.List1' }));

        case 2:
          selector = 'new UiScrollable(new UiSelector().scrollable(true).instance(0)).scrollIntoView(new UiSelector().text("Beer Cheese").instance(0));';
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.elementByAndroidUIAutomator(selector));

        case 5:
          el = context$2$0.sent;
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(el.text().should.eventually.equal('Beer Cheese'));

        case 8:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should allow UiScrollable with unicode string', function callee$1$0() {
    var selector, el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.startActivity({ appPackage: 'io.appium.android.apis', appActivity: '.text.Unicode' }));

        case 2:
          selector = 'new UiSelector().text("عربي").instance(0);';
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.elementByAndroidUIAutomator(selector));

        case 5:
          el = context$2$0.sent;
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(el.text().should.eventually.equal('عربي'));

        case 8:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});
// expect this to fail, so no need to wait too long

// TODO: This test is broken.
//  * The test above this one works and it proxies to 'POST /elements'.
//  * This test doesn't work and the only difference is that it proxies to 'POST /element'
//  (see find.js for reference)
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9maW5kL2J5LXVpYXV0b21hdG9yLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O3VCQUNmLGVBQWU7OzhCQUNsQix1QkFBdUI7O0FBR2xELGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsUUFBUSxDQUFDLG9CQUFvQixFQUFFLFlBQVk7QUFDekMsTUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLFFBQU0sQ0FBQzs7Ozs7MkNBQ1UsdURBQXlCOzs7QUFBeEMsZ0JBQU07OzJDQUNBLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBQyw0QkFBNEIsRUFBRSxLQUFLLEVBQUMsQ0FBQzs7OzsyQ0FDNUQsTUFBTSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQzs7Ozs7OztHQUMzQyxDQUFDLENBQUM7QUFDSCxPQUFLLENBQUM7Ozs7OzJDQUNFLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Ozs7Ozs7R0FDcEIsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLDhDQUE4QyxFQUFFOzs7OzsyQ0FDM0MsTUFBTSxDQUFDLDRCQUE0QixDQUFDLGtDQUFrQyxDQUFDLENBQzFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQzs7Ozs7OztHQUM5QyxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsNERBQTRELEVBQUU7UUFDM0QsR0FBRzs7Ozs7MkNBQVMsTUFBTSxDQUNuQiw0QkFBNEIsQ0FBQyx1REFBdUQsQ0FBQzs7O0FBRHBGLGFBQUc7O0FBRVAsYUFBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM5QixhQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFF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YWwvY29tbWFuZHMvZmluZC9ieS11aWF1dG9tYXRvci1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCB7IEFQSURFTU9TX0NBUFMgfSBmcm9tICcuLi8uLi9kZXNpcmVkJztcbmltcG9ydCB7IGluaXREcml2ZXIgfSBmcm9tICcuLi8uLi9oZWxwZXJzL3Nlc3Npb24nO1xuXG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmRlc2NyaWJlKCdGaW5kIC0gdWlhdXRvbWF0b3InLCBmdW5jdGlvbiAoKSB7XG4gIGxldCBkcml2ZXI7XG4gIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgZHJpdmVyID0gYXdhaXQgaW5pdERyaXZlcihBUElERU1PU19DQVBTKTtcbiAgICBhd2FpdCBkcml2ZXIudXBkYXRlU2V0dGluZ3MoeydlbmFibGVOb3RpZmljYXRpb25MaXN0ZW5lcic6IGZhbHNlfSk7XG4gICAgYXdhaXQgZHJpdmVyLnNldEltcGxpY2l0V2FpdFRpbWVvdXQoMjAwMDApO1xuICB9KTtcbiAgYWZ0ZXIoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5xdWl0KCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgZWxlbWVudHMgd2l0aCBhIGJvb2xlYW4gYXJndW1lbnQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLmVsZW1lbnRzQnlBbmRyb2lkVUlBdXRvbWF0b3IoJ25ldyBVaVNlbGVjdG9yKCkuY2xpY2thYmxlKHRydWUpJylcbiAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5oYXZlLmxlbmd0aC5hdC5sZWFzdCgxMCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgZWxlbWVudHMgd2l0aGluIHRoZSBjb250ZXh0IG9mIGFub3RoZXIgZWxlbWVudCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgZWxzID0gYXdhaXQgZHJpdmVyXG4gICAgICAuZWxlbWVudHNCeUFuZHJvaWRVSUF1dG9tYXRvcignbmV3IFVpU2VsZWN0b3IoKS5jbGFzc05hbWUoXCJhbmRyb2lkLndpZGdldC5UZXh0Vmlld1wiKScpO1xuICAgIGVscy5sZW5ndGguc2hvdWxkLmJlLmFib3ZlKDgpO1xuICAgIGVscy5sZW5ndGguc2hvdWxkLmJlLmJlbG93KDE0KTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCBlbGVtZW50cyB3aXRob3V0IHByZXBlbmRpbmcgXCJuZXcgVWlTZWxlY3RvcigpXCInLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLmVsZW1lbnRzQnlBbmRyb2lkVUlBdXRvbWF0b3IoJy5jbGlja2FibGUodHJ1ZSknKVxuICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmhhdmUubGVuZ3RoLmF0LmxlYXN0KDEwKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCBlbGVtZW50cyB3aXRob3V0IHByZXBlbmRpbmcgXCJuZXcgVWlTZWxlY3RvcigpXCInLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLmVsZW1lbnRzQnlBbmRyb2lkVUlBdXRvbWF0b3IoJ2NsaWNrYWJsZSh0cnVlKScpXG4gICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuaGF2ZS5sZW5ndGguYXQubGVhc3QoMTApO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBmaW5kIGVsZW1lbnRzIHdpdGhvdXQgcHJlcGVuZGluZyBcIm5ldyBcIicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIuZWxlbWVudHNCeUFuZHJvaWRVSUF1dG9tYXRvcignVWlTZWxlY3RvcigpLmNsaWNrYWJsZSh0cnVlKScpXG4gICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuaGF2ZS5sZW5ndGguYXQubGVhc3QoMTApO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBpZ25vcmUgdHJhaWxpbmcgc2VtaWNvbG9ucycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIuZWxlbWVudHNCeUFuZHJvaWRVSUF1dG9tYXRvcignbmV3IFVpU2VsZWN0b3IoKS5jbGlja2FibGUodHJ1ZSk7JylcbiAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5oYXZlLmxlbmd0aC5hdC5sZWFzdCgxMCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgYW4gZWxlbWVudCB3aXRoIGFuIGludCBhcmd1bWVudCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgZWwgPSBhd2FpdCBkcml2ZXIuZWxlbWVudEJ5QW5kcm9pZFVJQXV0b21hdG9yKCduZXcgVWlTZWxlY3RvcigpLmluZGV4KDApJyk7XG4gICAgYXdhaXQgZWwuZ2V0QXR0cmlidXRlKCdjbGFzc05hbWUnKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCgnYW5kcm9pZC53aWRnZXQuRnJhbWVMYXlvdXQnKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCBhbiBlbGVtZW50IHdpdGggYSBzdHJpbmcgYXJndW1lbnQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyXG4gICAgICAuZWxlbWVudEJ5QW5kcm9pZFVJQXV0b21hdG9yKCduZXcgVWlTZWxlY3RvcigpLmRlc2NyaXB0aW9uKFwiQW5pbWF0aW9uXCIpJylcbiAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5leGlzdDtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCBhbiBlbGVtZW50IHdpdGggYW4gb3ZlcmxvYWRlZCBtZXRob2QgYXJndW1lbnQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLmVsZW1lbnRzQnlBbmRyb2lkVUlBdXRvbWF0b3IoJ25ldyBVaVNlbGVjdG9yKCkuY2xhc3NOYW1lKFwiYW5kcm9pZC53aWRnZXQuVGV4dFZpZXdcIiknKVxuICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmhhdmUubGVuZ3RoLmF0LmxlYXN0KDEwKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCBhbiBlbGVtZW50IHdpdGggYSBDbGFzczxUPiBtZXRob2QgYXJndW1lbnQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLmVsZW1lbnRzQnlBbmRyb2lkVUlBdXRvbWF0b3IoJ25ldyBVaVNlbGVjdG9yKCkuY2xhc3NOYW1lKGFuZHJvaWQud2lkZ2V0LlRleHRWaWV3KScpXG4gICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuaGF2ZS5sZW5ndGguYXQubGVhc3QoMTApO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBmaW5kIGFuIGVsZW1lbnQgd2l0aCBhIGxvbmcgY2hhaW4gb2YgbWV0aG9kcycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgZWwgPSBhd2FpdCBkcml2ZXIuZWxlbWVudEJ5QW5kcm9pZFVJQXV0b21hdG9yKCduZXcgVWlTZWxlY3RvcigpLmNsaWNrYWJsZSh0cnVlKS5jbGFzc05hbWUoYW5kcm9pZC53aWRnZXQuVGV4dFZpZXcpLmluZGV4KDEpJyk7XG4gICAgYXdhaXQgZWwudGV4dCgpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdBY2Nlc3NpYmlsaXR5Jyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgYW4gZWxlbWVudCB3aXRoIHJlY3Vyc2l2ZSBVaVNlbGVjdG9ycycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIuZWxlbWVudHNCeUFuZHJvaWRVSUF1dG9tYXRvcignbmV3IFVpU2VsZWN0b3IoKS5jaGlsZFNlbGVjdG9yKG5ldyBVaVNlbGVjdG9yKCkuY2xpY2thYmxlKHRydWUpKS5mb2N1c2VkKHRydWUpJylcbiAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5oYXZlLmxlbmd0aCgxKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgbm90IGZpbmQgYW4gZWxlbWVudCB3aGljaCBkb2VzIG5vdCBleGlzdCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIuc2V0SW1wbGljaXRXYWl0VGltZW91dCgxMDAwKTsgLy8gZXhwZWN0IHRoaXMgdG8gZmFpbCwgc28gbm8gbmVlZCB0byB3YWl0IHRvbyBsb25nXG4gICAgYXdhaXQgZHJpdmVyLmVsZW1lbnRzQnlBbmRyb2lkVUlBdXRvbWF0b3IoJ25ldyBVaVNlbGVjdG9yKCkuZGVzY3JpcHRpb24oXCJjaHVja3d1ZGlcIiknKVxuICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmhhdmUubGVuZ3RoKDApO1xuICAgIGF3YWl0IGRyaXZlci5zZXRJbXBsaWNpdFdhaXRUaW1lb3V0KDIwMDAwKTsgLy8gcmVzdG9yZSBpbXBsaWNpdCB3YWl0XG4gIH0pO1xuICBpdCgnc2hvdWxkIGFsbG93IG11bHRpcGxlIHNlbGVjdG9yIHN0YXRlbWVudHMgYW5kIHJldHVybiB0aGUgVW5pb24gb2YgdGhlIHR3byBzZXRzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBjbGlja2FibGVFbHMgPSBhd2FpdCBkcml2ZXIuZWxlbWVudHNCeUFuZHJvaWRVSUF1dG9tYXRvcignbmV3IFVpU2VsZWN0b3IoKS5jbGlja2FibGUodHJ1ZSknKTtcbiAgICBjbGlja2FibGVFbHMubGVuZ3RoLnNob3VsZC5iZS5hYm92ZSgwKTtcbiAgICBsZXQgbm90Q2xpY2thYmxlRWxzID0gYXdhaXQgZHJpdmVyLmVsZW1lbnRzQnlBbmRyb2lkVUlBdXRvbWF0b3IoJ25ldyBVaVNlbGVjdG9yKCkuY2xpY2thYmxlKGZhbHNlKScpO1xuICAgIG5vdENsaWNrYWJsZUVscy5sZW5ndGguc2hvdWxkLmJlLmFib3ZlKDApO1xuICAgIGxldCBib3RoID0gYXdhaXQgZHJpdmVyLmVsZW1lbnRzQnlBbmRyb2lkVUlBdXRvbWF0b3IoJ25ldyBVaVNlbGVjdG9yKCkuY2xpY2thYmxlKHRydWUpOyBuZXcgVWlTZWxlY3RvcigpLmNsaWNrYWJsZShmYWxzZSk7Jyk7XG4gICAgYm90aC5zaG91bGQuaGF2ZS5sZW5ndGgoY2xpY2thYmxlRWxzLmxlbmd0aCArIG5vdENsaWNrYWJsZUVscy5sZW5ndGgpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBhbGxvdyBtdWx0aXBsZSBzZWxlY3RvciBzdGF0ZW1lbnRzIGFuZCByZXR1cm4gdGhlIFVuaW9uIG9mIHRoZSB0d28gc2V0cycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgY2xpY2thYmxlRWxzID0gYXdhaXQgZHJpdmVyLmVsZW1lbnRzQnlBbmRyb2lkVUlBdXRvbWF0b3IoJ25ldyBVaVNlbGVjdG9yKCkuY2xpY2thYmxlKHRydWUpJyk7XG4gICAgY2xpY2thYmxlRWxzLmxlbmd0aC5zaG91bGQuYmUuYWJvdmUoMCk7XG4gICAgbGV0IGNsaWNrYWJsZUNsaWNrYWJsZUVsID0gYXdhaXQgZHJpdmVyLmVsZW1lbnRzQnlBbmRyb2lkVUlBdXRvbWF0b3IoJ25ldyBVaVNlbGVjdG9yKCkuY2xpY2thYmxlKHRydWUpOyBuZXcgVWlTZWxlY3RvcigpLmNsaWNrYWJsZSh0cnVlKTsnKTtcbiAgICBjbGlja2FibGVDbGlja2FibGVFbC5sZW5ndGguc2hvdWxkLmJlLmFib3ZlKDApO1xuICAgIGNsaWNrYWJsZUNsaWNrYWJsZUVsLnNob3VsZC5oYXZlLmxlbmd0aChjbGlja2FibGVFbHMubGVuZ3RoKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCBhbiBlbGVtZW50IGluIHRoZSBzZWNvbmQgc2VsZWN0b3IgaWYgdGhlIGZpcnN0IGZpbmRzIG5vIGVsZW1lbnRzICh3aGVuIGZpbmRpbmcgbXVsdGlwbGUgZWxlbWVudHMpJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBzZWxlY3RvciA9ICduZXcgVWlTZWxlY3RvcigpLmNsYXNzTmFtZShcIm5vdC5hLmNsYXNzXCIpOyBuZXcgVWlTZWxlY3RvcigpLmNsYXNzTmFtZShcImFuZHJvaWQud2lkZ2V0LlRleHRWaWV3XCIpJztcbiAgICBjb25zdCBlbHMgPSBhd2FpdCBkcml2ZXIuZWxlbWVudHNCeUFuZHJvaWRVSUF1dG9tYXRvcihzZWxlY3Rvcik7XG4gICAgZWxzLmxlbmd0aC5zaG91bGQuYmUuYWJvdmUoMCk7XG4gIH0pO1xuICBpdC5za2lwKCdzaG91bGQgZmluZCBhbiBlbGVtZW50IGluIHRoZSBzZWNvbmQgc2VsZWN0b3IgaWYgdGhlIGZpcnN0IGZpbmRzIG5vIGVsZW1lbnRzICh3aGVuIGZpbmRpbmcgYSBzaW5nbGUgZWxlbWVudCknLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgLy8gVE9ETzogVGhpcyB0ZXN0IGlzIGJyb2tlbi5cbiAgICAvLyAgKiBUaGUgdGVzdCBhYm92ZSB0aGlzIG9uZSB3b3JrcyBhbmQgaXQgcHJveGllcyB0byAnUE9TVCAvZWxlbWVudHMnLlxuICAgIC8vICAqIFRoaXMgdGVzdCBkb2Vzbid0IHdvcmsgYW5kIHRoZSBvbmx5IGRpZmZlcmVuY2UgaXMgdGhhdCBpdCBwcm94aWVzIHRvICdQT1NUIC9lbGVtZW50J1xuICAgIC8vICAoc2VlIGZpbmQuanMgZm9yIHJlZmVyZW5jZSlcbiAgICBsZXQgc2VsZWN0b3IgPSAnbmV3IFVpU2VsZWN0b3IoKS5jbGFzc05hbWUoXCJub3QuYS5jbGFzc1wiKTsgbmV3IFVpU2VsZWN0b3IoKS5jbGFzc05hbWUoXCJhbmRyb2lkLndpZGdldC5UZXh0Vmlld1wiKSc7XG4gICAgYXdhaXQgZHJpdmVyLmVsZW1lbnRCeUFuZHJvaWRVSUF1dG9tYXRvcihzZWxlY3Rvcikuc2hvdWxkLmV2ZW50dWFsbHkuZXhpc3Q7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHNjcm9sbCB0bywgYW5kIHJldHVybiBlbGVtZW50cyB1c2luZyBVaVNjcm9sbGFibGUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLnN0YXJ0QWN0aXZpdHkoe2FwcFBhY2thZ2U6ICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJywgYXBwQWN0aXZpdHk6ICcudmlldy5MaXN0MSd9KTtcbiAgICBsZXQgc2VsZWN0b3IgPSAnbmV3IFVpU2Nyb2xsYWJsZShuZXcgVWlTZWxlY3RvcigpLnNjcm9sbGFibGUodHJ1ZSkuaW5zdGFuY2UoMCkpLnNjcm9sbEludG9WaWV3KG5ldyBVaVNlbGVjdG9yKCkudGV4dChcIkJlZXIgQ2hlZXNlXCIpLmluc3RhbmNlKDApKSc7XG4gICAgbGV0IGVsID0gYXdhaXQgZHJpdmVyLmVsZW1lbnRCeUFuZHJvaWRVSUF1dG9tYXRvcihzZWxlY3Rvcik7XG4gICAgYXdhaXQgZWwudGV4dCgpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdCZWVyIENoZWVzZScpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBhbGxvdyBjaGFpbmluZyBVaVNjcm9sbGFibGUgbWV0aG9kcycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIuc3RhcnRBY3Rpdml0eSh7YXBwUGFja2FnZTogJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnLCBhcHBBY3Rpdml0eTogJy52aWV3Lkxpc3QxJ30pO1xuICAgIGxldCBzZWxlY3RvciA9ICduZXcgVWlTY3JvbGxhYmxlKG5ldyBVaVNlbGVjdG9yKCkuc2Nyb2xsYWJsZSh0cnVlKS5pbnN0YW5jZSgwKSkuc2V0TWF4U2VhcmNoU3dpcGVzKDExKS5zY3JvbGxJbnRvVmlldyhuZXcgVWlTZWxlY3RvcigpLnRleHQoXCJCZWVyIENoZWVzZVwiKS5pbnN0YW5jZSgwKSknO1xuICAgIGxldCBlbCA9IGF3YWl0IGRyaXZlci5lbGVtZW50QnlBbmRyb2lkVUlBdXRvbWF0b3Ioc2VsZWN0b3IpO1xuICAgIGF3YWl0IGVsLnRleHQoKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCgnQmVlciBDaGVlc2UnKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgYWxsb3cgVWlTY3JvbGxhYmxlIHNjcm9sbEludG9WaWV3JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5zdGFydEFjdGl2aXR5KHthcHBQYWNrYWdlOiAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcycsIGFwcEFjdGl2aXR5OiAnLnZpZXcuTGlzdDEnfSk7XG4gICAgbGV0IHNlbGVjdG9yID0gJ25ldyBVaVNjcm9sbGFibGUobmV3IFVpU2VsZWN0b3IoKS5zY3JvbGxhYmxlKHRydWUpLmluc3RhbmNlKDApKS5zY3JvbGxJbnRvVmlldyhuZXcgVWlTZWxlY3RvcigpLnRleHQoXCJCZWVyIENoZWVzZVwiKS5pbnN0YW5jZSgwKSk7JztcbiAgICBsZXQgZWwgPSBhd2FpdCBkcml2ZXIuZWxlbWVudEJ5QW5kcm9pZFVJQXV0b21hdG9yKHNlbGVjdG9yKTtcbiAgICBhd2FpdCBlbC50ZXh0KCkuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwoJ0JlZXIgQ2hlZXNlJyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGFsbG93IFVpU2Nyb2xsYWJsZSB3aXRoIHVuaWNvZGUgc3RyaW5nJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5zdGFydEFjdGl2aXR5KHthcHBQYWNrYWdlOiAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcycsIGFwcEFjdGl2aXR5OiAnLnRleHQuVW5pY29kZSd9KTtcbiAgICBsZXQgc2VsZWN0b3IgPSAnbmV3IFVpU2VsZWN0b3IoKS50ZXh0KFwi2LnYsdio2YpcIikuaW5zdGFuY2UoMCk7JztcbiAgICBsZXQgZWwgPSBhd2FpdCBkcml2ZXIuZWxlbWVudEJ5QW5kcm9pZFVJQXV0b21hdG9yKHNlbGVjdG9yKTtcbiAgICBhd2FpdCBlbC50ZXh0KCkuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwoJ9i52LHYqNmKJyk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uIn0=
