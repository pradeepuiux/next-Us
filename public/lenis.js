! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = t || self).Lenis = e()
}(this, function() {
    function i(t, e) {
        for (var r = 0; r < e.length; r++) {
            var n = e[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, function(t) {
                t = function(t, e) {
                    if ("object" != typeof t || null === t) return t;
                    var r = t[Symbol.toPrimitive];
                    if (void 0 === r) return ("string" === e ? String : Number)(t);
                    e = r.call(t, e || "default");
                    if ("object" != typeof e) return e;
                    throw new TypeError("@@toPrimitive must return a primitive value.")
                }(t, "string");
                return "symbol" == typeof t ? t : String(t)
            }(n.key), n)
        }
    }

    function p(t, e, r) {
        return Math.max(t, Math.min(e, r))
    }

    function v() {
        return {
            events: {},
            emit: function(t) {
                for (var e = this.events[t] || [], r = 0, n = e.length; r < n; r++) e[r].apply(e, [].slice.call(arguments, 1))
            },
            on: function(e, r) {
                var t, n = this;
                return null != (t = this.events[e]) && t.push(r) || (this.events[e] = [r]),
                    function() {
                        var t;
                        n.events[e] = null == (t = n.events[e]) ? void 0 : t.filter(function(t) {
                            return r !== t
                        })
                    }
            }
        }
    }
    var y = function() {
            function t() {}
            var e = t.prototype;
            return e.advance = function(t) {
                var e, r, n, i, o;
                this.isRunning && (e = !1, this.lerp ? (this.value = (n = this.value, i = this.to, (1 - (o = this.lerp)) * n + o * i), Math.round(this.value) === this.to && (this.value = this.to, e = !0)) : (this.currentTime += t, r = (e = 1 <= (r = p(0, this.currentTime / this.duration, 1))) ? 1 : this.easing(r), this.value = this.from + (this.to - this.from) * r), null != (r = this.onUpdate) && r.call(this, this.value, {
                    completed: e
                }), e && this.stop())
            }, e.stop = function() {
                this.isRunning = !1
            }, e.fromTo = function(t, e, r) {
                var n = r.lerp,
                    i = void 0 === n ? .1 : n,
                    o = r.duration,
                    n = void 0 === o ? 1 : o,
                    o = r.easing,
                    o = void 0 === o ? function(t) {
                        return t
                    } : o,
                    r = r.onUpdate;
                this.from = this.value = t, this.to = e, this.lerp = i, this.duration = n, this.easing = o, this.currentTime = 0, this.isRunning = !0, this.onUpdate = r
            }, t
        }(),
        w = function() {
            function t(t) {
                var r = this;
                this.onResize = function(t) {
                    var e = t[0];
                    e && (e = (t = e.contentRect).width, t = t.height, r.width = e, r.height = t)
                }, this.onWindowResize = function() {
                    r.width = window.innerWidth, r.height = window.innerHeight
                }, (this.element = t) === window ? (window.addEventListener("resize", this.onWindowResize), this.onWindowResize()) : (this.width = this.element.offsetWidth, this.height = this.element.offsetHeight, this.resizeObserver = new ResizeObserver(this.onResize), this.resizeObserver.observe(this.element))
            }
            return t.prototype.destroy = function() {
                window.removeEventListener("resize", this.onWindowResize), this.resizeObserver.disconnect()
            }, t
        }(),
        x = function() {
            function t(t, e) {
                var o = this,
                    r = e.wheelMultiplier,
                    n = void 0 === r ? 1 : r,
                    r = e.touchMultiplier,
                    r = void 0 === r ? 2 : r,
                    e = e.normalizeWheel,
                    e = void 0 !== e && e;
                this.onTouchStart = function(t) {
                    var e = t.targetTouches ? t.targetTouches[0] : t,
                        t = e.pageX,
                        e = e.pageY;
                    o.touchStart.x = t, o.touchStart.y = e
                }, this.onTouchMove = function(t) {
                    var e = t.targetTouches ? t.targetTouches[0] : t,
                        r = e.pageX,
                        n = e.pageY,
                        i = -(r - o.touchStart.x) * o.touchMultiplier,
                        e = -(n - o.touchStart.y) * o.touchMultiplier;
                    o.touchStart.x = r, o.touchStart.y = n, o.emitter.emit("scroll", {
                        type: "touch",
                        deltaX: i,
                        deltaY: e,
                        event: t
                    })
                }, this.onWheel = function(t) {
                    var e = t.deltaX,
                        r = t.deltaY;
                    o.normalizeWheel && (e = p(-100, e, 100), r = p(-100, r, 100)), e *= o.wheelMultiplier, r *= o.wheelMultiplier, o.emitter.emit("scroll", {
                        type: "wheel",
                        deltaX: e,
                        deltaY: r,
                        event: t
                    })
                }, this.element = t, this.wheelMultiplier = n, this.touchMultiplier = r, this.normalizeWheel = e, this.touchStart = {
                    x: null,
                    y: null
                }, this.emitter = v(), this.element.addEventListener("wheel", this.onWheel, {
                    passive: !1
                }), this.element.addEventListener("touchstart", this.onTouchStart, {
                    passive: !1
                }), this.element.addEventListener("touchmove", this.onTouchMove, {
                    passive: !1
                })
            }
            var e = t.prototype;
            return e.on = function(t, e) {
                return this.emitter.on(t, e)
            }, e.destroy = function() {
                this.emitter.events = {}, this.element.removeEventListener("wheel", this.onWheel, {
                    passive: !1
                }), this.element.removeEventListener("touchstart", this.onTouchStart, {
                    passive: !1
                }), this.element.removeEventListener("touchmove", this.onTouchMove, {
                    passive: !1
                })
            }, t
        }();
    return function() {
        function t(t) {
            var i = this,
                e = void 0 === t ? {} : t,
                r = e.direction,
                n = e.gestureDirection,
                o = e.mouseMultiplier,
                s = e.smooth,
                a = e.wrapper,
                l = void 0 === a ? window : a,
                u = e.content,
                c = void 0 === u ? document.documentElement : u,
                h = e.smoothWheel,
                f = void 0 === h ? null == s || s : h,
                p = e.smoothTouch,
                d = void 0 !== p && p,
                g = e.duration,
                m = e.easing,
                _ = void 0 === m ? function(t) {
                    return Math.min(1, 1.001 - Math.pow(2, -10 * t))
                } : m,
                t = e.lerp,
                a = void 0 === t ? g ? null : .1 : t,
                u = e.infinite,
                h = void 0 !== u && u,
                p = e.orientation,
                m = void 0 === p ? null != r ? r : "vertical" : p,
                t = e.gestureOrientation,
                u = void 0 === t ? null != n ? n : "vertical" : t,
                p = e.touchMultiplier,
                t = void 0 === p ? 2 : p,
                p = e.wheelMultiplier,
                p = void 0 === p ? null != o ? o : 1 : p,
                e = e.normalizeWheel,
                e = void 0 === e || e;
            this.onVirtualScroll = function(t) {
                var e = t.type,
                    r = t.deltaX,
                    n = t.deltaY,
                    t = t.event;
                if (!t.ctrlKey && !("vertical" === i.options.gestureOrientation && 0 === n || "horizontal" === i.options.gestureOrientation && 0 === r || t.composedPath().find(function(t) {
                        return null == t || null == t.hasAttribute ? void 0 : t.hasAttribute("data-lenis-prevent")
                    })))
                    if (i.isStopped || i.isLocked) t.preventDefault();
                    else {
                        if (i.isSmooth = i.options.smoothTouch && "touch" === e || i.options.smoothWheel && "wheel" === e, !i.isSmooth) return i.isScrolling = !1, void i.animate.stop();
                        t.preventDefault();
                        t = n;
                        "both" === i.options.gestureOrientation ? t = Math.abs(n) > Math.abs(r) ? n : r : "horizontal" === i.options.gestureOrientation && (t = r), i.scrollTo(i.targetScroll + t, {
                            programmatic: !1
                        })
                    }
            }, this.onScroll = function() {
                var t;
                i.isScrolling || (t = i.animatedScroll, i.animatedScroll = i.targetScroll = i.actualScroll, i.velocity = 0, i.direction = Math.sign(i.animatedScroll - t), i.emit())
            }, r && console.warn("Lenis: `direction` option is deprecated, use `orientation` instead"), n && console.warn("Lenis: `gestureDirection` option is deprecated, use `gestureOrientation` instead"), o && console.warn("Lenis: `mouseMultiplier` option is deprecated, use `wheelMultiplier` instead"), s && console.warn("Lenis: `smooth` option is deprecated, use `smoothWheel` instead"), window.lenisVersion = "1.0.4", l !== document.documentElement && l !== document.body || (l = window), this.options = {
                wrapper: l,
                content: c,
                smoothWheel: f,
                smoothTouch: d,
                duration: g,
                easing: _,
                lerp: a,
                infinite: h,
                gestureOrientation: u,
                orientation: m,
                touchMultiplier: t,
                wheelMultiplier: p,
                normalizeWheel: e
            }, this.wrapper = new w(l), this.content = new w(c), this.rootElement.classList.add("lenis"), this.velocity = 0, this.isStopped = !1, this.isSmooth = f || d, this.isScrolling = !1, this.targetScroll = this.animatedScroll = this.actualScroll, this.animate = new y, this.emitter = v(), this.wrapper.element.addEventListener("scroll", this.onScroll, {
                passive: !1
            }), this.virtualScroll = new x(l, {
                touchMultiplier: t,
                wheelMultiplier: p,
                normalizeWheel: e
            }), this.virtualScroll.on("scroll", this.onVirtualScroll)
        }
        var e, r, n = t.prototype;
        return n.destroy = function() {
            this.emitter.events = {}, this.wrapper.element.removeEventListener("scroll", this.onScroll, {
                passive: !1
            }), this.virtualScroll.destroy()
        }, n.on = function(t, e) {
            return this.emitter.on(t, e)
        }, n.off = function(t, e) {
            this.emitter.events[t] = null == (t = this.emitter.events[t]) ? void 0 : t.filter(function(t) {
                return e !== t
            })
        }, n.setScroll = function(t) {
            this.isHorizontal ? this.rootElement.scrollLeft = t : this.rootElement.scrollTop = t
        }, n.emit = function() {
            this.emitter.emit("scroll", this)
        }, n.reset = function() {
            this.isLocked = !1, this.isScrolling = !1, this.velocity = 0
        }, n.start = function() {
            this.isStopped = !1, this.reset()
        }, n.stop = function() {
            this.isStopped = !0, this.animate.stop(), this.reset()
        }, n.raf = function(t) {
            var e = t - (this.time || t);
            this.time = t, this.animate.advance(.001 * e)
        }, n.scrollTo = function(t, e) {
            var r, n = this,
                i = void 0 === e ? {} : e,
                o = i.offset,
                s = void 0 === o ? 0 : o,
                a = i.immediate,
                l = void 0 !== a && a,
                u = i.lock,
                c = void 0 !== u && u,
                e = i.duration,
                o = void 0 === e ? this.options.duration : e,
                a = i.easing,
                u = void 0 === a ? this.options.easing : a,
                e = i.lerp,
                a = void 0 === e ? !o && this.options.lerp : e,
                e = i.onComplete,
                h = void 0 === e ? null : e,
                e = i.force,
                e = void 0 !== e && e,
                i = i.programmatic,
                f = void 0 === i || i;
            if ((!this.isStopped || e) && (["top", "left", "start"].includes(t) ? t = 0 : ["bottom", "right", "end"].includes(t) ? t = this.limit : ("string" == typeof t ? r = document.querySelector(t) : null != t && t.nodeType && (r = t), r && (this.wrapper.element !== window && (e = this.wrapper.element.getBoundingClientRect(), s -= this.isHorizontal ? e.left : e.top), r = r.getBoundingClientRect(), t = (this.isHorizontal ? r.left : r.top) + this.animatedScroll)), "number" == typeof t)) {
                if (t += s, t = Math.round(t), this.options.infinite ? f && (this.targetScroll = this.animatedScroll = this.scroll) : t = p(0, t, this.limit), l) return this.animatedScroll = this.targetScroll = t, this.setScroll(this.scroll), this.animate.stop(), this.reset(), this.emit(), void(null != h && h());
                f || (this.targetScroll = t), this.animate.fromTo(this.animatedScroll, t, {
                    duration: o,
                    easing: u,
                    lerp: a,
                    onUpdate: function(t, e) {
                        e = e.completed;
                        c && (n.isLocked = !0), n.isScrolling = !0, n.velocity = t - n.animatedScroll, n.direction = Math.sign(n.velocity), n.animatedScroll = t, n.setScroll(n.scroll), f && (n.targetScroll = t), e && (c && (n.isLocked = !1), requestAnimationFrame(function() {
                            n.isScrolling = !1
                        }), n.velocity = 0, null != h && h()), n.emit()
                    }
                })
            }
        }, e = t, (n = [{
            key: "rootElement",
            get: function() {
                return (this.wrapper.element === window ? this.content : this.wrapper).element
            }
        }, {
            key: "limit",
            get: function() {
                return Math.round(this.isHorizontal ? this.content.width - this.wrapper.width : this.content.height - this.wrapper.height)
            }
        }, {
            key: "isHorizontal",
            get: function() {
                return "horizontal" === this.options.orientation
            }
        }, {
            key: "actualScroll",
            get: function() {
                return this.isHorizontal ? this.rootElement.scrollLeft : this.rootElement.scrollTop
            }
        }, {
            key: "scroll",
            get: function() {
                return this.options.infinite ? (t = this.animatedScroll, e = this.limit, t %= e, (0 < e && t < 0 || e < 0 && 0 < t) && (t += e), t) : this.animatedScroll;
                var t, e
            }
        }, {
            key: "progress",
            get: function() {
                return this.scroll / this.limit
            }
        }, {
            key: "isSmooth",
            get: function() {
                return this.__isSmooth
            },
            set: function(t) {
                this.__isSmooth !== t && (this.rootElement.classList.toggle("lenis-smooth", t), this.__isSmooth = t)
            }
        }, {
            key: "isScrolling",
            get: function() {
                return this.__isScrolling
            },
            set: function(t) {
                this.__isScrolling !== t && (this.rootElement.classList.toggle("lenis-scrolling", t), this.__isScrolling = t)
            }
        }, {
            key: "isStopped",
            get: function() {
                return this.__isStopped
            },
            set: function(t) {
                this.__isStopped !== t && (this.rootElement.classList.toggle("lenis-stopped", t), this.__isStopped = t)
            }
        }]) && i(e.prototype, n), r && i(e, r), Object.defineProperty(e, "prototype", {
            writable: !1
        }), t
    }()
}),
function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = t || self).window = t.window || {})
}(this, function(t) {
    "use strict";

    function e(t, e) {
        for (var r = 0; r < e.length; r++) {
            var n = e[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
        }
    }

    function r() {
        return Yt || "undefined" != typeof window && (Yt = window.gsap) && Yt.registerPlugin && Yt
    }

    function Rt(t, e) {
        return ~Zt.indexOf(t) && Zt[Zt.indexOf(t) + 1][e]
    }

    function kt(t) {
        return !!~n.indexOf(t)
    }

    function Mt(t, e, r, n, i) {
        return t.addEventListener(e, r, {
            passive: !n,
            capture: !!i
        })
    }

    function Ot(t, e, r, n) {
        return t.removeEventListener(e, r, !!n)
    }

    function Pt() {
        return qt && qt.isPressed || Qt.cache++
    }

    function s(r, n) {
        function i(t) {
            var e;
            return t || 0 === t ? (o && (Xt.history.scrollRestoration = "manual"), e = qt && qt.isPressed, t = i.v = Math.round(t) || (qt && qt.iOS ? 1 : 0), r(t), i.cacheID = Qt.cache, e && a("ss", t)) : (n || Qt.cache !== i.cacheID || a("ref")) && (i.cacheID = Qt.cache, i.v = r()), i.v + i.offset
        }
        return i.offset = 0, r && i
    }

    function Dt(t) {
        return Yt.utils.toArray(t)[0] || ("string" == typeof t && !1 !== Yt.config().nullTargetWarn ? console.warn("Element not found:", t) : null)
    }

    function zt(e, t) {
        var r = t.s,
            n = t.sc;
        kt(e) && (e = It.scrollingElement || Wt);
        var i = Qt.indexOf(e),
            o = n === te.sc ? 1 : 2;
        ~i || (i = Qt.push(e) - 1), Qt[i + o] || e.addEventListener("scroll", Pt);
        t = Qt[i + o], n = t || (Qt[i + o] = s(Rt(e, r), !0) || (kt(e) ? n : s(function(t) {
            return arguments.length ? e[r] = t : e[r]
        })));
        return n.target = e, t || (n.smooth = "smooth" === Yt.getProperty(e, "scrollBehavior")), n
    }

    function Et(t, e, i) {
        function o(t, e) {
            var r = $t();
            e || n < r - l ? (a = s, s = t, u = l, l = r) : i ? s += t : s = a + (t - a) / (r - u) * (l - u)
        }
        var s = t,
            a = t,
            l = $t(),
            u = l,
            n = e || 50,
            c = Math.max(500, 3 * n);
        return {
            update: o,
            reset: function() {
                a = s = i ? 0 : s, u = l = 0
            },
            getVelocity: function(t) {
                var e = u,
                    r = a,
                    n = $t();
                return !t && 0 !== t || t === s || o(t), l === u || c < n - u ? 0 : (s + (i ? r : -r)) / ((i ? n : l) - e) * 1e3
            }
        }
    }

    function Ct(t, e) {
        return e && !t._gsapAllow && t.preventDefault(), t.changedTouches ? t.changedTouches[0] : t
    }

    function At(t) {
        var e = Math.max.apply(Math, t),
            t = Math.min.apply(Math, t);
        return Math.abs(e) >= Math.abs(t) ? e : t
    }

    function Lt() {
        var t, r, e;
        (jt = Yt.core.globals().ScrollTrigger) && jt.core && (t = jt.core, r = t.bridge || {}, e = t._scrollers, t = t._proxies, e.push.apply(e, Qt), t.push.apply(t, Zt), Qt = e, Zt = t, a = function(t, e) {
            return r[t](e)
        })
    }

    function Ft(t) {
        return (Yt = t || r()) && "undefined" != typeof document && document.body && (Xt = window, Wt = (It = document).documentElement, Nt = It.body, n = [Xt, It, Wt, Nt], Yt.utils.clamp, Gt = Yt.core.context || function() {}, Ht = "onpointerenter" in Nt ? "pointer" : "mouse", Ut = E.isTouch = Xt.matchMedia && Xt.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in Xt || 0 < navigator.maxTouchPoints || 0 < navigator.msMaxTouchPoints ? 2 : 0, Vt = E.eventTypes = ("ontouchstart" in Wt ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in Wt ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
            return o = 0
        }, 500), Lt(), Bt = 1), Bt
    }
    var Yt, Bt, Xt, It, Wt, Nt, Ut, Ht, jt, n, qt, Vt, Gt, o = 1,
        Kt = [],
        Qt = [],
        Zt = [],
        $t = Date.now,
        a = function(t, e) {
            return e
        },
        i = "scrollLeft",
        l = "scrollTop",
        Jt = {
            s: i,
            p: "left",
            p2: "Left",
            os: "right",
            os2: "Right",
            d: "width",
            d2: "Width",
            a: "x",
            sc: s(function(t) {
                return arguments.length ? Xt.scrollTo(t, te.sc()) : Xt.pageXOffset || It[i] || Wt[i] || Nt[i] || 0
            })
        },
        te = {
            s: l,
            p: "top",
            p2: "Top",
            os: "bottom",
            os2: "Bottom",
            d: "height",
            d2: "Height",
            a: "y",
            op: Jt,
            sc: s(function(t) {
                return arguments.length ? Xt.scrollTo(Jt.sc(), t) : Xt.pageYOffset || It[l] || Wt[l] || Nt[l] || 0
            })
        };
    Jt.op = te, Qt.cache = 0;
    var u, c, h, E = (f.prototype.init = function(t) {
        Bt || Ft(Yt) || console.warn("Please gsap.registerPlugin(Observer)"), jt || Lt();
        var i = t.tolerance,
            o = t.dragMinimum,
            e = t.type,
            s = t.target,
            r = t.lineHeight,
            n = t.debounce,
            a = t.preventDefault,
            l = t.onStop,
            u = t.onStopDelay,
            c = t.ignore,
            h = t.wheelSpeed,
            f = t.event,
            p = t.onDragStart,
            d = t.onDragEnd,
            g = t.onDrag,
            m = t.onPress,
            _ = t.onRelease,
            v = t.onRight,
            y = t.onLeft,
            w = t.onUp,
            x = t.onDown,
            b = t.onChangeX,
            T = t.onChangeY,
            S = t.onChange,
            k = t.onToggleX,
            M = t.onToggleY,
            O = t.onHover,
            P = t.onHoverEnd,
            E = t.onMove,
            C = t.ignoreCheck,
            A = t.isNormalizer,
            R = t.onGestureStart,
            D = t.onGestureEnd,
            z = t.onWheel,
            L = t.onEnable,
            F = t.onDisable,
            Y = t.onClick,
            B = t.scrollSpeed,
            X = t.capture,
            I = t.allowClicks,
            W = t.lockAxis,
            N = t.onLockAxis;

        function U() {
            return xt = $t()
        }

        function H(t, e) {
            return (ut.event = t) && c && ~c.indexOf(t.target) || e && mt && "touch" !== t.pointerType || C && C(t, e)
        }

        function j() {
            var t = ut.deltaX = At(yt),
                e = ut.deltaY = At(wt),
                r = Math.abs(t) >= i,
                n = Math.abs(e) >= i;
            S && (r || n) && S(ut, t, e, yt, wt), r && (v && 0 < ut.deltaX && v(ut), y && ut.deltaX < 0 && y(ut), b && b(ut), k && ut.deltaX < 0 != ct < 0 && k(ut), ct = ut.deltaX, yt[0] = yt[1] = yt[2] = 0), n && (x && 0 < ut.deltaY && x(ut), w && ut.deltaY < 0 && w(ut), T && T(ut), M && ut.deltaY < 0 != ht < 0 && M(ut), ht = ut.deltaY, wt[0] = wt[1] = wt[2] = 0), (ot || it) && (E && E(ut), it && (g(ut), it = !1), ot = !1), at && !(at = !1) && N && N(ut), st && (z(ut), st = !1), nt = 0
        }

        function q(t, e, r) {
            yt[r] += t, wt[r] += e, ut._vx.update(t), ut._vy.update(e), n ? nt = nt || requestAnimationFrame(j) : j()
        }

        function V(t, e) {
            W && !lt && (ut.axis = lt = Math.abs(t) > Math.abs(e) ? "x" : "y", at = !0), "y" !== lt && (yt[2] += t, ut._vx.update(t, !0)), "x" !== lt && (wt[2] += e, ut._vy.update(e, !0)), n ? nt = nt || requestAnimationFrame(j) : j()
        }

        function G(t) {
            var e, r, n, i;
            H(t, 1) || (e = (t = Ct(t, a)).clientX, r = t.clientY, n = e - ut.x, i = r - ut.y, t = ut.isDragging, ut.x = e, ut.y = r, (t || Math.abs(ut.startX - e) >= o || Math.abs(ut.startY - r) >= o) && (g && (it = !0), t || (ut.isDragging = !0), V(n, i), t || p && p(ut)))
        }

        function K(t) {
            return t.touches && 1 < t.touches.length && (ut.isGesturing = !0) && R(t, ut.isDragging)
        }

        function Q() {
            return ut.isGesturing = !1, D(ut)
        }

        function Z(t) {
            var e;
            H(t) || (e = ft(), t = pt(), q((e - dt) * B, (t - gt) * B, 1), dt = e, gt = t, l && St.restart(!0))
        }

        function $(t) {
            var e;
            H(t) || (t = Ct(t, a), z && (st = !0), e = (1 === t.deltaMode ? r : 2 === t.deltaMode ? Xt.innerHeight : 1) * h, q(t.deltaX * e, t.deltaY * e, 0), l && !A && St.restart(!0))
        }

        function J(t) {
            var e, r, n;
            H(t) || (e = t.clientX, r = t.clientY, n = e - ut.x, t = r - ut.y, ut.x = e, ut.y = r, ot = !0, (n || t) && V(n, t))
        }

        function tt(t) {
            ut.event = t, O(ut)
        }

        function et(t) {
            ut.event = t, P(ut)
        }

        function rt(t) {
            return H(t) || Ct(t, a) && Y(ut)
        }
        this.target = s = Dt(s) || Wt, this.vars = t;
        var nt, it, ot, st, at, lt, c = c && Yt.utils.toArray(c),
            i = i || 1e-9,
            o = o || 0,
            h = h || 1,
            B = B || 1,
            e = e || "wheel,touch,pointer",
            n = !1 !== n,
            r = r || parseFloat(Xt.getComputedStyle(Nt).lineHeight) || 22,
            ut = this,
            ct = 0,
            ht = 0,
            ft = zt(s, Jt),
            pt = zt(s, te),
            dt = ft(),
            gt = pt(),
            mt = ~e.indexOf("touch") && !~e.indexOf("pointer") && "pointerdown" === Vt[0],
            _t = kt(s),
            vt = s.ownerDocument || It,
            yt = [0, 0, 0],
            wt = [0, 0, 0],
            xt = 0,
            bt = ut.onPress = function(t) {
                H(t, 1) || t && t.button || (ut.axis = lt = null, St.pause(), ut.isPressed = !0, t = Ct(t), ct = ht = 0, ut.startX = ut.x = t.clientX, ut.startY = ut.y = t.clientY, ut._vx.reset(), ut._vy.reset(), Mt(A ? s : vt, Vt[1], G, a, !0), ut.deltaX = ut.deltaY = 0, m && m(ut))
            },
            Tt = ut.onRelease = function(e) {
                var t, r, n;
                H(e, 1) || (Ot(A ? s : vt, Vt[1], G, !0), t = !isNaN(ut.y - ut.startY), r = ut.isDragging && (3 < Math.abs(ut.x - ut.startX) || 3 < Math.abs(ut.y - ut.startY)), n = Ct(e), !r && t && (ut._vx.reset(), ut._vy.reset(), a && I && Yt.delayedCall(.08, function() {
                    var t;
                    300 < $t() - xt && !e.defaultPrevented && (e.target.click ? e.target.click() : vt.createEvent && ((t = vt.createEvent("MouseEvents")).initMouseEvent("click", !0, !0, Xt, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null), e.target.dispatchEvent(t)))
                })), ut.isDragging = ut.isGesturing = ut.isPressed = !1, l && !A && St.restart(!0), d && r && d(ut), _ && _(ut, r))
            },
            St = ut._dc = Yt.delayedCall(u || .25, function() {
                ut._vx.reset(), ut._vy.reset(), St.pause(), l && l(ut)
            }).pause();
        ut.deltaX = ut.deltaY = 0, ut._vx = Et(0, 50, !0), ut._vy = Et(0, 50, !0), ut.scrollX = ft, ut.scrollY = pt, ut.isDragging = ut.isGesturing = ut.isPressed = !1, Gt(this), ut.enable = function(t) {
            return ut.isEnabled || (Mt(_t ? vt : s, "scroll", Pt), 0 <= e.indexOf("scroll") && Mt(_t ? vt : s, "scroll", Z, a, X), 0 <= e.indexOf("wheel") && Mt(s, "wheel", $, a, X), (0 <= e.indexOf("touch") && Ut || 0 <= e.indexOf("pointer")) && (Mt(s, Vt[0], bt, a, X), Mt(vt, Vt[2], Tt), Mt(vt, Vt[3], Tt), I && Mt(s, "click", U, !1, !0), Y && Mt(s, "click", rt), R && Mt(vt, "gesturestart", K), D && Mt(vt, "gestureend", Q), O && Mt(s, Ht + "enter", tt), P && Mt(s, Ht + "leave", et), E && Mt(s, Ht + "move", J)), ut.isEnabled = !0, t && t.type && bt(t), L && L(ut)), ut
        }, ut.disable = function() {
            ut.isEnabled && (Kt.filter(function(t) {
                return t !== ut && kt(t.target)
            }).length || Ot(_t ? vt : s, "scroll", Pt), ut.isPressed && (ut._vx.reset(), ut._vy.reset(), Ot(A ? s : vt, Vt[1], G, !0)), Ot(_t ? vt : s, "scroll", Z, X), Ot(s, "wheel", $, X), Ot(s, Vt[0], bt, X), Ot(vt, Vt[2], Tt), Ot(vt, Vt[3], Tt), Ot(s, "click", U, !0), Ot(s, "click", rt), Ot(vt, "gesturestart", K), Ot(vt, "gestureend", Q), Ot(s, Ht + "enter", tt), Ot(s, Ht + "leave", et), Ot(s, Ht + "move", J), ut.isEnabled = ut.isPressed = ut.isDragging = !1, F && F(ut))
        }, ut.kill = ut.revert = function() {
            ut.disable();
            var t = Kt.indexOf(ut);
            0 <= t && Kt.splice(t, 1), qt === ut && (qt = 0)
        }, Kt.push(ut), A && kt(s) && (qt = ut), ut.enable(f)
    }, u = f, (c = [{
        key: "velocityX",
        get: function() {
            return this._vx.getVelocity()
        }
    }, {
        key: "velocityY",
        get: function() {
            return this._vy.getVelocity()
        }
    }]) && e(u.prototype, c), h && e(u, h), f);

    function f(t) {
        this.init(t)
    }

    function p() {
        return Xe = 1
    }

    function d() {
        return Xe = 0
    }

    function ee(t) {
        return t
    }

    function re(t) {
        return Math.round(1e5 * t) / 1e5 || 0
    }

    function g() {
        return "undefined" != typeof window
    }

    function m() {
        return Ce || g() && (Ce = window.gsap) && Ce.registerPlugin && Ce
    }

    function ne(t) {
        return !!~P.indexOf(t)
    }

    function ie(t) {
        return Rt(t, "getBoundingClientRect") || (ne(t) ? function() {
            return _r.width = Ae.innerWidth, _r.height = Ae.innerHeight, _r
        } : function() {
            return ur(t)
        })
    }

    function oe(t, e) {
        e.s;
        var r, n = e.d2,
            i = e.d,
            e = e.a;
        return Math.max(0, (r = "scroll" + n) && (e = Rt(t, r)) ? e() - ie(t)()[i] : ne(t) ? (De[r] || ze[r]) - (Ae["inner" + n] || De["client" + n] || ze["client" + n]) : t[r] - t["offset" + n])
    }

    function _(t, e) {
        for (var r = 0; r < F.length; r += 3) e && !~e.indexOf(F[r + 1]) || t(F[r], F[r + 1], F[r + 2])
    }

    function se(t) {
        return "string" == typeof t
    }

    function ae(t) {
        return "function" == typeof t
    }

    function le(t) {
        return "number" == typeof t
    }

    function ue(t) {
        return "object" == typeof t
    }

    function ce(t, e, r) {
        return t && t.progress(e ? 0 : 1) && r && t.pause()
    }

    function he(t, e) {
        !t.enabled || (e = e(t)) && e.totalTime && (t.callbackAnimation = e)
    }

    function fe(t) {
        return Ae.getComputedStyle(t)
    }

    function pe(t, e) {
        for (var r in e) r in t || (t[r] = e[r]);
        return t
    }

    function de(t, e) {
        e = e.d2;
        return t["offset" + e] || t["client" + e] || 0
    }

    function ge(t) {
        var e, r = [],
            n = t.labels,
            i = t.duration();
        for (e in n) r.push(n[e] / i);
        return r
    }

    function me(i) {
        var o = Ce.utils.snap(i),
            s = Array.isArray(i) && i.slice(0).sort(function(t, e) {
                return t - e
            });
        return s ? function(t, e, r) {
            var n;
            if (void 0 === r && (r = .001), !e) return o(t);
            if (0 < e) {
                for (t -= r, n = 0; n < s.length; n++)
                    if (s[n] >= t) return s[n];
                return s[n - 1]
            }
            for (n = s.length, t += r; n--;)
                if (s[n] <= t) return s[n];
            return s[0]
        } : function(t, e, r) {
            void 0 === r && (r = .001);
            var n = o(t);
            return !e || Math.abs(n - t) < r || n - t < 0 == e < 0 ? n : o(e < 0 ? t - i : t + i)
        }
    }

    function v(e, r, t, n) {
        return t.split(",").forEach(function(t) {
            return e(r, t, n)
        })
    }

    function _e(t, e, r, n, i) {
        return t.addEventListener(e, r, {
            passive: !n,
            capture: !!i
        })
    }

    function ve(t, e, r, n) {
        return t.removeEventListener(e, r, !!n)
    }

    function y(t, e, r) {
        (r = r && r.wheelHandler) && (t(e, "wheel", r), t(e, "touchmove", r))
    }

    function ye(t, e) {
        var r, n;
        return se(t) && (n = ~(r = t.indexOf("=")) ? (t.charAt(r - 1) + 1) * parseFloat(t.substr(r + 1)) : 0, ~r && (t.indexOf("%") > r && (n *= e / 100), t = t.substr(0, r - 1)), t = n + (t in G ? G[t] * e : ~t.indexOf("%") ? parseFloat(t) * e / 100 : parseFloat(t) || 0)), t
    }

    function we(t, e, r, n, i, o, s, a) {
        var l = i.startColor,
            u = i.endColor,
            c = i.fontSize,
            h = i.indent,
            f = i.fontWeight,
            p = Re.createElement("div"),
            d = ne(r) || "fixed" === Rt(r, "pinType"),
            g = -1 !== t.indexOf("scroller"),
            i = d ? ze : r,
            r = -1 !== t.indexOf("start"),
            u = r ? l : u,
            f = "border-color:" + u + ";font-size:" + c + ";color:" + u + ";font-weight:" + f + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
        return f += "position:" + ((g || a) && d ? "fixed;" : "absolute;"), !g && !a && d || (f += (n === te ? q : V) + ":" + (o + parseFloat(h)) + "px;"), s && (f += "box-sizing:border-box;text-align:left;width:" + s.offsetWidth + "px;"), p._isStart = r, p.setAttribute("class", "gsap-marker-" + t + (e ? " marker-" + e : "")), p.style.cssText = f, p.innerText = e || 0 === e ? t + "-" + e : t, i.children[0] ? i.insertBefore(p, i.children[0]) : i.appendChild(p), p._offset = p["offset" + n.op.d2], k(p, 0, n, r), p
    }

    function w() {
        return 34 < Ke() - Qe && (H = H || requestAnimationFrame(J))
    }

    function xe() {
        B && B.isPressed && !(B.startX > ze.clientWidth) || (Qt.cache++, B ? H = H || requestAnimationFrame(J) : J(), Qe || M("scrollStart"), Qe = Ke())
    }

    function x() {
        W = Ae.innerWidth, I = Ae.innerHeight
    }

    function be() {
        Qt.cache++, Be || Y || Re.fullscreenElement || Re.webkitFullscreenElement || X && W === Ae.innerWidth && !(Math.abs(Ae.innerHeight - I) > .25 * Ae.innerHeight) || A.restart(!0)
    }

    function Te() {
        return ve(it, "scrollEnd", Te) || gr(!0)
    }

    function b(t) {
        for (var e = 0; e < Z.length; e += 5)(!t || Z[e + 4] && Z[e + 4].query === t) && (Z[e].style.cssText = Z[e + 1], Z[e].getBBox && Z[e].setAttribute("transform", Z[e + 2] || ""), Z[e + 3].uncache = 1)
    }

    function T(t, e) {
        var r;
        for (Ie = 0; Ie < fr.length; Ie++) !(r = fr[Ie]) || e && r._ctx !== e || (t ? r.kill(1) : r.revert(!0, !0));
        e && b(e), e || M("revert")
    }

    function S(t, e) {
        Qt.cache++, !e && je || Qt.forEach(function(t) {
            return ae(t) && t.cacheID++ && (t.rec = 0)
        }), se(t) && (Ae.history.scrollRestoration = U = t)
    }

    function Se(t, e, r, n) {
        if (!t._gsap.swappedIn) {
            for (var i, o = tt.length, s = e.style, a = t.style; o--;) s[i = tt[o]] = r[i];
            s.position = "absolute" === r.position ? "absolute" : "relative", "inline" === r.display && (s.display = "inline-block"), a[V] = a[q] = "auto", s.flexBasis = r.flexBasis || "auto", s.overflow = "visible", s.boxSizing = "border-box", s[Je] = de(t, Jt) + lr, s[tr] = de(t, te) + lr, s[or] = a[sr] = a.top = a.left = "0", Ee(n), a[Je] = a.maxWidth = r[Je], a[tr] = a.maxHeight = r[tr], a[or] = r[or], t.parentNode !== e && (t.parentNode.insertBefore(e, t), e.appendChild(t)), t._gsap.swappedIn = !0
        }
    }

    function ke(t) {
        for (var e = et.length, r = t.style, n = [], i = 0; i < e; i++) n.push(et[i], r[et[i]]);
        return n.t = t, n
    }

    function Me(t, e, r, n, i, o, s, a, l, u, c, h, f) {
        se(t = ae(t) ? t(a) : t) && "max" === t.substr(0, 3) && (t = h + ("=" === t.charAt(4) ? ye("0" + t.substr(3), r) : 0));
        var p, d, g, m, _ = f ? f.time() : 0;
        return f && f.seek(0), le(t) ? (f && (t = Ce.utils.mapRange(f.scrollTrigger.start, f.scrollTrigger.end, 0, h, t)), s && k(s, r, n, !0)) : (ae(e) && (e = e(a)), g = (t || "0").split(" "), d = Dt(e) || ze, (e = ur(d) || {}) && (e.left || e.top) || "none" !== fe(d).display || (p = d.style.display, d.style.display = "block", e = ur(d), p ? d.style.display = p : d.style.removeProperty("display")), p = ye(g[0], e[n.d]), g = ye(g[1] || "0", r), t = e[n.p] - l[n.p] - u + p + i - g, s && k(s, g, n, r - g < 20 || s._isStart && 20 < g), r -= r - g), o && (g = o._isStart, m = "scroll" + n.d2, k(o, r = t + r, n, g && 20 < r || !g && (c ? Math.max(ze[m], De[m]) : o.parentNode[m]) <= r + 1), c && (l = ur(s), c && (o.style[n.op.p] = l[n.op.p] - n.op.m - o._offset + lr))), f && d && (m = ur(d), f.seek(h), d = ur(d), f._caScrollDist = m[n.p] - d[n.p], t = t / f._caScrollDist * h), f && f.seek(_), f ? t : Math.round(t)
    }

    function Oe(t, e, r, n) {
        if (t.parentNode !== e) {
            var i, o, s = t.style;
            if (e === ze) {
                for (i in t._stOrig = s.cssText, o = fe(t)) + i || nt.test(i) || !o[i] || "string" != typeof s[i] || "0" === i || (s[i] = o[i]);
                s.top = r, s.left = n
            } else s.cssText = t._stOrig;
            Ce.core.getCache(t).uncache = 1, e.appendChild(t)
        }
    }

    function C(r, t, n) {
        var i = t,
            o = i;
        return function(t) {
            var e = Math.round(r());
            return e !== i && e !== o && 3 < Math.abs(e - i) && 3 < Math.abs(e - o) && (t = e, n && n()), o = i, i = t
        }
    }

    function Pe(l, t) {
        function u(t, e, r, n, i) {
            var o = u.tween,
                s = e.onComplete;
            r = r || c();
            var a = C(c, r, function() {
                o.kill(), u.tween = 0
            });
            return i = n && i || 0, n = n || t - r, o && o.kill(), e[h] = t, (e.modifiers = {})[h] = function() {
                return a(r + n * o.ratio + i * o.ratio * o.ratio)
            }, e.onUpdate = function() {
                Qt.cache++, J()
            }, e.onComplete = function() {
                u.tween = 0, s && s.call(o)
            }, o = u.tween = Ce.to(l, e)
        }
        var c = zt(l, t),
            h = "_scroll" + t.p2;
        return (l[h] = c).wheelHandler = function() {
            return u.tween && u.tween.kill() && (u.tween = 0)
        }, _e(l, "wheel", c.wheelHandler), it.isTouch && _e(l, "touchmove", c.wheelHandler), u
    }
    E.version = "3.11.5", E.create = function(t) {
        return new E(t)
    }, E.register = Ft, E.getAll = function() {
        return Kt.slice()
    }, E.getById = function(e) {
        return Kt.filter(function(t) {
            return t.vars.id === e
        })[0]
    }, r() && Yt.registerPlugin(E);

    function k(t, e, r, n) {
        var i = {
                display: "block"
            },
            o = r[n ? "os2" : "p2"],
            s = r[n ? "p2" : "os2"];
        t._isFlipped = n, i[r.a + "Percent"] = n ? -100 : 0, i[r.a] = n ? "1px" : 0, i["border" + o + ar] = 1, i["border" + s + ar] = 0, i[r.p] = e + "px", Ce.set(t, i)
    }

    function M(t) {
        return K[t] && K[t].map(function(t) {
            return t()
        }) || Q
    }

    function Ee(t) {
        if (t) {
            var e, r, n = t.t.style,
                i = t.length,
                o = 0;
            for ((t.t._gsap || Ce.core.getCache(t.t)).uncache = 1; o < i; o += 2) r = t[o + 1], e = t[o], r ? n[e] = r : n[e] && n.removeProperty(e.replace(rt, "-$1").toLowerCase())
        }
    }
    var Ce, O, Ae, Re, De, ze, P, A, Le, Fe, Ye, R, Be, Xe, D, Ie, z, L, F, We, Ne, Y, B, X, I, W, N, Ue, U, He, H, je, qe, Ve, Ge = 1,
        Ke = Date.now,
        j = Ke(),
        Qe = 0,
        Ze = 0,
        $e = Math.abs,
        q = "right",
        V = "bottom",
        Je = "width",
        tr = "height",
        er = "Right",
        rr = "Left",
        nr = "Top",
        ir = "Bottom",
        or = "padding",
        sr = "margin",
        ar = "Width",
        lr = "px",
        ur = function(t, e) {
            e = e && "matrix(1, 0, 0, 1, 0, 0)" !== fe(t)[D] && Ce.to(t, {
                x: 0,
                y: 0,
                xPercent: 0,
                yPercent: 0,
                rotation: 0,
                rotationX: 0,
                rotationY: 0,
                scale: 1,
                skewX: 0,
                skewY: 0
            }).progress(1), t = t.getBoundingClientRect();
            return e && e.progress(0).kill(), t
        },
        cr = {
            startColor: "green",
            endColor: "red",
            indent: 0,
            fontSize: "16px",
            fontWeight: "normal"
        },
        hr = {
            toggleActions: "play",
            anticipatePin: 0
        },
        G = {
            top: 0,
            left: 0,
            center: .5,
            bottom: 1,
            right: 1
        },
        fr = [],
        pr = {},
        K = {},
        Q = [],
        Z = [],
        dr = 0,
        gr = function(t, e) {
            !Qe || t ? (je = it.isRefreshing = !0, Qt.forEach(function(t) {
                return ae(t) && t.cacheID++ && (t.rec = t())
            }), t = M("refreshInit"), We && it.sort(), e || T(), Qt.forEach(function(t) {
                ae(t) && (t.smooth && (t.target.style.scrollBehavior = "auto"), t(0))
            }), fr.slice(0).forEach(function(t) {
                return t.refresh()
            }), fr.forEach(function(t, e) {
                var r, n;
                t._subPinOffset && t.pin && (r = t.vars.horizontal ? "offsetWidth" : "offsetHeight", n = t.pin[r], t.revert(!0, 1), t.adjustPinSpacing(t.pin[r] - n), t.refresh())
            }), fr.forEach(function(t) {
                return "max" === t.vars.end && t.setPositions(t.start, Math.max(t.start + 1, oe(t.scroller, t._dir)))
            }), t.forEach(function(t) {
                return t && t.render && t.render(-1)
            }), Qt.forEach(function(t) {
                ae(t) && (t.smooth && requestAnimationFrame(function() {
                    return t.target.style.scrollBehavior = "smooth"
                }), t.rec && t(t.rec))
            }), S(U, 1), A.pause(), dr++, J(je = 2), fr.forEach(function(t) {
                return ae(t.vars.onRefresh) && t.vars.onRefresh(t)
            }), je = it.isRefreshing = !1, M("refresh")) : _e(it, "scrollEnd", Te)
        },
        $ = 0,
        mr = 1,
        J = function(t) {
            if (!je || 2 === t) {
                it.isUpdating = !0, Ve && Ve.update(0);
                var e = fr.length,
                    r = Ke(),
                    n = 50 <= r - j,
                    t = e && fr[0].scroll();
                if (mr = t < $ ? -1 : 1, je || ($ = t), n && (Qe && !Xe && 200 < r - Qe && (Qe = 0, M("scrollEnd")), Ye = j, j = r), mr < 0) {
                    for (Ie = e; 0 < Ie--;) fr[Ie] && fr[Ie].update(0, n);
                    mr = 1
                } else
                    for (Ie = 0; Ie < e; Ie++) fr[Ie] && fr[Ie].update(0, n);
                it.isUpdating = !1
            }
            H = 0
        },
        tt = ["left", "top", V, q, sr + ir, sr + er, sr + nr, sr + rr, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"],
        et = tt.concat([Je, tr, "boxSizing", "max" + ar, "maxHeight", "position", sr, or, or + nr, or + er, or + ir, or + rr]),
        rt = /([A-Z])/g,
        _r = {
            left: 0,
            top: 0
        },
        nt = /(webkit|moz|length|cssText|inset)/i,
        it = (vr.prototype.init = function(y, w) {
            var x, n, f, b, T, S, k, M, O, P, E, C, A, p, R, D, d, z, g, L, m, _, v, F, e, Y, B, X, I, W, N, U, H, i, j, q, V, G, K, Q, Z, $, r, J, tt, et, rt, nt, it, ot, st, at, lt, t, ut, ct, ht, ft, pt, dt, gt, mt, _t, vt, yt, wt, xt, bt, o, Tt, St, s, a, l, u, c, h, kt, Mt, Ot, Pt, Et, Ct, At;
            this.progress = this.start = 0, this.vars && this.kill(!0, !0), Ze ? (U = (y = pe(se(y) || le(y) || y.nodeType ? {
                trigger: y
            } : y, hr)).onUpdate, H = y.toggleClass, i = y.id, j = y.onToggle, q = y.onRefresh, V = y.scrub, G = y.trigger, K = y.pin, Q = y.pinSpacing, Z = y.invalidateOnRefresh, $ = y.anticipatePin, r = y.onScrubComplete, J = y.onSnapComplete, tt = y.once, et = y.snap, rt = y.pinReparent, u = y.pinSpacer, nt = y.containerAnimation, it = y.fastScrollEnd, ot = y.preventOverlaps, st = y.horizontal || y.containerAnimation && !1 !== y.horizontal ? Jt : te, at = !V && 0 !== V, lt = Dt(y.scroller || Ae), t = Ce.core.getCache(lt), ut = ne(lt), ct = "fixed" === ("pinType" in y ? y.pinType : Rt(lt, "pinType") || ut && "fixed"), ht = [y.onEnter, y.onLeave, y.onEnterBack, y.onLeaveBack], ft = at && y.toggleActions.split(" "), o = ("markers" in y ? y : hr).markers, pt = !ut && parseFloat(fe(lt)["border" + st.p2 + ar]) || 0, dt = this, gt = y.onRefreshInit && function() {
                return y.onRefreshInit(dt)
            }, Mt = lt, Ot = ut, Et = (Pt = st).d, Ct = Pt.d2, At = Pt.a, mt = (At = Rt(Mt, "getBoundingClientRect")) ? function() {
                return At()[Et]
            } : function() {
                return (Ot ? Ae["inner" + Ct] : Mt["client" + Ct]) || 0
            }, Pt = lt, _t = !ut || ~Zt.indexOf(Pt) ? ie(Pt) : function() {
                return _r
            }, yt = vt = 0, wt = zt(lt, st), Ue(dt), dt._dir = st, $ *= 45, dt.scroller = lt, dt.scroll = nt ? nt.time.bind(nt) : wt, b = wt(), dt.vars = y, w = w || y.animation, "refreshPriority" in y && (We = 1, -9999 === y.refreshPriority && (Ve = dt)), t.tweenScroll = t.tweenScroll || {
                top: Pe(lt, te),
                left: Pe(lt, Jt)
            }, dt.tweenTo = x = t.tweenScroll[st.p], dt.scrubDuration = function(t) {
                (e = le(t) && t) ? F ? F.duration(t) : F = Ce.to(w, {
                    ease: "expo",
                    totalProgress: "+=0.001",
                    duration: e,
                    paused: !0,
                    onComplete: function() {
                        return r && r(dt)
                    }
                }): (F && F.progress(1).kill(), F = 0)
            }, w && (w.vars.lazy = !1, w._initted || !1 !== w.vars.immediateRender && !1 !== y.immediateRender && w.duration() && w.render(0, !0, !0), dt.animation = w.pause(), (w.scrollTrigger = dt).scrubDuration(V), F && F.resetTo && F.resetTo("totalProgress", 0), _ = 0, i = i || w.vars.id), fr.push(dt), et && (ue(et) && !et.push || (et = {
                snapTo: et
            }), "scrollBehavior" in ze.style && Ce.set(ut ? [ze, De] : lt, {
                scrollBehavior: "auto"
            }), Qt.forEach(function(t) {
                return ae(t) && t.target === (ut ? Re.scrollingElement || De : lt) && (t.smooth = !1)
            }), f = ae(et.snapTo) ? et.snapTo : "labels" === et.snapTo ? (kt = w, function(t) {
                return Ce.utils.snap(ge(kt), t)
            }) : "labelsDirectional" === et.snapTo ? (h = w, function(t, e) {
                return me(ge(h))(t, e.direction)
            }) : !1 !== et.directional ? function(t, e) {
                return me(et.snapTo)(t, Ke() - yt < 500 ? 0 : e.direction)
            } : Ce.utils.snap(et.snapTo), Y = ue(Y = et.duration || {
                min: .1,
                max: 2
            }) ? Fe(Y.min, Y.max) : Fe(Y, Y), B = Ce.delayedCall(et.delay || e / 2 || .1, function() {
                var t, e, r, n, i, o, s, a, l, u = wt(),
                    c = Ke() - yt < 500,
                    h = x.tween;
                !(c || Math.abs(dt.getVelocity()) < 10) || h || Xe || vt === u ? dt.isActive && vt !== u && B.restart(!0) : (t = (u - S) / M, e = w && !at ? w.totalProgress() : t, r = !c && (e - v) / (Ke() - Ye) * 1e3 || 0, n = Ce.utils.clamp(-t, 1 - t, $e(r / 2) * r / .185), i = t + (!1 === et.inertia ? 0 : n), o = Fe(0, 1, f(i, dt)), s = Math.round(S + o * M), c = et.onStart, a = et.onInterrupt, l = et.onComplete, u <= k && S <= u && s !== u && (h && !h._initted && h.data <= $e(s - u) || (!1 === et.inertia && (n = o - t), x(s, {
                    duration: Y($e(.185 * Math.max($e(i - e), $e(o - e)) / r / .05 || 0)),
                    ease: et.ease || "power3",
                    data: $e(s - u),
                    onInterrupt: function() {
                        return B.restart(!0) && a && a(dt)
                    },
                    onComplete: function() {
                        dt.update(), vt = wt(), _ = v = w && !at ? w.totalProgress() : dt.progress, J && J(dt), l && l(dt)
                    }
                }, u, n * M, s - u - n * M), c && c(dt, x.tween))))
            }).pause()), i && (pr[i] = dt), t = (t = (G = dt.trigger = Dt(G || K)) && G._gsap && G._gsap.stRevert) && t(dt), K = !0 === K ? G : Dt(K), se(H) && (H = {
                targets: G,
                className: H
            }), K && (!1 === Q || Q === sr || (Q = !(!Q && K.parentNode && K.parentNode.style && "flex" === fe(K.parentNode).display) && or), dt.pin = K, (n = Ce.core.getCache(K)).spacer ? O = n.pinState : (u && ((u = Dt(u)) && !u.nodeType && (u = u.current || u.nativeElement), n.spacerIsNative = !!u, u && (n.spacerState = ke(u))), n.spacer = C = u || Re.createElement("div"), C.classList.add("pin-spacer"), i && C.classList.add("pin-spacer-" + i), n.pinState = O = ke(K)), !1 !== y.force3D && Ce.set(K, {
                force3D: !0
            }), dt.spacer = C = n.spacer, c = fe(K), d = c[Q + st.os2], A = Ce.getProperty(K), p = Ce.quickSetter(K, st.a, lr), Se(K, C, c), E = ke(K)), o && (u = ue(o) ? pe(o, cr) : cr, xt = we("scroller-start", i, lt, st, u, 0), bt = we("scroller-end", i, lt, st, u, 0, xt), c = xt["offset" + st.op.d2], o = Dt(Rt(lt, "content") || lt), Tt = this.markerStart = we("start", i, o, st, u, c, 0, nt), St = this.markerEnd = we("end", i, o, st, u, c, 0, nt), nt && (N = Ce.quickSetter([Tt, St], st.a, lr)), ct || Zt.length && !0 === Rt(lt, "fixedMarkers") || (c = fe(u = ut ? ze : lt).position, u.style.position = "absolute" === c || "fixed" === c ? c : "relative", Ce.set([xt, bt], {
                force3D: !0
            }), g = Ce.quickSetter(xt, st.a, lr), m = Ce.quickSetter(bt, st.a, lr))), nt && (s = nt.vars.onUpdate, a = nt.vars.onUpdateParams, nt.eventCallback("onUpdate", function() {
                dt.update(0, 0, 1), s && s.apply(nt, a || [])
            })), dt.previous = function() {
                return fr[fr.indexOf(dt) - 1]
            }, dt.next = function() {
                return fr[fr.indexOf(dt) + 1]
            }, dt.revert = function(t, e) {
                if (!e) return dt.kill(!0);
                var r = !1 !== t || !dt.enabled,
                    t = Be;
                r !== dt.isReverted && (r && (I = Math.max(wt(), dt.scroll.rec || 0), X = dt.progress, W = w && w.progress()), Tt && [Tt, St, xt, bt].forEach(function(t) {
                    return t.style.display = r ? "none" : "block"
                }), r && (Be = dt).update(r), !K || rt && dt.isActive || (r ? function(t, e, r) {
                    Ee(r);
                    r = t._gsap;
                    r.spacerIsNative ? Ee(r.spacerState) : !t._gsap.swappedIn || (r = e.parentNode) && (r.insertBefore(t, e), r.removeChild(e)), t._gsap.swappedIn = !1
                }(K, C, O) : Se(K, C, fe(K), z)), r || dt.update(r), Be = t, dt.isReverted = r)
            }, dt.refresh = function(t, e) {
                if (!Be && dt.enabled || e)
                    if (K && t && Qe) _e(vr, "scrollEnd", Te);
                    else {
                        !je && gt && gt(dt), Be = dt, yt = Ke(), x.tween && (x.tween.kill(), x.tween = 0), F && F.pause(), Z && w && w.revert({
                            kill: !1
                        }).invalidate(), dt.isReverted || dt.revert(!0, !0), dt._subPinOffset = !1;
                        for (var r, n, i, o, s, a, l, u = mt(), c = _t(), h = nt ? nt.duration() : oe(lt, st), f = M <= .01, p = 0, d = 0, e = y.end, t = y.endTrigger || G, g = y.start || (0 !== y.start && G ? K ? "0 0" : "0 100%" : 0), m = dt.pinnedContainer = y.pinnedContainer && Dt(y.pinnedContainer), _ = G && Math.max(0, fr.indexOf(dt)) || 0, v = _; v--;)(i = fr[v]).end || i.refresh(0, 1) || (Be = dt), !(o = i.pin) || o !== G && o !== K && o !== m || i.isReverted || ((a = a || []).unshift(i), i.revert(!0, !0)), i !== fr[v] && (_--, v--);
                        for (ae(g) && (g = g(dt)), S = Me(g, G, u, st, wt(), Tt, xt, dt, c, pt, ct, h, nt) || (K ? -.001 : 0), se(e = ae(e) ? e(dt) : e) && !e.indexOf("+=") && (~e.indexOf(" ") ? e = (se(g) ? g.split(" ")[0] : "") + e : (p = ye(e.substr(2), u), e = se(g) ? g : (nt ? Ce.utils.mapRange(0, nt.duration(), nt.scrollTrigger.start, nt.scrollTrigger.end, S) : S) + p, t = G)), k = Math.max(S, Me(e || (t ? "100% 0" : h), t, u, st, wt() + p, St, bt, dt, c, pt, ct, h, nt)) || -.001, M = k - S || (S -= .01) && .001, p = 0, v = _; v--;)(o = (i = fr[v]).pin) && i.start - i._pinPush <= S && !nt && 0 < i.end && (r = i.end - i.start, (o === G && i.start - i._pinPush < S || o === m) && !le(g) && (p += r * (1 - i.progress)), o === K && (d += r));
                        if (S += p, k += p, f && (X = Ce.utils.clamp(0, 1, Ce.utils.normalize(S, k, I))), dt._pinPush = d, Tt && p && ((r = {})[st.a] = "+=" + p, m && (r[st.p] = "-=" + wt()), Ce.set([Tt, St], r)), K) r = fe(K), u = st === te, c = wt(), R = parseFloat(A(st.a)) + d, !h && 1 < k && ((l = {
                            style: l = (ut ? Re.scrollingElement || De : lt).style,
                            value: l["overflow" + st.a.toUpperCase()]
                        }).style["overflow" + st.a.toUpperCase()] = "scroll"), Se(K, C, r), E = ke(K), n = ur(K, !0), h = ct && zt(lt, u ? Jt : te)(), Q && ((z = [Q + st.os2, M + d + lr]).t = C, (v = Q === or ? de(K, st) + M + d : 0) && z.push(st.d, v + lr), Ee(z), m && fr.forEach(function(t) {
                            t.pin === m && !1 !== t.vars.pinSpacing && (t._subPinOffset = !0)
                        }), ct && wt(I)), ct && ((s = {
                            top: n.top + (u ? c - S : h) + lr,
                            left: n.left + (u ? h : c - S) + lr,
                            boxSizing: "border-box",
                            position: "fixed"
                        })[Je] = s.maxWidth = Math.ceil(n.width) + lr, s[tr] = s.maxHeight = Math.ceil(n.height) + lr, s[sr] = s[sr + nr] = s[sr + er] = s[sr + ir] = s[sr + rr] = "0", s[or] = r[or], s[or + nr] = r[or + nr], s[or + er] = r[or + er], s[or + ir] = r[or + ir], s[or + rr] = r[or + rr], P = function(t, e, r) {
                            for (var n, i = [], o = t.length, s = r ? 8 : 0; s < o; s += 2) n = t[s], i.push(n, n in e ? e[n] : t[s + 1]);
                            return i.t = t.t, i
                        }(O, s, rt), je && wt(0)), w ? (s = w._initted, Ne(1), w.render(w.duration(), !0, !0), D = A(st.a) - R + M + d, L = 1 < Math.abs(M - D), ct && L && P.splice(P.length - 2, 2), w.render(0, !0, !0), s || w.invalidate(!0), w.parent || w.totalTime(w.totalTime()), Ne(0)) : D = M, l && (l.value ? l.style["overflow" + st.a.toUpperCase()] = l.value : l.style.removeProperty("overflow-" + st.a));
                        else if (G && wt() && !nt)
                            for (n = G.parentNode; n && n !== ze;) n._pinOffset && (S -= n._pinOffset, k -= n._pinOffset), n = n.parentNode;
                        a && a.forEach(function(t) {
                            return t.revert(!1, !0)
                        }), dt.start = S, dt.end = k, b = T = je ? I : wt(), nt || je || (b < I && wt(I), dt.scroll.rec = 0), dt.revert(!1, !0), B && (vt = -1, dt.isActive && wt(S + M * X), B.restart(!0)), Be = 0, w && at && (w._initted || W) && w.progress() !== W && w.progress(W, !0).render(w.time(), !0, !0), (f || X !== dt.progress || nt) && (w && !at && w.totalProgress(nt && S < -.001 && !X ? Ce.utils.normalize(S, k, 0) : X, !0), dt.progress = (b - S) / M === X ? 0 : X), K && Q && (C._pinOffset = Math.round(dt.progress * D)), F && F.invalidate(), q && !je && q(dt)
                    }
            }, dt.getVelocity = function() {
                return (wt() - T) / (Ke() - Ye) * 1e3 || 0
            }, dt.endAnimation = function() {
                ce(dt.callbackAnimation), w && (F ? F.progress(1) : w.paused() ? at || ce(w, dt.direction < 0, 1) : ce(w, w.reversed()))
            }, dt.labelToScroll = function(t) {
                return w && w.labels && (S || dt.refresh() || S) + w.labels[t] / w.duration() * M || 0
            }, dt.getTrailing = function(e) {
                var t = fr.indexOf(dt),
                    t = 0 < dt.direction ? fr.slice(0, t).reverse() : fr.slice(t + 1);
                return (se(e) ? t.filter(function(t) {
                    return t.vars.preventOverlaps === e
                }) : t).filter(function(t) {
                    return 0 < dt.direction ? t.end <= S : t.start >= k
                })
            }, dt.update = function(t, e, r) {
                var n, i, o, s, a, l, u, c, h;
                nt && !r && !t || (l = !0 === je ? I : dt.scroll(), h = (c = t ? 0 : (l - S) / M) < 0 ? 0 : 1 < c ? 1 : c || 0, u = dt.progress, e && (T = b, b = nt ? wt() : l, et && (v = _, _ = w && !at ? w.totalProgress() : h)), (h = $ && !h && K && !Be && !Ge && Qe && S < l + (l - T) / (Ke() - Ye) * $ ? 1e-4 : h) !== u && dt.enabled && (r = (s = (n = dt.isActive = !!h && h < 1) != (!!u && u < 1)) || !!h != !!u, dt.direction = u < h ? 1 : -1, dt.progress = h, r && !Be && (i = h && !u ? 0 : 1 === h ? 1 : 1 === u ? 2 : 3, at && (o = !s && "none" !== ft[i + 1] && ft[i + 1] || ft[i], a = w && ("complete" === o || "reset" === o || o in w))), ot && (s || a) && (a || V || !w) && (ae(ot) ? ot(dt) : dt.getTrailing(ot).forEach(function(t) {
                    return t.endAnimation()
                })), at || (!F || Be || Ge ? w && w.totalProgress(h, !!Be) : (F._dp._time - F._start !== F._time && F.render(F._dp._time - F._start), F.resetTo ? F.resetTo("totalProgress", h, w._tTime / w._tDur) : (F.vars.totalProgress = h, F.invalidate().restart()))), K && (t && Q && (C.style[Q + st.os2] = d), ct ? r && (c = !t && u < h && l < k + 1 && l + 1 >= oe(lt, st), rt && (t || !n && !c ? Oe(K, C) : (e = ur(K, !0), u = l - S, Oe(K, ze, e.top + (st === te ? u : 0) + lr, e.left + (st === te ? 0 : u) + lr))), Ee(n || c ? P : E), L && h < 1 && n || p(R + (1 !== h || c ? 0 : D))) : p(re(R + D * h))), !et || x.tween || Be || Ge || B.restart(!0), H && (s || tt && h && (h < 1 || !He)) && Le(H.targets).forEach(function(t) {
                    return t.classList[n || tt ? "add" : "remove"](H.className)
                }), !U || at || t || U(dt), r && !Be ? (at && (a && ("complete" === o ? w.pause().totalProgress(1) : "reset" === o ? w.restart(!0).pause() : "restart" === o ? w.restart(!0) : w[o]()), U && U(dt)), !s && He || (j && s && he(dt, j), ht[i] && he(dt, ht[i]), tt && (1 === h ? dt.kill(!1, 1) : ht[i] = 0), s || ht[i = 1 === h ? 1 : 3] && he(dt, ht[i])), it && !n && Math.abs(dt.getVelocity()) > (le(it) ? it : 2500) && (ce(dt.callbackAnimation), F ? F.progress(1) : ce(w, "reverse" === o ? 1 : !h, 1))) : at && U && !Be && U(dt)), m && (h = nt ? l / nt.duration() * (nt._caScrollDist || 0) : l, g(h + (xt._isFlipped ? 1 : 0)), m(h)), N && N(-l / nt.duration() * (nt._caScrollDist || 0)))
            }, dt.enable = function(t, e) {
                dt.enabled || (dt.enabled = !0, _e(lt, "resize", be), _e(ut ? Re : lt, "scroll", xe), gt && _e(vr, "refreshInit", gt), !1 !== t && (dt.progress = X = 0, b = T = vt = wt()), !1 !== e && dt.refresh())
            }, dt.getTween = function(t) {
                return t && x ? x.tween : F
            }, dt.setPositions = function(t, e) {
                K && (R += t - S, D += e - t - M, Q === or && dt.adjustPinSpacing(e - t - M)), dt.start = S = t, dt.end = k = e, M = e - t, dt.update()
            }, dt.adjustPinSpacing = function(t) {
                var e;
                z && t && (e = z.indexOf(st.d) + 1, z[e] = parseFloat(z[e]) + t + lr, z[1] = parseFloat(z[1]) + t + lr, Ee(z))
            }, dt.disable = function(t, e) {
                if (dt.enabled && (!1 !== t && dt.revert(!0, !0), dt.enabled = dt.isActive = !1, e || F && F.pause(), I = 0, n && (n.uncache = 1), gt && ve(vr, "refreshInit", gt), B && (B.pause(), x.tween && x.tween.kill() && (x.tween = 0)), !ut)) {
                    for (var r = fr.length; r--;)
                        if (fr[r].scroller === lt && fr[r] !== dt) return;
                    ve(lt, "resize", be), ve(lt, "scroll", xe)
                }
            }, dt.kill = function(t, e) {
                dt.disable(t, e), F && !e && F.kill(), i && delete pr[i];
                var r = fr.indexOf(dt);
                0 <= r && fr.splice(r, 1), r === Ie && 0 < mr && Ie--, r = 0, fr.forEach(function(t) {
                    return t.scroller === dt.scroller && (r = 1)
                }), r || je || (dt.scroll.rec = 0), w && (w.scrollTrigger = null, t && w.revert({
                    kill: !1
                }), e || w.kill()), Tt && [Tt, St, xt, bt].forEach(function(t) {
                    return t.parentNode && t.parentNode.removeChild(t)
                }), Ve === dt && (Ve = 0), K && (n && (n.uncache = 1), r = 0, fr.forEach(function(t) {
                    return t.pin === K && r++
                }), r || (n.spacer = 0)), y.onKill && y.onKill(dt)
            }, dt.enable(!1, !1), t && t(dt), w && w.add && !M ? Ce.delayedCall(.01, function() {
                return S || k || dt.refresh()
            }) && (M = .01) && (S = k = 0) : dt.refresh(), !K || qe !== dr && (l = qe = dr, requestAnimationFrame(function() {
                return l === dr && gr(!0)
            }))) : this.update = this.refresh = this.kill = ee
        }, vr.register = function(t) {
            return O || (Ce = t || m(), g() && window.document && vr.enable(), O = Ze), O
        }, vr.defaults = function(t) {
            if (t)
                for (var e in t) hr[e] = t[e];
            return hr
        }, vr.disable = function(e, r) {
            Ze = 0, fr.forEach(function(t) {
                return t[r ? "kill" : "disable"](e)
            }), ve(Ae, "wheel", xe), ve(Re, "scroll", xe), clearInterval(R), ve(Re, "touchcancel", ee), ve(ze, "touchstart", ee), v(ve, Re, "pointerdown,touchstart,mousedown", p), v(ve, Re, "pointerup,touchend,mouseup", d), A.kill(), _(ve);
            for (var t = 0; t < Qt.length; t += 3) y(ve, Qt[t], Qt[t + 1]), y(ve, Qt[t], Qt[t + 2])
        }, vr.enable = function() {
            if (Ae = window, Re = document, De = Re.documentElement, ze = Re.body, Ce && (Le = Ce.utils.toArray, Fe = Ce.utils.clamp, Ue = Ce.core.context || ee, Ne = Ce.core.suppressOverwrites || ee, U = Ae.history.scrollRestoration || "auto", $ = Ae.pageYOffset, Ce.core.globals("ScrollTrigger", vr), ze)) {
                Ze = 1,
                    function t() {
                        return Ze && requestAnimationFrame(t)
                    }(), E.register(Ce), vr.isTouch = E.isTouch, N = E.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), _e(Ae, "wheel", xe), P = [Ae, Re, De, ze], Ce.matchMedia ? (vr.matchMedia = function(t) {
                        var e, r = Ce.matchMedia();
                        for (e in t) r.add(e, t[e]);
                        return r
                    }, Ce.addEventListener("matchMediaInit", function() {
                        return T()
                    }), Ce.addEventListener("matchMediaRevert", function() {
                        return b()
                    }), Ce.addEventListener("matchMedia", function() {
                        gr(0, 1), M("matchMedia")
                    }), Ce.matchMedia("(orientation: portrait)", function() {
                        return x(), x
                    })) : console.warn("Requires GSAP 3.11.0 or later"), x(), _e(Re, "scroll", xe);
                var t, e = ze.style,
                    r = e.borderTopStyle,
                    n = Ce.core.Animation.prototype;
                for (n.revert || Object.defineProperty(n, "revert", {
                        value: function() {
                            return this.time(-.01, !0)
                        }
                    }), e.borderTopStyle = "solid", n = ur(ze), te.m = Math.round(n.top + te.sc()) || 0, Jt.m = Math.round(n.left + Jt.sc()) || 0, r ? e.borderTopStyle = r : e.removeProperty("border-top-style"), R = setInterval(w, 250), Ce.delayedCall(.5, function() {
                        return Ge = 0
                    }), _e(Re, "touchcancel", ee), _e(ze, "touchstart", ee), v(_e, Re, "pointerdown,touchstart,mousedown", p), v(_e, Re, "pointerup,touchend,mouseup", d), D = Ce.utils.checkPrefix("transform"), et.push(D), O = Ke(), A = Ce.delayedCall(.2, gr).pause(), F = [Re, "visibilitychange", function() {
                        var t = Ae.innerWidth,
                            e = Ae.innerHeight;
                        Re.hidden ? (z = t, L = e) : z === t && L === e || be()
                    }, Re, "DOMContentLoaded", gr, Ae, "load", gr, Ae, "resize", be], _(_e), fr.forEach(function(t) {
                        return t.enable(0, 1)
                    }), t = 0; t < Qt.length; t += 3) y(ve, Qt[t], Qt[t + 1]), y(ve, Qt[t], Qt[t + 2])
            }
        }, vr.config = function(t) {
            "limitCallbacks" in t && (He = !!t.limitCallbacks);
            var e = t.syncInterval;
            e && clearInterval(R) || (R = e) && setInterval(w, e), "ignoreMobileResize" in t && (X = 1 === vr.isTouch && t.ignoreMobileResize), "autoRefreshEvents" in t && (_(ve), _(_e, t.autoRefreshEvents || "none"), Y = -1 === (t.autoRefreshEvents + "").indexOf("resize"))
        }, vr.scrollerProxy = function(t, e) {
            var r = Dt(t),
                n = Qt.indexOf(r),
                t = ne(r);
            ~n && Qt.splice(n, t ? 6 : 2), e && (t ? Zt.unshift(Ae, e, ze, e, De, e) : Zt.unshift(r, e))
        }, vr.clearMatchMedia = function(e) {
            fr.forEach(function(t) {
                return t._ctx && t._ctx.query === e && t._ctx.kill(!0, !0)
            })
        }, vr.isInViewport = function(t, e, r) {
            t = (se(t) ? Dt(t) : t).getBoundingClientRect(), e = t[r ? Je : tr] * e || 0;
            return r ? 0 < t.right - e && t.left + e < Ae.innerWidth : 0 < t.bottom - e && t.top + e < Ae.innerHeight
        }, vr.positionInViewport = function(t, e, r) {
            var n = (t = se(t) ? Dt(t) : t).getBoundingClientRect(),
                t = n[r ? Je : tr],
                e = null == e ? t / 2 : e in G ? G[e] * t : ~e.indexOf("%") ? parseFloat(e) * t / 100 : parseFloat(e) || 0;
            return r ? (n.left + e) / Ae.innerWidth : (n.top + e) / Ae.innerHeight
        }, vr.killAll = function(t) {
            fr.slice(0).forEach(function(t) {
                return "ScrollSmoother" !== t.vars.id && t.kill()
            }), !0 !== t && (t = K.killAll || [], K = {}, t.forEach(function(t) {
                return t()
            }))
        }, vr);

    function vr(t, e) {
        O || vr.register(Ce) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), this.init(t, e)
    }

    function ot(t, e, r, n) {
        return n < e ? t(n) : e < 0 && t(0), n < r ? (n - e) / (r - e) : r < 0 ? e / (e - r) : 1
    }

    function st(t, e) {
        !0 === e ? t.style.removeProperty("touch-action") : t.style.touchAction = !0 === e ? "auto" : e ? "pan-" + e + (E.isTouch ? " pinch-zoom" : "") : "none", t === De && st(ze, e)
    }

    function at(t) {
        var e, r = t.event,
            n = t.target,
            i = t.axis,
            o = (r.changedTouches ? r.changedTouches[0] : r).target,
            s = o._gsap || Ce.core.getCache(o),
            t = Ke();
        if (!s._isScrollT || 2e3 < t - s._isScrollT) {
            for (; o && o !== ze && (o.scrollHeight <= o.clientHeight && o.scrollWidth <= o.clientWidth || !ct[(e = fe(o)).overflowY] && !ct[e.overflowX]);) o = o.parentNode;
            s._isScroll = o && o !== n && !ne(o) && (ct[(e = fe(o)).overflowY] || ct[e.overflowX]), s._isScrollT = t
        }!s._isScroll && "x" !== i || (r.stopPropagation(), r._gsapAllow = !0)
    }

    function lt(t, e, r, n) {
        return E.create({
            target: t,
            capture: !0,
            debounce: !1,
            lockAxis: !0,
            type: e,
            onWheel: n = n && at,
            onPress: n,
            onDrag: n,
            onScroll: n,
            onEnable: function() {
                return r && _e(Re, E.eventTypes[0], ft, !1, !0)
            },
            onDisable: function() {
                return ve(Re, E.eventTypes[0], ft, !0)
            }
        })
    }
    it.version = "3.11.5", it.saveStyles = function(t) {
        return t ? Le(t).forEach(function(t) {
            var e;
            t && t.style && (0 <= (e = Z.indexOf(t)) && Z.splice(e, 5), Z.push(t, t.style.cssText, t.getBBox && t.getAttribute("transform"), Ce.core.getCache(t), Ue()))
        }) : Z
    }, it.revert = function(t, e) {
        return T(!t, e)
    }, it.create = function(t, e) {
        return new it(t, e)
    }, it.refresh = function(t) {
        return t ? be() : (O || it.register()) && gr(!0)
    }, it.update = function(t) {
        return ++Qt.cache && J(!0 === t ? 2 : 0)
    }, it.clearScrollMemory = S, it.maxScroll = function(t, e) {
        return oe(t, e ? Jt : te)
    }, it.getScrollFunc = function(t, e) {
        return zt(Dt(t), e ? Jt : te)
    }, it.getById = function(t) {
        return pr[t]
    }, it.getAll = function() {
        return fr.filter(function(t) {
            return "ScrollSmoother" !== t.vars.id
        })
    }, it.isScrolling = function() {
        return !!Qe
    }, it.snapDirectional = me, it.addEventListener = function(t, e) {
        t = K[t] || (K[t] = []);
        ~t.indexOf(e) || t.push(e)
    }, it.removeEventListener = function(t, e) {
        t = K[t], e = t && t.indexOf(e);
        0 <= e && t.splice(e, 1)
    }, it.batch = function(t, e) {
        var r, n = [],
            i = {},
            o = e.interval || .016,
            s = e.batchMax || 1e9;
        for (r in e) i[r] = "on" === r.substr(0, 2) && ae(e[r]) && "onRefreshInit" !== r ? function(t) {
            var e = [],
                r = [],
                n = Ce.delayedCall(o, function() {
                    t(e, r), e = [], r = []
                }).pause();
            return function(t) {
                e.length || n.restart(!0), e.push(t.trigger), r.push(t), s <= e.length && n.progress(1)
            }
        }(e[r]) : e[r];
        return ae(s) && (s = s(), _e(it, "refresh", function() {
            return s = e.batchMax()
        })), Le(t).forEach(function(t) {
            var e = {};
            for (r in i) e[r] = i[r];
            e.trigger = t, n.push(it.create(e))
        }), n
    };
    var ut, ct = {
            auto: 1,
            scroll: 1
        },
        ht = /(input|label|select|textarea)/i,
        ft = function(t) {
            var e = ht.test(t.target.tagName);
            (e || ut) && (t._gsapAllow = !0, ut = e)
        };
    it.sort = function(t) {
        return fr.sort(t || function(t, e) {
            return -1e6 * (t.vars.refreshPriority || 0) + t.start - (e.start + -1e6 * (e.vars.refreshPriority || 0))
        })
    }, it.observe = function(t) {
        return new E(t)
    }, it.normalizeScroll = function(t) {
        if (void 0 === t) return B;
        if (!0 === t && B) return B.enable();
        if (!1 === t) return B && B.kill();
        t = t instanceof E ? t : function(t) {
            function e() {
                return n = !1
            }

            function o() {
                a = oe(_, te), P = Fe(N ? 1 : 0, a), p && (O = Fe(0, oe(_, Jt))), l = dr
            }

            function s() {
                y._gsap.y = re(parseFloat(y._gsap.y) + w.offset) + "px", y.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(y._gsap.y) + ", 0, 1)", w.offset = w.cacheID = 0
            }

            function i() {
                o(), u.isActive() && u.vars.scrollY > a && (w() > a ? u.progress(1) && w(a) : u.resetTo("scrollY", a))
            }(t = !ue(t) ? {} : t).preventDefault = t.isNormalizer = t.allowClicks = !0, t.type || (t.type = "wheel,touch"), t.debounce = !!t.debounce, t.id = t.id || "normalizer";
            var r, a, l, n, u, c, h, f, p = t.normalizeScrollX,
                d = t.momentum,
                g = t.allowNestedScroll,
                m = t.onRelease,
                _ = Dt(t.target) || De,
                v = (v = Ce.core.globals().ScrollSmoother) && v.get(),
                y = N && (t.content && Dt(t.content) || v && !1 !== t.content && !v.smooth() && v.content()),
                w = zt(_, te),
                x = zt(_, Jt),
                b = 1,
                T = (E.isTouch && Ae.visualViewport ? Ae.visualViewport.scale * Ae.visualViewport.width : Ae.outerWidth) / Ae.innerWidth,
                S = 0,
                k = ae(d) ? function() {
                    return d(r)
                } : function() {
                    return d || 2.8
                },
                M = lt(_, t.type, !0, g),
                O = ee,
                P = ee;
            return y && Ce.set(y, {
                y: "+=0"
            }), t.ignoreCheck = function(t) {
                return N && "touchmove" === t.type && function() {
                    if (n) {
                        requestAnimationFrame(e);
                        var t = re(r.deltaY / 2),
                            t = P(w.v - t);
                        return y && t !== w.v + w.offset && (w.offset = t - w.v, t = re((parseFloat(y && y._gsap.y) || 0) - w.offset), y.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + t + ", 0, 1)", y._gsap.y = t + "px", w.cacheID = Qt.cache, J()), !0
                    }
                    w.offset && s(), n = !0
                }() || 1.05 < b && "touchstart" !== t.type || r.isGesturing || t.touches && 1 < t.touches.length
            }, t.onPress = function() {
                n = !1;
                var t = b;
                b = re((Ae.visualViewport && Ae.visualViewport.scale || 1) / T), u.pause(), t !== b && st(_, 1.01 < b || !p && "x"), c = x(), h = w(), o(), l = dr
            }, t.onRelease = t.onGestureStart = function(t, e) {
                var r, n;
                w.offset && s(), e ? (Qt.cache++, e = k(), p && (n = (r = x()) + .05 * e * -t.velocityX / .227, e *= ot(x, r, n, oe(_, Jt)), u.vars.scrollX = O(n)), n = (r = w()) + .05 * e * -t.velocityY / .227, e *= ot(w, r, n, oe(_, te)), u.vars.scrollY = P(n), u.invalidate().duration(e).play(.01), (N && u.vars.scrollY >= a || a - 1 <= r) && Ce.to({}, {
                    onUpdate: i,
                    duration: e
                })) : f.restart(!0), m && m(t)
            }, t.onWheel = function() {
                u._ts && u.pause(), 1e3 < Ke() - S && (l = 0, S = Ke())
            }, t.onChange = function(t, e, r, n, i) {
                dr !== l && o(), e && p && x(O(n[2] === e ? c + (t.startX - t.x) : x() + e - n[1])), r && (w.offset && s(), t = (n = i[2] === r) ? h + t.startY - t.y : w() + r - i[1], i = P(t), n && t !== i && (h += i - t), w(i)), (r || e) && J()
            }, t.onEnable = function() {
                st(_, !p && "x"), it.addEventListener("refresh", i), _e(Ae, "resize", i), w.smooth && (w.target.style.scrollBehavior = "auto", w.smooth = x.smooth = !1), M.enable()
            }, t.onDisable = function() {
                st(_, !0), ve(Ae, "resize", i), it.removeEventListener("refresh", i), M.kill()
            }, t.lockAxis = !1 !== t.lockAxis, ((r = new E(t)).iOS = N) && !w() && w(1), N && Ce.ticker.add(ee), f = r._dc, u = Ce.to(r, {
                ease: "power4",
                paused: !0,
                scrollX: p ? "+=0.1" : "+=0",
                scrollY: "+=0.1",
                modifiers: {
                    scrollY: C(w, w(), function() {
                        return u.pause()
                    })
                },
                onUpdate: J,
                onComplete: f.vars.onComplete
            }), r
        }(t);
        return B && B.target === t.target && B.kill(), ne(t.target) && (B = t), t
    }, it.core = {
        _getVelocityProp: Et,
        _inputObserver: lt,
        _scrollers: Qt,
        _proxies: Zt,
        bridge: {
            ss: function() {
                Qe || M("scrollStart"), Qe = Ke()
            },
            ref: function() {
                return Be
            }
        }
    }, m() && Ce.registerPlugin(it), t.ScrollTrigger = it, t.default = it, "undefined" == typeof window || window !== t ? Object.defineProperty(t, "__esModule", {
        value: !0
    }) : delete t.default
}),
function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = t || self).window = t.window || {})
}(this, function(t) {
    "use strict";

    function r(t, e) {
        t.prototype = Object.create(e.prototype), (t.prototype.constructor = t).__proto__ = e
    }

    function P(t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t
    }

    function A(t) {
        return "string" == typeof t
    }

    function h(t) {
        return "function" == typeof t
    }

    function E(t) {
        return "number" == typeof t
    }

    function i(t) {
        return void 0 === t
    }

    function C(t) {
        return "object" == typeof t
    }

    function L(t) {
        return !1 !== t
    }

    function o() {
        return "undefined" != typeof window
    }

    function R(t) {
        return h(t) || A(t)
    }

    function e(t) {
        return (Pt = _t(t, fe)) && Ar
    }

    function D(t, e) {
        return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()")
    }

    function z(t, e) {
        return !e && console.warn(t)
    }

    function s(t, e) {
        return t && (fe[t] = e) && Pt && (Pt[t] = e) || fe
    }

    function a() {
        return 0
    }

    function F(t) {
        var e, r, n = t[0];
        if (C(n) || h(n) || (t = [t]), !(e = (n._gsap || {}).harness)) {
            for (r = be.length; r-- && !be[r].targetTest(n););
            e = be[r]
        }
        for (r = t.length; r--;) t[r] && (t[r]._gsap || (t[r]._gsap = new He(t[r], e))) || t.splice(r, 1);
        return t
    }

    function Y(t) {
        return t._gsap || F(Ee(t))[0]._gsap
    }

    function l(t, e, r) {
        return (r = t[e]) && h(r) ? t[e]() : i(r) && t.getAttribute && t.getAttribute(e) || r
    }

    function p(t, e) {
        return (t = t.split(",")).forEach(e) || t
    }

    function B(t) {
        return Math.round(1e5 * t) / 1e5 || 0
    }

    function X(t) {
        return Math.round(1e7 * t) / 1e7 || 0
    }

    function I(t, e) {
        var r = e.charAt(0),
            e = parseFloat(e.substr(2));
        return t = parseFloat(t), "+" === r ? t + e : "-" === r ? t - e : "*" === r ? t * e : t / e
    }

    function W() {
        var t, e, r = _e.length,
            n = _e.slice(0);
        for (ve = {}, t = _e.length = 0; t < r; t++)(e = n[t]) && e._lazy && (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0)
    }

    function u(t, e, r, n) {
        _e.length && !bt && W(), t.render(e, r, n || bt && e < 0 && (t._initted || t._startAt)), _e.length && !bt && W()
    }

    function c(t) {
        var e = parseFloat(t);
        return (e || 0 === e) && (t + "").match(ce).length < 2 ? e : A(t) ? t.trim() : t
    }

    function f(t) {
        return t
    }

    function N(t, e) {
        for (var r in e) r in t || (t[r] = e[r]);
        return t
    }

    function n(t, e) {
        for (var r in e) "__proto__" !== r && "constructor" !== r && "prototype" !== r && (t[r] = C(e[r]) ? n(t[r] || (t[r] = {}), e[r]) : e[r]);
        return t
    }

    function U(t, e) {
        var r, n = {};
        for (r in t) r in e || (n[r] = t[r]);
        return n
    }

    function H(t) {
        var n, e = t.parent || St,
            r = t.keyframes ? (n = ie(t.keyframes), function(t, e) {
                for (var r in e) r in t || "duration" === r && n || "ease" === r || (t[r] = e[r])
            }) : N;
        if (L(t.inherit))
            for (; e;) r(t, e.vars.defaults), e = e.parent || e._dp;
        return t
    }

    function d(t, e, r, n, i) {
        void 0 === r && (r = "_first");
        var o, s = t[n = void 0 === n ? "_last" : n];
        if (i)
            for (o = e[i]; s && s[i] > o;) s = s._prev;
        return s ? (e._next = s._next, s._next = e) : (e._next = t[r], t[r] = e), e._next ? e._next._prev = e : t[n] = e, e._prev = s, e.parent = e._dp = t, e
    }

    function g(t, e, r, n) {
        void 0 === r && (r = "_first"), void 0 === n && (n = "_last");
        var i = e._prev,
            o = e._next;
        i ? i._next = o : t[r] === e && (t[r] = o), o ? o._prev = i : t[n] === e && (t[n] = i), e._next = e._prev = e.parent = null
    }

    function j(t, e) {
        !t.parent || e && !t.parent.autoRemoveChildren || t.parent.remove(t), t._act = 0
    }

    function m(t, e) {
        if (t && (!e || e._end > t._dur || e._start < 0))
            for (var r = t; r;) r._dirty = 1, r = r.parent;
        return t
    }

    function _(t, e, r, n) {
        return t._startAt && (bt ? t._startAt.revert(de) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(e, !0, n))
    }

    function v(t) {
        return t._repeat ? vt(t._tTime, t = t.duration() + t._rDelay) * t : 0
    }

    function y(t, e) {
        return (t - e._start) * e._ts + (0 <= e._ts ? 0 : e._dirty ? e.totalDuration() : e._tDur)
    }

    function x(t) {
        return t._end = X(t._start + (t._tDur / Math.abs(t._ts || t._rts || Qt) || 0))
    }

    function w(t, e) {
        var r = t._dp;
        return r && r.smoothChildTiming && t._ts && (t._start = X(r._time - (0 < t._ts ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)), x(t), r._dirty || m(r, t)), t
    }

    function b(t, e) {
        var r;
        if ((e._time || e._initted && !e._dur) && (r = y(t.rawTime(), e), (!e._dur || Oe(0, e.totalDuration(), r) - e._tTime > Qt) && e.render(r, !0)), m(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
            if (t._dur < t.duration())
                for (r = t; r._dp;) 0 <= r.rawTime() && r.totalTime(r._tTime), r = r._dp;
            t._zTime = -Qt
        }
    }

    function q(t, e, r, n) {
        return e.parent && j(e), e._start = X((E(r) ? r : r || t !== St ? Me(t, r, e) : t._time) + e._delay), e._end = X(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)), d(t, e, "_first", "_last", t._sort ? "_start" : 0), Se(e) || (t._recent = e), n || b(t, e), t._ts < 0 && w(t, t._tTime), t
    }

    function V(t, e) {
        return (fe.ScrollTrigger || D("scrollTrigger", e)) && fe.ScrollTrigger.create(e, t)
    }

    function T(t, e, r, n, i) {
        return Ke(t, e, i), !t._initted || !r && t._pt && !bt && (t._dur && !1 !== t.vars.lazy || !t._dur && t.vars.lazy) && Ct !== Le.frame && (_e.push(t), t._lazy = [i, n])
    }

    function S(t, e, r, n) {
        var i = t._repeat,
            o = X(e) || 0,
            e = t._tTime / t._tDur;
        return e && !n && (t._time *= o / t._dur), t._dur = o, t._tDur = i ? i < 0 ? 1e10 : X(o * (i + 1) + t._rDelay * i) : o, 0 < e && !n && w(t, t._tTime = t._tDur * e), t.parent && x(t), r || m(t.parent, t), t
    }

    function k(t) {
        return t instanceof Ve ? m(t) : S(t, t._dur)
    }

    function M(t, e, r) {
        var n, i, o = E(e[1]),
            s = (o ? 2 : 1) + (t < 2 ? 0 : 1),
            a = e[s];
        if (o && (a.duration = e[1]), a.parent = r, t) {
            for (n = a, i = r; i && !("immediateRender" in n);) n = i.vars.defaults || {}, i = L(i.vars.inherit) && i.parent;
            a.immediateRender = L(n.immediateRender), t < 2 ? a.runBackwards = 1 : a.startAt = e[s - 1]
        }
        return new rr(e[0], a, e[1 + s])
    }

    function O(t, e) {
        return t || 0 === t ? e(t) : e
    }

    function G(t, e) {
        return A(t) && (e = he.exec(t)) ? e[1] : ""
    }

    function K(t, e) {
        return t && C(t) && "length" in t && (!e && !t.length || t.length - 1 in t && C(t[0])) && !t.nodeType && t !== kt
    }

    function Q(r) {
        return r = Ee(r)[0] || z("Invalid scope") || {},
            function(t) {
                var e = r.current || r.nativeElement || r;
                return Ee(t, e.querySelectorAll ? e : e === r ? z("Invalid scope") || Ot.createElement("div") : r)
            }
    }

    function Z(t) {
        return t.sort(function() {
            return .5 - Math.random()
        })
    }

    function $(t) {
        if (h(t)) return t;
        var p = C(t) ? t : {
                each: t
            },
            d = We(p.ease),
            g = p.from || 0,
            m = parseFloat(p.base) || 0,
            _ = {},
            t = 0 < g && g < 1,
            v = isNaN(g) || t,
            y = p.axis,
            w = g,
            x = g;
        return A(g) ? w = x = {
                center: .5,
                edges: .5,
                end: 1
            } [g] || 0 : !t && v && (w = g[0], x = g[1]),
            function(t, e, r) {
                var n, i, o, s, a, l, u, c, h = (r || p).length,
                    f = _[h];
                if (!f) {
                    if (!(c = "auto" === p.grid ? 0 : (p.grid || [1, Kt])[1])) {
                        for (l = -Kt; l < (l = r[c++].getBoundingClientRect().left) && c < h;);
                        c--
                    }
                    for (f = _[h] = [], n = v ? Math.min(c, h) * w - .5 : g % c, i = c === Kt ? 0 : v ? h * x / c - .5 : g / c | 0, u = Kt, a = l = 0; a < h; a++) o = a % c - n, s = i - (a / c | 0), f[a] = s = y ? Math.abs("y" === y ? s : o) : te(o * o + s * s), l < s && (l = s), s < u && (u = s);
                    "random" === g && Z(f), f.max = l - u, f.min = u, f.v = h = (parseFloat(p.amount) || parseFloat(p.each) * (h < c ? h - 1 : y ? "y" === y ? h / c : c : Math.max(c, h / c)) || 0) * ("edges" === g ? -1 : 1), f.b = h < 0 ? m - h : m, f.u = G(p.amount || p.each) || 0, d = d && h < 0 ? Ie(d) : d
                }
                return h = (f[t] - f.min) / f.max || 0, X(f.b + (d ? d(h) : h) * f.v) + f.u
            }
    }

    function J(r) {
        var n = Math.pow(10, ((r + "").split(".")[1] || "").length);
        return function(t) {
            var e = X(Math.round(parseFloat(t) / r) * r * n);
            return (e - e % 1) / n + (E(t) ? 0 : G(t))
        }
    }

    function tt(l, t) {
        var u, c, e = ie(l);
        return !e && C(l) && (u = e = l.radius || Kt, l.values ? (l = Ee(l.values), (c = !E(l[0])) && (u *= u)) : l = J(l.increment)), O(t, e ? h(l) ? function(t) {
            return c = l(t), Math.abs(c - t) <= u ? c : t
        } : function(t) {
            for (var e, r, n = parseFloat(c ? t.x : t), i = parseFloat(c ? t.y : 0), o = Kt, s = 0, a = l.length; a--;)(e = c ? (e = l[a].x - n) * e + (r = l[a].y - i) * r : Math.abs(l[a] - n)) < o && (o = e, s = a);
            return s = !u || o <= u ? l[s] : t, c || s === t || E(t) ? s : s + G(t)
        } : J(l))
    }

    function et(t, e, r, n) {
        return O(ie(t) ? !e : !0 === r ? !!(r = 0) : !n, function() {
            return ie(t) ? t[~~(Math.random() * t.length)] : (r = r || 1e-5) && (n = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) && Math.floor(Math.round((t - r / 2 + Math.random() * (e - t + .99 * r)) / r) * r * n) / n
        })
    }

    function rt(e, r, t) {
        return O(t, function(t) {
            return e[~~r(t)]
        })
    }

    function nt(t) {
        for (var e, r, n, i, o = 0, s = ""; ~(e = t.indexOf("random(", o));) n = t.indexOf(")", e), i = "[" === t.charAt(e + 7), r = t.substr(e + 7, n - e - 7).match(i ? ce : oe), s += t.substr(o, e - o) + et(i ? r : +r[0], i ? 0 : +r[1], +r[2] || 1e-5), o = n + 1;
        return s + t.substr(o, t.length - o)
    }

    function it(t, e, r) {
        var n, i, o, s = t.labels,
            a = Kt;
        for (n in s)(i = s[n] - e) < 0 == !!r && i && a > (i = Math.abs(i)) && (o = n, a = i);
        return o
    }

    function ot(t) {
        return j(t), t.scrollTrigger && t.scrollTrigger.kill(!!bt), t.progress() < 1 && wt(t, "onInterrupt"), t
    }

    function st(t) {
        if (o()) {
            var e = (t = !t.name && t.default || t).name,
                r = h(t),
                n = e && !r && t.init ? function() {
                    this._props = []
                } : t,
                i = {
                    init: a,
                    render: fr,
                    add: $e,
                    kill: dr,
                    modifier: pr,
                    rawVars: 0
                },
                r = {
                    targetTest: 0,
                    get: 0,
                    getSetter: lr,
                    aliases: {},
                    register: 0
                };
            if (Fe(), t !== n) {
                if (ye[e]) return;
                N(n, N(U(t, i), r)), _t(n.prototype, _t(i, U(t, r))), ye[n.prop = e] = n, t.targetTest && (be.push(n), me[e] = 1), e = ("css" === e ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin"
            }
            s(e, n), t.register && t.register(Ar, n, mr)
        } else Ce.push(t)
    }

    function at(t, e, r) {
        return (6 * (t += t < 0 ? 1 : 1 < t ? -1 : 0) < 1 ? e + (r - e) * t * 6 : t < .5 ? r : 3 * t < 2 ? e + (r - e) * (2 / 3 - t) * 6 : e) * Ae + .5 | 0
    }

    function lt(t, e, r) {
        var n, i, o, s, a, l, u, c = t ? E(t) ? [t >> 16, t >> 8 & Ae, t & Ae] : 0 : Re.black;
        if (!c) {
            if ("," === t.substr(-1) && (t = t.substr(0, t.length - 1)), Re[t]) c = Re[t];
            else if ("#" === t.charAt(0)) {
                if (9 === (t = t.length < 6 ? "#" + (n = t.charAt(1)) + n + (i = t.charAt(2)) + i + (o = t.charAt(3)) + o + (5 === t.length ? t.charAt(4) + t.charAt(4) : "") : t).length) return [(c = parseInt(t.substr(1, 6), 16)) >> 16, c >> 8 & Ae, c & Ae, parseInt(t.substr(7), 16) / 255];
                c = [(t = parseInt(t.substr(1), 16)) >> 16, t >> 8 & Ae, t & Ae]
            } else if ("hsl" === t.substr(0, 3))
                if (c = u = t.match(oe), e) {
                    if (~t.indexOf("=")) return c = t.match(se), r && c.length < 4 && (c[3] = 1), c
                } else s = +c[0] % 360 / 360, a = c[1] / 100, n = 2 * (l = c[2] / 100) - (i = l <= .5 ? l * (a + 1) : l + a - l * a), 3 < c.length && (c[3] *= 1), c[0] = at(s + 1 / 3, n, i), c[1] = at(s, n, i), c[2] = at(s - 1 / 3, n, i);
            else c = t.match(oe) || Re.transparent;
            c = c.map(Number)
        }
        return e && !u && (n = c[0] / Ae, i = c[1] / Ae, o = c[2] / Ae, l = ((t = Math.max(n, i, o)) + (e = Math.min(n, i, o))) / 2, t === e ? s = a = 0 : (u = t - e, a = .5 < l ? u / (2 - t - e) : u / (t + e), s = t === n ? (i - o) / u + (i < o ? 6 : 0) : t === i ? (o - n) / u + 2 : (n - i) / u + 4, s *= 60), c[0] = ~~(s + .5), c[1] = ~~(100 * a + .5), c[2] = ~~(100 * l + .5)), r && c.length < 4 && (c[3] = 1), c
    }

    function ut(t) {
        var e = [],
            r = [],
            n = -1;
        return t.split(De).forEach(function(t) {
            t = t.match(ae) || [];
            e.push.apply(e, t), r.push(n += t.length + 1)
        }), e.c = r, e
    }

    function ct(t, e, r) {
        var n, i, o, s, a = "",
            l = (t + a).match(De),
            u = e ? "hsla(" : "rgba(",
            c = 0;
        if (!l) return t;
        if (l = l.map(function(t) {
                return (t = lt(t, e, 1)) && u + (e ? t[0] + "," + t[1] + "%," + t[2] + "%," + t[3] : t.join(",")) + ")"
            }), r && (o = ut(t), (n = r.c).join(a) !== o.c.join(a)))
            for (s = (i = t.replace(De, "1").split(ae)).length - 1; c < s; c++) a += i[c] + (~n.indexOf(c) ? l.shift() || u + "0,0,0,0)" : (o.length ? o : l.length ? l : r).shift());
        if (!i)
            for (s = (i = t.split(De)).length - 1; c < s; c++) a += i[c] + l[c];
        return a + i[s]
    }

    function ht(t) {
        var e = t.join(" ");
        if (De.lastIndex = 0, De.test(e)) return e = ze.test(e), t[1] = ct(t[1], e), t[0] = ct(t[0], e, ut(t[1])), !0
    }

    function ft(t, e) {
        for (var r, n = t._first; n;) n instanceof Ve ? ft(n, e) : !n.vars.yoyoEase || n._yoyo && n._repeat || n._yoyo === e || (n.timeline ? ft(n.timeline, e) : (r = n._ease, n._ease = n._yEase, n._yEase = r, n._yoyo = e)), n = n._next
    }

    function pt(t, e, r, n) {
        void 0 === r && (r = function(t) {
            return 1 - e(1 - t)
        }), void 0 === n && (n = function(t) {
            return t < .5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2
        });
        var i, o = {
            easeIn: e,
            easeOut: r,
            easeInOut: n
        };
        return p(t, function(t) {
            for (var e in Ye[t] = fe[t] = o, Ye[i = t.toLowerCase()] = r, o) Ye[i + ("easeIn" === e ? ".in" : "easeOut" === e ? ".out" : ".inOut")] = Ye[t + "." + e] = o[e]
        }), 1
    }

    function dt(e) {
        return function(t) {
            return t < .5 ? (1 - e(1 - 2 * t)) / 2 : .5 + e(2 * (t - .5)) / 2
        }
    }

    function gt(r, t, e) {
        function n(t) {
            return 1 === t ? 1 : i * Math.pow(2, -10 * t) * re((t - o) * s) + 1
        }
        var i = 1 <= t ? t : 1,
            o = (s = (e || (r ? .3 : .45)) / (t < 1 ? t : 1)) / Zt * (Math.asin(1 / i) || 0),
            t = "out" === r ? n : "in" === r ? function(t) {
                return 1 - n(1 - t)
            } : dt(n),
            s = Zt / s;
        return t.config = function(t, e) {
            return gt(r, t, e)
        }, t
    }

    function mt(e, r) {
        function n(t) {
            return t ? --t * t * ((r + 1) * t + r) + 1 : 0
        }
        void 0 === r && (r = 1.70158);
        var t = "out" === e ? n : "in" === e ? function(t) {
            return 1 - n(1 - t)
        } : dt(n);
        return t.config = function(t) {
            return mt(e, t)
        }, t
    }

    function _t(t, e) {
        for (var r in e) t[r] = e[r];
        return t
    }

    function vt(t, e) {
        return e = Math.floor(t /= e), t && e === t ? e - 1 : e
    }

    function yt(e, t, r, n, i) {
        var o = t - e,
            s = n - r;
        return O(i, function(t) {
            return r + ((t - e) / o * s || 0)
        })
    }

    function wt(t, e, r) {
        var n = t.vars,
            i = n[e],
            o = Tt,
            s = t._ctx;
        return i && (e = n[e + "Params"], t = n.callbackScope || t, r && _e.length && W(), s && (Tt = s), t = e ? i.apply(t, e) : i.call(t), Tt = o, t)
    }
    var xt, bt, Tt, St, kt, Mt, Ot, Pt, Et, Ct, At, Rt, Dt, zt, Lt, Ft, Yt, Bt, Xt, It, Wt, Nt, Ut, Ht, jt, qt, Vt = {
            autoSleep: 120,
            force3D: "auto",
            nullTargetWarn: 1,
            units: {
                lineHeight: ""
            }
        },
        Gt = {
            duration: .5,
            overwrite: !1,
            delay: 0
        },
        Kt = 1e8,
        Qt = 1 / Kt,
        Zt = 2 * Math.PI,
        $t = Zt / 4,
        Jt = 0,
        te = Math.sqrt,
        ee = Math.cos,
        re = Math.sin,
        ne = "function" == typeof ArrayBuffer && ArrayBuffer.isView || function() {},
        ie = Array.isArray,
        oe = /(?:-?\.?\d|\.)+/gi,
        se = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
        ae = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
        le = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
        ue = /[+-]=-?[.\d]+/,
        ce = /[^,'"\[\]\s]+/gi,
        he = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
        fe = {},
        pe = {
            suppressEvents: !0,
            isStart: !0,
            kill: !1
        },
        de = {
            suppressEvents: !0,
            kill: !1
        },
        ge = {
            suppressEvents: !0
        },
        me = {},
        _e = [],
        ve = {},
        ye = {},
        we = {},
        xe = 30,
        be = [],
        Te = "",
        Se = function(t) {
            t = t.data;
            return "isFromStart" === t || "isStart" === t
        },
        ke = {
            _start: 0,
            endTime: a,
            totalDuration: a
        },
        Me = function t(e, r, n) {
            var i, o, s, a = e.labels,
                l = e._recent || ke,
                u = e.duration() >= Kt ? l.endTime(!1) : e._dur;
            return A(r) && (isNaN(r) || r in a) ? (o = r.charAt(0), s = "%" === r.substr(-1), i = r.indexOf("="), "<" === o || ">" === o ? (0 <= i && (r = r.replace(/=/, "")), ("<" === o ? l._start : l.endTime(0 <= l._repeat)) + (parseFloat(r.substr(1)) || 0) * (s ? (i < 0 ? l : n).totalDuration() / 100 : 1)) : i < 0 ? (r in a || (a[r] = u), a[r]) : (o = parseFloat(r.charAt(i - 1) + r.substr(i + 1)), s && n && (o = o / 100 * (ie(n) ? n[0] : n).totalDuration()), 1 < i ? t(e, r.substr(0, i - 1), n) + o : u + o)) : null == r ? u : +r
        },
        Oe = function(t, e, r) {
            return r < t ? t : e < r ? e : r
        },
        Pe = [].slice,
        Ee = function(t, e, r) {
            return Tt && !e && Tt.selector ? Tt.selector(t) : !A(t) || r || !Mt && Fe() ? ie(t) ? (n = r, void 0 === i && (i = []), t.forEach(function(t) {
                return A(t) && !n || K(t, 1) ? i.push.apply(i, Ee(t)) : i.push(t)
            }) || i) : K(t) ? Pe.call(t, 0) : t ? [t] : [] : Pe.call((e || Ot).querySelectorAll(t), 0);
            var n, i
        },
        Ce = [],
        Ae = 255,
        Re = {
            aqua: [0, Ae, Ae],
            lime: [0, Ae, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, Ae],
            navy: [0, 0, 128],
            white: [Ae, Ae, Ae],
            olive: [128, 128, 0],
            yellow: [Ae, Ae, 0],
            orange: [Ae, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [Ae, 0, 0],
            pink: [Ae, 192, 203],
            cyan: [0, Ae, Ae],
            transparent: [Ae, Ae, Ae, 0]
        },
        De = function() {
            var t, e = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
            for (t in Re) e += "|" + t + "\\b";
            return new RegExp(e + ")", "gi")
        }(),
        ze = /hsl[a]?\(/,
        Le = (Bt = Date.now, Xt = 500, It = 33, Wt = Bt(), Nt = Wt, Ht = Ut = 1e3 / 240, Lt = {
            time: 0,
            frame: 0,
            tick: function() {
                Ne(!0)
            },
            deltaRatio: function(t) {
                return Ft / (1e3 / (t || 60))
            },
            wake: function() {
                Et && (!Mt && o() && (kt = Mt = window, Ot = kt.document || {}, fe.gsap = Ar, (kt.gsapVersions || (kt.gsapVersions = [])).push(Ar.version), e(Pt || kt.GreenSockGlobals || !kt.gsap && kt || {}), zt = kt.requestAnimationFrame, Ce.forEach(st)), Rt && Lt.sleep(), Dt = zt || function(t) {
                    return setTimeout(t, Ht - 1e3 * Lt.time + 1 | 0)
                }, At = 1, Ne(2))
            },
            sleep: function() {
                (zt ? kt.cancelAnimationFrame : clearTimeout)(Rt), At = 0, Dt = a
            },
            lagSmoothing: function(t, e) {
                Xt = t || 1 / 0, It = Math.min(e || 33, Xt)
            },
            fps: function(t) {
                Ut = 1e3 / (t || 240), Ht = 1e3 * Lt.time + Ut
            },
            add: function(i, t, e) {
                var o = t ? function(t, e, r, n) {
                    i(t, e, r, n), Lt.remove(o)
                } : i;
                return Lt.remove(i), jt[e ? "unshift" : "push"](o), Fe(), o
            },
            remove: function(t, e) {
                ~(e = jt.indexOf(t)) && jt.splice(e, 1) && e <= Yt && Yt--
            },
            _listeners: jt = []
        }),
        Fe = function() {
            return !At && Le.wake()
        },
        Ye = {},
        Be = /^[\d.\-M][\d.\-,\s]/,
        Xe = /["']/g,
        Ie = function(e) {
            return function(t) {
                return 1 - e(1 - t)
            }
        },
        We = function(t, e) {
            return t && (h(t) ? t : Ye[t] || (o = ((r = t) + "").split("("), (s = Ye[o[0]]) && 1 < o.length && s.config ? s.config.apply(null, ~r.indexOf("{") ? [function(t) {
                for (var e, r, n, i = {}, o = t.substr(1, t.length - 3).split(":"), s = o[0], a = 1, l = o.length; a < l; a++) r = o[a], e = a !== l - 1 ? r.lastIndexOf(",") : r.length, n = r.substr(0, e), i[s] = isNaN(n) ? n.replace(Xe, "").trim() : +n, s = r.substr(e + 1).trim();
                return i
            }(o[1])] : (i = (n = r).indexOf("(") + 1, t = n.indexOf(")"), o = n.indexOf("(", i), n.substring(i, ~o && o < t ? n.indexOf(")", t + 1) : t).split(",").map(c))) : Ye._CE && Be.test(r) ? Ye._CE("", r) : s)) || e;
            var r, n, i, o, s
        };

    function Ne(t) {
        var e, r, n, i = Bt() - Nt,
            o = !0 === t;
        if (Xt < i && (Wt += i - It), (0 < (i = (r = (Nt += i) - Wt) - Ht) || o) && (n = ++Lt.frame, Ft = r - 1e3 * Lt.time, Lt.time = r /= 1e3, Ht += i + (Ut <= i ? 4 : Ut - i), e = 1), o || (Rt = Dt(Ne)), e)
            for (Yt = 0; Yt < jt.length; Yt++) jt[Yt](r, Ft, n, t)
    }

    function Ue(t) {
        return t < 1 / 2.75 ? qt * t * t : t < .7272727272727273 ? qt * Math.pow(t - 1.5 / 2.75, 2) + .75 : t < .9090909090909092 ? qt * (t -= 2.25 / 2.75) * t + .9375 : qt * Math.pow(t - 2.625 / 2.75, 2) + .984375
    }
    p("Linear,Quad,Cubic,Quart,Quint,Strong", function(t, e) {
        var r = e < 5 ? e + 1 : e;
        pt(t + ",Power" + (r - 1), e ? function(t) {
            return Math.pow(t, r)
        } : function(t) {
            return t
        }, function(t) {
            return 1 - Math.pow(1 - t, r)
        }, function(t) {
            return t < .5 ? Math.pow(2 * t, r) / 2 : 1 - Math.pow(2 * (1 - t), r) / 2
        })
    }), Ye.Linear.easeNone = Ye.none = Ye.Linear.easeIn, pt("Elastic", gt("in"), gt("out"), gt()), qt = 7.5625, pt("Bounce", function(t) {
        return 1 - Ue(1 - t)
    }, Ue), pt("Expo", function(t) {
        return t ? Math.pow(2, 10 * (t - 1)) : 0
    }), pt("Circ", function(t) {
        return -(te(1 - t * t) - 1)
    }), pt("Sine", function(t) {
        return 1 === t ? 1 : 1 - ee(t * $t)
    }), pt("Back", mt("in"), mt("out"), mt()), Ye.SteppedEase = Ye.steps = fe.SteppedEase = {
        config: function(t, e) {
            var r = 1 / (t = void 0 === t ? 1 : t),
                n = t + (e ? 0 : 1),
                i = e ? 1 : 0;
            return function(t) {
                return ((n * Oe(0, .99999999, t) | 0) + i) * r
            }
        }
    }, Gt.ease = Ye["quad.out"], p("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(t) {
        return Te += t + "," + t + "Params,"
    });
    var He = function(t, e) {
            this.id = Jt++, (t._gsap = this).target = t, this.harness = e, this.get = e ? e.get : l, this.set = e ? e.getSetter : lr
        },
        je = ((fi = qe.prototype).delay = function(t) {
            return t || 0 === t ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + t - this._delay), this._delay = t, this) : this._delay
        }, fi.duration = function(t) {
            return arguments.length ? this.totalDuration(0 < this._repeat ? t + (t + this._rDelay) * this._repeat : t) : this.totalDuration() && this._dur
        }, fi.totalDuration = function(t) {
            return arguments.length ? (this._dirty = 0, S(this, this._repeat < 0 ? t : (t - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur
        }, fi.totalTime = function(t, e) {
            if (Fe(), !arguments.length) return this._tTime;
            var r = this._dp;
            if (r && r.smoothChildTiming && this._ts) {
                for (w(this, t), !r._dp || r.parent || b(r, this); r && r.parent;) r.parent._time !== r._start + (0 <= r._ts ? r._tTime / r._ts : (r.totalDuration() - r._tTime) / -r._ts) && r.totalTime(r._tTime, !0), r = r.parent;
                !this.parent && this._dp.autoRemoveChildren && (0 < this._ts && t < this._tDur || this._ts < 0 && 0 < t || !this._tDur && !t) && q(this._dp, this, this._start - this._delay)
            }
            return (this._tTime !== t || !this._dur && !e || this._initted && Math.abs(this._zTime) === Qt || !t && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = t), u(this, t, e)), this
        }, fi.time = function(t, e) {
            return arguments.length ? this.totalTime(Math.min(this.totalDuration(), t + v(this)) % (this._dur + this._rDelay) || (t ? this._dur : 0), e) : this._time
        }, fi.totalProgress = function(t, e) {
            return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio
        }, fi.progress = function(t, e) {
            return arguments.length ? this.totalTime(this.duration() * (!this._yoyo || 1 & this.iteration() ? t : 1 - t) + v(this), e) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio
        }, fi.iteration = function(t, e) {
            var r = this.duration() + this._rDelay;
            return arguments.length ? this.totalTime(this._time + (t - 1) * r, e) : this._repeat ? vt(this._tTime, r) + 1 : 1
        }, fi.timeScale = function(t) {
            if (!arguments.length) return this._rts === -Qt ? 0 : this._rts;
            if (this._rts === t) return this;
            var e = this.parent && this._ts ? y(this.parent._time, this) : this._tTime;
            return this._rts = +t || 0, this._ts = this._ps || t === -Qt ? 0 : this._rts, this.totalTime(Oe(-Math.abs(this._delay), this._tDur, e), !0), x(this),
                function(t) {
                    for (var e = t.parent; e && e.parent;) e._dirty = 1, e.totalDuration(), e = e.parent;
                    return t
                }(this)
        }, fi.paused = function(t) {
            return arguments.length ? (this._ps !== t && ((this._ps = t) ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (Fe(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, 1 === this.progress() && Math.abs(this._zTime) !== Qt && (this._tTime -= Qt)))), this) : this._ps
        }, fi.startTime = function(t) {
            if (arguments.length) {
                this._start = t;
                var e = this.parent || this._dp;
                return !e || !e._sort && this.parent || q(e, this, t - this._delay), this
            }
            return this._start
        }, fi.endTime = function(t) {
            return this._start + (L(t) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1)
        }, fi.rawTime = function(t) {
            var e = this.parent || this._dp;
            return e ? t && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? y(e.rawTime(t), this) : this._tTime : this._tTime
        }, fi.revert = function(t) {
            var e = bt;
            return bt = t = void 0 === t ? ge : t, (this._initted || this._startAt) && (this.timeline && this.timeline.revert(t), this.totalTime(-.01, t.suppressEvents)), "nested" !== this.data && !1 !== t.kill && this.kill(), bt = e, this
        }, fi.globalTime = function(t) {
            for (var e = this, r = arguments.length ? t : e.rawTime(); e;) r = e._start + r / (e._ts || 1), e = e._dp;
            return !this.parent && this._sat ? this._sat.vars.immediateRender ? -1 : this._sat.globalTime(t) : r
        }, fi.repeat = function(t) {
            return arguments.length ? (this._repeat = t === 1 / 0 ? -2 : t, k(this)) : -2 === this._repeat ? 1 / 0 : this._repeat
        }, fi.repeatDelay = function(t) {
            if (arguments.length) {
                var e = this._time;
                return this._rDelay = t, k(this), e ? this.time(e) : this
            }
            return this._rDelay
        }, fi.yoyo = function(t) {
            return arguments.length ? (this._yoyo = t, this) : this._yoyo
        }, fi.seek = function(t, e) {
            return this.totalTime(Me(this, t), L(e))
        }, fi.restart = function(t, e) {
            return this.play().totalTime(t ? -this._delay : 0, L(e))
        }, fi.play = function(t, e) {
            return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
        }, fi.reverse = function(t, e) {
            return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
        }, fi.pause = function(t, e) {
            return null != t && this.seek(t, e), this.paused(!0)
        }, fi.resume = function() {
            return this.paused(!1)
        }, fi.reversed = function(t) {
            return arguments.length ? (!!t !== this.reversed() && this.timeScale(-this._rts || (t ? -Qt : 0)), this) : this._rts < 0
        }, fi.invalidate = function() {
            return this._initted = this._act = 0, this._zTime = -Qt, this
        }, fi.isActive = function() {
            var t, e = this.parent || this._dp,
                r = this._start;
            return !(e && !(this._ts && this._initted && e.isActive() && (t = e.rawTime(!0)) >= r && t < this.endTime(!0) - Qt))
        }, fi.eventCallback = function(t, e, r) {
            var n = this.vars;
            return 1 < arguments.length ? (e ? (n[t] = e, r && (n[t + "Params"] = r), "onUpdate" === t && (this._onUpdate = e)) : delete n[t], this) : n[t]
        }, fi.then = function(n) {
            var i = this;
            return new Promise(function(e) {
                function t() {
                    var t = i.then;
                    i.then = null, h(r) && (r = r(i)) && (r.then || r === i) && (i.then = t), e(r), i.then = t
                }
                var r = h(n) ? n : f;
                i._initted && 1 === i.totalProgress() && 0 <= i._ts || !i._tTime && i._ts < 0 ? t() : i._prom = t
            })
        }, fi.kill = function() {
            ot(this)
        }, qe);

    function qe(t) {
        this.vars = t, this._delay = +t.delay || 0, (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) && (this._rDelay = t.repeatDelay || 0, this._yoyo = !!t.yoyo || !!t.yoyoEase), this._ts = 1, S(this, +t.duration, 1, 1), this.data = t.data, Tt && (this._ctx = Tt).data.push(this), At || Le.wake()
    }
    N(je.prototype, {
        _time: 0,
        _start: 0,
        _end: 0,
        _tTime: 0,
        _tDur: 0,
        _dirty: 0,
        _repeat: 0,
        _yoyo: !1,
        parent: null,
        _initted: !1,
        _rDelay: 0,
        _ts: 1,
        _dp: 0,
        ratio: 0,
        _zTime: -Qt,
        _prom: 0,
        _ps: !1,
        _rts: 1
    });
    var Ve = function(n) {
        function t(t, e) {
            var r;
            return (r = n.call(this, t = void 0 === t ? {} : t) || this).labels = {}, r.smoothChildTiming = !!t.smoothChildTiming, r.autoRemoveChildren = !!t.autoRemoveChildren, r._sort = L(t.sortChildren), St && q(t.parent || St, P(r), e), t.reversed && r.reverse(), t.paused && r.paused(!0), t.scrollTrigger && V(P(r), t.scrollTrigger), r
        }
        r(t, n);
        var e = t.prototype;
        return e.to = function(t, e, r) {
            return M(0, arguments, this), this
        }, e.from = function(t, e, r) {
            return M(1, arguments, this), this
        }, e.fromTo = function(t, e, r, n) {
            return M(2, arguments, this), this
        }, e.set = function(t, e, r) {
            return e.duration = 0, e.parent = this, H(e).repeatDelay || (e.repeat = 0), e.immediateRender = !!e.immediateRender, new rr(t, e, Me(this, r), 1), this
        }, e.call = function(t, e, r) {
            return q(this, rr.delayedCall(0, t, e), r)
        }, e.staggerTo = function(t, e, r, n, i, o, s) {
            return r.duration = e, r.stagger = r.stagger || n, r.onComplete = o, r.onCompleteParams = s, r.parent = this, new rr(t, r, Me(this, i)), this
        }, e.staggerFrom = function(t, e, r, n, i, o, s) {
            return r.runBackwards = 1, H(r).immediateRender = L(r.immediateRender), this.staggerTo(t, e, r, n, i, o, s)
        }, e.staggerFromTo = function(t, e, r, n, i, o, s, a) {
            return n.startAt = r, H(n).immediateRender = L(n.immediateRender), this.staggerTo(t, e, n, i, o, s, a)
        }, e.render = function(t, e, r) {
            var n, i, o, s, a, l, u, c, h, f, p = this._time,
                d = this._dirty ? this.totalDuration() : this._tDur,
                g = this._dur,
                m = t <= 0 ? 0 : X(t),
                _ = this._zTime < 0 != t < 0 && (this._initted || !g);
            if ((m = this !== St && d < m && 0 <= t ? d : m) !== this._tTime || r || _) {
                if (p !== this._time && g && (m += this._time - p, t += this._time - p), n = m, c = this._start, a = !(u = this._ts), _ && (g || (p = this._zTime), !t && e || (this._zTime = t)), this._repeat) {
                    if (v = this._yoyo, s = g + this._rDelay, this._repeat < -1 && t < 0) return this.totalTime(100 * s + t, e, r);
                    if (n = X(m % s), m === d ? (o = this._repeat, n = g) : ((o = ~~(m / s)) && o === m / s && (n = g, o--), g < n && (n = g)), h = vt(this._tTime, s), v && 1 & o && (n = g - n, f = 1), o !== (h = !p && this._tTime && h !== o && this._tTime - h * s - this._dur <= 0 ? o : h) && !this._lock) {
                        var _ = v && 1 & h,
                            v = _ === (v && 1 & o),
                            p = (_ = o < h ? !_ : _) ? 0 : g;
                        if (this._lock = 1, this.render(p || (f ? 0 : X(o * s)), e, !g)._lock = 0, this._tTime = m, !e && this.parent && wt(this, "onRepeat"), this.vars.repeatRefresh && !f && (this.invalidate()._lock = 1), p && p !== this._time || a != !this._ts || this.vars.onRepeat && !this.parent && !this._act) return this;
                        if (g = this._dur, d = this._tDur, v && (this._lock = 2, this.render(p = _ ? g : -1e-4, !0), this.vars.repeatRefresh && !f && this.invalidate()), this._lock = 0, !this._ts && !a) return this;
                        ft(this, f)
                    }
                }
                if (this._hasPause && !this._forcing && this._lock < 2 && (l = function(t, e, r) {
                        var n;
                        if (e < r)
                            for (n = t._first; n && n._start <= r;) {
                                if ("isPause" === n.data && n._start > e) return n;
                                n = n._next
                            } else
                                for (n = t._last; n && n._start >= r;) {
                                    if ("isPause" === n.data && n._start < e) return n;
                                    n = n._prev
                                }
                    }(this, X(p), X(n))) && (m -= n - (n = l._start)), this._tTime = m, this._time = n, this._act = !u, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = t, p = 0), !p && n && !e && !o && (wt(this, "onStart"), this._tTime !== m)) return this;
                if (p <= n && 0 <= t)
                    for (y = this._first; y;) {
                        if (i = y._next, (y._act || n >= y._start) && y._ts && l !== y) {
                            if (y.parent !== this) return this.render(t, e, r);
                            if (y.render(0 < y._ts ? (n - y._start) * y._ts : (y._dirty ? y.totalDuration() : y._tDur) + (n - y._start) * y._ts, e, r), n !== this._time || !this._ts && !a) {
                                l = 0, i && (m += this._zTime = -Qt);
                                break
                            }
                        }
                        y = i
                    } else
                        for (var y = this._last, w = t < 0 ? t : n; y;) {
                            if (i = y._prev, (y._act || w <= y._end) && y._ts && l !== y) {
                                if (y.parent !== this) return this.render(t, e, r);
                                if (y.render(0 < y._ts ? (w - y._start) * y._ts : (y._dirty ? y.totalDuration() : y._tDur) + (w - y._start) * y._ts, e, r || bt && (y._initted || y._startAt)), n !== this._time || !this._ts && !a) {
                                    l = 0, i && (m += this._zTime = w ? -Qt : Qt);
                                    break
                                }
                            }
                            y = i
                        }
                if (l && !e && (this.pause(), l.render(p <= n ? 0 : -Qt)._zTime = p <= n ? 1 : -1, this._ts)) return this._start = c, x(this), this.render(t, e, r);
                this._onUpdate && !e && wt(this, "onUpdate", !0), (m === d && this._tTime >= this.totalDuration() || !m && p) && (c !== this._start && Math.abs(u) === Math.abs(this._ts) || this._lock || (!t && g || !(m === d && 0 < this._ts || !m && this._ts < 0) || j(this, 1), e || t < 0 && !p || !m && !p && d || (wt(this, m === d && 0 <= t ? "onComplete" : "onReverseComplete", !0), !this._prom || m < d && 0 < this.timeScale() || this._prom())))
            }
            return this
        }, e.add = function(t, e) {
            var r = this;
            if (E(e) || (e = Me(this, e, t)), !(t instanceof je)) {
                if (ie(t)) return t.forEach(function(t) {
                    return r.add(t, e)
                }), this;
                if (A(t)) return this.addLabel(t, e);
                if (!h(t)) return this;
                t = rr.delayedCall(0, t)
            }
            return this !== t ? q(this, t, e) : this
        }, e.getChildren = function(t, e, r, n) {
            void 0 === t && (t = !0), void 0 === e && (e = !0), void 0 === r && (r = !0), void 0 === n && (n = -Kt);
            for (var i = [], o = this._first; o;) o._start >= n && (o instanceof rr ? e && i.push(o) : (r && i.push(o), t && i.push.apply(i, o.getChildren(!0, e, r)))), o = o._next;
            return i
        }, e.getById = function(t) {
            for (var e = this.getChildren(1, 1, 1), r = e.length; r--;)
                if (e[r].vars.id === t) return e[r]
        }, e.remove = function(t) {
            return A(t) ? this.removeLabel(t) : h(t) ? this.killTweensOf(t) : (g(this, t), t === this._recent && (this._recent = this._last), m(this))
        }, e.totalTime = function(t, e) {
            return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = X(Le.time - (0 < this._ts ? t / this._ts : (this.totalDuration() - t) / -this._ts))), n.prototype.totalTime.call(this, t, e), this._forcing = 0, this) : this._tTime
        }, e.addLabel = function(t, e) {
            return this.labels[t] = Me(this, e), this
        }, e.removeLabel = function(t) {
            return delete this.labels[t], this
        }, e.addPause = function(t, e, r) {
            r = rr.delayedCall(0, e || a, r);
            return r.data = "isPause", this._hasPause = 1, q(this, r, Me(this, t))
        }, e.removePause = function(t) {
            var e = this._first;
            for (t = Me(this, t); e;) e._start === t && "isPause" === e.data && j(e), e = e._next
        }, e.killTweensOf = function(t, e, r) {
            for (var n = this.getTweensOf(t, r), i = n.length; i--;) Qe !== n[i] && n[i].kill(t, e);
            return this
        }, e.getTweensOf = function(t, e) {
            for (var r, n = [], i = Ee(t), o = this._first, s = E(e); o;) o instanceof rr ? function(t, e) {
                for (var r = e.length, n = 0; t.indexOf(e[n]) < 0 && ++n < r;);
                return n < r
            }(o._targets, i) && (s ? (!Qe || o._initted && o._ts) && o.globalTime(0) <= e && o.globalTime(o.totalDuration()) > e : !e || o.isActive()) && n.push(o) : (r = o.getTweensOf(i, e)).length && n.push.apply(n, r), o = o._next;
            return n
        }, e.tweenTo = function(t, e) {
            e = e || {};
            var r, n = this,
                i = Me(n, t),
                o = e.startAt,
                s = e.onStart,
                a = e.onStartParams,
                t = e.immediateRender,
                l = rr.to(n, N({
                    ease: e.ease || "none",
                    lazy: !1,
                    immediateRender: !1,
                    time: i,
                    overwrite: "auto",
                    duration: e.duration || Math.abs((i - (o && "time" in o ? o.time : n._time)) / n.timeScale()) || Qt,
                    onStart: function() {
                        var t;
                        n.pause(), r || (t = e.duration || Math.abs((i - (o && "time" in o ? o.time : n._time)) / n.timeScale()), l._dur !== t && S(l, t, 0, 1).render(l._time, !0, !0), r = 1), s && s.apply(l, a || [])
                    }
                }, e));
            return t ? l.render(0) : l
        }, e.tweenFromTo = function(t, e, r) {
            return this.tweenTo(e, N({
                startAt: {
                    time: Me(this, t)
                }
            }, r))
        }, e.recent = function() {
            return this._recent
        }, e.nextLabel = function(t) {
            return void 0 === t && (t = this._time), it(this, Me(this, t))
        }, e.previousLabel = function(t) {
            return void 0 === t && (t = this._time), it(this, Me(this, t), 1)
        }, e.currentLabel = function(t) {
            return arguments.length ? this.seek(t, !0) : this.previousLabel(this._time + Qt)
        }, e.shiftChildren = function(t, e, r) {
            void 0 === r && (r = 0);
            for (var n, i = this._first, o = this.labels; i;) i._start >= r && (i._start += t, i._end += t), i = i._next;
            if (e)
                for (n in o) o[n] >= r && (o[n] += t);
            return m(this)
        }, e.invalidate = function(t) {
            var e = this._first;
            for (this._lock = 0; e;) e.invalidate(t), e = e._next;
            return n.prototype.invalidate.call(this, t)
        }, e.clear = function(t) {
            void 0 === t && (t = !0);
            for (var e, r = this._first; r;) e = r._next, this.remove(r), r = e;
            return this._dp && (this._time = this._tTime = this._pTime = 0), t && (this.labels = {}), m(this)
        }, e.totalDuration = function(t) {
            var e, r, n, i = 0,
                o = this,
                s = o._last,
                a = Kt;
            if (arguments.length) return o.timeScale((o._repeat < 0 ? o.duration() : o.totalDuration()) / (o.reversed() ? -t : t));
            if (o._dirty) {
                for (n = o.parent; s;) e = s._prev, s._dirty && s.totalDuration(), a < (r = s._start) && o._sort && s._ts && !o._lock ? (o._lock = 1, q(o, s, r - s._delay, 1)._lock = 0) : a = r, r < 0 && s._ts && (i -= r, (!n && !o._dp || n && n.smoothChildTiming) && (o._start += r / o._ts, o._time -= r, o._tTime -= r), o.shiftChildren(-r, !1, -1 / 0), a = 0), s._end > i && s._ts && (i = s._end), s = e;
                S(o, o === St && o._time > i ? o._time : i, 1, 1), o._dirty = 0
            }
            return o._tDur
        }, t.updateRoot = function(t) {
            if (St._ts && (u(St, y(t, St)), Ct = Le.frame), Le.frame >= xe) {
                xe += Vt.autoSleep || 120;
                var e = St._first;
                if ((!e || !e._ts) && Vt.autoSleep && Le._listeners.length < 2) {
                    for (; e && !e._ts;) e = e._next;
                    e || Le.sleep()
                }
            }
        }, t
    }(je);

    function Ge(t, e, r, n, i, o) {
        var s, a, l, u;
        if (ye[t] && !1 !== (s = new ye[t]).init(i, s.rawVars ? e[t] : function(t, e, r, n, i) {
                if (!C(t = h(t) ? Je(t, i, e, r, n) : t) || t.style && t.nodeType || ie(t) || ne(t)) return A(t) ? Je(t, i, e, r, n) : t;
                var o, s = {};
                for (o in t) s[o] = Je(t[o], i, e, r, n);
                return s
            }(e[t], n, i, o, r), r, n, o) && (r._pt = a = new mr(r._pt, i, t, 0, 1, s.render, s, 0, s.priority), r !== Cr))
            for (l = r._ptLookup[r._targets.indexOf(i)], u = s._props.length; u--;) l[s._props[u]] = a;
        return s
    }
    N(Ve.prototype, {
        _lock: 0,
        _hasPause: 0,
        _forcing: 0
    });

    function Ke(t, e, r) {
        var n, i, o, s, a, l, u, c, h, f, p, d, g, m = t.vars,
            _ = m.ease,
            v = m.startAt,
            y = m.immediateRender,
            w = m.lazy,
            x = m.onUpdate,
            b = m.onUpdateParams,
            T = m.callbackScope,
            S = m.runBackwards,
            k = m.yoyoEase,
            M = m.keyframes,
            O = m.autoRevert,
            P = t._dur,
            E = t._startAt,
            C = t._targets,
            A = t.parent,
            R = A && "nested" === A.data ? A.vars.targets : C,
            D = "auto" === t._overwrite && !xt,
            z = t.timeline;
        if (t._ease = We(_ = !(!z || M && _) ? "none" : _, Gt.ease), t._yEase = k ? Ie(We(!0 === k ? _ : k, Gt.ease)) : 0, k && t._yoyo && !t._repeat && (k = t._yEase, t._yEase = t._ease, t._ease = k), t._from = !z && !!m.runBackwards, !z || M && !m.stagger) {
            if (d = (c = C[0] ? Y(C[0]).harness : 0) && m[c.prop], n = U(m, me), E && (E._zTime < 0 && E.progress(1), e < 0 && S && y && !O ? E.render(-1, !0) : E.revert(S && P ? de : pe), E._lazy = 0), v) {
                if (j(t._startAt = rr.set(C, N({
                        data: "isStart",
                        overwrite: !1,
                        parent: A,
                        immediateRender: !0,
                        lazy: !E && L(w),
                        startAt: null,
                        delay: 0,
                        onUpdate: x,
                        onUpdateParams: b,
                        callbackScope: T,
                        stagger: 0
                    }, v))), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (bt || !y && !O) && t._startAt.revert(de), y && P && e <= 0 && r <= 0) return void(e && (t._zTime = e))
            } else if (S && P && !E)
                if (o = N({
                        overwrite: !1,
                        data: "isFromStart",
                        lazy: (y = e ? !1 : y) && !E && L(w),
                        immediateRender: y,
                        stagger: 0,
                        parent: A
                    }, n), d && (o[c.prop] = d), j(t._startAt = rr.set(C, o)), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (bt ? t._startAt.revert(de) : t._startAt.render(-1, !0)), t._zTime = e, y) {
                    if (!e) return
                } else Ke(t._startAt, Qt, Qt);
            for (t._pt = t._ptCache = 0, w = P && L(w) || w && !P, i = 0; i < C.length; i++) {
                if (u = (a = C[i])._gsap || F(C)[i]._gsap, t._ptLookup[i] = f = {}, ve[u.id] && _e.length && W(), p = R === C ? i : R.indexOf(a), c && !1 !== (h = new c).init(a, d || n, t, p, R) && (t._pt = s = new mr(t._pt, a, h.name, 0, 1, h.render, h, 0, h.priority), h._props.forEach(function(t) {
                        f[t] = s
                    }), h.priority && (l = 1)), !c || d)
                    for (o in n) ye[o] && (h = Ge(o, n, t, p, a, R)) ? h.priority && (l = 1) : f[o] = s = $e.call(t, a, o, "get", n[o], p, R, 0, m.stringFilter);
                t._op && t._op[i] && t.kill(a, t._op[i]), D && t._pt && (Qe = t, St.killTweensOf(a, f, t.globalTime(e)), g = !t.parent, Qe = 0), t._pt && w && (ve[u.id] = 1)
            }
            l && gr(t), t._onInit && t._onInit(t)
        }
        t._onUpdate = x, t._initted = (!t._op || t._pt) && !g, M && e <= 0 && z.render(Kt, !0, !0)
    }
    var Qe, Ze, $e = function(t, e, r, n, i, o, s, a, l, u) {
            h(n) && (n = n(i || 0, t, o));
            var c, i = t[e],
                o = "get" !== r ? r : h(i) ? l ? t[e.indexOf("set") || !h(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](l) : t[e]() : i,
                r = h(i) ? l ? ar : sr : or;
            if (A(n) && ("=" === (n = ~n.indexOf("random(") ? nt(n) : n).charAt(1) && (!(c = I(o, n) + (G(o) || 0)) && 0 !== c || (n = c))), !u || o !== n || Ze) return isNaN(o * n) || "" === n ? (i || e in t || D(e, n), function(t, e, r, n, i, o, s) {
                var a, l, u, c, h, f = new mr(this._pt, t, e, 0, 1, hr, null, i),
                    p = 0,
                    d = 0;
                for (f.b = r, f.e = n, r += "", (i = ~(n += "").indexOf("random(")) && (n = nt(n)), o && (o(o = [r, n], t, e), r = o[0], n = o[1]), a = r.match(le) || []; h = le.exec(n);) u = h[0], c = n.substring(p, h.index), l ? l = (l + 1) % 5 : "rgba(" === c.substr(-5) && (l = 1), u !== a[d++] && (h = parseFloat(a[d - 1]) || 0, f._pt = {
                    _next: f._pt,
                    p: c || 1 === d ? c : ",",
                    s: h,
                    c: "=" === u.charAt(1) ? I(h, u) - h : parseFloat(u) - h,
                    m: l && l < 4 ? Math.round : 0
                }, p = le.lastIndex);
                return f.c = p < n.length ? n.substring(p, n.length) : "", f.fp = s, (ue.test(n) || i) && (f.e = 0), this._pt = f
            }.call(this, t, e, o, n, r, a || Vt.stringFilter, l)) : (c = new mr(this._pt, t, e, +o || 0, n - (o || 0), "boolean" == typeof i ? cr : ur, 0, r), l && (c.fp = l), s && c.modifier(s, this, t), this._pt = c)
        },
        Je = function(t, e, r, n, i) {
            return h(t) ? t.call(e, r, n, i) : A(t) && ~t.indexOf("random(") ? nt(t) : t
        },
        tr = Te + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
        er = {};
    p(tr + ",id,stagger,delay,duration,paused,scrollTrigger", function(t) {
        return er[t] = 1
    });
    var rr = function(O) {
        function i(t, e, r, n) {
            var i;
            "number" == typeof e && (r.duration = e, e = r, r = null);
            var o, s, a, l, u, c, h, f, p = (i = O.call(this, n ? e : H(e)) || this).vars,
                d = p.duration,
                g = p.delay,
                m = p.immediateRender,
                _ = p.stagger,
                v = p.overwrite,
                y = p.keyframes,
                w = p.defaults,
                n = p.scrollTrigger,
                x = p.yoyoEase,
                p = e.parent || St,
                b = (ie(t) || ne(t) ? E(t[0]) : "length" in e) ? [t] : Ee(t);
            if (i._targets = b.length ? F(b) : z("GSAP target " + t + " not found. https://greensock.com", !Vt.nullTargetWarn) || [], i._ptLookup = [], i._overwrite = v, y || _ || R(d) || R(g)) {
                if (e = i.vars, (o = i.timeline = new Ve({
                        data: "nested",
                        defaults: w || {},
                        targets: p && "nested" === p.data ? p.vars.targets : b
                    })).kill(), o.parent = o._dp = P(i), o._start = 0, _ || R(d) || R(g)) {
                    if (l = b.length, h = _ && $(_), C(_))
                        for (u in _) ~tr.indexOf(u) && ((f = f || {})[u] = _[u]);
                    for (s = 0; s < l; s++)(a = U(e, er)).stagger = 0, x && (a.yoyoEase = x), f && _t(a, f), c = b[s], a.duration = +Je(d, P(i), s, c, b), a.delay = (+Je(g, P(i), s, c, b) || 0) - i._delay, !_ && 1 === l && a.delay && (i._delay = g = a.delay, i._start += g, a.delay = 0), o.to(c, a, h ? h(s, c, b) : 0), o._ease = Ye.none;
                    o.duration() ? d = g = 0 : i.timeline = 0
                } else if (y) {
                    H(N(o.vars.defaults, {
                        ease: "none"
                    })), o._ease = We(y.ease || e.ease || "none");
                    var T, S, k, M = 0;
                    if (ie(y)) y.forEach(function(t) {
                        return o.to(b, t, ">")
                    }), o.duration();
                    else {
                        for (u in a = {}, y) "ease" === u || "easeEach" === u || function(t, r, e, n) {
                            var i, o, s = r.ease || n || "power1.inOut";
                            if (ie(r)) o = e[t] || (e[t] = []), r.forEach(function(t, e) {
                                return o.push({
                                    t: e / (r.length - 1) * 100,
                                    v: t,
                                    e: s
                                })
                            });
                            else
                                for (i in r) o = e[i] || (e[i] = []), "ease" === i || o.push({
                                    t: parseFloat(t),
                                    v: r[i],
                                    e: s
                                })
                        }(u, y[u], a, y.easeEach);
                        for (u in a)
                            for (T = a[u].sort(function(t, e) {
                                    return t.t - e.t
                                }), s = M = 0; s < T.length; s++)(k = {
                                ease: (S = T[s]).e,
                                duration: (S.t - (s ? T[s - 1].t : 0)) / 100 * d
                            })[u] = S.v, o.to(b, k, M), M += k.duration;
                        o.duration() < d && o.to({}, {
                            duration: d - o.duration()
                        })
                    }
                }
                d || i.duration(d = o.duration())
            } else i.timeline = 0;
            return !0 !== v || xt || (Qe = P(i), St.killTweensOf(b), Qe = 0), q(p, P(i), r), e.reversed && i.reverse(), e.paused && i.paused(!0), (m || !d && !y && i._start === X(p._time) && L(m) && function t(e) {
                return !e || e._ts && t(e.parent)
            }(P(i)) && "nested" !== p.data) && (i._tTime = -Qt, i.render(Math.max(0, -g) || 0)), n && V(P(i), n), i
        }
        r(i, O);
        var t = i.prototype;
        return t.render = function(t, e, r) {
            var n, i, o, s, a, l, u, c, h, f = this._time,
                p = this._tDur,
                d = this._dur,
                g = t < 0,
                m = p - Qt < t && !g ? p : t < Qt ? 0 : t;
            if (d) {
                if (m !== this._tTime || !t || r || !this._initted && this._tTime || this._startAt && this._zTime < 0 != g) {
                    if (n = m, c = this.timeline, this._repeat) {
                        if (s = d + this._rDelay, this._repeat < -1 && g) return this.totalTime(100 * s + t, e, r);
                        if (n = X(m % s), m === p ? (o = this._repeat, n = d) : ((o = ~~(m / s)) && o === m / s && (n = d, o--), d < n && (n = d)), (l = this._yoyo && 1 & o) && (h = this._yEase, n = d - n), a = vt(this._tTime, s), n === f && !r && this._initted) return this._tTime = m, this;
                        o !== a && (c && this._yEase && ft(c, l), !this.vars.repeatRefresh || l || this._lock || (this._lock = r = 1, this.render(X(s * o), !0).invalidate()._lock = 0))
                    }
                    if (!this._initted) {
                        if (T(this, g ? t : n, r, e, m)) return this._tTime = 0, this;
                        if (f !== this._time) return this;
                        if (d !== this._dur) return this.render(t, e, r)
                    }
                    if (this._tTime = m, this._time = n, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = u = (h || this._ease)(n / d), this._from && (this.ratio = u = 1 - u), n && !f && !e && !o && (wt(this, "onStart"), this._tTime !== m)) return this;
                    for (i = this._pt; i;) i.r(u, i.d), i = i._next;
                    c && c.render(t < 0 ? t : !n && l ? -Qt : c._dur * c._ease(n / this._dur), e, r) || this._startAt && (this._zTime = t), this._onUpdate && !e && (g && _(this, t, 0, r), wt(this, "onUpdate")), this._repeat && o !== a && this.vars.onRepeat && !e && this.parent && wt(this, "onRepeat"), m !== this._tDur && m || this._tTime !== m || (g && !this._onUpdate && _(this, t, 0, !0), !t && d || !(m === this._tDur && 0 < this._ts || !m && this._ts < 0) || j(this, 1), e || g && !f || !(m || f || l) || (wt(this, m === p ? "onComplete" : "onReverseComplete", !0), !this._prom || m < p && 0 < this.timeScale() || this._prom()))
                }
            } else ! function(t, e, r, n) {
                var i, o, s = t.ratio,
                    a = e < 0 || !e && (!t._start && function t(e) {
                        e = e.parent;
                        return e && e._ts && e._initted && !e._lock && (e.rawTime() < 0 || t(e))
                    }(t) && (t._initted || !Se(t)) || (t._ts < 0 || t._dp._ts < 0) && !Se(t)) ? 0 : 1,
                    l = t._rDelay,
                    u = 0;
                if (l && t._repeat && (u = Oe(0, t._tDur, e), o = vt(u, l), t._yoyo && 1 & o && (a = 1 - a), o !== vt(t._tTime, l) && (s = 1 - a, t.vars.repeatRefresh && t._initted && t.invalidate())), a !== s || bt || n || t._zTime === Qt || !e && t._zTime) {
                    if (t._initted || !T(t, e, n, r, u)) {
                        for (n = t._zTime, t._zTime = e || (r ? Qt : 0), r = r || e && !n, t.ratio = a, t._from && (a = 1 - a), t._time = 0, t._tTime = u, i = t._pt; i;) i.r(a, i.d), i = i._next;
                        e < 0 && _(t, e, 0, !0), t._onUpdate && !r && wt(t, "onUpdate"), u && t._repeat && !r && t.parent && wt(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === a && (a && j(t, 1), r || bt || (wt(t, a ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()))
                    }
                } else t._zTime || (t._zTime = e)
            }(this, t, e, r);
            return this
        }, t.targets = function() {
            return this._targets
        }, t.invalidate = function(t) {
            return t && this.vars.runBackwards || (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(t), O.prototype.invalidate.call(this, t)
        }, t.resetTo = function(t, e, r, n) {
            At || Le.wake(), this._ts || this.play();
            var i, o = Math.min(this._dur, (this._dp._time - this._start) * this._ts);
            return this._initted || Ke(this, o), i = this._ease(o / this._dur),
                function(t, e, r, n, i, o, s) {
                    var a, l, u, c, h = (t._pt && t._ptCache || (t._ptCache = {}))[e];
                    if (!h)
                        for (h = t._ptCache[e] = [], u = t._ptLookup, c = t._targets.length; c--;) {
                            if ((a = u[c][e]) && a.d && a.d._pt)
                                for (a = a.d._pt; a && a.p !== e && a.fp !== e;) a = a._next;
                            if (!a) return Ze = 1, t.vars[e] = "+=0", Ke(t, s), Ze = 0, 1;
                            h.push(a)
                        }
                    for (c = h.length; c--;)(a = (l = h[c])._pt || l).s = !n && 0 !== n || i ? a.s + (n || 0) + o * a.c : n, a.c = r - a.s, l.e && (l.e = B(r) + G(l.e)), l.b && (l.b = a.s + G(l.b))
                }(this, t, e, r, n, i, o) ? this.resetTo(t, e, r, n) : (w(this, 0), this.parent || d(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0))
        }, t.kill = function(t, e) {
            if (void 0 === e && (e = "all"), !(t || e && "all" !== e)) return this._lazy = this._pt = 0, this.parent ? ot(this) : this;
            if (this.timeline) {
                var r = this.timeline.totalDuration();
                return this.timeline.killTweensOf(t, e, Qe && !0 !== Qe.vars.overwrite)._first || ot(this), this.parent && r !== this.timeline.totalDuration() && S(this, this._dur * this.timeline._tDur / r, 0, 1), this
            }
            var n, i, o, s, a, l, u, c = this._targets,
                h = t ? Ee(t) : c,
                f = this._ptLookup,
                t = this._pt;
            if ((!e || "all" === e) && function(t, e) {
                    for (var r = t.length, n = r === e.length; n && r-- && t[r] === e[r];);
                    return r < 0
                }(c, h)) return "all" === e && (this._pt = 0), ot(this);
            for (n = this._op = this._op || [], "all" !== e && (A(e) && (a = {}, p(e, function(t) {
                    return a[t] = 1
                }), e = a), e = function(t, e) {
                    var r, n, i, o, t = t[0] ? Y(t[0]).harness : 0,
                        s = t && t.aliases;
                    if (!s) return e;
                    for (n in r = _t({}, e), s)
                        if (n in r)
                            for (i = (o = s[n].split(",")).length; i--;) r[o[i]] = r[n];
                    return r
                }(c, e)), u = c.length; u--;)
                if (~h.indexOf(c[u]))
                    for (a in i = f[u], "all" === e ? (n[u] = e, s = i, o = {}) : (o = n[u] = n[u] || {}, s = e), s)(l = i && i[a]) && ("kill" in l.d && !0 !== l.d.kill(a) || g(this, l, "_pt"), delete i[a]), "all" !== o && (o[a] = 1);
            return this._initted && !this._pt && t && ot(this), this
        }, i.to = function(t, e, r) {
            return new i(t, e, r)
        }, i.from = function(t, e) {
            return M(1, arguments)
        }, i.delayedCall = function(t, e, r, n) {
            return new i(e, 0, {
                immediateRender: !1,
                lazy: !1,
                overwrite: !1,
                delay: t,
                onComplete: e,
                onReverseComplete: e,
                onCompleteParams: r,
                onReverseCompleteParams: r,
                callbackScope: n
            })
        }, i.fromTo = function(t, e, r) {
            return M(2, arguments)
        }, i.set = function(t, e) {
            return e.duration = 0, e.repeatDelay || (e.repeat = 0), new i(t, e)
        }, i.killTweensOf = function(t, e, r) {
            return St.killTweensOf(t, e, r)
        }, i
    }(je);

    function nr(t, e, r) {
        return t.setAttribute(e, r)
    }

    function ir(t, e, r, n) {
        n.mSet(t, e, n.m.call(n.tween, r, n.mt), n)
    }
    N(rr.prototype, {
        _targets: [],
        _lazy: 0,
        _startAt: 0,
        _op: 0,
        _onInit: 0
    }), p("staggerTo,staggerFrom,staggerFromTo", function(r) {
        rr[r] = function() {
            var t = new Ve,
                e = Pe.call(arguments, 0);
            return e.splice("staggerFromTo" === r ? 5 : 4, 0, 0), t[r].apply(t, e)
        }
    });
    var or = function(t, e, r) {
            return t[e] = r
        },
        sr = function(t, e, r) {
            return t[e](r)
        },
        ar = function(t, e, r, n) {
            return t[e](n.fp, r)
        },
        lr = function(t, e) {
            return h(t[e]) ? sr : i(t[e]) && t.setAttribute ? nr : or
        },
        ur = function(t, e) {
            return e.set(e.t, e.p, Math.round(1e6 * (e.s + e.c * t)) / 1e6, e)
        },
        cr = function(t, e) {
            return e.set(e.t, e.p, !!(e.s + e.c * t), e)
        },
        hr = function(t, e) {
            var r = e._pt,
                n = "";
            if (!t && e.b) n = e.b;
            else if (1 === t && e.e) n = e.e;
            else {
                for (; r;) n = r.p + (r.m ? r.m(r.s + r.c * t) : Math.round(1e4 * (r.s + r.c * t)) / 1e4) + n, r = r._next;
                n += e.c
            }
            e.set(e.t, e.p, n, e)
        },
        fr = function(t, e) {
            for (var r = e._pt; r;) r.r(t, r.d), r = r._next
        },
        pr = function(t, e, r, n) {
            for (var i, o = this._pt; o;) i = o._next, o.p === n && o.modifier(t, e, r), o = i
        },
        dr = function(t) {
            for (var e, r, n = this._pt; n;) r = n._next, n.p === t && !n.op || n.op === t ? g(this, n, "_pt") : n.dep || (e = 1), n = r;
            return !e
        },
        gr = function(t) {
            for (var e, r, n, i, o = t._pt; o;) {
                for (e = o._next, r = n; r && r.pr > o.pr;) r = r._next;
                (o._prev = r ? r._prev : i) ? o._prev._next = o: n = o, (o._next = r) ? r._prev = o : i = o, o = e
            }
            t._pt = n
        },
        mr = (_r.prototype.modifier = function(t, e, r) {
            this.mSet = this.mSet || this.set, this.set = ir, this.m = t, this.mt = r, this.tween = e
        }, _r);

    function _r(t, e, r, n, i, o, s, a, l) {
        this.t = e, this.s = n, this.c = i, this.p = r, this.r = o || ur, this.d = s || this, this.set = a || or, this.pr = l || 0, (this._next = t) && (t._prev = this)
    }

    function vr(t) {
        return (xr[t] || br).map(function(t) {
            return t()
        })
    }

    function yr() {
        var t = Date.now(),
            a = [];
        2 < t - Tr && (vr("matchMediaInit"), wr.forEach(function(t) {
            var e, r, n, i, o = t.queries,
                s = t.conditions;
            for (r in o)(e = kt.matchMedia(o[r]).matches) && (n = 1), e !== s[r] && (s[r] = e, i = 1);
            i && (t.revert(), n && a.push(t))
        }), vr("matchMediaRevert"), a.forEach(function(t) {
            return t.onMatch(t)
        }), Tr = t, vr("matchMedia"))
    }
    p(Te + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(t) {
        return me[t] = 1
    }), fe.TweenMax = fe.TweenLite = rr, fe.TimelineLite = fe.TimelineMax = Ve, St = new Ve({
        sortChildren: !1,
        defaults: Gt,
        autoRemoveChildren: !0,
        id: "root",
        smoothChildTiming: !0
    }), Vt.stringFilter = ht;
    var wr = [],
        xr = {},
        br = [],
        Tr = 0,
        Sr = ((di = kr.prototype).add = function(t, n, i) {
            function e() {
                var t, e = Tt,
                    r = o.selector;
                return e && e !== o && e.data.push(o), i && (o.selector = Q(i)), Tt = o, h(t = n.apply(o, arguments)) && o._r.push(t), Tt = e, o.selector = r, o.isReverted = !1, t
            }
            h(t) && (i = n, n = t, t = h);
            var o = this;
            return o.last = e, t === h ? e(o) : t ? o[t] = e : e
        }, di.ignore = function(t) {
            var e = Tt;
            Tt = null, t(this), Tt = e
        }, di.getTweens = function() {
            var e = [];
            return this.data.forEach(function(t) {
                return t instanceof kr ? e.push.apply(e, t.getTweens()) : t instanceof rr && !(t.parent && "nested" === t.parent.data) && e.push(t)
            }), e
        }, di.clear = function() {
            this._r.length = this.data.length = 0
        }, di.kill = function(e, t) {
            var r, n, i = this;
            e ? (r = this.getTweens(), this.data.forEach(function(t) {
                "isFlip" === t.data && (t.revert(), t.getChildren(!0, !0, !1).forEach(function(t) {
                    return r.splice(r.indexOf(t), 1)
                }))
            }), r.map(function(t) {
                return {
                    g: t.globalTime(0),
                    t: t
                }
            }).sort(function(t, e) {
                return e.g - t.g || -1
            }).forEach(function(t) {
                return t.t.revert(e)
            }), this.data.forEach(function(t) {
                return !(t instanceof je) && t.revert && t.revert(e)
            }), this._r.forEach(function(t) {
                return t(e, i)
            }), this.isReverted = !0) : this.data.forEach(function(t) {
                return t.kill && t.kill()
            }), this.clear(), t && ~(n = wr.indexOf(this)) && wr.splice(n, 1)
        }, di.revert = function(t) {
            this.kill(t || {})
        }, kr);

    function kr(t, e) {
        this.selector = e && Q(e), this.data = [], this._r = [], this.isReverted = !1, t && this.add(t)
    }
    var Mr = ((pi = Or.prototype).add = function(t, e, r) {
        C(t) || (t = {
            matches: t
        });
        var n, i, o, s = new Sr(0, r || this.scope),
            a = s.conditions = {};
        for (i in this.contexts.push(s), e = s.add("onMatch", e), s.queries = t) "all" === i ? o = 1 : (n = kt.matchMedia(t[i])) && (wr.indexOf(s) < 0 && wr.push(s), (a[i] = n.matches) && (o = 1), n.addListener ? n.addListener(yr) : n.addEventListener("change", yr));
        return o && e(s), this
    }, pi.revert = function(t) {
        this.kill(t || {})
    }, pi.kill = function(e) {
        this.contexts.forEach(function(t) {
            return t.kill(e, !0)
        })
    }, Or);

    function Or(t) {
        this.contexts = [], this.scope = t
    }
    var Pr = {
        registerPlugin: function() {
            for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r];
            e.forEach(st)
        },
        timeline: function(t) {
            return new Ve(t)
        },
        getTweensOf: function(t, e) {
            return St.getTweensOf(t, e)
        },
        getProperty: function(n, t, e, r) {
            var i = Y((n = A(n) ? Ee(n)[0] : n) || {}).get,
                o = e ? f : c;
            return "native" === e && (e = ""), n && (t ? o((ye[t] && ye[t].get || i)(n, t, e, r)) : function(t, e, r) {
                return o((ye[t] && ye[t].get || i)(n, t, e, r))
            })
        },
        quickSetter: function(r, e, n) {
            if (1 < (r = Ee(r)).length) {
                var i = r.map(function(t) {
                        return Ar.quickSetter(t, e, n)
                    }),
                    o = i.length;
                return function(t) {
                    for (var e = o; e--;) i[e](t)
                }
            }
            r = r[0] || {};
            var s = ye[e],
                a = Y(r),
                l = a.harness && (a.harness.aliases || {})[e] || e,
                u = s ? function(t) {
                    var e = new s;
                    Cr._pt = 0, e.init(r, n ? t + n : t, Cr, 0, [r]), e.render(1, e), Cr._pt && fr(1, Cr)
                } : a.set(r, l);
            return s ? u : function(t) {
                return u(r, l, n ? t + n : t, a, 1)
            }
        },
        quickTo: function(t, n, e) {
            function r(t, e, r) {
                return i.resetTo(n, t, e, r)
            }
            var i = Ar.to(t, _t(((t = {})[n] = "+=0.1", t.paused = !0, t), e || {}));
            return r.tween = i, r
        },
        isTweening: function(t) {
            return 0 < St.getTweensOf(t, !0).length
        },
        defaults: function(t) {
            return t && t.ease && (t.ease = We(t.ease, Gt.ease)), n(Gt, t || {})
        },
        config: function(t) {
            return n(Vt, t || {})
        },
        registerEffect: function(t) {
            var n = t.name,
                i = t.effect,
                e = t.plugins,
                o = t.defaults,
                t = t.extendTimeline;
            (e || "").split(",").forEach(function(t) {
                return t && !ye[t] && !fe[t] && z(n + " effect requires " + t + " plugin.")
            }), we[n] = function(t, e, r) {
                return i(Ee(t), N(e || {}, o), r)
            }, t && (Ve.prototype[n] = function(t, e, r) {
                return this.add(we[n](t, C(e) ? e : (r = e) && {}, this), r)
            })
        },
        registerEase: function(t, e) {
            Ye[t] = We(e)
        },
        parseEase: function(t, e) {
            return arguments.length ? We(t, e) : Ye
        },
        getById: function(t) {
            return St.getById(t)
        },
        exportRoot: function(t, e) {
            var r, n, i = new Ve(t = void 0 === t ? {} : t);
            for (i.smoothChildTiming = L(t.smoothChildTiming), St.remove(i), i._dp = 0, i._time = i._tTime = St._time, r = St._first; r;) n = r._next, !e && !r._dur && r instanceof rr && r.vars.onComplete === r._targets[0] || q(i, r, r._start - r._delay), r = n;
            return q(St, i, 0), i
        },
        context: function(t, e) {
            return t ? new Sr(t, e) : Tt
        },
        matchMedia: function(t) {
            return new Mr(t)
        },
        matchMediaRefresh: function() {
            return wr.forEach(function(t) {
                var e, r, n = t.conditions;
                for (r in n) n[r] && (n[r] = !1, e = 1);
                e && t.revert()
            }) || yr()
        },
        addEventListener: function(t, e) {
            t = xr[t] || (xr[t] = []);
            ~t.indexOf(e) || t.push(e)
        },
        removeEventListener: function(t, e) {
            t = xr[t], e = t && t.indexOf(e);
            0 <= e && t.splice(e, 1)
        },
        utils: {
            wrap: function t(e, r, n) {
                var i = r - e;
                return ie(e) ? rt(e, t(0, e.length), r) : O(n, function(t) {
                    return (i + (t - e) % i) % i + e
                })
            },
            wrapYoyo: function t(e, r, n) {
                var i = r - e,
                    o = 2 * i;
                return ie(e) ? rt(e, t(0, e.length - 1), r) : O(n, function(t) {
                    return e + (i < (t = (o + (t - e) % o) % o || 0) ? o - t : t)
                })
            },
            distribute: $,
            random: et,
            snap: tt,
            normalize: function(t, e, r) {
                return yt(t, e, 0, 1, r)
            },
            getUnit: G,
            clamp: function(e, r, t) {
                return O(t, function(t) {
                    return Oe(e, r, t)
                })
            },
            splitColor: lt,
            toArray: Ee,
            selector: Q,
            mapRange: yt,
            pipe: function() {
                for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r];
                return function(t) {
                    return e.reduce(function(t, e) {
                        return e(t)
                    }, t)
                }
            },
            unitize: function(e, r) {
                return function(t) {
                    return e(parseFloat(t)) + (r || G(t))
                }
            },
            interpolate: function t(e, r, n, i) {
                var o = isNaN(e + r) ? 0 : function(t) {
                    return (1 - t) * e + t * r
                };
                if (!o) {
                    var s, a, l, u, c, h = A(e),
                        f = {};
                    if (!0 === n && (i = 1) && (n = null), h) e = {
                        p: e
                    }, r = {
                        p: r
                    };
                    else if (ie(e) && !ie(r)) {
                        for (l = [], u = e.length, c = u - 2, a = 1; a < u; a++) l.push(t(e[a - 1], e[a]));
                        u--, o = function(t) {
                            t *= u;
                            var e = Math.min(c, ~~t);
                            return l[e](t - e)
                        }, n = r
                    } else i || (e = _t(ie(e) ? [] : {}, e));
                    if (!l) {
                        for (s in r) $e.call(f, e, s, "get", r[s]);
                        o = function(t) {
                            return fr(t, f) || (h ? e.p : e)
                        }
                    }
                }
                return O(n, o)
            },
            shuffle: Z
        },
        install: e,
        effects: we,
        ticker: Le,
        updateRoot: Ve.updateRoot,
        plugins: ye,
        globalTimeline: St,
        core: {
            PropTween: mr,
            globals: s,
            Tween: rr,
            Timeline: Ve,
            Animation: je,
            getCache: Y,
            _removeLinkedListItem: g,
            reverting: function() {
                return bt
            },
            context: function(t) {
                return t && Tt && (Tt.data.push(t), t._ctx = Tt), Tt
            },
            suppressOverwrites: function(t) {
                return xt = t
            }
        }
    };

    function Er(t, i) {
        return {
            name: t,
            rawVars: 1,
            init: function(t, n, e) {
                e._onInit = function(t) {
                    var e, r;
                    if (A(n) && (e = {}, p(n, function(t) {
                            return e[t] = 1
                        }), n = e), i) {
                        for (r in e = {}, n) e[r] = i(n[r]);
                        n = e
                    }! function(t, e) {
                        var r, n, i, o = t._targets;
                        for (r in e)
                            for (n = o.length; n--;)(i = (i = t._ptLookup[n][r]) && i.d) && (i._pt && (i = function(t, e) {
                                for (var r = t._pt; r && r.p !== e && r.op !== e && r.fp !== e;) r = r._next;
                                return r
                            }(i, r)), i && i.modifier && i.modifier(e[r], t, o[n], r))
                    }(t, n)
                }
            }
        }
    }
    p("to,from,fromTo,delayedCall,set,killTweensOf", function(t) {
        return Pr[t] = rr[t]
    }), Le.add(Ve.updateRoot);
    var Cr = Pr.to({}, {
            duration: 0
        }),
        Ar = Pr.registerPlugin({
            name: "attr",
            init: function(t, e, r, n, i) {
                var o, s, a;
                for (o in this.tween = r, e) a = t.getAttribute(o) || "", (s = this.add(t, "setAttribute", (a || 0) + "", e[o], n, i, 0, 0, o)).op = o, s.b = a, this._props.push(o)
            },
            render: function(t, e) {
                for (var r = e._pt; r;) bt ? r.set(r.t, r.p, r.b, r) : r.r(t, r.d), r = r._next
            }
        }, {
            name: "endArray",
            init: function(t, e) {
                for (var r = e.length; r--;) this.add(t, r, t[r] || 0, e[r], 0, 0, 0, 0, 0, 1)
            }
        }, Er("roundProps", J), Er("modifiers"), Er("snap", tt)) || Pr;

    function Rr(t, e) {
        return e.set(e.t, e.p, Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e)
    }

    function Dr(t, e) {
        return e.set(e.t, e.p, 1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e)
    }

    function zr(t, e) {
        return e.set(e.t, e.p, t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b, e)
    }

    function Lr(t, e) {
        t = e.s + e.c * t;
        e.set(e.t, e.p, ~~(t + (t < 0 ? -.5 : .5)) + e.u, e)
    }

    function Fr(t, e) {
        return e.set(e.t, e.p, t ? e.e : e.b, e)
    }

    function Yr(t, e) {
        return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e)
    }

    function Br(t, e, r) {
        return t.style[e] = r
    }

    function Xr(t, e, r) {
        return t.style.setProperty(e, r)
    }

    function Ir(t, e, r) {
        return t._gsap[e] = r
    }

    function Wr(t, e, r) {
        return t._gsap.scaleX = t._gsap.scaleY = r
    }

    function Nr(t, e, r, n, i) {
        t = t._gsap;
        t.scaleX = t.scaleY = r, t.renderTransform(i, t)
    }

    function Ur(t, e, r, n, i) {
        t = t._gsap;
        t[e] = r, t.renderTransform(i, t)
    }

    function Hr(t, e) {
        var r = this,
            n = this.target,
            i = n.style;
        if (t in Bn) {
            if (this.tfm = this.tfm || {}, "transform" === t) return jn.transform.split(",").forEach(function(t) {
                return Hr.call(r, t, e)
            });
            if (~(t = jn[t] || t).indexOf(",") ? t.split(",").forEach(function(t) {
                    return r.tfm[t] = $n(n, t)
                }) : this.tfm[t] = n._gsap.x ? n._gsap[t] : $n(n, t), 0 <= this.props.indexOf(qn)) return;
            n._gsap.svg && (this.svgo = n.getAttribute("data-svg-origin"), this.props.push(Vn, e, "")), t = qn
        }(i || e) && this.props.push(t, e, i[t])
    }

    function jr(t) {
        t.translate && (t.removeProperty("translate"), t.removeProperty("scale"), t.removeProperty("rotate"))
    }

    function qr() {
        for (var t, e = this.props, r = this.target, n = r.style, i = r._gsap, o = 0; o < e.length; o += 3) e[o + 1] ? r[e[o]] = e[o + 2] : e[o + 2] ? n[e[o]] = e[o + 2] : n.removeProperty("--" === e[o].substr(0, 2) ? e[o] : e[o].replace(Nn, "-$1").toLowerCase());
        if (this.tfm) {
            for (t in this.tfm) i[t] = this.tfm[t];
            i.svg && (i.renderTransform(), r.setAttribute("data-svg-origin", this.svgo || "")), (o = vn()) && o.isStart || n[qn] || (jr(n), i.uncache = 1)
        }
    }

    function Vr(t, e) {
        var r = {
            target: t,
            props: [],
            revert: qr,
            save: Hr
        };
        return t._gsap || Ar.core.getCache(t), e && e.split(",").forEach(function(t) {
            return r.save(t)
        }), r
    }

    function Gr(t, e) {
        e = pn.createElementNS ? pn.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : pn.createElement(t);
        return e.style ? e : pn.createElement(t)
    }

    function Kr(t, e, r) {
        var n = getComputedStyle(t);
        return n[e] || n.getPropertyValue(e.replace(Nn, "-$1").toLowerCase()) || n.getPropertyValue(e) || !r && Kr(t, Kn(e) || e, 1) || ""
    }

    function Qr() {
        "undefined" != typeof window && window.document && (pn = window.document, dn = pn.documentElement, mn = Gr("div") || {
            style: {}
        }, Gr("div"), qn = Kn(qn), Vn = qn + "Origin", mn.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", yn = !!Kn("perspective"), vn = Ar.core.reverting, gn = 1)
    }

    function Zr(t) {
        var e, r = Gr("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
            n = this.parentNode,
            i = this.nextSibling,
            o = this.style.cssText;
        if (dn.appendChild(r), r.appendChild(this), this.style.display = "block", t) try {
            e = this.getBBox(), this._gsapBBox = this.getBBox, this.getBBox = Zr
        } catch (t) {} else this._gsapBBox && (e = this._gsapBBox());
        return n && (i ? n.insertBefore(this, i) : n.appendChild(this)), dn.removeChild(r), this.style.cssText = o, e
    }

    function $r(t, e) {
        for (var r = e.length; r--;)
            if (t.hasAttribute(e[r])) return t.getAttribute(e[r])
    }

    function Jr(e) {
        var r;
        try {
            r = e.getBBox()
        } catch (t) {
            r = Zr.call(e, !0)
        }
        return !(r = !(r && (r.width || r.height) || e.getBBox === Zr) ? Zr.call(e, !0) : r) || r.width || r.x || r.y ? r : {
            x: +$r(e, ["x", "cx", "x1"]) || 0,
            y: +$r(e, ["y", "cy", "y1"]) || 0,
            width: 0,
            height: 0
        }
    }

    function tn(t) {
        return !(!t.getCTM || t.parentNode && !t.ownerSVGElement || !Jr(t))
    }

    function en(t, e) {
        e && (t = t.style, e in Bn && e !== Vn && (e = qn), t.removeProperty ? ("ms" !== e.substr(0, 2) && "webkit" !== e.substr(0, 6) || (e = "-" + e), t.removeProperty(e.replace(Nn, "-$1").toLowerCase())) : t.removeAttribute(e))
    }

    function rn(t, e, r, n, i, o) {
        o = new mr(t._pt, e, r, 0, 1, o ? Yr : Fr);
        return (t._pt = o).b = n, o.e = i, t._props.push(r), o
    }

    function nn(t, e, r, n) {
        var i, o = parseFloat(r) || 0,
            s = (r + "").trim().substr((o + "").length) || "px",
            a = mn.style,
            l = Un.test(e),
            u = "svg" === t.tagName.toLowerCase(),
            c = (u ? "client" : "offset") + (l ? "Width" : "Height"),
            h = "px" === n,
            f = "%" === n;
        return n === s || !o || Qn[n] || Qn[s] ? o : ("px" === s || h || (o = nn(t, e, r, "px")), r = t.getCTM && tn(t), !f && "%" !== s || !Bn[e] && !~e.indexOf("adius") ? (a[l ? "width" : "height"] = 100 + (h ? s : n), n = ~e.indexOf("adius") || "em" === n && t.appendChild && !u ? t : t.parentNode, (u = (n = !(n = r ? (t.ownerSVGElement || {}).parentNode : n) || n === pn || !n.appendChild ? pn.body : n)._gsap) && f && u.width && l && u.time === Le.time && !u.uncache ? B(o / u.width * 100) : (!f && "%" !== s || Zn[Kr(n, "display")] || (a.position = Kr(t, "position")), n === t && (a.position = "static"), n.appendChild(mn), i = mn[c], n.removeChild(mn), a.position = "absolute", l && f && ((u = Y(n)).time = Le.time, u.width = n[c]), B(h ? i * o / 100 : i && o ? 100 / i * o : 0))) : (i = r ? t.getBBox()[l ? "width" : "height"] : t[c], B(f ? o / i * 100 : o / 100 * i)))
    }

    function on(t, e, r, n) {
        var i;
        r && "none" !== r || ((o = (i = Kn(e, t, 1)) && Kr(t, i, 1)) && o !== r ? (e = i, r = o) : "borderColor" === e && (r = Kr(t, "borderTopColor")));
        var o, s, a, l, u, c, h, f, p, d = new mr(this._pt, t.style, e, 0, 1, hr),
            g = 0,
            m = 0;
        if (d.b = r, d.e = n, r += "", "auto" == (n += "") && (t.style[e] = n, n = Kr(t, e) || n, t.style[e] = r), ht(o = [r, n]), n = o[1], s = (r = o[0]).match(ae) || [], (n.match(ae) || []).length) {
            for (; c = ae.exec(n);) f = c[0], h = n.substring(g, c.index), l ? l = (l + 1) % 5 : "rgba(" !== h.substr(-5) && "hsla(" !== h.substr(-5) || (l = 1), f !== (u = s[m++] || "") && (a = parseFloat(u) || 0, p = u.substr((a + "").length), "=" === f.charAt(1) && (f = I(a, f) + p), c = parseFloat(f), f = f.substr((c + "").length), g = ae.lastIndex - f.length, f || (f = f || Vt.units[e] || p, g === n.length && (n += f, d.e += f)), p !== f && (a = nn(t, e, u, f) || 0), d._pt = {
                _next: d._pt,
                p: h || 1 === m ? h : ",",
                s: a,
                c: c - a,
                m: l && l < 4 || "zIndex" === e ? Math.round : 0
            });
            d.c = g < n.length ? n.substring(g, n.length) : ""
        } else d.r = "display" === e && "none" === n ? Yr : Fr;
        return ue.test(n) && (d.e = 0), this._pt = d
    }

    function sn(t, e) {
        if (e.tween && e.tween._time === e.tween._dur) {
            var r, n, i, o = e.t,
                s = o.style,
                a = e.u,
                e = o._gsap;
            if ("all" === a || !0 === a) s.cssText = "", n = 1;
            else
                for (i = (a = a.split(",")).length; - 1 < --i;) r = a[i], Bn[r] && (n = 1, r = "transformOrigin" === r ? Vn : qn), en(o, r);
            n && (en(o, qn), e && (e.svg && o.removeAttribute("transform"), ni(o, 1), e.uncache = 1, jr(s)))
        }
    }

    function an(t) {
        return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t
    }

    function ln(t) {
        t = Kr(t, qn);
        return an(t) ? ei : t.substr(7).match(se).map(B)
    }

    function un(t, e) {
        var r, n, i, o = t._gsap || Y(t),
            s = t.style,
            a = ln(t);
        return o.svg && t.getAttribute("transform") ? "1,0,0,1,0,0" === (a = [(n = t.transform.baseVal.consolidate().matrix).a, n.b, n.c, n.d, n.e, n.f]).join(",") ? ei : a : (a !== ei || t.offsetParent || t === dn || o.svg || (n = s.display, s.display = "block", (o = t.parentNode) && t.offsetParent || (i = 1, r = t.nextElementSibling, dn.appendChild(t)), a = ln(t), n ? s.display = n : en(t, "display"), i && (r ? o.insertBefore(t, r) : o ? o.appendChild(t) : dn.removeChild(t))), e && 6 < a.length ? [a[0], a[1], a[4], a[5], a[12], a[13]] : a)
    }

    function cn(t, e, r, n, i, o) {
        var s, a, l = t._gsap,
            u = i || un(t, !0),
            c = l.xOrigin || 0,
            h = l.yOrigin || 0,
            f = l.xOffset || 0,
            p = l.yOffset || 0,
            d = u[0],
            g = u[1],
            m = u[2],
            _ = u[3],
            v = u[4],
            y = u[5],
            w = e.split(" "),
            x = parseFloat(w[0]) || 0,
            i = parseFloat(w[1]) || 0;
        r ? u !== ei && (s = d * _ - g * m) && (a = x * (-g / s) + i * (d / s) - (d * y - g * v) / s, x = x * (_ / s) + i * (-m / s) + (m * y - _ * v) / s, i = a) : (x = (a = Jr(t)).x + (~w[0].indexOf("%") ? x / 100 * a.width : x), i = a.y + (~(w[1] || w[0]).indexOf("%") ? i / 100 * a.height : i)), n || !1 !== n && l.smooth ? (l.xOffset = f + ((v = x - c) * d + (y = i - h) * m) - v, l.yOffset = p + (v * g + y * _) - y) : l.xOffset = l.yOffset = 0, l.xOrigin = x, l.yOrigin = i, l.smooth = !!n, l.origin = e, l.originIsAbsolute = !!r, t.style[Vn] = "0px 0px", o && (rn(o, l, "xOrigin", c, x), rn(o, l, "yOrigin", h, i), rn(o, l, "xOffset", f, l.xOffset), rn(o, l, "yOffset", p, l.yOffset)), t.setAttribute("data-svg-origin", x + " " + i)
    }

    function hn(t, e, r) {
        var n = G(e);
        return B(parseFloat(e) + parseFloat(nn(t, "x", r + "px", n))) + n
    }

    function fn(t, e) {
        for (var r in e) t[r] = e[r];
        return t
    }
    rr.version = Ve.version = Ar.version = "3.11.5", Et = 1, o() && Fe();
    var pn, dn, gn, mn, _n, vn, yn, wn = Ye.Power0,
        xn = Ye.Power1,
        bn = Ye.Power2,
        Tn = Ye.Power3,
        Sn = Ye.Power4,
        kn = Ye.Linear,
        Mn = Ye.Quad,
        On = Ye.Cubic,
        Pn = Ye.Quart,
        En = Ye.Quint,
        Cn = Ye.Strong,
        An = Ye.Elastic,
        Rn = Ye.Back,
        Dn = Ye.SteppedEase,
        zn = Ye.Bounce,
        Ln = Ye.Sine,
        Fn = Ye.Expo,
        Yn = Ye.Circ,
        Bn = {},
        Xn = 180 / Math.PI,
        In = Math.PI / 180,
        Wn = Math.atan2,
        Nn = /([A-Z])/g,
        Un = /(left|right|width|margin|padding|x)/i,
        Hn = /[\s,\(]\S/,
        jn = {
            autoAlpha: "opacity,visibility",
            scale: "scaleX,scaleY",
            alpha: "opacity"
        },
        qn = "transform",
        Vn = qn + "Origin",
        Gn = "O,Moz,ms,Ms,Webkit".split(","),
        Kn = function(t, e, r) {
            var n = (e || mn).style,
                i = 5;
            if (t in n && !r) return t;
            for (t = t.charAt(0).toUpperCase() + t.substr(1); i-- && !(Gn[i] + t in n););
            return i < 0 ? null : (3 === i ? "ms" : 0 <= i ? Gn[i] : "") + t
        },
        Qn = {
            deg: 1,
            rad: 1,
            turn: 1
        },
        Zn = {
            grid: 1,
            flex: 1
        },
        $n = function(t, e, r, n) {
            var i;
            return gn || Qr(), e in jn && "transform" !== e && ~(e = jn[e]).indexOf(",") && (e = e.split(",")[0]), Bn[e] && "transform" !== e ? (i = ni(t, n), i = "transformOrigin" !== e ? i[e] : i.svg ? i.origin : ii(Kr(t, Vn)) + " " + i.zOrigin + "px") : (i = t.style[e]) && "auto" !== i && !n && !~(i + "").indexOf("calc(") || (i = ti[e] && ti[e](t, e, r) || Kr(t, e) || l(t, e) || ("opacity" === e ? 1 : 0)), r && !~(i + "").trim().indexOf(" ") ? nn(t, e, i, r) + r : i
        },
        Jn = {
            top: "0%",
            bottom: "100%",
            left: "0%",
            right: "100%",
            center: "50%"
        },
        ti = {
            clearProps: function(t, e, r, n, i) {
                if ("isFromStart" !== i.data) {
                    e = t._pt = new mr(t._pt, e, r, 0, 0, sn);
                    return e.u = n, e.pr = -10, e.tween = i, t._props.push(r), 1
                }
            }
        },
        ei = [1, 0, 0, 1, 0, 0],
        ri = {},
        ni = function(t, e) {
            var r = t._gsap || new He(t);
            if ("x" in r && !e && !r.uncache) return r;
            var n, i, o, s, a, l, u, c, h, f, p, d, g, m, _, v, y, w, x, b, T, S, k, M, O, P = t.style,
                E = r.scaleX < 0,
                C = "deg",
                A = getComputedStyle(t),
                R = Kr(t, Vn) || "0",
                D = n = i = s = a = l = u = c = 0,
                z = o = 1;
            return r.svg = !(!t.getCTM || !tn(t)), A.translate && ("none" === A.translate && "none" === A.scale && "none" === A.rotate || (P[qn] = ("none" !== A.translate ? "translate3d(" + (A.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + ("none" !== A.rotate ? "rotate(" + A.rotate + ") " : "") + ("none" !== A.scale ? "scale(" + A.scale.split(" ").join(",") + ") " : "") + ("none" !== A[qn] ? A[qn] : "")), P.scale = P.rotate = P.translate = "none"), h = un(t, r.svg), r.svg && (w = r.uncache ? (x = t.getBBox(), R = r.xOrigin - x.x + "px " + (r.yOrigin - x.y) + "px", "") : !e && t.getAttribute("data-svg-origin"), cn(t, w || R, !!w || r.originIsAbsolute, !1 !== r.smooth, h)), S = r.xOrigin || 0, M = r.yOrigin || 0, h !== ei && (d = h[0], g = h[1], m = h[2], _ = h[3], D = v = h[4], n = y = h[5], 6 === h.length ? (z = Math.sqrt(d * d + g * g), o = Math.sqrt(_ * _ + m * m), s = d || g ? Wn(g, d) * Xn : 0, (u = m || _ ? Wn(m, _) * Xn + s : 0) && (o *= Math.abs(Math.cos(u * In))), r.svg && (D -= S - (S * d + M * m), n -= M - (S * g + M * _))) : (O = h[6], k = h[7], T = h[8], A = h[9], S = h[10], M = h[11], D = h[12], n = h[13], i = h[14], a = (h = Wn(O, S)) * Xn, h && (w = v * (f = Math.cos(-h)) + T * (p = Math.sin(-h)), x = y * f + A * p, b = O * f + S * p, T = v * -p + T * f, A = y * -p + A * f, S = O * -p + S * f, M = k * -p + M * f, v = w, y = x, O = b), l = (h = Wn(-m, S)) * Xn, h && (f = Math.cos(-h), M = _ * (p = Math.sin(-h)) + M * f, d = w = d * f - T * p, g = x = g * f - A * p, m = b = m * f - S * p), s = (h = Wn(g, d)) * Xn, h && (w = d * (f = Math.cos(h)) + g * (p = Math.sin(h)), x = v * f + y * p, g = g * f - d * p, y = y * f - v * p, d = w, v = x), a && 359.9 < Math.abs(a) + Math.abs(s) && (a = s = 0, l = 180 - l), z = B(Math.sqrt(d * d + g * g + m * m)), o = B(Math.sqrt(y * y + O * O)), h = Wn(v, y), u = 2e-4 < Math.abs(h) ? h * Xn : 0, c = M ? 1 / (M < 0 ? -M : M) : 0), r.svg && (w = t.getAttribute("transform"), r.forceCSS = t.setAttribute("transform", "") || !an(Kr(t, qn)), w && t.setAttribute("transform", w))), 90 < Math.abs(u) && Math.abs(u) < 270 && (E ? (z *= -1, u += s <= 0 ? 180 : -180, s += s <= 0 ? 180 : -180) : (o *= -1, u += u <= 0 ? 180 : -180)), e = e || r.uncache, r.x = D - ((r.xPercent = D && (!e && r.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-D) ? -50 : 0))) ? t.offsetWidth * r.xPercent / 100 : 0) + "px", r.y = n - ((r.yPercent = n && (!e && r.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-n) ? -50 : 0))) ? t.offsetHeight * r.yPercent / 100 : 0) + "px", r.z = i + "px", r.scaleX = B(z), r.scaleY = B(o), r.rotation = B(s) + C, r.rotationX = B(a) + C, r.rotationY = B(l) + C, r.skewX = u + C, r.skewY = 0 + C, r.transformPerspective = c + "px", (r.zOrigin = parseFloat(R.split(" ")[2]) || 0) && (P[Vn] = ii(R)), r.xOffset = r.yOffset = 0, r.force3D = Vt.force3D, r.renderTransform = r.svg ? ci : yn ? ui : oi, r.uncache = 0, r
        },
        ii = function(t) {
            return (t = t.split(" "))[0] + " " + t[1]
        },
        oi = function(t, e) {
            e.z = "0px", e.rotationY = e.rotationX = "0deg", e.force3D = 0, ui(t, e)
        },
        si = "0deg",
        ai = "0px",
        li = ") ",
        ui = function(t, e) {
            var r = e || this,
                n = r.xPercent,
                i = r.yPercent,
                o = r.x,
                s = r.y,
                a = r.z,
                l = r.rotation,
                u = r.rotationY,
                c = r.rotationX,
                h = r.skewX,
                f = r.skewY,
                p = r.scaleX,
                d = r.scaleY,
                g = r.transformPerspective,
                m = r.force3D,
                _ = r.target,
                v = r.zOrigin,
                y = "",
                e = "auto" === m && t && 1 !== t || !0 === m;
            !v || c === si && u === si || (r = parseFloat(u) * In, t = Math.sin(r), m = Math.cos(r), r = parseFloat(c) * In, o = hn(_, o, t * (t = Math.cos(r)) * -v), s = hn(_, s, -Math.sin(r) * -v), a = hn(_, a, m * t * -v + v)), g !== ai && (y += "perspective(" + g + li), (n || i) && (y += "translate(" + n + "%, " + i + "%) "), !e && o === ai && s === ai && a === ai || (y += a !== ai || e ? "translate3d(" + o + ", " + s + ", " + a + ") " : "translate(" + o + ", " + s + li), l !== si && (y += "rotate(" + l + li), u !== si && (y += "rotateY(" + u + li), c !== si && (y += "rotateX(" + c + li), h === si && f === si || (y += "skew(" + h + ", " + f + li), 1 === p && 1 === d || (y += "scale(" + p + ", " + d + li), _.style[qn] = y || "translate(0, 0)"
        },
        ci = function(t, e) {
            var r, n, i, o, s, a = e || this,
                l = a.xPercent,
                u = a.yPercent,
                c = a.x,
                h = a.y,
                f = a.rotation,
                p = a.skewX,
                d = a.skewY,
                g = a.scaleX,
                m = a.scaleY,
                _ = a.target,
                v = a.xOrigin,
                y = a.yOrigin,
                w = a.xOffset,
                x = a.yOffset,
                b = a.forceCSS,
                e = parseFloat(c),
                a = parseFloat(h),
                f = parseFloat(f),
                p = parseFloat(p);
            (d = parseFloat(d)) && (p += d = parseFloat(d), f += d), f || p ? (f *= In, p *= In, r = Math.cos(f) * g, n = Math.sin(f) * g, i = Math.sin(f - p) * -m, o = Math.cos(f - p) * m, p && (d *= In, s = Math.tan(p - d), i *= s = Math.sqrt(1 + s * s), o *= s, d && (s = Math.tan(d), r *= s = Math.sqrt(1 + s * s), n *= s)), r = B(r), n = B(n), i = B(i), o = B(o)) : (r = g, o = m, n = i = 0), (e && !~(c + "").indexOf("px") || a && !~(h + "").indexOf("px")) && (e = nn(_, "x", c, "px"), a = nn(_, "y", h, "px")), (v || y || w || x) && (e = B(e + v - (v * r + y * i) + w), a = B(a + y - (v * n + y * o) + x)), (l || u) && (e = B(e + l / 100 * (s = _.getBBox()).width), a = B(a + u / 100 * s.height)), _.setAttribute("transform", s = "matrix(" + r + "," + n + "," + i + "," + o + "," + e + "," + a + ")"), b && (_.style[qn] = s)
        };
    p("padding,margin,Width,Radius", function(e, r) {
        var t = "Right",
            n = "Bottom",
            i = "Left",
            a = (r < 3 ? ["Top", t, n, i] : ["Top" + i, "Top" + t, n + t, n + i]).map(function(t) {
                return r < 2 ? e + t : "border" + t + e
            });
        ti[1 < r ? "border" + e : e] = function(e, t, r, n, i) {
            var o, s;
            if (arguments.length < 4) return o = a.map(function(t) {
                return $n(e, t, r)
            }), 5 === (s = o.join(" ")).split(o[0]).length ? o[0] : s;
            o = (n + "").split(" "), s = {}, a.forEach(function(t, e) {
                return s[t] = o[e] = o[e] || o[(e - 1) / 2 | 0]
            }), e.init(t, s, i)
        }
    });
    var hi, fi = {
        name: "css",
        register: Qr,
        targetTest: function(t) {
            return t.style && t.nodeType
        },
        init: function(t, e, r, n, i) {
            var o, s, a, l, u, c, h, f, p, d, g, m, _, v, y, w, x, b, T, S, k, M, O, P = this._props,
                E = t.style,
                C = r.vars.startAt;
            for (u in gn || Qr(), this.styles = this.styles || Vr(t), v = this.styles.props, this.tween = r, e)
                if ("autoRound" !== u && (s = e[u], !ye[u] || !Ge(u, e, r, n, t, i)))
                    if (T = typeof s, b = ti[u], "function" === T && (T = typeof(s = s.call(r, n, t, i))), "string" === T && ~s.indexOf("random(") && (s = nt(s)), b) b(this, t, u, s, r) && (_ = 1);
                    else if ("--" === u.substr(0, 2)) o = (getComputedStyle(t).getPropertyValue(u) + "").trim(), s += "", De.lastIndex = 0, De.test(o) || (c = G(o), h = G(s)), h ? c !== h && (o = nn(t, u, o, h) + h) : c && (s += c), this.add(E, "setProperty", o, s, n, i, 0, 0, u), P.push(u), v.push(u, 0, E[u]);
            else if ("undefined" !== T) {
                if (C && u in C ? (G((o = A(o = "function" == typeof C[u] ? C[u].call(r, n, t, i) : C[u]) && ~o.indexOf("random(") ? nt(o) : o) + "") || (o += Vt.units[u] || G($n(t, u)) || ""), "=" === (o + "").charAt(1) && (o = $n(t, u))) : o = $n(t, u), l = parseFloat(o), (f = "string" === T && "=" === s.charAt(1) && s.substr(0, 2)) && (s = s.substr(2)), a = parseFloat(s), u in jn && ("autoAlpha" === u && (1 === l && "hidden" === $n(t, "visibility") && a && (l = 0), v.push("visibility", 0, E.visibility), rn(this, E, "visibility", l ? "inherit" : "hidden", a ? "inherit" : "hidden", !a)), "scale" !== u && "transform" !== u && ~(u = jn[u]).indexOf(",") && (u = u.split(",")[0])), p = u in Bn)
                    if (this.styles.save(u), d || ((g = t._gsap).renderTransform && !e.parseTransform || ni(t, e.parseTransform), m = !1 !== e.smoothOrigin && g.smooth, (d = this._pt = new mr(this._pt, E, qn, 0, 1, g.renderTransform, g, 0, -1)).dep = 1), "scale" === u) this._pt = new mr(this._pt, g, "scaleY", g.scaleY, (f ? I(g.scaleY, f + a) : a) - g.scaleY || 0, Rr), this._pt.u = 0, P.push("scaleY", u), u += "X";
                    else {
                        if ("transformOrigin" === u) {
                            v.push(Vn, 0, E[Vn]), O = M = k = void 0, k = (S = s).split(" "), M = k[0], O = k[1] || "50%", "top" !== M && "bottom" !== M && "left" !== O && "right" !== O || (S = M, M = O, O = S), k[0] = Jn[M] || M, k[1] = Jn[O] || O, s = k.join(" "), g.svg ? cn(t, s, 0, m, 0, this) : ((h = parseFloat(s.split(" ")[2]) || 0) !== g.zOrigin && rn(this, g, "zOrigin", g.zOrigin, h), rn(this, E, u, ii(o), ii(s)));
                            continue
                        }
                        if ("svgOrigin" === u) {
                            cn(t, s, 1, m, 0, this);
                            continue
                        }
                        if (u in ri) {
                            y = this, w = g, x = u, b = l, T = f ? I(l, f + s) : s, k = O = M = S = void 0, S = 360, M = A(T), O = parseFloat(T) * (M && ~T.indexOf("rad") ? Xn : 1) - b, k = b + O + "deg", M && ("short" === (T = T.split("_")[1]) && (O %= S) != O % 180 && (O += O < 0 ? S : -S), "cw" === T && O < 0 ? O = (O + 36e9) % S - ~~(O / S) * S : "ccw" === T && 0 < O && (O = (O - 36e9) % S - ~~(O / S) * S)), y._pt = O = new mr(y._pt, w, x, b, O, Dr), O.e = k, O.u = "deg", y._props.push(x);
                            continue
                        }
                        if ("smoothOrigin" === u) {
                            rn(this, g, "smooth", g.smooth, s);
                            continue
                        }
                        if ("force3D" === u) {
                            g[u] = s;
                            continue
                        }
                        if ("transform" === u) {
                            ! function(t, e, r) {
                                var n, i, o, s, a, l, u = fn({}, r._gsap),
                                    c = r.style;
                                for (i in u.svg ? (o = r.getAttribute("transform"), r.setAttribute("transform", ""), c[qn] = e, n = ni(r, 1), en(r, qn), r.setAttribute("transform", o)) : (o = getComputedStyle(r)[qn], c[qn] = e, n = ni(r, 1), c[qn] = o), Bn)(o = u[i]) !== (a = n[i]) && "perspective,force3D,transformOrigin,svgOrigin".indexOf(i) < 0 && (s = G(o) !== (l = G(a)) ? nn(r, i, o, l) : parseFloat(o), a = parseFloat(a), t._pt = new mr(t._pt, n, i, s, a - s, Rr), t._pt.u = l || 0, t._props.push(i));
                                fn(n, u)
                            }(this, s, t);
                            continue
                        }
                    }
                else u in E || (u = Kn(u) || u);
                if (p || (a || 0 === a) && (l || 0 === l) && !Hn.test(s) && u in E) a = a || 0, (c = (o + "").substr((l + "").length)) !== (h = G(s) || (u in Vt.units ? Vt.units[u] : c)) && (l = nn(t, u, o, h)), this._pt = new mr(this._pt, p ? g : E, u, l, (f ? I(l, f + a) : a) - l, p || "px" !== h && "zIndex" !== u || !1 === e.autoRound ? Rr : Lr), this._pt.u = h || 0, c !== h && "%" !== h && (this._pt.b = o, this._pt.r = zr);
                else if (u in E) on.call(this, t, u, o, f ? f + s : s);
                else if (u in t) this.add(t, u, o || t[u], f ? f + s : s, n, i);
                else if ("parseTransform" !== u) {
                    D(u, s);
                    continue
                }
                p || (u in E ? v.push(u, 0, E[u]) : v.push(u, 1, o || t[u])), P.push(u)
            }
            _ && gr(this)
        },
        render: function(t, e) {
            if (e.tween._time || !vn())
                for (var r = e._pt; r;) r.r(t, r.d), r = r._next;
            else e.styles.revert()
        },
        get: $n,
        aliases: jn,
        getSetter: function(t, e, r) {
            var n = jn[e];
            return (e = n && n.indexOf(",") < 0 ? n : e) in Bn && e !== Vn && (t._gsap.x || $n(t, "x")) ? r && _n === r ? "scale" === e ? Wr : Ir : (_n = r || {}) && ("scale" === e ? Nr : Ur) : t.style && !i(t.style[e]) ? Br : ~e.indexOf("-") ? Xr : lr(t, e)
        },
        core: {
            _removeProperty: en,
            _getMatrix: un
        }
    };
    Ar.utils.checkPrefix = Kn, Ar.core.getStyleSaver = Vr, hi = p("x,y,z,scale,scaleX,scaleY,xPercent,yPercent" + "," + (di = "rotation,rotationX,rotationY,skewX,skewY") + ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", function(t) {
        Bn[t] = 1
    }), p(di, function(t) {
        Vt.units[t] = "deg", ri[t] = 1
    }), jn[hi[13]] = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent," + di, p("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY", function(t) {
        t = t.split(":");
        jn[t[1]] = hi[t[0]]
    }), p("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(t) {
        Vt.units[t] = "px"
    }), Ar.registerPlugin(fi);
    var pi = Ar.registerPlugin(fi) || Ar,
        di = pi.core.Tween;
    t.Back = Rn, t.Bounce = zn, t.CSSPlugin = fi, t.Circ = Yn, t.Cubic = On, t.Elastic = An, t.Expo = Fn, t.Linear = kn, t.Power0 = wn, t.Power1 = xn, t.Power2 = bn, t.Power3 = Tn, t.Power4 = Sn, t.Quad = Mn, t.Quart = Pn, t.Quint = En, t.Sine = Ln, t.SteppedEase = Dn, t.Strong = Cn, t.TimelineLite = Ve, t.TimelineMax = Ve, t.TweenLite = rr, t.TweenMax = di, t.default = pi, t.gsap = pi, "undefined" == typeof window || window !== t ? Object.defineProperty(t, "__esModule", {
        value: !0
    }) : delete t.default
}),
function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = t || self).window = t.window || {})
}(this, function(t) {
    "use strict";

    function e() {

        return "undefined" != typeof window
    }

    function r() {
        return f || e() && (f = window.gsap) && f.registerPlugin && f
    }

    function a(t) {
        return "string" == typeof t
    }

    function l(t) {
        return "function" == typeof t
    }

    function d(t, e) {
        var r = "x" === e ? "Width" : "Height",
            n = "scroll" + r,
            e = "client" + r;
        return t === g || t === i || t === s ? Math.max(i[n], s[n]) - (g["inner" + r] || i[e] || s[e]) : t[n] - t["offset" + r]
    }

    function u(t, e) {
        var r = "scroll" + ("x" === e ? "Left" : "Top");
        return t === g && (null != t.pageXOffset ? r = "page" + e.toUpperCase() + "Offset" : t = null != i[r] ? i : s),
            function() {
                return t[r]
            }
    }

    function o(t, e) {
        if (!(t = m(t)[0]) || !t.getBoundingClientRect) return console.warn("scrollTo target doesn't exist. Using 0") || {
            x: 0,
            y: 0
        };
        var r = t.getBoundingClientRect(),
            n = !e || e === g || e === s,
            t = n ? {
                top: i.clientTop - (g.pageYOffset || i.scrollTop || s.scrollTop || 0),
                left: i.clientLeft - (g.pageXOffset || i.scrollLeft || s.scrollLeft || 0)
            } : e.getBoundingClientRect(),
            t = {
                x: r.left - t.left,
                y: r.top - t.top
            };
        return !n && e && (t.x += u(e, "x")(), t.y += u(e, "y")()), t
    }

    function c(t, e, r, n, i) {
        return isNaN(t) || "object" == typeof t ? a(t) && "=" === t.charAt(1) ? parseFloat(t.substr(2)) * ("-" === t.charAt(0) ? -1 : 1) + n - i : "max" === t ? d(e, r) - i : Math.min(d(e, r), o(t, e)[r] - i) : parseFloat(t) - i
    }

    function h() {
        f = r(), e() && f && "undefined" != typeof document && document.body && (g = window, s = document.body, i = document.documentElement, m = f.utils.toArray, f.config({
            autoKillThreshold: 7
        }), _ = f.config(), p = 1)
    }
    var f, p, g, i, s, m, _, v, n = {
        version: "3.11.5",
        name: "scrollTo",
        rawVars: 1,
        register: function(t) {
            f = t, h()
        },
        init: function(t, e, r, n, i) {
            p || h();
            var o = this,
                s = f.getProperty(t, "scrollSnapType");
            o.isWin = t === g, o.target = t, o.tween = r, e = function(t, e, r, n) {
                if ("object" != typeof(t = l(t) ? t(e, r, n) : t)) return a(t) && "max" !== t && "=" !== t.charAt(1) ? {
                    x: t,
                    y: t
                } : {
                    y: t
                };
                if (t.nodeType) return {
                    y: t,
                    x: t
                };
                var i, o = {};
                for (i in t) o[i] = "onAutoKill" !== i && l(t[i]) ? t[i](e, r, n) : t[i];
                return o
            }(e, n, t, i), o.vars = e, o.autoKill = !!e.autoKill, o.getX = u(t, "x"), o.getY = u(t, "y"), o.x = o.xPrev = o.getX(), o.y = o.yPrev = o.getY(), v = v || f.core.globals().ScrollTrigger, "smooth" === f.getProperty(t, "scrollBehavior") && f.set(t, {
                scrollBehavior: "auto"
            }), s && "none" !== s && (o.snap = 1, o.snapInline = t.style.scrollSnapType, t.style.scrollSnapType = "none"), null != e.x ? (o.add(o, "x", o.x, c(e.x, t, "x", o.x, e.offsetX || 0), n, i), o._props.push("scrollTo_x")) : o.skipX = 1, null != e.y ? (o.add(o, "y", o.y, c(e.y, t, "y", o.y, e.offsetY || 0), n, i), o._props.push("scrollTo_y")) : o.skipY = 1
        },
        render: function(t, e) {
            for (var r, n, i, o = e._pt, s = e.target, a = e.tween, l = e.autoKill, u = e.xPrev, c = e.yPrev, h = e.isWin, f = e.snap, p = e.snapInline; o;) o.r(t, o.d), o = o._next;
            r = h || !e.skipX ? e.getX() : u, i = (n = h || !e.skipY ? e.getY() : c) - c, c = r - u, u = _.autoKillThreshold, e.x < 0 && (e.x = 0), e.y < 0 && (e.y = 0), l && (!e.skipX && (u < c || c < -u) && r < d(s, "x") && (e.skipX = 1), !e.skipY && (u < i || i < -u) && n < d(s, "y") && (e.skipY = 1), e.skipX && e.skipY && (a.kill(), e.vars.onAutoKill && e.vars.onAutoKill.apply(a, e.vars.onAutoKillParams || []))), h ? g.scrollTo(e.skipX ? r : e.x, e.skipY ? n : e.y) : (e.skipY || (s.scrollTop = e.y), e.skipX || (s.scrollLeft = e.x)), !f || 1 !== t && 0 !== t || (n = s.scrollTop, r = s.scrollLeft, p ? s.style.scrollSnapType = p : s.style.removeProperty("scroll-snap-type"), s.scrollTop = n + 1, s.scrollLeft = r + 1, s.scrollTop = n, s.scrollLeft = r), e.xPrev = e.x, e.yPrev = e.y, v && v.update()
        },
        kill: function(t) {
            var e = "scrollTo" === t;
            !e && "scrollTo_x" !== t || (this.skipX = 1), !e && "scrollTo_y" !== t || (this.skipY = 1)
        }
    };
    n.max = d, n.getOffset = o, n.buildGetter = u, r() && f.registerPlugin(n), t.ScrollToPlugin = n, t.default = n, "undefined" == typeof window || window !== t ? Object.defineProperty(t, "__esModule", {
        value: !0
    }) : delete t.default
}),
function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = t || self).window = t.window || {})
}(this, function(t) {
    "use strict";

    function e() {
        return "undefined" != typeof window
    }

    function r() {
        return i || e() && (i = window.gsap) && i.registerPlugin && i
    }

    function u() {
        return o || (n(), s || console.warn("Please gsap.registerPlugin(CSSPlugin, CSSRulePlugin)")), o
    }

    function n(t) {
        i = t || r(), e() && (c = document), i && (s = i.plugins.css) && (o = 1)
    }
    var i, o, c, s, a = {
        version: "3.11.5",
        name: "cssRule",
        init: function(t, e, r, n, i) {
            if (!u() || void 0 === t.cssText) return !1;
            var o = t._gsProxy = t._gsProxy || c.createElement("div");
            this.ss = t, this.style = o.style, o.style.cssText = t.cssText, s.prototype.init.call(this, o, e, r, n, i)
        },
        render: function(t, e) {
            for (var r, n = e._pt, i = e.style, o = e.ss; n;) n.r(t, n.d), n = n._next;
            for (r = i.length; - 1 < --r;) o[i[r]] = i[i[r]]
        },
        getRule: function(t) {
            u();
            var e, r, n, i, o = c.all ? "rules" : "cssRules",
                s = c.styleSheets,
                a = s.length,
                l = ":" === t.charAt(0);
            for (t = (l ? "" : ",") + t.split("::").join(":").toLowerCase() + ",", l && (i = []); a--;) {
                try {
                    if (!(r = s[a][o])) continue;
                    e = r.length
                } catch (t) {
                    console.warn(t);
                    continue
                }
                for (; - 1 < --e;)
                    if ((n = r[e]).selectorText && -1 !== ("," + n.selectorText.split("::").join(":").toLowerCase() + ",").indexOf(t)) {
                        if (!l) return n.style;
                        i.push(n.style)
                    }
            }
            return i
        },
        register: n
    };
    r() && i.registerPlugin(a), t.CSSRulePlugin = a, t.default = a, "undefined" == typeof window || window !== t ? Object.defineProperty(t, "__esModule", {
        value: !0
    }) : delete t.default
});