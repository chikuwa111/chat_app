function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _through2 = require("through2");

var _through22 = _interopRequireDefault(_through2);

var _fs = require("fs");

var _path = require("path");

var _makeHash = require("./makeHash");

var _makeHash2 = _interopRequireDefault(_makeHash);

var _reloadServer = require("./reloadServer");

var _console = require("./console");

var _common = require("../common");

module.exports = function LiveReactloadPlugin(b) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var _opts$port = opts.port;
  var port = _opts$port === undefined ? 4474 : _opts$port;
  var _opts$host = opts.host;
  var host = _opts$host === undefined ? null : _opts$host;
  var _opts$client = opts.client;
  var client = _opts$client === undefined ? true : _opts$client;
  var _opts$dedupe = opts.dedupe;
  var dedupe = _opts$dedupe === undefined ? true : _opts$dedupe;

  // server is alive as long as watchify is running
  var server = opts.server !== false ? (0, _reloadServer.startServer)({ port: Number(port) }) : null;
  var requireOverride = (0, _fs.readFileSync)((0, _path.resolve)(__dirname, "../requireOverride.js")).toString();

  var clientOpts = {
    port: Number(port),
    host: host
  };

  b.on("reset", addHooks);
  addHooks();

  function addHooks() {
    // this cache object is preserved over single bundling
    // pipeline so when next bundling occurs, this cache
    // object is thrown away
    var modules = {};

    var bundleInitJs = "var require = " + requireOverride + ";\n\n       window.__livereactload$$ = {\n         require: require,\n         modules: modules,\n         exports: {},\n         reloaders: {},\n         initModules: initModules\n       };\n\n       initModules();\n\n       function initModules() {\n         var allExports = window.__livereactload$$.exports;\n         var modules    = window.__livereactload$$.modules;\n         // initialize Browserify compatibility\n         Object.keys(modules).forEach(function(id) {\n           modules[id][0] = (function(require, module, exports) {\n             if (!modules[id].__inited) {\n               modules[id].__inited = true\n               var __init = new Function(\"require\", \"module\", \"exports\", modules[id].source);\n               var _require = (function() { return require.apply(require, Array.prototype.slice.call(arguments).concat(id)); });\n               __init(_require, module, exports, arguments[3], arguments[4], arguments[5], arguments[6]);\n             } else if (allExports[id] && allExports[id] !== exports) {\n               Object.assign(exports, allExports[id])\n             }\n           })\n           modules[id][1] = modules[id].deps;\n         })\n       }";

    var originalEntry = "";
    var entryId = -1;
    var standalone = "";
    var entrySource = "";

    if (server) {
      b.pipeline.on("error", server.notifyBundleError);
    }

    if (!dedupe) {
      b.pipeline.splice('dedupe', 1, _through22["default"].obj());
      if (b.pipeline.get('dedupe')) {
        (0, _console.log)("Other plugins have added de-duplicate transformations. --no-dedupe is not effective");
      }
    }

    // task of this hook is to override the default entry so that
    // the new entry
    b.pipeline.get("record").push(_through22["default"].obj(function transform(row, enc, next) {
      var entry = row.entry;
      var file = row.file;

      if (row.options && row.options._flags && row.options._flags.standalone) {
        standalone = row.options._flags.standalone;
      }

      if (entry) {
        originalEntry = file;
        next(null);
      } else {
        next(null, row);
      }
    }, function flush(next) {
      var origFilename = (0, _path.basename)(originalEntry),
          origDirname = (0, _path.dirname)(originalEntry);

      var newEntryPath = (0, _path.resolve)(origDirname, "___livereactload_entry.js");
      var newEntrySource = [];

      if (client !== false) {
        var args = ["null", JSON.stringify(clientOpts)];
        if (client !== true) {
          var customClient = "require(" + JSON.stringify(client) + ", entryId$$)";
          args.push(customClient);
        }
        newEntrySource.push("require(\"livereactload/client\", entryId$$).call(" + args.join() + ");");
      }

      if (standalone) {
        newEntrySource.push("window[\"" + standalone + "\"] = ");
      }

      newEntrySource.push("require(" + JSON.stringify("./" + origFilename) + ", entryId$$);");
      entrySource = newEntrySource.join("\n");

      this.push({
        entry: true,
        expose: false,
        file: newEntryPath,
        id: newEntryPath,
        source: entrySource,
        nomap: true,
        order: 0
      });
      next();
    }));

    b.pipeline.get("label").push(_through22["default"].obj(function transform(row, enc, next) {
      var id = row.id;
      var index = row.index;
      var dedupeIndex = row.dedupeIndex;
      var file = row.file;
      var source = row.source;
      var deps = row.deps;
      var entry = row.entry;

      if (entry) {
        entryId = id;
        // drop all unnecessary stuff like global requirements and transformations
        // cause our entry module doesn't need them -- inserted global requirements
        // just cause exceptions because modules are not initialized yet, see #87
        source = entrySource;
      }
      modules[id] = {
        id: id,
        index: index,
        dedupeIndex: dedupeIndex,
        file: file,
        source: source,
        deps: deps,
        entry: entry,
        hash: (0, _makeHash2["default"])(source)
      };
      next(null, row);
    }, function flush(next) {
      next();
    }));

    b.pipeline.get("wrap").push(_through22["default"].obj(function transform(row, enc, next) {
      next(null);
    }, function flush(next) {
      var bundleSrc = "(function(modules, entryId$$) {\n             " + bundleInitJs + "\n             (function() {\n               " + modules[entryId].source + "\n             })();\n           })(" + JSON.stringify(modules, null, 2) + ", " + JSON.stringify(entryId) + ");";
      this.push(new Buffer(bundleSrc, "utf8"));
      if (server) {
        server.notifyReload({ modules: modules, entryId: entryId });
      }
      next();
    }));
  }
};

function isGlobalModule(moduleFilename) {
  // assuming that livereload package is in global mdule directory (node_modules)
  // and this file is in ./lib/babel-plugin folder
  return moduleFilename.indexOf((0, _path.resolve)(__dirname, '../../..')) !== -1;
}