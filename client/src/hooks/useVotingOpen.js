import { useContext, useState } from "react";
import { ContractContext } from "../context/ContractContext";
import { MessageContext } from "../context/MessageContext";

export const useVotingOpen = () => {
  const { contract } = useContext(ContractContext);
  const [votingOpen, setVotingOpen] = useState(false);
  contract.votingOpen().then((result) => setVotingOpen(result));

  return votingOpen;
};

export const useUpdateVotingOpen = () => {
  const { contract } = useContext(ContractContext);
  const { addMessage } = useContext(MessageContext);

  const updateVotingOpen = () => {
    contract
      .setVotingOpen()
      .then((result) => {
        console.log("result", result);
        addMessage("Voting is open", "success");
      })
      .catch((err) => {
        addMessage(err.message, "error");
      });
  };

  return updateVotingOpen;
};
