import React, { useState } from "react";
import "./order.scss";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../../_global/loading";
import Confirm from "../../img/confirm.png";

function ShippingPage() {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    acceptTerms: false,
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: inputValue });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("form data", formData);
    PlaceOrder();
    // TODO: Submit form data to server or perform other actions
  };
  const user = JSON.parse(localStorage.getItem("user"));

  async function PlaceOrder() {
    setLoading(true);
    if (user) {
      await axios
        .post(process.env.REACT_APP_BASE_URL + `/order`, {
          userId: user._id,
          name: formData.name,
          // "couponCode":"fifty",
          address: formData.address,
          city: formData.city,
          phone: formData.phone,
          email: formData.email,
        })
        .then((response) => {
          console.log("response", response);
          console.log(response);
          if (response.status === 201 || response.status === 200) {
            // setIsVerificationSuccess(true);
            setShow(false);
            toast.success("Order Placed !");
            //   localStorage.setItem("user", JSON.stringify(data));
            setLoading(false);
            //   history.push("/");
          }

          setLoading(false);
          return response.data;
        })
        .catch(
          (err) => (
            toast.error(err.response.data.message),
            // setIsVerificationSuccess(false),
            setLoading(false)
          )
        );
    } else {
      setLoading(false);
    }
  }

  return (
    <div>
      <Loading loadingBar={loading} />

      <>
        {show ? (
          <>
            <div className='shipping-pagew'>
              <div className='container'>
                <h1>Shipping Information</h1>
                <form onSubmit={handleSubmit}>
                  <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='phone'>Phone</label>
                    <input
                      type='tel'
                      id='phone'
                      name='phone'
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='address'>Address</label>
                    <textarea
                      id='address'
                      name='address'
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='city'>City</label>
                    <input
                      type='text'
                      id='city'
                      name='city'
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='cash-on-delivery'>Cash on Delivery</label>
                    <div id='cash-on-delivery' className='text-view'>
                      Payment will be made upon delivery.
                    </div>
                  </div>
                  <div className='form-group'>
                    <label
                      htmlFor='accept-terms'
                      style={{ display: "flex", flexDirection: "row" }}>
                      <input
                        style={{ height: 20, width: 20, marginRight: 10 }}
                        type='checkbox'
                        id='accept-terms'
                        name='acceptTerms'
                        checked={formData.acceptTerms}
                        onChange={handleInputChange}
                        required
                      />
                      <span className='checkbox-custom'></span>I accept the
                      terms and conditions
                    </label>
                  </div>
                  <div className='form-group'>
                    <button type='submit' className='btn btn-primary'>
                      Confirm Order
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyItems: "center",
              justifyItems: "center",
              justifyContent: "center",
              marginBottom: 100,
              marginTop: 40,
            }}>
            <img src={Confirm} />
          </div>
        )}
      </>
    </div>
  );
}

export default ShippingPage;
