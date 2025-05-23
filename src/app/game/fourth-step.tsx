"use client";

import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { useSearchParams } from "next/navigation";
import { RetroFileUpload } from "../components/camera";
import { RetroAudioPlayer } from "../components/audio-player";

const storageKey = "unlockedSongs";

const songMap = {
  "0": "/gangsta.mp3",
  "1": "/rick-roll.mp3",
  "2": "/sax.mp3",
  "3": "/norfa.mp3",
} as Record<string, string>;

const notesMap = {
  "0": "PIRMAS_SKAICIUS_0.MP3",
  "1": "ANTRAS_SKAICIUS_2.MP3",
  "2": "TRECIAS_SKAICIUS_1.MP3",
  "3": "KETVIRTAS_SKAICIUS_0.MP3",
} as Record<string, string>;

export const FourtStep = ({
  onHint,
  cb,
}: {
  onHint: boolean;
  cb: () => void;
}) => {
  const [songs, setSongs] = useLocalStorage(storageKey, [] as string[]);
  const searchParams = useSearchParams();
  const song = searchParams.get("song");

  useEffect(() => {
    if (song === null || songs.includes(song)) {
      return;
    }

    if (onHint) {
      setSongs(["0", "1", "2", "3"]);
    }

    // Create a new array to ensure React detects the state change
    const updatedSongs = [...songs, song];
    setSongs(updatedSongs);

    console.log("Songs updated:", updatedSongs);
  }, [song, songs, onHint]);

  const text = onHint
    ? "NA, TAI IKELK DAR VIENA SELFIUKA KAIP SKAICIUOJI :)"
    : songs.length < 4
      ? "AR TIKRAI PAKLAUSEI VISU DAINU? :)"
      : undefined;

  return (
    <>
      {songs.map((song) => (
        <RetroAudioPlayer
          key={song}
          src={songMap[song]}
          note={notesMap[song]}
        />
      ))}
      {songs.includes("3") && <RetroFileUpload onSuccess={cb} text={text} />}
    </>
  );
};
