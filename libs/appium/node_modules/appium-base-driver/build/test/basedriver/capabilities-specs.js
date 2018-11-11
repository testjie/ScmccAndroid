'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _libBasedriverCapabilities = require('../../lib/basedriver/capabilities');

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _libBasedriverDesiredCaps = require('../../lib/basedriver/desired-caps');

_chai2['default'].use(_chaiAsPromised2['default']);
var should = _chai2['default'].should();

describe('caps', function () {

  // Tests based on: https://www.w3.org/TR/webdriver/#dfn-validate-caps
  describe('#validateCaps', function () {
    it('returns invalid argument error if "capability" is not a JSON object (1)', function () {
      var _arr = [undefined, null, 1, true, 'string'];

      var _loop = function () {
        var arg = _arr[_i];
        (function () {
          (0, _libBasedriverCapabilities.validateCaps)(arg);
        }).should['throw'](/must be a JSON object/);
      };

      for (var _i = 0; _i < _arr.length; _i++) {
        _loop();
      }
    });

    it('returns result {} by default if caps is empty object and no constraints provided (2)', function () {
      (0, _libBasedriverCapabilities.validateCaps)({}).should.deep.equal({});
    });

    describe('throws errors if constraints are not met', function () {
      it('returns invalid argument error if "present" constraint not met on property', function () {
        (function () {
          return (0, _libBasedriverCapabilities.validateCaps)({}, { foo: { presence: true } });
        }).should['throw'](/'foo' can't be blank/);
      });

      it('returns the capability that was passed in if "skipPresenceConstraint" is false', function () {
        (0, _libBasedriverCapabilities.validateCaps)({}, { foo: { presence: true } }, { skipPresenceConstraint: true }).should.deep.equal({});
      });

      it('returns invalid argument error if "isString" constraint not met on property', function () {
        (function () {
          return (0, _libBasedriverCapabilities.validateCaps)({ foo: 1 }, { foo: { isString: true } });
        }).should['throw'](/'foo' must be of type string/);
      });

      it('returns invalid argument error if "isNumber" constraint not met on property', function () {
        (function () {
          return (0, _libBasedriverCapabilities.validateCaps)({ foo: 'bar' }, { foo: { isNumber: true } });
        }).should['throw'](/'foo' must be of type number/);
      });

      it('returns invalid argument error if "isBoolean" constraint not met on property', function () {
        (function () {
          return (0, _libBasedriverCapabilities.validateCaps)({ foo: 'bar' }, { foo: { isBoolean: true } });
        }).should['throw'](/'foo' must be of type boolean/);
      });

      it('returns invalid argument error if "inclusion" constraint not met on property', function () {
        (function () {
          return (0, _libBasedriverCapabilities.validateCaps)({ foo: '3' }, { foo: { inclusionCaseInsensitive: ['1', '2'] } });
        }).should['throw'](/'foo' 3 not part of 1,2/);
      });

      it('returns invalid argument error if "inclusionCaseInsensitive" constraint not met on property', function () {
        (function () {
          return (0, _libBasedriverCapabilities.validateCaps)({ foo: 'a' }, { foo: { inclusion: ['A', 'B', 'C'] } });
        }).should['throw'](/'foo' a is not included in the list/);
      });
    });

    it('should not throw errors if constraints are met', function () {
      var caps = {
        number: 1,
        string: 'string',
        present: 'present',
        extra: 'extra'
      };

      var constraints = {
        number: { isNumber: true },
        string: { isString: true },
        present: { presence: true },
        notPresent: { presence: false }
      };

      (0, _libBasedriverCapabilities.validateCaps)(caps, constraints).should.deep.equal(caps);
    });
  });

  // Tests based on: https://www.w3.org/TR/webdriver/#dfn-merging-caps
  describe('#mergeCaps', function () {
    it('returns a result that is {} by default (1)', function () {
      (0, _libBasedriverCapabilities.mergeCaps)().should.deep.equal({});
    });

    it('returns a result that matches primary by default (2, 3)', function () {
      (0, _libBasedriverCapabilities.mergeCaps)({ hello: 'world' }).should.deep.equal({ hello: 'world' });
    });

    it('returns invalid argument error if primary and secondary have matching properties (4)', function () {
      (function () {
        return (0, _libBasedriverCapabilities.mergeCaps)({ hello: 'world' }, { hello: 'whirl' });
      }).should['throw'](/property 'hello' should not exist on both primary [\w\W]* and secondary [\w\W]*/);
    });

    it('returns a result with keys from primary and secondary together', function () {
      var primary = {
        a: 'a',
        b: 'b'
      };
      var secondary = {
        c: 'c',
        d: 'd'
      };
      (0, _libBasedriverCapabilities.mergeCaps)(primary, secondary).should.deep.equal({
        a: 'a', b: 'b', c: 'c', d: 'd'
      });
    });
  });

  // Tests based on: https://www.w3.org/TR/webdriver/#processing-caps
  describe('#parseCaps', function () {
    var caps = undefined;

    beforeEach(function () {
      caps = {};
    });

    it('should return invalid argument if no caps object provided', function () {
      (function () {
        return (0, _libBasedriverCapabilities.parseCaps)();
      }).should['throw'](/must be a JSON object/);
    });

    it('sets "requiredCaps" to property named "alwaysMatch" (2)', function () {
      caps.alwaysMatch = { hello: 'world' };
      (0, _libBasedriverCapabilities.parseCaps)(caps).requiredCaps.should.deep.equal(caps.alwaysMatch);
    });

    it('sets "requiredCaps" to empty JSON object if "alwaysMatch" is not an object (2.1)', function () {
      (0, _libBasedriverCapabilities.parseCaps)(caps).requiredCaps.should.deep.equal({});
    });

    it('returns invalid argument error if "requiredCaps" don\'t match "constraints" (2.2)', function () {
      caps.alwaysMatch = { foo: 1 };
      (function () {
        return (0, _libBasedriverCapabilities.parseCaps)(caps, { foo: { isString: true } });
      }).should['throw'](/'foo' must be of type string/);
    });

    it('sets "allFirstMatchCaps" to property named "firstMatch" (3)', function () {
      (0, _libBasedriverCapabilities.parseCaps)({}, [{}]).allFirstMatchCaps.should.deep.equal([{}]);
    });

    it('sets "allFirstMatchCaps" to [{}] if "firstMatch" is undefined (3.1)', function () {
      (0, _libBasedriverCapabilities.parseCaps)({}).allFirstMatchCaps.should.deep.equal([{}]);
    });

    it('returns invalid argument error if "firstMatch" is not an array and is not undefined (3.2)', function () {
      var _arr2 = [null, 1, true, 'string'];

      for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
        var arg = _arr2[_i2];
        caps.firstMatch = arg;
        (function () {
          (0, _libBasedriverCapabilities.parseCaps)(caps);
        }).should['throw'](/must be a JSON array or undefined/);
      }
    });

    it('has "validatedFirstMatchCaps" property that is empty by default if no valid firstMatch caps were found (4)', function () {
      (0, _libBasedriverCapabilities.parseCaps)(caps, { foo: { presence: true } }).validatedFirstMatchCaps.should.deep.equal([]);
    });

    describe('returns a "validatedFirstMatchCaps" array (5)', function () {
      it('that equals "firstMatch" if firstMatch is one empty object and there are no constraints', function () {
        caps.firstMatch = [{}];
        (0, _libBasedriverCapabilities.parseCaps)(caps).validatedFirstMatchCaps.should.deep.equal(caps.firstMatch);
      });

      it('returns "null" matchedCaps if nothing matches', function () {
        caps.firstMatch = [{}];
        should.equal((0, _libBasedriverCapabilities.parseCaps)(caps, { foo: { presence: true } }).matchedCaps, null);
      });

      it('should return capabilities if presence constraint is matched in at least one of the \'firstMatch\' capabilities objects', function () {
        caps.alwaysMatch = {
          foo: 'bar'
        };
        caps.firstMatch = [{
          hello: 'world'
        }, {
          goodbye: 'world'
        }];
        (0, _libBasedriverCapabilities.parseCaps)(caps, { goodbye: { presence: true } }).matchedCaps.should.deep.equal({
          foo: 'bar',
          goodbye: 'world'
        });
      });

      it('throws invalid argument if presence constraint is not met on any capabilities', function () {
        caps.alwaysMatch = {
          foo: 'bar'
        };
        caps.firstMatch = [{
          hello: 'world'
        }, {
          goodbye: 'world'
        }];
        should.equal((0, _libBasedriverCapabilities.parseCaps)(caps, { someAttribute: { presence: true } }).matchedCaps, null);
      });

      it('that equals firstMatch if firstMatch contains two objects that pass the provided constraints', function () {
        caps.alwaysMatch = {
          foo: 'bar'
        };
        caps.firstMatch = [{ foo: 'bar1' }, { foo: 'bar2' }];

        var constraints = {
          foo: {
            presence: true,
            isString: true
          }
        };

        (0, _libBasedriverCapabilities.parseCaps)(caps, constraints).validatedFirstMatchCaps.should.deep.equal(caps.firstMatch);
      });

      it('returns invalid argument error if the firstMatch[2] is not an object', function () {
        caps.alwaysMatch = 'Not an object and not undefined';
        caps.firstMatch = [{ foo: 'bar' }, 'foo'];
        (function () {
          return (0, _libBasedriverCapabilities.parseCaps)(caps, {});
        }).should['throw'](/must be a JSON object/);
      });
    });

    describe('returns a matchedCaps object (6)', function () {
      beforeEach(function () {
        caps.alwaysMatch = { hello: 'world' };
      });

      it('which is same as alwaysMatch if firstMatch array is not provided', function () {
        (0, _libBasedriverCapabilities.parseCaps)(caps).matchedCaps.should.deep.equal({ hello: 'world' });
      });

      it('merges caps together', function () {
        caps.firstMatch = [{ foo: 'bar' }];
        (0, _libBasedriverCapabilities.parseCaps)(caps).matchedCaps.should.deep.equal({ hello: 'world', foo: 'bar' });
      });

      it('with merged caps', function () {
        caps.firstMatch = [{ hello: 'bar', foo: 'foo' }, { foo: 'bar' }];
        (0, _libBasedriverCapabilities.parseCaps)(caps).matchedCaps.should.deep.equal({ hello: 'world', foo: 'bar' });
      });
    });
  });

  describe('#processCaps', function () {
    it('should return "alwaysMatch" if "firstMatch" and "constraints" were not provided', function () {
      (0, _libBasedriverCapabilities.processCapabilities)({}).should.deep.equal({});
    });

    it('should return merged caps', function () {
      (0, _libBasedriverCapabilities.processCapabilities)({
        alwaysMatch: { hello: 'world' },
        firstMatch: [{ foo: 'bar' }]
      }).should.deep.equal({ hello: 'world', foo: 'bar' });
    });

    it('should strip out the "appium:" prefix for non-standard capabilities', function () {
      (0, _libBasedriverCapabilities.processCapabilities)({
        alwaysMatch: { 'appium:hello': 'world' },
        firstMatch: [{ 'appium:foo': 'bar' }]
      }).should.deep.equal({ hello: 'world', foo: 'bar' });
    });

    it('should throw an exception if a standard capability (https://www.w3.org/TR/webdriver/#dfn-table-of-standard-capabilities) is prefixed', function () {
      (function () {
        return (0, _libBasedriverCapabilities.processCapabilities)({
          alwaysMatch: { 'appium:platformName': 'Whatevz' },
          firstMatch: [{ 'appium:browserName': 'Anything' }]
        });
      }).should['throw'](/standard capabilities/);
    });

    it('should not throw an exception if presence constraint is not met on a firstMatch capability', function () {
      var caps = (0, _libBasedriverCapabilities.processCapabilities)({
        alwaysMatch: { 'platformName': 'Fake', 'appium:fakeCap': 'foobar' },
        firstMatch: [{ 'foo': 'bar' }]
      }, {
        platformName: {
          presence: true
        },
        fakeCap: {
          presence: true
        }
      });

      caps.platformName.should.equal('Fake');
      caps.fakeCap.should.equal('foobar');
      caps.foo.should.equal('bar');
    });

    it('should throw an exception if no matching caps were found', function () {
      (function () {
        return (0, _libBasedriverCapabilities.processCapabilities)({
          alwaysMatch: { 'platformName': 'Fake', 'appium:fakeCap': 'foobar' },
          firstMatch: [{ 'foo': 'bar' }]
        }, {
          platformName: {
            presence: true
          },
          fakeCap: {
            presence: true
          },
          missingCap: {
            presence: true
          }
        });
      }).should['throw'](/'missingCap' can't be blank/);
    });

    describe('validate Appium constraints', function () {
      var constraints = _extends({}, _libBasedriverDesiredCaps.desiredCapabilityConstraints);

      var matchingCaps = { 'platformName': 'Fake', 'automationName': 'Fake', 'deviceName': 'Fake' };
      var caps = undefined;

      it('should validate when alwaysMatch has the proper caps', function () {
        caps = {
          alwaysMatch: matchingCaps,
          firstMatch: [{}]
        };
        (0, _libBasedriverCapabilities.processCapabilities)(caps, constraints).should.deep.equal(matchingCaps);
      });

      it('should validate when firstMatch[0] has the proper caps', function () {
        caps = {
          alwaysMatch: {},
          firstMatch: [matchingCaps]
        };
        (0, _libBasedriverCapabilities.processCapabilities)(caps, constraints).should.deep.equal(matchingCaps);
      });

      it('should validate when alwaysMatch and firstMatch[0] have the proper caps when merged together', function () {
        caps = {
          alwaysMatch: _lodash2['default'].omit(matchingCaps, ['deviceName']),
          firstMatch: [{ 'appium:deviceName': 'Fake' }]
        };
        (0, _libBasedriverCapabilities.processCapabilities)(caps, constraints).should.deep.equal(matchingCaps);
      });

      it('should validate when automationName is omitted', function () {
        caps = {
          alwaysMatch: _lodash2['default'].omit(matchingCaps, ['automationName'])
        };
        (0, _libBasedriverCapabilities.processCapabilities)(caps, constraints).should.deep.equal(_lodash2['default'].omit(matchingCaps, 'automationName'));
      });

      it('should pass if first element in "firstMatch" does validate and second element does not', function () {
        caps = {
          alwaysMatch: {},
          firstMatch: [matchingCaps, { badCaps: 'badCaps' }]
        };
        (0, _libBasedriverCapabilities.processCapabilities)(caps, constraints).should.deep.equal(matchingCaps);
      });

      it('should pass if first element in "firstMatch" does not validate and second element does', function () {
        caps = {
          alwaysMatch: {},
          firstMatch: [{ badCaps: 'badCaps' }, matchingCaps]
        };
        (0, _libBasedriverCapabilities.processCapabilities)(caps, constraints).should.deep.equal(matchingCaps);
      });

      it('should fail when deviceName is blank', function () {
        caps = {
          alwaysMatch: _lodash2['default'].omit(matchingCaps, ['deviceName'])
        };
        (function () {
          return (0, _libBasedriverCapabilities.processCapabilities)(caps, constraints);
        }).should['throw'](/'deviceName' can't be blank/);
      });

      it('should fail when a bad automation name is provided', function () {
        caps = {
          alwaysMatch: _extends({}, matchingCaps, {
            automationName: 'NotAValidAutomationName'
          })
        };
        (function () {
          return (0, _libBasedriverCapabilities.processCapabilities)(caps, constraints);
        }).should['throw'](/'automationName' NotAValidAutomationName not part of/);
      });

      it('should fail when bad parameters are passed in more than one firstMatch capability', function () {
        caps = {
          alwaysMatch: {},
          firstMatch: [{
            bad: 'params'
          }, {
            more: 'bad-params'
          }]
        };
        (function () {
          return (0, _libBasedriverCapabilities.processCapabilities)(caps, constraints);
        }).should['throw'](/Could not find matching capabilities/);
      });
    });
  });
  describe('.findNonPrefixedCaps', function () {
    it('should find alwaysMatch caps with no prefix', function () {
      (0, _libBasedriverCapabilities.findNonPrefixedCaps)({ alwaysMatch: {
          'non-standard': 'dummy'
        } }).should.eql(['non-standard']);
    });
    it('should not find a standard cap in alwaysMatch', function () {
      (0, _libBasedriverCapabilities.findNonPrefixedCaps)({ alwaysMatch: {
          'platformName': 'Any'
        } }).should.eql([]);
    });
    it('should find firstMatch caps with no prefix', function () {
      (0, _libBasedriverCapabilities.findNonPrefixedCaps)({ alwaysMatch: {}, firstMatch: [{
          'non-standard': 'dummy'
        }] }).should.eql(['non-standard']);
    });
    it('should not find a standard cap in prefix', function () {
      (0, _libBasedriverCapabilities.findNonPrefixedCaps)({ alwaysMatch: {}, firstMatch: [{
          'platformName': 'Any'
        }] }).should.eql([]);
    });
    it('should find firstMatch caps in second item of firstMatch array', function () {
      (0, _libBasedriverCapabilities.findNonPrefixedCaps)({ alwaysMatch: {}, firstMatch: [{}, {
          'non-standard': 'dummy'
        }] }).should.eql(['non-standard']);
    });
    it('should remove duplicates from alwaysMatch and firstMatch', function () {
      (0, _libBasedriverCapabilities.findNonPrefixedCaps)({ alwaysMatch: {
          'non-standard': 'something'
        }, firstMatch: [{
          'non-standard': 'dummy'
        }] }).should.eql(['non-standard']);
    });
    it('should remove duplicates from firstMatch', function () {
      (0, _libBasedriverCapabilities.findNonPrefixedCaps)({ firstMatch: [{
          'non-standard': 'dummy'
        }, {
          'non-standard': 'dummy 2'
        }] }).should.eql(['non-standard']);
    });
    it('should remove duplicates and keep standard capabilities', function () {
      var alwaysMatch = {
        platformName: 'Fake',
        nonStandardOne: 'non-standard',
        nonStandardTwo: 'non-standard'
      };
      var firstMatch = [{ nonStandardThree: 'non-standard', nonStandardFour: 'non-standard', browserName: 'FakeBrowser' }, { nonStandardThree: 'non-standard', nonStandardFour: 'non-standard', nonStandardFive: 'non-standard', browserVersion: 'whateva' }];
      (0, _libBasedriverCapabilities.findNonPrefixedCaps)({ alwaysMatch: alwaysMatch, firstMatch: firstMatch }).should.eql(['nonStandardOne', 'nonStandardTwo', 'nonStandardThree', 'nonStandardFour', 'nonStandardFive']);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvYmFzZWRyaXZlci9jYXBhYmlsaXRpZXMtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O3lDQUE2RixtQ0FBbUM7O29CQUMvRyxNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztzQkFDL0IsUUFBUTs7Ozt3Q0FDdUIsbUNBQW1DOztBQUVoRixrQkFBSyxHQUFHLDZCQUFnQixDQUFDO0FBQ3pCLElBQU0sTUFBTSxHQUFHLGtCQUFLLE1BQU0sRUFBRSxDQUFDOztBQUU3QixRQUFRLENBQUMsTUFBTSxFQUFFLFlBQVk7OztBQUczQixVQUFRLENBQUMsZUFBZSxFQUFFLFlBQVk7QUFDcEMsTUFBRSxDQUFDLHlFQUF5RSxFQUFFLFlBQVk7aUJBQ3hFLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQzs7O0FBQS9DLFlBQUksR0FBRyxXQUFBLENBQUE7QUFDVixTQUFDLFlBQVk7QUFBRSx1REFBYSxHQUFHLENBQUMsQ0FBQztTQUFFLENBQUEsQ0FBRSxNQUFNLFNBQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDOzs7QUFEN0UsK0NBQXNEOztPQUVyRDtLQUNGLENBQUMsQ0FBQzs7QUFFSCxNQUFFLENBQUMsc0ZBQXNGLEVBQUUsWUFBWTtBQUNyRyxtREFBYSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUN4QyxDQUFDLENBQUM7O0FBRUgsWUFBUSxDQUFDLDBDQUEwQyxFQUFFLFlBQVk7QUFDL0QsUUFBRSxDQUFDLDRFQUE0RSxFQUFFLFlBQVk7QUFDM0YsU0FBQztpQkFBTSw2Q0FBYSxFQUFFLEVBQUUsRUFBQyxHQUFHLEVBQUUsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLEVBQUMsQ0FBQztVQUFBLENBQUUsTUFBTSxTQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQztPQUN4RixDQUFDLENBQUM7O0FBRUgsUUFBRSxDQUFDLGdG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QkFBaUIsQ0FBQyxDQUFDLENBQUM7S0FDM0osQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvYmFzZWRyaXZlci9jYXBhYmlsaXRpZXMtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwYXJzZUNhcHMsIHZhbGlkYXRlQ2FwcywgbWVyZ2VDYXBzLCBwcm9jZXNzQ2FwYWJpbGl0aWVzLCBmaW5kTm9uUHJlZml4ZWRDYXBzIH0gZnJvbSAnLi4vLi4vbGliL2Jhc2Vkcml2ZXIvY2FwYWJpbGl0aWVzJztcbmltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IGRlc2lyZWRDYXBhYmlsaXR5Q29uc3RyYWludHMgfSBmcm9tICcuLi8uLi9saWIvYmFzZWRyaXZlci9kZXNpcmVkLWNhcHMnO1xuXG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5jb25zdCBzaG91bGQgPSBjaGFpLnNob3VsZCgpO1xuXG5kZXNjcmliZSgnY2FwcycsIGZ1bmN0aW9uICgpIHtcblxuICAvLyBUZXN0cyBiYXNlZCBvbjogaHR0cHM6Ly93d3cudzMub3JnL1RSL3dlYmRyaXZlci8jZGZuLXZhbGlkYXRlLWNhcHNcbiAgZGVzY3JpYmUoJyN2YWxpZGF0ZUNhcHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ3JldHVybnMgaW52YWxpZCBhcmd1bWVudCBlcnJvciBpZiBcImNhcGFiaWxpdHlcIiBpcyBub3QgYSBKU09OIG9iamVjdCAoMSknLCBmdW5jdGlvbiAoKSB7XG4gICAgICBmb3IgKGxldCBhcmcgb2YgW3VuZGVmaW5lZCwgbnVsbCwgMSwgdHJ1ZSwgJ3N0cmluZyddKSB7XG4gICAgICAgIChmdW5jdGlvbiAoKSB7IHZhbGlkYXRlQ2FwcyhhcmcpOyB9KS5zaG91bGQudGhyb3coL211c3QgYmUgYSBKU09OIG9iamVjdC8pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgcmVzdWx0IHt9IGJ5IGRlZmF1bHQgaWYgY2FwcyBpcyBlbXB0eSBvYmplY3QgYW5kIG5vIGNvbnN0cmFpbnRzIHByb3ZpZGVkICgyKScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhbGlkYXRlQ2Fwcyh7fSkuc2hvdWxkLmRlZXAuZXF1YWwoe30pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Rocm93cyBlcnJvcnMgaWYgY29uc3RyYWludHMgYXJlIG5vdCBtZXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpdCgncmV0dXJucyBpbnZhbGlkIGFyZ3VtZW50IGVycm9yIGlmIFwicHJlc2VudFwiIGNvbnN0cmFpbnQgbm90IG1ldCBvbiBwcm9wZXJ0eScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgKCgpID0+IHZhbGlkYXRlQ2Fwcyh7fSwge2Zvbzoge3ByZXNlbmNlOiB0cnVlfX0pKS5zaG91bGQudGhyb3coLydmb28nIGNhbid0IGJlIGJsYW5rLyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgdGhlIGNhcGFiaWxpdHkgdGhhdCB3YXMgcGFzc2VkIGluIGlmIFwic2tpcFByZXNlbmNlQ29uc3RyYWludFwiIGlzIGZhbHNlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YWxpZGF0ZUNhcHMoe30sIHtmb286IHtwcmVzZW5jZTogdHJ1ZX19LCB7c2tpcFByZXNlbmNlQ29uc3RyYWludDogdHJ1ZX0pLnNob3VsZC5kZWVwLmVxdWFsKHt9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBpbnZhbGlkIGFyZ3VtZW50IGVycm9yIGlmIFwiaXNTdHJpbmdcIiBjb25zdHJhaW50IG5vdCBtZXQgb24gcHJvcGVydHknLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICgoKSA9PiB2YWxpZGF0ZUNhcHMoe2ZvbzogMX0sIHtmb286IHtpc1N0cmluZzogdHJ1ZX19KSkuc2hvdWxkLnRocm93KC8nZm9vJyBtdXN0IGJlIG9mIHR5cGUgc3RyaW5nLyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgaW52YWxpZCBhcmd1bWVudCBlcnJvciBpZiBcImlzTnVtYmVyXCIgY29uc3RyYWludCBub3QgbWV0IG9uIHByb3BlcnR5JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAoKCkgPT4gdmFsaWRhdGVDYXBzKHtmb286ICdiYXInfSwge2Zvbzoge2lzTnVtYmVyOiB0cnVlfX0pKS5zaG91bGQudGhyb3coLydmb28nIG11c3QgYmUgb2YgdHlwZSBudW1iZXIvKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBpbnZhbGlkIGFyZ3VtZW50IGVycm9yIGlmIFwiaXNCb29sZWFuXCIgY29uc3RyYWludCBub3QgbWV0IG9uIHByb3BlcnR5JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAoKCkgPT4gdmFsaWRhdGVDYXBzKHtmb286ICdiYXInfSwge2Zvbzoge2lzQm9vbGVhbjogdHJ1ZX19KSkuc2hvdWxkLnRocm93KC8nZm9vJyBtdXN0IGJlIG9mIHR5cGUgYm9vbGVhbi8pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGludmFsaWQgYXJndW1lbnQgZXJyb3IgaWYgXCJpbmNsdXNpb25cIiBjb25zdHJhaW50IG5vdCBtZXQgb24gcHJvcGVydHknLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICgoKSA9PiB2YWxpZGF0ZUNhcHMoe2ZvbzogJzMnfSwge2Zvbzoge2luY2x1c2lvbkNhc2VJbnNlbnNpdGl2ZTogWycxJywgJzInXX19KSkuc2hvdWxkLnRocm93KC8nZm9vJyAzIG5vdCBwYXJ0IG9mIDEsMi8pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGludmFsaWQgYXJndW1lbnQgZXJyb3IgaWYgXCJpbmNsdXNpb25DYXNlSW5zZW5zaXRpdmVcIiBjb25zdHJhaW50IG5vdCBtZXQgb24gcHJvcGVydHknLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICgoKSA9PiB2YWxpZGF0ZUNhcHMoe2ZvbzogJ2EnfSwge2Zvbzoge2luY2x1c2lvbjogWydBJywgJ0InLCAnQyddfX0pKS5zaG91bGQudGhyb3coLydmb28nIGEgaXMgbm90IGluY2x1ZGVkIGluIHRoZSBsaXN0Lyk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbm90IHRocm93IGVycm9ycyBpZiBjb25zdHJhaW50cyBhcmUgbWV0JywgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGNhcHMgPSB7XG4gICAgICAgIG51bWJlcjogMSxcbiAgICAgICAgc3RyaW5nOiAnc3RyaW5nJyxcbiAgICAgICAgcHJlc2VudDogJ3ByZXNlbnQnLFxuICAgICAgICBleHRyYTogJ2V4dHJhJyxcbiAgICAgIH07XG5cbiAgICAgIGxldCBjb25zdHJhaW50cyA9IHtcbiAgICAgICAgbnVtYmVyOiB7aXNOdW1iZXI6IHRydWV9LFxuICAgICAgICBzdHJpbmc6IHtpc1N0cmluZzogdHJ1ZX0sXG4gICAgICAgIHByZXNlbnQ6IHtwcmVzZW5jZTogdHJ1ZX0sXG4gICAgICAgIG5vdFByZXNlbnQ6IHtwcmVzZW5jZTogZmFsc2V9LFxuICAgICAgfTtcblxuICAgICAgdmFsaWRhdGVDYXBzKGNhcHMsIGNvbnN0cmFpbnRzKS5zaG91bGQuZGVlcC5lcXVhbChjYXBzKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gVGVzdHMgYmFzZWQgb246IGh0dHBzOi8vd3d3LnczLm9yZy9UUi93ZWJkcml2ZXIvI2Rmbi1tZXJnaW5nLWNhcHNcbiAgZGVzY3JpYmUoJyNtZXJnZUNhcHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ3JldHVybnMgYSByZXN1bHQgdGhhdCBpcyB7fSBieSBkZWZhdWx0ICgxKScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIG1lcmdlQ2FwcygpLnNob3VsZC5kZWVwLmVxdWFsKHt9KTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGEgcmVzdWx0IHRoYXQgbWF0Y2hlcyBwcmltYXJ5IGJ5IGRlZmF1bHQgKDIsIDMpJywgZnVuY3Rpb24gKCkge1xuICAgICAgbWVyZ2VDYXBzKHtoZWxsbzogJ3dvcmxkJ30pLnNob3VsZC5kZWVwLmVxdWFsKHtoZWxsbzogJ3dvcmxkJ30pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgaW52YWxpZCBhcmd1bWVudCBlcnJvciBpZiBwcmltYXJ5IGFuZCBzZWNvbmRhcnkgaGF2ZSBtYXRjaGluZyBwcm9wZXJ0aWVzICg0KScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICgoKSA9PiBtZXJnZUNhcHMoe2hlbGxvOiAnd29ybGQnfSwge2hlbGxvOiAnd2hpcmwnfSkpLnNob3VsZC50aHJvdygvcHJvcGVydHkgJ2hlbGxvJyBzaG91bGQgbm90IGV4aXN0IG9uIGJvdGggcHJpbWFyeSBbXFx3XFxXXSogYW5kIHNlY29uZGFyeSBbXFx3XFxXXSovKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGEgcmVzdWx0IHdpdGgga2V5cyBmcm9tIHByaW1hcnkgYW5kIHNlY29uZGFyeSB0b2dldGhlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBwcmltYXJ5ID0ge1xuICAgICAgICBhOiAnYScsXG4gICAgICAgIGI6ICdiJyxcbiAgICAgIH07XG4gICAgICBsZXQgc2Vjb25kYXJ5ID0ge1xuICAgICAgICBjOiAnYycsXG4gICAgICAgIGQ6ICdkJyxcbiAgICAgIH07XG4gICAgICBtZXJnZUNhcHMocHJpbWFyeSwgc2Vjb25kYXJ5KS5zaG91bGQuZGVlcC5lcXVhbCh7XG4gICAgICAgIGE6ICdhJywgYjogJ2InLCBjOiAnYycsIGQ6ICdkJyxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICAvLyBUZXN0cyBiYXNlZCBvbjogaHR0cHM6Ly93d3cudzMub3JnL1RSL3dlYmRyaXZlci8jcHJvY2Vzc2luZy1jYXBzXG4gIGRlc2NyaWJlKCcjcGFyc2VDYXBzJywgZnVuY3Rpb24gKCkge1xuICAgIGxldCBjYXBzO1xuXG4gICAgYmVmb3JlRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBjYXBzID0ge307XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBpbnZhbGlkIGFyZ3VtZW50IGlmIG5vIGNhcHMgb2JqZWN0IHByb3ZpZGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgKCgpID0+IHBhcnNlQ2FwcygpKS5zaG91bGQudGhyb3coL211c3QgYmUgYSBKU09OIG9iamVjdC8pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3NldHMgXCJyZXF1aXJlZENhcHNcIiB0byBwcm9wZXJ0eSBuYW1lZCBcImFsd2F5c01hdGNoXCIgKDIpJywgZnVuY3Rpb24gKCkge1xuICAgICAgY2Fwcy5hbHdheXNNYXRjaCA9IHtoZWxsbzogJ3dvcmxkJ307XG4gICAgICBwYXJzZUNhcHMoY2FwcykucmVxdWlyZWRDYXBzLnNob3VsZC5kZWVwLmVxdWFsKGNhcHMuYWx3YXlzTWF0Y2gpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3NldHMgXCJyZXF1aXJlZENhcHNcIiB0byBlbXB0eSBKU09OIG9iamVjdCBpZiBcImFsd2F5c01hdGNoXCIgaXMgbm90IGFuIG9iamVjdCAoMi4xKScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHBhcnNlQ2FwcyhjYXBzKS5yZXF1aXJlZENhcHMuc2hvdWxkLmRlZXAuZXF1YWwoe30pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgaW52YWxpZCBhcmd1bWVudCBlcnJvciBpZiBcInJlcXVpcmVkQ2Fwc1wiIGRvblxcJ3QgbWF0Y2ggXCJjb25zdHJhaW50c1wiICgyLjIpJywgZnVuY3Rpb24gKCkge1xuICAgICAgY2Fwcy5hbHdheXNNYXRjaCA9IHtmb286IDF9O1xuICAgICAgKCgpID0+IHBhcnNlQ2FwcyhjYXBzLCB7Zm9vOiB7aXNTdHJpbmc6IHRydWV9fSkpLnNob3VsZC50aHJvdygvJ2ZvbycgbXVzdCBiZSBvZiB0eXBlIHN0cmluZy8pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3NldHMgXCJhbGxGaXJzdE1hdGNoQ2Fwc1wiIHRvIHByb3BlcnR5IG5hbWVkIFwiZmlyc3RNYXRjaFwiICgzKScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHBhcnNlQ2Fwcyh7fSwgW3t9XSkuYWxsRmlyc3RNYXRjaENhcHMuc2hvdWxkLmRlZXAuZXF1YWwoW3t9XSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2V0cyBcImFsbEZpcnN0TWF0Y2hDYXBzXCIgdG8gW3t9XSBpZiBcImZpcnN0TWF0Y2hcIiBpcyB1bmRlZmluZWQgKDMuMSknLCBmdW5jdGlvbiAoKSB7XG4gICAgICBwYXJzZUNhcHMoe30pLmFsbEZpcnN0TWF0Y2hDYXBzLnNob3VsZC5kZWVwLmVxdWFsKFt7fV0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgaW52YWxpZCBhcmd1bWVudCBlcnJvciBpZiBcImZpcnN0TWF0Y2hcIiBpcyBub3QgYW4gYXJyYXkgYW5kIGlzIG5vdCB1bmRlZmluZWQgKDMuMiknLCBmdW5jdGlvbiAoKSB7XG4gICAgICBmb3IgKGxldCBhcmcgb2YgW251bGwsIDEsIHRydWUsICdzdHJpbmcnXSkge1xuICAgICAgICBjYXBzLmZpcnN0TWF0Y2ggPSBhcmc7XG4gICAgICAgIChmdW5jdGlvbiAoKSB7IHBhcnNlQ2FwcyhjYXBzKTsgfSkuc2hvdWxkLnRocm93KC9tdXN0IGJlIGEgSlNPTiBhcnJheSBvciB1bmRlZmluZWQvKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGl0KCdoYXMgXCJ2YWxpZGF0ZWRGaXJzdE1hdGNoQ2Fwc1wiIHByb3BlcnR5IHRoYXQgaXMgZW1wdHkgYnkgZGVmYXVsdCBpZiBubyB2YWxpZCBmaXJzdE1hdGNoIGNhcHMgd2VyZSBmb3VuZCAoNCknLCBmdW5jdGlvbiAoKSB7XG4gICAgICBwYXJzZUNhcHMoY2Fwcywge2Zvbzoge3ByZXNlbmNlOiB0cnVlfX0pLnZhbGlkYXRlZEZpcnN0TWF0Y2hDYXBzLnNob3VsZC5kZWVwLmVxdWFsKFtdKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdyZXR1cm5zIGEgXCJ2YWxpZGF0ZWRGaXJzdE1hdGNoQ2Fwc1wiIGFycmF5ICg1KScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGl0KCd0aGF0IGVxdWFscyBcImZpcnN0TWF0Y2hcIiBpZiBmaXJzdE1hdGNoIGlzIG9uZSBlbXB0eSBvYmplY3QgYW5kIHRoZXJlIGFyZSBubyBjb25zdHJhaW50cycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2Fwcy5maXJzdE1hdGNoID0gW3t9XTtcbiAgICAgICAgcGFyc2VDYXBzKGNhcHMpLnZhbGlkYXRlZEZpcnN0TWF0Y2hDYXBzLnNob3VsZC5kZWVwLmVxdWFsKGNhcHMuZmlyc3RNYXRjaCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgXCJudWxsXCIgbWF0Y2hlZENhcHMgaWYgbm90aGluZyBtYXRjaGVzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjYXBzLmZpcnN0TWF0Y2ggPSBbe31dO1xuICAgICAgICBzaG91bGQuZXF1YWwocGFyc2VDYXBzKGNhcHMsIHtmb286IHtwcmVzZW5jZTogdHJ1ZX19KS5tYXRjaGVkQ2FwcywgbnVsbCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoYHNob3VsZCByZXR1cm4gY2FwYWJpbGl0aWVzIGlmIHByZXNlbmNlIGNvbnN0cmFpbnQgaXMgbWF0Y2hlZCBpbiBhdCBsZWFzdCBvbmUgb2YgdGhlICdmaXJzdE1hdGNoJyBjYXBhYmlsaXRpZXMgb2JqZWN0c2AsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2Fwcy5hbHdheXNNYXRjaCA9IHtcbiAgICAgICAgICBmb286ICdiYXInLFxuICAgICAgICB9O1xuICAgICAgICBjYXBzLmZpcnN0TWF0Y2ggPSBbe1xuICAgICAgICAgIGhlbGxvOiAnd29ybGQnLFxuICAgICAgICB9LCB7XG4gICAgICAgICAgZ29vZGJ5ZTogJ3dvcmxkJyxcbiAgICAgICAgfV07XG4gICAgICAgIHBhcnNlQ2FwcyhjYXBzLCB7Z29vZGJ5ZToge3ByZXNlbmNlOiB0cnVlfX0pLm1hdGNoZWRDYXBzLnNob3VsZC5kZWVwLmVxdWFsKHtcbiAgICAgICAgICBmb286ICdiYXInLFxuICAgICAgICAgIGdvb2RieWU6ICd3b3JsZCcsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KGB0aHJvd3MgaW52YWxpZCBhcmd1bWVudCBpZiBwcmVzZW5jZSBjb25zdHJhaW50IGlzIG5vdCBtZXQgb24gYW55IGNhcGFiaWxpdGllc2AsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2Fwcy5hbHdheXNNYXRjaCA9IHtcbiAgICAgICAgICBmb286ICdiYXInLFxuICAgICAgICB9O1xuICAgICAgICBjYXBzLmZpcnN0TWF0Y2ggPSBbe1xuICAgICAgICAgIGhlbGxvOiAnd29ybGQnLFxuICAgICAgICB9LCB7XG4gICAgICAgICAgZ29vZGJ5ZTogJ3dvcmxkJyxcbiAgICAgICAgfV07XG4gICAgICAgIHNob3VsZC5lcXVhbChwYXJzZUNhcHMoY2Fwcywge3NvbWVBdHRyaWJ1dGU6IHtwcmVzZW5jZTogdHJ1ZX19KS5tYXRjaGVkQ2FwcywgbnVsbCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3RoYXQgZXF1YWxzIGZpcnN0TWF0Y2ggaWYgZmlyc3RNYXRjaCBjb250YWlucyB0d28gb2JqZWN0cyB0aGF0IHBhc3MgdGhlIHByb3ZpZGVkIGNvbnN0cmFpbnRzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjYXBzLmFsd2F5c01hdGNoID0ge1xuICAgICAgICAgIGZvbzogJ2JhcidcbiAgICAgICAgfTtcbiAgICAgICAgY2Fwcy5maXJzdE1hdGNoID0gW1xuICAgICAgICAgIHtmb286ICdiYXIxJ30sXG4gICAgICAgICAge2ZvbzogJ2JhcjInfSxcbiAgICAgICAgXTtcblxuICAgICAgICBsZXQgY29uc3RyYWludHMgPSB7XG4gICAgICAgICAgZm9vOiB7XG4gICAgICAgICAgICBwcmVzZW5jZTogdHJ1ZSxcbiAgICAgICAgICAgIGlzU3RyaW5nOiB0cnVlLFxuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBwYXJzZUNhcHMoY2FwcywgY29uc3RyYWludHMpLnZhbGlkYXRlZEZpcnN0TWF0Y2hDYXBzLnNob3VsZC5kZWVwLmVxdWFsKGNhcHMuZmlyc3RNYXRjaCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgaW52YWxpZCBhcmd1bWVudCBlcnJvciBpZiB0aGUgZmlyc3RNYXRjaFsyXSBpcyBub3QgYW4gb2JqZWN0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjYXBzLmFsd2F5c01hdGNoID0gJ05vdCBhbiBvYmplY3QgYW5kIG5vdCB1bmRlZmluZWQnO1xuICAgICAgICBjYXBzLmZpcnN0TWF0Y2ggPSBbe2ZvbzogJ2Jhcid9LCAnZm9vJ107XG4gICAgICAgICgoKSA9PiBwYXJzZUNhcHMoY2Fwcywge30pKS5zaG91bGQudGhyb3coL211c3QgYmUgYSBKU09OIG9iamVjdC8pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncmV0dXJucyBhIG1hdGNoZWRDYXBzIG9iamVjdCAoNiknLCBmdW5jdGlvbiAoKSB7XG4gICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2Fwcy5hbHdheXNNYXRjaCA9IHtoZWxsbzogJ3dvcmxkJ307XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3doaWNoIGlzIHNhbWUgYXMgYWx3YXlzTWF0Y2ggaWYgZmlyc3RNYXRjaCBhcnJheSBpcyBub3QgcHJvdmlkZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBhcnNlQ2FwcyhjYXBzKS5tYXRjaGVkQ2Fwcy5zaG91bGQuZGVlcC5lcXVhbCh7aGVsbG86ICd3b3JsZCd9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnbWVyZ2VzIGNhcHMgdG9nZXRoZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhcHMuZmlyc3RNYXRjaCA9IFt7Zm9vOiAnYmFyJ31dO1xuICAgICAgICBwYXJzZUNhcHMoY2FwcykubWF0Y2hlZENhcHMuc2hvdWxkLmRlZXAuZXF1YWwoe2hlbGxvOiAnd29ybGQnLCBmb286ICdiYXInfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3dpdGggbWVyZ2VkIGNhcHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhcHMuZmlyc3RNYXRjaCA9IFt7aGVsbG86ICdiYXInLCBmb286ICdmb28nfSwge2ZvbzogJ2Jhcid9XTtcbiAgICAgICAgcGFyc2VDYXBzKGNhcHMpLm1hdGNoZWRDYXBzLnNob3VsZC5kZWVwLmVxdWFsKHtoZWxsbzogJ3dvcmxkJywgZm9vOiAnYmFyJ30pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCcjcHJvY2Vzc0NhcHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gXCJhbHdheXNNYXRjaFwiIGlmIFwiZmlyc3RNYXRjaFwiIGFuZCBcImNvbnN0cmFpbnRzXCIgd2VyZSBub3QgcHJvdmlkZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBwcm9jZXNzQ2FwYWJpbGl0aWVzKHt9KS5zaG91bGQuZGVlcC5lcXVhbCh7fSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBtZXJnZWQgY2FwcycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb2Nlc3NDYXBhYmlsaXRpZXMoe1xuICAgICAgICBhbHdheXNNYXRjaDoge2hlbGxvOiAnd29ybGQnfSxcbiAgICAgICAgZmlyc3RNYXRjaDogW3tmb286ICdiYXInfV1cbiAgICAgIH0pLnNob3VsZC5kZWVwLmVxdWFsKHtoZWxsbzogJ3dvcmxkJywgZm9vOiAnYmFyJ30pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBzdHJpcCBvdXQgdGhlIFwiYXBwaXVtOlwiIHByZWZpeCBmb3Igbm9uLXN0YW5kYXJkIGNhcGFiaWxpdGllcycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb2Nlc3NDYXBhYmlsaXRpZXMoe1xuICAgICAgICBhbHdheXNNYXRjaDogeydhcHBpdW06aGVsbG8nOiAnd29ybGQnfSxcbiAgICAgICAgZmlyc3RNYXRjaDogW3snYXBwaXVtOmZvbyc6ICdiYXInfV1cbiAgICAgIH0pLnNob3VsZC5kZWVwLmVxdWFsKHtoZWxsbzogJ3dvcmxkJywgZm9vOiAnYmFyJ30pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYSBzdGFuZGFyZCBjYXBhYmlsaXR5IChodHRwczovL3d3dy53My5vcmcvVFIvd2ViZHJpdmVyLyNkZm4tdGFibGUtb2Ytc3RhbmRhcmQtY2FwYWJpbGl0aWVzKSBpcyBwcmVmaXhlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICgoKSA9PiBwcm9jZXNzQ2FwYWJpbGl0aWVzKHtcbiAgICAgICAgYWx3YXlzTWF0Y2g6IHsnYXBwaXVtOnBsYXRmb3JtTmFtZSc6ICdXaGF0ZXZ6J30sXG4gICAgICAgIGZpcnN0TWF0Y2g6IFt7J2FwcGl1bTpicm93c2VyTmFtZSc6ICdBbnl0aGluZyd9XSxcbiAgICAgIH0pKS5zaG91bGQudGhyb3coL3N0YW5kYXJkIGNhcGFiaWxpdGllcy8pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBub3QgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIHByZXNlbmNlIGNvbnN0cmFpbnQgaXMgbm90IG1ldCBvbiBhIGZpcnN0TWF0Y2ggY2FwYWJpbGl0eScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IGNhcHMgPSBwcm9jZXNzQ2FwYWJpbGl0aWVzKHtcbiAgICAgICAgYWx3YXlzTWF0Y2g6IHsncGxhdGZvcm1OYW1lJzogJ0Zha2UnLCAnYXBwaXVtOmZha2VDYXAnOiAnZm9vYmFyJ30sXG4gICAgICAgIGZpcnN0TWF0Y2g6IFt7J2Zvbyc6ICdiYXInfV0sXG4gICAgICB9LCB7XG4gICAgICAgIHBsYXRmb3JtTmFtZToge1xuICAgICAgICAgIHByZXNlbmNlOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICBmYWtlQ2FwOiB7XG4gICAgICAgICAgcHJlc2VuY2U6IHRydWVcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgICBjYXBzLnBsYXRmb3JtTmFtZS5zaG91bGQuZXF1YWwoJ0Zha2UnKTtcbiAgICAgIGNhcHMuZmFrZUNhcC5zaG91bGQuZXF1YWwoJ2Zvb2JhcicpO1xuICAgICAgY2Fwcy5mb28uc2hvdWxkLmVxdWFsKCdiYXInKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIG5vIG1hdGNoaW5nIGNhcHMgd2VyZSBmb3VuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICgoKSA9PiBwcm9jZXNzQ2FwYWJpbGl0aWVzKHtcbiAgICAgICAgYWx3YXlzTWF0Y2g6IHsncGxhdGZvcm1OYW1lJzogJ0Zha2UnLCAnYXBwaXVtOmZha2VDYXAnOiAnZm9vYmFyJ30sXG4gICAgICAgIGZpcnN0TWF0Y2g6IFt7J2Zvbyc6ICdiYXInfV0sXG4gICAgICB9LCB7XG4gICAgICAgIHBsYXRmb3JtTmFtZToge1xuICAgICAgICAgIHByZXNlbmNlOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICBmYWtlQ2FwOiB7XG4gICAgICAgICAgcHJlc2VuY2U6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgbWlzc2luZ0NhcDoge1xuICAgICAgICAgIHByZXNlbmNlOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSkpLnNob3VsZC50aHJvdygvJ21pc3NpbmdDYXAnIGNhbid0IGJlIGJsYW5rLyk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgndmFsaWRhdGUgQXBwaXVtIGNvbnN0cmFpbnRzJywgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGNvbnN0cmFpbnRzID0gey4uLmRlc2lyZWRDYXBhYmlsaXR5Q29uc3RyYWludHN9O1xuXG4gICAgICBsZXQgbWF0Y2hpbmdDYXBzID0geydwbGF0Zm9ybU5hbWUnOiAnRmFrZScsICdhdXRvbWF0aW9uTmFtZSc6ICdGYWtlJywgJ2RldmljZU5hbWUnOiAnRmFrZSd9O1xuICAgICAgbGV0IGNhcHM7XG5cbiAgICAgIGl0KCdzaG91bGQgdmFsaWRhdGUgd2hlbiBhbHdheXNNYXRjaCBoYXMgdGhlIHByb3BlciBjYXBzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjYXBzID0ge1xuICAgICAgICAgIGFsd2F5c01hdGNoOiBtYXRjaGluZ0NhcHMsXG4gICAgICAgICAgZmlyc3RNYXRjaDogW3t9XSxcbiAgICAgICAgfTtcbiAgICAgICAgcHJvY2Vzc0NhcGFiaWxpdGllcyhjYXBzLCBjb25zdHJhaW50cykuc2hvdWxkLmRlZXAuZXF1YWwobWF0Y2hpbmdDYXBzKTtcbiAgICAgIH0pO1xuXG5cbiAgICAgIGl0KCdzaG91bGQgdmFsaWRhdGUgd2hlbiBmaXJzdE1hdGNoWzBdIGhhcyB0aGUgcHJvcGVyIGNhcHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhcHMgPSB7XG4gICAgICAgICAgYWx3YXlzTWF0Y2g6IHt9LFxuICAgICAgICAgIGZpcnN0TWF0Y2g6IFttYXRjaGluZ0NhcHNdLFxuICAgICAgICB9O1xuICAgICAgICBwcm9jZXNzQ2FwYWJpbGl0aWVzKGNhcHMsIGNvbnN0cmFpbnRzKS5zaG91bGQuZGVlcC5lcXVhbChtYXRjaGluZ0NhcHMpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgdmFsaWRhdGUgd2hlbiBhbHdheXNNYXRjaCBhbmQgZmlyc3RNYXRjaFswXSBoYXZlIHRoZSBwcm9wZXIgY2FwcyB3aGVuIG1lcmdlZCB0b2dldGhlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2FwcyA9IHtcbiAgICAgICAgICBhbHdheXNNYXRjaDogXy5vbWl0KG1hdGNoaW5nQ2FwcywgWydkZXZpY2VOYW1lJ10pLFxuICAgICAgICAgIGZpcnN0TWF0Y2g6IFt7J2FwcGl1bTpkZXZpY2VOYW1lJzogJ0Zha2UnfV0sXG4gICAgICAgIH07XG4gICAgICAgIHByb2Nlc3NDYXBhYmlsaXRpZXMoY2FwcywgY29uc3RyYWludHMpLnNob3VsZC5kZWVwLmVxdWFsKG1hdGNoaW5nQ2Fwcyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCB2YWxpZGF0ZSB3aGVuIGF1dG9tYXRpb25OYW1lIGlzIG9taXR0ZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhcHMgPSB7XG4gICAgICAgICAgYWx3YXlzTWF0Y2g6IF8ub21pdChtYXRjaGluZ0NhcHMsIFsnYXV0b21hdGlvbk5hbWUnXSksXG4gICAgICAgIH07XG4gICAgICAgIHByb2Nlc3NDYXBhYmlsaXRpZXMoY2FwcywgY29uc3RyYWludHMpLnNob3VsZC5kZWVwLmVxdWFsKF8ub21pdChtYXRjaGluZ0NhcHMsICdhdXRvbWF0aW9uTmFtZScpKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIHBhc3MgaWYgZmlyc3QgZWxlbWVudCBpbiBcImZpcnN0TWF0Y2hcIiBkb2VzIHZhbGlkYXRlIGFuZCBzZWNvbmQgZWxlbWVudCBkb2VzIG5vdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2FwcyA9IHtcbiAgICAgICAgICBhbHdheXNNYXRjaDoge30sXG4gICAgICAgICAgZmlyc3RNYXRjaDogW1xuICAgICAgICAgICAgbWF0Y2hpbmdDYXBzLFxuICAgICAgICAgICAge2JhZENhcHM6ICdiYWRDYXBzJ30sXG4gICAgICAgICAgXSxcbiAgICAgICAgfTtcbiAgICAgICAgcHJvY2Vzc0NhcGFiaWxpdGllcyhjYXBzLCBjb25zdHJhaW50cykuc2hvdWxkLmRlZXAuZXF1YWwobWF0Y2hpbmdDYXBzKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIHBhc3MgaWYgZmlyc3QgZWxlbWVudCBpbiBcImZpcnN0TWF0Y2hcIiBkb2VzIG5vdCB2YWxpZGF0ZSBhbmQgc2Vjb25kIGVsZW1lbnQgZG9lcycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2FwcyA9IHtcbiAgICAgICAgICBhbHdheXNNYXRjaDoge30sXG4gICAgICAgICAgZmlyc3RNYXRjaDogW1xuICAgICAgICAgICAge2JhZENhcHM6ICdiYWRDYXBzJ30sXG4gICAgICAgICAgICBtYXRjaGluZ0NhcHMsXG4gICAgICAgICAgXSxcbiAgICAgICAgfTtcbiAgICAgICAgcHJvY2Vzc0NhcGFiaWxpdGllcyhjYXBzLCBjb25zdHJhaW50cykuc2hvdWxkLmRlZXAuZXF1YWwobWF0Y2hpbmdDYXBzKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIGZhaWwgd2hlbiBkZXZpY2VOYW1lIGlzIGJsYW5rJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjYXBzID0ge1xuICAgICAgICAgIGFsd2F5c01hdGNoOiBfLm9taXQobWF0Y2hpbmdDYXBzLCBbJ2RldmljZU5hbWUnXSksXG4gICAgICAgIH07XG4gICAgICAgICgoKSA9PiBwcm9jZXNzQ2FwYWJpbGl0aWVzKGNhcHMsIGNvbnN0cmFpbnRzKSkuc2hvdWxkLnRocm93KC8nZGV2aWNlTmFtZScgY2FuJ3QgYmUgYmxhbmsvKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIGZhaWwgd2hlbiBhIGJhZCBhdXRvbWF0aW9uIG5hbWUgaXMgcHJvdmlkZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhcHMgPSB7XG4gICAgICAgICAgYWx3YXlzTWF0Y2g6IHtcbiAgICAgICAgICAgIC4uLm1hdGNoaW5nQ2FwcyxcbiAgICAgICAgICAgIGF1dG9tYXRpb25OYW1lOiAnTm90QVZhbGlkQXV0b21hdGlvbk5hbWUnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgICgoKSA9PiBwcm9jZXNzQ2FwYWJpbGl0aWVzKGNhcHMsIGNvbnN0cmFpbnRzKSkuc2hvdWxkLnRocm93KC8nYXV0b21hdGlvbk5hbWUnIE5vdEFWYWxpZEF1dG9tYXRpb25OYW1lIG5vdCBwYXJ0IG9mLyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCBmYWlsIHdoZW4gYmFkIHBhcmFtZXRlcnMgYXJlIHBhc3NlZCBpbiBtb3JlIHRoYW4gb25lIGZpcnN0TWF0Y2ggY2FwYWJpbGl0eScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2FwcyA9IHtcbiAgICAgICAgICBhbHdheXNNYXRjaDoge30sXG4gICAgICAgICAgZmlyc3RNYXRjaDogW3tcbiAgICAgICAgICAgIGJhZDogJ3BhcmFtcycsXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbW9yZTogJ2JhZC1wYXJhbXMnLFxuICAgICAgICAgIH1dLFxuICAgICAgICB9O1xuICAgICAgICAoKCkgPT4gcHJvY2Vzc0NhcGFiaWxpdGllcyhjYXBzLCBjb25zdHJhaW50cykpLnNob3VsZC50aHJvdygvQ291bGQgbm90IGZpbmQgbWF0Y2hpbmcgY2FwYWJpbGl0aWVzLyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCcuZmluZE5vblByZWZpeGVkQ2FwcycsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIGZpbmQgYWx3YXlzTWF0Y2ggY2FwcyB3aXRoIG5vIHByZWZpeCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGZpbmROb25QcmVmaXhlZENhcHMoe2Fsd2F5c01hdGNoOiB7XG4gICAgICAgICdub24tc3RhbmRhcmQnOiAnZHVtbXknLFxuICAgICAgfX0pLnNob3VsZC5lcWwoWydub24tc3RhbmRhcmQnXSk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBub3QgZmluZCBhIHN0YW5kYXJkIGNhcCBpbiBhbHdheXNNYXRjaCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGZpbmROb25QcmVmaXhlZENhcHMoe2Fsd2F5c01hdGNoOiB7XG4gICAgICAgICdwbGF0Zm9ybU5hbWUnOiAnQW55JyxcbiAgICAgIH19KS5zaG91bGQuZXFsKFtdKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGZpbmQgZmlyc3RNYXRjaCBjYXBzIHdpdGggbm8gcHJlZml4JywgZnVuY3Rpb24gKCkge1xuICAgICAgZmluZE5vblByZWZpeGVkQ2Fwcyh7YWx3YXlzTWF0Y2g6IHt9LCBmaXJzdE1hdGNoOiBbe1xuICAgICAgICAnbm9uLXN0YW5kYXJkJzogJ2R1bW15JyxcbiAgICAgIH1dfSkuc2hvdWxkLmVxbChbJ25vbi1zdGFuZGFyZCddKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIG5vdCBmaW5kIGEgc3RhbmRhcmQgY2FwIGluIHByZWZpeCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGZpbmROb25QcmVmaXhlZENhcHMoe2Fsd2F5c01hdGNoOiB7fSwgZmlyc3RNYXRjaDogW3tcbiAgICAgICAgJ3BsYXRmb3JtTmFtZSc6ICdBbnknLFxuICAgICAgfV19KS5zaG91bGQuZXFsKFtdKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGZpbmQgZmlyc3RNYXRjaCBjYXBzIGluIHNlY29uZCBpdGVtIG9mIGZpcnN0TWF0Y2ggYXJyYXknLCBmdW5jdGlvbiAoKSB7XG4gICAgICBmaW5kTm9uUHJlZml4ZWRDYXBzKHthbHdheXNNYXRjaDoge30sIGZpcnN0TWF0Y2g6IFt7fSwge1xuICAgICAgICAnbm9uLXN0YW5kYXJkJzogJ2R1bW15JyxcbiAgICAgIH1dfSkuc2hvdWxkLmVxbChbJ25vbi1zdGFuZGFyZCddKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHJlbW92ZSBkdXBsaWNhdGVzIGZyb20gYWx3YXlzTWF0Y2ggYW5kIGZpcnN0TWF0Y2gnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBmaW5kTm9uUHJlZml4ZWRDYXBzKHthbHdheXNNYXRjaDoge1xuICAgICAgICAnbm9uLXN0YW5kYXJkJzogJ3NvbWV0aGluZycsXG4gICAgICB9LCBmaXJzdE1hdGNoOiBbe1xuICAgICAgICAnbm9uLXN0YW5kYXJkJzogJ2R1bW15JyxcbiAgICAgIH1dfSkuc2hvdWxkLmVxbChbJ25vbi1zdGFuZGFyZCddKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHJlbW92ZSBkdXBsaWNhdGVzIGZyb20gZmlyc3RNYXRjaCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGZpbmROb25QcmVmaXhlZENhcHMoe2ZpcnN0TWF0Y2g6IFt7XG4gICAgICAgICdub24tc3RhbmRhcmQnOiAnZHVtbXknLFxuICAgICAgfSwge1xuICAgICAgICAnbm9uLXN0YW5kYXJkJzogJ2R1bW15IDInLFxuICAgICAgfV19KS5zaG91bGQuZXFsKFsnbm9uLXN0YW5kYXJkJ10pO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgcmVtb3ZlIGR1cGxpY2F0ZXMgYW5kIGtlZXAgc3RhbmRhcmQgY2FwYWJpbGl0aWVzJywgZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgYWx3YXlzTWF0Y2ggPSB7XG4gICAgICAgIHBsYXRmb3JtTmFtZTogJ0Zha2UnLFxuICAgICAgICBub25TdGFuZGFyZE9uZTogJ25vbi1zdGFuZGFyZCcsXG4gICAgICAgIG5vblN0YW5kYXJkVHdvOiAnbm9uLXN0YW5kYXJkJyxcbiAgICAgIH07XG4gICAgICBjb25zdCBmaXJzdE1hdGNoID0gW1xuICAgICAgICB7bm9uU3RhbmRhcmRUaHJlZTogJ25vbi1zdGFuZGFyZCcsIG5vblN0YW5kYXJkRm91cjogJ25vbi1zdGFuZGFyZCcsIGJyb3dzZXJOYW1lOiAnRmFrZUJyb3dzZXInfSxcbiAgICAgICAge25vblN0YW5kYXJkVGhyZWU6ICdub24tc3RhbmRhcmQnLCBub25TdGFuZGFyZEZvdXI6ICdub24tc3RhbmRhcmQnLCBub25TdGFuZGFyZEZpdmU6ICdub24tc3RhbmRhcmQnLCBicm93c2VyVmVyc2lvbjogJ3doYXRldmEnfSxcbiAgICAgIF07XG4gICAgICBmaW5kTm9uUHJlZml4ZWRDYXBzKHthbHdheXNNYXRjaCwgZmlyc3RNYXRjaH0pLnNob3VsZC5lcWwoWydub25TdGFuZGFyZE9uZScsICdub25TdGFuZGFyZFR3bycsICdub25TdGFuZGFyZFRocmVlJywgJ25vblN0YW5kYXJkRm91cicsICdub25TdGFuZGFyZEZpdmUnXSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uIn0=
