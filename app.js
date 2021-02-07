const GunboundWindow = document.getElementById("GunboundWindow");
const btnOpen = document.getElementById("btnOpen");

class Gunbound {
    constructor(){
        this.size = {
            w: 800,
            h: 600,
        };
        this.fps = 4;
    };
}
Gunbound.prototype.close = function(){
    return new Promise((resolve, reject)=>{
        try{
            let data = {
                position: {
                    l: 0,
                    r: 600,
                },
                size: this.size,
                fps: this.fps,
                timeend: 5,
            };
            try{
                data.fps = parseInt(document.getElementById("wFPS").value);
                if(data.fps < 1){
                    data.fps = 1;
                }
            }catch(error){
                data.fps = this.fps;
            }
            try{
                data.timeend = parseInt(document.getElementById("wTime").value);
                if(data.timeend < 1){
                    data.timeend = 1;
                }
            }catch(error){
                data.timeend = 5;
            };
            const app = setInterval(()=>{
                GunboundWindow.width = data.size.w;
                GunboundWindow.height = data.size.h;
                let contexto = GunboundWindow.getContext("2d");
                
                contexto.beginPath();
                contexto.fillStyle = "black";
                contexto.moveTo(800, data.position.r);
                contexto.lineTo(0,600);
                contexto.lineTo(800,600);
                contexto.fill();
        
                
                contexto.fillStyle = "black";
                contexto.moveTo(0, 0);
                contexto.lineTo(0, data.position.l);
                contexto.lineTo(800, 0);
                contexto.fill();
                contexto.closePath();
                contexto.stroke();
        
                data.position.r -= data.fps;
                data.position.l += data.fps;
                if(data.position.r <= 0 && data.position.l >= 610){
                    GunboundWindow.classList.remove('clicked');
                    clearInterval(app);
                    resolve('Successful close window.');
                }
            },data.timeend);
        }catch(error){
            reject('Ups. an error when closing window.')
        }
    });
};
Gunbound.prototype.open = function(){
    return new Promise((resolve, reject)=>{
        try{
            let data = {
                position: {
                    l: 600,
                    r: 0,
                },
                size: this.size,
                fps: this.fps,
                timeend: 5,
            };
            try{
                data.fps = parseInt(document.getElementById("wFPS").value);
                if(data.fps < 1){
                    data.fps = 1;
                }
            }catch(error){
                data.fps = this.fps;
            }
            try{
                data.timeend = parseInt(document.getElementById("wTime").value);
                if(data.timeend < 1){
                    data.timeend = 1;
                }
            }catch(error){
                data.timeend = 5;
            }
            const app = setInterval(()=>{
                GunboundWindow.width = data.size.w;
                GunboundWindow.height = data.size.h;
                let contexto = GunboundWindow.getContext("2d");
                
                contexto.beginPath();
                contexto.fillStyle = "black";
                contexto.moveTo(800, data.position.r);
                contexto.lineTo(0,600);
                contexto.lineTo(800,600);
                contexto.fill();
        
                
                contexto.fillStyle = "black";
                contexto.moveTo(0, 0);
                contexto.lineTo(0, data.position.l);
                contexto.lineTo(800, 0);
                contexto.fill();
                contexto.closePath();
                contexto.stroke();
                data.position.r += data.fps;
                data.position.l -= data.fps;
                if(data.position.r >= 610){
                    GunboundWindow.classList.remove('clicked');
                    clearInterval(app);
                    resolve('Successful open window.');
                }   
            },data.timeend)
        }catch(error){
            reject('Ups. an error when opening window.')
        }
    });
};
Gunbound.prototype.change = function(uri = "transparent"){
    return new Promise((resolve, reject)=>{
        try{
            GunboundWindow.style.backgroundImage = uri;
            resolve('Change is successful.');
        }catch(error){
            reject('Ups. an error when changing window.')
        }
    })
};
Gunbound.prototype.show = function(){
    try{
        GunboundWindow.style.display = "block";
    }catch(error){
        console.log('Ups. an error when show the windows.');
    }
};
Gunbound.prototype.hide = function(){
    try{
        GunboundWindow.style.display = "none";
    }catch(error){
        console.log('Ups. an error when hide the windows.');
    }
};
Gunbound.prototype.sleep = function(){
    return new Promise((resolve, reject)=>{
        try{
            let time = 0;
            let second;
            try{
                second = parseInt(document.getElementById("sTime").value);
                if(second < 0){
                    second = 0;
                }
            }catch(error){
                second = 1000;
            }
            let endSecond;
            try{
                endSecond = parseInt(document.getElementById("sEnd").value);
                if(endSecond < 0){
                    endSecond = 0;
                }
            }catch(error){
                endSecond = 5;
            }

            const TIMER_SLEEP = setInterval(()=>{
                addNotify(time,"rgb(251 250 112 / 54%)");
                if(time == endSecond || GunboundWindow.classList.contains("clicked")){
                    clearInterval(TIMER_SLEEP);
                    resolve('Successful sleep window.');
                }
                time++;
            },second);
        }catch(error){
            reject('Ups. an error when hide the windows.');
        }
    });
}
const gunbound = new Gunbound();

function addNotify(text, color="#d5fb708a"){
    let notify = document.createElement('div');
    notify.classList.add('notify');
    notify.textContent = text;
    notify.style.backgroundColor = color;
    document.getElementById('notification').appendChild(notify);
}
async function callGB(){
    document.getElementById('notification').innerHTML = '';
    btnOpen.disabled = true;
    const close1 = await gunbound.close();
    addNotify(close1);
    const change1 = await gunbound.change('url(./resources/logoSoftnyx.png)');
    addNotify(change1);
    const open1 = await gunbound.open();
    addNotify(open1);
    const sleep1 = await gunbound.sleep();
    addNotify(sleep1);
    const close2 = await gunbound.close();
    addNotify(close2);
    const change2 = await gunbound.change('url(./resources/background2.png)');
    addNotify(change2);
    const open2 = await gunbound.open();
    addNotify(open2);
    btnOpen.disabled = false;
    
}



GunboundWindow.addEventListener("click",()=>{
    GunboundWindow.classList.add("clicked");
});

document.getElementById("btnOpen").addEventListener("click",()=>{
    callGB();
})
