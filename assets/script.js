window.addEventListener("DOMContentLoaded", () => {

    const container = document.createElement('div'),
        gemPuzzle = document.createElement('div'),
        gemPuzzleButtons = document.createElement('div'),
        buttonStart = document.createElement('button'),
        buttonStop = document.createElement('button'),
        buttonSave = document.createElement('button'),
        buttonResults = document.createElement('button'),
        timeCount = document.createElement('div'),
        innerMoves = document.createElement('div'),
        moves = document.createElement('p'),
        timer = document.createElement('div'),
        field = document.createElement('div');


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
    moves.innerHTML = 'Moves:';
    moves.append(innerMoves);
    timeCount.append(moves);
    timeCount.append(timer);

    const emptyCell = {
        left: 0,
        top: 0
    };

    for (let i = 0; i <= 15; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        if (i > 0) {
            cell.innerHTML = i;
        }

        field.append(cell);

        const left = i % 4;
        const top = (i - left) / 4;

        cell.style.left = `${left * 100}px`;
        cell.style.top = `${top * 100}px`;

    }


});