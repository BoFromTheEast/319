import { useState, useEffect } from "react";

function App() {
  const [product, setProduct] = useState([]);
  const [oneProduct, setOneProduct] = useState([]);
  const [inputCategory, setInputCategory] = useState("");
  const [productsByCategory, setProductsByCategory] = useState([]);

  // new Product
  const [newProduct, setNewProduct] = useState({
    id: 0,
    title: "",
    price: 0.0,
    description: "",
    category: "",
    image: "",
    rating: "",
  });

  const [viewer1, setViewer1] = useState(false);
  const [viewer2, setViewer2] = useState(false);
  const [viewer3, setViewer3] = useState(false);

  useEffect(() => {
    getAllProducts();
  }, []);

  //function to show all item
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
  //shwoing all item mapping
  const showAllItems = product.map((el) => (
    <div key={el.id}>
      <br />
      <img src={el.image} width={30} alt="images" /> <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      Rating :{el.rating} <br />
    </div>
  ));
  // get one product function
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
  //maping to show one item
  const showOneItem = oneProduct.map((el) => (
    <div key={el.id}>
      <img src={el.image} width={30} alt="images" /> <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      Rating: {el.rating} <br />
    </div>
  ));

  //show item by category
  function getProductsByCategory(category) {
    if (category) {
      fetch(
        `http://127.0.0.1:4000/catalog/category/${encodeURIComponent(category)}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Products fetched by category:", category, data);
          setProductsByCategory(data);
          setViewer3(true);
        })
        .catch((error) => {
          console.error("Error fetching products by category:", error);
          setViewer3(false);
        });
    }
  }

  //map the product
  const showCategoryItem = productsByCategory.map((el) => (
    <div key={el.id}>
      <img src={el.image} width={30} alt="images" /> <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      Rating: {el.rating} <br />
    </div>
  ));

  // function to handle input change
  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  function createNewProduct() {
    fetch(`http://127.0.0.1:4000/catalog/newProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New product created:", data);
        // Reset form fields after successful creation
        setNewProduct({
          title: "",
          price: "",
          description: "",
          category: "",
          image: "",
          rating: "",
        });
      })
      .catch((error) => {
        console.error("Error creating new product:", error);
      });
  }

  return (
    <div>
      {/* all items */}
      <h1>Catalog of Products</h1>
      <div>
        <h3>Show all available Products.</h3>
        <button onClick={getAllProducts}>Show All...</button>
        {viewer1 && showAllItems}
      </div>
      {/* individual item */}
      <div>
        <h3>Show one Product by Id:</h3>
        <input
          type="text"
          placeholder="id"
          onChange={(e) => getOneProduct(e.target.value)}
        />
        {viewer2 && showOneItem}
      </div>
      {/* category item */}
      <div>
        <h3>Filter Products by Category</h3>
        <input
          type="text"
          placeholder="Enter category"
          value={inputCategory}
          onChange={(e) => setInputCategory(e.target.value)}
        />
        <button onClick={() => getProductsByCategory(inputCategory)}>
          Filter by Category
        </button>
        {viewer3 && showCategoryItem}
      </div>
      {/* create a new item */}
      <div>
        <h3>Create New Product</h3>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newProduct.title}
          onChange={handleInputChange}
        />
        <br></br>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleInputChange}
        />
        <br></br>
        <textarea
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleInputChange}
        ></textarea>
        <br></br>
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={newProduct.category}
          onChange={handleInputChange}
        />
        <br></br>
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={handleInputChange}
        />
        <br></br>
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={newProduct.rating}
          onChange={handleInputChange}
        />
        <br></br>
        <button onClick={createNewProduct}>Create Product</button>
      </div>
      {/* Update an item by id */}
      
    </div>
  ); // return end
} // App end
export default App;
