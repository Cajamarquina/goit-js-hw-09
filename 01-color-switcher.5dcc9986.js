!function(){var t=null,e="",n=document.querySelector("[data-start]"),o=document.querySelector("[data-stop]"),a=document.body;function r(){var t="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,"0"));a.style.backgroundColor=t}n.addEventListener("click",(function(){t||(n.disabled=!0,r(),t=setInterval(r,1e3))})),o.addEventListener("click",(function(){t&&(clearInterval(t),t=null,e=a.style.backgroundColor,n.disabled=!1),a.style.backgroundColor=e}))}();
//# sourceMappingURL=01-color-switcher.5dcc9986.js.map