'use strict';

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _xmldom = require('xmldom');

var _xmldom2 = _interopRequireDefault(_xmldom);

var _js2xmlparser2 = require("js2xmlparser2");

var _js2xmlparser22 = _interopRequireDefault(_js2xmlparser2);

var commands = {},
    helpers = {},
    extensions = {};

var APPIUM_SRC_XML = '<?xml version="1.0" encoding="UTF-8"?><AppiumAUT/>';

commands.getPageSource = function callee$0$0() {
  var script, srcTree;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.isWebContext()) {
          context$1$0.next = 5;
          break;
        }

        script = 'return document.documentElement.outerHTML';
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.executeAtom('execute_script', [script, []]));

      case 4:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 5:
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.settings.getSettings());

      case 7:
        if (!context$1$0.sent.useJSONSource) {
          context$1$0.next = 12;
          break;
        }

        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(this.mobileGetSource({ format: 'json' }));

      case 10:
        srcTree = context$1$0.sent;
        return context$1$0.abrupt('return', getSourceXml(getTreeForXML(srcTree)));

      case 12:
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(this.getNativePageSource());

      case 14:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 15:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.getNativePageSource = function callee$0$0() {
  var srcTree, parser, tree, doc;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.proxyCommand('/source', 'GET'));

      case 2:
        srcTree = context$1$0.sent;
        parser = new _xmldom2['default'].DOMParser();
        tree = parser.parseFromString(srcTree);
        doc = parser.parseFromString(APPIUM_SRC_XML);

        doc.documentElement.appendChild(tree.documentElement);

        return context$1$0.abrupt('return', new _xmldom2['default'].XMLSerializer().serializeToString(doc));

      case 8:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.mobileGetSource = function callee$0$0() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (_lodash2['default'].isString(opts.format)) {
          context$1$0.next = 4;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.getNativePageSource());

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.proxyCommand('/source?format=' + encodeURIComponent(opts.format), 'GET'));

      case 6:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/* Will get JSON of the form:
 *   { isEnabled: '1',
 *     isVisible: '1',
 *     frame: '{{0, 0}, {375, 667}}',
 *     children:
 *      [ { isEnabled: '1',
 *          isVisible: '1',
 *          frame: '{{0, 0}, {375, 667}}',
 *          children: [],
 *          rect: { x: 0, y: 0, width: 375, height: 667 },
 *          value: null,
 *          label: null,
 *          type: 'Other',
 *          name: null,
 *          rawIdentifier: null },
 *     rect: { origin: { x: 0, y: 0 }, size: { width: 375, height: 667 } },
 *     value: null,
 *     label: 'UICatalog',
 *     type: 'Application',
 *     name: 'UICatalog',
 *     rawIdentifier: null }
 */
function getTreeForXML(srcTree) {
  function getTree(element, elementIndex, parentPath) {
    var curPath = parentPath + '/' + elementIndex;
    var rect = element.rect || {};
    var subtree = {
      '@': {
        type: 'XCUIElementType' + element.type,
        enabled: parseInt(element.isEnabled, 10) === 1,
        visible: parseInt(element.isVisible, 10) === 1,
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height
      },
      '>': []
    };
    if (element.name !== null) {
      subtree['@'].name = element.name;
    }
    if (element.label !== null) {
      subtree['@'].label = element.label;
    }
    if (element.value !== null) {
      subtree['@'].value = element.value;
    }
    for (var i = 0; i < (element.children || []).length; i++) {
      subtree['>'].push(getTree(element.children[i], i, curPath));
    }
    return _defineProperty({}, 'XCUIElementType' + element.type, subtree);
  }
  var tree = getTree(srcTree, 0, '');
  return tree;
}

function getSourceXml(jsonSource) {
  return (0, _js2xmlparser22['default'])("AppiumAUT", jsonSource, {
    wrapArray: { enabled: false, elementName: 'element' },
    declaration: { include: true },
    prettyPrinting: { indentString: '  ' }
  });
}

