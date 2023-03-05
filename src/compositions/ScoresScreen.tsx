import { useEffect, useState } from "react";
import { AbsoluteFill, Audio, Img, staticFile, Video } from "remotion";
import { QuotesDataType } from "../Video";
import { FaChevronLeft } from "react-icons/fa";
import tireImage from "../../public/images/ace9929d452a56633ae7badbe9ebd60fx-1.png";
import brakeImage from "../../public/images/brake-repair-2.png";
import celImage from "../../public/images/check-engine.png";
import suspensionImage from "../../public/images/suspension.png";
import batteryImage from "../../public/images/battery.jpeg";
import emergencyImage from "../../public/images/emergency-roadside-assistance.jpg";

// import 'animate.css';
const tiers = [
  {
    id: "tier-hobby",
    name: "Hobby",
    href: "#",
    priceMonthly: 49,
    description:
      "Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis.",
    features: [
      "Pariatur quod similique",
      "Sapiente libero doloribus modi nostrum",
      "Vel ipsa esse repudiandae excepturi",
      "Itaque cupiditate adipisci quibusdam",
      "Pariatur quod similique",
      "Sapiente libero doloribus modi nostrum",
      "Vel ipsa esse repudiandae excepturi",
      "Itaque cupiditate adipisci quibusdam",
    ],
  },
];

