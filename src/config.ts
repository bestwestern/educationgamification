const config = {
  rootImageFileName: "start.jpg",
  tasks: {
    a: {
      image: "a_sav.jpg",
      questions: [
        { html: "<p>K<sub>MOD,P<o:p></o:p></sub></p>" },
        { html: "<p>K<sub>MOD,Ø<o:p></o:p></sub></p>" },
      ],
      coords: [62, 428, 160, 600],
      ht: "Y=x<sup>2",
      acceptableAnswers: [{ equalTo: 0.6 }, { equalTo: 1.1 }],
      wrongAnswerImage: "a2forkertsvar.jpg",
    },
    b: {
      image: "b1_bjaelke.jpg",
      questions: [{ text: "Bjælke 1" }, { text: "Bjælke 2" }],
      coords: [317, 530, 780, 600],
      secondImage: {
        fileName: "b2_bjaelke.jpg",
        secondaryQuestions: [{ text: "Hvilken bjælke vælger du?" }],
        answersRequired: [
          { lessThanOrEqualTo: 1.2, greaterThanOrEqualTo: 1.1 },
          { greaterThanOrEqualTo: 3.9, lessThanOrEqualTo: 4.0 },
        ],
      },
      acceptableAnswers: [
        { lessThanOrEqualTo: 1.2, greaterThanOrEqualTo: 1.1 },
        { greaterThanOrEqualTo: 3.9, lessThanOrEqualTo: 4.0 },
        { in: [1, 2] },
      ],
      wrongAnswerImage: "b2_2forkertsvar.jpg",
    },
    c: {
      wrongAnswerImage: "c_forkertsvar.jpg",
      image: "c_kuglelaas.jpg",
      coords: [180, 160, 230, 240],
      questions: [{ text: "Svar" }],
      acceptableAnswers: [{ equalTo: 5.892 }],
      afterAnswerPictures: [
        //første hvor enableWhen er opfyldt vises - så tag strengeste krav først
        {
          enableWhen: [
            { b2: { equalTo: 2 } },
            { a0: { equalTo: 0.6 } },
            { d0: { greaterThan: 150, lessThanOrEqualTo: 250 } },
            { f0: { greaterThanOrEqualTo: 4, lessThanOrEqualTo: 5 } },
          ],
          fileName: "finish.mov",
          answersRequired: [{ equalTo: 5.892 }],
        },
        {
          enableWhen: [
            { b2: { equalTo: 2 } },
            { a0: { equalTo: 0.6 } },
            { d0: { lessThan: 151 } },
            { f0: { greaterThanOrEqualTo: 4, lessThanOrEqualTo: 5 } },
          ],
          fileName: "video04_2.mov",
          answersRequired: [{ equalTo: 5.892 }],
        },
        {
          enableWhen: [
            { b2: { equalTo: 2 } },
            { a0: { equalTo: 0.6 } },
            { d0: { greaterThan: 150, lessThanOrEqualTo: 250 } },
            { f0: { equalTo: 0 } },
          ],
          fileName: "video04_3.mov",
          answersRequired: [{ equalTo: 5.892 }],
        },
        {
          enableWhen: [
            { b2: { equalTo: 2 } },
            { a0: { equalTo: 0.6 } },
            { d0: { greaterThan: 150, lessThanOrEqualTo: 250 } },
            { f0: { lessThan: 4 } },
          ],
          fileName: "video04_1.mov",
          answersRequired: [{ equalTo: 5.892 }],
        },
        {
          enableWhen: [
            { b2: { equalTo: 2 } },
            { a0: { equalTo: 0.6 } },
            { d0: { greaterThan: 150, lessThanOrEqualTo: 250 } },
            { f0: { greaterThan: 5 } },
          ],
          fileName: "video04_1.mov",
          answersRequired: [{ equalTo: 5.892 }],
        },
        {
          enableWhen: [
            { b2: { equalTo: 2 } },
            { d0: { lessThan: 250 } },
            { a0: { equalTo: 0.6 } },
          ],
          fileName: "video03_2.mov",
          answersRequired: [{ equalTo: 5.892 }],
        },
        {
          enableWhen: [
            { b2: { equalTo: 1 } },
            { d0: { lessThan: 400 } },
            { a0: { equalTo: 0.6 } },
          ],
          fileName: "video03_4.mov",
          answersRequired: [{ equalTo: 5.892 }],
        },
        {
          enableWhen: [{ b2: { equalTo: 2 } }, { d0: { lessThan: 400 } }],
          fileName: "video03.mov",
          answersRequired: [{ equalTo: 5.892 }],
        },
        {
          enableWhen: [{ b2: { equalTo: 1 } }, { d0: { lessThan: 400 } }],
          fileName: "video03_3.mov",
          answersRequired: [{ equalTo: 5.892 }],
        },
        {
          enableWhen: [{ b2: { equalTo: 2 } }, { a0: { equalTo: 0.6 } }],
          fileName: "video02_1.mov",
          answersRequired: [{ equalTo: 5.892 }],
        },
        {
          enableWhen: [{ b2: { equalTo: 2 } }],
          fileName: "video02.mov",
          answersRequired: [{ equalTo: 5.892 }],
        },
        {
          enableWhen: [{ b2: { equalTo: 1 } }, { a0: { equalTo: 0.6 } }],
          fileName: "video02_3.mov",
          answersRequired: [{ equalTo: 5.892 }],
        },
        {
          enableWhen: [{ b2: { equalTo: 1 } }],
          fileName: "video02_2.mov",
          answersRequired: [{ equalTo: 5.892 }],
        },
        {
          enableWhen: [{ a0: { equalTo: 0.6 } }],
          fileName: "video01_2.mov",
          answersRequired: [{ equalTo: 5.892 }],
        },
        {
          fileName: "video01.mov",
          answersRequired: [{ equalTo: 5.892 }],
        },
      ],
    },
    d: {
      image: "d_bolte.jpg",
      wrongAnswerImage: "d_bolte_wrong.jpg",
      coords: [240, 400, 305, 480],
      questions: [
        { text: "h1: (h2=300-h1)", enableWhen: [{ b2: { equalTo: 2 } }] },
        { text: "h1: (h2=160-h1)", enableWhen: [{ b2: { equalTo: 1 } }] },
      ],
      requiredAnswersToShowThisTask: [{ b2: { in: [1, 2] } }],
      imageIfNotRequiredAnswers: "d_bolte_hint.jpg",
      conditionalAccaptableAnswersArray: [
        {
          enableWhen: [{ b2: { equalTo: 2 } }],
          acceptableAnswersArray: [
            { lessThanOrEqualTo: 250, greaterThanOrEqualTo: 50 },
          ],
        },
        {
          enableWhen: [{ b2: { equalTo: 1 } }],
          acceptableAnswersArray: [
            { lessThanOrEqualTo: 130, greaterThanOrEqualTo: 30 },
          ],
        },
      ],
    },
    f: {
      enableWhen: [{ b2: { equalTo: 2 }, d0: { greaterThan: 0 } }],
      image: "f_saddelhak.jpg",
      coords: [240, 240, 300, 300],
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
        b0: { lessThanOrEqualTo: 1.2, greaterThanOrEqualTo: 1.1 },
        b1: { greaterThanOrEqualTo: 3.9, lessThanOrEqualTo: 4.0 },
        b2: { equalTo: 1 },
      },
      fileName: "b_lille_bjaelke.png",
      position: { left: "285px", top: "249px" },
    },
    {
      answersRequired: {
        b0: { lessThanOrEqualTo: 1.2, greaterThanOrEqualTo: 1.1 },
        b1: { greaterThanOrEqualTo: 3.9, lessThanOrEqualTo: 4.0 },
        b2: { equalTo: 2 },
        d0: { notAnswered: true },
      },
      fileName: "b_stor_bjaelke.png",
      position: { left: "279px", top: "240px" },
    },
    {
      answersRequired: {
        b0: { lessThanOrEqualTo: 1.2, greaterThanOrEqualTo: 1.1 },
        b1: { greaterThanOrEqualTo: 3.9, lessThanOrEqualTo: 4.0 },
        b2: { equalTo: 2 },
      },
      fileName: "b_stor_bjaelke_vaek.png",
      position: { left: "350px", top: "505px" },
    },
    {
      answersRequired: {
        b0: { lessThanOrEqualTo: 1.2, greaterThanOrEqualTo: 1.1 },
        b1: { greaterThanOrEqualTo: 3.9, lessThanOrEqualTo: 4.0 },
        b2: { equalTo: 1 },
      },
      fileName: "b_lille_bjaelke_vaek.png",
      position: { left: "358px", top: "575px" },
    },
    {
      answersRequired: {
        b2: { equalTo: 1 },
        d0: { lessThanOrEqualTo: 130, greaterThanOrEqualTo: 30 },
      },
      fileName: "d_bolt_i_lille.png",
      position: { left: "245px", top: "256px" },
    },
    {
      answersRequired: {
        b2: { equalTo: 2 },
        d0: { lessThanOrEqualTo: 250, greaterThanOrEqualTo: 50 },
        f0: { notAnswered: true },
      },
      fileName: "d_bolt_i_stor.png",
      position: { left: "264px", top: "243px" },
    },

    {
      answersRequired: {
        f0: { lessThanOrEqualTo: 0.5, greaterThanOrEqualTo: 0 },
      },
      fileName: "f_lille_saddelhak2.png",
      position: { left: "255px", top: "262px" },
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
      position: { left: "255px", top: "262px" },
    },
    {
      answersRequired: {
        f0: { lessThanOrEqualTo: 5, greaterThanOrEqualTo: 4 },
      },
      fileName: "f_lille_saddelhak6.png",
      position: { left: "257px", top: "264px" },
    },
  ],
};
export { config };
