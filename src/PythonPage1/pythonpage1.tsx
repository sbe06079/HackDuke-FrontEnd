import React, { useState } from "react";
import "./pythonpage1.css";
import { askChatGPT, translateText } from "../utils";

function PythonPage1() {
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get('lang')?.toString() ?? "EN";
    const [speakingLanguage, setSpeakingLanguage] = useState(lang);
    const [gptText, setGptText] = useState("");
    const [translatedGptText, setTranslatedGptText] = useState("");
    const [answer, setAnswer] = useState(null);
    
    const getHint = async () => {
        askChatGPT("What is 1 + 11?")       // change question here
            .then(response => {
                    setGptText(response);
                    translateText(response, speakingLanguage)
                        .then(translation => setTranslatedGptText(translation))
                        .catch(err => console.log(err));
                })
            .catch(err => console.log(err));
    };

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
                GPT RESPONSE HERE
                <div className="buttonWrapper">
                    <button className="next" id="submit">Submit</button>
                    <button className="next" id="getHint">Get hint</button>
                </div>
            </div>
            <div className="questionBox">
                <p id="elementsTitle"><span className="removeGreen">Codelingo</span>GPT</p>
                {!answer ? 
                    (<div id="textContainer">
                        <p>Have a question?</p>
                        <p>Ask away!</p>
                    </div>
                    ) :
                    (<div>GPT response</div>)
                }
                <div className="templateWrapper">
                    <div className="row">
                        <div className="templateCard">What is this code trying to do?</div>
                        <div className="templateCard">What is the purpose of the indentations?</div>
                    </div>
                    <div className="row">
                        <div className="templateCard">Is “return” necessary in a Python function?</div>
                        <div className="templateCard">What if this function has more inputs?</div>
                    </div>
                </div>
            </div>
            <div className="questionBox"></div>
        </div>
        <div>{translatedGptText}</div>
    </div>;
}