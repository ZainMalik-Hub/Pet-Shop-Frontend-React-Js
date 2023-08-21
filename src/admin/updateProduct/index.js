import React, { useState } from "react";
import "./addProduct.scss";
import { Link, useLocation } from "react-router-dom";

import { toast } from "react-toastify";
import Loading from "../../_global/loading";
import axios from "axios";
import { useEffect } from "react";

const UpdateProduct = () => {
  const search = useLocation().search;

  const [loadingBar, setLoadingBar] = useState(false);
  const [data, setData] = useState([]);

  const [productTitle, setProductTitle] = useState("");
  const [productCode, setProductCode] = useState("");
  const [categories, setCategories] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const id = new URLSearchParams(search).get("id");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: add product to database
    Addproduct();
  };

  useEffect(() => {
    All();
  }, []);

  async function All() {
    setLoadingBar(true);
    await axios
      .get(process.env.REACT_APP_BASE_URL + `/product/${id}`)
      .then((res) => {
        let d = res?.data?.results?.data[0];
        setProductTitle(d.title);
        setProductCode(d.productCode);
        setCategories(d.categories[0]);
        setDescription(d.description);
        setPrice(d.pricing.price);
        setThumbnail(d.thumbnail);
        setLoadingBar(false);
      })
      .catch((err) => (setLoadingBar(false), console.log("error")));
  }

  async function Addproduct() {
    setLoadingBar(true);
    await axios
      .put(process.env.REACT_APP_BASE_URL + `/product/${id}`, {
        title: productTitle,
        categories: [categories],
        description: description,
        pricing: {
          price: price,
          oldPrice: price,
          discount: 0,
        },
        thumbnail: thumbnail,
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          toast.success("Product Updated!");
          //   setProductTitle("");
          //   setProductCode("");
          //   setCategories("");
          //   setDescription("");
          //   setPrice("");
          //   setThumbnail("");
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
      <h1>Update Product</h1>
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

export default UpdateProduct;
