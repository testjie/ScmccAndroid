'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
var commands = {},
    helpers = {},
    extensions = {};

commands.getAlertText = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/alert/text', 'GET', {}));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * @typedef {Object} AcceptAlertOptions
 * @property {?string} buttonLabel - The name of the button to click in order to
 *                                   accept the alert. If the name is not provided
 *                                   then the script will try to detect the button
 *                                   automatically.
 */

/**
 * @param {AcceptAlertOptions} opts
 * @throws {InvalidElementStateError} If no matching button, that can accept the alert,
 *                                    can be found
 * @throws {NoAlertOpenError} If no alert is present
 */
commands.mobileAcceptAlert = function callee$0$0() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/alert/accept', 'POST', opts));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.postAcceptAlert = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.mobileAcceptAlert());

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * @typedef {Object} DismissAlertOptions
 * @property {?string} buttonLabel - The name of the button to click in order to
 *                                   dismiss the alert. If the name is not provided
 *                                   then the script will try to detect the button
 *                                   automatically.
 */

/**
 * @param {DismissAlertOptions} opts
 * @throws {InvalidElementStateError} If no matching button, that can dismiss the alert,
 *                                    can be found
 * @throws {NoAlertOpenError} If no alert is present
 */
commands.mobileDismissAlert = function callee$0$0() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/alert/dismiss', 'POST', opts));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.postDismissAlert = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.mobileDismissAlert());

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

