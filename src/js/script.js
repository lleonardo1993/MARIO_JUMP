const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const gameBoard = document.querySelector('.game-board');


/** logica do jump*/
const jump = () => {
    mario.classList.add('jump');


    setTimeout(() => {
        mario.classList.remove('jump');

    }, 500);
}

document.addEventListener('keydown', jump);

/** logica do tubo game over*/

const loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft; /** pega o valor de toda posicao*/
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', ''); /** pega o valor do style, e convert para string com sinal ' + '*/

    console.log(marioPosition)
    if(pipePosition <= 120 && pipePosition > 0 && marioPosition < 90){

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './src/assets/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';
        
        gameBoard.style.background = 'red' ;
        clearInterval(loop); /** stop loop*/

    }

}, 10)
