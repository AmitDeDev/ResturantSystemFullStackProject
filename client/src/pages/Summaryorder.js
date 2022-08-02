import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import HeroDesign from "../assets/HeroDesign.png";
import { Outlet, Link } from "react-router-dom";
import hero from "../assets/hero.jpg";
function Summaryorder({ cart, setCart, sum }) {
  useEffect(() => {}, []);

  const removeItem = (action, dish) => {
    setCart(action, dish);
  };

  return (
    <div style={{ marginTop: "50px", marginBottom: "100px" }}>
      <div
        style={{
          position: "relative",
          textAlign: "center",
        }}
      >
        <img
          src={HeroDesign}
          style={{
            position: "relative",
            left: "38%",
          }}
        />
        <h3
          style={{
            position: "relative",
            bottom: "220px",
            textAlign: "center",
            fontFamily: "fantasy",
          }}
        >
          Order summary
        </h3>
        <Link to={"/order"}>
          <Button
            variant="contained"
            color="secondary"
            style={{
              position: "relative",
              bottom: "180px",
              textAlign: "center",
              marginRight: "10px",
            }}
          >
            Back to Menu
          </Button>
        </Link>
        <Link to={"/details"}>
          <Button
            variant="contained"
            color="primary"
            disabled={cart.length == 0}
            style={{
              position: "relative",
              bottom: "180px",
              textAlign: "center",
              padding: "5px",
            }}
          >
            Great I'm hungry
          </Button>
        </Link>
      </div>
      <h1
        style={{
          position: "relative",
          textAlign: "center",
          fontFamily: "fantasy",
        }}
      >
        Total Price : {sum} $
      </h1>
      <div className="container">
        <div className="row row-cols-5 row-cols-md-3 g-4">
          {cart.map((dish) => (
            <div key={dish.id}>
              <div className="col">
                <div class="card">
                  <img
                    src={dish.imageUrl}
                    class="card-img-top"
                    alt="..."
                    style={{ height: "300px" }}
                  />
                  <div class="card-body">
                    <h3 class="card-title">{dish.name}</h3>
                    <div>
                      {dish.isVegeterian ? (
                        <span
                          style={{
                            width: "100px",
                            height: "100px",
                            color: "green",
                          }}
                        >
                          🍃 Veggie
                        </span>
                      ) : (
                        " "
                      )}
                      <br></br>
                      {dish.isGlutenFree ? (
                        <span
                          style={{
                            width: "100px",
                            height: "100px",
                            color: "blue",
                          }}
                        >
                          🍞 Gloten free
                        </span>
                      ) : (
                        " "
                      )}
                    </div>
                    <p class="card-text">{dish.description}</p>
                  </div>
                  <div class="card-footer">
                    <small
                      style={{
                        color: "red",
                        fontSize: "bold",
                      }}
                    >
                      {dish.price} $
                    </small>
                    <Button onClick={() => removeItem("delete", dish)}>
                      ❌ Remove
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Summaryorder;
