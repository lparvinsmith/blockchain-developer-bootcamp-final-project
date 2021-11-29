import { useState } from "react";
import { Button } from "./Button";

export const CandidateActions = () => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="ContractActions-title" onClick={() => setShow(!show)}>
        Candidates
      </div>
      {show && (
        <div className="ContractActions-body">
          <div className="ContractActions-action">
            <div className="ContractActions-label">Register your project</div>
            <Button>Become a candidate</Button>
          </div>
        </div>
      )}
    </div>
  );
};
