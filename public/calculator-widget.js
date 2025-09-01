import Sa, { useState as Dg } from "react";
import V1 from "react-dom";
function IS(A) {
  return A && A.__esModule && Object.prototype.hasOwnProperty.call(A, "default") ? A.default : A;
}
var tv = { exports: {} }, lp = {}, lv = { exports: {} }, Og = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var O1;
function PS() {
  return O1 || (O1 = 1, (function(A) {
    function Q(z, Z) {
      var W = z.length;
      z.push(Z);
      e: for (; 0 < W; ) {
        var re = W - 1 >>> 1, j = z[re];
        if (0 < $(j, Z))
          z[re] = Z, z[W] = j, W = re;
        else break e;
      }
    }
    function K(z) {
      return z.length === 0 ? null : z[0];
    }
    function g(z) {
      if (z.length === 0) return null;
      var Z = z[0], W = z.pop();
      if (W !== Z) {
        z[0] = W;
        e: for (var re = 0, j = z.length, k = j >>> 1; re < k; ) {
          var I = 2 * (re + 1) - 1, me = z[I], je = I + 1, dt = z[je];
          if (0 > $(me, W))
            je < j && 0 > $(dt, me) ? (z[re] = dt, z[je] = W, re = je) : (z[re] = me, z[I] = W, re = I);
          else if (je < j && 0 > $(dt, W))
            z[re] = dt, z[je] = W, re = je;
          else break e;
        }
      }
      return Z;
    }
    function $(z, Z) {
      var W = z.sortIndex - Z.sortIndex;
      return W !== 0 ? W : z.id - Z.id;
    }
    if (A.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var oe = performance;
      A.unstable_now = function() {
        return oe.now();
      };
    } else {
      var De = Date, be = De.now();
      A.unstable_now = function() {
        return De.now() - be;
      };
    }
    var L = [], fe = [], F = 1, P = null, ie = 3, Fe = !1, Je = !1, qt = !1, lt = !1, Ie = typeof setTimeout == "function" ? setTimeout : null, ol = typeof clearTimeout == "function" ? clearTimeout : null, st = typeof setImmediate < "u" ? setImmediate : null;
    function Bt(z) {
      for (var Z = K(fe); Z !== null; ) {
        if (Z.callback === null) g(fe);
        else if (Z.startTime <= z)
          g(fe), Z.sortIndex = Z.expirationTime, Q(L, Z);
        else break;
        Z = K(fe);
      }
    }
    function Zt(z) {
      if (qt = !1, Bt(z), !Je)
        if (K(L) !== null)
          Je = !0, gt || (gt = !0, Se());
        else {
          var Z = K(fe);
          Z !== null && Yt(Zt, Z.startTime - z);
        }
    }
    var gt = !1, Ne = -1, mt = 5, ce = -1;
    function rt() {
      return lt ? !0 : !(A.unstable_now() - ce < mt);
    }
    function Ge() {
      if (lt = !1, gt) {
        var z = A.unstable_now();
        ce = z;
        var Z = !0;
        try {
          e: {
            Je = !1, qt && (qt = !1, ol(Ne), Ne = -1), Fe = !0;
            var W = ie;
            try {
              t: {
                for (Bt(z), P = K(L); P !== null && !(P.expirationTime > z && rt()); ) {
                  var re = P.callback;
                  if (typeof re == "function") {
                    P.callback = null, ie = P.priorityLevel;
                    var j = re(
                      P.expirationTime <= z
                    );
                    if (z = A.unstable_now(), typeof j == "function") {
                      P.callback = j, Bt(z), Z = !0;
                      break t;
                    }
                    P === K(L) && g(L), Bt(z);
                  } else g(L);
                  P = K(L);
                }
                if (P !== null) Z = !0;
                else {
                  var k = K(fe);
                  k !== null && Yt(
                    Zt,
                    k.startTime - z
                  ), Z = !1;
                }
              }
              break e;
            } finally {
              P = null, ie = W, Fe = !1;
            }
            Z = void 0;
          }
        } finally {
          Z ? Se() : gt = !1;
        }
      }
    }
    var Se;
    if (typeof st == "function")
      Se = function() {
        st(Ge);
      };
    else if (typeof MessageChannel < "u") {
      var Gt = new MessageChannel(), zt = Gt.port2;
      Gt.port1.onmessage = Ge, Se = function() {
        zt.postMessage(null);
      };
    } else
      Se = function() {
        Ie(Ge, 0);
      };
    function Yt(z, Z) {
      Ne = Ie(function() {
        z(A.unstable_now());
      }, Z);
    }
    A.unstable_IdlePriority = 5, A.unstable_ImmediatePriority = 1, A.unstable_LowPriority = 4, A.unstable_NormalPriority = 3, A.unstable_Profiling = null, A.unstable_UserBlockingPriority = 2, A.unstable_cancelCallback = function(z) {
      z.callback = null;
    }, A.unstable_forceFrameRate = function(z) {
      0 > z || 125 < z ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : mt = 0 < z ? Math.floor(1e3 / z) : 5;
    }, A.unstable_getCurrentPriorityLevel = function() {
      return ie;
    }, A.unstable_next = function(z) {
      switch (ie) {
        case 1:
        case 2:
        case 3:
          var Z = 3;
          break;
        default:
          Z = ie;
      }
      var W = ie;
      ie = Z;
      try {
        return z();
      } finally {
        ie = W;
      }
    }, A.unstable_requestPaint = function() {
      lt = !0;
    }, A.unstable_runWithPriority = function(z, Z) {
      switch (z) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          z = 3;
      }
      var W = ie;
      ie = z;
      try {
        return Z();
      } finally {
        ie = W;
      }
    }, A.unstable_scheduleCallback = function(z, Z, W) {
      var re = A.unstable_now();
      switch (typeof W == "object" && W !== null ? (W = W.delay, W = typeof W == "number" && 0 < W ? re + W : re) : W = re, z) {
        case 1:
          var j = -1;
          break;
        case 2:
          j = 250;
          break;
        case 5:
          j = 1073741823;
          break;
        case 4:
          j = 1e4;
          break;
        default:
          j = 5e3;
      }
      return j = W + j, z = {
        id: F++,
        callback: Z,
        priorityLevel: z,
        startTime: W,
        expirationTime: j,
        sortIndex: -1
      }, W > re ? (z.sortIndex = W, Q(fe, z), K(L) === null && z === K(fe) && (qt ? (ol(Ne), Ne = -1) : qt = !0, Yt(Zt, W - re))) : (z.sortIndex = j, Q(L, z), Je || Fe || (Je = !0, gt || (gt = !0, Se()))), z;
    }, A.unstable_shouldYield = rt, A.unstable_wrapCallback = function(z) {
      var Z = ie;
      return function() {
        var W = ie;
        ie = Z;
        try {
          return z.apply(this, arguments);
        } finally {
          ie = W;
        }
      };
    };
  })(Og)), Og;
}
var Mg = {};
/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var M1;
function e2() {
  return M1 || (M1 = 1, (function(A) {
    process.env.NODE_ENV !== "production" && (function() {
      function Q() {
        if (Zt = !1, ce) {
          var z = A.unstable_now();
          Se = z;
          var Z = !0;
          try {
            e: {
              st = !1, Bt && (Bt = !1, Ne(rt), rt = -1), ol = !0;
              var W = Ie;
              try {
                t: {
                  for (De(z), lt = g(Fe); lt !== null && !(lt.expirationTime > z && L()); ) {
                    var re = lt.callback;
                    if (typeof re == "function") {
                      lt.callback = null, Ie = lt.priorityLevel;
                      var j = re(
                        lt.expirationTime <= z
                      );
                      if (z = A.unstable_now(), typeof j == "function") {
                        lt.callback = j, De(z), Z = !0;
                        break t;
                      }
                      lt === g(Fe) && $(Fe), De(z);
                    } else $(Fe);
                    lt = g(Fe);
                  }
                  if (lt !== null) Z = !0;
                  else {
                    var k = g(Je);
                    k !== null && fe(
                      be,
                      k.startTime - z
                    ), Z = !1;
                  }
                }
                break e;
              } finally {
                lt = null, Ie = W, ol = !1;
              }
              Z = void 0;
            }
          } finally {
            Z ? Gt() : ce = !1;
          }
        }
      }
      function K(z, Z) {
        var W = z.length;
        z.push(Z);
        e: for (; 0 < W; ) {
          var re = W - 1 >>> 1, j = z[re];
          if (0 < oe(j, Z))
            z[re] = Z, z[W] = j, W = re;
          else break e;
        }
      }
      function g(z) {
        return z.length === 0 ? null : z[0];
      }
      function $(z) {
        if (z.length === 0) return null;
        var Z = z[0], W = z.pop();
        if (W !== Z) {
          z[0] = W;
          e: for (var re = 0, j = z.length, k = j >>> 1; re < k; ) {
            var I = 2 * (re + 1) - 1, me = z[I], je = I + 1, dt = z[je];
            if (0 > oe(me, W))
              je < j && 0 > oe(dt, me) ? (z[re] = dt, z[je] = W, re = je) : (z[re] = me, z[I] = W, re = I);
            else if (je < j && 0 > oe(dt, W))
              z[re] = dt, z[je] = W, re = je;
            else break e;
          }
        }
        return Z;
      }
      function oe(z, Z) {
        var W = z.sortIndex - Z.sortIndex;
        return W !== 0 ? W : z.id - Z.id;
      }
      function De(z) {
        for (var Z = g(Je); Z !== null; ) {
          if (Z.callback === null) $(Je);
          else if (Z.startTime <= z)
            $(Je), Z.sortIndex = Z.expirationTime, K(Fe, Z);
          else break;
          Z = g(Je);
        }
      }
      function be(z) {
        if (Bt = !1, De(z), !st)
          if (g(Fe) !== null)
            st = !0, ce || (ce = !0, Gt());
          else {
            var Z = g(Je);
            Z !== null && fe(
              be,
              Z.startTime - z
            );
          }
      }
      function L() {
        return Zt ? !0 : !(A.unstable_now() - Se < Ge);
      }
      function fe(z, Z) {
        rt = gt(function() {
          z(A.unstable_now());
        }, Z);
      }
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error()), A.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
        var F = performance;
        A.unstable_now = function() {
          return F.now();
        };
      } else {
        var P = Date, ie = P.now();
        A.unstable_now = function() {
          return P.now() - ie;
        };
      }
      var Fe = [], Je = [], qt = 1, lt = null, Ie = 3, ol = !1, st = !1, Bt = !1, Zt = !1, gt = typeof setTimeout == "function" ? setTimeout : null, Ne = typeof clearTimeout == "function" ? clearTimeout : null, mt = typeof setImmediate < "u" ? setImmediate : null, ce = !1, rt = -1, Ge = 5, Se = -1;
      if (typeof mt == "function")
        var Gt = function() {
          mt(Q);
        };
      else if (typeof MessageChannel < "u") {
        var zt = new MessageChannel(), Yt = zt.port2;
        zt.port1.onmessage = Q, Gt = function() {
          Yt.postMessage(null);
        };
      } else
        Gt = function() {
          gt(Q, 0);
        };
      A.unstable_IdlePriority = 5, A.unstable_ImmediatePriority = 1, A.unstable_LowPriority = 4, A.unstable_NormalPriority = 3, A.unstable_Profiling = null, A.unstable_UserBlockingPriority = 2, A.unstable_cancelCallback = function(z) {
        z.callback = null;
      }, A.unstable_forceFrameRate = function(z) {
        0 > z || 125 < z ? console.error(
          "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
        ) : Ge = 0 < z ? Math.floor(1e3 / z) : 5;
      }, A.unstable_getCurrentPriorityLevel = function() {
        return Ie;
      }, A.unstable_next = function(z) {
        switch (Ie) {
          case 1:
          case 2:
          case 3:
            var Z = 3;
            break;
          default:
            Z = Ie;
        }
        var W = Ie;
        Ie = Z;
        try {
          return z();
        } finally {
          Ie = W;
        }
      }, A.unstable_requestPaint = function() {
        Zt = !0;
      }, A.unstable_runWithPriority = function(z, Z) {
        switch (z) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            z = 3;
        }
        var W = Ie;
        Ie = z;
        try {
          return Z();
        } finally {
          Ie = W;
        }
      }, A.unstable_scheduleCallback = function(z, Z, W) {
        var re = A.unstable_now();
        switch (typeof W == "object" && W !== null ? (W = W.delay, W = typeof W == "number" && 0 < W ? re + W : re) : W = re, z) {
          case 1:
            var j = -1;
            break;
          case 2:
            j = 250;
            break;
          case 5:
            j = 1073741823;
            break;
          case 4:
            j = 1e4;
            break;
          default:
            j = 5e3;
        }
        return j = W + j, z = {
          id: qt++,
          callback: Z,
          priorityLevel: z,
          startTime: W,
          expirationTime: j,
          sortIndex: -1
        }, W > re ? (z.sortIndex = W, K(Je, z), g(Fe) === null && z === g(Je) && (Bt ? (Ne(rt), rt = -1) : Bt = !0, fe(be, W - re))) : (z.sortIndex = j, K(Fe, z), st || ol || (st = !0, ce || (ce = !0, Gt()))), z;
      }, A.unstable_shouldYield = L, A.unstable_wrapCallback = function(z) {
        var Z = Ie;
        return function() {
          var W = Ie;
          Ie = Z;
          try {
            return z.apply(this, arguments);
          } finally {
            Ie = W;
          }
        };
      }, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    })();
  })(Mg)), Mg;
}
var U1;
function X1() {
  return U1 || (U1 = 1, process.env.NODE_ENV === "production" ? lv.exports = PS() : lv.exports = e2()), lv.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var C1;
function t2() {
  if (C1) return lp;
  C1 = 1;
  var A = X1(), Q = Sa, K = V1;
  function g(l) {
    var n = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      n += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var u = 2; u < arguments.length; u++)
        n += "&args[]=" + encodeURIComponent(arguments[u]);
    }
    return "Minified React error #" + l + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function $(l) {
    return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
  }
  function oe(l) {
    var n = l, u = l;
    if (l.alternate) for (; n.return; ) n = n.return;
    else {
      l = n;
      do
        n = l, (n.flags & 4098) !== 0 && (u = n.return), l = n.return;
      while (l);
    }
    return n.tag === 3 ? u : null;
  }
  function De(l) {
    if (l.tag === 13) {
      var n = l.memoizedState;
      if (n === null && (l = l.alternate, l !== null && (n = l.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function be(l) {
    if (oe(l) !== l)
      throw Error(g(188));
  }
  function L(l) {
    var n = l.alternate;
    if (!n) {
      if (n = oe(l), n === null) throw Error(g(188));
      return n !== l ? null : l;
    }
    for (var u = l, c = n; ; ) {
      var s = u.return;
      if (s === null) break;
      var r = s.alternate;
      if (r === null) {
        if (c = s.return, c !== null) {
          u = c;
          continue;
        }
        break;
      }
      if (s.child === r.child) {
        for (r = s.child; r; ) {
          if (r === u) return be(s), l;
          if (r === c) return be(s), n;
          r = r.sibling;
        }
        throw Error(g(188));
      }
      if (u.return !== c.return) u = s, c = r;
      else {
        for (var m = !1, y = s.child; y; ) {
          if (y === u) {
            m = !0, u = s, c = r;
            break;
          }
          if (y === c) {
            m = !0, c = s, u = r;
            break;
          }
          y = y.sibling;
        }
        if (!m) {
          for (y = r.child; y; ) {
            if (y === u) {
              m = !0, u = r, c = s;
              break;
            }
            if (y === c) {
              m = !0, c = r, u = s;
              break;
            }
            y = y.sibling;
          }
          if (!m) throw Error(g(189));
        }
      }
      if (u.alternate !== c) throw Error(g(190));
    }
    if (u.tag !== 3) throw Error(g(188));
    return u.stateNode.current === u ? l : n;
  }
  function fe(l) {
    var n = l.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return l;
    for (l = l.child; l !== null; ) {
      if (n = fe(l), n !== null) return n;
      l = l.sibling;
    }
    return null;
  }
  var F = Object.assign, P = Symbol.for("react.element"), ie = Symbol.for("react.transitional.element"), Fe = Symbol.for("react.portal"), Je = Symbol.for("react.fragment"), qt = Symbol.for("react.strict_mode"), lt = Symbol.for("react.profiler"), Ie = Symbol.for("react.provider"), ol = Symbol.for("react.consumer"), st = Symbol.for("react.context"), Bt = Symbol.for("react.forward_ref"), Zt = Symbol.for("react.suspense"), gt = Symbol.for("react.suspense_list"), Ne = Symbol.for("react.memo"), mt = Symbol.for("react.lazy"), ce = Symbol.for("react.activity"), rt = Symbol.for("react.memo_cache_sentinel"), Ge = Symbol.iterator;
  function Se(l) {
    return l === null || typeof l != "object" ? null : (l = Ge && l[Ge] || l["@@iterator"], typeof l == "function" ? l : null);
  }
  var Gt = Symbol.for("react.client.reference");
  function zt(l) {
    if (l == null) return null;
    if (typeof l == "function")
      return l.$$typeof === Gt ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case Je:
        return "Fragment";
      case lt:
        return "Profiler";
      case qt:
        return "StrictMode";
      case Zt:
        return "Suspense";
      case gt:
        return "SuspenseList";
      case ce:
        return "Activity";
    }
    if (typeof l == "object")
      switch (l.$$typeof) {
        case Fe:
          return "Portal";
        case st:
          return (l.displayName || "Context") + ".Provider";
        case ol:
          return (l._context.displayName || "Context") + ".Consumer";
        case Bt:
          var n = l.render;
          return l = l.displayName, l || (l = n.displayName || n.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
        case Ne:
          return n = l.displayName || null, n !== null ? n : zt(l.type) || "Memo";
        case mt:
          n = l._payload, l = l._init;
          try {
            return zt(l(n));
          } catch {
          }
      }
    return null;
  }
  var Yt = Array.isArray, z = Q.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Z = K.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, W = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, re = [], j = -1;
  function k(l) {
    return { current: l };
  }
  function I(l) {
    0 > j || (l.current = re[j], re[j] = null, j--);
  }
  function me(l, n) {
    j++, re[j] = l.current, l.current = n;
  }
  var je = k(null), dt = k(null), Ve = k(null), Cu = k(null);
  function Dt(l, n) {
    switch (me(Ve, n), me(dt, l), me(je, null), n.nodeType) {
      case 9:
      case 11:
        l = (l = n.documentElement) && (l = l.namespaceURI) ? Su(l) : 0;
        break;
      default:
        if (l = n.tagName, n = n.namespaceURI)
          n = Su(n), l = Oo(n, l);
        else
          switch (l) {
            case "svg":
              l = 1;
              break;
            case "math":
              l = 2;
              break;
            default:
              l = 0;
          }
    }
    I(je), me(je, l);
  }
  function fl() {
    I(je), I(dt), I(Ve);
  }
  function Ta(l) {
    l.memoizedState !== null && me(Cu, l);
    var n = je.current, u = Oo(n, l.type);
    n !== u && (me(dt, l), me(je, u));
  }
  function Ai(l) {
    dt.current === l && (I(je), I(dt)), Cu.current === l && (I(Cu), ta._currentValue = W);
  }
  var Vs = Object.prototype.hasOwnProperty, Ri = A.unstable_scheduleCallback, sh = A.unstable_cancelCallback, iv = A.unstable_shouldYield, zi = A.unstable_requestPaint, aa = A.unstable_now, Po = A.unstable_getCurrentPriorityLevel, ip = A.unstable_ImmediatePriority, rh = A.unstable_UserBlockingPriority, ef = A.unstable_NormalPriority, dh = A.unstable_LowPriority, jc = A.unstable_IdlePriority, cv = A.log, cp = A.unstable_setDisableYieldValue, _c = null, Ul = null;
  function Fn(l) {
    if (typeof cv == "function" && cp(l), Ul && typeof Ul.setStrictMode == "function")
      try {
        Ul.setStrictMode(_c, l);
      } catch {
      }
  }
  var Vl = Math.clz32 ? Math.clz32 : ov, hh = Math.log, op = Math.LN2;
  function ov(l) {
    return l >>>= 0, l === 0 ? 32 : 31 - (hh(l) / op | 0) | 0;
  }
  var qc = 256, In = 4194304;
  function na(l) {
    var n = l & 42;
    if (n !== 0) return n;
    switch (l & -l) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return l & 4194048;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return l & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return l;
    }
  }
  function Hu(l, n, u) {
    var c = l.pendingLanes;
    if (c === 0) return 0;
    var s = 0, r = l.suspendedLanes, m = l.pingedLanes;
    l = l.warmLanes;
    var y = c & 134217727;
    return y !== 0 ? (c = y & ~r, c !== 0 ? s = na(c) : (m &= y, m !== 0 ? s = na(m) : u || (u = y & ~l, u !== 0 && (s = na(u))))) : (y = c & ~r, y !== 0 ? s = na(y) : m !== 0 ? s = na(m) : u || (u = c & ~l, u !== 0 && (s = na(u)))), s === 0 ? 0 : n !== 0 && n !== s && (n & r) === 0 && (r = s & -s, u = n & -n, r >= u || r === 32 && (u & 4194048) !== 0) ? n : s;
  }
  function cn(l, n) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & n) === 0;
  }
  function Pt(l, n) {
    switch (l) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return n + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Nu() {
    var l = qc;
    return qc <<= 1, (qc & 4194048) === 0 && (qc = 256), l;
  }
  function Di() {
    var l = In;
    return In <<= 1, (In & 62914560) === 0 && (In = 4194304), l;
  }
  function ju(l) {
    for (var n = [], u = 0; 31 > u; u++) n.push(l);
    return n;
  }
  function Oi(l, n) {
    l.pendingLanes |= n, n !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
  }
  function fp(l, n, u, c, s, r) {
    var m = l.pendingLanes;
    l.pendingLanes = u, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= u, l.entangledLanes &= u, l.errorRecoveryDisabledLanes &= u, l.shellSuspendCounter = 0;
    var y = l.entanglements, b = l.expirationTimes, M = l.hiddenUpdates;
    for (u = m & ~u; 0 < u; ) {
      var G = 31 - Vl(u), X = 1 << G;
      y[G] = 0, b[G] = -1;
      var C = M[G];
      if (C !== null)
        for (M[G] = null, G = 0; G < C.length; G++) {
          var N = C[G];
          N !== null && (N.lane &= -536870913);
        }
      u &= ~X;
    }
    c !== 0 && tf(l, c, 0), r !== 0 && s === 0 && l.tag !== 0 && (l.suspendedLanes |= r & ~(m & ~n));
  }
  function tf(l, n, u) {
    l.pendingLanes |= n, l.suspendedLanes &= ~n;
    var c = 31 - Vl(n);
    l.entangledLanes |= n, l.entanglements[c] = l.entanglements[c] | 1073741824 | u & 4194090;
  }
  function lf(l, n) {
    var u = l.entangledLanes |= n;
    for (l = l.entanglements; u; ) {
      var c = 31 - Vl(u), s = 1 << c;
      s & n | l[c] & n && (l[c] |= n), u &= ~s;
    }
  }
  function Va(l) {
    switch (l) {
      case 2:
        l = 1;
        break;
      case 8:
        l = 4;
        break;
      case 32:
        l = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        l = 128;
        break;
      case 268435456:
        l = 134217728;
        break;
      default:
        l = 0;
    }
    return l;
  }
  function Xs(l) {
    return l &= -l, 2 < l ? 8 < l ? (l & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function sp() {
    var l = Z.p;
    return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : vy(l.type));
  }
  function fv(l, n) {
    var u = Z.p;
    try {
      return Z.p = l, n();
    } finally {
      Z.p = u;
    }
  }
  var Lt = Math.random().toString(36).slice(2), el = "__reactFiber$" + Lt, Cl = "__reactProps$" + Lt, Bc = "__reactContainer$" + Lt, Qs = "__reactEvents$" + Lt, rp = "__reactListeners$" + Lt, Zs = "__reactHandles$" + Lt, dp = "__reactResources$" + Lt, ae = "__reactMarker$" + Lt;
  function af(l) {
    delete l[el], delete l[Cl], delete l[Qs], delete l[rp], delete l[Zs];
  }
  function sl(l) {
    var n = l[el];
    if (n) return n;
    for (var u = l.parentNode; u; ) {
      if (n = u[Bc] || u[el]) {
        if (u = n.alternate, n.child !== null || u !== null && u.child !== null)
          for (l = vl(l); l !== null; ) {
            if (u = l[el]) return u;
            l = vl(l);
          }
        return n;
      }
      l = u, u = l.parentNode;
    }
    return null;
  }
  function Mi(l) {
    if (l = l[el] || l[Bc]) {
      var n = l.tag;
      if (n === 5 || n === 6 || n === 13 || n === 26 || n === 27 || n === 3)
        return l;
    }
    return null;
  }
  function nf(l) {
    var n = l.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return l.stateNode;
    throw Error(g(33));
  }
  function Pn(l) {
    var n = l[dp];
    return n || (n = l[dp] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function Jt(l) {
    l[ae] = !0;
  }
  var uf = /* @__PURE__ */ new Set(), ua = {};
  function _u(l, n) {
    qu(l, n), qu(l + "Capture", n);
  }
  function qu(l, n) {
    for (ua[l] = n, l = 0; l < n.length; l++)
      uf.add(n[l]);
  }
  var hp = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Ls = {}, mh = {};
  function mp(l) {
    return Vs.call(mh, l) ? !0 : Vs.call(Ls, l) ? !1 : hp.test(l) ? mh[l] = !0 : (Ls[l] = !0, !1);
  }
  function eu(l, n, u) {
    if (mp(n))
      if (u === null) l.removeAttribute(n);
      else {
        switch (typeof u) {
          case "undefined":
          case "function":
          case "symbol":
            l.removeAttribute(n);
            return;
          case "boolean":
            var c = n.toLowerCase().slice(0, 5);
            if (c !== "data-" && c !== "aria-") {
              l.removeAttribute(n);
              return;
            }
        }
        l.setAttribute(n, "" + u);
      }
  }
  function cf(l, n, u) {
    if (u === null) l.removeAttribute(n);
    else {
      switch (typeof u) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(n);
          return;
      }
      l.setAttribute(n, "" + u);
    }
  }
  function on(l, n, u, c) {
    if (c === null) l.removeAttribute(u);
    else {
      switch (typeof c) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(u);
          return;
      }
      l.setAttributeNS(n, u, "" + c);
    }
  }
  var Js, yh;
  function Ui(l) {
    if (Js === void 0)
      try {
        throw Error();
      } catch (u) {
        var n = u.stack.trim().match(/\n( *(at )?)/);
        Js = n && n[1] || "", yh = -1 < u.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < u.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Js + l + yh;
  }
  var Hl = !1;
  function Bu(l, n) {
    if (!l || Hl) return "";
    Hl = !0;
    var u = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var c = {
        DetermineComponentFrameRoot: function() {
          try {
            if (n) {
              var X = function() {
                throw Error();
              };
              if (Object.defineProperty(X.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(X, []);
                } catch (N) {
                  var C = N;
                }
                Reflect.construct(l, [], X);
              } else {
                try {
                  X.call();
                } catch (N) {
                  C = N;
                }
                l.call(X.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (N) {
                C = N;
              }
              (X = l()) && typeof X.catch == "function" && X.catch(function() {
              });
            }
          } catch (N) {
            if (N && C && typeof N.stack == "string")
              return [N.stack, C.stack];
          }
          return [null, null];
        }
      };
      c.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var s = Object.getOwnPropertyDescriptor(
        c.DetermineComponentFrameRoot,
        "name"
      );
      s && s.configurable && Object.defineProperty(
        c.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var r = c.DetermineComponentFrameRoot(), m = r[0], y = r[1];
      if (m && y) {
        var b = m.split(`
`), M = y.split(`
`);
        for (s = c = 0; c < b.length && !b[c].includes("DetermineComponentFrameRoot"); )
          c++;
        for (; s < M.length && !M[s].includes(
          "DetermineComponentFrameRoot"
        ); )
          s++;
        if (c === b.length || s === M.length)
          for (c = b.length - 1, s = M.length - 1; 1 <= c && 0 <= s && b[c] !== M[s]; )
            s--;
        for (; 1 <= c && 0 <= s; c--, s--)
          if (b[c] !== M[s]) {
            if (c !== 1 || s !== 1)
              do
                if (c--, s--, 0 > s || b[c] !== M[s]) {
                  var G = `
` + b[c].replace(" at new ", " at ");
                  return l.displayName && G.includes("<anonymous>") && (G = G.replace("<anonymous>", l.displayName)), G;
                }
              while (1 <= c && 0 <= s);
            break;
          }
      }
    } finally {
      Hl = !1, Error.prepareStackTrace = u;
    }
    return (u = l ? l.displayName || l.name : "") ? Ui(u) : "";
  }
  function Ci(l) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return Ui(l.type);
      case 16:
        return Ui("Lazy");
      case 13:
        return Ui("Suspense");
      case 19:
        return Ui("SuspenseList");
      case 0:
      case 15:
        return Bu(l.type, !1);
      case 11:
        return Bu(l.type.render, !1);
      case 1:
        return Bu(l.type, !0);
      case 31:
        return Ui("Activity");
      default:
        return "";
    }
  }
  function ph(l) {
    try {
      var n = "";
      do
        n += Ci(l), l = l.return;
      while (l);
      return n;
    } catch (u) {
      return `
Error generating stack: ` + u.message + `
` + u.stack;
    }
  }
  function xl(l) {
    switch (typeof l) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return l;
      case "object":
        return l;
      default:
        return "";
    }
  }
  function of(l) {
    var n = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function vh(l) {
    var n = of(l) ? "checked" : "value", u = Object.getOwnPropertyDescriptor(
      l.constructor.prototype,
      n
    ), c = "" + l[n];
    if (!l.hasOwnProperty(n) && typeof u < "u" && typeof u.get == "function" && typeof u.set == "function") {
      var s = u.get, r = u.set;
      return Object.defineProperty(l, n, {
        configurable: !0,
        get: function() {
          return s.call(this);
        },
        set: function(m) {
          c = "" + m, r.call(this, m);
        }
      }), Object.defineProperty(l, n, {
        enumerable: u.enumerable
      }), {
        getValue: function() {
          return c;
        },
        setValue: function(m) {
          c = "" + m;
        },
        stopTracking: function() {
          l._valueTracker = null, delete l[n];
        }
      };
    }
  }
  function Yu(l) {
    l._valueTracker || (l._valueTracker = vh(l));
  }
  function Hi(l) {
    if (!l) return !1;
    var n = l._valueTracker;
    if (!n) return !0;
    var u = n.getValue(), c = "";
    return l && (c = of(l) ? l.checked ? "true" : "false" : l.value), l = c, l !== u ? (n.setValue(l), !0) : !1;
  }
  function Yc(l) {
    if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var sv = /[\n"\\]/g;
  function xa(l) {
    return l.replace(
      sv,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Ks(l, n, u, c, s, r, m, y) {
    l.name = "", m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" ? l.type = m : l.removeAttribute("type"), n != null ? m === "number" ? (n === 0 && l.value === "" || l.value != n) && (l.value = "" + xl(n)) : l.value !== "" + xl(n) && (l.value = "" + xl(n)) : m !== "submit" && m !== "reset" || l.removeAttribute("value"), n != null ? ff(l, m, xl(n)) : u != null ? ff(l, m, xl(u)) : c != null && l.removeAttribute("value"), s == null && r != null && (l.defaultChecked = !!r), s != null && (l.checked = s && typeof s != "function" && typeof s != "symbol"), y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" ? l.name = "" + xl(y) : l.removeAttribute("name");
  }
  function ks(l, n, u, c, s, r, m, y) {
    if (r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" && (l.type = r), n != null || u != null) {
      if (!(r !== "submit" && r !== "reset" || n != null))
        return;
      u = u != null ? "" + xl(u) : "", n = n != null ? "" + xl(n) : u, y || n === l.value || (l.value = n), l.defaultValue = n;
    }
    c = c ?? s, c = typeof c != "function" && typeof c != "symbol" && !!c, l.checked = y ? l.checked : !!c, l.defaultChecked = !!c, m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" && (l.name = m);
  }
  function ff(l, n, u) {
    n === "number" && Yc(l.ownerDocument) === l || l.defaultValue === "" + u || (l.defaultValue = "" + u);
  }
  function Ni(l, n, u, c) {
    if (l = l.options, n) {
      n = {};
      for (var s = 0; s < u.length; s++)
        n["$" + u[s]] = !0;
      for (u = 0; u < l.length; u++)
        s = n.hasOwnProperty("$" + l[u].value), l[u].selected !== s && (l[u].selected = s), s && c && (l[u].defaultSelected = !0);
    } else {
      for (u = "" + xl(u), n = null, s = 0; s < l.length; s++) {
        if (l[s].value === u) {
          l[s].selected = !0, c && (l[s].defaultSelected = !0);
          return;
        }
        n !== null || l[s].disabled || (n = l[s]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function gh(l, n, u) {
    if (n != null && (n = "" + xl(n), n !== l.value && (l.value = n), u == null)) {
      l.defaultValue !== n && (l.defaultValue = n);
      return;
    }
    l.defaultValue = u != null ? "" + xl(u) : "";
  }
  function bh(l, n, u, c) {
    if (n == null) {
      if (c != null) {
        if (u != null) throw Error(g(92));
        if (Yt(c)) {
          if (1 < c.length) throw Error(g(93));
          c = c[0];
        }
        u = c;
      }
      u == null && (u = ""), n = u;
    }
    u = xl(n), l.defaultValue = u, c = l.textContent, c === u && c !== "" && c !== null && (l.value = c);
  }
  function wc(l, n) {
    if (n) {
      var u = l.firstChild;
      if (u && u === l.lastChild && u.nodeType === 3) {
        u.nodeValue = n;
        return;
      }
    }
    l.textContent = n;
  }
  var yp = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function $s(l, n, u) {
    var c = n.indexOf("--") === 0;
    u == null || typeof u == "boolean" || u === "" ? c ? l.setProperty(n, "") : n === "float" ? l.cssFloat = "" : l[n] = "" : c ? l.setProperty(n, u) : typeof u != "number" || u === 0 || yp.has(n) ? n === "float" ? l.cssFloat = u : l[n] = ("" + u).trim() : l[n] = u + "px";
  }
  function sf(l, n, u) {
    if (n != null && typeof n != "object")
      throw Error(g(62));
    if (l = l.style, u != null) {
      for (var c in u)
        !u.hasOwnProperty(c) || n != null && n.hasOwnProperty(c) || (c.indexOf("--") === 0 ? l.setProperty(c, "") : c === "float" ? l.cssFloat = "" : l[c] = "");
      for (var s in n)
        c = n[s], n.hasOwnProperty(s) && u[s] !== c && $s(l, s, c);
    } else
      for (var r in n)
        n.hasOwnProperty(r) && $s(l, r, n[r]);
  }
  function ji(l) {
    if (l.indexOf("-") === -1) return !1;
    switch (l) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var rv = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), pp = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function rf(l) {
    return pp.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  var _i = null;
  function Ws(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var Gc = null, Vc = null;
  function vp(l) {
    var n = Mi(l);
    if (n && (l = n.stateNode)) {
      var u = l[Cl] || null;
      e: switch (l = n.stateNode, n.type) {
        case "input":
          if (Ks(
            l,
            u.value,
            u.defaultValue,
            u.defaultValue,
            u.checked,
            u.defaultChecked,
            u.type,
            u.name
          ), n = u.name, u.type === "radio" && n != null) {
            for (u = l; u.parentNode; ) u = u.parentNode;
            for (u = u.querySelectorAll(
              'input[name="' + xa(
                "" + n
              ) + '"][type="radio"]'
            ), n = 0; n < u.length; n++) {
              var c = u[n];
              if (c !== l && c.form === l.form) {
                var s = c[Cl] || null;
                if (!s) throw Error(g(90));
                Ks(
                  c,
                  s.value,
                  s.defaultValue,
                  s.defaultValue,
                  s.checked,
                  s.defaultChecked,
                  s.type,
                  s.name
                );
              }
            }
            for (n = 0; n < u.length; n++)
              c = u[n], c.form === l.form && Hi(c);
          }
          break e;
        case "textarea":
          gh(l, u.value, u.defaultValue);
          break e;
        case "select":
          n = u.value, n != null && Ni(l, !!u.multiple, n, !1);
      }
    }
  }
  var Sh = !1;
  function Xc(l, n, u) {
    if (Sh) return l(n, u);
    Sh = !0;
    try {
      var c = l(n);
      return c;
    } finally {
      if (Sh = !1, (Gc !== null || Vc !== null) && (hc(), Gc && (n = Gc, l = Vc, Vc = Gc = null, vp(n), l)))
        for (n = 0; n < l.length; n++) vp(l[n]);
    }
  }
  function qi(l, n) {
    var u = l.stateNode;
    if (u === null) return null;
    var c = u[Cl] || null;
    if (c === null) return null;
    u = c[n];
    e: switch (n) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (c = !c.disabled) || (l = l.type, c = !(l === "button" || l === "input" || l === "select" || l === "textarea")), l = !c;
        break e;
      default:
        l = !1;
    }
    if (l) return null;
    if (u && typeof u != "function")
      throw Error(
        g(231, n, typeof u)
      );
    return u;
  }
  var fn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Fs = !1;
  if (fn)
    try {
      var tu = {};
      Object.defineProperty(tu, "passive", {
        get: function() {
          Fs = !0;
        }
      }), window.addEventListener("test", tu, tu), window.removeEventListener("test", tu, tu);
    } catch {
      Fs = !1;
    }
  var lu = null, Qc = null, Bi = null;
  function Th() {
    if (Bi) return Bi;
    var l, n = Qc, u = n.length, c, s = "value" in lu ? lu.value : lu.textContent, r = s.length;
    for (l = 0; l < u && n[l] === s[l]; l++) ;
    var m = u - l;
    for (c = 1; c <= m && n[u - c] === s[r - c]; c++) ;
    return Bi = s.slice(l, 1 < c ? 1 - c : void 0);
  }
  function rl(l) {
    var n = l.keyCode;
    return "charCode" in l ? (l = l.charCode, l === 0 && n === 13 && (l = 13)) : l = n, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
  }
  function Is() {
    return !0;
  }
  function Ps() {
    return !1;
  }
  function Nl(l) {
    function n(u, c, s, r, m) {
      this._reactName = u, this._targetInst = s, this.type = c, this.nativeEvent = r, this.target = m, this.currentTarget = null;
      for (var y in l)
        l.hasOwnProperty(y) && (u = l[y], this[y] = u ? u(r) : r[y]);
      return this.isDefaultPrevented = (r.defaultPrevented != null ? r.defaultPrevented : r.returnValue === !1) ? Is : Ps, this.isPropagationStopped = Ps, this;
    }
    return F(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var u = this.nativeEvent;
        u && (u.preventDefault ? u.preventDefault() : typeof u.returnValue != "unknown" && (u.returnValue = !1), this.isDefaultPrevented = Is);
      },
      stopPropagation: function() {
        var u = this.nativeEvent;
        u && (u.stopPropagation ? u.stopPropagation() : typeof u.cancelBubble != "unknown" && (u.cancelBubble = !0), this.isPropagationStopped = Is);
      },
      persist: function() {
      },
      isPersistent: Is
    }), n;
  }
  var wu = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(l) {
      return l.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, er = Nl(wu), df = F({}, wu, { view: 0, detail: 0 }), gp = Nl(df), xh, tr, hf, Yi = F({}, df, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: au,
    button: 0,
    buttons: 0,
    relatedTarget: function(l) {
      return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
    },
    movementX: function(l) {
      return "movementX" in l ? l.movementX : (l !== hf && (hf && l.type === "mousemove" ? (xh = l.screenX - hf.screenX, tr = l.screenY - hf.screenY) : tr = xh = 0, hf = l), xh);
    },
    movementY: function(l) {
      return "movementY" in l ? l.movementY : tr;
    }
  }), Eh = Nl(Yi), bp = F({}, Yi, { dataTransfer: 0 }), Sp = Nl(bp), dv = F({}, df, { relatedTarget: 0 }), Ah = Nl(dv), hv = F({}, wu, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), mv = Nl(hv), yv = F({}, wu, {
    clipboardData: function(l) {
      return "clipboardData" in l ? l.clipboardData : window.clipboardData;
    }
  }), mf = Nl(yv), Tp = F({}, wu, { data: 0 }), Rh = Nl(Tp), xp = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Ep = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, zh = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Ap(l) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(l) : (l = zh[l]) ? !!n[l] : !1;
  }
  function au() {
    return Ap;
  }
  var wi = F({}, df, {
    key: function(l) {
      if (l.key) {
        var n = xp[l.key] || l.key;
        if (n !== "Unidentified") return n;
      }
      return l.type === "keypress" ? (l = rl(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? Ep[l.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: au,
    charCode: function(l) {
      return l.type === "keypress" ? rl(l) : 0;
    },
    keyCode: function(l) {
      return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    },
    which: function(l) {
      return l.type === "keypress" ? rl(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    }
  }), Xa = Nl(wi), ia = F({}, Yi, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), yf = Nl(ia), lr = F({}, df, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: au
  }), Dh = Nl(lr), Xl = F({}, wu, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Rp = Nl(Xl), ar = F({}, Yi, {
    deltaX: function(l) {
      return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
    },
    deltaY: function(l) {
      return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Gi = Nl(ar), Oh = F({}, wu, {
    newState: 0,
    oldState: 0
  }), zp = Nl(Oh), Dp = [9, 13, 27, 32], pf = fn && "CompositionEvent" in window, vf = null;
  fn && "documentMode" in document && (vf = document.documentMode);
  var Mh = fn && "TextEvent" in window && !vf, sn = fn && (!pf || vf && 8 < vf && 11 >= vf), Uh = " ", nr = !1;
  function gf(l, n) {
    switch (l) {
      case "keyup":
        return Dp.indexOf(n.keyCode) !== -1;
      case "keydown":
        return n.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Gu(l) {
    return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
  }
  var Vu = !1;
  function Ch(l, n) {
    switch (l) {
      case "compositionend":
        return Gu(n);
      case "keypress":
        return n.which !== 32 ? null : (nr = !0, Uh);
      case "textInput":
        return l = n.data, l === Uh && nr ? null : l;
      default:
        return null;
    }
  }
  function Vi(l, n) {
    if (Vu)
      return l === "compositionend" || !pf && gf(l, n) ? (l = Th(), Bi = Qc = lu = null, Vu = !1, l) : null;
    switch (l) {
      case "paste":
        return null;
      case "keypress":
        if (!(n.ctrlKey || n.altKey || n.metaKey) || n.ctrlKey && n.altKey) {
          if (n.char && 1 < n.char.length)
            return n.char;
          if (n.which) return String.fromCharCode(n.which);
        }
        return null;
      case "compositionend":
        return sn && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var Op = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function ur(l) {
    var n = l && l.nodeName && l.nodeName.toLowerCase();
    return n === "input" ? !!Op[l.type] : n === "textarea";
  }
  function ir(l, n, u, c) {
    Gc ? Vc ? Vc.push(c) : Vc = [c] : Gc = c, n = Do(n, "onChange"), 0 < n.length && (u = new er(
      "onChange",
      "change",
      null,
      u,
      c
    ), l.push({ event: u, listeners: n }));
  }
  var Qa = null, Za = null;
  function Hh(l) {
    vc(l, 0);
  }
  function rn(l) {
    var n = nf(l);
    if (Hi(n)) return l;
  }
  function Nh(l, n) {
    if (l === "change") return n;
  }
  var jh = !1;
  if (fn) {
    var Xi;
    if (fn) {
      var Qi = "oninput" in document;
      if (!Qi) {
        var _h = document.createElement("div");
        _h.setAttribute("oninput", "return;"), Qi = typeof _h.oninput == "function";
      }
      Xi = Qi;
    } else Xi = !1;
    jh = Xi && (!document.documentMode || 9 < document.documentMode);
  }
  function Zc() {
    Qa && (Qa.detachEvent("onpropertychange", qh), Za = Qa = null);
  }
  function qh(l) {
    if (l.propertyName === "value" && rn(Za)) {
      var n = [];
      ir(
        n,
        Za,
        l,
        Ws(l)
      ), Xc(Hh, n);
    }
  }
  function cr(l, n, u) {
    l === "focusin" ? (Zc(), Qa = n, Za = u, Qa.attachEvent("onpropertychange", qh)) : l === "focusout" && Zc();
  }
  function Xu(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return rn(Za);
  }
  function nu(l, n) {
    if (l === "click") return rn(n);
  }
  function Bh(l, n) {
    if (l === "input" || l === "change")
      return rn(n);
  }
  function Yh(l, n) {
    return l === n && (l !== 0 || 1 / l === 1 / n) || l !== l && n !== n;
  }
  var dl = typeof Object.is == "function" ? Object.is : Yh;
  function Qu(l, n) {
    if (dl(l, n)) return !0;
    if (typeof l != "object" || l === null || typeof n != "object" || n === null)
      return !1;
    var u = Object.keys(l), c = Object.keys(n);
    if (u.length !== c.length) return !1;
    for (c = 0; c < u.length; c++) {
      var s = u[c];
      if (!Vs.call(n, s) || !dl(l[s], n[s]))
        return !1;
    }
    return !0;
  }
  function Zu(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function yt(l, n) {
    var u = Zu(l);
    l = 0;
    for (var c; u; ) {
      if (u.nodeType === 3) {
        if (c = l + u.textContent.length, l <= n && c >= n)
          return { node: u, offset: n - l };
        l = c;
      }
      e: {
        for (; u; ) {
          if (u.nextSibling) {
            u = u.nextSibling;
            break e;
          }
          u = u.parentNode;
        }
        u = void 0;
      }
      u = Zu(u);
    }
  }
  function bf(l, n) {
    return l && n ? l === n ? !0 : l && l.nodeType === 3 ? !1 : n && n.nodeType === 3 ? bf(l, n.parentNode) : "contains" in l ? l.contains(n) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function wh(l) {
    l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
    for (var n = Yc(l.document); n instanceof l.HTMLIFrameElement; ) {
      try {
        var u = typeof n.contentWindow.location.href == "string";
      } catch {
        u = !1;
      }
      if (u) l = n.contentWindow;
      else break;
      n = Yc(l.document);
    }
    return n;
  }
  function Sf(l) {
    var n = l && l.nodeName && l.nodeName.toLowerCase();
    return n && (n === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || n === "textarea" || l.contentEditable === "true");
  }
  var Zi = fn && "documentMode" in document && 11 >= document.documentMode, dn = null, La = null, Lu = null, Li = !1;
  function or(l, n, u) {
    var c = u.window === u ? u.document : u.nodeType === 9 ? u : u.ownerDocument;
    Li || dn == null || dn !== Yc(c) || (c = dn, "selectionStart" in c && Sf(c) ? c = { start: c.selectionStart, end: c.selectionEnd } : (c = (c.ownerDocument && c.ownerDocument.defaultView || window).getSelection(), c = {
      anchorNode: c.anchorNode,
      anchorOffset: c.anchorOffset,
      focusNode: c.focusNode,
      focusOffset: c.focusOffset
    }), Lu && Qu(Lu, c) || (Lu = c, c = Do(La, "onSelect"), 0 < c.length && (n = new er(
      "onSelect",
      "select",
      null,
      n,
      u
    ), l.push({ event: n, listeners: c }), n.target = dn)));
  }
  function uu(l, n) {
    var u = {};
    return u[l.toLowerCase()] = n.toLowerCase(), u["Webkit" + l] = "webkit" + n, u["Moz" + l] = "moz" + n, u;
  }
  var Ji = {
    animationend: uu("Animation", "AnimationEnd"),
    animationiteration: uu("Animation", "AnimationIteration"),
    animationstart: uu("Animation", "AnimationStart"),
    transitionrun: uu("Transition", "TransitionRun"),
    transitionstart: uu("Transition", "TransitionStart"),
    transitioncancel: uu("Transition", "TransitionCancel"),
    transitionend: uu("Transition", "TransitionEnd")
  }, Ea = {}, Ja = {};
  fn && (Ja = document.createElement("div").style, "AnimationEvent" in window || (delete Ji.animationend.animation, delete Ji.animationiteration.animation, delete Ji.animationstart.animation), "TransitionEvent" in window || delete Ji.transitionend.transition);
  function hn(l) {
    if (Ea[l]) return Ea[l];
    if (!Ji[l]) return l;
    var n = Ji[l], u;
    for (u in n)
      if (n.hasOwnProperty(u) && u in Ja)
        return Ea[l] = n[u];
    return l;
  }
  var Mp = hn("animationend"), Gh = hn("animationiteration"), Up = hn("animationstart"), Vh = hn("transitionrun"), fr = hn("transitionstart"), Cp = hn("transitioncancel"), Xh = hn("transitionend"), Qh = /* @__PURE__ */ new Map(), Lc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Lc.push("scrollEnd");
  function Aa(l, n) {
    Qh.set(l, n), _u(n, [l]);
  }
  var Zh = /* @__PURE__ */ new WeakMap();
  function ca(l, n) {
    if (typeof l == "object" && l !== null) {
      var u = Zh.get(l);
      return u !== void 0 ? u : (n = {
        value: l,
        source: n,
        stack: ph(n)
      }, Zh.set(l, n), n);
    }
    return {
      value: l,
      source: n,
      stack: ph(n)
    };
  }
  var Ql = [], Ju = 0, mn = 0;
  function Ka() {
    for (var l = Ju, n = mn = Ju = 0; n < l; ) {
      var u = Ql[n];
      Ql[n++] = null;
      var c = Ql[n];
      Ql[n++] = null;
      var s = Ql[n];
      Ql[n++] = null;
      var r = Ql[n];
      if (Ql[n++] = null, c !== null && s !== null) {
        var m = c.pending;
        m === null ? s.next = s : (s.next = m.next, m.next = s), c.pending = s;
      }
      r !== 0 && Kc(u, s, r);
    }
  }
  function Ku(l, n, u, c) {
    Ql[Ju++] = l, Ql[Ju++] = n, Ql[Ju++] = u, Ql[Ju++] = c, mn |= c, l.lanes |= c, l = l.alternate, l !== null && (l.lanes |= c);
  }
  function Jc(l, n, u, c) {
    return Ku(l, n, u, c), Tf(l);
  }
  function yn(l, n) {
    return Ku(l, null, null, n), Tf(l);
  }
  function Kc(l, n, u) {
    l.lanes |= u;
    var c = l.alternate;
    c !== null && (c.lanes |= u);
    for (var s = !1, r = l.return; r !== null; )
      r.childLanes |= u, c = r.alternate, c !== null && (c.childLanes |= u), r.tag === 22 && (l = r.stateNode, l === null || l._visibility & 1 || (s = !0)), l = r, r = r.return;
    return l.tag === 3 ? (r = l.stateNode, s && n !== null && (s = 31 - Vl(u), l = r.hiddenUpdates, c = l[s], c === null ? l[s] = [n] : c.push(n), n.lane = u | 536870912), r) : null;
  }
  function Tf(l) {
    if (50 < To)
      throw To = 0, Zm = null, Error(g(185));
    for (var n = l.return; n !== null; )
      l = n, n = l.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var kc = {};
  function Hp(l, n, u, c) {
    this.tag = l, this.key = u, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = c, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Zl(l, n, u, c) {
    return new Hp(l, n, u, c);
  }
  function xf(l) {
    return l = l.prototype, !(!l || !l.isReactComponent);
  }
  function ka(l, n) {
    var u = l.alternate;
    return u === null ? (u = Zl(
      l.tag,
      n,
      l.key,
      l.mode
    ), u.elementType = l.elementType, u.type = l.type, u.stateNode = l.stateNode, u.alternate = l, l.alternate = u) : (u.pendingProps = n, u.type = l.type, u.flags = 0, u.subtreeFlags = 0, u.deletions = null), u.flags = l.flags & 65011712, u.childLanes = l.childLanes, u.lanes = l.lanes, u.child = l.child, u.memoizedProps = l.memoizedProps, u.memoizedState = l.memoizedState, u.updateQueue = l.updateQueue, n = l.dependencies, u.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, u.sibling = l.sibling, u.index = l.index, u.ref = l.ref, u.refCleanup = l.refCleanup, u;
  }
  function Ue(l, n) {
    l.flags &= 65011714;
    var u = l.alternate;
    return u === null ? (l.childLanes = 0, l.lanes = n, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = u.childLanes, l.lanes = u.lanes, l.child = u.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = u.memoizedProps, l.memoizedState = u.memoizedState, l.updateQueue = u.updateQueue, l.type = u.type, n = u.dependencies, l.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), l;
  }
  function J(l, n, u, c, s, r) {
    var m = 0;
    if (c = l, typeof l == "function") xf(l) && (m = 1);
    else if (typeof l == "string")
      m = d0(
        l,
        u,
        je.current
      ) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else
      e: switch (l) {
        case ce:
          return l = Zl(31, u, n, s), l.elementType = ce, l.lanes = r, l;
        case Je:
          return Ra(u.children, s, r, n);
        case qt:
          m = 8, s |= 24;
          break;
        case lt:
          return l = Zl(12, u, n, s | 2), l.elementType = lt, l.lanes = r, l;
        case Zt:
          return l = Zl(13, u, n, s), l.elementType = Zt, l.lanes = r, l;
        case gt:
          return l = Zl(19, u, n, s), l.elementType = gt, l.lanes = r, l;
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case Ie:
              case st:
                m = 10;
                break e;
              case ol:
                m = 9;
                break e;
              case Bt:
                m = 11;
                break e;
              case Ne:
                m = 14;
                break e;
              case mt:
                m = 16, c = null;
                break e;
            }
          m = 29, u = Error(
            g(130, l === null ? "null" : typeof l, "")
          ), c = null;
      }
    return n = Zl(m, u, n, s), n.elementType = l, n.type = c, n.lanes = r, n;
  }
  function Ra(l, n, u, c) {
    return l = Zl(7, l, c, n), l.lanes = u, l;
  }
  function $c(l, n, u) {
    return l = Zl(6, l, null, n), l.lanes = u, l;
  }
  function Et(l, n, u) {
    return n = Zl(
      4,
      l.children !== null ? l.children : [],
      l.key,
      n
    ), n.lanes = u, n.stateNode = {
      containerInfo: l.containerInfo,
      pendingChildren: null,
      implementation: l.implementation
    }, n;
  }
  var ku = [], $u = 0, Ef = null, Wc = 0, za = [], Ll = 0, iu = null, $a = 1, Ot = "";
  function Xe(l, n) {
    ku[$u++] = Wc, ku[$u++] = Ef, Ef = l, Wc = n;
  }
  function sr(l, n, u) {
    za[Ll++] = $a, za[Ll++] = Ot, za[Ll++] = iu, iu = l;
    var c = $a;
    l = Ot;
    var s = 32 - Vl(c) - 1;
    c &= ~(1 << s), u += 1;
    var r = 32 - Vl(n) + s;
    if (30 < r) {
      var m = s - s % 5;
      r = (c & (1 << m) - 1).toString(32), c >>= m, s -= m, $a = 1 << 32 - Vl(n) + s | u << s | c, Ot = r + l;
    } else
      $a = 1 << r | u << s | c, Ot = l;
  }
  function Ki(l) {
    l.return !== null && (Xe(l, 1), sr(l, 1, 0));
  }
  function pn(l) {
    for (; l === Ef; )
      Ef = ku[--$u], ku[$u] = null, Wc = ku[--$u], ku[$u] = null;
    for (; l === iu; )
      iu = za[--Ll], za[Ll] = null, Ot = za[--Ll], za[Ll] = null, $a = za[--Ll], za[Ll] = null;
  }
  var wt = null, Ke = null, Le = !1, Da = null, Oa = !1, ki = Error(g(519));
  function cu(l) {
    var n = Error(g(418, ""));
    throw Pc(ca(n, l)), ki;
  }
  function Af(l) {
    var n = l.stateNode, u = l.type, c = l.memoizedProps;
    switch (n[el] = l, n[Cl] = c, u) {
      case "dialog":
        Ae("cancel", n), Ae("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        Ae("load", n);
        break;
      case "video":
      case "audio":
        for (u = 0; u < fs.length; u++)
          Ae(fs[u], n);
        break;
      case "source":
        Ae("error", n);
        break;
      case "img":
      case "image":
      case "link":
        Ae("error", n), Ae("load", n);
        break;
      case "details":
        Ae("toggle", n);
        break;
      case "input":
        Ae("invalid", n), ks(
          n,
          c.value,
          c.defaultValue,
          c.checked,
          c.defaultChecked,
          c.type,
          c.name,
          !0
        ), Yu(n);
        break;
      case "select":
        Ae("invalid", n);
        break;
      case "textarea":
        Ae("invalid", n), bh(n, c.value, c.defaultValue, c.children), Yu(n);
    }
    u = c.children, typeof u != "string" && typeof u != "number" && typeof u != "bigint" || n.textContent === "" + u || c.suppressHydrationWarning === !0 || ny(n.textContent, u) ? (c.popover != null && (Ae("beforetoggle", n), Ae("toggle", n)), c.onScroll != null && Ae("scroll", n), c.onScrollEnd != null && Ae("scrollend", n), c.onClick != null && (n.onclick = Sd), n = !0) : n = !1, n || cu(l);
  }
  function Lh(l) {
    for (wt = l.return; wt; )
      switch (wt.tag) {
        case 5:
        case 13:
          Oa = !1;
          return;
        case 27:
        case 3:
          Oa = !0;
          return;
        default:
          wt = wt.return;
      }
  }
  function Fc(l) {
    if (l !== wt) return !1;
    if (!Le) return Lh(l), Le = !0, !1;
    var n = l.tag, u;
    if ((u = n !== 3 && n !== 27) && ((u = n === 5) && (u = l.type, u = !(u !== "form" && u !== "button") || qn(l.type, l.memoizedProps)), u = !u), u && Ke && cu(l), Lh(l), n === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(g(317));
      e: {
        for (l = l.nextSibling, n = 0; l; ) {
          if (l.nodeType === 8)
            if (u = l.data, u === "/$") {
              if (n === 0) {
                Ke = tn(l.nextSibling);
                break e;
              }
              n--;
            } else
              u !== "$" && u !== "$!" && u !== "$?" || n++;
          l = l.nextSibling;
        }
        Ke = null;
      }
    } else
      n === 27 ? (n = Ke, hi(l.type) ? (l = mi, mi = null, Ke = l) : Ke = n) : Ke = wt ? tn(l.stateNode.nextSibling) : null;
    return !0;
  }
  function Ic() {
    Ke = wt = null, Le = !1;
  }
  function Jh() {
    var l = Da;
    return l !== null && (Fl === null ? Fl = l : Fl.push.apply(
      Fl,
      l
    ), Da = null), l;
  }
  function Pc(l) {
    Da === null ? Da = [l] : Da.push(l);
  }
  var Rf = k(null), ou = null, Wa = null;
  function fu(l, n, u) {
    me(Rf, n._currentValue), n._currentValue = u;
  }
  function vn(l) {
    l._currentValue = Rf.current, I(Rf);
  }
  function rr(l, n, u) {
    for (; l !== null; ) {
      var c = l.alternate;
      if ((l.childLanes & n) !== n ? (l.childLanes |= n, c !== null && (c.childLanes |= n)) : c !== null && (c.childLanes & n) !== n && (c.childLanes |= n), l === u) break;
      l = l.return;
    }
  }
  function Kh(l, n, u, c) {
    var s = l.child;
    for (s !== null && (s.return = l); s !== null; ) {
      var r = s.dependencies;
      if (r !== null) {
        var m = s.child;
        r = r.firstContext;
        e: for (; r !== null; ) {
          var y = r;
          r = s;
          for (var b = 0; b < n.length; b++)
            if (y.context === n[b]) {
              r.lanes |= u, y = r.alternate, y !== null && (y.lanes |= u), rr(
                r.return,
                u,
                l
              ), c || (m = null);
              break e;
            }
          r = y.next;
        }
      } else if (s.tag === 18) {
        if (m = s.return, m === null) throw Error(g(341));
        m.lanes |= u, r = m.alternate, r !== null && (r.lanes |= u), rr(m, u, l), m = null;
      } else m = s.child;
      if (m !== null) m.return = s;
      else
        for (m = s; m !== null; ) {
          if (m === l) {
            m = null;
            break;
          }
          if (s = m.sibling, s !== null) {
            s.return = m.return, m = s;
            break;
          }
          m = m.return;
        }
      s = m;
    }
  }
  function eo(l, n, u, c) {
    l = null;
    for (var s = n, r = !1; s !== null; ) {
      if (!r) {
        if ((s.flags & 524288) !== 0) r = !0;
        else if ((s.flags & 262144) !== 0) break;
      }
      if (s.tag === 10) {
        var m = s.alternate;
        if (m === null) throw Error(g(387));
        if (m = m.memoizedProps, m !== null) {
          var y = s.type;
          dl(s.pendingProps.value, m.value) || (l !== null ? l.push(y) : l = [y]);
        }
      } else if (s === Cu.current) {
        if (m = s.alternate, m === null) throw Error(g(387));
        m.memoizedState.memoizedState !== s.memoizedState.memoizedState && (l !== null ? l.push(ta) : l = [ta]);
      }
      s = s.return;
    }
    l !== null && Kh(
      n,
      l,
      u,
      c
    ), n.flags |= 262144;
  }
  function zf(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!dl(
        l.context._currentValue,
        l.memoizedValue
      ))
        return !0;
      l = l.next;
    }
    return !1;
  }
  function Wu(l) {
    ou = l, Wa = null, l = l.dependencies, l !== null && (l.firstContext = null);
  }
  function tl(l) {
    return kh(ou, l);
  }
  function Df(l, n) {
    return ou === null && Wu(l), kh(l, n);
  }
  function kh(l, n) {
    var u = n._currentValue;
    if (n = { context: n, memoizedValue: u, next: null }, Wa === null) {
      if (l === null) throw Error(g(308));
      Wa = n, l.dependencies = { lanes: 0, firstContext: n }, l.flags |= 524288;
    } else Wa = Wa.next = n;
    return u;
  }
  var to = typeof AbortController < "u" ? AbortController : function() {
    var l = [], n = this.signal = {
      aborted: !1,
      addEventListener: function(u, c) {
        l.push(c);
      }
    };
    this.abort = function() {
      n.aborted = !0, l.forEach(function(u) {
        return u();
      });
    };
  }, dr = A.unstable_scheduleCallback, Np = A.unstable_NormalPriority, Kt = {
    $$typeof: st,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function lo() {
    return {
      controller: new to(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function gn(l) {
    l.refCount--, l.refCount === 0 && dr(Np, function() {
      l.controller.abort();
    });
  }
  var Fu = null, Of = 0, Ma = 0, kt = null;
  function hr(l, n) {
    if (Fu === null) {
      var u = Fu = [];
      Of = 0, Ma = pc(), kt = {
        status: "pending",
        value: void 0,
        then: function(c) {
          u.push(c);
        }
      };
    }
    return Of++, n.then(mr, mr), n;
  }
  function mr() {
    if (--Of === 0 && Fu !== null) {
      kt !== null && (kt.status = "fulfilled");
      var l = Fu;
      Fu = null, Ma = 0, kt = null;
      for (var n = 0; n < l.length; n++) (0, l[n])();
    }
  }
  function jp(l, n) {
    var u = [], c = {
      status: "pending",
      value: null,
      reason: null,
      then: function(s) {
        u.push(s);
      }
    };
    return l.then(
      function() {
        c.status = "fulfilled", c.value = n;
        for (var s = 0; s < u.length; s++) (0, u[s])(n);
      },
      function(s) {
        for (c.status = "rejected", c.reason = s, s = 0; s < u.length; s++)
          (0, u[s])(void 0);
      }
    ), c;
  }
  var yr = z.S;
  z.S = function(l, n) {
    typeof n == "object" && n !== null && typeof n.then == "function" && hr(l, n), yr !== null && yr(l, n);
  };
  var bn = k(null);
  function Mf() {
    var l = bn.current;
    return l !== null ? l : ft.pooledCache;
  }
  function $i(l, n) {
    n === null ? me(bn, bn.current) : me(bn, n.pool);
  }
  function pr() {
    var l = Mf();
    return l === null ? null : { parent: Kt._currentValue, pool: l };
  }
  var Iu = Error(g(460)), vr = Error(g(474)), Uf = Error(g(542)), gr = { then: function() {
  } };
  function br(l) {
    return l = l.status, l === "fulfilled" || l === "rejected";
  }
  function Cf() {
  }
  function $h(l, n, u) {
    switch (u = l[u], u === void 0 ? l.push(n) : u !== n && (n.then(Cf, Cf), n = u), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw l = n.reason, Fh(l), l;
      default:
        if (typeof n.status == "string") n.then(Cf, Cf);
        else {
          if (l = ft, l !== null && 100 < l.shellSuspendCounter)
            throw Error(g(482));
          l = n, l.status = "pending", l.then(
            function(c) {
              if (n.status === "pending") {
                var s = n;
                s.status = "fulfilled", s.value = c;
              }
            },
            function(c) {
              if (n.status === "pending") {
                var s = n;
                s.status = "rejected", s.reason = c;
              }
            }
          );
        }
        switch (n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw l = n.reason, Fh(l), l;
        }
        throw Wi = n, Iu;
    }
  }
  var Wi = null;
  function Wh() {
    if (Wi === null) throw Error(g(459));
    var l = Wi;
    return Wi = null, l;
  }
  function Fh(l) {
    if (l === Iu || l === Uf)
      throw Error(g(483));
  }
  var Sn = !1;
  function Sr(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Tr(l, n) {
    l = l.updateQueue, n.updateQueue === l && (n.updateQueue = {
      baseState: l.baseState,
      firstBaseUpdate: l.firstBaseUpdate,
      lastBaseUpdate: l.lastBaseUpdate,
      shared: l.shared,
      callbacks: null
    });
  }
  function Jl(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function Tn(l, n, u) {
    var c = l.updateQueue;
    if (c === null) return null;
    if (c = c.shared, (et & 2) !== 0) {
      var s = c.pending;
      return s === null ? n.next = n : (n.next = s.next, s.next = n), c.pending = n, n = Tf(l), Kc(l, null, u), n;
    }
    return Ku(l, c, n, u), Tf(l);
  }
  function Fi(l, n, u) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (u & 4194048) !== 0)) {
      var c = n.lanes;
      c &= l.pendingLanes, u |= c, n.lanes = u, lf(l, u);
    }
  }
  function Ih(l, n) {
    var u = l.updateQueue, c = l.alternate;
    if (c !== null && (c = c.updateQueue, u === c)) {
      var s = null, r = null;
      if (u = u.firstBaseUpdate, u !== null) {
        do {
          var m = {
            lane: u.lane,
            tag: u.tag,
            payload: u.payload,
            callback: null,
            next: null
          };
          r === null ? s = r = m : r = r.next = m, u = u.next;
        } while (u !== null);
        r === null ? s = r = n : r = r.next = n;
      } else s = r = n;
      u = {
        baseState: c.baseState,
        firstBaseUpdate: s,
        lastBaseUpdate: r,
        shared: c.shared,
        callbacks: c.callbacks
      }, l.updateQueue = u;
      return;
    }
    l = u.lastBaseUpdate, l === null ? u.firstBaseUpdate = n : l.next = n, u.lastBaseUpdate = n;
  }
  var Ph = !1;
  function ao() {
    if (Ph) {
      var l = kt;
      if (l !== null) throw l;
    }
  }
  function su(l, n, u, c) {
    Ph = !1;
    var s = l.updateQueue;
    Sn = !1;
    var r = s.firstBaseUpdate, m = s.lastBaseUpdate, y = s.shared.pending;
    if (y !== null) {
      s.shared.pending = null;
      var b = y, M = b.next;
      b.next = null, m === null ? r = M : m.next = M, m = b;
      var G = l.alternate;
      G !== null && (G = G.updateQueue, y = G.lastBaseUpdate, y !== m && (y === null ? G.firstBaseUpdate = M : y.next = M, G.lastBaseUpdate = b));
    }
    if (r !== null) {
      var X = s.baseState;
      m = 0, G = M = b = null, y = r;
      do {
        var C = y.lane & -536870913, N = C !== y.lane;
        if (N ? (Be & C) === C : (c & C) === C) {
          C !== 0 && C === Ma && (Ph = !0), G !== null && (G = G.next = {
            lane: 0,
            tag: y.tag,
            payload: y.payload,
            callback: null,
            next: null
          });
          e: {
            var de = l, he = y;
            C = n;
            var $e = u;
            switch (he.tag) {
              case 1:
                if (de = he.payload, typeof de == "function") {
                  X = de.call($e, X, C);
                  break e;
                }
                X = de;
                break e;
              case 3:
                de.flags = de.flags & -65537 | 128;
              case 0:
                if (de = he.payload, C = typeof de == "function" ? de.call($e, X, C) : de, C == null) break e;
                X = F({}, X, C);
                break e;
              case 2:
                Sn = !0;
            }
          }
          C = y.callback, C !== null && (l.flags |= 64, N && (l.flags |= 8192), N = s.callbacks, N === null ? s.callbacks = [C] : N.push(C));
        } else
          N = {
            lane: C,
            tag: y.tag,
            payload: y.payload,
            callback: y.callback,
            next: null
          }, G === null ? (M = G = N, b = X) : G = G.next = N, m |= C;
        if (y = y.next, y === null) {
          if (y = s.shared.pending, y === null)
            break;
          N = y, y = N.next, N.next = null, s.lastBaseUpdate = N, s.shared.pending = null;
        }
      } while (!0);
      G === null && (b = X), s.baseState = b, s.firstBaseUpdate = M, s.lastBaseUpdate = G, r === null && (s.shared.lanes = 0), vu |= m, l.lanes = m, l.memoizedState = X;
    }
  }
  function xr(l, n) {
    if (typeof l != "function")
      throw Error(g(191, l));
    l.call(n);
  }
  function Hf(l, n) {
    var u = l.callbacks;
    if (u !== null)
      for (l.callbacks = null, l = 0; l < u.length; l++)
        xr(u[l], n);
  }
  var Ii = k(null), Nf = k(0);
  function ll(l, n) {
    l = pu, me(Nf, l), me(Ii, n), pu = l | n.baseLanes;
  }
  function no() {
    me(Nf, pu), me(Ii, Ii.current);
  }
  function uo() {
    pu = Nf.current, I(Ii), I(Nf);
  }
  var Ua = 0, Ee = null, Pe = null, At = null, jf = !1, oa = !1, Pu = !1, Fa = 0, fa = 0, ru = null, em = 0;
  function Rt() {
    throw Error(g(321));
  }
  function Er(l, n) {
    if (n === null) return !1;
    for (var u = 0; u < n.length && u < l.length; u++)
      if (!dl(l[u], n[u])) return !1;
    return !0;
  }
  function Ar(l, n, u, c, s, r) {
    return Ua = r, Ee = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, z.H = l === null || l.memoizedState === null ? ym : pm, Pu = !1, r = u(c, s), Pu = !1, oa && (r = tm(
      n,
      u,
      c,
      s
    )), ei(l), r;
  }
  function ei(l) {
    z.H = Vr;
    var n = Pe !== null && Pe.next !== null;
    if (Ua = 0, At = Pe = Ee = null, jf = !1, fa = 0, ru = null, n) throw Error(g(300));
    l === null || $t || (l = l.dependencies, l !== null && zf(l) && ($t = !0));
  }
  function tm(l, n, u, c) {
    Ee = l;
    var s = 0;
    do {
      if (oa && (ru = null), fa = 0, oa = !1, 25 <= s) throw Error(g(301));
      if (s += 1, At = Pe = null, l.updateQueue != null) {
        var r = l.updateQueue;
        r.lastEffect = null, r.events = null, r.stores = null, r.memoCache != null && (r.memoCache.index = 0);
      }
      z.H = du, r = n(u, c);
    } while (oa);
    return r;
  }
  function _p() {
    var l = z.H, n = l.useState()[0];
    return n = typeof n.then == "function" ? qf(n) : n, l = l.useState()[0], (Pe !== null ? Pe.memoizedState : null) !== l && (Ee.flags |= 1024), n;
  }
  function Rr() {
    var l = Fa !== 0;
    return Fa = 0, l;
  }
  function io(l, n, u) {
    n.updateQueue = l.updateQueue, n.flags &= -2053, l.lanes &= ~u;
  }
  function zr(l) {
    if (jf) {
      for (l = l.memoizedState; l !== null; ) {
        var n = l.queue;
        n !== null && (n.pending = null), l = l.next;
      }
      jf = !1;
    }
    Ua = 0, At = Pe = Ee = null, oa = !1, fa = Fa = 0, ru = null;
  }
  function El() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return At === null ? Ee.memoizedState = At = l : At = At.next = l, At;
  }
  function Mt() {
    if (Pe === null) {
      var l = Ee.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = Pe.next;
    var n = At === null ? Ee.memoizedState : At.next;
    if (n !== null)
      At = n, Pe = l;
    else {
      if (l === null)
        throw Ee.alternate === null ? Error(g(467)) : Error(g(310));
      Pe = l, l = {
        memoizedState: Pe.memoizedState,
        baseState: Pe.baseState,
        baseQueue: Pe.baseQueue,
        queue: Pe.queue,
        next: null
      }, At === null ? Ee.memoizedState = At = l : At = At.next = l;
    }
    return At;
  }
  function _f() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function qf(l) {
    var n = fa;
    return fa += 1, ru === null && (ru = []), l = $h(ru, l, n), n = Ee, (At === null ? n.memoizedState : At.next) === null && (n = n.alternate, z.H = n === null || n.memoizedState === null ? ym : pm), l;
  }
  function Vt(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return qf(l);
      if (l.$$typeof === st) return tl(l);
    }
    throw Error(g(438, String(l)));
  }
  function Dr(l) {
    var n = null, u = Ee.updateQueue;
    if (u !== null && (n = u.memoCache), n == null) {
      var c = Ee.alternate;
      c !== null && (c = c.updateQueue, c !== null && (c = c.memoCache, c != null && (n = {
        data: c.data.map(function(s) {
          return s.slice();
        }),
        index: 0
      })));
    }
    if (n == null && (n = { data: [], index: 0 }), u === null && (u = _f(), Ee.updateQueue = u), u.memoCache = n, u = n.data[n.index], u === void 0)
      for (u = n.data[n.index] = Array(l), c = 0; c < l; c++)
        u[c] = rt;
    return n.index++, u;
  }
  function xn(l, n) {
    return typeof n == "function" ? n(l) : n;
  }
  function Bf(l) {
    var n = Mt();
    return Or(n, Pe, l);
  }
  function Or(l, n, u) {
    var c = l.queue;
    if (c === null) throw Error(g(311));
    c.lastRenderedReducer = u;
    var s = l.baseQueue, r = c.pending;
    if (r !== null) {
      if (s !== null) {
        var m = s.next;
        s.next = r.next, r.next = m;
      }
      n.baseQueue = s = r, c.pending = null;
    }
    if (r = l.baseState, s === null) l.memoizedState = r;
    else {
      n = s.next;
      var y = m = null, b = null, M = n, G = !1;
      do {
        var X = M.lane & -536870913;
        if (X !== M.lane ? (Be & X) === X : (Ua & X) === X) {
          var C = M.revertLane;
          if (C === 0)
            b !== null && (b = b.next = {
              lane: 0,
              revertLane: 0,
              action: M.action,
              hasEagerState: M.hasEagerState,
              eagerState: M.eagerState,
              next: null
            }), X === Ma && (G = !0);
          else if ((Ua & C) === C) {
            M = M.next, C === Ma && (G = !0);
            continue;
          } else
            X = {
              lane: 0,
              revertLane: M.revertLane,
              action: M.action,
              hasEagerState: M.hasEagerState,
              eagerState: M.eagerState,
              next: null
            }, b === null ? (y = b = X, m = r) : b = b.next = X, Ee.lanes |= C, vu |= C;
          X = M.action, Pu && u(r, X), r = M.hasEagerState ? M.eagerState : u(r, X);
        } else
          C = {
            lane: X,
            revertLane: M.revertLane,
            action: M.action,
            hasEagerState: M.hasEagerState,
            eagerState: M.eagerState,
            next: null
          }, b === null ? (y = b = C, m = r) : b = b.next = C, Ee.lanes |= X, vu |= X;
        M = M.next;
      } while (M !== null && M !== n);
      if (b === null ? m = r : b.next = y, !dl(r, l.memoizedState) && ($t = !0, G && (u = kt, u !== null)))
        throw u;
      l.memoizedState = r, l.baseState = m, l.baseQueue = b, c.lastRenderedState = r;
    }
    return s === null && (c.lanes = 0), [l.memoizedState, c.dispatch];
  }
  function Mr(l) {
    var n = Mt(), u = n.queue;
    if (u === null) throw Error(g(311));
    u.lastRenderedReducer = l;
    var c = u.dispatch, s = u.pending, r = n.memoizedState;
    if (s !== null) {
      u.pending = null;
      var m = s = s.next;
      do
        r = l(r, m.action), m = m.next;
      while (m !== s);
      dl(r, n.memoizedState) || ($t = !0), n.memoizedState = r, n.baseQueue === null && (n.baseState = r), u.lastRenderedState = r;
    }
    return [r, c];
  }
  function Yf(l, n, u) {
    var c = Ee, s = Mt(), r = Le;
    if (r) {
      if (u === void 0) throw Error(g(407));
      u = u();
    } else u = n();
    var m = !dl(
      (Pe || s).memoizedState,
      u
    );
    m && (s.memoizedState = u, $t = !0), s = s.queue;
    var y = am.bind(null, c, s, l);
    if (it(2048, 8, y, [l]), s.getSnapshot !== n || m || At !== null && At.memoizedState.tag & 1) {
      if (c.flags |= 2048, Kl(
        9,
        Vf(),
        lm.bind(
          null,
          c,
          s,
          u,
          n
        ),
        null
      ), ft === null) throw Error(g(349));
      r || (Ua & 124) !== 0 || Ur(c, n, u);
    }
    return u;
  }
  function Ur(l, n, u) {
    l.flags |= 16384, l = { getSnapshot: n, value: u }, n = Ee.updateQueue, n === null ? (n = _f(), Ee.updateQueue = n, n.stores = [l]) : (u = n.stores, u === null ? n.stores = [l] : u.push(l));
  }
  function lm(l, n, u, c) {
    n.value = u, n.getSnapshot = c, nm(n) && Cr(l);
  }
  function am(l, n, u) {
    return u(function() {
      nm(n) && Cr(l);
    });
  }
  function nm(l) {
    var n = l.getSnapshot;
    l = l.value;
    try {
      var u = n();
      return !dl(l, u);
    } catch {
      return !0;
    }
  }
  function Cr(l) {
    var n = yn(l, 2);
    n !== null && da(n, l, 2);
  }
  function wf(l) {
    var n = El();
    if (typeof l == "function") {
      var u = l;
      if (l = u(), Pu) {
        Fn(!0);
        try {
          u();
        } finally {
          Fn(!1);
        }
      }
    }
    return n.memoizedState = n.baseState = l, n.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: xn,
      lastRenderedState: l
    }, n;
  }
  function Hr(l, n, u, c) {
    return l.baseState = u, Or(
      l,
      Pe,
      typeof c == "function" ? c : xn
    );
  }
  function qp(l, n, u, c, s) {
    if (lc(l)) throw Error(g(485));
    if (l = n.action, l !== null) {
      var r = {
        payload: s,
        action: l,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(m) {
          r.listeners.push(m);
        }
      };
      z.T !== null ? u(!0) : r.isTransition = !1, c(r), u = n.pending, u === null ? (r.next = n.pending = r, Nr(n, r)) : (r.next = u.next, n.pending = u.next = r);
    }
  }
  function Nr(l, n) {
    var u = n.action, c = n.payload, s = l.state;
    if (n.isTransition) {
      var r = z.T, m = {};
      z.T = m;
      try {
        var y = u(s, c), b = z.S;
        b !== null && b(m, y), Gf(l, n, y);
      } catch (M) {
        _r(l, n, M);
      } finally {
        z.T = r;
      }
    } else
      try {
        r = u(s, c), Gf(l, n, r);
      } catch (M) {
        _r(l, n, M);
      }
  }
  function Gf(l, n, u) {
    u !== null && typeof u == "object" && typeof u.then == "function" ? u.then(
      function(c) {
        jr(l, n, c);
      },
      function(c) {
        return _r(l, n, c);
      }
    ) : jr(l, n, u);
  }
  function jr(l, n, u) {
    n.status = "fulfilled", n.value = u, um(n), l.state = u, n = l.pending, n !== null && (u = n.next, u === n ? l.pending = null : (u = u.next, n.next = u, Nr(l, u)));
  }
  function _r(l, n, u) {
    var c = l.pending;
    if (l.pending = null, c !== null) {
      c = c.next;
      do
        n.status = "rejected", n.reason = u, um(n), n = n.next;
      while (n !== c);
    }
    l.action = null;
  }
  function um(l) {
    l = l.listeners;
    for (var n = 0; n < l.length; n++) (0, l[n])();
  }
  function qr(l, n) {
    return n;
  }
  function im(l, n) {
    if (Le) {
      var u = ft.formState;
      if (u !== null) {
        e: {
          var c = Ee;
          if (Le) {
            if (Ke) {
              t: {
                for (var s = Ke, r = Oa; s.nodeType !== 8; ) {
                  if (!r) {
                    s = null;
                    break t;
                  }
                  if (s = tn(
                    s.nextSibling
                  ), s === null) {
                    s = null;
                    break t;
                  }
                }
                r = s.data, s = r === "F!" || r === "F" ? s : null;
              }
              if (s) {
                Ke = tn(
                  s.nextSibling
                ), c = s.data === "F!";
                break e;
              }
            }
            cu(c);
          }
          c = !1;
        }
        c && (n = u[0]);
      }
    }
    return u = El(), u.memoizedState = u.baseState = n, c = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: qr,
      lastRenderedState: n
    }, u.queue = c, u = hm.bind(
      null,
      Ee,
      c
    ), c.dispatch = u, c = wf(!1), r = Zf.bind(
      null,
      Ee,
      !1,
      c.queue
    ), c = El(), s = {
      state: n,
      dispatch: null,
      action: l,
      pending: null
    }, c.queue = s, u = qp.bind(
      null,
      Ee,
      s,
      r,
      u
    ), s.dispatch = u, c.memoizedState = l, [n, u, !1];
  }
  function En(l) {
    var n = Mt();
    return Br(n, Pe, l);
  }
  function Br(l, n, u) {
    if (n = Or(
      l,
      n,
      qr
    )[0], l = Bf(xn)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var c = qf(n);
      } catch (m) {
        throw m === Iu ? Uf : m;
      }
    else c = n;
    n = Mt();
    var s = n.queue, r = s.dispatch;
    return u !== n.memoizedState && (Ee.flags |= 2048, Kl(
      9,
      Vf(),
      pv.bind(null, s, u),
      null
    )), [c, r, l];
  }
  function pv(l, n) {
    l.action = n;
  }
  function Yr(l) {
    var n = Mt(), u = Pe;
    if (u !== null)
      return Br(n, u, l);
    Mt(), n = n.memoizedState, u = Mt();
    var c = u.queue.dispatch;
    return u.memoizedState = l, [n, c, !1];
  }
  function Kl(l, n, u, c) {
    return l = { tag: l, create: u, deps: c, inst: n, next: null }, n = Ee.updateQueue, n === null && (n = _f(), Ee.updateQueue = n), u = n.lastEffect, u === null ? n.lastEffect = l.next = l : (c = u.next, u.next = l, l.next = c, n.lastEffect = l), l;
  }
  function Vf() {
    return { destroy: void 0, resource: void 0 };
  }
  function Xf() {
    return Mt().memoizedState;
  }
  function ti(l, n, u, c) {
    var s = El();
    c = c === void 0 ? null : c, Ee.flags |= l, s.memoizedState = Kl(
      1 | n,
      Vf(),
      u,
      c
    );
  }
  function it(l, n, u, c) {
    var s = Mt();
    c = c === void 0 ? null : c;
    var r = s.memoizedState.inst;
    Pe !== null && c !== null && Er(c, Pe.memoizedState.deps) ? s.memoizedState = Kl(n, r, u, c) : (Ee.flags |= l, s.memoizedState = Kl(
      1 | n,
      r,
      u,
      c
    ));
  }
  function Bp(l, n) {
    ti(8390656, 8, l, n);
  }
  function Yp(l, n) {
    it(2048, 8, l, n);
  }
  function cm(l, n) {
    return it(4, 2, l, n);
  }
  function Ia(l, n) {
    return it(4, 4, l, n);
  }
  function om(l, n) {
    if (typeof n == "function") {
      l = l();
      var u = n(l);
      return function() {
        typeof u == "function" ? u() : n(null);
      };
    }
    if (n != null)
      return l = l(), n.current = l, function() {
        n.current = null;
      };
  }
  function wr(l, n, u) {
    u = u != null ? u.concat([l]) : null, it(4, 4, om.bind(null, n, l), u);
  }
  function Pi() {
  }
  function ec(l, n) {
    var u = Mt();
    n = n === void 0 ? null : n;
    var c = u.memoizedState;
    return n !== null && Er(n, c[1]) ? c[0] : (u.memoizedState = [l, n], l);
  }
  function fm(l, n) {
    var u = Mt();
    n = n === void 0 ? null : n;
    var c = u.memoizedState;
    if (n !== null && Er(n, c[1]))
      return c[0];
    if (c = l(), Pu) {
      Fn(!0);
      try {
        l();
      } finally {
        Fn(!1);
      }
    }
    return u.memoizedState = [c, n], c;
  }
  function Qf(l, n, u) {
    return u === void 0 || (Ua & 1073741824) !== 0 ? l.memoizedState = n : (l.memoizedState = u, l = Lm(), Ee.lanes |= l, vu |= l, u);
  }
  function sm(l, n, u, c) {
    return dl(u, n) ? u : Ii.current !== null ? (l = Qf(l, u, c), dl(l, n) || ($t = !0), l) : (Ua & 42) === 0 ? ($t = !0, l.memoizedState = u) : (l = Lm(), Ee.lanes |= l, vu |= l, n);
  }
  function wp(l, n, u, c, s) {
    var r = Z.p;
    Z.p = r !== 0 && 8 > r ? r : 8;
    var m = z.T, y = {};
    z.T = y, Zf(l, !1, n, u);
    try {
      var b = s(), M = z.S;
      if (M !== null && M(y, b), b !== null && typeof b == "object" && typeof b.then == "function") {
        var G = jp(
          b,
          c
        );
        tc(
          l,
          n,
          G,
          ra(l)
        );
      } else
        tc(
          l,
          n,
          c,
          ra(l)
        );
    } catch (X) {
      tc(
        l,
        n,
        { then: function() {
        }, status: "rejected", reason: X },
        ra()
      );
    } finally {
      Z.p = r, z.T = m;
    }
  }
  function vv() {
  }
  function Gr(l, n, u, c) {
    if (l.tag !== 5) throw Error(g(476));
    var s = Gp(l).queue;
    wp(
      l,
      s,
      n,
      W,
      u === null ? vv : function() {
        return co(l), u(c);
      }
    );
  }
  function Gp(l) {
    var n = l.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: W,
      baseState: W,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: xn,
        lastRenderedState: W
      },
      next: null
    };
    var u = {};
    return n.next = {
      memoizedState: u,
      baseState: u,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: xn,
        lastRenderedState: u
      },
      next: null
    }, l.memoizedState = n, l = l.alternate, l !== null && (l.memoizedState = n), n;
  }
  function co(l) {
    var n = Gp(l).next.queue;
    tc(l, n, {}, ra());
  }
  function Ca() {
    return tl(ta);
  }
  function rm() {
    return Mt().memoizedState;
  }
  function Vp() {
    return Mt().memoizedState;
  }
  function Xp(l) {
    for (var n = l.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var u = ra();
          l = Jl(u);
          var c = Tn(n, l, u);
          c !== null && (da(c, n, u), Fi(c, n, u)), n = { cache: lo() }, l.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function dm(l, n, u) {
    var c = ra();
    u = {
      lane: c,
      revertLane: 0,
      action: u,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, lc(l) ? Qp(n, u) : (u = Jc(l, n, u, c), u !== null && (da(u, l, c), mm(u, n, c)));
  }
  function hm(l, n, u) {
    var c = ra();
    tc(l, n, u, c);
  }
  function tc(l, n, u, c) {
    var s = {
      lane: c,
      revertLane: 0,
      action: u,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (lc(l)) Qp(n, s);
    else {
      var r = l.alternate;
      if (l.lanes === 0 && (r === null || r.lanes === 0) && (r = n.lastRenderedReducer, r !== null))
        try {
          var m = n.lastRenderedState, y = r(m, u);
          if (s.hasEagerState = !0, s.eagerState = y, dl(y, m))
            return Ku(l, n, s, 0), ft === null && Ka(), !1;
        } catch {
        } finally {
        }
      if (u = Jc(l, n, s, c), u !== null)
        return da(u, l, c), mm(u, n, c), !0;
    }
    return !1;
  }
  function Zf(l, n, u, c) {
    if (c = {
      lane: 2,
      revertLane: pc(),
      action: c,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, lc(l)) {
      if (n) throw Error(g(479));
    } else
      n = Jc(
        l,
        u,
        c,
        2
      ), n !== null && da(n, l, 2);
  }
  function lc(l) {
    var n = l.alternate;
    return l === Ee || n !== null && n === Ee;
  }
  function Qp(l, n) {
    oa = jf = !0;
    var u = l.pending;
    u === null ? n.next = n : (n.next = u.next, u.next = n), l.pending = n;
  }
  function mm(l, n, u) {
    if ((u & 4194048) !== 0) {
      var c = n.lanes;
      c &= l.pendingLanes, u |= c, n.lanes = u, lf(l, u);
    }
  }
  var Vr = {
    readContext: tl,
    use: Vt,
    useCallback: Rt,
    useContext: Rt,
    useEffect: Rt,
    useImperativeHandle: Rt,
    useLayoutEffect: Rt,
    useInsertionEffect: Rt,
    useMemo: Rt,
    useReducer: Rt,
    useRef: Rt,
    useState: Rt,
    useDebugValue: Rt,
    useDeferredValue: Rt,
    useTransition: Rt,
    useSyncExternalStore: Rt,
    useId: Rt,
    useHostTransitionStatus: Rt,
    useFormState: Rt,
    useActionState: Rt,
    useOptimistic: Rt,
    useMemoCache: Rt,
    useCacheRefresh: Rt
  }, ym = {
    readContext: tl,
    use: Vt,
    useCallback: function(l, n) {
      return El().memoizedState = [
        l,
        n === void 0 ? null : n
      ], l;
    },
    useContext: tl,
    useEffect: Bp,
    useImperativeHandle: function(l, n, u) {
      u = u != null ? u.concat([l]) : null, ti(
        4194308,
        4,
        om.bind(null, n, l),
        u
      );
    },
    useLayoutEffect: function(l, n) {
      return ti(4194308, 4, l, n);
    },
    useInsertionEffect: function(l, n) {
      ti(4, 2, l, n);
    },
    useMemo: function(l, n) {
      var u = El();
      n = n === void 0 ? null : n;
      var c = l();
      if (Pu) {
        Fn(!0);
        try {
          l();
        } finally {
          Fn(!1);
        }
      }
      return u.memoizedState = [c, n], c;
    },
    useReducer: function(l, n, u) {
      var c = El();
      if (u !== void 0) {
        var s = u(n);
        if (Pu) {
          Fn(!0);
          try {
            u(n);
          } finally {
            Fn(!1);
          }
        }
      } else s = n;
      return c.memoizedState = c.baseState = s, l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: l,
        lastRenderedState: s
      }, c.queue = l, l = l.dispatch = dm.bind(
        null,
        Ee,
        l
      ), [c.memoizedState, l];
    },
    useRef: function(l) {
      var n = El();
      return l = { current: l }, n.memoizedState = l;
    },
    useState: function(l) {
      l = wf(l);
      var n = l.queue, u = hm.bind(null, Ee, n);
      return n.dispatch = u, [l.memoizedState, u];
    },
    useDebugValue: Pi,
    useDeferredValue: function(l, n) {
      var u = El();
      return Qf(u, l, n);
    },
    useTransition: function() {
      var l = wf(!1);
      return l = wp.bind(
        null,
        Ee,
        l.queue,
        !0,
        !1
      ), El().memoizedState = l, [!1, l];
    },
    useSyncExternalStore: function(l, n, u) {
      var c = Ee, s = El();
      if (Le) {
        if (u === void 0)
          throw Error(g(407));
        u = u();
      } else {
        if (u = n(), ft === null)
          throw Error(g(349));
        (Be & 124) !== 0 || Ur(c, n, u);
      }
      s.memoizedState = u;
      var r = { value: u, getSnapshot: n };
      return s.queue = r, Bp(am.bind(null, c, r, l), [
        l
      ]), c.flags |= 2048, Kl(
        9,
        Vf(),
        lm.bind(
          null,
          c,
          r,
          u,
          n
        ),
        null
      ), u;
    },
    useId: function() {
      var l = El(), n = ft.identifierPrefix;
      if (Le) {
        var u = Ot, c = $a;
        u = (c & ~(1 << 32 - Vl(c) - 1)).toString(32) + u, n = "«" + n + "R" + u, u = Fa++, 0 < u && (n += "H" + u.toString(32)), n += "»";
      } else
        u = em++, n = "«" + n + "r" + u.toString(32) + "»";
      return l.memoizedState = n;
    },
    useHostTransitionStatus: Ca,
    useFormState: im,
    useActionState: im,
    useOptimistic: function(l) {
      var n = El();
      n.memoizedState = n.baseState = l;
      var u = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return n.queue = u, n = Zf.bind(
        null,
        Ee,
        !0,
        u
      ), u.dispatch = n, [l, n];
    },
    useMemoCache: Dr,
    useCacheRefresh: function() {
      return El().memoizedState = Xp.bind(
        null,
        Ee
      );
    }
  }, pm = {
    readContext: tl,
    use: Vt,
    useCallback: ec,
    useContext: tl,
    useEffect: Yp,
    useImperativeHandle: wr,
    useInsertionEffect: cm,
    useLayoutEffect: Ia,
    useMemo: fm,
    useReducer: Bf,
    useRef: Xf,
    useState: function() {
      return Bf(xn);
    },
    useDebugValue: Pi,
    useDeferredValue: function(l, n) {
      var u = Mt();
      return sm(
        u,
        Pe.memoizedState,
        l,
        n
      );
    },
    useTransition: function() {
      var l = Bf(xn)[0], n = Mt().memoizedState;
      return [
        typeof l == "boolean" ? l : qf(l),
        n
      ];
    },
    useSyncExternalStore: Yf,
    useId: rm,
    useHostTransitionStatus: Ca,
    useFormState: En,
    useActionState: En,
    useOptimistic: function(l, n) {
      var u = Mt();
      return Hr(u, Pe, l, n);
    },
    useMemoCache: Dr,
    useCacheRefresh: Vp
  }, du = {
    readContext: tl,
    use: Vt,
    useCallback: ec,
    useContext: tl,
    useEffect: Yp,
    useImperativeHandle: wr,
    useInsertionEffect: cm,
    useLayoutEffect: Ia,
    useMemo: fm,
    useReducer: Mr,
    useRef: Xf,
    useState: function() {
      return Mr(xn);
    },
    useDebugValue: Pi,
    useDeferredValue: function(l, n) {
      var u = Mt();
      return Pe === null ? Qf(u, l, n) : sm(
        u,
        Pe.memoizedState,
        l,
        n
      );
    },
    useTransition: function() {
      var l = Mr(xn)[0], n = Mt().memoizedState;
      return [
        typeof l == "boolean" ? l : qf(l),
        n
      ];
    },
    useSyncExternalStore: Yf,
    useId: rm,
    useHostTransitionStatus: Ca,
    useFormState: Yr,
    useActionState: Yr,
    useOptimistic: function(l, n) {
      var u = Mt();
      return Pe !== null ? Hr(u, Pe, l, n) : (u.baseState = l, [l, u.queue.dispatch]);
    },
    useMemoCache: Dr,
    useCacheRefresh: Vp
  }, ac = null, oo = 0;
  function Xr(l) {
    var n = oo;
    return oo += 1, ac === null && (ac = []), $h(ac, l, n);
  }
  function nc(l, n) {
    n = n.props.ref, l.ref = n !== void 0 ? n : null;
  }
  function Al(l, n) {
    throw n.$$typeof === P ? Error(g(525)) : (l = Object.prototype.toString.call(n), Error(
      g(
        31,
        l === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : l
      )
    ));
  }
  function vm(l) {
    var n = l._init;
    return n(l._payload);
  }
  function kl(l) {
    function n(D, E) {
      if (l) {
        var O = D.deletions;
        O === null ? (D.deletions = [E], D.flags |= 16) : O.push(E);
      }
    }
    function u(D, E) {
      if (!l) return null;
      for (; E !== null; )
        n(D, E), E = E.sibling;
      return null;
    }
    function c(D) {
      for (var E = /* @__PURE__ */ new Map(); D !== null; )
        D.key !== null ? E.set(D.key, D) : E.set(D.index, D), D = D.sibling;
      return E;
    }
    function s(D, E) {
      return D = ka(D, E), D.index = 0, D.sibling = null, D;
    }
    function r(D, E, O) {
      return D.index = O, l ? (O = D.alternate, O !== null ? (O = O.index, O < E ? (D.flags |= 67108866, E) : O) : (D.flags |= 67108866, E)) : (D.flags |= 1048576, E);
    }
    function m(D) {
      return l && D.alternate === null && (D.flags |= 67108866), D;
    }
    function y(D, E, O, V) {
      return E === null || E.tag !== 6 ? (E = $c(O, D.mode, V), E.return = D, E) : (E = s(E, O), E.return = D, E);
    }
    function b(D, E, O, V) {
      var le = O.type;
      return le === Je ? G(
        D,
        E,
        O.props.children,
        V,
        O.key
      ) : E !== null && (E.elementType === le || typeof le == "object" && le !== null && le.$$typeof === mt && vm(le) === E.type) ? (E = s(E, O.props), nc(E, O), E.return = D, E) : (E = J(
        O.type,
        O.key,
        O.props,
        null,
        D.mode,
        V
      ), nc(E, O), E.return = D, E);
    }
    function M(D, E, O, V) {
      return E === null || E.tag !== 4 || E.stateNode.containerInfo !== O.containerInfo || E.stateNode.implementation !== O.implementation ? (E = Et(O, D.mode, V), E.return = D, E) : (E = s(E, O.children || []), E.return = D, E);
    }
    function G(D, E, O, V, le) {
      return E === null || E.tag !== 7 ? (E = Ra(
        O,
        D.mode,
        V,
        le
      ), E.return = D, E) : (E = s(E, O), E.return = D, E);
    }
    function X(D, E, O) {
      if (typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint")
        return E = $c(
          "" + E,
          D.mode,
          O
        ), E.return = D, E;
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case ie:
            return O = J(
              E.type,
              E.key,
              E.props,
              null,
              D.mode,
              O
            ), nc(O, E), O.return = D, O;
          case Fe:
            return E = Et(
              E,
              D.mode,
              O
            ), E.return = D, E;
          case mt:
            var V = E._init;
            return E = V(E._payload), X(D, E, O);
        }
        if (Yt(E) || Se(E))
          return E = Ra(
            E,
            D.mode,
            O,
            null
          ), E.return = D, E;
        if (typeof E.then == "function")
          return X(D, Xr(E), O);
        if (E.$$typeof === st)
          return X(
            D,
            Df(D, E),
            O
          );
        Al(D, E);
      }
      return null;
    }
    function C(D, E, O, V) {
      var le = E !== null ? E.key : null;
      if (typeof O == "string" && O !== "" || typeof O == "number" || typeof O == "bigint")
        return le !== null ? null : y(D, E, "" + O, V);
      if (typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case ie:
            return O.key === le ? b(D, E, O, V) : null;
          case Fe:
            return O.key === le ? M(D, E, O, V) : null;
          case mt:
            return le = O._init, O = le(O._payload), C(D, E, O, V);
        }
        if (Yt(O) || Se(O))
          return le !== null ? null : G(D, E, O, V, null);
        if (typeof O.then == "function")
          return C(
            D,
            E,
            Xr(O),
            V
          );
        if (O.$$typeof === st)
          return C(
            D,
            E,
            Df(D, O),
            V
          );
        Al(D, O);
      }
      return null;
    }
    function N(D, E, O, V, le) {
      if (typeof V == "string" && V !== "" || typeof V == "number" || typeof V == "bigint")
        return D = D.get(O) || null, y(E, D, "" + V, le);
      if (typeof V == "object" && V !== null) {
        switch (V.$$typeof) {
          case ie:
            return D = D.get(
              V.key === null ? O : V.key
            ) || null, b(E, D, V, le);
          case Fe:
            return D = D.get(
              V.key === null ? O : V.key
            ) || null, M(E, D, V, le);
          case mt:
            var Ce = V._init;
            return V = Ce(V._payload), N(
              D,
              E,
              O,
              V,
              le
            );
        }
        if (Yt(V) || Se(V))
          return D = D.get(O) || null, G(E, D, V, le, null);
        if (typeof V.then == "function")
          return N(
            D,
            E,
            O,
            Xr(V),
            le
          );
        if (V.$$typeof === st)
          return N(
            D,
            E,
            O,
            Df(E, V),
            le
          );
        Al(E, V);
      }
      return null;
    }
    function de(D, E, O, V) {
      for (var le = null, Ce = null, se = E, pe = E = 0, ul = null; se !== null && pe < O.length; pe++) {
        se.index > pe ? (ul = se, se = null) : ul = se.sibling;
        var Ze = C(
          D,
          se,
          O[pe],
          V
        );
        if (Ze === null) {
          se === null && (se = ul);
          break;
        }
        l && se && Ze.alternate === null && n(D, se), E = r(Ze, E, pe), Ce === null ? le = Ze : Ce.sibling = Ze, Ce = Ze, se = ul;
      }
      if (pe === O.length)
        return u(D, se), Le && Xe(D, pe), le;
      if (se === null) {
        for (; pe < O.length; pe++)
          se = X(D, O[pe], V), se !== null && (E = r(
            se,
            E,
            pe
          ), Ce === null ? le = se : Ce.sibling = se, Ce = se);
        return Le && Xe(D, pe), le;
      }
      for (se = c(se); pe < O.length; pe++)
        ul = N(
          se,
          D,
          pe,
          O[pe],
          V
        ), ul !== null && (l && ul.alternate !== null && se.delete(
          ul.key === null ? pe : ul.key
        ), E = r(
          ul,
          E,
          pe
        ), Ce === null ? le = ul : Ce.sibling = ul, Ce = ul);
      return l && se.forEach(function(bi) {
        return n(D, bi);
      }), Le && Xe(D, pe), le;
    }
    function he(D, E, O, V) {
      if (O == null) throw Error(g(151));
      for (var le = null, Ce = null, se = E, pe = E = 0, ul = null, Ze = O.next(); se !== null && !Ze.done; pe++, Ze = O.next()) {
        se.index > pe ? (ul = se, se = null) : ul = se.sibling;
        var bi = C(D, se, Ze.value, V);
        if (bi === null) {
          se === null && (se = ul);
          break;
        }
        l && se && bi.alternate === null && n(D, se), E = r(bi, E, pe), Ce === null ? le = bi : Ce.sibling = bi, Ce = bi, se = ul;
      }
      if (Ze.done)
        return u(D, se), Le && Xe(D, pe), le;
      if (se === null) {
        for (; !Ze.done; pe++, Ze = O.next())
          Ze = X(D, Ze.value, V), Ze !== null && (E = r(Ze, E, pe), Ce === null ? le = Ze : Ce.sibling = Ze, Ce = Ze);
        return Le && Xe(D, pe), le;
      }
      for (se = c(se); !Ze.done; pe++, Ze = O.next())
        Ze = N(se, D, pe, Ze.value, V), Ze !== null && (l && Ze.alternate !== null && se.delete(Ze.key === null ? pe : Ze.key), E = r(Ze, E, pe), Ce === null ? le = Ze : Ce.sibling = Ze, Ce = Ze);
      return l && se.forEach(function(Mv) {
        return n(D, Mv);
      }), Le && Xe(D, pe), le;
    }
    function $e(D, E, O, V) {
      if (typeof O == "object" && O !== null && O.type === Je && O.key === null && (O = O.props.children), typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case ie:
            e: {
              for (var le = O.key; E !== null; ) {
                if (E.key === le) {
                  if (le = O.type, le === Je) {
                    if (E.tag === 7) {
                      u(
                        D,
                        E.sibling
                      ), V = s(
                        E,
                        O.props.children
                      ), V.return = D, D = V;
                      break e;
                    }
                  } else if (E.elementType === le || typeof le == "object" && le !== null && le.$$typeof === mt && vm(le) === E.type) {
                    u(
                      D,
                      E.sibling
                    ), V = s(E, O.props), nc(V, O), V.return = D, D = V;
                    break e;
                  }
                  u(D, E);
                  break;
                } else n(D, E);
                E = E.sibling;
              }
              O.type === Je ? (V = Ra(
                O.props.children,
                D.mode,
                V,
                O.key
              ), V.return = D, D = V) : (V = J(
                O.type,
                O.key,
                O.props,
                null,
                D.mode,
                V
              ), nc(V, O), V.return = D, D = V);
            }
            return m(D);
          case Fe:
            e: {
              for (le = O.key; E !== null; ) {
                if (E.key === le)
                  if (E.tag === 4 && E.stateNode.containerInfo === O.containerInfo && E.stateNode.implementation === O.implementation) {
                    u(
                      D,
                      E.sibling
                    ), V = s(E, O.children || []), V.return = D, D = V;
                    break e;
                  } else {
                    u(D, E);
                    break;
                  }
                else n(D, E);
                E = E.sibling;
              }
              V = Et(O, D.mode, V), V.return = D, D = V;
            }
            return m(D);
          case mt:
            return le = O._init, O = le(O._payload), $e(
              D,
              E,
              O,
              V
            );
        }
        if (Yt(O))
          return de(
            D,
            E,
            O,
            V
          );
        if (Se(O)) {
          if (le = Se(O), typeof le != "function") throw Error(g(150));
          return O = le.call(O), he(
            D,
            E,
            O,
            V
          );
        }
        if (typeof O.then == "function")
          return $e(
            D,
            E,
            Xr(O),
            V
          );
        if (O.$$typeof === st)
          return $e(
            D,
            E,
            Df(D, O),
            V
          );
        Al(D, O);
      }
      return typeof O == "string" && O !== "" || typeof O == "number" || typeof O == "bigint" ? (O = "" + O, E !== null && E.tag === 6 ? (u(D, E.sibling), V = s(E, O), V.return = D, D = V) : (u(D, E), V = $c(O, D.mode, V), V.return = D, D = V), m(D)) : u(D, E);
    }
    return function(D, E, O, V) {
      try {
        oo = 0;
        var le = $e(
          D,
          E,
          O,
          V
        );
        return ac = null, le;
      } catch (se) {
        if (se === Iu || se === Uf) throw se;
        var Ce = Zl(29, se, null, D.mode);
        return Ce.lanes = V, Ce.return = D, Ce;
      } finally {
      }
    };
  }
  var uc = kl(!0), An = kl(!1), sa = k(null), Rl = null;
  function hu(l) {
    var n = l.alternate;
    me(ct, ct.current & 1), me(sa, l), Rl === null && (n === null || Ii.current !== null || n.memoizedState !== null) && (Rl = l);
  }
  function Rn(l) {
    if (l.tag === 22) {
      if (me(ct, ct.current), me(sa, l), Rl === null) {
        var n = l.alternate;
        n !== null && n.memoizedState !== null && (Rl = l);
      }
    } else zn();
  }
  function zn() {
    me(ct, ct.current), me(sa, sa.current);
  }
  function Pa(l) {
    I(sa), Rl === l && (Rl = null), I(ct);
  }
  var ct = k(0);
  function Lf(l) {
    for (var n = l; n !== null; ) {
      if (n.tag === 13) {
        var u = n.memoizedState;
        if (u !== null && (u = u.dehydrated, u === null || u.data === "$?" || ms(u)))
          return n;
      } else if (n.tag === 19 && n.memoizedProps.revealOrder !== void 0) {
        if ((n.flags & 128) !== 0) return n;
      } else if (n.child !== null) {
        n.child.return = n, n = n.child;
        continue;
      }
      if (n === l) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === l) return null;
        n = n.return;
      }
      n.sibling.return = n.return, n = n.sibling;
    }
    return null;
  }
  function li(l, n, u, c) {
    n = l.memoizedState, u = u(c, n), u = u == null ? n : F({}, n, u), l.memoizedState = u, l.lanes === 0 && (l.updateQueue.baseState = u);
  }
  var Qr = {
    enqueueSetState: function(l, n, u) {
      l = l._reactInternals;
      var c = ra(), s = Jl(c);
      s.payload = n, u != null && (s.callback = u), n = Tn(l, s, c), n !== null && (da(n, l, c), Fi(n, l, c));
    },
    enqueueReplaceState: function(l, n, u) {
      l = l._reactInternals;
      var c = ra(), s = Jl(c);
      s.tag = 1, s.payload = n, u != null && (s.callback = u), n = Tn(l, s, c), n !== null && (da(n, l, c), Fi(n, l, c));
    },
    enqueueForceUpdate: function(l, n) {
      l = l._reactInternals;
      var u = ra(), c = Jl(u);
      c.tag = 2, n != null && (c.callback = n), n = Tn(l, c, u), n !== null && (da(n, l, u), Fi(n, l, u));
    }
  };
  function fo(l, n, u, c, s, r, m) {
    return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(c, r, m) : n.prototype && n.prototype.isPureReactComponent ? !Qu(u, c) || !Qu(s, r) : !0;
  }
  function ic(l, n, u, c) {
    l = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(u, c), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(u, c), n.state !== l && Qr.enqueueReplaceState(n, n.state, null);
  }
  function ai(l, n) {
    var u = n;
    if ("ref" in n) {
      u = {};
      for (var c in n)
        c !== "ref" && (u[c] = n[c]);
    }
    if (l = l.defaultProps) {
      u === n && (u = F({}, u));
      for (var s in l)
        u[s] === void 0 && (u[s] = l[s]);
    }
    return u;
  }
  var Jf = typeof reportError == "function" ? reportError : function(l) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var n = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l),
        error: l
      });
      if (!window.dispatchEvent(n)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", l);
      return;
    }
    console.error(l);
  };
  function so(l) {
    Jf(l);
  }
  function gm(l) {
    console.error(l);
  }
  function Kf(l) {
    Jf(l);
  }
  function kf(l, n) {
    try {
      var u = l.onUncaughtError;
      u(n.value, { componentStack: n.stack });
    } catch (c) {
      setTimeout(function() {
        throw c;
      });
    }
  }
  function bm(l, n, u) {
    try {
      var c = l.onCaughtError;
      c(u.value, {
        componentStack: u.stack,
        errorBoundary: n.tag === 1 ? n.stateNode : null
      });
    } catch (s) {
      setTimeout(function() {
        throw s;
      });
    }
  }
  function Sm(l, n, u) {
    return u = Jl(u), u.tag = 3, u.payload = { element: null }, u.callback = function() {
      kf(l, n);
    }, u;
  }
  function Tm(l) {
    return l = Jl(l), l.tag = 3, l;
  }
  function $l(l, n, u, c) {
    var s = u.type.getDerivedStateFromError;
    if (typeof s == "function") {
      var r = c.value;
      l.payload = function() {
        return s(r);
      }, l.callback = function() {
        bm(n, u, c);
      };
    }
    var m = u.stateNode;
    m !== null && typeof m.componentDidCatch == "function" && (l.callback = function() {
      bm(n, u, c), typeof s != "function" && (ci === null ? ci = /* @__PURE__ */ new Set([this]) : ci.add(this));
      var y = c.stack;
      this.componentDidCatch(c.value, {
        componentStack: y !== null ? y : ""
      });
    });
  }
  function Zp(l, n, u, c, s) {
    if (u.flags |= 32768, c !== null && typeof c == "object" && typeof c.then == "function") {
      if (n = u.alternate, n !== null && eo(
        n,
        u,
        s,
        !0
      ), u = sa.current, u !== null) {
        switch (u.tag) {
          case 13:
            return Rl === null ? yc() : u.alternate === null && Nt === 0 && (Nt = 3), u.flags &= -257, u.flags |= 65536, u.lanes = s, c === gr ? u.flags |= 16384 : (n = u.updateQueue, n === null ? u.updateQueue = /* @__PURE__ */ new Set([c]) : n.add(c), yd(l, c, s)), !1;
          case 22:
            return u.flags |= 65536, c === gr ? u.flags |= 16384 : (n = u.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([c])
            }, u.updateQueue = n) : (u = n.retryQueue, u === null ? n.retryQueue = /* @__PURE__ */ new Set([c]) : u.add(c)), yd(l, c, s)), !1;
        }
        throw Error(g(435, u.tag));
      }
      return yd(l, c, s), yc(), !1;
    }
    if (Le)
      return n = sa.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = s, c !== ki && (l = Error(g(422), { cause: c }), Pc(ca(l, u)))) : (c !== ki && (n = Error(g(423), {
        cause: c
      }), Pc(
        ca(n, u)
      )), l = l.current.alternate, l.flags |= 65536, s &= -s, l.lanes |= s, c = ca(c, u), s = Sm(
        l.stateNode,
        c,
        s
      ), Ih(l, s), Nt !== 4 && (Nt = 2)), !1;
    var r = Error(g(520), { cause: c });
    if (r = ca(r, u), go === null ? go = [r] : go.push(r), Nt !== 4 && (Nt = 2), n === null) return !0;
    c = ca(c, u), u = n;
    do {
      switch (u.tag) {
        case 3:
          return u.flags |= 65536, l = s & -s, u.lanes |= l, l = Sm(u.stateNode, c, l), Ih(u, l), !1;
        case 1:
          if (n = u.type, r = u.stateNode, (u.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || r !== null && typeof r.componentDidCatch == "function" && (ci === null || !ci.has(r))))
            return u.flags |= 65536, s &= -s, u.lanes |= s, s = Tm(s), $l(
              s,
              l,
              u,
              c
            ), Ih(u, s), !1;
      }
      u = u.return;
    } while (u !== null);
    return !1;
  }
  var Ut = Error(g(461)), $t = !1;
  function al(l, n, u, c) {
    n.child = l === null ? An(n, null, u, c) : uc(
      n,
      l.child,
      u,
      c
    );
  }
  function Lp(l, n, u, c, s) {
    u = u.render;
    var r = n.ref;
    if ("ref" in c) {
      var m = {};
      for (var y in c)
        y !== "ref" && (m[y] = c[y]);
    } else m = c;
    return Wu(n), c = Ar(
      l,
      n,
      u,
      m,
      r,
      s
    ), y = Rr(), l !== null && !$t ? (io(l, n, s), Dn(l, n, s)) : (Le && y && Ki(n), n.flags |= 1, al(l, n, c, s), n.child);
  }
  function mu(l, n, u, c, s) {
    if (l === null) {
      var r = u.type;
      return typeof r == "function" && !xf(r) && r.defaultProps === void 0 && u.compare === null ? (n.tag = 15, n.type = r, cc(
        l,
        n,
        r,
        c,
        s
      )) : (l = J(
        u.type,
        null,
        c,
        n,
        n.mode,
        s
      ), l.ref = n.ref, l.return = n, n.child = l);
    }
    if (r = l.child, !Pr(l, s)) {
      var m = r.memoizedProps;
      if (u = u.compare, u = u !== null ? u : Qu, u(m, c) && l.ref === n.ref)
        return Dn(l, n, s);
    }
    return n.flags |= 1, l = ka(r, c), l.ref = n.ref, l.return = n, n.child = l;
  }
  function cc(l, n, u, c, s) {
    if (l !== null) {
      var r = l.memoizedProps;
      if (Qu(r, c) && l.ref === n.ref)
        if ($t = !1, n.pendingProps = c = r, Pr(l, s))
          (l.flags & 131072) !== 0 && ($t = !0);
        else
          return n.lanes = l.lanes, Dn(l, n, s);
    }
    return Lr(
      l,
      n,
      u,
      c,
      s
    );
  }
  function Zr(l, n, u) {
    var c = n.pendingProps, s = c.children, r = l !== null ? l.memoizedState : null;
    if (c.mode === "hidden") {
      if ((n.flags & 128) !== 0) {
        if (c = r !== null ? r.baseLanes | u : u, l !== null) {
          for (s = n.child = l.child, r = 0; s !== null; )
            r = r | s.lanes | s.childLanes, s = s.sibling;
          n.childLanes = r & ~c;
        } else n.childLanes = 0, n.child = null;
        return oc(
          l,
          n,
          c,
          u
        );
      }
      if ((u & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && $i(
          n,
          r !== null ? r.cachePool : null
        ), r !== null ? ll(n, r) : no(), Rn(n);
      else
        return n.lanes = n.childLanes = 536870912, oc(
          l,
          n,
          r !== null ? r.baseLanes | u : u,
          u
        );
    } else
      r !== null ? ($i(n, r.cachePool), ll(n, r), zn(), n.memoizedState = null) : (l !== null && $i(n, null), no(), zn());
    return al(l, n, s, u), n.child;
  }
  function oc(l, n, u, c) {
    var s = Mf();
    return s = s === null ? null : { parent: Kt._currentValue, pool: s }, n.memoizedState = {
      baseLanes: u,
      cachePool: s
    }, l !== null && $i(n, null), no(), Rn(n), l !== null && eo(l, n, c, !0), null;
  }
  function $f(l, n) {
    var u = n.ref;
    if (u === null)
      l !== null && l.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof u != "function" && typeof u != "object")
        throw Error(g(284));
      (l === null || l.ref !== u) && (n.flags |= 4194816);
    }
  }
  function Lr(l, n, u, c, s) {
    return Wu(n), u = Ar(
      l,
      n,
      u,
      c,
      void 0,
      s
    ), c = Rr(), l !== null && !$t ? (io(l, n, s), Dn(l, n, s)) : (Le && c && Ki(n), n.flags |= 1, al(l, n, u, s), n.child);
  }
  function xm(l, n, u, c, s, r) {
    return Wu(n), n.updateQueue = null, u = tm(
      n,
      c,
      u,
      s
    ), ei(l), c = Rr(), l !== null && !$t ? (io(l, n, r), Dn(l, n, r)) : (Le && c && Ki(n), n.flags |= 1, al(l, n, u, r), n.child);
  }
  function Jr(l, n, u, c, s) {
    if (Wu(n), n.stateNode === null) {
      var r = kc, m = u.contextType;
      typeof m == "object" && m !== null && (r = tl(m)), r = new u(c, r), n.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = Qr, n.stateNode = r, r._reactInternals = n, r = n.stateNode, r.props = c, r.state = n.memoizedState, r.refs = {}, Sr(n), m = u.contextType, r.context = typeof m == "object" && m !== null ? tl(m) : kc, r.state = n.memoizedState, m = u.getDerivedStateFromProps, typeof m == "function" && (li(
        n,
        u,
        m,
        c
      ), r.state = n.memoizedState), typeof u.getDerivedStateFromProps == "function" || typeof r.getSnapshotBeforeUpdate == "function" || typeof r.UNSAFE_componentWillMount != "function" && typeof r.componentWillMount != "function" || (m = r.state, typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount(), m !== r.state && Qr.enqueueReplaceState(r, r.state, null), su(n, c, r, s), ao(), r.state = n.memoizedState), typeof r.componentDidMount == "function" && (n.flags |= 4194308), c = !0;
    } else if (l === null) {
      r = n.stateNode;
      var y = n.memoizedProps, b = ai(u, y);
      r.props = b;
      var M = r.context, G = u.contextType;
      m = kc, typeof G == "object" && G !== null && (m = tl(G));
      var X = u.getDerivedStateFromProps;
      G = typeof X == "function" || typeof r.getSnapshotBeforeUpdate == "function", y = n.pendingProps !== y, G || typeof r.UNSAFE_componentWillReceiveProps != "function" && typeof r.componentWillReceiveProps != "function" || (y || M !== m) && ic(
        n,
        r,
        c,
        m
      ), Sn = !1;
      var C = n.memoizedState;
      r.state = C, su(n, c, r, s), ao(), M = n.memoizedState, y || C !== M || Sn ? (typeof X == "function" && (li(
        n,
        u,
        X,
        c
      ), M = n.memoizedState), (b = Sn || fo(
        n,
        u,
        b,
        c,
        C,
        M,
        m
      )) ? (G || typeof r.UNSAFE_componentWillMount != "function" && typeof r.componentWillMount != "function" || (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof r.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = c, n.memoizedState = M), r.props = c, r.state = M, r.context = m, c = b) : (typeof r.componentDidMount == "function" && (n.flags |= 4194308), c = !1);
    } else {
      r = n.stateNode, Tr(l, n), m = n.memoizedProps, G = ai(u, m), r.props = G, X = n.pendingProps, C = r.context, M = u.contextType, b = kc, typeof M == "object" && M !== null && (b = tl(M)), y = u.getDerivedStateFromProps, (M = typeof y == "function" || typeof r.getSnapshotBeforeUpdate == "function") || typeof r.UNSAFE_componentWillReceiveProps != "function" && typeof r.componentWillReceiveProps != "function" || (m !== X || C !== b) && ic(
        n,
        r,
        c,
        b
      ), Sn = !1, C = n.memoizedState, r.state = C, su(n, c, r, s), ao();
      var N = n.memoizedState;
      m !== X || C !== N || Sn || l !== null && l.dependencies !== null && zf(l.dependencies) ? (typeof y == "function" && (li(
        n,
        u,
        y,
        c
      ), N = n.memoizedState), (G = Sn || fo(
        n,
        u,
        G,
        c,
        C,
        N,
        b
      ) || l !== null && l.dependencies !== null && zf(l.dependencies)) ? (M || typeof r.UNSAFE_componentWillUpdate != "function" && typeof r.componentWillUpdate != "function" || (typeof r.componentWillUpdate == "function" && r.componentWillUpdate(c, N, b), typeof r.UNSAFE_componentWillUpdate == "function" && r.UNSAFE_componentWillUpdate(
        c,
        N,
        b
      )), typeof r.componentDidUpdate == "function" && (n.flags |= 4), typeof r.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof r.componentDidUpdate != "function" || m === l.memoizedProps && C === l.memoizedState || (n.flags |= 4), typeof r.getSnapshotBeforeUpdate != "function" || m === l.memoizedProps && C === l.memoizedState || (n.flags |= 1024), n.memoizedProps = c, n.memoizedState = N), r.props = c, r.state = N, r.context = b, c = G) : (typeof r.componentDidUpdate != "function" || m === l.memoizedProps && C === l.memoizedState || (n.flags |= 4), typeof r.getSnapshotBeforeUpdate != "function" || m === l.memoizedProps && C === l.memoizedState || (n.flags |= 1024), c = !1);
    }
    return r = c, $f(l, n), c = (n.flags & 128) !== 0, r || c ? (r = n.stateNode, u = c && typeof u.getDerivedStateFromError != "function" ? null : r.render(), n.flags |= 1, l !== null && c ? (n.child = uc(
      n,
      l.child,
      null,
      s
    ), n.child = uc(
      n,
      null,
      u,
      s
    )) : al(l, n, u, s), n.memoizedState = r.state, l = n.child) : l = Dn(
      l,
      n,
      s
    ), l;
  }
  function Kr(l, n, u, c) {
    return Ic(), n.flags |= 256, al(l, n, u, c), n.child;
  }
  var kr = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Em(l) {
    return { baseLanes: l, cachePool: pr() };
  }
  function Am(l, n, u) {
    return l = l !== null ? l.childLanes & ~u : 0, n && (l |= ja), l;
  }
  function Rm(l, n, u) {
    var c = n.pendingProps, s = !1, r = (n.flags & 128) !== 0, m;
    if ((m = r) || (m = l !== null && l.memoizedState === null ? !1 : (ct.current & 2) !== 0), m && (s = !0, n.flags &= -129), m = (n.flags & 32) !== 0, n.flags &= -33, l === null) {
      if (Le) {
        if (s ? hu(n) : zn(), Le) {
          var y = Ke, b;
          if (b = y) {
            e: {
              for (b = y, y = Oa; b.nodeType !== 8; ) {
                if (!y) {
                  y = null;
                  break e;
                }
                if (b = tn(
                  b.nextSibling
                ), b === null) {
                  y = null;
                  break e;
                }
              }
              y = b;
            }
            y !== null ? (n.memoizedState = {
              dehydrated: y,
              treeContext: iu !== null ? { id: $a, overflow: Ot } : null,
              retryLane: 536870912,
              hydrationErrors: null
            }, b = Zl(
              18,
              null,
              null,
              0
            ), b.stateNode = y, b.return = n, n.child = b, wt = n, Ke = null, b = !0) : b = !1;
          }
          b || cu(n);
        }
        if (y = n.memoizedState, y !== null && (y = y.dehydrated, y !== null))
          return ms(y) ? n.lanes = 32 : n.lanes = 536870912, null;
        Pa(n);
      }
      return y = c.children, c = c.fallback, s ? (zn(), s = n.mode, y = Wr(
        { mode: "hidden", children: y },
        s
      ), c = Ra(
        c,
        s,
        u,
        null
      ), y.return = n, c.return = n, y.sibling = c, n.child = y, s = n.child, s.memoizedState = Em(u), s.childLanes = Am(
        l,
        m,
        u
      ), n.memoizedState = kr, c) : (hu(n), $r(n, y));
    }
    if (b = l.memoizedState, b !== null && (y = b.dehydrated, y !== null)) {
      if (r)
        n.flags & 256 ? (hu(n), n.flags &= -257, n = ni(
          l,
          n,
          u
        )) : n.memoizedState !== null ? (zn(), n.child = l.child, n.flags |= 128, n = null) : (zn(), s = c.fallback, y = n.mode, c = Wr(
          { mode: "visible", children: c.children },
          y
        ), s = Ra(
          s,
          y,
          u,
          null
        ), s.flags |= 2, c.return = n, s.return = n, c.sibling = s, n.child = c, uc(
          n,
          l.child,
          null,
          u
        ), c = n.child, c.memoizedState = Em(u), c.childLanes = Am(
          l,
          m,
          u
        ), n.memoizedState = kr, n = s);
      else if (hu(n), ms(y)) {
        if (m = y.nextSibling && y.nextSibling.dataset, m) var M = m.dgst;
        m = M, c = Error(g(419)), c.stack = "", c.digest = m, Pc({ value: c, source: null, stack: null }), n = ni(
          l,
          n,
          u
        );
      } else if ($t || eo(l, n, u, !1), m = (u & l.childLanes) !== 0, $t || m) {
        if (m = ft, m !== null && (c = u & -u, c = (c & 42) !== 0 ? 1 : Va(c), c = (c & (m.suspendedLanes | u)) !== 0 ? 0 : c, c !== 0 && c !== b.retryLane))
          throw b.retryLane = c, yn(l, c), da(m, l, c), Ut;
        y.data === "$?" || yc(), n = ni(
          l,
          n,
          u
        );
      } else
        y.data === "$?" ? (n.flags |= 192, n.child = l.child, n = null) : (l = b.treeContext, Ke = tn(
          y.nextSibling
        ), wt = n, Le = !0, Da = null, Oa = !1, l !== null && (za[Ll++] = $a, za[Ll++] = Ot, za[Ll++] = iu, $a = l.id, Ot = l.overflow, iu = n), n = $r(
          n,
          c.children
        ), n.flags |= 4096);
      return n;
    }
    return s ? (zn(), s = c.fallback, y = n.mode, b = l.child, M = b.sibling, c = ka(b, {
      mode: "hidden",
      children: c.children
    }), c.subtreeFlags = b.subtreeFlags & 65011712, M !== null ? s = ka(M, s) : (s = Ra(
      s,
      y,
      u,
      null
    ), s.flags |= 2), s.return = n, c.return = n, c.sibling = s, n.child = c, c = s, s = n.child, y = l.child.memoizedState, y === null ? y = Em(u) : (b = y.cachePool, b !== null ? (M = Kt._currentValue, b = b.parent !== M ? { parent: M, pool: M } : b) : b = pr(), y = {
      baseLanes: y.baseLanes | u,
      cachePool: b
    }), s.memoizedState = y, s.childLanes = Am(
      l,
      m,
      u
    ), n.memoizedState = kr, c) : (hu(n), u = l.child, l = u.sibling, u = ka(u, {
      mode: "visible",
      children: c.children
    }), u.return = n, u.sibling = null, l !== null && (m = n.deletions, m === null ? (n.deletions = [l], n.flags |= 16) : m.push(l)), n.child = u, n.memoizedState = null, u);
  }
  function $r(l, n) {
    return n = Wr(
      { mode: "visible", children: n },
      l.mode
    ), n.return = l, l.child = n;
  }
  function Wr(l, n) {
    return l = Zl(22, l, null, n), l.lanes = 0, l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }, l;
  }
  function ni(l, n, u) {
    return uc(n, l.child, null, u), l = $r(
      n,
      n.pendingProps.children
    ), l.flags |= 2, n.memoizedState = null, l;
  }
  function Wf(l, n, u) {
    l.lanes |= n;
    var c = l.alternate;
    c !== null && (c.lanes |= n), rr(l.return, n, u);
  }
  function Fr(l, n, u, c, s) {
    var r = l.memoizedState;
    r === null ? l.memoizedState = {
      isBackwards: n,
      rendering: null,
      renderingStartTime: 0,
      last: c,
      tail: u,
      tailMode: s
    } : (r.isBackwards = n, r.rendering = null, r.renderingStartTime = 0, r.last = c, r.tail = u, r.tailMode = s);
  }
  function Ir(l, n, u) {
    var c = n.pendingProps, s = c.revealOrder, r = c.tail;
    if (al(l, n, c.children, u), c = ct.current, (c & 2) !== 0)
      c = c & 1 | 2, n.flags |= 128;
    else {
      if (l !== null && (l.flags & 128) !== 0)
        e: for (l = n.child; l !== null; ) {
          if (l.tag === 13)
            l.memoizedState !== null && Wf(l, u, n);
          else if (l.tag === 19)
            Wf(l, u, n);
          else if (l.child !== null) {
            l.child.return = l, l = l.child;
            continue;
          }
          if (l === n) break e;
          for (; l.sibling === null; ) {
            if (l.return === null || l.return === n)
              break e;
            l = l.return;
          }
          l.sibling.return = l.return, l = l.sibling;
        }
      c &= 1;
    }
    switch (me(ct, c), s) {
      case "forwards":
        for (u = n.child, s = null; u !== null; )
          l = u.alternate, l !== null && Lf(l) === null && (s = u), u = u.sibling;
        u = s, u === null ? (s = n.child, n.child = null) : (s = u.sibling, u.sibling = null), Fr(
          n,
          !1,
          s,
          u,
          r
        );
        break;
      case "backwards":
        for (u = null, s = n.child, n.child = null; s !== null; ) {
          if (l = s.alternate, l !== null && Lf(l) === null) {
            n.child = s;
            break;
          }
          l = s.sibling, s.sibling = u, u = s, s = l;
        }
        Fr(
          n,
          !0,
          u,
          null,
          r
        );
        break;
      case "together":
        Fr(n, !1, null, null, void 0);
        break;
      default:
        n.memoizedState = null;
    }
    return n.child;
  }
  function Dn(l, n, u) {
    if (l !== null && (n.dependencies = l.dependencies), vu |= n.lanes, (u & n.childLanes) === 0)
      if (l !== null) {
        if (eo(
          l,
          n,
          u,
          !1
        ), (u & n.childLanes) === 0)
          return null;
      } else return null;
    if (l !== null && n.child !== l.child)
      throw Error(g(153));
    if (n.child !== null) {
      for (l = n.child, u = ka(l, l.pendingProps), n.child = u, u.return = n; l.sibling !== null; )
        l = l.sibling, u = u.sibling = ka(l, l.pendingProps), u.return = n;
      u.sibling = null;
    }
    return n.child;
  }
  function Pr(l, n) {
    return (l.lanes & n) !== 0 ? !0 : (l = l.dependencies, !!(l !== null && zf(l)));
  }
  function Jp(l, n, u) {
    switch (n.tag) {
      case 3:
        Dt(n, n.stateNode.containerInfo), fu(n, Kt, l.memoizedState.cache), Ic();
        break;
      case 27:
      case 5:
        Ta(n);
        break;
      case 4:
        Dt(n, n.stateNode.containerInfo);
        break;
      case 10:
        fu(
          n,
          n.type,
          n.memoizedProps.value
        );
        break;
      case 13:
        var c = n.memoizedState;
        if (c !== null)
          return c.dehydrated !== null ? (hu(n), n.flags |= 128, null) : (u & n.child.childLanes) !== 0 ? Rm(l, n, u) : (hu(n), l = Dn(
            l,
            n,
            u
          ), l !== null ? l.sibling : null);
        hu(n);
        break;
      case 19:
        var s = (l.flags & 128) !== 0;
        if (c = (u & n.childLanes) !== 0, c || (eo(
          l,
          n,
          u,
          !1
        ), c = (u & n.childLanes) !== 0), s) {
          if (c)
            return Ir(
              l,
              n,
              u
            );
          n.flags |= 128;
        }
        if (s = n.memoizedState, s !== null && (s.rendering = null, s.tail = null, s.lastEffect = null), me(ct, ct.current), c) break;
        return null;
      case 22:
      case 23:
        return n.lanes = 0, Zr(l, n, u);
      case 24:
        fu(n, Kt, l.memoizedState.cache);
    }
    return Dn(l, n, u);
  }
  function Kp(l, n, u) {
    if (l !== null)
      if (l.memoizedProps !== n.pendingProps)
        $t = !0;
      else {
        if (!Pr(l, u) && (n.flags & 128) === 0)
          return $t = !1, Jp(
            l,
            n,
            u
          );
        $t = (l.flags & 131072) !== 0;
      }
    else
      $t = !1, Le && (n.flags & 1048576) !== 0 && sr(n, Wc, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          l = n.pendingProps;
          var c = n.elementType, s = c._init;
          if (c = s(c._payload), n.type = c, typeof c == "function")
            xf(c) ? (l = ai(c, l), n.tag = 1, n = Jr(
              null,
              n,
              c,
              l,
              u
            )) : (n.tag = 0, n = Lr(
              null,
              n,
              c,
              l,
              u
            ));
          else {
            if (c != null) {
              if (s = c.$$typeof, s === Bt) {
                n.tag = 11, n = Lp(
                  null,
                  n,
                  c,
                  l,
                  u
                );
                break e;
              } else if (s === Ne) {
                n.tag = 14, n = mu(
                  null,
                  n,
                  c,
                  l,
                  u
                );
                break e;
              }
            }
            throw n = zt(c) || c, Error(g(306, n, ""));
          }
        }
        return n;
      case 0:
        return Lr(
          l,
          n,
          n.type,
          n.pendingProps,
          u
        );
      case 1:
        return c = n.type, s = ai(
          c,
          n.pendingProps
        ), Jr(
          l,
          n,
          c,
          s,
          u
        );
      case 3:
        e: {
          if (Dt(
            n,
            n.stateNode.containerInfo
          ), l === null) throw Error(g(387));
          c = n.pendingProps;
          var r = n.memoizedState;
          s = r.element, Tr(l, n), su(n, c, null, u);
          var m = n.memoizedState;
          if (c = m.cache, fu(n, Kt, c), c !== r.cache && Kh(
            n,
            [Kt],
            u,
            !0
          ), ao(), c = m.element, r.isDehydrated)
            if (r = {
              element: c,
              isDehydrated: !1,
              cache: m.cache
            }, n.updateQueue.baseState = r, n.memoizedState = r, n.flags & 256) {
              n = Kr(
                l,
                n,
                c,
                u
              );
              break e;
            } else if (c !== s) {
              s = ca(
                Error(g(424)),
                n
              ), Pc(s), n = Kr(
                l,
                n,
                c,
                u
              );
              break e;
            } else {
              switch (l = n.stateNode.containerInfo, l.nodeType) {
                case 9:
                  l = l.body;
                  break;
                default:
                  l = l.nodeName === "HTML" ? l.ownerDocument.body : l;
              }
              for (Ke = tn(l.firstChild), wt = n, Le = !0, Da = null, Oa = !0, u = An(
                n,
                null,
                c,
                u
              ), n.child = u; u; )
                u.flags = u.flags & -3 | 4096, u = u.sibling;
            }
          else {
            if (Ic(), c === s) {
              n = Dn(
                l,
                n,
                u
              );
              break e;
            }
            al(
              l,
              n,
              c,
              u
            );
          }
          n = n.child;
        }
        return n;
      case 26:
        return $f(l, n), l === null ? (u = f0(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = u : Le || (u = n.type, l = n.pendingProps, c = qa(
          Ve.current
        ).createElement(u), c[el] = n, c[Cl] = l, ve(c, u, l), Jt(c), n.stateNode = c) : n.memoizedState = f0(
          n.type,
          l.memoizedProps,
          n.pendingProps,
          l.memoizedState
        ), null;
      case 27:
        return Ta(n), l === null && Le && (c = n.stateNode = te(
          n.type,
          n.pendingProps,
          Ve.current
        ), wt = n, Oa = !0, s = Ke, hi(n.type) ? (mi = s, Ke = tn(
          c.firstChild
        )) : Ke = s), al(
          l,
          n,
          n.pendingProps.children,
          u
        ), $f(l, n), l === null && (n.flags |= 4194304), n.child;
      case 5:
        return l === null && Le && ((s = c = Ke) && (c = Uo(
          c,
          n.type,
          n.pendingProps,
          Oa
        ), c !== null ? (n.stateNode = c, wt = n, Ke = tn(
          c.firstChild
        ), Oa = !1, s = !0) : s = !1), s || cu(n)), Ta(n), s = n.type, r = n.pendingProps, m = l !== null ? l.memoizedProps : null, c = r.children, qn(s, r) ? c = null : m !== null && qn(s, m) && (n.flags |= 32), n.memoizedState !== null && (s = Ar(
          l,
          n,
          _p,
          null,
          null,
          u
        ), ta._currentValue = s), $f(l, n), al(l, n, c, u), n.child;
      case 6:
        return l === null && Le && ((l = u = Ke) && (u = zv(
          u,
          n.pendingProps,
          Oa
        ), u !== null ? (n.stateNode = u, wt = n, Ke = null, l = !0) : l = !1), l || cu(n)), null;
      case 13:
        return Rm(l, n, u);
      case 4:
        return Dt(
          n,
          n.stateNode.containerInfo
        ), c = n.pendingProps, l === null ? n.child = uc(
          n,
          null,
          c,
          u
        ) : al(
          l,
          n,
          c,
          u
        ), n.child;
      case 11:
        return Lp(
          l,
          n,
          n.type,
          n.pendingProps,
          u
        );
      case 7:
        return al(
          l,
          n,
          n.pendingProps,
          u
        ), n.child;
      case 8:
        return al(
          l,
          n,
          n.pendingProps.children,
          u
        ), n.child;
      case 12:
        return al(
          l,
          n,
          n.pendingProps.children,
          u
        ), n.child;
      case 10:
        return c = n.pendingProps, fu(n, n.type, c.value), al(
          l,
          n,
          c.children,
          u
        ), n.child;
      case 9:
        return s = n.type._context, c = n.pendingProps.children, Wu(n), s = tl(s), c = c(s), n.flags |= 1, al(l, n, c, u), n.child;
      case 14:
        return mu(
          l,
          n,
          n.type,
          n.pendingProps,
          u
        );
      case 15:
        return cc(
          l,
          n,
          n.type,
          n.pendingProps,
          u
        );
      case 19:
        return Ir(l, n, u);
      case 31:
        return c = n.pendingProps, u = n.mode, c = {
          mode: c.mode,
          children: c.children
        }, l === null ? (u = Wr(
          c,
          u
        ), u.ref = n.ref, n.child = u, u.return = n, n = u) : (u = ka(l.child, c), u.ref = n.ref, n.child = u, u.return = n, n = u), n;
      case 22:
        return Zr(l, n, u);
      case 24:
        return Wu(n), c = tl(Kt), l === null ? (s = Mf(), s === null && (s = ft, r = lo(), s.pooledCache = r, r.refCount++, r !== null && (s.pooledCacheLanes |= u), s = r), n.memoizedState = {
          parent: c,
          cache: s
        }, Sr(n), fu(n, Kt, s)) : ((l.lanes & u) !== 0 && (Tr(l, n), su(n, null, null, u), ao()), s = l.memoizedState, r = n.memoizedState, s.parent !== c ? (s = { parent: c, cache: c }, n.memoizedState = s, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = s), fu(n, Kt, c)) : (c = r.cache, fu(n, Kt, c), c !== s.cache && Kh(
          n,
          [Kt],
          u,
          !0
        ))), al(
          l,
          n,
          n.pendingProps.children,
          u
        ), n.child;
      case 29:
        throw n.pendingProps;
    }
    throw Error(g(156, n.tag));
  }
  function On(l) {
    l.flags |= 4;
  }
  function ro(l, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      l.flags &= -16777217;
    else if (l.flags |= 16777216, !oy(n)) {
      if (n = sa.current, n !== null && ((Be & 4194048) === Be ? Rl !== null : (Be & 62914560) !== Be && (Be & 536870912) === 0 || n !== Rl))
        throw Wi = gr, vr;
      l.flags |= 8192;
    }
  }
  function Ff(l, n) {
    n !== null && (l.flags |= 4), l.flags & 16384 && (n = l.tag !== 22 ? Di() : 536870912, l.lanes |= n, vo |= n);
  }
  function ho(l, n) {
    if (!Le)
      switch (l.tailMode) {
        case "hidden":
          n = l.tail;
          for (var u = null; n !== null; )
            n.alternate !== null && (u = n), n = n.sibling;
          u === null ? l.tail = null : u.sibling = null;
          break;
        case "collapsed":
          u = l.tail;
          for (var c = null; u !== null; )
            u.alternate !== null && (c = u), u = u.sibling;
          c === null ? n || l.tail === null ? l.tail = null : l.tail.sibling = null : c.sibling = null;
      }
  }
  function ye(l) {
    var n = l.alternate !== null && l.alternate.child === l.child, u = 0, c = 0;
    if (n)
      for (var s = l.child; s !== null; )
        u |= s.lanes | s.childLanes, c |= s.subtreeFlags & 65011712, c |= s.flags & 65011712, s.return = l, s = s.sibling;
    else
      for (s = l.child; s !== null; )
        u |= s.lanes | s.childLanes, c |= s.subtreeFlags, c |= s.flags, s.return = l, s = s.sibling;
    return l.subtreeFlags |= c, l.childLanes = u, n;
  }
  function zm(l, n, u) {
    var c = n.pendingProps;
    switch (pn(n), n.tag) {
      case 31:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return ye(n), null;
      case 1:
        return ye(n), null;
      case 3:
        return u = n.stateNode, c = null, l !== null && (c = l.memoizedState.cache), n.memoizedState.cache !== c && (n.flags |= 2048), vn(Kt), fl(), u.pendingContext && (u.context = u.pendingContext, u.pendingContext = null), (l === null || l.child === null) && (Fc(n) ? On(n) : l === null || l.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, Jh())), ye(n), null;
      case 26:
        return u = n.memoizedState, l === null ? (On(n), u !== null ? (ye(n), ro(n, u)) : (ye(n), n.flags &= -16777217)) : u ? u !== l.memoizedState ? (On(n), ye(n), ro(n, u)) : (ye(n), n.flags &= -16777217) : (l.memoizedProps !== c && On(n), ye(n), n.flags &= -16777217), null;
      case 27:
        Ai(n), u = Ve.current;
        var s = n.type;
        if (l !== null && n.stateNode != null)
          l.memoizedProps !== c && On(n);
        else {
          if (!c) {
            if (n.stateNode === null)
              throw Error(g(166));
            return ye(n), null;
          }
          l = je.current, Fc(n) ? Af(n) : (l = te(s, c, u), n.stateNode = l, On(n));
        }
        return ye(n), null;
      case 5:
        if (Ai(n), u = n.type, l !== null && n.stateNode != null)
          l.memoizedProps !== c && On(n);
        else {
          if (!c) {
            if (n.stateNode === null)
              throw Error(g(166));
            return ye(n), null;
          }
          if (l = je.current, Fc(n))
            Af(n);
          else {
            switch (s = qa(
              Ve.current
            ), l) {
              case 1:
                l = s.createElementNS(
                  "http://www.w3.org/2000/svg",
                  u
                );
                break;
              case 2:
                l = s.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  u
                );
                break;
              default:
                switch (u) {
                  case "svg":
                    l = s.createElementNS(
                      "http://www.w3.org/2000/svg",
                      u
                    );
                    break;
                  case "math":
                    l = s.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    l = s.createElement("div"), l.innerHTML = "<script><\/script>", l = l.removeChild(l.firstChild);
                    break;
                  case "select":
                    l = typeof c.is == "string" ? s.createElement("select", { is: c.is }) : s.createElement("select"), c.multiple ? l.multiple = !0 : c.size && (l.size = c.size);
                    break;
                  default:
                    l = typeof c.is == "string" ? s.createElement(u, { is: c.is }) : s.createElement(u);
                }
            }
            l[el] = n, l[Cl] = c;
            e: for (s = n.child; s !== null; ) {
              if (s.tag === 5 || s.tag === 6)
                l.appendChild(s.stateNode);
              else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
                s.child.return = s, s = s.child;
                continue;
              }
              if (s === n) break e;
              for (; s.sibling === null; ) {
                if (s.return === null || s.return === n)
                  break e;
                s = s.return;
              }
              s.sibling.return = s.return, s = s.sibling;
            }
            n.stateNode = l;
            e: switch (ve(l, u, c), u) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                l = !!c.autoFocus;
                break e;
              case "img":
                l = !0;
                break e;
              default:
                l = !1;
            }
            l && On(n);
          }
        }
        return ye(n), n.flags &= -16777217, null;
      case 6:
        if (l && n.stateNode != null)
          l.memoizedProps !== c && On(n);
        else {
          if (typeof c != "string" && n.stateNode === null)
            throw Error(g(166));
          if (l = Ve.current, Fc(n)) {
            if (l = n.stateNode, u = n.memoizedProps, c = null, s = wt, s !== null)
              switch (s.tag) {
                case 27:
                case 5:
                  c = s.memoizedProps;
              }
            l[el] = n, l = !!(l.nodeValue === u || c !== null && c.suppressHydrationWarning === !0 || ny(l.nodeValue, u)), l || cu(n);
          } else
            l = qa(l).createTextNode(
              c
            ), l[el] = n, n.stateNode = l;
        }
        return ye(n), null;
      case 13:
        if (c = n.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (s = Fc(n), c !== null && c.dehydrated !== null) {
            if (l === null) {
              if (!s) throw Error(g(318));
              if (s = n.memoizedState, s = s !== null ? s.dehydrated : null, !s) throw Error(g(317));
              s[el] = n;
            } else
              Ic(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            ye(n), s = !1;
          } else
            s = Jh(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = s), s = !0;
          if (!s)
            return n.flags & 256 ? (Pa(n), n) : (Pa(n), null);
        }
        if (Pa(n), (n.flags & 128) !== 0)
          return n.lanes = u, n;
        if (u = c !== null, l = l !== null && l.memoizedState !== null, u) {
          c = n.child, s = null, c.alternate !== null && c.alternate.memoizedState !== null && c.alternate.memoizedState.cachePool !== null && (s = c.alternate.memoizedState.cachePool.pool);
          var r = null;
          c.memoizedState !== null && c.memoizedState.cachePool !== null && (r = c.memoizedState.cachePool.pool), r !== s && (c.flags |= 2048);
        }
        return u !== l && u && (n.child.flags |= 8192), Ff(n, n.updateQueue), ye(n), null;
      case 4:
        return fl(), l === null && ly(n.stateNode.containerInfo), ye(n), null;
      case 10:
        return vn(n.type), ye(n), null;
      case 19:
        if (I(ct), s = n.memoizedState, s === null) return ye(n), null;
        if (c = (n.flags & 128) !== 0, r = s.rendering, r === null)
          if (c) ho(s, !1);
          else {
            if (Nt !== 0 || l !== null && (l.flags & 128) !== 0)
              for (l = n.child; l !== null; ) {
                if (r = Lf(l), r !== null) {
                  for (n.flags |= 128, ho(s, !1), l = r.updateQueue, n.updateQueue = l, Ff(n, l), n.subtreeFlags = 0, l = u, u = n.child; u !== null; )
                    Ue(u, l), u = u.sibling;
                  return me(
                    ct,
                    ct.current & 1 | 2
                  ), n.child;
                }
                l = l.sibling;
              }
            s.tail !== null && aa() > od && (n.flags |= 128, c = !0, ho(s, !1), n.lanes = 4194304);
          }
        else {
          if (!c)
            if (l = Lf(r), l !== null) {
              if (n.flags |= 128, c = !0, l = l.updateQueue, n.updateQueue = l, Ff(n, l), ho(s, !0), s.tail === null && s.tailMode === "hidden" && !r.alternate && !Le)
                return ye(n), null;
            } else
              2 * aa() - s.renderingStartTime > od && u !== 536870912 && (n.flags |= 128, c = !0, ho(s, !1), n.lanes = 4194304);
          s.isBackwards ? (r.sibling = n.child, n.child = r) : (l = s.last, l !== null ? l.sibling = r : n.child = r, s.last = r);
        }
        return s.tail !== null ? (n = s.tail, s.rendering = n, s.tail = n.sibling, s.renderingStartTime = aa(), n.sibling = null, l = ct.current, me(ct, c ? l & 1 | 2 : l & 1), n) : (ye(n), null);
      case 22:
      case 23:
        return Pa(n), uo(), c = n.memoizedState !== null, l !== null ? l.memoizedState !== null !== c && (n.flags |= 8192) : c && (n.flags |= 8192), c ? (u & 536870912) !== 0 && (n.flags & 128) === 0 && (ye(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : ye(n), u = n.updateQueue, u !== null && Ff(n, u.retryQueue), u = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), c = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (c = n.memoizedState.cachePool.pool), c !== u && (n.flags |= 2048), l !== null && I(bn), null;
      case 24:
        return u = null, l !== null && (u = l.memoizedState.cache), n.memoizedState.cache !== u && (n.flags |= 2048), vn(Kt), ye(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(g(156, n.tag));
  }
  function gv(l, n) {
    switch (pn(n), n.tag) {
      case 1:
        return l = n.flags, l & 65536 ? (n.flags = l & -65537 | 128, n) : null;
      case 3:
        return vn(Kt), fl(), l = n.flags, (l & 65536) !== 0 && (l & 128) === 0 ? (n.flags = l & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return Ai(n), null;
      case 13:
        if (Pa(n), l = n.memoizedState, l !== null && l.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(g(340));
          Ic();
        }
        return l = n.flags, l & 65536 ? (n.flags = l & -65537 | 128, n) : null;
      case 19:
        return I(ct), null;
      case 4:
        return fl(), null;
      case 10:
        return vn(n.type), null;
      case 22:
      case 23:
        return Pa(n), uo(), l !== null && I(bn), l = n.flags, l & 65536 ? (n.flags = l & -65537 | 128, n) : null;
      case 24:
        return vn(Kt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Dm(l, n) {
    switch (pn(n), n.tag) {
      case 3:
        vn(Kt), fl();
        break;
      case 26:
      case 27:
      case 5:
        Ai(n);
        break;
      case 4:
        fl();
        break;
      case 13:
        Pa(n);
        break;
      case 19:
        I(ct);
        break;
      case 10:
        vn(n.type);
        break;
      case 22:
      case 23:
        Pa(n), uo(), l !== null && I(bn);
        break;
      case 24:
        vn(Kt);
    }
  }
  function If(l, n) {
    try {
      var u = n.updateQueue, c = u !== null ? u.lastEffect : null;
      if (c !== null) {
        var s = c.next;
        u = s;
        do {
          if ((u.tag & l) === l) {
            c = void 0;
            var r = u.create, m = u.inst;
            c = r(), m.destroy = c;
          }
          u = u.next;
        } while (u !== s);
      }
    } catch (y) {
      at(n, n.return, y);
    }
  }
  function ui(l, n, u) {
    try {
      var c = n.updateQueue, s = c !== null ? c.lastEffect : null;
      if (s !== null) {
        var r = s.next;
        c = r;
        do {
          if ((c.tag & l) === l) {
            var m = c.inst, y = m.destroy;
            if (y !== void 0) {
              m.destroy = void 0, s = n;
              var b = u, M = y;
              try {
                M();
              } catch (G) {
                at(
                  s,
                  b,
                  G
                );
              }
            }
          }
          c = c.next;
        } while (c !== r);
      }
    } catch (G) {
      at(n, n.return, G);
    }
  }
  function ed(l) {
    var n = l.updateQueue;
    if (n !== null) {
      var u = l.stateNode;
      try {
        Hf(n, u);
      } catch (c) {
        at(l, l.return, c);
      }
    }
  }
  function Om(l, n, u) {
    u.props = ai(
      l.type,
      l.memoizedProps
    ), u.state = l.memoizedState;
    try {
      u.componentWillUnmount();
    } catch (c) {
      at(l, n, c);
    }
  }
  function mo(l, n) {
    try {
      var u = l.ref;
      if (u !== null) {
        switch (l.tag) {
          case 26:
          case 27:
          case 5:
            var c = l.stateNode;
            break;
          case 30:
            c = l.stateNode;
            break;
          default:
            c = l.stateNode;
        }
        typeof u == "function" ? l.refCleanup = u(c) : u.current = c;
      }
    } catch (s) {
      at(l, n, s);
    }
  }
  function en(l, n) {
    var u = l.ref, c = l.refCleanup;
    if (u !== null)
      if (typeof c == "function")
        try {
          c();
        } catch (s) {
          at(l, n, s);
        } finally {
          l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
        }
      else if (typeof u == "function")
        try {
          u(null);
        } catch (s) {
          at(l, n, s);
        }
      else u.current = null;
  }
  function yo(l) {
    var n = l.type, u = l.memoizedProps, c = l.stateNode;
    try {
      e: switch (n) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          u.autoFocus && c.focus();
          break e;
        case "img":
          u.src ? c.src = u.src : u.srcSet && (c.srcset = u.srcSet);
      }
    } catch (s) {
      at(l, l.return, s);
    }
  }
  function Mm(l, n, u) {
    try {
      var c = l.stateNode;
      Ev(c, l.type, u, n), c[Cl] = n;
    } catch (s) {
      at(l, l.return, s);
    }
  }
  function kp(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && hi(l.type) || l.tag === 4;
  }
  function Ha(l) {
    e: for (; ; ) {
      for (; l.sibling === null; ) {
        if (l.return === null || kp(l.return)) return null;
        l = l.return;
      }
      for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
        if (l.tag === 27 && hi(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue e;
        l.child.return = l, l = l.child;
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function fc(l, n, u) {
    var c = l.tag;
    if (c === 5 || c === 6)
      l = l.stateNode, n ? (u.nodeType === 9 ? u.body : u.nodeName === "HTML" ? u.ownerDocument.body : u).insertBefore(l, n) : (n = u.nodeType === 9 ? u.body : u.nodeName === "HTML" ? u.ownerDocument.body : u, n.appendChild(l), u = u._reactRootContainer, u != null || n.onclick !== null || (n.onclick = Sd));
    else if (c !== 4 && (c === 27 && hi(l.type) && (u = l.stateNode, n = null), l = l.child, l !== null))
      for (fc(l, n, u), l = l.sibling; l !== null; )
        fc(l, n, u), l = l.sibling;
  }
  function td(l, n, u) {
    var c = l.tag;
    if (c === 5 || c === 6)
      l = l.stateNode, n ? u.insertBefore(l, n) : u.appendChild(l);
    else if (c !== 4 && (c === 27 && hi(l.type) && (u = l.stateNode), l = l.child, l !== null))
      for (td(l, n, u), l = l.sibling; l !== null; )
        td(l, n, u), l = l.sibling;
  }
  function ld(l) {
    var n = l.stateNode, u = l.memoizedProps;
    try {
      for (var c = l.type, s = n.attributes; s.length; )
        n.removeAttributeNode(s[0]);
      ve(n, c, u), n[el] = l, n[Cl] = u;
    } catch (r) {
      at(l, l.return, r);
    }
  }
  var Mn = !1, Ct = !1, ad = !1, nd = typeof WeakSet == "function" ? WeakSet : Set, Wt = null;
  function Um(l, n) {
    if (l = l.containerInfo, rs = vs, l = wh(l), Sf(l)) {
      if ("selectionStart" in l)
        var u = {
          start: l.selectionStart,
          end: l.selectionEnd
        };
      else
        e: {
          u = (u = l.ownerDocument) && u.defaultView || window;
          var c = u.getSelection && u.getSelection();
          if (c && c.rangeCount !== 0) {
            u = c.anchorNode;
            var s = c.anchorOffset, r = c.focusNode;
            c = c.focusOffset;
            try {
              u.nodeType, r.nodeType;
            } catch {
              u = null;
              break e;
            }
            var m = 0, y = -1, b = -1, M = 0, G = 0, X = l, C = null;
            t: for (; ; ) {
              for (var N; X !== u || s !== 0 && X.nodeType !== 3 || (y = m + s), X !== r || c !== 0 && X.nodeType !== 3 || (b = m + c), X.nodeType === 3 && (m += X.nodeValue.length), (N = X.firstChild) !== null; )
                C = X, X = N;
              for (; ; ) {
                if (X === l) break t;
                if (C === u && ++M === s && (y = m), C === r && ++G === c && (b = m), (N = X.nextSibling) !== null) break;
                X = C, C = X.parentNode;
              }
              X = N;
            }
            u = y === -1 || b === -1 ? null : { start: y, end: b };
          } else u = null;
        }
      u = u || { start: 0, end: 0 };
    } else u = null;
    for (ds = { focusedElem: l, selectionRange: u }, vs = !1, Wt = n; Wt !== null; )
      if (n = Wt, l = n.child, (n.subtreeFlags & 1024) !== 0 && l !== null)
        l.return = n, Wt = l;
      else
        for (; Wt !== null; ) {
          switch (n = Wt, r = n.alternate, l = n.flags, n.tag) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((l & 1024) !== 0 && r !== null) {
                l = void 0, u = n, s = r.memoizedProps, r = r.memoizedState, c = u.stateNode;
                try {
                  var de = ai(
                    u.type,
                    s,
                    u.elementType === u.type
                  );
                  l = c.getSnapshotBeforeUpdate(
                    de,
                    r
                  ), c.__reactInternalSnapshotBeforeUpdate = l;
                } catch (he) {
                  at(
                    u,
                    u.return,
                    he
                  );
                }
              }
              break;
            case 3:
              if ((l & 1024) !== 0) {
                if (l = n.stateNode.containerInfo, u = l.nodeType, u === 9)
                  hs(l);
                else if (u === 1)
                  switch (l.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      hs(l);
                      break;
                    default:
                      l.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((l & 1024) !== 0) throw Error(g(163));
          }
          if (l = n.sibling, l !== null) {
            l.return = n.return, Wt = l;
            break;
          }
          Wt = n.return;
        }
  }
  function Cm(l, n, u) {
    var c = u.flags;
    switch (u.tag) {
      case 0:
      case 11:
      case 15:
        Cn(l, u), c & 4 && If(5, u);
        break;
      case 1:
        if (Cn(l, u), c & 4)
          if (l = u.stateNode, n === null)
            try {
              l.componentDidMount();
            } catch (m) {
              at(u, u.return, m);
            }
          else {
            var s = ai(
              u.type,
              n.memoizedProps
            );
            n = n.memoizedState;
            try {
              l.componentDidUpdate(
                s,
                n,
                l.__reactInternalSnapshotBeforeUpdate
              );
            } catch (m) {
              at(
                u,
                u.return,
                m
              );
            }
          }
        c & 64 && ed(u), c & 512 && mo(u, u.return);
        break;
      case 3:
        if (Cn(l, u), c & 64 && (l = u.updateQueue, l !== null)) {
          if (n = null, u.child !== null)
            switch (u.child.tag) {
              case 27:
              case 5:
                n = u.child.stateNode;
                break;
              case 1:
                n = u.child.stateNode;
            }
          try {
            Hf(l, n);
          } catch (m) {
            at(u, u.return, m);
          }
        }
        break;
      case 27:
        n === null && c & 4 && ld(u);
      case 26:
      case 5:
        Cn(l, u), n === null && c & 4 && yo(u), c & 512 && mo(u, u.return);
        break;
      case 12:
        Cn(l, u);
        break;
      case 13:
        Cn(l, u), c & 4 && ud(l, u), c & 64 && (l = u.memoizedState, l !== null && (l = l.dehydrated, l !== null && (u = bv.bind(
          null,
          u
        ), Dv(l, u))));
        break;
      case 22:
        if (c = u.memoizedState !== null || Mn, !c) {
          n = n !== null && n.memoizedState !== null || Ct, s = Mn;
          var r = Ct;
          Mn = c, (Ct = n) && !r ? ii(
            l,
            u,
            (u.subtreeFlags & 8772) !== 0
          ) : Cn(l, u), Mn = s, Ct = r;
        }
        break;
      case 30:
        break;
      default:
        Cn(l, u);
    }
  }
  function Hm(l) {
    var n = l.alternate;
    n !== null && (l.alternate = null, Hm(n)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (n = l.stateNode, n !== null && af(n)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
  }
  var bt = null, hl = !1;
  function Un(l, n, u) {
    for (u = u.child; u !== null; )
      _e(l, n, u), u = u.sibling;
  }
  function _e(l, n, u) {
    if (Ul && typeof Ul.onCommitFiberUnmount == "function")
      try {
        Ul.onCommitFiberUnmount(_c, u);
      } catch {
      }
    switch (u.tag) {
      case 26:
        Ct || en(u, n), Un(
          l,
          n,
          u
        ), u.memoizedState ? u.memoizedState.count-- : u.stateNode && (u = u.stateNode, u.parentNode.removeChild(u));
        break;
      case 27:
        Ct || en(u, n);
        var c = bt, s = hl;
        hi(u.type) && (bt = u.stateNode, hl = !1), Un(
          l,
          n,
          u
        ), Pl(u.stateNode), bt = c, hl = s;
        break;
      case 5:
        Ct || en(u, n);
      case 6:
        if (c = bt, s = hl, bt = null, Un(
          l,
          n,
          u
        ), bt = c, hl = s, bt !== null)
          if (hl)
            try {
              (bt.nodeType === 9 ? bt.body : bt.nodeName === "HTML" ? bt.ownerDocument.body : bt).removeChild(u.stateNode);
            } catch (r) {
              at(
                u,
                n,
                r
              );
            }
          else
            try {
              bt.removeChild(u.stateNode);
            } catch (r) {
              at(
                u,
                n,
                r
              );
            }
        break;
      case 18:
        bt !== null && (hl ? (l = bt, xd(
          l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
          u.stateNode
        ), wn(l)) : xd(bt, u.stateNode));
        break;
      case 4:
        c = bt, s = hl, bt = u.stateNode.containerInfo, hl = !0, Un(
          l,
          n,
          u
        ), bt = c, hl = s;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Ct || ui(2, u, n), Ct || ui(4, u, n), Un(
          l,
          n,
          u
        );
        break;
      case 1:
        Ct || (en(u, n), c = u.stateNode, typeof c.componentWillUnmount == "function" && Om(
          u,
          n,
          c
        )), Un(
          l,
          n,
          u
        );
        break;
      case 21:
        Un(
          l,
          n,
          u
        );
        break;
      case 22:
        Ct = (c = Ct) || u.memoizedState !== null, Un(
          l,
          n,
          u
        ), Ct = c;
        break;
      default:
        Un(
          l,
          n,
          u
        );
    }
  }
  function ud(l, n) {
    if (n.memoizedState === null && (l = n.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
      try {
        wn(l);
      } catch (u) {
        at(n, n.return, u);
      }
  }
  function Nm(l) {
    switch (l.tag) {
      case 13:
      case 19:
        var n = l.stateNode;
        return n === null && (n = l.stateNode = new nd()), n;
      case 22:
        return l = l.stateNode, n = l._retryCache, n === null && (n = l._retryCache = new nd()), n;
      default:
        throw Error(g(435, l.tag));
    }
  }
  function id(l, n) {
    var u = Nm(l);
    n.forEach(function(c) {
      var s = Sv.bind(null, l, c);
      u.has(c) || (u.add(c), c.then(s, s));
    });
  }
  function jl(l, n) {
    var u = n.deletions;
    if (u !== null)
      for (var c = 0; c < u.length; c++) {
        var s = u[c], r = l, m = n, y = m;
        e: for (; y !== null; ) {
          switch (y.tag) {
            case 27:
              if (hi(y.type)) {
                bt = y.stateNode, hl = !1;
                break e;
              }
              break;
            case 5:
              bt = y.stateNode, hl = !1;
              break e;
            case 3:
            case 4:
              bt = y.stateNode.containerInfo, hl = !0;
              break e;
          }
          y = y.return;
        }
        if (bt === null) throw Error(g(160));
        _e(r, m, s), bt = null, hl = !1, r = s.alternate, r !== null && (r.return = null), s.return = null;
      }
    if (n.subtreeFlags & 13878)
      for (n = n.child; n !== null; )
        Pf(n, l), n = n.sibling;
  }
  var _l = null;
  function Pf(l, n) {
    var u = l.alternate, c = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        jl(n, l), nl(l), c & 4 && (ui(3, l, l.return), If(3, l), ui(5, l, l.return));
        break;
      case 1:
        jl(n, l), nl(l), c & 512 && (Ct || u === null || en(u, u.return)), c & 64 && Mn && (l = l.updateQueue, l !== null && (c = l.callbacks, c !== null && (u = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = u === null ? c : u.concat(c))));
        break;
      case 26:
        var s = _l;
        if (jl(n, l), nl(l), c & 512 && (Ct || u === null || en(u, u.return)), c & 4) {
          var r = u !== null ? u.memoizedState : null;
          if (c = l.memoizedState, u === null)
            if (c === null)
              if (l.stateNode === null) {
                e: {
                  c = l.type, u = l.memoizedProps, s = s.ownerDocument || s;
                  t: switch (c) {
                    case "title":
                      r = s.getElementsByTagName("title")[0], (!r || r[ae] || r[el] || r.namespaceURI === "http://www.w3.org/2000/svg" || r.hasAttribute("itemprop")) && (r = s.createElement(c), s.head.insertBefore(
                        r,
                        s.querySelector("head > title")
                      )), ve(r, c, u), r[el] = l, Jt(r), c = r;
                      break e;
                    case "link":
                      var m = iy(
                        "link",
                        "href",
                        s
                      ).get(c + (u.href || ""));
                      if (m) {
                        for (var y = 0; y < m.length; y++)
                          if (r = m[y], r.getAttribute("href") === (u.href == null || u.href === "" ? null : u.href) && r.getAttribute("rel") === (u.rel == null ? null : u.rel) && r.getAttribute("title") === (u.title == null ? null : u.title) && r.getAttribute("crossorigin") === (u.crossOrigin == null ? null : u.crossOrigin)) {
                            m.splice(y, 1);
                            break t;
                          }
                      }
                      r = s.createElement(c), ve(r, c, u), s.head.appendChild(r);
                      break;
                    case "meta":
                      if (m = iy(
                        "meta",
                        "content",
                        s
                      ).get(c + (u.content || ""))) {
                        for (y = 0; y < m.length; y++)
                          if (r = m[y], r.getAttribute("content") === (u.content == null ? null : "" + u.content) && r.getAttribute("name") === (u.name == null ? null : u.name) && r.getAttribute("property") === (u.property == null ? null : u.property) && r.getAttribute("http-equiv") === (u.httpEquiv == null ? null : u.httpEquiv) && r.getAttribute("charset") === (u.charSet == null ? null : u.charSet)) {
                            m.splice(y, 1);
                            break t;
                          }
                      }
                      r = s.createElement(c), ve(r, c, u), s.head.appendChild(r);
                      break;
                    default:
                      throw Error(g(468, c));
                  }
                  r[el] = l, Jt(r), c = r;
                }
                l.stateNode = c;
              } else
                cy(
                  s,
                  l.type,
                  l.stateNode
                );
            else
              l.stateNode = r0(
                s,
                c,
                l.memoizedProps
              );
          else
            r !== c ? (r === null ? u.stateNode !== null && (u = u.stateNode, u.parentNode.removeChild(u)) : r.count--, c === null ? cy(
              s,
              l.type,
              l.stateNode
            ) : r0(
              s,
              c,
              l.memoizedProps
            )) : c === null && l.stateNode !== null && Mm(
              l,
              l.memoizedProps,
              u.memoizedProps
            );
        }
        break;
      case 27:
        jl(n, l), nl(l), c & 512 && (Ct || u === null || en(u, u.return)), u !== null && c & 4 && Mm(
          l,
          l.memoizedProps,
          u.memoizedProps
        );
        break;
      case 5:
        if (jl(n, l), nl(l), c & 512 && (Ct || u === null || en(u, u.return)), l.flags & 32) {
          s = l.stateNode;
          try {
            wc(s, "");
          } catch (N) {
            at(l, l.return, N);
          }
        }
        c & 4 && l.stateNode != null && (s = l.memoizedProps, Mm(
          l,
          s,
          u !== null ? u.memoizedProps : s
        )), c & 1024 && (ad = !0);
        break;
      case 6:
        if (jl(n, l), nl(l), c & 4) {
          if (l.stateNode === null)
            throw Error(g(162));
          c = l.memoizedProps, u = l.stateNode;
          try {
            u.nodeValue = c;
          } catch (N) {
            at(l, l.return, N);
          }
        }
        break;
      case 3:
        if (vi = null, s = _l, _l = Ed(n.containerInfo), jl(n, l), _l = s, nl(l), c & 4 && u !== null && u.memoizedState.isDehydrated)
          try {
            wn(n.containerInfo);
          } catch (N) {
            at(l, l.return, N);
          }
        ad && (ad = !1, jm(l));
        break;
      case 4:
        c = _l, _l = Ed(
          l.stateNode.containerInfo
        ), jl(n, l), nl(l), _l = c;
        break;
      case 12:
        jl(n, l), nl(l);
        break;
      case 13:
        jl(n, l), nl(l), l.child.flags & 8192 && l.memoizedState !== null != (u !== null && u.memoizedState !== null) && (Xm = aa()), c & 4 && (c = l.updateQueue, c !== null && (l.updateQueue = null, id(l, c)));
        break;
      case 22:
        s = l.memoizedState !== null;
        var b = u !== null && u.memoizedState !== null, M = Mn, G = Ct;
        if (Mn = M || s, Ct = G || b, jl(n, l), Ct = G, Mn = M, nl(l), c & 8192)
          e: for (n = l.stateNode, n._visibility = s ? n._visibility & -2 : n._visibility | 1, s && (u === null || b || Mn || Ct || St(l)), u = null, n = l; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (u === null) {
                b = u = n;
                try {
                  if (r = b.stateNode, s)
                    m = r.style, typeof m.setProperty == "function" ? m.setProperty("display", "none", "important") : m.display = "none";
                  else {
                    y = b.stateNode;
                    var X = b.memoizedProps.style, C = X != null && X.hasOwnProperty("display") ? X.display : null;
                    y.style.display = C == null || typeof C == "boolean" ? "" : ("" + C).trim();
                  }
                } catch (N) {
                  at(b, b.return, N);
                }
              }
            } else if (n.tag === 6) {
              if (u === null) {
                b = n;
                try {
                  b.stateNode.nodeValue = s ? "" : b.memoizedProps;
                } catch (N) {
                  at(b, b.return, N);
                }
              }
            } else if ((n.tag !== 22 && n.tag !== 23 || n.memoizedState === null || n === l) && n.child !== null) {
              n.child.return = n, n = n.child;
              continue;
            }
            if (n === l) break e;
            for (; n.sibling === null; ) {
              if (n.return === null || n.return === l) break e;
              u === n && (u = null), n = n.return;
            }
            u === n && (u = null), n.sibling.return = n.return, n = n.sibling;
          }
        c & 4 && (c = l.updateQueue, c !== null && (u = c.retryQueue, u !== null && (c.retryQueue = null, id(l, u))));
        break;
      case 19:
        jl(n, l), nl(l), c & 4 && (c = l.updateQueue, c !== null && (l.updateQueue = null, id(l, c)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        jl(n, l), nl(l);
    }
  }
  function nl(l) {
    var n = l.flags;
    if (n & 2) {
      try {
        for (var u, c = l.return; c !== null; ) {
          if (kp(c)) {
            u = c;
            break;
          }
          c = c.return;
        }
        if (u == null) throw Error(g(160));
        switch (u.tag) {
          case 27:
            var s = u.stateNode, r = Ha(l);
            td(l, r, s);
            break;
          case 5:
            var m = u.stateNode;
            u.flags & 32 && (wc(m, ""), u.flags &= -33);
            var y = Ha(l);
            td(l, y, m);
            break;
          case 3:
          case 4:
            var b = u.stateNode.containerInfo, M = Ha(l);
            fc(
              l,
              M,
              b
            );
            break;
          default:
            throw Error(g(161));
        }
      } catch (G) {
        at(l, l.return, G);
      }
      l.flags &= -3;
    }
    n & 4096 && (l.flags &= -4097);
  }
  function jm(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var n = l;
        jm(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), l = l.sibling;
      }
  }
  function Cn(l, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        Cm(l, n.alternate, n), n = n.sibling;
  }
  function St(l) {
    for (l = l.child; l !== null; ) {
      var n = l;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ui(4, n, n.return), St(n);
          break;
        case 1:
          en(n, n.return);
          var u = n.stateNode;
          typeof u.componentWillUnmount == "function" && Om(
            n,
            n.return,
            u
          ), St(n);
          break;
        case 27:
          Pl(n.stateNode);
        case 26:
        case 5:
          en(n, n.return), St(n);
          break;
        case 22:
          n.memoizedState === null && St(n);
          break;
        case 30:
          St(n);
          break;
        default:
          St(n);
      }
      l = l.sibling;
    }
  }
  function ii(l, n, u) {
    for (u = u && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var c = n.alternate, s = l, r = n, m = r.flags;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          ii(
            s,
            r,
            u
          ), If(4, r);
          break;
        case 1:
          if (ii(
            s,
            r,
            u
          ), c = r, s = c.stateNode, typeof s.componentDidMount == "function")
            try {
              s.componentDidMount();
            } catch (M) {
              at(c, c.return, M);
            }
          if (c = r, s = c.updateQueue, s !== null) {
            var y = c.stateNode;
            try {
              var b = s.shared.hiddenCallbacks;
              if (b !== null)
                for (s.shared.hiddenCallbacks = null, s = 0; s < b.length; s++)
                  xr(b[s], y);
            } catch (M) {
              at(c, c.return, M);
            }
          }
          u && m & 64 && ed(r), mo(r, r.return);
          break;
        case 27:
          ld(r);
        case 26:
        case 5:
          ii(
            s,
            r,
            u
          ), u && c === null && m & 4 && yo(r), mo(r, r.return);
          break;
        case 12:
          ii(
            s,
            r,
            u
          );
          break;
        case 13:
          ii(
            s,
            r,
            u
          ), u && m & 4 && ud(s, r);
          break;
        case 22:
          r.memoizedState === null && ii(
            s,
            r,
            u
          ), mo(r, r.return);
          break;
        case 30:
          break;
        default:
          ii(
            s,
            r,
            u
          );
      }
      n = n.sibling;
    }
  }
  function Na(l, n) {
    var u = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), l = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (l = n.memoizedState.cachePool.pool), l !== u && (l != null && l.refCount++, u != null && gn(u));
  }
  function cd(l, n) {
    l = null, n.alternate !== null && (l = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== l && (n.refCount++, l != null && gn(l));
  }
  function ml(l, n, u, c) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        _m(
          l,
          n,
          u,
          c
        ), n = n.sibling;
  }
  function _m(l, n, u, c) {
    var s = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        ml(
          l,
          n,
          u,
          c
        ), s & 2048 && If(9, n);
        break;
      case 1:
        ml(
          l,
          n,
          u,
          c
        );
        break;
      case 3:
        ml(
          l,
          n,
          u,
          c
        ), s & 2048 && (l = null, n.alternate !== null && (l = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== l && (n.refCount++, l != null && gn(l)));
        break;
      case 12:
        if (s & 2048) {
          ml(
            l,
            n,
            u,
            c
          ), l = n.stateNode;
          try {
            var r = n.memoizedProps, m = r.id, y = r.onPostCommit;
            typeof y == "function" && y(
              m,
              n.alternate === null ? "mount" : "update",
              l.passiveEffectDuration,
              -0
            );
          } catch (b) {
            at(n, n.return, b);
          }
        } else
          ml(
            l,
            n,
            u,
            c
          );
        break;
      case 13:
        ml(
          l,
          n,
          u,
          c
        );
        break;
      case 23:
        break;
      case 22:
        r = n.stateNode, m = n.alternate, n.memoizedState !== null ? r._visibility & 2 ? ml(
          l,
          n,
          u,
          c
        ) : ke(l, n) : r._visibility & 2 ? ml(
          l,
          n,
          u,
          c
        ) : (r._visibility |= 2, yu(
          l,
          n,
          u,
          c,
          (n.subtreeFlags & 10256) !== 0
        )), s & 2048 && Na(m, n);
        break;
      case 24:
        ml(
          l,
          n,
          u,
          c
        ), s & 2048 && cd(n.alternate, n);
        break;
      default:
        ml(
          l,
          n,
          u,
          c
        );
    }
  }
  function yu(l, n, u, c, s) {
    for (s = s && (n.subtreeFlags & 10256) !== 0, n = n.child; n !== null; ) {
      var r = l, m = n, y = u, b = c, M = m.flags;
      switch (m.tag) {
        case 0:
        case 11:
        case 15:
          yu(
            r,
            m,
            y,
            b,
            s
          ), If(8, m);
          break;
        case 23:
          break;
        case 22:
          var G = m.stateNode;
          m.memoizedState !== null ? G._visibility & 2 ? yu(
            r,
            m,
            y,
            b,
            s
          ) : ke(
            r,
            m
          ) : (G._visibility |= 2, yu(
            r,
            m,
            y,
            b,
            s
          )), s && M & 2048 && Na(
            m.alternate,
            m
          );
          break;
        case 24:
          yu(
            r,
            m,
            y,
            b,
            s
          ), s && M & 2048 && cd(m.alternate, m);
          break;
        default:
          yu(
            r,
            m,
            y,
            b,
            s
          );
      }
      n = n.sibling;
    }
  }
  function ke(l, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var u = l, c = n, s = c.flags;
        switch (c.tag) {
          case 22:
            ke(u, c), s & 2048 && Na(
              c.alternate,
              c
            );
            break;
          case 24:
            ke(u, c), s & 2048 && cd(c.alternate, c);
            break;
          default:
            ke(u, c);
        }
        n = n.sibling;
      }
  }
  var sc = 8192;
  function Ht(l) {
    if (l.subtreeFlags & sc)
      for (l = l.child; l !== null; )
        $p(l), l = l.sibling;
  }
  function $p(l) {
    switch (l.tag) {
      case 26:
        Ht(l), l.flags & sc && l.memoizedState !== null && m0(
          _l,
          l.memoizedState,
          l.memoizedProps
        );
        break;
      case 5:
        Ht(l);
        break;
      case 3:
      case 4:
        var n = _l;
        _l = Ed(l.stateNode.containerInfo), Ht(l), _l = n;
        break;
      case 22:
        l.memoizedState === null && (n = l.alternate, n !== null && n.memoizedState !== null ? (n = sc, sc = 16777216, Ht(l), sc = n) : Ht(l));
        break;
      default:
        Ht(l);
    }
  }
  function qm(l) {
    var n = l.alternate;
    if (n !== null && (l = n.child, l !== null)) {
      n.child = null;
      do
        n = l.sibling, l.sibling = null, l = n;
      while (l !== null);
    }
  }
  function rc(l) {
    var n = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (n !== null)
        for (var u = 0; u < n.length; u++) {
          var c = n[u];
          Wt = c, Ym(
            c,
            l
          );
        }
      qm(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        Bm(l), l = l.sibling;
  }
  function Bm(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        rc(l), l.flags & 2048 && ui(9, l, l.return);
        break;
      case 3:
        rc(l);
        break;
      case 12:
        rc(l);
        break;
      case 22:
        var n = l.stateNode;
        l.memoizedState !== null && n._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (n._visibility &= -3, ql(l)) : rc(l);
        break;
      default:
        rc(l);
    }
  }
  function ql(l) {
    var n = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (n !== null)
        for (var u = 0; u < n.length; u++) {
          var c = n[u];
          Wt = c, Ym(
            c,
            l
          );
        }
      qm(l);
    }
    for (l = l.child; l !== null; ) {
      switch (n = l, n.tag) {
        case 0:
        case 11:
        case 15:
          ui(8, n, n.return), ql(n);
          break;
        case 22:
          u = n.stateNode, u._visibility & 2 && (u._visibility &= -3, ql(n));
          break;
        default:
          ql(n);
      }
      l = l.sibling;
    }
  }
  function Ym(l, n) {
    for (; Wt !== null; ) {
      var u = Wt;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          ui(8, u, n);
          break;
        case 23:
        case 22:
          if (u.memoizedState !== null && u.memoizedState.cachePool !== null) {
            var c = u.memoizedState.cachePool.pool;
            c != null && c.refCount++;
          }
          break;
        case 24:
          gn(u.memoizedState.cache);
      }
      if (c = u.child, c !== null) c.return = u, Wt = c;
      else
        e: for (u = l; Wt !== null; ) {
          c = Wt;
          var s = c.sibling, r = c.return;
          if (Hm(c), c === u) {
            Wt = null;
            break e;
          }
          if (s !== null) {
            s.return = r, Wt = s;
            break e;
          }
          Wt = r;
        }
    }
  }
  var wm = {
    getCacheForType: function(l) {
      var n = tl(Kt), u = n.data.get(l);
      return u === void 0 && (u = l(), n.data.set(l, u)), u;
    }
  }, Wp = typeof WeakMap == "function" ? WeakMap : Map, et = 0, ft = null, qe = null, Be = 0, tt = 0, Wl = null, Hn = !1, po = !1, Gm = !1, pu = 0, Nt = 0, vu = 0, dc = 0, Nn = 0, ja = 0, vo = 0, go = null, Fl = null, Vm = !1, Xm = 0, od = 1 / 0, bo = null, ci = null, yl = 0, jn = null, So = null, pl = 0, fd = 0, sd = null, Qm = null, To = 0, Zm = null;
  function ra() {
    if ((et & 2) !== 0 && Be !== 0)
      return Be & -Be;
    if (z.T !== null) {
      var l = Ma;
      return l !== 0 ? l : pc();
    }
    return sp();
  }
  function Lm() {
    ja === 0 && (ja = (Be & 536870912) === 0 || Le ? Nu() : 536870912);
    var l = sa.current;
    return l !== null && (l.flags |= 32), ja;
  }
  function da(l, n, u) {
    (l === ft && (tt === 2 || tt === 9) || l.cancelPendingCommit !== null) && (_n(l, 0), gu(
      l,
      Be,
      ja,
      !1
    )), Oi(l, u), ((et & 2) === 0 || l !== ft) && (l === ft && ((et & 2) === 0 && (dc |= u), Nt === 4 && gu(
      l,
      Be,
      ja,
      !1
    )), Il(l));
  }
  function xo(l, n, u) {
    if ((et & 6) !== 0) throw Error(g(327));
    var c = !u && (n & 124) === 0 && (n & l.expiredLanes) === 0 || cn(l, n), s = c ? Km(l, n) : rd(l, n, !0), r = c;
    do {
      if (s === 0) {
        po && !c && gu(l, n, 0, !1);
        break;
      } else {
        if (u = l.current.alternate, r && !Fp(u)) {
          s = rd(l, n, !1), r = !1;
          continue;
        }
        if (s === 2) {
          if (r = n, l.errorRecoveryDisabledLanes & r)
            var m = 0;
          else
            m = l.pendingLanes & -536870913, m = m !== 0 ? m : m & 536870912 ? 536870912 : 0;
          if (m !== 0) {
            n = m;
            e: {
              var y = l;
              s = go;
              var b = y.current.memoizedState.isDehydrated;
              if (b && (_n(y, m).flags |= 256), m = rd(
                y,
                m,
                !1
              ), m !== 2) {
                if (Gm && !b) {
                  y.errorRecoveryDisabledLanes |= r, dc |= r, s = 4;
                  break e;
                }
                r = Fl, Fl = s, r !== null && (Fl === null ? Fl = r : Fl.push.apply(
                  Fl,
                  r
                ));
              }
              s = m;
            }
            if (r = !1, s !== 2) continue;
          }
        }
        if (s === 1) {
          _n(l, 0), gu(l, n, 0, !0);
          break;
        }
        e: {
          switch (c = l, r = s, r) {
            case 0:
            case 1:
              throw Error(g(345));
            case 4:
              if ((n & 4194048) !== n) break;
            case 6:
              gu(
                c,
                n,
                ja,
                !Hn
              );
              break e;
            case 2:
              Fl = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(g(329));
          }
          if ((n & 62914560) === n && (s = Xm + 300 - aa(), 10 < s)) {
            if (gu(
              c,
              n,
              ja,
              !Hn
            ), Hu(c, 0, !0) !== 0) break e;
            c.timeoutHandle = Td(
              es.bind(
                null,
                c,
                u,
                Fl,
                bo,
                Vm,
                n,
                ja,
                dc,
                vo,
                Hn,
                r,
                2,
                -0,
                0
              ),
              s
            );
            break e;
          }
          es(
            c,
            u,
            Fl,
            bo,
            Vm,
            n,
            ja,
            dc,
            vo,
            Hn,
            r,
            0,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Il(l);
  }
  function es(l, n, u, c, s, r, m, y, b, M, G, X, C, N) {
    if (l.timeoutHandle = -1, X = n.subtreeFlags, (X & 8192 || (X & 16785408) === 16785408) && (jo = { stylesheets: null, count: 0, unsuspend: h0 }, $p(n), X = fy(), X !== null)) {
      l.cancelPendingCommit = X(
        e0.bind(
          null,
          l,
          n,
          r,
          u,
          c,
          s,
          m,
          y,
          b,
          G,
          1,
          C,
          N
        )
      ), gu(l, r, m, !M);
      return;
    }
    e0(
      l,
      n,
      r,
      u,
      c,
      s,
      m,
      y,
      b
    );
  }
  function Fp(l) {
    for (var n = l; ; ) {
      var u = n.tag;
      if ((u === 0 || u === 11 || u === 15) && n.flags & 16384 && (u = n.updateQueue, u !== null && (u = u.stores, u !== null)))
        for (var c = 0; c < u.length; c++) {
          var s = u[c], r = s.getSnapshot;
          s = s.value;
          try {
            if (!dl(r(), s)) return !1;
          } catch {
            return !1;
          }
        }
      if (u = n.child, n.subtreeFlags & 16384 && u !== null)
        u.return = n, n = u;
      else {
        if (n === l) break;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === l) return !0;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
    }
    return !0;
  }
  function gu(l, n, u, c) {
    n &= ~Nn, n &= ~dc, l.suspendedLanes |= n, l.pingedLanes &= ~n, c && (l.warmLanes |= n), c = l.expirationTimes;
    for (var s = n; 0 < s; ) {
      var r = 31 - Vl(s), m = 1 << r;
      c[r] = -1, s &= ~m;
    }
    u !== 0 && tf(l, u, n);
  }
  function hc() {
    return (et & 6) === 0 ? (ns(0), !1) : !0;
  }
  function oi() {
    if (qe !== null) {
      if (tt === 0)
        var l = qe.return;
      else
        l = qe, Wa = ou = null, zr(l), ac = null, oo = 0, l = qe;
      for (; l !== null; )
        Dm(l.alternate, l), l = l.return;
      qe = null;
    }
  }
  function _n(l, n) {
    var u = l.timeoutHandle;
    u !== -1 && (l.timeoutHandle = -1, Av(u)), u = l.cancelPendingCommit, u !== null && (l.cancelPendingCommit = null, u()), oi(), ft = l, qe = u = ka(l.current, null), Be = n, tt = 0, Wl = null, Hn = !1, po = cn(l, n), Gm = !1, vo = ja = Nn = dc = vu = Nt = 0, Fl = go = null, Vm = !1, (n & 8) !== 0 && (n |= n & 32);
    var c = l.entangledLanes;
    if (c !== 0)
      for (l = l.entanglements, c &= n; 0 < c; ) {
        var s = 31 - Vl(c), r = 1 << s;
        n |= l[s], c &= ~r;
      }
    return pu = n, Ka(), u;
  }
  function Jm(l, n) {
    Ee = null, z.H = Vr, n === Iu || n === Uf ? (n = Wh(), tt = 3) : n === vr ? (n = Wh(), tt = 4) : tt = n === Ut ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, Wl = n, qe === null && (Nt = 1, kf(
      l,
      ca(n, l.current)
    ));
  }
  function Ip() {
    var l = z.H;
    return z.H = Vr, l === null ? Vr : l;
  }
  function mc() {
    var l = z.A;
    return z.A = wm, l;
  }
  function yc() {
    Nt = 4, Hn || (Be & 4194048) !== Be && sa.current !== null || (po = !0), (vu & 134217727) === 0 && (dc & 134217727) === 0 || ft === null || gu(
      ft,
      Be,
      ja,
      !1
    );
  }
  function rd(l, n, u) {
    var c = et;
    et |= 2;
    var s = Ip(), r = mc();
    (ft !== l || Be !== n) && (bo = null, _n(l, n)), n = !1;
    var m = Nt;
    e: do
      try {
        if (tt !== 0 && qe !== null) {
          var y = qe, b = Wl;
          switch (tt) {
            case 8:
              oi(), m = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              sa.current === null && (n = !0);
              var M = tt;
              if (tt = 0, Wl = null, Eo(l, y, b, M), u && po) {
                m = 0;
                break e;
              }
              break;
            default:
              M = tt, tt = 0, Wl = null, Eo(l, y, b, M);
          }
        }
        dd(), m = Nt;
        break;
      } catch (G) {
        Jm(l, G);
      }
    while (!0);
    return n && l.shellSuspendCounter++, Wa = ou = null, et = c, z.H = s, z.A = r, qe === null && (ft = null, Be = 0, Ka()), m;
  }
  function dd() {
    for (; qe !== null; ) $m(qe);
  }
  function Km(l, n) {
    var u = et;
    et |= 2;
    var c = Ip(), s = mc();
    ft !== l || Be !== n ? (bo = null, od = aa() + 500, _n(l, n)) : po = cn(
      l,
      n
    );
    e: do
      try {
        if (tt !== 0 && qe !== null) {
          n = qe;
          var r = Wl;
          t: switch (tt) {
            case 1:
              tt = 0, Wl = null, Eo(l, n, r, 1);
              break;
            case 2:
            case 9:
              if (br(r)) {
                tt = 0, Wl = null, Wm(n);
                break;
              }
              n = function() {
                tt !== 2 && tt !== 9 || ft !== l || (tt = 7), Il(l);
              }, r.then(n, n);
              break e;
            case 3:
              tt = 7;
              break e;
            case 4:
              tt = 5;
              break e;
            case 7:
              br(r) ? (tt = 0, Wl = null, Wm(n)) : (tt = 0, Wl = null, Eo(l, n, r, 7));
              break;
            case 5:
              var m = null;
              switch (qe.tag) {
                case 26:
                  m = qe.memoizedState;
                case 5:
                case 27:
                  var y = qe;
                  if (!m || oy(m)) {
                    tt = 0, Wl = null;
                    var b = y.sibling;
                    if (b !== null) qe = b;
                    else {
                      var M = y.return;
                      M !== null ? (qe = M, ts(M)) : qe = null;
                    }
                    break t;
                  }
              }
              tt = 0, Wl = null, Eo(l, n, r, 5);
              break;
            case 6:
              tt = 0, Wl = null, Eo(l, n, r, 6);
              break;
            case 8:
              oi(), Nt = 6;
              break e;
            default:
              throw Error(g(462));
          }
        }
        km();
        break;
      } catch (G) {
        Jm(l, G);
      }
    while (!0);
    return Wa = ou = null, z.H = c, z.A = s, et = u, qe !== null ? 0 : (ft = null, Be = 0, Ka(), Nt);
  }
  function km() {
    for (; qe !== null && !iv(); )
      $m(qe);
  }
  function $m(l) {
    var n = Kp(l.alternate, l, pu);
    l.memoizedProps = l.pendingProps, n === null ? ts(l) : qe = n;
  }
  function Wm(l) {
    var n = l, u = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = xm(
          u,
          n,
          n.pendingProps,
          n.type,
          void 0,
          Be
        );
        break;
      case 11:
        n = xm(
          u,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          Be
        );
        break;
      case 5:
        zr(n);
      default:
        Dm(u, n), n = qe = Ue(n, pu), n = Kp(u, n, pu);
    }
    l.memoizedProps = l.pendingProps, n === null ? ts(l) : qe = n;
  }
  function Eo(l, n, u, c) {
    Wa = ou = null, zr(n), ac = null, oo = 0;
    var s = n.return;
    try {
      if (Zp(
        l,
        s,
        n,
        u,
        Be
      )) {
        Nt = 1, kf(
          l,
          ca(u, l.current)
        ), qe = null;
        return;
      }
    } catch (r) {
      if (s !== null) throw qe = s, r;
      Nt = 1, kf(
        l,
        ca(u, l.current)
      ), qe = null;
      return;
    }
    n.flags & 32768 ? (Le || c === 1 ? l = !0 : po || (Be & 536870912) !== 0 ? l = !1 : (Hn = l = !0, (c === 2 || c === 9 || c === 3 || c === 6) && (c = sa.current, c !== null && c.tag === 13 && (c.flags |= 16384))), Pp(n, l)) : ts(n);
  }
  function ts(l) {
    var n = l;
    do {
      if ((n.flags & 32768) !== 0) {
        Pp(
          n,
          Hn
        );
        return;
      }
      l = n.return;
      var u = zm(
        n.alternate,
        n,
        pu
      );
      if (u !== null) {
        qe = u;
        return;
      }
      if (n = n.sibling, n !== null) {
        qe = n;
        return;
      }
      qe = n = l;
    } while (n !== null);
    Nt === 0 && (Nt = 5);
  }
  function Pp(l, n) {
    do {
      var u = gv(l.alternate, l);
      if (u !== null) {
        u.flags &= 32767, qe = u;
        return;
      }
      if (u = l.return, u !== null && (u.flags |= 32768, u.subtreeFlags = 0, u.deletions = null), !n && (l = l.sibling, l !== null)) {
        qe = l;
        return;
      }
      qe = l = u;
    } while (l !== null);
    Nt = 6, qe = null;
  }
  function e0(l, n, u, c, s, r, m, y, b) {
    l.cancelPendingCommit = null;
    do
      md();
    while (yl !== 0);
    if ((et & 6) !== 0) throw Error(g(327));
    if (n !== null) {
      if (n === l.current) throw Error(g(177));
      if (r = n.lanes | n.childLanes, r |= mn, fp(
        l,
        u,
        r,
        m,
        y,
        b
      ), l === ft && (qe = ft = null, Be = 0), So = n, jn = l, pl = u, fd = r, sd = s, Qm = c, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (l.callbackNode = null, l.callbackPriority = 0, Tv(ef, function() {
        return Fm(), null;
      })) : (l.callbackNode = null, l.callbackPriority = 0), c = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || c) {
        c = z.T, z.T = null, s = Z.p, Z.p = 2, m = et, et |= 4;
        try {
          Um(l, n, u);
        } finally {
          et = m, Z.p = s, z.T = c;
        }
      }
      yl = 1, t0(), ls(), hd();
    }
  }
  function t0() {
    if (yl === 1) {
      yl = 0;
      var l = jn, n = So, u = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || u) {
        u = z.T, z.T = null;
        var c = Z.p;
        Z.p = 2;
        var s = et;
        et |= 4;
        try {
          Pf(n, l);
          var r = ds, m = wh(l.containerInfo), y = r.focusedElem, b = r.selectionRange;
          if (m !== y && y && y.ownerDocument && bf(
            y.ownerDocument.documentElement,
            y
          )) {
            if (b !== null && Sf(y)) {
              var M = b.start, G = b.end;
              if (G === void 0 && (G = M), "selectionStart" in y)
                y.selectionStart = M, y.selectionEnd = Math.min(
                  G,
                  y.value.length
                );
              else {
                var X = y.ownerDocument || document, C = X && X.defaultView || window;
                if (C.getSelection) {
                  var N = C.getSelection(), de = y.textContent.length, he = Math.min(b.start, de), $e = b.end === void 0 ? he : Math.min(b.end, de);
                  !N.extend && he > $e && (m = $e, $e = he, he = m);
                  var D = yt(
                    y,
                    he
                  ), E = yt(
                    y,
                    $e
                  );
                  if (D && E && (N.rangeCount !== 1 || N.anchorNode !== D.node || N.anchorOffset !== D.offset || N.focusNode !== E.node || N.focusOffset !== E.offset)) {
                    var O = X.createRange();
                    O.setStart(D.node, D.offset), N.removeAllRanges(), he > $e ? (N.addRange(O), N.extend(E.node, E.offset)) : (O.setEnd(E.node, E.offset), N.addRange(O));
                  }
                }
              }
            }
            for (X = [], N = y; N = N.parentNode; )
              N.nodeType === 1 && X.push({
                element: N,
                left: N.scrollLeft,
                top: N.scrollTop
              });
            for (typeof y.focus == "function" && y.focus(), y = 0; y < X.length; y++) {
              var V = X[y];
              V.element.scrollLeft = V.left, V.element.scrollTop = V.top;
            }
          }
          vs = !!rs, ds = rs = null;
        } finally {
          et = s, Z.p = c, z.T = u;
        }
      }
      l.current = n, yl = 2;
    }
  }
  function ls() {
    if (yl === 2) {
      yl = 0;
      var l = jn, n = So, u = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || u) {
        u = z.T, z.T = null;
        var c = Z.p;
        Z.p = 2;
        var s = et;
        et |= 4;
        try {
          Cm(l, n.alternate, n);
        } finally {
          et = s, Z.p = c, z.T = u;
        }
      }
      yl = 3;
    }
  }
  function hd() {
    if (yl === 4 || yl === 3) {
      yl = 0, zi();
      var l = jn, n = So, u = pl, c = Qm;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? yl = 5 : (yl = 0, So = jn = null, l0(l, l.pendingLanes));
      var s = l.pendingLanes;
      if (s === 0 && (ci = null), Xs(u), n = n.stateNode, Ul && typeof Ul.onCommitFiberRoot == "function")
        try {
          Ul.onCommitFiberRoot(
            _c,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (c !== null) {
        n = z.T, s = Z.p, Z.p = 2, z.T = null;
        try {
          for (var r = l.onRecoverableError, m = 0; m < c.length; m++) {
            var y = c[m];
            r(y.value, {
              componentStack: y.stack
            });
          }
        } finally {
          z.T = n, Z.p = s;
        }
      }
      (pl & 3) !== 0 && md(), Il(l), s = l.pendingLanes, (u & 4194090) !== 0 && (s & 42) !== 0 ? l === Zm ? To++ : (To = 0, Zm = l) : To = 0, ns(0);
    }
  }
  function l0(l, n) {
    (l.pooledCacheLanes &= n) === 0 && (n = l.pooledCache, n != null && (l.pooledCache = null, gn(n)));
  }
  function md(l) {
    return t0(), ls(), hd(), Fm();
  }
  function Fm() {
    if (yl !== 5) return !1;
    var l = jn, n = fd;
    fd = 0;
    var u = Xs(pl), c = z.T, s = Z.p;
    try {
      Z.p = 32 > u ? 32 : u, z.T = null, u = sd, sd = null;
      var r = jn, m = pl;
      if (yl = 0, So = jn = null, pl = 0, (et & 6) !== 0) throw Error(g(331));
      var y = et;
      if (et |= 4, Bm(r.current), _m(
        r,
        r.current,
        m,
        u
      ), et = y, ns(0, !1), Ul && typeof Ul.onPostCommitFiberRoot == "function")
        try {
          Ul.onPostCommitFiberRoot(_c, r);
        } catch {
        }
      return !0;
    } finally {
      Z.p = s, z.T = c, l0(l, n);
    }
  }
  function Im(l, n, u) {
    n = ca(u, n), n = Sm(l.stateNode, n, 2), l = Tn(l, n, 2), l !== null && (Oi(l, 2), Il(l));
  }
  function at(l, n, u) {
    if (l.tag === 3)
      Im(l, l, u);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          Im(
            n,
            l,
            u
          );
          break;
        } else if (n.tag === 1) {
          var c = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof c.componentDidCatch == "function" && (ci === null || !ci.has(c))) {
            l = ca(u, l), u = Tm(2), c = Tn(n, u, 2), c !== null && ($l(
              u,
              c,
              n,
              l
            ), Oi(c, 2), Il(c));
            break;
          }
        }
        n = n.return;
      }
  }
  function yd(l, n, u) {
    var c = l.pingCache;
    if (c === null) {
      c = l.pingCache = new Wp();
      var s = /* @__PURE__ */ new Set();
      c.set(n, s);
    } else
      s = c.get(n), s === void 0 && (s = /* @__PURE__ */ new Set(), c.set(n, s));
    s.has(u) || (Gm = !0, s.add(u), l = Pm.bind(null, l, n, u), n.then(l, l));
  }
  function Pm(l, n, u) {
    var c = l.pingCache;
    c !== null && c.delete(n), l.pingedLanes |= l.suspendedLanes & u, l.warmLanes &= ~u, ft === l && (Be & u) === u && (Nt === 4 || Nt === 3 && (Be & 62914560) === Be && 300 > aa() - Xm ? (et & 2) === 0 && _n(l, 0) : Nn |= u, vo === Be && (vo = 0)), Il(l);
  }
  function ey(l, n) {
    n === 0 && (n = Di()), l = yn(l, n), l !== null && (Oi(l, n), Il(l));
  }
  function bv(l) {
    var n = l.memoizedState, u = 0;
    n !== null && (u = n.retryLane), ey(l, u);
  }
  function Sv(l, n) {
    var u = 0;
    switch (l.tag) {
      case 13:
        var c = l.stateNode, s = l.memoizedState;
        s !== null && (u = s.retryLane);
        break;
      case 19:
        c = l.stateNode;
        break;
      case 22:
        c = l.stateNode._retryCache;
        break;
      default:
        throw Error(g(314));
    }
    c !== null && c.delete(n), ey(l, u);
  }
  function Tv(l, n) {
    return Ri(l, n);
  }
  var pd = null, fi = null, as = !1, Ao = !1, vd = !1, si = 0;
  function Il(l) {
    l !== fi && l.next === null && (fi === null ? pd = fi = l : fi = fi.next = l), Ao = !0, as || (as = !0, u0());
  }
  function ns(l, n) {
    if (!vd && Ao) {
      vd = !0;
      do
        for (var u = !1, c = pd; c !== null; ) {
          if (l !== 0) {
            var s = c.pendingLanes;
            if (s === 0) var r = 0;
            else {
              var m = c.suspendedLanes, y = c.pingedLanes;
              r = (1 << 31 - Vl(42 | l) + 1) - 1, r &= s & ~(m & ~y), r = r & 201326741 ? r & 201326741 | 1 : r ? r | 2 : 0;
            }
            r !== 0 && (u = !0, is(c, r));
          } else
            r = Be, r = Hu(
              c,
              c === ft ? r : 0,
              c.cancelPendingCommit !== null || c.timeoutHandle !== -1
            ), (r & 3) === 0 || cn(c, r) || (u = !0, is(c, r));
          c = c.next;
        }
      while (u);
      vd = !1;
    }
  }
  function a0() {
    us();
  }
  function us() {
    Ao = as = !1;
    var l = 0;
    si !== 0 && (Tu() && (l = si), si = 0);
    for (var n = aa(), u = null, c = pd; c !== null; ) {
      var s = c.next, r = ty(c, n);
      r === 0 ? (c.next = null, u === null ? pd = s : u.next = s, s === null && (fi = u)) : (u = c, (l !== 0 || (r & 3) !== 0) && (Ao = !0)), c = s;
    }
    ns(l);
  }
  function ty(l, n) {
    for (var u = l.suspendedLanes, c = l.pingedLanes, s = l.expirationTimes, r = l.pendingLanes & -62914561; 0 < r; ) {
      var m = 31 - Vl(r), y = 1 << m, b = s[m];
      b === -1 ? ((y & u) === 0 || (y & c) !== 0) && (s[m] = Pt(y, n)) : b <= n && (l.expiredLanes |= y), r &= ~y;
    }
    if (n = ft, u = Be, u = Hu(
      l,
      l === n ? u : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), c = l.callbackNode, u === 0 || l === n && (tt === 2 || tt === 9) || l.cancelPendingCommit !== null)
      return c !== null && c !== null && sh(c), l.callbackNode = null, l.callbackPriority = 0;
    if ((u & 3) === 0 || cn(l, u)) {
      if (n = u & -u, n === l.callbackPriority) return n;
      switch (c !== null && sh(c), Xs(u)) {
        case 2:
        case 8:
          u = rh;
          break;
        case 32:
          u = ef;
          break;
        case 268435456:
          u = jc;
          break;
        default:
          u = ef;
      }
      return c = n0.bind(null, l), u = Ri(u, c), l.callbackPriority = n, l.callbackNode = u, n;
    }
    return c !== null && c !== null && sh(c), l.callbackPriority = 2, l.callbackNode = null, 2;
  }
  function n0(l, n) {
    if (yl !== 0 && yl !== 5)
      return l.callbackNode = null, l.callbackPriority = 0, null;
    var u = l.callbackNode;
    if (md() && l.callbackNode !== u)
      return null;
    var c = Be;
    return c = Hu(
      l,
      l === ft ? c : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), c === 0 ? null : (xo(l, c, n), ty(l, aa()), l.callbackNode != null && l.callbackNode === u ? n0.bind(null, l) : null);
  }
  function is(l, n) {
    if (md()) return null;
    xo(l, n, !0);
  }
  function u0() {
    Rv(function() {
      (et & 6) !== 0 ? Ri(
        ip,
        a0
      ) : us();
    });
  }
  function pc() {
    return si === 0 && (si = Nu()), si;
  }
  function gd(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : rf("" + l);
  }
  function cs(l, n) {
    var u = n.ownerDocument.createElement("input");
    return u.name = n.name, u.value = n.value, l.id && u.setAttribute("form", l.id), n.parentNode.insertBefore(u, n), l = new FormData(l), u.parentNode.removeChild(u), l;
  }
  function i0(l, n, u, c, s) {
    if (n === "submit" && u && u.stateNode === s) {
      var r = gd(
        (s[Cl] || null).action
      ), m = c.submitter;
      m && (n = (n = m[Cl] || null) ? gd(n.formAction) : m.getAttribute("formAction"), n !== null && (r = n, m = null));
      var y = new er(
        "action",
        "action",
        null,
        c,
        s
      );
      l.push({
        event: y,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (c.defaultPrevented) {
                if (si !== 0) {
                  var b = m ? cs(s, m) : new FormData(s);
                  Gr(
                    u,
                    {
                      pending: !0,
                      data: b,
                      method: s.method,
                      action: r
                    },
                    null,
                    b
                  );
                }
              } else
                typeof r == "function" && (y.preventDefault(), b = m ? cs(s, m) : new FormData(s), Gr(
                  u,
                  {
                    pending: !0,
                    data: b,
                    method: s.method,
                    action: r
                  },
                  r,
                  b
                ));
            },
            currentTarget: s
          }
        ]
      });
    }
  }
  for (var jt = 0; jt < Lc.length; jt++) {
    var os = Lc[jt], xv = os.toLowerCase(), Me = os[0].toUpperCase() + os.slice(1);
    Aa(
      xv,
      "on" + Me
    );
  }
  Aa(Mp, "onAnimationEnd"), Aa(Gh, "onAnimationIteration"), Aa(Up, "onAnimationStart"), Aa("dblclick", "onDoubleClick"), Aa("focusin", "onFocus"), Aa("focusout", "onBlur"), Aa(Vh, "onTransitionRun"), Aa(fr, "onTransitionStart"), Aa(Cp, "onTransitionCancel"), Aa(Xh, "onTransitionEnd"), qu("onMouseEnter", ["mouseout", "mouseover"]), qu("onMouseLeave", ["mouseout", "mouseover"]), qu("onPointerEnter", ["pointerout", "pointerover"]), qu("onPointerLeave", ["pointerout", "pointerover"]), _u(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), _u(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), _u("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), _u(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), _u(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), _u(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var fs = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), ri = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(fs)
  );
  function vc(l, n) {
    n = (n & 4) !== 0;
    for (var u = 0; u < l.length; u++) {
      var c = l[u], s = c.event;
      c = c.listeners;
      e: {
        var r = void 0;
        if (n)
          for (var m = c.length - 1; 0 <= m; m--) {
            var y = c[m], b = y.instance, M = y.currentTarget;
            if (y = y.listener, b !== r && s.isPropagationStopped())
              break e;
            r = y, s.currentTarget = M;
            try {
              r(s);
            } catch (G) {
              Jf(G);
            }
            s.currentTarget = null, r = b;
          }
        else
          for (m = 0; m < c.length; m++) {
            if (y = c[m], b = y.instance, M = y.currentTarget, y = y.listener, b !== r && s.isPropagationStopped())
              break e;
            r = y, s.currentTarget = M;
            try {
              r(s);
            } catch (G) {
              Jf(G);
            }
            s.currentTarget = null, r = b;
          }
      }
    }
  }
  function Ae(l, n) {
    var u = n[Qs];
    u === void 0 && (u = n[Qs] = /* @__PURE__ */ new Set());
    var c = l + "__bubble";
    u.has(c) || (bd(n, l, 2, !1), u.add(c));
  }
  function Ro(l, n, u) {
    var c = 0;
    n && (c |= 4), bd(
      u,
      l,
      c,
      n
    );
  }
  var zo = "_reactListening" + Math.random().toString(36).slice(2);
  function ly(l) {
    if (!l[zo]) {
      l[zo] = !0, uf.forEach(function(u) {
        u !== "selectionchange" && (ri.has(u) || Ro(u, !1, l), Ro(u, !0, l));
      });
      var n = l.nodeType === 9 ? l : l.ownerDocument;
      n === null || n[zo] || (n[zo] = !0, Ro("selectionchange", !1, n));
    }
  }
  function bd(l, n, u, c) {
    switch (vy(n)) {
      case 2:
        var s = y0;
        break;
      case 8:
        s = p0;
        break;
      default:
        s = yy;
    }
    u = s.bind(
      null,
      n,
      u,
      l
    ), s = void 0, !Fs || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (s = !0), c ? s !== void 0 ? l.addEventListener(n, u, {
      capture: !0,
      passive: s
    }) : l.addEventListener(n, u, !0) : s !== void 0 ? l.addEventListener(n, u, {
      passive: s
    }) : l.addEventListener(n, u, !1);
  }
  function _a(l, n, u, c, s) {
    var r = c;
    if ((n & 1) === 0 && (n & 2) === 0 && c !== null)
      e: for (; ; ) {
        if (c === null) return;
        var m = c.tag;
        if (m === 3 || m === 4) {
          var y = c.stateNode.containerInfo;
          if (y === s) break;
          if (m === 4)
            for (m = c.return; m !== null; ) {
              var b = m.tag;
              if ((b === 3 || b === 4) && m.stateNode.containerInfo === s)
                return;
              m = m.return;
            }
          for (; y !== null; ) {
            if (m = sl(y), m === null) return;
            if (b = m.tag, b === 5 || b === 6 || b === 26 || b === 27) {
              c = r = m;
              continue e;
            }
            y = y.parentNode;
          }
        }
        c = c.return;
      }
    Xc(function() {
      var M = r, G = Ws(u), X = [];
      e: {
        var C = Qh.get(l);
        if (C !== void 0) {
          var N = er, de = l;
          switch (l) {
            case "keypress":
              if (rl(u) === 0) break e;
            case "keydown":
            case "keyup":
              N = Xa;
              break;
            case "focusin":
              de = "focus", N = Ah;
              break;
            case "focusout":
              de = "blur", N = Ah;
              break;
            case "beforeblur":
            case "afterblur":
              N = Ah;
              break;
            case "click":
              if (u.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              N = Eh;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              N = Sp;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              N = Dh;
              break;
            case Mp:
            case Gh:
            case Up:
              N = mv;
              break;
            case Xh:
              N = Rp;
              break;
            case "scroll":
            case "scrollend":
              N = gp;
              break;
            case "wheel":
              N = Gi;
              break;
            case "copy":
            case "cut":
            case "paste":
              N = mf;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              N = yf;
              break;
            case "toggle":
            case "beforetoggle":
              N = zp;
          }
          var he = (n & 4) !== 0, $e = !he && (l === "scroll" || l === "scrollend"), D = he ? C !== null ? C + "Capture" : null : C;
          he = [];
          for (var E = M, O; E !== null; ) {
            var V = E;
            if (O = V.stateNode, V = V.tag, V !== 5 && V !== 26 && V !== 27 || O === null || D === null || (V = qi(E, D), V != null && he.push(
              bu(E, V, O)
            )), $e) break;
            E = E.return;
          }
          0 < he.length && (C = new N(
            C,
            de,
            null,
            u,
            G
          ), X.push({ event: C, listeners: he }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (C = l === "mouseover" || l === "pointerover", N = l === "mouseout" || l === "pointerout", C && u !== _i && (de = u.relatedTarget || u.fromElement) && (sl(de) || de[Bc]))
            break e;
          if ((N || C) && (C = G.window === G ? G : (C = G.ownerDocument) ? C.defaultView || C.parentWindow : window, N ? (de = u.relatedTarget || u.toElement, N = M, de = de ? sl(de) : null, de !== null && ($e = oe(de), he = de.tag, de !== $e || he !== 5 && he !== 27 && he !== 6) && (de = null)) : (N = null, de = M), N !== de)) {
            if (he = Eh, V = "onMouseLeave", D = "onMouseEnter", E = "mouse", (l === "pointerout" || l === "pointerover") && (he = yf, V = "onPointerLeave", D = "onPointerEnter", E = "pointer"), $e = N == null ? C : nf(N), O = de == null ? C : nf(de), C = new he(
              V,
              E + "leave",
              N,
              u,
              G
            ), C.target = $e, C.relatedTarget = O, V = null, sl(G) === M && (he = new he(
              D,
              E + "enter",
              de,
              u,
              G
            ), he.target = O, he.relatedTarget = $e, V = he), $e = V, N && de)
              t: {
                for (he = N, D = de, E = 0, O = he; O; O = di(O))
                  E++;
                for (O = 0, V = D; V; V = di(V))
                  O++;
                for (; 0 < E - O; )
                  he = di(he), E--;
                for (; 0 < O - E; )
                  D = di(D), O--;
                for (; E--; ) {
                  if (he === D || D !== null && he === D.alternate)
                    break t;
                  he = di(he), D = di(D);
                }
                he = null;
              }
            else he = null;
            N !== null && ss(
              X,
              C,
              N,
              he,
              !1
            ), de !== null && $e !== null && ss(
              X,
              $e,
              de,
              he,
              !0
            );
          }
        }
        e: {
          if (C = M ? nf(M) : window, N = C.nodeName && C.nodeName.toLowerCase(), N === "select" || N === "input" && C.type === "file")
            var le = Nh;
          else if (ur(C))
            if (jh)
              le = Bh;
            else {
              le = Xu;
              var Ce = cr;
            }
          else
            N = C.nodeName, !N || N.toLowerCase() !== "input" || C.type !== "checkbox" && C.type !== "radio" ? M && ji(M.elementType) && (le = Nh) : le = nu;
          if (le && (le = le(l, M))) {
            ir(
              X,
              le,
              u,
              G
            );
            break e;
          }
          Ce && Ce(l, C, M), l === "focusout" && M && C.type === "number" && M.memoizedProps.value != null && ff(C, "number", C.value);
        }
        switch (Ce = M ? nf(M) : window, l) {
          case "focusin":
            (ur(Ce) || Ce.contentEditable === "true") && (dn = Ce, La = M, Lu = null);
            break;
          case "focusout":
            Lu = La = dn = null;
            break;
          case "mousedown":
            Li = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Li = !1, or(X, u, G);
            break;
          case "selectionchange":
            if (Zi) break;
          case "keydown":
          case "keyup":
            or(X, u, G);
        }
        var se;
        if (pf)
          e: {
            switch (l) {
              case "compositionstart":
                var pe = "onCompositionStart";
                break e;
              case "compositionend":
                pe = "onCompositionEnd";
                break e;
              case "compositionupdate":
                pe = "onCompositionUpdate";
                break e;
            }
            pe = void 0;
          }
        else
          Vu ? gf(l, u) && (pe = "onCompositionEnd") : l === "keydown" && u.keyCode === 229 && (pe = "onCompositionStart");
        pe && (sn && u.locale !== "ko" && (Vu || pe !== "onCompositionStart" ? pe === "onCompositionEnd" && Vu && (se = Th()) : (lu = G, Qc = "value" in lu ? lu.value : lu.textContent, Vu = !0)), Ce = Do(M, pe), 0 < Ce.length && (pe = new Rh(
          pe,
          l,
          null,
          u,
          G
        ), X.push({ event: pe, listeners: Ce }), se ? pe.data = se : (se = Gu(u), se !== null && (pe.data = se)))), (se = Mh ? Ch(l, u) : Vi(l, u)) && (pe = Do(M, "onBeforeInput"), 0 < pe.length && (Ce = new Rh(
          "onBeforeInput",
          "beforeinput",
          null,
          u,
          G
        ), X.push({
          event: Ce,
          listeners: pe
        }), Ce.data = se)), i0(
          X,
          l,
          M,
          u,
          G
        );
      }
      vc(X, n);
    });
  }
  function bu(l, n, u) {
    return {
      instance: l,
      listener: n,
      currentTarget: u
    };
  }
  function Do(l, n) {
    for (var u = n + "Capture", c = []; l !== null; ) {
      var s = l, r = s.stateNode;
      if (s = s.tag, s !== 5 && s !== 26 && s !== 27 || r === null || (s = qi(l, u), s != null && c.unshift(
        bu(l, s, r)
      ), s = qi(l, n), s != null && c.push(
        bu(l, s, r)
      )), l.tag === 3) return c;
      l = l.return;
    }
    return [];
  }
  function di(l) {
    if (l === null) return null;
    do
      l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function ss(l, n, u, c, s) {
    for (var r = n._reactName, m = []; u !== null && u !== c; ) {
      var y = u, b = y.alternate, M = y.stateNode;
      if (y = y.tag, b !== null && b === c) break;
      y !== 5 && y !== 26 && y !== 27 || M === null || (b = M, s ? (M = qi(u, r), M != null && m.unshift(
        bu(u, M, b)
      )) : s || (M = qi(u, r), M != null && m.push(
        bu(u, M, b)
      ))), u = u.return;
    }
    m.length !== 0 && l.push({ event: n, listeners: m });
  }
  var ha = /\r\n?/g, ay = /\u0000|\uFFFD/g;
  function c0(l) {
    return (typeof l == "string" ? l : "" + l).replace(ha, `
`).replace(ay, "");
  }
  function ny(l, n) {
    return n = c0(n), c0(l) === n;
  }
  function Sd() {
  }
  function Te(l, n, u, c, s, r) {
    switch (u) {
      case "children":
        typeof c == "string" ? n === "body" || n === "textarea" && c === "" || wc(l, c) : (typeof c == "number" || typeof c == "bigint") && n !== "body" && wc(l, "" + c);
        break;
      case "className":
        cf(l, "class", c);
        break;
      case "tabIndex":
        cf(l, "tabindex", c);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        cf(l, u, c);
        break;
      case "style":
        sf(l, c, r);
        break;
      case "data":
        if (n !== "object") {
          cf(l, "data", c);
          break;
        }
      case "src":
      case "href":
        if (c === "" && (n !== "a" || u !== "href")) {
          l.removeAttribute(u);
          break;
        }
        if (c == null || typeof c == "function" || typeof c == "symbol" || typeof c == "boolean") {
          l.removeAttribute(u);
          break;
        }
        c = rf("" + c), l.setAttribute(u, c);
        break;
      case "action":
      case "formAction":
        if (typeof c == "function") {
          l.setAttribute(
            u,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof r == "function" && (u === "formAction" ? (n !== "input" && Te(l, n, "name", s.name, s, null), Te(
            l,
            n,
            "formEncType",
            s.formEncType,
            s,
            null
          ), Te(
            l,
            n,
            "formMethod",
            s.formMethod,
            s,
            null
          ), Te(
            l,
            n,
            "formTarget",
            s.formTarget,
            s,
            null
          )) : (Te(l, n, "encType", s.encType, s, null), Te(l, n, "method", s.method, s, null), Te(l, n, "target", s.target, s, null)));
        if (c == null || typeof c == "symbol" || typeof c == "boolean") {
          l.removeAttribute(u);
          break;
        }
        c = rf("" + c), l.setAttribute(u, c);
        break;
      case "onClick":
        c != null && (l.onclick = Sd);
        break;
      case "onScroll":
        c != null && Ae("scroll", l);
        break;
      case "onScrollEnd":
        c != null && Ae("scrollend", l);
        break;
      case "dangerouslySetInnerHTML":
        if (c != null) {
          if (typeof c != "object" || !("__html" in c))
            throw Error(g(61));
          if (u = c.__html, u != null) {
            if (s.children != null) throw Error(g(60));
            l.innerHTML = u;
          }
        }
        break;
      case "multiple":
        l.multiple = c && typeof c != "function" && typeof c != "symbol";
        break;
      case "muted":
        l.muted = c && typeof c != "function" && typeof c != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (c == null || typeof c == "function" || typeof c == "boolean" || typeof c == "symbol") {
          l.removeAttribute("xlink:href");
          break;
        }
        u = rf("" + c), l.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          u
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        c != null && typeof c != "function" && typeof c != "symbol" ? l.setAttribute(u, "" + c) : l.removeAttribute(u);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        c && typeof c != "function" && typeof c != "symbol" ? l.setAttribute(u, "") : l.removeAttribute(u);
        break;
      case "capture":
      case "download":
        c === !0 ? l.setAttribute(u, "") : c !== !1 && c != null && typeof c != "function" && typeof c != "symbol" ? l.setAttribute(u, c) : l.removeAttribute(u);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        c != null && typeof c != "function" && typeof c != "symbol" && !isNaN(c) && 1 <= c ? l.setAttribute(u, c) : l.removeAttribute(u);
        break;
      case "rowSpan":
      case "start":
        c == null || typeof c == "function" || typeof c == "symbol" || isNaN(c) ? l.removeAttribute(u) : l.setAttribute(u, c);
        break;
      case "popover":
        Ae("beforetoggle", l), Ae("toggle", l), eu(l, "popover", c);
        break;
      case "xlinkActuate":
        on(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          c
        );
        break;
      case "xlinkArcrole":
        on(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          c
        );
        break;
      case "xlinkRole":
        on(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          c
        );
        break;
      case "xlinkShow":
        on(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          c
        );
        break;
      case "xlinkTitle":
        on(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          c
        );
        break;
      case "xlinkType":
        on(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          c
        );
        break;
      case "xmlBase":
        on(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          c
        );
        break;
      case "xmlLang":
        on(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          c
        );
        break;
      case "xmlSpace":
        on(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          c
        );
        break;
      case "is":
        eu(l, "is", c);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < u.length) || u[0] !== "o" && u[0] !== "O" || u[1] !== "n" && u[1] !== "N") && (u = rv.get(u) || u, eu(l, u, c));
    }
  }
  function _(l, n, u, c, s, r) {
    switch (u) {
      case "style":
        sf(l, c, r);
        break;
      case "dangerouslySetInnerHTML":
        if (c != null) {
          if (typeof c != "object" || !("__html" in c))
            throw Error(g(61));
          if (u = c.__html, u != null) {
            if (s.children != null) throw Error(g(60));
            l.innerHTML = u;
          }
        }
        break;
      case "children":
        typeof c == "string" ? wc(l, c) : (typeof c == "number" || typeof c == "bigint") && wc(l, "" + c);
        break;
      case "onScroll":
        c != null && Ae("scroll", l);
        break;
      case "onScrollEnd":
        c != null && Ae("scrollend", l);
        break;
      case "onClick":
        c != null && (l.onclick = Sd);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!ua.hasOwnProperty(u))
          e: {
            if (u[0] === "o" && u[1] === "n" && (s = u.endsWith("Capture"), n = u.slice(2, s ? u.length - 7 : void 0), r = l[Cl] || null, r = r != null ? r[u] : null, typeof r == "function" && l.removeEventListener(n, r, s), typeof c == "function")) {
              typeof r != "function" && r !== null && (u in l ? l[u] = null : l.hasAttribute(u) && l.removeAttribute(u)), l.addEventListener(n, c, s);
              break e;
            }
            u in l ? l[u] = c : c === !0 ? l.setAttribute(u, "") : eu(l, u, c);
          }
    }
  }
  function ve(l, n, u) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        Ae("error", l), Ae("load", l);
        var c = !1, s = !1, r;
        for (r in u)
          if (u.hasOwnProperty(r)) {
            var m = u[r];
            if (m != null)
              switch (r) {
                case "src":
                  c = !0;
                  break;
                case "srcSet":
                  s = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(g(137, n));
                default:
                  Te(l, n, r, m, u, null);
              }
          }
        s && Te(l, n, "srcSet", u.srcSet, u, null), c && Te(l, n, "src", u.src, u, null);
        return;
      case "input":
        Ae("invalid", l);
        var y = r = m = s = null, b = null, M = null;
        for (c in u)
          if (u.hasOwnProperty(c)) {
            var G = u[c];
            if (G != null)
              switch (c) {
                case "name":
                  s = G;
                  break;
                case "type":
                  m = G;
                  break;
                case "checked":
                  b = G;
                  break;
                case "defaultChecked":
                  M = G;
                  break;
                case "value":
                  r = G;
                  break;
                case "defaultValue":
                  y = G;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (G != null)
                    throw Error(g(137, n));
                  break;
                default:
                  Te(l, n, c, G, u, null);
              }
          }
        ks(
          l,
          r,
          y,
          b,
          M,
          m,
          s,
          !1
        ), Yu(l);
        return;
      case "select":
        Ae("invalid", l), c = m = r = null;
        for (s in u)
          if (u.hasOwnProperty(s) && (y = u[s], y != null))
            switch (s) {
              case "value":
                r = y;
                break;
              case "defaultValue":
                m = y;
                break;
              case "multiple":
                c = y;
              default:
                Te(l, n, s, y, u, null);
            }
        n = r, u = m, l.multiple = !!c, n != null ? Ni(l, !!c, n, !1) : u != null && Ni(l, !!c, u, !0);
        return;
      case "textarea":
        Ae("invalid", l), r = s = c = null;
        for (m in u)
          if (u.hasOwnProperty(m) && (y = u[m], y != null))
            switch (m) {
              case "value":
                c = y;
                break;
              case "defaultValue":
                s = y;
                break;
              case "children":
                r = y;
                break;
              case "dangerouslySetInnerHTML":
                if (y != null) throw Error(g(91));
                break;
              default:
                Te(l, n, m, y, u, null);
            }
        bh(l, c, s, r), Yu(l);
        return;
      case "option":
        for (b in u)
          if (u.hasOwnProperty(b) && (c = u[b], c != null))
            switch (b) {
              case "selected":
                l.selected = c && typeof c != "function" && typeof c != "symbol";
                break;
              default:
                Te(l, n, b, c, u, null);
            }
        return;
      case "dialog":
        Ae("beforetoggle", l), Ae("toggle", l), Ae("cancel", l), Ae("close", l);
        break;
      case "iframe":
      case "object":
        Ae("load", l);
        break;
      case "video":
      case "audio":
        for (c = 0; c < fs.length; c++)
          Ae(fs[c], l);
        break;
      case "image":
        Ae("error", l), Ae("load", l);
        break;
      case "details":
        Ae("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        Ae("error", l), Ae("load", l);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (M in u)
          if (u.hasOwnProperty(M) && (c = u[M], c != null))
            switch (M) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(g(137, n));
              default:
                Te(l, n, M, c, u, null);
            }
        return;
      default:
        if (ji(n)) {
          for (G in u)
            u.hasOwnProperty(G) && (c = u[G], c !== void 0 && _(
              l,
              n,
              G,
              c,
              u,
              void 0
            ));
          return;
        }
    }
    for (y in u)
      u.hasOwnProperty(y) && (c = u[y], c != null && Te(l, n, y, c, u, null));
  }
  function Ev(l, n, u, c) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var s = null, r = null, m = null, y = null, b = null, M = null, G = null;
        for (N in u) {
          var X = u[N];
          if (u.hasOwnProperty(N) && X != null)
            switch (N) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                b = X;
              default:
                c.hasOwnProperty(N) || Te(l, n, N, null, c, X);
            }
        }
        for (var C in c) {
          var N = c[C];
          if (X = u[C], c.hasOwnProperty(C) && (N != null || X != null))
            switch (C) {
              case "type":
                r = N;
                break;
              case "name":
                s = N;
                break;
              case "checked":
                M = N;
                break;
              case "defaultChecked":
                G = N;
                break;
              case "value":
                m = N;
                break;
              case "defaultValue":
                y = N;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (N != null)
                  throw Error(g(137, n));
                break;
              default:
                N !== X && Te(
                  l,
                  n,
                  C,
                  N,
                  c,
                  X
                );
            }
        }
        Ks(
          l,
          m,
          y,
          b,
          M,
          G,
          r,
          s
        );
        return;
      case "select":
        N = m = y = C = null;
        for (r in u)
          if (b = u[r], u.hasOwnProperty(r) && b != null)
            switch (r) {
              case "value":
                break;
              case "multiple":
                N = b;
              default:
                c.hasOwnProperty(r) || Te(
                  l,
                  n,
                  r,
                  null,
                  c,
                  b
                );
            }
        for (s in c)
          if (r = c[s], b = u[s], c.hasOwnProperty(s) && (r != null || b != null))
            switch (s) {
              case "value":
                C = r;
                break;
              case "defaultValue":
                y = r;
                break;
              case "multiple":
                m = r;
              default:
                r !== b && Te(
                  l,
                  n,
                  s,
                  r,
                  c,
                  b
                );
            }
        n = y, u = m, c = N, C != null ? Ni(l, !!u, C, !1) : !!c != !!u && (n != null ? Ni(l, !!u, n, !0) : Ni(l, !!u, u ? [] : "", !1));
        return;
      case "textarea":
        N = C = null;
        for (y in u)
          if (s = u[y], u.hasOwnProperty(y) && s != null && !c.hasOwnProperty(y))
            switch (y) {
              case "value":
                break;
              case "children":
                break;
              default:
                Te(l, n, y, null, c, s);
            }
        for (m in c)
          if (s = c[m], r = u[m], c.hasOwnProperty(m) && (s != null || r != null))
            switch (m) {
              case "value":
                C = s;
                break;
              case "defaultValue":
                N = s;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (s != null) throw Error(g(91));
                break;
              default:
                s !== r && Te(l, n, m, s, c, r);
            }
        gh(l, C, N);
        return;
      case "option":
        for (var de in u)
          if (C = u[de], u.hasOwnProperty(de) && C != null && !c.hasOwnProperty(de))
            switch (de) {
              case "selected":
                l.selected = !1;
                break;
              default:
                Te(
                  l,
                  n,
                  de,
                  null,
                  c,
                  C
                );
            }
        for (b in c)
          if (C = c[b], N = u[b], c.hasOwnProperty(b) && C !== N && (C != null || N != null))
            switch (b) {
              case "selected":
                l.selected = C && typeof C != "function" && typeof C != "symbol";
                break;
              default:
                Te(
                  l,
                  n,
                  b,
                  C,
                  c,
                  N
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var he in u)
          C = u[he], u.hasOwnProperty(he) && C != null && !c.hasOwnProperty(he) && Te(l, n, he, null, c, C);
        for (M in c)
          if (C = c[M], N = u[M], c.hasOwnProperty(M) && C !== N && (C != null || N != null))
            switch (M) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (C != null)
                  throw Error(g(137, n));
                break;
              default:
                Te(
                  l,
                  n,
                  M,
                  C,
                  c,
                  N
                );
            }
        return;
      default:
        if (ji(n)) {
          for (var $e in u)
            C = u[$e], u.hasOwnProperty($e) && C !== void 0 && !c.hasOwnProperty($e) && _(
              l,
              n,
              $e,
              void 0,
              c,
              C
            );
          for (G in c)
            C = c[G], N = u[G], !c.hasOwnProperty(G) || C === N || C === void 0 && N === void 0 || _(
              l,
              n,
              G,
              C,
              c,
              N
            );
          return;
        }
    }
    for (var D in u)
      C = u[D], u.hasOwnProperty(D) && C != null && !c.hasOwnProperty(D) && Te(l, n, D, null, c, C);
    for (X in c)
      C = c[X], N = u[X], !c.hasOwnProperty(X) || C === N || C == null && N == null || Te(l, n, X, C, c, N);
  }
  var rs = null, ds = null;
  function qa(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function Su(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Oo(l, n) {
    if (l === 0)
      switch (n) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return l === 1 && n === "foreignObject" ? 0 : l;
  }
  function qn(l, n) {
    return l === "textarea" || l === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var Mo = null;
  function Tu() {
    var l = window.event;
    return l && l.type === "popstate" ? l === Mo ? !1 : (Mo = l, !0) : (Mo = null, !1);
  }
  var Td = typeof setTimeout == "function" ? setTimeout : void 0, Av = typeof clearTimeout == "function" ? clearTimeout : void 0, o0 = typeof Promise == "function" ? Promise : void 0, Rv = typeof queueMicrotask == "function" ? queueMicrotask : typeof o0 < "u" ? function(l) {
    return o0.resolve(null).then(l).catch(Bn);
  } : Td;
  function Bn(l) {
    setTimeout(function() {
      throw l;
    });
  }
  function hi(l) {
    return l === "head";
  }
  function xd(l, n) {
    var u = n, c = 0, s = 0;
    do {
      var r = u.nextSibling;
      if (l.removeChild(u), r && r.nodeType === 8)
        if (u = r.data, u === "/$") {
          if (0 < c && 8 > c) {
            u = c;
            var m = l.ownerDocument;
            if (u & 1 && Pl(m.documentElement), u & 2 && Pl(m.body), u & 4)
              for (u = m.head, Pl(u), m = u.firstChild; m; ) {
                var y = m.nextSibling, b = m.nodeName;
                m[ae] || b === "SCRIPT" || b === "STYLE" || b === "LINK" && m.rel.toLowerCase() === "stylesheet" || u.removeChild(m), m = y;
              }
          }
          if (s === 0) {
            l.removeChild(r), wn(n);
            return;
          }
          s--;
        } else
          u === "$" || u === "$?" || u === "$!" ? s++ : c = u.charCodeAt(0) - 48;
      else c = 0;
      u = r;
    } while (u);
    wn(n);
  }
  function hs(l) {
    var n = l.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var u = n;
      switch (n = n.nextSibling, u.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          hs(u), af(u);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (u.rel.toLowerCase() === "stylesheet") continue;
      }
      l.removeChild(u);
    }
  }
  function Uo(l, n, u, c) {
    for (; l.nodeType === 1; ) {
      var s = u;
      if (l.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!c && (l.nodeName !== "INPUT" || l.type !== "hidden"))
          break;
      } else if (c) {
        if (!l[ae])
          switch (n) {
            case "meta":
              if (!l.hasAttribute("itemprop")) break;
              return l;
            case "link":
              if (r = l.getAttribute("rel"), r === "stylesheet" && l.hasAttribute("data-precedence"))
                break;
              if (r !== s.rel || l.getAttribute("href") !== (s.href == null || s.href === "" ? null : s.href) || l.getAttribute("crossorigin") !== (s.crossOrigin == null ? null : s.crossOrigin) || l.getAttribute("title") !== (s.title == null ? null : s.title))
                break;
              return l;
            case "style":
              if (l.hasAttribute("data-precedence")) break;
              return l;
            case "script":
              if (r = l.getAttribute("src"), (r !== (s.src == null ? null : s.src) || l.getAttribute("type") !== (s.type == null ? null : s.type) || l.getAttribute("crossorigin") !== (s.crossOrigin == null ? null : s.crossOrigin)) && r && l.hasAttribute("async") && !l.hasAttribute("itemprop"))
                break;
              return l;
            default:
              return l;
          }
      } else if (n === "input" && l.type === "hidden") {
        var r = s.name == null ? null : "" + s.name;
        if (s.type === "hidden" && l.getAttribute("name") === r)
          return l;
      } else return l;
      if (l = tn(l.nextSibling), l === null) break;
    }
    return null;
  }
  function zv(l, n, u) {
    if (n === "") return null;
    for (; l.nodeType !== 3; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !u || (l = tn(l.nextSibling), l === null)) return null;
    return l;
  }
  function ms(l) {
    return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState === "complete";
  }
  function Dv(l, n) {
    var u = l.ownerDocument;
    if (l.data !== "$?" || u.readyState === "complete")
      n();
    else {
      var c = function() {
        n(), u.removeEventListener("DOMContentLoaded", c);
      };
      u.addEventListener("DOMContentLoaded", c), l._reactRetry = c;
    }
  }
  function tn(l) {
    for (; l != null; l = l.nextSibling) {
      var n = l.nodeType;
      if (n === 1 || n === 3) break;
      if (n === 8) {
        if (n = l.data, n === "$" || n === "$!" || n === "$?" || n === "F!" || n === "F")
          break;
        if (n === "/$") return null;
      }
    }
    return l;
  }
  var mi = null;
  function vl(l) {
    l = l.previousSibling;
    for (var n = 0; l; ) {
      if (l.nodeType === 8) {
        var u = l.data;
        if (u === "$" || u === "$!" || u === "$?") {
          if (n === 0) return l;
          n--;
        } else u === "/$" && n++;
      }
      l = l.previousSibling;
    }
    return null;
  }
  function te(l, n, u) {
    switch (n = qa(u), l) {
      case "html":
        if (l = n.documentElement, !l) throw Error(g(452));
        return l;
      case "head":
        if (l = n.head, !l) throw Error(g(453));
        return l;
      case "body":
        if (l = n.body, !l) throw Error(g(454));
        return l;
      default:
        throw Error(g(451));
    }
  }
  function Pl(l) {
    for (var n = l.attributes; n.length; )
      l.removeAttributeNode(n[0]);
    af(l);
  }
  var _t = /* @__PURE__ */ new Map(), zl = /* @__PURE__ */ new Set();
  function Ed(l) {
    return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
  }
  var xu = Z.d;
  Z.d = {
    f: Ad,
    r: Rd,
    D: Eu,
    C: zd,
    L: yi,
    m: Dl,
    X: pi,
    S: ea,
    M: uy
  };
  function Ad() {
    var l = xu.f(), n = hc();
    return l || n;
  }
  function Rd(l) {
    var n = Mi(l);
    n !== null && n.tag === 5 && n.type === "form" ? co(n) : xu.r(l);
  }
  var gl = typeof document > "u" ? null : document;
  function ln(l, n, u) {
    var c = gl;
    if (c && typeof n == "string" && n) {
      var s = xa(n);
      s = 'link[rel="' + l + '"][href="' + s + '"]', typeof u == "string" && (s += '[crossorigin="' + u + '"]'), zl.has(s) || (zl.add(s), l = { rel: l, crossOrigin: u, href: n }, c.querySelector(s) === null && (n = c.createElement("link"), ve(n, "link", l), Jt(n), c.head.appendChild(n)));
    }
  }
  function Eu(l) {
    xu.D(l), ln("dns-prefetch", l, null);
  }
  function zd(l, n) {
    xu.C(l, n), ln("preconnect", l, n);
  }
  function yi(l, n, u) {
    xu.L(l, n, u);
    var c = gl;
    if (c && l && n) {
      var s = 'link[rel="preload"][as="' + xa(n) + '"]';
      n === "image" && u && u.imageSrcSet ? (s += '[imagesrcset="' + xa(
        u.imageSrcSet
      ) + '"]', typeof u.imageSizes == "string" && (s += '[imagesizes="' + xa(
        u.imageSizes
      ) + '"]')) : s += '[href="' + xa(l) + '"]';
      var r = s;
      switch (n) {
        case "style":
          r = Co(l);
          break;
        case "script":
          r = Ba(l);
      }
      _t.has(r) || (l = F(
        {
          rel: "preload",
          href: n === "image" && u && u.imageSrcSet ? void 0 : l,
          as: n
        },
        u
      ), _t.set(r, l), c.querySelector(s) !== null || n === "style" && c.querySelector(Ho(r)) || n === "script" && c.querySelector(gc(r)) || (n = c.createElement("link"), ve(n, "link", l), Jt(n), c.head.appendChild(n)));
    }
  }
  function Dl(l, n) {
    xu.m(l, n);
    var u = gl;
    if (u && l) {
      var c = n && typeof n.as == "string" ? n.as : "script", s = 'link[rel="modulepreload"][as="' + xa(c) + '"][href="' + xa(l) + '"]', r = s;
      switch (c) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          r = Ba(l);
      }
      if (!_t.has(r) && (l = F({ rel: "modulepreload", href: l }, n), _t.set(r, l), u.querySelector(s) === null)) {
        switch (c) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (u.querySelector(gc(r)))
              return;
        }
        c = u.createElement("link"), ve(c, "link", l), Jt(c), u.head.appendChild(c);
      }
    }
  }
  function ea(l, n, u) {
    xu.S(l, n, u);
    var c = gl;
    if (c && l) {
      var s = Pn(c).hoistableStyles, r = Co(l);
      n = n || "default";
      var m = s.get(r);
      if (!m) {
        var y = { loading: 0, preload: null };
        if (m = c.querySelector(
          Ho(r)
        ))
          y.loading = 5;
        else {
          l = F(
            { rel: "stylesheet", href: l, "data-precedence": n },
            u
          ), (u = _t.get(r)) && Od(l, u);
          var b = m = c.createElement("link");
          Jt(b), ve(b, "link", l), b._p = new Promise(function(M, G) {
            b.onload = M, b.onerror = G;
          }), b.addEventListener("load", function() {
            y.loading |= 1;
          }), b.addEventListener("error", function() {
            y.loading |= 2;
          }), y.loading |= 4, Dd(m, n, c);
        }
        m = {
          type: "stylesheet",
          instance: m,
          count: 1,
          state: y
        }, s.set(r, m);
      }
    }
  }
  function pi(l, n) {
    xu.X(l, n);
    var u = gl;
    if (u && l) {
      var c = Pn(u).hoistableScripts, s = Ba(l), r = c.get(s);
      r || (r = u.querySelector(gc(s)), r || (l = F({ src: l, async: !0 }, n), (n = _t.get(s)) && Md(l, n), r = u.createElement("script"), Jt(r), ve(r, "link", l), u.head.appendChild(r)), r = {
        type: "script",
        instance: r,
        count: 1,
        state: null
      }, c.set(s, r));
    }
  }
  function uy(l, n) {
    xu.M(l, n);
    var u = gl;
    if (u && l) {
      var c = Pn(u).hoistableScripts, s = Ba(l), r = c.get(s);
      r || (r = u.querySelector(gc(s)), r || (l = F({ src: l, async: !0, type: "module" }, n), (n = _t.get(s)) && Md(l, n), r = u.createElement("script"), Jt(r), ve(r, "link", l), u.head.appendChild(r)), r = {
        type: "script",
        instance: r,
        count: 1,
        state: null
      }, c.set(s, r));
    }
  }
  function f0(l, n, u, c) {
    var s = (s = Ve.current) ? Ed(s) : null;
    if (!s) throw Error(g(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof u.precedence == "string" && typeof u.href == "string" ? (n = Co(u.href), u = Pn(
          s
        ).hoistableStyles, c = u.get(n), c || (c = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, u.set(n, c)), c) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (u.rel === "stylesheet" && typeof u.href == "string" && typeof u.precedence == "string") {
          l = Co(u.href);
          var r = Pn(
            s
          ).hoistableStyles, m = r.get(l);
          if (m || (s = s.ownerDocument || s, m = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, r.set(l, m), (r = s.querySelector(
            Ho(l)
          )) && !r._p && (m.instance = r, m.state.loading = 5), _t.has(l) || (u = {
            rel: "preload",
            as: "style",
            href: u.href,
            crossOrigin: u.crossOrigin,
            integrity: u.integrity,
            media: u.media,
            hrefLang: u.hrefLang,
            referrerPolicy: u.referrerPolicy
          }, _t.set(l, u), r || s0(
            s,
            l,
            u,
            m.state
          ))), n && c === null)
            throw Error(g(528, ""));
          return m;
        }
        if (n && c !== null)
          throw Error(g(529, ""));
        return null;
      case "script":
        return n = u.async, u = u.src, typeof u == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = Ba(u), u = Pn(
          s
        ).hoistableScripts, c = u.get(n), c || (c = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, u.set(n, c)), c) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(g(444, l));
    }
  }
  function Co(l) {
    return 'href="' + xa(l) + '"';
  }
  function Ho(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function No(l) {
    return F({}, l, {
      "data-precedence": l.precedence,
      precedence: null
    });
  }
  function s0(l, n, u, c) {
    l.querySelector('link[rel="preload"][as="style"][' + n + "]") ? c.loading = 1 : (n = l.createElement("link"), c.preload = n, n.addEventListener("load", function() {
      return c.loading |= 1;
    }), n.addEventListener("error", function() {
      return c.loading |= 2;
    }), ve(n, "link", u), Jt(n), l.head.appendChild(n));
  }
  function Ba(l) {
    return '[src="' + xa(l) + '"]';
  }
  function gc(l) {
    return "script[async]" + l;
  }
  function r0(l, n, u) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var c = l.querySelector(
            'style[data-href~="' + xa(u.href) + '"]'
          );
          if (c)
            return n.instance = c, Jt(c), c;
          var s = F({}, u, {
            "data-href": u.href,
            "data-precedence": u.precedence,
            href: null,
            precedence: null
          });
          return c = (l.ownerDocument || l).createElement(
            "style"
          ), Jt(c), ve(c, "style", s), Dd(c, u.precedence, l), n.instance = c;
        case "stylesheet":
          s = Co(u.href);
          var r = l.querySelector(
            Ho(s)
          );
          if (r)
            return n.state.loading |= 4, n.instance = r, Jt(r), r;
          c = No(u), (s = _t.get(s)) && Od(c, s), r = (l.ownerDocument || l).createElement("link"), Jt(r);
          var m = r;
          return m._p = new Promise(function(y, b) {
            m.onload = y, m.onerror = b;
          }), ve(r, "link", c), n.state.loading |= 4, Dd(r, u.precedence, l), n.instance = r;
        case "script":
          return r = Ba(u.src), (s = l.querySelector(
            gc(r)
          )) ? (n.instance = s, Jt(s), s) : (c = u, (s = _t.get(r)) && (c = F({}, u), Md(c, s)), l = l.ownerDocument || l, s = l.createElement("script"), Jt(s), ve(s, "link", c), l.head.appendChild(s), n.instance = s);
        case "void":
          return null;
        default:
          throw Error(g(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (c = n.instance, n.state.loading |= 4, Dd(c, u.precedence, l));
    return n.instance;
  }
  function Dd(l, n, u) {
    for (var c = u.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), s = c.length ? c[c.length - 1] : null, r = s, m = 0; m < c.length; m++) {
      var y = c[m];
      if (y.dataset.precedence === n) r = y;
      else if (r !== s) break;
    }
    r ? r.parentNode.insertBefore(l, r.nextSibling) : (n = u.nodeType === 9 ? u.head : u, n.insertBefore(l, n.firstChild));
  }
  function Od(l, n) {
    l.crossOrigin == null && (l.crossOrigin = n.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = n.referrerPolicy), l.title == null && (l.title = n.title);
  }
  function Md(l, n) {
    l.crossOrigin == null && (l.crossOrigin = n.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = n.referrerPolicy), l.integrity == null && (l.integrity = n.integrity);
  }
  var vi = null;
  function iy(l, n, u) {
    if (vi === null) {
      var c = /* @__PURE__ */ new Map(), s = vi = /* @__PURE__ */ new Map();
      s.set(u, c);
    } else
      s = vi, c = s.get(u), c || (c = /* @__PURE__ */ new Map(), s.set(u, c));
    if (c.has(l)) return c;
    for (c.set(l, null), u = u.getElementsByTagName(l), s = 0; s < u.length; s++) {
      var r = u[s];
      if (!(r[ae] || r[el] || l === "link" && r.getAttribute("rel") === "stylesheet") && r.namespaceURI !== "http://www.w3.org/2000/svg") {
        var m = r.getAttribute(n) || "";
        m = l + m;
        var y = c.get(m);
        y ? y.push(r) : c.set(m, [r]);
      }
    }
    return c;
  }
  function cy(l, n, u) {
    l = l.ownerDocument || l, l.head.insertBefore(
      u,
      n === "title" ? l.querySelector("head > title") : null
    );
  }
  function d0(l, n, u) {
    if (u === 1 || n.itemProp != null) return !1;
    switch (l) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof n.precedence != "string" || typeof n.href != "string" || n.href === "")
          break;
        return !0;
      case "link":
        if (typeof n.rel != "string" || typeof n.href != "string" || n.href === "" || n.onLoad || n.onError)
          break;
        switch (n.rel) {
          case "stylesheet":
            return l = n.disabled, typeof n.precedence == "string" && l == null;
          default:
            return !0;
        }
      case "script":
        if (n.async && typeof n.async != "function" && typeof n.async != "symbol" && !n.onLoad && !n.onError && n.src && typeof n.src == "string")
          return !0;
    }
    return !1;
  }
  function oy(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  var jo = null;
  function h0() {
  }
  function m0(l, n, u) {
    if (jo === null) throw Error(g(475));
    var c = jo;
    if (n.type === "stylesheet" && (typeof u.media != "string" || matchMedia(u.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var s = Co(u.href), r = l.querySelector(
          Ho(s)
        );
        if (r) {
          l = r._p, l !== null && typeof l == "object" && typeof l.then == "function" && (c.count++, c = ys.bind(c), l.then(c, c)), n.state.loading |= 4, n.instance = r, Jt(r);
          return;
        }
        r = l.ownerDocument || l, u = No(u), (s = _t.get(s)) && Od(u, s), r = r.createElement("link"), Jt(r);
        var m = r;
        m._p = new Promise(function(y, b) {
          m.onload = y, m.onerror = b;
        }), ve(r, "link", u), n.instance = r;
      }
      c.stylesheets === null && (c.stylesheets = /* @__PURE__ */ new Map()), c.stylesheets.set(n, l), (l = n.state.preload) && (n.state.loading & 3) === 0 && (c.count++, n = ys.bind(c), l.addEventListener("load", n), l.addEventListener("error", n));
    }
  }
  function fy() {
    if (jo === null) throw Error(g(475));
    var l = jo;
    return l.stylesheets && l.count === 0 && ps(l, l.stylesheets), 0 < l.count ? function(n) {
      var u = setTimeout(function() {
        if (l.stylesheets && ps(l, l.stylesheets), l.unsuspend) {
          var c = l.unsuspend;
          l.unsuspend = null, c();
        }
      }, 6e4);
      return l.unsuspend = n, function() {
        l.unsuspend = null, clearTimeout(u);
      };
    } : null;
  }
  function ys() {
    if (this.count--, this.count === 0) {
      if (this.stylesheets) ps(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        this.unsuspend = null, l();
      }
    }
  }
  var _o = null;
  function ps(l, n) {
    l.stylesheets = null, l.unsuspend !== null && (l.count++, _o = /* @__PURE__ */ new Map(), n.forEach(ma, l), _o = null, ys.call(l));
  }
  function ma(l, n) {
    if (!(n.state.loading & 4)) {
      var u = _o.get(l);
      if (u) var c = u.get(null);
      else {
        u = /* @__PURE__ */ new Map(), _o.set(l, u);
        for (var s = l.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), r = 0; r < s.length; r++) {
          var m = s[r];
          (m.nodeName === "LINK" || m.getAttribute("media") !== "not all") && (u.set(m.dataset.precedence, m), c = m);
        }
        c && u.set(null, c);
      }
      s = n.instance, m = s.getAttribute("data-precedence"), r = u.get(m) || c, r === c && u.set(null, s), u.set(m, s), this.count++, c = ys.bind(this), s.addEventListener("load", c), s.addEventListener("error", c), r ? r.parentNode.insertBefore(s, r.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(s, l.firstChild)), n.state.loading |= 4;
    }
  }
  var ta = {
    $$typeof: st,
    Provider: null,
    Consumer: null,
    _currentValue: W,
    _currentValue2: W,
    _threadCount: 0
  };
  function Ov(l, n, u, c, s, r, m, y) {
    this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ju(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ju(0), this.hiddenUpdates = ju(null), this.identifierPrefix = c, this.onUncaughtError = s, this.onCaughtError = r, this.onRecoverableError = m, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = y, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function sy(l, n, u, c, s, r, m, y, b, M, G, X) {
    return l = new Ov(
      l,
      n,
      u,
      m,
      y,
      b,
      M,
      X
    ), n = 1, r === !0 && (n |= 24), r = Zl(3, null, null, n), l.current = r, r.stateNode = l, n = lo(), n.refCount++, l.pooledCache = n, n.refCount++, r.memoizedState = {
      element: c,
      isDehydrated: u,
      cache: n
    }, Sr(r), l;
  }
  function ry(l) {
    return l ? (l = kc, l) : kc;
  }
  function dy(l, n, u, c, s, r) {
    s = ry(s), c.context === null ? c.context = s : c.pendingContext = s, c = Jl(n), c.payload = { element: u }, r = r === void 0 ? null : r, r !== null && (c.callback = r), u = Tn(l, c, n), u !== null && (da(u, l, n), Fi(u, l, n));
  }
  function hy(l, n) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var u = l.retryLane;
      l.retryLane = u !== 0 && u < n ? u : n;
    }
  }
  function Ud(l, n) {
    hy(l, n), (l = l.alternate) && hy(l, n);
  }
  function my(l) {
    if (l.tag === 13) {
      var n = yn(l, 67108864);
      n !== null && da(n, l, 67108864), Ud(l, 67108864);
    }
  }
  var vs = !0;
  function y0(l, n, u, c) {
    var s = z.T;
    z.T = null;
    var r = Z.p;
    try {
      Z.p = 2, yy(l, n, u, c);
    } finally {
      Z.p = r, z.T = s;
    }
  }
  function p0(l, n, u, c) {
    var s = z.T;
    z.T = null;
    var r = Z.p;
    try {
      Z.p = 8, yy(l, n, u, c);
    } finally {
      Z.p = r, z.T = s;
    }
  }
  function yy(l, n, u, c) {
    if (vs) {
      var s = Cd(c);
      if (s === null)
        _a(
          l,
          n,
          c,
          Hd,
          u
        ), bc(l, c);
      else if (g0(
        s,
        l,
        n,
        u,
        c
      ))
        c.stopPropagation();
      else if (bc(l, c), n & 4 && -1 < v0.indexOf(l)) {
        for (; s !== null; ) {
          var r = Mi(s);
          if (r !== null)
            switch (r.tag) {
              case 3:
                if (r = r.stateNode, r.current.memoizedState.isDehydrated) {
                  var m = na(r.pendingLanes);
                  if (m !== 0) {
                    var y = r;
                    for (y.pendingLanes |= 2, y.entangledLanes |= 2; m; ) {
                      var b = 1 << 31 - Vl(m);
                      y.entanglements[1] |= b, m &= ~b;
                    }
                    Il(r), (et & 6) === 0 && (od = aa() + 500, ns(0));
                  }
                }
                break;
              case 13:
                y = yn(r, 2), y !== null && da(y, r, 2), hc(), Ud(r, 2);
            }
          if (r = Cd(c), r === null && _a(
            l,
            n,
            c,
            Hd,
            u
          ), r === s) break;
          s = r;
        }
        s !== null && c.stopPropagation();
      } else
        _a(
          l,
          n,
          c,
          null,
          u
        );
    }
  }
  function Cd(l) {
    return l = Ws(l), py(l);
  }
  var Hd = null;
  function py(l) {
    if (Hd = null, l = sl(l), l !== null) {
      var n = oe(l);
      if (n === null) l = null;
      else {
        var u = n.tag;
        if (u === 13) {
          if (l = De(n), l !== null) return l;
          l = null;
        } else if (u === 3) {
          if (n.stateNode.current.memoizedState.isDehydrated)
            return n.tag === 3 ? n.stateNode.containerInfo : null;
          l = null;
        } else n !== l && (l = null);
      }
    }
    return Hd = l, null;
  }
  function vy(l) {
    switch (l) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Po()) {
          case ip:
            return 2;
          case rh:
            return 8;
          case ef:
          case dh:
            return 32;
          case jc:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var qo = !1, Yn = null, Au = null, Ru = null, gs = /* @__PURE__ */ new Map(), bs = /* @__PURE__ */ new Map(), gi = [], v0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function bc(l, n) {
    switch (l) {
      case "focusin":
      case "focusout":
        Yn = null;
        break;
      case "dragenter":
      case "dragleave":
        Au = null;
        break;
      case "mouseover":
      case "mouseout":
        Ru = null;
        break;
      case "pointerover":
      case "pointerout":
        gs.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        bs.delete(n.pointerId);
    }
  }
  function Sc(l, n, u, c, s, r) {
    return l === null || l.nativeEvent !== r ? (l = {
      blockedOn: n,
      domEventName: u,
      eventSystemFlags: c,
      nativeEvent: r,
      targetContainers: [s]
    }, n !== null && (n = Mi(n), n !== null && my(n)), l) : (l.eventSystemFlags |= c, n = l.targetContainers, s !== null && n.indexOf(s) === -1 && n.push(s), l);
  }
  function g0(l, n, u, c, s) {
    switch (n) {
      case "focusin":
        return Yn = Sc(
          Yn,
          l,
          n,
          u,
          c,
          s
        ), !0;
      case "dragenter":
        return Au = Sc(
          Au,
          l,
          n,
          u,
          c,
          s
        ), !0;
      case "mouseover":
        return Ru = Sc(
          Ru,
          l,
          n,
          u,
          c,
          s
        ), !0;
      case "pointerover":
        var r = s.pointerId;
        return gs.set(
          r,
          Sc(
            gs.get(r) || null,
            l,
            n,
            u,
            c,
            s
          )
        ), !0;
      case "gotpointercapture":
        return r = s.pointerId, bs.set(
          r,
          Sc(
            bs.get(r) || null,
            l,
            n,
            u,
            c,
            s
          )
        ), !0;
    }
    return !1;
  }
  function gy(l) {
    var n = sl(l.target);
    if (n !== null) {
      var u = oe(n);
      if (u !== null) {
        if (n = u.tag, n === 13) {
          if (n = De(u), n !== null) {
            l.blockedOn = n, fv(l.priority, function() {
              if (u.tag === 13) {
                var c = ra();
                c = Va(c);
                var s = yn(u, c);
                s !== null && da(s, u, c), Ud(u, c);
              }
            });
            return;
          }
        } else if (n === 3 && u.stateNode.current.memoizedState.isDehydrated) {
          l.blockedOn = u.tag === 3 ? u.stateNode.containerInfo : null;
          return;
        }
      }
    }
    l.blockedOn = null;
  }
  function Ss(l) {
    if (l.blockedOn !== null) return !1;
    for (var n = l.targetContainers; 0 < n.length; ) {
      var u = Cd(l.nativeEvent);
      if (u === null) {
        u = l.nativeEvent;
        var c = new u.constructor(
          u.type,
          u
        );
        _i = c, u.target.dispatchEvent(c), _i = null;
      } else
        return n = Mi(u), n !== null && my(n), l.blockedOn = u, !1;
      n.shift();
    }
    return !0;
  }
  function Ts(l, n, u) {
    Ss(l) && u.delete(n);
  }
  function Bo() {
    qo = !1, Yn !== null && Ss(Yn) && (Yn = null), Au !== null && Ss(Au) && (Au = null), Ru !== null && Ss(Ru) && (Ru = null), gs.forEach(Ts), bs.forEach(Ts);
  }
  function Nd(l, n) {
    l.blockedOn === n && (l.blockedOn = null, qo || (qo = !0, A.unstable_scheduleCallback(
      A.unstable_NormalPriority,
      Bo
    )));
  }
  var Tc = null;
  function by(l) {
    Tc !== l && (Tc = l, A.unstable_scheduleCallback(
      A.unstable_NormalPriority,
      function() {
        Tc === l && (Tc = null);
        for (var n = 0; n < l.length; n += 3) {
          var u = l[n], c = l[n + 1], s = l[n + 2];
          if (typeof c != "function") {
            if (py(c || u) === null)
              continue;
            break;
          }
          var r = Mi(u);
          r !== null && (l.splice(n, 3), n -= 3, Gr(
            r,
            {
              pending: !0,
              data: s,
              method: u.method,
              action: c
            },
            c,
            s
          ));
        }
      }
    ));
  }
  function wn(l) {
    function n(b) {
      return Nd(b, l);
    }
    Yn !== null && Nd(Yn, l), Au !== null && Nd(Au, l), Ru !== null && Nd(Ru, l), gs.forEach(n), bs.forEach(n);
    for (var u = 0; u < gi.length; u++) {
      var c = gi[u];
      c.blockedOn === l && (c.blockedOn = null);
    }
    for (; 0 < gi.length && (u = gi[0], u.blockedOn === null); )
      gy(u), u.blockedOn === null && gi.shift();
    if (u = (l.ownerDocument || l).$$reactFormReplay, u != null)
      for (c = 0; c < u.length; c += 3) {
        var s = u[c], r = u[c + 1], m = s[Cl] || null;
        if (typeof r == "function")
          m || by(u);
        else if (m) {
          var y = null;
          if (r && r.hasAttribute("formAction")) {
            if (s = r, m = r[Cl] || null)
              y = m.formAction;
            else if (py(s) !== null) continue;
          } else y = m.action;
          typeof y == "function" ? u[c + 1] = y : (u.splice(c, 3), c -= 3), by(u);
        }
      }
  }
  function Sy(l) {
    this._internalRoot = l;
  }
  jd.prototype.render = Sy.prototype.render = function(l) {
    var n = this._internalRoot;
    if (n === null) throw Error(g(409));
    var u = n.current, c = ra();
    dy(u, c, l, n, null, null);
  }, jd.prototype.unmount = Sy.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var n = l.containerInfo;
      dy(l.current, 2, null, l, null, null), hc(), n[Bc] = null;
    }
  };
  function jd(l) {
    this._internalRoot = l;
  }
  jd.prototype.unstable_scheduleHydration = function(l) {
    if (l) {
      var n = sp();
      l = { blockedOn: null, target: l, priority: n };
      for (var u = 0; u < gi.length && n !== 0 && n < gi[u].priority; u++) ;
      gi.splice(u, 0, l), u === 0 && gy(l);
    }
  };
  var Ty = Q.version;
  if (Ty !== "19.1.1")
    throw Error(
      g(
        527,
        Ty,
        "19.1.1"
      )
    );
  Z.findDOMNode = function(l) {
    var n = l._reactInternals;
    if (n === void 0)
      throw typeof l.render == "function" ? Error(g(188)) : (l = Object.keys(l).join(","), Error(g(268, l)));
    return l = L(n), l = l !== null ? fe(l) : null, l = l === null ? null : l.stateNode, l;
  };
  var Bl = {
    bundleType: 0,
    version: "19.1.1",
    rendererPackageName: "react-dom",
    currentDispatcherRef: z,
    reconcilerVersion: "19.1.1"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var xs = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!xs.isDisabled && xs.supportsFiber)
      try {
        _c = xs.inject(
          Bl
        ), Ul = xs;
      } catch {
      }
  }
  return lp.createRoot = function(l, n) {
    if (!$(l)) throw Error(g(299));
    var u = !1, c = "", s = so, r = gm, m = Kf, y = null;
    return n != null && (n.unstable_strictMode === !0 && (u = !0), n.identifierPrefix !== void 0 && (c = n.identifierPrefix), n.onUncaughtError !== void 0 && (s = n.onUncaughtError), n.onCaughtError !== void 0 && (r = n.onCaughtError), n.onRecoverableError !== void 0 && (m = n.onRecoverableError), n.unstable_transitionCallbacks !== void 0 && (y = n.unstable_transitionCallbacks)), n = sy(
      l,
      1,
      !1,
      null,
      null,
      u,
      c,
      s,
      r,
      m,
      y,
      null
    ), l[Bc] = n.current, ly(l), new Sy(n);
  }, lp.hydrateRoot = function(l, n, u) {
    if (!$(l)) throw Error(g(299));
    var c = !1, s = "", r = so, m = gm, y = Kf, b = null, M = null;
    return u != null && (u.unstable_strictMode === !0 && (c = !0), u.identifierPrefix !== void 0 && (s = u.identifierPrefix), u.onUncaughtError !== void 0 && (r = u.onUncaughtError), u.onCaughtError !== void 0 && (m = u.onCaughtError), u.onRecoverableError !== void 0 && (y = u.onRecoverableError), u.unstable_transitionCallbacks !== void 0 && (b = u.unstable_transitionCallbacks), u.formState !== void 0 && (M = u.formState)), n = sy(
      l,
      1,
      !0,
      n,
      u ?? null,
      c,
      s,
      r,
      m,
      y,
      b,
      M
    ), n.context = ry(null), u = n.current, c = ra(), c = Va(c), s = Jl(c), s.callback = null, Tn(u, s, c), u = c, n.current.lanes = u, Oi(n, u), Il(n), l[Bc] = n.current, ly(l), new jd(n);
  }, lp.version = "19.1.1", lp;
}
var ap = {};
/**
 * @license React
 * react-dom-client.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var H1;
function l2() {
  return H1 || (H1 = 1, process.env.NODE_ENV !== "production" && (function() {
    function A(e, t) {
      for (e = e.memoizedState; e !== null && 0 < t; )
        e = e.next, t--;
      return e;
    }
    function Q(e, t, a, i) {
      if (a >= t.length) return i;
      var o = t[a], f = Te(e) ? e.slice() : Me({}, e);
      return f[o] = Q(e[o], t, a + 1, i), f;
    }
    function K(e, t, a) {
      if (t.length !== a.length)
        console.warn("copyWithRename() expects paths of the same length");
      else {
        for (var i = 0; i < a.length - 1; i++)
          if (t[i] !== a[i]) {
            console.warn(
              "copyWithRename() expects paths to be the same except for the deepest key"
            );
            return;
          }
        return g(e, t, a, 0);
      }
    }
    function g(e, t, a, i) {
      var o = t[i], f = Te(e) ? e.slice() : Me({}, e);
      return i + 1 === t.length ? (f[a[i]] = f[o], Te(f) ? f.splice(o, 1) : delete f[o]) : f[o] = g(
        e[o],
        t,
        a,
        i + 1
      ), f;
    }
    function $(e, t, a) {
      var i = t[a], o = Te(e) ? e.slice() : Me({}, e);
      return a + 1 === t.length ? (Te(o) ? o.splice(i, 1) : delete o[i], o) : (o[i] = $(e[i], t, a + 1), o);
    }
    function oe() {
      return !1;
    }
    function De() {
      return null;
    }
    function be() {
    }
    function L() {
      console.error(
        "Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://react.dev/link/rules-of-hooks"
      );
    }
    function fe() {
      console.error(
        "Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."
      );
    }
    function F() {
    }
    function P(e) {
      var t = [];
      return e.forEach(function(a) {
        t.push(a);
      }), t.sort().join(", ");
    }
    function ie(e, t, a, i) {
      return new vf(e, t, a, i);
    }
    function Fe(e, t) {
      e.context === Yo && (at(e.current, 2, t, e, null, null), cc());
    }
    function Je(e, t) {
      if (Vn !== null) {
        var a = t.staleFamilies;
        t = t.updatedFamilies, ro(), pf(
          e.current,
          t,
          a
        ), cc();
      }
    }
    function qt(e) {
      Vn = e;
    }
    function lt(e) {
      return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
    }
    function Ie(e) {
      var t = e, a = e;
      if (e.alternate) for (; t.return; ) t = t.return;
      else {
        e = t;
        do
          t = e, (t.flags & 4098) !== 0 && (a = t.return), e = t.return;
        while (e);
      }
      return t.tag === 3 ? a : null;
    }
    function ol(e) {
      if (e.tag === 13) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
      }
      return null;
    }
    function st(e) {
      if (Ie(e) !== e)
        throw Error("Unable to find node on an unmounted component.");
    }
    function Bt(e) {
      var t = e.alternate;
      if (!t) {
        if (t = Ie(e), t === null)
          throw Error("Unable to find node on an unmounted component.");
        return t !== e ? null : e;
      }
      for (var a = e, i = t; ; ) {
        var o = a.return;
        if (o === null) break;
        var f = o.alternate;
        if (f === null) {
          if (i = o.return, i !== null) {
            a = i;
            continue;
          }
          break;
        }
        if (o.child === f.child) {
          for (f = o.child; f; ) {
            if (f === a) return st(o), e;
            if (f === i) return st(o), t;
            f = f.sibling;
          }
          throw Error("Unable to find node on an unmounted component.");
        }
        if (a.return !== i.return) a = o, i = f;
        else {
          for (var d = !1, h = o.child; h; ) {
            if (h === a) {
              d = !0, a = o, i = f;
              break;
            }
            if (h === i) {
              d = !0, i = o, a = f;
              break;
            }
            h = h.sibling;
          }
          if (!d) {
            for (h = f.child; h; ) {
              if (h === a) {
                d = !0, a = f, i = o;
                break;
              }
              if (h === i) {
                d = !0, i = f, a = o;
                break;
              }
              h = h.sibling;
            }
            if (!d)
              throw Error(
                "Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue."
              );
          }
        }
        if (a.alternate !== i)
          throw Error(
            "Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue."
          );
      }
      if (a.tag !== 3)
        throw Error("Unable to find node on an unmounted component.");
      return a.stateNode.current === a ? e : t;
    }
    function Zt(e) {
      var t = e.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6) return e;
      for (e = e.child; e !== null; ) {
        if (t = Zt(e), t !== null) return t;
        e = e.sibling;
      }
      return null;
    }
    function gt(e) {
      return e === null || typeof e != "object" ? null : (e = ny && e[ny] || e["@@iterator"], typeof e == "function" ? e : null);
    }
    function Ne(e) {
      if (e == null) return null;
      if (typeof e == "function")
        return e.$$typeof === Sd ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case Ae:
          return "Fragment";
        case zo:
          return "Profiler";
        case Ro:
          return "StrictMode";
        case Do:
          return "Suspense";
        case di:
          return "SuspenseList";
        case ay:
          return "Activity";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case vc:
            return "Portal";
          case _a:
            return (e.displayName || "Context") + ".Provider";
          case bd:
            return (e._context.displayName || "Context") + ".Consumer";
          case bu:
            var t = e.render;
            return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case ss:
            return t = e.displayName || null, t !== null ? t : Ne(e.type) || "Memo";
          case ha:
            t = e._payload, e = e._init;
            try {
              return Ne(e(t));
            } catch {
            }
        }
      return null;
    }
    function mt(e) {
      return typeof e.tag == "number" ? ce(e) : typeof e.name == "string" ? e.name : null;
    }
    function ce(e) {
      var t = e.type;
      switch (e.tag) {
        case 31:
          return "Activity";
        case 24:
          return "Cache";
        case 9:
          return (t._context.displayName || "Context") + ".Consumer";
        case 10:
          return (t.displayName || "Context") + ".Provider";
        case 18:
          return "DehydratedFragment";
        case 11:
          return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
        case 7:
          return "Fragment";
        case 26:
        case 27:
        case 5:
          return t;
        case 4:
          return "Portal";
        case 3:
          return "Root";
        case 6:
          return "Text";
        case 16:
          return Ne(t);
        case 8:
          return t === Ro ? "StrictMode" : "Mode";
        case 22:
          return "Offscreen";
        case 12:
          return "Profiler";
        case 21:
          return "Scope";
        case 13:
          return "Suspense";
        case 19:
          return "SuspenseList";
        case 25:
          return "TracingMarker";
        case 1:
        case 0:
        case 14:
        case 15:
          if (typeof t == "function")
            return t.displayName || t.name || null;
          if (typeof t == "string") return t;
          break;
        case 29:
          if (t = e._debugInfo, t != null) {
            for (var a = t.length - 1; 0 <= a; a--)
              if (typeof t[a].name == "string") return t[a].name;
          }
          if (e.return !== null)
            return ce(e.return);
      }
      return null;
    }
    function rt(e) {
      return { current: e };
    }
    function Ge(e, t) {
      0 > qa ? console.error("Unexpected pop.") : (t !== ds[qa] && console.error("Unexpected Fiber popped."), e.current = rs[qa], rs[qa] = null, ds[qa] = null, qa--);
    }
    function Se(e, t, a) {
      qa++, rs[qa] = e.current, ds[qa] = a, e.current = t;
    }
    function Gt(e) {
      return e === null && console.error(
        "Expected host context to exist. This error is likely caused by a bug in React. Please file an issue."
      ), e;
    }
    function zt(e, t) {
      Se(qn, t, e), Se(Oo, e, e), Se(Su, null, e);
      var a = t.nodeType;
      switch (a) {
        case 9:
        case 11:
          a = a === 9 ? "#document" : "#fragment", t = (t = t.documentElement) && (t = t.namespaceURI) ? tt(t) : Cc;
          break;
        default:
          if (a = t.tagName, t = t.namespaceURI)
            t = tt(t), t = Wl(
              t,
              a
            );
          else
            switch (a) {
              case "svg":
                t = oh;
                break;
              case "math":
                t = k0;
                break;
              default:
                t = Cc;
            }
      }
      a = a.toLowerCase(), a = gh(null, a), a = {
        context: t,
        ancestorInfo: a
      }, Ge(Su, e), Se(Su, a, e);
    }
    function Yt(e) {
      Ge(Su, e), Ge(Oo, e), Ge(qn, e);
    }
    function z() {
      return Gt(Su.current);
    }
    function Z(e) {
      e.memoizedState !== null && Se(Mo, e, e);
      var t = Gt(Su.current), a = e.type, i = Wl(t.context, a);
      a = gh(t.ancestorInfo, a), i = { context: i, ancestorInfo: a }, t !== i && (Se(Oo, e, e), Se(Su, i, e));
    }
    function W(e) {
      Oo.current === e && (Ge(Su, e), Ge(Oo, e)), Mo.current === e && (Ge(Mo, e), Py._currentValue = Gs);
    }
    function re(e) {
      return typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
    }
    function j(e) {
      try {
        return k(e), !1;
      } catch {
        return !0;
      }
    }
    function k(e) {
      return "" + e;
    }
    function I(e, t) {
      if (j(e))
        return console.error(
          "The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before using it here.",
          t,
          re(e)
        ), k(e);
    }
    function me(e, t) {
      if (j(e))
        return console.error(
          "The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before using it here.",
          t,
          re(e)
        ), k(e);
    }
    function je(e) {
      if (j(e))
        return console.error(
          "Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before using it here.",
          re(e)
        ), k(e);
    }
    function dt(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u") return !1;
      var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (t.isDisabled) return !0;
      if (!t.supportsFiber)
        return console.error(
          "The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://react.dev/link/react-devtools"
        ), !0;
      try {
        mi = t.inject(e), vl = t;
      } catch (a) {
        console.error("React instrumentation encountered an error: %s.", a);
      }
      return !!t.checkDCE;
    }
    function Ve(e) {
      if (typeof Dv == "function" && tn(e), vl && typeof vl.setStrictMode == "function")
        try {
          vl.setStrictMode(mi, e);
        } catch (t) {
          Pl || (Pl = !0, console.error(
            "React instrumentation encountered an error: %s",
            t
          ));
        }
    }
    function Cu(e) {
      te = e;
    }
    function Dt() {
      te !== null && typeof te.markCommitStopped == "function" && te.markCommitStopped();
    }
    function fl(e) {
      te !== null && typeof te.markComponentRenderStarted == "function" && te.markComponentRenderStarted(e);
    }
    function Ta() {
      te !== null && typeof te.markComponentRenderStopped == "function" && te.markComponentRenderStopped();
    }
    function Ai(e) {
      te !== null && typeof te.markRenderStarted == "function" && te.markRenderStarted(e);
    }
    function Vs() {
      te !== null && typeof te.markRenderStopped == "function" && te.markRenderStopped();
    }
    function Ri(e, t) {
      te !== null && typeof te.markStateUpdateScheduled == "function" && te.markStateUpdateScheduled(e, t);
    }
    function sh(e) {
      return e >>>= 0, e === 0 ? 32 : 31 - (Ed(e) / xu | 0) | 0;
    }
    function iv(e) {
      if (e & 1) return "SyncHydrationLane";
      if (e & 2) return "Sync";
      if (e & 4) return "InputContinuousHydration";
      if (e & 8) return "InputContinuous";
      if (e & 16) return "DefaultHydration";
      if (e & 32) return "Default";
      if (e & 128) return "TransitionHydration";
      if (e & 4194048) return "Transition";
      if (e & 62914560) return "Retry";
      if (e & 67108864) return "SelectiveHydration";
      if (e & 134217728) return "IdleHydration";
      if (e & 268435456) return "Idle";
      if (e & 536870912) return "Offscreen";
      if (e & 1073741824) return "Deferred";
    }
    function zi(e) {
      var t = e & 42;
      if (t !== 0) return t;
      switch (e & -e) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 4:
          return 4;
        case 8:
          return 8;
        case 16:
          return 16;
        case 32:
          return 32;
        case 64:
          return 64;
        case 128:
          return 128;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return e & 4194048;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return e & 62914560;
        case 67108864:
          return 67108864;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 0;
        default:
          return console.error(
            "Should have found matching lanes. This is a bug in React."
          ), e;
      }
    }
    function aa(e, t, a) {
      var i = e.pendingLanes;
      if (i === 0) return 0;
      var o = 0, f = e.suspendedLanes, d = e.pingedLanes;
      e = e.warmLanes;
      var h = i & 134217727;
      return h !== 0 ? (i = h & ~f, i !== 0 ? o = zi(i) : (d &= h, d !== 0 ? o = zi(d) : a || (a = h & ~e, a !== 0 && (o = zi(a))))) : (h = i & ~f, h !== 0 ? o = zi(h) : d !== 0 ? o = zi(d) : a || (a = i & ~e, a !== 0 && (o = zi(a)))), o === 0 ? 0 : t !== 0 && t !== o && (t & f) === 0 && (f = o & -o, a = t & -t, f >= a || f === 32 && (a & 4194048) !== 0) ? t : o;
    }
    function Po(e, t) {
      return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
    }
    function ip(e, t) {
      switch (e) {
        case 1:
        case 2:
        case 4:
        case 8:
        case 64:
          return t + 250;
        case 16:
        case 32:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return -1;
        case 67108864:
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1;
        default:
          return console.error(
            "Should have found matching lanes. This is a bug in React."
          ), -1;
      }
    }
    function rh() {
      var e = Ad;
      return Ad <<= 1, (Ad & 4194048) === 0 && (Ad = 256), e;
    }
    function ef() {
      var e = Rd;
      return Rd <<= 1, (Rd & 62914560) === 0 && (Rd = 4194304), e;
    }
    function dh(e) {
      for (var t = [], a = 0; 31 > a; a++) t.push(e);
      return t;
    }
    function jc(e, t) {
      e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
    }
    function cv(e, t, a, i, o, f) {
      var d = e.pendingLanes;
      e.pendingLanes = a, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= a, e.entangledLanes &= a, e.errorRecoveryDisabledLanes &= a, e.shellSuspendCounter = 0;
      var h = e.entanglements, p = e.expirationTimes, v = e.hiddenUpdates;
      for (a = d & ~a; 0 < a; ) {
        var H = 31 - zl(a), B = 1 << H;
        h[H] = 0, p[H] = -1;
        var U = v[H];
        if (U !== null)
          for (v[H] = null, H = 0; H < U.length; H++) {
            var Y = U[H];
            Y !== null && (Y.lane &= -536870913);
          }
        a &= ~B;
      }
      i !== 0 && cp(e, i, 0), f !== 0 && o === 0 && e.tag !== 0 && (e.suspendedLanes |= f & ~(d & ~t));
    }
    function cp(e, t, a) {
      e.pendingLanes |= t, e.suspendedLanes &= ~t;
      var i = 31 - zl(t);
      e.entangledLanes |= t, e.entanglements[i] = e.entanglements[i] | 1073741824 | a & 4194090;
    }
    function _c(e, t) {
      var a = e.entangledLanes |= t;
      for (e = e.entanglements; a; ) {
        var i = 31 - zl(a), o = 1 << i;
        o & t | e[i] & t && (e[i] |= t), a &= ~o;
      }
    }
    function Ul(e) {
      switch (e) {
        case 2:
          e = 1;
          break;
        case 8:
          e = 4;
          break;
        case 32:
          e = 16;
          break;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          e = 128;
          break;
        case 268435456:
          e = 134217728;
          break;
        default:
          e = 0;
      }
      return e;
    }
    function Fn(e, t, a) {
      if (_t)
        for (e = e.pendingUpdatersLaneMap; 0 < a; ) {
          var i = 31 - zl(a), o = 1 << i;
          e[i].add(t), a &= ~o;
        }
    }
    function Vl(e, t) {
      if (_t)
        for (var a = e.pendingUpdatersLaneMap, i = e.memoizedUpdaters; 0 < t; ) {
          var o = 31 - zl(t);
          e = 1 << o, o = a[o], 0 < o.size && (o.forEach(function(f) {
            var d = f.alternate;
            d !== null && i.has(d) || i.add(f);
          }), o.clear()), t &= ~e;
        }
    }
    function hh(e) {
      return e &= -e, gl < e ? ln < e ? (e & 134217727) !== 0 ? Eu : zd : ln : gl;
    }
    function op() {
      var e = ve.p;
      return e !== 0 ? e : (e = window.event, e === void 0 ? Eu : vd(e.type));
    }
    function ov(e, t) {
      var a = ve.p;
      try {
        return ve.p = e, t();
      } finally {
        ve.p = a;
      }
    }
    function qc(e) {
      delete e[Dl], delete e[ea], delete e[uy], delete e[f0], delete e[Co];
    }
    function In(e) {
      var t = e[Dl];
      if (t) return t;
      for (var a = e.parentNode; a; ) {
        if (t = a[pi] || a[Dl]) {
          if (a = t.alternate, t.child !== null || a !== null && a.child !== null)
            for (e = To(e); e !== null; ) {
              if (a = e[Dl])
                return a;
              e = To(e);
            }
          return t;
        }
        e = a, a = e.parentNode;
      }
      return null;
    }
    function na(e) {
      if (e = e[Dl] || e[pi]) {
        var t = e.tag;
        if (t === 5 || t === 6 || t === 13 || t === 26 || t === 27 || t === 3)
          return e;
      }
      return null;
    }
    function Hu(e) {
      var t = e.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6)
        return e.stateNode;
      throw Error("getNodeFromInstance: Invalid argument.");
    }
    function cn(e) {
      var t = e[Ho];
      return t || (t = e[Ho] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
    }
    function Pt(e) {
      e[No] = !0;
    }
    function Nu(e, t) {
      Di(e, t), Di(e + "Capture", t);
    }
    function Di(e, t) {
      Ba[e] && console.error(
        "EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.",
        e
      ), Ba[e] = t;
      var a = e.toLowerCase();
      for (gc[a] = e, e === "onDoubleClick" && (gc.ondblclick = e), e = 0; e < t.length; e++)
        s0.add(t[e]);
    }
    function ju(e, t) {
      r0[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || console.error(
        e === "select" ? "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set `onChange`." : "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."
      ), t.onChange || t.readOnly || t.disabled || t.checked == null || console.error(
        "You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`."
      );
    }
    function Oi(e) {
      return Tu.call(Md, e) ? !0 : Tu.call(Od, e) ? !1 : Dd.test(e) ? Md[e] = !0 : (Od[e] = !0, console.error("Invalid attribute name: `%s`", e), !1);
    }
    function fp(e, t, a) {
      if (Oi(t)) {
        if (!e.hasAttribute(t)) {
          switch (typeof a) {
            case "symbol":
            case "object":
              return a;
            case "function":
              return a;
            case "boolean":
              if (a === !1) return a;
          }
          return a === void 0 ? void 0 : null;
        }
        return e = e.getAttribute(t), e === "" && a === !0 ? !0 : (I(a, t), e === "" + a ? a : e);
      }
    }
    function tf(e, t, a) {
      if (Oi(t))
        if (a === null) e.removeAttribute(t);
        else {
          switch (typeof a) {
            case "undefined":
            case "function":
            case "symbol":
              e.removeAttribute(t);
              return;
            case "boolean":
              var i = t.toLowerCase().slice(0, 5);
              if (i !== "data-" && i !== "aria-") {
                e.removeAttribute(t);
                return;
              }
          }
          I(a, t), e.setAttribute(t, "" + a);
        }
    }
    function lf(e, t, a) {
      if (a === null) e.removeAttribute(t);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            e.removeAttribute(t);
            return;
        }
        I(a, t), e.setAttribute(t, "" + a);
      }
    }
    function Va(e, t, a, i) {
      if (i === null) e.removeAttribute(a);
      else {
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            e.removeAttribute(a);
            return;
        }
        I(i, a), e.setAttributeNS(t, a, "" + i);
      }
    }
    function Xs() {
    }
    function sp() {
      if (vi === 0) {
        iy = console.log, cy = console.info, d0 = console.warn, oy = console.error, jo = console.group, h0 = console.groupCollapsed, m0 = console.groupEnd;
        var e = {
          configurable: !0,
          enumerable: !0,
          value: Xs,
          writable: !0
        };
        Object.defineProperties(console, {
          info: e,
          log: e,
          warn: e,
          error: e,
          group: e,
          groupCollapsed: e,
          groupEnd: e
        });
      }
      vi++;
    }
    function fv() {
      if (vi--, vi === 0) {
        var e = { configurable: !0, enumerable: !0, writable: !0 };
        Object.defineProperties(console, {
          log: Me({}, e, { value: iy }),
          info: Me({}, e, { value: cy }),
          warn: Me({}, e, { value: d0 }),
          error: Me({}, e, { value: oy }),
          group: Me({}, e, { value: jo }),
          groupCollapsed: Me({}, e, { value: h0 }),
          groupEnd: Me({}, e, { value: m0 })
        });
      }
      0 > vi && console.error(
        "disabledDepth fell below zero. This is a bug in React. Please file an issue."
      );
    }
    function Lt(e) {
      if (fy === void 0)
        try {
          throw Error();
        } catch (a) {
          var t = a.stack.trim().match(/\n( *(at )?)/);
          fy = t && t[1] || "", ys = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return `
` + fy + e + ys;
    }
    function el(e, t) {
      if (!e || _o) return "";
      var a = ps.get(e);
      if (a !== void 0) return a;
      _o = !0, a = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
      var i = null;
      i = _.H, _.H = null, sp();
      try {
        var o = {
          DetermineComponentFrameRoot: function() {
            try {
              if (t) {
                var U = function() {
                  throw Error();
                };
                if (Object.defineProperty(U.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                }), typeof Reflect == "object" && Reflect.construct) {
                  try {
                    Reflect.construct(U, []);
                  } catch (ne) {
                    var Y = ne;
                  }
                  Reflect.construct(e, [], U);
                } else {
                  try {
                    U.call();
                  } catch (ne) {
                    Y = ne;
                  }
                  e.call(U.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (ne) {
                  Y = ne;
                }
                (U = e()) && typeof U.catch == "function" && U.catch(function() {
                });
              }
            } catch (ne) {
              if (ne && Y && typeof ne.stack == "string")
                return [ne.stack, Y.stack];
            }
            return [null, null];
          }
        };
        o.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var f = Object.getOwnPropertyDescriptor(
          o.DetermineComponentFrameRoot,
          "name"
        );
        f && f.configurable && Object.defineProperty(
          o.DetermineComponentFrameRoot,
          "name",
          { value: "DetermineComponentFrameRoot" }
        );
        var d = o.DetermineComponentFrameRoot(), h = d[0], p = d[1];
        if (h && p) {
          var v = h.split(`
`), H = p.split(`
`);
          for (d = f = 0; f < v.length && !v[f].includes(
            "DetermineComponentFrameRoot"
          ); )
            f++;
          for (; d < H.length && !H[d].includes(
            "DetermineComponentFrameRoot"
          ); )
            d++;
          if (f === v.length || d === H.length)
            for (f = v.length - 1, d = H.length - 1; 1 <= f && 0 <= d && v[f] !== H[d]; )
              d--;
          for (; 1 <= f && 0 <= d; f--, d--)
            if (v[f] !== H[d]) {
              if (f !== 1 || d !== 1)
                do
                  if (f--, d--, 0 > d || v[f] !== H[d]) {
                    var B = `
` + v[f].replace(
                      " at new ",
                      " at "
                    );
                    return e.displayName && B.includes("<anonymous>") && (B = B.replace("<anonymous>", e.displayName)), typeof e == "function" && ps.set(e, B), B;
                  }
                while (1 <= f && 0 <= d);
              break;
            }
        }
      } finally {
        _o = !1, _.H = i, fv(), Error.prepareStackTrace = a;
      }
      return v = (v = e ? e.displayName || e.name : "") ? Lt(v) : "", typeof e == "function" && ps.set(e, v), v;
    }
    function Cl(e) {
      var t = Error.prepareStackTrace;
      if (Error.prepareStackTrace = void 0, e = e.stack, Error.prepareStackTrace = t, e.startsWith(`Error: react-stack-top-frame
`) && (e = e.slice(29)), t = e.indexOf(`
`), t !== -1 && (e = e.slice(t + 1)), t = e.indexOf("react_stack_bottom_frame"), t !== -1 && (t = e.lastIndexOf(
        `
`,
        t
      )), t !== -1)
        e = e.slice(0, t);
      else return "";
      return e;
    }
    function Bc(e) {
      switch (e.tag) {
        case 26:
        case 27:
        case 5:
          return Lt(e.type);
        case 16:
          return Lt("Lazy");
        case 13:
          return Lt("Suspense");
        case 19:
          return Lt("SuspenseList");
        case 0:
        case 15:
          return el(e.type, !1);
        case 11:
          return el(e.type.render, !1);
        case 1:
          return el(e.type, !0);
        case 31:
          return Lt("Activity");
        default:
          return "";
      }
    }
    function Qs(e) {
      try {
        var t = "";
        do {
          t += Bc(e);
          var a = e._debugInfo;
          if (a)
            for (var i = a.length - 1; 0 <= i; i--) {
              var o = a[i];
              if (typeof o.name == "string") {
                var f = t, d = o.env, h = Lt(
                  o.name + (d ? " [" + d + "]" : "")
                );
                t = f + h;
              }
            }
          e = e.return;
        } while (e);
        return t;
      } catch (p) {
        return `
Error generating stack: ` + p.message + `
` + p.stack;
      }
    }
    function rp(e) {
      return (e = e ? e.displayName || e.name : "") ? Lt(e) : "";
    }
    function Zs() {
      if (ma === null) return null;
      var e = ma._debugOwner;
      return e != null ? mt(e) : null;
    }
    function dp() {
      if (ma === null) return "";
      var e = ma;
      try {
        var t = "";
        switch (e.tag === 6 && (e = e.return), e.tag) {
          case 26:
          case 27:
          case 5:
            t += Lt(e.type);
            break;
          case 13:
            t += Lt("Suspense");
            break;
          case 19:
            t += Lt("SuspenseList");
            break;
          case 31:
            t += Lt("Activity");
            break;
          case 30:
          case 0:
          case 15:
          case 1:
            e._debugOwner || t !== "" || (t += rp(
              e.type
            ));
            break;
          case 11:
            e._debugOwner || t !== "" || (t += rp(
              e.type.render
            ));
        }
        for (; e; )
          if (typeof e.tag == "number") {
            var a = e;
            e = a._debugOwner;
            var i = a._debugStack;
            e && i && (typeof i != "string" && (a._debugStack = i = Cl(i)), i !== "" && (t += `
` + i));
          } else if (e.debugStack != null) {
            var o = e.debugStack;
            (e = e.owner) && o && (t += `
` + Cl(o));
          } else break;
        var f = t;
      } catch (d) {
        f = `
Error generating stack: ` + d.message + `
` + d.stack;
      }
      return f;
    }
    function ae(e, t, a, i, o, f, d) {
      var h = ma;
      af(e);
      try {
        return e !== null && e._debugTask ? e._debugTask.run(
          t.bind(null, a, i, o, f, d)
        ) : t(a, i, o, f, d);
      } finally {
        af(h);
      }
      throw Error(
        "runWithFiberInDEV should never be called in production. This is a bug in React."
      );
    }
    function af(e) {
      _.getCurrentStack = e === null ? null : dp, ta = !1, ma = e;
    }
    function sl(e) {
      switch (typeof e) {
        case "bigint":
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return je(e), e;
        default:
          return "";
      }
    }
    function Mi(e) {
      var t = e.type;
      return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function nf(e) {
      var t = Mi(e) ? "checked" : "value", a = Object.getOwnPropertyDescriptor(
        e.constructor.prototype,
        t
      );
      je(e[t]);
      var i = "" + e[t];
      if (!e.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
        var o = a.get, f = a.set;
        return Object.defineProperty(e, t, {
          configurable: !0,
          get: function() {
            return o.call(this);
          },
          set: function(d) {
            je(d), i = "" + d, f.call(this, d);
          }
        }), Object.defineProperty(e, t, {
          enumerable: a.enumerable
        }), {
          getValue: function() {
            return i;
          },
          setValue: function(d) {
            je(d), i = "" + d;
          },
          stopTracking: function() {
            e._valueTracker = null, delete e[t];
          }
        };
      }
    }
    function Pn(e) {
      e._valueTracker || (e._valueTracker = nf(e));
    }
    function Jt(e) {
      if (!e) return !1;
      var t = e._valueTracker;
      if (!t) return !0;
      var a = t.getValue(), i = "";
      return e && (i = Mi(e) ? e.checked ? "true" : "false" : e.value), e = i, e !== a ? (t.setValue(e), !0) : !1;
    }
    function uf(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    function ua(e) {
      return e.replace(
        Ov,
        function(t) {
          return "\\" + t.charCodeAt(0).toString(16) + " ";
        }
      );
    }
    function _u(e, t) {
      t.checked === void 0 || t.defaultChecked === void 0 || ry || (console.error(
        "%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components",
        Zs() || "A component",
        t.type
      ), ry = !0), t.value === void 0 || t.defaultValue === void 0 || sy || (console.error(
        "%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components",
        Zs() || "A component",
        t.type
      ), sy = !0);
    }
    function qu(e, t, a, i, o, f, d, h) {
      e.name = "", d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" ? (I(d, "type"), e.type = d) : e.removeAttribute("type"), t != null ? d === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + sl(t)) : e.value !== "" + sl(t) && (e.value = "" + sl(t)) : d !== "submit" && d !== "reset" || e.removeAttribute("value"), t != null ? Ls(e, d, sl(t)) : a != null ? Ls(e, d, sl(a)) : i != null && e.removeAttribute("value"), o == null && f != null && (e.defaultChecked = !!f), o != null && (e.checked = o && typeof o != "function" && typeof o != "symbol"), h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" ? (I(h, "name"), e.name = "" + sl(h)) : e.removeAttribute("name");
    }
    function hp(e, t, a, i, o, f, d, h) {
      if (f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (I(f, "type"), e.type = f), t != null || a != null) {
        if (!(f !== "submit" && f !== "reset" || t != null))
          return;
        a = a != null ? "" + sl(a) : "", t = t != null ? "" + sl(t) : a, h || t === e.value || (e.value = t), e.defaultValue = t;
      }
      i = i ?? o, i = typeof i != "function" && typeof i != "symbol" && !!i, e.checked = h ? e.checked : !!i, e.defaultChecked = !!i, d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (I(d, "name"), e.name = d);
    }
    function Ls(e, t, a) {
      t === "number" && uf(e.ownerDocument) === e || e.defaultValue === "" + a || (e.defaultValue = "" + a);
    }
    function mh(e, t) {
      t.value == null && (typeof t.children == "object" && t.children !== null ? os.Children.forEach(t.children, function(a) {
        a == null || typeof a == "string" || typeof a == "number" || typeof a == "bigint" || hy || (hy = !0, console.error(
          "Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>."
        ));
      }) : t.dangerouslySetInnerHTML == null || Ud || (Ud = !0, console.error(
        "Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected."
      ))), t.selected == null || dy || (console.error(
        "Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."
      ), dy = !0);
    }
    function mp() {
      var e = Zs();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    function eu(e, t, a, i) {
      if (e = e.options, t) {
        t = {};
        for (var o = 0; o < a.length; o++)
          t["$" + a[o]] = !0;
        for (a = 0; a < e.length; a++)
          o = t.hasOwnProperty("$" + e[a].value), e[a].selected !== o && (e[a].selected = o), o && i && (e[a].defaultSelected = !0);
      } else {
        for (a = "" + sl(a), t = null, o = 0; o < e.length; o++) {
          if (e[o].value === a) {
            e[o].selected = !0, i && (e[o].defaultSelected = !0);
            return;
          }
          t !== null || e[o].disabled || (t = e[o]);
        }
        t !== null && (t.selected = !0);
      }
    }
    function cf(e, t) {
      for (e = 0; e < vs.length; e++) {
        var a = vs[e];
        if (t[a] != null) {
          var i = Te(t[a]);
          t.multiple && !i ? console.error(
            "The `%s` prop supplied to <select> must be an array if `multiple` is true.%s",
            a,
            mp()
          ) : !t.multiple && i && console.error(
            "The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s",
            a,
            mp()
          );
        }
      }
      t.value === void 0 || t.defaultValue === void 0 || my || (console.error(
        "Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://react.dev/link/controlled-components"
      ), my = !0);
    }
    function on(e, t) {
      t.value === void 0 || t.defaultValue === void 0 || y0 || (console.error(
        "%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://react.dev/link/controlled-components",
        Zs() || "A component"
      ), y0 = !0), t.children != null && t.value == null && console.error(
        "Use the `defaultValue` or `value` props instead of setting children on <textarea>."
      );
    }
    function Js(e, t, a) {
      if (t != null && (t = "" + sl(t), t !== e.value && (e.value = t), a == null)) {
        e.defaultValue !== t && (e.defaultValue = t);
        return;
      }
      e.defaultValue = a != null ? "" + sl(a) : "";
    }
    function yh(e, t, a, i) {
      if (t == null) {
        if (i != null) {
          if (a != null)
            throw Error(
              "If you supply `defaultValue` on a <textarea>, do not pass children."
            );
          if (Te(i)) {
            if (1 < i.length)
              throw Error("<textarea> can only have at most one child.");
            i = i[0];
          }
          a = i;
        }
        a == null && (a = ""), t = a;
      }
      a = sl(t), e.defaultValue = a, i = e.textContent, i === a && i !== "" && i !== null && (e.value = i);
    }
    function Ui(e, t) {
      return e.serverProps === void 0 && e.serverTail.length === 0 && e.children.length === 1 && 3 < e.distanceFromLeaf && e.distanceFromLeaf > 15 - t ? Ui(e.children[0], t) : e;
    }
    function Hl(e) {
      return "  " + "  ".repeat(e);
    }
    function Bu(e) {
      return "+ " + "  ".repeat(e);
    }
    function Ci(e) {
      return "- " + "  ".repeat(e);
    }
    function ph(e) {
      switch (e.tag) {
        case 26:
        case 27:
        case 5:
          return e.type;
        case 16:
          return "Lazy";
        case 13:
          return "Suspense";
        case 19:
          return "SuspenseList";
        case 0:
        case 15:
          return e = e.type, e.displayName || e.name || null;
        case 11:
          return e = e.type.render, e.displayName || e.name || null;
        case 1:
          return e = e.type, e.displayName || e.name || null;
        default:
          return null;
      }
    }
    function xl(e, t) {
      return p0.test(e) ? (e = JSON.stringify(e), e.length > t - 2 ? 8 > t ? '{"..."}' : "{" + e.slice(0, t - 7) + '..."}' : "{" + e + "}") : e.length > t ? 5 > t ? '{"..."}' : e.slice(0, t - 3) + "..." : e;
    }
    function of(e, t, a) {
      var i = 120 - 2 * a;
      if (t === null)
        return Bu(a) + xl(e, i) + `
`;
      if (typeof t == "string") {
        for (var o = 0; o < t.length && o < e.length && t.charCodeAt(o) === e.charCodeAt(o); o++) ;
        return o > i - 8 && 10 < o && (e = "..." + e.slice(o - 8), t = "..." + t.slice(o - 8)), Bu(a) + xl(e, i) + `
` + Ci(a) + xl(t, i) + `
`;
      }
      return Hl(a) + xl(e, i) + `
`;
    }
    function vh(e) {
      return Object.prototype.toString.call(e).replace(/^\[object (.*)\]$/, function(t, a) {
        return a;
      });
    }
    function Yu(e, t) {
      switch (typeof e) {
        case "string":
          return e = JSON.stringify(e), e.length > t ? 5 > t ? '"..."' : e.slice(0, t - 4) + '..."' : e;
        case "object":
          if (e === null) return "null";
          if (Te(e)) return "[...]";
          if (e.$$typeof === ri)
            return (t = Ne(e.type)) ? "<" + t + ">" : "<...>";
          var a = vh(e);
          if (a === "Object") {
            a = "", t -= 2;
            for (var i in e)
              if (e.hasOwnProperty(i)) {
                var o = JSON.stringify(i);
                if (o !== '"' + i + '"' && (i = o), t -= i.length - 2, o = Yu(
                  e[i],
                  15 > t ? t : 15
                ), t -= o.length, 0 > t) {
                  a += a === "" ? "..." : ", ...";
                  break;
                }
                a += (a === "" ? "" : ",") + i + ":" + o;
              }
            return "{" + a + "}";
          }
          return a;
        case "function":
          return (t = e.displayName || e.name) ? "function " + t : "function";
        default:
          return String(e);
      }
    }
    function Hi(e, t) {
      return typeof e != "string" || p0.test(e) ? "{" + Yu(e, t - 2) + "}" : e.length > t - 2 ? 5 > t ? '"..."' : '"' + e.slice(0, t - 5) + '..."' : '"' + e + '"';
    }
    function Yc(e, t, a) {
      var i = 120 - a.length - e.length, o = [], f;
      for (f in t)
        if (t.hasOwnProperty(f) && f !== "children") {
          var d = Hi(
            t[f],
            120 - a.length - f.length - 1
          );
          i -= f.length + d.length + 2, o.push(f + "=" + d);
        }
      return o.length === 0 ? a + "<" + e + `>
` : 0 < i ? a + "<" + e + " " + o.join(" ") + `>
` : a + "<" + e + `
` + a + "  " + o.join(`
` + a + "  ") + `
` + a + `>
`;
    }
    function sv(e, t, a) {
      var i = "", o = Me({}, t), f;
      for (f in e)
        if (e.hasOwnProperty(f)) {
          delete o[f];
          var d = 120 - 2 * a - f.length - 2, h = Yu(e[f], d);
          t.hasOwnProperty(f) ? (d = Yu(t[f], d), i += Bu(a) + f + ": " + h + `
`, i += Ci(a) + f + ": " + d + `
`) : i += Bu(a) + f + ": " + h + `
`;
        }
      for (var p in o)
        o.hasOwnProperty(p) && (e = Yu(
          o[p],
          120 - 2 * a - p.length - 2
        ), i += Ci(a) + p + ": " + e + `
`);
      return i;
    }
    function xa(e, t, a, i) {
      var o = "", f = /* @__PURE__ */ new Map();
      for (v in a)
        a.hasOwnProperty(v) && f.set(
          v.toLowerCase(),
          v
        );
      if (f.size === 1 && f.has("children"))
        o += Yc(
          e,
          t,
          Hl(i)
        );
      else {
        for (var d in t)
          if (t.hasOwnProperty(d) && d !== "children") {
            var h = 120 - 2 * (i + 1) - d.length - 1, p = f.get(d.toLowerCase());
            if (p !== void 0) {
              f.delete(d.toLowerCase());
              var v = t[d];
              p = a[p];
              var H = Hi(
                v,
                h
              );
              h = Hi(
                p,
                h
              ), typeof v == "object" && v !== null && typeof p == "object" && p !== null && vh(v) === "Object" && vh(p) === "Object" && (2 < Object.keys(v).length || 2 < Object.keys(p).length || -1 < H.indexOf("...") || -1 < h.indexOf("...")) ? o += Hl(i + 1) + d + `={{
` + sv(
                v,
                p,
                i + 2
              ) + Hl(i + 1) + `}}
` : (o += Bu(i + 1) + d + "=" + H + `
`, o += Ci(i + 1) + d + "=" + h + `
`);
            } else
              o += Hl(i + 1) + d + "=" + Hi(t[d], h) + `
`;
          }
        f.forEach(function(B) {
          if (B !== "children") {
            var U = 120 - 2 * (i + 1) - B.length - 1;
            o += Ci(i + 1) + B + "=" + Hi(a[B], U) + `
`;
          }
        }), o = o === "" ? Hl(i) + "<" + e + `>
` : Hl(i) + "<" + e + `
` + o + Hl(i) + `>
`;
      }
      return e = a.children, t = t.children, typeof e == "string" || typeof e == "number" || typeof e == "bigint" ? (f = "", (typeof t == "string" || typeof t == "number" || typeof t == "bigint") && (f = "" + t), o += of(f, "" + e, i + 1)) : (typeof t == "string" || typeof t == "number" || typeof t == "bigint") && (o = e == null ? o + of("" + t, null, i + 1) : o + of("" + t, void 0, i + 1)), o;
    }
    function Ks(e, t) {
      var a = ph(e);
      if (a === null) {
        for (a = "", e = e.child; e; )
          a += Ks(e, t), e = e.sibling;
        return a;
      }
      return Hl(t) + "<" + a + `>
`;
    }
    function ks(e, t) {
      var a = Ui(e, t);
      if (a !== e && (e.children.length !== 1 || e.children[0] !== a))
        return Hl(t) + `...
` + ks(a, t + 1);
      a = "";
      var i = e.fiber._debugInfo;
      if (i)
        for (var o = 0; o < i.length; o++) {
          var f = i[o].name;
          typeof f == "string" && (a += Hl(t) + "<" + f + `>
`, t++);
        }
      if (i = "", o = e.fiber.pendingProps, e.fiber.tag === 6)
        i = of(o, e.serverProps, t), t++;
      else if (f = ph(e.fiber), f !== null)
        if (e.serverProps === void 0) {
          i = t;
          var d = 120 - 2 * i - f.length - 2, h = "";
          for (v in o)
            if (o.hasOwnProperty(v) && v !== "children") {
              var p = Hi(o[v], 15);
              if (d -= v.length + p.length + 2, 0 > d) {
                h += " ...";
                break;
              }
              h += " " + v + "=" + p;
            }
          i = Hl(i) + "<" + f + h + `>
`, t++;
        } else
          e.serverProps === null ? (i = Yc(
            f,
            o,
            Bu(t)
          ), t++) : typeof e.serverProps == "string" ? console.error(
            "Should not have matched a non HostText fiber to a Text node. This is a bug in React."
          ) : (i = xa(
            f,
            o,
            e.serverProps,
            t
          ), t++);
      var v = "";
      for (o = e.fiber.child, f = 0; o && f < e.children.length; )
        d = e.children[f], d.fiber === o ? (v += ks(d, t), f++) : v += Ks(o, t), o = o.sibling;
      for (o && 0 < e.children.length && (v += Hl(t) + `...
`), o = e.serverTail, e.serverProps === null && t--, e = 0; e < o.length; e++)
        f = o[e], v = typeof f == "string" ? v + (Ci(t) + xl(f, 120 - 2 * t) + `
`) : v + Yc(
          f.type,
          f.props,
          Ci(t)
        );
      return a + i + v;
    }
    function ff(e) {
      try {
        return `

` + ks(e, 0);
      } catch {
        return "";
      }
    }
    function Ni(e, t, a) {
      for (var i = t, o = null, f = 0; i; )
        i === e && (f = 0), o = {
          fiber: i,
          children: o !== null ? [o] : [],
          serverProps: i === t ? a : i === e ? null : void 0,
          serverTail: [],
          distanceFromLeaf: f
        }, f++, i = i.return;
      return o !== null ? ff(o).replaceAll(/^[+-]/gm, ">") : "";
    }
    function gh(e, t) {
      var a = Me({}, e || vy), i = { tag: t };
      return Cd.indexOf(t) !== -1 && (a.aTagInScope = null, a.buttonTagInScope = null, a.nobrTagInScope = null), Hd.indexOf(t) !== -1 && (a.pTagInButtonScope = null), yy.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (a.listItemTagAutoclosing = null, a.dlItemTagAutoclosing = null), a.current = i, t === "form" && (a.formTag = i), t === "a" && (a.aTagInScope = i), t === "button" && (a.buttonTagInScope = i), t === "nobr" && (a.nobrTagInScope = i), t === "p" && (a.pTagInButtonScope = i), t === "li" && (a.listItemTagAutoclosing = i), (t === "dd" || t === "dt") && (a.dlItemTagAutoclosing = i), t === "#document" || t === "html" ? a.containerTagInScope = null : a.containerTagInScope || (a.containerTagInScope = i), e !== null || t !== "#document" && t !== "html" && t !== "body" ? a.implicitRootScope === !0 && (a.implicitRootScope = !1) : a.implicitRootScope = !0, a;
    }
    function bh(e, t, a) {
      switch (t) {
        case "select":
          return e === "hr" || e === "option" || e === "optgroup" || e === "script" || e === "template" || e === "#text";
        case "optgroup":
          return e === "option" || e === "#text";
        case "option":
          return e === "#text";
        case "tr":
          return e === "th" || e === "td" || e === "style" || e === "script" || e === "template";
        case "tbody":
        case "thead":
        case "tfoot":
          return e === "tr" || e === "style" || e === "script" || e === "template";
        case "colgroup":
          return e === "col" || e === "template";
        case "table":
          return e === "caption" || e === "colgroup" || e === "tbody" || e === "tfoot" || e === "thead" || e === "style" || e === "script" || e === "template";
        case "head":
          return e === "base" || e === "basefont" || e === "bgsound" || e === "link" || e === "meta" || e === "title" || e === "noscript" || e === "noframes" || e === "style" || e === "script" || e === "template";
        case "html":
          if (a) break;
          return e === "head" || e === "body" || e === "frameset";
        case "frameset":
          return e === "frame";
        case "#document":
          if (!a) return e === "html";
      }
      switch (e) {
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          return t !== "h1" && t !== "h2" && t !== "h3" && t !== "h4" && t !== "h5" && t !== "h6";
        case "rp":
        case "rt":
          return py.indexOf(t) === -1;
        case "caption":
        case "col":
        case "colgroup":
        case "frameset":
        case "frame":
        case "tbody":
        case "td":
        case "tfoot":
        case "th":
        case "thead":
        case "tr":
          return t == null;
        case "head":
          return a || t === null;
        case "html":
          return a && t === "#document" || t === null;
        case "body":
          return a && (t === "#document" || t === "html") || t === null;
      }
      return !0;
    }
    function wc(e, t) {
      switch (e) {
        case "address":
        case "article":
        case "aside":
        case "blockquote":
        case "center":
        case "details":
        case "dialog":
        case "dir":
        case "div":
        case "dl":
        case "fieldset":
        case "figcaption":
        case "figure":
        case "footer":
        case "header":
        case "hgroup":
        case "main":
        case "menu":
        case "nav":
        case "ol":
        case "p":
        case "section":
        case "summary":
        case "ul":
        case "pre":
        case "listing":
        case "table":
        case "hr":
        case "xmp":
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          return t.pTagInButtonScope;
        case "form":
          return t.formTag || t.pTagInButtonScope;
        case "li":
          return t.listItemTagAutoclosing;
        case "dd":
        case "dt":
          return t.dlItemTagAutoclosing;
        case "button":
          return t.buttonTagInScope;
        case "a":
          return t.aTagInScope;
        case "nobr":
          return t.nobrTagInScope;
      }
      return null;
    }
    function yp(e, t) {
      for (; e; ) {
        switch (e.tag) {
          case 5:
          case 26:
          case 27:
            if (e.type === t) return e;
        }
        e = e.return;
      }
      return null;
    }
    function $s(e, t) {
      t = t || vy;
      var a = t.current;
      if (t = (a = bh(
        e,
        a && a.tag,
        t.implicitRootScope
      ) ? null : a) ? null : wc(e, t), t = a || t, !t) return !0;
      var i = t.tag;
      if (t = String(!!a) + "|" + e + "|" + i, qo[t]) return !1;
      qo[t] = !0;
      var o = (t = ma) ? yp(t.return, i) : null, f = t !== null && o !== null ? Ni(o, t, null) : "", d = "<" + e + ">";
      return a ? (a = "", i === "table" && e === "tr" && (a += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), console.error(
        `In HTML, %s cannot be a child of <%s>.%s
This will cause a hydration error.%s`,
        d,
        i,
        a,
        f
      )) : console.error(
        `In HTML, %s cannot be a descendant of <%s>.
This will cause a hydration error.%s`,
        d,
        i,
        f
      ), t && (e = t.return, o === null || e === null || o === e && e._debugOwner === t._debugOwner || ae(o, function() {
        console.error(
          `<%s> cannot contain a nested %s.
See this log for the ancestor stack trace.`,
          i,
          d
        );
      })), !1;
    }
    function sf(e, t, a) {
      if (a || bh("#text", t, !1))
        return !0;
      if (a = "#text|" + t, qo[a]) return !1;
      qo[a] = !0;
      var i = (a = ma) ? yp(a, t) : null;
      return a = a !== null && i !== null ? Ni(
        i,
        a,
        a.tag !== 6 ? { children: null } : null
      ) : "", /\S/.test(e) ? console.error(
        `In HTML, text nodes cannot be a child of <%s>.
This will cause a hydration error.%s`,
        t,
        a
      ) : console.error(
        `In HTML, whitespace text nodes cannot be a child of <%s>. Make sure you don't have any extra whitespace between tags on each line of your source code.
This will cause a hydration error.%s`,
        t,
        a
      ), !1;
    }
    function ji(e, t) {
      if (t) {
        var a = e.firstChild;
        if (a && a === e.lastChild && a.nodeType === 3) {
          a.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }
    function rv(e) {
      return e.replace(gi, function(t, a) {
        return a.toUpperCase();
      });
    }
    function pp(e, t, a) {
      var i = t.indexOf("--") === 0;
      i || (-1 < t.indexOf("-") ? bc.hasOwnProperty(t) && bc[t] || (bc[t] = !0, console.error(
        "Unsupported style property %s. Did you mean %s?",
        t,
        rv(t.replace(bs, "ms-"))
      )) : gs.test(t) ? bc.hasOwnProperty(t) && bc[t] || (bc[t] = !0, console.error(
        "Unsupported vendor-prefixed style property %s. Did you mean %s?",
        t,
        t.charAt(0).toUpperCase() + t.slice(1)
      )) : !v0.test(a) || Sc.hasOwnProperty(a) && Sc[a] || (Sc[a] = !0, console.error(
        `Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`,
        t,
        a.replace(v0, "")
      )), typeof a == "number" && (isNaN(a) ? g0 || (g0 = !0, console.error(
        "`NaN` is an invalid value for the `%s` css style property.",
        t
      )) : isFinite(a) || gy || (gy = !0, console.error(
        "`Infinity` is an invalid value for the `%s` css style property.",
        t
      )))), a == null || typeof a == "boolean" || a === "" ? i ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : i ? e.setProperty(t, a) : typeof a != "number" || a === 0 || Ss.has(t) ? t === "float" ? e.cssFloat = a : (me(a, t), e[t] = ("" + a).trim()) : e[t] = a + "px";
    }
    function rf(e, t, a) {
      if (t != null && typeof t != "object")
        throw Error(
          "The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX."
        );
      if (t && Object.freeze(t), e = e.style, a != null) {
        if (t) {
          var i = {};
          if (a) {
            for (var o in a)
              if (a.hasOwnProperty(o) && !t.hasOwnProperty(o))
                for (var f = Yn[o] || [o], d = 0; d < f.length; d++)
                  i[f[d]] = o;
          }
          for (var h in t)
            if (t.hasOwnProperty(h) && (!a || a[h] !== t[h]))
              for (o = Yn[h] || [h], f = 0; f < o.length; f++)
                i[o[f]] = h;
          h = {};
          for (var p in t)
            for (o = Yn[p] || [p], f = 0; f < o.length; f++)
              h[o[f]] = p;
          p = {};
          for (var v in i)
            if (o = i[v], (f = h[v]) && o !== f && (d = o + "," + f, !p[d])) {
              p[d] = !0, d = console;
              var H = t[o];
              d.error.call(
                d,
                "%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.",
                H == null || typeof H == "boolean" || H === "" ? "Removing" : "Updating",
                o,
                f
              );
            }
        }
        for (var B in a)
          !a.hasOwnProperty(B) || t != null && t.hasOwnProperty(B) || (B.indexOf("--") === 0 ? e.setProperty(B, "") : B === "float" ? e.cssFloat = "" : e[B] = "");
        for (var U in t)
          v = t[U], t.hasOwnProperty(U) && a[U] !== v && pp(e, U, v);
      } else
        for (i in t)
          t.hasOwnProperty(i) && pp(e, i, t[i]);
    }
    function _i(e) {
      if (e.indexOf("-") === -1) return !1;
      switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    function Ws(e) {
      return Nd.get(e) || e;
    }
    function Gc(e, t) {
      if (Tu.call(wn, t) && wn[t])
        return !0;
      if (jd.test(t)) {
        if (e = "aria-" + t.slice(4).toLowerCase(), e = by.hasOwnProperty(e) ? e : null, e == null)
          return console.error(
            "Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.",
            t
          ), wn[t] = !0;
        if (t !== e)
          return console.error(
            "Invalid ARIA attribute `%s`. Did you mean `%s`?",
            t,
            e
          ), wn[t] = !0;
      }
      if (Sy.test(t)) {
        if (e = t.toLowerCase(), e = by.hasOwnProperty(e) ? e : null, e == null) return wn[t] = !0, !1;
        t !== e && (console.error(
          "Unknown ARIA attribute `%s`. Did you mean `%s`?",
          t,
          e
        ), wn[t] = !0);
      }
      return !0;
    }
    function Vc(e, t) {
      var a = [], i;
      for (i in t)
        Gc(e, i) || a.push(i);
      t = a.map(function(o) {
        return "`" + o + "`";
      }).join(", "), a.length === 1 ? console.error(
        "Invalid aria prop %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props",
        t,
        e
      ) : 1 < a.length && console.error(
        "Invalid aria props %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props",
        t,
        e
      );
    }
    function vp(e, t, a, i) {
      if (Tu.call(Bl, t) && Bl[t])
        return !0;
      var o = t.toLowerCase();
      if (o === "onfocusin" || o === "onfocusout")
        return console.error(
          "React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."
        ), Bl[t] = !0;
      if (typeof a == "function" && (e === "form" && t === "action" || e === "input" && t === "formAction" || e === "button" && t === "formAction"))
        return !0;
      if (i != null) {
        if (e = i.possibleRegistrationNames, i.registrationNameDependencies.hasOwnProperty(t))
          return !0;
        if (i = e.hasOwnProperty(o) ? e[o] : null, i != null)
          return console.error(
            "Invalid event handler property `%s`. Did you mean `%s`?",
            t,
            i
          ), Bl[t] = !0;
        if (xs.test(t))
          return console.error(
            "Unknown event handler property `%s`. It will be ignored.",
            t
          ), Bl[t] = !0;
      } else if (xs.test(t))
        return l.test(t) && console.error(
          "Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.",
          t
        ), Bl[t] = !0;
      if (n.test(t) || u.test(t)) return !0;
      if (o === "innerhtml")
        return console.error(
          "Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."
        ), Bl[t] = !0;
      if (o === "aria")
        return console.error(
          "The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."
        ), Bl[t] = !0;
      if (o === "is" && a !== null && a !== void 0 && typeof a != "string")
        return console.error(
          "Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.",
          typeof a
        ), Bl[t] = !0;
      if (typeof a == "number" && isNaN(a))
        return console.error(
          "Received NaN for the `%s` attribute. If this is expected, cast the value to a string.",
          t
        ), Bl[t] = !0;
      if (Tc.hasOwnProperty(o)) {
        if (o = Tc[o], o !== t)
          return console.error(
            "Invalid DOM property `%s`. Did you mean `%s`?",
            t,
            o
          ), Bl[t] = !0;
      } else if (t !== o)
        return console.error(
          "React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.",
          t,
          o
        ), Bl[t] = !0;
      switch (t) {
        case "dangerouslySetInnerHTML":
        case "children":
        case "style":
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "ref":
          return !0;
        case "innerText":
        case "textContent":
          return !0;
      }
      switch (typeof a) {
        case "boolean":
          switch (t) {
            case "autoFocus":
            case "checked":
            case "multiple":
            case "muted":
            case "selected":
            case "contentEditable":
            case "spellCheck":
            case "draggable":
            case "value":
            case "autoReverse":
            case "externalResourcesRequired":
            case "focusable":
            case "preserveAlpha":
            case "allowFullScreen":
            case "async":
            case "autoPlay":
            case "controls":
            case "default":
            case "defer":
            case "disabled":
            case "disablePictureInPicture":
            case "disableRemotePlayback":
            case "formNoValidate":
            case "hidden":
            case "loop":
            case "noModule":
            case "noValidate":
            case "open":
            case "playsInline":
            case "readOnly":
            case "required":
            case "reversed":
            case "scoped":
            case "seamless":
            case "itemScope":
            case "capture":
            case "download":
            case "inert":
              return !0;
            default:
              return o = t.toLowerCase().slice(0, 5), o === "data-" || o === "aria-" ? !0 : (a ? console.error(
                'Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.',
                a,
                t,
                t,
                a,
                t
              ) : console.error(
                'Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.',
                a,
                t,
                t,
                a,
                t,
                t,
                t
              ), Bl[t] = !0);
          }
        case "function":
        case "symbol":
          return Bl[t] = !0, !1;
        case "string":
          if (a === "false" || a === "true") {
            switch (t) {
              case "checked":
              case "selected":
              case "multiple":
              case "muted":
              case "allowFullScreen":
              case "async":
              case "autoPlay":
              case "controls":
              case "default":
              case "defer":
              case "disabled":
              case "disablePictureInPicture":
              case "disableRemotePlayback":
              case "formNoValidate":
              case "hidden":
              case "loop":
              case "noModule":
              case "noValidate":
              case "open":
              case "playsInline":
              case "readOnly":
              case "required":
              case "reversed":
              case "scoped":
              case "seamless":
              case "itemScope":
              case "inert":
                break;
              default:
                return !0;
            }
            console.error(
              "Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?",
              a,
              t,
              a === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".',
              t,
              a
            ), Bl[t] = !0;
          }
      }
      return !0;
    }
    function Sh(e, t, a) {
      var i = [], o;
      for (o in t)
        vp(e, o, t[o], a) || i.push(o);
      t = i.map(function(f) {
        return "`" + f + "`";
      }).join(", "), i.length === 1 ? console.error(
        "Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://react.dev/link/attribute-behavior ",
        t,
        e
      ) : 1 < i.length && console.error(
        "Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://react.dev/link/attribute-behavior ",
        t,
        e
      );
    }
    function Xc(e) {
      return c.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
    }
    function qi(e) {
      return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
    }
    function fn(e) {
      var t = na(e);
      if (t && (e = t.stateNode)) {
        var a = e[ea] || null;
        e: switch (e = t.stateNode, t.type) {
          case "input":
            if (qu(
              e,
              a.value,
              a.defaultValue,
              a.defaultValue,
              a.checked,
              a.defaultChecked,
              a.type,
              a.name
            ), t = a.name, a.type === "radio" && t != null) {
              for (a = e; a.parentNode; ) a = a.parentNode;
              for (I(t, "name"), a = a.querySelectorAll(
                'input[name="' + ua(
                  "" + t
                ) + '"][type="radio"]'
              ), t = 0; t < a.length; t++) {
                var i = a[t];
                if (i !== e && i.form === e.form) {
                  var o = i[ea] || null;
                  if (!o)
                    throw Error(
                      "ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported."
                    );
                  qu(
                    i,
                    o.value,
                    o.defaultValue,
                    o.defaultValue,
                    o.checked,
                    o.defaultChecked,
                    o.type,
                    o.name
                  );
                }
              }
              for (t = 0; t < a.length; t++)
                i = a[t], i.form === e.form && Jt(i);
            }
            break e;
          case "textarea":
            Js(e, a.value, a.defaultValue);
            break e;
          case "select":
            t = a.value, t != null && eu(e, !!a.multiple, t, !1);
        }
      }
    }
    function Fs(e, t, a) {
      if (y) return e(t, a);
      y = !0;
      try {
        var i = e(t);
        return i;
      } finally {
        if (y = !1, (r !== null || m !== null) && (cc(), r && (t = r, e = m, m = r = null, fn(t), e)))
          for (t = 0; t < e.length; t++) fn(e[t]);
      }
    }
    function tu(e, t) {
      var a = e.stateNode;
      if (a === null) return null;
      var i = a[ea] || null;
      if (i === null) return null;
      a = i[t];
      e: switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          (i = !i.disabled) || (e = e.type, i = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !i;
          break e;
        default:
          e = !1;
      }
      if (e) return null;
      if (a && typeof a != "function")
        throw Error(
          "Expected `" + t + "` listener to be a function, instead got a value of `" + typeof a + "` type."
        );
      return a;
    }
    function lu() {
      if (N) return N;
      var e, t = C, a = t.length, i, o = "value" in X ? X.value : X.textContent, f = o.length;
      for (e = 0; e < a && t[e] === o[e]; e++) ;
      var d = a - e;
      for (i = 1; i <= d && t[a - i] === o[f - i]; i++) ;
      return N = o.slice(e, 1 < i ? 1 - i : void 0);
    }
    function Qc(e) {
      var t = e.keyCode;
      return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
    }
    function Bi() {
      return !0;
    }
    function Th() {
      return !1;
    }
    function rl(e) {
      function t(a, i, o, f, d) {
        this._reactName = a, this._targetInst = o, this.type = i, this.nativeEvent = f, this.target = d, this.currentTarget = null;
        for (var h in e)
          e.hasOwnProperty(h) && (a = e[h], this[h] = a ? a(f) : f[h]);
        return this.isDefaultPrevented = (f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === !1) ? Bi : Th, this.isPropagationStopped = Th, this;
      }
      return Me(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = Bi);
        },
        stopPropagation: function() {
          var a = this.nativeEvent;
          a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = Bi);
        },
        persist: function() {
        },
        isPersistent: Bi
      }), t;
    }
    function Is(e) {
      var t = this.nativeEvent;
      return t.getModifierState ? t.getModifierState(e) : (e = P1[e]) ? !!t[e] : !1;
    }
    function Ps() {
      return Is;
    }
    function Nl(e, t) {
      switch (e) {
        case "keyup":
          return rS.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== Hg;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function wu(e) {
      return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
    }
    function er(e, t) {
      switch (e) {
        case "compositionend":
          return wu(t);
        case "keypress":
          return t.which !== jg ? null : (qg = !0, _g);
        case "textInput":
          return e = t.data, e === _g && qg ? null : e;
        default:
          return null;
      }
    }
    function df(e, t) {
      if (_d)
        return e === "compositionend" || !Uv && Nl(e, t) ? (e = lu(), N = C = X = null, _d = !1, e) : null;
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
            if (t.char && 1 < t.char.length)
              return t.char;
            if (t.which)
              return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return Ng && t.locale !== "ko" ? null : t.data;
        default:
          return null;
      }
    }
    function gp(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!hS[e.type] : t === "textarea";
    }
    function xh(e) {
      if (!b) return !1;
      e = "on" + e;
      var t = e in document;
      return t || (t = document.createElement("div"), t.setAttribute(e, "return;"), t = typeof t[e] == "function"), t;
    }
    function tr(e, t, a, i) {
      r ? m ? m.push(i) : m = [i] : r = i, t = Pf(t, "onChange"), 0 < t.length && (a = new he(
        "onChange",
        "change",
        null,
        a,
        i
      ), e.push({ event: a, listeners: t }));
    }
    function hf(e) {
      Un(e, 0);
    }
    function Yi(e) {
      var t = Hu(e);
      if (Jt(t)) return e;
    }
    function Eh(e, t) {
      if (e === "change") return t;
    }
    function bp() {
      Ey && (Ey.detachEvent("onpropertychange", Sp), Ay = Ey = null);
    }
    function Sp(e) {
      if (e.propertyName === "value" && Yi(Ay)) {
        var t = [];
        tr(
          t,
          Ay,
          e,
          qi(e)
        ), Fs(hf, t);
      }
    }
    function dv(e, t, a) {
      e === "focusin" ? (bp(), Ey = t, Ay = a, Ey.attachEvent("onpropertychange", Sp)) : e === "focusout" && bp();
    }
    function Ah(e) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return Yi(Ay);
    }
    function hv(e, t) {
      if (e === "click") return Yi(t);
    }
    function mv(e, t) {
      if (e === "input" || e === "change")
        return Yi(t);
    }
    function yv(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    function mf(e, t) {
      if (ya(e, t)) return !0;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
      var a = Object.keys(e), i = Object.keys(t);
      if (a.length !== i.length) return !1;
      for (i = 0; i < a.length; i++) {
        var o = a[i];
        if (!Tu.call(t, o) || !ya(e[o], t[o]))
          return !1;
      }
      return !0;
    }
    function Tp(e) {
      for (; e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function Rh(e, t) {
      var a = Tp(e);
      e = 0;
      for (var i; a; ) {
        if (a.nodeType === 3) {
          if (i = e + a.textContent.length, e <= t && i >= t)
            return { node: a, offset: t - e };
          e = i;
        }
        e: {
          for (; a; ) {
            if (a.nextSibling) {
              a = a.nextSibling;
              break e;
            }
            a = a.parentNode;
          }
          a = void 0;
        }
        a = Tp(a);
      }
    }
    function xp(e, t) {
      return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? xp(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
    }
    function Ep(e) {
      e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
      for (var t = uf(e.document); t instanceof e.HTMLIFrameElement; ) {
        try {
          var a = typeof t.contentWindow.location.href == "string";
        } catch {
          a = !1;
        }
        if (a) e = t.contentWindow;
        else break;
        t = uf(e.document);
      }
      return t;
    }
    function zh(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function Ap(e, t, a) {
      var i = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
      Hv || qd == null || qd !== uf(i) || (i = qd, "selectionStart" in i && zh(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = {
        anchorNode: i.anchorNode,
        anchorOffset: i.anchorOffset,
        focusNode: i.focusNode,
        focusOffset: i.focusOffset
      }), Ry && mf(Ry, i) || (Ry = i, i = Pf(Cv, "onSelect"), 0 < i.length && (t = new he(
        "onSelect",
        "select",
        null,
        t,
        a
      ), e.push({ event: t, listeners: i }), t.target = qd)));
    }
    function au(e, t) {
      var a = {};
      return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
    }
    function wi(e) {
      if (Nv[e]) return Nv[e];
      if (!Bd[e]) return e;
      var t = Bd[e], a;
      for (a in t)
        if (t.hasOwnProperty(a) && a in Yg)
          return Nv[e] = t[a];
      return e;
    }
    function Xa(e, t) {
      Qg.set(e, t), Nu(t, [e]);
    }
    function ia(e, t) {
      if (typeof e == "object" && e !== null) {
        var a = _v.get(e);
        return a !== void 0 ? a : (t = {
          value: e,
          source: t,
          stack: Qs(t)
        }, _v.set(e, t), t);
      }
      return {
        value: e,
        source: t,
        stack: Qs(t)
      };
    }
    function yf() {
      for (var e = Yd, t = qv = Yd = 0; t < e; ) {
        var a = Gn[t];
        Gn[t++] = null;
        var i = Gn[t];
        Gn[t++] = null;
        var o = Gn[t];
        Gn[t++] = null;
        var f = Gn[t];
        if (Gn[t++] = null, i !== null && o !== null) {
          var d = i.pending;
          d === null ? o.next = o : (o.next = d.next, d.next = o), i.pending = o;
        }
        f !== 0 && Rp(a, o, f);
      }
    }
    function lr(e, t, a, i) {
      Gn[Yd++] = e, Gn[Yd++] = t, Gn[Yd++] = a, Gn[Yd++] = i, qv |= i, e.lanes |= i, e = e.alternate, e !== null && (e.lanes |= i);
    }
    function Dh(e, t, a, i) {
      return lr(e, t, a, i), ar(e);
    }
    function Xl(e, t) {
      return lr(e, null, null, t), ar(e);
    }
    function Rp(e, t, a) {
      e.lanes |= a;
      var i = e.alternate;
      i !== null && (i.lanes |= a);
      for (var o = !1, f = e.return; f !== null; )
        f.childLanes |= a, i = f.alternate, i !== null && (i.childLanes |= a), f.tag === 22 && (e = f.stateNode, e === null || e._visibility & b0 || (o = !0)), e = f, f = f.return;
      return e.tag === 3 ? (f = e.stateNode, o && t !== null && (o = 31 - zl(a), e = f.hiddenUpdates, i = e[o], i === null ? e[o] = [t] : i.push(t), t.lane = a | 536870912), f) : null;
    }
    function ar(e) {
      if (Ky > qS)
        throw _s = Ky = 0, ky = dg = null, Error(
          "Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops."
        );
      _s > BS && (_s = 0, ky = null, console.error(
        "Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."
      )), e.alternate === null && (e.flags & 4098) !== 0 && en(e);
      for (var t = e, a = t.return; a !== null; )
        t.alternate === null && (t.flags & 4098) !== 0 && en(e), t = a, a = t.return;
      return t.tag === 3 ? t.stateNode : null;
    }
    function Gi(e) {
      if (Vn === null) return e;
      var t = Vn(e);
      return t === void 0 ? e : t.current;
    }
    function Oh(e) {
      if (Vn === null) return e;
      var t = Vn(e);
      return t === void 0 ? e != null && typeof e.render == "function" && (t = Gi(e.render), e.render !== t) ? (t = { $$typeof: bu, render: t }, e.displayName !== void 0 && (t.displayName = e.displayName), t) : e : t.current;
    }
    function zp(e, t) {
      if (Vn === null) return !1;
      var a = e.elementType;
      t = t.type;
      var i = !1, o = typeof t == "object" && t !== null ? t.$$typeof : null;
      switch (e.tag) {
        case 1:
          typeof t == "function" && (i = !0);
          break;
        case 0:
          (typeof t == "function" || o === ha) && (i = !0);
          break;
        case 11:
          (o === bu || o === ha) && (i = !0);
          break;
        case 14:
        case 15:
          (o === ss || o === ha) && (i = !0);
          break;
        default:
          return !1;
      }
      return !!(i && (e = Vn(a), e !== void 0 && e === Vn(t)));
    }
    function Dp(e) {
      Vn !== null && typeof WeakSet == "function" && (wd === null && (wd = /* @__PURE__ */ new WeakSet()), wd.add(e));
    }
    function pf(e, t, a) {
      var i = e.alternate, o = e.child, f = e.sibling, d = e.tag, h = e.type, p = null;
      switch (d) {
        case 0:
        case 15:
        case 1:
          p = h;
          break;
        case 11:
          p = h.render;
      }
      if (Vn === null)
        throw Error("Expected resolveFamily to be set during hot reload.");
      var v = !1;
      h = !1, p !== null && (p = Vn(p), p !== void 0 && (a.has(p) ? h = !0 : t.has(p) && (d === 1 ? h = !0 : v = !0))), wd !== null && (wd.has(e) || i !== null && wd.has(i)) && (h = !0), h && (e._debugNeedsRemount = !0), (h || v) && (i = Xl(e, 2), i !== null && Ut(i, e, 2)), o === null || h || pf(
        o,
        t,
        a
      ), f !== null && pf(
        f,
        t,
        a
      );
    }
    function vf(e, t, a, i) {
      this.tag = e, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null, this.actualDuration = -0, this.actualStartTime = -1.1, this.treeBaseDuration = this.selfBaseDuration = -0, this._debugTask = this._debugStack = this._debugOwner = this._debugInfo = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, Lg || typeof Object.preventExtensions != "function" || Object.preventExtensions(this);
    }
    function Mh(e) {
      return e = e.prototype, !(!e || !e.isReactComponent);
    }
    function sn(e, t) {
      var a = e.alternate;
      switch (a === null ? (a = ie(
        e.tag,
        t,
        e.key,
        e.mode
      ), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a._debugOwner = e._debugOwner, a._debugStack = e._debugStack, a._debugTask = e._debugTask, a._debugHookTypes = e._debugHookTypes, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null, a.actualDuration = -0, a.actualStartTime = -1.1), a.flags = e.flags & 65011712, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue, t = e.dependencies, a.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext,
        _debugThenableState: t._debugThenableState
      }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.refCleanup = e.refCleanup, a.selfBaseDuration = e.selfBaseDuration, a.treeBaseDuration = e.treeBaseDuration, a._debugInfo = e._debugInfo, a._debugNeedsRemount = e._debugNeedsRemount, a.tag) {
        case 0:
        case 15:
          a.type = Gi(e.type);
          break;
        case 1:
          a.type = Gi(e.type);
          break;
        case 11:
          a.type = Oh(e.type);
      }
      return a;
    }
    function Uh(e, t) {
      e.flags &= 65011714;
      var a = e.alternate;
      return a === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0) : (e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type, t = a.dependencies, e.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext,
        _debugThenableState: t._debugThenableState
      }, e.selfBaseDuration = a.selfBaseDuration, e.treeBaseDuration = a.treeBaseDuration), e;
    }
    function nr(e, t, a, i, o, f) {
      var d = 0, h = e;
      if (typeof e == "function")
        Mh(e) && (d = 1), h = Gi(h);
      else if (typeof e == "string")
        d = z(), d = Eo(e, a, d) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
      else
        e: switch (e) {
          case ay:
            return t = ie(31, a, t, o), t.elementType = ay, t.lanes = f, t;
          case Ae:
            return Gu(
              a.children,
              o,
              f,
              t
            );
          case Ro:
            d = 8, o |= la, o |= zu;
            break;
          case zo:
            return e = a, i = o, typeof e.id != "string" && console.error(
              'Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.',
              typeof e.id
            ), t = ie(12, e, t, i | Yl), t.elementType = zo, t.lanes = f, t.stateNode = { effectDuration: 0, passiveEffectDuration: 0 }, t;
          case Do:
            return t = ie(13, a, t, o), t.elementType = Do, t.lanes = f, t;
          case di:
            return t = ie(19, a, t, o), t.elementType = di, t.lanes = f, t;
          default:
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case ly:
                case _a:
                  d = 10;
                  break e;
                case bd:
                  d = 9;
                  break e;
                case bu:
                  d = 11, h = Oh(h);
                  break e;
                case ss:
                  d = 14;
                  break e;
                case ha:
                  d = 16, h = null;
                  break e;
              }
            h = "", (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (h += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), e === null ? a = "null" : Te(e) ? a = "array" : e !== void 0 && e.$$typeof === ri ? (a = "<" + (Ne(e.type) || "Unknown") + " />", h = " Did you accidentally export a JSX literal instead of a component?") : a = typeof e, (d = i ? mt(i) : null) && (h += `

Check the render method of \`` + d + "`."), d = 29, a = Error(
              "Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + (a + "." + h)
            ), h = null;
        }
      return t = ie(d, a, t, o), t.elementType = e, t.type = h, t.lanes = f, t._debugOwner = i, t;
    }
    function gf(e, t, a) {
      return t = nr(
        e.type,
        e.key,
        e.props,
        e._owner,
        t,
        a
      ), t._debugOwner = e._owner, t._debugStack = e._debugStack, t._debugTask = e._debugTask, t;
    }
    function Gu(e, t, a, i) {
      return e = ie(7, e, i, t), e.lanes = a, e;
    }
    function Vu(e, t, a) {
      return e = ie(6, e, null, t), e.lanes = a, e;
    }
    function Ch(e, t, a) {
      return t = ie(
        4,
        e.children !== null ? e.children : [],
        e.key,
        t
      ), t.lanes = a, t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
      }, t;
    }
    function Vi(e, t) {
      Qa(), Gd[Vd++] = T0, Gd[Vd++] = S0, S0 = e, T0 = t;
    }
    function Op(e, t, a) {
      Qa(), Xn[Qn++] = Ec, Xn[Qn++] = Ac, Xn[Qn++] = Es, Es = e;
      var i = Ec;
      e = Ac;
      var o = 32 - zl(i) - 1;
      i &= ~(1 << o), a += 1;
      var f = 32 - zl(t) + o;
      if (30 < f) {
        var d = o - o % 5;
        f = (i & (1 << d) - 1).toString(32), i >>= d, o -= d, Ec = 1 << 32 - zl(t) + o | a << o | i, Ac = f + e;
      } else
        Ec = 1 << f | a << o | i, Ac = e;
    }
    function ur(e) {
      Qa(), e.return !== null && (Vi(e, 1), Op(e, 1, 0));
    }
    function ir(e) {
      for (; e === S0; )
        S0 = Gd[--Vd], Gd[Vd] = null, T0 = Gd[--Vd], Gd[Vd] = null;
      for (; e === Es; )
        Es = Xn[--Qn], Xn[Qn] = null, Ac = Xn[--Qn], Xn[Qn] = null, Ec = Xn[--Qn], Xn[Qn] = null;
    }
    function Qa() {
      We || console.error(
        "Expected to be hydrating. This is a bug in React. Please file an issue."
      );
    }
    function Za(e, t) {
      if (e.return === null) {
        if (Zn === null)
          Zn = {
            fiber: e,
            children: [],
            serverProps: void 0,
            serverTail: [],
            distanceFromLeaf: t
          };
        else {
          if (Zn.fiber !== e)
            throw Error(
              "Saw multiple hydration diff roots in a pass. This is a bug in React."
            );
          Zn.distanceFromLeaf > t && (Zn.distanceFromLeaf = t);
        }
        return Zn;
      }
      var a = Za(
        e.return,
        t + 1
      ).children;
      return 0 < a.length && a[a.length - 1].fiber === e ? (a = a[a.length - 1], a.distanceFromLeaf > t && (a.distanceFromLeaf = t), a) : (t = {
        fiber: e,
        children: [],
        serverProps: void 0,
        serverTail: [],
        distanceFromLeaf: t
      }, a.push(t), t);
    }
    function Hh(e, t) {
      Rc || (e = Za(e, 0), e.serverProps = null, t !== null && (t = fd(t), e.serverTail.push(t)));
    }
    function rn(e) {
      var t = "", a = Zn;
      throw a !== null && (Zn = null, t = ff(a)), Zc(
        ia(
          Error(
            `Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:

- A server/client branch \`if (typeof window !== 'undefined')\`.
- Variable input such as \`Date.now()\` or \`Math.random()\` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

https://react.dev/link/hydration-mismatch` + t
          ),
          e
        )
      ), Bv;
    }
    function Nh(e) {
      var t = e.stateNode, a = e.type, i = e.memoizedProps;
      switch (t[Dl] = e, t[ea] = i, Cn(a, i), a) {
        case "dialog":
          _e("cancel", t), _e("close", t);
          break;
        case "iframe":
        case "object":
        case "embed":
          _e("load", t);
          break;
        case "video":
        case "audio":
          for (a = 0; a < $y.length; a++)
            _e($y[a], t);
          break;
        case "source":
          _e("error", t);
          break;
        case "img":
        case "image":
        case "link":
          _e("error", t), _e("load", t);
          break;
        case "details":
          _e("toggle", t);
          break;
        case "input":
          ju("input", i), _e("invalid", t), _u(t, i), hp(
            t,
            i.value,
            i.defaultValue,
            i.checked,
            i.defaultChecked,
            i.type,
            i.name,
            !0
          ), Pn(t);
          break;
        case "option":
          mh(t, i);
          break;
        case "select":
          ju("select", i), _e("invalid", t), cf(t, i);
          break;
        case "textarea":
          ju("textarea", i), _e("invalid", t), on(t, i), yh(
            t,
            i.value,
            i.defaultValue,
            i.children
          ), Pn(t);
      }
      a = i.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || t.textContent === "" + a || i.suppressHydrationWarning === !0 || _m(t.textContent, a) ? (i.popover != null && (_e("beforetoggle", t), _e("toggle", t)), i.onScroll != null && _e("scroll", t), i.onScrollEnd != null && _e("scrollend", t), i.onClick != null && (t.onclick = yu), t = !0) : t = !1, t || rn(e);
    }
    function jh(e) {
      for (pa = e.return; pa; )
        switch (pa.tag) {
          case 5:
          case 13:
            Si = !1;
            return;
          case 27:
          case 3:
            Si = !0;
            return;
          default:
            pa = pa.return;
        }
    }
    function Xi(e) {
      if (e !== pa) return !1;
      if (!We)
        return jh(e), We = !0, !1;
      var t = e.tag, a;
      if ((a = t !== 3 && t !== 27) && ((a = t === 5) && (a = e.type, a = !(a !== "form" && a !== "button") || Hn(e.type, e.memoizedProps)), a = !a), a && Xt) {
        for (a = Xt; a; ) {
          var i = Za(e, 0), o = fd(a);
          i.serverTail.push(o), a = o.type === "Suspense" ? Qm(a) : pl(a.nextSibling);
        }
        rn(e);
      }
      if (jh(e), t === 13) {
        if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e)
          throw Error(
            "Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue."
          );
        Xt = Qm(e);
      } else
        t === 27 ? (t = Xt, Nn(e.type) ? (e = Ag, Ag = null, Xt = e) : Xt = t) : Xt = pa ? pl(e.stateNode.nextSibling) : null;
      return !0;
    }
    function Qi() {
      Xt = pa = null, Rc = We = !1;
    }
    function _h() {
      var e = As;
      return e !== null && (ba === null ? ba = e : ba.push.apply(
        ba,
        e
      ), As = null), e;
    }
    function Zc(e) {
      As === null ? As = [e] : As.push(e);
    }
    function qh() {
      var e = Zn;
      if (e !== null) {
        Zn = null;
        for (var t = ff(e); 0 < e.children.length; )
          e = e.children[0];
        ae(e.fiber, function() {
          console.error(
            `A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:

- A server/client branch \`if (typeof window !== 'undefined')\`.
- Variable input such as \`Date.now()\` or \`Math.random()\` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

%s%s`,
            "https://react.dev/link/hydration-mismatch",
            t
          );
        });
      }
    }
    function cr() {
      Xd = x0 = null, Qd = !1;
    }
    function Xu(e, t, a) {
      Se(Yv, t._currentValue, e), t._currentValue = a, Se(wv, t._currentRenderer, e), t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== $g && console.error(
        "Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."
      ), t._currentRenderer = $g;
    }
    function nu(e, t) {
      e._currentValue = Yv.current;
      var a = wv.current;
      Ge(wv, t), e._currentRenderer = a, Ge(Yv, t);
    }
    function Bh(e, t, a) {
      for (; e !== null; ) {
        var i = e.alternate;
        if ((e.childLanes & t) !== t ? (e.childLanes |= t, i !== null && (i.childLanes |= t)) : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t), e === a) break;
        e = e.return;
      }
      e !== a && console.error(
        "Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue."
      );
    }
    function Yh(e, t, a, i) {
      var o = e.child;
      for (o !== null && (o.return = e); o !== null; ) {
        var f = o.dependencies;
        if (f !== null) {
          var d = o.child;
          f = f.firstContext;
          e: for (; f !== null; ) {
            var h = f;
            f = o;
            for (var p = 0; p < t.length; p++)
              if (h.context === t[p]) {
                f.lanes |= a, h = f.alternate, h !== null && (h.lanes |= a), Bh(
                  f.return,
                  a,
                  e
                ), i || (d = null);
                break e;
              }
            f = h.next;
          }
        } else if (o.tag === 18) {
          if (d = o.return, d === null)
            throw Error(
              "We just came from a parent so we must have had a parent. This is a bug in React."
            );
          d.lanes |= a, f = d.alternate, f !== null && (f.lanes |= a), Bh(
            d,
            a,
            e
          ), d = null;
        } else d = o.child;
        if (d !== null) d.return = o;
        else
          for (d = o; d !== null; ) {
            if (d === e) {
              d = null;
              break;
            }
            if (o = d.sibling, o !== null) {
              o.return = d.return, d = o;
              break;
            }
            d = d.return;
          }
        o = d;
      }
    }
    function dl(e, t, a, i) {
      e = null;
      for (var o = t, f = !1; o !== null; ) {
        if (!f) {
          if ((o.flags & 524288) !== 0) f = !0;
          else if ((o.flags & 262144) !== 0) break;
        }
        if (o.tag === 10) {
          var d = o.alternate;
          if (d === null)
            throw Error("Should have a current fiber. This is a bug in React.");
          if (d = d.memoizedProps, d !== null) {
            var h = o.type;
            ya(o.pendingProps.value, d.value) || (e !== null ? e.push(h) : e = [h]);
          }
        } else if (o === Mo.current) {
          if (d = o.alternate, d === null)
            throw Error("Should have a current fiber. This is a bug in React.");
          d.memoizedState.memoizedState !== o.memoizedState.memoizedState && (e !== null ? e.push(Py) : e = [Py]);
        }
        o = o.return;
      }
      e !== null && Yh(
        t,
        e,
        a,
        i
      ), t.flags |= 262144;
    }
    function Qu(e) {
      for (e = e.firstContext; e !== null; ) {
        if (!ya(
          e.context._currentValue,
          e.memoizedValue
        ))
          return !0;
        e = e.next;
      }
      return !1;
    }
    function Zu(e) {
      x0 = e, Xd = null, e = e.dependencies, e !== null && (e.firstContext = null);
    }
    function yt(e) {
      return Qd && console.error(
        "Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."
      ), wh(x0, e);
    }
    function bf(e, t) {
      return x0 === null && Zu(e), wh(e, t);
    }
    function wh(e, t) {
      var a = t._currentValue;
      if (t = { context: t, memoizedValue: a, next: null }, Xd === null) {
        if (e === null)
          throw Error(
            "Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."
          );
        Xd = t, e.dependencies = {
          lanes: 0,
          firstContext: t,
          _debugThenableState: null
        }, e.flags |= 524288;
      } else Xd = Xd.next = t;
      return a;
    }
    function Sf() {
      return {
        controller: new TS(),
        data: /* @__PURE__ */ new Map(),
        refCount: 0
      };
    }
    function Zi(e) {
      e.controller.signal.aborted && console.warn(
        "A cache instance was retained after it was already freed. This likely indicates a bug in React."
      ), e.refCount++;
    }
    function dn(e) {
      e.refCount--, 0 > e.refCount && console.warn(
        "A cache instance was released after it was already freed. This likely indicates a bug in React."
      ), e.refCount === 0 && xS(ES, function() {
        e.controller.abort();
      });
    }
    function La() {
      var e = Rs;
      return Rs = 0, e;
    }
    function Lu(e) {
      var t = Rs;
      return Rs = e, t;
    }
    function Li(e) {
      var t = Rs;
      return Rs += e, t;
    }
    function or(e) {
      Ya = Zd(), 0 > e.actualStartTime && (e.actualStartTime = Ya);
    }
    function uu(e) {
      if (0 <= Ya) {
        var t = Zd() - Ya;
        e.actualDuration += t, e.selfBaseDuration = t, Ya = -1;
      }
    }
    function Ji(e) {
      if (0 <= Ya) {
        var t = Zd() - Ya;
        e.actualDuration += t, Ya = -1;
      }
    }
    function Ea() {
      if (0 <= Ya) {
        var e = Zd() - Ya;
        Ya = -1, Rs += e;
      }
    }
    function Ja() {
      Ya = Zd();
    }
    function hn(e) {
      for (var t = e.child; t; )
        e.actualDuration += t.actualDuration, t = t.sibling;
    }
    function Mp(e, t) {
      if (zy === null) {
        var a = zy = [];
        Gv = 0, zs = Um(), Ld = {
          status: "pending",
          value: void 0,
          then: function(i) {
            a.push(i);
          }
        };
      }
      return Gv++, t.then(Gh, Gh), t;
    }
    function Gh() {
      if (--Gv === 0 && zy !== null) {
        Ld !== null && (Ld.status = "fulfilled");
        var e = zy;
        zy = null, zs = 0, Ld = null;
        for (var t = 0; t < e.length; t++) (0, e[t])();
      }
    }
    function Up(e, t) {
      var a = [], i = {
        status: "pending",
        value: null,
        reason: null,
        then: function(o) {
          a.push(o);
        }
      };
      return e.then(
        function() {
          i.status = "fulfilled", i.value = t;
          for (var o = 0; o < a.length; o++) (0, a[o])(t);
        },
        function(o) {
          for (i.status = "rejected", i.reason = o, o = 0; o < a.length; o++)
            (0, a[o])(void 0);
        }
      ), i;
    }
    function Vh() {
      var e = Ds.current;
      return e !== null ? e : pt.pooledCache;
    }
    function fr(e, t) {
      t === null ? Se(Ds, Ds.current, e) : Se(Ds, t.pool, e);
    }
    function Cp() {
      var e = Vh();
      return e === null ? null : { parent: bl._currentValue, pool: e };
    }
    function Xh() {
      return { didWarnAboutUncachedPromise: !1, thenables: [] };
    }
    function Qh(e) {
      return e = e.status, e === "fulfilled" || e === "rejected";
    }
    function Lc() {
    }
    function Aa(e, t, a) {
      _.actQueue !== null && (_.didUsePromise = !0);
      var i = e.thenables;
      switch (a = i[a], a === void 0 ? i.push(t) : a !== t && (e.didWarnAboutUncachedPromise || (e.didWarnAboutUncachedPromise = !0, console.error(
        "A component was suspended by an uncached promise. Creating promises inside a Client Component or hook is not yet supported, except via a Suspense-compatible library or framework."
      )), t.then(Lc, Lc), t = a), t.status) {
        case "fulfilled":
          return t.value;
        case "rejected":
          throw e = t.reason, ca(e), e;
        default:
          if (typeof t.status == "string")
            t.then(Lc, Lc);
          else {
            if (e = pt, e !== null && 100 < e.shellSuspendCounter)
              throw Error(
                "An unknown Component is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server."
              );
            e = t, e.status = "pending", e.then(
              function(o) {
                if (t.status === "pending") {
                  var f = t;
                  f.status = "fulfilled", f.value = o;
                }
              },
              function(o) {
                if (t.status === "pending") {
                  var f = t;
                  f.status = "rejected", f.reason = o;
                }
              }
            );
          }
          switch (t.status) {
            case "fulfilled":
              return t.value;
            case "rejected":
              throw e = t.reason, ca(e), e;
          }
          throw jy = t, O0 = !0, Ny;
      }
    }
    function Zh() {
      if (jy === null)
        throw Error(
          "Expected a suspended thenable. This is a bug in React. Please file an issue."
        );
      var e = jy;
      return jy = null, O0 = !1, e;
    }
    function ca(e) {
      if (e === Ny || e === D0)
        throw Error(
          "Hooks are not supported inside an async component. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server."
        );
    }
    function Ql(e) {
      e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, lanes: 0, hiddenCallbacks: null },
        callbacks: null
      };
    }
    function Ju(e, t) {
      e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        callbacks: null
      });
    }
    function mn(e) {
      return {
        lane: e,
        tag: eb,
        payload: null,
        callback: null,
        next: null
      };
    }
    function Ka(e, t, a) {
      var i = e.updateQueue;
      if (i === null) return null;
      if (i = i.shared, Qv === i && !ab) {
        var o = ce(e);
        console.error(
          `An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback.

Please update the following component: %s`,
          o
        ), ab = !0;
      }
      return (nt & ga) !== an ? (o = i.pending, o === null ? t.next = t : (t.next = o.next, o.next = t), i.pending = t, t = ar(e), Rp(e, null, a), t) : (lr(e, i, t, a), ar(e));
    }
    function Ku(e, t, a) {
      if (t = t.updateQueue, t !== null && (t = t.shared, (a & 4194048) !== 0)) {
        var i = t.lanes;
        i &= e.pendingLanes, a |= i, t.lanes = a, _c(e, a);
      }
    }
    function Jc(e, t) {
      var a = e.updateQueue, i = e.alternate;
      if (i !== null && (i = i.updateQueue, a === i)) {
        var o = null, f = null;
        if (a = a.firstBaseUpdate, a !== null) {
          do {
            var d = {
              lane: a.lane,
              tag: a.tag,
              payload: a.payload,
              callback: null,
              next: null
            };
            f === null ? o = f = d : f = f.next = d, a = a.next;
          } while (a !== null);
          f === null ? o = f = t : f = f.next = t;
        } else o = f = t;
        a = {
          baseState: i.baseState,
          firstBaseUpdate: o,
          lastBaseUpdate: f,
          shared: i.shared,
          callbacks: i.callbacks
        }, e.updateQueue = a;
        return;
      }
      e = a.lastBaseUpdate, e === null ? a.firstBaseUpdate = t : e.next = t, a.lastBaseUpdate = t;
    }
    function yn() {
      if (Zv) {
        var e = Ld;
        if (e !== null) throw e;
      }
    }
    function Kc(e, t, a, i) {
      Zv = !1;
      var o = e.updateQueue;
      wo = !1, Qv = o.shared;
      var f = o.firstBaseUpdate, d = o.lastBaseUpdate, h = o.shared.pending;
      if (h !== null) {
        o.shared.pending = null;
        var p = h, v = p.next;
        p.next = null, d === null ? f = v : d.next = v, d = p;
        var H = e.alternate;
        H !== null && (H = H.updateQueue, h = H.lastBaseUpdate, h !== d && (h === null ? H.firstBaseUpdate = v : h.next = v, H.lastBaseUpdate = p));
      }
      if (f !== null) {
        var B = o.baseState;
        d = 0, H = v = p = null, h = f;
        do {
          var U = h.lane & -536870913, Y = U !== h.lane;
          if (Y ? (we & U) === U : (i & U) === U) {
            U !== 0 && U === zs && (Zv = !0), H !== null && (H = H.next = {
              lane: 0,
              tag: h.tag,
              payload: h.payload,
              callback: null,
              next: null
            });
            e: {
              U = e;
              var ne = h, ge = t, vt = a;
              switch (ne.tag) {
                case tb:
                  if (ne = ne.payload, typeof ne == "function") {
                    Qd = !0;
                    var Qe = ne.call(
                      vt,
                      B,
                      ge
                    );
                    if (U.mode & la) {
                      Ve(!0);
                      try {
                        ne.call(vt, B, ge);
                      } finally {
                        Ve(!1);
                      }
                    }
                    Qd = !1, B = Qe;
                    break e;
                  }
                  B = ne;
                  break e;
                case Xv:
                  U.flags = U.flags & -65537 | 128;
                case eb:
                  if (Qe = ne.payload, typeof Qe == "function") {
                    if (Qd = !0, ne = Qe.call(
                      vt,
                      B,
                      ge
                    ), U.mode & la) {
                      Ve(!0);
                      try {
                        Qe.call(vt, B, ge);
                      } finally {
                        Ve(!1);
                      }
                    }
                    Qd = !1;
                  } else ne = Qe;
                  if (ne == null) break e;
                  B = Me({}, B, ne);
                  break e;
                case lb:
                  wo = !0;
              }
            }
            U = h.callback, U !== null && (e.flags |= 64, Y && (e.flags |= 8192), Y = o.callbacks, Y === null ? o.callbacks = [U] : Y.push(U));
          } else
            Y = {
              lane: U,
              tag: h.tag,
              payload: h.payload,
              callback: h.callback,
              next: null
            }, H === null ? (v = H = Y, p = B) : H = H.next = Y, d |= U;
          if (h = h.next, h === null) {
            if (h = o.shared.pending, h === null)
              break;
            Y = h, h = Y.next, Y.next = null, o.lastBaseUpdate = Y, o.shared.pending = null;
          }
        } while (!0);
        H === null && (p = B), o.baseState = p, o.firstBaseUpdate = v, o.lastBaseUpdate = H, f === null && (o.shared.lanes = 0), Qo |= d, e.lanes = d, e.memoizedState = B;
      }
      Qv = null;
    }
    function Tf(e, t) {
      if (typeof e != "function")
        throw Error(
          "Invalid argument passed as callback. Expected a function. Instead received: " + e
        );
      e.call(t);
    }
    function kc(e, t) {
      var a = e.shared.hiddenCallbacks;
      if (a !== null)
        for (e.shared.hiddenCallbacks = null, e = 0; e < a.length; e++)
          Tf(a[e], t);
    }
    function Hp(e, t) {
      var a = e.callbacks;
      if (a !== null)
        for (e.callbacks = null, e = 0; e < a.length; e++)
          Tf(a[e], t);
    }
    function Zl(e, t) {
      var a = Ei;
      Se(M0, a, e), Se(Jd, t, e), Ei = a | t.baseLanes;
    }
    function xf(e) {
      Se(M0, Ei, e), Se(
        Jd,
        Jd.current,
        e
      );
    }
    function ka(e) {
      Ei = M0.current, Ge(Jd, e), Ge(M0, e);
    }
    function Ue() {
      var e = q;
      Kn === null ? Kn = [e] : Kn.push(e);
    }
    function J() {
      var e = q;
      if (Kn !== null && (Dc++, Kn[Dc] !== e)) {
        var t = ce(xe);
        if (!nb.has(t) && (nb.add(t), Kn !== null)) {
          for (var a = "", i = 0; i <= Dc; i++) {
            var o = Kn[i], f = i === Dc ? e : o;
            for (o = i + 1 + ". " + o; 30 > o.length; )
              o += " ";
            o += f + `
`, a += o;
          }
          console.error(
            `React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://react.dev/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`,
            t,
            a
          );
        }
      }
    }
    function Ra(e) {
      e == null || Te(e) || console.error(
        "%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.",
        q,
        typeof e
      );
    }
    function $c() {
      var e = ce(xe);
      ib.has(e) || (ib.add(e), console.error(
        "ReactDOM.useFormState has been renamed to React.useActionState. Please update %s to use React.useActionState.",
        e
      ));
    }
    function Et() {
      throw Error(
        `Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`
      );
    }
    function ku(e, t) {
      if (qy) return !1;
      if (t === null)
        return console.error(
          "%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.",
          q
        ), !1;
      e.length !== t.length && console.error(
        `The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`,
        q,
        "[" + t.join(", ") + "]",
        "[" + e.join(", ") + "]"
      );
      for (var a = 0; a < t.length && a < e.length; a++)
        if (!ya(e[a], t[a])) return !1;
      return !0;
    }
    function $u(e, t, a, i, o, f) {
      Go = f, xe = t, Kn = e !== null ? e._debugHookTypes : null, Dc = -1, qy = e !== null && e.type !== t.type, (Object.prototype.toString.call(a) === "[object AsyncFunction]" || Object.prototype.toString.call(a) === "[object AsyncGeneratorFunction]") && (f = ce(xe), Lv.has(f) || (Lv.add(f), console.error(
        "%s is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.",
        f === null ? "An unknown Component" : "<" + f + ">"
      ))), t.memoizedState = null, t.updateQueue = null, t.lanes = 0, _.H = e !== null && e.memoizedState !== null ? Kv : Kn !== null ? cb : Jv, Ms = f = (t.mode & la) !== Tt;
      var d = kv(a, i, o);
      if (Ms = !1, kd && (d = Wc(
        t,
        a,
        i,
        o
      )), f) {
        Ve(!0);
        try {
          d = Wc(
            t,
            a,
            i,
            o
          );
        } finally {
          Ve(!1);
        }
      }
      return Ef(e, t), d;
    }
    function Ef(e, t) {
      t._debugHookTypes = Kn, t.dependencies === null ? zc !== null && (t.dependencies = {
        lanes: 0,
        firstContext: null,
        _debugThenableState: zc
      }) : t.dependencies._debugThenableState = zc, _.H = H0;
      var a = ht !== null && ht.next !== null;
      if (Go = 0, Kn = q = il = ht = xe = null, Dc = -1, e !== null && (e.flags & 65011712) !== (t.flags & 65011712) && console.error(
        "Internal React error: Expected static flag was missing. Please notify the React team."
      ), U0 = !1, _y = 0, zc = null, a)
        throw Error(
          "Rendered fewer hooks than expected. This may be caused by an accidental early return statement."
        );
      e === null || Ol || (e = e.dependencies, e !== null && Qu(e) && (Ol = !0)), O0 ? (O0 = !1, e = !0) : e = !1, e && (t = ce(t) || "Unknown", ub.has(t) || Lv.has(t) || (ub.add(t), console.error(
        "`use` was called from inside a try/catch block. This is not allowed and can lead to unexpected behavior. To handle errors triggered by `use`, wrap your component in a error boundary."
      )));
    }
    function Wc(e, t, a, i) {
      xe = e;
      var o = 0;
      do {
        if (kd && (zc = null), _y = 0, kd = !1, o >= RS)
          throw Error(
            "Too many re-renders. React limits the number of renders to prevent an infinite loop."
          );
        if (o += 1, qy = !1, il = ht = null, e.updateQueue != null) {
          var f = e.updateQueue;
          f.lastEffect = null, f.events = null, f.stores = null, f.memoCache != null && (f.memoCache.index = 0);
        }
        Dc = -1, _.H = ob, f = kv(t, a, i);
      } while (kd);
      return f;
    }
    function za() {
      var e = _.H, t = e.useState()[0];
      return t = typeof t.then == "function" ? Ki(t) : t, e = e.useState()[0], (ht !== null ? ht.memoizedState : null) !== e && (xe.flags |= 1024), t;
    }
    function Ll() {
      var e = C0 !== 0;
      return C0 = 0, e;
    }
    function iu(e, t, a) {
      t.updateQueue = e.updateQueue, t.flags = (t.mode & zu) !== Tt ? t.flags & -402655237 : t.flags & -2053, e.lanes &= ~a;
    }
    function $a(e) {
      if (U0) {
        for (e = e.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        U0 = !1;
      }
      Go = 0, Kn = il = ht = xe = null, Dc = -1, q = null, kd = !1, _y = C0 = 0, zc = null;
    }
    function Ot() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return il === null ? xe.memoizedState = il = e : il = il.next = e, il;
    }
    function Xe() {
      if (ht === null) {
        var e = xe.alternate;
        e = e !== null ? e.memoizedState : null;
      } else e = ht.next;
      var t = il === null ? xe.memoizedState : il.next;
      if (t !== null)
        il = t, ht = e;
      else {
        if (e === null)
          throw xe.alternate === null ? Error(
            "Update hook called on initial render. This is likely a bug in React. Please file an issue."
          ) : Error("Rendered more hooks than during the previous render.");
        ht = e, e = {
          memoizedState: ht.memoizedState,
          baseState: ht.baseState,
          baseQueue: ht.baseQueue,
          queue: ht.queue,
          next: null
        }, il === null ? xe.memoizedState = il = e : il = il.next = e;
      }
      return il;
    }
    function sr() {
      return { lastEffect: null, events: null, stores: null, memoCache: null };
    }
    function Ki(e) {
      var t = _y;
      return _y += 1, zc === null && (zc = Xh()), e = Aa(zc, e, t), t = xe, (il === null ? t.memoizedState : il.next) === null && (t = t.alternate, _.H = t !== null && t.memoizedState !== null ? Kv : Jv), e;
    }
    function pn(e) {
      if (e !== null && typeof e == "object") {
        if (typeof e.then == "function") return Ki(e);
        if (e.$$typeof === _a) return yt(e);
      }
      throw Error("An unsupported type was passed to use(): " + String(e));
    }
    function wt(e) {
      var t = null, a = xe.updateQueue;
      if (a !== null && (t = a.memoCache), t == null) {
        var i = xe.alternate;
        i !== null && (i = i.updateQueue, i !== null && (i = i.memoCache, i != null && (t = {
          data: i.data.map(function(o) {
            return o.slice();
          }),
          index: 0
        })));
      }
      if (t == null && (t = { data: [], index: 0 }), a === null && (a = sr(), xe.updateQueue = a), a.memoCache = t, a = t.data[t.index], a === void 0 || qy)
        for (a = t.data[t.index] = Array(e), i = 0; i < e; i++)
          a[i] = c0;
      else
        a.length !== e && console.error(
          "Expected a constant size argument for each invocation of useMemoCache. The previous cache was allocated with size %s but size %s was requested.",
          a.length,
          e
        );
      return t.index++, a;
    }
    function Ke(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function Le(e, t, a) {
      var i = Ot();
      if (a !== void 0) {
        var o = a(t);
        if (Ms) {
          Ve(!0);
          try {
            a(t);
          } finally {
            Ve(!1);
          }
        }
      } else o = t;
      return i.memoizedState = i.baseState = o, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: o
      }, i.queue = e, e = e.dispatch = Ph.bind(
        null,
        xe,
        e
      ), [i.memoizedState, e];
    }
    function Da(e) {
      var t = Xe();
      return Oa(t, ht, e);
    }
    function Oa(e, t, a) {
      var i = e.queue;
      if (i === null)
        throw Error(
          "Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)"
        );
      i.lastRenderedReducer = a;
      var o = e.baseQueue, f = i.pending;
      if (f !== null) {
        if (o !== null) {
          var d = o.next;
          o.next = f.next, f.next = d;
        }
        t.baseQueue !== o && console.error(
          "Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."
        ), t.baseQueue = o = f, i.pending = null;
      }
      if (f = e.baseState, o === null) e.memoizedState = f;
      else {
        t = o.next;
        var h = d = null, p = null, v = t, H = !1;
        do {
          var B = v.lane & -536870913;
          if (B !== v.lane ? (we & B) === B : (Go & B) === B) {
            var U = v.revertLane;
            if (U === 0)
              p !== null && (p = p.next = {
                lane: 0,
                revertLane: 0,
                action: v.action,
                hasEagerState: v.hasEagerState,
                eagerState: v.eagerState,
                next: null
              }), B === zs && (H = !0);
            else if ((Go & U) === U) {
              v = v.next, U === zs && (H = !0);
              continue;
            } else
              B = {
                lane: 0,
                revertLane: v.revertLane,
                action: v.action,
                hasEagerState: v.hasEagerState,
                eagerState: v.eagerState,
                next: null
              }, p === null ? (h = p = B, d = f) : p = p.next = B, xe.lanes |= U, Qo |= U;
            B = v.action, Ms && a(f, B), f = v.hasEagerState ? v.eagerState : a(f, B);
          } else
            U = {
              lane: B,
              revertLane: v.revertLane,
              action: v.action,
              hasEagerState: v.hasEagerState,
              eagerState: v.eagerState,
              next: null
            }, p === null ? (h = p = U, d = f) : p = p.next = U, xe.lanes |= B, Qo |= B;
          v = v.next;
        } while (v !== null && v !== t);
        if (p === null ? d = f : p.next = h, !ya(f, e.memoizedState) && (Ol = !0, H && (a = Ld, a !== null)))
          throw a;
        e.memoizedState = f, e.baseState = d, e.baseQueue = p, i.lastRenderedState = f;
      }
      return o === null && (i.lanes = 0), [e.memoizedState, i.dispatch];
    }
    function ki(e) {
      var t = Xe(), a = t.queue;
      if (a === null)
        throw Error(
          "Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)"
        );
      a.lastRenderedReducer = e;
      var i = a.dispatch, o = a.pending, f = t.memoizedState;
      if (o !== null) {
        a.pending = null;
        var d = o = o.next;
        do
          f = e(f, d.action), d = d.next;
        while (d !== o);
        ya(f, t.memoizedState) || (Ol = !0), t.memoizedState = f, t.baseQueue === null && (t.baseState = f), a.lastRenderedState = f;
      }
      return [f, i];
    }
    function cu(e, t, a) {
      var i = xe, o = Ot();
      if (We) {
        if (a === void 0)
          throw Error(
            "Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering."
          );
        var f = a();
        Kd || f === a() || (console.error(
          "The result of getServerSnapshot should be cached to avoid an infinite loop"
        ), Kd = !0);
      } else {
        if (f = t(), Kd || (a = t(), ya(f, a) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), Kd = !0)), pt === null)
          throw Error(
            "Expected a work-in-progress root. This is a bug in React. Please file an issue."
          );
        (we & 124) !== 0 || Lh(i, t, f);
      }
      return o.memoizedState = f, a = { value: f, getSnapshot: t }, o.queue = a, hr(
        Ic.bind(null, i, a, e),
        [e]
      ), i.flags |= 2048, gn(
        Jn | Sl,
        Fu(),
        Fc.bind(
          null,
          i,
          a,
          f,
          t
        ),
        null
      ), f;
    }
    function Af(e, t, a) {
      var i = xe, o = Xe(), f = We;
      if (f) {
        if (a === void 0)
          throw Error(
            "Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering."
          );
        a = a();
      } else if (a = t(), !Kd) {
        var d = t();
        ya(a, d) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), Kd = !0);
      }
      (d = !ya(
        (ht || o).memoizedState,
        a
      )) && (o.memoizedState = a, Ol = !0), o = o.queue;
      var h = Ic.bind(null, i, o, e);
      if (kt(2048, Sl, h, [e]), o.getSnapshot !== t || d || il !== null && il.memoizedState.tag & Jn) {
        if (i.flags |= 2048, gn(
          Jn | Sl,
          Fu(),
          Fc.bind(
            null,
            i,
            o,
            a,
            t
          ),
          null
        ), pt === null)
          throw Error(
            "Expected a work-in-progress root. This is a bug in React. Please file an issue."
          );
        f || (Go & 124) !== 0 || Lh(i, t, a);
      }
      return a;
    }
    function Lh(e, t, a) {
      e.flags |= 16384, e = { getSnapshot: t, value: a }, t = xe.updateQueue, t === null ? (t = sr(), xe.updateQueue = t, t.stores = [e]) : (a = t.stores, a === null ? t.stores = [e] : a.push(e));
    }
    function Fc(e, t, a, i) {
      t.value = a, t.getSnapshot = i, Jh(t) && Pc(e);
    }
    function Ic(e, t, a) {
      return a(function() {
        Jh(t) && Pc(e);
      });
    }
    function Jh(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var a = t();
        return !ya(e, a);
      } catch {
        return !0;
      }
    }
    function Pc(e) {
      var t = Xl(e, 2);
      t !== null && Ut(t, e, 2);
    }
    function Rf(e) {
      var t = Ot();
      if (typeof e == "function") {
        var a = e;
        if (e = a(), Ms) {
          Ve(!0);
          try {
            a();
          } finally {
            Ve(!1);
          }
        }
      }
      return t.memoizedState = t.baseState = e, t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ke,
        lastRenderedState: e
      }, t;
    }
    function ou(e) {
      e = Rf(e);
      var t = e.queue, a = ao.bind(null, xe, t);
      return t.dispatch = a, [e.memoizedState, a];
    }
    function Wa(e) {
      var t = Ot();
      t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = a, t = xr.bind(
        null,
        xe,
        !0,
        a
      ), a.dispatch = t, [e, t];
    }
    function fu(e, t) {
      var a = Xe();
      return vn(a, ht, e, t);
    }
    function vn(e, t, a, i) {
      return e.baseState = a, Oa(
        e,
        ht,
        typeof i == "function" ? i : Ke
      );
    }
    function rr(e, t) {
      var a = Xe();
      return ht !== null ? vn(a, ht, e, t) : (a.baseState = e, [e, a.queue.dispatch]);
    }
    function Kh(e, t, a, i, o) {
      if (Hf(e))
        throw Error("Cannot update form state while rendering.");
      if (e = t.action, e !== null) {
        var f = {
          payload: o,
          action: e,
          next: null,
          isTransition: !0,
          status: "pending",
          value: null,
          reason: null,
          listeners: [],
          then: function(d) {
            f.listeners.push(d);
          }
        };
        _.T !== null ? a(!0) : f.isTransition = !1, i(f), a = t.pending, a === null ? (f.next = t.pending = f, eo(t, f)) : (f.next = a.next, t.pending = a.next = f);
      }
    }
    function eo(e, t) {
      var a = t.action, i = t.payload, o = e.state;
      if (t.isTransition) {
        var f = _.T, d = {};
        _.T = d, _.T._updatedFibers = /* @__PURE__ */ new Set();
        try {
          var h = a(o, i), p = _.S;
          p !== null && p(d, h), zf(e, t, h);
        } catch (v) {
          tl(e, t, v);
        } finally {
          _.T = f, f === null && d._updatedFibers && (e = d._updatedFibers.size, d._updatedFibers.clear(), 10 < e && console.warn(
            "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
          ));
        }
      } else
        try {
          d = a(o, i), zf(e, t, d);
        } catch (v) {
          tl(e, t, v);
        }
    }
    function zf(e, t, a) {
      a !== null && typeof a == "object" && typeof a.then == "function" ? (a.then(
        function(i) {
          Wu(e, t, i);
        },
        function(i) {
          return tl(e, t, i);
        }
      ), t.isTransition || console.error(
        "An async function with useActionState was called outside of a transition. This is likely not what you intended (for example, isPending will not update correctly). Either call the returned function inside startTransition, or pass it to an `action` or `formAction` prop."
      )) : Wu(e, t, a);
    }
    function Wu(e, t, a) {
      t.status = "fulfilled", t.value = a, Df(t), e.state = a, t = e.pending, t !== null && (a = t.next, a === t ? e.pending = null : (a = a.next, t.next = a, eo(e, a)));
    }
    function tl(e, t, a) {
      var i = e.pending;
      if (e.pending = null, i !== null) {
        i = i.next;
        do
          t.status = "rejected", t.reason = a, Df(t), t = t.next;
        while (t !== i);
      }
      e.action = null;
    }
    function Df(e) {
      e = e.listeners;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
    function kh(e, t) {
      return t;
    }
    function to(e, t) {
      if (We) {
        var a = pt.formState;
        if (a !== null) {
          e: {
            var i = xe;
            if (We) {
              if (Xt) {
                t: {
                  for (var o = Xt, f = Si; o.nodeType !== 8; ) {
                    if (!f) {
                      o = null;
                      break t;
                    }
                    if (o = pl(
                      o.nextSibling
                    ), o === null) {
                      o = null;
                      break t;
                    }
                  }
                  f = o.data, o = f === Sg || f === i1 ? o : null;
                }
                if (o) {
                  Xt = pl(
                    o.nextSibling
                  ), i = o.data === Sg;
                  break e;
                }
              }
              rn(i);
            }
            i = !1;
          }
          i && (t = a[0]);
        }
      }
      return a = Ot(), a.memoizedState = a.baseState = t, i = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: kh,
        lastRenderedState: t
      }, a.queue = i, a = ao.bind(
        null,
        xe,
        i
      ), i.dispatch = a, i = Rf(!1), f = xr.bind(
        null,
        xe,
        !1,
        i.queue
      ), i = Ot(), o = {
        state: t,
        dispatch: null,
        action: e,
        pending: null
      }, i.queue = o, a = Kh.bind(
        null,
        xe,
        o,
        f,
        a
      ), o.dispatch = a, i.memoizedState = e, [t, a, !1];
    }
    function dr(e) {
      var t = Xe();
      return Np(t, ht, e);
    }
    function Np(e, t, a) {
      if (t = Oa(
        e,
        t,
        kh
      )[0], e = Da(Ke)[0], typeof t == "object" && t !== null && typeof t.then == "function")
        try {
          var i = Ki(t);
        } catch (d) {
          throw d === Ny ? D0 : d;
        }
      else i = t;
      t = Xe();
      var o = t.queue, f = o.dispatch;
      return a !== t.memoizedState && (xe.flags |= 2048, gn(
        Jn | Sl,
        Fu(),
        Kt.bind(null, o, a),
        null
      )), [i, f, e];
    }
    function Kt(e, t) {
      e.action = t;
    }
    function lo(e) {
      var t = Xe(), a = ht;
      if (a !== null)
        return Np(t, a, e);
      Xe(), t = t.memoizedState, a = Xe();
      var i = a.queue.dispatch;
      return a.memoizedState = e, [t, i, !1];
    }
    function gn(e, t, a, i) {
      return e = {
        tag: e,
        create: a,
        deps: i,
        inst: t,
        next: null
      }, t = xe.updateQueue, t === null && (t = sr(), xe.updateQueue = t), a = t.lastEffect, a === null ? t.lastEffect = e.next = e : (i = a.next, a.next = e, e.next = i, t.lastEffect = e), e;
    }
    function Fu() {
      return { destroy: void 0, resource: void 0 };
    }
    function Of(e) {
      var t = Ot();
      return e = { current: e }, t.memoizedState = e;
    }
    function Ma(e, t, a, i) {
      var o = Ot();
      i = i === void 0 ? null : i, xe.flags |= e, o.memoizedState = gn(
        Jn | t,
        Fu(),
        a,
        i
      );
    }
    function kt(e, t, a, i) {
      var o = Xe();
      i = i === void 0 ? null : i;
      var f = o.memoizedState.inst;
      ht !== null && i !== null && ku(i, ht.memoizedState.deps) ? o.memoizedState = gn(t, f, a, i) : (xe.flags |= e, o.memoizedState = gn(
        Jn | t,
        f,
        a,
        i
      ));
    }
    function hr(e, t) {
      (xe.mode & zu) !== Tt && (xe.mode & Zg) === Tt ? Ma(276826112, Sl, e, t) : Ma(8390656, Sl, e, t);
    }
    function mr(e, t) {
      var a = 4194308;
      return (xe.mode & zu) !== Tt && (a |= 134217728), Ma(a, wl, e, t);
    }
    function jp(e, t) {
      if (typeof t == "function") {
        e = e();
        var a = t(e);
        return function() {
          typeof a == "function" ? a() : t(null);
        };
      }
      if (t != null)
        return t.hasOwnProperty("current") || console.error(
          "Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.",
          "an object with keys {" + Object.keys(t).join(", ") + "}"
        ), e = e(), t.current = e, function() {
          t.current = null;
        };
    }
    function yr(e, t, a) {
      typeof t != "function" && console.error(
        "Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",
        t !== null ? typeof t : "null"
      ), a = a != null ? a.concat([e]) : null;
      var i = 4194308;
      (xe.mode & zu) !== Tt && (i |= 134217728), Ma(
        i,
        wl,
        jp.bind(null, t, e),
        a
      );
    }
    function bn(e, t, a) {
      typeof t != "function" && console.error(
        "Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",
        t !== null ? typeof t : "null"
      ), a = a != null ? a.concat([e]) : null, kt(
        4,
        wl,
        jp.bind(null, t, e),
        a
      );
    }
    function Mf(e, t) {
      return Ot().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    }
    function $i(e, t) {
      var a = Xe();
      t = t === void 0 ? null : t;
      var i = a.memoizedState;
      return t !== null && ku(t, i[1]) ? i[0] : (a.memoizedState = [e, t], e);
    }
    function pr(e, t) {
      var a = Ot();
      t = t === void 0 ? null : t;
      var i = e();
      if (Ms) {
        Ve(!0);
        try {
          e();
        } finally {
          Ve(!1);
        }
      }
      return a.memoizedState = [i, t], i;
    }
    function Iu(e, t) {
      var a = Xe();
      t = t === void 0 ? null : t;
      var i = a.memoizedState;
      if (t !== null && ku(t, i[1]))
        return i[0];
      if (i = e(), Ms) {
        Ve(!0);
        try {
          e();
        } finally {
          Ve(!1);
        }
      }
      return a.memoizedState = [i, t], i;
    }
    function vr(e, t) {
      var a = Ot();
      return br(a, e, t);
    }
    function Uf(e, t) {
      var a = Xe();
      return Cf(
        a,
        ht.memoizedState,
        e,
        t
      );
    }
    function gr(e, t) {
      var a = Xe();
      return ht === null ? br(a, e, t) : Cf(
        a,
        ht.memoizedState,
        e,
        t
      );
    }
    function br(e, t, a) {
      return a === void 0 || (Go & 1073741824) !== 0 ? e.memoizedState = t : (e.memoizedState = a, e = Zp(), xe.lanes |= e, Qo |= e, a);
    }
    function Cf(e, t, a, i) {
      return ya(a, t) ? a : Jd.current !== null ? (e = br(e, a, i), ya(e, t) || (Ol = !0), e) : (Go & 42) === 0 ? (Ol = !0, e.memoizedState = a) : (e = Zp(), xe.lanes |= e, Qo |= e, t);
    }
    function $h(e, t, a, i, o) {
      var f = ve.p;
      ve.p = f !== 0 && f < ln ? f : ln;
      var d = _.T, h = {};
      _.T = h, xr(e, !1, t, a), h._updatedFibers = /* @__PURE__ */ new Set();
      try {
        var p = o(), v = _.S;
        if (v !== null && v(h, p), p !== null && typeof p == "object" && typeof p.then == "function") {
          var H = Up(
            p,
            i
          );
          su(
            e,
            t,
            H,
            $l(e)
          );
        } else
          su(
            e,
            t,
            i,
            $l(e)
          );
      } catch (B) {
        su(
          e,
          t,
          { then: function() {
          }, status: "rejected", reason: B },
          $l(e)
        );
      } finally {
        ve.p = f, _.T = d, d === null && h._updatedFibers && (e = h._updatedFibers.size, h._updatedFibers.clear(), 10 < e && console.warn(
          "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
        ));
      }
    }
    function Wi(e, t, a, i) {
      if (e.tag !== 5)
        throw Error(
          "Expected the form instance to be a HostComponent. This is a bug in React."
        );
      var o = Wh(e).queue;
      $h(
        e,
        o,
        t,
        Gs,
        a === null ? F : function() {
          return Fh(e), a(i);
        }
      );
    }
    function Wh(e) {
      var t = e.memoizedState;
      if (t !== null) return t;
      t = {
        memoizedState: Gs,
        baseState: Gs,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Ke,
          lastRenderedState: Gs
        },
        next: null
      };
      var a = {};
      return t.next = {
        memoizedState: a,
        baseState: a,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Ke,
          lastRenderedState: a
        },
        next: null
      }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
    }
    function Fh(e) {
      _.T === null && console.error(
        "requestFormReset was called outside a transition or action. To fix, move to an action, or wrap with startTransition."
      );
      var t = Wh(e).next.queue;
      su(
        e,
        t,
        {},
        $l(e)
      );
    }
    function Sn() {
      var e = Rf(!1);
      return e = $h.bind(
        null,
        xe,
        e.queue,
        !0,
        !1
      ), Ot().memoizedState = e, [!1, e];
    }
    function Sr() {
      var e = Da(Ke)[0], t = Xe().memoizedState;
      return [
        typeof e == "boolean" ? e : Ki(e),
        t
      ];
    }
    function Tr() {
      var e = ki(Ke)[0], t = Xe().memoizedState;
      return [
        typeof e == "boolean" ? e : Ki(e),
        t
      ];
    }
    function Jl() {
      return yt(Py);
    }
    function Tn() {
      var e = Ot(), t = pt.identifierPrefix;
      if (We) {
        var a = Ac, i = Ec;
        a = (i & ~(1 << 32 - zl(i) - 1)).toString(32) + a, t = "«" + t + "R" + a, a = C0++, 0 < a && (t += "H" + a.toString(32)), t += "»";
      } else
        a = AS++, t = "«" + t + "r" + a.toString(32) + "»";
      return e.memoizedState = t;
    }
    function Fi() {
      return Ot().memoizedState = Ih.bind(
        null,
        xe
      );
    }
    function Ih(e, t) {
      for (var a = e.return; a !== null; ) {
        switch (a.tag) {
          case 24:
          case 3:
            var i = $l(a);
            e = mn(i);
            var o = Ka(a, e, i);
            o !== null && (Ut(o, a, i), Ku(o, a, i)), a = Sf(), t != null && o !== null && console.error(
              "The seed argument is not enabled outside experimental channels."
            ), e.payload = { cache: a };
            return;
        }
        a = a.return;
      }
    }
    function Ph(e, t, a) {
      var i = arguments;
      typeof i[3] == "function" && console.error(
        "State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."
      ), i = $l(e);
      var o = {
        lane: i,
        revertLane: 0,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      Hf(e) ? Ii(t, o) : (o = Dh(e, t, o, i), o !== null && (Ut(o, e, i), Nf(o, t, i))), Ri(e, i);
    }
    function ao(e, t, a) {
      var i = arguments;
      typeof i[3] == "function" && console.error(
        "State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."
      ), i = $l(e), su(e, t, a, i), Ri(e, i);
    }
    function su(e, t, a, i) {
      var o = {
        lane: i,
        revertLane: 0,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (Hf(e)) Ii(t, o);
      else {
        var f = e.alternate;
        if (e.lanes === 0 && (f === null || f.lanes === 0) && (f = t.lastRenderedReducer, f !== null)) {
          var d = _.H;
          _.H = Ou;
          try {
            var h = t.lastRenderedState, p = f(h, a);
            if (o.hasEagerState = !0, o.eagerState = p, ya(p, h))
              return lr(e, t, o, 0), pt === null && yf(), !1;
          } catch {
          } finally {
            _.H = d;
          }
        }
        if (a = Dh(e, t, o, i), a !== null)
          return Ut(a, e, i), Nf(a, t, i), !0;
      }
      return !1;
    }
    function xr(e, t, a, i) {
      if (_.T === null && zs === 0 && console.error(
        "An optimistic state update occurred outside a transition or action. To fix, move the update to an action, or wrap with startTransition."
      ), i = {
        lane: 2,
        revertLane: Um(),
        action: i,
        hasEagerState: !1,
        eagerState: null,
        next: null
      }, Hf(e)) {
        if (t)
          throw Error("Cannot update optimistic state while rendering.");
        console.error("Cannot call startTransition while rendering.");
      } else
        t = Dh(
          e,
          a,
          i,
          2
        ), t !== null && Ut(t, e, 2);
      Ri(e, 2);
    }
    function Hf(e) {
      var t = e.alternate;
      return e === xe || t !== null && t === xe;
    }
    function Ii(e, t) {
      kd = U0 = !0;
      var a = e.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
    }
    function Nf(e, t, a) {
      if ((a & 4194048) !== 0) {
        var i = t.lanes;
        i &= e.pendingLanes, a |= i, t.lanes = a, _c(e, a);
      }
    }
    function ll(e) {
      var t = He;
      return e != null && (He = t === null ? e : t.concat(e)), t;
    }
    function no(e, t, a) {
      for (var i = Object.keys(e.props), o = 0; o < i.length; o++) {
        var f = i[o];
        if (f !== "children" && f !== "key") {
          t === null && (t = gf(e, a.mode, 0), t._debugInfo = He, t.return = a), ae(
            t,
            function(d) {
              console.error(
                "Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",
                d
              );
            },
            f
          );
          break;
        }
      }
    }
    function uo(e) {
      var t = By;
      return By += 1, $d === null && ($d = Xh()), Aa($d, e, t);
    }
    function Ua(e, t) {
      t = t.props.ref, e.ref = t !== void 0 ? t : null;
    }
    function Ee(e, t) {
      throw t.$$typeof === fs ? Error(
        `A React Element from an older version of React was rendered. This is not supported. It can happen if:
- Multiple copies of the "react" package is used.
- A library pre-bundled an old copy of "react" or "react/jsx-runtime".
- A compiler tries to "inline" JSX instead of using the runtime.`
      ) : (e = Object.prototype.toString.call(t), Error(
        "Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead."
      ));
    }
    function Pe(e, t) {
      var a = ce(e) || "Component";
      Eb[a] || (Eb[a] = !0, t = t.displayName || t.name || "Component", e.tag === 3 ? console.error(
        `Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.
  root.render(%s)`,
        t,
        t,
        t
      ) : console.error(
        `Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.
  <%s>{%s}</%s>`,
        t,
        t,
        a,
        t,
        a
      ));
    }
    function At(e, t) {
      var a = ce(e) || "Component";
      Ab[a] || (Ab[a] = !0, t = String(t), e.tag === 3 ? console.error(
        `Symbols are not valid as a React child.
  root.render(%s)`,
        t
      ) : console.error(
        `Symbols are not valid as a React child.
  <%s>%s</%s>`,
        a,
        t,
        a
      ));
    }
    function jf(e) {
      function t(S, T) {
        if (e) {
          var x = S.deletions;
          x === null ? (S.deletions = [T], S.flags |= 16) : x.push(T);
        }
      }
      function a(S, T) {
        if (!e) return null;
        for (; T !== null; )
          t(S, T), T = T.sibling;
        return null;
      }
      function i(S) {
        for (var T = /* @__PURE__ */ new Map(); S !== null; )
          S.key !== null ? T.set(S.key, S) : T.set(S.index, S), S = S.sibling;
        return T;
      }
      function o(S, T) {
        return S = sn(S, T), S.index = 0, S.sibling = null, S;
      }
      function f(S, T, x) {
        return S.index = x, e ? (x = S.alternate, x !== null ? (x = x.index, x < T ? (S.flags |= 67108866, T) : x) : (S.flags |= 67108866, T)) : (S.flags |= 1048576, T);
      }
      function d(S) {
        return e && S.alternate === null && (S.flags |= 67108866), S;
      }
      function h(S, T, x, w) {
        return T === null || T.tag !== 6 ? (T = Vu(
          x,
          S.mode,
          w
        ), T.return = S, T._debugOwner = S, T._debugTask = S._debugTask, T._debugInfo = He, T) : (T = o(T, x), T.return = S, T._debugInfo = He, T);
      }
      function p(S, T, x, w) {
        var ee = x.type;
        return ee === Ae ? (T = H(
          S,
          T,
          x.props.children,
          w,
          x.key
        ), no(x, T, S), T) : T !== null && (T.elementType === ee || zp(T, x) || typeof ee == "object" && ee !== null && ee.$$typeof === ha && Vo(ee) === T.type) ? (T = o(T, x.props), Ua(T, x), T.return = S, T._debugOwner = x._owner, T._debugInfo = He, T) : (T = gf(x, S.mode, w), Ua(T, x), T.return = S, T._debugInfo = He, T);
      }
      function v(S, T, x, w) {
        return T === null || T.tag !== 4 || T.stateNode.containerInfo !== x.containerInfo || T.stateNode.implementation !== x.implementation ? (T = Ch(x, S.mode, w), T.return = S, T._debugInfo = He, T) : (T = o(T, x.children || []), T.return = S, T._debugInfo = He, T);
      }
      function H(S, T, x, w, ee) {
        return T === null || T.tag !== 7 ? (T = Gu(
          x,
          S.mode,
          w,
          ee
        ), T.return = S, T._debugOwner = S, T._debugTask = S._debugTask, T._debugInfo = He, T) : (T = o(T, x), T.return = S, T._debugInfo = He, T);
      }
      function B(S, T, x) {
        if (typeof T == "string" && T !== "" || typeof T == "number" || typeof T == "bigint")
          return T = Vu(
            "" + T,
            S.mode,
            x
          ), T.return = S, T._debugOwner = S, T._debugTask = S._debugTask, T._debugInfo = He, T;
        if (typeof T == "object" && T !== null) {
          switch (T.$$typeof) {
            case ri:
              return x = gf(
                T,
                S.mode,
                x
              ), Ua(x, T), x.return = S, S = ll(T._debugInfo), x._debugInfo = He, He = S, x;
            case vc:
              return T = Ch(
                T,
                S.mode,
                x
              ), T.return = S, T._debugInfo = He, T;
            case ha:
              var w = ll(T._debugInfo);
              return T = Vo(T), S = B(S, T, x), He = w, S;
          }
          if (Te(T) || gt(T))
            return x = Gu(
              T,
              S.mode,
              x,
              null
            ), x.return = S, x._debugOwner = S, x._debugTask = S._debugTask, S = ll(T._debugInfo), x._debugInfo = He, He = S, x;
          if (typeof T.then == "function")
            return w = ll(T._debugInfo), S = B(
              S,
              uo(T),
              x
            ), He = w, S;
          if (T.$$typeof === _a)
            return B(
              S,
              bf(S, T),
              x
            );
          Ee(S, T);
        }
        return typeof T == "function" && Pe(S, T), typeof T == "symbol" && At(S, T), null;
      }
      function U(S, T, x, w) {
        var ee = T !== null ? T.key : null;
        if (typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint")
          return ee !== null ? null : h(S, T, "" + x, w);
        if (typeof x == "object" && x !== null) {
          switch (x.$$typeof) {
            case ri:
              return x.key === ee ? (ee = ll(x._debugInfo), S = p(
                S,
                T,
                x,
                w
              ), He = ee, S) : null;
            case vc:
              return x.key === ee ? v(S, T, x, w) : null;
            case ha:
              return ee = ll(x._debugInfo), x = Vo(x), S = U(
                S,
                T,
                x,
                w
              ), He = ee, S;
          }
          if (Te(x) || gt(x))
            return ee !== null ? null : (ee = ll(x._debugInfo), S = H(
              S,
              T,
              x,
              w,
              null
            ), He = ee, S);
          if (typeof x.then == "function")
            return ee = ll(x._debugInfo), S = U(
              S,
              T,
              uo(x),
              w
            ), He = ee, S;
          if (x.$$typeof === _a)
            return U(
              S,
              T,
              bf(S, x),
              w
            );
          Ee(S, x);
        }
        return typeof x == "function" && Pe(S, x), typeof x == "symbol" && At(S, x), null;
      }
      function Y(S, T, x, w, ee) {
        if (typeof w == "string" && w !== "" || typeof w == "number" || typeof w == "bigint")
          return S = S.get(x) || null, h(T, S, "" + w, ee);
        if (typeof w == "object" && w !== null) {
          switch (w.$$typeof) {
            case ri:
              return x = S.get(
                w.key === null ? x : w.key
              ) || null, S = ll(w._debugInfo), T = p(
                T,
                x,
                w,
                ee
              ), He = S, T;
            case vc:
              return S = S.get(
                w.key === null ? x : w.key
              ) || null, v(T, S, w, ee);
            case ha:
              var Re = ll(w._debugInfo);
              return w = Vo(w), T = Y(
                S,
                T,
                x,
                w,
                ee
              ), He = Re, T;
          }
          if (Te(w) || gt(w))
            return x = S.get(x) || null, S = ll(w._debugInfo), T = H(
              T,
              x,
              w,
              ee,
              null
            ), He = S, T;
          if (typeof w.then == "function")
            return Re = ll(w._debugInfo), T = Y(
              S,
              T,
              x,
              uo(w),
              ee
            ), He = Re, T;
          if (w.$$typeof === _a)
            return Y(
              S,
              T,
              x,
              bf(T, w),
              ee
            );
          Ee(T, w);
        }
        return typeof w == "function" && Pe(T, w), typeof w == "symbol" && At(T, w), null;
      }
      function ne(S, T, x, w) {
        if (typeof x != "object" || x === null) return w;
        switch (x.$$typeof) {
          case ri:
          case vc:
            be(S, T, x);
            var ee = x.key;
            if (typeof ee != "string") break;
            if (w === null) {
              w = /* @__PURE__ */ new Set(), w.add(ee);
              break;
            }
            if (!w.has(ee)) {
              w.add(ee);
              break;
            }
            ae(T, function() {
              console.error(
                "Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.",
                ee
              );
            });
            break;
          case ha:
            x = Vo(x), ne(S, T, x, w);
        }
        return w;
      }
      function ge(S, T, x, w) {
        for (var ee = null, Re = null, ue = null, ze = T, Oe = T = 0, xt = null; ze !== null && Oe < x.length; Oe++) {
          ze.index > Oe ? (xt = ze, ze = null) : xt = ze.sibling;
          var It = U(
            S,
            ze,
            x[Oe],
            w
          );
          if (It === null) {
            ze === null && (ze = xt);
            break;
          }
          ee = ne(
            S,
            It,
            x[Oe],
            ee
          ), e && ze && It.alternate === null && t(S, ze), T = f(It, T, Oe), ue === null ? Re = It : ue.sibling = It, ue = It, ze = xt;
        }
        if (Oe === x.length)
          return a(S, ze), We && Vi(S, Oe), Re;
        if (ze === null) {
          for (; Oe < x.length; Oe++)
            ze = B(S, x[Oe], w), ze !== null && (ee = ne(
              S,
              ze,
              x[Oe],
              ee
            ), T = f(
              ze,
              T,
              Oe
            ), ue === null ? Re = ze : ue.sibling = ze, ue = ze);
          return We && Vi(S, Oe), Re;
        }
        for (ze = i(ze); Oe < x.length; Oe++)
          xt = Y(
            ze,
            S,
            Oe,
            x[Oe],
            w
          ), xt !== null && (ee = ne(
            S,
            xt,
            x[Oe],
            ee
          ), e && xt.alternate !== null && ze.delete(
            xt.key === null ? Oe : xt.key
          ), T = f(
            xt,
            T,
            Oe
          ), ue === null ? Re = xt : ue.sibling = xt, ue = xt);
        return e && ze.forEach(function(Nc) {
          return t(S, Nc);
        }), We && Vi(S, Oe), Re;
      }
      function vt(S, T, x, w) {
        if (x == null)
          throw Error("An iterable object provided no iterator.");
        for (var ee = null, Re = null, ue = T, ze = T = 0, Oe = null, xt = null, It = x.next(); ue !== null && !It.done; ze++, It = x.next()) {
          ue.index > ze ? (Oe = ue, ue = null) : Oe = ue.sibling;
          var Nc = U(S, ue, It.value, w);
          if (Nc === null) {
            ue === null && (ue = Oe);
            break;
          }
          xt = ne(
            S,
            Nc,
            It.value,
            xt
          ), e && ue && Nc.alternate === null && t(S, ue), T = f(Nc, T, ze), Re === null ? ee = Nc : Re.sibling = Nc, Re = Nc, ue = Oe;
        }
        if (It.done)
          return a(S, ue), We && Vi(S, ze), ee;
        if (ue === null) {
          for (; !It.done; ze++, It = x.next())
            ue = B(S, It.value, w), ue !== null && (xt = ne(
              S,
              ue,
              It.value,
              xt
            ), T = f(
              ue,
              T,
              ze
            ), Re === null ? ee = ue : Re.sibling = ue, Re = ue);
          return We && Vi(S, ze), ee;
        }
        for (ue = i(ue); !It.done; ze++, It = x.next())
          Oe = Y(
            ue,
            S,
            ze,
            It.value,
            w
          ), Oe !== null && (xt = ne(
            S,
            Oe,
            It.value,
            xt
          ), e && Oe.alternate !== null && ue.delete(
            Oe.key === null ? ze : Oe.key
          ), T = f(
            Oe,
            T,
            ze
          ), Re === null ? ee = Oe : Re.sibling = Oe, Re = Oe);
        return e && ue.forEach(function(FS) {
          return t(S, FS);
        }), We && Vi(S, ze), ee;
      }
      function Qe(S, T, x, w) {
        if (typeof x == "object" && x !== null && x.type === Ae && x.key === null && (no(x, null, S), x = x.props.children), typeof x == "object" && x !== null) {
          switch (x.$$typeof) {
            case ri:
              var ee = ll(x._debugInfo);
              e: {
                for (var Re = x.key; T !== null; ) {
                  if (T.key === Re) {
                    if (Re = x.type, Re === Ae) {
                      if (T.tag === 7) {
                        a(
                          S,
                          T.sibling
                        ), w = o(
                          T,
                          x.props.children
                        ), w.return = S, w._debugOwner = x._owner, w._debugInfo = He, no(x, w, S), S = w;
                        break e;
                      }
                    } else if (T.elementType === Re || zp(
                      T,
                      x
                    ) || typeof Re == "object" && Re !== null && Re.$$typeof === ha && Vo(Re) === T.type) {
                      a(
                        S,
                        T.sibling
                      ), w = o(T, x.props), Ua(w, x), w.return = S, w._debugOwner = x._owner, w._debugInfo = He, S = w;
                      break e;
                    }
                    a(S, T);
                    break;
                  } else t(S, T);
                  T = T.sibling;
                }
                x.type === Ae ? (w = Gu(
                  x.props.children,
                  S.mode,
                  w,
                  x.key
                ), w.return = S, w._debugOwner = S, w._debugTask = S._debugTask, w._debugInfo = He, no(x, w, S), S = w) : (w = gf(
                  x,
                  S.mode,
                  w
                ), Ua(w, x), w.return = S, w._debugInfo = He, S = w);
              }
              return S = d(S), He = ee, S;
            case vc:
              e: {
                for (ee = x, x = ee.key; T !== null; ) {
                  if (T.key === x)
                    if (T.tag === 4 && T.stateNode.containerInfo === ee.containerInfo && T.stateNode.implementation === ee.implementation) {
                      a(
                        S,
                        T.sibling
                      ), w = o(
                        T,
                        ee.children || []
                      ), w.return = S, S = w;
                      break e;
                    } else {
                      a(S, T);
                      break;
                    }
                  else t(S, T);
                  T = T.sibling;
                }
                w = Ch(
                  ee,
                  S.mode,
                  w
                ), w.return = S, S = w;
              }
              return d(S);
            case ha:
              return ee = ll(x._debugInfo), x = Vo(x), S = Qe(
                S,
                T,
                x,
                w
              ), He = ee, S;
          }
          if (Te(x))
            return ee = ll(x._debugInfo), S = ge(
              S,
              T,
              x,
              w
            ), He = ee, S;
          if (gt(x)) {
            if (ee = ll(x._debugInfo), Re = gt(x), typeof Re != "function")
              throw Error(
                "An object is not an iterable. This error is likely caused by a bug in React. Please file an issue."
              );
            var ue = Re.call(x);
            return ue === x ? (S.tag !== 0 || Object.prototype.toString.call(S.type) !== "[object GeneratorFunction]" || Object.prototype.toString.call(ue) !== "[object Generator]") && (Tb || console.error(
              "Using Iterators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. You can also use an Iterable that can iterate multiple times over the same items."
            ), Tb = !0) : x.entries !== Re || Wv || (console.error(
              "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
            ), Wv = !0), S = vt(
              S,
              T,
              ue,
              w
            ), He = ee, S;
          }
          if (typeof x.then == "function")
            return ee = ll(x._debugInfo), S = Qe(
              S,
              T,
              uo(x),
              w
            ), He = ee, S;
          if (x.$$typeof === _a)
            return Qe(
              S,
              T,
              bf(S, x),
              w
            );
          Ee(S, x);
        }
        return typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint" ? (ee = "" + x, T !== null && T.tag === 6 ? (a(
          S,
          T.sibling
        ), w = o(T, ee), w.return = S, S = w) : (a(S, T), w = Vu(
          ee,
          S.mode,
          w
        ), w.return = S, w._debugOwner = S, w._debugTask = S._debugTask, w._debugInfo = He, S = w), d(S)) : (typeof x == "function" && Pe(S, x), typeof x == "symbol" && At(S, x), a(S, T));
      }
      return function(S, T, x, w) {
        var ee = He;
        He = null;
        try {
          By = 0;
          var Re = Qe(
            S,
            T,
            x,
            w
          );
          return $d = null, Re;
        } catch (xt) {
          if (xt === Ny || xt === D0) throw xt;
          var ue = ie(29, xt, null, S.mode);
          ue.lanes = w, ue.return = S;
          var ze = ue._debugInfo = He;
          if (ue._debugOwner = S._debugOwner, ue._debugTask = S._debugTask, ze != null) {
            for (var Oe = ze.length - 1; 0 <= Oe; Oe--)
              if (typeof ze[Oe].stack == "string") {
                ue._debugOwner = ze[Oe], ue._debugTask = ze[Oe].debugTask;
                break;
              }
          }
          return ue;
        } finally {
          He = ee;
        }
      };
    }
    function oa(e) {
      var t = e.alternate;
      Se(
        Tl,
        Tl.current & Fd,
        e
      ), Se(kn, e, e), xi === null && (t === null || Jd.current !== null || t.memoizedState !== null) && (xi = e);
    }
    function Pu(e) {
      if (e.tag === 22) {
        if (Se(Tl, Tl.current, e), Se(kn, e, e), xi === null) {
          var t = e.alternate;
          t !== null && t.memoizedState !== null && (xi = e);
        }
      } else Fa(e);
    }
    function Fa(e) {
      Se(Tl, Tl.current, e), Se(
        kn,
        kn.current,
        e
      );
    }
    function fa(e) {
      Ge(kn, e), xi === e && (xi = null), Ge(Tl, e);
    }
    function ru(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === 13) {
          var a = t.memoizedState;
          if (a !== null && (a = a.dehydrated, a === null || a.data === Uc || jn(a)))
            return t;
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
          if ((t.flags & 128) !== 0) return t;
        } else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return null;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return null;
    }
    function em(e) {
      if (e !== null && typeof e != "function") {
        var t = String(e);
        qb.has(t) || (qb.add(t), console.error(
          "Expected the last optional `callback` argument to be a function. Instead received: %s.",
          e
        ));
      }
    }
    function Rt(e, t, a, i) {
      var o = e.memoizedState, f = a(i, o);
      if (e.mode & la) {
        Ve(!0);
        try {
          f = a(i, o);
        } finally {
          Ve(!1);
        }
      }
      f === void 0 && (t = Ne(t) || "Component", Hb.has(t) || (Hb.add(t), console.error(
        "%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.",
        t
      ))), o = f == null ? o : Me({}, o, f), e.memoizedState = o, e.lanes === 0 && (e.updateQueue.baseState = o);
    }
    function Er(e, t, a, i, o, f, d) {
      var h = e.stateNode;
      if (typeof h.shouldComponentUpdate == "function") {
        if (a = h.shouldComponentUpdate(
          i,
          f,
          d
        ), e.mode & la) {
          Ve(!0);
          try {
            a = h.shouldComponentUpdate(
              i,
              f,
              d
            );
          } finally {
            Ve(!1);
          }
        }
        return a === void 0 && console.error(
          "%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.",
          Ne(t) || "Component"
        ), a;
      }
      return t.prototype && t.prototype.isPureReactComponent ? !mf(a, i) || !mf(o, f) : !0;
    }
    function Ar(e, t, a, i) {
      var o = t.state;
      typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, i), t.state !== o && (e = ce(e) || "Component", Db.has(e) || (Db.add(e), console.error(
        "%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",
        e
      )), Fv.enqueueReplaceState(
        t,
        t.state,
        null
      ));
    }
    function ei(e, t) {
      var a = t;
      if ("ref" in t) {
        a = {};
        for (var i in t)
          i !== "ref" && (a[i] = t[i]);
      }
      if (e = e.defaultProps) {
        a === t && (a = Me({}, a));
        for (var o in e)
          a[o] === void 0 && (a[o] = e[o]);
      }
      return a;
    }
    function tm(e) {
      Iv(e), console.warn(
        `%s

%s
`,
        Id ? "An error occurred in the <" + Id + "> component." : "An error occurred in one of your React components.",
        `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://react.dev/link/error-boundaries to learn more about error boundaries.`
      );
    }
    function _p(e) {
      var t = Id ? "The above error occurred in the <" + Id + "> component." : "The above error occurred in one of your React components.", a = "React will try to recreate this component tree from scratch using the error boundary you provided, " + ((Pv || "Anonymous") + ".");
      if (typeof e == "object" && e !== null && typeof e.environmentName == "string") {
        var i = e.environmentName;
        e = [
          `%o

%s

%s
`,
          e,
          t,
          a
        ].slice(0), typeof e[0] == "string" ? e.splice(
          0,
          1,
          m1 + e[0],
          y1,
          F0 + i + F0,
          p1
        ) : e.splice(
          0,
          0,
          m1,
          y1,
          F0 + i + F0,
          p1
        ), e.unshift(console), i = $S.apply(console.error, e), i();
      } else
        console.error(
          `%o

%s

%s
`,
          e,
          t,
          a
        );
    }
    function Rr(e) {
      Iv(e);
    }
    function io(e, t) {
      try {
        Id = t.source ? ce(t.source) : null, Pv = null;
        var a = t.value;
        if (_.actQueue !== null)
          _.thrownErrors.push(a);
        else {
          var i = e.onUncaughtError;
          i(a, { componentStack: t.stack });
        }
      } catch (o) {
        setTimeout(function() {
          throw o;
        });
      }
    }
    function zr(e, t, a) {
      try {
        Id = a.source ? ce(a.source) : null, Pv = ce(t);
        var i = e.onCaughtError;
        i(a.value, {
          componentStack: a.stack,
          errorBoundary: t.tag === 1 ? t.stateNode : null
        });
      } catch (o) {
        setTimeout(function() {
          throw o;
        });
      }
    }
    function El(e, t, a) {
      return a = mn(a), a.tag = Xv, a.payload = { element: null }, a.callback = function() {
        ae(t.source, io, e, t);
      }, a;
    }
    function Mt(e) {
      return e = mn(e), e.tag = Xv, e;
    }
    function _f(e, t, a, i) {
      var o = a.type.getDerivedStateFromError;
      if (typeof o == "function") {
        var f = i.value;
        e.payload = function() {
          return o(f);
        }, e.callback = function() {
          Dp(a), ae(
            i.source,
            zr,
            t,
            a,
            i
          );
        };
      }
      var d = a.stateNode;
      d !== null && typeof d.componentDidCatch == "function" && (e.callback = function() {
        Dp(a), ae(
          i.source,
          zr,
          t,
          a,
          i
        ), typeof o != "function" && (Lo === null ? Lo = /* @__PURE__ */ new Set([this]) : Lo.add(this)), zS(this, i), typeof o == "function" || (a.lanes & 2) === 0 && console.error(
          "%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.",
          ce(a) || "Unknown"
        );
      });
    }
    function qf(e, t, a, i, o) {
      if (a.flags |= 32768, _t && yo(e, o), i !== null && typeof i == "object" && typeof i.then == "function") {
        if (t = a.alternate, t !== null && dl(
          t,
          a,
          o,
          !0
        ), We && (Rc = !0), a = kn.current, a !== null) {
          switch (a.tag) {
            case 13:
              return xi === null ? Jr() : a.alternate === null && Qt === Mc && (Qt = ag), a.flags &= -257, a.flags |= 65536, a.lanes = o, i === Vv ? a.flags |= 16384 : (t = a.updateQueue, t === null ? a.updateQueue = /* @__PURE__ */ new Set([i]) : t.add(i), zm(e, i, o)), !1;
            case 22:
              return a.flags |= 65536, i === Vv ? a.flags |= 16384 : (t = a.updateQueue, t === null ? (t = {
                transitions: null,
                markerInstances: null,
                retryQueue: /* @__PURE__ */ new Set([i])
              }, a.updateQueue = t) : (a = t.retryQueue, a === null ? t.retryQueue = /* @__PURE__ */ new Set([i]) : a.add(i)), zm(e, i, o)), !1;
          }
          throw Error(
            "Unexpected Suspense handler tag (" + a.tag + "). This is a bug in React."
          );
        }
        return zm(e, i, o), Jr(), !1;
      }
      if (We)
        return Rc = !0, t = kn.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = o, i !== Bv && Zc(
          ia(
            Error(
              "There was an error while hydrating but React was able to recover by instead client rendering from the nearest Suspense boundary.",
              { cause: i }
            ),
            a
          )
        )) : (i !== Bv && Zc(
          ia(
            Error(
              "There was an error while hydrating but React was able to recover by instead client rendering the entire root.",
              { cause: i }
            ),
            a
          )
        ), e = e.current.alternate, e.flags |= 65536, o &= -o, e.lanes |= o, i = ia(i, a), o = El(
          e.stateNode,
          i,
          o
        ), Jc(e, o), Qt !== Us && (Qt = lh)), !1;
      var f = ia(
        Error(
          "There was an error during concurrent rendering but React was able to recover by instead synchronously rendering the entire root.",
          { cause: i }
        ),
        a
      );
      if (Ly === null ? Ly = [f] : Ly.push(f), Qt !== Us && (Qt = lh), t === null) return !0;
      i = ia(i, a), a = t;
      do {
        switch (a.tag) {
          case 3:
            return a.flags |= 65536, e = o & -o, a.lanes |= e, e = El(
              a.stateNode,
              i,
              e
            ), Jc(a, e), !1;
          case 1:
            if (t = a.type, f = a.stateNode, (a.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (Lo === null || !Lo.has(f))))
              return a.flags |= 65536, o &= -o, a.lanes |= o, o = Mt(o), _f(
                o,
                e,
                a,
                i
              ), Jc(a, o), !1;
        }
        a = a.return;
      } while (a !== null);
      return !1;
    }
    function Vt(e, t, a, i) {
      t.child = e === null ? Rb(t, null, a, i) : Wd(
        t,
        e.child,
        a,
        i
      );
    }
    function Dr(e, t, a, i, o) {
      a = a.render;
      var f = t.ref;
      if ("ref" in i) {
        var d = {};
        for (var h in i)
          h !== "ref" && (d[h] = i[h]);
      } else d = i;
      return Zu(t), fl(t), i = $u(
        e,
        t,
        a,
        d,
        f,
        o
      ), h = Ll(), Ta(), e !== null && !Ol ? (iu(e, t, o), En(e, t, o)) : (We && h && ur(t), t.flags |= 1, Vt(e, t, i, o), t.child);
    }
    function xn(e, t, a, i, o) {
      if (e === null) {
        var f = a.type;
        return typeof f == "function" && !Mh(f) && f.defaultProps === void 0 && a.compare === null ? (a = Gi(f), t.tag = 15, t.type = a, Cr(t, f), Bf(
          e,
          t,
          a,
          i,
          o
        )) : (e = nr(
          a.type,
          null,
          i,
          t,
          t.mode,
          o
        ), e.ref = t.ref, e.return = t, t.child = e);
      }
      if (f = e.child, !Br(e, o)) {
        var d = f.memoizedProps;
        if (a = a.compare, a = a !== null ? a : mf, a(d, i) && e.ref === t.ref)
          return En(
            e,
            t,
            o
          );
      }
      return t.flags |= 1, e = sn(f, i), e.ref = t.ref, e.return = t, t.child = e;
    }
    function Bf(e, t, a, i, o) {
      if (e !== null) {
        var f = e.memoizedProps;
        if (mf(f, i) && e.ref === t.ref && t.type === e.type)
          if (Ol = !1, t.pendingProps = i = f, Br(e, o))
            (e.flags & 131072) !== 0 && (Ol = !0);
          else
            return t.lanes = e.lanes, En(e, t, o);
      }
      return Ur(
        e,
        t,
        a,
        i,
        o
      );
    }
    function Or(e, t, a) {
      var i = t.pendingProps, o = i.children, f = e !== null ? e.memoizedState : null;
      if (i.mode === "hidden") {
        if ((t.flags & 128) !== 0) {
          if (i = f !== null ? f.baseLanes | a : a, e !== null) {
            for (o = t.child = e.child, f = 0; o !== null; )
              f = f | o.lanes | o.childLanes, o = o.sibling;
            t.childLanes = f & ~i;
          } else t.childLanes = 0, t.child = null;
          return Mr(
            e,
            t,
            i,
            a
          );
        }
        if ((a & 536870912) !== 0)
          t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && fr(
            t,
            f !== null ? f.cachePool : null
          ), f !== null ? Zl(t, f) : xf(t), Pu(t);
        else
          return t.lanes = t.childLanes = 536870912, Mr(
            e,
            t,
            f !== null ? f.baseLanes | a : a,
            a
          );
      } else
        f !== null ? (fr(t, f.cachePool), Zl(t, f), Fa(t), t.memoizedState = null) : (e !== null && fr(t, null), xf(t), Fa(t));
      return Vt(e, t, o, a), t.child;
    }
    function Mr(e, t, a, i) {
      var o = Vh();
      return o = o === null ? null : {
        parent: bl._currentValue,
        pool: o
      }, t.memoizedState = {
        baseLanes: a,
        cachePool: o
      }, e !== null && fr(t, null), xf(t), Pu(t), e !== null && dl(e, t, i, !0), null;
    }
    function Yf(e, t) {
      var a = t.ref;
      if (a === null)
        e !== null && e.ref !== null && (t.flags |= 4194816);
      else {
        if (typeof a != "function" && typeof a != "object")
          throw Error(
            "Expected ref to be a function, an object returned by React.createRef(), or undefined/null."
          );
        (e === null || e.ref !== a) && (t.flags |= 4194816);
      }
    }
    function Ur(e, t, a, i, o) {
      if (a.prototype && typeof a.prototype.render == "function") {
        var f = Ne(a) || "Unknown";
        Yb[f] || (console.error(
          "The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.",
          f,
          f
        ), Yb[f] = !0);
      }
      return t.mode & la && Du.recordLegacyContextWarning(
        t,
        null
      ), e === null && (Cr(t, t.type), a.contextTypes && (f = Ne(a) || "Unknown", Gb[f] || (Gb[f] = !0, console.error(
        "%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with React.useContext() instead. (https://react.dev/link/legacy-context)",
        f
      )))), Zu(t), fl(t), a = $u(
        e,
        t,
        a,
        i,
        void 0,
        o
      ), i = Ll(), Ta(), e !== null && !Ol ? (iu(e, t, o), En(e, t, o)) : (We && i && ur(t), t.flags |= 1, Vt(e, t, a, o), t.child);
    }
    function lm(e, t, a, i, o, f) {
      return Zu(t), fl(t), Dc = -1, qy = e !== null && e.type !== t.type, t.updateQueue = null, a = Wc(
        t,
        i,
        a,
        o
      ), Ef(e, t), i = Ll(), Ta(), e !== null && !Ol ? (iu(e, t, f), En(e, t, f)) : (We && i && ur(t), t.flags |= 1, Vt(e, t, a, f), t.child);
    }
    function am(e, t, a, i, o) {
      switch (De(t)) {
        case !1:
          var f = t.stateNode, d = new t.type(
            t.memoizedProps,
            f.context
          ).state;
          f.updater.enqueueSetState(f, d, null);
          break;
        case !0:
          t.flags |= 128, t.flags |= 65536, f = Error("Simulated error coming from DevTools");
          var h = o & -o;
          if (t.lanes |= h, d = pt, d === null)
            throw Error(
              "Expected a work-in-progress root. This is a bug in React. Please file an issue."
            );
          h = Mt(h), _f(
            h,
            d,
            t,
            ia(f, t)
          ), Jc(t, h);
      }
      if (Zu(t), t.stateNode === null) {
        if (d = Yo, f = a.contextType, "contextType" in a && f !== null && (f === void 0 || f.$$typeof !== _a) && !_b.has(a) && (_b.add(a), h = f === void 0 ? " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof f != "object" ? " However, it is set to a " + typeof f + "." : f.$$typeof === bd ? " Did you accidentally pass the Context.Consumer instead?" : " However, it is set to an object with keys {" + Object.keys(f).join(", ") + "}.", console.error(
          "%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s",
          Ne(a) || "Component",
          h
        )), typeof f == "object" && f !== null && (d = yt(f)), f = new a(i, d), t.mode & la) {
          Ve(!0);
          try {
            f = new a(i, d);
          } finally {
            Ve(!1);
          }
        }
        if (d = t.memoizedState = f.state !== null && f.state !== void 0 ? f.state : null, f.updater = Fv, t.stateNode = f, f._reactInternals = t, f._reactInternalInstance = zb, typeof a.getDerivedStateFromProps == "function" && d === null && (d = Ne(a) || "Component", Ob.has(d) || (Ob.add(d), console.error(
          "`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.",
          d,
          f.state === null ? "null" : "undefined",
          d
        ))), typeof a.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function") {
          var p = h = d = null;
          if (typeof f.componentWillMount == "function" && f.componentWillMount.__suppressDeprecationWarning !== !0 ? d = "componentWillMount" : typeof f.UNSAFE_componentWillMount == "function" && (d = "UNSAFE_componentWillMount"), typeof f.componentWillReceiveProps == "function" && f.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? h = "componentWillReceiveProps" : typeof f.UNSAFE_componentWillReceiveProps == "function" && (h = "UNSAFE_componentWillReceiveProps"), typeof f.componentWillUpdate == "function" && f.componentWillUpdate.__suppressDeprecationWarning !== !0 ? p = "componentWillUpdate" : typeof f.UNSAFE_componentWillUpdate == "function" && (p = "UNSAFE_componentWillUpdate"), d !== null || h !== null || p !== null) {
            f = Ne(a) || "Component";
            var v = typeof a.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            Ub.has(f) || (Ub.add(f), console.error(
              `Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://react.dev/link/unsafe-component-lifecycles`,
              f,
              v,
              d !== null ? `
  ` + d : "",
              h !== null ? `
  ` + h : "",
              p !== null ? `
  ` + p : ""
            ));
          }
        }
        f = t.stateNode, d = Ne(a) || "Component", f.render || (a.prototype && typeof a.prototype.render == "function" ? console.error(
          "No `render` method found on the %s instance: did you accidentally return an object from the constructor?",
          d
        ) : console.error(
          "No `render` method found on the %s instance: you may have forgotten to define `render`.",
          d
        )), !f.getInitialState || f.getInitialState.isReactClassApproved || f.state || console.error(
          "getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?",
          d
        ), f.getDefaultProps && !f.getDefaultProps.isReactClassApproved && console.error(
          "getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.",
          d
        ), f.contextType && console.error(
          "contextType was defined as an instance property on %s. Use a static property to define contextType instead.",
          d
        ), a.childContextTypes && !jb.has(a) && (jb.add(a), console.error(
          "%s uses the legacy childContextTypes API which was removed in React 19. Use React.createContext() instead. (https://react.dev/link/legacy-context)",
          d
        )), a.contextTypes && !Nb.has(a) && (Nb.add(a), console.error(
          "%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with static contextType instead. (https://react.dev/link/legacy-context)",
          d
        )), typeof f.componentShouldUpdate == "function" && console.error(
          "%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.",
          d
        ), a.prototype && a.prototype.isPureReactComponent && typeof f.shouldComponentUpdate < "u" && console.error(
          "%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.",
          Ne(a) || "A pure component"
        ), typeof f.componentDidUnmount == "function" && console.error(
          "%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?",
          d
        ), typeof f.componentDidReceiveProps == "function" && console.error(
          "%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().",
          d
        ), typeof f.componentWillRecieveProps == "function" && console.error(
          "%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?",
          d
        ), typeof f.UNSAFE_componentWillRecieveProps == "function" && console.error(
          "%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?",
          d
        ), h = f.props !== i, f.props !== void 0 && h && console.error(
          "When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.",
          d
        ), f.defaultProps && console.error(
          "Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.",
          d,
          d
        ), typeof f.getSnapshotBeforeUpdate != "function" || typeof f.componentDidUpdate == "function" || Mb.has(a) || (Mb.add(a), console.error(
          "%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.",
          Ne(a)
        )), typeof f.getDerivedStateFromProps == "function" && console.error(
          "%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.",
          d
        ), typeof f.getDerivedStateFromError == "function" && console.error(
          "%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.",
          d
        ), typeof a.getSnapshotBeforeUpdate == "function" && console.error(
          "%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.",
          d
        ), (h = f.state) && (typeof h != "object" || Te(h)) && console.error("%s.state: must be set to an object or null", d), typeof f.getChildContext == "function" && typeof a.childContextTypes != "object" && console.error(
          "%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().",
          d
        ), f = t.stateNode, f.props = i, f.state = t.memoizedState, f.refs = {}, Ql(t), d = a.contextType, f.context = typeof d == "object" && d !== null ? yt(d) : Yo, f.state === i && (d = Ne(a) || "Component", Cb.has(d) || (Cb.add(d), console.error(
          "%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.",
          d
        ))), t.mode & la && Du.recordLegacyContextWarning(
          t,
          f
        ), Du.recordUnsafeLifecycleWarnings(
          t,
          f
        ), f.state = t.memoizedState, d = a.getDerivedStateFromProps, typeof d == "function" && (Rt(
          t,
          a,
          d,
          i
        ), f.state = t.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function" || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (d = f.state, typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount(), d !== f.state && (console.error(
          "%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",
          ce(t) || "Component"
        ), Fv.enqueueReplaceState(
          f,
          f.state,
          null
        )), Kc(t, i, f, o), yn(), f.state = t.memoizedState), typeof f.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & zu) !== Tt && (t.flags |= 134217728), f = !0;
      } else if (e === null) {
        f = t.stateNode;
        var H = t.memoizedProps;
        h = ei(a, H), f.props = h;
        var B = f.context;
        p = a.contextType, d = Yo, typeof p == "object" && p !== null && (d = yt(p)), v = a.getDerivedStateFromProps, p = typeof v == "function" || typeof f.getSnapshotBeforeUpdate == "function", H = t.pendingProps !== H, p || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (H || B !== d) && Ar(
          t,
          f,
          i,
          d
        ), wo = !1;
        var U = t.memoizedState;
        f.state = U, Kc(t, i, f, o), yn(), B = t.memoizedState, H || U !== B || wo ? (typeof v == "function" && (Rt(
          t,
          a,
          v,
          i
        ), B = t.memoizedState), (h = wo || Er(
          t,
          a,
          h,
          i,
          U,
          B,
          d
        )) ? (p || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & zu) !== Tt && (t.flags |= 134217728)) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & zu) !== Tt && (t.flags |= 134217728), t.memoizedProps = i, t.memoizedState = B), f.props = i, f.state = B, f.context = d, f = h) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & zu) !== Tt && (t.flags |= 134217728), f = !1);
      } else {
        f = t.stateNode, Ju(e, t), d = t.memoizedProps, p = ei(a, d), f.props = p, v = t.pendingProps, U = f.context, B = a.contextType, h = Yo, typeof B == "object" && B !== null && (h = yt(B)), H = a.getDerivedStateFromProps, (B = typeof H == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (d !== v || U !== h) && Ar(
          t,
          f,
          i,
          h
        ), wo = !1, U = t.memoizedState, f.state = U, Kc(t, i, f, o), yn();
        var Y = t.memoizedState;
        d !== v || U !== Y || wo || e !== null && e.dependencies !== null && Qu(e.dependencies) ? (typeof H == "function" && (Rt(
          t,
          a,
          H,
          i
        ), Y = t.memoizedState), (p = wo || Er(
          t,
          a,
          p,
          i,
          U,
          Y,
          h
        ) || e !== null && e.dependencies !== null && Qu(e.dependencies)) ? (B || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(i, Y, h), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(
          i,
          Y,
          h
        )), typeof f.componentDidUpdate == "function" && (t.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || d === e.memoizedProps && U === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && U === e.memoizedState || (t.flags |= 1024), t.memoizedProps = i, t.memoizedState = Y), f.props = i, f.state = Y, f.context = h, f = p) : (typeof f.componentDidUpdate != "function" || d === e.memoizedProps && U === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && U === e.memoizedState || (t.flags |= 1024), f = !1);
      }
      if (h = f, Yf(e, t), d = (t.flags & 128) !== 0, h || d) {
        if (h = t.stateNode, af(t), d && typeof a.getDerivedStateFromError != "function")
          a = null, Ya = -1;
        else {
          if (fl(t), a = rb(h), t.mode & la) {
            Ve(!0);
            try {
              rb(h);
            } finally {
              Ve(!1);
            }
          }
          Ta();
        }
        t.flags |= 1, e !== null && d ? (t.child = Wd(
          t,
          e.child,
          null,
          o
        ), t.child = Wd(
          t,
          null,
          a,
          o
        )) : Vt(e, t, a, o), t.memoizedState = h.state, e = t.child;
      } else
        e = En(
          e,
          t,
          o
        );
      return o = t.stateNode, f && o.props !== i && (Pd || console.error(
        "It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.",
        ce(t) || "a component"
      ), Pd = !0), e;
    }
    function nm(e, t, a, i) {
      return Qi(), t.flags |= 256, Vt(e, t, a, i), t.child;
    }
    function Cr(e, t) {
      t && t.childContextTypes && console.error(
        `childContextTypes cannot be defined on a function component.
  %s.childContextTypes = ...`,
        t.displayName || t.name || "Component"
      ), typeof t.getDerivedStateFromProps == "function" && (e = Ne(t) || "Unknown", Vb[e] || (console.error(
        "%s: Function components do not support getDerivedStateFromProps.",
        e
      ), Vb[e] = !0)), typeof t.contextType == "object" && t.contextType !== null && (t = Ne(t) || "Unknown", wb[t] || (console.error(
        "%s: Function components do not support contextType.",
        t
      ), wb[t] = !0));
    }
    function wf(e) {
      return { baseLanes: e, cachePool: Cp() };
    }
    function Hr(e, t, a) {
      return e = e !== null ? e.childLanes & ~a : 0, t && (e |= un), e;
    }
    function qp(e, t, a) {
      var i, o = t.pendingProps;
      oe(t) && (t.flags |= 128);
      var f = !1, d = (t.flags & 128) !== 0;
      if ((i = d) || (i = e !== null && e.memoizedState === null ? !1 : (Tl.current & Yy) !== 0), i && (f = !0, t.flags &= -129), i = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
        if (We) {
          if (f ? oa(t) : Fa(t), We) {
            var h = Xt, p;
            if (!(p = !h)) {
              e: {
                var v = h;
                for (p = Si; v.nodeType !== 8; ) {
                  if (!p) {
                    p = null;
                    break e;
                  }
                  if (v = pl(v.nextSibling), v === null) {
                    p = null;
                    break e;
                  }
                }
                p = v;
              }
              p !== null ? (Qa(), t.memoizedState = {
                dehydrated: p,
                treeContext: Es !== null ? { id: Ec, overflow: Ac } : null,
                retryLane: 536870912,
                hydrationErrors: null
              }, v = ie(18, null, null, Tt), v.stateNode = p, v.return = t, t.child = v, pa = t, Xt = null, p = !0) : p = !1, p = !p;
            }
            p && (Hh(
              t,
              h
            ), rn(t));
          }
          if (h = t.memoizedState, h !== null && (h = h.dehydrated, h !== null))
            return jn(h) ? t.lanes = 32 : t.lanes = 536870912, null;
          fa(t);
        }
        return h = o.children, o = o.fallback, f ? (Fa(t), f = t.mode, h = Gf(
          {
            mode: "hidden",
            children: h
          },
          f
        ), o = Gu(
          o,
          f,
          a,
          null
        ), h.return = t, o.return = t, h.sibling = o, t.child = h, f = t.child, f.memoizedState = wf(a), f.childLanes = Hr(
          e,
          i,
          a
        ), t.memoizedState = tg, o) : (oa(t), Nr(
          t,
          h
        ));
      }
      var H = e.memoizedState;
      if (H !== null && (h = H.dehydrated, h !== null)) {
        if (d)
          t.flags & 256 ? (oa(t), t.flags &= -257, t = jr(
            e,
            t,
            a
          )) : t.memoizedState !== null ? (Fa(t), t.child = e.child, t.flags |= 128, t = null) : (Fa(t), f = o.fallback, h = t.mode, o = Gf(
            {
              mode: "visible",
              children: o.children
            },
            h
          ), f = Gu(
            f,
            h,
            a,
            null
          ), f.flags |= 2, o.return = t, f.return = t, o.sibling = f, t.child = o, Wd(
            t,
            e.child,
            null,
            a
          ), o = t.child, o.memoizedState = wf(a), o.childLanes = Hr(
            e,
            i,
            a
          ), t.memoizedState = tg, t = f);
        else if (oa(t), We && console.error(
          "We should not be hydrating here. This is a bug in React. Please file a bug."
        ), jn(h)) {
          if (i = h.nextSibling && h.nextSibling.dataset, i) {
            p = i.dgst;
            var B = i.msg;
            v = i.stck;
            var U = i.cstck;
          }
          h = B, i = p, o = v, p = f = U, f = Error(h || "The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering."), f.stack = o || "", f.digest = i, i = p === void 0 ? null : p, o = {
            value: f,
            source: null,
            stack: i
          }, typeof i == "string" && _v.set(
            f,
            o
          ), Zc(o), t = jr(
            e,
            t,
            a
          );
        } else if (Ol || dl(
          e,
          t,
          a,
          !1
        ), i = (a & e.childLanes) !== 0, Ol || i) {
          if (i = pt, i !== null && (o = a & -a, o = (o & 42) !== 0 ? 1 : Ul(
            o
          ), o = (o & (i.suspendedLanes | a)) !== 0 ? 0 : o, o !== 0 && o !== H.retryLane))
            throw H.retryLane = o, Xl(
              e,
              o
            ), Ut(
              i,
              e,
              o
            ), Bb;
          h.data === Uc || Jr(), t = jr(
            e,
            t,
            a
          );
        } else
          h.data === Uc ? (t.flags |= 192, t.child = e.child, t = null) : (e = H.treeContext, Xt = pl(
            h.nextSibling
          ), pa = t, We = !0, As = null, Rc = !1, Zn = null, Si = !1, e !== null && (Qa(), Xn[Qn++] = Ec, Xn[Qn++] = Ac, Xn[Qn++] = Es, Ec = e.id, Ac = e.overflow, Es = t), t = Nr(
            t,
            o.children
          ), t.flags |= 4096);
        return t;
      }
      return f ? (Fa(t), f = o.fallback, h = t.mode, p = e.child, v = p.sibling, o = sn(
        p,
        {
          mode: "hidden",
          children: o.children
        }
      ), o.subtreeFlags = p.subtreeFlags & 65011712, v !== null ? f = sn(
        v,
        f
      ) : (f = Gu(
        f,
        h,
        a,
        null
      ), f.flags |= 2), f.return = t, o.return = t, o.sibling = f, t.child = o, o = f, f = t.child, h = e.child.memoizedState, h === null ? h = wf(a) : (p = h.cachePool, p !== null ? (v = bl._currentValue, p = p.parent !== v ? { parent: v, pool: v } : p) : p = Cp(), h = {
        baseLanes: h.baseLanes | a,
        cachePool: p
      }), f.memoizedState = h, f.childLanes = Hr(
        e,
        i,
        a
      ), t.memoizedState = tg, o) : (oa(t), a = e.child, e = a.sibling, a = sn(a, {
        mode: "visible",
        children: o.children
      }), a.return = t, a.sibling = null, e !== null && (i = t.deletions, i === null ? (t.deletions = [e], t.flags |= 16) : i.push(e)), t.child = a, t.memoizedState = null, a);
    }
    function Nr(e, t) {
      return t = Gf(
        { mode: "visible", children: t },
        e.mode
      ), t.return = e, e.child = t;
    }
    function Gf(e, t) {
      return e = ie(22, e, null, t), e.lanes = 0, e.stateNode = {
        _visibility: b0,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null
      }, e;
    }
    function jr(e, t, a) {
      return Wd(t, e.child, null, a), e = Nr(
        t,
        t.pendingProps.children
      ), e.flags |= 2, t.memoizedState = null, e;
    }
    function _r(e, t, a) {
      e.lanes |= t;
      var i = e.alternate;
      i !== null && (i.lanes |= t), Bh(
        e.return,
        t,
        a
      );
    }
    function um(e, t) {
      var a = Te(e);
      return e = !a && typeof gt(e) == "function", a || e ? (a = a ? "array" : "iterable", console.error(
        "A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>",
        a,
        t,
        a
      ), !1) : !0;
    }
    function qr(e, t, a, i, o) {
      var f = e.memoizedState;
      f === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: i,
        tail: a,
        tailMode: o
      } : (f.isBackwards = t, f.rendering = null, f.renderingStartTime = 0, f.last = i, f.tail = a, f.tailMode = o);
    }
    function im(e, t, a) {
      var i = t.pendingProps, o = i.revealOrder, f = i.tail;
      if (i = i.children, o !== void 0 && o !== "forwards" && o !== "backwards" && o !== "together" && !Xb[o])
        if (Xb[o] = !0, typeof o == "string")
          switch (o.toLowerCase()) {
            case "together":
            case "forwards":
            case "backwards":
              console.error(
                '"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.',
                o,
                o.toLowerCase()
              );
              break;
            case "forward":
            case "backward":
              console.error(
                '"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.',
                o,
                o.toLowerCase()
              );
              break;
            default:
              console.error(
                '"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?',
                o
              );
          }
        else
          console.error(
            '%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?',
            o
          );
      f === void 0 || eg[f] || (f !== "collapsed" && f !== "hidden" ? (eg[f] = !0, console.error(
        '"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?',
        f
      )) : o !== "forwards" && o !== "backwards" && (eg[f] = !0, console.error(
        '<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?',
        f
      )));
      e: if ((o === "forwards" || o === "backwards") && i !== void 0 && i !== null && i !== !1)
        if (Te(i)) {
          for (var d = 0; d < i.length; d++)
            if (!um(i[d], d)) break e;
        } else if (d = gt(i), typeof d == "function") {
          if (d = d.call(i))
            for (var h = d.next(), p = 0; !h.done; h = d.next()) {
              if (!um(h.value, p)) break e;
              p++;
            }
        } else
          console.error(
            'A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?',
            o
          );
      if (Vt(e, t, i, a), i = Tl.current, (i & Yy) !== 0)
        i = i & Fd | Yy, t.flags |= 128;
      else {
        if (e !== null && (e.flags & 128) !== 0)
          e: for (e = t.child; e !== null; ) {
            if (e.tag === 13)
              e.memoizedState !== null && _r(
                e,
                a,
                t
              );
            else if (e.tag === 19)
              _r(e, a, t);
            else if (e.child !== null) {
              e.child.return = e, e = e.child;
              continue;
            }
            if (e === t) break e;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t)
                break e;
              e = e.return;
            }
            e.sibling.return = e.return, e = e.sibling;
          }
        i &= Fd;
      }
      switch (Se(Tl, i, t), o) {
        case "forwards":
          for (a = t.child, o = null; a !== null; )
            e = a.alternate, e !== null && ru(e) === null && (o = a), a = a.sibling;
          a = o, a === null ? (o = t.child, t.child = null) : (o = a.sibling, a.sibling = null), qr(
            t,
            !1,
            o,
            a,
            f
          );
          break;
        case "backwards":
          for (a = null, o = t.child, t.child = null; o !== null; ) {
            if (e = o.alternate, e !== null && ru(e) === null) {
              t.child = o;
              break;
            }
            e = o.sibling, o.sibling = a, a = o, o = e;
          }
          qr(
            t,
            !0,
            a,
            null,
            f
          );
          break;
        case "together":
          qr(t, !1, null, null, void 0);
          break;
        default:
          t.memoizedState = null;
      }
      return t.child;
    }
    function En(e, t, a) {
      if (e !== null && (t.dependencies = e.dependencies), Ya = -1, Qo |= t.lanes, (a & t.childLanes) === 0)
        if (e !== null) {
          if (dl(
            e,
            t,
            a,
            !1
          ), (a & t.childLanes) === 0)
            return null;
        } else return null;
      if (e !== null && t.child !== e.child)
        throw Error("Resuming work not yet implemented.");
      if (t.child !== null) {
        for (e = t.child, a = sn(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null; )
          e = e.sibling, a = a.sibling = sn(e, e.pendingProps), a.return = t;
        a.sibling = null;
      }
      return t.child;
    }
    function Br(e, t) {
      return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Qu(e)));
    }
    function pv(e, t, a) {
      switch (t.tag) {
        case 3:
          zt(
            t,
            t.stateNode.containerInfo
          ), Xu(
            t,
            bl,
            e.memoizedState.cache
          ), Qi();
          break;
        case 27:
        case 5:
          Z(t);
          break;
        case 4:
          zt(
            t,
            t.stateNode.containerInfo
          );
          break;
        case 10:
          Xu(
            t,
            t.type,
            t.memoizedProps.value
          );
          break;
        case 12:
          (a & t.childLanes) !== 0 && (t.flags |= 4), t.flags |= 2048;
          var i = t.stateNode;
          i.effectDuration = -0, i.passiveEffectDuration = -0;
          break;
        case 13:
          if (i = t.memoizedState, i !== null)
            return i.dehydrated !== null ? (oa(t), t.flags |= 128, null) : (a & t.child.childLanes) !== 0 ? qp(
              e,
              t,
              a
            ) : (oa(t), e = En(
              e,
              t,
              a
            ), e !== null ? e.sibling : null);
          oa(t);
          break;
        case 19:
          var o = (e.flags & 128) !== 0;
          if (i = (a & t.childLanes) !== 0, i || (dl(
            e,
            t,
            a,
            !1
          ), i = (a & t.childLanes) !== 0), o) {
            if (i)
              return im(
                e,
                t,
                a
              );
            t.flags |= 128;
          }
          if (o = t.memoizedState, o !== null && (o.rendering = null, o.tail = null, o.lastEffect = null), Se(
            Tl,
            Tl.current,
            t
          ), i) break;
          return null;
        case 22:
        case 23:
          return t.lanes = 0, Or(e, t, a);
        case 24:
          Xu(
            t,
            bl,
            e.memoizedState.cache
          );
      }
      return En(e, t, a);
    }
    function Yr(e, t, a) {
      if (t._debugNeedsRemount && e !== null) {
        a = nr(
          t.type,
          t.key,
          t.pendingProps,
          t._debugOwner || null,
          t.mode,
          t.lanes
        ), a._debugStack = t._debugStack, a._debugTask = t._debugTask;
        var i = t.return;
        if (i === null) throw Error("Cannot swap the root fiber.");
        if (e.alternate = null, t.alternate = null, a.index = t.index, a.sibling = t.sibling, a.return = t.return, a.ref = t.ref, a._debugInfo = t._debugInfo, t === i.child)
          i.child = a;
        else {
          var o = i.child;
          if (o === null)
            throw Error("Expected parent to have a child.");
          for (; o.sibling !== t; )
            if (o = o.sibling, o === null)
              throw Error("Expected to find the previous sibling.");
          o.sibling = a;
        }
        return t = i.deletions, t === null ? (i.deletions = [e], i.flags |= 16) : t.push(e), a.flags |= 2, a;
      }
      if (e !== null)
        if (e.memoizedProps !== t.pendingProps || t.type !== e.type)
          Ol = !0;
        else {
          if (!Br(e, a) && (t.flags & 128) === 0)
            return Ol = !1, pv(
              e,
              t,
              a
            );
          Ol = (e.flags & 131072) !== 0;
        }
      else
        Ol = !1, (i = We) && (Qa(), i = (t.flags & 1048576) !== 0), i && (i = t.index, Qa(), Op(t, T0, i));
      switch (t.lanes = 0, t.tag) {
        case 16:
          e: if (i = t.pendingProps, e = Vo(t.elementType), t.type = e, typeof e == "function")
            Mh(e) ? (i = ei(
              e,
              i
            ), t.tag = 1, t.type = e = Gi(e), t = am(
              null,
              t,
              e,
              i,
              a
            )) : (t.tag = 0, Cr(t, e), t.type = e = Gi(e), t = Ur(
              null,
              t,
              e,
              i,
              a
            ));
          else {
            if (e != null) {
              if (o = e.$$typeof, o === bu) {
                t.tag = 11, t.type = e = Oh(e), t = Dr(
                  null,
                  t,
                  e,
                  i,
                  a
                );
                break e;
              } else if (o === ss) {
                t.tag = 14, t = xn(
                  null,
                  t,
                  e,
                  i,
                  a
                );
                break e;
              }
            }
            throw t = "", e !== null && typeof e == "object" && e.$$typeof === ha && (t = " Did you wrap a component in React.lazy() more than once?"), e = Ne(e) || e, Error(
              "Element type is invalid. Received a promise that resolves to: " + e + ". Lazy element type must resolve to a class or function." + t
            );
          }
          return t;
        case 0:
          return Ur(
            e,
            t,
            t.type,
            t.pendingProps,
            a
          );
        case 1:
          return i = t.type, o = ei(
            i,
            t.pendingProps
          ), am(
            e,
            t,
            i,
            o,
            a
          );
        case 3:
          e: {
            if (zt(
              t,
              t.stateNode.containerInfo
            ), e === null)
              throw Error(
                "Should have a current fiber. This is a bug in React."
              );
            i = t.pendingProps;
            var f = t.memoizedState;
            o = f.element, Ju(e, t), Kc(t, i, null, a);
            var d = t.memoizedState;
            if (i = d.cache, Xu(t, bl, i), i !== f.cache && Yh(
              t,
              [bl],
              a,
              !0
            ), yn(), i = d.element, f.isDehydrated)
              if (f = {
                element: i,
                isDehydrated: !1,
                cache: d.cache
              }, t.updateQueue.baseState = f, t.memoizedState = f, t.flags & 256) {
                t = nm(
                  e,
                  t,
                  i,
                  a
                );
                break e;
              } else if (i !== o) {
                o = ia(
                  Error(
                    "This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."
                  ),
                  t
                ), Zc(o), t = nm(
                  e,
                  t,
                  i,
                  a
                );
                break e;
              } else {
                switch (e = t.stateNode.containerInfo, e.nodeType) {
                  case 9:
                    e = e.body;
                    break;
                  default:
                    e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
                }
                for (Xt = pl(e.firstChild), pa = t, We = !0, As = null, Rc = !1, Zn = null, Si = !0, e = Rb(
                  t,
                  null,
                  i,
                  a
                ), t.child = e; e; )
                  e.flags = e.flags & -3 | 4096, e = e.sibling;
              }
            else {
              if (Qi(), i === o) {
                t = En(
                  e,
                  t,
                  a
                );
                break e;
              }
              Vt(
                e,
                t,
                i,
                a
              );
            }
            t = t.child;
          }
          return t;
        case 26:
          return Yf(e, t), e === null ? (e = gu(
            t.type,
            null,
            t.pendingProps,
            null
          )) ? t.memoizedState = e : We || (e = t.type, a = t.pendingProps, i = Gt(
            qn.current
          ), i = Be(
            i
          ).createElement(e), i[Dl] = t, i[ea] = a, Ht(i, e, a), Pt(i), t.stateNode = i) : t.memoizedState = gu(
            t.type,
            e.memoizedProps,
            t.pendingProps,
            e.memoizedState
          ), null;
        case 27:
          return Z(t), e === null && We && (i = Gt(qn.current), o = z(), i = t.stateNode = Lm(
            t.type,
            t.pendingProps,
            i,
            o,
            !1
          ), Rc || (o = ft(
            i,
            t.type,
            t.pendingProps,
            o
          ), o !== null && (Za(t, 0).serverProps = o)), pa = t, Si = !0, o = Xt, Nn(t.type) ? (Ag = o, Xt = pl(
            i.firstChild
          )) : Xt = o), Vt(
            e,
            t,
            t.pendingProps.children,
            a
          ), Yf(e, t), e === null && (t.flags |= 4194304), t.child;
        case 5:
          return e === null && We && (f = z(), i = $s(
            t.type,
            f.ancestorInfo
          ), o = Xt, (d = !o) || (d = ci(
            o,
            t.type,
            t.pendingProps,
            Si
          ), d !== null ? (t.stateNode = d, Rc || (f = ft(
            d,
            t.type,
            t.pendingProps,
            f
          ), f !== null && (Za(t, 0).serverProps = f)), pa = t, Xt = pl(
            d.firstChild
          ), Si = !1, f = !0) : f = !1, d = !f), d && (i && Hh(t, o), rn(t))), Z(t), o = t.type, f = t.pendingProps, d = e !== null ? e.memoizedProps : null, i = f.children, Hn(o, f) ? i = null : d !== null && Hn(o, d) && (t.flags |= 32), t.memoizedState !== null && (o = $u(
            e,
            t,
            za,
            null,
            null,
            a
          ), Py._currentValue = o), Yf(e, t), Vt(
            e,
            t,
            i,
            a
          ), t.child;
        case 6:
          return e === null && We && (e = t.pendingProps, a = z(), i = a.ancestorInfo.current, e = i != null ? sf(
            e,
            i.tag,
            a.ancestorInfo.implicitRootScope
          ) : !0, a = Xt, (i = !a) || (i = yl(
            a,
            t.pendingProps,
            Si
          ), i !== null ? (t.stateNode = i, pa = t, Xt = null, i = !0) : i = !1, i = !i), i && (e && Hh(t, a), rn(t))), null;
        case 13:
          return qp(e, t, a);
        case 4:
          return zt(
            t,
            t.stateNode.containerInfo
          ), i = t.pendingProps, e === null ? t.child = Wd(
            t,
            null,
            i,
            a
          ) : Vt(
            e,
            t,
            i,
            a
          ), t.child;
        case 11:
          return Dr(
            e,
            t,
            t.type,
            t.pendingProps,
            a
          );
        case 7:
          return Vt(
            e,
            t,
            t.pendingProps,
            a
          ), t.child;
        case 8:
          return Vt(
            e,
            t,
            t.pendingProps.children,
            a
          ), t.child;
        case 12:
          return t.flags |= 4, t.flags |= 2048, i = t.stateNode, i.effectDuration = -0, i.passiveEffectDuration = -0, Vt(
            e,
            t,
            t.pendingProps.children,
            a
          ), t.child;
        case 10:
          return i = t.type, o = t.pendingProps, f = o.value, "value" in o || Qb || (Qb = !0, console.error(
            "The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"
          )), Xu(t, i, f), Vt(
            e,
            t,
            o.children,
            a
          ), t.child;
        case 9:
          return o = t.type._context, i = t.pendingProps.children, typeof i != "function" && console.error(
            "A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."
          ), Zu(t), o = yt(o), fl(t), i = kv(
            i,
            o,
            void 0
          ), Ta(), t.flags |= 1, Vt(
            e,
            t,
            i,
            a
          ), t.child;
        case 14:
          return xn(
            e,
            t,
            t.type,
            t.pendingProps,
            a
          );
        case 15:
          return Bf(
            e,
            t,
            t.type,
            t.pendingProps,
            a
          );
        case 19:
          return im(
            e,
            t,
            a
          );
        case 31:
          return i = t.pendingProps, a = t.mode, i = {
            mode: i.mode,
            children: i.children
          }, e === null ? (e = Gf(
            i,
            a
          ), e.ref = t.ref, t.child = e, e.return = t, t = e) : (e = sn(e.child, i), e.ref = t.ref, t.child = e, e.return = t, t = e), t;
        case 22:
          return Or(e, t, a);
        case 24:
          return Zu(t), i = yt(bl), e === null ? (o = Vh(), o === null && (o = pt, f = Sf(), o.pooledCache = f, Zi(f), f !== null && (o.pooledCacheLanes |= a), o = f), t.memoizedState = {
            parent: i,
            cache: o
          }, Ql(t), Xu(t, bl, o)) : ((e.lanes & a) !== 0 && (Ju(e, t), Kc(t, null, null, a), yn()), o = e.memoizedState, f = t.memoizedState, o.parent !== i ? (o = {
            parent: i,
            cache: i
          }, t.memoizedState = o, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = o), Xu(t, bl, i)) : (i = f.cache, Xu(t, bl, i), i !== o.cache && Yh(
            t,
            [bl],
            a,
            !0
          ))), Vt(
            e,
            t,
            t.pendingProps.children,
            a
          ), t.child;
        case 29:
          throw t.pendingProps;
      }
      throw Error(
        "Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue."
      );
    }
    function Kl(e) {
      e.flags |= 4;
    }
    function Vf(e, t) {
      if (t.type !== "stylesheet" || (t.state.loading & $n) !== ws)
        e.flags &= -16777217;
      else if (e.flags |= 16777216, !ts(t)) {
        if (t = kn.current, t !== null && ((we & 4194048) === we ? xi !== null : (we & 62914560) !== we && (we & 536870912) === 0 || t !== xi))
          throw jy = Vv, Pg;
        e.flags |= 8192;
      }
    }
    function Xf(e, t) {
      t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? ef() : 536870912, e.lanes |= t, Ns |= t);
    }
    function ti(e, t) {
      if (!We)
        switch (e.tailMode) {
          case "hidden":
            t = e.tail;
            for (var a = null; t !== null; )
              t.alternate !== null && (a = t), t = t.sibling;
            a === null ? e.tail = null : a.sibling = null;
            break;
          case "collapsed":
            a = e.tail;
            for (var i = null; a !== null; )
              a.alternate !== null && (i = a), a = a.sibling;
            i === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : i.sibling = null;
        }
    }
    function it(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, a = 0, i = 0;
      if (t)
        if ((e.mode & Yl) !== Tt) {
          for (var o = e.selfBaseDuration, f = e.child; f !== null; )
            a |= f.lanes | f.childLanes, i |= f.subtreeFlags & 65011712, i |= f.flags & 65011712, o += f.treeBaseDuration, f = f.sibling;
          e.treeBaseDuration = o;
        } else
          for (o = e.child; o !== null; )
            a |= o.lanes | o.childLanes, i |= o.subtreeFlags & 65011712, i |= o.flags & 65011712, o.return = e, o = o.sibling;
      else if ((e.mode & Yl) !== Tt) {
        o = e.actualDuration, f = e.selfBaseDuration;
        for (var d = e.child; d !== null; )
          a |= d.lanes | d.childLanes, i |= d.subtreeFlags, i |= d.flags, o += d.actualDuration, f += d.treeBaseDuration, d = d.sibling;
        e.actualDuration = o, e.treeBaseDuration = f;
      } else
        for (o = e.child; o !== null; )
          a |= o.lanes | o.childLanes, i |= o.subtreeFlags, i |= o.flags, o.return = e, o = o.sibling;
      return e.subtreeFlags |= i, e.childLanes = a, t;
    }
    function Bp(e, t, a) {
      var i = t.pendingProps;
      switch (ir(t), t.tag) {
        case 31:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return it(t), null;
        case 1:
          return it(t), null;
        case 3:
          return a = t.stateNode, i = null, e !== null && (i = e.memoizedState.cache), t.memoizedState.cache !== i && (t.flags |= 2048), nu(bl, t), Yt(t), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (e === null || e.child === null) && (Xi(t) ? (qh(), Kl(t)) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, _h())), it(t), null;
        case 26:
          return a = t.memoizedState, e === null ? (Kl(t), a !== null ? (it(t), Vf(
            t,
            a
          )) : (it(t), t.flags &= -16777217)) : a ? a !== e.memoizedState ? (Kl(t), it(t), Vf(
            t,
            a
          )) : (it(t), t.flags &= -16777217) : (e.memoizedProps !== i && Kl(t), it(t), t.flags &= -16777217), null;
        case 27:
          W(t), a = Gt(qn.current);
          var o = t.type;
          if (e !== null && t.stateNode != null)
            e.memoizedProps !== i && Kl(t);
          else {
            if (!i) {
              if (t.stateNode === null)
                throw Error(
                  "We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue."
                );
              return it(t), null;
            }
            e = z(), Xi(t) ? Nh(t) : (e = Lm(
              o,
              i,
              a,
              e,
              !0
            ), t.stateNode = e, Kl(t));
          }
          return it(t), null;
        case 5:
          if (W(t), a = t.type, e !== null && t.stateNode != null)
            e.memoizedProps !== i && Kl(t);
          else {
            if (!i) {
              if (t.stateNode === null)
                throw Error(
                  "We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue."
                );
              return it(t), null;
            }
            if (o = z(), Xi(t))
              Nh(t);
            else {
              switch (e = Gt(qn.current), $s(a, o.ancestorInfo), o = o.context, e = Be(e), o) {
                case oh:
                  e = e.createElementNS(Bo, a);
                  break;
                case k0:
                  e = e.createElementNS(
                    Ts,
                    a
                  );
                  break;
                default:
                  switch (a) {
                    case "svg":
                      e = e.createElementNS(
                        Bo,
                        a
                      );
                      break;
                    case "math":
                      e = e.createElementNS(
                        Ts,
                        a
                      );
                      break;
                    case "script":
                      e = e.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild);
                      break;
                    case "select":
                      e = typeof i.is == "string" ? e.createElement("select", { is: i.is }) : e.createElement("select"), i.multiple ? e.multiple = !0 : i.size && (e.size = i.size);
                      break;
                    default:
                      e = typeof i.is == "string" ? e.createElement(a, {
                        is: i.is
                      }) : e.createElement(a), a.indexOf("-") === -1 && (a !== a.toLowerCase() && console.error(
                        "<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.",
                        a
                      ), Object.prototype.toString.call(e) !== "[object HTMLUnknownElement]" || Tu.call(
                        o1,
                        a
                      ) || (o1[a] = !0, console.error(
                        "The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.",
                        a
                      )));
                  }
              }
              e[Dl] = t, e[ea] = i;
              e: for (o = t.child; o !== null; ) {
                if (o.tag === 5 || o.tag === 6)
                  e.appendChild(o.stateNode);
                else if (o.tag !== 4 && o.tag !== 27 && o.child !== null) {
                  o.child.return = o, o = o.child;
                  continue;
                }
                if (o === t) break e;
                for (; o.sibling === null; ) {
                  if (o.return === null || o.return === t)
                    break e;
                  o = o.return;
                }
                o.sibling.return = o.return, o = o.sibling;
              }
              t.stateNode = e;
              e: switch (Ht(e, a, i), a) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  e = !!i.autoFocus;
                  break e;
                case "img":
                  e = !0;
                  break e;
                default:
                  e = !1;
              }
              e && Kl(t);
            }
          }
          return it(t), t.flags &= -16777217, null;
        case 6:
          if (e && t.stateNode != null)
            e.memoizedProps !== i && Kl(t);
          else {
            if (typeof i != "string" && t.stateNode === null)
              throw Error(
                "We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue."
              );
            if (e = Gt(qn.current), a = z(), Xi(t)) {
              e = t.stateNode, a = t.memoizedProps, o = !Rc, i = null;
              var f = pa;
              if (f !== null)
                switch (f.tag) {
                  case 3:
                    o && (o = sd(
                      e,
                      a,
                      i
                    ), o !== null && (Za(t, 0).serverProps = o));
                    break;
                  case 27:
                  case 5:
                    i = f.memoizedProps, o && (o = sd(
                      e,
                      a,
                      i
                    ), o !== null && (Za(
                      t,
                      0
                    ).serverProps = o));
                }
              e[Dl] = t, e = !!(e.nodeValue === a || i !== null && i.suppressHydrationWarning === !0 || _m(e.nodeValue, a)), e || rn(t);
            } else
              o = a.ancestorInfo.current, o != null && sf(
                i,
                o.tag,
                a.ancestorInfo.implicitRootScope
              ), e = Be(e).createTextNode(
                i
              ), e[Dl] = t, t.stateNode = e;
          }
          return it(t), null;
        case 13:
          if (i = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            if (o = Xi(t), i !== null && i.dehydrated !== null) {
              if (e === null) {
                if (!o)
                  throw Error(
                    "A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React."
                  );
                if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o)
                  throw Error(
                    "Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue."
                  );
                o[Dl] = t, it(t), (t.mode & Yl) !== Tt && i !== null && (o = t.child, o !== null && (t.treeBaseDuration -= o.treeBaseDuration));
              } else
                qh(), Qi(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4, it(t), (t.mode & Yl) !== Tt && i !== null && (o = t.child, o !== null && (t.treeBaseDuration -= o.treeBaseDuration));
              o = !1;
            } else
              o = _h(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = o), o = !0;
            if (!o)
              return t.flags & 256 ? (fa(t), t) : (fa(t), null);
          }
          return fa(t), (t.flags & 128) !== 0 ? (t.lanes = a, (t.mode & Yl) !== Tt && hn(t), t) : (a = i !== null, e = e !== null && e.memoizedState !== null, a && (i = t.child, o = null, i.alternate !== null && i.alternate.memoizedState !== null && i.alternate.memoizedState.cachePool !== null && (o = i.alternate.memoizedState.cachePool.pool), f = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (f = i.memoizedState.cachePool.pool), f !== o && (i.flags |= 2048)), a !== e && a && (t.child.flags |= 8192), Xf(t, t.updateQueue), it(t), (t.mode & Yl) !== Tt && a && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration)), null);
        case 4:
          return Yt(t), e === null && Nm(
            t.stateNode.containerInfo
          ), it(t), null;
        case 10:
          return nu(t.type, t), it(t), null;
        case 19:
          if (Ge(Tl, t), o = t.memoizedState, o === null) return it(t), null;
          if (i = (t.flags & 128) !== 0, f = o.rendering, f === null)
            if (i) ti(o, !1);
            else {
              if (Qt !== Mc || e !== null && (e.flags & 128) !== 0)
                for (e = t.child; e !== null; ) {
                  if (f = ru(e), f !== null) {
                    for (t.flags |= 128, ti(o, !1), e = f.updateQueue, t.updateQueue = e, Xf(t, e), t.subtreeFlags = 0, e = a, a = t.child; a !== null; )
                      Uh(a, e), a = a.sibling;
                    return Se(
                      Tl,
                      Tl.current & Fd | Yy,
                      t
                    ), t.child;
                  }
                  e = e.sibling;
                }
              o.tail !== null && Bn() > q0 && (t.flags |= 128, i = !0, ti(o, !1), t.lanes = 4194304);
            }
          else {
            if (!i)
              if (e = ru(f), e !== null) {
                if (t.flags |= 128, i = !0, e = e.updateQueue, t.updateQueue = e, Xf(t, e), ti(o, !0), o.tail === null && o.tailMode === "hidden" && !f.alternate && !We)
                  return it(t), null;
              } else
                2 * Bn() - o.renderingStartTime > q0 && a !== 536870912 && (t.flags |= 128, i = !0, ti(o, !1), t.lanes = 4194304);
            o.isBackwards ? (f.sibling = t.child, t.child = f) : (e = o.last, e !== null ? e.sibling = f : t.child = f, o.last = f);
          }
          return o.tail !== null ? (e = o.tail, o.rendering = e, o.tail = e.sibling, o.renderingStartTime = Bn(), e.sibling = null, a = Tl.current, a = i ? a & Fd | Yy : a & Fd, Se(Tl, a, t), e) : (it(t), null);
        case 22:
        case 23:
          return fa(t), ka(t), i = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== i && (t.flags |= 8192) : i && (t.flags |= 8192), i ? (a & 536870912) !== 0 && (t.flags & 128) === 0 && (it(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : it(t), a = t.updateQueue, a !== null && Xf(t, a.retryQueue), a = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), i = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), i !== a && (t.flags |= 2048), e !== null && Ge(Ds, t), null;
        case 24:
          return a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), nu(bl, t), it(t), null;
        case 25:
          return null;
        case 30:
          return null;
      }
      throw Error(
        "Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue."
      );
    }
    function Yp(e, t) {
      switch (ir(t), t.tag) {
        case 1:
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & Yl) !== Tt && hn(t), t) : null;
        case 3:
          return nu(bl, t), Yt(t), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
        case 26:
        case 27:
        case 5:
          return W(t), null;
        case 13:
          if (fa(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
            if (t.alternate === null)
              throw Error(
                "Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue."
              );
            Qi();
          }
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & Yl) !== Tt && hn(t), t) : null;
        case 19:
          return Ge(Tl, t), null;
        case 4:
          return Yt(t), null;
        case 10:
          return nu(t.type, t), null;
        case 22:
        case 23:
          return fa(t), ka(t), e !== null && Ge(Ds, t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & Yl) !== Tt && hn(t), t) : null;
        case 24:
          return nu(bl, t), null;
        case 25:
          return null;
        default:
          return null;
      }
    }
    function cm(e, t) {
      switch (ir(t), t.tag) {
        case 3:
          nu(bl, t), Yt(t);
          break;
        case 26:
        case 27:
        case 5:
          W(t);
          break;
        case 4:
          Yt(t);
          break;
        case 13:
          fa(t);
          break;
        case 19:
          Ge(Tl, t);
          break;
        case 10:
          nu(t.type, t);
          break;
        case 22:
        case 23:
          fa(t), ka(t), e !== null && Ge(Ds, t);
          break;
        case 24:
          nu(bl, t);
      }
    }
    function Ia(e) {
      return (e.mode & Yl) !== Tt;
    }
    function om(e, t) {
      Ia(e) ? (Ja(), Pi(t, e), Ea()) : Pi(t, e);
    }
    function wr(e, t, a) {
      Ia(e) ? (Ja(), ec(
        a,
        e,
        t
      ), Ea()) : ec(
        a,
        e,
        t
      );
    }
    function Pi(e, t) {
      try {
        var a = t.updateQueue, i = a !== null ? a.lastEffect : null;
        if (i !== null) {
          var o = i.next;
          a = o;
          do {
            if ((a.tag & e) === e && ((e & Sl) !== Ln ? te !== null && typeof te.markComponentPassiveEffectMountStarted == "function" && te.markComponentPassiveEffectMountStarted(
              t
            ) : (e & wl) !== Ln && te !== null && typeof te.markComponentLayoutEffectMountStarted == "function" && te.markComponentLayoutEffectMountStarted(
              t
            ), i = void 0, (e & va) !== Ln && (ih = !0), i = ae(
              t,
              DS,
              a
            ), (e & va) !== Ln && (ih = !1), (e & Sl) !== Ln ? te !== null && typeof te.markComponentPassiveEffectMountStopped == "function" && te.markComponentPassiveEffectMountStopped() : (e & wl) !== Ln && te !== null && typeof te.markComponentLayoutEffectMountStopped == "function" && te.markComponentLayoutEffectMountStopped(), i !== void 0 && typeof i != "function")) {
              var f = void 0;
              f = (a.tag & wl) !== 0 ? "useLayoutEffect" : (a.tag & va) !== 0 ? "useInsertionEffect" : "useEffect";
              var d = void 0;
              d = i === null ? " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof i.then == "function" ? `

It looks like you wrote ` + f + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + f + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://react.dev/link/hooks-data-fetching` : " You returned: " + i, ae(
                t,
                function(h, p) {
                  console.error(
                    "%s must not return anything besides a function, which is used for clean-up.%s",
                    h,
                    p
                  );
                },
                f,
                d
              );
            }
            a = a.next;
          } while (a !== o);
        }
      } catch (h) {
        ye(t, t.return, h);
      }
    }
    function ec(e, t, a) {
      try {
        var i = t.updateQueue, o = i !== null ? i.lastEffect : null;
        if (o !== null) {
          var f = o.next;
          i = f;
          do {
            if ((i.tag & e) === e) {
              var d = i.inst, h = d.destroy;
              h !== void 0 && (d.destroy = void 0, (e & Sl) !== Ln ? te !== null && typeof te.markComponentPassiveEffectUnmountStarted == "function" && te.markComponentPassiveEffectUnmountStarted(
                t
              ) : (e & wl) !== Ln && te !== null && typeof te.markComponentLayoutEffectUnmountStarted == "function" && te.markComponentLayoutEffectUnmountStarted(
                t
              ), (e & va) !== Ln && (ih = !0), o = t, ae(
                o,
                OS,
                o,
                a,
                h
              ), (e & va) !== Ln && (ih = !1), (e & Sl) !== Ln ? te !== null && typeof te.markComponentPassiveEffectUnmountStopped == "function" && te.markComponentPassiveEffectUnmountStopped() : (e & wl) !== Ln && te !== null && typeof te.markComponentLayoutEffectUnmountStopped == "function" && te.markComponentLayoutEffectUnmountStopped());
            }
            i = i.next;
          } while (i !== f);
        }
      } catch (p) {
        ye(t, t.return, p);
      }
    }
    function fm(e, t) {
      Ia(e) ? (Ja(), Pi(t, e), Ea()) : Pi(t, e);
    }
    function Qf(e, t, a) {
      Ia(e) ? (Ja(), ec(
        a,
        e,
        t
      ), Ea()) : ec(
        a,
        e,
        t
      );
    }
    function sm(e) {
      var t = e.updateQueue;
      if (t !== null) {
        var a = e.stateNode;
        e.type.defaultProps || "ref" in e.memoizedProps || Pd || (a.props !== e.memoizedProps && console.error(
          "Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
          ce(e) || "instance"
        ), a.state !== e.memoizedState && console.error(
          "Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
          ce(e) || "instance"
        ));
        try {
          ae(
            e,
            Hp,
            t,
            a
          );
        } catch (i) {
          ye(e, e.return, i);
        }
      }
    }
    function wp(e, t, a) {
      return e.getSnapshotBeforeUpdate(t, a);
    }
    function vv(e, t) {
      var a = t.memoizedProps, i = t.memoizedState;
      t = e.stateNode, e.type.defaultProps || "ref" in e.memoizedProps || Pd || (t.props !== e.memoizedProps && console.error(
        "Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
        ce(e) || "instance"
      ), t.state !== e.memoizedState && console.error(
        "Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
        ce(e) || "instance"
      ));
      try {
        var o = ei(
          e.type,
          a,
          e.elementType === e.type
        ), f = ae(
          e,
          wp,
          t,
          o,
          i
        );
        a = Zb, f !== void 0 || a.has(e.type) || (a.add(e.type), ae(e, function() {
          console.error(
            "%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.",
            ce(e)
          );
        })), t.__reactInternalSnapshotBeforeUpdate = f;
      } catch (d) {
        ye(e, e.return, d);
      }
    }
    function Gr(e, t, a) {
      a.props = ei(
        e.type,
        e.memoizedProps
      ), a.state = e.memoizedState, Ia(e) ? (Ja(), ae(
        e,
        vb,
        e,
        t,
        a
      ), Ea()) : ae(
        e,
        vb,
        e,
        t,
        a
      );
    }
    function Gp(e) {
      var t = e.ref;
      if (t !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var a = e.stateNode;
            break;
          case 30:
            a = e.stateNode;
            break;
          default:
            a = e.stateNode;
        }
        if (typeof t == "function")
          if (Ia(e))
            try {
              Ja(), e.refCleanup = t(a);
            } finally {
              Ea();
            }
          else e.refCleanup = t(a);
        else
          typeof t == "string" ? console.error("String refs are no longer supported.") : t.hasOwnProperty("current") || console.error(
            "Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().",
            ce(e)
          ), t.current = a;
      }
    }
    function co(e, t) {
      try {
        ae(e, Gp, e);
      } catch (a) {
        ye(e, t, a);
      }
    }
    function Ca(e, t) {
      var a = e.ref, i = e.refCleanup;
      if (a !== null)
        if (typeof i == "function")
          try {
            if (Ia(e))
              try {
                Ja(), ae(e, i);
              } finally {
                Ea(e);
              }
            else ae(e, i);
          } catch (o) {
            ye(e, t, o);
          } finally {
            e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
          }
        else if (typeof a == "function")
          try {
            if (Ia(e))
              try {
                Ja(), ae(e, a, null);
              } finally {
                Ea(e);
              }
            else ae(e, a, null);
          } catch (o) {
            ye(e, t, o);
          }
        else a.current = null;
    }
    function rm(e, t, a, i) {
      var o = e.memoizedProps, f = o.id, d = o.onCommit;
      o = o.onRender, t = t === null ? "mount" : "update", A0 && (t = "nested-update"), typeof o == "function" && o(
        f,
        t,
        e.actualDuration,
        e.treeBaseDuration,
        e.actualStartTime,
        a
      ), typeof d == "function" && d(
        e.memoizedProps.id,
        t,
        i,
        a
      );
    }
    function Vp(e, t, a, i) {
      var o = e.memoizedProps;
      e = o.id, o = o.onPostCommit, t = t === null ? "mount" : "update", A0 && (t = "nested-update"), typeof o == "function" && o(
        e,
        t,
        i,
        a
      );
    }
    function Xp(e) {
      var t = e.type, a = e.memoizedProps, i = e.stateNode;
      try {
        ae(
          e,
          pu,
          i,
          t,
          a,
          e
        );
      } catch (o) {
        ye(e, e.return, o);
      }
    }
    function dm(e, t, a) {
      try {
        ae(
          e,
          Nt,
          e.stateNode,
          e.type,
          a,
          t,
          e
        );
      } catch (i) {
        ye(e, e.return, i);
      }
    }
    function hm(e) {
      return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Nn(e.type) || e.tag === 4;
    }
    function tc(e) {
      e: for (; ; ) {
        for (; e.sibling === null; ) {
          if (e.return === null || hm(e.return)) return null;
          e = e.return;
        }
        for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
          if (e.tag === 27 && Nn(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
          e.child.return = e, e = e.child;
        }
        if (!(e.flags & 2)) return e.stateNode;
      }
    }
    function Zf(e, t, a) {
      var i = e.tag;
      if (i === 5 || i === 6)
        e = e.stateNode, t ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(e, t) : (t = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, t.appendChild(e), a = a._reactRootContainer, a != null || t.onclick !== null || (t.onclick = yu));
      else if (i !== 4 && (i === 27 && Nn(e.type) && (a = e.stateNode, t = null), e = e.child, e !== null))
        for (Zf(e, t, a), e = e.sibling; e !== null; )
          Zf(e, t, a), e = e.sibling;
    }
    function lc(e, t, a) {
      var i = e.tag;
      if (i === 5 || i === 6)
        e = e.stateNode, t ? a.insertBefore(e, t) : a.appendChild(e);
      else if (i !== 4 && (i === 27 && Nn(e.type) && (a = e.stateNode), e = e.child, e !== null))
        for (lc(e, t, a), e = e.sibling; e !== null; )
          lc(e, t, a), e = e.sibling;
    }
    function Qp(e) {
      for (var t, a = e.return; a !== null; ) {
        if (hm(a)) {
          t = a;
          break;
        }
        a = a.return;
      }
      if (t == null)
        throw Error(
          "Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue."
        );
      switch (t.tag) {
        case 27:
          t = t.stateNode, a = tc(e), lc(
            e,
            a,
            t
          );
          break;
        case 5:
          a = t.stateNode, t.flags & 32 && (vu(a), t.flags &= -33), t = tc(e), lc(
            e,
            t,
            a
          );
          break;
        case 3:
        case 4:
          t = t.stateNode.containerInfo, a = tc(e), Zf(
            e,
            a,
            t
          );
          break;
        default:
          throw Error(
            "Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue."
          );
      }
    }
    function mm(e) {
      var t = e.stateNode, a = e.memoizedProps;
      try {
        ae(
          e,
          da,
          e.type,
          a,
          t,
          e
        );
      } catch (i) {
        ye(e, e.return, i);
      }
    }
    function Vr(e, t) {
      if (e = e.containerInfo, Tg = I0, e = Ep(e), zh(e)) {
        if ("selectionStart" in e)
          var a = {
            start: e.selectionStart,
            end: e.selectionEnd
          };
        else
          e: {
            a = (a = e.ownerDocument) && a.defaultView || window;
            var i = a.getSelection && a.getSelection();
            if (i && i.rangeCount !== 0) {
              a = i.anchorNode;
              var o = i.anchorOffset, f = i.focusNode;
              i = i.focusOffset;
              try {
                a.nodeType, f.nodeType;
              } catch {
                a = null;
                break e;
              }
              var d = 0, h = -1, p = -1, v = 0, H = 0, B = e, U = null;
              t: for (; ; ) {
                for (var Y; B !== a || o !== 0 && B.nodeType !== 3 || (h = d + o), B !== f || i !== 0 && B.nodeType !== 3 || (p = d + i), B.nodeType === 3 && (d += B.nodeValue.length), (Y = B.firstChild) !== null; )
                  U = B, B = Y;
                for (; ; ) {
                  if (B === e) break t;
                  if (U === a && ++v === o && (h = d), U === f && ++H === i && (p = d), (Y = B.nextSibling) !== null) break;
                  B = U, U = B.parentNode;
                }
                B = Y;
              }
              a = h === -1 || p === -1 ? null : { start: h, end: p };
            } else a = null;
          }
        a = a || { start: 0, end: 0 };
      } else a = null;
      for (xg = {
        focusedElem: e,
        selectionRange: a
      }, I0 = !1, Ml = t; Ml !== null; )
        if (t = Ml, e = t.child, (t.subtreeFlags & 1024) !== 0 && e !== null)
          e.return = t, Ml = e;
        else
          for (; Ml !== null; ) {
            switch (e = t = Ml, a = e.alternate, o = e.flags, e.tag) {
              case 0:
                break;
              case 11:
              case 15:
                break;
              case 1:
                (o & 1024) !== 0 && a !== null && vv(e, a);
                break;
              case 3:
                if ((o & 1024) !== 0) {
                  if (e = e.stateNode.containerInfo, a = e.nodeType, a === 9)
                    bo(e);
                  else if (a === 1)
                    switch (e.nodeName) {
                      case "HEAD":
                      case "HTML":
                      case "BODY":
                        bo(e);
                        break;
                      default:
                        e.textContent = "";
                    }
                }
                break;
              case 5:
              case 26:
              case 27:
              case 6:
              case 4:
              case 17:
                break;
              default:
                if ((o & 1024) !== 0)
                  throw Error(
                    "This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue."
                  );
            }
            if (e = t.sibling, e !== null) {
              e.return = t.return, Ml = e;
              break;
            }
            Ml = t.return;
          }
    }
    function ym(e, t, a) {
      var i = a.flags;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          An(e, a), i & 4 && om(a, wl | Jn);
          break;
        case 1:
          if (An(e, a), i & 4)
            if (e = a.stateNode, t === null)
              a.type.defaultProps || "ref" in a.memoizedProps || Pd || (e.props !== a.memoizedProps && console.error(
                "Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
                ce(a) || "instance"
              ), e.state !== a.memoizedState && console.error(
                "Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
                ce(a) || "instance"
              )), Ia(a) ? (Ja(), ae(
                a,
                $v,
                a,
                e
              ), Ea()) : ae(
                a,
                $v,
                a,
                e
              );
            else {
              var o = ei(
                a.type,
                t.memoizedProps
              );
              t = t.memoizedState, a.type.defaultProps || "ref" in a.memoizedProps || Pd || (e.props !== a.memoizedProps && console.error(
                "Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
                ce(a) || "instance"
              ), e.state !== a.memoizedState && console.error(
                "Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
                ce(a) || "instance"
              )), Ia(a) ? (Ja(), ae(
                a,
                mb,
                a,
                e,
                o,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              ), Ea()) : ae(
                a,
                mb,
                a,
                e,
                o,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            }
          i & 64 && sm(a), i & 512 && co(a, a.return);
          break;
        case 3:
          if (t = La(), An(e, a), i & 64 && (i = a.updateQueue, i !== null)) {
            if (o = null, a.child !== null)
              switch (a.child.tag) {
                case 27:
                case 5:
                  o = a.child.stateNode;
                  break;
                case 1:
                  o = a.child.stateNode;
              }
            try {
              ae(
                a,
                Hp,
                i,
                o
              );
            } catch (d) {
              ye(a, a.return, d);
            }
          }
          e.effectDuration += Lu(t);
          break;
        case 27:
          t === null && i & 4 && mm(a);
        case 26:
        case 5:
          An(e, a), t === null && i & 4 && Xp(a), i & 512 && co(a, a.return);
          break;
        case 12:
          if (i & 4) {
            i = La(), An(e, a), e = a.stateNode, e.effectDuration += Li(i);
            try {
              ae(
                a,
                rm,
                a,
                t,
                E0,
                e.effectDuration
              );
            } catch (d) {
              ye(a, a.return, d);
            }
          } else An(e, a);
          break;
        case 13:
          An(e, a), i & 4 && oo(e, a), i & 64 && (e = a.memoizedState, e !== null && (e = e.dehydrated, e !== null && (a = If.bind(
            null,
            a
          ), So(e, a))));
          break;
        case 22:
          if (i = a.memoizedState !== null || Oc, !i) {
            t = t !== null && t.memoizedState !== null || Ft, o = Oc;
            var f = Ft;
            Oc = i, (Ft = t) && !f ? Rn(
              e,
              a,
              (a.subtreeFlags & 8772) !== 0
            ) : An(e, a), Oc = o, Ft = f;
          }
          break;
        case 30:
          break;
        default:
          An(e, a);
      }
    }
    function pm(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, pm(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && qc(t)), e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
    }
    function du(e, t, a) {
      for (a = a.child; a !== null; )
        ac(
          e,
          t,
          a
        ), a = a.sibling;
    }
    function ac(e, t, a) {
      if (vl && typeof vl.onCommitFiberUnmount == "function")
        try {
          vl.onCommitFiberUnmount(mi, a);
        } catch (f) {
          Pl || (Pl = !0, console.error(
            "React instrumentation encountered an error: %s",
            f
          ));
        }
      switch (a.tag) {
        case 26:
          Ft || Ca(a, t), du(
            e,
            t,
            a
          ), a.memoizedState ? a.memoizedState.count-- : a.stateNode && (a = a.stateNode, a.parentNode.removeChild(a));
          break;
        case 27:
          Ft || Ca(a, t);
          var i = cl, o = wa;
          Nn(a.type) && (cl = a.stateNode, wa = !1), du(
            e,
            t,
            a
          ), ae(
            a,
            xo,
            a.stateNode
          ), cl = i, wa = o;
          break;
        case 5:
          Ft || Ca(a, t);
        case 6:
          if (i = cl, o = wa, cl = null, du(
            e,
            t,
            a
          ), cl = i, wa = o, cl !== null)
            if (wa)
              try {
                ae(
                  a,
                  vo,
                  cl,
                  a.stateNode
                );
              } catch (f) {
                ye(
                  a,
                  t,
                  f
                );
              }
            else
              try {
                ae(
                  a,
                  ja,
                  cl,
                  a.stateNode
                );
              } catch (f) {
                ye(
                  a,
                  t,
                  f
                );
              }
          break;
        case 18:
          cl !== null && (wa ? (e = cl, go(
            e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
            a.stateNode
          ), pc(e)) : go(cl, a.stateNode));
          break;
        case 4:
          i = cl, o = wa, cl = a.stateNode.containerInfo, wa = !0, du(
            e,
            t,
            a
          ), cl = i, wa = o;
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          Ft || ec(
            va,
            a,
            t
          ), Ft || wr(
            a,
            t,
            wl
          ), du(
            e,
            t,
            a
          );
          break;
        case 1:
          Ft || (Ca(a, t), i = a.stateNode, typeof i.componentWillUnmount == "function" && Gr(
            a,
            t,
            i
          )), du(
            e,
            t,
            a
          );
          break;
        case 21:
          du(
            e,
            t,
            a
          );
          break;
        case 22:
          Ft = (i = Ft) || a.memoizedState !== null, du(
            e,
            t,
            a
          ), Ft = i;
          break;
        default:
          du(
            e,
            t,
            a
          );
      }
    }
    function oo(e, t) {
      if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
        try {
          ae(
            t,
            ra,
            e
          );
        } catch (a) {
          ye(t, t.return, a);
        }
    }
    function Xr(e) {
      switch (e.tag) {
        case 13:
        case 19:
          var t = e.stateNode;
          return t === null && (t = e.stateNode = new Lb()), t;
        case 22:
          return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Lb()), t;
        default:
          throw Error(
            "Unexpected Suspense handler tag (" + e.tag + "). This is a bug in React."
          );
      }
    }
    function nc(e, t) {
      var a = Xr(e);
      t.forEach(function(i) {
        var o = ui.bind(null, e, i);
        if (!a.has(i)) {
          if (a.add(i), _t)
            if (eh !== null && th !== null)
              yo(th, eh);
            else
              throw Error(
                "Expected finished root and lanes to be set. This is a bug in React."
              );
          i.then(o, o);
        }
      });
    }
    function Al(e, t) {
      var a = t.deletions;
      if (a !== null)
        for (var i = 0; i < a.length; i++) {
          var o = e, f = t, d = a[i], h = f;
          e: for (; h !== null; ) {
            switch (h.tag) {
              case 27:
                if (Nn(h.type)) {
                  cl = h.stateNode, wa = !1;
                  break e;
                }
                break;
              case 5:
                cl = h.stateNode, wa = !1;
                break e;
              case 3:
              case 4:
                cl = h.stateNode.containerInfo, wa = !0;
                break e;
            }
            h = h.return;
          }
          if (cl === null)
            throw Error(
              "Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue."
            );
          ac(o, f, d), cl = null, wa = !1, o = d, f = o.alternate, f !== null && (f.return = null), o.return = null;
        }
      if (t.subtreeFlags & 13878)
        for (t = t.child; t !== null; )
          vm(t, e), t = t.sibling;
    }
    function vm(e, t) {
      var a = e.alternate, i = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Al(t, e), kl(e), i & 4 && (ec(
            va | Jn,
            e,
            e.return
          ), Pi(va | Jn, e), wr(
            e,
            e.return,
            wl | Jn
          ));
          break;
        case 1:
          Al(t, e), kl(e), i & 512 && (Ft || a === null || Ca(a, a.return)), i & 64 && Oc && (e = e.updateQueue, e !== null && (i = e.callbacks, i !== null && (a = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = a === null ? i : a.concat(i))));
          break;
        case 26:
          var o = Mu;
          if (Al(t, e), kl(e), i & 512 && (Ft || a === null || Ca(a, a.return)), i & 4)
            if (t = a !== null ? a.memoizedState : null, i = e.memoizedState, a === null)
              if (i === null)
                if (e.stateNode === null) {
                  e: {
                    i = e.type, a = e.memoizedProps, t = o.ownerDocument || o;
                    t: switch (i) {
                      case "title":
                        o = t.getElementsByTagName("title")[0], (!o || o[No] || o[Dl] || o.namespaceURI === Bo || o.hasAttribute("itemprop")) && (o = t.createElement(i), t.head.insertBefore(
                          o,
                          t.querySelector("head > title")
                        )), Ht(o, i, a), o[Dl] = e, Pt(o), i = o;
                        break e;
                      case "link":
                        var f = $m(
                          "link",
                          "href",
                          t
                        ).get(i + (a.href || ""));
                        if (f) {
                          for (var d = 0; d < f.length; d++)
                            if (o = f[d], o.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && o.getAttribute("rel") === (a.rel == null ? null : a.rel) && o.getAttribute("title") === (a.title == null ? null : a.title) && o.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                              f.splice(d, 1);
                              break t;
                            }
                        }
                        o = t.createElement(i), Ht(o, i, a), t.head.appendChild(o);
                        break;
                      case "meta":
                        if (f = $m(
                          "meta",
                          "content",
                          t
                        ).get(i + (a.content || ""))) {
                          for (d = 0; d < f.length; d++)
                            if (o = f[d], I(
                              a.content,
                              "content"
                            ), o.getAttribute("content") === (a.content == null ? null : "" + a.content) && o.getAttribute("name") === (a.name == null ? null : a.name) && o.getAttribute("property") === (a.property == null ? null : a.property) && o.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && o.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                              f.splice(d, 1);
                              break t;
                            }
                        }
                        o = t.createElement(i), Ht(o, i, a), t.head.appendChild(o);
                        break;
                      default:
                        throw Error(
                          'getNodesForType encountered a type it did not expect: "' + i + '". This is a bug in React.'
                        );
                    }
                    o[Dl] = e, Pt(o), i = o;
                  }
                  e.stateNode = i;
                } else
                  Wm(
                    o,
                    e.type,
                    e.stateNode
                  );
              else
                e.stateNode = rd(
                  o,
                  i,
                  e.memoizedProps
                );
            else
              t !== i ? (t === null ? a.stateNode !== null && (a = a.stateNode, a.parentNode.removeChild(a)) : t.count--, i === null ? Wm(
                o,
                e.type,
                e.stateNode
              ) : rd(
                o,
                i,
                e.memoizedProps
              )) : i === null && e.stateNode !== null && dm(
                e,
                e.memoizedProps,
                a.memoizedProps
              );
          break;
        case 27:
          Al(t, e), kl(e), i & 512 && (Ft || a === null || Ca(a, a.return)), a !== null && i & 4 && dm(
            e,
            e.memoizedProps,
            a.memoizedProps
          );
          break;
        case 5:
          if (Al(t, e), kl(e), i & 512 && (Ft || a === null || Ca(a, a.return)), e.flags & 32) {
            t = e.stateNode;
            try {
              ae(e, vu, t);
            } catch (H) {
              ye(e, e.return, H);
            }
          }
          i & 4 && e.stateNode != null && (t = e.memoizedProps, dm(
            e,
            t,
            a !== null ? a.memoizedProps : t
          )), i & 1024 && (lg = !0, e.type !== "form" && console.error(
            "Unexpected host component type. Expected a form. This is a bug in React."
          ));
          break;
        case 6:
          if (Al(t, e), kl(e), i & 4) {
            if (e.stateNode === null)
              throw Error(
                "This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue."
              );
            i = e.memoizedProps, a = a !== null ? a.memoizedProps : i, t = e.stateNode;
            try {
              ae(
                e,
                dc,
                t,
                a,
                i
              );
            } catch (H) {
              ye(e, e.return, H);
            }
          }
          break;
        case 3:
          if (o = La(), $0 = null, f = Mu, Mu = es(t.containerInfo), Al(t, e), Mu = f, kl(e), i & 4 && a !== null && a.memoizedState.isDehydrated)
            try {
              ae(
                e,
                Zm,
                t.containerInfo
              );
            } catch (H) {
              ye(e, e.return, H);
            }
          lg && (lg = !1, uc(e)), t.effectDuration += Lu(o);
          break;
        case 4:
          i = Mu, Mu = es(
            e.stateNode.containerInfo
          ), Al(t, e), kl(e), Mu = i;
          break;
        case 12:
          i = La(), Al(t, e), kl(e), e.stateNode.effectDuration += Li(i);
          break;
        case 13:
          Al(t, e), kl(e), e.child.flags & 8192 && e.memoizedState !== null != (a !== null && a.memoizedState !== null) && (og = Bn()), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, nc(e, i)));
          break;
        case 22:
          o = e.memoizedState !== null;
          var h = a !== null && a.memoizedState !== null, p = Oc, v = Ft;
          if (Oc = p || o, Ft = v || h, Al(t, e), Ft = v, Oc = p, kl(e), i & 8192)
            e: for (t = e.stateNode, t._visibility = o ? t._visibility & ~b0 : t._visibility | b0, o && (a === null || h || Oc || Ft || Rl(e)), a = null, t = e; ; ) {
              if (t.tag === 5 || t.tag === 26) {
                if (a === null) {
                  h = a = t;
                  try {
                    f = h.stateNode, o ? ae(h, Fl, f) : ae(
                      h,
                      Xm,
                      h.stateNode,
                      h.memoizedProps
                    );
                  } catch (H) {
                    ye(h, h.return, H);
                  }
                }
              } else if (t.tag === 6) {
                if (a === null) {
                  h = t;
                  try {
                    d = h.stateNode, o ? ae(h, Vm, d) : ae(
                      h,
                      od,
                      d,
                      h.memoizedProps
                    );
                  } catch (H) {
                    ye(h, h.return, H);
                  }
                }
              } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
                t.child.return = t, t = t.child;
                continue;
              }
              if (t === e) break e;
              for (; t.sibling === null; ) {
                if (t.return === null || t.return === e)
                  break e;
                a === t && (a = null), t = t.return;
              }
              a === t && (a = null), t.sibling.return = t.return, t = t.sibling;
            }
          i & 4 && (i = e.updateQueue, i !== null && (a = i.retryQueue, a !== null && (i.retryQueue = null, nc(e, a))));
          break;
        case 19:
          Al(t, e), kl(e), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, nc(e, i)));
          break;
        case 30:
          break;
        case 21:
          break;
        default:
          Al(t, e), kl(e);
      }
    }
    function kl(e) {
      var t = e.flags;
      if (t & 2) {
        try {
          ae(e, Qp, e);
        } catch (a) {
          ye(e, e.return, a);
        }
        e.flags &= -3;
      }
      t & 4096 && (e.flags &= -4097);
    }
    function uc(e) {
      if (e.subtreeFlags & 1024)
        for (e = e.child; e !== null; ) {
          var t = e;
          uc(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
        }
    }
    function An(e, t) {
      if (t.subtreeFlags & 8772)
        for (t = t.child; t !== null; )
          ym(e, t.alternate, t), t = t.sibling;
    }
    function sa(e) {
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          wr(
            e,
            e.return,
            wl
          ), Rl(e);
          break;
        case 1:
          Ca(e, e.return);
          var t = e.stateNode;
          typeof t.componentWillUnmount == "function" && Gr(
            e,
            e.return,
            t
          ), Rl(e);
          break;
        case 27:
          ae(
            e,
            xo,
            e.stateNode
          );
        case 26:
        case 5:
          Ca(e, e.return), Rl(e);
          break;
        case 22:
          e.memoizedState === null && Rl(e);
          break;
        case 30:
          Rl(e);
          break;
        default:
          Rl(e);
      }
    }
    function Rl(e) {
      for (e = e.child; e !== null; )
        sa(e), e = e.sibling;
    }
    function hu(e, t, a, i) {
      var o = a.flags;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          Rn(
            e,
            a,
            i
          ), om(a, wl);
          break;
        case 1:
          if (Rn(
            e,
            a,
            i
          ), t = a.stateNode, typeof t.componentDidMount == "function" && ae(
            a,
            $v,
            a,
            t
          ), t = a.updateQueue, t !== null) {
            e = a.stateNode;
            try {
              ae(
                a,
                kc,
                t,
                e
              );
            } catch (f) {
              ye(a, a.return, f);
            }
          }
          i && o & 64 && sm(a), co(a, a.return);
          break;
        case 27:
          mm(a);
        case 26:
        case 5:
          Rn(
            e,
            a,
            i
          ), i && t === null && o & 4 && Xp(a), co(a, a.return);
          break;
        case 12:
          if (i && o & 4) {
            o = La(), Rn(
              e,
              a,
              i
            ), i = a.stateNode, i.effectDuration += Li(o);
            try {
              ae(
                a,
                rm,
                a,
                t,
                E0,
                i.effectDuration
              );
            } catch (f) {
              ye(a, a.return, f);
            }
          } else
            Rn(
              e,
              a,
              i
            );
          break;
        case 13:
          Rn(
            e,
            a,
            i
          ), i && o & 4 && oo(e, a);
          break;
        case 22:
          a.memoizedState === null && Rn(
            e,
            a,
            i
          ), co(a, a.return);
          break;
        case 30:
          break;
        default:
          Rn(
            e,
            a,
            i
          );
      }
    }
    function Rn(e, t, a) {
      for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; )
        hu(
          e,
          t.alternate,
          t,
          a
        ), t = t.sibling;
    }
    function zn(e, t) {
      var a = null;
      e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== a && (e != null && Zi(e), a != null && dn(a));
    }
    function Pa(e, t) {
      e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (Zi(t), e != null && dn(e));
    }
    function ct(e, t, a, i) {
      if (t.subtreeFlags & 10256)
        for (t = t.child; t !== null; )
          Lf(
            e,
            t,
            a,
            i
          ), t = t.sibling;
    }
    function Lf(e, t, a, i) {
      var o = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          ct(
            e,
            t,
            a,
            i
          ), o & 2048 && fm(t, Sl | Jn);
          break;
        case 1:
          ct(
            e,
            t,
            a,
            i
          );
          break;
        case 3:
          var f = La();
          ct(
            e,
            t,
            a,
            i
          ), o & 2048 && (a = null, t.alternate !== null && (a = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== a && (Zi(t), a != null && dn(a))), e.passiveEffectDuration += Lu(f);
          break;
        case 12:
          if (o & 2048) {
            o = La(), ct(
              e,
              t,
              a,
              i
            ), e = t.stateNode, e.passiveEffectDuration += Li(o);
            try {
              ae(
                t,
                Vp,
                t,
                t.alternate,
                E0,
                e.passiveEffectDuration
              );
            } catch (h) {
              ye(t, t.return, h);
            }
          } else
            ct(
              e,
              t,
              a,
              i
            );
          break;
        case 13:
          ct(
            e,
            t,
            a,
            i
          );
          break;
        case 23:
          break;
        case 22:
          f = t.stateNode;
          var d = t.alternate;
          t.memoizedState !== null ? f._visibility & xc ? ct(
            e,
            t,
            a,
            i
          ) : fo(
            e,
            t
          ) : f._visibility & xc ? ct(
            e,
            t,
            a,
            i
          ) : (f._visibility |= xc, li(
            e,
            t,
            a,
            i,
            (t.subtreeFlags & 10256) !== 0
          )), o & 2048 && zn(d, t);
          break;
        case 24:
          ct(
            e,
            t,
            a,
            i
          ), o & 2048 && Pa(t.alternate, t);
          break;
        default:
          ct(
            e,
            t,
            a,
            i
          );
      }
    }
    function li(e, t, a, i, o) {
      for (o = o && (t.subtreeFlags & 10256) !== 0, t = t.child; t !== null; )
        Qr(
          e,
          t,
          a,
          i,
          o
        ), t = t.sibling;
    }
    function Qr(e, t, a, i, o) {
      var f = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          li(
            e,
            t,
            a,
            i,
            o
          ), fm(t, Sl);
          break;
        case 23:
          break;
        case 22:
          var d = t.stateNode;
          t.memoizedState !== null ? d._visibility & xc ? li(
            e,
            t,
            a,
            i,
            o
          ) : fo(
            e,
            t
          ) : (d._visibility |= xc, li(
            e,
            t,
            a,
            i,
            o
          )), o && f & 2048 && zn(
            t.alternate,
            t
          );
          break;
        case 24:
          li(
            e,
            t,
            a,
            i,
            o
          ), o && f & 2048 && Pa(t.alternate, t);
          break;
        default:
          li(
            e,
            t,
            a,
            i,
            o
          );
      }
    }
    function fo(e, t) {
      if (t.subtreeFlags & 10256)
        for (t = t.child; t !== null; ) {
          var a = e, i = t, o = i.flags;
          switch (i.tag) {
            case 22:
              fo(
                a,
                i
              ), o & 2048 && zn(
                i.alternate,
                i
              );
              break;
            case 24:
              fo(
                a,
                i
              ), o & 2048 && Pa(
                i.alternate,
                i
              );
              break;
            default:
              fo(
                a,
                i
              );
          }
          t = t.sibling;
        }
    }
    function ic(e) {
      if (e.subtreeFlags & wy)
        for (e = e.child; e !== null; )
          ai(e), e = e.sibling;
    }
    function ai(e) {
      switch (e.tag) {
        case 26:
          ic(e), e.flags & wy && e.memoizedState !== null && e0(
            Mu,
            e.memoizedState,
            e.memoizedProps
          );
          break;
        case 5:
          ic(e);
          break;
        case 3:
        case 4:
          var t = Mu;
          Mu = es(
            e.stateNode.containerInfo
          ), ic(e), Mu = t;
          break;
        case 22:
          e.memoizedState === null && (t = e.alternate, t !== null && t.memoizedState !== null ? (t = wy, wy = 16777216, ic(e), wy = t) : ic(e));
          break;
        default:
          ic(e);
      }
    }
    function Jf(e) {
      var t = e.alternate;
      if (t !== null && (e = t.child, e !== null)) {
        t.child = null;
        do
          t = e.sibling, e.sibling = null, e = t;
        while (e !== null);
      }
    }
    function so(e) {
      var t = e.deletions;
      if ((e.flags & 16) !== 0) {
        if (t !== null)
          for (var a = 0; a < t.length; a++) {
            var i = t[a];
            Ml = i, bm(
              i,
              e
            );
          }
        Jf(e);
      }
      if (e.subtreeFlags & 10256)
        for (e = e.child; e !== null; )
          gm(e), e = e.sibling;
    }
    function gm(e) {
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          so(e), e.flags & 2048 && Qf(
            e,
            e.return,
            Sl | Jn
          );
          break;
        case 3:
          var t = La();
          so(e), e.stateNode.passiveEffectDuration += Lu(t);
          break;
        case 12:
          t = La(), so(e), e.stateNode.passiveEffectDuration += Li(t);
          break;
        case 22:
          t = e.stateNode, e.memoizedState !== null && t._visibility & xc && (e.return === null || e.return.tag !== 13) ? (t._visibility &= ~xc, Kf(e)) : so(e);
          break;
        default:
          so(e);
      }
    }
    function Kf(e) {
      var t = e.deletions;
      if ((e.flags & 16) !== 0) {
        if (t !== null)
          for (var a = 0; a < t.length; a++) {
            var i = t[a];
            Ml = i, bm(
              i,
              e
            );
          }
        Jf(e);
      }
      for (e = e.child; e !== null; )
        kf(e), e = e.sibling;
    }
    function kf(e) {
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          Qf(
            e,
            e.return,
            Sl
          ), Kf(e);
          break;
        case 22:
          var t = e.stateNode;
          t._visibility & xc && (t._visibility &= ~xc, Kf(e));
          break;
        default:
          Kf(e);
      }
    }
    function bm(e, t) {
      for (; Ml !== null; ) {
        var a = Ml, i = a;
        switch (i.tag) {
          case 0:
          case 11:
          case 15:
            Qf(
              i,
              t,
              Sl
            );
            break;
          case 23:
          case 22:
            i.memoizedState !== null && i.memoizedState.cachePool !== null && (i = i.memoizedState.cachePool.pool, i != null && Zi(i));
            break;
          case 24:
            dn(i.memoizedState.cache);
        }
        if (i = a.child, i !== null) i.return = a, Ml = i;
        else
          e: for (a = e; Ml !== null; ) {
            i = Ml;
            var o = i.sibling, f = i.return;
            if (pm(i), i === a) {
              Ml = null;
              break e;
            }
            if (o !== null) {
              o.return = f, Ml = o;
              break e;
            }
            Ml = f;
          }
      }
    }
    function Sm() {
      US.forEach(function(e) {
        return e();
      });
    }
    function Tm() {
      var e = typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0;
      return e || _.actQueue === null || console.error(
        "The current testing environment is not configured to support act(...)"
      ), e;
    }
    function $l(e) {
      if ((nt & ga) !== an && we !== 0)
        return we & -we;
      var t = _.T;
      return t !== null ? (t._updatedFibers || (t._updatedFibers = /* @__PURE__ */ new Set()), t._updatedFibers.add(e), e = zs, e !== 0 ? e : Um()) : op();
    }
    function Zp() {
      un === 0 && (un = (we & 536870912) === 0 || We ? rh() : 536870912);
      var e = kn.current;
      return e !== null && (e.flags |= 32), un;
    }
    function Ut(e, t, a) {
      if (ih && console.error("useInsertionEffect must not schedule updates."), hg && (B0 = !0), (e === pt && (ot === Cs || ot === Hs) || e.cancelPendingCommit !== null) && (oc(e, 0), mu(
        e,
        we,
        un,
        !1
      )), jc(e, a), (nt & ga) !== 0 && e === pt) {
        if (ta)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              e = Ye && ce(Ye) || "Unknown", t1.has(e) || (t1.add(e), t = ce(t) || "Unknown", console.error(
                "Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://react.dev/link/setstate-in-render",
                t,
                e,
                e
              ));
              break;
            case 1:
              e1 || (console.error(
                "Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."
              ), e1 = !0);
          }
      } else
        _t && Fn(e, t, a), kp(t), e === pt && ((nt & ga) === an && (Zo |= a), Qt === Us && mu(
          e,
          we,
          un,
          !1
        )), Ha(e);
    }
    function $t(e, t, a) {
      if ((nt & (ga | Uu)) !== an)
        throw Error("Should not already be working.");
      var i = !a && (t & 124) === 0 && (t & e.expiredLanes) === 0 || Po(e, t), o = i ? Em(e, t) : Kr(e, t, !0), f = i;
      do {
        if (o === Mc) {
          nh && !i && mu(e, t, 0, !1);
          break;
        } else {
          if (a = e.current.alternate, f && !Lp(a)) {
            o = Kr(e, t, !1), f = !1;
            continue;
          }
          if (o === lh) {
            if (f = t, e.errorRecoveryDisabledLanes & f)
              var d = 0;
            else
              d = e.pendingLanes & -536870913, d = d !== 0 ? d : d & 536870912 ? 536870912 : 0;
            if (d !== 0) {
              t = d;
              e: {
                o = e;
                var h = d;
                d = Ly;
                var p = o.current.memoizedState.isDehydrated;
                if (p && (oc(
                  o,
                  h
                ).flags |= 256), h = Kr(
                  o,
                  h,
                  !1
                ), h !== lh) {
                  if (ig && !p) {
                    o.errorRecoveryDisabledLanes |= f, Zo |= f, o = Us;
                    break e;
                  }
                  o = ba, ba = d, o !== null && (ba === null ? ba = o : ba.push.apply(
                    ba,
                    o
                  ));
                }
                o = h;
              }
              if (f = !1, o !== lh) continue;
            }
          }
          if (o === Vy) {
            oc(e, 0), mu(e, t, 0, !0);
            break;
          }
          e: {
            switch (i = e, o) {
              case Mc:
              case Vy:
                throw Error("Root did not complete. This is a bug in React.");
              case Us:
                if ((t & 4194048) !== t) break;
              case j0:
                mu(
                  i,
                  t,
                  un,
                  !Xo
                );
                break e;
              case lh:
                ba = null;
                break;
              case ag:
              case Jb:
                break;
              default:
                throw Error("Unknown root exit status.");
            }
            if (_.actQueue !== null)
              Ir(
                i,
                a,
                t,
                ba,
                Jy,
                _0,
                un,
                Zo,
                Ns
              );
            else {
              if ((t & 62914560) === t && (f = og + kb - Bn(), 10 < f)) {
                if (mu(
                  i,
                  t,
                  un,
                  !Xo
                ), aa(i, 0, !0) !== 0) break e;
                i.timeoutHandle = f1(
                  al.bind(
                    null,
                    i,
                    a,
                    ba,
                    Jy,
                    _0,
                    t,
                    un,
                    Zo,
                    Ns,
                    Xo,
                    o,
                    jS,
                    Wg,
                    0
                  ),
                  f
                );
                break e;
              }
              al(
                i,
                a,
                ba,
                Jy,
                _0,
                t,
                un,
                Zo,
                Ns,
                Xo,
                o,
                HS,
                Wg,
                0
              );
            }
          }
        }
        break;
      } while (!0);
      Ha(e);
    }
    function al(e, t, a, i, o, f, d, h, p, v, H, B, U, Y) {
      if (e.timeoutHandle = Ys, B = t.subtreeFlags, (B & 8192 || (B & 16785408) === 16785408) && (Iy = { stylesheets: null, count: 0, unsuspend: Pp }, ai(t), B = t0(), B !== null)) {
        e.cancelPendingCommit = B(
          Ir.bind(
            null,
            e,
            t,
            f,
            a,
            i,
            o,
            d,
            h,
            p,
            H,
            NS,
            U,
            Y
          )
        ), mu(
          e,
          f,
          d,
          !v
        );
        return;
      }
      Ir(
        e,
        t,
        f,
        a,
        i,
        o,
        d,
        h,
        p
      );
    }
    function Lp(e) {
      for (var t = e; ; ) {
        var a = t.tag;
        if ((a === 0 || a === 11 || a === 15) && t.flags & 16384 && (a = t.updateQueue, a !== null && (a = a.stores, a !== null)))
          for (var i = 0; i < a.length; i++) {
            var o = a[i], f = o.getSnapshot;
            o = o.value;
            try {
              if (!ya(f(), o)) return !1;
            } catch {
              return !1;
            }
          }
        if (a = t.child, t.subtreeFlags & 16384 && a !== null)
          a.return = t, t = a;
        else {
          if (t === e) break;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) return !0;
            t = t.return;
          }
          t.sibling.return = t.return, t = t.sibling;
        }
      }
      return !0;
    }
    function mu(e, t, a, i) {
      t &= ~cg, t &= ~Zo, e.suspendedLanes |= t, e.pingedLanes &= ~t, i && (e.warmLanes |= t), i = e.expirationTimes;
      for (var o = t; 0 < o; ) {
        var f = 31 - zl(o), d = 1 << f;
        i[f] = -1, o &= ~d;
      }
      a !== 0 && cp(e, a, t);
    }
    function cc() {
      return (nt & (ga | Uu)) === an ? (fc(0), !1) : !0;
    }
    function Zr() {
      if (Ye !== null) {
        if (ot === Ga)
          var e = Ye.return;
        else
          e = Ye, cr(), $a(e), $d = null, By = 0, e = Ye;
        for (; e !== null; )
          cm(e.alternate, e), e = e.return;
        Ye = null;
      }
    }
    function oc(e, t) {
      var a = e.timeoutHandle;
      a !== Ys && (e.timeoutHandle = Ys, KS(a)), a = e.cancelPendingCommit, a !== null && (e.cancelPendingCommit = null, a()), Zr(), pt = e, Ye = a = sn(e.current, null), we = t, ot = Ga, nn = null, Xo = !1, nh = Po(e, t), ig = !1, Qt = Mc, Ns = un = cg = Zo = Qo = 0, ba = Ly = null, _0 = !1, (t & 8) !== 0 && (t |= t & 32);
      var i = e.entangledLanes;
      if (i !== 0)
        for (e = e.entanglements, i &= t; 0 < i; ) {
          var o = 31 - zl(i), f = 1 << o;
          t |= e[o], i &= ~f;
        }
      return Ei = t, yf(), t = kg(), 1e3 < t - Kg && (_.recentlyCreatedOwnerStacks = 0, Kg = t), Du.discardPendingWarnings(), a;
    }
    function $f(e, t) {
      xe = null, _.H = H0, _.getCurrentStack = null, ta = !1, ma = null, t === Ny || t === D0 ? (t = Zh(), ot = Qy) : t === Pg ? (t = Zh(), ot = Kb) : ot = t === Bb ? ug : t !== null && typeof t == "object" && typeof t.then == "function" ? ah : Xy, nn = t;
      var a = Ye;
      if (a === null)
        Qt = Vy, io(
          e,
          ia(t, e.current)
        );
      else
        switch (a.mode & Yl && uu(a), Ta(), ot) {
          case Xy:
            te !== null && typeof te.markComponentErrored == "function" && te.markComponentErrored(
              a,
              t,
              we
            );
            break;
          case Cs:
          case Hs:
          case Qy:
          case ah:
          case Zy:
            te !== null && typeof te.markComponentSuspended == "function" && te.markComponentSuspended(
              a,
              t,
              we
            );
        }
    }
    function Lr() {
      var e = _.H;
      return _.H = H0, e === null ? H0 : e;
    }
    function xm() {
      var e = _.A;
      return _.A = MS, e;
    }
    function Jr() {
      Qt = Us, Xo || (we & 4194048) !== we && kn.current !== null || (nh = !0), (Qo & 134217727) === 0 && (Zo & 134217727) === 0 || pt === null || mu(
        pt,
        we,
        un,
        !1
      );
    }
    function Kr(e, t, a) {
      var i = nt;
      nt |= ga;
      var o = Lr(), f = xm();
      if (pt !== e || we !== t) {
        if (_t) {
          var d = e.memoizedUpdaters;
          0 < d.size && (yo(e, we), d.clear()), Vl(e, t);
        }
        Jy = null, oc(e, t);
      }
      Ai(t), t = !1, d = Qt;
      e: do
        try {
          if (ot !== Ga && Ye !== null) {
            var h = Ye, p = nn;
            switch (ot) {
              case ug:
                Zr(), d = j0;
                break e;
              case Qy:
              case Cs:
              case Hs:
              case ah:
                kn.current === null && (t = !0);
                var v = ot;
                if (ot = Ga, nn = null, ni(e, h, p, v), a && nh) {
                  d = Mc;
                  break e;
                }
                break;
              default:
                v = ot, ot = Ga, nn = null, ni(e, h, p, v);
            }
          }
          kr(), d = Qt;
          break;
        } catch (H) {
          $f(e, H);
        }
      while (!0);
      return t && e.shellSuspendCounter++, cr(), nt = i, _.H = o, _.A = f, Vs(), Ye === null && (pt = null, we = 0, yf()), d;
    }
    function kr() {
      for (; Ye !== null; ) Rm(Ye);
    }
    function Em(e, t) {
      var a = nt;
      nt |= ga;
      var i = Lr(), o = xm();
      if (pt !== e || we !== t) {
        if (_t) {
          var f = e.memoizedUpdaters;
          0 < f.size && (yo(e, we), f.clear()), Vl(e, t);
        }
        Jy = null, q0 = Bn() + $b, oc(e, t);
      } else
        nh = Po(
          e,
          t
        );
      Ai(t);
      e: do
        try {
          if (ot !== Ga && Ye !== null)
            t: switch (t = Ye, f = nn, ot) {
              case Xy:
                ot = Ga, nn = null, ni(
                  e,
                  t,
                  f,
                  Xy
                );
                break;
              case Cs:
              case Hs:
                if (Qh(f)) {
                  ot = Ga, nn = null, $r(t);
                  break;
                }
                t = function() {
                  ot !== Cs && ot !== Hs || pt !== e || (ot = Zy), Ha(e);
                }, f.then(t, t);
                break e;
              case Qy:
                ot = Zy;
                break e;
              case Kb:
                ot = ng;
                break e;
              case Zy:
                Qh(f) ? (ot = Ga, nn = null, $r(t)) : (ot = Ga, nn = null, ni(
                  e,
                  t,
                  f,
                  Zy
                ));
                break;
              case ng:
                var d = null;
                switch (Ye.tag) {
                  case 26:
                    d = Ye.memoizedState;
                  case 5:
                  case 27:
                    var h = Ye;
                    if (!d || ts(d)) {
                      ot = Ga, nn = null;
                      var p = h.sibling;
                      if (p !== null) Ye = p;
                      else {
                        var v = h.return;
                        v !== null ? (Ye = v, Wf(v)) : Ye = null;
                      }
                      break t;
                    }
                    break;
                  default:
                    console.error(
                      "Unexpected type of fiber triggered a suspensey commit. This is a bug in React."
                    );
                }
                ot = Ga, nn = null, ni(
                  e,
                  t,
                  f,
                  ng
                );
                break;
              case ah:
                ot = Ga, nn = null, ni(
                  e,
                  t,
                  f,
                  ah
                );
                break;
              case ug:
                Zr(), Qt = j0;
                break e;
              default:
                throw Error(
                  "Unexpected SuspendedReason. This is a bug in React."
                );
            }
          _.actQueue !== null ? kr() : Am();
          break;
        } catch (H) {
          $f(e, H);
        }
      while (!0);
      return cr(), _.H = i, _.A = o, nt = a, Ye !== null ? (te !== null && typeof te.markRenderYielded == "function" && te.markRenderYielded(), Mc) : (Vs(), pt = null, we = 0, yf(), Qt);
    }
    function Am() {
      for (; Ye !== null && !o0(); )
        Rm(Ye);
    }
    function Rm(e) {
      var t = e.alternate;
      (e.mode & Yl) !== Tt ? (or(e), t = ae(
        e,
        Yr,
        t,
        e,
        Ei
      ), uu(e)) : t = ae(
        e,
        Yr,
        t,
        e,
        Ei
      ), e.memoizedProps = e.pendingProps, t === null ? Wf(e) : Ye = t;
    }
    function $r(e) {
      var t = ae(e, Wr, e);
      e.memoizedProps = e.pendingProps, t === null ? Wf(e) : Ye = t;
    }
    function Wr(e) {
      var t = e.alternate, a = (e.mode & Yl) !== Tt;
      switch (a && or(e), e.tag) {
        case 15:
        case 0:
          t = lm(
            t,
            e,
            e.pendingProps,
            e.type,
            void 0,
            we
          );
          break;
        case 11:
          t = lm(
            t,
            e,
            e.pendingProps,
            e.type.render,
            e.ref,
            we
          );
          break;
        case 5:
          $a(e);
        default:
          cm(t, e), e = Ye = Uh(e, Ei), t = Yr(t, e, Ei);
      }
      return a && uu(e), t;
    }
    function ni(e, t, a, i) {
      cr(), $a(t), $d = null, By = 0;
      var o = t.return;
      try {
        if (qf(
          e,
          o,
          t,
          a,
          we
        )) {
          Qt = Vy, io(
            e,
            ia(a, e.current)
          ), Ye = null;
          return;
        }
      } catch (f) {
        if (o !== null) throw Ye = o, f;
        Qt = Vy, io(
          e,
          ia(a, e.current)
        ), Ye = null;
        return;
      }
      t.flags & 32768 ? (We || i === Xy ? e = !0 : nh || (we & 536870912) !== 0 ? e = !1 : (Xo = e = !0, (i === Cs || i === Hs || i === Qy || i === ah) && (i = kn.current, i !== null && i.tag === 13 && (i.flags |= 16384))), Fr(t, e)) : Wf(t);
    }
    function Wf(e) {
      var t = e;
      do {
        if ((t.flags & 32768) !== 0) {
          Fr(
            t,
            Xo
          );
          return;
        }
        var a = t.alternate;
        if (e = t.return, or(t), a = ae(
          t,
          Bp,
          a,
          t,
          Ei
        ), (t.mode & Yl) !== Tt && Ji(t), a !== null) {
          Ye = a;
          return;
        }
        if (t = t.sibling, t !== null) {
          Ye = t;
          return;
        }
        Ye = t = e;
      } while (t !== null);
      Qt === Mc && (Qt = Jb);
    }
    function Fr(e, t) {
      do {
        var a = Yp(e.alternate, e);
        if (a !== null) {
          a.flags &= 32767, Ye = a;
          return;
        }
        if ((e.mode & Yl) !== Tt) {
          Ji(e), a = e.actualDuration;
          for (var i = e.child; i !== null; )
            a += i.actualDuration, i = i.sibling;
          e.actualDuration = a;
        }
        if (a = e.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !t && (e = e.sibling, e !== null)) {
          Ye = e;
          return;
        }
        Ye = e = a;
      } while (e !== null);
      Qt = j0, Ye = null;
    }
    function Ir(e, t, a, i, o, f, d, h, p) {
      e.cancelPendingCommit = null;
      do
        ro();
      while (Gl !== js);
      if (Du.flushLegacyContextWarning(), Du.flushPendingUnsafeLifecycleWarnings(), (nt & (ga | Uu)) !== an)
        throw Error("Should not already be working.");
      if (te !== null && typeof te.markCommitStarted == "function" && te.markCommitStarted(a), t === null) Dt();
      else {
        if (a === 0 && console.error(
          "finishedLanes should not be empty during a commit. This is a bug in React."
        ), t === e.current)
          throw Error(
            "Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue."
          );
        if (f = t.lanes | t.childLanes, f |= qv, cv(
          e,
          a,
          f,
          d,
          h,
          p
        ), e === pt && (Ye = pt = null, we = 0), uh = t, Jo = e, Ko = a, sg = f, rg = o, Pb = i, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Mm(Uo, function() {
          return Ff(), null;
        })) : (e.callbackNode = null, e.callbackPriority = 0), E0 = Zd(), i = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || i) {
          i = _.T, _.T = null, o = ve.p, ve.p = gl, d = nt, nt |= Uu;
          try {
            Vr(e, t, a);
          } finally {
            nt = d, ve.p = o, _.T = i;
          }
        }
        Gl = Wb, Dn(), Pr(), Jp();
      }
    }
    function Dn() {
      if (Gl === Wb) {
        Gl = js;
        var e = Jo, t = uh, a = Ko, i = (t.flags & 13878) !== 0;
        if ((t.subtreeFlags & 13878) !== 0 || i) {
          i = _.T, _.T = null;
          var o = ve.p;
          ve.p = gl;
          var f = nt;
          nt |= Uu;
          try {
            eh = a, th = e, vm(t, e), th = eh = null, a = xg;
            var d = Ep(e.containerInfo), h = a.focusedElem, p = a.selectionRange;
            if (d !== h && h && h.ownerDocument && xp(
              h.ownerDocument.documentElement,
              h
            )) {
              if (p !== null && zh(h)) {
                var v = p.start, H = p.end;
                if (H === void 0 && (H = v), "selectionStart" in h)
                  h.selectionStart = v, h.selectionEnd = Math.min(
                    H,
                    h.value.length
                  );
                else {
                  var B = h.ownerDocument || document, U = B && B.defaultView || window;
                  if (U.getSelection) {
                    var Y = U.getSelection(), ne = h.textContent.length, ge = Math.min(
                      p.start,
                      ne
                    ), vt = p.end === void 0 ? ge : Math.min(p.end, ne);
                    !Y.extend && ge > vt && (d = vt, vt = ge, ge = d);
                    var Qe = Rh(
                      h,
                      ge
                    ), S = Rh(
                      h,
                      vt
                    );
                    if (Qe && S && (Y.rangeCount !== 1 || Y.anchorNode !== Qe.node || Y.anchorOffset !== Qe.offset || Y.focusNode !== S.node || Y.focusOffset !== S.offset)) {
                      var T = B.createRange();
                      T.setStart(Qe.node, Qe.offset), Y.removeAllRanges(), ge > vt ? (Y.addRange(T), Y.extend(S.node, S.offset)) : (T.setEnd(S.node, S.offset), Y.addRange(T));
                    }
                  }
                }
              }
              for (B = [], Y = h; Y = Y.parentNode; )
                Y.nodeType === 1 && B.push({
                  element: Y,
                  left: Y.scrollLeft,
                  top: Y.scrollTop
                });
              for (typeof h.focus == "function" && h.focus(), h = 0; h < B.length; h++) {
                var x = B[h];
                x.element.scrollLeft = x.left, x.element.scrollTop = x.top;
              }
            }
            I0 = !!Tg, xg = Tg = null;
          } finally {
            nt = f, ve.p = o, _.T = i;
          }
        }
        e.current = t, Gl = Fb;
      }
    }
    function Pr() {
      if (Gl === Fb) {
        Gl = js;
        var e = Jo, t = uh, a = Ko, i = (t.flags & 8772) !== 0;
        if ((t.subtreeFlags & 8772) !== 0 || i) {
          i = _.T, _.T = null;
          var o = ve.p;
          ve.p = gl;
          var f = nt;
          nt |= Uu;
          try {
            te !== null && typeof te.markLayoutEffectsStarted == "function" && te.markLayoutEffectsStarted(a), eh = a, th = e, ym(
              e,
              t.alternate,
              t
            ), th = eh = null, te !== null && typeof te.markLayoutEffectsStopped == "function" && te.markLayoutEffectsStopped();
          } finally {
            nt = f, ve.p = o, _.T = i;
          }
        }
        Gl = Ib;
      }
    }
    function Jp() {
      if (Gl === _S || Gl === Ib) {
        Gl = js, Rv();
        var e = Jo, t = uh, a = Ko, i = Pb, o = (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0;
        o ? Gl = fg : (Gl = js, uh = Jo = null, On(e, e.pendingLanes), _s = 0, ky = null);
        var f = e.pendingLanes;
        if (f === 0 && (Lo = null), o || mo(e), o = hh(a), t = t.stateNode, vl && typeof vl.onCommitFiberRoot == "function")
          try {
            var d = (t.current.flags & 128) === 128;
            switch (o) {
              case gl:
                var h = xd;
                break;
              case ln:
                h = hs;
                break;
              case Eu:
                h = Uo;
                break;
              case zd:
                h = ms;
                break;
              default:
                h = Uo;
            }
            vl.onCommitFiberRoot(
              mi,
              t,
              h,
              d
            );
          } catch (B) {
            Pl || (Pl = !0, console.error(
              "React instrumentation encountered an error: %s",
              B
            ));
          }
        if (_t && e.memoizedUpdaters.clear(), Sm(), i !== null) {
          d = _.T, h = ve.p, ve.p = gl, _.T = null;
          try {
            var p = e.onRecoverableError;
            for (t = 0; t < i.length; t++) {
              var v = i[t], H = Kp(v.stack);
              ae(
                v.source,
                p,
                v.value,
                H
              );
            }
          } finally {
            _.T = d, ve.p = h;
          }
        }
        (Ko & 3) !== 0 && ro(), Ha(e), f = e.pendingLanes, (a & 4194090) !== 0 && (f & 42) !== 0 ? (R0 = !0, e === dg ? Ky++ : (Ky = 0, dg = e)) : Ky = 0, fc(0), Dt();
      }
    }
    function Kp(e) {
      return e = { componentStack: e }, Object.defineProperty(e, "digest", {
        get: function() {
          console.error(
            'You are accessing "digest" from the errorInfo object passed to onRecoverableError. This property is no longer provided as part of errorInfo but can be accessed as a property of the Error instance itself.'
          );
        }
      }), e;
    }
    function On(e, t) {
      (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, dn(t)));
    }
    function ro(e) {
      return Dn(), Pr(), Jp(), Ff();
    }
    function Ff() {
      if (Gl !== fg) return !1;
      var e = Jo, t = sg;
      sg = 0;
      var a = hh(Ko), i = Eu > a ? Eu : a;
      a = _.T;
      var o = ve.p;
      try {
        ve.p = i, _.T = null, i = rg, rg = null;
        var f = Jo, d = Ko;
        if (Gl = js, uh = Jo = null, Ko = 0, (nt & (ga | Uu)) !== an)
          throw Error("Cannot flush passive effects while already rendering.");
        hg = !0, B0 = !1, te !== null && typeof te.markPassiveEffectsStarted == "function" && te.markPassiveEffectsStarted(d);
        var h = nt;
        if (nt |= Uu, gm(f.current), Lf(
          f,
          f.current,
          d,
          i
        ), te !== null && typeof te.markPassiveEffectsStopped == "function" && te.markPassiveEffectsStopped(), mo(f), nt = h, fc(0, !1), B0 ? f === ky ? _s++ : (_s = 0, ky = f) : _s = 0, B0 = hg = !1, vl && typeof vl.onPostCommitFiberRoot == "function")
          try {
            vl.onPostCommitFiberRoot(mi, f);
          } catch (v) {
            Pl || (Pl = !0, console.error(
              "React instrumentation encountered an error: %s",
              v
            ));
          }
        var p = f.current.stateNode;
        return p.effectDuration = 0, p.passiveEffectDuration = 0, !0;
      } finally {
        ve.p = o, _.T = a, On(e, t);
      }
    }
    function ho(e, t, a) {
      t = ia(a, t), t = El(e.stateNode, t, 2), e = Ka(e, t, 2), e !== null && (jc(e, 2), Ha(e));
    }
    function ye(e, t, a) {
      if (ih = !1, e.tag === 3)
        ho(e, e, a);
      else {
        for (; t !== null; ) {
          if (t.tag === 3) {
            ho(
              t,
              e,
              a
            );
            return;
          }
          if (t.tag === 1) {
            var i = t.stateNode;
            if (typeof t.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (Lo === null || !Lo.has(i))) {
              e = ia(a, e), a = Mt(2), i = Ka(t, a, 2), i !== null && (_f(
                a,
                i,
                t,
                e
              ), jc(i, 2), Ha(i));
              return;
            }
          }
          t = t.return;
        }
        console.error(
          `Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Potential causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`,
          a
        );
      }
    }
    function zm(e, t, a) {
      var i = e.pingCache;
      if (i === null) {
        i = e.pingCache = new CS();
        var o = /* @__PURE__ */ new Set();
        i.set(t, o);
      } else
        o = i.get(t), o === void 0 && (o = /* @__PURE__ */ new Set(), i.set(t, o));
      o.has(a) || (ig = !0, o.add(a), i = gv.bind(null, e, t, a), _t && yo(e, a), t.then(i, i));
    }
    function gv(e, t, a) {
      var i = e.pingCache;
      i !== null && i.delete(t), e.pingedLanes |= e.suspendedLanes & a, e.warmLanes &= ~a, Tm() && _.actQueue === null && console.error(
        `A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act`
      ), pt === e && (we & a) === a && (Qt === Us || Qt === ag && (we & 62914560) === we && Bn() - og < kb ? (nt & ga) === an && oc(e, 0) : cg |= a, Ns === we && (Ns = 0)), Ha(e);
    }
    function Dm(e, t) {
      t === 0 && (t = ef()), e = Xl(e, t), e !== null && (jc(e, t), Ha(e));
    }
    function If(e) {
      var t = e.memoizedState, a = 0;
      t !== null && (a = t.retryLane), Dm(e, a);
    }
    function ui(e, t) {
      var a = 0;
      switch (e.tag) {
        case 13:
          var i = e.stateNode, o = e.memoizedState;
          o !== null && (a = o.retryLane);
          break;
        case 19:
          i = e.stateNode;
          break;
        case 22:
          i = e.stateNode._retryCache;
          break;
        default:
          throw Error(
            "Pinged unknown suspense boundary type. This is probably a bug in React."
          );
      }
      i !== null && i.delete(t), Dm(e, a);
    }
    function ed(e, t, a) {
      if ((t.subtreeFlags & 67117056) !== 0)
        for (t = t.child; t !== null; ) {
          var i = e, o = t, f = o.type === Ro;
          f = a || f, o.tag !== 22 ? o.flags & 67108864 ? f && ae(
            o,
            Om,
            i,
            o,
            (o.mode & Zg) === Tt
          ) : ed(
            i,
            o,
            f
          ) : o.memoizedState === null && (f && o.flags & 8192 ? ae(
            o,
            Om,
            i,
            o
          ) : o.subtreeFlags & 67108864 && ae(
            o,
            ed,
            i,
            o,
            f
          )), t = t.sibling;
        }
    }
    function Om(e, t) {
      var a = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : !0;
      Ve(!0);
      try {
        sa(t), a && kf(t), hu(e, t.alternate, t, !1), a && Qr(e, t, 0, null, !1, 0);
      } finally {
        Ve(!1);
      }
    }
    function mo(e) {
      var t = !0;
      e.current.mode & (la | zu) || (t = !1), ed(
        e,
        e.current,
        t
      );
    }
    function en(e) {
      if ((nt & ga) === an) {
        var t = e.tag;
        if (t === 3 || t === 1 || t === 0 || t === 11 || t === 14 || t === 15) {
          if (t = ce(e) || "ReactComponent", Y0 !== null) {
            if (Y0.has(t)) return;
            Y0.add(t);
          } else Y0 = /* @__PURE__ */ new Set([t]);
          ae(e, function() {
            console.error(
              "Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead."
            );
          });
        }
      }
    }
    function yo(e, t) {
      _t && e.memoizedUpdaters.forEach(function(a) {
        Fn(e, a, t);
      });
    }
    function Mm(e, t) {
      var a = _.actQueue;
      return a !== null ? (a.push(t), YS) : Td(e, t);
    }
    function kp(e) {
      Tm() && _.actQueue === null && ae(e, function() {
        console.error(
          `An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act`,
          ce(e)
        );
      });
    }
    function Ha(e) {
      e !== ch && e.next === null && (ch === null ? w0 = ch = e : ch = ch.next = e), G0 = !0, _.actQueue !== null ? yg || (yg = !0, Wt()) : mg || (mg = !0, Wt());
    }
    function fc(e, t) {
      if (!pg && G0) {
        pg = !0;
        do
          for (var a = !1, i = w0; i !== null; ) {
            if (e !== 0) {
              var o = i.pendingLanes;
              if (o === 0) var f = 0;
              else {
                var d = i.suspendedLanes, h = i.pingedLanes;
                f = (1 << 31 - zl(42 | e) + 1) - 1, f &= o & ~(d & ~h), f = f & 201326741 ? f & 201326741 | 1 : f ? f | 2 : 0;
              }
              f !== 0 && (a = !0, ad(i, f));
            } else
              f = we, f = aa(
                i,
                i === pt ? f : 0,
                i.cancelPendingCommit !== null || i.timeoutHandle !== Ys
              ), (f & 3) === 0 || Po(i, f) || (a = !0, ad(i, f));
            i = i.next;
          }
        while (a);
        pg = !1;
      }
    }
    function td() {
      ld();
    }
    function ld() {
      G0 = yg = mg = !1;
      var e = 0;
      qs !== 0 && (po() && (e = qs), qs = 0);
      for (var t = Bn(), a = null, i = w0; i !== null; ) {
        var o = i.next, f = Mn(i, t);
        f === 0 ? (i.next = null, a === null ? w0 = o : a.next = o, o === null && (ch = a)) : (a = i, (e !== 0 || (f & 3) !== 0) && (G0 = !0)), i = o;
      }
      fc(e);
    }
    function Mn(e, t) {
      for (var a = e.suspendedLanes, i = e.pingedLanes, o = e.expirationTimes, f = e.pendingLanes & -62914561; 0 < f; ) {
        var d = 31 - zl(f), h = 1 << d, p = o[d];
        p === -1 ? ((h & a) === 0 || (h & i) !== 0) && (o[d] = ip(h, t)) : p <= t && (e.expiredLanes |= h), f &= ~h;
      }
      if (t = pt, a = we, a = aa(
        e,
        e === t ? a : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== Ys
      ), i = e.callbackNode, a === 0 || e === t && (ot === Cs || ot === Hs) || e.cancelPendingCommit !== null)
        return i !== null && nd(i), e.callbackNode = null, e.callbackPriority = 0;
      if ((a & 3) === 0 || Po(e, a)) {
        if (t = a & -a, t !== e.callbackPriority || _.actQueue !== null && i !== vg)
          nd(i);
        else return t;
        switch (hh(a)) {
          case gl:
          case ln:
            a = hs;
            break;
          case Eu:
            a = Uo;
            break;
          case zd:
            a = ms;
            break;
          default:
            a = Uo;
        }
        return i = Ct.bind(null, e), _.actQueue !== null ? (_.actQueue.push(i), a = vg) : a = Td(a, i), e.callbackPriority = t, e.callbackNode = a, t;
      }
      return i !== null && nd(i), e.callbackPriority = 2, e.callbackNode = null, 2;
    }
    function Ct(e, t) {
      if (R0 = A0 = !1, Gl !== js && Gl !== fg)
        return e.callbackNode = null, e.callbackPriority = 0, null;
      var a = e.callbackNode;
      if (ro() && e.callbackNode !== a)
        return null;
      var i = we;
      return i = aa(
        e,
        e === pt ? i : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== Ys
      ), i === 0 ? null : ($t(
        e,
        i,
        t
      ), Mn(e, Bn()), e.callbackNode != null && e.callbackNode === a ? Ct.bind(null, e) : null);
    }
    function ad(e, t) {
      if (ro()) return null;
      A0 = R0, R0 = !1, $t(e, t, !0);
    }
    function nd(e) {
      e !== vg && e !== null && Av(e);
    }
    function Wt() {
      _.actQueue !== null && _.actQueue.push(function() {
        return ld(), null;
      }), kS(function() {
        (nt & (ga | Uu)) !== an ? Td(
          xd,
          td
        ) : ld();
      });
    }
    function Um() {
      return qs === 0 && (qs = rh()), qs;
    }
    function Cm(e) {
      return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : (I(e, "action"), Xc("" + e));
    }
    function Hm(e, t) {
      var a = t.ownerDocument.createElement("input");
      return a.name = t.name, a.value = t.value, e.id && a.setAttribute("form", e.id), t.parentNode.insertBefore(a, t), e = new FormData(e), a.parentNode.removeChild(a), e;
    }
    function bt(e, t, a, i, o) {
      if (t === "submit" && a && a.stateNode === o) {
        var f = Cm(
          (o[ea] || null).action
        ), d = i.submitter;
        d && (t = (t = d[ea] || null) ? Cm(t.formAction) : d.getAttribute("formAction"), t !== null && (f = t, d = null));
        var h = new he(
          "action",
          "action",
          null,
          i,
          o
        );
        e.push({
          event: h,
          listeners: [
            {
              instance: null,
              listener: function() {
                if (i.defaultPrevented) {
                  if (qs !== 0) {
                    var p = d ? Hm(
                      o,
                      d
                    ) : new FormData(o), v = {
                      pending: !0,
                      data: p,
                      method: o.method,
                      action: f
                    };
                    Object.freeze(v), Wi(
                      a,
                      v,
                      null,
                      p
                    );
                  }
                } else
                  typeof f == "function" && (h.preventDefault(), p = d ? Hm(
                    o,
                    d
                  ) : new FormData(o), v = {
                    pending: !0,
                    data: p,
                    method: o.method,
                    action: f
                  }, Object.freeze(v), Wi(
                    a,
                    v,
                    f,
                    p
                  ));
              },
              currentTarget: o
            }
          ]
        });
      }
    }
    function hl(e, t, a) {
      e.currentTarget = a;
      try {
        t(e);
      } catch (i) {
        Iv(i);
      }
      e.currentTarget = null;
    }
    function Un(e, t) {
      t = (t & 4) !== 0;
      for (var a = 0; a < e.length; a++) {
        var i = e[a];
        e: {
          var o = void 0, f = i.event;
          if (i = i.listeners, t)
            for (var d = i.length - 1; 0 <= d; d--) {
              var h = i[d], p = h.instance, v = h.currentTarget;
              if (h = h.listener, p !== o && f.isPropagationStopped())
                break e;
              p !== null ? ae(
                p,
                hl,
                f,
                h,
                v
              ) : hl(f, h, v), o = p;
            }
          else
            for (d = 0; d < i.length; d++) {
              if (h = i[d], p = h.instance, v = h.currentTarget, h = h.listener, p !== o && f.isPropagationStopped())
                break e;
              p !== null ? ae(
                p,
                hl,
                f,
                h,
                v
              ) : hl(f, h, v), o = p;
            }
        }
      }
    }
    function _e(e, t) {
      gg.has(e) || console.error(
        'Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.',
        e
      );
      var a = t[uy];
      a === void 0 && (a = t[uy] = /* @__PURE__ */ new Set());
      var i = e + "__bubble";
      a.has(i) || (id(t, e, 2, !1), a.add(i));
    }
    function ud(e, t, a) {
      gg.has(e) && !t && console.error(
        'Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.',
        e
      );
      var i = 0;
      t && (i |= 4), id(
        a,
        e,
        i,
        t
      );
    }
    function Nm(e) {
      if (!e[V0]) {
        e[V0] = !0, s0.forEach(function(a) {
          a !== "selectionchange" && (gg.has(a) || ud(a, !1, e), ud(a, !0, e));
        });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[V0] || (t[V0] = !0, ud("selectionchange", !1, t));
      }
    }
    function id(e, t, a, i) {
      switch (vd(t)) {
        case gl:
          var o = Tv;
          break;
        case ln:
          o = pd;
          break;
        default:
          o = fi;
      }
      a = o.bind(
        null,
        t,
        a,
        e
      ), o = void 0, !M || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (o = !0), i ? o !== void 0 ? e.addEventListener(t, a, {
        capture: !0,
        passive: o
      }) : e.addEventListener(t, a, !0) : o !== void 0 ? e.addEventListener(t, a, {
        passive: o
      }) : e.addEventListener(
        t,
        a,
        !1
      );
    }
    function jl(e, t, a, i, o) {
      var f = i;
      if ((t & 1) === 0 && (t & 2) === 0 && i !== null)
        e: for (; ; ) {
          if (i === null) return;
          var d = i.tag;
          if (d === 3 || d === 4) {
            var h = i.stateNode.containerInfo;
            if (h === o) break;
            if (d === 4)
              for (d = i.return; d !== null; ) {
                var p = d.tag;
                if ((p === 3 || p === 4) && d.stateNode.containerInfo === o)
                  return;
                d = d.return;
              }
            for (; h !== null; ) {
              if (d = In(h), d === null) return;
              if (p = d.tag, p === 5 || p === 6 || p === 26 || p === 27) {
                i = f = d;
                continue e;
              }
              h = h.parentNode;
            }
          }
          i = i.return;
        }
      Fs(function() {
        var v = f, H = qi(a), B = [];
        e: {
          var U = Qg.get(e);
          if (U !== void 0) {
            var Y = he, ne = e;
            switch (e) {
              case "keypress":
                if (Qc(a) === 0) break e;
              case "keydown":
              case "keyup":
                Y = tS;
                break;
              case "focusin":
                ne = "focus", Y = Ze;
                break;
              case "focusout":
                ne = "blur", Y = Ze;
                break;
              case "beforeblur":
              case "afterblur":
                Y = Ze;
                break;
              case "click":
                if (a.button === 2) break e;
              case "auxclick":
              case "dblclick":
              case "mousedown":
              case "mousemove":
              case "mouseup":
              case "mouseout":
              case "mouseover":
              case "contextmenu":
                Y = Ce;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                Y = pe;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                Y = nS;
                break;
              case wg:
              case Gg:
              case Vg:
                Y = Mv;
                break;
              case Xg:
                Y = iS;
                break;
              case "scroll":
              case "scrollend":
                Y = D;
                break;
              case "wheel":
                Y = oS;
                break;
              case "copy":
              case "cut":
              case "paste":
                Y = k1;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                Y = Cg;
                break;
              case "toggle":
              case "beforetoggle":
                Y = sS;
            }
            var ge = (t & 4) !== 0, vt = !ge && (e === "scroll" || e === "scrollend"), Qe = ge ? U !== null ? U + "Capture" : null : U;
            ge = [];
            for (var S = v, T; S !== null; ) {
              var x = S;
              if (T = x.stateNode, x = x.tag, x !== 5 && x !== 26 && x !== 27 || T === null || Qe === null || (x = tu(S, Qe), x != null && ge.push(
                _l(
                  S,
                  x,
                  T
                )
              )), vt) break;
              S = S.return;
            }
            0 < ge.length && (U = new Y(
              U,
              ne,
              null,
              a,
              H
            ), B.push({
              event: U,
              listeners: ge
            }));
          }
        }
        if ((t & 7) === 0) {
          e: {
            if (U = e === "mouseover" || e === "pointerover", Y = e === "mouseout" || e === "pointerout", U && a !== s && (ne = a.relatedTarget || a.fromElement) && (In(ne) || ne[pi]))
              break e;
            if ((Y || U) && (U = H.window === H ? H : (U = H.ownerDocument) ? U.defaultView || U.parentWindow : window, Y ? (ne = a.relatedTarget || a.toElement, Y = v, ne = ne ? In(ne) : null, ne !== null && (vt = Ie(ne), ge = ne.tag, ne !== vt || ge !== 5 && ge !== 27 && ge !== 6) && (ne = null)) : (Y = null, ne = v), Y !== ne)) {
              if (ge = Ce, x = "onMouseLeave", Qe = "onMouseEnter", S = "mouse", (e === "pointerout" || e === "pointerover") && (ge = Cg, x = "onPointerLeave", Qe = "onPointerEnter", S = "pointer"), vt = Y == null ? U : Hu(Y), T = ne == null ? U : Hu(ne), U = new ge(
                x,
                S + "leave",
                Y,
                a,
                H
              ), U.target = vt, U.relatedTarget = T, x = null, In(H) === v && (ge = new ge(
                Qe,
                S + "enter",
                ne,
                a,
                H
              ), ge.target = T, ge.relatedTarget = vt, x = ge), vt = x, Y && ne)
                t: {
                  for (ge = Y, Qe = ne, S = 0, T = ge; T; T = nl(T))
                    S++;
                  for (T = 0, x = Qe; x; x = nl(x))
                    T++;
                  for (; 0 < S - T; )
                    ge = nl(ge), S--;
                  for (; 0 < T - S; )
                    Qe = nl(Qe), T--;
                  for (; S--; ) {
                    if (ge === Qe || Qe !== null && ge === Qe.alternate)
                      break t;
                    ge = nl(ge), Qe = nl(Qe);
                  }
                  ge = null;
                }
              else ge = null;
              Y !== null && jm(
                B,
                U,
                Y,
                ge,
                !1
              ), ne !== null && vt !== null && jm(
                B,
                vt,
                ne,
                ge,
                !0
              );
            }
          }
          e: {
            if (U = v ? Hu(v) : window, Y = U.nodeName && U.nodeName.toLowerCase(), Y === "select" || Y === "input" && U.type === "file")
              var w = Eh;
            else if (gp(U))
              if (Bg)
                w = mv;
              else {
                w = Ah;
                var ee = dv;
              }
            else
              Y = U.nodeName, !Y || Y.toLowerCase() !== "input" || U.type !== "checkbox" && U.type !== "radio" ? v && _i(v.elementType) && (w = Eh) : w = hv;
            if (w && (w = w(e, v))) {
              tr(
                B,
                w,
                a,
                H
              );
              break e;
            }
            ee && ee(e, U, v), e === "focusout" && v && U.type === "number" && v.memoizedProps.value != null && Ls(U, "number", U.value);
          }
          switch (ee = v ? Hu(v) : window, e) {
            case "focusin":
              (gp(ee) || ee.contentEditable === "true") && (qd = ee, Cv = v, Ry = null);
              break;
            case "focusout":
              Ry = Cv = qd = null;
              break;
            case "mousedown":
              Hv = !0;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              Hv = !1, Ap(
                B,
                a,
                H
              );
              break;
            case "selectionchange":
              if (mS) break;
            case "keydown":
            case "keyup":
              Ap(
                B,
                a,
                H
              );
          }
          var Re;
          if (Uv)
            e: {
              switch (e) {
                case "compositionstart":
                  var ue = "onCompositionStart";
                  break e;
                case "compositionend":
                  ue = "onCompositionEnd";
                  break e;
                case "compositionupdate":
                  ue = "onCompositionUpdate";
                  break e;
              }
              ue = void 0;
            }
          else
            _d ? Nl(e, a) && (ue = "onCompositionEnd") : e === "keydown" && a.keyCode === Hg && (ue = "onCompositionStart");
          ue && (Ng && a.locale !== "ko" && (_d || ue !== "onCompositionStart" ? ue === "onCompositionEnd" && _d && (Re = lu()) : (X = H, C = "value" in X ? X.value : X.textContent, _d = !0)), ee = Pf(
            v,
            ue
          ), 0 < ee.length && (ue = new Ug(
            ue,
            e,
            null,
            a,
            H
          ), B.push({
            event: ue,
            listeners: ee
          }), Re ? ue.data = Re : (Re = wu(a), Re !== null && (ue.data = Re)))), (Re = dS ? er(e, a) : df(e, a)) && (ue = Pf(
            v,
            "onBeforeInput"
          ), 0 < ue.length && (ee = new W1(
            "onBeforeInput",
            "beforeinput",
            null,
            a,
            H
          ), B.push({
            event: ee,
            listeners: ue
          }), ee.data = Re)), bt(
            B,
            e,
            v,
            a,
            H
          );
        }
        Un(B, t);
      });
    }
    function _l(e, t, a) {
      return {
        instance: e,
        listener: t,
        currentTarget: a
      };
    }
    function Pf(e, t) {
      for (var a = t + "Capture", i = []; e !== null; ) {
        var o = e, f = o.stateNode;
        if (o = o.tag, o !== 5 && o !== 26 && o !== 27 || f === null || (o = tu(e, a), o != null && i.unshift(
          _l(e, o, f)
        ), o = tu(e, t), o != null && i.push(
          _l(e, o, f)
        )), e.tag === 3) return i;
        e = e.return;
      }
      return [];
    }
    function nl(e) {
      if (e === null) return null;
      do
        e = e.return;
      while (e && e.tag !== 5 && e.tag !== 27);
      return e || null;
    }
    function jm(e, t, a, i, o) {
      for (var f = t._reactName, d = []; a !== null && a !== i; ) {
        var h = a, p = h.alternate, v = h.stateNode;
        if (h = h.tag, p !== null && p === i) break;
        h !== 5 && h !== 26 && h !== 27 || v === null || (p = v, o ? (v = tu(a, f), v != null && d.unshift(
          _l(a, v, p)
        )) : o || (v = tu(a, f), v != null && d.push(
          _l(a, v, p)
        ))), a = a.return;
      }
      d.length !== 0 && e.push({ event: t, listeners: d });
    }
    function Cn(e, t) {
      Vc(e, t), e !== "input" && e !== "textarea" && e !== "select" || t == null || t.value !== null || Ty || (Ty = !0, e === "select" && t.multiple ? console.error(
        "`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.",
        e
      ) : console.error(
        "`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.",
        e
      ));
      var a = {
        registrationNameDependencies: Ba,
        possibleRegistrationNames: gc
      };
      _i(e) || typeof t.is == "string" || Sh(e, t, a), t.contentEditable && !t.suppressContentEditableWarning && t.children != null && console.error(
        "A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."
      );
    }
    function St(e, t, a, i) {
      t !== a && (a = ml(a), ml(t) !== a && (i[e] = t));
    }
    function ii(e, t, a) {
      t.forEach(function(i) {
        a[qm(i)] = i === "style" ? rc(e) : e.getAttribute(i);
      });
    }
    function Na(e, t) {
      t === !1 ? console.error(
        "Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.",
        e,
        e,
        e
      ) : console.error(
        "Expected `%s` listener to be a function, instead got a value of `%s` type.",
        e,
        typeof t
      );
    }
    function cd(e, t) {
      return e = e.namespaceURI === Ts || e.namespaceURI === Bo ? e.ownerDocument.createElementNS(
        e.namespaceURI,
        e.tagName
      ) : e.ownerDocument.createElement(e.tagName), e.innerHTML = t, e.innerHTML;
    }
    function ml(e) {
      return j(e) && (console.error(
        "The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before using it here.",
        re(e)
      ), k(e)), (typeof e == "string" ? e : "" + e).replace(wS, `
`).replace(GS, "");
    }
    function _m(e, t) {
      return t = ml(t), ml(e) === t;
    }
    function yu() {
    }
    function ke(e, t, a, i, o, f) {
      switch (a) {
        case "children":
          typeof i == "string" ? (sf(i, t, !1), t === "body" || t === "textarea" && i === "" || ji(e, i)) : (typeof i == "number" || typeof i == "bigint") && (sf("" + i, t, !1), t !== "body" && ji(e, "" + i));
          break;
        case "className":
          lf(e, "class", i);
          break;
        case "tabIndex":
          lf(e, "tabindex", i);
          break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
          lf(e, a, i);
          break;
        case "style":
          rf(e, i, f);
          break;
        case "data":
          if (t !== "object") {
            lf(e, "data", i);
            break;
          }
        case "src":
        case "href":
          if (i === "" && (t !== "a" || a !== "href")) {
            console.error(
              a === "src" ? 'An empty string ("") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string.' : 'An empty string ("") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.',
              a,
              a
            ), e.removeAttribute(a);
            break;
          }
          if (i == null || typeof i == "function" || typeof i == "symbol" || typeof i == "boolean") {
            e.removeAttribute(a);
            break;
          }
          I(i, a), i = Xc("" + i), e.setAttribute(a, i);
          break;
        case "action":
        case "formAction":
          if (i != null && (t === "form" ? a === "formAction" ? console.error(
            "You can only pass the formAction prop to <input> or <button>. Use the action prop on <form>."
          ) : typeof i == "function" && (o.encType == null && o.method == null || Z0 || (Z0 = !0, console.error(
            "Cannot specify a encType or method for a form that specifies a function as the action. React provides those automatically. They will get overridden."
          )), o.target == null || Q0 || (Q0 = !0, console.error(
            "Cannot specify a target for a form that specifies a function as the action. The function will always be executed in the same window."
          ))) : t === "input" || t === "button" ? a === "action" ? console.error(
            "You can only pass the action prop to <form>. Use the formAction prop on <input> or <button>."
          ) : t !== "input" || o.type === "submit" || o.type === "image" || X0 ? t !== "button" || o.type == null || o.type === "submit" || X0 ? typeof i == "function" && (o.name == null || n1 || (n1 = !0, console.error(
            'Cannot specify a "name" prop for a button that specifies a function as a formAction. React needs it to encode which action should be invoked. It will get overridden.'
          )), o.formEncType == null && o.formMethod == null || Z0 || (Z0 = !0, console.error(
            "Cannot specify a formEncType or formMethod for a button that specifies a function as a formAction. React provides those automatically. They will get overridden."
          )), o.formTarget == null || Q0 || (Q0 = !0, console.error(
            "Cannot specify a formTarget for a button that specifies a function as a formAction. The function will always be executed in the same window."
          ))) : (X0 = !0, console.error(
            'A button can only specify a formAction along with type="submit" or no type.'
          )) : (X0 = !0, console.error(
            'An input can only specify a formAction along with type="submit" or type="image".'
          )) : console.error(
            a === "action" ? "You can only pass the action prop to <form>." : "You can only pass the formAction prop to <input> or <button>."
          )), typeof i == "function") {
            e.setAttribute(
              a,
              "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
            );
            break;
          } else
            typeof f == "function" && (a === "formAction" ? (t !== "input" && ke(e, t, "name", o.name, o, null), ke(
              e,
              t,
              "formEncType",
              o.formEncType,
              o,
              null
            ), ke(
              e,
              t,
              "formMethod",
              o.formMethod,
              o,
              null
            ), ke(
              e,
              t,
              "formTarget",
              o.formTarget,
              o,
              null
            )) : (ke(
              e,
              t,
              "encType",
              o.encType,
              o,
              null
            ), ke(e, t, "method", o.method, o, null), ke(
              e,
              t,
              "target",
              o.target,
              o,
              null
            )));
          if (i == null || typeof i == "symbol" || typeof i == "boolean") {
            e.removeAttribute(a);
            break;
          }
          I(i, a), i = Xc("" + i), e.setAttribute(a, i);
          break;
        case "onClick":
          i != null && (typeof i != "function" && Na(a, i), e.onclick = yu);
          break;
        case "onScroll":
          i != null && (typeof i != "function" && Na(a, i), _e("scroll", e));
          break;
        case "onScrollEnd":
          i != null && (typeof i != "function" && Na(a, i), _e("scrollend", e));
          break;
        case "dangerouslySetInnerHTML":
          if (i != null) {
            if (typeof i != "object" || !("__html" in i))
              throw Error(
                "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information."
              );
            if (a = i.__html, a != null) {
              if (o.children != null)
                throw Error(
                  "Can only set one of `children` or `props.dangerouslySetInnerHTML`."
                );
              e.innerHTML = a;
            }
          }
          break;
        case "multiple":
          e.multiple = i && typeof i != "function" && typeof i != "symbol";
          break;
        case "muted":
          e.muted = i && typeof i != "function" && typeof i != "symbol";
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "ref":
          break;
        case "autoFocus":
          break;
        case "xlinkHref":
          if (i == null || typeof i == "function" || typeof i == "boolean" || typeof i == "symbol") {
            e.removeAttribute("xlink:href");
            break;
          }
          I(i, a), a = Xc("" + i), e.setAttributeNS(Bs, "xlink:href", a);
          break;
        case "contentEditable":
        case "spellCheck":
        case "draggable":
        case "value":
        case "autoReverse":
        case "externalResourcesRequired":
        case "focusable":
        case "preserveAlpha":
          i != null && typeof i != "function" && typeof i != "symbol" ? (I(i, a), e.setAttribute(a, "" + i)) : e.removeAttribute(a);
          break;
        case "inert":
          i !== "" || L0[a] || (L0[a] = !0, console.error(
            "Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.",
            a
          ));
        case "allowFullScreen":
        case "async":
        case "autoPlay":
        case "controls":
        case "default":
        case "defer":
        case "disabled":
        case "disablePictureInPicture":
        case "disableRemotePlayback":
        case "formNoValidate":
        case "hidden":
        case "loop":
        case "noModule":
        case "noValidate":
        case "open":
        case "playsInline":
        case "readOnly":
        case "required":
        case "reversed":
        case "scoped":
        case "seamless":
        case "itemScope":
          i && typeof i != "function" && typeof i != "symbol" ? e.setAttribute(a, "") : e.removeAttribute(a);
          break;
        case "capture":
        case "download":
          i === !0 ? e.setAttribute(a, "") : i !== !1 && i != null && typeof i != "function" && typeof i != "symbol" ? (I(i, a), e.setAttribute(a, i)) : e.removeAttribute(a);
          break;
        case "cols":
        case "rows":
        case "size":
        case "span":
          i != null && typeof i != "function" && typeof i != "symbol" && !isNaN(i) && 1 <= i ? (I(i, a), e.setAttribute(a, i)) : e.removeAttribute(a);
          break;
        case "rowSpan":
        case "start":
          i == null || typeof i == "function" || typeof i == "symbol" || isNaN(i) ? e.removeAttribute(a) : (I(i, a), e.setAttribute(a, i));
          break;
        case "popover":
          _e("beforetoggle", e), _e("toggle", e), tf(e, "popover", i);
          break;
        case "xlinkActuate":
          Va(
            e,
            Bs,
            "xlink:actuate",
            i
          );
          break;
        case "xlinkArcrole":
          Va(
            e,
            Bs,
            "xlink:arcrole",
            i
          );
          break;
        case "xlinkRole":
          Va(
            e,
            Bs,
            "xlink:role",
            i
          );
          break;
        case "xlinkShow":
          Va(
            e,
            Bs,
            "xlink:show",
            i
          );
          break;
        case "xlinkTitle":
          Va(
            e,
            Bs,
            "xlink:title",
            i
          );
          break;
        case "xlinkType":
          Va(
            e,
            Bs,
            "xlink:type",
            i
          );
          break;
        case "xmlBase":
          Va(
            e,
            bg,
            "xml:base",
            i
          );
          break;
        case "xmlLang":
          Va(
            e,
            bg,
            "xml:lang",
            i
          );
          break;
        case "xmlSpace":
          Va(
            e,
            bg,
            "xml:space",
            i
          );
          break;
        case "is":
          f != null && console.error(
            'Cannot update the "is" prop after it has been initialized.'
          ), tf(e, "is", i);
          break;
        case "innerText":
        case "textContent":
          break;
        case "popoverTarget":
          u1 || i == null || typeof i != "object" || (u1 = !0, console.error(
            "The `popoverTarget` prop expects the ID of an Element as a string. Received %s instead.",
            i
          ));
        default:
          !(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N" ? (a = Ws(a), tf(e, a, i)) : Ba.hasOwnProperty(a) && i != null && typeof i != "function" && Na(a, i);
      }
    }
    function sc(e, t, a, i, o, f) {
      switch (a) {
        case "style":
          rf(e, i, f);
          break;
        case "dangerouslySetInnerHTML":
          if (i != null) {
            if (typeof i != "object" || !("__html" in i))
              throw Error(
                "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information."
              );
            if (a = i.__html, a != null) {
              if (o.children != null)
                throw Error(
                  "Can only set one of `children` or `props.dangerouslySetInnerHTML`."
                );
              e.innerHTML = a;
            }
          }
          break;
        case "children":
          typeof i == "string" ? ji(e, i) : (typeof i == "number" || typeof i == "bigint") && ji(e, "" + i);
          break;
        case "onScroll":
          i != null && (typeof i != "function" && Na(a, i), _e("scroll", e));
          break;
        case "onScrollEnd":
          i != null && (typeof i != "function" && Na(a, i), _e("scrollend", e));
          break;
        case "onClick":
          i != null && (typeof i != "function" && Na(a, i), e.onclick = yu);
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "innerHTML":
        case "ref":
          break;
        case "innerText":
        case "textContent":
          break;
        default:
          if (Ba.hasOwnProperty(a))
            i != null && typeof i != "function" && Na(a, i);
          else
            e: {
              if (a[0] === "o" && a[1] === "n" && (o = a.endsWith("Capture"), t = a.slice(2, o ? a.length - 7 : void 0), f = e[ea] || null, f = f != null ? f[a] : null, typeof f == "function" && e.removeEventListener(t, f, o), typeof i == "function")) {
                typeof f != "function" && f !== null && (a in e ? e[a] = null : e.hasAttribute(a) && e.removeAttribute(a)), e.addEventListener(t, i, o);
                break e;
              }
              a in e ? e[a] = i : i === !0 ? e.setAttribute(a, "") : tf(e, a, i);
            }
      }
    }
    function Ht(e, t, a) {
      switch (Cn(t, a), t) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "img":
          _e("error", e), _e("load", e);
          var i = !1, o = !1, f;
          for (f in a)
            if (a.hasOwnProperty(f)) {
              var d = a[f];
              if (d != null)
                switch (f) {
                  case "src":
                    i = !0;
                    break;
                  case "srcSet":
                    o = !0;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(
                      t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  default:
                    ke(e, t, f, d, a, null);
                }
            }
          o && ke(e, t, "srcSet", a.srcSet, a, null), i && ke(e, t, "src", a.src, a, null);
          return;
        case "input":
          ju("input", a), _e("invalid", e);
          var h = f = d = o = null, p = null, v = null;
          for (i in a)
            if (a.hasOwnProperty(i)) {
              var H = a[i];
              if (H != null)
                switch (i) {
                  case "name":
                    o = H;
                    break;
                  case "type":
                    d = H;
                    break;
                  case "checked":
                    p = H;
                    break;
                  case "defaultChecked":
                    v = H;
                    break;
                  case "value":
                    f = H;
                    break;
                  case "defaultValue":
                    h = H;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    if (H != null)
                      throw Error(
                        t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                      );
                    break;
                  default:
                    ke(e, t, i, H, a, null);
                }
            }
          _u(e, a), hp(
            e,
            f,
            h,
            p,
            v,
            d,
            o,
            !1
          ), Pn(e);
          return;
        case "select":
          ju("select", a), _e("invalid", e), i = d = f = null;
          for (o in a)
            if (a.hasOwnProperty(o) && (h = a[o], h != null))
              switch (o) {
                case "value":
                  f = h;
                  break;
                case "defaultValue":
                  d = h;
                  break;
                case "multiple":
                  i = h;
                default:
                  ke(
                    e,
                    t,
                    o,
                    h,
                    a,
                    null
                  );
              }
          cf(e, a), t = f, a = d, e.multiple = !!i, t != null ? eu(e, !!i, t, !1) : a != null && eu(e, !!i, a, !0);
          return;
        case "textarea":
          ju("textarea", a), _e("invalid", e), f = o = i = null;
          for (d in a)
            if (a.hasOwnProperty(d) && (h = a[d], h != null))
              switch (d) {
                case "value":
                  i = h;
                  break;
                case "defaultValue":
                  o = h;
                  break;
                case "children":
                  f = h;
                  break;
                case "dangerouslySetInnerHTML":
                  if (h != null)
                    throw Error(
                      "`dangerouslySetInnerHTML` does not make sense on <textarea>."
                    );
                  break;
                default:
                  ke(
                    e,
                    t,
                    d,
                    h,
                    a,
                    null
                  );
              }
          on(e, a), yh(e, i, o, f), Pn(e);
          return;
        case "option":
          mh(e, a);
          for (p in a)
            if (a.hasOwnProperty(p) && (i = a[p], i != null))
              switch (p) {
                case "selected":
                  e.selected = i && typeof i != "function" && typeof i != "symbol";
                  break;
                default:
                  ke(e, t, p, i, a, null);
              }
          return;
        case "dialog":
          _e("beforetoggle", e), _e("toggle", e), _e("cancel", e), _e("close", e);
          break;
        case "iframe":
        case "object":
          _e("load", e);
          break;
        case "video":
        case "audio":
          for (i = 0; i < $y.length; i++)
            _e($y[i], e);
          break;
        case "image":
          _e("error", e), _e("load", e);
          break;
        case "details":
          _e("toggle", e);
          break;
        case "embed":
        case "source":
        case "link":
          _e("error", e), _e("load", e);
        case "area":
        case "base":
        case "br":
        case "col":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "track":
        case "wbr":
        case "menuitem":
          for (v in a)
            if (a.hasOwnProperty(v) && (i = a[v], i != null))
              switch (v) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(
                    t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                  );
                default:
                  ke(e, t, v, i, a, null);
              }
          return;
        default:
          if (_i(t)) {
            for (H in a)
              a.hasOwnProperty(H) && (i = a[H], i !== void 0 && sc(
                e,
                t,
                H,
                i,
                a,
                void 0
              ));
            return;
          }
      }
      for (h in a)
        a.hasOwnProperty(h) && (i = a[h], i != null && ke(e, t, h, i, a, null));
    }
    function $p(e, t, a, i) {
      switch (Cn(t, i), t) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "input":
          var o = null, f = null, d = null, h = null, p = null, v = null, H = null;
          for (Y in a) {
            var B = a[Y];
            if (a.hasOwnProperty(Y) && B != null)
              switch (Y) {
                case "checked":
                  break;
                case "value":
                  break;
                case "defaultValue":
                  p = B;
                default:
                  i.hasOwnProperty(Y) || ke(
                    e,
                    t,
                    Y,
                    null,
                    i,
                    B
                  );
              }
          }
          for (var U in i) {
            var Y = i[U];
            if (B = a[U], i.hasOwnProperty(U) && (Y != null || B != null))
              switch (U) {
                case "type":
                  f = Y;
                  break;
                case "name":
                  o = Y;
                  break;
                case "checked":
                  v = Y;
                  break;
                case "defaultChecked":
                  H = Y;
                  break;
                case "value":
                  d = Y;
                  break;
                case "defaultValue":
                  h = Y;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (Y != null)
                    throw Error(
                      t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  break;
                default:
                  Y !== B && ke(
                    e,
                    t,
                    U,
                    Y,
                    i,
                    B
                  );
              }
          }
          t = a.type === "checkbox" || a.type === "radio" ? a.checked != null : a.value != null, i = i.type === "checkbox" || i.type === "radio" ? i.checked != null : i.value != null, t || !i || a1 || (console.error(
            "A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"
          ), a1 = !0), !t || i || l1 || (console.error(
            "A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"
          ), l1 = !0), qu(
            e,
            d,
            h,
            p,
            v,
            H,
            f,
            o
          );
          return;
        case "select":
          Y = d = h = U = null;
          for (f in a)
            if (p = a[f], a.hasOwnProperty(f) && p != null)
              switch (f) {
                case "value":
                  break;
                case "multiple":
                  Y = p;
                default:
                  i.hasOwnProperty(f) || ke(
                    e,
                    t,
                    f,
                    null,
                    i,
                    p
                  );
              }
          for (o in i)
            if (f = i[o], p = a[o], i.hasOwnProperty(o) && (f != null || p != null))
              switch (o) {
                case "value":
                  U = f;
                  break;
                case "defaultValue":
                  h = f;
                  break;
                case "multiple":
                  d = f;
                default:
                  f !== p && ke(
                    e,
                    t,
                    o,
                    f,
                    i,
                    p
                  );
              }
          i = h, t = d, a = Y, U != null ? eu(e, !!t, U, !1) : !!a != !!t && (i != null ? eu(e, !!t, i, !0) : eu(e, !!t, t ? [] : "", !1));
          return;
        case "textarea":
          Y = U = null;
          for (h in a)
            if (o = a[h], a.hasOwnProperty(h) && o != null && !i.hasOwnProperty(h))
              switch (h) {
                case "value":
                  break;
                case "children":
                  break;
                default:
                  ke(e, t, h, null, i, o);
              }
          for (d in i)
            if (o = i[d], f = a[d], i.hasOwnProperty(d) && (o != null || f != null))
              switch (d) {
                case "value":
                  U = o;
                  break;
                case "defaultValue":
                  Y = o;
                  break;
                case "children":
                  break;
                case "dangerouslySetInnerHTML":
                  if (o != null)
                    throw Error(
                      "`dangerouslySetInnerHTML` does not make sense on <textarea>."
                    );
                  break;
                default:
                  o !== f && ke(e, t, d, o, i, f);
              }
          Js(e, U, Y);
          return;
        case "option":
          for (var ne in a)
            if (U = a[ne], a.hasOwnProperty(ne) && U != null && !i.hasOwnProperty(ne))
              switch (ne) {
                case "selected":
                  e.selected = !1;
                  break;
                default:
                  ke(
                    e,
                    t,
                    ne,
                    null,
                    i,
                    U
                  );
              }
          for (p in i)
            if (U = i[p], Y = a[p], i.hasOwnProperty(p) && U !== Y && (U != null || Y != null))
              switch (p) {
                case "selected":
                  e.selected = U && typeof U != "function" && typeof U != "symbol";
                  break;
                default:
                  ke(
                    e,
                    t,
                    p,
                    U,
                    i,
                    Y
                  );
              }
          return;
        case "img":
        case "link":
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
        case "menuitem":
          for (var ge in a)
            U = a[ge], a.hasOwnProperty(ge) && U != null && !i.hasOwnProperty(ge) && ke(
              e,
              t,
              ge,
              null,
              i,
              U
            );
          for (v in i)
            if (U = i[v], Y = a[v], i.hasOwnProperty(v) && U !== Y && (U != null || Y != null))
              switch (v) {
                case "children":
                case "dangerouslySetInnerHTML":
                  if (U != null)
                    throw Error(
                      t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  break;
                default:
                  ke(
                    e,
                    t,
                    v,
                    U,
                    i,
                    Y
                  );
              }
          return;
        default:
          if (_i(t)) {
            for (var vt in a)
              U = a[vt], a.hasOwnProperty(vt) && U !== void 0 && !i.hasOwnProperty(vt) && sc(
                e,
                t,
                vt,
                void 0,
                i,
                U
              );
            for (H in i)
              U = i[H], Y = a[H], !i.hasOwnProperty(H) || U === Y || U === void 0 && Y === void 0 || sc(
                e,
                t,
                H,
                U,
                i,
                Y
              );
            return;
          }
      }
      for (var Qe in a)
        U = a[Qe], a.hasOwnProperty(Qe) && U != null && !i.hasOwnProperty(Qe) && ke(e, t, Qe, null, i, U);
      for (B in i)
        U = i[B], Y = a[B], !i.hasOwnProperty(B) || U === Y || U == null && Y == null || ke(e, t, B, U, i, Y);
    }
    function qm(e) {
      switch (e) {
        case "class":
          return "className";
        case "for":
          return "htmlFor";
        default:
          return e;
      }
    }
    function rc(e) {
      var t = {};
      e = e.style;
      for (var a = 0; a < e.length; a++) {
        var i = e[a];
        t[i] = e.getPropertyValue(i);
      }
      return t;
    }
    function Bm(e, t, a) {
      if (t != null && typeof t != "object")
        console.error(
          "The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX."
        );
      else {
        var i, o = i = "", f;
        for (f in t)
          if (t.hasOwnProperty(f)) {
            var d = t[f];
            d != null && typeof d != "boolean" && d !== "" && (f.indexOf("--") === 0 ? (me(d, f), i += o + f + ":" + ("" + d).trim()) : typeof d != "number" || d === 0 || Ss.has(f) ? (me(d, f), i += o + f.replace(Au, "-$1").toLowerCase().replace(Ru, "-ms-") + ":" + ("" + d).trim()) : i += o + f.replace(Au, "-$1").toLowerCase().replace(Ru, "-ms-") + ":" + d + "px", o = ";");
          }
        i = i || null, t = e.getAttribute("style"), t !== i && (i = ml(i), ml(t) !== i && (a.style = rc(e)));
      }
    }
    function ql(e, t, a, i, o, f) {
      if (o.delete(a), e = e.getAttribute(a), e === null)
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            return;
        }
      else if (i != null)
        switch (typeof i) {
          case "function":
          case "symbol":
          case "boolean":
            break;
          default:
            if (I(i, t), e === "" + i)
              return;
        }
      St(t, e, i, f);
    }
    function Ym(e, t, a, i, o, f) {
      if (o.delete(a), e = e.getAttribute(a), e === null) {
        switch (typeof i) {
          case "function":
          case "symbol":
            return;
        }
        if (!i) return;
      } else
        switch (typeof i) {
          case "function":
          case "symbol":
            break;
          default:
            if (i) return;
        }
      St(t, e, i, f);
    }
    function wm(e, t, a, i, o, f) {
      if (o.delete(a), e = e.getAttribute(a), e === null)
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
            return;
        }
      else if (i != null)
        switch (typeof i) {
          case "function":
          case "symbol":
            break;
          default:
            if (I(i, a), e === "" + i)
              return;
        }
      St(t, e, i, f);
    }
    function Wp(e, t, a, i, o, f) {
      if (o.delete(a), e = e.getAttribute(a), e === null)
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            return;
          default:
            if (isNaN(i)) return;
        }
      else if (i != null)
        switch (typeof i) {
          case "function":
          case "symbol":
          case "boolean":
            break;
          default:
            if (!isNaN(i) && (I(i, t), e === "" + i))
              return;
        }
      St(t, e, i, f);
    }
    function et(e, t, a, i, o, f) {
      if (o.delete(a), e = e.getAttribute(a), e === null)
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            return;
        }
      else if (i != null)
        switch (typeof i) {
          case "function":
          case "symbol":
          case "boolean":
            break;
          default:
            if (I(i, t), a = Xc("" + i), e === a)
              return;
        }
      St(t, e, i, f);
    }
    function ft(e, t, a, i) {
      for (var o = {}, f = /* @__PURE__ */ new Set(), d = e.attributes, h = 0; h < d.length; h++)
        switch (d[h].name.toLowerCase()) {
          case "value":
            break;
          case "checked":
            break;
          case "selected":
            break;
          default:
            f.add(d[h].name);
        }
      if (_i(t)) {
        for (var p in a)
          if (a.hasOwnProperty(p)) {
            var v = a[p];
            if (v != null) {
              if (Ba.hasOwnProperty(p))
                typeof v != "function" && Na(p, v);
              else if (a.suppressHydrationWarning !== !0)
                switch (p) {
                  case "children":
                    typeof v != "string" && typeof v != "number" || St(
                      "children",
                      e.textContent,
                      v,
                      o
                    );
                    continue;
                  case "suppressContentEditableWarning":
                  case "suppressHydrationWarning":
                  case "defaultValue":
                  case "defaultChecked":
                  case "innerHTML":
                  case "ref":
                    continue;
                  case "dangerouslySetInnerHTML":
                    d = e.innerHTML, v = v ? v.__html : void 0, v != null && (v = cd(e, v), St(
                      p,
                      d,
                      v,
                      o
                    ));
                    continue;
                  case "style":
                    f.delete(p), Bm(e, v, o);
                    continue;
                  case "offsetParent":
                  case "offsetTop":
                  case "offsetLeft":
                  case "offsetWidth":
                  case "offsetHeight":
                  case "isContentEditable":
                  case "outerText":
                  case "outerHTML":
                    f.delete(p.toLowerCase()), console.error(
                      "Assignment to read-only property will result in a no-op: `%s`",
                      p
                    );
                    continue;
                  case "className":
                    f.delete("class"), d = fp(
                      e,
                      "class",
                      v
                    ), St(
                      "className",
                      d,
                      v,
                      o
                    );
                    continue;
                  default:
                    i.context === Cc && t !== "svg" && t !== "math" ? f.delete(p.toLowerCase()) : f.delete(p), d = fp(
                      e,
                      p,
                      v
                    ), St(
                      p,
                      d,
                      v,
                      o
                    );
                }
            }
          }
      } else
        for (v in a)
          if (a.hasOwnProperty(v) && (p = a[v], p != null)) {
            if (Ba.hasOwnProperty(v))
              typeof p != "function" && Na(v, p);
            else if (a.suppressHydrationWarning !== !0)
              switch (v) {
                case "children":
                  typeof p != "string" && typeof p != "number" || St(
                    "children",
                    e.textContent,
                    p,
                    o
                  );
                  continue;
                case "suppressContentEditableWarning":
                case "suppressHydrationWarning":
                case "value":
                case "checked":
                case "selected":
                case "defaultValue":
                case "defaultChecked":
                case "innerHTML":
                case "ref":
                  continue;
                case "dangerouslySetInnerHTML":
                  d = e.innerHTML, p = p ? p.__html : void 0, p != null && (p = cd(e, p), d !== p && (o[v] = { __html: d }));
                  continue;
                case "className":
                  ql(
                    e,
                    v,
                    "class",
                    p,
                    f,
                    o
                  );
                  continue;
                case "tabIndex":
                  ql(
                    e,
                    v,
                    "tabindex",
                    p,
                    f,
                    o
                  );
                  continue;
                case "style":
                  f.delete(v), Bm(e, p, o);
                  continue;
                case "multiple":
                  f.delete(v), St(
                    v,
                    e.multiple,
                    p,
                    o
                  );
                  continue;
                case "muted":
                  f.delete(v), St(
                    v,
                    e.muted,
                    p,
                    o
                  );
                  continue;
                case "autoFocus":
                  f.delete("autofocus"), St(
                    v,
                    e.autofocus,
                    p,
                    o
                  );
                  continue;
                case "data":
                  if (t !== "object") {
                    f.delete(v), d = e.getAttribute("data"), St(
                      v,
                      d,
                      p,
                      o
                    );
                    continue;
                  }
                case "src":
                case "href":
                  if (!(p !== "" || t === "a" && v === "href" || t === "object" && v === "data")) {
                    console.error(
                      v === "src" ? 'An empty string ("") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string.' : 'An empty string ("") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.',
                      v,
                      v
                    );
                    continue;
                  }
                  et(
                    e,
                    v,
                    v,
                    p,
                    f,
                    o
                  );
                  continue;
                case "action":
                case "formAction":
                  if (d = e.getAttribute(v), typeof p == "function") {
                    f.delete(v.toLowerCase()), v === "formAction" ? (f.delete("name"), f.delete("formenctype"), f.delete("formmethod"), f.delete("formtarget")) : (f.delete("enctype"), f.delete("method"), f.delete("target"));
                    continue;
                  } else if (d === VS) {
                    f.delete(v.toLowerCase()), St(
                      v,
                      "function",
                      p,
                      o
                    );
                    continue;
                  }
                  et(
                    e,
                    v,
                    v.toLowerCase(),
                    p,
                    f,
                    o
                  );
                  continue;
                case "xlinkHref":
                  et(
                    e,
                    v,
                    "xlink:href",
                    p,
                    f,
                    o
                  );
                  continue;
                case "contentEditable":
                  wm(
                    e,
                    v,
                    "contenteditable",
                    p,
                    f,
                    o
                  );
                  continue;
                case "spellCheck":
                  wm(
                    e,
                    v,
                    "spellcheck",
                    p,
                    f,
                    o
                  );
                  continue;
                case "draggable":
                case "autoReverse":
                case "externalResourcesRequired":
                case "focusable":
                case "preserveAlpha":
                  wm(
                    e,
                    v,
                    v,
                    p,
                    f,
                    o
                  );
                  continue;
                case "allowFullScreen":
                case "async":
                case "autoPlay":
                case "controls":
                case "default":
                case "defer":
                case "disabled":
                case "disablePictureInPicture":
                case "disableRemotePlayback":
                case "formNoValidate":
                case "hidden":
                case "loop":
                case "noModule":
                case "noValidate":
                case "open":
                case "playsInline":
                case "readOnly":
                case "required":
                case "reversed":
                case "scoped":
                case "seamless":
                case "itemScope":
                  Ym(
                    e,
                    v,
                    v.toLowerCase(),
                    p,
                    f,
                    o
                  );
                  continue;
                case "capture":
                case "download":
                  e: {
                    h = e;
                    var H = d = v, B = o;
                    if (f.delete(H), h = h.getAttribute(H), h === null)
                      switch (typeof p) {
                        case "undefined":
                        case "function":
                        case "symbol":
                          break e;
                        default:
                          if (p === !1) break e;
                      }
                    else if (p != null)
                      switch (typeof p) {
                        case "function":
                        case "symbol":
                          break;
                        case "boolean":
                          if (p === !0 && h === "") break e;
                          break;
                        default:
                          if (I(p, d), h === "" + p)
                            break e;
                      }
                    St(
                      d,
                      h,
                      p,
                      B
                    );
                  }
                  continue;
                case "cols":
                case "rows":
                case "size":
                case "span":
                  e: {
                    if (h = e, H = d = v, B = o, f.delete(H), h = h.getAttribute(H), h === null)
                      switch (typeof p) {
                        case "undefined":
                        case "function":
                        case "symbol":
                        case "boolean":
                          break e;
                        default:
                          if (isNaN(p) || 1 > p) break e;
                      }
                    else if (p != null)
                      switch (typeof p) {
                        case "function":
                        case "symbol":
                        case "boolean":
                          break;
                        default:
                          if (!(isNaN(p) || 1 > p) && (I(p, d), h === "" + p))
                            break e;
                      }
                    St(
                      d,
                      h,
                      p,
                      B
                    );
                  }
                  continue;
                case "rowSpan":
                  Wp(
                    e,
                    v,
                    "rowspan",
                    p,
                    f,
                    o
                  );
                  continue;
                case "start":
                  Wp(
                    e,
                    v,
                    v,
                    p,
                    f,
                    o
                  );
                  continue;
                case "xHeight":
                  ql(
                    e,
                    v,
                    "x-height",
                    p,
                    f,
                    o
                  );
                  continue;
                case "xlinkActuate":
                  ql(
                    e,
                    v,
                    "xlink:actuate",
                    p,
                    f,
                    o
                  );
                  continue;
                case "xlinkArcrole":
                  ql(
                    e,
                    v,
                    "xlink:arcrole",
                    p,
                    f,
                    o
                  );
                  continue;
                case "xlinkRole":
                  ql(
                    e,
                    v,
                    "xlink:role",
                    p,
                    f,
                    o
                  );
                  continue;
                case "xlinkShow":
                  ql(
                    e,
                    v,
                    "xlink:show",
                    p,
                    f,
                    o
                  );
                  continue;
                case "xlinkTitle":
                  ql(
                    e,
                    v,
                    "xlink:title",
                    p,
                    f,
                    o
                  );
                  continue;
                case "xlinkType":
                  ql(
                    e,
                    v,
                    "xlink:type",
                    p,
                    f,
                    o
                  );
                  continue;
                case "xmlBase":
                  ql(
                    e,
                    v,
                    "xml:base",
                    p,
                    f,
                    o
                  );
                  continue;
                case "xmlLang":
                  ql(
                    e,
                    v,
                    "xml:lang",
                    p,
                    f,
                    o
                  );
                  continue;
                case "xmlSpace":
                  ql(
                    e,
                    v,
                    "xml:space",
                    p,
                    f,
                    o
                  );
                  continue;
                case "inert":
                  p !== "" || L0[v] || (L0[v] = !0, console.error(
                    "Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.",
                    v
                  )), Ym(
                    e,
                    v,
                    v,
                    p,
                    f,
                    o
                  );
                  continue;
                default:
                  if (!(2 < v.length) || v[0] !== "o" && v[0] !== "O" || v[1] !== "n" && v[1] !== "N") {
                    h = Ws(v), d = !1, i.context === Cc && t !== "svg" && t !== "math" ? f.delete(h.toLowerCase()) : (H = v.toLowerCase(), H = Tc.hasOwnProperty(
                      H
                    ) && Tc[H] || null, H !== null && H !== v && (d = !0, f.delete(H)), f.delete(h));
                    e: if (H = e, B = h, h = p, Oi(B))
                      if (H.hasAttribute(B))
                        H = H.getAttribute(
                          B
                        ), I(
                          h,
                          B
                        ), h = H === "" + h ? h : H;
                      else {
                        switch (typeof h) {
                          case "function":
                          case "symbol":
                            break e;
                          case "boolean":
                            if (H = B.toLowerCase().slice(0, 5), H !== "data-" && H !== "aria-")
                              break e;
                        }
                        h = h === void 0 ? void 0 : null;
                      }
                    else h = void 0;
                    d || St(
                      v,
                      h,
                      p,
                      o
                    );
                  }
              }
          }
      return 0 < f.size && a.suppressHydrationWarning !== !0 && ii(e, f, o), Object.keys(o).length === 0 ? null : o;
    }
    function qe(e, t) {
      switch (e.length) {
        case 0:
          return "";
        case 1:
          return e[0];
        case 2:
          return e[0] + " " + t + " " + e[1];
        default:
          return e.slice(0, -1).join(", ") + ", " + t + " " + e[e.length - 1];
      }
    }
    function Be(e) {
      return e.nodeType === 9 ? e : e.ownerDocument;
    }
    function tt(e) {
      switch (e) {
        case Bo:
          return oh;
        case Ts:
          return k0;
        default:
          return Cc;
      }
    }
    function Wl(e, t) {
      if (e === Cc)
        switch (t) {
          case "svg":
            return oh;
          case "math":
            return k0;
          default:
            return Cc;
        }
      return e === oh && t === "foreignObject" ? Cc : e;
    }
    function Hn(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    function po() {
      var e = window.event;
      return e && e.type === "popstate" ? e === Eg ? !1 : (Eg = e, !0) : (Eg = null, !1);
    }
    function Gm(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function pu(e, t, a) {
      switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && e.focus();
          break;
        case "img":
          a.src ? e.src = a.src : a.srcSet && (e.srcset = a.srcSet);
      }
    }
    function Nt(e, t, a, i) {
      $p(e, t, a, i), e[ea] = i;
    }
    function vu(e) {
      ji(e, "");
    }
    function dc(e, t, a) {
      e.nodeValue = a;
    }
    function Nn(e) {
      return e === "head";
    }
    function ja(e, t) {
      e.removeChild(t);
    }
    function vo(e, t) {
      (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).removeChild(t);
    }
    function go(e, t) {
      var a = t, i = 0, o = 0;
      do {
        var f = a.nextSibling;
        if (e.removeChild(a), f && f.nodeType === 8)
          if (a = f.data, a === K0) {
            if (0 < i && 8 > i) {
              a = i;
              var d = e.ownerDocument;
              if (a & QS && xo(d.documentElement), a & ZS && xo(d.body), a & LS)
                for (a = d.head, xo(a), d = a.firstChild; d; ) {
                  var h = d.nextSibling, p = d.nodeName;
                  d[No] || p === "SCRIPT" || p === "STYLE" || p === "LINK" && d.rel.toLowerCase() === "stylesheet" || a.removeChild(d), d = h;
                }
            }
            if (o === 0) {
              e.removeChild(f), pc(t);
              return;
            }
            o--;
          } else
            a === J0 || a === Uc || a === Wy ? o++ : i = a.charCodeAt(0) - 48;
        else i = 0;
        a = f;
      } while (a);
      pc(t);
    }
    function Fl(e) {
      e = e.style, typeof e.setProperty == "function" ? e.setProperty("display", "none", "important") : e.display = "none";
    }
    function Vm(e) {
      e.nodeValue = "";
    }
    function Xm(e, t) {
      t = t[JS], t = t != null && t.hasOwnProperty("display") ? t.display : null, e.style.display = t == null || typeof t == "boolean" ? "" : ("" + t).trim();
    }
    function od(e, t) {
      e.nodeValue = t;
    }
    function bo(e) {
      var t = e.firstChild;
      for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
        var a = t;
        switch (t = t.nextSibling, a.nodeName) {
          case "HTML":
          case "HEAD":
          case "BODY":
            bo(a), qc(a);
            continue;
          case "SCRIPT":
          case "STYLE":
            continue;
          case "LINK":
            if (a.rel.toLowerCase() === "stylesheet") continue;
        }
        e.removeChild(a);
      }
    }
    function ci(e, t, a, i) {
      for (; e.nodeType === 1; ) {
        var o = a;
        if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
          if (!i && (e.nodeName !== "INPUT" || e.type !== "hidden"))
            break;
        } else if (i) {
          if (!e[No])
            switch (t) {
              case "meta":
                if (!e.hasAttribute("itemprop")) break;
                return e;
              case "link":
                if (f = e.getAttribute("rel"), f === "stylesheet" && e.hasAttribute("data-precedence"))
                  break;
                if (f !== o.rel || e.getAttribute("href") !== (o.href == null || o.href === "" ? null : o.href) || e.getAttribute("crossorigin") !== (o.crossOrigin == null ? null : o.crossOrigin) || e.getAttribute("title") !== (o.title == null ? null : o.title))
                  break;
                return e;
              case "style":
                if (e.hasAttribute("data-precedence")) break;
                return e;
              case "script":
                if (f = e.getAttribute("src"), (f !== (o.src == null ? null : o.src) || e.getAttribute("type") !== (o.type == null ? null : o.type) || e.getAttribute("crossorigin") !== (o.crossOrigin == null ? null : o.crossOrigin)) && f && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                  break;
                return e;
              default:
                return e;
            }
        } else if (t === "input" && e.type === "hidden") {
          I(o.name, "name");
          var f = o.name == null ? null : "" + o.name;
          if (o.type === "hidden" && e.getAttribute("name") === f)
            return e;
        } else return e;
        if (e = pl(e.nextSibling), e === null) break;
      }
      return null;
    }
    function yl(e, t, a) {
      if (t === "") return null;
      for (; e.nodeType !== 3; )
        if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !a || (e = pl(e.nextSibling), e === null)) return null;
      return e;
    }
    function jn(e) {
      return e.data === Wy || e.data === Uc && e.ownerDocument.readyState === c1;
    }
    function So(e, t) {
      var a = e.ownerDocument;
      if (e.data !== Uc || a.readyState === c1)
        t();
      else {
        var i = function() {
          t(), a.removeEventListener("DOMContentLoaded", i);
        };
        a.addEventListener("DOMContentLoaded", i), e._reactRetry = i;
      }
    }
    function pl(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
          if (t = e.data, t === J0 || t === Wy || t === Uc || t === Sg || t === i1)
            break;
          if (t === K0) return null;
        }
      }
      return e;
    }
    function fd(e) {
      if (e.nodeType === 1) {
        for (var t = e.nodeName.toLowerCase(), a = {}, i = e.attributes, o = 0; o < i.length; o++) {
          var f = i[o];
          a[qm(f.name)] = f.name.toLowerCase() === "style" ? rc(e) : f.value;
        }
        return { type: t, props: a };
      }
      return e.nodeType === 8 ? { type: "Suspense", props: {} } : e.nodeValue;
    }
    function sd(e, t, a) {
      return a === null || a[XS] !== !0 ? (e.nodeValue === t ? e = null : (t = ml(t), e = ml(e.nodeValue) === t ? null : e.nodeValue), e) : null;
    }
    function Qm(e) {
      e = e.nextSibling;
      for (var t = 0; e; ) {
        if (e.nodeType === 8) {
          var a = e.data;
          if (a === K0) {
            if (t === 0)
              return pl(e.nextSibling);
            t--;
          } else
            a !== J0 && a !== Wy && a !== Uc || t++;
        }
        e = e.nextSibling;
      }
      return null;
    }
    function To(e) {
      e = e.previousSibling;
      for (var t = 0; e; ) {
        if (e.nodeType === 8) {
          var a = e.data;
          if (a === J0 || a === Wy || a === Uc) {
            if (t === 0) return e;
            t--;
          } else a === K0 && t++;
        }
        e = e.previousSibling;
      }
      return null;
    }
    function Zm(e) {
      pc(e);
    }
    function ra(e) {
      pc(e);
    }
    function Lm(e, t, a, i, o) {
      switch (o && $s(e, i.ancestorInfo), t = Be(a), e) {
        case "html":
          if (e = t.documentElement, !e)
            throw Error(
              "React expected an <html> element (document.documentElement) to exist in the Document but one was not found. React never removes the documentElement for any Document it renders into so the cause is likely in some other script running on this page."
            );
          return e;
        case "head":
          if (e = t.head, !e)
            throw Error(
              "React expected a <head> element (document.head) to exist in the Document but one was not found. React never removes the head for any Document it renders into so the cause is likely in some other script running on this page."
            );
          return e;
        case "body":
          if (e = t.body, !e)
            throw Error(
              "React expected a <body> element (document.body) to exist in the Document but one was not found. React never removes the body for any Document it renders into so the cause is likely in some other script running on this page."
            );
          return e;
        default:
          throw Error(
            "resolveSingletonInstance was called with an element type that is not supported. This is a bug in React."
          );
      }
    }
    function da(e, t, a, i) {
      if (!a[pi] && na(a)) {
        var o = a.tagName.toLowerCase();
        console.error(
          "You are mounting a new %s component when a previous one has not first unmounted. It is an error to render more than one %s component at a time and attributes and children of these components will likely fail in unpredictable ways. Please only render a single instance of <%s> and if you need to mount a new one, ensure any previous ones have unmounted first.",
          o,
          o,
          o
        );
      }
      switch (e) {
        case "html":
        case "head":
        case "body":
          break;
        default:
          console.error(
            "acquireSingletonInstance was called with an element type that is not supported. This is a bug in React."
          );
      }
      for (o = a.attributes; o.length; )
        a.removeAttributeNode(o[0]);
      Ht(a, e, t), a[Dl] = i, a[ea] = t;
    }
    function xo(e) {
      for (var t = e.attributes; t.length; )
        e.removeAttributeNode(t[0]);
      qc(e);
    }
    function es(e) {
      return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
    }
    function Fp(e, t, a) {
      var i = fh;
      if (i && typeof t == "string" && t) {
        var o = ua(t);
        o = 'link[rel="' + e + '"][href="' + o + '"]', typeof a == "string" && (o += '[crossorigin="' + a + '"]'), h1.has(o) || (h1.add(o), e = { rel: e, crossOrigin: a, href: t }, i.querySelector(o) === null && (t = i.createElement("link"), Ht(t, "link", e), Pt(t), i.head.appendChild(t)));
      }
    }
    function gu(e, t, a, i) {
      var o = (o = qn.current) ? es(o) : null;
      if (!o)
        throw Error(
          '"resourceRoot" was expected to exist. This is a bug in React.'
        );
      switch (e) {
        case "meta":
        case "title":
          return null;
        case "style":
          return typeof a.precedence == "string" && typeof a.href == "string" ? (a = oi(a.href), t = cn(o).hoistableStyles, i = t.get(a), i || (i = {
            type: "style",
            instance: null,
            count: 0,
            state: null
          }, t.set(a, i)), i) : { type: "void", instance: null, count: 0, state: null };
        case "link":
          if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
            e = oi(a.href);
            var f = cn(o).hoistableStyles, d = f.get(e);
            if (!d && (o = o.ownerDocument || o, d = {
              type: "stylesheet",
              instance: null,
              count: 0,
              state: { loading: ws, preload: null }
            }, f.set(e, d), (f = o.querySelector(
              _n(e)
            )) && !f._p && (d.instance = f, d.state.loading = Fy | $n), !Wn.has(e))) {
              var h = {
                rel: "preload",
                as: "style",
                href: a.href,
                crossOrigin: a.crossOrigin,
                integrity: a.integrity,
                media: a.media,
                hrefLang: a.hrefLang,
                referrerPolicy: a.referrerPolicy
              };
              Wn.set(e, h), f || Ip(
                o,
                e,
                h,
                d.state
              );
            }
            if (t && i === null)
              throw a = `

  - ` + hc(t) + `
  + ` + hc(a), Error(
                "Expected <link> not to update to be updated to a stylesheet with precedence. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + a
              );
            return d;
          }
          if (t && i !== null)
            throw a = `

  - ` + hc(t) + `
  + ` + hc(a), Error(
              "Expected stylesheet with precedence to not be updated to a different kind of <link>. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + a
            );
          return null;
        case "script":
          return t = a.async, a = a.src, typeof a == "string" && t && typeof t != "function" && typeof t != "symbol" ? (a = mc(a), t = cn(o).hoistableScripts, i = t.get(a), i || (i = {
            type: "script",
            instance: null,
            count: 0,
            state: null
          }, t.set(a, i)), i) : { type: "void", instance: null, count: 0, state: null };
        default:
          throw Error(
            'getResource encountered a type it did not expect: "' + e + '". this is a bug in React.'
          );
      }
    }
    function hc(e) {
      var t = 0, a = "<link";
      return typeof e.rel == "string" ? (t++, a += ' rel="' + e.rel + '"') : Tu.call(e, "rel") && (t++, a += ' rel="' + (e.rel === null ? "null" : "invalid type " + typeof e.rel) + '"'), typeof e.href == "string" ? (t++, a += ' href="' + e.href + '"') : Tu.call(e, "href") && (t++, a += ' href="' + (e.href === null ? "null" : "invalid type " + typeof e.href) + '"'), typeof e.precedence == "string" ? (t++, a += ' precedence="' + e.precedence + '"') : Tu.call(e, "precedence") && (t++, a += " precedence={" + (e.precedence === null ? "null" : "invalid type " + typeof e.precedence) + "}"), Object.getOwnPropertyNames(e).length > t && (a += " ..."), a + " />";
    }
    function oi(e) {
      return 'href="' + ua(e) + '"';
    }
    function _n(e) {
      return 'link[rel="stylesheet"][' + e + "]";
    }
    function Jm(e) {
      return Me({}, e, {
        "data-precedence": e.precedence,
        precedence: null
      });
    }
    function Ip(e, t, a, i) {
      e.querySelector(
        'link[rel="preload"][as="style"][' + t + "]"
      ) ? i.loading = Fy : (t = e.createElement("link"), i.preload = t, t.addEventListener("load", function() {
        return i.loading |= Fy;
      }), t.addEventListener("error", function() {
        return i.loading |= r1;
      }), Ht(t, "link", a), Pt(t), e.head.appendChild(t));
    }
    function mc(e) {
      return '[src="' + ua(e) + '"]';
    }
    function yc(e) {
      return "script[async]" + e;
    }
    function rd(e, t, a) {
      if (t.count++, t.instance === null)
        switch (t.type) {
          case "style":
            var i = e.querySelector(
              'style[data-href~="' + ua(a.href) + '"]'
            );
            if (i)
              return t.instance = i, Pt(i), i;
            var o = Me({}, a, {
              "data-href": a.href,
              "data-precedence": a.precedence,
              href: null,
              precedence: null
            });
            return i = (e.ownerDocument || e).createElement("style"), Pt(i), Ht(i, "style", o), dd(i, a.precedence, e), t.instance = i;
          case "stylesheet":
            o = oi(a.href);
            var f = e.querySelector(
              _n(o)
            );
            if (f)
              return t.state.loading |= $n, t.instance = f, Pt(f), f;
            i = Jm(a), (o = Wn.get(o)) && Km(i, o), f = (e.ownerDocument || e).createElement("link"), Pt(f);
            var d = f;
            return d._p = new Promise(function(h, p) {
              d.onload = h, d.onerror = p;
            }), Ht(f, "link", i), t.state.loading |= $n, dd(f, a.precedence, e), t.instance = f;
          case "script":
            return f = mc(a.src), (o = e.querySelector(
              yc(f)
            )) ? (t.instance = o, Pt(o), o) : (i = a, (o = Wn.get(f)) && (i = Me({}, a), km(i, o)), e = e.ownerDocument || e, o = e.createElement("script"), Pt(o), Ht(o, "link", i), e.head.appendChild(o), t.instance = o);
          case "void":
            return null;
          default:
            throw Error(
              'acquireResource encountered a resource type it did not expect: "' + t.type + '". this is a bug in React.'
            );
        }
      else
        t.type === "stylesheet" && (t.state.loading & $n) === ws && (i = t.instance, t.state.loading |= $n, dd(i, a.precedence, e));
      return t.instance;
    }
    function dd(e, t, a) {
      for (var i = a.querySelectorAll(
        'link[rel="stylesheet"][data-precedence],style[data-precedence]'
      ), o = i.length ? i[i.length - 1] : null, f = o, d = 0; d < i.length; d++) {
        var h = i[d];
        if (h.dataset.precedence === t) f = h;
        else if (f !== o) break;
      }
      f ? f.parentNode.insertBefore(e, f.nextSibling) : (t = a.nodeType === 9 ? a.head : a, t.insertBefore(e, t.firstChild));
    }
    function Km(e, t) {
      e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
    }
    function km(e, t) {
      e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
    }
    function $m(e, t, a) {
      if ($0 === null) {
        var i = /* @__PURE__ */ new Map(), o = $0 = /* @__PURE__ */ new Map();
        o.set(a, i);
      } else
        o = $0, i = o.get(a), i || (i = /* @__PURE__ */ new Map(), o.set(a, i));
      if (i.has(e)) return i;
      for (i.set(e, null), a = a.getElementsByTagName(e), o = 0; o < a.length; o++) {
        var f = a[o];
        if (!(f[No] || f[Dl] || e === "link" && f.getAttribute("rel") === "stylesheet") && f.namespaceURI !== Bo) {
          var d = f.getAttribute(t) || "";
          d = e + d;
          var h = i.get(d);
          h ? h.push(f) : i.set(d, [f]);
        }
      }
      return i;
    }
    function Wm(e, t, a) {
      e = e.ownerDocument || e, e.head.insertBefore(
        a,
        t === "title" ? e.querySelector("head > title") : null
      );
    }
    function Eo(e, t, a) {
      var i = !a.ancestorInfo.containerTagInScope;
      if (a.context === oh || t.itemProp != null)
        return !i || t.itemProp == null || e !== "meta" && e !== "title" && e !== "style" && e !== "link" && e !== "script" || console.error(
          "Cannot render a <%s> outside the main document if it has an `itemProp` prop. `itemProp` suggests the tag belongs to an `itemScope` which can appear anywhere in the DOM. If you were intending for React to hoist this <%s> remove the `itemProp` prop. Otherwise, try moving this tag into the <head> or <body> of the Document.",
          e,
          e
        ), !1;
      switch (e) {
        case "meta":
        case "title":
          return !0;
        case "style":
          if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") {
            i && console.error(
              'Cannot render a <style> outside the main document without knowing its precedence and a unique href key. React can hoist and deduplicate <style> tags if you provide a `precedence` prop along with an `href` prop that does not conflict with the `href` values used in any other hoisted <style> or <link rel="stylesheet" ...> tags.  Note that hoisting <style> tags is considered an advanced feature that most will not use directly. Consider moving the <style> tag to the <head> or consider adding a `precedence="default"` and `href="some unique resource identifier"`.'
            );
            break;
          }
          return !0;
        case "link":
          if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) {
            if (t.rel === "stylesheet" && typeof t.precedence == "string") {
              e = t.href;
              var o = t.onError, f = t.disabled;
              a = [], t.onLoad && a.push("`onLoad`"), o && a.push("`onError`"), f != null && a.push("`disabled`"), o = qe(a, "and"), o += a.length === 1 ? " prop" : " props", f = a.length === 1 ? "an " + o : "the " + o, a.length && console.error(
                'React encountered a <link rel="stylesheet" href="%s" ... /> with a `precedence` prop that also included %s. The presence of loading and error handlers indicates an intent to manage the stylesheet loading state from your from your Component code and React will not hoist or deduplicate this stylesheet. If your intent was to have React hoist and deduplciate this stylesheet using the `precedence` prop remove the %s, otherwise remove the `precedence` prop.',
                e,
                f,
                o
              );
            }
            i && (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" ? console.error(
              "Cannot render a <link> outside the main document without a `rel` and `href` prop. Try adding a `rel` and/or `href` prop to this <link> or moving the link into the <head> tag"
            ) : (t.onError || t.onLoad) && console.error(
              "Cannot render a <link> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>."
            ));
            break;
          }
          switch (t.rel) {
            case "stylesheet":
              return e = t.precedence, t = t.disabled, typeof e != "string" && i && console.error(
                'Cannot render a <link rel="stylesheet" /> outside the main document without knowing its precedence. Consider adding precedence="default" or moving it into the root <head> tag.'
              ), typeof e == "string" && t == null;
            default:
              return !0;
          }
        case "script":
          if (e = t.async && typeof t.async != "function" && typeof t.async != "symbol", !e || t.onLoad || t.onError || !t.src || typeof t.src != "string") {
            i && (e ? t.onLoad || t.onError ? console.error(
              "Cannot render a <script> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>."
            ) : console.error(
              "Cannot render a <script> outside the main document without `async={true}` and a non-empty `src` prop. Ensure there is a valid `src` and either make the script async or move it into the root <head> tag or somewhere in the <body>."
            ) : console.error(
              'Cannot render a sync or defer <script> outside the main document without knowing its order. Try adding async="" or moving it into the root <head> tag.'
            ));
            break;
          }
          return !0;
        case "noscript":
        case "template":
          i && console.error(
            "Cannot render <%s> outside the main document. Try moving it into the root <head> tag.",
            e
          );
      }
      return !1;
    }
    function ts(e) {
      return !(e.type === "stylesheet" && (e.state.loading & d1) === ws);
    }
    function Pp() {
    }
    function e0(e, t, a) {
      if (Iy === null)
        throw Error(
          "Internal React Error: suspendedState null when it was expected to exists. Please report this as a React bug."
        );
      var i = Iy;
      if (t.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (t.state.loading & $n) === ws) {
        if (t.instance === null) {
          var o = oi(a.href), f = e.querySelector(
            _n(o)
          );
          if (f) {
            e = f._p, e !== null && typeof e == "object" && typeof e.then == "function" && (i.count++, i = ls.bind(i), e.then(i, i)), t.state.loading |= $n, t.instance = f, Pt(f);
            return;
          }
          f = e.ownerDocument || e, a = Jm(a), (o = Wn.get(o)) && Km(a, o), f = f.createElement("link"), Pt(f);
          var d = f;
          d._p = new Promise(function(h, p) {
            d.onload = h, d.onerror = p;
          }), Ht(f, "link", a), t.instance = f;
        }
        i.stylesheets === null && (i.stylesheets = /* @__PURE__ */ new Map()), i.stylesheets.set(t, e), (e = t.state.preload) && (t.state.loading & d1) === ws && (i.count++, t = ls.bind(i), e.addEventListener("load", t), e.addEventListener("error", t));
      }
    }
    function t0() {
      if (Iy === null)
        throw Error(
          "Internal React Error: suspendedState null when it was expected to exists. Please report this as a React bug."
        );
      var e = Iy;
      return e.stylesheets && e.count === 0 && hd(e, e.stylesheets), 0 < e.count ? function(t) {
        var a = setTimeout(function() {
          if (e.stylesheets && hd(e, e.stylesheets), e.unsuspend) {
            var i = e.unsuspend;
            e.unsuspend = null, i();
          }
        }, 6e4);
        return e.unsuspend = t, function() {
          e.unsuspend = null, clearTimeout(a);
        };
      } : null;
    }
    function ls() {
      if (this.count--, this.count === 0) {
        if (this.stylesheets)
          hd(this, this.stylesheets);
        else if (this.unsuspend) {
          var e = this.unsuspend;
          this.unsuspend = null, e();
        }
      }
    }
    function hd(e, t) {
      e.stylesheets = null, e.unsuspend !== null && (e.count++, W0 = /* @__PURE__ */ new Map(), t.forEach(l0, e), W0 = null, ls.call(e));
    }
    function l0(e, t) {
      if (!(t.state.loading & $n)) {
        var a = W0.get(e);
        if (a) var i = a.get(Rg);
        else {
          a = /* @__PURE__ */ new Map(), W0.set(e, a);
          for (var o = e.querySelectorAll(
            "link[data-precedence],style[data-precedence]"
          ), f = 0; f < o.length; f++) {
            var d = o[f];
            (d.nodeName === "LINK" || d.getAttribute("media") !== "not all") && (a.set(d.dataset.precedence, d), i = d);
          }
          i && a.set(Rg, i);
        }
        o = t.instance, d = o.getAttribute("data-precedence"), f = a.get(d) || i, f === i && a.set(Rg, o), a.set(d, o), this.count++, i = ls.bind(this), o.addEventListener("load", i), o.addEventListener("error", i), f ? f.parentNode.insertBefore(o, f.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(o, e.firstChild)), t.state.loading |= $n;
      }
    }
    function md(e, t, a, i, o, f, d, h) {
      for (this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = Ys, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = dh(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = dh(0), this.hiddenUpdates = dh(null), this.identifierPrefix = i, this.onUncaughtError = o, this.onCaughtError = f, this.onRecoverableError = d, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = h, this.incompleteTransitions = /* @__PURE__ */ new Map(), this.passiveEffectDuration = this.effectDuration = -0, this.memoizedUpdaters = /* @__PURE__ */ new Set(), e = this.pendingUpdatersLaneMap = [], t = 0; 31 > t; t++) e.push(/* @__PURE__ */ new Set());
      this._debugRootType = a ? "hydrateRoot()" : "createRoot()";
    }
    function Fm(e, t, a, i, o, f, d, h, p, v, H, B) {
      return e = new md(
        e,
        t,
        a,
        d,
        h,
        p,
        v,
        B
      ), t = gS, f === !0 && (t |= la | zu), _t && (t |= Yl), f = ie(3, null, null, t), e.current = f, f.stateNode = e, t = Sf(), Zi(t), e.pooledCache = t, Zi(t), f.memoizedState = {
        element: i,
        isDehydrated: a,
        cache: t
      }, Ql(f), e;
    }
    function Im(e) {
      return e ? (e = Yo, e) : Yo;
    }
    function at(e, t, a, i, o, f) {
      if (vl && typeof vl.onScheduleFiberRoot == "function")
        try {
          vl.onScheduleFiberRoot(mi, i, a);
        } catch (d) {
          Pl || (Pl = !0, console.error(
            "React instrumentation encountered an error: %s",
            d
          ));
        }
      te !== null && typeof te.markRenderScheduled == "function" && te.markRenderScheduled(t), o = Im(o), i.context === null ? i.context = o : i.pendingContext = o, ta && ma !== null && !v1 && (v1 = !0, console.error(
        `Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`,
        ce(ma) || "Unknown"
      )), i = mn(t), i.payload = { element: a }, f = f === void 0 ? null : f, f !== null && (typeof f != "function" && console.error(
        "Expected the last optional `callback` argument to be a function. Instead received: %s.",
        f
      ), i.callback = f), a = Ka(e, i, t), a !== null && (Ut(a, e, t), Ku(a, e, t));
    }
    function yd(e, t) {
      if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
        var a = e.retryLane;
        e.retryLane = a !== 0 && a < t ? a : t;
      }
    }
    function Pm(e, t) {
      yd(e, t), (e = e.alternate) && yd(e, t);
    }
    function ey(e) {
      if (e.tag === 13) {
        var t = Xl(e, 67108864);
        t !== null && Ut(t, e, 67108864), Pm(e, 67108864);
      }
    }
    function bv() {
      return ma;
    }
    function Sv() {
      for (var e = /* @__PURE__ */ new Map(), t = 1, a = 0; 31 > a; a++) {
        var i = iv(t);
        e.set(t, i), t *= 2;
      }
      return e;
    }
    function Tv(e, t, a, i) {
      var o = _.T;
      _.T = null;
      var f = ve.p;
      try {
        ve.p = gl, fi(e, t, a, i);
      } finally {
        ve.p = f, _.T = o;
      }
    }
    function pd(e, t, a, i) {
      var o = _.T;
      _.T = null;
      var f = ve.p;
      try {
        ve.p = ln, fi(e, t, a, i);
      } finally {
        ve.p = f, _.T = o;
      }
    }
    function fi(e, t, a, i) {
      if (I0) {
        var o = as(i);
        if (o === null)
          jl(
            e,
            t,
            i,
            P0,
            a
          ), si(e, i);
        else if (ns(
          o,
          e,
          t,
          a,
          i
        ))
          i.stopPropagation();
        else if (si(e, i), t & 4 && -1 < WS.indexOf(e)) {
          for (; o !== null; ) {
            var f = na(o);
            if (f !== null)
              switch (f.tag) {
                case 3:
                  if (f = f.stateNode, f.current.memoizedState.isDehydrated) {
                    var d = zi(f.pendingLanes);
                    if (d !== 0) {
                      var h = f;
                      for (h.pendingLanes |= 2, h.entangledLanes |= 2; d; ) {
                        var p = 1 << 31 - zl(d);
                        h.entanglements[1] |= p, d &= ~p;
                      }
                      Ha(f), (nt & (ga | Uu)) === an && (q0 = Bn() + $b, fc(0));
                    }
                  }
                  break;
                case 13:
                  h = Xl(f, 2), h !== null && Ut(h, f, 2), cc(), Pm(f, 2);
              }
            if (f = as(i), f === null && jl(
              e,
              t,
              i,
              P0,
              a
            ), f === o) break;
            o = f;
          }
          o !== null && i.stopPropagation();
        } else
          jl(
            e,
            t,
            i,
            null,
            a
          );
      }
    }
    function as(e) {
      return e = qi(e), Ao(e);
    }
    function Ao(e) {
      if (P0 = null, e = In(e), e !== null) {
        var t = Ie(e);
        if (t === null) e = null;
        else {
          var a = t.tag;
          if (a === 13) {
            if (e = ol(t), e !== null) return e;
            e = null;
          } else if (a === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated)
              return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null;
          } else t !== e && (e = null);
        }
      }
      return P0 = e, null;
    }
    function vd(e) {
      switch (e) {
        case "beforetoggle":
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "toggle":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return gl;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return ln;
        case "message":
          switch (hi()) {
            case xd:
              return gl;
            case hs:
              return ln;
            case Uo:
            case zv:
              return Eu;
            case ms:
              return zd;
            default:
              return Eu;
          }
        default:
          return Eu;
      }
    }
    function si(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          ko = null;
          break;
        case "dragenter":
        case "dragleave":
          $o = null;
          break;
        case "mouseover":
        case "mouseout":
          Wo = null;
          break;
        case "pointerover":
        case "pointerout":
          ep.delete(t.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          tp.delete(t.pointerId);
      }
    }
    function Il(e, t, a, i, o, f) {
      return e === null || e.nativeEvent !== f ? (e = {
        blockedOn: t,
        domEventName: a,
        eventSystemFlags: i,
        nativeEvent: f,
        targetContainers: [o]
      }, t !== null && (t = na(t), t !== null && ey(t)), e) : (e.eventSystemFlags |= i, t = e.targetContainers, o !== null && t.indexOf(o) === -1 && t.push(o), e);
    }
    function ns(e, t, a, i, o) {
      switch (t) {
        case "focusin":
          return ko = Il(
            ko,
            e,
            t,
            a,
            i,
            o
          ), !0;
        case "dragenter":
          return $o = Il(
            $o,
            e,
            t,
            a,
            i,
            o
          ), !0;
        case "mouseover":
          return Wo = Il(
            Wo,
            e,
            t,
            a,
            i,
            o
          ), !0;
        case "pointerover":
          var f = o.pointerId;
          return ep.set(
            f,
            Il(
              ep.get(f) || null,
              e,
              t,
              a,
              i,
              o
            )
          ), !0;
        case "gotpointercapture":
          return f = o.pointerId, tp.set(
            f,
            Il(
              tp.get(f) || null,
              e,
              t,
              a,
              i,
              o
            )
          ), !0;
      }
      return !1;
    }
    function a0(e) {
      var t = In(e.target);
      if (t !== null) {
        var a = Ie(t);
        if (a !== null) {
          if (t = a.tag, t === 13) {
            if (t = ol(a), t !== null) {
              e.blockedOn = t, ov(e.priority, function() {
                if (a.tag === 13) {
                  var i = $l(a);
                  i = Ul(i);
                  var o = Xl(
                    a,
                    i
                  );
                  o !== null && Ut(o, a, i), Pm(a, i);
                }
              });
              return;
            }
          } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
            e.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
            return;
          }
        }
      }
      e.blockedOn = null;
    }
    function us(e) {
      if (e.blockedOn !== null) return !1;
      for (var t = e.targetContainers; 0 < t.length; ) {
        var a = as(e.nativeEvent);
        if (a === null) {
          a = e.nativeEvent;
          var i = new a.constructor(
            a.type,
            a
          ), o = i;
          s !== null && console.error(
            "Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."
          ), s = o, a.target.dispatchEvent(i), s === null && console.error(
            "Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."
          ), s = null;
        } else
          return t = na(a), t !== null && ey(t), e.blockedOn = a, !1;
        t.shift();
      }
      return !0;
    }
    function ty(e, t, a) {
      us(e) && a.delete(t);
    }
    function n0() {
      zg = !1, ko !== null && us(ko) && (ko = null), $o !== null && us($o) && ($o = null), Wo !== null && us(Wo) && (Wo = null), ep.forEach(ty), tp.forEach(ty);
    }
    function is(e, t) {
      e.blockedOn === t && (e.blockedOn = null, zg || (zg = !0, jt.unstable_scheduleCallback(
        jt.unstable_NormalPriority,
        n0
      )));
    }
    function u0(e) {
      ev !== e && (ev = e, jt.unstable_scheduleCallback(
        jt.unstable_NormalPriority,
        function() {
          ev === e && (ev = null);
          for (var t = 0; t < e.length; t += 3) {
            var a = e[t], i = e[t + 1], o = e[t + 2];
            if (typeof i != "function") {
              if (Ao(i || a) === null)
                continue;
              break;
            }
            var f = na(a);
            f !== null && (e.splice(t, 3), t -= 3, a = {
              pending: !0,
              data: o,
              method: a.method,
              action: i
            }, Object.freeze(a), Wi(
              f,
              a,
              i,
              o
            ));
          }
        }
      ));
    }
    function pc(e) {
      function t(p) {
        return is(p, e);
      }
      ko !== null && is(ko, e), $o !== null && is($o, e), Wo !== null && is(Wo, e), ep.forEach(t), tp.forEach(t);
      for (var a = 0; a < Fo.length; a++) {
        var i = Fo[a];
        i.blockedOn === e && (i.blockedOn = null);
      }
      for (; 0 < Fo.length && (a = Fo[0], a.blockedOn === null); )
        a0(a), a.blockedOn === null && Fo.shift();
      if (a = (e.ownerDocument || e).$$reactFormReplay, a != null)
        for (i = 0; i < a.length; i += 3) {
          var o = a[i], f = a[i + 1], d = o[ea] || null;
          if (typeof f == "function")
            d || u0(a);
          else if (d) {
            var h = null;
            if (f && f.hasAttribute("formAction")) {
              if (o = f, d = f[ea] || null)
                h = d.formAction;
              else if (Ao(o) !== null) continue;
            } else h = d.action;
            typeof h == "function" ? a[i + 1] = h : (a.splice(i, 3), i -= 3), u0(a);
          }
        }
    }
    function gd(e) {
      this._internalRoot = e;
    }
    function cs(e) {
      this._internalRoot = e;
    }
    function i0(e) {
      e[pi] && (e._reactRootContainer ? console.error(
        "You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported."
      ) : console.error(
        "You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."
      ));
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var jt = X1(), os = Sa, xv = V1, Me = Object.assign, fs = Symbol.for("react.element"), ri = Symbol.for("react.transitional.element"), vc = Symbol.for("react.portal"), Ae = Symbol.for("react.fragment"), Ro = Symbol.for("react.strict_mode"), zo = Symbol.for("react.profiler"), ly = Symbol.for("react.provider"), bd = Symbol.for("react.consumer"), _a = Symbol.for("react.context"), bu = Symbol.for("react.forward_ref"), Do = Symbol.for("react.suspense"), di = Symbol.for("react.suspense_list"), ss = Symbol.for("react.memo"), ha = Symbol.for("react.lazy"), ay = Symbol.for("react.activity"), c0 = Symbol.for("react.memo_cache_sentinel"), ny = Symbol.iterator, Sd = Symbol.for("react.client.reference"), Te = Array.isArray, _ = os.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ve = xv.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Ev = Object.freeze({
      pending: !1,
      data: null,
      method: null,
      action: null
    }), rs = [], ds = [], qa = -1, Su = rt(null), Oo = rt(null), qn = rt(null), Mo = rt(null), Tu = Object.prototype.hasOwnProperty, Td = jt.unstable_scheduleCallback, Av = jt.unstable_cancelCallback, o0 = jt.unstable_shouldYield, Rv = jt.unstable_requestPaint, Bn = jt.unstable_now, hi = jt.unstable_getCurrentPriorityLevel, xd = jt.unstable_ImmediatePriority, hs = jt.unstable_UserBlockingPriority, Uo = jt.unstable_NormalPriority, zv = jt.unstable_LowPriority, ms = jt.unstable_IdlePriority, Dv = jt.log, tn = jt.unstable_setDisableYieldValue, mi = null, vl = null, te = null, Pl = !1, _t = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u", zl = Math.clz32 ? Math.clz32 : sh, Ed = Math.log, xu = Math.LN2, Ad = 256, Rd = 4194304, gl = 2, ln = 8, Eu = 32, zd = 268435456, yi = Math.random().toString(36).slice(2), Dl = "__reactFiber$" + yi, ea = "__reactProps$" + yi, pi = "__reactContainer$" + yi, uy = "__reactEvents$" + yi, f0 = "__reactListeners$" + yi, Co = "__reactHandles$" + yi, Ho = "__reactResources$" + yi, No = "__reactMarker$" + yi, s0 = /* @__PURE__ */ new Set(), Ba = {}, gc = {}, r0 = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    }, Dd = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), Od = {}, Md = {}, vi = 0, iy, cy, d0, oy, jo, h0, m0;
    Xs.__reactDisabledLog = !0;
    var fy, ys, _o = !1, ps = new (typeof WeakMap == "function" ? WeakMap : Map)(), ma = null, ta = !1, Ov = /[\n"\\]/g, sy = !1, ry = !1, dy = !1, hy = !1, Ud = !1, my = !1, vs = ["value", "defaultValue"], y0 = !1, p0 = /["'&<>\n\t]|^\s|\s$/, yy = "address applet area article aside base basefont bgsound blockquote body br button caption center col colgroup dd details dir div dl dt embed fieldset figcaption figure footer form frame frameset h1 h2 h3 h4 h5 h6 head header hgroup hr html iframe img input isindex li link listing main marquee menu menuitem meta nav noembed noframes noscript object ol p param plaintext pre script section select source style summary table tbody td template textarea tfoot th thead title tr track ul wbr xmp".split(
      " "
    ), Cd = "applet caption html table td th marquee object template foreignObject desc title".split(
      " "
    ), Hd = Cd.concat(["button"]), py = "dd dt li option optgroup p rp rt".split(" "), vy = {
      current: null,
      formTag: null,
      aTagInScope: null,
      buttonTagInScope: null,
      nobrTagInScope: null,
      pTagInButtonScope: null,
      listItemTagAutoclosing: null,
      dlItemTagAutoclosing: null,
      containerTagInScope: null,
      implicitRootScope: !1
    }, qo = {}, Yn = {
      animation: "animationDelay animationDirection animationDuration animationFillMode animationIterationCount animationName animationPlayState animationTimingFunction".split(
        " "
      ),
      background: "backgroundAttachment backgroundClip backgroundColor backgroundImage backgroundOrigin backgroundPositionX backgroundPositionY backgroundRepeat backgroundSize".split(
        " "
      ),
      backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
      border: "borderBottomColor borderBottomStyle borderBottomWidth borderImageOutset borderImageRepeat borderImageSlice borderImageSource borderImageWidth borderLeftColor borderLeftStyle borderLeftWidth borderRightColor borderRightStyle borderRightWidth borderTopColor borderTopStyle borderTopWidth".split(
        " "
      ),
      borderBlockEnd: [
        "borderBlockEndColor",
        "borderBlockEndStyle",
        "borderBlockEndWidth"
      ],
      borderBlockStart: [
        "borderBlockStartColor",
        "borderBlockStartStyle",
        "borderBlockStartWidth"
      ],
      borderBottom: [
        "borderBottomColor",
        "borderBottomStyle",
        "borderBottomWidth"
      ],
      borderColor: [
        "borderBottomColor",
        "borderLeftColor",
        "borderRightColor",
        "borderTopColor"
      ],
      borderImage: [
        "borderImageOutset",
        "borderImageRepeat",
        "borderImageSlice",
        "borderImageSource",
        "borderImageWidth"
      ],
      borderInlineEnd: [
        "borderInlineEndColor",
        "borderInlineEndStyle",
        "borderInlineEndWidth"
      ],
      borderInlineStart: [
        "borderInlineStartColor",
        "borderInlineStartStyle",
        "borderInlineStartWidth"
      ],
      borderLeft: ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"],
      borderRadius: [
        "borderBottomLeftRadius",
        "borderBottomRightRadius",
        "borderTopLeftRadius",
        "borderTopRightRadius"
      ],
      borderRight: [
        "borderRightColor",
        "borderRightStyle",
        "borderRightWidth"
      ],
      borderStyle: [
        "borderBottomStyle",
        "borderLeftStyle",
        "borderRightStyle",
        "borderTopStyle"
      ],
      borderTop: ["borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderWidth: [
        "borderBottomWidth",
        "borderLeftWidth",
        "borderRightWidth",
        "borderTopWidth"
      ],
      columnRule: ["columnRuleColor", "columnRuleStyle", "columnRuleWidth"],
      columns: ["columnCount", "columnWidth"],
      flex: ["flexBasis", "flexGrow", "flexShrink"],
      flexFlow: ["flexDirection", "flexWrap"],
      font: "fontFamily fontFeatureSettings fontKerning fontLanguageOverride fontSize fontSizeAdjust fontStretch fontStyle fontVariant fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition fontWeight lineHeight".split(
        " "
      ),
      fontVariant: "fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition".split(
        " "
      ),
      gap: ["columnGap", "rowGap"],
      grid: "gridAutoColumns gridAutoFlow gridAutoRows gridTemplateAreas gridTemplateColumns gridTemplateRows".split(
        " "
      ),
      gridArea: [
        "gridColumnEnd",
        "gridColumnStart",
        "gridRowEnd",
        "gridRowStart"
      ],
      gridColumn: ["gridColumnEnd", "gridColumnStart"],
      gridColumnGap: ["columnGap"],
      gridGap: ["columnGap", "rowGap"],
      gridRow: ["gridRowEnd", "gridRowStart"],
      gridRowGap: ["rowGap"],
      gridTemplate: [
        "gridTemplateAreas",
        "gridTemplateColumns",
        "gridTemplateRows"
      ],
      listStyle: ["listStyleImage", "listStylePosition", "listStyleType"],
      margin: ["marginBottom", "marginLeft", "marginRight", "marginTop"],
      marker: ["markerEnd", "markerMid", "markerStart"],
      mask: "maskClip maskComposite maskImage maskMode maskOrigin maskPositionX maskPositionY maskRepeat maskSize".split(
        " "
      ),
      maskPosition: ["maskPositionX", "maskPositionY"],
      outline: ["outlineColor", "outlineStyle", "outlineWidth"],
      overflow: ["overflowX", "overflowY"],
      padding: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
      placeContent: ["alignContent", "justifyContent"],
      placeItems: ["alignItems", "justifyItems"],
      placeSelf: ["alignSelf", "justifySelf"],
      textDecoration: [
        "textDecorationColor",
        "textDecorationLine",
        "textDecorationStyle"
      ],
      textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
      transition: [
        "transitionDelay",
        "transitionDuration",
        "transitionProperty",
        "transitionTimingFunction"
      ],
      wordWrap: ["overflowWrap"]
    }, Au = /([A-Z])/g, Ru = /^ms-/, gs = /^(?:webkit|moz|o)[A-Z]/, bs = /^-ms-/, gi = /-(.)/g, v0 = /;\s*$/, bc = {}, Sc = {}, g0 = !1, gy = !1, Ss = new Set(
      "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
        " "
      )
    ), Ts = "http://www.w3.org/1998/Math/MathML", Bo = "http://www.w3.org/2000/svg", Nd = /* @__PURE__ */ new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"]
    ]), Tc = {
      accept: "accept",
      acceptcharset: "acceptCharset",
      "accept-charset": "acceptCharset",
      accesskey: "accessKey",
      action: "action",
      allowfullscreen: "allowFullScreen",
      alt: "alt",
      as: "as",
      async: "async",
      autocapitalize: "autoCapitalize",
      autocomplete: "autoComplete",
      autocorrect: "autoCorrect",
      autofocus: "autoFocus",
      autoplay: "autoPlay",
      autosave: "autoSave",
      capture: "capture",
      cellpadding: "cellPadding",
      cellspacing: "cellSpacing",
      challenge: "challenge",
      charset: "charSet",
      checked: "checked",
      children: "children",
      cite: "cite",
      class: "className",
      classid: "classID",
      classname: "className",
      cols: "cols",
      colspan: "colSpan",
      content: "content",
      contenteditable: "contentEditable",
      contextmenu: "contextMenu",
      controls: "controls",
      controlslist: "controlsList",
      coords: "coords",
      crossorigin: "crossOrigin",
      dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
      data: "data",
      datetime: "dateTime",
      default: "default",
      defaultchecked: "defaultChecked",
      defaultvalue: "defaultValue",
      defer: "defer",
      dir: "dir",
      disabled: "disabled",
      disablepictureinpicture: "disablePictureInPicture",
      disableremoteplayback: "disableRemotePlayback",
      download: "download",
      draggable: "draggable",
      enctype: "encType",
      enterkeyhint: "enterKeyHint",
      fetchpriority: "fetchPriority",
      for: "htmlFor",
      form: "form",
      formmethod: "formMethod",
      formaction: "formAction",
      formenctype: "formEncType",
      formnovalidate: "formNoValidate",
      formtarget: "formTarget",
      frameborder: "frameBorder",
      headers: "headers",
      height: "height",
      hidden: "hidden",
      high: "high",
      href: "href",
      hreflang: "hrefLang",
      htmlfor: "htmlFor",
      httpequiv: "httpEquiv",
      "http-equiv": "httpEquiv",
      icon: "icon",
      id: "id",
      imagesizes: "imageSizes",
      imagesrcset: "imageSrcSet",
      inert: "inert",
      innerhtml: "innerHTML",
      inputmode: "inputMode",
      integrity: "integrity",
      is: "is",
      itemid: "itemID",
      itemprop: "itemProp",
      itemref: "itemRef",
      itemscope: "itemScope",
      itemtype: "itemType",
      keyparams: "keyParams",
      keytype: "keyType",
      kind: "kind",
      label: "label",
      lang: "lang",
      list: "list",
      loop: "loop",
      low: "low",
      manifest: "manifest",
      marginwidth: "marginWidth",
      marginheight: "marginHeight",
      max: "max",
      maxlength: "maxLength",
      media: "media",
      mediagroup: "mediaGroup",
      method: "method",
      min: "min",
      minlength: "minLength",
      multiple: "multiple",
      muted: "muted",
      name: "name",
      nomodule: "noModule",
      nonce: "nonce",
      novalidate: "noValidate",
      open: "open",
      optimum: "optimum",
      pattern: "pattern",
      placeholder: "placeholder",
      playsinline: "playsInline",
      poster: "poster",
      preload: "preload",
      profile: "profile",
      radiogroup: "radioGroup",
      readonly: "readOnly",
      referrerpolicy: "referrerPolicy",
      rel: "rel",
      required: "required",
      reversed: "reversed",
      role: "role",
      rows: "rows",
      rowspan: "rowSpan",
      sandbox: "sandbox",
      scope: "scope",
      scoped: "scoped",
      scrolling: "scrolling",
      seamless: "seamless",
      selected: "selected",
      shape: "shape",
      size: "size",
      sizes: "sizes",
      span: "span",
      spellcheck: "spellCheck",
      src: "src",
      srcdoc: "srcDoc",
      srclang: "srcLang",
      srcset: "srcSet",
      start: "start",
      step: "step",
      style: "style",
      summary: "summary",
      tabindex: "tabIndex",
      target: "target",
      title: "title",
      type: "type",
      usemap: "useMap",
      value: "value",
      width: "width",
      wmode: "wmode",
      wrap: "wrap",
      about: "about",
      accentheight: "accentHeight",
      "accent-height": "accentHeight",
      accumulate: "accumulate",
      additive: "additive",
      alignmentbaseline: "alignmentBaseline",
      "alignment-baseline": "alignmentBaseline",
      allowreorder: "allowReorder",
      alphabetic: "alphabetic",
      amplitude: "amplitude",
      arabicform: "arabicForm",
      "arabic-form": "arabicForm",
      ascent: "ascent",
      attributename: "attributeName",
      attributetype: "attributeType",
      autoreverse: "autoReverse",
      azimuth: "azimuth",
      basefrequency: "baseFrequency",
      baselineshift: "baselineShift",
      "baseline-shift": "baselineShift",
      baseprofile: "baseProfile",
      bbox: "bbox",
      begin: "begin",
      bias: "bias",
      by: "by",
      calcmode: "calcMode",
      capheight: "capHeight",
      "cap-height": "capHeight",
      clip: "clip",
      clippath: "clipPath",
      "clip-path": "clipPath",
      clippathunits: "clipPathUnits",
      cliprule: "clipRule",
      "clip-rule": "clipRule",
      color: "color",
      colorinterpolation: "colorInterpolation",
      "color-interpolation": "colorInterpolation",
      colorinterpolationfilters: "colorInterpolationFilters",
      "color-interpolation-filters": "colorInterpolationFilters",
      colorprofile: "colorProfile",
      "color-profile": "colorProfile",
      colorrendering: "colorRendering",
      "color-rendering": "colorRendering",
      contentscripttype: "contentScriptType",
      contentstyletype: "contentStyleType",
      cursor: "cursor",
      cx: "cx",
      cy: "cy",
      d: "d",
      datatype: "datatype",
      decelerate: "decelerate",
      descent: "descent",
      diffuseconstant: "diffuseConstant",
      direction: "direction",
      display: "display",
      divisor: "divisor",
      dominantbaseline: "dominantBaseline",
      "dominant-baseline": "dominantBaseline",
      dur: "dur",
      dx: "dx",
      dy: "dy",
      edgemode: "edgeMode",
      elevation: "elevation",
      enablebackground: "enableBackground",
      "enable-background": "enableBackground",
      end: "end",
      exponent: "exponent",
      externalresourcesrequired: "externalResourcesRequired",
      fill: "fill",
      fillopacity: "fillOpacity",
      "fill-opacity": "fillOpacity",
      fillrule: "fillRule",
      "fill-rule": "fillRule",
      filter: "filter",
      filterres: "filterRes",
      filterunits: "filterUnits",
      floodopacity: "floodOpacity",
      "flood-opacity": "floodOpacity",
      floodcolor: "floodColor",
      "flood-color": "floodColor",
      focusable: "focusable",
      fontfamily: "fontFamily",
      "font-family": "fontFamily",
      fontsize: "fontSize",
      "font-size": "fontSize",
      fontsizeadjust: "fontSizeAdjust",
      "font-size-adjust": "fontSizeAdjust",
      fontstretch: "fontStretch",
      "font-stretch": "fontStretch",
      fontstyle: "fontStyle",
      "font-style": "fontStyle",
      fontvariant: "fontVariant",
      "font-variant": "fontVariant",
      fontweight: "fontWeight",
      "font-weight": "fontWeight",
      format: "format",
      from: "from",
      fx: "fx",
      fy: "fy",
      g1: "g1",
      g2: "g2",
      glyphname: "glyphName",
      "glyph-name": "glyphName",
      glyphorientationhorizontal: "glyphOrientationHorizontal",
      "glyph-orientation-horizontal": "glyphOrientationHorizontal",
      glyphorientationvertical: "glyphOrientationVertical",
      "glyph-orientation-vertical": "glyphOrientationVertical",
      glyphref: "glyphRef",
      gradienttransform: "gradientTransform",
      gradientunits: "gradientUnits",
      hanging: "hanging",
      horizadvx: "horizAdvX",
      "horiz-adv-x": "horizAdvX",
      horizoriginx: "horizOriginX",
      "horiz-origin-x": "horizOriginX",
      ideographic: "ideographic",
      imagerendering: "imageRendering",
      "image-rendering": "imageRendering",
      in2: "in2",
      in: "in",
      inlist: "inlist",
      intercept: "intercept",
      k1: "k1",
      k2: "k2",
      k3: "k3",
      k4: "k4",
      k: "k",
      kernelmatrix: "kernelMatrix",
      kernelunitlength: "kernelUnitLength",
      kerning: "kerning",
      keypoints: "keyPoints",
      keysplines: "keySplines",
      keytimes: "keyTimes",
      lengthadjust: "lengthAdjust",
      letterspacing: "letterSpacing",
      "letter-spacing": "letterSpacing",
      lightingcolor: "lightingColor",
      "lighting-color": "lightingColor",
      limitingconeangle: "limitingConeAngle",
      local: "local",
      markerend: "markerEnd",
      "marker-end": "markerEnd",
      markerheight: "markerHeight",
      markermid: "markerMid",
      "marker-mid": "markerMid",
      markerstart: "markerStart",
      "marker-start": "markerStart",
      markerunits: "markerUnits",
      markerwidth: "markerWidth",
      mask: "mask",
      maskcontentunits: "maskContentUnits",
      maskunits: "maskUnits",
      mathematical: "mathematical",
      mode: "mode",
      numoctaves: "numOctaves",
      offset: "offset",
      opacity: "opacity",
      operator: "operator",
      order: "order",
      orient: "orient",
      orientation: "orientation",
      origin: "origin",
      overflow: "overflow",
      overlineposition: "overlinePosition",
      "overline-position": "overlinePosition",
      overlinethickness: "overlineThickness",
      "overline-thickness": "overlineThickness",
      paintorder: "paintOrder",
      "paint-order": "paintOrder",
      panose1: "panose1",
      "panose-1": "panose1",
      pathlength: "pathLength",
      patterncontentunits: "patternContentUnits",
      patterntransform: "patternTransform",
      patternunits: "patternUnits",
      pointerevents: "pointerEvents",
      "pointer-events": "pointerEvents",
      points: "points",
      pointsatx: "pointsAtX",
      pointsaty: "pointsAtY",
      pointsatz: "pointsAtZ",
      popover: "popover",
      popovertarget: "popoverTarget",
      popovertargetaction: "popoverTargetAction",
      prefix: "prefix",
      preservealpha: "preserveAlpha",
      preserveaspectratio: "preserveAspectRatio",
      primitiveunits: "primitiveUnits",
      property: "property",
      r: "r",
      radius: "radius",
      refx: "refX",
      refy: "refY",
      renderingintent: "renderingIntent",
      "rendering-intent": "renderingIntent",
      repeatcount: "repeatCount",
      repeatdur: "repeatDur",
      requiredextensions: "requiredExtensions",
      requiredfeatures: "requiredFeatures",
      resource: "resource",
      restart: "restart",
      result: "result",
      results: "results",
      rotate: "rotate",
      rx: "rx",
      ry: "ry",
      scale: "scale",
      security: "security",
      seed: "seed",
      shaperendering: "shapeRendering",
      "shape-rendering": "shapeRendering",
      slope: "slope",
      spacing: "spacing",
      specularconstant: "specularConstant",
      specularexponent: "specularExponent",
      speed: "speed",
      spreadmethod: "spreadMethod",
      startoffset: "startOffset",
      stddeviation: "stdDeviation",
      stemh: "stemh",
      stemv: "stemv",
      stitchtiles: "stitchTiles",
      stopcolor: "stopColor",
      "stop-color": "stopColor",
      stopopacity: "stopOpacity",
      "stop-opacity": "stopOpacity",
      strikethroughposition: "strikethroughPosition",
      "strikethrough-position": "strikethroughPosition",
      strikethroughthickness: "strikethroughThickness",
      "strikethrough-thickness": "strikethroughThickness",
      string: "string",
      stroke: "stroke",
      strokedasharray: "strokeDasharray",
      "stroke-dasharray": "strokeDasharray",
      strokedashoffset: "strokeDashoffset",
      "stroke-dashoffset": "strokeDashoffset",
      strokelinecap: "strokeLinecap",
      "stroke-linecap": "strokeLinecap",
      strokelinejoin: "strokeLinejoin",
      "stroke-linejoin": "strokeLinejoin",
      strokemiterlimit: "strokeMiterlimit",
      "stroke-miterlimit": "strokeMiterlimit",
      strokewidth: "strokeWidth",
      "stroke-width": "strokeWidth",
      strokeopacity: "strokeOpacity",
      "stroke-opacity": "strokeOpacity",
      suppresscontenteditablewarning: "suppressContentEditableWarning",
      suppresshydrationwarning: "suppressHydrationWarning",
      surfacescale: "surfaceScale",
      systemlanguage: "systemLanguage",
      tablevalues: "tableValues",
      targetx: "targetX",
      targety: "targetY",
      textanchor: "textAnchor",
      "text-anchor": "textAnchor",
      textdecoration: "textDecoration",
      "text-decoration": "textDecoration",
      textlength: "textLength",
      textrendering: "textRendering",
      "text-rendering": "textRendering",
      to: "to",
      transform: "transform",
      transformorigin: "transformOrigin",
      "transform-origin": "transformOrigin",
      typeof: "typeof",
      u1: "u1",
      u2: "u2",
      underlineposition: "underlinePosition",
      "underline-position": "underlinePosition",
      underlinethickness: "underlineThickness",
      "underline-thickness": "underlineThickness",
      unicode: "unicode",
      unicodebidi: "unicodeBidi",
      "unicode-bidi": "unicodeBidi",
      unicoderange: "unicodeRange",
      "unicode-range": "unicodeRange",
      unitsperem: "unitsPerEm",
      "units-per-em": "unitsPerEm",
      unselectable: "unselectable",
      valphabetic: "vAlphabetic",
      "v-alphabetic": "vAlphabetic",
      values: "values",
      vectoreffect: "vectorEffect",
      "vector-effect": "vectorEffect",
      version: "version",
      vertadvy: "vertAdvY",
      "vert-adv-y": "vertAdvY",
      vertoriginx: "vertOriginX",
      "vert-origin-x": "vertOriginX",
      vertoriginy: "vertOriginY",
      "vert-origin-y": "vertOriginY",
      vhanging: "vHanging",
      "v-hanging": "vHanging",
      videographic: "vIdeographic",
      "v-ideographic": "vIdeographic",
      viewbox: "viewBox",
      viewtarget: "viewTarget",
      visibility: "visibility",
      vmathematical: "vMathematical",
      "v-mathematical": "vMathematical",
      vocab: "vocab",
      widths: "widths",
      wordspacing: "wordSpacing",
      "word-spacing": "wordSpacing",
      writingmode: "writingMode",
      "writing-mode": "writingMode",
      x1: "x1",
      x2: "x2",
      x: "x",
      xchannelselector: "xChannelSelector",
      xheight: "xHeight",
      "x-height": "xHeight",
      xlinkactuate: "xlinkActuate",
      "xlink:actuate": "xlinkActuate",
      xlinkarcrole: "xlinkArcrole",
      "xlink:arcrole": "xlinkArcrole",
      xlinkhref: "xlinkHref",
      "xlink:href": "xlinkHref",
      xlinkrole: "xlinkRole",
      "xlink:role": "xlinkRole",
      xlinkshow: "xlinkShow",
      "xlink:show": "xlinkShow",
      xlinktitle: "xlinkTitle",
      "xlink:title": "xlinkTitle",
      xlinktype: "xlinkType",
      "xlink:type": "xlinkType",
      xmlbase: "xmlBase",
      "xml:base": "xmlBase",
      xmllang: "xmlLang",
      "xml:lang": "xmlLang",
      xmlns: "xmlns",
      "xml:space": "xmlSpace",
      xmlnsxlink: "xmlnsXlink",
      "xmlns:xlink": "xmlnsXlink",
      xmlspace: "xmlSpace",
      y1: "y1",
      y2: "y2",
      y: "y",
      ychannelselector: "yChannelSelector",
      z: "z",
      zoomandpan: "zoomAndPan"
    }, by = {
      "aria-current": 0,
      "aria-description": 0,
      "aria-details": 0,
      "aria-disabled": 0,
      "aria-hidden": 0,
      "aria-invalid": 0,
      "aria-keyshortcuts": 0,
      "aria-label": 0,
      "aria-roledescription": 0,
      "aria-autocomplete": 0,
      "aria-checked": 0,
      "aria-expanded": 0,
      "aria-haspopup": 0,
      "aria-level": 0,
      "aria-modal": 0,
      "aria-multiline": 0,
      "aria-multiselectable": 0,
      "aria-orientation": 0,
      "aria-placeholder": 0,
      "aria-pressed": 0,
      "aria-readonly": 0,
      "aria-required": 0,
      "aria-selected": 0,
      "aria-sort": 0,
      "aria-valuemax": 0,
      "aria-valuemin": 0,
      "aria-valuenow": 0,
      "aria-valuetext": 0,
      "aria-atomic": 0,
      "aria-busy": 0,
      "aria-live": 0,
      "aria-relevant": 0,
      "aria-dropeffect": 0,
      "aria-grabbed": 0,
      "aria-activedescendant": 0,
      "aria-colcount": 0,
      "aria-colindex": 0,
      "aria-colspan": 0,
      "aria-controls": 0,
      "aria-describedby": 0,
      "aria-errormessage": 0,
      "aria-flowto": 0,
      "aria-labelledby": 0,
      "aria-owns": 0,
      "aria-posinset": 0,
      "aria-rowcount": 0,
      "aria-rowindex": 0,
      "aria-rowspan": 0,
      "aria-setsize": 0
    }, wn = {}, Sy = RegExp(
      "^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), jd = RegExp(
      "^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), Ty = !1, Bl = {}, xs = /^on./, l = /^on[^A-Z]/, n = RegExp(
      "^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), u = RegExp(
      "^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), c = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i, s = null, r = null, m = null, y = !1, b = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), M = !1;
    if (b)
      try {
        var G = {};
        Object.defineProperty(G, "passive", {
          get: function() {
            M = !0;
          }
        }), window.addEventListener("test", G, G), window.removeEventListener("test", G, G);
      } catch {
        M = !1;
      }
    var X = null, C = null, N = null, de = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, he = rl(de), $e = Me({}, de, { view: 0, detail: 0 }), D = rl($e), E, O, V, le = Me({}, $e, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Ps,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (e !== V && (V && e.type === "mousemove" ? (E = e.screenX - V.screenX, O = e.screenY - V.screenY) : O = E = 0, V = e), E);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : O;
      }
    }), Ce = rl(le), se = Me({}, le, { dataTransfer: 0 }), pe = rl(se), ul = Me({}, $e, { relatedTarget: 0 }), Ze = rl(ul), bi = Me({}, de, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Mv = rl(bi), K1 = Me({}, de, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), k1 = rl(K1), $1 = Me({}, de, { data: 0 }), Ug = rl(
      $1
    ), W1 = Ug, F1 = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified"
    }, I1 = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    }, P1 = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    }, eS = Me({}, $e, {
      key: function(e) {
        if (e.key) {
          var t = F1[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress" ? (e = Qc(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? I1[e.keyCode] || "Unidentified" : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Ps,
      charCode: function(e) {
        return e.type === "keypress" ? Qc(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? Qc(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), tS = rl(eS), lS = Me({}, le, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0
    }), Cg = rl(lS), aS = Me({}, $e, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Ps
    }), nS = rl(aS), uS = Me({}, de, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), iS = rl(uS), cS = Me({}, le, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    }), oS = rl(cS), fS = Me({}, de, {
      newState: 0,
      oldState: 0
    }), sS = rl(fS), rS = [9, 13, 27, 32], Hg = 229, Uv = b && "CompositionEvent" in window, xy = null;
    b && "documentMode" in document && (xy = document.documentMode);
    var dS = b && "TextEvent" in window && !xy, Ng = b && (!Uv || xy && 8 < xy && 11 >= xy), jg = 32, _g = String.fromCharCode(jg), qg = !1, _d = !1, hS = {
      color: !0,
      date: !0,
      datetime: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0
    }, Ey = null, Ay = null, Bg = !1;
    b && (Bg = xh("input") && (!document.documentMode || 9 < document.documentMode));
    var ya = typeof Object.is == "function" ? Object.is : yv, mS = b && "documentMode" in document && 11 >= document.documentMode, qd = null, Cv = null, Ry = null, Hv = !1, Bd = {
      animationend: au("Animation", "AnimationEnd"),
      animationiteration: au("Animation", "AnimationIteration"),
      animationstart: au("Animation", "AnimationStart"),
      transitionrun: au("Transition", "TransitionRun"),
      transitionstart: au("Transition", "TransitionStart"),
      transitioncancel: au("Transition", "TransitionCancel"),
      transitionend: au("Transition", "TransitionEnd")
    }, Nv = {}, Yg = {};
    b && (Yg = document.createElement("div").style, "AnimationEvent" in window || (delete Bd.animationend.animation, delete Bd.animationiteration.animation, delete Bd.animationstart.animation), "TransitionEvent" in window || delete Bd.transitionend.transition);
    var wg = wi("animationend"), Gg = wi("animationiteration"), Vg = wi("animationstart"), yS = wi("transitionrun"), pS = wi("transitionstart"), vS = wi("transitioncancel"), Xg = wi("transitionend"), Qg = /* @__PURE__ */ new Map(), jv = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
    jv.push("scrollEnd");
    var _v = /* @__PURE__ */ new WeakMap(), b0 = 1, xc = 2, Gn = [], Yd = 0, qv = 0, Yo = {};
    Object.freeze(Yo);
    var Vn = null, wd = null, Tt = 0, gS = 1, Yl = 2, la = 8, zu = 16, Zg = 64, Lg = !1;
    try {
      var Jg = Object.preventExtensions({});
    } catch {
      Lg = !0;
    }
    var Gd = [], Vd = 0, S0 = null, T0 = 0, Xn = [], Qn = 0, Es = null, Ec = 1, Ac = "", pa = null, Xt = null, We = !1, Rc = !1, Zn = null, As = null, Si = !1, Bv = Error(
      "Hydration Mismatch Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."
    ), Kg = 0;
    if (typeof performance == "object" && typeof performance.now == "function")
      var bS = performance, kg = function() {
        return bS.now();
      };
    else {
      var SS = Date;
      kg = function() {
        return SS.now();
      };
    }
    var Yv = rt(null), wv = rt(null), $g = {}, x0 = null, Xd = null, Qd = !1, TS = typeof AbortController < "u" ? AbortController : function() {
      var e = [], t = this.signal = {
        aborted: !1,
        addEventListener: function(a, i) {
          e.push(i);
        }
      };
      this.abort = function() {
        t.aborted = !0, e.forEach(function(a) {
          return a();
        });
      };
    }, xS = jt.unstable_scheduleCallback, ES = jt.unstable_NormalPriority, bl = {
      $$typeof: _a,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
      _currentRenderer: null,
      _currentRenderer2: null
    }, Zd = jt.unstable_now, Wg = -0, E0 = -0, Ya = -1.1, Rs = -0, A0 = !1, R0 = !1, zy = null, Gv = 0, zs = 0, Ld = null, Fg = _.S;
    _.S = function(e, t) {
      typeof t == "object" && t !== null && typeof t.then == "function" && Mp(e, t), Fg !== null && Fg(e, t);
    };
    var Ds = rt(null), Du = {
      recordUnsafeLifecycleWarnings: function() {
      },
      flushPendingUnsafeLifecycleWarnings: function() {
      },
      recordLegacyContextWarning: function() {
      },
      flushLegacyContextWarning: function() {
      },
      discardPendingWarnings: function() {
      }
    }, Dy = [], Oy = [], My = [], Uy = [], Cy = [], Hy = [], Os = /* @__PURE__ */ new Set();
    Du.recordUnsafeLifecycleWarnings = function(e, t) {
      Os.has(e.type) || (typeof t.componentWillMount == "function" && t.componentWillMount.__suppressDeprecationWarning !== !0 && Dy.push(e), e.mode & la && typeof t.UNSAFE_componentWillMount == "function" && Oy.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && My.push(e), e.mode & la && typeof t.UNSAFE_componentWillReceiveProps == "function" && Uy.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && Cy.push(e), e.mode & la && typeof t.UNSAFE_componentWillUpdate == "function" && Hy.push(e));
    }, Du.flushPendingUnsafeLifecycleWarnings = function() {
      var e = /* @__PURE__ */ new Set();
      0 < Dy.length && (Dy.forEach(function(h) {
        e.add(
          ce(h) || "Component"
        ), Os.add(h.type);
      }), Dy = []);
      var t = /* @__PURE__ */ new Set();
      0 < Oy.length && (Oy.forEach(function(h) {
        t.add(
          ce(h) || "Component"
        ), Os.add(h.type);
      }), Oy = []);
      var a = /* @__PURE__ */ new Set();
      0 < My.length && (My.forEach(function(h) {
        a.add(
          ce(h) || "Component"
        ), Os.add(h.type);
      }), My = []);
      var i = /* @__PURE__ */ new Set();
      0 < Uy.length && (Uy.forEach(
        function(h) {
          i.add(
            ce(h) || "Component"
          ), Os.add(h.type);
        }
      ), Uy = []);
      var o = /* @__PURE__ */ new Set();
      0 < Cy.length && (Cy.forEach(function(h) {
        o.add(
          ce(h) || "Component"
        ), Os.add(h.type);
      }), Cy = []);
      var f = /* @__PURE__ */ new Set();
      if (0 < Hy.length && (Hy.forEach(function(h) {
        f.add(
          ce(h) || "Component"
        ), Os.add(h.type);
      }), Hy = []), 0 < t.size) {
        var d = P(
          t
        );
        console.error(
          `Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`,
          d
        );
      }
      0 < i.size && (d = P(
        i
      ), console.error(
        `Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state

Please update the following components: %s`,
        d
      )), 0 < f.size && (d = P(
        f
      ), console.error(
        `Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`,
        d
      )), 0 < e.size && (d = P(e), console.warn(
        `componentWillMount has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,
        d
      )), 0 < a.size && (d = P(
        a
      ), console.warn(
        `componentWillReceiveProps has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,
        d
      )), 0 < o.size && (d = P(o), console.warn(
        `componentWillUpdate has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,
        d
      ));
    };
    var z0 = /* @__PURE__ */ new Map(), Ig = /* @__PURE__ */ new Set();
    Du.recordLegacyContextWarning = function(e, t) {
      for (var a = null, i = e; i !== null; )
        i.mode & la && (a = i), i = i.return;
      a === null ? console.error(
        "Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue."
      ) : !Ig.has(e.type) && (i = z0.get(a), e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (i === void 0 && (i = [], z0.set(a, i)), i.push(e));
    }, Du.flushLegacyContextWarning = function() {
      z0.forEach(function(e) {
        if (e.length !== 0) {
          var t = e[0], a = /* @__PURE__ */ new Set();
          e.forEach(function(o) {
            a.add(ce(o) || "Component"), Ig.add(o.type);
          });
          var i = P(a);
          ae(t, function() {
            console.error(
              `Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://react.dev/link/legacy-context`,
              i
            );
          });
        }
      });
    }, Du.discardPendingWarnings = function() {
      Dy = [], Oy = [], My = [], Uy = [], Cy = [], Hy = [], z0 = /* @__PURE__ */ new Map();
    };
    var Ny = Error(
      "Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`."
    ), Pg = Error(
      "Suspense Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."
    ), D0 = Error(
      "Suspense Exception: This is not a real error! It's an implementation detail of `useActionState` to interrupt the current render. You must either rethrow it immediately, or move the `useActionState` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary."
    ), Vv = {
      then: function() {
        console.error(
          'Internal React error: A listener was unexpectedly attached to a "noop" thenable. This is a bug in React. Please file an issue.'
        );
      }
    }, jy = null, O0 = !1, Ln = 0, Jn = 1, va = 2, wl = 4, Sl = 8, eb = 0, tb = 1, lb = 2, Xv = 3, wo = !1, ab = !1, Qv = null, Zv = !1, Jd = rt(null), M0 = rt(0), Kd, nb = /* @__PURE__ */ new Set(), ub = /* @__PURE__ */ new Set(), Lv = /* @__PURE__ */ new Set(), ib = /* @__PURE__ */ new Set(), Go = 0, xe = null, ht = null, il = null, U0 = !1, kd = !1, Ms = !1, C0 = 0, _y = 0, zc = null, AS = 0, RS = 25, q = null, Kn = null, Dc = -1, qy = !1, H0 = {
      readContext: yt,
      use: pn,
      useCallback: Et,
      useContext: Et,
      useEffect: Et,
      useImperativeHandle: Et,
      useLayoutEffect: Et,
      useInsertionEffect: Et,
      useMemo: Et,
      useReducer: Et,
      useRef: Et,
      useState: Et,
      useDebugValue: Et,
      useDeferredValue: Et,
      useTransition: Et,
      useSyncExternalStore: Et,
      useId: Et,
      useHostTransitionStatus: Et,
      useFormState: Et,
      useActionState: Et,
      useOptimistic: Et,
      useMemoCache: Et,
      useCacheRefresh: Et
    }, Jv = null, cb = null, Kv = null, ob = null, Ti = null, Ou = null, N0 = null;
    Jv = {
      readContext: function(e) {
        return yt(e);
      },
      use: pn,
      useCallback: function(e, t) {
        return q = "useCallback", Ue(), Ra(t), Mf(e, t);
      },
      useContext: function(e) {
        return q = "useContext", Ue(), yt(e);
      },
      useEffect: function(e, t) {
        return q = "useEffect", Ue(), Ra(t), hr(e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return q = "useImperativeHandle", Ue(), Ra(a), yr(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        q = "useInsertionEffect", Ue(), Ra(t), Ma(4, va, e, t);
      },
      useLayoutEffect: function(e, t) {
        return q = "useLayoutEffect", Ue(), Ra(t), mr(e, t);
      },
      useMemo: function(e, t) {
        q = "useMemo", Ue(), Ra(t);
        var a = _.H;
        _.H = Ti;
        try {
          return pr(e, t);
        } finally {
          _.H = a;
        }
      },
      useReducer: function(e, t, a) {
        q = "useReducer", Ue();
        var i = _.H;
        _.H = Ti;
        try {
          return Le(e, t, a);
        } finally {
          _.H = i;
        }
      },
      useRef: function(e) {
        return q = "useRef", Ue(), Of(e);
      },
      useState: function(e) {
        q = "useState", Ue();
        var t = _.H;
        _.H = Ti;
        try {
          return ou(e);
        } finally {
          _.H = t;
        }
      },
      useDebugValue: function() {
        q = "useDebugValue", Ue();
      },
      useDeferredValue: function(e, t) {
        return q = "useDeferredValue", Ue(), vr(e, t);
      },
      useTransition: function() {
        return q = "useTransition", Ue(), Sn();
      },
      useSyncExternalStore: function(e, t, a) {
        return q = "useSyncExternalStore", Ue(), cu(
          e,
          t,
          a
        );
      },
      useId: function() {
        return q = "useId", Ue(), Tn();
      },
      useFormState: function(e, t) {
        return q = "useFormState", Ue(), $c(), to(e, t);
      },
      useActionState: function(e, t) {
        return q = "useActionState", Ue(), to(e, t);
      },
      useOptimistic: function(e) {
        return q = "useOptimistic", Ue(), Wa(e);
      },
      useHostTransitionStatus: Jl,
      useMemoCache: wt,
      useCacheRefresh: function() {
        return q = "useCacheRefresh", Ue(), Fi();
      }
    }, cb = {
      readContext: function(e) {
        return yt(e);
      },
      use: pn,
      useCallback: function(e, t) {
        return q = "useCallback", J(), Mf(e, t);
      },
      useContext: function(e) {
        return q = "useContext", J(), yt(e);
      },
      useEffect: function(e, t) {
        return q = "useEffect", J(), hr(e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return q = "useImperativeHandle", J(), yr(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        q = "useInsertionEffect", J(), Ma(4, va, e, t);
      },
      useLayoutEffect: function(e, t) {
        return q = "useLayoutEffect", J(), mr(e, t);
      },
      useMemo: function(e, t) {
        q = "useMemo", J();
        var a = _.H;
        _.H = Ti;
        try {
          return pr(e, t);
        } finally {
          _.H = a;
        }
      },
      useReducer: function(e, t, a) {
        q = "useReducer", J();
        var i = _.H;
        _.H = Ti;
        try {
          return Le(e, t, a);
        } finally {
          _.H = i;
        }
      },
      useRef: function(e) {
        return q = "useRef", J(), Of(e);
      },
      useState: function(e) {
        q = "useState", J();
        var t = _.H;
        _.H = Ti;
        try {
          return ou(e);
        } finally {
          _.H = t;
        }
      },
      useDebugValue: function() {
        q = "useDebugValue", J();
      },
      useDeferredValue: function(e, t) {
        return q = "useDeferredValue", J(), vr(e, t);
      },
      useTransition: function() {
        return q = "useTransition", J(), Sn();
      },
      useSyncExternalStore: function(e, t, a) {
        return q = "useSyncExternalStore", J(), cu(
          e,
          t,
          a
        );
      },
      useId: function() {
        return q = "useId", J(), Tn();
      },
      useActionState: function(e, t) {
        return q = "useActionState", J(), to(e, t);
      },
      useFormState: function(e, t) {
        return q = "useFormState", J(), $c(), to(e, t);
      },
      useOptimistic: function(e) {
        return q = "useOptimistic", J(), Wa(e);
      },
      useHostTransitionStatus: Jl,
      useMemoCache: wt,
      useCacheRefresh: function() {
        return q = "useCacheRefresh", J(), Fi();
      }
    }, Kv = {
      readContext: function(e) {
        return yt(e);
      },
      use: pn,
      useCallback: function(e, t) {
        return q = "useCallback", J(), $i(e, t);
      },
      useContext: function(e) {
        return q = "useContext", J(), yt(e);
      },
      useEffect: function(e, t) {
        q = "useEffect", J(), kt(2048, Sl, e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return q = "useImperativeHandle", J(), bn(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        return q = "useInsertionEffect", J(), kt(4, va, e, t);
      },
      useLayoutEffect: function(e, t) {
        return q = "useLayoutEffect", J(), kt(4, wl, e, t);
      },
      useMemo: function(e, t) {
        q = "useMemo", J();
        var a = _.H;
        _.H = Ou;
        try {
          return Iu(e, t);
        } finally {
          _.H = a;
        }
      },
      useReducer: function(e, t, a) {
        q = "useReducer", J();
        var i = _.H;
        _.H = Ou;
        try {
          return Da(e, t, a);
        } finally {
          _.H = i;
        }
      },
      useRef: function() {
        return q = "useRef", J(), Xe().memoizedState;
      },
      useState: function() {
        q = "useState", J();
        var e = _.H;
        _.H = Ou;
        try {
          return Da(Ke);
        } finally {
          _.H = e;
        }
      },
      useDebugValue: function() {
        q = "useDebugValue", J();
      },
      useDeferredValue: function(e, t) {
        return q = "useDeferredValue", J(), Uf(e, t);
      },
      useTransition: function() {
        return q = "useTransition", J(), Sr();
      },
      useSyncExternalStore: function(e, t, a) {
        return q = "useSyncExternalStore", J(), Af(
          e,
          t,
          a
        );
      },
      useId: function() {
        return q = "useId", J(), Xe().memoizedState;
      },
      useFormState: function(e) {
        return q = "useFormState", J(), $c(), dr(e);
      },
      useActionState: function(e) {
        return q = "useActionState", J(), dr(e);
      },
      useOptimistic: function(e, t) {
        return q = "useOptimistic", J(), fu(e, t);
      },
      useHostTransitionStatus: Jl,
      useMemoCache: wt,
      useCacheRefresh: function() {
        return q = "useCacheRefresh", J(), Xe().memoizedState;
      }
    }, ob = {
      readContext: function(e) {
        return yt(e);
      },
      use: pn,
      useCallback: function(e, t) {
        return q = "useCallback", J(), $i(e, t);
      },
      useContext: function(e) {
        return q = "useContext", J(), yt(e);
      },
      useEffect: function(e, t) {
        q = "useEffect", J(), kt(2048, Sl, e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return q = "useImperativeHandle", J(), bn(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        return q = "useInsertionEffect", J(), kt(4, va, e, t);
      },
      useLayoutEffect: function(e, t) {
        return q = "useLayoutEffect", J(), kt(4, wl, e, t);
      },
      useMemo: function(e, t) {
        q = "useMemo", J();
        var a = _.H;
        _.H = N0;
        try {
          return Iu(e, t);
        } finally {
          _.H = a;
        }
      },
      useReducer: function(e, t, a) {
        q = "useReducer", J();
        var i = _.H;
        _.H = N0;
        try {
          return ki(e, t, a);
        } finally {
          _.H = i;
        }
      },
      useRef: function() {
        return q = "useRef", J(), Xe().memoizedState;
      },
      useState: function() {
        q = "useState", J();
        var e = _.H;
        _.H = N0;
        try {
          return ki(Ke);
        } finally {
          _.H = e;
        }
      },
      useDebugValue: function() {
        q = "useDebugValue", J();
      },
      useDeferredValue: function(e, t) {
        return q = "useDeferredValue", J(), gr(e, t);
      },
      useTransition: function() {
        return q = "useTransition", J(), Tr();
      },
      useSyncExternalStore: function(e, t, a) {
        return q = "useSyncExternalStore", J(), Af(
          e,
          t,
          a
        );
      },
      useId: function() {
        return q = "useId", J(), Xe().memoizedState;
      },
      useFormState: function(e) {
        return q = "useFormState", J(), $c(), lo(e);
      },
      useActionState: function(e) {
        return q = "useActionState", J(), lo(e);
      },
      useOptimistic: function(e, t) {
        return q = "useOptimistic", J(), rr(e, t);
      },
      useHostTransitionStatus: Jl,
      useMemoCache: wt,
      useCacheRefresh: function() {
        return q = "useCacheRefresh", J(), Xe().memoizedState;
      }
    }, Ti = {
      readContext: function(e) {
        return fe(), yt(e);
      },
      use: function(e) {
        return L(), pn(e);
      },
      useCallback: function(e, t) {
        return q = "useCallback", L(), Ue(), Mf(e, t);
      },
      useContext: function(e) {
        return q = "useContext", L(), Ue(), yt(e);
      },
      useEffect: function(e, t) {
        return q = "useEffect", L(), Ue(), hr(e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return q = "useImperativeHandle", L(), Ue(), yr(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        q = "useInsertionEffect", L(), Ue(), Ma(4, va, e, t);
      },
      useLayoutEffect: function(e, t) {
        return q = "useLayoutEffect", L(), Ue(), mr(e, t);
      },
      useMemo: function(e, t) {
        q = "useMemo", L(), Ue();
        var a = _.H;
        _.H = Ti;
        try {
          return pr(e, t);
        } finally {
          _.H = a;
        }
      },
      useReducer: function(e, t, a) {
        q = "useReducer", L(), Ue();
        var i = _.H;
        _.H = Ti;
        try {
          return Le(e, t, a);
        } finally {
          _.H = i;
        }
      },
      useRef: function(e) {
        return q = "useRef", L(), Ue(), Of(e);
      },
      useState: function(e) {
        q = "useState", L(), Ue();
        var t = _.H;
        _.H = Ti;
        try {
          return ou(e);
        } finally {
          _.H = t;
        }
      },
      useDebugValue: function() {
        q = "useDebugValue", L(), Ue();
      },
      useDeferredValue: function(e, t) {
        return q = "useDeferredValue", L(), Ue(), vr(e, t);
      },
      useTransition: function() {
        return q = "useTransition", L(), Ue(), Sn();
      },
      useSyncExternalStore: function(e, t, a) {
        return q = "useSyncExternalStore", L(), Ue(), cu(
          e,
          t,
          a
        );
      },
      useId: function() {
        return q = "useId", L(), Ue(), Tn();
      },
      useFormState: function(e, t) {
        return q = "useFormState", L(), Ue(), to(e, t);
      },
      useActionState: function(e, t) {
        return q = "useActionState", L(), Ue(), to(e, t);
      },
      useOptimistic: function(e) {
        return q = "useOptimistic", L(), Ue(), Wa(e);
      },
      useMemoCache: function(e) {
        return L(), wt(e);
      },
      useHostTransitionStatus: Jl,
      useCacheRefresh: function() {
        return q = "useCacheRefresh", Ue(), Fi();
      }
    }, Ou = {
      readContext: function(e) {
        return fe(), yt(e);
      },
      use: function(e) {
        return L(), pn(e);
      },
      useCallback: function(e, t) {
        return q = "useCallback", L(), J(), $i(e, t);
      },
      useContext: function(e) {
        return q = "useContext", L(), J(), yt(e);
      },
      useEffect: function(e, t) {
        q = "useEffect", L(), J(), kt(2048, Sl, e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return q = "useImperativeHandle", L(), J(), bn(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        return q = "useInsertionEffect", L(), J(), kt(4, va, e, t);
      },
      useLayoutEffect: function(e, t) {
        return q = "useLayoutEffect", L(), J(), kt(4, wl, e, t);
      },
      useMemo: function(e, t) {
        q = "useMemo", L(), J();
        var a = _.H;
        _.H = Ou;
        try {
          return Iu(e, t);
        } finally {
          _.H = a;
        }
      },
      useReducer: function(e, t, a) {
        q = "useReducer", L(), J();
        var i = _.H;
        _.H = Ou;
        try {
          return Da(e, t, a);
        } finally {
          _.H = i;
        }
      },
      useRef: function() {
        return q = "useRef", L(), J(), Xe().memoizedState;
      },
      useState: function() {
        q = "useState", L(), J();
        var e = _.H;
        _.H = Ou;
        try {
          return Da(Ke);
        } finally {
          _.H = e;
        }
      },
      useDebugValue: function() {
        q = "useDebugValue", L(), J();
      },
      useDeferredValue: function(e, t) {
        return q = "useDeferredValue", L(), J(), Uf(e, t);
      },
      useTransition: function() {
        return q = "useTransition", L(), J(), Sr();
      },
      useSyncExternalStore: function(e, t, a) {
        return q = "useSyncExternalStore", L(), J(), Af(
          e,
          t,
          a
        );
      },
      useId: function() {
        return q = "useId", L(), J(), Xe().memoizedState;
      },
      useFormState: function(e) {
        return q = "useFormState", L(), J(), dr(e);
      },
      useActionState: function(e) {
        return q = "useActionState", L(), J(), dr(e);
      },
      useOptimistic: function(e, t) {
        return q = "useOptimistic", L(), J(), fu(e, t);
      },
      useMemoCache: function(e) {
        return L(), wt(e);
      },
      useHostTransitionStatus: Jl,
      useCacheRefresh: function() {
        return q = "useCacheRefresh", J(), Xe().memoizedState;
      }
    }, N0 = {
      readContext: function(e) {
        return fe(), yt(e);
      },
      use: function(e) {
        return L(), pn(e);
      },
      useCallback: function(e, t) {
        return q = "useCallback", L(), J(), $i(e, t);
      },
      useContext: function(e) {
        return q = "useContext", L(), J(), yt(e);
      },
      useEffect: function(e, t) {
        q = "useEffect", L(), J(), kt(2048, Sl, e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return q = "useImperativeHandle", L(), J(), bn(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        return q = "useInsertionEffect", L(), J(), kt(4, va, e, t);
      },
      useLayoutEffect: function(e, t) {
        return q = "useLayoutEffect", L(), J(), kt(4, wl, e, t);
      },
      useMemo: function(e, t) {
        q = "useMemo", L(), J();
        var a = _.H;
        _.H = Ou;
        try {
          return Iu(e, t);
        } finally {
          _.H = a;
        }
      },
      useReducer: function(e, t, a) {
        q = "useReducer", L(), J();
        var i = _.H;
        _.H = Ou;
        try {
          return ki(e, t, a);
        } finally {
          _.H = i;
        }
      },
      useRef: function() {
        return q = "useRef", L(), J(), Xe().memoizedState;
      },
      useState: function() {
        q = "useState", L(), J();
        var e = _.H;
        _.H = Ou;
        try {
          return ki(Ke);
        } finally {
          _.H = e;
        }
      },
      useDebugValue: function() {
        q = "useDebugValue", L(), J();
      },
      useDeferredValue: function(e, t) {
        return q = "useDeferredValue", L(), J(), gr(e, t);
      },
      useTransition: function() {
        return q = "useTransition", L(), J(), Tr();
      },
      useSyncExternalStore: function(e, t, a) {
        return q = "useSyncExternalStore", L(), J(), Af(
          e,
          t,
          a
        );
      },
      useId: function() {
        return q = "useId", L(), J(), Xe().memoizedState;
      },
      useFormState: function(e) {
        return q = "useFormState", L(), J(), lo(e);
      },
      useActionState: function(e) {
        return q = "useActionState", L(), J(), lo(e);
      },
      useOptimistic: function(e, t) {
        return q = "useOptimistic", L(), J(), rr(e, t);
      },
      useMemoCache: function(e) {
        return L(), wt(e);
      },
      useHostTransitionStatus: Jl,
      useCacheRefresh: function() {
        return q = "useCacheRefresh", J(), Xe().memoizedState;
      }
    };
    var fb = {
      react_stack_bottom_frame: function(e, t, a) {
        var i = ta;
        ta = !0;
        try {
          return e(t, a);
        } finally {
          ta = i;
        }
      }
    }, kv = fb.react_stack_bottom_frame.bind(fb), sb = {
      react_stack_bottom_frame: function(e) {
        var t = ta;
        ta = !0;
        try {
          return e.render();
        } finally {
          ta = t;
        }
      }
    }, rb = sb.react_stack_bottom_frame.bind(sb), db = {
      react_stack_bottom_frame: function(e, t) {
        try {
          t.componentDidMount();
        } catch (a) {
          ye(e, e.return, a);
        }
      }
    }, $v = db.react_stack_bottom_frame.bind(
      db
    ), hb = {
      react_stack_bottom_frame: function(e, t, a, i, o) {
        try {
          t.componentDidUpdate(a, i, o);
        } catch (f) {
          ye(e, e.return, f);
        }
      }
    }, mb = hb.react_stack_bottom_frame.bind(
      hb
    ), yb = {
      react_stack_bottom_frame: function(e, t) {
        var a = t.stack;
        e.componentDidCatch(t.value, {
          componentStack: a !== null ? a : ""
        });
      }
    }, zS = yb.react_stack_bottom_frame.bind(
      yb
    ), pb = {
      react_stack_bottom_frame: function(e, t, a) {
        try {
          a.componentWillUnmount();
        } catch (i) {
          ye(e, t, i);
        }
      }
    }, vb = pb.react_stack_bottom_frame.bind(
      pb
    ), gb = {
      react_stack_bottom_frame: function(e) {
        e.resourceKind != null && console.error(
          "Expected only SimpleEffects when enableUseEffectCRUDOverload is disabled, got %s",
          e.resourceKind
        );
        var t = e.create;
        return e = e.inst, t = t(), e.destroy = t;
      }
    }, DS = gb.react_stack_bottom_frame.bind(gb), bb = {
      react_stack_bottom_frame: function(e, t, a) {
        try {
          a();
        } catch (i) {
          ye(e, t, i);
        }
      }
    }, OS = bb.react_stack_bottom_frame.bind(bb), Sb = {
      react_stack_bottom_frame: function(e) {
        var t = e._init;
        return t(e._payload);
      }
    }, Vo = Sb.react_stack_bottom_frame.bind(Sb), $d = null, By = 0, He = null, Wv, Tb = Wv = !1, xb = {}, Eb = {}, Ab = {};
    be = function(e, t, a) {
      if (a !== null && typeof a == "object" && a._store && (!a._store.validated && a.key == null || a._store.validated === 2)) {
        if (typeof a._store != "object")
          throw Error(
            "React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue."
          );
        a._store.validated = 1;
        var i = ce(e), o = i || "null";
        if (!xb[o]) {
          xb[o] = !0, a = a._owner, e = e._debugOwner;
          var f = "";
          e && typeof e.tag == "number" && (o = ce(e)) && (f = `

Check the render method of \`` + o + "`."), f || i && (f = `

Check the top-level render call using <` + i + ">.");
          var d = "";
          a != null && e !== a && (i = null, typeof a.tag == "number" ? i = ce(a) : typeof a.name == "string" && (i = a.name), i && (d = " It was passed a child from " + i + ".")), ae(t, function() {
            console.error(
              'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
              f,
              d
            );
          });
        }
      }
    };
    var Wd = jf(!0), Rb = jf(!1), kn = rt(null), xi = null, Fd = 1, Yy = 2, Tl = rt(0), zb = {}, Db = /* @__PURE__ */ new Set(), Ob = /* @__PURE__ */ new Set(), Mb = /* @__PURE__ */ new Set(), Ub = /* @__PURE__ */ new Set(), Cb = /* @__PURE__ */ new Set(), Hb = /* @__PURE__ */ new Set(), Nb = /* @__PURE__ */ new Set(), jb = /* @__PURE__ */ new Set(), _b = /* @__PURE__ */ new Set(), qb = /* @__PURE__ */ new Set();
    Object.freeze(zb);
    var Fv = {
      enqueueSetState: function(e, t, a) {
        e = e._reactInternals;
        var i = $l(e), o = mn(i);
        o.payload = t, a != null && (em(a), o.callback = a), t = Ka(e, o, i), t !== null && (Ut(t, e, i), Ku(t, e, i)), Ri(e, i);
      },
      enqueueReplaceState: function(e, t, a) {
        e = e._reactInternals;
        var i = $l(e), o = mn(i);
        o.tag = tb, o.payload = t, a != null && (em(a), o.callback = a), t = Ka(e, o, i), t !== null && (Ut(t, e, i), Ku(t, e, i)), Ri(e, i);
      },
      enqueueForceUpdate: function(e, t) {
        e = e._reactInternals;
        var a = $l(e), i = mn(a);
        i.tag = lb, t != null && (em(t), i.callback = t), t = Ka(e, i, a), t !== null && (Ut(t, e, a), Ku(t, e, a)), te !== null && typeof te.markForceUpdateScheduled == "function" && te.markForceUpdateScheduled(e, a);
      }
    }, Iv = typeof reportError == "function" ? reportError : function(e) {
      if (typeof window == "object" && typeof window.ErrorEvent == "function") {
        var t = new window.ErrorEvent("error", {
          bubbles: !0,
          cancelable: !0,
          message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
          error: e
        });
        if (!window.dispatchEvent(t)) return;
      } else if (typeof process == "object" && typeof process.emit == "function") {
        process.emit("uncaughtException", e);
        return;
      }
      console.error(e);
    }, Id = null, Pv = null, Bb = Error(
      "This is not a real error. It's an implementation detail of React's selective hydration feature. If this leaks into userspace, it's a bug in React. Please file an issue."
    ), Ol = !1, Yb = {}, wb = {}, Gb = {}, Vb = {}, Pd = !1, Xb = {}, eg = {}, tg = {
      dehydrated: null,
      treeContext: null,
      retryLane: 0,
      hydrationErrors: null
    }, Qb = !1, Zb = null;
    Zb = /* @__PURE__ */ new Set();
    var Oc = !1, Ft = !1, lg = !1, Lb = typeof WeakSet == "function" ? WeakSet : Set, Ml = null, eh = null, th = null, cl = null, wa = !1, Mu = null, wy = 8192, MS = {
      getCacheForType: function(e) {
        var t = yt(bl), a = t.data.get(e);
        return a === void 0 && (a = e(), t.data.set(e, a)), a;
      },
      getOwner: function() {
        return ma;
      }
    };
    if (typeof Symbol == "function" && Symbol.for) {
      var Gy = Symbol.for;
      Gy("selector.component"), Gy("selector.has_pseudo_class"), Gy("selector.role"), Gy("selector.test_id"), Gy("selector.text");
    }
    var US = [], CS = typeof WeakMap == "function" ? WeakMap : Map, an = 0, ga = 2, Uu = 4, Mc = 0, Vy = 1, lh = 2, ag = 3, Us = 4, j0 = 6, Jb = 5, nt = an, pt = null, Ye = null, we = 0, Ga = 0, Xy = 1, Cs = 2, Qy = 3, Kb = 4, ng = 5, ah = 6, Zy = 7, ug = 8, Hs = 9, ot = Ga, nn = null, Xo = !1, nh = !1, ig = !1, Ei = 0, Qt = Mc, Qo = 0, Zo = 0, cg = 0, un = 0, Ns = 0, Ly = null, ba = null, _0 = !1, og = 0, kb = 300, q0 = 1 / 0, $b = 500, Jy = null, Lo = null, HS = 0, NS = 1, jS = 2, js = 0, Wb = 1, Fb = 2, Ib = 3, _S = 4, fg = 5, Gl = 0, Jo = null, uh = null, Ko = 0, sg = 0, rg = null, Pb = null, qS = 50, Ky = 0, dg = null, hg = !1, B0 = !1, BS = 50, _s = 0, ky = null, ih = !1, Y0 = null, e1 = !1, t1 = /* @__PURE__ */ new Set(), YS = {}, w0 = null, ch = null, mg = !1, yg = !1, G0 = !1, pg = !1, qs = 0, vg = {};
    (function() {
      for (var e = 0; e < jv.length; e++) {
        var t = jv[e], a = t.toLowerCase();
        t = t[0].toUpperCase() + t.slice(1), Xa(a, "on" + t);
      }
      Xa(wg, "onAnimationEnd"), Xa(Gg, "onAnimationIteration"), Xa(Vg, "onAnimationStart"), Xa("dblclick", "onDoubleClick"), Xa("focusin", "onFocus"), Xa("focusout", "onBlur"), Xa(yS, "onTransitionRun"), Xa(pS, "onTransitionStart"), Xa(vS, "onTransitionCancel"), Xa(Xg, "onTransitionEnd");
    })(), Di("onMouseEnter", ["mouseout", "mouseover"]), Di("onMouseLeave", ["mouseout", "mouseover"]), Di("onPointerEnter", ["pointerout", "pointerover"]), Di("onPointerLeave", ["pointerout", "pointerover"]), Nu(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " "
      )
    ), Nu(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    ), Nu("onBeforeInput", [
      "compositionend",
      "keypress",
      "textInput",
      "paste"
    ]), Nu(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    ), Nu(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    ), Nu(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    );
    var $y = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ), gg = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat($y)
    ), V0 = "_reactListening" + Math.random().toString(36).slice(2), l1 = !1, a1 = !1, X0 = !1, n1 = !1, Q0 = !1, Z0 = !1, u1 = !1, L0 = {}, wS = /\r\n?/g, GS = /\u0000|\uFFFD/g, Bs = "http://www.w3.org/1999/xlink", bg = "http://www.w3.org/XML/1998/namespace", VS = "javascript:throw new Error('React form unexpectedly submitted.')", XS = "suppressHydrationWarning", J0 = "$", K0 = "/$", Uc = "$?", Wy = "$!", QS = 1, ZS = 2, LS = 4, Sg = "F!", i1 = "F", c1 = "complete", JS = "style", Cc = 0, oh = 1, k0 = 2, Tg = null, xg = null, o1 = { dialog: !0, webview: !0 }, Eg = null, f1 = typeof setTimeout == "function" ? setTimeout : void 0, KS = typeof clearTimeout == "function" ? clearTimeout : void 0, Ys = -1, s1 = typeof Promise == "function" ? Promise : void 0, kS = typeof queueMicrotask == "function" ? queueMicrotask : typeof s1 < "u" ? function(e) {
      return s1.resolve(null).then(e).catch(Gm);
    } : f1, Ag = null, ws = 0, Fy = 1, r1 = 2, d1 = 3, $n = 4, Wn = /* @__PURE__ */ new Map(), h1 = /* @__PURE__ */ new Set(), Hc = ve.d;
    ve.d = {
      f: function() {
        var e = Hc.f(), t = cc();
        return e || t;
      },
      r: function(e) {
        var t = na(e);
        t !== null && t.tag === 5 && t.type === "form" ? Fh(t) : Hc.r(e);
      },
      D: function(e) {
        Hc.D(e), Fp("dns-prefetch", e, null);
      },
      C: function(e, t) {
        Hc.C(e, t), Fp("preconnect", e, t);
      },
      L: function(e, t, a) {
        Hc.L(e, t, a);
        var i = fh;
        if (i && e && t) {
          var o = 'link[rel="preload"][as="' + ua(t) + '"]';
          t === "image" && a && a.imageSrcSet ? (o += '[imagesrcset="' + ua(
            a.imageSrcSet
          ) + '"]', typeof a.imageSizes == "string" && (o += '[imagesizes="' + ua(
            a.imageSizes
          ) + '"]')) : o += '[href="' + ua(e) + '"]';
          var f = o;
          switch (t) {
            case "style":
              f = oi(e);
              break;
            case "script":
              f = mc(e);
          }
          Wn.has(f) || (e = Me(
            {
              rel: "preload",
              href: t === "image" && a && a.imageSrcSet ? void 0 : e,
              as: t
            },
            a
          ), Wn.set(f, e), i.querySelector(o) !== null || t === "style" && i.querySelector(
            _n(f)
          ) || t === "script" && i.querySelector(yc(f)) || (t = i.createElement("link"), Ht(t, "link", e), Pt(t), i.head.appendChild(t)));
        }
      },
      m: function(e, t) {
        Hc.m(e, t);
        var a = fh;
        if (a && e) {
          var i = t && typeof t.as == "string" ? t.as : "script", o = 'link[rel="modulepreload"][as="' + ua(i) + '"][href="' + ua(e) + '"]', f = o;
          switch (i) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script":
              f = mc(e);
          }
          if (!Wn.has(f) && (e = Me({ rel: "modulepreload", href: e }, t), Wn.set(f, e), a.querySelector(o) === null)) {
            switch (i) {
              case "audioworklet":
              case "paintworklet":
              case "serviceworker":
              case "sharedworker":
              case "worker":
              case "script":
                if (a.querySelector(yc(f)))
                  return;
            }
            i = a.createElement("link"), Ht(i, "link", e), Pt(i), a.head.appendChild(i);
          }
        }
      },
      X: function(e, t) {
        Hc.X(e, t);
        var a = fh;
        if (a && e) {
          var i = cn(a).hoistableScripts, o = mc(e), f = i.get(o);
          f || (f = a.querySelector(
            yc(o)
          ), f || (e = Me({ src: e, async: !0 }, t), (t = Wn.get(o)) && km(e, t), f = a.createElement("script"), Pt(f), Ht(f, "link", e), a.head.appendChild(f)), f = {
            type: "script",
            instance: f,
            count: 1,
            state: null
          }, i.set(o, f));
        }
      },
      S: function(e, t, a) {
        Hc.S(e, t, a);
        var i = fh;
        if (i && e) {
          var o = cn(i).hoistableStyles, f = oi(e);
          t = t || "default";
          var d = o.get(f);
          if (!d) {
            var h = { loading: ws, preload: null };
            if (d = i.querySelector(
              _n(f)
            ))
              h.loading = Fy | $n;
            else {
              e = Me(
                {
                  rel: "stylesheet",
                  href: e,
                  "data-precedence": t
                },
                a
              ), (a = Wn.get(f)) && Km(e, a);
              var p = d = i.createElement("link");
              Pt(p), Ht(p, "link", e), p._p = new Promise(function(v, H) {
                p.onload = v, p.onerror = H;
              }), p.addEventListener("load", function() {
                h.loading |= Fy;
              }), p.addEventListener("error", function() {
                h.loading |= r1;
              }), h.loading |= $n, dd(d, t, i);
            }
            d = {
              type: "stylesheet",
              instance: d,
              count: 1,
              state: h
            }, o.set(f, d);
          }
        }
      },
      M: function(e, t) {
        Hc.M(e, t);
        var a = fh;
        if (a && e) {
          var i = cn(a).hoistableScripts, o = mc(e), f = i.get(o);
          f || (f = a.querySelector(
            yc(o)
          ), f || (e = Me({ src: e, async: !0, type: "module" }, t), (t = Wn.get(o)) && km(e, t), f = a.createElement("script"), Pt(f), Ht(f, "link", e), a.head.appendChild(f)), f = {
            type: "script",
            instance: f,
            count: 1,
            state: null
          }, i.set(o, f));
        }
      }
    };
    var fh = typeof document > "u" ? null : document, $0 = null, Iy = null, Rg = null, W0 = null, Gs = Ev, Py = {
      $$typeof: _a,
      Provider: null,
      Consumer: null,
      _currentValue: Gs,
      _currentValue2: Gs,
      _threadCount: 0
    }, m1 = "%c%s%c ", y1 = "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px", p1 = "", F0 = " ", $S = Function.prototype.bind, v1 = !1, g1 = null, b1 = null, S1 = null, T1 = null, x1 = null, E1 = null, A1 = null, R1 = null, z1 = null;
    g1 = function(e, t, a, i) {
      t = A(e, t), t !== null && (a = Q(t.memoizedState, a, 0, i), t.memoizedState = a, t.baseState = a, e.memoizedProps = Me({}, e.memoizedProps), a = Xl(e, 2), a !== null && Ut(a, e, 2));
    }, b1 = function(e, t, a) {
      t = A(e, t), t !== null && (a = $(t.memoizedState, a, 0), t.memoizedState = a, t.baseState = a, e.memoizedProps = Me({}, e.memoizedProps), a = Xl(e, 2), a !== null && Ut(a, e, 2));
    }, S1 = function(e, t, a, i) {
      t = A(e, t), t !== null && (a = K(t.memoizedState, a, i), t.memoizedState = a, t.baseState = a, e.memoizedProps = Me({}, e.memoizedProps), a = Xl(e, 2), a !== null && Ut(a, e, 2));
    }, T1 = function(e, t, a) {
      e.pendingProps = Q(e.memoizedProps, t, 0, a), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = Xl(e, 2), t !== null && Ut(t, e, 2);
    }, x1 = function(e, t) {
      e.pendingProps = $(e.memoizedProps, t, 0), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = Xl(e, 2), t !== null && Ut(t, e, 2);
    }, E1 = function(e, t, a) {
      e.pendingProps = K(
        e.memoizedProps,
        t,
        a
      ), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = Xl(e, 2), t !== null && Ut(t, e, 2);
    }, A1 = function(e) {
      var t = Xl(e, 2);
      t !== null && Ut(t, e, 2);
    }, R1 = function(e) {
      De = e;
    }, z1 = function(e) {
      oe = e;
    };
    var I0 = !0, P0 = null, zg = !1, ko = null, $o = null, Wo = null, ep = /* @__PURE__ */ new Map(), tp = /* @__PURE__ */ new Map(), Fo = [], WS = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
      " "
    ), ev = null;
    if (cs.prototype.render = gd.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null) throw Error("Cannot update an unmounted root.");
      var a = arguments;
      typeof a[1] == "function" ? console.error(
        "does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."
      ) : lt(a[1]) ? console.error(
        "You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root."
      ) : typeof a[1] < "u" && console.error(
        "You passed a second argument to root.render(...) but it only accepts one argument."
      ), a = e;
      var i = t.current, o = $l(i);
      at(i, o, a, t, null, null);
    }, cs.prototype.unmount = gd.prototype.unmount = function() {
      var e = arguments;
      if (typeof e[0] == "function" && console.error(
        "does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."
      ), e = this._internalRoot, e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        (nt & (ga | Uu)) !== an && console.error(
          "Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."
        ), at(e.current, 2, null, e, null, null), cc(), t[pi] = null;
      }
    }, cs.prototype.unstable_scheduleHydration = function(e) {
      if (e) {
        var t = op();
        e = { blockedOn: null, target: e, priority: t };
        for (var a = 0; a < Fo.length && t !== 0 && t < Fo[a].priority; a++) ;
        Fo.splice(a, 0, e), a === 0 && a0(e);
      }
    }, (function() {
      var e = os.version;
      if (e !== "19.1.1")
        throw Error(
          `Incompatible React versions: The "react" and "react-dom" packages must have the exact same version. Instead got:
  - react:      ` + (e + `
  - react-dom:  19.1.1
Learn more: https://react.dev/warnings/version-mismatch`)
        );
    })(), typeof Map == "function" && Map.prototype != null && typeof Map.prototype.forEach == "function" && typeof Set == "function" && Set.prototype != null && typeof Set.prototype.clear == "function" && typeof Set.prototype.forEach == "function" || console.error(
      "React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://react.dev/link/react-polyfills"
    ), ve.findDOMNode = function(e) {
      var t = e._reactInternals;
      if (t === void 0)
        throw typeof e.render == "function" ? Error("Unable to find node on an unmounted component.") : (e = Object.keys(e).join(","), Error(
          "Argument appears to not be a ReactComponent. Keys: " + e
        ));
      return e = Bt(t), e = e !== null ? Zt(e) : null, e = e === null ? null : e.stateNode, e;
    }, !(function() {
      var e = {
        bundleType: 1,
        version: "19.1.1",
        rendererPackageName: "react-dom",
        currentDispatcherRef: _,
        reconcilerVersion: "19.1.1"
      };
      return e.overrideHookState = g1, e.overrideHookStateDeletePath = b1, e.overrideHookStateRenamePath = S1, e.overrideProps = T1, e.overridePropsDeletePath = x1, e.overridePropsRenamePath = E1, e.scheduleUpdate = A1, e.setErrorHandler = R1, e.setSuspenseHandler = z1, e.scheduleRefresh = Je, e.scheduleRoot = Fe, e.setRefreshHandler = qt, e.getCurrentFiber = bv, e.getLaneLabelMap = Sv, e.injectProfilingHooks = Cu, dt(e);
    })() && b && window.top === window.self && (-1 < navigator.userAgent.indexOf("Chrome") && navigator.userAgent.indexOf("Edge") === -1 || -1 < navigator.userAgent.indexOf("Firefox"))) {
      var D1 = window.location.protocol;
      /^(https?|file):$/.test(D1) && console.info(
        "%cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools" + (D1 === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://react.dev/link/react-devtools-faq` : ""),
        "font-weight:bold"
      );
    }
    ap.createRoot = function(e, t) {
      if (!lt(e))
        throw Error("Target container is not a DOM element.");
      i0(e);
      var a = !1, i = "", o = tm, f = _p, d = Rr, h = null;
      return t != null && (t.hydrate ? console.warn(
        "hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead."
      ) : typeof t == "object" && t !== null && t.$$typeof === ri && console.error(
        `You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`
      ), t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (f = t.onCaughtError), t.onRecoverableError !== void 0 && (d = t.onRecoverableError), t.unstable_transitionCallbacks !== void 0 && (h = t.unstable_transitionCallbacks)), t = Fm(
        e,
        1,
        !1,
        null,
        null,
        a,
        i,
        o,
        f,
        d,
        h,
        null
      ), e[pi] = t.current, Nm(e), new gd(t);
    }, ap.hydrateRoot = function(e, t, a) {
      if (!lt(e))
        throw Error("Target container is not a DOM element.");
      i0(e), t === void 0 && console.error(
        "Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)"
      );
      var i = !1, o = "", f = tm, d = _p, h = Rr, p = null, v = null;
      return a != null && (a.unstable_strictMode === !0 && (i = !0), a.identifierPrefix !== void 0 && (o = a.identifierPrefix), a.onUncaughtError !== void 0 && (f = a.onUncaughtError), a.onCaughtError !== void 0 && (d = a.onCaughtError), a.onRecoverableError !== void 0 && (h = a.onRecoverableError), a.unstable_transitionCallbacks !== void 0 && (p = a.unstable_transitionCallbacks), a.formState !== void 0 && (v = a.formState)), t = Fm(
        e,
        1,
        !0,
        t,
        a ?? null,
        i,
        o,
        f,
        d,
        h,
        p,
        v
      ), t.context = Im(null), a = t.current, i = $l(a), i = Ul(i), o = mn(i), o.callback = null, Ka(a, o, i), a = i, t.current.lanes = a, jc(t, a), Ha(t), e[pi] = t.current, Nm(e), new cs(t);
    }, ap.version = "19.1.1", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })()), ap;
}
var N1;
function a2() {
  if (N1) return tv.exports;
  N1 = 1;
  function A() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
      if (process.env.NODE_ENV !== "production")
        throw new Error("^_^");
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(A);
      } catch (Q) {
        console.error(Q);
      }
    }
  }
  return process.env.NODE_ENV === "production" ? (A(), tv.exports = t2()) : tv.exports = l2(), tv.exports;
}
var n2 = a2();
const u2 = /* @__PURE__ */ IS(n2);
var av = { exports: {} }, np = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var j1;
function i2() {
  if (j1) return np;
  j1 = 1;
  var A = Symbol.for("react.transitional.element"), Q = Symbol.for("react.fragment");
  function K(g, $, oe) {
    var De = null;
    if (oe !== void 0 && (De = "" + oe), $.key !== void 0 && (De = "" + $.key), "key" in $) {
      oe = {};
      for (var be in $)
        be !== "key" && (oe[be] = $[be]);
    } else oe = $;
    return $ = oe.ref, {
      $$typeof: A,
      type: g,
      key: De,
      ref: $ !== void 0 ? $ : null,
      props: oe
    };
  }
  return np.Fragment = Q, np.jsx = K, np.jsxs = K, np;
}
var up = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _1;
function c2() {
  return _1 || (_1 = 1, process.env.NODE_ENV !== "production" && (function() {
    function A(j) {
      if (j == null) return null;
      if (typeof j == "function")
        return j.$$typeof === rt ? null : j.displayName || j.name || null;
      if (typeof j == "string") return j;
      switch (j) {
        case qt:
          return "Fragment";
        case Ie:
          return "Profiler";
        case lt:
          return "StrictMode";
        case Zt:
          return "Suspense";
        case gt:
          return "SuspenseList";
        case ce:
          return "Activity";
      }
      if (typeof j == "object")
        switch (typeof j.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), j.$$typeof) {
          case Je:
            return "Portal";
          case st:
            return (j.displayName || "Context") + ".Provider";
          case ol:
            return (j._context.displayName || "Context") + ".Consumer";
          case Bt:
            var k = j.render;
            return j = j.displayName, j || (j = k.displayName || k.name || "", j = j !== "" ? "ForwardRef(" + j + ")" : "ForwardRef"), j;
          case Ne:
            return k = j.displayName || null, k !== null ? k : A(j.type) || "Memo";
          case mt:
            k = j._payload, j = j._init;
            try {
              return A(j(k));
            } catch {
            }
        }
      return null;
    }
    function Q(j) {
      return "" + j;
    }
    function K(j) {
      try {
        Q(j);
        var k = !1;
      } catch {
        k = !0;
      }
      if (k) {
        k = console;
        var I = k.error, me = typeof Symbol == "function" && Symbol.toStringTag && j[Symbol.toStringTag] || j.constructor.name || "Object";
        return I.call(
          k,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          me
        ), Q(j);
      }
    }
    function g(j) {
      if (j === qt) return "<>";
      if (typeof j == "object" && j !== null && j.$$typeof === mt)
        return "<...>";
      try {
        var k = A(j);
        return k ? "<" + k + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function $() {
      var j = Ge.A;
      return j === null ? null : j.getOwner();
    }
    function oe() {
      return Error("react-stack-top-frame");
    }
    function De(j) {
      if (Se.call(j, "key")) {
        var k = Object.getOwnPropertyDescriptor(j, "key").get;
        if (k && k.isReactWarning) return !1;
      }
      return j.key !== void 0;
    }
    function be(j, k) {
      function I() {
        Yt || (Yt = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          k
        ));
      }
      I.isReactWarning = !0, Object.defineProperty(j, "key", {
        get: I,
        configurable: !0
      });
    }
    function L() {
      var j = A(this.type);
      return z[j] || (z[j] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), j = this.props.ref, j !== void 0 ? j : null;
    }
    function fe(j, k, I, me, je, dt, Ve, Cu) {
      return I = dt.ref, j = {
        $$typeof: Fe,
        type: j,
        key: k,
        props: dt,
        _owner: je
      }, (I !== void 0 ? I : null) !== null ? Object.defineProperty(j, "ref", {
        enumerable: !1,
        get: L
      }) : Object.defineProperty(j, "ref", { enumerable: !1, value: null }), j._store = {}, Object.defineProperty(j._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(j, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(j, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: Ve
      }), Object.defineProperty(j, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: Cu
      }), Object.freeze && (Object.freeze(j.props), Object.freeze(j)), j;
    }
    function F(j, k, I, me, je, dt, Ve, Cu) {
      var Dt = k.children;
      if (Dt !== void 0)
        if (me)
          if (Gt(Dt)) {
            for (me = 0; me < Dt.length; me++)
              P(Dt[me]);
            Object.freeze && Object.freeze(Dt);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else P(Dt);
      if (Se.call(k, "key")) {
        Dt = A(j);
        var fl = Object.keys(k).filter(function(Ai) {
          return Ai !== "key";
        });
        me = 0 < fl.length ? "{key: someKey, " + fl.join(": ..., ") + ": ...}" : "{key: someKey}", re[Dt + me] || (fl = 0 < fl.length ? "{" + fl.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          me,
          Dt,
          fl,
          Dt
        ), re[Dt + me] = !0);
      }
      if (Dt = null, I !== void 0 && (K(I), Dt = "" + I), De(k) && (K(k.key), Dt = "" + k.key), "key" in k) {
        I = {};
        for (var Ta in k)
          Ta !== "key" && (I[Ta] = k[Ta]);
      } else I = k;
      return Dt && be(
        I,
        typeof j == "function" ? j.displayName || j.name || "Unknown" : j
      ), fe(
        j,
        Dt,
        dt,
        je,
        $(),
        I,
        Ve,
        Cu
      );
    }
    function P(j) {
      typeof j == "object" && j !== null && j.$$typeof === Fe && j._store && (j._store.validated = 1);
    }
    var ie = Sa, Fe = Symbol.for("react.transitional.element"), Je = Symbol.for("react.portal"), qt = Symbol.for("react.fragment"), lt = Symbol.for("react.strict_mode"), Ie = Symbol.for("react.profiler"), ol = Symbol.for("react.consumer"), st = Symbol.for("react.context"), Bt = Symbol.for("react.forward_ref"), Zt = Symbol.for("react.suspense"), gt = Symbol.for("react.suspense_list"), Ne = Symbol.for("react.memo"), mt = Symbol.for("react.lazy"), ce = Symbol.for("react.activity"), rt = Symbol.for("react.client.reference"), Ge = ie.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Se = Object.prototype.hasOwnProperty, Gt = Array.isArray, zt = console.createTask ? console.createTask : function() {
      return null;
    };
    ie = {
      react_stack_bottom_frame: function(j) {
        return j();
      }
    };
    var Yt, z = {}, Z = ie.react_stack_bottom_frame.bind(
      ie,
      oe
    )(), W = zt(g(oe)), re = {};
    up.Fragment = qt, up.jsx = function(j, k, I, me, je) {
      var dt = 1e4 > Ge.recentlyCreatedOwnerStacks++;
      return F(
        j,
        k,
        I,
        !1,
        me,
        je,
        dt ? Error("react-stack-top-frame") : Z,
        dt ? zt(g(j)) : W
      );
    }, up.jsxs = function(j, k, I, me, je) {
      var dt = 1e4 > Ge.recentlyCreatedOwnerStacks++;
      return F(
        j,
        k,
        I,
        !0,
        me,
        je,
        dt ? Error("react-stack-top-frame") : Z,
        dt ? zt(g(j)) : W
      );
    };
  })()), up;
}
var q1;
function o2() {
  return q1 || (q1 = 1, process.env.NODE_ENV === "production" ? av.exports = i2() : av.exports = c2()), av.exports;
}
var R = o2();
const B1 = (A) => {
  let Q;
  const K = /* @__PURE__ */ new Set(), g = (fe, F) => {
    const P = typeof fe == "function" ? fe(Q) : fe;
    if (!Object.is(P, Q)) {
      const ie = Q;
      Q = F ?? (typeof P != "object" || P === null) ? P : Object.assign({}, Q, P), K.forEach((Fe) => Fe(Q, ie));
    }
  }, $ = () => Q, be = { setState: g, getState: $, getInitialState: () => L, subscribe: (fe) => (K.add(fe), () => K.delete(fe)) }, L = Q = A(g, $, be);
  return be;
}, f2 = ((A) => A ? B1(A) : B1), s2 = (A) => A;
function r2(A, Q = s2) {
  const K = Sa.useSyncExternalStore(
    A.subscribe,
    Sa.useCallback(() => Q(A.getState()), [A, Q]),
    Sa.useCallback(() => Q(A.getInitialState()), [A, Q])
  );
  return Sa.useDebugValue(K), K;
}
const Y1 = (A) => {
  const Q = f2(A), K = (g) => r2(Q, g);
  return Object.assign(K, Q), K;
}, d2 = ((A) => A ? Y1(A) : Y1), ut = {
  currency: "RUB",
  vatRateDefault: 20,
  sku: {
    transmitter: { sku: "TX", name: "Передатчик", unitPrice: 1e4 },
    receiver: { sku: "RX", name: "Приёмник", unitPrice: 3e3 },
    microphone: { sku: "MIC", name: "Микрофон", unitPrice: 2e3 },
    headphones: {
      in_ear: { sku: "HP-IN", name: "Наушники (вкладыши)", unitPrice: 700 },
      on_ear: { sku: "HP-ON", name: "Наушники (накладные)", unitPrice: 1200 },
      over_ear: { sku: "HP-OV", name: "Наушники (полноразмерные)", unitPrice: 2e3 }
    },
    charger: {
      10: { sku: "CH-10", name: "Зарядное устройство на 10", unitPrice: 8e3 },
      20: { sku: "CH-20", name: "Зарядное устройство на 20", unitPrice: 15e3 },
      30: { sku: "CH-30", name: "Зарядное устройство на 30", unitPrice: 21e3 }
    }
  },
  volumeDiscounts: [
    { thresholdQty: 20, percentage: 5 },
    { thresholdQty: 50, percentage: 10 },
    { thresholdQty: 100, percentage: 15 }
  ],
  shipping: {
    moscow: 0,
    rf: 0,
    world: 0
  },
  promos: [
    { code: "WELCOME10", type: "percentage", value: 10, stackWithVolume: !0 },
    { code: "FIX5000", type: "fixed", value: 5e3, minAmount: 3e4, stackWithVolume: !1 }
  ]
}, h2 = async (A, Q) => {
  try {
    const K = await fetch(A, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Calculator-Widget/1.0"
      },
      body: JSON.stringify(Q)
    });
    if (!K.ok)
      throw new Error(`HTTP error! status: ${K.status}`);
    return !0;
  } catch (K) {
    return console.error("Webhook error:", K), !1;
  }
}, m2 = d2((A, Q) => {
  const K = {
    // Устаревшие поля
    selectedProducts: [],
    shipping: null,
    discount: null,
    subtotal: 0,
    volumeDiscountAmount: 0,
    promoDiscountAmount: 0,
    discountAmount: 0,
    vatAmount: 0,
    shippingCost: 0,
    // Новые поля
    select_delivery: "moscow",
    input_tr: 0,
    input_rc: 0,
    input_mic: 0,
    select_headphones: null,
    qty_headphones: 0,
    select_charger: null,
    // New fields for different tabs
    input_audioguide: 0,
    input_triggers: 0,
    promo: "",
    vatIncluded: !1,
    vatRate: 20,
    bundles: 1,
    total: 0,
    // Сеттеры с вычислением в реальном времени
    setDelivery: (g) => {
      A({ select_delivery: g }), Q().calculateTotal();
    },
    setTransmitters: (g) => {
      A({ input_tr: g }), Q().calculateTotal();
    },
    setReceivers: (g) => {
      A({ input_rc: g }), Q().calculateTotal();
    },
    setMicrophones: (g) => {
      A({ input_mic: g }), Q().calculateTotal();
    },
    setHeadphonesType: (g) => {
      A({ select_headphones: g }), Q().calculateTotal();
    },
    setHeadphonesQty: (g) => {
      A({ qty_headphones: g }), Q().calculateTotal();
    },
    setCharger: (g) => {
      A({ select_charger: g }), Q().calculateTotal();
    },
    setAudioguideQty: (g) => {
      A({ input_audioguide: g }), Q().calculateTotal();
    },
    setTriggersQty: (g) => {
      A({ input_triggers: g }), Q().calculateTotal();
    },
    setPromo: (g) => {
      A({ promo: g }), Q().calculateTotal();
    },
    setVatIncluded: (g) => {
      A({ vatIncluded: g }), Q().calculateTotal();
    },
    setVatRate: (g) => {
      A({ vatRate: g }), Q().calculateTotal();
    },
    setBundles: (g) => {
      A({ bundles: g }), Q().calculateTotal();
    },
    // Устаревшие действия
    addProduct: (g, $ = 1) => {
      const { selectedProducts: oe } = Q(), De = oe.find((be) => be.product.id === g.id);
      A(De ? {
        selectedProducts: oe.map(
          (be) => be.product.id === g.id ? { ...be, quantity: be.quantity + $ } : be
        )
      } : {
        selectedProducts: [...oe, { product: g, quantity: $ }]
      });
    },
    removeProduct: (g) => {
      const { selectedProducts: $ } = Q();
      A({
        selectedProducts: $.filter((oe) => oe.product.id !== g)
      });
    },
    updateQuantity: (g, $) => {
      const { selectedProducts: oe } = Q();
      A({
        selectedProducts: oe.map(
          (De) => De.product.id === g ? { ...De, quantity: $ } : De
        )
      });
    },
    setShipping: (g) => A({ shipping: g }),
    setDiscount: (g) => A({ discount: g }),
    // Новые действия
    calculateTotal: () => {
      const g = Q(), { input_rc: $, input_tr: oe, input_mic: De, qty_headphones: be, select_charger: L, input_audioguide: fe, input_triggers: F } = g;
      let P = 0;
      P += oe * ut.sku.transmitter.unitPrice, P += $ * ut.sku.receiver.unitPrice, P += De * ut.sku.microphone.unitPrice, g.select_headphones && (P += be * ut.sku.headphones[g.select_headphones].unitPrice), L && (P += ut.sku.charger[L].unitPrice), P += fe * ut.sku.receiver.unitPrice, P += F * ut.sku.transmitter.unitPrice;
      const ie = ut.shipping[g.select_delivery], Fe = $ + oe + De + be + fe + F;
      let Je = 0;
      for (const st of ut.volumeDiscounts)
        Fe >= st.thresholdQty && (Je = Math.max(Je, st.percentage));
      const qt = P * Je / 100, lt = qt, ol = P - lt + ie;
      A({
        subtotal: P,
        volumeDiscountAmount: qt,
        // promoDiscountAmount: promoDiscount, // временно отключено
        discountAmount: lt,
        // vatAmount, // временно отключено
        shippingCost: ie,
        total: ol
      });
    },
    addToCart: () => {
      const g = Q();
      g.calculateTotal();
      const $ = [];
      return g.input_tr > 0 && $.push({
        product: {
          id: "transmitter",
          name: "Передатчик",
          price: ut.sku.transmitter.unitPrice,
          category: "radioguide"
        },
        quantity: g.input_tr
      }), g.input_rc > 0 && $.push({
        product: {
          id: "receiver",
          name: "Приёмник",
          price: ut.sku.receiver.unitPrice,
          category: "radioguide"
        },
        quantity: g.input_rc
      }), g.input_mic > 0 && $.push({
        product: {
          id: "microphone",
          name: "Микрофон",
          price: ut.sku.microphone.unitPrice,
          category: "radioguide"
        },
        quantity: g.input_mic
      }), g.select_headphones && g.qty_headphones > 0 && $.push({
        product: {
          id: "headphones",
          name: `Наушники (${ut.sku.headphones[g.select_headphones].name})`,
          price: ut.sku.headphones[g.select_headphones].unitPrice,
          category: "accessory"
        },
        quantity: g.qty_headphones
      }), g.select_charger && $.push({
        product: {
          id: "charger",
          name: `Зарядное устройство на ${g.select_charger}`,
          price: ut.sku.charger[g.select_charger].unitPrice,
          category: "accessory"
        },
        quantity: 1
      }), g.input_audioguide > 0 && $.push({
        product: {
          id: "audioguide",
          name: "Аудиогид",
          price: ut.sku.receiver.unitPrice,
          // Using receiver price as base
          category: "audioguide"
        },
        quantity: g.input_audioguide
      }), g.input_triggers > 0 && $.push({
        product: {
          id: "trigger",
          name: "Триггер",
          price: ut.sku.transmitter.unitPrice,
          // Using transmitter price as base
          category: "audioguide"
        },
        quantity: g.input_triggers
      }), console.log("Добавлено в корзину:", $), !0;
    },
    // Очистка корзины
    clearCart: () => {
      A({
        selectedProducts: [],
        input_tr: 0,
        input_rc: 0,
        input_mic: 0,
        select_headphones: null,
        qty_headphones: 0,
        select_charger: null,
        input_audioguide: 0,
        input_triggers: 0,
        // promo: '', // временно отключено
        // bundles: 1, // временно отключено
        subtotal: 0,
        volumeDiscountAmount: 0,
        // promoDiscountAmount: 0, // временно отключено
        discountAmount: 0,
        // vatAmount: 0, // временно отключено
        shippingCost: 0,
        total: 0
      });
    },
    sendToWebhook: async (g) => {
      const $ = Q();
      $.calculateTotal();
      const oe = {
        delivery: $.select_delivery,
        receivers: $.input_rc,
        transmitters: $.input_tr,
        microphones: $.input_mic,
        headphones: {
          type: $.select_headphones,
          quantity: $.qty_headphones
        },
        charger: $.select_charger,
        audioguides: $.input_audioguide,
        triggers: $.input_triggers,
        // promo: state.promo, // временно отключено
        // vatIncluded: state.vatIncluded, // временно отключено
        // vatRate: state.vatRate, // временно отключено
        // bundles: state.bundles, // временно отключено
        total: $.total,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
      return await h2(g, oe);
    }
  };
  return setTimeout(() => {
    K.calculateTotal();
  }, 0), K;
});
var Q1 = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
}, w1 = Sa.createContext && /* @__PURE__ */ Sa.createContext(Q1), y2 = ["attr", "size", "title"];
function p2(A, Q) {
  if (A == null) return {};
  var K = v2(A, Q), g, $;
  if (Object.getOwnPropertySymbols) {
    var oe = Object.getOwnPropertySymbols(A);
    for ($ = 0; $ < oe.length; $++)
      g = oe[$], !(Q.indexOf(g) >= 0) && Object.prototype.propertyIsEnumerable.call(A, g) && (K[g] = A[g]);
  }
  return K;
}
function v2(A, Q) {
  if (A == null) return {};
  var K = {};
  for (var g in A)
    if (Object.prototype.hasOwnProperty.call(A, g)) {
      if (Q.indexOf(g) >= 0) continue;
      K[g] = A[g];
    }
  return K;
}
function nv() {
  return nv = Object.assign ? Object.assign.bind() : function(A) {
    for (var Q = 1; Q < arguments.length; Q++) {
      var K = arguments[Q];
      for (var g in K)
        Object.prototype.hasOwnProperty.call(K, g) && (A[g] = K[g]);
    }
    return A;
  }, nv.apply(this, arguments);
}
function G1(A, Q) {
  var K = Object.keys(A);
  if (Object.getOwnPropertySymbols) {
    var g = Object.getOwnPropertySymbols(A);
    Q && (g = g.filter(function($) {
      return Object.getOwnPropertyDescriptor(A, $).enumerable;
    })), K.push.apply(K, g);
  }
  return K;
}
function uv(A) {
  for (var Q = 1; Q < arguments.length; Q++) {
    var K = arguments[Q] != null ? arguments[Q] : {};
    Q % 2 ? G1(Object(K), !0).forEach(function(g) {
      g2(A, g, K[g]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(A, Object.getOwnPropertyDescriptors(K)) : G1(Object(K)).forEach(function(g) {
      Object.defineProperty(A, g, Object.getOwnPropertyDescriptor(K, g));
    });
  }
  return A;
}
function g2(A, Q, K) {
  return Q = b2(Q), Q in A ? Object.defineProperty(A, Q, { value: K, enumerable: !0, configurable: !0, writable: !0 }) : A[Q] = K, A;
}
function b2(A) {
  var Q = S2(A, "string");
  return typeof Q == "symbol" ? Q : Q + "";
}
function S2(A, Q) {
  if (typeof A != "object" || !A) return A;
  var K = A[Symbol.toPrimitive];
  if (K !== void 0) {
    var g = K.call(A, Q);
    if (typeof g != "object") return g;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (Q === "string" ? String : Number)(A);
}
function Z1(A) {
  return A && A.map((Q, K) => /* @__PURE__ */ Sa.createElement(Q.tag, uv({
    key: K
  }, Q.attr), Z1(Q.child)));
}
function L1(A) {
  return (Q) => /* @__PURE__ */ Sa.createElement(T2, nv({
    attr: uv({}, A.attr)
  }, Q), Z1(A.child));
}
function T2(A) {
  var Q = (K) => {
    var {
      attr: g,
      size: $,
      title: oe
    } = A, De = p2(A, y2), be = $ || K.size || "1em", L;
    return K.className && (L = K.className), A.className && (L = (L ? L + " " : "") + A.className), /* @__PURE__ */ Sa.createElement("svg", nv({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, K.attr, g, De, {
      className: L,
      style: uv(uv({
        color: A.color || K.color
      }, K.style), A.style),
      height: be,
      width: be,
      xmlns: "http://www.w3.org/2000/svg"
    }), oe && /* @__PURE__ */ Sa.createElement("title", null, oe), A.children);
  };
  return w1 !== void 0 ? /* @__PURE__ */ Sa.createElement(w1.Consumer, null, (K) => Q(K)) : Q(Q1);
}
function Io(A) {
  return L1({ attr: { version: "1.2", baseProfile: "tiny", viewBox: "0 0 24 24" }, child: [{ tag: "path", attr: { d: "M5.8 9.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.4-.3.7s.1.5.3.7z" }, child: [] }] })(A);
}
const x2 = ({
  input_rc: A,
  input_tr: Q,
  select_headphones: K,
  qty_headphones: g,
  select_charger: $,
  setReceivers: oe,
  setTransmitters: De,
  setHeadphonesType: be,
  setHeadphonesQty: L,
  setCharger: fe,
  calculatorConfig: F
}) => /* @__PURE__ */ R.jsxs("div", { className: "space-y-6", children: [
  /* @__PURE__ */ R.jsx("div", { children: /* @__PURE__ */ R.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
    /* @__PURE__ */ R.jsxs("div", { children: [
      /* @__PURE__ */ R.jsx("div", { className: "md:text-lg font-semibold mb-1", children: "Приёмники" }),
      /* @__PURE__ */ R.jsx("div", { className: "flex h-10 items-center border border-black rounded-lg overflow-hidden", children: /* @__PURE__ */ R.jsx(
        "input",
        {
          type: "text",
          value: A === 0 ? "" : A,
          onChange: (P) => {
            const ie = P.target.value;
            /^\d*$/.test(ie) && oe(Number(ie));
          },
          className: "flex-1 text-xs px-5 border-none outline-none",
          placeholder: "0"
        }
      ) })
    ] }),
    /* @__PURE__ */ R.jsxs("div", { children: [
      /* @__PURE__ */ R.jsx("div", { className: "md:text-lg font-semibold mb-1", children: "Передатчики" }),
      /* @__PURE__ */ R.jsx("div", { className: "flex h-10 items-center border border-black rounded-lg overflow-hidden", children: /* @__PURE__ */ R.jsx(
        "input",
        {
          type: "text",
          value: Q === 0 ? "" : Q,
          onChange: (P) => {
            const ie = P.target.value;
            /^\d*$/.test(ie) && De(Number(ie));
          },
          className: "flex-1 text-xs px-5 border-none outline-none",
          placeholder: "0"
        }
      ) })
    ] })
  ] }) }),
  /* @__PURE__ */ R.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5", children: [
    /* @__PURE__ */ R.jsxs("div", { children: [
      /* @__PURE__ */ R.jsx("div", { className: "md:text-lg font-semibold mb-1", children: "Наушники" }),
      /* @__PURE__ */ R.jsxs("div", { className: "relative w-full", children: [
        /* @__PURE__ */ R.jsxs(
          "select",
          {
            value: K ?? "",
            onChange: (P) => be(P.target.value ? P.target.value : null),
            className: "w-full text-xs h-10 rounded-lg outline-none border border-black px-3 appearance-none pr-10",
            children: [
              /* @__PURE__ */ R.jsx("option", { value: "", children: "Не выбрано" }),
              /* @__PURE__ */ R.jsx("option", { value: "in_ear", children: "Вкладыши" }),
              /* @__PURE__ */ R.jsx("option", { value: "on_ear", children: "Накладные" }),
              /* @__PURE__ */ R.jsx("option", { value: "over_ear", children: "Полноразмерные" })
            ]
          }
        ),
        /* @__PURE__ */ R.jsx("div", { className: "absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none", children: /* @__PURE__ */ R.jsx(Io, {}) })
      ] }),
      K && /* @__PURE__ */ R.jsx("div", { className: "flex h-10 items-center border border-black rounded-lg overflow-hidden mt-2", children: /* @__PURE__ */ R.jsx(
        "input",
        {
          type: "text",
          value: g === 0 ? "" : g,
          onChange: (P) => {
            const ie = P.target.value;
            /^\d*$/.test(ie) && L(Number(P.target.value));
          },
          className: "flex-1 border-none outline-none px-5",
          placeholder: "0"
        }
      ) })
    ] }),
    /* @__PURE__ */ R.jsxs("div", { children: [
      /* @__PURE__ */ R.jsx("div", { className: "md:text-lg font-semibold mb-1", children: "Аксессуары" }),
      /* @__PURE__ */ R.jsxs("div", { className: "relative w-full", children: [
        /* @__PURE__ */ R.jsxs(
          "select",
          {
            value: $ ?? "",
            onChange: (P) => fe(P.target.value ? Number(P.target.value) : null),
            className: "w-full text-xs h-10 rounded-lg outline-none border border-black px-3 appearance-none pr-10",
            children: [
              /* @__PURE__ */ R.jsx("option", { value: "", children: "Не выбрано" }),
              Object.keys(F.sku.charger).map((P) => /* @__PURE__ */ R.jsx("option", { value: P, children: F.sku.charger[Number(P)].name }, P))
            ]
          }
        ),
        /* @__PURE__ */ R.jsx("div", { className: "absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none", children: /* @__PURE__ */ R.jsx(Io, {}) })
      ] })
    ] })
  ] })
] }), E2 = ({
  input_audioguide: A,
  input_triggers: Q,
  select_headphones: K,
  qty_headphones: g,
  select_charger: $,
  setAudioguideQty: oe,
  setTriggersQty: De,
  setHeadphonesType: be,
  setHeadphonesQty: L,
  setCharger: fe
}) => /* @__PURE__ */ R.jsxs("div", { className: "space-y-6", children: [
  /* @__PURE__ */ R.jsx("div", { children: /* @__PURE__ */ R.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
    /* @__PURE__ */ R.jsxs("div", { children: [
      /* @__PURE__ */ R.jsx("div", { className: "md:text-lg font-semibold mb-1 capitalize", children: "Приёмники" }),
      /* @__PURE__ */ R.jsx("div", { className: "flex h-10 items-center border border-black rounded-lg overflow-hidden", children: /* @__PURE__ */ R.jsx(
        "input",
        {
          type: "text",
          value: A === 0 ? "" : A,
          onChange: (F) => {
            const P = F.target.value;
            /^\d*$/.test(P) && oe(Number(P));
          },
          className: "flex-1 text-xs border-none outline-none px-5",
          placeholder: "0"
        }
      ) })
    ] }),
    /* @__PURE__ */ R.jsxs("div", { children: [
      /* @__PURE__ */ R.jsx("div", { className: "md:text-lg font-semibold mb-1 capitalize", children: "Передатчики" }),
      /* @__PURE__ */ R.jsx("div", { className: "flex h-10 items-center border border-black rounded-lg overflow-hidden", children: /* @__PURE__ */ R.jsx(
        "input",
        {
          type: "text",
          value: Q === 0 ? "" : Q,
          onChange: (F) => {
            const P = F.target.value;
            /^\d*$/.test(P) && De(Number(P));
          },
          className: "flex-1 text-xs border-none outline-none px-5",
          placeholder: "0"
        }
      ) })
    ] })
  ] }) }),
  /* @__PURE__ */ R.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5", children: [
    /* @__PURE__ */ R.jsxs("div", { children: [
      /* @__PURE__ */ R.jsx("div", { className: "md:text-lg font-semibold mb-1", children: "Наушники" }),
      /* @__PURE__ */ R.jsxs("div", { className: "relative w-full", children: [
        /* @__PURE__ */ R.jsxs(
          "select",
          {
            value: K ?? "",
            onChange: (F) => be(F.target.value ? F.target.value : null),
            className: "w-full text-xs h-10 rounded-lg outline-none border border-black px-3 appearance-none pr-10",
            children: [
              /* @__PURE__ */ R.jsx("option", { value: "", children: "Не выбрано" }),
              /* @__PURE__ */ R.jsx("option", { value: "in_ear", children: "Вкладыши" }),
              /* @__PURE__ */ R.jsx("option", { value: "on_ear", children: "Накладные" }),
              /* @__PURE__ */ R.jsx("option", { value: "over_ear", children: "Полноразмерные" })
            ]
          }
        ),
        /* @__PURE__ */ R.jsx("div", { className: "absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none", children: /* @__PURE__ */ R.jsx(Io, {}) })
      ] }),
      K && /* @__PURE__ */ R.jsx("div", { className: "flex h-10 items-center border border-black rounded-lg overflow-hidden mt-2", children: /* @__PURE__ */ R.jsx(
        "input",
        {
          type: "text",
          value: g === 0 ? "" : g,
          onChange: (F) => {
            const P = F.target.value;
            /^\d*$/.test(P) && L(Number(F.target.value));
          },
          className: "flex-1 text-xs border-none outline-none px-5",
          placeholder: "0"
        }
      ) })
    ] }),
    /* @__PURE__ */ R.jsxs("div", { children: [
      /* @__PURE__ */ R.jsx("div", { className: "md:text-lg font-semibold mb-1", children: "Аксессуары" }),
      /* @__PURE__ */ R.jsxs("div", { className: "relative w-full", children: [
        /* @__PURE__ */ R.jsxs(
          "select",
          {
            value: $ ?? "",
            onChange: (F) => fe(F.target.value ? Number(F.target.value) : null),
            className: "w-full h-10 rounded-lg text-sm outline-none border border-black px-3 appearance-none pr-10",
            children: [
              /* @__PURE__ */ R.jsx("option", { value: "", children: "Не выбрано" }),
              Object.keys(ut.sku.charger).map((F) => /* @__PURE__ */ R.jsx("option", { value: F, children: ut.sku.charger[Number(F)].name }, F))
            ]
          }
        ),
        /* @__PURE__ */ R.jsx("div", { className: "absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none", children: /* @__PURE__ */ R.jsx(Io, {}) })
      ] })
    ] })
  ] })
] }), A2 = ({
  select_headphones: A,
  qty_headphones: Q,
  setHeadphonesType: K,
  setHeadphonesQty: g
}) => /* @__PURE__ */ R.jsx("div", { className: "space-y-6", children: /* @__PURE__ */ R.jsx("div", { children: /* @__PURE__ */ R.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 items-end gap-3", children: [
  /* @__PURE__ */ R.jsxs("div", { children: [
    /* @__PURE__ */ R.jsx("div", { className: "md:text-lg font-semibold mb-1", children: "Тип наушников" }),
    /* @__PURE__ */ R.jsxs("div", { className: "relative w-full", children: [
      /* @__PURE__ */ R.jsxs(
        "select",
        {
          value: A ?? "",
          onChange: ($) => K($.target.value ? $.target.value : null),
          className: "w-full text-xs h-10 rounded-lg outline-none border border-black px-3 appearance-none pr-10",
          children: [
            /* @__PURE__ */ R.jsx("option", { value: "", children: "Не выбрано" }),
            /* @__PURE__ */ R.jsx("option", { value: "in_ear", children: "Вкладыши" }),
            /* @__PURE__ */ R.jsx("option", { value: "on_ear", children: "Накладные" }),
            /* @__PURE__ */ R.jsx("option", { value: "over_ear", children: "Полноразмерные" })
          ]
        }
      ),
      /* @__PURE__ */ R.jsx("div", { className: "absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none", children: /* @__PURE__ */ R.jsx(Io, {}) })
    ] })
  ] }),
  /* @__PURE__ */ R.jsx("div", { children: /* @__PURE__ */ R.jsx("div", { className: "flex items-center h-10 border border-black rounded-lg overflow-hidden", children: /* @__PURE__ */ R.jsx(
    "input",
    {
      type: "text",
      value: Q === 0 ? "" : Q,
      onChange: ($) => {
        const oe = $.target.value;
        /^\d*$/.test(oe) && g(Number($.target.value));
      },
      className: "flex-1 text-xs border-none outline-none px-5",
      placeholder: "0"
    }
  ) }) })
] }) }) }), R2 = ({
  input_rc: A,
  input_tr: Q,
  select_headphones: K,
  qty_headphones: g,
  select_charger: $,
  setReceivers: oe,
  setTransmitters: De,
  setHeadphonesType: be,
  setHeadphonesQty: L,
  setCharger: fe
}) => /* @__PURE__ */ R.jsxs("div", { className: "space-y-6", children: [
  /* @__PURE__ */ R.jsx("div", { children: /* @__PURE__ */ R.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
    /* @__PURE__ */ R.jsxs("div", { children: [
      /* @__PURE__ */ R.jsx("div", { className: "md:text-lg font-semibold mb-1 capitalize", children: "приёмников" }),
      /* @__PURE__ */ R.jsx("div", { className: "flex h-10 items-center border border-black rounded-lg overflow-hidden", children: /* @__PURE__ */ R.jsx(
        "input",
        {
          type: "text",
          value: A === 0 ? "" : A,
          onChange: (F) => {
            const P = F.target.value;
            /^\d*$/.test(P) && oe(Number(P));
          },
          className: "flex-1 text-xs border-none outline-none px-5",
          placeholder: "0"
        }
      ) })
    ] }),
    /* @__PURE__ */ R.jsxs("div", { children: [
      /* @__PURE__ */ R.jsx("div", { className: "md:text-lg font-semibold mb-1 capitalize", children: "передатчиков" }),
      /* @__PURE__ */ R.jsx("div", { className: "flex h-10 items-center border border-black rounded-lg overflow-hidden", children: /* @__PURE__ */ R.jsx(
        "input",
        {
          type: "text",
          value: Q === 0 ? "" : Q,
          onChange: (F) => {
            const P = F.target.value;
            /^\d*$/.test(P) && De(Number(P));
          },
          className: "flex-1 text-xs border-none outline-none px-5",
          placeholder: "0"
        }
      ) })
    ] })
  ] }) }),
  /* @__PURE__ */ R.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5", children: [
    /* @__PURE__ */ R.jsxs("div", { children: [
      /* @__PURE__ */ R.jsx("div", { className: "md:text-lg font-semibold mb-1", children: "Наушники" }),
      /* @__PURE__ */ R.jsxs("div", { className: "relative w-full", children: [
        /* @__PURE__ */ R.jsxs(
          "select",
          {
            value: K ?? "",
            onChange: (F) => be(F.target.value ? F.target.value : null),
            className: "w-full text-xs h-10 rounded-lg outline-none border border-black px-3 appearance-none pr-10",
            children: [
              /* @__PURE__ */ R.jsx("option", { value: "", children: "Не выбрано" }),
              /* @__PURE__ */ R.jsx("option", { value: "in_ear", children: "Вкладыши" }),
              /* @__PURE__ */ R.jsx("option", { value: "on_ear", children: "Накладные" }),
              /* @__PURE__ */ R.jsx("option", { value: "over_ear", children: "Полноразмерные" })
            ]
          }
        ),
        /* @__PURE__ */ R.jsx("div", { className: "absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none", children: /* @__PURE__ */ R.jsx(Io, {}) })
      ] }),
      K && /* @__PURE__ */ R.jsx("div", { className: "flex h-10 items-center border border-black rounded-lg overflow-hidden mt-2", children: /* @__PURE__ */ R.jsx(
        "input",
        {
          type: "text",
          value: g === 0 ? "" : g,
          onChange: (F) => {
            const P = F.target.value;
            /^\d*$/.test(P) && L(Number(F.target.value));
          },
          className: "flex-1 border-none outline-none px-5",
          placeholder: "0"
        }
      ) })
    ] }),
    /* @__PURE__ */ R.jsxs("div", { children: [
      /* @__PURE__ */ R.jsx("div", { className: "md:text-lg font-semibold mb-1", children: "Аксессуары" }),
      /* @__PURE__ */ R.jsxs("div", { className: "relative w-full", children: [
        /* @__PURE__ */ R.jsxs(
          "select",
          {
            value: $ ?? "",
            onChange: (F) => fe(F.target.value ? Number(F.target.value) : null),
            className: "w-full h-10 rounded-lg outline-none border border-black px-3 appearance-none pr-10",
            children: [
              /* @__PURE__ */ R.jsx("option", { value: "", children: "Не выбрано" }),
              Object.keys(ut.sku.charger).map((F) => /* @__PURE__ */ R.jsx("option", { value: F, children: ut.sku.charger[Number(F)].name }, F))
            ]
          }
        ),
        /* @__PURE__ */ R.jsx("div", { className: "absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none", children: /* @__PURE__ */ R.jsx(Io, {}) })
      ] })
    ] })
  ] })
] }), z2 = ({
  isOpen: A,
  onClose: Q,
  orderItems: K,
  userInfo: g,
  onUserInfoChange: $,
  onSubmit: oe,
  formatPrice: De,
  orderTotal: be
}) => {
  if (!A) return null;
  const L = () => {
    Q(), $({ name: "", email: "", phone: "+7" });
  };
  return /* @__PURE__ */ R.jsx(
    "div",
    {
      className: "fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50",
      onClick: L,
      children: /* @__PURE__ */ R.jsxs("div", { className: "grid md:grid-cols-2 gap-4 bg-white rounded-xl max-w-[99%] lg:max-w-3/4 xl:max-w-[936px]  w-full sm:mx-4 max-h-[90vh] py-12 px-6 lg:px-12 overflow-y-auto", onClick: (fe) => fe.stopPropagation(), children: [
        /* @__PURE__ */ R.jsxs("div", { className: "max-w-[349px] mx-auto md:mx-0 w-full", children: [
          /* @__PURE__ */ R.jsx("h3", { className: "text-lg font-semibold mb-4", children: "Контактная информация" }),
          /* @__PURE__ */ R.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ R.jsxs("div", { children: [
              /* @__PURE__ */ R.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Ваше имя" }),
              /* @__PURE__ */ R.jsx(
                "input",
                {
                  type: "text",
                  value: g.name,
                  onChange: (fe) => $({ ...g, name: fe.target.value }),
                  placeholder: "Введите имя",
                  className: "w-full h-10 rounded-lg outline-none border border-black px-3"
                }
              )
            ] }),
            /* @__PURE__ */ R.jsxs("div", { children: [
              /* @__PURE__ */ R.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Ваш Email" }),
              /* @__PURE__ */ R.jsx(
                "input",
                {
                  type: "email",
                  value: g.email,
                  onChange: (fe) => $({ ...g, email: fe.target.value }),
                  placeholder: "Введите Email",
                  className: "w-full h-10 rounded-lg outline-none border border-black px-3"
                }
              )
            ] }),
            /* @__PURE__ */ R.jsxs("div", { children: [
              /* @__PURE__ */ R.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Ваш телефон" }),
              /* @__PURE__ */ R.jsxs("div", { className: "flex w-full", children: [
                /* @__PURE__ */ R.jsxs("div", { className: "flex items-center border border-black rounded-l-lg px-3 bg-gray-50", children: [
                  /* @__PURE__ */ R.jsx("span", { className: "text-sm", children: "🇷🇺" }),
                  /* @__PURE__ */ R.jsxs(
                    "select",
                    {
                      className: "ml-2 bg-transparent border-none outline-none",
                      value: g.phone.startsWith("+998") ? "+998" : g.phone.startsWith("+7") ? "+7" : "+1",
                      onChange: (fe) => {
                        const F = fe.target.value, P = g.phone.startsWith("+998") ? "+998" : g.phone.startsWith("+7") ? "+7" : "+1", ie = g.phone.replace(P, "");
                        $({
                          ...g,
                          phone: F + ie
                        });
                      },
                      children: [
                        /* @__PURE__ */ R.jsx("option", { value: "+7", children: "+7" }),
                        /* @__PURE__ */ R.jsx("option", { value: "+998", children: "+998" }),
                        /* @__PURE__ */ R.jsx("option", { value: "+1", children: "+1" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ R.jsx(
                  "input",
                  {
                    type: "tel",
                    value: (() => {
                      const fe = g.phone.startsWith("+998") ? "+998" : g.phone.startsWith("+7") ? "+7" : "+1";
                      return g.phone.replace(fe, "");
                    })(),
                    onChange: (fe) => {
                      const F = g.phone.startsWith("+998") ? "+998" : g.phone.startsWith("+7") ? "+7" : "+1";
                      $({
                        ...g,
                        phone: F + fe.target.value
                      });
                    },
                    placeholder: "(000) 000-00-00",
                    className: "flex-1 w-fit h-10 border border-black border-l-0 rounded-r-lg px-3 outline-none"
                  }
                )
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ R.jsxs("div", { className: "max-w-[346px] w-full mx-auto md:border rounded-2xl md:p-4", children: [
          /* @__PURE__ */ R.jsx("div", { className: "text-xl font-semibold mb-6 text-gray-800", children: "Ваш комплект" }),
          /* @__PURE__ */ R.jsx("div", { className: "space-y-6 mb-6", children: K.map((fe, F) => /* @__PURE__ */ R.jsxs("div", { className: "text-gray-800", children: [
            /* @__PURE__ */ R.jsxs("div", { className: "text-sm text-gray-600", children: [
              F + 1,
              ". ",
              fe.name,
              " x",
              fe.quantity,
              ":"
            ] }),
            /* @__PURE__ */ R.jsx("div", { className: "pl-3 text-sm text-gray-600", children: De(fe.price * fe.quantity) })
          ] }, fe.id)) }),
          /* @__PURE__ */ R.jsxs("div", { className: "space-y-3 mb-6", children: [
            /* @__PURE__ */ R.jsxs("div", { className: "flex justify-between text-sm text-gray-600", children: [
              /* @__PURE__ */ R.jsx("span", { children: "Подытог:" }),
              /* @__PURE__ */ R.jsx("span", { children: De(be || 0) })
            ] }),
            /* @__PURE__ */ R.jsx("hr", { className: "border-gray-200" })
          ] }),
          /* @__PURE__ */ R.jsx(
            "button",
            {
              onClick: oe,
              disabled: K.length === 0,
              className: "w-full h-10 bg-custom-gradient cursor-pointer text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed",
              children: K.length === 0 ? "Корзина пуста" : "Отправить"
            }
          )
        ] })
      ] })
    }
  );
};
function D2(A) {
  return L1({ attr: { viewBox: "0 0 24 24" }, child: [{ tag: "path", attr: { fill: "none", d: "M0 0h24v24H0V0z" }, child: [] }, { tag: "path", attr: { d: "M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" }, child: [] }] })(A);
}
const O2 = () => {
  const [A, Q] = Dg(0), [K, g] = Dg(!1), [$, oe] = Dg({
    name: "",
    email: "",
    phone: "+7"
  }), {
    // inputs
    select_delivery: De,
    input_rc: be,
    input_tr: L,
    input_mic: fe,
    select_headphones: F,
    qty_headphones: P,
    select_charger: ie,
    input_audioguide: Fe,
    input_triggers: Je,
    // promo,
    // vatIncluded, // временно отключено
    // vatRate, // временно отключено
    // bundles, // временно отключено
    // totals
    total: qt,
    subtotal: lt,
    volumeDiscountAmount: Ie,
    // promoDiscountAmount, // временно отключено
    shippingCost: ol,
    // vatAmount, // временно отключено
    // setters
    setDelivery: st,
    setReceivers: Bt,
    setTransmitters: Zt,
    setMicrophones: gt,
    setHeadphonesType: Ne,
    setHeadphonesQty: mt,
    setCharger: ce,
    setAudioguideQty: rt,
    setTriggersQty: Ge,
    // setPromo,
    // setVatIncluded, // временно отключено
    // setVatRate, // временно отключено
    // setBundles,
    // actions
    clearCart: Se,
    // sendToWebhook,
    addToCart: Gt
  } = m2(), zt = (k) => new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB"
  }).format(k), Yt = () => {
    if (!$.name.trim()) {
      alert("Пожалуйста, введите ваше имя");
      return;
    }
    if (!$.email.trim() || !$.email.includes("@")) {
      alert("Пожалуйста, введите корректный email");
      return;
    }
    if ($.phone.replace(/^\+\d+/, "").length < 10) {
      alert("Пожалуйста, введите корректный номер телефона");
      return;
    }
    console.log("Order submitted:", {
      userInfo: $,
      order: {
        delivery: De,
        receivers: be,
        transmitters: L,
        microphones: fe,
        headphones: { type: F, quantity: P },
        charger: ie,
        audioguides: Fe,
        triggers: Je,
        total: qt
        // bundles // временно отключено
      }
    }), alert("Заказ успешно оформлен!"), g(!1), oe({ name: "", email: "", phone: "+7" });
  }, z = () => {
    try {
      Gt(), g(!0);
    } catch (k) {
      console.error("Ошибка корзины:", k), alert("Произошла ошибка при добавлении в корзину");
    }
  }, Z = () => {
    const k = [];
    return L > 0 && k.push({
      id: "transmitter",
      name: "Передатчик",
      sku: "radiosync-x",
      quantity: L,
      price: ut.sku.transmitter.unitPrice,
      image: "🔴"
    }), be > 0 && k.push({
      id: "receiver",
      name: "Приёмник",
      sku: "radiosync-r",
      quantity: be,
      price: ut.sku.receiver.unitPrice,
      image: "🔵"
    }), fe > 0 && k.push({
      id: "microphone",
      name: "Микрофон",
      sku: "radiosync-m",
      quantity: fe,
      price: ut.sku.microphone.unitPrice,
      image: "🎤"
    }), F && P > 0 && k.push({
      id: "headphones",
      name: `Наушники (${ut.sku.headphones[F].name})`,
      sku: "radiosync-h",
      quantity: P,
      price: ut.sku.headphones[F].unitPrice,
      image: "🎧"
    }), ie && k.push({
      id: "charger",
      name: `Зарядное устройство на ${ie}`,
      sku: "radiosync-c",
      quantity: 1,
      price: ut.sku.charger[ie].unitPrice,
      image: "🔌"
    }), Fe > 0 && k.push({
      id: "audioguide",
      name: "Аудиогид",
      sku: "radiosync-ag",
      quantity: Fe,
      price: ut.sku.receiver.unitPrice,
      image: "🎧"
    }), Je > 0 && k.push({
      id: "trigger",
      name: "Триггер",
      sku: "radiosync-t",
      quantity: Je,
      price: ut.sku.transmitter.unitPrice,
      image: "🔴"
    }), k;
  }, W = (k, I) => {
    if (!(I < 0))
      switch (k) {
        case "transmitter":
          Zt(I);
          break;
        case "receiver":
          Bt(I);
          break;
        case "microphone":
          gt(I);
          break;
        case "headphones":
          mt(I);
          break;
        case "charger":
          break;
        case "audioguide":
          rt(I);
          break;
        case "trigger":
          Ge(I);
          break;
      }
  }, re = (k) => {
    switch (k) {
      case "transmitter":
        Zt(0);
        break;
      case "receiver":
        Bt(0);
        break;
      case "microphone":
        gt(0);
        break;
      case "headphones":
        mt(0), Ne(null);
        break;
      case "charger":
        ce(null);
        break;
      case "audioguide":
        rt(0);
        break;
      case "trigger":
        Ge(0);
        break;
    }
  }, j = [
    {
      id: 0,
      name: "Радиогид",
      component: /* @__PURE__ */ R.jsx(
        x2,
        {
          input_rc: be,
          input_tr: L,
          select_headphones: F,
          qty_headphones: P,
          select_charger: ie,
          setReceivers: Bt,
          setTransmitters: Zt,
          setHeadphonesType: Ne,
          setHeadphonesQty: mt,
          setCharger: ce,
          calculatorConfig: ut
        }
      )
    },
    {
      id: 1,
      name: "Аудиогид",
      component: /* @__PURE__ */ R.jsx(
        E2,
        {
          input_audioguide: Fe,
          input_triggers: Je,
          select_headphones: F,
          qty_headphones: P,
          select_charger: ie,
          setAudioguideQty: rt,
          setTriggersQty: Ge,
          setHeadphonesType: Ne,
          setHeadphonesQty: mt,
          setCharger: ce
        }
      )
    },
    {
      id: 2,
      name: "Юнигид",
      component: /* @__PURE__ */ R.jsx(
        R2,
        {
          input_rc: be,
          input_tr: L,
          select_headphones: F,
          qty_headphones: P,
          select_charger: ie,
          setReceivers: Bt,
          setTransmitters: Zt,
          setHeadphonesType: Ne,
          setHeadphonesQty: mt,
          setCharger: ce,
          calculatorConfig: ut
        }
      )
    },
    {
      id: 3,
      name: "Наушники",
      component: /* @__PURE__ */ R.jsx(
        A2,
        {
          select_headphones: F,
          qty_headphones: P,
          setHeadphonesType: Ne,
          setHeadphonesQty: mt
        }
      )
    }
  ];
  return /* @__PURE__ */ R.jsxs("div", { className: "max-w-5xl mx-auto px-4 md:px-6 py-6 lg:pt-[100px] overflow-x-hidden", children: [
    /* @__PURE__ */ R.jsxs("h1", { className: "hidden mdl:block text-[38px] leading-12 font-semibold mb-6", children: [
      "Соберите свой комплект ",
      /* @__PURE__ */ R.jsx("br", {}),
      " оборудования"
    ] }),
    /* @__PURE__ */ R.jsxs("div", { className: "flex flex-col mdl:flex-row items-start justify-center gap-8 md:gap-14", children: [
      /* @__PURE__ */ R.jsxs("div", { className: "space-y-8 w-full mx-auto", children: [
        /* @__PURE__ */ R.jsxs("h1", { className: "mdl:hidden text-[38px] font-semibold mb-8", children: [
          "Соберите свой комплект ",
          /* @__PURE__ */ R.jsx("br", {}),
          " оборудования"
        ] }),
        /* @__PURE__ */ R.jsxs("div", { children: [
          /* @__PURE__ */ R.jsx("h2", { className: "text-lg font-semibold mb-3", children: "Выберите продукт" }),
          /* @__PURE__ */ R.jsx("nav", { className: "flex items-center justify-start gap-3 flex-wrap", children: j.map((k) => /* @__PURE__ */ R.jsxs(
            "button",
            {
              onClick: () => {
                Q(k.id), Se();
              },
              className: `relative py-2 px-1 font-medium text-sm h-14 w-full xxs:max-w-[199px] rounded-2xl cursor-pointer ${A === k.id ? "bg-custom-gradient text-white" : "bg-[#e5ebee]"}`,
              children: [
                k.name,
                /* @__PURE__ */ R.jsxs("span", { className: `absolute flex items-center justify-center cursor-pointer size-4 ${A !== k.id ? "bg-custom-gradient text-white" : "bg-white text-[#359AD7]"} rounded-full top-2 right-4 z-10 group`, children: [
                  /* @__PURE__ */ R.jsx(D2, { className: "text-lg" }),
                  /* @__PURE__ */ R.jsx("div", { className: "absolute min-w-[165px] w-full invisible opacity-0 group-hover:visible group-hover:opacity-100 bg-custom-gradient text-white text-xs rounded-md px-2 py-1 text-left transition-all duration-200 ease-in-out z-20 -right-5 -top-1 transform translate-x-full", children: "Функции автоматической работы без гида и ручного управления" })
                ] })
              ]
            },
            k.id
          )) }),
          /* @__PURE__ */ R.jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ R.jsxs("div", { className: " mb-3", children: [
              /* @__PURE__ */ R.jsx("h3", { className: "md:text-lg font-semibold mb-1", children: "Доставка" }),
              /* @__PURE__ */ R.jsxs("div", { className: "relative w-full", children: [
                /* @__PURE__ */ R.jsxs(
                  "select",
                  {
                    value: De,
                    onChange: (k) => st(k.target.value),
                    className: "w-full h-10 rounded-lg outline-none border border-black px-3 appearance-none text-xs pr-10",
                    children: [
                      /* @__PURE__ */ R.jsx("option", { value: "moscow", children: "Москва" }),
                      /* @__PURE__ */ R.jsx("option", { value: "rf", children: "Другая РФ" }),
                      /* @__PURE__ */ R.jsx("option", { value: "world", children: "Другая страна" })
                    ]
                  }
                ),
                /* @__PURE__ */ R.jsx("div", { className: "absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none", children: /* @__PURE__ */ R.jsx(Io, {}) })
              ] })
            ] }),
            j[A].component
          ] })
        ] }),
        /* @__PURE__ */ R.jsx("div", { className: "flex gap-3 flex-wrap", children: /* @__PURE__ */ R.jsx("button", { onClick: Se, className: "h-10 px-6 rounded-lg border border-gray-300 hover:bg-gray-50 cursor-pointer", children: "Сбросить" }) }),
        /* @__PURE__ */ R.jsx(
          z2,
          {
            isOpen: K,
            onClose: () => g(!1),
            orderItems: Z(),
            userInfo: $,
            onUserInfoChange: oe,
            onUpdateQuantity: W,
            onRemoveItem: re,
            onSubmit: Yt,
            formatPrice: zt,
            orderTotal: qt
          }
        )
      ] }),
      /* @__PURE__ */ R.jsx("div", { className: "mdl:max-w-[344px] w-full", children: /* @__PURE__ */ R.jsxs("div", { className: "lg:sticky lg:top-6 border border-gray-200 rounded-xl p-6 bg-white shadow-sm", children: [
        /* @__PURE__ */ R.jsx("div", { className: "text-xl font-semibold mb-6 text-gray-800", children: "Ваш комплект" }),
        /* @__PURE__ */ R.jsx("div", { className: "space-y-6 mb-6", children: Z().map((k, I) => /* @__PURE__ */ R.jsxs("div", { className: "text-gray-800", children: [
          /* @__PURE__ */ R.jsxs("div", { className: "text-sm text-gray-600", children: [
            I + 1,
            ". ",
            k.name,
            " x",
            k.quantity,
            ":"
          ] }),
          /* @__PURE__ */ R.jsx("div", { className: "pl-3 text-sm text-gray-600", children: zt(k.price * k.quantity) })
        ] }, k.id)) }),
        /* @__PURE__ */ R.jsxs("div", { className: "space-y-3 mb-6", children: [
          /* @__PURE__ */ R.jsxs("div", { className: "flex justify-between text-sm text-gray-600", children: [
            /* @__PURE__ */ R.jsx("span", { children: "Подытог:" }),
            /* @__PURE__ */ R.jsx("span", { children: zt(lt || 0) })
          ] }),
          Ie > 0 && /* @__PURE__ */ R.jsxs("div", { className: "flex justify-between text-sm text-green-600", children: [
            /* @__PURE__ */ R.jsx("span", { children: "Скидка за объём:" }),
            /* @__PURE__ */ R.jsxs("span", { children: [
              "-",
              zt(Ie)
            ] })
          ] }),
          ol > 0 && /* @__PURE__ */ R.jsxs("div", { className: "flex justify-between text-sm text-gray-600", children: [
            /* @__PURE__ */ R.jsx("span", { children: "Доставка:" }),
            /* @__PURE__ */ R.jsx("span", { children: zt(ol) })
          ] }),
          /* @__PURE__ */ R.jsx("hr", { className: "border-gray-200" })
        ] }),
        /* @__PURE__ */ R.jsx("div", { className: "mb-3", children: /* @__PURE__ */ R.jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ R.jsx("span", { className: "text-lg font-medium text-gray-800", children: "Итого" }),
          /* @__PURE__ */ R.jsx("span", { className: "text-3xl font-bold text-primary-600", children: zt(qt) })
        ] }) }),
        /* @__PURE__ */ R.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ R.jsx(
            "button",
            {
              onClick: () => g(!0),
              className: "w-full h-10 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors",
              children: "ОФОРМИТЬ ЗАКАЗ"
            }
          ),
          /* @__PURE__ */ R.jsx(
            "button",
            {
              onClick: z,
              className: "w-full h-10 rounded-lg border border-gray-300 text-gray-700 text-sm hover:bg-gray-50 transition-colors",
              children: "Заказать"
            }
          )
        ] })
      ] }) })
    ] })
  ] });
};
class J1 extends HTMLElement {
  root = null;
  container = null;
  constructor() {
    super(), this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.init();
  }
  disconnectedCallback() {
    this.root && this.root.unmount();
  }
  async init() {
    try {
      this.container = document.createElement("div"), this.container.id = "calculator-widget-container", this.shadowRoot.appendChild(this.container);
      const Q = document.createElement("style");
      Q.textContent = this.getWidgetStyles(), this.shadowRoot.appendChild(Q), this.root = u2.createRoot(this.container), this.root.render(Sa.createElement(O2));
    } catch (Q) {
      console.error("Calculator widget initialization error:", Q), this.showError();
    }
  }
  getWidgetStyles() {
    return `
      /* Reset styles for widget */
      #calculator-widget-container {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        line-height: 1.5;
        color: #333;
        box-sizing: border-box;
      }

      #calculator-widget-container *,
      #calculator-widget-container *::before,
      #calculator-widget-container *::after {
        box-sizing: border-box;
      }

      /* Widget specific styles */
      #calculator-widget-container {
        max-width: 100%;
        margin: 0 auto;
        padding: 0;
      }

      /* Responsive adjustments */
      @media (max-width: 768px) {
        #calculator-widget-container {
          padding: 0 10px;
        }
      }
    `;
  }
  showError() {
    this.container && (this.container.innerHTML = `
        <div style="
          padding: 20px;
          text-align: center;
          color: #e53e3e;
          border: 1px solid #fed7d7;
          border-radius: 8px;
          background: #fef5f5;
        ">
          <h3>Ошибка загрузки калькулятора</h3>
          <p>Пожалуйста, обновите страницу или попробуйте позже.</p>
        </div>
      `);
  }
}
customElements.get("calculator-widget") || customElements.define("calculator-widget", J1);
window.CalculatorWidget = J1;
typeof window < "u" && (window.CalculatorWidget = window.CalculatorWidget || {});
export {
  J1 as CalculatorWidget
};
