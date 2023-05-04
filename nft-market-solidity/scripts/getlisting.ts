import { ethers, network } from "hardhat"
import  { moveBlocks } from  "../utils/move-blocks"
import "@nomiclabs/hardhat-ethers"

const PRICE = ethers.utils.parseEther("0.01")

async function mintAndList() {
    const walte = new ethers.Wallet('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', ethers.provider)
    const nftMarketplace = await ethers.getContract("NftMarketplace")
    const teste = await nftMarketplace.getListing()
    console.log(teste)
    
}

mintAndList()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
