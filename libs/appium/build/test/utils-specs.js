'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _libUtils = require('../lib/utils');

var _helpers = require('./helpers');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var should = _chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('utils', function () {
  describe('parseCapsForInnerDriver()', function () {
    it('should return JSONWP caps unchanged if only JSONWP caps provided', function () {
      var _parseCapsForInnerDriver = (0, _libUtils.parseCapsForInnerDriver)(_helpers.BASE_CAPS);

      var desiredCaps = _parseCapsForInnerDriver.desiredCaps;
      var processedJsonwpCapabilities = _parseCapsForInnerDriver.processedJsonwpCapabilities;
      var processedW3CCapabilities = _parseCapsForInnerDriver.processedW3CCapabilities;
      var protocol = _parseCapsForInnerDriver.protocol;

      desiredCaps.should.deep.equal(_helpers.BASE_CAPS);
      processedJsonwpCapabilities.should.deep.equal(_helpers.BASE_CAPS);
      should.not.exist(processedW3CCapabilities);
      protocol.should.equal('MJSONWP');
    });
    it('should return W3C caps unchanged if only W3C caps were provided', function () {
      var _parseCapsForInnerDriver2 = (0, _libUtils.parseCapsForInnerDriver)(undefined, _helpers.W3C_CAPS);

      var desiredCaps = _parseCapsForInnerDriver2.desiredCaps;
      var processedJsonwpCapabilities = _parseCapsForInnerDriver2.processedJsonwpCapabilities;
      var processedW3CCapabilities = _parseCapsForInnerDriver2.processedW3CCapabilities;
      var protocol = _parseCapsForInnerDriver2.protocol;

      desiredCaps.should.deep.equal(_helpers.BASE_CAPS);
      should.not.exist(processedJsonwpCapabilities);
      processedW3CCapabilities.should.deep.equal(_helpers.W3C_CAPS);
      protocol.should.equal('W3C');
    });
    it('should return JSONWP and W3C caps if both were provided', function () {
      var _parseCapsForInnerDriver3 = (0, _libUtils.parseCapsForInnerDriver)(_helpers.BASE_CAPS, _helpers.W3C_CAPS);

      var desiredCaps = _parseCapsForInnerDriver3.desiredCaps;
      var processedJsonwpCapabilities = _parseCapsForInnerDriver3.processedJsonwpCapabilities;
      var processedW3CCapabilities = _parseCapsForInnerDriver3.processedW3CCapabilities;
      var protocol = _parseCapsForInnerDriver3.protocol;

      desiredCaps.should.deep.equal(_helpers.BASE_CAPS);
      processedJsonwpCapabilities.should.deep.equal(_helpers.BASE_CAPS);
      processedW3CCapabilities.should.deep.equal(_helpers.W3C_CAPS);
      protocol.should.equal('W3C');
    });
    it('should include default capabilities in results', function () {
      var _parseCapsForInnerDriver4 = (0, _libUtils.parseCapsForInnerDriver)(_helpers.BASE_CAPS, _helpers.W3C_CAPS, {}, { foo: 'bar' });

      var desiredCaps = _parseCapsForInnerDriver4.desiredCaps;
      var processedJsonwpCapabilities = _parseCapsForInnerDriver4.processedJsonwpCapabilities;
      var processedW3CCapabilities = _parseCapsForInnerDriver4.processedW3CCapabilities;

      desiredCaps.should.deep.equal(_extends({ foo: 'bar' }, _helpers.BASE_CAPS));
      processedJsonwpCapabilities.should.deep.equal(_extends({ foo: 'bar' }, _helpers.BASE_CAPS));
      processedW3CCapabilities.alwaysMatch.should.deep.equal(_extends({ 'appium:foo': 'bar' }, (0, _libUtils.insertAppiumPrefixes)(_helpers.BASE_CAPS)));
    });
    it('should reject if W3C caps are not passing constraints', function () {
      var err = (0, _libUtils.parseCapsForInnerDriver)(undefined, _helpers.W3C_CAPS, { hello: { presence: true } }).error;
      err.message.should.match(/'hello' can't be blank/);
      _lodash2['default'].isError(err).should.be['true'];
    });
    it('should only accept W3C caps that have passing constraints', function () {
      var w3cCaps = _extends({}, _helpers.W3C_CAPS, {
        firstMatch: [{ foo: 'bar' }, { hello: 'world' }]
      });

      var _parseCapsForInnerDriver5 = (0, _libUtils.parseCapsForInnerDriver)(_helpers.BASE_CAPS, w3cCaps, { hello: { presence: true } });

      var desiredCaps = _parseCapsForInnerDriver5.desiredCaps;
      var processedJsonwpCapabilities = _parseCapsForInnerDriver5.processedJsonwpCapabilities;
      var processedW3CCapabilities = _parseCapsForInnerDriver5.processedW3CCapabilities;
      var protocol = _parseCapsForInnerDriver5.protocol;

      var expectedResult = _extends({ hello: 'world' }, _helpers.BASE_CAPS);
      desiredCaps.should.deep.equal(expectedResult);
      processedJsonwpCapabilities.should.deep.equal(_extends({}, _helpers.BASE_CAPS));
      processedW3CCapabilities.alwaysMatch.should.deep.equal((0, _libUtils.insertAppiumPrefixes)(expectedResult));
      protocol.should.equal('W3C');
    });
    it('should add appium prefixes to W3C caps that are not standard in W3C', function () {
      (0, _libUtils.parseCapsForInnerDriver)(undefined, {
        alwaysMatch: { platformName: 'Fake', propertyName: 'PROP_NAME' }
      }).processedW3CCapabilities.should.deep.equal({
        alwaysMatch: {
          platformName: 'Fake',
          'appium:propertyName': 'PROP_NAME'
        },
        firstMatch: [{}]
      });
    });
    it('should fall back to MJSONWP caps if MJSONWP contains extraneous caps that aren not in W3C', function () {
      var jsonwpCaps = _extends({}, _helpers.BASE_CAPS, {
        automationName: 'Fake'
      });

      var _parseCapsForInnerDriver6 = (0, _libUtils.parseCapsForInnerDriver)(jsonwpCaps, {
        alwaysMatch: { platformName: 'Fake', propertyName: 'PROP_NAME' }
      });

      var desiredCaps = _parseCapsForInnerDriver6.desiredCaps;
      var processedJsonwpCapabilities = _parseCapsForInnerDriver6.processedJsonwpCapabilities;
      var processedW3CCapabilities = _parseCapsForInnerDriver6.processedW3CCapabilities;
      var protocol = _parseCapsForInnerDriver6.protocol;

      should.not.exist(processedW3CCapabilities);
      desiredCaps.should.eql(jsonwpCaps);
      processedJsonwpCapabilities.should.eql(jsonwpCaps);
      protocol.should.equal('MJSONWP');
    });
    it('should fall back to MJSONWP caps if W3C capabilities are invalid', function () {
      var w3cCapabilities = {
        alwaysMatch: { platformName: 'Fake', propertyName: 'PROP_NAME' }
      };
      var constraints = {
        deviceName: {
          presence: true
        }
      };

      var _parseCapsForInnerDriver7 = (0, _libUtils.parseCapsForInnerDriver)(_extends({}, _helpers.BASE_CAPS), w3cCapabilities, constraints);

      var desiredCaps = _parseCapsForInnerDriver7.desiredCaps;
      var processedJsonwpCapabilities = _parseCapsForInnerDriver7.processedJsonwpCapabilities;
      var processedW3CCapabilities = _parseCapsForInnerDriver7.processedW3CCapabilities;
      var protocol = _parseCapsForInnerDriver7.protocol;

      should.not.exist(processedW3CCapabilities);
      desiredCaps.should.eql(_helpers.BASE_CAPS);
      processedJsonwpCapabilities.should.eql(_helpers.BASE_CAPS);
      protocol.should.equal('MJSONWP');
    });
  });

  describe('insertAppiumPrefixes()', function () {
    it('should apply prefixes to non-standard capabilities', function () {
      (0, _libUtils.insertAppiumPrefixes)({
        someCap: 'someCap'
      }).should.deep.equal({
        'appium:someCap': 'someCap'
      });
    });
    it('should not apply prefixes to standard capabilities', function () {
      (0, _libUtils.insertAppiumPrefixes)({
        browserName: 'BrowserName',
        platformName: 'PlatformName'
      }).should.deep.equal({
        browserName: 'BrowserName',
        platformName: 'PlatformName'
      });
    });
    it('should not apply prefixes to capabilities that already have a prefix', function () {
      (0, _libUtils.insertAppiumPrefixes)({
        'appium:someCap': 'someCap',
        'moz:someOtherCap': 'someOtherCap'
      }).should.deep.equal({
        'appium:someCap': 'someCap',
        'moz:someOtherCap': 'someOtherCap'
      });
    });
    it('should apply prefixes to non-prefixed, non-standard capabilities; should not apply prefixes to any other capabilities', function () {
      (0, _libUtils.insertAppiumPrefixes)({
        'appium:someCap': 'someCap',
        'moz:someOtherCap': 'someOtherCap',
        browserName: 'BrowserName',
        platformName: 'PlatformName',
        someOtherCap: 'someOtherCap',
        yetAnotherCap: 'yetAnotherCap'
      }).should.deep.equal({
        'appium:someCap': 'someCap',
        'moz:someOtherCap': 'someOtherCap',
        browserName: 'BrowserName',
        platformName: 'PlatformName',
        'appium:someOtherCap': 'someOtherCap',
        'appium:yetAnotherCap': 'yetAnotherCap'
      });
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,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LE1BQUUsQ0FBQyxzRUFBc0UsRUFBRSxZQUFZO0FBQ3JGLDBDQUFxQjtBQUNuQix3QkFBZ0IsRUFBRSxTQUFTO0FBQzNCLDBCQUFrQixFQUFFLGNBQWM7T0FDbkMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0FBQ25CLHdCQUFnQixFQUFFLFNBQVM7QUFDM0IsMEJBQWtCLEVBQUUsY0FBYztPQUNuQyxDQUFDLENBQUM7S0FDSixDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsdUhBQXVILEVBQUUsWUFBWTtBQUN0SSwwQ0FBcUI7QUFDbkIsd0JBQWdCLEVBQUUsU0FBUztBQUMzQiwwQkFBa0IsRUFBRSxjQUFjO0FBQ2xDLG1CQUFXLEVBQUUsYUFBYTtBQUMxQixvQkFBWSxFQUFFLGNBQWM7QUFDNUIsb0JBQVksRUFBRSxjQUFjO0FBQzVCLHFCQUFhLEVBQUUsZUFBZTtPQUMvQixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDbkIsd0JBQWdCLEVBQUUsU0FBUztBQUMzQiwwQkFBa0IsRUFBRSxjQUFjO0FBQ2xDLG1CQUFXLEVBQUUsYUFBYTtBQUMxQixvQkFBWSxFQUFFLGNBQWM7QUFDNUIsNkJBQXFCLEVBQUUsY0FBYztBQUNyQyw4QkFBc0IsRUFBRSxlQUFlO09BQ3hDLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3V0aWxzLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgeyBwYXJzZUNhcHNGb3JJbm5lckRyaXZlciwgaW5zZXJ0QXBwaXVtUHJlZml4ZXMgfSBmcm9tICcuLi9saWIvdXRpbHMnO1xuaW1wb3J0IHsgQkFTRV9DQVBTLCBXM0NfQ0FQUyB9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuXG5cbmNvbnN0IHNob3VsZCA9IGNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmRlc2NyaWJlKCd1dGlscycsIGZ1bmN0aW9uICgpIHtcbiAgZGVzY3JpYmUoJ3BhcnNlQ2Fwc0ZvcklubmVyRHJpdmVyKCknLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gSlNPTldQIGNhcHMgdW5jaGFuZ2VkIGlmIG9ubHkgSlNPTldQIGNhcHMgcHJvdmlkZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQge2Rlc2lyZWRDYXBzLCBwcm9jZXNzZWRKc29ud3BDYXBhYmlsaXRpZXMsIHByb2Nlc3NlZFczQ0NhcGFiaWxpdGllcywgcHJvdG9jb2x9ID0gcGFyc2VDYXBzRm9ySW5uZXJEcml2ZXIoQkFTRV9DQVBTKTtcbiAgICAgIGRlc2lyZWRDYXBzLnNob3VsZC5kZWVwLmVxdWFsKEJBU0VfQ0FQUyk7XG4gICAgICBwcm9jZXNzZWRKc29ud3BDYXBhYmlsaXRpZXMuc2hvdWxkLmRlZXAuZXF1YWwoQkFTRV9DQVBTKTtcbiAgICAgIHNob3VsZC5ub3QuZXhpc3QocHJvY2Vzc2VkVzNDQ2FwYWJpbGl0aWVzKTtcbiAgICAgIHByb3RvY29sLnNob3VsZC5lcXVhbCgnTUpTT05XUCcpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIFczQyBjYXBzIHVuY2hhbmdlZCBpZiBvbmx5IFczQyBjYXBzIHdlcmUgcHJvdmlkZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQge2Rlc2lyZWRDYXBzLCBwcm9jZXNzZWRKc29ud3BDYXBhYmlsaXRpZXMsIHByb2Nlc3NlZFczQ0NhcGFiaWxpdGllcywgcHJvdG9jb2x9ID0gcGFyc2VDYXBzRm9ySW5uZXJEcml2ZXIodW5kZWZpbmVkLCBXM0NfQ0FQUyk7XG4gICAgICBkZXNpcmVkQ2Fwcy5zaG91bGQuZGVlcC5lcXVhbChCQVNFX0NBUFMpO1xuICAgICAgc2hvdWxkLm5vdC5leGlzdChwcm9jZXNzZWRKc29ud3BDYXBhYmlsaXRpZXMpO1xuICAgICAgcHJvY2Vzc2VkVzNDQ2FwYWJpbGl0aWVzLnNob3VsZC5kZWVwLmVxdWFsKFczQ19DQVBTKTtcbiAgICAgIHByb3RvY29sLnNob3VsZC5lcXVhbCgnVzNDJyk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gSlNPTldQIGFuZCBXM0MgY2FwcyBpZiBib3RoIHdlcmUgcHJvdmlkZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQge2Rlc2lyZWRDYXBzLCBwcm9jZXNzZWRKc29ud3BDYXBhYmlsaXRpZXMsIHByb2Nlc3NlZFczQ0NhcGFiaWxpdGllcywgcHJvdG9jb2x9ID0gcGFyc2VDYXBzRm9ySW5uZXJEcml2ZXIoQkFTRV9DQVBTLCBXM0NfQ0FQUyk7XG4gICAgICBkZXNpcmVkQ2Fwcy5zaG91bGQuZGVlcC5lcXVhbChCQVNFX0NBUFMpO1xuICAgICAgcHJvY2Vzc2VkSnNvbndwQ2FwYWJpbGl0aWVzLnNob3VsZC5kZWVwLmVxdWFsKEJBU0VfQ0FQUyk7XG4gICAgICBwcm9jZXNzZWRXM0NDYXBhYmlsaXRpZXMuc2hvdWxkLmRlZXAuZXF1YWwoVzNDX0NBUFMpO1xuICAgICAgcHJvdG9jb2wuc2hvdWxkLmVxdWFsKCdXM0MnKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGluY2x1ZGUgZGVmYXVsdCBjYXBhYmlsaXRpZXMgaW4gcmVzdWx0cycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCB7ZGVzaXJlZENhcHMsIHByb2Nlc3NlZEpzb253cENhcGFiaWxpdGllcywgcHJvY2Vzc2VkVzNDQ2FwYWJpbGl0aWVzfSA9IHBhcnNlQ2Fwc0ZvcklubmVyRHJpdmVyKEJBU0VfQ0FQUywgVzNDX0NBUFMsIHt9LCB7Zm9vOiAnYmFyJ30pO1xuICAgICAgZGVzaXJlZENhcHMuc2hvdWxkLmRlZXAuZXF1YWwoe2ZvbzogJ2JhcicsIC4uLkJBU0VfQ0FQU30pO1xuICAgICAgcHJvY2Vzc2VkSnNvbndwQ2FwYWJpbGl0aWVzLnNob3VsZC5kZWVwLmVxdWFsKHtmb286ICdiYXInLCAuLi5CQVNFX0NBUFN9KTtcbiAgICAgIHByb2Nlc3NlZFczQ0NhcGFiaWxpdGllcy5hbHdheXNNYXRjaC5zaG91bGQuZGVlcC5lcXVhbCh7J2FwcGl1bTpmb28nOiAnYmFyJywgLi4uaW5zZXJ0QXBwaXVtUHJlZml4ZXMoQkFTRV9DQVBTKX0pO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgcmVqZWN0IGlmIFczQyBjYXBzIGFyZSBub3QgcGFzc2luZyBjb25zdHJhaW50cycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IGVyciA9IHBhcnNlQ2Fwc0ZvcklubmVyRHJpdmVyKHVuZGVmaW5lZCwgVzNDX0NBUFMsIHtoZWxsbzoge3ByZXNlbmNlOiB0cnVlfX0pLmVycm9yO1xuICAgICAgZXJyLm1lc3NhZ2Uuc2hvdWxkLm1hdGNoKC8naGVsbG8nIGNhbid0IGJlIGJsYW5rLyk7XG4gICAgICBfLmlzRXJyb3IoZXJyKS5zaG91bGQuYmUudHJ1ZTtcblxuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgb25seSBhY2NlcHQgVzNDIGNhcHMgdGhhdCBoYXZlIHBhc3NpbmcgY29uc3RyYWludHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgdzNjQ2FwcyA9IHtcbiAgICAgICAgLi4uVzNDX0NBUFMsXG4gICAgICAgIGZpcnN0TWF0Y2g6IFtcbiAgICAgICAgICB7Zm9vOiAnYmFyJ30sXG4gICAgICAgICAge2hlbGxvOiAnd29ybGQnfSxcbiAgICAgICAgXSxcbiAgICAgIH07XG4gICAgICBsZXQge2Rlc2lyZWRDYXBzLCBwcm9jZXNzZWRKc29ud3BDYXBhYmlsaXRpZXMsIHByb2Nlc3NlZFczQ0NhcGFiaWxpdGllcywgcHJvdG9jb2x9ID0gcGFyc2VDYXBzRm9ySW5uZXJEcml2ZXIoQkFTRV9DQVBTLCB3M2NDYXBzLCB7aGVsbG86IHtwcmVzZW5jZTogdHJ1ZX19KTtcbiAgICAgIGNvbnN0IGV4cGVjdGVkUmVzdWx0ID0ge2hlbGxvOiAnd29ybGQnLCAuLi5CQVNFX0NBUFN9O1xuICAgICAgZGVzaXJlZENhcHMuc2hvdWxkLmRlZXAuZXF1YWwoZXhwZWN0ZWRSZXN1bHQpO1xuICAgICAgcHJvY2Vzc2VkSnNvbndwQ2FwYWJpbGl0aWVzLnNob3VsZC5kZWVwLmVxdWFsKHsuLi5CQVNFX0NBUFN9KTtcbiAgICAgIHByb2Nlc3NlZFczQ0NhcGFiaWxpdGllcy5hbHdheXNNYXRjaC5zaG91bGQuZGVlcC5lcXVhbChpbnNlcnRBcHBpdW1QcmVmaXhlcyhleHBlY3RlZFJlc3VsdCkpO1xuICAgICAgcHJvdG9jb2wuc2hvdWxkLmVxdWFsKCdXM0MnKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGFkZCBhcHBpdW0gcHJlZml4ZXMgdG8gVzNDIGNhcHMgdGhhdCBhcmUgbm90IHN0YW5kYXJkIGluIFczQycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHBhcnNlQ2Fwc0ZvcklubmVyRHJpdmVyKHVuZGVmaW5lZCwge1xuICAgICAgICBhbHdheXNNYXRjaDoge3BsYXRmb3JtTmFtZTogJ0Zha2UnLCBwcm9wZXJ0eU5hbWU6ICdQUk9QX05BTUUnfSxcbiAgICAgIH0pLnByb2Nlc3NlZFczQ0NhcGFiaWxpdGllcy5zaG91bGQuZGVlcC5lcXVhbCh7XG4gICAgICAgIGFsd2F5c01hdGNoOiB7XG4gICAgICAgICAgcGxhdGZvcm1OYW1lOiAnRmFrZScsXG4gICAgICAgICAgJ2FwcGl1bTpwcm9wZXJ0eU5hbWUnOiAnUFJPUF9OQU1FJyxcbiAgICAgICAgfSxcbiAgICAgICAgZmlyc3RNYXRjaDogW3t9XSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgZmFsbCBiYWNrIHRvIE1KU09OV1AgY2FwcyBpZiBNSlNPTldQIGNvbnRhaW5zIGV4dHJhbmVvdXMgY2FwcyB0aGF0IGFyZW4gbm90IGluIFczQycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBqc29ud3BDYXBzID0ge1xuICAgICAgICAuLi5CQVNFX0NBUFMsXG4gICAgICAgIGF1dG9tYXRpb25OYW1lOiAnRmFrZScsXG4gICAgICB9O1xuICAgICAgY29uc3Qge2Rlc2lyZWRDYXBzLCBwcm9jZXNzZWRKc29ud3BDYXBhYmlsaXRpZXMsIHByb2Nlc3NlZFczQ0NhcGFiaWxpdGllcywgcHJvdG9jb2x9ID0gcGFyc2VDYXBzRm9ySW5uZXJEcml2ZXIoanNvbndwQ2Fwcywge1xuICAgICAgICBhbHdheXNNYXRjaDoge3BsYXRmb3JtTmFtZTogJ0Zha2UnLCBwcm9wZXJ0eU5hbWU6ICdQUk9QX05BTUUnfSxcbiAgICAgIH0pO1xuXG4gICAgICBzaG91bGQubm90LmV4aXN0KHByb2Nlc3NlZFczQ0NhcGFiaWxpdGllcyk7XG4gICAgICBkZXNpcmVkQ2Fwcy5zaG91bGQuZXFsKGpzb253cENhcHMpO1xuICAgICAgcHJvY2Vzc2VkSnNvbndwQ2FwYWJpbGl0aWVzLnNob3VsZC5lcWwoanNvbndwQ2Fwcyk7XG4gICAgICBwcm90b2NvbC5zaG91bGQuZXF1YWwoJ01KU09OV1AnKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGZhbGwgYmFjayB0byBNSlNPTldQIGNhcHMgaWYgVzNDIGNhcGFiaWxpdGllcyBhcmUgaW52YWxpZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCB3M2NDYXBhYmlsaXRpZXMgPSB7XG4gICAgICAgIGFsd2F5c01hdGNoOiB7cGxhdGZvcm1OYW1lOiAnRmFrZScsIHByb3BlcnR5TmFtZTogJ1BST1BfTkFNRSd9LFxuICAgICAgfTtcbiAgICAgIGxldCBjb25zdHJhaW50cyA9IHtcbiAgICAgICAgZGV2aWNlTmFtZToge1xuICAgICAgICAgIHByZXNlbmNlOiB0cnVlLFxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY29uc3Qge2Rlc2lyZWRDYXBzLCBwcm9jZXNzZWRKc29ud3BDYXBhYmlsaXRpZXMsIHByb2Nlc3NlZFczQ0NhcGFiaWxpdGllcywgcHJvdG9jb2x9ID0gcGFyc2VDYXBzRm9ySW5uZXJEcml2ZXIoey4uLkJBU0VfQ0FQU30sIHczY0NhcGFiaWxpdGllcywgY29uc3RyYWludHMpO1xuXG4gICAgICBzaG91bGQubm90LmV4aXN0KHByb2Nlc3NlZFczQ0NhcGFiaWxpdGllcyk7XG4gICAgICBkZXNpcmVkQ2Fwcy5zaG91bGQuZXFsKEJBU0VfQ0FQUyk7XG4gICAgICBwcm9jZXNzZWRKc29ud3BDYXBhYmlsaXRpZXMuc2hvdWxkLmVxbChCQVNFX0NBUFMpO1xuICAgICAgcHJvdG9jb2wuc2hvdWxkLmVxdWFsKCdNSlNPTldQJyk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdpbnNlcnRBcHBpdW1QcmVmaXhlcygpJywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdzaG91bGQgYXBwbHkgcHJlZml4ZXMgdG8gbm9uLXN0YW5kYXJkIGNhcGFiaWxpdGllcycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGluc2VydEFwcGl1bVByZWZpeGVzKHtcbiAgICAgICAgc29tZUNhcDogJ3NvbWVDYXAnLFxuICAgICAgfSkuc2hvdWxkLmRlZXAuZXF1YWwoe1xuICAgICAgICAnYXBwaXVtOnNvbWVDYXAnOiAnc29tZUNhcCcsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIG5vdCBhcHBseSBwcmVmaXhlcyB0byBzdGFuZGFyZCBjYXBhYmlsaXRpZXMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpbnNlcnRBcHBpdW1QcmVmaXhlcyh7XG4gICAgICAgIGJyb3dzZXJOYW1lOiAnQnJvd3Nlck5hbWUnLFxuICAgICAgICBwbGF0Zm9ybU5hbWU6ICdQbGF0Zm9ybU5hbWUnLFxuICAgICAgfSkuc2hvdWxkLmRlZXAuZXF1YWwoe1xuICAgICAgICBicm93c2VyTmFtZTogJ0Jyb3dzZXJOYW1lJyxcbiAgICAgICAgcGxhdGZvcm1OYW1lOiAnUGxhdGZvcm1OYW1lJyxcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgbm90IGFwcGx5IHByZWZpeGVzIHRvIGNhcGFiaWxpdGllcyB0aGF0IGFscmVhZHkgaGF2ZSBhIHByZWZpeCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGluc2VydEFwcGl1bVByZWZpeGVzKHtcbiAgICAgICAgJ2FwcGl1bTpzb21lQ2FwJzogJ3NvbWVDYXAnLFxuICAgICAgICAnbW96OnNvbWVPdGhlckNhcCc6ICdzb21lT3RoZXJDYXAnLFxuICAgICAgfSkuc2hvdWxkLmRlZXAuZXF1YWwoe1xuICAgICAgICAnYXBwaXVtOnNvbWVDYXAnOiAnc29tZUNhcCcsXG4gICAgICAgICdtb3o6c29tZU90aGVyQ2FwJzogJ3NvbWVPdGhlckNhcCcsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGFwcGx5IHByZWZpeGVzIHRvIG5vbi1wcmVmaXhlZCwgbm9uLXN0YW5kYXJkIGNhcGFiaWxpdGllczsgc2hvdWxkIG5vdCBhcHBseSBwcmVmaXhlcyB0byBhbnkgb3RoZXIgY2FwYWJpbGl0aWVzJywgZnVuY3Rpb24gKCkge1xuICAgICAgaW5zZXJ0QXBwaXVtUHJlZml4ZXMoe1xuICAgICAgICAnYXBwaXVtOnNvbWVDYXAnOiAnc29tZUNhcCcsXG4gICAgICAgICdtb3o6c29tZU90aGVyQ2FwJzogJ3NvbWVPdGhlckNhcCcsXG4gICAgICAgIGJyb3dzZXJOYW1lOiAnQnJvd3Nlck5hbWUnLFxuICAgICAgICBwbGF0Zm9ybU5hbWU6ICdQbGF0Zm9ybU5hbWUnLFxuICAgICAgICBzb21lT3RoZXJDYXA6ICdzb21lT3RoZXJDYXAnLFxuICAgICAgICB5ZXRBbm90aGVyQ2FwOiAneWV0QW5vdGhlckNhcCcsXG4gICAgICB9KS5zaG91bGQuZGVlcC5lcXVhbCh7XG4gICAgICAgICdhcHBpdW06c29tZUNhcCc6ICdzb21lQ2FwJyxcbiAgICAgICAgJ21vejpzb21lT3RoZXJDYXAnOiAnc29tZU90aGVyQ2FwJyxcbiAgICAgICAgYnJvd3Nlck5hbWU6ICdCcm93c2VyTmFtZScsXG4gICAgICAgIHBsYXRmb3JtTmFtZTogJ1BsYXRmb3JtTmFtZScsXG4gICAgICAgICdhcHBpdW06c29tZU90aGVyQ2FwJzogJ3NvbWVPdGhlckNhcCcsXG4gICAgICAgICdhcHBpdW06eWV0QW5vdGhlckNhcCc6ICd5ZXRBbm90aGVyQ2FwJyxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
