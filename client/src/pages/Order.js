import React, { useState, useEffect } from "react";
import hero from "../assets/hero.jpg";
import salads from "../assets/salads.jpg";
import HeroDesign from "../assets/HeroDesign.png";
import FoodYummy from "../assets/FoodYummy.png";
import product1 from "../assets/product1.jpg";
import product2 from "../assets/product2.jpg";
import product3 from "../assets/product3.jpg";
import product4 from "../assets/product4.jpg";
import drinks from "../assets/drinks.jpg";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Outlet, Link } from "react-router-dom";
import { color } from "@mui/system";
import { motion, AnimatePresence } from "framer-motion";
import { LinearProgress } from "@mui/material";

function Order({
  cart,
  setCart,
  dishes,
  filteredDishes,
  filteredDishesByCategory,
  setFilteredDishes,
  sum,
}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/category/")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <div>
      <div
        className="container"
        style={{
          backgroundColor: "#ffffff",
          opacity: "0.9",
          marginBottom: "50px",
          marginTop: "10px",
        }}
      >
        <div
          class="card bg-light text-white"
          style={{ fontWeight: "bold", color: "#000000" }}
        >
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
              {categories.length === 0 ? (
                <LinearProgress color="secondary" />
              ) : (
                categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => filteredDishesByCategory(category.id)}
                    class="navbar-brand"
                  >
                    <img
                      src={category.imageUrl}
                      style={{ width: "100px", height: "100px" }}
                      alt="Icon"
                    />
                    {category.name}
                  </button>
                ))
              )}
              <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item" style={{ marginLeft: "50px" }}>
                    <button
                      onClick={() => {
                        setFilteredDishes(dishes);
                      }}
                      class="btn btn-warning"
                      aria-current="page"
                    >
                      Show All ↺
                    </button>
                  </li>
                  <li class="nav-item" style={{ marginLeft: "50px" }}>
                    <Link
                      to={"/summary"}
                      class="btn btn-warning"
                      aria-current="page"
                    >
                      My 🛒 {cart.length}
                    </Link>
                  </li>
                  <li class="nav-item" style={{ marginLeft: "50px" }}>
                    <button
                      onClick={() => alert("Coming soon!")}
                      class="btn btn-warning"
                      aria-current="page"
                    >
                      Best deals 💰
                    </button>
                  </li>
                  <li class="nav-item" style={{ marginLeft: "50px" }}>
                    <button
                      onClick={() => alert("Coming soon!")}
                      class="btn btn-warning"
                      aria-current="page"
                    >
                      Rate our food 💕
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <motion.div layout className="container">
        <div className="row row-cols-3 row-cols-md-4 g-6">
          {filteredDishes.length === 0 ? (
            <div style={{ width: "90vw" }}>
              <LinearProgress color="success" />
            </div>
          ) : (
            filteredDishes.map((dish) => (
              <AnimatePresence>
                <motion.div
                  animate={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 1 }}
                  layout
                  key={dish.id}
                  className="col"
                >
                  <div class="card" style={{ borderRadius: "20px" }}>
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
                      <Button onClick={() => setCart("add", dish)}>
                        Add to 🛒
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            ))
          )}
        </div>
      </motion.div>
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
          Are you ready to eat?
        </h3>
        <h4
          style={{
            position: "relative",
            bottom: "200px",
            textAlign: "center",
            fontFamily: "fantasy",
          }}
        >
          Total price: {sum}
        </h4>
        <Link to={"/summary"}>
          <Button
            variant="contained"
            color="success"
            style={{
              position: "relative",
              bottom: "180px",
              textAlign: "center",
            }}
          >
            Let's EAT
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Order;
