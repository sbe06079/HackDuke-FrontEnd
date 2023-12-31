import React, { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import "./pythonquestionsall.css";
import Question from "./question";
import { translatePage } from "../utils";

const row1 = [
    { greenTitle: "Add", title: "Integers", purple: "sum", description: "should add the three integers inserted as inputs to the function and return the sum.", example: "(1,3,9) should return 13.", id: "1" },
    { greenTitle: "Print", title: "String", purple: "greet", description: "should print the String that is inserted as input to the function.", example: "(‘Hello world!’) should print 'Hello world!", id: "2" },
    { greenTitle: "Remove", title: "Element", purple: "removeElement", description: "should remove all occurrences of val from nums.", example: "(number_list = [1,2,3,4,5,5] value = 5) would return 4 and number_list would be [1,2,3,4,5]", id: "3" },
];

const row2 = [
    { greenTitle: "Remove", title: "Element", purple: "removeElement", description: "should remove all occurrences of val from nums.", example: "(number_list = [1,2,3,4,5,5] value = 5) would return 4 and number_list would be [1,2,3,4,5]", id: "4" },
    { greenTitle: "Remove", title: "Element", purple: "removeElement", description: "should remove all occurrences of val from nums.", example: "(number_list = [1,2,3,4,5,5] value = 5) would return 4 and number_list would be [1,2,3,4,5]", id: "5" },
    { greenTitle: "Remove", title: "Element", purple: "removeElement", description: "should remove all occurrences of val from nums.", example: "(number_list = [1,2,3,4,5,5] value = 5) would return 4 and number_list would be [1,2,3,4,5]", id: "6" }
];

const row3 = [
    { greenTitle: "Remove", title: "Element", purple: "removeElement", description: "should remove all occurrences of val from nums.", example: "(number_list = [1,2,3,4,5,5] value = 5) would return 4 and number_list would be [1,2,3,4,5]", id: "7" },
    { greenTitle: "Remove", title: "Element", purple: "removeElement", description: "should remove all occurrences of val from nums.", example: "(number_list = [1,2,3,4,5,5] value = 5) would return 4 and number_list would be [1,2,3,4,5]", id: "8" },
    { greenTitle: "Remove", title: "Element", purple: "removeElement", description: "should remove all occurrences of val from nums.", example: "(number_list = [1,2,3,4,5,5] value = 5) would return 4 and number_list would be [1,2,3,4,5]", id: "9" }
];

function PythonQuestionsAll() {

    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get('lang')?.toString() ?? "EN";
    const [speakingLanguage, setSpeakingLanguage] = useState(lang);
    const [htmlCode, setHtmlCode] = useState(`
    <!-- Your HTML code here -->
    `);

    useEffect(() => {
        if (speakingLanguage !== "EN") {
            translatePage(ReactDOMServer.renderToString(page), speakingLanguage)
            .then(translation => setHtmlCode(translation))
            .catch(err => console.log(err));
        } else {
            setHtmlCode(ReactDOMServer.renderToString(page));
        }
    }, [speakingLanguage]);

    useEffect(() => {
        const delay = 1000; // 1 second (1000 milliseconds)
      
        const attachEventListeners = () => {
          for (let i = 1; i <= 9; i++) {
            const element = document.getElementById(String(i));
            if (element) {
              element.addEventListener('click', handleClick(i));
            }
          }
        };
      
        const handleClick = (id: number) => () => {
          console.log(`Element ${id} clicked`);
          window.location.href = `pythonpage1?lang=${speakingLanguage}&id=${id}`;
        };
      
        // Attach event listeners after the specified delay
        const timerId = setTimeout(attachEventListeners, delay);
      
        // Cleanup the event listeners when the component unmounts
        /*return () => {
          clearTimeout(timerId);
          for (let i = 1; i <= 9; i++) {
            const element = document.getElementById(String(i));
            if (element) {
              element.removeEventListener('click', handleClick(i));
            }
          }
        };*/
      }, []);
    
    const page = <div>
        <div className="header">
            <img id="logo" src="/FrameLogo.png" alt="Frame Logo" />;
            <div className="pythTitle">
                <img id="pythLogo" src="Images/PythonLogo.png" alt="Python Logo" />
                <div className="text">Python</div>
            </div>
        </div>
        <div className="cardContainer">
            {row1.map((question, index) => (
                <Question
                    greenTitle={question.greenTitle}
                    title={question.title}
                    purple={question.purple}
                    description={question.description}
                    example={question.example}
                    key={index}
                    id={question.id}
                />
            ))}
        </div>
        <div className="cardContainer">
            {row2.map((question, index) => (
                <Question
                    greenTitle={question.greenTitle}
                    title={question.title}
                    purple={question.purple}
                    description={question.description}
                    example={question.example}
                    key={index}
                    id={question.id}
                />
            ))}
        </div>
        <div className="cardContainer">
            {row3.map((question, index) => (
                <Question
                    greenTitle={question.greenTitle}
                    title={question.title}
                    purple={question.purple}
                    description={question.description}
                    example={question.example}
                    key={index}
                    id={question.id}
                />
            ))}
        </div>
    </div>;
    console.log(htmlCode);

    return <>
        <div dangerouslySetInnerHTML={{ __html: htmlCode }} />
    </>;
}

export default PythonQuestionsAll;