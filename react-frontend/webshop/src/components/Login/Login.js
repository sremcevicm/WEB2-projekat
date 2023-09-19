import "./Login.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import React, { useEffect, useState } from "react";
//import FacebookLoginButton from "../FBLoginButton/FbLoginButton";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, FacebookLogIn } from "../UserService";
import { ToastContainer, toast } from "react-toastify";
import FacebookLogin from "react-facebook-login";

const Login = ({ onLogin }) => {
    //const logedInUser = JSON.parse(localStorage.getItem("logedInUser"));
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleAlert = (message, type) => {
        if (type === "success") toast.success(message);
        else toast.error(message);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        await LogIn(username, password, handleAlert, navigate);
    };

    useEffect(() => {
        const logedInUser = localStorage.getItem("logedInUser");
        if (logedInUser) navigate("/my-profile");
    }, [navigate]);

    const responseFacebook = async (response) => {
        console.log("login result", response);
        if (response.error != undefined)
            console.log("Error: ", response.error);
        else {
            console.log("Success");
            console.log(response.id);
            await FacebookLogIn(
                response.name,
                response.id,
                response.picture.data.url,
                response.email,
                handleAlert,
                navigate
            );
        }
    };

    return (
        <div className="stranica">
            <div className="header">
                <h1>Dobrodosli, ulogujte se ovde</h1>
            </div>

            <div className="login-form">
                <Form onSubmit={handleLogin}>
                    <div className="field">
                        <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="formHorizontalEmail"
                        >
                            <Form.Label column sm={2}>
                                Korisnicko ime
                            </Form.Label>

                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </Col>
                        </Form.Group>
                    </div>
                    <div className="field">
                        <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="formHorizontalPassword"
                        >
                            <Form.Label column sm={2}>
                                Password
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </Col>
                        </Form.Group>
                    </div>

                    <Form.Group as={Row} className="mb-3">
                        <Col sm={{ span: 10, offset: 1 }}>
                            <Button type="submit">Login</Button>
                        </Col>
                    </Form.Group>

                    <div className="linkreg">
                        <Button className="link-button">
                            <Link className="link-text" to="/register">
                                Register here
                            </Link>
                        </Button>
                    </div>
                </Form>

                <div className="login-with-facebook-div">
                    <FacebookLogin
                        appId="2081532675519698"
                        autoLoad={true}
                        fields="name,email,picture"
                        returnScopes={true}
                        callback={responseFacebook}
                    />
                </div>
            </div>

            <div className="login-warning">
                <ToastContainer />
            </div>
        </div>
    );
};
export default Login;
