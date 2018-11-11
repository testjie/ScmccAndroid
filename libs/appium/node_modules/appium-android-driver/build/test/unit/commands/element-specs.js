'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _appiumAndroidBootstrap = require('appium-android-bootstrap');

var _appiumAndroidBootstrap2 = _interopRequireDefault(_appiumAndroidBootstrap);

var _ = require('../../..');

var _2 = _interopRequireDefault(_);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var _libAndroidHelpers = require('../../../lib/android-helpers');

var _libAndroidHelpers2 = _interopRequireDefault(_libAndroidHelpers);

var driver = undefined;
var sandbox = _sinon2['default'].sandbox.create();
_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('Element', function () {
  beforeEach(function () {
    driver = new _2['default']();
    driver.adb = new _appiumAdb2['default']();
    driver.bootstrap = new _appiumAndroidBootstrap2['default']();
    sandbox.stub(driver.bootstrap, 'sendAction');
    sandbox.stub(_libAndroidHelpers2['default'], 'removeNullProperties');
    driver.opts = { unicodeKeyboard: true };
  });
  afterEach(function () {
    sandbox.restore();
  });
  describe('getAttribute', function () {
    it('should get element attribute', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.bootstrap.sendAction.withArgs('element:getAttribute').returns('attr_value');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getAttribute('attr', 'el1').should.become('attr_value'));

          case 3:
            driver.bootstrap.sendAction.calledWithExactly('element:getAttribute', { attribute: 'attr', elementId: 'el1' }).should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('getName', function () {
    it('should get element name', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getAttribute');
            driver.getAttribute.returns('el_name');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.getName('el1').should.become('el_name'));

          case 4:
            driver.getAttribute.calledWithExactly('className', 'el1').should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('elementDisplayed', function () {
    it('should return true if element displayed', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getAttribute');
            driver.getAttribute.returns('true');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.elementDisplayed('el1').should.become(true));

          case 4:
            driver.getAttribute.calledWithExactly('displayed', 'el1').should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should return false if element not displayed', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getAttribute');
            driver.getAttribute.returns('false');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.elementDisplayed('el1').should.become(false));

          case 4:
            driver.getAttribute.calledWithExactly('displayed', 'el1').should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('elementEnabled', function () {
    it('should return true if element enabled', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getAttribute');
            driver.getAttribute.returns('true');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.elementEnabled('el1').should.become(true));

          case 4:
            driver.getAttribute.calledWithExactly('enabled', 'el1').should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should return false if element not enabled', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getAttribute');
            driver.getAttribute.returns('false');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.elementEnabled('el1').should.become(false));

          case 4:
            driver.getAttribute.calledWithExactly('enabled', 'el1').should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('elementSelected', function () {
    it('should return true if element selected', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getAttribute');
            driver.getAttribute.returns('true');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.elementSelected('el1').should.become(true));

          case 4:
            driver.getAttribute.calledWithExactly('selected', 'el1').should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should return false if element not selected', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getAttribute');
            driver.getAttribute.returns('false');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.elementSelected('el1').should.become(false));

          case 4:
            driver.getAttribute.calledWithExactly('selected', 'el1').should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('setElementValue', function () {
    var params = { elementId: 'el0', text: 'text to set', replace: true,
      unicodeKeyboard: true };
    it('should call doSetElementValue', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'doSetElementValue');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.setElementValue('text to set', 'el0', true));

          case 3:
            driver.doSetElementValue.calledWithExactly(params).should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should join keys parameter if keys is instance of Array', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'doSetElementValue');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.setElementValue(['t', 'ext', ' to ', 'se', 't'], 'el0', true));

          case 3:
            driver.doSetElementValue.calledWithExactly(params).should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should set replace to false by default', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            params.replace = false;
            sandbox.stub(driver, 'doSetElementValue');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.setElementValue(['t', 'ext', ' to ', 'se', 't'], 'el0'));

          case 4:
            driver.doSetElementValue.calledWithExactly(params).should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('doSetElementValue', function () {
    it('should call setText to set element value', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.doSetElementValue('params'));

          case 2:
            driver.bootstrap.sendAction.calledWithExactly('element:setText', 'params').should.be['true'];

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('setValue', function () {
    it('should call setElementValue to set value', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'setElementValue');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.setValue('keys', 'el1'));

          case 3:
            driver.setElementValue.calledWithExactly('keys', 'el1', false).should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('replaceValue', function () {
    it('should call setElementValue to replace value', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'setElementValue');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.replaceValue('keys', 'el1'));

          case 3:
            driver.setElementValue.calledWithExactly('keys', 'el1', true).should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('setValueImmediate', function () {
    it('should set value via adb inputText command', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'click');
            sandbox.stub(driver.adb, 'inputText');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.setValueImmediate('keys', 'el1'));

          case 4:
            driver.click.calledWithExactly('el1').should.be['true'];
            driver.adb.inputText.calledWithExactly('keys').should.be['true'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should join keys parameter if keys is instance of Array', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'click');
            sandbox.stub(driver.adb, 'inputText');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.setValueImmediate(['k', 'ey', 's'], 'el1'));

          case 4:
            driver.adb.inputText.calledWithExactly('keys').should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('getText', function () {
    it('should get element text', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.bootstrap.sendAction.withArgs('element:getText').returns('el_text');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getText('el1').should.become('el_text'));

          case 3:
            driver.bootstrap.sendAction.calledWithExactly('element:getText', { elementId: 'el1' }).should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('clear', function () {
    it('should clear text of an element', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getText');
            sandbox.stub(driver, 'click');
            sandbox.stub(driver.adb, 'clearTextField');
            driver.getText.withArgs('el1').returns('#'.repeat(110));
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(driver.clear('el1'));

          case 6:
            driver.getText.calledWithExactly('el1').should.be['true'];
            driver.click.calledWithExactly('el1').should.be['true'];
            driver.adb.clearTextField.getCall(0).args[0].should.be.equal(50);
            driver.adb.clearTextField.getCall(1).args[0].should.be.equal(50);
            driver.adb.clearTextField.getCall(2).args[0].should.be.equal(10);

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should do five retries and then fail if clearTextField throws error', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            this.timeout(10000);

            sandbox.stub(driver, 'getText');
            sandbox.stub(driver, 'click');
            sandbox.stub(driver.adb, 'clearTextField');
            driver.adb.clearTextField.throws();
            driver.getText.withArgs('el1').returns('#'.repeat(1));
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(driver.clear('el1').should.be.rejected);

          case 8:
            driver.adb.clearTextField.alwaysCalledWith(1).should.be['true'];
            driver.adb.clearTextField.callCount.should.be.equal(5);

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('it should assume that the text have 100 chars if getText returns empty string', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getText');
            sandbox.stub(driver, 'click');
            sandbox.stub(driver.adb, 'clearTextField');
            driver.getText.withArgs('el1').returns('');
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(driver.clear('el1'));

          case 6:
            driver.adb.clearTextField.getCall(0).args[0].should.be.equal(50);
            driver.adb.clearTextField.getCall(1).args[0].should.be.equal(50);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('click', function () {
    it('should click an element', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.click('el1'));

          case 2:
            driver.bootstrap.sendAction.calledWithExactly('element:click', { elementId: 'el1' }).should.be['true'];

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('getLocation', function () {
    it('should get location of an element', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.bootstrap.sendAction.withArgs('element:getLocation').returns('loc_info');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getLocation('el1').should.become('loc_info'));

          case 3:
            driver.bootstrap.sendAction.calledWithExactly('element:getLocation', { elementId: 'el1' }).should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('getLocationInView', function () {
    it('should get location of an element', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'getLocation');
            driver.getLocation.returns('loc_info');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.getLocationInView('el1').should.become('loc_info'));

          case 4:
            driver.getLocation.calledWithExactly('el1').should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('getSize', function () {
    it('should get size of an element', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.bootstrap.sendAction.withArgs('element:getSize').returns('size_info');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getSize('el1').should.become('size_info'));

          case 3:
            driver.bootstrap.sendAction.calledWithExactly('element:getSize', { elementId: 'el1' }).should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('getElementRect', function () {
    it('should get rect of an element', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.bootstrap.sendAction.withArgs('element:getRect').returns('rect_info');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getElementRect('el1').should.become('rect_info'));

          case 3:
            driver.bootstrap.sendAction.calledWithExactly('element:getRect', { elementId: 'el1' }).should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('touchLongClick', function () {
    it('should do touch long click on element', function callee$2$0() {
      var params;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            params = { elementId: 'el1', x: 12, y: 34, duration: 5 };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.touchLongClick('el1', 12, 34, 5));

          case 3:
            _libAndroidHelpers2['default'].removeNullProperties.calledWithExactly(params).should.be['true'];
            driver.bootstrap.sendAction.calledWithExactly('element:touchLongClick', params).should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('touchDown', function () {
    it('should do touch down on element', function callee$2$0() {
      var params;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            params = { elementId: 'el1', x: 12, y: 34 };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.touchDown('el1', 12, 34));

          case 3:
            _libAndroidHelpers2['default'].removeNullProperties.calledWithExactly(params).should.be['true'];
            driver.bootstrap.sendAction.calledWithExactly('element:touchDown', params).should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('touchUp', function () {
    it('should do touch up on element', function callee$2$0() {
      var params;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            params = { elementId: 'el1', x: 12, y: 34 };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.touchUp('el1', 12, 34));

          case 3:
            _libAndroidHelpers2['default'].removeNullProperties.calledWithExactly(params).should.be['true'];
            driver.bootstrap.sendAction.calledWithExactly('element:touchUp', params).should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('touchMove', function () {
    it('should get element attribute', function callee$2$0() {
      var params;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            params = { elementId: 'el1', x: 12, y: 34 };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.touchMove('el1', 12, 34));

          case 3:
            _libAndroidHelpers2['default'].removeNullProperties.calledWithExactly(params).should.be['true'];
            driver.bootstrap.sendAction.calledWithExactly('element:touchMove', params).should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('complexTap', function () {
    it('should tap an element', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.complexTap(null, null, null, 12, 34));

          case 2:
            driver.bootstrap.sendAction.calledWithExactly('click', { x: 12, y: 34 }).should.be['true'];

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('tap', function () {
    it('shoulde tap an element', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.tap('el1', 12, 34, 3));

          case 2:
            driver.bootstrap.sendAction.alwaysCalledWith('element:click', { elementId: 'el1', x: 12, y: 34 }).should.be['true'];
            driver.bootstrap.sendAction.calledThrice.should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should tap without an element', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.tap(null, 12, 34, 3));

          case 2:
            driver.bootstrap.sendAction.alwaysCalledWith('click', { x: 12, y: 34 }).should.be['true'];
            driver.bootstrap.sendAction.calledThrice.should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should perform single tap on element if x, y and count are not passed', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.tap('el1'));

          case 2:
            driver.bootstrap.sendAction.alwaysCalledWith('element:click').should.be['true'];
            driver.bootstrap.sendAction.calledOnce.should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9jb21tYW5kcy9lbGVtZW50LXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7cUJBQzNCLE9BQU87Ozs7c0NBQ0gsMEJBQTBCOzs7O2dCQUN0QixVQUFVOzs7O3lCQUNwQixZQUFZOzs7O2lDQUNELDhCQUE4Qjs7OztBQUV6RCxJQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsSUFBSSxPQUFPLEdBQUcsbUJBQU0sT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3JDLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsUUFBUSxDQUFDLFNBQVMsRUFBRSxZQUFZO0FBQzlCLFlBQVUsQ0FBQyxZQUFZO0FBQ3JCLFVBQU0sR0FBRyxtQkFBbUIsQ0FBQztBQUM3QixVQUFNLENBQUMsR0FBRyxHQUFHLDRCQUFTLENBQUM7QUFDdkIsVUFBTSxDQUFDLFNBQVMsR0FBRyx5Q0FBZSxDQUFDO0FBQ25DLFdBQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUM3QyxXQUFPLENBQUMsSUFBSSxpQ0FBaUIsc0JBQXNCLENBQUMsQ0FBQztBQUNyRCxVQUFNLENBQUMsSUFBSSxHQUFHLEVBQUMsZUFBZSxFQUFFLElBQUksRUFBQyxDQUFDO0dBQ3ZDLENBQUMsQ0FBQztBQUNILFdBQVMsQ0FBQyxZQUFZO0FBQ3BCLFdBQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztHQUNuQixDQUFDLENBQUM7QUFDSCxVQUFRLENBQUMsY0FBYyxFQUFFLFlBQVk7QUFDbkMsTUFBRSxDQUFDLDhCQUE4QixFQUFFOzs7O0FBQ2pDLGtCQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7OzZDQUM3RSxNQUFNLENBQUMs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QUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQUssQ0FBQztBQUM3RSxrQkFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQUssQ0FBQzs7Ozs7OztLQUN2RCxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC91bml0L2NvbW1hbmRzL2VsZW1lbnQtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCBzaW5vbiBmcm9tICdzaW5vbic7XG5pbXBvcnQgQm9vdHN0cmFwIGZyb20gJ2FwcGl1bS1hbmRyb2lkLWJvb3RzdHJhcCc7XG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLi8uLic7XG5pbXBvcnQgQURCIGZyb20gJ2FwcGl1bS1hZGInO1xuaW1wb3J0IGFuZHJvaWRIZWxwZXJzIGZyb20gJy4uLy4uLy4uL2xpYi9hbmRyb2lkLWhlbHBlcnMnO1xuXG5sZXQgZHJpdmVyO1xubGV0IHNhbmRib3ggPSBzaW5vbi5zYW5kYm94LmNyZWF0ZSgpO1xuY2hhaS5zaG91bGQoKTtcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcblxuZGVzY3JpYmUoJ0VsZW1lbnQnLCBmdW5jdGlvbiAoKSB7XG4gIGJlZm9yZUVhY2goZnVuY3Rpb24gKCkge1xuICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gICAgZHJpdmVyLmFkYiA9IG5ldyBBREIoKTtcbiAgICBkcml2ZXIuYm9vdHN0cmFwID0gbmV3IEJvb3RzdHJhcCgpO1xuICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYm9vdHN0cmFwLCAnc2VuZEFjdGlvbicpO1xuICAgIHNhbmRib3guc3R1YihhbmRyb2lkSGVscGVycywgJ3JlbW92ZU51bGxQcm9wZXJ0aWVzJyk7XG4gICAgZHJpdmVyLm9wdHMgPSB7dW5pY29kZUtleWJvYXJkOiB0cnVlfTtcbiAgfSk7XG4gIGFmdGVyRWFjaChmdW5jdGlvbiAoKSB7XG4gICAgc2FuZGJveC5yZXN0b3JlKCk7XG4gIH0pO1xuICBkZXNjcmliZSgnZ2V0QXR0cmlidXRlJywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdzaG91bGQgZ2V0IGVsZW1lbnQgYXR0cmlidXRlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgZHJpdmVyLmJvb3RzdHJhcC5zZW5kQWN0aW9uLndpdGhBcmdzKCdlbGVtZW50OmdldEF0dHJpYnV0ZScpLnJldHVybnMoJ2F0dHJfdmFsdWUnKTtcbiAgICAgIGF3YWl0IGRyaXZlci5nZXRBdHRyaWJ1dGUoJ2F0dHInLCAnZWwxJykuc2hvdWxkLmJlY29tZSgnYXR0cl92YWx1ZScpO1xuICAgICAgZHJpdmVyLmJvb3RzdHJhcC5zZW5kQWN0aW9uXG4gICAgICAgIC5jYWxsZWRXaXRoRXhhY3RseSgnZWxlbWVudDpnZXRBdHRyaWJ1dGUnLCB7YXR0cmlidXRlOiAnYXR0cicsIGVsZW1lbnRJZDogJ2VsMSd9KVxuICAgICAgICAuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgnZ2V0TmFtZScsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIGdldCBlbGVtZW50IG5hbWUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnZ2V0QXR0cmlidXRlJyk7XG4gICAgICBkcml2ZXIuZ2V0QXR0cmlidXRlLnJldHVybnMoJ2VsX25hbWUnKTtcbiAgICAgIGF3YWl0IGRyaXZlci5nZXROYW1lKCdlbDEnKS5zaG91bGQuYmVjb21lKCdlbF9uYW1lJyk7XG4gICAgICBkcml2ZXIuZ2V0QXR0cmlidXRlLmNhbGxlZFdpdGhFeGFjdGx5KCdjbGFzc05hbWUnLCAnZWwxJykuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgnZWxlbWVudERpc3BsYXllZCcsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIGVsZW1lbnQgZGlzcGxheWVkJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2dldEF0dHJpYnV0ZScpO1xuICAgICAgZHJpdmVyLmdldEF0dHJpYnV0ZS5yZXR1cm5zKCd0cnVlJyk7XG4gICAgICBhd2FpdCBkcml2ZXIuZWxlbWVudERpc3BsYXllZCgnZWwxJykuc2hvdWxkLmJlY29tZSh0cnVlKTtcbiAgICAgIGRyaXZlci5nZXRBdHRyaWJ1dGUuY2FsbGVkV2l0aEV4YWN0bHkoJ2Rpc3BsYXllZCcsICdlbDEnKS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiBlbGVtZW50IG5vdCBkaXNwbGF5ZWQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnZ2V0QXR0cmlidXRlJyk7XG4gICAgICBkcml2ZXIuZ2V0QXR0cmlidXRlLnJldHVybnMoJ2ZhbHNlJyk7XG4gICAgICBhd2FpdCBkcml2ZXIuZWxlbWVudERpc3BsYXllZCgnZWwxJykuc2hvdWxkLmJlY29tZShmYWxzZSk7XG4gICAgICBkcml2ZXIuZ2V0QXR0cmlidXRlLmNhbGxlZFdpdGhFeGFjdGx5KCdkaXNwbGF5ZWQnLCAnZWwxJykuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgnZWxlbWVudEVuYWJsZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiBlbGVtZW50IGVuYWJsZWQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnZ2V0QXR0cmlidXRlJyk7XG4gICAgICBkcml2ZXIuZ2V0QXR0cmlidXRlLnJldHVybnMoJ3RydWUnKTtcbiAgICAgIGF3YWl0IGRyaXZlci5lbGVtZW50RW5hYmxlZCgnZWwxJykuc2hvdWxkLmJlY29tZSh0cnVlKTtcbiAgICAgIGRyaXZlci5nZXRBdHRyaWJ1dGUuY2FsbGVkV2l0aEV4YWN0bHkoJ2VuYWJsZWQnLCAnZWwxJykuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgZWxlbWVudCBub3QgZW5hYmxlZCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdnZXRBdHRyaWJ1dGUnKTtcbiAgICAgIGRyaXZlci5nZXRBdHRyaWJ1dGUucmV0dXJucygnZmFsc2UnKTtcbiAgICAgIGF3YWl0IGRyaXZlci5lbGVtZW50RW5hYmxlZCgnZWwxJykuc2hvdWxkLmJlY29tZShmYWxzZSk7XG4gICAgICBkcml2ZXIuZ2V0QXR0cmlidXRlLmNhbGxlZFdpdGhFeGFjdGx5KCdlbmFibGVkJywgJ2VsMScpLnNob3VsZC5iZS50cnVlO1xuICAgIH0pO1xuICB9KTtcbiAgZGVzY3JpYmUoJ2VsZW1lbnRTZWxlY3RlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIGVsZW1lbnQgc2VsZWN0ZWQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnZ2V0QXR0cmlidXRlJyk7XG4gICAgICBkcml2ZXIuZ2V0QXR0cmlidXRlLnJldHVybnMoJ3RydWUnKTtcbiAgICAgIGF3YWl0IGRyaXZlci5lbGVtZW50U2VsZWN0ZWQoJ2VsMScpLnNob3VsZC5iZWNvbWUodHJ1ZSk7XG4gICAgICBkcml2ZXIuZ2V0QXR0cmlidXRlLmNhbGxlZFdpdGhFeGFjdGx5KCdzZWxlY3RlZCcsICdlbDEnKS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiBlbGVtZW50IG5vdCBzZWxlY3RlZCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdnZXRBdHRyaWJ1dGUnKTtcbiAgICAgIGRyaXZlci5nZXRBdHRyaWJ1dGUucmV0dXJucygnZmFsc2UnKTtcbiAgICAgIGF3YWl0IGRyaXZlci5lbGVtZW50U2VsZWN0ZWQoJ2VsMScpLnNob3VsZC5iZWNvbWUoZmFsc2UpO1xuICAgICAgZHJpdmVyLmdldEF0dHJpYnV0ZS5jYWxsZWRXaXRoRXhhY3RseSgnc2VsZWN0ZWQnLCAnZWwxJykuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgnc2V0RWxlbWVudFZhbHVlJywgZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHtlbGVtZW50SWQ6ICdlbDAnLCB0ZXh0OiAndGV4dCB0byBzZXQnLCAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIHVuaWNvZGVLZXlib2FyZDogdHJ1ZX07XG4gICAgaXQoJ3Nob3VsZCBjYWxsIGRvU2V0RWxlbWVudFZhbHVlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2RvU2V0RWxlbWVudFZhbHVlJyk7XG4gICAgICBhd2FpdCBkcml2ZXIuc2V0RWxlbWVudFZhbHVlKCd0ZXh0IHRvIHNldCcsICdlbDAnLCB0cnVlKTtcbiAgICAgIGRyaXZlci5kb1NldEVsZW1lbnRWYWx1ZS5jYWxsZWRXaXRoRXhhY3RseShwYXJhbXMpLnNob3VsZC5iZS50cnVlO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgam9pbiBrZXlzIHBhcmFtZXRlciBpZiBrZXlzIGlzIGluc3RhbmNlIG9mIEFycmF5JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2RvU2V0RWxlbWVudFZhbHVlJyk7XG4gICAgICBhd2FpdCBkcml2ZXIuc2V0RWxlbWVudFZhbHVlKFsndCcsICdleHQnLCAnIHRvICcsICdzZScsICd0J10sICdlbDAnLCB0cnVlKTtcbiAgICAgIGRyaXZlci5kb1NldEVsZW1lbnRWYWx1ZS5jYWxsZWRXaXRoRXhhY3RseShwYXJhbXMpLnNob3VsZC5iZS50cnVlO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgc2V0IHJlcGxhY2UgdG8gZmFsc2UgYnkgZGVmYXVsdCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIHBhcmFtcy5yZXBsYWNlID0gZmFsc2U7XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnZG9TZXRFbGVtZW50VmFsdWUnKTtcbiAgICAgIGF3YWl0IGRyaXZlci5zZXRFbGVtZW50VmFsdWUoWyd0JywgJ2V4dCcsICcgdG8gJywgJ3NlJywgJ3QnXSwgJ2VsMCcpO1xuICAgICAgZHJpdmVyLmRvU2V0RWxlbWVudFZhbHVlLmNhbGxlZFdpdGhFeGFjdGx5KHBhcmFtcykuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgnZG9TZXRFbGVtZW50VmFsdWUnLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ3Nob3VsZCBjYWxsIHNldFRleHQgdG8gc2V0IGVsZW1lbnQgdmFsdWUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBhd2FpdCBkcml2ZXIuZG9TZXRFbGVtZW50VmFsdWUoJ3BhcmFtcycpO1xuICAgICAgZHJpdmVyLmJvb3RzdHJhcC5zZW5kQWN0aW9uLmNhbGxlZFdpdGhFeGFjdGx5KCdlbGVtZW50OnNldFRleHQnLFxuICAgICAgICAncGFyYW1zJykuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgnc2V0VmFsdWUnLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ3Nob3VsZCBjYWxsIHNldEVsZW1lbnRWYWx1ZSB0byBzZXQgdmFsdWUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnc2V0RWxlbWVudFZhbHVlJyk7XG4gICAgICBhd2FpdCBkcml2ZXIuc2V0VmFsdWUoJ2tleXMnLCAnZWwxJyk7XG4gICAgICBkcml2ZXIuc2V0RWxlbWVudFZhbHVlLmNhbGxlZFdpdGhFeGFjdGx5KCdrZXlzJywgJ2VsMScsIGZhbHNlKS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdyZXBsYWNlVmFsdWUnLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ3Nob3VsZCBjYWxsIHNldEVsZW1lbnRWYWx1ZSB0byByZXBsYWNlIHZhbHVlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ3NldEVsZW1lbnRWYWx1ZScpO1xuICAgICAgYXdhaXQgZHJpdmVyLnJlcGxhY2VWYWx1ZSgna2V5cycsICdlbDEnKTtcbiAgICAgIGRyaXZlci5zZXRFbGVtZW50VmFsdWUuY2FsbGVkV2l0aEV4YWN0bHkoJ2tleXMnLCAnZWwxJywgdHJ1ZSkuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgnc2V0VmFsdWVJbW1lZGlhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ3Nob3VsZCBzZXQgdmFsdWUgdmlhIGFkYiBpbnB1dFRleHQgY29tbWFuZCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdjbGljaycpO1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdpbnB1dFRleHQnKTtcbiAgICAgIGF3YWl0IGRyaXZlci5zZXRWYWx1ZUltbWVkaWF0ZSgna2V5cycsICdlbDEnKTtcbiAgICAgIGRyaXZlci5jbGljay5jYWxsZWRXaXRoRXhhY3RseSgnZWwxJykuc2hvdWxkLmJlLnRydWU7XG4gICAgICBkcml2ZXIuYWRiLmlucHV0VGV4dC5jYWxsZWRXaXRoRXhhY3RseSgna2V5cycpLnNob3VsZC5iZS50cnVlO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgam9pbiBrZXlzIHBhcmFtZXRlciBpZiBrZXlzIGlzIGluc3RhbmNlIG9mIEFycmF5JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2NsaWNrJyk7XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ2lucHV0VGV4dCcpO1xuICAgICAgYXdhaXQgZHJpdmVyLnNldFZhbHVlSW1tZWRpYXRlKFsnaycsICdleScsICdzJ10sICdlbDEnKTtcbiAgICAgIGRyaXZlci5hZGIuaW5wdXRUZXh0LmNhbGxlZFdpdGhFeGFjdGx5KCdrZXlzJykuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgnZ2V0VGV4dCcsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIGdldCBlbGVtZW50IHRleHQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnNlbmRBY3Rpb24ud2l0aEFyZ3MoJ2VsZW1lbnQ6Z2V0VGV4dCcpLnJldHVybnMoJ2VsX3RleHQnKTtcbiAgICAgIGF3YWl0IGRyaXZlci5nZXRUZXh0KCdlbDEnKS5zaG91bGQuYmVjb21lKCdlbF90ZXh0Jyk7XG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnNlbmRBY3Rpb25cbiAgICAgICAgLmNhbGxlZFdpdGhFeGFjdGx5KCdlbGVtZW50OmdldFRleHQnLCB7ZWxlbWVudElkOiAnZWwxJ30pXG4gICAgICAgIC5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdjbGVhcicsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIGNsZWFyIHRleHQgb2YgYW4gZWxlbWVudCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdnZXRUZXh0Jyk7XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnY2xpY2snKTtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAnY2xlYXJUZXh0RmllbGQnKTtcbiAgICAgIGRyaXZlci5nZXRUZXh0LndpdGhBcmdzKCdlbDEnKS5yZXR1cm5zKCcjJy5yZXBlYXQoMTEwKSk7XG4gICAgICBhd2FpdCBkcml2ZXIuY2xlYXIoJ2VsMScpO1xuICAgICAgZHJpdmVyLmdldFRleHQuY2FsbGVkV2l0aEV4YWN0bHkoJ2VsMScpLnNob3VsZC5iZS50cnVlO1xuICAgICAgZHJpdmVyLmNsaWNrLmNhbGxlZFdpdGhFeGFjdGx5KCdlbDEnKS5zaG91bGQuYmUudHJ1ZTtcbiAgICAgIGRyaXZlci5hZGIuY2xlYXJUZXh0RmllbGQuZ2V0Q2FsbCgwKS5hcmdzWzBdLnNob3VsZC5iZS5lcXVhbCg1MCk7XG4gICAgICBkcml2ZXIuYWRiLmNsZWFyVGV4dEZpZWxkLmdldENhbGwoMSkuYXJnc1swXS5zaG91bGQuYmUuZXF1YWwoNTApO1xuICAgICAgZHJpdmVyLmFkYi5jbGVhclRleHRGaWVsZC5nZXRDYWxsKDIpLmFyZ3NbMF0uc2hvdWxkLmJlLmVxdWFsKDEwKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGRvIGZpdmUgcmV0cmllcyBhbmQgdGhlbiBmYWlsIGlmIGNsZWFyVGV4dEZpZWxkIHRocm93cyBlcnJvcicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMudGltZW91dCgxMDAwMCk7XG5cbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdnZXRUZXh0Jyk7XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnY2xpY2snKTtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAnY2xlYXJUZXh0RmllbGQnKTtcbiAgICAgIGRyaXZlci5hZGIuY2xlYXJUZXh0RmllbGQudGhyb3dzKCk7XG4gICAgICBkcml2ZXIuZ2V0VGV4dC53aXRoQXJncygnZWwxJykucmV0dXJucygnIycucmVwZWF0KDEpKTtcbiAgICAgIGF3YWl0IGRyaXZlci5jbGVhcignZWwxJykuc2hvdWxkLmJlLnJlamVjdGVkO1xuICAgICAgZHJpdmVyLmFkYi5jbGVhclRleHRGaWVsZC5hbHdheXNDYWxsZWRXaXRoKDEpLnNob3VsZC5iZS50cnVlO1xuICAgICAgZHJpdmVyLmFkYi5jbGVhclRleHRGaWVsZC5jYWxsQ291bnQuc2hvdWxkLmJlLmVxdWFsKDUpO1xuICAgIH0pO1xuICAgIGl0KCdpdCBzaG91bGQgYXNzdW1lIHRoYXQgdGhlIHRleHQgaGF2ZSAxMDAgY2hhcnMgaWYgZ2V0VGV4dCByZXR1cm5zIGVtcHR5IHN0cmluZycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdnZXRUZXh0Jyk7XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnY2xpY2snKTtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAnY2xlYXJUZXh0RmllbGQnKTtcbiAgICAgIGRyaXZlci5nZXRUZXh0LndpdGhBcmdzKCdlbDEnKS5yZXR1cm5zKCcnKTtcbiAgICAgIGF3YWl0IGRyaXZlci5jbGVhcignZWwxJyk7XG4gICAgICBkcml2ZXIuYWRiLmNsZWFyVGV4dEZpZWxkLmdldENhbGwoMCkuYXJnc1swXS5zaG91bGQuYmUuZXF1YWwoNTApO1xuICAgICAgZHJpdmVyLmFkYi5jbGVhclRleHRGaWVsZC5nZXRDYWxsKDEpLmFyZ3NbMF0uc2hvdWxkLmJlLmVxdWFsKDUwKTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIGNsaWNrIGFuIGVsZW1lbnQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBhd2FpdCBkcml2ZXIuY2xpY2soJ2VsMScpO1xuICAgICAgZHJpdmVyLmJvb3RzdHJhcC5zZW5kQWN0aW9uLmNhbGxlZFdpdGhFeGFjdGx5KCdlbGVtZW50OmNsaWNrJywge2VsZW1lbnRJZDogJ2VsMSd9KVxuICAgICAgICAuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgnZ2V0TG9jYXRpb24nLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ3Nob3VsZCBnZXQgbG9jYXRpb24gb2YgYW4gZWxlbWVudCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGRyaXZlci5ib290c3RyYXAuc2VuZEFjdGlvblxuICAgICAgICAud2l0aEFyZ3MoJ2VsZW1lbnQ6Z2V0TG9jYXRpb24nKS5yZXR1cm5zKCdsb2NfaW5mbycpO1xuICAgICAgYXdhaXQgZHJpdmVyLmdldExvY2F0aW9uKCdlbDEnKS5zaG91bGQuYmVjb21lKCdsb2NfaW5mbycpO1xuICAgICAgZHJpdmVyLmJvb3RzdHJhcC5zZW5kQWN0aW9uXG4gICAgICAgIC5jYWxsZWRXaXRoRXhhY3RseSgnZWxlbWVudDpnZXRMb2NhdGlvbicsIHtlbGVtZW50SWQ6ICdlbDEnfSlcbiAgICAgICAgLnNob3VsZC5iZS50cnVlO1xuICAgIH0pO1xuICB9KTtcbiAgZGVzY3JpYmUoJ2dldExvY2F0aW9uSW5WaWV3JywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdzaG91bGQgZ2V0IGxvY2F0aW9uIG9mIGFuIGVsZW1lbnQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnZ2V0TG9jYXRpb24nKTtcbiAgICAgIGRyaXZlci5nZXRMb2NhdGlvbi5yZXR1cm5zKCdsb2NfaW5mbycpO1xuICAgICAgYXdhaXQgZHJpdmVyLmdldExvY2F0aW9uSW5WaWV3KCdlbDEnKS5zaG91bGQuYmVjb21lKCdsb2NfaW5mbycpO1xuICAgICAgZHJpdmVyLmdldExvY2F0aW9uLmNhbGxlZFdpdGhFeGFjdGx5KCdlbDEnKS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdnZXRTaXplJywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdzaG91bGQgZ2V0IHNpemUgb2YgYW4gZWxlbWVudCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGRyaXZlci5ib290c3RyYXAuc2VuZEFjdGlvblxuICAgICAgICAud2l0aEFyZ3MoJ2VsZW1lbnQ6Z2V0U2l6ZScpLnJldHVybnMoJ3NpemVfaW5mbycpO1xuICAgICAgYXdhaXQgZHJpdmVyLmdldFNpemUoJ2VsMScpLnNob3VsZC5iZWNvbWUoJ3NpemVfaW5mbycpO1xuICAgICAgZHJpdmVyLmJvb3RzdHJhcC5zZW5kQWN0aW9uXG4gICAgICAgIC5jYWxsZWRXaXRoRXhhY3RseSgnZWxlbWVudDpnZXRTaXplJywge2VsZW1lbnRJZDogJ2VsMSd9KVxuICAgICAgICAuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgnZ2V0RWxlbWVudFJlY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ3Nob3VsZCBnZXQgcmVjdCBvZiBhbiBlbGVtZW50JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgZHJpdmVyLmJvb3RzdHJhcC5zZW5kQWN0aW9uXG4gICAgICAgIC53aXRoQXJncygnZWxlbWVudDpnZXRSZWN0JykucmV0dXJucygncmVjdF9pbmZvJyk7XG4gICAgICBhd2FpdCBkcml2ZXIuZ2V0RWxlbWVudFJlY3QoJ2VsMScpLnNob3VsZC5iZWNvbWUoJ3JlY3RfaW5mbycpO1xuICAgICAgZHJpdmVyLmJvb3RzdHJhcC5zZW5kQWN0aW9uXG4gICAgICAgIC5jYWxsZWRXaXRoRXhhY3RseSgnZWxlbWVudDpnZXRSZWN0Jywge2VsZW1lbnRJZDogJ2VsMSd9KVxuICAgICAgICAuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgndG91Y2hMb25nQ2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ3Nob3VsZCBkbyB0b3VjaCBsb25nIGNsaWNrIG9uIGVsZW1lbnQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgcGFyYW1zID0ge2VsZW1lbnRJZDogJ2VsMScsIHg6IDEyLCB5OiAzNCwgZHVyYXRpb246IDV9O1xuICAgICAgYXdhaXQgZHJpdmVyLnRvdWNoTG9uZ0NsaWNrKCdlbDEnLCAxMiwgMzQsIDUpO1xuICAgICAgYW5kcm9pZEhlbHBlcnMucmVtb3ZlTnVsbFByb3BlcnRpZXMuY2FsbGVkV2l0aEV4YWN0bHkocGFyYW1zKVxuICAgICAgICAuc2hvdWxkLmJlLnRydWU7XG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnNlbmRBY3Rpb24uY2FsbGVkV2l0aEV4YWN0bHkoJ2VsZW1lbnQ6dG91Y2hMb25nQ2xpY2snLCBwYXJhbXMpXG4gICAgICAgIC5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCd0b3VjaERvd24nLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ3Nob3VsZCBkbyB0b3VjaCBkb3duIG9uIGVsZW1lbnQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgcGFyYW1zID0ge2VsZW1lbnRJZDogJ2VsMScsIHg6IDEyLCB5OiAzNH07XG4gICAgICBhd2FpdCBkcml2ZXIudG91Y2hEb3duKCdlbDEnLCAxMiwgMzQpO1xuICAgICAgYW5kcm9pZEhlbHBlcnMucmVtb3ZlTnVsbFByb3BlcnRpZXMuY2FsbGVkV2l0aEV4YWN0bHkocGFyYW1zKVxuICAgICAgICAuc2hvdWxkLmJlLnRydWU7XG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnNlbmRBY3Rpb24uY2FsbGVkV2l0aEV4YWN0bHkoJ2VsZW1lbnQ6dG91Y2hEb3duJywgcGFyYW1zKVxuICAgICAgICAuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgndG91Y2hVcCcsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIGRvIHRvdWNoIHVwIG9uIGVsZW1lbnQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgcGFyYW1zID0ge2VsZW1lbnRJZDogJ2VsMScsIHg6IDEyLCB5OiAzNH07XG4gICAgICBhd2FpdCBkcml2ZXIudG91Y2hVcCgnZWwxJywgMTIsIDM0KTtcbiAgICAgIGFuZHJvaWRIZWxwZXJzLnJlbW92ZU51bGxQcm9wZXJ0aWVzLmNhbGxlZFdpdGhFeGFjdGx5KHBhcmFtcylcbiAgICAgICAgLnNob3VsZC5iZS50cnVlO1xuICAgICAgZHJpdmVyLmJvb3RzdHJhcC5zZW5kQWN0aW9uLmNhbGxlZFdpdGhFeGFjdGx5KCdlbGVtZW50OnRvdWNoVXAnLCBwYXJhbXMpXG4gICAgICAgIC5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCd0b3VjaE1vdmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ3Nob3VsZCBnZXQgZWxlbWVudCBhdHRyaWJ1dGUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgcGFyYW1zID0ge2VsZW1lbnRJZDogJ2VsMScsIHg6IDEyLCB5OiAzNH07XG4gICAgICBhd2FpdCBkcml2ZXIudG91Y2hNb3ZlKCdlbDEnLCAxMiwgMzQpO1xuICAgICAgYW5kcm9pZEhlbHBlcnMucmVtb3ZlTnVsbFByb3BlcnRpZXMuY2FsbGVkV2l0aEV4YWN0bHkocGFyYW1zKVxuICAgICAgICAuc2hvdWxkLmJlLnRydWU7XG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnNlbmRBY3Rpb24uY2FsbGVkV2l0aEV4YWN0bHkoJ2VsZW1lbnQ6dG91Y2hNb3ZlJywgcGFyYW1zKVxuICAgICAgICAuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgnY29tcGxleFRhcCcsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIHRhcCBhbiBlbGVtZW50JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgYXdhaXQgZHJpdmVyLmNvbXBsZXhUYXAobnVsbCwgbnVsbCwgbnVsbCwgMTIsIDM0KTtcbiAgICAgIGRyaXZlci5ib290c3RyYXAuc2VuZEFjdGlvbi5jYWxsZWRXaXRoRXhhY3RseSgnY2xpY2snLCB7eDogMTIsIHk6MzR9KVxuICAgICAgICAuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgndGFwJywgZnVuY3Rpb24gKCkge1xuICAgIGl0KCdzaG91bGRlIHRhcCBhbiBlbGVtZW50JywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgYXdhaXQgZHJpdmVyLnRhcCgnZWwxJywgMTIsIDM0LCAzKTtcbiAgICAgIGRyaXZlci5ib290c3RyYXAuc2VuZEFjdGlvbi5hbHdheXNDYWxsZWRXaXRoKCdlbGVtZW50OmNsaWNrJyxcbiAgICAgICAge2VsZW1lbnRJZDogJ2VsMScsIHg6IDEyLCB5OiAzNH0pLnNob3VsZC5iZS50cnVlO1xuICAgICAgZHJpdmVyLmJvb3RzdHJhcC5zZW5kQWN0aW9uLmNhbGxlZFRocmljZS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHRhcCB3aXRob3V0IGFuIGVsZW1lbnQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBhd2FpdCBkcml2ZXIudGFwKG51bGwsIDEyLCAzNCwgMyk7XG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnNlbmRBY3Rpb24uYWx3YXlzQ2FsbGVkV2l0aCgnY2xpY2snLCB7eDogMTIsIHk6IDM0fSlcbiAgICAgICAgLnNob3VsZC5iZS50cnVlO1xuICAgICAgZHJpdmVyLmJvb3RzdHJhcC5zZW5kQWN0aW9uLmNhbGxlZFRocmljZS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHBlcmZvcm0gc2luZ2xlIHRhcCBvbiBlbGVtZW50IGlmIHgsIHkgYW5kIGNvdW50IGFyZSBub3QgcGFzc2VkJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgYXdhaXQgZHJpdmVyLnRhcCgnZWwxJyk7XG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnNlbmRBY3Rpb24uYWx3YXlzQ2FsbGVkV2l0aCgnZWxlbWVudDpjbGljaycpLnNob3VsZC5iZS50cnVlO1xuICAgICAgZHJpdmVyLmJvb3RzdHJhcC5zZW5kQWN0aW9uLmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uIn0=
