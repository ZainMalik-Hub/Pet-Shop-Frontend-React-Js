import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ListItem.scss";
import Loading from "../../_global/loading";

function App() {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [loadingBar, setLoadingBar] = useState(false);

  useEffect(() => {
    All("Not Approved");
  }, []);
  async function All(e) {
    setLoadingBar(true);
    await axios
      .get(process.env.REACT_APP_BASE_URL + `/adoption/${e}`)
      .then((res) => {
        setData(res?.data?.results?.data);
        setLoadingBar(false);
      })
      .catch((err) => (setLoadingBar(false), console.log("error")));
  }
  async function Update(id, value, type) {
    setLoadingBar(true);
    await axios
      .post(process.env.REACT_APP_BASE_URL + `/adoption/update/${id}`, {
        type: value,
      })
      .then((res) => {
        All(type);
        setLoadingBar(false);
      })
      .catch((err) => (console.log("error"), setLoadingBar(false)));
  }
  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };
  return (
    <div className='app22'>
      <Loading loadingBar={loadingBar} />
      <h1 className='adoptH1'>Pet Adoption Requests</h1>
      <div className='tabs'>
        <div className='tab-bar'>
          <div
            className={`tab-item ${activeTab === 1 ? "active" : ""}`}
            onClick={() => (handleTabClick(1), All("Not Approved"))}>
            New
          </div>
          <div
            className={`tab-item ${activeTab === 2 ? "active" : ""}`}
            onClick={() => (handleTabClick(2), All("Approved"))}>
            Not Deliverd
          </div>
          <div
            className={`tab-item ${activeTab === 5 ? "active" : ""}`}
            onClick={() => (handleTabClick(5), All("Delivered"))}>
            Success
          </div>
          <div
            className={`tab-item ${activeTab === 3 ? "active" : ""}`}
            onClick={() => (handleTabClick(3), All("Deleted"))}>
            Deleted
          </div>

          <div
            className={`tab-item ${activeTab === 4 ? "active" : ""}`}
            onClick={() => (handleTabClick(4), All("All"))}>
            ALL
          </div>
        </div>
        <div className='tab-content'>
          {activeTab === 1 && (
            <div>
              {" "}
              <Content
                data={data}
                Update={(id, value) => Update(id, value, "Not Approved")}
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
                Update={(id, value) => Update(id, value, "Deleted")}
              />
            </div>
          )}
          {activeTab === 4 && (
            <div>
              {" "}
              <Content
                data={data}
                Update={(id, value) => Update(id, value, "All")}
              />
            </div>
          )}
          {activeTab === 5 && (
            <div>
              {" "}
              <Content
                data={data}
                Update={(id, value) => Update(id, value, "All")}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

function Content({ data, Update }) {
  return (
    <>
      {data.length > 0 ? (
        <>
          {data?.map((pet) => {
            return (
              <div className='appointmentListAdmin'>
                <div className='AdoptionListAdmin'>
                  <div className='list-item'>
                    <div className='pet-info'>
                      <h2>{pet.petName}</h2>
                      {/* <p>Pet ID: {petId}</p> */}
                    </div>
                    <div className='user-info'>
                      <h3>Adopter Information</h3>
                      <p>Name: {pet.name}</p>
                      <p>Address: {pet.address}</p>
                      <p>City: {pet.city}</p>
                      <p>Phone Number: {pet.phone}</p>
                    </div>
                    {pet.status === "Not Approved" ? (
                      <div className='buttons'>
                        <button
                          className='accept'
                          onClick={() => Update(pet._id, "Approved")}>
                          Accept
                        </button>
                        <button
                          className='delete'
                          onClick={() => Update(pet._id, "Deleted")}>
                          Delete
                        </button>
                      </div>
                    ) : pet.status === "Approved" ? (
                      <div className='buttons'>
                        <button
                          className='accept'
                          onClick={() => Update(pet._id, "Delivered")}>
                          Delivered
                        </button>
                        <button
                          className='delete'
                          onClick={() => Update(pet._id, "Deleted")}>
                          Delete
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div className='Nothing'>Nothing To Show</div>
      )}
    </>
  );
}
