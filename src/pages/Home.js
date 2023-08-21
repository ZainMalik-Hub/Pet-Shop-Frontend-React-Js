import React from "react";
import MainSlider from "../components/MainSlider";
import Find from "../components/Find";
import Counter from "../components/Counter";
import Adoption from "../components/Adoption";
import BreedServices from "../components/BreedServices";
import Faq from "../components/Faq";
import Brand from "../components/Brand";
import AdoptionShop from "../components/AdoptionShop";
import Testimonial from "../components/Testimonial";
import Newsletter from "../components/NewsLetter";
import BlogsHome from "../components/BlogsHome";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import $ from "jquery";

import AdminAppointment from "../admin/appointment";
import AdminAdoption from "../admin/adoption";

function Home() {
  // const location = useLocation();
  // window.location.reload;
  // useEffect(() => {
  //   window.location.reload;
  // }, []);
  return (
    <main>
      <MainSlider />
      {/* <AdminAdoption />
      <AdminAppointment /> */}
      <Find />
      <Counter />
      <Adoption />
      <BreedServices />
      <Faq afterElment='faq-area' />
      <Brand />
      <AdoptionShop />
      <Testimonial />
      <BlogsHome />
      {/* <Newsletter /> */}
    </main>
  );
}

export default Home;
