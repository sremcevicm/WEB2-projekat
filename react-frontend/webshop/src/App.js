//import logo from './logo.svg';
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

function App() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const handleLogin = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/home");
    };

    return (
        <Routes>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route path="/registration" element={<Register />} />
        </Routes>
    );
}

export default App;
