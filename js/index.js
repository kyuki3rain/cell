let row = $("#rowP").val();
let col = $("#colP").val();
let i,j;
let p=[];
let dx=[0,1,1,1,0,-1,-1,-1];
let dy=[1,1,0,-1,-1,1,0,-1];
let dx2=[0,1,2,2,2,2,2,1,0,-1,-2,-2,-2,-2,-2,-1];
let dy2=[2,2,2,1,0,-1,-2,-2,-2,-2,-2,-1,0,1,2,2];

function mod(a,b){return(a*b<0)*b+a%b}

let speed=200;
let endType=0;
let gameMode=0;

function setArea(){
    let row = $("#rowP").val();
    let col = $("#colP").val();
    $(area).empty();
    p=[];
    for(i=0;i<Number(row);i++){p[i]=[];for(j=0;j<Number(col);j++)p[i][j]=0;}
    for(i=0;i<Number(row);i++)$("#area").append(`<div class="row"></div>`);
    $(".row").each(function(index){
        for(j=0;j<Number(col);j++){
            $(this).append(`<div class="col row${index} col${j}"></div>`);
            $(`.row${index}` + `.col${j}`).css("background-color",(p[index][j])?"black":"white");
        }
    })
    console.log(Number(row),Number(col));
}

let code;
let preAr = [[-1],[-1]];
let nowAr = [[0],[0]];

