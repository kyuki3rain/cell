let row = $("#rowP").val();
let col = $("#colP").val();
let i,j;
let p=[];
let dx=[0,1,1,1,0,-1,-1,-1];
let dy=[1,1,0,-1,-1,1,0,-1];

function mod(a,b){return(a*b<0)*b+a%b}

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
        }
    })
    console.log(Number(row),Number(col));
}

let code;

function startGame(){
    code = setInterval(function(){
        console.log($("#endType").val());
        let nextP=[];
        for(i=0;i<p.length;i++){
            nextP[i]=[];
            for(j=0;j<p[i].length;j++){
                if($("#endType").val()==1){
                    if(i*j===0||i===p.length-1||j===p[i].length-1){
                        nextP[i][j]=p[i][j];
                        continue;
                    }
                }
                let psum=0;
                for(let k=8;k--;){
                    if($("#endType").val()==0){
                        psum+=p[mod((i+dx[k]),p.length)][mod((j+dy[k]),p[i].length)];
                    }
                    else{
                        psum+=p[i+dx[k]][j+dy[k]];
                    }
                }
                if(psum===2)nextP[i][j]=p[i][j];
                else if(psum===3)nextP[i][j]=1;
                else nextP[i][j]=0;
                $(`.row${i}` + `.col${j}`).css("background-color",(nextP[i][j])?"black":"white");
            }
        }
        p=nextP;
        console.log(p);
    },200);
}

function stopGame(){
    clearInterval(code);
    console.log("stop");
}

$(document).ready(function () {
    setArea();
    $(document).on("click",".col",function(){
        let classV = $(this).attr("class").split(" ");
        let rowV = classV[1].replace(/[^0-9]/g, '');
        let colV = classV[2].replace(/[^0-9]/g, '');
        $(this).css("background-color",(p[Number(rowV)][Number(colV)])?"white":"black");
        p[Number(rowV)][Number(colV)]+=1;
        p[Number(rowV)][Number(colV)]%=2;
    })
    $("#propChange").on("click",setArea);
    $("#start").on("click",startGame);
    $("#stop").on("click",stopGame);
});



