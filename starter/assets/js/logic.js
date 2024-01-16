document.addEventListener("DOMContentLoaded", function () {
    // DOM elements
    var startButton = document.getElementById("start");
    var startScreen = document.getElementById("start-screen");
    var questionsDiv = document.getElementById("questions");
    var choicesDiv = document.getElementById("choices");
    var timerSpan = document.getElementById("time");
    var endScreen = document.getElementById("end-screen");
    var initialsInput = document.getElementById("initials");
    var submitButton = document.getElementById("submit");
    var feedbackDiv = document.getElementById("feedback");
  
    // Quiz variables
    var currentQuestionIndex = 0;
    var timeLeft = 120; // Set the initial time in seconds
    var timerInterval;
    var score = 0;
  
    // Function to start the quiz
    function startQuiz() {
      startScreen.classList.add("hide");
      questionsDiv.classList.remove("hide");
      displayQuestion();
      startTimer();
    }
  
    // Function to display a question
    function displayQuestion() {
      var currentQuestion = questions[currentQuestionIndex];
      var choicesHTML = "";
  
      document.getElementById("question-title").textContent =
        currentQuestion.question;
  
      currentQuestion.options.forEach(function (choice, index) {
        choicesHTML +=
          '<button class="choice" data-index="' +
          index +
          '">' +
          choice +
          "</button>";
      });
  
      choicesDiv.innerHTML = choicesHTML;
  
      // Add event listener to each choice button
      document.querySelectorAll(".choice").forEach(function (button) {
        button.addEventListener("click", function () {
          checkAnswer(this.dataset.index);
        });
      });
    }
  
    // Function to start the timer
    function startTimer() {
      timerInterval = setInterval(function () {
        timeLeft--;
        timerSpan.textContent = timeLeft;
  
        if (timeLeft <= 0 || currentQuestionIndex === questions.length) {
          endQuiz();
        }
      }, 1000);
    }
  
    // Function to check the selected answer
    function checkAnswer(index) {
      if (index == questions[currentQuestionIndex].correctAnswer) {
        // Correct answer
        score += 20;
        feedbackDiv.textContent = "Correct!";
      } else {
        // Incorrect answer
        score -= 20;
        feedbackDiv.textContent = "Incorrect!";
      }
  
      currentQuestionIndex++;
  
      if (currentQuestionIndex < questions.length) {
        // Display the next question
        displayQuestion();
      } else {
        // End the quiz
        endQuiz();
      }
    }
  
    // Function to end the quiz
    function endQuiz() {
      clearInterval(timerInterval);
  
      // Display the final score and end screen
      document.getElementById("final-score").textContent = score;
      endScreen.classList.remove("hide");
    }
  
    // Event listener for the start button
    startButton.addEventListener("click", startQuiz);
  
    // Event listener for the submit button
    submitButton.addEventListener("click", function () {
      var initials = initialsInput.value.trim();
  
      if (initials !== "") {
        // Save the score and initials (You can customize this part)
        console.log("Initials: " + initials + ", Score: " + score);
        // You can add logic here to save the score and initials to your desired storage.
      }
    });
  });
  