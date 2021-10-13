import { ethers } from "ethers";
import { createContext } from "react";

export const EthereumContext = createContext(undefined);

export const EthereumProvider = ({children}) => {
  // MetaMask injects a provider as window.ethereum
  const metaMaskConnected = !!window.ethereum;

  // A Provider (in ethers) is a class which provides an 
  // abstraction for a connection to the Ethereum Network.
  // It provides read-only access to the Blockchain and its status.
  let provider;
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
  } catch (error) {
    provider = undefined;
  }

  // A Signer is a class which has access to a private key, 
  // which can sign messages and transactions to authorize
  // the network to charge your account ether to perform operations.
  const signer = provider?.getSigner();

  return (
    <EthereumContext.Provider value={{provider, signer, metaMaskConnected}}>
      {children}
    </EthereumContext.Provider>
  );
}

