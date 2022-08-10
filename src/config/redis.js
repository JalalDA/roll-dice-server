import { createClient } from "redis";

export const client = createClient({
  url: "redis://default:DvvogcUgRLpbmiDQmZ7cCz6Oy02vTLRT@redis-19377.c299.asia-northeast1-1.gce.cloud.redislabs.com:19377",
});

export const redisCon = async () => {
  try {
    client.on("error", (err) => console.log(err));
    await client.connect();
    console.log(`Redis connection is establishing now ....`);
  } catch (error) {
    console.log(error);
  }
};
