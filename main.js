(()=>{"use strict";var e=document.querySelector("#card-template").content;function t(t,n,o,c,a,i,u,l){var s=e.querySelector(".card").cloneNode(!0),d=s.querySelector(".card__image");d.src=t.link,d.alt=t.name,s.querySelector(".card__title").textContent=t.name;var f=s.querySelector(".card__like-button"),p=s.querySelector(".like-counter"),m=s.querySelector(".card__delete-button");return m.addEventListener("click",(function(e){i(t._id).then((function(){o(e)}))})),p.textContent=t.likes.length,a!==t.owner._id&&(m.style.display="none"),f.addEventListener("click",(function(){c(t,f,p,a,u,l)})),r(t,a)&&f.classList.add("card__like-button_is-active"),d.addEventListener("click",(function(){n(t.link,t.name)})),s}function n(e){e.target.closest(".card").remove()}function o(e,t,n,o,c,a){r(e,o)?a(e._id).then((function(o){t.classList.remove("card__like-button_is-active"),n.textContent=o.likes.length,e.likes=o.likes})).catch((function(e){return console.log(e)})):c(e._id).then((function(o){console.log(o),t.classList.add("card__like-button_is-active"),n.textContent=o.likes.length,e.likes=o.likes})).catch((function(e){return console.log(e)}))}function r(e,t){return e.likes.some((function(e){return e._id===t}))}function c(e){e.classList.add("popup_is-opened"),document.body.style.overflow="hidden",document.addEventListener("keydown",i),e.addEventListener("mousedown",u)}function a(e){e.classList.remove("popup_is-opened"),document.body.style.overflow="",document.removeEventListener("keydown",i),e.removeEventListener("mousedown",u)}function i(e){"Escape"===e.key&&a(document.querySelector(".popup_is-opened"))}function u(e){e.currentTarget===e.target&&a(e.target)}function l(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""}function s(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}function d(e,t){document.querySelectorAll(t.submitButtonSelector).forEach((function(n){s(e,n,t)}))}function f(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(n){return l(e,n,t)})),s(n,o,t)}var p={baseUrl:"https://nomoreparties.co/v1/wff-cohort-18",headers:{authorization:"9558371d-0d46-403c-907b-cdda7f07198a","Content-Type":"application/json"}};function m(e){if(e.ok)return e.json()}function h(e){return fetch("".concat(p.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:{authorization:p.headers.authorization}}).then(m)}function y(e){return fetch("".concat(p.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:{authorization:p.headers.authorization}}).then(m)}function v(e){return fetch("".concat(p.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:{authorization:p.headers.authorization}}).then(m)}function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}var b=null,S=document.querySelector(".content").querySelector(".places__list"),E=document.querySelector(".popup_type_edit"),g=document.querySelector(".popup_type_new-card"),k=document.querySelector(".popup_type_image"),q=document.querySelector(".profile__edit-button"),C=document.querySelector(".profile__add-button"),L=document.querySelectorAll(".popup__close"),A=document.querySelector(".popup__image"),x=document.querySelector(".popup__caption"),w=document.querySelector(".popup_type_avatar"),z=document.forms.editProfile,T=z.elements.name,U=z.elements.description,B=z.querySelector(".popup__button"),O=document.querySelector(".profile__title"),P=document.querySelector(".profile__description"),j=document.querySelector(".profile__image"),D=document.forms.newPlace,I=D.placeName,N=D.link,M=D.querySelector(".popup__button"),J=document.forms.updateAvatar,G=J.inputAvatar,H=J.querySelectorAll(".popup__button"),V={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"button_inactive",inputErrorClass:"popup__input_type_error",errorClass:"form__input-error_active"};function $(e,t){A.src=e,A.alt=t,x.textContent=t,c(k)}function F(e,t){t.textContent=e?"Сохранение...":"Сохранение"}q.addEventListener("click",(function(e){f(z,V),c(E),T.value=O.textContent,U.value=P.textContent})),C.addEventListener("click",(function(e){f(D,V),c(g)})),j.addEventListener("click",(function(){f(J,V),c(w)})),L.forEach((function(e){e.addEventListener("click",(function(){a(e.closest(".popup"))}))})),z.addEventListener("submit",(function(e){e.preventDefault(),F(!0,B),function(e,t){return fetch("".concat(p.baseUrl,"/users/me"),{method:"PATCH",headers:p.headers,body:JSON.stringify({name:e.value,about:t.value})}).then(m)}(T,U).then((function(e){O.textContent=e.name,P.textContent=e.about,a(E)})).catch((function(e){console.log(e)})).finally((function(){F(!1,B)}))})),J.addEventListener("submit",(function(e){e.preventDefault(),F(!0,H),function(e){return fetch("".concat(p.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:p.headers,body:JSON.stringify({avatar:e})}).then(m)}(G.value).then((function(e){j.style.backgroundImage="url(".concat(e.avatar,")")})).catch((function(e){console.log(e)})).finally((function(){F(!1,submitButton)}))})),D.addEventListener("submit",(function(e){var r,c;e.preventDefault(),F(!0,M),(r=I.value,c=N.value,fetch("".concat(p.baseUrl,"/cards"),{method:"POST",headers:p.headers,body:JSON.stringify({name:r,link:c})}).then(m)).then((function(e){S.prepend(t(e,$,n,o,b,h,y,v))})).catch((function(e){console.log(e)})).finally((function(){F(!1,M)})),I.value="",N.value="",a(g)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector));d(n,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?l(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),d(n,t)}))}))}(t,e)}))}(V),Promise.all([fetch("".concat(p.baseUrl,"/users/me"),{method:"GET",headers:{authorization:p.headers.authorization}}).then(m),fetch("".concat(p.baseUrl,"/cards"),{method:"GET",headers:{authorization:p.headers.authorization}}).then(m)]).then((function(e){var r,c,a=(c=2,function(e){if(Array.isArray(e))return e}(r=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(o=c.call(n)).done)&&(i.push(o.value),i.length!==t);u=!0);}catch(e){l=!0,r=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw r}}return i}}(r,c)||function(e,t){if(e){if("string"==typeof e)return _(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_(e,t):void 0}}(r,c)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=a[0],u=a[1];O.textContent=i.name,P.textContent=i.about,j.style.backgroundImage="url(".concat(i.avatar,")"),b=i._id,u.forEach((function(e){S.append(t(e,$,n,o,b,h,y,v))}))})).catch((function(e){console.log(e)}))})();