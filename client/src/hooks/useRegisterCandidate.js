import { useContext, useState } from "react";
import { ContractContext } from "../context/ContractContext";
import { MessageContext } from "../context/MessageContext";

export const useCandidateRegistrationOpen = () => {
  const { contract } = useContext(ContractContext);
  const [open, setOpen] = useState(false);
  contract.projectSubmissionOpen().then((result) => setOpen(result));

  return open;
};

export const useRegisterCandidate = () => {
  const { contract } = useContext(ContractContext);
  const { addMessage } = useContext(MessageContext);

  const registerCandidate = () => {
    contract
      .registerCandidate()
      .then((result) => {
        console.log("result", result);
        addMessage("Candidate has been registered", "success");
      })
      .catch((err) => {
        addMessage(err.message, "error");
      });
  };

  return registerCandidate;
};
