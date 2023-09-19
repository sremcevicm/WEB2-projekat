import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import "./DashboardButtons.css";

export const MyOrdersButton = () => {
    return(
        <div className="db-button">
        <Link className="link-text" to='/my-orders'>
            <Button variant="light" size="lg" className="dashboard-button">My orders</Button>
        </Link>
        </div>
    )
}