//main entry point for the app
import React from "react";
import { createRoot } from "react-dom/client";
import './index.css';
import SiteRouter from "./router";

const root = document.getElementById("root");
if(!root) {
    console.error("root not found");
    process.exit();
}

createRoot(root).render(
    <React.StrictMode>
        <SiteRouter />
    </React.StrictMode>
);
