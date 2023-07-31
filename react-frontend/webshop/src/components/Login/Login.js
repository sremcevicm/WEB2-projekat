import FormInput from "../FormInput/FormInput";
//import { Button } from "bootstrap";

export default function Login() {
    return (
        <div className="login-form">
            <form>
                <FormInput placeholder="Username" />
                <FormInput placeholder="Password" />
            </form>
        </div>
    );
}
