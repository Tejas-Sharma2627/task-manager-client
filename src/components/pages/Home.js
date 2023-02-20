import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router";

const Home = (props) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadTasks = async (url) => {
    try {
      setLoading(true);
      const result = await axios.get(url);
      setTasks(result.data);
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

  const handleDelete = async (event, id) => {
    try {
      await axios.delete(`tasks/${id}`);
      loadTasks("tasks");
      navigate("/");
    } catch (err) {
      setError("Something went wrong! Unable to delete");
    }
  };

  useEffect(async () => {
    loadTasks("tasks");
    // const task = await axios.get("tasks/6346f68a90fd4e0016e076d9");
    console.log(tasks);
  }, [props.isLoggedIn]);
  return (
    <>
      <div className="container">
        <h1>Home</h1>
        <div className="table-responsive-lg">
          <Table bordered hover size="sm" id="Table">
            <thead className="bg-dark text-light">
              <tr>
                <th>#</th>
                <th>Task description</th>
                <th>Completed</th>
                <th className="d-flex justify-content-between align-items-end">
                  <div>Actions</div>
                  <div className="ms-2">
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="filter-tasks">
                        Filter
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="bg-light">
                        <Dropdown.Item
                          className="text-success"
                          onClick={() => loadTasks("tasks")}
                        >
                          All
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="text-success"
                          onClick={() => loadTasks("tasks?completed=true")}
                        >
                          Completed
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="text-success"
                          onClick={() => loadTasks("tasks?completed=false")}
                        >
                          Incompleted
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div>
                    <Link
                      id="add-task"
                      className="btn btn-success ms-2 me-1"
                      to={props.isLoggedIn ? "tasks/add" : "/"}
                    >
                      Add
                    </Link>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {error ? (
                <div className="text-danger mt-4 d-flex justify-content-end">
                  <h4 className="m">{error}</h4>
                </div>
              ) : (
                <></>
              )}
              {tasks.length === 0 && !loading && props.isLoggedIn ? (
                <div className="text-success mt-4 d-flex justify-content-end">
                  <h4 className="m">No tasks found!</h4>
                </div>
              ) : (
                <></>
              )}
              {loading ? (
                <div className="container mt-4 d-flex justify-content-center text-primary">
                  <h4>Loading...</h4>
                </div>
              ) : (
                tasks.map((task, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{task.description}</td>
                      <td>{task.completed ? "Yes" : "No"}</td>
                      <td className="d-flex justify-content-center">
                        <div>
                          <Link
                            to={`/edit/${task._id}`}
                            className="btn btn-warning"
                          >
                            Edit
                          </Link>
                        </div>
                        <div>
                          <button
                            to="/"
                            className="btn btn-danger ms-2"
                            onClick={(e) => handleDelete(e, task._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Home;
