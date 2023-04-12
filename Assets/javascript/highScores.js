var clearHighScoreselement = document.querySelector(".clear-high-scores");

init();

function init() {
    highScoresList = JSON.parse(localStorage.getItem("highScoresList"));

    if (highScoresList != null) {
        for (var i = 0; i < highScoresList.length; i++) {
            var li = document.createElement("li");
            li.textContent = i+1 + ". " + highScoresList[i].name + " - " + highScoresList[i].highScore; 
            // document.getElementById("#list").appendChild(li);
            document.body.appendChild(li);
        }
    }    
}

clearHighScoreselement.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});