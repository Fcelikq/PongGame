//document 
const arena = document.getElementById("arena");
const ball = document.getElementById("ball");
const stickLeft = document.getElementById("stick1");
const stickRight = document.getElementById("stick2");
const scoreLeft = document.getElementById("scoreTable1");
const scoreRight = document.getElementById("scoreTable2");



var CONSTS = {
    gameSpeed: 10,
    stickLeftMoveUp: 0,
    stickLeftMoveDown: 0,
    stickRightMoveUp: 0, 
    stickRightMoveDown: 0,
    score1: 0,
    score2: 0,
    ballTopSpeed: 0,
    ballBottomSpeed: 0,
    direction :"right",
    rndDirection: "left",
    directionUpDown:"",
    ballRestartLeft:450,
    ballRestartTop:250
};

//Move Stick
function getKeySticks() {
        window.addEventListener('keydown', (e)=> {
            switch(e.keyCode) {
                //stick left up 
                case 87: { CONSTS.stickLeftMoveUp =-10}break;
                case 83: {CONSTS.stickLeftMoveDown = 10;}break;
                case 38: { CONSTS.stickRightMoveUp = -10;}break;
                case 40:{ CONSTS.stickRightMoveDown= 10;}break;
            }
            });
            window.addEventListener('keyup', (e)=>{
                switch(e.keyCode) {
                    //stick left up 
                    case 87: { CONSTS.stickLeftMoveUp = 0;}break;
                    case 83: { CONSTS.stickLeftMoveDown = 0;}break;
                    case 38: { CONSTS.stickRightMoveUp = 0;}break;
                    case 40:{ CONSTS.stickRightMoveDown= 0;}break;
                }
                });
    }
function moveSticks(){
    let l = stickLeft.offsetTop;
    let r = stickRight.offsetTop;
       setInterval(()=>{
         
         if(l>0){
            l+= CONSTS.stickLeftMoveUp;
             stickLeft.style.top=l+"px";
         }
          if(l<400){
            l+= CONSTS.stickLeftMoveDown;
             stickLeft.style.top=l+"px";
         }
            
         if(r>0){
            r+= CONSTS.stickRightMoveUp;
            stickRight.style.top=r+"px";
         }
          if(r<400){
            r+= CONSTS.stickRightMoveDown;
            stickRight.style.top=r+"px";
         }
       },CONSTS.gameSpeed);
}


function startGame(){
    getKeySticks();
   moveSticks();
   moveBall();
   ballDirection()
}

startGame();

function moveBall(){

    setInterval(function(){
        
        bl=ball.offsetLeft;
        bt=ball.offsetTop;
        switch( CONSTS.direction){
            case "left" :{
                bl-=4;
                ball.style.left=bl+"px";
            
            }break;
            case "right" :{
                bl+=4;
                ball.style.left=bl+"px";
               
            }break;
            case "leftUp" :{
                bt-=4;
                bl-=4;
                ball.style.left=bl+"px";
                ball.style.top=bt+"px";
            }break;
            case "rightUp" :{
                bl+=4;
                bt-=4;
                ball.style.left=bl+"px";
                ball.style.top=bt+"px";
            }break;
            case "leftDown" :{
                bl-=4;
                bt+=4;
                ball.style.left=bl+"px";
                ball.style.top=bt+"px";
            }break;
            case "rightDown" :{
                bl+=4;
                bt+=4;
                ball.style.left=bl+"px";
                ball.style.top=bt+"px";
            }break;
        }
        
    },CONSTS.gameSpeed);
}
function ballDirection(){
    setInterval(()=>{
        //stickleft location
        let myleft = stickLeft.offsetLeft;
        let myright=arena.offsetWidth-(stickLeft.offsetLeft+stickLeft.offsetWidth);
        let mytop=stickLeft.offsetTop;
        let mybottom=arena.offsetHeight-(stickLeft.offsetTop+stickLeft.offsetHeight);

      //stickRight location
      let myleft2 = stickRight.offsetLeft;
      let myright2=arena.offsetWidth-(stickRight.offsetLeft+stickRight.offsetWidth);
      let mytop2=stickRight.offsetTop;
      let mybottom2=arena.offsetHeight-(stickRight.offsetTop+stickRight.offsetHeight);
     
        //ball location
        let otherleft = ball.offsetLeft;
        let otherright=arena.offsetWidth-(ball.offsetLeft+ball.offsetWidth);       
        let othertop=ball.offsetTop;
        let otherbottom=arena.offsetHeight-(ball.offsetTop+ball.offsetHeight);        
        
        //crash test
        if(myleft-otherleft<30 && myright-otherright<30 && mytop-othertop<15 && mybottom-otherbottom<30) {
            let random = Math.floor(Math.random()*3);
           CONSTS.directionUpDown= "right";
            switch(random){
              case 0: CONSTS.rndDirection="rightUp";break;
              case 1: CONSTS.rndDirection="rightDown";break;
              case 2: CONSTS.rndDirection="right";break;
            }
            CONSTS.direction=CONSTS.rndDirection;
        }
        //crash test
        if(myleft2-otherleft<10 && myright2-otherright<15 && mytop2-othertop<15 && mybottom2-otherbottom<30) {
            CONSTS.directionUpDown= "left";
            let random = Math.floor(Math.random()*3);

            switch(random){
                case 0: CONSTS.rndDirection="leftUp";break;
                case 1: CONSTS.rndDirection="leftDown";break;
                case 2: CONSTS.rndDirection="left";break;
            }
            CONSTS.direction=CONSTS.rndDirection;
        }

       
        if(otherleft<0){
            CONSTS.score1++;
             scoreRight.textContent=CONSTS.score1;
             scoreRight.style.color='red';
             ball.style.left=CONSTS.ballRestartLeft+"px";
             ball.style.top=CONSTS.ballRestartTop+"px";
             setTimeout(()=>{scoreRight.style.color='white';},400);

             
             
                CONSTS.direction="right";
        }
        if(otherleft>900){
           CONSTS.score2++;
           scoreLeft.textContent=CONSTS.score2;
           scoreLeft.style.color='red';
           ball.style.left=CONSTS.ballRestartLeft+"px";
           ball.style.top=CONSTS.ballRestartTop+"px";
           setTimeout(()=>{scoreLeft.style.color='white';},400);
            CONSTS.direction="left";
    }
        if(othertop<0){
            CONSTS.direction=CONSTS.directionUpDown+"Down";
        }
        if(othertop>500){
            CONSTS.direction=CONSTS.directionUpDown+"Up";
        }
    },CONSTS.gameSpeed);
}