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
var calculator = new Calculator();

var clearHit = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('number')) {
            initNumberButton(button);
        } else if (button.classList.contains('operator')) {
            initFunctionButton(button);
        } 
    })
})

function initNumberButton(button) {
    if (PREVIEW_SCREEN.textContent.length >= 13) return;

    if (expression.isEmpty() === false) {
        expression.enqueue(PREVIEW_SCREEN.textContent);
        pushPreviewToExpression();
        clearScreen(PREVIEW_SCREEN);
    }

    PREVIEW_SCREEN.textContent = PREVIEW_SCREEN.textContent + button.textContent;
}

function initFunctionButton(button) {
    if (expression.isEmpty()) return;
    
    let operator = button.textContent;
    
    switch (operator) {
        case '/':
            state = States.DIVIDE;
            break;
        case 'x':
            state = States.MULTIPLY;
            break;
        case '-':
            state = States.SUBTRACT;
            break;
        case '+':
            state = States.ADD;
            break;
    }



}







// Display

function displayToScreen(screenType, value) {
    screenType.textContent = value;
}

function clearScreen(screenType) {
    displayToScreen(screenType, '');
}

function consoleState() {
    console.log(state);
}

function pushPreviewToExpression() {
    if (expression.isEmpty() === true) return;

    EXPRESSION_SCREEN.textContent = expression.print();
}