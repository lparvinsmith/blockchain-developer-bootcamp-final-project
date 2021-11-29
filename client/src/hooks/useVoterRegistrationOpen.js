import { useContext, useState } from "react";
import { ContractContext } from "../context/ContractContext";
import { MessageContext } from "../context/MessageContext";

export const useVoterRegistrationOpen = () => {
  const { contract } = useContext(ContractContext);
  const [voterRegistrationOpen, setVoterRegistrationOpen] = useState(false);
  contract
    .voterRegistrationOpen()
    .then((result) => setVoterRegistrationOpen(result));

  return voterRegistrationOpen;
};

export const useUpdateVoterRegistrationClosed = () => {
  const { contract } = useContext(ContractContext);
  const { addMessage } = useContext(MessageContext);

  const updateVoterRegistrationClosed = () => {
    contract
      .setVoterRegistrationClosed()
      .then((result) => {
        console.log("result", result);
        addMessage("Voter registration is closed", "success");
      })
      .catch((err) => {
        addMessage(err.message, "error");
      });
  };

  return updateVoterRegistrationClosed;
};
