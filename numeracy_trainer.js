//question number
//timer 
//accuracy + time log text file
//start screen statistics 
//hover element for info on question structure

let questions; //declare global variable
let questionFormat = ["+","-","*","*","/","/","*","*","frac","percent"];
let digits = [4,4,4,4,2,2,3,2,2,1,3,2,2,2,3,3,"frac",2,2];
let decPlace = [1,1,1,1,1,1,1,1,1,1,1,1,10,10,100,100,"frac",1,1];
let questionIndex = 0

var prevResults = document.getElementById("prevResults");
var prevResultsTitle = document.getElementById("prevResultsTitle");
var startNewRound = document.getElementById("startNewRound");
var content = document.getElementById("content");
var submit = document.getElementById("submit");
var input = document.getElementById("input");

function startHideProc(){
    prevResults.style.display = "none";
    prevResultsTitle.style.display = "none";
    startNewRound.style.display = "none";
}

function startCountdown(){
    var count = 5;
    var interval = setInterval(function(){
        count--;
        
        if (count<0){
            clearInterval(interval);
            content.innerHTML = formatContent();
            questionIndex ++;
            startShowProc();
        } else{
            content.innerHTML = `<span style="color: blue";>${count}</span>`;
        }
    }, 1000);
}

function randomInt(int){
    const min = Math.pow(10, int - 1);
    const max = Math.pow(10, int) - 1;

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createQuestions(){
//Basic operations
//  x1 Addition (4d + 4d)
//  x1 Subtraction (4d - 4d)
//  x2 Multiplication (2d x 2d, 3d x 2d)
//  x2 Division (2d / 1d, 3d / 2d, [with decimals])
//Decimals
//  x2 Multiplying decimals (1d.2d x 1d.2d, 1d.1d x 1d.1d)
//  x1 Common fractions (⅕,⅙,1/7,⅛,1/9)
//Finance
//  x1 Percentage framed word problems “__ is __% of __”
    questions = [];
    for (let i = 0;i<digits.length; i++){
        if (digits[i] != "frac"){
            questions.push(randomInt(digits[i])/decPlace[i]);
        }else{
            questions.push(randomInt(1));
            questions.push(randomInt(1)); //the fraction question has two values: a numerator and denominator 
        }   
    
    }
    console.log(questions)
    return questions
}

function startShowProc(){
    submit.style.display = "block";
    input.style.display = "block";

}

function checkAndNext(){
    var guess = parseFloat(input.value).toFixed(2);
    input.value = ""
    var answer;
    if (questionFormat[questionIndex-1] === "frac"){
        answer = parseFloat((questions[2*(questionIndex-1)] / questions[2*(questionIndex-1)+1])).toFixed(2); //bug
        if (guess===answer){
            content.innerHTML = formatContent();
            submit.innerHTML = '*press enter to submit*'
            questionIndex ++;
        }else{
            submit.innerHTML = 'Wrong Answer!'
        }
    }else if (questionFormat[questionIndex-1] === "percent"){
        answer = Math.round((questions[2*(questionIndex-1)] / questions[2*(questionIndex-1)+1]) * 100).toFixed(2);
        if (guess===answer){
            content.innerHTML = formatContent();
            submit.innerHTML = '*press enter to submit*'
            questionIndex ++;
        }else{
            submit.innerHTML = 'Wrong Answer!'
        }
    }else{
        answer = eval(questions[2*(questionIndex-1)] + questionFormat[questionIndex-1] + questions[2*(questionIndex-1)+1]).toFixed(2); //might not work because of parsing
        if (guess===answer){
            content.innerHTML = formatContent();
            submit.innerHTML = '*press enter to submit*'
            questionIndex ++;
        }else{
            submit.innerHTML = 'Wrong Answer!'
        }
    }
}

function formatContent(){
    if (questionIndex === digits.length -1){
        endProc();
    } else if (questionFormat[questionIndex]==="frac"){
        return `<span style="color:black";>What is ${questions[2*questionIndex]}/${questions[2*questionIndex + 1]} in decimal form?</span>`;

    }else if (questionFormat[questionIndex]==="percent"){
        return `<span style="color:black";>${questions[2*questionIndex]} is __% of ${questions[2*questionIndex + 1]}</span>`;
    }else{
        return `<span style="color:black";>${questions[2*questionIndex]} ${questionFormat[questionIndex]} ${questions[2*questionIndex + 1]}</span>`;
    }
}

function endProc(){

}

document.getElementById("startNewRound").addEventListener("click", function(){
    createQuestions();
    startHideProc();
    startCountdown();
});

document.addEventListener('keydown', function(event){
    if (event.key === "Enter" && input.style.display === "block"){
        checkAndNext();
    }
});
