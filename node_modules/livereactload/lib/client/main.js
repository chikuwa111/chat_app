function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _startClient = require("./startClient");

var _startClient2 = _interopRequireDefault(_startClient);

var _handleChange = require("./handleChange");

var _handleChange2 = _interopRequireDefault(_handleChange);

var _console = require("./console");

module.exports = function client(opts) {
  var start = arguments.length <= 1 || arguments[1] === undefined ? _startClient2["default"] : arguments[1];

  var scope$$ = window.__livereactload$$;
  scope$$.options = opts;
  start(scope$$, {
    change: function change(msg) {
      (0, _console.info)("Bundle changed");
      (0, _handleChange2["default"])(scope$$, msg.data);
    },
    bundle_error: function bundle_error(msg) {
      (0, _console.error)(msg.data.error);
    }
  });
};