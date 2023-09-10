import React, { useEffect, useState } from "react";
import "./pythonpage1.css";
import { askChatGPT, translateText } from "../utils";
import pythonAlgosData from '../../public/pythonAlgos.json';
import parse from 'html-react-parser';


function PythonPage1() {
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get('lang')?.toString() ?? "EN";
    const [speakingLanguage, setSpeakingLanguage] = useState(lang);
    const [gptText, setGptText] = useState("");
    const [translatedGptText, setTranslatedGptText] = useState("");
    const [codeTranslate, setCodeTranslate] = useState("");
    const [question1, setQuestion1] = useState("");
    const [question2, setQuestion2] = useState("");
    const [question3, setQuestion3] = useState("");
    const [question4, setQuestion4] = useState("");

    const id = Number(urlParams.get("id")?.toString());
    const codingProblem: any = pythonAlgosData.mappings.find(item => item.id === id)?.codeSnippet ?? "NO PROBLEM AVAILABLE";
    const codingTranslate = codingProblem.includes("def") ? codingProblem.split("def")[0] : codingProblem.split("print")[0];
    const codingCode = codingProblem.includes("def") ? "def " + codingProblem.split("def")[1] : "print " + codingProblem.split("print")[1];
    
    useEffect(() => {
        if (speakingLanguage !== "EN") {
            translateText(codingTranslate, speakingLanguage)
                .then(response => setCodeTranslate(response))
                .catch(err => console.log(err));
            translateText("Next question? Ask away!", speakingLanguage)
                .then(response => setTranslatedGptText(response))
                .catch(err => console.log(err));
            translateText("What is this code trying to do?", speakingLanguage)
                .then(response => setQuestion1(response))
                .catch(err => console.log(err));
            translateText("What is the purpose of the indentations?", speakingLanguage)
                .then(response => setQuestion2(response))
                .catch(err => console.log(err));
            translateText("Is “return” necessary in a Python function?", speakingLanguage)
                .then(response => setQuestion3(response))
                .catch(err => console.log(err));
            translateText("What if this function has more inputs?", speakingLanguage)
                .then(response => setQuestion4(response))
                .catch(err => console.log(err));
        } else {
            setCodeTranslate(codingTranslate);
            setTranslatedGptText("Next question? Ask away!");
            setQuestion1("What is this code trying to do?");
            setQuestion2("What is the purpose of the indentations?");
            setQuestion3("Is “return” necessary in a Python function?");
            setQuestion4("What if this function has more inputs?");
        }
    }, [speakingLanguage]);
    
    const getHint = async () => {
        askChatGPT("What is 1 + 1?")       // change question here
            .then(response => {
                    setGptText(response);
                    if (speakingLanguage !== "EN") {
                        translateText(response, speakingLanguage)
                            .then(translation => {
                                setTranslatedGptText(translation);
                                
                            })
                            .catch(err => console.log(err));
                    } else
                        setTranslatedGptText(response);
                })
            .catch(err => console.log(err));
    };
    console.log(codeTranslate);

    return <div>
        <div className="header">
            <img id="logo" src="/FrameLogo.png" alt="Frame Logo" />;
            <div className="pythTitle">
                <img id="pythLogo" src="Images/PythonLogo.png" alt="Python Logo" />
                <div className="text">Python</div>
            </div>
        </div>
        <div className="pythonContainer">
            <div className="questionBox">
                <p id="elementsTitle"><span className="removeGreen">Remove</span> Elements</p>
                <p id="funcDescription">{parse(codeTranslate)}</p>
                <p>{parse(codingCode)}</p>
                <div className="buttonWrapper">
                    <button className="next" id="submit">Submit</button>
                    <button className="next" id="getHint" onClick={getHint}>Get hint</button>
                </div>
            </div>
            <div className="questionBox">
                <p id="elementsTitle"><span className="removeGreen">Codelingo</span>GPT</p>
                <div id="textContainer">
                    <p>{translatedGptText}?</p>
                </div>
                <div className="templateWrapper">
                    <div className="row">
                        <div className="templateCard">{question1}</div>
                        <div className="templateCard">{question2}</div>
                    </div>
                    <div className="row">
                        <div className="templateCard">{question3}</div>
                        <div className="templateCard">{question4}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export default PythonPage1;