const keys = document.querySelectorAll(".key");
const display_input = document.querySelector(".display .input");
const display_output = document.querySelector(".display .output");

let input = "";

Array.from(keys).forEach((key)=>{

    const value = key.dataset.key;

    key.addEventListener('click',()=>{

        if (value == 'clear'){
            input = "";
            display_input.innerHTML = "";
            display_output.innerHTML = "";

        } else if (value == "backspace"){
            input = input.slice(0, -1);
            display_input.innerHTML = cleanInput(input);

        } else if (value == "="){
            let result = eval(prepareInput(input));
            display_output.innerHTML = result;
        }else if (value == "brackets"){

            if((input.indexOf('(') == -1) || (input.indexOf('(') != -1 && input.indexOf(')') != -1 && input.lastIndexOf(')') > input.lastIndexOf('('))){
                input += '('

            }else if ((input.indexOf('(') != -1 && input.indexOf(')') == -1) || (input.indexOf('(') != -1 && input.indexOf(')') != -1 && input.lastIndexOf('(') > input.lastIndexOf(')'))){
                input += ')'    
            }
            display_input.innerHTML = cleanInput(input);

        }else {
            if(validate(value)){

                input += value;
                display_input.innerHTML = cleanInput(input);
            }

        }
    })
})

const cleanInput = (input) => {

    const inputArray = Array.from(input);
    inputArray.forEach( (e, index) => {

        if (e == '*'){
            inputArray[index] = `<span class="operator">x</span>`;
        }else if (e == '/'){
            inputArray[index] = `<span class="operator">÷</span>`;
        }else if (e == '+'){
            inputArray[index] = `<span class="operator">+</span>`;
        }else if (e == '-'){
            inputArray[index] = `<span class="operator">-</span>`;
        }else if (e == '('){
            inputArray[index] = `<span class="brackets">(</span>`;
        }else if (e == ')'){
            inputArray[index] = `<span class="brackets">)</span>`;
        }else if (e == '%'){
            inputArray[index] = `<span class="percent">%</span>`;
        }

    });
    return (inputArray.join(''));
};

const validate = (value) => {

    let last_input = input.slice(-1);
    let operators = ["+", '-', "/", "*",'.'];

    if (operators.includes(value)){
        if (operators.includes(last_input)){
            return false;
        }else{
            return true;
        };
    }

    return true;
}

const prepareInput = (input) => {

    const inputArray = Array.from(input);
    inputArray.forEach( (e, index) => {

        if (e == "%"){
            inputArray[index] = "/100"
        };
      });
    return (inputArray.join(''));
}