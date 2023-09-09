import React, { useEffect, useState } from "react";
import "./landing.css";

const languages = [
    "English",
    "Korean (한국어)",
    "German (Deutsch)",
    "Chinese (中文)"
];
const title: string[] = ["Select your language", "언어를 선택하십시오", "Wählen Sie Ihre Sprache", "选择语言"];
let i =0;

function Landing() {

    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

    const handleChange = (e: any) => {
        setSelectedLanguage(e.target.value);
    };

    const [titleState, setTitleState] = useState(title[i]);
    useEffect(() => {
        const interval = setInterval(() => {
            i++;
            i = i%3;
            setTitleState(title[i]);
        }, 2000);
    }, []);
    
    return <div>
        <img id="logo" src="/FrameLogo.png" alt="Frame Logo" />
        <div className="text" id="title">
            {titleState}
        </div>
        <div id="selectLang">
            <select className="custom-dropdown" value={selectedLanguage} onChange={handleChange}>
                {languages.map((language, index) => (
                <option key={index} value={language}>
                    {language}
                </option>
                ))}
            </select>
        </div>
        <button className="next">Next</button>
        
    </div>;
}

export default Landing;