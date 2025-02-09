import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess }) => {
  const clientId = process.env.REACT_APP_CLIENT_ID;

  return (
    <PayPalScriptProvider options={{ "client-id": clientId }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: amount.toString() } }],
          });
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order.capture();
          console.log("Datos recibidos de PayPal:", order);
          onSuccess(order); // Callback para manejar el éxito
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
