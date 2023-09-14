import React from "react";
import { Button } from "react-bootstrap";

function FacebookLoginButton() {
    const handleFacebookLogin = () => {
        // Dodajte ovde logiku za prijavu putem Facebook-a
        window.FB.login(function (response) {
            if (response.authResponse) {
                // Korisnik je se uspešno prijavio preko Facebook-a
                console.log(
                    "Prijavljen putem Facebook-a",
                    response.authResponse
                );
            } else {
                // Korisnik nije se uspešno prijavio
                console.log("Prijavljivanje preko Facebook-a nije uspelo");
            }
        });
    };

    return (
        <Button variant="primary" onClick={handleFacebookLogin}>
            Prijavite se putem Facebook-a
        </Button>
    );
}

export default FacebookLoginButton;
