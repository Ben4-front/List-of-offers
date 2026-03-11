import React from 'react';
import './App.css';
import Listing from './components/Listing';
import etsyData from './data/etsy.json'; // Импорт данных

function App() {
  return (
    <div className="App">
      <Listing items={etsyData} />
    </div>
  );
}

export default App;