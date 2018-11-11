'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _asyncbox = require('asyncbox');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _nodeSimctl = require('node-simctl');

var _teen_process = require('teen_process');

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _appiumSupport = require('appium-support');

var commands = {};

function getScreenshotWithIdevicelib(udid, isLandscape) {
  var pathToScreenshotTiff, pathToResultPng, sipsArgs;
  return _regeneratorRuntime.async(function getScreenshotWithIdevicelib$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(_appiumSupport.tempDir.path({ prefix: 'screenshot-' + udid, suffix: '.tiff' }));

      case 2:
        pathToScreenshotTiff = context$1$0.sent;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.rimraf(pathToScreenshotTiff));

      case 5:
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(_appiumSupport.tempDir.path({ prefix: 'screenshot-' + udid, suffix: '.png' }));

      case 7:
        pathToResultPng = context$1$0.sent;
        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.rimraf(pathToResultPng));

      case 10:
        context$1$0.prev = 10;
        context$1$0.prev = 11;
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)('idevicescreenshot', ['-u', udid, pathToScreenshotTiff]));

      case 14:
        context$1$0.next = 19;
        break;

      case 16:
        context$1$0.prev = 16;
        context$1$0.t0 = context$1$0['catch'](11);
        throw new Error('Cannot take a screenshot from the device \'' + udid + '\' using ' + ('idevicescreenshot. Original error: ' + context$1$0.t0.message));

      case 19:
        sipsArgs = ['-s', 'format', 'png', pathToScreenshotTiff, '--out', pathToResultPng];

        if (isLandscape) {
          sipsArgs = ['-r', '-90'].concat(_toConsumableArray(sipsArgs));
        }
        context$1$0.prev = 21;
        context$1$0.next = 24;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)('sips', sipsArgs));

      case 24:
        context$1$0.next = 29;
        break;

      case 26:
        context$1$0.prev = 26;
        context$1$0.t1 = context$1$0['catch'](21);
        throw new Error('Cannot convert a screenshot from TIFF to PNG using sips tool. ' + ('Original error: ' + context$1$0.t1.message));

      case 29:
        context$1$0.next = 31;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(pathToResultPng));

      case 31:
        if (context$1$0.sent) {
          context$1$0.next = 33;
          break;
        }

        throw new Error('Cannot convert a screenshot from TIFF to PNG. The conversion ' + ('result does not exist at \'' + pathToResultPng + '\''));

      case 33:
        context$1$0.next = 35;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.readFile(pathToResultPng));

      case 35:
        return context$1$0.abrupt('return', context$1$0.sent.toString('base64'));

      case 36:
        context$1$0.prev = 36;
        context$1$0.next = 39;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.rimraf(pathToScreenshotTiff));

      case 39:
        context$1$0.next = 41;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.rimraf(pathToResultPng));

      case 41:
        return context$1$0.finish(36);

      case 42:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[10,, 36, 42], [11, 16], [21, 26]]);
}

function verifyIdeviceScreenshotAvailable() {
  return _regeneratorRuntime.async(function verifyIdeviceScreenshotAvailable$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.which('idevicescreenshot'));

      case 3:
        context$1$0.next = 8;
        break;

      case 5:
        context$1$0.prev = 5;
        context$1$0.t0 = context$1$0['catch'](0);
        throw new Error('No \'idevicescreenshot\' program found. To use, install ' + 'using \'brew install --HEAD libimobiledevice\'');

      case 8:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 5]]);
}

