import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export const AllOrdersButton = () => {
    return (
        <Link className="link-text" to="/all-orders">
            <Button className="dashboard-button">All orders</Button>
        </Link>
    );
};
