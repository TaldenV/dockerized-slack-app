import { App } from "@slack/bolt";

const register = (app : App) => {

  // health command
  app.command('/health', async ({command, ack, respond}) => {
    try {
      await ack();
      await respond(`🤖 I'm alive! 🎉`);
    } catch (error) {
      console.log(error);
    }
  });

  // health command
  app.command('/get-gmails', async ({command, ack, respond}) => {
    try {
      await ack();
      await respond(`🤖 I'm alive! 🎉`);
    } catch (error) {
      console.log(error);
    }
  });

};

export default register;
