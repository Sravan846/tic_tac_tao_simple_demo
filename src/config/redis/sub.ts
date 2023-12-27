import global from "../../global";
import logger from "../../logger";
const subConnection = async () => {
  const redis = require("redis");
  const subscriber = redis.createClient();
  let createClientServer = async () => {
    await subscriber.connect();
    global.subscriber = subscriber;
    logger.info("Sub redis connected")
  };
  createClientServer();
  subscriber.subscribe("Game", (data: any) => {
    data = JSON.parse(data);
    logger.warn(`subscriber: ${data}`)
    global.io.to(data.id).emit(data.event, data.message);
  });
};
export default subConnection;
