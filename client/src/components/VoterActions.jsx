import { useState } from "react";
import { Button } from "./Button";
import { TextInput } from "./TextInput";
import { useBuyin } from "../hooks/useBuyin";

export const VoterActions = () => {
  const [show, setShow] = useState(false);
  const buyin = useBuyin();

  return (
    <div>
      <div className="ContractActions-title" onClick={() => setShow(!show)}>
        Voters
      </div>
      {show && (
        <div className="ContractActions-body">
          <div className="ContractActions-action">
            <div className="ContractActions-label">
              {`Voter NFT costs ${buyin} wei`}
            </div>
            <Button>Mint voter NFT</Button>
          </div>
          <div className="ContractActions-action">
            <div className="ContractActions-label">Vote for a project</div>
            <TextInput placeholder="project address" />
            <Button>Vote</Button>
          </div>
        </div>
      )}
    </div>
  );
};
