import { ethers } from "ethers";
import { useContext, useState } from "react";
import { ContractContext } from "../context/ContractContext";

export const useBuyin = () => {
  const { contract } = useContext(ContractContext);
  const [buyin, setBuyin] = useState("");
  contract.buyin().then((result) => setBuyin(result.toString()));

  return buyin;
};

export const useUpdateBuyin = async (amount) => {
  const { contract } = useContext(ContractContext);
  const result = await contract.setBuyin(amount);
  console.log(result);
  return result;
};
