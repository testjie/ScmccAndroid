"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _Object$assign = require("babel-runtime/core-js/object/assign")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var helpers = {},
    extensions = {};

// we override the xpath search for this first-visible-child selector, which
// looks like /*[@firstVisible="true"]
var MAGIC_FIRST_VIS_CHILD_SEL = /\/\*\[@firstVisible ?= ?('|")true\1\]/;

var MAGIC_SCROLLABLE_SEL = /\/\/\*\[@scrollable ?= ?('|")true\1\]/;
var MAGIC_SCROLLABLE_BY = "new UiSelector().scrollable(true)";

/**
 * Overriding helpers.doFindElementOrEls functionality of appium-android-driver,
 * this.element initialized in find.js of appium-android-drive.
 */
helpers.doFindElementOrEls = function callee$0$0(params) {
  var elementId;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(params.strategy === "xpath" && MAGIC_FIRST_VIS_CHILD_SEL.test(params.selector))) {
          context$1$0.next = 5;
          break;
        }

        elementId = params.context;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command("/appium/element/" + elementId + "/first_visible", 'GET', {}));

      case 4:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 5:
        if (params.strategy === "xpath" && MAGIC_SCROLLABLE_SEL.test(params.selector)) {
          params.strategy = "-android uiautomator";
          params.selector = MAGIC_SCROLLABLE_BY;
        }

        if (!params.multiple) {
          context$1$0.next = 12;
          break;
        }

        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command("/elements", 'POST', params));

      case 9:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 12:
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command("/element", 'POST', params));

      case 14:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 15:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

_Object$assign(extensions, helpers);
exports.helpers = helpers;
exports["default"] = extensions;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9maW5kLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxJQUFJLE9BQU8sR0FBRyxFQUFFO0lBQUUsVUFBVSxHQUFHLEVBQUUsQ0FBQzs7OztBQUlsQyxJQUFNLHlCQUF5QixHQUFHLHVDQUF1QyxDQUFDOztBQUUxRSxJQUFNLG9CQUFvQixHQUFHLHVDQUF1QyxDQUFDO0FBQ3JFLElBQU0sbUJBQW1CLEdBQUcsbUNBQW1DLENBQUM7Ozs7OztBQU1oRSxPQUFPLENBQUMsa0JBQWtCLEdBQUcsb0JBQWdCLE1BQU07TUFFM0MsU0FBUzs7OztjQURYLE1BQU0sQ0FBQyxRQUFRLEtBQUssT0FBTyxJQUFJLHlCQUF5QixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7Ozs7O0FBQzVFLGlCQUFTLEdBQUcsTUFBTSxDQUFDLE9BQU87O3lDQUNqQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLHNCQUFvQixTQUFTLHFCQUFrQixLQUFLLEVBQUUsRUFBRSxDQUFDOzs7Ozs7QUFFekcsWUFBSSxNQUFNLENBQUMsUUFBUSxLQUFLLE9BQU8sSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFO0FBQzdFLGdCQUFNLENBQUMsUUFBUSxHQUFHLHNCQUFzQixDQUFDO0FBQ3pDLGdCQUFNLENBQUMsUUFBUSxHQUFHLG1CQUFtQixDQUFDO1NBQ3ZDOzthQUNHLE1BQU0sQ0FBQyxRQUFROzs7Ozs7eUNBQ0osSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxjQUFjLE1BQU0sRUFBRSxNQUFNLENBQUM7Ozs7Ozs7eUNBRTlELElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sYUFBYSxNQUFNLEVBQUUsTUFBTSxDQUFDOzs7Ozs7Ozs7O0NBRTdFLENBQUM7O0FBRUYsZUFBYyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDMUIsT0FBTyxHQUFQLE9BQU87cUJBQ0QsVUFBVSIsImZpbGUiOiJsaWIvY29tbWFuZHMvZmluZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxubGV0IGhlbHBlcnMgPSB7fSwgZXh0ZW5zaW9ucyA9IHt9O1xuXG4vLyB3ZSBvdmVycmlkZSB0aGUgeHBhdGggc2VhcmNoIGZvciB0aGlzIGZpcnN0LXZpc2libGUtY2hpbGQgc2VsZWN0b3IsIHdoaWNoXG4vLyBsb29rcyBsaWtlIC8qW0BmaXJzdFZpc2libGU9XCJ0cnVlXCJdXG5jb25zdCBNQUdJQ19GSVJTVF9WSVNfQ0hJTERfU0VMID0gL1xcL1xcKlxcW0BmaXJzdFZpc2libGUgPz0gPygnfFwiKXRydWVcXDFcXF0vO1xuXG5jb25zdCBNQUdJQ19TQ1JPTExBQkxFX1NFTCA9IC9cXC9cXC9cXCpcXFtAc2Nyb2xsYWJsZSA/PSA/KCd8XCIpdHJ1ZVxcMVxcXS87XG5jb25zdCBNQUdJQ19TQ1JPTExBQkxFX0JZID0gXCJuZXcgVWlTZWxlY3RvcigpLnNjcm9sbGFibGUodHJ1ZSlcIjtcblxuLyoqXG4gKiBPdmVycmlkaW5nIGhlbHBlcnMuZG9GaW5kRWxlbWVudE9yRWxzIGZ1bmN0aW9uYWxpdHkgb2YgYXBwaXVtLWFuZHJvaWQtZHJpdmVyLFxuICogdGhpcy5lbGVtZW50IGluaXRpYWxpemVkIGluIGZpbmQuanMgb2YgYXBwaXVtLWFuZHJvaWQtZHJpdmUuXG4gKi9cbmhlbHBlcnMuZG9GaW5kRWxlbWVudE9yRWxzID0gYXN5bmMgZnVuY3Rpb24gKHBhcmFtcykge1xuICBpZiAocGFyYW1zLnN0cmF0ZWd5ID09PSBcInhwYXRoXCIgJiYgTUFHSUNfRklSU1RfVklTX0NISUxEX1NFTC50ZXN0KHBhcmFtcy5zZWxlY3RvcikpIHtcbiAgICBsZXQgZWxlbWVudElkID0gcGFyYW1zLmNvbnRleHQ7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMudWlhdXRvbWF0b3IyLmp3cHJveHkuY29tbWFuZChgL2FwcGl1bS9lbGVtZW50LyR7ZWxlbWVudElkfS9maXJzdF92aXNpYmxlYCwgJ0dFVCcsIHt9KTtcbiAgfVxuICBpZiAocGFyYW1zLnN0cmF0ZWd5ID09PSBcInhwYXRoXCIgJiYgTUFHSUNfU0NST0xMQUJMRV9TRUwudGVzdChwYXJhbXMuc2VsZWN0b3IpKSB7XG4gICAgcGFyYW1zLnN0cmF0ZWd5ID0gXCItYW5kcm9pZCB1aWF1dG9tYXRvclwiO1xuICAgIHBhcmFtcy5zZWxlY3RvciA9IE1BR0lDX1NDUk9MTEFCTEVfQlk7XG4gIH1cbiAgaWYgKHBhcmFtcy5tdWx0aXBsZSkge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLnVpYXV0b21hdG9yMi5qd3Byb3h5LmNvbW1hbmQoYC9lbGVtZW50c2AsICdQT1NUJywgcGFyYW1zKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy51aWF1dG9tYXRvcjIuandwcm94eS5jb21tYW5kKGAvZWxlbWVudGAsICdQT1NUJywgcGFyYW1zKTtcbiAgfVxufTtcblxuT2JqZWN0LmFzc2lnbihleHRlbnNpb25zLCBoZWxwZXJzKTtcbmV4cG9ydCB7IGhlbHBlcnMgfTtcbmV4cG9ydCBkZWZhdWx0IGV4dGVuc2lvbnM7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uIn0=
