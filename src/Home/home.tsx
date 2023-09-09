import React, { useEffect, useState } from "react";
import "./home.css";
import pythonAlgosData from '../../public/pythonAlgos.json';

import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';



function Home() {
    const codeSnippet = pythonAlgosData.mappings[0]?.codeSnippet;
    const [apiMessage, setApiMessage] = useState("");
    
    const test = async () => {
        try {
            const response = await fetch("/question", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ question: "What is 2 times 8" })
            }).then(v => v.json());
            if (response.ok) {
                const data = await response.json(); // Parse the response JSON
                console.log("good");
                setApiMessage(data.completion); // Access the "completion" field from the response
            } else {
                console.error("API Error:", response.statusText);
                setApiMessage("API Error");
            }
        } catch (err) {
            console.error(err);
            setApiMessage("Something went wrong");
        }
    };
    
    return (
        <>
            <h1>Hello World</h1>
            <SyntaxHighlighter language="python" style={prism}>
                {codeSnippet}
            </SyntaxHighlighter>
            <button onClick={test}>Fetch Data</button>
            <div>{apiMessage}</div>
        </>
    );
}
export default Home;