import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"

export const BackButton = () => {
    return(
        <div className="b-dugme">
        <Link className="link-text" to='/dashboard'>
            <Button style={{marginTop:"15px"}} variant="light" size="lg" className="dashboard-button">Meni</Button>
        </Link>
        </div>
    )
}