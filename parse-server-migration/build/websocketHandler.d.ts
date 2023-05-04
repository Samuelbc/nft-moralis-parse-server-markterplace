import { ethers } from 'ethers';
import { WebSocketLike } from 'node_modules/@ethersproject/providers/src.ts/websocket-provider';
import { Networkish } from 'node_modules/@ethersproject/networks/src.ts/types';
export declare class WebSocketHandler extends ethers.providers.WebSocketProvider {
    private _myurl;
    private _mynetwork;
    constructor(url: string | WebSocketLike, network?: Networkish);
}
