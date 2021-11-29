import { useContext, useState } from "react";
import { ContractContext } from "../context/ContractContext";

export const useVotingOpen = () => {
  const { contract } = useContext(ContractContext);
  const [votingOpen, setVotingOpen] = useState(false);
  contract.votingOpen().then((result) => setVotingOpen(result));

  return votingOpen;
};

export const useUpdateVotingOpen = () => {
  const { contract } = useContext(ContractContext);

  const updateVotingOpen = () => {
    contract
      .setVotingOpen()
      .then((result) => console.log("result", result))
      .catch((err) => console.log("error", err));
  };

  return updateVotingOpen;
};
