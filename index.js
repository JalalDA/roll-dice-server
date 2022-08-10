import { config } from "dotenv";
import express from "express";
import { db } from "./src/config/db.js";
import router from "./src/routes/index.js";
import { client } from "./src/config/redis.js";
import cors from "cors";
config();
const App = express();
const port = 5000;

try {
  // redisCon();
  client.on(`error`, (error) => console.log(error));
  await client.connect();
  console.log(`Redis connected`);
  await db.authenticate();
  console.log(`DB Connected`);
} catch (error) {
  console.log(error);
}
App.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use(router);
App.listen(port, () => {
  console.log(`servers listener on port ${port}`);
});
