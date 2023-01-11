import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
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
        const [route, setRoute] = useState(
          Object.fromEntries(queryString.entries())
        );
        setCurrentTaskId(null);
        setRoute(Object.fromEntries(queryString.entries()));
      },
      // }),
      false
    );
  }, []);
  const { tasks, rootImageFileName, dynamicImages } = config;
  const taskClick = (e, id) => {
    e.preventDefault();
    setCurrentTaskId(id);
  };
  console.log(currentTaskId);
  if (currentTaskId)
    return (
      <Task
        currentTaskId={currentTaskId}
        route={route}
        config={config}
        setCurrentTaskId={setCurrentTaskId}
      ></Task>
    );
  return (
    <div>
      <h1>Hello develop</h1>

      <img
        useMap="#workmap"
        style={{ position: "absolute", left: 0, top: "50px", width: "1000px" }}
        src={rootImageFileName}
      ></img>
      <map name="workmap">
        {Object.entries(tasks).map(([id, { coords }]) => {
          return (
            <area
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
          console.log({ id, answersRequired, route });
          if (answersRequired[id].equalTo !== undefined)
            if (route[id] !== answersRequired[id].equalTo.toString())
              return true;
          if (answersRequired[id].lessThanOrEqualTo !== undefined)
            if (Number(route[id]) > answersRequired[id].lessThanOrEqualTo)
              return true;
          if (answersRequired[id].greaterThanOrEqualTo !== undefined)
            if (Number(route[id]) < answersRequired[id].greaterThanOrEqualTo)
              return true;
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
