import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CalculateCountdown, GetSellersOldOrders } from "../OrderService";
import { Button, Table } from "react-bootstrap";

export const MyOrders = () => {
    const [myOrders, setMyOrders] = useState([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleAlert = (message, type) => {
        if (type === "success") toast.success(message);
        else toast.error(message);
    };

    const handleDetailedView = async (orderId) => {
        navigate("/order-details", {
            state: {
                pOrderId: orderId,
            },
        });
    };

    useEffect(() => {
        const getOrders = async () => {
            try {
                const response = await GetSellersOldOrders(handleAlert, token);
                setMyOrders(response);
            } catch (ex) {
                console.log(ex);
            }
        };
        getOrders();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setMyOrders((prevOrders) => {
                return prevOrders.map((order) => {
                    const updatedOrder = { ...order };
                    if (!updatedOrder.initialDeliveryTime) {
                        updatedOrder.initialDeliveryTime =
                            updatedOrder.deliveringTime;
                    }

                    updatedOrder.deliveringTime = CalculateCountdown(
                        updatedOrder.initialDeliveryTime
                    );

                    return updatedOrder;
                });
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Link className="link-button" to="/dashboard">
                <Button className="back-to-dashboard-button">Meni</Button>
            </Link>
            <ToastContainer />
            {myOrders.length === 0 ? (
                <p>Nemate porudzbina</p>
            ) : (
                <Table className="verify-sellers-table">
                    <tr className="verify-sellers-table-header-row">
                        <th style={{ display: "none" }}>Id</th>
                        <th>Broj proizvoda</th>
                        <th>Ukupna cena</th>
                        <th>Vreme porudzbine</th>
                        <th>Ocekivano vreme dostave</th>
                        <th>Komentar kupca</th>
                        <th>Detalji</th>
                    </tr>
                    {myOrders.map(order => (
                    <tr key={order.id}>
                        <td style={{display:"none"}}>{order.id}</td>
                        <td>{order.numberOfProducts}</td>
                        <td>{order.totalPrice}</td>
                        <td>{order.orderedAt}</td>
                        <td>{order.deliveringTime}</td>
                        <td>{order.comment}</td>
                        <td><button onClick={() => handleDetailedView(order.id)}>Details</button></td>
                    </tr>
                ))}
                </Table>
            )}
        </>
    );
};
