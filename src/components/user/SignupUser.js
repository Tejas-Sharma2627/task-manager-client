import axios from "axios";
import React, { useState } from "react";
import PicUpload from "./PicUpload";
import { useNavigate } from "react-router";

const SignupUser = (props) => {
  const [name, setName] = useState(null);
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const result = await axios.post("/users", { name, age, email, password });
      localStorage.setItem("token", result.data.token);
      props.setIsLoggedIn(true);
      setError(null);
      navigate("/");
      window.location.reload();
    } catch (err) {
      if (err.response) {
        if (err.response.status) {
          setError("Invalid name or username or password");
        } else {
          setError("Please check your internet!");
        }
      } else {
        console.log("HELLO", err);
        setError("Please check your internet!");
      }
    }
  };

  return (
    <div className="container">
      <h1 className="mt-4">Signup</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group mb-3">
          <label for="exampleInputName1">Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName1"
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label for="exampleInputAge1">Age</label>
          <input
            type="number"
            className="form-control"
            id="exampleInputAge1"
            placeholder="Enter age"
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label for="exampleInputPassword1">
            Password (must be greater than 7 characters)
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
      {error ? (
        <div className="container d-flex justify-content-center mt-3 text-danger">
          <h3>{error}</h3>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SignupUser;
