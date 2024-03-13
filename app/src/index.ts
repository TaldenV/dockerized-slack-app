import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import slackApp from './slackApp.js';
import { google } from 'googleapis';
import { OAuth2Client } from "google-auth-library";

dotenv.config();

async function main() {
  const app: Express = express();
  const port = process.env.PORT || 3000;

  const boltApp = slackApp();
  await boltApp.start(process.env.SLACK_APP_PORT || 3333);

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());



  app.get('/', (req: Request, res: Response) => {
      res.send('Hello World!');
  });



  app.get('/slack/health', (req: Request, res: Response) => {
    boltApp.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: process.env.SLACK_BOT_CHANNEL || 'bot-spam',
      text: `🤖 Bot \`v${process.env.npm_package_version}\` is now live ⚡`,
    });

    res.send('Slack app running');
  });

  app.get('/slack/:text', (req: Request, res: Response) => {
    boltApp.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: process.env.SLACK_BOT_CHANNEL || 'bot-spam',
      text: `Requested text: ${req.params.text}`,
    });

    res.send(`Requested text: ${req.params.text}`);
  });

  
  app.get('/oauth2Callback', async (req: Request, res: Response) => {
    const oAuth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      process.env.GMAIL_REDIRECT_URI
    );
  
    google.options({ auth: oAuth2Client });

    try {
      const scopes = process.env.GMAIL_REDIRECT_URI;

      const { code } = req.query;
      if (code === undefined) {
        res.redirect(oAuth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: scopes,
        }));
      } else {
        const { tokens } = await oAuth2Client.getToken(code.toString());
        oAuth2Client.setCredentials(tokens);
        res.send('Authentication successful! Please return to the console.');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      res.status(500).send('Error during authentication');
    }
  });

  await app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

main().catch(console.error);