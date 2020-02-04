const pino = require("pino");
const logger = pino({ level: process.env.LOG_LEVEL || "debug" });

const fs = require("fs");
const filePath = "./src/environments/environment.prod.ts";

const envVars = `export const environment = {
    production: true,
    apiUrl: '${process.env.API_URL}/api/v1/',
}`;

fs.writeFile(filePath, envVars, error =>
  error
    ? logger.debug(error)
    : logger.debug(
        `Environment variables have been added to this path: ${filePath}`
      )
);
