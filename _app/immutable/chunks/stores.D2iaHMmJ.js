import{D as r,r as c,u as a,g as f,U as b,b as o,m as l}from"./runtime.ChrPWTZd.js";import{s as _}from"./entry.DkzXUri0.js";function g(s,n,u){if(s==null)return n(void 0),u&&u(void 0),r;const e=s.subscribe(n,u);return e.unsubscribe?()=>e.unsubscribe():e}function y(s,n,u){let e=u[n];const t=e===void 0;t&&(e={store:null,last_value:null,value:l(b),unsubscribe:r},u[n]=e),(t||e.store!==s)&&(e.unsubscribe(),e.store=s??null,e.unsubscribe=d(s,e.value));const i=f(e.value);return i===b?e.last_value:i}function d(s,n){return s==null?(o(n,void 0),r):g(s,u=>o(n,u))}function D(s){p(()=>{let n;for(n in s)s[n].unsubscribe()})}function p(s){c(()=>()=>a(s))}const m=()=>{const s=_;return{page:{subscribe:s.page.subscribe},navigating:{subscribe:s.navigating.subscribe},updated:s.updated}},N={subscribe(s){return m().page.subscribe(s)}};export{N as p,y as s,D as u};