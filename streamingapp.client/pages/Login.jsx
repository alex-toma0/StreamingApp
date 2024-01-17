import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
const Login = (props) => {
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    await fetch("http://localhost:5011/api/login", {

      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    }); 


    const response = await fetch("http://localhost:5011/api/user", {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok == false) {
      alert("Invalid credentials")
      return

    }

    const content = await response.json();
    props.setUserData(content);
    setRedirect(true);
  };
  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <Container className="h-100 d-flex align-items-center justify-content-center">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
