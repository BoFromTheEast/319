import React from 'react';
import CheckoutForm from "./Checkout";
import Cart from "./cart";
const ConfirmationView = ({ orderDetails, onNavigateBack, onContinueShopping}) => {
  //order details
  const { items, totalAmount, userInfo } = orderDetails;

  //hide last 4 digits
  const redactCardNumber = (cardNumber) => {
    return cardNumber.slice(0, -4).replace(/\d/g, '*') + cardNumber.slice(-4);
  };

  return (
<div className="flex flex-col justify-center items-center min-h-screen">
  <div className="confirmation-page w-full max-w-2xl mx-auto p-4">
    <h1 className="text-2xl font-bold text-center mb-6">Order Confirmation</h1>
    <div className="items-list grid grid-cols-1 gap-4 mb-6">
      {items.map((item, index) => (
        <div key={index} className="item flex justify-center items-center flex-col">
          <img src={item.image} alt={item.name} className="w-24 h-auto mb-2" />
          <div className="text-lg font-semibold">{item.name}</div>
          <div>${item.price.toFixed(2)}</div>
        </div>
      ))}
    </div>

    <div className="total-amount text-center mb-6">
      <h2 className="text-xl font-semibold">Total Amount: ${totalAmount.toFixed(2)}</h2>
      
    </div>

    <div className="user-info text-center mb-6">
      <h2 className="text-xl font-semibold mb-2">Your Information</h2>
      <p>Name: {userInfo.name}</p>
      <p>Email: {userInfo.email}</p>
      <p>Address: {userInfo.address}</p>
      <p>City: {userInfo.city}</p>
      <p>State: {userInfo.state}</p>
      <p>ZIP: {userInfo.zip}</p>
      <p>Card Number: {redactCardNumber(userInfo.cardNumber)}</p>
    </div>

    <div className="text-center">
      <button onClick={onContinueShopping} className="btn btn-primary px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700">
        Continue Shopping
      </button>
    </div>
  </div>
</div>

  );
};

export default ConfirmationView;
