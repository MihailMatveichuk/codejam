'use strict'

window.addEventListener("DOMContentLoaded", () => {

    const container = document.createElement('div'),
        gemPuzzle = document.createElement('div'),
        gemPuzzleButtons = document.createElement('div'),
        buttonStart = document.createElement('button'),
        buttonStop = document.createElement('button'),
        buttonSave = document.createElement('button'),
        buttonResults = document.createElement('button'),
        timeCount = document.createElement('div'),
        innerMoves = document.createElement('span'),
        moves = document.createElement('span'),
        timeShow = document.createElement('span'),
        field = document.createElement('div');

        let count = 0;
        let min = 0;
        let sec = 0;
        const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/387");
        
  
    document.body.insertAdjacentElement('beforeend', container);
    container.className = "container";
    container.append(gemPuzzle);
    buttonStart.className = "button";
    buttonStart.innerHTML = "Shuffle and start";
    buttonStop.className = 'button';
    buttonStop.classList.add('stop');
    buttonStop.innerHTML = 'Stop';
    buttonSave.className = "button";
    buttonSave.innerHTML = "Save";
    buttonResults.className = 'button';
    buttonResults.innerHTML = 'Results';
    gemPuzzleButtons.append(buttonStart);
    gemPuzzleButtons.append(buttonStop);
    gemPuzzleButtons.append(buttonSave);
    gemPuzzleButtons.append(buttonResults);
    gemPuzzleButtons.className = 'gem_puzzle-buttons';
    gemPuzzle.append(gemPuzzleButtons);
    gemPuzzle.append(timeCount);
    gemPuzzle.append(field);
    gemPuzzle.className = "gem_puzzle";
    field.className = "field";
    moves.className = "moves";
    moves.innerHTML = `Moves:`;
    moves.append(innerMoves);
    timeShow.className = 'time_show';
    timeCount.className = "time_count";
    timeCount.append(moves);

    let myInterval;
    function init() {
        sec = 0;
       myInterval = setInterval(tick, 1000);
    }

    function tick() {
        sec++;
        if (sec >= 60) { 
            min++;
            sec = sec - 60;
        }
        if (sec < 10) { 
            if (min < 10) {
                timeShow.innerHTML = `Timer: 0${min}:0${sec}`;
            } else {
                timeShow.innerHTML = `Timer: ${min}:0${sec}`;
            }
        } else {
                if (min < 10) {
                    timeShow.innerHTML = `Timer: 0${min}:${sec}`;
            } else {
                timeShow.innerHTML = `Timer: ${min}:${sec}`;
                }
            }
        }
        timeCount.append(timeShow);



    const emptyCell = {
        value : 0,
        left: 0,
        top: 0
    };
    
    const cells = [];
    cells.push(emptyCell);

    function move(index){
        const cell = cells[index];
        const diffLeft = Math.abs(emptyCell.left - cell.left);
        const diffTop = Math.abs(emptyCell.top - cell.top);

        if(diffLeft + diffTop > 1){
            return;
        }
        cell.element.style.left = `${emptyCell.left * 100}px`;
        cell.element.style.top = `${emptyCell.top * 100}px`;

        const emptyCellLeft = emptyCell.left;
        const emptyCellTop = emptyCell.top;
        emptyCell.left = cell.left;
        emptyCell.top = cell.top;
        cell.left = emptyCellLeft;
        cell.top = emptyCellTop;

        const isVictory = cells.every(cell=>{
            return cell.value === cell.top * 4 + cell.left;
        });

        if(isVictory){
            if (sec < 10) { 
                if (min < 10) {
                    alert(`Hooray! You solved the puzzle in 0${min}:0${sec} and N moves!`);
                } else {
                    alert(`Hooray! You solved the puzzle in ${min}:0${sec} and N moves!`);
                }
            } else {
                    if (min < 10) {
                        alert(`Hooray! You solved the puzzle in 0${min}:${sec} and N moves!`);
                } else {
                    alert(`Hooray! You solved the puzzle in ${min}:${sec} and N moves!`);
                    }
                }
                clearInterval(myInterval);
            }
            
        }


    let digits = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].sort(()=> Math.random() - 0.5);
    
    for (let i = 1; i <= 15; i++) {
        let value = digits[i - 1];
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.innerHTML = value;
        

        const left = i % 4;
        const top = (i - left) / 4;

        cells.push({
            value: value,
            left: left,
            top: top,
            element: cell
        });

        cell.style.left = `${left * 100}px`;
        cell.style.top = `${top * 100}px`;


        field.append(cell);

        cell.addEventListener('click', () => {
            move(i);
            audio.play();
        });
        
        // window.addEventListener('resize',()=>{
        //     if(window.innerWidth < 400){
        //         cell.style.left = `${left * 90}px`;
        //         cell.style.top = `${top * 90}px`;

        //     }
        //     else{
        //         cell.style.left = `${left * 100}px`;
        //         cell.style.top = `${top * 100}px`;
        //     }

        // });
        // if(window.innerWidth < 400){
        //     cell.style.left = `${left * 90}px`;
        //     cell.style.top = `${top * 90}px`;
            
        // }
        // else{
        //     cell.style.left = `${left * 100}px`;
        //     cell.style.top = `${top * 100}px`;
        // }

    }
    
      
    innerMoves.className = "inner_moves";
    innerMoves.append(count);
    

    init();
});