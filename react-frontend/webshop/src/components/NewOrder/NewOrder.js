import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetAllProducts } from "../ProductService";
import { PlaceNewOrder } from "../OrderService";
import { useNavigate } from "react-router-dom";
import { Link, Button, Form, Table } from "react-bootstrap";

export const NewOrder = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [productIds, setProductIds] = useState([]);
    const token = localStorage.getItem("token");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [comment, setComment] = useState("");
    const navigate = useNavigate();

    const handleAlert = (message, type) => {
        if (type === "success") toast.success(message);
        else toast.error(message);
    };

    const addToCart = (productId, quantity) => {
        for (let i = 0; i < quantity; i++) {
            setProductIds((prevItems) => [...prevItems, productId]);
        }
    };

    const placeOrder = async (e) => {
        console.log(productIds);
        e.preventDefault();
        const response = await PlaceNewOrder(
            productIds,
            comment,
            deliveryAddress,
            token,
            handleAlert
        );
        console.log(response);
        if (response !== undefined && response !== "") {
            if (response.data.message === "There is no more this product") {
                handleAlert(
                    "This product was removed from the shop or quantity in warehouse is decreased, please refresh and try again later."
                );
            } else {
                setProductIds([]);
            }
        }
    };

    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const response = await GetAllProducts(handleAlert, token);
                setAllProducts(response);
            } catch (ex) {
                console.log(ex);
            }
        };
        getAllProducts();
    }, []);
    return (
        <>
            <ToastContainer />
            <Link className="link-button" to="/dashboard">
                <Button className="back-to-dashboard-button">User menu</Button>
            </Link>
            <h2 style={{ color: "white" }}>All products</h2>
            {allProducts.length === 0 ? (
                <p>
                    Sorry, there is no available products at the moment, please
                    come back later.
                </p>
            ) : (
                <Table className="verify-sellers-table">
                    <tr className="verify-sellers-table-header-row">
                        <th style={{ display: "none" }}>Id</th>
                        <th>Slika</th>
                        <th>Naziv</th>
                        <th>Cena</th>
                        <th>Dostupna kolicina</th>
                        <th>Opis</th>
                        <th>Kolicina</th>
                    </tr>
                    {allProducts.map((product) => (
                        <>
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>
                                    <img
                                        className="profile-picture"
                                        src={product.image}
                                        alt="No picture"
                                    />
                                </td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{product.description}</td>
                                <td>
                                    <input
                                        type="number"
                                        min="1"
                                        max={product.quantity}
                                        defaultValue="1"
                                        id={`quantity_${product.id}`}
                                    />
                                    <Button
                                        style={{ marginLeft: "5px" }}
                                        onClick={() => {
                                            const quantityInput =
                                                document.getElementById(
                                                    `quantity_${product.id}`
                                                );
                                            const quantity = parseInt(
                                                quantityInput.value
                                            );
                                            if (
                                                quantity <= product.quantity &&
                                                quantity > 0
                                            ) {
                                                addToCart(product.id, quantity);
                                                quantityInput.value = "1";
                                                handleAlert(
                                                    "Successfully added product(s) to the cart.",
                                                    "success"
                                                );
                                            } else {
                                                handleAlert(
                                                    `You can order between 0 and ${product.quantity} items called '${product.name}'`,
                                                    "error"
                                                );
                                            }
                                        }}
                                    >
                                        Add to cart
                                    </Button>
                                </td>
                            </tr>
                        </>
                    ))}
                </Table>
            )}
            <Form className="place-new-order-form" onSubmit={placeOrder}>
                <label htmlFor="deliveryAddress">Delivery address:</label>
                <input
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    type="deliveryAddress"
                    placeholder="Enter your address"
                    id="deliveryAddress"
                    name="deliveryAddress"
                />
                <label htmlFor="comment">Comment:</label>
                <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    type="comment"
                    placeholder="Anything we need to know?"
                    id="comment"
                    name="comment"
                />
                <Button className="place-order-button" type="submit">
                    Place order
                </Button>
            </Form>
        </>
    );
};