import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const PicUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = async (e) => {
    try {
      e.preventDefault();
      const formdata = new FormData();
      formdata.append("avatar", selectedFile, selectedFile.name);
      console.log(formdata.get("avatar"));
      await axios.post("/users/me/avatar", formdata, {
        headers: {
          "Content-Type": selectedFile.type,
        },
      });
      navigate("/user/profile");
    } catch (err) {
      setError("Something went wrong! Please check file size");
    }
  };

  const fileData = () => {
    if (selectedFile) {
      return (
        <div className="mt-2">
          <h2>File Details:</h2>

          <p>File Name: {selectedFile.name}</p>

          <p>File Type: {selectedFile.type}</p>

          <p>Last Modified: {selectedFile.lastModifiedDate.toDateString()}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  return (
    <div className="container mt-4">
      <div className="w-100">
        <label className="mx-3">Choose Image (under 1 MB size): </label>
        <input type="file" onChange={onFileChange} />
        <div className="mt-4 ms-3">
          <button className="btn btn-primary" onClick={(e) => onFileUpload(e)}>
            Upload
          </button>
          <Link to="/user/profile" className="btn btn-danger ms-2">
            Cancel
          </Link>
        </div>
      </div>
      {fileData()}
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

export default PicUpload;
