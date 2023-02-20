const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const gameBoard = document.querySelector('.game-board');
const score = document.querySelector('.score');
const overlay = document.querySelector('.overlay');
const reset = document.querySelector('.reset');
const overlayScore = document.querySelector('.overlay-score');
const startGameInfo = document.querySelector('.start-game');
const win = document.querySelector('.win');

let countScore = 0;
let startGame = true;
let timerVerifyDead;
let timerScore;
let timerSpeed;

startGameInfo.innerHTML =
    'Pressione qualquer tecla para iniciar <br/> O tempo é contabilizado a cada segundo';

/** restart game*/
reset.addEventListener('click', () => window.location.reload());

window.addEventListener('keypress', () => {

    pipe.classList.add('pipe');
    mario.classList.add('jump');


    setTimeout(() => mario.classList.remove('jump'), 500);

    if (startGame) {
        let pipeSpeed = 1.5;
        startGameInfo.innerHTML = '';
        startGameInfo.style.background = 'transparent';
        timerScore = setInterval(() => {
            countScore++;
            score.innerHTML = `SCORE ${countScore}`;
        }, 1000);

        timerSpeed = setInterval(() => {
            pipeSpeed -= 0.1;
            if (pipeSpeed <= 0) {
                pipeSpeed = 0.6;
            }
            console.log({ pipeSpeed });
            pipe.style.animationDelay = `pipe-animate ${pipeSpeed}s infinite linear`;
        }, 1000 * 10);
    }

    if (countScore > 2) {
        winner();
        clearInterval(winner)
        winnerTwo();
        winnerTree();
        
    }


    startGame = false;

    timerVerifyDead = setInterval(() => {
        loop();
    }, 10);
});

const winnerTwo = () => {
    setTimeout(() => {
        mario.style.width = '100%';
        mario.style.width = '100%';
        mario.src = '/src/assets/princ.gif';

    }, 13000);
}
const winnerTree = () => {
    setTimeout(() => {
        mario.style.width = '100%';
        mario.style.width = '100%';
        mario.src = '/src/assets/win2.gif';

    }, 18000);
}

const winner = () => {

    const pipePosition = pipe.offsetLeft; /** pega o valor de toda posicao*/
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', ''); /** pega o valor do style, e convert para string com sinal ' + '*/

    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = 'none';
    mario.style.bottom = `${marioPosition}px`;
    pipe.style.width = '0%';

    setTimeout(() => {
        mario.src = '/src/assets/win1.gif';
        mario.style.width = '100%';
        mario.style.width = '100%';

    });


    clearInterval(loop);
    clearInterval(timerScore);
    clearInterval(timerVerifyDead);
}
/** start game*/




/** logica do jump*/
const jump = () => {
    mario.classList.add('jump');


    setTimeout(() => {
        mario.classList.remove('jump');

    }, 500);
}

document.addEventListener('keydown', jump);

/** logica do tubo game over*/

const loop = () => {

    const pipePosition = pipe.offsetLeft; /** pega o valor de toda posicao*/
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', ''); /** pega o valor do style, e convert para string com sinal ' + '*/

    console.log(marioPosition)
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 90) {

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './src/assets/game-over.png';
        mario.style.marginLeft = '50px';
        mario.style.bottom = `-200px`;
        mario.style.width = '80px';
        mario.classList.add('dead');

        overlayScore.innerHTML = `SCORE ${countScore}`;
        overlay.style.display = 'flex';
        /** stop loop*/

        clearInterval(loop);
        clearInterval(timerScore);
        clearInterval(timerVerifyDead);
    }

}
