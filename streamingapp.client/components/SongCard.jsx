import { Card, Button } from "react-bootstrap";
const SongCard = ({
  songId,
  userId,
  title,
  imagePath,
  filePath,
  artist,
  genre,
  addToQueue,
  role,
}) => {
  const basePath = "http://localhost:5011/api/songs/stream/";

  const handlePlay = async (e) => {
    e.preventDefault();
    console.log(songId);
    console.log(userId);
    const fullPath = basePath + filePath;
    addToQueue(title, imagePath, fullPath, artist);
    await fetch("http://localhost:5011/api/songs/logSong", {
      method: "POST",
      body: JSON.stringify({
        songId: songId,
        userId: userId,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5011/api/songs/deleteSong/${songId}`, {
      method: "DELETE",
    });
  };
  return (
    <Card className="mb-5" style={{ width: "16rem" }}>
      <Card.Img variant="top" src={imagePath} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>{artist}</Card.Subtitle>
        <Card.Subtitle>{genre}</Card.Subtitle>
        <Button variant="primary" onClick={(e) => handlePlay(e)}>
          Play
        </Button>
        {role === "Moderator" && (
          <Button variant="danger" onClick={(e) => handleDelete(e)}>
            Delete
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default SongCard;
