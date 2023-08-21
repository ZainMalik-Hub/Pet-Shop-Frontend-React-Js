import React, { useState, useEffect } from "react";
import ShopBreadcumb from "../components/ourshop/ShopBreadcumb";
import ShopArea from "../components/ourshop/ShopArea";

import axios from "axios";
import Loading from "../_global/loading";

function ShopPages() {
  const [data, setData] = useState([]);
  const [loadingBar, setLoadingBar] = useState(false);

  useEffect(() => {
    setLoadingBar(true);
    All();
  }, []);
  async function All() {
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
      <ShopBreadcumb />
      <ShopArea data={data} />
    </main>
  );
}
export default ShopPages;
