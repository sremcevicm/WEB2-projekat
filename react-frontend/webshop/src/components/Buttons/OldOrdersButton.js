import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"
import "./DashboardButtons.css";

export const OldOrdersButton = () => {
    return(
        <div className="db-button">
        <Link className="link-text" to='/old-orders'>
            <Button variant="light" size="lg" className="dashboard-button">Old orders</Button>
        </Link>
        </div>
    )
}