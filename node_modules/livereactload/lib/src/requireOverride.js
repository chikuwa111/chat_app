(function () {
  require.__byId = __byId;
  return require;

  function require(name) {
    var scope$$ = window.__livereactload$$;
    var myId = arguments.length > 1 ? arguments[arguments.length - 1] : null;
    return __byId(moduleKey(scope$$, myId, name), false);
  }

  function __byId(id, isReload) {
    var oldRequire = typeof window.require === "function" ? window.require : null;
    var scope$$ = window.__livereactload$$;
    var _module = findModule(scope$$, id);

    if (_module) {
      scope$$.exports[_module.id] = !isReload ? scope$$.exports[_module.id] || {} : {};
      var _exports2 = scope$$.exports[_module.id];
      var mod = {
        exports: _exports2,
        onReload: function onReload(fn) {
          scope$$.reloaders[_module.file] = fn;
        }
      };
      // TODO: there should be still one argument to pass.. figure out which is it
      var oldReloader = scope$$.reloaders[_module.file];
      _module[0].apply(this, [require, mod, _exports2, _module[0], scope$$.modules, scope$$.exports]);
      scope$$.exports[_module.id] = mod.exports;

      if (isReload && typeof oldReloader === "function") {
        var accept = oldReloader.call();
        if (accept === true) {
          throw { accepted: true };
        }
      }
      return mod.exports;
    } else if (oldRequire) {
      return oldRequire.apply(undefined, arguments);
    } else {
      var e = new Error("Module not found: " + name);
      e.code = "MODULE_NOT_FOUND";
      throw e;
    }
  }

  function moduleKey(_ref, callerId, name) {
    var modules = _ref.modules;

    var _ref2 = modules[callerId] || {};

    var _ref2$deps = _ref2.deps;
    var deps = _ref2$deps === undefined ? {} : _ref2$deps;

    return deps[name];
  }

  // resolve module so that de-duplicated modules are skipped and the
  // original module is returned
  function findModule(_ref3, id) {
    var modules = _ref3.modules;

    var mod = modules[id];
    if (mod) {
      if (mod.dedupeIndex) {
        var orig = null;
        Object.keys(modules).forEach(function (id) {
          if (modules[id].index === mod.dedupeIndex) {
            orig = findModule({ modules: modules }, id);
          }
        });
        return orig;
      } else {
        return mod;
      }
    }
  }
})();