const actions = [
  {
    title: "Coupe, Sedan, Car & Truck",
    statistic: "Detailing",
    imageUrl:
      "https://digitalhub.fifa.com/transform/ce5dbf75-83be-4165-b855-4d31b1e310b0/1442153965?io=transform:fill,width:122,height:184&quot",
    player: "Enner Valencia",
  },
  {
    title: "Never Wash Your Car Again",
    statistic: "Ceramic Pro",
    imageUrl:
      "https://digitalhub.fifa.com/transform/c0ab58e9-0b9c-4f71-9bf4-1e82d77f67e9/1442158606?io=transform:fill,width:122,height:184&quot",
    player: "Angelo Preciado",
  },
  {
    title: "Protection from the sun",
    statistic: "Window Tint",
    imageUrl:
      "https://digitalhub.fifa.com/transform/de46491e-7d8a-4df4-8779-a7946b2f97c3/Jhegson-Mendez?io=transform:fill,width:122,height:184&quot",
    player: "Jhegson Mendez",
  },
  {
    title: "Average Speed (km/h)",
    statistic: "9.27",
    imageUrl:
      "https://digitalhub.fifa.com/transform/92e86609-09f6-41ff-ac88-78f31085d820/1442157538?io=transform:fill,width:122,height:184&quot&quot",
    player: "Kevin Rodriguez",
  },
];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

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
          padding: "3.5rem",
          gap: "1em",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Body */}
        {data ? (
          <div className="z-10 bg-white/75 backdrop-filter backdrop-blur-lg backdrop-opacity-75 rounded-3xl">
            <div className="relative overflow-hidden pb-96">
              
              <div className="relative p-6 px-4 mx-auto -mt-6 text-center">
                  <div className="px-6 mx-auto lg:px-8">
                    <div className="max-w-2xl mx-auto mt-8 space-y-16 divide-y divide-gray-100 lg:mx-0 lg:max-w-none">
                      <div className="grid grid-cols-1 gap-y-10 gap-x-0 lg:grid-cols-3">
                        <div>
                          <h1>
                            
                            <span className="block font-bold leading-10 text-left mt-7">
                              <span className="block text-zinc-900 text-[46px] tracking-normal font-bold">GLENN DALE</span>
                              <span className="mt-1 block text-[42px] font-bold text-transparent bg-clip-text bg-gradient-to-t from-blue-500 to-blue-600 tracking-wider leading-10">TIRE, AUTO & ROADSIDE ASSISTANCE</span>
                            </span>
                          </h1>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-6 pl-8 mt-4 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
                          <div className="p-8 text-right bg-white shadow-xl rounded-2xl ring-1 ring-inset ring-gray-900/50">
                            <h3 className="text-xl font-semibold leading-7 text-zinc-900">Address  &#128664;</h3>
                            <dl className="mt-3 space-y-1 text-sm leading-6 ">
                              <div>
                                <dt className="sr-only">Address</dt>
                                <dd>
                                  <a className="text-[22px] font-medium tracking-tighter text-blue-700" href="mailto:careers@example.com">
                                  11900 Annapolis Rd, Glenn Dale, MD
                                  </a>
                                </dd>
                              </div>
                            </dl>
                          </div>
                          <div className="p-8 text-right bg-white shadow-xl rounded-2xl ring-1 ring-inset ring-zinc-900/50">
                            <h3 className="text-xl font-semibold leading-7 text-zinc-900">Call Us &#128241;</h3>
                            <dl className="mt-3 space-y-1 text-xl leading-6 text-gray-600">
                              <div>
                                <dt className="sr-only">Call Us</dt>
                                <dd>
                                  <a className="text-[23px] font-semibold text-blue-700" href="mailto:hello@example.com">
                                  (240) 260-3955
                                  </a>
                                </dd>
                              </div>
                            </dl>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                  <div className="max-w-xl mx-auto ">
                  </div>
                </div>
              </div>
            
            <div className="flow-root pb-12 -mt-14 rounded-b-2xl ">
              <div className="relative -mt-80">
                <div className="relative z-10 px-6 mx-auto max-w-7xl lg:px-8">
                  <div className="grid max-w-md grid-cols-1 gap-8 mx-auto lg:max-w-4xl lg:gap-8">
                    {tiers.map((tier) => (
                      <div
                        key={tier.name}
                        className="flex flex-col shadow-xl rounded-3xl ... w-full bg-gradient-to-r from-red-600/90 via-amber-500/90 to-yellow-400/80 p-2 "
                      >
                        <div className="p-8 bg-gradient-to-br from-white via-zinc-100 to-gray-50 rounded-2xl sm:p-10">
                          <p className="pb-8 mt-2 font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-[#00001e] via-[#000041] to-[#1c1c1e] text-7xl ">
                            "{data.q}"
                          </p>
                          <div className="flex items-center">
                            <div>
                              <Img
                                src={data.i}
                                alt=""
                                width={100}
                                height="100"
                                className="p-2 rounded-full ring-2 ring-zinc-500"
                              />
                            </div>
                            <p className="pl-4 -mt-2 text-4xl font-medium text-zinc-700 ">
                              {data.a}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="relative px-6 mx-auto mt-8 uppercase max-w-7xl lg:px-8">
                <div className="max-w-md mx-auto lg:max-w-4xl">
                  <div className="flex flex-row flex-wrap -mx-2">
                    <div className="relative w-full h-56 px-2 mb-4 md:w-1/2 md:h-auto ... ">
                      <a
                        className="block w-full h-full pt-4 pl-4 text-[20px] tracking-wider bg-center bg-no-repeat bg-cover ... ring-2 ring-zinc-900 rounded-2xl text-gray-50 bg-zinc-100 font-medium shadow-xl "
                        href="#"
                        title="Link"
                        style={{ backgroundImage: `url(${tireImage})` }}
                      >
                        <span className="absolute px-3 py-2 bg-zinc-900/90 bottom-2 left-4 rounded-xl">
                          Tire Services
                        </span>
                      </a>
                    </div>
                    <div className="w-full px-2 mb-4 md:w-1/2 ">
                      <div className="flex flex-col -mx-2 sm:flex-row md:flex-col">
                        <div className="relative w-full h-48 px-2 mb-4 sm:w-1/2 md:w-full xl:h-32 sm:mb-0 md:mb-4">
                          <a
                            className="block w-full h-full bg-center bg-no-repeat bg-cover bg-zinc-100 ... ring-2  pt-4 pl-4 text-gray-50 text-[20px]  tracking-wider ring-zinc-900 rounded-xl font-medium shadow-xl  "
                            href="#"
                            title="Link"
                            style={{ backgroundImage: `url(${brakeImage})` }}
                          >
                            <span className="absolute px-3 py-2 bg-zinc-900/90 bottom-2 left-4 rounded-xl">
                              Brake Services
                            </span>
                          </a>
                        </div>
                        <div className="relative w-full h-48 px-2 sm:w-1/2 md:w-full xl:h-32">
                          <a
                            className="block w-full h-full bg-center bg-no-repeat bg-cover bg-zinc-100 ... pt-4 pl-4 text-gray-50 text-[20px]  tracking-wider ring-2 ring-zinc-900 rounded-xl font-medium shadow-xl "
                            href="#"
                            title="Link"
                            style={{ backgroundImage: `url(${celImage})` }}
                          >
                            <span className="absolute px-3 py-2 bg-zinc-900/90 bottom-2 left-4 rounded-xl">
                              Engine Diagnostics
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="relative w-full px-2 mb-4 sm:w-1/3 md:h-42 sm:mb-0 ">
                      <a
                        className="block w-full h-full bg-center bg-no-repeat bg-cover bg-zinc-100 ... pt-4 pl-4 text-gray-50 text-[20px] ring-2 tracking-wider ring-zinc-900 rounded-xl font-medium shadow-xl "
                        href="#"
                        title="Link"
                        style={{ backgroundImage: `url(${suspensionImage})` }}
                      >
                        <span className="absolute px-3 py-2 bg-zinc-900/90 bottom-2 left-4 rounded-xl">
                          SUSPENSION SERVICES
                        </span>
                      </a>
                    </div>
                    <div className="relative w-full px-2 mb-4 sm:w-1/3 md:h-42 sm:mb-0 ">
                      <a
                        className="block w-full h-full bg-center bg-no-repeat bg-cover bg-zinc-100 ... pt-4 pl-4 text-gray-50 text-[20px] ring-2 tracking-wider ring-zinc-900 rounded-xl font-medium shadow-xl "
                        href="#"
                        title="Link"
                        style={{ backgroundImage: `url(${batteryImage})` }}
                      >
                        <span className="absolute px-3 py-2 bg-zinc-900/90 bottom-2 left-4 rounded-xl">
                          BATTERY SERVICES
                        </span>
                      </a>
                    </div>
                    <div className="relative w-full px-2 sm:w-1/3 md:h-48 ">
                      <a
                        className="block w-full h-full bg-center bg-no-repeat bg-cover bg-zinc-100 ... pt-4 pl-4 text-gray-50 text-[20px] ring-2 tracking-wider ring-zinc-900 rounded-xl font-medium shadow-xl "
                        href="#"
                        title="Link"
                        style={{ backgroundImage: `url(${emergencyImage})` }}
                      >
                        <span className="absolute px-3 py-2 bg-zinc-900/90 bottom-2 left-4 rounded-xl">
                          ROAD SIDE ASSISTANCE
                        </span>
                      </a>
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
          <Audio
            volume={0.7}
            src={staticFile(`/audio/BG_Music(${musicIndex}).mp3`)}
          />
        </AbsoluteFill>
      </AbsoluteFill>
    </>
  );
}

export default ScoresScreen;
