import React from "react";
import "../CSS/Model.css"

function Modal({ title, description, setOpenModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h3>{title}</h3>
        </div>
        <div className="body">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default Modal;
