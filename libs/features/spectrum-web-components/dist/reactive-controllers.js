/* eslint-disable */
/* Generated by Milo */

var E="(prefers-color-scheme: dark)",v="(max-width: 700px) and (hover: none) and (pointer: coarse), (max-height: 700px) and (hover: none) and (pointer: coarse)",m=class{constructor(e,t){this.key=Symbol("match-media-key"),this.matches=!1,this.host=e,this.host.addController(this),this.media=window.matchMedia(t),this.matches=this.media.matches,this.onChange=this.onChange.bind(this),e.addController(this)}hostConnected(){var e;(e=this.media)==null||e.addEventListener("change",this.onChange)}hostDisconnected(){var e;(e=this.media)==null||e.removeEventListener("change",this.onChange)}onChange(e){this.matches!==e.matches&&(this.matches=e.matches,this.host.requestUpdate(this.key,!this.matches))}};function u(o,e,t){return typeof o===e?()=>o:typeof o=="function"?o:t}var l=class{constructor(e,{direction:t,elementEnterAction:s,elements:n,focusInIndex:r,isFocusableElement:c,listenerScope:a}={elements:()=>[]}){this._currentIndex=-1,this._direction=()=>"both",this.directionLength=5,this.elementEnterAction=i=>{},this._focused=!1,this._focusInIndex=i=>0,this.isFocusableElement=i=>!0,this._listenerScope=()=>this.host,this.offset=0,this.recentlyConnected=!1,this.handleFocusin=i=>{if(!this.isEventWithinListenerScope(i))return;this.isRelatedTargetAnElement(i)&&this.hostContainsFocus();let h=i.composedPath(),d=-1;h.find(g=>(d=this.elements.indexOf(g),d!==-1)),this.currentIndex=d>-1?d:this.currentIndex},this.handleFocusout=i=>{this.isRelatedTargetAnElement(i)&&this.hostNoLongerContainsFocus()},this.handleKeydown=i=>{if(!this.acceptsEventCode(i.code)||i.defaultPrevented)return;let h=0;switch(i.code){case"ArrowRight":h+=1;break;case"ArrowDown":h+=this.direction==="grid"?this.directionLength:1;break;case"ArrowLeft":h-=1;break;case"ArrowUp":h-=this.direction==="grid"?this.directionLength:1;break;case"End":this.currentIndex=0,h-=1;break;case"Home":this.currentIndex=this.elements.length-1,h+=1;break}i.preventDefault(),this.direction==="grid"&&this.currentIndex+h<0?this.currentIndex=0:this.direction==="grid"&&this.currentIndex+h>this.elements.length-1?this.currentIndex=this.elements.length-1:this.setCurrentIndexCircularly(h),this.elementEnterAction(this.elements[this.currentIndex]),this.focus()},this.mutationObserver=new MutationObserver(()=>{this.handleItemMutation()}),this.host=e,this.host.addController(this),this._elements=n,this.isFocusableElement=c||this.isFocusableElement,this._direction=u(t,"string",this._direction),this.elementEnterAction=s||this.elementEnterAction,this._focusInIndex=u(r,"number",this._focusInIndex),this._listenerScope=u(a,"object",this._listenerScope)}get currentIndex(){return this._currentIndex===-1&&(this._currentIndex=this.focusInIndex),this._currentIndex-this.offset}set currentIndex(e){this._currentIndex=e+this.offset}get direction(){return this._direction()}get elements(){return this.cachedElements||(this.cachedElements=this._elements()),this.cachedElements}set focused(e){e!==this.focused&&(this._focused=e)}get focused(){return this._focused}get focusInElement(){return this.elements[this.focusInIndex]}get focusInIndex(){return this._focusInIndex(this.elements)}isEventWithinListenerScope(e){return this._listenerScope()===this.host?!0:e.composedPath().includes(this._listenerScope())}handleItemMutation(){if(this._currentIndex==-1||this.elements.length<=this._elements().length)return;let e=this.elements[this.currentIndex];if(this.clearElementCache(),this.elements.includes(e))return;let t=this.currentIndex!==this.elements.length,s=t?1:-1;t&&this.setCurrentIndexCircularly(-1),this.setCurrentIndexCircularly(s),this.focus()}update({elements:e}={elements:()=>[]}){this.unmanage(),this._elements=e,this.clearElementCache(),this.manage()}focus(e){let t=this.elements;if(!t.length)return;let s=t[this.currentIndex];(!s||!this.isFocusableElement(s))&&(this.setCurrentIndexCircularly(1),s=t[this.currentIndex]),s&&this.isFocusableElement(s)&&s.focus(e)}clearElementCache(e=0){this.mutationObserver.disconnect(),delete this.cachedElements,this.offset=e,requestAnimationFrame(()=>{this.elements.forEach(t=>{this.mutationObserver.observe(t,{attributes:!0})})})}setCurrentIndexCircularly(e){let{length:t}=this.elements,s=t,n=(t+this.currentIndex+e)%t;for(;s&&this.elements[n]&&!this.isFocusableElement(this.elements[n]);)n=(t+n+e)%t,s-=1;this.currentIndex=n}hostContainsFocus(){this.host.addEventListener("focusout",this.handleFocusout),this.host.addEventListener("keydown",this.handleKeydown),this.focused=!0}hostNoLongerContainsFocus(){this.host.addEventListener("focusin",this.handleFocusin),this.host.removeEventListener("focusout",this.handleFocusout),this.host.removeEventListener("keydown",this.handleKeydown),this.focused=!1}isRelatedTargetAnElement(e){let t=e.relatedTarget;return!this.elements.includes(t)}acceptsEventCode(e){if(e==="End"||e==="Home")return!0;switch(this.direction){case"horizontal":return e==="ArrowLeft"||e==="ArrowRight";case"vertical":return e==="ArrowUp"||e==="ArrowDown";case"both":case"grid":return e.startsWith("Arrow")}}manage(){this.addEventListeners()}unmanage(){this.removeEventListeners()}addEventListeners(){this.host.addEventListener("focusin",this.handleFocusin)}removeEventListeners(){this.host.removeEventListener("focusin",this.handleFocusin),this.host.removeEventListener("focusout",this.handleFocusout),this.host.removeEventListener("keydown",this.handleKeydown)}hostConnected(){this.recentlyConnected=!0,this.addEventListeners()}hostDisconnected(){this.mutationObserver.disconnect(),this.removeEventListeners()}hostUpdated(){this.recentlyConnected&&(this.recentlyConnected=!1,this.elements.forEach(e=>{this.mutationObserver.observe(e,{attributes:!0})}))}};var f=class extends l{constructor(){super(...arguments),this.managed=!0,this.manageIndexesAnimationFrame=0}set focused(e){e!==this.focused&&(super.focused=e,this.manageTabindexes())}get focused(){return super.focused}clearElementCache(e=0){cancelAnimationFrame(this.manageIndexesAnimationFrame),super.clearElementCache(e),this.managed&&(this.manageIndexesAnimationFrame=requestAnimationFrame(()=>this.manageTabindexes()))}manageTabindexes(){this.focused?this.updateTabindexes(()=>({tabIndex:-1})):this.updateTabindexes(e=>({removeTabIndex:e.contains(this.focusInElement)&&e!==this.focusInElement,tabIndex:e===this.focusInElement?0:-1}))}updateTabindexes(e){this.elements.forEach(t=>{let{tabIndex:s,removeTabIndex:n}=e(t);if(!n){t.tabIndex=s;return}t.removeAttribute("tabindex");let r=t;r.requestUpdate&&r.requestUpdate()})}manage(){this.managed=!0,this.manageTabindexes(),super.manage()}unmanage(){this.managed=!1,this.updateTabindexes(()=>({tabIndex:0})),super.unmanage()}hostUpdated(){super.hostUpdated(),this.host.hasUpdated||this.manageTabindexes()}};var x=Symbol("element resolver updated"),I=class{constructor(e,{selector:t}={selector:""}){this._element=null,this._selector="",this.mutationCallback=s=>{let n=!1;s.forEach(r=>{if(!n){if(r.type==="childList"){let c=this.element&&[...r.removedNodes].includes(this.element),a=!!this.selector&&[...r.addedNodes].some(this.elementIsSelected);n=n||c||a}if(r.type==="attributes"){let c=r.target===this.element,a=!!this.selector&&this.elementIsSelected(r.target);n=n||c||a}}}),n&&this.resolveElement()},this.elementIsSelected=s=>{var n;return this.selectorIsId?s?.id===this.selectorAsId:(n=s?.matches)==null?void 0:n.call(s,this.selector)},this.host=e,this.selector=t,this.observer=new MutationObserver(this.mutationCallback),this.host.addController(this)}get element(){return this._element}set element(e){if(e===this.element)return;let t=this.element;this._element=e,this.host.requestUpdate(x,t)}get selector(){return this._selector}set selector(e){e!==this.selector&&(this.releaseElement(),this._selector=e,this.resolveElement())}get selectorAsId(){return this.selector.slice(1)}get selectorIsId(){return!!this.selector&&this.selector.startsWith("#")}hostConnected(){this.resolveElement(),this.observer.observe(this.host.getRootNode(),{subtree:!0,childList:!0,attributes:!0})}hostDisconnected(){this.releaseElement(),this.observer.disconnect()}resolveElement(){if(!this.selector){this.releaseElement();return}let e=this.host.getRootNode();this.element=this.selectorIsId?e.getElementById(this.selectorAsId):e.querySelector(this.selector)}releaseElement(){this.element=null}};export{E as DARK_MODE,I as ElementResolutionController,v as IS_MOBILE,m as MatchMediaController,f as RovingTabindexController,x as elementResolverUpdatedSymbol};
