let board = document.querySelectorAll(".cell");
let winningpatter =[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let player0 =true


let disablebox=()=>{
    for(let box of board){
    box.disabled=true;
}}
let enablebox=()=>{
    for(let box of board){
        box.disabled=false;
    }
}

let reset =() =>{
   for(let box of board){
 box.disabled=false;
  box.innerText=""
   }
   
  player0 = true;
  let statusText = document.querySelector("#statusText");
  statusText.textContent = "";
  statusText.classList.add("hide");


}
document.querySelector("#restartBtn").addEventListener("click", reset);
const gamewinner = () => {
    // console.log("called");
    
for(let player of winningpatter){
let psval1=board[player[0]].innerText;
let psval2=board[player[1]].innerText;
let psval3=board[player[2]].innerText;
console.log(psval1);

let show = (winner) => {
  let statusText = document.querySelector("#statusText");
  statusText.textContent = `winner is ${winner}`;
  statusText.classList.remove("hide");
  statusText.classList.add("show");
}
if(psval1 != "" && psval2 != "" && psval3 != "" ){
    if(psval1===psval2 && psval2 === psval3){
        console.log("winner",psval1);
        disablebox();
        show(psval1);
        
    }
}
}
 }
board.forEach((box) => {
    box.addEventListener("click",()=>{
        
        
    if(player0){
        box.innerText="0"
        player0 =false;
    }
    else{
         box.innerText="X "
         player0 =true;
    }
     box.disabled=true;
    gamewinner();
    })
   
});


