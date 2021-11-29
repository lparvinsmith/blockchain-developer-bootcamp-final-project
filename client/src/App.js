import "./styles/App.css";
import { RegisterVoter } from "./components/RegisterVoter";
import { EthereumProvider } from "./context/EthereumContext";
import { WalletStatus } from "./components/WalletStatus";
import { ContractProvider } from "./context/ContractContext";
import { AccountProvider } from "./context/AccountContext";

function App() {
  return (
    <div className="App">
      <EthereumProvider>
        <AccountProvider>
          <WalletStatus />
          <ContractProvider>
            <RegisterVoter />
          </ContractProvider>
        </AccountProvider>
      </EthereumProvider>
    </div>
  );
}

export default App;
