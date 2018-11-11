'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _stream = require('stream');

var _stream2 = _interopRequireDefault(_stream);

var _unzip = require('unzip');

var _unzip2 = _interopRequireDefault(_unzip);

var _desired = require('../desired');

var _helpersSession = require('../helpers/session');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('file movement', function () {
  var driver = undefined;
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap((0, _helpersSession.initDriver)(_desired.APIDEMOS_CAPS));

        case 2:
          driver = context$2$0.sent;

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  after(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.quit());

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  function getRandomDir() {
    return '/data/local/tmp/test' + Math.random();
  }

  it('should push and pull a file', function callee$1$0() {
    var stringData, base64Data, remotePath, remoteData64, remoteData;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          stringData = 'random string data ' + Math.random();
          base64Data = new Buffer(stringData).toString('base64');
          remotePath = getRandomDir() + '/remote.txt';
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.pushFile(remotePath, base64Data));

        case 5:
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(driver.pullFile(remotePath));

        case 7:
          remoteData64 = context$2$0.sent;
          remoteData = new Buffer(remoteData64, 'base64').toString();

          remoteData.should.equal(stringData);

        case 10:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should pull a folder', function callee$1$0() {
    var stringData, base64Data, remoteDir, data, zipPromise;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          stringData = 'random string data ' + Math.random();
          base64Data = new Buffer(stringData).toString('base64');
          remoteDir = getRandomDir();
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.pushFile(remoteDir + '/remote0.txt', base64Data));

        case 5:
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(driver.pushFile(remoteDir + '/remote1.txt', base64Data));

        case 7:
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(driver.pullFolder(remoteDir));

        case 9:
          data = context$2$0.sent;
          zipPromise = new _bluebird2['default'](function (resolve) {
            var entryCount = 0;
            var zipStream = new _stream2['default'].Readable();
            zipStream._read = _lodash2['default'].noop;
            zipStream.pipe(_unzip2['default'].Parse()).on('entry', function (entry) {
              entryCount++;
              entry.autodrain();
            }).on('close', function () {
              resolve(entryCount);
            });
            zipStream.push(data, 'base64');
            zipStream.push(null);
          });
          context$2$0.next = 13;
          return _regeneratorRuntime.awrap(zipPromise);

        case 13:
          context$2$0.sent.should.equal(2);

        case 14:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});

// get the file and its contents, to check

// send the files, then pull the whole folder

// TODO: 'pullFolder' is returning 404 error

