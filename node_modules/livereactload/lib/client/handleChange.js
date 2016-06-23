Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = handleChanges;

var _reloadUtils = require("./reloadUtils");

var _console = require("./console");

var _common = require("../common");

function handleChanges(scope$$, _ref) {
  var newModules = _ref.modules;
  var newEntryId = _ref.entryId;
  var modules = scope$$.modules;
  var __require = scope$$.require;

  var modulesToReload = (0, _reloadUtils.diff)(modules, newModules, newEntryId);
  (0, _reloadUtils.patchMetaData)(scope$$, newModules);

  if (modulesToReload.length === 0) {
    (0, _console.info)("Nothing to patch");
    return;
  }

  var patch = modulesToReload.map(function (mod) {
    return {
      id: mod.id,
      changed: mod.changed,
      file: mod.file,
      source: mod.source,
      parents: mod.parents.map(Number),
      isNew: mod.isNew
    };
  });

  var propagationGuards = {};
  patch.forEach(function (_ref2) {
    var id = _ref2.id;
    var changed = _ref2.changed;
    var parents = _ref2.parents;

    propagationGuards[id] = (propagationGuards[id] || 0) + (changed ? 1 : 0);
    parents.forEach(function (p) {
      return propagationGuards[p] = (propagationGuards[p] || 0) + 1;
    });
  });

  (0, _console.info)("Apply patch");
  try {
    patch.forEach(function (_ref3) {
      var id = _ref3.id;
      var file = _ref3.file;
      var parents = _ref3.parents;
      var isNew = _ref3.isNew;

      if (propagationGuards[id] > 0) {
        if (isNew) {
          console.log(" > Add new module  ::", file);
        } else {
          console.log(" > Patch module    ::", file);
        }

        var reloadedExports = undefined,
            accepted = false;
        try {
          // ATTENTION: must use scope object because it has been mutated during "pathMetaData"
          delete scope$$.exports[id];
          scope$$.modules[id].__inited = false;
          reloadedExports = __require.__byId(id, true);
        } catch (e) {
          if (e.accepted) {
            console.log(" > Manually accepted");
            accepted = true;
          } else {
            console.error(e);
            (0, _console.warn)("Abort patching");
            throw { aborted: true };
          }
        }

        if (!isNew && (accepted || isStoppable(reloadedExports || {}))) {
          preventPropagation(parents);
        }
      } else {
        // this will prevent propagation to ancestor files
        preventPropagation(parents);
      }
    });
    (0, _console.info)("Patching complete");
  } catch (e) {
    if (!e.aborted) {
      console.error(e);
    }
  }

  function preventPropagation(parents) {
    parents.forEach(function (p) {
      var parent = (0, _common.find)(patch, function (_ref4) {
        var id = _ref4.id;
        return id === p;
      });
      if (parent) {
        propagationGuards[parent.id]--;
      }
    });
  }
}

function isStoppable(exports) {
  if (isProxied(exports)) {
    return true;
  } else if ((0, _common.isPlainObj)(exports)) {
    return !!(0, _common.find)((0, _common.values)(exports), isProxied);
  }
  return false;
}

function isProxied(o) {
  return o && !!o.__reactPatchProxy;
}
module.exports = exports["default"];