import React, { useEffect, useState } from "react";
import "./language.css";
import LanguageCard from "./languageCard";

const languages = [
  { image1: "/Images/Python.png", image2: "/Images/PythonGreen.png", alt: "Python", color: "white" },
  { image1: "/Images/Java.png", image2: "/Images/JavaGreen.png", alt: "Java", color: "white" },
  { image1: "/Images/C.png", image2: "/Images/CGreen.png", alt: "C", color: "white" }
];

function Language() {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const handleLanguageSelect = (index: any) => {
    setSelectedLanguage(index);
  };

  return (
    <div>
      <img id="logo" src="/FrameLogo.png" alt="Frame Logo" />
      <div className="text" id="title">
        Select your programming language
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
        console.log("hi"); //change this
      }}>
        Next&nbsp;➔
      </button>
    </div>
  );
}

export default Language;
