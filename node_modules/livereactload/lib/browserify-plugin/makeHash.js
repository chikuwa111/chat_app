Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = calculateHash;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _crypto = require("crypto");

var _crypto2 = _interopRequireDefault(_crypto);

function calculateHash(sources) {
  var md5sum = _crypto2['default'].createHash('md5');
  md5sum.update(sources);
  return md5sum.digest('hex');
}

module.exports = exports['default'];