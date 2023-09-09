import React, { useEffect, useState } from "react";
import "./language.css";
import LanguageCard from "./languageCard";
import { translateText } from "../utils";

const languages = [
  { image1: "/Images/Python.png", image2: "/Images/PythonGreen.png", alt: "Python", color: "white" },
  { image1: "/Images/Java.png", image2: "/Images/JavaGreen.png", alt: "Java", color: "white" },
  { image1: "/Images/C.png", image2: "/Images/CGreen.png", alt: "C", color: "white" }
];

function Language() {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const urlParams = new URLSearchParams(window.location.search);
  const lang = urlParams.get('lang')?.toString() ?? "EN";
  const [speakingLanguage, setSpeakingLanguage] = useState(lang);
  const [translatedText, setTranslatedText] = useState('');
  
  useEffect(() => {
    if (speakingLanguage !== "EN") {
      translateText("Select your programming language", speakingLanguage)
      .then(translation => setTranslatedText(translation))
      .catch(error => console.error(error));
    } else
      setTranslatedText("Select your programming language");
  }, [speakingLanguage]);

  //console.log("language" + speakingLanguage);
  //console.log("translated text" + translatedText);
  const handleLanguageSelect = (index: any) => {
    setSelectedLanguage(index);
  };


  return (
    <div>
      <img id="logo" src="/FrameLogo.png" alt="Frame Logo" />
      <div className="text" id="title">
        {translatedText}
      </div>
      <div className="languages">
        {languages.map((language, index) => (
          <LanguageCard
            image1={language.image1}
            image2={language.image2}
            alt={language.alt}
            isSelected={selectedLanguage === index}
            onClick={() => handleLanguageSelect(index)}
            key={index}
          />
        ))}
      </div>
      <button id="languagesNext" className={selectedLanguage !== null ? "nextGreen" : "next"} onClick={() => {
        window.location.href = "/pythonquestionsall";
      }}>
        Next&nbsp;➔
      </button>
    </div>
  );
}

export default Language;
