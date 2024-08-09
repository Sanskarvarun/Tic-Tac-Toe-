let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// player x and player o
let turnO = true;
let count = 0; // to track the draw

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            if (turnO) {
                // player O turn
                box.innerText = "O";
            } else {
                // player X turn
                box.innerText = "X";
            }
            turnO = !turnO;
            count++;

            let isWinner = checkWinner();
            if (count === 9 && !isWinner) {
                gameDraw();
            }
        }
    });
});

const gameDraw = () => {
    msg.innerText = "Game was a Draw";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const disableBoxes = () => {
    boxes.forEach(box => {
        box.classList.add('disabled');
    });
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.classList.remove('disabled');
        box.innerText = "";
    });
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos1val === pos2val && pos2val === pos3val) {
            showWinner(pos1val);
            return true;
        }
    }
    return false; // Ensure a false value is returned if no winner
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
