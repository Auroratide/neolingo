function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["../nodes/0.CIpYrEFu.js","../chunks/disclose-version.D9v2Ydgv.js","../chunks/runtime.B_8_eGvV.js","../chunks/if.BaErL63Y.js","../chunks/props.BQFMp1Pu.js","../chunks/Stack.C7t4MNRx.js","../chunks/style.BVG1WV6Y.js","../assets/Stack.Wqa_BC9K.css","../chunks/render.D-RA-wSd.js","../chunks/stores.B32Nh5pe.js","../chunks/entry.CaQ23yIP.js","../chunks/each.CxpW7_V1.js","../chunks/lifecycle.Cdf6Q8Nc.js","../chunks/notifications.svelte.BkWYQLjb.js","../chunks/proxy.DDw0DULJ.js","../chunks/FocusCard.D83yFeUl.js","../chunks/class.BmyGkIfI.js","../assets/FocusCard.DUcB78cn.css","../chunks/stored-state.svelte.BANnV-UH.js","../assets/stored-state.CH6i6M1S.css","../chunks/feature-flags.svelte.5Ro5zW_Z.js","../assets/0.DjABciRZ.css","../nodes/1.CP4TffY5.js","../nodes/2.CyCG4iho.js","../chunks/index.P6fyNVvR.js","../chunks/preload-helper.D6kgxu3v.js","../assets/index.lEYq0NYN.css","../chunks/this.Dll9HT1d.js","../chunks/Spinner.h80VcgwH.js","../assets/Spinner.BheMbQ5b.css","../assets/2.BqE5VVyi.css","../nodes/3.DI_A5AVO.js","../assets/3.3vye6N1f.css","../nodes/4.BZfVRa8N.js","../nodes/5.CFk3t4Ai.js","../assets/5.DiRzxdFz.css","../nodes/6.TCx7Mbgy.js","../assets/6.dxENRWw8.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
var C=(e,t,r)=>{if(!t.has(e))throw TypeError("Cannot "+r)};var s=(e,t,r)=>(C(e,t,"read from private field"),r?r.call(e):t.get(e)),k=(e,t,r)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,r)},j=(e,t,r,o)=>(C(e,t,"write to private field"),o?o.call(e,r):t.set(e,r),r);import{_ as d}from"../chunks/preload-helper.D6kgxu3v.js";import{r as M,t as N,f as Q,A as O,y as q,u as U,z as W,g as b,p as X,a as Y,s as P,b as w,K as Z}from"../chunks/runtime.B_8_eGvV.js";import{p as B}from"../chunks/proxy.DDw0DULJ.js";import{h as $,m as tt,u as et,t as rt}from"../chunks/render.D-RA-wSd.js";import{r as S,h as ot,c as y,a as z,b as E,s as K,w as st,o as at,d as x,e as nt,D as it,x as ut,t as F}from"../chunks/disclose-version.D9v2Ydgv.js";import{i as A}from"../chunks/if.BaErL63Y.js";import{c as ct,p as D}from"../chunks/props.BQFMp1Pu.js";import{b as R}from"../chunks/this.Dll9HT1d.js";function I(e,t,r){const o=ct();ot(e);let a,u,p=new Set;const g=M(()=>{if(a!==(a=t())){if(u){var _=u;N(_,()=>{p.delete(_)})}a&&(u=M(()=>{r(a);const v=o.d;return()=>{v!==null&&S(v)}},o,!0,!0),u.d=o.d,p.add(u))}},o,!1);g.ondestroy=()=>{for(const _ of p)_.d&&S(_.d)}}function lt(e){return class extends _t{constructor(t){super({component:e,...t})}}}var l,n;class _t{constructor(t){k(this,l,{});k(this,n,void 0);const r=B({...t.props||{},$$events:s(this,l)},!1);j(this,n,(t.hydrate?$:tt)(t.component,{target:t.target,props:r,context:t.context,intro:t.intro,recover:t.recover}));for(const o of Object.keys(s(this,n)))o==="$set"||o==="$destroy"||o==="$on"||Q(this,o,{get(){return s(this,n)[o]},set(a){s(this,n)[o]=a},enumerable:!0});s(this,n).$set=o=>{Object.assign(r,o)},s(this,n).$destroy=()=>{et(s(this,n))}}$set(t){s(this,n).$set(t)}$on(t,r){s(this,l)[t]=s(this,l)[t]||[];const o=(...a)=>r.call(this,...a);return s(this,l)[t].push(o),()=>{s(this,l)[t]=s(this,l)[t].filter(a=>a!==o)}}$destroy(){s(this,n).$destroy()}}l=new WeakMap,n=new WeakMap;function mt(e){if(O===null)throw new Error("onMount can only be used during component initialisation.");O.r?q(()=>{const t=U(e);if(typeof t=="function")return t}):ft(O).m.push(e)}function ft(e){return e.u??(e.u={a:[],b:[],m:[]})}const xt={};var dt=F('<div id="svelte-announcer" aria-live="assertive" aria-atomic="true" style="position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"><!></div>'),pt=F("<!> <!>",!0);function ht(e,t){Y(t,!0);let r=D(t,"components",11,()=>[]),o=D(t,"data_0",3,null),a=D(t,"data_1",3,null);W(()=>t.stores.page.set(t.page)),q(()=>{t.stores,t.page,t.constructors,r(),t.form,o(),a(),t.stores.page.notify()});let u=P(!1),p=P(!1),g=P(null);mt(()=>{const i=t.stores.page.subscribe(()=>{b(u)&&(w(p,!0),Z().then(()=>{w(g,B(document.title||"untitled page"))}))});return w(u,!0),i});var _=at(e,!0,pt),v=E(_),G=K(K(v,!0));A(v,()=>t.constructors[1],i=>{var m=x(i),f=E(m);return I(f,()=>t.constructors[0],h=>{R(h(f,{get data(){return o()},children:(c,L)=>{var T=x(c),V=E(T);return I(V,()=>t.constructors[1],H=>{R(H(V,{get data(){return a()},get form(){return t.form}}),J=>r()[1]=J,()=>r()[1])}),y(c,T)}}),c=>r()[0]=c,()=>r()[0])}),y(i,m)},i=>{var m=x(i),f=E(m);return I(f,()=>t.constructors[0],h=>{R(h(f,{get data(){return o()},get form(){return t.form}}),c=>r()[0]=c,()=>r()[0])}),y(i,m)}),A(G,()=>b(u),i=>{var m=nt(i,!0,dt),f=st(m);return A(f,()=>b(p),h=>{var c=it(h),L=ut(c);return rt(L,()=>b(g)),z(h,c)},null),z(i,m)},null),y(e,_),X()}const At=lt(ht),Dt=[()=>d(()=>import("../nodes/0.CIpYrEFu.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]),import.meta.url),()=>d(()=>import("../nodes/1.CP4TffY5.js"),__vite__mapDeps([22,1,2,3,4,9,10,15,5,6,7,8,16,17]),import.meta.url),()=>d(()=>import("../nodes/2.CyCG4iho.js"),__vite__mapDeps([23,1,2,3,4,5,6,7,24,8,15,16,17,12,25,26,27,14,18,19,28,29,13,11,30]),import.meta.url),()=>d(()=>import("../nodes/3.DI_A5AVO.js"),__vite__mapDeps([31,1,2,12,5,4,6,7,32]),import.meta.url),()=>d(()=>import("../nodes/4.BZfVRa8N.js"),__vite__mapDeps([33,1,2,10,20,18,14,19,28,8,16,6,29]),import.meta.url),()=>d(()=>import("../nodes/5.CFk3t4Ai.js"),__vite__mapDeps([34,1,2,24,4,8,15,3,5,6,7,16,17,12,25,26,11,35]),import.meta.url),()=>d(()=>import("../nodes/6.TCx7Mbgy.js"),__vite__mapDeps([36,1,2,12,5,4,6,7,37]),import.meta.url)],Rt=[],It={"/":[2],"/accessibility":[3],"/beta":[4],"/dictionary":[5],"/legal":[6]},Lt={handleError:({error:e})=>{console.error(e)},reroute:()=>{}};export{It as dictionary,Lt as hooks,xt as matchers,Dt as nodes,At as root,Rt as server_loads};