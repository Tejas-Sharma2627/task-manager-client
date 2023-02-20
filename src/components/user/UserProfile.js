import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const UserProfile = (props) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [pic, setPic] = useState("");
  const [error, setError] = useState(null);
  const [_id, setId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUserProfile();
    getUserImage();
  }, [_id]);

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`users/me`);
      localStorage.removeItem("token");
      props.setIsLoggedIn(false);
      navigate("/");
    } catch (err) {
      setError("Something went wrong! Unable to delete");
    }
  };

  const getUserProfile = async () => {
    try {
      setLoading(true);
      const result = await axios.get("/users/me");
      setUser(result.data);
      setId(result.data._id);
      setError(null);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          setError("Please login or sign up first!");
        } else {
          setError("Something went wrong!");
        }
      } else {
        setError("Something went wrong");
      }
    }
    setLoading(false);
  };

  const getUserImage = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`/users/${_id}/avatar`);
      setPic(
        `https://sidshar-task-manager-api.herokuapp.com/users/${_id}/avatar`
      );
    } catch (err) {
      if (err.response.status === 401) {
        setError("Please login or sign up first!");
      } else if (err.response.status === 404) {
        setPic("/profile-pic.png");
      } else {
        setError("Something went wrong!");
      }
    }
    setLoading(false);
  };

  const handleDeletePic = async (event) => {
    try {
      event.preventDefault();
      await axios.delete(`/users/me/avatar`);
      getUserImage();
    } catch (err) {
      setError("Something went wrong!");
    }
  };

  return (
    <>
      {error ? (
        <div className="text-danger mt-4 d-flex justify-content-center">
          <h4 className="m">{error}</h4>
        </div>
      ) : (
        <></>
      )}
      {loading ? (
        <div className="container mt-4 d-flex justify-content-center text-primary">
          <h4>Loading...</h4>
        </div>
      ) : !props.isLoggedIn ? (
        <></>
      ) : (
        <div className="d-flex justify-content-center mt-5">
          <Card style={{ width: "25rem" }}>
            <Card.Body className="text-left">
              <div className="text-center">
                <img
                  src={pic}
                  className="border rounded-circle m-4 border-4 border-dark"
                />
              </div>
              <div className="text-center">
                <Link to="/user/picupload" className="btn btn-success mb-4">
                  Update Pic
                </Link>
                <button
                  className="btn btn-danger ms-2 mb-4"
                  onClick={(e) => handleDeletePic(e)}
                >
                  Delete Pic
                </button>
              </div>
              <Card.Title>Name:{" " + user.name}</Card.Title>
              <Card.Title>Age:{" " + user.age}</Card.Title>
              <Card.Title>Email:{" " + user.email}</Card.Title>
              <div className="text-center">
                <Link className="btn btn-primary" to="/user/update">
                  Update
                </Link>
                <Button variant="danger ms-2" onClick={handleDeleteUser}>
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};

export default UserProfile;
