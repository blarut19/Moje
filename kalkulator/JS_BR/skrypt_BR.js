let operators = ['+', '-', '/', '*']
let all_operators = ['%', '**']

let history = []

function start(){
    document.getElementById("calculator_section").style.display = "initial";
    document.getElementById("operator_manipulation_section").style.display = "none";
    document.getElementById("memory_section").style.display = "none";
    document.getElementById("history").innerHTML = history;
    used_operators();
    unused_operators();
    let op1 = document.getElementById("used_operators");
    document.getElementById("c_op").innerHTML = op1.options[op1.selectedIndex].value;
}
function show_calculator(){
    document.getElementById("calculator_section").style.display = "initial";
    document.getElementById("operator_manipulation_section").style.display = "none";
    document.getElementById("memory_section").style.display = "none";
}
function show_operators(){
    document.getElementById("calculator_section").style.display = "none";
    document.getElementById("operator_manipulation_section").style.display = "initial";
    document.getElementById("memory_section").style.display = "none";
}
function show_history(){
    document.getElementById("calculator_section").style.display = "none";
    document.getElementById("operator_manipulation_section").style.display = "none";
    document.getElementById("memory_section").style.display = "initial";
    document.getElementById("history").innerHTML = history.join('');
}
function calculate(){
    let n1 = document.getElementById("n1").value;
    let n2 = document.getElementById("n2").value;
    let operator = document.getElementById("used_operators").value;
    let result = eval(n1 + operator + n2);
    document.getElementById("result").value = result;
    history.push(n1 + " " + operator + " " + n2 + " = " + result);
    history.push("<br>");
}
function used_operators(){
    let ops = document.getElementById("used_operators");
    for(let operator of operators){
        let option = document.createElement('option');
        option.value = operator;
        option.innerHTML = operator;
        ops.appendChild(option);
    }
}
function unused_operators(){
    let ops = document.getElementById("unused_operators");
    for(let operator of all_operators){
        let option = document.createElement('option');
        option.value = operator;
        option.innerHTML = operator;
        ops.appendChild(option);
    }
}
function add_operator(){
    let op1 = document.getElementById("used_operators");
    let op2 = document.getElementById("unused_operators");
    let option = op2.options[op2.selectedIndex];
    op1.appendChild(option);
}
function remove_operator(){
    let op1 = document.getElementById("used_operators");
    let op2 = document.getElementById("unused_operators");
    let option = op1.options[op1.selectedIndex];
    op2.appendChild(option);
    document.getElementById("c_op").innerHTML = op1.options[op1.selectedIndex].value;
}