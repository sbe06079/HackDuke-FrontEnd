import React, { useEffect, useState } from "react";
import "./home.css";
import pythonAlgosData from '../../public/pythonAlgos.json';

function Home() {
    const codeSnippet = pythonAlgosData.mappings[0]?.codeSnippet;
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
            <pre>{codeSnippet}</pre>
            <button onClick={test}>Fetch Data</button>
            <div>{apiMessage}</div>
        </>
    );
}
export default Home;