import './styles/App.css';
import { RegisterVoter } from './components/RegisterVoter';
import { EthereumProvider } from './context/EthereumContext';
import { WalletStatus } from './components/WalletStatus';
import { ContractProvider } from './context/ContractContext';

function App() {
  return (
    <div className="App">
      <EthereumProvider>
        <WalletStatus />
        <ContractProvider>
          <RegisterVoter />
        </ContractProvider>
      </EthereumProvider>
    </div>
  );
}

export default App;
