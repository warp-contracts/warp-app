import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {LoggerFactory, SmartWeaveWebFactory} from "redstone-smartweave";
import Arweave from "arweave";

const arweave = Arweave.init({
  host: 'dh48zl0solow5.cloudfront.net', // Hostname or IP address for a Arweave host
  port: 443, // Port
  protocol: 'https', // Network protocol http or https
  timeout: 60000, // Network request timeouts in milliseconds
  logging: false // Enable network request logging
});

LoggerFactory.INST.logLevel("silly");

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
        <pre className="pre-format">
          {JSON.stringify(contractState)}
        </pre>
      </header>
    </div>
  );
}

export default App;
