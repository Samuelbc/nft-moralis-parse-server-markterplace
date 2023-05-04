"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemCanceledOptions = exports.itemBoughtOptions = exports.itemListedOptions = void 0;
const contractAddresses = __importStar(require("../constants/networkMapping.json"));
const chainId = '31337';
const moralisChainId = chainId == '31337' ? '1337' : chainId;
const contractAddress = contractAddresses[chainId]['NftMarketplace'][0];
exports.itemListedOptions = {
    chainId: moralisChainId,
    address: contractAddress,
    topic: 'ItemListed(address,address,uint256,uint256)',
    abi: {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'seller',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'nftAddress',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'price',
                type: 'uint256',
            },
        ],
        name: 'ItemListed',
        type: 'event',
    },
    tableName: 'ItemListed',
    sync_historical: true,
};
exports.itemBoughtOptions = {
    chainId: moralisChainId,
    address: contractAddress,
    topic: 'ItemBought(address,address,uint256,uint256)',
    abi: {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'buyer',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'nftAddress',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'price',
                type: 'uint256',
            },
        ],
        name: 'ItemBought',
        type: 'event',
    },
    tableName: 'ItemBought',
    sync_historical: true,
};
exports.itemCanceledOptions = {
    chainId: moralisChainId,
    address: contractAddress,
    topic: 'ItemCanceled(address,address,uint256)',
    abi: {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'seller',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'nftAddress',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
            },
        ],
        name: 'ItemCanceled',
        type: 'event',
    },
    tableName: 'ItemCanceled',
    sync_historical: true,
};
//# sourceMappingURL=eventsTypes.js.map