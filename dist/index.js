module.exports = (function(e) {
  const r = {};
  function t(n) {
    if (r[n]) return r[n].exports;
    const u = (r[n] = { i: n, l: !1, exports: {} });
    return e[n].call(u.exports, u, u.exports, t), (u.l = !0), u.exports;
  }
  return (
    (t.m = e),
    (t.c = r),
    (t.d = function(e, r, n) {
      t.o(e, r) || Object.defineProperty(e, r, { enumerable: !0, get: n });
    }),
    (t.r = function(e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (t.t = function(e, r) {
      if ((1 & r && (e = t(e)), 8 & r)) return e;
      if (4 & r && 'object' == typeof e && e && e.__esModule) return e;
      const n = Object.create(null);
      if (
        (t.r(n),
        Object.defineProperty(n, 'default', { enumerable: !0, value: e }),
        2 & r && 'string' != typeof e)
      )
        for (const u in e)
          t.d(
            n,
            u,
            function(r) {
              return e[r];
            }.bind(null, u)
          );
      return n;
    }),
    (t.n = function(e) {
      const r =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return t.d(r, 'a', r), r;
    }),
    (t.o = function(e, r) {
      return Object.prototype.hasOwnProperty.call(e, r);
    }),
    (t.p = ''),
    t((t.s = 1))
  );
})([
  function(e, r) {
    e.exports = require('react');
  },
  function(e, r, t) {
    'use strict';
    t.r(r);
    const n = t(0),
      u = t.n(n),
      o = function(e, r) {
        const t = e.split('.'),
          n = t[0],
          u = t[1],
          o = r || '',
          i = e.includes('.') ? '.' + u : '';
        return (
          '' +
          o +
          (function(e) {
            return e.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          })(n) +
          i
        );
      },
      i = function(e) {
        const r = e.allowDecimals,
          t = void 0 === r || r,
          i = e.id,
          l = e.className,
          a = e.decimalsLimit,
          c = void 0 === a ? 2 : a,
          f = e.defaultValue,
          d = e.onChange,
          s = e.placeholder,
          p = e.prefix,
          v = Object(n.useState)(f ? o(String(f), p) : ''),
          b = v[0],
          m = v[1];
        return u.a.createElement('input', {
          type: 'string',
          id: i,
          className: l,
          onChange: function(e) {
            let r,
              n = (function(e, r, t, n) {
                const u = (function(e) {
                  return e.replace(/,/g, '');
                })(n ? e.replace(n, '') : e);
                if (u.includes('.')) {
                  const o = u.split('.'),
                    i = o[0],
                    l = o[1];
                  return '' + i + (r ? '.' + (t ? l.slice(0, t) : l) : '');
                }
                return u;
              })(e.target.value, t, c, p);
            if (!n) return d(null), m('');
            (r = n), Number(r) < 0 || isNaN(Number(r)) || m(o(n, p)), d(Number(n));
          },
          onFocus: function() {
            return b ? b.length : 0;
          },
          placeholder: s,
          value: b,
        });
      };
    r.default = i;
  },
]);
//# sourceMappingURL=index.js.map
