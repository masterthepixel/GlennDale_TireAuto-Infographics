import { useEffect, useState } from "react";
import { AbsoluteFill, Audio, Img, staticFile, Video } from "remotion";
import { QuotesDataType } from "../Video";

const today = new Date().toDateString();

function ScoresScreen({
  data,
  musicIndex,
}: {
  data: QuotesDataType | null;
  musicIndex: number;
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
            <div className="relative px-1 py-10 mb-10 bg-white shadow-lg  sm:mx-auto sm:max-w-full rounded-xl sm:px-10 ... bg-animation bg-opacity-50 ">
              <div className="h-full max-w-3xl p-4 mx-auto bg-white rounded-xl ring-1 ring-slate-900/60">
                <div className="flex flex-wrap justify-center">
                  <div className="flex justify-center w-full -mt-16">
                    <div className="relative">
                      {/* <img
                      src=""
                      className="shadow-2xl rounded-full align-middle ring-slate-900/60 ring-2 absolute -m-16 -ml-6 max-w-[150px]"
                    /> */}
                      <Img
                        src={staticFile("/georgewashington.jpeg")}
                        className=" align-middle  absolute -m-44 -ml-44  max-w-[300px] p-4  z-40 rounded-full ring-2 ring-white"
                      />
                    </div>
                  </div>
                </div>
                <div className="divide-y divide-slate-400">
                  <div className="py-8 space-y-6 bg-white text-slate-600">
                    <div className="mt-2 text-center">
                      <h3 className="mb-1 font-light leading-normal text-7xl text-slate-700">
                        {data.a}
                      </h3>
                    </div>

                    <div className="py-6 mt-6 text-center border-t border-slate-400">
                      <div className="flex flex-wrap justify-center">
                        <div className="w-full px-4">
                          <p className="text-5xl font-medium leading-normal text-slate-900">
                            <blockquote>{data.q}</blockquote>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="py-8 text-2xl font-medium leading-7 tracking-wide text-center">
                    <p className="text-blue-800 bg-opacity-50">
                      &#10084;&#65039; Like,
                      &#127939;&#127997;&#8205;&#9794;&#65039;Follow &amp;
                      &#128172; Leave a comment below!
                    </p>
                    <p>
                      {/* 
                    <a
                      href="https://tailwindcss.com/docs"
                      className="text-blue-600"
                    >
                      @truthandfactsdotcom
                    </a>
                    */}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Background video and music */}
        <AbsoluteFill>
          <Video src={staticFile("/bg_video(51).mp4")} volume={0} />
          <Audio src={staticFile("/bgmusiuc_goddid.mp3")} />
        </AbsoluteFill>
      </AbsoluteFill>
    </>
  );
}

export default ScoresScreen;
