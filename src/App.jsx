import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState('');

  useEffect(() => {
    if (amount === '') return;

    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then(res => res.json())
      .then(data => {
        const rate = data.rates[toCurrency];
        setConvertedAmount((amount * rate).toFixed(2));
      });
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div className="app">
      <h3 className="title">* Currency Converter *</h3>

      <div className="input-group">
        <input
          type="number"
          placeholder="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="JPY">JPY</option>
          <option value="GBP">GBP</option>
        </select>
      </div>

      <div className="input-group">
        <input
          type="text"
          placeholder="converted amount"
          value={convertedAmount}
          disabled
        />
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="JPY">JPY</option>
          <option value="GBP">GBP</option>
        </select>
      </div>
    </div>
  );
}

export default App;
