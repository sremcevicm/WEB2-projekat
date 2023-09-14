import "./Login.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import axios from "axios";
import FacebookLoginButton from "../FBLoginButton/FbLoginButton";

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        //setLoading(true);
        try {
            const response = await axios.post(
                process.env.REACT_APP_LOGIN_USER,
                {
                    Email: email,
                    Password: password,
                }
            );

            const result = response.data;
            if (result !== "") {
                localStorage.setItem("token", result.data);
                console.log("Upao u trazenje emaila:");
                console.log(email);
                axios
                    .get(process.env.REACT_APP_GET_USER_BY_EMAIL, {
                        params: {
                            email: email,
                        },
                    })
                    .then((result) => {
                        if (result.data !== null) {
                            const userData = result.data;
                            onLogin(userData);
                        }
                    });
            }
        } catch (error) {
            window.alert("Wrong email or password");
        } finally {
            //setLoading(false); // Set loading state back to false after API call
        }
    };

    return (
        <div className="stranica">
            <div className="header">
                <h1>Dobrodosli, ulogujte se ovde</h1>
            </div>
            <div className="login-form">
                <Form onSubmit={handleSubmit}>
                    <div className="field">
                        <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="formHorizontalEmail"
                        >
                            <Form.Label column sm={2}>
                                Email
                            </Form.Label>

                            <Col sm={10}>
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                    <FacebookLoginButton />
                    <div className="linkreg">
                        <a href="/registration">
                            Nemate nalog? Registrujte se ovde.
                        </a>
                    </div>
                </Form>
            </div>
        </div>
    );
};
export default Login;
