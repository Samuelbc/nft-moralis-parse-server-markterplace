import type { NextPage } from "next"
import { Form, Button, useNotification } from "web3uikit"
import { useWeb3Contract, useMoralis } from "react-moralis"
import nftMarketplaceAbi from "../constants/NftMarketplace.json"
import nftAbi from "../constants/BasicNft.json"
import networkMapping from "../constants/networkMapping.json"
import { useEffect, useState } from "react"
import { BigNumber, ethers } from "ethers"
import MapExample from "../components/MapExample"


type NetworkConfigItem = {
    NftMarketplace: string[]
}

type NetworkConfigMap = {
    [chainId: string]: NetworkConfigItem
}

const CreateNft: NextPage = () => {
    const { chainId, account, isWeb3Enabled } = useMoralis()
    const chainString = chainId ? parseInt(chainId).toString() : "31337"
    const marketplaceAddress = (networkMapping as NetworkConfigMap)[chainString].NftMarketplace[0]
    const [proceeds, setProceeds] = useState("0")
    

    
    const handleClick = async (data:any) => {
        console.log(data)
        var jsonData = {  
            "center": data.data[0].inputResult, 
            "north": data.data[1].inputResult,
            "south": data.data[2].inputResult,
            "east": data.data[3].inputResult,
            "west": data.data[4].inputResult
        }       
        console.log(JSON.stringify(jsonData));   
        try{ const res = await fetch('http://127.0.0.1:1337/api/post', {      
            method: 'POST', 
            mode: 'cors', 
            body: JSON.stringify(jsonData)      
          });
          const data = await res.json();
          return null;
        } catch (err) {
			console.log(err);
		}
    }

    return (
        <div>
            <Form
                onSubmit={handleClick}
                buttonConfig={{
                    isLoading: false,
                    type: "submit",
                    theme: "primary",
                    text: "Create NFT!",
                }}
                data={[
                    {
                        inputWidth: "25%",
                        name: "Centro Latitude",
                        type: "text",
                        value: "",
                        key: "center",
                    },
                    {
                        inputWidth: "25%",
                        name: "Centro Longitude",
                        type: "text",
                        value: "",
                        key: "center",
                    },
                    {
                        inputWidth: "25%",
                        name: "Norte",
                        type: "text",
                        value: "",
                        key: "north",
                    },
                    {
                        inputWidth: "25%",
                        name: "Sul",
                        type: "text",
                        value: "",
                        key: "south",
                    },
                    {
                        inputWidth: "25%",
                        name: "Leste",
                        type: "text",
                        value: "",
                        key: "east",
                    },
                    {
                        inputWidth: "25%",
                        name: "Oeste",
                        type: "text",
                        value: "",
                        key: "west",
                    },
                ]}
                title="Create your NFT!"
                id="Main Form"
            />
            <MapExample />
        </div>
    )
}
export default CreateNft
