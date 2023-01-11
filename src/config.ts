const config = {
  rootImageFileName: "startrummet.jpg",
  tasks: {
    a: {
      image: "sas.jpg",
      questions: [{ text: "2+2" }, { text: "2+4" }],
      coords: "0,400,400,700",
      acceptableAnswers: [[4, 6]],
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
