const path = require("path");
const bundler = require("@remotion/bundler");
const renderer = require("@remotion/renderer");
const cliProgress = require("cli-progress");
const axios = require("axios").default;
const fs = require("fs");

const { bundle } = bundler;
const { getCompositions, renderMedia } = renderer;
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
bar1.start(100, 0);

const start = async () => {
  let data;
  try {
    const jsonString = fs.readFileSync("./data/quotes/2022-09-07.json");
    data = JSON.parse(jsonString);
  } catch (error) {
    console.error(error.message);
  }

  const inputProps = {
    fileData: JSON.stringify(data),
    musicIndex: 170,
    videoIndex: 24,
  };
  console.log(inputProps);

  // The composition you want to render
  const compositionId = "quotes";
  // You only have to do this once, you can reuse the bundle.
  const entry = "./src/index.tsx";

  //   Update progress bar
  bar1.update(25);
  console.log(" Creating a Webpack bundle of the video\n");

  const bundleLocation = await bundle(path.resolve(entry), () => undefined, {
    // If you have a Webpack override, make sure to add it here
    webpackOverride: (config) => config,
  });

  // Parametrize the video by passing arbitrary props to your component.

  // Extract all the compositions you have defined in your project
  // from the webpack bundle.
  const comps = await getCompositions(bundleLocation);
  // Select the composition you want to render.
  const composition = comps.find((c) => c.id === compositionId);
  // Ensure the composition exists
  if (!composition) {
    throw new Error(`No composition with the ID ${compositionId} found.
  Review "${entry}" for the correct ID.`);
  }
  const outputLocation = `out/${compositionId}-node.mp4`;
  //   Update progress bar
  bar1.update(50);
  console.log(" Attempting to render:", outputLocation, "\n");
  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation,
    inputProps,
  });
  //   Update progress bar
  bar1.update(75);
  bar1.stop();
  console.log("Render done!");
};
start();
