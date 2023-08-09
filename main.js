const setOfQuestions = document.querySelector("#setOfQuestions");

const completedQuestionsResult = [
  {
    questionTitle: "Sonlar",
    completed: 0,
  },
  {
    questionTitle: "Array-1",
    completed: 0,
  },
  {
    questionTitle: "Array-2",
    completed: 0,
  },
  {
    questionTitle: "String-1",
    completed: 0,
  },
  {
    questionTitle: "String-2",
    completed: 0,
  },
  {
    questionTitle: "Rekursiya",
    completed: 0,
  },
];

let localQuestionSet =
  JSON.parse(localStorage.getItem("questionSet")) || questionSet;
// show question category function

const completedQuestionsCount =
  JSON.parse(localStorage.getItem("completedQuestionsCount")) ||
  completedQuestionsResult;

const showQuestionCategery = () => {
  setOfQuestions.classList.remove("p-3");
  setOfQuestions.classList.add("bg-transparent", "mt-5");
  topicSite.classList.remove("d-none");

  Object.values(localQuestionSet).map((questionCategory, index) => {
    const questionCard = document.createElement("div");
    questionCard.classList = "col-12 col-sm-6 col-md-4 p-3";

    const questionBox = document.createElement("div");
    questionBox.classList = "rounded-3 questionBox  p-4";
    questionBox.addEventListener("click", function () {
      index++;
      showQuestions(questionCategory, index);
    });

    const questionTitle = document.createElement("h-4");
    questionTitle.classList = "text-white fs-4 question-title";
    questionTitle.textContent = questionCategory.title;
    questionBox.appendChild(questionTitle);

    const questionsInfo = document.createElement("div");
    questionsInfo.classList = "d-flex justify-content-between align-items-end";

    const questionsLength = document.createElement("p");
    questionsLength.classList = "text-white ";
    questionsLength.innerHTML = `${questionCategory.questionsLenght}<i class="fa-solid fa-hourglass-half ms-2"></i>`;
    questionsInfo.appendChild(questionsLength);

    const questionSuccessValue =
      100 / Object.entries(questionCategory.questions).length;

    const questionSuccess = document.createElement("p");
    questionSuccess.classList = ` questionSuccess m-0 ${
      completedQuestionsCount[index].completed !== 0
        ? "text-warning"
        : "text-white"
    }`;
    questionSuccess.textContent =
      parseFloat(
        completedQuestionsCount[index].completed * questionSuccessValue
      ).toFixed(1) + "%";
    questionsInfo.appendChild(questionSuccess);

    questionBox.appendChild(questionsInfo);
    questionCard.appendChild(questionBox);
    setOfQuestions.appendChild(questionCard);
  });
};

// show questions function

let countPage = 1;

const showQuestions = (questionCategory, index) => {
  const categoryTitleBox = document.createElement("div");
  topicSite.classList.remove("d-none");

  setOfQuestions.classList.remove("p-3");
  setOfQuestions.classList.add("bg-transparent", "mt-5");

  categoryTitleBox.classList =
    "d-flex justify-content-start align-items-center";

  const categoryTitle = document.createElement("p");
  categoryTitle.textContent = questionCategory.title;
  categoryTitle.classList = "fs-3 text-white m-0";
  categoryTitleBox.appendChild(categoryTitle);

  const goBackBtn = document.createElement("button");
  goBackBtn.classList = "btn rounded goBackBtn ms-3 px-3 py-1 fs-5 text-white";
  goBackBtn.style.height = "40px";
  goBackBtn.innerHTML = `<i class="fa-solid fa-arrow-left-long"></i>`;
  goBackBtn.addEventListener("click", function () {
    setOfQuestions.innerHTML = "";
    showQuestionCategery();
  });
  categoryTitleBox.appendChild(goBackBtn);
  setOfQuestions.innerHTML = "";
  setOfQuestions.appendChild(categoryTitleBox);

  const questionMap = Object.values(questionCategory.questions);

  Object.values(questionMap).map((question, questionIndex) => {
    const questionCard = document.createElement("div");
    questionCard.classList = "col-12 col-sm-6 col-md-4 p-3";

    const questionBox = document.createElement("div");
    questionBox.classList =
      "rounded-3 questionBox p-4 d-flex justify-content-between align-items-center";
    questionBox.addEventListener("click", function () {
      showDevDisplay(questionCategory.questions, questionIndex + 1, index);
    });

    const questionTitle = document.createElement("h-4");
    questionTitle.classList = "text-white fs-4 question-title ";
    questionTitle.textContent = question.fun_name.slice(
      0,
      question.fun_name.indexOf(" ")
    );
    questionBox.appendChild(questionTitle);

    if (question.solved === true) {
      const questionSuccess = document.createElement("i");
      questionSuccess.classList = "fa-solid fa-circle-check text-warning";
      questionBox.appendChild(questionSuccess);
    }

    questionCard.appendChild(questionBox);

    setOfQuestions.appendChild(questionCard);
  });
};

