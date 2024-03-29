import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { UserContext } from "../src/App";
import { useContext } from "react";

const NavbarComponent = (props) => {
  const userData = useContext(UserContext);
  const logout = async () => {
    await fetch("http://localhost:5011/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    props.setUserData("");
  };
  let menu;
  if (!userData) {
    menu = (
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/">
          Home
        </Nav.Link>
        <Nav.Link as={Link} to="/register">
          Register
        </Nav.Link>
        <Nav.Link as={Link} to="/login">
          Login
        </Nav.Link>
      </Nav>
    );
  } else {
    menu = (
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/login" onClick={logout}>
          Logout
        </Nav.Link>
        <Nav.Link as={Link} to="/profile">
          Profile
        </Nav.Link>
      </Nav>
    );
  }
  return (
    <Container fluid className="">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Navbar.Brand as={Link} to="/">
          Streaming App{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">{menu}</Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default NavbarComponent;
