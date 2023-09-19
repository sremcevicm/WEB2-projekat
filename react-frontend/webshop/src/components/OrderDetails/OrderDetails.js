import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetOrderDetails, IsOrderDelivered } from "../OrderService";
import { Table, Button } from "react-bootstrap";

export const OrderDetails = () => {
    const logedInUser = JSON.parse(localStorage.getItem("logedInUser"));
    const [userType, setUserType] = useState(logedInUser.userType);
    const location = useLocation();
    const [orderDetails, setOrderDetails] = useState({ products: [] });
    const token = localStorage.getItem("token");
    const { pOrderId } = location.state;

    const handleAlert = (message, type) => {
        if (type === "success") toast.success(message);
        else toast.error(message);
    };

    useEffect(() => {
        const getOrderDetails = async () => {
            try {
                const response = await GetOrderDetails(
                    handleAlert,
                    token,
                    pOrderId,
                    userType
                );
                setOrderDetails(response);
            } catch (ex) {
                console.log(ex);
            }
        };
        getOrderDetails();
    }, []);

    return (
        <>
            <Link className="link-button" to="/dashboard">
                <Button className="back-to-dashboard-button">Meni</Button>
            </Link>
            <ToastContainer />
            <h2>Detalji porudzbine</h2>
            <Table className="verify-sellers-table">
                <tr className="verify-sellers-table-header-row">
                    <th>Vreme narudzbine</th>
                    <th>Vreme dostave</th>
                    <th>Ukupna cena</th>
                    <th>Adresa</th>
                    <th>Komentar</th>
                    <th>Status</th>
                </tr>
                <tr>
                    <td>{orderDetails.orderedAt}</td>
                    <td>
                        {orderDetails.isCanceled === true ? (
                            <p>Otkazano</p>
                        ) : (
                            orderDetails.deliveringTime
                        )}
                    </td>
                    <td>{orderDetails.totalPrice}</td>
                    <td>{orderDetails.address}</td>
                    <td>{orderDetails.comment}</td>
                    <td>
                        {orderDetails.isCanceled === true ? (
                            <p>Otkazano</p>
                        ) : IsOrderDelivered(orderDetails.deliveringTime) ? (
                            <p>Dostavljeno</p>
                        ) : (
                            <p>Dostava je u toku</p>
                        )}
                    </td>
                </tr>
            </Table>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <h3>Naruceni proizvodi</h3>
            <Table className="order-details-product-table">
                <tr className="verify-sellers-table-header-row">
                    <th>Slika</th>
                    <th>Ime</th>
                    <th>Opis</th>
                    <th>Cena po komadu</th>
                    <th>Naruceno komada</th>
                </tr>
                {orderDetails.products.map((product) => (
                    <tr key={product.id}>
                        <td>
                            <img
                                className="profile-picture"
                                src={product.image}
                                alt="Nothing"
                            />
                        </td>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td>{product.quantity}</td>
                    </tr>
                ))}
            </Table>
        </>
    );
};
