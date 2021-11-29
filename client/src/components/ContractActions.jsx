import { AdminActions } from "./AdminActions";
import { CandidateActions } from "./CandidateActions";
import { VoterActions } from "./VoterActions";
import "../styles/ContractActions.css";

export const ContractActions = () => {
  // TODO add getIsAdmin to contract
  const isAdmin = true;

  return (
    <div className="ContractActions">
      {isAdmin && <AdminActions />}
      <VoterActions />
      <CandidateActions />
    </div>
  );
};
