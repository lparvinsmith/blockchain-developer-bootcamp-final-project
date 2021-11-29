import "./styles/App.css";
import { EthereumProvider } from "./context/EthereumContext";
import { WalletStatus } from "./components/WalletStatus";
import { ContractProvider } from "./context/ContractContext";
import { AccountProvider } from "./context/AccountContext";
import { ContractActions } from "./components/ContractActions";

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
              <ContractActions />
            </ContractProvider>
          </div>
        </AccountProvider>
      </EthereumProvider>
    </div>
  );
}

export default App;
