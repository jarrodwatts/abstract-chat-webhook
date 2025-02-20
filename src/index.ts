import { StreamChat, Event } from "stream-chat";
import "dotenv/config";
import { keyTap } from "robotjs";

// Load environment variables (read .env.example for more info)
const STREAM_API_KEY = process.env.STREAM_API_KEY!;
const STREAM_AUTH_KEY = process.env.STREAM_AUTH_KEY!;
const STREAMER_WALLET_ADDRESS = process.env.STREAMER_WALLET_ADDRESS!;
const APP_WALLET_ADDRESS = process.env.APP_WALLET_ADDRESS!;

(async () => {
  const chatClient = StreamChat.getInstance(STREAM_API_KEY, {
    allowServerSideConnect: true,
  });

  await chatClient.connectUser(
    {
      id: APP_WALLET_ADDRESS.toLowerCase(),
    },
    STREAM_AUTH_KEY
  );

  const channels = await chatClient.queryChannels({
    created_by_id: STREAMER_WALLET_ADDRESS,
  });

  channels.forEach((channel) => {
    channel.on("message.new", (event: Event) => {
      if (!event.message?.text) return;
      const command = event.message.text.toLowerCase();

      console.log(command);

      switch (command) {
        case "up":
          keyTap("up");
          break;
        case "down":
          keyTap("down");
          break;
        case "left":
          keyTap("left");
          break;
        case "right":
          keyTap("right");
          break;
        case "a":
          keyTap("x"); // assuming X is mapped to A button
          break;
        case "b":
          keyTap("z"); // assuming Z is mapped to B button
          break;
        case "start":
          keyTap("enter");
          break;
        case "select":
          keyTap("backspace");
          break;
      }
    });
  });

  console.log(`Listening for messages...`);
})();
