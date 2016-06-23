Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.info = info;
exports.warn = warn;
exports.error = error;

function info(msg) {
  console.info("LiveReactload ::", msg);
}

function warn(msg) {
  console.warn("LiveReactload ::", msg);
}

function error(msg) {
  console.error("LiveReactload ::", msg);
}