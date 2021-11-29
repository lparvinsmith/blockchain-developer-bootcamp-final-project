import { useContext, useState } from "react";
import { AccountContext } from "../context/AccountContext";
import { truncateAddress } from "../utils/truncateAddress";
import { Button } from "./Button";
import "../styles/WalletStatus.css";

export const WalletStatus = () => {
  const { account, setAccount } = useContext(AccountContext);
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    try {
      // sends metamask wallet request to connect
      const accounts = await window.ethereum?.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      setLoading(false);
    } catch {
      console.log("error connecting wallet");
      setLoading(false);
    }
  };

  if (account) {
    return (
      <div className="WalletStatus">
        <div className="WalletStatus-message">
          {`Wallet ${truncateAddress(account)} connected`}
        </div>
      </div>
    );
  } else {
    return (
      <div className="WalletStatus">
        <Button onClick={handleConnect} disabled={loading}>
          Connect your wallet
        </Button>
      </div>
    );
  }
};
