const e=document.querySelector(".breed-select"),t=document.querySelector(".loader"),n=document.querySelector(".error"),r=document.querySelector(".cat-info");e.addEventListener("change",(e=>{const o=e.target.value;var a;o&&(t.style.display="block",r.style.display="none",n.style.display="none",(a=o,fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${a}`,{headers:{"x-api-key":"live_9i6HzzZFNFA1oaYRze81AbtKlBywv3OJ6502fJjo0pAUtFOdj61V5PlPH5ga6JCl"}}).then((e=>{if(!e.ok)throw new Error("Failed to fetch cat by breed");return e.json().then((e=>{if(e.length>0)return{name:e[0].breeds[0].name,description:e[0].breeds[0].description,temperament:e[0].breeds[0].temperament,url:e[0].url};throw new Error("No cat found for the selected breed")}))}))).then((e=>{!function(e){r.innerHTML=`\n    <img src="${e.url}" alt="Cat Image">\n    <p>Name: ${e.name}</p>\n    <p>Description: ${e.description}</p>\n    <p>Temperament: ${e.temperament}</p>\n  `}(e),t.style.display="none",r.style.display="block"})).catch((()=>{n.style.display="block",t.style.display="none"})))})),t.style.display="block",fetch("https://api.thecatapi.com/v1/breeds",{headers:{"x-api-key":"live_9i6HzzZFNFA1oaYRze81AbtKlBywv3OJ6502fJjo0pAUtFOdj61V5PlPH5ga6JCl"}}).then((e=>{if(!e.ok)throw new Error("Failed to fetch breeds");return e.json()})).then((n=>{!function(t){t.forEach((t=>{const n=document.createElement("option");n.value=t.id,n.textContent=t.name,e.appendChild(n)}))}(n),t.style.display="none",e.style.display="block"})).catch((()=>{n.style.display="block",t.style.display="none"}));
//# sourceMappingURL=index.9e442d2d.js.map
