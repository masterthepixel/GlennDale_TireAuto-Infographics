import { useEffect, useState } from "react";
import { AbsoluteFill, Audio, Img, staticFile, Video } from "remotion";
import { QuotesDataType } from "../Video";


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
          <div className="z-10 bg-black/50 backdrop-filter backdrop-blur-lg backdrop-opacity-95 rounded-3xl">
            <div className="relative overflow-hidden pb-96">
            <div className="flex items-center px-8 mx-auto">
                            <div>
                              <Img
                                src={staticFile(`/images/logo.webp`)}
                                alt=""
                                width={250}
                                height="250"
                                className=""
                              />
                            </div>
                            
                          </div>
            </div>
            

            <div className="flow-root pb-12 -mt-8 rounded-b-2xl ">
              <div className="relative -mt-96">
                <div className="relative z-10 px-6 mx-auto max-w-7xl lg:px-8">
                  <div className="grid max-w-md grid-cols-1 gap-8 mx-auto lg:max-w-4xl lg:gap-8">
                    {tiers.map((tier) => (
                      <div
                        key={tier.name}
                        className="flex flex-col shadow-xl rounded-3xl ... w-full bg-gradient-to-br from-red-800/90 via-zinc-100 to-blue-800/80 p-2 "
                      >
                        <div className="p-8 bg-gradient-to-br from-black via-zinc-900 to-gray-900 rounded-2xl sm:p-10">
                          <p className="pb-8 mt-2 text-5xl font-bold leading-[1.25] tracking-tight text-yellow-400">
                            "{data.q}"
                          </p>
                          <p className="max-w-sm text-3xl font-medium text-left text-zinc-50">
                              - {data.a}
                            </p>
                          
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="relative px-6 mx-auto mt-8 uppercase max-w-7xl lg:px-8">
                
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
