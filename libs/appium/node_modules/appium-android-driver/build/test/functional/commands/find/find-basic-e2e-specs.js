'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../../../..');

var _2 = _interopRequireDefault(_);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var _desired = require('../../desired');

var _desired2 = _interopRequireDefault(_desired);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('Find - basic', function () {
  var driver = undefined;
  var singleResourceId = undefined;
  before(function callee$1$0() {
    var adb;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          driver = new _2['default']();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.createSession(_desired2['default']));

        case 3:
          adb = new _appiumAdb2['default']({});
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(adb.getApiLevel());

        case 6:
          context$2$0.t0 = context$2$0.sent;

          if (!(context$2$0.t0 >= 21)) {
            context$2$0.next = 11;
            break;
          }

          context$2$0.t1 = 'decor_content_parent';
          context$2$0.next = 12;
          break;

        case 11:
          context$2$0.t1 = 'home';

        case 12:
          singleResourceId = context$2$0.t1;

        case 13:
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
  it('should find a single element by content-description', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElement('accessibility id', 'Animation'));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('Animation'));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find an element by class name', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElement('class name', 'android.widget.TextView'));

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
  it('should find multiple elements by class name', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElements('class name', 'android.widget.TextView').should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should not find an element that doesnt exist', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElement('class name', 'blargimarg').should.be.rejectedWith(/could not be located/));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should not find multiple elements that doesnt exist', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElements('class name', 'blargimarg').should.eventually.have.length(0));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should fail on empty locator', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElements('class name', '').should.be.rejectedWith(/selector/));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find a single element by string id @skip-android-all', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElement('id', 'activity_sample_code'));

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
  it('should find a single element by resource-id', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElement('id', 'android:id/' + singleResourceId).should.eventually.exist);

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find multiple elements by resource-id', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElements('id', 'android:id/text1').should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find multiple elements by resource-id even when theres just one', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElements('id', 'android:id/' + singleResourceId).should.eventually.have.length(1));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find a single element by resource-id with implicit package', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElement('id', singleResourceId).should.eventually.exist);

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find a single element by resource-id with implicit package', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElements('id', 'text1').should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should find multiple elements by resource-id with implicit package even when theres just one', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElements('id', singleResourceId).should.eventually.have.length(1));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  describe('implicit wait', function () {
    var implicitWait = 5000;
    before(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.implicitWait(implicitWait));

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should respect implicit wait with multiple elements', function callee$2$0() {
      var beforeMs, afterMs;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            beforeMs = Date.now();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.findElements('id', 'there_is_nothing_called_this').should.eventually.have.length(0));

          case 3:
            afterMs = Date.now();

            (afterMs - beforeMs).should.be.below(implicitWait + 5000);
            (afterMs - beforeMs).should.be.above(implicitWait);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should respect implicit wait with a single element', function callee$2$0() {
      var beforeMs, afterMs;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            beforeMs = Date.now();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.findElement('id', 'there_is_nothing_called_this').should.eventually.be.rejectedWith(/could not be located/));

          case 3:
            afterMs = Date.now();

            (afterMs - beforeMs).should.be.below(implicitWait + 5000);
            (afterMs - beforeMs).should.be.above(implicitWait);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});

