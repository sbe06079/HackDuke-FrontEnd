import React, { useState } from "react";
import "./pythonpage1.css";
import { askChatGPT, translateText } from "../utils";

function PythonPage1() {
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get('lang')?.toString() ?? "EN";
    const [speakingLanguage, setSpeakingLanguage] = useState(lang);
    const [gptText, setGptText] = useState("");
    const [translatedGptText, setTranslatedGptText] = useState("");
    
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
                <button onClick={getHint}>Get hint</button>
            </div>
            <div className="questionBox"></div>
        </div>
        <div>{translatedGptText}</div>
    </div>;
}

export default PythonPage1;