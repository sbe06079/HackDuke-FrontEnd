import React from "react";
import "./languageCard.css";

function LanguageCard(props: any) {
  const { image1, image2, alt, isSelected, onClick } = props;

  const handleClick = () => {
    onClick();
  };

  return (
    <img
      id="LanguageCard"
      src={isSelected ? image2 : image1}
      alt={alt}
      onClick={handleClick}
    />
  );
}


export default LanguageCard;
