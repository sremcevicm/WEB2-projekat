import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CalculateCountdown, GetAllOrders } from "../../services/OrderServices";
import { Button, Table } from "react-bootstrap";

export const AllOrders = () => {
    const [allOrders, setAllOrders] = useState([]);
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
                const response = await GetAllOrders(handleAlert, token);
                setAllOrders(response);
            } catch (ex) {
                console.log(ex);
            }
        };
        getOrders();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setAllOrders((prevOrders) => {
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
                <Button className="back-to-dashboard-button">User menu</Button>
            </Link>
            <ToastContainer />
            {allOrders.length === 0 ? (
                <p>You do not have any orders</p>
            ) : (
                <Table className="verify-sellers-table" striped bordered>
                    <tr className="verify-sellers-table-header-row">
                        <th style={{ display: "none" }}>Id</th>
                        <th>Broj proizvoda</th>
                        <th>Ukupna cena</th>
                        <th>Vreme porudzbine</th>
                        <th>Vreme dostave</th>
                        <th>Napomena kupca</th>
                        <th>Detalji</th>
                    </tr>
                    {allOrders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.numberOfProducts}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.orderedAt}</td>
                            <td>
                                {order.orderCanceled === true ? (
                                    <p>Otkazana narudzbina</p>
                                ) : (
                                    order.deliveringTime
                                )}
                            </td>
                            <td>{order.comment}</td>
                            <td>
                                <Button
                                    onClick={() => handleDetailedView(order.id)}
                                >
                                    Details
                                </Button>
                            </td>
                        </tr>
                    ))}
                </Table>
            )}
        </>
    );
};
