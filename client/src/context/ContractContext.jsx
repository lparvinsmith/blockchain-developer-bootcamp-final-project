import { ethers } from "ethers";
import { createContext, useContext } from "react";
import { EthereumContext } from "./EthereumContext";
import ContractData from "../contracts/RetroactiveFunding.json";

// deployed on Rinkeby
const CONTRACT_ADDRESS = "0xaceb4dab6f366e57c3368584372ea6fa2781522f";

/* 
  This context uses ethers to find the contract on the blockchain and
  stores the contract and its methods for user interaction
*/

export const ContractContext = createContext(undefined);

export const ContractProvider = ({ children }) => {
  const { signer } = useContext(EthereumContext);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ContractData, signer);

  return (
    <ContractContext.Provider value={{ contract }}>
      {children}
    </ContractContext.Provider>
  );
};
