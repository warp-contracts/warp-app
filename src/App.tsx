import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {SmartWeaveWebFactory} from "redstone-smartweave";
import Arweave from "arweave";

const arweave = Arweave.init({
  host: 'dh48zl0solow5.cloudfront.net', // Hostname or IP address for a Arweave host
  port: 443, // Port
  protocol: 'https', // Network protocol http or https
  timeout: 60000, // Network request timeouts in milliseconds
  logging: false // Enable network request logging
});

const smartweave = SmartWeaveWebFactory.memCached(arweave);

const providersRegistryContract = smartweave.contract(
  "OrO8n453N6bx921wtsEs-0OCImBLCItNU5oSbFKlFuU"
);

function App() {

  const [contractState, setContractState] = useState({});

  useEffect(() => {
    async function fetchContractData() {
      const state = await providersRegistryContract.readState();
      setContractState(state);
    }

    fetchContractData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          {JSON.stringify(contractState)}
        </div>
      </header>
    </div>
  );
}

export default App;
