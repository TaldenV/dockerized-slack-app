import messages from './messages.js';
import commands from './commands.js';
import { App } from '@slack/bolt';

export default function registerListeners(app: App) {
  messages(app);
  commands(app);
}
