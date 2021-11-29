import "./styles/App.css";
import { EthereumProvider } from "./context/EthereumContext";
import { WalletStatus } from "./components/WalletStatus";
import { ContractProvider } from "./context/ContractContext";
import { AccountProvider } from "./context/AccountContext";
import { ContractActions } from "./components/ContractActions";
import { MessageProvider } from "./context/MessageContext";
import { Message } from "./components/Message";

function App() {
  return (
    <div className="App">
      <MessageProvider>
        <EthereumProvider>
          <AccountProvider>
            <div className="App-header">
              <div className="App-title">Retroactive Funding DAO 🕺</div>
              <Message />
              <WalletStatus />
            </div>
            <div className="App-body">
              <ContractProvider>
                <ContractActions />
              </ContractProvider>
            </div>
          </AccountProvider>
        </EthereumProvider>
      </MessageProvider>
    </div>
  );
}

export default App;
