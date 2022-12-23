import { useState, useEffect } from "react";
export default (props) => {
  const { currentTaskId, config, route } = props;
  console.log(props);
  useEffect(() => {}, []);
  const [answers, setAnswers] = useState([]);
  const currentTask = config.tasks[currentTaskId];
  const { image, questions } = currentTask;
  const answerChange = (e, index) => {
    console.log("cha");
    const newAnswer = e.target.value;
    const newAnswers = [...answers];
    newAnswers[index] = newAnswer;
    setAnswers(newAnswers);
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
    // setTimeout(() => {
    //   location.reload();
    // }, 50);
  };
  const answerCount = answers.filter(
    (answer) => answer && answer.length
  ).length;
  console.log(route);
  return (
    <div
      style={{
        position: "absolute",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      }}
    >
      {image && <img src={"/" + image}></img>}
      <br />
      <br />
      <br />
      {questions.map((question, index) => {
        const { text } = question;
        return (
          <div key={index + text}>
            <label htmlFor={index.toString()}>{text}</label>
            <input
              type="text"
              id={index.toString()}
              onInput={(e) => answerChange(e, index)}
            ></input>
          </div>
        );
      })}
      {answerCount === questions.length ? (
        <button type="button" onClick={answerClick}>
          Svar
        </button>
      ) : (
        <span>svar på alle spørgsmål</span>
      )}
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
