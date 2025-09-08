const EXPRESSION_SCREEN = document.querySelector('.expression-screen');
const PREVIEW_SCREEN    = document.querySelector('.preview-screen');

const States = {
    IDLE:       0,
    DIVIDE:     1,
    MULTIPLY:   2,
    SUBTRACT:   3,
    ADD:        4,
    COMPUTER:   5,
}
var state = States.IDLE;

var buttons = document.querySelectorAll('.button');
var expression = new Queue();


var num1 = '';
var num2 = '';
var num3 = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        initNumberButton(button);
    })
})

function initNumberButton(button) {   
    if (state == States.IDLE) {
        if (num1.length === 13) return;

        num1 = num1 + button.textContent
        displayToScreen(PREVIEW_SCREEN, num1)
    } else {
        // 
    }  
}

function displayToScreen(screenType, value) {
    screenType.textContent = value;
}

function clearScreen(screenType) {
    displayToScreen(screenType, '');
}