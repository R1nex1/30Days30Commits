const questions = [
    {
        question: "What is the capital of Germany?", 
        answers: [
            { text: "Paris", correct: false},
            { text: "Rome", correct: false},
            { text: "Berlin", correct: true},
            { text: "Tartu", correct: false},
        ]
    },
    {
        question: "Which planet is known as the Red Planet?", 
        answers: [
            { text: "Mars", correct: true},
            { text: "Jupiter", correct: false},
            { text: "Earth", correct: false},
            { text: "Sun", correct: false},
        ]
    },
    {
        question: "What is 5 * 4 / 2 + 2 ?", 
        answers: [
            { text: "5", correct: false},
            { text: "12", correct: true},
            { text: "8", correct: false},
            { text: "10", correct: false},
        ]
    },
    {
        question: "How many continents are there on earth?", 
        answers: [
            { text: "3", correct: false},
            { text: "8", correct: false},
            { text: "16", correct: false},
            { text: "7", correct: true},
        ]
    },
    {
        question: "What is the chemical symbol for iron?", 
        answers: [
            { text: "H20", correct: false},
            { text: "CO2", correct: false},
            { text: "Fe", correct: true},
            { text: "NaCl", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer_options");
const nextButton = document.getElementById("next_btn");

let currentQuestionNum = 0;
let score = 0;

function startQuiz(){
    currentQuestionNum = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionNum];
    let questionNo = currentQuestionNum + 1; 
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block"
}

function handleNextButton(){
    currentQuestionNum++;
    if(currentQuestionNum < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionNum < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();