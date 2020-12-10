

const bg = ["background0","background1","background2","background3","background4","background5","background6","background7"];

const btnOpen = document.getElementById("btnOpen");
const divCanvas = document.getElementById("canvas");

btnOpen.addEventListener("click",()=>{
    windowAnimation();
    btnOpen.disabled = true;
})

function windowAnimation(){
    let changed = 0;
    let position = {
        left: 0,
        right: 600,
    };
    let loop = 0;
    let objCanvas = {
        w: 800,
        h: 600,
    }
    let play = setInterval(openWindow,5);
    let canvas = document.getElementById("canvas");

    function openWindow(){
        canvas.width = objCanvas.w;
        canvas.height = objCanvas.h;
        let contexto = canvas.getContext("2d");
        
        contexto.beginPath();
        contexto.fillStyle = "black";
        contexto.moveTo(800, position.right);
        contexto.lineTo(0,600);
        contexto.lineTo(800,600);
        contexto.fill();

        
        contexto.fillStyle = "black";
        contexto.moveTo(0, 0);
        contexto.lineTo(0, position.left);
        contexto.lineTo(800, 0);
        contexto.fill();
        contexto.closePath();
        contexto.stroke();
        let frameSecond = 6;
        switch (loop) {
            case 0:
                position.right -= frameSecond;
                position.left += frameSecond;
                if(position.right <= 0){
                    loop = 1;
                }
                break;
            case 2:
                let bgname = bg[Math.floor(Math.random() * bg.length)]
                if(changed == 0){
                    canvas.style.background = "url(./resources/"+ bgname +".png)";
                    changed = 1;
                }
                loop += 1;
                break;
            case 60:
                
                position.right += frameSecond;
                position.left -= frameSecond;
                if(position.right >= 604){   
                    loop = 0;
                    position.right = 0;
                    clearInterval(play);
                    btnOpen.disabled = false;
                }
                break;
            default:
                loop += 1;
                break;
        }
    }
}



