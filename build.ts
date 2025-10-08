import fs from "fs/promises";
import { Logger } from "@rabbit-company/logger";

await fs.rm("./dist", { recursive: true, force: true });

const logger = new Logger();

logger.info("Start bundling dist...");
fs.cp("./src/", "./dist/", {
  recursive: true,
  force: true,
});
