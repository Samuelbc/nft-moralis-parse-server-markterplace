/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
declare const Parse: any;
import './generated/evmApi';
import './generated/solApi';
import { requestMessage } from '../auth/authService';
import { ethers } from 'ethers';

Parse.Cloud.define('requestMessage', async ({ params }: any) => {
  const { address, chain, networkType } = params;

  const message = await requestMessage({
    address,
    chain,
    networkType,
  });

  return { message };
});

Parse.Cloud.define('getPluginSpecs', () => {
  // Not implemented, only excists to remove client-side errors when using the moralis-v1 package
  return [];
});

Parse.Cloud.define('getServerTime', () => {
  // Not implemented, only excists to remove client-side errors when using the moralis-v1 package
  return null;
});

Parse.Cloud.afterSave('ItemListed', async (request: any) => {
  const confirmed = request.object.attributes;
  console.log('Looking for confirmed TX...');
  if (confirmed) {
    console.log('Found item!');
    const ActiveItem = Parse.Object.extend('ActiveItem');
    // In case of listing update, search for already listed ActiveItem and delete
    const query = new Parse.Query(ActiveItem);
    query.equalTo('marketplaceAddress', request.object.get('marketplaceAddress'));
    query.equalTo('nftAddress', request.object.get('nftAddress'));
    query.equalTo('tokenId', request.object.get('tokenId'));
    query.equalTo('seller', request.object.get('seller'));
    console.log(`Marketplace | Query: ${query}`);
    const alreadyListedItem = await query.first();
    if (alreadyListedItem) {
      console.log(`Deleting ${request.object.get('objectId')}`);
      await alreadyListedItem.destroy();
      console.log(
        `Deleted item with tokenId ${request.object.get('tokenId')} at address ${request.object.get(
          'nftAddress',
        )} since the listing is being updated. `,
      );
    }

    // Add new ActiveItem
    const activeItem = new ActiveItem();
    activeItem.set('marketplaceAddress', request.object.get('marketplaceAddress'));
    activeItem.set('nftAddress', request.object.get('nftAddress'));
    activeItem.set('price', request.object.get('price'));
    activeItem.set('tokenId', request.object.get('tokenId'));
    activeItem.set('seller', request.object.get('seller'));
    console.log(`Adding Address: ${request.object.get('nftAddress')} TokenId: ${request.object.get('tokenId')}`);
    console.log('Saving...');
    await activeItem.save();
  }
});

Parse.Cloud.afterSave('ItemCanceled', async (request: any) => {
  const confirmed = request.object.attributes;
  console.log(`Marketplace | Object: ${request.object}`);
  if (confirmed) {
    const ActiveItem = Parse.Object.extend('ActiveItem');
    const query = new Parse.Query(ActiveItem);
    query.equalTo('marketplaceAddress', request.object.get('marketplaceAddress'));
    query.equalTo('nftAddress', request.object.get('nftAddress'));
    query.equalTo('tokenId', request.object.get('tokenId'));
    console.log(`Marketplace | Query: ${query}`);
    const canceledItem = await query.first();
    console.log(`Marketplace | CanceledItem: ${canceledItem}`);
    if (canceledItem) {
      console.log(`Deleting ${request.object.get('objectId')}`);
      await canceledItem.destroy();
      console.log(
        `Deleted item with tokenId ${request.object.get('tokenId')} at address ${request.object.get(
          'nftAddress',
        )} since it was canceled. `,
      );
    } else {
      console.log(
        `No item canceled with address: ${request.object.get('nftAddress')} and tokenId: ${request.object.get(
          'tokenId',
        )} found.`,
      );
    }
  }
});

Parse.Cloud.afterSave('ItemBought', async (request: any) => {
  const confirmed = request.object.attributes;
  console.log(`Marketplace | Object: ${request.object}`);
  if (confirmed) {
    const ActiveItem = Parse.Object.extend('ActiveItem');
    const query = new Parse.Query(ActiveItem);
    query.equalTo('marketplaceAddress', request.object.get('marketplaceAddress'));
    query.equalTo('nftAddress', request.object.get('nftAddress'));
    query.equalTo('tokenId', request.object.get('tokenId'));
    console.log(`Marketplace | Query: ${query}`);
    const canceledItem = await query.first();
    console.log(`Marketplace | CanceledItem: ${canceledItem}`);
    if (canceledItem) {
      console.log(`Deleting ${request.object.get('objectId')}`);
      await canceledItem.destroy();
      console.log(
        `Deleted item with tokenId ${request.object.get('tokenId')} at address ${request.object.get(
          'nftAddress',
        )} from ActiveItem table since it was bought.`,
      );
    } else {
      console.log(
        `No item bought with address: ${request.object.get('nftAddress')} and tokenId: ${request.object.get(
          'tokenId',
        )} found`,
      );
    }
  }
});

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
