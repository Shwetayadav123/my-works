let userscore = 0;
let comscore = 0;
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#result-text");
let userpara = document.querySelector("#user-score");
let computerpara = document.querySelector("#comp-score");

const comgenerate = () => {
    const option = ["rock", "papper", "scissors"];
    const randomvalue = Math.floor(Math.random() * 3);
    return option[randomvalue];
}


const drawgame = () => {
    console.log("game draw");
    msg.innerText = "game draw"
    msg.classList.add("draw");
    msg.classList.remove("win");
    msg.classList.remove("loss")


}

const showwinner = (userwin,comchoice,userchoice) => {
    if (userwin) {
        userscore++;
        userpara.innerText= userscore;
        console.log("you win");
        msg.innerText = "you win!"
        msg.classList.add("win");
        msg.classList.remove("loss")
        msg.classList.remove("draw")

    }
    else {
        comscore++;
        computerpara.innerText=comscore;
        console.log("computer win");
        msg.innerText = "computer win!";
        msg.classList.add("loss");
        msg.classList.remove("draw");
        msg.classList.remove("win");

    }
}

const playgame = (userchoice) => {
    console.log("user choice", userchoice);
    const comchoice = comgenerate();
    console.log("computer choice", comchoice);

    if (userchoice === comchoice) {
        drawgame()
    }
    else {
        let userwin = true;
        if (userchoice === "rock") {
            userwin = comchoice === "paper" ? false : true
        }
        else if (userchoice === "paper") {
            userwin = comchoice === "scissors" ? false : true


        }
        else {
            userwin = comchoice === "rock" ? false : true
        }
        showwinner(userwin)
    }

}


choices.forEach((choice) => {
    console.log(choice);


    choice.addEventListener("click", () => {
        const choiceid = choice.getAttribute("id")
        console.log("choice id", choiceid);
        playgame(choiceid)
    })
})