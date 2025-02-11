import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { ConnectionProvider, WalletProvider, WalletDialogProvider } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

const network = WalletAdapterNetwork.Mainnet;
const wallets = [new PhantomWalletAdapter()];

function App() {
  const [tokenData, setTokenData] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [walletData, setWalletData] = useState(null);
  const [sentiment, setSentiment] = useState(null);
  const [nftData, setNftData] = useState(null);

  useEffect(() => {
    // Fetch token data from backend
    axios.get("http://localhost:5000/token/<TOKEN_ADDRESS>")
      .then((response) => setTokenData(response.data))
      .catch((error) => console.error(error));

    // Fetch ARIMA prediction
    axios.get("http://localhost:5000/predict/arima")
      .then((response) => setPrediction(response.data.prediction))
      .catch((error) => console.error(error));

    // Fetch wallet data
    axios.get("http://localhost:5000/wallet/<WALLET_ADDRESS>")
      .then((response) => setWalletData(response.data))
      .catch((error) => console.error(error));

    // Fetch sentiment analysis
    axios.get("http://localhost:5000/sentiment/Solana")
      .then((response) => setSentiment(response.data.average_sentiment))
      .catch((error) => console.error(error));

    // Fetch NFT metadata
    axios.get("http://localhost:5000/nft/<NFT_ADDRESS>")
      .then((response) => setNftData(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <ConnectionProvider endpoint="https://api.mainnet-beta.solana.com">
      <WalletProvider wallets={wallets} autoConnect>
        <WalletDialogProvider>
          <div>
            <h1>Crypto Analysis App</h1>
            {tokenData && (
              <div>
                <h2>Token Data</h2>
                <pre>{JSON.stringify(tokenData, null, 2)}</pre>
              </div>
            )}
            {prediction && (
              <div>
                <.