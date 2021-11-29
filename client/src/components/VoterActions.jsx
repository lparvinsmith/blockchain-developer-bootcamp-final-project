import { useContext, useState } from "react";
import { Button } from "./Button";
import { TextInput } from "./TextInput";
import { useBuyin } from "../hooks/useBuyin";
import { useVotingOpen } from "../hooks/useVotingOpen";
import { useRegisterVoter, useVote } from "../hooks/useVoterActions";
import { MessageContext } from "../context/MessageContext";
import { ethers } from "ethers";

export const VoterActions = () => {
  const [show, setShow] = useState(false);
  const [candidate, setCandidate] = useState("");
  const buyin = useBuyin();
  const votingOpen = useVotingOpen();
  const registerVoter = useRegisterVoter();
  const voteForAddress = useVote();
  const { addMessage } = useContext(MessageContext);

  const handleInputChange = (e) => {
    const text = e.target.value;
    setCandidate(text);
  };

  const handleMint = () => {
    registerVoter();
  };

  const handleVote = () => {
    const address = candidate.trim();
    if (ethers.utils.isAddress(address)) {
      voteForAddress(address);
    } else {
      addMessage("Must use valid ETH address");
    }
  };

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
            <Button onClick={handleMint}>Mint voter NFT</Button>
          </div>
          {votingOpen && (
            <div className="ContractActions-action">
              <div className="ContractActions-label">Vote for a project</div>
              <TextInput
                placeholder="project address"
                value={candidate}
                onChange={handleInputChange}
              />
              <Button onClick={handleVote}>Vote</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
