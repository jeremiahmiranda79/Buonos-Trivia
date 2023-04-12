var timeElement = document.querySelector(".time");
var startButtonElement = document.querySelector(".start-button");
var headerElement = document.querySelector(".title");
var paragraphElement = document.querySelector(".about");

var mainElement = document.getElementsByName("main");

var timeLeft = 100;
var questionIndex = 0;
var buttons = [];
var guesses = [];
var score = 0;
var isStopTime = false;

var highScoresList = [];

init();

function init() {
    // highScoresList = JSON.parse(localStorage.getItem("highScoresList")) || [];
    highScoresList = JSON.parse(localStorage.getItem("highScoresList"));
    
    if (!highScoresList) {
        highScoresList = [];
    }

    saveQuestions(); 
    setHomePage();
    setTimeText();
}

function setTimeText() {
    timeElement.textContent = timeLeft;
}

function startTime() {
    var timerInterval = setInterval(function() {
        timeLeft--;
        setTimeText();
        if (isStopTime) {
            clearInterval(timerInterval);
            timeElement.textContent = timeLeft + 1;
        }

        if (timeLeft === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // setTimeText(); 
        }

    }, 1000); 
}

function setHomePage() {
    startButtonElement.addEventListener("click", function() {
        startTime();
        setQuestions(questionIndex);
    });
}

function setQuestions(_questionIndex) {
    startButtonElement.setAttribute("style", "display: none");
    headerElement.setAttribute("style", "display: none");
    paragraphElement.setAttribute("style", "display: none");

    var question = document.createElement("h4");

    question.textContent = myFuncs[_questionIndex]().question;
    // document.body.appendChild(question);
    document.getElementById("question").appendChild(question);

    for (var i = 0; i < myFuncs[_questionIndex]().guess.length; i++) {
        buttons[i] = document.createElement("button");
        buttons[i].textContent = i+1 + ": " + myFuncs[_questionIndex]().guess[i];
        guesses[i] = myFuncs[_questionIndex]().guess[i]; 
        // document.body.appendChild(buttons[i]);
        document.getElementById("buttons").appendChild(buttons[i]);
    }

    buttonInfo(0);
    buttonInfo(1);
    buttonInfo(2);
    buttonInfo(3);

    function buttonInfo(_buttonIndex) {
        buttons[_buttonIndex].addEventListener("click", function() {
            if (guesses[_buttonIndex] === myFuncs[_questionIndex]().answer) {
                var line = document.createElement("hr");
                var correct = document.createElement("p");
                correct.textContent = "Correct";
                document.body.appendChild(line);
                document.body.appendChild(correct);
                var count = 1;
                var timerInterval = setInterval(function() {
                    count--;

                    if (count === 0) {
                        // Stops execution of action at set interval
                        clearInterval(timerInterval);
                        count = 1;
                        question.remove();
                        line.remove();
                        correct.remove();
                        
                        for (var i = 0; i < buttons.length; i++) {
                            buttons[i].remove();
                        }
                        
                        questionIndex++;

                        if (questionIndex < myFuncs.length) {
                            setQuestions(questionIndex);
                        }
                        else {
                            isStopTime = true;
                            submitScore(highScoresList);
                        }
                    }
                }, 1000);       
            } else {
                var line = document.createElement("hr");
                var wrong = document.createElement("p");
                wrong.textContent = "Wrong";
                document.body.appendChild(line); 
                document.body.appendChild(wrong);
                var count = 1;
                var timerInterval = setInterval(function() {
                    count--;
          
                    if (count === 0) {
                        // Stops execution of action at set interval
                        clearInterval(timerInterval);
                        count = 1;
                        line.remove();
                        wrong.remove();
                        buttons[_buttonIndex].remove();
                        timeLeft = timeLeft - 10; 
                    }
                }, 1000); 
            }
        });
    }
} 

function submitScore(arr) {
    var header = document.createElement("h2");
    header.textContent = "All done!";
    document.body.appendChild(header);

    var finalScore = document.createElement("p");
    score = timeLeft;
    finalScore.textContent = "Your final score is " + score;
    document.body.appendChild(finalScore);

    var enterNameElement = document.createElement("p");
    enterNameElement.textContent = "Enter initials";
    document.body.appendChild(enterNameElement);

    var input = document.createElement("input");    
    document.body.appendChild(input);

    var submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    document.body.appendChild(submitButton);

    submitButton.addEventListener("click", function() {
        var playerHighScore = {
            name: input.value,
            highScore: score
        };

        console.log(playerHighScore.name);
        console.log(playerHighScore.highScore);
        console.log(playerHighScore);

        // var highScoresList = [];
        // highScoresList.push(playerHighScore);
        arr.push(playerHighScore);

        localStorage.setItem("highScoresList", JSON.stringify(highScoresList));
        window.location.href = "Assets/html/high-score-page.html";
    });
}

function saveQuestions() {
    var question1 = {
        question: "What year was Buonos Pizza first established?",
        guess: ["1989", "2002", "2021", "1998"],
        answer: "1989"
    };
    var question2 = {
        question: "The Margherita pizza is most likely named after what former queen of Italia?",
        guess: ["Elana of Padua", "Maria Luisa of Parma", "Margherita of Savoy", "Mary of Modena"],
        answer: "Margherita of Savoy"
    }
    var question3 = {
        question: "What type of milk is used in Romano cheese?",
        guess: ["Cow", "Sheep", "Goat", "Coconut"],
        answer: "Sheep"
    }
    var question4 = {
        question: "Neapolitan pizza, or pizza Napoletana refers to what part of Italy that this pizza found its roots?",
        guess: ["Genoa", "Bologna", "Venice", "Naples"],
        answer: "Naples"
    }
    var question5 = {
        question: "What is the difference for Stomboli and Calzone?",
        guess: ["Clalzone is a folded circle", "Stromboli has its content rolled", "Either is typically brushed with eggwash before baking", "All of the above"],
        answer: "All of the above"
    }

    // Save related form data as an object
    // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
    localStorage.setItem("question1", JSON.stringify(question1));
    localStorage.setItem("question2", JSON.stringify(question2));
    localStorage.setItem("question3", JSON.stringify(question3));
    localStorage.setItem("question4", JSON.stringify(question4));
    localStorage.setItem("question5", JSON.stringify(question5));
}

var myFuncs = [
    function getQuestion1() {
        var myQuestion = JSON.parse(localStorage.getItem("question1"));
        return myQuestion;
    },

    function getQuestion2() {
        var myQuestion = JSON.parse(localStorage.getItem("question2"));
        return myQuestion;
    },

    function getQuestion3() {
        var myQuestion = JSON.parse(localStorage.getItem("question3"));
        return myQuestion;
    },

    function getQuestion4() {
        var myQuestion = JSON.parse(localStorage.getItem("question4"));
        return myQuestion;
    },

    function getQuestion5() {
        var myQuestion = JSON.parse(localStorage.getItem("question5"));
        return myQuestion;
    },
];
