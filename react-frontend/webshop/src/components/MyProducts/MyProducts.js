import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetSellersProducts } from "../ArticleService";
import { DeleteProduct } from "../ArticleService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { BackButton } from "../Buttons/BackButton";

export const MyProducts = () => {
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleAlert = (message, type) => {
        if (type === "success") toast.success(message);
        else toast.error(message);
    };

    const handleUpdateProduct = async (
        id,
        name,
        price,
        quantity,
        description,
        image
    ) => {
        navigate("/update-product", {
            state: {
                pId: id,
                pName: name,
                pPrice: price,
                pQuantity: quantity,
                pDescription: description,
                pImage: image,
            },
        });
    };

    const handleDeleteProduct = async (productId) => {
        await DeleteProduct(handleAlert, token, productId);
        window.location.reload();
    };

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await GetSellersProducts(handleAlert, token);
                setProducts(response);
            } catch (ex) {
                console.log(ex);
            }
        };
        getProducts();
    }, []);

    return (
        <>
            <BackButton/>
            <ToastContainer />
            <h2 style={{marginTop:"15px"}}>Moji artikli</h2>
            {products.length === 0 ? (
                <p>Nemate artikala, moracete dodati</p>
            ) : (
                <Table borderless className="verify-sellers-table">
                    <tr className="verify-sellers-table-header-row">
                        <th style={{ display: "none" }}>Id</th>
                        <th>Slika</th>
                        <th>Naziv</th>
                        <th>Cena</th>
                        <th>Kolicina</th>
                        <th>Opis</th>
                        <th>Opcije</th>
                    </tr>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td style={{ display: "none" }}>{product.id}</td>
                            <td>
                                <img
                                    className="profile-picture"
                                    src={product.image}
                                    alt="Nothing"
                                    style={{ maxWidth: "300px" }}
                                />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>{product.description}</td>
                            <td>
                                <>
                                    <Button
                                        onClick={() =>
                                            handleUpdateProduct(
                                                product.id,
                                                product.name,
                                                product.price,
                                                product.quantity,
                                                product.description,
                                                product.image
                                            )
                                        }
                                    >
                                        Azuriraj
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            handleDeleteProduct(product.id)
                                        }
                                        style={{marginTop:"15px"}}
                                    >
                                        Obrisi
                                    </Button>
                                </>
                            </td>
                        </tr>
                    ))}
                </Table>
            )}
            <Link className="link-button" to="/add-new-product">
                <Button className="add-new-product-button">
                    Dodaj novi artikal
                </Button>
            </Link>
        </>
    );
};
