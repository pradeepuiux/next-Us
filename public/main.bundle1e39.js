(()=>{"use strict";var e,t,o,n,r,s,i={355:(e,t,o)=>{function n(e){const t=e.dataset.rootMargin?e.dataset.rootMargin:"0px 0px -5% 0px";new IntersectionObserver((e=>{e.forEach((e=>{e.isIntersecting&&e.target.classList.remove("animate-on-enter")}))}),{rootMargin:t,threshold:0}).observe(e)}o.d(t,{Z:()=>n})},509:(e,t,o)=>{function n(){return"ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0}o.d(t,{Z:()=>n})},774:(e,t,o)=>{function n(e){const t=encodeURIComponent(window.location.href),o=document.querySelector('[property="og:description"]').getAttribute("content"),n=encodeURIComponent(o);e.querySelector(".twitter a").setAttribute("href",`http://twitter.com/intent/tweet?text=${n}&url=${t}`);e.querySelector(".linked-in a").setAttribute("href",`https://www.linkedin.com/sharing/share-offsite/?url=${t}`);e.querySelector(".facebook a").setAttribute("href",`https://www.facebook.com/sharer/sharer.php?u=${t}`)}o.d(t,{Z:()=>n})},114:(e,t,o)=>{function n(){const e=document.getElementById("site-header"),t=(e.querySelector(".site-header__logo"),e.querySelector(".primary-navigation__menu").querySelectorAll("li:not(:last-child)")),o=gsap.timeline({paused:!0,onReverseComplete:()=>{gsap.set(t,{clearProps:!0})}});o.to(t,{opacity:0,duration:.15,stagger:.07}),o.set(t,{display:"none"}),o.to(e,{maxWidth:"480px",duration:.15}),e.addEventListener("mouseenter",(e=>{o.reverse(),r&&r.disconnect(),c()})),e.addEventListener("mousemove",(e=>{o.reverse()})),e.addEventListener("mouseleave",(e=>{document.body.classList.contains("is-scrolled")&&o.play()}));const n=document.getElementById("scroll-pixel");new IntersectionObserver((e=>{e[0].isIntersecting?(document.body.classList.remove("is-scrolled"),o.reverse()):(document.body.classList.add("is-scrolled"),o.play())}),{threshold:1}).observe(n);let r=null;const s=document.getElementById("vh"),i=document.querySelectorAll("section.block"),c=()=>{const t=e.getBoundingClientRect(),o=Math.round(t.top+.4*t.height),n=Math.round(window.innerHeight-t.bottom+.4*t.height);r=new IntersectionObserver((e=>{e.forEach((e=>{if(e.isIntersecting){const t=e.target.dataset.theme||"default";document.body.setAttribute("data-current-theme",t)}}))}),{threshold:0,rootMargin:`${o}px 0px -${n}px 0px`}),i.forEach((e=>r.observe(e)))};new ResizeObserver((()=>{r&&r.disconnect(),c()})).observe(s)}o.d(t,{Z:()=>n})},381:(e,t,o)=>{function n(e){document.fonts.ready.then((function(){let t,o,n=!0,r=null;const s=e.dataset.splitTextDelay||0;let i=window.innerWidth;gsap.registerPlugin(SplitText),o=new SplitText(e,{type:"lines",linesClass:"lineChild"}),r=new SplitText(e,{type:"lines",linesClass:"lineParent"}),t=gsap.timeline({paused:!0}),t.staggerTo(e.querySelectorAll(".lineChild"),1,{y:0,ease:"expo.out"},.1,`+=${s}`),e.classList.add("loaded");new IntersectionObserver((e=>{e[0].isIntersecting&&n&&(t.restart(),n=!1)}),{rootMargin:"0px 0px -5% 0px",threshold:.2}).observe(e);new ResizeObserver((t=>{window.innerWidth!==i&&(o.revert(),e.classList.remove("split-text")),i=window.innerWidth})).observe(document.body)}))}o.d(t,{Z:()=>n})},126:(e,t,o)=>{function n(){let e=document.documentElement.clientWidth/100;document.documentElement.style.setProperty("--vw",`${e}px`)}o.d(t,{Z:()=>n})}},c={};function d(e){var t=c[e];if(void 0!==t)return t.exports;var o=c[e]={exports:{}};return i[e](o,o.exports,d),o.exports}d.d=(e,t)=>{for(var o in t)d.o(t,o)&&!d.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},d.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e=d(126),t=d(355),o=d(509),n=d(114),r=d(774),s=d(381),document.addEventListener("DOMContentLoaded",(function(i){new n.Z,new ResizeObserver((t=>{(0,o.Z)()?(document.body.classList.add("is-touch-device"),document.body.classList.add("remove-touch-device")):(document.body.classList.remove("is-touch-device"),document.body.classList.add("no-touch-device")),(0,e.Z)()})).observe(document.body),[...document.querySelectorAll(".heading__heading")].forEach((e=>{e.children[0].classList.add("split-text")})),[...document.querySelectorAll(".split-text")].forEach((e=>{(0,s.Z)(e)})),[...document.querySelectorAll(".animate-on-enter")].forEach((e=>new t.Z(e))),[...document.querySelectorAll(".share")].forEach((e=>new r.Z(e))),[...document.querySelectorAll('img[width="1"]')].forEach((e=>{e.removeAttribute("width"),e.removeAttribute("height")})),document.documentElement.classList.remove("no-js","is-loading")}))})();