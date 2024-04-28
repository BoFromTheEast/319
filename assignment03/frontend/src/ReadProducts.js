import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function ReadProducts() {
  const [products, setProducts] = useState([]);
  const [showViewer, setShowViewer] = useState(false);

  useEffect(() => {
    getAllProducts();
  }, []);

  function getAllProducts() {
    fetch("http://localhost:8081/getAllProducts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Catalog of Products:", data);
        setProducts(data);
        setShowViewer(true); // Show products only after they are fetched
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }

  const showAllItems = products.map((el) => (
    <div key={el._id}>
      <img src={el.image} width="100" alt={el.title} />{" "}
      {/* Adjusted width for better visibility */}
      <h4>{el.title}</h4> {/* Use heading for title */}
      <p>Category: {el.category}</p>
      <p>Price: ${el.price}</p>
      {/* Assuming 'Rating' is an object with 'Rate' and 'Count' properties */}
      <p>
        Rating: {el.rating?.rate} ({el.rating?.count} reviews)
      </p>
    </div>
  ));

  return (
    // <div>
    //   <Card style={{ width: "18rem" }}>
    //     <Card.Img variant="top" src="holder.js/100px180" />
    //     <Card.Body>
    //       <Card.Title>Card Title</Card.Title>
    //       <Card.Text>
    //         Some quick example text to build on the card title and make up the
    //         bulk of the card's content.
    //       </Card.Text>
    //       <Button variant="primary">Go somewhere</Button>
    //     </Card.Body>
    //   </Card>

    //   <h1>Catalog of Products</h1>
    //   {/* <a onClick={getAllProducts}>Refresh Products</button> */}
    //   {showViewer && <div>{showAllItems}</div>}
    // </div>
    <div>
      <h1>Catalog of Products</h1>
      {showViewer && (
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-2 mb-2">
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.title}
                />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>
                    <p>Category: {product.category}</p>
                    <p>Price: ${product.price}</p>
                    <p>
                      Rating: {product.rating?.rate} ({product.rating?.count}{" "}
                      reviews)
                    </p>
                  </Card.Text>
                  {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReadProducts;
