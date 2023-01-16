import { useState, useEffect } from "react";
import { checkValue } from "./utils";
export default (props) => {
  const { currentTaskId, config, route, setCurrentTaskId } = props;
  console.log(props);
  const not_num_period = new RegExp("[^0-9.]");
  useEffect(() => {}, []);
  const [answers, setAnswers] = useState([]);
  const currentTask = config.tasks[currentTaskId];
  const { image, questions, secondImage, acceptableAnswers } = currentTask;
  const answerChange = (e, index) => {
    const newAnswer = e.target.value
      .replace(",", ".")
      .replace(not_num_period, "");
    let newAnswers = [...answers];
    newAnswers[index] = newAnswer;

    const allAnsweredOk = !acceptableAnswers.find(
      (requirement, requirementIndex) => {
        const answer = newAnswers[requirementIndex];
        if (answer === undefined) return true;
        return !checkValue(answer, requirement);
      }
    );
    if (allAnsweredOk) answerClick();
    else setAnswers(newAnswers);
  };
  const closeClick = () => {
    setCurrentTaskId(null);
  };
  const answerClick = (e) => {
    const r = { ...route };
    answers.forEach((answer, index) => {
      r[currentTaskId + index] = answer;
    });

    let url = location.origin + "/?";
    Object.entries(r).forEach(([id, answer]) => {
      url += id + "=" + answer + "&";
    });
    location.href = url.substring(0, url.length - 1);
    setTimeout(() => {
      location.reload();
    }, 50);
  };
  const answerCount = answers.filter(
    (answer) => answer && answer.length
  ).length;
  console.log(route);
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
  return (
    <div className="flex justify-center">
      <div className="sm:w-1 md:w-1/2 ">
        <div className="relative">
          <button
            type="button"
            onClick={closeClick}
            className=" bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 absolute right-0 border-2"
          >
            <span>Annuller</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {image && <img className="pt-10" src={"/" + image}></img>}
        </div>
        <br />
        <br />
        <br />
        {questions.map((question, index) => {
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
