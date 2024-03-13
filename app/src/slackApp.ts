import pkg from '@slack/bolt';
const { App } = pkg;
import registerListeners from './listeners/index.js';

export default function slackApp() {
  const boltApp = new App({ 
    token: process.env.SLACK_BOT_TOKEN, 
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
  });

  registerListeners(boltApp);

  return boltApp;
}
