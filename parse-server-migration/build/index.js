"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const moralis_1 = __importDefault(require("moralis"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config"));
const parseServer_1 = require("./parseServer");
// @ts-ignore
const parse_server_1 = __importDefault(require("parse-server"));
const http_1 = __importDefault(require("http"));
const parse_server_2 = require("@moralisweb3/parse-server");
const createEventWatcher_1 = require("./createEventWatcher");
const routes_1 = __importDefault(require("./routes/routes"));
const ethers_1 = require("ethers");
const eventsTypes_1 = require("./constants/eventsTypes");
exports.app = (0, express_1.default)();
moralis_1.default.start({
    apiKey: config_1.default.MORALIS_API_KEY,
});
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)());
exports.app.use((0, parse_server_2.streamsSync)(parseServer_1.parseServer, {
    apiKey: config_1.default.MORALIS_API_KEY,
    webhookUrl: '/streams',
}));
exports.app.use(`/server`, parseServer_1.parseServer);
exports.app.use('/api', routes_1.default);
const httpServer = http_1.default.createServer(exports.app);
httpServer.listen(config_1.default.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Moralis Server is running on port ${config_1.default.PORT}.`);
});
// This will enable the Live Query real-time server
parse_server_1.default.createLiveQueryServer(httpServer);
/////// definir contratos com listeners
const provider = new ethers_1.ethers.providers.WebSocketProvider('http://127.0.0.1:8545/');
const contractItemListed = new ethers_1.ethers.Contract(eventsTypes_1.itemListedOptions['address'], [eventsTypes_1.itemListedOptions['abi']], provider);
const contractItemCanceled = new ethers_1.ethers.Contract(eventsTypes_1.itemCanceledOptions['address'], [eventsTypes_1.itemCanceledOptions['abi']], provider);
const contractItemBought = new ethers_1.ethers.Contract(eventsTypes_1.itemBoughtOptions['address'], [eventsTypes_1.itemBoughtOptions['abi']], provider);
const startListeners = async () => {
    await (0, createEventWatcher_1.createEventWatcher)(eventsTypes_1.itemListedOptions, provider, contractItemListed);
    await (0, createEventWatcher_1.createEventWatcher)(eventsTypes_1.itemCanceledOptions, provider, contractItemCanceled);
    await (0, createEventWatcher_1.createEventWatcher)(eventsTypes_1.itemBoughtOptions, provider, contractItemBought);
};
startListeners();
node_cron_1.default.schedule('*/2 * * * *', async () => {
    console.log('Cronjob running...');
    await (0, createEventWatcher_1.createEventWatcher)(eventsTypes_1.itemListedOptions, provider, contractItemListed);
    await (0, createEventWatcher_1.createEventWatcher)(eventsTypes_1.itemCanceledOptions, provider, contractItemCanceled);
    await (0, createEventWatcher_1.createEventWatcher)(eventsTypes_1.itemBoughtOptions, provider, contractItemBought);
});
//# sourceMappingURL=index.js.map