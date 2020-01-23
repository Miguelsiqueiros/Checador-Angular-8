const express = require("express");
const path = require("path");
const pino = require("pino");
const expressPino = require("express-pino-logger");

const logger = pino({ level: process.env.LOG_LEVEL || "info" });
const expressLogger = expressPino({ logger });

const app = express();

const Port = process.env.Port || 8080;

app.use(express.static(__dirname + "/dist/checador"));

app.use(expressLogger);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/checador/index.html"));
});

app.listen(Port, () => logger.info(`Listening to port: ${Port}`));
