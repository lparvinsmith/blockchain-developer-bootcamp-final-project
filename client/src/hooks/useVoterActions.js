import { useContext } from "react";
import { ContractContext } from "../context/ContractContext";
import { MessageContext } from "../context/MessageContext";

export const useRegisterVoter = () => {
  const { contract } = useContext(ContractContext);
  const { addMessage } = useContext(MessageContext);

  const registerVoter = () => {
    contract
      .registerVoter()
      .then((result) => {
        console.log("result", result);
        addMessage("Voter successfully registered", "success");
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
