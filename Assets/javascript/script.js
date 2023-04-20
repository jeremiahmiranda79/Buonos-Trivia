var startButtonElement = document.querySelector(".start-button");
var hero1Element = document.querySelector(".hero1");
var hero2Element = document.querySelector(".hero2");
var mainElement = document.getElementsByName("main");
var timeElement = document.querySelector(".time");
var timeLeft = 200;
var questionIndex = 0;
var buttons = [];
var guesses = [];
var score = 0;
var isStopTime = false;
var highScoresList = [];

init();

function init() {
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
    hero1Element.setAttribute("style", "display: none");
    hero2Element.setAttribute("style", "display: none");
    var question = document.createElement("h4");
    question.textContent = myFuncs[_questionIndex]().question;
    document.getElementById("question").appendChild(question);

    for (var i = 0; i < myFuncs[_questionIndex]().guess.length; i++) {
        buttons[i] = document.createElement("button");
        buttons[i].textContent = i+1 + ": " + myFuncs[_questionIndex]().guess[i];
        guesses[i] = myFuncs[_questionIndex]().guess[i]; 
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
                correct.textContent = "Correct!";
                document.getElementById("feed-back").appendChild(line);
                document.getElementById("feed-back").appendChild(correct);

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
                var count = 1;
                wrong.textContent = "Incorrect: -5 seconds!";
                document.getElementById("feed-back").appendChild(line);
                document.getElementById("feed-back").appendChild(wrong);
                var timerInterval = setInterval(function() {
                    count--;
          
                    if (count === 0) {
                        // Stops execution of action at set interval
                        clearInterval(timerInterval);
                        count = 1;
                        line.remove();
                        wrong.remove();
                        buttons[_buttonIndex].remove();
                        timeLeft = timeLeft - 5; 
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
    document.getElementById("highscore-input").appendChild(header);
    var finalScore = document.createElement("p");
    score = timeLeft;
    finalScore.textContent = "Your final score is: " + score;
    document.getElementById("highscore-input").appendChild(finalScore);
    var enterNameElement = document.createElement("p");
    enterNameElement.textContent = "Please enter your name or initials";
    document.getElementById("highscore-input").appendChild(enterNameElement);
    var input = document.createElement("input");    
    document.getElementById("highscore-input").appendChild(input);
    var submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    document.getElementById("highscore-input").appendChild(submitButton);

    submitButton.addEventListener("click", function() {
        var playerHighScore = {
            name: input.value,
            highScore: score
        };

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
        question: "The Margherita pizza is most likely named after what former queen of Italy?",
        guess: ["Elana of Padua", "Maria Luisa of Parma", "Margherita of Savoy", "Mary of Modena"],
        answer: "Margherita of Savoy"
    }
    var question3 = {
        question: "What type of milk is used in Pecorino Romano cheese?",
        guess: ["Cow", "Sheep", "Goat", "Coconut"],
        answer: "Sheep"
    }
    var question4 = {
        question: "Neapolitan pizza, or pizza Napoletana refers to what part of Italy that this pizza found its roots?",
        guess: ["Genoa", "Bologna", "Venice", "Naples"],
        answer: "Naples"
    }

    var question5 = {
        question: "Stromboli is a pizza style shape noted that it is?",
        guess: ["Folded", "Open face", "Rolled", "Balled"],
        answer: "Rolled"
    }

    var question6 = {
        question: "Where did the Chicken Parmesan dish find its roots?",
        guess: ["United States of America", "Northern Italy", "Southern Italy", "England"],
        answer: "United States of America"
    }

    var question7 = {
        question: "Where was the original Bounos Pizza location?",
        guess: ["2023 W Guadalue Rd Mesa AZ 85202", "3500 E Power Rd Gilbert AZ 85142", "2400 S Fast Cat Ln Poenix AZ 84674", "4555 N Bright Ave Queen Creek AZ 85146"],
        answer: "2023 W Guadalue Rd Mesa AZ 85202"
    }

    var question8 = {
        question: "What is NOT an Italian cuisine mother sauce?",
        guess: ["Veloute", "Tomato", "Bechamel", "Basil Puree"],
        answer: "Basil Puree"
    }

    var question9 = {
        question: "Where did the Cannoli originate from?",
        guess: ["Calabria", "Sicily", "Campania", "Basilicata"],
        answer: "Sicily"
    }

    var question10 = {
        question: 'What day is known as "Prince" spaghetti day?',
        guess: ["Wednesday", "Thursday", "Monday", "Friday"],
        answer: "Wednesday"
    }

    var question11 = {
        question: 'Boars Head Deli is from what US state?',
        guess: ["Kansas", "Alaska", "New York", "Montana"],
        answer: "New York"
    }

    var question12 = {
        question: 'The name pasta "Puttanesca" comes from what Italian slang?',
        guess: ["Sweat and Sour", "Lady of the night", "Mini golf hole in one", "Tip of the ole Boot"],
        answer: "Lady of the night"
    }

    var question13 = {
        question: 'What does the word Buono means in Italian?',
        guess: ["Bad", "Hungry", "Good", "Stuffed"],
        answer: "Good"
    }

    var question14 = {
        question: 'What year did the Pante family take full owner ship of Buonos Pizza?',
        guess: ["2001", "2016", "1994", "1990"],
        answer: "1994"
    }

    var question15 = {
        question: 'The word "Gravy" at Buonos Pizza refers to  what type of sauce?',
        guess: ["Soy Sauce", "Marinara", "Balsamic Glaze", "Alfredo"],
        answer: "Marinara"
    }

    var question16 = {
        question: 'What does Antipasto mean in Italian Cuisine?',
        guess: ["Coffee drink", "Last course", "Dessert", "First course"],
        answer: "First course"
    }

    var question17 = {
        question: 'A Zeppole is?',
        guess: ["Fried dough and powdered sugar", "Caramel Apple", "Lemon Cake", "Creme Brulee"],
        answer: "Fried dough and powdered sugar"
    }

    var question18 = {
        question: 'Drakes Cakes originated in what New York City Burough?',
        guess: ["Bronx", "Brooklyn", "Manhattan", "Queens"],
        answer: "Brooklyn"
    }

    var question19 = {
        question: 'Buonos Pizza serves what size pizza?',
        guess: ['XL-Large-18"', 'Large-16"', 'Small-14"', 'All of the above'],
        answer: "All of the above"
    }

    var question20 = {
        question: 'Pasta is believed to have found its roots in what area?',
        guess: ["China", "Italy", "United States of America", "France"],
        answer: "China"
    }

    // Save related form data as an object
    // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
    localStorage.setItem("question1", JSON.stringify(question1));
    localStorage.setItem("question2", JSON.stringify(question2));
    localStorage.setItem("question3", JSON.stringify(question3));
    localStorage.setItem("question4", JSON.stringify(question4));
    localStorage.setItem("question5", JSON.stringify(question5));
    localStorage.setItem("question6", JSON.stringify(question6));
    localStorage.setItem("question7", JSON.stringify(question7));
    localStorage.setItem("question8", JSON.stringify(question8));
    localStorage.setItem("question9", JSON.stringify(question9));
    localStorage.setItem("question10", JSON.stringify(question10));
    localStorage.setItem("question11", JSON.stringify(question11));
    localStorage.setItem("question12", JSON.stringify(question12));
    localStorage.setItem("question13", JSON.stringify(question13));
    localStorage.setItem("question14", JSON.stringify(question14));
    localStorage.setItem("question15", JSON.stringify(question15));
    localStorage.setItem("question16", JSON.stringify(question16));
    localStorage.setItem("question17", JSON.stringify(question17));
    localStorage.setItem("question18", JSON.stringify(question18));
    localStorage.setItem("question19", JSON.stringify(question19));
    localStorage.setItem("question20", JSON.stringify(question20));
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

    function getQuestion6() {
        var myQuestion = JSON.parse(localStorage.getItem("question6"));
        return myQuestion;
    },

    function getQuestion7() {
        var myQuestion = JSON.parse(localStorage.getItem("question7"));
        return myQuestion;
    },

    function getQuestion8() {
        var myQuestion = JSON.parse(localStorage.getItem("question8"));
        return myQuestion;
    },

    function getQuestion9() {
        var myQuestion = JSON.parse(localStorage.getItem("question9"));
        return myQuestion;
    },

    function getQuestion10() {
        var myQuestion = JSON.parse(localStorage.getItem("question10"));
        return myQuestion;
    },

    function getQuestion11() {
        var myQuestion = JSON.parse(localStorage.getItem("question11"));
        return myQuestion;
    },

    function getQuestion12() {
        var myQuestion = JSON.parse(localStorage.getItem("question12"));
        return myQuestion;
    },

    function getQuestion13() {
        var myQuestion = JSON.parse(localStorage.getItem("question13"));
        return myQuestion;
    },

    function getQuestion14() {
        var myQuestion = JSON.parse(localStorage.getItem("question14"));
        return myQuestion;
    },

    function getQuestion15() {
        var myQuestion = JSON.parse(localStorage.getItem("question15"));
        return myQuestion;
    },

    function getQuestion16() {
        var myQuestion = JSON.parse(localStorage.getItem("question16"));
        return myQuestion;
    },

    function getQuestion17() {
        var myQuestion = JSON.parse(localStorage.getItem("question17"));
        return myQuestion;
    },

    function getQuestion18() {
        var myQuestion = JSON.parse(localStorage.getItem("question18"));
        return myQuestion;
    },

    function getQuestion19() {
        var myQuestion = JSON.parse(localStorage.getItem("question19"));
        return myQuestion;
    },

    function getQuestion20() {
        var myQuestion = JSON.parse(localStorage.getItem("question20"));
        return myQuestion;
    },
];