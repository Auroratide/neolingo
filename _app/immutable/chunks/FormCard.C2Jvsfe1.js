import{c as f,a as J,b as u,s,d as m,e as K,l as v,m as D,t as G,o as L}from"./disclose-version.BhNNnOgD.js";import{z as M,p as N,g as w,a as O,s as P,b as y,r as Q,G as q}from"./runtime.D6qGRyYZ.js";import{a as R}from"./await.4TpYBDX6.js";import{S as U,s as W}from"./Stack.fmF2Lfio.js";import{t as X,a as Y,e as Z}from"./events.Bhw9lwsq.js";import{c as _}from"./class.DUfNWZO5.js";import{p as $}from"./props.CEPHL2mE.js";import{F as ee}from"./FocusCard.DGNd0KpK.js";import{S as z}from"./Spinner.D_Z8YK2P.js";import{n as te}from"./notifications.svelte.CKSwXZB1.js";var ae=G('<form class="svelte-ehcgdw"><!></form> <div class="overlay-center svelte-ehcgdw"><!></div> <div class="overlay-center svelte-ehcgdw"><!></div> <div class="overlay-center svelte-ehcgdw"><p><strong>Something went wrong...</strong></p> <p> </p></div>',!0),re=G('<div class="all-text-centered overlay-container svelte-ehcgdw"><h2> </h2> <!></div>');function ge(F,t){O(t,!0);const I=$(t,"focus",3,!1);let g=P(!1);const V=async n=>{var o;n.preventDefault(),y(g,!0);const d=new FormData(n.currentTarget,n.submitter),i=((o=t.transitionTo)==null?void 0:o.shouldTransition())??!1;await t.onsubmit(d).catch(e=>te.error(e)).finally(()=>y(g,!1)),i&&setTimeout(()=>{const e=document.querySelector(`#${t.transitionTo.id}`);e==null||e.scrollIntoView({behavior:"smooth"}),e==null||e.focus()},100)};let x=P(!1);M(()=>{t.content.catch(()=>{y(x,!0)})});var S=m(F);function b(n,d=q,i=q){var o=L(n,!0,ae),e=u(o),h=v(e),a=s(s(e,!0)),l=v(a),r=s(s(a,!0)),c=v(r),T=s(s(r,!0)),A=v(T),B=s(s(A,!0)),E=D(v(B)),p;Q(()=>{p!==(p=w(g))&&(e.inert=p),_(e,"invisible",d()==null),_(a,"very-invisible",d()!=null||i()!=null),_(r,"very-invisible",!w(g)),_(T,"very-invisible",i()==null),Y(E,i())}),Z("submit",e,V,!1),U(h,{children:(C,se)=>{var k=m(C),H=u(k);W(()=>t.form,H,d,i),f(C,k)}}),z(l,{get label(){return t["waiting-label"]}}),z(c,{get label(){return t["submitted-label"]}}),f(n,o)}var j=u(S);ee(j,{get id(){return t.id},get focus(){return I()},get error(){return w(x)},transition:!0,children:(n,d)=>{var i=K(n,!0,re),o=v(i),e=D(v(o)),h=s(s(o,!0));X(e,()=>t.title),R(h,()=>t.content,a=>{var l=m(a),r=u(l);b(r,()=>{},()=>{}),f(a,l)},(a,l)=>{var r=m(a),c=u(r);b(c,()=>l,()=>{}),f(a,r)},(a,l)=>{var r=m(a),c=u(r);b(c,()=>{},()=>l.message),f(a,r)}),J(n,i)}}),f(F,S),N()}export{ge as F};