function startGame(){
    code = setInterval(function(){
        // console.log($("#endType").val());
        console.log(p);
        let nextP=[];
        nowAr[0].length=0;
        nowAr[1].length=0;
        for(i=0;i<p.length;i++){
            nextP[i]=[];
            for(j=0;j<p[i].length;j++){
                if(endType===1){
                    if(i*j===0||i===p.length-1||j===p[i].length-1){
                        nextP[i][j]=p[i][j];
                        continue;
                    }
                }
                let psum=0;
                let psum2=0;
                let fl=0;
                for(let k=8;k--;){
                    if(endType===0){
                        psum+=p[mod((i+dx[k]),p.length)][mod((j+dy[k]),p[i].length)];
                    }
                    else{
                        psum+=p[i+dx[k]][j+dy[k]];
                    }
                }
                if(gameMode===1&&i>1&&j>1&&i<p.length-2&&j<p[i].length-2){
                    for(let k=16;k--;){
                        if(endType===0){
                            psum2+=p[mod((i+dx2[k]),p.length)][mod((j+dy2[k]),p[i].length)];
                        }
                        else{
                            psum2+=p[i+dx2[k]][j+dy2[k]];
                        }
                    }
                }
                // console.log(psum);
                if(psum===2&&psum2<4)nextP[i][j]=p[i][j];
                else if(psum===3&&psum2<4){
                    // if(gameMode===1 && endType===0 &&(p[mod(i,p.length)][mod((j+1),p[i].length)]+p[mod(i+1,p.length)][mod((j+1),p[i].length)]+p[mod(i-1,p.length)][mod((j+1),p[i].length)]===3
                    // || p[mod(i,p.length)][mod((j-1),p[i].length)]+p[mod(i+1,p.length)][mod((j-1),p[i].length)]+p[mod(i-1,p.length)][mod((j-1),p[i].length)]===3
                    // || p[mod(i+1,p.length)][mod(j,p[i].length)]+p[mod(i+1,p.length)][mod(j-1,p[i].length)]+p[mod(i+1,p.length)][mod((j+1),p[i].length)]===3
                    // || p[mod(i-1,p.length)][mod(j,p[i].length)]+p[mod(i-1,p.length)][mod(j+1,p[i].length)]+p[mod(i-1,p.length)][mod((j-1),p[i].length)]===3)){
                    //     console.log(i,j);
                    //     nextP[i][j]=0;
                    // }
                    // else if(gameMode===1 && endType===1){
                    //     if(j+1<p[i].length)if(p[i][j+1]+p[i+1][j+1]+p[i-1][j+1]===3)nextP[i][j]=0;
                    //     if(j-1>=0)if(p[i][j-1]+p[i-1][j-1]+p[i+1][j-1]===3)nextP[i][j]=0;
                    //     if(i-1>=0)if(p[i-1][j]+p[i-1][j+1]+p[i-1][j-1]===3)nextP[i][j]=0;
                    //     if(i+1<p.length)if(p[i+1][j]+p[i+1][j-1]+p[i+1][j+1]===3)nextP[i][j]=0;
                    // }
                    // else 
                    nextP[i][j]=1;
                    console.log("sp",i,j);
                    console.log("ar",JSON.parse(JSON.stringify(preAr)));
                    for(let k=0;k<preAr[0].length;k++){
                        if(preAr[0][k]==i&&preAr[1][k]==j){
                            preAr[0].splice(k,1);
                            preAr[1].splice(k,1);
                            nextP[i][j]=0;
                            break;
                        }
                    }
                }
                else {
                    if(gameMode===1 && endType===0 && psum===1 && psum<6){
                        if(p[mod(i,p.length)][mod((j+1),p[i].length)]+p[mod(i,p.length)][mod((j+2),p[i].length)]+p[mod(i-1,p.length)][mod((j+2),p[i].length)]===3){
                            console.log(i,j);
                            nextP[i][j]=1;
                            nowAr[0].push(mod(i+1,p.length));
                            nowAr[1].push(mod(j+1,p[i].length));
                        }
                        else if(p[mod(i,p.length)][mod((j-1),p[i].length)]+p[mod(i,p.length)][mod((j-2),p[i].length)]+p[mod(i+1,p.length)][mod((j-2),p[i].length)]===3){
                            console.log(i,j);
                            nextP[i][j]=1;
                            nowAr[0].push(mod(i-1,p.length));
                            nowAr[1].push(mod(j-1,p[i].length));
                        }
                        else if(p[mod(i+1,p.length)][mod(j,p[i].length)]+p[mod(i+2,p.length)][mod(j,p[i].length)]+p[mod(i+2,p.length)][mod((j+1),p[i].length)]===3){
                            console.log(i,j);
                            nextP[i][j]=1;
                            nowAr[0].push(mod(i+1,p.length));
                            nowAr[1].push(mod(j-1,p[i].length));
                        }
                        else if(p[mod(i-1,p.length)][mod(j,p[i].length)]+p[mod(i-2,p.length)][mod(j,p[i].length)]+p[mod(i-2,p.length)][mod((j-1),p[i].length)]===3){
                            console.log(i,j);
                            nextP[i][j]=1;
                            nowAr[0].push(mod(i-1,p.length));
                            nowAr[1].push(mod(j+1,p[i].length));
                        }
                        else nextP[i][j]=0;
                    }
                    else if(gameMode===1 && endType===1 && psum===1 && psum2<4){
                        if(j+2<p[i].length&&i-1>=0)if(p[i][j+1]+p[i][j+2]+p[i-1][j+2]===3){
                            console.log(i,j);
                            nextP[i][j]=1;
                            nowAr[0].push(mod(i+1,p.length));
                            nowAr[1].push(mod(j+1,p[i].length));
                            fl=1;
                        }
                        if(j-2>=0&&i+1<p.length)if(p[i][j-1]+p[i][j-2]+p[i+1][j-2]===3){
                            console.log(i,j);
                            nextP[i][j]=1;
                            nowAr[0].push(mod(i-1,p.length));
                            nowAr[1].push(mod(j-1,p[i].length));
                            fl=1;
                        }
                        if(i-2>=0&&j-1>=0)if(p[i-1][j]+p[i-2][j]+p[i-2][j-1]===3){
                            console.log(i,j);
                            nextP[i][j]=1;
                            nowAr[0].push(mod(i-1,p.length));
                            nowAr[1].push(mod(j+1,p[i].length));
                            fl=1;
                        }
                        if(i+2<p.length&&j+1<p[i].length)if(p[i+1][j]+p[i+2][j]+p[i+2][j+1]===3){
                            console.log(i,j);
                            nextP[i][j]=1;
                            nowAr[0].push(mod(i+1,p.length));
                            nowAr[1].push(mod(j-1,p[i].length));
                            fl=1;
                        }
                        if(fl===0) nextP[i][j]=0;
                    }
                    else 
                    nextP[i][j]=0;
                }
                $(`.row${i}` + `.col${j}`).css("background-color",(nextP[i][j])?"black":"white");
            }
        }
        p=nextP;
        preAr=JSON.parse(JSON.stringify(nowAr));
        // console.log(preAr);

    },10000/Number($("#speed").val()));
}

function stopGame(){
    clearInterval(code);
    console.log("stop");
}

function rand1010(){
    for(let i=(p.length-10)/2;i<(p.length-10)/2+10;i++)for(let j=(p[0].length-10)/2;j<(p[0].length-10)/2+10;j++){
        p[i][j]=Math.floor(Math.random()*2);
        $(`.row${i}` + `.col${j}`).css("background-color",(p[i][j])?"black":"white");
    }
}

$(document).ready(function(){
    setArea();
    $(document).on("click",".col",function(){
        let classV = $(this).attr("class").split(" ");
        let rowV = classV[1].replace(/[^0-9]/g, '');
        let colV = classV[2].replace(/[^0-9]/g, '');
        $(this).css("background-color",(p[Number(rowV)][Number(colV)])?"white":"black");
        p[Number(rowV)][Number(colV)]+=1;
        p[Number(rowV)][Number(colV)]%=2;
    })
    $("#propChange").on("click",function(){
        setArea();
        endType=Number($("#endType").val());
        gameMode=Number($("#gameMode").val());
    });
    $("#start").on("click",startGame);
    $("#stop").on("click",stopGame);
    $("#rand").on("click",rand1010);
});



