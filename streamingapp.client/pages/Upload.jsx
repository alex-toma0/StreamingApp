import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
const Upload = () => {
  const [title, setTitle] = useState("");
  const [filePath, setFilePath] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [genre, setGenre] = useState("");
  const location = useLocation();
  let userId = location.state.userId;

  const handleSumbit = async (e) => {
    e.preventDefault();
    console.log(userId);
    await fetch("http://localhost:5011/api/uploadSong", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        filePath,
        imagePath,
        genre,
        userId,
      }),
    });
  };

  return (
    <Container className="h-100 d-flex align-items-center justify-content-center">
      <Form onSubmit={handleSumbit}>
        <Form.Group className="mb-3" controlId="formSongTitle">
          <Form.Label>Song Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formFilePath">
          <Form.Label>File Path</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the file path"
            onChange={(e) => setFilePath(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formImagePath">
          <Form.Label>Image Path</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the image path"
            onChange={(e) => setImagePath(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGenre">
          <Form.Label>Genre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the genre"
            onChange={(e) => setGenre(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Upload song
        </Button>
      </Form>
    </Container>
  );
};

export default Upload;
