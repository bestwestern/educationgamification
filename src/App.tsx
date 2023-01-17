import { useState, useEffect } from "react";
import { checkValue } from "./utils";
import { config } from "./config";
import Task from "./task";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://cmqxnlontexbrcgilpqs.supabase.co";
const supabase = createClient(
  supabaseUrl,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtcXhubG9udGV4YnJjZ2lscHFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDgyMzgxMjYsImV4cCI6MTk2MzgxNDEyNn0.r-fRpNtLRnGUIji-sAu2ecAY-d635SsGHS08Va5-u20"
);
let channel = null;
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
        console.log("popstate");
        setRoute(Object.fromEntries(queryString.entries()));
        setCurrentTaskId(null);
      },
      // }),
      false
    );
    channel = supabase.channel("online-users", {
      config: {
        presence: {
          key: Math.random() + "x",
        },
      },
    });

    channel.on("presence", { event: "sync" }, () => {
      console.log("Online users: ", channel.presenceState());
    });

    channel.on("presence", { event: "join" }, ({ newPresences }) => {
      console.log("New users have joined: ", newPresences);
    });

    channel.on("presence", { event: "leave" }, ({ leftPresences }) => {
      console.log("Users have left: ", leftPresences);
    });

    channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        const status = await channel.track({
          online_at: new Date().toISOString(),
        });
        console.log(status);
      }
    });
  }, []);
  useEffect(() => {
    console.log({ route, currentTaskId });
    channel.track({
      online_at: new Date().toISOString(),
      route,
      currentTaskId,
    });
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
