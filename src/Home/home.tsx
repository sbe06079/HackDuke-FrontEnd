import React, { useEffect, useState } from "react";
import "./home.css";
import pythonAlgosData from '../../public/pythonAlgos.json';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const codeSnippetStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    padding: 0,
    margin: 0,
    boxShadow: 'none',
  };

    

// Define a custom style for the SyntaxHighlighter component
const customSyntaxStyle = {
    ...dark,
    'code[class*="language-"]': {
        textShadow: 'none', // Remove text shadow
    },
};
  
  


function Home() {
    // Find the object with algoName === "sumABC"
    const codeSnippetObject = pythonAlgosData.mappings.find(item => item.algoName === "removeElement");
    // Extract codeSnippet if the object exists
    const codeSnippet = codeSnippetObject ? codeSnippetObject.codeSnippet : "";


    const [apiMessage, setApiMessage] = useState("");
    
    const test = async () => {
        try {
            const user = await fetch("/api/data").then(v => v.json());
            console.log(user);
            setApiMessage(user.message);
        } catch (err) {
            console.error(err);
            setApiMessage("Something went wrong");
        }
    };
    
    return (
        <>
            <h1>Hello World</h1>
            <SyntaxHighlighter language="python" style={customSyntaxStyle} customStyle={codeSnippetStyle}>
                {codeSnippet}
            </SyntaxHighlighter>
            


            <button onClick={test}>Fetch Data</button>
            <div>{apiMessage}</div>
        </>
    );
}
export default Home;