import React from "react";
import EmailCheck2 from "../../img/emailcheck.jpg";
function EmailCheck() {
  return (
    <div
      style={{
        backgound: "white",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyItems: "center ",
        alignItems: "center",
      }}>
      <img src={EmailCheck2} style={{ height: 400, marginTop: 80 }} />
      <div style={{ marginTop: 10, fontSize: 20, color: "gray" }}>
        Please Check Your Email to Verify Account
      </div>
    </div>
  );
}
export default EmailCheck;
