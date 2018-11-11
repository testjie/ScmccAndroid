'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _appiumSupport = require('appium-support');

var extensions = {},
    commands = {};

commands.getStatusBarHeight = function callee$0$0() {
  var _ref, statusBar;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/appium/device/system_bars', 'GET', {}));

      case 2:
        _ref = context$1$0.sent;
        statusBar = _ref.statusBar;
        return context$1$0.abrupt('return', statusBar);

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// this function is memoized in the constructor
commands.getDevicePixelRatio = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.uiautomator2.jwproxy.command('/appium/device/pixel_ratio', 'GET', {}));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getViewportScreenshot = function callee$0$0() {
  var screenshot, rect;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getScreenshot());

      case 2:
        screenshot = context$1$0.sent;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.getViewPortRect());

      case 5:
        rect = context$1$0.sent;
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(_appiumSupport.imageUtil.cropBase64Image(screenshot, rect));

      case 8:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getViewPortRect = function callee$0$0() {
  var windowSize, statusBarHeight;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getWindowSize());

      case 2:
        windowSize = context$1$0.sent;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.getStatusBarHeight());

      case 5:
        statusBarHeight = context$1$0.sent;
        return context$1$0.abrupt('return', {
          left: 0,
          top: statusBarHeight,
          width: windowSize.width,
          height: windowSize.height - statusBarHeight
        });

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

_Object$assign(extensions, commands);
exports.commands = commands;
exports['default'] = extensions;

// android returns the upscaled window size, so to get the true size of the
// rect we have to downscale
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy92aWV3cG9ydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OzZCQUEwQixnQkFBZ0I7O0FBRTFDLElBQUksVUFBVSxHQUFHLEVBQUU7SUFBRSxRQUFRLEdBQUcsRUFBRSxDQUFDOztBQUVuQyxRQUFRLENBQUMsa0JBQWtCLEdBQUc7WUFDckIsU0FBUzs7Ozs7O3lDQUFVLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sK0JBQStCLEtBQUssRUFBRSxFQUFFLENBQUM7Ozs7QUFBN0YsaUJBQVMsUUFBVCxTQUFTOzRDQUNULFNBQVM7Ozs7Ozs7Q0FDakIsQ0FBQzs7O0FBR0YsUUFBUSxDQUFDLG1CQUFtQixHQUFHOzs7Ozt5Q0FDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLDRCQUE0QixFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7Ozs7Ozs7Ozs7Q0FDeEYsQ0FBQzs7QUFFRixRQUFRLENBQUMscUJBQXFCLEdBQUc7TUFDekIsVUFBVSxFQUNWLElBQUk7Ozs7O3lDQURlLElBQUksQ0FBQyxhQUFhLEVBQUU7OztBQUF2QyxrQkFBVTs7eUNBQ0csSUFBSSxDQUFDLGVBQWUsRUFBRTs7O0FBQW5DLFlBQUk7O3lDQUNHLHlCQUFVLGVBQWUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDOzs7Ozs7Ozs7O0NBQ3pELENBQUM7O0FBRUYsUUFBUSxDQUFDLGVBQWUsR0FBRztNQUNuQixVQUFVLEVBQ1YsZUFBZTs7Ozs7eUNBREksSUFBSSxDQUFDLGFBQWEsRUFBRTs7O0FBQXZDLGtCQUFVOzt5Q0FDYyxJQUFJLENBQUMsa0JBQWtCLEVBQUU7OztBQUFqRCx1QkFBZTs0Q0FHZDtBQUNMLGNBQUksRUFBRSxDQUFDO0FBQ1AsYUFBRyxFQUFFLGVBQWU7QUFDcEIsZUFBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLO0FBQ3ZCLGdCQUFNLEVBQUUsVUFBVSxDQUFDLE1BQU0sR0FBRyxlQUFlO1NBQzVDOzs7Ozs7O0NBQ0YsQ0FBQzs7QUFFRixlQUFjLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMzQixRQUFRLEdBQVIsUUFBUTtxQkFDRixVQUFVIiwiZmlsZSI6ImxpYi9jb21tYW5kcy92aWV3cG9ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGltYWdlVXRpbCB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcblxubGV0IGV4dGVuc2lvbnMgPSB7fSwgY29tbWFuZHMgPSB7fTtcblxuY29tbWFuZHMuZ2V0U3RhdHVzQmFySGVpZ2h0ID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBjb25zdCB7c3RhdHVzQmFyfSA9IGF3YWl0IHRoaXMudWlhdXRvbWF0b3IyLmp3cHJveHkuY29tbWFuZChgL2FwcGl1bS9kZXZpY2Uvc3lzdGVtX2JhcnNgLCAnR0VUJywge30pO1xuICByZXR1cm4gc3RhdHVzQmFyO1xufTtcblxuLy8gdGhpcyBmdW5jdGlvbiBpcyBtZW1vaXplZCBpbiB0aGUgY29uc3RydWN0b3JcbmNvbW1hbmRzLmdldERldmljZVBpeGVsUmF0aW8gPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLnVpYXV0b21hdG9yMi5qd3Byb3h5LmNvbW1hbmQoJy9hcHBpdW0vZGV2aWNlL3BpeGVsX3JhdGlvJywgJ0dFVCcsIHt9KTtcbn07XG5cbmNvbW1hbmRzLmdldFZpZXdwb3J0U2NyZWVuc2hvdCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgY29uc3Qgc2NyZWVuc2hvdCA9IGF3YWl0IHRoaXMuZ2V0U2NyZWVuc2hvdCgpO1xuICBjb25zdCByZWN0ID0gYXdhaXQgdGhpcy5nZXRWaWV3UG9ydFJlY3QoKTtcbiAgcmV0dXJuIGF3YWl0IGltYWdlVXRpbC5jcm9wQmFzZTY0SW1hZ2Uoc2NyZWVuc2hvdCwgcmVjdCk7XG59O1xuXG5jb21tYW5kcy5nZXRWaWV3UG9ydFJlY3QgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHdpbmRvd1NpemUgPSBhd2FpdCB0aGlzLmdldFdpbmRvd1NpemUoKTtcbiAgY29uc3Qgc3RhdHVzQmFySGVpZ2h0ID0gYXdhaXQgdGhpcy5nZXRTdGF0dXNCYXJIZWlnaHQoKTtcbiAgLy8gYW5kcm9pZCByZXR1cm5zIHRoZSB1cHNjYWxlZCB3aW5kb3cgc2l6ZSwgc28gdG8gZ2V0IHRoZSB0cnVlIHNpemUgb2YgdGhlXG4gIC8vIHJlY3Qgd2UgaGF2ZSB0byBkb3duc2NhbGVcbiAgcmV0dXJuIHtcbiAgICBsZWZ0OiAwLFxuICAgIHRvcDogc3RhdHVzQmFySGVpZ2h0LFxuICAgIHdpZHRoOiB3aW5kb3dTaXplLndpZHRoLFxuICAgIGhlaWdodDogd2luZG93U2l6ZS5oZWlnaHQgLSBzdGF0dXNCYXJIZWlnaHRcbiAgfTtcbn07XG5cbk9iamVjdC5hc3NpZ24oZXh0ZW5zaW9ucywgY29tbWFuZHMpO1xuZXhwb3J0IHsgY29tbWFuZHMgfTtcbmV4cG9ydCBkZWZhdWx0IGV4dGVuc2lvbnM7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uIn0=
