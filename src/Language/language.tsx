import React, { useEffect, useState } from "react";
import "./language.css";

function Language() {
    return <div>
        <img id="logo" src="/FrameLogo.png" alt="Frame Logo" />
        <div className="text" id="title">
            Select your programming language
        </div>
    </div>;
}

export default Language;