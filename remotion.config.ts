import { Config } from "remotion";
import { enableTailwind } from "./src/enable-tailwind";
Config.Bundling.overrideWebpackConfig(enableTailwind);
