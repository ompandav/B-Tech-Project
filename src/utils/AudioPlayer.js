import React, { useState } from "react";
import audioFile from "../assets/Logo/audio.mp3"; // Replace with your audio file path
// D:\B_Tech_Project\src\assets\Logo\audio.mp3
export default function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
  
    const toggleAudio = () => {
      setIsPlaying(!isPlaying);
      const audioElement = document.getElementById("audio-element");
  
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
    };
  
    return (
      <div>
        <audio id="audio-element" src={audioFile}></audio>
        <button onClick={toggleAudio}>
          {isPlaying ? "Pause" : "Play"} Audio
        </button>
      </div>
    );
  }
  