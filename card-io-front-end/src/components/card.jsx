import React from "react";
import { Link } from "react-router-dom";

const Card = ({
  card,
  handleDelete,
  handleToggleFavorites,
  isLiked,
  owner,
}) => {
  return (
    <div className="col-md-6 col-lg-4 mt-3">
      <div className="card">
        <img
          width="100%"
          height="200px"
          src={card.bizImage}
          alt={card.bizName}
        />
        <div className="card-body">
          <h5 className="card-title">{card.bizName}</h5>
          <p className="card-text">{card.bizDescription}</p>
          <p className="card-text border-top pt-2">
            <b>Tel:</b> {card.bizPhone} <br />
            <b>Address:</b> {card.bizAddress} <br />
            <b>Card Number:</b> {card.bizNumber} <br />
          </p>
          <div className="d-flex justify-content-center">
            <button
              onClick={handleToggleFavorites}
              className={"btn btn-secondary m-3"}
              style={{
                borderRadius: "50%",
                height: "3rem",
                width: "3rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <i
                className="fa fa-heart"
                style={
                  isLiked
                    ? { color: "red", fontSize: "1.5rem" }
                    : { color: "white", fontSize: "1.5rem" }
                }
              ></i>
            </button>
          </div>
          {owner && (
            <div className="d-flex justify-content-center">
              <Link to={`/my-cards/edit/${card._id}`}>
                <div className="btn btn-secondary">
                  <i className="fas fa-edit"></i> Edit
                </div>
              </Link>
              <span className="p-1">|</span>
              <button
                onClick={handleDelete}
                className="float-right btn btn-danger"
              >
                <i className="fas fa-trash-alt"></i> Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
