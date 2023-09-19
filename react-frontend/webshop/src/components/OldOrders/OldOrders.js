import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetBuyersOrders } from "../OrderService";
import {
    CalculateCountdown,
    CanOrderBeCanceled,
    CancelOrder,
} from "../OrderService";
import { Button, Table } from "react-bootstrap";

export const OldOrders = () => {
    const [myOrders, setMyOrders] = useState([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleAlert = (message, type) => {
        if (type === "success") toast.success(message);
        else toast.error(message);
    };

    const handleCancelOrder = async (orderId) => {
        console.log("Cancel order");
        await CancelOrder(token, orderId, handleAlert, navigate);
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
                const response = await GetBuyersOrders(handleAlert, token);
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
                <p>Nemas ni jednu posiljku</p>
            ) : (
                <Table className="verify-sellers-table">
                    <tr className="verify-sellers-table-header-row">
                        <th style={{ display: "none" }}>Id</th>
                        <th>Kolicina</th>
                        <th>Ukupna cena</th>
                        <th>Vreme narucivanja</th>
                        <th>Vreme dostave</th>
                        <th>Vas komentar</th>
                        <th>Detalji</th>
                        <th>Odustani</th>
                    </tr>
                    {myOrders.map(order => (
                    <tr key={order.id}>
                        <td style={{display:"none"}}>{order.id}</td>
                        <td>{order.numberOfProducts}</td>
                        <td>{order.totalPrice}</td>
                        <td>{order.orderedAt}</td>
                        <td>
                            {order.orderCanceled === true ?(
                                <p style={{color:"white"}}>Order is canceled</p>
                            ):
                            (order.deliveringTime)
                            }
                        </td>
                        <td>{order.comment}</td>
                        <td><button onClick={() => handleDetailedView(order.id)}>Details</button></td>
                        <td>
                            {order.orderCanceled === true ?(
                                <p style={{color:"white"}}>Order is canceled</p>
                            ) : CanOrderBeCanceled(order) ? (
                                <button onClick = {() => handleCancelOrder(order.id)}>Cancel order</button>
                            ) : (
                                <p style={{color:"white"}}>
                                    It is too late to cancel it now.
                                </p>
                            )}
                        </td>
                    </tr>
                ))}
                </Table>
            )}
        </>
    );
};
