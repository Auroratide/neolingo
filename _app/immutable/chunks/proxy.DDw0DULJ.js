import{i as P,S as o,o as R,c as x,f as v,s as m,h as I,b as r,j,k as g,m as w,g as y,U as u,l as h,u as D,n as O}from"./runtime.B_8_eGvV.js";function _(e,t=!0,s){if(typeof e=="object"&&e!=null&&!P(e)){if(o in e){const n=e[o];if(n.t===e||n.p===e)return n.p}const i=O(e);if(i===R||i===x){const n=new Proxy(e,S);return v(e,o,{value:{s:new Map,v:m(0),a:I(e),i:t,p:n,t:e},writable:!0,enumerable:!1}),n}}return e}function b(e,t=1){r(e,e.v+t)}const S={defineProperty(e,t,s){if(s.value){const i=e[o],n=i.s.get(t);n!==void 0&&r(n,_(s.value,i.i,i.o))}return Reflect.defineProperty(e,t,s)},deleteProperty(e,t){const s=e[o],i=s.s.get(t),n=s.a,f=delete e[t];if(n&&f){const a=s.s.get("length"),l=e.length-1;a!==void 0&&a.v!==l&&r(a,l)}return i!==void 0&&r(i,u),f&&b(s.v),f},get(e,t,s){var f;if(t===o)return Reflect.get(e,o);const i=e[o];let n=i.s.get(t);if(n===void 0&&(h()||j)&&(!(t in e)||(f=g(e,t))!=null&&f.writable)&&(n=(i.i?m:w)(_(e[t],i.i,i.o)),i.s.set(t,n)),n!==void 0){const a=y(n);return a===u?void 0:a}return Reflect.get(e,t,s)},getOwnPropertyDescriptor(e,t){const s=Reflect.getOwnPropertyDescriptor(e,t);if(s&&"value"in s){const n=e[o].s.get(t);n&&(s.value=y(n))}return s},has(e,t){var f;if(t===o)return!0;const s=e[o],i=Reflect.has(e,t);let n=s.s.get(t);return(n!==void 0||h()&&(!i||(f=g(e,t))!=null&&f.writable))&&(n===void 0&&(n=(s.i?m:w)(i?_(e[t],s.i,s.o):u),s.s.set(t,n)),y(n)===u)?!1:i},set(e,t,s,i){const n=e[o];let f=n.s.get(t);f===void 0&&h()&&(D(()=>i[t]),f=n.s.get(t)),f!==void 0&&r(f,_(s,n.i,n.o));const a=n.a,l=!(t in e);if(a&&t==="length")for(let c=s;c<e.length;c+=1){const d=n.s.get(c+"");d!==void 0&&r(d,u)}if(e[t]=s,l){if(a){const c=n.s.get("length"),d=e.length;c!==void 0&&c.v!==d&&r(c,d)}b(n.v)}return!0},ownKeys(e){const t=e[o];return y(t.v),Reflect.ownKeys(e)}};export{_ as p};