commands.getScreenshot = function callee$0$0() {
  var getScreenshotFromIDS, getScreenshotFromWDA, useIdeviceScreenshot;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        getScreenshotFromIDS = function getScreenshotFromIDS() {
          var orientation;
          return _regeneratorRuntime.async(function getScreenshotFromIDS$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                _logger2['default'].debug('Taking screenshot with \'idevicescreenshot\'');
                context$2$0.next = 3;
                return _regeneratorRuntime.awrap(verifyIdeviceScreenshotAvailable());

              case 3:
                context$2$0.next = 5;
                return _regeneratorRuntime.awrap(this.proxyCommand('/orientation', 'GET'));

              case 5:
                orientation = context$2$0.sent;
                context$2$0.next = 8;
                return _regeneratorRuntime.awrap(getScreenshotWithIdevicelib(this.opts.udid, orientation === 'LANDSCAPE'));

              case 8:
                return context$2$0.abrupt('return', context$2$0.sent);

              case 9:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        };

        getScreenshotFromWDA = function getScreenshotFromWDA() {
          var data;
          return _regeneratorRuntime.async(function getScreenshotFromWDA$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                _logger2['default'].debug('Taking screenshot with WDA');
                context$2$0.next = 3;
                return _regeneratorRuntime.awrap(this.proxyCommand('/screenshot', 'GET'));

              case 3:
                data = context$2$0.sent;

                if (_lodash2['default'].isString(data)) {
                  context$2$0.next = 6;
                  break;
                }

                throw new Error('Unable to take screenshot. WDA returned \'' + JSON.stringify(data) + '\'');

              case 6:
                return context$2$0.abrupt('return', data);

              case 7:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        };

        useIdeviceScreenshot = _lodash2['default'].lowerCase(this.opts.realDeviceScreenshotter) === 'idevicescreenshot';

        if (!useIdeviceScreenshot) {
          context$1$0.next = 7;
          break;
        }

        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(getScreenshotFromIDS());

      case 6:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 7:
        context$1$0.prev = 7;
        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(getScreenshotFromWDA());

      case 10:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 13:
        context$1$0.prev = 13;
        context$1$0.t0 = context$1$0['catch'](7);

        _logger2['default'].warn('Error getting screenshot: ' + context$1$0.t0.message);

      case 16:
        if (!this.isSimulator()) {
          context$1$0.next = 22;
          break;
        }

        if (this.xcodeVersion.versionFloat < 8.1) {
          _logger2['default'].errorAndThrow('No command line screenshot ability with Xcode ' + (this.xcodeVersion.versionFloat + '. Please upgrade to ') + 'at least Xcode 8.1');
        }
        _logger2['default'].info('Falling back to \'simctl io screenshot\' API');
        context$1$0.next = 21;
        return _regeneratorRuntime.awrap((0, _nodeSimctl.getScreenshot)(this.opts.udid));

      case 21:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 22:
        context$1$0.prev = 22;
        context$1$0.next = 25;
        return _regeneratorRuntime.awrap(getScreenshotFromIDS());

      case 25:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 28:
        context$1$0.prev = 28;
        context$1$0.t1 = context$1$0['catch'](22);

        _logger2['default'].warn('Error getting screenshot through \'idevicescreenshot\': ' + context$1$0.t1.message);

      case 31:
        context$1$0.next = 33;
        return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(2, 1000, getScreenshotFromWDA));

      case 33:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 34:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[7, 13], [22, 28]]);
};

