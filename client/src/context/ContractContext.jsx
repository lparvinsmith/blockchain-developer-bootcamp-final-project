import { ethers } from "ethers";
import { createContext, useContext } from "react";
import { EthereumContext } from "./EthereumContext";
import ContractData from '../contracts/RetroactiveFunding.json'

const CONTRACT_ADDRESS = '0x06473e23ad61430DBd86d4602AeF967AdE4Dc62B';

export const ContractContext = createContext(undefined);

export const ContractProvider = ({children}) => {
  const {provider} = useContext(EthereumContext);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ContractData.abi, provider);
  console.log('contract', contract);

  return (
    <ContractContext.Provider value={{contract}}>
      {children}
    </ContractContext.Provider>
  );
}

