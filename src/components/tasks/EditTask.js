import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const EditTask = () => {
  const [desc, setDesc] = useState(undefined);
  const [comp, setComp] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [currTask, setCurrTask] = useState({ checked: false });

  const updateTaskData = async (e) => {
    try {
      e.preventDefault();
      const result = await axios.patch(`tasks/${id}`, {
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
          setError("Invalid description");
        }
      } else {
        setError("Something went wrong!");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="pb-3 d-flex justify-content-center">
        <div>Edit Task</div>
      </h1>
      <form onSubmit={(e) => updateTaskData(e)}>
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
        <div className="d-flex justify-content-center">
          <div>
            <button type="submit" className="btn btn-primary btn-block mb-4">
              Update
            </button>
          </div>
          <div>
            <Link className="btn btn-danger btn-block mb-4 ms-2" to="/">
              Cancel
            </Link>
          </div>
        </div>
      </form>
      {error !== "" ? <h3 className="text-danger">{error}</h3> : ""}
    </div>
  );
};

export default EditTask;
