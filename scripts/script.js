const EXPRESSION_SCREEN = document.querySelector('.expression-screen');
const PREVIEW_SCREEN    = document.querySelector('.preview-screen');
const CLEAR_SCREEN      = document.querySelector('.clear');
const CALCULATE         = document.querySelector('.calculate');
const MAXIMUM_PREVIEW_LENGTH = 13;
const States = {
    IDLE:       0,
    DIVIDE:     1,
    MULTIPLY:   2,
    SUBTRACT:   3,
    ADD:        4,
    COMPUTE:   5,
}
var state = States.IDLE;

var buttons = document.querySelectorAll('.button');
var expression = new Queue();
var calculator = new Calculator();

var num1 = '';
var num2 = '';
var clearHit = false;

CLEAR_SCREEN.addEventListener('click', () => {
    if (clearHit === false) {
        clearHit = true;
    } else {
        console.log("full clear");
        expression.clear();
        clearHit = false;
        num1 = '';
        num2 = '';
        clearScreen(EXPRESSION_SCREEN);
        state = States.IDLE;
    }
    clearScreen(PREVIEW_SCREEN);
})

CALCULATE.addEventListener('click', () => {

    if (state === States.DIVIDE && parseFloat(num2) === 0) {
        console.log('Error: dividing by 0')
        displayToScreen(PREVIEW_SCREEN, 'ERROR');
        num2 = '';
    }

    if (num1.length > 0 && num2.length > 0 && state !== States.IDLE) {
        console.log("we in calculate");
        let result = calculator.calculate(parseFloat(num1), parseFloat(num2), state);
        num1 = String(result);
        num2 = '';
        displayToScreen(EXPRESSION_SCREEN, result);
        displayToScreen(PREVIEW_SCREEN, result);
        state = States.IDLE;
        
    }
})

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('number')) {
            initNumberButton(button);
        } else if (button.classList.contains('operator')) {
            initOperatorButton(button);
        } 
    })
})

// Number button functionality ==========================
function initNumberButton(button) {
    if (button.textContent === '.' && PREVIEW_SCREEN.textContent.includes('.')) {
        return; // Do nothing, prevents multiple decimals
    }

    // clearing operators
    if (isNaN(parseFloat(PREVIEW_SCREEN.textContent)) && PREVIEW_SCREEN.textContent != '.'){
        clearScreen(PREVIEW_SCREEN);
    }

    if (PREVIEW_SCREEN.textContent.length >= MAXIMUM_PREVIEW_LENGTH) return;

    clearHit = false;

    let value = PREVIEW_SCREEN.textContent + button.textContent;

    console.log('state: ' + state);

    if (state === States.IDLE) {
        num1 = value;
    } else {
        num2 = value;
    }

    displayToScreen(PREVIEW_SCREEN, value);

    console.log("num1: " + num1);
    console.log("num2: " + num2);
}

// Operator button functionality =========================
function initOperatorButton(button) {
    if (num1.length === 0) {
        num1 = '0';
    }

    if (num1.length > 0 && num2.length > 0 && state !== States.IDLE) {

    if (state === States.DIVIDE && parseFloat(num2) === 0) {
        console.log('dividing by 0')
        displayToScreen(PREVIEW_SCREEN, 'ERROR');
        num2 = '';
        return;
    }

        console.log("we in here");
        let result = calculator.calculate(parseFloat(num1), parseFloat(num2), state);
        num1 = String(result);
        num2 = '';
    }

    let operator = button.textContent;
    displayToScreen(EXPRESSION_SCREEN, num1);
    setState(operator);
    EXPRESSION_SCREEN.textContent = `${num1} ${operator}`;
    clearScreen(PREVIEW_SCREEN);
}

function setState(operator) {
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
    
    console.log("state: " + state);
}

// Screens functionality ===========================

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

// 