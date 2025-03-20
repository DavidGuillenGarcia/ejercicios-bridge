window.onload = () => {
  const quizContainer = document.getElementById("quiz-container");
  const nextBtn = document.getElementById("nextBtn");
  const sendBtn = document.getElementById("sendBtn");
  sendBtn.classList.add("hidden");

  let pageIndex = 0;

  // const fetchQuestions = () => {
  //   fetch(
  //     "https://opentdb.com/api.php?amount=10&category=15&difficulty=hard&type=multiple"
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const jsonData = data.results;
  //       console.log(jsonData);
  //       localStorage.setItem("questions", JSON.stringify(jsonData));
  //     });
  // };

  const createQuestion = (
    question,
    questionId,
    correctOption,
    option1,
    option2,
    option3
  ) => {
    const options = [correctOption, option1, option2, option3];

    let optionsRandomized = [];

    let checkResult = [];

    while (optionsRandomized.length < options.length) {
      let randomPosition = Math.floor(Math.random() * options.length);
      if (!optionsRandomized.includes(options[randomPosition])) {
        optionsRandomized.push(options[randomPosition]);
        if (options[0] == options[randomPosition]) {
          checkResult.push("correct");
        } else {
          checkResult.push("incorrect");
        }
      }
    }

    let newQuestion = `<div id="question${questionId}" class="hidden"> <div class="question-text text-light mt-5 d-flex justify-content-center align-items-center">
            <span class="fs-4 text-question">${question}</span>
          </div>
  
         <div
            class="form-check quiz d-flex justify-content-center mt-3 py-4 px-2"
          >
              <div class="quiz-question-row">
                <div
                  class="question d-flex justify-content-between align-items-center px-4 bg-danger text-light m-3 rounded rounded-3"
                >
                  <label class="form-check-label" for="radio1">
                    ${optionsRandomized[0]}
                  </label>
                  <input
                    class="form-check-input me-2"
                    type="radio"
                    value="${checkResult[0]}"
                    name="flexRadioDefault"
                    id="radio1"
                  />
                </div>
                <div
                  class="question d-flex justify-content-between align-items-center px-4 bg-info text-light m-3 rounded rounded-3"
                >
                  <label class="form-check-label" for="radio2">
                    ${optionsRandomized[1]}
                  </label>
                  <input
                    class="form-check-input me-2"
                    type="radio"
                     value="${checkResult[1]}"
                    name="flexRadioDefault"
                    id="radio2"
                  />
                </div>
              </div>
              <div class="quiz-question-row">
                <div
                  class="question d-flex justify-content-between align-items-center px-4 bg-warning text-light m-3 rounded rounded-3"
                >
                  <label class="form-check-label" for="radio3">
                     ${optionsRandomized[2]}
                  </label>
                  <input
                    class="form-check-input me-2"
                    type="radio"
                     value="${checkResult[2]}"
                    name="flexRadioDefault"
                    id="radio3"
                  />
                </div>
                <div
                  class="question d-flex justify-content-between align-items-center px-4 bg-success text-light m-3 rounded rounded-3"
                >
                  <label class="form-check-label" for="radio4">
                     ${optionsRandomized[3]}
                  </label>
                  <input
                    class="form-check-input me-2"
                    type="radio"
                     value="${checkResult[3]}"
                    name="flexRadioDefault"
                    id="radio4"
                  />
                </div>
              </div>
            </div>
          </div>`;

    quizContainer.innerHTML += newQuestion;
  };

  const displayQuestion = (index) => {
    hideQuestions();
    let questionId = "question" + index;
    document.getElementById(questionId).classList.remove("hidden");

    if (index == 9) {
      nextBtn.classList.add("hidden");
      sendBtn.classList.remove("hidden");
    }
  };

  const fecthAllQuestions = () => {
    const storagedQuestions = JSON.parse(localStorage.getItem("questions"));

    storagedQuestions.forEach((quizQuestion) => {
      createQuestion(
        quizQuestion.question,
        pageIndex++,
        quizQuestion.correct_answer,
        quizQuestion.incorrect_answers[0],
        quizQuestion.incorrect_answers[1],
        quizQuestion.incorrect_answers[2]
      );
    });
    pageIndex = 0;
    displayQuestion(pageIndex);
  };

  const hideQuestions = () => {
    const totalQuestions = 9;
    for (let i = 0; i <= totalQuestions; i++) {
      document.getElementById("question" + i).classList.add("hidden");
    }
  };

  const nextPage = () => {
    pageIndex++;
    displayQuestion(pageIndex);
  };

  const createPagination = () => {
    nextBtn.addEventListener("click", nextPage);
  };

  createPagination();
  fecthAllQuestions();
};
