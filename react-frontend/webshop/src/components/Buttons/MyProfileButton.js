import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import "./DashboardButtons.css";

export const MyProfileButton = () => {
    return(
        <div className="db-button">
        <Link className="link-text" to='/my-profile'>
            <Button variant="light" size="lg" className="dashboard-button">My profile</Button>
            </Link>
            </div>
    )
}