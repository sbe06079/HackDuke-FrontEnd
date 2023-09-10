import React from "react";
import "./pythonpage1.css";

function PythonPage1() {
    return <div>
        <div className="header">
            <img id="logo" src="/FrameLogo.png" alt="Frame Logo" />;
            <div className="pythTitle">
                <img id="pythLogo" src="Images/PythonLogo.png" alt="Python Logo" />
                <div className="text">Python</div>
            </div>
        </div>
        <div className="pythonContainer"></div>
    </div>;
}

export default PythonPage1;