const config = {
  rootImageFileName: "startrummetlowres.jpg",
  tasks: {
    a: {
      image: "sav.jpg",
      questions: [
        { html: "<p>K<sub>MOD,P<o:p></o:p></sub></p>" },
        { html: "<p>K<sub>MOD,Ø<o:p></o:p></sub></p>" },
      ],
      shape: "circle",
      coords: "180,760,150",
      ht: "Y=x<sup>2",
      acceptableAnswers: [
        //CLOSE WHEN..
        { equalTo: 0.6 },
        { equalTo: 1.1 },
      ],
      helpText: "jkl",
    },
    b: {
      image: "b.jpg",
      questions: [{ text: "Bjælke 1" }, { text: "Bjælke 2" }],
      coords: "900,700,1100,900",
      secondImage: {
        fileName: "b2.jpg",
        secondaryQuestions: [{ text: "Hvilken bjælke vælger du?" }],
        answersRequired: [
          { lessThanOrEqualTo: 4, greaterThanOrEqualTo: 3.9 },
          { lessThanOrEqualTo: 1.1, greaterThanOrEqualTo: 1.1 },
        ],
      },
      acceptableAnswers: [
        { lessThanOrEqualTo: 4, greaterThanOrEqualTo: 3.9 },
        { lessThanOrEqualTo: 1.1, greaterThanOrEqualTo: 1.1 },
        { in: [1, 2] },
      ],
    },
    c: {
      image: "c_kuglelaas.jpg",
      coords: "250,200,350,300",
      questions: [{ text: "Svar" }],
      acceptableAnswers: [{ equalTo: 5.892 }],
    },
    d: {
      image: "D_01_bolte_i_bjaelke.jpg",
      wrongAnswerImage: "billeder/D.02 bolte i bjælke.jpg",
      coords: "350,500,450,600",
      questions: [{ text: "h1: (h2=300-h1)" }],
      requiredAnswersToShowThisTask: [{ b2: { in: [1, 2] } }],
      imageIfNotRequiredAnswers: "E_bjaelke_foerst.jpg",
      acceptableAnswers: [{ lessThanOrEqualTo: 250, greaterThanOrEqualTo: 50 }],
    },
    f: {
      enableWhen: [{ b2: { in: [1, 2] } }],
      image: "F_01_Saddelhak.jpg",
      coords: "400,280,450,380",
      questions: [{ text: "Svar" }],
      requiredAnswersToShowThisTask: [
        { a0: { equalTo: 0.6 } },
        { a1: { equalTo: 1.1 } },
      ],
      imageIfNotRequiredAnswers: "G_Faa_saven_fri_foerst.jpg",
      acceptableAnswers: [{ equalTo: 5.892 }],
    },
  },
  dynamicImages: [
    {
      answersRequired: {
        a0: { equalTo: 0.6 },
        a1: { equalTo: 1.1 },
      },
      fileName: "fri_sav.png",
      position: { left: "0px", top: "696px" },
    },
    {
      answersRequired: {
        b0: { lessThanOrEqualTo: 4, greaterThanOrEqualTo: 3.9 },
        b1: { lessThanOrEqualTo: 1.1, greaterThanOrEqualTo: 1.1 },
        b2: { equalTo: 1 },
      },
      fileName: "storbjal.JPG",
      position: { left: "250px", top: "200px" },
    },
  ],
};
export { config };
//SUPABASE?!

// preload all images in invisible div
// go back skal annullere task hvis der er valgt task
//
