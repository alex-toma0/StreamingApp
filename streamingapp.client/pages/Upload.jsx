import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
const Upload = () => {
  const [title, setTitle] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [genreId, setGenreId] = useState("");
  const [file, setFile] = useState();
  const [genres, setGenres] = useState();
  const location = useLocation();
  let userId = location.state.userId;

  function isValidURL(url) {
    var urlPattern = /^https:\/\/[^\s/$.?#].[^\s]*$/;
    return urlPattern.test(url);
  }

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch("http://localhost:5011/api/songs/getGenres");
      const json = await response.json();
      setGenres(json);
    };
    fetchGenres();
  }, []);
  const handleSumbit = async (e) => {
    e.preventDefault();

    if (!isValidURL(imagePath)) alert("Please enter a valid image url!");
    else {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("imagePath", imagePath);
      formData.append("genreId", genreId);
      formData.append("userId", userId);
      formData.append("audioFile", file);

      console.log(userId);
      console.log(formData);

      const valid = await fetch("http://localhost:5011/api/songs/uploadSong", {
        method: "POST",
        body: formData,
      });

      if (valid.ok == false) {
        alert("Song upload error!");
        return;
      }

      alert("Song uploaded successfully!");
    }
  };
  return (
    <Container className="h-100 d-flex align-items-center justify-content-center">
      <Form encType="multipart/form-data" onSubmit={handleSumbit}>
        <Form.Group className="mb-3" controlId="formSongTitle">
          <Form.Label>Song Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the title"
            onChange={(e) => setTitle(e.target.value)}
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
          <Form.Select
            type="datalist"
            placeholder="Enter the genre"
            onChange={(e) => setGenreId(e.target.value)}
          >
            {genres?.map((genre) => {
              return (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formFile">
          <Form.Label>Choose song</Form.Label>
          <Form.Control
            type="file"
            placeholder="Choose the file"
            onChange={(e) => setFile(e.target.files[0])}
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
