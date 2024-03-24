import{D as ae,a as w,z as i,f as S,t as v,R as ne,G as se,r as te,I as K,v as ie,y as Y,S as oe,c as n,d as G,x as M,A as C,s as e,e as j,b as o,o as T,E as ve,F as me,T as de,U as ue,$ as ce}from"../chunks/disclose-version.BoY5VHGC.js";import{p as U,a as W,g as h,n as $,q as Q}from"../chunks/runtime.CD0C5v4P.js";import{i as z}from"../chunks/if.C0ROYQ2R.js";import{u as fe,s as _e,p as ge}from"../chunks/stores.jWS9t34R.js";import{S as V}from"../chunks/Stack.AmobMLUV.js";import{n as ee}from"../chunks/notifications.svelte.DgM7M_s_.js";import{E as pe}from"../chunks/stored-state.svelte.CfIwJZ5u.js";import{f as ye,F as be}from"../chunks/FocusCard.BBIicV6I.js";import{f as X}from"../chunks/feature-flags.svelte.CLgO82ag.js";const he=!0,Qe=Object.freeze(Object.defineProperty({__proto__:null,prerender:he},Symbol.toStringTag,{value:"Module"}));var je=v('<div class="container svelte-122eki2"><!></div>');function ke(m,a){W(a,!0);var d=S(m,!0,je),l=i(d);ae(()=>a.children,l),w(m,d),U()}const xe=(m,a)=>{a.value.dismiss()};var we=v("<p> </p>"),Se=v("<p> </p>"),Ne=v("<p> </p> <!>",!0),Pe=v('<dialog><section class="svelte-1bus0eq"><p><strong> </strong></p> <!></section> <button class="close svelte-1bus0eq" aria-label="close" title="close">&times;</button></dialog>');function Fe(m,a){W(a,!0);const d=G(()=>`${a.value.id}-title`);var l=S(m,!0,Pe);function _(t,r=$){var s=S(t,!0,we),f=C(i(s));M(f,()=>r().message),w(t,s)}function g(t,r=$){var s=T(t,!0,Ne),f=o(s),q=C(i(f)),E=e(e(f,!0));M(q,()=>r().message),z(E,()=>r().solution,R=>{var B=S(R,!0,Se),H=C(i(B));M(H,()=>r().solution),w(R,B)},null),n(t,s)}se(l,()=>ye,()=>({duration:350,x:"3em"}),!1);var N=i(l),c=i(N),P=i(c),A=C(i(P)),k=e(e(c,!0)),D=e(e(N,!0)),p,x,y,F;te(()=>{p!==(p=a.value.id)&&K(l,"id",p),x!==(x=a.open)&&(l.open=x),ie(l,`${Y(a.value.type)} ${Y(pe)} svelte-1bus0eq`),y!==(y=h(d))&&K(l,"aria-labelledby",y),F!==(F=h(d))&&K(c,"id",F),oe(A,a.value.title)}),z(k,()=>a.value.type==="normie",t=>{var r=j(t),s=o(r);_(s,()=>a.value.content),n(t,r)},t=>{var r=j(t),s=o(r);z(s,()=>a.value.type==="error",f=>{var q=j(f),E=o(q);g(E,()=>a.value.content),n(f,q)},null),n(t,r)}),D.__click=[xe,a],w(m,l),U()}ne(["click"]);function qe(m,a){W(a,!1),ve();var d=j(m),l=o(d);me(l,()=>ee.list,7,(_,g)=>Q(_).id,(_,g,N)=>{var c=j(_);const P=de(()=>Q(N)===ee.list.length-1);var A=o(c);Fe(A,{get open(){return h(P)},get value(){return Q(g)}}),n(_,c)},null),n(m,d),U()}var Ee=v(`<meta name="description" content="Each day, invent a word for a concept that doesn't have a word yet!"> <meta name="og:site_name" content="Neolingo"> <meta name="og:title" content="Neolingo | Invent a word"> <meta name="og:type" content="website"> <meta name="og:image" content="https://neolingo.fun/logo.png"> <meta name="og:url" content="https://neolingo.fun"> <meta name="og:description" content="Each day, invent a word for a concept that doesn't have a word yet!">`,!0),Ie=v('<nav><ul class="simple-link-list fancy-links min-spacing svelte-1jymdlm"><li><a href="/" class="svelte-1jymdlm">Invent</a></li> <li><a href="/dictionary" class="svelte-1jymdlm">Dictionary</a></li></ul></nav>'),Te=v("<p>Neolingo is under construction!</p> <p>Which means, you can't do much of anything just yet. But <em>eventually</em>, you'll be able to invent some new words!</p>",!0),ze=v('<div class="temp-announcement svelte-1jymdlm"><!></div>'),Ae=v('<ul class="simple-link-list fancy-links max-spacing svelte-1jymdlm"><li><a href="/" class="svelte-1jymdlm">Invent</a></li> <li><a href="/dictionary" class="svelte-1jymdlm">Dictionary</a></li> <li><a href="/accessibility" class="svelte-1jymdlm">Accessibility</a></li> <li><a href="/legal" class="svelte-1jymdlm">Legal</a></li></ul>'),De=v("<!> <p><small>© Auroratide (Timothy Foster), All Rights Reserved.</small></p>",!0),Ce=v('<header class="svelte-1jymdlm"><h1> </h1> <!></header> <main class="svelte-1jymdlm"><!></main> <footer class="svelte-1jymdlm"><!></footer>',!0),Re=v("<!> <!>",!0);function Ve(m,a){W(a,!0);const d={};fe(d);const l=()=>_e(ge,"$page",d),_=G(()=>l().url.pathname.includes("beta")),g=G(()=>l().data.metadata.title),N=G(()=>`Neolingo | ${h(g)==="Neolingo"?"Invent a word":h(g)}`);var c=T(m,!0,Re);ue(k=>{var D=T(k,!0,Ee),p=o(D),x=e(e(p,!0)),y=e(e(x,!0)),F=e(e(y,!0)),t=e(e(F,!0)),r=e(e(t,!0)),s=e(e(r,!0));te(()=>{ce.title=`${Y(h(N))}`}),n(k,D)});var P=o(c),A=e(e(P,!0));ke(P,{children:(k,D)=>{var p=j(k),x=o(p);V(x,{children:(y,F)=>{var t=T(y,!0,Ce),r=o(t),s=i(r),f=C(i(s)),q=e(e(s,!0)),E=e(e(r,!0)),R=i(E),B=e(e(E,!0)),H=i(B);M(f,()=>h(g)),z(q,()=>X.enabled,u=>{var b=S(u,!0,Ie);w(u,b)},null),z(R,()=>X.enabled||h(_),u=>{var b=j(u),I=o(b);ae(()=>a.children,I),n(u,b)},u=>{var b=j(u),I=o(b);be(I,{children:(L,J)=>{var O=S(L,!0,ze),re=i(O);V(re,{size:"1em",children:(Z,Be)=>{var le=T(Z,!0,Te);n(Z,le)}}),w(L,O)}}),n(u,b)}),V(H,{size:"0.75em",children:(u,b)=>{var I=T(u,!0,De),L=o(I);z(L,()=>X.enabled,J=>{var O=S(J,!0,Ae);w(J,O)},null),n(u,I)}}),n(y,t)}}),n(k,p)}}),qe(A,{}),n(m,c),U()}export{Ve as component,Qe as universal};