// the app behaves differently on different api levels when it comes to
// which resource ids are available for testing, so we switch here to make
// sure we're using the right resource id below
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9maW5kL2ZpbmQtYmFzaWMtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQ25CLGFBQWE7Ozs7eUJBQ3ZCLFlBQVk7Ozs7dUJBQ0gsZUFBZTs7OztBQUd4QyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLFFBQVEsQ0FBQyxjQUFjLEVBQUUsWUFBWTtBQUNuQyxNQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsTUFBSSxnQkFBZ0IsWUFBQSxDQUFDO0FBQ3JCLFFBQU0sQ0FBQztRQUdELEdBQUc7Ozs7QUFGUCxnQkFBTSxHQUFHLG1CQUFtQixDQUFDOzsyQ0FDdkIsTUFBTSxDQUFDLGFBQWEsc0JBQWM7OztBQUNwQyxhQUFHLEdBQUcsMkJBQVEsRUFBRSxDQUFDOzsyQ0FJSSxHQUFHLENBQUMsV0FBVyxFQUFFOzs7OztrQ0FBSSxFQUFFOzs7OzsyQkFBRyxzQkFBc0I7Ozs7OzJCQUFHLE1BQU07OztBQUFsRiwwQkFBZ0I7Ozs7Ozs7R0FDakIsQ0FBQyxDQUFDO0FBQ0gsT0FBSyxDQUFDOzs7OzsyQ0FDRSxNQUFNLENBQUMsYUFBYSxFQUFFOzs7Ozs7O0dBQzdCLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyxxREFBcUQsRUFBRTtRQUNwRCxFQUFFOzs7OzsyQ0FBUyxNQUFNLENBQUMsV0FBVyxDQUFDLGtCQUFrQixFQUFFLFdBQVcsQ0FBQzs7O0FBQTlELFlBQUU7OzJDQUNBLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7Ozs7OztHQUN0RSxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsc0NBQXNDLEVBQUU7UUFDckMsRUFBRTs7Ozs7MkNBQVMsTUFBTSxDQUFDLFdB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Qzs7O0FBQ3hELG1CQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRTs7QUFDeEIsYUFBQyxPQUFPLEdBQUcsUUFBUSxDQUFBLENBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQzFELGFBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQSxDQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDOzs7Ozs7O0tBQ3BELENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvY29tbWFuZHMvZmluZC9maW5kLWJhc2ljLWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4vLi4vLi4nO1xuaW1wb3J0IEFEQiBmcm9tICdhcHBpdW0tYWRiJztcbmltcG9ydCBERUZBVUxUX0NBUFMgZnJvbSAnLi4vLi4vZGVzaXJlZCc7XG5cblxuY2hhaS5zaG91bGQoKTtcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcblxuZGVzY3JpYmUoJ0ZpbmQgLSBiYXNpYycsIGZ1bmN0aW9uICgpIHtcbiAgbGV0IGRyaXZlcjtcbiAgbGV0IHNpbmdsZVJlc291cmNlSWQ7XG4gIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihERUZBVUxUX0NBUFMpO1xuICAgIGxldCBhZGIgPSBuZXcgQURCKHt9KTtcbiAgICAvLyB0aGUgYXBwIGJlaGF2ZXMgZGlmZmVyZW50bHkgb24gZGlmZmVyZW50IGFwaSBsZXZlbHMgd2hlbiBpdCBjb21lcyB0b1xuICAgIC8vIHdoaWNoIHJlc291cmNlIGlkcyBhcmUgYXZhaWxhYmxlIGZvciB0ZXN0aW5nLCBzbyB3ZSBzd2l0Y2ggaGVyZSB0byBtYWtlXG4gICAgLy8gc3VyZSB3ZSdyZSB1c2luZyB0aGUgcmlnaHQgcmVzb3VyY2UgaWQgYmVsb3dcbiAgICBzaW5nbGVSZXNvdXJjZUlkID0gYXdhaXQgYWRiLmdldEFwaUxldmVsKCkgPj0gMjEgPyAnZGVjb3JfY29udGVudF9wYXJlbnQnIDogJ2hvbWUnO1xuICB9KTtcbiAgYWZ0ZXIoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgYSBzaW5nbGUgZWxlbWVudCBieSBjb250ZW50LWRlc2NyaXB0aW9uJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBlbCA9IGF3YWl0IGRyaXZlci5maW5kRWxlbWVudCgnYWNjZXNzaWJpbGl0eSBpZCcsICdBbmltYXRpb24nKTtcbiAgICBhd2FpdCBkcml2ZXIuZ2V0VGV4dChlbC5FTEVNRU5UKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCgnQW5pbWF0aW9uJyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgYW4gZWxlbWVudCBieSBjbGFzcyBuYW1lJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGxldCBlbCA9IGF3YWl0IGRyaXZlci5maW5kRWxlbWVudCgnY2xhc3MgbmFtZScsICdhbmRyb2lkLndpZGdldC5UZXh0VmlldycpO1xuICAgIGF3YWl0IGRyaXZlci5nZXRUZXh0KGVsLkVMRU1FTlQpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdBUEkgRGVtb3MnKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCBtdWx0aXBsZSBlbGVtZW50cyBieSBjbGFzcyBuYW1lJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5maW5kRWxlbWVudHMoJ2NsYXNzIG5hbWUnLCAnYW5kcm9pZC53aWRnZXQuVGV4dFZpZXcnKVxuICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmhhdmUubGVuZ3RoLmF0LmxlYXN0KDEwKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgbm90IGZpbmQgYW4gZWxlbWVudCB0aGF0IGRvZXNudCBleGlzdCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIuZmluZEVsZW1lbnQoJ2NsYXNzIG5hbWUnLCAnYmxhcmdpbWFyZycpXG4gICAgICAuc2hvdWxkLmJlLnJlamVjdGVkV2l0aCgvY291bGQgbm90IGJlIGxvY2F0ZWQvKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgbm90IGZpbmQgbXVsdGlwbGUgZWxlbWVudHMgdGhhdCBkb2VzbnQgZXhpc3QnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbGVtZW50cygnY2xhc3MgbmFtZScsICdibGFyZ2ltYXJnJylcbiAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5oYXZlLmxlbmd0aCgwKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmFpbCBvbiBlbXB0eSBsb2NhdG9yJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5maW5kRWxlbWVudHMoJ2NsYXNzIG5hbWUnLCAnJykuc2hvdWxkLmJlLnJlamVjdGVkV2l0aCgvc2VsZWN0b3IvKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCBhIHNpbmdsZSBlbGVtZW50IGJ5IHN0cmluZyBpZCBAc2tpcC1hbmRyb2lkLWFsbCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgZWwgPSBhd2FpdCBkcml2ZXIuZmluZEVsZW1lbnQoJ2lkJywgJ2FjdGl2aXR5X3NhbXBsZV9jb2RlJyk7XG4gICAgYXdhaXQgZHJpdmVyLmdldFRleHQoZWwuRUxFTUVOVCkuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwoJ0FQSSBEZW1vcycpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBmaW5kIGEgc2luZ2xlIGVsZW1lbnQgYnkgcmVzb3VyY2UtaWQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbGVtZW50KCdpZCcsIGBhbmRyb2lkOmlkLyR7c2luZ2xlUmVzb3VyY2VJZH1gKVxuICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmV4aXN0O1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBmaW5kIG11bHRpcGxlIGVsZW1lbnRzIGJ5IHJlc291cmNlLWlkJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5maW5kRWxlbWVudHMoJ2lkJywgJ2FuZHJvaWQ6aWQvdGV4dDEnKVxuICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmhhdmUubGVuZ3RoLmF0LmxlYXN0KDEwKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCBtdWx0aXBsZSBlbGVtZW50cyBieSByZXNvdXJjZS1pZCBldmVuIHdoZW4gdGhlcmVzIGp1c3Qgb25lJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5maW5kRWxlbWVudHMoJ2lkJywgYGFuZHJvaWQ6aWQvJHtzaW5nbGVSZXNvdXJjZUlkfWApXG4gICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuaGF2ZS5sZW5ndGgoMSk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgYSBzaW5nbGUgZWxlbWVudCBieSByZXNvdXJjZS1pZCB3aXRoIGltcGxpY2l0IHBhY2thZ2UnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbGVtZW50KCdpZCcsIHNpbmdsZVJlc291cmNlSWQpXG4gICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuZXhpc3Q7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgYSBzaW5nbGUgZWxlbWVudCBieSByZXNvdXJjZS1pZCB3aXRoIGltcGxpY2l0IHBhY2thZ2UnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbGVtZW50cygnaWQnLCAndGV4dDEnKVxuICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmhhdmUubGVuZ3RoLmF0LmxlYXN0KDEwKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCBtdWx0aXBsZSBlbGVtZW50cyBieSByZXNvdXJjZS1pZCB3aXRoIGltcGxpY2l0IHBhY2thZ2UgZXZlbiB3aGVuIHRoZXJlcyBqdXN0IG9uZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIuZmluZEVsZW1lbnRzKCdpZCcsIHNpbmdsZVJlc291cmNlSWQpXG4gICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuaGF2ZS5sZW5ndGgoMSk7XG4gIH0pO1xuICBkZXNjcmliZSgnaW1wbGljaXQgd2FpdCcsIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgaW1wbGljaXRXYWl0ID0gNTAwMDtcbiAgICBiZWZvcmUoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgYXdhaXQgZHJpdmVyLmltcGxpY2l0V2FpdChpbXBsaWNpdFdhaXQpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgcmVzcGVjdCBpbXBsaWNpdCB3YWl0IHdpdGggbXVsdGlwbGUgZWxlbWVudHMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgYmVmb3JlTXMgPSBEYXRlLm5vdygpO1xuICAgICAgYXdhaXQgZHJpdmVyLmZpbmRFbGVtZW50cygnaWQnLCAndGhlcmVfaXNfbm90aGluZ19jYWxsZWRfdGhpcycpXG4gICAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5oYXZlLmxlbmd0aCgwKTtcbiAgICAgIGxldCBhZnRlck1zID0gRGF0ZS5ub3coKTtcbiAgICAgIChhZnRlck1zIC0gYmVmb3JlTXMpLnNob3VsZC5iZS5iZWxvdyhpbXBsaWNpdFdhaXQgKyA1MDAwKTtcbiAgICAgIChhZnRlck1zIC0gYmVmb3JlTXMpLnNob3VsZC5iZS5hYm92ZShpbXBsaWNpdFdhaXQpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgcmVzcGVjdCBpbXBsaWNpdCB3YWl0IHdpdGggYSBzaW5nbGUgZWxlbWVudCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBiZWZvcmVNcyA9IERhdGUubm93KCk7XG4gICAgICBhd2FpdCBkcml2ZXIuZmluZEVsZW1lbnQoJ2lkJywgJ3RoZXJlX2lzX25vdGhpbmdfY2FsbGVkX3RoaXMnKVxuICAgICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKC9jb3VsZCBub3QgYmUgbG9jYXRlZC8pO1xuICAgICAgbGV0IGFmdGVyTXMgPSBEYXRlLm5vdygpO1xuICAgICAgKGFmdGVyTXMgLSBiZWZvcmVNcykuc2hvdWxkLmJlLmJlbG93KGltcGxpY2l0V2FpdCArIDUwMDApO1xuICAgICAgKGFmdGVyTXMgLSBiZWZvcmVNcykuc2hvdWxkLmJlLmFib3ZlKGltcGxpY2l0V2FpdCk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uIn0=
