import React from "react";
//import "bootstrap/dist/css/bootstrap.min.css";

const FormInput = (props) => {
    return (
        <div className="form-input">
            <label>{props.placeholder}</label>
            <input />
            <br />
        </div>
    );
};

export default FormInput;
