'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
var extensions = {},
    commands = {};

/**
 * Sets the primary clipboard's content on the device under test.
 *
 * @param {!string} content - The content to be set as base64 encoded string.
 * @param {?string} contentType [plaintext] - The type of the content to set.
 *                                            Only `plaintext`, 'image and 'url' are supported.
 */
commands.setClipboard = function callee$0$0(content, contentType) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.proxyCommand('/wda/setPasteboard', 'POST', {
          content: content,
          contentType: contentType
        }));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Gets the content of the primary clipboard on the device under test.
 *
 * @param {?string} contentType [plaintext] - The type of the content to get.
 *                                            Only `plaintext`, 'image and 'url' are supported.
 * @returns {string} The actual clipboard content encoded into base64 string.
 * An empty string is returned if the clipboard contains no data.
 */
commands.getClipboard = function callee$0$0(contentType) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.proxyCommand('/wda/getPasteboard', 'POST', {
          contentType: contentType
        }));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

_Object$assign(extensions, commands);
exports.commands = commands;
exports['default'] = extensions;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9jbGlwYm9hcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsSUFBSSxVQUFVLEdBQUcsRUFBRTtJQUFFLFFBQVEsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7OztBQVVuQyxRQUFRLENBQUMsWUFBWSxHQUFHLG9CQUFnQixPQUFPLEVBQUUsV0FBVzs7Ozs7eUNBQ3BELElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLEVBQUUsTUFBTSxFQUFFO0FBQ3BELGlCQUFPLEVBQVAsT0FBTztBQUNQLHFCQUFXLEVBQVgsV0FBVztTQUNaLENBQUM7Ozs7Ozs7Q0FDSCxDQUFDOzs7Ozs7Ozs7O0FBVUYsUUFBUSxDQUFDLFlBQVksR0FBRyxvQkFBZ0IsV0FBVzs7Ozs7eUNBQ3BDLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLEVBQUUsTUFBTSxFQUFFO0FBQzNELHFCQUFXLEVBQVgsV0FBVztTQUNaLENBQUM7Ozs7Ozs7Ozs7Q0FDSCxDQUFDOztBQUdGLGVBQWMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzNCLFFBQVEsR0FBUixRQUFRO3FCQUNGLFVBQVUiLCJmaWxlIjoibGliL2NvbW1hbmRzL2NsaXBib2FyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBleHRlbnNpb25zID0ge30sIGNvbW1hbmRzID0ge307XG5cblxuLyoqXG4gKiBTZXRzIHRoZSBwcmltYXJ5IGNsaXBib2FyZCdzIGNvbnRlbnQgb24gdGhlIGRldmljZSB1bmRlciB0ZXN0LlxuICpcbiAqIEBwYXJhbSB7IXN0cmluZ30gY29udGVudCAtIFRoZSBjb250ZW50IHRvIGJlIHNldCBhcyBiYXNlNjQgZW5jb2RlZCBzdHJpbmcuXG4gKiBAcGFyYW0gez9zdHJpbmd9IGNvbnRlbnRUeXBlIFtwbGFpbnRleHRdIC0gVGhlIHR5cGUgb2YgdGhlIGNvbnRlbnQgdG8gc2V0LlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9ubHkgYHBsYWludGV4dGAsICdpbWFnZSBhbmQgJ3VybCcgYXJlIHN1cHBvcnRlZC5cbiAqL1xuY29tbWFuZHMuc2V0Q2xpcGJvYXJkID0gYXN5bmMgZnVuY3Rpb24gKGNvbnRlbnQsIGNvbnRlbnRUeXBlKSB7XG4gIGF3YWl0IHRoaXMucHJveHlDb21tYW5kKCcvd2RhL3NldFBhc3RlYm9hcmQnLCAnUE9TVCcsIHtcbiAgICBjb250ZW50LFxuICAgIGNvbnRlbnRUeXBlLFxuICB9KTtcbn07XG5cbi8qKlxuICogR2V0cyB0aGUgY29udGVudCBvZiB0aGUgcHJpbWFyeSBjbGlwYm9hcmQgb24gdGhlIGRldmljZSB1bmRlciB0ZXN0LlxuICpcbiAqIEBwYXJhbSB7P3N0cmluZ30gY29udGVudFR5cGUgW3BsYWludGV4dF0gLSBUaGUgdHlwZSBvZiB0aGUgY29udGVudCB0byBnZXQuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT25seSBgcGxhaW50ZXh0YCwgJ2ltYWdlIGFuZCAndXJsJyBhcmUgc3VwcG9ydGVkLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGFjdHVhbCBjbGlwYm9hcmQgY29udGVudCBlbmNvZGVkIGludG8gYmFzZTY0IHN0cmluZy5cbiAqIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZCBpZiB0aGUgY2xpcGJvYXJkIGNvbnRhaW5zIG5vIGRhdGEuXG4gKi9cbmNvbW1hbmRzLmdldENsaXBib2FyZCA9IGFzeW5jIGZ1bmN0aW9uIChjb250ZW50VHlwZSkge1xuICByZXR1cm4gYXdhaXQgdGhpcy5wcm94eUNvbW1hbmQoJy93ZGEvZ2V0UGFzdGVib2FyZCcsICdQT1NUJywge1xuICAgIGNvbnRlbnRUeXBlLFxuICB9KTtcbn07XG5cblxuT2JqZWN0LmFzc2lnbihleHRlbnNpb25zLCBjb21tYW5kcyk7XG5leHBvcnQgeyBjb21tYW5kcyB9O1xuZXhwb3J0IGRlZmF1bHQgZXh0ZW5zaW9ucztcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4ifQ==
