// these are extra unit tests to ensure that appium is set up correctly for publishing

'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

_chai2['default'].use(_chaiAsPromised2['default']);
var expect = _chai2['default'].expect;

describe.skip('shrinkwrap checks', function () {
  it('shrinkwrap file should exist', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          require('../../npm-shrinkwrap.json');

        case 1:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('shrinkwrap should not include fsevents', function callee$1$0() {
    var shrinkwrap, message;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          shrinkwrap = require('../../npm-shrinkwrap.json');

          expect(shrinkwrap.dependencies, 'no shrinkwrap file found. run `npm shrinkwrap`').to.exist;
          _lodash2['default'].values(shrinkwrap.dependencies).length.should.be.above(10);
          message = "'fsevents' entry found in shrinkwrap. It causes problems " + "on non-Mac systems. run `gulp fixShrinkwrap` and try again";

          expect(shrinkwrap.dependencies.fsevents, message).to.not.exist;

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});

// fsevents is an optional dep that only works on Mac.
// if it's in shrinkwrap, non-Mac hosts won't be able to install appium
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3Qvc2hyaW5rd3JhcC1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztzQkFFYyxRQUFROzs7O29CQUNMLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O0FBRzdDLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7QUFDekIsSUFBTSxNQUFNLEdBQUcsa0JBQUssTUFBTSxDQUFDOztBQUUzQixRQUFRLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLFlBQVk7QUFDN0MsSUFBRSxDQUFDLDhCQUE4QixFQUFFOzs7O0FBQ2pDLGlCQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQzs7Ozs7OztHQUN0QyxDQUFDLENBQUM7O0FBRUgsSUFBRSxDQUFDLHdDQUF3QyxFQUFFO1FBR3ZDLFVBQVUsRUFHVixPQUFPOzs7O0FBSFAsb0JBQVUsR0FBRyxPQUFPLENBQUMsMkJBQTJCLENBQUM7O0FBQ3JELGdCQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxnREFBZ0QsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7QUFDM0YsOEJBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDekQsaUJBQU8sR0FBRywyREFBMkQsR0FDM0QsNERBQTREOztBQUMxRSxnQkFBTSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDOzs7Ozs7O0dBQ2hFLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3Nocmlua3dyYXAtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0aGVzZSBhcmUgZXh0cmEgdW5pdCB0ZXN0cyB0byBlbnN1cmUgdGhhdCBhcHBpdW0gaXMgc2V0IHVwIGNvcnJlY3RseSBmb3IgcHVibGlzaGluZ1xuXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5cblxuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuY29uc3QgZXhwZWN0ID0gY2hhaS5leHBlY3Q7XG5cbmRlc2NyaWJlLnNraXAoJ3Nocmlua3dyYXAgY2hlY2tzJywgZnVuY3Rpb24gKCkge1xuICBpdCgnc2hyaW5rd3JhcCBmaWxlIHNob3VsZCBleGlzdCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICByZXF1aXJlKCcuLi8uLi9ucG0tc2hyaW5rd3JhcC5qc29uJyk7XG4gIH0pO1xuXG4gIGl0KCdzaHJpbmt3cmFwIHNob3VsZCBub3QgaW5jbHVkZSBmc2V2ZW50cycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAvLyBmc2V2ZW50cyBpcyBhbiBvcHRpb25hbCBkZXAgdGhhdCBvbmx5IHdvcmtzIG9uIE1hYy5cbiAgICAvLyBpZiBpdCdzIGluIHNocmlua3dyYXAsIG5vbi1NYWMgaG9zdHMgd29uJ3QgYmUgYWJsZSB0byBpbnN0YWxsIGFwcGl1bVxuICAgIGxldCBzaHJpbmt3cmFwID0gcmVxdWlyZSgnLi4vLi4vbnBtLXNocmlua3dyYXAuanNvbicpO1xuICAgIGV4cGVjdChzaHJpbmt3cmFwLmRlcGVuZGVuY2llcywgJ25vIHNocmlua3dyYXAgZmlsZSBmb3VuZC4gcnVuIGBucG0gc2hyaW5rd3JhcGAnKS50by5leGlzdDtcbiAgICBfLnZhbHVlcyhzaHJpbmt3cmFwLmRlcGVuZGVuY2llcykubGVuZ3RoLnNob3VsZC5iZS5hYm92ZSgxMCk7XG4gICAgbGV0IG1lc3NhZ2UgPSBcIidmc2V2ZW50cycgZW50cnkgZm91bmQgaW4gc2hyaW5rd3JhcC4gSXQgY2F1c2VzIHByb2JsZW1zIFwiICtcbiAgICAgICAgICAgICAgICAgIFwib24gbm9uLU1hYyBzeXN0ZW1zLiBydW4gYGd1bHAgZml4U2hyaW5rd3JhcGAgYW5kIHRyeSBhZ2FpblwiO1xuICAgIGV4cGVjdChzaHJpbmt3cmFwLmRlcGVuZGVuY2llcy5mc2V2ZW50cywgbWVzc2FnZSkudG8ubm90LmV4aXN0O1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9
