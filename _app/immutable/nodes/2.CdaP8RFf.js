import{c as w,s as a,o as ae,b as h,t as k,a as R,d as D,e as H,k as x,l as fe,H as vt}from"../chunks/disclose-version.jtkXa8v4.js";import{z as X,p as J,a as K,D as $,s as M,a1 as Ve,b as E,g as o,r as Oe,d as G,E as ke,a0 as ct}from"../chunks/runtime.ChrPWTZd.js";import{i as j,e as ft,b as Fe,o as Me,t as Ue}from"../chunks/if.BAnrKUfd.js";import{S as $e}from"../chunks/Stack.Daa2g9Oo.js";import{b as gt,a as et,c as mt,d as _t,e as pt,f as bt,h as Ge}from"../chunks/api.CfnFQHVy.js";import{i as ze}from"../chunks/lifecycle.DJ-X8vrX.js";import{a as wt,W as yt,V as ht}from"../chunks/index.TLkH3FDl.js";import{s as W,a as se,e as tt,t as Wt,d as rt}from"../chunks/events.L-VZA9oS.js";import{b as xt}from"../chunks/this.BSD64vzo.js";import{p as de}from"../chunks/props.BX3zS95e.js";import{p as T}from"../chunks/proxy.BgKykdNt.js";import{r as Ie,a as N,f as le,b as St,F as Tt}from"../chunks/FocusCard.C81PzMbq.js";import{s as ue}from"../chunks/stored-state.svelte.BRVeIcgH.js";import{F as at,T as kt,t as Ct}from"../chunks/TurnstileDialog.BDwsQjTd.js";import{c as It,a as Dt}from"../chunks/class.DbWJB1Xa.js";import{s as te}from"../chunks/style.DmZOFMkf.js";import{n as Et}from"../chunks/notifications.svelte.DfG8ItFP.js";function nt(t,e,r){t.addEventListener("input",()=>{r(Ye(t)?Xe(t.value):t.value)}),X(()=>{var n=e();t.__value=n,!(Ye(t)&&n===Xe(t.value))&&(t.type==="date"&&!n&&!t.value||(t.value=W(n)))})}function Lt(t,e,r,n,u){var _=r.getAttribute("type")==="checkbox",v=t;if(e!==null)for(var g of e){var m=v;v=m[g],v===void 0&&(v=m[g]=[])}v.push(r),r.addEventListener("change",()=>{var l=r.__value;_&&(l=Vt(v,l,r.checked)),u(l)}),X(()=>{var l=n();_?(l=l||[],r.checked=l.includes(r.__value)):r.checked=r.__value===l}),X(()=>()=>{var l=v.indexOf(r);l!==-1&&v.splice(l,1)})}function Vt(t,e,r){for(var n=new Set,u=0;u<t.length;u+=1)t[u].checked&&n.add(t[u].__value);return r||n.delete(e),Array.from(n)}function Ye(t){var e=t.type;return e==="number"||e==="range"}function Xe(t){return t===""?null:+t}const Ot=()=>({metadata:{title:"Neolingo"}}),Ur=Object.freeze(Object.defineProperty({__proto__:null,load:Ot},Symbol.toStringTag,{value:"Module"}));var zt=k(`<section class="less-width small-stack svelte-1b99jwj"><h2 class="small svelte-1b99jwj">Yesterday's word:</h2> <!></section>`),Pt=k(`<section><p class="text-center large svelte-1b99jwj">Each day, <strong>invent a word</strong> for a concept that doesn't have a word yet!</p></section> <!>`,!0);function Rt(t,e){K(e,!1);const r=gt();ze();var n=ae(t,!0,Pt);function u(g,m=$){var l=H(g,!0,zt),y=x(l),f=a(a(y,!0));j(f,m,b=>{var c=D(b),i=h(c);yt(i,{get value(){return m()}}),w(b,c)},b=>{var c=D(b),i=h(c);wt(i,{}),w(b,c)}),R(g,l)}var _=h(n),v=a(a(_,!0));et(v,()=>r,g=>{var m=D(g),l=h(m);u(l,()=>{}),w(g,m)},(g,m)=>{var l=D(g),y=h(l);u(y,()=>m),w(g,l)},g=>{}),w(t,n),J()}const me=3,Ce=15;var Ht=k('<div class="container center label-underneath svelte-1voqsbi"><label> </label> <input type="text" class="large-letters fill-in-the-blank lowercase svelte-1voqsbi" required autocomplete="off" spellcheck="false" placeholder="your word here"></div>');function Nt(t,e){K(e,!0);let r=de(e,"value",7,""),n=de(e,"disabled",3,!1);const u=i=>{const S=i.target;r(S.value.toLocaleLowerCase())},_=`[a-zA-Z]{${me},${Ce}}`;var v=H(t,!0,Ht),g=x(v),m=fe(x(g)),l=a(a(g,!0));Ie(l),N(l,"minlength",me),N(l,"maxlength",Ce),N(l,"pattern",_),N(l,"title",`between ${W(me)} and ${W(Ce)} letters`);var y,f,b,c;X(()=>{y!==(y=e.id)&&N(g,"for",y),se(m,e.label),f!==(f=e.id)&&N(l,"id",f),b!==(b=e.id)&&N(l,"name",b),c!==(c=n())&&(l.disabled=c)}),nt(l,r,i=>r(i)),tt("change",l,u,!1),R(t,v),J()}const ot=-8;function Ze(t){const e=new Date(t);return e.setUTCHours(e.getUTCHours()+ot),e.toISOString().split("T")[0]}function jt(t,e){return Ze(t)===Ze(e)}function qt(t){const e=new Date(t);return e.setUTCDate(t.getUTCDate()+1),e.setUTCHours(-ot,0,0,0),e.getTime()-t.getTime()}let De=M(T(new Date));Ve(()=>{let t=-1;const e=()=>{E(De,T(new Date)),t=window.setTimeout(e,qt(o(De))+500)};return e(),()=>clearTimeout(t)});const lt={isToday:t=>jt(o(De),t)},At="me:id",Be=ue(At,void 0),re={get id(){return Be.value},generateId:async t=>mt(t).then(e=>(Be.value=e,e))},Je="prompt:generated",Ke="prompt:content",Ft="prompt:word";let _e=M(T(new Promise(()=>{})));const Ee=ue(Ft,"");Ve(()=>{Oe(()=>{const t=new Date(localStorage.getItem(Je)??0),e=localStorage.getItem(Ke);!lt.isToday(t)||e==null?(Ee.value="",E(_e,T(pt().then(r=>(localStorage.setItem(Je,new Date().toISOString()),localStorage.setItem(Ke,JSON.stringify(r)),r))))):E(_e,T(Promise.resolve(JSON.parse(e))))})});const P={get content(){return o(_e)},get myWord(){return Ee.value},submitWord:async t=>{if(!re.id)throw new Error("Could not submit word. Do you need to verify a captcha?");await _t(re.id,(await o(_e)).id,t),Ee.value=t}};var Mt=k('<p class="center slightly-larger button-like-padding svelte-i76fpj">Thanks for your submission!</p>'),Ut=k('<button type="submit" class="slightly-larger svelte-i76fpj">Submit Word</button>'),Gt=k('<p>Invent a word that means:</p> <p class="balanced svelte-i76fpj"><strong class="slightly-larger quoted svelte-i76fpj"> </strong></p> <!> <!>',!0),Yt=k("<!> <!>",!0);function Xt(t,e){K(e,!0);const r=de(e,"focus",3,!1);let n=M(T(P.myWord));Oe(()=>{P.myWord||E(n,T(P.myWord))});const u=async i=>{await re.generateId(i)};let _=M(null);const v=()=>{var i;(i=o(_))==null||i.showModal()};let g=M(()=>{});const m=async i=>{re.id||await Promise.race([Ct(v).then(u),new Promise(S=>E(g,T(S))).then(()=>{throw new Error("You must complete the captcha to submit a word.")})]),await P.submitWord(i.get("word-input"))},l=G(()=>P.myWord!=null&&P.myWord!=="");var y=ae(t,!0,Yt),f=h(y),b=G(()=>({id:"vote-section",shouldTransition:()=>{var i;return(((i=P.myWord)==null?void 0:i.length)??0)===0}})),c=a(a(f,!0));at(f,{id:"invent-a-word-section",get focus(){return r()},title:"Invent a Word",get content(){return P.content},"waiting-label":"Creating a prompt","submitted-label":"Sending your word",onsubmit:m,transition:!0,get transitionTo(){return o(b)},form:(S,V=$)=>{var q=ae(S,!0,Gt),Z=h(q),A=a(a(Z,!0)),C=x(A),L=fe(x(C)),O=a(a(A,!0)),B=a(a(O,!0));Wt(L,()=>{var I;return((I=V())==null?void 0:I.text)??"this is placeholder text where the prompt text will go after it all loads into place"}),Nt(O,{id:"word-input",label:"Your word",get value(){return o(n)},set value(I){E(n,T(I))},get disabled(){return o(l)}}),j(B,()=>o(l),I=>{var z=H(I,!0,Mt);R(I,z)},I=>{var z=H(I,!0,Ut),ve;X(()=>{ve!==(ve=o(n).length<me||o(l))&&(z.disabled=ve)}),R(I,z)}),w(S,q)}}),j(c,()=>!re.id,i=>{var S=D(i),V=h(S);xt(kt(V,{get oncancel(){return o(g)}}),q=>E(_,T(q)),()=>o(_)),w(i,S)},null),w(t,y),J()}var Zt=(t,e,r)=>e.onreplaceword(r()),Bt=k('<div></div> <button class="x-button svelte-1h2rvfz" type="button"><span> </span> <span aria-hidden="true">&times;</span></button> <input type="radio" required class="checkmark svelte-1h2rvfz"> <label class="svelte-1h2rvfz"> </label>',!0),Jt=k('<p class="span-all smaller svelte-1h2rvfz"> </p>'),Kt=k('<fieldset class="svelte-1h2rvfz"><legend class="svelte-1h2rvfz">Which word do you like best?</legend> <div class="gridded-radios larger svelte-1h2rvfz"><!> <label class="span-all smaller space-before svelte-1h2rvfz">Or, find a specific word</label> <div class="span-all row smaller svelte-1h2rvfz"><input type="search" placeholder="type word" autocomplete="off" spellcheck="false" class="svelte-1h2rvfz"> <button type="button" class="subtle-button svelte-1h2rvfz">Find</button></div> <!> <!> <!> <!> <!> <!></div></fieldset>');function Qt(t,e){var He,Ne;K(e,!0);const r=[];let n=de(e,"value",7),u=de(e,"canReplace",3,!0),_=M(T(((He=e.specificWord)==null?void 0:He.text)??"")),v=M(!1),g=M(T(((Ne=e.specificWord)==null?void 0:Ne.text)??"")),m=M(T(e.specificWord));const l=G(()=>{var s;return o(v)?"searching":o(m)==null&&o(g)===""?"idle":o(m)==null?"not-found":((s=o(m))==null?void 0:s.text)===e.myWord?"my-word":e.words.some(d=>{var p;return d.text===((p=e.specificWord)==null?void 0:p.text)})?"already-listed":"found"});async function y(s){var d;o(_)!==((d=e.specificWord)==null?void 0:d.text)&&(s.stopPropagation(),s.preventDefault(),E(v,!0),E(m,T(await e.onsearchword(o(_)).catch(p=>{throw E(v,!1),p}))),E(g,T(o(_))),E(v,!1),o(m)!=null&&n(o(m).id))}var f=H(t,!0,Kt);function b(s,d=$,p=$,Y=$){var ne=ae(s,!0,Bt),je=h(ne),oe=a(a(je,!0)),qe=x(oe);It(qe,`${W(ht)} svelte-1h2rvfz`);var it=x(qe),Q=a(a(oe,!0));Ie(Q);var ce=a(a(Q,!0));Fe(ce,()=>le,()=>({x:-20,duration:120,delay:60}),!1),Me(ce,()=>le,()=>({x:20,duration:120}),!1);var dt=fe(x(ce)),he,We,xe,Se,Ae,Te;X(()=>{te(je,"grid-area",`${W(p()+1)} / 1 / ${W(p()+2)} / 2`),he!==(he=`Replace ${W(d().text)}`)&&N(oe,"title",he),We!==(We=!Y())&&(oe.disabled=We),te(oe,"grid-area",`${W(p()+1)} / 2 / ${W(p()+2)} / 3`),se(it,`Replace ${W(d().text)}`),xe!==(xe=`${W(e.id)}-${W(d().id)}`)&&N(Q,"id",xe),Se!==(Se=e.id)&&N(Q,"name",Se),Ae!==(Ae=d().id)&&(Q.value=(Q.__value=d().id)==null?"":d().id),te(Q,"grid-area",`${W(p()+1)} / 3 / ${W(p()+2)} / 4`),Te!==(Te=`${W(e.id)}-${W(d().id)}`)&&N(ce,"for",Te),te(ce,"grid-area",`${W(p()+1)} / 4 / ${W(p()+2)} / 5`),se(dt,d().text)}),oe.__click=[Zt,e,p],Lt(r,[],Q,()=>(d().id,n()),ut=>n(ut)),w(s,ne)}function c(s,d=$,p=$){var Y=H(s,!0,Jt);Fe(Y,()=>le,()=>({x:-20,duration:120,delay:60}),!1),Me(Y,()=>le,()=>({x:20,duration:120}),!1);var ne=fe(x(Y));X(()=>{te(Y,"--row",p()),se(ne,d())}),R(s,Y)}var i=x(f),S=a(a(i,!0)),V=x(S),q=a(a(V,!0)),Z=a(a(q,!0)),A=x(Z);Ie(A);var C=a(a(A,!0)),L=a(a(Z,!0)),O=a(a(L,!0)),B=a(a(O,!0)),I=a(a(B,!0)),z=a(a(I,!0)),ve=a(a(z,!0)),be,we,ye;X(()=>{be!==(be=`${W(e.id)}-word-search`)&&N(q,"for",be),te(q,"--row",e.words.length),te(Z,"--row",e.words.length+1),we!==(we=`${W(e.id)}-word-search`)&&N(A,"id",we),ye!==(ye=`${W(e.id)}-word-search`)&&N(A,"name",ye)}),ft(V,()=>e.words,71,(s,d)=>ke(s).id,(s,d,p)=>{var Y=D(s),ne=h(Y);b(ne,()=>ke(d),()=>ke(p),u),w(s,Y)},null),nt(A,()=>o(_),s=>E(_,s)),tt("keypress",A,s=>s.key==="Enter"&&y(s),!1),C.__click=y,j(L,()=>o(l)==="searching",s=>{var d=D(s),p=h(d);c(p,()=>"",()=>e.words.length+2),w(s,d)},null),j(O,()=>o(l)==="already-listed",s=>{var d=D(s),p=h(d);c(p,()=>"This word is already listed above.",()=>e.words.length+2),w(s,d)},null),j(B,()=>o(l)==="not-found",s=>{var d=D(s),p=h(d);c(p,()=>"We could not find this word.",()=>e.words.length+2),w(s,d)},null),j(I,()=>o(l)==="my-word",s=>{var d=D(s),p=h(d);c(p,()=>"Hey, that's your word!",()=>e.words.length+2),w(s,d)},null),j(z,()=>o(l)==="found"&&e.specificWord!=null,s=>{var d=D(s),p=h(d);b(p,()=>e.specificWord,()=>e.words.length+2,()=>!1),w(s,d)},null),j(ve,()=>o(l)==="idle",s=>{var d=D(s),p=h(d);c(p,()=>"",()=>e.words.length+2),w(s,d)},null),R(t,f),J()}rt(["click"]);function $t(t){if(t.length===0)return-1;const e=Math.random();let r=0;for(let n=0;n<t.length;n++)if(r+=t[n],e<r)return n;return-1}function Pe(t,e){if(t.length<=e)return[...t];const r=t.map(u=>u.tally+1),n=[];for(;n.length<e;){const u=$t(er(r));if(u===-1)break;n.push(t[u]),r[u]=0}return n}function er(t){const e=t.reduce((r,n)=>r+n,0);return t.map(r=>r/e)}const pe=5,st="votes:generated",tr="votes:votable",rr="votes:my-vote",ar="votes:specific-word",nr="votes:seen-words";let ge=M(T(new Promise(()=>{})));const U=ue(tr,[]),Re=ue(rr,void 0),ie=ue(ar,void 0),ee=ue(nr,[]);Ve(()=>{Oe(()=>{const t=new Date(localStorage.getItem(st)??0);lt.isToday(t)?E(ge,T(Ge().then(lr))):(Re.value=void 0,ie.value=void 0,ee.value=[],E(ge,T(Ge().then(or))))})});async function or(t){return localStorage.setItem(st,new Date().toISOString()),U.value=Pe(t,pe),ee.value=U.value.map(e=>e.id),t}async function lr(t){if(U.value.length<pe){const e=pe-U.value.length,r=Pe(t.filter(Le),e);U.value=[...U.value,...r],ee.value=[...ee.value,...r.map(n=>n.id)]}return t}async function sr(t){if(!re.id)throw new Error("Could not submit word. Do you need to verify a captcha?");await bt(re.id,(await P.content).id,t),Re.value=t}async function ir(t){const e=await o(ge);let r=e.filter(Le);r.length===0&&(ee.value=U.value.map(u=>u.id),r=e.filter(Le));const n=Pe(r,1)[0];n!=null&&(U.value=U.value.toSpliced(t,1,n),ee.value=[...ee.value,n.id])}async function dr(t){if(t===""){ie.value=void 0;return}const r=(await o(ge)).find(n=>n.text===t);return r!=null&&r.text!=P.myWord?ie.value=r:ie.value=void 0,r}const F={get allWords(){return o(ge)},get votableWords(){return U.value},get myVote(){return Re.value},get specificWord(){return ie.value},submitVote:sr,replaceWord:ir,findSpecificWord:dr},ur=G(()=>U.value.map(t=>t.id));function Le(t){var e;return!o(ur).includes(t.id)&&t.text!==P.myWord&&t.text!==((e=ie.value)==null?void 0:e.text)&&!ee.value.includes(t.id)}var vr=k('<p class="center slightly-larger svelte-1qv8yif">Thanks for your vote!</p> <p class="center">You may change your vote whenever you want.</p>',!0),cr=k('<button type="submit" class="slightly-larger svelte-1qv8yif">Submit Vote</button>'),fr=k("<p>Choose a favorite word that isn't your own:</p> <!> <!>",!0);function gr(t,e){K(e,!0);const r=de(e,"focus",3,!1);let n=M(T(F.myVote));const u=async f=>{await F.submitVote(f.get("word-vote"))},_=[...Array(pe).keys()].map(f=>({id:(-f).toString(),text:"placeholder",tally:0})),v=f=>{F.votableWords[f].id===o(n)&&E(n,void 0),F.replaceWord(f)},g=G(()=>F.myVote!=null&&F.myVote===o(n));var m=D(t),l=h(m),y=G(()=>({id:"whats-next-section",shouldTransition:()=>{var f;return(((f=F.myVote)==null?void 0:f.length)??0)===0}}));at(l,{id:"vote-section",get focus(){return r()},title:"Vote",get content(){return F.allWords},"waiting-label":"Finding words","submitted-label":"Sending your vote",onsubmit:u,transition:!0,get transitionTo(){return o(y)},form:(b,c=$)=>{var i=ae(b,!0,fr);const S=ct(()=>{var C;return F.votableWords.length<(((C=c())==null?void 0:C.length)??0)-1});var V=h(i),q=a(a(V,!0)),Z=G(()=>c()!=null?F.votableWords:_),A=a(a(q,!0));Qt(q,{id:"word-vote",get words(){return o(Z)},get value(){return o(n)},set value(C){E(n,T(C))},get specificWord(){return F.specificWord},get myWord(){return P.myWord},get canReplace(){return o(S)},onreplaceword:v,get onsearchword(){return F.findSpecificWord}}),j(A,()=>o(g),C=>{var L=D(C),O=h(L);$e(O,{size:"0.25em",children:(B,I)=>{var z=ae(B,!0,vr);w(B,z)}}),w(C,L)},C=>{var L=H(C,!0,cr),O;X(()=>{O!==(O=o(n)==null)&&(L.disabled=O)}),R(C,L)}),w(b,i)}}),w(t,m),J()}var mr=vt('<svg width="1200" height="1227" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg" class="svelte-120zmi4"><title>X/Twitter</title><path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="currentColor"></path></svg>');function _r(t,e){K(e,!1),ze();var r=H(t,!0,mr);R(t,r),J()}const pr=async(t,e,r,n,u)=>{var _,v;window.clearTimeout(o(e));try{await((v=(_=navigator.clipboard)==null?void 0:_.writeText)==null?void 0:v.call(_,o(r))),E(n,!0),E(e,T(window.setTimeout(()=>E(n,!1),5e3)))}catch(g){u.error(g)}};var br=k('<a class="button"><!> Tweet it</a>'),wr=k('<span class="transitions svelte-1d0xpup">Copy/Paste</span>'),yr=k('<span class="transitions svelte-1d0xpup">Copied!</span>'),hr=k('<button class="position-container svelte-1d0xpup"><span class="define-the-space svelte-1d0xpup">Copy/Paste</span> <!></button>'),Wr=k('<div class="small-stack svelte-1d0xpup"><p>Share your word on social media:</p> <blockquote class="space-after svelte-1d0xpup"><p>I invented a new word!</p> <p><strong> </strong> </p> <p>Invent your own word at neolingo.fun.</p></blockquote> <ul class="row-list svelte-1d0xpup"><li><!></li> <li><!></li></ul></div>');function Qe(t,e){K(e,!0);const r=G(()=>`I invented a new word!

${e.word}: ${e.definition}

Invent your own word at neolingo.fun.`);let n=M(!1),u=M(-1);var _=H(t,!0,Wr);function v(C){var L=H(C,!0,br),O=x(L);St(L,"href",()=>`https://twitter.com/intent/tweet?text=${W(encodeURIComponent(o(r)))}`),_r(O,{}),R(C,L)}function g(C){var L=H(C,!0,hr),O=x(L),B=a(a(O,!0));L.__click=[pr,u,r,n,Et],j(B,()=>!o(n),I=>{var z=H(I,!0,wr);Ue(z,()=>le,()=>({duration:120,x:20}),!1),R(I,z)},I=>{var z=H(I,!0,yr);Ue(z,()=>le,()=>({duration:120,x:-20}),!1),R(I,z)}),R(C,L)}var m=x(_),l=a(a(m,!0)),y=x(l),f=a(a(y,!0)),b=x(f),c=fe(x(b)),i=a(b,!0),S=a(a(l,!0)),V=x(S),q=x(V),Z=a(a(V,!0)),A=x(Z);X(()=>{Dt(_,"invisible",e.word.length===0),se(c,e.word),se(i,`: ${W(e.definition)}`)}),v(q),g(A),R(t,_),J()}rt(["click"]);var xr=k('<div class="invisible small-stack svelte-10xovyt"><!></div>'),Sr=k(`<div class="small-stack svelte-10xovyt"><h2 class="text-center svelte-10xovyt">What's next?</h2> <p class="text-center balance more-space-after svelte-10xovyt">Come back tomorrow to see which word won and then invent another new word!</p> <!></div>`);function Tr(t,e){K(e,!1),ze();var r=D(t),n=h(r);Tt(n,{id:"whats-next-section",transition:!0,children:(u,_)=>{var v=H(u,!0,Sr),g=x(v),m=a(a(g,!0)),l=a(a(m,!0));et(l,()=>P.content,y=>{var f=H(y,!0,xr),b=x(f);Qe(b,{word:"",definition:""}),R(y,f)},(y,f)=>{var b=D(y),c=h(b);Qe(c,{get word(){return P.myWord},get definition(){return f.text}}),w(y,b)},null),R(u,v)}}),w(t,r),J()}var kr=k("<!> <!> <!> <!>",!0);function Gr(t,e){K(e,!0);const r=v=>v?1:0,n=G(()=>r(P.myWord)+r(F.myVote));var u=D(t),_=h(u);$e(_,{size:"3em",children:(v,g)=>{var m=ae(v,!0,kr),l=h(m),y=a(a(l,!0)),f=a(a(y,!0)),b=a(a(f,!0));Rt(l,{}),j(y,()=>!0,c=>{var i=D(c),S=h(i),V=G(()=>o(n)<1);Xt(S,{get focus(){return o(V)}}),w(c,i)},null),j(f,()=>o(n)>0,c=>{var i=D(c),S=h(i),V=G(()=>o(n)<2);gr(S,{get focus(){return o(V)}}),w(c,i)},null),j(b,()=>o(n)>1,c=>{var i=D(c),S=h(i);Tr(S,{}),w(c,i)},null),w(v,m)}}),w(t,u),J()}export{Gr as component,Ur as universal};