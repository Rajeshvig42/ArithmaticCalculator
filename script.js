let totalQuestions = 0;
let currentQuestionIndex = 0;
let score = 0;
let questions = [];
let difficulty = 'easy';

// Start Quiz
function startQuiz() {
    difficulty = document.getElementById('difficulty').value;
    totalQuestions = parseInt(document.getElementById('numQuestions').value, 10);
    const operations = Array.from(document.getElementById('operations').selectedOptions).map(option => option.value);

    questions = generateQuestions(totalQuestions, difficulty, operations);
    currentQuestionIndex = 0;
    score = 0;

    document.getElementById('settings').style.display = 'none';
    document.getElementById('questionnaire').style.display = 'block';
    displayQuestion();
}

// Generate Questions with Difficulty Levels
function generateQuestions(total, difficulty, operations) {
    const questionsArray = [];
    const range = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 100 : 1000;

    for (let i = 0; i < total; i++) {
        const num1 = Math.floor(Math.random() * range) + 1;
        const num2 = Math.floor(Math.random() * range) + 1;
        const operation = operations[Math.floor(Math.random() * operations.length)];

        let questionText = '';
        let correctAnswer;

        switch (operation) {
            case 'addition':
                questionText = `${num1} + ${num2}`;
                correctAnswer = num1 + num2;
                break;
            case 'subtraction':
                questionText = `${num1} - ${num2}`;
                correctAnswer = num1 - num2;
                break;
            case 'multiplication':
                questionText = `${num1} × ${num2}`;
                correctAnswer = num1 * num2;
                break;
            case 'division':
                questionText = `${num1} ÷ ${num2}`;
                correctAnswer = parseFloat((num1 / num2).toFixed(2));
                break;
        }
        questionsArray.push({ question: questionText, answer: correctAnswer });
    }

    return questionsArray;
}

// Display Question
function displayQuestion() {
    const questionElement = document.getElementById('question-text');
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = `Q${currentQuestionIndex + 1}: ${currentQuestion.question}`;
}

// Submit Answer and Show Feedback
function submitAnswer() {
    const userAnswer = parseFloat(document.getElementById('answer').value);
    const correctAnswer = questions[currentQuestionIndex].answer;

    if (userAnswer === correctAnswer) {
        score++;
        alert('Correct! 🎉');
    } else {
        alert(`Oops! The correct answer was ${correctAnswer}.`);
    }

    currentQuestionIndex++;
    if (currentQuestionIndex >= totalQuestions) {
        showResults();
    } else {
        displayQuestion();
    }
}

// Show Results and Achievements
function showResults() {
    document.getElementById('questionnaire').style.display = 'none';
    document.getElementById('results').style.display = 'block';

    const percentage = (score / totalQuestions) * 100;
    document.getElementById('score').textContent = `You got ${score} out of ${totalQuestions}.`;
    document.getElementById('percentage').textContent = `Score: ${percentage.toFixed(2)}%`;

    const achievementsDiv = document.getElementById('achievements');
    if (percentage === 100) {
        achievementsDiv.innerHTML = '🏆 You’re a Math Wizard!';
    } else if (percentage >= 80) {
        achievementsDiv.innerHTML = '✨ Great Job!';
    } else {
        achievementsDiv.innerHTML = '💡 Keep Practicing!';
    }
}
