import global from "../../global";
import logger from "../../logger";
const pubConnection = async () => {
  const redis = require("redis");
  const publisher = redis.createClient();
  let createClientServer = async () => {
    await publisher.connect();
    global.publisher = publisher;
    logger.info("Pub redis connected");
  };
  createClientServer();
};

export default pubConnection;
