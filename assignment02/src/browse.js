import "./App.css";
import React, { useState } from "react";
import { Products } from "./Products";
import CheckoutForm from "./Checkout";
import Cart from "./cart";

// ProductList Component
const ProductList = ({ ProductsCategory, addToCart, removeFromCart, cart }) => {
  return (
    <div className="category-section overflow-auto">
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">
        Products ({ProductsCategory.length})
      </h2>
      <div className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-10">
        {ProductsCategory.map((product, index) => (
          <div key={index} className="group relative shadow-lg">
            {/* Product Image and Details */}
            <div className="min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none">
              <img
                alt="Product"
                src={product.image}
                className="w-full h-full object-center object-cover lg:w-full lg:h-full"
              />
            </div>
            <div className="flex justify-between p-3">
              <div>
                <h3 className="text-sm text-gray-700">{product.title}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Rating: {product.rating.rate}
                </p>
              </div>
              <p className="text-sm font-medium text-green-600">
                ${product.price}
              </p>
            </div>
            {/* Add and Remove Buttons */}
            <div className="flex justify-between items-center p-3">
              <button
                className="px-2 py-1 border rounded text-green-800 border-green-600 hover:bg-green-600 hover:text-white"
                onClick={() => addToCart(product)}
              >
                +
              </button>
              <span>{cart[product.id] ? cart[product.id].quantity : 0}</span>
              <button
                className="px-2 py-1 border rounded text-red-800 border-red-600 hover:bg-red-600 hover:text-white"
                onClick={() => removeFromCart(product)}
              >
                -
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [ProductsCategory, setProductsCategory] = useState(Products);
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState({});
  const [currentView, setCurrentView] = useState("browse"); // 'browse', 'cart', or 'checkout'

  // Add to Cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const quantity = prevCart[product.id]
        ? prevCart[product.id].quantity + 1
        : 1;
      return { ...prevCart, [product.id]: { ...product, quantity } };
    });
  };

  // Remove from Cart
  const removeFromCart = (product) => {
    setCart((prevCart) => {
      if (!prevCart[product.id]) return prevCart;
      if (prevCart[product.id].quantity === 1) {
        const newCart = { ...prevCart };
        delete newCart[product.id];
        return newCart;
      }
      return {
        ...prevCart,
        [product.id]: {
          ...product,
          quantity: prevCart[product.id].quantity - 1,
        },
      };
    });
  };

  const handleCheckoutSubmit = (formData) => {
    // Process checkout here (e.g., send data to your backend)
    console.log(formData); // For demonstration

    // Clear the cart after successful checkout
    setCart({});

    // Navigate to a confirmation view or back to browsing
    setCurrentView("browse");
    // Optionally, implement a confirmation view and navigate there instead
  };

  // Handle search change
  const handleChange = (e) => {
    setQuery(e.target.value);
    const results = Products.filter((product) =>
      product.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setProductsCategory(results);
  };

  // Calculate total items in the cart
  const totalItems = Object.values(cart).reduce(
    (acc, { quantity }) => acc + quantity,
    0
  );

  const onCheckout = () => {
    setCurrentView("checkout");
  };

  return (
    <div className="flex flex-col">
      <header className="bg-slate-800 p-3 text-white w-full flex justify-between items-center">
        {/* Search Bar, only show if in 'browse' view */}
        {currentView === "browse" && (
          <input
            type="search"
            value={query}
            placeholder="Search products..."
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full max-w-md p-2.5"
          />
        )}

        {/* Display logic for when in 'browse' or 'cart' view */}
        {(currentView === "browse" ||
          (currentView === "cart" && totalItems > 0)) && (
          <div className="text-white">
            <span>Cart Items: {totalItems}</span>
            <button
              onClick={() => setCurrentView("cart")}
              className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              View Cart
            </button>
          </div>
        )}

        {/* "Home" button logic for when in 'checkout' view */}
        {currentView === "checkout" && (
          <button
            onClick={() => setCurrentView("browse")}
            className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Home
          </button>
        )}
      </header>

      {currentView === "checkout" && (
        <CheckoutForm onSubmit={handleCheckoutSubmit} />
      )}

      <div className="flex-1 p-10">
        {currentView === "browse" && (
          <ProductList
            ProductsCategory={ProductsCategory}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            cart={cart}
          />
        )}
        {currentView === "cart" && (
          <div>
            <Cart
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              clearCart={() => setCart({})}
              onCheckout={() => setCurrentView("checkout")}
              onGoHome={() => setCurrentView("browse")}
            />
            <button
              onClick={() => setCurrentView("browse")}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
