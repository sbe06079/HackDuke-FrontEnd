import React, { useEffect, useState } from "react";
import "./pythonpage1.css";
import { askChatGPT, highlightCodeSnippetWithInputs, highlightCodeSnippetWithInputsWhenPuttingInOnlyThePartAfterTheComment, highlightCodeSnippetWithInputsWhenPuttingInOnlyThePartAfterTheCommentAttemptLINEBYLINE, highlightCodeSnippetWithInputsWhenPuttingInOnlyThePartAfterTheCommentAttemptTWO, translateText } from "../utils";
import pythonAlgosData from '../../public/pythonAlgos.json';
import parse from 'html-react-parser';
import Modal from 'react-modal';
import ReactDOMServer from "react-dom/server";


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
    const [popupOpen, setPopupOpen] = useState(false);
    const [congrats, setCongrats] = useState(true);
    const [modalHint, setModalHint] = useState("");
    const [modalCongrats, setModalCongrats] = useState("");
    const [hintButton, setHintButton] = useState("");
    const [submitButton, setSubmitButton] = useState("");

    const id = Number(urlParams.get("id")?.toString());
    const codingProblem: any = pythonAlgosData.mappings.find(item => item.id === id)?.codeSnippet ?? "NO PROBLEM AVAILABLE";
    const codingTitle: any = pythonAlgosData.mappings.find(item => item.id === id)?.algoName ?? "NO PROBLEM AVAILABLE";
    const codingTranslate = codingProblem.includes("def") ? codingProblem.split("def")[0] : codingProblem.split("print")[0];
    let code:any = codingProblem.includes("def") ? "def " + codingProblem.split("def")[1] : "print " + codingProblem.split("print")[1];
    code = highlightCodeSnippetWithInputsWhenPuttingInOnlyThePartAfterTheCommentAttemptLINEBYLINE(code);
    const [codingCode, setCodingCode] = useState(code);
    console.log(codingCode);

    const hintPrompt = "Below is a simple Python problem where a few keywords are blurred out so they can learn by filling in the blank. Regardless of which buttons will be blurred out, what would be a good hint for the student? Ideally, the hint would give one or two sentences on what the code intends to do and maybe another sentence or two on typical things to consider when trying to understand that specific type of function. Give me the hint itself only, without quotes because this will be pasted directly from your answer to another site. " + codingCode;
    const prompt1 = "What is this code trying to do? Give me the response in English only, no code. Ideally, the response would a detailed paragraph. Give me the response itself only, without quotes because this will be pasted directly from your answer to another site. Here is the code: " + codingCode;
    const prompt2 = "In general, what is the purpose of indentations in Python code? Give me the response in English, no code. Ideally, the response would a detailed paragraph specific to how indentation relates to this code. Give me the response itself only, without quotes because this will be pasted directly from your answer to another site. here is the code: " + codingCode;
    const prompt3 = "In general, is the return statement necessary in a Python function? Give me the response in English only, no code. (Assume no errors in the code). Be specific to this code and the response would a detailed paragraph specific to how the return statement relates to this code. Give me the response itself only, without quotes because this will be pasted directly from your answer to another site. here is the code: " + codingCode;
    const prompt4 = "What if this code had more inputs? How would the program's functionality and behavior change? Be specific to this code and the response would a detailed paragraph specific to how more inputs relate to this code. Give me the response itself only, without quotes because this will be pasted directly from your answer to another site. here is the code: " + codingCode;

    const setOpen = () => {setPopupOpen(true);};
    const setClose = () => {setPopupOpen(false);};
    const setCorrect = () => {setCongrats(true);};
    const setHint = () => {setCongrats(false);};


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
            translateText("You’re on the right track.<br /> <br />It looks like there’s a small issue in your code. Make sure to try the hint button!", speakingLanguage)
                .then(response => setModalHint(response))
                .catch(err => console.log(err));
            translateText(`"<p className="modalText">Congratulations</p><br /><br /><p>You've successfully implemented the module. Great job!</p>"`, speakingLanguage)
                .then(response => setModalCongrats(response))
                .catch(err => console.log(err));
            translateText("Hint", speakingLanguage)
                .then(response => setHintButton(response))
                .catch(err => console.log(err));
            translateText("Submit", speakingLanguage)
                .then(response => setSubmitButton(response))
                .catch(err => console.log(err));
        } else {
            setCodeTranslate(codingTranslate);
            setTranslatedGptText("Next question? Ask away!");
            setQuestion1("What is this code trying to do?");
            setQuestion2("What is the purpose of the indentations?");
            setQuestion3("Is “return” necessary in a Python function?");
            setQuestion4("What if this function has more inputs?");
            setModalHint("You’re on the right track.<br /> <br />It looks like there’s a small issue in your code. Make sure to try the hint button!");
            setModalCongrats(`"<p className="modalText">Congratulations</p><br /><br /><p>You've successfully implemented the module. Great job!</p>"`);
            setHintButton("Hint");
            setSubmitButton("Submit");
        }
    }, [speakingLanguage]);
    
    const setTrue = () => {
        setCongrats(true);
        setPopupOpen(true);
    };
    const getHint = async () => {
        setTranslatedGptText("Generating Response...");
        askChatGPT(hintPrompt)       // change question here
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

    const getQuestion1 = async () => {
        setTranslatedGptText("Generating Response...");
        askChatGPT(prompt1)       // change question here
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
    const getQuestion2 = async () => {
        setTranslatedGptText("Generating Response...");
        askChatGPT(prompt2)       // change question here
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
    const getQuestion3 = async () => {
        setTranslatedGptText("Generating Response...");
        askChatGPT(prompt3)       // change question here
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
    const getQuestion4 = async () => {
        setTranslatedGptText("Generating Response...");
        askChatGPT(prompt4)       // change question here
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

    return <div>
        <div className="header">
            <img id="logo" src="/FrameLogo.png" alt="Frame Logo" />;
            <div className="pythTitle">
                <img id="pythLogo" src="Images/PythonLogo.png" alt="Python Logo" />
                <div className="text">Python</div>
            </div>
        </div>
        <Modal className="popup" isOpen={popupOpen} onRequestClose={setClose} ariaHideApp={false} style={{overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.20)', /* Background color with opacity */
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}}>
            {congrats ? (
                <div>
                    <p className="modalText">{parse(modalHint)}</p>
              </div>
            ) : (
                <div>
                    {parse(modalCongrats)}
                </div>
            )}
        </Modal>
        <div className="pythonContainer">
            <div className="questionBox">
                <p id="elementsTitle"><span className="removeGreen">{codingTitle.split(" ")[0]}</span> {codingTitle.split(" ")[1]}</p>
                <p id="funcDescription">{parse(codeTranslate)}</p>
                <p id="codingCode">{parse(codingCode)}</p>
                <div className="buttonWrapper">
                    <button className="next" id="submit" onClick={setTrue}>{submitButton}</button>
                    <button className="next" id="getHint" onClick={getHint}>{hintButton}</button>
                </div>
            </div>
            <div className="questionBox">
                <p id="elementsTitle"><span className="removeGreen">Codelingo</span>GPT</p>
                <div id="textContainer">
                    <p>{translatedGptText}</p>
                </div>
                <div className="templateWrapper">
                    <div className="row">
                        <div className="templateCard" onClick={getQuestion1}>{question1}</div>
                        <div className="templateCard" onClick={getQuestion2}>{question2}</div>
                    </div>
                    <div className="row">
                        <div className="templateCard" onClick={getQuestion3}>{question3}</div>
                        <div className="templateCard" onClick={getQuestion4}>{question4}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export default PythonPage1;