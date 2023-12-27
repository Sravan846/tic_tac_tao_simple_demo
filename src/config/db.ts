import mongoose from "mongoose";
import logger from "../logger";

mongoose
  .connect("mongodb://127.0.0.1:27017/tictac_demo")
  .then(() => {
    logger.info("Connected to database ")
  })
  .catch((err) => {
    logger.error(`Error connecting to the database. \n${err}`)

  });
