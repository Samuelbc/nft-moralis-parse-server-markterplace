# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

1. Create a list of Registred Wallets/Users for the NFT Marketplace

2. Create a decentralized NFT Marketplace
    1. 'listItem': list NFT on the marketplace +
    2. 'buyItem': buy NFT on the Marketplace +
    3. 'cancelItem': cancel NFT listing on the Marketplace + 
    4. 'withdrawProceeds': Withdraw payment for my bought NFTs  +
    5. Allow only registered wallets to list items on the marketplace
    6. Allow only registered wallets to buy listed items on the marketplace

3. Create the nft factory
    1. Verify the area of the new nft 
    2. Allow only registered wallets to own the new nft
    3. Generate the nft image
    4. Deploy image IPFS?
    5. Generate the NFT

