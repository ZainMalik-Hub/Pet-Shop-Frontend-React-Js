import React, { useState, useEffect } from "react";
import "./MyOrders.scss";
import { toast } from "react-toastify";
import Loading from "../../_global/loading";
import axios from "axios";
import moment from "moment/moment";
const ordersData = [
  {
    id: "001",
    status: "Pending",
    totalAmount: 120,
    date: "2023-05-13",
    products: [
      {
        id: "001",
        name: "Product 1",
        image: "https://via.placeholder.com/150",
        price: 40,
        quantity: 2,
      },

      {
        id: "002",
        name: "Product 2",
        image: "https://via.placeholder.com/150",
        price: 20,
        quantity: 3,
      },
    ],
  },
  {
    id: "002",
    status: "Approved",
    totalAmount: 80,
    date: "2023-05-10",
    products: [
      {
        id: "003",
        name: "Product 3",
        image: "https://via.placeholder.com/150",
        price: 25,
        quantity: 2,
      },
      {
        id: "004",
        name: "Product 4",
        image: "https://via.placeholder.com/150",
        price: 15,
        quantity: 2,
      },
    ],
  },
  {
    id: "003",
    status: "Delivered",
    totalAmount: 120,
    date: "2023-05-13",
    products: [
      {
        id: "001",
        name: "Product 1",
        image: "https://via.placeholder.com/150",
        price: 40,
        quantity: 2,
      },

      {
        id: "002",
        name: "Product 2",
        image: "https://via.placeholder.com/150",
        price: 20,
        quantity: 3,
      },
    ],
  },
  {
    id: "004",
    status: "Shipped",
    totalAmount: 120,
    date: "2023-05-13",
    products: [
      {
        id: "001",
        name: "Product 1",
        image: "https://via.placeholder.com/150",
        price: 40,
        quantity: 2,
      },

      {
        id: "002",
        name: "Product 2",
        image: "https://via.placeholder.com/150",
        price: 20,
        quantity: 3,
      },
    ],
  },
  // Add more orders here
];

function MyOrders() {
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState([]);

  useEffect(() => {
    if (user) {
      getOrders(user._id);
    }
  }, []);
  async function getOrders(id) {
    console.log(id, "id");
    setLoading(true);
    await axios
      .get(process.env.REACT_APP_BASE_URL + `/order/myorders/${id}`)
      .then((response) => {
        console.log("response", response?.data?.results?.data);
        // console.log(response);
        if (response.status === 201 || response.status === 200) {
          setData(response?.data?.results?.data);
          setLoading(false);
        }
        setLoading(false);
        return response;
      })
      .catch(
        (err) => (toast.error(err.response.data.message), setLoading(false))
      );
  }
  return (
    <>
      <Loading loadingBar={loading} />

      <div className='my-orders'>
        <div className='myorders44'>
          <h1 className=''>My Orders</h1>
        </div>

        {data.length > 0 ? (
          <>
            {data?.map((order) => (
              <div key={order?.id} className='order'>
                <div className='order-header'>
                  <div className='order-id'>{`Order #${order?._id}`}</div>
                  <div
                    className={`order-status ${order?.status.toLowerCase()}`}>
                    {order?.status}
                  </div>
                </div>
                <div className='order-details'>
                  <div className='order-date'>{`Order date: ${moment(
                    order?.createdAt
                  ).format("LLLL")}`}</div>
                  <div className='order-products'>
                    {order?.products?.map((product) => (
                      <div key={product?.id} className='order-product'>
                        <img
                          style={{
                            height: 150,
                            width: 150,
                          }}
                          src={product?.productDetails?.thumbnail}
                          alt={product?.productDetails?.title}
                        />
                        <div className='product-details'>
                          <div className='product-name'>
                            {product?.productDetails?.title}
                          </div>
                          <div className='product-price'>{`Rs. ${product?.price}`}</div>
                          <div className='product-quantity'>{`Qty: ${product?.quantity}`}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className='order-summary'>
                    <div className='total-amount'>{`Total: Rs. ${order?.amount}`}</div>
                    <div className='total-products'>{`Total products: ${order?.products.length}`}</div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className='Nothing'>Nothing To Show</div>
        )}

        <></>

        {/* {ordersData.map((order) => (
          <div key={order.id} className='order'>
            <div className='order-header'>
              <div className='order-id'>{`Order #${order.id}`}</div>
              <div className={`order-status ${order.status.toLowerCase()}`}>
                {order.status}
              </div>
            </div>
            <div className='order-details'>
              <div className='order-date'>{`Order date: ${order.date}`}</div>
              <div className='order-products'>
                {order.products.map((product) => (
                  <div key={product.id} className='order-product'>
                    <img src={product.image} alt={product.name} />
                    <div className='product-details'>
                      <div className='product-name'>{product.name}</div>
                      <div className='product-price'>{`$${product.price}`}</div>
                      <div className='product-quantity'>{`Qty: ${product.quantity}`}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className='order-summary'>
                <div className='total-amount'>{`Total: $${order.totalAmount}`}</div>
                <div className='total-products'>{`Total products: ${order.products.length}`}</div>
              </div>
            </div>
          </div>
        ))} */}
      </div>
    </>
  );
}

export default MyOrders;
