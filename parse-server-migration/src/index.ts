import cron from 'node-cron';
import Moralis from 'moralis';
import express from 'express';
import cors from 'cors';
import config from './config';
import { parseServer } from './parseServer';
// @ts-ignore
import ParseServer from 'parse-server';
import http from 'http';
import { streamsSync } from '@moralisweb3/parse-server';
import { createEventWatcher } from './createEventWatcher';
import router from './routes/routes';
import { ethers } from 'ethers';
import { itemBoughtOptions, itemCanceledOptions, itemListedOptions } from './constants/eventsTypes';

export const app = express();

Moralis.start({
  apiKey: config.MORALIS_API_KEY,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use(
  streamsSync(parseServer, {
    apiKey: config.MORALIS_API_KEY,
    webhookUrl: '/streams',
  }),
);

app.use(`/server`, parseServer);

app.use('/api', router);

const httpServer = http.createServer(app);
httpServer.listen(config.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Moralis Server is running on port ${config.PORT}.`);
});
// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);

/////// definir contratos com listeners
const provider = new ethers.providers.WebSocketProvider('http://127.0.0.1:8545/');
const contractItemListed = new ethers.Contract(itemListedOptions['address'], [itemListedOptions['abi']], provider);
const contractItemCanceled = new ethers.Contract(
  itemCanceledOptions['address'],
  [itemCanceledOptions['abi']],
  provider,
);
const contractItemBought = new ethers.Contract(itemBoughtOptions['address'], [itemBoughtOptions['abi']], provider);

const startListeners = async () => {
  await createEventWatcher(itemListedOptions, provider, contractItemListed);
  await createEventWatcher(itemCanceledOptions, provider, contractItemCanceled);
  await createEventWatcher(itemBoughtOptions, provider, contractItemBought);
};
startListeners();

cron.schedule('*/2 * * * *', async () => {
  console.log('Cronjob running...');
  await createEventWatcher(itemListedOptions, provider, contractItemListed);
  await createEventWatcher(itemCanceledOptions, provider, contractItemCanceled);
  await createEventWatcher(itemBoughtOptions, provider, contractItemBought);
});
