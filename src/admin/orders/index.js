import React, { useState, useEffect } from "react";
import "./MyOrders.scss";
import { toast } from "react-toastify";
import Loading from "../../_global/loading";
import axios from "axios";

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
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };
  useEffect(() => {
    getOrders("Pending");
  }, []);
  async function getOrders(e) {
    setLoading(true);
    await axios
      .get(process.env.REACT_APP_BASE_URL + `/order/allorder/${e}`)
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          setData(response?.data?.results?.data);
          setLoading(false);
        }
        setLoading(false);
        return response.data;
      })
      .catch((err) => setLoading(false));
  }
  async function Update(id, type, value) {
    setLoading(true);
    await axios
      .post(process.env.REACT_APP_BASE_URL + `/order/${id}`, {
        status: type,
      })
      .then((res) => {
        getOrders(value);
        setLoading(false);
      })
      .catch((err) => (console.log("error222", err), setLoading(false)));
  }
  return (
    <>
      <div className='app22'>
        <Loading loadingBar={loading} />
        <h1 className='adoptH1'>Orders</h1>
        <div className='tabs'>
          <div className='tab-bar'>
            <div
              className={`tab-item ${activeTab === 1 ? "active" : ""}`}
              onClick={() => (handleTabClick(1), getOrders("Pending"))}>
              New Orders
            </div>
            <div
              className={`tab-item ${activeTab === 2 ? "active" : ""}`}
              onClick={() => (handleTabClick(2), getOrders("Approved"))}>
              Approved
            </div>
            <div
              className={`tab-item ${activeTab === 3 ? "active" : ""}`}
              onClick={() => (handleTabClick(3), getOrders("Shipped"))}>
              Shipped
            </div>
            <div
              className={`tab-item ${activeTab === 4 ? "active" : ""}`}
              onClick={() => (handleTabClick(4), getOrders("Delivered"))}>
              Delivered
            </div>
            {/* <div
              className={`tab-item ${activeTab === 5 ? "active" : ""}`}
              onClick={() => (handleTabClick(5), getOrders("Deleted"))}>
              Deleted
            </div> */}

            {/* <div
              className={`tab-item ${activeTab === 4 ? "active" : ""}`}
              onClick={() => (handleTabClick(4), getOrders("Deleted"))}>
              ALL
            </div> */}
          </div>
          <div className='tab-content'>
            {activeTab === 1 && (
              <div>
                {" "}
                <Content
                  data={data}
                  Update={(id, value) => Update(id, value, "Pending")}
                />
              </div>
            )}
            {activeTab === 2 && (
              <div>
                {" "}
                <Content
                  data={data}
                  Update={(id, value) => Update(id, value, "Approved")}
                />
              </div>
            )}
            {activeTab === 3 && (
              <div>
                {" "}
                <Content
                  data={data}
                  Update={(id, value) => Update(id, value, "Shipped")}
                />
              </div>
            )}
            {activeTab === 4 && (
              <div>
                {" "}
                <Content
                  data={data}
                  Update={(id, value) => Update(id, value, "Delivered")}
                />
              </div>
            )}
            {activeTab === 5 && (
              <div>
                {" "}
                {/* <Content
                data={data}
                Update={(id, value) => Update(id, value, "All")}
              /> */}
              </div>
            )}
            {activeTab === 6 && (
              <div>
                {" "}
                {/* <Content
                data={data}
                Update={(id, value) => Update(id, value, "All")}
              /> */}
              </div>
            )}
          </div>
        </div>
      </div>
      <Loading loadingBar={loading} />
    </>
  );
}

function Content({ data, Update }) {
  return (
    <>
      <div className='my-orders'>
        {data?.length > 0 ? (
          <>
            {data?.map((order) => (
              <div key={order._id} className='order'>
                <div className='order-header'>
                  <div className='order-id'>{`Order #${order._id}`}</div>
                  <div className={`order-status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </div>
                  {order.status === "Pending" && (
                    <div className='buttons'>
                      <button
                        className='accept'
                        onClick={() => Update(order._id, "Approved")}>
                        Approve
                      </button>
                      <button
                        className='delete'
                        onClick={() => Update(order._id, "Deleted")}>
                        Not Approve
                      </button>
                    </div>
                  )}
                  {order.status === "Approved" && (
                    <div className='buttons'>
                      <button
                        className='accept'
                        onClick={() => Update(order._id, "Shipped")}>
                        Shipped
                      </button>
                      {/* <button
                        className='delete'
                        onClick={() => Update(order._id, "Deleted")}>
                        Delete
                      </button> */}
                    </div>
                  )}
                  {order.status === "Shipped" && (
                    <div className='buttons'>
                      <button
                        className='accept'
                        onClick={() => Update(order._id, "Delivered")}>
                        Deliver
                      </button>
                      {/* <button
                        className='delete'
                        onClick={() => Update(order._id, "Deleted")}>
                        Delete
                      </button> */}
                    </div>
                  )}
                  {order.status === "Delivered" && (
                    <div className='buttons'>
                      <button
                        className='delete'
                        onClick={() => Update(order._id, "Deleted")}>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                <div className='order-details'>
                  <div className='order-date'>{`Order date: ${order.createdAt}`}</div>
                  <div className='order-products'>
                    {order.products.map((product) => (
                      <div key={product._id} className='order-product'>
                        <img
                          style={{
                            height: 150,
                            width: 150,
                          }}
                          src={product.productDetails.thumbnail}
                          alt={product.productDetails.title}
                        />
                        <div className='product-details'>
                          <div className='product-name'>
                            {product.productDetails.title}
                          </div>
                          <div className='product-price'>{`Rs. ${product.price}`}</div>
                          <div className='product-quantity'>{`Qty: ${product.quantity}`}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className='order-summary'>
                    <div className='total-amount'>{`Total: Rs. ${order.amount}`}</div>
                    <div className='total-products'>{`Total products: ${order.products.length}`}</div>
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
          <div key={order._id} className='order'>
            <div className='order-header'>
              <div className='order-id'>{`Order #${order._id}`}</div>
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
