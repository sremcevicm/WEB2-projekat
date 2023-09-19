import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UpdateProfile } from "../UserService";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import "./ProfileUpdate.css";

export const ProfileUpdate = () => {
    const logedInUser = JSON.parse(localStorage.getItem("logedInUser"));
    const [username, setUsername] = useState(logedInUser.userName);
    const [email, setEmail] = useState(logedInUser.email);
    const [name, setName] = useState(logedInUser.name);
    const [lastname, setLastname] = useState(logedInUser.lastName);
    const [dateOfBirth, setDateOfBirth] = useState(logedInUser.dateOfBirth);
    const [adress, setAdress] = useState(logedInUser.adress);
    const [profilePicture, setProfilePicture] = useState(null);
    const [userType] = useState(logedInUser.userType);
    const [verifiedStatus] = useState(logedInUser.verified);

    const handleAlert = (message, type) => {
        if (type === "success") toast.success(message);
        else toast.error(message);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await UpdateProfile(
            username,
            name,
            lastname,
            email,
            dateOfBirth,
            adress,
            profilePicture,
            handleAlert
        );
        setUsername(logedInUser.userName);
        setEmail(logedInUser.email);
        setName(logedInUser.name);
        setLastname(logedInUser.lastName);
        setDateOfBirth(logedInUser.dateOfBirth);
        setAdress(logedInUser.adress);
        setProfilePicture(logedInUser.profilePicture);
        window.location.reload();
    };

    return (
        <>
            <div className="header">
                <h1>Dobrodosli {username}</h1>
            </div>
            <Link className="link-button" to="/dashboard">
                <button className="back-to-dashboard-button">User menu</button>
            </Link>
            {userType === "Seller" && (
                <label className="verified-status">{verifiedStatus}</label>
            )}
            <div className="my-profile-form-container">
                <ToastContainer />
                <Form onSubmit={handleSubmit}>
                    <Table striped="columns" borderless hover>
                        <tbody>
                            <tr>
                                <td>Profilna slika</td>
                                <td>
                                    <div className="profile-picture-container">
                                        <Image
                                            src={logedInUser.profilePicture}
                                            alt="Profile"
                                            className="profile-picture"
                                            rounded
                                        />
                                    </div>
                                    <Form.Group>
                                        <Form.Label>Promeni</Form.Label>
                                        <Form.Control
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                setProfilePicture(
                                                    e.target.files[0]
                                                )
                                            }
                                            value={profilePicture}
                                        />
                                    </Form.Group>
                                </td>
                            </tr>
                            <tr>
                                <td>Email Adresa</td>
                                <td>
                                    <Form.Group
                                        as={Row}
                                        className="mb-3"
                                        controlId="formHorizontalEmail"
                                    >
                                        <Form.Label column sm={2}>
                                            Promeni email
                                        </Form.Label>
                                        <Col sm={10}>
                                            <Form.Control
                                                type="email"
                                                placeholder="xxxxxxxxx@aaaa.ccc"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                            />
                                        </Col>
                                    </Form.Group>
                                </td>
                            </tr>
                            <tr>
                                <td>Ime</td>
                                <td>
                                    <Form.Group
                                        as={Row}
                                        className="mb-3"
                                        controlId="formHorizontalName"
                                    >
                                        <Form.Label column sm={2}>
                                            Promeni ime
                                        </Form.Label>
                                        <Col sm={10}>
                                            <Form.Control
                                                type="text"
                                                placeholder="Ime"
                                                value={name}
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                            />
                                        </Col>
                                    </Form.Group>
                                </td>
                            </tr>
                            <tr>
                                <td>Prezime</td>
                                <td>
                                    <Form.Group
                                        as={Row}
                                        className="mb-3"
                                        controlId="formHorizontalName"
                                    >
                                        <Form.Label column sm={2}>
                                            Promeni prezime
                                        </Form.Label>
                                        <Col sm={10}>
                                            <Form.Control
                                                type="text"
                                                placeholder="Prezime"
                                                value={lastname}
                                                onChange={(e) =>
                                                    setLastname(e.target.value)
                                                }
                                            />
                                        </Col>
                                    </Form.Group>
                                </td>
                            </tr>

                            <tr>
                                <td>Datum rodjenja</td>
                                <td>
                                    <Form.Group
                                        as={Row}
                                        className="mb-3"
                                        controlId="formHorizontalBirthDay"
                                    >
                                        <Form.Label column sm={2}>
                                            Promeni datum rodjenja
                                        </Form.Label>
                                        <Col sm={10}>
                                            <Form.Control
                                                type="date"
                                                value={dateOfBirth}
                                                onChange={(e) =>
                                                    setDateOfBirth(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </Col>
                                    </Form.Group>
                                </td>
                            </tr>

                            <tr colSpan="2">
                                <Form.Group as={Row} className="mb-3">
                                    <Col sm={{ span: 10, offset: 1 }}>
                                        <Button type="submit">Update</Button>
                                    </Col>
                                </Form.Group>
                            </tr>
                        </tbody>
                    </Table>
                </Form>
            </div>
        </>
    );
};
