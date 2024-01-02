import { Card, Button } from "react-bootstrap";

const SongCard = ({ title, imagePath, filePath, artist, addToQueue }) => {
  const basePath = "https://cdn.jsdelivr.net/gh/alex-toma0/songs/";
  return (
    <Card style={{ width: "16rem" }}>
      <Card.Img variant="top" src={imagePath} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>{artist}</Card.Subtitle>
        <Button
          variant="primary"
          onClick={() => {
            const fullPath = basePath + filePath;
            addToQueue(title, imagePath, fullPath, artist);
          }}
        >
          Play
        </Button>
      </Card.Body>
    </Card>
  );
};

export default SongCard;
