const GunboundWindow = document.getElementById("GunboundWindow");
const btnOpen = document.getElementById("btnOpen");

import gunbound from './Gunbound.js';



async function callGB() {
    document.getElementById('notification').innerHTML = '';
    btnOpen.disabled = true;
    await gunbound.init();
    await gunbound.intro();
    await gunbound.end();
    btnOpen.disabled = false;
};



GunboundWindow.addEventListener("click", () => {
    GunboundWindow.classList.add("clicked");
});

document.getElementById("btnOpen").addEventListener("click", () => {
    callGB();
})