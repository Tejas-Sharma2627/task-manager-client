import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AddTask = () => {
  const [desc, setDesc] = useState("");
  const [comp, setComp] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const postTaskData = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const result = await axios.post("tasks", {
        description: desc,
        completed: comp,
      });
      setError(null);
      navigate("/");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setError("Please login or sign up to add a task");
        } else {
          setError("Invalid description!");
        }
      } else {
        setError("Something went wrong!");
      }
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h1 className="pb-3 d-flex justify-content-center">
        <div>Add Task</div>
      </h1>
      <form onSubmit={(e) => postTaskData(e)}>
        <div className="form-outline mb-4">
          <textarea
            className="form-control"
            id="form4Example3"
            rows="4"
            placeholder="Enter Description"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>

        <div className="form-check d-flex justify-content-center mb-4">
          <input
            className="form-check-input me-2"
            type="checkbox"
            value=""
            id="form4Example4"
            onChange={(e) => setComp(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="form4Example4">
            <strong>Completed</strong> (leave unchecked if task is not
            completed)
          </label>
        </div>
        <div></div>
        <div className="d-flex justify-content-center">
          <div>
            <button type="submit" className="btn btn-primary btn-block mb-4">
              Add
            </button>
          </div>
          <div>
            <Link className="btn btn-danger btn-block mb-4 ms-2" to="/">
              Cancel
            </Link>
          </div>
        </div>
      </form>
      {error ? (
        <div className="container d-flex justify-content-center mt-4">
          <h3 className="text-danger">{error}</h3>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AddTask;
