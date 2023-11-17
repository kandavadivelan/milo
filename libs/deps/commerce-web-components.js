(() => {
  // ../../node_modules/@lit/reactive-element/css-tag.js
  var t = window;
  var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s = Symbol();
  var n = /* @__PURE__ */ new WeakMap();
  var o = class {
    constructor(t3, e4, n5) {
      if (this._$cssResult$ = true, n5 !== s)
        throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t3, this.t = e4;
    }
    get styleSheet() {
      let t3 = this.o;
      const s5 = this.t;
      if (e && void 0 === t3) {
        const e4 = void 0 !== s5 && 1 === s5.length;
        e4 && (t3 = n.get(s5)), void 0 === t3 && ((this.o = t3 = new CSSStyleSheet()).replaceSync(this.cssText), e4 && n.set(s5, t3));
      }
      return t3;
    }
    toString() {
      return this.cssText;
    }
  };
  var r = (t3) => new o("string" == typeof t3 ? t3 : t3 + "", void 0, s);
  var i = (t3, ...e4) => {
    const n5 = 1 === t3.length ? t3[0] : e4.reduce((e5, s5, n6) => e5 + ((t4) => {
      if (true === t4._$cssResult$)
        return t4.cssText;
      if ("number" == typeof t4)
        return t4;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t4 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s5) + t3[n6 + 1], t3[0]);
    return new o(n5, t3, s);
  };
  var S = (s5, n5) => {
    e ? s5.adoptedStyleSheets = n5.map((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet) : n5.forEach((e4) => {
      const n6 = document.createElement("style"), o5 = t.litNonce;
      void 0 !== o5 && n6.setAttribute("nonce", o5), n6.textContent = e4.cssText, s5.appendChild(n6);
    });
  };
  var c = e ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((t4) => {
    let e4 = "";
    for (const s5 of t4.cssRules)
      e4 += s5.cssText;
    return r(e4);
  })(t3) : t3;

  // ../../node_modules/@lit/reactive-element/reactive-element.js
  var s2;
  var e2 = window;
  var r2 = e2.trustedTypes;
  var h = r2 ? r2.emptyScript : "";
  var o2 = e2.reactiveElementPolyfillSupport;
  var n2 = { toAttribute(t3, i3) {
    switch (i3) {
      case Boolean:
        t3 = t3 ? h : null;
        break;
      case Object:
      case Array:
        t3 = null == t3 ? t3 : JSON.stringify(t3);
    }
    return t3;
  }, fromAttribute(t3, i3) {
    let s5 = t3;
    switch (i3) {
      case Boolean:
        s5 = null !== t3;
        break;
      case Number:
        s5 = null === t3 ? null : Number(t3);
        break;
      case Object:
      case Array:
        try {
          s5 = JSON.parse(t3);
        } catch (t4) {
          s5 = null;
        }
    }
    return s5;
  } };
  var a = (t3, i3) => i3 !== t3 && (i3 == i3 || t3 == t3);
  var l = { attribute: true, type: String, converter: n2, reflect: false, hasChanged: a };
  var d = "finalized";
  var u = class extends HTMLElement {
    constructor() {
      super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this._$Eu();
    }
    static addInitializer(t3) {
      var i3;
      this.finalize(), (null !== (i3 = this.h) && void 0 !== i3 ? i3 : this.h = []).push(t3);
    }
    static get observedAttributes() {
      this.finalize();
      const t3 = [];
      return this.elementProperties.forEach((i3, s5) => {
        const e4 = this._$Ep(s5, i3);
        void 0 !== e4 && (this._$Ev.set(e4, s5), t3.push(e4));
      }), t3;
    }
    static createProperty(t3, i3 = l) {
      if (i3.state && (i3.attribute = false), this.finalize(), this.elementProperties.set(t3, i3), !i3.noAccessor && !this.prototype.hasOwnProperty(t3)) {
        const s5 = "symbol" == typeof t3 ? Symbol() : "__" + t3, e4 = this.getPropertyDescriptor(t3, s5, i3);
        void 0 !== e4 && Object.defineProperty(this.prototype, t3, e4);
      }
    }
    static getPropertyDescriptor(t3, i3, s5) {
      return { get() {
        return this[i3];
      }, set(e4) {
        const r4 = this[t3];
        this[i3] = e4, this.requestUpdate(t3, r4, s5);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t3) {
      return this.elementProperties.get(t3) || l;
    }
    static finalize() {
      if (this.hasOwnProperty(d))
        return false;
      this[d] = true;
      const t3 = Object.getPrototypeOf(this);
      if (t3.finalize(), void 0 !== t3.h && (this.h = [...t3.h]), this.elementProperties = new Map(t3.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
        const t4 = this.properties, i3 = [...Object.getOwnPropertyNames(t4), ...Object.getOwnPropertySymbols(t4)];
        for (const s5 of i3)
          this.createProperty(s5, t4[s5]);
      }
      return this.elementStyles = this.finalizeStyles(this.styles), true;
    }
    static finalizeStyles(i3) {
      const s5 = [];
      if (Array.isArray(i3)) {
        const e4 = new Set(i3.flat(1 / 0).reverse());
        for (const i4 of e4)
          s5.unshift(c(i4));
      } else
        void 0 !== i3 && s5.push(c(i3));
      return s5;
    }
    static _$Ep(t3, i3) {
      const s5 = i3.attribute;
      return false === s5 ? void 0 : "string" == typeof s5 ? s5 : "string" == typeof t3 ? t3.toLowerCase() : void 0;
    }
    _$Eu() {
      var t3;
      this._$E_ = new Promise((t4) => this.enableUpdating = t4), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), null === (t3 = this.constructor.h) || void 0 === t3 || t3.forEach((t4) => t4(this));
    }
    addController(t3) {
      var i3, s5;
      (null !== (i3 = this._$ES) && void 0 !== i3 ? i3 : this._$ES = []).push(t3), void 0 !== this.renderRoot && this.isConnected && (null === (s5 = t3.hostConnected) || void 0 === s5 || s5.call(t3));
    }
    removeController(t3) {
      var i3;
      null === (i3 = this._$ES) || void 0 === i3 || i3.splice(this._$ES.indexOf(t3) >>> 0, 1);
    }
    _$Eg() {
      this.constructor.elementProperties.forEach((t3, i3) => {
        this.hasOwnProperty(i3) && (this._$Ei.set(i3, this[i3]), delete this[i3]);
      });
    }
    createRenderRoot() {
      var t3;
      const s5 = null !== (t3 = this.shadowRoot) && void 0 !== t3 ? t3 : this.attachShadow(this.constructor.shadowRootOptions);
      return S(s5, this.constructor.elementStyles), s5;
    }
    connectedCallback() {
      var t3;
      void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t3 = this._$ES) || void 0 === t3 || t3.forEach((t4) => {
        var i3;
        return null === (i3 = t4.hostConnected) || void 0 === i3 ? void 0 : i3.call(t4);
      });
    }
    enableUpdating(t3) {
    }
    disconnectedCallback() {
      var t3;
      null === (t3 = this._$ES) || void 0 === t3 || t3.forEach((t4) => {
        var i3;
        return null === (i3 = t4.hostDisconnected) || void 0 === i3 ? void 0 : i3.call(t4);
      });
    }
    attributeChangedCallback(t3, i3, s5) {
      this._$AK(t3, s5);
    }
    _$EO(t3, i3, s5 = l) {
      var e4;
      const r4 = this.constructor._$Ep(t3, s5);
      if (void 0 !== r4 && true === s5.reflect) {
        const h3 = (void 0 !== (null === (e4 = s5.converter) || void 0 === e4 ? void 0 : e4.toAttribute) ? s5.converter : n2).toAttribute(i3, s5.type);
        this._$El = t3, null == h3 ? this.removeAttribute(r4) : this.setAttribute(r4, h3), this._$El = null;
      }
    }
    _$AK(t3, i3) {
      var s5;
      const e4 = this.constructor, r4 = e4._$Ev.get(t3);
      if (void 0 !== r4 && this._$El !== r4) {
        const t4 = e4.getPropertyOptions(r4), h3 = "function" == typeof t4.converter ? { fromAttribute: t4.converter } : void 0 !== (null === (s5 = t4.converter) || void 0 === s5 ? void 0 : s5.fromAttribute) ? t4.converter : n2;
        this._$El = r4, this[r4] = h3.fromAttribute(i3, t4.type), this._$El = null;
      }
    }
    requestUpdate(t3, i3, s5) {
      let e4 = true;
      void 0 !== t3 && (((s5 = s5 || this.constructor.getPropertyOptions(t3)).hasChanged || a)(this[t3], i3) ? (this._$AL.has(t3) || this._$AL.set(t3, i3), true === s5.reflect && this._$El !== t3 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t3, s5))) : e4 = false), !this.isUpdatePending && e4 && (this._$E_ = this._$Ej());
    }
    async _$Ej() {
      this.isUpdatePending = true;
      try {
        await this._$E_;
      } catch (t4) {
        Promise.reject(t4);
      }
      const t3 = this.scheduleUpdate();
      return null != t3 && await t3, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      var t3;
      if (!this.isUpdatePending)
        return;
      this.hasUpdated, this._$Ei && (this._$Ei.forEach((t4, i4) => this[i4] = t4), this._$Ei = void 0);
      let i3 = false;
      const s5 = this._$AL;
      try {
        i3 = this.shouldUpdate(s5), i3 ? (this.willUpdate(s5), null === (t3 = this._$ES) || void 0 === t3 || t3.forEach((t4) => {
          var i4;
          return null === (i4 = t4.hostUpdate) || void 0 === i4 ? void 0 : i4.call(t4);
        }), this.update(s5)) : this._$Ek();
      } catch (t4) {
        throw i3 = false, this._$Ek(), t4;
      }
      i3 && this._$AE(s5);
    }
    willUpdate(t3) {
    }
    _$AE(t3) {
      var i3;
      null === (i3 = this._$ES) || void 0 === i3 || i3.forEach((t4) => {
        var i4;
        return null === (i4 = t4.hostUpdated) || void 0 === i4 ? void 0 : i4.call(t4);
      }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t3)), this.updated(t3);
    }
    _$Ek() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$E_;
    }
    shouldUpdate(t3) {
      return true;
    }
    update(t3) {
      void 0 !== this._$EC && (this._$EC.forEach((t4, i3) => this._$EO(i3, this[i3], t4)), this._$EC = void 0), this._$Ek();
    }
    updated(t3) {
    }
    firstUpdated(t3) {
    }
  };
  u[d] = true, u.elementProperties = /* @__PURE__ */ new Map(), u.elementStyles = [], u.shadowRootOptions = { mode: "open" }, null == o2 || o2({ ReactiveElement: u }), (null !== (s2 = e2.reactiveElementVersions) && void 0 !== s2 ? s2 : e2.reactiveElementVersions = []).push("1.6.3");

  // ../../node_modules/lit-html/lit-html.js
  var t2;
  var i2 = window;
  var s3 = i2.trustedTypes;
  var e3 = s3 ? s3.createPolicy("lit-html", { createHTML: (t3) => t3 }) : void 0;
  var o3 = "$lit$";
  var n3 = `lit$${(Math.random() + "").slice(9)}$`;
  var l2 = "?" + n3;
  var h2 = `<${l2}>`;
  var r3 = document;
  var u2 = () => r3.createComment("");
  var d2 = (t3) => null === t3 || "object" != typeof t3 && "function" != typeof t3;
  var c2 = Array.isArray;
  var v = (t3) => c2(t3) || "function" == typeof (null == t3 ? void 0 : t3[Symbol.iterator]);
  var a2 = "[ 	\n\f\r]";
  var f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var _ = /-->/g;
  var m = />/g;
  var p = RegExp(`>|${a2}(?:([^\\s"'>=/]+)(${a2}*=${a2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var g = /'/g;
  var $ = /"/g;
  var y = /^(?:script|style|textarea|title)$/i;
  var w = (t3) => (i3, ...s5) => ({ _$litType$: t3, strings: i3, values: s5 });
  var x = w(1);
  var b = w(2);
  var T = Symbol.for("lit-noChange");
  var A = Symbol.for("lit-nothing");
  var E = /* @__PURE__ */ new WeakMap();
  var C = r3.createTreeWalker(r3, 129, null, false);
  function P(t3, i3) {
    if (!Array.isArray(t3) || !t3.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return void 0 !== e3 ? e3.createHTML(i3) : i3;
  }
  var V = (t3, i3) => {
    const s5 = t3.length - 1, e4 = [];
    let l4, r4 = 2 === i3 ? "<svg>" : "", u3 = f;
    for (let i4 = 0; i4 < s5; i4++) {
      const s6 = t3[i4];
      let d3, c3, v2 = -1, a3 = 0;
      for (; a3 < s6.length && (u3.lastIndex = a3, c3 = u3.exec(s6), null !== c3); )
        a3 = u3.lastIndex, u3 === f ? "!--" === c3[1] ? u3 = _ : void 0 !== c3[1] ? u3 = m : void 0 !== c3[2] ? (y.test(c3[2]) && (l4 = RegExp("</" + c3[2], "g")), u3 = p) : void 0 !== c3[3] && (u3 = p) : u3 === p ? ">" === c3[0] ? (u3 = null != l4 ? l4 : f, v2 = -1) : void 0 === c3[1] ? v2 = -2 : (v2 = u3.lastIndex - c3[2].length, d3 = c3[1], u3 = void 0 === c3[3] ? p : '"' === c3[3] ? $ : g) : u3 === $ || u3 === g ? u3 = p : u3 === _ || u3 === m ? u3 = f : (u3 = p, l4 = void 0);
      const w2 = u3 === p && t3[i4 + 1].startsWith("/>") ? " " : "";
      r4 += u3 === f ? s6 + h2 : v2 >= 0 ? (e4.push(d3), s6.slice(0, v2) + o3 + s6.slice(v2) + n3 + w2) : s6 + n3 + (-2 === v2 ? (e4.push(void 0), i4) : w2);
    }
    return [P(t3, r4 + (t3[s5] || "<?>") + (2 === i3 ? "</svg>" : "")), e4];
  };
  var N = class _N {
    constructor({ strings: t3, _$litType$: i3 }, e4) {
      let h3;
      this.parts = [];
      let r4 = 0, d3 = 0;
      const c3 = t3.length - 1, v2 = this.parts, [a3, f2] = V(t3, i3);
      if (this.el = _N.createElement(a3, e4), C.currentNode = this.el.content, 2 === i3) {
        const t4 = this.el.content, i4 = t4.firstChild;
        i4.remove(), t4.append(...i4.childNodes);
      }
      for (; null !== (h3 = C.nextNode()) && v2.length < c3; ) {
        if (1 === h3.nodeType) {
          if (h3.hasAttributes()) {
            const t4 = [];
            for (const i4 of h3.getAttributeNames())
              if (i4.endsWith(o3) || i4.startsWith(n3)) {
                const s5 = f2[d3++];
                if (t4.push(i4), void 0 !== s5) {
                  const t5 = h3.getAttribute(s5.toLowerCase() + o3).split(n3), i5 = /([.?@])?(.*)/.exec(s5);
                  v2.push({ type: 1, index: r4, name: i5[2], strings: t5, ctor: "." === i5[1] ? H : "?" === i5[1] ? L : "@" === i5[1] ? z : k });
                } else
                  v2.push({ type: 6, index: r4 });
              }
            for (const i4 of t4)
              h3.removeAttribute(i4);
          }
          if (y.test(h3.tagName)) {
            const t4 = h3.textContent.split(n3), i4 = t4.length - 1;
            if (i4 > 0) {
              h3.textContent = s3 ? s3.emptyScript : "";
              for (let s5 = 0; s5 < i4; s5++)
                h3.append(t4[s5], u2()), C.nextNode(), v2.push({ type: 2, index: ++r4 });
              h3.append(t4[i4], u2());
            }
          }
        } else if (8 === h3.nodeType)
          if (h3.data === l2)
            v2.push({ type: 2, index: r4 });
          else {
            let t4 = -1;
            for (; -1 !== (t4 = h3.data.indexOf(n3, t4 + 1)); )
              v2.push({ type: 7, index: r4 }), t4 += n3.length - 1;
          }
        r4++;
      }
    }
    static createElement(t3, i3) {
      const s5 = r3.createElement("template");
      return s5.innerHTML = t3, s5;
    }
  };
  function S2(t3, i3, s5 = t3, e4) {
    var o5, n5, l4, h3;
    if (i3 === T)
      return i3;
    let r4 = void 0 !== e4 ? null === (o5 = s5._$Co) || void 0 === o5 ? void 0 : o5[e4] : s5._$Cl;
    const u3 = d2(i3) ? void 0 : i3._$litDirective$;
    return (null == r4 ? void 0 : r4.constructor) !== u3 && (null === (n5 = null == r4 ? void 0 : r4._$AO) || void 0 === n5 || n5.call(r4, false), void 0 === u3 ? r4 = void 0 : (r4 = new u3(t3), r4._$AT(t3, s5, e4)), void 0 !== e4 ? (null !== (l4 = (h3 = s5)._$Co) && void 0 !== l4 ? l4 : h3._$Co = [])[e4] = r4 : s5._$Cl = r4), void 0 !== r4 && (i3 = S2(t3, r4._$AS(t3, i3.values), r4, e4)), i3;
  }
  var M = class {
    constructor(t3, i3) {
      this._$AV = [], this._$AN = void 0, this._$AD = t3, this._$AM = i3;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t3) {
      var i3;
      const { el: { content: s5 }, parts: e4 } = this._$AD, o5 = (null !== (i3 = null == t3 ? void 0 : t3.creationScope) && void 0 !== i3 ? i3 : r3).importNode(s5, true);
      C.currentNode = o5;
      let n5 = C.nextNode(), l4 = 0, h3 = 0, u3 = e4[0];
      for (; void 0 !== u3; ) {
        if (l4 === u3.index) {
          let i4;
          2 === u3.type ? i4 = new R(n5, n5.nextSibling, this, t3) : 1 === u3.type ? i4 = new u3.ctor(n5, u3.name, u3.strings, this, t3) : 6 === u3.type && (i4 = new Z(n5, this, t3)), this._$AV.push(i4), u3 = e4[++h3];
        }
        l4 !== (null == u3 ? void 0 : u3.index) && (n5 = C.nextNode(), l4++);
      }
      return C.currentNode = r3, o5;
    }
    v(t3) {
      let i3 = 0;
      for (const s5 of this._$AV)
        void 0 !== s5 && (void 0 !== s5.strings ? (s5._$AI(t3, s5, i3), i3 += s5.strings.length - 2) : s5._$AI(t3[i3])), i3++;
    }
  };
  var R = class _R {
    constructor(t3, i3, s5, e4) {
      var o5;
      this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t3, this._$AB = i3, this._$AM = s5, this.options = e4, this._$Cp = null === (o5 = null == e4 ? void 0 : e4.isConnected) || void 0 === o5 || o5;
    }
    get _$AU() {
      var t3, i3;
      return null !== (i3 = null === (t3 = this._$AM) || void 0 === t3 ? void 0 : t3._$AU) && void 0 !== i3 ? i3 : this._$Cp;
    }
    get parentNode() {
      let t3 = this._$AA.parentNode;
      const i3 = this._$AM;
      return void 0 !== i3 && 11 === (null == t3 ? void 0 : t3.nodeType) && (t3 = i3.parentNode), t3;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t3, i3 = this) {
      t3 = S2(this, t3, i3), d2(t3) ? t3 === A || null == t3 || "" === t3 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t3 !== this._$AH && t3 !== T && this._(t3) : void 0 !== t3._$litType$ ? this.g(t3) : void 0 !== t3.nodeType ? this.$(t3) : v(t3) ? this.T(t3) : this._(t3);
    }
    k(t3) {
      return this._$AA.parentNode.insertBefore(t3, this._$AB);
    }
    $(t3) {
      this._$AH !== t3 && (this._$AR(), this._$AH = this.k(t3));
    }
    _(t3) {
      this._$AH !== A && d2(this._$AH) ? this._$AA.nextSibling.data = t3 : this.$(r3.createTextNode(t3)), this._$AH = t3;
    }
    g(t3) {
      var i3;
      const { values: s5, _$litType$: e4 } = t3, o5 = "number" == typeof e4 ? this._$AC(t3) : (void 0 === e4.el && (e4.el = N.createElement(P(e4.h, e4.h[0]), this.options)), e4);
      if ((null === (i3 = this._$AH) || void 0 === i3 ? void 0 : i3._$AD) === o5)
        this._$AH.v(s5);
      else {
        const t4 = new M(o5, this), i4 = t4.u(this.options);
        t4.v(s5), this.$(i4), this._$AH = t4;
      }
    }
    _$AC(t3) {
      let i3 = E.get(t3.strings);
      return void 0 === i3 && E.set(t3.strings, i3 = new N(t3)), i3;
    }
    T(t3) {
      c2(this._$AH) || (this._$AH = [], this._$AR());
      const i3 = this._$AH;
      let s5, e4 = 0;
      for (const o5 of t3)
        e4 === i3.length ? i3.push(s5 = new _R(this.k(u2()), this.k(u2()), this, this.options)) : s5 = i3[e4], s5._$AI(o5), e4++;
      e4 < i3.length && (this._$AR(s5 && s5._$AB.nextSibling, e4), i3.length = e4);
    }
    _$AR(t3 = this._$AA.nextSibling, i3) {
      var s5;
      for (null === (s5 = this._$AP) || void 0 === s5 || s5.call(this, false, true, i3); t3 && t3 !== this._$AB; ) {
        const i4 = t3.nextSibling;
        t3.remove(), t3 = i4;
      }
    }
    setConnected(t3) {
      var i3;
      void 0 === this._$AM && (this._$Cp = t3, null === (i3 = this._$AP) || void 0 === i3 || i3.call(this, t3));
    }
  };
  var k = class {
    constructor(t3, i3, s5, e4, o5) {
      this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t3, this.name = i3, this._$AM = e4, this.options = o5, s5.length > 2 || "" !== s5[0] || "" !== s5[1] ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = A;
    }
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t3, i3 = this, s5, e4) {
      const o5 = this.strings;
      let n5 = false;
      if (void 0 === o5)
        t3 = S2(this, t3, i3, 0), n5 = !d2(t3) || t3 !== this._$AH && t3 !== T, n5 && (this._$AH = t3);
      else {
        const e5 = t3;
        let l4, h3;
        for (t3 = o5[0], l4 = 0; l4 < o5.length - 1; l4++)
          h3 = S2(this, e5[s5 + l4], i3, l4), h3 === T && (h3 = this._$AH[l4]), n5 || (n5 = !d2(h3) || h3 !== this._$AH[l4]), h3 === A ? t3 = A : t3 !== A && (t3 += (null != h3 ? h3 : "") + o5[l4 + 1]), this._$AH[l4] = h3;
      }
      n5 && !e4 && this.j(t3);
    }
    j(t3) {
      t3 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t3 ? t3 : "");
    }
  };
  var H = class extends k {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t3) {
      this.element[this.name] = t3 === A ? void 0 : t3;
    }
  };
  var I = s3 ? s3.emptyScript : "";
  var L = class extends k {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t3) {
      t3 && t3 !== A ? this.element.setAttribute(this.name, I) : this.element.removeAttribute(this.name);
    }
  };
  var z = class extends k {
    constructor(t3, i3, s5, e4, o5) {
      super(t3, i3, s5, e4, o5), this.type = 5;
    }
    _$AI(t3, i3 = this) {
      var s5;
      if ((t3 = null !== (s5 = S2(this, t3, i3, 0)) && void 0 !== s5 ? s5 : A) === T)
        return;
      const e4 = this._$AH, o5 = t3 === A && e4 !== A || t3.capture !== e4.capture || t3.once !== e4.once || t3.passive !== e4.passive, n5 = t3 !== A && (e4 === A || o5);
      o5 && this.element.removeEventListener(this.name, this, e4), n5 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
    }
    handleEvent(t3) {
      var i3, s5;
      "function" == typeof this._$AH ? this._$AH.call(null !== (s5 = null === (i3 = this.options) || void 0 === i3 ? void 0 : i3.host) && void 0 !== s5 ? s5 : this.element, t3) : this._$AH.handleEvent(t3);
    }
  };
  var Z = class {
    constructor(t3, i3, s5) {
      this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = i3, this.options = s5;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t3) {
      S2(this, t3);
    }
  };
  var B = i2.litHtmlPolyfillSupport;
  null == B || B(N, R), (null !== (t2 = i2.litHtmlVersions) && void 0 !== t2 ? t2 : i2.litHtmlVersions = []).push("2.8.0");
  var D = (t3, i3, s5) => {
    var e4, o5;
    const n5 = null !== (e4 = null == s5 ? void 0 : s5.renderBefore) && void 0 !== e4 ? e4 : i3;
    let l4 = n5._$litPart$;
    if (void 0 === l4) {
      const t4 = null !== (o5 = null == s5 ? void 0 : s5.renderBefore) && void 0 !== o5 ? o5 : null;
      n5._$litPart$ = l4 = new R(i3.insertBefore(u2(), t4), t4, void 0, null != s5 ? s5 : {});
    }
    return l4._$AI(t3), l4;
  };

  // ../../node_modules/lit-element/lit-element.js
  var l3;
  var o4;
  var s4 = class extends u {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      var t3, e4;
      const i3 = super.createRenderRoot();
      return null !== (t3 = (e4 = this.renderOptions).renderBefore) && void 0 !== t3 || (e4.renderBefore = i3.firstChild), i3;
    }
    update(t3) {
      const i3 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this._$Do = D(i3, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      var t3;
      super.connectedCallback(), null === (t3 = this._$Do) || void 0 === t3 || t3.setConnected(true);
    }
    disconnectedCallback() {
      var t3;
      super.disconnectedCallback(), null === (t3 = this._$Do) || void 0 === t3 || t3.setConnected(false);
    }
    render() {
      return T;
    }
  };
  s4.finalized = true, s4._$litElement$ = true, null === (l3 = globalThis.litElementHydrateSupport) || void 0 === l3 || l3.call(globalThis, { LitElement: s4 });
  var n4 = globalThis.litElementPolyfillSupport;
  null == n4 || n4({ LitElement: s4 });
  (null !== (o4 = globalThis.litElementVersions) && void 0 !== o4 ? o4 : globalThis.litElementVersions = []).push("3.3.3");

  // src/shared-styles.js
  var sharedStyles = i`
    :host {
        position: relative;
        display: flex;
        flex-direction: column;
        min-height: 222px;
        width: 100%;
        max-width: 100%;
        height: 100%;
        flex: 1 1 0;
        min-width: var(--consonant-merch-card-min-width);
        max-width: var(--consonant-merch-card-max-height);
        text-align: left;
        border-radius: var(--consonant-merch-card-spacing-xxxs);
        background-color: var(--consonant-merch-card-background-color);
        overflow: auto;
        grid-template-columns: repeat(auto-fit, minmax(300px, max-content));
        background-color: var(--consonant-merch-card-background-color);
        font-family: var(--body-font-family, 'Adobe Clean');
        border-radius: var(--consonant-merch-card-spacing-xs);
        border: 1px solid var(--consonant-merch-card-border-color);
    }

    .invisible {
        visibility: hidden;
    }

    :host(:hover) .invisible {
        visibility: visible;
    }

    slot {
        display: block;
    }

    .top-section {
        display: flex;
        justify-content: flex-start;
        height: 100%;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .image {
        height: var(--consonant-merch-card-image-height);
        background-position: 50% 50%;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .icons {
        display: flex;
        width: fit-content;
        fle-direction: row;
    }

    .icons img {
        width: var(--consonant-merch-card-plans-icon-size);
        height: var(--consonant-merch-card-plans-icon-size);
        margin-right: var(--consonant-merch-card-spacing-xxs);
    }

    .body {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        height: 100%;
        flex-direction: column;
        gap: var(--consonant-merch-card-spacing-xxs);
        padding: var(--consonant-merch-card-spacing-xs);
    }

    ::slotted([slot='footer']) {
        display: flex;
        justify-content: flex-end;
        margin-top: auto;
        box-sizing: border-box;
        align-self: flex-end;
        width: 100%;
        padding: var(--consonant-merch-card-spacing-xs);
    }

    hr {
        background-color: var(--color-gray-200);
        border: none;
        height: 1px;
        width: auto;
        margin-top: 0;
        margin-bottom: 0;
        margin-left: var(--consonant-merch-card-spacing-xs);
        margin-right: var(--consonant-merch-card-spacing-xs);
    }

    div[class$='-ribbon'] {
        position: absolute;
        top: 16px;
        right: 0;
        font-size: var(--type-heading-xxs-size);
        font-weight: 500;
        max-width: 150px;
        line-height: 16px;
        text-align: center;
        padding: 8px 11px;
        border-radius: 5px 0 0 5px;
    }

    .body .catalog-ribbon {
        display: flex;
        height: fit-content;
        flex-direction: column;
        width: fit-content;
        border-radius: 5px;
        position: relative;
        top: 0;
        margin-left: var(--consonant-merch-card-spacing-xxs);
    }

    .image {
        flex-grow: 1;
        position: relative;
        width: 100%;
        min-height: 213px;
        max-height: 213px;
        background-color: var(--background-color);
        background-position: 50% 50%;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .detail-bg-container {
        right: 0;
        padding: var(--consonant-merch-card-spacing-xs);
        border-radius: 5px;
        font-size: var(--consonant-merch-card-body-font-size);
        margin: var(--consonant-merch-card-spacing-xs);
    }

    .action-menu {
        display: flex;
        width: 32px;
        height: 32px;
        position: absolute;
        top: 16px;
        right: 16px;
        background: url('../src/img/ellipsis.svg') no-repeat center center,
            #f6f6f6;
        background-size: 16px 16px;
    }
    .hidden {
        visibility: hidden;
    }

    .standard-wrapper {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-xs);
        align-items: center;
        justify-content: space-between;
    }

    .checkbox-label,
    .secure-transaction-label {
        font-size: var(--consonant-merch-card-body-xxs-font-size);
        line-height: 1.3;
        color: var(--color-gray-600);
    }

    .secure-transaction-label {
        white-space: nowrap;
    }

    .secure-transaction-icon {
        height: 15px;
        width: 12px;
        right: 16px;
        background-image: url('../src/img/secure-transaction.svg');
        background-repeat: no-repeat;
    }

    .checkbox-container,
    .secure-transaction-wrapper {
        display: flex;
        align-items: center;
        gap: var(--consonant-merch-card-spacing-xxs);
    }

    .secure-transaction-wrapper {
        padding-left: var(--consonant-merch-card-spacing-xs);
    }

    .checkbox-container input[type='checkbox']:checked + .checkmark {
        background-color: var(--color-accent);
        background-image: url('../src/img/checkmark-white-small.svg');
        border-color: var(--color-accent);
    }

    .checkbox-container input[type='checkbox'] {
        display: none;
    }

    .checkbox-container .checkmark {
        position: relative;
        display: inline-block;
        width: 12px;
        height: 12px;
        border: 2px solid #757575;
        background: #fff;
        border-radius: 2px;
        cursor: pointer;
        margin-top: 2px;
    }
`;

  // src/merch-card.js
  var MerchCard = class extends s4 {
    static properties = {
      variant: { type: String },
      type: { type: String },
      badge: { type: Object },
      actionmenu: { type: Boolean, attribute: "action-menu" },
      actionMenuContent: { type: String, attribute: "action-menu-content" },
      title: { type: String },
      description: { type: String },
      image: { type: String, attribute: "image" },
      customHr: { type: String, attribute: "hr" },
      icons: { type: Array },
      detailBg: { type: String, attribute: "detail-bg" },
      secureLabel: { type: String, attribute: "secure-label" },
      checkboxLabel: { type: String, attribute: "checkbox-label" },
      evergreen: { type: Boolean },
      attrFilters: { type: String, attribute: "filters" },
      attrTypes: { type: String, attribute: "types" }
    };
    static styles = [sharedStyles];
    constructor() {
      super();
    }
    renderIcons() {
      return this.icons && this.icons.length > 0 ? x`
                  <div class="icons">
                      ${this.icons.map((icon) => x`<img src="${icon}" />`)}
                  </div>
              ` : "";
    }
    createCheckBox() {
      return this.checkboxLabel ? x`
                  <div class="checkbox-container">
                      <input id="alt-cta" type="checkbox" />
                      <span
                          class="checkmark"
                          @click="${this.toggleCheckBox}"
                      ></span>
                      <label class="checkbox-label"
                          >${this.checkboxLabel}</label
                      >
                  </div>
              ` : "";
    }
    createPlansFooter() {
      const footerSlot = x` <slot name="footer"></slot>`;
      const secureLabel = this["secureLabel"];
      return secureLabel ? x` <div class="standard-wrapper">
                  <div class="secure-transaction-wrapper">
                      <span class="secure-transaction-icon"></span>
                      <span class="secure-transaction-label"
                          >${secureLabel}</span
                      >
                  </div>
                  ${footerSlot}
              </div>` : footerSlot;
    }
    generateRibbonTemplate(additionalStyles) {
      const style = this.badge.style;
      const [ribbonBgColor, ribbonTextColor] = style.split(", ", 2);
      return x`
            <div
                class="${this.variant}-ribbon"
                style="background-color: ${ribbonBgColor}; color: ${ribbonTextColor}; ${additionalStyles ? ` ${additionalStyles}` : ""}"
            >
                ${this.badge.value}
            </div>
        `;
    }
    decorateRibbon() {
      return this.generateRibbonTemplate();
    }
    decorateEvergreenRibbon() {
      return this.generateRibbonTemplate(
        `border: 1px solid ${this.badge.style[0]}; border-right: none;`
      );
    }
    toggleCheckBox() {
      const checkbox = this.shadowRoot.querySelector("#alt-cta");
      checkbox.checked = !checkbox.checked;
      const footerSlot = this.shadowRoot.querySelector('slot[name="footer"]');
      if (footerSlot) {
        const nodes = footerSlot.assignedNodes({ flatten: true });
        let active, altCta;
        nodes.forEach((node) => {
          altCta = node.querySelector(".alt-cta");
          active = node.querySelector(".active");
        });
        if (active && altCta) {
          active.classList.toggle("button--inactive", checkbox.checked);
          altCta.classList.toggle("button--inactive", !checkbox.checked);
        }
      }
    }
    toggleActionMenu() {
      const actionMenuContentSlot = this.shadowRoot.querySelector(
        'slot[name="action-menu-content"]'
      );
      actionMenuContentSlot.classList.toggle("hidden");
    }
    connectedCallback() {
      super.connectedCallback();
      this.initFilters();
      this.initTypes();
    }
    get title() {
      const heading = this.shadowRoot.querySelector(
        'slot[name="heading-xs"]'
      );
      return heading.assignedNodes()[0]?.textContent;
    }
    initFilters() {
      if (this.attrFilters) {
        this.filters = Object.fromEntries(
          this.attrFilters.split(",").map((filter) => filter.split(":"))
        );
      }
      this.filter = {};
    }
    initTypes() {
      this.types = this.attrTypes ? this.attrTypes.split(",") : [];
    }
    includes(string) {
      const slots = [...this.shadowRoot.querySelectorAll("slot")];
      return slots.some(
        (slot) => slot.assignedNodes().some(
          (node) => node.textContent?.toLowerCase().includes(string)
        )
      );
    }
    render() {
      switch (this.variant) {
        case "special-offers":
          return this.renderSpecialOffer();
        case "segment":
          return this.renderSegment();
        case "plans":
          return this.renderPlans();
        case "catalog":
          return this.renderCatalog();
        case "evergreen":
          return this.renderEverGreen();
        default:
          return x`<div class="no-variant>No variant detected. Please check authoring document.</div> <div />`;
      }
    }
    renderSpecialOffer() {
      return x` <div
                class="image"
                style="${this.image ? `background-image: url(${this.image})` : ""}"
            >
                ${this.badge ? this.decorateRibbon() : ""}
            </div>
            <div class="body">
                <slot name="detail-m"></slot>
                <slot name="heading-xs"></slot>
                <slot name="body-xs"></slot>
            </div>
            ${this.evergreen ? x`
                      <div
                          class="detail-bg-container"
                          style="background: ${this["detailBg"]}"
                      >
                          <slot name="detail-bg"></slot>
                      </div>
                  ` : x`
                      <hr />
                      <slot name="footer"></slot>
                  `}`;
    }
    renderSegment() {
      return x` ${this.badge ? this.decorateRibbon() : ""}
            <div class="body">
                <slot name="heading-xs"></slot>
                <slot name="heading-xs"></slot>
                <slot name="body-xs"></slot>
            </div>
            <hr />
            <slot name="footer"></slot>`;
    }
    renderPlans() {
      return x` ${this.badge ? this.decorateRibbon() : ""}
            <div class="body">
                ${this.renderIcons()}
                <slot name="heading-xs"></slot>
                <slot name="heading-m"></slot>
                <slot name="body-xxs"></slot>
                <slot name="body-xs"></slot>
                ${this.createCheckBox()}
            </div>
            ${this.createPlansFooter()}`;
    }
    renderCatalog() {
      return x` <div class="body">
                <div class="top-section">
                    ${this.renderIcons()}
                    ${this.badge ? this.decorateRibbon() : ""}
                    <div
                        class="action-menu ${!this.actionmenu ? "hidden" : "invisible"}"
                        @click="${this.toggleActionMenu}"
                    ></div>
                </div>
                <slot
                    name="action-menu-content"
                    class="action-menu-content ${!this.actionMenuContent ? "hidden" : ""}"
                    >${this.actionMenuContent}</slot
                >
                <slot name="heading-xs"></slot>
                <slot name="heading-m"></slot>
                <slot name="body-xxs"></slot>
                <slot name="body-xs"></slot>
            </div>
            <slot name="footer"></slot>`;
    }
    renderEverGreen() {
      const [ribbonBgColor, ribbonTextColor] = this.badge?.style?.split(
        ", ",
        2
      );
      return x`
            <div
                class="image"
                style="${this.image ? `background-image: url(${this.image})` : ""}"
            >
                ${this.badge ? this.decorateEvergreenRibbon() : ""}
            </div>
            <div class="body">
                <slot name="detail-m"></slot>
                <slot name="heading-xs"></slot>
                <slot name="body-xs"></slot>
            </div>
            <div
                class="detail-bg-container"
                style="${ribbonBgColor ? `background: ${ribbonBgColor}` : ""}"
            >
                <slot name="body-xxs"></slot>
            </div>
        `;
    }
  };
  customElements.define("merch-card", MerchCard);

  // src/focus.js
  var FOCUSABLE_SELECTORS = [
    "a[href]:not([disabled])",
    "button:not([disabled])",
    "textarea:not([disabled])",
    'input[type="text"]:not([disabled])',
    'input[type="radio"]:not([disabled])',
    'input[type="checkbox"]:not([disabled])',
    "select:not([disabled])",
    '[tabindex]:not([tabindex="-1"]):not([disabled])'
  ].join(", ");
  var [ARROW_LEFT, ARROW_RIGHT, ARROW_UP, ARROW_DOWN] = [
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown"
  ];
  var FOCUS_KEYS = [
    "Tab",
    ARROW_LEFT,
    ARROW_RIGHT,
    ARROW_UP,
    ARROW_DOWN
  ];
  function getFirstLastFocusableElement(container) {
    const focusableElements = container.querySelectorAll(FOCUSABLE_SELECTORS);
    return focusableElements.length > 0 ? [
      focusableElements[0],
      focusableElements[focusableElements.length - 1]
    ] : [];
  }

  // src/deeplink.js
  var EVENT_HASHCHANGE = "hashchange";
  function parseState(hash = window.location.hash) {
    const result = [];
    const keyValuePairs = hash.replace(/^#/, "").split("&");
    for (const pair of keyValuePairs) {
      const [key, value] = pair.split("=");
      if (key) {
        result.push([key, decodeURIComponent(value || "")]);
      }
    }
    return Object.fromEntries(result);
  }
  function deeplink(callback) {
    const handler = (e4) => {
      const state = parseState(window.location.hash);
      callback(state);
    };
    handler();
    window.addEventListener(EVENT_HASHCHANGE, handler);
    return () => {
      window.removeEventListener(EVENT_HASHCHANGE, handler);
    };
  }

  // src/merch-cards.js
  var SortOrder = {
    alphabetical: "alphabetical",
    authored: 0
  };
  var makeCategoryFilter = ({ filter }) => (elements) => elements.filter((element) => element.filters.hasOwnProperty(filter));
  var makeTypeFilter = ({ types }) => {
    if (!types) {
      return (elements) => elements;
    }
    types = types.split(",");
    return (elements) => elements.filter(
      (element) => types.some((type) => element.types.includes(type))
    );
  };
  var makeAlphabeticalSorter = () => (elements) => elements.sort(
    (a3, b2) => (a3.title ?? "").localeCompare(b2.title ?? "", "en", {
      sensitivity: "base"
    })
  );
  var makeAuthoredSorter = ({ filter }) => (elements) => elements.sort(
    (a3, b2) => (a3.filters[filter] ?? elements.length) - (b2.filters[filter] ?? elements.length)
  );
  var makeSearcher = ({ search }) => {
    if (search?.length) {
      search = search.toLowerCase();
      return (elements) => elements.filter((element) => element.includes(search));
    }
    return (elements) => elements;
  };
  var MerchCards = class extends s4 {
    static properties = {
      filter: { type: String, attribute: "filter", reflect: true },
      search: { type: String, attribute: "search", reflect: true },
      sort: {
        type: Number,
        attribute: "sort",
        default: SortOrder.authored,
        reflect: true
      },
      types: { type: String, attribute: "types", reflect: true },
      limit: { type: Number, attribute: "limit", reflect: true }
    };
    static styles = i`
        ul,
        ::slotted(li) {
            display: contents;
        }
    `;
    render() {
      return x`<ul role="list">
            <slot></slot>
        </ul>`;
    }
    updated(changedProperties) {
      let updateChildren = false;
      if (!this._filters || changedProperties.has("filter") || changedProperties.has("types")) {
        this._filters = [makeCategoryFilter(this), makeTypeFilter(this)];
        updateChildren = true;
      }
      if (!this._searcher || changedProperties.has("search")) {
        this._searcher = makeSearcher(this);
        updateChildren = true;
      }
      if (!this._sorter || changedProperties.has("sort")) {
        this._sorter = this.sort === SortOrder.alphabetical ? makeAlphabeticalSorter(this) : makeAuthoredSorter(this);
        updateChildren = true;
      }
      const children = [...this.querySelectorAll("merch-card")];
      const reducers = [...this._filters, this._searcher, this._sorter];
      const reduced = new Map(
        reducers.reduce((elements, reducer) => reducer(elements), children).map((element, index) => [element, index])
      );
      children.forEach((child) => {
        if (reduced.has(child)) {
          child.style.order = reduced.get(child);
          child.style.removeProperty("display");
        } else {
          child.style.display = "none";
          child.style.removeProperty("order");
        }
      });
    }
    firstUpdated() {
      const slot = this.shadowRoot.querySelector("slot");
      const nodes = slot.assignedNodes({ flatten: true });
      nodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "MERCH-CARD") {
          const li = document.createElement("li");
          li.setAttribute("role", "listitem");
          node.setAttribute("tabindex", "0");
          node.replaceWith(li);
          li.appendChild(node);
          node.addEventListener(
            "keydown",
            this.handleCardKeydown.bind(this)
          );
        }
      });
    }
    connectedCallback() {
      super.connectedCallback();
      this.startDeeplink();
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this.stopDeeplink();
    }
    startDeeplink() {
      this.stopDeeplink = deeplink(
        ({ filter = "all", types, sort, search, single_app }) => {
          this.filter = filter;
          this.types = types ?? "";
          this.search = search ?? "";
          this.single_app = single_app;
          this.sort = sort;
        }
      );
    }
    // custom methods
    handleCardKeydown(event) {
      if (!FOCUS_KEYS.includes(event.key))
        return;
      const currentFocusedCard = event.currentTarget;
      const [firstFocusable, lastFocusable] = getFirstLastFocusableElement(currentFocusedCard);
      let arrowKey;
      switch (event.key) {
        case ARROW_LEFT:
        case ARROW_UP:
        case ARROW_RIGHT:
        case ARROW_DOWN:
          arrowKey = event.key;
          break;
        case "Tab":
          if (document.activeElement.tagName === "MERCH-CARD" && event.shiftKey) {
            arrowKey = ARROW_LEFT;
          } else if (document.activeElement === lastFocusable && !event.shiftKey) {
            arrowKey = ARROW_RIGHT;
          }
          if (!arrowKey)
            return;
          break;
        default:
          return;
      }
      const nextCard = this.getNextCard(currentFocusedCard, arrowKey);
      if (nextCard) {
        currentFocusedCard.setAttribute("tabindex", "-1");
        nextCard.setAttribute("tabindex", "0");
        nextCard.focus();
        event.preventDefault();
      }
    }
    getCardsPerRow() {
      if (window.matchMedia("screen and (min-width: 1440px)").matches) {
        return 4;
      }
      if (window.matchMedia("screen and (min-width: 1280px)").matches) {
        return 3;
      }
      if (window.matchMedia("screen and (min-width: 600px)").matches) {
        return 2;
      }
      return 1;
    }
    getNextCard(currentCard, arrowKey) {
      const allCards = Array.from(this.querySelectorAll("merch-card")).filter(
        (card) => window.getComputedStyle(card).display !== "none"
      );
      const orderedCards = allCards.sort((a3, b2) => {
        const orderA = parseInt(window.getComputedStyle(a3).order) || allCards.indexOf(a3);
        const orderB = parseInt(window.getComputedStyle(b2).order) || allCards.indexOf(b2);
        return orderA - orderB;
      });
      const currentIndex = orderedCards.indexOf(currentCard);
      const cardsPerRow = this.getCardsPerRow();
      switch (arrowKey) {
        case ARROW_LEFT:
          if (currentIndex > 0) {
            return orderedCards[currentIndex - 1];
          }
          break;
        case ARROW_RIGHT:
          if (currentIndex < orderedCards.length - 1) {
            return orderedCards[currentIndex + 1];
          }
          break;
        case ARROW_UP:
          const upIndex = currentIndex - cardsPerRow;
          if (upIndex >= 0) {
            return orderedCards[upIndex];
          }
          break;
        case ARROW_DOWN:
          const downIndex = currentIndex + cardsPerRow;
          if (downIndex < orderedCards.length) {
            return orderedCards[downIndex];
          }
          break;
        default:
          return null;
      }
      return null;
    }
  };
  MerchCards.SortOrder = SortOrder;
  customElements.define("merch-cards", MerchCards);
})();
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/