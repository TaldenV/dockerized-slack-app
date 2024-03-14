import { Router } from 'express';
import { Request, Response } from 'express';
import { App } from '@slack/bolt';

export default function slackRoutes(boltApp: App): Router {
  const router = Router();

  router.get('/slack/health', (req: Request, res: Response) => {
    boltApp.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: process.env.SLACK_BOT_CHANNEL || 'bot-spam',
      text: `🤖 Bot \`v${process.env.npm_package_version}\` is now live ⚡`,
    });

    res.send('Slack app running');
  });

  router.post('/slack/:text', (req: Request, res: Response) => {
    boltApp.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: process.env.SLACK_BOT_CHANNEL || 'bot-spam',
      text: `🤖 Bot \`v${process.env.npm_package_version}\` is now live ⚡`,
    });

    res.send(`Requested text: ${req.params.text}`);
  });

  return router;
}