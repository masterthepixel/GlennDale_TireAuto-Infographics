import { Config } from "remotion";
import { enableTailwind } from "./src/enable-tailwind";

// Enable Tailwind CSS
Config.Bundling.overrideWebpackConfig(enableTailwind);

// Configure Remotion to export videos to WebP format with the following options
Config.Output.setImageFormat("webp");
Config.Output.setPixelFormat("yuv420p");
Config.Output.setCodec("libwebp");
Config.Output.setQuality("75");
