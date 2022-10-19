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
        moves = document.createElement('span'),
        timeShow = document.createElement('span'),
        numberOfSize = document.createElement("p"),
        otherSizes = document.createElement('div'),
        link1 = document.createElement('a'),
        link2 = document.createElement('a'),
        link3 = document.createElement('a'),
        link4 = document.createElement('a'),
        link5 = document.createElement('a'),
        link6 = document.createElement('a'),
        linkOfSound = document.createElement('div'),
        field = document.createElement('div');




    let count = 0;
    let min = 0;
    let sec = 0;
    const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/387");
    let emptyCell;
    let cells;
    let myInterval;


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
    gemPuzzle.append(numberOfSize);
    gemPuzzle.append(otherSizes);
    gemPuzzle.className = "gem_puzzle";
    field.className = "field";
    moves.className = "moves";
    moves.innerHTML = `Moves: ${count}`;

    buttonStart.addEventListener("click", () => {
        field.innerHTML = '';
        clearInterval(myInterval);
        myInterval = null;
        timeShow.innerHTML = 'Timer: 00:00';
        updateField();
        count = 0;
        updateDisplay(count);

    });


    function updateDisplay(val) {
        moves.innerHTML = `Moves: ${val}`;
    }


    timeShow.className = 'time_show';
    timeShow.innerHTML = "Timer: 00:00";
    timeCount.className = "time_count";
    timeCount.append(moves);
    numberOfSize.className = "size";
    numberOfSize.innerHTML = `Frame size: 4x4`;
    link1.setAttribute('href', 'size');
    link1.innerHTML = '3x3';
    link2.setAttribute('href', 'size');
    link2.innerHTML = '4x4';
    link3.setAttribute('href', 'size');
    link3.innerHTML = '5x5';
    link4.setAttribute('href', 'size');
    link4.innerHTML = '6x6';
    link5.setAttribute('href', 'size');
    link5.innerHTML = '7x7';
    link6.setAttribute('href', 'size');
    link6.innerHTML = '8x8';
    otherSizes.innerHTML = `Other sizes:`;
    otherSizes.className = 'other-sizes';
    otherSizes.append(link1);
    otherSizes.append(link2);
    otherSizes.append(link3);
    otherSizes.append(link4);
    otherSizes.append(link5);
    otherSizes.append(link6);




    function init() {
        myInterval = setInterval(tick, 1000);
        sec = 0;
        min = 0;
    }

    function tick() {
        console.log('tick');
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

    function move(index) {
        if(!myInterval){
            init();
            console.log('yes');
        }
        const cell = cells[index];
        const diffLeft = Math.abs(emptyCell.left - cell.left);
        const diffTop = Math.abs(emptyCell.top - cell.top);

        if (diffLeft + diffTop > 1) {
            return;
        }

        updateDisplay(++count);


        cell.element.style.left = `${emptyCell.left * 79}px`;
        cell.element.style.top = `${emptyCell.top * 79}px`;

        const emptyCellLeft = emptyCell.left;
        const emptyCellTop = emptyCell.top;
        emptyCell.left = cell.left;
        emptyCell.top = cell.top;
        cell.left = emptyCellLeft;
        cell.top = emptyCellTop;

        const isVictory = cells.every(cell => {
            return cell.value === cell.top * 4 + cell.left;
        });

        if (isVictory) {
            if (sec < 10) {
                if (min < 10) {
                    alert(`Hooray! You solved the puzzle in 0${min}:0${sec} and ${count} moves!`);
                } else {
                    alert(`Hooray! You solved the puzzle in ${min}:0${sec} and ${count} moves!`);
                }
            } else {
                if (min < 10) {
                    alert(`Hooray! You solved the puzzle in 0${min}:${sec} and ${count} moves!`);
                } else {
                    alert(`Hooray! You solved the puzzle in ${min}:${sec} and ${count} moves!`);
                }
            }
            clearInterval(myInterval);
        }

    }

    function updateField(){
        emptyCell = {
            value: 0,
            left: 0,
            top: 0
        };
    
        cells = [];
        cells.push(emptyCell);
        let digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].sort(() => Math.random() - 0.5);

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
    
            cell.style.left = `${left * 79}px`;
            cell.style.top = `${top * 79}px`;
    
    
            field.append(cell);
    
            cell.addEventListener('click', () => {
                move(i);
                audio.play();
            });
    
        }  
    }
    updateField();
    
    // init();
});