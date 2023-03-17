const path = require("path");
const fs = require("fs");
const { bundle } = require("@remotion/bundler");
const { getCompositions, renderMedia } = require("@remotion/renderer");
// const cliSpinners = require("cli-spinners");
const dotenv = require("dotenv");
const ora = require("ora");
const { enableTailwind } = require("./src/webpack-override");
const inquirer = require("inquirer");
const chalk = require("chalk");
// const inquirer = require("inquirer");

dotenv.config();

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const totalAudio = process.env.REMOTION_TOTAL_AUDIO || "1";
const totalVideo = process.env.REMOTION_TOTAL_VIDEO || "1";

const renderMediaNode = async ({ composition, serveUrl, outputLocation }) => {
  const renderSpinner = ora(`Attempting to render: ${outputLocation}`).start();
  await renderMedia({
    composition,
    serveUrl,
    codec: "h264",
    outputLocation,
    inputProps: {
      musicIndex: getRandomNumber(1, parseInt(totalAudio)),
      videoIndex: getRandomNumber(1, parseInt(totalVideo)),
    },
  });

  renderSpinner.succeed();
};

const start = async () => {
  try {
    // You only have to do this once, you can reuse the bundle.
    const entry = "./src/index.tsx";
    const createWebpackSpinner = ora(
      "Creating a Webpack bundle of the video"
    ).start();
    const bundleLocation = await bundle(path.resolve(entry), () => undefined, {
      // If you have a Webpack override, make sure to add it here
      webpackOverride: enableTailwind,
    });
    createWebpackSpinner.succeed();

    // Extract all the compositions you have defined in your project
    // from the webpack bundle.
    const gettingCompositionsSpinner = ora(
      "Extracting compositions from the bundle"
    ).start();
    const comps = await getCompositions(bundleLocation);
    gettingCompositionsSpinner.succeed();

    // ask for the composition id
    const renderAllQuestion = [
      {
        type: "rawlist",
        name: "answear",
        message: "Select the composition to render: ",
        choices: ["All", ...comps.map((comps) => comps.id)],
        default: "All",
      },
    ];
    const renderAllPrompt = await inquirer.prompt(renderAllQuestion);

    if (renderAllPrompt.answear.toLowerCase() !== "all") {
      const composition = renderAllPrompt.answear;
      const outputLocation = `out/${composition}.mp4`;
      await renderMediaNode({
        composition: comps.find((comp) => comp.id === composition),
        serveUrl: bundleLocation,
        outputLocation,
      });
    } else {
      for (const composition of comps) {
        const outputLocation = `out/${composition.id}.mp4`;
        await renderMediaNode({
          composition,
          serveUrl: bundleLocation,
          outputLocation,
        });
      }
    }

    console.log("====================================");
    console.log("All done!");
    console.log("====================================");
  } catch (error) {
    console.log(chalk.red("\nSomething is wrong"));
    console.log(error.message);
    process.exit(1);
  }
};
start();