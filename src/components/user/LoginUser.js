import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router";

const LoginUser = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post("/users/login", { email, password });
      localStorage.setItem("token", result.data.token);
      props.setIsLoggedIn(true);
      navigate("/");
      window.location.reload();
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          console.log("INSIDE IF");
          setError("Invalid username or password!");
        } else {
          console.log("INSIDE ELSE", err.response);
          setError("Something went wrong!");
        }
      } else {
        setError("Please check your network connection!");
      }
    }
  };

  return (
    <div className="container">
      <h1 className="mt-4">LOGIN</h1>
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="text-center">
            <Button variant="primary" type="submit">
              Login
            </Button>
          </div>
        </Form>
      </div>
      {error ? (
        <div className="text-danger mt-4">
          <h4>{error}</h4>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default LoginUser;
