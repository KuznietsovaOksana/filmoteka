function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},a={},l=t.parcelRequired7c6;null==l&&((l=function(e){if(e in n)return n[e].exports;if(e in a){var t=a[e];delete a[e];var l={id:e,exports:{}};return n[e]=l,t.call(l.exports,l,l.exports),l.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){a[e]=t},t.parcelRequired7c6=l),l("7me8F");var i=l("7me8F");var o,r=e(l("1Gatq")).template({1:function(e,t,n,a,l){var i,o=null!=t?t:e.nullContext||{},r=e.hooks.helperMissing,s="function",c=e.escapeExpression,d=e.lookupProperty||function(e,t){if(Object.prototype.hasOwnProperty.call(e,t))return e[t]};return'  <li class="cards__item card" data-movieid="'+c(typeof(i=null!=(i=d(n,"id")||(null!=t?d(t,"id"):t))?i:r)===s?i.call(o,{name:"id",hash:{},data:l,loc:{start:{line:2,column:45},end:{line:2,column:51}}}):i)+'">\n    <a href="#">\n      <div class="card__img">\n        <img src="'+c(typeof(i=null!=(i=d(n,"poster_path")||(null!=t?d(t,"poster_path"):t))?i:r)===s?i.call(o,{name:"poster_path",hash:{},data:l,loc:{start:{line:5,column:18},end:{line:5,column:33}}}):i)+'" alt="'+c(typeof(i=null!=(i=d(n,"title")||(null!=t?d(t,"title"):t))?i:r)===s?i.call(o,{name:"title",hash:{},data:l,loc:{start:{line:5,column:40},end:{line:5,column:49}}}):i)+'" />\n      </div>\n      <div class="card__info">\n        <h2 class="card__title">'+c(typeof(i=null!=(i=d(n,"original_title")||(null!=t?d(t,"original_title"):t))?i:r)===s?i.call(o,{name:"original_title",hash:{},data:l,loc:{start:{line:8,column:32},end:{line:8,column:50}}}):i)+'</h2>\n        <ul class="card__genres">'+c(typeof(i=null!=(i=d(n,"genres")||(null!=t?d(t,"genres"):t))?i:r)===s?i.call(o,{name:"genres",hash:{},data:l,loc:{start:{line:9,column:33},end:{line:9,column:43}}}):i)+'\n        </ul>\n        <span class="card__year">'+c(typeof(i=null!=(i=d(n,"release_date")||(null!=t?d(t,"release_date"):t))?i:r)===s?i.call(o,{name:"release_date",hash:{},data:l,loc:{start:{line:11,column:33},end:{line:11,column:49}}}):i)+"</span>\n      </div>\n    </a>\n  </li>\n"},compiler:[8,">= 4.3.0"],main:function(e,t,n,a,l){var i;return null!=(i=(e.lookupProperty||function(e,t){if(Object.prototype.hasOwnProperty.call(e,t))return e[t]})(n,"each").call(null!=t?t:e.nullContext||{},t,{name:"each",hash:{},fn:e.program(1,l,0),inverse:e.noop,data:l,loc:{start:{line:1,column:0},end:{line:15,column:9}}}))?i:""},useData:!0});o=JSON.parse('{"genres":[{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]}');var s=l("ioBS9"),c=l("3ab2c");const d=document.querySelector(".cards"),u=document.querySelector("#search-form"),p=document.querySelector(".search-field"),m=document.querySelector(".js-warning"),g=document.querySelector(".js-search-results");let h=1;const _=new(0,i.MovieDB);async function f(e){try{const{data:t}=await _.fetchSearch(e);return x(t.page,t.total_pages),p.value="",console.log(t.results),0===t.results.length?(m.textContent="Search result not successful. Enter the correct movie name and try again",void setTimeout((()=>{m.textContent=""}),3e3)):(y(t.results),t)}catch(e){console.log(e)}}async function v(){console.log(d),d.dataset.position="trends";try{const{data:e}=await _.fetchTrendMovies(h);return x(e.page,e.total_pages),e&&(0,s.loaderRender)(),y(e.results),e}catch(e){console.log(e)}}function y(t){const n=t.map((t=>{const n=t.genre_ids.map((t=>e(o).genres.map((e=>{if(e.id===t)return e.name})).join("")));let a="";n.length<4&&(a=n.join(", ")),n.length>=4&&(a=n.slice(0,2).join(", ")+", Other"),0===t.genre_ids.length&&(a="Other");let l="";l=null!==t.poster_path?`https://image.tmdb.org/t/p/w500${t.poster_path}`:"https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg";const i=(0,c.numberConverter)(t.vote_average);return{...t,poster_path:l,genres:a,release_date:t.release_date.slice(0,4),vote_average:i}}));d.innerHTML=r(n)}function x(e,t){let n="";h=e,e>1&&(n+='<li class="pagination__item slider-arrow prev">&#129144</li>',n+='<li class="pagination__item">1</li>'),e>4&&(n+='<li class="pagination__item dots">...</li>'),e>3&&(n+=`<li class="pagination__item">${e-2}</li>`),e>2&&(n+=`<li class="pagination__item">${e-1}</li>`),n+=`<li class="pagination__item pagination__item--current">${e}</li>`,t-1>e&&(n+=`<li class="pagination__item">${e+1}</li>`),t-2>e&&(n+=`<li class="pagination__item">${e+2}</li>`),t-3>e&&(n+='<li class="pagination__item dots">...</li>'),t>e&&(n+=`<li class="pagination__item">${t}</li>`,n+='<li class="pagination__item slider-arrow next">&#129146</li>'),w.innerHTML=n}v(),u.addEventListener("submit",(async function(e,t){e.preventDefault(),d.dataset.position="searched";const n=e.target.elements.query.value.trim();if(console.log(n),0===n.length)return g.textContent="Please enter your request",setTimeout((()=>{g.textContent=""}),3e3),void e.currentTarget.reset();_.searchQuery=e.target.elements.query.value,f(t)}));const w=document.querySelector(".pagination__list");w.addEventListener("click",(async function(e){if("LI"!==e.target.nodeName)return;if("..."===e.target.textContent)return;if("🡸"===e.target.textContent){if(window.scrollTo(0,0),"trends"===d.dataset.position)return void v(h-=1).then((e=>{y(e.results),x(e.page,e.total_pages)}));if("searched"===d.dataset.position)return console.log("searchres click next"),void f(h-=1).then((e=>{y(e.results),x(e.page,e.total_pages)}))}if("🡺"===e.target.textContent){if(window.scrollTo(0,0),"trends"===d.dataset.position)return void v(h+=1).then((e=>{y(e.results),x(e.page,e.total_pages)}));if("searched"===d.dataset.position)return console.log("searchres click next"),void f(h+=1).then((e=>{y(e.results),x(e.page,e.total_pages)}))}const t=Number(e.target.textContent);if(h=t,window.scrollTo(0,0),"trends"===d.dataset.position)return void v().then((e=>{y(e.results),x(e.page,e.total_pages)}));if("searched"===d.dataset.position)return console.log("searchres click next"),void f(h).then((e=>{y(e.results),x(e.page,e.total_pages)}))})),l("22vBn"),l("baGT8"),l("lJ5oQ"),l("56a1K"),l("3ab2c");
//# sourceMappingURL=index.0bfd50ba.js.map
