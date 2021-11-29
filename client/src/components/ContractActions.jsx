import { AdminActions } from "./AdminActions";
import { CandidateActions } from "./CandidateActions";
import { VoterActions } from "./VoterActions";

export const ContractActions = () => {
  const isAdmin = true;
  const showVoterActions = true;

  return (
    <div className="ContractActions">
      {isAdmin && <AdminActions />}
      {showVoterActions && <VoterActions />}
      <CandidateActions />
    </div>
  );
};
