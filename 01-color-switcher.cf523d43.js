let t=null,e="";const o=document.querySelector("[data-start]"),l=document.querySelector("[data-stop]"),a=document.body;function n(){const t=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,"0")}`;a.style.backgroundColor=t}o.addEventListener("click",(()=>{t||(o.disabled=!0,n(),t=setInterval(n,1e3))})),l.addEventListener("click",(()=>{t&&(clearInterval(t),t=null,e=a.style.backgroundColor,o.disabled=!1),a.style.backgroundColor=e}));
//# sourceMappingURL=01-color-switcher.cf523d43.js.map