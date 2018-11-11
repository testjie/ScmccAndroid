'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _desired = require('../../desired');

var _helpersSession = require('../../helpers/session');

var _asyncbox = require('asyncbox');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var textFieldsActivity = '.view.TextFields';

describe('element', function () {
  var driver = undefined;
  var el = undefined;
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(_Object$assign({}, _desired.APIDEMOS_CAPS, { appActivity: textFieldsActivity })));

        case 2:
          driver = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(5, 1000, function callee$2$0() {
            var els;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(driver.elementsByClassName('android.widget.EditText'));

                case 2:
                  els = context$3$0.sent;

                  els.should.have.length.at.least(1);
                  return context$3$0.abrupt('return', _lodash2['default'].last(els));

                case 5:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          }));

        case 5:
          el = context$2$0.sent;

        case 6:
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

  describe('setValue', function () {
    it('should set the text on the element', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(el.sendKeys('original value'));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(el.text().should.eventually.equal('original value'));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9nZW5lcmFsL2VsZW1lbnQtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztzQkFDL0IsUUFBUTs7Ozt1QkFDUSxlQUFlOzs4QkFDbEIsdUJBQXVCOzt3QkFDcEIsVUFBVTs7QUFHeEMsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixJQUFNLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDOztBQUU5QyxRQUFRLENBQUMsU0FBUyxFQUFFLFlBQVk7QUFDOUIsTUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLE1BQUksRUFBRSxZQUFBLENBQUM7QUFDUCxRQUFNLENBQUM7Ozs7OzJDQUNVLGdDQUFXLGVBQWMsRUFBRSwwQkFBaUIsRUFBQyxXQUFXLEVBQUUsa0JBQWtCLEVBQUMsQ0FBQyxDQUFDOzs7QUFBOUYsZ0JBQU07OzJDQUNLLDZCQUFjLENBQUMsRUFBRSxJQUFJLEVBQUU7Z0JBQzFCLEdBQUc7Ozs7O21EQUFTLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyx5QkFBeUIsQ0FBQzs7O0FBQWpFLHFCQUFHOztBQUNULHFCQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztzREFDNUIsb0JBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQzs7Ozs7OztXQUNuQixDQUFDOzs7QUFKRixZQUFFOzs7Ozs7O0dBS0gsQ0FBQyxDQUFDO0FBQ0gsT0FBSyxDQUFDOzs7OzsyQ0FDRSxNQUFNLENBQUMsSUFBSSxFQUFFOzs7Ozs7O0dBQ3BCLENBQUMsQ0FBQzs7QUFFSCxVQUFRLENBQUMsVUFBVSxFQUFFLFlBQVk7QUFDL0IsTUFBRSxDQUFDLG9DQUFvQyxFQUFFOzs7Ozs2Q0FDakMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQzs7Ozs2Q0FDN0IsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDOzs7Ozs7O0tBQzFELENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvY29tbWFuZHMvZ2VuZXJhbC9lbGVtZW50LWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IEFQSURFTU9TX0NBUFMgfSBmcm9tICcuLi8uLi9kZXNpcmVkJztcbmltcG9ydCB7IGluaXREcml2ZXIgfSBmcm9tICcuLi8uLi9oZWxwZXJzL3Nlc3Npb24nO1xuaW1wb3J0IHsgcmV0cnlJbnRlcnZhbCB9IGZyb20gJ2FzeW5jYm94JztcblxuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5jb25zdCB0ZXh0RmllbGRzQWN0aXZpdHkgPSAnLnZpZXcuVGV4dEZpZWxkcyc7XG5cbmRlc2NyaWJlKCdlbGVtZW50JywgZnVuY3Rpb24gKCkge1xuICBsZXQgZHJpdmVyO1xuICBsZXQgZWw7XG4gIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgZHJpdmVyID0gYXdhaXQgaW5pdERyaXZlcihPYmplY3QuYXNzaWduKHt9LCBBUElERU1PU19DQVBTLCB7YXBwQWN0aXZpdHk6IHRleHRGaWVsZHNBY3Rpdml0eX0pKTtcbiAgICBlbCA9IGF3YWl0IHJldHJ5SW50ZXJ2YWwoNSwgMTAwMCwgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgZWxzID0gYXdhaXQgZHJpdmVyLmVsZW1lbnRzQnlDbGFzc05hbWUoJ2FuZHJvaWQud2lkZ2V0LkVkaXRUZXh0Jyk7XG4gICAgICBlbHMuc2hvdWxkLmhhdmUubGVuZ3RoLmF0LmxlYXN0KDEpO1xuICAgICAgcmV0dXJuIF8ubGFzdChlbHMpO1xuICAgIH0pO1xuICB9KTtcbiAgYWZ0ZXIoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgIGF3YWl0IGRyaXZlci5xdWl0KCk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdzZXRWYWx1ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIHNldCB0aGUgdGV4dCBvbiB0aGUgZWxlbWVudCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGF3YWl0IGVsLnNlbmRLZXlzKCdvcmlnaW5hbCB2YWx1ZScpO1xuICAgICAgYXdhaXQgZWwudGV4dCgpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdvcmlnaW5hbCB2YWx1ZScpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi8uLiJ9
