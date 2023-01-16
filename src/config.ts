const config = {
  rootImageFileName: "startrummetlowres.jpg",
  tasks: {
    a: {
      image: "a.jpg",
      questions: [
        { html: "<p>K<sub>MOD,P<o:p></o:p></sub></p>" },
        { html: "<p>K<sub>MOD,Ø<o:p></o:p></sub></p>" },
      ],
      coords: "0,600,400,1100",
      ht: "Y=x<sup>2",
      acceptableAnswers: [
        //CLOSE WHEN..
        { equalTo: 4 },
        { lessThanOrEqualTo: 6, greaterThanOrEqualTo: 4 },
      ],
      helpText: "jkl",
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
        { in: [1, 2] },
      ],
    },
  },
  dynamicImages: [
    {
      answersRequired: {
        a0: { equalTo: 4 },
        a1: { lessThanOrEqualTo: 6, greaterThanOrEqualTo: 4 },
      },
      fileName: "fri_sav.png",
      position: { left: "0px", top: "696px" },
    },
  ],
};
export { config };
//SUPABASE?!
