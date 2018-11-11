require('source-map-support').install();

'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _es6Mapify = require('es6-mapify');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function sleep(ms) {
  return _regeneratorRuntime.async(function sleep$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(_bluebird2['default'].delay(ms));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function retry(times, fn) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var tries, done, res;
  return _regeneratorRuntime.async(function retry$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        tries = 0;
        done = false;
        res = null;

      case 3:
        if (!(!done && tries < times)) {
          context$1$0.next = 18;
          break;
        }

        tries++;
        context$1$0.prev = 5;
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(fn.apply(undefined, args));

      case 8:
        res = context$1$0.sent;

        done = true;
        context$1$0.next = 16;
        break;

      case 12:
        context$1$0.prev = 12;
        context$1$0.t0 = context$1$0['catch'](5);

        if (!(tries >= times)) {
          context$1$0.next = 16;
          break;
        }

        throw context$1$0.t0;

      case 16:
        context$1$0.next = 3;
        break;

      case 18:
        return context$1$0.abrupt('return', res);

      case 19:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[5, 12]]);
}

function retryInterval(times, sleepMs, fn) {
  for (var _len2 = arguments.length, args = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
    args[_key2 - 3] = arguments[_key2];
  }

  var count, wrapped;
  return _regeneratorRuntime.async(function retryInterval$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        count = 0;

        wrapped = function wrapped() {
          var res;
          return _regeneratorRuntime.async(function wrapped$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                count++;
                res = undefined;
                context$2$0.prev = 2;
                context$2$0.next = 5;
                return _regeneratorRuntime.awrap(fn.apply(undefined, args));

              case 5:
                res = context$2$0.sent;
                context$2$0.next = 14;
                break;

              case 8:
                context$2$0.prev = 8;
                context$2$0.t0 = context$2$0['catch'](2);

                if (!(count !== times)) {
                  context$2$0.next = 13;
                  break;
                }

                context$2$0.next = 13;
                return _regeneratorRuntime.awrap(sleep(sleepMs));

              case 13:
                throw context$2$0.t0;

              case 14:
                return context$2$0.abrupt('return', res);

              case 15:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this, [[2, 8]]);
        };

        return context$1$0.abrupt('return', retry(times, wrapped));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function parallel(promises) {
  return _regeneratorRuntime.async(function parallel$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(_bluebird2['default'].all(promises));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function nodeify(promisey, cb) {
  // eslint-disable-line promise/prefer-await-to-callbacks
  return _bluebird2['default'].resolve(promisey).nodeify(cb);
}

function nodeifyAll(promiseyMap) {
  var cbMap = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function () {
      var _step$value = _slicedToArray(_step.value, 2);

      var name = _step$value[0];
      var fn = _step$value[1];

      /*jshint -W083 */
      cbMap[name] = function () {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        var _cb = args.slice(-1)[0];
        args = args.slice(0, -1);
        nodeify(fn.apply(undefined, _toConsumableArray(args)), _cb);
      };
    };

    for (var _iterator = _getIterator((0, _es6Mapify.mapify)(promiseyMap)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
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

  return cbMap;
}

function asyncify(fn) {
  for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  _bluebird2['default'].resolve(fn.apply(undefined, args)).done();
}

function asyncmap(coll, mapper) {
  var runInParallel = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

  var newColl, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, item;

  return _regeneratorRuntime.async(function asyncmap$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!runInParallel) {
          context$1$0.next = 2;
          break;
        }

        return context$1$0.abrupt('return', parallel(coll.map(mapper)));

      case 2:
        newColl = [];
        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = undefined;
        context$1$0.prev = 6;
        _iterator2 = _getIterator(coll);

      case 8:
        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
          context$1$0.next = 18;
          break;
        }

        item = _step2.value;
        context$1$0.t0 = newColl;
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(mapper(item));

      case 13:
        context$1$0.t1 = context$1$0.sent;
        context$1$0.t0.push.call(context$1$0.t0, context$1$0.t1);

      case 15:
        _iteratorNormalCompletion2 = true;
        context$1$0.next = 8;
        break;

      case 18:
        context$1$0.next = 24;
        break;

      case 20:
        context$1$0.prev = 20;
        context$1$0.t2 = context$1$0['catch'](6);
        _didIteratorError2 = true;
        _iteratorError2 = context$1$0.t2;

      case 24:
        context$1$0.prev = 24;
        context$1$0.prev = 25;

        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }

      case 27:
        context$1$0.prev = 27;

        if (!_didIteratorError2) {
          context$1$0.next = 30;
          break;
        }

        throw _iteratorError2;

      case 30:
        return context$1$0.finish(27);

      case 31:
        return context$1$0.finish(24);

      case 32:
        return context$1$0.abrupt('return', newColl);

      case 33:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[6, 20, 24, 32], [25,, 27, 31]]);
}

function asyncfilter(coll, filter) {
  var runInParallel = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

  var newColl, bools, i, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, item;

  return _regeneratorRuntime.async(function asyncfilter$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        newColl = [];

        if (!runInParallel) {
          context$1$0.next = 8;
          break;
        }

        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(parallel(coll.map(filter)));

      case 4:
        bools = context$1$0.sent;

        for (i = 0; i < coll.length; i++) {
          if (bools[i]) {
            newColl.push(coll[i]);
          }
        }
        context$1$0.next = 36;
        break;

      case 8:
        _iteratorNormalCompletion3 = true;
        _didIteratorError3 = false;
        _iteratorError3 = undefined;
        context$1$0.prev = 11;
        _iterator3 = _getIterator(coll);

      case 13:
        if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
          context$1$0.next = 22;
          break;
        }

        item = _step3.value;
        context$1$0.next = 17;
        return _regeneratorRuntime.awrap(filter(item));

      case 17:
        if (!context$1$0.sent) {
          context$1$0.next = 19;
          break;
        }

        newColl.push(item);

      case 19:
        _iteratorNormalCompletion3 = true;
        context$1$0.next = 13;
        break;

      case 22:
        context$1$0.next = 28;
        break;

      case 24:
        context$1$0.prev = 24;
        context$1$0.t0 = context$1$0['catch'](11);
        _didIteratorError3 = true;
        _iteratorError3 = context$1$0.t0;

      case 28:
        context$1$0.prev = 28;
        context$1$0.prev = 29;

        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
          _iterator3['return']();
        }

      case 31:
        context$1$0.prev = 31;

        if (!_didIteratorError3) {
          context$1$0.next = 34;
          break;
        }

        throw _iteratorError3;

      case 34:
        return context$1$0.finish(31);

      case 35:
        return context$1$0.finish(28);

      case 36:
        return context$1$0.abrupt('return', newColl);

      case 37:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[11, 24, 28, 36], [29,, 31, 35]]);
}

