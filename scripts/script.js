const EXPRESSION_SCREEN = document.querySelector('.expression-screen');
const PREVIEW_SCREEN    = document.querySelector('.preview-screen');
const CLEAR_SCREEN      = document.querySelector('.clear');
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
    }
    clearScreen(PREVIEW_SCREEN);
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
    let value = PREVIEW_SCREEN.textContent + button.textContent;
    if (isNaN(value)) {
        console.log("NOT A NUMBER");
        clearScreen(PREVIEW_SCREEN);
        value = button.textContent;
    }


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
        let result = calculator.calculate(parseFloat(num1), parseFloat(num2), state);
        console.log(result);
        num1 = result;
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