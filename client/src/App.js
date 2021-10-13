import './styles/App.css';
import { RegisterVoter } from './components/RegisterVoter';
import { EthereumProvider } from './context/EthereumContext';
import { WalletStatus } from './components/WalletStatus';

function App() {
  return (
    <div className="App">
      <EthereumProvider>
        <WalletStatus />
        <RegisterVoter />
      </EthereumProvider>
    </div>
  );
}

export default App;
