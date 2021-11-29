import { useContext, useState } from "react";
import { AccountContext } from "../context/AccountContext";

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
    return <div>{`Wallet ${account} connected`}</div>;
  } else {
    return (
      <button onClick={handleConnect} disabled={loading}>
        Connect your wallet
      </button>
    );
  }
};
