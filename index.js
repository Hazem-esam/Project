let questions = [];
let correctAnswers = [];

// Function to generate a random question (no negative values)
function generateQuestion() {
    const randomNum1 = Math.floor(Math.random() * 1000) + 1; // Ensure positive numbers
    const randomNum2 = Math.floor(Math.random() * 1000) + 1; // Ensure positive numbers
    const operationType = Math.floor(Math.random() * 5); // 0: addition, 1: subtraction, 2: missing operand addition, 3: missing operand subtraction, 4: comparison

    let questionText, answer;

    // Generate a question based on the operation type
    if (operationType === 0) {
        questionText = `${randomNum1} + ${randomNum2} = .........................`;
        answer = randomNum1 + randomNum2;
    } else if (operationType === 1) {
        // Ensure subtraction doesn't result in negative values
        const maxNum = Math.max(randomNum1, randomNum2); 
        const minNum = Math.min(randomNum1, randomNum2);
        questionText = `${maxNum} - ${minNum} = .........................`;
        answer = maxNum - minNum;
    } else if (operationType === 2) {
        questionText = `${randomNum1} + ......................... = ${randomNum1 + randomNum2}`;
        answer = randomNum2;
    } else if (operationType === 3) {
        const maxNum = Math.max(randomNum1, randomNum2); 
        const minNum = Math.min(randomNum1, randomNum2);
        questionText = `${maxNum} - ......................... = ${maxNum - minNum}`;
        answer = minNum;
    } else {
        // Updated comparison question
        const comparisonType = Math.floor(Math.random() * 3); // 0: greater than, 1: smaller than, 2: equal to
        let comparisonQuestion;

        // For the new comparison format like "56 + 34 .......... 234"
        if (comparisonType === 0) {
            comparisonQuestion = `${randomNum1 + randomNum2} + ${randomNum1} .......... ${randomNum1 + randomNum2}`;
            answer = '>';
        } else if (comparisonType === 1) {
            comparisonQuestion = `${randomNum1} + ${randomNum2} .......... ${randomNum1}`;
            answer = '<';
        } else {
            comparisonQuestion = `${randomNum1} + ${randomNum2} .......... ${randomNum1 + randomNum2}`;
            answer = '=';
        }

        questionText = comparisonQuestion;
    }

    return { questionText, answer };
}

// Function to generate all 50 questions (10 of each type)
function generateAllQuestions() {
    questions = [];
    correctAnswers = [];

    for (let i = 0; i < 10; i++) {
        const additionQuestion = generateQuestion();
        questions.push(additionQuestion.questionText);
        correctAnswers.push(additionQuestion.answer);
    }

    displayQuestions();
}

// Function to display all the questions
function displayQuestions() {
    const container = document.getElementById("questions-container");
    container.innerHTML = '';

    questions.forEach((question, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");

        const questionText = document.createElement("span");
        questionText.textContent = question;
        questionDiv.appendChild(questionText);

        const answerInput = document.createElement("input");
        answerInput.type = "text";
        answerInput.classList.add("answer");
        answerInput.id = `answer-${index}`;
        questionDiv.appendChild(answerInput);

        container.appendChild(questionDiv);
    });
}

// Function to check the answers and show feedback
function submitAnswers() {
    let correctCount = 0;
    let feedbackMessage = "You did great!";

    questions.forEach((_, index) => {
        const userAnswer = document.getElementById(`answer-${index}`).value.trim().toLowerCase();
        const correctAnswer = correctAnswers[index].toString().toLowerCase();

        // Check if the answer is correct
        if (userAnswer === correctAnswer) {
            correctCount++;
            document.getElementById(`answer-${index}`).classList.add("correct");
        } else {
            document.getElementById(`answer-${index}`).classList.add("incorrect");
        }
    });

    if (correctCount === questions.length) {
        feedbackMessage = "Excellent! You got all answers correct!";
    } else if (correctCount > questions.length / 2) {
        feedbackMessage = `Good job! You got ${correctCount} out of ${questions.length} correct.`;
    } else {
        feedbackMessage = `Keep trying! You got ${correctCount} out of ${questions.length} correct.`;
    }

    document.getElementById("feedback").textContent = feedbackMessage;
}

// Function to show the correct answers when clicked
function showAnswers() {
    const answersContainer = document.getElementById("answers-container");
    const answersDiv = document.getElementById("answers");

    answersDiv.innerHTML = ''; // Clear previous answers
    correctAnswers.forEach((answer, index) => {
        const answerText = document.createElement("div");
        answerText.textContent = `Question ${index + 1}: ${answer}`;
        answersDiv.appendChild(answerText);
    });

    answersContainer.style.display = "block"; // Show the answers
}

// Initialize the page by generating all questions
generateAllQuestions();
