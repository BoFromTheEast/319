import React from "react";
import CheckoutForm from "./Checkout";

const Cart = ({ cart, addToCart, removeFromCart, clearCart, onCheckout }) => {
  const itemsInCart = Object.values(cart);
  const totalPrice = itemsInCart.reduce(
    (total, { price, quantity }) => total + price * quantity,
    0
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {itemsInCart.length > 0 ? (
        <div>
          <ul>
            {itemsInCart.map((item) => (
              <li key={item.id} className="mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(item)}
                      aria-label={`Increase quantity for ${item.title}`}
                      className="px-2 py-1 bg-green-500 text-white rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item)}
                      aria-label={`Decrease quantity for ${item.title}`}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      -
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
          </div>
          <div className="mt-4 flex justify-between">
            <button
              onClick={clearCart}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Clear Cart
            </button>
            {/* Proceed to Checkout Button */}
            <button
              onClick={onCheckout}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
