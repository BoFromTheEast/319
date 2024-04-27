import { useState, useEffect } from "react";

function App() {
  const [product, setProduct] = useState([]);
  const [oneProduct, setOneProduct] = useState([]);
  // new Product
  const [addNewProduct, setAddNewProduct] = useState({
    id: 0,
    title: "",
    price: 0.0,
    description: "",
    category: "",
    image: "",
    rating: 0.0,
  });

  const [viewer1, setViewer1] = useState(false);
  const [viewer2, setViewer2] = useState(false);

  useEffect(() => {
    getAllProducts();
  }, []);
  function getAllProducts() {
    fetch("http://127.0.0.1:4000/catalog")
      .then((response) => response.json())
      .then((data) => {
        console.log("Show Catalog of Products :");
        console.log(data);
        setProduct(data);
      });
    setViewer1(!viewer1);
  }
  const showAllItems = product.map((el) => (
    <div key={el.id}>
      <img src={el.image} width={30} alt="images" /> <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      Rating :{el.rating} <br />
    </div>
  ));
  function getOneProduct(id) {
    console.log(id);
    if (id >= 1 && id <= 20) {
      fetch("http://127.0.0.1:4000/catalog/" + id)
        .then((response) => response.json())
        .then((data) => {
          console.log("Show one product :", id);
          console.log(data);
          setOneProduct(data);
        });
      if (false === viewer2) setViewer2(true);
    } else {
      console.log("Wrong number of Product id.");
    }
  }
  const showOneItem = oneProduct.map((el) => (
    <div key={el.id}>
      <img src={el.image} width={30} alt="images" /> <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      Rating: {el.rating} <br />
    </div>
  ));
  return (
    <div>
      <h1>Catalog of Products</h1>
      <div>
        <h3>Show all available Products.</h3>
        <button onClick={() => getAllProducts()}>Show All ...</button>
        {viewer1 && showAllItems}
      </div>
      <div>
        <h3>Show one Product by Id:</h3>
        <input
          type="text"
          id="message"
          name="message"
          placeholder="id"
          onChange={(e) => getOneProduct(e.target.value)}
        />
        {viewer2 && showOneItem}
      </div>
    </div>
  ); // return end
} // App end
export default App;
