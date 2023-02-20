import axios from "axios";

const handleLogoutUser = async (event, setIsLoggedIn, setError) => {
  try {
    await axios.post("/users/logout");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
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
};

export default handleLogoutUser;
