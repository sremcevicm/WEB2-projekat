//import logo from './logo.svg';
import "./App.css";
//import { Route, Routes } from "react-router-dom";
//import { Home } from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

function App() {
    return (
        <div className="home-div">
            <div className="naslov">
                <h1>Dobrodosli, ulogujte se ili se registrujte</h1>
            </div>
            <div className="login-and-register">
                <div className="login">
                    <Login />
                </div>
                <div className="register">
                    <Register />
                </div>
            </div>
        </div>
    );
}

export default App;
