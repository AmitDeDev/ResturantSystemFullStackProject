import React from "react";
import hero from "../assets/hero.jpg";
import FoodYummy from "../assets/FoodYummy.png";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Home() {
  return (
    <div className="container">
      <div class="container mx-auto flex flex-col md:flex-row items-center my-12 md:my-24">
        <div class="flex flex-col w-full lg:w-1/2 justify-center items-start pt-12 pb-24 px-6">
          <h1 class="font-bold text-4xl my-4">Welcome to</h1>
          <motion.div
            whileHover={{ scale: 1, rotate: 10 }}
            whileTap={{
              scale: 0.8,
              rotate: -20,
              borderRadius: "100%",
            }}
            className="container"
          >
            <img src={FoodYummy} style={{ height: "150px" }} />
          </motion.div>
          <p
            class="leading-normal mb-4"
            style={{ fontWeight: "bold", color: "black" }}
          >
            This project built by Amit Dehas . This project made with -React- on
            client side and with -Django- on server side. Well.. what are you
            waiting for? click on
            <span style={{ fontWeight: "bold", color: "orange" }}>
              {" "}
              Make an order{" "}
            </span>
            Button now! & Eat something
          </p>
          <div>
            <Link
              to={"/order"}
              className="btn btn-danger"
              aria-current="page"
              style={{
                fontWeight: "bold",
                color: "black",
                marginRight: "50px",
                marginLeft: "100px",
              }}
            >
              Eat in 🍴
            </Link>
            <Link
              to={"/order"}
              className="btn btn-warning"
              aria-current="page"
              style={{ fontWeight: "bold", color: "black" }}
            >
              Take away 🙋
            </Link>
          </div>
        </div>
        <div class="w-full lg:w-1/2 lg:py-6 text-center;">
          <h1>
            <motion.div
              whileHover={{ scale: 1, rotate: -10 }}
              whileTap={{
                scale: 0.8,
                rotate: -20,
                borderRadius: "100%",
              }}
            >
              <img
                src={hero}
                style={{ borderRadius: "99999px", border: "solid orange 10px" }}
                class="imgbackground1"
              />
            </motion.div>
          </h1>
        </div>
      </div>
      <div class="container mx-auto flex flex-col md:flex-row items-center my-12 md:my-24">
        <div class="flex flex-col w-full lg:w-1/2 justify-center items-start pt-12 pb-24 px-6"></div>
        <div style={{ textAlign: "center" }}>
          <small style={{ color: "black", fontWeight: "bold" }}>
            Created By Amit Dehas ©
          </small>
        </div>
      </div>
    </div>
  );
}

export default Home;