// solving problem function

const showDevDisplay = (questionCategory, questionIndex, index) => {
  const topicSite = document.getElementById("topicSite");

  setOfQuestions.classList.remove("mt-5");

  setOfQuestions.innerHTML = "";
  setOfQuestions.classList.add("p-3", "rounded");
  setOfQuestions.classList.remove("bg-transparent");
  setOfQuestions.style.backgroundColor = "#303041";

  // dev display right

  const devDisplayLeft = document.createElement("div");
  devDisplayLeft.classList = "col-12  col-md-6";

  const devDisplayHeader = document.createElement("div");
  devDisplayHeader.classList = "d-flex justify-content-start flex-wrap";

  const homeBtn = document.createElement("button");
  homeBtn.classList = "btn rounded px-3 py-1 fs-5 text-white";
  homeBtn.style.backgroundColor = "rgba(17, 16, 31,0.5)";
  homeBtn.style.height = "40px";
  homeBtn.innerHTML = `<i class="fa-solid fa-house"></i>`;
  homeBtn.addEventListener("click", function () {
    setOfQuestions.innerHTML = "";
    showQuestionCategery();
  });
  devDisplayHeader.appendChild(homeBtn);

  const goBackBtn = document.createElement("button");
  goBackBtn.classList = "btn rounded  mx-3 px-3 py-1 fs-5 text-white";
  goBackBtn.style.backgroundColor = "rgba(17, 16, 31,0.5)";
  goBackBtn.style.height = "40px";
  goBackBtn.innerHTML = `<i class="fa-solid fa-arrow-left-long"></i>`;
  goBackBtn.addEventListener("click", function () {
    showQuestions(localQuestionSet[index], index);
  });
  devDisplayHeader.appendChild(goBackBtn);

  const toPreviousBtn = document.createElement("button");
  toPreviousBtn.classList =
    "btn rounded me-3 px-3 py-1 fs-5 text-white bg-opacity-75";
  toPreviousBtn.style.backgroundColor = "rgba(17, 16, 31,0.5)";
  toPreviousBtn.style.height = "40px";
  toPreviousBtn.innerHTML = `Previous`;
  toPreviousBtn.addEventListener("click", function () {
    if (Object.values(questionCategory).length === 1) {
      return;
    }

    if (questionIndex === 1) {
      questionIndex = Object.values(questionCategory).length;

      showDevDisplay(questionCategory, questionIndex, index);
    }
    showDevDisplay(questionCategory, questionIndex - 1, index);
  });
  devDisplayHeader.appendChild(toPreviousBtn);

  const toNextBtn = document.createElement("button");
  toNextBtn.classList = "btn rounded px-3 py-1 fs-5 text-white";
  toNextBtn.style.backgroundColor = "rgba(17, 16, 31,0.5)";
  toNextBtn.style.height = "40px";
  toNextBtn.innerHTML = `Next`;

  toNextBtn.addEventListener("click", function () {
    if (Object.values(questionCategory).length === 1) {
      return;
    }

    showDevDisplay(questionCategory, questionIndex + 1, index);
  });
  devDisplayHeader.appendChild(toNextBtn);
  devDisplayLeft.appendChild(devDisplayHeader);

  const questionTitle = document.createElement("p");
  questionTitle.classList = "fs-2 text-white mt-4";
  questionTitle.textContent = questionCategory[questionIndex].fun_name.slice(
    0,
    questionCategory[questionIndex].fun_name.indexOf(" ")
  );

  devDisplayLeft.appendChild(questionTitle);

  const questionDescription = document.createElement("p");
  questionDescription.classList = "text-white my-3";
  questionDescription.textContent = questionCategory[questionIndex].text;
  devDisplayLeft.appendChild(questionDescription);

  const exampleList = document.createElement("ul");
  questionCategory[questionIndex].examples.map((example) => {
    exampleList.innerHTML += `
      <li class="text-white">
        ${example}
      </li>
    `;
  });
  devDisplayLeft.appendChild(exampleList);

  const resultsTitle = document.createElement("p");
  resultsTitle.classList = "text-white fs-4";
  resultsTitle.innerHTML = `Results <i class="fa-solid fa-circle-check text-warning fs-5"></i>`;
  devDisplayLeft.appendChild(resultsTitle);

  const resultBox = document.createElement("div");
  resultBox.classList =
    "w-100 rounded p-3 row justify-content-between align-items-start resultBox flex-wrap";
  resultBox.style.height = "270px";
  resultBox.style.backgroundColor = "rgba(17, 16, 31,0.5)";
  resultBox.style.overflowY = "auto";
  resultBox.style.overflowX = "hidden"; // Optional: Hide horizontal overflow
  devDisplayLeft.appendChild(resultBox);

  setOfQuestions.appendChild(devDisplayLeft);

  const devDisplayRight = document.createElement("div");
  devDisplayRight.classList = "col-12 col-md-6 mt-3 mt-md-0";

  const codeArea = document.createElement("div");
  codeArea.classList = "rounded-3";
  codeArea.id = "code-area";
  callCodeEditor(questionCategory[questionIndex], index);
  devDisplayRight.appendChild(codeArea);

  const confirmBtn = document.createElement("button");
  confirmBtn.classList = "btn rounded px-3 mt-3 py-1 fs-5 text-white float-end";
  confirmBtn.style.backgroundColor = "rgba(17, 16, 31,0.5)";
  confirmBtn.style.height = "40px";
  confirmBtn.textContent = "Confirm";
  confirmBtn.addEventListener("click", function () {
    checkResult(questionCategory[questionIndex], index);
  });

  devDisplayRight.appendChild(confirmBtn);

  // const form = document.createElement("form");
  // form.addEventListener("submit", (e) => {
  //   e.preventDefault();
  // });

  // form.classList =
  //   "d-flex flex-column align-items-end justiy-content-start gap-3";

  // form.innerHTML = `
  //   <textarea id="textArea" name="w3review" class="w-100 border-0 rounded-3 text-white p-3"
  //   style="height: 400px; background-color: rgba(17, 16, 31,0.5)">function ${questionCategory[questionIndex].fun_name} {

  //   }
  //   </textarea>
  //   <br>
  //   <button class="btn rounded ms-3 px-3 py-1 fs-5 text-white "
  //            style="background-color: rgba(17, 16, 31,0.5)" onclick="checkAnswer()">
  //     Submimt
  //   </button>
  // `;
  // devDisplayRight.appendChild(form);

  setOfQuestions.appendChild(devDisplayRight);

  topicSite.classList.add("d-none");

  if (questionIndex === 1) {
    toPreviousBtn.classList.add("d-none");
    return;
  }

  if (questionIndex === Object.values(questionCategory).length) {
    toNextBtn.classList.add("d-none");
    return;
  }
};

// checkAnswer funtion

const checkAnswer = () => {
  let textArea = document.getElementById("textArea").value;

  textArea += textArea.substring(8, textArea.indexOf("{"));
  console.log(textArea);
};

// init function

const init = () => {
  showQuestionCategery();
};

// get local

const setLocal = () => {
  localStorage.setItem("questionSet", JSON.stringify(localQuestionSet));
};
