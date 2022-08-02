import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { Outlet, Link, useNavigate } from "react-router-dom";

function Details({ cart }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/order");
      alert("Your cart is empty, Please add something to your cart");
      return;
    }
  }, []);

  const submit = async (event) => {
    debugger;
    event.preventDefault();
    let dishes = [];
    cart.map((dish) => {
      dishes.push(dish.id);
    });
    let obj = {
      first_name: firstName,
      last_name: lastName,
      address: address,
      phone: phone,
      dish: [...cart],
      dishes: dishes,
    };
    debugger;
    const response = await fetch("http://127.0.0.1:8000/api/v1/orders/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(obj),
    });
    debugger;
    let current = await response.json();
    //validation on response

    navigate("/final", { state: { order: current } });
  };
  return (
    <center className="container " style={{ marginTop: "100px" }}>
      <h1>Order Details</h1>
      <form
        onSubmit={submit}
        className="container "
        style={{
          border: "solid",
          borderRadius: "9999px",
          borderBlockColor: "orange",
          backgroundColor: "lightgray",
        }}
      >
        <div class="col-md-3 mb-3">
          <label for="validationDefault01">First name</label>
          <input
            type="text"
            class="form-control"
            id="validationDefault01"
            placeholder="First name"
            required
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>
        <div class="col-md-3 mb-3">
          <label for="validationDefault02">Last name</label>
          <input
            type="text"
            class="form-control"
            id="validationDefault02"
            placeholder="Last name"
            required
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>

        <div class="form-row">
          <div class="col-md-6 mb-3">
            <label for="validationDefault03">Address</label>
            <input
              type="text"
              class="form-control"
              id="validationDefault03"
              placeholder="Address"
              required
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </div>
          <div class="col-md-3 mb-3">
            <label for="validationDefault04">Phone</label>
            <input
              type="text"
              class="form-control"
              id="validationDefault04"
              placeholder="Phone"
              required
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
        </div>
        <Button type="submit" variant="contained" endIcon={<SendIcon />}>
          Send order
        </Button>
        <Link
          to={"/order"}
          className="btn btn-danger"
          aria-current="page"
          style={{
            fontWeight: "bold",
            color: "black",
            marginLeft: "15px",
          }}
        >
          Back to Menu
        </Link>
      </form>
    </center>
  );
}

export default Details;
