const objectLength = (obj) => {
  return Object.keys(obj).length;
};

var questionSet = {
  1: {
    id: "1",
    title: "Sonlar",
    questionsLenght: objectLength(begin1),
    questions: begin1,
  },
  2: {
    id: "2",
    title: "Array-1",
    questionsLenght: objectLength(array1),
    questions: array1,
  },
  3: {
    id: "3",
    title: "Array-2",
    questionsLenght: objectLength(array2),
    questions: array2,
  },
  4: {
    id: "4",
    title: "String-1",
    questionsLenght: objectLength(string1),
    questions: string1,
  },
  5: {
    id: "5",
    title: "String-2",
    questionsLenght: objectLength(string2),
    questions: string2,
  },
  6: {
    id: "6",
    title: "Rekursiya",
    questionsLenght: objectLength(recursion),
    questions: recursion,
  },
};
