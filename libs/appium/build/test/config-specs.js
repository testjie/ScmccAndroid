require('source-map-support').install();

'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _libConfig = require('../lib/config');

var _libParser = require('../lib/parser');

var _libParser2 = _interopRequireDefault(_libParser);

var _libLogger = require('../lib/logger');

var _libLogger2 = _interopRequireDefault(_libLogger);

var should = _chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('Config', function () {
  describe('getGitRev', function () {
    it('should get a reasonable git revision', function callee$2$0() {
      var rev;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap((0, _libConfig.getGitRev)());

          case 2:
            rev = context$3$0.sent;

            rev.should.be.a('string');
            rev.length.should.be.equal(40);
            rev.match(/[0-9a-f]+/i)[0].should.eql(rev);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('Appium config', function () {
    describe('getAppiumConfig', function () {
      it('should get a configuration object', function callee$3$0() {
        var config;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap((0, _libConfig.getAppiumConfig)());

            case 2:
              config = context$4$0.sent;

              config.should.be.an('object');
              should.exist(config['git-sha']);
              should.exist(config.built);
              should.exist(config.version);

            case 7:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
    });
    describe('showConfig', function () {
      before(function () {
        _sinon2['default'].spy(console, "log");
      });
      it('should log the config to console', function callee$3$0() {
        var config;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap((0, _libConfig.getAppiumConfig)());

            case 2:
              config = context$4$0.sent;
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap((0, _libConfig.showConfig)());

            case 5:
              console.log.calledOnce.should.be['true']; // eslint-disable-line no-console
              console.log.getCall(0).args[0].should.contain(JSON.stringify(config)); // eslint-disable-line no-console

            case 7:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      });
    });
  });

  describe('node.js config', function () {
    var _process = process;
    before(function () {
      // need to be able to write to process.version
      // but also to have access to process methods
      // so copy them over to a writable object
      var tempProcess = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _getIterator(_lodash2['default'].toPairs(process)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2);

          var prop = _step$value[0];
          var value = _step$value[1];

          tempProcess[prop] = value;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      process = tempProcess;
    });
    after(function () {
      process = _process;
    });
    describe('checkNodeOk', function () {
      it('should fail if node is below 6', function () {
        process.version = 'v4.4.7';
        _libConfig.checkNodeOk.should['throw']();
        process.version = 'v0.9.12';
        _libConfig.checkNodeOk.should['throw']();
        process.version = 'v0.1';
        _libConfig.checkNodeOk.should['throw']();
        process.version = 'v0.10.36';
        _libConfig.checkNodeOk.should['throw']();
        process.version = 'v0.12.14';
        _libConfig.checkNodeOk.should['throw']();
        process.version = 'v5.7.0';
        _libConfig.checkNodeOk.should['throw']();
      });
      it('should succeed if node is 6+', function () {
        process.version = 'v6.3.1';
        _libConfig.checkNodeOk.should.not['throw']();
      });
      it('should succeed if node is 7+', function () {
        process.version = 'v7.1.1';
        _libConfig.checkNodeOk.should.not['throw']();
      });
      it('should succeed if node is 8+', function () {
        process.version = 'v8.1.2';
        _libConfig.checkNodeOk.should.not['throw']();
      });
      it('should succeed if node is 9+', function () {
        process.version = 'v9.1.2';
        _libConfig.checkNodeOk.should.not['throw']();
      });
    });

    describe('warnNodeDeprecations', function () {
      var spy = undefined;
      before(function () {
        spy = _sinon2['default'].spy(_libLogger2['default'], "warn");
      });
      beforeEach(function () {
        spy.resetHistory();
      });
      it('should log a warning if node is below 8', function () {
        process.version = 'v7.10.1';
        (0, _libConfig.warnNodeDeprecations)();
        _libLogger2['default'].warn.callCount.should.equal(1);
      });
      it('should not log a warning if node is 8+', function () {
        process.version = 'v8.0.0';
        (0, _libConfig.warnNodeDeprecations)();
        _libLogger2['default'].warn.callCount.should.equal(0);
      });
      it('should not log a warning if node is 9+', function () {
        process.version = 'v9.0.0';
        (0, _libConfig.warnNodeDeprecations)();
        _libLogger2['default'].warn.callCount.should.equal(0);
      });
    });
  });

  describe('server arguments', function () {
    var parser = (0, _libParser2['default'])();
    parser.debug = true; // throw instead of exit on error; pass as option instead?
    var args = {};
    beforeEach(function () {
      // give all the defaults
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _getIterator(parser.rawArgs), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var rawArg = _step2.value;

          args[rawArg[1].dest] = rawArg[1].defaultValue;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    });
    describe('getNonDefaultArgs', function () {
      it('should show none if we have all the defaults', function () {
        var nonDefaultArgs = (0, _libConfig.getNonDefaultArgs)(parser, args);
        _lodash2['default'].keys(nonDefaultArgs).length.should.equal(0);
      });
      it('should catch a non-default argument', function () {
        args.isolateSimDevice = true;
        var nonDefaultArgs = (0, _libConfig.getNonDefaultArgs)(parser, args);
        _lodash2['default'].keys(nonDefaultArgs).length.should.equal(1);
        should.exist(nonDefaultArgs.isolateSimDevice);
      });
    });

    describe('getDeprecatedArgs', function () {
      it('should show none if we have no deprecated arguments', function () {
        var deprecatedArgs = (0, _libConfig.getDeprecatedArgs)(parser, args);
        _lodash2['default'].keys(deprecatedArgs).length.should.equal(0);
      });
      it('should catch a deprecated argument', function () {
        args.showIOSLog = true;
        var deprecatedArgs = (0, _libConfig.getDeprecatedArgs)(parser, args);
        _lodash2['default'].keys(deprecatedArgs).length.should.equal(1);
        should.exist(deprecatedArgs['--show-ios-log']);
      });
      it('should catch a non-boolean deprecated argument', function () {
        args.calendarFormat = 'orwellian';
        var deprecatedArgs = (0, _libConfig.getDeprecatedArgs)(parser, args);
        _lodash2['default'].keys(deprecatedArgs).length.should.equal(1);
        should.exist(deprecatedArgs['--calendar-format']);
      });
    });
  });

  describe('checkValidPort', function () {
    it('should be false for port too high', function () {
      (0, _libConfig.checkValidPort)(65536).should.be['false'];
    });
    it('should be false for port too low', function () {
      (0, _libConfig.checkValidPort)(0).should.be['false'];
    });
    it('should be true for port 1', function () {
      (0, _libConfig.checkValidPort)(1).should.be['true'];
    });
    it('should be true for port 65535', function () {
      (0, _libConfig.checkValidPort)(65535).should.be['true'];
    });
  });

  describe('validateTmpDir', function () {
    it('should fail to use a tmp dir with incorrect permissions', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            (0, _libConfig.validateTmpDir)('/private/if_you_run_with_sudo_this_wont_fail').should.be.rejectedWith(/could not ensure/);

          case 1:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should fail to use an undefined tmp dir', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            (0, _libConfig.validateTmpDir)().should.be.rejectedWith(/could not ensure/);

          case 1:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should be able to use a tmp dir with correct permissions', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            (0, _libConfig.validateTmpDir)('/tmp/test_tmp_dir/with/any/number/of/levels').should.not.be.rejected;

          case 1:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('parsing args with empty argv[1]', function () {
    var argv1 = undefined;

    before(function () {
      argv1 = process.argv[1];
    });

    after(function () {
      process.argv[1] = argv1;
    });

    it('should not fail if process.argv[1] is undefined', function () {
      process.argv[1] = undefined;
      var args = (0, _libParser2['default'])();
      args.prog.should.be.equal('Appium');
    });

    it('should set "prog" to process.argv[1]', function () {
      process.argv[1] = 'Hello World';
      var args = (0, _libParser2['default'])();
      args.prog.should.be.equal('Hello World');
    });
  });

  describe('validateServerArgs', function () {
    var parser = (0, _libParser2['default'])();
    parser.debug = true; // throw instead of exit on error; pass as option instead?
    var defaultArgs = {};
    // give all the defaults
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = _getIterator(parser.rawArgs), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var rawArg = _step3.value;

        defaultArgs[rawArg[1].dest] = rawArg[1].defaultValue;
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
          _iterator3['return']();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    var args = {};
    beforeEach(function () {
      args = _lodash2['default'].clone(defaultArgs);
    });
    describe('mutually exclusive server arguments', function () {
      describe('noReset and fullReset', function () {
        it('should not allow both', function () {
          (function () {
            args.noReset = args.fullReset = true;
            (0, _libConfig.validateServerArgs)(parser, args);
          }).should['throw']();
        });
        it('should allow noReset', function () {
          (function () {
            args.noReset = true;
            (0, _libConfig.validateServerArgs)(parser, args);
          }).should.not['throw']();
        });
        it('should allow fullReset', function () {
          (function () {
            args.fullReset = true;
            (0, _libConfig.validateServerArgs)(parser, args);
          }).should.not['throw']();
        });
      });
      describe('ipa and safari', function () {
        it('should not allow both', function () {
          (function () {
            args.ipa = args.safari = true;
            (0, _libConfig.validateServerArgs)(parser, args);
          }).should['throw']();
        });
        it('should allow ipa', function () {
          (function () {
            args.ipa = true;
            (0, _libConfig.validateServerArgs)(parser, args);
          }).should.not['throw']();
        });
        it('should allow safari', function () {
          (function () {
            args.safari = true;
            (0, _libConfig.validateServerArgs)(parser, args);
          }).should.not['throw']();
        });
      });
      describe('app and safari', function () {
        it('should not allow both', function () {
          (function () {
            args.app = args.safari = true;
            (0, _libConfig.validateServerArgs)(parser, args);
          }).should['throw']();
        });
        it('should allow app', function () {
          (function () {
            args.app = true;
            (0, _libConfig.validateServerArgs)(parser, args);
          }).should.not['throw']();
        });
      });
      describe('forceIphone and forceIpad', function () {
        it('should not allow both', function () {
          (function () {
            args.forceIphone = args.forceIpad = true;
            (0, _libConfig.validateServerArgs)(parser, args);
          }).should['throw']();
        });
        it('should allow forceIphone', function () {
          (function () {
            args.forceIphone = true;
            (0, _libConfig.validateServerArgs)(parser, args);
          }).should.not['throw']();
        });
        it('should allow forceIpad', function () {
          (function () {
            args.forceIpad = true;
            (0, _libConfig.validateServerArgs)(parser, args);
          }).should.not['throw']();
        });
      });
      describe('deviceName and defaultDevice', function () {
        it('should not allow both', function () {
          (function () {
            args.deviceName = args.defaultDevice = true;
            (0, _libConfig.validateServerArgs)(parser, args);
          }).should['throw']();
        });
        it('should allow deviceName', function () {
          (function () {
            args.deviceName = true;
            (0, _libConfig.validateServerArgs)(parser, args);
          }).should.not['throw']();
        });
        it('should allow defaultDevice', function () {
          (function () {
            args.defaultDevice = true;
            (0, _libConfig.validateServerArgs)(parser, args);
          }).should.not['throw']();
        });
      });
    });
    describe('validated arguments', function () {
      // checking ports is already done.
      // the only argument left is `backendRetries`
      describe('backendRetries', function () {
        it('should fail with value less than 0', function () {
          args.backendRetries = -1;
          (function () {
            (0, _libConfig.validateServerArgs)(parser, args);
          }).should['throw']();
        });
        it('should succeed with value of 0', function () {
          args.backendRetries = 0;
          (function () {
            (0, _libConfig.validateServerArgs)(parser, args);
          }).should.not['throw']();
        });
        it('should succeed with value above 0', function () {
          args.backendRetries = 100;
          (function () {
            (0, _libConfig.validateServerArgs)(parser, args);
          }).should.not['throw']();
        });
      });
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvY29uZmlnLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztzQkFFYyxRQUFROzs7O29CQUNMLE1BQU07Ozs7cUJBQ0wsT0FBTzs7Ozs4QkFDRSxrQkFBa0I7Ozs7eUJBR2MsZUFBZTs7eUJBQ3BELGVBQWU7Ozs7eUJBQ2xCLGVBQWU7Ozs7QUFHbEMsSUFBSSxNQUFNLEdBQUcsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDM0Isa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFHekIsUUFBUSxDQUFDLFFBQVEsRUFBRSxZQUFZO0FBQzdCLFVBQVEsQ0FBQyxXQUFXLEVBQUUsWUFBWTtBQUNoQyxNQUFFLENBQUMsc0NBQXNDLEVBQUU7VUFDckMsR0FBRzs7Ozs7NkNBQVMsMkJBQVc7OztBQUF2QixlQUFHOztBQUNQLGVBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMxQixlQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQy9CLGVBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Ozs7OztLQUM1QyxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7O0FBRUgsVUFBUSxDQUFDLGVBQWUsRUFBRSxZQUFZO0FBQ3BDLFlBQVEsQ0FBQyxpQkFBaUIsRUFBRSxZQUFZO0FBQ3RDLFFBQUUsQ0FBQyxtQ0FBbUMsRUFBRTtZQUNsQyxNQUFNOzs7OzsrQ0FBUyxpQ0FBaUI7OztBQUFoQyxvQkFBTTs7QUFDVixvQkFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzlCLG9CQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0FB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IHRyYW5zcGlsZTptb2NoYVxuXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgc2lub24gZnJvbSAnc2lub24nO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IHsgZ2V0R2l0UmV2LCBnZXRBcHBpdW1Db25maWcsIGNoZWNrTm9kZU9rLCB3YXJuTm9kZURlcHJlY2F0aW9ucyxcbiAgICAgICAgIGdldE5vbkRlZmF1bHRBcmdzLCBnZXREZXByZWNhdGVkQXJncywgdmFsaWRhdGVTZXJ2ZXJBcmdzLFxuICAgICAgICAgdmFsaWRhdGVUbXBEaXIsIHNob3dDb25maWcsIGNoZWNrVmFsaWRQb3J0IH0gZnJvbSAnLi4vbGliL2NvbmZpZyc7XG5pbXBvcnQgZ2V0UGFyc2VyIGZyb20gJy4uL2xpYi9wYXJzZXInO1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuLi9saWIvbG9nZ2VyJztcblxuXG5sZXQgc2hvdWxkID0gY2hhaS5zaG91bGQoKTtcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcblxuXG5kZXNjcmliZSgnQ29uZmlnJywgZnVuY3Rpb24gKCkge1xuICBkZXNjcmliZSgnZ2V0R2l0UmV2JywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdzaG91bGQgZ2V0IGEgcmVhc29uYWJsZSBnaXQgcmV2aXNpb24nLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgcmV2ID0gYXdhaXQgZ2V0R2l0UmV2KCk7XG4gICAgICByZXYuc2hvdWxkLmJlLmEoJ3N0cmluZycpO1xuICAgICAgcmV2Lmxlbmd0aC5zaG91bGQuYmUuZXF1YWwoNDApO1xuICAgICAgcmV2Lm1hdGNoKC9bMC05YS1mXSsvaSlbMF0uc2hvdWxkLmVxbChyZXYpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnQXBwaXVtIGNvbmZpZycsIGZ1bmN0aW9uICgpIHtcbiAgICBkZXNjcmliZSgnZ2V0QXBwaXVtQ29uZmlnJywgZnVuY3Rpb24gKCkge1xuICAgICAgaXQoJ3Nob3VsZCBnZXQgYSBjb25maWd1cmF0aW9uIG9iamVjdCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IGNvbmZpZyA9IGF3YWl0IGdldEFwcGl1bUNvbmZpZygpO1xuICAgICAgICBjb25maWcuc2hvdWxkLmJlLmFuKCdvYmplY3QnKTtcbiAgICAgICAgc2hvdWxkLmV4aXN0KGNvbmZpZ1snZ2l0LXNoYSddKTtcbiAgICAgICAgc2hvdWxkLmV4aXN0KGNvbmZpZy5idWlsdCk7XG4gICAgICAgIHNob3VsZC5leGlzdChjb25maWcudmVyc2lvbik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnc2hvd0NvbmZpZycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGJlZm9yZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNpbm9uLnNweShjb25zb2xlLCBcImxvZ1wiKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCBsb2cgdGhlIGNvbmZpZyB0byBjb25zb2xlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgY29uZmlnID0gYXdhaXQgZ2V0QXBwaXVtQ29uZmlnKCk7XG4gICAgICAgIGF3YWl0IHNob3dDb25maWcoKTtcbiAgICAgICAgY29uc29sZS5sb2cuY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmxvZy5nZXRDYWxsKDApLmFyZ3NbMF0uc2hvdWxkLmNvbnRhaW4oSlNPTi5zdHJpbmdpZnkoY29uZmlnKSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdub2RlLmpzIGNvbmZpZycsIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgX3Byb2Nlc3MgPSBwcm9jZXNzO1xuICAgIGJlZm9yZShmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBuZWVkIHRvIGJlIGFibGUgdG8gd3JpdGUgdG8gcHJvY2Vzcy52ZXJzaW9uXG4gICAgICAvLyBidXQgYWxzbyB0byBoYXZlIGFjY2VzcyB0byBwcm9jZXNzIG1ldGhvZHNcbiAgICAgIC8vIHNvIGNvcHkgdGhlbSBvdmVyIHRvIGEgd3JpdGFibGUgb2JqZWN0XG4gICAgICBsZXQgdGVtcFByb2Nlc3MgPSB7fTtcbiAgICAgIGZvciAobGV0IFtwcm9wLCB2YWx1ZV0gb2YgXy50b1BhaXJzKHByb2Nlc3MpKSB7XG4gICAgICAgIHRlbXBQcm9jZXNzW3Byb3BdID0gdmFsdWU7XG4gICAgICB9XG4gICAgICBwcm9jZXNzID0gdGVtcFByb2Nlc3M7XG4gICAgfSk7XG4gICAgYWZ0ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgcHJvY2VzcyA9IF9wcm9jZXNzO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdjaGVja05vZGVPaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGl0KCdzaG91bGQgZmFpbCBpZiBub2RlIGlzIGJlbG93IDYnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHByb2Nlc3MudmVyc2lvbiA9ICd2NC40LjcnO1xuICAgICAgICBjaGVja05vZGVPay5zaG91bGQudGhyb3coKTtcbiAgICAgICAgcHJvY2Vzcy52ZXJzaW9uID0gJ3YwLjkuMTInO1xuICAgICAgICBjaGVja05vZGVPay5zaG91bGQudGhyb3coKTtcbiAgICAgICAgcHJvY2Vzcy52ZXJzaW9uID0gJ3YwLjEnO1xuICAgICAgICBjaGVja05vZGVPay5zaG91bGQudGhyb3coKTtcbiAgICAgICAgcHJvY2Vzcy52ZXJzaW9uID0gJ3YwLjEwLjM2JztcbiAgICAgICAgY2hlY2tOb2RlT2suc2hvdWxkLnRocm93KCk7XG4gICAgICAgIHByb2Nlc3MudmVyc2lvbiA9ICd2MC4xMi4xNCc7XG4gICAgICAgIGNoZWNrTm9kZU9rLnNob3VsZC50aHJvdygpO1xuICAgICAgICBwcm9jZXNzLnZlcnNpb24gPSAndjUuNy4wJztcbiAgICAgICAgY2hlY2tOb2RlT2suc2hvdWxkLnRocm93KCk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgc3VjY2VlZCBpZiBub2RlIGlzIDYrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBwcm9jZXNzLnZlcnNpb24gPSAndjYuMy4xJztcbiAgICAgICAgY2hlY2tOb2RlT2suc2hvdWxkLm5vdC50aHJvdygpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIHN1Y2NlZWQgaWYgbm9kZSBpcyA3KycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcHJvY2Vzcy52ZXJzaW9uID0gJ3Y3LjEuMSc7XG4gICAgICAgIGNoZWNrTm9kZU9rLnNob3VsZC5ub3QudGhyb3coKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCBzdWNjZWVkIGlmIG5vZGUgaXMgOCsnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHByb2Nlc3MudmVyc2lvbiA9ICd2OC4xLjInO1xuICAgICAgICBjaGVja05vZGVPay5zaG91bGQubm90LnRocm93KCk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgc3VjY2VlZCBpZiBub2RlIGlzIDkrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBwcm9jZXNzLnZlcnNpb24gPSAndjkuMS4yJztcbiAgICAgICAgY2hlY2tOb2RlT2suc2hvdWxkLm5vdC50aHJvdygpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnd2Fybk5vZGVEZXByZWNhdGlvbnMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgc3B5O1xuICAgICAgYmVmb3JlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3B5ID0gc2lub24uc3B5KGxvZ2dlciwgXCJ3YXJuXCIpO1xuICAgICAgfSk7XG4gICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3B5LnJlc2V0SGlzdG9yeSgpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIGxvZyBhIHdhcm5pbmcgaWYgbm9kZSBpcyBiZWxvdyA4JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBwcm9jZXNzLnZlcnNpb24gPSAndjcuMTAuMSc7XG4gICAgICAgIHdhcm5Ob2RlRGVwcmVjYXRpb25zKCk7XG4gICAgICAgIGxvZ2dlci53YXJuLmNhbGxDb3VudC5zaG91bGQuZXF1YWwoMSk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgbm90IGxvZyBhIHdhcm5pbmcgaWYgbm9kZSBpcyA4KycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcHJvY2Vzcy52ZXJzaW9uID0gJ3Y4LjAuMCc7XG4gICAgICAgIHdhcm5Ob2RlRGVwcmVjYXRpb25zKCk7XG4gICAgICAgIGxvZ2dlci53YXJuLmNhbGxDb3VudC5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgbm90IGxvZyBhIHdhcm5pbmcgaWYgbm9kZSBpcyA5KycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcHJvY2Vzcy52ZXJzaW9uID0gJ3Y5LjAuMCc7XG4gICAgICAgIHdhcm5Ob2RlRGVwcmVjYXRpb25zKCk7XG4gICAgICAgIGxvZ2dlci53YXJuLmNhbGxDb3VudC5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3NlcnZlciBhcmd1bWVudHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHBhcnNlciA9IGdldFBhcnNlcigpO1xuICAgIHBhcnNlci5kZWJ1ZyA9IHRydWU7IC8vIHRocm93IGluc3RlYWQgb2YgZXhpdCBvbiBlcnJvcjsgcGFzcyBhcyBvcHRpb24gaW5zdGVhZD9cbiAgICBsZXQgYXJncyA9IHt9O1xuICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgLy8gZ2l2ZSBhbGwgdGhlIGRlZmF1bHRzXG4gICAgICBmb3IgKGxldCByYXdBcmcgb2YgcGFyc2VyLnJhd0FyZ3MpIHtcbiAgICAgICAgYXJnc1tyYXdBcmdbMV0uZGVzdF0gPSByYXdBcmdbMV0uZGVmYXVsdFZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdnZXROb25EZWZhdWx0QXJncycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGl0KCdzaG91bGQgc2hvdyBub25lIGlmIHdlIGhhdmUgYWxsIHRoZSBkZWZhdWx0cycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IG5vbkRlZmF1bHRBcmdzID0gZ2V0Tm9uRGVmYXVsdEFyZ3MocGFyc2VyLCBhcmdzKTtcbiAgICAgICAgXy5rZXlzKG5vbkRlZmF1bHRBcmdzKS5sZW5ndGguc2hvdWxkLmVxdWFsKDApO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIGNhdGNoIGEgbm9uLWRlZmF1bHQgYXJndW1lbnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGFyZ3MuaXNvbGF0ZVNpbURldmljZSA9IHRydWU7XG4gICAgICAgIGxldCBub25EZWZhdWx0QXJncyA9IGdldE5vbkRlZmF1bHRBcmdzKHBhcnNlciwgYXJncyk7XG4gICAgICAgIF8ua2V5cyhub25EZWZhdWx0QXJncykubGVuZ3RoLnNob3VsZC5lcXVhbCgxKTtcbiAgICAgICAgc2hvdWxkLmV4aXN0KG5vbkRlZmF1bHRBcmdzLmlzb2xhdGVTaW1EZXZpY2UpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0RGVwcmVjYXRlZEFyZ3MnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpdCgnc2hvdWxkIHNob3cgbm9uZSBpZiB3ZSBoYXZlIG5vIGRlcHJlY2F0ZWQgYXJndW1lbnRzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgZGVwcmVjYXRlZEFyZ3MgPSBnZXREZXByZWNhdGVkQXJncyhwYXJzZXIsIGFyZ3MpO1xuICAgICAgICBfLmtleXMoZGVwcmVjYXRlZEFyZ3MpLmxlbmd0aC5zaG91bGQuZXF1YWwoMCk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgY2F0Y2ggYSBkZXByZWNhdGVkIGFyZ3VtZW50JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBhcmdzLnNob3dJT1NMb2cgPSB0cnVlO1xuICAgICAgICBsZXQgZGVwcmVjYXRlZEFyZ3MgPSBnZXREZXByZWNhdGVkQXJncyhwYXJzZXIsIGFyZ3MpO1xuICAgICAgICBfLmtleXMoZGVwcmVjYXRlZEFyZ3MpLmxlbmd0aC5zaG91bGQuZXF1YWwoMSk7XG4gICAgICAgIHNob3VsZC5leGlzdChkZXByZWNhdGVkQXJnc1snLS1zaG93LWlvcy1sb2cnXSk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgY2F0Y2ggYSBub24tYm9vbGVhbiBkZXByZWNhdGVkIGFyZ3VtZW50JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBhcmdzLmNhbGVuZGFyRm9ybWF0ID0gJ29yd2VsbGlhbic7XG4gICAgICAgIGxldCBkZXByZWNhdGVkQXJncyA9IGdldERlcHJlY2F0ZWRBcmdzKHBhcnNlciwgYXJncyk7XG4gICAgICAgIF8ua2V5cyhkZXByZWNhdGVkQXJncykubGVuZ3RoLnNob3VsZC5lcXVhbCgxKTtcbiAgICAgICAgc2hvdWxkLmV4aXN0KGRlcHJlY2F0ZWRBcmdzWyctLWNhbGVuZGFyLWZvcm1hdCddKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnY2hlY2tWYWxpZFBvcnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ3Nob3VsZCBiZSBmYWxzZSBmb3IgcG9ydCB0b28gaGlnaCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNoZWNrVmFsaWRQb3J0KDY1NTM2KS5zaG91bGQuYmUuZmFsc2U7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBiZSBmYWxzZSBmb3IgcG9ydCB0b28gbG93JywgZnVuY3Rpb24gKCkge1xuICAgICAgY2hlY2tWYWxpZFBvcnQoMCkuc2hvdWxkLmJlLmZhbHNlO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgYmUgdHJ1ZSBmb3IgcG9ydCAxJywgZnVuY3Rpb24gKCkge1xuICAgICAgY2hlY2tWYWxpZFBvcnQoMSkuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBiZSB0cnVlIGZvciBwb3J0IDY1NTM1JywgZnVuY3Rpb24gKCkge1xuICAgICAgY2hlY2tWYWxpZFBvcnQoNjU1MzUpLnNob3VsZC5iZS50cnVlO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgndmFsaWRhdGVUbXBEaXInLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ3Nob3VsZCBmYWlsIHRvIHVzZSBhIHRtcCBkaXIgd2l0aCBpbmNvcnJlY3QgcGVybWlzc2lvbnMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICB2YWxpZGF0ZVRtcERpcignL3ByaXZhdGUvaWZfeW91X3J1bl93aXRoX3N1ZG9fdGhpc193b250X2ZhaWwnKS5zaG91bGQuYmUucmVqZWN0ZWRXaXRoKC9jb3VsZCBub3QgZW5zdXJlLyk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBmYWlsIHRvIHVzZSBhbiB1bmRlZmluZWQgdG1wIGRpcicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhbGlkYXRlVG1wRGlyKCkuc2hvdWxkLmJlLnJlamVjdGVkV2l0aCgvY291bGQgbm90IGVuc3VyZS8pO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byB1c2UgYSB0bXAgZGlyIHdpdGggY29ycmVjdCBwZXJtaXNzaW9ucycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhbGlkYXRlVG1wRGlyKCcvdG1wL3Rlc3RfdG1wX2Rpci93aXRoL2FueS9udW1iZXIvb2YvbGV2ZWxzJykuc2hvdWxkLm5vdC5iZS5yZWplY3RlZDtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3BhcnNpbmcgYXJncyB3aXRoIGVtcHR5IGFyZ3ZbMV0nLCBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFyZ3YxO1xuXG4gICAgYmVmb3JlKGZ1bmN0aW9uICgpIHtcbiAgICAgIGFyZ3YxID0gcHJvY2Vzcy5hcmd2WzFdO1xuICAgIH0pO1xuXG4gICAgYWZ0ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgcHJvY2Vzcy5hcmd2WzFdID0gYXJndjE7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIG5vdCBmYWlsIGlmIHByb2Nlc3MuYXJndlsxXSBpcyB1bmRlZmluZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBwcm9jZXNzLmFyZ3ZbMV0gPSB1bmRlZmluZWQ7XG4gICAgICBsZXQgYXJncyA9IGdldFBhcnNlcigpO1xuICAgICAgYXJncy5wcm9nLnNob3VsZC5iZS5lcXVhbCgnQXBwaXVtJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHNldCBcInByb2dcIiB0byBwcm9jZXNzLmFyZ3ZbMV0nLCBmdW5jdGlvbiAoKSB7XG4gICAgICBwcm9jZXNzLmFyZ3ZbMV0gPSAnSGVsbG8gV29ybGQnO1xuICAgICAgbGV0IGFyZ3MgPSBnZXRQYXJzZXIoKTtcbiAgICAgIGFyZ3MucHJvZy5zaG91bGQuYmUuZXF1YWwoJ0hlbGxvIFdvcmxkJyk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCd2YWxpZGF0ZVNlcnZlckFyZ3MnLCBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHBhcnNlciA9IGdldFBhcnNlcigpO1xuICAgIHBhcnNlci5kZWJ1ZyA9IHRydWU7IC8vIHRocm93IGluc3RlYWQgb2YgZXhpdCBvbiBlcnJvcjsgcGFzcyBhcyBvcHRpb24gaW5zdGVhZD9cbiAgICBjb25zdCBkZWZhdWx0QXJncyA9IHt9O1xuICAgIC8vIGdpdmUgYWxsIHRoZSBkZWZhdWx0c1xuICAgIGZvciAobGV0IHJhd0FyZyBvZiBwYXJzZXIucmF3QXJncykge1xuICAgICAgZGVmYXVsdEFyZ3NbcmF3QXJnWzFdLmRlc3RdID0gcmF3QXJnWzFdLmRlZmF1bHRWYWx1ZTtcbiAgICB9XG4gICAgbGV0IGFyZ3MgPSB7fTtcbiAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGFyZ3MgPSBfLmNsb25lKGRlZmF1bHRBcmdzKTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnbXV0dWFsbHkgZXhjbHVzaXZlIHNlcnZlciBhcmd1bWVudHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBkZXNjcmliZSgnbm9SZXNldCBhbmQgZnVsbFJlc2V0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpdCgnc2hvdWxkIG5vdCBhbGxvdyBib3RoJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgICBhcmdzLm5vUmVzZXQgPSBhcmdzLmZ1bGxSZXNldCA9IHRydWU7XG4gICAgICAgICAgICB2YWxpZGF0ZVNlcnZlckFyZ3MocGFyc2VyLCBhcmdzKTtcbiAgICAgICAgICB9KS5zaG91bGQudGhyb3coKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgYWxsb3cgbm9SZXNldCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgICAgYXJncy5ub1Jlc2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhbGlkYXRlU2VydmVyQXJncyhwYXJzZXIsIGFyZ3MpO1xuICAgICAgICAgIH0pLnNob3VsZC5ub3QudGhyb3coKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgYWxsb3cgZnVsbFJlc2V0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgICBhcmdzLmZ1bGxSZXNldCA9IHRydWU7XG4gICAgICAgICAgICB2YWxpZGF0ZVNlcnZlckFyZ3MocGFyc2VyLCBhcmdzKTtcbiAgICAgICAgICB9KS5zaG91bGQubm90LnRocm93KCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBkZXNjcmliZSgnaXBhIGFuZCBzYWZhcmknLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGl0KCdzaG91bGQgbm90IGFsbG93IGJvdGgnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICAgIGFyZ3MuaXBhID0gYXJncy5zYWZhcmkgPSB0cnVlO1xuICAgICAgICAgICAgdmFsaWRhdGVTZXJ2ZXJBcmdzKHBhcnNlciwgYXJncyk7XG4gICAgICAgICAgfSkuc2hvdWxkLnRocm93KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGFsbG93IGlwYScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgICAgYXJncy5pcGEgPSB0cnVlO1xuICAgICAgICAgICAgdmFsaWRhdGVTZXJ2ZXJBcmdzKHBhcnNlciwgYXJncyk7XG4gICAgICAgICAgfSkuc2hvdWxkLm5vdC50aHJvdygpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBhbGxvdyBzYWZhcmknLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICAgIGFyZ3Muc2FmYXJpID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhbGlkYXRlU2VydmVyQXJncyhwYXJzZXIsIGFyZ3MpO1xuICAgICAgICAgIH0pLnNob3VsZC5ub3QudGhyb3coKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGRlc2NyaWJlKCdhcHAgYW5kIHNhZmFyaScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgYWxsb3cgYm90aCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgICAgYXJncy5hcHAgPSBhcmdzLnNhZmFyaSA9IHRydWU7XG4gICAgICAgICAgICB2YWxpZGF0ZVNlcnZlckFyZ3MocGFyc2VyLCBhcmdzKTtcbiAgICAgICAgICB9KS5zaG91bGQudGhyb3coKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgYWxsb3cgYXBwJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgICBhcmdzLmFwcCA9IHRydWU7XG4gICAgICAgICAgICB2YWxpZGF0ZVNlcnZlckFyZ3MocGFyc2VyLCBhcmdzKTtcbiAgICAgICAgICB9KS5zaG91bGQubm90LnRocm93KCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBkZXNjcmliZSgnZm9yY2VJcGhvbmUgYW5kIGZvcmNlSXBhZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgYWxsb3cgYm90aCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgICAgYXJncy5mb3JjZUlwaG9uZSA9IGFyZ3MuZm9yY2VJcGFkID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhbGlkYXRlU2VydmVyQXJncyhwYXJzZXIsIGFyZ3MpO1xuICAgICAgICAgIH0pLnNob3VsZC50aHJvdygpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBhbGxvdyBmb3JjZUlwaG9uZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgICAgYXJncy5mb3JjZUlwaG9uZSA9IHRydWU7XG4gICAgICAgICAgICB2YWxpZGF0ZVNlcnZlckFyZ3MocGFyc2VyLCBhcmdzKTtcbiAgICAgICAgICB9KS5zaG91bGQubm90LnRocm93KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGFsbG93IGZvcmNlSXBhZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgICAgYXJncy5mb3JjZUlwYWQgPSB0cnVlO1xuICAgICAgICAgICAgdmFsaWRhdGVTZXJ2ZXJBcmdzKHBhcnNlciwgYXJncyk7XG4gICAgICAgICAgfSkuc2hvdWxkLm5vdC50aHJvdygpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgZGVzY3JpYmUoJ2RldmljZU5hbWUgYW5kIGRlZmF1bHREZXZpY2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGl0KCdzaG91bGQgbm90IGFsbG93IGJvdGgnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICAgIGFyZ3MuZGV2aWNlTmFtZSA9IGFyZ3MuZGVmYXVsdERldmljZSA9IHRydWU7XG4gICAgICAgICAgICB2YWxpZGF0ZVNlcnZlckFyZ3MocGFyc2VyLCBhcmdzKTtcbiAgICAgICAgICB9KS5zaG91bGQudGhyb3coKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgYWxsb3cgZGV2aWNlTmFtZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgICAgYXJncy5kZXZpY2VOYW1lID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhbGlkYXRlU2VydmVyQXJncyhwYXJzZXIsIGFyZ3MpO1xuICAgICAgICAgIH0pLnNob3VsZC5ub3QudGhyb3coKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgYWxsb3cgZGVmYXVsdERldmljZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgICAgYXJncy5kZWZhdWx0RGV2aWNlID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhbGlkYXRlU2VydmVyQXJncyhwYXJzZXIsIGFyZ3MpO1xuICAgICAgICAgIH0pLnNob3VsZC5ub3QudGhyb3coKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgndmFsaWRhdGVkIGFyZ3VtZW50cycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIGNoZWNraW5nIHBvcnRzIGlzIGFscmVhZHkgZG9uZS5cbiAgICAgIC8vIHRoZSBvbmx5IGFyZ3VtZW50IGxlZnQgaXMgYGJhY2tlbmRSZXRyaWVzYFxuICAgICAgZGVzY3JpYmUoJ2JhY2tlbmRSZXRyaWVzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgd2l0aCB2YWx1ZSBsZXNzIHRoYW4gMCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBhcmdzLmJhY2tlbmRSZXRyaWVzID0gLTE7XG4gICAgICAgICAgKCgpID0+IHt2YWxpZGF0ZVNlcnZlckFyZ3MocGFyc2VyLCBhcmdzKTt9KS5zaG91bGQudGhyb3coKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgc3VjY2VlZCB3aXRoIHZhbHVlIG9mIDAnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgYXJncy5iYWNrZW5kUmV0cmllcyA9IDA7XG4gICAgICAgICAgKCgpID0+IHt2YWxpZGF0ZVNlcnZlckFyZ3MocGFyc2VyLCBhcmdzKTt9KS5zaG91bGQubm90LnRocm93KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHN1Y2NlZWQgd2l0aCB2YWx1ZSBhYm92ZSAwJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGFyZ3MuYmFja2VuZFJldHJpZXMgPSAxMDA7XG4gICAgICAgICAgKCgpID0+IHt2YWxpZGF0ZVNlcnZlckFyZ3MocGFyc2VyLCBhcmdzKTt9KS5zaG91bGQubm90LnRocm93KCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uIn0=
