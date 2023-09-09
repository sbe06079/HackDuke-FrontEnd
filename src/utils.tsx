import React from "react";

export const askChatGPT = async (prompt: string) => {
    try {
        const response = await fetch("/api/chatGPT", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ question: prompt })
        }).then(v => v.json());

        console.log(response);
        if (response) {
            return response.choices[0].message.content; // Access the "completion" field from the response
        } else {
            console.error(response);
            return "Something went wrong!";
        }
    } catch (err) {
        console.error(err);
        return "Something went wrong!";
    }
};

export const translateText = async (text: string, code: string) => {
    try {
        const response = await fetch("/api/deepl", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                translate: text,
                target_lang: code
            })
        }).then(v => v.json());

        console.log(response);
        if (response) {
            return response;
        } else {
            console.error(response);
            return "API Error!";
        }
    } catch (err) {
        console.error(err);
        return "API Error!";
    }
};

export const translatePage = async (text: string) => {
    try {
        const response = await fetch("/api/deepl-page", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                translate: text,
                target_lang: "FR"
            })
        }).then(v => v.json());

        console.log(response);
        if (response) {
            return response;
        } else {
            console.error(response);
            return "API Error!";
        }
    } catch (err) {
        console.error(err);
        return "API Error!";
    }
};

export function highlightCodeSnippet(codeSnippet: string) {
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

export function highlightCodeSnippetWithInputs(codeSnippet: string) {
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
  