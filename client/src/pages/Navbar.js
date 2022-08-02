import React, { useState, useEffect } from "react";
import FoodYummy from "../assets/FoodYummy.png";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Home from "./Home";
import Order from "./Order";
import Summaryorder from "./Summaryorder";
import Details from "./Details";
import Final from "./Final";
import { Routes, Route } from "react-router-dom";
import { areArraysEqual } from "@mui/base";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [cart, setCart] = useState([]);
  const [sum, setSum] = useState(0);
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/dish/")
      .then((res) => res.json())
      .then((data) => {
        setDishes(data);
        setFilteredDishes(data);
      });
  }, []);

  const filteredDishesByCategory = (category_id) => {
    fetch(`http://127.0.0.1:8000/api/v1/dish?category=${category_id}`)
      .then((res) => res.json())
      .then((data) => setFilteredDishes(data));
  };

  let navigate = useNavigate();
  const filterDishBySearch = (event) => {
    let arr = dishes.filter((x) =>
      x.name.toLowerCase().includes(event.target.value)
    );

    setFilteredDishes(arr);

    navigate("/order");
  };

  const setCartRoot = (action, dish) => {
    let arr = [];
    switch (action) {
      case "add":
        arr = addItemToCart(dish);
        break;
      case "delete":
        arr = removeItemFromCart(dish);
        break;
    }
    let sumCart = 0;
    arr.map((dish) => {
      sumCart += dish.price;
    });
    setSum(sumCart);
  };

  const addItemToCart = (dish) => {
    debugger;
    let arr = [...cart];
    arr.push(dish);
    setCart(arr);
    return arr;
  };

  const removeItemFromCart = (dish) => {
    let arr = [...cart];
    let indexToRemove = arr.findIndex((x) => x.id == dish.id);
    if (indexToRemove !== -1) {
      arr.splice(indexToRemove, 1);
      setCart(arr);
    }
    return arr;
  };

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <Link to={"/"} class="navbar-brand">
            <img src={FoodYummy} alt="Icon" />
          </Link>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link to={"/"} class="nav-link active" aria-current="page">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-house-door-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z" />
                  </svg>
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  to={"/summary"}
                  class="nav-link active"
                  aria-current="page"
                  style={{ marginLeft: "1000px" }}
                >
                  My 🛒 {cart.length}
                </Link>
              </li>
            </ul>
            <form class="d-flex">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search 🔍"
                aria-label="Search"
                onChange={filterDishBySearch}
              />
            </form>
          </div>
        </div>
      </nav>
      <Outlet />
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="/order"
          element={
            <Order
              setCart={setCartRoot}
              cart={cart}
              dishes={dishes}
              filteredDishes={filteredDishes}
              filteredDishesByCategory={filteredDishesByCategory}
              setFilteredDishes={setFilteredDishes}
              search={search}
              sum={sum}
            />
          }
        />
        <Route
          path="/summary"
          element={<Summaryorder cart={cart} setCart={setCartRoot} sum={sum} />}
        />
        <Route path="/details" element={<Details cart={cart} />} />
        <Route path="/final" element={<Final cart={cart} />} />
      </Routes>
    </div>
  );
}

export default Navbar;
