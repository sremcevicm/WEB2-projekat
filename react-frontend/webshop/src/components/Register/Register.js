import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RegisterUser } from "../UserService";
import FacebookLogin from "react-facebook-login";

export const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [adress, setAdress] = useState("");
    const [userType, setUserType] = useState("seller");
    const [profilePicture, setProfilePicture] = useState(null);
    const navigate = useNavigate();

    const handleAlert = (message, type) => {
        if (type === "success") toast.success(message);
        else toast.error(message);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await RegisterUser(
            username,
            email,
            password,
            passwordRepeat,
            name,
            lastname,
            dateOfBirth,
            adress,
            userType,
            profilePicture,
            handleAlert,
            navigate
        );
    };

    const responseFacebook = (response) => {
        console.log("login result", response);
    };

    return (
        <div className="stranica">
            <div className="header">
                <h1>Registracija</h1>
            </div>
            <div className="register-form">
                <Form onSubmit={handleSubmit}>
                    <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formHorizontalUsername"
                    >
                        <Form.Label column sm={2}>
                            Korisnicko ime
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                placeholder="Korisnicko ime"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Col>
                    </Form.Group>

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
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formHorizontalPassword"
                    >
                        <Form.Label column sm={2}>
                            Repeat Password
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="password"
                                placeholder="Repeat Password"
                                value={passwordRepeat}
                                onChange={(e) =>
                                    setPasswordRepeat(e.target.value)
                                }
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formHorizontalName"
                    >
                        <Form.Label column sm={2}>
                            Ime
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                placeholder="Ime"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formHorizontalSurName"
                    >
                        <Form.Label column sm={2}>
                            Prezime
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                placeholder="Prezime"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formHorizontalBirthDay"
                    >
                        <Form.Label column sm={2}>
                            Datum rodjenja
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="date"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formHorizontalAdress"
                    >
                        <Form.Label column sm={2}>
                            Adresa
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                placeholder="Adresa"
                                value={adress}
                                onChange={(e) => setAdress(e.target.value)}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formHorizontalRole"
                    >
                        <Form.Label column sm={2}>
                            Uloga
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Select
                                onChange={(e) => setUserType(e.target.value)}
                                value={userType}
                            >
                                <option value="0">Administrator</option>
                                <option value="1">Prodavac</option>
                                <option value="2">Kupac</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formHorizontalProfilePicture"
                    >
                        <Form.Label column sm={2}>
                            Profilna slika
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setProfilePicture(e.target.files[0])
                                }
                                value={profilePicture}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Col sm={{ span: 10, offset: 1 }}>
                            <Button type="submit">Register</Button>
                        </Col>
                    </Form.Group>
                </Form>
                <div className="inside-div-register-form">
                    <div className="login-dugme">
                        <Button className="link-button">
                            <Link className="link-text" to="/login">
                                Log in here
                            </Link>
                        </Button>
                    </div>
                    <FacebookLogin
                        appId="756599152603732"
                        autoLoad={true}
                        fields="name,email,picture"
                        returnScopes={true}
                        callback={responseFacebook}
                    />
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};
