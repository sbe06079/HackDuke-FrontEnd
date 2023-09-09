import React, { useEffect, useState } from "react";
import "./landing.css";

const languages = [
    { name: "English (American)", code: "EN-US" },
    { name: "Spanish", code: "ES" },
    { name: "Chinese (simplified)", code: "ZH" },
    { name: "Bulgarian", code: "BG" },
    { name: "Czech", code: "CS" },
    { name: "Danish", code: "DA" },
    { name: "German", code: "DE" },
    { name: "Greek", code: "EL" },
    { name: "Estonian", code: "ET" },
    { name: "Finnish", code: "FI" },
    { name: "French", code: "FR" },
    { name: "Hungarian", code: "HU" },
    { name: "Indonesian", code: "ID" },
    { name: "Italian", code: "IT" },
    { name: "Japanese", code: "JA" },
    { name: "Korean", code: "KO" },
    { name: "Lithuanian", code: "LT" },
    { name: "Latvian", code: "LV" },
    { name: "Norwegian (Bokmål)", code: "NB" },
    { name: "Dutch", code: "NL" },
    { name: "Polish", code: "PL" },
    { name: "Portuguese (Brazilian)", code: "PT-BR" },
    { name: "Portuguese (all Portuguese varieties excluding Brazilian Portuguese)", code: "PT-PT" },
    { name: "Romanian", code: "RO" },
    { name: "Russian", code: "RU" },
    { name: "Slovak", code: "SK" },
    { name: "Slovenian", code: "SL" },
    { name: "Swedish", code: "SV" },
    { name: "Turkish", code: "TR" },
    { name: "Ukrainian", code: "UK" },
];
const title: string[] = ["Select your language", "언어를 선택하십시오", "Wählen Sie Ihre Sprache", "选择语言"];
let i =0;

function Landing() {

    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
    const [titleState, setTitleState] = useState(title[i]);
    const [isFading, setIsFading] = useState(false);

    const handleChange = (e: any) => {
        setSelectedLanguage(e.target.value);
    };

    
    useEffect(() => {
        const interval = setInterval(() => {
            i++;
            i = i % 3;
            setIsFading(true); // Trigger fade-in
            setTimeout(() => {
                setTitleState(title[i]);
                setIsFading(false); // Trigger fade-out
            }, 100); // Adjust the timing to match your CSS transition
        }, 2000);
    }, []);
    
    return <div>
        <img id="logo" src="/FrameLogo2x.png" alt="Frame Logo" />
        <div className={`text ${isFading ? 'fade' : ''}`} id="title"> {/* Apply the fade class conditionally */}
                {titleState}
            </div>
        <div id="selectLang">
            <select className="custom-dropdown" value={selectedLanguage.name} onChange={handleChange}>
                {languages.map((language, index) => (
                <option key={index} value={language.name}>
                    {language.name}
                </option>
                ))}
            </select>
        </div>
        <button className="next" onClick={() => {window.location.href = "/language";}}>Next&nbsp;➔
        </button>
        
    </div>;
}

export default Landing;