import { StreamChat, Event } from "stream-chat";
import "dotenv/config";

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

      console.log(`Received message: ${event.message.text}`);
    });
  });

  console.log(`Listening for messages...`);
})();
