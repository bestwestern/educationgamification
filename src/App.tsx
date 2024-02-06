import { useState, useEffect } from "react";
import { checkValue } from "./utils";
import { config } from "./config";
import Task from "./task";
export default () => {
  let paramString = window.location.search.split("?")[1];
  let queryString = new URLSearchParams(paramString);
  const [mousePos, setMousePos] = useState({});
  const [route, setRoute] = useState(Object.fromEntries(queryString.entries()));
  const [currentTaskId, setCurrentTaskId] = useState();
  const [helpImage, setHelpImage] = useState();
  const [helpStatus, setHelpStatus] = useState(0);
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

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
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    console.log({ route, currentTaskId });
  }, [route, currentTaskId]);
  const { tasks, rootImageFileName, dynamicImages } = config;
  const taskClick = (e, id) => {
    e.preventDefault();
    setCurrentTaskId(id);
  };
  const helpClick = (e) => {
    if (route.b2) {
      setHelpImage("help4.jpg");
    } else {
      const newHelpStatus = Math.min(3, helpStatus + 1);
      setHelpStatus(newHelpStatus);
      setHelpImage("help" + newHelpStatus + ".jpg");
    }
  };
  if (helpImage) {
    return (
      <div className="flex justify-center">
        <div className="sm:w-1 md:w-1/2 ">
          <div className="relative">
            <img className="pt-10" src={"/" + helpImage}></img>
            <div className="sm:w-1 md:w-1/2 ">
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => {
                    setHelpImage(null);
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

  const { x, y } = mousePos;

  const hoveredTask = Object.entries(tasks).find(
    ([id, { coords, shape = "rect", enableWhen }]) => {
      if (
        x > coords[0] &&
        x < coords[2] &&
        y > coords[1] &&
        y < coords[3] &&
        !enableWhen?.find((requirementProperty) => {
          let missingAnswerFound = false;
          for (var answerProp in requirementProperty) {
            const answer = route[answerProp] && Number(route[answerProp]);
            const valueOk = checkValue(answer, requirementProperty[answerProp]);
            if (!valueOk) missingAnswerFound = true;
          }
          return missingAnswerFound;
        })
      )
        return true;
    }
  );
  return (
    <div
      onClick={(e) => hoveredTask && setCurrentTaskId(hoveredTask[0])}
      style={{ cursor: hoveredTask ? "pointer" : "default" }}
    >
      <h1 className="ml-3 text-3xl font-semibold text-gray-900">Escaperoom</h1>
      <div style={{ position: "absolute", left: 0, top: 0, maxWidth: "1px" }}>
        {[
          ...dynamicImages,
          { fileName: "help1.jpg" },
          { fileName: "help2.jpg" },
          { fileName: "help3.jpg" },
          { fileName: "help4.jpg" },
        ].map((di, index) => {
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
        style={{ position: "absolute", left: 0, top: "50px" }}
        src={rootImageFileName}
      ></img>
      {
        /*console.log("-----") ||*/
        dynamicImages.map((di, index) => {
          const { answersRequired, fileName, position } = di;

          const hide = Object.keys(answersRequired).find((id) => {
            const answer = route[id];
            const requirement = answersRequired[id];
            const valueOk = checkValue(answer, requirement);

            return !valueOk;
          });
          // if (!hide) console.log(fileName);
          return (
            !hide && (
              <img
                key={fileName + index}
                src={fileName}
                style={{ position: "absolute", ...position }}
              ></img>
            )
          );
        })
      }
      <button
        type="button"
        style={{ top: "650px" }}
        onClick={helpClick}
        className="absolute left-0 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        Hjælp
      </button>{" "}
      {Object.entries(route).length > 0 && (
        <button
          type="button"
          style={{ top: "650px", left: "100px" }}
          onClick={() => {
            setRoute({});
            history.pushState(null, "", location.origin);
          }}
          className="absolute left-0 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Start forfra
        </button>
      )}
      {false && (
        <span style={{ top: "750px" }} className="absolute">
          {"x:" + (mousePos.x || "..") + ", y:" + (mousePos.y || "...")}
        </span>
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
