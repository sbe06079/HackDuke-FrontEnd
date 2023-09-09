import React from "react";
import  { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from "./Home";
import Landing from "./Landing";
import Language from "./Language";
import Pythonquestions from "./Pythonquestions";
import PythonQuestionsAll from "./PythonQuestionsAll";

/**
 * @param p pathname
 * @param el element to render at pathname
 * @returns {{path: string, element: JSX.Element}} json object with path and string in it for createBrowserRouter
 */

const makeRoute = (p: string, el: JSX.Element): {path: string, element: JSX.Element} => {
    return {path: p, element: el};
};

const router = createBrowserRouter([
    makeRoute("/", <Home/>),
    makeRoute("/landing", <Landing/>),
    makeRoute("/language", <Language/>),
    makeRoute("/pythonquestions", <Pythonquestions/>),
    makeRoute("/pythonquestionsall", <PythonQuestionsAll/>)
]);

function SiteRouter() {
    return <RouterProvider router={router}/>; // only element that should ever be here
}
 
export default SiteRouter;