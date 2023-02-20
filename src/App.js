import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Axios
import axios from "axios";

// Routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts
import Navigation from "./components/layouts/Navigation";

// Pages
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";

// User
import LoginUser from "./components/user/LoginUser";
import { useEffect, useState } from "react";
import UserProfile from "./components/user/UserProfile";
import SignupUser from "./components/user/SignupUser";
import UpdateUser from "./components/user/UpdateUser";
import PicUpload from "./components/user/PicUpload";

// Tasks
import AddTask from "./components/tasks/AddTask";
import EditTask from "./components/tasks/EditTask";

// Axios defaults
axios.defaults.baseURL = "https://task-manager-api-idca.onrender.com";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [error, setError] = useState(null);
  return (
    <div>
      <Router>
        <Navigation
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setError={setError}
        />
        {error ? (
          <div className="text-danger mt-4">
            {" "}
            <h4>{error}</h4>
          </div>
        ) : (
          <></>
        )}
        <Routes>
          <Route
            exact
            path="/"
            element={<Home isLoggedIn={isLoggedIn} />}
          ></Route>
          <Route exact path="/about" element={<About />}></Route>
          <Route
            exact
            path="/user/profile"
            element={
              <UserProfile
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
              />
            }
          ></Route>
          <Route exact path="/tasks/add" element={<AddTask />} />
          {isLoggedIn ? (
            <>
              <Route exact path="/edit/:id" element={<EditTask />} />
              <Route exact path="/user/update" element={<UpdateUser />} />
              <Route exact path="/user/picupload" element={<PicUpload />} />
            </>
          ) : (
            <>
              <Route
                exact
                path="/user/login"
                element={<LoginUser setIsLoggedIn={setIsLoggedIn} />}
              ></Route>
              <Route
                exact
                path="/user/signup"
                element={<SignupUser setIsLoggedIn={setIsLoggedIn} />}
              ></Route>
            </>
          )}
          <Route path="/*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
