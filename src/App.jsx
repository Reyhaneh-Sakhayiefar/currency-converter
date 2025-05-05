import React from 'react';
import './App.css';

function App() {
return (
<div style={{  padding: '100px', fontFamily: 'sans-serif' }}>
<h3 className='title'> * Currency Converter * </h3>

<div>
<input type="number" placeholder="amount" />
<select>
<option value="USD">USD</option>
<option value="EUR">EUR</option>
<option value="JPY">JPY</option>
<option value="GBP">GBP</option>
</select>
</div>

<div>
<input type="number" placeholder="converted amount" disabled />
<select>
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