import React, { useEffect, useState } from "react";

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

export const translatePage = async (text: string, code: string) => {
    try {
        const response = await fetch("/api/deepl-page", {
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
  // const prompt = "Give me a few keywords that start after the word def in this prompt: " + codeSnippet +" \n just give me a list of words separated by spaces and no commas.I just want a list of words, it is very important you do not give me anything else. Select ";
  
  //const [keywords, setKeywords] = useState<string | null>(null);

  // useEffect(() => {
  //   // Call the asynchronous function within the useEffect
  //   async function fetchData() {
  //     try {
  //       const result = await askChatGPT(prompt);
  //       setKeywords(result);
  //     } catch (err) {
  //       console.error(err);
  //       setKeywords("API Error!");
  //     }
  //   }

  //   fetchData(); // Call the fetchData function
  // }, []); // useEffect will run whenever the 'prompt' changes

  // console.log(keywords);
  
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
          'def': 'rgb(102, 134, 178)',
          'in': 'rgb(93, 136, 183)',
          'while': 'rgb(179, 130, 180)',
          'return': 'rgb(159, 123, 165)',
          'print': 'rgb(179, 130, 180)',
          'removeElement': 'rgb(142, 255, 201)', // Highlight 'removeElement' in green
          'greet': 'rgb(142, 255, 201)', // Highlight 'greet' in green
          'sum': 'rgb(142, 255, 201)', // Highlight 'sum' in green
        };
        const tokenizedPart = part.split(/\b/); // Tokenize by word boundaries
  
        const highlightedText = tokenizedPart.map((word, wordIndex) => {
          const color = keywordsToHighlight[word as keyof typeof keywordsToHighlight] || 'white';
  
          // Replace specific words with input elements
          //if (keywords?.split(" ").includes(word)) {
          if(['val', 'nums', 'removeElement', 'sum'].includes(word)) {
            const ans = ['val', 'nums', 'removeElement', 'sum'].find(possibleWord => word.includes(possibleWord));
            const randomNumber = Math.random();
            return randomNumber <= 0.75 ?
            (
              <input
                key={wordIndex}
                type="text"
                style={{ color }}
                placeholder={""}
                data-answer = {ans || "Error"}
                // Handle input change here if needed
              />
            ) :
            (
              <span key={wordIndex} style={{ color }}>
                {ans}
              </span>
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
  


  export function highlightCodeSnippetWithInputsWhenPuttingInOnlyThePartAfterTheComment(codeSnippet: string) {
          // Tokenize and highlight specific keywords in different colors

          codeSnippet = codeSnippet.replace(/<br\s*\/?>/gi, '\n').replace(/&nbsp;/gi, ' ');


          const keywordsToHighlight = {
            'int': 'rgb(113, 197, 177)',
            'def': 'rgb(102, 134, 178)',
            'in': 'rgb(93, 136, 183)',
            'while': 'rgb(179, 130, 180)',
            'return': 'rgb(159, 123, 165)',
            'print': 'rgb(179, 130, 180)',
            'removeElement': 'rgb(142, 255, 201)', // Highlight 'removeElement' in green
            'greet': 'rgb(142, 255, 201)', // Highlight 'greet' in green
            'sum': 'rgb(142, 255, 201)', // Highlight 'sum' in green
          };
          const tokenizedPart = codeSnippet.split(/\b/); // Tokenize by word boundaries
    
          const highlightedText = tokenizedPart.map((word, wordIndex) => {
            const color = keywordsToHighlight[word as keyof typeof keywordsToHighlight] || 'white';
    
            // Replace specific words with input elements
            //if (keywords?.split(" ").includes(word)) {
            if(['val', 'nums', 'removeElement', 'sum', 'greet', 'return', 'int'].includes(word)) {
              const ans = ['val', 'nums', 'removeElement', 'sum', 'greet', 'return', 'int'].find(possibleWord => word.includes(possibleWord));
              const randomNumber = Math.random();
              return randomNumber <= 0.25
        ? `<input type="text" style="color: ${color}" placeholder="${ans || 'Error'}" data-answer="${ans || 'Error'}"/>`
        : `<span style="color: ${color}">${ans || word}</span>`;
            }
    
            return `<span style="color: ${color}">${word}</span>`;
          });
    
          return highlightedText.join('');
        
      
    
      
    }




export function highlightCodeSnippetWithInputsWhenPuttingInOnlyThePartAfterTheCommentAttemptTWO(codeSnippet: string) {
      // Tokenize and highlight specific keywords in different colors
  
      const keywordsToHighlight = {
          'int': 'rgb(113, 197, 177)',
          'def': 'rgb(102, 134, 178)',
          'in': 'rgb(93, 136, 183)',
          'while': 'rgb(179, 130, 180)',
          'return': 'rgb(159, 123, 165)',
          'print': 'rgb(179, 130, 180)',
          'removeElement': 'rgb(142, 255, 201)', // Highlight 'removeElement' in green
          'greet': 'rgb(142, 255, 201)', // Highlight 'greet' in green
          'sum': 'rgb(142, 255, 201)', // Highlight 'sum' in green
      };
  
      // Split the code snippet by lines
      const lines = codeSnippet.split('\n');
  
      const highlightedText = lines.map((line, lineIndex) => {
          // Indentation handling
          const leadingSpaces = line.match(/^\s*/)?.[0] || '';
          
          // Split the line by word boundaries
          const tokenizedPart = line.split(/\b/);
  
          const highlightedLine = tokenizedPart.map((word, wordIndex) => {
              const color = keywordsToHighlight[word as keyof typeof keywordsToHighlight] || 'white';
  
              // Replace specific words with input elements
              if (['val', 'nums', 'removeElement', 'sum', 'greet', 'return', 'int'].includes(word)) {
                  const ans = ['val', 'nums', 'removeElement', 'sum', 'greet', 'return', 'int'].find(possibleWord => word.includes(possibleWord));
                  const randomNumber = Math.random();
                  return randomNumber <= 0.25
                      ? `<input type="text" style="color: ${color}" placeholder="${ans || 'Error'}" data-answer="${ans || 'Error'}"/>`
                      : `<span style="color: ${color}">${ans || word}</span>`;
              }
  
              return `<span style="color: ${color}">${word}</span>`;
          }).join('');
  
          // Add indentation back to the line
          const indentedLine = leadingSpaces + highlightedLine;
  
          // If it's not the last line, add a newline character
          return lineIndex < lines.length - 1 ? indentedLine + '\n' : indentedLine;
      });
  
      return highlightedText.join('');
  }
  
  export function highlightCodeSnippetWithInputsWhenPuttingInOnlyThePartAfterTheCommentAttemptLINEBYLINE(codeSnippet: string) {
    // Tokenize and highlight specific keywords in different colors
    const elements = codeSnippet.split('<br/>');
    const cleanedElements = elements.map(element => element.replace(/&nbsp;/g, ' '));
    /*
    const cleanedElements = [
      "def removeElement(nums: List[int], val: int) -> int:",
      "    while val in nums:",
      "        nums.remove(val)",
      "    return removeElement(nums)"
    ];
    
    */
    const finalElements: string[] = [];

    

    


    for (const lineItem of cleanedElements) {
      const keywordsToHighlight = {
        'int': 'rgb(113, 197, 177)',
        'def': 'rgb(102, 134, 178)',
        'in': 'rgb(93, 136, 183)',
        'while': 'rgb(179, 130, 180)',
        'return': 'rgb(159, 123, 165)',
        'print': 'rgb(179, 130, 180)',
        'removeElement': 'rgb(142, 255, 201)', // Highlight 'removeElement' in green
        'greet': 'rgb(142, 255, 201)', // Highlight 'greet' in green
        'sum': 'rgb(142, 255, 201)', // Highlight 'sum' in green
      };

      const words = lineItem.split(" ");
      const highlightedLine = words.map(word => {
        const color = (keywordsToHighlight[word as keyof typeof keywordsToHighlight]) || 'white';
        // Rest of your code...
        if (['val', 'nums', 'removeElement', 'sum', 'greet', 'return', 'int'].includes(word)) {
          const ans = ['val', 'nums', 'removeElement', 'sum', 'greet', 'return', 'int'].find(possibleWord => word.includes(possibleWord));
          const randomNumber = Math.random();
          return randomNumber <= 0.75
              ? `<input type="text" style="color: black" placeholder="${''}" data-answer="${ans || 'Error'}"/>`
              : `<span style="color: ${color}">${ans || word}</span>`;
      }

      return `<span style="color: ${color}">${word}</span>`;

      }).join(' ');


      finalElements.push(highlightedLine); 
      



    

    
  }
  const joinedCode = finalElements.join('<br/>');

      console.log("joined code: "+ joinedCode);

      return joinedCode;
}
