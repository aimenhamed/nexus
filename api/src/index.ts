import App from "./modules/app";
import { db } from "./modules/db";
import { logger } from "./modules/logger";

const app = new App();
try {
  await app.run(db);
  const { hostname, port } = app.getAppInfo();
  logger.info(`🦊 Server is running at ${hostname}:${port}`);
} catch (err) {
  logger.error("App couldn't start", err);
}
