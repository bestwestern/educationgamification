import { useState, useEffect } from "react";
import { checkValue } from "./utils";
export default (props) => {
  const { currentTaskId, config, route, setRoute, setCurrentTaskId } = props;
  const not_num_period = new RegExp("[^0-9.]");
  useEffect(() => {}, []);
  const [answers, setAnswers] = useState([]);
  const [answeredWrong, setAnsweredWrong] = useState(false);
  const [imageToShowBeforeGoingBack, setImageToShowBeforeGoingBack] =
    useState();
  const currentTask = config.tasks[currentTaskId];
  const {
    image,
    questions,
    secondImage,
    acceptableAnswers,
    conditionalAccaptableAnswersArray,
    requiredAnswersToShowThisTask,
    imageIfNotRequiredAnswers,
    wrongAnswerImage,
    afterAnswerPictures,
  } = currentTask;
  const answerChange = (e, index) => {
    const newAnswer = e.target.value
      .replace(",", ".")
      .replace(not_num_period, "");
    let newAnswers = [...answers];
    newAnswers[index] = newAnswer;

    setAnswers(newAnswers);
  };
  const closeClick = () => {
    setCurrentTaskId(null);
  };
  const answerClick = () => {
    const r = { ...route };
    answers.forEach((answer, index) => {
      r[currentTaskId + index] = answer;
    });
    let conditionalAcceptableAnswers = [];
    if (conditionalAccaptableAnswersArray) {
      const conditionalAcceptableAnswersObject =
        conditionalAccaptableAnswersArray.find(({ enableWhen }) => {
          const enableCondition = enableWhen.find((requirementProperty) => {
            let missingAnswerFound = false;
            for (var answerProp in requirementProperty) {
              const answer = route[answerProp] && Number(route[answerProp]);
              const valueOk = checkValue(
                answer,
                requirementProperty[answerProp]
              );
              if (!valueOk) missingAnswerFound = true;
            }
            return missingAnswerFound;
          });
          if (enableCondition) return false;
          return true;
        });
      if (conditionalAcceptableAnswersObject)
        conditionalAcceptableAnswers =
          conditionalAcceptableAnswersObject.acceptableAnswersArray;
    }
    console.log(answers);
    let allAnsweredOk = !(
      acceptableAnswers || conditionalAcceptableAnswers
    ).find((requirement, requirementIndex) => {
      const answer = answers[requirementIndex];
      console.log({ answer, requirement });
      if (answer === undefined) return true;
      return !checkValue(answer, requirement);
    });
    if (allAnsweredOk) {
      const url =
        location.origin +
        "/?" +
        Object.entries(r)
          .map(([id, answer]) => id + "=" + answer)
          .join("&");
      if (afterAnswerPictures) {
        const el = afterAnswerPictures.find((el) => {
          const { answersRequired, enableWhen } = el;
          const pictureRequirementThisTaskOk = !answersRequired.find(
            (requirement, requirementIndex) => {
              const answer = answers[requirementIndex];
              if (answer === undefined) return true;
              return !checkValue(answer, requirement);
            }
          );
          const pictureRequirementOtherTasksOk = !enableWhen?.find(
            (requirementProperty) => {
              console.log({ requirementProperty });
              let missingAnswerFound = false;
              for (var answerProp in requirementProperty) {
                const answer = Number(route[answerProp]);
                const valueOk = checkValue(
                  answer,
                  requirementProperty[answerProp]
                );
                console.log({ valueOk });
                if (!valueOk) missingAnswerFound = true;
              }
              return missingAnswerFound;
            }
          );
          return pictureRequirementThisTaskOk && pictureRequirementOtherTasksOk;
        });
        console.log({ el });
        if (el) {
          setImageToShowBeforeGoingBack({
            fileName: el.fileName,
            url,
            r,
            image,
          });
        } else {
          setCurrentTaskId(null);
          setRoute(r);
          history.pushState(null, "", url);
        }
      } else {
        setCurrentTaskId(null);
        setRoute(r);
        history.pushState(null, "", url);
      }
    } else {
      setAnsweredWrong(true);
    }
  };

  // const answerCount = answers.filter(
  //   (answer) => answer && answer.length
  // ).length;

  let secondImageComponent = null;
  if (secondImage) {
    const { answersRequired, fileName, secondaryQuestions } = secondImage;
    const hide = answersRequired.find((requirement, index) => {
      const answer = Number(answers[index]);
      const valueOk = checkValue(answer, requirement);
      if (isNaN(answer)) return true;
      return !valueOk;
    });
    if (!hide)
      secondImageComponent = (
        <>
          {fileName && <img className="pt-10" src={"/" + fileName}></img>}
          {secondaryQuestions.map((question, index) => {
            const { text } = question;

            return (
              <div key={index + text}>
                <div className="mb-6">
                  <label
                    htmlFor={"q" + index}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {text}
                  </label>
                  <input
                    type="text"
                    id={"q" + index}
                    onInput={(e) => answerChange(e, index + questions.length)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
            );
          })}
        </>
      );
  }
  if (imageToShowBeforeGoingBack) {
    const { fileName, url, r } = imageToShowBeforeGoingBack;
    const finished = fileName === "finish.mov";
    const isVideo = fileName.substr(-4) === ".mov";
    if (isVideo)
      return (
        <>
          <video autoPlay={true} width={"1000px"}>
            <source src={fileName} type="video/ogg" />
          </video>
          <br />
          <br />
          <button
            type="button"
            onClick={(e) => {
              setCurrentTaskId(null);
              if (finished) {
                setRoute({});
                history.pushState(null, "", location.origin);
              }
            }}
            className=" text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            {finished ? "Tillykke!" : "Gå tilbage"}
          </button>
        </>
      );
    return (
      <div className="flex justify-center">
        <div className="sm:w-1 md:w-1/2 ">
          <div className="relative">
            <img className="pt-10" src={"/" + fileName}></img>
            <div className="sm:w-1 md:w-1/2 ">
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => {
                    setCurrentTaskId(null);
                    setRoute(r);
                    history.pushState(null, "", url);
                  }}
                  className="absolute right-0 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  const answerMissingToShow = requiredAnswersToShowThisTask?.find(
    (requirementProperty) => {
      let missingAnswerFound = false;
      for (var answerProp in requirementProperty) {
        const answer = Number(route[answerProp]);
        const valueOk = checkValue(answer, requirementProperty[answerProp]);
        if (!valueOk) missingAnswerFound = true;
      }
      return missingAnswerFound;
    }
  );
  const showingQuestions =
    !answeredWrong && (!requiredAnswersToShowThisTask || !answerMissingToShow);
  return (
    <div className="flex justify-center">
      <button
        type="button"
        onClick={closeClick}
        className="absolute left-0 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        Hjælp
      </button>
      <div className="sm:w-1 md:w-1/2 ">
        <div className="relative">
          <button
            type="button"
            onClick={closeClick}
            className="fixed right-0 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Annuller
          </button>
          {showingQuestions && image && (
            <img className="pt-10" src={"/" + image}></img>
          )}
          {answeredWrong && wrongAnswerImage && (
            <>
              <img className="pt-10" src={"/" + wrongAnswerImage}></img>
              <div className="sm:w-1 md:w-1/2 ">
                <div className="relative">
                  <button
                    type="button"
                    onClick={(e) => {
                      setAnswers([]);
                      setAnsweredWrong(false);
                    }}
                    className="absolute right-0 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    Ok
                  </button>
                </div>
              </div>
            </>
          )}
          {answerMissingToShow && imageIfNotRequiredAnswers && (
            <img className="pt-10" src={"/" + imageIfNotRequiredAnswers}></img>
          )}
        </div>
        <br />
        <br />
        <br />

        {showingQuestions &&
          questions
            .filter(({ enableWhen }) => {
              if (enableWhen) {
                const hideQuestion = enableWhen.find((requirementProperty) => {
                  let missingAnswerFound = false;
                  for (var answerProp in requirementProperty) {
                    const answer =
                      route[answerProp] && Number(route[answerProp]);
                    const valueOk = checkValue(
                      answer,
                      requirementProperty[answerProp]
                    );
                    if (!valueOk) missingAnswerFound = true;
                  }
                  return missingAnswerFound;
                });
                if (hideQuestion) return false;
              }
              return true;
            })
            .map((question, index) => {
              const { text, html } = question;

              return (
                <div key={index}>
                  <div dangerouslySetInnerHTML={{ __html: html }}></div>
                  <div className="mb-6">
                    <label
                      htmlFor={"q" + index}
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {text}
                    </label>
                    <input
                      autoFocus={!index}
                      disabled={!!secondImageComponent}
                      type="text"
                      value={answers[index] === undefined ? "" : answers[index]}
                      id={"q" + index}
                      onInput={(e) => answerChange(e, index)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>
              );
            })}
        {secondImageComponent}
        <div className="sm:w-1 md:w-1/2 ">
          <div className="relative">
            {showingQuestions && (
              <button
                type="button"
                onClick={answerClick}
                className="absolute right-0 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Angiv svar
              </button>
            )}
            {answerMissingToShow && (
              <button
                type="button"
                onClick={(e) => location.reload()}
                className="absolute right-0 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Ok
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

{
  /* <area
  shape="rect"
  coords="290,172,333,250"
  alt="Phone"
  href="phone.htm"
/>
<area
  shape="circle"
  coords="337,300,44"
  alt="Cup of coffee"
  href="coffee.htm"
/> */
}
