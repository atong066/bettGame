import React from "react";
import "./musicModal.scss";
import { IconButton, Typography, Tabs, Tab } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Slider from "@mui/material/Slider";
import VolumeUp from "@mui/icons-material/VolumeUp";
import VolumeOff from "@mui/icons-material/VolumeOff";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import LoopIcon from "@mui/icons-material/Loop";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CheckIcon from "@mui/icons-material/Check";

interface MusicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MusicModal: React.FC<MusicModalProps> = ({ isOpen, onClose }) => {
  const [volume, setVolume] = React.useState(30);
  const [isMuted, setIsMuted] = React.useState(false);
  const [tabValue, setTabValue] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentSongIndex, setCurrentSongIndex] = React.useState(0);
  const [songProgress, setSongProgress] = React.useState(0);
  const [songDuration, setSongDuration] = React.useState(120);

  // React.useEffect(() => {
  //   let interval: NodeJS.Timeout | null = null;
  //   if (isPlaying) {
  //     interval = setInterval(() => {
  //       setSongProgress((prevProgress) => prevProgress < songDuration ? prevProgress + 1 : 0);
  //     }, 1000);
  //   }
  //   return () => {
  //     if (interval) clearInterval(interval);
  //   };
  // }, [isPlaying, songProgress, songDuration]);

  const playPauseHandler = () => {
    setIsPlaying(!isPlaying);
    // API
  };
  const nextSongHandler = () => {
    if (currentSongIndex < mySongs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      setCurrentSongIndex(0);
    }
  };

  const prevSongHandler = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
    } else {
      setCurrentSongIndex(mySongs.length - 1);
    }
  };

  //update song progress
  const updateSongProgress = () => {
    if (isPlaying) {
      setSongProgress((prev) => (prev < songDuration ? prev + 1 : prev));
    }
  };
  const handleVolumeChange = (event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
    if (newValue === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };
  const toggleMute = () => {
    setIsMuted(!isMuted);
    setVolume(isMuted ? 30 : 0);
  };

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  const musicSystemSongs = [
    { name: "You Spin Me Round", plays: "1M" },
    { name: "Yesterday", plays: "3M" },
    { name: "Crazy", plays: "2M" },
    { name: "I Like It", plays: "1M" },
    { name: "Love", plays: "1M" },
    { name: "Hate", plays: "1M" },
    { name: "Fire", plays: "1M" },
    { name: "Light", plays: "1M" },
  ];

  const mySongs = [
    { name: "Crazy Love", plays: "1M" },
    { name: "I Like It", plays: "1M" },
    { name: "Love Now", plays: "1M" },
    { name: "Hate Me", plays: "1M" },
    { name: "Fire and Water", plays: "1M" },
    { name: "Light and Darkness", plays: "1M" },
    { name: "You Spin Me Round", plays: "1M" },
    { name: "Tommorow", plays: "1M" },
    { name: "Drive", plays: "1M" },
  ];

  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`} aria-hidden={!isOpen}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        {/*  */}
        <div className="modal-header">
          <h2>Música</h2>
          <IconButton
            aria-label="close"
            className="close-button"
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </div>

        {/*  */}
        <div className="modal-body">
          <div className="volume-controls">
            <Typography  component={'span'} className="volume-label">
              Música
            </Typography>
            <IconButton
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
              sx={{ color: isMuted ? "#885f06" : "#f0c059" }}
            >
              {isMuted ? <VolumeOff /> : <VolumeUp />}
            </IconButton>
            <Slider
              aria-label="Volume"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              disabled={isMuted}
            />
          </div>
          <div className="music-player-controls">
            <Typography  component={'span'} className="song-name">
              Test Music
            </Typography>
            <div className="slider-container">
              <Typography component="span" className="current-time">
                {new Date(songProgress * 1000).toISOString().substr(14, 5)}
              </Typography>
              <Slider
                aria-label="Song progress"
                value={songProgress}
                min={0}
                max={songDuration}
                onChange={(e, newValue) => setSongProgress(newValue as number)}
              />
              <Typography component="span" className="duration">
              {new Date(songDuration * 1000).toISOString().substr(14, 5)}
              </Typography>
            </div>

            <div className="controls-icons">
              <IconButton aria-label="Shuffle">
                <ShuffleIcon />
              </IconButton>
              <IconButton onClick={prevSongHandler} aria-label="Previous song">
                <SkipPreviousIcon />
              </IconButton>
              <IconButton onClick={playPauseHandler} aria-label="Play/pause">
                <PlayArrowIcon />
              </IconButton>
              <IconButton onClick={nextSongHandler} aria-label="Next song">
                <SkipNextIcon />
              </IconButton>
              <IconButton aria-label="Loop">
                <LoopIcon />
              </IconButton>
            </div>
          </div>

          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            centered
            className="tabs-container"
          >
            <Tab label="Music System" />
            <Tab label="My Songs" />
          </Tabs>

          <div className="list-container">
            {tabValue === 0 && (
              <List className="music-system-list">
                {musicSystemSongs.map((song, index) => (
                  <ListItem key={index} className="music-list-item">
                    <ListItemText
                      primary={song.name}
                      secondary={`${song.plays} plays`}
                    />
                    <CheckIcon sx={{ color: "#f0c059" }} />
                  </ListItem>
                ))}
              </List>
            )}
            {tabValue === 1 && (
              <List className="my-songs-list">
                {mySongs.map((song, index) => (
                  <ListItem key={index} className="music-list-item">
                    <ListItemText
                      primary={song.name}
                      secondary={`${song.plays} plays`}
                    />
                    <CheckIcon sx={{ color: "#f0c059" }} />
                  </ListItem>
                ))}
              </List>
            )}
          </div>
        </div>

        {/*  */}
        <div className="modal-footer">{/*  */}</div>
      </div>
    </div>
  );
};

export default MusicModal;