function waitForCondition(condFn) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var debug, begunAt, endAt, spin;
  return _regeneratorRuntime.async(function waitForCondition$(context$1$0) {
    var _this2 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _lodash2['default'].defaults(opts, {
          waitMs: 5000,
          intervalMs: 500
        });
        debug = opts.logger ? opts.logger.debug.bind(opts.logger) : _lodash2['default'].noop;
        begunAt = Date.now();
        endAt = begunAt + opts.waitMs;

        spin = function spin() {
          var now, waited;
          return _regeneratorRuntime.async(function spin$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(condFn());

              case 2:
                if (!context$2$0.sent) {
                  context$2$0.next = 4;
                  break;
                }

                return context$2$0.abrupt('return');

              case 4:
                now = Date.now();
                waited = now - begunAt;

                if (!(now < endAt)) {
                  context$2$0.next = 14;
                  break;
                }

                debug('Waited for ' + waited + ' ms so far');
                context$2$0.next = 10;
                return _regeneratorRuntime.awrap(_bluebird2['default'].delay(opts.intervalMs));

              case 10:
                context$2$0.next = 12;
                return _regeneratorRuntime.awrap(spin());

              case 12:
                context$2$0.next = 15;
                break;

              case 14:
                throw new Error('Condition unmet after ' + waited + ' ms. Timing out.');

              case 15:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this2);
        };

        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(spin());

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

exports.sleep = sleep;
exports.retry = retry;
exports.nodeify = nodeify;
exports.nodeifyAll = nodeifyAll;
exports.retryInterval = retryInterval;
exports.asyncify = asyncify;
exports.parallel = parallel;
exports.asyncmap = asyncmap;
exports.asyncfilter = asyncfilter;
exports.waitForCondition = waitForCondition;

// do not pause when finished the last retry
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9hc3luY2JveC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7d0JBRWMsVUFBVTs7Ozt5QkFDRCxZQUFZOztzQkFDckIsUUFBUTs7OztBQUV0QixTQUFlLEtBQUssQ0FBRSxFQUFFOzs7Ozt5Q0FDVCxzQkFBRSxLQUFLLENBQUMsRUFBRSxDQUFDOzs7Ozs7Ozs7O0NBQ3pCOztBQUVELFNBQWUsS0FBSyxDQUFFLEtBQUssRUFBRSxFQUFFO29DQUFLLElBQUk7QUFBSixRQUFJOzs7TUFDbEMsS0FBSyxFQUNMLElBQUksRUFDSixHQUFHOzs7O0FBRkgsYUFBSyxHQUFHLENBQUM7QUFDVCxZQUFJLEdBQUcsS0FBSztBQUNaLFdBQUcsR0FBRyxJQUFJOzs7Y0FDUCxDQUFDLElBQUksSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFBOzs7OztBQUMzQixhQUFLLEVBQUUsQ0FBQzs7O3lDQUVNLEVBQUUsa0JBQUksSUFBSSxDQUFDOzs7QUFBdkIsV0FBRzs7QUFDSCxZQUFJLEdBQUcsSUFBSSxDQUFDOzs7Ozs7OztjQUVSLEtBQUssSUFBSSxLQUFLLENBQUE7Ozs7Ozs7Ozs7Ozs0Q0FLZixHQUFHOzs7Ozs7O0NBQ1g7O0FBRUQsU0FBZSxhQUFhLENBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFO3FDQUFLLElBQUk7QUFBSixRQUFJOzs7TUFDbkQsS0FBSyxFQUNMLE9BQU87Ozs7OztBQURQLGFBQUssR0FBRyxDQUFDOztBQUNULGVBQU8sR0FBRyxTQUFWLE9BQU87Y0FFTCxHQUFHOzs7O0FBRFAscUJBQUssRUFBRSxDQUFDO0FBQ0osbUJBQUc7OztpREFFTyxFQUFFLGtCQUFJLElBQUksQ0FBQzs7O0FBQXZCLG1CQUFHOzs7Ozs7OztzQkFHQyxLQUFLLEtBQUssS0FBSyxDQUFBOzs7Ozs7aURBQ1gsS0FBSyxDQUFDLE9BQU8sQ0FBQzs7Ozs7O29EQUlqQixHQUFHOzs7Ozs7O1NBQ1g7OzRDQUNNLEtBQUssQ0FBQyxLQUFLLEVB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LGdCQUFNLEVBQUUsSUFBSTtBQUNaLG9CQUFVLEVBQUcsR0FBRztTQUNqQixDQUFDLENBQUM7QUFDQyxhQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLG9CQUFFLElBQUk7QUFDbEUsZUFBTyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUU7QUFDcEIsYUFBSyxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTTs7QUFDN0IsWUFBSSxHQUFHLFNBQVAsSUFBSTtjQUlGLEdBQUcsRUFDSCxNQUFNOzs7OztpREFKQSxNQUFNLEVBQUU7Ozs7Ozs7Ozs7O0FBR2QsbUJBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFO0FBQ2hCLHNCQUFNLEdBQUcsR0FBRyxHQUFHLE9BQU87O3NCQUN0QixHQUFHLEdBQUcsS0FBSyxDQUFBOzs7OztBQUNiLHFCQUFLLGlCQUFlLE1BQU0sZ0JBQWEsQ0FBQzs7aURBQ2xDLHNCQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDOzs7O2lEQUN4QixJQUFJLEVBQUU7Ozs7Ozs7c0JBRU4sSUFBSSxLQUFLLDRCQUEwQixNQUFNLHNCQUFtQjs7Ozs7OztTQUVyRTs7O3lDQUNLLElBQUksRUFBRTs7Ozs7OztDQUNiOztRQUVRLEtBQUssR0FBTCxLQUFLO1FBQUUsS0FBSyxHQUFMLEtBQUs7UUFBRSxPQUFPLEdBQVAsT0FBTztRQUFFLFVBQVUsR0FBVixVQUFVO1FBQUUsYUFBYSxHQUFiLGFBQWE7UUFBRSxRQUFRLEdBQVIsUUFBUTtRQUFFLFFBQVEsR0FBUixRQUFRO1FBQ3BFLFFBQVEsR0FBUixRQUFRO1FBQUUsV0FBVyxHQUFYLFdBQVc7UUFBRSxnQkFBZ0IsR0FBaEIsZ0JBQWdCIiwiZmlsZSI6ImxpYi9hc3luY2JveC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRyYW5zcGlsZTptYWluXG5cbmltcG9ydCBCIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7IG1hcGlmeSB9IGZyb20gJ2VzNi1tYXBpZnknO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuYXN5bmMgZnVuY3Rpb24gc2xlZXAgKG1zKSB7XG4gIHJldHVybiBhd2FpdCBCLmRlbGF5KG1zKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmV0cnkgKHRpbWVzLCBmbiwgLi4uYXJncykge1xuICBsZXQgdHJpZXMgPSAwO1xuICBsZXQgZG9uZSA9IGZhbHNlO1xuICBsZXQgcmVzID0gbnVsbDtcbiAgd2hpbGUgKCFkb25lICYmIHRyaWVzIDwgdGltZXMpIHtcbiAgICB0cmllcysrO1xuICAgIHRyeSB7XG4gICAgICByZXMgPSBhd2FpdCBmbiguLi5hcmdzKTtcbiAgICAgIGRvbmUgPSB0cnVlO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKHRyaWVzID49IHRpbWVzKSB7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmV0cnlJbnRlcnZhbCAodGltZXMsIHNsZWVwTXMsIGZuLCAuLi5hcmdzKSB7XG4gIGxldCBjb3VudCA9IDA7XG4gIGxldCB3cmFwcGVkID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvdW50Kys7XG4gICAgbGV0IHJlcztcbiAgICB0cnkge1xuICAgICAgcmVzID0gYXdhaXQgZm4oLi4uYXJncyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gZG8gbm90IHBhdXNlIHdoZW4gZmluaXNoZWQgdGhlIGxhc3QgcmV0cnlcbiAgICAgIGlmIChjb3VudCAhPT0gdGltZXMpIHtcbiAgICAgICAgYXdhaXQgc2xlZXAoc2xlZXBNcyk7XG4gICAgICB9XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9O1xuICByZXR1cm4gcmV0cnkodGltZXMsIHdyYXBwZWQpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBwYXJhbGxlbCAocHJvbWlzZXMpIHtcbiAgcmV0dXJuIGF3YWl0IEIuYWxsKHByb21pc2VzKTtcbn1cblxuZnVuY3Rpb24gbm9kZWlmeSAocHJvbWlzZXksIGNiKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcHJvbWlzZS9wcmVmZXItYXdhaXQtdG8tY2FsbGJhY2tzXG4gIHJldHVybiBCLnJlc29sdmUocHJvbWlzZXkpLm5vZGVpZnkoY2IpO1xufVxuXG5mdW5jdGlvbiBub2RlaWZ5QWxsIChwcm9taXNleU1hcCkge1xuICBsZXQgY2JNYXAgPSB7fTtcbiAgZm9yIChsZXQgW25hbWUsIGZuXSBvZiBtYXBpZnkocHJvbWlzZXlNYXApKSB7XG4gICAgLypqc2hpbnQgLVcwODMgKi9cbiAgICBjYk1hcFtuYW1lXSA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgICBsZXQgX2NiID0gYXJncy5zbGljZSgtMSlbMF07XG4gICAgICBhcmdzID0gYXJncy5zbGljZSgwLCAtMSk7XG4gICAgICBub2RlaWZ5KGZuKC4uLmFyZ3MpLCBfY2IpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGNiTWFwO1xufVxuXG5mdW5jdGlvbiBhc3luY2lmeSAoZm4sIC4uLmFyZ3MpIHtcbiAgQi5yZXNvbHZlKGZuKC4uLmFyZ3MpKS5kb25lKCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGFzeW5jbWFwIChjb2xsLCBtYXBwZXIsIHJ1bkluUGFyYWxsZWwgPSB0cnVlKSB7XG4gIGlmIChydW5JblBhcmFsbGVsKSB7XG4gICAgcmV0dXJuIHBhcmFsbGVsKGNvbGwubWFwKG1hcHBlcikpO1xuICB9XG5cbiAgbGV0IG5ld0NvbGwgPSBbXTtcbiAgZm9yIChsZXQgaXRlbSBvZiBjb2xsKSB7XG4gICAgbmV3Q29sbC5wdXNoKGF3YWl0IG1hcHBlcihpdGVtKSk7XG4gIH1cbiAgcmV0dXJuIG5ld0NvbGw7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGFzeW5jZmlsdGVyIChjb2xsLCBmaWx0ZXIsIHJ1bkluUGFyYWxsZWwgPSB0cnVlKSB7XG4gIGxldCBuZXdDb2xsID0gW107XG4gIGlmIChydW5JblBhcmFsbGVsKSB7XG4gICAgbGV0IGJvb2xzID0gYXdhaXQgcGFyYWxsZWwoY29sbC5tYXAoZmlsdGVyKSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2xsLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYm9vbHNbaV0pIHtcbiAgICAgICAgbmV3Q29sbC5wdXNoKGNvbGxbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBmb3IgKGxldCBpdGVtIG9mIGNvbGwpIHtcbiAgICAgIGlmIChhd2FpdCBmaWx0ZXIoaXRlbSkpIHtcbiAgICAgICAgbmV3Q29sbC5wdXNoKGl0ZW0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3Q29sbDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gd2FpdEZvckNvbmRpdGlvbiAoY29uZEZuLCBvcHRzID0ge30pIHtcbiAgXy5kZWZhdWx0cyhvcHRzLCB7XG4gICAgd2FpdE1zOiA1MDAwLFxuICAgIGludGVydmFsTXMgOiA1MDAsXG4gIH0pO1xuICBsZXQgZGVidWcgPSBvcHRzLmxvZ2dlciA/IG9wdHMubG9nZ2VyLmRlYnVnLmJpbmQob3B0cy5sb2dnZXIpIDogXy5ub29wO1xuICBsZXQgYmVndW5BdCA9IERhdGUubm93KCk7XG4gIGxldCBlbmRBdCA9IGJlZ3VuQXQgKyBvcHRzLndhaXRNcztcbiAgbGV0IHNwaW4gPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKGF3YWl0IGNvbmRGbigpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGxldCB3YWl0ZWQgPSBub3cgLSBiZWd1bkF0O1xuICAgIGlmIChub3cgPCBlbmRBdCkge1xuICAgICAgZGVidWcoYFdhaXRlZCBmb3IgJHt3YWl0ZWR9IG1zIHNvIGZhcmApO1xuICAgICAgYXdhaXQgQi5kZWxheShvcHRzLmludGVydmFsTXMpO1xuICAgICAgYXdhaXQgc3BpbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENvbmRpdGlvbiB1bm1ldCBhZnRlciAke3dhaXRlZH0gbXMuIFRpbWluZyBvdXQuYCk7XG4gICAgfVxuICB9O1xuICBhd2FpdCBzcGluKCk7XG59XG5cbmV4cG9ydCB7IHNsZWVwLCByZXRyeSwgbm9kZWlmeSwgbm9kZWlmeUFsbCwgcmV0cnlJbnRlcnZhbCwgYXN5bmNpZnksIHBhcmFsbGVsLFxuICAgICAgICAgYXN5bmNtYXAsIGFzeW5jZmlsdGVyLCB3YWl0Rm9yQ29uZGl0aW9ufTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
