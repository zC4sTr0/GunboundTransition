const GunboundWindow = document.getElementById("GunboundWindow");

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
            },5);
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
                data.position.r += data.fps;
                data.position.l -= data.fps;
                if(data.position.r >= 610){
                    GunboundWindow.classList.remove('clicked');
                    clearInterval(app);
                    resolve('Successful open window.');
                }   
            },5)
        }catch(error){
            reject('Ups. an error when opening window.')
        }
    });
};
Gunbound.prototype.change = function(uri){
    return new Promise((resolve, reject)=>{
        try{
            GunboundWindow.style.background = uri;
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
            const second = 1000;
            const endSecond = 5;

            const TIMER_SLEEP = setInterval(()=>{
                if(time == endSecond || GunboundWindow.classList.contains("clicked")){
                    clearInterval(TIMER_SLEEP);
                    resolve('Successful sleep window.');
                }
                time++;
            },second);
        }catch(error){
            resolve('Ups. an error when hide the windows.');
        }
    });
}
const gunbound = new Gunbound();

async function callGB(){
    console.log(await gunbound.close());
    console.log(await gunbound.change('red'));
    console.log(await gunbound.open());
    console.log(await gunbound.sleep());
    console.log(await gunbound.close());
    console.log(await gunbound.change('green'));
    console.log(await gunbound.open());
}
callGB();


GunboundWindow.addEventListener("click",()=>{
    GunboundWindow.classList.add("clicked");
})