// go through the folder we pulled and make sure the
// two files we pushed are in it
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9maWxlLW1vdmVtZW50LWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O3NCQUMvQixRQUFROzs7O3dCQUNSLFVBQVU7Ozs7c0JBQ0wsUUFBUTs7OztxQkFDVCxPQUFPOzs7O3VCQUNLLFlBQVk7OzhCQUNmLG9CQUFvQjs7QUFHL0Msa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixRQUFRLENBQUMsZUFBZSxFQUFFLFlBQVk7QUFDcEMsTUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLFFBQU0sQ0FBQzs7Ozs7MkNBQ1UsdURBQXlCOzs7QUFBeEMsZ0JBQU07Ozs7Ozs7R0FDUCxDQUFDLENBQUM7QUFDSCxPQUFLLENBQUM7Ozs7OzJDQUNFLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Ozs7Ozs7R0FDcEIsQ0FBQyxDQUFDOztBQUVILFdBQVMsWUFBWSxHQUFJO0FBQ3ZCLG9DQUE4QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUc7R0FDL0M7O0FBRUQsSUFBRSxDQUFDLDZCQUE2QixFQUFFO1FBQzVCLFVBQVUsRUFDVixVQUFVLEVBQ1YsVUFBVSxFQUtWLFlBQVksRUFDWixVQUFVOzs7O0FBUlYsb0JBQVUsMkJBQXlCLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFDaEQsb0JBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO0FBQ3RELG9CQUFVLEdBQU0sWUFBWSxFQUFFOzsyQ0FFNUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDOzs7OzJDQUdwQixNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQzs7O0FBQWhELHNCQUFZO0FBQ1osb0JBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFOztBQUM5RCxvQkFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7Ozs7Ozs7R0FDckMsQ0FBQyxDQUFDOztBQUVILElBQUUsQ0FBQyxzQkFBc0IsRUFBRTtRQUNyQixVQUFVLEVBQ1YsVUFBVSxFQUdWLFNBQVMsRUFLVCxJQUFJLEVBSUosVUFBVTs7OztBQWJWLG9CQUFVLDJCQUF5QixJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ2hELG9CQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztBQUd0RCxtQkFBUyxHQUFHLFlBQVksRUFBRTs7MkNBQ3hCLE1BQU0sQ0FBQyxRQUFRLENBQUksU0FBUyxtQkFBZ0IsVUFBVSxDQUFDOzs7OzJDQUN2RCxNQUFNLENBQUMsUUFBUSxDQUFJLFNBQVMsbUJBQWdCLFVBQVUsQ0FBQzs7OzsyQ0FHNUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7OztBQUF6QyxjQUFJO0FBSUosb0JBQVUsR0FBRywwQkFBTSxVQUFDLE9BQU8sRUFBSztBQUNsQyxnQkFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO0FBQ25CLGdCQUFJLFNBQVMsR0FBRyxJQUFJLG9CQUFPLFFBQVEsRUFBRSxDQUFDO0FBQ3RDLHFCQUFTLENBQUMsS0FBSyxHQUFHLG9CQUFFLElBQUksQ0FBQztBQUN6QixxQkFBUyxDQUNOLElBQUksQ0FBQyxtQkFBTSxLQUFLLEVBQUUsQ0FBQyxDQUNuQixFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVUsS0FBSyxFQUFFO0FBQzVCLHdCQUFVLEVBQUUsQ0FBQztBQUNiLG1CQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDbkIsQ0FBQyxDQUNELEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBWTtBQUN2QixxQkFBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3JCLENBQUMsQ0FBQztBQUNMLHFCQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztBQUMvQixxQkFBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztXQUN0QixDQUFDOzsyQ0FFSyxVQUFVOzs7MkJBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7O0dBQ2xDLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvY29tbWFuZHMvZmlsZS1tb3ZlbWVudC1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgQiBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgc3RyZWFtIGZyb20gJ3N0cmVhbSc7XG5pbXBvcnQgVW56aXAgZnJvbSAndW56aXAnO1xuaW1wb3J0IHsgQVBJREVNT1NfQ0FQUyB9IGZyb20gJy4uL2Rlc2lyZWQnO1xuaW1wb3J0IHsgaW5pdERyaXZlciB9IGZyb20gJy4uL2hlbHBlcnMvc2Vzc2lvbic7XG5cblxuY2hhaS5zaG91bGQoKTtcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcblxuZGVzY3JpYmUoJ2ZpbGUgbW92ZW1lbnQnLCBmdW5jdGlvbiAoKSB7XG4gIGxldCBkcml2ZXI7XG4gIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgZHJpdmVyID0gYXdhaXQgaW5pdERyaXZlcihBUElERU1PU19DQVBTKTtcbiAgfSk7XG4gIGFmdGVyKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIucXVpdCgpO1xuICB9KTtcblxuICBmdW5jdGlvbiBnZXRSYW5kb21EaXIgKCkge1xuICAgIHJldHVybiBgL2RhdGEvbG9jYWwvdG1wL3Rlc3Qke01hdGgucmFuZG9tKCl9YDtcbiAgfVxuXG4gIGl0KCdzaG91bGQgcHVzaCBhbmQgcHVsbCBhIGZpbGUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHN0cmluZ0RhdGEgPSBgcmFuZG9tIHN0cmluZyBkYXRhICR7TWF0aC5yYW5kb20oKX1gO1xuICAgIGxldCBiYXNlNjREYXRhID0gbmV3IEJ1ZmZlcihzdHJpbmdEYXRhKS50b1N0cmluZygnYmFzZTY0Jyk7XG4gICAgbGV0IHJlbW90ZVBhdGggPSBgJHtnZXRSYW5kb21EaXIoKX0vcmVtb3RlLnR4dGA7XG5cbiAgICBhd2FpdCBkcml2ZXIucHVzaEZpbGUocmVtb3RlUGF0aCwgYmFzZTY0RGF0YSk7XG5cbiAgICAvLyBnZXQgdGhlIGZpbGUgYW5kIGl0cyBjb250ZW50cywgdG8gY2hlY2tcbiAgICBsZXQgcmVtb3RlRGF0YTY0ID0gYXdhaXQgZHJpdmVyLnB1bGxGaWxlKHJlbW90ZVBhdGgpO1xuICAgIGxldCByZW1vdGVEYXRhID0gbmV3IEJ1ZmZlcihyZW1vdGVEYXRhNjQsICdiYXNlNjQnKS50b1N0cmluZygpO1xuICAgIHJlbW90ZURhdGEuc2hvdWxkLmVxdWFsKHN0cmluZ0RhdGEpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHB1bGwgYSBmb2xkZXInLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHN0cmluZ0RhdGEgPSBgcmFuZG9tIHN0cmluZyBkYXRhICR7TWF0aC5yYW5kb20oKX1gO1xuICAgIGxldCBiYXNlNjREYXRhID0gbmV3IEJ1ZmZlcihzdHJpbmdEYXRhKS50b1N0cmluZygnYmFzZTY0Jyk7XG5cbiAgICAvLyBzZW5kIHRoZSBmaWxlcywgdGhlbiBwdWxsIHRoZSB3aG9sZSBmb2xkZXJcbiAgICBsZXQgcmVtb3RlRGlyID0gZ2V0UmFuZG9tRGlyKCk7XG4gICAgYXdhaXQgZHJpdmVyLnB1c2hGaWxlKGAke3JlbW90ZURpcn0vcmVtb3RlMC50eHRgLCBiYXNlNjREYXRhKTtcbiAgICBhd2FpdCBkcml2ZXIucHVzaEZpbGUoYCR7cmVtb3RlRGlyfS9yZW1vdGUxLnR4dGAsIGJhc2U2NERhdGEpO1xuXG4gICAgLy8gVE9ETzogJ3B1bGxGb2xkZXInIGlzIHJldHVybmluZyA0MDQgZXJyb3JcbiAgICBsZXQgZGF0YSA9IGF3YWl0IGRyaXZlci5wdWxsRm9sZGVyKHJlbW90ZURpcik7XG5cbiAgICAvLyBnbyB0aHJvdWdoIHRoZSBmb2xkZXIgd2UgcHVsbGVkIGFuZCBtYWtlIHN1cmUgdGhlXG4gICAgLy8gdHdvIGZpbGVzIHdlIHB1c2hlZCBhcmUgaW4gaXRcbiAgICBsZXQgemlwUHJvbWlzZSA9IG5ldyBCKChyZXNvbHZlKSA9PiB7XG4gICAgICBsZXQgZW50cnlDb3VudCA9IDA7XG4gICAgICBsZXQgemlwU3RyZWFtID0gbmV3IHN0cmVhbS5SZWFkYWJsZSgpO1xuICAgICAgemlwU3RyZWFtLl9yZWFkID0gXy5ub29wO1xuICAgICAgemlwU3RyZWFtXG4gICAgICAgIC5waXBlKFVuemlwLlBhcnNlKCkpXG4gICAgICAgIC5vbignZW50cnknLCBmdW5jdGlvbiAoZW50cnkpIHtcbiAgICAgICAgICBlbnRyeUNvdW50Kys7XG4gICAgICAgICAgZW50cnkuYXV0b2RyYWluKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignY2xvc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmVzb2x2ZShlbnRyeUNvdW50KTtcbiAgICAgICAgfSk7XG4gICAgICB6aXBTdHJlYW0ucHVzaChkYXRhLCAnYmFzZTY0Jyk7XG4gICAgICB6aXBTdHJlYW0ucHVzaChudWxsKTtcbiAgICB9KTtcblxuICAgIChhd2FpdCB6aXBQcm9taXNlKS5zaG91bGQuZXF1YWwoMik7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uIn0=
