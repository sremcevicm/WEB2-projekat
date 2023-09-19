import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AddProduct } from "../ArticleService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "react-bootstrap";
import { BackButton } from "../Buttons/BackButton";

export const AddNewProduct = () => {
    const token = localStorage.getItem("token");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleAlert = (message, type) => {
        if (type === "success") toast.success(message);
        else toast.error(message);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await AddProduct(
            name,
            price,
            quantity,
            description,
            image,
            handleAlert,
            navigate,
            token
        );
    };

    return (
        <div className="auth-form-container">
            <BackButton/>
            <ToastContainer />
            <h2>Dodaj novi proizvod</h2>
            <form className="add-new-product-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Naziv</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="name"
                    placeholder="product name"
                />

                <label htmlFor="price">Cena</label>
                <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                    placeholder="product price"
                />

                <label htmlFor="quantity">Kolicina</label>
                <input
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    type="number"
                    placeholder="quantity of product in stock"
                    onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                        }
                    }}
                />

                <label htmlFor="description">Opis</label>
                <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    type="description"
                    placeholder="product description"
                />

                <label htmlFor="image">Slika</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    id="image"
                    name="image"
                />

                <Button type="submit" style={{ marginTop:"15px" }}>Dodaj</Button>
            </form>
        </div>
    );
};
