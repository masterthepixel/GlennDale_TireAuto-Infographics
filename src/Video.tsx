import React, { useCallback, useEffect, useState } from "react";
import { Composition, continueRender, delayRender } from "remotion";
import ScoresScreen from "./compositions/ScoresScreen";

import moment from "moment";
import { useMemo } from "react";
import "./style.css";
import { getRandom } from "./utils";

export interface QuotesDataType {
  q: string;
  a: string;
  i: string;
  c: string;
  id: string;
  h: string;
}

const MUSIC_INDEX = "musicIndex";
const VIDEO_INDEX = "videoIndex";
const settingValues = (index: string, setValue: Function, value: number) => {
  if (typeof window != undefined) {
    let musicIndex = window.localStorage.getItem(index);
    if (musicIndex != null) setValue(parseInt(musicIndex));
    else {
      window.localStorage.setItem(index, value.toString());
      setValue(value);
    }
  }
};

export const RemotionVideo: React.FC = () => {
  const [data, setData] = useState<Array<QuotesDataType> | null>(null);
  const [handle] = useState(() => delayRender());
  const date = useMemo(() => moment().format("YYYY-MM-DD"), []);
  const [musicIndex, setMusicIndex] = useState<number>(1);
  const [videoIndex, setVideoIndex] = useState<number>(1);

  // Generate random background music index
  const generateRandomMusicIndex = useCallback(() => {
    let number = getRandom(1, 170);
    settingValues(MUSIC_INDEX, setMusicIndex, number);
  }, [handle]);

  useEffect(() => {
    generateRandomMusicIndex();
  }, [generateRandomMusicIndex]);

  // Generate random background video index
  const generateRandomVideoIndex = useCallback(() => {
    let number = getRandom(1, 25);
    settingValues(VIDEO_INDEX, setVideoIndex, number);
  }, [handle]);

  useEffect(() => {
    generateRandomVideoIndex();
  }, [generateRandomVideoIndex]);

  const fetchData = useCallback(async () => {
    const response = await import(`../data/quotes/batchquotes.json`);
    const json = response.default;
    setData(json.quotes);

    continueRender(handle);
  }, [handle]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <>
      {data
        ? data.map((item, index) => (
            <Composition
              key={index}
              id={item.id.replaceAll("_", "")}
              component={ScoresScreen}
              durationInFrames={450}
              fps={30}
              width={1080}
              height={1920}
              defaultProps={{ data: item, musicIndex, videoIndex }}
            />
          ))
        : null}
    </>
  );
};
