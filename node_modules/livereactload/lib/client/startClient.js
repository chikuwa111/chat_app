Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = startClient;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _ws = require("ws");

var _ws2 = _interopRequireDefault(_ws);

var _console = require("./console");

var noop = function noop() {};

function startClient(scope$$, onMsg) {
  if (!scope$$.ws) {
    (function () {
      var url = makeHostUrl(scope$$);
      (0, _console.info)("Connect reload client to " + url);

      var ws = new _ws2["default"](url);
      ws.onopen = function () {
        return (0, _console.info)("WebSocket client listening for changes...");
      };

      ws.onmessage = function (m) {
        var msg = JSON.parse(m.data);
        var res = (onMsg[msg.type] || noop)(msg);
        if (res) {
          ws.send(JSON.stringify(res));
        }
      };

      scope$$.ws = ws;
    })();
  }
}

function makeHostUrl(_ref) {
  var _ref$options = _ref.options;
  var host = _ref$options.host;
  var port = _ref$options.port;

  var protocol = window.location.protocol === "https:" ? "wss" : "ws";
  return protocol + "://" + (host || window.location.hostname) + ":" + port;
}
module.exports = exports["default"];