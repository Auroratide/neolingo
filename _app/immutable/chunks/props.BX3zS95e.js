import{P,g as S,i as l,j as E}from"./disclose-version.jtkXa8v4.js";import{k as R,y as g,g as o,b as p,d as A,m as L}from"./runtime.ChrPWTZd.js";function O(f,_,n,e){var m;var c=(n&l)!==0,I=(n&E)!==0,t=f[_],u=(m=R(f,_))==null?void 0:m.set;if(t===void 0&&e!==void 0){if(u&&I)throw new Error("ERR_SVELTE_BINDING_FALLBACK");n&P&&(e=e()),t=e,u&&u(t)}var s=()=>{var r=f[_];return r!==void 0&&(e=void 0),r===void 0?e:r};if(!(n&S))return s;if(u)return function(r){return arguments.length===1?(u(r),r):s()};var v=!1,d=L(t),a=A(()=>{var r=s(),i=o(d);return v?(v=!1,i):d.v=r});return c||(a.equals=g),function(r){var i=o(a);return arguments.length>0?(a.equals(r)||(v=!0,p(d,r),o(a)),r):i}}export{O as p};