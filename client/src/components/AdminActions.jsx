import { useState } from "react";
import { Button } from "./Button";
import { TextInput } from "./TextInput";
import { useBuyin } from "../hooks/useBuyin";
import { useVotingOpen, useUpdateVotingOpen } from "../hooks/useVotingOpen";

export const AdminActions = () => {
  const [show, setShow] = useState(false);
  const buyin = useBuyin();
  const votingOpen = useVotingOpen();
  const updateVotingOpen = useUpdateVotingOpen();

  const handleUpdateVoting = () => {
    updateVotingOpen();
  };

  return (
    <div className="AdminActions">
      <div className="ContractActions-title" onClick={() => setShow(!show)}>
        Admin
      </div>
      {show && (
        <div className="ContractActions-body">
          <div className="ContractActions-action">
            <div className="ContractActions-label">{`Current buyin: ${buyin} wei`}</div>
            <TextInput placeholder="update amount in wei" />
            <Button>Update</Button>
          </div>
          <div className="ContractActions-action">
            <Button>Close voter registration</Button>
          </div>
          <div className="ContractActions-action">
            <Button>Close candidate registration</Button>
          </div>
          <div className="ContractActions-action">
            <div className="ContractActions-label">
              {`Voting is ${votingOpen ? "" : "not "}open`}
            </div>
            <Button onClick={handleUpdateVoting}>Open voting</Button>
          </div>
        </div>
      )}
    </div>
  );
};
