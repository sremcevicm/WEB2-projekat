import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import "./DashboardButtons.css";

export const NewOrdersButton = () => {
    return(
        <div className="db-button">
        <Link className="link-text" to="/new-orders">
            <Button variant="light" size="lg" className="dashboard-button">New orders</Button>
        </Link>
        </div>
    )
}