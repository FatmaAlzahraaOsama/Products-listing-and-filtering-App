import React, { useState, useEffect } from 'react';
import './App.css';
import Table from './components/table';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        setProducts(json);
      })
  }, []);
  console.log(products);

  return (
    <div className="container">
      <header className="header">
        <h1>Products listing and filtering App</h1>
      </header>

      <Table items={products} />
    </div>
  );
}

export default App;