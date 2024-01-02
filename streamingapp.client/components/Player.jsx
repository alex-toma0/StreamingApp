import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
const Player = (props) => {
  return (
    <>
      <AudioPlayer src={props.src} />
    </>
  );
};

export default Player;
