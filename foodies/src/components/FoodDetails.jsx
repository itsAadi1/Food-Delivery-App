import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readFood } from "../services/FoodService";
const FoodDetails = () => {
  const { id } = useParams();
  const [data,setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await readFood(id);
      setData(response);
    };
    fetchData();
  }, [id]);
  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 my-5">
        <div className="row gx-4 gx-lg-5 align-items-center">
          <div className="col-md-6">
            <img
              className="card-img-top mb-5 mb-md-0"
              src={data?.imageUrl}
              alt="..."
            />
          </div>
          <div className="col-md-6">
            {data && (
              <>
                <div className="small mb-1">Category: {data?.category}</div>
            <h1 className="display-5 fw-bolder">{data?.name}</h1>
            <div className="fs-5 mb-5">
              <span className="text-decoration-line-through">₹{data?.price}</span>
              <span>₹{data?.price}</span>
            </div>
            <p className="lead">
              {data?.description}
            </p>
            <div className="d-flex">
              <input
                className="form-control text-center me-3"
                id="inputQuantity"
                type="number"
                value="1"
                style={{maxWidth: '3rem'}}
              />
              <button className ="btn btn-outline-dark flex-shrink-0" type="button">
                <i className="bi-cart-fill me-1"></i>
                Add to cart
              </button>
            </div>
            </>
          )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodDetails;
