import { useContext, useState } from "react";
import { ContractContext } from "../context/ContractContext";

export const useCandidateRegistrationOpen = () => {
  const { contract } = useContext(ContractContext);
  const [open, setOpen] = useState(false);
  contract.projectSubmissionOpen().then((result) => setOpen(result));

  return open;
};

export const useRegisterCandidate = () => {
  const { contract } = useContext(ContractContext);

  const registerCandidate = () => {
    contract
      .registerCandidate()
      .then((result) => console.log("result", result))
      .catch((err) => console.log("error", err));
  };

  return registerCandidate;
};
