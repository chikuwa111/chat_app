Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.keys = keys;
exports.values = values;
exports.pairs = pairs;
exports.sortBy = sortBy;
exports.extend = extend;
exports.find = find;
exports.isPlainObj = isPlainObj;

function keys(obj) {
  return Object.keys(obj);
}

function values(obj) {
  return keys(obj).map(function (k) {
    return obj[k];
  });
}

function pairs(obj) {
  return keys(obj).map(function (k) {
    return [k, obj[k]];
  });
}

function sortBy(arr, comp) {
  return arr.slice().sort(function (a, b) {
    return comp(a) < comp(b) ? -1 : comp(a) > comp(b) ? 1 : 0;
  });
}

function extend(dest) {
  for (var _len = arguments.length, objs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    objs[_key - 1] = arguments[_key];
  }

  objs.forEach(function (obj) {
    var o = obj || {};
    keys(o).forEach(function (k) {
      if (o.hasOwnProperty(k)) {
        dest[k] = o[k];
      }
    });
  });
  return dest;
}

function find(arr, predicate) {
  var results = (arr || []).filter(predicate);
  return results.length ? results[0] : undefined;
}

function isPlainObj(o) {
  return typeof o == 'object' && o.constructor == Object;
}