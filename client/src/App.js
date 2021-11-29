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
          <div className="App-header">
            <div className="App-title">Retroactive Funding DAO 🕺</div>
            <WalletStatus />
          </div>
          <div className="App-body">
            <ContractProvider>
              <RegisterVoter />
            </ContractProvider>
          </div>
        </AccountProvider>
      </EthereumProvider>
    </div>
  );
}

export default App;
