import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"
import "./DashboardButtons.css";

export const VerifyUsersButton = () => {
    return(
        <div className="db-button">
        <Link className="link-text" to='/verify-users'>
            <Button variant="light" size="lg" className="dashboard-button">Verify users</Button>
        </Link>
        </div>
        )
}