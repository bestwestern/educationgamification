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
  console.log({ route });
  return (
    <div>
      <h1>Overskrift?</h1>
      <img
        useMap="#workmap"
        style={{ position: "absolute", left: 0, top: "50px" }}
        src={rootImageFileName}
      ></img>
      <map name="workmap">
        {Object.entries(tasks).map(([id, { coords }]) => {
          return (
            <area
              href="#"
              key={id}
              shape="rect"
              coords={coords}
              onClick={(e) => taskClick(e, id)}
            />
          );
        })}
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
