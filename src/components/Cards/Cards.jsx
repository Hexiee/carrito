import React from "react";


const Cards = ({ product }) => {
  const { id, image, title, category, rating, price } = product;
  const { rate, count } = rating;

  return (
    <div key={id} className="col-md-4 mb-4">
      <div className="card" style={{ width: "18rem" }}>
        <div className="container-img">
          <img
            className="card-img-top mx-auto"
            src={image}
            alt="Card image cap"
            style={{ maxHeight: "200px", objectFit: "contain" }}
          />
        </div>
        <div className="card-body">
          <h1 className="card-title" style={{ fontSize: "14px", minHeight: "40px" }}>{title}</h1>
          <p className="card-text">
            <strong className="text-danger">Category:</strong>{" "}
            <span className="text-danger">{category}</span>
          </p>
          <div className="card-price">
            <strong>Price:</strong>{" "}
            <span className="price-value">${price}</span>
          </div>
          <p className="card-text">
            <strong>Rating:</strong> {rate} (Count: {count})
          </p>
          <a href="#" className="btn btn-primary">
            Añadir
          </a>
        </div>
      </div>
    </div>
  );
};

export default Cards;

