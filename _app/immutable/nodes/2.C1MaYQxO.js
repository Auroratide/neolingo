import{i as Ce,j as _,z as r,o as ne,p as _e,q as V,x as m,l as S,k as p,w as P,y as $,n as k,B as ie,V as Te,J as R,r as te,T as re,W as Ge,H as Le,A as C,s as Y,X as De,a as F,E as pe,v as Je,I as Z,K as ue,D as at,F as Q,Y as Se,S as Be,u as nt,Z as He,_ as ot,a0 as st,a1 as it,G as Ue,g as lt,$ as dt}from"../chunks/disclose-version.CXR2TjGV.js";import{l as G,m as J,c as i,q as K,n as xe}from"../chunks/runtime.BPzuCsVO.js";import{i as X}from"../chunks/if.B1nGmySv.js";import{S as Ee}from"../chunks/Stack.CXfXwLXY.js";import{c as ut,a as Ve,W as vt,b as ct,d as ft,s as gt,e as mt,V as _t,f as pt,h as je}from"../chunks/index.Dvvns4Sz.js";import{F as Pe,s as wt,f as se}from"../chunks/FocusCard.CVW7Ysv8.js";import{p as N}from"../chunks/proxy.DOvIzsIO.js";import{E as yt,n as Xe}from"../chunks/index.t8UZhxf-.js";import{a as bt}from"../chunks/public.D_k4PSsx.js";var ht=k('<p class="text-center block-space svelte-1b99jwj"> </p>'),xt=k(`<section><p class="text-center large svelte-1b99jwj">Each day, <strong>invent a word</strong> for a concept that doesn't have a word yet!</p></section> <section class="less-width small-stack svelte-1b99jwj"><h2 class="small svelte-1b99jwj">Yesterday's word:</h2> <!></section>`,!0);function Wt(t,e){J(e,!1);const n=ut();Ce();var a=ne(t,!0,xt),l=p(a),d=r(r(l,!0)),w=m(d),I=r(r(w,!0));Ve(I,()=>n,x=>{var o=S(x),v=p(o);ct(v,{}),_(x,o)},(x,o)=>{var v=S(x),s=p(v);vt(s,{value:o}),_(x,v)},(x,o)=>{var v=S(x),s=p(v);Pe(s,{error:!0,children:(c,u)=>{var y=P(c,!0,ht),f=$(m(y));_e(f,()=>o.message),V(c,y)}}),_(x,v)}),_(t,a),G()}const ge=3,We=15;var Tt=k('<div class="container center label-underneath svelte-c0qihe"><label> </label> <input type="text" class="large-letters fill-in-the-blank lowercase svelte-c0qihe" required autocomplete="off" spellcheck="false" placeholder="your word here"></div>');function St(t,e){J(e,!0);let n=ie(e,"value",7,""),a=ie(e,"disabled",3,!1);const l=y=>{const f=y.target;n(f.value.toLocaleLowerCase())},d=`[a-zA-Z]{${ge},${We}}`;var w=P(t,!0,Tt),I=m(w),x=$(m(I)),o=r(r(I,!0));Te(o),R(o,"minlength",ge),R(o,"maxlength",We),R(o,"pattern",d),R(o,"title",`between ${C(ge)} and ${C(We)} letters`);var v,s,c,u;te(()=>{v!==(v=e.id)&&R(I,"for",v),re(x,e.label),s!==(s=e.id)&&R(o,"id",s),c!==(c=e.id)&&R(o,"name",c),u!==(u=a())&&(o.disabled=u)}),Ge(o,n,y=>n(y)),Le("change",o,l,!1),V(t,w),G()}function It(t,e){return t.getUTCFullYear()===e.getUTCFullYear()&&t.getUTCMonth()===e.getUTCMonth()&&t.getUTCDate()===e.getUTCDate()}function kt(t){const e=new Date(t);return e.setUTCDate(t.getUTCDate()+1),e.setUTCHours(0,0,0,0),e.getTime()-t.getTime()}let Ie=Y(N(new Date));De(()=>{let t=-1;const e=()=>{F(Ie,N(new Date)),t=window.setTimeout(e,kt(i(Ie))+500)};return e(),()=>clearTimeout(t)});const Ze={isToday:t=>It(i(Ie),t)};function fe(t,e){const n=Ct(t)??e;qe(t,n);let a=Y(N(n));return{get value(){return i(a)},set value(l){qe(t,l),F(a,N(l))}}}function Ct(t){if(!Ke)return;const e=localStorage.getItem(t);if(e!=null)try{return JSON.parse(e)}catch{localStorage.removeItem(t)}}function qe(t,e){Ke&&(e!=null?localStorage.setItem(t,JSON.stringify(e)):localStorage.removeItem(t))}const Ke=(()=>{if(typeof window>"u")return!1;const t="test-localstorage";try{return localStorage.setItem(t,t),localStorage.removeItem(t),!0}catch{return!1}})(),Lt="me:id",Re=fe(Lt,void 0),ae={get id(){return Re.value},generateId:async t=>ft(t).then(e=>(Re.value=e,e))},ze="prompt:generated",Ae="prompt:content",Dt="prompt:word";let me=Y(N(new Promise(()=>{})));const ke=fe(Dt,"");De(()=>{pe(()=>{const t=new Date(localStorage.getItem(ze)??0),e=localStorage.getItem(Ae);e==null||!Ze.isToday(t)?F(me,N(mt().then(n=>(localStorage.setItem(ze,new Date().toISOString()),localStorage.setItem(Ae,JSON.stringify(n)),ke.value="",n)))):F(me,N(Promise.resolve(JSON.parse(e))))})});const z={get content(){return i(me)},get myWord(){return ke.value},submitWord:async t=>{if(!ae.id)throw new Error("Could not submit word. Do you need to verify a captcha?");await gt(ae.id,(await i(me)).id,t),ke.value=t}};var Et=k('<div><div class="line svelte-a7cz2u"></div> <div class="line svelte-a7cz2u"></div> <div class="line svelte-a7cz2u"></div> <p class="animated-ellipses svelte-a7cz2u"> </p></div>');function Me(t,e){J(e,!0);var n=P(t,!0,Et);Je(n,`spinner ${C(yt)} svelte-a7cz2u`);var a=m(n),l=r(r(a,!0));Z(l,"--delay","-0.67s");var d=r(r(l,!0));Z(d,"--delay","-0.33s");var w=r(r(d,!0)),I=$(m(w));_e(I,()=>e.label),V(t,n),G()}var Vt=k('<form class="svelte-ehcgdw"><!></form> <div class="overlay-center svelte-ehcgdw"><!></div> <div class="overlay-center svelte-ehcgdw"><!></div> <div class="overlay-center svelte-ehcgdw"><p><strong>Something went wrong...</strong></p> <p> </p></div>',!0),Pt=k('<div class="all-text-centered overlay-container svelte-ehcgdw"><h2> </h2> <!></div>');function Qe(t,e){J(e,!0);const n=ie(e,"focus",3,!1);let a=Y(!1);const l=async o=>{var c;o.preventDefault(),F(a,!0);const v=new FormData(o.currentTarget,o.submitter),s=((c=e.transitionTo)==null?void 0:c.shouldTransition())??!1;await e.onsubmit(v).catch(u=>Xe.error(u)).finally(()=>F(a,!1)),s&&setTimeout(()=>{var u;(u=document.querySelector(`#${e.transitionTo.id}`))==null||u.scrollIntoView()},100)};let d=Y(!1);pe(()=>{e.content.catch(()=>{F(d,!0)})});var w=S(t);function I(o,v=K,s=K){var c=ne(o,!0,Vt),u=p(c),y=m(u),f=r(r(u,!0)),L=m(f),D=r(r(f,!0)),U=m(D),O=r(r(D,!0)),b=m(O),W=r(r(b,!0)),H=$(m(W)),h;te(()=>{h!==(h=i(a))&&(u.inert=h),ue(u,"invisible",v()==null),ue(f,"very-invisible",v()!=null||s()!=null),ue(D,"very-invisible",!i(a)),ue(O,"very-invisible",s()==null),re(H,s())}),Le("submit",u,l,!1),Ee(y,{children:(g,T)=>{var E=S(g),j=p(E);at(()=>e.form,j,v,s),_(g,E)}}),Me(L,{get label(){return e["waiting-label"]}}),Me(U,{get label(){return e["submitted-label"]}}),_(o,c)}var x=p(w);Pe(x,{get id(){return e.id},get focus(){return n()},get error(){return i(d)},transition:!0,children:(o,v)=>{var s=P(o,!0,Pt),c=m(s),u=$(m(c)),y=r(r(c,!0));_e(u,()=>e.title),Ve(y,()=>e.content,f=>{var L=S(f),D=p(L);I(D,()=>{},()=>{}),_(f,L)},(f,L)=>{var D=S(f),U=p(D);I(U,()=>L,()=>{}),_(f,D)},(f,L)=>{var D=S(f),U=p(D);I(U,()=>{},()=>L.message),_(f,D)}),V(o,s)}}),_(t,w),G()}var Ft=k('<div id="cf-turnstile"></div>');function Ot(t,e){J(e,!0),pe(()=>{const a=window.turnstile.render("#cf-turnstile",{sitekey:bt,callback:()=>{}});return()=>{window.turnstile.remove(a)}});var n=P(t,!0,Ft);V(t,n),G()}var Nt=k('<p class="center slightly-larger button-like-padding svelte-i76fpj">Thanks for your submission!</p>'),Ht=k('<button type="submit" class="slightly-larger svelte-i76fpj">Submit Word</button>'),Ut=k("<div><!></div>"),jt=k('<p>Invent a word that means:</p> <p class="balanced svelte-i76fpj"><strong class="slightly-larger quoted svelte-i76fpj"> </strong></p> <!> <!> <!>',!0);function qt(t,e){J(e,!0);const n=ie(e,"focus",3,!1);let a=Y(N(z.myWord));const l=async o=>{ae.id||await ae.generateId(o.get("cf-turnstile-response")),await z.submitWord(o.get("word-input"))},d=Q(()=>z.myWord!=null&&z.myWord!=="");var w=S(t),I=p(w),x=Q(()=>({id:"vote-section",shouldTransition:()=>{var o;return(((o=z.myWord)==null?void 0:o.length)??0)===0}}));Qe(I,{id:"invent-a-word-section",get focus(){return n()},title:"Invent a Word",get content(){return z.content},"waiting-label":"Creating a prompt","submitted-label":"Sending your word",onsubmit:l,get transitionTo(){return i(x)},form:(v,s=K)=>{var c=ne(v,!0,jt),u=p(c),y=r(r(u,!0)),f=m(y),L=$(m(f)),D=r(r(y,!0)),U=r(r(D,!0)),O=r(r(U,!0));_e(L,()=>{var b;return((b=s())==null?void 0:b.text)??"this is placeholder text where the prompt text will go after it all loads into place"}),St(D,{id:"word-input",label:"Your word",get value(){return i(a)},set value(b){F(a,N(b))},get disabled(){return i(d)}}),X(U,()=>i(d),b=>{var W=P(b,!0,Nt);V(b,W)},b=>{var W=P(b,!0,Ht),H;te(()=>{H!==(H=i(a).length<ge||i(d))&&(W.disabled=H)}),V(b,W)}),X(O,()=>!ae.id,b=>{var W=P(b,!0,Ut);Se(W,()=>wt,()=>({axis:"y"}),!1);var H=m(W);Ot(H,{}),V(b,W)},null),_(v,c)}}),_(t,w),G()}var Rt=(t,e,n)=>e.onreplaceword(n()),zt=k('<div></div> <button class="x-button svelte-1ienhrs" type="button"><span> </span> <span aria-hidden="true">&times;</span></button> <input type="radio" required class="checkmark svelte-1ienhrs"> <label class="svelte-1ienhrs"> </label>',!0),At=k('<p class="span-all smaller svelte-1ienhrs"> </p>'),Mt=k('<fieldset class="svelte-1ienhrs"><legend>Which word do you like best?</legend> <div class="gridded-radios larger svelte-1ienhrs"><!> <label class="span-all smaller space-before svelte-1ienhrs">Or, find a specific word</label> <div class="span-all row smaller svelte-1ienhrs"><input type="search" placeholder="type word" autocomplete="off" class="svelte-1ienhrs"> <button type="button" class="subtle-button svelte-1ienhrs">Find</button></div> <!></div></fieldset>');function Yt(t,e){var W,H;J(e,!0);const n=[];let a=ie(e,"value",7),l=Y(N(((W=e.specificWord)==null?void 0:W.text)??"")),d=Y(N(((H=e.specificWord)==null?void 0:H.text)===e.myWord?"my-word":"idle"));async function w(h){var T;if(i(l)===((T=e.specificWord)==null?void 0:T.text))return;if(h.stopPropagation(),h.preventDefault(),i(l)===""){F(d,"idle");return}F(d,"searching");const g=await e.onsearchword(i(l));F(d,N(g==null?"not-found":g.text===e.myWord?"my-word":"found")),i(d)==="found"&&a(g.id)}var I=P(t,!0,Mt);function x(h,g=K,T=K,E=K){var j=ne(h,!0,zt),oe=p(j),A=r(r(oe,!0)),ee=m(A);Je(ee,`${C(_t)} svelte-1ienhrs`);var le=m(ee),q=r(r(A,!0));Te(q);var B=r(r(q,!0));He(B,()=>se,()=>({x:-20,duration:120,delay:60}),!1),Se(B,()=>se,()=>({x:20,duration:120}),!1);var de=$(m(B)),we,ye,be,Ne,he;te(()=>{Z(oe,"grid-area",`${C(T()+1)} / 1 / ${C(T()+2)} / 2`),we!==(we=`Replace ${C(g().text)}`)&&R(A,"title",we),Z(A,"grid-area",`${C(T()+1)} / 2 / ${C(T()+2)} / 3`),Z(A,"visibility",E()?"visible":"hidden"),re(le,`Replace ${C(g().text)}`),ye!==(ye=`${C(e.id)}-${C(g().id)}`)&&R(q,"id",ye),be!==(be=e.id)&&R(q,"name",be),Ne!==(Ne=g().id)&&(q.value=(q.__value=g().id)==null?"":g().id),Z(q,"grid-area",`${C(T()+1)} / 3 / ${C(T()+2)} / 4`),he!==(he=`${C(e.id)}-${C(g().id)}`)&&R(B,"for",he),Z(B,"grid-area",`${C(T()+1)} / 4 / ${C(T()+2)} / 5`),re(de,g().text)}),A.__click=[Rt,e,T],ot(n,[],q,()=>(g().id,a()),rt=>a(rt)),_(h,j)}function o(h,g=K,T=K){var E=P(h,!0,At);He(E,()=>se,()=>({x:-20,duration:120,delay:60}),!1),Se(E,()=>se,()=>({x:20,duration:120}),!1);var j=$(m(E));te(()=>{Z(E,"--row",T()),re(j,g())}),V(h,E)}var v=m(I),s=r(r(v,!0)),c=m(s),u=r(r(c,!0)),y=r(r(u,!0)),f=m(y);Te(f);var L=r(r(f,!0)),D=r(r(y,!0)),U,O,b;te(()=>{U!==(U=`${C(e.id)}-word-search`)&&R(u,"for",U),Z(u,"--row",e.words.length),Z(y,"--row",e.words.length+1),O!==(O=`${C(e.id)}-word-search`)&&R(f,"id",O),b!==(b=`${C(e.id)}-word-search`)&&R(f,"name",b)}),nt(c,()=>e.words,71,(h,g)=>xe(h).id,(h,g,T)=>{var E=S(h),j=p(E);x(j,()=>xe(g),()=>xe(T),()=>!0),_(h,E)},null),Ge(f,()=>i(l),h=>F(l,h)),Le("keypress",f,h=>h.key==="Enter"&&w(h),!1),L.__click=w,X(D,()=>i(d)==="searching",h=>{var g=S(h),T=p(g);o(T,()=>"",()=>e.words.length+2),_(h,g)},h=>{var g=S(h),T=p(g);X(T,()=>i(d)==="not-found",E=>{var j=S(E),oe=p(j);o(oe,()=>"We could not find this word.",()=>e.words.length+2),_(E,j)},E=>{var j=S(E),oe=p(j);X(oe,()=>i(d)==="my-word",A=>{var ee=S(A),le=p(ee);o(le,()=>"Hey, that's your word!",()=>e.words.length+2),_(A,ee)},A=>{var ee=S(A),le=p(ee);X(le,()=>e.specificWord!=null,q=>{var B=S(q),de=p(B);x(de,()=>e.specificWord,()=>e.words.length+2,()=>!1),_(q,B)},q=>{var B=S(q),de=p(B);o(de,()=>"",()=>e.words.length+2),_(q,B)}),_(A,ee)}),_(E,j)}),_(h,g)}),V(t,I),G()}Be(["click"]);function Gt(t){if(t.length===0)return-1;const e=Math.random();let n=0;for(let a=0;a<t.length;a++)if(n+=t[a],e<n)return a;return-1}function $e(t,e){if(t.length<=e)return[...t];const n=t.map(l=>l.tally+1),a=[];for(;a.length<e;){const l=Gt(Jt(n));if(l===-1)break;a.push(t[l]),n[l]=0}return a}function Jt(t){const e=t.reduce((n,a)=>n+a,0);return t.map(n=>n/e)}const et=3,tt="votes:generated",Bt="votes:votable",Xt="votes:my-vote",Zt="votes:specific-word";let ce=Y(N(new Promise(()=>{})));const ve=fe(Bt,[]),Fe=fe(Xt,void 0),Oe=fe(Zt,void 0);De(()=>{pe(()=>{const t=new Date(localStorage.getItem(tt)??0);Ze.isToday(t)?F(ce,N(je())):(Fe.value=void 0,Oe.value=void 0,F(ce,N(je().then(Kt))))})});async function Kt(t){return localStorage.setItem(tt,new Date().toISOString()),ve.value=$e(t,et),t}async function Qt(t){if(!ae.id)throw new Error("Could not submit word. Do you need to verify a captcha?");await pt(ae.id,(await z.content).id,t),Fe.value=t}async function $t(t){const e=await i(ce),n=ve.value.map(d=>d.id),a=e.filter(d=>!n.includes(d.id)&&d.text!==z.myWord),l=$e(a,1)[0];l!=null&&(ve.value=ve.value.toSpliced(t,1,l))}async function er(t){const n=(await i(ce)).find(a=>a.text===t);return n!=null&&n.text!=z.myWord&&(Oe.value=n),n}const M={get allWords(){return i(ce)},get votableWords(){return ve.value},get myVote(){return Fe.value},get specificWord(){return Oe.value},submitVote:Qt,replaceWord:$t,findSpecificWord:er};var tr=k('<p class="center slightly-larger svelte-1qv8yif">Thanks for your vote!</p> <p class="center">You may change your vote whenever you want.</p>',!0),rr=k('<button type="submit" class="slightly-larger svelte-1qv8yif">Submit Vote</button>'),ar=k("<p>Choose a favorite word that isn't your own:</p> <!> <!>",!0);function nr(t,e){J(e,!0);const n=ie(e,"focus",3,!1);let a=Y(N(M.myVote));const l=async s=>{await M.submitVote(s.get("word-vote"))},d=[...Array(et).keys()].map(s=>({id:(-s).toString(),text:"placeholder",tally:0})),w=s=>{M.votableWords[s].id===i(a)&&F(a,void 0),M.replaceWord(s)},I=Q(()=>M.myVote!=null&&M.myVote===i(a));var x=S(t),o=p(x),v=Q(()=>({id:"whats-next-section",shouldTransition:()=>{var s;return(((s=M.myVote)==null?void 0:s.length)??0)===0}}));Qe(o,{id:"vote-section",get focus(){return n()},title:"Vote",get content(){return M.allWords},"waiting-label":"Finding words","submitted-label":"Sending your vote",onsubmit:l,get transitionTo(){return i(v)},form:(c,u=K)=>{var y=ne(c,!0,ar),f=p(y),L=r(r(f,!0)),D=Q(()=>u()!=null?M.votableWords:d),U=r(r(L,!0));Yt(L,{id:"word-vote",get words(){return i(D)},get value(){return i(a)},set value(O){F(a,N(O))},get specificWord(){return M.specificWord},get myWord(){return z.myWord},onreplaceword:w,get onsearchword(){return M.findSpecificWord}}),X(U,()=>i(I),O=>{var b=S(O),W=p(b);Ee(W,{size:"0.25em",children:(H,h)=>{var g=ne(H,!0,tr);_(H,g)}}),_(O,b)},O=>{var b=P(O,!0,rr),W;te(()=>{W!==(W=i(a)==null)&&(b.disabled=W)}),V(O,b)}),_(c,y)}}),_(t,x),G()}var or=st('<svg width="1200" height="1227" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg" class="svelte-120zmi4"><title>X/Twitter</title><path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="currentColor"></path></svg>');function sr(t,e){J(e,!1),Ce();var n=P(t,!0,or);V(t,n),G()}const ir=async(t,e,n,a,l)=>{var d,w;window.clearTimeout(i(e));try{await((w=(d=navigator.clipboard)==null?void 0:d.writeText)==null?void 0:w.call(d,i(n))),F(a,!0),F(e,N(window.setTimeout(()=>F(a,!1),5e3)))}catch(I){l.error(I)}};var lr=k('<a class="button"><!> Tweet it</a>'),dr=k('<span class="transitions svelte-1d0xpup">Copy/Paste</span>'),ur=k('<span class="transitions svelte-1d0xpup">Copied!</span>'),vr=k('<button class="position-container svelte-1d0xpup"><span class="define-the-space svelte-1d0xpup">Copy/Paste</span> <!></button>'),cr=k('<div class="small-stack svelte-1d0xpup"><p>Share your word on social media:</p> <blockquote class="space-after svelte-1d0xpup"><p>I invented a new word!</p> <p><strong> </strong> </p> <p>Invent your own word at neolingo.fun.</p></blockquote> <ul class="row-list svelte-1d0xpup"><li><!></li> <li><!></li></ul></div>');function Ye(t,e){J(e,!0);const n=Q(()=>`I invented a new word!

${e.word}: ${e.definition}

Invent your own word at neolingo.fun.`);let a=Y(!1),l=Y(-1);var d=P(t,!0,cr);function w(b){var W=P(b,!0,lr),H=m(W);it(W,"href",()=>`https://twitter.com/intent/tweet?text=${C(encodeURIComponent(i(n)))}`),sr(H,{}),V(b,W)}function I(b){var W=P(b,!0,vr),H=m(W),h=r(r(H,!0));W.__click=[ir,l,n,a,Xe],X(h,()=>!i(a),g=>{var T=P(g,!0,dr);Ue(T,()=>se,()=>({duration:120,x:20}),!1),V(g,T)},g=>{var T=P(g,!0,ur);Ue(T,()=>se,()=>({duration:120,x:-20}),!1),V(g,T)}),V(b,W)}var x=m(d),o=r(r(x,!0)),v=m(o),s=r(r(v,!0)),c=m(s),u=$(m(c)),y=r(c,!0),f=r(r(o,!0)),L=m(f),D=m(L),U=r(r(L,!0)),O=m(U);te(()=>{ue(d,"invisible",e.word.length===0),re(u,e.word),re(y,`: ${C(e.definition)}`)}),w(D),I(O),V(t,d),G()}Be(["click"]);var fr=k('<div class="invisible small-stack svelte-10xovyt"><!></div>'),gr=k(`<div class="small-stack svelte-10xovyt"><h2 class="text-center svelte-10xovyt">What's next?</h2> <p class="text-center balance more-space-after svelte-10xovyt">Come back tomorrow to see which word won and then invent another new word!</p> <!></div>`);function mr(t,e){J(e,!1),Ce();var n=S(t),a=p(n);Pe(a,{id:"whats-next-section",children:(l,d)=>{var w=P(l,!0,gr),I=m(w),x=r(r(I,!0)),o=r(r(x,!0));Ve(o,()=>z.content,v=>{var s=P(v,!0,fr),c=m(s);Ye(c,{word:"",definition:""}),V(v,s)},(v,s)=>{var c=S(v),u=p(c);Ye(u,{get word(){return z.myWord},get definition(){return s.text}}),_(v,c)},null),V(l,w)}}),_(t,n),G()}var _r=k("<!> <!> <!> <!>",!0);function Ir(t,e){J(e,!0);const n=w=>w?1:0,a=Q(()=>n(z.myWord)+n(M.myVote));var l=S(t);lt(w=>{dt.title="Neolingo"});var d=p(l);Ee(d,{size:"3em",children:(w,I)=>{var x=ne(w,!0,_r),o=p(x),v=r(r(o,!0)),s=r(r(v,!0)),c=r(r(s,!0));Wt(o,{}),X(v,()=>!0,u=>{var y=S(u),f=p(y),L=Q(()=>i(a)<1);qt(f,{get focus(){return i(L)}}),_(u,y)},null),X(s,()=>i(a)>0,u=>{var y=S(u),f=p(y),L=Q(()=>i(a)<2);nr(f,{get focus(){return i(L)}}),_(u,y)},null),X(c,()=>i(a)>1,u=>{var y=S(u),f=p(y);mr(f,{}),_(u,y)},null),_(w,x)}}),_(t,l),G()}export{Ir as component};
