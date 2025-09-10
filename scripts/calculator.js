class Calculator {
    constructor() {
        console.log("Calculator initialized succesfully");
    }

    add(num1,num2) {
        return num1 + num2;
    }

    subtract(num1, num2) {
        return num1 - num2;
    }

    multiple(num1, num2) {
        return num1 * num2;
    }

    divide(num1, num2) {
        if (num2 === 0) {
            return null;
        }

        return num1 / num2;
    }
}