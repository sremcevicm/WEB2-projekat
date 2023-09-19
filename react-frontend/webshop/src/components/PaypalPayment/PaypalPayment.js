import { PayPalButtons } from "@paypal/react-paypal-js";

const PaypalPayment = (props) => {
    const {price} = props;

    const handleApprove = (orderID) => {
        
    }

    return(
        <PayPalButtons
            style={{
                color: "silver",
                layout: "vertical",
                height: 40,
                tagline: false,
                shape: "pill"
            }}
            createOrder={(data, actions) =>{
                return actions.order.create({
                    purchase_units: [
                        {
                            amount:{
                                value: price
                            }
                        }
                    ]
                });  
            } }
            onApprove={async(data, actions) => {
                const order = await actions.order.capture();
                console.log("order", order)

                handleApprove(data.orderID);
            } }
        />
    )
}