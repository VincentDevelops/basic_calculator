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

    calculate(num1, num2, operator) {
        switch (operator) {
            case 1:
                return this.divide(num1, num2);
            case 2:
                return this.multiple(num1, num2);
            case 3:
                return this.subtract(num1, num2);
            case 4:
                return this.add(num1, num2);
        }
    }

}