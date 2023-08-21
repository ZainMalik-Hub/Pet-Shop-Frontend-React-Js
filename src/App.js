import { BrowserRouter as Router, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import Home from "./pages/Home";
import DogList from "./pages/DogList";
import AdoptionsPages from "./pages/AdoptionsPages";
import ContactPage from "./pages/ContactPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import ShopPages from "./pages/ShopPages";
import ShopDetailsPage from "./pages/ShopDetailsPage";
import BreederPage from "./pages/BreederPage";
import BreederDetailsPage from "./pages/BreederDetailsPage";
import HometwoPage from "./pages/HometwoPage";
import ScrollToTopRoute from "./ScrollToTopRoute";
import LoginSighnup from "./pages/login/loginSighnup";
import Verify from "./pages/verify";
import EmailCheck from "./pages/emailCheck";
import Cart from "./pages/cart";
import Order from "./pages/order";
import MyOrders from "./pages/myOrders";

import { Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

import AdminAdoption from "./admin/adoption";
import AdminAppointment from "./admin/appointment";
import AdminOrder from "./admin/orders";

import AdminHeader from "./admin/Header";
import AdminShop from "./admin/shop";
import AdminAddProduct from "./admin/addProduct";
import AdminUpdateProduct from "./admin/updateProduct";
import AdminSingleProduct from "./admin/single-product";

function App() {
  // const history = useHistory();
  // const user = JSON.parse(localStorage.getItem("user"));
  // console.log("user", user?.verified);

  // if (!user) {
  //   if (!user?.verified) {
  //     history.push("/loginSignup");
  //   } else {
  //     history.push("/loginSignup");
  //   }
  // }

  return (
    <div className='app'>
      <ToastContainer />
      <Router>
        <Switch>
          <ScrollToTopRoute exact={true} path='/'>
            {/* <Home /> */}
            <WithComponent wrapElements={<Home />} />
          </ScrollToTopRoute>
          <Route path='/email-check' component={EmailCheck} />

          <Route path='/verify' component={Verify} />

          <Route path='/loginSignup' component={LoginSighnup} />

          <ScrollToTopRoute exact={true} path='/doglist'>
            <WithComponent wrapElements={<DogList />} />
          </ScrollToTopRoute>

          <ScrollToTopRoute exact={true} path='/adoption'>
            <WithComponent wrapElements={<AdoptionsPages />} />
          </ScrollToTopRoute>

          <ScrollToTopRoute exact={true} path='/contacts'>
            <WithComponent wrapElements={<ContactPage />} />
          </ScrollToTopRoute>

          <ScrollToTopRoute exact={true} path='/blogs'>
            <WithComponent wrapElements={<BlogPage />} />
          </ScrollToTopRoute>

          <ScrollToTopRoute exact={true} path='/blog-details'>
            <WithComponent wrapElements={<BlogDetailsPage />} />
          </ScrollToTopRoute>

          <ScrollToTopRoute exact={true} path='/shop'>
            <WithComponent wrapElements={<ShopPages />} />
          </ScrollToTopRoute>

          <ScrollToTopRoute exact={true} path='/shop-details'>
            <WithComponent wrapElements={<ShopDetailsPage />} />
          </ScrollToTopRoute>

          <ScrollToTopRoute exact={true} path='/breeder'>
            <WithComponent wrapElements={<BreederPage />} />
          </ScrollToTopRoute>

          <ScrollToTopRoute exact={true} path='/breeder-details'>
            <WithComponent wrapElements={<BreederDetailsPage />} />
          </ScrollToTopRoute>

          <ScrollToTopRoute exact={true} path='/home-two'>
            <WithComponent wrapElements={<HometwoPage />} />
          </ScrollToTopRoute>
          <ScrollToTopRoute exact={true} path='/cart'>
            <WithComponent wrapElements={<Cart />} />
          </ScrollToTopRoute>
          <ScrollToTopRoute exact={true} path='/order'>
            <WithComponent wrapElements={<Order />} />
          </ScrollToTopRoute>
          <ScrollToTopRoute exact={true} path='/my-orders'>
            <WithComponent wrapElements={<MyOrders />} />
          </ScrollToTopRoute>

          <ScrollToTopRoute exact={true} path='/admin-doglist'>
            <SecureRoutes wrapElements={<DogList />} />
          </ScrollToTopRoute>
          <ScrollToTopRoute exact={true} path='/admin-home'>
            <SecureRoutes wrapElements={<AdminOrder />} />
          </ScrollToTopRoute>

          <ScrollToTopRoute exact={true} path='/admin-adoption'>
            <SecureRoutes wrapElements={<AdminAdoption />} />
          </ScrollToTopRoute>
          <ScrollToTopRoute exact={true} path='/admin-appointment'>
            <SecureRoutes wrapElements={<AdminAppointment />} />
          </ScrollToTopRoute>
          <ScrollToTopRoute exact={true} path='/admin-orders'>
            <SecureRoutes wrapElements={<AdminOrder />} />
          </ScrollToTopRoute>
          <ScrollToTopRoute exact={true} path='/admin-products'>
            <SecureRoutes wrapElements={<AdminShop />} />
          </ScrollToTopRoute>
          <ScrollToTopRoute exact={true} path='/admin-add-product'>
            <SecureRoutes wrapElements={<AdminAddProduct />} />
          </ScrollToTopRoute>
          <ScrollToTopRoute exact={true} path='/admin-update-product'>
            <SecureRoutes wrapElements={<AdminUpdateProduct />} />
          </ScrollToTopRoute>
          <ScrollToTopRoute exact={true} path='/admin-single-product'>
            <SecureRoutes wrapElements={<AdminSingleProduct />} />
          </ScrollToTopRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

function WithComponent({ wrapElements }) {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log("user", user?.role);
  // if (user.role === "user") {
  //   history.push("/");
  // } else {
  //   history.push("/admin-home");
  // }
  return (
    <div>
      <Header />
      {wrapElements}
      <Footer />
    </div>
  );
}
function SecureRoutes({ wrapElements }) {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user", user?.role);
  if (user.role === "admin") {
  } else {
    history.push("/");
  }

  return (
    <div>
      <AdminHeader />
      {wrapElements}
      {/* <Footer /> */}
    </div>
  );
}
