import "./style";
import { useState, useEffect } from "preact/hooks";
import { config } from "./config";
import Task from "./task";
import s from "./sas.jpg";
import t from "./startrummet.jpg";
import g from "./icon.png";
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
  console.log(route);
  const { tasks, rootImageFileName, dynamicImages } = config;
  const taskClick = (e, id) => {
    e.preventDefault();
    setCurrentTaskId(id);
  };
  if (currentTaskId)
    return (
      <Task currentTaskId={currentTaskId} route={route} config={config}></Task>
    );
  return (
    <div>
      <h1>Hello escaperoom</h1>

      <img
        usemap="#workmap"
        style={{ position: "absolute", left: 0, top: "50px", width: "1000px" }}
        src={t}
      ></img>
      <map name="workmap">
        {Object.entries(tasks).map(([id, { coords }]) => {
          return (
            <area
              shape="rect"
              coords={coords}
              onClick={(e) => taskClick(e, id)}
            />
          );
        })}
      </map>
      {dynamicImages.map((di) => {
        const { answersRequired, fileName, position } = di;
        let showImage = true;
        const hide = Object.keys(answersRequired).filter((id) => {
          return route[id] !== answersRequired[id].toString();
        }).length;
        if (hide) return null;
        return (
          <img src={g} style={{ position: "absolute", ...position }}></img>
        );
      })}
      <div>
        <img src={s} style={{ width: "1px", height: "1px" }}></img>
        <img src={t} style={{ width: "1px", height: "1px" }}></img>
        <img src={g} style={{ width: "1px", height: "1px" }}></img>
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
