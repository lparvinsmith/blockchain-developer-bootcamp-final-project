import { useContext } from "react";
import { ContractContext } from "../context/ContractContext";
import { MessageContext } from "../context/MessageContext";
import { useBuyin } from "./useBuyin";

export const useRegisterVoter = () => {
  const { contract } = useContext(ContractContext);
  const { addMessage } = useContext(MessageContext);
  const buyin = useBuyin();

  const registerVoter = () => {
    contract
      .registerVoter({ value: buyin })
      .then((result) => {
        console.log("result", result);
        const message = `Voter successfully registered, see https://rinkeby.etherscan.io/tx/${result.hash}`;
        addMessage(message, "success");
      })
      .catch((err) => {
        addMessage(err.message, "error");
      });
  };

  return registerVoter;
};

export const useVote = () => {
  const { contract } = useContext(ContractContext);
  const { addMessage } = useContext(MessageContext);

  const voteForAddress = (address) => {
    contract
      .vote(address)
      .then((result) => {
        console.log("result", result);
        addMessage("Voter successfully registered", "success");
      })
      .catch((err) => {
        addMessage(err.message, "error");
      });
  };

  return voteForAddress;
};
