import React, {useEffect, useState} from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  LoggerFactory, MemCache, RedstoneGatewayContractDefinitionLoader, RedstoneGatewayInteractionsLoader,
  SmartWeaveWebFactory,
} from 'redstone-smartweave';
import Arweave from "arweave";
import {createCodesandbox} from "./createCodesandbox";

const arweave = Arweave.init({
  host: "arweave.net", // Hostname or IP address for a Arweave host
  port: 443, // Port
  protocol: "https", // Network protocol http or https
  timeout: 60000, // Network request timeouts in milliseconds
  logging: false, // Enable network request logging
});

const smartweave = SmartWeaveWebFactory
  .memCachedBased(arweave)
  .setInteractionsLoader(new RedstoneGatewayInteractionsLoader("https://gateway.redstone.finance"))
  .setDefinitionLoader(new RedstoneGatewayContractDefinitionLoader("https://gateway.redstone.finance", arweave, new MemCache()))
  .build();

const contractTxId = "Daj-MNSnH55TDfxqC7v4eq0lKzVIwh98srUaWqyuZtY";

const contract = smartweave.contract(contractTxId);

function App() {
  const [contractState, setContractState] = useState({});

  const [iframeData, setIframeData] = React.useState<any>(null);
  const embedCodesandbox = React.useCallback(async () => {
    const data = await createCodesandbox(contractTxId);
    setIframeData(data);
  }, []);

  useEffect(() => {
    async function fetchContractData() {
      const result: any = await contract.readState();
      setContractState(result.validity);
    }

    fetchContractData();
  }, []);

  return (
    <div className="App">
      <button onClick={embedCodesandbox}>create and embed a codesandbox</button>
      <div>{iframeData ? <iframe title="test" {...iframeData} /> : null}</div>


      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <pre className="pre-format">{JSON.stringify(contractState)}</pre>
      </header>
    </div>
  );
}

export default App;
