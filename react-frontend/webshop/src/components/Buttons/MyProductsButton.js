import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import "./DashboardButtons.css";

export const MyProductsButton = () => {
    return(
        <div className="db-button">
        <Link className="link-text" to='/my-products'>
            <Button variant="light" size="lg" className="dashboard-button">My products</Button>
        </Link>
        </div>
    )
}