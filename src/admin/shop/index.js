import React, { useState, useEffect } from "react";
import ShopArea from "./ShopArea";
import axios from "axios";
import Loading from "../../_global/loading";

function ShopPages() {
  const [data, setData] = useState([]);
  const [loadingBar, setLoadingBar] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);
  async function getProducts() {
    setLoadingBar(true);
    await axios
      .get(process.env.REACT_APP_BASE_URL + `/product`)
      .then((res) => {
        setData(res?.data?.results);
        setLoadingBar(false);
      })
      .catch((err) => (setLoadingBar(false), console.log("error")));
  }
  return (
    <main>
      <Loading loadingBar={loadingBar} />
      {/* <ShopBreadcumb /> */}
      <ShopArea data={data} />
    </main>
  );
}
export default ShopPages;
