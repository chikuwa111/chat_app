Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.patchMetaData = patchMetaData;
exports.diff = diff;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _common = require("../common");

function patchMetaData(scope$$, newModules) {
  var modules = scope$$.modules;
  var exports = scope$$.exports;

  var oldModulesByFile = {};
  (0, _common.values)(modules).forEach(function (mod) {
    return oldModulesByFile[mod.file] = mod;
  });

  var rearrangedExports = {};
  (0, _common.keys)(newModules).forEach(function (id) {
    var oldModule = oldModulesByFile[newModules[id].file];
    if (oldModule) {
      rearrangedExports[id] = exports[oldModule.id];
      newModules[id].__inited = true;
    }
  });

  scope$$.exports = rearrangedExports;
  scope$$.modules = newModules;
  scope$$.initModules();
}

function diff(modules, newModules, newEntryId) {
  var oldModulesByFile = {};
  (0, _common.values)(modules).forEach(function (mod) {
    return oldModulesByFile[mod.file] = mod;
  });

  var changedModules = (0, _common.values)(newModules).filter(function (_ref) {
    var entry = _ref.entry;
    var file = _ref.file;
    var hash = _ref.hash;

    return !oldModulesByFile[file] || oldModulesByFile[file].hash !== hash;
  });

  // resolve reverse dependencies so that we can calculate
  // weights for correct reloading order
  var dependencies = {};
  function resolveDeps(mod) {
    var deps = (0, _common.values)(mod.deps);
    dependencies[mod.id] = deps;
    deps.forEach(function (d) {
      if (!dependencies[d] && newModules[d]) resolveDeps(newModules[d]);
    });
  }
  resolveDeps(newModules[newEntryId]);

  var parents = {};
  (0, _common.pairs)(dependencies).forEach(function (_ref2) {
    var _ref22 = _slicedToArray(_ref2, 2);

    var id = _ref22[0];
    var deps = _ref22[1];

    deps.forEach(function (d) {
      return parents[d] = [id].concat(_toConsumableArray(parents[d] || []));
    });
  });

  // idea behind weighting: each file has initial weight = 1
  // each file gets also the sum of its dependency weights
  // finally files are sorted by weight => smaller ones must
  // be reloaded before their dependants (bigger weights)
  var weights = {};
  var hasChanged = {};
  changedModules.forEach(function (_ref3) {
    var id = _ref3.id;

    hasChanged[id] = true;
    addWeightsStartingFrom(id, weights, parents);
  });

  var modulesToReload = (0, _common.sortBy)((0, _common.pairs)(weights), function (_ref4) {
    var _ref42 = _slicedToArray(_ref4, 2);

    var _ = _ref42[0];
    var weight = _ref42[1];
    return weight;
  }).map(function (_ref5) {
    var _ref52 = _slicedToArray(_ref5, 1);

    var id = _ref52[0];
    return newModules[id];
  }).filter(function (module) {
    return !!module && !module.entry;
  }).map(function (module) {
    return _extends({}, module, {
      changed: !!hasChanged[module.id],
      parents: parents[module.id] || [],
      isNew: !oldModulesByFile[module.file]
    });
  });

  return modulesToReload;

  function addWeightsStartingFrom(id, weights, parents) {
    var visited = {};
    weightRecur(id, 1);
    function weightRecur(id, w) {
      if (visited[id]) {
        // prevent circular dependency stack overflow
        return;
      }
      var dependants = parents[id] || [];
      visited[id] = true;
      weights[id] = (weights[id] || 0) + w;
      dependants.forEach(function (d) {
        return weightRecur(d, weights[id] + 1);
      });
    }
  }
}