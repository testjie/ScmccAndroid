'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumSupport = require('appium-support');

var _basedriverDriver = require("../basedriver/driver");

var _basedriverDriver2 = _interopRequireDefault(_basedriverDriver);

function isNumber(o) {
  return _lodash2['default'].isNumber(o) || !_lodash2['default'].isNaN(parseInt(o, 10)) || !_lodash2['default'].isNaN(parseFloat(o));
}

function msValidator(ms) {
  if (!_lodash2['default'].isNumber(ms) || ms < 0) {
    throw new Error('Wait ms must be a number equal to 0 or greater');
  }
}

var validators = {
  setUrl: function setUrl(url) {
    // either an `xyz://`, `about:`, or `data:` scheme is allowed
    if (!url || !url.match(/^([a-zA-Z0-9_+.-]+:\/\/)|(about:)|(data:)/)) {
      throw new Error('Url or Uri must start with <scheme>://');
    }
  },
  implicitWait: function implicitWait(ms) {
    msValidator(ms);
  },
  asyncScriptTimeout: function asyncScriptTimeout(ms) {
    msValidator(ms);
  },
  timeouts: function timeouts(timeoutsObj) {
    if (timeoutsObj.protocol === _basedriverDriver2['default'].DRIVER_PROTOCOL.W3C) {
      var script = timeoutsObj.script;
      var pageLoad = timeoutsObj.pageLoad;
      var implicit = timeoutsObj.implicit;

      if (_appiumSupport.util.hasValue(script)) {
        msValidator(script);
      }
      if (_appiumSupport.util.hasValue(pageLoad)) {
        msValidator(pageLoad);
      }
      if (_appiumSupport.util.hasValue(implicit)) {
        msValidator(implicit);
      }
    } else {
      var type = timeoutsObj.type;
      var ms = timeoutsObj.ms;

      msValidator(ms);
      if (!_lodash2['default'].includes(['script', 'implicit', 'page load', 'command'], type)) {
        throw new Error('\'' + type + '\' is not a valid timeout type');
      }
    }
  },
  clickCurrent: function clickCurrent(button) {
    if (!(isNumber(button) || _lodash2['default'].isUndefined(button)) || button < 0 || button > 2) {
      throw new Error('Click button must be 0, 1, or 2');
    }
  },
  setNetworkConnection: function setNetworkConnection(type) {
    if (!isNumber(type) || [0, 1, 2, 4, 6].indexOf(type) === -1) {
      throw new Error('Network type must be one of 0, 1, 2, 4, 6');
    }
  }
};

