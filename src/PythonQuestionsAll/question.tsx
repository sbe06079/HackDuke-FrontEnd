import React from "react";
import "./question.css";

function Question(props: any) {
    const { greenTitle, title, purple, description, example } = props;

    return (
        <div className="questionCard">
            <div className="questionTitle">
                <p id="greenTitle" className="questionText">{greenTitle}</p>
                <p id="regularTitle" className="questionText">{title}</p>
            </div>
            <p id="description" className="questionText">
                <span className="purple-text">{purple}</span> {description}
                <br></br>
                <br></br>
                Example usage:
                <br></br>
                <br></br>
            </p>
            <p id="description" className="questionText">
                <span className="purple-text">{purple}</span>{example}
            </p>
        </div>
    );
}


export default Question;
