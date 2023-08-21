import React, { useEffect, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";
import Loading from "../../_global/loading";
import { toast } from "react-toastify";

// import $ from 'jquery'

function ShopDetailsArea() {
  const search = useLocation().search;
  const history = useHistory();
  const [data, setData] = useState([]);
  const [val, setVal] = useState(0);
  const id = new URLSearchParams(search).get("id");
  const [loadingBar, setLoadingBar] = useState(false);
  let user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    All();
    getQuantity();
  }, []);
  async function getQuantity() {
    setLoadingBar(true);
    await axios
      .get(process.env.REACT_APP_BASE_URL + `/cart/quantity/${id}`)
      .then((res) => {
        setVal(res.data.quantity);
        // setData(res?.data?.results?.data[0]);
        // setLoadingBar(false);
      })
      .catch((err) => (setLoadingBar(false), console.log("error")));
  }
  async function All() {
    setLoadingBar(true);
    await axios
      .get(process.env.REACT_APP_BASE_URL + `/product/${id}`)
      .then((res) => {
        setData(res?.data?.results?.data[0]);
        setLoadingBar(false);
      })
      .catch((err) => (setLoadingBar(false), console.log("error")));
  }

  const increase = () => {
    if (user) {
      IncrementDecrement(user._id, "increment");

      setVal(val + 1);
    } else {
      toast.warning("Please Login First! ");
    }
  };
  const decrease = () => {
    if (user) {
      if (val > 0) {
        IncrementDecrement(user._id, "decrement");
        // Decrement(user._id);
        setVal(val - 1);
      } else {
      }
    } else {
      toast.warning("Please Login First! ");
    }
  };

  async function IncrementDecrement(id, type) {
    setLoadingBar(true);
    await axios
      .post(process.env.REACT_APP_BASE_URL + `/cart/${type}`, {
        userId: id,
        price: data.pricing.price,
        productId: data._id,
        productCode: data.productCode,
        color: "pink",
        size: "xm",
        totalPrice: data.pricing.price,
        Productthumbnail: data.thumbnail,
        Productname: data.title,
      })
      .then((res) => {
        // setData(res?.data?.results?.data[0]);
        setLoadingBar(false);
      })
      .catch((err) => (setLoadingBar(false), console.log("error")));
  }

  async function DeleteProduct() {
    setLoadingBar(true);
    await axios
      .delete(process.env.REACT_APP_BASE_URL + `/product/${id}`, {})
      .then((res) => {
        toast.success("Product Deleted!");
        history.push("/admin-products");
        // setData(res?.data?.results?.data[0]);
        setLoadingBar(false);
      })
      .catch((err) => (setLoadingBar(false), console.log("error")));
  }
  const handleActive = (e) => {
    e.preventDefault();

    document.querySelectorAll(".shop-details-dimension ul li").forEach((el) => {
      el.classList.remove("active");
    });
    e.target.parentNode.classList = "active";
  };
  const colorActive = (e) => {
    e.preventDefault();

    document.querySelectorAll(".shop-details-color ul li").forEach((el) => {
      el.classList.remove("active");
    });
    e.target.classList += " active";
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: false,
    arrows: false,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          speed: 1000,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
          speed: 1000,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          speed: 1000,
        },
      },
    ],
  };

  return (
    <section className='shop-details-area pt-110 pb-50'>
      <Loading loadingBar={loadingBar} />
      <div className='container'>
        <div className='shop-details-wrap'>
          <div className='row'>
            <div className='col-7'>
              <div className='shop-details-img-wrap'>
                <div className='tab-content' id='myTabContent'>
                  <div
                    className='tab-pane show active'
                    id='item-one'
                    role='tabpanel'
                    aria-labelledby='item-one-tab'>
                    <div className='shop-details-img'>
                      <img
                        src={data?.thumbnail}
                        style={{ width: "100%" }}
                        alt=''
                      />
                    </div>
                  </div>
                  <div
                    className='tab-pane'
                    id='item-two'
                    role='tabpanel'
                    aria-labelledby='item-two-tab'>
                    <div className='shop-details-img'>
                      <img src='img/product/shop_details02.jpg' alt='' />
                    </div>
                  </div>
                  <div
                    className='tab-pane'
                    id='item-three'
                    role='tabpanel'
                    aria-labelledby='item-three-tab'>
                    <div className='shop-details-img'>
                      <img src='img/product/shop_details03.jpg' alt='' />
                    </div>
                  </div>
                  <div
                    className='tab-pane'
                    id='item-four'
                    role='tabpanel'
                    aria-labelledby='item-four-tab'>
                    <div className='shop-details-img'>
                      <img src='img/product/shop_details04.jpg' alt='' />
                    </div>
                  </div>
                </div>
              </div>
              <div className='shop-details-nav-wrap'>
                {/* <ul className='nav nav-tabs' id='myTab' role='tablist'>
                  <li className='nav-item' role='presentation'>
                    <a
                      className='nav-link active'
                      id='item-one-tab'
                      data-toggle='tab'
                      href='/#item-one'
                      role='tab'
                      aria-controls='item-one'
                      aria-selected='true'>
                      <img src='img/product/shop_nav_img01.jpg' alt='' />
                    </a>
                  </li>
                  <li className='nav-item' role='presentation'>
                    <a
                      className='nav-link'
                      id='item-two-tab'
                      data-toggle='tab'
                      href='/#item-two'
                      role='tab'
                      aria-controls='item-two'
                      aria-selected='false'>
                      <img src='img/product/shop_nav_img02.jpg' alt='' />
                    </a>
                  </li>
                  <li className='nav-item' role='presentation'>
                    <a
                      className='nav-link'
                      id='item-three-tab'
                      data-toggle='tab'
                      href='/#item-three'
                      role='tab'
                      aria-controls='item-three'
                      aria-selected='false'>
                      <img src='img/product/shop_nav_img03.jpg' alt='' />
                    </a>
                  </li>
                  <li className='nav-item' role='presentation'>
                    <a
                      className='nav-link'
                      id='item-four-tab'
                      data-toggle='tab'
                      href='/#item-four'
                      role='tab'
                      aria-controls='item-four'
                      aria-selected='false'>
                      <img src='img/product/shop_nav_img04.jpg' alt='' />
                    </a>
                  </li>
                </ul> */}
              </div>
            </div>
            <div className='col-5'>
              <div className='shop-details-content'>
                <span>{data?.categories}</span>
                <h2 className='title'>{data.title}</h2>
                <div className='shop-details-review'>
                  <div className='rating'>
                    <i className='fas fa-star' />
                    <i className='fas fa-star' />
                    <i className='fas fa-star' />
                    <i className='fas fa-star' />
                    <i className='fas fa-star' />
                  </div>
                  <span>( 0 Review )</span>
                </div>
                <div className='shop-details-price'>
                  <h2 className='price'> Rs . {data?.pricing?.price}</h2>
                  <h5 className='stock-status'>- IN Stock</h5>
                </div>
                <p>{data?.description}</p>
                {/* <div className='shop-details-dimension'>
                  <span>Dimension :</span>
                  <ul>
                    <li className='active'>
                      <a href='/#' onClick={(e) => handleActive(e)}>
                        Large
                      </a>
                    </li>
                    <li>
                      <a href='/#' onClick={(e) => handleActive(e)}>
                        Medium
                      </a>
                    </li>
                    <li>
                      <a href='/#' onClick={(e) => handleActive(e)}>
                        Small
                      </a>
                    </li>
                  </ul>
                </div> */}
                {/* <div className='shop-details-color'>
                  <span>Color :</span>
                  <ul>
                    <li className='active' onClick={(e) => colorActive(e)} />
                    <li className='black' onClick={(e) => colorActive(e)} />
                    <li className='green' onClick={(e) => colorActive(e)} />
                    <li className='blue' onClick={(e) => colorActive(e)} />
                  </ul>
                </div> */}
                <div className='shop-details-quantity'>
                  <button
                    className='btn'
                    onClick={() =>
                      history.push({
                        pathname: "/admin-update-product",
                        search: `?id=${id}`,
                      })
                    }
                    style={{ background: "green" }}>
                    Update
                  </button>

                  <button
                    className='btn'
                    style={{ marginLeft: 8 }}
                    onClick={() => DeleteProduct()}>
                    Delete
                  </button>
                </div>
                <div className='shop-details-bottom'></div>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <div className='product-desc-wrap'>
              <ul className='nav nav-tabs' id='myTabTwo' role='tablist'>
                <li className='nav-item'>
                  <a
                    className='nav-link active'
                    id='details-tab'
                    data-toggle='tab'
                    href='/#details'
                    role='tab'
                    aria-controls='details'
                    aria-selected='true'>
                    Details More
                  </a>
                </li>
              </ul>
              <div className='tab-content' id='myTabContentTwo'>
                <div
                  className='tab-pane fade show active'
                  id='details'
                  role='tabpanel'
                  aria-labelledby='details-tab'>
                  <div
                    className='product-desc-content'
                    style={{ marginBottom: 100 }}>
                    <p>
                      The domestic dog is a doiated dendant of the wolf. The dog
                      derived from an ancient, extinct wolf, and the modern grey
                      wolf is the dog's nearest living relative. The dog was the
                      first species to be domesticated, by hunter–gatherers.
                      These will include the core vaccines, which are
                      administered in a series of three: at 6-, 12-, and 16
                      weeks old. doiated dendant of the wolf. The dog derived
                      from an ancient, extinct wolf, and the modern grey wolf is
                      the dog's nearest
                    </p>
                    <p>
                      These will include the core vaccines, which are
                      administered in a series of three: at 6-, 12-, and 16
                      weeks old. doiated dendant of the wolf. The dog derived
                      from an ancient, extinct wolf, and the modern grey wolf is
                      the dog's nearest include the core vaccines, which are
                      administered.
                    </p>
                  </div>
                </div>
                <div
                  className='tab-pane fade'
                  id='val'
                  role='tabpanel'
                  aria-labelledby='val-tab'>
                  <div className='product-desc-info'>
                    <div className='row'>
                      <div className='col-xl-3 col-md-5'>
                        <div className='product-desc-img'>
                          <img src='img/product/desc_img.jpg' alt='' />
                        </div>
                      </div>
                      <div className='col-xl-9 col-md-7'>
                        <h5 className='small-title'>100% Knit Knacks</h5>
                        <p>
                          Cramond Leopard &amp; Pythong Print Anorak Jacket In
                          Beige but also the leap into electronic typesetting,
                          remaining lorem Ipsum is simply dummy text of the
                          printing and typesetting industry. Lorem ipsum has
                          been the industry's standard dummy text ever since the
                          1500s, when an unknown printer took a galley of type
                          and scrambled it to make a type specimen book.
                        </p>
                        <ul className='product-desc-list'>
                          <li>65% poly, 35% rayon</li>
                          <li>Partially lined</li>
                          <li>
                            Hidden front button closure with keyhole accents
                          </li>
                          <li>Button cuff sleeves</li>
                          <li>Lightweight semi-sheer fabrication</li>
                          <li>Made in USA</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className='tab-pane fade'
                  id='review'
                  role='tabpanel'
                  aria-labelledby='review-tab'>
                  <div className='product-desc-review'>
                    <div className='review-title mb-20'>
                      <h4 className='title'>Customer Reviews (0)</h4>
                    </div>
                    <div className='left-rc'>
                      <p>No reviews yet</p>
                    </div>
                    <div className='right-rc'>
                      <a href='/#'>Write a review</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ShopDetailsArea;
