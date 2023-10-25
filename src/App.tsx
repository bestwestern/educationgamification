import { useState, useEffect } from "react";
import { checkValue } from "./utils";
import { config } from "./config";
import Task from "./task";
export default () => {
  let paramString = window.location.search.split("?")[1];
  let queryString = new URLSearchParams(paramString);
  const [route, setRoute] = useState(Object.fromEntries(queryString.entries()));
  const [currentTaskId, setCurrentTaskId] = useState();
  useEffect(() => {
    setTimeout(() => {
      document
        .getElementById("mapImage")
        .addEventListener("mousemove", function (event) {
          coords.innerHTML = "x: " + event.offsetX + "<br/>y: " + event.offsetY;
        });
    }, 2000);
    window.addEventListener(
      "popstate",
      (event) => {
        let paramString = window.location.search.split("?")[1];
        let queryString = new URLSearchParams(paramString);
        setRoute(Object.fromEntries(queryString.entries()));
        setCurrentTaskId(null);
      },
      // }),
      false
    );
  }, []);
  useEffect(() => {
    console.log({ route, currentTaskId });
  }, [route, currentTaskId]);
  const { tasks, rootImageFileName, dynamicImages } = config;
  const taskClick = (e, id) => {
    e.preventDefault();
    setCurrentTaskId(id);
  };
  if (currentTaskId)
    return (
      <Task
        currentTaskId={currentTaskId}
        route={route}
        setRoute={setRoute}
        config={config}
        setCurrentTaskId={setCurrentTaskId}
      ></Task>
    );
  return (
    <div>
      <h1 className="ml-3 text-3xl font-semibold text-gray-900">Escaperoom</h1>
      <div style={{ position: "absolute", left: 0, top: 0, maxWidth: "1px" }}>
        {dynamicImages.map((di, index) => {
          const { answersRequired, fileName, position } = di;

          return <img key={fileName + index} src={fileName}></img>;
        })}
        {Object.entries(tasks).map(
          (
            [id, { image, wrongAnswerImage, imageIfNotRequiredAnswers }],
            index
          ) => {
            return (
              <div key={id}>
                <img src={image}></img>
                <img src={wrongAnswerImage}></img>
                <img src={imageIfNotRequiredAnswers}></img>
              </div>
            );
          }
        )}
      </div>
      <img
        id="mapImage"
        useMap="#workmap"
        style={{ position: "absolute", left: 0, top: "50px" }}
        src={rootImageFileName}
      ></img>
      <map name="workmap">
        {Object.entries(tasks).map(
          ([id, { coords, shape = "rect", enableWhen }], index) => {
            const answerMissingToEnable = enableWhen?.find(
              (requirementProperty) => {
                let missingAnswerFound = false;
                for (var answerProp in requirementProperty) {
                  const answer = Number(route[answerProp]);
                  const valueOk = checkValue(
                    answer,
                    requirementProperty[answerProp]
                  );
                  if (!valueOk) missingAnswerFound = true;
                }
                return missingAnswerFound;
              }
            );
            if (answerMissingToEnable) return null;
            return (
              <area
                href="#"
                tabIndex={index}
                key={id}
                shape={shape}
                coords={coords}
                onClick={(e) => taskClick(e, id)}
              />
            );
          }
        )}
      </map>
      {dynamicImages.map((di, index) => {
        const { answersRequired, fileName, position } = di;

        const hide = Object.keys(answersRequired).find((id) => {
          const answer = route[id];
          const requirement = answersRequired[id];
          const valueOk = checkValue(answer, requirement);
          return !valueOk;
        });
        return (
          !hide && (
            <img
              key={fileName + index}
              src={fileName}
              style={{ position: "absolute", ...position }}
            ></img>
          )
        );
      })}
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
