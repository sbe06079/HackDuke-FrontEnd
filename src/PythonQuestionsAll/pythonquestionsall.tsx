import React, { useEffect, useState } from "react";
import "./pythonquestionsall.css";
import Question from "./question";

const row1 = [
    { greenTitle: "Add", title: "Integers", purple: "sum", description: "should add the three integers inserted as inputs to the function and return the sum.", example: "(1,3,9) should return 13." },
    { greenTitle: "Print", title: "String", purple: "greet", description: "should print the String that is inserted as input to the function.", example: "(‘Hello world!’) should print 'Hello world!" },
    { greenTitle: "Remove", title: "Element", purple: "removeElement", description: "should remove all occurrences of val from nums.", example: "(number_list = [1,2,3,4,5,5] value = 5) would return 4 and number_list would be [1,2,3,4,5]" },
];

const row2 = [
    { greenTitle: "Remove", title: "Element", purple: "removeElement", description: "should remove all occurrences of val from nums.", example: "(number_list = [1,2,3,4,5,5] value = 5) would return 4 and number_list would be [1,2,3,4,5]" },
    { greenTitle: "Remove", title: "Element", purple: "removeElement", description: "should remove all occurrences of val from nums.", example: "(number_list = [1,2,3,4,5,5] value = 5) would return 4 and number_list would be [1,2,3,4,5]" },
    { greenTitle: "Remove", title: "Element", purple: "removeElement", description: "should remove all occurrences of val from nums.", example: "(number_list = [1,2,3,4,5,5] value = 5) would return 4 and number_list would be [1,2,3,4,5]" }
];

const row3 = [
    { greenTitle: "Remove", title: "Element", purple: "removeElement", description: "should remove all occurrences of val from nums.", example: "(number_list = [1,2,3,4,5,5] value = 5) would return 4 and number_list would be [1,2,3,4,5]" },
    { greenTitle: "Remove", title: "Element", purple: "removeElement", description: "should remove all occurrences of val from nums.", example: "(number_list = [1,2,3,4,5,5] value = 5) would return 4 and number_list would be [1,2,3,4,5]" },
    { greenTitle: "Remove", title: "Element", purple: "removeElement", description: "should remove all occurrences of val from nums.", example: "(number_list = [1,2,3,4,5,5] value = 5) would return 4 and number_list would be [1,2,3,4,5]" }
];

function PythonQuestionsAll() {

    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get('lang')?.toString() ?? "EN";
    const [speakingLanguage, setSpeakingLanguage] = useState(lang);
    console.log(speakingLanguage);

    useEffect(() => {
        // 
    }, [speakingLanguage]);

    return <div>
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
                />
            ))}
        </div>
    </div>;
}

export default PythonQuestionsAll;