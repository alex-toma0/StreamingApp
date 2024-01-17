import { Button, Form, Container } from "react-bootstrap";

import { useState } from "react";
import { Navigate } from "react-router-dom";

const Register = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirm] = useState("");
  const [name, setName] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSumbit = async (e) => {
    e.preventDefault();

    if (!(confirmPassword != "" && password != "" && email != "" && name != "")) {
      alert("Invalid credentials!")
    }
    
    else if (confirmPassword != password) {
      alert("Passwords don't match!")
    }

    else {
      const valid = await fetch("http://localhost:5011/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      });

      console.log(valid.ok)

      if (valid.ok == false) {
        
        alert("User already exists!")
        return
      }
      setRedirect(true);
      console.log()
    }
    
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }
  return (
    <Container className="h-100 d-flex align-items-center justify-content-center">
      <Form onSubmit={handleSumbit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Display Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your display name"
            onChange={(e) => setName(e.target.value)}
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

        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirm(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create account
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
