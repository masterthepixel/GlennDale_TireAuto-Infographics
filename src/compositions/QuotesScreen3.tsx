import { useEffect, useState } from "react";
import { AbsoluteFill, Audio, Img, staticFile, Video } from "remotion";
import { QuotesDataType } from "../Video";
// import 'animate.css';

const today = new Date().toDateString();

function ScoresScreen({
  data,
  musicIndex,
  videoIndex,
}: {
  data: QuotesDataType | null;
  musicIndex: number;
  videoIndex: number;
}) {
  // console.log(data);

  return (
    <>
      <AbsoluteFill
        style={{
          // textAlign: "center",
          fontSize: "5em",
          padding: "4rem",
          gap: "1em",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Body */}
        {data ? (
          <div className="relative z-10 flex flex-col justify-center w-full h-full py-6 overflow-hidden sm:py-12">
            <div className="z-10 grid max-w-4xl grid-cols-1 gap-10 mx-auto  bg-black/50 border-[yellow] border-l-8 rounded-r-lg ...  backdrop-blur-sm">
              <div className="p-12 mt-6 text-left">
                <div className="mb-4 text-white ">
                  <svg
                    height="128px"
                    className="mb-2"
                    fill="yellow"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 32 32"
                    xmlSpace="preserve"
                  >
                    <g>
                      <g id="right_x5F_quote">
                        <g>
                          <path d="M0,4v12h8c0,4.41-3.586,8-8,8v4c6.617,0,12-5.383,12-12V4H0z" />
                          <path d="M15,4v12h8c0,4.41-3.586,8-8,8v4c6.617,0,12-5.383,12-12V4H20z" />
                        </g>
                      </g>
                    </g>
                  </svg>
                  <p className="px-2 py-2 mt-2 font-medium text-5xl  leading-snug drop-shadow-lg shadow-black ... bg-clip-text bg-gradient-to-br from-yellow-100 via-yellow-300 to-yellow-500 ...  font-display  tracking-loose text-transparent">
                    {data.quote}
                  </p>
                  <div className="flex items-center justify-start mt-16">
                    <div className="rounded-full backdrop-opacity-5 author-ring-animation">
                      <Img
                        src={data.background}
                        className="max-w-[170px] p-2  z-15 rounded-full  border-slate-500 border-opacity-50 border-[1px] ring-1 ring-yellow-200/40 shadow-md"
                      />
                    </div>
                    <div className="z-20 text-4xl">
                      <p className="z-50 p-2 ml-6 font-normal leading-none rounded-lg text-slate-200 drop-shadow-lg shadow-black">
                        {data.author}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Background video and music */}
        <AbsoluteFill>
          <Video
            className="brightness-25"
            src={staticFile(`/video/BG_Video(${videoIndex}).mp4`)}
            volume={0}
          /> 
          {/* <Audio src={staticFile(`/audio/BG_Music(${musicIndex}).mp3`)} />*/}
          {/* <Video
            className="brightness-50"
            src={staticFile("/video/BG_Video(51).mp4")}
            volume={0}
          /> */}
           <Audio volume={0.7} src={staticFile(`/audio/BG_Music(${musicIndex}).mp3`)} /> 
        </AbsoluteFill>
      </AbsoluteFill>
    </>
  );
}

export default ScoresScreen;
