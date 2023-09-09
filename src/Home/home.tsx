import React, { useEffect, useState } from "react";
import "./home.css";
import pythonAlgosData from '../../public/pythonAlgos.json';

import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';



function Home() {
    const codeSnippet = pythonAlgosData.mappings[0]?.codeSnippet;
    const [apiMessage, setApiMessage] = useState("");
    
    const test1 = async () => {
        try {
            const response = await fetch("/api/question", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ question: "What is 2 * 8" })
            }).then(v => v.json());

            console.log(response);
            if (response) {
                setApiMessage(response.choices[0].message.content); // Access the "completion" field from the response
            } else {
                console.error(response);
                setApiMessage("API Error");
            }
        } catch (err) {
            console.error(err);
            setApiMessage("Something went wrong");
        }
    };

    const test2 = async () => {
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
            <SyntaxHighlighter language="python" style={prism}>
                {codeSnippet}
            </SyntaxHighlighter>
            <button onClick={test1}>Fetch Data</button>
            <div>{apiMessage}</div>
        </>
    );
}
export default Home;