import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

// Logout function
import handleLogoutUser from "../user/LogoutUser";
import handleLogoutAllUser from "../user/LogoutAllUser";

const Navigation = (props) => {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Task-Manager
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>
              <Nav.Link
                href="https://sidshar-task-manager-api.herokuapp.com"
                target="_blank"
              >
                API
              </Nav.Link>
              <Nav.Link as={Link} to="/user/profile">
                Your Profile
              </Nav.Link>
            </Nav>
            {props.isLoggedIn ? (
              <Nav>
                <Nav.Link
                  as={Link}
                  to="/user/profile"
                  className="btn btn-danger me-3 border border-dark"
                  onClick={(e) =>
                    handleLogoutUser(e, props.setIsLoggedIn, props.setError)
                  }
                >
                  Logout
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/user/profile"
                  className="btn btn-danger me-3 border border-dark"
                  onClick={(e) =>
                    handleLogoutAllUser(e, props.setIsLoggedIn, props.setError)
                  }
                >
                  Logout All Devices
                </Nav.Link>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link
                  as={Link}
                  to="/user/login"
                  className="btn btn-success me-3 border border-dark"
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/user/signup"
                  className="btn btn-success me-3 border border-dark"
                >
                  Signup
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
