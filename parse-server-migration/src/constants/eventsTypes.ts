import * as contractAddresses from '../constants/networkMapping.json';

const chainId = '31337';
const moralisChainId = chainId == '31337' ? '1337' : chainId;
const contractAddress = contractAddresses[chainId as keyof typeof contractAddresses]['NftMarketplace'][0];

export const itemListedOptions = {
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

export const itemBoughtOptions = {
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

export const itemCanceledOptions = {
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
