import { useEffect, useState } from "react";
import { AbsoluteFill, Audio, Img, staticFile, Video } from "remotion";
import { QuotesDataType } from "../Video";
// import 'animate.css';

const stats = [
  { name: 'Occupation', stat: 'physicist, scientist, writer, philosohper, theoretical physicist, mathematician, author, teacher' },
  { name: 'Date of Birth', stat: '1879-03-14' },
  { name: 'Age', stat: '76' },
  { name: 'Gender', stat: 'Male' },
  { name: 'Nationality', stat: 'US' },
  { name: 'Height', stat: '1.75' },
]

const today = new Date().toDateString();

function QuotesScreen({
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
          padding: "1rem",
          gap: "1em",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Body */}
        {data ? (
          <div className='z-20 bg-[#dbdbdb] rounded-xl  backdrop-blur-sm p-6 overflow-hidden max-w-[900px]'>
            <blockquote className="pb-8">
              <p className="text-5xl font-bold    ... bg-clip-text bg-gradient-to-br from-slate-800 via-slate-900 to-[#2c2c2c] text-transparent z-40 py-4 px-6 leading-tight tracking-tight">"{data.quote}"</p>
              <p className="pb-8 mt-2 text-4xl font-medium pl-7 text-slate-800">-{data.author}</p>            
            </blockquote>
            <div className="px-4 divide-y divide-gray-700 ">
              <div className="relative lg:w-2/12">
                <img
                  className="absolute right-0 rounded-lg h-36 w-36 top-10 object-fit "
                  src={data.background}
                  alt="Author Image"
                />
              </div>
              <div className="relative max-w-5xl px-4 py-4">
                
                <div className="pl-8 mx-auto lg:mr-0 lg:ml-auto lg:w-10/12 lg:max-w-none">
                  <div className="mt-6 ">
                    <dl className="flex flex-wrap -mx-8 -mt-4">
                      <div className="flex flex-col px-6 pt-4">
                        <dt className="order-1 text-base font-medium text-gray-500">Date of Birth</dt>
                        <dd className="order-2 text-xl font-semibold text-slate-700 sm:tracking-tight">1879-03-14</dd>
                      </div>
                      <div className="flex flex-col px-6 pt-4">
                        <dt className="order-1 text-base font-medium text-gray-500">Died</dt>
                        <dd className="order-2 text-xl font-semibold text-slate-700 sm:tracking-tight">1955-04-18</dd>
                      </div>
                      <div className="flex flex-col px-6 pt-4">
                        <dt className="order-1 text-base font-medium text-gray-500">Age</dt>
                        <dd className="order-2 text-xl font-semibold text-slate-700 sm:tracking-tight">76</dd>
                      </div>
                      <div className="flex flex-col px-6 pt-4">
                        <dt className="order-1 text-base font-medium text-gray-500">Nationality</dt>
                        <dd className="order-2 text-xl font-semibold uppercase text-slate-700 sm:tracking-tight">Us</dd>
                      </div>
                      <div className="flex flex-col px-6 pt-4">
                        <dt className="order-1 text-base font-medium text-gray-500">Gender</dt>
                        <dd className="order-2 text-xl font-semibold text-slate-700 sm:tracking-tight">Male</dd>
                      </div>
                      <div className="flex flex-col px-6 pt-2">
                        <dt className="order-1 text-base font-medium text-gray-500">Known for</dt>
                        <dd className="order-2 pr-12 font-semibold text-slate-700 sm:text-xl sm:tracking-tight">Physicist, Scientist, Writer, Philosoper, Theoretical Physicist, Mathematican, Author, Teacher</dd>
                      </div>
                    </dl>
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

export default QuotesScreen;
