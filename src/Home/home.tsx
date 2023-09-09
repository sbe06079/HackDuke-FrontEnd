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
    const codeSnippetObject = pythonAlgosData.mappings.find(item => item.algoName === "removeElement");
    // Extract codeSnippet if the object exists
    const codeSnippet = codeSnippetObject ? codeSnippetObject.codeSnippet : "";


    const [apiMessage, setApiMessage] = useState("");
    
    const test1 = async () => {
        try {
            const response = await fetch("/api/chatGPT", {
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

    const test3 = async () => {
        try {
            const response = await fetch("/api/deepl", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    translate: "Hello, Pascal. How are you.",
                    target_lang: "FR"
                })
            }).then(v => v.json());

            console.log(response);
            if (response) {
                setApiMessage(response);
            } else {
                console.error(response);
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
           
            

            {highlightCodeSnippet(codeSnippet)}

            {highlightCodeSnippetWithInputs(codeSnippet)}
            
            <button onClick={test3}>Fetch Data</button>
            <div>{apiMessage}</div>
        </>
    );
}
export default Home;