import { App } from "@slack/bolt";

const register = (app : App) => {

  // listen for a message that matches hi, hello, or hey
  app.message(/^(hi|hello|hey)$/i, async ({context, say}) => {
    try {
      console.log("hello")
      const greeting = context.matches[0];
      await say(`${greeting}, how are you?`);
    } catch (error) {
      console.error(error);
    }
  });

};

export default register;
