'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function getRetries(name, value, defaultValue) {
  var retries = defaultValue;
  if (value) {
    retries = Math.round(value / 1000);
    if (_lodash2['default'].isNaN(retries)) {
      _logger2['default'].warn(name + ' timeout of ' + value + 'ms specified, but unable to parse interval. Using default.');
      retries = defaultValue;
    }
  }
  return retries;
}

exports.getRetries = getRetries;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztzQkFBYyxRQUFROzs7O3NCQUNILFVBQVU7Ozs7QUFHN0IsU0FBUyxVQUFVLENBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUU7QUFDOUMsTUFBSSxPQUFPLEdBQUcsWUFBWSxDQUFDO0FBQzNCLE1BQUksS0FBSyxFQUFFO0FBQ1QsV0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ25DLFFBQUksb0JBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO0FBQ3BCLDBCQUFPLElBQUksQ0FBSSxJQUFJLG9CQUFlLEtBQUssZ0VBQTZELENBQUM7QUFDckcsYUFBTyxHQUFHLFlBQVksQ0FBQztLQUN4QjtHQUNGO0FBQ0QsU0FBTyxPQUFPLENBQUM7Q0FDaEI7O1FBRVEsVUFBVSxHQUFWLFVBQVUiLCJmaWxlIjoibGliL3V0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBsb2dnZXIgZnJvbSAnLi9sb2dnZXInO1xuXG5cbmZ1bmN0aW9uIGdldFJldHJpZXMgKG5hbWUsIHZhbHVlLCBkZWZhdWx0VmFsdWUpIHtcbiAgbGV0IHJldHJpZXMgPSBkZWZhdWx0VmFsdWU7XG4gIGlmICh2YWx1ZSkge1xuICAgIHJldHJpZXMgPSBNYXRoLnJvdW5kKHZhbHVlIC8gMTAwMCk7XG4gICAgaWYgKF8uaXNOYU4ocmV0cmllcykpIHtcbiAgICAgIGxvZ2dlci53YXJuKGAke25hbWV9IHRpbWVvdXQgb2YgJHt2YWx1ZX1tcyBzcGVjaWZpZWQsIGJ1dCB1bmFibGUgdG8gcGFyc2UgaW50ZXJ2YWwuIFVzaW5nIGRlZmF1bHQuYCk7XG4gICAgICByZXRyaWVzID0gZGVmYXVsdFZhbHVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmV0cmllcztcbn1cblxuZXhwb3J0IHsgZ2V0UmV0cmllcyB9O1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9
