import React, { useState } from "react";
import "./addProduct.scss";
import { toast } from "react-toastify";
import Loading from "../../_global/loading";
import axios from "axios";

const AddProduct = () => {
  const [loadingBar, setLoadingBar] = useState(false);

  const [productTitle, setProductTitle] = useState("");
  const [productCode, setProductCode] = useState("");
  const [categories, setCategories] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: add product to database
    Addproduct();
  };

  //   useEffect(() => {
  //     Addproduct();
  //   }, []);

  async function Addproduct() {
    setLoadingBar(true);
    await axios
      .post(process.env.REACT_APP_BASE_URL + `/product`, {
        categories: categories,
        productCode: productCode,
        title: productTitle,
        pricing: { price: price, discount: 0, oldPrice: price },
        thumbnail: thumbnail,
        description: description,
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          toast.success("Product Added!");
          setProductTitle("");
          setProductCode("");
          setCategories("");
          setDescription("");
          setPrice("");
          setThumbnail("");
        } else {
          toast.error(res?.data.message);
        }
        setLoadingBar(false);
      })
      .catch((err) => (setLoadingBar(false), console.log("error", err)));
  }
  return (
    <div className='add-product-container'>
      <Loading loadingBar={loadingBar} />
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='productTitle'>Product Title</label>
          <input
            type='text'
            id='productTitle'
            value={productTitle}
            onChange={(e) => setProductTitle(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='productCode'>Product Code</label>
          <input
            type='text'
            id='productCode'
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='categories'>Categories</label>
          <input
            type='text'
            id='categories'
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required></textarea>
        </div>
        <div className='form-group'>
          <label htmlFor='price'>Price</label>
          <input
            type='number'
            id='price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='thumbnail'>Image Link</label>
          <input
            type='text'
            id='thumbnail'
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            required
          />
        </div>
        <button type='submit' className='add-product-button'>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
