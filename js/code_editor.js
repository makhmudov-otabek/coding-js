let code = "";

const changeCompletedQuestionsCount = JSON.parse(
  localStorage.getItem("completedQuestionsCount")
);

require.config({
  paths: {
    vs: "https://unpkg.com/monaco-editor@0.12.0/min/vs",
  },
});

window.MonacoEnvironment = { getWorkerUrl: () => proxy };

let proxy = URL.createObjectURL(
  new Blob(
    [
      `
self.MonacoEnvironment = {
baseUrl: 'https://unpkg.com/monaco-editor@0.12.0/min/'
};
importScripts('https://unpkg.com/monaco-editor@0.12.0/min/vs/base/worker/workerMain.js');
`,
    ],
    { type: "text/javascript" }
  )
);

const callCodeEditor = (question) => {
  require(["vs/editor/editor.main"], function () {
    let editor = monaco.editor.create(document.getElementById("code-area"), {
      value: [
        `function ${question.fun_name} {

}`,
      ].join("\n"),
      language: "javascript",
      theme: "vs-dark",
    });

    editor.onDidChangeModelContent(() => {
      code = editor.getValue();
    });
  });

  // code += question.fun_name;
};

let str = "";
const checkResult = (obj, questionCategoryindex) => {
  console.log(code);

  const resultBox = document.querySelector(".resultBox");
  resultBox.innerHTML = "";

  let countFail = 0;

  obj.check.map((check, index) => {
    const str =
      code + obj.fun_name.slice(0, obj.fun_name.indexOf(" ")) + `(${check})`;
    const result = eval(str);

    const container = document.createElement("div");
    container.classList = "example-result-container";

    const example = document.createElement("div");
    example.classList = "text-white my-2 example";
    example.textContent = obj.examples[index];
    container.appendChild(example);

    const showResult = document.createElement("div");
    showResult.classList = "text-white my-2  rounded py-2 px-3 showResult";
    showResult.textContent = `Your answer:  + ${result}`;
    container.appendChild(showResult);

    if (obj.answers[index] === result) {
      showResult.classList.add("bg-success");
    } else {
      showResult.classList.add("bg-danger");
      countFail++;
    }

    resultBox.appendChild(container);
  });

  if (countFail === 0) {
    if (obj.solved === false) {
      completedQuestionsCount[questionCategoryindex - 1].completed++;
    }

    obj.solved = true;

    console.log(completedQuestionsCount);

    setLocal();
    // else {
    //   completedQuestionsCount[questionCategoryindex - 1].completed++;

    //   obj.solved = true;

    //   console.log(completedQuestionsCount);

    //   setLocal();
    // }

    localStorage.setItem(
      "completedQuestionsCount",
      JSON.stringify(completedQuestionsCount)
    );
  }
};
