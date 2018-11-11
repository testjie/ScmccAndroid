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

var _desired2 = _interopRequireDefault(_desired);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var atv = 'android.widget.TextView';
var f = "android.widget.FrameLayout";

describe('Find - xpath', function () {
  var driver = undefined;
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          driver = new _2['default']();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.createSession(_desired2['default']));

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
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.deleteSession());

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should throw when matching nothing', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElement('xpath', '//whatthat').should.eventually.be.rejectedWith(/could not be located/));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should throw with status 7 for hierarchy root', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElement('xpath', '/*').should.eventually.be.rejectedWith(/could not be located/));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find element by type', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElement('xpath', '//' + atv));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('API Demos'));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find element by text', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElement('xpath', '//' + atv + '[@text=\'Accessibility\']'));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('Accessibility'));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find exactly one element via elementsByXPath', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElements('xpath', '//' + atv + '[@text=\'Accessibility\']'));

        case 2:
          el = context$2$0.sent;

          el.length.should.equal(1);
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.getText(el[0].ELEMENT).should.eventually.equal('Accessibility'));

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find element by partial text', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElement('xpath', '//' + atv + '[contains(@text, \'Accessibility\')]'));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('Accessibility'));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find the last element', function callee$1$0() {
    var el, text;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElement('xpath', '(//' + atv + ')[last()]'));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT));

        case 5:
          text = context$2$0.sent;

          ["OS", "Text", "Views", "Preference"].should.include(text);

        case 7:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  // TODO: Doesn't work on CI. Works locally on API_LEVEL 23
  //it('should find element by xpath index and child @skip-ci', async () => {
  // let alv = 'android.widget.ListView';
  // let el = await driver.findElement('xpath', `//${f}[2]/${alv}[1]/${atv}[4]`);
  // await driver.getText(el.ELEMENT).should.eventually.equal('App');
  //});

  it('should find element by index and embedded desc', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElement('xpath', '//' + f + '//' + atv + '[5]'));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('Content'));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find all elements', function callee$1$0() {
    var els;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElements('xpath', '//*'));

        case 2:
          els = context$2$0.sent;

          els.length.should.be.above(2);

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find the first element when searching for all elements', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElements('xpath', '//*'));

        case 2:
          el = context$2$0.sent;

          el[0].should.exist;

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find less elements with compression turned on', function callee$1$0() {
    var elementsWithoutCompression, elementsWithCompression;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.updateSettings({ ignoreUnimportantViews: false }));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.findElements('xpath', '//*'));

        case 4:
          elementsWithoutCompression = context$2$0.sent;
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(driver.updateSettings({ ignoreUnimportantViews: true }));

        case 7:
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(driver.findElements('xpath', '//*'));

        case 9:
          elementsWithCompression = context$2$0.sent;

          elementsWithoutCompression.length.should.be.greaterThan(elementsWithCompression.length);

        case 11:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9maW5kL2J5LXhwYXRoLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O2dCQUNuQixhQUFhOzs7O3VCQUNkLGVBQWU7Ozs7QUFHeEMsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixJQUFNLEdBQUcsR0FBRyx5QkFBeUIsQ0FBQztBQUN0QyxJQUFNLENBQUMsR0FBRyw0QkFBNEIsQ0FBQzs7QUFFdkMsUUFBUSxDQUFDLGNBQWMsRUFBRSxZQUFZO0FBQ25DLE1BQUksTUFBTSxZQUFBLENBQUM7QUFDWCxRQUFNLENBQUM7Ozs7QUFDTCxnQkFBTSxHQUFHLG1CQUFtQixDQUFDOzsyQ0FDdkIsTUFBTSxDQUFDLGFBQWEsc0JBQWM7Ozs7Ozs7R0FDekMsQ0FBQyxDQUFDO0FBQ0gsT0FBSyxDQUFDOzs7OzsyQ0FDRSxNQUFNLENBQUMsYUFBYSxFQUFFOzs7Ozs7O0dBQzdCLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyxvQ0FBb0MsRUFBRTs7Ozs7MkNBQ2pDLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQzs7Ozs7OztHQUMxRyxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsK0NBQStDLEVBQUU7Ozs7OzJDQUM1QyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQUM7Ozs7Ozs7R0FDbEcsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLDZCQUE2QixFQUFFO1FBQzVCLEVBQUU7Ozs7OzJDQUFTLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxT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QU0sQ0FBQyxjQUFjLENBQUMsRUFBQyxzQkFBc0IsRUFBRSxLQUFLLEVBQUMsQ0FBQzs7OzsyQ0FDckIsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLFFBQVE7OztBQUF0RSxvQ0FBMEI7OzJDQUN4QixNQUFNLENBQUMsY0FBYyxDQUFDLEVBQUMsc0JBQXNCLEVBQUUsSUFBSSxFQUFDLENBQUM7Ozs7MkNBQ3ZCLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxRQUFROzs7QUFBbkUsaUNBQXVCOztBQUMzQixvQ0FBMEIsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7Ozs7R0FDekYsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9maW5kL2J5LXhwYXRoLWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4vLi4vLi4nO1xuaW1wb3J0IERFRkFVTFRfQ0FQUyBmcm9tICcuLi8uLi9kZXNpcmVkJztcblxuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5jb25zdCBhdHYgPSAnYW5kcm9pZC53aWRnZXQuVGV4dFZpZXcnO1xuY29uc3QgZiA9IFwiYW5kcm9pZC53aWRnZXQuRnJhbWVMYXlvdXRcIjtcblxuZGVzY3JpYmUoJ0ZpbmQgLSB4cGF0aCcsIGZ1bmN0aW9uICgpIHtcbiAgbGV0IGRyaXZlcjtcbiAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKERFRkFVTFRfQ0FQUyk7XG4gIH0pO1xuICBhZnRlcihhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgdGhyb3cgd2hlbiBtYXRjaGluZyBub3RoaW5nJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5maW5kRWxlbWVudCgneHBhdGgnLCAnLy93aGF0dGhhdCcpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgvY291bGQgbm90IGJlIGxvY2F0ZWQvKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgdGhyb3cgd2l0aCBzdGF0dXMgNyBmb3IgaGllcmFyY2h5IHJvb3QnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbGVtZW50KCd4cGF0aCcsICcvKicpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgvY291bGQgbm90IGJlIGxvY2F0ZWQvKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCBlbGVtZW50IGJ5IHR5cGUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGVsID0gYXdhaXQgZHJpdmVyLmZpbmRFbGVtZW50KCd4cGF0aCcsIGAvLyR7YXR2fWApO1xuICAgIGF3YWl0IGRyaXZlci5nZXRUZXh0KGVsLkVMRU1FTlQpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdBUEkgRGVtb3MnKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCBlbGVtZW50IGJ5IHRleHQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGVsID0gYXdhaXQgZHJpdmVyLmZpbmRFbGVtZW50KCd4cGF0aCcsIGAvLyR7YXR2fVtAdGV4dD0nQWNjZXNzaWJpbGl0eSddYCk7XG4gICAgYXdhaXQgZHJpdmVyLmdldFRleHQoZWwuRUxFTUVOVCkuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwoJ0FjY2Vzc2liaWxpdHknKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCBleGFjdGx5IG9uZSBlbGVtZW50IHZpYSBlbGVtZW50c0J5WFBhdGgnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGVsID0gYXdhaXQgZHJpdmVyLmZpbmRFbGVtZW50cygneHBhdGgnLCBgLy8ke2F0dn1bQHRleHQ9J0FjY2Vzc2liaWxpdHknXWApO1xuICAgIGVsLmxlbmd0aC5zaG91bGQuZXF1YWwoMSk7XG4gICAgYXdhaXQgZHJpdmVyLmdldFRleHQoZWxbMF0uRUxFTUVOVCkuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwoJ0FjY2Vzc2liaWxpdHknKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCBlbGVtZW50IGJ5IHBhcnRpYWwgdGV4dCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgZWwgPSBhd2FpdCBkcml2ZXIuZmluZEVsZW1lbnQoJ3hwYXRoJywgYC8vJHthdHZ9W2NvbnRhaW5zKEB0ZXh0LCAnQWNjZXNzaWJpbGl0eScpXWApO1xuICAgIGF3YWl0IGRyaXZlci5nZXRUZXh0KGVsLkVMRU1FTlQpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdBY2Nlc3NpYmlsaXR5Jyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgdGhlIGxhc3QgZWxlbWVudCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgZWwgPSBhd2FpdCBkcml2ZXIuZmluZEVsZW1lbnQoJ3hwYXRoJywgYCgvLyR7YXR2fSlbbGFzdCgpXWApO1xuICAgIGxldCB0ZXh0ID0gYXdhaXQgZHJpdmVyLmdldFRleHQoZWwuRUxFTUVOVCk7XG4gICAgW1wiT1NcIiwgXCJUZXh0XCIsIFwiVmlld3NcIiwgXCJQcmVmZXJlbmNlXCJdLnNob3VsZC5pbmNsdWRlKHRleHQpO1xuICB9KTtcblxuICAvLyBUT0RPOiBEb2Vzbid0IHdvcmsgb24gQ0kuIFdvcmtzIGxvY2FsbHkgb24gQVBJX0xFVkVMIDIzXG4gIC8vaXQoJ3Nob3VsZCBmaW5kIGVsZW1lbnQgYnkgeHBhdGggaW5kZXggYW5kIGNoaWxkIEBza2lwLWNpJywgYXN5bmMgKCkgPT4ge1xuICAgIC8vIGxldCBhbHYgPSAnYW5kcm9pZC53aWRnZXQuTGlzdFZpZXcnO1xuICAgIC8vIGxldCBlbCA9IGF3YWl0IGRyaXZlci5maW5kRWxlbWVudCgneHBhdGgnLCBgLy8ke2Z9WzJdLyR7YWx2fVsxXS8ke2F0dn1bNF1gKTtcbiAgICAvLyBhd2FpdCBkcml2ZXIuZ2V0VGV4dChlbC5FTEVNRU5UKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCgnQXBwJyk7XG4gIC8vfSk7XG5cbiAgaXQoJ3Nob3VsZCBmaW5kIGVsZW1lbnQgYnkgaW5kZXggYW5kIGVtYmVkZGVkIGRlc2MnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGVsID0gYXdhaXQgZHJpdmVyLmZpbmRFbGVtZW50KCd4cGF0aCcsIGAvLyR7Zn0vLyR7YXR2fVs1XWApO1xuICAgIGF3YWl0IGRyaXZlci5nZXRUZXh0KGVsLkVMRU1FTlQpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdDb250ZW50Jyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgYWxsIGVsZW1lbnRzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBlbHMgPSBhd2FpdCBkcml2ZXIuZmluZEVsZW1lbnRzKCd4cGF0aCcsIGAvLypgKTtcbiAgICBlbHMubGVuZ3RoLnNob3VsZC5iZS5hYm92ZSgyKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCB0aGUgZmlyc3QgZWxlbWVudCB3aGVuIHNlYXJjaGluZyBmb3IgYWxsIGVsZW1lbnRzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBlbCA9IGF3YWl0IGRyaXZlci5maW5kRWxlbWVudHMoJ3hwYXRoJywgYC8vKmApO1xuICAgIGVsWzBdLnNob3VsZC5leGlzdDtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCBsZXNzIGVsZW1lbnRzIHdpdGggY29tcHJlc3Npb24gdHVybmVkIG9uJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci51cGRhdGVTZXR0aW5ncyh7aWdub3JlVW5pbXBvcnRhbnRWaWV3czogZmFsc2V9KTtcbiAgICBsZXQgZWxlbWVudHNXaXRob3V0Q29tcHJlc3Npb24gPSBhd2FpdCBkcml2ZXIuZmluZEVsZW1lbnRzKCd4cGF0aCcsIGAvLypgKTtcbiAgICBhd2FpdCBkcml2ZXIudXBkYXRlU2V0dGluZ3Moe2lnbm9yZVVuaW1wb3J0YW50Vmlld3M6IHRydWV9KTtcbiAgICBsZXQgZWxlbWVudHNXaXRoQ29tcHJlc3Npb24gPSBhd2FpdCBkcml2ZXIuZmluZEVsZW1lbnRzKCd4cGF0aCcsIGAvLypgKTtcbiAgICBlbGVtZW50c1dpdGhvdXRDb21wcmVzc2lvbi5sZW5ndGguc2hvdWxkLmJlLmdyZWF0ZXJUaGFuKGVsZW1lbnRzV2l0aENvbXByZXNzaW9uLmxlbmd0aCk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uIn0=
