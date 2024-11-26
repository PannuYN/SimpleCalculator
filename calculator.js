//for every button in the calculator
function clickBtn(btn) {
    const clickedBtn = btn; //assign the passed argument in a constant. essential
    let inputString = document.querySelector("#" + clickedBtn).value; //extract the value in the input bar
    const inputBox = document.querySelector("#inputBox"); //call input bar

    //for starting and all clear condition
    if (inputBox.value == 0 || inputBox.value == "") {
        inputBox.value = inputString; //replace the 0 with the first input value
    }
    //for the input exceeding the input box size condition
    else if (inputBox.value.length > 15) {
        const messageString = document.querySelector("#messageBox"); //call message box (the error area)
        messageString.classList.remove("d-none"); //show the error message
    }
    //for all okay condition
    else {
        inputBox.value += inputString; //append the clicked button value to the input
    }
}

function allClear() {
    //hide the error message if it is being displayed
    const messageString = document.querySelector("#messageBox"); 
    messageString.classList.add("d-none");

    //reset the input bar value to 0
    const inputBox = document.querySelector("#inputBox");
    inputBox.value = 0;
    inputBox.style.color = "black"; //change the color back to black in case the previous value is error and changed to red color
}

//for calculating the whole expression (/ fist, x second, + and - third)
function calculate() {
    try {
        //hide the error message if it is being displayed
        const messageString = document.querySelector("#messageBox");
        messageString.classList.add("d-none");

        const errorMessage = "Invalid Input"; //error message to show

        //take input value
        const inputBox = document.querySelector("#inputBox");
        const expression = inputBox.value;

        //check for invalid input
        if (expression.startsWith("+") || expression.startsWith("x") || expression.startsWith("-") || expression.startsWith("/")
            || expression.endsWith("+") || expression.endsWith("-") || expression.endsWith("*") || expression.endsWith("/")
            || expression.includes("/0")) {
            inputBox.style.color = "red"; //change red
            throw errorMessage; //throw the message to show
        }

        //split the string with operators and add all of them in an array (that also includes separators(operators) because filter(Boolean) is used)
        const splittedExpression = expression.split(/([\+\-x\/])/).filter(Boolean);

        let simpleExpression = ""; //initialize a varaible to assign the first sub-expression to solve into it

        //function to check the operator, create a sub-expression with that operator and solve it
        let checkOperator = function (operator) {
            while (splittedExpression.includes(operator)) { //as long as that operator includes in the splitted array
                const operatorIndex = splittedExpression.indexOf(operator); //take the index of that operator

                //create a sub-string which includes that operator and the two numbers beside it
                simpleExpression = splittedExpression[operatorIndex - 1] + splittedExpression[operatorIndex] + splittedExpression[operatorIndex + 1];
                
                const subSolution = simpleCalculate(simpleExpression); //pass that sub-string to the simpleCalculate function to solve
                splittedExpression.splice(operatorIndex - 1, 3); //remove the components of sub-expression from the array
                splittedExpression.splice(operatorIndex - 1, 0, subSolution); //add solution got from the simpleCalculate function in their place without affecting(removing) any other items
            }
        }

        //call the function for all operators
        checkOperator("/");
        checkOperator("x");
        checkOperator("+");
        checkOperator("-");

        //join the array and assign it into the input value to show it in the input bar
        inputBox.value = splittedExpression.join("");
    } catch (e) {
        inputBox.value = e; //showing the error message caught in the input bar
    }
}

//for calculation the simplest sub-expression (which is operator two numbers beside it)
function simpleCalculate(simpleExpression) {
    const expression = simpleExpression; //assign the argument into a constant. essential
    const numbers = expression.split(/[\+\-x\/]/); //split the constant string into array with operators as separators. (operators will not include in the array)
    
    //assign first number, second number and operator
    const firstNo = numbers[0];
    const secondNo = numbers[1];
    const operator = expression[firstNo.length]; //the operator will be after first number (important since there can be floats too)

    let result = 0.0; //initialize to assign result

    switch (operator) {
        case "+":
            result = parseFloat(firstNo) + parseFloat(secondNo);
            break;
        case "-":
            result = parseFloat(firstNo) - parseFloat(secondNo);
            break;
        case "x":
            result = parseFloat(firstNo) * parseFloat(secondNo);
            break;
        case "/":
            result = parseFloat(firstNo) / parseFloat(secondNo);
            break;
    }
    return result.toFixed(3); //round up to three decimals
}