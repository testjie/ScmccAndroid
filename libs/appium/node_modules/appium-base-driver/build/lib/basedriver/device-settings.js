'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var DeviceSettings = (function () {
  function DeviceSettings() {
    var defaultSettings = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var onSettingsUpdate = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    _classCallCheck(this, DeviceSettings);

    this._settings = _Object$assign({}, defaultSettings);
    this.onSettingsUpdate = onSettingsUpdate;
  }

  // calls updateSettings from implementing driver every time a setting is changed.

  _createClass(DeviceSettings, [{
    key: 'update',
    value: function update(newSettings) {
      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, prop;

      return _regeneratorRuntime.async(function update$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (_lodash2['default'].isObject(newSettings)) {
              context$2$0.next = 2;
              break;
            }

            throw new Error('Settings update should be called with valid JSON');

          case 2:
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            context$2$0.prev = 5;
            _iterator = _getIterator(_lodash2['default'].keys(newSettings));

          case 7:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              context$2$0.next = 21;
              break;
            }

            prop = _step.value;

            if (_lodash2['default'].isUndefined(this._settings[prop])) {
              _logger2['default'].warn('Didn\'t know about setting \'' + prop + '\'. Are you sure you ' + ('spelled it correctly? Proceeding anyway. Valid settings: ' + _lodash2['default'].keys(this._settings)));
            }

            if (!(this._settings[prop] !== newSettings[prop])) {
              context$2$0.next = 18;
              break;
            }

            if (!this.onSettingsUpdate) {
              context$2$0.next = 17;
              break;
            }

            context$2$0.next = 14;
            return _regeneratorRuntime.awrap(this.onSettingsUpdate(prop, newSettings[prop], this._settings[prop]));

          case 14:
            this._settings[prop] = newSettings[prop];
            context$2$0.next = 18;
            break;

          case 17:
            _logger2['default'].errorAndThrow('Unable to update settings; onSettingsUpdate method not found');

          case 18:
            _iteratorNormalCompletion = true;
            context$2$0.next = 7;
            break;

          case 21:
            context$2$0.next = 27;
            break;

          case 23:
            context$2$0.prev = 23;
            context$2$0.t0 = context$2$0['catch'](5);
            _didIteratorError = true;
            _iteratorError = context$2$0.t0;

          case 27:
            context$2$0.prev = 27;
            context$2$0.prev = 28;

            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }

          case 30:
            context$2$0.prev = 30;

            if (!_didIteratorError) {
              context$2$0.next = 33;
              break;
            }

            throw _iteratorError;

          case 33:
            return context$2$0.finish(30);

          case 34:
            return context$2$0.finish(27);

          case 35:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[5, 23, 27, 35], [28,, 30, 34]]);
    }
  }, {
    key: 'getSettings',
    value: function getSettings() {
      return this._settings;
    }
  }]);

  return DeviceSettings;
})();

exports['default'] = DeviceSettings;
module.exports = exports['default'];

