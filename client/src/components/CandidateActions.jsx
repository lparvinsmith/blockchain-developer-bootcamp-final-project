import { useState } from "react";
import { Button } from "./Button";
import {
  useCandidateRegistrationOpen,
  useRegisterCandidate,
} from "../hooks/useRegisterCandidate";

export const CandidateActions = () => {
  const [show, setShow] = useState(false);
  const registrationOpen = useCandidateRegistrationOpen();
  const registerCandidate = useRegisterCandidate();

  const handleRegister = () => {
    registerCandidate();
  };

  return (
    <div>
      <div className="ContractActions-title" onClick={() => setShow(!show)}>
        Candidates
      </div>
      {show && (
        <div className="ContractActions-body">
          {registrationOpen ? (
            <div className="ContractActions-action">
              <div className="ContractActions-label">Register your project</div>
              <Button onClick={handleRegister}>Become a candidate</Button>
            </div>
          ) : (
            <div className="ContractActions-action">
              <div className="ContractActions-label">Registration closed</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
