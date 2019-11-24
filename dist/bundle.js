!(function(e) {
  const t = {};
  function r(n) {
    if (t[n]) return t[n].exports;
    const o = (t[n] = { i: n, l: !1, exports: {} });
    return e[n].call(o.exports, o, o.exports, r), (o.l = !0), o.exports;
  }
  (r.m = e),
    (r.c = t),
    (r.d = function(e, t, n) {
      r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
    }),
    (r.r = function(e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (r.t = function(e, t) {
      if ((1 & t && (e = r(e)), 8 & t)) return e;
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
      const n = Object.create(null);
      if (
        (r.r(n),
        Object.defineProperty(n, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (const o in e)
          r.d(
            n,
            o,
            function(t) {
              return e[t];
            }.bind(null, o)
          );
      return n;
    }),
    (r.n = function(e) {
      const t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return r.d(t, 'a', t), t;
    }),
    (r.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (r.p = ''),
    r((r.s = 0));
})([
  function(e, t, r) {
    'use strict';
    const n =
      (this && this.__importDefault) ||
      function(e) {
        return e && e.__esModule ? e : { default: e };
      };
    Object.defineProperty(t, '__esModule', { value: !0 });
    const o = n(r(1));
    t.default = o.default;
  },
  function(e, t, r) {
    'use strict';
    const n =
      (this && this.__importStar) ||
      function(e) {
        if (e && e.__esModule) return e;
        const t = {};
        if (null != e) for (const r in e) Object.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return (t.default = e), t;
      };
    Object.defineProperty(t, '__esModule', { value: !0 });
    const o = n(r(2)),
      u = r(3);
    class a extends o.PureComponent {
      constructor(e) {
        super(e),
          (this.state = { value: '' }),
          (this.processChange = this.processChange.bind(this));
      }
      processChange(e) {
        const {
            target: { value: t },
          } = e,
          { onChange: r, limit: n, prefix: o } = this.props;
        let a = t;
        if ((o && (a = t.replace(o, '')), '' === a || null === a))
          return this.setState({ value: '' }), r(null), !1;
        const s = parseInt(u.removeCommas(a), 10);
        const l = n || 9999999999999;
        if (u.checkIsValidNumber(s, l)) {
          let e = u.addCommas(s);
          o && (e = `${o}${e}`), this.setState({ value: e });
        }
        r(s);
      }
      render() {
        const { className: e, id: t, handleError: r, placeholder: n } = this.props,
          { value: u } = this.state;
        return o.default.createElement('input', {
          type: 'string',
          id: t,
          className: e,
          onChange: this.processChange,
          placeholder: n,
          value: u,
        });
      }
    }
    (t.CurrenyInput = a), (t.default = a);
  },
  function(e, t) {
    e.exports = React;
  },
  function(e, t, r) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.addCommas = e => e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')),
      (t.removeCommas = e => e.replace(/,/g, '')),
      (t.checkIsValidNumber = (e, t) => 0 === e || (!(e < 0 || Number.isNaN(e)) && e <= t));
  },
]);
//# sourceMappingURL=bundle.js.map
