import { useState, useEffect } from "react";
import { checkValue } from "./utils";
export default ({ fileName }) => {
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
};
