Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startServer = startServer;

var _ws = require("ws");

var _console = require("./console");

var _common = require("../common");

function logError(error) {
  if (error) {
    (0, _console.log)(error);
  }
}

function startServer(_ref) {
  var port = _ref.port;

  var wss = new _ws.Server({ port: port });

  (0, _console.log)("Reload server up and listening in port " + port + "...");

  var server = {
    notifyReload: function notifyReload(metadata) {
      if (wss.clients.length) {
        (0, _console.log)("Notify clients about bundle change...");
      }
      wss.clients.forEach(function (client) {
        client.send(JSON.stringify({
          type: "change",
          data: metadata
        }), logError);
      });
    },
    notifyBundleError: function notifyBundleError(error) {
      if (wss.clients.length) {
        (0, _console.log)("Notify clients about bundle error...");
      }
      wss.clients.forEach(function (client) {
        client.send(JSON.stringify({
          type: "bundle_error",
          data: { error: error.toString() }
        }), logError);
      });
    }
  };

  wss.on("connection", function (client) {
    (0, _console.log)("New client connected");
  });

  return server;
}