commands.getElementScreenshot = function callee$0$0(el) {
  var atomsElement, data;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        el = _appiumSupport.util.unwrapElement(el);

        if (!this.isWebContext()) {
          context$1$0.next = 6;
          break;
        }

        atomsElement = this.useAtomsElement(el);
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.executeAtom('getElementScreenshot', [atomsElement]));

      case 5:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 6:

        if (this.xcodeVersion.major < 9) {
          _logger2['default'].errorAndThrow('Element screenshots are only available since Xcode 9. ' + ('The current Xcode version is ' + this.xcodeVersion.major + '.' + this.xcodeVersion.minor));
        }
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(this.proxyCommand('/element/' + el + '/screenshot', 'GET'));

      case 9:
        data = context$1$0.sent;

        if (!_lodash2['default'].isString(data)) {
          _logger2['default'].errorAndThrow('Unable to take a screenshot of the element ' + el + '. WDA returned \'' + JSON.stringify(data) + '\'');
        }
        return context$1$0.abrupt('return', data);

      case 12:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getViewportScreenshot = function callee$0$0() {
  var statusBarHeight, screenshot, scale, windowSize, rect, newScreenshot;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getStatusBarHeight());

      case 2:
        statusBarHeight = context$1$0.sent;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.getScreenshot());

      case 5:
        screenshot = context$1$0.sent;

        if (!(statusBarHeight === 0)) {
          context$1$0.next = 8;
          break;
        }

        return context$1$0.abrupt('return', screenshot);

      case 8:
        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(this.getDevicePixelRatio());

      case 10:
        scale = context$1$0.sent;

        // status bar height comes in unscaled, so scale it
        statusBarHeight = Math.round(statusBarHeight * scale);
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(this.getWindowSize());

      case 14:
        windowSize = context$1$0.sent;
        rect = {
          left: 0,
          top: statusBarHeight,
          width: windowSize.width * scale,
          height: windowSize.height * scale - statusBarHeight
        };
        context$1$0.next = 18;
        return _regeneratorRuntime.awrap(_appiumSupport.imageUtil.cropBase64Image(screenshot, rect));

      case 18:
        newScreenshot = context$1$0.sent;
        return context$1$0.abrupt('return', newScreenshot);

      case 20:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

exports['default'] = commands;
module.exports = exports['default'];

// The sips tool is only present on Mac OS

// simulator attempt

// all simulator scenarios are finished
// real device, so try idevicescreenshot if possible

// Retry for real devices only. Fail fast on Simulator if simctl does not work as expected

