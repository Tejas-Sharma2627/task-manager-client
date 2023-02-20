import React from "react";

const About = () => {
  return (
    <div className="container">
      <div className="mt-5">
        <h1 className="mb-2">About</h1>
        <h3 className="mb-5 text-primary">Created by: Siddharth Sharma</h3>
        <h5 className="text-success">
          This <strong className="text-dark">Task Manager</strong> web app uses
          a REST API (created by me) to manage the user profiles and their
          tasks.
        </h5>
      </div>
    </div>
  );
};

export default About;
