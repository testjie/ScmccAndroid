/* This library is originated from temp.js at http://github.com/bruce/node-temp */
'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _fs = require('./fs');

var _fs2 = _interopRequireDefault(_fs);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _constants = require('constants');

var _constants2 = _interopRequireDefault(_constants);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var RDWR_EXCL = _constants2['default'].O_CREAT | _constants2['default'].O_TRUNC | _constants2['default'].O_RDWR | _constants2['default'].O_EXCL;

function tempDir() {
  var now, filePath;
  return _regeneratorRuntime.async(function tempDir$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        now = new Date();
        filePath = _path2['default'].join(_os2['default'].tmpdir(), [now.getFullYear(), now.getMonth(), now.getDate(), '-', process.pid, '-', (Math.random() * 0x100000000 + 1).toString(36)].join(''));
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(_fs2['default'].mkdir(filePath));

      case 4:
        return context$1$0.abrupt('return', filePath);

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function path(rawAffixes, defaultPrefix) {
  var affixes, name, tempDirectory;
  return _regeneratorRuntime.async(function path$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        affixes = parseAffixes(rawAffixes, defaultPrefix);
        name = [affixes.prefix, affixes.suffix].join('');
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(tempDir());

      case 4:
        tempDirectory = context$1$0.sent;
        return context$1$0.abrupt('return', _path2['default'].join(tempDirectory, name));

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function open(affixes) {
  var filePath, fd;
  return _regeneratorRuntime.async(function open$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(path(affixes, 'f-'));

      case 2:
        filePath = context$1$0.sent;
        context$1$0.prev = 3;
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(_fs2['default'].open(filePath, RDWR_EXCL, 384));

      case 6:
        fd = context$1$0.sent;
        return context$1$0.abrupt('return', { path: filePath, fd: fd });

      case 10:
        context$1$0.prev = 10;
        context$1$0.t0 = context$1$0['catch'](3);

        _logger2['default'].errorAndThrow(context$1$0.t0);

      case 13:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[3, 10]]);
}

function parseAffixes(rawAffixes, defaultPrefix) {
  var affixes = { prefix: null, suffix: null };
  if (rawAffixes) {
    switch (typeof rawAffixes) {
      case 'string':
        affixes.prefix = rawAffixes;
        break;
      case 'object':
        affixes = rawAffixes;
        break;
      default:
        throw new Error('Unknown affix declaration: ' + affixes);
    }
  } else {
    affixes.prefix = defaultPrefix;
  }
  return affixes;
}

var _static = tempDir();
var openDir = tempDir;

function staticDir() {
  return _regeneratorRuntime.async(function staticDir$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        return context$1$0.abrupt('return', _static);

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

exports.open = open;
exports.path = path;
exports.openDir = openDir;
exports.staticDir = staticDir;

// creates a temp directory using the date and a random string

// opens the file in mode 384
//# sourceMappingURL=data:application/json;charset=utf8;base64,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LCJmaWxlIjoibGliL3RlbXBkaXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBUaGlzIGxpYnJhcnkgaXMgb3JpZ2luYXRlZCBmcm9tIHRlbXAuanMgYXQgaHR0cDovL2dpdGh1Yi5jb20vYnJ1Y2Uvbm9kZS10ZW1wICovXG5pbXBvcnQgZnMgZnJvbSAnLi9mcyc7XG5pbXBvcnQgb3MgZnJvbSAnb3MnO1xuaW1wb3J0IG5vZGVQYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGNuc3QgZnJvbSAnY29uc3RhbnRzJztcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2dnZXInO1xuXG5jb25zdCBSRFdSX0VYQ0wgPSBjbnN0Lk9fQ1JFQVQgfCBjbnN0Lk9fVFJVTkMgfCBjbnN0Lk9fUkRXUiB8IGNuc3QuT19FWENMO1xuXG5hc3luYyBmdW5jdGlvbiB0ZW1wRGlyICgpIHtcbiAgbGV0IG5vdyA9IG5ldyBEYXRlKCk7XG4gIGxldCBmaWxlUGF0aCA9IG5vZGVQYXRoLmpvaW4ob3MudG1wZGlyKCksXG4gICAgW25vdy5nZXRGdWxsWWVhcigpLCBub3cuZ2V0TW9udGgoKSwgbm93LmdldERhdGUoKSxcbiAgICAnLScsXG4gICAgcHJvY2Vzcy5waWQsXG4gICAgJy0nLFxuICAgIChNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwMDAgKyAxKS50b1N0cmluZygzNildLmpvaW4oJycpKTtcbiAgLy8gY3JlYXRlcyBhIHRlbXAgZGlyZWN0b3J5IHVzaW5nIHRoZSBkYXRlIGFuZCBhIHJhbmRvbSBzdHJpbmdcblxuICBhd2FpdCBmcy5ta2RpcihmaWxlUGF0aCk7XG5cbiAgcmV0dXJuIGZpbGVQYXRoO1xufVxuXG5hc3luYyBmdW5jdGlvbiBwYXRoIChyYXdBZmZpeGVzLCBkZWZhdWx0UHJlZml4KSB7XG4gIGxldCBhZmZpeGVzID0gcGFyc2VBZmZpeGVzKHJhd0FmZml4ZXMsIGRlZmF1bHRQcmVmaXgpO1xuICBsZXQgbmFtZSA9IFthZmZpeGVzLnByZWZpeCwgYWZmaXhlcy5zdWZmaXhdLmpvaW4oJycpO1xuICBsZXQgdGVtcERpcmVjdG9yeSA9IGF3YWl0IHRlbXBEaXIoKTtcbiAgcmV0dXJuIG5vZGVQYXRoLmpvaW4odGVtcERpcmVjdG9yeSwgbmFtZSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG9wZW4gKGFmZml4ZXMpIHtcbiAgbGV0IGZpbGVQYXRoID0gYXdhaXQgcGF0aChhZmZpeGVzLCAnZi0nKTtcbiAgdHJ5IHtcbiAgICBsZXQgZmQgPSBhd2FpdCBmcy5vcGVuKGZpbGVQYXRoLCBSRFdSX0VYQ0wsIDBvNjAwKTtcbiAgICAvLyBvcGVucyB0aGUgZmlsZSBpbiBtb2RlIDM4NFxuICAgIHJldHVybiB7cGF0aDogZmlsZVBhdGgsIGZkfTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coZXJyKTtcbiAgfVxuXG59XG5cbmZ1bmN0aW9uIHBhcnNlQWZmaXhlcyAocmF3QWZmaXhlcywgZGVmYXVsdFByZWZpeCkge1xuICBsZXQgYWZmaXhlcyA9IHtwcmVmaXg6IG51bGwsIHN1ZmZpeDogbnVsbH07XG4gIGlmIChyYXdBZmZpeGVzKSB7XG4gICAgc3dpdGNoICh0eXBlb2YgcmF3QWZmaXhlcykge1xuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgYWZmaXhlcy5wcmVmaXggPSByYXdBZmZpeGVzO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIGFmZml4ZXMgPSByYXdBZmZpeGVzO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBhZmZpeCBkZWNsYXJhdGlvbjogJHthZmZpeGVzfWApO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBhZmZpeGVzLnByZWZpeCA9IGRlZmF1bHRQcmVmaXg7XG4gIH1cbiAgcmV0dXJuIGFmZml4ZXM7XG59XG5cbmNvbnN0IF9zdGF0aWMgPSB0ZW1wRGlyKCk7XG5jb25zdCBvcGVuRGlyID0gdGVtcERpcjtcblxuYXN5bmMgZnVuY3Rpb24gc3RhdGljRGlyICgpIHtcbiAgcmV0dXJuIF9zdGF0aWM7XG59XG5cbmV4cG9ydCB7IG9wZW4sIHBhdGgsIG9wZW5EaXIsIHN0YXRpY0RpciB9O1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9
