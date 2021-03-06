import { useContext, useState } from "react";
import { ContractContext } from "../context/ContractContext";

export const useBuyin = () => {
  const { contract } = useContext(ContractContext);
  const [buyin, setBuyin] = useState("");
  contract.buyin().then((result) => setBuyin(result.toString()));

  return buyin;
};

export const useUpdateBuyin = () => {
  const { contract } = useContext(ContractContext);

  const updateBuyin = (amount) => {
    contract
      .setBuyin(amount)
      .then((result) => console.log("result", result))
      .catch((err) => console.log("error", err));
  };

  return updateBuyin;
};