_Object$assign(extensions, commands, helpers);
exports.commands = commands;
exports.helpers = helpers;
exports['default'] = extensions;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9zb3VyY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7c0JBQWMsUUFBUTs7OztzQkFDSCxRQUFROzs7OzZCQUNSLGVBQWU7Ozs7QUFHbEMsSUFBSSxRQUFRLEdBQUcsRUFBRTtJQUFFLE9BQU8sR0FBRyxFQUFFO0lBQUUsVUFBVSxHQUFHLEVBQUUsQ0FBQzs7QUFFakQsSUFBTSxjQUFjLEdBQUcsb0RBQW9ELENBQUM7O0FBRzVFLFFBQVEsQ0FBQyxhQUFhLEdBQUc7TUFFZixNQUFNLEVBS1IsT0FBTzs7OzthQU5ULElBQUksQ0FBQyxZQUFZLEVBQUU7Ozs7O0FBQ2YsY0FBTSxHQUFHLDJDQUEyQzs7eUNBQzdDLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7Ozs7Ozs7eUNBR3BELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFOzs7OEJBQUUsYUFBYTs7Ozs7O3lDQUMvQixJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBQyxDQUFDOzs7QUFBdEQsZUFBTzs0Q0FDSixZQUFZLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzs7O3lDQUVoQyxJQUFJLENBQUMsbUJBQW1CLEVBQUU7Ozs7Ozs7Ozs7Q0FDeEMsQ0FBQzs7QUFFRixPQUFPLENBQUMsbUJBQW1CLEdBQUc7TUFDeEIsT0FBTyxFQUVQLE1BQU0sRUFFTixJQUFJLEVBRUosR0FBRzs7Ozs7eUNBTmEsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDOzs7QUFBbkQsZUFBTztBQUVQLGNBQU0sR0FBRyxJQUFJLG9CQUFPLFNBQVMsRUFBRTtBQUUvQixZQUFJLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUM7QUFFdEMsV0FBRyxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDOztBQUNoRCxXQUFH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LFlBQVksRUFBRSxJQUFJLEVBQUM7R0FDckMsQ0FBQyxDQUFDO0NBQ0o7O0FBR0QsZUFBYyxVQUFVLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLFFBQVEsR0FBUixRQUFRO1FBQUUsT0FBTyxHQUFQLE9BQU87cUJBQ1gsVUFBVSIsImZpbGUiOiJsaWIvY29tbWFuZHMvc291cmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB4bWxkb20gZnJvbSAneG1sZG9tJztcbmltcG9ydCBqczJ4bWwgZnJvbSBcImpzMnhtbHBhcnNlcjJcIjtcblxuXG5sZXQgY29tbWFuZHMgPSB7fSwgaGVscGVycyA9IHt9LCBleHRlbnNpb25zID0ge307XG5cbmNvbnN0IEFQUElVTV9TUkNfWE1MID0gJzw/eG1sIHZlcnNpb249XCIxLjBcIiBlbmNvZGluZz1cIlVURi04XCI/PjxBcHBpdW1BVVQvPic7XG5cblxuY29tbWFuZHMuZ2V0UGFnZVNvdXJjZSA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuaXNXZWJDb250ZXh0KCkpIHtcbiAgICBjb25zdCBzY3JpcHQgPSAncmV0dXJuIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5vdXRlckhUTUwnO1xuICAgIHJldHVybiBhd2FpdCB0aGlzLmV4ZWN1dGVBdG9tKCdleGVjdXRlX3NjcmlwdCcsIFtzY3JpcHQsIFtdXSk7XG4gIH1cblxuICBpZiAoKGF3YWl0IHRoaXMuc2V0dGluZ3MuZ2V0U2V0dGluZ3MoKSkudXNlSlNPTlNvdXJjZSkge1xuICAgIGxldCBzcmNUcmVlID0gYXdhaXQgdGhpcy5tb2JpbGVHZXRTb3VyY2Uoe2Zvcm1hdDogJ2pzb24nfSk7XG4gICAgcmV0dXJuIGdldFNvdXJjZVhtbChnZXRUcmVlRm9yWE1MKHNyY1RyZWUpKTtcbiAgfVxuICByZXR1cm4gYXdhaXQgdGhpcy5nZXROYXRpdmVQYWdlU291cmNlKCk7XG59O1xuXG5oZWxwZXJzLmdldE5hdGl2ZVBhZ2VTb3VyY2UgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGxldCBzcmNUcmVlID0gYXdhaXQgdGhpcy5wcm94eUNvbW1hbmQoJy9zb3VyY2UnLCAnR0VUJyk7XG5cbiAgbGV0IHBhcnNlciA9IG5ldyB4bWxkb20uRE9NUGFyc2VyKCk7XG5cbiAgbGV0IHRyZWUgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKHNyY1RyZWUpO1xuXG4gIGxldCBkb2MgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKEFQUElVTV9TUkNfWE1MKTtcbiAgZG9jLmRvY3VtZW50RWxlbWVudC5hcHBlbmRDaGlsZCh0cmVlLmRvY3VtZW50RWxlbWVudCk7XG5cbiAgcmV0dXJuIG5ldyB4bWxkb20uWE1MU2VyaWFsaXplcigpLnNlcmlhbGl6ZVRvU3RyaW5nKGRvYyk7XG59O1xuXG5oZWxwZXJzLm1vYmlsZUdldFNvdXJjZSA9IGFzeW5jIGZ1bmN0aW9uIChvcHRzID0ge30pIHtcbiAgaWYgKCFfLmlzU3RyaW5nKG9wdHMuZm9ybWF0KSkge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLmdldE5hdGl2ZVBhZ2VTb3VyY2UoKTtcbiAgfVxuICByZXR1cm4gYXdhaXQgdGhpcy5wcm94eUNvbW1hbmQoYC9zb3VyY2U/Zm9ybWF0PSR7ZW5jb2RlVVJJQ29tcG9uZW50KG9wdHMuZm9ybWF0KX1gLCAnR0VUJyk7XG59O1xuXG4vKiBXaWxsIGdldCBKU09OIG9mIHRoZSBmb3JtOlxuICogICB7IGlzRW5hYmxlZDogJzEnLFxuICogICAgIGlzVmlzaWJsZTogJzEnLFxuICogICAgIGZyYW1lOiAne3swLCAwfSwgezM3NSwgNjY3fX0nLFxuICogICAgIGNoaWxkcmVuOlxuICogICAgICBbIHsgaXNFbmFibGVkOiAnMScsXG4gKiAgICAgICAgICBpc1Zpc2libGU6ICcxJyxcbiAqICAgICAgICAgIGZyYW1lOiAne3swLCAwfSwgezM3NSwgNjY3fX0nLFxuICogICAgICAgICAgY2hpbGRyZW46IFtdLFxuICogICAgICAgICAgcmVjdDogeyB4OiAwLCB5OiAwLCB3aWR0aDogMzc1LCBoZWlnaHQ6IDY2NyB9LFxuICogICAgICAgICAgdmFsdWU6IG51bGwsXG4gKiAgICAgICAgICBsYWJlbDogbnVsbCxcbiAqICAgICAgICAgIHR5cGU6ICdPdGhlcicsXG4gKiAgICAgICAgICBuYW1lOiBudWxsLFxuICogICAgICAgICAgcmF3SWRlbnRpZmllcjogbnVsbCB9LFxuICogICAgIHJlY3Q6IHsgb3JpZ2luOiB7IHg6IDAsIHk6IDAgfSwgc2l6ZTogeyB3aWR0aDogMzc1LCBoZWlnaHQ6IDY2NyB9IH0sXG4gKiAgICAgdmFsdWU6IG51bGwsXG4gKiAgICAgbGFiZWw6ICdVSUNhdGFsb2cnLFxuICogICAgIHR5cGU6ICdBcHBsaWNhdGlvbicsXG4gKiAgICAgbmFtZTogJ1VJQ2F0YWxvZycsXG4gKiAgICAgcmF3SWRlbnRpZmllcjogbnVsbCB9XG4gKi9cbmZ1bmN0aW9uIGdldFRyZWVGb3JYTUwgKHNyY1RyZWUpIHtcbiAgZnVuY3Rpb24gZ2V0VHJlZSAoZWxlbWVudCwgZWxlbWVudEluZGV4LCBwYXJlbnRQYXRoKSB7XG4gICAgbGV0IGN1clBhdGggPSBgJHtwYXJlbnRQYXRofS8ke2VsZW1lbnRJbmRleH1gO1xuICAgIGxldCByZWN0ID0gZWxlbWVudC5yZWN0IHx8IHt9O1xuICAgIGxldCBzdWJ0cmVlID0ge1xuICAgICAgJ0AnOiB7XG4gICAgICAgIHR5cGU6IGBYQ1VJRWxlbWVudFR5cGUke2VsZW1lbnQudHlwZX1gLFxuICAgICAgICBlbmFibGVkOiBwYXJzZUludChlbGVtZW50LmlzRW5hYmxlZCwgMTApID09PSAxLFxuICAgICAgICB2aXNpYmxlOiBwYXJzZUludChlbGVtZW50LmlzVmlzaWJsZSwgMTApID09PSAxLFxuICAgICAgICB4OiByZWN0LngsXG4gICAgICAgIHk6IHJlY3QueSxcbiAgICAgICAgd2lkdGg6IHJlY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogcmVjdC5oZWlnaHQsXG4gICAgICB9LFxuICAgICAgJz4nOiBbXVxuICAgIH07XG4gICAgaWYgKGVsZW1lbnQubmFtZSAhPT0gbnVsbCkge1xuICAgICAgc3VidHJlZVsnQCddLm5hbWUgPSBlbGVtZW50Lm5hbWU7XG4gICAgfVxuICAgIGlmIChlbGVtZW50LmxhYmVsICE9PSBudWxsKSB7XG4gICAgICBzdWJ0cmVlWydAJ10ubGFiZWwgPSBlbGVtZW50LmxhYmVsO1xuICAgIH1cbiAgICBpZiAoZWxlbWVudC52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgc3VidHJlZVsnQCddLnZhbHVlID0gZWxlbWVudC52YWx1ZTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAoZWxlbWVudC5jaGlsZHJlbiB8fCBbXSkubGVuZ3RoOyBpKyspIHtcbiAgICAgIHN1YnRyZWVbJz4nXS5wdXNoKGdldFRyZWUoZWxlbWVudC5jaGlsZHJlbltpXSwgaSwgY3VyUGF0aCkpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgW2BYQ1VJRWxlbWVudFR5cGUke2VsZW1lbnQudHlwZX1gXTogc3VidHJlZVxuICAgIH07XG4gIH1cbiAgbGV0IHRyZWUgPSBnZXRUcmVlKHNyY1RyZWUsIDAsICcnKTtcbiAgcmV0dXJuIHRyZWU7XG59XG5cbmZ1bmN0aW9uIGdldFNvdXJjZVhtbCAoanNvblNvdXJjZSkge1xuICByZXR1cm4ganMyeG1sKFwiQXBwaXVtQVVUXCIsIGpzb25Tb3VyY2UsIHtcbiAgICB3cmFwQXJyYXk6IHtlbmFibGVkOiBmYWxzZSwgZWxlbWVudE5hbWU6ICdlbGVtZW50J30sXG4gICAgZGVjbGFyYXRpb246IHtpbmNsdWRlOiB0cnVlfSxcbiAgICBwcmV0dHlQcmludGluZzoge2luZGVudFN0cmluZzogJyAgJ31cbiAgfSk7XG59XG5cblxuT2JqZWN0LmFzc2lnbihleHRlbnNpb25zLCBjb21tYW5kcywgaGVscGVycyk7XG5leHBvcnQgeyBjb21tYW5kcywgaGVscGVycyB9O1xuZXhwb3J0IGRlZmF1bHQgZXh0ZW5zaW9ucztcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4ifQ==
