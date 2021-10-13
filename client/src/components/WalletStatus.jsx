import { useContext } from "react"
import { EthereumContext } from "../context/EthereumContext"

export const WalletStatus = () => {
  const {metaMaskConnected} = useContext(EthereumContext);
  if (metaMaskConnected) {
    return <div>Wallet connected!</div>
  } else {
    return <div>Connect your wallet!</div>
  }
}