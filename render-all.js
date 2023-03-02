const bundler = require("@remotion/bundler");
const renderer = require("@remotion/renderer");
const fs = require("fs");

const { bundle } = bundler;
const { getCompositions, renderMedia } = renderer;

let data;
try {
  const jsonString = fs.readFileSync("./data/quotes/batchquotes.json");
  data = JSON.parse(jsonString);
  // console.log(JSON.parse(jsonString));
} catch (error) {
  console.error(error.message);
}
console.log(data);

const start = async () => {
  const bundled = await bundle(
    require.resolve("./src/index.tsx"),
    () => undefined,
    {
      // If you have a Webpack override, make sure to add it here
      webpackOverride: (config) => config,
    }
  );
  const compositions = await getCompositions(bundled);
  for (const composition of compositions) {
    console.log(`Rendering ${composition.id}...`);
    await renderMedia({
      codec: "h264",
      composition,
      serveUrl: bundled,
      outputLocation: `out/${composition.id}.mp4`,
      inputProps,
    });
  }
};
start()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