_Object$assign(extensions, commands, helpers);
exports.commands = commands;
exports.helpers = helpers;
exports['default'] = extensions;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9hbGVydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxFQUFFO0lBQUUsT0FBTyxHQUFHLEVBQUU7SUFBRSxVQUFVLEdBQUcsRUFBRSxDQUFDOztBQUVqRCxRQUFRLENBQUMsWUFBWSxHQUFHOzs7Ozt5Q0FDVCxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7Ozs7Ozs7Ozs7Q0FDekUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQWdCRixRQUFRLENBQUMsaUJBQWlCLEdBQUc7TUFBZ0IsSUFBSSx5REFBRyxFQUFFOzs7Ozt5Q0FDdkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDOzs7Ozs7Ozs7O0NBQzlFLENBQUM7O0FBRUYsUUFBUSxDQUFDLGVBQWUsR0FBRzs7Ozs7eUNBQ1osSUFBSSxDQUFDLGlCQUFpQixFQUFFOzs7Ozs7Ozs7O0NBQ3RDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkYsUUFBUSxDQUFDLGtCQUFrQixHQUFHO01BQWdCLElBQUkseURBQUcsRUFBRTs7Ozs7eUNBQ3hDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDOzs7Ozs7Ozs7O0NBQy9FLENBQUM7O0FBRUYsUUFBUSxDQUFDLGdCQUFnQixHQUFHOzs7Ozt5Q0FDYixJQUFJLENBQUMsa0JBQWtCLEVBQUU7Ozs7Ozs7Ozs7Q0FDdkMsQ0FBQzs7QUFFRixlQUFjLFVBQVUsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEMsUUFBUSxHQUFSLFFBQVE7UUFBRSxPQUFPLEdBQVAsT0FBTztxQkFDWCxVQUFVIiwiZmlsZSI6ImxpYi9jb21tYW5kcy9hbGVydC5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBjb21tYW5kcyA9IHt9LCBoZWxwZXJzID0ge30sIGV4dGVuc2lvbnMgPSB7fTtcblxuY29tbWFuZHMuZ2V0QWxlcnRUZXh0ID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gYXdhaXQgdGhpcy51aWF1dG9tYXRvcjIuandwcm94eS5jb21tYW5kKCcvYWxlcnQvdGV4dCcsICdHRVQnLCB7fSk7XG59O1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IEFjY2VwdEFsZXJ0T3B0aW9uc1xuICogQHByb3BlcnR5IHs/c3RyaW5nfSBidXR0b25MYWJlbCAtIFRoZSBuYW1lIG9mIHRoZSBidXR0b24gdG8gY2xpY2sgaW4gb3JkZXIgdG9cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2NlcHQgdGhlIGFsZXJ0LiBJZiB0aGUgbmFtZSBpcyBub3QgcHJvdmlkZWRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGVuIHRoZSBzY3JpcHQgd2lsbCB0cnkgdG8gZGV0ZWN0IHRoZSBidXR0b25cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvbWF0aWNhbGx5LlxuICovXG5cbiAvKipcbiAgKiBAcGFyYW0ge0FjY2VwdEFsZXJ0T3B0aW9uc30gb3B0c1xuICAqIEB0aHJvd3Mge0ludmFsaWRFbGVtZW50U3RhdGVFcnJvcn0gSWYgbm8gbWF0Y2hpbmcgYnV0dG9uLCB0aGF0IGNhbiBhY2NlcHQgdGhlIGFsZXJ0LFxuICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuIGJlIGZvdW5kXG4gICogQHRocm93cyB7Tm9BbGVydE9wZW5FcnJvcn0gSWYgbm8gYWxlcnQgaXMgcHJlc2VudFxuICAqL1xuY29tbWFuZHMubW9iaWxlQWNjZXB0QWxlcnQgPSBhc3luYyBmdW5jdGlvbiAob3B0cyA9IHt9KSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLnVpYXV0b21hdG9yMi5qd3Byb3h5LmNvbW1hbmQoJy9hbGVydC9hY2NlcHQnLCAnUE9TVCcsIG9wdHMpO1xufTtcblxuY29tbWFuZHMucG9zdEFjY2VwdEFsZXJ0ID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gYXdhaXQgdGhpcy5tb2JpbGVBY2NlcHRBbGVydCgpO1xufTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBEaXNtaXNzQWxlcnRPcHRpb25zXG4gKiBAcHJvcGVydHkgez9zdHJpbmd9IGJ1dHRvbkxhYmVsIC0gVGhlIG5hbWUgb2YgdGhlIGJ1dHRvbiB0byBjbGljayBpbiBvcmRlciB0b1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc21pc3MgdGhlIGFsZXJ0LiBJZiB0aGUgbmFtZSBpcyBub3QgcHJvdmlkZWRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGVuIHRoZSBzY3JpcHQgd2lsbCB0cnkgdG8gZGV0ZWN0IHRoZSBidXR0b25cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvbWF0aWNhbGx5LlxuICovXG5cbiAvKipcbiAgKiBAcGFyYW0ge0Rpc21pc3NBbGVydE9wdGlvbnN9IG9wdHNcbiAgKiBAdGhyb3dzIHtJbnZhbGlkRWxlbWVudFN0YXRlRXJyb3J9IElmIG5vIG1hdGNoaW5nIGJ1dHRvbiwgdGhhdCBjYW4gZGlzbWlzcyB0aGUgYWxlcnQsXG4gICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW4gYmUgZm91bmRcbiAgKiBAdGhyb3dzIHtOb0FsZXJ0T3BlbkVycm9yfSBJZiBubyBhbGVydCBpcyBwcmVzZW50XG4gICovXG5jb21tYW5kcy5tb2JpbGVEaXNtaXNzQWxlcnQgPSBhc3luYyBmdW5jdGlvbiAob3B0cyA9IHt9KSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLnVpYXV0b21hdG9yMi5qd3Byb3h5LmNvbW1hbmQoJy9hbGVydC9kaXNtaXNzJywgJ1BPU1QnLCBvcHRzKTtcbn07XG5cbmNvbW1hbmRzLnBvc3REaXNtaXNzQWxlcnQgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLm1vYmlsZURpc21pc3NBbGVydCgpO1xufTtcblxuT2JqZWN0LmFzc2lnbihleHRlbnNpb25zLCBjb21tYW5kcywgaGVscGVycyk7XG5leHBvcnQgeyBjb21tYW5kcywgaGVscGVycyB9O1xuZXhwb3J0IGRlZmF1bHQgZXh0ZW5zaW9ucztcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4ifQ==
