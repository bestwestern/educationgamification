const config = {
  rootImageFileName: "startrummet.jpg",
  tasks: {
    a: {
      image: "a.jpg",
      questions: [{ text: "2+2" }, { text: "2+4" }],
      coords: "0,400,400,700",

      acceptableAnswers: [
        { equalTo: 4 },
        { lessThanOrEqualTo: 6, greaterThanOrEqualTo: 4 },
      ],
    },
    b: {
      image: "b.jpg",
      questions: [{ text: "Bjælke 1" }, { text: "Bjælke 2" }],
      coords: "900,200,1100,900",
      secondImage: {
        fileName: "b2.jpg",
        secondaryQuestions: [{ text: "Hvilken bjælke vælger du?" }],
        answersRequired: [
          { equalTo: 4 },
          { lessThanOrEqualTo: 6, greaterThanOrEqualTo: 4 },
        ],
      },
      acceptableAnswers: [
        { equalTo: 4 },
        { lessThanOrEqualTo: 6, greaterThanOrEqualTo: 4 },
      ],
    },
  },
  dynamicImages: [
    {
      answersRequired: {
        a0: { equalTo: 4 },
        a1: { lessThanOrEqualTo: 6, greaterThanOrEqualTo: 4 },
      },
      fileName: "icon.png",
      position: { left: "300px", top: "200px" },
    },
  ],
};
export { config };
