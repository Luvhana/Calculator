let num1 = "";
let num2 = "";
let operator = "";
let isSecondNumber = false;
let justCalculated = false;

const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

display.textContent = "0";

function handleInput(value){
    if(value === "AC"){
        num1 = "";
        num2 = "";
        operator = "";
        isSecondNumber = false;
        justCalculated = false;
        display.textContent = "0";
        return;
    }
     // 🔙 BACKSPACE
     if (value === "←") {
        if (isSecondNumber) {
            num2 = num2.slice(0, -1);
            display.textContent = num2 || "0";
        } else {
            num1 = num1.slice(0, -1);
            display.textContent = num1 || "0";
        }
        return;
    }
     // 🔢 NUMBERS + DECIMAL
    else if (!isNaN(value) || value === ".") {
        if(justCalculated){
            num1 ="";
            num2 ="";
            operator = "";
            isSecondNumber = false;
            justCalculated = false;
        }

        if (isSecondNumber) {
            if (value === "." && num2.includes(".")) return;
            num2 += value;
            display.textContent = num2;
        } else {
            if (value === "." && num1.includes(".")) return;
            num1 += value;
            display.textContent = num1;
        }
    }
     // ➕ OPERATORS (FIXED CHAINING)
    else if (["+", "-", "×", "÷"].includes(value)) {
        justCalculated = false;
        if (num1 === "") return;

        if (num2 !== "") {
            const result = operate(num1, num2, operator);
            if (result === "Error") {
                display.textContent = "Error";
                num1 = "";
                num2 = "";
                operator = "";
                isSecondNumber = false;
                return;
            }
            num1 = result.toString();
            num2 = "";
        }

        operator = value;
        isSecondNumber = true;

        display.textContent = num1; // ✅ keep showing result
    }
    // 🟰 EQUALS
    else if (value === "=") {

        if (num1 === "" || num2 === "" || operator === "") return;

        const result = operate(num1, num2, operator);

        display.textContent = result;

        num1 = result.toString();
        num2 = "";
        operator = "";
        isSecondNumber = false;
        justCalculated = true;
    }

}


buttons.forEach(button => {
    button.addEventListener("click", () => {
        handleInput(button.textContent);
    });
});

function getMappedValue(key){
    if(key==="Enter") return "=";
    if(key === "Backspace") return "←";
    if(key === "*") return "×";
    if(key === "/") return "÷";

    return key;
}

document.addEventListener("keydown",(e)=>{
    const allowedKyes = "0123456789.+-*/";
    if(!allowedKyes.includes(e.key) && e.key!== "Enter" && e.key!== "Backspace"){
        return;
    }
    e.preventDefault();
    const value = getMappedValue(e.key);
    handleInput(value);
})

function operate(num1, num2, operator) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    if (operator === "+") return num1 + num2;
    if (operator === "-") return num1 - num2;
    if (operator === "×") return num1 * num2;
    if (operator === "÷") {
        if (num2 === 0) return "Error";
        return num1 / num2;
    }

    return "Error";
}