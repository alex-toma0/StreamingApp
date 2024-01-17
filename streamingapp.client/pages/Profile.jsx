import { useContext, useState, useEffect } from "react";
import { UserContext } from "../src/App";
import { Button, Container, Card, CardImg } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Profile = () => {
  const userData = useContext(UserContext);
  const navigate = useNavigate();
  const [topGenres, setTopGenres] = useState();
  const [userRole, setUserRole] = useState();
  const [chartData, setChartData] = useState();
  const [uploadCount, setUploadCount] = useState();

  function getRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    const color = `rgb(${red}, ${green}, ${blue})`;
    return color;
  }

  useEffect(() => {
    const fetchTopGenres = async () => {
      const response = await fetch(
        "http://localhost:5011/api/songs/getTopGenres",
        {
          method: "POST",
          body: JSON.stringify({ userId: userData.id }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();

      const genreNames = json.map((obj) => obj.genreName);
      const playCounts = json.map((obj) => obj.playCount);
      const genreColors = json.map((obj) => getRandomColor());
      const data = {
        labels: genreNames,
        datasets: [
          {
            data: playCounts,
            backgroundColor: genreColors,
          },
        ],
      };
      console.log(data);
      setTopGenres(json);
      setChartData(data);
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
      console.log(json);
      setUserRole(json[0].roleName);
    };

    const fetchStats = async () => {
      const response = await fetch("http://localhost:5011/api/songs/getStats", {
        method: "POST",
        body: JSON.stringify({ userId: userData.id }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log(json);
      setUploadCount(json);
    };

    fetchTopGenres();
    fetchRole();
    fetchStats();
  }, [userData]);

  const badge = () => {
    if (uploadCount >= 0 && uploadCount <= 5)
      return (
        <img
          width="250em"
          height="250em"
          src="https://raw.githubusercontent.com/alex-toma0/images/main/bronze-badge.png"
        ></img>
      );
    else if (uploadCount >= 6 && uploadCount <= 20)
      return (
        <img
          width="250em"
          height="250em"
          src="https://raw.githubusercontent.com/alex-toma0/images/main/silver-badge.png"
        ></img>
      );
    else if (uploadCount >= 21 && uploadCount <= 34)
      return (
        <img
          width="250em"
          height="250em"
          src="https://raw.githubusercontent.com/alex-toma0/images/main/gold-badge.png"
        ></img>
      );
    else if (uploadCount >= 35)
      return (
        <img
          width="250em"
          height="250em"
          src="https://raw.githubusercontent.com/alex-toma0/images/main/diamond-badge.png"
        ></img>
      );
  };
  return (
    <>
      {userData && (
        <Container className="h-100 d-flex align-items-center flex-column">
          <Card className="mt-4 mb-10">
            <Card.Img
              className="mb-2"
              variant="top"
              src="./user.png"
              width="100em"
              height="100em"
            ></Card.Img>
            <Card.Title className="mb-2">{userData.name}</Card.Title>
            {userRole === "Artist" && (
              <Button
                className="mb-2"
                as={Link}
                to="/upload"
                onClick={(e) => {
                  e.preventDefault();
                  console.log(topGenres);
                  navigate("/upload", {
                    state: {
                      userId: userData.id,
                    },
                  });
                }}
              >
                Upload song
              </Button>
            )}
          </Card>
          <div className="w-2 ">{topGenres && <Pie data={chartData} />}</div>
          <div className="w-2 d-flex flex-column justify-content-center align-items-center">
            {badge()}
            Number of songs: {uploadCount}
          </div>
        </Container>
      )}
    </>
  );
};

export default Profile;
