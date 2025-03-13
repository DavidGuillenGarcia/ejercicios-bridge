const fetchQuestions = () => {
  fetch(
    "https://opentdb.com/api.php?amount=10&category=15&difficulty=hard&type=multiple"
  )
    .then((response) => response.json())
    .then((data) => {
      const jsonData = data.results;
      console.log(jsonData);
      jsonData.forEach((quiz) => {
        createQuestion(
          quiz.question,
          quiz.correct_answer,
          quiz.incorrect_answers[0],
          quiz.incorrect_answers[1],
          quiz.incorrect_answers[2]
        );
      });
    });
};

const createQuestion = (question, correctOption, option1, option2, option3) => {
  console.log(question, correctOption, option1, option2, option3);
};

fetchQuestions();
