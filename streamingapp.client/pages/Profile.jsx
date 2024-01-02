import { useContext } from "react";
import { UserContext } from "../src/App";
import { Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
const Profile = () => {
  const userData = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <>
      {userData && (
        <Container>
          <p>Hi {userData.name}</p>
          <Button
            as={Link}
            to="/upload"
            onClick={(e) => {
              e.preventDefault();
              navigate("/upload", {
                state: {
                  userId: userData.id,
                },
              });
            }}
          >
            Upload song
          </Button>
        </Container>
      )}
    </>
  );
};

export default Profile;
