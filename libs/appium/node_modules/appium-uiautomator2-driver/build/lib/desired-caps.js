'use strict';

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _appiumAndroidDriver = require('appium-android-driver');

var uiautomatorCapConstraints = {
  app: {
    presence: true,
    isString: true
  },
  automationName: {
    isString: true
  },
  browserName: {
    isString: true
  },
  launchTimeout: {
    isNumber: true
  },
  skipUnlock: {
    isBoolean: true
  },
  uiautomator2ServerLaunchTimeout: {
    isNumber: true
  },
  uiautomator2ServerInstallTimeout: {
    isNumber: true
  },
  disableWindowAnimation: {
    isBoolean: true
  },
  systemPort: {
    isNumber: true
  }
};

var desiredCapConstraints = {};
_Object$assign(desiredCapConstraints, uiautomatorCapConstraints, _appiumAndroidDriver.commonCapConstraints);

exports['default'] = desiredCapConstraints;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9kZXNpcmVkLWNhcHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7bUNBQXFDLHVCQUF1Qjs7QUFFNUQsSUFBSSx5QkFBeUIsR0FBRztBQUM5QixLQUFHLEVBQUU7QUFDSCxZQUFRLEVBQUUsSUFBSTtBQUNkLFlBQVEsRUFBRSxJQUFJO0dBQ2Y7QUFDRCxnQkFBYyxFQUFFO0FBQ2QsWUFBUSxFQUFFLElBQUk7R0FDZjtBQUNELGFBQVcsRUFBRTtBQUNYLFlBQVEsRUFBRSxJQUFJO0dBQ2Y7QUFDRCxlQUFhLEVBQUU7QUFDYixZQUFRLEVBQUUsSUFBSTtHQUNmO0FBQ0QsWUFBVSxFQUFFO0FBQ1YsYUFBUyxFQUFFLElBQUk7R0FDaEI7QUFDRCxpQ0FBK0IsRUFBRTtBQUMvQixZQUFRLEVBQUUsSUFBSTtHQUNmO0FBQ0Qsa0NBQWdDLEVBQUU7QUFDaEMsWUFBUSxFQUFFLElBQUk7R0FDZjtBQUNELHdCQUFzQixFQUFFO0FBQ3RCLGFBQVMsRUFBRSxJQUFJO0dBQ2hCO0FBQ0QsWUFBVSxFQUFFO0FBQ1YsWUFBUSxFQUFFLElBQUk7R0FDZjtDQUNGLENBQUM7O0FBRUYsSUFBSSxxQkFBcUIsR0FBRyxFQUFFLENBQUM7QUFDL0IsZUFBYyxxQkFBcUIsRUFBRSx5QkFBeUIsNENBQzNCLENBQUM7O3FCQUVyQixxQkFBcUIiLCJmaWxlIjoibGliL2Rlc2lyZWQtY2Fwcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbW1vbkNhcENvbnN0cmFpbnRzIH0gZnJvbSAnYXBwaXVtLWFuZHJvaWQtZHJpdmVyJztcblxubGV0IHVpYXV0b21hdG9yQ2FwQ29uc3RyYWludHMgPSB7XG4gIGFwcDoge1xuICAgIHByZXNlbmNlOiB0cnVlLFxuICAgIGlzU3RyaW5nOiB0cnVlLFxuICB9LFxuICBhdXRvbWF0aW9uTmFtZToge1xuICAgIGlzU3RyaW5nOiB0cnVlLFxuICB9LFxuICBicm93c2VyTmFtZToge1xuICAgIGlzU3RyaW5nOiB0cnVlXG4gIH0sXG4gIGxhdW5jaFRpbWVvdXQ6IHtcbiAgICBpc051bWJlcjogdHJ1ZVxuICB9LFxuICBza2lwVW5sb2NrOiB7XG4gICAgaXNCb29sZWFuOiB0cnVlXG4gIH0sXG4gIHVpYXV0b21hdG9yMlNlcnZlckxhdW5jaFRpbWVvdXQ6IHtcbiAgICBpc051bWJlcjogdHJ1ZVxuICB9LFxuICB1aWF1dG9tYXRvcjJTZXJ2ZXJJbnN0YWxsVGltZW91dDoge1xuICAgIGlzTnVtYmVyOiB0cnVlXG4gIH0sXG4gIGRpc2FibGVXaW5kb3dBbmltYXRpb246IHtcbiAgICBpc0Jvb2xlYW46IHRydWVcbiAgfSxcbiAgc3lzdGVtUG9ydDoge1xuICAgIGlzTnVtYmVyOiB0cnVlXG4gIH0sXG59O1xuXG5sZXQgZGVzaXJlZENhcENvbnN0cmFpbnRzID0ge307XG5PYmplY3QuYXNzaWduKGRlc2lyZWRDYXBDb25zdHJhaW50cywgdWlhdXRvbWF0b3JDYXBDb25zdHJhaW50cyxcbiAgICAgICAgICAgICAgY29tbW9uQ2FwQ29uc3RyYWludHMpO1xuXG5leHBvcnQgZGVmYXVsdCBkZXNpcmVkQ2FwQ29uc3RyYWludHM7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uIn0=
