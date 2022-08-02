import Button from "@mui/material/Button";
import HeroDesign from "../assets/HeroDesign.png";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";

function Final({ cart }) {
  const [order, setOrder] = useState({});
  const [sum, setSum] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    debugger;
    let order1 = location?.state?.order;
    if (!order1) {
      navigate("/order");
      alert("Your cart is empty, Please add something to cyour cart");
      return;
    }
    debugger;
    order1.time = order1.time.replace("T", " ").replace("Z", "");
    setOrder(order1);

    let sumCart = 0;
    order1?.dish.map((dish) => {
      sumCart += dish.price;
      setSum(sumCart);
    });
  }, []);

  useEffect(() => {}, []);

  return (
    <div>
      <div
        style={{
          position: "absolute",
          textAlign: "center",
          top: "20%",
          left: "40%",
        }}
      >
        <img src={HeroDesign} alt="" />
        <h2
          style={{
            position: "absolute",
            textAlign: "center",
            top: "30%",
            left: "25%",
          }}
        >
          Thank You !
        </h2>
        <h3 style={{ marginTop: "50px" }}>Your order ID : {order?.id}</h3>
        <h5>Total price: {sum}</h5>
        <h6 style={{ marginTop: "5px" }}>
          Time order created :{format(new Date(), "yyyy, MM, dd kk:mm:ss")}
        </h6>
        <Link to={"/"}>
          <Button
            variant="contained"
            color="success"
            style={{
              position: "absolute",
              textAlign: "center",
              top: "46%",
              left: "28%",
            }}
          >
            Return to{" "}
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
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Final;
