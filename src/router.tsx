import React from "react";
import  { RouterProvider, createBrowserRouter } from 'react-router-dom';

/**
 * @param p pathname
 * @param el element to render at pathname
 * @returns {{path: string, element: JSX.Element}} json object with path and string in it for createBrowserRouter
 */

// const makeRoute = (p: string, el: JSX.Element): {path: string, element: JSX.Element} => {
//    return {path: p, element: el};
// };

const router = createBrowserRouter([]);

function SiteRouter() {
    return <RouterProvider router={router}/>; // only element that should ever be here
}
 
export default SiteRouter;