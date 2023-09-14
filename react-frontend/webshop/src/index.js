import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
//import Home from "./components/Home/Home";

window.fbAsyncInit = function () {
    window.FB.init({
        appId: "YOUR_APP_ID",
        autoLogAppEvents: true,
        xfbml: true,
        version: "v10.0", // Promenite verziju prema vašim potrebama
    });
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
