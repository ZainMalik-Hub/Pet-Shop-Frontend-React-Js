import React, { useState, useEffect } from "react";
import ListItem from "./ListItem";
import Loading from "../../_global/loading";
import axios from "axios";

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
      .get(process.env.REACT_APP_BASE_URL + `/appointment/${e}`)
      .then((res) => {
        setData(res?.data?.results?.data);
        setLoadingBar(false);
      })
      .catch((err) => (setLoadingBar(false), console.log("error")));
  }
  async function Update(id, value, type) {
    setLoadingBar(true);
    await axios
      .post(process.env.REACT_APP_BASE_URL + `/appointment/update/${id}`, {
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

  const pets = [
    {
      name: "Fluffy",
      type: "Cat",
      date: "May 14, 2023",
      time: "3:00 PM",
    },
    {
      name: "Buddy",
      type: "Dog",
      date: "May 15, 2023",
      time: "1:00 PM",
    },
  ];

  return (
    <div className='app22'>
      <Loading loadingBar={loadingBar} />
      <h1 className='adoptH1'>Pet Appointment Requests</h1>
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
            Sheduled
          </div>
          <div
            className={`tab-item ${activeTab === 5 ? "active" : ""}`}
            onClick={() => (handleTabClick(5), All("Success"))}>
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
                <div className='list-item'>
                  <div className='pet-info'>
                    <h2>{pet.petName}</h2>
                    <p>{pet.petType}</p>
                  </div>
                  <div className='appointment-info'>
                    <p>{pet.date}</p>
                    <p>{pet.time}</p>
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
                        onClick={() => Update(pet._id, "Success")}>
                        Success
                      </button>
                      <button
                        className='delete'
                        onClick={() => Update(pet._id, "Deleted")}>
                        Delete
                      </button>
                    </div>
                  ) : (
                    <div>Status: {pet.status}</div>
                  )}
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