// update setting only when there is updateSettings defined.
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9iYXNlZHJpdmVyL2RldmljZS1zZXR0aW5ncy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7c0JBQWMsUUFBUTs7OztzQkFDTixVQUFVOzs7O0lBRXBCLGNBQWM7QUFFTixXQUZSLGNBQWMsR0FFMEM7UUFBL0MsZUFBZSx5REFBRyxFQUFFO1FBQUUsZ0JBQWdCLHlEQUFHLElBQUk7OzBCQUZ0RCxjQUFjOztBQUdoQixRQUFJLENBQUMsU0FBUyxHQUFHLGVBQWMsRUFBRSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBQ3BELFFBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztHQUMxQzs7OztlQUxHLGNBQWM7O1dBUUwsZ0JBQUMsV0FBVzswRkFJZCxJQUFJOzs7OztnQkFIUixvQkFBRSxRQUFRLENBQUMsV0FBVyxDQUFDOzs7OztrQkFDcEIsSUFBSSxLQUFLLENBQUMsa0RBQWtELENBQUM7Ozs7Ozs7cUNBRXBELG9CQUFFLElBQUksQ0FBQyxXQUFXLENBQUM7Ozs7Ozs7O0FBQTNCLGdCQUFJOztBQUNYLGdCQUFJLG9CQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7QUFDdkMsa0NBQUksSUFBSSxDQUFDLGtDQUE4QixJQUFJLDRGQUMwQixvQkFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFFLENBQUMsQ0FBQzthQUNoRzs7a0JBQ0csSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7Ozs7O2lCQUV4QyxJQUFJLENBQUMsZ0JBQWdCOzs7Ozs7NkNBQ2pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7OztBQUMxRSxnQkFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7O0FBRXpDLGdDQUFJLGFBQWEsQ0FBQyw4REFBOEQsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBSXpGOzs7V0FFVyx1QkFBRztBQUNiLGFBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztLQUN2Qjs7O1NBL0JHLGNBQWM7OztxQkFrQ0wsY0FBYyIsImZpbGUiOiJsaWIvYmFzZWRyaXZlci9kZXZpY2Utc2V0dGluZ3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZ2dlcic7XG5cbmNsYXNzIERldmljZVNldHRpbmdzIHtcblxuICBjb25zdHJ1Y3RvciAoZGVmYXVsdFNldHRpbmdzID0ge30sIG9uU2V0dGluZ3NVcGRhdGUgPSBudWxsKSB7XG4gICAgdGhpcy5fc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0U2V0dGluZ3MpO1xuICAgIHRoaXMub25TZXR0aW5nc1VwZGF0ZSA9IG9uU2V0dGluZ3NVcGRhdGU7XG4gIH1cblxuICAvLyBjYWxscyB1cGRhdGVTZXR0aW5ncyBmcm9tIGltcGxlbWVudGluZyBkcml2ZXIgZXZlcnkgdGltZSBhIHNldHRpbmcgaXMgY2hhbmdlZC5cbiAgYXN5bmMgdXBkYXRlIChuZXdTZXR0aW5ncykge1xuICAgIGlmICghXy5pc09iamVjdChuZXdTZXR0aW5ncykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU2V0dGluZ3MgdXBkYXRlIHNob3VsZCBiZSBjYWxsZWQgd2l0aCB2YWxpZCBKU09OJyk7XG4gICAgfVxuICAgIGZvciAobGV0IHByb3Agb2YgXy5rZXlzKG5ld1NldHRpbmdzKSkge1xuICAgICAgaWYgKF8uaXNVbmRlZmluZWQodGhpcy5fc2V0dGluZ3NbcHJvcF0pKSB7XG4gICAgICAgIGxvZy53YXJuKGBEaWRuJ3Qga25vdyBhYm91dCBzZXR0aW5nICcke3Byb3B9Jy4gQXJlIHlvdSBzdXJlIHlvdSBgICtcbiAgICAgICAgICAgICAgICAgYHNwZWxsZWQgaXQgY29ycmVjdGx5PyBQcm9jZWVkaW5nIGFueXdheS4gVmFsaWQgc2V0dGluZ3M6ICR7Xy5rZXlzKHRoaXMuX3NldHRpbmdzKX1gKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9zZXR0aW5nc1twcm9wXSAhPT0gbmV3U2V0dGluZ3NbcHJvcF0pIHtcbiAgICAgICAgLy8gdXBkYXRlIHNldHRpbmcgb25seSB3aGVuIHRoZXJlIGlzIHVwZGF0ZVNldHRpbmdzIGRlZmluZWQuXG4gICAgICAgIGlmICh0aGlzLm9uU2V0dGluZ3NVcGRhdGUpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLm9uU2V0dGluZ3NVcGRhdGUocHJvcCwgbmV3U2V0dGluZ3NbcHJvcF0sIHRoaXMuX3NldHRpbmdzW3Byb3BdKTtcbiAgICAgICAgICB0aGlzLl9zZXR0aW5nc1twcm9wXSA9IG5ld1NldHRpbmdzW3Byb3BdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvZy5lcnJvckFuZFRocm93KCdVbmFibGUgdG8gdXBkYXRlIHNldHRpbmdzOyBvblNldHRpbmdzVXBkYXRlIG1ldGhvZCBub3QgZm91bmQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldFNldHRpbmdzICgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3M7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGV2aWNlU2V0dGluZ3M7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uIn0=
