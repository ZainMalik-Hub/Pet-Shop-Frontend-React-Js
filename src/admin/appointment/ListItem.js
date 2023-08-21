import React from "react";
import "./ListItem.scss";

function ListItem(props) {
  const { name, type, date, time } = props.pet;

  return (
    <div className='appointmentListAdmin'>
      <div className='list-item'>
        <div className='pet-info'>
          <h2>{name}</h2>
          <p>{type}</p>
        </div>
        <div className='appointment-info'>
          <p>{date}</p>
          <p>{time}</p>
        </div>
        <div className='buttons'>
          <button className='accept'>Accept</button>
          <button className='delete'>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default ListItem;
