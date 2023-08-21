import React from "react";
import "./threeDotsIcon.scss";
import { useHistory } from "react-router-dom";

function Header() {
  const history = useHistory();
  return (
    <header>
      {/* <h1>My Website</h1> */}
      <div className='three-dots'>
        <div className='dot'></div>
        <div className='dot'></div>
        <div className='dot'></div>
        <div className='dropdown'>
          <ul>
            <li onClick={() => history.push("my-orders")}>My Orders</li>
            {/* <li style={{ marginLeft: -1 }}>My Appointmnets</li>
            <li style={{ marginLeft: -1 }}>My Adoptions</li> */}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
