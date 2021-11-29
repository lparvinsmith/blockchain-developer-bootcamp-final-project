import { useState } from "react";
import { Button } from "./Button";
import { TextInput } from "./TextInput";
import { useBuyin } from "../hooks/useBuyin";

export const AdminActions = () => {
  const [show, setShow] = useState(false);
  const buyin = useBuyin();

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
            <Button>Open voting</Button>
          </div>
        </div>
      )}
    </div>
  );
};
