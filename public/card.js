
const board = document.getElementById("board"); //boards duudaj bn 
const middle = document.getElementById("middle");
const boardInProgress = document.getElementById("board-in-progress");
const boardStuck = document.getElementById("board-stuck");
const boardDone = document.getElementById("board-done");
const card = document.createElement("div"); //card create hiij bga 

boardInProgress.appendChild(card);
boardStuck.appendChild(card);
boardDone.appendChild(card);
const correct = document.getElementById("fa-circle-check"); //correct temdeg oruulahin tuld class neej bn 

card.appendChild(correct); //cardiinha hvvhed bolgoj bn

const details = document.createElement("div");
card.appendChild(details); //huuhed n bolgson odoo  dotroh elmentvvdiig 

const h4 = document.createElement("h4");
const p = document.createElement("p");
const levelBtn = document.createElement("button");
h4.innerText = "Todo";
p.innerText = "This is a todo card";

details.appendChild(h4);
details.appendChild(p);
details.appendChild(levelBtn);
const actions = document.createElement("div");

const xmark = document.getElementById("fa-circle-xmark");
const pen = document.getElementById("fa-pen-to-square");
actions.appendChild(xmark);
actions.appendChild(pen);
middle.appendChild(card);

const removeBtn = document.getElementById("fa-circle-xmark");
const task = document.querySelectorAll(".middle-remove")
removeBtn.forEach(removeBtn => {
    removeBtn.onclick = () => {
        task.remove()
    }
})

