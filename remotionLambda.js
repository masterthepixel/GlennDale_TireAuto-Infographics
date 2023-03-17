const path = require("path");
const ora = require("ora");
const dotenv = require("dotenv");
const chalk = require("chalk");
const inquirer = require("inquirer");
const moment = require("moment/moment");
const {
  deployFunction,
  getOrCreateBucket,
  deploySite,
  getFunctions,
  getRenderProgress,
} = require("@remotion/lambda");
const { renderMediaOnLambda, getSites } = require("@remotion/lambda/client");
const { getCompositions } = require("@remotion/renderer");
const { enableTailwind } = require("./src/webpack-override");
const { delayRender } = require("remotion");

dotenv.config();
const log = console.log;

const totalAudio = process.env.REMOTION_TOTAL_AUDIO || "1";
const totalVideo = process.env.REMOTION_TOTAL_VIDEO || "1";

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// User prompt
const udpateProjectQuestion = [
  {
    type: "input",
    name: "answear",
    message: "Do you want to update the existing project? (y/n): ",
  },
];

// Project upload function
async function uploadProject(bucketName) {
  const uploadingProjectSpinner = ora("Uploading").start();
  const { serveUrl } = await deploySite({
    bucketName,
    entryPoint: path.resolve(process.cwd(), "src/index.tsx"),
    region: "us-east-1",
    siteName: "my-video",
    options: { webpackOverride: enableTailwind },
  });
  uploadingProjectSpinner.succeed("Uploading" + chalk.green(" - Done"));
  return serveUrl;
}

// main function
const main = async () => {
  try {
    // Deploying lambda function
    const functionDeployingSpinner = ora("Functions deploying").start();
    const { functionName, alreadyExisted } = await deployFunction({
      region: "us-east-1",
      timeoutInSeconds: 240,
      memorySizeInMb: 1536,
      createCloudWatchLogGroup: true,
      architecture: "arm64",
    });
    functionDeployingSpinner.succeed(
      "Functions deploying" + chalk.green(" - Done")
    );
    if (alreadyExisted) {
      log(chalk.red("Function already existed"));
    } else {
      log(chalk.green("Function created"));
      log("Function Name : " + functionName);
    }

    // First, you need to create an S3 bucket in your preferred region.
    // If one already exists, it will be used instead
    const searchingBucketSpinner = ora("Searching bucket").start();
    const { bucketName } = await getOrCreateBucket({
      region: "us-east-1",
    });
    searchingBucketSpinner.succeed("Searching bucket" + chalk.green(" - Done"));
    log(chalk.green(`Bucket found: `), bucketName);
    // // Next, upload your Remotion project to an S3 bucket.
    // // Specify the entry point of your Remotion project,
    // // this is the file where registerRoot() is called.
    const searchingProjectSpinner = ora("Searching project").start();
    const { sites } = await getSites({
      region: "us-east-1",
    });
    searchingProjectSpinner.succeed(
      "Searching project" + chalk.green(" - Done")
    );

    // Get the project URL
    let serveUrl;
    if (!sites.length) {
      log(chalk.red("No project found, deploying new..."));
      serveUrl = await uploadProject(bucketName);
      log(chalk.green(`Project uploaded to S3. URL: `), serveUrl);
    } else {
      log(chalk.green("Project URL: "), sites[0].serveUrl);
      serveUrl = sites[0].serveUrl;
      const userPrompt = await inquirer.prompt(udpateProjectQuestion);
      if (
        userPrompt.answear.toLowerCase() === "y" ||
        userPrompt.answear.toLowerCase() === "yes"
      ) {
        serveUrl = await uploadProject(bucketName);
        log(chalk.green(`Project uploaded to S3. URL:`), serveUrl);
      }
    }

    // const functions = await getFunctions({
    //   region: "us-east-1",
    //   compatibleOnly: true,
    // });

    // const functionName = functions[0].functionName;

    const renderMedia = async (compositionId, outName) => {
      const { renderId, bucketName: renderBucket } = await renderMediaOnLambda({
        region: "us-east-1",
        functionName,
        serveUrl,
        composition: compositionId,
        codec: "h264",
        imageFormat: "jpeg",
        maxRetries: 1,
        framesPerLambda: 20,
        privacy: "public",
        inputProps: {
          musicIndex: getRandomNumber(1, parseInt(totalAudio)),
          videoIndex: getRandomNumber(1, parseInt(totalVideo)),
        },
        outName,
        logLevel: "verbose",
        timeoutInMilliseconds: 50000,
      });

      log(chalk.green(`Render started. \nRender ID: `), renderId);
      log(chalk.green(`Video title: `), outName);

      const renderProgressSpinner = ora("Rendering").start();
      while (true) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const progress = await getRenderProgress({
          renderId,
          bucketName: renderBucket,
          functionName,
          region: "us-east-1",
        });
        if (progress.done) {
          renderProgressSpinner.succeed("Rendering" + chalk.green(" - Done"));
          log("Render finished!", progress.outputFile);
          log(
            progress.timeToFinish / 1000,
            "s,",
            " Estimated cost ",
            progress.costs.currency,
            progress.costs.displayCost
          );
          break;
        }
        if (progress.fatalErrorEncountered) {
          renderProgressSpinner.fail("Rendering" + chalk.red(" - Failed"));
          console.error("Error enountered", progress.errors);
          break;
        }
      }
    };

    // get all the compositions from the project
    const gettingAllCompositionsSpinner = ora(
      "Getting all compositions id"
    ).start();
    const comps = await getCompositions(serveUrl, {
      timeoutInMilliseconds: 50000,
    });
    // delayRender("Fetching data from API...");
    gettingAllCompositionsSpinner.succeed(
      "Getting all compositions id" + chalk.green(" - Done")
    );

    // ask for the composition id
    const renderAllQuestion = [
      {
        type: "rawlist",
        name: "answear",
        message: "Select the composition to render: ",
        choices: ["All", ...comps.map((composition) => composition.id)],
        default: "All",
      },
    ];
    const renderAllPrompt = await inquirer.prompt(renderAllQuestion);

    if (renderAllPrompt.answear.toLowerCase() !== "all") {
      const composition = renderAllPrompt.answear;
      const outName = `${composition}-${moment().format("M-D-Y")}.mp4`;
      await new Promise((resolve) => setTimeout(resolve, 500));
      await renderMedia(composition, outName);
    } else {
      for (const composition of comps) {
        const outName = `${composition.id}-${moment().format("M-D-Y")}.mp4`;
        await new Promise((resolve) => setTimeout(resolve, 500));
        await renderMedia(composition.id, outName);
      }
    }
  } catch (error) {
    log(chalk.red("\nSomething is wrong"));
    log(error.message);
    process.exit(1);
  }
};

main();
