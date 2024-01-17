import { useEffect, useState, useContext } from "react";
import SongCard from "../components/SongCard";
import { Row, Col, Container, Button, Dropdown } from "react-bootstrap";
import MusicPlayer from "../components/MusicPlayer";
import { UserContext } from "../src/App";

const Home = () => {
  const [playQueue, setQueue] = useState([]);
  const [queueId, setQueueId] = useState(1);
  const [songs, setSongs] = useState();
  const [genres, setGenres] = useState();
  const [displayGenre, setDisplayGenre] = useState();
  const [userRole, setUserRole] = useState();
  const [playSong, setPlaying] = useState("");
  const userData = useContext(UserContext);

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await fetch("http://localhost:5011/api/songs/getSongs");
      const json = await response.json();
      setSongs(json);
    };
    const fetchGenres = async () => {
      const response = await fetch("http://localhost:5011/api/songs/getGenres");
      const json = await response.json();
      setGenres(json);
    };
    const fetchRole = async () => {
      const response = await fetch("http://localhost:5011/api/getRole", {
        method: "POST",
        body: JSON.stringify({ userId: userData.id }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      setUserRole(json[0].roleName);
    };
    if (userData) {
      fetchGenres();
      fetchSongs();
      fetchRole();
    }
  }, [displayGenre]);

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

  const filterSongsByGenre = () => {
    if (!displayGenre) {
      return songs;
    }
    return songs.filter((song) => song.genreName === displayGenre);
  };

  return (
    <>
      {userData && (
        <Container className="h-100 w-100 ms-0 d-flex flex-column">
          <Dropdown>
            <Dropdown.Toggle>Genre</Dropdown.Toggle>
            <Dropdown.Menu>
              {genres?.map((genre) => {
                return (
                  <Dropdown.Item
                    onClick={() => setDisplayGenre(genre.name)}
                    key={genre.id}
                  >
                    {genre.name}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
          <Row>
            {filterSongsByGenre()?.map((song) => {
              return (
                <Col key={song.id}>
                  <SongCard
                    songId={song.id}
                    userId={userData.id}
                    title={song.title}
                    imagePath={song.imagePath}
                    filePath={song.filePath}
                    artist={song.artistName}
                    genre={song.genreName}
                    addToQueue={addToQueue}
                    role={userRole}
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
      )}
    </>
  );
};

export default Home;