// if we don't have a status bar, there's nothing to crop, so we can avoid
// extra calls and return straightaway
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9zY3JlZW5zaG90cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7d0JBQThCLFVBQVU7O3NCQUMxQixRQUFROzs7OzBCQUNRLGFBQWE7OzRCQUN0QixjQUFjOztzQkFDbkIsV0FBVzs7Ozs2QkFDa0IsZ0JBQWdCOztBQUU3RCxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7O0FBRWxCLFNBQWUsMkJBQTJCLENBQUUsSUFBSSxFQUFFLFdBQVc7TUFDckQsb0JBQW9CLEVBRXBCLGVBQWUsRUFTZixRQUFROzs7Ozt5Q0FYcUIsdUJBQVEsSUFBSSxDQUFDLEVBQUMsTUFBTSxrQkFBZ0IsSUFBSSxBQUFFLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBQyxDQUFDOzs7QUFBMUYsNEJBQW9COzt5Q0FDcEIsa0JBQUcsTUFBTSxDQUFDLG9CQUFvQixDQUFDOzs7O3lDQUNQLHVCQUFRLElBQUksQ0FBQyxFQUFDLE1BQU0sa0JBQWdCLElBQUksQUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUMsQ0FBQzs7O0FBQXBGLHVCQUFlOzt5Q0FDZixrQkFBRyxNQUFNLENBQUMsZUFBZSxDQUFDOzs7Ozs7eUNBR3RCLHdCQUFLLG1CQUFtQixFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxvQkFBb0IsQ0FBQyxDQUFDOzs7Ozs7Ozs7Y0FFN0QsSUFBSSxLQUFLLENBQUMsZ0RBQTZDLElBQUksMERBQ3pCLGVBQUUsT0FBTyxDQUFFLENBQUM7OztBQUVsRCxnQkFBUSxHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsb0JBQW9CLEVBQUUsT0FBTyxFQUFFLGVBQWUsQ0FBQzs7QUFDdEYsWUFBSSxXQUFXLEVBQUU7QUFDZixrQkFBUSxJQUFJLElBQUksRUFBRSxLQUFLLDRCQUFLLFFBQVEsRUFBQyxDQUFDO1NBQ3ZDOzs7eUNBR08sd0JBQUssTUFBTSxFQUFFLFFBQVEsQ0FBQzs7Ozs7Ozs7O2NBRXRCLElBQUks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ZSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUM7OztBQUFqRSxxQkFBYTs0Q0FDVixhQUFhOzs7Ozs7O0NBQ3JCLENBQUM7O3FCQUVhLFFBQVEiLCJmaWxlIjoibGliL2NvbW1hbmRzL3NjcmVlbnNob3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmV0cnlJbnRlcnZhbCB9IGZyb20gJ2FzeW5jYm94JztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBnZXRTY3JlZW5zaG90IH0gZnJvbSAnbm9kZS1zaW1jdGwnO1xuaW1wb3J0IHsgZXhlYyB9IGZyb20gJ3RlZW5fcHJvY2Vzcyc7XG5pbXBvcnQgbG9nIGZyb20gJy4uL2xvZ2dlcic7XG5pbXBvcnQgeyBmcywgdGVtcERpciwgdXRpbCwgaW1hZ2VVdGlsIH0gZnJvbSAnYXBwaXVtLXN1cHBvcnQnO1xuXG5sZXQgY29tbWFuZHMgPSB7fTtcblxuYXN5bmMgZnVuY3Rpb24gZ2V0U2NyZWVuc2hvdFdpdGhJZGV2aWNlbGliICh1ZGlkLCBpc0xhbmRzY2FwZSkge1xuICBjb25zdCBwYXRoVG9TY3JlZW5zaG90VGlmZiA9IGF3YWl0IHRlbXBEaXIucGF0aCh7cHJlZml4OiBgc2NyZWVuc2hvdC0ke3VkaWR9YCwgc3VmZml4OiAnLnRpZmYnfSk7XG4gIGF3YWl0IGZzLnJpbXJhZihwYXRoVG9TY3JlZW5zaG90VGlmZik7XG4gIGNvbnN0IHBhdGhUb1Jlc3VsdFBuZyA9IGF3YWl0IHRlbXBEaXIucGF0aCh7cHJlZml4OiBgc2NyZWVuc2hvdC0ke3VkaWR9YCwgc3VmZml4OiAnLnBuZyd9KTtcbiAgYXdhaXQgZnMucmltcmFmKHBhdGhUb1Jlc3VsdFBuZyk7XG4gIHRyeSB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGV4ZWMoJ2lkZXZpY2VzY3JlZW5zaG90JywgWyctdScsIHVkaWQsIHBhdGhUb1NjcmVlbnNob3RUaWZmXSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgdGFrZSBhIHNjcmVlbnNob3QgZnJvbSB0aGUgZGV2aWNlICcke3VkaWR9JyB1c2luZyBgICtcbiAgICAgICAgYGlkZXZpY2VzY3JlZW5zaG90LiBPcmlnaW5hbCBlcnJvcjogJHtlLm1lc3NhZ2V9YCk7XG4gICAgfVxuICAgIGxldCBzaXBzQXJncyA9IFsnLXMnLCAnZm9ybWF0JywgJ3BuZycsIHBhdGhUb1NjcmVlbnNob3RUaWZmLCAnLS1vdXQnLCBwYXRoVG9SZXN1bHRQbmddO1xuICAgIGlmIChpc0xhbmRzY2FwZSkge1xuICAgICAgc2lwc0FyZ3MgPSBbJy1yJywgJy05MCcsIC4uLnNpcHNBcmdzXTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIFRoZSBzaXBzIHRvb2wgaXMgb25seSBwcmVzZW50IG9uIE1hYyBPU1xuICAgICAgYXdhaXQgZXhlYygnc2lwcycsIHNpcHNBcmdzKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBjb252ZXJ0IGEgc2NyZWVuc2hvdCBmcm9tIFRJRkYgdG8gUE5HIHVzaW5nIHNpcHMgdG9vbC4gYCArXG4gICAgICAgIGBPcmlnaW5hbCBlcnJvcjogJHtlLm1lc3NhZ2V9YCk7XG4gICAgfVxuICAgIGlmICghYXdhaXQgZnMuZXhpc3RzKHBhdGhUb1Jlc3VsdFBuZykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGNvbnZlcnQgYSBzY3JlZW5zaG90IGZyb20gVElGRiB0byBQTkcuIFRoZSBjb252ZXJzaW9uIGAgK1xuICAgICAgICBgcmVzdWx0IGRvZXMgbm90IGV4aXN0IGF0ICcke3BhdGhUb1Jlc3VsdFBuZ30nYCk7XG4gICAgfVxuICAgIHJldHVybiAoYXdhaXQgZnMucmVhZEZpbGUocGF0aFRvUmVzdWx0UG5nKSkudG9TdHJpbmcoJ2Jhc2U2NCcpO1xuICB9IGZpbmFsbHkge1xuICAgIGF3YWl0IGZzLnJpbXJhZihwYXRoVG9TY3JlZW5zaG90VGlmZik7XG4gICAgYXdhaXQgZnMucmltcmFmKHBhdGhUb1Jlc3VsdFBuZyk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gdmVyaWZ5SWRldmljZVNjcmVlbnNob3RBdmFpbGFibGUgKCkge1xuICB0cnkge1xuICAgIGF3YWl0IGZzLndoaWNoKCdpZGV2aWNlc2NyZWVuc2hvdCcpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE5vICdpZGV2aWNlc2NyZWVuc2hvdCcgcHJvZ3JhbSBmb3VuZC4gVG8gdXNlLCBpbnN0YWxsIGAgK1xuICAgICAgICAgICAgICAgICAgICBgdXNpbmcgJ2JyZXcgaW5zdGFsbCAtLUhFQUQgbGliaW1vYmlsZWRldmljZSdgKTtcbiAgfVxufVxuXG5jb21tYW5kcy5nZXRTY3JlZW5zaG90ID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBjb25zdCBnZXRTY3JlZW5zaG90RnJvbUlEUyA9IGFzeW5jICgpID0+IHtcbiAgICBsb2cuZGVidWcoYFRha2luZyBzY3JlZW5zaG90IHdpdGggJ2lkZXZpY2VzY3JlZW5zaG90J2ApO1xuICAgIGF3YWl0IHZlcmlmeUlkZXZpY2VTY3JlZW5zaG90QXZhaWxhYmxlKCk7XG4gICAgY29uc3Qgb3JpZW50YXRpb24gPSBhd2FpdCB0aGlzLnByb3h5Q29tbWFuZCgnL29yaWVudGF0aW9uJywgJ0dFVCcpO1xuICAgIHJldHVybiBhd2FpdCBnZXRTY3JlZW5zaG90V2l0aElkZXZpY2VsaWIodGhpcy5vcHRzLnVkaWQsIG9yaWVudGF0aW9uID09PSAnTEFORFNDQVBFJyk7XG4gIH07XG4gIGNvbnN0IGdldFNjcmVlbnNob3RGcm9tV0RBID0gYXN5bmMgKCkgPT4ge1xuICAgIGxvZy5kZWJ1ZyhgVGFraW5nIHNjcmVlbnNob3Qgd2l0aCBXREFgKTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5wcm94eUNvbW1hbmQoJy9zY3JlZW5zaG90JywgJ0dFVCcpO1xuICAgIGlmICghXy5pc1N0cmluZyhkYXRhKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmFibGUgdG8gdGFrZSBzY3JlZW5zaG90LiBXREEgcmV0dXJuZWQgJyR7SlNPTi5zdHJpbmdpZnkoZGF0YSl9J2ApO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfTtcblxuICBjb25zdCB1c2VJZGV2aWNlU2NyZWVuc2hvdCA9IF8ubG93ZXJDYXNlKHRoaXMub3B0cy5yZWFsRGV2aWNlU2NyZWVuc2hvdHRlcikgPT09ICdpZGV2aWNlc2NyZWVuc2hvdCc7XG4gIGlmICh1c2VJZGV2aWNlU2NyZWVuc2hvdCkge1xuICAgIHJldHVybiBhd2FpdCBnZXRTY3JlZW5zaG90RnJvbUlEUygpO1xuICB9XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gYXdhaXQgZ2V0U2NyZWVuc2hvdEZyb21XREEoKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nLndhcm4oYEVycm9yIGdldHRpbmcgc2NyZWVuc2hvdDogJHtlcnIubWVzc2FnZX1gKTtcbiAgfVxuXG4gIC8vIHNpbXVsYXRvciBhdHRlbXB0XG4gIGlmICh0aGlzLmlzU2ltdWxhdG9yKCkpIHtcbiAgICBpZiAodGhpcy54Y29kZVZlcnNpb24udmVyc2lvbkZsb2F0IDwgOC4xKSB7XG4gICAgICBsb2cuZXJyb3JBbmRUaHJvdyhgTm8gY29tbWFuZCBsaW5lIHNjcmVlbnNob3QgYWJpbGl0eSB3aXRoIFhjb2RlIGAgK1xuICAgICAgICAgICAgICAgYCR7dGhpcy54Y29kZVZlcnNpb24udmVyc2lvbkZsb2F0fS4gUGxlYXNlIHVwZ3JhZGUgdG8gYCArXG4gICAgICAgICAgICAgICBgYXQgbGVhc3QgWGNvZGUgOC4xYCk7XG4gICAgfVxuICAgIGxvZy5pbmZvKGBGYWxsaW5nIGJhY2sgdG8gJ3NpbWN0bCBpbyBzY3JlZW5zaG90JyBBUElgKTtcbiAgICByZXR1cm4gYXdhaXQgZ2V0U2NyZWVuc2hvdCh0aGlzLm9wdHMudWRpZCk7XG4gIH1cblxuICAvLyBhbGwgc2ltdWxhdG9yIHNjZW5hcmlvcyBhcmUgZmluaXNoZWRcbiAgLy8gcmVhbCBkZXZpY2UsIHNvIHRyeSBpZGV2aWNlc2NyZWVuc2hvdCBpZiBwb3NzaWJsZVxuICB0cnkge1xuICAgIHJldHVybiBhd2FpdCBnZXRTY3JlZW5zaG90RnJvbUlEUygpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2cud2FybihgRXJyb3IgZ2V0dGluZyBzY3JlZW5zaG90IHRocm91Z2ggJ2lkZXZpY2VzY3JlZW5zaG90JzogJHtlcnIubWVzc2FnZX1gKTtcbiAgfVxuXG4gIC8vIFJldHJ5IGZvciByZWFsIGRldmljZXMgb25seS4gRmFpbCBmYXN0IG9uIFNpbXVsYXRvciBpZiBzaW1jdGwgZG9lcyBub3Qgd29yayBhcyBleHBlY3RlZFxuICByZXR1cm4gYXdhaXQgcmV0cnlJbnRlcnZhbCgyLCAxMDAwLCBnZXRTY3JlZW5zaG90RnJvbVdEQSk7XG59O1xuXG5jb21tYW5kcy5nZXRFbGVtZW50U2NyZWVuc2hvdCA9IGFzeW5jIGZ1bmN0aW9uIChlbCkge1xuICBlbCA9IHV0aWwudW53cmFwRWxlbWVudChlbCk7XG4gIGlmICh0aGlzLmlzV2ViQ29udGV4dCgpKSB7XG4gICAgY29uc3QgYXRvbXNFbGVtZW50ID0gdGhpcy51c2VBdG9tc0VsZW1lbnQoZWwpO1xuICAgIHJldHVybiBhd2FpdCB0aGlzLmV4ZWN1dGVBdG9tKCdnZXRFbGVtZW50U2NyZWVuc2hvdCcsIFthdG9tc0VsZW1lbnRdKTtcbiAgfVxuXG4gIGlmICh0aGlzLnhjb2RlVmVyc2lvbi5tYWpvciA8IDkpIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgRWxlbWVudCBzY3JlZW5zaG90cyBhcmUgb25seSBhdmFpbGFibGUgc2luY2UgWGNvZGUgOS4gYCArXG4gICAgICAgICAgICAgICAgICAgICAgYFRoZSBjdXJyZW50IFhjb2RlIHZlcnNpb24gaXMgJHt0aGlzLnhjb2RlVmVyc2lvbi5tYWpvcn0uJHt0aGlzLnhjb2RlVmVyc2lvbi5taW5vcn1gKTtcbiAgfVxuICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5wcm94eUNvbW1hbmQoYC9lbGVtZW50LyR7ZWx9L3NjcmVlbnNob3RgLCAnR0VUJyk7XG4gIGlmICghXy5pc1N0cmluZyhkYXRhKSkge1xuICAgIGxvZy5lcnJvckFuZFRocm93KGBVbmFibGUgdG8gdGFrZSBhIHNjcmVlbnNob3Qgb2YgdGhlIGVsZW1lbnQgJHtlbH0uIFdEQSByZXR1cm5lZCAnJHtKU09OLnN0cmluZ2lmeShkYXRhKX0nYCk7XG4gIH1cbiAgcmV0dXJuIGRhdGE7XG59O1xuXG5jb21tYW5kcy5nZXRWaWV3cG9ydFNjcmVlbnNob3QgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGxldCBzdGF0dXNCYXJIZWlnaHQgPSBhd2FpdCB0aGlzLmdldFN0YXR1c0JhckhlaWdodCgpO1xuICBjb25zdCBzY3JlZW5zaG90ID0gYXdhaXQgdGhpcy5nZXRTY3JlZW5zaG90KCk7XG5cbiAgLy8gaWYgd2UgZG9uJ3QgaGF2ZSBhIHN0YXR1cyBiYXIsIHRoZXJlJ3Mgbm90aGluZyB0byBjcm9wLCBzbyB3ZSBjYW4gYXZvaWRcbiAgLy8gZXh0cmEgY2FsbHMgYW5kIHJldHVybiBzdHJhaWdodGF3YXlcbiAgaWYgKHN0YXR1c0JhckhlaWdodCA9PT0gMCkge1xuICAgIHJldHVybiBzY3JlZW5zaG90O1xuICB9XG5cbiAgY29uc3Qgc2NhbGUgPSBhd2FpdCB0aGlzLmdldERldmljZVBpeGVsUmF0aW8oKTtcbiAgLy8gc3RhdHVzIGJhciBoZWlnaHQgY29tZXMgaW4gdW5zY2FsZWQsIHNvIHNjYWxlIGl0XG4gIHN0YXR1c0JhckhlaWdodCA9IE1hdGgucm91bmQoc3RhdHVzQmFySGVpZ2h0ICogc2NhbGUpO1xuICBjb25zdCB3aW5kb3dTaXplID0gYXdhaXQgdGhpcy5nZXRXaW5kb3dTaXplKCk7XG4gIGxldCByZWN0ID0ge1xuICAgIGxlZnQ6IDAsXG4gICAgdG9wOiBzdGF0dXNCYXJIZWlnaHQsXG4gICAgd2lkdGg6IHdpbmRvd1NpemUud2lkdGggKiBzY2FsZSxcbiAgICBoZWlnaHQ6ICgod2luZG93U2l6ZS5oZWlnaHQgKiBzY2FsZSkgLSBzdGF0dXNCYXJIZWlnaHQpXG4gIH07XG4gIGxldCBuZXdTY3JlZW5zaG90ID0gYXdhaXQgaW1hZ2VVdGlsLmNyb3BCYXNlNjRJbWFnZShzY3JlZW5zaG90LCByZWN0KTtcbiAgcmV0dXJuIG5ld1NjcmVlbnNob3Q7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb21tYW5kcztcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4ifQ==
