// Auth persistence
export const loadAuthState = () => {
    try {
      const serializedUser = localStorage.getItem('userInfo');
      return serializedUser ? JSON.parse(serializedUser) : null;
    } catch (error) {
      console.error('Failed to load auth state:', error);
      return null;
    }
  };
  
  // Cart persistence
  export const loadCartState = () => {
    try {
      const serializedCart = localStorage.getItem('cart');
      if (!serializedCart) return undefined;
      
      const cart = JSON.parse(serializedCart);
      return {
        cartItems: cart.cartItems || [],
        shippingAddress: cart.shippingAddress || {},
        paymentMethod: cart.paymentMethod || 'PayPal',
        // Initialize calculated prices as 0
        itemsPrice: 0,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: 0
      };
    } catch (error) {
      console.error('Failed to load cart state:', error);
      return undefined;
    }
  };