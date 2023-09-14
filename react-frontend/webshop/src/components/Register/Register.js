import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router";
import axios from "axios";
import "./Register.css";
import FacebookLoginButton from "../FBLoginButton/FbLoginButton";

function Register(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [address, setAddress] = useState("");
    const [birthDay, setBirthDay] = useState("");
    const [role, setRole] = useState("");
    const [profilePicture, setProfilePicture] = useState("");

    const navigate = useNavigate();

    const userDto = {
        Username: username,
        Password: password,
        Email: email,
        Name: name,
        Surname: surname,
        Address: address,
        BirthDay: birthDay,
        Role: parseInt(role),
        ProfilePicture: profilePicture,
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        console.log(userDto.Role);

        try {
            axios
                .post(process.env.REACT_APP_USERS, userDto)
                .then((response) => {
                    console.log("Product successfully created:", response.data);
                    navigate("/");
                })
                .catch(() => {
                    window.alert("Username or email are already taken");
                    navigate("/registration");
                });
        } catch {
            window.alert("Something went wrong");
            navigate("/registration");
        }
    };

    return (
        <div className="stranica">
            <div className="header">
                <h1>Registracija</h1>
            </div>
            <div className="register-form">
                <Form onSubmit={handleRegister}>
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
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
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
                                value={birthDay}
                                onChange={(e) => setBirthDay(e.target.value)}
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
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
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
                                onChange={(e) => setRole(e.target.value)}
                                value={role}
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
                                    setProfilePicture(e.target.value)
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
                <FacebookLoginButton />
            </div>
        </div>
    );
}

export default Register;
