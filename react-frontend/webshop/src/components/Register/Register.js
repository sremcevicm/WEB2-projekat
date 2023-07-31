import FormInput from "../FormInput/FormInput";

import React from "react";

const Register = () => {
    return (
        <div className="register-form">
            <form>
                <FormInput placeholder="Username" />
                <FormInput placeholder="First Name" />
                <FormInput placeholder="Last name" />
                <FormInput placeholder="Email" />
                <FormInput placeholder="Password" />
            </form>
        </div>
    );
};

export default Register;
