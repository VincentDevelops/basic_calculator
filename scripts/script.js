const EXPRESSION_SCREEN = document.querySelector('.expression-screen');
const PREVIEW_SCREEN    = document.querySelector('.preview-screen');
const MAXIMUM_PREVIEW_LENGTH = 13;
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
        if (button.classList.contains('number')) {
            initNumberButton(button);
        } else {
            // initFunctionButton
        }
    })
})

function initNumberButton(button) {
    if (button.classList.contains('number')) {
        if (expression.isEmpty()) {
            num1 = num1 + button.textContent;
            displayToScreen(PREVIEW_SCREEN, num1);
        } else {
            clearScreen(PREVIEW_SCREEN)




            num2 = num2 + button.textContent;
            displayToScreen(PREVIEW_SCREEN, num1);
        }
    }
}


// function initNumberButton(button) {   
//     if (num1.length === MAXIMUM_PREVIEW_LENGTH) return;

//     num1 = num1 + button.textContent;
//     displayToScreen(PREVIEW_SCREEN, num1);
// }

function displayToScreen(screenType, value) {
    screenType.textContent = value;
}

function clearScreen(screenType) {
    displayToScreen(screenType, '');
}