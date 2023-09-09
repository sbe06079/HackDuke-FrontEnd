import React, { useEffect, useState } from "react";
import "./home.css";
import pythonAlgosData from '../../public/pythonAlgos.json';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { askChatGPT, translatePage, translateText } from "../utils";
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


function highlightCodeSnippet(codeSnippet: string) {
    const parts = codeSnippet.split("'''");
  
    const highlightedParts = parts.map((part, index) => {
      if (index % 2 === 1) {
        // Wrap the content between triple-quotes in a span with a yellow background
        return (
          <span key={index} style={{ color: 'rgb(197, 148, 124)' }}>
            {'\u0027\u0027\u0027'}
            {part}
            {'\u0027\u0027\u0027'}
          </span>
        );
      } else {
        // Tokenize and highlight specific keywords in different colors
        const keywordsToHighlight = {
          'int': 'rgb(113, 197, 177)',
          'def': 'rgb(93, 136, 183)',
          'in': 'rgb(93, 136, 183)',
          'while': 'rgb(179, 130, 180)',
          'return': 'rgb(179, 130, 180)',
          'print': 'rgb(179, 130, 180)',
          'removeElement': 'green', // Highlight 'removeElement' in green
          'greet': 'green', // Highlight 'greet' in green
          'sum': 'green', // Highlight 'sum' in green
        };
        const tokenizedPart = part.split(/\b/); // Tokenize by word boundaries
  
        const highlightedText = tokenizedPart.map((word, wordIndex) => {
          const color = keywordsToHighlight[word as keyof typeof keywordsToHighlight] || 'white';
  
          return (
            <span key={wordIndex} style={{ color }}>
              {word}
            </span>
          );
        });
  
        return (
          <span key={index}>
            {highlightedText}
          </span>
        );
      }
    });
  
    return (
        <pre style={{ lineHeight: '1.5' }}>{/* Add line-height style here */}
          {highlightedParts}
        </pre>
      );
  }

  function highlightCodeSnippetWithInputs(codeSnippet: string) {
    const parts = codeSnippet.split("'''");
  
    const highlightedParts = parts.map((part, index) => {
      if (index % 2 === 1) {
        // Wrap the content between triple-quotes in a span with a yellow background
        return (
          <span key={index} style={{ color: 'rgb(197, 148, 124)' }}>
            {'\u0027\u0027\u0027'}
            {part}
            {'\u0027\u0027\u0027'}
          </span>
        );
      } else {
        // Tokenize and highlight specific keywords in different colors
        const keywordsToHighlight = {
          'int': 'rgb(113, 197, 177)',
          'def': 'rgb(93, 136, 183)',
          'in': 'rgb(93, 136, 183)',
          'while': 'rgb(179, 130, 180)',
          'return': 'rgb(179, 130, 180)',
          'print': 'rgb(179, 130, 180)',
          'removeElement': 'green', // Highlight 'removeElement' in green
          'greet': 'green', // Highlight 'greet' in green
          'sum': 'green', // Highlight 'sum' in green
        };
        const tokenizedPart = part.split(/\b/); // Tokenize by word boundaries
  
        const highlightedText = tokenizedPart.map((word, wordIndex) => {
          const color = keywordsToHighlight[word as keyof typeof keywordsToHighlight] || 'white';
  
          // Replace specific words with input elements
          if (['val', 'nums', 'removeElement'].includes(word)) {
            return (
              <input
                key={wordIndex}
                type="text"
                style={{ color }}
                placeholder={word}
                // Handle input change here if needed
              />
            );
          }
  
          return (
            <span key={wordIndex} style={{ color }}>
              {word}
            </span>
          );
        });
  
        return (
          <span key={index}>
            {highlightedText}
          </span>
        );
      }
    });
  
    return (
      <pre style={{ lineHeight: '1.5' }}>
        {highlightedParts}
      </pre>
    );
  }
  
  
  
  
  
  
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
                setHtmlCode(await translatePage(ReactDOMServer.renderToString(<div className="text">Hi, I am Pascal! Nice to meet you.</div>)));
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