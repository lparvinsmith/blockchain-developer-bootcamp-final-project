import { useContext } from "react";
import { EthereumContext } from "../context/EthereumContext";
import { Button } from "./Button";

export const RegisterVoter = () => {
  const {signer, provider} = useContext(EthereumContext);
  const handleRegister = () => {
    console.log('clicked');
  }
  console.log('signer', signer);
  console.log('provider', provider);

  return (
    <div>
      <h2>Voter registration is open</h2>
      <h3>Buy in is X ETH</h3>
      <Button onClick={handleRegister}>Register</Button>
    </div>
  )
}
