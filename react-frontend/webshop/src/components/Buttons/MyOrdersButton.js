import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"

export const MyOrdersButton = () => {
    return(
        <Link className="link-text" to='/my-orders'>
            <Button className="dashboard-button">My orders</Button>
        </Link>
    )
}