import AudioPlayer from "react-modern-audio-player";
import { useState } from "react";
const MusicPlayer = ({ playList }) => {
  const [progressType, setProgressType] = useState("waveform");
  const [activeUI, setActiveUI] = useState({ all: true });
  return (
    <AudioPlayer
      playList={playList}
      placement={{ player: "bottom" }}
      activeUI={{
        ...activeUI,
        progress: progressType,
      }}
      audioInitialState={{
        muted: false,
        volume: 0.2,
        curPlayId: 1,
      }}
    />
  );
};

export default MusicPlayer;
