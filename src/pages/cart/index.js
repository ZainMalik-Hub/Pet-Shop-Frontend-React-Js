import React, { useState, useEffect } from "react";
import "./cart.scss";
import Loading from "../../_global/loading";
import axios from "axios";
import empty from "../../img/empty.png";
import { useHistory } from "react-router-dom";

const CartPage = () => {
  const [data, setData] = useState([]);
  const history = useHistory();
  const [loadingBar, setLoadingBar] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      getCart(user._id);
    }
  }, []);
  async function getCart(e) {
    setLoadingBar(true);
    await axios
      .get(process.env.REACT_APP_BASE_URL + `/cart/${e}`)
      .then((res) => {
        console.log("res1", res?.data?.results?.products);
        setData(res?.data?.results?.products);
        setLoadingBar(false);
      })
      .catch((err) => (setLoadingBar(false), console.log("error")));
  }

  const subtotal2 = data.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  console.log("Subtotal 2", subtotal2);

  const decrease = (item) => {
    // console.log("item", item);

    IncrementDecrement(user._id, "decrement", item);
  };

  const increase = (item) => {
    // console.log("item", item);
    IncrementDecrement(user._id, "increment", item);
  };
  const deleteProduct = async (item) => {
    // console.log("id", id, "type", type, "item", item);
    setLoadingBar(true);
    await axios
      .delete(
        process.env.REACT_APP_BASE_URL +
          `/cart/product/${item.productId}/userId/${user._id}`
      )
      .then((res) => {
        getCart(user._id);
        // console.log("res1", res?.data?.results?.data[0]);
        // setData(res?.data?.results?.data[0]);
        // setLoadingBar(false);
      })
      .catch((err) => (setLoadingBar(false), console.log("error")));
  };
  async function IncrementDecrement(id, type, item) {
    console.log("id", id, "type", type, "item", item);
    setLoadingBar(true);
    await axios
      .post(process.env.REACT_APP_BASE_URL + `/cart/${type}`, {
        userId: user._id,
        price: item.price,
        productId: item.productId,
        productCode: item.productCode,
        color: "pink",
        size: "xm",
        totalPrice: item.totalPrice,
        Productthumbnail: item.thumbnail,
        Productname: item.name,
      })
      .then((res) => {
        getCart(user._id);
        // console.log("res1", res?.data?.results?.data[0]);
        // setData(res?.data?.results?.data[0]);
        // setLoadingBar(false);
      })
      .catch((err) => (setLoadingBar(false), console.log("error")));
  }

  return (
    <>
      <Loading loadingBar={loadingBar} />
      {data.length > 0 ? (
        <div className='cart-container'>
          <div className='cart-header'>
            <h1>Your Cart</h1>
            {/* <span>{cartItems.length} items</span> */}
          </div>
          <div className='cart-items'>
            <div className='cart-item cart-header'>
              <div className='item-details' style={{ paddingLeft: 10 }}>
                Item
              </div>
              <div
                className='item-price'
                style={{ paddingLeft: 80, marginLeft: 30 }}>
                Price
              </div>
              <div className='item-quantity'>Quantity</div>
              <div className='item-total'>Total Price</div>
              <div className='item-total'>Action</div>
            </div>
            {data?.map((item, k) => (
              <div className='cart-item' key={item?._id}>
                <div className='item-details'>
                  <img
                    src={item?.productDetails?.thumbnail}
                    style={{ height: 90, width: 90 }}
                  />
                  <h2>{item?.productDetails?.title}</h2>

                  {/* <span>{item.type}</span> */}
                </div>
                <div className='item-price'>Rs. {item.price.toFixed(2)}</div>
                <div className='cart-plus-minus'>
                  <input type='text' value={item.quantity} readOnly />
                  {console.log("my data", data[k])}
                  <div
                    className='dec qtybutton'
                    onClick={() => decrease(data[k])}>
                    -
                  </div>
                  <div
                    className='inc qtybutton'
                    onClick={() => increase(data[k])}>
                    +
                  </div>
                </div>
                <div className='item-total'>
                  Rs. {(item.price * item.quantity).toFixed(2)}
                </div>
                <div
                  className='item-total'
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => deleteProduct(data[k])}>
                  Delete
                </div>
                <div className='shop-details-quantity'>
                  {/* <div className='cart-plus-minus'>
                    <input type='text' value={item.quantity} readOnly />
                    <div
                      className='dec qtybutton'
                      // onClick={() => decrease()}
                    >
                      -
                    </div>
                    <div
                      className='inc qtybutton'
                      // onClick={() => increase()}
                    >
                      +
                    </div>
                  </div> */}

                  {/* <Link to='/shop-details' className='cart-btn'>
                    Add to Cart +
                  </Link> */}
                </div>
              </div>
            ))}
          </div>
          <div className='cart-footer'>
            <div className='cart-subtotal'>
              <span>Subtotal:</span>
              <span>Rs. {subtotal2.toFixed(2)}</span>
            </div>
            <div className='cart-grandtotal'>
              <span>Grand Total:</span>
              <span>Rs. {subtotal2.toFixed(2)}</span>
            </div>
            <button
              className='checkout-btn'
              onClick={() => history.push("/order")}>
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            marginTop: 100,
            marginBottom: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            justifyItems: "center",
          }}>
          <img src={empty} />
        </div>
      )}
    </>
  );
};

export default CartPage;
