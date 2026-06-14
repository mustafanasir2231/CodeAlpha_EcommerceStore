import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm({ clientSecret, orderId }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setError(result.error.message);
      setLoading(false);
    } else if (result.paymentIntent.status === "succeeded") {
      const token = localStorage.getItem("token");
      await fetch(`/api/orders/${orderId}/pay`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: result.paymentIntent.id,
          status: result.paymentIntent.status,
          update_time: new Date().toISOString(),
          email_address: "",
        }),
      });

      setSuccess(true);
      setLoading(false);
      setTimeout(() => navigate("/myorders"), 2000);
    }
  };

  if (success) {
    return (
      <div style={styles.successBox}>
        <h2>✅ Payment Successful!</h2>
        <p>Your order has been confirmed. You will be redirected to your orders page shortly...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3 style={styles.cardLabel}>Card Details</h3>
      <div style={styles.cardBox}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#333",
                "::placeholder": { color: "#aaa" },
              },
            },
          }}
        />
      </div>
      <p style={styles.testHint}>
        🧪 Test card: <strong>4242 4242 4242 4242</strong> | Expiry:{" "}
        <strong>12/26</strong> | CVC: <strong>123</strong>
      </p>
      {error && <p style={styles.errorText}>{error}</p>}
      <button type="submit" disabled={!stripe || loading} style={styles.btn}>
        {loading ? "Processing Payment..." : "Pay Now"}
      </button>
    </form>
  );
}

export default function PaymentPage() {
  const [clientSecret, setClientSecret] = useState("");
  const [orderId, setOrderId] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const placeOrder = async () => {
      const token = localStorage.getItem("token");
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");

      if (!cart.length) {
        navigate("/cart");
        return;
      }

      const totalPrice = cart.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );

      const shippingAddress = JSON.parse(
        localStorage.getItem("shippingAddress") || "{}"
      );

      try {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            orderItems: cart,
            shippingAddress,
            paymentMethod: "Stripe",
            totalPrice,
          }),
        });

        const data = await res.json();
        setClientSecret(data.clientSecret);
        setOrderId(data.order._id);
        setOrderDetails(data.order);
      } catch (err) {
        console.error("Failed to create order:", err);
      }
    };

    placeOrder();
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>💳 Payment</h2>
        {orderDetails && (
          <div style={styles.summary}>
            <p><strong>Items:</strong> {orderDetails.orderItems.length}</p>
            <p><strong>Total:</strong> ${orderDetails.totalPrice}</p>
          </div>
        )}
        {clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm clientSecret={clientSecret} orderId={orderId} />
          </Elements>
        ) : (
          <p style={styles.loading}>Preparing your order...</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f5f5f5", padding: "20px" },
  card: { backgroundColor: "#fff", borderRadius: "12px", padding: "40px", width: "100%", maxWidth: "480px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" },
  title: { textAlign: "center", marginBottom: "24px", fontSize: "24px" },
  summary: { backgroundColor: "#f9f9f9", borderRadius: "8px", padding: "16px", marginBottom: "24px", fontSize: "15px" },
  form: { display: "flex", flexDirection: "column", gap: "16px" },
  cardLabel: { fontSize: "15px", fontWeight: "500", marginBottom: "4px" },
  cardBox: { border: "1px solid #ddd", borderRadius: "8px", padding: "14px", backgroundColor: "#fafafa" },
  testHint: { fontSize: "13px", color: "#888", backgroundColor: "#fff8e1", padding: "10px", borderRadius: "6px" },
  errorText: { color: "red", fontSize: "14px" },
  btn: { backgroundColor: "#635bff", color: "#fff", border: "none", borderRadius: "8px", padding: "14px", fontSize: "16px", cursor: "pointer", fontWeight: "600" },
  successBox: { textAlign: "center", padding: "20px", color: "green" },
  loading: { textAlign: "center", color: "#888" },
};