exports.validators = validators;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9wcm90b2NvbC92YWxpZGF0b3JzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O3NCQUFjLFFBQVE7Ozs7NkJBQ0QsZ0JBQWdCOztnQ0FDZCxzQkFBc0I7Ozs7QUFFN0MsU0FBUyxRQUFRLENBQUUsQ0FBQyxFQUFFO0FBQ3BCLFNBQU8sb0JBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFFLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUM5RTs7QUFFRCxTQUFTLFdBQVcsQ0FBRSxFQUFFLEVBQUU7QUFDeEIsTUFBSSxDQUFDLG9CQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFO0FBQzdCLFVBQU0sSUFBSSxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQztHQUNuRTtDQUNGOztBQUVELElBQU0sVUFBVSxHQUFHO0FBQ2pCLFFBQU0sRUFBRSxnQkFBQyxHQUFHLEVBQUs7O0FBRWYsUUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsMkNBQTJDLENBQUMsRUFBRTtBQUNuRSxZQUFNLElBQUksS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7S0FDM0Q7R0FDRjtBQUNELGNBQVksRUFBRSxzQkFBQyxFQUFFLEVBQUs7QUFDcEIsZUFBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0dBQ2pCO0FBQ0Qsb0JBQWtCLEVBQUUsNEJBQUMsRUFBRSxFQUFLO0FBQzFCLGVBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztHQUNqQjtBQUNELFVBQVEsRUFBRSxrQkFBQyxXQUFXLEVBQUs7QUFDekIsUUFBSSxXQUFXLENBQUMsUUFBUSxLQUFLLDhCQUFXLGVBQWUsQ0FBQyxHQUFHLEVBQUU7VUFDcEQsTUFBTSxHQUF3QixXQUFXLENBQXpDLE1BQU07VUFBRSxRQUFRLEdBQWMsV0FBVyxDQUFqQyxRQUFRO1VBQUUsUUFBUSxHQUFJLFdBQVcsQ0FBdkIsUUFBUTs7QUFFakMsVUFBSSxvQkFBSyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7QUFDekIsbUJBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztPQUNyQjtBQUNELFVBQUksb0JBQUssUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO0FBQzNCLG1CQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7T0FDdkI7QUFDRCxVQUFJLG9CQUFLLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtBQUMzQixtQkFBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO09BQ3ZCO0tBQ0YsTUFBTTtVQUNFLElBQUksR0FBUSxXQUFXLENBQXZCLElBQUk7VUFBRSxFQUFFLEdBQUksV0FBVyxDQUFqQixFQUFFOztBQUVmLGlCQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDaEIsVUFBSSxDQUFDLG9CQUFFLFFBQVEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFNBQVMsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFO0FBQ3JFLGNBQU0sSUFBSSxLQUFLLFFBQUssSUFBSSxvQ0FBZ0MsQ0FBQztPQUMxRDtLQUNGO0dBQ0Y7QUFDRCxjQUFZLEVBQUUsc0JBQUMsTUFBTSxFQUFLO0FBQ3hCLFFBQUksRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksb0JBQUUsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFBLEFBQUMsSUFBSyxNQUFNLEdBQUcsQ0FBQyxJQUFJLE1BQU0sR0FBRyxDQUFDLEFBQUMsRUFBRTtBQUM5RSxZQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7S0FDcEQ7R0FDRjtBQUNELHNCQUFvQixFQUFFLDhCQUFDLElBQUksRUFBSztBQUM5QixRQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtBQUMzRCxZQUFNLElBQUksS0FBSyxDQUFDLDJDQUEyQyxDQUFDLENBQUM7S0FDOUQ7R0FDRjtDQUNGLENBQUM7O1FBRU8sVUFBVSxHQUFWLFVBQVUiLCJmaWxlIjoibGliL3Byb3RvY29sL3ZhbGlkYXRvcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgdXRpbCB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCBCYXNlRHJpdmVyIGZyb20gXCIuLi9iYXNlZHJpdmVyL2RyaXZlclwiO1xuXG5mdW5jdGlvbiBpc051bWJlciAobykge1xuICByZXR1cm4gXy5pc051bWJlcihvKSB8fCAhXy5pc05hTihwYXJzZUludChvLCAxMCkpIHx8ICFfLmlzTmFOKHBhcnNlRmxvYXQobykpO1xufVxuXG5mdW5jdGlvbiBtc1ZhbGlkYXRvciAobXMpIHtcbiAgaWYgKCFfLmlzTnVtYmVyKG1zKSB8fCBtcyA8IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1dhaXQgbXMgbXVzdCBiZSBhIG51bWJlciBlcXVhbCB0byAwIG9yIGdyZWF0ZXInKTtcbiAgfVxufVxuXG5jb25zdCB2YWxpZGF0b3JzID0ge1xuICBzZXRVcmw6ICh1cmwpID0+IHtcbiAgICAvLyBlaXRoZXIgYW4gYHh5ejovL2AsIGBhYm91dDpgLCBvciBgZGF0YTpgIHNjaGVtZSBpcyBhbGxvd2VkXG4gICAgaWYgKCF1cmwgfHwgIXVybC5tYXRjaCgvXihbYS16QS1aMC05XysuLV0rOlxcL1xcLyl8KGFib3V0Oil8KGRhdGE6KS8pKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VybCBvciBVcmkgbXVzdCBzdGFydCB3aXRoIDxzY2hlbWU+Oi8vJyk7XG4gICAgfVxuICB9LFxuICBpbXBsaWNpdFdhaXQ6IChtcykgPT4ge1xuICAgIG1zVmFsaWRhdG9yKG1zKTtcbiAgfSxcbiAgYXN5bmNTY3JpcHRUaW1lb3V0OiAobXMpID0+IHtcbiAgICBtc1ZhbGlkYXRvcihtcyk7XG4gIH0sXG4gIHRpbWVvdXRzOiAodGltZW91dHNPYmopID0+IHtcbiAgICBpZiAodGltZW91dHNPYmoucHJvdG9jb2wgPT09IEJhc2VEcml2ZXIuRFJJVkVSX1BST1RPQ09MLlczQykge1xuICAgICAgY29uc3Qge3NjcmlwdCwgcGFnZUxvYWQsIGltcGxpY2l0fSA9IHRpbWVvdXRzT2JqO1xuXG4gICAgICBpZiAodXRpbC5oYXNWYWx1ZShzY3JpcHQpKSB7XG4gICAgICAgIG1zVmFsaWRhdG9yKHNjcmlwdCk7XG4gICAgICB9XG4gICAgICBpZiAodXRpbC5oYXNWYWx1ZShwYWdlTG9hZCkpIHtcbiAgICAgICAgbXNWYWxpZGF0b3IocGFnZUxvYWQpO1xuICAgICAgfVxuICAgICAgaWYgKHV0aWwuaGFzVmFsdWUoaW1wbGljaXQpKSB7XG4gICAgICAgIG1zVmFsaWRhdG9yKGltcGxpY2l0KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qge3R5cGUsIG1zfSA9IHRpbWVvdXRzT2JqO1xuXG4gICAgICBtc1ZhbGlkYXRvcihtcyk7XG4gICAgICBpZiAoIV8uaW5jbHVkZXMoWydzY3JpcHQnLCAnaW1wbGljaXQnLCAncGFnZSBsb2FkJywgJ2NvbW1hbmQnXSwgdHlwZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAnJHt0eXBlfScgaXMgbm90IGEgdmFsaWQgdGltZW91dCB0eXBlYCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBjbGlja0N1cnJlbnQ6IChidXR0b24pID0+IHtcbiAgICBpZiAoIShpc051bWJlcihidXR0b24pIHx8IF8uaXNVbmRlZmluZWQoYnV0dG9uKSkgfHwgKGJ1dHRvbiA8IDAgfHwgYnV0dG9uID4gMikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2xpY2sgYnV0dG9uIG11c3QgYmUgMCwgMSwgb3IgMicpO1xuICAgIH1cbiAgfSxcbiAgc2V0TmV0d29ya0Nvbm5lY3Rpb246ICh0eXBlKSA9PiB7XG4gICAgaWYgKCFpc051bWJlcih0eXBlKSB8fCBbMCwgMSwgMiwgNCwgNl0uaW5kZXhPZih0eXBlKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayB0eXBlIG11c3QgYmUgb25lIG9mIDAsIDEsIDIsIDQsIDYnKTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCB7IHZhbGlkYXRvcnMgfTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4ifQ==
