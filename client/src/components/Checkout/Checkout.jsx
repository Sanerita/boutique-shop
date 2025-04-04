import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get client secret from backend
      const { data: { clientSecret } } = await axios.post('/api/payment/create-payment-intent', {
        totalAmount,
      });

      // Confirm payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        alert(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        alert('Payment successful!');
        // Save order to database
      }
    } catch (error) {
      console.error(error);
      alert('Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <CardElement />
      <Button type="submit" disabled={!stripe || loading} className="mt-3">
        {loading ? 'Processing...' : `Pay $${totalAmount}`}
      </Button>
    </Form>
  );
};

const PaymentScreen = ({ totalAmount }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm totalAmount={totalAmount} />
  </Elements>
);

export default PaymentScreen;