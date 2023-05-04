"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEventWatcher = void 0;
const createEventWatcher = async (itemOptions, provider, contract) => {
    // await Moralis.start({ serverUrl, appId, masterKey });
    // const contractAddress = contractAddresses[chainId as keyof typeof contractAddresses]['NftMarketplace'][0];
    console.log(`Working with contract address: ${itemOptions['address']}`);
    if (itemOptions['tableName'] == 'ItemListed') {
        const listedResponse = await watchContractEvent(itemOptions, provider, contract);
    }
    if (itemOptions['tableName'] == 'ItemBought') {
        const boughtResponse = await watchContractEvent(itemOptions, provider, contract);
    }
    if (itemOptions['tableName'] == 'ItemCanceled') {
        const canceledResponse = await watchContractEvent(itemOptions, provider, contract);
    }
};
exports.createEventWatcher = createEventWatcher;
const watchContractEvent = async (params, provider, contract) => {
    if (params['tableName'] == 'ItemBought') {
        if (contract.listenerCount('ItemBought') == 0) {
            contract.on('ItemBought', (buyer, nftAddress, tokenId, price, event) => {
                const ItemBought = Parse.Object.extend('ItemBought');
                const itemBought = new ItemBought();
                itemBought.set('marketplaceAddress', params['address']);
                itemBought.set('nftAddress', nftAddress);
                itemBought.set('buyer', buyer);
                itemBought.set('tokenId', tokenId.toString());
                itemBought.set('price', price);
                itemBought.save();
            });
            console.log('Listener for ItemBought event added');
        }
        else {
            console.log('Listener for ItemBought event already added');
        }
        return { success: true };
    }
    if (params['tableName'] == 'ItemListed') {
        if (contract.listenerCount('ItemListed') == 0) {
            contract.on('ItemListed', async (seller, nftAddress, tokenId, price, event) => {
                const ItemListed = Parse.Object.extend('ItemListed');
                const itemListed = new ItemListed();
                itemListed.set('marketplaceAddress', params['address']);
                itemListed.set('nftAddress', nftAddress);
                itemListed.set('seller', seller);
                itemListed.set('tokenId', tokenId.toString());
                itemListed.set('price', price);
                itemListed.save();
            });
            console.log('Listener for ItemListed event added');
        }
        else {
            console.log('Listener for ItemListed event already added');
        }
        return { success: true };
    }
    if (params['tableName'] == 'ItemCanceled') {
        if (contract.listenerCount('ItemCanceled') == 0) {
            contract.on('ItemCanceled', (seller, nftAddress, tokenId, event) => {
                const ItemCanceled = Parse.Object.extend('ItemCanceled');
                const itemCanceled = new ItemCanceled();
                itemCanceled.set('marketplaceAddress', params['address']);
                itemCanceled.set('nftAddress', nftAddress);
                itemCanceled.set('seller', seller);
                itemCanceled.set('tokenId', tokenId.toString());
                itemCanceled.save();
            });
            console.log('Listener for ItemCanceled event added');
        }
        else {
            console.log('Listener for ItemCanceled event already added');
        }
        return { success: true };
    }
    return { success: false };
};
//# sourceMappingURL=createEventWatcher.js.map