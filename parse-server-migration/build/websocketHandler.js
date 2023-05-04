"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketHandler = void 0;
const ethers_1 = require("ethers");
class WebSocketHandler extends ethers_1.ethers.providers.WebSocketProvider {
    constructor(url, network) {
        super(url, network);
        this._myurl = url;
        this._mynetwork = network;
        this._websocket.onclose = (event) => {
            if (event.code === 1000) {
                return;
            }
            this.constructor(this._myurl, this._mynetwork);
        };
    }
}
exports.WebSocketHandler = WebSocketHandler;
//# sourceMappingURL=websocketHandler.js.map