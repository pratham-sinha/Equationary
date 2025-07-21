import Ably from "ably";

export const ablyServer = new Ably.Rest({
  key: process.env.REALTIME_ABLY_SERVER_KEY,
});
