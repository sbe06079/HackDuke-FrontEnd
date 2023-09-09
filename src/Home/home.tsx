import React from "react";
import "./home.css";

import pythonAlgosData from './pythonAlgos.json';



function Home() {
    const codeSnippet = pythonAlgosData.mappings[0]?.codeSnippet;

    return (
        <>
            <h1>Hello World</h1>
            <pre>{codeSnippet}</pre>
        </>
    );
}
export default Home;