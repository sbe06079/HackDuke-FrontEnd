import React, { useEffect, useState } from "react";
import "./home.css";
import pythonAlgosData from '../../public/pythonAlgos.json';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { askChatGPT, highlightCodeSnippet, highlightCodeSnippetWithInputs, translatePage, translateText } from "../utils";
import ReactDOMServer from "react-dom/server";
import parse from 'html-react-parser';

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
    const codeSnippetObject = pythonAlgosData.mappings.find(item => item.algoName === "sumABandC");
    
    // Extract codeSnippet if the object exists
    const codeSnippet = codeSnippetObject ? codeSnippetObject.codeSnippet : "";
    const [apiMessage, setApiMessage] = useState("");
    const [htmlCode, setHtmlCode] = useState(`
    <!-- Your HTML code here -->
  `);

    return (
        <>
            <h1>Hello World</h1>
            {highlightCodeSnippet(codeSnippet)}

            {highlightCodeSnippetWithInputs(codeSnippet)}
            
            <button>Fetch Data</button>
            <div>{apiMessage}</div>
            {<SyntaxHighlighter language="python" style={customSyntaxStyle} customStyle={codeSnippetStyle}>
                {codeSnippet}
            </SyntaxHighlighter>}
            
            <button onClick={async () => {
                setApiMessage(await askChatGPT("What is 1 + 1?"));
            }}>
                Ask ChatGPT
            </button>

            {parse(apiMessage)}

            <button onClick={async () => {
                setApiMessage(await translateText("Hi, I am Pascal! Nice to meet you.", "FR"));
            }}>
                Translate with DeepL
            </button>

            <button onClick={async () => { // should input a webpage
                setHtmlCode(await translatePage(ReactDOMServer.renderToString(<div className="text">Hi, I am Pascal! Nice to meet you.</div>), "FR"));
            }}>
                Translate Page with DeepL
            </button>
            <div>
                {/* Render the HTML code */}
                {parse(htmlCode)}
            </div>
        </>
    );
}
export default Home;