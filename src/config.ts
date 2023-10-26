const config = {
  rootImageFileName: "start.jpg",
  tasks: {
    a: {
      image: "a_sav.jpg",
      questions: [
        { html: "<p>K<sub>MOD,P<o:p></o:p></sub></p>" },
        { html: "<p>K<sub>MOD,Ø<o:p></o:p></sub></p>" },
      ],
      shape: "circle",
      coords: "103,512,100",
      ht: "Y=x<sup>2",
      acceptableAnswers: [
        //CLOSE WHEN..
        { equalTo: 0.6 },
        { equalTo: 1.1 },
      ],
      helpText: "jkl",
    },
    b: {
      image: "b1_bjaelke.jpg",
      questions: [{ text: "Bjælke 1" }, { text: "Bjælke 2" }],
      coords: "370,480,800,900",
      secondImage: {
        fileName: "b2_bjaelke.jpg",
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
      shape: "circle",
      coords: "200,150,50",
      questions: [{ text: "Svar" }],
      acceptableAnswers: [{ equalTo: 5.892 }],
      afterAnswerPictures: [
        {
          fileName: "finish.mov",
          answersRequired: [{ equalTo: 5.892 }],
        },
      ],
    },
    d: {
      image: "d_bolte.jpg",
      wrongAnswerImage: "d_bolte_wrong.jpg",
      coords: "260,360,100",
      shape: "circle",
      questions: [{ text: "h1: (h2=300-h1)" }],
      requiredAnswersToShowThisTask: [{ b2: { in: [1, 2] } }],
      imageIfNotRequiredAnswers: "d_bolte_hint.jpg",
      acceptableAnswers: [{ lessThanOrEqualTo: 250, greaterThanOrEqualTo: 50 }],
    },
    f: {
      enableWhen: [{ b2: { in: [1, 2] } }],
      image: "f_saddelhak.jpg",
      shape: "circle",
      coords: "320,225,100",
      questions: [{ text: "Svar" }],
      requiredAnswersToShowThisTask: [
        { a0: { equalTo: 0.6 } },
        { a1: { equalTo: 1.1 } },
      ],
      afterAnswerPictures: [
        {
          fileName: "f_saddelhak2.jpg",
          answersRequired: [
            { lessThanOrEqualTo: 0.5, greaterThanOrEqualTo: 0 },
          ],
        },
        {
          fileName: "f_saddelhak3.jpg",
          answersRequired: [
            { lessThanOrEqualTo: 1.5, greaterThanOrEqualTo: 0.5000001 },
          ],
        },
        {
          fileName: "f_saddelhak4.jpg",
          answersRequired: [
            { lessThanOrEqualTo: 2.5, greaterThanOrEqualTo: 1.5000001 },
          ],
        },
        {
          fileName: "f_saddelhak5.jpg",
          answersRequired: [
            { lessThanOrEqualTo: 3.9999999, greaterThanOrEqualTo: 2.5000001 },
          ],
        },
        {
          fileName: "f_saddelhak6.jpg",
          answersRequired: [{ lessThanOrEqualTo: 5, greaterThanOrEqualTo: 4 }],
        },
      ],
      imageIfNotRequiredAnswers: "f_saddel_sav_fri_foerst.jpg",
      acceptableAnswers: [{ greaterThanOrEqualTo: 0, lessThanOrEqualTo: 5 }],
      wrongAnswerImage: "f_saddelhak_wrong.jpg",
    },
  },
  dynamicImages: [
    {
      answersRequired: {
        a0: { equalTo: 0.6 },
        a1: { equalTo: 1.1 },
      },
      fileName: "a_fri_sav.png",
      position: { left: "36px", top: "477px" },
    },
    {
      answersRequired: {
        b0: { lessThanOrEqualTo: 4, greaterThanOrEqualTo: 3.9 },
        b1: { lessThanOrEqualTo: 1.1, greaterThanOrEqualTo: 1.1 },
        b2: { equalTo: 1 },
      },
      fileName: "b_lille_bjaelke.png",
      position: { left: "285px", top: "249px" },
    },
    {
      answersRequired: {
        b0: { lessThanOrEqualTo: 4, greaterThanOrEqualTo: 3.9 },
        b1: { lessThanOrEqualTo: 1.1, greaterThanOrEqualTo: 1.1 },
        b2: { equalTo: 2 },
      },
      fileName: "b_stor_bjaelke.png",
      position: { left: "279px", top: "240px" },
    },
    {
      answersRequired: {
        b0: { lessThanOrEqualTo: 4, greaterThanOrEqualTo: 3.9 },
        b1: { lessThanOrEqualTo: 1.1, greaterThanOrEqualTo: 1.1 },
        b2: { equalTo: 2 },
      },
      fileName: "b_stor_bjaelke_vaek.png",
      position: { left: "350px", top: "505px" },
    },
    {
      answersRequired: {
        b0: { lessThanOrEqualTo: 4, greaterThanOrEqualTo: 3.9 },
        b1: { lessThanOrEqualTo: 1.1, greaterThanOrEqualTo: 1.1 },
        b2: { equalTo: 1 },
      },
      fileName: "b_lille_bjaelke_vaek.png",
      position: { left: "358px", top: "575px" },
    },
    {
      answersRequired: {
        b2: { equalTo: 1 },
        d0: { lessThanOrEqualTo: 250, greaterThanOrEqualTo: 150 },
      },
      fileName: "d_bolt_i_lille.png",
      position: { left: "245px", top: "256px" },
    },
    {
      answersRequired: {
        b2: { equalTo: 2 },
        d0: { lessThanOrEqualTo: 250, greaterThanOrEqualTo: 150 },
      },
      fileName: "d_bolt_i_stor.png",
      position: { left: "264px", top: "243px" },
    },
    {
      answersRequired: {
        b2: { equalTo: 2 },
        d0: { lessThanOrEqualTo: 250, greaterThanOrEqualTo: 150 },
      },
      fileName: "d_bolt_i_stor.png",
      position: { left: "264px", top: "243px" },
    },
    {
      answersRequired: {
        f0: { lessThanOrEqualTo: 0.5, greaterThanOrEqualTo: 0 },
      },
      fileName: "f_lille_saddelhak2.png",
      position: { left: "254px", top: "262px" },
    },
    {
      answersRequired: {
        f0: { lessThanOrEqualTo: 1.5, greaterThanOrEqualTo: 0.500001 },
      },
      fileName: "f_lille_saddelhak3.png",
      position: { left: "253px", top: "262px" },
    },
    {
      answersRequired: {
        f0: { lessThanOrEqualTo: 2.5, greaterThanOrEqualTo: 1.5000001 },
      },
      fileName: "f_lille_saddelhak4.png",
      position: { left: "254px", top: "262px" },
    },
    {
      answersRequired: {
        f0: { lessThanOrEqualTo: 3.9999999, greaterThanOrEqualTo: 2.5000001 },
      },
      fileName: "f_lille_saddelhak5.png",
      position: { left: "254px", top: "262px" },
    },
    {
      answersRequired: {
        f0: { lessThanOrEqualTo: 5, greaterThanOrEqualTo: 4 },
      },
      fileName: "f_lille_saddelhak6.png",
      position: { left: "256px", top: "264px" },
    },
  ],
};
export { config };
//SUPABASE?!

// preload all images in invisible div
// go back skal annullere task hvis der er valgt task
// 285,199
/*       { lessThanOrEqualTo: 0.5, greaterThanOrEqualTo: 0 },
          ],
        },
        {
          fileName: "f_saddelhak3.jpg",
          answersRequired: [
            { lessThanOrEqualTo: 1.5, greaterThanOrEqualTo: 0.5000001 },
          ],
        },
        {
          fileName: "f_saddelhak4.jpg",
          answersRequired: [
            { lessThanOrEqualTo: 2.5, greaterThanOrEqualTo: 1.5000001 },
          ],
        },
        {
          fileName: "f_saddelhak5.jpg",
          answersRequired: [
            { lessThanOrEqualTo: 3.9999999, greaterThanOrEqualTo: 2.5000001 },
          ],
        },
        {
          fileName: "f_saddelhak6.jpg",
          answersRequired: [{ lessThanOrEqualTo: 5, greaterThanOrEqualTo: 4 }],*/
