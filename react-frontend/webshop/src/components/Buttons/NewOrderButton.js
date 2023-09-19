import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"
import "./DashboardButtons.css";

export const NewOrderButton = () => {
    return(
        <div className="db-button">
        <Link className="link-text" to='/new-order'>
            <Button variant="light" size="lg" className="dashboard-button">New order</Button>
        </Link>
        </div>
    )
}