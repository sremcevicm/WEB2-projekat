import { ToastContainer } from "react-toastify";
import { MyProductsButton } from "../Buttons/MyProductsButton";
import { AllOrdersButton } from "../Buttons/AllOrdersButton";
import { MyOrdersButton } from "../Buttons/MyOrdersButton";
import { NewOrderButton } from "../Buttons/NewOrderButton";
import { NewOrdersButton } from "../Buttons/NewOrdersButton";
import { OldOrdersButton } from "../Buttons/OldOrdersButton";
import { VerifyUsersButton } from "../Buttons/VerifyUsersButton";
import { MyProfileButton } from "../Buttons/MyProfileButton";
import { Button } from "react-bootstrap";
import "./Dashboard.css";

const buttonsToRender = {
    Admin: [<MyProfileButton />, <AllOrdersButton />, <VerifyUsersButton />],
    Seller: [
        <MyProfileButton />,
        <MyProductsButton />,
        <MyOrdersButton />,
        <NewOrdersButton />,
    ],
    Buyer: [<MyProfileButton />, <NewOrderButton />, <OldOrdersButton />],
};

export const Dashboard = () => {
    const logedInUser = JSON.parse(localStorage.getItem("logedInUser"));
    const buttons = buttonsToRender[logedInUser.userType];

    const handleLogOut = async (e) => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <div className="dashboard-whole">
            <div className="naslov">
                <h1>Pocetna stranica</h1>
            </div>
            <div className="dashboard">
            <Button size="lg" onClick={() => handleLogOut()} className="log-out-button">
                Log out
            </Button>
            </div>
            <ToastContainer />
            <div className="button-container">
            {buttons[0]}
            {buttons[1]}
            {buttons[2]}
            {buttons[3]}
            </div>
        </div>
    );
};
