import { useEffect, useState, useContext } from "react";
import SongCard from "../components/SongCard";
import { Row, Col, Container, Button } from "react-bootstrap";
import MusicPlayer from "../components/MusicPlayer";

const Home = () => {
  const [playQueue, setQueue] = useState([]);
  const [queueId, setQueueId] = useState(1);
  const [songs, setSongs] = useState();
  const [playSong, setPlaying] = useState("");

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await fetch("http://localhost:5011/api/getSongs");
      const json = await response.json();
      setSongs(json);
    };
    fetchSongs();
  }, []);

  const addToQueue = (title, img, src, artist) => {
    setQueue((current) => [
      ...current,
      {
        name: title,
        writer: artist,
        img: img,
        src: src,
        id: queueId,
      },
    ]);
    console.log(playQueue);
    setQueueId((queueId) => queueId + 1);
  };
  return (
    <Container className="d-flex justify-content-center">
      <Row>
        {songs?.map((song) => {
          return (
            <Col key={song.id}>
              <SongCard
                title={song.title}
                imagePath={song.imagePath}
                filePath={song.filePath}
                artist={song.userId}
                addToQueue={addToQueue}
              />
            </Col>
          );
        })}
      </Row>
      {playQueue.length > 0 && (
        <div className="home-footer">
          <MusicPlayer playList={playQueue} />
        </div>
      )}
    </Container>
  );
};

export default Home;
