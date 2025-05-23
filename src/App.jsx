import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [amount, setAmount] = useState();
  const [fromCrypto, setFromCrypto] = useState("bitcoin");
  const [toCurrency, setToCurrency] = useState("usd");
  const [convertedAmount, setConvertedAmount] = useState();
  const [error, setError] = useState("");

  const cryptoList = [
    { id: "bitcoin", name: "Bitcoin" },
    { id: "ethereum", name: "Ethereum" },
    { id: "binancecoin", name: "BNB" },
    { id: "solana", name: "Solana" },
    { id: "ripple", name: "XRP" },
    { id: "cardano", name: "Cardano" },
    { id: "dogecoin", name: "Dogecoin" },
    { id: "avalanche-2", name: "Avalanche" },
    { id: "polygon", name: "Polygon (MATIC)" },
    { id: "polkadot", name: "Polkadot" },
    { id: "tron", name: "TRON" },
    { id: "litecoin", name: "Litecoin" },
    { id: "chainlink", name: "Chainlink" },
    { id: "uniswap", name: "Uniswap" },
    { id: "shiba-inu", name: "Shiba Inu" }
  ];

  const currencies = ["usd", "eur", "jpy", "gbp"];

  useEffect(() => {
    if (!fromCrypto || !toCurrency || !amount) return;

    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${fromCrypto}&vs_currencies=${toCurrency}`
        )
        const data = await res.json();

        if (data && data[fromCrypto] && data[fromCrypto][toCurrency]) {
          setConvertedAmount(data[fromCrypto][toCurrency] * amount);
          setError("");
        } else {
          setConvertedAmount(null);
          setError("داده‌ای برای ارز انتخاب‌ شده موجود نیست.");
        }
      } catch (err) {
        setConvertedAmount(null);
        setError("خطا در دریافت اطلاعات از API.");
        console.error(err);
      }
    };

    fetchData();
  }, [fromCrypto, toCurrency, amount]);

  return (
    <div className="app">
      <h1>Currency Converter</h1>

      <div className="form">
        <input
          type="number"
          value={amount}
          min="0"
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Amount"
        />

        <select value={fromCrypto} onChange={(e) => setFromCrypto(e.target.value)}>
          {cryptoList.map((crypto) => (
            <option key={crypto.id} value={crypto.id}>
              {crypto.name}
            </option>
          ))}
        </select>

        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {currencies.map((cur) => (
            <option key={cur} value={cur}>
              {cur.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div className="result">
        {error && <p className="error">{error}</p>}
        {convertedAmount && !error && (
          <p>
            {amount} {fromCrypto} = {convertedAmount.toFixed(2)} {toCurrency.toUpperCase()}
          </p>
        )}
      </div>
      
    </div>
  );
}

export default App;