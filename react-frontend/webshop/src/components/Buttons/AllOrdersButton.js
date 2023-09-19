import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./DashboardButtons.css";

export const AllOrdersButton = () => {
    return (
        <div className="db-button">
        <Link className="link-text" to="/all-orders">
            <Button variant="light" size="lg" className="dashboard-button">All orders</Button>
        </Link>
        </div>
    );
};
